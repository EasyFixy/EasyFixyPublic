import React from "react";
import ContenedorPerfil from "../../components/ContenedorPerfil";
import { useState, useEffect } from "react";
import { UserData } from "../../../models/PerfilEmpleado";
import Comentarios from "../../components/Comentarios";
import PerfilesLaborales from "../../components/PerfilesLaborales";
import Chat from "../../components/Chat";

interface queryWorker {
    labors: number[];
    userLatitude: number;
    userLongitude: number;
}

const Negociacion = (props) => {
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(true);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    // PARAMETROS DE LA PETICION 
    const [bestWorkers, setBestWorkest] = useState();
    //const labores = [1,2,3];
    let latitud = 0;
    let longitud = 0;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            longitud = position.coords.longitude;

        });
    } else {
        console.log("La geolocalización no está disponible en este navegador.");
    }


    // Peticion al back para obtener los mejores trabajadores
    function getBestWorkersForLabors() {
        /*const options = {
            method: "POST"
        };
        let url = new URL(`http://localhost:3000/getBestWorkersForLabors?labors=${props.labors}&userLatitude=${latitud}&userLongitude=${longitud}`);
        fetch(url, options)
            .then(response => response.text())
            .then(data => {
                const json = JSON.parse(data);
                console.log("res employers",json);
                setBestWorkest(json.data);
                setUserId(json.data[0].userId);
                getInfoPerfil(json.data[0].userId);
                //console.log(json.data[0].userId);
                
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            })
            .finally(() => {
                
            });*/
        const query: queryWorker = {
            labors: props.labors,
            userLatitude: latitud,
            userLongitude: longitud
        }
        fetch(`${baseUrl}getBestWorkersForLabors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log("info w", data)
                setBestWorkest(data.data);
                setUserId(data.data[0].userId);
                getInfoPerfil(data.data[0].userId);
                
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
                //toast.warn("Error Subiendo");
            });

    }


    const [userData, setUserData] = useState<UserData>({
        mainData: [
            {
                userName: '',
                antiguedadYears: null,
            }
        ],
        skills: [
            {
                skillName: '',
            }
        ],
        resumes: [
            {
                resumeDescription: '',
                resumeTimeExperience: 0,
                resumeTitleLabor: '',
                labors: [
                    {
                        laborName: ''
                    }
                ]
            }
        ],
        comments: [
            {
                fullComments: [
                    {
                        commentCalification: 0,
                        commentMessage: '',
                        senderName: ''
                    }
                ],
                data: [
                    {
                        cantidadTotalComentariosEmployee: 1,
                        mediaCalificaciones: 1
                    }
                ]
            }
        ],
        tempData: [
            {
                userTempDataActive: 0,
                userTempDataLastUpdate: ''
            }
        ]
    });


    function getInfoPerfil(userId) {
        setLoading(true);
        const options = {
            method: "GET"
        };
        let url = new URL(`${baseUrl}getUserProfile?userId=${userId}`);
        fetch(url, options)
            .then(response => response.text())
            .then(data => {
                const json = JSON.parse(data);
                console.log("resultado getinfo", json);
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
        getBestWorkersForLabors();
        setTimeout(() => {
            //getInfoPerfil();
        }, 2000);

    }, []);
    console.log('userData ',userData)

    return (
        <div className="absolute w-screen h-screen z-10 flex items-center justify-center top-0 left-0 m-auto bg-black bg-opacity-75 overflow-auto">
            <div className="w-4/5 h-full">
            <div className="w-full h-auto bg-[#292929] ">

                <ContenedorPerfil userData={userData} estado={false} isLoading={loading} nameColor={'textNaranja'} width="w-full" textColor="text-white" paddingX="px-[2%]" whiteStar={true} showDescription={false} />
                <section className="w-90 h-auto mt-4 ml-4 border border-white border-solid px-8 py-4 rounded-3xl mr-8">
                    <h1 className="font-bold text-3xl textNaranja">Habilidades  </h1>
                    <ul className="flex flex-wrap mt-4">
                        {loading ? (
                            <p>Cargando perfil...</p>
                        ) : (
                            <>
                                {userData.skills.map((skill) => (<li className="mx-4 text-white">{skill.skillName}</li>))}
                            </>
                        )}

                    </ul>
                </section>
                <h1 className="font-bold text-3xl textNaranja ml-8">Perfiles Laborales del empleado</h1>
                <div className="ml-4 mt-2 pr-8 w-1/2 h-auto flex flex-col p-1">
                    {/* <Comentarios isLoading={loading} comenData={userData}/> */}
                    {loading && userData.resumes ? (
                        <p>Cargando comentarios...</p>
                    ) : (
                        <>
                            {userData.resumes.map((resume) => (<PerfilesLaborales isLoading={loading} laboresData={resume} textColor="text-white" />))}
                        </>
                    )}
                </div>
                <h1 className="font-bold text-3xl textNaranja ml-8">Calificaciones</h1>
                <div className="ml-4 mt-2 pr-8 w-1/2 h-auto flex flex-col p-1">
                    {/* <Comentarios isLoading={loading} comenData={userData}/> */}
                    {loading && userData.comments ? (
                        <p>Cargando comentarios...</p>
                    ) : (
                        <>
                            {userData.comments.fullComments.map((comentario) => (<Comentarios isLoading={loading} comenData={comentario} textColor="text-white" />))}
                        </>
                    )}
                </div>
                <div className="ml-4 mt-2 pr-8 w-1/2 h-auto flex flex-col p-1">
                chat
                    <Chat userId={4} destinatary={2} userData ={userData}></Chat>
                </div>
                <section className="flex justify-between items-center p-16 w-90 h-auto mt-4 ml-4 px-8 py-4  mr-8">
                    <div className="flex flex-col flex justify-between items-center">
                        <h1 className="text-white text-3xl font-bold">Cancelar</h1>
                        <button ><img src="/icons/Cancelar.svg" alt="boton cancelar" className="w-10" /></button>
                    </div>
                    <div className="p-4 text-white border border-white border-solid rounded-2xl">Precio acordado</div>
                    <div className="flex flex-col flex justify-between items-center">
                        <h1 className="text-white text-3xl font-bold">Aceptar</h1>
                        <button><img src="/icons/Aceptar.svg" alt="boton cancelar" className="w-10" /></button>
                    </div>
                </section>
            </div>
            </div>
        </div>
    );
}
export default Negociacion;