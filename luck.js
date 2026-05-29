(() => {
const ARTBOARD = { width: 428, height: 644 };
const ARTBOARD_RECT = { x: 0, y: 0, width: 428, height: 644 };

const state = {
  fileName: "",
  imageUrl: "",
  image: null,
};

const els = {
  input: document.querySelector("#luckInput"),
  name: document.querySelector("#luckName"),
  preview: document.querySelector("#luckPreview"),
  download: document.querySelector("#downloadLuckPng"),
  statusTitle: document.querySelector("#luckStatusTitle"),
  statusDetail: document.querySelector("#luckStatusDetail"),
};

function setStatus(title, detail) {
  els.statusTitle.textContent = title;
  els.statusDetail.textContent = detail;
}

function setDownloadEnabled(enabled) {
  els.download.disabled = !enabled;
}

function safeFilename(value) {
  const base = String(value || "未命名")
    .replace(/\.[^.]+$/i, "")
    .replace(/\s+/g, "")
    .replace(/[\\/:*?"<>|]/g, "-")
    .trim();

  return `试手气-${base || "未命名"}.png`;
}

function containRect(sourceWidth, sourceHeight, target) {
  const scale = Math.min(target.width / sourceWidth, target.height / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  return {
    x: target.x + (target.width - width) / 2,
    y: target.y + (target.height - height) / 2,
    width,
    height,
  };
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function renderPreview() {
  if (!state.imageUrl) {
    els.preview.innerHTML = '<div class="empty-state">铝箔袋预览会显示在这里</div>';
    setDownloadEnabled(false);
    return;
  }

  els.preview.innerHTML = `
    <div class="luck-slot">
      <img src="${state.imageUrl}" alt="铝箔袋预览" />
    </div>
  `;
}

async function handleFile(file) {
  if (state.imageUrl) {
    URL.revokeObjectURL(state.imageUrl);
  }

  state.fileName = file.name;
  state.imageUrl = URL.createObjectURL(file);
  state.image = await loadImage(state.imageUrl);
  els.name.textContent = file.name;
  renderPreview();
  setDownloadEnabled(true);
  setStatus("可导出", "图片已等比适配到 428 × 644 固定画板。");
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

function downloadPng() {
  if (!state.image) return;

  const canvas = document.createElement("canvas");
  canvas.width = ARTBOARD.width;
  canvas.height = ARTBOARD.height;
  const context = canvas.getContext("2d");
  const rect = containRect(state.image.naturalWidth, state.image.naturalHeight, ARTBOARD_RECT);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(state.image, rect.x, rect.y, rect.width, rect.height);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, safeFilename(state.fileName));
  }, "image/png");
}

els.input.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  handleFile(file).catch((error) => {
    console.error(error);
    setDownloadEnabled(false);
    setStatus("图片读取失败", "请确认上传的是 PNG、JPG、WEBP 或 SVG 图片。");
  });
});

els.download.addEventListener("click", downloadPng);

setDownloadEnabled(false);
})();
