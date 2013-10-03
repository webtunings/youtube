(function(){

    function init(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');

        c.fillStyle = 'hsl(25,100%,50%)';
        c.font = 'normal bold 2em "Lucida Console"';

        var text = 'Each FrameRequestCallback object has a cancelled boolean flag.';
        var i=1;

        function draw(){
            c.fillText(text.substr(0,i),100,400);
            i++;
            if(i < text.length){
                requestAnimationFrame(draw);
            }
        }

        requestAnimationFrame(draw);

    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function