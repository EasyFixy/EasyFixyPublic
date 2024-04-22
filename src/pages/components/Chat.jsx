import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { removeToken } from "../../Helpers/Token"
import io from "socket.io-client";
import EstimatePrice from "./EstimatePrice";


const Chat = (props) => {

    const userId = props.userId
    const destinatary = props.destinatary
    const userData = props.userData;
    const [socket, setSocket] = useState()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [bidPrice, setBidPrice] = useState(10000);
    const [lastBidPrice, setLastBidPrice] = useState("");


    const handleSendMessage = () => { //manda mensaje
        //console.log(message, destinatary)
        if (message && message !== "") {
            socket.emit('chat message', { destinatary: destinatary, msg: message })
            addMessage({ msg: message, username: userId})
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
                userId: userId
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