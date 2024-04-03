import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import ContenedorPerfil from "../components/ContenedorPerfil";
import Comentarios from "../components/Comentarios";
import PerfilesLaborales from "../components/PerfilesLaborales";

import { useEffect } from "react";
import { UserData } from "../../models/PerfilEmpleado";


const VisualizarPerfil = () => {

    const [loading, setLoading] = useState(true);
    const [isMyAccount, setIsMyAccount] = useState(true);
    const searchParams = new URLSearchParams(location.search);

    // Obtener valores específicos de la URL
    const userId = searchParams.get('userId');

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
                        cantidadTotalComentariosEmployee: 0,
                        mediaCalificaciones: 0
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

    console.log(userData.skills[0].skillName);


    function getInfoPerfil() {
        setLoading(true);
        
            fetch("http://localhost:3000/getUserProfile?userId="+userId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setUserData(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
            });
    }

    // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
    useEffect(() => {
        getInfoPerfil();
    }, []);


    return (
        <div className='w-screen h-screen flex flex-col overflow-y-scroll'>

            <ToolbarDefault />

            <ContenedorPerfil estado={isMyAccount} isLoading={loading} userData={userData} />

            <section className="w-90 h-auto mt-4 ml-4 border border-black border-solid px-8 py-4 rounded-3xl mr-8">
                <h1 className="font-bold text-3xl">Skills</h1>
                <ul className="flex flex-wrap mt-4">
                    {loading ? (
                        <p>Cargando perfil...</p>
                    ) : (
                        <>
                            {userData.skills.map((skill) => (<li className="mx-4">{skill.skillName}</li>))}
                        </>
                    )}

                </ul>
            </section>

            <div className="mt-8 w-full h-auto flex flex-row">

                <div className="w-1/2 h-auto flex flex-col">
                    <h1 className="text-3xl font-bold pl-4">Calificaciones</h1>
                    <div className="ml-4 mt-2 pr-8 w-full h-screen flex flex-col border-2 border-grey-500 p-1">
                        {/* <Comentarios isLoading={loading} comenData={userData}/> */}
                        {loading && userData.comments ? (
                            <p>Cargando comentarios...</p>
                        ) : (
                            <>
                                {userData.comments.fullComments.map((comentario) => (<Comentarios isLoading={loading} comenData={comentario} />))}
                            </>
                        )}
                    </div>
                </div>

                <div className="w-full-">
                    <h1 className="ml-8 pl-8 font-bold text-3xl text-orange-400 ">Perfiles laborales del empleado</h1>
                    <ul className="w-full ml-16 pl-2 mt-4 border-2 rounded-3xl border-grey-500 p-1">
                        {loading && userData.comments ? (
                            <p>Cargando comentarios...</p>
                        ) : (
                            <>
                                {userData.resumes.map((resume) => (<PerfilesLaborales isLoading={loading} laboresData={resume} />))}
                            </>
                        )}
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default VisualizarPerfil;