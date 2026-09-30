import productModel from "../models/product.model.js";
import { deleteFile, uploadFile } from "../services/imagekit.js";

// === POST Create Product API ===
export const createProductController = async (req, res) => {
  // const { title, description, price, stock, size, category } = req.body;
  // console.log(req.files); // file array data hai
  // console.log(req.body); // text data

  // const fileUrls = [];
  // for (let i = 0; i < req.files.length; i++) {
  //   const response = await uploadFile({
  //     buffer: req.files[i].buffer,
  //     fileName: req.files[i].originalname,
  //   });
  //   fileUrls.push(response.url);
  // }

  const fileUrls = await Promise.all(
    req.files.map(async (file) => {
      const response = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
      console.log(response);
      return {
        url: response.url,
        fileId: response.fileId,
      };
    }),
  );
  // console.log(fileUrls);

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    images: fileUrls,
  });

  return res.status(201).json({
    message: "Product created successfully",
    data: {
      product,
    },
  });
};

// === Get All Product API ===
export const getAllProductsController = async (req, res) => {
  const products = await productModel.find();

  res.status(200).json({
    messsage: "Products fetched successfully",
    data: {
      products,
    },
  });
};

// === Get All Product By ID API ===
export const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  res.status(200).json({
    messsage: "Product fetched successfully",
    data: {
      product,
    },
  });
};

// === PUT Update Product By ID API ===
export const updateProductController = async (req, res) => {
  const { title, description, price, stock, size, category } = req.body;

  const { id } = req.params;

  const product = await productModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      stock,
      size,
      category,
    },
    { returnDocument: "after" },
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.status(200).json({
    message: "product updated successfully",
    data: {
      product,
    },
  });
};

// === DELETE Delete Product By ID API ===
export const deleteProductByIdController = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // === delete from imageKit ===
  const fileIds = product.images.map((image) => image.fileId);
  await Promise.all(fileIds.map((fileId) => deleteFile(fileId)));

  await productModel.findByIdAndDelete(id);

  return res.status(200).json({
    message: "product deleted successfully",
  });
};
