import React from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import { Link } from "react-router-dom";
const PoliciesPrivacy = () =>{
    return(<div className='w-screen h-screen flex flex-col'>
    <ToolbarDefault/>
    <div className="flex-1 flex flex-row w-full overflow-y-scroll">
            <div className="w-4/6 flex flex-col px-[7%] pt-7 text-[#585858] text-base">
                <p className="text-[15px]">EasyFixy, inc.</p>
                <h1 className="text-black text-2xl font-bold">Política de Tratamiento de Datos Personales de EasyFixy (Política de Privacidad)</h1>
                <br />
                <p className="text-justify">La presente Política de Tratamiento de Datos Personales describe cómo EasyFixy, en adelante referido como "nosotros" o "la plataforma", recopila, utiliza y protege la información personal que usted proporciona al utilizar nuestros servicios en línea. Al registrarse como usuario de nuestra plataforma, ya sea como empleado o empleador, usted acepta los términos y condiciones establecidos en esta política.</p>
                <br/>
                <h2><strong>I. INFORMACIÓN QUE RECOPILAMOS</strong></h2>
                <br />
                <p className="text-justify">Cuando utiliza nuestros servicios en línea, podemos recopilar la siguiente información personal:</p>
                <br />
                <ol className="list-item text-justify">
                    <li><strong>1. Información de contacto:</strong> Como nombre completo, dirección de correo electrónico, número de teléfono y dirección postal.</li>
                    <br />
                    <li><strong>2. Información de perfil:</strong> Incluyendo información de perfil profesional y educativo, experiencia laboral, habilidades, certificaciones y calificaciones. </li>
                    <br />
                    <li><strong>3. Información de pago:</strong> Si proporciona detalles de pago para procesar transacciones. </li>
                    <br />
                    <li><strong>4. Información de inicio de sesión:</strong> Como nombre de usuario y contraseña. </li>
                    <br />
                    <li><strong>5. Información demográfica:</strong> Como edad, género, ubicación e intereses. </li>
                </ol>
                <br />
                <h2><strong>    II. USO DE LA INFORMACIÓN RECOPILADA</strong></h2>
                <br />
                <p className="text-justify">Utilizamos la información personal recopilada para los siguientes fines:</p>
                <br />
                <ol className="list-item text-justify">
                    <li><strong>1. </strong>Facilitar la creación y administración de cuentas de usuario. </li>
                    <br />    
                    <li><strong>2. </strong>Permitir la conexión entre empleadores y empleados para la contratación de servicios. </li>
                    <br />
                    <li><strong>3. </strong>Procesar pagos y transacciones. </li>
                    <br />
                    <li><strong>4. </strong>Personalizar la experiencia del usuario y proporcionar contenido relevante. </li>  
                    <br />
                    <li><strong>5. </strong>Proporcionar soporte técnico y atención al cliente. </li>
                    <br />    
                    <li><strong>6. </strong>Cumplir con nuestras obligaciones legales y regulatorias. </li>
                </ol>
                <br />
                <h2><strong>    III. COMPARTIR INFORMACIÓN PERSONAL</strong></h2>
                <br />
                <p className="text-justify">Podemos compartir su información personal con terceros en las siguientes circunstancias:</p>
                <br />
                <ol className="list-item text-justify">
                    <li><strong>1. </strong>Con proveedores de servicios que nos ayudan a operar nuestra plataforma y brindar servicios. </li>
                    <br />
                    <li><strong>2. </strong>Con empleadores o empleados para facilitar la contratación de servicios. </li>
                    <br />
                    <li><strong>3. </strong>Cuando sea necesario para cumplir con obligaciones legales o responder a solicitudes legales válidas. </li>
                    <br />
                    <li><strong>4. </strong>Con su consentimiento expreso. </li>
                </ol>
                <br />
                <h2><strong>IV. PROTECCIÓN DE LA INFORMACIÓN PERSONAL</strong></h2>
                <br />
                <p className="text-justify">Nos comprometemos a proteger la seguridad y confidencialidad de su información personal. Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger contra el acceso no autorizado, la divulgación, la alteración o destrucción de información.</p>
                <br />
                <h2><strong>V. ACCESO Y CONTROL DE SU INFORMACIÓN PERSONAL</strong></h2>
                <br />
                <p className="text-justify">Usted tiene derecho a acceder, corregir, actualizar o eliminar su información personal en cualquier momento. Puede hacerlo iniciando sesión en su cuenta o poniéndose en contacto con nuestro equipo de soporte.</p>
                <br />
                <h2><strong>VI. CAMBIOS EN ESTA POLITICA DE PRIVACIDAD</strong></h2>
                <br />
                <p className="text-justify">Nos reservamos el derecho de actualizar esta Política de Tratamiento de Datos Personales en cualquier momento. Se le notificará sobre cambios significativos en la forma en que tratamos la información personal enviando una notificación a la dirección de correo electrónico asociada con su cuenta.</p>
                <br />
                <h2><strong>VII. CONTACTO</strong></h2>
                <br />
                <p className="text-justify">Si tiene alguna pregunta, inquietud o solicitud relacionada con esta Política de Tratamiento de Datos Personales, no dude en ponerse en contacto con nosotros a través de easyfixy26@gmail.com.</p>
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
export default PoliciesPrivacy;