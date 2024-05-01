import React from "react";
import { useState, useEffect } from "react";
//import HomeEmpleado from "../Home Empleado/HomeEmpleado";
//import HomeEmpleador from "../Home Empleador/HomeEmpleador";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleRequestWithToken } from "../../Helpers/Request";
import { setChecked3 } from "../../features/Auth/Auth";

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
    const userId = useAppSelector((login) => login.Auth.id);
    // const checked = useAppSelector((state) => state.Auth.checked); // Obtiene el valor de checked desde el Redux

    //console.log(userId)
    let imagen = '/icons/usuario.png'
    let nombre = 'Nombre de usuario'
    const navigate = useNavigate();
    let location = props.tipe == "employee"

    const [checked, setChecked] = useState(!location);

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
                console.log(data)
                setUser(data.data[0])
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error como desees
            });
    }



    const toggleChecked = () => {
        const newChecked = !checked; // Nuevo valor de checked
        setChecked(newChecked); // Actualizar estado local
        dispatch(setChecked3(newChecked)); // Actualizar estado de Redux
        if (checked) {
            navigate("/my/home/employee");
        } else {
            navigate("/my/home/employer");
        }
    };


    useEffect(() => {
        handleRequestWithToken(dispatch, handleRequest)
    }, []);

    return (
        <div className="w-full h-16 mainBackground flex justify-between items-center p-4">
            <Link to={'/'}>
                <div className="flex flex-row justify-start items-center">
                    <p className="text-3xl "> EasyFixy</p>
                    <img src="/icons/icon.svg" alt="logo" className="w-16 pl-2.5" />

                </div>
            </Link>

            <div className="flex flex-row justify-start items-center">
                <div className="flex flex-row">
                    <img src="/icons/llaves.svg" alt="llaves" className="w-10 pl-2.5" />
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
                    <img src="/icons/user-icon.svg" alt="usuario" className="w-10 pl-2.5" />
                </div>
            </div>


            <div className="w-2/4 flex flex-row justify-end items-center">
                <button className="flex flex-row items-center mr-8">
                    <img src="/icons/maletin.svg" alt="maletin de trabajo" />
                    <p className="text-white ml-2">Mis trabajos</p>
                    {checked ? (
                        <></>
                    ) : (
                        <Link to="/my/home/employer"></Link>
                    )}
                </button>
                
                <Link to={'/my/profile/employee'}>
                <div className="flex flex-row items-center">
                    <img src="/icons/foto_user.svg" alt="foto del usuario" />
                    <p className="text-white ml-4">{user ? user.userName : ""}</p>
                </div>
                </Link>
            </div>

        </div>
    )

}
export default ToolbarDefault;