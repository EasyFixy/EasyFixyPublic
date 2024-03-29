import React from "react";
import { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";

const HomeEmpleador = () =>{
    return(
        <div className='w-screen h-screen flex flex-col'>
            <ToolbarDefault tipe="employer"/>
            <h1>HOLLA ESTOY EN EL HOME DEl EMPLEADOR</h1>
        </div>
    )
}

export default HomeEmpleador;