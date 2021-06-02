import React from 'react'
import { SocketContext } from '../Context/SocketContext'
import '../App.css'
import { useHistory } from 'react-router'

const Chat = (props) => {
    const [roomUsers, setRoomUsers] = React.useState([])
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const history = useHistory()
    const room = props.location.state.room
    const socket = React.useContext(SocketContext)
    React.useEffect(() => {
        socket.on("roomUsers", ({ room, users }) => {
            outputUsers(users)
        })
        socket.on("message", message => {
            outputMessage(message)
        })
    })
    const outputUsers = (users) => {
        setRoomUsers(users)
    }
    const outputMessage = message => {
        let newMessage = messages;
        let finalMessages = newMessage.concat(message);
        setMessages(finalMessages)
        setMessage("")
    }
    const chatsubmitHandler = (e) => {
        e.preventDefault();
        socket.emit("chatMessage" , message)
    }
    const handleLeaveChat = () => {
        history.push("/")
    }
    return (
        <div>
            <div className="chat-container">
                <header className="chat-header">
                    <h1><i className="fas fa-smile"></i> Chat App</h1>
                    <button className="btn" onClick = {handleLeaveChat}>Leave Room</button>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">
                        <h3><i className="fas fa-comments"></i> Room Name:</h3>
                        <h2 id="room-name">{room}</h2>
                        <h3><i className="fas fa-users"></i> Users</h3>
                        <ul id="users">
                            {roomUsers.map((e , i) => (
                                <li key = {i}>{e.username}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="chat-messages">
                    {messages.map((m , i) => (
                        <div className="message">
                            
                                <div key = {i}>
                                    <p className="meta">{m.username} <span>{m.time}</span></p>
                                    <p className="text">
                                        {m.text}
						            </p>
                                </div>
                        </div>
                            ))}
                       
                        
                        
                   </div>
                </main>
                <div className="chat-form-container">
                    <form id="chat-form" onSubmit = {chatsubmitHandler}>
                        <input
                            type="text"
                            placeholder="Enter Message"
                            required
                            value = {message}
                            onChange = {(e) => setMessage(e.target.value)}
                        />
                        <button className="btn" type = "submit"><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Chat
