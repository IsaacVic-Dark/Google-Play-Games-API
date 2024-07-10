import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/Quiz.css";
import { data } from "../assets/data";
import { toast, Toaster } from "react-hot-toast";
import {useAuth} from "../utils/authContext";
import { logout } from "../utils/logout";
import { useNavigate } from "react-router-dom";
// import postAchievement from '../services/achievementService';

export default function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false); // Prevent container from disappearing after last question is answered
  let [achievements, setAchievements] = useState([]);
  const { isLoggedIn, user } = useAuth();
  const Navigate = useNavigate()

  // After choosing displaying the correct answer
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    console.log("Achievements: ", achievements);
  }, [achievements]);

  const checkAchievements = (newScore) => {
    const newAchievements = [...achievements];

    if (newScore === 2 && !achievements.includes("Good")) {
      newAchievements.push("Good");
      toast.success("Good Achievement Unlocked!");
    } else if (newScore === 3 && !achievements.includes("Brilliant")) {
      newAchievements.push("Brilliant");
      toast.success("Brilliant Achievement Unlocked!");
    } else if (newScore === 5 && !achievements.includes("Experienced")) {
      newAchievements.push("Experienced");
      toast.success("Experienced Achievement Unlocked!");
    }

    setAchievements(newAchievements);
    if (newAchievements.length > 0) {
      newAchievements.forEach(async (achievement) => {
        await postAchievement(achievement, score); // Use the service function
      });
    }
  };

  const checkAnswer = (element, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        element.target.classList.add("correct");
        setScore((prev) => {
          const newScore = prev + 1;
          checkAchievements(newScore);
          return newScore;
        });
        setLock(true);
      } else {
        element.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  // If no ans is selected the next button wont be clickable
  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const handleLogout = async() => {
    try {
      await logout()
      Navigate('/')
    } catch (error) {
      console.error(`Error in logging out`, error)
    }
  }

  // reset all after the user completes
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <Toaster />
      <div>
        {isLoggedIn ? (
          <h1>Welcome, {user.userName}</h1>
        ) : (
          <h1>Please log in</h1>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
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
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
