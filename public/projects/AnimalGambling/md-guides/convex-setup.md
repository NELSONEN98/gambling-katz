# Convex Setup: Juego Online

**Deployment URL:** `https://quixotic-squid-855.convex.cloud`

---

## Estado Actual

✅ Backend (Convex) deployado
✅ Schema creado (rooms, gameEvents)
✅ Funciones listas:
  - createRoom()
  - joinRoom()
  - getRoom() (query)
  - rollDice()
  - holdScore()

✅ Cliente JS creado: `convex-client.js`

---

## Próximos Pasos: Frontend Integration

### 1. Importar cliente en script.js

En la sección donde está el menú, agrega:
```javascript
import { 
  createOnlineRoom, 
  joinOnlineRoom, 
  watchRoom, 
  rollDice, 
  holdScore 
} from "./convex-client.js";
```

### 2. Crear pantalla "Duelo Online"

En `index.html`, agregar una nueva sección entre `menu-screen` y `select-screen`:

```html
<section class="screen online-screen" id="screen-online">
  <div class="online-header">
    <button class="btn-nav" id="btn-online-back">‹ Volver al menú</button>
    <h2>DUELO ONLINE</h2>
  </div>
  
  <div class="online-content">
    <div class="online-option">
      <button class="btn-nav" id="btn-create-room">+ CREAR SALA</button>
      <p>Genera un código y comparte con tu rival</p>
    </div>
    
    <div class="online-option">
      <button class="btn-nav" id="btn-join-room">UNIRSE A SALA</button>
      <input type="text" id="room-code" placeholder="Pegá el código aquí" />
    </div>
  </div>
  
  <div class="online-waiting" id="online-waiting" style="display: none;">
    <div class="room-code">Código: <span id="display-room-code"></span></div>
    <p>Esperando al otro jugador...</p>
    <button class="btn-nav" id="btn-cancel-wait">Cancelar</button>
  </div>
</section>
```

### 3. Actualizar MENU_ITEMS

En `script.js`:
```javascript
const MENU_ITEMS = [
  { id: "online", label: "Duelo Online", ready: true, route: "online" },
  { id: "cpu",    label: "Vs. IA",       ready: false, note: "práctica" },
  { id: "local",  label: "Duelo Local",  ready: true,  route: "select" },
  // ... resto
];
```

### 4. Agregar rutas

En `ROUTES`:
```javascript
const ROUTES = ["title", "menu", "online", "select", "game", "gameover"];
```

### 5. Flujo de eventos

**Crear sala:**
```javascript
$("#btn-create-room").addEventListener("click", async () => {
  const playerName = ROSTER[selectedCatP1].name;
  const catId = selectedCatP1;
  
  try {
    const roomId = await createOnlineRoom(playerName, catId);
    document.getElementById("display-room-code").textContent = roomId;
    document.getElementById("online-waiting").style.display = "block";
    
    // Esperar al jugador 2
    const unsubscribe = watchRoom(roomId, (room) => {
      if (room.status === "playing") {
        unsubscribe();
        sessionStorage.setItem("roomId", roomId);
        switchScreen("select"); // Que player 1 no pueda cambiar personaje
        switchScreen("game");
      }
    });
  } catch (error) {
    alert("Error: " + error.message);
  }
});

$("#btn-join-room").addEventListener("click", async () => {
  const roomId = document.getElementById("room-code").value.toUpperCase();
  const playerName = ROSTER[selectedCatP2].name;
  const catId = selectedCatP2;
  
  try {
    await joinOnlineRoom(roomId, playerName, catId);
    sessionStorage.setItem("roomId", roomId);
    switchScreen("game");
  } catch (error) {
    alert("Error: " + error.message);
  }
});
```

### 6. Actualizar botones de juego

En `renderGameUI()`:
```javascript
// Reemplazar los listeners de rollDice y holdScore:
$("#btn-roll").addEventListener("click", async () => {
  const roomId = sessionStorage.getItem("roomId");
  if (roomId) {
    // Online mode
    const result = await rollDice(roomId);
    // Actualizar UI con result.roll, result.isBust, etc.
  } else {
    // Local mode (actual rollDice logic)
    rollDice();
  }
});
```

### 7. CSS para pantalla online

Agregar a `style.css`:
```css
.online-screen {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 3rem;
}

.online-screen.active {
  display: flex;
}

.online-content {
  display: flex;
  gap: 2rem;
}

.online-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.online-option input {
  padding: 1rem;
  font-size: 1.2rem;
  border: 1px solid #E4A700;
  background: #000;
  color: #fff;
}

.room-code {
  font-size: 2rem;
  color: #E4A700;
  letter-spacing: 0.2em;
}
```

---

## Testing

1. Abrí 2 ventanas del navegador (Browser 1 y Browser 2)
2. Ambos van a #/online
3. Browser 1: "Crear Sala" → obtiene código (ej: ABC123)
4. Browser 2: "Unirse a Sala" → pega ABC123
5. Ambos entran a #/game cuando Browser 2 se une
6. Pueden tirar dados y ver cambios en vivo

---

## Debugging

- Abrí la consola del navegador (F12) para ver mensajes de error
- Convex logs están en el dashboard: https://dashboard.convex.dev
- Cada mutation registra un evento en `gameEvents`
