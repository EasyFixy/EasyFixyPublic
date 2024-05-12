import React, { useEffect, useState } from "react";
import EstimatePrice from "../../components/EstimatePrice";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../../../app/hooks";
import { toast } from 'react-toastify';
interface PropsPujarPrecio {
    userData: any;
    destinatary: number;
    initialValue: string;
    psocket: Socket | null;
    setOfferAccepted: (flag: boolean) => void;
    setOponentAccepted: (flag: boolean) => void;
    offerAccepted: Boolean;
    oponentAccepted: Boolean;
    bidPrice: number;
    setBidPrice: (flag: number) => void;
}

const PujarPrecio = ({
    userData,
    destinatary,
    initialValue,
    psocket,
    setOfferAccepted,
    setOponentAccepted,
    offerAccepted,
    oponentAccepted,
    bidPrice,
    setBidPrice
}: PropsPujarPrecio) => {
    //const [bidPrice, setBidPrice] = useState(initialValue ? parseInt(initialValue, 10) : 10000);
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const [lastBidPrice, setLastBidPrice] = useState("");
    const userId = useAppSelector((state) => state.Auth.id);
    const [userDataState, setUserDataState] = useState(userData);
    const handleBidPrice = (newValue) => {
        setBidPrice(newValue);
        setLastBidPrice('')
        if (newValue >= 10000) {
            if (socket) {
                setOfferAccepted(false)
                setOponentAccepted(false)
                socket.emit('bid price', { destinatary: destinatary, price: newValue });
            } else {
                console.error('Socket is not initialized.');
                // Handle the case where socket is undefined
            }
        }
    };
    useEffect(() => {

        if (psocket) {
            console.log("def")
            console.log(psocket)
            if (!psocket.hasListeners('bid price')) {
                
                psocket.on('bid price', (data) => {
                    setOfferAccepted(false)
                    setOponentAccepted(false)
                    setBidPrice(data.price)
                    console.log("sad")
                    console.log(userData)
                    setLastBidPrice(userData?.mainData[0]?.userName ?? "")
                    toast.success(`¡El precio fue cambiado por ${userData?.mainData[0]?.userName}`)
                });
            } else {
                console.log("22");
            }
            
            setSocket(psocket);
            
        } else {
            const socket = io("http://localhost:3000/", {
                auth: {
                    userId: userId
                }
            });
            socket.on('bid price', (data) => {
                setBidPrice(data.price)
                setLastBidPrice(userData?.mainData[0]?.userName ?? "")
                toast.success(`¡El precio fue cambiado por ${userData?.mainData[0]?.userName}`)
                setOfferAccepted(false)
                setOponentAccepted(false)
            });

            setSocket(socket);
        }

    }, []);
    return (
        <div className="flex flex-col items-center justify-center text-center">
            {offerAccepted ? (<h1 className="text-green-500">has aceptado</h1>):(<h1 className="text-red-500">no has aceptado</h1>)}
            {oponentAccepted ? (<h1 className="text-green-500">la otra persona ha aceptado</h1>):(<h1 className="text-red-500">la otra persona no ha aceptado</h1>)}
            <h1 className="text-white">Puedes aumentar o disminuir el precio de la negociación</h1>
            <EstimatePrice estimatePrice={bidPrice} setEstimatePrice={handleBidPrice} />
            {lastBidPrice !== "" && (
                <div className="blink">
                    <p>nuevo precio!</p>
                </div>
            )}
        </div>
    )
}
export default PujarPrecio;