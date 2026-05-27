(() => {
const templates = {
  cash: {
    title: "折扣券",
    defaults: ["8折", "单抽券", "小马宝莉 双面糖果徽章"],
  },
  free: {
    title: "免费券",
    defaults: ["免费", "单抽券", "剑网3 山海同心典藏卡\n侠行包 第3弹"],
  },
  box: {
    title: "买赠券",
    defaults: ["端1盒", "送1盒", "剑网3 山海同心典藏卡\n侠行包 第3弹"],
  },
};

const state = {
  template: "cash",
  lines: [...templates.cash.defaults],
  embeddedFonts: null,
};

const els = {
  templateTitle: document.querySelector("#templateTitle"),
  couponPreview: document.querySelector("#couponPreview"),
  line1: document.querySelector("#line1"),
  line2: document.querySelector("#line2"),
  line3: document.querySelector("#line3"),
  downloadPng: document.querySelector("#downloadPng"),
  templateButtons: Array.from(document.querySelectorAll(".template-card")),
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitLines(value) {
  return wrapTextToWidth(String(value), 249, 22, 2);
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
  while (last.length > 0 && textWidthScore(`${last}...`) > maxScore) {
    last = Array.from(last).slice(0, -1).join("");
  }
  visibleLines[maxLines - 1] = `${last}...`;
  return visibleLines;
}

function fitFontSize(text, baseSize, maxChars) {
  const length = String(text).replace(/\s/g, "").length;
  if (length <= maxChars) return baseSize;
  return Math.max(baseSize - (length - maxChars) * 5, baseSize * 0.58);
}

function truncateChars(value, maxChars) {
  return Array.from(String(value)).slice(0, maxChars).join("");
}

function visibleLine(index) {
  const limits = {
    cash: [5, 5],
    free: [2, 5],
    box: [4, 4],
  };
  const limit = limits[state.template]?.[index];
  if (!limit) return state.lines[index];
  return truncateChars(state.lines[index], limit);
}

function renderDiscountLine(value, x, y, baseSize) {
  const chars = Array.from(value);
  const unit = chars.length > 1 ? chars.pop() : "";
  const main = chars.join("") || value;

  if (!unit) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="MotoyaCedarW6, sans-serif" font-size="${baseSize}" font-weight="900" fill="#191919" letter-spacing="-2">${escapeXml(main)}</text>`;
  }

  return `
    <text x="${x}" y="${y}" text-anchor="middle" font-weight="900" fill="#191919">
      <tspan font-family="MotoyaCedarW6, sans-serif" font-size="${baseSize}" letter-spacing="-2">${escapeXml(main)}</tspan>
      <tspan font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="48" letter-spacing="0">${escapeXml(unit)}</tspan>
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

  return `
        @font-face { font-family: MotoyaCedarW6; src: ${motoyaSrc}; }
        @font-face { font-family: HYFengShangHei85J; src: ${fengSrc}; }`;
}

function couponShell(innerContent, options = {}) {
  const { topRightRadius = 16 } = options;
  const ticketPath =
    "M64 3 H311 Q327 3 327 19 V283 C320 283 314.5 288.6 314.5 295.5 C314.5 302.4 320 308 327 308 V357.5 Q327 373.5 311 373.5 H64 Q48 373.5 48 357.5 V308 C55 308 60.5 302.4 60.5 295.5 C60.5 288.6 55 283 48 283 V19 Q48 3 64 3 Z";
  const innerPath =
    topRightRadius > 20
      ? "M74 13 H197 Q317 13 317 133 V261 Q317 277 301 277 H74 Q58 277 58 261 V29 Q58 13 74 13 Z"
      : "M74 13 H301 Q317 13 317 29 V261 Q317 277 301 277 H74 Q58 277 58 261 V29 Q58 13 74 13 Z";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" role="img" aria-label="优惠券预览">
      <style>
${fontFaceCss(options.fonts)}
      </style>
      <defs>
        <linearGradient id="ticket-bg" x1="187.5" y1="3" x2="187.5" y2="373.5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffffff" />
          <stop offset="0.62" stop-color="#ffffff" />
          <stop offset="1" stop-color="#fff5c9" />
        </linearGradient>
      </defs>
      <g>
        <path d="${ticketPath}" fill="url(#ticket-bg)" stroke="#ffce00" stroke-width="2" />
        <path d="${innerPath}" fill="#ffffff" stroke="#fff7cc" stroke-width="2" />
      </g>
      ${innerContent}
    </svg>`;
}

function renderCashTemplate(options = {}) {
  const line1 = visibleLine(0);
  const line2 = visibleLine(1);
  const line3 = state.lines[2];
  const titleMainLength = Math.max(Array.from(line1).length - 1, 1);
  const titleSize = fitFontSize("字".repeat(titleMainLength), 120, 4);
  const bottomLines = splitLines(line3 || templates.cash.defaults[2]);

  return couponShell(`
    ${renderDiscountLine(line1, 187.5, 155, titleSize)}
    <text x="187.5" y="224" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="48" font-weight="750" fill="#191919">${escapeXml(line2)}</text>
    ${textBlock(bottomLines, 187.5, bottomLines.length > 1 ? 318 : 333, {
      size: 22,
      color: "#4d4d4d",
      lineHeight: 30,
    })}
  `, options);
}

function renderFreeTemplate(options = {}) {
  const line1 = visibleLine(0);
  const line2 = visibleLine(1);
  const line3 = state.lines[2];
  const line1Size = fitFontSize(line1, 100, 2);
  const bottomLines = splitLines(line3 || templates.free.defaults[2]);

  return couponShell(`
    <text x="187.5" y="155" text-anchor="middle" font-family="HYFengShangHei85J, sans-serif" font-size="${line1Size}" font-weight="900" fill="#191919">${escapeXml(line1)}</text>
    <text x="187.5" y="230" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="48" font-weight="750" fill="#191919">${escapeXml(line2)}</text>
    ${textBlock(bottomLines, 187.5, bottomLines.length > 1 ? 318 : 333, {
      size: 22,
      color: "#4d4d4d",
      lineHeight: 30,
    })}
  `, options);
}

function renderBoxTemplate(options = {}) {
  const line1 = visibleLine(0);
  const line2 = visibleLine(1);
  const line3 = state.lines[2];
  const line1Size = fitFontSize(line1, 72, 4);
  const bottomLines = splitLines(line3 || templates.box.defaults[2]);

  return couponShell(`
    <text x="187.5" y="130" text-anchor="middle" font-family="HYFengShangHei85J, sans-serif" font-size="${line1Size}" font-weight="900" fill="#191919">${escapeXml(line1)}</text>
    <text x="187.5" y="210" text-anchor="middle" font-family="HYFengShangHei85J, sans-serif" font-size="72" font-weight="900" fill="#191919">${escapeXml(line2)}</text>
    ${textBlock(bottomLines, 187.5, bottomLines.length > 1 ? 318 : 333, {
      size: 22,
      color: "#4d4d4d",
      lineHeight: 30,
    })}
  `, options);
}

function buildSvg(options = {}) {
  if (state.template === "cash") return renderCashTemplate(options);
  if (state.template === "free") return renderFreeTemplate(options);
  return renderBoxTemplate(options);
}

function render() {
  els.templateTitle.textContent = templates[state.template].title;
  els.couponPreview.innerHTML = buildSvg({ fonts: state.embeddedFonts || window.COUPON_FONT_DATA });

  els.templateButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.template === state.template);
  });
}

function setTemplate(template) {
  state.template = template;
  state.lines = [...templates[template].defaults];
  els.line1.value = state.lines[0];
  els.line2.value = state.lines[1];
  els.line3.value = state.lines[2];
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

async function downloadPng() {
  const fonts = await loadEmbeddedFonts();
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

els.templateButtons.forEach((button) => {
  button.addEventListener("click", () => setTemplate(button.dataset.template));
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
