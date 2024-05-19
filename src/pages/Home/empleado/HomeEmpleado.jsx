import React from "react";
import { useState, useEffect } from "react";
import ToolbarDefault from "../../components/ToolbarDefaul";
import NavbarEmpleado from "../../components/NavbarEmpleado";
import CajaGanancias from "./CajaGanancias";
import MisTrabajos from "./MisTrabajos";
import Negociacion from "../components/Negociacion";
import { useAppSelector } from "../../../app/hooks";
import { toast } from 'react-toastify';

const HomeEmpleado = () => {
    const [tipe, setTipe] = useState();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = useAppSelector((state) => state.Auth.token);
    const [checked, setChecked] = useState(false);
    //const searchParams = new URLSearchParams(location.search);
    const userEnPlataforma = useAppSelector((state) => state.Auth.id);
    const [openNegociation, setOpenNegociation] = useState(tipe && tipe === "waitingBid");

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
        <div className="w-screen h-screen flex flex-col">

            {/* <ToolbarDefault tipe="employee"/> */}
            <NavbarEmpleado checked={checked} setChecked={setChecked} setTipe={setTipe} updateUserTempData={updateUserTempData} />

            <div className="w-screen flex mt-8">
                <div className="w-3/4 h-auto ml-12 mr-4"><MisTrabajos /></div>
                <div className="w-1/4 h-40 mr-8"><CajaGanancias /></div>
            </div>
            <Negociacion 
                isOpen={openNegociation}
                setIsOpen = {setCloseNegociation}
                updateUserTempData={updateUserTempData} 
                tipe={"employee"} 
                setPageStatusTipe={setTipe}
            >
            </Negociacion>
        </div>
    )
}

export default HomeEmpleado;