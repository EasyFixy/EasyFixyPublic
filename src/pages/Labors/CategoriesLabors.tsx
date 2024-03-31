import React, { useState } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";

const trabajos = [
    {
        nombre: "Comercial y Ventas",
        imagen: "/public/categories/ventas.svg",
    },
    {
        nombre: "Informática",
        imagen: "/public/categories/informatica.svg",
    },
    {
        nombre: "Artes y Oficiosa",
        imagen: "/public/categories/artes.svg",
    },
    {
        nombre: "Turismo",
        imagen: "/public/categories/turismo.svg",
    },
    {
        nombre: "Restauración",
        imagen: "/public/categories/restauracion.svg",
    },
    {
        nombre: "Técnicos",
        imagen: "/public/categories/tecnicos.svg",
    },
    {
        nombre: "Compras y logística",
        imagen: "/public/categories/compras.svg",
    },
    {
        nombre: "Profesiones varias",
        imagen: "/public/categories/varios.svg",
    },
];

const labors = [
    'Labor 1',
    'Labor 1',
    'Labor 1',
    'Labor 1'
]
const CategoriesLabors = () => {
    const [selectedCategory, setCategorySelected] = useState<string>('');
    const [selectedLabors, setSelectedLabors] = useState<number[]>([]);

    const handleCheckboxChange = (index:number) => {
        const updatedSelectedLabors = [...selectedLabors];
        if (updatedSelectedLabors.includes(index)) {
            updatedSelectedLabors.splice(updatedSelectedLabors.indexOf(index), 1); // Remove from selection
        } else {
            updatedSelectedLabors.push(index); // Add to selection
        }
        setSelectedLabors(updatedSelectedLabors);
    };
    const handleSelectedCategory = (index:number) =>{
        setCategorySelected(index.toString())
    }
    return(
        <div className="w-screen h-screen flex flex-col">
            <ToolbarDefault/>
            <div className="w-full flex-1 px-[5%] flex flex-col pb-[5%] pt-[3%] font-bold overflow-y-scroll">
                <h1 className="text-5xl">
                    Categorias y labores

                </h1>
                <p className="text-base font-normal text-[#666666] mb-11"> Selecciones las labores por categoría:</p>
                <div className="flex flex-row w-full justify-start items-center gap-[5%]">
                    <div className="w-2/5 h-full rounded-xl shadow-1 grid grid-cols-2 px-[5%] gap-5 py-6 ">
                        {
                            trabajos.map((item, index) =>{
                                return(
                                    <div className={`rounded-xl flex flex-col items-center justify-center text-center px-[2%] ${index.toString() === selectedCategory ? 'shadow-2' : 'shadow-1'}`}
                                    onClick={() => handleSelectedCategory(index)}
                                    >
                                        <img src={`${item.imagen}`} alt="" className="h-20"/>
                                        <h1 className="text-xl font-bold" >{item.nombre}</h1>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="h-4/5 w-[1px] border-[0.5px] border-solid border-black "></div>
                    <div className="w-2/5 h-full flex flex-col gap-5" >
                        {
                            labors.map((value, index) => {
                                return(
                                    <div className={`text-xl w-full h-16 shadow-1 rounded-xl flex flex-row px-[5%] max-w-[450px] justify-between items-center ${selectedLabors.includes(index) ? 'bg-[#FD7401]' : ''}`} >
                                        <p>{value}</p>
                                        <input type="checkbox" className=""
                                        checked={selectedLabors.includes(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                        />
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
                <button className="bg-black text-white w-[120px] rounded-xl self-end">
                    Guardar
                </button>
            </div>

        </div>
    );
};

export default CategoriesLabors;