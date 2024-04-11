import React, {Component, useState, useCallback, useEffect, useContext, createContext} from 'react'
import './RoomPage.css';
import './index.css'
import uuid from 'react-uuid';

export default function Room() {
    const [userName, setUsername] = useState(localStorage.getItem('username'));
    const [userId, setUserId] = useState('');

    const generateUUID = () => {
        const generatedUserId = uuid();
        console.log(generatedUserId);
        setUserId(generatedUserId); // Устанавливаем сгенерированный userId в состояние
        return generatedUserId
    }


    const handleNavigate = () => {
        const generatedI = generateUUID()
        localStorage.setItem('username', userName);
        localStorage.setItem('userId', generatedI);
        window.location.assign(`game/${generatedI}`)
        
    };

    const handleEnterInGame = () => {
        localStorage.setItem('username', userName);
        window.location.assign(`enter`)
    }



    return (
        <>
                <div className='containerTitle1'>
                    <h1 className='game-title1'>Правила игры</h1>
                </div>
                <div className='containerRule'>
                    <p className='game-rule'>Вам нужно кликнуть на пустую ячейку</p> 
                    <p className='game-rule'>чтобы поставить ваш шарик, а затем,</p> 
                    <p className='game-rule'>нужно повернуть одно из полей. </p>
                    <p className='game-rule'>Для того чтобы выиграть,</p>
                    <p className='game-rule'>нужно собрать линию из 5 шаров</p>
                </div>
                <div className='container'>
                    <h1 className="game-title">КОМНАТЫ</h1>
                </div>
                <div className='containerPlayer'>
                    <h1 className="game-nickName">Ваш ник: {userName}</h1>
                </div>
                <div className="containerFor2PButton">
                    <button onClick={handleNavigate} className="mpButton">Создать комнату</button> 
                </div>
                <div className="containerFor1PButton">
                    <button onClick={handleEnterInGame} className="mpButton">Войти комнату</button> 
                </div>
               
           
               
              
        </>
    );
}