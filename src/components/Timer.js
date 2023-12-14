import { useEffect } from "react"

export default function Timer( {dispath, seconds} ) {
  const minutes = Math.floor(seconds / 60);
  const restOfseconds = seconds % 60;

  useEffect(function() {

const timerId = setInterval(function() {
  dispath({type: 'timerGo'})
}, 1000);

// Cleaning-up function
return () => clearInterval(timerId);

  }, [dispath])

  return (
    <div className="timer-container">
      {minutes < 10 && '0'}{minutes}
      :
      {restOfseconds < 10 && '0'}{restOfseconds}
    </div>
  )
}
