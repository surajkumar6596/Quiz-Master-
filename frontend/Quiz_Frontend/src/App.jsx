import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./user/Login";
import Signup from "./user/Signup";
import Home from "./user/Home";
import OpenQuizPage from "./user/OpenQuizPage";
import ResultPage from "./user/ResultPage";
import UserProfile from "./user/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/open_quiz_page" element={<OpenQuizPage/>}/>
          <Route path="/result_page" element={<ResultPage/>}/>
          <Route path="profile" element={<UserProfile/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
