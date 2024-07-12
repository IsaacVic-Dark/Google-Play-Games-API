const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
  const token = req.signedCookies.jwt;
  console.log(token)
  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
