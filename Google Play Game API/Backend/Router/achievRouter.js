const express = require("express");
const Router = require("express");
const router = Router();
const Achievement = require("../Model/achievement");

// Create a new achievement
router.post("/achievements", async (req, res) => {
  const { achievement, points, userId, userName } = req.body;
  try {
    const achieve = new Achievement({ achievement, points, userId, userName });
    await achieve.save();
    res.status(201).json(achieve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all achievements 
router.get('/achievements', async (req, res) => {
    try {
        const achieve = await Achievement.find({})
        res.json(achieve)
    } catch (error) {
        console.error('Error in fetching achievements', error)
    }
})

// Get all achievements for a user
router.get("/achievements/:userId", async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.params.userId });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an achievement
router.put("/achievements/:id", async (req, res) => {
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAchievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an achievement
router.delete("/achievements/:id", async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
