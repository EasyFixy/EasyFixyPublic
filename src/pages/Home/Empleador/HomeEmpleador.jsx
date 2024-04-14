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
//import jwt from 'jsonwebtoken';
const HomeEmpleador = () => {
    const [jobOffertedOffers, setJobOffertedOffers] = useState([]);
    const [jobPendingOffers, setJobPendingOffers] = useState([]);
    const [jobsDone, setJobsDone] = useState([]);
    const [seccionActiva, setSeccionActiva] = useState(0);
    const searchParams = new URLSearchParams(location.search);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [tipe, setTipe] = useState();
    // Obtener valores específicos de la UR
    let laborsUriComponent = decodeURIComponent(searchParams.get('labors') ?? '')
    const laborsOfJobOffer = laborsUriComponent? JSON.parse(laborsUriComponent): null;
    
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
        console.log(token)
        if (token) {
            fetch(`${baseUrl}getJobOffertedOffersByEmployer?token=${localStorage.getItem('token')}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setJobOffertedOffers(data.data);
                    console.log(jobOffertedOffers)

                    // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
                });
        } else {
            console.log("no logueado")
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
                    console.log(data);
                    setJobPendingOffers(data.data);

                    // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
                });
        } else {
            console.log("no logueado")
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
                    console.log(data);
                    setJobsDone(data.data);

                    // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
                });
        } else {
            console.log("no logueado")
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
        <div className='w-screen h-screen flex flex-col overflow-y-scroll'>
            <ToolbarDefault tipe="employer" />
            <NavbarEmpleador></NavbarEmpleador>
            <div className="flex flex-col justify-center w-full " style={{padding: 30 + 'px'}}>
                <h2 className="text-4xl font-bold mt-4">Mis trabajos</h2>
                <HorizontalNavigator sections={sections}></HorizontalNavigator>
                <div>
                    <Link to={"/my/createjob"}><button className="mainBackground self-end w-[185px] h-10 rounded-full text-white shadow-1">Crear Trabajo
                    </button></Link>
                </div>
            </div>
            {tipe && tipe==="negotiation"?(<Negociacion labors={laborsOfJobOffer}></Negociacion>):("")}
        </div>
    )
}

export default HomeEmpleador;