import React from "react";
import { useState, useEffect } from "react";
import NaigatorMenuElement from "./NavigatorMenuElement";
import NavigatorDisplayElement from "./NavigatorDisplayElement";
import { useAppSelector } from "../../../app/hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import jwt from 'jsonwebtoken';
const HorizontalNavigator = (props) => {
    const finishedJobs = useAppSelector(state => state.Jobs.finishedJobs);
    const [seccionActiva, setSeccionActiva] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(props.sections[seccionActiva].array);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        const filtrados = props.sections[seccionActiva].array.filter(item =>
            item.jobOfferTittle.toLowerCase().includes(event.target.value.toLowerCase())
            || item.jobOfferDescription.toLowerCase().includes(event.target.value.toLowerCase())
        );

        setDatosFiltrados(filtrados);
    };

    useEffect(() => {
        handleInputChange({ target: { value: "" } });
        const filtradosPorId = props.sections[seccionActiva].array.filter(item => !finishedJobs.includes(item.jobId));
        setDatosFiltrados(filtradosPorId);
    }, [seccionActiva, props.sections, finishedJobs]); 

    return (
        <div className="" style={{ width: '70%' }}>
            <div className="w-100">
                <div className="flex">
                    {props.sections.map((section, index) => (
                        <NaigatorMenuElement 
                        key={index}
                        index={index} 
                        name={section.name} 
                        datosFiltrados={datosFiltrados} 
                        seccionActiva={seccionActiva} 
                        setSeccionActiva={setSeccionActiva}
                        >
                        </NaigatorMenuElement>
                    ))}
                </div>
                <div className="mt-4 relative w-full">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Filtrar"
                        className="w-full py-2 pl-10 pr-4 rounded-lg border-2 border-gray-300 focus:border-color3 outline-none"
                    />
                    <img
                        src="/icons/lupa.svg"
                        alt="Search"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    />
                </div>
                <div className="rounded-xl shadow-2xl p-6 m-6">
                    <div className="">
                    <NavigatorDisplayElement
                        callBackFunction={props.callBackFunction}
                        seccionActiva={seccionActiva}
                        datosFiltrados={datosFiltrados.length > 0 ? datosFiltrados : props.sections[seccionActiva].array}
                        array={datosFiltrados}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalNavigator;