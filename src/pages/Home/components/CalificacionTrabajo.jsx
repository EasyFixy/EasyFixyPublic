import {React, useState} from 'react';
import { useAppSelector } from "../../../app/hooks";

const CalificacionTrabajo = ({ isOpen, onClose, employeeName, employeeId }) => {

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [commentMessage, setComentario] = useState(""); // Variable de estado para almacenar el comentario
    const [commentCalification, setRating] = useState(0); // Variable para almacenar la calificación
    const token = useAppSelector(state => state.Auth.token);  // Token de user registrado
    const estado = useAppSelector(state => state.Auth.checked);
    const recipientId=employeeId;                                      // Esta variable por el monento esta estatica, toca esperar que Grevy Haga su componente 
    const commentRol=(estado?'employer':'worker');          // Rol en que se encuentra el eusuario 

    const handleComentarioChange = (e) => {
      setComentario(e.target.value); // Actualiza el valor del comentario cuando cambia el input
    };

    const handleClick = (starValue) => {
        setRating(starValue);
    };
    

    const handdleSendComment = (e) => {
      e.preventDefault();
      const data = {
          token: token,
          recipientId: recipientId,
          commentMessage: commentMessage,
          commentCalification: commentCalification,
          commentRol: commentRol
      };
  
      const url = `${baseUrl}insertComment`;
  
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', // Especifica el tipo de contenido del cuerpo de la solicitud
          },
          body: JSON.stringify(data), // Convierte el objeto de datos a formato JSON para enviarlo en el cuerpo de la solicitud
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('La solicitud no fue exitosa');
          }
          return response.json(); // Si esperas una respuesta JSON
      })
      .then(result => {
          console.log(result);
          location.reload();
          // Aquí puedes trabajar con los datos obtenidos en la respuesta
      })
      .catch(error => {
          console.error('Hubo un problema con la solicitud fetch:', error);
      });
    }
  

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
                  Cuentanos, ¿Cómo te fue con <span className="text-orange-500 break-words">{employeeName}</span>?
                </h3>
              </div>
              <div className="flex justify-center mb-4 h-[30%]">
                  {[1, 2, 3, 4, 5].map((star, index) => {
                      return (
                          <img
                              className="w-10 h-10 flex-initial px-1"
                              key={index}
                              src={index < commentCalification ? "/icons/star.svg" : "/icons/icon-star.svg"}
                              alt="star"
                              style={{ width: "50px", height: "50px", cursor: "pointer" }}
                              onClick={() => handleClick(index + 1)}
                          />
                      );
                  })}
              </div>
              <div className="text-center mb-4"> {/* Input para comentario */}
                <input
                  type="text"
                  placeholder="Escribe un comentario (Opcional)"
                  className="color3 border border-white px-4 py-2 rounded-md w-full text-white"
                  value={commentMessage} // Valor del input se establece en la variable de estado
                  onChange={handleComentarioChange} // Función para manejar cambios en el input
                />
              </div>
              <div className="text-center"> {/* Botón de enviar centrado */}
                <button className="color4 hover:bg-orange-700 text-white px-4 py-2 rounded-md" onClick={handdleSendComment}>Enviar</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default CalificacionTrabajo;