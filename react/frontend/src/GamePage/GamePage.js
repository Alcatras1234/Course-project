import React, {Component, useState, useCallback, useEffect, useContext, createContext} from 'react'
import './Gamepage.css';
import './index.css'



var ws = new WebSocket("ws://localhost:3005/ws")

function Game() {
    const [info, setInfo] = useState("");
    const [player, setPlayer] = useState(""); // надо для swaper
    const [currentPlayer, setCurPlayer] = useState(""); // надо для swaper
    const [gameOver, setGameOver] = useState(false);
    const [buttonColor, setButtomColor] = useState('white');
    let swaper = {
        "Black" : "Orange",
        "Orange" : "Black"
    }
    const updateCell = (id, color) => {
        let cell = document.getElementById(id);
        if (color == "#000000") {
            cell.classList.add('black-button');
        } else {
            cell.classList.add(color + 'orange-button');
        }
        
    }

    let winCombination = [
        // по горизонтали с лево не доходя до право
        [0, 1, 2, 9, 10],
        [3, 4, 5, 12, 13],
        [6, 7, 8, 15, 16],
        [18, 19, 20, 27, 28],
        [21, 22, 23, 30, 31],
        [24, 25, 26, 33, 34],
        // по горизонтали со 2 элемента и до конца
        [1, 2, 9, 10, 11],
        [4, 5, 12, 13, 14],
        [7, 8, 15, 16, 17],
        [19, 20, 27, 28, 29],
        [22, 23, 30, 31, 32],
        [25, 26, 33, 34, 35],
        // по вертикали с начала не доходя до концв
        [0, 3, 6, 18, 21],
        [1, 4, 7, 19, 22],
        [2, 5, 8, 20, 23],
        [9, 12, 15, 27, 30],
        [10, 13, 16, 28, 31],
        [11, 14, 17, 29, 32],
        // по вертикали со 2 элемента и до конца
        [3, 6, 18, 21, 24],
        [4, 7, 19, 22, 25],
        [5, 8, 20, 23, 26],
        [12, 15, 27, 30, 33],
        [13, 16, 28, 31, 34],
        [14, 17, 29, 32, 35],
        // по диагонали с левого края
        [0, 4, 8, 27, 31],
        [1, 5, 15, 28, 32],
        [3, 7, 20, 30, 34],
        //по диагонали со второго элемента левого края
        [4, 8, 27, 31, 35],
        //по диагонали с правого края с начала
        [11, 13, 15, 20, 22],
        [10, 12, 8, 19, 21],
        [14, 16, 27, 23, 25],
        //по диагонали со второго элемента правого края
        [13, 15, 20, 22, 24]
    ]

    
    const changePlayer = () => {
        
        console.log(player, currentPlayer);
        if (player == currentPlayer) {
            setInfo("Ваш ход");
            setCurPlayer(swaper[currentPlayer]);
        } else {
            setInfo("Сейчас ход вашего соперника");
            setCurPlayer(swaper[currentPlayer]);
        }

    }

    const paintAll = () => {
        for (let i = 1; i <= 36; i++) {
            document.getElementById(i).style.backgroundColor = 'white';
        }
    }

    const hightLightRow = () => {
        let cell = [];
        for (let i = 1; i <= 36; i++) {
            cell.push(document.getElementById(i));
        }
        winCombination.forEach((row) => {
            if (cell[row[0]].style.backgroundColor == cell[row[1]].style.backgroundColor
                && cell[row[0]].style.backgroundColor == cell[row[2]].style.backgroundColor 
                && cell[row[0]].style.backgroundColor == cell[row[3]].style.backgroundColor
                && cell[row[0]].style.backgroundColor == cell[row[4]].style.backgroundColor
                && cell[row[0]].style.backgroundColor == cell[row[5]].style.backgroundColor
                && cell[row[0]].style.backgroundColor != 'white') {
                    cell[row[0]].style.backgroundColor = "red";
                    cell[row[1]].style.backgroundColor = "red";
                    cell[row[2]].style.backgroundColor = "red";
                    cell[row[3]].style.backgroundColor = "red";
                    cell[row[4]].style.backgroundColor = "red";
                    return;
                }
        });
    }
   
    ws.onmessage = function (event) {
        var response = JSON.parse(event.data);
        if (response.init) {
            setInfo(response.message); // сообщение которое есть в JSON и там написано 'Ждите второго игрока' или ''
            setPlayer(response.player); // для первого игрока говорится, каким цветом он будет играть 
            if (response.message == '') { // если зашел второй игрок, то ему задается оранжевый цвет
                setPlayer(response.player); 
            }
            setCurPlayer("Black"); // цвет Игрока 
        } else {
            // Если был ход
            if (response.message == 'move') {
                updateCell(response.cell, response.color);
                changePlayer();
            // Ничья
            } else if (response.message == 'draw') {
                updateCell(response.cell, response.player); // отправляем клетку и чем играет игрок
                setInfo("НИЧЬЯ");
                paintAll();
                ws.close(1000); // Закрываем соединение
            }
            // Кто-то выйграл
            else if(response.message == 'won') {
                setInfo("Player " + response.player + " won!");
                updateCell(response.cell, response.player); // обновляем ячейку
                hightLightRow(); // Подсвечиваем линий, которая дала победную комбинацию
                ws.close(1000); // Закрываем соединение
            } else if (response.player == player && response.message == "Entered") {
                setInfo("Выберите другую ячейку");
            }
        }
    };

    ws.onclose = function (event) {
        if (event.code == 4000) {
            setInfo("Все места заняты");
        } else if (event.code != 1000) {
            setInfo("Error");
        }
        setGameOver(true);
    };

   
    const handleGame = (id) => {
        if (gameOver) {
            return;
        }
        var cell = document.getElementById(id);
        console.log(cell.style.backgroundColor);
        if (cell.style.backgroundColor === 'white' && player == currentPlayer) {
            ws.send(JSON.stringify({ player: player, cell: id }));
        } else {
            setInfo("Выберете свободную ячейку");
        }
        
    };
    return (
       <>
           <div className='containerIdButton1'>
                <button class='idetify_button1'></button>
           </div>
           <div className='containerIdButton2'>
                <button class='idetify_button2'></button>
           </div>
           <div className='container0'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('1')} className='idetify_button3' id='1' style={{ backgroundColor: buttonColor }}></button></td>
                            <td><button onClick={() => handleGame('2')} className='idetify_button3' id='2'></button></td>
                            <td><button onClick={() => handleGame('3')} className='idetify_button3' id='3'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('4')} className='idetify_button3'  id='4'></button></td>
                            <td><button onClick={() => handleGame('5')} className='idetify_button3'  id='5'></button></td>
                            <td><button onClick={() => handleGame('6')} className='idetify_button3'  id='6'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('7')} className='idetify_button3'  id='7'></button></td>
                            <td><button onClick={() => handleGame('8')} className='idetify_button3'  id='8'></button></td>
                            <td><button onClick={() => handleGame('9')} className='idetify_button3'  id='9'></button></td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className='container1'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('10')} className='idetify_button3' id='10'></button></td>
                            <td><button onClick={() => handleGame('11')} className='idetify_button3' id='11'></button></td>
                            <td><button onClick={() => handleGame('12')} className='idetify_button3' id='12'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('13')} className='idetify_button3'  id='13'></button></td>
                            <td><button onClick={() => handleGame('14')} className='idetify_button3'  id='14'></button></td>
                            <td><button onClick={() => handleGame('15')} className='idetify_button3'  id='15'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('16')} className='idetify_button3'  id='16'></button></td>
                            <td><button onClick={() => handleGame('17')} className='idetify_button3'  id='17'></button></td>
                            <td><button onClick={() => handleGame('18')} className='idetify_button3'  id='18'></button></td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className='container2'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('19')} className='idetify_button3' id='19'></button></td>
                            <td><button onClick={() => handleGame('20')} className='idetify_button3' id='20'></button></td>
                            <td><button onClick={() => handleGame('21')} className='idetify_button3' id='21'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('22')} className='idetify_button3'  id='22'></button></td>
                            <td><button onClick={() => handleGame('23')} className='idetify_button3'  id='23'></button></td>
                            <td><button onClick={() => handleGame('24')} className='idetify_button3'  id='24'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('25')} className='idetify_button3'  id='25'></button></td>
                            <td><button onClick={() => handleGame('26')} className='idetify_button3'  id='26'></button></td>
                            <td><button onClick={() => handleGame('27')} className='idetify_button3'  id='27'></button></td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className='container3'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('28')} className='idetify_button3' id='28'></button></td>
                            <td><button onClick={() => handleGame('29')} className='idetify_button3' id='29'></button></td>
                            <td><button onClick={() => handleGame('30')} className='idetify_button3' id='30'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('31')} className='idetify_button3'  id='31'></button></td>
                            <td><button onClick={() => handleGame('32')} className='idetify_button3'  id='32'></button></td>
                            <td><button onClick={() => handleGame('33')} className='idetify_button3'  id='33'></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('34')} className='idetify_button3'  id='34'></button></td>
                            <td><button onClick={() => handleGame('35')} className='idetify_button3'  id='35'></button></td>
                            <td><button onClick={() => handleGame('36')} className='idetify_button3'  id='36'></button></td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className='containerInfo'>
                <p className='game-nickName'>Текущий игрок: {player} </p>
                <p className='game-nickName'>Info: {info} </p> 
           </div>
   
        </>
    );
}

export default Game;