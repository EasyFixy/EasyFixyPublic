import React from "react";


const CajaGanancias = (props) =>{
    return(
        <div className="w-full h-full flex-col mainBackground rounded-2xl border border-black border-solid grid place-items-center p-4">
            <h1 className="sm:text-2xl text-1xl font-bold lg:m-4">Ganancias obtenidas</h1>
            <div className="flex flex-row">
                <img src="/icons/bandera.png" alt="bandera de colombia" className="w-8 h-4"/>
                <p className="">Pesos col</p>
                <p className="ml-8 grid place-items-center">$ {props.profit || props.profit === 0 ? props.profit : "-"}</p>
            </div>
        </div>
    )
}

export default CajaGanancias;