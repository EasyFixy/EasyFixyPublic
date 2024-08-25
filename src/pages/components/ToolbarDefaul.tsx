import React from "react";
import { useState, useEffect } from "react";
//import HomeEmpleado from "../Home Empleado/HomeEmpleado";
//import HomeEmpleador from "../Home Empleador/HomeEmpleador";
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleRequestWithToken } from "../../Helpers/Request";

interface MainData {
    userName: string;
    userPhoneNumber: string;
    userNationalId: string;
    userEmail: string;
    userNationality: string;
    userPrefixNational: number;
    edad: number;
    antiguedadYears: number;
    antiguedadMonths: number;
    userDateOfRegister: string; // Considera usar un tipo de fecha adecuado aquí
}

interface Skill {
    skillId: number;
    skillName: string;
}

interface Labor {
    laborId: number;
    laborCategoryId: number;
    laborName: string;
}

interface Resume {
    resumeId: number;
    resumeDescription: string;
    resumeTimeExperience: number;
    resumeTitleLabor: string;
    labors: Labor[];
}

interface FullComment {
    commentId: number;
    senderId: number;
    commentCalification: number;
    commentMessage: string;
    commentDate: string; // Considera usar un tipo de fecha adecuado aquí
    senderName: string;
}

interface CommentsData {
    cantidadTotalComentariosEmployee: number;
    mediaCalificaciones: number;
}

interface Comments {
    fullComments: FullComment[];
    data: CommentsData[];
}

interface TempData {
    userTempDataActive: number;
    userTempDataLatitude: string;
    userTempDataLongitude: string;
    userTempDataLastUpdate: string; // Considera usar un tipo de fecha adecuado aquí
}

interface User {
    antiguedadMonths: number;
    antiguedadYears: number;
    edad: number;
    userDateOfRegister: string;
    userEmail: string;
    userName: string;
    userNationalId: string;
    userNationality: string;
    userPhoneNumber: string;
    userPrefixNational: string;
}

const ToolbarDefault = (props) => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const userId = useAppSelector((login) => login.Auth.id)

    //console.log(userId)
    let imagen = '/icons/usuario.png'
    let nombre = 'Nombre de usuario'
    const navigate = useNavigate();
    let location = useLocation()
    

    
    const [checked, setChecked] = useState(!(location.pathname=='/my/home/employee'));

    const handleRequest = () => {

        //console.log("llega")
        fetch(`${baseUrl}getBasicUserInfo?userId=${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUser(data.data[0])
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error como desees
            });
    }



    const toggleChecked = () => {
        setChecked(prev => !prev);
        if (checked) {
            navigate("/my/home/employee");
        } else {
            navigate("/my/home/employer");
        }
    };


    useEffect(() => {
        handleRequestWithToken(dispatch, handleRequest)
    }, [location]);

    return (
        <div className="w-full h-fit sm:h-16 mainBackground flex justify-between items-center p-1 sm:p-4">
            <Link to={'/'}>
                <div className="flex flex-row justify-start items-center">
                    <p className="text-[0px] lg:text-3xl "> EasyFixy</p>
                    <img src="/icons/icon.svg" alt="logo" className="sm:w-16 sm:pl-2.5 w-10" />

                </div>
            </Link>

            <div className="flex flex-row justify-start items-center">
                <div className="flex flex-row">
        <           img src={checked ? "/icons/LlavesNegras.svg": "/icons/llaves.svg" } alt="llaves" className="w-10 pl-2.5" />
                </div>

                {/* switch para intercambiar de rol */}
                <label htmlFor="toggle" className="flex items-center cursor-pointer ml-4">
                    <div className="relative">
                        <input
                            id="toggle"
                            type="checkbox"
                            className="hidden"
                            checked={checked}
                            onChange={toggleChecked}
                        />
                        <div className="toggle__line w-10 h-6 color3 rounded-full shadow-inner"></div>
                        <div
                            className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-0 transition-transform duration-300 ease-in-out ${checked ? 'transform translate-x-full bg-green-400' : ''
                                }`}
                        ></div>
                    </div>
                    <div
                        className={`ml-3 text-sm ${checked ? 'text-green-500' : 'text-gray-500'
                            }`}
                    >
                    </div>
                </label>

                <div className="flex flex-row">
                    <img src={checked ?  "/icons/UserGris.svg": "/icons/user-icon.svg"} alt="usuario" className="w-10 pl-2.5" />
                </div>
            </div>


            <div className="w-2/4 flex flex-row justify-end items-center ">
                <div className="flex flex-col sm:flex-row items-center sm:mr-8 ">
                    <img src="/icons/maletin.svg" alt="maletin de trabajo" className="w-6 sm:w-fit"/>
                    {checked ? (
                        <Link to="/my/home/employer"><p className="text-white text-center ml-2 text-sm sm:text-base">Mis trabajos</p></Link>
                    ) : (
                        <Link to="/my/home/employee"><p className="text-white text-center ml-2 text-sm sm:text-base">Mis trabajos</p></Link>
                    )}
                </div>
                
                <Link to={'/my/profile/employee'}>
                    <div className="flex items-center flex-col sm:flex-row ">
                        <img src="/icons/foto_user.svg" alt="foto del usuario" className="w-6 sm:w-fit"  />
                        <p className="text-white ml-4 text-center text-sm sm:text-base">{user ? user.userName : ""}</p>
                    </div>
                </Link>
            </div>

        </div>
    )

}
export default ToolbarDefault;