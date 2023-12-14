import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';

const initialState = {
questions: [],
status: 'loading',
currentIndex: 0,
answer: null,
points: 0,
};

function reducer(state, action) {
switch(action.type) {
  case 'dataReceived':
    return {
      ...state,
      questions: action.payload,
      status: 'ready'
    };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
      case 'startQuiz':
        return {
          ...state,
          status: 'active',
        };
        case 'newAnswer':
          const question = state.questions.at(state.currentIndex);

          return {
            ...state,
            answer: action.payload,
            points: action.payload === question.correctOption ? state.points + question.points : state.points,
          };
          case 'nextQuestion':
            return {
              ...state,
              currentIndex: state.currentIndex + 1,
              answer: null,
            }


    default:
      throw new Error('Action is unknown');

}
};

export default function App() {
  const [{questions, status, currentIndex, answer, points}, dispatch] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function() {
async function fetchQuestion() {
  try {
const res = await fetch('http://localhost:8000/questions');
const data = await res.json();
dispatch({type: 'dataReceived', payload: data});

  } catch(err) {
dispatch({type: 'dataFailed'})
  }
}

fetchQuestion();
  }, [])
  return (
    <div className='app'>
      <Header />

      <Main>
{status === 'loading' && <Loader />}
{status === 'error' && <Error />}
{status === 'ready' && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch} />}
{status === 'active' && (
  <>
  <Question currentQuestion={questions[currentIndex]} dispatch={dispatch} answer={answer} />
<NextButton dispatch={dispatch} answer={answer} />
<ProgressBar currentIndex={currentIndex} numberOfQuestions={numberOfQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
  </>
)

}


      </Main>
    </div>
  )
}
