import React from 'react';
import styles from './Input.module.css';

export default function Input({ label, type = 'text', id, error, ...props }) {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input 
        type={type} 
        id={id} 
        className={`${styles.input} ${error ? styles.inputError : ''}`} 
        {...props} 
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
