import React from "react";
import { Link } from "react-router-dom";

const NavbarLandingPage = () => {
    return(
        <>
        <div className="w-full min-h-20 mainBackground px-[2%] flex flex-row text-white shadow-1 z-50">
                <div className="h-full lg:w-1/4 flex flex-col md:flex-row justify-start items-center mr-1">
                    <img src="logo.svg" alt="logo" className="h-20" />
                    <p className="text-2xl md:text-3xl fontNameLogo"> EasyFixy</p>

                </div>
                <div className="flex-1 flex flex-col md:flex-row justify-around items-end md:items-center font-bold text-sm md:text-base text-end md:text-center">
                    <Link to={"/about-us"}>¿Quienes somos?</Link>
                    <a href="public\Manual de Técnico - EasyFixy.pdf" target="_blank" rel="noopener noreferrer">¿Cómo funciona?</a>
                    <Link to={"/FAQ"}>Preguntas frecuentes</Link>
                    <Link to={"/login"}>Iniciar sesión</Link>
                    <Link to={"/register"}>Registrarse</Link>
                </div>
            </div>
        </>
    );
}

export default NavbarLandingPage;