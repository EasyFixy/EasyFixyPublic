import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const LandingPage = () =>{
    
    return(
        <div className='w-screen h-screen flex flex-col'>
            <div className="w-full min-h-20 mainBackground px-[2%] flex flex-row text-white shadow-1 z-10">
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
            
            <div className="w-full flex-1 overflow-y-scroll">
                <div className="backgroundLanding w-full pt-[30px] px-[5%] flex flex-col justify-between min-h-[500px] h-max pb-20 text-white">

                    <h1 className="text-base sm:text-2xl leading-none sm:w-1/2 mb-6">
                        Contrata a los mejores empleados para tus necesidades cotidianas, en línea.
                    </h1>
                    <ul className="text-sm lg:text-xl mb-6">
                        <li>
                            El mercado independiente más grande de Colombia
                        </li>
                        <li>
                            Cualquier trabajo cotidiano que puedas pensar
                        </li>
                        <li>
                            Obten un descuento de bienvenida
                        </li>
                        <li>
                            Paga solo cuando estés 100% satisfecho
                        </li>
                    </ul>
                    <div className="flex flex-col md:flex-row lg:text-xl h-12 gap-3 md:gap-14 mb-6 ">
                        <Link to={"/login"}className="mainBackground h-full w-max rounded-full flex items-center justify-center px-4 shadow-1 ">
                            Contrata ahora mismo
                        </Link>
                        <Link to={"/login"} className="bg-black h-full rounded-full w-max flex items-center justify-center px-4 shadow-1">
                            Gana dinero realizando trabajos
                        </Link>
                    </div>
                </div>
                <div className="h-10 w-full mainBackground ">

                </div>
                <div className="min-h-[500px] h-max w-full backgroundLanding2 flex  flex-col md:flex-row px-[5%] justify-start items-center text-white">
                    
                    <div className="mainBackground md:h-[400px] md:w-1 mr-3">

                    </div>
                    <h1 className="text-base sm:text-3xl leading-normal md:w-1/3  font-bold md:mr-24 my-10">Haz el trabajo en nuestras diferentes 
                        <span className="textNaranja"> categorías
                        </span>
                    </h1>
                    <ul className="text-base sm:text-2xl">
                        <li>
                            Comercial y Ventas
                        </li>
                        <li>
                            Informática
                        </li>
                        <li>
                            Artes y Oficios
                        </li>
                        <li>
                            Turismo
                        </li>
                        <li>
                            Restauración
                        </li>
                        <li>
                            Técnicos
                        </li>
                        <li>
                            Compras y logística
                        </li>
                        <li>
                            Profesiones varias
                        </li>
                    </ul>
                </div>
                <Footer />
            </div>
            
        </div>
    );
}
export default LandingPage;