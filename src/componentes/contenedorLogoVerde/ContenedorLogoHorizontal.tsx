import React from "react";

interface PropsContenedorLogo {
    customStyle?: string;

}
const ContenedorLogoHorizontal = ({customStyle = "lg:w-1/2"}:PropsContenedorLogo) =>{
    return(
        <div className={`lg:h-full h-[10%] ${customStyle} mainBackground flex justify-center items-center shadow-1`}>
            <div className="lg:w-96 lg:h-96 h-full">
                <img src="/icons/icon.svg" alt="Icono principal" className="w-full h-full " />
            </div>
        </div>
    )
}
export default ContenedorLogoHorizontal;