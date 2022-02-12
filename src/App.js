import { useEffect, useState } from "react";
import Question from "./components/Question";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  console.log(questions);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQuestions(data.results);
    }
    fetchData();
  }, []);

  const handleAnswer = (answer) => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(currentIndex + 1);

    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }

    if (newIndex >= questions.length) {
      setGameEnded(true);
    }
  };

  return gameEnded ? (
    <h1>Your score is: {score}/10</h1>
  ) : questions.length > 0 ? (
    <div className="container">
      <Question data={questions[currentIndex]} handleAnswer={handleAnswer} />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default App;
