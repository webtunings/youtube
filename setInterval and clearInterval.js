//Immutable Timer Class, 
//Properties of instances are read only and non configurable - Immutable
//writable: false => Read Only
//configurable: false => Can not be deleted

//Timer Constructor
//obj - Object 
//start - start time of setInterval call
//interval - interval between invocation
function Timer(obj,start,interval){
    
    var PDO = {
        obj:{value:obj,enumerable:true,writable:false,configurable:false},
        start:{value:start,enumerable:true,writable:false,configurable:false},
        interval:{value:interval,enumerable:true,writable:false,configurable:false}
    };
Object.defineProperties(this,PDO);
}

// read property descrtiptor object of every property of object one by one
Timer.prototype.readPDO = function(props){
    console.log(Object.getOwnPropertyDescriptor(this.obj,props[0]));
    props.shift();
    if(props.length ===0){ clearInterval(this.clearID);}
};

Timer.prototype.demo = function(){
    //get owned properties
    var props = Object.getOwnPropertyNames(this.obj);
    //workaround for inner functions
    var self = this;
    setTimeout(function(){
    self.clearID = setInterval(function(){self.readPDO(props);},self.interval);
    },self.start);
};

//prevent any alteration of instance methods
(function(){
var PDO = {enumerable:false,writable:false,configurable:false};
Object.defineProperties(Timer.prototype,{readPDO:PDO,demo:PDO});
}());

var t = new Timer({x:1,y:2,z:3,p:100,q:'javascript',a:[1,2,3],b:true,c:null},10000,3000);
t.demo();