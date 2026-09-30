import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    mingLength: 3,
    maxLengthL: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    mingLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  images: {
    type: [
      {
        url: String,
        fileId: String,
      },
    ],
    validate: {
      validator: (image) => image.length <= 5,
      message: "maximum 5 images are allowed",
    },
  },
  size: {
    type: String,
    default: "Not Applicable",
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
