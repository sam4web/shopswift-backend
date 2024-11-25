// @route /api/auth/logout
// @method POST
const logoutController = async (req, res) => {
  res.clearCookie("token", {
    sameSite: process.env.NODE_ENV === "development" ? "Strict" : "None",
    secure: process.env.NODE_ENV !== "development",
  });
  res.end();
};

module.exports = { logout: logoutController };