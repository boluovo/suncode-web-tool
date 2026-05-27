(() => {
const FIXED_SUNCODE_BASE64 =
  "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1" +
  "LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEu" +
  "MSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3" +
  "LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNjM2IDYzNiIgc3R5bGU9ImVuYWJsZS1i" +
  "YWNrZ3JvdW5kOm5ldyAwIDAgNjM2IDYzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJ" +
  "LnN0MHtmaWxsOiNGRkZGRkY7fQoJLnN0MXtmaWxsOiNGRkQ2MDA7fQoJLnN0MntmaWxsOiMyMjIyMjI7c3Ryb2tlOiMyMjIyMjI7" +
  "c3Ryb2tlLXdpZHRoOjEuNjt9Cgkuc3Qze2ZpbGw6IzIyMjIyMjt9Cgkuc3Q0e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTt9Cjwv" +
  "c3R5bGU+CjxnPgoJPGc+CgkJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMzE4IiBjeT0iMzE4IiByPSIxMDIuNSIvPgoJCTxnPgoJ" +
  "CQk8Zz4KCQkJCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjMxOCIgY3k9IjMxOCIgcj0iOTcuNSIvPgoJCQkJPGc+CgkJCQkJPHBh" +
  "dGggY2xhc3M9InN0MiIgZD0iTTMxOCwyNDQuN0MzMTgsMjQ0LjcsMzE4LDI0NC43LDMxOCwyNDQuN2MwLjEsMCwwLjEsMCwwLjEs" +
  "MEgzMTh6Ii8+CgkJCQkJPGc+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zNzUuOSwyOTguM3YtMi4xbC0xLjQsMS41Yy05" +
  "LjgsMTAuNS0yNC4yLDIxLjUtNDAuNywzMS4xYy0xNi43LDkuNi0zMy43LDE2LjctNDcuOCwxOS45bC0xLjgsMC40bDEuNSwxCgkJ" +
  "CQkJCQljOS42LDYuNCwyMC43LDkuOCwzMi4yLDkuOGMzMiwwLDU4LTI2LDU4LTU4YzAtMC42LDAtMS4yLTAuMS0xLjhDMzc1Ljks" +
  "Mjk5LjUsMzc1LjksMjk4LjksMzc1LjksMjk4LjN6Ii8+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zODIuMywyNjQuOGMt" +
  "MS42LTIuOC00LjktNC42LTkuOC01LjJjLTQtMC41LTguNy0wLjMtMTQuMiwwLjZjLTEwLjktMTAuNS0yNS4yLTE2LjMtNDAuMy0x" +
  "Ni4zCgkJCQkJCQljLTMyLDAtNTcuOSwyNi01Ny45LDU4YzAsNC42LDAuNiw5LjIsMS42LDEzLjhjLTMuOCw0LjQtNi41LDguNi04" +
  "LjIsMTIuNWMtMS45LDQuNC0yLDguMi0wLjQsMTFjMS42LDIuOCw0LjksNC42LDkuOCw1LjIKCQkJCQkJCWMxLjQsMC4yLDIuOSww" +
  "LjMsNC42LDAuM2MzLjksMCw4LjMtMC41LDEzLjEtMS42YzE0LjUtMy4xLDMxLjktMTAuMiw0OS4xLTIwLjJjMTcuMS05LjgsMzIt" +
  "MjEuMyw0Mi4xLTMyLjUKCQkJCQkJCWM0LjgtNS4yLDguMS0xMC4xLDEwLTE0LjZDMzgzLjgsMjcxLjQsMzgzLjksMjY3LjYsMzgy" +
  "LjMsMjY0Ljh6Ii8+CgkJCQkJPC9nPgoJCQkJPC9nPgoJCQkJPGc+CgkJCQkJPGc+CgkJCQkJCTxnPgoJCQkJCQkJPGRlZnM+CgkJ" +
  "CQkJCQkJPGNpcmNsZSBpZD0iU1ZHSURfMV8iIGN4PSIzMTgiIGN5PSIzMTgiIHI9Ijk3LjUiLz4KCQkJCQkJCTwvZGVmcz4KCQkJ" +
  "CQkJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCQkJCQkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgc3R5bGU9Im92" +
  "ZXJmbG93OnZpc2libGU7Ii8+CgkJCQkJCQk8L2NsaXBQYXRoPgoJCQkJCQkJPGcgY2xhc3M9InN0NCI+CgkJCQkJCQkJPGc+CgkJ" +
  "CQkJCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zMTgsMzUxLjJjLTMzLjcsMC02NC42LDIuOC04OC43LDcuNGMxNS40LDMzLjYs" +
  "NDkuMyw1Ni45LDg4LjcsNTYuOWMzOS40LDAsNzMuMy0yMy4zLDg4LjctNTYuOQoJCQkJCQkJCQkJQzM4Mi42LDM1NCwzNTEuNywz" +
  "NTEuMiwzMTgsMzUxLjJ6Ii8+CgkJCQkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMjcuNywzNTQuOWMxLDIuNSwyLjEsNC45" +
  "LDMuMyw3LjNjMjQuNC00LjYsNTQuOS03LjEsODYuOS03LjFjMzIuMSwwLDYyLjYsMi41LDg2LjksNy4xCgkJCQkJCQkJCQljMS4y" +
  "LTIuNCwyLjMtNC44LDMuMy03LjNjLTI1LjItNC45LTU2LjktNy42LTkwLjQtNy42QzI4NC42LDM0Ny4zLDI1MywzNTAsMjI3Ljcs" +
  "MzU0Ljl6Ii8+CgkJCQkJCQkJPC9nPgoJCQkJCQkJPC9nPgoJCQkJCQk8L2c+CgkJCQkJPC9nPgoJCQkJPC9nPgoJCQkJPGNpcmNs" +
  "ZSBjbGFzcz0ic3QxIiBjeD0iMzMxLjQiIGN5PSIyNzkuMSIgcj0iOS41Ii8+CgkJCQk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIz" +
  "MTMuMyIgY3k9IjI5Ny4yIiByPSI0LjgiLz4KCQkJPC9nPgoJCQk8Zz4KCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMTgsNDE1" +
  "LjZjLTUzLjgsMC05Ny42LTQzLjgtOTcuNi05Ny42YzAtNTMuOCw0My44LTk3LjYsOTcuNi05Ny42YzUzLjgsMCw5Ny42LDQzLjgs" +
  "OTcuNiw5Ny42CgkJCQkJQzQxNS42LDM3MS44LDM3MS44LDQxNS42LDMxOCw0MTUuNnogTTMxOCwyMjIuNGMtNTIuNywwLTk1LjYs" +
  "NDIuOS05NS42LDk1LjZzNDIuOSw5NS42LDk1LjYsOTUuNnM5NS42LTQyLjksOTUuNi05NS42CgkJCQkJUzM3MC43LDIyMi40LDMx" +
  "OCwyMjIuNHoiLz4KCQkJPC9nPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMjg3" +
  "LjcsMzY2LjggMjg3LjYsMzY2LjggMjgxLjMsMzY2LjggMjc3LjQsMzcyLjggMjgxLjEsMzc2LjggCSIvPgoJPHBvbHlnb24gY2xh" +
  "c3M9InN0MSIgcG9pbnRzPSIzMTguMSwzNjYuOCAzMTQuNCwzNzIuNSAzMTcuNCwzNzcuMSAzMjQuMSwzNjYuOCAJIi8+Cgk8cG9s" +
  "eWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjI5NC45LDM2Ni44IDI4NS4yLDM4NS4zIDI3NC45LDM3My4xIDI3NC45LDM2Ni43IDI2" +
  "OS4yLDM2Ni43IDI2OS4yLDM4OS41IDI3NC45LDM4OS41IDI3NC45LDM4MSAKCQkyODIsMzg5LjUgMjg4LjgsMzg5LjUgMjk1LjUs" +
  "Mzc2LjcgMzAyLjIsMzg5LjUgMzA4LjEsMzg5LjUgMjk2LjIsMzY2LjcgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRz" +
  "PSIzMDIuNSwzNjYuOCAzMTAuNSwzNzguOSAzMTAuNSwzODkuNiAzMTYuMywzODkuNiAzMTYuMywzNzguOSAzMDguMywzNjYuOCAJ" +
  "Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzYxLDM2Ni44djEzLjVjMCwwLjUsMCwxLjEtMC4yLDEuNnMtMC41LDAuOS0wLjks" +
  "MS4zYy0wLjksMC43LTEuOSwxLjEtMywxLjFjLTEuMSwwLTEuMSwwLTEuNi0wLjMKCQljLTAuNS0wLjItMS0wLjUtMS40LTAuOGMt" +
  "MC44LTAuNy0xLjItMS43LTEuMi0yLjl2LTEzLjVoLTUuOHYxMy40YzAsMS44LDAuNCwzLjQsMS4zLDQuOWMwLjgsMS40LDIsMi41" +
  "LDMuNSwzLjNzMy4zLDEuMiw1LjIsMS4xCgkJYzEuOCwwLDMuNS0wLjMsNS4xLTEuMmMxLjUtMC44LDIuNy0xLjksMy42LTMuMmMw" +
  "LjktMS41LDEuMy0zLjIsMS4yLTQuOXYtMTMuNEgzNjF6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzMzLDM2Ni44QzMzMywz" +
  "NjYuOCwzMzMsMzY2LjgsMzMzLDM2Ni44YzAuMSwwLDAuMSwwLDAuMSwwSDMzM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0z" +
  "MzMuMSwzNjYuOGMtNi40LDAtMTEuNyw1LjEtMTEuNywxMS40YzAsMC4yLDAsMC4zLDAsMC41YzAsMCwwLDAsMCwwaDUuNmMwLTAu" +
  "MSwwLTAuMywwLTAuNQoJCWMwLTMuMywyLjctNS45LDYtNS45czYsMi42LDYsNS45cy0yLjcsNS45LTYsNS45cy0zLjMtMC43LTQu" +
  "NC0xLjhsLTMuMiw0LjZjMiwxLjcsNC43LDIuNyw3LjYsMi43YzYuNCwwLDExLjctNS4xLDExLjctMTEuNAoJCUMzNDQuNywzNzEu" +
  "OSwzMzkuNSwzNjYuOCwzMzMuMSwzNjYuOHoiLz4KPC9nPgo8L3N2Zz4K";

const state = {
  svgText: "",
  svgName: "",
  suncodeSvgText: "",
  suncodeDataUrl: "",
  viewBox: { x: 0, y: 0, width: 1000, height: 1000 },
};

const els = {
  svgInput: document.querySelector("#svgInput"),
  svgName: document.querySelector("#svgName"),
  downloadJpeg: document.querySelector("#downloadJpeg"),
  openConvertio: document.querySelector("#openConvertio"),
  preview: document.querySelector("#preview"),
  statusTitle: document.querySelector("#statusTitle"),
  statusDetail: document.querySelector("#statusDetail"),
};

function setStatus(title, detail) {
  els.statusTitle.textContent = title;
  els.statusDetail.textContent = detail;
}

function setButtonsEnabled(enabled) {
  els.downloadJpeg.disabled = !enabled;
  els.openConvertio.disabled = !enabled;
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function parseViewBox(svgText) {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;
  const viewBox = svg.getAttribute("viewBox");

  if (viewBox) {
    const values = viewBox.trim().split(/[\s,]+/).map(Number);
    if (values.length === 4 && values.every(Number.isFinite)) {
      return { x: values[0], y: values[1], width: values[2], height: values[3] };
    }
  }

  const width = parseFloat(svg.getAttribute("width")) || 1000;
  const height = parseFloat(svg.getAttribute("height")) || 1000;
  return { x: 0, y: 0, width, height };
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeBase64Utf8(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder("utf-8").decode(bytes);
}

function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function parseClassStyles(svgText) {
  const styles = new Map();
  const styleBlocks = svgText.match(/<style[\s\S]*?<\/style>/gi) || [];

  styleBlocks.forEach((block) => {
    const css = block.replace(/<style[^>]*>/i, "").replace(/<\/style>/i, "");
    const rulePattern = /\.([A-Za-z_][\w-]*)\s*\{([^}]+)\}/g;
    let rule;

    while ((rule = rulePattern.exec(css))) {
      styles.set(rule[1], rule[2].trim().replace(/\s+/g, " "));
    }
  });

  return styles;
}

function inlineClassStyles(svgText) {
  const classStyles = parseClassStyles(svgText);
  const withoutStyleBlocks = svgText.replace(/<style[\s\S]*?<\/style>/gi, "");

  return withoutStyleBlocks.replace(/<([A-Za-z][\w:-]*)([^>]*)\sclass=(["'])([^"']+)\3([^>]*)>/g, (match, tag, before, _quote, classNames, after) => {
    const inlineStyles = classNames
      .trim()
      .split(/\s+/)
      .map((className) => classStyles.get(className))
      .filter(Boolean)
      .join(" ");

    const rawAttrs = `${before}${after}`;
    const selfClosing = /\/\s*$/.test(rawAttrs);
    const attrs = rawAttrs.replace(/\/\s*$/, "");
    const mergedAttrs = attrs.replace(/\sstyle=(["'])([^"']*)\1/, (_styleMatch, quote, existingStyle) => {
      return ` style=${quote}${existingStyle.trim()} ${inlineStyles}${quote}`;
    });

    if (/\sstyle=/.test(mergedAttrs)) {
      return `<${tag}${mergedAttrs}${selfClosing ? "/" : ""}>`;
    }

    return `<${tag}${mergedAttrs} style="${inlineStyles}"${selfClosing ? "/" : ""}>`;
  });
}

function namespaceSvgFragment(svgText, prefix) {
  let namespaced = inlineClassStyles(svgText)
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<defs[\s\S]*?<\/defs>/gi, "")
    .replace(/<clipPath[\s\S]*?<\/clipPath>/gi, "")
    .replace(/<path[^>]*d=(["'])M318,244\.7[\s\S]*?<\/path>/gi, "")
    .replace(/<path[^>]*d=(["'])M318,244\.7[^"']*\1[^>]*\/>/gi, "")
    .replace(/\sstyle=(["'])clip-path:url\([^)]+\);?\1/g, "");

  namespaced = namespaced
    .replace(/\bid=(["'])([^"']+)\1/g, (_match, quote, id) => `id=${quote}${prefix}-${id}${quote}`)
    .replace(/url\(#([^)]+)\)/g, (_match, id) => `url(#${prefix}-${id})`)
    .replace(/\b(xlink:href|href)=(["'])#([^"']+)\2/g, (_match, attr, quote, id) => `${attr}=${quote}#${prefix}-${id}${quote}`)
    .replace(/\.([A-Za-z_][\w-]*)/g, `.${prefix}-$1`);

  const doc = new DOMParser().parseFromString(namespaced, "image/svg+xml");
  const svg = doc.documentElement;
  const viewBox = svg.getAttribute("viewBox") || "0 0 636 636";
  return { viewBox, content: svg.innerHTML };
}

function buildSuncodePreviewLayer() {
  const { x, y, width, height } = state.viewBox;

  return `
  <g id="mini-program-suncode" data-layer="top" pointer-events="none">
    <image x="${x}" y="${y}" width="${width}" height="${height}" href="${escapeXml(state.suncodeDataUrl)}" preserveAspectRatio="xMidYMid meet"/>
  </g>`;
}

function buildSuncodeExportLayer() {
  const { x, y, width, height } = state.viewBox;
  const suncode = namespaceSvgFragment(state.suncodeSvgText, "suncode");

  return `
  <g id="mini-program-suncode" data-layer="top" pointer-events="none">
    <svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${escapeXml(suncode.viewBox)}" preserveAspectRatio="xMidYMid meet" overflow="visible">
      ${suncode.content}
    </svg>
  </g>`;
}

function buildOutputSvg(mode = "preview") {
  if (!state.svgText || !state.suncodeDataUrl || !state.suncodeSvgText) return "";

  const cleaned = state.svgText.replace(/<g\s+id=["']mini-program-suncode["'][\s\S]*?<\/g>\s*/g, "");
  const suncodeLayer = mode === "export" ? buildSuncodeExportLayer() : buildSuncodePreviewLayer();
  return cleaned.replace(/<\/svg>\s*$/i, `${suncodeLayer}\n</svg>`);
}

function renderPreview() {
  if (!state.svgText) {
    els.preview.innerHTML = '<div class="empty-state">SVG 预览会显示在这里</div>';
    setButtonsEnabled(false);
    setStatus("等待文件", "请先选择 SVG 文件。");
    return;
  }

  const outputSvg = buildOutputSvg();
  if (!outputSvg) {
    els.preview.innerHTML = '<div class="empty-state">太阳码加载失败，请刷新后重试</div>';
    setButtonsEnabled(false);
    setStatus("初始化失败", "内置太阳码没有加载成功。");
    return;
  }

  els.preview.innerHTML = outputSvg;
  setButtonsEnabled(true);
  setStatus("可导出", "固定太阳码会等比缩放到 SVG 尺寸，并叠在最上层。");
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function outputBaseName() {
  const name = state.svgName.replace(/\.svg$/i, "") || "artwork";
  return `${name}-suncode`;
}

async function renderOutputToCanvas(maxSide) {
  const svg = buildOutputSvg();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  });

  const scale = Math.min(maxSide / Math.max(image.width, image.height), 1) || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);

  return canvas;
}

async function downloadJpeg() {
  const canvas = await renderOutputToCanvas(2000);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${outputBaseName()}.jpg`);
  }, "image/jpeg", 0.92);
}

async function postAiConversion(endpoint) {
  const svg = buildOutputSvg("export");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: `${outputBaseName()}.svg`,
      fileBase64: encodeBase64Utf8(svg),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.blob();
}

async function downloadAi() {
  els.openConvertio.disabled = true;
  setStatus("正在生成 AI", "正在把完整矢量 SVG 转成 AI 文件。");

  const endpoint = location.protocol === "file:"
    ? "https://suncode-web-tool.vercel.app/api/convert-ai"
    : location.hostname.includes("netlify.app")
      ? "/.netlify/functions/convert-ai"
      : "/api/convert-ai";
  const blob = await postAiConversion(endpoint);
  downloadBlob(blob, `${outputBaseName()}.ai`);
  setStatus("AI 已生成", "转换完成，AI 文件已开始下载。");
}

els.svgInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    state.svgText = await readAsText(file);
    state.svgName = file.name;
    state.viewBox = parseViewBox(state.svgText);
    els.svgName.textContent = file.name;
    renderPreview();
  } catch (error) {
    setButtonsEnabled(false);
    setStatus("SVG 读取失败", error.message || "请检查上传文件。");
  }
});

els.downloadJpeg.addEventListener("click", () => {
  downloadJpeg().catch((error) => {
    setStatus("JPEG 导出失败", error.message || "请检查 SVG 是否包含浏览器不支持的内容。");
  });
});

els.openConvertio.addEventListener("click", () => {
  downloadAi()
    .catch((error) => {
      setStatus("AI 导出失败", error.message || "请检查 SVG 文件内容。");
    })
    .finally(() => {
      els.openConvertio.disabled = !state.svgText;
    });
});

setButtonsEnabled(false);
state.suncodeSvgText = decodeBase64Utf8(FIXED_SUNCODE_BASE64);
state.suncodeDataUrl = `data:image/svg+xml;base64,${FIXED_SUNCODE_BASE64}`;
renderPreview();
})();
