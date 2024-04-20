import React from 'react';
import LogoImg from '../../obj/Logoimage/Logo.png';

function Logo({ width = "50px" }) {
  return (
    <img src={LogoImg} alt="Logo" style={{ width:'' ,borderRadius:'50px',height:'50px'}} />
  );
}

export default Logo;
