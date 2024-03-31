import React, { useState } from "react";

const MisTrabajos = () =>{

    const [estado, setEstado] = useState(true);
    const toggleEstado = () => {
        setEstado(prev => !prev);
    };

    return(
        <div className="w-full h-auto flex flex-col rounded-2xl border border-black border-solid p-4">
            <h1 className="text-4xl font-bold mt-4">Mis trabajos</h1>
            <section className="mt-8 w-full h-auto flex flex-row ">
                <button onClick={toggleEstado} className={`font-bold ${estado ? 'underline text-orange-500' : ''}`}>Pendientes</button>
                <button onClick={toggleEstado} className={`pl-16 font-bold ${estado ? '' : 'underline text-orange-500'}`}>Realizados</button>
            </section>
            <div className="mt-4 relative w-full">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full py-2 pl-10 pr-4 rounded-lg border-2 border-gray-300 focus:border-color3 outline-none"
                />
                <img
                    src="/icons/lupa.svg"
                    alt="Search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                />
            </div>

            {/* CONTENEDOR DE TRABAJOS DEL EMPLEADO */}
            <div className="mt-4 w-full py-2 pl-4 pr-4 rounded-lg border-2 border-gray-300 focus:border-color3 outline-none">
                <div className="w-full py-2 pr-4 rounded-lg border-2 border-gray-300 focus:border-color3 outline-none"></div>
            </div>

        </div>
    )
}

export default MisTrabajos;