(function(){

    function init(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');
        var r =1;
        var previousFrameTime = 0;


        function draw(time){
            var FPS = Math.floor(1000/(time - previousFrameTime));
            previousFrameTime = time;
            c.font = 'normal bold 4em courier';
            c.clearRect(0,0,canvas.width,canvas.height);
            c.fillText(FPS,200,200);
            c.beginPath();
            c.arc(650,450,r,0,2*Math.PI,false);
            r = r+2;
            c.save();
            c.clip();

            var img = document.getElementsByTagName('img')[0];
            c.drawImage(img,100,100);
            c.restore();
            if(r <= 300){
                if( r >=299){r=1;}
                requestAnimationFrame(draw);

            }
        }

        requestAnimationFrame(draw);

    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function