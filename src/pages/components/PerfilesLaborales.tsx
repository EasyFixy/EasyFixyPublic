import React, { useState } from 'react';
import { Link } from "react-router-dom";


interface LaboresData {
    resumeId: number,
    resumeDescription: string,
    resumeTimeExperience: number,
    resumeTitleLabor: string,
    labors: {
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
    const [titulo, setInputTitulo] = useState('');
    const [time_experiencia, setInputExperiencia] = useState(0);
    const [description, setInputDescription] = useState('');

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

    return(
        <div className='w-full h-auto flex flex-col rounded-3xl border-2 border-grey-500 p-4 mr-8'>
            <h1>
            {editing ? (
                <>
                <input
                    type="text"
                    className={`${textColor} font-bold w-[20%] border border-black p-1 rounded-2xl`}
                    value={titulo}
                    onChange={handleChangeTitulo}
                />
                <> : + </>
                <input
                    type="text"
                    className={`${textColor} font-bold w-[8%] border border-black p-1 rounded-2xl`}
                    value={time_experiencia}
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
                        {laboresData.resumeTitleLabor} : + {laboresData.resumeTimeExperience} Años de experiencia
                    </p>
                    
                )}
                </>
            )}
            
            </h1>
            <h1>
            {editing ? (
                <input
                    type="text"
                    className={`${textColor} mt-2 font-bold border border-black p-1 rounded-2xl`}
                    value={description}
                    onChange={handleChangeDescription}
                />
            ) : (
                <>
                {isLoading && laboresData ? (
                    <p>Cargando perfil...</p>
                ) : (
                    <p className={`${textColor}`}>
                        {laboresData.resumeDescription} 
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
            <Link to={`/my/categories?tipe=modifyResume&resumeId=${laboresData.resumeId}`} className='mt-4 bg-black h-8 text-white w-40 rounded-full border border-black border-solid text-sm mr-4 mb-1 flex items-center justify-center text-center'>Editar labores</Link>
            <>
            {editing ? (
                <td className='flex flex-row'>
                    <button className='mt-4 bg-black h-8 text-white w-40 rounded-full border border-black border-solid mb-6 text-sm mr-4'>Guardar</button>
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