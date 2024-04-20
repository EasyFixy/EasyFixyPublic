import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { removeToken } from "../../Helpers/Token"
import io from "socket.io-client";



const Chat = (props) => {

    const userId = props.userId
    const destinatary = props.destinatary

    const [socket, setSocket] = useState()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const handleSendMessage = () => { //manda mensaje
        //console.log(message, destinatary)
        if (message && message !== "") {
            socket.emit('chat message', { destinatary: destinatary, msg: message })
            addMessage({ msg: message, username: userId})
            setMessage("")

        }
    }

    const addMessage = (msg) => {
        console.log(msg.msg, msg.username, messages)
        setMessages((state) => [...state, { msg: msg.msg, from: msg.username }])
    }

    useEffect(() => {
        const socket = io("http://localhost:3000/", {
            auth: {
                userId: userId
            }
        });
        socket.on('chat message', (msg) => { // recibe mensaje
            console.log(msg)
            addMessage(msg)
        })
        setSocket(socket)
    }, []);

    return (
        <>
            <div>
                <ul id="messages">
                    {messages.map((elemento, index) => (
                        <li key={index}>{elemento.from} : {elemento.msg}</li>
                    ))}
                </ul>
                <div id="form">
                    <input
                        className="w-full h-10 border "
                        type="text"
                        value={message}
                        onChange={(event) => { setMessage(event.target.value) }}
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </>
    )
}

export default Chat;