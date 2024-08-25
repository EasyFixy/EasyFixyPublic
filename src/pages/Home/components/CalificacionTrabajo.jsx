import {React, useState} from 'react';

const CalificacionTrabajo = ({ isOpen, onClose, jobData }) => {


    const [comentario, setComentario] = useState(""); // Variable de estado para almacenar el comentario

    const handleComentarioChange = (e) => {
      setComentario(e.target.value); // Actualiza el valor del comentario cuando cambia el input
    };
    console.log(comentario);

    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
            <div className="color3 p-10 rounded-lg shadow-lg z-50 relative text-white" style={{ maxWidth: '48rem' }}>
              <button onClick={onClose} className="absolute top-0 right-0 m-4 text-white hover:text-gray-400 focus:outline-none">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center justify-center mb-4"> {/* Logo del empleado en la parte superior centrado */}
                <img src="/empleadologo.svg" alt="Profile" className="bg-gray-200 w-15 h-15" />
              </div>
              <div className="mb-2 text-center"> {/* Texto "Cuentanos, ¿Cómo fue el trabajo de "Nombre del trabajador" */}
                <h3 className="text-xl font-bold break-words">
                  Cuentanos, ¿Cómo te fue con <span className="text-cyan-700 break-words">Nombre del trabajador</span>?
                </h3>
              </div>
              <div className="flex justify-center mb-4"> {/* Estrellas centradas */}
                {/* Agrega las 5 estrellas aquí */}
                <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-10 h-10 flex-initial px-1" />
                <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-10 h-10 flex-initial px-1" />
                <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-10 h-10 flex-initial px-1" />
                <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-10 h-10 flex-initial px-1" />
                <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-10 h-10 flex-initial px-1" />
              </div>
              <div className="text-center mb-4"> {/* Input para comentario */}
                <input
                  type="text"
                  placeholder="Escribe un comentario (Opcional)"
                  className="color3 border border-white px-4 py-2 rounded-md w-full text-white"
                  value={comentario} // Valor del input se establece en la variable de estado
                  onChange={handleComentarioChange} // Función para manejar cambios en el input
                />
              </div>
              <div className="text-center"> {/* Botón de enviar centrado */}
                <button className="color4 hover:bg-cyan-700 text-white px-4 py-2 rounded-md">Enviar</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default CalificacionTrabajo;