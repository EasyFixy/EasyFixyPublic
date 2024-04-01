import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/Auth/Auth";


export function decodeJWT() {
    const token = localStorage.getItem('token');
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    }
}

export const removeToken = () => {
    const dispatch = useAppDispatch();
    localStorage.removeItem('token');
    dispatch(logout());
};

export function validationToken() {
    const infoToken = decodeJWT();
    const now = new Date();
    // arreglar la fecha que se trae del backend para validar con la fecha actual

    // if (now < new Date(infoToken.exp)) {
    //     return true;
    // } else {;
    //     removeToken();
    //     return false
    // }
    return true;
}


