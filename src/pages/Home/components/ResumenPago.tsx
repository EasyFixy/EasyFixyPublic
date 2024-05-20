import React, { useState, useEffect } from "react";  
import NavbarEmpleador from "../../components/NavbarEmpleador";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResumenPago = () => {
    const searchParams = new URLSearchParams(location.search);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const paymentReferenceId = decodeURIComponent(searchParams.get('preference_id') ?? '')
    const paymentStatus = decodeURIComponent(searchParams.get('collection_status') ?? '')
    const [employeeName, setEmployeeName] = useState();
    const [jobPrice, setJobPrice] = useState();
    const[jobDate, setJobDate] = useState("");
    const[jobOfferId, setJobOfferId] = useState();
    const ReferenceId = paymentReferenceId.slice(0,10);
    // Datos de ejemplo
    const transferencia = {
        fecha: "15/05/2024",
        monto: "150.00 USD",
        destinatario: "Juan Pérez",
        referencia: "ABC123XYZ",
        estado: "Aceptada" // Puede ser "Aceptada", "Rechazada" o "En espera"
    };

    const getEstadoClass = (paymentStatus) => {
        switch (paymentStatus) {
            case "approved":
                return "text-green-500";
            case "rejected":
                return "text-red-500";
            case "in_process":
                return "text-orange-500";
            default:
                return "";
        }
    };

    const getEstadoText = (paymentStatus) => {
        switch (paymentStatus) {
            case "approved":
                return "Aceptado";
            case "rejected":
                return "Rechazada";
            case "in_process":
                return "En espera";
            default:
                return paymentStatus;
        }
    };

    useEffect(() => {
        const url = `${baseUrl}getPaymentInfoPerReference?paymentReferenceId=${encodeURIComponent(paymentReferenceId)}`;
        console.log(paymentReferenceId)
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
                    setEmployeeName(result.data[0].employeeName)
                    setJobPrice(result.data[0].jobPrice)
                    setJobOfferId(result.data[0].jobOfferId)
                } else {
                    toast.warn("Error interno");
                }
                console.log(result)
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
            setJobDate(formattedDate);
    }, []);


    return (
    <div className="w-screen">
        <NavbarEmpleador></NavbarEmpleador>
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white mt-8">
            
            <h2 className="text-3xl font-bold text-center mb-6">Resumen de Transferencia</h2>
            <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-900">Fecha:</span>
                    <span className="text-gray-900">{jobDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-900">Cantidad Enviada:</span>
                    <span className="text-gray-900">{jobPrice}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-900">Destinatario:</span>
                    <span className="text-gray-900">{employeeName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-900">Referencia:</span>
                    <span className="text-gray-900">{ReferenceId}</span>
                </div>
                <div className={`flex justify-between py-2 ${getEstadoClass(paymentStatus)}`}>
                    <span className="font-bold text-gray-900">Estado:</span>
                    <span>{getEstadoText(paymentStatus)}</span>
                </div>
                <div className="flex justify-center">
                    <button><Link to={'/my/home/employer'} className="bg-[#292929] flex flex-row text-white justify-center items-center px-8 py-2 rounded-3xl">
                        <img src="/icons/arrow-circle-left.svg" alt="volver" className="pr-2"/>Volver
                        </Link></button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ResumenPago;
