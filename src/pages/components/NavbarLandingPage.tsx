import React from "react";
import { Link } from "react-router-dom";

const NavbarLandingPage = () => {
    return(
        <>
        <div className="w-full h-20 mainBackground px-[5%] flex fixed text-white">
            <div className="w-2/6 flex flex-row justify-start items-center">
                <img src="logo.svg" alt="logo" className="h-full" />
                <p className="text-4xl fontNameLogo"> EasyFixy</p>

            </div>
            <div className="w-4/6 flex flex-row justify-between items-center font-bold text-base">
                <Link to={"/about-us"}>¿Quienes somos?</Link>
                <a href="/Manual de usuario - EasyFixy.pdf" target="_blank" rel="noopener noreferrer">¿Cómo funciona?</a>
                <Link to={"/FAQ"}>Preguntas frecuentes</Link>
                <Link to={"/login"}>Iniciar sesión</Link>
                <Link to={"/register"}>Registrarse</Link>
            </div>

        </div>
        </>
    );
}

export default NavbarLandingPage;