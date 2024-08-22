import React from "react";
import NavbarLandingPage from "../components/NavbarLandingPage";

const FAQ = () => {
    const faqs = [
        {
            question: "¿Qué es EasyFixy?",
            answer: "EasyFixy es una plataforma que conecta a trabajadores independientes con usuarios que requieren de sus servicios."
        },
        {
            question: "¿Cómo me registro en EasyFixy?",
            answer: "Puedes registrarte en EasyFixy haciendo clic en el botón 'Registrarse' en la parte superior de la página e ingresando tus datos."
        },
        {
            question: "¿Cómo contrato un servicio?",
            answer: "Busca el servicio que necesitas, selecciona un profesional, y haz clic en 'Contratar'. Puedes comunicarte directamente con el trabajador para acordar los detalles."
        },
        {
            question: "¿Cómo funcionan los pagos?",
            answer: "Los pagos se realizan a través de la plataforma EasyFixy utilizando un sistema de pago seguro. El dinero se retiene hasta que se complete el servicio."
        },
        {
            question: "¿Qué pasa si tengo un problema con un servicio?",
            answer: "Puedes contactar al soporte de EasyFixy para recibir ayuda en la resolución de cualquier problema que surja durante el proceso."
        },
        {
            question: "¿Puedo ofrecer mis servicios en EasyFixy?",
            answer: "Sí, puedes registrarte como trabajador independiente en EasyFixy y comenzar a ofrecer tus servicios a los usuarios de la plataforma."
        },
        {
            question: "¿Qué tipos de servicios puedo encontrar en EasyFixy?",
            answer: "En EasyFixy puedes encontrar una amplia variedad de servicios, incluyendo reparaciones, mantenimiento, limpieza, diseño gráfico, programación, y más."
        },
        {
            question: "¿Cómo se garantiza la calidad de los servicios?",
            answer: "EasyFixy permite a los usuarios dejar reseñas y calificaciones de los trabajadores. Esto ayuda a mantener un alto estándar de calidad en los servicios ofrecidos."
        },
        {
            question: "¿Es seguro compartir mis datos en EasyFixy?",
            answer: "EasyFixy toma la seguridad de tus datos muy en serio. Utilizamos medidas avanzadas de seguridad para proteger tu información personal."
        },
        {
            question: "¿Cómo cancelo un servicio contratado?",
            answer: "Puedes cancelar un servicio desde tu panel de usuario, pero es importante hacerlo con antelación para evitar posibles penalizaciones."
        },
        {
            question: "¿Cómo contacto al soporte de EasyFixy?",
            answer: "Puedes contactar al soporte a través de la sección de 'Ayuda' en la plataforma o enviando un correo electrónico a soporte@easyfixy.com."
        },
        {
            question: "¿Qué comisiones cobra EasyFixy?",
            answer: "EasyFixy cobra una pequeña comisión por cada transacción exitosa. Esta comisión se deduce automáticamente del pago al trabajador independiente."
        },
    ];

    return (
        <>
        <div className='w-screen h-screen overflow-y-auto '>
            <NavbarLandingPage></NavbarLandingPage>
                <div className="mx-auto pt-24 p-8 overflow-y-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">Preguntas Frecuentes</h1>
                    <div className="flex flex-col space-y-4 w-full">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b-2 pb-4">
                                <h2 className="text-2xl font-semibold">{faq.question}</h2>
                                <p className="mt-2 text-lg">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
        
        </>
        
    );
};

export default FAQ;