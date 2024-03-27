import React, {Component, useState, useCallback, useEffect} from 'react'
import './MainPage.css';
import './index.css'


function MultiPlayer(){
}
function SinglePlayer() {}


function MainPage() {
    const [username, setUsername] = useState('');
    const [data, setData] = useState();

    const handleNickNameChange = useCallback((event) => { //сохраняет состояние того, что пользователь написал внурь приложения(у меня это поле ввода формы).
        setUsername(event.target.value); // хранится то, что пользователь вписал в форму
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

   

    const fetchData = async() => {
        try {
            const response = await fetch('http://localhost:3001/api/data')
            const jsonData = await response.json()
            setData(jsonData)
            console.log(jsonData)
        } catch(error) {
            console.log('Error', error)
        }
    }

    const fetchPOST = (e) => {
        
        try {
            e.preventDefault();
            fetch('http://localhost:3001/api/post_username', {
                method: 'POST',
                body: JSON.stringify({
                    name: username
                })
            }).then(res => {return res.json()}).then(res => console.log(res));
        } catch (error) {
            console.log('Error', error)
        }
    }


   
    return (
       <>
           <div className='containerPlayer'>
                <div className="game-nickName">{data.name}</div>
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
               <form onSubmit={fetchPOST} className="form" id="mars-once" action="/apply/">
                   <div>
                       <label>
                           <h3>Введите свой ник:</h3>
                           <input onChange={handleNickNameChange} className="form_input" type="text" name="name" id="name" placeholder="AMOGUS" required autofocus/>
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