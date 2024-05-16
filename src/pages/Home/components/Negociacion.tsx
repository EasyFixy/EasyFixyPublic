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
import { log } from "console";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

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
          socket.emit('notifyEmployee', { destinatary: data.data[0].userId });
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
        setLoading(false);
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
        setLoading(false);
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
    if (bestWorkers != null) {

      switch (props.tipe) {
        case 'employer':
          if (socket) {
            socket.emit('notifyOponentWayOut', { destinataryId: bestWorkers[0].userId });
            bestWorkers.push(bestWorkers[0])
            bestWorkers.shift();
            setUserId(bestWorkers[0].userId);
            getInfoPerfil(bestWorkers[0].userId);
            socket.emit('notifyEmployee', { destinatary: bestWorkers[0].userId });
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
    props.updateUserTempData(false)
  }

  const closeNegotiationPage = () => {
    console.log("cerrando")
    toast.success("Ya se está gestionando el pago, sigue pendiente al estado del trabajo");
    props.setPageStatusTipe("")
  }

  const acceptOffer = () => {

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

  return (
    <div className="absolute w-screen h-screen z-10 flex items-center justify-center top-0 left-0 m-auto bg-black bg-opacity-75 overflow-auto">

      <div className="w-4/5 h-full">


        <div className="w-full h-auto bg-[#292929] ">
          {userId === 0 ? (
            "cargando... "
          ) : (
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
              <section className="w-90 h-auto ml-4 border border-white border-solid px-8 py-4 rounded-3xl mr-8">
                <h1 className="font-bold text-3xl textNaranja">Habilidades </h1>
                <ul className="flex flex-wrap mt-4">
                  {loading || !userData || !userData.skills ? (
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

              <section className="w-full flex flex-row">
                {/* Sección de la izquierda donde se muestra el perfil y los comentarios */}
                <div className="w-1/2 h-96 flex flex-col p-1 overflow-y-auto">
                  <div className="w-full ml-4 mt-2 pr-8 h-auto flex flex-col p-1">
                    {/* <Comentarios isLoading={loading} comenData={userData}/> */}
                    {loading || !userData || !userData.resumes ? (
                      <p>No hay perfiles por mostrar...</p>
                    ) : (
                      <>
                        {userData.resumes.map((resume, _) => (
                          <PerfilesLaborales
                            key={_}
                            isLoading={loading}
                            laboresData={resume}
                            textColor="text-white"
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
                    {loading || !userData || !userData.comments ? (
                      <p>Cargando comentarios...</p>
                    ) : (
                      <>
                        {userData.comments.fullComments.map((comentario, _) => (
                          <Comentarios
                            key={_}
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
                <div className="ml-4 mt-2 pr-8 w-1/2 flex flex-col p-1 h-96">
                  chat
                  <Chat
                    socket={socket}
                    userId={userEnPlataforma}
                    destinatary={userId}
                    userData={userData}
                  ></Chat>
                </div>
              </section>

              <section className="flex justify-between items-center p-16 w-90 h-auto mt-4 ml-4 px-8 py-4  mr-8">
                <div className="flex flex-col justify-between items-center">
                  <h1 className="text-white text-3xl font-bold">Cancelar</h1>
                  <button onClick={changeUser}>
                    <img
                      src="/icons/Cancelar.svg"
                      alt="boton cancelar"
                      className="w-10"
                    />
                  </button>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <PujarPrecio psocket={socket} userData={userData} initialValue={props.priceJobOffer} destinatary={parseInt(userData?.userId, 10)} setOfferAccepted={setOfferAccepted} setOponentAccepted={setOponentAccepted} offerAccepted={offerAccepted} oponentAccepted={oponentAccepted} bidPrice={bidPrice} setBidPrice={setBidPrice} />
                </div>
                <div className="flex flex-col justify-between items-center">
                  <h1 className="text-white text-3xl font-bold">Aceptar</h1>
                  <button onClick={acceptOffer}>
                    <img
                      src="/icons/Aceptar.svg"
                      alt="boton cancelar"
                      className="w-10"
                    />
                  </button>
                </div>
              </section>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
export default Negociacion;
