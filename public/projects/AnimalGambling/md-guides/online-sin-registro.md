# Partidas Online sin Registro

Análisis de cómo implementar 1v1 online para demo, sin que los jugadores necesiten crear cuenta.

---

## 1. ¿Convex sirve?

**Sí, pero con limitaciones.**

Convex es buena opción porque:
- Real-time updates (WebSocket nativo) → perfecto para sincronizar dados, puntajes, turnos
- TypeScript end-to-end (backend + frontend)
- Funciones mutables (mutations) para jugadas
- Queries reactivas para estado del juego
- Hosting + DB incluidos (no manejar servidores)

Limitaciones para demo:
- Requiere Convex Cloud (hay tier gratuito limitado: 2.5M invocaciones/mes, 1GB)
- Necesitas un account en Convex (no anónimo total, pero sí sin registro de *usuarios*)
- Costo puede crecer rápido si hay mucho tráfico en la demo

---

## 2. Arquitectura: Guest Sessions (sin login)

```
Cliente (App estática)
   │
   ├─ [1] Genera sessionId único (UUID)
   ├─ [2] Crea sala con ese ID
   └─ [3] Comparte URL con código de sala (hash)
        ej: #/game?room=abc123

Servidor (Convex)
   │
   ├─ rooms (tabla)
   │  ├─ roomId
   │  ├─ player1 { sessionId, name, cat, score, current }
   │  ├─ player2 { sessionId, name, cat, score, current }
   │  ├─ turn (player1 | player2)
   │  ├─ status (waiting | playing | finished)
   │  └─ createdAt, expiresAt (TTL)
   │
   ├─ gameEvents (tabla, para replay/debug)
   │  ├─ roomId, sessionId, action, timestamp
   │  └─ payload { roll, hold, turnEnd, etc }
   │
   └─ Mutations
      ├─ joinRoom(roomId, sessionId, playerName, catId)
      ├─ rollDice(roomId, sessionId)
      ├─ holdScore(roomId, sessionId)
      └─ abandonRoom(roomId, sessionId)

      Queries (reactive)
      ├─ getRoom(roomId) → estado en vivo
      ├─ waitForPlayer(roomId) → polling o WebSocket
```

---

## 3. Flujo UX: Crear o Unirse a Sala

```
#/menu (Duelo Online → ready: true)
   │
   ▼ [CREAR SALA]
#/select (elige personaje)
   │
   ▼ [generamos UUID, creamos sala en Convex]
#/game
   ├─ [código de sala en pantalla: "COMPARTE: abc123"]
   ├─ [muestra QR o copia el link]
   └─ [espera al jugador 2... puede cambiar UI mientras espera]
   
   ▼ [Jugador 2 escanea QR o pega código]
#/select (elige personaje)
   ▼
#/game (ambos conectados, comienza la partida)
```

---

## 4. Implementación Mínima

### Backend (Convex)

```typescript
// convex/rooms.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createRoom = mutation({
  args: {
    sessionId: v.string(),
    playerName: v.string(),
    catId: v.string(),
  },
  async handler(ctx, args) {
    const roomId = crypto.getRandomValues(new Uint8Array(6))
      .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '')
      .toUpperCase()
      .slice(0, 6); // "ABC123"

    const room = await ctx.db.insert("rooms", {
      roomId,
      player1: {
        sessionId: args.sessionId,
        name: args.playerName,
        catId: args.catId,
        score: 0,
        current: 0,
      },
      player2: null,
      turn: "player1",
      status: "waiting",
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 30, // 30 min TTL
    });

    return { roomId };
  },
});

export const joinRoom = mutation({
  args: {
    roomId: v.string(),
    sessionId: v.string(),
    playerName: v.string(),
    catId: v.string(),
  },
  async handler(ctx, args) {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .unique();

    if (!room) throw new Error("Room not found");
    if (room.status !== "waiting") throw new Error("Room full or finished");

    await ctx.db.patch(room._id, {
      player2: {
        sessionId: args.sessionId,
        name: args.playerName,
        catId: args.catId,
        score: 0,
        current: 0,
      },
      status: "playing",
    });

    return { roomId: args.roomId };
  },
});

export const getRoom = query({
  args: { roomId: v.string() },
  async handler(ctx, args) {
    return await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .unique();
  },
});

export const rollDice = mutation({
  args: {
    roomId: v.string(),
    sessionId: v.string(),
  },
  async handler(ctx, args) {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .unique();

    if (!room) throw new Error("Room not found");
    if (room.status !== "playing") throw new Error("Game not active");

    // Verifica que sea el turno del jugador
    const isPlayer1 = room.player1.sessionId === args.sessionId;
    const currentPlayer = isPlayer1 ? room.player1 : room.player2;
    const turn = isPlayer1 ? "player1" : "player2";

    if (room.turn !== turn) throw new Error("Not your turn");

    const roll = Math.floor(Math.random() * 6) + 1;
    const isBust = roll === 1;

    if (isBust) {
      // Se quema: pierde el turno y el current se va a 0
      const otherTurn = isPlayer1 ? "player2" : "player1";
      await ctx.db.patch(room._id, {
        turn: otherTurn,
        [`player${isPlayer1 ? 1 : 2}`]: {
          ...currentPlayer,
          current: 0,
        },
      });

      await ctx.db.insert("gameEvents", {
        roomId: args.roomId,
        sessionId: args.sessionId,
        action: "roll",
        payload: { roll, isBust: true },
        timestamp: Date.now(),
      });

      return { roll, isBust: true, newTurn: otherTurn };
    }

    // Suma al current
    const newCurrent = currentPlayer.current + roll;

    await ctx.db.patch(room._id, {
      [`player${isPlayer1 ? 1 : 2}`]: {
        ...currentPlayer,
        current: newCurrent,
      },
    });

    await ctx.db.insert("gameEvents", {
      roomId: args.roomId,
      sessionId: args.sessionId,
      action: "roll",
      payload: { roll, newCurrent },
      timestamp: Date.now(),
    });

    return { roll, isBust: false, newCurrent };
  },
});

export const holdScore = mutation({
  args: {
    roomId: v.string(),
    sessionId: v.string(),
  },
  async handler(ctx, args) {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .unique();

    if (!room) throw new Error("Room not found");

    const isPlayer1 = room.player1.sessionId === args.sessionId;
    const currentPlayer = isPlayer1 ? room.player1 : room.player2;
    const playerKey = isPlayer1 ? 1 : 2;

    const newScore = currentPlayer.score + currentPlayer.current;
    const otherTurn = isPlayer1 ? "player2" : "player1";

    // Chequea si ganó
    const GOAL = 50;
    const gameFinished = newScore >= GOAL;

    if (gameFinished) {
      await ctx.db.patch(room._id, {
        [`player${playerKey}`]: {
          ...currentPlayer,
          score: newScore,
          current: 0,
        },
        status: "finished",
      });

      await ctx.db.insert("gameEvents", {
        roomId: args.roomId,
        sessionId: args.sessionId,
        action: "hold_and_win",
        payload: { newScore, goal: GOAL },
        timestamp: Date.now(),
      });

      return { newScore, gameFinished: true, winner: isPlayer1 ? 1 : 2 };
    }

    await ctx.db.patch(room._id, {
      [`player${playerKey}`]: {
        ...currentPlayer,
        score: newScore,
        current: 0,
      },
      turn: otherTurn,
    });

    await ctx.db.insert("gameEvents", {
      roomId: args.roomId,
      sessionId: args.sessionId,
      action: "hold",
      payload: { newScore },
      timestamp: Date.now(),
    });

    return { newScore, gameFinished: false, newTurn: otherTurn };
  },
});
```

### Frontend (integración básica)

```typescript
// src/convex.ts
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL);

export async function createOnlineRoom(playerName: string, catId: string) {
  const sessionId = sessionStorage.getItem("sessionId") || generateUUID();
  sessionStorage.setItem("sessionId", sessionId);

  const { roomId } = await convex.mutation(api.rooms.createRoom, {
    sessionId,
    playerName,
    catId,
  });

  return roomId;
}

export async function joinOnlineRoom(roomId: string, playerName: string, catId: string) {
  const sessionId = sessionStorage.getItem("sessionId") || generateUUID();
  sessionStorage.setItem("sessionId", sessionId);

  await convex.mutation(api.rooms.joinRoom, {
    roomId,
    sessionId,
    playerName,
    catId,
  });

  return roomId;
}

export function watchRoom(roomId: string, callback: (room: Room) => void) {
  return convex.watchQuery(api.rooms.getRoom, { roomId }).on("change", callback);
}
```

---

## 5. Alternativas (Quick Comparison)

| Opción | Ventajas | Desventajas | Para Demo |
|--------|----------|-------------|-----------|
| **Convex** | Real-time, TypeScript, sin servidor | Tier gratuito limitado | ✅ Mejor opción |
| **Firebase Realtime** | Gratis, escalable, WebSocket | JSON structure, menos TypeScript | ⚠️ Funciona |
| **Supabase** | PostgreSQL, real-time, open source | Más setup, hosting separado | ⚠️ Más trabajo |
| **Socket.io + Node** | Control total, conocido | Hay que hostear y mantener | ❌ Para demo overkill |
| **Ably** | Realtime puro, muy confiable | Pago desde el inicio | ❌ Costo inicial |

---

## 6. Costos (Convex Tier Gratuito)

- **2.5M invocaciones/mes**: Suficiente para ~1000 partidas/mes si cada partida = ~50 invocaciones (rolls + holds + queries)
- **1GB almacenamiento**: Para salas y gameEvents, sin problema
- **No tiene límite de usuarios simultáneos** (solo invocaciones)

**Estimación demo**: Si juegas 10 partidas/día, usas ~0.5M invocaciones/mes. Plenty.

---

## 7. Pendiente de Definir

- ¿TTL de salas? (30 min es razonable para demo)
- ¿Permitir espectadores?
- ¿Grabar partidas para ver después?
- ¿Desconexiones: reconectar o game over?
- ¿Lag/timeout: qué pasa si se desconecta el jugador 1?

---

## Recomendación

**Usa Convex.** Es la opción más directa:
1. Cero setup de servidor
2. Real-time out of the box
3. Tier gratuito cubre demo
4. TypeScript end-to-end es limpio
5. Escala si la demo crecerá más

Próximo paso: crear tabla de schema en Convex, conectar cliente, y testear flujo básico de crear/unirse sala.
