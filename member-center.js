(() => {
  const page = document.querySelector("#memberCenterPage");
  if (!page) return;

  const WIDTH = 375;
  const HEIGHT = 469.538;
  const fontFamily = '"SourceHanSansCN", "PingFang SC", sans-serif';
  const motoyaFamily = '"MotoyaCedarW6", "Arial Black", sans-serif';
  const inviteRewardBoxes = [79, 192, 301];
  const inviteTextLefts = [31, 143, 252];
  const taskCenters = [57, 109, 161, 213, 265, 317];
  const productModules = {
    2: { height: 436.975, imageY: [95, 264], textY: [197, 366] },
    3: { height: 456.933, imageY: [92, 267], textY: [194, 369] },
    4: { height: 411.765, count: 3 },
    5: { height: 375, count: 2 },
    6: { width: 231, height: 200 },
  };
  const productImageX = [41, 156, 271];
  const productTextCenters = [74, 189, 304];

  const invites = [
    { copy: "邀请\n1人得", limit: "每个ID限8次", pointsMode: false, points: "20", image: null, imageDataUrl: "", imageName: "" },
    { copy: "邀请\n5人得", limit: "每个ID限1次", pointsMode: false, points: "20", image: null, imageDataUrl: "", imageName: "" },
    { copy: "邀请\n10人得", limit: "每个ID限1次", pointsMode: false, points: "20", image: null, imageDataUrl: "", imageName: "" },
  ];

  const tasks = [
    { copy: "首次入会\n+30积分", arrow: true },
    { copy: "邀好友入会\n+20积分", arrow: true },
    { copy: "店内购物\n1元=1积分", arrow: false },
    { copy: "5星晒图\n+50积分", arrow: true },
    { copy: "关注卡游\n+5积分", arrow: true },
    { copy: "每日签到\n+1积分", arrow: true },
  ];

  const products = {
    2: Array.from({ length: 6 }, () => ({ name: "", points: "199", image: null, imageDataUrl: "", imageName: "" })),
    3: Array.from({ length: 6 }, () => ({ name: "", points: "199", image: null, imageDataUrl: "", imageName: "" })),
    4: Array.from({ length: 3 }, () => ({ name: "", points: "", image: null, imageDataUrl: "", imageName: "" })),
    5: Array.from({ length: 2 }, () => ({ name: "", points: "", buttonText: "立即领取", image: null, imageDataUrl: "", imageName: "" })),
  };

  const state = {
    module: 1,
    productSlot: 0,
    sixStyle: 1,
    inviteSlot: 0,
    taskSlot: 0,
    reviewLine1: "评价1次得",
    reviewLine2: "50积分",
    backgrounds: {},
    chevron: null,
  };

  const moduleSix = {
    1: { copy: "单笔实付\n满99元赠", third: "随机橡皮人偶", title: "12月会员满赠", image: null, imageDataUrl: "", imageName: "" },
    2: { copy: "", third: "", title: "转盘抽奖赢好礼", image: null, imageDataUrl: "", imageName: "" },
  };

  const els = {
    canvas: page.querySelector("#memberCenterPreview"),
    title: page.querySelector("#memberCenterTitle"),
    moduleButtons: page.querySelectorAll("[data-member-module]"),
    moduleOneEditors: page.querySelectorAll('[data-member-editor="1"]'),
    productEditor: page.querySelector('[data-member-editor="products"]'),
    inviteSlots: page.querySelector("#memberInviteSlots"),
    inviteCopy: page.querySelector("#memberInviteCopy"),
    inviteLimit: page.querySelector("#memberInviteLimit"),
    pointsMode: page.querySelector("#memberInvitePointsMode"),
    imageField: page.querySelector("#memberInviteImageField"),
    imageInput: page.querySelector("#memberInviteImage"),
    imageName: page.querySelector("#memberInviteImageName"),
    pointsField: page.querySelector("#memberInvitePointsField"),
    points: page.querySelector("#memberInvitePoints"),
    reviewLine1: page.querySelector("#memberReviewLine1"),
    reviewLine2: page.querySelector("#memberReviewLine2"),
    taskSlots: page.querySelector("#memberTaskSlots"),
    taskCopy: page.querySelector("#memberTaskCopy"),
    taskArrow: page.querySelector("#memberTaskArrow"),
    productSlots: page.querySelector("#memberProductSlots"),
    productImage: page.querySelector("#memberProductImage"),
    productImageName: page.querySelector("#memberProductImageName"),
    productName: page.querySelector("#memberProductName"),
    productNameField: page.querySelector("#memberProductNameField"),
    productPoints: page.querySelector("#memberProductPoints"),
    productPointsField: page.querySelector("#memberProductPointsField"),
    productButtonField: page.querySelector("#memberProductButtonField"),
    productButtonText: page.querySelector("#memberProductButtonText"),
    sixEditors: page.querySelectorAll('[data-member-editor="6"]'),
    sixStyleToggle: page.querySelector("#memberSixStyleToggle"),
    sixImage: page.querySelector("#memberSixImage"),
    sixImageName: page.querySelector("#memberSixImageName"),
    sixCopyField: page.querySelector("#memberSixCopyField"),
    sixCopy: page.querySelector("#memberSixCopy"),
    sixThirdField: page.querySelector("#memberSixThirdField"),
    sixThird: page.querySelector("#memberSixThird"),
    sixTitle: page.querySelector("#memberSixTitle"),
    validation: page.querySelector("#memberCenterValidation"),
    status: page.querySelector("#memberCenterStatus"),
    download: page.querySelector("#downloadMemberCenter"),
  };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("素材读取失败"));
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
          resolve({ dataUrl, image: await loadImage(dataUrl), name: file.name });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("图片读取失败"));
      reader.readAsDataURL(file);
    });
  }

  function splitInput(value, count) {
    const lines = String(value || "").replace(/\r/g, "").split("\n");
    while (lines.length < count) lines.push("");
    return lines.slice(0, count);
  }

  function drawContain(context, image, x, y, width, height) {
    if (!image?.naturalWidth || !image?.naturalHeight) return;
    const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  function clippedText(context, text, x, y, width, options = {}) {
    const { size = 9, weight = 400, color = "#000", align = "center" } = options;
    const clipX = align === "left" ? x : align === "right" ? x - width : x - width / 2;
    context.save();
    context.beginPath();
    context.rect(clipX, y - size, width, size * 1.5);
    context.clip();
    context.font = `${weight} ${size}px ${fontFamily}`;
    context.fillStyle = color;
    context.textAlign = align;
    context.textBaseline = "middle";
    context.fillText(text, x, y);
    context.restore();
  }

  function drawInvite(context, item, index) {
    const [line1, line2] = splitInput(item.copy, 2);
    const textLeft = inviteTextLefts[index];
    const rewardX = inviteRewardBoxes[index];
    const visibleLine1 = Array.from(line1).slice(0, 4).join("");
    const visibleLine2 = Array.from(line2).slice(0, 4).join("");

    context.save();
    context.fillStyle = "#fff";
    context.font = `700 14px ${fontFamily}`;
    const underlineWidth = Math.min(49, Math.max(17, context.measureText(visibleLine2).width + 4));
    context.fillRect(textLeft - 2, 160, underlineWidth, 5);
    context.beginPath();
    context.rect(textLeft, 132, 49, 37);
    context.clip();
    context.fillStyle = "#bd5e00";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(visibleLine1, textLeft, 140);
    context.fillText(visibleLine2, textLeft, 158);
    context.restore();

    clippedText(context, item.limit, textLeft, 187, 49, { size: 7.5, weight: 400, align: "left" });

    if (item.pointsMode) {
      const points = Array.from(item.points).slice(0, 3).join("");
      clippedText(context, points, rewardX + 23, 151, 46, { size: 32, weight: 700 });
      clippedText(context, "积分", rewardX + 23, 172, 46, { size: 13, weight: 700 });
    } else if (item.image) {
      drawContain(context, item.image, rewardX, 130, 46, 64);
    } else {
      context.save();
      context.strokeStyle = "#d0a900";
      context.lineWidth = 1;
      context.setLineDash([3, 3]);
      context.strokeRect(rewardX + 1, 131, 44, 62);
      context.fillStyle = "#9b7b00";
      context.font = `700 12px ${fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(String(index + 1), rewardX + 23, 162);
      context.restore();
    }
  }

  function drawReview(context) {
    const match = state.reviewLine2.match(/^\s*([0-9.]+)(.*)$/);
    if (match) {
      context.save();
      context.fillStyle = "#000";
      context.textAlign = "left";
      context.textBaseline = "middle";
      context.font = `700 56px ${motoyaFamily}`;
      const numberLeft = 112;
      const numberText = match[1];
      const numberWidth = context.measureText(numberText).width;
      const copyLeft = numberLeft + numberWidth + 7;
      context.fillText(numberText, numberLeft, 291);
      context.fillStyle = "#999";
      context.font = `700 12px ${fontFamily}`;
      context.fillText(state.reviewLine1, copyLeft, 284);
      context.fillStyle = "#000";
      context.font = `700 18px ${fontFamily}`;
      context.fillText(match[2] || "积分", copyLeft, 302);
      context.restore();
    } else {
      clippedText(context, state.reviewLine2, 160, 297, 105, { size: 24, weight: 700 });
    }
  }

  function roundRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
  }

  function drawTask(context, task, index) {
    const [line1, line2] = splitInput(task.copy, 2);
    const center = taskCenters[index];
    clippedText(context, line1, center, 421, 46, { size: 9, weight: 700 });

    context.save();
    roundRect(context, center - 23, 430, 46, 13, 6.5);
    context.fillStyle = "#ffd600";
    context.fill();
    context.beginPath();
    context.rect(center - 22, 430, 44, 13);
    context.clip();
    context.font = `500 7px ${fontFamily}`;
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    const arrowSpace = task.arrow ? 5 : 0;
    context.fillText(line2, center - arrowSpace / 2, 436.5);
    if (task.arrow && state.chevron) context.drawImage(state.chevron, center + 14, 431, 6.75, 11);
    context.restore();
  }

  function fittedFontSize(context, text, maxWidth, maxSize, minSize, family, weight = 700) {
    let size = maxSize;
    while (size > minSize) {
      context.font = `${weight} ${size}px ${family}`;
      if (context.measureText(text).width <= maxWidth) break;
      size -= 0.25;
    }
    return size;
  }

  function drawProduct(context, item, index, config) {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const imageX = productImageX[column];
    const imageY = config.imageY[row];
    const centerX = productTextCenters[column];
    const textTop = config.textY[row];

    if (item.image) {
      drawContain(context, item.image, imageX, imageY, 64, 90);
    } else {
      context.save();
      context.strokeStyle = "#b58a00";
      context.lineWidth = 1;
      context.setLineDash([3, 3]);
      context.strokeRect(imageX + 1, imageY + 1, 62, 88);
      context.fillStyle = "#9b7400";
      context.font = `700 13px ${fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(String(index + 1), imageX + 32, imageY + 45);
      context.restore();
    }

    context.save();
    context.beginPath();
    context.rect(centerX - 43, textTop, 86, 30);
    context.clip();
    context.fillStyle = "#ffd600";
    context.textAlign = "center";
    context.textBaseline = "middle";

    const name = String(item.name || "").replace(/[\r\n]+/g, " ");
    const nameSize = fittedFontSize(context, name, 82, 9.5, 5, fontFamily);
    context.font = `700 ${nameSize}px ${fontFamily}`;
    context.fillText(name, centerX, textTop + 7.5);

    const points = String(item.points || "");
    let numberSize = 14;
    context.font = `700 10px ${fontFamily}`;
    const unitWidth = context.measureText("积分").width;
    while (numberSize > 6) {
      context.font = `700 ${numberSize}px ${motoyaFamily}`;
      if (context.measureText(points).width + 1 + unitWidth <= 86) break;
      numberSize -= 0.25;
    }
    context.font = `700 ${numberSize}px ${motoyaFamily}`;
    const numberWidth = context.measureText(points).width;
    const totalWidth = numberWidth + 1 + unitWidth;
    const priceLeft = centerX - totalWidth / 2;
    context.textAlign = "left";
    context.fillText(points, priceLeft, textTop + 21.5);
    context.font = `700 10px ${fontFamily}`;
    context.fillText("积分", priceLeft + numberWidth + 1, textTop + 22.5);
    context.restore();
  }

  function drawModuleFourProduct(context, item, index) {
    const imageX = [49, 145, 241][index];
    const centerX = [92, 188, 284][index];
    if (item.image) {
      drawContain(context, item.image, imageX, 116, 86, 86);
    } else {
      context.save();
      context.strokeStyle = "#b58a00";
      context.lineWidth = 1;
      context.setLineDash([3, 3]);
      context.strokeRect(imageX + 1, 117, 84, 84);
      context.fillStyle = "#9b7400";
      context.font = `700 13px ${fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(String(index + 1), centerX, 159);
      context.restore();
    }

    const name = String(item.name || "").replace(/[\r\n]+/g, " ");
    context.save();
    context.beginPath();
    context.rect(centerX - 43, 208, 86, 13);
    context.clip();
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    const nameSize = fittedFontSize(context, name, 86, 9.5, 5, fontFamily, 600);
    context.font = `600 ${nameSize}px ${fontFamily}`;
    context.fillText(name, centerX, 214.5);
    context.restore();
  }

  function drawModuleFiveProduct(context, item, index) {
    const imageX = [45.5, 206.5][index];
    const buttonCenterX = [104.5, 267.5][index];
    if (item.image) {
      drawContain(context, item.image, imageX, 115.5, 40, 56.47);
    } else {
      context.save();
      context.strokeStyle = "#8f7900";
      context.lineWidth = 0.75;
      context.setLineDash([2.5, 2.5]);
      context.strokeRect(imageX + 0.5, 116, 39, 55.47);
      context.fillStyle = "#756400";
      context.font = `700 11px ${fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(String(index + 1), imageX + 20, 143.75);
      context.restore();
    }

    const buttonText = String(item.buttonText || "");
    context.save();
    context.font = `500 12px ${fontFamily}`;
    const buttonWidth = Math.min(140, Math.max(40, context.measureText(buttonText).width + 20));
    roundRect(context, buttonCenterX - buttonWidth / 2, 187, buttonWidth, 21, 10.5);
    context.fillStyle = "#000";
    context.fill();
    context.beginPath();
    context.rect(buttonCenterX - buttonWidth / 2 + 10, 187, buttonWidth - 20, 21);
    context.clip();
    context.fillStyle = "#fff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(buttonText, buttonCenterX, 197.5);
    context.restore();
  }

  function drawModuleSix(context) {
    const item = moduleSix[state.sixStyle];
    const imageX = 13;
    const imageWidth = state.sixStyle === 1 ? 93 : 205;
    const imageHeight = state.sixStyle === 1 ? 132 : 133;
    if (item.image) {
      drawContain(context, item.image, imageX, 13, imageWidth, imageHeight);
    } else {
      context.save();
      context.strokeStyle = "#b28b00";
      context.lineWidth = 1;
      context.setLineDash([3, 3]);
      context.strokeRect(imageX + 0.5, 13.5, imageWidth - 1, imageHeight - 1);
      context.fillStyle = "#8a6c00";
      context.font = `700 13px ${fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("图片", imageX + imageWidth / 2, 13 + imageHeight / 2);
      context.restore();
    }

    if (state.sixStyle === 1) {
      const [line1, line2] = splitInput(item.copy, 2);
      context.save();
      context.beginPath();
      context.rect(108, 13, 108, 132);
      context.clip();
      context.fillStyle = "#000";
      context.textAlign = "right";
      context.textBaseline = "middle";
      [line1, line2].forEach((line, index) => {
        const size = fittedFontSize(context, line, 108, 22, 8, fontFamily, 600);
        context.font = `600 ${size}px ${fontFamily}`;
        context.fillText(line, 216, index === 0 ? 52.5 : 81.5);
      });

      const thirdSize = fittedFontSize(context, item.third, 108, 18, 7, fontFamily, 500);
      context.font = `500 ${thirdSize}px ${fontFamily}`;
      context.lineWidth = 3;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.strokeStyle = "#fff";
      context.strokeText(item.third, 216, 108.5);
      context.fillText(item.third, 216, 108.5);
      context.restore();
    }

    context.save();
    context.beginPath();
    context.rect(13, 159, 174, 35);
    context.clip();
    context.fillStyle = "#000";
    context.textAlign = "left";
    context.textBaseline = "middle";
    const titleSize = fittedFontSize(context, item.title, 174, 24, 9, fontFamily, 600);
    context.font = `600 ${titleSize}px ${fontFamily}`;
    context.fillText(item.title, 13, 176.5);
    context.restore();
  }

  function currentWidth() {
    return state.module === 6 ? 231 : WIDTH;
  }

  function currentHeight() {
    return state.module === 1 ? HEIGHT : productModules[state.module].height;
  }

  function currentBackground() {
    return state.module === 6 ? state.backgrounds[`6-${state.sixStyle}`] : state.backgrounds[state.module];
  }

  function renderToCanvas(canvas, pixelWidth) {
    const background = currentBackground();
    if (!background) return;
    const width = currentWidth();
    const height = currentHeight();
    const scale = pixelWidth / width;
    canvas.width = pixelWidth;
    canvas.height = Math.round(height * scale);
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, width, height);
    context.drawImage(background, 0, 0, width, height);
    if (state.module === 1) {
      invites.forEach((item, index) => drawInvite(context, item, index));
      drawReview(context);
      tasks.forEach((task, index) => drawTask(context, task, index));
    } else if (state.module === 4) {
      products[4].forEach((item, index) => drawModuleFourProduct(context, item, index));
    } else if (state.module === 5) {
      products[5].forEach((item, index) => drawModuleFiveProduct(context, item, index));
    } else if (state.module === 6) {
      drawModuleSix(context);
    } else {
      products[state.module].forEach((item, index) => drawProduct(context, item, index, productModules[state.module]));
    }
  }

  function renderCanvas() {
    renderToCanvas(els.canvas, 750);
  }

  function validationMessage() {
    if (state.module === 6) {
      return moduleSix[state.sixStyle].image ? "内容已完整，可下载 PNG。" : "请上传商品图片。";
    }
    if (state.module !== 1) {
      const missing = products[state.module]
        .map((item, index) => {
          const incomplete = state.module === 5 ? !item.image : !item.image || !item.name.trim();
          return incomplete ? index + 1 : null;
        })
        .filter(Boolean);
      const requirement = state.module === 5 ? "图片" : "图片和名称";
      return missing.length ? `请完善商品坑位 ${missing.join("、")} 的${requirement}。` : "内容已完整，可下载 PNG。";
    }
    const missing = invites
      .map((item, index) => (!item.pointsMode && !item.image ? index + 1 : null))
      .filter(Boolean);
    return missing.length ? `请上传邀请奖励坑位 ${missing.join("、")} 的商品图片，或切换为积分。` : "内容已完整，可下载 PNG。";
  }

  function render() {
    const isModuleOne = state.module === 1;
    const isProductModule = state.module >= 2 && state.module <= 5;
    els.moduleOneEditors.forEach((panel) => { panel.hidden = !isModuleOne; });
    els.productEditor.hidden = !isProductModule;
    els.sixEditors.forEach((panel) => { panel.hidden = state.module !== 6; });
    els.title.textContent = `模块 ${state.module}`;
    els.canvas.setAttribute("aria-label", `电商会员中心模块 ${state.module} 预览`);
    els.moduleButtons.forEach((button) => button.classList.toggle("active", Number(button.dataset.memberModule) === state.module));

    if (isModuleOne) {
      const invite = invites[state.inviteSlot];
      els.inviteCopy.value = invite.copy;
      els.inviteLimit.value = invite.limit;
      els.pointsMode.checked = invite.pointsMode;
      els.imageField.hidden = invite.pointsMode;
      els.pointsField.hidden = !invite.pointsMode;
      els.imageName.textContent = invite.imageName || "未选择";
      els.points.value = invite.points;
      Array.from(els.inviteSlots.children).forEach((button, index) => button.classList.toggle("active", index === state.inviteSlot));

      const task = tasks[state.taskSlot];
      els.taskCopy.value = task.copy;
      els.taskArrow.checked = task.arrow;
      Array.from(els.taskSlots.children).forEach((button, index) => button.classList.toggle("active", index === state.taskSlot));
    } else if (state.module === 6) {
      const item = moduleSix[state.sixStyle];
      els.sixStyleToggle.checked = state.sixStyle === 2;
      els.sixImageName.textContent = item.imageName || "未选择";
      els.sixCopy.value = item.copy;
      els.sixThird.value = item.third;
      els.sixTitle.value = item.title;
      els.sixCopyField.hidden = state.sixStyle !== 1;
      els.sixThirdField.hidden = state.sixStyle !== 1;
    } else {
      const product = products[state.module][state.productSlot];
      els.productImageName.textContent = product.imageName || "未选择";
      els.productName.value = product.name;
      els.productPoints.value = product.points;
      els.productButtonText.value = product.buttonText || "立即领取";
      els.productNameField.hidden = state.module === 5;
      els.productPointsField.hidden = state.module === 4 || state.module === 5;
      els.productButtonField.hidden = state.module !== 5;
      Array.from(els.productSlots.children).forEach((button, index) => {
        button.hidden = index >= products[state.module].length;
        button.classList.toggle("active", index === state.productSlot);
      });
    }

    const hasBackground = Boolean(currentBackground());
    const message = hasBackground ? validationMessage() : "正在读取模板底图…";
    const valid = hasBackground && !message.startsWith("请");
    els.validation.textContent = message;
    els.validation.classList.toggle("error", !valid);
    const exportWidth = state.module === 6 ? 231 : state.module === 5 ? 726 : 714;
    els.status.textContent = valid ? `模块 ${state.module} 内容已完整，可导出 ${exportWidth}px 宽 PNG。` : message;
    els.download.disabled = !valid;
    renderCanvas();
  }

  function buildPicker(container, count, onSelect) {
    for (let index = 0; index < count; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(index + 1);
      button.setAttribute("aria-label", `坑位 ${index + 1}`);
      button.addEventListener("click", () => onSelect(index));
      container.appendChild(button);
    }
  }

  function downloadPng() {
    if (els.download.disabled) return;
    const width = state.module === 6 ? 231 : state.module === 5 ? 726 : 714;
    const output = document.createElement("canvas");
    renderToCanvas(output, width);
    output.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      const styleSuffix = state.module === 6 ? `-样式${state.sixStyle}` : "";
      link.download = `电商会员中心-模块${state.module}${styleSuffix}-${width}px.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    }, "image/png");
  }

  function bindEvents() {
    els.moduleButtons.forEach((button) => button.addEventListener("click", () => {
      state.module = Number(button.dataset.memberModule);
      state.productSlot = 0;
      render();
    }));
    els.sixStyleToggle.addEventListener("change", () => {
      state.sixStyle = els.sixStyleToggle.checked ? 2 : 1;
      render();
    });
    els.inviteCopy.addEventListener("input", () => { invites[state.inviteSlot].copy = els.inviteCopy.value; renderCanvas(); });
    els.inviteLimit.addEventListener("input", () => { invites[state.inviteSlot].limit = els.inviteLimit.value; renderCanvas(); });
    els.pointsMode.addEventListener("change", () => { invites[state.inviteSlot].pointsMode = els.pointsMode.checked; render(); });
    els.points.addEventListener("input", () => { invites[state.inviteSlot].points = els.points.value; renderCanvas(); });
    els.imageInput.addEventListener("change", async () => {
      try {
        const upload = await readUpload(els.imageInput);
        if (!upload) return;
        Object.assign(invites[state.inviteSlot], { image: upload.image, imageDataUrl: upload.dataUrl, imageName: upload.name });
        els.imageInput.value = "";
        render();
      } catch (error) {
        els.status.textContent = `奖品图片读取失败：${error.message}`;
      }
    });
    els.reviewLine1.addEventListener("input", () => { state.reviewLine1 = els.reviewLine1.value; renderCanvas(); });
    els.reviewLine2.addEventListener("input", () => { state.reviewLine2 = els.reviewLine2.value; renderCanvas(); });
    els.taskCopy.addEventListener("input", () => { tasks[state.taskSlot].copy = els.taskCopy.value; renderCanvas(); });
    els.taskArrow.addEventListener("change", () => { tasks[state.taskSlot].arrow = els.taskArrow.checked; renderCanvas(); });
    els.productName.addEventListener("input", () => { products[state.module][state.productSlot].name = els.productName.value; render(); });
    els.productPoints.addEventListener("input", () => { products[state.module][state.productSlot].points = els.productPoints.value; renderCanvas(); });
    els.productButtonText.addEventListener("input", () => {
      products[state.module][state.productSlot].buttonText = els.productButtonText.value;
      renderCanvas();
    });
    els.sixCopy.addEventListener("input", () => { moduleSix[state.sixStyle].copy = els.sixCopy.value; renderCanvas(); });
    els.sixThird.addEventListener("input", () => { moduleSix[state.sixStyle].third = els.sixThird.value; renderCanvas(); });
    els.sixTitle.addEventListener("input", () => { moduleSix[state.sixStyle].title = els.sixTitle.value; renderCanvas(); });
    els.sixImage.addEventListener("change", async () => {
      try {
        const upload = await readUpload(els.sixImage);
        if (!upload) return;
        Object.assign(moduleSix[state.sixStyle], { image: upload.image, imageDataUrl: upload.dataUrl, imageName: upload.name });
        els.sixImage.value = "";
        render();
      } catch (error) {
        els.status.textContent = `商品图片读取失败：${error.message}`;
      }
    });
    els.productImage.addEventListener("change", async () => {
      try {
        const upload = await readUpload(els.productImage);
        if (!upload) return;
        const productName = upload.name.replace(/\.[^.]+$/, "");
        Object.assign(products[state.module][state.productSlot], {
          image: upload.image,
          imageDataUrl: upload.dataUrl,
          imageName: upload.name,
          name: productName,
        });
        els.productImage.value = "";
        render();
      } catch (error) {
        els.status.textContent = `商品图片读取失败：${error.message}`;
      }
    });
    els.download.addEventListener("click", downloadPng);
  }

  async function initialize() {
    buildPicker(els.inviteSlots, 3, (index) => { state.inviteSlot = index; render(); });
    buildPicker(els.taskSlots, 6, (index) => { state.taskSlot = index; render(); });
    buildPicker(els.productSlots, 6, (index) => { state.productSlot = index; render(); });
    bindEvents();
    render();
    try {
      const assets = window.MEMBER_CENTER_ASSETS || {};
      const productAssets = window.MEMBER_CENTER_PRODUCT_ASSETS || {};
      [state.backgrounds[1], state.backgrounds[2], state.backgrounds[3], state.backgrounds[4], state.backgrounds[5], state.backgrounds["6-1"], state.backgrounds["6-2"], state.chevron] = await Promise.all([
        loadImage(assets.background),
        loadImage(productAssets.module2),
        loadImage(productAssets.module3),
        loadImage(productAssets.module4),
        loadImage(productAssets.module5),
        loadImage(productAssets.module61),
        loadImage(productAssets.module62),
        loadImage(assets.chevron),
      ]);
      await Promise.all([
        document.fonts.load(`700 14px ${fontFamily}`),
        document.fonts.load(`700 56px ${motoyaFamily}`),
      ]);
      render();
    } catch (error) {
      els.validation.textContent = `模板素材读取失败：${error.message}`;
      els.validation.classList.add("error");
      els.status.textContent = "模板素材读取失败";
    }
  }

  initialize();
})();
