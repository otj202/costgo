import React, { Component } from 'react';
import styled from 'styled-components';

const Costgo = styled.button`
  background-color: #E31837;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 25px;
  border-radius: 20px;
  border: none;
`;

const Label = styled.p`
  color: white;
  font-size: 25px;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;

class Button extends Component {
  render() {
    return (
      <Costgo>
        <Label>
          costGo!
        </Label>
      </Costgo>
    );
  }
}

export default Button;