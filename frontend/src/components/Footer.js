import React from 'react';
import '../styles/component.css';
import '../styles/global.css';

const Footer = () => (
  <footer style={{ padding: '10px', backgroundColor: '#f8f9fa', marginTop: '20px', textAlign: 'center' }}>
    <p>© 2024 ShopEase. All Rights Reserved.</p>
    <p>
      <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
    </p>
  </footer>
);

export default Footer;
