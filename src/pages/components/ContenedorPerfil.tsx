import React from "react";
import { useState } from "react";
import  EditarPerfil from "./EditarPerfil";
import { useEffect } from "react";
import { UserData } from "../../models/PerfilEmpleado";


interface PropsContenedorPerfil {
    estado: boolean,
    nameColor?: string, 
    width?: string,
    textColor?: string,
    paddingX?: string,
    whiteStar?: boolean,
    showDescription?: boolean,
    isLoading: boolean,
    userData: UserData
}

const ContenedorPerfil = ({
    estado,
    nameColor = 'text-black',
    width = 'w-screen',
    textColor = '',
    paddingX = 'px-32',
    whiteStar = false,
    isLoading = false,
    userData

}:PropsContenedorPerfil) => {

    
    
    const [estadoDialog, setEstadoDialog] = useState(false);
    const mostrarEditar = () => {
        setEstadoDialog(!estadoDialog);
    }
   

    const meses = {
        '01': 'enero',
        '02': 'febrero',
        '03': 'marzo',
        '04': 'abril',
        '05': 'mayo',
        '06': 'junio',
        '07': 'julio',
        '08': 'agosto',
        '09': 'septiembre',
        '10': 'octubre',
        '11': 'noviembre',
        '12': 'diciembre'
      };
      let mesNumero = userData.tempData[0].userTempDataLastUpdate.slice(5, 7)
      let mesNombre = meses[mesNumero];
      

      
    
    return(
        <div className={` content-center ${paddingX} py-10 ${width} h-auto flex flex-row`}>
            <div>{(estadoDialog===true ? <EditarPerfil/> : <></>)}</div>
            <div className="w-1/3 pl-16 pr-16 pb-16"><img src="/icons/icon-user.png" alt="Imagen usuario" className="bg-gray-300 px-2 py-2 w-full aspect-square" /></div>
            <div className="px-16 flex flex-col w-2/3">
                <div>
                    <h1 className={`text-3xl ${nameColor} font-bold`}>
                        {isLoading ? (
                            <p>Cargando perfil...</p>
                        ) : (
                            <>
                                {userData.mainData[0].userName}
                            </>
                        )}
                    </h1>
                    <section className="flex flex-wrap mt-4">
                        <div className="w-1/3 flex flex-row">

                            {isLoading && userData.comments ? (
                                <div>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="w-1/5 flex-initial px-1"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="w-1/5 flex-initial px-1"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="w-1/5 flex-initial px-1"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="w-1/5 flex-initial px-1"/>
                                    <img src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt="Estrellita"  className="w-1/5 flex-initial px-1"/>
                                </div>
                                ) : (<>{Array.from({ length: userData.comments.data[0].mediaCalificaciones }, (_, index) => (
                                    <img key={index} src={'/icons/star.svg'} alt={`Imagen ${index}`} className="w-1/5 flex-initial px-1" />
                                ))}{Array.from({ length: 5-userData.comments.data[0].mediaCalificaciones }, (_, index) => (
                                    <img key={index} src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} alt={`Imagen ${index}`} className="w-1/5 flex-initial px-1" />
                                ))}</>
                            )}
                            
                        </div>
                        <h3 className={`${textColor} w-1/3 flex-initial px-16`}>
                            {isLoading && userData.comments ? (
                                <p>0</p>
                                ) : (<>({userData.comments.data[0].mediaCalificaciones} estrellas) <br/>
                                        {userData.comments.data[0].cantidadTotalComentariosEmployee} Calificaciones </>
                            )}
                        </h3>
                        <h3 className={`${textColor} w-1/3 flex-initial`}>{isLoading ? (
                            <p>Cargando perfil...</p>
                            ) : (
                                <>
                                    {userData.mainData[0].antiguedadYears}
                                </>
                            )}  trabajos realizados
                        </h3>
                    </section>
                    <h2 className="mt-8 text-orange-500 px-4"> {userData.tempData[0].userTempDataActive==1 ? <>· Estoy en linea!</> : <>· No estoy en linea</>}</h2>
                    <div className="flex flex-row mt-2">
                        <img src="/icons/bandera.png" alt="bandera país" />
                        <h2 className={`${textColor}`}>Bogotá,Colombia</h2>
                    </div>
                    
                    <div className="flex flex-row mt-2">
                        <img src="/icons/joined.png" alt="Joined" className="px-2 w-10 " />
                        <h2 className={`${textColor}`}>Joined {mesNombre} {userData.tempData[0].userTempDataLastUpdate.slice(8, 10)}, {userData.tempData[0].userTempDataLastUpdate.slice(0, 4)} </h2>
                    </div>
                    
                    <div>{(estado===true ? 
                        (<div>
                            <button className="w-14 ml-2 mt-4 mainBackground h-7 text-white w-64 rounded-full border border-black border-solid mb-6" onClick={() => (mostrarEditar())}>Editar Perfil</button>
                            
                        </div>) : (<div></div>) )}</div>
                    
                </div>
            </div>
            
        </div>
    );
}

export default ContenedorPerfil;