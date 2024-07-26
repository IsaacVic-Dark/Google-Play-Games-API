const express = require("express");
const Router = require("express");
const router = Router();
const FriendRequest = require('../Model/friendRequest')
const Friend = require('../Model/friend')
const User = require('../Model/user')

// Create a new friend
router.post('/friend-request', async (req, res) => {
  const { senderId, receiverId } = req.body;
  
  // Check if a request already exists
  const existingRequest = await FriendRequest.findOne({ senderId, receiverId });
  if (existingRequest) {
    return res.status(400).json({ message: 'Friend request already sent' });
  }

  const friendRequest = new FriendRequest({
    senderId,
    receiverId,
    status: 'pending'
  });

  await friendRequest.save();
  res.status(201).json({ message: 'Friend request sent' });
});


// Accept / Decline Friend Request
router.post('/friend-request/:requestId/respond', async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body; 
  
  const friendRequest = await FriendRequest.findById(requestId);
  if (!friendRequest) {
    return res.status(404).json({ message: 'Friend request not found' });
  }

  friendRequest.status = status;
  await friendRequest.save();
  
  if (status === 'accepted') {
    const friend = new Friend({
      userId1: friendRequest.senderId,
      userId2: friendRequest.receiverId,
      createdAt: new Date()
    });
    
    await friend.save();
  }
  
  res.status(200).json({ message: `Friend request ${status}` });
});

// Get all friend requests
router.get('/friend-request', async (req, res) => {
  try {
    const requests = await FriendRequest.find({});
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving friend requests', error });
  }
});

// GET Friend
router.get('/friends/:userId', async (req, res) => {
  const { userId } = req.params;

  const Friends = await Friend.find({
    $or: [{ userId1: userId }, { userId2: userId }]
  });

  const friendIds = Friends.map(f => f.userId1.toString() === userId ? f.userId2 : f.userId1);
  const friends = await User.find({ _id: { $in: friendIds } });

  res.status(200).json(friends);
});

module.exports = router;
