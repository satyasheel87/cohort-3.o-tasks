import { verifyAccessToken } from "../utils/auth.utils.js";

export const authentication = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "Access token not found",
    });
  }
  try {
    const decode = verifyAccessToken(accessToken);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired access Token",
    });
  }
};