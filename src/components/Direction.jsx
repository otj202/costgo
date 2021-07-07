import React, { Component } from 'react';
import map from '../data/map.json'
import styled, { ThemeConsumer } from 'styled-components'; 




class Direction extends Component {


    render() {
    var array= [];
    for(const item of this.props.path){
        if (map[item].connectorType == null) {
            array.push(item);
          }
    }
      return (
        <div>
            {array.map((item)=><h3>{map[item].name} {map[item].aisle}</h3>)}
        </div>
      );
    }
  }
  
  export default Direction;