const FIXED_SUNCODE_BASE64 =
  "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1" +
  "LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEu" +
  "MSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3" +
  "LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNjM2IDYzNiIgc3R5bGU9ImVuYWJsZS1i" +
  "YWNrZ3JvdW5kOm5ldyAwIDAgNjM2IDYzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJ" +
  "LnN0MHtmaWxsOiNGRkZGRkY7fQoJLnN0MXtmaWxsOiNGRkQ2MDA7fQoJLnN0MntmaWxsOiMyMjIyMjI7fQoJLnN0M3tjbGlwLXBh" +
  "dGg6dXJsKCNTVkdJRF8yXyk7fQoJLnN0NHtmaWxsOiMyMjIyMjI7c3Ryb2tlOiNGRkQ2MDA7c3Ryb2tlLXdpZHRoOjcuODt9Cgku" +
  "c3Q1e2ZpbGw6IzIyMjIyMjtzdHJva2U6IzIyMjIyMjtzdHJva2Utd2lkdGg6MS42O30KCS5zdDZ7Y2xpcC1wYXRoOnVybCgjU1ZH" +
  "SURfNF8pO30KCS5zdDd7ZmlsbDpub25lO3N0cm9rZTojRkZENjAwO3N0cm9rZS13aWR0aDoyO30KPC9zdHlsZT4KPGc+Cgk8Zz4K" +
  "CQk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIzMTgiIGN5PSIzMTgiIHI9IjEwMi41Ii8+CgkJPGc+CgkJCTxnPgoJCQkJPGNpcmNs" +
  "ZSBjbGFzcz0ic3QxIiBjeD0iMzE4IiBjeT0iMzE4IiByPSI5Ny41Ii8+CgkJCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzc1LjEs" +
  "Mjk4LjNjMCwxLjIsMC4xLDIuNCwwLjEsMy42YzAsMzEuNi0yNS42LDU3LjItNTcuMiw1Ny4yYy0xMS44LDAtMjIuNy0zLjYtMzEu" +
  "OC05LjcKCQkJCQljMTMuNy0zLjEsMzAuNy0xMCw0OC0yMGMxNy4xLTkuOSwzMS40LTIxLDQwLjktMzEuMlYyOTguM3ogTTMxOCwy" +
  "NDQuN2MxOC4zLDAsMzQuNiw4LjYsNDUuMSwyMmMtMTQuNCwyLjQtMzMuNSw5LjctNTMsMjEKCQkJCQljLTE5LjgsMTEuNC0zNS44" +
  "LDI0LjUtNDUsMzUuOGMtMi43LTYuNy00LjItMTQtNC4yLTIxLjZjMC0zMS42LDI1LjYtNTcuMiw1Ny4yLTU3LjJIMzE4eiIvPgoJ" +
  "CQkJPGc+CgkJCQkJPGRlZnM+CgkJCQkJCTxjaXJjbGUgaWQ9IlNWR0lEXzFfIiBjeD0iMzE4IiBjeT0iMzE4IiByPSI5Ny41Ii8+" +
  "CgkJCQkJPC9kZWZzPgoJCQkJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCQkJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8x" +
  "XyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCQkJCTwvY2xpcFBhdGg+CgkJCQkJPGcgY2xhc3M9InN0MyI+CgkJCQkJ" +
  "CTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zMTgsMzUxLjJjMzcuOSwwLDcyLjQsMy41LDk3LjQsOS4yYzEyLjUsMi45LDIyLjksNi4z" +
  "LDMwLjIsMTAuM2MzLjcsMiw2LjgsNC4yLDksNi43czMuOCw1LjUsMy44LDguOQoJCQkJCQkJcy0xLjUsNi40LTMuOCw4LjljLTIu" +
  "MiwyLjUtNS4zLDQuNy05LDYuN2MtNy40LDQtMTcuNyw3LjQtMzAuMiwxMC4zYy0yNS4xLDUuNy01OS41LDkuMi05Ny40LDkuMnMt" +
  "NzIuNC0zLjUtOTcuNC05LjIKCQkJCQkJCWMtMTIuNS0yLjktMjIuOS02LjMtMzAuMi0xMC4zYy0zLjctMi02LjgtNC4yLTktNi43" +
  "cy0zLjgtNS41LTMuOC04LjlzMS41LTYuNCwzLjgtOC45YzIuMi0yLjUsNS4zLTQuNyw5LTYuNwoJCQkJCQkJYzcuNC00LDE3Ljct" +
  "Ny40LDMwLjItMTAuM0MyNDUuNywzNTQuNywyODAuMSwzNTEuMiwzMTgsMzUxLjJ6Ii8+CgkJCQkJPC9nPgoJCQkJPC9nPgoJCQkJ" +
  "PHBhdGggY2xhc3M9InN0NSIgZD0iTTMwNi4xLDI4MS44YzE3LjgtMTAuMywzNS4yLTE3LjIsNDguOS0yMC4xYzYuOS0xLjUsMTIu" +
  "OC0xLjksMTcuNC0xLjNzNy43LDIuMiw5LjIsNC44CgkJCQkJYzEuNSwyLjYsMS40LDYuMS0wLjQsMTAuM2MtMS44LDQuMy01LjEs" +
  "OS4yLTkuOSwxNC40Yy05LjQsMTAuNC0yNC4xLDIyLjEtNDEuOSwzMi4zYy0xNy44LDEwLjMtMzUuMiwxNy4yLTQ4LjksMjAuMQoJ" +
  "CQkJCWMtNi45LDEuNS0xMi44LDEuOS0xNy40LDEuM3MtNy43LTIuMi05LjItNC44cy0xLjQtNi4xLDAuNC0xMC4zYzEuOC00LjMs" +
  "NS4xLTkuMiw5LjktMTQuNEMyNzMuNiwzMDMuNywyODguMywyOTIsMzA2LjEsMjgxLjgKCQkJCQlMMzA2LjEsMjgxLjh6Ii8+CgkJ" +
  "CQk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIzMzEuNCIgY3k9IjI3OS4xIiByPSI5LjUiLz4KCQkJCTxjaXJjbGUgY2xhc3M9InN0" +
  "MSIgY3g9IjMxMy4zIiBjeT0iMjk3LjIiIHI9IjQuOCIvPgoJCQk8L2c+CgkJCTxnPgoJCQkJPGRlZnM+CgkJCQkJPHJlY3QgaWQ9" +
  "IlNWR0lEXzNfIiB4PSIyNjkuMiIgeT0iMzY2LjgiIHdpZHRoPSI5Ny41IiBoZWlnaHQ9IjIyLjgiLz4KCQkJCTwvZGVmcz4KCQkJ" +
  "CTxjbGlwUGF0aCBpZD0iU1ZHSURfNF8iPgoJCQkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgc3R5bGU9Im92ZXJmbG93" +
  "OnZpc2libGU7Ii8+CgkJCQk8L2NsaXBQYXRoPgoJCQkJPGcgY2xhc3M9InN0NiI+CgkJCQkJPGc+CgkJCQkJCTxwYXRoIGNsYXNz" +
  "PSJzdDEiIGQ9Ik0yOTQuOSwzNjYuOGwtOS43LDE4LjVsLTEwLjMtMTIuMnYtNi40aC01Ljd2MjIuOGg1LjdWMzgxbDcuMSw4LjVo" +
  "Ni44bDYuNy0xMi44bDYuNywxMi44aDUuOWwtMTEuOS0yMi44CgkJCQkJCQloLTEuNEwyOTQuOSwzNjYuOHoiLz4KCQkJCQkJPHBh" +
  "dGggY2xhc3M9InN0MSIgZD0iTTMwMi41LDM2Ni44bDgsMTIuMXYxMC43aDUuOHYtMTAuN2wtOC0xMi4xSDMwMi41eiIvPgoJCQkJ" +
  "CQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzE4LjEsMzY2LjhsLTMuNyw1LjdsMyw0LjZsNi43LTEwLjNMMzE4LjEsMzY2LjhMMzE4" +
  "LjEsMzY2Ljh6Ii8+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNjEsMzgwLjNjMCwwLjUsMCwxLjEtMC4yLDEuNnMtMC41" +
  "LDAuOS0wLjksMS4zYy0wLjksMC43LTEuOSwxLjEtMywxLjFzLTEuMSwwLTEuNi0wLjMKCQkJCQkJCWMtMC41LTAuMi0xLTAuNS0x" +
  "LjQtMC44Yy0wLjgtMC43LTEuMi0xLjctMS4yLTIuOXYtMTMuNWgtNS44djEzLjRjMCwxLjgsMC40LDMuNCwxLjMsNC45YzAuOCwx" +
  "LjQsMiwyLjUsMy41LDMuMwoJCQkJCQkJczMuMywxLjIsNS4yLDEuMWMxLjgsMCwzLjUtMC4zLDUuMS0xLjJjMS41LTAuOCwyLjct" +
  "MS45LDMuNi0zLjJjMC45LTEuNSwxLjMtMy4yLDEuMi00Ljl2LTEzLjRIMzYxTDM2MSwzODAuM0wzNjEsMzgwLjMKCQkJCQkJCUwz" +
  "NjEsMzgwLjN6Ii8+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yODcuNiwzNjYuOGgtNi4zbC0zLjksNmwzLjcsNGw2LjYt" +
  "MTBIMjg3LjZ6Ii8+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMzMuMSwzNjYuOGMtNi40LDAtMTEuNyw1LjEtMTEuNywx" +
  "MS40czAsMC4zLDAsMC41aDUuNmMwLTAuMSwwLTAuMywwLTAuNWMwLTMuMywyLjctNS45LDYtNS45CgkJCQkJCQlzNiwyLjYsNiw1" +
  "LjlzLTIuNyw1LjktNiw1LjlzLTMuMy0wLjctNC40LTEuOGwtMy4yLDQuNmMyLDEuNyw0LjcsMi43LDcuNiwyLjdjNi40LDAsMTEu" +
  "Ny01LjEsMTEuNy0xMS40cy01LjItMTEuNC0xMS43LTExLjQKCQkJCQkJCUwzMzMuMSwzNjYuOHoiLz4KCQkJCQk8L2c+CgkJCQk8" +
  "L2c+CgkJCTwvZz4KCQkJPGNpcmNsZSBjbGFzcz0ic3Q3IiBjeD0iMzE4IiBjeT0iMzE4IiByPSI5Ni42Ii8+CgkJPC9nPgoJPC9n" +
  "Pgo8L2c+Cjwvc3ZnPgo=";

const state = {
  svgText: "",
  svgName: "",
  suncodeSvgText: "",
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

function namespaceSvgFragment(svgText, prefix) {
  let namespaced = svgText
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  namespaced = namespaced
    .replace(/\bid=(["'])([^"']+)\1/g, (_match, quote, id) => `id=${quote}${prefix}-${id}${quote}`)
    .replace(/url\(#([^)]+)\)/g, (_match, id) => `url(#${prefix}-${id})`)
    .replace(/\b(xlink:href|href)=(["'])#([^"']+)\2/g, (_match, attr, quote, id) => `${attr}=${quote}#${prefix}-${id}${quote}`)
    .replace(/\.([A-Za-z_][\w-]*)/g, `.${prefix}-$1`)
    .replace(/\bclass=(["'])([^"']+)\1/g, (_match, quote, classNames) => {
      const renamed = classNames
        .trim()
        .split(/\s+/)
        .map((className) => `${prefix}-${className}`)
        .join(" ");
      return `class=${quote}${renamed}${quote}`;
    });

  const doc = new DOMParser().parseFromString(namespaced, "image/svg+xml");
  const svg = doc.documentElement;
  const viewBox = svg.getAttribute("viewBox") || "0 0 636 636";
  return { viewBox, content: svg.innerHTML };
}

function buildSuncodeLayer() {
  const { x, y, width, height } = state.viewBox;
  const suncode = namespaceSvgFragment(state.suncodeSvgText, "suncode");

  return `
  <g id="mini-program-suncode" data-layer="top" pointer-events="none">
    <svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${escapeXml(suncode.viewBox)}" preserveAspectRatio="xMidYMid meet" overflow="visible">
      ${suncode.content}
    </svg>
  </g>`;
}

function buildOutputSvg() {
  if (!state.svgText || !state.suncodeSvgText) return "";

  const cleaned = state.svgText.replace(/<g\s+id=["']mini-program-suncode["'][\s\S]*?<\/g>\s*/g, "");
  return cleaned.replace(/<\/svg>\s*$/i, `${buildSuncodeLayer()}\n</svg>`);
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
  const svg = buildOutputSvg();
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

  const endpoint = location.hostname.includes("netlify.app")
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
renderPreview();
