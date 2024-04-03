import { removeToken, validationToken } from "./Token";

export function handleRequestWithToken(dispatch, callBack: () => void ) {
    const tokenIsValid = validationToken(dispatch); // Validar el token
  
    if (tokenIsValid) {
      try {
        return callBack();
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        // Manejo de errores
        return null;
      }
    } else {
        removeToken(dispatch);
        console.error('Token inválido');
        // Manejo de token inválido
        return null;
    }
}