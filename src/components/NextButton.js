
export default function NextButton( {dispatch, answer, currentIndex, numberOfQuestions} ) {
  if (answer === null) return null;

  if (currentIndex < numberOfQuestions - 1) {
    return (
      <button className="btn next-btn" onClick={() => dispatch({type: 'nextQuestion'})}>
        Next
      </button>
    )
  }
  
  if (currentIndex === numberOfQuestions - 1) {
    return (
      <button className="btn next-btn" onClick={() => dispatch({type: 'finishQuiz'})}>Finish</button>
    )
  }
}
