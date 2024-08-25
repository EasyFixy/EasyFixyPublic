import { useState } from "react";
import ContenedorLogoHorizontal from '../../componentes/contenedorLogoVerde/ContenedorLogoHorizontal';
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../features/Auth/Auth";
import React from "react";
import { decodeJWT } from "../../Helpers/Token";
import { handleRequestWithToken } from "../../Helpers/Request";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const token = useAppSelector(state => state.Auth.isLogged);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handdleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };

        const url = `${baseUrl}userLogin?userEmail=${encodeURIComponent(username)}&userPassword=${encodeURIComponent(password)}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json(); // Si esperas una respuesta JSON
            })
            .then(result => {

                console.log(result)
                if (result) {
                    if (result.statusCode === 200) {
                        if (result.token) {
                            localStorage.setItem('token', result.token)
                            setLoginSuccessful(true);

                            const tokenDecode = decodeJWT();
                            toast.success("Exitoso");
                            dispatch(login({ token: result.token.toString(), id: tokenDecode.userId, date: tokenDecode.exp }))

                            navigate("/my/selectrole");
                            console.log("llega")
                        } else {
                            setLoginSuccessful(false);
                        }
                    } else if (result.statusCode === 400 && result.message === "wrong user/password") {
                        toast.warn("Contraseña/Usuario incorrectos");
                    }

                }
                // Aquí puedes trabajar con los datos obtenidos en la respuesta            

            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });

    }

    return (
        <div className="w-screen h-screen flex flex-col lg:flex-row">
            <ContenedorLogoHorizontal />

            <div className='flex-1 flex flex-col justify-center items-center px-1'>

                <div className='flex flex-col items-center'>
                    <   h1 className='text-4xl font-bold mb-6'>Iniciar sesión</h1>
                </div>

                <form className="w-11/12  flex flex-col justify-center items-center">
                    <div className="sm:w-[400px] w-full flex flex-col mb-6">
                        <label className="font-boldv">Correo electrónico</label>
                        <input
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl"
                            onChange={(event) => { setUsername(event.target.value) }}
                            placeholder="Type here"
                            type="text" />
                    </div>
                    <div className="sm:w-[400px] w-full flex flex-col mb-6">
                        <label className="custom-label">Password:</label>
                        <input
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl"
                            onChange={(event) => { setPassword(event.target.value) }}
                            placeholder="password"
                            type="password" />
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <input name="cbipeliculas" type="checkbox" />
                        <h1>Remember me</h1>
                        <Link to={'/recuperarPassword'} className="textNaranja ml-4">¿Olvidaste la contraseña?</Link>
                    </div>

                    <button className=" sm:w-[400px] w-full mt-10 mainBackground h-14 text-white rounded-full border border-black border-solid mb-6" onClick={handdleLogin}>Iniciar sesión →</button>
                    <div className="flex flex-row justify-center items-center ">
                        <h1>No tengo una cuenta!</h1>
                        <Link to={'/register'} className="textNaranja ml-4">Sign Up</Link>
                    </div>
                </form>
                <div className="mt-5"> </div>
            </div>

        </div>
    );
}

export default Login;