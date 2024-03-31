import React from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import NavbarEmpleado from "../components/NavbarEmpleado";
import CajaGanancias from "./CajaGanancias";
import MisTrabajos from "./MisTrabajos";

const HomeEmpleado = () =>{
    return(
        <div className="w-screen h-screen flex flex-col">
            <ToolbarDefault/>
            <NavbarEmpleado/>
            
            <div className="w-screen flex mt-8">
                <div className="w-3/4 h-auto ml-12 mr-4"><MisTrabajos/></div>
                <div className="w-1/4 h-40 mr-8"><CajaGanancias/></div>
            </div>
        </div>
    )
}

export default HomeEmpleado;