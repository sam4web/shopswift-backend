const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const refreshController = async (req, res) => {
  const { token: refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: "Refresh token must be provided" });

  try {
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // check if user exists
    const foundUser = await User.findById(id);
    if (!foundUser) return res.status(400).json({ message: "User does not exists." });

    // generate new access and refresh token
    const accessToken = await foundUser.generateAccessToken();
    const newRefreshToken = await foundUser.generateRefreshToken();

    // add refresh token on response cookie
    res.cookie("token", newRefreshToken,
      {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "development" ? "Strict" : "None",
        secure: process.env.NODE_ENV !== "development",
      });
    
    return res.status(200).json(accessToken);
  } catch (err) {
    return res.status(400).json({ message: `${err.name}: ${err.message}` });
  }
};

module.exports = { refresh: refreshController };