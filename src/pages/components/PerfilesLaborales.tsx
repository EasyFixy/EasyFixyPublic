import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAppSelector } from "../../app/hooks";

interface LaboresData {
    resumeId: number,
    resumeDescription: string,
    resumeTimeExperience: number,
    resumeTitleLabor: string,
    labors: {
        laborCategoryId: number,
        laborId: number,
        laborName: string
    }[];
}

interface PropsPerfilesLaborales {
    nameColor?: string, 
    width?: string,
    textColor?: string,
    paddingX?: string,
    whiteStar?: boolean,
    showDescription?: boolean,
    isLoading: boolean,
    laboresData: LaboresData
}   


const PerfilesLaborales = ({
    nameColor = 'text-black',
    width = 'w-screen',
    textColor = '',
    paddingX = 'px-32',
    whiteStar = false,
    isLoading = false,
    laboresData

}:PropsPerfilesLaborales) => {

    const [editing, setEditing] = useState(false);
    const [titulo, setInputTitulo] = useState(laboresData.resumeTitleLabor);
    const [time_experiencia, setInputExperiencia] = useState(laboresData.resumeTimeExperience);
    const [description, setInputDescription] = useState(laboresData.resumeDescription);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = useAppSelector(state => state.Auth.token);
    
    

    const handleEditClick = () => {
        setEditing(true);
    };
    const handleEditClick2 = () => {
        setEditing(false);
    };
    const handleChangeTitulo = (event) => {
        setInputTitulo(event.target.value);
    };
    const handleChangeExperiencia = (event) => {
        setInputExperiencia(event.target.value);
    };
    const handleChangeDescription = (event) => {
        setInputDescription(event.target.value);
    };

    const validationFields = () => {
        if(time_experiencia!=0 && titulo!='' && description!=''){
            console.log('holaaa');
            request();
            handleEditClick2();
            
        }else{
            toast.warn("No deje campos vacios");
        }
    }

    const request = () => {
        const url = `${baseUrl}updateUserResume`;
        
        const requestData = {
            token: token,
            resumeId: laboresData.resumeId,
            resumeTitleLabor: titulo,
            resumeTimeExperience: time_experiencia,
            resumeDescription: description
        };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Asegura que el servidor espera un cuerpo JSON
            },
            body: JSON.stringify(requestData) // Convierte los datos a JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json(); // Si esperas una respuesta JSON
        })
        .then(result => {
            // Aquí puedes trabajar con los datos obtenidos en la respuesta            
            if (result) {
                console.log('Tamo bien');
                console.log(result);
            }
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
    };
    
    

    useEffect(() => {
        setInputTitulo(laboresData.resumeTitleLabor);
        setInputExperiencia(laboresData.resumeTimeExperience);
        setInputDescription(laboresData.resumeDescription);
    }, [laboresData]);

    // Crear un arreglo de los IDs de todas las labores
    const laborIds = laboresData.labors.map(labor => labor.laborId);
    console.log(laborIds);
    

    return(
        <div className='w-full h-auto flex flex-col rounded-3xl border-2 border-grey-500 p-4 mr-8'>
            <h1>
            {editing ? (
                <>
                <input
                    type="text"
                    className={`${textColor} font-bold w-[20%] border border-black p-1 rounded-2xl pl-2`}
                    value={titulo}
                    placeholder={titulo}
                    onChange={handleChangeTitulo}
                />
                <> : + </>
                <input
                    type="age"
                    className={`${textColor} font-bold w-[8%] border border-black p-1 rounded-2xl pl-2`}
                    value={time_experiencia}
                    placeholder={time_experiencia}
                    onChange={handleChangeExperiencia}
                />
                <> Años de experiencia </>
                </>
            ) : (
                <>
                {isLoading && laboresData ? (
                    <p>Cargando perfil...</p>
                ) : (
                    <p className={`${textColor} font-bold`}>
                        {titulo} : + {time_experiencia} Años de experiencia
                    </p>
                    
                )}
                </>
            )}
            
            </h1>
            <h1>
            {editing ? (
                <input
                    type="text"
                    className={`${textColor} mt-2 font-bold border border-black p-1 rounded-2xl pl-2`}
                    value={description}
                    placeholder={description}
                    onChange={handleChangeDescription}
                />
            ) : (
                <>
                {isLoading && laboresData ? (
                    <p>Cargando perfil...</p>
                ) : (
                    <p className={`${textColor}`}>
                        {description} 
                    </p>
                            
                )}
                </>
            )}
            
            </h1>
            <h1 className={`${textColor} font-bold`}>Labores</h1>
            <ul className="flex flex-row">
            {isLoading && laboresData.labors ? (
                            <p>No hay labores agregadas...</p>
                        ) : (
                            laboresData.labors.map((labor, index) => (<li key={index} className={`${textColor} ml-8`}>{labor.laborName}</li>))
                            
                        )}
            </ul>
            <Link to={`/my/categories?tipe=modifyResume&resumeId=${laboresData.resumeId}&category=${laboresData.labors[0].laborCategoryId}&labors=${laborIds}`} className='mt-4 bg-black h-8 text-white w-40 rounded-full border border-black border-solid text-sm mr-4 mb-1 flex items-center justify-center text-center'>Editar labores</Link>
            <>
            {editing ? (
                <td className='flex flex-row'>
                    <button className='mt-4 bg-black h-8 text-white w-40 rounded-full border border-black border-solid mb-6 text-sm mr-4' onClick={validationFields}>Guardar</button>
                    <button className='mt-4 bg-black h-8 text-white w-40 rounded-full border border-black border-solid mb-6 text-sm' onClick={handleEditClick2}>Cancelar</button>
                </td>
            ) : (
                <button className=" mainBackground h-8 text-white w-40 rounded-full border border-black border-solid mb-6 text-sm" onClick={handleEditClick}>Editar</button>
            )}
            </>
            
            

        </div>
    );
}

export default PerfilesLaborales;