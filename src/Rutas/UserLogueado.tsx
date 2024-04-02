import React, { useEffect, useState } from "react"
import { Route, Routes} from 'react-router-dom';
import DatosPerfilEmpleado from '../pages/DatosPerfilEmpleado/DatosPerfilEmpleado';
import VerPerfilEmpleado from '../pages/VisualizarEmpleado/VisualizarPerfil';
import SeleccionRol from '../pages/SelecionarRol/SeleccionRol';
import CreateJob from '../pages/Jobs/CreateJob';
import HomeEmpleado from "../pages/Home/empleado/HomeEmpleado";
import HomeEmpleador from "../pages/Home/Empleador/HomeEmpleador";
import CategoriesLabors from "../pages/Labors/CategoriesLabors";
import { validationToken } from "../Helpers/Token";
import Skills from "../pages/Skills/Skills";
import { useAppDispatch, useAppSelector } from "../app/hooks";
const UserLogueado = () => {
    const dispatch = useAppDispatch();
    const [isLogged, setIsLogged] = useState<boolean>(false);
    useEffect(() => {
        const isLogged = validationToken(dispatch);
        setIsLogged(isLogged)
    }, []);
    return(
        <Routes>
            <Route path='profile/employee/create/personalinformation' element={<DatosPerfilEmpleado/>}/>
            <Route path='profile/employee' element={<VerPerfilEmpleado/>}/>
            <Route path='selectrole' element={<SeleccionRol/>}/>
            <Route path='home/employee' element={<HomeEmpleado/>}/>
            <Route path='home/employer' element={<HomeEmpleador/>}/>
            <Route path='createjob' element={<CreateJob/>}/>
            <Route path="categories" element= {<CategoriesLabors/>}/>
            <Route path='profile/employee/create/skills' element={<Skills/>}/>
        </Routes>
    )
}

export default UserLogueado;