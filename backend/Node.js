class Node{
    constructor(name,aisle,side,connectorType=null){
        this.connectorType=connectorType;
        this.name=name;
        this.aisle=aisle;
        this.side=side;
        this.x=null;
        this.y=null;
        this.neighbors={};
    }
    setXY(x,y){
        this.x=x;
        this.y=y;
    }
    distanceTo(node){
        if(this.x == null || this.y == null || node.x == null || node.y == null){
            console.log("cannot calculate distance to node of unspecified location")
            return -1;
        }
        let dx = node.x - this.x;
        let dy= node.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    addEdge(node){
        this.neighbors[node.name]=this.distanceTo(node);
    }
}

function getCoords(node, index, length){
    let shelf_width=10;
    let aisle_width=10;
    let shelf_length=10;
    var x_pos = (shelf_width+aisle_width)*(node.aisle);
    var y_pos = 30; 

    var x = 0;
    var y = 0;

    if(node.connectorType == "top"){
        x = x_pos-(aisle_width/2) 
        y = y_pos - 5;
    }
    else if(node.connectorType == "bottom"){
        x = x_pos - (aisle_width/2) 
        y = y_pos + 5 + shelf_length;
    }
    else{

        var z = shelf_length/length;
        y = y_pos + (z*index) + (z/2);

        if(node.side == "r"){
            x = x_pos;
        }
        else{
            x = x_pos - aisle_width;
        }
    }

    node.setXY(x,y);

}
var aislesJSON = require("./aisles.json");
function parseAisles(aisles) {
    let nodes=[];
    aisleNumber=1;
    for (const aisleDict of Object.values(aisles)){       
        let aisleNodes = [];
        let leftSideLength=aisleDict["left"].length;
        let rightSideLength=aisleDict["right"].length;
        for(i=0;i<leftSideLength;i++){
            let node= new Node(aisleDict["left"][i],aisleNumber,"l");
            getCoords(node,i,leftSideLength);
            aisleNodes.push(node);
        }
        for(i=0;i<rightSideLength;i++){
            let node= new Node(aisleDict["right"][i],aisleNumber,"r");
            getCoords(node,i,rightSideLength);
            aisleNodes.push(node);
        }
        nodes.push(aisleNodes);
        aisleNumber += 1;
    }    
    return nodes;
}
let aisles= parseAisles(aislesJSON);
assignNeighborsAndWeights(aisles);
storeNodes(aisles);
console.log(aisles);

function assignNeighborsAndWeights(aisles) {
    for(var i = 0; i < aisles.length; i++) {
        for(var j = 0; j < aisles[i].length; j++) {

            //Check to see if the node is an end helper node, if so connect it to adjacent end helpers
            if(j == 0 || j == aisles[i].length-1) {
                if(i != 0) {
                    aisles[i][j].addEdge(aisles[i-1][aisles[i-1].length-1]);                    
                }
                if(i != aisles.length-1) {
                    aisles[i][j].addEdge(aisles[i+1][aisles[i+1].length-1]);
                }
            }

            //Loop through items on the same aisle, connect and store distance
            for(var k = 0; k < aisles[i].length; k++) {
                if(k != j) {
                    aisles[i][j].addEdge(aisles[i][k]);
                }
            }
        }
    }
}

function storeNodes(aisles) {
    startNode = new Node("start", 0, null, "top");
    startNode.setXY(0,0);
    exitNode = new Node("exit", 0, null, "bottom");
    exitNode.setXY(0,50);

    for(var i = 0; i < aisles.length; i++) {
        startNode.addEdge(aisles[i][0]);
        aisles[i][0].addEdge(startNode);
        exitNode.addEdge(aisles[i][aisles[i].length-1]);
        aisles[i][aisles[i].length-1].addEdge(exitNode);
    }

    var nodesDict = {};
    for(var i = 0; i < aisles.length; i++) {
        for(var j = 0; j < aisles[i].length; j++) {
            nodesDict[aisles[i][j].name] = aisles[i][j];
        }
    }

    nodesDict[startNode.name] = startNode;
    nodesDict[exitNode.name] = exitNode;

    var fs = require('fs');
    fs.writeFile("map.json", JSON.stringify(nodesDict), function(err, result) {
        if(err) console.log('error', err);
      });
}