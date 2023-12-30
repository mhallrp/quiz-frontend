import React, { useEffect, useState } from "react";
import Styles from './styles.module.css';

const NavBar = () => {
    return (
        <div className={Styles.navBar}>
                <h1 className={Styles.navTitle}>Quik Quiz 💡</h1>
                <button className={Styles.navContact}>Contact Me</button>
        </div>
    );
};

export default NavBar;
