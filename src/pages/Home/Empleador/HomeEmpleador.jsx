import React from "react";
import { useState, useEffect } from "react";
import ToolbarDefault from "../../components/ToolbarDefaul";
import HorizontalNavContainerSwitch from "../../components/HorizontalNavContainerSwitch";
import NavbarEmpleador from "../../components/NavbarEmpleador";
import { Link } from "react-router-dom";
import NaigatorMenuElement from "./NavigatorMenuElement";
import NavigatorDisplayElement from "./NavigatorDisplayElement";
import HorizontalNavigator from "./HorizontalNavigator";
import Negociacion from "../components/Negociacion";
import Modal from "../components/Modal";
//import jwt from 'jsonwebtoken';
const HomeEmpleador = () => {
    const [jobOffertedOffers, setJobOffertedOffers] = useState([]);
    const [jobPendingOffers, setJobPendingOffers] = useState([]);
    const [jobsDone, setJobsDone] = useState([]);
    const [selectedJobData, setSelectedJobData] = useState(null);
    const [selectedJobType, setSelectedJobType] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState(0);
    const searchParams = new URLSearchParams(location.search);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [tipe, setTipe] = useState();
    // Obtener valores específicos de la UR
    let laborsUriComponent = decodeURIComponent(searchParams.get('labors') ?? '')
    let priceUriComponent = decodeURIComponent(searchParams.get('price') ?? '')
    const priceJobOffer = priceUriComponent ? atob(priceUriComponent) : null;
    const laborsOfJobOffer = laborsUriComponent ? JSON.parse(laborsUriComponent) : null;

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                } else if (sectionIndex === 2) {
                    jobType = 'Ofertado';
                }
                // Abrimos el modal con el tipo de trabajo
                setIsModalOpen(true);
                setSelectedJobType(jobType);
                setSelectedJobData(jobData);
            }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const sections = [
        {
            name: "Pendientes",
            array: jobPendingOffers
        }, {
            name: "Realizados",
            array: jobsDone
        }, {
            name: "Ofertados",
            array: jobOffertedOffers
        },
    ]
    const token = localStorage.getItem('token');

    function decodeJWT() {
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }
    }

    const fetchPendingOffers = () => {
        const token = decodeJWT()
        if (token) {
            fetch(`${baseUrl}getJobOffertedOffersByEmployer?token=${localStorage.getItem('token')}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setJobOffertedOffers(data.data);

                    // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
                });
        }
        //fetch()
    }

    const fetchPendingJobs = () => {
        const token = decodeJWT()
        if (token) {
            fetch(`${baseUrl}getJobPendingOffersByEmployer?token=${localStorage.getItem('token')}`)
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

    const fetchDoneJobs = () => {
        const token = decodeJWT()
        if (token) {
            fetch(`${baseUrl}getJobDoneByEmployer?token=${localStorage.getItem('token')}`)
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

    useEffect(() => {
        setTipe(searchParams.get('tipe'));

        fetchPendingOffers();
        fetchPendingJobs();
        fetchDoneJobs();
    }, []);

    return (
        <div className='w-screen h-screen flex flex-col overflow-y-auto'>
            {/* <ToolbarDefault tipe="employer" /> */}
            <NavbarEmpleador></NavbarEmpleador>
            <div className="flex flex-col justify-center w-full " style={{ padding: 30 + 'px' }}>
                <h2 className="text-4xl font-bold mt-4">Mis trabajos</h2>
                <HorizontalNavigator callBackFunction = {openModal} sections={sections}></HorizontalNavigator>
                <div>
                    <Link to={"/my/createjob"}><button className="mainBackground self-end w-[185px] h-10 rounded-full text-white shadow-1">Crear Trabajo
                    </button></Link>
                </div>
            </div>
            {tipe && tipe === "negotiation" ? (<Negociacion labors={laborsOfJobOffer} priceJobOffer={priceJobOffer} ></Negociacion>) : ("")}
                <Modal isOpen={isModalOpen} onClose={closeModal} jobData ={selectedJobData} jobType ={selectedJobType} />
            


        </div>
    )
}

export default HomeEmpleador;