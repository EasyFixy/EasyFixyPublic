import React from "react";
import { useState } from "react";
import  EditarPerfil from "./EditarPerfil";
import { useEffect } from "react";

interface UserData {
    mainData: {
        userName: string;
        antiguedadYears: number | null;
    }[];
    resumes: string[];
}

interface PropsContenedorPerfil {
    estado: boolean,
    nameColor?: String, 
    width?: string,
    textColor?: string,
    paddingX?: string,
    whiteStar?: boolean,
    showDescription?: boolean
}

const ContenedorPerfil = ({
    estado,
    nameColor = 'text-black',
    width = 'w-screen',
    textColor = '',
    paddingX = 'px-32',
    whiteStar = false,
    showDescription = true
}:PropsContenedorPerfil) => {

    let idUser = 1;
    const [loading, setLoading] = useState(true);
    const [estadoDialog, setEstadoDialog] = useState(false);
    const mostrarEditar = () => {
        setEstadoDialog(!estadoDialog);
    }
    //console.log(estadoDialog)

    const [userData, setUserData] = useState<UserData>({
        mainData: [
            {
                userName: '',
                antiguedadYears: null,
            }
        ],
        resumes: ['']
    });

    function getInfoPerfil() {
        setLoading(true);
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
        <div className={` content-center ${paddingX} py-10 ${width} h-auto flex flex-row`}>
            <div>{(estadoDialog===true ? <EditarPerfil/> : <></>)}</div>
            <img src="/icons/icon-user.png" alt="Imagen usuario" className="bg-gray-300 px-2 py-2 w-1/3 aspect-square" />
            <div className="px-16 flex flex-col w-2/3">
                <div>
                    <h1 className={`text-3xl ${nameColor} font-bold`}>
                        {loading ? (
                            <p>Cargando perfil...</p>
                        ) : (
                            <>
                                {userData.mainData[0].userName}
                            </>
                        )}
                    </h1>
                    <section className="flex flex-row mt-4">
                        <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1"/>
                        <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1"/>
                        <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1"/>
                        <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1"/>
                        <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1"/>
                        <h3 className={`${textColor} px-16`}>0.0 2 Calificaciones</h3>
                        <h3 className={`${textColor}`}>{loading ? (
                            <p>Cargando perfil...</p>
                            ) : (
                                <>
                                    {userData.mainData[0].antiguedadYears}
                                </>
                            )}  trabajos realizados
                        </h3>
                    </section>
                    <h2 className="mt-8 text-orange-500 px-4"> • Estoy en linea</h2>
                    <div className="flex flex-row mt-2">
                        <img src="/icons/bandera.png" alt="bandera país" />
                        <h2 className={`${textColor}`}>Bogotá,Colombia</h2>
                    </div>
                    
                    <div className="flex flex-row mt-2">
                        <img src="/icons/joined.png" alt="Joined" className="px-2 w-10 " />
                        <h2 className={`${textColor}`}>Joined March 6, 2024</h2>
                    </div>
                    {showDescription ?

                        <div className="w-full h-auto mt-4 ml-4 border border-black border-solid px-8 py-4 rounded-3xl">
                            <p>{loading ? (
                                <p>Cargando perfil...</p>
                                ) : (
                                    <>
                                        { userData.resumes.join(", ") ?? ''}
                                    </>
                                )}
                                </p>
                        </div>
                        : 
                        <>
                        </>
                    }
                    <div>{(estado===true ? 
                        (<div>
                            <button className="w-14 ml-2 mt-4 mainBackground h-7 text-white w-64 rounded-full border border-black border-solid mb-6" onClick={() => (mostrarEditar())}>Editar Perfil</button>
                            
                        </div>) : (<div></div>) )}</div>
                    
                </div>
            </div>
            
        </div>
    );
}

export default ContenedorPerfil;