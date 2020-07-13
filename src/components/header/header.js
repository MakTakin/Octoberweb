import React from 'react';
import Logo from "../../images/Logo.png"
import './header.css'
import {Link} from "react-scroll";

function Header() {
    return (
        <nav>
            <div className='sectionContainer nav'>
                <img src={Logo} alt="logo" className='logo'/>
                <ul className='menu flex-grow'>
                    <li>
                        <Link
                            to="textBlocks"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            // className='menu-form'
                        >
                            Текстовые Блоки
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="gallery"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            // className='menu-form'
                        >
                            Галерея
                        </Link>
                    </li>
                </ul>
                <Link
                    to="formToSend"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className='menu-form flex-grow'
                >
                    <span role="img" aria-label="hello">&#128075;</span> Форма с приветами
                </Link>
            </div>
        </nav>
    )
}
export default Header;


