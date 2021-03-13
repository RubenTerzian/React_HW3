import React, {useReducer} from 'react';
import './App.css';
import Form from './Form';
import FinalPage from './FinalPage';
export const MyContext = React.createContext();


const initialState = {
  name: '',
  surname: '',
  email: '',
  city: '',
  srteet: '',
  house: '',
  photo: '',
  password: '',
  confirmPassword: '',
  step: 0,
  ligthTheme: false,
};

const reduser = (state, action)=>{
  if(action.type === 'INPUT_DATA'){
    return{
      ...state,
      ...action.payload,
    };
  }
  if(action.type === 'STEP_UP'){
    return{
      ...state,
      step: state.step+1,
    };
  }
  if(action.type === 'STEP_DOWN'){
    return{
      ...state,
      step: state.step-1,
    };
  }
  if(action.type === 'SWITCH_THEME'){
    return{
  
      ...state,
      ligthTheme: !state.ligthTheme,
    }
  }
  return state;
};

function App() {
  const [state, dispatch] = useReducer(reduser, initialState);
  const {step, ligthTheme} = state;

  const switchTheme = (e) =>{
    dispatch({type: "SWITCH_THEME"})
    e.target.parentNode.className = ligthTheme ? '' : 'dark';
  }

  /* jshint ignore:start */
  return (
    <MyContext.Provider value={{state, dispatch}}>
      <button className="theme_switcher" onClick={switchTheme}>
        Switch theme
      </button>
      {step === 0 && <button 
        className="start_registration_btn" 
        onClick={e => dispatch({type: 'STEP_UP'})}>Start Registration</button>}
       
       {step >0 && step <6 && (
       <div className="App">
        {step <5 && <Form/>}
        {step === 5  && <FinalPage/>}
      </div>)}


    </MyContext.Provider>
  )
/* jshint ignore:end */
}

export default App;
