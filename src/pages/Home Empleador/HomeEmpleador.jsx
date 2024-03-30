import React from "react";
import { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import HorizontalNavContainerSwitch from "../components/HorizontalNavContainerSwitch";
const HomeEmpleador = () => {
    let horizontalExtra = (
        <div className="">
                    un extra
                </div>
    )
    let horizontalRender = [
        {
            name: "mio",
            content: (
                <div className="">
                    tamo activo
                </div>
            )
        }, {
            name: "el segundo",
            content: (
                <div className="">
                    tamo activos
                </div>
            )
        }, {
            name: "la otra",
            content: (
                <div className="">
                    tamos la
                </div>
            )
        }
    ]

    return (
        <div className='w-screen h-screen flex flex-col'>
            <ToolbarDefault tipe="employer" />
            <h1>HOLLA ESTOY EN EL HOME DEl EMPLEADOR</h1>

            <div className="flex flex-col justify-center items-center">
                <h2>Mis trabajos</h2>
                <div className="w-70">
                <HorizontalNavContainerSwitch content={horizontalRender} extra={horizontalExtra}></HorizontalNavContainerSwitch>
                </div>
                
            </div>

        </div>
    )
}

export default HomeEmpleador;