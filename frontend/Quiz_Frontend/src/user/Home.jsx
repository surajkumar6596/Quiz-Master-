import "../css/Home.css";
import { FaCompass } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState("All Categories");
  const [quizs, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await axios.get(
          "http://127.0.0.1:8000/api/categories/",
        );
        const quizes = await axios.get("http://127.0.0.1:8000/api/quizes/");

        // console.log('car',categories.data)
        // console.log('quiz', quizes.data)

        setCategories(categories.data);
        setQuiz(quizes.data);
        setLoading(false);
      } catch (error) {
        console.log("failed fetchData ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="home_page">
      {/* quiz explore */}
      <div className="header_tab">
        <div className="left_header ">
          <div className=" left_side">
            <FaCompass />
            <h4>Explore quiz</h4>
          </div>
          <div className=" left_side">
            <FaHistory />
            <h4>History</h4>
          </div>
          <div className=" left_side">
            <FaTrophy />
            <h4>Leaderboard</h4>
          </div>
        </div>

        <div className="right_header ">
          <div className="right_side">
            <div className="search">
              <FaSearch className="searc_icon" />
              <input type="text" name="search" placeholder="Search quizez" />
            </div>

            <div className="categories">
              <select name="" id="">
                <option value="all">All Categries</option>
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* welcome banner */}
      <div className="welcome_card">
        <h4>Intractive learning</h4>
        <h1>Select a Quiz Card to Start Full-Page Test</h1>
        <p>
          Click any card below to launch an immersive full-screen quiz
          experience complete with timer, instant
        </p>
        <span>progress tracking, and detailed score breakdown.</span>
      </div>

      {/* quiz card border */}
      <div className="quiz_border">
        <FaLayerGroup />
        <h4>Available quizes</h4>
      </div>

      {/* quiz card grid  */}

      <div className="quiz_grid">
        {Array.isArray(quizs) && quizs.length > 0 ? (
          quizs.map((quiz) => {
            const categoryObj = Array.isArray(categories)
              ? categories.find(
                  (cat) => Number(cat.id) === Number(quiz.category),
                )
              : null;

            const categoryName = categoryObj ? categoryObj.name : "General";

            return (
              <div className="quiz_card" key={quiz.id}>
                <div className="header">
                  <h4>{categoryName}</h4>
                  <span>Quiz</span>
                </div>

                <div className="content">
                  <h2>{quiz.title}</h2>
                  <p>{quiz.description}</p>
                </div>

                <div className="bottum">
                  <div className="left_bottum_card">
                    <FaQuestionCircle />
                    <p>
                      <span>10</span> Qs
                    </p>

                    <p>
                      <CiClock1 /> {quiz.time_limit_minutes} min
                    </p>
                  </div>

                  <div className="start_btn">
                    <Link
                      to="/open_quiz_page"
                      state={{
                        categoryName: categoryName,
                        quizTitle: quiz.title,
                        quizId: quiz.id,
                      }}
                    >
                      <h4>Start</h4>
                    </Link>
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No quizzes available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
