import React, { useState, useEffect } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import { useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

interface Category {
    laborCategoryIcon: string;
    laborCategoryId: number;
    laborCategoryName: string;
    labors: Labor[];
    // Otros campos si los hay
}

interface Labor {
    laborCategoryName: string;
    laborId: number;
    laborName: string;
    // Otros campos si los hay
}

interface Resume {
    resumeDescription: string;
    resumeTimeExperience: number;
    resumeTitleLabor: string;
    labors: number[];
    token: string
}

const CategoriesLabors = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Obtener valores específicos de la URL
    const tipe = searchParams.get('tipe');
    const title = searchParams.get('title');
    const experience = searchParams.get('experience');
    const description = searchParams.get('description');
    console.log(title, experience, description)

    const [selectedCategory, setCategorySelected] = useState<string>('');
    const [selectedLabors, setSelectedLabors] = useState<number[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [renderLabors, setRenderLabors] = useState<Labor[]>([]);

    const saveResumeToDB = (resume: Resume) => {
        console.log(JSON.stringify(resume))
        fetch('http://localhost:3000/createLaboralUserResume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resume),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Guardar la respuesta del servidor en el estado
                if(data.statusCode == 200){
                    navigate("/my/home/employee");
                }else {
                    toast.warn("Error Subiendo");
                }
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
                toast.warn("Error Subiendo");
            });
    }

    const saveCategoriesToResume = () => {
        console.log("opirmido")
        
        if (title && experience && description) {

            if (selectedLabors.length < 1) {
                toast.warn("Seleccione almenos una labor");
            } else {
                console.log(selectedLabors)
                const resume: Resume = {
                    resumeDescription: description,
                    resumeTimeExperience: parseInt(experience),
                    resumeTitleLabor: title,
                    labors: selectedLabors,
                    token: localStorage.getItem('token') || ""
                }
                saveResumeToDB(resume);
            }
        } else {
            toast.warn("Datos incompletos sección anterior");
        }
    }

    const handleSaveInfoCategories = () => {
        if (tipe) {
            if (tipe === "createResume") {
                saveCategoriesToResume();
            }
        }
    }

    const fetchCategories = () => {
        fetch("http://localhost:3000/getJobCategories")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setCategories(data.data)
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
            });
    }

    const fetchLabors = (indexCategory: number) => {
        fetch('http://localhost:3000/getLaborsPerCategories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categories: [indexCategory] }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Guardar la respuesta del servidor en el estado
                const updatedItems = [...categories];
                // Actualizar el valor en la posición 'index'
                updatedItems[indexCategory].labors = data.data

                // Actualizar el estado con la nueva copia del arreglo
                setCategories(updatedItems);
                setRenderLabors(data.data)
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCheckboxChange = (index: number) => {
        const updatedSelectedLabors = [...selectedLabors];
        if (updatedSelectedLabors.includes(index)) {
            updatedSelectedLabors.splice(updatedSelectedLabors.indexOf(index), 1); // Remove from selection
        } else {
            updatedSelectedLabors.push(index); // Add to selection
        }
        setSelectedLabors(updatedSelectedLabors);
    };
    const handleSelectedCategory = (index: number) => {
        setCategorySelected(index.toString())
        const labores = categories[index].labors
        if (labores) {
            console.log("existen")
            setRenderLabors(categories[index].labors)
        } else {
            console.log("no existen")
            fetchLabors(index);
        }
    }
    return (
        <div className="w-screen h-screen flex flex-col">
            <ToastContainer />
            <ToolbarDefault tipe={tipe === "createResume" ? ("employee"):("employer")}/>
            <div className="w-full flex-1 px-[5%] flex flex-col pb-[5%] pt-[3%] font-bold overflow-y-scroll">
                <h1 className="text-5xl">
                    Categorias y labores

                </h1>
                <p className="text-base font-normal text-[#666666] mb-11"> Selecciones las labores por categoría:</p>
                <div className="flex flex-row w-full justify-start items-center gap-[5%]">
                    <div className="w-2/5 h-full rounded-xl shadow-1 grid grid-cols-2 px-[5%] gap-5 py-6 ">
                        {
                            categories.map((item, index) => {
                                return (
                                    <div className={`rounded-xl flex flex-col items-center justify-center text-center duration-300 px-[2%] ${index.toString() === selectedCategory ? 'shadow-2' : 'shadow-1'}`}
                                        onClick={() => handleSelectedCategory(index)}
                                    >
                                        <img src={`${item.laborCategoryIcon}`} alt="" className="h-20" />
                                        <h1 className="text-xl font-bold" >{item.laborCategoryName}</h1>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="h-4/5 w-[1px] border-[0.5px] border-solid border-black "></div>
                    <div className="w-2/5 h-full flex flex-col gap-5" >
                        {
                            renderLabors.map((value, index) => {
                                return (
                                    <div className={`text-xl w-full h-16 shadow-1 rounded-xl flex flex-row px-[5%] max-w-[450px] justify-between items-center ${selectedLabors.includes(value.laborId) ? 'bg-[#FD7401]' : ''}`} >
                                        <p>{value.laborName}</p>
                                        <input type="checkbox" className=""
                                            checked={selectedLabors.includes(value.laborId)}
                                            onChange={() => handleCheckboxChange(value.laborId)}
                                        />
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
                <button className="bg-black text-white w-[120px] rounded-xl self-end" onClick={handleSaveInfoCategories}>
                    Guardar
                </button>
            </div>

        </div>
    );
};

export default CategoriesLabors;