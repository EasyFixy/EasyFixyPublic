import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Register from './pages/register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        {/* Otras rutas */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
