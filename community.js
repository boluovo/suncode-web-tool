(() => {
const POSTER_WIDTH = 375;
const MAIN_X = 16;
const MAIN_Y = 52;
const MAIN_WIDTH = 343;
const DEFAULT_MAIN_HEIGHT = 458;
const QR_SIZE = 72;
const PRODUCT_NAME_WIDTH = 247;
const PRODUCT_LINE_HEIGHT = 22;
const RECOMMEND_HEIGHT = 26;
const MAX_RECOMMEND_CHARS = 25;
const OPERATION_BODY_MAX_WIDTH = 256;
const OPERATION_TEXT_MAX_WIDTH = OPERATION_BODY_MAX_WIDTH - 38;
const HEADER_LOGO_URL = window.communityLogoDataUrl;
const OPERATION_ICON_URL = window.communityOperationIconDataUrl;
const measureContext = document.createElement("canvas").getContext("2d");

const state = {
  price: "25.98",
  halfPriceEnabled: false,
  halfPriceText: "限时半价",
  originalPrice: "99.9",
  productName: "飞天小女警 活力绘影立牌 飞天小女警 活力绘影立牌",
  operationEnabled: false,
  operationText: "本期新品",
  recommendEnabled: false,
  recommendText: "🔥火爆热卖中，快来抽卡机买同款吧商品购买推荐语",
  mainDataUrl: "",
  mainName: "",
  mainImage: null,
  qrDataUrl: "",
  qrName: "",
  qrImage: null,
  headerImage: null,
  operationIconImage: null,
};

const els = {
  preview: document.querySelector("#communityPreview"),
  mainInput: document.querySelector("#communityMainInput"),
  mainName: document.querySelector("#communityMainName"),
  qrInput: document.querySelector("#communityQrInput"),
  qrName: document.querySelector("#communityQrName"),
  operationEnabled: document.querySelector("#communityOperationEnabled"),
  operationField: document.querySelector("#communityOperationField"),
  operationText: document.querySelector("#communityOperationText"),
  price: document.querySelector("#communityPrice"),
  halfPriceEnabled: document.querySelector("#communityHalfPriceEnabled"),
  halfPriceTextField: document.querySelector("#communityHalfPriceTextField"),
  halfPriceText: document.querySelector("#communityHalfPriceText"),
  originalPriceField: document.querySelector("#communityOriginalPriceField"),
  originalPrice: document.querySelector("#communityOriginalPrice"),
  productName: document.querySelector("#communityName"),
  recommendEnabled: document.querySelector("#communityRecommendEnabled"),
  recommendField: document.querySelector("#communityRecommendField"),
  recommendText: document.querySelector("#communityRecommendText"),
  download: document.querySelector("#downloadCommunityJpg"),
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

function fitTextWithEllipsis(context, text, maxWidth) {
  const characters = Array.from(String(text || "").trim());
  if (context.measureText(characters.join("")).width <= maxWidth) return characters.join("");
  while (characters.length && context.measureText(`${characters.join("")}…`).width > maxWidth) characters.pop();
  return characters.length ? `${characters.join("")}…` : "…";
}

function operationLabel() {
  measureContext.font = "16px HYFengShangHei75J, PingFang SC, Microsoft YaHei, sans-serif";
  const text = fitTextWithEllipsis(measureContext, state.operationText, OPERATION_TEXT_MAX_WIDTH);
  const textWidth = Math.ceil(measureContext.measureText(text).width);
  return { text, bodyWidth: Math.min(OPERATION_BODY_MAX_WIDTH, textWidth + 38) };
}

function displayedHalfPriceText() {
  const text = limitCharacters(state.halfPriceText, 8);
  measureContext.font = "13px PingFang SC, Microsoft YaHei, sans-serif";
  return { text, width: Math.max(16, Math.ceil(measureContext.measureText(text).width) + 8) };
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
  const contentTop = imageBottom + 24;
  const groupHeight = Math.max(infoHeight, QR_SIZE);
  const infoTop = contentTop + (groupHeight - infoHeight) / 2;
  const qrTop = contentTop + (groupHeight - QR_SIZE) / 2;
  const groupBottom = contentTop + groupHeight;
  const recommendTop = groupBottom + 8;
  const contentBottom = hasRecommend ? recommendTop + RECOMMEND_HEIGHT : groupBottom;

  return {
    imageHeight,
    hasRecommend,
    productLines,
    infoHeight,
    groupHeight,
    recommendTop,
    infoTop,
    qrTop,
    posterHeight: contentBottom + 24,
  };
}

function recommendWidth(text) {
  measureContext.font = "500 13px PingFang SC, Microsoft YaHei, sans-serif";
  return Math.max(72, Math.min(MAIN_WIDTH, Math.ceil(measureContext.measureText(text).width) + 16));
}

function setStatus() {
  const hasMain = Boolean(state.mainImage);
  const hasQr = Boolean(state.qrImage);
  const hasHeader = Boolean(state.headerImage && state.operationIconImage);
  els.download.disabled = !(hasMain && hasQr && hasHeader);

  if (hasMain && hasQr && hasHeader) {
    els.statusTitle.textContent = "可导出";
    els.statusDetail.textContent = "已按 3 倍 JPG 准备导出。";
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
  const recommendLeft = MAIN_X;
  const operation = operationLabel();
  const halfPriceLabel = displayedHalfPriceText();

  els.preview.innerHTML = `
    <div class="community-poster" style="height: ${currentLayout.posterHeight}px">
      <img class="community-logo-image" src="${HEADER_LOGO_URL}" alt="" />
      ${state.operationEnabled
        ? `<div class="community-operation" style="width: ${operation.bodyWidth}px">
            <img src="${OPERATION_ICON_URL}" alt="" />
            <span>${escapeHtml(operation.text)}</span>
          </div>`
        : ""}
      <div class="community-main-wrap" style="height: ${currentLayout.imageHeight}px">
        ${state.mainDataUrl
          ? `<img src="${state.mainDataUrl}" alt="" />`
          : `<div class="community-main-placeholder">主图预览</div>`}
      </div>
      ${currentLayout.hasRecommend
        ? `<div class="community-recommend" style="left: ${recommendLeft}px; top: ${currentLayout.recommendTop}px; width: ${recommendBoxWidth}px">${escapeHtml(recommendText)}</div>`
        : ""}
      <div class="community-info" style="top: ${currentLayout.infoTop}px">
        <div class="community-price">
          <span class="community-price-symbol">¥</span>
          <span class="community-price-value">${escapeHtml(state.price || "0")}</span>
          ${state.halfPriceEnabled
            ? `<span class="community-half-price-label" style="width: ${halfPriceLabel.width}px">${escapeHtml(halfPriceLabel.text)}</span><span class="community-original-price">¥${escapeHtml(state.originalPrice || "0")}</span>`
            : ""}
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
  els.operationField.hidden = !state.operationEnabled;
  els.operationEnabled.checked = state.operationEnabled;
  els.originalPriceField.hidden = !state.halfPriceEnabled;
  els.halfPriceTextField.hidden = !state.halfPriceEnabled;
  els.halfPriceEnabled.checked = state.halfPriceEnabled;
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

function drawOperationLabel(context) {
  if (!state.operationEnabled || !state.operationIconImage) return;
  const operation = operationLabel();
  const bodyLeft = POSTER_WIDTH - 16 - operation.bodyWidth;
  const angle = (166.76 * Math.PI) / 180;
  const directionX = Math.sin(angle);
  const directionY = -Math.cos(angle);
  const gradientLength = Math.abs(operation.bodyWidth * directionX) + Math.abs(24 * directionY);
  const centerX = bodyLeft + operation.bodyWidth / 2;
  const centerY = 28;
  const gradient = context.createLinearGradient(
    centerX - (directionX * gradientLength) / 2,
    centerY - (directionY * gradientLength) / 2,
    centerX + (directionX * gradientLength) / 2,
    centerY + (directionY * gradientLength) / 2,
  );
  gradient.addColorStop(0, "#ff7b2a");
  gradient.addColorStop(1, "#ff51cb");
  context.fillStyle = gradient;
  drawRoundRect(context, bodyLeft, 16, operation.bodyWidth, 24, 8);
  context.fill();
  context.drawImage(state.operationIconImage, bodyLeft - 4, 8, 32, 32);
  context.save();
  context.beginPath();
  context.rect(bodyLeft + 30, 16, operation.bodyWidth - 38, 24);
  context.clip();
  context.fillStyle = "#fff";
  context.font = "16px HYFengShangHei75J, PingFang SC, Microsoft YaHei, sans-serif";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillText(operation.text, bodyLeft + 30, 27.5);
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
    drawOperationLabel(context);
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
    const boxLeft = MAIN_X;
    context.fillStyle = "#fff";
    drawRoundRect(context, boxLeft, currentLayout.recommendTop, boxWidth, RECOMMEND_HEIGHT, 8);
    context.fill();
    context.strokeStyle = "#ff8000";
    context.lineWidth = 1;
    context.stroke();
    context.fillStyle = "#ff8000";
    context.font = "500 13px PingFang SC, Microsoft YaHei, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.save();
    context.beginPath();
    context.rect(boxLeft + 8, currentLayout.recommendTop, boxWidth - 16, RECOMMEND_HEIGHT);
    context.clip();
    context.fillText(text, boxLeft + boxWidth / 2, currentLayout.recommendTop + RECOMMEND_HEIGHT / 2);
    context.restore();
  }

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = "#ff0040";
  context.font = "500 18px PingFang SC, Microsoft YaHei, sans-serif";
  context.fillText("¥", 16, currentLayout.infoTop + 22);
  context.font = "900 24px MotoyaCedarW6, Arial Black, PingFang SC, sans-serif";
  const priceText = state.price || "0";
  context.fillText(priceText, 30, currentLayout.infoTop + 24);

  if (state.halfPriceEnabled) {
    const halfPriceLabel = displayedHalfPriceText();
    const priceRight = 30 + context.measureText(priceText).width;
    const labelLeft = priceRight + 4;
    context.fillStyle = "#fff8f8";
    drawRoundRect(context, labelLeft, currentLayout.infoTop + 4, halfPriceLabel.width, 20, 6);
    context.fill();
    context.strokeStyle = "#ffd4dd";
    context.lineWidth = 0.5;
    context.stroke();
    context.fillStyle = "#ff0040";
    context.font = "13px PingFang SC, Microsoft YaHei, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(halfPriceLabel.text, labelLeft + halfPriceLabel.width / 2, currentLayout.infoTop + 14);

    const originalText = `¥${state.originalPrice || "0"}`;
    const originalLeft = labelLeft + halfPriceLabel.width + 4;
    context.fillStyle = "#999";
    context.font = "16px PingFang SC, Microsoft YaHei, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    context.fillText(originalText, originalLeft, currentLayout.infoTop + 22);
    const originalWidth = context.measureText(originalText).width;
    context.strokeStyle = "#999";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(originalLeft, currentLayout.infoTop + 14);
    context.lineTo(originalLeft + originalWidth, currentLayout.infoTop + 14);
    context.stroke();
  }

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

function downloadJpg() {
  if (!state.mainImage || !state.qrImage || !state.headerImage || !state.operationIconImage) return;
  const currentLayout = layout();
  const canvas = document.createElement("canvas");
  canvas.width = POSTER_WIDTH * 3;
  canvas.height = Math.round(currentLayout.posterHeight * 3);
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawPoster(context, 3);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${safeFilename(state.productName)}-社群宣发.jpg`);
  }, "image/jpeg", 0.92);
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

els.operationEnabled.addEventListener("change", () => {
  state.operationEnabled = els.operationEnabled.checked;
  renderPoster();
});

els.operationText.addEventListener("input", () => {
  state.operationText = els.operationText.value;
  renderPoster();
});

els.halfPriceEnabled.addEventListener("change", () => {
  state.halfPriceEnabled = els.halfPriceEnabled.checked;
  renderPoster();
});

els.originalPrice.addEventListener("input", () => {
  state.originalPrice = els.originalPrice.value;
  renderPoster();
});

els.halfPriceText.addEventListener("input", () => {
  state.halfPriceText = els.halfPriceText.value;
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
    downloadJpg();
  } catch (error) {
    console.error(error);
    alert(`下载 JPG 失败：${error.message || "请刷新页面后重试"}`);
  }
});

renderPoster();
els.recommendText.value = state.recommendText;
els.operationText.value = state.operationText;
els.originalPrice.value = state.originalPrice;
els.halfPriceText.value = state.halfPriceText;
Promise.all([loadImage(HEADER_LOGO_URL), loadImage(OPERATION_ICON_URL)])
  .then(([headerImage, operationIconImage]) => {
    state.headerImage = headerImage;
    state.operationIconImage = operationIconImage;
    renderPoster();
  })
  .catch((error) => {
    console.error(error);
    els.statusTitle.textContent = "顶部素材读取失败";
    els.statusDetail.textContent = "请刷新页面后重试。";
    els.download.disabled = true;
  });

if (document.fonts) {
  document.fonts
    .load('16px "HYFengShangHei75J"')
    .then(() => renderPoster())
    .catch((error) => console.error("运营标签字体加载失败", error));
}
})();
