import React, { Component } from 'react';
import map from '../data/map.json'
import styled from 'styled-components'; 




class Direction extends Component {


    render() {

      return (
        <div>
            {this.props.path.map((item)=><h3>{map[item].name} {map[item].aisle}</h3>)}
        </div>
      );
    }
  }
  
  export default Direction;