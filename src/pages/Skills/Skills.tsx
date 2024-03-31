import React, { useEffect, useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import CreatableSelect from 'react-select/creatable';
import { MultiValue } from "react-select";

interface Skill {
    value: string;
    label: string;
}

const Skills = () => {
    const [selectedOption, setSelectedOption] = useState<MultiValue<Skill>>([]);

    const handleChange = (newValue: MultiValue<Skill>) => {
        setSelectedOption(newValue);
    };

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
                <button className="mainBackground self-end w-[185px] h-10 rounded-full text-white shadow-1">
                    Guardar
                </button>
            </div>
        </div>
    )
};

export default Skills;