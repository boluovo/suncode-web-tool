(() => {
  const page = document.querySelector("#ecommercePage");
  if (!page) return;

  const parts = {
    part1: { title: "PART 1", width: 375, height: 480, exportWidth: 1125, exportHeight: 1440 },
    part2: { title: "PART 2", width: 375, height: 302, exportWidth: 1125, exportHeight: 906 },
    part3: { title: "PART 3", width: 375, height: 446.615, exportWidth: 1125, exportHeight: 1340 },
    part4: { title: "PART 4", width: 375, height: 479.427, exportWidth: 1125, exportHeight: 1438 },
  };

  function currentDateText() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  const emptyPart2Item = () => ({
    imageDataUrl: "",
    imageName: "",
    name: "",
    pointsEnabled: true,
    yuanEnabled: true,
    points: "55",
    yuan: "0.01",
  });

  const emptyPart3Item = () => ({ imageDataUrl: "", imageName: "", name: "" });
  const emptyPart4Item = () => ({ ...emptyPart2Item(), yuanEnabled: false });

  const state = {
    part: "part1",
    part1: { date: currentDateText(), copy: "会员购名侦探柯南系列产品" },
    part2: Array.from({ length: 6 }, emptyPart2Item),
    part3: Array.from({ length: 5 }, emptyPart3Item),
    part4: { date: currentDateText(), items: Array.from({ length: 6 }, emptyPart4Item) },
    part2Slot: 0,
    part3Slot: 0,
    part4Slot: 0,
    backgrounds: {},
  };

  const els = {
    canvas: page.querySelector("#ecommercePreview"),
    partTitle: page.querySelector("#ecommercePartTitle"),
    statusDetail: page.querySelector("#ecommerceStatusDetail"),
    validation: page.querySelector("#ecommerceValidation"),
    download: page.querySelector("#downloadEcommercePng"),
    partButtons: Array.from(page.querySelectorAll("[data-ecommerce-part]")),
    part1Panel: page.querySelector("#ecommercePart1Panel"),
    part2Panel: page.querySelector("#ecommercePart2Panel"),
    part3Panel: page.querySelector("#ecommercePart3Panel"),
    part4Panel: page.querySelector("#ecommercePart4Panel"),
    date: page.querySelector("#ecommerceDate"),
    copy: page.querySelector("#ecommerceCopy"),
    part2Slots: page.querySelector("#ecommercePart2Slots"),
    part2Image: page.querySelector("#ecommercePart2Image"),
    part2ImageName: page.querySelector("#ecommercePart2ImageName"),
    part2Name: page.querySelector("#ecommercePart2Name"),
    pointsEnabled: page.querySelector("#ecommercePointsEnabled"),
    points: page.querySelector("#ecommercePoints"),
    yuanEnabled: page.querySelector("#ecommerceYuanEnabled"),
    yuan: page.querySelector("#ecommerceYuan"),
    part3Slots: page.querySelector("#ecommercePart3Slots"),
    part3Image: page.querySelector("#ecommercePart3Image"),
    part3ImageName: page.querySelector("#ecommercePart3ImageName"),
    part3Name: page.querySelector("#ecommercePart3Name"),
    part4Date: page.querySelector("#ecommercePart4Date"),
    part4Slots: page.querySelector("#ecommercePart4Slots"),
    part4Image: page.querySelector("#ecommercePart4Image"),
    part4ImageName: page.querySelector("#ecommercePart4ImageName"),
    part4Name: page.querySelector("#ecommercePart4Name"),
    part4PointsEnabled: page.querySelector("#ecommercePart4PointsEnabled"),
    part4Points: page.querySelector("#ecommercePart4Points"),
    part4YuanEnabled: page.querySelector("#ecommercePart4YuanEnabled"),
    part4Yuan: page.querySelector("#ecommercePart4Yuan"),
  };

  const fontFamily = '"PingFang SC", "Microsoft YaHei", sans-serif';

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("图片读取失败"));
      image.src = src;
    });
  }

  function readUpload(input) {
    const file = input.files?.[0];
    if (!file) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = String(reader.result);
          const image = await loadImage(dataUrl);
          resolve({ dataUrl, image, name: file.name, file });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("图片读取失败"));
      reader.readAsDataURL(file);
    });
  }

  function nameFromFilename(filename) {
    const value = String(filename || "")
      .replace(/\.[^.]+$/, "")
      .replace(/@(?:2x|3x)$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (/^(?:img|image|photo|dsc|微信图片)\s*\d*$/i.test(value)) return "";
    return value;
  }

  async function recognizeProductName(upload) {
    if ("TextDetector" in window) {
      try {
        const detector = new window.TextDetector();
        const results = await detector.detect(upload.image);
        const lines = results
          .map((result) => String(result.rawValue || "").trim())
          .filter(Boolean)
          .slice(0, 2);
        if (lines.length) return lines.join("\n");
      } catch (_) {
        // Fall back to the local filename when browser OCR is unavailable.
      }
    }
    return nameFromFilename(upload.name);
  }

  function drawContain(context, image, x, y, width, height) {
    if (!image?.naturalWidth || !image?.naturalHeight) return;
    const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  function fittedFontSize(context, lines, maxWidth, maxSize, minSize, weight = 600) {
    let size = maxSize;
    while (size > minSize) {
      context.font = `${weight} ${size}px ${fontFamily}`;
      if (lines.every((line) => context.measureText(line).width <= maxWidth)) return size;
      size -= 0.2;
    }
    return minSize;
  }

  function wrapNameLines(value, maxCharacters) {
    const lines = [];
    const manualLines = String(value || "").split(/\r?\n/);

    for (const manualLine of manualLines) {
      const characters = Array.from(manualLine.trim());
      while (characters.length) {
        lines.push(characters.splice(0, maxCharacters).join(""));
      }
    }

    const visibleLines = lines.slice(0, 2);
    if (lines.length > 2 && visibleLines.length === 2) {
      const lastLine = Array.from(visibleLines[1]);
      if (lastLine.length >= maxCharacters) lastLine[maxCharacters - 1] = "…";
      else lastLine.push("…");
      visibleLines[1] = lastLine.join("");
    }
    return visibleLines;
  }

  function drawNameBlock(context, item, x, y, width, height, maxSize, maxCharacters, weight = 600) {
    const lines = wrapNameLines(item.name, maxCharacters);
    if (!lines.length) return;
    const size = fittedFontSize(context, lines, width, maxSize, 5.5, weight);
    const lineHeight = Math.min(size * 1.25, height - size);
    const centerY = y + height / 2;

    context.save();
    context.beginPath();
    context.rect(x, y, width, height);
    context.clip();
    context.fillStyle = "#111";
    context.font = `${weight} ${size}px ${fontFamily}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    if (lines.length === 1) {
      context.fillText(lines[0], x + width / 2, centerY);
    } else {
      context.fillText(lines[0], x + width / 2, centerY - lineHeight / 2);
      context.fillText(lines[1], x + width / 2, centerY + lineHeight / 2);
    }
    context.restore();
  }

  function drawDate(context, dateValue) {
    const date = dateValue.trim();
    const gradient = context.createLinearGradient(0, 151, 0, 176);
    gradient.addColorStop(0, "#fefae5");
    gradient.addColorStop(1, "#fcee70");

    context.save();
    context.fillStyle = gradient;
    context.shadowColor = "#000";
    context.shadowOffsetY = 2;
    context.shadowBlur = 0;
    context.strokeStyle = "#000";
    context.lineWidth = 4;
    context.lineJoin = "round";
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    const timeFont = '900 18px "HYFengShangHei85J", sans-serif';
    const dateFontFamily = '"MotoyaCedarW6", sans-serif';
    const gap = 4;
    const groupCenterX = 240.5;
    const maxGroupWidth = 148;
    context.font = timeFont;
    const timeWidth = context.measureText("TIME:").width;
    let dateSize = 18;
    context.font = `700 ${dateSize}px ${dateFontFamily}`;
    while (dateSize > 10 && context.measureText(date).width > maxGroupWidth - timeWidth - gap) {
      dateSize -= 0.2;
      context.font = `700 ${dateSize}px ${dateFontFamily}`;
    }
    const dateWidth = context.measureText(date).width;
    const groupLeft = groupCenterX - (timeWidth + gap + dateWidth) / 2;

    context.font = timeFont;
    context.strokeText("TIME:", groupLeft, 172);
    context.shadowColor = "transparent";
    context.fillText("TIME:", groupLeft, 172);
    context.font = `700 ${dateSize}px ${dateFontFamily}`;
    const dateX = groupLeft + timeWidth + gap;
    context.shadowColor = "#000";
    context.strokeText(date, dateX, 172);
    context.shadowColor = "transparent";
    context.fillText(date, dateX, 172);
    context.restore();
  }

  function drawPart1(context) {
    const copy = Array.from(state.part1.copy.trim()).slice(0, 25).join("");
    drawDate(context, state.part1.date);

    context.save();
    context.beginPath();
    context.rect(25, 255, 324, 18);
    context.clip();
    context.fillStyle = "#111";
    context.font = `700 12px ${fontFamily}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(copy, 187, 265);
    context.restore();
  }

  function drawPrice(context, item, centerX, top) {
    const lines = [];
    if (item.pointsEnabled && item.points.trim()) lines.push(`${item.points.trim()}积分`);
    if (item.yuanEnabled && item.yuan.trim()) lines.push(`${lines.length ? "+" : ""}￥${item.yuan.trim()}`);
    if (!lines.length) return;
    const size = fittedFontSize(context, lines, 51, 9, 6, 800);
    context.save();
    context.beginPath();
    context.rect(centerX - 26.5, top, 53, 22);
    context.clip();
    context.fillStyle = "#111";
    context.font = `800 ${size}px ${fontFamily}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    if (lines.length === 1) {
      context.fillText(lines[0], centerX, top + 11);
    } else {
      context.fillText(lines[0], centerX, top + 6);
      context.fillText(lines[1], centerX, top + 16);
    }
    context.restore();
  }

  function drawProductGrid(context, items, rowTop) {
    const imageX = [37, 142, 246];
    const textX = [75, 180, 284];
    items.forEach((item, index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);
      drawContain(context, item.image, imageX[column], rowTop[row] + 2, 34, 48);
      drawNameBlock(context, item, textX[column], rowTop[row], 55, 26, 9, 8);
      drawPrice(context, item, textX[column] + 27.5, rowTop[row] + 34);
      const isEmpty = !item.imageDataUrl && !item.name.trim();
      if (isEmpty) {
        context.save();
        context.fillStyle = "rgba(52, 52, 52, 0.42)";
        context.font = `800 20px ${fontFamily}`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(String(index + 1), imageX[column] + 17, rowTop[row] + 26);
        context.restore();
      }
    });
  }

  function drawPart2(context) {
    drawProductGrid(context, state.part2, [94, 172]);
  }

  function drawPart4(context) {
    drawDate(context, state.part4.date);
    drawProductGrid(context, state.part4.items, [271, 349]);
  }

  const wheelSlots = [
    { x: 162.32, y: 169.29, rotation: -30 },
    { x: 251.334, y: 211.228, rotation: 78 },
    { x: 240.206, y: 263.254, rotation: 130 },
    { x: 190, y: 288.5, rotation: 180 },
    { x: 141.205, y: 265.254, rotation: -130 },
  ];

  function drawWheelProduct(context, item, slot) {
    context.save();
    context.translate(slot.x, slot.y);
    context.rotate((slot.rotation * Math.PI) / 180);
    drawNameBlock(context, item, -36, -27.5, 72, 22, 8, 12, 400);
    drawContain(context, item.image, -14, -3.5, 28, 28);
    context.restore();
  }

  function drawFixedWheelItems(context) {
    context.save();
    context.translate(220.392, 166.588);
    context.rotate(Math.PI / 6);
    context.fillStyle = "#111";
    context.font = `800 12px ${fontFamily}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("谢谢", 0, -7);
    context.fillText("参与", 0, 7);
    context.restore();

    context.save();
    context.translate(128.334, 211.228);
    context.rotate((-78 * Math.PI) / 180);
    context.fillStyle = "#111";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = '700 18px "MotoyaCedarW6", sans-serif';
    context.fillText("30", 0, -7);
    context.font = `600 8px ${fontFamily}`;
    context.fillText("积分", 0, 14);
    context.restore();
  }

  function drawPart3(context) {
    drawFixedWheelItems(context);
    state.part3.forEach((item, index) => {
      drawWheelProduct(context, item, wheelSlots[index]);
      const isEmpty = !item.imageDataUrl && !item.name.trim();
      if (isEmpty) {
        context.save();
        context.fillStyle = "rgba(52, 52, 52, 0.42)";
        context.font = `800 16px ${fontFamily}`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(String(index + 1), wheelSlots[index].x, wheelSlots[index].y);
        context.restore();
      }
    });
  }

  function validationForPart(part = state.part) {
    if (part === "part1") {
      const missing = [];
      if (!state.part1.date.trim()) missing.push("日期");
      if (!state.part1.copy.trim()) missing.push("一行文案");
      return missing.length ? `请填写：${missing.join("、")}` : "内容已填写完整，可以下载。";
    }

    if (part === "part4" && !state.part4.date.trim()) return "请填写：日期";

    const items = part === "part4" ? state.part4.items : state[part];
    const incomplete = [];
    items.forEach((item, index) => {
      let valid = Boolean(item.imageDataUrl && item.name.trim());
      if (part === "part2" || part === "part4") {
        valid = valid && (item.pointsEnabled || item.yuanEnabled);
        if (item.pointsEnabled) valid = valid && Boolean(item.points.trim());
        if (item.yuanEnabled) valid = valid && Boolean(item.yuan.trim());
      }
      if (!valid) incomplete.push(index + 1);
    });
    return incomplete.length ? `请完成坑位：${incomplete.join("、")}` : "所有坑位已填写完整，可以下载。";
  }

  function isPartValid(part = state.part) {
    if (part === "part1") return Boolean(state.part1.date.trim() && state.part1.copy.trim());
    if (part === "part4" && !state.part4.date.trim()) return false;
    return !validationForPart(part).startsWith("请完成");
  }

  function renderCanvas() {
    const config = parts[state.part];
    const canvas = els.canvas;
    canvas.width = config.exportWidth;
    canvas.height = config.exportHeight;
    canvas.style.aspectRatio = `${config.width} / ${config.height}`;
    const context = canvas.getContext("2d");
    context.setTransform(canvas.width / config.width, 0, 0, canvas.height / config.height, 0, 0);
    context.clearRect(0, 0, config.width, config.height);
    context.drawImage(state.backgrounds[state.part], 0, 0, config.width, config.height);
    if (state.part === "part1") drawPart1(context);
    if (state.part === "part2") drawPart2(context);
    if (state.part === "part3") drawPart3(context);
    if (state.part === "part4") drawPart4(context);
  }

  function refreshPart2Editor() {
    const item = state.part2[state.part2Slot];
    els.part2ImageName.textContent = item.imageName || "未选择";
    els.part2Name.value = item.name;
    els.pointsEnabled.checked = item.pointsEnabled;
    els.points.value = item.points;
    els.points.disabled = !item.pointsEnabled;
    els.yuanEnabled.checked = item.yuanEnabled;
    els.yuan.value = item.yuan;
    els.yuan.disabled = !item.yuanEnabled;
    Array.from(els.part2Slots.children).forEach((button, index) => button.classList.toggle("active", index === state.part2Slot));
  }

  function refreshPart3Editor() {
    const item = state.part3[state.part3Slot];
    els.part3ImageName.textContent = item.imageName || "未选择";
    els.part3Name.value = item.name;
    Array.from(els.part3Slots.children).forEach((button, index) => button.classList.toggle("active", index === state.part3Slot));
  }

  function refreshPart4Editor() {
    const item = state.part4.items[state.part4Slot];
    els.part4ImageName.textContent = item.imageName || "未选择";
    els.part4Name.value = item.name;
    els.part4PointsEnabled.checked = item.pointsEnabled;
    els.part4Points.value = item.points;
    els.part4Points.disabled = !item.pointsEnabled;
    els.part4YuanEnabled.checked = item.yuanEnabled;
    els.part4Yuan.value = item.yuan;
    els.part4Yuan.disabled = !item.yuanEnabled;
    Array.from(els.part4Slots.children).forEach((button, index) => button.classList.toggle("active", index === state.part4Slot));
  }

  function render() {
    const config = parts[state.part];
    els.partTitle.textContent = config.title;
    els.part1Panel.hidden = state.part !== "part1";
    els.part2Panel.hidden = state.part !== "part2";
    els.part3Panel.hidden = state.part !== "part3";
    els.part4Panel.hidden = state.part !== "part4";
    els.partButtons.forEach((button) => button.classList.toggle("active", button.dataset.ecommercePart === state.part));
    if (state.part === "part2") refreshPart2Editor();
    if (state.part === "part3") refreshPart3Editor();
    if (state.part === "part4") refreshPart4Editor();
    const ready = Boolean(state.backgrounds[state.part]);
    const message = ready ? validationForPart() : "正在读取模板底图…";
    const valid = ready && isPartValid();
    els.validation.textContent = message;
    els.validation.classList.toggle("error", !valid);
    els.statusDetail.textContent = valid ? "内容已完整，预览与 3 倍导出一致。" : message;
    els.download.disabled = !valid;
    if (ready) renderCanvas();
  }

  function buildSlotPicker(container, count, onSelect) {
    for (let index = 0; index < count; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(index + 1);
      button.setAttribute("aria-label", `坑位 ${index + 1}`);
      button.addEventListener("click", () => onSelect(index));
      container.appendChild(button);
    }
  }

  function updateAndRender(item, key, value) {
    item[key] = value;
    render();
  }

  function bindEvents() {
    els.partButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.part = button.dataset.ecommercePart;
        render();
      });
    });

    els.date.addEventListener("input", () => {
      state.part1.date = els.date.value;
      render();
    });
    els.copy.addEventListener("input", () => {
      state.part1.copy = els.copy.value;
      render();
    });
    els.part4Date.addEventListener("input", () => {
      state.part4.date = els.part4Date.value;
      render();
    });

    els.part2Image.addEventListener("change", async () => {
      try {
        const upload = await readUpload(els.part2Image);
        if (!upload) return;
        const item = state.part2[state.part2Slot];
        Object.assign(item, { imageDataUrl: upload.dataUrl, image: upload.image, imageName: upload.name });
        if (!item.name.trim()) item.name = await recognizeProductName(upload);
        els.part2Image.value = "";
        render();
      } catch (error) {
        els.statusDetail.textContent = `商品图片读取失败：${error.message}`;
      }
    });
    els.part2Name.addEventListener("input", () => updateAndRender(state.part2[state.part2Slot], "name", els.part2Name.value));
    els.points.addEventListener("input", () => updateAndRender(state.part2[state.part2Slot], "points", els.points.value));
    els.yuan.addEventListener("input", () => updateAndRender(state.part2[state.part2Slot], "yuan", els.yuan.value));
    els.pointsEnabled.addEventListener("change", () => {
      const item = state.part2[state.part2Slot];
      if (!els.pointsEnabled.checked && !item.yuanEnabled) els.pointsEnabled.checked = true;
      item.pointsEnabled = els.pointsEnabled.checked;
      render();
    });
    els.yuanEnabled.addEventListener("change", () => {
      const item = state.part2[state.part2Slot];
      if (!els.yuanEnabled.checked && !item.pointsEnabled) els.yuanEnabled.checked = true;
      item.yuanEnabled = els.yuanEnabled.checked;
      render();
    });

    els.part3Image.addEventListener("change", async () => {
      try {
        const upload = await readUpload(els.part3Image);
        if (!upload) return;
        const item = state.part3[state.part3Slot];
        Object.assign(item, { imageDataUrl: upload.dataUrl, image: upload.image, imageName: upload.name });
        if (!item.name.trim()) item.name = await recognizeProductName(upload);
        els.part3Image.value = "";
        render();
      } catch (error) {
        els.statusDetail.textContent = `商品图片读取失败：${error.message}`;
      }
    });
    els.part3Name.addEventListener("input", () => updateAndRender(state.part3[state.part3Slot], "name", els.part3Name.value));

    els.part4Image.addEventListener("change", async () => {
      try {
        const upload = await readUpload(els.part4Image);
        if (!upload) return;
        const item = state.part4.items[state.part4Slot];
        Object.assign(item, { imageDataUrl: upload.dataUrl, image: upload.image, imageName: upload.name });
        if (!item.name.trim()) item.name = await recognizeProductName(upload);
        els.part4Image.value = "";
        render();
      } catch (error) {
        els.statusDetail.textContent = `商品图片读取失败：${error.message}`;
      }
    });
    els.part4Name.addEventListener("input", () => updateAndRender(state.part4.items[state.part4Slot], "name", els.part4Name.value));
    els.part4Points.addEventListener("input", () => updateAndRender(state.part4.items[state.part4Slot], "points", els.part4Points.value));
    els.part4Yuan.addEventListener("input", () => updateAndRender(state.part4.items[state.part4Slot], "yuan", els.part4Yuan.value));
    els.part4PointsEnabled.addEventListener("change", () => {
      const item = state.part4.items[state.part4Slot];
      if (!els.part4PointsEnabled.checked && !item.yuanEnabled) els.part4PointsEnabled.checked = true;
      item.pointsEnabled = els.part4PointsEnabled.checked;
      render();
    });
    els.part4YuanEnabled.addEventListener("change", () => {
      const item = state.part4.items[state.part4Slot];
      if (!els.part4YuanEnabled.checked && !item.pointsEnabled) els.part4YuanEnabled.checked = true;
      item.yuanEnabled = els.part4YuanEnabled.checked;
      render();
    });

    els.download.addEventListener("click", () => {
      if (!isPartValid()) return;
      els.canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `电商会员日-${parts[state.part].title}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
      }, "image/png");
    });
  }

  async function initialize() {
    els.date.value = state.part1.date;
    els.copy.value = state.part1.copy;
    els.part4Date.value = state.part4.date;
    buildSlotPicker(els.part2Slots, 6, (index) => {
      state.part2Slot = index;
      refreshPart2Editor();
    });
    buildSlotPicker(els.part3Slots, 5, (index) => {
      state.part3Slot = index;
      refreshPart3Editor();
    });
    buildSlotPicker(els.part4Slots, 6, (index) => {
      state.part4Slot = index;
      refreshPart4Editor();
    });
    bindEvents();
    render();
    try {
      const assets = window.ECOMMERCE_ASSETS || {};
      const [part1, part2, part3, part4] = await Promise.all([
        loadImage(assets.part1),
        loadImage(assets.part2),
        loadImage(assets.part3),
        loadImage(assets.part4),
      ]);
      state.backgrounds = { part1, part2, part3, part4 };
      await document.fonts?.ready;
      render();
    } catch (error) {
      els.statusDetail.textContent = `底图读取失败：${error.message}`;
      els.download.disabled = true;
    }
  }

  initialize();
})();
