import React from "react";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";

function UserChats() {
    return (
        <div className="flex items-center justify-center h-screen w-screen">
            tamo activo
            <Chat userId={2} destinatary={4}></Chat>
        </div>
    )
}

export default UserChats;