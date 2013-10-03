(function(){

    function init(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');

        var r =1;

        function draw(){

            c.beginPath();
            c.arc(650,450,r,0,2*Math.PI,false);
            r = r+0.4;
            c.save();
            c.clip();

            var img = document.getElementsByTagName('img')[0];
            c.drawImage(img,100,100);
            c.restore();
            if(r < 300){
                requestAnimationFrame(draw);
            }
        }

        requestAnimationFrame(draw);

    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function