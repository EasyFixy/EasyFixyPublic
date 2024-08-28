import React from "react";
import ContenedorPerfil from "../../components/ContenedorPerfil";
import { useState, useEffect } from "react";
import { UserData } from "../../../models/PerfilEmpleado";
import Comentarios from "../../components/Comentarios";
import PerfilesLaborales from "../../components/PerfilesLaborales";
import Chat from "../../components/Chat";
import { useAppSelector } from "../../../app/hooks";
import PujarPrecio from "./PujarPrecio";
import { io, Socket } from "socket.io-client";

import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { PacmanLoader } from "react-spinners";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface queryWorker {
  labors: number[];
  userLatitude: number;
  userLongitude: number;
  excludeUserId: number | null;
}

interface BestWorkers {
  listingValue: number;
  userId: number;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  height: '93%',
  bgcolor: '#292929',
  boxShadow: 24,
  border: '2px solid #292929'
};


const Negociacion = (props) => {
  const userEnPlataforma = useAppSelector((state) => state.Auth.id);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [offerAccepted, setOfferAccepted] = useState<Boolean>(false);
  const [oponentAccepted, setOponentAccepted] = useState<Boolean>(false);
  const [bidPrice, setBidPrice] = useState(props.priceJobOffer ? parseInt(props.priceJobOffer, 10) : 10000);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [lastOponentChange, setLastOponentChange] = useState(0);
  const [inicialPriceValue, setInicialPriceValue] = useState();
  const [isUserTab, setIsUserTab] = useState(true);
  const [jobOfferId, setJobOfferId] = useState(props.jobOfferId ?? '');
  const[jobDescription, setJobDescription] = useState();
  const[dateCreate, setDateCreate] = useState();
  const[jobTittle, setJobTittle] = useState();
  const navigate = useNavigate();
  // PARAMETROS DE LA PETICION
  const [bestWorkers, setBestWorkest] = useState<BestWorkers[]>([
    { listingValue: 0, userId: 1 },
  ]);
  //const labores = [1,2,3];
  let latitud = 0;
  let longitud = 0;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      longitud = position.coords.longitude;
    });
  }

  // Peticion al back para obtener los mejores trabajadores
  function getBestWorkersForLabors() {
    const query: queryWorker = {
      labors: props.labors,
      userLatitude: latitud,
      userLongitude: longitud,
      excludeUserId: userEnPlataforma
    };
    fetch(`${baseUrl}getBestWorkersForLabors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setBestWorkest(data.data);
        setUserId(data.data[0].userId);
        getInfoPerfil(data.data[0].userId);
        if (socket) {
          console.log('emit ', props.jobOfferId );
          socket.emit('notifyEmployee', { destinatary: data.data[0].userId, inicialPriceValue: props.priceJobOffer, jobOfferId: props.jobOfferId });
        } else {
          console.log("not socket")
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        //toast.warn("Error Subiendo");
      });
  }

  const [userData, setUserData] = useState<UserData>({
    userId: '',
    mainData: [
      {
        userName: "",
        antiguedadYears: null,
      },
    ],
    skills: [
      {
        skillName: "",
      },
    ],
    resumes: [
      {
        resumeDescription: "",
        resumeTimeExperience: 0,
        resumeTitleLabor: "",
        labors: [
          {
            laborName: "",
          },
        ],
      },
    ],
    // porfavor ignorar este error, si se cambia se daña todo
    comments: [
      {
        fullComments: [
          {
            commentCalification: 0,
            commentMessage: "",
            senderName: "",
          },
        ],
        data: [
          {
            cantidadTotalComentariosEmployee: 1,
            mediaCalificaciones: 1,
          },
        ],
      },
    ],
    tempData: [
      {
        userTempDataActive: 0,
        userTempDataLastUpdate: "",
      },
    ],
  });
  const handleClose = () => {
    props.setIsOpen(false);
    switch (props.tipe) {
      case 'employer':
        if (socket) {
          socket.emit('notifyOponentWayOut', { destinataryId: bestWorkers[0].userId });
        }
        break;
      case 'employee':
        if (socket) {
          socket.emit('notifyOponentWayOut', { destinataryId: userId });
          setUserId(0);
        }
        break;
      default:
        console.log("error")
    }

  }
  useEffect(() => {
    console.log('useefect joboffer ', jobOfferId)
    const url = `${baseUrl}getJobOffer?jobOfferId=${encodeURIComponent(jobOfferId)}`;
    fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('La solicitud no fue exitosa');
          }
          return response.json(); // Si esperas una respuesta JSON
      })
      .then(result => {
          // Aquí puedes trabajar con los datos obtenidos en la respuesta            
          if (result && result.statusCode === 200) {
              setJobDescription(result.data[0].jobOfferDescription)
              setDateCreate(result.data[0].jobOfferDateAtCreate)
              setJobTittle(result.data[0].jobOfferTittle)
          } else {
              toast.warn("Error interno");
          }
          console.log(result)
      })
      .catch(error => {
          console.error('Hubo un problema con la solicitud fetch:', error);
      });
  },[jobOfferId])
  const handleTab = () => {
    setIsUserTab(prev => !prev);

  };
  function getInfoPerfil(userId) {
    setLoading(true);
    const options = {
      method: "GET",
    };
    let url = new URL(`${baseUrl}getUserProfile?userId=${userId}`);
    fetch(url, options)
      .then((response) => response.text())
      .then((data) => {
        const json = JSON.parse(data);
        setUserData(json.data);
        console.log(json)
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }

  function getInfoEmployer(employerId) {
    setLoading(true);
    const options = {
      method: "GET",
    };
    let url = new URL(`${baseUrl}getEmployerProfile?userId=${employerId}`);
    fetch(url, options)
      .then((response) => response.text())
      .then((data) => {
        const json = JSON.parse(data);
        setUserData(json.data);
        console.log(json)
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }

  // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
  useEffect(() => {
    console.log("creando")
    const socketo = io(baseUrl, {
      auth: {
        userId: userEnPlataforma
      }
    });
    socketo.on('enterToBid', (notification) => {
      console.log(notification.employer)
      setUserId(notification.employer);
      setInicialPriceValue(notification.inicialPriceValue);
      setBidPrice(notification.inicialPriceValue)
      console.log('notification ',notification.jobOfferId);
      setJobOfferId(notification.jobOfferId)
      setTimeout(() => {
        getInfoEmployer(notification.employer);
      }, 3000);
    });

    socketo.on('oponentWayOut', (notification) => {
      console.log("oponente salio ")
      console.log(notification)
      setLastOponentChange(notification.sender)
    });

    socketo.on('employeeIsBusy', (notification) => {
      changeUser()
    });

    socketo.on('employeeAccepted', (notification) => {
      console.log("oponente acepta")
      setOponentAccepted(true)
    });

    socketo.on('notifiSocketChange', (msg) => {
      console.log("cambiando");
      if (socket) {
        let socketo = socket;
        socketo.id = msg.id
        setSocket(socketo)
        console.log(socketo)
      }
    });

    console.log(socketo);

    setSocket(socketo);

  }, []);

  useEffect(() => {

    switch (props.tipe) {
      case 'employer':
        getBestWorkersForLabors();
        break;
      case 'employee':
        console.log("employeeeee")
        break;
      default:
        console.log("error")
    }

  }, [socket]);

  // pare cambiar comportamiento cuando el oponente acepta un bid
  useEffect(() => {
    if (offerAccepted && oponentAccepted) {
      switch (props.tipe) {
        case 'employer':
          acceptOfferEmployer();
          break;
        case 'employee':
          acceptOfferEmployee()
          break;
        default:
          console.log("error")
      }
    }
  }, [oponentAccepted]);

  useEffect(() => {
    if (lastOponentChange === userId) {
      switch (props.tipe) {
        case 'employer':
          changeUser();
          break;
        case 'employee':
          setUserId(0)
          break;
        default:
          console.log("error")
      }
      const timer = setTimeout(() => {
        setLastOponentChange(-1);
      }, 1000);
    }
  }, [lastOponentChange]);

  function changeUser() {
    console.log('bestE ',bestWorkers);
    if (bestWorkers != null) {

      switch (props.tipe) {
        case 'employer':
          if (socket) {
            socket.emit('notifyOponentWayOut', { destinataryId: bestWorkers[0].userId });
            bestWorkers.push(bestWorkers[0])
            bestWorkers.shift();
            setUserId(bestWorkers[0].userId);
            getInfoPerfil(bestWorkers[0].userId);
            socket.emit('notifyEmployee', { destinatary: bestWorkers[0].userId,  jobOfferId: props.jobOfferId  });
          } else {
            console.log("not socket")
          }
          break;
        case 'employee':
          if (socket) {
            socket.emit('notifyOponentWayOut', { destinataryId: userId });
            setUserId(0);
          } else {
            console.log("not socket")
          }
          break;
        default:
          console.log("error")
      }
    }
  }

  const acceptOfferEmployer = () => {
    const params = new URLSearchParams();
    params.append('jobOfferId', props.jobOfferId);
    params.append('employerId', userId.toString());
    params.append('price', bidPrice.toString());
    const queryString = params.toString();
    console.log(queryString)
    navigate(`/my/buyDescription?${queryString}`);
  }

  const acceptOfferEmployee = () => {
    closeNegotiationPage()
    handleClose();
  }

  const closeNegotiationPage = () => {
    console.log("cerrando")
    toast.success("Ya se está gestionando el pago, sigue pendiente al estado del trabajo");
    props.setPageStatusTipe("")
    
  }

  const showToast = () => {
    return (

    <div className={`flex gap-2`}>
            
            <div className={`flex-1`}>
                <p className="font-12">{` Aceptar el trabajo implica el cumplimiento detallado de la oferta de trabajo!`}</p>
                <div className={` flex flex-row items-start justify-start mt-1`}>
                    <button className={`h-[18px] mr-2 flex flex-row items-center justify-center min-w-[57px] textNaranja bg-white border border-red-500 px-2 rounded-lg`} 
                    onClick={accept}>
                        Confirmar
                    </button>
                    <button
                        className={`h-[18px] flex flex-row items-center justify-cente min-w-[57px] text-white custom-toast-error px-2 rounded-lg`}
                        
                    >
                        cancelar
                    </button>
                </div>
            </div>
        </div>
    )
  }
  const accept = () => {
    setOfferAccepted(true)
    if (socket) {
      socket.emit('acceptOffer', { destinatary: userId });
    } else {
      console.log("socket no iniciado")
      toast.warn("Error Subiendo");
    }
    if (oponentAccepted) {
      switch (props.tipe) {
        case 'employer':
          acceptOfferEmployer();
          break;
        case 'employee':
          acceptOfferEmployee()
          break;
        default:
          console.log("error")
      }
    }
  }
  const acceptOffer = () => {
    setIsUserTab(false);
    toast.info(
      showToast(),
      {
        autoClose: 15000,
        style: ({
            zIndex: 5000
        }),
    }
    );
    

  }

  return (
    <Modal
      open={props.isOpen}
      onClose={handleClose}
      closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      className="bg-black bg-opacity-75"
    >

      <Fade in={props.isOpen}>

        <Box sx={style}>
        <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
      />
            {(userId === 0 || loading) ? (
              <div className="w-full h-full flex flex-col items-center justify-center">

                <PacmanLoader color="#0e7490" />
                <h2 className="text-white text-center text-xl mt-2">
                  Espera un Momento! <br />
                  {
                  props.tipe == 'employer' 
                    ? 'Estamos buscando al mejor empleado para tu trabajo'
                    : 'Estamos buscando el mejor trabajo que se adapta a ti'
                  } 
                </h2>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto">
                <IconButton  onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
               <div className="w-full">
                <button 
                  className="bg-white border rounded h-10 px-2 ml-2 textNaranja font-bold"
                  onClick={handleTab}
                >
                  {isUserTab  ? 'Ver oferta de trabajo' : 'Ver usuario'}
                </button>
                {isUserTab ?
                <>
                <ContenedorPerfil
                  userData={userData}
                  estado={false}
                  isLoading={loading}
                  nameColor={"textNaranja"}
                  width="w-full"
                  textColor="text-white"
                  paddingX="px-[2%]"
                  whiteStar={true}
                  showDescription={false}
                  />
                <section className="w-90 h-auto ml-4 border border-white border-solid px-8 py-4 rounded-3xl mr-8 mt-8">
                  <h1 className="font-bold text-3xl textNaranja">Habilidades </h1>
                  <ul className="flex flex-wrap mt-4">
                    { !userData || !userData.skills ? (
                      <p>Cargando perfil...</p>
                    ) : (
                      <>
                        {userData.skills.map((skill, _) => (
                          <li key={_} className="mx-4 text-white">
                            {skill.skillName}
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </section>
                <h1 className="font-bold text-3xl textNaranja ml-8 mt-4">
                  Perfiles Laborales del empleado
                </h1>

                <section className="w-full flex flex-col lg:flex-row">
                  {/* Sección de la izquierda donde se muestra el perfil y los comentarios */}
                  <div className="w-full lg:w-1/2 h-96 flex flex-col p-1 overflow-y-auto">
                    <div className="w-full ml-4 mt-2 pr-8 h-auto flex flex-col p-1">
                      {/* <Comentarios isLoading={loading} comenData={userData}/> */}
                      {!userData || !userData.resumes ? (
                        <p>No hay perfiles por mostrar...</p>
                      ) : (
                        <>
                          {userData.resumes.map((resume, index) => (
                            <PerfilesLaborales
                              key={index}
                              isLoading={loading}
                              laboresData={resume}
                              textColor="text-white"
                              showEdit={false}
                            />
                          ))}
                        </>
                      )}
                    </div>
                    <h1 className="font-bold text-3xl textNaranja ml-8">
                      Calificaciones
                    </h1>
                    <div className="ml-4 mt-2 pr-8 w-full h-auto flex flex-col p-1">
                      {/* <Comentarios isLoading={loading} comenData={userData}/> */}
                      {!userData || !userData.comments ? (
                        <p>Cargando comentarios...</p>
                      ) : (
                        <>
                          {userData.comments.fullComments.map((comentario, index) => (
                            <Comentarios
                              key={index}
                              isLoading={loading}
                              comenData={comentario}
                              textColor="text-white"
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Sección de la derecha, el chat */}
                  <div className="w-full lg:w-1/2 flex flex-col p-1 h-96 mt-4 lg:mt-0">
                    <Chat
                      socket={socket}
                      userId={userEnPlataforma}
                      destinatary={userId}
                      userData={userData}
                    />
                  </div>
                  </section>

                </>
                : 
                <>
                <div className="w-full flex flex-row justify-center ">

                  <section className="w-[70%] bg-white shadow-1 rounded-2xl">
                      <div className="flex flex-col h-auto w-full  rounded-2xl border p-4">
                          <tr className="text-4xl flex justify-center mt-8 font-bold">Descripción del trabajo</tr>
                          <tr className="flex justify-start text-1xl mt-8"><td><strong>Fecha </strong></td><td className="ml-auto">{dateCreate}</td></tr>
                          
                          <ul className="p-4">
                            <li>
                              <strong>Nombre del trabajo:</strong><br/>
                              {jobTittle}
                            </li>
                            <li>
                              <strong>Descripcion del trabajo:</strong><br/>
                              {jobDescription}
                            </li>
                          </ul>
                          
                      </div>
                  </section>
                </div>

                </>
                }

<section className="flex flex-col lg:flex-row justify-between items-center p-8 lg:p-16 w-full h-auto mt-4 mx-4">
  {/* Sección de cancelar */}
  <div className="flex flex-row lg:flex-col justify-between items-center mb-4 lg:mb-0">
    <h1 className="text-white text-2xl lg:text-3xl font-bold mr-4 lg:mr-0">Cancelar</h1>
    <button onClick={changeUser}>
      <img
        src="/icons/Cancelar.svg"
        alt="boton cancelar"
        className="w-10"
      />
    </button>
  </div>

  {/* Sección de PujarPrecio */}
  <div className="w-full lg:w-1/2 flex items-center justify-center mb-4 lg:mb-0">
    <PujarPrecio 
      psocket={socket} 
      userData={userData} 
      initialValue={props.priceJobOffer ? props.priceJobOffer : inicialPriceValue} 
      destinatary={parseInt(userData?.userId, 10)} 
      setOfferAccepted={setOfferAccepted} 
      setOponentAccepted={setOponentAccepted} 
      offerAccepted={offerAccepted} 
      oponentAccepted={oponentAccepted} 
      bidPrice={bidPrice} 
      setBidPrice={setBidPrice} 
    />
  </div>

  {/* Sección de aceptar */}
  <div className="flex flex-row lg:flex-col justify-between items-center">
    <h1 className="text-white text-2xl lg:text-3xl font-bold mr-4 lg:mr-0">Aceptar</h1>
    <button onClick={acceptOffer}>
      <img
        src="/icons/Aceptar.svg"
        alt="boton aceptar"
        className="w-10"
      />
    </button>
  </div>
</section>

               </div>
              </div>
            )}
        </Box>
      </Fade>
    </Modal>
  );
};
export default Negociacion;
