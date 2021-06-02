import React from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'
import { SocketContext } from '../Context/SocketContext';

const ChatHome = () => {
    const [username, setUsername] = React.useState("");
    const [room, setRoom] = React.useState("JavaScript");
    const socket = React.useContext(SocketContext)
    let history = useHistory();
    const joinGroupSubmitHandler = (e) => {
        e.preventDefault();
        socket.emit("joinRoom", ({ username, room }))
        history.push({
            pathname: "/chat",
            state: { username, room }
        })
    }
    return (
        <div>
            <div className="join-container">
                <header className="join-header">
                    <h1><i className="fas fa-smile"></i> Chat App</h1>
                </header>
                <main className="join-main">
                    <form onSubmit={joinGroupSubmitHandler}>
                        <div className="form-control">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Enter username..."
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label>Room</label>
                            <select name="room" id="room" value={room} onChange={(e) => setRoom(e.target.value)}>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="PHP">PHP</option>
                                <option value="C#">C#</option>
                                <option value="Ruby">Ruby</option>
                                <option value="Java">Java</option>
                            </select>
                        </div>
                        <button type="submit" className="btn">Join Chat</button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default ChatHome
