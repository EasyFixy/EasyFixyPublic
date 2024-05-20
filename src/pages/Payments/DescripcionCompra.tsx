import React from "react";      

const DescripcionCompra = () => {
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
                        <tr className="flex justify-start text-1xl mt-8"><td>Fecha</td><td className="ml-auto">23 de Mayo 2024</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Nombre del trabajo</td><td className="ml-auto">Reparar ducha electrica</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Descripcion del trabajo</td><td className="ml-auto">Repara goteo de una ducha</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Medio de pago</td><td className="ml-auto">Tarjeta de credito</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Persona a pagar </td><td className="ml-auto">Pepito Perez</td></tr>
                        <tr className="flex justify-start text-1xl mt-1"><td>Valor a pagar</td><td className="ml-auto">$ 50.000 COP</td></tr>
                        <div className="flex flex-row justify-center mt-8">
                            <button className="bg-[#292929] flex flex-row text-white justify-center items-center px-8 py-2 rounded-3xl"><img src="/icons/arrow-circle-left.svg" alt="volver" className="pr-2"/>Volver</button>
                            <button className="bg-[#FD7401] flex flex-row text-white justify-center items-center px-8 py-2 rounded-3xl ml-8">Siguiente<img src="/icons/arrow-circle-right.svg" alt="siguiente" /></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DescripcionCompra;