
export default function FinishScreen( {points, maxPoints, dispatch, highscore} ) {
const percentage = (points / maxPoints) * 100;

  return (
    <div className="finish-screen">
    <p>
      You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
    </p>
    <p>Highscore: {highscore}</p>
    <button className="btn" onClick={() => dispatch({type: 'restartQuiz'})}>Restart</button>
    </div>
  )
}
