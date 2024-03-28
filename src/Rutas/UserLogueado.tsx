import React from "react"
import { Route, Routes} from 'react-router-dom';

import DatosPerfilEmpleado from '../pages/DatosPerfilEmpleado/DatosPerfilEmpleado';
import VerPerfilEmpleado from '../pages/VisualizarEmpleado/VisualizarPerfil';
import SeleccionRol from '../pages/SelecionarRol/SeleccionRol';

const UserLogueado = () =>{
    return(
        <Routes>
            <Route path='profile/employee/create/personalinformation' element={<DatosPerfilEmpleado/>}/>
            <Route path='profile/employee' element={<VerPerfilEmpleado/>}/>
            <Route path='selectrole' element={<SeleccionRol/>}/>
        </Routes>
    )
}

export default UserLogueado;