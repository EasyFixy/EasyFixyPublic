import React from "react";
import { Link } from "react-router-dom";

const NavbarLandingPage = () => {
    return(
        <>
        <div className="w-full min-h-20 mainBackground px-[5%] flex fixed text-white animate-slideDown  shadow-1 z-50 flex-row">
            <div className="h-full lg:w-1/4 flex flex-col md:flex-row justify-start items-center animate-fadeIn  mr-1">
                <img src="logo.svg" alt="logo" className="h-20" />
                <Link to="/" className="text-2xl md:text-3xl fontNameLogo ml-2 relative transform transition duration-300 ">EasyFixy</Link>
            </div>
            <div className="flex-1 flex flex-col md:flex-row justify-around items-end md:items-center font-bold text-base">
                <Link to={"/about-us"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">¿Quienes somos?</Link>
                <a href="/Manual de Técnico - EasyFixy.pdf" target="_blank" rel="noopener noreferrer" className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">¿Cómo funciona?</a>
                <Link to={"/FAQ"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">Preguntas frecuentes</Link>
                <Link to={"/login"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">Iniciar sesión</Link>
                <Link to={"/register"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">Registrarse</Link>
            </div>
        </div>
        </>
    );
}

export default NavbarLandingPage;
