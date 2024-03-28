import React from "react";
import { useState } from "react";

const EditarPerfil = () =>{

    const [residencia, setResidencia] = useState('');
    const [hora, setHora] = useState('');
    const [telefono, setTelefono] = useState('');

    return(
        
        <div className="ml-20 flex items-center justify-center h-auto w-90 backgroundVerde fixed z-3 px-10 rounded-3xl">
            <form>
                    <h1 className="mt-10 text-3xl font-bold">Editar mis datos</h1>
                    <div className="w-[400px] flex flex-col mb-6 mt-8">
                        <label className="font-boldv">Lugar de residencia</label>
                        <input
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setResidencia(event.target.value) }}
                            placeholder="Type here"
                            type="text" />
                    </div>
                    <div className="w-[400px] flex flex-col mb-6">
                        <label className="custom-label">Zona horaria</label>
                        <input 
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setHora(event.target.value) }}
                            placeholder="Type here"
                            type="text" />
                    </div>
                    <div className="w-[400px] flex flex-col mb-6">
                        <label className="custom-label">Número de telefono</label>
                        <input 
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setTelefono(event.target.value) }}
                            placeholder="Type here"
                            type="number" />
                    </div>
                    

                    <button className="w-full mt-10 backgroundVerde h-14 text-white w-64 rounded-full border border-black border-solid mb-6">Guardar cambios</button>
                    <button className="w-full backgroundVerde h-14 text-white w-64 rounded-full border border-black border-solid mb-6">Cancelar</button>

                </form>

        </div>
    )

}
export default EditarPerfil;