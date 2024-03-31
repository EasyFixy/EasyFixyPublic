import React from "react";
import { useState } from "react";

const NavbarEmpleado = () =>{

    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };

    return(
        <div className="w-full h-8 color3 flex justify-between items-center p-4">
            <div className="flex flex-row justify-start items-center">
                <button className="text-white ml-12">Chats</button>
                <button className="text-white ml-12">Crear habilidades</button>
                <button className="text-white ml-12">Crear perfil</button>
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
                        className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 ease-in-out ${
                        checked ? 'transform translate-x-full bg-green-400' : ''
                        }`}
                    ></div>
                    </div>
                </label>

                <p className={`mr-12 ${checked ? 'text-green-500' : 'text-white'}`}>Activo</p>
                <button className="text-white mr-12">Soporte</button>
                <button className="text-white mr-12">Salir</button>
            </div>
        </div>
    )
}

export default NavbarEmpleado;