import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // Importar los estilos del menú

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu-container">
            <div className="menu-icon" onClick={toggleMenu}>
                &#9776; {/* Ícono de tres rayas horizontales */}
            </div>
            {isOpen && (
                <div className="menu-dropdown">
                    <Link to="/registro" onClick={toggleMenu}>Registrar Actividad</Link>
                </div>
            )}
        </div>
    );
};

export default Menu;