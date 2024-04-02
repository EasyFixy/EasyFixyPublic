import React from "react";
import { useState } from "react";
import ToolbarDefault from "../../components/ToolbarDefaul";
import Negociacion from "../components/Negociacion";

const HomeEmpleador = () =>{
    return(
    <>
        <div className='w-screen h-screen flex flex-col relative'>
            <ToolbarDefault/>
            <h1>HOLLA ESTOY EN EL HOME DEl EMPLEADOR</h1>
        </div>
        <Negociacion/>
    </>
    )
}

export default HomeEmpleador;