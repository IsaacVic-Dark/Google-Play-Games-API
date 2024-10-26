const express = require("express");
const Router = require("express");
const router = Router();
const Profile = require("../Model/profile");

// Create a new friend
router.post("/friends", async (req, res) => {
  const { profilePic, friend  } = req.body;
  try {
    const info = new Profile({ profilePic, friend });
    await info.save();
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all friends 
router.get('/friends', async (req, res) => {
    try {
        const info = await Profile.find({})
        res.json(info)
    } catch (error) {
        console.error('Error in fetching friends', error)
    }
})

// Get all friends for a user
router.get("/friends/:userId", async (req, res) => {
  try {
    const friend = await Profile.find({ userId: req.params.userId });
    res.json(friend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an friend
router.put("/friends/:id", async (req, res) => {
  try {
    const updatedFriend = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFriend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Patch a Friend 
router.patch('/friends', async(req, res) => {
  try {
    const addFriend = await Profile.findByIdAndUpdate()
  } catch (error) {
    
  }
})

// Delete a friend
router.delete("/friends/:id", async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "friend deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
