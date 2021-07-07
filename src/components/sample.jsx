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

    var aisleWidth = 120;
    var shelfWidth = 80;
    var shelfLength = 240;

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

    var lineHeight = 26;
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
            ctx.font = "15px Arial";
            
            if(map[key].side == "r"){
                ctx.fillText(id_str, 0, (lineHeight / 2)-15, 800);
            }
            else{
                ctx.fillText(id_str, 0, (lineHeight / 2)+0, 800);
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
 
    function drawSingleRack(x , y){
        ctx.lineWidth=1;
        ctx.fillStyle = 'white';

        var x_pos = x;
        var y_pos = y;
        var length = 7;
        var width = 7;
        for(let x = 0; x < 3; x++){
            for(let i = 0; i <4; i++){
                ctx.strokeRect(x_pos+(i*width), y_pos, width, length);  
            }
            y_pos = y_pos+length;
        }
    }


    function drawRacks(column, row, x, y, num_row, num_col){
        var x_init = x;    
        for(let i = 0; i < num_row; i++){
            for(let z = 0; z < num_col; z++){
                drawSingleRack(x, y); 
                x = x+column;
            }
            x = x_init;
            y = y+row;
        }
    } 

    //drawSingleRack(10, 295);
    drawRacks(100, 60, 10, 285, 3, 2 );
    drawRacks(100, 60, 10, 420, 1, 4 );
    


}
  render() {
    return (
        <Container>
            <canvas  id="canvas" width="2200" height="600"></canvas>
        </Container>
    );
  }
}


console.log("Heloooo!!!!");



export default Graph;