import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const NewPassword = () =>{

    // Define estado para almacenar los valores de id y tempPass
  const [id, setId] = useState(null);
  const [tempPass, setTempPass] = useState(null);

    useEffect(() => {
        // Obtener la URL actual
        const currentUrl = window.location.href;

        // Crear un objeto URLSearchParams para acceder a los parámetros de la URL
        const params = new URLSearchParams(currentUrl);

        // Obtener los valores de los parámetros id y tempPass
        const idFromUrl = params.get('id');
        const tempPassFromUrl = params.get('tempPass');

        // Decodificar el valor de id si es necesario
        const decodedId = idFromUrl ? decodeURIComponent(idFromUrl) : null;

        // Establecer los valores en el estado
        setId(decodedId);
        setTempPass(tempPassFromUrl);

        // Dependiendo de lo que necesites hacer, puedes usar los valores aquí o pasarlos al estado del componente.
    }, []);

    
    
    

    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    
    
    const resetPassword = (e) => {
        e.preventDefault();
        if(password===confirmPassword){
            const data = {
                id: id,
                tempPass: tempPass,
                password: password
            };
            console.log(tempPass);
            
            const url = `http://localhost:3000/resetPassword?user_id=${encodeURIComponent(id)}&tempPasswordChangeValue=${encodeURIComponent(tempPass)}&newPassword=${encodeURIComponent(password)}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La solicitud no fue exitosa');
                    }
                    return response.json(); // Si esperas una respuesta JSON
                })
                .then(result => {
                    // Aquí puedes trabajar con los datos obtenidos en la respuesta            
                    if (result.token) {
                        console.log(result.token);
                        localStorage.setItem('token', result.token)
                    } else {
                        console.log('paila');
                        
                    }
                })
                .catch(error => {
                    console.error('Hubo un problema con la solicitud fetch:', error);
                });

        } else {
            console.log('Las contraseñas no coinciden');
            
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    return(
        <div className='w-screen h-screen flex flex-col'>
            {/* <ToolbarDefault/> */}
            <div className="flex-1 flex w-full items-center justify-center relative">
                <div className="absolute top-4 left-5 flex flex-row gap-2">
                    <img src="/public/icons/arrow-circle-left.svg" alt="" />
                    <span>Back</span>
                </div>
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
                        <button className="w-[22%] h-10 bg-[#585858] rounded-full text-white">Cancelar</button>
                        <button className="w-[22%] h-10 mainBackground rounded-full text-white" onClick={resetPassword}>Continuar</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NewPassword;