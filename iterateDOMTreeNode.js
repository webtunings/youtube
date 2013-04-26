function iterateDOMTree(node){
console.log(node);
for(node=node.firstChild; node!==null; node=node.nextSibling){
iterateDOMTree(node);
}
}