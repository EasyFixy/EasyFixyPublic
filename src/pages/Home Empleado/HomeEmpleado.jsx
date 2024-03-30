import React from "react";
import ToolbarDefault from "../components/ToolbarDefaul";

const HomeEmpleado = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <ToolbarDefault tipe="employee" />
            <h1>HOLA ESTOY EN EL HOME DE EMPLEADO</h1>
        </div>
    )
}

export default HomeEmpleado;