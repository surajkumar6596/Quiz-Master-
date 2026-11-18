import { FaArrowLeft } from "react-icons/fa";
import { LuTimer } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import "../css/OpenQuizPage.css";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OpenQuizPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { quiz } = useParams();
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  

  const [timeLeft, setTimeLeft] = useState(600);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const [userAnswers, setUserAns] = useState({});

  // show home page category
  const location = useLocation();
  const categoryName = location.state?.categoryName || "General";
  const quizTitle = location.state?.quizTitle || "Quiz";
  const quizId = location.state?.quizId;

  // left time
  const formatedTime = `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;


  // input check selection
  const handleSelectOption = (ques_id, ques_Obj) => {
    setUserAns((prev) => ({ ...prev, [ques_id]: ques_Obj }));
  };

  const targetQuizId = quizId || id;

  useEffect(() => {
    const fetchQuizQuestion = async () => {
      try {
        setLoading(true)
        const url = targetQuizId 
          ? `https://quiz-master-6e29.onrender.com/api/question/?quiz=${targetQuizId}`
          : "https://quiz-master-6e29.onrender.com/api/question/";

        const res = await axios.get(url);

        setQuestion(res.data);
        setLoading(false);
        // console.log("quizez", res.data);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    
    if (targetQuizId) {
      fetchQuizQuestion();
    }
  }, [targetQuizId]);

  // timer
  useEffect(()=>{
    if(loading) return;
    const timer = setInterval(()=>{
      setTimeLeft((prevTime)=>{
        if(prevTime <= 1){
          clearInterval(timer)
          return0
        }
        return prevTime -1
      }, )
    }, 1000)
    return ()=> clearInterval(timer)
  }, [loading])

  // timer finish
  useEffect(()=>{
    if(timeLeft === 0 && !loading && question.length > 0){
      alert('Time Finishl Quiz Submitted')
      handleSubmitQuiz()
    }
  }, [timeLeft])



  const handleNext = () => {
    if (currentIndex < question.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevios = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption("");
    }
  };

  const handleSubmitQuiz = async () => {
    try{
      let correctCount = 0
      question.forEach((q)=>{
        const selectedOption = userAnswers[q.id];
        if(selectedOption && selectedOption.is_correct){
          correctCount++;
        }
      })

      const totalQuestion = question.length;
      const calculatedScore = totalQuestion > 0 ? Math.round((correctCount / totalQuestion) * 100): 0;
      const token  = localStorage.getItem('access_token')

      const selectedQuizId = quizId || (question.length > 0 ? question[0].quiz : null)

      const payloads={
        quiz:selectedQuizId,
        quizTitle: quizTitle,
        score: calculatedScore,
        total_questions: totalQuestion,
        question:question,
        correct_answer:correctCount,
        userAnswers:userAnswers,
        timeTaken: 600 - timeLeft

      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/quiz_attempt/',
        payloads,
        {headers:{
          Authorization: `Bearer ${token}`,
        },}
      )

      console.log('quize submitted done', response.data)
      alert('quiz aubmited')

      navigate("/result_page", {
        state:{
          result:response.data,
          quizId,
          quizTitle,
          score: calculatedScore,
          correctCount,
          totalQuestion:totalQuestion,
          question,
          userAnswers,
          timeTaken: 600 - timeLeft,
        },
      })
      

    }catch(error){
      alert('quiz submit failed')
      console.log('quiz submit failed', error.response?.data || error.message)
    }
    
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Loading Questions...
      </div>
    );
  }

  if (question.length === 0) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        No questions available!
      </div>
    );
  }

  const currentQ = question[currentIndex];
  const selectedForCurrent = userAnswers[currentQ.id];

  return (
    <div className="quiz_open_page">
      <div className="header">
        <div className="left_content">
          <div className="cat_type">
            <span>{categoryName}</span>
            <p>Quiz</p>
          </div>
          <div className="header_title">
            <Link to='/'><FaArrowLeft /></Link>
            <h2>{quizTitle}</h2>
            <div className="right_content">
              <div className="timer">
                <LuTimer />
                <span>Time {formatedTime}</span>
              </div>

              <div className="question">
                <FaList />
                <p>
                  Question <span>{currentIndex + 1}</span> of{" "}
                  <span>{question.length}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* quetion ans card */}
      <div className="question_ans_card">
        <h4> QUESTION ASSESMENT</h4>
        <h1>{currentQ.question_text}</h1>
        <div className="option">
          {currentQ.options?.map((opt, idx) => {
            const optLabel = String.fromCharCode(65 + idx);
            const isChecked = selectedForCurrent?.id === opt.id;
            return (
              <label
                key={opt.id ?? idx}
                onClick={() => setSelectedOption(optLabel)}
                className={`opt_box ${isChecked ? "selected" : ""}`}
              >
                <div className="box">
                  <div className="opt_left">
                    <span>{optLabel}</span>
                    <span>{opt.option_text}</span>
                  </div>
                  <input
                    type="radio"
                    name={`quiz_option_${currentQ.id}`}
                    value={opt.id}
                    checked={isChecked}
                    onChange={() => handleSelectOption(currentQ.id, opt)}
                  />
                </div>
              </label>
            );
          })}
        </div>
        <div className="navigate">
          <button
            className="prev"
            onClick={handlePrevios}
            disabled={currentIndex === 0}
          >
            <BiLeftArrowAlt />
            <span>Previos</span>
          </button>

          {currentIndex === question.length - 1 ? (
            
              <button className="submit_btn" onClick={handleSubmitQuiz}>
                Submit quiz
              </button>
            
          ) : (
            <div className="next">
              <span onClick={handleNext}>Next Question</span>
              <BiRightArrowAlt />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenQuizPage;
