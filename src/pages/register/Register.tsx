import React, { ChangeEvent, useEffect, useState } from 'react';
import ContenedorLogoHorizontal from '../../componentes/contenedorLogoVerde/ContenedorLogoHorizontal';
import CommonInput from './components/CommonImput';
import ReactFlagsSelect from 'react-flags-select';
import { countries } from '../../data/Countries';
import { Link } from 'react-router-dom';




// import axios from 'axios';
interface UserFormData {
    name: string;
    documentNumber: number | undefined;
    dateOfBirth : string 
    email: string;
    country: string;
    prefixCountry: string;
    phoneNumber: number | undefined;
    password: string;

}
const Register = () => {
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        documentNumber: undefined,
        dateOfBirth: '',
        email:'',
        country: '',
        prefixCountry:'',
        phoneNumber: undefined,
        password: ''
    });
    const [countrySelected, setCountrySelected] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [politicasChecked, setPoliticasChecked] = useState(false);
    const [terminosCondicionesChecked, setTerminosCondicionesChecked] = useState(false);

    const handlePoliticasChange = () => {
        setPoliticasChecked(!politicasChecked);
    };

    const handleTerminosCondicionesChange = () => {
        setTerminosCondicionesChecked(!terminosCondicionesChecked);
    };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('change ',e.target.value )
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };
  
    useEffect(()=>{
        console.log('formData ', formData)
    },[formData])

//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const newUser = {
//         username,
//         email,
//         password
//       };

//       const config = {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       };

//       const body = JSON.stringify(newUser);

//       const res = await axios.post('/api/register', body, config);

//       console.log(res.data); // Handle success response
//     } catch (err) {
//       console.error(err.response.data); // Handle error response
//     }
// };

    return (
        <div className='w-screen h-screen flex flex-row '>
            <div className='w-1/2 flex flex-col px-16 py-10 overflow-y-scroll'> 
                <div>
                    <span className='textVerde text-2xl font-bold'>EasyFixy</span>
                </div>
                <div className='flex flex-col items-center'>

                    <h1 className='text-3xl font-bold mb-6'>Crea tu cuenta</h1>
                    <form className='flex flex-col w-[400px]'>
                        <CommonInput
                            label="Nombre Completo"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder='nombre'
                            name='name'
                            required
                        />
                        <CommonInput
                            label="Número de documento"
                            type="number"
                            value={formData.documentNumber}
                            onChange={handleInputChange}
                            placeholder='xxxxx'
                            name='documentNumber'
                            required
                        />
                        <CommonInput
                            label="Fecha de nacimiento"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            placeholder='DD/MM/AA'
                            name='dateOfBirth'
                            required
                        />
                        <CommonInput
                            label="Correo electronico"
                            type="text"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='name@email.com'
                            name='email'
                            required
                        />
                        <div className='w-full flex flex-row mb-6 h-10 border border-solid border-[#666666]'>
                            <ReactFlagsSelect
                                className='w-2/5 h-full border-none'
                                selected={countrySelected}
                                placeholder ="selecciona pais"
                                onSelect={(code) => {
                                    setFormData({
                                        ...formData,
                                        ['country']: countries[code].name,
                                        ['prefixCountry']: countries[code].prefijo
                                    });
                                    setCountrySelected(code);
                                }
                            }
                                customLabels={{
                                    "CO": { primary: "Colombia", secondary: "+57" },
                                    "AR": { primary: "Argentina", secondary: "+54" },
                                    "PE": { primary: "peru",  secondary: "+51" },
                                    "BR": { primary: "Brazil",  secondary: "+55" },
                                    "CL": { primary: "Chile",  secondary: "+56" },
                                    "VE": { primary: "Venezuela",  secondary: "+58" },
                                    "EC": { primary: "Ecuador",  secondary: "+593" },
                                    "UY": { primary: "Uruguay",  secondary: "+598" },
                                }}
                                showSecondarySelectedLabel={true}
                                showSelectedLabel ={false}
                                showOptionLabel ={true}
                                showSecondaryOptionLabel={true}
                                countries={["CO", "AR", "PE", "BR", "CL", "VE", "EC", "UY"]}
                            />
                            <input 
                                className="border-none w-3/5 pl-4"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder='ingresa telefono'
                                name='phoneNumber'
                                required
                                
                            />
                        </div>
                        <CommonInput
                            label="Crear Contraseña"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='*****'
                            name='password'
                            required
                            isPassword
                            showPassword ={showPassword}
                            margin ={false}
                        />
                        <p className='text-[#666666] text-xs mb-6'> 
                            Password must contain a minimum of 8 characters <br />
                            Password must contain at least one symbol e.g. @, !
                        </p>
                        <label className='text-xs font-normal text-[#666666] flex items-center'>
                            <input
                            type="checkbox"
                            checked={terminosCondicionesChecked}
                            onChange={handleTerminosCondicionesChange}
                            />
                            <p>He leído y acepto los <Link to={'/terms-conditions'} className='textVerde'> términos y condiciones de uso</Link> </p>
                        </label>
                        <label className='text-xs font-normal text-[#666666] flex items-center mb-6'>
                            <input
                            type="checkbox"
                            checked={politicasChecked}
                            onChange={handlePoliticasChange}
                            />
                            <p> He leído y acepto la <Link to={'/policies-privacity'} className='textVerde'> politica de privacidad </Link></p>
                        </label>
                        
                        <button type='submit'className='backgroundVerde h-10 text-white w-full rounded-full border border-black border-solid mb-6'>Registrarte</button>
                        
                    </form>
                    <div className='flex flex-row gap-1'>
                        <p className='font-bold text-[#666666]'>Tengo una cuenta! </p>
                        <Link to={'/login'} className='underline text-[#24445B]'> Iniciar sesión</Link>

                    </div>
                </div>

            </div>
            
            <ContenedorLogoHorizontal/>
            
        </div>  
    );
};

export default Register;
