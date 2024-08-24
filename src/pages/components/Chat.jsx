import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const Chat = (props) => {
  const messagesContainerRef = useRef(null);  // Variable para tener el scroll abajo
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(props.messages ? props.messages : []);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [lastMessage, setLastMessage] = useState("");

  const handleSendMessage = () => {
    if (message && message !== "") {
      socket.emit('chat message', { destinatary: props.destinatary, msg: message, senderSocketId: socket.id });
      addMessage({ msg: message, username: props.userId });
      setMessage("");
    }
  };

  const addMessage = (msg) => {
    console.log("agregando msge " + msg.msg);
    setMessages((state) => [...state, { msg: msg.msg, from: msg.username }]);
    setLastMessage(msg);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const setupSocket = () => {
      if (props.socket) {
        console.log("Usando socket proporcionado");
        return props.socket;
      } else {
        console.log("Creando un nuevo socket");
        return io(baseUrl, {
          auth: {
            userId: props.userId
          }
        });
      }
    };

    const socketInstance = setupSocket();

    socketInstance.on('chat message', (msg) => {
      console.log("Mensaje recibido:", msg);
      addMessage(msg);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off('chat message');
      if (!props.socket) {
        socketInstance.disconnect();
      }
    };
  }, [props.socket, props.userId, baseUrl]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('Último mensaje cambiado:', lastMessage);
  }, [lastMessage]);

  useEffect(() => {
    if (props.messages) {
      setMessages(props.messages);
    }
  }, [props.messages]);

  return (
    <>
      <div className="bg-white w-full h-full flex flex-col border rounded-2xl">
        <ul id="messages" ref={messagesContainerRef} className="flex-1 overflow-auto p-2" style={{ maxHeight: '500px' }}>
          {messages.map((elemento, index) => (
            <span key={index} className={`w-100 flex justify-${elemento.from === props.userId ? 'end' : 'start'}`}>
              <li className={`text-white 
                  ${elemento.from === props.userId ? 'bg-emerald-700' : 'bg-black'}
                  py-2 px-8 rounded-2xl mb-1 w-auto break-all`}
                  key={index}>
                {elemento.msg}
              </li>
            </span>
          ))}
        </ul>
        <div id="form" className="flex-none flex justify-between items-center p-2 px-4 mb-2">
          <input
            className="w-full h-10 border border-black rounded focus:outline-none focus:border-emerald-700 p-2"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="" onClick={handleSendMessage}>
            <img src="/icons/flecha-enviar.svg" alt="" className="w-8 h-8 ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
