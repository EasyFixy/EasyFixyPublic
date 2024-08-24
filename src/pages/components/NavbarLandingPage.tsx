import React from "react";
import { Link } from "react-router-dom";

const NavbarLandingPage = () => {
    return(
        <>
        <div className="w-full h-20 mainBackground px-[5%] flex fixed text-white animate-slideDown">
            <div className="w-2/6 flex flex-row justify-start items-center animate-fadeIn">
                <img src="logo.svg" alt="logo" className="h-full" />
                <Link to="/" className="text-4xl fontNameLogo ml-2 relative transform transition duration-300 ">EasyFixy</Link>
            </div>
            <div className="w-4/6 flex flex-row justify-between items-center font-bold text-base">
                <Link to={"/about-us"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">¿Quienes somos?</Link>
                <a href="public\Manual de usuario - EasyFixy.pdf" target="_blank" rel="noopener noreferrer" className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">¿Cómo funciona?</a>
                <Link to={"/FAQ"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">Preguntas frecuentes</Link>
                <Link to={"/login"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">Iniciar sesión</Link>
                <Link to={"/register"} className="relative transform transition duration-300 hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-white hover:before:bottom-[-4px]">Registrarse</Link>
            </div>
        </div>
        </>
    );
}

export default NavbarLandingPage;
