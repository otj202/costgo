import React, { Component } from 'react';
import styled from 'styled-components'
import costcologo from '../assets/costcologo.png';

const HeaderStyle = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  height: 20vh;
  width: 100%;
  background-color: #091A45;
`;

const LogoContainer = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  padding-top: 15px;
  padding-bottom: 15px;
`;

// The Header of the website
class Header extends Component {
  render() {
    return (
      <HeaderStyle>
        <LogoContainer src={costcologo} />
      </HeaderStyle>
    );
  }
}

export default Header;