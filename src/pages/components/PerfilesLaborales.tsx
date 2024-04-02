import React from "react";
import { Link } from "react-router-dom";


interface LaboresData {
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
    return(
        <div className='w-full h-auto flex flex-col rounded-3xl border-2 border-grey-500 p-4 mr-8'>
            <h1>
            {isLoading && laboresData ? (
                            <p>Cargando perfil...</p>
                        ) : (
                            <p className={`${textColor} font-bold`}>
                                {laboresData.resumeTitleLabor} : + {laboresData.resumeTimeExperience} Años de experiencia
                            </p>
                            
                        )}
            </h1>
            <h1>
            {isLoading && laboresData ? (
                            <p>Cargando perfil...</p>
                        ) : (
                            <p className={`${textColor}`}>
                                {laboresData.resumeDescription} 
                            </p>
                            
                        )}
            </h1>
            <h1 className={`${textColor} font-bold`}>Labores</h1>
            <ul className="flex flex-row">
            {isLoading && laboresData.labors ? (
                            <p>No hay labores agregadas...</p>
                        ) : (
                            laboresData.labors.map((labor) => (<li className={`${textColor} ml-8`}>{labor.laborName}</li>))
                            
                        )}
            </ul>
            
        </div>
    );
}

export default PerfilesLaborales;