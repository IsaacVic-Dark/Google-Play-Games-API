import React, { useState, useRef, useEffect } from "react";
import "../styles/Quiz.css";
import { data } from "../assets/data";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../utils/authContext";
// import { logout } from "../utils/logout";
// import { useNavigate } from "react-router-dom";
import LogNav from "../Layout/LogNav";
import checkAchievements from "../utils/reusableFunc/checkAchievement";
import io from "socket.io-client";

const socket = io('http://localhost:3001');

export default function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [points, setPoints] = useState(0);
  let [result, setResult] = useState(false);
  let [achievements, setAchievements] = useState([]);
  let [userScores, setUserScores] = useState({});
  const { isLoggedIn, user } = useAuth();
  

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    console.log("Achievements: ", achievements);
  }, [achievements]);

  useEffect(() => {
    socket.on('scoreUpdate', (scores) => {
      console.log('Score update received: ', scores);
      setUserScores(scores);
    });

    return () => {
      socket.off('scoreUpdate');
    };
  }, []);

  useEffect(() => {
    if (user && points !== undefined) {
      socket.emit('scoreUpdate', { userName: user.userName, score: points });
    }
  }, [points, user]);

  const checkAnswer = async (element, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        element.target.classList.add("correct");
        const newPoints = points + 1;
        setPoints(newPoints);
        await checkAchievements(newPoints, achievements, setAchievements, user);
        socket.emit('live', `User ${user.userName} answered question ${index + 1} correctly!`);
        setLock(true);
      } else {
        element.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
        socket.emit('live', `User ${user.userName} answered question ${index + 1} incorrectly.`);
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        // const userName = user.userName;
        // PostLeaderBoard(userName, points);
        return;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };


  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setPoints(0);
    setLock(false);
    setResult(false);
    socket.emit('scoreUpdate', { userName: user.userName, score: 0 });
  };

  return (
    <div className="wrapper">
      <Toaster />
      <div className="container">
        <LogNav/>
        {isLoggedIn ? (<h1>Hi, {user.userName}</h1>) : (<h1>User not found</h1>)}
        <h2>Score: {points}</h2>
        <h1>Quiz Game</h1>
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={Option1}
                onClick={(element) => {
                  checkAnswer(element, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={Option2}
                onClick={(element) => {
                  checkAnswer(element, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={Option3}
                onClick={(element) => {
                  checkAnswer(element, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={Option4}
                onClick={(element) => {
                  checkAnswer(element, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">
              {index + 1} of {data.length} questions
            </div>
          </>
        )}
        {result ? (
          <>
            <h2>
              You scored {points} out of {data.length}
            </h2>
            <button onClick={reset}>Reset</button>
          </>
        ) : (
          <></>
        )}
        <h2>Other Users' Scores</h2>
        <ul>
          {Object.entries(userScores).map(([userName, score]) => (
            <li key={userName}>
              {userName}: {score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
