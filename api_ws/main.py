import json
import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

app = FastAPI()


def init_board():
    return [
        None, None, None,  # 0 1 2
        None, None, None,  # 3 4 5
        None, None, None,  # 6 7 8

        None, None, None,  # 9 10 11
        None, None, None,  # 12 13 14
        None, None, None,  # 15 16 17

        None, None, None,  # 18 19 20
        None, None, None,  # 21 22 23
        None, None, None,  # 24 25 26

        None, None, None,  # 27 28 29
        None, None, None,  # 30 31 32
        None, None, None  # 33 34 35
    ]


board = init_board()


async def update_board(manager, data):
    print(data)


    if data['rotate'] != '':
        if (data['rotate'] == 'R1'):
            # Поворачиваем по часовой стрелке угловые элементы
            temp2 = board[2]
            board[2] = board[0]
            temp8 = board[8]
            board[8] = temp2
            temp6 = board[6]
            board[6] = temp8
            board[0] = temp6
            # Поворачиваем по часовой стрелке внутренние элементы
            temp5 = board[5]
            board[5] = board[1]
            temp7 = board[7]
            board[7] = temp5
            temp3 = board[3]
            board[3] = temp7
            board[1] = temp3
            data['message'] = 'R1'
            data['init'] = False
        elif (data['rotate'] == 'L1'):
            # Поворачиваем против часовой стрелки угловые элементы
            temp0 = board[0]
            board[0] = board[2]
            temp6 = board[6]
            board[6] = temp0
            temp8 = board[8]
            board[8] = temp6
            board[2] = temp8
            # Поворачиваем против часовой стрелки внутренние элементы
            temp1 = board[1]
            board[1] = board[5]
            temp3 = board[3]
            board[3] = temp1
            temp7 = board[7]
            board[7] = temp3
            board[5] = temp7
            data['message'] = 'L1'
        if if_won():
            data['message'] = "won"
        await manager.broadcast(data)
    else:
        index = int(data['cell']) - 1
        print(index)
        data['init'] = False
        print(data)

        if board[index] is None:
            # cell is empty
            board[index] = data['player']

            if if_won():
                data['message'] = "won"
                print('if_won()', data)
            elif is_draw():
                data['message'] = "draw"
                print('is_draw',data)
            else:
                data['message'] = "move"
                print('move',data)
        else:
            data['message'] = "choose another one"
            print('else', data)

        await manager.broadcast(data)
        if data['message'] in ['draw', 'won']:
            manager.connections = []



def is_draw():
    global board
    for i in board:
        if not i:
            return False
    board = init_board()
    return True


def if_won():
    global board
    if (board[0] == board[1] == board[2] == board[9] == board[10] != None or
            board[3] == board[4] == board[5] == board[12] == board[13] != None or
            board[6] == board[7] == board[8] == board[15] == board[16] != None or
            board[18] == board[19] == board[20] == board[27] == board[28] != None or
            board[21] == board[22] == board[23] == board[30] == board[31] != None or
            board[24] == board[25] == board[26] == board[33] == board[34] != None or

            board[1] == board[2] == board[9] == board[10] == board[11] != None or
            board[4] == board[5] == board[12] == board[13] == board[14] != None or
            board[7] == board[8] == board[15] == board[16] == board[17] != None or
            board[19] == board[20] == board[27] == board[28] == board[29] != None or
            board[22] == board[23] == board[30] == board[31] == board[32] != None or
            board[25] == board[26] == board[33] == board[34] == board[35] != None or

            board[0] == board[3] == board[6] == board[18] == board[21] != None or
            board[1] == board[4] == board[7] == board[19] == board[22] != None or
            board[2] == board[5] == board[8] == board[20] == board[23] != None or
            board[9] == board[12] == board[15] == board[27] == board[30] != None or
            board[10] == board[13] == board[16] == board[28] == board[31] != None or
            board[11] == board[14] == board[17] == board[29] == board[32] != None or

            board[3] == board[6] == board[18] == board[21] == board[24] != None or
            board[4] == board[7] == board[19] == board[22] == board[25] != None or
            board[5] == board[8] == board[20] == board[23] == board[26] != None or
            board[12] == board[15] == board[27] == board[30] == board[33] != None or
            board[13] == board[16] == board[28] == board[31] == board[34] != None or
            board[14] == board[17] == board[29] == board[32] == board[35] != None or

            board[0] == board[4] == board[8] == board[27] == board[31] != None or
            board[1] == board[5] == board[15] == board[28] == board[32] != None or
            board[3] == board[7] == board[20] == board[30] == board[34] != None or

            board[4] == board[8] == board[27] == board[31] == board[35] != None or

            board[11] == board[13] == board[15] == board[20] == board[22] != None or
            board[10] == board[12] == board[8] == board[19] == board[21] != None or
            board[14] == board[16] == board[27] == board[23] == board[25] != None or

            board[13] == board[15] == board[20] == board[22] == board[24] != None):
        board = init_board()
        return True
    return False


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        if len(self.active_connections) >= 2:
            await websocket.accept()
            await websocket.close(4000)
        else:
            await websocket.accept()
            self.active_connections.append(websocket)
            if (len(self.active_connections) == 1):
                await websocket.send_json({
                    # Первый игрок присоеденился, задаем ему значение шариков "Black" и говорим чтобы он подождал второго игрока
                    'init': True,
                    'player': 'Black',  # для индентификации в игре
                    'message': 'Ждите второго игрока'
                })
            else:
                await websocket.send_json({  # Второй игрок присоеденился, задаем ему значение шариков "Orange"
                    'init': True,
                    'player': 'Orange',
                    'message': ''
                })
                await self.active_connections[0].send_json({
                    # Говорим первому игроку, что второй игрок присоеденился и говорим что сейчас его ход(первого игрока)
                    'init': True,
                    'player': 'Black',
                    'message': 'Ваш ход'
                })

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, data: str):
        for connection in self.active_connections:
            await connection.send_json(data)


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            await update_board(manager, data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except:
        pass

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=3005)