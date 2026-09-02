import React from 'react';
import styles from './Card.module.css';

export default function Card({ children, className = '', hoverEffect = false, ...props }) {
  const hoverClass = hoverEffect ? styles.cardHover : '';
  
  return (
    <div className={`${styles.card} glass-panel ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
