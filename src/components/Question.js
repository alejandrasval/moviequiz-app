import React from "react";

const Question = ({
  handleAnswer,
  showAnswers,
  handleNextQuestion,
  data: { question, correct_answer, answers },
}) => {
  return (
    <div className="flex flex-col">
      <div className="text-black-800 text-center p-4">
        <h2
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {answers.map((answer, id) => {
          const textColor = showAnswers
            ? answer === correct_answer
              ? "text-green-500"
              : "text-red-500"
            : "text-black";
          return (
            <button
              key={id}
              className={`${textColor} bg-gray-50 p-4 rounded-2xl border-2 border-gray-300`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {showAnswers && (
        <button
          onClick={handleNextQuestion}
          className="ml-auto bg-gray-400 p-4 rounded text-white mt-4"
        >
          Next question
        </button>
      )}
    </div>
  );
};

export default Question;
