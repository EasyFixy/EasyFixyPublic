import React, { useState } from "react";
import NavbarEmpleado from "../components/NavbarEmpleado";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";

const RetirarDinero = () => {
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = useAppSelector(state => state.Auth.token);
  const handleRetirar = () => {
    // Validar los campos antes de proceder
    if (!numeroTarjeta) {
      toast.warn("Por favor, ingrese el número de la tarjeta.");
      return;
    }
    if (!nombreTarjeta) {
      toast.warn("Por favor, ingrese el nombre y apellido como figura en la tarjeta.");
      return;
    }
    if (!tipoTarjeta) {
      toast.warn("Por favor, seleccione el tipo de tarjeta.");
      return;
    }
    if (!cantidad) {
      toast.warn("Por favor, ingrese la cantidad a retirar.");
      return;
    }
    const requestData = {
      amount: cantidad,
      token: token,
      numeroTarjeta,
      nombreTarjeta,
      tipoTarjeta,
    };

    const url = `${baseUrl}createDispatch`;
    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData) // Convertir el objeto a JSON
    }
    fetch(url, requestOptions)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          if(data.statusCode == 200){
              toast.success(`se ha creado correctamente el dispatch para retirar su dinero`)
          }else{
            toast.error(`no se pudo crear el dispatch para retirar dinero`)
          }
      })
      .catch(error => {
          console.error('Error:', error);
          toast.error(`no se pudo crear el dispatch para retirar dinero`)
      });
  };
    return (
      <div className="w-screen h-screen flex flex-col overflow-y-auto">
        <NavbarEmpleado />
        <div className="flex-grow flex flex-col items-center mt-8">
          <div className="w-full max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Retirar Dinero</h2>
            <h3 className="text-orange-500 font-bold mb-4 underline">Tarjeta</h3>
            <div className="rounded-lg overflow-hidden shadow-1 p-6 mx-auto">
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
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(e.target.value)}
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
                    value={nombreTarjeta}
                    onChange={(e) => setNombreTarjeta(e.target.value)}
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
                    value={tipoTarjeta}
                    onChange={(e) => setTipoTarjeta(e.target.value)}
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
            <div className="rounded-lg overflow-hidden shadow-1">
              <form className="w-full p-6" onSubmit={(e) => { e.preventDefault(); handleRetirar(); }}>
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
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 w-2/3"
                  />
                  <button
                    type="submit"
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