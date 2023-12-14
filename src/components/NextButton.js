
export default function NextButton( {dispatch, answer} ) {
  if (answer === null) return null;

  return (
    <button className="btn next-btn" onClick={() => dispatch({type: 'nextQuestion'})}>
      Next
    </button>
  )
}
