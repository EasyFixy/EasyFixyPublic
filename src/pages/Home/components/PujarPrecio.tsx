import React, { useEffect, useState } from "react";
import EstimatePrice from "../../components/EstimatePrice";
import { io,Socket } from "socket.io-client";
import { useAppSelector } from "../../../app/hooks";
import { toast } from 'react-toastify';
interface PropsPujarPrecio {
    userData: any;
    destinatary: number;
    initialValue: string;
}

const PujarPrecio = ({
    userData,
    destinatary,
    initialValue
}:PropsPujarPrecio) => {
    const [bidPrice, setBidPrice] = useState(initialValue ? parseInt(initialValue,10) : 10000);
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const [lastBidPrice, setLastBidPrice] = useState("");
    const userId = useAppSelector((state) => state.Auth.id);
    const [userDataState, setUserDataState] = useState(userData);
    const handleBidPrice = (newValue) => {
        setBidPrice(newValue);
        setLastBidPrice('')
        if (newValue >= 10000) {
            if (socket) {
                socket.emit('bid price', { destinatary: destinatary, price: newValue });
            } else {
                console.error('Socket is not initialized.');
                // Handle the case where socket is undefined
            }
        }
    };
    useEffect(() => {
        const socket = io("http://localhost:3000/", {
            auth: {
                userId: userId
            }
        });
        socket.on('bid price', (data) => {
            setBidPrice(data.price)
            setLastBidPrice(userData?.mainData[0]?.userName ?? "")
            toast.success(`¡El precio fue cambiado por ${userData?.mainData[0]?.userName}`)
        });
        
        setSocket(socket);
    }, []);
    return(
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-white">Puedes aumentar o disminuir el precio de la negociación</h1>
            <EstimatePrice estimatePrice={bidPrice} setEstimatePrice={handleBidPrice}/>
            {lastBidPrice !== "" && (
                <div className="blink">
                    <p>nuevo precio!</p>
                </div>
            )}
        </div>
    )
}
export default PujarPrecio;