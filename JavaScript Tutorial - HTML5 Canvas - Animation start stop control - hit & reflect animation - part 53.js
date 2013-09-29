(function(){

    function init(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');
        var cancelMe = "";
        var container = {x:100,y:100,width:1200,height:800};
        var circles = [{x:400,y:400,r:50,color:25,vx:6,vy:10},
            {x:500,y:300,r:100,color:125,vx:2,vy:-8},
            {x:800,y:350,r:25,color:285,vx:20,vy:-20},
            {x:800,y:700,r:75,color:325,vx:13,vy:-8},
            {x:400,y:500,r:120,color:175,vx:-4,vy:-6}
        ];

        c.fillRect(container.x,container.y,container.width,container.height);

        function draw(){
            c.fillStyle = 'black';
            c.strokeStyle = 'black';
            c.fillRect(container.x,container.y,container.width,container.height);
            //c.clearRect(container.x,container.y,container.width,container.height);
            //c.strokeRect(container.x,container.y,container.width,container.height);

            for(var i=0; i <circles.length; i++){
                c.fillStyle = 'hsl(' + circles[i].color + ',100%,50%)';
                c.beginPath();
                c.arc(circles[i].x,circles[i].y,circles[i].r,0,2*Math.PI,false);
                c.fill();

                if((circles[i].x + circles[i].vx + circles[i].r > container.x + container.width) || (circles[i].x - circles[i].r + circles[i].vx < container.x)){
                    circles[i].vx = - circles[i].vx;
                }
                if((circles[i].y + circles[i].vy + circles[i].r > container.y + container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)){
                    circles[i].vy = - circles[i].vy;
                }
                circles[i].x +=circles[i].vx;
                circles[i].y +=circles[i].vy;
            }
            cancelMe = requestAnimationFrame(draw);
        }


        function startAnimation(event){
            if(this.textContent === "Start"){
                requestAnimationFrame(draw);
                this.textContent = 'Pause';
            }
            else{
                cancelAnimationFrame(cancelMe);
                this.textContent = 'Start';

            }

        }

        var startButton = document.getElementById('startButton');
        startButton.addEventListener('click',startAnimation,false);
    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function