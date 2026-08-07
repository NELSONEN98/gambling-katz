import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://quixotic-squid-855.convex.cloud";
const convex = new ConvexHttpClient(CONVEX_URL);

// Generate UUID for session
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// Get or create session ID
function getSessionId() {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

// Create a new game room
export async function createOnlineRoom(playerName, catId) {
  const sessionId = getSessionId();
  try {
    const result = await convex.mutation("rooms:createRoom", {
      sessionId,
      playerName,
      catId,
    });
    return result.roomId;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

// Join an existing game room
export async function joinOnlineRoom(roomId, playerName, catId) {
  const sessionId = getSessionId();
  try {
    const result = await convex.mutation("rooms:joinRoom", {
      roomId,
      sessionId,
      playerName,
      catId,
    });
    return result.roomId;
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
}

// Get room state (one-time fetch)
export async function getRoom(roomId) {
  try {
    return await convex.query("rooms:getRoom", { roomId });
  } catch (error) {
    console.error("Error fetching room:", error);
    throw error;
  }
}

// Watch room for real-time updates
export function watchRoom(roomId, callback) {
  try {
    return convex.watchQuery("rooms:getRoom", { roomId }).on("change", callback);
  } catch (error) {
    console.error("Error watching room:", error);
    throw error;
  }
}

// Roll dice
export async function rollDice(roomId) {
  const sessionId = getSessionId();
  try {
    return await convex.mutation("rooms:rollDice", { roomId, sessionId });
  } catch (error) {
    console.error("Error rolling dice:", error);
    throw error;
  }
}

// Hold score
export async function holdScore(roomId) {
  const sessionId = getSessionId();
  try {
    return await convex.mutation("rooms:holdScore", { roomId, sessionId });
  } catch (error) {
    console.error("Error holding score:", error);
    throw error;
  }
}
