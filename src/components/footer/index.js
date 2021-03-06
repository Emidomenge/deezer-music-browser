import React from 'react';
import styles from './index.css';

const Footer = () => (
  <footer className={`navbar-fixed-bottom ${styles.footer}`}>
    <div className="container">
      <div className="row">
        <p>
          {'This single page app was created by '}
          <a href="http://www.domenge.fr/" target="_blank" rel="noopener noreferrer">Emilien Domenge-Heritier</a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
