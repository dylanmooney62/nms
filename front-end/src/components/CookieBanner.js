import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
  return (
    <div style={{ flex: '0 1' }}>
      <CookieConsent
        location="bottom"
        buttonText="OK"
        cookieName="banner-shown"
        style={{ background: '#7E2AAF', fontSize: '1.4rem' }}
        buttonStyle={{
          color: '#FFFFFF',
          fontSize: '1.4rem',
          backgroundColor: 'transparent',
          border: '0.1rem solid #FFFFFF',
        }}
        expires={150}
      >
        This site uses cookies to improve the user experience. By using this
        site, you accept our use of cookies.
      </CookieConsent>
    </div>
  );
};

export default CookieBanner;
