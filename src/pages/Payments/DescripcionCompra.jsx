import React, { useState, useEffect } from "react";      
import { useAppSelector } from "../../app/hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


const DescripcionCompra = () => {
    const searchParams = new URLSearchParams(location.search);
    const jobOfferId = decodeURIComponent(searchParams.get('jobOfferId') ?? '')
    const userId = decodeURIComponent(searchParams.get('employerId') ?? '')
    const price = decodeURIComponent(searchParams.get('price') ?? '')
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [employeeName, setEmployeeName] = useState();
    const[jobDescription, setJobDescription] = useState();
    const[dateCreate, setDateCreate] = useState();
    const[jobTittle, setJobTittle] = useState();

    const token = useAppSelector(state => state.Auth.token);
    console.log(token)
    const next= (e) => {
        e.preventDefault();
        request();
    }

    useEffect(() => {
        const url = `${baseUrl}getUserProfile?userId=${encodeURIComponent(userId)}`;
        const url2 = `${baseUrl}getJobOffer?jobOfferId=${encodeURIComponent(jobOfferId)}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json(); // Si esperas una respuesta JSON
            })
            .then(result => {
                // Aquí puedes trabajar con los datos obtenidos en la respuesta            
                if (result && result.statusCode === 200) {
                    setEmployeeName(result.data.mainData[0].userName)
                } else {
                    toast.warn("Error interno");
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
        fetch(url2)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json(); // Si esperas una respuesta JSON
            })
            .then(result => {
                // Aquí puedes trabajar con los datos obtenidos en la respuesta            
                if (result && result.statusCode === 200) {
                    setJobDescription(result.data[0].jobOfferDescription)
                    setDateCreate(result.data[0].jobOfferDateAtCreate)
                    setJobTittle(result.data[0].jobOfferTittle)
                } else {
                    toast.warn("Error interno");
                }
                console.log(result)
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }, []);

    const request = () => {
        const url = `${baseUrl}getUserProfile?userId=${encodeURIComponent(userId)}`;

            fetch(`${baseUrl}createJob`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "jobOfferId": jobOfferId,
                        "userId": userId,
                        "jobPrice": Number(price),
                        "token": token
                    }
                ),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); // Guardar la respuesta del servidor en el estado
                    if (data.statusCode == 200) {
                        //navigate("/my/home/employee");
                        window.location.href = data.data.orderId
                    } else {
                        toast.warn("Error Creando");
                    }
                })
                .catch(error => {
                    console.error('Error al enviar los datos:', error);
                    toast.warn("Error Subiendo");
                });
    }


    return(
        <div className="bg-cover bg-no-repeat bg-center w-screen h-screen" 
             style={{backgroundImage: "url(/snakebg.svg)", backgroundSize: '50%'}}>
            <div className="flex flex-row">
                <section className="w-[50%]">
                    <img src={'/bill3.svg'}/>
                </section>

                <section className="w-[50%]">
                    <div className="flex flex-col h-auto my-20 mr-40 border rounded-2xl border border-black p-4">
                        <tr className="text-4xl flex justify-center mt-8 font-bold">Descripción de la compra</tr>
                        <tr className="flex justify-start text-1xl mt-8"><td>Fecha</td><td className="ml-auto">{dateCreate}</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Nombre del trabajo</td><td className="ml-auto">{jobTittle}</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Descripcion del trabajo</td><td className="ml-auto">{jobDescription}</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Persona a pagar </td><td className="ml-auto">{employeeName}</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Valor a pagar</td><td className="ml-auto">${price}</td></tr>
                        <div className="flex flex-row justify-center mt-8">
                            <button> <Link to={'/my/home/employer'} className="bg-[#292929] flex flex-row text-white justify-center items-center px-8 py-2 rounded-3xl"><img src="/icons/arrow-circle-left.svg" alt="volver" className="pr-2"/>Volver </Link></button>
                            <button className="bg-[#0E7490] flex flex-row text-white justify-center items-center px-8 py-2 rounded-3xl ml-8" onClick={next}>Siguiente<img src="/icons/arrow-circle-right.svg" alt="siguiente" /></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DescripcionCompra;