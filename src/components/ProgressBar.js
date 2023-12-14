
export default function ProgressBar( {currentIndex, numberOfQuestions, points, maxPoints, answer} ) {
  return (
    <div className="progress-container">
    <progress max={numberOfQuestions} value={currentIndex + Number(answer !== null)}></progress>
    <div>
      <p>Question <strong>{currentIndex + 1}</strong> / {numberOfQuestions}</p>
      <p><strong>{points} / {maxPoints}</strong></p>
    </div>
    </div>
  )
}
