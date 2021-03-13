import React, {useContext} from 'react';
import  {MyContext} from '../App';

const FinalPage = () => {
    const {state} = useContext(MyContext);
    const {photo, name, surname, email, city, srteet, house, ligthTheme} = state;
    return (
      <div id="thank_you">
          <h2>Thank you for registration</h2>
          <img src={photo} alt="avatar" className={!ligthTheme ? "final-logo" : "final-logo dark"}/>
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
    )
}

export default FinalPage;