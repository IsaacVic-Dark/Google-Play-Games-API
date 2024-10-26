import React, { useEffect, useState } from "react";
import LogNav from "../Layout/LogNav";
import pic from "../assets/john-doe-image.png";
import Profile_Background from "../assets/Profile_Background.png";
import { useAuth } from "../utils/authContext";
import get from "../utils/getNumberofAchievements";
import "../styles/profile.css";

export default function Profile() {
  const { isLoggedIn, user } = useAuth();
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    const fetchLeaderBoardData = async () => {
      try {
        if (isLoggedIn) {
          const data = await get();
          setLeaderBoard(data);
        }
      } catch (error) {
        console.log('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderBoardData();
  }, [isLoggedIn]);

  const userEntry = leaderBoard.find(entry => entry.userName === user.userName);

  return (
    <>
      <LogNav />
      <div className="box">
        <div className="paper">
          <div className="profile-container">
            <img src={Profile_Background} alt="" className="background-img" />
            <img src={pic} alt="" className="profile-img" />
          </div>
          <div className="content">
            {isLoggedIn ? (
              <>
                <h1>{user.userName}</h1>
                <h1>{user.userEmail}</h1>
              </>
            ) : (
              <>
                <h1>We can't find your name</h1>
                <h1>No email</h1>
              </>
            )}
            <h2>Achievements: 
              {isLoggedIn && userEntry ? (
                <h3>{userEntry.points}</h3>
              ) : (
                <h2>No leaderboard data</h2>
              )}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
