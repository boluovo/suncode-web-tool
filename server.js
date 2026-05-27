const http = require("http");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const { execFile } = require("child_process");

const PORT = 5128;
const MAX_BODY_BYTES = 50 * 1024 * 1024;
const PUBLIC_DIR = __dirname;
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

function run(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, { timeout: 120000 }, (error, stdout, stderr) => {
      if (error) {
        error.message = `${error.message}\n${stderr || stdout}`;
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("SVG 文件过大。"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function safeBaseName(filename) {
  return path
    .basename(filename || "artwork.svg")
    .replace(/\.svg$/i, "")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "artwork";
}

function jsxString(value) {
  return JSON.stringify(value);
}

function buildIllustratorScript(sourceSvg, outputAi) {
  return `
var sourceFile = new File(${jsxString(sourceSvg)});
var outputFile = new File(${jsxString(outputAi)});
var doc = app.open(sourceFile);

var options = new IllustratorSaveOptions();
options.compatibility = Compatibility.ILLUSTRATOR17;
options.pdfCompatible = true;
options.compressed = true;

doc.saveAs(outputFile, options);
doc.close(SaveOptions.DONOTSAVECHANGES);
`;
}

async function verifyIllustrator() {
  const appPath = "/Applications/Adobe Illustrator 2021/Adobe Illustrator.app";

  try {
    await run("codesign", ["--verify", "--deep", "--strict", appPath]);
  } catch {
    throw new Error("Adobe Illustrator 2021 应用签名无效，macOS 无法安全启动或自动化调用。请用 Creative Cloud 修复/重装 Illustrator 后再导出 AI。");
  }
}

async function convertSvgToAi(svg, filename) {
  await verifyIllustrator();

  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), "suncode-ai-"));
  const baseName = safeBaseName(filename);
  const svgPath = path.join(workDir, `${baseName}.svg`);
  const aiPath = path.join(workDir, `${baseName}.ai`);
  const jsxPath = path.join(workDir, "convert.jsx");

  await fs.writeFile(svgPath, svg, "utf8");
  await fs.writeFile(jsxPath, buildIllustratorScript(svgPath, aiPath), "utf8");

  const appleScript = `
tell application "Adobe Illustrator"
  activate
  do javascript (POSIX file "${jsxPath.replace(/"/g, '\\"')}" as alias)
end tell
`;

  await run("osascript", ["-e", appleScript]);
  const output = await fs.readFile(aiPath);
  return { output, baseName };
}

function send(response, status, body, headers = {}) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...headers,
  });
  response.end(body);
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === "/convert-ai") {
    response.writeHead(302, { Location: "/" });
    response.end();
    return;
  }

  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    send(response, 403, "Forbidden");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    send(response, 200, content, {
      "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
    });
  } catch {
    send(response, 404, "Not found");
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    send(response, 204, "");
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    await serveStatic(request, response);
    return;
  }

  if (request.method !== "POST" || request.url !== "/convert-ai") {
    send(response, 404, "Not found");
    return;
  }

  try {
    const payload = JSON.parse(await readBody(request));
    if (!payload.svg || typeof payload.svg !== "string") {
      send(response, 400, "缺少 SVG 内容。");
      return;
    }

    const { output, baseName } = await convertSvgToAi(payload.svg, payload.filename);
    send(response, 200, output, {
      "Content-Type": "application/postscript",
      "Content-Disposition": `attachment; filename="${baseName}.ai"`,
    });
  } catch (error) {
    send(response, 500, `AI 导出失败：${error.message}`);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`AI converter is running at http://127.0.0.1:${PORT}`);
});
