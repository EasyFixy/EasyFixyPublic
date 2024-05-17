import React from "react";
import NavbarEmpleador from "../../components/NavbarEmpleador";

const ResumenPago = () => {
    // Datos de ejemplo
    const transferencia = {
        fecha: "15/05/2024",
        monto: "150.00 USD",
        destinatario: "Juan Pérez",
        cuentaDestino: "1234 5678 9012 3456",
        bancoDestino: "Banco Ejemplo",
        referencia: "ABC123XYZ",
        estado: "Aceptada" // Puede ser "Aceptada", "Rechazada" o "En espera"
    };

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "Aceptada":
                return "text-green-500";
            case "Rechazada":
                return "text-red-500";
            case "En espera":
                return "text-yellow-500";
            default:
                return "";
        }
    };

    return (
    <div className="w-screen">
        <NavbarEmpleador></NavbarEmpleador>
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            
            <h2 className="text-2xl font-bold text-center mb-6">Resumen de Transferencia</h2>
            <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Fecha:</span>
                    <span className="text-gray-900">{transferencia.fecha}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Monto:</span>
                    <span className="text-gray-900">{transferencia.monto}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Destinatario:</span>
                    <span className="text-gray-900">{transferencia.destinatario}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Cuenta Destino:</span>
                    <span className="text-gray-900">{transferencia.cuentaDestino}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Banco Destino:</span>
                    <span className="text-gray-900">{transferencia.bancoDestino}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Referencia:</span>
                    <span className="text-gray-900">{transferencia.referencia}</span>
                </div>
                <div className={`flex justify-between py-2 ${getEstadoClass(transferencia.estado)}`}>
                    <span className="font-semibold text-gray-600">Estado:</span>
                    <span className="text-gray-900">{transferencia.estado}</span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ResumenPago;
