import { FaAward } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaList } from "react-icons/fa";
import "../css/ResultPage.css";
import { TbBulbFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const quizTitle = location.state?.quizTitle || "Quiz Assessment";
  const resultData = location.state?.result || {};

  const score = location.state?.score ?? resultData.score ?? 0;
  const totalQuestions =
    location.state?.totalQuestion ??
    location.state?.totalQuestions ??
    resultData.total_questions ??
    0;
  const correctCount =
    location.state?.correctCount ?? resultData.correct_answer ?? 0;

  // question list and user ans
  const questions = location.state?.question || location.state?.questions || [];
  const userAnswers = location.state?.userAnswers || {};
  const timeTakenSec = location.state?.timeTaken || 0;

  // time format
  const timeTakenFormate = `${Math.floor(timeTakenSec / 60)}m ${timeTakenSec % 60}s`;

  // accuracy
  const accuracy =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const handleTryAgain = () => {
    navigate(-1);
  };

  return (
    <div className="result_page">
      <div className="greetin_page">
        <FaAward className="award_icon" />
        <p>Complete assessment</p>
        <h3>
          {score >= 50
            ? "Fantastic job student!"
            : "Good effort, keep practicing!"}
        </h3>
        <span>
          Your score for <strong>{quizTitle}</strong>
        </span>

        <div className="score_card">
          <div className="score">
            <p>Total Score</p>
            <span>{score}%</span>
          </div>
          <div className="score">
            <p>Accuracy</p>
            <span>{accuracy}%</span>
          </div>
          <div className="score">
            <p>Correct Answers</p>
            <span>
              {correctCount}/{totalQuestions}
            </span>
          </div>
          <div className="score">
            <p>Time Taken</p>
            <span>{timeTakenFormate}</span>
          </div>
        </div>

        <div className="navigate">
          <div
            className="try_again"
            onClick={handleTryAgain}
            style={{ cursor: "pointer" }}
          >
            <FaArrowRotateRight />
            <p>Try again</p>
          </div>
          <div className="home_link">
            <IoHome />
            <Link to="/">
              <p>Back to Dashboard</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="quiz_detail">
        <FaList />
        <p>Detail Questions Review & Explanation</p>
      </div>

      {/* Dynamic Review Loop */}
      {questions.length > 0 ? (
        questions.map((q, index) => {
          const selectedOption = userAnswers[q.id];
          const isCorrect = selectedOption && selectedOption.is_correct;
          const isSkipped = !selectedOption;

          return (
            <div className="quiz_detail_card" key={q.id || index}>
              <div className="ques_action">
                <p>Question {index + 1}</p>
                <span
                  style={{
                    color: isSkipped
                      ? "#888"
                      : isCorrect
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {isSkipped ? "Skipped" : isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <h2>{q.question_text}</h2>

              <div className="correct_ans_card">
                {q.options?.map((opt, idx) => {
                  const optLable = String.fromCharCode(65 + idx);
                  const isUserChoice = selectedOption?.id === opt.id;
                  const isRightAnswer = opt.is_correct;

                  // Right answer green, wrong user choice red
                  let styleClass = "";
                  if (isRightAnswer) styleClass = "right_opt";
                  if (isUserChoice && !isRightAnswer) styleClass = "wrong_opt";

                  return (
                    <div
                      className={`ques_opt ${styleClass}`}
                      key={opt.id || idx}
                      style={{
                        border: isRightAnswer
                          ? "1px solid #0feb16"
                          : isUserChoice
                            ? "1px solid #c41609"
                            : "1px solid #444",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        marginBottom: "8px",
                      }}
                    >
                      <div className="a_b">
                        <p>{optLable} </p>
                        <span>{opt.option_text}</span>
                      </div>
                      {isUserChoice && (
                        <small
                          style={{
                            color: isRightAnswer ? "#4caf50" : "#dd1608",
                            marginLeft: "10px",
                          }}
                        >
                          (Your Answer)
                        </small>
                      )}
                    </div>
                  );
                })}

                {q.explanation ? (
                  <div className="ques_explain">
                    <TbBulbFilled />
                    <h4> Explanation</h4>
                    <p>{q.explanation}</p>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "#777",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    No explanation available.
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "20px" }}>
          No question details available.
        </p>
      )}
    </div>
  );
};

export default ResultPage;
