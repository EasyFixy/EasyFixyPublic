import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
const NewPassword = () =>{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    return(
        <div className='w-screen h-screen flex flex-col'>
            <ToolbarDefault/>
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
                        />
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="w-full h-10 border border-solid border-[#666666] text-[#666666] pl-4"
                        />
                    </div>
                    <div className="flex flex-row justify-end px-[5%] py-3 gap-4">
                        <button className="w-[22%] h-10 bg-[#585858] rounded-full text-white">Cancelar</button>
                        <button className="w-[22%] h-10 backgroundVerde rounded-full text-white">Continuar</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NewPassword;