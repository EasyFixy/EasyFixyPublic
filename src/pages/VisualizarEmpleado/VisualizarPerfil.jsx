import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import ContenedorPerfil from "../components/ContenedorPerfil";
import Comentarios from "../components/Comentarios";

import { useEffect } from "react";

const VisualizarPerfil = () => {

    const [loading, setLoading] = useState(true);
    const [isMyAccount, setIsMyAccount] = useState(true);
   
    const [userData, setUserData] = useState(null);

    function getInfoPerfil() {
        setLoading(true);
        const options = {
            method: "GET"
        };
        let url = new URL("http://localhost:3000/getUserProfile?userId="+1);
        fetch(url, options)
            .then(response => response.text())
            .then(data => {
                const json = JSON.parse(data);
                console.log(json);
                setUserData(json.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
        // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
    useEffect(() => {
        getInfoPerfil();
    }, []);

    return(
        <div className='w-screen h-screen flex flex-col overflow-y-scroll'>
            
            <ToolbarDefault/>

            <ContenedorPerfil estado={isMyAccount}/>

            <section className="w-90 h-auto mt-4 ml-4 border border-black border-solid px-8 py-4 rounded-3xl mr-8">
                <h1 className="font-bold text-3xl">Skills</h1>
                <ul className="flex flex-row mt-4">
                {loading ? (
            <p>Cargando perfil...</p>
        ) : (
            <>
                {userData.skills.join(", ")}
            </>
        )}
                    
                </ul>
            </section>

            <div className="mt-8 w-full h-auto flex flex-row">

                <div className="w-1/2 h-auto flex flex-col">
                    <h1 className="text-3xl font-bold pl-4">Calificaciones</h1>
                    <div className="ml-4 mt-2 pr-8 w-full h-screen flex flex-col border-2 border-grey-500 p-1">
                        <Comentarios/>
                        <Comentarios/>
                    </div>
                </div>

                <div>
                    <h1 className="ml-8 pl-8 font-bold text-3xl text-orange-400 ">Perfiles laborales del empleado</h1>
                    <ul className="ml-16 pl-2 mt-4 border-2 border-grey-500 p-1">
                        <li>Maestro de obra</li>
                        <li>Albañil</li>
                    </ul>
                </div>
                
            </div>
            
        </div>
    );
}

export default VisualizarPerfil;