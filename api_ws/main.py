import json
import uuid

import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

app = FastAPI()

connections = {}

class GameRoom:
    def __init__(self):
        self.board = init_board()
        self.connections = [] # список игроков в комнате

    def reset_board(self):
        self.board = init_board()

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





async def update_board(manager, data, uuid):

    if (uuid in manager.active_connections):
        board = manager.active_connections[uuid].board
        q = data['player']
        data['init'] = False
        if data['rotate'] != '':
            if (data['rotate'] == 'R1'):
                board[0], board[2], board[8], board[6] = board[6], board[0], board[2], board[8]
                board[1], board[5], board[7], board[3] = board[3], board[1], board[5], board[7]
                #data['message'] = 'R1'

            elif (data['rotate'] == 'L1'):
                board[0], board[2], board[8], board[6] = board[2], board[8], board[6], board[0]
                board[1], board[5], board[7], board[3] = board[5], board[7], board[3], board[1]
                #data['message'] = 'L1'
            elif (data['rotate'] == 'R2'):
                board[9], board[11], board[17], board[15] = board[15], board[9], board[11], board[17]
                board[10], board[14], board[16], board[12] = board[12], board[10], board[14], board[16]

            elif (data['rotate'] == 'L2'):
                board[9], board[11], board[17], board[15] = board[11], board[17], board[15], board[9]
                board[10], board[14], board[16], board[12] = board[14], board[16], board[12], board[10]

            elif (data['rotate'] == 'R3'):
                board[18], board[20], board[26], board[24] = board[24], board[18], board[20], board[26]
                board[19], board[23], board[25], board[21] = board[21], board[19], board[23], board[25]

            elif (data['rotate'] == 'L3'):
                board[18], board[20], board[26], board[24] = board[20], board[26], board[24], board[18]
                board[19], board[23], board[25], board[21] = board[23], board[25], board[21], board[19]

            elif (data['rotate'] == 'R4'):
                board[27], board[29], board[35], board[33] = board[33], board[27], board[29], board[35]
                board[28], board[32], board[34], board[30] = board[30], board[28], board[32], board[34]

            elif (data['rotate'] == 'L4'):
                board[27], board[29], board[35], board[33] = board[29], board[35], board[33], board[27]
                board[28], board[32], board[34], board[30] = board[32], board[34], board[30], board[28]

            if if_won(board, data):
                data['win'] = "won_rotate"
                #data['rotate_win'] = "R1"
                manager.active_connections[uuid].reset_board()

        else:
            index = int(data['cell']) - 1



            if board[index] is None:
                # cell is empty
                board[index] = data['player']

                if if_won(board, data):
                    data['message'] = "won"
                    print('if_won()', data)
                elif is_draw(board):
                    data['message'] = "draw"
                    print('is_draw',data)
                else:
                    data['message'] = "move"
                    print('move',data)
            else:
                data['message'] = "choose another one"
                print('else', data)


            if data['message'] in ['draw', 'won']:
                manager.active_connections[uuid].reset_board()
    await manager.broadcast(data, uuid)


def is_draw(board):

    for i in board:
        if not i:
            return False

    return True


def if_won(board, data):

    winning_combinations = [

        [0, 1, 2, 9, 10],
        [3, 4, 5, 12, 13],
        [6, 7, 8, 15, 16],
        [18, 19, 20, 27, 28],
        [21, 22, 23, 30, 31],
        [24, 25, 26, 33, 34],

        [1, 2, 9, 10, 11],
        [4, 5, 12, 13, 14],
        [7, 8, 15, 16, 17],
        [19, 20, 27, 28, 29],
        [22, 23, 30, 31, 32],
        [25, 26, 33, 34, 35],

        [0, 3, 6, 18, 21],
        [1, 4, 7, 19, 22],
        [2, 5, 8, 20, 23],
        [9, 12, 15, 27, 30],
        [10, 13, 16, 28, 31],
        [11, 14, 17, 29, 32],

        [3, 6, 18, 21, 24],
        [4, 7, 19, 22, 25],
        [5, 8, 20, 23, 26],
        [12, 15, 27, 30, 33],
        [13, 16, 28, 31, 34],
        [14, 17, 29, 32, 35],

        [0, 4, 8, 27, 31],
        [1, 5, 15, 28, 32],
        [3, 7, 20, 30, 34],

        [4, 8, 27, 31, 35],

        [11, 13, 15, 20, 22],
        [10, 12, 8, 19, 21],
        [14, 16, 27, 23, 25],

        [13, 15, 20, 22, 24]
    ]
    for combination in winning_combinations:
        if all(board[i] == board[combination[0]] and board[i] is not None for i in combination):
            data['wonComb'] = combination
            return True
    return False





class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, uuid: uuid.UUID):
        if uuid not in self.active_connections:
            self.active_connections[uuid] = GameRoom()
        room = self.active_connections[uuid]
        if len(room.connections) >= 2:
            await websocket.accept()
            await websocket.close(4000)
        else:
            await websocket.accept()
            room.connections.append(websocket)
            if (len(room.connections) == 1):
                await websocket.send_json({
                    # Первый игрок присоеденился, задаем ему значение шариков "Black" и говорим чтобы он подождал второго игрока
                    'init': True,
                    'player': 'Black',  # для индентификации в игре
                    'message': 'Ждите второго игрока'
                })
            else:
                await room.connections[1].send_json({  # Второй игрок присоеденился, задаем ему значение шариков "Orange"
                    'init': True,
                    'player': 'Orange',
                    'message': ''
                })
                await room.connections[0].send_json({
                    # Говорим первому игроку, что второй игрок присоеденился и говорим что сейчас его ход(первого игрока)
                    'init': True,
                    'player': 'Black',
                    'message': 'Ваш ход'
                })

    def disconnect(self, websocket: WebSocket, uuid: uuid.UUID):
        room = self.active_connections.get(uuid)
        if room:
            room.connections.remove(websocket)
            if not room.connections:
                del self.active_connections[uuid]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, data: str, uuid: uuid.UUID):
        print(data)
        room = self.active_connections.get(uuid)
        if uuid:

            for connection in room.connections:
                await connection.send_json(data)


manager = ConnectionManager()


@app.websocket("/ws/{uuid}")
async def websocket_endpoint(websocket: WebSocket, uuid: uuid.UUID):
    await manager.connect(websocket, uuid)
    try:
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            print(data)
            await update_board(manager, data, uuid)
    except WebSocketDisconnect:
        manager.disconnect(websocket, uuid)

    except:
        pass

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=3005)