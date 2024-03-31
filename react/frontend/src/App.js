import React, { Component, useContext, useState, createContext } from 'react'
import MainPage from "./MainPage/MainPage.js";
import Room from "./RoomPage/RoomPage.js";
import Game from "./GamePage/GamePage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/multipl" element={<Room />} />
                <Route path="/game" element={<Game />} />
            </Routes>
      </BrowserRouter>
    );
}

export default App; 