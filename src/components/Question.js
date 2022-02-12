import React from "react";

const Question = ({
  handleAnswer,
  data: { question, correct_answer, incorrect_answers },
}) => {
  const shuffledAnswer = [correct_answer, ...incorrect_answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div>
      <div className="text-black-800 text-center p-4">
        <h2
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {shuffledAnswer.map((answer) => (
          <button
            className={`${
              correct_answer === answer ? "bg-green-300 p-4 rounded" : "bg-red-300 p-4 rounded"
            }`}
            onClick={() => handleAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
