import { useEffect, useState } from "react";
import Question from "./components/Question";
import "./App.css";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  console.log(questions);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(API_URL);
      const data = await res.json();
      const questions = data.results.map((question) => ({
        ...question,
        answers: [question.correct_answer, ...question.incorrect_answers].sort(
          () => Math.random() - 0.5
        ),
      }));
      setQuestions(questions);
    }
    fetchData();
  }, []);

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  };

  return questions.length > 0 ? (
    <div className="container">
      {currentIndex >= questions.length ? (
        <h2 className="text-3xl text-black">
          Game ended! Your score is: {score}/10.
        </h2>
      ) : (
        <Question
          data={questions[currentIndex]}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default App;
