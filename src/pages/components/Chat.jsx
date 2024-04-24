
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { removeToken } from "../../Helpers/Token"
import io from "socket.io-client";

const Chat = (props) => {
    const messagesContainerRef = useRef(null);
    const userId = props.userId;
    const destinatary = props.destinatary;

    const [socket, setSocket] = useState();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (message && message !== "") {
            socket.emit('chat message', { destinatary: destinatary, msg: message });
            addMessage({ msg: message, username: userId });
            setMessage("");
        }
    };

    const addMessage = (msg) => {
        setMessages((state) => [...state, { msg: msg.msg, from: msg.username }]);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        const socket = io("http://localhost:3000/", {
            auth: {
                userId: userId
            }
        });
        socket.on('chat message', (msg) => {
            addMessage(msg);
        });

        const scrollToBottom = () => {
            if (messagesContainerRef.current) {
                const container = messagesContainerRef.current;
                container.scrollTop = container.scrollHeight;
            }
        };

        setSocket(socket);
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <div className="bg-white w-full h-full flex flex-col border rounded-2xl">
                <ul id="messages" ref={messagesContainerRef} className="flex-1 overflow-auto p-2" style={{ maxHeight: 'calc(100% - 50px)' }}>
                    {messages.map((elemento, index) => (
                        <span key={index} className={`w-100 flex justify-${elemento.from === userId ? 'end' : 'start'}`}>
                            <li className={`text-white 
                                ${elemento.from === userId ? 'bg-black' : 'bg-orange-500'}
                                py-2 px-8 rounded-2xl mb-1 w-auto break-all`} 
                                key={index}>
                                {elemento.msg}
                            </li>
                        </span>
                    ))}
                </ul>
                <div id="form" className="flex-none flex justify-between items-center p-2 px-4 mb-2">
                    <input
                        className="w-full h-10 border border-black rounded focus:outline-none focus:border-orange-500 p-2"
                        type="text"
                        value={message}
                        onChange={(event) => { setMessage(event.target.value) }}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="" onClick={handleSendMessage}>
                        <img src="/icons/flecha-enviar.svg" alt="" className="w-8 h-8 ml-2"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Chat;