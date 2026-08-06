# Menú y flujo de pantallas

Estado del menú principal y de la navegación. Lo marcado como **implementado**
ya está en el código; el resto es el plan.

---

## 1. Flujo de pantallas

```
#/title      Splash — cartel del callejón + botón "Iniciar"
   │
   ▼
#/menu       Menú principal
   ├─ Duelo Online (1v1)      → pendiente
   ├─ Vs. IA                  → pendiente (ver chat-ia-rivales.md)
   ├─ Duelo Local             → #/select   ✅ implementado
   ├─ Personalización         → pendiente
   └─ Tienda                  → pendiente
             │
             ▼
#/select     Selección de personaje  ✅
             │
             ▼
#/game       Partida  ✅
             │
             ▼
#/gameover   Resultado  ✅
```

---

## 2. Nombres de las secciones

| Función | Nombre elegido | Estado |
|---|---|---|
| 1v1 online | Duelo Online | pendiente |
| Contra CPU | Vs. IA | pendiente |
| Dos jugadores en la misma pantalla | Duelo Local | **jugable** |
| Personalización | Personalización | pendiente |
| Tienda | Tienda | pendiente |

Secciones opcionales a sumar más adelante: Ajustes, Ranking, Logros,
Perfil/Estadísticas, Tutorial, Salir.

---

## 3. Cómo agregar un modo — implementado

Las entradas del menú salen de `MENU_ITEMS` en `script.js`. No se tocan ni el
HTML ni el CSS para sumar una:

```javascript
const MENU_ITEMS = [
  { id: "online", label: "Duelo Online", ready: false, note: "1v1" },
  { id: "cpu",    label: "Vs. IA",       ready: false, note: "práctica" },
  { id: "local",  label: "Duelo Local",  ready: true,  route: "select" },
  { id: "skins",  label: "Personalización", ready: false },
  { id: "shop",   label: "Tienda",       ready: false },
];
```

- `ready: false` → la entrada se dibuja gris y deshabilitada. Se ve el roadmap
  sin fingir que el botón anda; el atributo `disabled` ya comunica el estado,
  al usuario y al lector de pantalla.
- `ready: true` → hace falta un `route` que exista en `ROUTES`.

Construir un modo = dar de alta su pantalla, agregarla a `ROUTES`, y dar vuelta
el flag.

---

## 4. Routing — implementado

Hash routing, no History API. El juego se abre como archivo estático (`file://`
o `/projects/...`), donde una ruta con `pushState` da 404 al recargar. El hash
sobrevive los dos casos.

```
ROUTES = ["title", "menu", "select", "game", "gameover"]
```

Reglas del diseño:

- **`switchScreen(name)` solo escribe el hash.** El listener de `hashchange` es
  el único que pinta. Así el click de un botón y la flecha "atrás" del navegador
  recorren el mismo camino, en vez de ser dos caminos que se desincronizan.
- **`resolveRoute(name)` valida.** Una pantalla solo es alcanzable si existe el
  estado que la sostiene: `#/game` sin jugadores elegidos cae a `#/select`, y
  una ruta inventada cae a `#/title`. Cuando la guarda reescribe el destino usa
  `location.replace`, así el "atrás" no rebota.
- **`init()` respeta el hash que ya venga en la URL** — recarga, marcador o
  link compartido caen donde corresponde.

Vuelta atrás en la interfaz: botón "‹ Volver" en el menú (→ título) y en la
selección de personaje (→ menú).

---

## 5. Pendiente de definir

- Qué pantallas cuelgan de Duelo Online, Personalización y Tienda.
- Si Ajustes y Reglas entran al menú o se quedan en el HUD.
