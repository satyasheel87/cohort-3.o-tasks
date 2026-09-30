import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import useApi from "../shared/UseApi";

const AddProductForm = () => {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const isUpdate = location.state?.isUpdate;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      size: "Not Applicable",
      images: [],
    },
  });

  // --------------------------------
  // Set existing product for update
  // --------------------------------

  useEffect(() => {
    if (isUpdate && product) {
      reset({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "",
        size: product.size || "Not Applicable",
        images: [],
      });
    }
  }, [isUpdate, product, reset]);

  // --------------------------------
  // Create Product
  // --------------------------------

  const createProduct = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("size", data.size);

      // Images
      if (data.images?.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append("images", image);
        });
      }

      await api.post("/products", formData);

      alert("Product created successfully");

      navigate("/home/shop");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create product",
      );
    }
  };

  // --------------------------------
  // Update Product
  // --------------------------------

  const updateProduct = async (data) => {
    try {
      await api.put(`/product/${product._id}`, {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        category: data.category,
        size: data.size,
      });

      alert("Product updated successfully");

      navigate("/home/shop");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update product",
      );
    }
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const onSubmit = async (data) => {
    if (isUpdate) {
      await updateProduct(data);
    } else {
      await createProduct(data);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {isUpdate ? (
              <>
                Update{" "}
                <span className="text-orange-500">
                  Product
                </span>
              </>
            ) : (
              <>
                Add{" "}
                <span className="text-orange-500">
                  Product
                </span>
              </>
            )}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {isUpdate
              ? "Update your product details"
              : "Add a new product to your store"}
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl md:p-8">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Title
              </label>

              <input
                type="text"
                placeholder="Enter product title"
                {...register("title", {
                  required: "Product title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
              />

              {errors.title && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Enter product description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message:
                      "Description must be at least 20 characters",
                  },
                })}
                className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price / Stock */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="₹ Enter price"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price cannot be negative",
                    },
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />

                {errors.price && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  {...register("stock", {
                    required: "Stock is required",
                    min: {
                      value: 0,
                      message: "Stock cannot be negative",
                    },
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />

                {errors.stock && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.stock.message}
                  </p>
                )}
              </div>

            </div>

            {/* Category / Size */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-orange-500"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="tshirt">
                    T-Shirt
                  </option>

                  <option value="shirt">
                    Shirt
                  </option>

                  <option value="hoodie">
                    Hoodie
                  </option>

                  <option value="jeans">
                    Jeans
                  </option>

                  <option value="shoes">
                    Shoes
                  </option>

                  <option value="accessories">
                    Accessories
                  </option>
                </select>

                {errors.category && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Size */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Size
                </label>

                <select
                  {...register("size")}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-orange-500"
                >
                  <option value="Not Applicable">
                    Not Applicable
                  </option>

                  <option value="S">
                    Small
                  </option>

                  <option value="M">
                    Medium
                  </option>

                  <option value="L">
                    Large
                  </option>

                  <option value="XL">
                    XL
                  </option>

                  <option value="XXL">
                    XXL
                  </option>
                </select>
              </div>

            </div>

            {/* Images */}
            {!isUpdate && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Images
                </label>

                <div className="rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-950 p-8 text-center transition hover:border-orange-500">

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images", {
                      validate: (files) =>
                        files?.length <= 5 ||
                        "Maximum 5 images are allowed",
                    })}
                    className="mx-auto block w-full max-w-xs text-sm text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:font-medium file:text-black hover:file:bg-orange-400"
                  />

                  <p className="mt-3 text-xs text-zinc-500">
                    You can upload up to 5 images
                  </p>

                  {errors.images && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.images.message}
                    </p>
                  )}

                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Please wait..."
                : isUpdate
                  ? "Update Product"
                  : "Create Product"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;