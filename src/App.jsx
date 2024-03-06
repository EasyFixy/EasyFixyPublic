import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Register from './pages/register/Register';
import TermsConditions from './pages/PoliticasYCondiciones/TermsConditions';
import PoliciesPrivacy from './pages/PoliticasYCondiciones/PoliciesPrivacy';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path="/terms-conditions" element ={<TermsConditions/>}/>
        <Route path="/policies-privacity" element ={<PoliciesPrivacy/>}/>
        {/* Otras rutas */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
