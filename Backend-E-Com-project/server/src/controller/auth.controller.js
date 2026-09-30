import userModel from "../models/auth.model.js";
import bcryptjs from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.utils.js";

// === Register API controller ==
export const registerController = async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
      error: [
        {
          field: "email",
          message: "user already exist with this email",
        },
      ],
    });
  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcryptjs.hash(password, 12),
  });

  const accessToken = createAccessToken({
    userId: user._id,
  });
  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  return res.status(201).json({
    message: "User created successfully",
    data: {
      name: user.name,
      email: user.email,
      id: user._id,
    },
    accessToken,
  });
};

// === Login API controller ==
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
  });
  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  await userModel.findOneAndUpdate(
    {
      email,
    },
    { refreshToken },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "user logged in siccessfully",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
    accessToken,
  });
};

// === refreshToken API controller ==
export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "refersh token not found",
    });
  }

  try {
    const decode = verifyRefreshToken(refreshToken);
    const { userId } = decode;

    const user = await userModel.findById(userId);
    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });
      return res.status(400).json({
        message: "refreshToken mismatch",
      });
    }

    const accessToken = createAccessToken({
      userId,
    });

    const newRefreshToken = createRefreshToken({
      userId,
    });

    await userModel.findByIdAndUpdate(userId, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Token refresh successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Refresh Token",
    });
  }
};

// === GET User API controller ==
export const getMeController = async (req, res) => {
  const { userId } = req.user;
  const user = await userModel.findById(userId);
  if (!user.refreshToken) {
    return res.status(400).json({
      message: "you're logged out login again.",
    });
  }
  res.status(200).json({
    message: "user data fetched successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    },
  });
};

// === logout API controller ==
export const logoutController = async (req, res) => {
  const { userId } = req.user;

  await userModel.findByIdAndUpdate(userId, {
    refreshToken: null,
  });
  res.clearCookie("refreshToken");

  const user = await userModel.findById(userId);
  return res.status(200).json({
    message: "User Logged out successfully",
    data: {
      user,
    },
  });
};