const express = require("express");
const Router = require("express");
const router = Router();
const LeaderBoard = require("../Model/leaderBoard");

// Post to leaderBoard
router.post("/leaderBoard", async (req, res) => {
  const { userName, points, game } = req.body;
  try {
    const board = new LeaderBoard({ userName, points, game });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT to leaderBoard
router.put('/leaderBoard/:id', async (req, res) => {
  try {
    const updatedData = req.body;
    const options = { new: true }; 

    const updatedLeaderBoard = await LeaderBoard.findByIdAndUpdate(req.params.id, updatedData, options);
    
    if (!updatedLeaderBoard) {
      return res.status(404).json({ message: "LeaderBoard entry not found" });
    }

    res.json({ message: "LeaderBoard updated successfully", data: updatedLeaderBoard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all achievements 
router.get('/leaderBoard', async (req, res) => {
    try {
        const board = await LeaderBoard.find({})
        res.json(board)
    } catch (error) {
        console.error('Error in fetching achievements', error)
    }
})

// Delete an achievement
router.delete("/leaderBoard/:id", async (req, res) => {
  try {
    await LeaderBoard.findByIdAndDelete(req.params.id);
    res.json({ message: "LeaderBoard deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
