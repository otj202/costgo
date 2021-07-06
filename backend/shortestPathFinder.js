class QElement{
    constructor(element,priority){
        this.element=element;
        this.priority=priority;
    }
}

class PriorityQueue{
    constructor(){
        this.heap=[null];
    }
    isEmpty(){
        return this.heap.length == 1;
    }
    enqueue(node,priority){
  // creating object from queue element
        var qElement = new QElement(node, priority);
        this.heap.push(qElement);
    
    /* Finding the correct position for the new node */

        if (this.heap.length > 1) {
            let current = this.heap.length - 1
        
        /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
            while (current > 1 && this.heap[Math.floor(current/2)].priority > this.heap[current].priority) {
        
            /* Swapping the two nodes by using the ES6 destructuring syntax*/
                [this.heap[Math.floor(current/2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current/2)]]
                current = Math.floor(current/2)
            }
        }
    }

    dequeue(){
        let smallest = this.heap[1]
    
        /* When there are more than two elements in the array, we put the right most element at the first position
            and start comparing nodes with the child nodes
        */
        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length-1]
            this.heap.splice(this.heap.length - 1)
    
            if (this.heap.length === 3) {
                if (this.heap[1].priority > this.heap[2].priority) {
                    [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]]
                }
                return smallest.element;
            }
    
            let current = 1
            let leftChildIndex = current * 2
            let rightChildIndex = current * 2 + 1
    
            while (this.heap[leftChildIndex] &&
                    this.heap[rightChildIndex] &&
                    (this.heap[current].priority > this.heap[leftChildIndex].priority ||
                        this.heap[current].priority > this.heap[rightChildIndex].priority)) {
                if (this.heap[leftChildIndex].priority < this.heap[rightChildIndex].priority) {
                    [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
                    current = leftChildIndex
                } else {
                    [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]]
                    current = rightChildIndex
                }
    
                leftChildIndex = current * 2
                rightChildIndex = current * 2 + 1
            }
        }
        
        /* If there are only two elements in the array, we directly splice out the first element */
        
        else if (this.heap.length === 2) {
            this.heap.splice(1, 1)
        } else {
            return null
        }
    
        return smallest.element;
  
    }
}

class ShortestPathFinder{
    constructor(){
        let jason=require("./map.json");
        console.log("the json object:",jason);
        this.map=jason;
    }

    //@param items
    //array of strings of names of items of shopping cart
    getShortestPath(items){
        //Start path on start node
        let curItem = this.map.start; //curItem is a node
        let path = ["start"]; //array of strings of names of items

        while(items.length > 0) {
            let dists = this.dijkstras(curItem, items);
            let nextItem = this.searchForShortestItem(dists,items);
            let pathToNextItem = [nextItem];
            let curPathNode = nextItem;
            while(dists[curPathNode].parent !== curItem.name) {
                curPathNode = dists[curPathNode].parent;
                pathToNextItem.unshift(curPathNode);       
            }   

            Array.prototype.push.apply(path, pathToNextItem)

            curItem = this.map[nextItem];

            //remove current item from items
            const index = items.indexOf(curItem.name);
            if (index > -1) {
                items.splice(index, 1);
            }
        }
        path.push("bottomAisle"+this.map[path[path.length - 1]].aisle);
        path.push("exit")
        return path;
    }
    dijkstras(node){
        let dists={};
        dists[node.name]={dist:0,parent:null};
        let pq= new PriorityQueue();
        pq.enqueue(node.name,0);
        while (!pq.isEmpty()){
            let dq=pq.dequeue();
            let curr=this.map[dq];
            for(const n of Object.keys(curr.neighbors)){
                if(dists[n] === undefined || dists[n].dist > dists[curr.name].dist + curr.neighbors[n])
                {
                    dists[n] = {dist: dists[curr.name].dist + curr.neighbors[n],parent:curr.name};
                    pq.enqueue(n,dists[n].dist);
                }
            }
        }
        return dists;
        //in a loop, continually visit the closest unvisited node to root, relaxing all its neighbors.


    }
    searchForShortestItem(dists,items){
        var item; 
        var minDistance = Number.MAX_VALUE; 

        for(let i = 0; i < items.length; i++){
            if(dists[items[i]].dist < minDistance){
                item = items[i]; 
                minDistance = dists[items[i]].dist;
            }
        }
        
        return item;
    }
}

function equals(list1,list2){
    if(list1.length != list2.length){
        return false;
    }
    for(i=0;i<list1.length;i++){
        if(list1[i] != list2[i]){
            return False;
        }
    }
    return true;
}
function testShortestPathFinder(){
    let tests = [
        {items:["Juices","Bread"],shortestPath:[]},
        {items:["Chips","Nuts","Candy","CannedFish"],shortestPath:[]},
        {items:["ProteinPowder","Tea","Coffee","Oats","DriedFruit"],shortestPath:[]},
        {items:["Olives","Beans","Oil","Rice","Tea","NutBars"],shortestPath:[]},
        {items:["BabyProducts","ChildSupplements","Condiments","Coffee","Sugar","PeanutButter","Cereal"],shortestPath:[]}
    ]
    let spf = new ShortestPathFinder();
    for (const test of tests){
        let path=spf.getShortestPath(test.items);
        console.log("found the path:",path);
        if(!equals(path,test.shortestPath)){
            console.log("failed this test!:",test);
        } 
        else{
            console.log("test passed");
        }
    }
}
testShortestPathFinder();