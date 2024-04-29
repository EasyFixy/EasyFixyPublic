import React from "react";

interface PropsPrice {
    estimatePrice: number;
    setEstimatePrice: (newValue)=> void
}
const EstimatePrice = (
    {estimatePrice,
    setEstimatePrice}:PropsPrice) => {
    // Función para disminuir el precio en 5000
    const disminuirPrecio = () => {
        
        if(estimatePrice- 5000 >= 10000){

            setEstimatePrice(estimatePrice - 5000);
        }
    };
    const aumentarPrecio = () => {
        setEstimatePrice(estimatePrice + 5000);
    };
    const handleChange = (event) => {
        const nuevoPrecio = parseFloat(event.target.value);
        setEstimatePrice(nuevoPrecio);
    };
    return(
        <div className="flex flex-row items-center justify-between w-full h-full">
            <button className={`w-[10%] ${estimatePrice < 15000 ? 'invisible' : ''}`} onClick={disminuirPrecio}>
                <img src="/public/menos.svg" alt="" />
            </button>
            <input
                className="border border-solid border-[#292929] w-[75%] rounded-xl h-full  text-center"
                type="number"
                value={estimatePrice}
                min={10000}
                max={500000}
                step={5000}
                name="precio"
                onChange={handleChange}
                id="precio"
                placeholder="$ Precio estimado" />
            <button className="w-[10%]" onClick={aumentarPrecio}>
                <img src="/public/mas.svg" alt="" />
            </button>
        </div>
    );
}

export default EstimatePrice;