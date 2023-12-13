import React from 'react';
import Options from './Options';

export default function Question( {currentQuestion, dispatch, answer} ) {
  return (
    <div className='question-container'>
      <h4>{currentQuestion.question}</h4>
<Options currentQuestion={currentQuestion} dispatch={dispatch} answer={answer} />
    </div>
  )
}
