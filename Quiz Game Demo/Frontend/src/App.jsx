import LoginForm from "./Page/loginPage";
import Home from "./Page/home";
import Quiz from "./Page/Quiz";
import Nav from './Layout/Nav'
import RecordPage from "./Page/RecordPage";
import RegisterForm from './Page/registerPage'
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isRecordPage = location.pathname === '/quiz'
  return (
    <>
      {!isRecordPage && <Nav/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
}

export default App;
