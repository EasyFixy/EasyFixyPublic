import React from "react";
import { Interface } from "readline";

interface PropsContenedorLogo {
    width?: string;
}
const ContenedorLogoHorizontal = ({width = "w-1/2"}:PropsContenedorLogo) =>{
    return(
        <div className={`h-full h-screen ${width} mainBackground flex justify-center items-center`}>
            <div className="w-96 h-96">
                <img src="/icons/icon.svg" alt="Icono principal" />
            </div>
        </div>
    )
}
export default ContenedorLogoHorizontal;