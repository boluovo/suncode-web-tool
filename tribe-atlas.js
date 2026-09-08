(() => {
  const page = document.querySelector("#tribeAtlasPage");
  if (!page) return;

  const WIDTH = 138;
  const HEIGHT = 38;
  const MAX_FONT_SIZE = 22;
  const MAX_TEXT_WIDTH = 116;
  const state = { style: "silver", text: "方寸卡" };
  const backgroundImage = new Image();

  const canvas = page.querySelector("#tribeAtlasPreview");
  const input = page.querySelector("#tribeAtlasText");
  const title = page.querySelector("#tribeAtlasTitle");
  const download = page.querySelector("#downloadTribeAtlas");
  const styleButtons = Array.from(page.querySelectorAll("[data-atlas-style]"));

  function drawBackground(context) {
    if (backgroundImage.complete && backgroundImage.naturalWidth) {
      context.drawImage(backgroundImage, 2, 0, 134, 38);
    }
  }

  function fittedFontSize(context, text) {
    context.font = `800 ${MAX_FONT_SIZE}px FZHanSongTiJF, serif`;
    const measuredWidth = context.measureText(text).width;
    if (measuredWidth <= MAX_TEXT_WIDTH) return MAX_FONT_SIZE;

    return Math.max(1, (MAX_FONT_SIZE * MAX_TEXT_WIDTH) / measuredWidth);
  }

  function draw(target, scale = 1) {
    target.width = Math.round(WIDTH * scale);
    target.height = Math.round(HEIGHT * scale);
    const context = target.getContext("2d");
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, WIDTH, HEIGHT);
    drawBackground(context);

    const text = state.text.trim() || "方寸卡";
    const fontSize = fittedFontSize(context, text);
    context.font = `800 ${fontSize}px FZHanSongTiJF, serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.shadowColor = "#393232";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 2;
    context.shadowBlur = 4;

    // The 188.437deg Figma gradient is nearly vertical with a slight leftward tilt.
    const gradient = context.createLinearGradient(
      WIDTH / 2 + 2,
      7,
      WIDTH / 2 - 2,
      33.7,
    );
    if (state.style === "gold") {
      gradient.addColorStop(0, "#FFEFC9");
      gradient.addColorStop(0.1371, "#FFEFC9");
      gradient.addColorStop(0.8629, "#FFE3A4");
      gradient.addColorStop(1, "#FFE3A4");
    } else {
      gradient.addColorStop(0, "#E4E5E6");
      gradient.addColorStop(0.1371, "#E4E5E6");
      gradient.addColorStop(0.8629, "#CFD0D2");
      gradient.addColorStop(1, "#CFD0D2");
    }
    context.fillStyle = gradient;
    context.save();
    context.translate(WIDTH / 2, 20.35);
    context.transform(1, 0, -0.15, 0.99, 0, 0);
    context.fillText(text, 0, 0);
    context.restore();
  }

  function render() {
    title.textContent = state.style === "gold" ? "金色标签" : "银色标签";
    styleButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.atlasStyle === state.style);
    });
    draw(canvas, 4);
  }

  function downloadPng() {
    const output = document.createElement("canvas");
    draw(output, 1);
    output.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `部落图鉴-${state.style === "gold" ? "金" : "银"}-${state.text.trim() || "方寸卡"}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, "image/png");
  }

  styleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.style = button.dataset.atlasStyle;
      render();
    });
  });

  input.addEventListener("input", () => {
    state.text = input.value;
    render();
  });
  download.addEventListener("click", downloadPng);

  backgroundImage.onload = () => {
    download.disabled = false;
    render();
  };
  backgroundImage.onerror = () => {
    download.disabled = true;
  };
  download.disabled = true;
  backgroundImage.src = "./assets/tribe-atlas-label-bg.svg";
  document.fonts.load("800 22px FZHanSongTiJF").finally(render);
  render();
})();
