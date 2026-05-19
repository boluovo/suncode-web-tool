const FIXED_SUNCODE_BASE64 =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MzYgNjM2Ij4KICA8Zz4KICAgIDxj" +
  "aXJjbGUgY3g9IjMxOCIgY3k9IjMxOCIgcj0iMTAyLjUiIGZpbGw9IiNGRkZGRkYiLz4KICAgIDxjaXJjbGUgY3g9IjMxOCIgY3k9" +
  "IjMxOCIgcj0iOTcuNSIgZmlsbD0iI0ZGRDYwMCIvPgogICAgPHBhdGggZmlsbD0iIzIyMjIyMiIgZD0iTTM3NS45LDI5OC4zdi0y" +
  "LjFsLTEuNCwxLjVjLTkuOCwxMC41LTI0LjIsMjEuNS00MC43LDMxLjFjLTE2LjcsOS42LTMzLjcsMTYuNy00Ny44LDE5LjlsLTEu" +
  "OCwwLjRsMS41LDFjOS42LDYuNCwyMC43LDkuOCwzMi4yLDkuOGMzMiwwLDU4LTI2LDU4LTU4YzAtMC42LDAtMS4yLTAuMS0xLjhD" +
  "Mzc1LjksMjk5LjUsMzc1LjksMjk4LjksMzc1LjksMjk4LjN6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMjIyMjIyIiBkPSJNMzgyLjMs" +
  "MjY0LjhjLTEuNi0yLjgtNC45LTQuNi05LjgtNS4yYy00LTAuNS04LjctMC4zLTE0LjIsMC42Yy0xMC45LTEwLjUtMjUuMi0xNi4z" +
  "LTQwLjMtMTYuM2MtMzIsMC01Ny45LDI2LTU3LjksNThjMCw0LjYsMC42LDkuMiwxLjYsMTMuOGMtMy44LDQuNC02LjUsOC42LTgu" +
  "MiwxMi41Yy0xLjksNC40LTIsOC4yLTAuNCwxMWMxLjYsMi44LDQuOSw0LjYsOS44LDUuMmMxLjQsMC4yLDIuOSwwLjMsNC42LDAu" +
  "M2MzLjksMCw4LjMtMC41LDEzLjEtMS42YzE0LjUtMy4xLDMxLjktMTAuMiw0OS4xLTIwLjJjMTcuMS05LjgsMzItMjEuMyw0Mi4x" +
  "LTMyLjVjNC44LTUuMiw4LjEtMTAuMSwxMC0xNC42QzM4My44LDI3MS40LDM4My45LDI2Ny42LDM4Mi4zLDI2NC44eiIvPgogICAg" +
  "PGVsbGlwc2UgY3g9IjMxOCIgY3k9IjM4Ni4zIiByeD0iMTQwLjgiIHJ5PSIzNS4xIiBmaWxsPSIjMjIyMjIyIiBzdHJva2U9IiNG" +
  "RkQ2MDAiIHN0cm9rZS13aWR0aD0iNy44Ii8+CiAgICA8Y2lyY2xlIGN4PSIzMzEuNCIgY3k9IjI3OS4xIiByPSI5LjUiIGZpbGw9" +
  "IiNGRkQ2MDAiLz4KICAgIDxjaXJjbGUgY3g9IjMxMy4zIiBjeT0iMjk3LjIiIHI9IjQuOCIgZmlsbD0iI0ZGRDYwMCIvPgogICAg" +
  "PHBhdGggZmlsbD0iI0ZGRDYwMCIgZD0iTTI5NC45LDM2Ni44bC05LjcsMTguNWwtMTAuMy0xMi4ydi02LjRoLTUuN3YyMi44aDUu" +
  "N1YzODFsNy4xLDguNWg2LjhsNi43LTEyLjhsNi43LDEyLjhoNS45bC0xMS45LTIyLjhMMjk0LjksMzY2LjhMMjk0LjksMzY2Ljh6" +
  "Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZENjAwIiBkPSJNMzAyLjUsMzY2LjhsOCwxMi4xdjEwLjdoNS44di0xMC43bC04LTEyLjFI" +
  "MzAyLjV6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZENjAwIiBkPSJNMzE4LjEsMzY2LjhsLTMuNyw1LjdsMyw0LjZsNi43LTEwLjNM" +
  "MzE4LjEsMzY2LjhMMzE4LjEsMzY2Ljh6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZENjAwIiBkPSJNMzYxLDM4MC4zYzAsMC41LDAs" +
  "MS4xLTAuMiwxLjZzLTAuNSwwLjktMC45LDEuM2MtMC45LDAuNy0xLjksMS4xLTMsMS4xcy0xLjEsMC0xLjYtMC4zYy0wLjUtMC4y" +
  "LTEtMC41LTEuNC0wLjhjLTAuOC0wLjctMS4yLTEuNy0xLjItMi45di0xMy41aC01Ljh2MTMuNGMwLDEuOCwwLjQsMy40LDEuMyw0" +
  "LjljMC44LDEuNCwyLDIuNSwzLjUsMy4zczMuMywxLjIsNS4yLDEuMWMxLjgsMCwzLjUtMC4zLDUuMS0xLjJjMS41LTAuOCwyLjct" +
  "MS45LDMuNi0zLjJjMC45LTEuNSwxLjMtMy4yLDEuMi00Ljl2LTEzLjRIMzYxVjM4MC4zTDM2MSwzODAuM0wzNjEsMzgwLjN6Ii8+" +
  "CiAgICA8cGF0aCBmaWxsPSIjRkZENjAwIiBkPSJNMjg3LjYsMzY2LjhoLTYuM2wtMy45LDZsMy43LDRsNi42LTEwSDI4Ny42eiIv" +
  "PgogICAgPHBhdGggZmlsbD0iI0ZGRDYwMCIgZD0iTTMzMy4xLDM2Ni44Yy02LjQsMC0xMS43LDUuMS0xMS43LDExLjRzMCwwLjMs" +
  "MCwwLjVoNS42YzAtMC4xLDAtMC4zLDAtMC41YzAtMy4zLDIuNy01LjksNi01LjlzNiwyLjYsNiw1LjlzLTIuNyw1LjktNiw1Ljlz" +
  "LTMuMy0wLjctNC40LTEuOGwtMy4yLDQuNmMyLDEuNyw0LjcsMi43LDcuNiwyLjdjNi40LDAsMTEuNy01LjEsMTEuNy0xMS40cy01" +
  "LjItMTEuNC0xMS43LTExLjRMMzMzLjEsMzY2Ljh6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZENjAwIiBkPSJNMzE4LDQxNS42Yy01" +
  "My44LDAtOTcuNi00My44LTk3LjYtOTcuNmMwLTUzLjgsNDMuOC05Ny42LDk3LjYtOTcuNmM1My44LDAsOTcuNiw0My44LDk3LjYs" +
  "OTcuNkM0MTUuNiwzNzEuOCwzNzEuOCw0MTUuNiwzMTgsNDE1LjZ6IE0zMTgsMjIyLjRjLTUyLjcsMC05NS42LDQyLjktOTUuNiw5" +
  "NS42czQyLjksOTUuNiw5NS42LDk1LjZzOTUuNi00Mi45LDk1LjYtOTUuNlMzNzAuNywyMjIuNCwzMTgsMjIyLjR6Ii8+CiAgPC9n" +
  "Pgo8L3N2Zz4K";

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
