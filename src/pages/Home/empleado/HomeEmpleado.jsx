import React from "react";
import { useState, useEffect } from "react";
import ToolbarDefault from "../../components/ToolbarDefaul";
import NavbarEmpleado from "../../components/NavbarEmpleado";
import CajaGanancias from "./CajaGanancias";
import MisTrabajos from "./MisTrabajos";
import Negociacion from "../components/Negociacion";
import { useAppSelector } from "../../../app/hooks";
import { toast } from 'react-toastify';
import Footer from "../../components/Footer.tsx";
import HorizontalNavigator from "../Empleador/HorizontalNavigator";
import { decodeJWT } from "../../../Helpers/Token";
import Modal from "../components/Modal";

const HomeEmpleado = () => {
    const [tipe, setTipe] = useState();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = useAppSelector((state) => state.Auth.token);
    const [checked, setChecked] = useState(false);
    const [profit, setProfit] = useState();
    const [jobPendingOffers, setJobPendingOffers] = useState([]);
    const [selectedJobData, setSelectedJobData] = useState(null);
    const [selectedJobType, setSelectedJobType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobsDone, setJobsDone] = useState([]);
    const sections = [
        {
            name: "Pendientes",
            array: jobPendingOffers
        }, {
            name: "Realizados",
            array: jobsDone
        },
    ]
    //const searchParams = new URLSearchParams(location.search);
    const userEnPlataforma = useAppSelector((state) => state.Auth.id);
    const [openNegociation, setOpenNegociation] = useState(tipe && tipe === "waitingBid");

    const fetchDoneJobs = () => {
        const token = decodeJWT()
        if (token) {
            fetch(`${baseUrl}getJobsDoneByWorker?token=${localStorage.getItem('token')}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setJobsDone(data.data);

                    // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
                })
                .catch(error => {
                    // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
                });
        } else {
        }
        //fetch()
    }
    const fetchUserProfit = () => {
        const token = decodeJWT()
        if (token) {
            fetch(`${baseUrl}getUserProfit?token=${localStorage.getItem('token')}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setProfit(data.data[0].totalProfit)

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
    const fetchPendingJobs = () => {
        const token = decodeJWT()
        if (token) {
            fetch(`${baseUrl}getJobsPendingOfWorker?token=${localStorage.getItem('token')}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setJobPendingOffers(data.data);

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
    useEffect(() => {
        fetchUserProfit();
        fetchPendingJobs();
        fetchDoneJobs();
    }, []);
    const openModal = (jobId, jobData) => {
        // Buscamos el trabajo en las secciones
        const sectionIndex = sections.findIndex(section => section.array.some(job => job.jobOfferId === jobId));
        let jobType ='';
        if (sectionIndex !== -1) {
            // Determinamos el tipo de trabajo según la posición en el array
            if (sectionIndex === 0) {
                jobType = 'Pendiente';
            } else if (sectionIndex === 1) {
                jobType = 'Realizado';
            }
            // Abrimos el modal con el tipo de trabajo
            setIsModalOpen(true);
            setSelectedJobType(jobType);
            setSelectedJobData(jobData);
        }
};
    const updateUserTempData = (status, coords) => {
        let urlUpdateTempsData;
        if (status) {
            urlUpdateTempsData = `${baseUrl}updateUserTempData?token=${token}&userTempDataActive=1&userTempDataLatitude=${coords.latitude}&userTempDataLongitude=${coords.longitude}`
        } else {
            urlUpdateTempsData = `${baseUrl}updateUserTempData?token=${token}&userTempDataActive=0`
        }
        fetch(urlUpdateTempsData)
            .then((response) => response.text())
            .then((data) => {
                const json = JSON.parse(data);
                if (json.statusCode === 200) {
                    setChecked(status);
                    if (status === true) {
                        setTipe('waitingBid')
                        setOpenNegociation(true);
                    }
                } else {
                    toast.warn("Error cambiando estado");
                }

            })
            .catch((error) => {
                console.error("Error fetching user status:", error);
                toast.warn("Error cambiando estado");
            })
    }

    const handleUnload = (event) => {
        console.log('La página se está cerrando...');
        updateUserTempData(false)
    };
    const setCloseNegociation = () => {
        setOpenNegociation(false);
        updateUserTempData(false);
    }

    useEffect(() => {
        //setTipe(searchParams.get('tipe'));
        window.addEventListener('beforeunload', handleUnload);
    }, []);
    return (
       <div className="w-screen h-screen flex flex-col overflow-y-auto pb-16">

            {/* <ToolbarDefault tipe="employee"/> */}
            <NavbarEmpleado checked={checked} setChecked={setChecked} setTipe={setTipe} updateUserTempData={updateUserTempData} />
                {/* <div className="w-3/4 h-auto ml-12 mr-4"><MisTrabajos /></div> */}
            <div className="flex flex-col justify-center w-full " style={{ padding: 30 + 'px' }}>
                <h2 className="text-4xl font-bold mt-4">Mis trabajos</h2>
                <div className="w-full flex flex-row ">

                    <HorizontalNavigator callBackFunction = {openModal} sections={sections}></HorizontalNavigator>
                    <div className=" w-[30%] h-40 ml-8"><CajaGanancias profit={profit}/></div>
                </div>
            </div>
            {
                openNegociation && 
                <Negociacion 
                    isOpen={openNegociation}
                    setIsOpen = {setCloseNegociation}
                    updateUserTempData={updateUserTempData} 
                    tipe={"employee"} 
                    setPageStatusTipe={setTipe}
                />
            }
            {isModalOpen && 
                <Modal isOpen={isModalOpen} infoEmployee={false} onClose={()=> {setIsModalOpen(false);}} jobData ={selectedJobData} jobType ={selectedJobType} />
            }
            <div className="mt-auto w-full">
                <Footer />
            </div>

        </div>
    );
}

export default HomeEmpleado;