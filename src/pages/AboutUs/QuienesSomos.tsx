import React from "react";
import NavbarLandingPage from "../components/NavbarLandingPage";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const QuienesSomos = () => {
    return (
        <div className='w-screen h-screen flex flex-col'>
            <NavbarLandingPage /> 
            <div className="flex-1 flex flex-col items-center overflow-y-auto pt-2">
                <div className="w-full flex justify-center relative h-max">
                    <img src="/icons/QuienesSomos.svg" alt="Quienes Somos" className="max-w-full h-auto" />
                    <div className="absolute top-1/3 left-0 w-full flex justify-center items-center text-white">
                        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl">
                            <span className="font-light">¿</span>
                            <span className="font-light">QUIENES</span>
                            <span className="font-bold"> SOMOS</span>
                            <span className="font-light">?</span>
                        </h1>
                    </div>
                </div>
                <div className="w-4/5 flex justify-center p-4 font-bold text-[#292929] text-4xl">
                    <p className="text-center">Con EasyFixy</p>
                </div>
                <div className="w-4/5 p-1 text-gray-500 text-xl mb-8">
                    <p className="text-center mt-4">Los usuarios acceden a un activo ecosistema de bienes y servicios, las personas pueden tanto encontrar solución a sus problemas cotidianos, como también generar un dinero extra trabajando en lo que mejor saben hacer.</p>
                </div>
                <div className="w-screen bg-[#292929] text-white p-8 flex flex-col items-start">
                    <div className="flex flex-col sm:flex-row gap-8">
                        <div className="sm:w-1/2">
                            <h2 className="font-bold text-2xl sm:text-5xl">Nuestra Visión</h2>
                            <p className="mt-10 sm:text-2xl text-1xl sm:leading-[2.5]">Para 2028 ser la plataforma número uno en contratación de servicios temporales laborales en Bogotá, destacándonos por nuestra confianza y transparencia.</p>
                        </div>
                        <div className="flex justify-end flex-1">
                            <img src="/icons/Vision.svg" alt="Vision" className="max-w-full h-auto" />
                        </div>
                    </div>
                </div>
                <div className="w-4/5 flex justify-center p-4 font-bold text-[#292929] sm:text-4xl text-1xl">
                    <p className="text-center">Ecosistema - Modelo de negocios</p>
                </div>
                <div className="w-full justify-center flex flex-col items-center ">
                    <div className=" bg-white rounded-lg border border-gray-300 p-4 sm:w-[60%] mx-2 flex flex-row items-start z-10">
                        <img src="/icons/EmpleadorColor.svg" alt="EmpleadorColor" className="sm:w-1/3 w-1/4 max-w-max  h-auto" />
                        <div className="ml-4">
                            <h2 className="text-[#292929] text-1xl sm:text-2xl font-bold">Empleador</h2>
                            <p className="text-[#666666] text-xs sm:text-base mt-6 mb-6 font-bold">EasyFixy, te da la oportunidad de contratar trabajadores calificados para tus necesidades de servicios cotidianos, de manera rápida, sencilla y eficiente.</p>
                            <Link to="/login" className="text-orange-500 text-1xl sm:text-2xl underline font-bold mt-8">Ir al sitio</Link>
                        </div>
                    </div>
                    
                    <img src="/icons/loop.svg" alt="loop" className="max-w-full sm:max-w-lg  h-auto -my-14 sm:-my-28" />

                    <div className=" mb-8 bg-white rounded-lg border border-gray-300 p-4 sm:w-[60%] mx-2 flex  flex-row items-start z-10 ">
                        <img src="/icons/TrabajadorColor.svg" alt="EmpleadorColor" className="sm:w-1/3 w-1/4 max-w-max  h-auto" />
                        <div className="ml-4">
                            <h2 className="text-[#292929] text-1xl sm:text-2xl font-bold">Trabajador</h2>
                            <p className="text-[#666666] text-xs sm:text-base mt-6 mb-6 font-bold">Somos EasyFixy, una plataforma donde conectamos a trabajadores independientes con trabajos cotidianos a su medida, de manera rápida y eficiente.</p>
                            <Link to="/login" className="text-orange-500 text-1xl sm:text-2xl underline font-bold mt-8">Ir al sitio</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[#292929] text-white p-8 flex items-start">
                    <div className="lg:grid  lg:grid-cols-2 gap-8 flex flex-col-reverse">
                        <div className="flex lg:justify-end justify-center">
                            <img src="/icons/Historia.svg" alt="Historia" className=" sm:max-w-[50%] lg:max-w-full h-auto" />
                        </div>
                        <div className="text-center">
                            <h2 className="font-bold text-2xl lg:text-7xl">Nuestra Historia</h2>
                            <p className="mt-10 text-base lg:text-2xl lg:leading-[2] text-justify">Nuestra empresa fue fundada a inicios de 2024 por un grupo de estudiantes, amantes a la programación, con el sueño de empezar a emprender por medio de esta plataforma. Empezamos con un pequeño catalogo de servicios, pero poco a poco nos dimos cuenta de la demanda de servicios que son solicitados por los Colombianos día a día. Con el tiempo hemos aumentado nuestro número de usuarios lo que nos ha permitido poder cubrir las necesidades de servicios a miles de Colombianos.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white text-[#292929] p-8 flex items-start">
                    <div className="lg:grid  lg:grid-cols-2 gap-8  flex flex-col">
                        <div>
                            <h2 className="font-bold text-2xl lg:text-7xl">Nuestra Misión</h2>
                            <p className="mt-10 text-base lg:text-2xl lg:leading-[2] w-[90%]">En EasyFixy tenemos como misión ofrecer mediante una plataforma web a las personas que tienen habilidades y disponibilidad de tiempo ser empleadas por personas que requieren sus servicios</p>
                            <p className=" text-base lg:text-2xl lg:leading-[2] w-[90%] font-bold mt-10">EasyFixy no es solo una empresa, es un movimiento de crecimiento económico.</p>
                        </div>
                        <div className="flex lg:justify-end justify-center">
                            <img src="/icons/Mision.svg" alt="Mision" className="sm:max-w-[50%] lg:max-w-full h-auto" />
                        </div>
                    </div>
                </div>
                <div className="w-screen bg-[#292929] text-white p-8 items-start">
                    <div className="text-center text-2xl lg:text-5xl font-bold mb-8">
                        Nuestros Fundadores
                    </div>
                    <div className="flex items-start justify-center w-full flex-wrap">
                        <div className="text-center text-lg mx-2 lg:mx-4 max-w-[100px] lg:max-w-full">
                            <img src="/icons/Esteban.svg" alt="Esteban" className="max-w-full h-auto" />
                            <p className="mt-2">Juan Esteban Carranza</p>
                        </div>
                        <div className="text-center text-lg mx-2 lg:mx-4 max-w-[100px] lg:max-w-full">
                            <img src="/icons/Grevy.svg" alt="Grevy" className="max-w-full h-auto" />
                            <p className="mt-2">Grevy Rincón Mejía</p>
                        </div>
                        <div className="text-center text-lg mx-2 lg:mx-4 max-w-[100px] lg:max-w-full">
                            <img src="/icons/Luisda.svg" alt="Luisda" className="max-w-full h-auto" />
                            <p className="mt-2">Luis Daniel Sánchez</p>
                        </div>
                        <div className="text-center text-lg mx-2 lg:mx-4 max-w-[100px] lg:max-w-full">
                            <img src="/icons/Mahecha.svg" alt="Mahecha" className="max-w-full h-auto" />
                            <p className="mt-2">Juan Esteban Mahecha</p>
                        </div>
                    </div>
                    <div className=" text-justify text-base lg:text-xl mb-4 mt-8">
                    En nuestra empresa valoramos la calidad, transparencia y la confianza. Siempre buscamos que nuestros usuarios tanto trabajadores como empleadores ofrezcan la mejor calidad con sus servicios, dando confianza al usuario y transparencia al realizar el servicio.
                    </div>
                    
                </div>
                <div className="bottom-0 w-full z-50">
                <Footer /> 
                </div>
                 
            </div>
            
            
        </div>
    );
}

export default QuienesSomos;
