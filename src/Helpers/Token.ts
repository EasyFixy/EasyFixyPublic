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

export const removeToken = (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
};

export function validationToken(dispatch) {
    const infoToken = decodeJWT();

    //arreglar la fecha que se trae del backend para validar con la fecha actual
    if (infoToken) {
        const now = new Date();
        if (now < new Date(infoToken.exp * 1000)) {
            return true;
        } else {
            
            removeToken(dispatch);
            return false
        }
    }
    return false

}


