import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";

export const MyAuth = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);

  return (
    <MyAuth.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        error,
        setError,
        isLoading,
        setIsLoading,
        product,
        setProduct,
      }}
    >
      {children}
    </MyAuth.Provider>
  );
};
