import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/profile.css";
import LogNav from "../Layout/LogNav";
import Pic from "../Assets/john-doe-image.png";
import get from "../utils/fetchLeaderBoard";
import fetchUsers from "../utils/getAllUsers";
import { useAuth } from "../utils/authContext";

function Profile() {
  const { isLoggedIn, user } = useAuth();
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  // Function to handle adding friends
  const handleAddFriend = async (receiverId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/friend-request",
        {
          senderId: user.userId,
          receiverId,
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.log("Error sending friend request:", error);
    }
  };

  // Function to handle accepting or declining friend requests
  const handleRespondToRequest = async (requestId, status) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/friend-request/${requestId}/respond`,
        { status }
      );
      alert(response.data.message);
      // Optionally, refresh the friend requests list
    } catch (error) {
      console.log("Error responding to friend request:", error);
    }
  };

  useEffect(() => {
    const fetchLeaderBoardData = async () => {
      try {
        if (isLoggedIn) {
          const data = await get();
          setLeaderBoard(data);
        }
      } catch (error) {
        console.log("Error fetching leader board:", error);
      }
    };

    const fetchUsersData = async () => {
      try {
        if (isLoggedIn) {
          const data = await fetchUsers();
          setUsers(data);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        if (isLoggedIn) {
          // const response = await axios.get(`http://localhost:3000/friends/${user.userId}`);
          const response = await axios.get(
            `http://localhost:3000/friend-request`
          );
          setFriendRequests(response.data);
        }
      } catch (error) {
        console.log("Error fetching friend requests:", error);
      }
    };

    fetchUsersData();
    fetchLeaderBoardData();
    fetchFriendRequests();
  }, [isLoggedIn, user]);

  const userEntry = leaderBoard.find(
    (entry) => entry.userName === user.userName
  );

  console.log(friendRequests);
  return (
    <>
      <LogNav />
      <div className="profile-container">
        <div className="profile-section">
          <img src={Pic} alt="" />
          <div className="profile-info">
            {isLoggedIn ? (
              <>
                <h1>{user.userName}</h1>
                <h1>{user.userEmail}</h1>
              </>
            ) : (
              <h1>Missing your info</h1>
            )}
          </div>
        </div>
        <div className="achievement-section">
          <div className="achieve">
            <h1>Achievements</h1>
            {isLoggedIn && userEntry ? (
              <h3>{userEntry.points}</h3>
            ) : (
              <h2>No leader board data</h2>
            )}
          </div>
          <div className="friend">
            <h1>Friends</h1>
          </div>
        </div>
        <div className="friend-request-section">
          <h1>Friend Requests</h1>
          <div className="friend-box">
            {friendRequests.length > 0 ? (
              friendRequests.map((request) => (
                <div key={request._id}>
                  <p>
                    {leaderBoard.find((user) => user._id === request.senderId)
                      ?.userName || request.senderId}{" "}
                    wants to be your friend
                  </p>
                  <button
                    onClick={() =>
                      handleRespondToRequest(request._id, "accepted")
                    }
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleRespondToRequest(request._id, "declined")
                    }
                  >
                    Decline
                  </button>
                </div>
              ))
            ) : (
              <p>No friend requests</p>
            )}
          </div>
        </div>
        <div className="users">
          <h1>Users</h1>
          {isLoggedIn && (
            <ul>
              {leaderBoard.map((user) => (
                <li key={user._id}>
                  {user.userName}
                  <button onClick={() => handleAddFriend(user._id)}>
                    Send Friend Request
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
