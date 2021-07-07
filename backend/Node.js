class Node{
    constructor(name,aisle,side, connectorType=null, category=null, rating=null, price=null){
        this.connectorType=connectorType;
        this.name=name;
        this.aisle=aisle;
        this.side=side;
        this.category=category;
        this.rating=rating;
        this.price=price;
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
    let shelf_width=40;
    let aisle_width=100;
    let shelf_length=180;
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
var sectionsJSON = require("./sections.json");
function parseAisles(aisles) {
    let nodes=[];
    aisleNumber=1;
    for (const [aisleName,aisleDict] of Object.entries(aisles)){       
        let leftSideLength=Object.keys(aisleDict["left"]).length;
        let rightSideLength=Object.keys(aisleDict["right"]).length;
        topConnector=new Node("top"+aisleName,aisleNumber,null,"top");
        getCoords(topConnector,0,rightSideLength);
        let aisleNodes = [topConnector];
        let i = 0;
        for(const [name, item] of Object.entries(aisleDict["left"])) {
            let node= new Node(name,aisleNumber,"l", null, item["category"], item["rating"], item["price"]);
            getCoords(node,i,leftSideLength);
            aisleNodes.push(node);
            i++;
        }
        i = 0;
        for(const [name, item] of Object.entries(aisleDict["right"])) {
            let node= new Node(name,aisleNumber,"r", null, item["category"], item["rating"], item["price"]);
            getCoords(node,i,rightSideLength);
            aisleNodes.push(node);
            i++;
        }
        bottomConnector=new Node("bottom"+aisleName,aisleNumber,null,"bottom");
        getCoords(bottomConnector,0,rightSideLength);
        aisleNodes.push(bottomConnector);
        nodes.push(aisleNodes);
        aisleNumber += 1;
    }    
    return nodes;
}
let aisles= parseAisles(aislesJSON);
assignNeighborsAndWeights(aisles);
let sections = parseSections(sectionsJSON);
assignSectionNeighborsAndWeights(sections,aisles);
let iter=1;
storeNodes(aisles,sections);

for(const section of sections){
    console.log("--------------------------------------------\n\n\n section ",iter);
    for(const node of section){
        console.log(node.name,":",node.neighbors);
    }
    iter++;
}
function getClothingCoords(node,column,length,index){
    const ORIGIN = {x:0,y:250};
    const COLUMN_WIDTH = 100;
    const COLUMN_LENGTH = 180;
    node.setXY(ORIGIN.x + COLUMN_WIDTH*(column - 1),ORIGIN.y + (index / length) * COLUMN_LENGTH );
    console.log(node.name, " in column ",column,"with coords",node.x,node.y);
}
function parseClothingSection(clothing){
    columnNums={"column1":1,"column2":2,"column3":3,"column4":4};
    clothingNodes=[]
    for(const column of Object.keys(clothing)){
        let columnNodes = [];
        let clothingInd=1;
        let columnLength=clothing[column].length;
        for (const item of clothing[column]){
            node= new Node(item,null,null,null,null,null,null);
            getClothingCoords(node,columnNums[column],columnLength,clothingInd++);
            columnNodes.push(node);
        }
        clothingNodes.push(columnNodes);
    }
    return clothingNodes;
}
function parseSections(sectionsJSON){
    let nodes=[];
    nodes=nodes.concat(parseClothingSection(sectionsJSON["Clothing"]));
    return nodes;
}

function assignSectionNeighborsAndWeights(sectionNodes,aisleNodes){
    for(let i=0;i<sectionNodes.length;i++){
        for(let a=0;a<aisleNodes.length;a++){
            sectionNodes[i][0].addEdge(aisleNodes[a][aisleNodes[a].length - 1]);
            aisleNodes[a][aisleNodes[a].length - 1].addEdge(sectionNodes[i][0]);
        }
        if(i<sectionNodes.length-1){
            sectionNodes[i][0].addEdge(sectionNodes[i+1][0]);
            sectionNodes[i+1][0].addEdge(sectionNodes[i][0]);
        }
        else{
            break;
        }
        for(let j=0;j<sectionNodes[i].length;j++){
            if(j < sectionNodes[i].length-1){
                sectionNodes[i][j].addEdge(sectionNodes[i][j+1]);
                sectionNodes[i][j+1].addEdge(sectionNodes[i][j]);
            }
            for(let k=0;k<sectionNodes[i+1].length;k++){
                sectionNodes[i][j].addEdge(sectionNodes[i+1][k]);
                sectionNodes[i+1][k].addEdge(sectionNodes[i][j]);
            }            
        }
    }
    //now connect first 3 nodes of column 2 to column 4, and to all bottom connectors but the first.
    for(const columnNumber of [0,1])
    {
        for (let i=0;i<sectionNodes[columnNumber].length;i++){
            //to column 4
            if( columnNumber == 1 && canGoDirectlyTo(sectionNodes[columnNumber][i],sectionNodes[3][0],sectionNodes[2][0],"over")){
                sectionNodes[columnNumber][i].addEdge(sectionNodes[3][0]);
                sectionNodes[3][0].addEdge(sectionNodes[columnNumber][i]);
            }
            //to bottom connectors
            for(let j=0;j<aisleNodes.length;j++){
                if(i===0 || canGoDirectlyTo(sectionNodes[columnNumber][i],aisleNodes[j][aisleNodes[j].length - 1],sectionNodes[columnNumber][i-1],"under")){
                    sectionNodes[columnNumber][i].addEdge(aisleNodes[j][aisleNodes[j].length - 1]);
                    aisleNodes[j][aisleNodes[j].length - 1].addEdge(sectionNodes[columnNumber][i]);
                }
            }
        }
    }
}
//can you go in a straight line from node to target while staying on the correct side of through?
function canGoDirectlyTo(node,target,through,side){
    let [xs,ys] = [node.x,node.y];
    let [xf,yf] = [target.x,target.y];
    let m = (ys - yf)/(xs - xf);
    let b = (xs*yf - ys*xf)/(xs - xf);
    return side==="under"? m*through.x + b > through.y:m*through.x + b < through.y;
}

function assignNeighborsAndWeights(aisles) {
    for(var i = 0; i < aisles.length; i++) {
        for(var j = 0; j < aisles[i].length; j++) {

            //Check to see if the node is an end helper node, if so connect it to adjacent end helpers
            if(j == 0 || j == aisles[i].length-1) {
                if(i != 0) {
                    let index= j==0?0:aisles[i-1].length-1;
                    aisles[i][j].addEdge(aisles[i-1][index]);                    
                }
                if(i != aisles.length-1) {
                    let index= j==0?0:aisles[i+1].length-1;
                    aisles[i][j].addEdge(aisles[i+1][index]);
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
function storeNodes(aisles,sections) {
    startNode = new Node("start", 0, null, "top");
    startNode.setXY(0,0);
    exitNode = new Node("exit", 0, null, "bottom");
    exitNode.setXY(0,450);

    for(var i = 0; i < aisles.length; i++) {
        startNode.addEdge(aisles[i][0]);
        aisles[i][0].addEdge(startNode);
        // we no longer add edges to the exit because all bottomAisles are BLOCKED by the clothing section
    }

    for(var i = 0; i < sections.length;i++){
        sections[i][sections[i].length - 1].addEdge(exitNode);
        exitNode.addEdge(sections[i][sections[i].length - 1]);
    }
    
    var nodesDict = {};
    for(var i = 0; i < aisles.length; i++) {
        for(var j = 0; j < aisles[i].length; j++) {
            nodesDict[aisles[i][j].name] = aisles[i][j];
        }
    }
    for (const section of sections){
        for(const item of section){
            nodesDict[item.name]=item;
        }
    }
    nodesDict[startNode.name] = startNode;
    nodesDict[exitNode.name] = exitNode;

    var fs = require('fs');
    fs.writeFile("map.json", JSON.stringify(nodesDict), function(err, result) {
        if(err) console.log('error', err);
      });
}