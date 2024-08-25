import React from "react";
import { useState } from "react";
import EditarPerfil from "./EditarPerfil";
import { useEffect } from "react";
import { UserData } from "../../models/PerfilEmpleado";
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
    },
  });
  
interface PropsContenedorPerfil {
    estado: boolean,
    nameColor?: string,
    width?: string,
    textColor?: string,
    paddingX?: string,
    whiteStar?: boolean,
    showDescription?: boolean,
    isLoading: boolean,
    userData: UserData
}
const meses = {
    '01': 'enero',
    '02': 'febrero',
    '03': 'marzo',
    '04': 'abril',
    '05': 'mayo',
    '06': 'junio',
    '07': 'julio',
    '08': 'agosto',
    '09': 'septiembre',
    '10': 'octubre',
    '11': 'noviembre',
    '12': 'diciembre'
};
const ContenedorPerfil = ({
    estado,
    nameColor = 'text-black',
    width = 'w-screen',
    textColor = '',
    paddingX = 'px-32',
    whiteStar = false,
    isLoading = false,
    userData

}: PropsContenedorPerfil) => {



    const [estadoDialog, setEstadoDialog] = useState(false);
    const mostrarEditar = () => {
        setEstadoDialog(!estadoDialog);
    }
    const navigate = useNavigate();

    
    
    let mesNumero = '01';
    let mesNombre = meses[mesNumero];
    let isActive = 0;
    let dia = '';
    let acno = '2000';

    // Verificacion de si hay datos en tempData
    if (userData && userData.tempData && userData.tempData.length){
        mesNumero=userData.tempData[0].userTempDataLastUpdate.slice(5, 7);
        isActive=userData.tempData[0].userTempDataActive;
        dia=userData.tempData[0].userTempDataLastUpdate.slice(8, 10);
        acno=userData.tempData[0].userTempDataLastUpdate.slice(0, 4);

    }

    const handleCloseComponente = () => {
        setEstadoDialog(false);
      };
    
    return (
        <div className={`content-center ${paddingX} pt-10 ${width} h-auto flex flex-col lg:flex-row`}>
  <div>
    {(estadoDialog === true ? <EditarPerfil onClose={handleCloseComponente} /> : <></>)}
  </div>
  
  {/* Imagen del usuario */}
  <div className="w-full lg:w-auto lg:pl-16 lg:pr-16 pb-16 flex justify-center lg:justify-start">
    <img 
      src="/icons/icon-user.png" 
      alt="Imagen usuario" 
      className="bg-gray-300 px-2 py-2 w-3/4 sm:w-1/2 lg:w-full aspect-square max-w-[200px]" 
    />
  </div>

  {/* Información del usuario */}
  <div className="flex flex-col w-full lg:w-2/3 px-4 lg:px-0">
    <h1 className={`text-3xl ${nameColor} font-bold`}>
      {isLoading ? (
        <p>Cargando perfil...</p>
      ) : (
        <>
          {userData && userData.mainData && userData.mainData.length > 0 ? (
            userData.mainData[0].userName
          ) : (
            <p>El id proporcionado no existe.</p>
          )}
        </>
      )}
    </h1>

    <section className="flex flex-wrap mt-4">
      <div className="w-full flex flex-row flex-wrap items-center">
        {/* Estrellas */}
        <div className="w-auto flex flex-row mb-2">
          {userData && userData.comments && userData.comments.data ? (
            <>
              {userData.comments.data.length > 0 ? (
                <>
                  {Array.from({ length: Math.ceil(userData.comments.data[0].mediaCalificaciones) }, (_, index) => (
                    <img 
                      key={index} 
                      src="/icons/star.svg" 
                      alt={`Imagen ${index}`} 
                      className="w-6 flex-initial px-1" 
                    />
                  ))}
                  {Array.from({ length: 5 - Math.ceil(userData.comments.data[0].mediaCalificaciones) }, (_, index) => (
                    <img 
                      key={index} 
                      src="/icons/icon-star.svg" 
                      alt={`Imagen ${index}`} 
                      className="w-6 flex-initial px-1" 
                    />
                  ))}
                </>
              ) : (
                Array(5).fill().map((_, index) => (
                  <img 
                    key={index} 
                    src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} 
                    alt={`Estrellita ${index}`} 
                    className="w-6 flex-initial px-1" 
                  />
                ))
              )}
            </>
          ) : (
            Array(5).fill().map((_, index) => (
              <img 
                key={index} 
                src={`/icons/icon-star${whiteStar ? '-white' : ''}.svg`} 
                alt={`Estrellita ${index}`} 
                className="w-6 flex-initial px-1" 
              />
            ))
          )}
        </div>

        {/* Información de calificaciones */}
        <h3 className={`${textColor} w-auto flex-initial px-3`}>
          {isLoading ? (
            <p>Cargando perfil...</p>
          ) : (
            <>
              {userData && userData.comments && userData.comments.data.length > 0 ? (
                <>
                  {parseFloat(userData.comments.data[0].mediaCalificaciones.toString()).toFixed(2)} estrellas <br />
                  {userData.comments.data[0].cantidadTotalComentariosEmployee} Calificaciones
                </>
              ) : (
                <p>0 Calificaciones</p>
              )}
            </>
          )}
        </h3>

        <h3 className={`${textColor} w-auto flex-initial`}>
          {isLoading ? (
            <p>Cargando perfil...</p>
          ) : (
            <>
              {userData && userData.mainData && userData.mainData.length > 0 ? (
                userData.mainData[0].antiguedadYears
              ) : (
                <p>None</p>
              )}
            </>
          )} 
          <> </> Años de experiencia
        </h3>
      </div>
    </section>

    {/* Estado en línea */}
    <h2 className="mt-8 text-orange-500 px-4"> 
      {isActive == 1 ? <>· Estoy en linea!</> : <>· No estoy en linea</>}
    </h2>

    {/* Ubicación */}
    <div className="flex flex-row mt-2">
      <img src="/icons/bandera.png" alt="bandera país" />
      <h2 className={`${textColor}`}>Bogotá, Colombia</h2>
    </div>

    {/* Fecha de unión */}
    <div className="flex flex-row mt-2">
      <img src="/icons/joined.png" alt="Joined" className="px-2 w-10" />
      <h2 className={`${textColor}`}>Joined {mesNombre} {dia}, {acno} </h2>
    </div>

    {/* Botones de acción */}
    {estado === true && (
      <div className="mb-6 ml-2 mt-4 flex flex-col lg:flex-row gap-4">
        <button 
          className="mainBackground h-full text-white flex-1 rounded-full border border-black" 
          onClick={() => (mostrarEditar())}
        >
          Editar Perfil
        </button>
        <ThemeProvider theme={theme}>
          <Button 
            variant="outlined" 
            color="primary" 
            endIcon={<AccountBalanceWalletIcon />}
            onClick={() =>{navigate('/my/retirarDinero')}}
            className="h-full"
          >
            Retirar Dinero
          </Button>
        </ThemeProvider>
      </div>
    )}
  </div>
</div>

    );
}

export default ContenedorPerfil;