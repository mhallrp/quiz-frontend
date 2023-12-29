import React, { useEffect, useState } from "react";
import Styles from './styles.module.css';

const NavBar = (props) => {
    return (
        <div className={Styles.navBar}>
            <div className={Styles.navSection}>
                <div className={Styles.leftSection}>
                    <h1 className={Styles.navTitle}>Quik Quiz</h1>
                </div>
                <div className={Styles.centerSection}>

                </div>
                <div className={Styles.rightSection}>
                    <button className={Styles.navContact}>Contact Me</button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
