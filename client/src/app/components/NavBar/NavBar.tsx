import React from "react";
import styles from "./NavBar.module.css";
import Link from "next/link";

function NavBar() {

    const links: { label: string, route: string }[] = [
        {
            label: 'Home',
            route: '/'
        },
        {
            label: 'Pueblos',
            route: '/towns'
        },
        {
            label: 'Sobre nosotros',
            route: '/towns'
        },
        {
            label: 'Contactanos',
            route: '/towns'
        },

    ]

    return (
        < >
            <div className={styles.navcontainer}>
                <nav className={styles.menu}>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <Link href={'/'}>
                                <img src='https://i.ibb.co/VpT8d9c/iocn.png' alt="Italian Trulli" style={{ width: '75px', height: '75px' }} />
                            </Link>
                        </li >
                        {
                            links.map(({ label, route }) => (
                                label !== 'Home' ?
                                    <li key={route} className={styles.listItem}>
                                        <Link href={route}>
                                            {label}
                                        </Link>
                                    </li>
                                    :
                                    null
                            ))
                        }


                    </ul>
                </nav>
            </div>
        </>
    );
}

export default NavBar;