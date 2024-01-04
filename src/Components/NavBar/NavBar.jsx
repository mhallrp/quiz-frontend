import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';

const NavBar = (props) => {
  return (
    <div className={Styles.navBar}>
      <h1 className={Styles.navTitle}>Quik Quiz 💡</h1>
      <h1
        className={Styles.user}
        style={{
          opacity: props.dataOpacity,
          transition: 'opacity 300ms ease-in-out',
        }}>
        {props.userData}
      </h1>
    </div>
  );
};

export default NavBar;
