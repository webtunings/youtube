//JSONStorage Class
function JSONStorage(){
    this.storage = {};
    this.count = 0;
    //Constructor Overloading
    if(arguments.length === 1 && (JSONStorage.checkArrayLike(arguments[0]) || Array.isArray(arguments[0])))
        {
         this.addJSON.apply(this,arguments[0]);
        }
    else{
        if (arguments.length > 0){
        this.addJSON.apply(this,arguments);
    }
}
}

JSONStorage.prototype.addJSON = function(){
var argumentLength = arguments.length;
for(var i=0; i <argumentLength;i++){
        var propName = arguments[i].generateID;
        if(!this.storage.hasOwnProperty(propName)){
            this.storage[propName] = JSON.stringify(arguments[i],JSONStorage.replacer);
            this.count++;
        }    
        }
console.log(this.toString());
return this;
};

JSONStorage.prototype.removeJSON = function(){
var argumentLength = arguments.length;
for(var i=0; i < argumentLength; i++){
    var propName = arguments[i].generateID;
    if(this.storage.hasOwnProperty(propName)){
        delete this.storage[propName];
        this.count--;      
    }
   }
console.log(this.toString());
return this;
};

JSONStorage.prototype.getCount = function(){return this.count;};

JSONStorage.prototype.foreach = function(f){
    for(prop in this.storage){
        if(this.storage.hasOwnProperty(prop)){
            f(this.storage[prop],prop);
        }
    }
};


JSONStorage.prototype.toString = function(){
    var str = "";
    this.foreach(function(value,prop){
                  str += prop + '=' + value + '\n';
    });
    return str;
};

JSONStorage.prototype.toArray = function(){
    var a = [];
    this.foreach(function(value){a.push(value);});
    return a;
};

JSONStorage.prototype.toJSON = JSONStorage.prototype.toArray;


JSONStorage.prototype.search = function(value){
    if(value !== null && typeof(value) === "object"){
        var value = value.generateID; //js2.search(o3)
    }
    //else looking for property or key match - for isEqual() method
    if(this.storage.hasOwnProperty(value)){
        return true;
    }
    else{
        return false;
    }
};


JSONStorage.prototype.isEqual = function(js){
    
    if(js.getCount() !== this.getCount()){
        return false;
    }
    try{
    this.foreach(function(value,key){
                          if(js.search(key) === false){throw false;} 
                 }); 
    return true;
    }
    catch(e){
        if(e === false){return false;}
        throw e;
    }    
};
(function(){
var obj = {writable:false,enumerable:false,configurable:false};
var methods = ["addJSON","foreach","getCount","isEqual","removeJSON","search","toArray","toString","toJSON"];
var descriptorObject = {};
for(var i=0; i <methods.length;i++){
    descriptorObject[methods[i]] = obj;
}
    Object.defineProperties(JSONStorage.prototype,descriptorObject);
}());


JSONStorage.checkArrayLike = function(a){
if(a && typeof(a)==="object" && !Array.isArray(a) && a.length>0 && a.length===Math.floor(a.length) && isFinite(a.length))
{
var intCheck = /^\d+$/;
for(prop in a){
               if(prop === "length") continue;
               if(!intCheck.test(prop)){ return false;}
             }
return true;
}
return false;
};

(function(){
Object.defineProperty(Object.prototype,"generateID",
    {
    get: getID,
    enumerable: false,
    configurable: false
    });
    
 function getID(){
    if(!this.hasOwnProperty(objectKey)){
      Object.defineProperty(this,objectKey,{
          value: _ID++,
          writable: false,
          enumerable: false,
          configurable: false
      });
    }
    return this[objectKey];
    
}

var _ID = 0;
var objectKey = '$$ID$$';
}());
JSONStorage.replacer = function(key,value){
                            if(key === JSONStorage.objectKey){return undefined;}
                            else{return value;}                
            };
            
            
//DateJSONStorage
function DateJSONStorage(){
    JSONStorage.apply(this,arguments);
}

DateJSONStorage.prototype = Object.create(JSONStorage.prototype,{
   constructor: {value:DateJSONStorage},
   addJSON: {value: function(){
                               for(var i=0; i <arguments.length;i++){
                                   if(!(arguments[i] instanceof Date)){
                                       throw new Error('only Date object accepted');
                                   }
                               }
                           return JSONStorage.prototype.addJSON.apply(this,arguments);
   }}
   
});

function FilteredJSONStorage(parent,f){
   var construct = function(){
       parent.apply(this,arguments);
   };
   construct.prototype = Object.create(parent.prototype,
     {
      constructor:{value:construct},
      addJSON: {value: function(){
                                  for(var i=0; i<arguments.length;i++){
                                      if(!f(arguments[i])){
                                          throw new Error('Invalid class');
                                      }
                                  }
                                  parent.prototype.addJSON.apply(this,arguments);
      }}});
      return construct;
     }
            
                 
//------------------------------------------------------------------------------//

var o1 = {x:{a:1,b:2},y:2};
var o2 = {a:[1,2,3],b:true,c:null};
var o3 = {a:100,b:'str'};
var o4 = {name:"praveen"};
var o5 = {p:1};
var o6 = {q:1};
var d1 = new Date();
var d2 = new Date();
var js = new JSONStorage(o1);
js.addJSON(o2);
js.addJSON(o3,o4);
js.removeJSON(o3);
//negative test
js.addJSON(o1);
//negative test
js.removeJSON(o3);
js.addJSON(o5,o6).removeJSON(o4);

console.log(js.toString());
console.log(js.toArray());
console.log(JSON.stringify(js));
console.log(js.search(o1));
console.log(js.search(o2));
console.log(js.search(o3));
console.log(js.search(o4));
console.log(js.search(o5));
console.log(js.search(o6));

var js2 = new JSONStorage(o6,o5,o1,o2);
var js3 = new JSONStorage(o6,o1);
console.log(js2.search(o1));
console.log(js2.search(o2));
console.log(js2.search(o3));
console.log(js2.search(o4));
console.log(js2.search(o5));
console.log(js2.search(o6));

console.log(js.isEqual(js2));  //true
console.log(js2.isEqual(js));  //true
console.log(js.isEqual(js3));  //false
console.log(js3.isEqual(js));  //false
console.log(js2.isEqual(js3)); //false
console.log(js3.isEqual(js2)); //false
console.log(js2.isEqual(js2)); //true
var arrayLikeObject = {"0":o1,"1":o4,"2":o6,"length":3};
var js4 = new JSONStorage(arrayLikeObject);
console.log(JSONStorage.checkArrayLike(arrayLikeObject));
console.log(JSONStorage.checkArrayLike(o1));
var arrayLikeObject2 = {"0":{x:1},"1":{channel: "webtunings",type:"education"},"length":2};
var js5 = new JSONStorage(arrayLikeObject2);
var j6 = new JSONStorage([o1,o2,o3,o4,o5,o6]);
var j7 = new DateJSONStorage(d1,d2);
try{
   var j8 = new DateJSONStorage(o1);
} 
catch(e){console.log(e.message);}
var filterDate = function(obj){ return (obj instanceof Date);};
var DateJSON = FilteredJSONStorage(JSONStorage,filterDate);
var j9 = new DateJSON(d1);
try{
var j10 = new DateJSON(o1);
}
catch(e){
    console.log(e.message);
}
function Test(x,y){
    this.x=x;
    this.y=y;
}
var t = new Test(11,66);
var filterTest = function(obj){ return (obj instanceof Test);};
var TestJSON = FilteredJSONStorage(JSONStorage,filterTest);
var j11 = new TestJSON(t);
try{
var j12 = new TestJSON(d1);
}
catch(e){
    console.log(e.message);
}

