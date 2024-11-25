const { validatePassword, validateEmail, validateUsername } = require("../utils/validate-credentials.util");
const User = require("../models/user.model");


// @route /api/auth/register
// @method POST
const registerController = async (req, res) => {
  let { username, email, password } = req.body;
  username = username?.trim();
  email = email?.trim();

  // check for credentials validation
  const usernameValid = validateUsername(username || "");
  if (!usernameValid.isValid) return res.status(400).json({ message: usernameValid.message });
  const emailValid = validateEmail(email || "");
  if (!emailValid.isValid) return res.status(400).json({ message: emailValid.message });
  const passValid = validatePassword(password || "");
  if (!passValid.isValid) return res.status(400).json({ message: passValid.message });

  try {
    // check if user with provided email exists
    const duplicateEmail = await User.findOne({ email }).lean();
    if (duplicateEmail)
      return res.status(400).json({ message: "An account with this email address already exists." });    // check if user with email already exists

    // check if user with provided username exists
    const duplicateUsername = await User.findOne({ username }).lean();
    if (duplicateUsername)
      return res.status(400).json({ message: "An account with this username already exists." });

    const user = await User.create({ username, email, password });
    const createdUser = await User.findById(user._id);
    if (!createdUser) return res.status(500).json({ message: "Something went wrong." });

    // generate new access and refresh token
    const accessToken = await createdUser.generateAccessToken();
    const refreshToken = await createdUser.generateRefreshToken();

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

module.exports = { register: registerController };