import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import ContenedorPerfil from "../components/ContenedorPerfil";
import Comentarios from "../components/Comentarios";
import PerfilesLaborales from "../components/PerfilesLaborales";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { useEffect } from "react";
import { UserData } from "../../models/PerfilEmpleado";


const VisualizarPerfil = () => {

    const [loading, setLoading] = useState(true);
    const [isMyAccount, setIsMyAccount] = useState(true);
    const searchParams = new URLSearchParams(location.search);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // Obtener valores específicos de la URL
    const userId = useAppSelector((login) => login.Auth.id)
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



    function getInfoPerfil() {
        setLoading(true);
        
            fetch(`${baseUrl}getUserProfile?userId=${userId}`)
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

    console.log(userData);
    

    return (
        <div className='w-screen h-screen flex flex-col overflow-y-scroll overflow-x-hidden'>

            {/* <ToolbarDefault/> */}

            <ContenedorPerfil estado={isMyAccount} isLoading={loading} userData={userData} />

            <section className="w-70 h-auto mt-4 ml-4 border border-black border-solid px-8 py-4 rounded-3xl">
                <h1 className="font-bold text-3xl">Skills</h1>
                <ul className="flex flex-wrap mt-4">
                {loading && userData && (!userData.skills || userData.skills.length === 0) ? (
                    <p>Cargando perfil...</p>
                ) : (
                    <>
                        {userData && userData.skills && userData.skills.map((skill, index) => (
                            <li key={index} className="mx-4">{skill.skillName}</li>
                        ))}
                    </>
                )}

                </ul>
            </section>

            <div className="mt-8 w-full h-auto flex flex-row">

                <div className="w-1/2 h-auto flex flex-col">
                    <h1 className="text-3xl font-bold pl-4">Calificaciones</h1>
                    <div className="ml-4 mt-2 pr-8 w-full h-auto flex flex-col border-2 rounded-3xl border-grey-500 p-1">
                    {loading && userData && userData.comments ? (
                        <div className="ml-4 mt-2 pr-8 w-full h-auto flex flex-col border-2 rounded-3xl border-grey-500 p-1">
                            {userData.comments.map((commentGroup, index) => (
                                <React.Fragment key={index}>
                                    {commentGroup.fullComments && commentGroup.fullComments.map((comentario, subIndex) => (
                                        <Comentarios key={subIndex} isLoading={loading} comenData={comentario} />
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    ) : (
                        <p>No hay calificaciones por mostrar...</p>
                    )}
                    </div>
                </div>

                <div className="w-50 h-auto">
                    <h1 className="ml-8 pl-8 font-bold text-3xl text-orange-400 ">Perfiles laborales del empleado</h1>
                    <ul className="w-full ml-16 pl-2 mt-4 border-2 rounded-3xl border-grey-500 p-1">
                        {loading && userData && (!userData.comments || userData.comments.length === 0) ? (
                            <p>No hay perfiles por mostrar...</p>
                        ) : (
                            <>
                                {userData && userData.resumes && userData.resumes.map((resume,index) => (<PerfilesLaborales key={index} isLoading={loading} laboresData={resume} />))}
                            </>
                        )}
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default VisualizarPerfil;