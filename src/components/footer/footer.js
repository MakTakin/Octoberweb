import React from 'react'
import './footer.css'
import {Link, animateScroll as scroll} from "react-scroll";

function Footer() {
    const scrollToTop = () => scroll.scrollToTop()

    return (
        <footer className='footer'>
            <div className='flex-elements'>
                <div className="footer-contacts">
                    <h4>Санкт-Петербург</h4>
                    <div>Большой Проспект П. С., 18, офис 22</div>
                </div>
                <div className="footer-contacts ">
                    <h4><a href="mailto:mail@octoberweb.ru">mail@octoberweb.ru</a></h4>
                    <div><a href="tel:+79811316498">+7 (981) 131-64-98</a></div>
                </div>
                <div>
                    <button className="btn-footer"
                            onClick={scrollToTop}>
                        Написать нам
                    </button>
                </div>

            </div>
            <div>
                <ul className='menu-footer'>
                    <li>
                        <Link
                            to="textBlocks"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>
                            Текстовые Блоки
                        </Link>
                    </li>
                    <li className='gallery-footer'>
                        <Link
                            to="gallery"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>
                            Галерея
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="formToSend"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>
                            Форма
                        </Link>
                    </li>
                    <li className='text-right'>© 2009-2020 OctoberWeb</li>
                </ul>
            </div>

        </footer>
    )
}
export default Footer