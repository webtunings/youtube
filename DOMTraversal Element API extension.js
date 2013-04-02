/*
e has 5 child elements(excluding text/comment)
e has 8 child nodes (including text/comment nodes)
e.getChildren(0) - 1st child element
e.getChildren(3,false) - 4th child element
e.getChildren(3,true) - 4th child node
e.getChildren(7,false) - Error 'Invalid child number'
e.getChildren(7,true) - 8th child node
e.getChildren(8,true) - Error 'Invalid child number'
e.getChildren(-1) - last child element
e.getChildren(-1,true) - last child node
*/

Element.prototype.getChildren = function(n,includeTextComment){
    //check for Integer number
    if(typeof n !== "number" || parseFloat(n) !== parseInt(n,10) || isNaN(n)){
        throw new Error('Non Integer not allowed');
    }
    //store it in local variable - NodeList object
    //children is defined on the Element class
    //childNodes is defined on the Nodes class and includes text,comments
   
    // if second argument is not passed or false
    if(includeTextComment === undefined || includeTextComment === false){
        // We just need element objects
        var children = this.children;
    }
    else{
        if(typeof includeTextComment !== "boolean")
            {
                throw new Error('Second argument should be a boolean value');
            }
            else{
                //we need all nodes including text and comments
                var children = this.childNodes;
            }
         }
   
    // -1: lastChild
    if(n <0){
        n += children.length;
    }
    //throw error in case the requested child number is greater than total number of children elements
    if(n > children.length-1 || n <0){
        throw new Error('Invalid child number');
    }
    return children[n];
};



/*
 * Return nth sibling element or node
 * e.getSibling(0) - same element
 * e.getSibling(2,false) - 2nd next sibling element
 * e.getSibling(2,true)  - 2nd next sibling node
 * e.getSibling(-1) - previous sibling element
 * e.getSibling(-3,true) - previous 3rd sibling node
 *
 */

Element.prototype.getSibling = function(n,includeTextComment){
//this is element object
    var node = this;
  //check for Integer number
    if(typeof n !== "number" || parseFloat(n) !== parseInt(n,10) || isNaN(n)){
        throw new Error('Non Integer not allowed');
    }
    //if second argument is not passed or false
    if(includeTextComment === undefined || includeTextComment === false){
        //nth next sibling element
        if (n >= 0) {
            while (node && n > 0) {
                node = node.nextElementSibling;
                n--;
            }
        }
        //nth previous sibling element
        else{
            while(node && n <0){
                node = node.previousElementSibling;
                n++;
            }
        }
    }
    else{
        if(typeof includeTextComment !== "boolean")
            {
                throw new Error('Second argument should be a boolean value');
            }
            else{
                //nth next sibling node
                if(n >=0){
                while(node && n >0){
                    node = node.nextSibling;           
                    n--;
                }
                }
                //nth previous sibling node
                else{
                    while(node && n <0){
                node = node.previousSibling;
                n++;
            }
                }
               
            }
    }
    return node;
};


Element.prototype.getchildElements = function(tagName){
    var childElements = this.children;
    var elementList = [];
    
    for(var i=0; i <childElements.length; i++){
        if(childElements[i].nodeName === tagName.toUpperCase()){
            elementList.push(childElements[i]);
        }
    }
    return elementList;
};
