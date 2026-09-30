import React, { useContext, useEffect } from "react";
import { MyAuth } from "../context/AuthContext";
import useApi from "../shared/UseApi";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  const { product, setProduct } = useContext(MyAuth);
  const api = useApi();

  const getAllProducts = async () => {
    try {
      const response = await api.get("/products");

      setProduct(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = (deletedId) => {
    setProduct((prev) =>
      prev.filter((item) => item._id !== deletedId),
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Our <span className="text-orange-500">Products</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Explore our latest products
          </p>
        </div>

        {product?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {product.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onDelete={handleDelete}
              />
            ))}

          </div>
        ) : (
          <div className="flex min-h-75 items-center justify-center">
            <p className="text-zinc-500">
              No products available
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ShopPage;