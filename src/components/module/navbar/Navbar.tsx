import React from 'react';
import style from './Navbar.module.css';
import Link from 'next/link';
import { TiHome } from "react-icons/ti";
import { FaCreditCard } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

export default function Navbar() {
    return (
        // Renders the Navbar component with a list of navigation items.
        <nav className={style.navbar}>
            <main>
                <ul className={style.navbarList}>
                    <li className={style.navbarItem}>
                        <Link href={'/carts'} className={style.navbarLink}>
                            <FaCreditCard className={style.navbarIcon} />
                            <span>کارت </span>
                        </Link>
                    </li>
                  

                    <li className={style.navbarItem}>

                       <Link href={'/new-expense'} className={style.navbarLink}>
                        <span className={style.navbarPlus}>
                            <FaPlus />
                        </span>
                       </Link>

                    </li>
                   
                    <li className={style.navbarItem}>
                        <Link href={'/'} className={style.navbarLink}>
                            <TiHome className={style.navbarIcon} />
                            <span>خانه</span>
                        </Link>
                    </li>


                </ul>
            </main>
        </nav>
    );
}
