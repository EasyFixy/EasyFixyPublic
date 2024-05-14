import React, { useEffect, useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import CreatableSelect from 'react-select/creatable';
import { MultiValue } from "react-select";
import { useAppSelector } from "../../app/hooks";
import { handleRequestWithToken } from "../../Helpers/Request";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";
interface Skill {
    value: string;
    label: string;
    __isNew__?: boolean
}
interface requestData {
    skills: string[],
    token: string
}
interface userSkill {
    skillId: number,
    skillName: string,
}

const Skills = () => {
    const [selectedOption, setSelectedOption] = useState<MultiValue<Skill>>([]);
    const [userSkills, setUsersSkills] = useState<userSkill[]>([]);
    const dispatch = useAppDispatch();
    let newOption:Skill = {
        value: "",
        label: ""
    };
    const navigate = useNavigate();
    const token = useAppSelector(state => state.Auth.token);
    const userId = useAppSelector(state => state.Auth.id);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const handleChange = (newValue: MultiValue<Skill>) => {
        setSelectedOption(newValue);
        newOption = newValue.find( option => option.__isNew__) ?? {
            value: "",
            label: ""
        }
        if (newOption.__isNew__){
            handleRequestWithToken(dispatch, uploadUserSkill);

        }else{
             // Llamar a deleteUserSkill con el nombre de la habilidad eliminada
             const deletedSkill = userSkills.find(skill => !newValue?.some(option => skill.skillName === option.label));
             if (deletedSkill) {

                 handleRequestWithToken(dispatch,() =>{deleteUserSkill(deletedSkill)} )
             }
        }
    };
    const onClickButton = () =>{
        navigate('/my/home/employee');
    }
    
    const uploadUserSkill = () => {
        const selectedValues = newOption?.value;
        if (selectedValues.length>0){

            const requestData = {
                skills: [selectedValues],
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
            const url = `${baseUrl}uploadUserSkills`;
            fetch(url, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if(data.statusCode == 200){
                        toast.success(`se ha agregado la habilidad: ${selectedValues}`)
                        handleRequestWithToken(dispatch, getUserSkills)
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Aquí puedes manejar el error como desees
                });
        }
    }
    const deleteUserSkill = (deletedSkill: userSkill) => {
        
        const url = `${baseUrl}deleteSkill?skillId=${deletedSkill.skillId}&token=${token}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if(data.statusCode == 200){
                    toast.success(`se ha eliminado la habilidad: ${deletedSkill.skillName}`)
                    handleRequestWithToken(dispatch, getUserSkills)
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error como desees
            });
    }
    const getUserSkills = () =>{
        fetch(`${baseUrl}getUserSkills?userId=${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const userSkills = data.data.map(option => ({
                    label: option.skillName,
                    value: option.skillName
                }));
                setUsersSkills(data.data);
                setSelectedOption(userSkills)
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error como desees
            });
    }
    useEffect(() => {
        handleRequestWithToken(dispatch, getUserSkills)
    }, []);

    return(
        <div className="w-screen h-screen flex flex-col">
            {/* <ToolbarDefault tipe="employee"/> */}
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
                    value={selectedOption}
                    
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