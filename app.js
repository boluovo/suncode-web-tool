const FIXED_SUNCODE_BASE64 =
  "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1" +
  "LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEu" +
  "MSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3" +
  "LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNjM2IDYzNiIgc3R5bGU9ImVuYWJsZS1i" +
  "YWNrZ3JvdW5kOm5ldyAwIDAgNjM2IDYzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJ" +
  "LnN0MHtmaWxsOiNGRkZGRkY7fQoJLnN0MXtmaWxsOiNGRkQ2MDA7fQoJLnN0MntmaWxsOiMyMjIyMjI7c3Ryb2tlOiMyMjIyMjI7" +
  "c3Ryb2tlLXdpZHRoOjEuNjt9Cgkuc3Qze2ZpbGw6IzIyMjIyMjt9Cgkuc3Q0e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTt9Cgku" +
  "c3Q1e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTt9Cjwvc3R5bGU+CjxnPgoJPGc+CgkJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0i" +
  "MzE4IiBjeT0iMzE4IiByPSIxMDIuNSIvPgoJCTxnPgoJCQk8Zz4KCQkJCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjMxOCIgY3k9" +
  "IjMxOCIgcj0iOTcuNSIvPgoJCQkJPGc+CgkJCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMxOCwyNDQuN0MzMTgsMjQ0LjcsMzE4" +
  "LDI0NC43LDMxOCwyNDQuN2MwLjEsMCwwLjEsMCwwLjEsMEgzMTh6Ii8+CgkJCQkJPGc+CgkJCQkJCTxwYXRoIGNsYXNzPSJzdDMi" +
  "IGQ9Ik0zNzUuOSwyOTguM3YtMi4xbC0xLjQsMS41Yy05LjgsMTAuNS0yNC4yLDIxLjUtNDAuNywzMS4xYy0xNi43LDkuNi0zMy43" +
  "LDE2LjctNDcuOCwxOS45bC0xLjgsMC40bDEuNSwxCgkJCQkJCQljOS42LDYuNCwyMC43LDkuOCwzMi4yLDkuOGMzMiwwLDU4LTI2" +
  "LDU4LTU4YzAtMC42LDAtMS4yLTAuMS0xLjhDMzc1LjksMjk5LjUsMzc1LjksMjk4LjksMzc1LjksMjk4LjN6Ii8+CgkJCQkJCTxw" +
  "YXRoIGNsYXNzPSJzdDMiIGQ9Ik0zODIuMywyNjQuOGMtMS42LTIuOC00LjktNC42LTkuOC01LjJjLTQtMC41LTguNy0wLjMtMTQu" +
  "MiwwLjZjLTEwLjktMTAuNS0yNS4yLTE2LjMtNDAuMy0xNi4zCgkJCQkJCQljLTMyLDAtNTcuOSwyNi01Ny45LDU4YzAsNC42LDAu" +
  "Niw5LjIsMS42LDEzLjhjLTMuOCw0LjQtNi41LDguNi04LjIsMTIuNWMtMS45LDQuNC0yLDguMi0wLjQsMTFjMS42LDIuOCw0Ljks" +
  "NC42LDkuOCw1LjIKCQkJCQkJCWMxLjQsMC4yLDIuOSwwLjMsNC42LDAuM2MzLjksMCw4LjMtMC41LDEzLjEtMS42YzE0LjUtMy4x" +
  "LDMxLjktMTAuMiw0OS4xLTIwLjJjMTcuMS05LjgsMzItMjEuMyw0Mi4xLTMyLjUKCQkJCQkJCWM0LjgtNS4yLDguMS0xMC4xLDEw" +
  "LTE0LjZDMzgzLjgsMjcxLjQsMzgzLjksMjY3LjYsMzgyLjMsMjY0Ljh6Ii8+CgkJCQkJPC9nPgoJCQkJPC9nPgoJCQkJPGc+CgkJ" +
  "CQkJPGc+CgkJCQkJCTxnPgoJCQkJCQkJPGRlZnM+CgkJCQkJCQkJPGNpcmNsZSBpZD0iU1ZHSURfMV8iIGN4PSIzMTgiIGN5PSIz" +
  "MTgiIHI9Ijk3LjUiLz4KCQkJCQkJCTwvZGVmcz4KCQkJCQkJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCQkJCQkJCTx1c2Ug" +
  "eGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJCQkJCQk8L2NsaXBQYXRoPgoJCQkJ" +
  "CQkJPGcgY2xhc3M9InN0NCI+CgkJCQkJCQkJPGc+CgkJCQkJCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zMTgsMzUxLjJjMzcu" +
  "OSwwLDcyLjQsMy41LDk3LjQsOS4yYzEyLjUsMi45LDIyLjksNi4zLDMwLjIsMTAuM2MzLjcsMiw2LjgsNC4yLDksNi43CgkJCQkJ" +
  "CQkJCQlzMy44LDUuNSwzLjgsOC45cy0xLjUsNi40LTMuOCw4LjljLTIuMiwyLjUtNS4zLDQuNy05LDYuN2MtNy40LDQtMTcuNyw3" +
  "LjQtMzAuMiwxMC4zYy0yNS4xLDUuNy01OS41LDkuMi05Ny40LDkuMgoJCQkJCQkJCQkJcy03Mi40LTMuNS05Ny40LTkuMmMtMTIu" +
  "NS0yLjktMjIuOS02LjMtMzAuMi0xMC4zYy0zLjctMi02LjgtNC4yLTktNi43cy0zLjgtNS41LTMuOC04LjlzMS41LTYuNCwzLjgt" +
  "OC45CgkJCQkJCQkJCQljMi4yLTIuNSw1LjMtNC43LDktNi43YzcuNC00LDE3LjctNy40LDMwLjItMTAuM0MyNDUuNywzNTQuNywy" +
  "ODAuMSwzNTEuMiwzMTgsMzUxLjJ6Ii8+CgkJCQkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMTgsNDI1LjNjLTM3LjEsMC03" +
  "Mi0zLjMtOTguMy05LjNjLTEzLjUtMy4xLTI0LTYuNy0zMS4yLTEwLjdjLTQuNC0yLjQtNy43LTQuOC0xMC4xLTcuNQoJCQkJCQkJ" +
  "CQkJYy0zLjItMy42LTQuOC03LjUtNC44LTExLjVjMC00LjEsMS43LTguMSw0LjgtMTEuNWMyLjMtMi42LDUuNi01LjEsMTAtNy41" +
  "YzcuNC00LDE3LjktNy42LDMxLjItMTAuNwoJCQkJCQkJCQkJYzI2LjQtNiw2MS4zLTkuMyw5OC4zLTkuM2MzNy4xLDAsNzIsMy4z" +
  "LDk4LjMsOS4zYzEzLjUsMy4xLDI0LDYuNywzMS4yLDEwLjdjNC40LDIuNCw3LjcsNC44LDEwLjEsNy41CgkJCQkJCQkJCQljMy4y" +
  "LDMuNiw0LjgsNy41LDQuOCwxMS41YzAsNC4xLTEuNyw4LjEtNC44LDExLjVjLTIuMywyLjYtNS42LDUuMS0xMCw3LjVjLTcuNCw0" +
  "LTE3LjksNy42LTMxLjIsMTAuNwoJCQkJCQkJCQkJQzM4OS45LDQyMiwzNTUsNDI1LjMsMzE4LDQyNS4zeiBNMzE4LDM1NS4xYy0z" +
  "Ni40LDAtNzAuNywzLjItOTYuNSw5LjFjLTEyLjYsMi45LTIyLjQsNi4zLTI5LjIsOS45CgkJCQkJCQkJCQljLTMuNSwxLjktNi4y" +
  "LDMuOS03LjksNS44Yy0xLjksMi4xLTIuOCw0LjItMi44LDYuM2MwLDIuMSwxLDQuMiwyLjgsNi4zYzEuNywyLDQuNCwzLjksNy45" +
  "LDUuOGM2LjYsMy42LDE2LjUsNywyOS4yLDkuOQoJCQkJCQkJCQkJYzI1LjcsNS45LDYwLDkuMSw5Ni41LDkuMWMzNi40LDAsNzAu" +
  "Ny0zLjIsOTYuNS05LjFjMTIuNi0yLjksMjIuNC02LjMsMjkuMi05LjljMy41LTEuOSw2LjItMy45LDcuOS01LjgKCQkJCQkJCQkJ" +
  "CWMxLjktMi4xLDIuOC00LjIsMi44LTYuM2MwLTIuMS0xLTQuMi0yLjgtNi4zYy0xLjctMi00LjQtMy45LTcuOS01LjhjLTYuNi0z" +
  "LjYtMTYuNS03LTI5LjItOS45CgkJCQkJCQkJCQlDMzg4LjgsMzU4LjMsMzU0LjUsMzU1LjEsMzE4LDM1NS4xeiIvPgoJCQkJCQkJ" +
  "CTwvZz4KCQkJCQkJCTwvZz4KCQkJCQkJPC9nPgoJCQkJCTwvZz4KCQkJCTwvZz4KCQkJCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9" +
  "IjMzMS40IiBjeT0iMjc5LjEiIHI9IjkuNSIvPgoJCQkJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMzEzLjMiIGN5PSIyOTcuMiIg" +
  "cj0iNC44Ii8+CgkJCTwvZz4KCQkJPGc+CgkJCQk8Zz4KCQkJCQk8Zz4KCQkJCQkJPGRlZnM+CgkJCQkJCQk8cmVjdCBpZD0iU1ZH" +
  "SURfM18iIHg9IjI2OS4yIiB5PSIzNjYuOCIgd2lkdGg9Ijk3LjUiIGhlaWdodD0iMjIuOCIvPgoJCQkJCQk8L2RlZnM+CgkJCQkJ" +
  "CTxjbGlwUGF0aCBpZD0iU1ZHSURfNF8iPgoJCQkJCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfM18iICBzdHlsZT0ib3ZlcmZs" +
  "b3c6dmlzaWJsZTsiLz4KCQkJCQkJPC9jbGlwUGF0aD4KCQkJCQkJPGcgY2xhc3M9InN0NSI+CgkJCQkJCQk8Zz4KCQkJCQkJCQk8" +
  "cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjk0LjksMzY2LjhsLTkuNywxOC41bC0xMC4zLTEyLjJ2LTYuNGgtNS43djIyLjhoNS43VjM4" +
  "MWw3LjEsOC41aDYuOGw2LjctMTIuOGw2LjcsMTIuOGg1LjkKCQkJCQkJCQkJbC0xMS45LTIyLjhMMjk0LjksMzY2LjhMMjk0Ljks" +
  "MzY2Ljh6Ii8+CgkJCQkJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMwMi41LDM2Ni44bDgsMTIuMXYxMC43aDUuOHYtMTAuN2wt" +
  "OC0xMi4xSDMwMi41eiIvPgoJCQkJCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMTguMSwzNjYuOGwtMy43LDUuN2wzLDQuNmw2" +
  "LjctMTAuM0wzMTguMSwzNjYuOEwzMTguMSwzNjYuOHoiLz4KCQkJCQkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzYxLDM4MC4z" +
  "YzAsMC41LDAsMS4xLTAuMiwxLjZzLTAuNSwwLjktMC45LDEuM2MtMC45LDAuNy0xLjksMS4xLTMsMS4xcy0xLjEsMC0xLjYtMC4z" +
  "CgkJCQkJCQkJCWMtMC41LTAuMi0xLTAuNS0xLjQtMC44Yy0wLjgtMC43LTEuMi0xLjctMS4yLTIuOXYtMTMuNWgtNS44djEzLjRj" +
  "MCwxLjgsMC40LDMuNCwxLjMsNC45YzAuOCwxLjQsMiwyLjUsMy41LDMuMwoJCQkJCQkJCQlzMy4zLDEuMiw1LjIsMS4xYzEuOCww" +
  "LDMuNS0wLjMsNS4xLTEuMmMxLjUtMC44LDIuNy0xLjksMy42LTMuMmMwLjktMS41LDEuMy0zLjIsMS4yLTQuOXYtMTMuNEgzNjFW" +
  "MzgwLjNMMzYxLDM4MC4zCgkJCQkJCQkJCUwzNjEsMzgwLjN6Ii8+CgkJCQkJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI4Ny42" +
  "LDM2Ni44aC02LjNsLTMuOSw2bDMuNyw0bDYuNi0xMEgyODcuNnoiLz4KCQkJCQkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzMz" +
  "LjEsMzY2LjhjLTYuNCwwLTExLjcsNS4xLTExLjcsMTEuNHMwLDAuMywwLDAuNWg1LjZjMC0wLjEsMC0wLjMsMC0wLjVjMC0zLjMs" +
  "Mi43LTUuOSw2LTUuOQoJCQkJCQkJCQlzNiwyLjYsNiw1LjlzLTIuNyw1LjktNiw1LjlzLTMuMy0wLjctNC40LTEuOGwtMy4yLDQu" +
  "NmMyLDEuNyw0LjcsMi43LDcuNiwyLjdjNi40LDAsMTEuNy01LjEsMTEuNy0xMS40CgkJCQkJCQkJCXMtNS4yLTExLjQtMTEuNy0x" +
  "MS40TDMzMy4xLDM2Ni44eiIvPgoJCQkJCQkJPC9nPgoJCQkJCQk8L2c+CgkJCQkJPC9nPgoJCQkJPC9nPgoJCQk8L2c+CgkJCTxn" +
  "PgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMxOCw0MTUuNmMtNTMuOCwwLTk3LjYtNDMuOC05Ny42LTk3LjZjMC01My44LDQz" +
  "LjgtOTcuNiw5Ny42LTk3LjZjNTMuOCwwLDk3LjYsNDMuOCw5Ny42LDk3LjYKCQkJCQlDNDE1LjYsMzcxLjgsMzcxLjgsNDE1LjYs" +
  "MzE4LDQxNS42eiBNMzE4LDIyMi40Yy01Mi43LDAtOTUuNiw0Mi45LTk1LjYsOTUuNnM0Mi45LDk1LjYsOTUuNiw5NS42czk1LjYt" +
  "NDIuOSw5NS42LTk1LjYKCQkJCQlTMzcwLjcsMjIyLjQsMzE4LDIyMi40eiIvPgoJCQk8L2c+CgkJPC9nPgoJPC9nPgo8L2c+Cjwv" +
  "c3ZnPgo=";

const state = {
  svgText: "",
  svgName: "",
  suncodeSvgText: "",
  viewBox: { x: 0, y: 0, width: 1000, height: 1000 },
};

const els = {
  svgInput: document.querySelector("#svgInput"),
  svgName: document.querySelector("#svgName"),
  downloadJpeg: document.querySelector("#downloadJpeg"),
  openConvertio: document.querySelector("#openConvertio"),
  preview: document.querySelector("#preview"),
  statusTitle: document.querySelector("#statusTitle"),
  statusDetail: document.querySelector("#statusDetail"),
};

function setStatus(title, detail) {
  els.statusTitle.textContent = title;
  els.statusDetail.textContent = detail;
}

function setButtonsEnabled(enabled) {
  els.downloadJpeg.disabled = !enabled;
  els.openConvertio.disabled = !enabled;
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function parseViewBox(svgText) {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;
  const viewBox = svg.getAttribute("viewBox");

  if (viewBox) {
    const values = viewBox.trim().split(/[\s,]+/).map(Number);
    if (values.length === 4 && values.every(Number.isFinite)) {
      return { x: values[0], y: values[1], width: values[2], height: values[3] };
    }
  }

  const width = parseFloat(svg.getAttribute("width")) || 1000;
  const height = parseFloat(svg.getAttribute("height")) || 1000;
  return { x: 0, y: 0, width, height };
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeBase64Utf8(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder("utf-8").decode(bytes);
}

function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function parseClassStyles(svgText) {
  const styles = new Map();
  const styleBlocks = svgText.match(/<style[\s\S]*?<\/style>/gi) || [];

  styleBlocks.forEach((block) => {
    const css = block.replace(/<style[^>]*>/i, "").replace(/<\/style>/i, "");
    const rulePattern = /\.([A-Za-z_][\w-]*)\s*\{([^}]+)\}/g;
    let rule;

    while ((rule = rulePattern.exec(css))) {
      styles.set(rule[1], rule[2].trim().replace(/\s+/g, " "));
    }
  });

  return styles;
}

function inlineClassStyles(svgText) {
  const classStyles = parseClassStyles(svgText);
  const withoutStyleBlocks = svgText.replace(/<style[\s\S]*?<\/style>/gi, "");

  return withoutStyleBlocks.replace(/<([A-Za-z][\w:-]*)([^>]*)\sclass=(["'])([^"']+)\3([^>]*)>/g, (match, tag, before, _quote, classNames, after) => {
    const inlineStyles = classNames
      .trim()
      .split(/\s+/)
      .map((className) => classStyles.get(className))
      .filter(Boolean)
      .join(" ");

    const rawAttrs = `${before}${after}`;
    const selfClosing = /\/\s*$/.test(rawAttrs);
    const attrs = rawAttrs.replace(/\/\s*$/, "");
    const mergedAttrs = attrs.replace(/\sstyle=(["'])([^"']*)\1/, (_styleMatch, quote, existingStyle) => {
      return ` style=${quote}${existingStyle.trim()} ${inlineStyles}${quote}`;
    });

    if (/\sstyle=/.test(mergedAttrs)) {
      return `<${tag}${mergedAttrs}${selfClosing ? "/" : ""}>`;
    }

    return `<${tag}${mergedAttrs} style="${inlineStyles}"${selfClosing ? "/" : ""}>`;
  });
}

function namespaceSvgFragment(svgText, prefix) {
  let namespaced = inlineClassStyles(svgText)
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  namespaced = namespaced
    .replace(/\bid=(["'])([^"']+)\1/g, (_match, quote, id) => `id=${quote}${prefix}-${id}${quote}`)
    .replace(/url\(#([^)]+)\)/g, (_match, id) => `url(#${prefix}-${id})`)
    .replace(/\b(xlink:href|href)=(["'])#([^"']+)\2/g, (_match, attr, quote, id) => `${attr}=${quote}#${prefix}-${id}${quote}`)
    .replace(/\.([A-Za-z_][\w-]*)/g, `.${prefix}-$1`);

  const doc = new DOMParser().parseFromString(namespaced, "image/svg+xml");
  const svg = doc.documentElement;
  const viewBox = svg.getAttribute("viewBox") || "0 0 636 636";
  return { viewBox, content: svg.innerHTML };
}

function buildSuncodeLayer() {
  const { x, y, width, height } = state.viewBox;
  const suncode = namespaceSvgFragment(state.suncodeSvgText, "suncode");

  return `
  <g id="mini-program-suncode" data-layer="top" pointer-events="none">
    <svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${escapeXml(suncode.viewBox)}" preserveAspectRatio="xMidYMid meet" overflow="visible">
      ${suncode.content}
    </svg>
  </g>`;
}

function buildOutputSvg() {
  if (!state.svgText || !state.suncodeSvgText) return "";

  const cleaned = state.svgText.replace(/<g\s+id=["']mini-program-suncode["'][\s\S]*?<\/g>\s*/g, "");
  return cleaned.replace(/<\/svg>\s*$/i, `${buildSuncodeLayer()}\n</svg>`);
}

function renderPreview() {
  if (!state.svgText) {
    els.preview.innerHTML = '<div class="empty-state">SVG 预览会显示在这里</div>';
    setButtonsEnabled(false);
    setStatus("等待文件", "请先选择 SVG 文件。");
    return;
  }

  const outputSvg = buildOutputSvg();
  if (!outputSvg) {
    els.preview.innerHTML = '<div class="empty-state">太阳码加载失败，请刷新后重试</div>';
    setButtonsEnabled(false);
    setStatus("初始化失败", "内置太阳码没有加载成功。");
    return;
  }

  els.preview.innerHTML = outputSvg;
  setButtonsEnabled(true);
  setStatus("可导出", "固定太阳码会等比缩放到 SVG 尺寸，并叠在最上层。");
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

async function renderOutputToCanvas(maxSide) {
  const svg = buildOutputSvg();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  });

  const scale = Math.min(maxSide / Math.max(image.width, image.height), 1) || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);

  return canvas;
}

async function downloadJpeg() {
  const canvas = await renderOutputToCanvas(2000);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${outputBaseName()}.jpg`);
  }, "image/jpeg", 0.92);
}

async function postAiConversion(endpoint) {
  const svg = buildOutputSvg();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: `${outputBaseName()}.svg`,
      fileBase64: encodeBase64Utf8(svg),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.blob();
}

async function downloadAi() {
  els.openConvertio.disabled = true;
  setStatus("正在生成 AI", "正在把完整矢量 SVG 转成 AI 文件。");

  const endpoint = location.hostname.includes("netlify.app")
    ? "/.netlify/functions/convert-ai"
    : "/api/convert-ai";
  const blob = await postAiConversion(endpoint);
  downloadBlob(blob, `${outputBaseName()}.ai`);
  setStatus("AI 已生成", "转换完成，AI 文件已开始下载。");
}

els.svgInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    state.svgText = await readAsText(file);
    state.svgName = file.name;
    state.viewBox = parseViewBox(state.svgText);
    els.svgName.textContent = file.name;
    renderPreview();
  } catch (error) {
    setButtonsEnabled(false);
    setStatus("SVG 读取失败", error.message || "请检查上传文件。");
  }
});

els.downloadJpeg.addEventListener("click", () => {
  downloadJpeg().catch((error) => {
    setStatus("JPEG 导出失败", error.message || "请检查 SVG 是否包含浏览器不支持的内容。");
  });
});

els.openConvertio.addEventListener("click", () => {
  downloadAi()
    .catch((error) => {
      setStatus("AI 导出失败", error.message || "请检查 SVG 文件内容。");
    })
    .finally(() => {
      els.openConvertio.disabled = !state.svgText;
    });
});

setButtonsEnabled(false);
state.suncodeSvgText = decodeBase64Utf8(FIXED_SUNCODE_BASE64);
renderPreview();
