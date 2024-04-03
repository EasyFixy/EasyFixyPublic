import React from "react";
import { useState, useEffect } from "react";
import ToolbarDefault from "../../components/ToolbarDefaul";
import HorizontalNavContainerSwitch from "../../components/HorizontalNavContainerSwitch";
import NavbarEmpleador from "../../components/NavbarEmpleador";
import { Link } from "react-router-dom";
//import jwt from 'jsonwebtoken';
const NaigatorMenuElement = (props) => {

    const handleClick = (e) => {
        console.log("oprimió")
        props.handleInputChange({target:{value:""}})
        props.setSeccionActiva(props.index)
        props.handleInputChange({target:{value:""}})
        //e.target.click();
        //props.handleInputChange({target:{value:""}})
    }

    return (
        <div className={props.index == props.seccionActiva ? "m-4 p-4 text-orange-500 underline" : "m-4 p-4"} key={props.index} onClick={handleClick}>
            {props.name}
        </div>
    )
}

export default NaigatorMenuElement;