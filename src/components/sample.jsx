import React, { Component } from 'react';

import map from '../data/map.json'

import styled from 'styled-components';


const Container = styled.div`
  background-color: #364C83;
  border-radius: 20px;
  margin-left: 7%;
  margin-right: 7%;
  height: 60vh;
  display: flexbox;
  justify-content: center; 
  align-items: center;
  
`;


console.log(map["Chips"]);

class Graph extends Component {

componentDidMount(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");


    var total_aisle = 12;
    var position = 0;

    var aisleWidth = 100;
    var shelfWidth = 40;
    var shelfLength = 180;

    function drawAisle(aisleWidth, shelfWidth, shelfLength ){
        ctx.fillStyle = 'brown';
        for(let i = 0; i < total_aisle; i++){
            ctx.beginPath();
            ctx.fillRect(position, 30, shelfWidth, shelfLength);
            position += shelfWidth+ aisleWidth;
        }
        
    }

    drawAisle(aisleWidth,shelfWidth,shelfLength);


    var visited_array = {};

    var lineHeight = 15;
    ctx.fillStyle = 'white';
    for (var key in map) {
        
        if (map.hasOwnProperty(key)) {

            visited_array[key] = false;

            let id_str = key;
            let x = map[key].x;
            let y = map[key].y;

            ctx.save();
            ctx.translate(x, y);

            ctx.rotate(90 * Math.PI / 180);

            ctx.textAlign = 'center';
            ctx.font = "8px Arial";
            
            if(map[key].side == "r"){
                ctx.fillText(id_str.substring(0, 6), 0, (lineHeight / 2)-8);
            }
            else{
                ctx.fillText(id_str.substring(0, 6), 0, (lineHeight / 2)+0);
            }

            ctx.restore();
            

            //ctx.font = "8px Arial";
            //ctx.fillText(id_str.substring(0, 5), x, y);
        }
    }


    function draw_path(array){

        for(let i = 0; i < array.length; i++){
            
            if((i+1)!= array.length){
                let curr_node = map[array[i]];
                let next_node = map[array[i+1]]; 
    
                ctx.strokeStyle = '#88F37F';
                ctx.lineWidth = 3;
                
                // draw a red line

                ctx.font = "15px Arial";
                ctx.fillText(i+1, curr_node.x, curr_node.y);

                ctx.beginPath();
                ctx.moveTo(curr_node.x, curr_node.y);
                ctx.lineTo(next_node.x, next_node.y);
                ctx.stroke();
    
            }
    
    
        }
    } 

    //document.getElementById("items").innerHTML= this.props.path;
    draw_path(this.props.path);    


}
  render() {
    return (
        <Container>
            <canvas  id="canvas" width="1600" height="500"></canvas>
        </Container>
    );
  }
}


console.log("Heloooo!!!!");



export default Graph;