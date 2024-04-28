import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

const RecuperarPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado para indicar si se está cargando
    const [message, setMessage] = useState(""); // Estado para mostrar mensajes

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendResetEmail = async () => {
        setIsLoading(true); // Activar loading antes de hacer la solicitud
        console.log("is loading" + isLoading); // Verifica el valor de loading antes de la solicitud
        try {
            /*const response = await fetch(`${baseUrl}sendResetMail?userEmail=${email}`);
            if (response.ok) {
                toast.success("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");
            } else {
                toast.error("Hubo un error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.");
            }*/
            fetch(`${baseUrl}sendResetMail?userEmail=${email}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if(data.message!=='no encontrado'){
                        if(data.statusCode === 200){
                            toast.success("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");
                        }else {
                            toast.error("Error interno comunicate con atención al cliente");
                        }
                    }else{
                        toast.error("Correo no valido.");
                    }
                    
                    // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
                })
                .catch(error => {
                    toast.error("Hubo un error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.");
                    console.error('Fetch error:', error);
                    // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
                });
        } catch (error) {
            console.error("Error:", error);
            toast.error("Hubo un error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setIsLoading(false); // Desactivar loading después de que la solicitud haya terminado (éxito o fracaso)
            console.log(isLoading); // Verifica el valor de loading después de la solicitud
        }
    };
    return (
        <>
            <div className='w-screen h-screen flex flex-col'>
                <ToolbarDefault />
                <div className="flex-1 flex w-full items-center justify-center relative">
                    {isLoading && ( // Mostrar el componente de carga si isLoading es true
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
                        </div>
                    )}
                    <div className="absolute top-4 left-5 flex flex-row gap-2">
                        <button> <Link to={'/login'} className="flex items-center gap-1 focus:outline-none">
                            <div className="orange-arrow">
                                <img src="/public/icons/arrow-circle-left.svg" alt="" />
                            </div>
                            <span>Regresar</span>
                        </Link></button>
                    </div>
                    <div className="w-[620px] h-[320px] border rounded-md border-[#666666] flex flex-col">
                        <div className="pl-[5%] w-full py-3">
                            <h1 className="text-3xl"> Recuperación de la cuenta</h1>
                            <label>Para proteger tu cuenta, EasyFixy quiere asegurarse de que realmente seas tú la persona que intenta acceder.</label>

                        </div>
                        <div className="px-[5%] border-[#666666] border-y w-full py-6">
                            <div className="flex">
                                <img src="/icons/icon-carta.png" alt="icono" />
                                <h1 className="mb-0 mt-4">Obtener un link de recuperación en tu correo: </h1>
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className="w-full h-10 border border-solid border-[#666666] text-[#666666] pl-4"
                                placeholder="Ingresa tu correo"
                            />
                        </div>
                        <div className="flex flex-row justify-end px-[5%] py-3 gap-4">
                            <button onClick={handleSendResetEmail} className="w-[22%] h-10 mainBackground rounded-full text-white">Continuar</button>
                        </div>
                        <br />
                        {message && <div className="px-[5%] pb-3 text-orange-500">{message}</div>}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                                <ThreeDots color="#00BFFF" height={80} width={80} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                closeOnClick />
        </>
    );
};

export default RecuperarPassword;
