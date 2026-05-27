const API_BASE = "https://api.convertio.co";
const MAX_POLLS = 30;
const POLL_INTERVAL_MS = 2000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fromBase64(value) {
  return Buffer.from(value, "base64");
}

function safeFilename(filename) {
  const base = String(filename || "artwork-suncode.png")
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\.[^.]+$/i, "");
  const asciiBase = base
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${asciiBase || "artwork-suncode"}.ai`;
}

function contentDisposition(filename) {
  const fallback = safeFilename(filename);
  const originalBase = String(filename || "artwork-suncode.png").replace(/\.[^.]+$/i, "");
  const encoded = encodeURIComponent(`${originalBase || "artwork-suncode"}.ai`);
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

async function convertToAi({ fileBase64, filename }) {
  const apiKey = process.env.CONVERTIO_API_KEY;
  if (!apiKey) {
    throw new Error("缺少 CONVERTIO_API_KEY 环境变量。");
  }

  const startResponse = await fetch(`${API_BASE}/convert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: apiKey,
      input: "base64",
      file: fileBase64,
      filename: filename || "artwork-suncode.png",
      outputformat: "ai",
    }),
  });
  const startData = await startResponse.json();
  if (startData.status !== "ok") {
    throw new Error(startData.error || "创建 Convertio 转换任务失败。");
  }

  const id = startData.data.id;
  for (let attempt = 0; attempt < MAX_POLLS; attempt += 1) {
    await sleep(POLL_INTERVAL_MS);

    const statusResponse = await fetch(`${API_BASE}/convert/${id}/status`);
    const statusData = await statusResponse.json();
    if (statusData.status !== "ok") {
      throw new Error(statusData.error || "查询 Convertio 转换状态失败。");
    }

    if (statusData.data.step === "finish") {
      const downloadResponse = await fetch(`${API_BASE}/convert/${id}/dl/base64`);
      const downloadData = await downloadResponse.json();
      if (downloadData.status !== "ok") {
        throw new Error(downloadData.error || "下载 Convertio 转换结果失败。");
      }
      return fromBase64(downloadData.data.content);
    }

    if (statusData.data.step === "failed") {
      throw new Error(statusData.data.error || "Convertio 转换失败。");
    }
  }

  throw new Error("Convertio 转换超时，请稍后重试。");
}

module.exports = async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const { fileBase64, filename } = request.body || {};
    if (!fileBase64 || typeof fileBase64 !== "string") {
      response.status(400).send("缺少待转换文件内容。");
      return;
    }

    const aiBuffer = await convertToAi({ fileBase64, filename });
    response.setHeader("Content-Type", "application/octet-stream");
    response.setHeader("Content-Disposition", contentDisposition(filename));
    response.status(200).send(aiBuffer);
  } catch (error) {
    response.status(500).send(error.message);
  }
};
