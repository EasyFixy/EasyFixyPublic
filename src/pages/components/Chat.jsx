import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { removeToken } from "../../Helpers/Token"
import io from "socket.io-client";
import EstimatePrice from "./EstimatePrice";


const Chat = (props) => {

    const messagesContainerRef = useRef(null);  // <-- variable para tener el scroll abajo
    //const props.userId = props.props.userId <-- este es el del usuario que esta en plataforma
    // const destinatary = props.destinatary <-- este es el que cambia, el destinatario
    const userData = props.userData;
    const [socket, setSocket] = useState()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [bidPrice, setBidPrice] = useState(10000);
    const [lastBidPrice, setLastBidPrice] = useState("");


    const handleSendMessage = () => { //manda mensaje
        //console.log(message, destinatary)
        if (message && message !== "") {
            socket.emit('chat message', { destinatary: props.destinatary, msg: message })
            addMessage({ msg: message, username: props.userId})
            setMessage("")

        }
    }
    const handleBidPrice = (newValue) => {
        setBidPrice(newValue);
        setLastBidPrice('')
        if (newValue >= 10000) {
            socket.emit('bid price', { destinatary: destinatary, price: newValue });
        }
    };
    const addMessage = (msg) => {
        console.log(msg.msg, msg.username, messages)
        setMessages((state) => [...state, { msg: msg.msg, from: msg.username }])
    }

    useEffect(() => {
        const socket = io("http://localhost:3000/", {
            auth: {
                userId: props.userId
            }
        });
        socket.on('chat message', (msg) => { // recibe mensaje
            console.log(msg)
            addMessage(msg)
        });
        socket.on('bid price', (data) => {
            setBidPrice(data.price)
            setLastBidPrice(userData?.mainData[0]?.userName ?? "")
        });
        /// Función para que el scroll en mensajes quede abajo
        const scrollToBottom = () => {
            if (messagesContainerRef.current) {
                const container = messagesContainerRef.current;
                container.scrollTop = container.scrollHeight;
            }
        };

        
        setSocket(socket)
        scrollToBottom();
    }, [messages]);
    

    useEffect(() => {
        setMessages([]);
    }, [props.destinatary]);

    return (
        <>
            <div className="bg-white w-full h-full flex flex-col border rounded-2xl">
                <ul id="messages" ref={messagesContainerRef} className="flex-1 overflow-auto p-2 ">
                    {messages.map((elemento, index) => (
                        <span key={index} className={`w-100 flex justify-${elemento.from === props.userId ? 'end' : 'start'}`}>
                        <li className={`text-white 
                        ${elemento.from === props.userId ? 'bg-black' : 'bg-orange-500'}
                        py-2 px-8 rounded-2xl mb-1 w-auto break-all`} 
                        key={index}>
                        {elemento.msg}</li></span>
                    ))}
                </ul>
                <div id="form" className="flex-none flex justify-between items-center p-2 px-4 mb-2">
                    <input
                        className="w-full h-10 border border-black rounded focus:outline-none focus:border-orange-500 p-2"
                        type="text"
                        value={message}
                        onChange={(event) => { setMessage(event.target.value) }}
                    />
                    <button className="" onClick={handleSendMessage}><img src="/icons/flecha-enviar.svg" alt="" className="w-8 h-8 ml-2"/></button>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-white">Puedes aumentar o disminuir el precio de la negociación</h1>
                    <EstimatePrice estimatePrice={bidPrice} setEstimatePrice={handleBidPrice}/>
                    {lastBidPrice !== "" && (
                        <div className="blink">
                            <p>¡El precio fue cambiado por {lastBidPrice}!</p>
                        </div>
                    )}
                </div>
                
            </div>
        </>
    )
}

export default Chat;