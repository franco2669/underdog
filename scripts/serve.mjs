import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist", import.meta.url));
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function resolvePath(url) {
  const clean = decodeURIComponent(url.split("?")[0]).replace(/^\/+/, "");
  const candidate = normalize(join(root, clean || "index.html"));
  if (!candidate.startsWith(root)) return null;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    return join(candidate, "index.html");
  }
  if (existsSync(candidate)) return candidate;
  const withIndex = join(candidate, "index.html");
  if (existsSync(withIndex)) return withIndex;
  return null;
}

createServer((req, res) => {
  const file = resolvePath(req.url || "/");
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Underdog Heroes site running at http://localhost:${port}`);
});
