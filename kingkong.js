(() => {
const ARTBOARD = { width: 294, height: 345 };
const PRODUCT_RECT = { x: 0, y: 0, width: 192, height: 192 };
const TEMPLATE_RECT = { x: 0, y: 39, width: 294, height: 306 };

const templates = {
  purple: {
    name: "紫色-katter",
    src: "./assets/kingkong/purple.png",
  },
  blue: {
    name: "蓝色-K-Frame",
    src: "./assets/kingkong/blue.png",
  },
  green: {
    name: "绿色-K-Prize",
    src: "./assets/kingkong/green.png",
  },
};

const state = {
  template: "purple",
  fileName: "",
  imageUrl: "",
  image: null,
  templateImages: {},
};

const els = {
  input: document.querySelector("#kingkongInput"),
  name: document.querySelector("#kingkongName"),
  preview: document.querySelector("#kingkongPreview"),
  download: document.querySelector("#downloadKingkongPng"),
  statusTitle: document.querySelector("#kingkongStatusTitle"),
  statusDetail: document.querySelector("#kingkongStatusDetail"),
  templateButtons: Array.from(document.querySelectorAll("[data-kingkong-template]")),
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

  return `一番赏金刚区-${base || "未命名"}.png`;
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

async function getTemplateImage(template = state.template) {
  if (!state.templateImages[template]) {
    const src = window.KINGKONG_TEMPLATE_DATA?.[template] || templates[template].src;
    state.templateImages[template] = await loadImage(src);
  }
  return state.templateImages[template];
}

function drawOutput(context) {
  context.clearRect(0, 0, ARTBOARD.width, ARTBOARD.height);

  const templateImage = state.templateImages[state.template];
  if (templateImage) {
    context.drawImage(
      templateImage,
      TEMPLATE_RECT.x,
      TEMPLATE_RECT.y,
      TEMPLATE_RECT.width,
      TEMPLATE_RECT.height,
    );
  }

  if (state.image) {
    const rect = containRect(state.image.naturalWidth, state.image.naturalHeight, PRODUCT_RECT);
    context.drawImage(state.image, rect.x, rect.y, rect.width, rect.height);
  }
}

function makeCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = ARTBOARD.width;
  canvas.height = ARTBOARD.height;
  drawOutput(canvas.getContext("2d"));
  return canvas;
}

async function renderPreview() {
  await getTemplateImage();
  els.preview.innerHTML = "";
  els.preview.appendChild(makeCanvas());
  setDownloadEnabled(Boolean(state.image));
}

async function handleFile(file) {
  state.fileName = file.name;
  state.imageUrl = await readAsDataUrl(file);
  state.image = await loadImage(state.imageUrl);
  els.name.textContent = file.name;
  await renderPreview();
  setStatus("可导出", "商品图已适配到 192 × 192 区域。");
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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

async function downloadPng() {
  if (!state.image) return;
  await getTemplateImage();
  const canvas = makeCanvas();
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, safeFilename(state.fileName));
  }, "image/png");
}

els.templateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.template = button.dataset.kingkongTemplate;
    els.templateButtons.forEach((item) => {
      item.classList.toggle("active", item.dataset.kingkongTemplate === state.template);
    });
    renderPreview().catch((error) => {
      console.error(error);
      setStatus("模板读取失败", "请刷新页面后重试。");
    });
  });
});

els.input.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  handleFile(file).catch((error) => {
    console.error(error);
    state.image = null;
    setDownloadEnabled(false);
    setStatus("图片读取失败", "请确认上传的是 PNG、JPG、WEBP 或 SVG 图片。");
  });
});

els.download.addEventListener("click", () => {
  downloadPng().catch((error) => {
    console.error(error);
    alert(`下载 PNG 失败：${error.message || "请刷新页面后重试"}`);
  });
});

setDownloadEnabled(false);
renderPreview().catch((error) => {
  console.error(error);
  setStatus("模板读取失败", "请确认模板素材已上传。");
});
})();
