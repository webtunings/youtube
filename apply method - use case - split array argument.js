

//var str = String.fromCharCode(100,101,102,103,104);
//console.log(str);

function makeString(array){
    return String.fromCharCode.apply(null,array);
}

console.log(makeString([100,101,102,103,104,105]));

































