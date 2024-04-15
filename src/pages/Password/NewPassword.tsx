import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPassword = () => {
    
    // Define estado para almacenar los valores de id y tempPass
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id')
    const tempPass = searchParams.get('tempPass')

    console.log(id, tempPass)

    const resetPassword = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = {
                id: id,
                tempPass: tempPass,
                password: password
            };
            console.log(tempPass);

            const url = `${baseUrl}resetPassword?user_id=${encodeURIComponent(String(id))}&tempPasswordChangeValue=${encodeURIComponent(String(tempPass))}&newPassword=${encodeURIComponent(password)}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La solicitud no fue exitosa');
                    }
                    return response.json(); // Si esperas una respuesta JSON
                })
                .then(result => {
                    console.log(result)
                    // Aquí puedes trabajar con los datos obtenidos en la respuesta            
                    if (result) {
                        console.log(result);
                        toast.success("Contraseña cambiada exitosamente");
                    } else {
                        console.log('paila');
                        toast.warn("Error interno");
                    }
                })
                .catch(error => {
                    console.error('Hubo un problema con la solicitud fetch:', error);
                });

        } else {
            console.log('Las contraseñas no coinciden');
            toast.warn("Las contraseñas no coinciden");
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className='w-screen h-screen flex flex-col'>
            {/* <ToolbarDefault/> */}
            <ToastContainer />
            <div className="flex-1 flex w-full items-center justify-center relative">
                <Link to={"/"}>
                    <div className="absolute top-4 left-5 flex flex-row gap-2">
                        <img src="/public/icons/arrow-circle-left.svg" alt="" />
                        <span>Back</span>
                    </div>
                </Link>
                <div className="w-[620px] h-[320px] border rounded-md border-[#666666] flex flex-col">
                    <div className="pl-[5%] w-full py-3">
                        <h1 className="text-3xl"> Recuperación de la cuenta</h1>
                        <label>Ingresa tu nueva contraseña.</label>

                    </div>
                    <div className="px-[5%] border-[#666666] border-y w-full py-6">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full h-10 border border-solid border-[#666666] text-[#666666] pl-4 mb-6"
                            placeholder="Contraseña nueva"
                        />
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="w-full h-10 border border-solid border-[#666666] text-[#666666] pl-4"
                            placeholder="Repetir contraseña nueva"
                        />
                    </div>
                    <div className="flex flex-row justify-end px-[5%] py-3 gap-4">
                        <Link to={"/"} className="flex justify-center items-center w-[22%] h-10 bg-[#585858] rounded-full text-white">
                            <button className="">Cancelar</button>
                        </Link>
                        <button className="w-[22%] h-10 mainBackground rounded-full text-white" onClick={resetPassword}>Continuar</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NewPassword;