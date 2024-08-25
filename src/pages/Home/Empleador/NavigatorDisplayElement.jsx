import React from "react";
import { useState, useEffect } from "react";
import ToolbarDefault from "../../components/ToolbarDefaul";
import HorizontalNavContainerSwitch from "../../components/HorizontalNavContainerSwitch";
import NavbarEmpleador from "../../components/NavbarEmpleador";
import { Link } from "react-router-dom";
//import jwt from 'jsonwebtoken';
const NavigatorDisplayElement = (props) => {
    const [arrayRender, setArrayRender] = useState(props.array);
    const getDateDetails = (fechaISO) => {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const fecha = new Date(fechaISO);
        const diaSemana = diasSemana[fecha.getDay()];
        const numeroDia = fecha.getDate();
        const mes = meses[fecha.getMonth()];
        const año = fecha.getFullYear();

        return `${diaSemana}, ${numeroDia} de ${mes} de ${año}`;
    }

    useEffect(() => {
        setArrayRender(props.array)
    }, []); // Ejecutamos el efecto cada vez que cambie estadoPadre

    useEffect(() => {
        setArrayRender(props.datosFiltrados)
    }, [props.datosFiltrados]); // Ejecutamos el efecto cada vez que cambie estadoPadre

    return (props.array.length != 0 ? (arrayRender.map((offer, index) => (
            <div onClick={() => {props.callBackFunction(offer.jobOfferId, offer)}} className="mx-auto bg-white rounded-xl shadow-md m-3" key={index} >
                <div className="border-t border-b border-gray-200 py-4 px-6 flex justify-between">
                    <div className="text-sm sm:text-base">{offer.jobOfferTittle}</div>
                    <div className="text-sm sm:text-base">{getDateDetails(offer.jobOfferDateAtCreate)}</div>
                </div>
            </div>
        ))) : props.tipe == 'employer' ? 
            <div>No hay trabajos, crea el primero</div>
            : <div>No hay trabajos</div>
        )
}

export default NavigatorDisplayElement;