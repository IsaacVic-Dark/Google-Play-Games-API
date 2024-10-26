const Router = require('express')
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../Model/user')
const verifyToken = require('../Middleware/verifyToken')

// Get All Users
router.get("/", async(req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
  }
});

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
      userEmail: user.email,
      userName: user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  ); 

  // Send the JWT as a cookie
  res.cookie("jwt", token, {
    signed: true,
    httpOnly: true, // Cookie is not accessible via client-side JavaScript
    // secure: process.env.NODE_ENV === "production", // Cookie only sent over HTTPS in production
    maxAge: 3600000,
    // sameSite: "strict",  // Restrict cookie to same site requests
  });

  res.json({ success: true, message: "Login successful" });
});

// Check if user is logged in
router.get('/check-auth', verifyToken, async (req, res) => {
  try {
    // If middleware successfully verifies token, send success response
    res.json({ success: true, message: 'User is logged in', user: req.user });
  } catch (error) {
    console.error('Error checking auth status', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("jwt",{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ success: true, message: "Logged out successfully" })
});

module.exports = router;