(() => {
const POSTER_WIDTH = 375;
const MAIN_X = 16;
const MAIN_Y = 52;
const MAIN_WIDTH = 343;
const DEFAULT_MAIN_HEIGHT = 458;
const QR_SIZE = 72;
const PRODUCT_NAME_WIDTH = 247;
const PRODUCT_LINE_HEIGHT = 22;
const RECOMMEND_HEIGHT = 31;
const RECOMMEND_BODY_HEIGHT = 26;
const MAX_RECOMMEND_CHARS = 25;
const QR_CENTER_X = 323;
const HEADER_LOGO_URL = window.communityLogoDataUrl;
const measureContext = document.createElement("canvas").getContext("2d");

const state = {
  price: "25.98",
  productName: "飞天小女警 活力绘影立牌 飞天小女警 活力绘影立牌",
  recommendEnabled: false,
  recommendText: "🔥火爆热卖中，快来抽卡机买同款吧商品购买推荐语",
  mainDataUrl: "",
  mainName: "",
  mainImage: null,
  qrDataUrl: "",
  qrName: "",
  qrImage: null,
  headerImage: null,
};

const els = {
  preview: document.querySelector("#communityPreview"),
  mainInput: document.querySelector("#communityMainInput"),
  mainName: document.querySelector("#communityMainName"),
  qrInput: document.querySelector("#communityQrInput"),
  qrName: document.querySelector("#communityQrName"),
  price: document.querySelector("#communityPrice"),
  productName: document.querySelector("#communityName"),
  recommendEnabled: document.querySelector("#communityRecommendEnabled"),
  recommendField: document.querySelector("#communityRecommendField"),
  recommendText: document.querySelector("#communityRecommendText"),
  download: document.querySelector("#downloadCommunityPng"),
  statusTitle: document.querySelector("#communityStatusTitle"),
  statusDetail: document.querySelector("#communityStatusDetail"),
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function limitCharacters(value, maxLength) {
  return Array.from(String(value || "")).slice(0, maxLength).join("");
}

function displayedRecommendText() {
  return limitCharacters(state.recommendText.trim(), MAX_RECOMMEND_CHARS);
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function mainHeight() {
  if (!state.mainImage) return DEFAULT_MAIN_HEIGHT;
  return Math.max(1, (state.mainImage.naturalHeight / state.mainImage.naturalWidth) * MAIN_WIDTH);
}

function wrapTextLines(context, text, maxWidth) {
  const paragraphs = String(text || "").replace(/\r/g, "").split("\n");
  const lines = [];

  paragraphs.forEach((paragraph) => {
    if (!paragraph) {
      lines.push("");
      return;
    }

    let line = "";
    Array.from(paragraph).forEach((char) => {
      const next = line + char;
      if (line && context.measureText(next).width > maxWidth) {
        lines.push(line);
        line = char;
      } else {
        line = next;
      }
    });
    lines.push(line);
  });

  return (lines.length ? lines : [""]).slice(0, 2);
}

function productNameLines() {
  measureContext.font = "14px PingFang SC, Microsoft YaHei, sans-serif";
  return wrapTextLines(measureContext, state.productName, PRODUCT_NAME_WIDTH);
}

function layout() {
  const imageHeight = mainHeight();
  const imageBottom = MAIN_Y + imageHeight;
  const hasRecommend = state.recommendEnabled && state.recommendText.trim();
  const productLines = productNameLines();
  const infoHeight = 24 + 12 + productLines.length * PRODUCT_LINE_HEIGHT;
  const recommendTop = imageBottom - 9;
  const infoTop = imageBottom + (hasRecommend ? 34 : 24);
  const qrTop = infoTop + infoHeight / 2 - QR_SIZE / 2;
  const contentBottom = Math.max(infoTop + infoHeight, qrTop + QR_SIZE) + 24;

  return {
    imageHeight,
    hasRecommend,
    productLines,
    infoHeight,
    recommendTop,
    infoTop,
    qrTop,
    posterHeight: contentBottom,
  };
}

function recommendWidth(text) {
  measureContext.font = "500 13px PingFang SC, Microsoft YaHei, sans-serif";
  return Math.max(72, Math.min(MAIN_WIDTH, Math.ceil(measureContext.measureText(text).width) + 28));
}

function bubblePath(width, tailX) {
  const radius = 10;
  const tailOuter = 6;
  const tailInner = 4.2;
  const tipRound = 1.2;
  return [
    `M ${radius} 0`,
    `H ${width - radius}`,
    `Q ${width} 0 ${width} ${radius}`,
    `V ${RECOMMEND_BODY_HEIGHT - radius}`,
    `Q ${width} ${RECOMMEND_BODY_HEIGHT} ${width - radius} ${RECOMMEND_BODY_HEIGHT}`,
    `H ${tailX + tailOuter}`,
    `Q ${tailX + 5.1} ${RECOMMEND_BODY_HEIGHT} ${tailX + tailInner} ${RECOMMEND_BODY_HEIGHT + 0.8}`,
    `L ${tailX + tipRound} ${RECOMMEND_HEIGHT - 1.2}`,
    `Q ${tailX} ${RECOMMEND_HEIGHT} ${tailX - tipRound} ${RECOMMEND_HEIGHT - 1.2}`,
    `L ${tailX - tailInner} ${RECOMMEND_BODY_HEIGHT + 0.8}`,
    `Q ${tailX - 5.1} ${RECOMMEND_BODY_HEIGHT} ${tailX - tailOuter} ${RECOMMEND_BODY_HEIGHT}`,
    `H ${radius}`,
    `Q 0 ${RECOMMEND_BODY_HEIGHT} 0 ${RECOMMEND_BODY_HEIGHT - radius}`,
    `V ${radius}`,
    `Q 0 0 ${radius} 0`,
    "Z",
  ].join(" ");
}

function setStatus() {
  const hasMain = Boolean(state.mainImage);
  const hasQr = Boolean(state.qrImage);
  const hasHeader = Boolean(state.headerImage);
  els.download.disabled = !(hasMain && hasQr && hasHeader);

  if (hasMain && hasQr && hasHeader) {
    els.statusTitle.textContent = "可导出";
    els.statusDetail.textContent = "已按 3 倍图准备导出。";
    return;
  }

  if (hasMain && hasQr && !hasHeader) {
    els.statusTitle.textContent = "正在准备";
    els.statusDetail.textContent = "正在读取顶部素材。";
    return;
  }

  els.statusTitle.textContent = "等待文件";
  els.statusDetail.textContent = hasMain ? "请继续上传小程序码。" : "请上传主图和小程序码。";
}

function renderPoster() {
  const currentLayout = layout();
  const recommendText = displayedRecommendText();
  const recommendBoxWidth = recommendWidth(recommendText);
  const recommendLeft = MAIN_X + MAIN_WIDTH - recommendBoxWidth;
  const recommendTailX = QR_CENTER_X - recommendLeft;
  const recommendShape = bubblePath(recommendBoxWidth, recommendTailX);

  els.preview.innerHTML = `
    <div class="community-poster" style="height: ${currentLayout.posterHeight}px">
      <img class="community-logo-image" src="${HEADER_LOGO_URL}" alt="" />
      <svg class="community-header-icons" viewBox="0 0 69 20" aria-hidden="true">
        <g class="community-header-icon-rings">
          <circle cx="10" cy="10" r="9.5" />
          <circle cx="34.5" cy="10" r="9.5" />
          <circle cx="59" cy="10" r="9.5" />
        </g>
        <path d="M10 3.2 L12 7.2 L16.5 7.9 L13.25 11.1 L14 15.6 L10 13.5 L6 15.6 L6.75 11.1 L3.5 7.9 L8 7.2 Z" />
        <path d="M34.5 15.4 C32.4 13.5 28.5 10.9 28.5 7.5 C28.5 5.3 30.1 4 32 4 C33.2 4 34 4.7 34.5 5.6 C35 4.7 35.8 4 37 4 C38.9 4 40.5 5.3 40.5 7.5 C40.5 10.9 36.6 13.5 34.5 15.4 Z" />
        <path d="M60.5 2.8 L54 10.5 H58.3 L57.4 17.2 L64 8.7 H59.8 Z" />
      </svg>
      <div class="community-main-wrap" style="height: ${currentLayout.imageHeight}px">
        ${state.mainDataUrl
          ? `<img src="${state.mainDataUrl}" alt="" />`
          : `<div class="community-main-placeholder">主图预览</div>`}
      </div>
      ${currentLayout.hasRecommend
        ? `<svg class="community-recommend" style="left: ${recommendLeft}px; top: ${currentLayout.recommendTop}px; width: ${recommendBoxWidth}px" viewBox="0 0 ${recommendBoxWidth} ${RECOMMEND_HEIGHT}" aria-label="${escapeHtml(recommendText)}">
            <defs><clipPath id="communityRecommendClip"><rect x="8" y="0" width="${recommendBoxWidth - 16}" height="${RECOMMEND_BODY_HEIGHT}" /></clipPath></defs>
            <path d="${recommendShape}" />
            <text x="${recommendBoxWidth / 2}" y="${RECOMMEND_BODY_HEIGHT / 2}" dominant-baseline="central" clip-path="url(#communityRecommendClip)">${escapeHtml(recommendText)}</text>
          </svg>`
        : ""}
      <div class="community-info" style="top: ${currentLayout.infoTop}px">
        <div class="community-price">
          <span class="community-price-symbol">¥</span>
          <span class="community-price-value">${escapeHtml(state.price || "0")}</span>
        </div>
        <div class="community-product-name">${currentLayout.productLines.map(escapeHtml).join("<br>")}</div>
      </div>
      <div class="community-qr" style="top: ${currentLayout.qrTop}px">
        ${state.qrDataUrl
          ? `<img src="${state.qrDataUrl}" alt="" />`
          : `<div class="community-qr-placeholder">小程序码</div>`}
      </div>
    </div>`;

  els.recommendField.hidden = !state.recommendEnabled;
  els.recommendEnabled.checked = state.recommendEnabled;
  setStatus();
}

function drawRoundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawHeaderIcons(context) {
  const orange = "#ff8000";
  context.save();
  context.translate(290, 20);
  context.strokeStyle = orange;
  context.lineWidth = 0.8;
  [10, 34.5, 59].forEach((centerX) => {
    context.beginPath();
    context.arc(centerX, 10, 9.5, 0, Math.PI * 2);
    context.stroke();
  });
  context.fillStyle = orange;
  [
    "M10 3.2 L12 7.2 L16.5 7.9 L13.25 11.1 L14 15.6 L10 13.5 L6 15.6 L6.75 11.1 L3.5 7.9 L8 7.2 Z",
    "M34.5 15.4 C32.4 13.5 28.5 10.9 28.5 7.5 C28.5 5.3 30.1 4 32 4 C33.2 4 34 4.7 34.5 5.6 C35 4.7 35.8 4 37 4 C38.9 4 40.5 5.3 40.5 7.5 C40.5 10.9 36.6 13.5 34.5 15.4 Z",
    "M60.5 2.8 L54 10.5 H58.3 L57.4 17.2 L64 8.7 H59.8 Z",
  ].forEach((path) => context.fill(new Path2D(path)));
  context.restore();
}

function drawPoster(context, scale = 1) {
  const currentLayout = layout();
  context.save();
  context.scale(scale, scale);

  drawRoundRect(context, 0, 0, POSTER_WIDTH, currentLayout.posterHeight, 24);
  context.clip();

  context.fillStyle = "#fff";
  context.fillRect(0, 0, POSTER_WIDTH, currentLayout.posterHeight);
  const gradient = context.createLinearGradient(0, 0, 0, currentLayout.posterHeight);
  gradient.addColorStop(0, "rgba(255, 247, 204, 1)");
  gradient.addColorStop(1, "rgba(255, 251, 229, 0.2)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, POSTER_WIDTH, currentLayout.posterHeight);

  if (state.headerImage) {
    context.drawImage(state.headerImage, 16, 16, 67, 24);
    drawHeaderIcons(context);
  }

  context.save();
  drawRoundRect(context, MAIN_X, MAIN_Y, MAIN_WIDTH, currentLayout.imageHeight, 20);
  context.clip();
  if (state.mainImage) {
    context.drawImage(state.mainImage, MAIN_X, MAIN_Y, MAIN_WIDTH, currentLayout.imageHeight);
  } else {
    context.fillStyle = "#fff";
    context.fillRect(MAIN_X, MAIN_Y, MAIN_WIDTH, currentLayout.imageHeight);
    context.strokeStyle = "#aeb9c4";
    context.lineWidth = 1;
    context.setLineDash([4, 4]);
    drawRoundRect(context, MAIN_X + 0.5, MAIN_Y + 0.5, MAIN_WIDTH - 1, currentLayout.imageHeight - 1, 20);
    context.stroke();
    context.setLineDash([]);
    context.fillStyle = "#74808a";
    context.font = "700 15px PingFang SC, Microsoft YaHei, sans-serif";
    context.textAlign = "center";
    context.fillText("主图预览", MAIN_X + MAIN_WIDTH / 2, MAIN_Y + currentLayout.imageHeight / 2);
  }
  context.restore();

  if (currentLayout.hasRecommend) {
    const text = displayedRecommendText();
    const boxWidth = recommendWidth(text);
    const boxLeft = MAIN_X + MAIN_WIDTH - boxWidth;
    const bubble = new Path2D(bubblePath(boxWidth, QR_CENTER_X - boxLeft));
    context.save();
    context.translate(boxLeft, currentLayout.recommendTop);
    context.fillStyle = "#fff";
    context.fill(bubble);
    context.strokeStyle = "#ff8000";
    context.lineWidth = 1;
    context.stroke(bubble);
    context.restore();
    context.fillStyle = "#ff8000";
    context.font = "500 13px PingFang SC, Microsoft YaHei, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.save();
    context.beginPath();
    context.rect(boxLeft + 8, currentLayout.recommendTop, boxWidth - 16, RECOMMEND_BODY_HEIGHT);
    context.clip();
    context.fillText(text, boxLeft + boxWidth / 2, currentLayout.recommendTop + RECOMMEND_BODY_HEIGHT / 2);
    context.restore();
  }

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = "#ff5555";
  context.font = "500 18px PingFang SC, Microsoft YaHei, sans-serif";
  context.fillText("¥", 16, currentLayout.infoTop + 22);
  context.font = "900 24px MotoyaCedarW6, Arial Black, PingFang SC, sans-serif";
  context.fillText(state.price || "0", 30, currentLayout.infoTop + 24);

  context.fillStyle = "#191919";
  context.font = "14px PingFang SC, Microsoft YaHei, sans-serif";
  currentLayout.productLines.forEach((line, index) => {
    context.fillText(line, 16, currentLayout.infoTop + 56 + index * PRODUCT_LINE_HEIGHT);
  });

  context.save();
  context.beginPath();
  context.arc(323, currentLayout.qrTop + 36, 36, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = "#fff";
  context.fillRect(287, currentLayout.qrTop, QR_SIZE, QR_SIZE);
  if (state.qrImage) {
    context.drawImage(state.qrImage, 287, currentLayout.qrTop, QR_SIZE, QR_SIZE);
  } else {
    context.strokeStyle = "#aeb9c4";
    context.setLineDash([4, 4]);
    context.strokeRect(287, currentLayout.qrTop, QR_SIZE, QR_SIZE);
  }
  context.restore();

  context.restore();
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

function safeFilename(value) {
  return String(value || "社群宣发")
    .replace(/\.[^.]+$/i, "")
    .replace(/\s+/g, "")
    .replace(/[\\/:*?"<>|]/g, "-")
    .trim() || "社群宣发";
}

function downloadPng() {
  if (!state.mainImage || !state.qrImage || !state.headerImage) return;
  const currentLayout = layout();
  const canvas = document.createElement("canvas");
  canvas.width = POSTER_WIDTH * 3;
  canvas.height = Math.round(currentLayout.posterHeight * 3);
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPoster(context, 3);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${safeFilename(state.productName)}-社群宣发.png`);
  }, "image/png");
}

async function handleMainImage(file) {
  state.mainDataUrl = await readAsDataUrl(file);
  state.mainImage = await loadImage(state.mainDataUrl);
  state.mainName = file.name;
  els.mainName.textContent = file.name;
  renderPoster();
}

async function handleQrImage(file) {
  state.qrDataUrl = await readAsDataUrl(file);
  state.qrImage = await loadImage(state.qrDataUrl);
  state.qrName = file.name;
  els.qrName.textContent = file.name;
  renderPoster();
}

els.mainInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  handleMainImage(file).catch((error) => {
    console.error(error);
    state.mainDataUrl = "";
    state.mainImage = null;
    els.mainName.textContent = "读取失败";
    renderPoster();
    alert("主图读取失败，请重新选择图片。");
  });
});

els.qrInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  handleQrImage(file).catch((error) => {
    console.error(error);
    state.qrDataUrl = "";
    state.qrImage = null;
    els.qrName.textContent = "读取失败";
    renderPoster();
    alert("小程序码读取失败，请重新选择图片。");
  });
});

els.price.addEventListener("input", () => {
  state.price = els.price.value;
  renderPoster();
});

els.productName.addEventListener("input", () => {
  state.productName = els.productName.value;
  renderPoster();
});

els.recommendEnabled.addEventListener("change", () => {
  state.recommendEnabled = els.recommendEnabled.checked;
  renderPoster();
});

els.recommendText.addEventListener("input", () => {
  state.recommendText = els.recommendText.value;
  renderPoster();
});

els.download.addEventListener("click", () => {
  try {
    downloadPng();
  } catch (error) {
    console.error(error);
    alert(`下载 PNG 失败：${error.message || "请刷新页面后重试"}`);
  }
});

renderPoster();
els.recommendText.value = state.recommendText;
loadImage(HEADER_LOGO_URL)
  .then((image) => {
    state.headerImage = image;
    renderPoster();
  })
  .catch((error) => {
    console.error(error);
    els.statusTitle.textContent = "顶部素材读取失败";
    els.statusDetail.textContent = "请刷新页面后重试。";
    els.download.disabled = true;
  });
})();
