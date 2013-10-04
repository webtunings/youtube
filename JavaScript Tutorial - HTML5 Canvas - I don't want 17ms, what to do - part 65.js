(function(){

    function init(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');
        var animationStartTime =0;

        c.fillStyle = 'hsl(25,100%,50%)';
        c.font = 'normal bold 2em "Lucida Console"';

        var text = 'Each FrameRequestCallback object has a cancelled boolean flag.';
        var i=1;
        //time - next repaint time - HRT
        function draw(time){
            c.fillText(text.substr(0,i),100,400);
            if(time - animationStartTime > 100){
                animationStartTime = time;
                i++;
            }
            if( i <= text.length){
            requestAnimationFrame(draw);   // 17ms
            }
        }


        function start(){
            animationStartTime = window.performance.now();
            requestAnimationFrame(draw);
        }

        start();
    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function