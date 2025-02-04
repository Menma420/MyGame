from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests
socketio = SocketIO(app, cors_allowed_origins="*")

rooms = {}

@socketio.on("create-room")
def handle_create_room(data):
    room_id = data["roomId"]
    username = data["username"]
    if room_id not in rooms:
        rooms[room_id] = []
    
    if not(username in rooms):
            rooms[room_id].append(username)
            join_room(room_id)
    rooms[room_id]=set(rooms[room_id])
    rooms[room_id]=list(rooms[room_id])
    socketio.emit("room-updated", {"players": rooms[room_id]}, room=room_id)

@socketio.on("join-room")
def handle_join_room(data):
    room_id = data["roomId"]
    username = data["username"]
    if room_id in rooms:
        if not(username in rooms):
            rooms[room_id].append(username)
            join_room(room_id)
        rooms[room_id]=set(rooms[room_id])
        rooms[room_id]=list(rooms[room_id])
        socketio.emit("room-updated", {"players": rooms[room_id]}, room=room_id)

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
