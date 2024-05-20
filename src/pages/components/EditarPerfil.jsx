import React from "react";
import { useState } from "react";
import { handleRequestWithToken } from "../../Helpers/Request";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const EditarPerfil = () =>{

    const [prefijo, setPrefijo] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cambios, setCambios] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const token = useAppSelector(state => state.Auth.token);

    const editUserData = (e) => {
        e.preventDefault();
        handleRequestWithToken(request());

    }
    const request = () => {
        const data = {
            prefijo: prefijo,
            nacionalidad: nacionalidad,
            telefono: telefono,
            token: token
        };
        const url = `${baseUrl}modifyUserInfo?token=${encodeURIComponent(token)}&user_prefix_national=${encodeURIComponent(prefijo)}&user_nationality=${encodeURIComponent(nacionalidad)}&phone_number=${encodeURIComponent(telefono)}`;
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
                    localStorage.setItem('token', result.token)
                    setCambios(true);
                    window.location.reload();
                } else {
                    setCambios(false);
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }

    return(
        
        <div className="ml-20 flex items-center justify-center h-auto w-auto mainBackground fixed z-3 px-10 rounded-3xl overflow-auto">
            <form>
                    <h1 className="mt-4 text-3xl font-bold">Editar mis datos</h1>
                    <div className="w-full flex flex-col mb-2 mt-2">
                        <label className="font-boldv">Prefijo nacional</label>
                        <input
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setPrefijo(event.target.value) }}
                            placeholder="Type here"
                            type="text" />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                        <label className="custom-label">Nacionalidad</label>
                        <input 
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setNacionalidad(event.target.value) }}
                            placeholder="Type here"
                            type="text" />
                    </div>
                    <div className="w-[400px] flex flex-col mb-6">
                        <label className="custom-label">Número de teléfono</label>
                        <input 
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setTelefono(event.target.value) }}
                            placeholder="Type here"
                            type="number" />
                    </div>
                    

                    <button className="w-full mt-2 backgroundVerde h-14 text-white w-64 rounded-full border border-black border-solid mb-6" onClick={editUserData}>Guardar cambios</button>
                    <button className="w-full backgroundVerde h-14 text-white w-64 rounded-full border border-black border-solid mb-6">Cancelar</button>

                </form>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            
        </div>
    )

}
export default EditarPerfil;