import jwt from "jsonwebtoken";
import config from "../config/config.js";

// ===createAccessToken===
export const createAccessToken = ({ userId }) => {
  const accessToken = jwt.sign(
    {
      userId,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  return accessToken;
};

// ===createRefreshToken===
export const createRefreshToken = ({ userId }) => {
  const refreshToken = jwt.sign(
    {
      userId,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  return refreshToken;
};

// ===verifyAccessToken===
export const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
};

// ===verifyRefreshToken===
export const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
};
