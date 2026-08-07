/**
 * Vercel Serverless Function - Convex Proxy
 * Handles POST requests to /api/convex-proxy
 */

const CONVEX_URL = "https://quixotic-squid-855.convex.cloud";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const { functionPath, args } = req.body;

      if (!functionPath || !args) {
        res.status(400).json({ error: "Missing functionPath or args" });
        return;
      }

      // Forward to Convex
      const convexResponse = await fetch(`${CONVEX_URL}/api/json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: functionPath,
          args: [args],
        }),
      });

      if (!convexResponse.ok) {
        const error = await convexResponse.text();
        res.status(convexResponse.status).json({ error });
        return;
      }

      const result = await convexResponse.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
