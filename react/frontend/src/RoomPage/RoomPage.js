import React, {Component, useState, useCallback, useEffect, useContext, createContext} from 'react'
import './RoomPage.css';
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function Room() {
    const [userName, setUsername] = useState(localStorage.getItem('username'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    const handleNavigate = () => {
        localStorage.setItem('username', userName);
        localStorage.setItem('userId', userId);
        window.location.assign('game')
        
    };

    return (
        <>
                <div className='container'>
                    <h1 className="game-title">КОМНАТЫ</h1>
                </div>
                <div className='containerPlayer'>
                    <h1 className="game-nickName">Ваш ник: {userName}</h1>
                </div>
                <div className="containerFor2PButton">
                    <button onClick={handleNavigate} className="mpButton">КОМНАТА №1</button> 
                </div>
           
                <div className="containerFor1PButton">
                    <button onClick={handleNavigate} className="mpButton">КОМНАТА №2</button>
                </div>
        </>
    );
}