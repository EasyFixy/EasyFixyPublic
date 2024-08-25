import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { removeToken } from "../../Helpers/Token";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from 'react-toastify';

const NavbarEmpleado = (props) => {
    const userEnPlataforma = useAppSelector((state) => state.Auth.id);
    const token = useAppSelector((state) => state.Auth.token);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const dispatch = useAppDispatch();

    const getUserLocation = (callback) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                callback(true, position.coords);
            });
        } else {
            console.log("Geolocalización no soportada por este navegador.");
            toast.warn("Permita la geolocalización");
        }
    }

    const toggleChecked = () => {
        let status = !props.checked;
        if (status) {
            getUserLocation(props.updateUserTempData);
        } else {
            props.updateUserTempData(false);
        }
    };

    const logOut = () => {
        removeToken(dispatch);
        // navigate("/");
    }

    const getUserStatus = () => {
        fetch(`${baseUrl}getUserStatus?userId=${userEnPlataforma}`)
            .then((response) => response.text())
            .then((data) => {
                const json = JSON.parse(data);
                props.setChecked(json.data[0].userTempDataActive);
                props.setTipe(json.data[0].userTempDataActive ? 'waitingBid' : null);
            })
            .catch((error) => {
                console.error("Error fetching user status:", error);
                toast.warn("Error interno");
            });
    }

    useEffect(() => {
        getUserStatus();
    }, []);

    return (
        <div className="w-full h-max sm::h-8 color3 flex justify-around sm:justify-between items-center sm:p-4 p-1 flex-row flex-wrap">
            <div className="flex flex-row sm:justify-start justify-around items-center lg:gap-12 gap-4">
                <Link to={"/my/chats"} className="relative group">
                    <button className="text-white text-sm sm:text-base relative transition-all duration-300 group-hover:text-cyan-600 group-hover:scale-105 group-hover:before:content-[''] group-hover:before:absolute group-hover:before:w-full group-hover:before:h-1 group-hover:before:bg-cyan-600 group-hover:before:bottom-[-4px] group-hover:before:left-0 group-hover:before:transition-all group-hover:before:duration-300">Chats</button>
                </Link>
                <Link to={"/my/profile/employee/create/skills"} className="relative group">
                    <button className="text-white text-sm sm:text-base relative transition-all duration-300 group-hover:text-cyan-600 group-hover:scale-105 group-hover:before:content-[''] group-hover:before:absolute group-hover:before:w-full group-hover:before:h-1 group-hover:before:bg-cyan-600 group-hover:before:bottom-[-4px] group-hover:before:left-0 group-hover:before:transition-all group-hover:before:duration-300">Crear habilidades</button>
                </Link>
                <Link to={"/my/profile/employee/create/personalinformation"} className="relative group">
                    <button className="text-white text-sm sm:text-base relative transition-all duration-300 group-hover:text-cyan-600 group-hover:scale-105 group-hover:before:content-[''] group-hover:before:absolute group-hover:before:w-full group-hover:before:h-1 group-hover:before:bg-cyan-600 group-hover:before:bottom-[-4px] group-hover:before:left-0 group-hover:before:transition-all group-hover:before:duration-300">Crear perfil</button>
                </Link>
            </div>
            <div className="lg:w-2/4 flex flex-row justify-end items-center lg:gap-12 gap-4">
                <p className="text-white text-sm sm:text-base">No activo</p>
                <label htmlFor="second-toggle" className="flex items-center cursor-pointer ">
                    <div className="relative">
                        <input
                            id="second-toggle"
                            type="checkbox"
                            className="hidden"
                            checked={props.checked}
                            onChange={toggleChecked}
                        />
                        <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                        <div
                            className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 ease-in-out ${props.checked ? 'transform translate-x-full bg-green-400' : ''
                                }`}
                        ></div>
                    </div>
                </label>
                <p className={` ${props.checked ? 'text-green-500' : 'text-white'} text-sm sm:text-base`}>Activo</p>
                <a href="https://wa.me/3208393883" className="relative group">
                    <button className="text-white  text-sm sm:text-base relative transition-all duration-300 group-hover:text-cyan-600 group-hover:scale-105 group-hover:before:content-[''] group-hover:before:absolute group-hover:before:w-full group-hover:before:h-1 group-hover:before:bg-cyan-600 group-hover:before:bottom-[-4px] group-hover:before:left-0 group-hover:before:transition-all group-hover:before:duration-300">Soporte</button>
                </a>
                <button className="text-white  text-sm sm:text-base relative transition-all duration-300 group-hover:text-cyan-600 group-hover:scale-105 group-hover:before:content-[''] group-hover:before:absolute group-hover:before:w-full group-hover:before:h-1 group-hover:before:bg-cyan-600 group-hover:before:bottom-[-4px] group-hover:before:left-0 group-hover:before:transition-all group-hover:before:duration-300" onClick={logOut}>Salir</button>
            </div>
        </div>
    );
}

export default NavbarEmpleado;
