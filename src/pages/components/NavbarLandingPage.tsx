import React from "react";
import { Link } from "react-router-dom";

const NavbarLandingPage = () => {
    return(
        <>
        <div className="w-full h-20 mainBackground px-[5%] flex fixed text-white">
            <div className="w-2/6 flex flex-row justify-start items-center">
                <img src="/public/logo.svg" alt="logo" className="h-full" />
                <p className="text-4xl fontNameLogo"> EasyFixy</p>

            </div>
            <div className="w-4/6 flex flex-row justify-between items-center font-bold text-base">
                <Link to={"/"}>Cómo funciona</Link>
                <Link to={"/"}>¿Quienes somos?</Link>
                <Link to={"/login"}>Iniciar sesión</Link>
                <Link to={"/register"}>Registrarse</Link>
            </div>

        </div>
        </>
    );
}

export default NavbarLandingPage;