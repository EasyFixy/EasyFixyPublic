import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="h-20 mainBackground px-[5%] text-white flex items-center justify-between">
            <div className="flex items-center">
                <a href="https://www.facebook.com/profile.php?id=61556782981262&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/FacebookIcon.svg" alt="Facebook" className="w-10 h-10 mr-4" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/InstagramIcon.svg" alt="Instagram" className="w-10 h-10" />
                </a>
                <span className="ml-10">easyfixy26@gmail.com</span>
            </div>
            <div>
                <span>© 2024 EasyFixy Inc. Todos los derechos reservados</span>
            </div>
            <div className="text-sm">
                <span>
                    <Link to={'/policies-privacity'} className="underline">Política y privacidad</Link>
                </span>
                <span className="ml-4">
                    <Link to={'/terms-conditions'} className="underline">Términos y condiciones</Link>
                </span>
            </div>
            
        </footer>
    );
}

export default Footer;