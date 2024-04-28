import React from "react";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";
import ToolbarDefault from "../components/ToolbarDefaul";
import { useState } from "react";
import {useEffect, useRef } from "react";
import NavbarEmpleador from "../components/NavbarEmpleador";

function UserChats() {
    // Array de chats
    const [selectedChat, setSelectedChat] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const buttonRef = useRef(null);

    const chats = [
        { id: 1, username: "Usuario 1", lastMessage: "Hola, ¿cómo estás?" },
        { id: 2, username: "Usuario 2", lastMessage: "¡Hola! Bien, gracias." },
        { id: 3, username: "Usuario 3", lastMessage: "¿Qué tal tu día?" },
        { id: 4, username: "Usuario 4", lastMessage: "Buenos días" },
        { id: 5, username: "Usuario 5", lastMessage: "Hola, ¿qué haces?" },
        { id: 6, username: "Usuario 6", lastMessage: "¡Hola! Estoy bien, gracias." },
        { id: 7, username: "Usuario 7", lastMessage: "¿Qué planes tienes para hoy?" },
        { id: 8, username: "Usuario 8", lastMessage: "Nada especial, solo descansar" },
        { id: 9, username: "Usuario 9", lastMessage: "¿Y tú?" },
        { id: 10, username: "Usuario 10", lastMessage: "Estoy pensando en salir a caminar" },
        { id: 10, username: "Usuario 11", lastMessage: "Esteban es puto" },
    ];

    const selectedChatInfo = selectedChat ? chats.find(chat => chat.id === selectedChat) : null;

    const handleDeleteChat = () => {
        // Lógica para borrar el chat seleccionado
        console.log("Chat borrado");
        // Aquí deberías implementar la lógica real para borrar el chat
        // por ejemplo, haciendo una llamada a la API
        setShowPopover(false); // Cerrar la ventana después de borrar el chat
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowPopover(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className='w-screen h-screen flex flex-col'>
            <ToolbarDefault />
            <NavbarEmpleador/>
            <div className="flex flex-row h-full w-screen">
                <div className="w-1/4 border-r border-gray-300 overflow-y-auto">
                    {/* Encabezado y buscador */}
                    <div className="p-4">
                        <h1 className="text-4xl font-bold mb-4">Chats</h1>
                        <input type="text" placeholder="Buscar chats..." className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" />
                        {/* Lista de chats */}
                        <div>
                            {chats.map(chat => (
                                <div 
                                    key={chat.id} 
                                    className={`flex items-center justify-between mb-4 cursor-pointer ${selectedChat === chat.id ? 'bg-orange-400 bg-opacity-50' : ''}`} 
                                    onClick={() => setSelectedChat(chat.id)}
                                >
                                    <div className="flex items-center">
                                        <img src="/empleadologo.svg" className="w-10 h-10 rounded-full mr-2" />
                                        <div>
                                            <span className="font-bold text-lg">{chat.username}</span>
                                            <p className="text-lg">{chat.lastMessage}</p>
                                        </div>
                                    </div>
                                    {selectedChat === chat.id && (
                                        <div className="flex items-center" ref={buttonRef}>
                                            <button 
                                                className="rounded-full bg-gray-400 h-8 w-8 flex justify-center items-center mr-2"
                                                onClick={() => setShowPopover(!showPopover)}
                                            >
                                                <span className="bg-white w-2 h-2 rounded-full"></span>
                                                <span className="bg-white w-2 h-2 rounded-full mx-1"></span>
                                                <span className="bg-white w-2 h-2 rounded-full"></span>
                                            </button>
                                            {showPopover && (
                                                <div className="absolute mt-2 w-48 bg-white border rounded-lg overflow-hidden shadow-xl" style={{ top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight, left: buttonRef.current.offsetLeft - 160 }}>
                                                <button 
                                                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={handleDeleteChat}
                                                >
                                                    Borrar chat
                                                </button>
                                            </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-3/4 p-4 flex flex-col">
                    {/* Chat abierto */}
                    {selectedChatInfo && (
                        <div className="flex flex-col flex-grow">
                            <div className="flex items-center mb-4">
                                <img src="/empleadologo.svg" className="w-16 h-16 rounded-full mr-4" />
                                <span className="font-bold text-2xl">{selectedChatInfo.username}</span>
                            </div>
                            <hr className="border-gray-300 my-2" /> {/* Línea divisoria */}
                            {/* Espacio entre la línea divisoria y el componente de chat */}
                            <div className="flex-grow">
                                {/* Aquí va la implementación del chat abierto */}
                                <Chat userId={4} destinatary={2} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserChats;
