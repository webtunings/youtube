(function(){

    function init(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');

        var img = document.getElementsByTagName('img')[0];
        var velocity = 400; //400pixels/second
        var distance =0;
        var lastFrameRepaintTime =0;

        function calcOffset(time){
            var frameGapTime = time - lastFrameRepaintTime;
            lastFrameRepaintTime = time;
            var translateX = velocity*(frameGapTime/1000);
            return translateX;
        }
        function draw(time){
           distance += calcOffset(time);
            if(distance > img.width){distance =0;}
            c.clearRect(0,0,canvas.width,canvas.height);
            c.save();
            c.translate(distance,0);
            c.drawImage(img,0,0);
            c.drawImage(img,-img.width+1,0);

            requestAnimationFrame(draw);


            c.restore();
        }
        function start(){
            lastFrameRepaintTime = window.performance.now();
            requestAnimationFrame(draw);
        }

        start();


    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function