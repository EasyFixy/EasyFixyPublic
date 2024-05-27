
import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import EstimatePrice from "./EstimatePrice";


const Chat = (props) => {

    const messagesContainerRef = useRef(null);  // <-- variable para tener el scroll abajo
    const [socket, setSocket] = useState()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(props.messages ? props.messages : []);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const handleSendMessage = () => {
        if (message && message !== "") {
            socket.emit('chat message', { destinatary: props.destinatary, msg: message, senderSocketId: socket.id });
            addMessage({ msg: message, username: props.userId });
            setMessage("");
        }

    };
    const addMessage = (msg) => {
        console.log("agregando msge "+ msg);
        setMessages((state) => [...state, { msg: msg.msg, from: msg.username }]);
        console.log(messages);
        console.log(props.setLastMessage);
        props.setLastMessage && props.setLastMessage(msg);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        console.log("entra");
        if (props.socket) {
            console.log("def")
            console.log(props.socket)
            if (!props.socket.hasListeners('chat message')) {
                console.log("12");
                props.socket.on('chat message', (msg) => {
                    console.log(props.socket)
                    console.log("llega mensaje")
                    console.log(msg)
                    addMessage(msg)
                });
            } else {
                console.log("22");
            }
            console.log(props.socket)
            setSocket(props.socket);
            console.log(props.socket)
        } else {
            console.log("no def creacion de otro socket")
            const socket = io(baseUrl, {
                auth: {
                    userId: props.userId
                }
            });
            socket.on('chat message', (msg) => {
                console.log("llega mensaje e")
                addMessage(msg)
            });
            setSocket(socket);
            console.log(socket)
        }

        /// Función para que el scroll en mensajes quede abajo
        const scrollToBottom = () => {
            if (messagesContainerRef.current) {
                const container = messagesContainerRef.current;
                container.scrollTop = container.scrollHeight;
            }
        };


        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setSocket(props.socket);
    }, [props.socket]);

    useEffect(() => {
        setMessages(props.messages ? props.messages : []);
    }, [props.messages]);

    return (
        <>
            <div className="bg-white w-full h-full flex flex-col border rounded-2xl">
                <ul id="messages" ref={messagesContainerRef} className="flex-1 overflow-auto p-2" style={{ maxHeight: '500px' }}>
                    {messages.map((elemento, index) => (
                        <span key={index} className={`w-100 flex justify-${elemento.from === props.userId ? 'end' : 'start'}`}>
                            <li className={`text-white 
                                ${elemento.from === props.userId ? 'bg-orange-500' : 'bg-black'}
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
                        <img src="/icons/flecha-enviar.svg" alt="" className="w-8 h-8 ml-2" />
                    </button>
                </div>

            </div>
        </>
    )
}

export default Chat;