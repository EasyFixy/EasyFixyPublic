import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";

const RecuperarPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

    const handleSendResetEmail = async () => {
        try {
          const response = await fetch(`http://localhost:3000/sendResetMail?userEmail=${email}`);
          if (response.ok) {
            setMessage("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");
          } else {
            setMessage("Hubo un error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.");
          }
        } catch (error) {
          console.error("Error:", error);
          setMessage("Hubo un error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.");
        }
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
                </div>
            </div>
        </div>
    );
};

export default RecuperarPassword;