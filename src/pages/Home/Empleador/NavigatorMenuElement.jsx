import React from "react";
import { useState, useEffect } from "react";
import ToolbarDefault from "../../components/ToolbarDefaul";
import HorizontalNavContainerSwitch from "../../components/HorizontalNavContainerSwitch";
import NavbarEmpleador from "../../components/NavbarEmpleador";
import { Link } from "react-router-dom";
//import jwt from 'jsonwebtoken';
const NaigatorMenuElement = (props) => {

    const handleClick = (e) => {
        props.setSeccionActiva(props.index)
    }

    return (
        <div className={props.index == props.seccionActiva ? "sm:m-4 sm:p-4 m-2 text-orange-500 underline cursor-pointer" : "sm:m-4 m-2 sm:p-4 cursor-pointer"}  key={props.index} onClick={handleClick}>
            {props.name}
        </div>
    )
}

export default NaigatorMenuElement;