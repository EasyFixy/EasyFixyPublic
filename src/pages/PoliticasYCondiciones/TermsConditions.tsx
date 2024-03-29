import React from "react"
import ToolbarDefault from "../components/ToolbarDefaul";
import { Link } from "react-router-dom";
const TermsConditions = () =>{
    return(<div className='w-screen h-screen flex flex-col'>
        <ToolbarDefault/>
        <div className="flex-1 flex flex-row w-full overflow-y-scroll">
            <div className="w-4/6 flex flex-col px-[7%] pt-7 text-[#585858] text-base">
                <p className="text-[15px]">EasyFixy, inc.</p>
                <h1 className="text-black text-2xl font-bold">Términos y Condiciones de Uso de la plataforma EasyFixy</h1>
                <br />
                <p className="text-justify">Por favor, lea detenidamente estos términos y condiciones antes de utilizar los servicios de EasyFixy. Al acceder y utilizar nuestra plataforma, usted acepta cumplir con los siguientes términos y condiciones:.</p>
                <br />
                <h2><strong>I. USO DE LA PLATAFORMA</strong></h2>
                <br />
                <ol className="list-item  text-justify">
                    <li><strong>1. </strong>Usted reconoce y acepta que EasyFixy es una plataforma en línea que facilita la conexión entre empleadores y empleados para la contratación de servicios. </li>
                    <br />
                    <li><strong>2. </strong>Usted declara y garantiza que utilizará nuestra plataforma únicamente con fines legales y de acuerdo con estos términos y condiciones. </li>
                </ol>
                <br />
                <h2><strong>II. REGISTRO DE USUARIO</strong></h2>
                <br />
                <ol className="list-item  text-justify">
                    <li><strong>1. </strong>Para utilizar ciertas funciones de nuestra plataforma, puede ser necesario registrarse y crear una cuenta de usuario. </li>
                    <br />
                    <li><strong>2. </strong>Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, y de todas las actividades que ocurran bajo su cuenta. </li>
                </ol>
                <br />
                <h2><strong>III. RESPONSABILIDAD DEL USUARIO</strong></h2>
                <br />
                <ol className="list-item  text-justify">
                    <li><strong>1. </strong>Usted acepta proporcionar información precisa, completa y actualizada al registrarse en nuestra plataforma y utilizar nuestros servicios. </li>
                    <br />
                    <li><strong>2. </strong>Usted acepta no utilizar nuestra plataforma para cualquier propósito ilegal o no autorizado, ni violar ninguna ley aplicable. </li>
                </ol>
                <br />
                <h2><strong>IV. PROPIEDAD INTELECTUAL</strong></h2>
                <br />
                <ol className="list-item  text-justify">
                    <li><strong>1. </strong>Todos los derechos de propiedad intelectual relacionados con nuestra plataforma y su contenido son propiedad de EasyFixy o de sus licenciantes. </li>
                    <br />
                    <li><strong>2. </strong>Usted acepta no copiar, modificar, distribuir, vender o explotar de otra manera ningún contenido de nuestra plataforma sin el consentimiento previo por escrito de EasyFixy. </li>
                </ol>
                <br />
                <h2><strong>V. LIMITACIÓN DE RESPONSABILIDAD</strong></h2>
                <br />
                <ol className="list-item  text-justify">
                    <li>Usted utiliza nuestra plataforma bajo su propio riesgo. EasyFixy no será responsable por cualquier pérdida o daño que surja del uso de nuestra plataforma. </li>
                </ol>
                <br />
                <h2><strong>VI. MODIFICACIONES DE LOS TERMINOS Y CONDICIONES</strong></h2>
                <br />
                <ol className="list-item  text-justify">
                    <li>EasyFixy se reserva el derecho de actualizar o modificar estos términos y condiciones en cualquier momento sin previo aviso </li>
                </ol>
                <br />
                <h2><strong>VII. LEY APLICABLE Y JURISDICCIÓN</strong></h2>
                <br />
                <p className="text-justify">Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República de Colombia, excluyendo cualquier conflicto de disposiciones legales.</p>
                <br />
                <h2><strong>VIII. CONTACTO</strong></h2>
                <br />
                <p className="text-justify">Si tiene alguna pregunta, inquietud o solicitud relacionada con estos términos y condiciones, no dude en ponerse en contacto con nosotros a través de easyfixy26@gmail.com.</p>
                <br />
                <p className="text-justify">Al utilizar nuestra plataforma, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestra plataforma.</p>
                <br />
            </div>
            <div className="w-2/6 flex flex-col px-[5%] pt-8">
                <ul className="text-[#292929] list-disc text-justify">
                <li><Link to={'/policies-privacity'} className= "orange-link">Politica de tratamiento de Datos Personales (Politica de privacidad)</Link></li>
                <li><Link to={'/terms-conditions'} className= "orange-link">Terminos y Condiciones de Uso de la plataforma EasyFixy</Link></li>
                </ul>

            </div>
        </div>
    </div>)
}
export default TermsConditions;