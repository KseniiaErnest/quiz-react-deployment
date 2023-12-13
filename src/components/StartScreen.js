import React from 'react'

export default function StartScreen( {numberOfQuestions, dispatch} ) {
  return (
    <div className='startScreen-container'>
      <h2>Welcome to the Land of the Rising Quiz!</h2>
      <h3>We prepared {numberOfQuestions} questions to test your knowledge about history of Japan. Let's see if you are a true samurai!</h3>
      <button className='btn' onClick={() => dispatch({type: 'startQuiz'})}>Start</button>

    </div>
  )
}
