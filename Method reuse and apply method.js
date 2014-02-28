(function(){

    function init(){
       var collection = {
           length: 0,
           push: function(nodeList){Array.prototype.push.apply(this,nodeList);},
           addByTag: function(tag){this.push(document.getElementsByTagName(tag));}

       }


    collection.addByTag('p');
    collection.addByTag('h1');
    console.log(collection);
    //console.log(collection);
        //console.log(collection[2]);
        //console.log(collection[3]);

    console.log(collection.length);

    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function
