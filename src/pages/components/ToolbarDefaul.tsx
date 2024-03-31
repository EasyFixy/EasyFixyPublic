import React from "react";
import { useState } from "react";
import HomeEmpleado from "../Home/empleado/HomeEmpleado";
import HomeEmpleador from "../Home/Empleador/HomeEmpleador";

const ToolbarDefault = () =>{

    let imagen = '/icons/usuario.png'
    let nombre = 'Nombre de usuario'

    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };


    return(
        <div className="w-full h-16 mainBackground flex justify-between items-center p-4">
            <div className="flex flex-row justify-start items-center">
                <p className="text-3xl "> EasyFixy</p>
                <img src="/icons/icon.svg" alt="logo" className="w-16 pl-2.5" />

            </div>
            <div className="flex flex-row justify-start items-center">
                <div className="flex flex-row">
                    <img src="/icons/llaves.svg" alt="llaves" className="w-10 pl-2.5" />
                </div>

                {/* switch para intercambiar de rol */}
                <label htmlFor="toggle" className="flex items-center cursor-pointer ml-4">
                    <div className="relative">
                    <input
                        id="toggle"
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={toggleChecked}
                    />
                    <div className="toggle__line w-10 h-6 color3 rounded-full shadow-inner"></div>
                    <div
                        className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-0 transition-transform duration-300 ease-in-out ${
                        checked ? 'transform translate-x-full bg-green-400' : ''
                        }`}
                    ></div>
                    </div>
                    <div
                    className={`ml-3 text-sm ${
                        checked ? 'text-green-500' : 'text-gray-500'
                    }`}
                    >
                    </div>
                </label>
    
                <div className="flex flex-row">
                    <img src="/icons/user-icon.svg" alt="usuario" className="w-10 pl-2.5" />
                </div>
            </div>

            
            <div className="w-2/4 flex flex-row justify-end items-center">
                <button className="flex flex-row items-center mr-8">
                    <img src="/icons/maletin.svg" alt="maletin de trabajo" />
                    <p className="text-white ml-2">Mis trabajos</p>
                </button>

                <div className="flex flex-row items-center">
                    <img src={imagen} alt="foto del usuario" />
                    <p className="text-white ml-4">{nombre}</p>
                </div>
            </div>

        </div>
    )

}
export default ToolbarDefault;