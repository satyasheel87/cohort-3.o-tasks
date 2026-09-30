import axios from "axios";
import { useContext } from "react";
import { MyAuth } from "../context/AuthContext";

const useApi = () => {
  const { accessToken, setAccessToken } = useContext(MyAuth);
  // console.log("accessToken:", accessToken);
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // handle for 401 Unauthorized response
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        setAccessToken(res.data.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
        return axios(error.config);
      }
      return Promise.reject(error);
    },
  );

  return api;
};

export default useApi;
