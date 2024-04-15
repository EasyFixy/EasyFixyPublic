import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { removeToken } from "../../Helpers/Token"

const NavbarEmpleador = () =>{

    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };
    const logOut = () => {
        console.log("saliendo")
        removeToken(dispatch)
        navigate("/");
    }

    return(
        <div className="w-full h-8 color3 flex justify-between items-center p-4">
            <div className="flex flex-row justify-start items-center">
                <button className="text-white ml-12">Chats</button>
                <Link to={""}><button className="text-white ml-12">Mis trabajos </button></Link>
                <Link to={""}><button className="text-white ml-12">Mi perfil</button></Link>
            </div>
            <div className="w-2/4 flex flex-row justify-end items-center">
                
                <button className="text-white mr-12">Soporte</button>
                <button className="text-white mr-12" onClick={logOut}>Salir</button>
            </div>
        </div>
    )
}

export default NavbarEmpleador;