import React from "react";
import { useState } from "react";
import  EditarPerfil from "./EditarPerfil";

const ContenedorPerfil = (props) => {

    const [estadoDialog, setEstadoDialog] = useState(false);
    const mostrarEditar = () => {
        setEstadoDialog(!estadoDialog);
    }
    console.log(estadoDialog)

    return(
        <div className='mt-10 content-center px-32 py-10 w-screen h-auto flex flex-row'>
            <div>{(estadoDialog===true ? (<EditarPerfil/>) : (<p></p>))}</div>
            <div className="w-70 h-70">
                <img src="/icons/icon-user.png" alt="Imagen usuario" className="bg-gray-300 px-2 py-2" />
            </div>
            <div className="px-16 flex flex-col">
                <div>
                    <h1 className="text-3xl font-bold">Nombre del empleado</h1>
                    <section className="flex flex-row mt-4">
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <h3 className="px-16">0.0 2 Calificaciones</h3>
                        <h3>N/A Trabajos realizados</h3>
                    </section>
                    <h2 className="mt-8 text-orange-500 px-4"> • Estoy en linea</h2>
                    <div className="flex flex-row mt-2">
                        <img src="/icons/bandera.png" alt="bandera país" />
                        <h2>Bogotá,Colombia</h2>
                    </div>
                    <div className="flex flex-row mt-2">
                        <img src="/icons/clock.png" alt="Reloj" className="px-2 w-10 " />
                        <h2>It's currently 2:26 AM here</h2>
                    </div>
                    <div className="flex flex-row mt-2">
                        <img src="/icons/joined.png" alt="Joined" className="px-2 w-10 " />
                        <h2>Joined March 6, 2024</h2>
                    </div>
                    <div className="flex flex-row mt-2">
                        <img src="/icons/like.png" alt="Manito de me gusta" className="px-2 w-10 " />
                        <h2>0 Recommendations</h2>
                    </div>
                    <div>{(props.estado===true ? 
                        (<div>
                            <button className="w-14 ml-2 mt-4 backgroundVerde h-7 text-white w-64 rounded-full border border-black border-solid mb-6" onClick={() => (mostrarEditar())}>Editar Perfil</button>
                            
                        </div>) : (<div></div>) )}</div>
                    
                </div>
            </div>
            
        </div>
    );
}

export default ContenedorPerfil;