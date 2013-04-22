function countKey(key){
var pattern = new RegExp(key,"gi");
var match = document.body.textContent.match(pattern);
if(match === null){ return 0;}
else{ return match.length;}
}