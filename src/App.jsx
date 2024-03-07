import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';
import TermsConditions from './pages/PoliticasYCondiciones/TermsConditions';
import PoliciesPrivacy from './pages/PoliticasYCondiciones/PoliciesPrivacy';
import NewPassword from './pages/Password/NewPassword';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/terms-conditions" element ={<TermsConditions/>}/>
        <Route path="/policies-privacity" element ={<PoliciesPrivacy/>}/>
        <Route path="/newPassword" element ={<NewPassword/>}/>
        {/* Otras rutas */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
