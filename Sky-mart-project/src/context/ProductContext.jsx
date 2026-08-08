import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const MyStore = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("");

  // Cart state — hydrated from localStorage so it survives a refresh
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log("Cart localStorage read error:", error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cartItems to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.log("Cart localStorage write error:", error);
    }
  }, [cartItems]);

  // Fetch once here (not in Shop.jsx) so refreshing on ANY route —
  // e.g. /main/shop/8 directly — still has products available.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products?limit=50",
        );
        setProducts(res.data.products);
      } catch (error) {
        console.log("API Fetch Error:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category
    if (selectedCategory !== "All Categories") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Sort
    switch (sortBy) {
      case "lowToHigh":
        result.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        result.sort((a, b) => b.price - a.price);
        break;
      case "aToZ":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "zToA":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const categories = [
    "All Categories",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <MyStore.Provider
      value={{
        products,
        setProducts,
        loadingProducts,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        categories,
        filteredProducts,
        cartItems,
        setCartItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </MyStore.Provider>
  );
};