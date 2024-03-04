import './Login.css';
import { useState } from "react";
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
        <>{<div className="custom-form">
            <form>
                <label className="custom-label">Username:</label>
                <input onChange={(event) => { setUsername(event.target.value) }}
                    placeholder="username"
                    className="custom-input"
                    type="text" />
                <label className="custom-label">Password:</label>
                <input onChange={(event) => { setPassword(event.target.value) }}
                    placeholder="password"
                    className="custom-input"
                    type="password" />
                <button className="custom-button" onClick={handdleLogin}>Login</button>
            </form>
            <div> {loginSuccessful ? "Te logueaste" : "no logueado"}</div>
        </div>}</>
    );
}

export default Login;