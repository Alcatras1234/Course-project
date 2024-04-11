import React, {Component, useState, useCallback, useEffect, useContext, createContext} from 'react'
import './EnterInGamePage.css';
import './index.css'

function Enter() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userId = formData.get('name');
        window.location.assign(`${userId}`)
    }

    return (
        <div className="containerForm1">
               <form onSubmit={handleSubmit} className="form" id="mars-once" action="/apply/">
                   <div>
                       <label>
                           <h3>Введите ссылку на игру:</h3>
                           <input className="form_input" type="text" name="name" id="name" placeholder="Ссылка на игру" required autofocus/>
                       </label>
                   </div>
                   <div>
                       <input type="submit" value="Отправить" className="formButton"/>
                   </div>
               </form>
        </div>
    );
}

export default Enter;