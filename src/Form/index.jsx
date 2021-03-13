import React, {useContext} from 'react';
import logo1 from './logo1.png';
import logo2 from './logo2.png';
import logo3 from './logo3.png';
import logo4 from './logo4.jpeg';
import logo5 from './logo5.png';
import logo6 from './logo6.png';
import  {MyContext} from '../App';

const Form = () => {
    const {state, dispatch} = useContext(MyContext);
    const {email, name, surname, city, srteet, house, photo, password, confirmPassword, step, ligthTheme, } = state;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const {email, name, surname, city, srteet, house, photo, password, confirmPassword} = e.target.elements;
      const inputsArray = [email, name, surname, city, srteet, house, photo, password, confirmPassword];
      const allDone = [];
      inputsArray.forEach( (input, index) => {
        if(input){
          if(input.value){
              allDone[index]= true;
              input.className="input";
              input.placeholder = '';
            }else{
              if(input.name !== 'photo'){
                allDone[index] = false;
                input.className="ampty-input";
                input.placeholder = "Заполните поле";
              }
            }
        }
      });
      if(step === 3){
        state.photo ? dispatch({type: 'STEP_UP'}) : alert('Выберите фото');
      }else{
        if(step === 4){
          password.value === confirmPassword.value ? dispatch({type: 'STEP_UP'}) : alert("Пароли не совпадают");
        }else{
          let finalState = allDone.every(el => el === true);
          finalState &&  dispatch({type: 'STEP_UP'});
        }
      }
    };
  
    const handleStepDown = (e)=>{
      e.preventDefault();
      dispatch({type: 'STEP_DOWN'});
    };
  
    const handleChangeInput = (e) => {
      if(e.target.name === 'photo'){
        let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        dispatch({type: 'INPUT_DATA', payload:{[e.target.name]: reader.result, activeLogo: reader.result}});
      };
      }else{
        dispatch({type: 'INPUT_DATA', payload:{[e.target.name]: e.target.value}});
      }
    };
  
    const handlePickPhoto = (e) => {
      dispatch({type: 'INPUT_DATA', payload:{photo: e.target.src, activeLogo: e.target.src}});
    };
  
    const inputsDataArray = [[],
    [{name: 'name', type: 'text', value:name}, {name: 'surname', type: 'text', value:surname}, {name: 'email', type: 'email', value:email}], 
    [{name: 'city', type: 'text', value:city}, {name: 'srteet', type: 'text', value:srteet}, {name: 'house', type: 'text', value:house}], 
    [{name: 'photo', type: 'file', value:photo},], 
    [{name: 'password', type: 'password', value:password}, {name: 'confirmPassword', type: 'password', value:confirmPassword}]
    ];
    /* jshint ignore:start */
    return (
      <form id={"step-" + step} onSubmit={handleSubmit}>
      <h2>Step: {step}</h2>
      {inputsDataArray.map( (stepData, index) =>{
        if(state.step === index){
         return stepData.map((step) => {
            const name = step.name;
            const type = step.type;
            const value = step.value;
            const labelName = name === 'consfirmPasword' ? 'Confirm Password' : name[0].toUpperCase() + name.slice(1);
            return(
              <div key={'div' + name +'_id'}>
                {name !=='photo' && <label htmlFor={name} key={'label_' + name +'_id'}>{labelName}</label>}
                <input id={name} name={name} type={type} key={'input' + name +'_id'} onChange={handleChangeInput} value={name === 'photo' ? '' : value}/>
              </div>
            )   
          })
        } 
      })}
      {step === 3 && state.photo && <div className="chosen_logo">
            <h4>Your logo</h4>
            <img src={state.photo} alt="logo" className={ligthTheme ? "logo-img chosen dark" : "logo-img chosen"}/>
          </div>}
      {step === 3 && (<>
        <img src={logo1} onClick={handlePickPhoto} alt="logo1" className={!ligthTheme ? "logo-img" : "logo-img dark"}/> 
        <img src={logo2} onClick={handlePickPhoto} alt="logo1" className={!ligthTheme ? "logo-img" : "logo-img dark"}/>
        <img src={logo3} onClick={handlePickPhoto} alt="logo1" className={!ligthTheme ? "logo-img" : "logo-img dark"}/> 
        <img src={logo4} onClick={handlePickPhoto} alt="logo1" className={!ligthTheme ? "logo-img" : "logo-img dark"}/> 
        <img src={logo5} onClick={handlePickPhoto} alt="logo1" className={!ligthTheme ? "logo-img" : "logo-img dark"}/> 
        <img src={logo6} onClick={handlePickPhoto} alt="logo1" className={!ligthTheme ? "logo-img" : "logo-img dark"}/>
      </>
      )}
      {step !== 1 && <button onClick ={handleStepDown}>BACK</button>}
      <button  className="next_btn" type="submit">{step === 4 ? 'SUBMIT' :'NEXT'}</button>
    </form>
    )
  /* jshint ignore:end */
  };

  export default Form;
  