import React, { Component } from 'react';
import map from '../data/map.json'
import styled, { ThemeConsumer } from 'styled-components'; 

import pin from '../assets/pin.png';

const Container = styled.div`
  background-color: #364C83; 
  display: flex; 
  justify-content: space-evenly;
  flex-wrap: wrap;
  font-family: 'Nunito', sans-serif;
  padding: 40px;
  color: white;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 10px;
  border-radius: 20px;
`;

const Step = styled.div` 
  //background-color: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 200px;
`;

const Name = styled.h2`
  margin: 0;
  text-align: center;
  padding-top: 10px;
`;

const Aisle = styled.h3`
  font-family: 'Nunito', sans-serif;
  margin: 0;
`;

const ImgContainer = styled.div`
  position: relative;
  //background-color: purple;
  height: 70px;
  width: 70px;
`;

const Number = styled.div`
  position: absolute;
  top: 14px;
  left: ${props => props.digit > 9 ? "26px" : "31px"};
  font-weight: bold;
  font-size: 15px;
`;

const Icon = styled.img`
  height: 70px;
`;

const Connector = styled.p`
  font-size: 80px;
  display: inline-block;
  margin: 0;
  //background-color: grey;
  color: #091A45;
`;

class Direction extends Component {
  render() {
  var array = [];
  for (const item of this.props.path){
      if (map[item].connectorType == null) {
          array.push(item);
        }
  }

  const len = array.length;
  let num = 1;
  let order = [];

  array.map((item, i)=>
    { if ((i+1) == len) {
      let aisleStr = <> 
      <Step>
        <ImgContainer>
          <Icon src={pin}></Icon>
          <Number digit={num}>{num}</Number>
        </ImgContainer>
        <Name>{map[item].name}</Name><Aisle>Aisle {map[item].aisle}</Aisle>
      </Step>
      </>;
      let sectionStr = 
      <> 
       <Step>
         <ImgContainer>
           <Icon src={pin}></Icon>
           <Number digit={num}>{num}</Number>
         </ImgContainer>
         <Name>{map[item].name}</Name><Aisle>{map[item].category} Section</Aisle>
       </Step>
       </>;
      let orderStr=map[item].aisle > 0 ? aisleStr : sectionStr;
      order.push(orderStr);
      num++;
    } else {
      let aisleStr = <> 
      <Step>
        <ImgContainer>
          <Icon src={pin}></Icon>
          <Number digit={num}>{num}</Number>
        </ImgContainer>
        <Name>{map[item].name}</Name><Aisle>Aisle {map[item].aisle}</Aisle>
      </Step>
      <Connector>.....</Connector>
      </>;
      let sectionStr = <> 
      <Step>
        <ImgContainer>
          <Icon src={pin}></Icon>
          <Number digit={num}>{num}</Number>
        </ImgContainer>
        <Name>{map[item].name}</Name><Aisle>{map[item].category} Section</Aisle>
      </Step>
      <Connector>.....</Connector>
      </>;
      let orderStr=map[item].aisle > 0 ? aisleStr : sectionStr;
      order.push(orderStr);
      num++
    }}
  ); 

    return (
      <Container>
        {order}
      </Container>
    );
  }
}
  
export default Direction;