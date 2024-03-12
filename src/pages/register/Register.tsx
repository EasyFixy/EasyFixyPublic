import React, { ChangeEvent, useEffect, useState } from 'react';
import ContenedorLogoHorizontal from '../../componentes/contenedorLogoVerde/ContenedorLogoHorizontal';
import { Navigate, useNavigate } from 'react-router-dom';
import CommonInput from './components/CommonImput';
import ReactFlagsSelect from 'react-flags-select';
import { countries } from '../../data/Countries';
import { Link } from 'react-router-dom';
import axios from 'axios';




// import axios from 'axios';
interface UserFormData {
    userName: string;
    userNationalId: string;
    userDateOfBirth : string 
    userEmail: string;
    userNationality: string;
    userPrefixNational: string;
    userPhoneNumber: string;
    userPassword: string;

}
const Register = () => {
    const [formData, setFormData] = useState<UserFormData>({
        userName: '',
        userNationalId: '',
        userDateOfBirth: '',
        userEmail:'',
        userNationality: '',
        userPrefixNational:'',
        userPhoneNumber: '',
        userPassword: ''
    });
    const [countrySelected, setCountrySelected] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [politicasChecked, setPoliticasChecked] = useState(false);
    const [terminosCondicionesChecked, setTerminosCondicionesChecked] = useState(false);
    const navigate = useNavigate();
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

    
    const verifyFields = ():boolean => {
        const currentDate = new Date();
        const birthdate = new Date(formData.userDateOfBirth);
        let ageDifference = currentDate.getFullYear() - birthdate.getFullYear();
        if (currentDate.getMonth() < birthdate.getMonth() ||
            (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())) {
            // Restar un año si el mes actual es anterior al mes de nacimiento,
            // o si es el mismo mes pero el día actual es anterior al día de nacimiento.
                ageDifference--;
        }
        if (ageDifference < 18) {
            alert('Debes ser mayor de 18 años para registrarte.');
            return false;
        }
        // Validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.userEmail)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return false;
        }
        // Validar que el campo del país no esté vacío
        if (!formData.userNationality || !formData.userPrefixNational) {
            alert('Por favor, seleccione un país.');
            return false;
        }
        // Validar la contraseña
        const passwordRegex = /^(?=.*[.,;{}´¨+*/!$%&#?¿'_-])(?=.*[a-zA-Z0-9]).{8,}$/;
        if (!passwordRegex.test(formData.userPassword)) {
            alert('La contraseña debe contener al menos 8 caracteres y al menos un carácter especial.');
            return false;
        }
        if(!politicasChecked || !terminosCondicionesChecked){
            alert('Por favor, acepte los términos y condiciones.');
            return false;
        }
        return true;
       
    }
    useEffect(()=>{
        console.log('formData ', formData)
    },[formData])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if(verifyFields()){
                const params = Object.entries(formData)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&');
                const config = {
                    method: 'get',
                    url: `http://localhost:3000/userRegistration?${params.toString()}`,
                    data: formData,
                    headers: {
                    'Content-Type': 'application/json'
                    }
                };
        
        
                axios(config)
                    .then((response) => {
                        if (response.status === 200) {
                            navigate("/selectRol");
                        }
                    })
                    .catch((error) => {
                        // Manejar el error si es necesario
                    });
            }

        } catch (err) {
        console.error(err.response.data); 
        }
    };

    return (
        <div className='w-screen h-screen flex flex-row '>
            <div className='w-1/2 flex flex-col px-16 py-10 overflow-y-scroll'> 
                <div>
                    <span className='textVerde text-2xl font-bold'>EasyFixy</span>
                </div>
                <div className='flex flex-col items-center'>

                    <h1 className='text-3xl font-bold mb-6'>Crea tu cuenta</h1>
                    <form onSubmit={onSubmit} className='flex flex-col w-[400px]'>
                        <CommonInput
                            label="Nombre Completo"
                            type="text"
                            value={formData.userName}
                            onChange={handleInputChange}
                            placeholder='nombre'
                            name='userName'
                            required
                        />
                        <CommonInput
                            label="Número de documento"
                            type="number"
                            value={formData.userNationalId}
                            onChange={handleInputChange}
                            placeholder='xxxxx'
                            name='userNationalId'
                            required
                        />
                        <CommonInput
                            label="Fecha de nacimiento"
                            type="date"
                            value={formData.userDateOfBirth}
                            onChange={handleInputChange}
                            placeholder='DD/MM/AA'
                            name='userDateOfBirth'
                            required
                        />
                        <CommonInput
                            label="Correo electronico"
                            type="text"
                            value={formData.userEmail}
                            onChange={handleInputChange}
                            placeholder='name@email.com'
                            name='userEmail'
                            required
                        />
                        <div className='w-full flex flex-row mb-6 h-10 border border-solid border-[#666666]'>
                            <ReactFlagsSelect
                                className='w-2/6 h-full border-none'
                                selected={countrySelected}
                                placeholder ="pais"
                                onSelect={(code) => {
                                    setFormData({
                                        ...formData,
                                        ['userNationality']: code,
                                        ['userPrefixNational']: countries[code].prefijo
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
                                showSecondaryOptionLabel={false}
                                countries={["CO", "AR", "PE", "BR", "CL", "VE", "EC", "UY"]}
                            />
                            <input 
                                className="border-none w-4/6 pl-4"
                                type="number"
                                value={formData.userPhoneNumber}
                                onChange={handleInputChange}
                                placeholder='ingresa telefono'
                                name='userPhoneNumber'
                                required
                                
                            />
                        </div>
                        <CommonInput
                            label="Crear Contraseña"
                            type="password"
                            value={formData.userPassword}
                            onChange={handleInputChange}
                            placeholder='*****'
                            name='userPassword'
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
                            required
                            className='mr-[5px]'
                            />
                            <p>He leído y acepto los <Link to={'/terms-conditions'} className='textVerde'> términos y condiciones de uso</Link> </p>
                        </label>
                        <label className='text-xs font-normal text-[#666666] flex items-center mb-6'>
                            <input
                            type="checkbox"
                            className='mr-[5px]'
                            checked={politicasChecked}
                            onChange={handlePoliticasChange}
                            required
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
