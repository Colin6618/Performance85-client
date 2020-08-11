import React from 'react';
import Logo from 'assets/svg/PF85svg.svg';


export const PF85Logo: React.FC<{ width?: string }> = ({ width }) => (
  <img
    style={{ width: width }}
    className="logo"
    src={Logo}
    alt="Logo"
  />
);

export default PF85Logo;
