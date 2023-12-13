import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';

const initialState = {
questions: [],
status: 'loading',
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
        }


    default:
      throw new Error('Action is unknown');

}
};

export default function App() {
  const [{questions, status}, dispatch] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;

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
{status === 'active' && <Questions />}
      </Main>
    </div>
  )
}
