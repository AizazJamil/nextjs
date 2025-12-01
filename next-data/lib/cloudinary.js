// import { v2 as cloudinary } from "cloudinary";

// if (!process.env.CLOUDINARY_CLOUD_NAME) {
//   throw new Error("CLOUDINARY_CLOUD_NAME is not set");
// }

// if (!process.env.CLOUDINARY_API_KEY) {
//   throw new Error("CLOUDINARY_API_KEY is not set");
// }

// if (!process.env.CLOUDINARY_API_SECRET) {
//   throw new Error("CLOUDINARY_API_SECRET is not set");
// }

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadImage(image) {
//   const imageData = await image.arrayBuffer();
//   const mime = image.type;
//   const encoding = "base64";
//   const base64Data = Buffer.from(imageData).toString("base64");
//   const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
//   const result = await cloudinary.uploader.upload(fileUri, {
//     folder: "nextjs-course-mutations",
//   });
//   return result.secure_url;
// }

import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not set");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Create folder API ---
export async function createFolder(name) {
  try {
    return await cloudinary.api.create_folder(name);
  } catch (err) {
    // If folder exists, Cloudinary throws a 409
    if (err?.http_code === 409) return { message: "Folder already exists" };
    throw err;
  }
}

// --- Upload file ---
export async function uploadImage(image) {
  // optionally ensure folder exists:
  await createFolder("nextjs-course-mutations");

  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(imageData).toString("base64");
  const fileUri = `data:${mime};${encoding},${base64Data}`;

  const result = await cloudinary.uploader.upload(fileUri, {
    folder: "nextjs-course-mutations",
  });

  return result.secure_url;
}
