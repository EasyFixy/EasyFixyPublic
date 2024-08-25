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
        removeToken(dispatch)
        navigate("/");
    }

    return(
        <div className="w-full h-max sm::h-8  color3 flex justify-between items-center sm:p-4 p-1">
            <div className="flex flex-row justify-start items-center lg:gap-12 gap-4">
                <Link to={"/my/chats"}><button className="text-white text-sm sm:text-base">Chats</button></Link>
                <Link to={""}><button className="text-white text-sm sm:text-base">Mis trabajos </button></Link>
                <Link to={"/my/profile/employee"}><button className="text-white text-sm sm:text-base">Mi perfil</button></Link>
            </div>
            <div className="lg:w-2/4 flex flex-row justify-end items-center lg:gap-12 gap-4">
                
                <a href=" https://wa.me/3208393883"><button className="text-white text-sm sm:text-base">Soporte</button></a>
                <button className="text-white text-sm sm:text-base" onClick={logOut}>Salir</button>
            </div>
        </div>
    )
}

export default NavbarEmpleador;