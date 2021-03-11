import React, {useReducer} from 'react';
import './App.css';
import logo1 from './logo1.png';
import logo2 from './logo2.png';
import logo3 from './logo3.png';
import logo4 from './logo4.jpeg';
import logo5 from './logo5.png';
import logo6 from './logo6.png';


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
  counter: 0,
  activeLogo: '',
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
      counter: state.counter+1,
    };
  }
  if(action.type === 'STEP_DOWN'){
    return{
      ...state,
      counter: state.counter-1,
    };
  }
  if(action.type === 'SUBMIT'){
    
    return{
      ...state,
      counter: state.counter+1,
    };
    
  }
  return state;
};


function App() {
  const [state, dispatch] = useReducer(reduser, initialState);
  const {name, surname, email, city, srteet, house, photo, password, confirmPassword, counter, activeLogo} = state;


  const handleChangeInput = (e) => {
    dispatch({type: 'INPUT_DATA', payload:{[e.target.name]: e.target.value}})
  };

  const handleStepUp = (e)=>{
    const allDone = [];
    const inputsArray = e.target.parentNode.elements;
    if(inputsArray && counter !==3){
      for(let index in inputsArray){
        if(inputsArray[index].nodeName === "INPUT"){
            if(inputsArray[index].value !== '' || inputsArray[index].value !== ""){
              e.preventDefault();
              allDone[index]= true;
              inputsArray[index].className="input";
              inputsArray[index].placeholder = '';

            }else{
              e.preventDefault();
              allDone[index] = false;
              inputsArray[index].className="ampty-input";
              inputsArray[index].placeholder = "Заполните поле";
            }
        }
      }
    }
    if(counter === 0 || counter === 3){
      if(counter === 3){
        e.preventDefault();
        photo ? dispatch({type: 'STEP_UP'}) : alert('Выберите фото');
      }else{
        e.preventDefault();
        dispatch({type: 'STEP_UP'});
      }
    }else{
      let finalState = allDone.some(el => el === false)
      if(!finalState){
        e.preventDefault();
        dispatch({type: 'STEP_UP'});
      }
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!password){
      alert('Необходимо заполнить все поля');
    }else{
      if(password !== confirmPassword){
        alert("Пароли не совпадают");
      }else{
        dispatch({type: 'SUBMIT'});
      }
    }
  };
  const handleStepDown = (e)=>{
    e.preventDefault();
    dispatch({type: 'STEP_DOWN'});
  };

  const handleUploadPhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function() {
      dispatch({type: 'INPUT_DATA', payload:{[e.target.name]: reader.result, activeLogo: reader.result}});
    };
  };

  const handlePickPhoto = (e) => {
    dispatch({type: 'INPUT_DATA', payload:{photo: e.target.src, activeLogo: e.target.src}});
  };

  return (<>
  {counter===0 ? 
  (<button 
    className="start_registration_btn" 
    onClick={handleStepUp}>Start Registration</button>) :
   <div className="App">
      {counter===1 && <form id="step-1">
        <h2>Step: 1</h2>
        <div>
          <label htmlFor='name'>Name</label>
          <input 
          type='text'
          id='name' 
          name='name'
          value={name}
          onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor='name'>Surname</label>
          <input 
          type='text'
          id='surname' 
          name='surname'
          value={surname}
          onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor='name'>Email</label>
          <input 
          type='text'
          id='email' 
          name='email'
          value={email}
          onChange={handleChangeInput}/>
        </div>
        <button onClick ={handleStepUp} className="next_btn">NEXT</button>
      </form>
}
      {counter===2 && <form id="step-2">
      <h2>Step: 2</h2>
        <div>
          <label htmlFor='city'>City</label>
          <input 
          type='text'
          id='city' 
          name='city'
          value={city}
          onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor='srteet'>Srteet</label>
          <input 
          type='text'
          id='srteet' 
          name='srteet'
          value={srteet}
          onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor='house'>House</label>
          <input 
          type='text'
          id='house' 
          name='house'
          value={house}
          onChange={handleChangeInput}/>
        </div>
        <button onClick ={handleStepDown}>BACK</button>
        <button onClick ={handleStepUp} className="next_btn">NEXT</button>
      </form>
}   
      {counter===3 && <form id="step-3">
        <h2>Step: 3</h2>
         <div>
          <label htmlFor='photo'>Upload Photo</label>
          <input 
          type='file'
          id='photo' 
          name='photo'
          onChange={handleUploadPhoto}/>
        </div>
        {photo && <div className="chosen_logo">
          <h4>Your logo</h4>
          <img src={photo} alt="logo" className="logo-img chosen"/>
        </div>}
        <img src={logo1} onClick={handlePickPhoto} alt="logo1" className="logo-img"/> 
        <img src={logo2} onClick={handlePickPhoto} alt="logo1" className="logo-img"/> 
        <img src={logo3} onClick={handlePickPhoto} alt="logo1" className="logo-img"/> 
        <img src={logo4} onClick={handlePickPhoto} alt="logo1" className="logo-img"/> 
        <img src={logo5} onClick={handlePickPhoto} alt="logo1" className="logo-img"/> 
        <img src={logo6} onClick={handlePickPhoto} alt="logo1" className="logo-img"/> 
        <button onClick ={handleStepDown}>BACK</button>
        <button onClick ={handleStepUp} className="next_btn">NEXT</button>
      </form>
}   
      {counter===4 && <form id="step-4">
        <h2>Step: 4</h2>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
          type='password'
          id='password' 
          name='password'
          value={password}
          onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input 
          type='password'
          id='confirmPassword' 
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChangeInput}/>
        </div>
        <button onClick ={handleStepDown}>BACK</button>
        <button onClick ={handleSubmit} className="next_btn">SUBMIT</button>
      </form>
}   
      {counter===5 && <div id="thank_you">
        <h2>Thank you for registration</h2>
        <img src={photo} alt="avatar"/>
        <h3>Contact information</h3>
        <div className="contact_information">
          <div>
          <p>Name:</p> <p>{name}</p>
          </div>
          <div>
            <p>Surname:</p> <p>{surname}</p>
          </div>
          <div>
            <p>Email:</p> <p>{email}</p>
          </div>
          <div>
            <p>City:</p> <p>{city}</p>
          </div>
          <div>
            <p>Srteet:</p> <p>{srteet}</p>
          </div>
          <div>
            <p>House:</p> <p>{house}</p>
          </div>
        </div>
      </div>
}   
    </div>
  }
</>)
}

export default App;
