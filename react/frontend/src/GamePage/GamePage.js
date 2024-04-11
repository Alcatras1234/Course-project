import React, {Component, useState, useCallback, useEffect, useContext, createContext} from 'react'
import './Gamepage.css';
import './index.css'


var gameId = localStorage.getItem('userId'); 
console.log(gameId);
var ws = new WebSocket(`ws://localhost:3005/ws/${gameId}`) //
//localStorage.setItem('userId', '');

function Game() {
    const [info, setInfo] = useState("");
    const [player, setPlayer] = useState(""); // надо для swaper
    const [currentPlayer, setCurPlayer] = useState(""); // надо для swaper
    const [gameOver, setGameOver] = useState(false);
    const [buttonColor, setButtomColor] = useState('white');
    const [rotateMadeBlack, setRotateMadeBlack] = useState(false);
    const [rotateMadeOrange, setRotateMadeOrange] = useState(false);
    const [copied, setCopied] = useState(false);

    let swaper = {
        "Black" : "Orange",
        "Orange" : "Black"
    }

    
    
      
    const copyToClipboard = () => {
        const linkToCopy = window.location.href;
        navigator.clipboard.writeText(linkToCopy)
        .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        })
        .catch((error) => {
            console.error('Failed to copy:', error);
      });
    }
    

    const updateCell = (id, color) => {
        let cell = document.getElementById(id);
        if (cell) {
            if (color == "Black") {
                cell.style.backgroundColor = 'black';
            } else {
                cell.style.backgroundColor = '#FF8C00';  
            }
            if (currentPlayer === 'Black') {
                setRotateMadeBlack(true);
                setRotateMadeOrange(false);
            } else {
                setRotateMadeOrange(true);
                setRotateMadeBlack(false);
            }
        } else {
            console.error("Нету")
        }
        
        
    }
    const rotateHalf = (id) => {
        console.log("Enter")
        if (id == "R1") {  
            let temp3Style = document.getElementById(3).style.backgroundColor;
            let temp9Style = document.getElementById(9).style.backgroundColor;
            let temp7Style = document.getElementById(7).style.backgroundColor;
            let temp6Style = document.getElementById(6).style.backgroundColor;
            let temp8Style = document.getElementById(8).style.backgroundColor;
            let temp4Style = document.getElementById(4).style.backgroundColor;

            document.getElementById(3).style.backgroundColor = document.getElementById(1).style.backgroundColor;
            document.getElementById(9).style.backgroundColor = temp3Style;
            document.getElementById(7).style.backgroundColor = temp9Style;
            document.getElementById(1).style.backgroundColor = temp7Style;
            
            document.getElementById(6).style.backgroundColor = document.getElementById(2).style.backgroundColor;
            document.getElementById(8).style.backgroundColor = temp6Style;
            document.getElementById(4).style.backgroundColor = temp8Style;
            document.getElementById(2).style.backgroundColor = temp4Style;

           
        }
        else if (id == "L1") {
            console.log("l1")
            let temp1Style = document.getElementById(1).style.backgroundColor;
            let temp9Style = document.getElementById(9).style.backgroundColor;
            let temp7Style = document.getElementById(7).style.backgroundColor;
            let temp2Style = document.getElementById(2).style.backgroundColor;
            let temp8Style = document.getElementById(8).style.backgroundColor;
            let temp4Style = document.getElementById(4).style.backgroundColor;

            document.getElementById(1).style.backgroundColor = document.getElementById(3).style.backgroundColor;
            document.getElementById(7).style.backgroundColor = temp1Style;
            document.getElementById(9).style.backgroundColor = temp7Style;
            document.getElementById(3).style.backgroundColor = temp9Style;
            
            document.getElementById(2).style.backgroundColor = document.getElementById(6).style.backgroundColor;
            document.getElementById(4).style.backgroundColor = temp2Style;
            document.getElementById(8).style.backgroundColor = temp4Style;
            document.getElementById(6).style.backgroundColor = temp8Style;
        }

        if (id == "R2") {  
            let temp12Style = document.getElementById(12).style.backgroundColor;
            let temp18Style = document.getElementById(18).style.backgroundColor;
            let temp16Style = document.getElementById(16).style.backgroundColor;
            let temp15Style = document.getElementById(15).style.backgroundColor;
            let temp17Style = document.getElementById(17).style.backgroundColor;
            let temp13Style = document.getElementById(13).style.backgroundColor;

            document.getElementById(12).style.backgroundColor = document.getElementById(10).style.backgroundColor;
            document.getElementById(18).style.backgroundColor = temp12Style;
            document.getElementById(16).style.backgroundColor = temp18Style;
            document.getElementById(10).style.backgroundColor = temp16Style;
            
            document.getElementById(15).style.backgroundColor = document.getElementById(11).style.backgroundColor;
            document.getElementById(17).style.backgroundColor = temp15Style;
            document.getElementById(13).style.backgroundColor = temp17Style;
            document.getElementById(11).style.backgroundColor = temp13Style;
        }
        else if (id == "L2") {
            console.log("l1")
            let temp10Style = document.getElementById(10).style.backgroundColor;
            let temp18Style = document.getElementById(18).style.backgroundColor;
            let temp16Style = document.getElementById(16).style.backgroundColor;
            let temp11Style = document.getElementById(11).style.backgroundColor;
            let temp17Style = document.getElementById(17).style.backgroundColor;
            let temp13Style = document.getElementById(13).style.backgroundColor;

            document.getElementById(10).style.backgroundColor = document.getElementById(12).style.backgroundColor;
            document.getElementById(16).style.backgroundColor = temp10Style;
            document.getElementById(18).style.backgroundColor = temp16Style;
            document.getElementById(12).style.backgroundColor = temp18Style;
            
            document.getElementById(11).style.backgroundColor = document.getElementById(15).style.backgroundColor;
            document.getElementById(13).style.backgroundColor = temp11Style;
            document.getElementById(17).style.backgroundColor = temp13Style;
            document.getElementById(15).style.backgroundColor = temp17Style;
        }

        if (id == "R3") {  
            let temp21Style = document.getElementById(21).style.backgroundColor;
            let temp27Style = document.getElementById(27).style.backgroundColor;
            let temp25Style = document.getElementById(25).style.backgroundColor;
            let temp24Style = document.getElementById(24).style.backgroundColor;
            let temp26Style = document.getElementById(26).style.backgroundColor;
            let temp22Style = document.getElementById(22).style.backgroundColor;

            document.getElementById(21).style.backgroundColor = document.getElementById(19).style.backgroundColor;
            document.getElementById(27).style.backgroundColor = temp21Style;
            document.getElementById(25).style.backgroundColor = temp27Style;
            document.getElementById(19).style.backgroundColor = temp25Style;
            
            document.getElementById(24).style.backgroundColor = document.getElementById(20).style.backgroundColor;
            document.getElementById(26).style.backgroundColor = temp24Style;
            document.getElementById(22).style.backgroundColor = temp26Style;
            document.getElementById(20).style.backgroundColor = temp22Style;
        }

        else if (id == "L3") {
            let temp19Style = document.getElementById(19).style.backgroundColor;
            let temp27Style = document.getElementById(27).style.backgroundColor;
            let temp25Style = document.getElementById(25).style.backgroundColor;
            let temp20Style = document.getElementById(20).style.backgroundColor;
            let temp26Style = document.getElementById(26).style.backgroundColor;
            let temp22Style = document.getElementById(22).style.backgroundColor;

            document.getElementById(19).style.backgroundColor = document.getElementById(21).style.backgroundColor;
            document.getElementById(25).style.backgroundColor = temp19Style;
            document.getElementById(27).style.backgroundColor = temp25Style;
            document.getElementById(21).style.backgroundColor = temp27Style;
            
            document.getElementById(20).style.backgroundColor = document.getElementById(24).style.backgroundColor;
            document.getElementById(22).style.backgroundColor = temp20Style;
            document.getElementById(26).style.backgroundColor = temp22Style;
            document.getElementById(24).style.backgroundColor = temp26Style;
        }

        if (id == "R4") {  
            let temp30Style = document.getElementById(30).style.backgroundColor;
            let temp36Style = document.getElementById(36).style.backgroundColor;
            let temp34Style = document.getElementById(34).style.backgroundColor;
            let temp33Style = document.getElementById(33).style.backgroundColor;
            let temp35Style = document.getElementById(35).style.backgroundColor;
            let temp31Style = document.getElementById(31).style.backgroundColor;

            document.getElementById(30).style.backgroundColor = document.getElementById(28).style.backgroundColor;
            document.getElementById(36).style.backgroundColor = temp30Style;
            document.getElementById(34).style.backgroundColor = temp36Style;
            document.getElementById(28).style.backgroundColor = temp34Style;
            
            document.getElementById(33).style.backgroundColor = document.getElementById(29).style.backgroundColor;
            document.getElementById(35).style.backgroundColor = temp33Style;
            document.getElementById(31).style.backgroundColor = temp35Style;
            document.getElementById(29).style.backgroundColor = temp31Style;
        }

        else if (id == "L4") {
            let temp28Style = document.getElementById(28).style.backgroundColor;
            let temp36Style = document.getElementById(36).style.backgroundColor;
            let temp34Style = document.getElementById(34).style.backgroundColor;
            let temp29Style = document.getElementById(29).style.backgroundColor;
            let temp35Style = document.getElementById(35).style.backgroundColor;
            let temp31Style = document.getElementById(31).style.backgroundColor;

            document.getElementById(28).style.backgroundColor = document.getElementById(30).style.backgroundColor;
            document.getElementById(34).style.backgroundColor = temp28Style;
            document.getElementById(36).style.backgroundColor = temp34Style;
            document.getElementById(30).style.backgroundColor = temp36Style;
            
            document.getElementById(29).style.backgroundColor = document.getElementById(33).style.backgroundColor;
            document.getElementById(31).style.backgroundColor = temp29Style;
            document.getElementById(35).style.backgroundColor = temp31Style;
            document.getElementById(33).style.backgroundColor = temp35Style;
        }
        console.log(document.getElementById(28))
        console.log(document.getElementById(29))
        console.log(document.getElementById(30))
        console.log(document.getElementById(31))
        console.log(document.getElementById(32))
        console.log(document.getElementById(33))
        console.log(document.getElementById(34))
        console.log(document.getElementById(35))
        console.log(document.getElementById(36))
        
    }

    const setMoveInfo = () => {
        if (player == currentPlayer) {
            setInfo("Ваш ход");
            //console.log(currentPlayer);
        } else {
            setInfo("Сейчас ход вашего соперника");
            
        }
    }
    
    const changePlayer = () => {
        
        
        const color = swaper[currentPlayer];
        
        setCurPlayer(swaper[currentPlayer]);

    }

    const paintAll = () => {
        for (let i = 1; i <= 36; i++) {
            document.getElementById(i).style.backgroundColor = 'white';
        }
    }

    const hightLightRow = (row) => {
        console.log(row)
        row.forEach((i) => {
            document.getElementById(i + 1).style.backgroundColor = 'red';
        });
    }
   
    ws.onmessage = function (event) {
        var response = JSON.parse(event.data);
        console.log(response);
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
                updateCell(response.cell, response.player); // обновление цвета кружка
                changePlayer();        
            // Ничья
            }else if (response.win == "won_rotate") {
                console.log(response);
                setInfo("Player " + response.player + " won!");
                rotateHalf(response.rotate);
                console.log(response.wonComb);
                hightLightRow(response.wonComb); // Подсвечиваем линий, которая дала победную комбинацию
                ws.close(1000); // Закрываем соединение
            } 
            else if (response.message == 'draw') {
                updateCell(response.cell, response.player); // отправляем клетку и чем играет игрок
                setInfo("НИЧЬЯ");
                paintAll();
                ws.close(1000); // Закрываем соединение
            }
            // Кто-то выйграл
            else if(response.message == 'won') {
                setInfo("Player " + response.player + " won!");
                console.log(response.cell);
                updateCell(response.cell, response.player); // обновляем ячейку
                
                hightLightRow(response.wonComb); // Подсвечиваем линий, которая дала победную комбинацию
                ws.close(1000); // Закрываем соединение
            }else if (response.rotate != null) {
                setMoveInfo();
                rotateHalf(response.rotate);
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

    const handleRotate = (id1) => {
       
        setRotateMadeBlack(false);
        setRotateMadeOrange(false);
        ws.send(JSON.stringify({rotate: id1, player: currentPlayer}))
        
     
    }
   
    const handleGame = (id) => {
        //console.log(id)
        if (gameOver) {
            return;
        }
       
        var cell = document.getElementById(id);
        
        //console.log(cell.style.backgroundColor);
        if (cell.style.backgroundColor === 'white' && player == currentPlayer) {
            //console.log('if')
           
            ws.send(JSON.stringify({ player: player, cell: id, rotate:""}));
            
        } else {
           // console.log(
               // 'else'
            //)
            setInfo("Выберете свободную ячейку");
        }
    };

    const handleExit = () => {
        window.location.assign(`/multipl`)
    }
    return (
       <>
           
           <div className='containerIdButton1'>
                <button className='idetify_button1'></button>
           </div>
           <div className='containerIdButton2'>
                <button className='idetify_button2'></button>
           </div>
           <div className='containerCopy'>
                <button className='mpButton5' onClick={copyToClipboard}>{copied ? 'Скопировано!' : 'Копировать ссылку'}</button>
            </div>
            {player === "Black" && rotateMadeBlack && (
                <>
                    <div className='containerRoutateButton1Right'>
                        <button onClick={() => handleRotate('R1')} className='mpButton4' >⮕</button>
                    </div>
                    <div className='containerRoutateButton1Left'>
                        <button onClick={() => handleRotate('L1')} className='mpButton4'>⬇</button>
                    </div>

                    <div className='containerRoutateButton2Right'>
                        <button onClick={() => handleRotate('R2')} className='mpButton4' >⬇</button>
                    </div>
                    <div className='containerRoutateButton2Left'>
                        <button onClick={() => handleRotate('L2')} className='mpButton4'>⬅</button>
                    </div>

                    <div className='containerRoutateButton3Right'>
                        <button onClick={() => handleRotate('R4')} className='mpButton4' >⬅</button>
                    </div>
                    <div className='containerRoutateButton3Left'>
                        <button onClick={() => handleRotate('L4')} className='mpButton4'>⬆</button>
                    </div>

                    <div className='containerRoutateButton4Right'>
                        <button onClick={() => handleRotate('R3')} className='mpButton4' >⬆</button>
                    </div>
                    <div className='containerRoutateButton4Left'>
                        <button onClick={() => handleRotate('L3')} className='mpButton4'>⮕</button>
                    </div>
                </>
            )}

            {player === "Orange" && rotateMadeOrange && (
                 <>
                    <div className='containerRoutateButton1Right'>
                        <button onClick={() => handleRotate('R1')} className='mpButton4' >⮕</button>
                    </div>
                    <div className='containerRoutateButton1Left'>
                        <button onClick={() => handleRotate('L1')} className='mpButton4'>⬇</button>
                    </div>

                    <div className='containerRoutateButton2Right'>
                        <button onClick={() => handleRotate('R2')} className='mpButton4' >⬇</button>
                    </div>
                    <div className='containerRoutateButton2Left'>
                        <button onClick={() => handleRotate('L2')} className='mpButton4'>⬅</button>
                    </div>

                    <div className='containerRoutateButton3Right'>
                        <button onClick={() => handleRotate('R4')} className='mpButton4' >⬅</button>
                    </div>
                    <div className='containerRoutateButton3Left'>
                        <button onClick={() => handleRotate('L4')} className='mpButton4'>⬆</button>
                    </div>

                    <div className='containerRoutateButton4Right'>
                        <button onClick={() => handleRotate('R3')} className='mpButton4' >⬆</button>
                    </div>
                    <div className='containerRoutateButton4Left'>
                        <button onClick={() => handleRotate('L3')} className='mpButton4'>⮕</button>
                    </div>
             </>
            )}

            <div className='containerExit'>
                <button onClick={handleExit} className='mpButton5'> Выход </button>
            </div>





           <div className='container0'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('1')} className='idetify_button3' id='1' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('2')} className='idetify_button3' id='2' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('3')} className='idetify_button3' id='3' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('4')} className='idetify_button3'  id='4' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('5')} className='idetify_button3'  id='5' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('6')} className='idetify_button3'  id='6' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('7')} className='idetify_button3'  id='7' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('8')} className='idetify_button3'  id='8' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('9')} className='idetify_button3'  id='9' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className='container1'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('10')} className='idetify_button3' id='10' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('11')} className='idetify_button3' id='11' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('12')} className='idetify_button3' id='12' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('13')} className='idetify_button3'  id='13' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('14')} className='idetify_button3'  id='14' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('15')} className='idetify_button3'  id='15' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('16')} className='idetify_button3'  id='16' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('17')} className='idetify_button3'  id='17' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('18')} className='idetify_button3'  id='18' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className='container2'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('19')} className='idetify_button3' id='19' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('20')} className='idetify_button3' id='20' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('21')} className='idetify_button3' id='21' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('22')} className='idetify_button3'  id='22' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('23')} className='idetify_button3'  id='23' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('24')} className='idetify_button3'  id='24' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('25')} className='idetify_button3'  id='25' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('26')} className='idetify_button3'  id='26' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('27')} className='idetify_button3'  id='27' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className='container3'>
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick={() => handleGame('28')} className='idetify_button3' id='28' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('29')} className='idetify_button3' id='29' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('30')} className='idetify_button3' id='30' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('31')} className='idetify_button3'  id='31' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('32')} className='idetify_button3'  id='32' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('33')} className='idetify_button3'  id='33' style={{backgroundColor: buttonColor}}></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleGame('34')} className='idetify_button3'  id='34' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('35')} className='idetify_button3'  id='35' style={{backgroundColor: buttonColor}}></button></td>
                            <td><button onClick={() => handleGame('36')} className='idetify_button3'  id='36' style={{backgroundColor: buttonColor}}></button></td>
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