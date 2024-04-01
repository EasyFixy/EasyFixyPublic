import React from "react";
import { useState } from "react";
import  EditarPerfil from "./EditarPerfil";
import { useEffect } from "react";
import { handleRequestWithToken } from "../../Helpers/Request";

const ContenedorPerfil = (props) => {

    let idUser = 1;
    const [loading, setLoading] = useState(true);
    const [estadoDialog, setEstadoDialog] = useState(false);
    const mostrarEditar = () => {
        setEstadoDialog(!estadoDialog);
    }
    //console.log(estadoDialog)

    const [userData, setUserData] = useState(null);

    function getInfoPerfil() {
        setLoading(true);
        handleRequestWithToken(handleRequest);
    }

    const handleRequest = () => {
        const options = {
            method: "GET"
        };
        let url = new URL("http://localhost:3000/getUserProfile?userId="+idUser);
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
        <div className='mt-10 content-center px-32 py-10 w-screen h-auto flex flex-row'>
            <div>{(estadoDialog===true ? (<EditarPerfil/>) : (<p></p>))}</div>
            <div className="w-70 h-70">
                <img src="/icons/icon-user.png" alt="Imagen usuario" className="bg-gray-300 px-2 py-2" />
            </div>
            <div className="px-16 flex flex-col">
                <div>
                    <h1 className="text-3xl font-bold">{loading ? (
            <p>Cargando perfil...</p>
        ) : (
            <>
                {userData.mainData[0].userName}
            </>
        )}</h1>
                    <section className="flex flex-row mt-4">
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1"/>
                        <h3 className="px-16">0.0 2 Calificaciones</h3>
                        <h3>{loading ? (
            <p>Cargando perfil...</p>
        ) : (
            <>
                {userData.mainData[0].antiguedadYears}
            </>
        )}  trabajos realizados</h3>
                    </section>
                    <h2 className="mt-8 text-orange-500 px-4"> • Estoy en linea</h2>
                    <div className="flex flex-row mt-2">
                        <img src="/icons/bandera.png" alt="bandera país" />
                        <h2>Bogotá,Colombia</h2>
                    </div>
                    
                    <div className="flex flex-row mt-2">
                        <img src="/icons/joined.png" alt="Joined" className="px-2 w-10 " />
                        <h2>Joined March 6, 2024</h2>
                    </div>
                    <div className="w-full h-auto mt-4 ml-4 border border-black border-solid px-8 py-4 rounded-3xl">
                        <p>{loading ? (
            <p>Cargando perfil...</p>
        ) : (
            <>
                {userData.resumes.join(", ")}
            </>
        )}</p>
                    </div>
                    <div>{(props.estado===true ? 
                        (<div>
                            <button className="w-14 ml-2 mt-4 mainBackground h-7 text-white w-64 rounded-full border border-black border-solid mb-6" onClick={() => (mostrarEditar())}>Editar Perfil</button>
                            
                        </div>) : (<div></div>) )}</div>
                    
                </div>
            </div>
            
        </div>
    );
}

export default ContenedorPerfil;