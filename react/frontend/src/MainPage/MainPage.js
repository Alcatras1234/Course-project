import React, {Component, useState, useCallback, useEffect, useContext, createContext} from 'react'
import './MainPage.css';
import './index.css'

import uuid from 'react-uuid';


function MainPage() {

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');


    const generateUserId = () => {
        if (!userId) { // Проверяем, был ли userId уже сгенерирован
            const generatedUserId = uuid();
            console.log(generatedUserId);
            setUserId(generatedUserId); // Устанавливаем сгенерированный userId в состояние
            return generatedUserId;
        }
        return userId; // Если userId уже сгенерирован, возвращаем его из состояния
    };

  
    const handleSubmit = async (event) => { 
        event.preventDefault();//чтобы не обновлялось
        
        const formData = new FormData(event.target);
        const enteredUsername = formData.get('name');
        
        setUsername(enteredUsername);

        console.log(username);



        const generatedUserId = generateUserId();   // Генерация UUID для пользователя
        console.log(userId);
        
        
        
        alert("Вы успешно задали свой ник!!!")
      
        
         
           /* try {
                const response = await fetch(`http://localhost:3001/api/checkId/${generatedUserId}`); // Запрос на то, есть ли пользователь в базе
                if (response.ok) { // Если да, то меняем старый ник на новый
                    console.log('id exist');
                    fetch(`http://localhost:3001/api/update/${generatedUserId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name: enteredUsername})
                    });
                 
                } else { //Если нету, то добавляем пользователя в БД 

                    
                    fetch(`http://localhost:3001/api/add/${generatedUserId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                       
                        body: JSON.stringify({ user_id: generatedUserId, name: enteredUsername})
                    });
                    alert("Вы успешно задали свой ник!!!")
                    console.log('no');
                

                }
            } catch (error) { // Ошибки ловим
                console.log('error');
            }
        */
        setUserId(generatedUserId);

       
        

        console.log(username);
        // Дополнительные действия после отправки формы, например, отправка данных на сервер
    };



    const handleNavigateMP = () => {
        if (username == '') {
            alert("Нельзя играть без ника")
        }else {
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId);
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
           
           <div className="containerForSPButton">
               <button onClick={handleNavigateMP} className="mpButton">Играть с ботом</button>
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