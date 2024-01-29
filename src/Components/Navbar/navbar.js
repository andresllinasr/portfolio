import React, { useState } from 'react';
import './Navbar.scss';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={`navbar__wrapper ${isMobileMenuOpen ? 'navbar__wrapper--open' : ''}`}>
            <div className={`navbar__overlay`}></div>
            <nav className={`navbar__visible`}>
                <div className="navbar__content">
                    <div className="navbar__logo">
                        <a href="/" className="navbar__link">Andrés Llinás</a>
                    </div>
                    <button className="navbar__btn" onClick={handleMenuToggle}>
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                    <ul className={"navbar__list"}>
                        <li className="navbar__item"><a href="#" className="navbar__link">Home</a></li>
                        <li className="navbar__item"><a href="#" className="navbar__link">About</a></li>
                        <li className="navbar__item"><a href="#" className="navbar__link">Contact</a></li>
                    </ul>
                </div>
            </nav>
        </div >
    );
};

export default Navbar;