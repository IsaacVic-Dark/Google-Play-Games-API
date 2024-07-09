const Router = require('express')
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../Model/user')

// Register request
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({ name, email, password: hashedPassword })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.json(err));
});

router.get("/", async(req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
  }
});

// POST request for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  // Create JWT token
  const token = jwt.sign(
    {
      userId: user._id,
      userEmail: user.email
    },
    "your_secret_key",
    { expiresIn: "1h" }
  ); 

  // Send the JWT as a cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Cookie is not accessible via client-side JavaScript
    secure: process.env.NODE_ENV === "production", // Cookie only sent over HTTPS in production
    maxAge: 4000,
    // sameSite: "strict",  Restrict cookie to same site requests
  });

  res.json({ success: true, message: "Login successful" });
});

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie(
    "authToken".json({ success: true, message: "Logged out successfully" })
  );
});

module.exports = router;