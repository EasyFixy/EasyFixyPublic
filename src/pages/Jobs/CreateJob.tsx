import React, { useState } from "react";
import ContenedorLogoHorizontal from "../../componentes/contenedorLogoVerde/ContenedorLogoHorizontal";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EstimatePrice from "../components/EstimatePrice";
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
    const [title, setTitle] = useState<String>();
    const [dateAtWork, setDateAtWork] = useState<String>();
    const [description, setDescription] = useState<String>();
    const [estimatePrice, setEstimatePrice] = useState<number>(10000);
    const [ubication, setUbication] = useState<string>('');

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega a la página anterior en el historial
    };

    // FUNCION BUSCAR EMPLEADOS
    // DESCOMENTAR Y AGREGAR PARAMETROS NECESARIOS

    // const buscarEmpleados = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         isActivo: isActivo,
    //         categoria: categoria
    //     };
    //     const url = `http://localhost:3000/buscarEmpleados?estado=${isActivo}&categoria=${categoria}`;
    //     fetch(url)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('La solicitud no fue exitosa');
    //             }
    //             return response.json(); // Si esperas una respuesta JSON
    //         })
    //         .then(result => {
    //             // Aquí puedes trabajar con los datos obtenidos en la respuesta            

    //         })
    //         .catch(error => {
    //             console.error('Hubo un problema con la solicitud fetch:', error);
    //         });

    // }
    // Función para aumentar el precio en 5000

    const handleFieldsVerification = (e) => {
        // Obtener la fecha y hora actual
        const now = new Date();
        
        // Ajustar la fecha y hora actual según la zona horaria local
        const offset = now.getTimezoneOffset(); // Obtener el desplazamiento de zona horaria en minutos
        const localNow = new Date(now.getTime() - (offset * 60000));
        const fechaActual = localNow.toISOString().slice(0, 16);
    // Obtener la fecha actual en formato ISO (yyyy-mm-dd)
        const fechaUnAnioDespues = new Date();
        console.log('fechaActual ',fechaActual);
        console.log(dateAtWork);
        fechaUnAnioDespues.setFullYear(fechaUnAnioDespues.getFullYear() + 1)
        if (!(title && description && dateAtWork && ubication)) {

            e.preventDefault(); // Evita que el enlace se abra si no se cumple la condición
            toast.warn("Complete todos los datos");
        }else if(estimatePrice < 10000){
            e.preventDefault(); // Evita que el enlace se abra si no se cumple la condición
            toast.info("el precio estimado debe ser como minimo 10.000 cop");
        }else if(dateAtWork < fechaActual){
            e.preventDefault(); // Evita que el enlace se abra si no se cumple la condición
            toast.info("recuerda que no debes ingresar una fecha invalida. la fecha debe ser superior a la actual");
        }else if (dateAtWork > fechaUnAnioDespues.toISOString().split("T")[0]) {
            e.preventDefault(); // Evita que el enlace se abra si no se cumple la condición
            toast.info("no puedes elegir una fecha tan lejana. Por favor, elige una fecha más cercana.");
        }
    };
    
    return (
        <div className="w-screen h-screen flex flex-col-reverse lg:flex-row relative">
            <button onClick={goBack} className="absolute left-4 top-4">
                <img src="/public/ButtonBack.svg" alt="" />
            </button>
            <div className="flex-1 px-[5%] py-[5%] flex flex-col overflow-y-scroll">
                <div>

                    <div className="flex flex-row items-center mb-14">
                        <img src="/public/logo.svg" alt="logo" className="h-20" />
                        <p className="text-4xl fontNameLogo"> EasyFixy</p>
                    </div>
                    <h1 className="font-bold text-5xl mb-8">Cuentanos que es lo que necesitas <span className="textNaranja">hacer.</span></h1>
                    <input className="w-full border border-solid border-[#0E7490] h-8 rounded-xl mb-5 pl-[3%]"
                        onChange={(event) => { setTitle(event.target.value) }} type="text" placeholder="Nombre del Problema" />
                    <label><strong>Descripcion: <span className="textNaranja"> recuerda describir los criterios de aceptación del trabajo</span>  </strong></label>
                    <textarea className="w-full border-solid border-[#0e7490] h-24 mb-5 pl-[3%] resize-none border rounded-md"
                        placeholder="Descripcion de problema"
                        onChange={(event) => { setDescription(event.target.value) }} />
                    <input
                        className="w-full border border-solid border-[#0e7490] h-8 rounded-xl mb-5 pl-[3%]"
                        type="text"
                        value={ubication}
                        onChange={(event) => { setUbication(event.target.value) }}
                        placeholder="Dirección de trabajo"
                    />
                    <div className="flex flex-row justify-between w-full mb-5 h-10">
                        <div className="w-2/6 h-full">
                            
                            <EstimatePrice estimatePrice={estimatePrice} setEstimatePrice={setEstimatePrice}/>
                        </div>
                        <input
                            className="border border-solid border-[#0E7490] w-fit h-full rounded-xl"
                            type="datetime-local"
                            name="date"
                            onChange={(event) => { setDateAtWork(event.target.value) }}
                            id="date"
                            placeholder="Fecha de realizacion" />
                    </div>
                    <Link to={'/my/categories?tipe=createJob&title=' + title + '&description=' + description + '&estimatePrice=' + estimatePrice + '&dateAtWork=' + dateAtWork +'&ubication=' + encodeURIComponent(ubication)} className="px-[30px] mainBackground h-10 text-white rounded-full mb-5 w-fit text-center flex justify-center items-center"
                        onClick={handleFieldsVerification}
                    >
                        Siguiente
                    </Link>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-2  items-center">
                            <img src="/public/likeIcon.svg" alt="" />
                            <p className=" font-normal text-base"> Encuentra trabajadores capacitados en cuestion de minutos </p>
                        </div>
                        <div className="flex flex-row gap-2  items-center">
                            <img src="/public/likeIcon.svg" alt="" />
                            <p className=" font-normal text-base"> Chatea con los candidatos para encontrar al trabajador adecuado</p>
                        </div>
                        <div className="flex flex-row gap-2  items-center">
                            <img src="/public/likeIcon.svg" alt="" />
                            <p className=" font-normal text-base"> Paga solo cuando estés 100% satisfecho</p>
                        </div>
 
                    </div>
                </div>
            </div>
            <ContenedorLogoHorizontal customStyle="lg:w-[45%]" />

        </div>

    );
}
export default CreateJob;