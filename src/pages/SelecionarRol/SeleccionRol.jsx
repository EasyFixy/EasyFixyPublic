import React from "react";
import { Link } from "react-router-dom";
function SeleccionRol() {
    return (
        <div className="flex items-center justify-center h-screen w-screen p-2">
            <section className="w-auto h-auto sm:shadow-1">

                <div className="w-auto h-auto sm:border px-6 py-6">
                    <div className="flex flex-row px-1 py-1 flex-wrap">
                        <button className="pr-14 font-bold text-2xl">⭠</button>
                        <img src="/icons/logo-texto.svg" alt="icono" />
                    </div>
                    <h1 className="font-bold text-2xl" >Selecciona tu rol:</h1>
                    <h2>No te preocupes puedes cambiarlo mas adelante</h2>
                </div>

                <div>
                    <Link to={'/my/home/employee'}>
                        <div className="flex flex-row mx-4 my-2 w-auto h-auto shadow-1 justify-center items-center">
                            <img src="/icons/rol1.png" alt="provisional" className="w-28 h-28 p-2" />
                            <p className="ml-4 ">Quiero trabajar</p>
                            <div className="mx-2 font-bold text-5xl text-orange-400">⭢</div>
                        </div>
                    </Link>

                </div>

                <div>
                    <Link to={'/my/home/employer'}>
                        <div className="flex flex-row mx-4 my-2 w-auto h-auto shadow-1 justify-center items-center">
                            <img src="/icons/rol2.png" alt="provisional" className="w-28 h-28 p-2" />
                            <p className="ml-4">Quiero contratar</p>
                            <div className="ml-4 font-bold text-5xl text-orange-400">⭢</div>
                        </div>
                    </Link>

                </div>
            </section>
        </div>
    )
}

export default SeleccionRol;