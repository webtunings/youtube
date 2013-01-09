var queryStringObject = function(){
var obj = {};
if(location.search){
var a = location.search.substring(1).split('&');
var length = a.length;
var tempStorage;
for(var index=0; index <length; index++){
tempStorage = a[index].split('=');
obj[tempStorage[0]] = decodeURIComponent(tempStorage[1]);
}
}
return obj;
}

