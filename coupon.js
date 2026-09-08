(() => {
const templates = {
  cash: {
    title: "满减券",
    defaults: ["¥10", "满100元可用", "优惠券名称优惠券"],
  },
  discount: {
    title: "折扣券",
    defaults: ["5折", "单抽券", "优惠券名称优惠券"],
  },
  ticket: {
    title: "门票券",
    defaults: ["¥10", "免费抽", "优惠券名称优惠券名称优惠券名称"],
  },
  box: {
    title: "买赠券",
    defaults: ["抽1包", "送1包", "优惠券名称优惠券"],
  },
  draw: {
    title: "抽卡券",
    defaults: ["", "", ""],
  },
  product: {
    title: "商品券",
    defaults: ["", "", ""],
  },
  newcomer: {
    title: "新人半价",
    defaults: ["抽1包", "送1包", "小马宝莉 辉月包 第12弹"],
  },
};

const productTags = {
  exchange: {
    label: "兑换券",
    src: "./assets/product-tags/exchange.png",
  },
  single: {
    label: "单抽券",
    src: "./assets/product-tags/single.png",
  },
  box: {
    label: "端盒券",
    src: "./assets/product-tags/box.png",
    mime: "image/png",
  },
  random: {
    label: "随机一款",
    src: "./assets/product-tags/random.svg",
    mime: "image/svg+xml",
  },
};

const state = {
  template: "cash",
  lines: [...templates.cash.defaults],
  embeddedFonts: null,
  productImageDataUrl: "",
  productImageName: "",
  productTag: "exchange",
  productTagDataUrls: window.COUPON_PRODUCT_TAG_DATA || null,
  showThirdLine: true,
  drawAmount: "none",
  drawCustomAmount: "30",
  drawRestricted: false,
};

const els = {
  templateTitle: document.querySelector("#templateTitle"),
  couponPreview: document.querySelector("#couponPreview"),
  textPanel: document.querySelector("#couponTextPanel"),
  productPanel: document.querySelector("#couponProductPanel"),
  drawPanel: document.querySelector("#couponDrawPanel"),
  productTagPicker: document.querySelector("#productTagPicker"),
  line1: document.querySelector("#line1"),
  line2: document.querySelector("#line2"),
  line3: document.querySelector("#line3"),
  showThirdLine: document.querySelector("#showThirdLine"),
  thirdLineToggleRow: document.querySelector("#thirdLineToggleRow"),
  thirdLineField: document.querySelector("#thirdLineField"),
  productImageInput: document.querySelector("#productImageInput"),
  productImageName: document.querySelector("#productImageName"),
  productTagButtons: Array.from(document.querySelectorAll("[data-product-tag]")),
  drawAmountButtons: Array.from(document.querySelectorAll("[data-draw-amount]")),
  drawCustomAmountField: document.querySelector("#drawCustomAmountField"),
  drawCustomAmount: document.querySelector("#drawCustomAmount"),
  drawRestricted: document.querySelector("#drawRestricted"),
  downloadPng: document.querySelector("#downloadPng"),
  templateButtons: Array.from(document.querySelectorAll("#couponPage .template-card")),
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitLines(value) {
  return wrapTextToWidth(String(value), 337.5, 30, 2);
}

function textWidthScore(text) {
  return Array.from(text).reduce((total, char) => {
    if (/[A-Za-z0-9]/.test(char)) return total + 0.58;
    if (/\s/.test(char)) return total + 0.35;
    return total + 1;
  }, 0);
}

function wrapTextToWidth(value, maxWidth, fontSize, maxLines) {
  const maxScore = maxWidth / fontSize;
  const chars = String(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .split("");
  const lines = [];
  let current = "";

  chars.forEach((char) => {
    if (char === "\n") {
      if (current) lines.push(current);
      current = "";
      return;
    }

    const next = current + char;
    if (current && textWidthScore(next) > maxScore) {
      lines.push(current);
      current = char;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;

  const visibleLines = lines.slice(0, maxLines);
  let last = visibleLines[maxLines - 1];
  while (last.length > 0 && textWidthScore(`${last}…`) > maxScore) {
    last = Array.from(last).slice(0, -1).join("");
  }
  visibleLines[maxLines - 1] = `${last}…`;
  return visibleLines;
}

function fitSingleLineFontSize(value, baseSize, maxWidth, minSize = 20) {
  const score = Math.max(textWidthScore(String(value)), 1);
  return Math.max(minSize, Math.min(baseSize, maxWidth / score));
}

function fitFontSize(text, baseSize, maxChars) {
  const length = String(text).replace(/\s/g, "").length;
  if (length <= maxChars) return baseSize;
  return Math.max(baseSize - (length - maxChars) * 5, baseSize * 0.58);
}

function truncateChars(value, maxChars) {
  return Array.from(String(value)).slice(0, maxChars).join("");
}

function newcomerThirdLines(value) {
  const lines = [];
  String(value || "")
    .replace(/\r/g, "")
    .split("\n")
    .forEach((manualLine) => {
      const characters = Array.from(manualLine);
      if (!characters.length) {
        lines.push("");
        return;
      }
      let current = "";
      let visibleCount = 0;
      characters.forEach((character) => {
        const isSpace = /\s/.test(character);
        if (!isSpace && visibleCount >= 12) {
          lines.push(current.trimEnd());
          current = "";
          visibleCount = 0;
        }
        if (!current && isSpace) return;
        current += character;
        if (!isSpace) visibleCount += 1;
      });
      if (current) lines.push(current.trimEnd());
    });
  return lines.slice(0, 2);
}

function visibleLine(index) {
  return state.lines[index];
}

function renderDiscountLine(value, x, y, baseSize) {
  const chars = Array.from(value);
  const unit = chars.length > 1 ? chars.pop() : "";
  const main = chars.join("") || value;
  const unitSize = 61.875 * (baseSize / 97.5);

  if (!unit) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="MotoyaCedarW6, sans-serif" font-size="${baseSize}" font-weight="900" fill="#191919" letter-spacing="-2">${escapeXml(main)}</text>`;
  }

  return `
    <text x="${x}" y="${y}" text-anchor="middle" font-weight="900" fill="#191919">
      <tspan font-family="MotoyaCedarW6, sans-serif" font-size="${baseSize}" letter-spacing="-2">${escapeXml(main)}</tspan>
      <tspan font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${unitSize}" letter-spacing="0">${escapeXml(unit)}</tspan>
    </text>`;
}

function textBlock(lines, x, y, options = {}) {
  const {
    size = 18,
    color = "#4d4d4d",
    weight = 400,
    anchor = "middle",
    lineHeight = 25,
  } = options;

  return lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight;
      return `<text x="${x}" y="${y + dy}" text-anchor="${anchor}" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`;
    })
    .join("");
}

function fontFaceCss(fonts = null) {
  const motoyaSrc = fonts?.motoya
    ? `url("data:font/otf;base64,${fonts.motoya}") format("opentype")`
    : `url("./assets/fonts/MotoyaCedarStd-W6.otf") format("opentype")`;
  const fengSrc = fonts?.feng
    ? `url("data:font/ttf;base64,${fonts.feng}") format("truetype")`
    : `url("./assets/fonts/HYFengShangHei_85J.ttf") format("truetype")`;
  const newcomerSrc = window.COUPON_NEWCOMER_DATA?.font
    ? `url("data:font/ttf;base64,${window.COUPON_NEWCOMER_DATA.font}") format("truetype")`
    : `url("./assets/fonts/ZiHunGuanJunTi.ttf") format("truetype")`;

  return `
        @font-face { font-family: MotoyaCedarW6; src: ${motoyaSrc}; }
        @font-face { font-family: HYFengShangHei85J; src: ${fengSrc}; }
        @font-face { font-family: ZiHunGuanJunTi; src: ${newcomerSrc}; }`;
}

function couponShell(innerContent, options = {}) {
  const frame = window.COUPON_FRAME_DATA || "./assets/coupon-frame-cash.svg";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" role="img" aria-label="优惠券预览">
      <style>
${fontFaceCss(options.fonts)}
      </style>
      <image href="${frame}" x="0" y="0" width="375" height="375" preserveAspectRatio="none" />
      ${innerContent}
    </svg>`;
}

function renderCashLine(value, x, y, baseSize) {
  const text = String(value);
  const hasCurrency = text.startsWith("¥");
  const amount = hasCurrency ? text.slice(1) : text;
  const currencySize = 61.875 * (baseSize / 97.5);
  if (!hasCurrency) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="MotoyaCedarW6, sans-serif" font-size="${baseSize}" font-weight="900" fill="#191919">${escapeXml(amount)}</text>`;
  }
  return `<text x="${x}" y="${y}" text-anchor="middle" font-weight="900" fill="#191919"><tspan font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${currencySize}">¥</tspan><tspan font-family="MotoyaCedarW6, sans-serif" font-size="${baseSize}">${escapeXml(amount)}</tspan></text>`;
}

function renderCouponFooter(bottomLines) {
  if (!state.showThirdLine) {
    const logo = window.COUPON_LOGO_DATA || "./assets/kayou-coupon-logo.svg";
    return `<image href="${logo}" x="123.75" y="305.625" width="127.5" height="30" preserveAspectRatio="xMidYMid meet" />`;
  }

  return textBlock(bottomLines, 187.5, bottomLines.length > 1 ? 314 : 329, {
    size: 30,
    color: "#666666",
    weight: 300,
    lineHeight: 39,
  });
}

function renderCashTemplate(options = {}) {
  const line1 = visibleLine(0);
  const line2 = visibleLine(1);
  const line3 = state.lines[2];
  const line1Size = fitSingleLineFontSize(line1, 97.5, 336, 10);
  const line2Size = fitSingleLineFontSize(line2, 41.25, 336, 10);
  const bottomLines = splitLines(line3 || templates.cash.defaults[2]);

  return couponShell(`
    ${renderCashLine(line1, 187.5, 142, line1Size)}
    <text x="187.5" y="218" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${line2Size}" font-weight="400" fill="#191919">${escapeXml(line2)}</text>
    ${renderCouponFooter(bottomLines)}
  `, options);
}

function renderDiscountTemplate(options = {}) {
  const line1 = visibleLine(0);
  const line2 = visibleLine(1);
  const line3 = state.lines[2];
  const line1Size = fitSingleLineFontSize(line1, 97.5, 336, 10);
  const line2Size = fitSingleLineFontSize(line2, 41.25, 336, 10);
  const bottomLines = splitLines(line3 || templates.discount.defaults[2]);

  return couponShell(`
    ${renderDiscountLine(line1, 187.5, 142, line1Size)}
    <text x="187.5" y="218" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${line2Size}" font-weight="400" fill="#191919">${escapeXml(line2)}</text>
    ${renderCouponFooter(bottomLines)}
  `, options);
}

function renderTicketTemplate(options = {}) {
  const line1 = visibleLine(0);
  const line2 = visibleLine(1);
  const line3 = state.lines[2];
  const line1Size = fitSingleLineFontSize(line1, 97.5, 336, 10);
  const line2Size = fitSingleLineFontSize(line2, 41.25, 336, 10);
  const bottomLines = splitLines(line3 || templates.ticket.defaults[2]);

  return couponShell(`
    ${renderCashLine(line1, 187.5, 142, line1Size)}
    <text x="187.5" y="218" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${line2Size}" font-weight="400" fill="#191919">${escapeXml(line2)}</text>
    ${renderCouponFooter(bottomLines)}
  `, options);
}

function renderBoxTemplate(options = {}) {
  const line1 = visibleLine(0);
  const line2 = visibleLine(1);
  const line3 = state.lines[2];
  const line1Size = fitSingleLineFontSize(line1, 67.5, 336, 10);
  const line2Size = fitSingleLineFontSize(line2, 67.5, 336, 10);
  const bottomLines = splitLines(line3 || templates.box.defaults[2]);

  return couponShell(`
    <text x="187.5" y="130" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${line1Size}" font-weight="600" fill="#191919">${escapeXml(line1)}</text>
    <text x="187.5" y="210" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${line2Size}" font-weight="600" fill="#191919">${escapeXml(line2)}</text>
    ${renderCouponFooter(bottomLines)}
  `, options);
}

function renderProductTag() {
  const tag = productTags[state.productTag] || productTags.exchange;
  const href = state.productTagDataUrls?.[state.productTag] || tag.src;
  const isRandom = state.productTag === "random";
  const randomLabel = isRandom
    ? `<text x="317.75" y="162" text-anchor="middle" font-family="HYFengShangHei85J, sans-serif" font-size="48" font-weight="900" fill="#191919" transform="rotate(-4.74 317.75 222.5)">
        <tspan x="317.75" dy="0">随</tspan>
        <tspan x="317.75" dy="50">机</tspan>
        <tspan x="317.75" dy="50">一</tspan>
        <tspan x="317.75" dy="50">款</tspan>
      </text>`
    : "";

  return `
    <image href="${href}" x="${isRandom ? 253.31 : 253}" y="${isRandom ? 37 : 21}" width="${isRandom ? 122.657 : 117.5}" height="${isRandom ? 301.104 : 263.5}" preserveAspectRatio="xMidYMid meet" />
    ${randomLabel}`;
}

function renderProductTemplate(options = {}) {
  const imageX = 7.5;
  const imageY = 7.5;
  const imageSize = 360;
  const imageMarkup = state.productImageDataUrl
    ? `<image href="${state.productImageDataUrl}" x="${imageX}" y="${imageY}" width="${imageSize}" height="${imageSize}" preserveAspectRatio="xMidYMid meet" />`
    : `<g>
        <rect x="${imageX}" y="${imageY}" width="${imageSize}" height="${imageSize}" rx="10" fill="none" stroke="#cfd8df" stroke-dasharray="8 8" />
        <text x="187.5" y="187.5" text-anchor="middle" dominant-baseline="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="#7b8790">商品图预览</text>
      </g>`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" role="img" aria-label="商品券预览">
      <style>
${fontFaceCss(options.fonts)}
      </style>
      ${imageMarkup}
      ${renderProductTag()}
    </svg>`;
}

function renderNewcomerTemplate(options = {}) {
  const line1 = truncateChars(state.lines[0], 4);
  const line2 = truncateChars(state.lines[1], 4);
  const bottomLines = newcomerThirdLines(state.lines[2]);
  const background = window.COUPON_NEWCOMER_DATA?.background || "./assets/coupon-newcomer-half-bg.png";
  const backgroundMask = window.COUPON_NEWCOMER_DATA?.mask || "./assets/coupon-newcomer-half-mask.png";
  const bottomY = bottomLines.length > 1 ? [327, 353] : [340];

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" role="img" aria-label="新人半价优惠券预览" style="background: transparent">
      <style>
${fontFaceCss(options.fonts)}
      </style>
      <defs>
        <mask id="newcomer-bg-mask" x="10" y="0" width="335" height="374" maskUnits="userSpaceOnUse" style="mask-type: alpha">
          <image href="${backgroundMask}" x="10" y="0" width="335" height="374" preserveAspectRatio="none" />
        </mask>
        <linearGradient id="newcomer-line2" x1="95" y1="0" x2="279" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffffff" />
          <stop offset="0.39423" stop-color="#aaf2ff" />
          <stop offset="1" stop-color="#cdc0fb" />
        </linearGradient>
      </defs>
      <image href="${background}" x="10" y="0" width="335" height="374" preserveAspectRatio="none" mask="url(#newcomer-bg-mask)" />
      <g
        font-family="ZiHunGuanJunTi, sans-serif"
        font-size="80"
        font-weight="400"
        text-anchor="middle"
        stroke="#26335e"
        stroke-width="6"
        stroke-linejoin="round"
        paint-order="stroke fill"
      >
        <text x="187" y="136" fill="#ffffff">${escapeXml(line1)}</text>
        <text x="187" y="236" fill="url(#newcomer-line2)">${escapeXml(line2)}</text>
      </g>
      <g
        font-family="ZiHunGuanJunTi, sans-serif"
        font-size="22"
        font-weight="400"
        text-anchor="middle"
        fill="#ffffff"
        stroke="#26335e"
        stroke-width="4"
        stroke-linejoin="round"
        paint-order="stroke fill"
      >
        ${bottomLines.map((line, index) => `<text x="187.5" y="${bottomY[index]}">${escapeXml(line)}</text>`).join("")}
      </g>
    </svg>`;
}

function renderDrawCouponTemplate(options = {}) {
  const base = window.DRAW_COUPON_DATA || "./assets/draw-coupon-base.png";
  const percent = window.DRAW_COUPON_PERCENT_DATA || "./assets/draw-coupon-percent.svg";
  const amount = state.drawAmount === "custom" ? state.drawCustomAmount.trim() : state.drawAmount;
  const amountSize = amount && amount !== "none" ? 86.81 : 0;
  const currencySize = amountSize * 0.6;
  const amountMarkup = amount && amount !== "none"
    ? `<text x="158" y="211" text-anchor="middle" font-weight="900" fill="#ffffff" transform="rotate(-6 158 185)" style="filter: drop-shadow(0 5px 3px rgba(217,36,0,.6))"><tspan font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${currencySize}">¥</tspan><tspan font-family="MotoyaCedarW6, sans-serif" font-size="${amountSize}">${escapeXml(amount)}</tspan></text>`
    : `<image href="${percent}" x="111" y="149" width="98.787" height="84.438" transform="rotate(-6 160.394 191.219)" preserveAspectRatio="xMidYMid meet" />`;
  const restrictedMarkup = state.drawRestricted
    ? `<rect x="0" y="281.25" width="375" height="93.75" fill="#ffeeeb" />
       <text x="187.5" y="346" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="57.292" font-weight="400" fill="#ff0040">限非新品</text>`
    : "";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" role="img" aria-label="抽卡券预览">
      <style>${fontFaceCss(options.fonts)}</style>
      <image href="${base}" x="0" y="0" width="375" height="375" preserveAspectRatio="none" />
      ${amountMarkup}
      ${restrictedMarkup}
    </svg>`;
}

function buildSvg(options = {}) {
  if (state.template === "cash") return renderCashTemplate(options);
  if (state.template === "discount") return renderDiscountTemplate(options);
  if (state.template === "ticket") return renderTicketTemplate(options);
  if (state.template === "product") return renderProductTemplate(options);
  if (state.template === "newcomer") return renderNewcomerTemplate(options);
  if (state.template === "draw") return renderDrawCouponTemplate(options);
  return renderBoxTemplate(options);
}

function render() {
  const isProduct = state.template === "product";
  const isDraw = state.template === "draw";
  const supportsThirdLineToggle = ["cash", "discount", "ticket", "box"].includes(state.template);
  els.templateTitle.textContent = templates[state.template].title;
  els.couponPreview.innerHTML = buildSvg({ fonts: state.embeddedFonts || window.COUPON_FONT_DATA });
  els.textPanel.hidden = isProduct || isDraw;
  els.productPanel.hidden = !isProduct;
  els.drawPanel.hidden = !isDraw;
  els.productTagPicker.hidden = !isProduct;
  els.thirdLineToggleRow.hidden = !supportsThirdLineToggle;
  els.thirdLineField.hidden = supportsThirdLineToggle && !state.showThirdLine;
  els.showThirdLine.checked = state.showThirdLine;
  els.drawCustomAmountField.hidden = state.drawAmount !== "custom";
  els.drawCustomAmount.value = state.drawCustomAmount;
  els.drawRestricted.checked = state.drawRestricted;
  els.downloadPng.disabled = isProduct && !state.productImageDataUrl;

  els.templateButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.template === state.template);
  });

  els.productTagButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.productTag === state.productTag);
  });
  els.drawAmountButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.drawAmount === state.drawAmount);
  });
}

function setTemplate(template) {
  state.template = template;
  state.lines = [...templates[template].defaults];
  els.line1.value = state.lines[0];
  els.line2.value = state.lines[1];
  els.line3.value = state.lines[2];
  els.productImageName.textContent = state.productImageName || "未选择";
  render();
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

function safeFilenamePart(value) {
  return String(value)
    .replace(/\s+/g, "")
    .replace(/[\\/:*?"<>|]/g, "-")
    .trim();
}

function downloadFilename() {
  if (state.template === "draw") {
    const amount = state.drawAmount === "custom" ? state.drawCustomAmount.trim() : state.drawAmount;
    return `抽卡券-${amount === "none" || !amount ? "无金额" : `${safeFilenamePart(amount)}元`}${state.drawRestricted ? "-限非新品" : ""}.png`;
  }
  if (state.template === "product") {
    const name = safeFilenamePart(state.productImageName.replace(/\.[^.]+$/i, ""));
    const tag = safeFilenamePart(productTags[state.productTag]?.label || "商品券");
    return `${tag}${name || "商品券"}.png`;
  }

  const name = state.lines
    .map(safeFilenamePart)
    .filter(Boolean)
    .join("");

  return `${name || "coupon-template"}.png`;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

async function loadEmbeddedFonts() {
  if (state.embeddedFonts) return state.embeddedFonts;
  if (window.COUPON_FONT_DATA?.motoya && window.COUPON_FONT_DATA?.feng) {
    state.embeddedFonts = window.COUPON_FONT_DATA;
    return state.embeddedFonts;
  }

  const [motoyaResponse, fengResponse] = await Promise.all([
    fetch("./assets/fonts/MotoyaCedarStd-W6.otf"),
    fetch("./assets/fonts/HYFengShangHei_85J.ttf"),
  ]);

  if (!motoyaResponse.ok || !fengResponse.ok) {
    throw new Error("字体文件读取失败");
  }

  state.embeddedFonts = {
    motoya: arrayBufferToBase64(await motoyaResponse.arrayBuffer()),
    feng: arrayBufferToBase64(await fengResponse.arrayBuffer()),
  };

  return state.embeddedFonts;
}

async function loadProductTagDataUrls() {
  if (state.productTagDataUrls) return state.productTagDataUrls;

  const entries = await Promise.all(
    Object.entries(productTags).map(async ([key, tag]) => {
      try {
        const response = await fetch(tag.src);
        if (!response.ok) throw new Error("商品券标签素材读取失败");
        const dataUrl = `data:${tag.mime || "image/png"};base64,${arrayBufferToBase64(await response.arrayBuffer())}`;
        return [key, dataUrl];
      } catch (error) {
        throw new Error("商品券标签素材读取失败");
      }
    }),
  );

  state.productTagDataUrls = Object.fromEntries(entries);
  return state.productTagDataUrls;
}

async function downloadPng() {
  const fonts = await loadEmbeddedFonts();
  if (state.template === "product" && !state.productImageDataUrl) return;
  if (state.template === "product") {
    await loadProductTagDataUrls();
  }
  const svg = buildSvg({ fonts });
  const image = new Image();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 750;
    canvas.height = 750;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, downloadFilename());
    }, "image/png");
  };

  image.src = url;
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleProductImage(file) {
  state.productImageDataUrl = await readAsDataUrl(file);
  state.productImageName = file.name;
  els.productImageName.textContent = file.name;
  render();
}

els.templateButtons.forEach((button) => {
  button.addEventListener("click", () => setTemplate(button.dataset.template));
});

els.productTagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.productTag = button.dataset.productTag;
    render();
  });
});

els.drawAmountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.drawAmount = button.dataset.drawAmount;
    render();
  });
});

els.drawCustomAmount.addEventListener("input", () => {
  state.drawCustomAmount = els.drawCustomAmount.value;
  render();
});

els.drawRestricted.addEventListener("change", () => {
  state.drawRestricted = els.drawRestricted.checked;
  render();
});

els.showThirdLine.addEventListener("change", () => {
  state.showThirdLine = els.showThirdLine.checked;
  render();
});

els.productImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  handleProductImage(file).catch((error) => {
    console.error(error);
    state.productImageDataUrl = "";
    state.productImageName = "";
    els.productImageName.textContent = "读取失败";
    render();
    alert("商品图片读取失败，请重新选择图片。");
  });
});

[els.line1, els.line2, els.line3].forEach((input, index) => {
  input.addEventListener("input", () => {
    state.lines[index] = input.value;
    render();
  });
});

els.downloadPng.addEventListener("click", () => {
  downloadPng().catch((error) => {
    console.error(error);
    alert(`下载 PNG 失败：${error.message || "请刷新页面后重试"}`);
  });
});

setTemplate("cash");
})();
