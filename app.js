const FIXED_SUNCODE_DATA_URL =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNjM2IDYzNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjM2IDYzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQoJLnN0MXtmaWxsOiNGRkQ2MDA7fQoJLnN0MntmaWxsOiMyMjIyMjI7fQoJLnN0M3tjbGlwLXBhdGg6dXJsKCNTVkdJRF8yXyk7fQoJLnN0NHtmaWxsOiMyMjIyMjI7c3Ryb2tlOiNGRkQ2MDA7c3Ryb2tlLXdpZHRoOjcuODt9Cgkuc3Q1e2ZpbGw6IzIyMjIyMjtzdHJva2U6IzIyMjIyMjtzdHJva2Utd2lkdGg6MS42O30KCS5zdDZ7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNF8pO30KCS5zdDd7ZmlsbDpub25lO3N0cm9rZTojRkZENjAwO3N0cm9rZS13aWR0aDoyO30KPC9zdHlsZT4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIzMTgiIGN5PSIzMTgiIHI9IjEwMi41Ii8+CgkJPGc+CgkJCTxnPgoJCQkJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMzE4IiBjeT0iMzE4IiByPSI5Ny41Ii8+CgkJCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzc1LjEsMjk4LjNjMCwxLjIsMC4xLDIuNCwwLjEsMy42YzAsMzEuNi0yNS42LDU3LjItNTcuMiw1Ny4yYy0xMS44LDAtMjIuNy0zLjYtMzEuOC05LjcKCQkJCQljMTMuNy0zLjEsMzAuNy0xMCw0OC0yMGMxNy4xLTkuOSwzMS40LTIxLDQwLjktMzEuMlYyOTguM3ogTTMxOCwyNDQuN2MxOC4zLDAsMzQuNiw4LjYsNDUuMSwyMmMtMTQuNCwyLjQtMzMuNSw5LjctNTMsMjEKCQkJCQljLTE5LjgsMTEuNC0zNS44LDI0LjUtNDUsMzUuOGMtMi43LTYuNy00LjItMTQtNC4yLTIxLjZjMC0zMS42LDI1LjYtNTcuMiw1Ny4yLTU3LjJIMzE4eiIvPgoJCQkJPGc+CgkJCQkJPGRlZnM+CgkJCQkJCTxjaXJjbGUgaWQ9IlNWR0lEXzFfIiBjeD0iMzE4IiBjeT0iMzE4IiByPSI5Ny41Ii8+CgkJCQkJPC9kZWZzPgoJCQkJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCQkJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8xXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCQkJCTwvY2xpcFBhdGg+CgkJCQkJPGcgY2xhc3M9InN0MyI+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zMTgsMzUxLjJjMzcuOSwwLDcyLjQsMy41LDk3LjQsOS4yYzEyLjUsMi45LDIyLjksNi4zLDMwLjIsMTAuM2MzLjcsMiw2LjgsNC4yLDksNi43czMuOCw1LjUsMy44LDguOQoJCQkJCQkJcy0xLjUsNi40LTMuOCw4LjljLTIuMiwyLjUtNS4zLDQuNy05LDYuN2MtNy40LDQtMTcuNyw3LjQtMzAuMiwxMC4zYy0yNS4xLDUuNy01OS41LDkuMi05Ny40LDkuMnMtNzIuNC0zLjUtOTcuNC05LjIKCQkJCQkJCWMtMTIuNS0yLjktMjIuOS02LjMtMzAuMi0xMC4zYy0zLjctMi02LjgtNC4yLTktNi43cy0zLjgtNS41LTMuOC04LjlzMS41LTYuNCwzLjgtOC45YzIuMi0yLjUsNS4zLTQuNyw5LTYuNwoJCQkJCQkJYzcuNC00LDE3LjctNy40LDMwLjItMTAuM0MyNDUuNywzNTQuNywyODAuMSwzNTEuMiwzMTgsMzUxLjJ6Ii8+CgkJCQkJPC9nPgoJCQkJPC9nPgoJCQkJPHBhdGggY2xhc3M9InN0NSIgZD0iTTMwNi4xLDI4MS44YzE3LjgtMTAuMywzNS4yLTE3LjIsNDguOS0yMC4xYzYuOS0xLjUsMTIuOC0xLjksMTcuNC0xLjNzNy43LDIuMiw5LjIsNC44CgkJCQkJYzEuNSwyLjYsMS40LDYuMS0wLjQsMTAuM2MtMS44LDQuMy01LjEsOS4yLTkuOSwxNC40Yy05LjQsMTAuNC0yNC4xLDIyLjEtNDEuOSwzMi4zYy0xNy44LDEwLjMtMzUuMiwxNy4yLTQ4LjksMjAuMQoJCQkJCWMtNi45LDEuNS0xMi44LDEuOS0xNy40LDEuM3MtNy43LTIuMi05LjItNC44cy0xLjQtNi4xLDAuNC0xMC4zYzEuOC00LjMsNS4xLTkuMiw5LjktMTQuNEMyNzMuNiwzMDMuNywyODguMywyOTIsMzA2LjEsMjgxLjgKCQkJCQlMMzA2LjEsMjgxLjh6Ii8+CgkJCQk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIzMzEuNCIgY3k9IjI3OS4xIiByPSI5LjUiLz4KCQkJCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjMxMy4zIiBjeT0iMjk3LjIiIHI9IjQuOCIvPgoJCQk8L2c+CgkJCTxnPgoJCQkJPGRlZnM+CgkJCQkJPHJlY3QgaWQ9IlNWR0lEXzNfIiB4PSIyNjkuMiIgeT0iMzY2LjgiIHdpZHRoPSI5Ny41IiBoZWlnaHQ9IjIyLjgiLz4KCQkJCTwvZGVmcz4KCQkJCTxjbGlwUGF0aCBpZD0iU1ZHSURfNF8iPgoJCQkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJCQk8L2NsaXBQYXRoPgoJCQkJPGcgY2xhc3M9InN0NiI+CgkJCQkJPGc+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yOTQuOSwzNjYuOGwtOS43LDE4LjVsLTEwLjMtMTIuMnYtNi40aC01Ljd2MjIuOGg1LjdWMzgxbDcuMSw4LjVoNi44bDYuNy0xMi44bDYuNywxMi44aDUuOWwtMTEuOS0yMi44CgkJCQkJCQloLTEuNEwyOTQuOSwzNjYuOHoiLz4KCQkJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMwMi41LDM2Ni44bDgsMTIuMXYxMC43aDUuOHYtMTAuN2wtOC0xMi4xSDMwMi41eiIvPgoJCQkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzE4LjEsMzY2LjhsLTMuNyw1LjdsMyw0LjZsNi43LTEwLjNMMzE4LjEsMzY2LjhMMzE4LjEsMzY2Ljh6Ii8+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNjEsMzgwLjNjMCwwLjUsMCwxLjEtMC4yLDEuNnMtMC41LDAuOS0wLjksMS4zYy0wLjksMC43LTEuOSwxLjEtMywxLjFzLTEuMSwwLTEuNi0wLjMKCQkJCQkJCWMtMC41LTAuMi0xLTAuNS0xLjQtMC44Yy0wLjgtMC43LTEuMi0xLjctMS4yLTIuOXYtMTMuNWgtNS44djEzLjRjMCwxLjgsMC40LDMuNCwxLjMsNC45YzAuOCwxLjQsMiwyLjUsMy41LDMuMwoJCQkJCQkJczMuMywxLjIsNS4yLDEuMWMxLjgsMCwzLjUtMC4zLDUuMS0xLjJjMS41LTAuOCwyLjctMS45LDMuNi0zLjJjMC45LTEuNSwxLjMtMy4yLDEuMi00Ljl2LTEzLjRIMzYxTDM2MSwzODAuM0wzNjEsMzgwLjMKCQkJCQkJCUwzNjEsMzgwLjN6Ii8+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yODcuNiwzNjYuOGgtNi4zbC0zLjksNmwzLjcsNGw2LjYtMTBIMjg3LjZ6Ii8+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMzMuMSwzNjYuOGMtNi40LDAtMTEuNyw1LjEtMTEuNywxMS40czAsMC4zLDAsMC41aDUuNmMwLTAuMSwwLTAuMywwLTAuNWMwLTMuMywyLjctNS45LDYtNS45CgkJCQkJCQlzNiwyLjYsNiw1LjlzLTIuNyw1LjktNiw1LjlzLTMuMy0wLjctNC40LTEuOGwtMy4yLDQuNmMyLDEuNyw0LjcsMi43LDcuNiwyLjdjNi40LDAsMTEuNy01LjEsMTEuNy0xMS40cy01LjItMTEuNC0xMS43LTExLjQKCQkJCQkJCUwzMzMuMSwzNjYuOHoiLz4KCQkJCQk8L2c+CgkJCQk8L2c+CgkJCTwvZz4KCQkJPGNpcmNsZSBjbGFzcz0ic3Q3IiBjeD0iMzE4IiBjeT0iMzE4IiByPSI5Ni42Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=";
const state = {
  svgText: "",
  svgName: "",
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

function decodeFixedSuncodeSvg() {
  const base64 = FIXED_SUNCODE_DATA_URL.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function parseCssDeclarations(cssText) {
  return Object.fromEntries(
    cssText
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [property, ...valueParts] = item.split(":");
        return [property.trim(), valueParts.join(":").trim()];
      }),
  );
}

function collectClassStyles(svg) {
  const styles = new Map();
  svg.querySelectorAll("style").forEach((styleNode) => {
    const css = styleNode.textContent;
    for (const match of css.matchAll(/\.([A-Za-z0-9_-]+)\s*\{([^}]+)\}/g)) {
      styles.set(match[1], parseCssDeclarations(match[2]));
    }
  });
  return styles;
}

function applyInlineStyles(svg) {
  const classStyles = collectClassStyles(svg);

  svg.querySelectorAll("[class]").forEach((node) => {
    const classNames = node.getAttribute("class").trim().split(/\s+/);
    classNames.forEach((className) => {
      const declarations = classStyles.get(className);
      if (!declarations) return;
      Object.entries(declarations).forEach(([property, value]) => {
        node.setAttribute(property, value);
      });
    });
    node.removeAttribute("class");
  });

  svg.querySelectorAll("style").forEach((styleNode) => styleNode.remove());
}

function expandClipPathUses(svg) {
  svg.querySelectorAll("clipPath use").forEach((useNode) => {
    const href = useNode.getAttribute("href") || useNode.getAttribute("xlink:href");
    if (!href || !href.startsWith("#")) return;

    const targetId = href.slice(1);
    const referenced = [...svg.querySelectorAll("[id]")].find((node) => node.getAttribute("id") === targetId);
    if (!referenced) return;

    const clone = referenced.cloneNode(true);
    clone.removeAttribute("id");
    clone.removeAttribute("style");
    useNode.replaceWith(clone);
  });
}

function prefixEmbeddedIds(svg) {
  const prefix = "suncode-";
  const idMap = new Map();

  svg.querySelectorAll("[id]").forEach((node) => {
    const oldId = node.getAttribute("id");
    const newId = `${prefix}${oldId}`;
    idMap.set(oldId, newId);
    node.setAttribute("id", newId);
  });

  svg.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      let value = attribute.value;
      idMap.forEach((newId, oldId) => {
        value = value
          .replaceAll(`url(#${oldId})`, `url(#${newId})`)
          .replaceAll(`#${oldId}`, `#${newId}`);
      });
      node.setAttribute(attribute.name, value);
    });
  });
}

function buildSuncodeLayer() {
  const { x, y, width, height } = state.viewBox;
  const doc = new DOMParser().parseFromString(decodeFixedSuncodeSvg(), "image/svg+xml");
  const suncodeSvg = doc.documentElement;
  const suncodeViewBox = parseViewBox(decodeFixedSuncodeSvg());
  const scale = Math.min(width / suncodeViewBox.width, height / suncodeViewBox.height);
  const translateX = x + (width - suncodeViewBox.width * scale) / 2 - suncodeViewBox.x * scale;
  const translateY = y + (height - suncodeViewBox.height * scale) / 2 - suncodeViewBox.y * scale;

  applyInlineStyles(suncodeSvg);
  expandClipPathUses(suncodeSvg);
  prefixEmbeddedIds(suncodeSvg);
  suncodeSvg.querySelectorAll("defs").forEach((defsNode) => defsNode.remove());
  const embeddedContent = [...suncodeSvg.childNodes]
    .map((node) => new XMLSerializer().serializeToString(node))
    .join("\n");

  return `
  <g id="mini-program-suncode" data-layer="top" pointer-events="none" transform="translate(${translateX} ${translateY}) scale(${scale})">
    ${embeddedContent}
  </g>`;
}

function buildOutputSvg() {
  if (!state.svgText) return "";

  const cleaned = state.svgText.replace(/<g\s+id=["']mini-program-suncode["'][\s\S]*?<\/g>\s*/g, "");
  const layer = buildSuncodeLayer();
  if (!layer) return cleaned;
  return cleaned.replace(/<\/svg>\s*$/i, `${layer}\n</svg>`);
}

function updateStatus() {
  const hasSvg = Boolean(state.svgText);
  els.downloadJpeg.disabled = !hasSvg;
  els.openConvertio.disabled = !hasSvg;

  if (!hasSvg) {
    els.statusTitle.textContent = "等待文件";
    els.statusDetail.textContent = "请先选择 SVG 文件。";
    return;
  }

  els.statusTitle.textContent = "可导出";
  els.statusDetail.textContent = "固定太阳码会等比缩放到 SVG 尺寸，并叠在最上层。";
}

function renderPreview() {
  updateStatus();

  if (!state.svgText) {
    els.preview.innerHTML = '<div class="empty-state">SVG 预览会显示在这里</div>';
    return;
  }

  els.preview.innerHTML = buildOutputSvg();
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

async function downloadJpeg() {
  const svg = buildOutputSvg();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  });

  const maxSide = 2000;
  const scale = Math.min(maxSide / Math.max(image.width, image.height), 1) || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(url);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${outputBaseName()}.jpg`);
  }, "image/jpeg", 0.92);
}

async function rasterizeSvgForAi() {
  const svg = buildOutputSvg();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  });

  const maxSide = 4096;
  const scale = Math.min(maxSide / Math.max(image.width, image.height), 1) || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);

  const pngDataUrl = canvas.toDataURL("image/png");
  const { x, y, width, height } = state.viewBox;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${width} ${height}" width="${width}" height="${height}">
  <image x="${x}" y="${y}" width="${width}" height="${height}" href="${pngDataUrl}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
}

els.svgInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  state.svgText = await readAsText(file);
  state.svgName = file.name;
  state.viewBox = parseViewBox(state.svgText);
  els.svgName.textContent = file.name;
  renderPreview();
});

async function postAiConversion(endpoint) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: `${outputBaseName()}.svg`,
      svg: await rasterizeSvgForAi(),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.blob();
}

async function downloadAi() {
  els.openConvertio.disabled = true;
  els.statusTitle.textContent = "正在生成 AI";
  els.statusDetail.textContent = "正在上传 SVG 到 Convertio 并等待转换完成。";

  const endpoint = location.hostname.includes("netlify.app")
    ? "/.netlify/functions/convert-ai"
    : "/api/convert-ai";
  const blob = await postAiConversion(endpoint);
  downloadBlob(blob, `${outputBaseName()}.ai`);
  els.statusTitle.textContent = "AI 已生成";
  els.statusDetail.textContent = "转换完成，AI 文件已开始下载。";
}

els.downloadJpeg.addEventListener("click", () => {
  downloadJpeg().catch(() => {
    els.statusTitle.textContent = "JPEG 导出失败";
    els.statusDetail.textContent = "请检查 SVG 是否包含跨域外链图片或浏览器不支持的内容。";
  });
});

els.openConvertio.addEventListener("click", () => {
  downloadAi()
    .catch((error) => {
      els.statusTitle.textContent = "AI 导出失败";
      els.statusDetail.textContent = error.message || "请检查 Convertio API Key 和部署环境变量。";
    })
    .finally(() => {
      els.openConvertio.disabled = !state.svgText;
    });
});

updateStatus();
