import React from 'react';
import Button from './Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <h2 className={styles.logo}>RuralRise</h2>
        <nav className={styles.navLinks}>
          <a href="#">Discover</a>
          <a href="#">Storefronts</a>
          <a href="#">About</a>
        </nav>
        <div className={styles.actions}>
          <Button variant="secondary" className={styles.loginBtn}>Login</Button>
          <Button variant="primary">Join Now</Button>
        </div>
      </div>
    </header>
  );
}
