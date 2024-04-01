import React, { useEffect, useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import CreatableSelect from 'react-select/creatable';
import { MultiValue } from "react-select";
import { useAppSelector } from "../../app/hooks";
import { handleRequestWithToken } from "../../Helpers/Request";
import { useNavigate } from "react-router-dom";

interface Skill {
    value: string;
    label: string;
}
interface requestData {
    skills: string[],
    token: string
}

const Skills = () => {
    const [selectedOption, setSelectedOption] = useState<MultiValue<Skill>>([]);
    const navigate = useNavigate();
    const token = useAppSelector(state => state.Auth.token)
    const handleChange = (newValue: MultiValue<Skill>) => {
        console.log(newValue)
        setSelectedOption(newValue);
    };
    const onClickButton = () =>{
        handleRequestWithToken(handleRequest)
    }
    

    const handleRequest = () => {
        const selectedValues = selectedOption.map(option => option.value);
        const requestData:requestData = {
            skills: selectedValues,
            token: token
        };
        // Opciones para la petición fetch
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData) // Convertir el objeto a JSON
        };
        const url = 'http://localhost:3000/insertUserSkills';
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                navigate('/my/home/employee');
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error como desees
            });
    }

    return(
        <div className="w-screen h-screen flex flex-col">
            <ToolbarDefault/>
            <div className="flex flex-1 flex-col px-[7%] pt-[7%]">
                <h1 className="font-bold text-3xl">
                Cuentanos cuales son tus habilidades
                </h1>
                <p className="mb-6">Esto nos ayudara a recomendar trabajos para ti</p>
                <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    isMulti 
                    className="mb-4"
                    placeholder="Añade habilidades..."
                />
                <hr className="border border-[#666666] border-dashed mb-12"/>
                <button 
                    className="mainBackground self-end w-[185px] h-10 rounded-full text-white shadow-1"
                    onClick={onClickButton}
                >
                    Guardar
                </button>
            </div>
        </div>
    )
};

export default Skills;