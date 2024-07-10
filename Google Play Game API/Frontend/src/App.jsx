import LoginForm from "./Pages/loginPage";
import Home from "./Pages/home";
import Nav from './Layout/Nav';
import Logout from './Layout/LogNav';
import RegisterForm from './Pages/registerPage'
import Welcome from "./Pages/welcome";
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
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;