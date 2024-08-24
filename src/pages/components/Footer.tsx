import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="h-20 mainBackground px-[5%] text-white flex items-center justify-between animate-fadeIn">
            <div className="flex items-center animate-fadeIn">
                <a href="https://www.facebook.com/profile.php?id=61556782981262&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="relative group">
                    <img src="/icons/FacebookIcon.svg" alt="Facebook" className="w-10 h-10 mr-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="relative group">
                    <img src="/icons/InstagramIcon.svg" alt="Instagram" className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                </a>
                <span className="ml-10 relative transition-transform duration-300 hover:scale-105 before:content-[''] before:absolute before:w-full before:h-1 before:bg-white before:bottom-[-4px] before:left-0 before:transition-all before:duration-300 hover:before:scale-x-100 before:scale-x-0">easyfixy26@gmail.com</span>
            </div>
            <div className="text-sm relative transition-transform duration-300 hover:scale-105 before:content-[''] before:absolute before:w-full before:h-1 before:bg-white before:bottom-[-4px] before:left-0 before:transition-all before:duration-300 hover:before:scale-x-100 before:scale-x-0">
                <span>© 2024 EasyFixy Inc. Todos los derechos reservados</span>
            </div>
            <div className="text-sm">
                <span className="relative transition-transform duration-300 hover:scale-105 before:content-[''] before:absolute before:w-full before:h-1 before:bg-white before:bottom-[-4px] before:left-0 before:transition-all before:duration-300 hover:before:scale-x-100 before:scale-x-0">
                    <Link to={'/policies-privacity'} className="underline">Política y privacidad</Link>
                </span>
                <span className="relative ml-4 transition-transform duration-300 hover:scale-105 before:content-[''] before:absolute before:w-full before:h-1 before:bg-white before:bottom-[-4px] before:left-0 before:transition-all before:duration-300 hover:before:scale-x-100 before:scale-x-0">
                    <Link to={'/terms-conditions'} className="underline">Términos y condiciones</Link>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
