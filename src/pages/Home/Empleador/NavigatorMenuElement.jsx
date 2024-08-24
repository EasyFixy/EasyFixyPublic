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
        <div className={props.index == props.seccionActiva ? "m-4 p-4 text-emerald-700 underline cursor-pointer" : "m-4 p-4 cursor-pointer"}  key={props.index} onClick={handleClick}>
            {props.name}
        </div>
    )
}

export default NaigatorMenuElement;