import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', size = 'medium', className = '', ...props }) {
  const variantClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  const sizeClass = styles[size] || styles.medium;
  
  return (
    <button 
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
