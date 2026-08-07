/**
 * Netlify Function - Convex Proxy
 * Handles POST requests to /.netlify/functions/convex-proxy
 */

const CONVEX_URL = "https://quixotic-squid-855.convex.cloud";

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod === "POST") {
    try {
      const { functionPath, args } = JSON.parse(event.body);

      if (!functionPath || !args) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Missing functionPath or args" }),
        };
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
        return {
          statusCode: convexResponse.status,
          headers,
          body: JSON.stringify({ error }),
        };
      }

      const result = await convexResponse.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.error("Proxy error:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };
  }
};
