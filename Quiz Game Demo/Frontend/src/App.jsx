import LoginForm from "./Page/loginPage";
import Home from "./Page/home";
import Quiz from "./Page/Quiz";
import Nav from './Layout/Nav';
import Logout from './Layout/LogNav'
import LeaderBoard from "./Page/leaderBoard";
import Profile from "./Page/profile";
import RegisterForm from './Page/registerPage'
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isQuizPage = location.pathname === '/quiz'
  return (
    <>
      {!isQuizPage && <Nav/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/leaderBoard" element={<LeaderBoard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;