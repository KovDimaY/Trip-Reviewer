import React from 'react';

import './styles.css';

const Footer = () => {
  const renderIcon = (url, type) => (
    <a target="_blank" rel="noopener noreferrer" href={url} className={`footer-${type}`}>
      <i className={`fab fa-${type}`} />
    </a>
  );

  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="social-media-icons">
          {renderIcon('https://github.com/KovDimaY/Trip-Reviewer', 'github')}
          {renderIcon('https://www.facebook.com/dmytro.kovalenko.1004', 'facebook')}
          {renderIcon('https://www.vk.com/id11545172', 'vk')}
          {renderIcon('https://www.linkedin.com/in/kovalenkodmytro', 'linkedin')}
        </div>
        <p className="author">Copyright &copy; Dmytro Kovalenko ;)</p>
      </div>
    </footer>
  );
};

export default Footer;
