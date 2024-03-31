import React from "react"
import { Route, Routes} from 'react-router-dom';

import DatosPerfilEmpleado from '../pages/DatosPerfilEmpleado/DatosPerfilEmpleado';
import VerPerfilEmpleado from '../pages/VisualizarEmpleado/VisualizarPerfil';
import SeleccionRol from '../pages/SelecionarRol/SeleccionRol';
import CreateJob from '../pages/Jobs/CreateJob';
import HomeEmpleado from "../pages/Home Empleado/HomeEmpleado";
import HomeEmpleador from "../pages/Home Empleador/HomeEmpleador";
import CategoriesLabors from "../pages/Labors/CategoriesLabors";
import Skills from "../pages/Skills/Skills";

const UserLogueado = () =>{
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