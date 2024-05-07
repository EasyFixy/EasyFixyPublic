import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { removeToken } from "../../Helpers/Token"
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/Auth/Auth";
import { Navigate, useNavigate } from 'react-router-dom';
const NavbarEmpleado = () => {

    const [checked, setChecked] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const toggleChecked = () => {
        setChecked(prev => !prev);
    };

    const logOut = () => {
        removeToken(dispatch)
        //navigate("/");
    }

    return (
        <div className="w-full h-8 color3 flex justify-between items-center p-4">
            <div className="flex flex-row justify-start items-center">
                <Link to={"/my/chats"}><button className="text-white ml-12">Chats</button></Link>
                <Link to={"/my/profile/employee/create/skills"}><button className="text-white ml-12">Crear habilidades</button></Link>
                <Link to={"/my/profile/employee/create/personalinformation"}><button className="text-white ml-12">Crear perfil</button></Link>
            </div>
            <div className="w-2/4 flex flex-row justify-end items-center">
                <p className="text-white mr-4">No activo</p>

                {/* switch para intercambiar de activo a no activo*/}
                <label htmlFor="second-toggle" className="flex items-center cursor-pointer mr-4">
                    <div className="relative">
                        <input
                            id="second-toggle"
                            type="checkbox"
                            className="hidden"
                            checked={checked}
                            onChange={toggleChecked}
                        />
                        <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                        <div
                            className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 ease-in-out ${checked ? 'transform translate-x-full bg-green-400' : ''
                                }`}
                        ></div>
                    </div>
                </label>

                <p className={`mr-12 ${checked ? 'text-green-500' : 'text-white'}`}>Activo</p>
                <a href=" https://wa.me/3208393883"><button className="text-white mr-12">Soporte</button></a>
                <button className="text-white mr-12" onClick={logOut}>Salir</button>
            </div>
        </div>
    )
}

export default NavbarEmpleado;