import React, { ChangeEvent, useEffect, useState } from 'react';
import { handleRequestWithToken } from "../../Helpers/Request";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ReactFlagsSelect from 'react-flags-select';
import { countries } from "../../data/Countries";
import { toast } from 'react-toastify';

const EditarPerfil = ({ onClose }) =>{

    const [formData, setFormData] = useState({});
    const [countrySelected, setCountrySelected] = useState("");
    const [nombre, setNombre]  = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;
    
    const handleClose = () => {
        onClose();
      };

    const token = useAppSelector(state => state.Auth.token);

    const editUserData = (e) => {
        e.preventDefault();
        if(verifyFields()){
            request();
            toast.info('Información cambiada con éxito');
            setTimeout(() => {
                window.location.reload();
            }, 3000); // 5000 milisegundos = 5 segundos
        } else {
            toast.info('Revisa bien los campos');
        }
    }

    const verifyFields = () => {
        // if (Object.keys(formData).length === 0) {
        //     toast.info('Debes seleccionar un país');
        //     return false;
        // }
        // if (!formData.userPhoneNumber) {
        //     toast.info('Debes ingresar un número de teléfono');
        //     return false;
        // }
        return true;
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    console.log(formData.name);

    const request = () => {
        const data = {
            token: token
        };
        const url = `${baseUrl}modifyUserInfo?token=${encodeURIComponent(token)}&user_prefix_national=${encodeURIComponent(formData.userPrefixNational)}&user_nationality=${encodeURIComponent(formData.userNationality)}&phone_number=${encodeURIComponent(formData.userPhoneNumber)}&name=${encodeURIComponent(nombre)}`;
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
                    console.log(result);
                    
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }

    return(
        
        <div className="ml-20 flex items-center justify-center h-auto w-auto mainBackground fixed z-3 px-10 rounded-3xl overflow-auto">
            <form>
                    <h1 className="mt-4 text-3xl font-bold mb-8">Editar mis datos</h1>
                    <label className="font-boldv mt-8">Prefijo nacional</label>
                    <div className='w-full flex flex-row mb-6 h-10 border border-solid border-black text-[#666666] pl-4 relative rounded-3xl'>
                            <ReactFlagsSelect
                                className='w-2/6 h-full border-none'
                                selected={countrySelected}
                                placeholder ="pais"
                                onSelect={(code) => {
                                    setFormData({
                                        ...formData,
                                        ['userNationality']: code,
                                        ['userPrefixNational']: countries[code].prefijo
                                    });
                                    setCountrySelected(code);
                                }
                            }
                                customLabels={{
                                    "CO": { primary: "Colombia", secondary: "+57" },
                                    "AR": { primary: "Argentina", secondary: "+54" },
                                    "PE": { primary: "peru",  secondary: "+51" },
                                    "BR": { primary: "Brazil",  secondary: "+55" },
                                    "CL": { primary: "Chile",  secondary: "+56" },
                                    "VE": { primary: "Venezuela",  secondary: "+58" },
                                    "EC": { primary: "Ecuador",  secondary: "+593" },
                                    "UY": { primary: "Uruguay",  secondary: "+598" },
                                }}
                                showSecondarySelectedLabel={true}
                                showSelectedLabel ={false}
                                showOptionLabel ={true}
                                showSecondaryOptionLabel={false}
                                countries={["CO", "AR", "PE", "BR", "CL", "VE", "EC", "UY"]}
                            />
                            <input 
                                className="border-none w-4/6 pl-4 border border-solid border-[#666666] text-[#666666] relative rounded-3xl"
                                type="number"
                                value={formData.userPhoneNumber}
                                onChange={handleInputChange}
                                placeholder='ingresa telefono'
                                name='userPhoneNumber'
                                required
                                
                            />
                    </div>
                    <div className="w-full flex flex-col mb-2 mt-2">
                        <label className="font-boldv">Nuevo nombre (opcional)</label>
                        <input
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setNombre(event.target.value) }}
                            placeholder="Type here"
                            type="text" />
                    </div>
                    
                    

                    <button className="w-full mt-2 backgroundVerde h-14 text-white w-64 rounded-full border border-black border-solid mb-6" onClick={editUserData}>Guardar cambios</button>
                    <button className="w-full backgroundVerde h-14 text-white w-64 rounded-full border border-black border-solid mb-6" onClick={handleClose}>Cancelar</button>

                </form>
            
        </div>
    )

}
export default EditarPerfil;