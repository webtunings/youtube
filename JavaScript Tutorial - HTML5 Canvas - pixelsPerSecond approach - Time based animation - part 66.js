(function(){

    function init(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');

   (function(){

       var distance =0;
       var velocity = 700; //700pixels/second
       var lastFrameRepaintTime =0;

       function drawCar(){
           c.save();
           c.lineWidth = 2;
           c.strokeStyle = 'orange';
           c.beginPath();
           c.arc(450,400,50,0,Math.PI,true);
           c.lineTo(250,400);
           c.arc(200,400,50,0,Math.PI,true);
           c.lineTo(130,400);
           c.quadraticCurveTo(200,260,270,400);
           c.moveTo(200,330);
           c.quadraticCurveTo(320,200,450,330);
           c.moveTo(380,400);
           c.quadraticCurveTo(450,260,520,400);
           c.lineTo(500,400);
           c.moveTo(300,390);
           c.lineTo(300,280);
           c.moveTo(280,330);
           c.arc(280,330,40,3*Math.PI/2,Math.PI,true);
           c.lineTo(280,330);
           c.moveTo(340,340);
           c.arc(340,340,65,3*Math.PI/2,0,false);
           c.lineTo(340,340);
           c.stroke();
           c.fillStyle = 'gray';
           c.beginPath();
           c.arc(450,400,38,0,2*Math.PI,false);
           c.stroke();
           c.beginPath();
           c.arc(200,400,38,0,2*Math.PI,false);
           c.stroke();
           c.restore();
       }
       function animate(time) {
           var frameGapTime = time - lastFrameRepaintTime;
           lastFrameRepaintTime = time;
           var translateX = velocity*(frameGapTime/1000);
           c.clearRect(0,0,canvas.width,canvas.height);
           drawCar();
           c.font = 'normal bold 4em courier';
           var translateXText = 'T=' + Math.round(translateX) + 'px';
           var velocityText = 'V=' + velocity + 'px/sec';
           var frameGapTimeText = 'FrameGap=' + Math.round(frameGapTime) + 'ms';
           c.fillText(translateXText,550,400);
           c.fillText(velocityText,550,500);
           c.fillText(frameGapTimeText,550,600);
           c.translate(translateX,0);
           distance +=translateX;
           if(distance <800){
           requestAnimationFrame(animate);
           }
       }

       lastFrameRepaintTime = window.performance.now();
       requestAnimationFrame(animate);

    }());




    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}()); //self invoking function