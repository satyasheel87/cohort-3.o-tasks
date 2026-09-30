import imagekit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new imagekit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

// === Upload in imageKit function ===
export const uploadFile = async ({ buffer, fileName }) => {
  const response = await client.files.upload({
    file: await toFile(buffer),
    fileName: fileName,
    folder: "E-com_workDir",
  });

  return response;
};

// === Delete from imageKit function ===
export const deleteFile = async (fileId) => {
  await client.files.delete(fileId);
};

