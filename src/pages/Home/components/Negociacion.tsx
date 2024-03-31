import React from "react";
import ContenedorPerfil from "../../components/ContenedorPerfil";

const Negociacion = () => {
    return (
        <div className="absolute w-screen h-screen z-10 flex items-center justify-center top-0 left-0 m-auto bg-black bg-opacity-75">
            <div className="w-4/5 h-[90%] bg-[#292929]">
                <ContenedorPerfil estado={false} nameColor={'textNaranja'} width="w-full" textColor="text-white" paddingX="px-[2%]" whiteStar ={true} showDescription={false}/>
            </div>
        </div>
    );
}
export default Negociacion;