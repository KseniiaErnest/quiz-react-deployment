import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
questions: [],
status: 'loading',
currentIndex: 0,
answer: null,
points: 0,
highscore: 0,
seconds: null,
};

const SECS_PER_QUESTION = 30;

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
          seconds: state.questions.length * SECS_PER_QUESTION,
        };
        case 'newAnswer':
          // const question = state.questions.at(state.currentIndex);
          const question = state.questions[state.currentIndex];

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
            };
            case 'finishQuiz':
              return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ? state.points : state.highscore,
              };
              case 'restartQuiz':
                return {
                  ...initialState,
                  questions: state.questions,
                  status: 'ready',
                };
                case 'timerGo':
                  return {
                    ...state,
                    seconds: state.seconds - 1,
                    status: state.seconds === 0 ? 'finished' : state.status,
                  };


    default:
      throw new Error('Action is unknown');

}
};

export default function App() {
  const [{questions, status, currentIndex, answer, points, highscore, seconds}, dispatch] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function() {
async function fetchQuestion() {
  try {
const res = await fetch('https://japanese-history-quiz-5d2198677274.herokuapp.com/questions');
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
{/* <NextButton dispatch={dispatch} answer={answer} currentIndex={currentIndex} numberOfQuestions={numberOfQuestions} /> */}
<ProgressBar currentIndex={currentIndex} numberOfQuestions={numberOfQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
<Footer>
  <Timer dispath={dispatch} seconds={seconds}/>
  <NextButton dispatch={dispatch} answer={answer} currentIndex={currentIndex} numberOfQuestions={numberOfQuestions} />
</Footer>
  </>
)
}
{status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} dispatch={dispatch} highscore={highscore}/>}


      </Main>
    </div>
  )
}
