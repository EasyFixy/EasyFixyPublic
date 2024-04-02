import React from "react";
import { UserData } from "../../models/PerfilEmpleado";

interface ComenData {
    senderName: string,
    commentCalification: number,
    commentMessage: string
}

interface PropsComentarios {
    nameColor?: string, 
    width?: string,
    textColor?: string,
    paddingX?: string,
    whiteStar?: boolean,
    showDescription?: boolean,
    isLoading: boolean,
    comenData: ComenData
}



const Comentarios = ({
    nameColor = 'text-black',
    width = 'w-screen',
    textColor = '',
    paddingX = 'px-32',
    whiteStar = false,
    isLoading = false,
    comenData

}:PropsComentarios) => {
    return(
        <div className='w-full h-auto flex flex-col rounded-3xl border-2 border-grey-500 p-2'>
            <div className='w-full h-auto flex flex-row'>
                <img src="/icons/icon-user.png" alt="foto usuario" className="h-14 w-14 bg-gray-300 px-2 py-1" />
                <section className='px-2 w-full h-auto flex flex-col'>
                    <h1 className={`${textColor}`}>{comenData.senderName}</h1>
                    <section className="flex flex-row">
                            {isLoading && comenData ? (
                                <div>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                                </div>
                                ) : (<>{Array.from({ length: comenData.commentCalification }, (_, index) => (
                                    <img key={index} src={'/icons/star.svg'} alt={`Imagen ${index}`} className="px-1 py-1 h-8 w-8" />
                                ))}{Array.from({ length: 5-comenData.commentCalification }, (_, index) => (
                                    <img key={index} src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt={`Imagen ${index}`} className="px-1 py-1 h-8 w-8" />
                                ))}</>
                            )}
                    </section>
                </section>
            </div>
            <div>
                <p className={`${textColor} p-4 w-full h-auto`}>{comenData.commentMessage}</p>
            </div>
            
        </div>
    );
}

export default Comentarios;