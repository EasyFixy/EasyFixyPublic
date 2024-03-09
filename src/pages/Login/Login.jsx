import { useState } from "react";
import ContenedorLogoHorizontal from '../../componentes/contenedorLogoVerde/ContenedorLogoHorizontal';
import { Link } from "react-router-dom";
const Login = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);

    const handdleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        const url = `http://localhost:3000/userLogin?email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json(); // Si esperas una respuesta JSON
            })
            .then(result => {
                // Aquí puedes trabajar con los datos obtenidos en la respuesta            
                if (result.token) {
                    console.log(result.token);
                    localStorage.setItem('token', result.token)
                    setLoginSuccessful(true);
                } else {
                    setLoginSuccessful(false);
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });

    }

    return (
        <div className="w-screen h-screen flex flex-row ">

             <ContenedorLogoHorizontal/>

            <div className='w-1/2 flex flex-col justify-center items-center px-16 py-10'> 
                
                <div className='flex flex-col items-center'>
                <   h1 className='text-4xl font-bold mb-6'>Iniciar sesión</h1>
                </div>

                <form>
                    <div className="w-[400px] flex flex-col mb-6">
                        <label className="font-boldv">Correo electrónico</label>
                        <input
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setUsername(event.target.value) }}
                            placeholder="Type here"
                            type="text" />
                    </div>
                    <div className="w-[400px] flex flex-col mb-6">
                        <label className="custom-label">Password:</label>
                        <input 
                            className="w-full h-12 border border-solid border-[#666666] text-[#666666] pl-4 relative rounded-3xl" 
                            onChange={(event) => { setPassword(event.target.value) }}
                            placeholder="password"
                            type="password" />
                    </div>
                    
                    <div className="flex flex-row flex justify-center items-center">
                        <input name="cbipeliculas" type="checkbox" />
                        <h1>Remember me</h1>
                        <Link to={'/recuperarPassword'} className="textVerde ml-4">¿Olvidaste la contraseña?</Link>
                    </div>

                    <button className="w-full mt-10 backgroundVerde h-14 text-white w-64 opacity-80 rounded-full border border-black border-solid mb-6" onClick={handdleLogin}>Iniciar sesión →</button>
                    <div className="flex flex-row flex justify-center items-center ">
                        <h1>No tengo una cuenta!</h1>
                        <Link to={'/register'} className="textVerde ml-4">Sign Up</Link>
                    </div>
                </form>
                <div className="mt-5"> {loginSuccessful ? "Te logueaste" : "no logueado"}</div>
            </div>

        </div>
    );
}

export default Login;