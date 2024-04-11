import React, {Component, useState, useCallback, useEffect, useContext, createContext} from 'react'
import './MainPage.css';
import './index.css'

import uuid from 'react-uuid';


function MainPage() {

    const [username, setUsername] = useState('');

    const handleSubmit = async (event) => { 
        event.preventDefault();//чтобы не обновлялось
        
        const formData = new FormData(event.target);
        const enteredUsername = formData.get('name');
        
        setUsername(enteredUsername);

        console.log(username);



        // const generatedUserId = generateUserId();   // Генерация UUID для пользователя
        // console.log(userId);
        
        
        
        alert("Вы успешно задали свой ник!!!")
        //setUserId(generatedUserId);

       
        

        console.log(username);
        
    };



    const handleNavigateMP = () => {
        if (username == '') {
            alert("Нельзя играть без ника")
        }else {
            localStorage.setItem('username', username);
            //localStorage.setItem('userId', userId);
            window.location.assign('multipl')
        }
    };
   
    return (
       <>
            <div className="container">
                <h1 className="game-title">PENTAGO</h1>
            </div>
           
            <div className="containerForMPButton">
                <button onClick={handleNavigateMP} className="mpButton">Играть с другом</button> 
            </div>
           
           <div className="containerForm">
               <form onSubmit={handleSubmit} className="form" id="mars-once" action="/apply/">
                   <div>
                       <label>
                           <h3>Введите свой ник:</h3>
                           <input className="form_input" type="text" name="name" id="name" placeholder="AMOGUS" required autofocus/>
                       </label>
                   </div>
                   <div>
                       <input type="submit" value="Отправить" className="formButton"/>
                   </div>
               </form>
           </div>
   
        </>
    );
}

export default MainPage;