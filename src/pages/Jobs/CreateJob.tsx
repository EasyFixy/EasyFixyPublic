import React, { useState } from "react";
import ContenedorLogoHorizontal from "../../componentes/contenedorLogoVerde/ContenedorLogoHorizontal";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateJob = () => {

    const [title, setTitle] = useState<String>();
    const [dateAtWork, setDateAtWork] = useState<String>();
    const [description, setDescription] = useState<String>();
    const [estimatePrice, setEtimatePrice] = useState<Number>();

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

    const handleFieldsVerification = (e) => {
        if (!(title && description && dateAtWork && estimatePrice)) {

            e.preventDefault(); // Evita que el enlace se abra si no se cumple la condición
            toast.warn("Complete todos los datos");
        }
    };

    return (
        <div className="w-screen flex flex-row relative overflow-y-scroll">
            <ToastContainer />
            <button className="absolute left-4 top-4">
                <img src="/public/ButtonBack.svg" alt="" />
            </button>
            <div className="w-[55%] px-[5%] py-[5%] flex flex-col">
                <div className="flex flex-row items-center mb-14">
                    <img src="/public/logo.svg" alt="logo" className="h-20" />
                    <p className="text-4xl fontNameLogo"> EasyFixy</p>
                </div>
                <h1 className="font-bold text-5xl mb-8">Cuentanos que es lo que necesitas <span className="textNaranja">hacer.</span></h1>
                <input className="w-full border border-solid border-[#292929] h-8 rounded-xl mb-5 pl-[3%]"
                    onChange={(event) => { setTitle(event.target.value) }} type="text" placeholder="Nombre del Problema" />
                <textarea className="w-full border border-solid border-[#292929] h-24 rounded-xl mb-5 pl-[3%] resize-none border rounded-md"
                    placeholder="Descripcion de problema"
                    onChange={(event) => { setDescription(event.target.value) }} />
                <div className="flex flex-row justify-between w-full mb-5 h-10">
                    <div className="w-2/6 flex flex-row items-center justify-between h-full">
                        <button className="w-[10%]">
                            <img src="/public/menos.svg" alt="" />
                        </button>
                        <input
                            className="border border-solid border-[#292929] w-[75%] rounded-xl h-full  pl-[3%]"
                            type="number"
                            min={10000}
                            max={500000}
                            step={5000}
                            name="precio"
                            onChange={(event) => { setEtimatePrice(Number(event.target.value)) }}
                            id="precio"
                            placeholder="$ Precio estimado" />
                        <button className="w-[10%]">
                            <img src="/public/mas.svg" alt="" />
                        </button>
                    </div>
                    <input
                        className="border border-solid border-[#292929] w-2/6 h-full rounded-xl"
                        type="date"
                        name=""
                        onChange={(event) => { setDateAtWork(event.target.value) }}
                        id=""
                        placeholder="Fecha de realizacion" />
                </div>
                <Link to={'/my/categories?tipe=createJob&title=' + title + '&description=' + description + '&estimatePrice=' + estimatePrice + '&dateAtWork=' + dateAtWork}
                    onClick={handleFieldsVerification} className="pt-4 w-auto mt-10 mainBackground h-14 text-white px-4 py-0 rounded-full border border-black border-solid">
                    <button className="px-[30px] mainBackground h-10 text-white rounded-full mb-5">
                        Siguiente
                    </button>
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
            <ContenedorLogoHorizontal width="w-[45%]" />

        </div>

    );
}
export default CreateJob;