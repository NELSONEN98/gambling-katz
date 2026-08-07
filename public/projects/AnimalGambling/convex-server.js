/**
 * Simple proxy server for Convex calls
 * Run with: node convex-server.js
 * Listens on http://localhost:3000
 */

const http = require("http");
const querystring = require("querystring");

// In production, get this from environment variables
const CONVEX_DEPLOYMENT = "quixotic-squid-855";
const CONVEX_URL = `https://${CONVEX_DEPLOYMENT}.convex.cloud`;

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/convex") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { functionPath, args } = JSON.parse(body);

        // Forward to Convex
        const convexResponse = await fetch(`${CONVEX_URL}/api/json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: functionPath,
            args: [args],
          }),
        });

        const result = await convexResponse.json();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error("Error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Convex proxy server running at http://localhost:${PORT}`);
  console.log("Forward all /api/convex requests to this server");
});
