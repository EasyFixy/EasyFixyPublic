import React, { ChangeEvent, useEffect, useState } from 'react';
import ContenedorLogoHorizontal from '../../componentes/contenedorLogoVerde/ContenedorLogoHorizontal';
import CommonInput from './components/CommonImput';




// import axios from 'axios';
interface UserFormData {
    name: string;
    documentNumber: number | undefined;
    dateOfBirth : string 
    email: string;
    password: string;
}
const Register = () => {
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        documentNumber: undefined,
        dateOfBirth: '',
        email:'',
        password: ''
    });

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
        <div className='w-screen h-screen flex flex-row'>
            <div className='w-1/2 flex flex-col px-16 py-10 '> 
                <div>
                    <span className='textVerde text-2xl font-bold'>EasyFixy</span>
                </div>
                <div className='flex flex-col items-center'>

                    <h1 className='text-3xl font-bold'>Crea tu cuenta</h1>
                    <button className='backgroundVerde h-14 text-white w-64 opacity-80 rounded-full border border-black border-solid'>Sign In with Google Account</button>
                    <form >
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
                            placeholder='yourname@email.com'
                            name='email'
                            required
                        />
                        <button type='submit'>Register</button>
                    </form>
                </div>

            </div>
            
            <ContenedorLogoHorizontal/>
            
        </div>  
    );
};

export default Register;
