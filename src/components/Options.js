import React from "react";

export default function Options({ currentQuestion, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options-container">
      {currentQuestion.options.map((option, index) => (
        <button
          className={`btn option ${index === answer ? 'answerChosen' : ''} ${hasAnswered ? index === currentQuestion.correctOption ? 'correctAnswer' : 'wrongAnswer' : ''}`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
