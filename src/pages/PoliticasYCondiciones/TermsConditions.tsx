import React from "react"
import ToolbarDefault from "../components/ToolbarDefaul";
const TermsConditions = () =>{
    return(<div className='w-screen h-screen flex flex-col'>
        <ToolbarDefault/>
        <div className="flex-1 flex flex-row w-full overflow-y-scroll">
            
            <div className="w-4/6 flex flex-col px-[7%] pt-7 text-[#585858] text-base">
                <p className="text-[15px]">EasyFixy, inc.</p>
                <h1 className="text-black text-2xl font-bold">Términos y Condiciones de Uso de la plataforma EasyFixy</h1>
                <br />
                <h2><strong>1. ASPECTOS GENERALES</strong></h2>
                <br />
                <p className="text-justify">EasyFixy S.A.S. es una sociedad constituida conforme a las leyes colombianas, identificada con NIT. 900.843.898-9, con domicilio en la ciudad de Bogotá D.C., quien para los efectos de los presentes Términos y Condiciones de Uso de la Plataforma EasyFixy (en adelante, “Términos y Condiciones”) se denominará "EasyFixy".</p>
                <br />
                <h2><strong>2. DEFINICIONES</strong></h2>
                <br />
                <ol className="list-item list-decimal text-justify">
                    <li ><strong>Aliado Comercial:</strong> Persona natural o jurídica que exhibe, ofrece y comercializa productos y/o servicios a través de la Plataforma EasyFixy, para que los mismos sean adquiridos por los Usuarios/Consumidores.</li>
                    <li><strong>Créditos:</strong> Significan los intangibles con los que cuenta el Usuario/Consumidor en la sección denominada "Promos y Créditos" al interior de la Plataforma EasyFixy, con los cuales puede adquirir los productos y/o servicios exhibidos en la Plataforma EasyFixy.</li>
                    <li><strong>Datos Personales:</strong> Es toda información que permite identificar o hacer identificable a una persona natural.</li>
                    <li><strong>Plataforma EasyFixy:</strong> Plataforma virtual compuesta por una aplicación para dispositivos móviles y una página web, por medio de la cual los Aliados Comerciales exhiben, ofrecen y comercializan productos y/o servicios para que sean adquiridos por los Usuarios/Consumidores.</li>
                    <li><strong>Repartidor Independiente:</strong> Persona natural que, de manera libre y voluntaria, en calidad de mandatario de los Usuarios/Consumidores, acepta la gestión de las órdenes solicitadas por éstos por medio de la Plataforma EasyFixy.</li>
                    <li><strong>Titular:</strong> Persona natural cuyos Datos Personales son objeto de Tratamiento.</li>
                    <li><strong>Tratamiento:</strong> Es cualquier operación o conjunto de operaciones sobre Datos Personales, tales como la recolección, almacenamiento, uso, circulación o supresión.</li>
                    <li><strong>Usuario/Consumidor:</strong> Persona natural que, como destinatario final, utiliza la Plataforma EasyFixy para adquirir los productos y/o servicios exhibidos, ofrecidos y comercializados por los Aliados Comerciales a través de la misma.</li>
                </ol>

            </div>
            <div className="w-2/6 flex flex-col px-[5%] pt-8">
                <ul className="text-[#292929] list-disc text-justify">
                    <li>Politica de tratamiento de Datos Personales (Politica de privacidad)</li>
                    <li>Terminos y Condiciones de Uso de la plataforma EasyFixy</li>
                </ul>

            </div>
        </div>
    </div>)
}
export default TermsConditions;