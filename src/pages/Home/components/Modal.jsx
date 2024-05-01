import { useState} from "react";
import CalificacionTrabajo from "../components/CalificacionTrabajo";


const Modal = ({ isOpen, onClose, jobData, jobType }) => {

  const [isModal2Open, setIsModal2Open] = useState(false);

  const closeModal2 = () => {
  setIsModal2Open(false);
  };

  const handleTerminarTrabajoClick = () => {
    setIsModal2Open(true);
    onClose(); // Cierra el primer modal
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
            {jobType === 'Pendiente' && (
              <div className="color3 p-8 rounded-lg shadow-lg z-50 relative text-white"  style={{ maxWidth: '60rem' }}>
              <button onClick={onClose} className=" absolute top-0 right-0 m-4 text-white hover:text-gray-400 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="grid grid-cols-2 gap-10">
              {/* Columna izquierda */}
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold break-words">{"Trabajo: "+jobData?.jobOfferTittle} ({jobType})</h3>
                </div>
                <div className="mb-4">
                  <p className="font-semibold break-words">Descripción:</p>
                  <div className="border border-white rounded-md p-1">
                    <p className="font-normal break-words">{jobData?.jobOfferDescription}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Fecha de trabajo:</p>
                  <div className="border border-white rounded-md p-1">
                  <p className="font-normal break-words">{jobData?.jobOfferDateAtWork}</p>
                  </div>
                </div>
                <div >
                  <p className="font-semibold">Precio Acordado:</p>
                  <div className="border border-white rounded-md p-1">
                  <p className="font-normal break-words">{jobData?.jobOfferEstimatePrice}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold">Trabajador electo:</h3>
                </div>
                <div className="flex items-center mb-2">
                  <img src="/empleadologo.svg" alt="Profile" className="bg-gray-200 w-15 h-15  mr-4" />
                  <div>
                    <p className="text-orange-500 font-bold">Nombre del Trabajador</p>
                    <p>Calificación promedio</p>
                    <div className="flex justify-between"> {/* Alineando los elementos a la derecha */}
                      <div className="flex">
                        {/* Agrega las 5 estrellas aquí */}
                        <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                        <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                        <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                        <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                        <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                      </div>
                     
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 m-4 ">
                    <button onClick={handleTerminarTrabajoClick} className="color4 hover:bg-orange-700 text-white px-4 py-2 rounded-md mt-2 ml-4">Terminar Trabajo</button> {/* Botón de seleccionar */}
                </div>
              </div>
            </div>
          </div>
            )}
            {jobType === 'Realizado' && (
               <div className="color3 p-8 rounded-lg shadow-lg z-50 relative text-white"  style={{ maxWidth: '60rem' }}>
               <button onClick={onClose} className=" absolute top-0 right-0 m-4 text-white hover:text-gray-400 focus:outline-none">
               <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
             <div className="grid grid-cols-2 gap-10">
               {/* Columna izquierda */}
               <div>
                 <div className="mb-4">
                   <h3 className="text-xl font-bold break-words">{"Trabajo: "+jobData?.jobOfferTittle} ({jobType})</h3>
                 </div>
                 <div className="mb-4">
                   <p className="font-semibold break-words">Descripción:</p>
                   <div className="border border-white rounded-md p-1">
                     <p className="font-normal break-words">{jobData?.jobOfferDescription}</p>
                   </div>
                 </div>
                 <div className="mb-4">
                   <p className="font-semibold">Fecha de trabajo:</p>
                   <div className="border border-white rounded-md p-1">
                   <p className="font-normal break-words">{jobData?.jobOfferDateAtWork}</p>
                   </div>
                 </div>
                 <div >
                   <p className="font-semibold">Precio Acordado:</p>
                   <div className="border border-white rounded-md p-1">
                   <p className="font-normal break-words">{jobData?.jobOfferEstimatePrice}</p>
                   </div>
                 </div>
               </div>
               <div>
                 <div className="mb-5">
                   <h3 className="text-xl font-bold">Realizado por:</h3>
                 </div>
                 <div className="flex items-center mb-2">
                   <img src="/empleadologo.svg" alt="Profile" className="bg-gray-200 w-15 h-15  mr-4" />
                   <div>
                     <p className="text-orange-500 font-bold">Nombre del Trabajador</p>
                     <p>Calificación dada:</p>
                     <div className="flex justify-between"> {/* Alineando los elementos a la derecha */}
                       <div className="flex">
                         {/* Agrega las 5 estrellas aquí */}
                         <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                         <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                         <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                         <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                         <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                       </div>
                      
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
            )}
            {jobType === 'Ofertado' && (
              <div className="color3 p-8 rounded-lg shadow-lg z-50 relative text-white" style={{ maxWidth: '60rem' }}>
                <button onClick={onClose} className=" absolute top-0 right-0 m-4 text-white hover:text-gray-400 focus:outline-none">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="grid grid-cols-2 gap-10">
                {/* Columna izquierda */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold break-words">{"Trabajo: "+jobData?.jobOfferTittle} ({jobType})</h3>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold break-words">Descripción:</p>
                    <div className="border border-white rounded-md p-1">
                      <p className="font-normal break-words">{jobData?.jobOfferDescription}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Fecha de trabajo:</p>
                    <div className="border border-white rounded-md p-1">
                    <p className="font-normal break-words">{jobData?.jobOfferDateAtWork}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-5">
                    <h3 className="text-xl font-semibold">Trabajadores postulados</h3>
                  </div>
                  <div className="flex items-center mb-2">
                    <img src="/empleadologo.svg" alt="Profile" className="bg-gray-200 w-15 h-15  mr-4" />
                    <div>
                      <p className="text-orange-500 font-bold">Nombre del Trabajador</p>
                      <p>Calificación promedio</p>
                      <div className="flex justify-between"> {/* Alineando los elementos a la derecha */}
                        <div className="flex">
                          {/* Agrega las 5 estrellas aquí */}
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                        </div>
                        <button className="color4 hover:bg-orange-700 text-white px-4 py-2 rounded-md mt-2 ml-4">Seleccionar</button> {/* Botón de seleccionar */}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <img src="/empleadologo.svg" alt="Profile" className="bg-gray-200 w-15 h-15  mr-4" />
                    <div>
                      <p className="text-orange-500 font-bold">Nombre del Trabajador</p>
                      <p>Calificación promedio</p>
                      <div className="flex justify-between"> {/* Alineando los elementos a la derecha */}
                        <div className="flex">
                          {/* Agrega las 5 estrellas aquí */}
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                        </div>
                        <button className="color4 hover:bg-orange-700 text-white px-4 py-2 rounded-md mt-2 ml-4">Seleccionar</button> {/* Botón de seleccionar */}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <img src="/empleadologo.svg" alt="Profile" className="bg-gray-200 w-15 h-15  mr-4" />
                    <div>
                      <p className="text-orange-500 font-bold">Nombre del Trabajador</p>
                      <p>Calificación promedio</p>
                      <div className="flex justify-between"> {/* Alineando los elementos a la derecha */}
                        <div className="flex">
                          {/* Agrega las 5 estrellas aquí */}
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                          <img src={`/icons/icon-star-white.svg`} alt="Estrellita" className="w-1/5 flex-initial px-1" />
                        </div>
                        <button className="color4 hover:bg-orange-700 text-white px-4 py-2 rounded-md mt-2 ml-4">Seleccionar</button> {/* Botón de seleccionar */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
       <CalificacionTrabajo isOpen={isModal2Open} onClose={closeModal2} jobData={jobData}  />
    </>
  );
};

export default Modal;