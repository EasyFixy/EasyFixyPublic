import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';
import TermsConditions from './pages/PoliticasYCondiciones/TermsConditions';
import PoliciesPrivacy from './pages/PoliticasYCondiciones/PoliciesPrivacy';
import NewPassword from './pages/Password/NewPassword';
import RecuperarPassword from './pages/Password/RecuperarPassword';
import UserLogueado from './Rutas/UserLogueado';
import LandingPage from './pages/landingPage/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<LandingPage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path="/terms-conditions" element ={<TermsConditions/>}/>
          <Route path="/policies-privacity" element ={<PoliciesPrivacy/>}/>
          <Route path="/newPassword" element ={<NewPassword/>}/>
          <Route path="/recuperarPassword" element ={<RecuperarPassword/>}/>

          <Route path='my/*' element={<UserLogueado/>} />
          

          {/* Otras rutas */}
        </Routes>
      </BrowserRouter>
      <ToastContainer 
        position="top-right" 
        autoClose={4000}
        closeOnClick
      />
    </>
  );
};

export default App;