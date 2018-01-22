import React, { PropTypes } from 'react';

const Header = ({ title }) => {
  <header className="highlight pad--ends push--bottom">
    <h1 className="spacing">OVERWATCH</h1>
  </header>
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
