function Node(id, x, y, item, array){

    this.id = id;
    this.x = x;
    this.y = y; 
    this.item = item;
    this.array = array;

}

/***** Create Nodes *****/ 

const totalNodes = 15;

//Store Entry Node
var entry_node = new Node(0, 10, 10, "main_entry", []); 

//Store Exit Node (Checkout/Cashier)
var exit_node = new Node(1, 10,250, "main_exit", []);


//Nodes below belong to asile A
var node_A1 = new Node(2, 70, 40, "milk", []);
var node_A2 = new Node(3, 70, 100, "eggs", []);
var node_A3 = new Node(4, 70, 140, "yogurt", []);
var node_A4 = new Node(5, 190, 60, "bread", []);
var node_A5 = new Node(6, 190, 120, "cereal", []);

var node_A_top = new Node(7, 130, 15, "A", []); //Helper Node for asile A, location top
var node_A_bottom = new Node(8, 130, 215, "A", []);  //Helper Node for asile A, location bottom


// Nodes below belong to asile B
var node_B1 = new Node(9, 250, 80, "apple", []);
var node_B2 = new Node(10, 250, 160, "pear", []);
var node_B3 = new Node(11, 370, 80, "orange", []);
var node_B4 = new Node(12, 370, 160, "other", []);

var node_B_top = new Node(13, 310, 15, "B", []); //Helper Node for asile B, location top
var node_B_bottom = new Node(14, 310, 215, "B", []);  //Helper Node for asile B, location bottom


var asileA = [node_A1, node_A2, node_A3, node_A4, node_A5, node_A_top, node_A_bottom];  

var asileB = [node_B1, node_B2, node_B3, node_B4, node_B_top, node_B_bottom];  

var hallway_top =  [entry_node, node_A_top, node_B_top];
var hallway_bottom = [exit_node, node_A_bottom, node_B_bottom];

var all_nodes = asileA.concat(asileB, hallway_bottom, hallway_top); //Problem: There are duplicates


/***** Set Up Canvas *****/ 

//Draw shelfs

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(20, 20, 40, 180);
ctx.stroke(); 

ctx.beginPath();
ctx.rect(200, 20, 40, 180);
ctx.stroke();

ctx.beginPath();
ctx.rect(380, 20, 40, 180);
ctx.stroke();

//Draw Nodes

function drawNodes(array){
    for(let i = 0; i < array.length; i++){
        let id_str = array[i].item;
        let x = array[i].x;
        let y = array[i].y;
        ctx.font = "12px Arial";
        ctx.fillText(id_str, x, y);
    }
}

drawNodes(all_nodes);

/***** Create Map *****/ 

var matrix = Array.from(Array(totalNodes), () => new Array(totalNodes));

function initialMatrix(){
    for(let z = 0; z < totalNodes; z++){
        for(let a = 0; a < totalNodes; a++){
            matrix[z][a] = -1;
        }
    }
}

function getDistance(node_1, node_2){

    let a = node_1.x - node_2.x;
    let b = node_1.y - node_2.y;

    let c = Math.sqrt( a*a + b*b );

    return c;
}

function completeGraph(asile){

    for(let i = 0; i < asile.length; i++){
        for(let x = 0; x < asile.length; x++){
            let node_1 = asile[i];
            let node_2 = asile[x];
            if(x!= i){
                node_1.array.push(node_2);
                console.log(x);
                matrix[node_1.id][node_2.id];// = getDistance(node_1, node_2);
            }
            
        }
    }
} 

initialMatrix();

completeGraph(asileA);
completeGraph(asileB);
completeGraph(hallway_top);
completeGraph(hallway_bottom);




/***** Draw Shortest Path *****/

var path_array = [entry_node,node_A_top,node_A2,node_A5,node_A_bottom,exit_node];

//Takes in an array of nodes and draws a path
function draw_path(array){

    for(let i = 0; i < array.length; i++){
        
        if((i+1)!= array.length){
            let curr_node = array[i];
            let next_node = array[i+1]; 

            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
        
            // draw a red line
            ctx.beginPath();
            ctx.moveTo(curr_node.x, curr_node.y);
            ctx.lineTo(next_node.x, next_node.y);
            ctx.stroke();

        }


    }
} 



/***** Draw Map *****/ 

var visited_array = new Array(totalNodes);

for(let i = 0; i< visited_array.length; i++){
    visited_array[i] = false;
}


function draw_map(root){ //impleneted a depth search here

    visited_array[root.id] = true;
    var neighbors = root.array; 

    for(let i = 0; i < neighbors.length; i++){


        let curr_node = root;
        let next_node = neighbors[i]; 

        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
    
        // draw a red line
        ctx.beginPath();
        ctx.moveTo(curr_node.x, curr_node.y);
        ctx.lineTo(next_node.x, next_node.y);
        ctx.stroke();

        if(visited_array[neighbors[i].id] == false){
            draw_map(neighbors[i]);
        }
    }

}

console.log("Length:"+ entry_node.array.length);

draw_map(entry_node);
draw_path(path_array);