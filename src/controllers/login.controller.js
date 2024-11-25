const { validatePassword, validateEmail, validateUsername } = require("../utils/validate-credentials.util");
const User = require("../models/user.model");


// @route /api/auth/login
// @method POST
const loginController = async (req, res) => {
  let { username, password } = req.body;
  username = username?.trim();

  // check for credentials validation
  const usernameValid = validateUsername(username || "");
  if (!usernameValid.isValid) return res.status(400).json({ message: usernameValid.message });
  const passValid = validatePassword(password || "");
  if (!passValid.isValid) return res.status(400).json({ message: passValid.message });

  try {
    // check if user with email exists
    const foundUser = await User.findOne({ username });
    if (!foundUser)
      return res.status(404).json({ message: "User with provided username does not exist." });

    const passMatch = await foundUser.doesPasswordMatch(password);
    if (!passMatch)
      return res.status(400).json({ message: "The provided password does not match." });

    // generate new access and refresh token
    const accessToken = await foundUser.generateAccessToken();
    const refreshToken = await foundUser.generateRefreshToken();

    // add refresh token on response cookie
    res.cookie("token", refreshToken,
      {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "development" ? "Strict" : "None",
        secure: process.env.NODE_ENV !== "development",
      });

    return res.status(200).json(accessToken);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { login: loginController };