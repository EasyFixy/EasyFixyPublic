import React from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import { Link } from "react-router-dom";
import NavbarEmpleado from "../components/NavbarEmpleado";

const RetirarDinero = () => {
    return (
      <div className="w-screen h-screen flex flex-col overflow-y-auto">
        <ToolbarDefault />
        <NavbarEmpleado />
        <div className="flex-grow flex flex-col items-center mt-8">
          <div className="w-full max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Retirar Dinero</h2>
            <h3 className="text-orange-500 font-bold mb-4 underline">Tarjeta</h3>
            <div className="rounded-lg overflow-hidden shadow-lg p-6 border border-gray-700 mx-auto">
              <form className="w-full">
                <div className="mb-4">
                  <label
                    htmlFor="numeroTarjeta"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Número de la tarjeta
                  </label>
                  <input
                    id="numeroTarjeta"
                    type="text"
                    placeholder="Ingrese el número de la tarjeta"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nombreTarjeta"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Nombre y apellido como figura en la tarjeta
                  </label>
                  <input
                    id="nombreTarjeta"
                    type="text"
                    placeholder="Ingrese el nombre y apellido"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tipoTarjeta"
                    className="block text-orange-500 text-sm font-bold mb-2 underline"
                  >
                    Tipo de tarjeta
                  </label>
                  <select
                    id="tipoTarjeta"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled selected hidden>
                      Seleccionar
                    </option>
                    <option value="credito">Crédito</option>
                    <option value="debito">Débito</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full max-w-xl mt-8 mb-8">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
              <form className="w-full p-6">
                <h2 className="text-4xl font-bold mb-4">Dinero Disponible</h2>
                <div className="flex items-center mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1280px-Flag_of_Colombia.svg.png"
                    alt="Bandera de Colombia"
                    className="w-8 h-8 mr-2"
                  />
                  <span className="text-gray-700 mr-2">Pesos col</span>
                  <span className="text-sm text-gray-500">$0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <input
                    type="number"
                    placeholder="Cantidad a retirar"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 w-2/3"
                  />
                  <button
                    type="button"
                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline w-1/3"
                  >
                    Retirar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RetirarDinero;