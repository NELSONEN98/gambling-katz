# Conexión a Radio Browser API — Radio de Jazz

Documentación y código base para conectar una app (demo en HTML/CSS/JS, migrable luego a React Native) a estaciones de radio de jazz usando **Radio Browser API**.

---

## 1. Info general de la API

- **Base URL:** `https://de1.api.radio-browser.info` (servidor mirror fijo, recomendado para evitar problemas de DNS round-robin en demos)
- **Auth:** No requiere API key
- **Formato:** JSON
- **CORS:** Habilitado
- **Docs oficiales:** https://api.radio-browser.info/

> Nota: la API usa varios servidores mirror bajo `all.api.radio-browser.info`. Para producción es buena práctica resolver el mirror dinámicamente (ver sección 5), pero para el demo usamos un servidor fijo (`de1`) por simplicidad.

---

## 2. Endpoint principal usado

```
GET https://de1.api.radio-browser.info/json/stations/bytag/jazz
```

### Parámetros útiles (query string)

| Parámetro | Descripción | Ejemplo |
|---|---|---|
| `limit` | Cantidad de resultados | `20` |
| `order` | Campo de ordenamiento | `clickcount`, `votes`, `bitrate` |
| `reverse` | Orden descendente | `true` |
| `hidebroken` | Oculta estaciones caídas | `true` |

### Ejemplo de request completo

```
https://de1.api.radio-browser.info/json/stations/bytag/jazz?limit=20&order=clickcount&reverse=true&hidebroken=true
```

### Campos relevantes de la respuesta

| Campo | Descripción |
|---|---|
| `stationuuid` | ID único de la estación |
| `name` | Nombre de la estación |
| `url_resolved` | URL real del stream (usar esta, no `url`) |
| `favicon` | Logo/ícono de la estación |
| `country` | País de origen |
| `codec` | Formato de audio (MP3, AAC...) |
| `bitrate` | Calidad del stream |
| `tags` | Géneros/etiquetas |
| `clickcount` | Popularidad (usado para ordenar) |

---

## 3. Demo funcional — HTML / CSS / JS

Archivo único, sin dependencias externas.

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Jazz Radio</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    background: #14100f;
    color: #f2e9dc;
    max-width: 480px;
    margin: 40px auto;
    padding: 0 16px;
  }
  h1 { font-size: 1.4rem; margin-bottom: 4px; }
  .station {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #221b18;
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background .2s;
  }
  .station:hover { background: #33281f; }
  .station img {
    width: 40px; height: 40px;
    border-radius: 6px;
    object-fit: cover;
    background: #444;
  }
  .station .info { flex: 1; }
  .station .name { font-weight: 600; font-size: .95rem; }
  .station .meta { font-size: .75rem; opacity: .6; }
  #player-bar {
    position: sticky; bottom: 0;
    background: #1a1512;
    padding: 12px;
    border-radius: 10px;
    margin-top: 16px;
  }
  audio { width: 100%; }
  #now-playing { font-size: .85rem; margin-bottom: 6px; opacity: .8; }
</style>
</head>
<body>

<h1>🎷 Jazz Radio</h1>
<div id="status">Cargando estaciones...</div>
<div id="stations"></div>

<div id="player-bar">
  <div id="now-playing">Selecciona una estación</div>
  <audio id="player" controls></audio>
</div>

<script>
const API_BASE = "https://de1.api.radio-browser.info";
const stationsEl = document.getElementById("stations");
const statusEl = document.getElementById("status");
const player = document.getElementById("player");
const nowPlaying = document.getElementById("now-playing");

async function fetchJazzStations() {
  try {
    const url = `${API_BASE}/json/stations/bytag/jazz?limit=25&order=clickcount&reverse=true&hidebroken=true`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const stations = await res.json();
    renderStations(stations);
  } catch (err) {
    statusEl.textContent = "Error cargando estaciones: " + err.message;
  }
}

function renderStations(stations) {
  statusEl.remove();
  stationsEl.innerHTML = "";

  if (!stations.length) {
    stationsEl.textContent = "No se encontraron estaciones.";
    return;
  }

  stations.forEach(station => {
    const div = document.createElement("div");
    div.className = "station";
    div.innerHTML = `
      <img src="${station.favicon || ''}" onerror="this.style.display='none'">
      <div class="info">
        <div class="name">${station.name}</div>
        <div class="meta">${station.country || 'N/A'} · ${station.codec || ''} ${station.bitrate ? station.bitrate + 'kbps' : ''}</div>
      </div>
    `;
    div.addEventListener("click", () => playStation(station));
    stationsEl.appendChild(div);
  });
}

function playStation(station) {
  player.src = station.url_resolved || station.url;
  player.play().catch(e => console.warn("No se pudo reproducir:", e));
  nowPlaying.textContent = `▶ ${station.name}`;

  // Registrar click en Radio Browser (opcional, ayuda a las stats de la estación)
  if (station.stationuuid) {
    fetch(`${API_BASE}/json/url/${station.stationuuid}`).catch(() => {});
  }
}

fetchJazzStations();
</script>
</body>
</html>
```

Guarda esto como `index.html` y ábrelo directamente en el navegador. No necesita servidor ni build step.

---

## 4. Migración a React Native

La API funciona igual (mismo `fetch`), lo único que cambia es el reproductor de audio. Recomendado: **`expo-av`** o **`react-native-track-player`** (mejor para controles en background/lockscreen).

### Ejemplo con `expo-av`

```javascript
import { Audio } from 'expo-av';

const API_BASE = "https://de1.api.radio-browser.info";

async function fetchJazzStations() {
  const res = await fetch(
    `${API_BASE}/json/stations/bytag/jazz?limit=25&order=clickcount&reverse=true&hidebroken=true`
  );
  return await res.json();
}

let sound = null;

async function playStation(station) {
  if (sound) {
    await sound.unloadAsync();
  }
  const { sound: newSound } = await Audio.Sound.createAsync(
    { uri: station.url_resolved || station.url },
    { shouldPlay: true }
  );
  sound = newSound;
}
```

Recuerda configurar el modo de audio para que siga sonando en background si lo necesitas:

```javascript
await Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  playsInSilentModeIOS: true,
});
```

---

## 5. Notas para producción (opcional, no necesario para el demo)

- Usar resolución dinámica del mirror en vez de un servidor fijo (`de1`):
  ```javascript
  // Resolver el host más rápido vía DNS de all.api.radio-browser.info
  const hosts = await fetch("https://all.api.radio-browser.info/json/servers").then(r => r.json());
  ```
- Enviar un `User-Agent` identificable en las peticiones (buena práctica pedida por la comunidad de Radio Browser, aunque no es obligatorio desde navegador/RN por restricciones de headers).
- Cachear la lista de estaciones localmente para no golpear la API en cada apertura de la app.
- Validar que `url_resolved` no esté vacío antes de reproducir (algunas estaciones quedan sin stream activo pese al filtro `hidebroken`).

---

## 6. Recursos

- Docs oficiales: https://api.radio-browser.info/
- Wrapper JS/TS (opcional, limpia duplicados): `npm install radio-browser-api`

---

## 7. Menú del juego — nombres recomendados

Secciones base:

| Función | Nombre sugerido |
|---|---|
| User 1c1 online | Duelo Online / 1v1 Ranked |
| User vs CPU | Modo Práctica / Vs. IA |
| Personalización | Mi Estilo / Skins |
| Tienda | Mercado / Shop |

Secciones opcionales para sumar: Ajustes, Ranking, Logros, Perfil/Estadísticas, Tutorial, Salir.

---

## 8. Chat con Agente IA — personajes CPU (durante la partida)

Funcionalidad: en el **modo Vs. CPU**, el usuario puede chatear en vivo con el personaje rival mientras la partida está en curso (no antes ni después).

### 8.1 Flujo

```
Vs. IA
 ├─ Seleccionar Personaje
 ├─ Seleccionar Rival
 └─ Combate en curso
      └─ 💬 Chat abierto con el Rival (overlay o panel lateral)
```

El chat se muestra como un panel/overlay accesible durante el combate (por ejemplo, un ícono flotante que abre un cuadro de texto sin pausar el juego, o pausando la partida mientras se chatea, según el diseño de UX que prefieras).

### 8.2 Arquitectura recomendada

**Nunca llamar a la API del LLM directamente desde la app** con la API key embebida (se puede extraer del bundle de React Native). Se necesita un backend intermedio:

```
App (React Native)
   │  mensaje del usuario + id del personaje
   ▼
Backend propio (Node/Express, Cloudflare Workers, Supabase Edge Functions...)
   │  arma el prompt con la personalidad del personaje
   ▼
API del modelo (Claude, etc.)
   │  respuesta
   ▼
Backend → App (streaming o respuesta completa)
```

### 8.3 Personalidad por personaje

Cada personaje CPU necesita su propio "system prompt" para que la conversación no se sienta genérica:

```javascript
const characterPrompts = {
  "rival_01": `Eres Kaito, un peleador arrogante y competitivo.
  Hablas en frases cortas, te burlas del jugador si va perdiendo,
  y reconoces a regañadientes si el jugador juega bien.
  Nunca rompas el personaje ni menciones que eres una IA.`,

  "rival_02": `Eres Mara, una veterana calmada y estratégica.
  Das consejos crípticos sobre combate, hablas con calma,
  casi nunca te alteras.`
};
```

### 8.4 Ejemplo de llamada desde el backend

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 300,
    system: characterPrompts[characterId],
    messages: [
      { role: "user", content: userMessage }
    ],
  })
});
```

### 8.5 Consideraciones

- **Latencia durante el combate:** usar streaming de la respuesta para que se sienta fluido y no interrumpa el ritmo del juego.
- **Límite de mensajes:** considerar un rate limit por partida para evitar abuso de la API (costo).
- **Contexto del combate:** opcionalmente, pasar el estado de la partida (vida restante, ronda, etc.) al prompt para que el personaje "reaccione" a lo que pasa en el combate en tiempo real.
- **Moderación:** filtrar input del usuario antes de mandarlo al modelo si el chat es público o se puede compartir.
- **Costo:** cada mensaje de chat es una llamada a la API; si el juego tiene muchos usuarios concurrentes, conviene cachear personalidades y limitar tokens de respuesta (ya limitado a 300 en el ejemplo).

---

## 9. Flujo de pantallas del juego

```
1. Pre-screen (Splash / "Jugar")
      │  usuario toca "Jugar"
      ▼
2. Menú Principal
      ├─ Duelo Online (1v1)
      ├─ Vs. IA
      │     └─ Chat con Agente IA disponible durante la partida (ver sección 8)
      ├─ Personalización
      └─ Tienda
```

*(pendiente de completar con las siguientes pantallas del flujo)*
