# Chat con los rivales CPU

Feature planificada para el modo **Vs. IA**: durante la partida, el jugador
puede chatear en vivo con el personaje rival. No antes ni después — solo
mientras se juega.

Nada de esto está implementado todavía.

---

## 1. Flujo

```
Vs. IA
 ├─ Seleccionar personaje
 ├─ Seleccionar rival
 └─ Partida en curso
      └─ 💬 Chat con el rival (overlay o panel lateral)
```

El chat aparece como panel accesible durante la partida: un ícono flotante que
abre un cuadro de texto, pausando o sin pausar la partida según se decida en
UX.

---

## 2. Arquitectura — hace falta backend

**Nunca llamar a la API del modelo directamente desde la app con la clave
embebida.** Se extrae del bundle sin esfuerzo. Hace falta un intermediario:

```
App
   │  mensaje del usuario + id del personaje
   ▼
Backend propio (Node/Express, Cloudflare Workers, Supabase Edge Functions…)
   │  arma el prompt con la personalidad del personaje
   ▼
API del modelo
   │  respuesta
   ▼
Backend → App (streaming o respuesta completa)
```

Esto significa que el modo Vs. IA con chat **no puede vivir solo en el sitio
estático**. Es la primera pieza del proyecto que va a necesitar servidor.

---

## 3. Personalidad por personaje

Cada rival necesita su propio system prompt, o las conversaciones salen todas
iguales:

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

Los personajes actuales del juego (Tax Penguin, Bearnardo, Lucky Ducky,
Mystery Egg) ya tienen `quote` y `loseQuote` en `script.js` — esa voz es el
punto de partida para su prompt.

---

## 4. Ejemplo de llamada, desde el backend

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-opus-5",
    max_tokens: 300,
    system: characterPrompts[characterId],
    messages: [{ role: "user", content: userMessage }],
  })
});
```

La clave sale de una variable de entorno del servidor. Nunca de un archivo
del repositorio.

---

## 5. Consideraciones

- **Latencia:** usar streaming para que no corte el ritmo de la partida.
- **Límite de mensajes:** rate limit por partida, o el costo se dispara.
- **Contexto:** pasar el estado de la partida (puntaje, turno) al prompt para
  que el rival reaccione a lo que está pasando.
- **Moderación:** filtrar el input del usuario si el chat se puede compartir.
- **Costo:** cada mensaje es una llamada. Cachear personalidades y acotar los
  tokens de respuesta.
