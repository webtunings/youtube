/*
 * DOMReady registers a function that is invoked once DOM is ready
 * for manipulation and fully parsed
 * 
 * DOMReady(f,document) //f will be invoked as a method of document object, once DOM is ready
 * DOMReady(f) // general method that will be invoked once DOM is ready
 * 
 * if DOM is already ready or loaded, any method passed to DOMReady will be invoked immediately
 */

var DOMReady = (function(){
    //isDOMReady and methodList serves as a closure for eventHandler function and the returned function
    var isDOMReady = false;
    var methodList = [];
    
    //eventHandler will be attached to 3 types of events
    //document - readystatechange
    //document - DOMContentLoaded
    //window - load
    
    function eventHandler(event){
	//This handler needs to be run one time, earliest of DOMContentLoaded, load or readystatechange("complete")
	if(isDOMReady){
	    console.log('This handler is already handled. Now DOM is ready');
	    logMe(event);
	    return;
	}
	//Don't rely on readyState="interactive", It may happen before DOMContentLoaded
	if(event.type === "readystatechange" && document.readyState !== "complete"){
	    console.log('DOM is not fully loaded');
	    logMe(event);
	    return;
	}
	//invoke all methods/functions
	for(var i=0; i < methodList.length; i++){
	    if(Array.isArray(methodList[i])){
		methodList[i][0].call(methodList[i][1]);
	    }
	    else{
		methodList[i]();
	    }
	    console.log('method executed at this point');
	    logMe(event);
	}
	//DOM is ready
	isDOMReady = true;
    }
    
    //attach event handler to each kind of event
    document.addEventListener('readystatechange',eventHandler,false);
    document.addEventListener('DOMContentLoaded',eventHandler,false);
    window.addEventListener('load',eventHandler,false);
    
    function logMe(event){
	console.log('Name=' + event.type);
	console.log('Time=' + event.timeStamp);
	console.log('readyState=' + document.readyState);
	console.log('-------------------------------------');
    }
    
    return function(method,DOMObject){
	/*
	 * Example:
	 * DOMReady(childCount,document);
	 * DOMReady(imageCount);
	 */
	if(isDOMReady){
	    DOMObject === undefined ? method() : method.call(DOMObject);
	}
	else{
	    DOMObject === undefined ? methodList.push(method) : methodList.push([method, DOMObject]);
	}
    };    
})();

var childCount = function(){
    console.log(this.childNodes.length);
};

var imageCount = function(){
    console.log(document.getElementsByTagName('img').length);
};

DOMReady(childCount,document);
DOMReady(imageCount);