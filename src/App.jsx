import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';
import TermsConditions from './pages/PoliticasYCondiciones/TermsConditions';
import PoliciesPrivacy from './pages/PoliticasYCondiciones/PoliciesPrivacy';
import NewPassword from './pages/Password/NewPassword';
import RecuperarPassword from './pages/Password/RecuperarPassword';
import VisualizarPerfilEmpleado from './pages/DatosPerfilEmpleado/DatosPerfilEmpleado';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/terms-conditions" element ={<TermsConditions/>}/>
        <Route path="/policies-privacity" element ={<PoliciesPrivacy/>}/>
        <Route path="/newPassword" element ={<NewPassword/>}/>
        <Route path="/recuperarPassword" element ={<RecuperarPassword/>}/>
        <Route path='/datosPerfilEmpleado' element={<VisualizarPerfilEmpleado/>}/>
        {/* Otras rutas */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
