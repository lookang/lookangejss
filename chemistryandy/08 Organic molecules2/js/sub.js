var c = document.getElementById("HUD");
var ctx = c.getContext("2d");


let lbsCH4 = function(){
    ctx.clearRect(0, 0, canv.width, canv.height);  

    ctx.beginPath();  
    ctx.moveTo( (0.5 - Math.sqrt(3)*0.1)*canv.width, 0.45*canv.height );  
    ctx.lineTo( (0.5 - Math.sqrt(3)*0.1)*canv.width, 0.65*canv.height );  
    ctx.stroke();  

    ctx.beginPath();  
    ctx.moveTo( (0.5 + Math.sqrt(3)*0.1)*canv.width, 0.45*canv.height );  
    ctx.lineTo( (0.5 + Math.sqrt(3)*0.1)*canv.width, 0.65*canv.height );  
    ctx.stroke();  

    ctx.beginPath();  
    ctx.moveTo( (0.5 - Math.sqrt(3)*0.1)*canv.width, 0.45*canv.height );  
    ctx.lineTo( 0.5*canv.width,0.35*canv.height );  
    ctx.stroke();  

    ctx.beginPath();  
    ctx.moveTo( (0.5 + Math.sqrt(3)*0.1)*canv.width, 0.45*canv.height );  
    ctx.lineTo( 0.5*canv.width,0.35*canv.height );  
    ctx.stroke();  

    ctx.beginPath();  
    ctx.moveTo( 0.5*canv.width, 0.75*canv.height );  
    ctx.lineTo( (0.5 + Math.sqrt(3)*0.1)*canv.width,0.65*canv.height );    
    ctx.stroke();  

    ctx.beginPath();  
    ctx.moveTo( 0.5*canv.width, 0.75*canv.height );  
    ctx.lineTo( (0.5 - Math.sqrt(3)*0.1)*canv.width,0.65*canv.height );    
    ctx.stroke();  

    ctx.beginPath();
    ctx.arc(0.5*canv.width, 0.5*canv.height, 0.5*canv.height, 0, 2 * Math.PI);
    ctx.stroke();


}


// window.addEventListener('resize', resizeCanvas2, false);
// function resizeCanvas2() {
//     ctx.width = window.innerWidthd;
//     ctx.height = window.innerHeight;
//     redraw();
// }

lbsCH4();