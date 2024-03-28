import React, {Component, useState, useCallback, useEffect} from 'react'
import './MainPage.css';
import './index.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import uuid from 'react-uuid'


function MultiPlayer(){
}
function SinglePlayer() {}


function MainPage() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [data, setData] = useState([]);

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
        
     
        const generatedUserId = generateUserId();   // Генерация UUID для пользователя
        console.log(userId);
        
        
        
      
        
         
            try {
                const response = await fetch(`http://localhost:3001/api/checkId/${generatedUserId}`); // Запрос на то, есть ли пользователь в базе
                if (response.ok) { // Если да, то меняем старый ник на новый
                    console.log('id exist');
                    fetch(`http://localhost:3001/api/update/${generatedUserId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name: username})
                    });
                } else { //Если нету, то добавляем пользователя в БД 
                    console.log('no');
                    fetch(`http://localhost:3001/api/add/${generatedUserId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: generatedUserId, name: username })
                    });
                

                }
            } catch (error) { // Ошибки ловим
                console.log('error');
            }
        
       

        const formData = new FormData(event.target);
        const enteredUsername = formData.get('name');
        
        setUsername(enteredUsername);

     

        console.log(username);
    
        // Дополнительные действия после отправки формы, например, отправка данных на сервер
    };



   
    return (
       <>
           <div className='containerPlayer'>
                {data?.map(d => {
                    return(
                        <div key={d.id}>
                            <p className='game-nickName'>{d.name}</p>
                        </div>
                    )
                })}
            </div>
            <div className="container">
                <h1 className="game-title">PENTAGO</h1>
            </div>
           
            <div className="containerForMPButton">
                <button onClick={MultiPlayer} className="mpButton">Играть с другом</button> 
            </div>
           
           <div className="containerForSPButton">
               <button onClick={SinglePlayer} className="mpButton">Играть с ботом</button>
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