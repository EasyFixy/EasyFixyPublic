import React from "react";
import { useState, useEffect } from "react";
import ToolbarDefault from "../components/ToolbarDefaul";
import HorizontalNavContainerSwitch from "../components/HorizontalNavContainerSwitch";
//import jwt from 'jsonwebtoken';
const HomeEmpleador = () => {
    const [jobOffertedOffers, setJobOffertedOffers] = useState([]);
    const [jobPendingOffers, setJobPendingOffers] = useState([]);
    const [jobsDone, setJobsDone] = useState([]);
    const [seccionActiva, setSeccionActiva] = useState(0);
    const [horizontalRender, setHorizontalRender] = useState([
        {
            name: "Pendientes",
            content: (
                <div className="">
                    
                </div>
            )
        }, {
            name: "Realizados",
            content: (
                <div className="">
                    
                </div>
            )
        }, {
            name: "Ofertados",
            content: (
                <div className="">
                    
                </div>

            )
        }
    ]);

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
            fetch("http://localhost:3000/getJobOffertedOffersByEmployer?token=" + localStorage.getItem('token'))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("cambiando");
                    setJobOffertedOffers(data.data);
                    console.log(data.data[0].jobOfferDateAtCreate)
                    setHorizontalRender(prevRender => {
                        const newRender = [...prevRender];
                        newRender[2] = {
                            ...newRender[2],
                            content: (  
                                <div className="">
                                    {jobOffertedOffers.map((offer, index) => (
                                        <div className="mx-auto bg-white rounded-xl shadow-md" key={index} >
                                            <div className="border-t border-b border-gray-200 py-4 px-6 flex justify-between">
                                                <div>{offer.jobOfferDescription}</div>
                                                <div>{offer.jobOfferDateAtCreate}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        };
                        return newRender;
                    });
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
            fetch("http://localhost:3000/getJobPendingOffersByEmployer?token=" + localStorage.getItem('token'))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("cambiando");
                    setJobPendingOffers(data.data);
                    console.log(data.data[0].jobOfferDateAtCreate)
                    setHorizontalRender(prevRender => {
                        const newRender = [...prevRender];
                        newRender[0] = {
                            ...newRender[0],
                            content: (
                                <div className="">
                                    {jobPendingOffers.map((offer, index) => (
                                        <div className="mx-auto bg-white rounded-xl shadow-md" key={index} >
                                            <div className="border-t border-b border-gray-200 py-4 px-6 flex justify-between">
                                                <div>{offer.jobOfferDescription}</div>
                                                <div>{offer.jobOfferDateAtCreate}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        };
                        return newRender;
                    });
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
            fetch("http://localhost:3000/getJobDoneByEmployer?token=" + localStorage.getItem('token'))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("cambiando");
                    setJobsDone(data.data);
                    setHorizontalRender(prevRender => {
                        const newRender = [...prevRender];
                        newRender[1] = {
                            ...newRender[1],
                            content: (
                                <div className="">
                                    {jobsDone.map((offer, index) => (
                                        <div className="mx-auto bg-white rounded-xl shadow-md" key={index} >
                                            <div className="border-t border-b border-gray-200 py-4 px-6 flex justify-between">
                                                <div>{offer.jobOfferDescription}</div>
                                                <div>{offer.jobOfferDateAtCreate}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        };
                        return newRender;
                    });
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
        fetchPendingOffers();
        fetchPendingJobs();
        fetchDoneJobs();
    }, []);

    let horizontalExtra = (
        <div className="">
            un extra
        </div>
    )

    return (
        <div className='w-screen h-screen flex flex-col'>
            <ToolbarDefault tipe="employer" />
            <h1>HOLLA ESTOY EN EL HOME DEl EMPLEADOR</h1>

            <div className="flex flex-col justify-center items-center w-full">
                <h2>Mis trabajos</h2>
                <div className="" style={{ width: '70%' }}>
                    <HorizontalNavContainerSwitch content={horizontalRender}></HorizontalNavContainerSwitch>
                </div>


            </div>

        </div>
    )
}

export default HomeEmpleador;