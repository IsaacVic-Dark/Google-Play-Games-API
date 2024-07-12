import React, { useState, useRef, useEffect } from "react";
import "../styles/Quiz.css";
import { data } from "../assets/data";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../utils/authContext";
import { logout } from "../utils/logout";
import { useNavigate } from "react-router-dom";
import postAchievement from "../utils/postAchievement";

export default function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [points, setPoints] = useState(0);
  let [result, setResult] = useState(false);
  let [achievements, setAchievements] = useState([]);
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    console.log("Achievements: ", achievements);
  }, [achievements]);

  const checkAchievements = (newPoints) => {
    const newAchievements = [...achievements];
    let hasNewAchievements = false;

    if (newPoints === 1 && !newAchievements.includes("Good")) {
      newAchievements.push("Good");
      toast.success("Good Achievement Unlocked!");
      hasNewAchievements = true;
    }
    if (newPoints === 2 && !newAchievements.includes("Better")) {
      newAchievements.push("Better");
      toast.success("Better Achievement Unlocked!");
      hasNewAchievements = true;
    }
    if (newPoints === 3 && !newAchievements.includes("Brilliant")) {
      newAchievements.push("Brilliant");
      toast.success("Brilliant Achievement Unlocked!");
      hasNewAchievements = true;
    }
    if (newPoints === 4 && !newAchievements.includes("Expert")) {
      newAchievements.push("Expert");
      toast.success("Expert Achievement Unlocked!");
      hasNewAchievements = true;
    }
    if (newPoints === 5 && !newAchievements.includes("Experienced")) {
      newAchievements.push("Experienced");
      toast.success("Experienced Achievement Unlocked!");
      hasNewAchievements = true;
    }

    if (hasNewAchievements) {
      setAchievements(newAchievements);
      saveAchievements(newAchievements, newPoints); 
    }
  };

  const saveAchievements = async (achievements, points) => {
    for (const achievement of achievements) {
      await postAchievement(achievement, points);
    }
  };

  const checkAnswer = (element, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        element.target.classList.add("correct");
        setPoints((prev) => {
          const newPoints = prev + 1;
          checkAchievements(newPoints);
          return newPoints;
        });
        setLock(true);
      } else {
        element.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error in logging out", error);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setPoints(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="wrapper">
        <Toaster />
        <div className="Nav">
          {isLoggedIn ? (
            <h1>Welcome, {user.userName}</h1>
          ) : (
            <h1>Please log in</h1>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      <div className="container">
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
      </div>
    </div>
  );
}
