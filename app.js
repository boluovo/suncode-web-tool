const FIXED_SUNCODE_BASE64 =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MzYgNjM2Ij4KICA8Zz4KICAgIDxj" +
  "aXJjbGUgZmlsbD0iI0ZGRkZGRiIgY3g9IjMxOCIgY3k9IjMxOCIgcj0iMTAyLjUiLz4KICAgIDxjaXJjbGUgZmlsbD0iI0ZGRDYw" +
  "MCIgY3g9IjMxOCIgY3k9IjMxOCIgcj0iOTcuNSIvPgogICAgPHBhdGggZmlsbD0iIzIyMjIyMiIgc3Ryb2tlPSIjMjIyMjIyIiBz" +
  "dHJva2Utd2lkdGg9IjEuNiIgZD0iTTMxOCwyNDQuN0MzMTgsMjQ0LjcsMzE4LDI0NC43LDMxOCwyNDQuN2MwLjEsMCwwLjEsMCww" +
  "LjEsMEgzMTh6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMjIyMjIyIiBkPSJNMzc1LjksMjk4LjN2LTIuMWwtMS40LDEuNWMtOS44LDEw" +
  "LjUtMjQuMiwyMS41LTQwLjcsMzEuMWMtMTYuNyw5LjYtMzMuNywxNi43LTQ3LjgsMTkuOWwtMS44LDAuNGwxLjUsMWM5LjYsNi40" +
  "LDIwLjcsOS44LDMyLjIsOS44YzMyLDAsNTgtMjYsNTgtNThjMC0wLjYsMC0xLjItMC4xLTEuOEMzNzUuOSwyOTkuNSwzNzUuOSwy" +
  "OTguOSwzNzUuOSwyOTguM3oiLz4KICAgIDxwYXRoIGZpbGw9IiMyMjIyMjIiIGQ9Ik0zODIuMywyNjQuOGMtMS42LTIuOC00Ljkt" +
  "NC42LTkuOC01LjJjLTQtMC41LTguNy0wLjMtMTQuMiwwLjZjLTEwLjktMTAuNS0yNS4yLTE2LjMtNDAuMy0xNi4zYy0zMiwwLTU3" +
  "LjksMjYtNTcuOSw1OGMwLDQuNiwwLjYsOS4yLDEuNiwxMy44Yy0zLjgsNC40LTYuNSw4LjYtOC4yLDEyLjVjLTEuOSw0LjQtMiw4" +
  "LjItMC40LDExYzEuNiwyLjgsNC45LDQuNiw5LjgsNS4yYzEuNCwwLjIsMi45LDAuMyw0LjYsMC4zYzMuOSwwLDguMy0wLjUsMTMu" +
  "MS0xLjZjMTQuNS0zLjEsMzEuOS0xMC4yLDQ5LjEtMjAuMmMxNy4xLTkuOCwzMi0yMS4zLDQyLjEtMzIuNWM0LjgtNS4yLDguMS0x" +
  "MC4xLDEwLTE0LjZDMzgzLjgsMjcxLjQsMzgzLjksMjY3LjYsMzgyLjMsMjY0Ljh6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMjIyMjIy" +
  "IiBkPSJNMzE4LDM1MS4yYy0zMy43LDAtNjQuNiwyLjgtODguNyw3LjRjMTUuNCwzMy42LDQ5LjMsNTYuOSw4OC43LDU2LjljMzku" +
  "NCwwLDczLjMtMjMuMyw4OC43LTU2LjlDMzgyLjYsMzU0LDM1MS43LDM1MS4yLDMxOCwzNTEuMnoiLz4KICAgIDxwYXRoIGZpbGw9" +
  "IiNGRkQ2MDAiIGQ9Ik0yMjcuNywzNTQuOWMxLDIuNSwyLjEsNC45LDMuMyw3LjNjMjQuNC00LjYsNTQuOS03LjEsODYuOS03LjFj" +
  "MzIuMSwwLDYyLjYsMi41LDg2LjksNy4xYzEuMi0yLjQsMi4zLTQuOCwzLjMtNy4zYy0yNS4yLTQuOS01Ni45LTcuNi05MC40LTcu" +
  "NkMyODQuNiwzNDcuMywyNTMsMzUwLDIyNy43LDM1NC45eiIvPgogICAgPGNpcmNsZSBmaWxsPSIjRkZENjAwIiBjeD0iMzMxLjQi" +
  "IGN5PSIyNzkuMSIgcj0iOS41Ii8+CiAgICA8Y2lyY2xlIGZpbGw9IiNGRkQ2MDAiIGN4PSIzMTMuMyIgY3k9IjI5Ny4yIiByPSI0" +
  "LjgiLz4KICAgIDxwYXRoIGZpbGw9IiNGRkQ2MDAiIGQ9Ik0yOTQuOSwzNjYuOGwtOS43LDE4LjVsLTEwLjMtMTIuMnYtNi40aC01" +
  "Ljd2MjIuOGg1LjdWMzgxbDcuMSw4LjVoNi44bDYuNy0xMi44bDYuNywxMi44aDUuOWwtMTEuOS0yMi44TDI5NC45LDM2Ni44TDI5" +
  "NC45LDM2Ni44eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRDYwMCIgZD0iTTMwMi41LDM2Ni44bDgsMTIuMXYxMC43aDUuOHYtMTAu" +
  "N2wtOC0xMi4xSDMwMi41eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRDYwMCIgZD0iTTMxOC4xLDM2Ni44bC0zLjcsNS43bDMsNC42" +
  "bDYuNy0xMC4zTDMxOC4xLDM2Ni44TDMxOC4xLDM2Ni44eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRDYwMCIgZD0iTTM2MSwzODAu" +
  "M2MwLDAuNSwwLDEuMS0wLjIsMS42cy0wLjUsMC45LTAuOSwxLjNjLTAuOSwwLjctMS45LDEuMS0zLDEuMXMtMS4xLDAtMS42LTAu" +
  "M2MtMC41LTAuMi0xLTAuNS0xLjQtMC44Yy0wLjgtMC43LTEuMi0xLjctMS4yLTIuOXYtMTMuNWgtNS44djEzLjRjMCwxLjgsMC40" +
  "LDMuNCwxLjMsNC45YzAuOCwxLjQsMiwyLjUsMy41LDMuM3MzLjMsMS4yLDUuMiwxLjFjMS44LDAsMy41LTAuMyw1LjEtMS4yYzEu" +
  "NS0wLjgsMi43LTEuOSwzLjYtMy4yYzAuOS0xLjUsMS4zLTMuMiwxLjItNC45di0xMy40SDM2MVYzODAuM0wzNjEsMzgwLjNMMzYx" +
  "LDM4MC4zeiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRDYwMCIgZD0iTTI4Ny42LDM2Ni44aC02LjNsLTMuOSw2bDMuNyw0bDYuNi0x" +
  "MEgyODcuNnoiLz4KICAgIDxwYXRoIGZpbGw9IiNGRkQ2MDAiIGQ9Ik0zMzMuMSwzNjYuOGMtNi40LDAtMTEuNyw1LjEtMTEuNywx" +
  "MS40czAsMC4zLDAsMC41aDUuNmMwLTAuMSwwLTAuMywwLTAuNWMwLTMuMywyLjctNS45LDYtNS45czYsMi42LDYsNS45cy0yLjcs" +
  "NS45LTYsNS45cy0zLjMtMC43LTQuNC0xLjhsLTMuMiw0LjZjMiwxLjcsNC43LDIuNyw3LjYsMi43YzYuNCwwLDExLjctNS4xLDEx" +
  "LjctMTEuNHMtNS4yLTExLjQtMTEuNy0xMS40TDMzMy4xLDM2Ni44eiIvPgogICAgPGNpcmNsZSBjeD0iMzE4IiBjeT0iMzE4IiBy" +
  "PSI5Ni42IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ2MDAiIHN0cm9rZS13aWR0aD0iMiIvPgogIDwvZz4KPC9zdmc+Cg==";

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
    .replace(/<!--[\s\S]*?-->/g, "");

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
