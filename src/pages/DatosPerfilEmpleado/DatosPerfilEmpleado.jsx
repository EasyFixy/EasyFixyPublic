import React, { useState, useEffect } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DatosPerfilEmpleado = () => {
    const [title, setTitle] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");

    const handleFieldsVerification = (e) => {
        if (!(title && experience && description)) {
            e.preventDefault();
            toast.warn("Complete todos los datos");
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col overflow-y-auto pb-16">
            {/* <ToolbarDefault tipe="employee"/> */}

            <div className="flex flex-col content-center px-64 py-10">
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
                    onChange={(event) => { setTitle(event.target.value) }}
                    placeholder="p.ej Arreglo electrodomésticos"
                    type="text"
                />
                <div className="mt-8">
                    <h1 className="text-xl mt-4 font-bold">Tiempo de experiencia (años)</h1>
                </div>
                <input
                    className="mt-4 w-full h-20 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl"
                    onChange={(event) => { setExperience(event.target.value) }}
                    placeholder="5"
                    type="number"
                />
                <div className="mt-8">
                    <h1 className="text-xl mt-4 font-bold">Descríbete</h1>
                </div>
                <textarea
                    className="mt-4 w-full h-40 border border-solid border-[#666666] text-[#666666] pl-4 pt-4 pr-4 pb-2 relative rounded-3xl"
                    onChange={(event) => { setDescription(event.target.value) }}
                    placeholder="Describe tus habilidades, fortalezas y experiencias. Proporciona más detalles sobre los servicios que ofreces, las cosas en las que estás interesado y lo que te gusta hacer."
                    style={{ resize: "vertical" }} // Permite al usuario redimensionar verticalmente
                />
                <div className="flex justify-center items-center">
                    <Link to={ `/my/categories?tipe=createResume&title=${title}&experience=${experience}&description=${description}`} onClick={handleFieldsVerification} className="pt-4 w-auto mt-10 mainBackground h-14 text-white px-4 py-0 rounded-full border border-black border-solid">Siguiente</Link>
                </div>
            </div>
        </div>
    );
}

export default DatosPerfilEmpleado;