import imagekit from "../config/imageKit";
export const uploadImage = async (file) => {

  const response = await imagekit.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
    folder: "/products"
  });

  return response.url;
};