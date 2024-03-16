import React from "react";
import ToolbarDefault from "../components/ToolbarDefaul";

const DatosPerfilEmpleado = () => {
    return(
        <div className='w-screen h-screen flex flex-col'>


            <ToolbarDefault/>


            <div className="h-screen flex flex-col content-center px-64 py-10">
                <div className="w-70 h-70">
                    <img src="/icons/icon-datos-perfil.svg" alt="Icono de perfil" />
                </div>
                <div>
                    <h1 className="text-xl mt-4 font-bold">Cuéntanos un poco sobre ti</h1>
                    <h3 className="mt-4">Llena tu perfil para que los clientes puedan entender tu trabajo</h3>
                    <h1 className="text-xl mt-4 font-bold">¿A qué te dedicas?</h1>
                    <h3 className="mt-4">Escribe una descripción de una línea sobre ti</h3>
                </div>
                <input
                    className="mt-4 w-full flex flex-col h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl"
                    onChange={(event) => { setUsername(event.target.value) }}
                    placeholder="p.ej Arreglo electrodomésticos"
                    type="text"
                    />
                <div className="mt-8">
                    <h1 className="text-xl mt-4 font-bold">Descríbete</h1>
                </div>
                <input
                    className="mt-4 w-full h-20 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl"
                    onChange={(event) => { setUsername(event.target.value) }}
                    placeholder="Describe tus habilidades, fortalezas y experiencias. Proporciona más detalles sobre los servicios que ofreces, las cosas en las que estás interesado y lo que te gusta hacer."
                    type="text"
                />
                <div className="flex justify-center items-center">
                    <button className="w-auto mt-10 mr-80 py-0 color3 h-14 text-white px-4 rounded-full border border-black border-solid">Regresar</button>
                    <button className="w-auto mt-10 backgroundVerde h-14 text-white px-4 py-0 rounded-full border border-black border-solid">Siguiente</button>
                </div>
            </div>

        </div>
    );
}

export default DatosPerfilEmpleado;