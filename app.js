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

async function rasterizeForAiUpload() {
  const svg = buildOutputSvg();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  });

  const maxSide = 2048;
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
  return {
    fileBase64: pngDataUrl.split(",")[1],
    filename: `${outputBaseName()}.png`,
  };
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
  const aiInput = await rasterizeForAiUpload();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: aiInput.filename,
      fileBase64: aiInput.fileBase64,
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
