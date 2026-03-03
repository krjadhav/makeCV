import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { postCompile, getCompile } from "../../api/src/routes/compile.js";
import { createShareLink } from "../../api/src/routes/shareLinks.js";
import { getPdfDownload } from "../../api/src/routes/download.js";
import { getLatestSuccessfulArtifact } from "../../api/src/services/compileService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");
const publicDir = join(__dirname, "..", "public");
const port = Number(process.env.PORT || 3000);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8"
};

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

async function parseJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (req.method === "POST" && url.pathname === "/api/compile") {
    const payload = await parseJson(req);
    const result = postCompile(payload);
    return sendJson(res, result.statusCode, result.body);
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/compile/")) {
    const compileId = url.pathname.split("/").pop();
    const result = getCompile(compileId);
    return sendJson(res, result.statusCode, result.body);
  }

  if (req.method === "POST" && url.pathname === "/api/share-links") {
    const payload = await parseJson(req);
    const result = createShareLink(payload);
    return sendJson(res, result.statusCode, result.body);
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/download/")) {
    const documentId = url.pathname.split("/").pop();
    const result = getPdfDownload(documentId);
    return sendJson(res, result.statusCode, result.body);
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/preview/")) {
    const documentId = url.pathname.split("/").pop();
    const artifact = getLatestSuccessfulArtifact(documentId);
    if (!artifact) {
      return sendJson(res, 409, {
        error: { code: "compile_required", message: "no successful compile artifact", details: null }
      });
    }

    return sendJson(res, 200, {
      source: artifact.source,
      revisionId: artifact.revisionId,
      previewUrl: artifact.previewUrl
    });
  }

  const path = url.pathname === "/" ? "/index.html" : url.pathname;
  const fullPath = join(publicDir, path);

  try {
    const data = await readFile(fullPath);
    const type = mime[extname(fullPath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`makeCV local app running on http://localhost:${port}`);
});
