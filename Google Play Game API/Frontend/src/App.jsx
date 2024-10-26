import LoginForm from "./Pages/loginPage";
import Home from "./Pages/home";
import './App.css';
// import Nav from './Layout/Nav';
import Logout from './Layout/LogNav';
import RegisterForm from './Pages/registerPage'
import Welcome from "./Pages/welcome";
// import LogNav from "./Layout/LogNav";
import Profile from "./Pages/profilePage";
import Library from "./Pages/libraryPage";
import DisplayLeaderBoard from "./Pages/leaderBoard";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  // const location = useLocation();
  // const isWelcomePage = location.pathname === '/welcome'
  return (
    <>
      {/* {!isWelcomePage && <Nav/>} */}
      {/* {isWelcomePage ? <LogNav /> : <Nav />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/leaderBoard" element={<DisplayLeaderBoard />} />
      </Routes>
    </>
  );
}

export default App;