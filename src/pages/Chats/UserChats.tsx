import React from "react";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";
import ToolbarDefault from "../components/ToolbarDefaul";
import { useState } from "react";
import {useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleRequestWithToken } from "../../Helpers/Request";
import NavbarEmpleador from "../components/NavbarEmpleador";

function UserChats() {
    // Array de chats
    const [selectedChat, setSelectedChat] = useState<Record<string, string>>({});
    const [chats, setChats] = useState<Record<string, string>[]>([]);
    const [openChat, setOpenChat] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const userEnPlataforma = useAppSelector((state) => state.Auth.id);
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleDeleteChat = () => {
        // Lógica para borrar el chat seleccionado
        console.log("Chat borrado");
        // Aquí deberías implementar la lógica real para borrar el chat
        // por ejemplo, haciendo una llamada a la API
        setShowPopover(false); // Cerrar la ventana después de borrar el chat
    };

    const handleRequestConversations = () => {
        fetch(`${baseUrl}getConversations?token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setChats(data.data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Aquí puedes manejar el error como desees
        });
    }
    const handleRequestMessagesByConversation = (destinatary) => {
        fetch(`${baseUrl}getMessagesByConversation?token=${token}&destinatary=${destinatary}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setSelectedChat(prevSelectedChat => ({
                ...prevSelectedChat,
                messages: data.data // Suponiendo que data.data contiene los mensajes
            }));
        })
        .catch(error => {
            console.error('Error:', error);
            // Aquí puedes manejar el error como desees
        });
    }
    const onClickSelected = (chat) =>{
        setSelectedChat(chat);
        handleRequestWithToken(dispatch,() => handleRequestMessagesByConversation(chat.desiredUserId))
        setOpenChat(true);
    }
    useEffect(() => {
        handleRequestWithToken(dispatch, handleRequestConversations)
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current?.contains(event.target)) {
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
            <div className="flex flex-row h-full w-screen" style={{height: 'calc(100% - 4rem)'}}>
                <div className="w-1/4 border-r border-gray-300 overflow-y-auto">
                    {/* Encabezado y buscador */}
                    <div className="p-4">
                        <h1 className="text-4xl font-bold mb-4">Chats</h1>
                        <input type="text" placeholder="Buscar chats..." className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" />
                        {/* Lista de chats */}
                        <div>
                            {chats.map(chat => (
                                <div 
                                    key={chat.desiredUserId} 
                                    className={`flex items-center justify-between mb-4 cursor-pointer ${selectedChat.desiredUserId === chat.desiredUserId ? 'bg-orange-400 bg-opacity-50' : ''}`} 
                                    onClick={() => onClickSelected(chat)}
                                >
                                    <div className="flex items-center">
                                        <img src="/empleadologo.svg" alt={`Avatar de ${chat.userName}`} className="w-10 h-10 rounded-full mr-2" />
                                        <div>
                                            <span className="font-bold text-lg">{chat.userName}</span>
                                            <p className="text-lg">{chat.lastMessageText}</p>
                                            <p className="text-[10px]">{chat.lastMessageDate.split('T')[0]}</p>
                                        </div>
                                    </div>
                                    {selectedChat.desiredUserId === chat.desiredUserId && (
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
                                                <div className="absolute mt-2 w-48 bg-white border rounded-lg overflow-hidden shadow-xl" style={{ 
                                                    top: buttonRef?.current ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight : 0,
                                                    left: buttonRef?.current ? buttonRef.current.offsetLeft - 160 : 0
                                                }}>
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
                    {openChat && (
                        <div className="flex flex-col flex-grow">
                            <div className="flex items-center mb-4">
                                <img src="/empleadologo.svg" alt={`Avatar de ${selectedChat.userName}`} className="w-16 h-16 rounded-full mr-4" />
                                <span className="font-bold text-2xl">{selectedChat.userName}</span>
                            </div>
                            <hr className="border-gray-300 my-2" /> {/* Línea divisoria */}
                            {/* Espacio entre la línea divisoria y el componente de chat */}
                            <div className="flex-grow">
                                {/* Aquí va la implementación del chat abierto */}
                                <Chat userId={userEnPlataforma} destinatary={selectedChat.desiredUserId} showEstimatePrice={false} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserChats;
