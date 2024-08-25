import { useEffect, useState} from "react";
import CalificacionTrabajo from "../components/CalificacionTrabajo";
import { decodeJWT } from "../../../Helpers/Token";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { convertToColombiaTime } from "../../../Helpers/Fechas";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { addFinishedJob } from "../../../features/Jobs/Jobs";


const StyledRating = styled(Rating)({
  '& .MuiRating-iconEmpty': {
    color: '#ffffff', // Color blanco para el borde de estrellas vacías
  },
});
const Modal = ({ isOpen, onClose, jobData, jobType, infoEmployee }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.Auth.token);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [infoJobUser, setInfoJobUser] = useState();
  const [ratingValue, setRatingValue] = useState(null);
  const personType = infoEmployee ? "Empleado" : "Empleador" ;
  const closeModal2 = () => {
  setIsModal2Open(false);
  };

  const handleTerminarTrabajoClick = () => {
    
    fetch(`${baseUrl}updateJobStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobId: jobData.jobId,
        jobStatus: 4,
        token: token
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if(data.statusCode == 200){
        dispatch(addFinishedJob(jobData?.jobId));
        toast.success('se ha finalizado el trabajo, le informaremos al empleado');
        setIsModal2Open(true);
        onClose(); // Cierra el primer modal
      }else{
        toast.error('ha habido un error finalizando el trabajo');
      }
        
    })
    .catch(error => {
      console.error('Error updating job status:', error);
      toast.error('ha habido un error finalizando el trabajo');
      // Manejar errores, como mostrar un mensaje al usuario
    });
    
  };
  const fetchUserJobInfo = () => {
    const token = decodeJWT()
    if (token) {
        fetch(`${baseUrl}getJobUsersInfo?jobId=${jobData?.jobId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setInfoJobUser(data.data);
                setRatingValue(infoEmployee ? parseFloat(data.data?.calificacionMediaEmpleado) ?? 0 : parseFloat(data.data?.calificacionMediaEmpleador) ?? 0)

                // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
            });
    } else {
    }
    //fetch()
}
  useEffect(()=>{
    fetchUserJobInfo();
  },[])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
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
                    <p className="font-normal break-words">{jobData?.jobOfferDescription ?? ""}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Fecha de trabajo:</p>
                  <div className="border border-white rounded-md p-1">
                  <p className="font-normal break-words">{convertToColombiaTime(jobData?.jobOfferDateAtWork) ?? ""}</p>
                  </div>
                </div>
                <div >
                  <p className="font-semibold">Precio Acordado:</p>
                  <div className="border border-white rounded-md p-1">
                  <p className="font-normal break-words">{jobType !== 'Ofertado' ? jobData?.jobPrice ?? 0 : jobData?.jobOfferEstimatePrice ?? 0}</p>
                  </div>
                </div>
              </div>
              {jobType !== 'Ofertado' ?

                <div>
                  <div className="mb-5">
                    <h3 className="text-xl font-bold">
                      información del {personType}   
                    </h3>
                  </div>
                  <div className="flex items-center mb-2">
                    <img src="/empleadologo.svg" alt="Profile" className="bg-gray-200 w-15 h-15  mr-4" />
                    <div>
                      <p className="text-cyan-700 font-bold">{infoEmployee ? infoJobUser?.employeeName ?? "" : infoJobUser?.employerName}</p>
                      <p>Calificación promedio</p>
                      <div className="flex justify-between"> {/* Alineando los elementos a la derecha */}
                        <StyledRating
                          name="half-rating-read" 
                          value={ratingValue}
                          precision={0.1} 
                          readOnly
                        />

                      </div>
                    </div>
                  </div>
                  {
                    (infoEmployee && jobType == 'Pendiente' && jobData?.jobStatus == '1') &&
                    <div className="absolute bottom-0 right-0 m-4 ">
                        <button onClick={handleTerminarTrabajoClick} className="color4 hover:bg-cyan-700 text-white px-4 py-2 rounded-md mt-2 ml-4">Terminar Trabajo</button> {/* Botón de seleccionar */}
                    </div>
                  }
                  {
                    (infoEmployee && jobType == 'Pendiente' && jobData?.jobStatus == '0') &&
                    <div className="absolute bottom-0 right-0 m-4 ">
                      <a href={jobData?.jobOrderId} target="_blank" rel="noopener noreferrer" className="color4 hover:bg-cyan-700 text-white px-4 py-2 rounded-md mt-2 ml-4">
                        ir a Pagar
                      </a>
                    </div>
                  }
                </div>
                : null
              }
            </div>
          </div>
        </div>
      )}
      {
        isModal2Open && 
        <CalificacionTrabajo isOpen={isModal2Open} onClose={closeModal2} jobData={jobData}  />

      }
    </>
  );
};

export default Modal;