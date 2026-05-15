var slideflag = false;

function slideout(){

    slideflag = !slideflag;
    
    var sb = document.getElementById("slider-bar");
    var sb2 = document.getElementById("slider-guide");

    if (slideflag){
        sb.style.width = "18%";
        sb2.style.right = "18%";
        sb2.innerText = "X";
    } else {
        sb.style.width = "0%";
        sb2.style.right = "0%";
        sb2.innerText = "☰";
    }
}


var p1 = document.getElementById("period1");  
var p2 = document.getElementById("period2");  
var p3 = document.getElementById("period3");  
var p4 = document.getElementById("period4");  
var p5 = document.getElementById("period5");  
var p6 = document.getElementById("period6");  
var p7 = document.getElementById("period7");  
var p8 = document.getElementById("TE");  
var p9 = document.getElementById("LAC");



p1.addEventListener('change', function(){
    updateChart();
});

p2.addEventListener('change', function(){
    updateChart();
});

p3.addEventListener('change', function(){
    updateChart();
});

p4.addEventListener('change', function(){
    updateChart();
});

p5.addEventListener('change', function(){
    updateChart();
});

p6.addEventListener('change', function(){
   updateChart();
});

p7.addEventListener('change', function(){
    updateChart();
});

p8.addEventListener('change', function(){
    updateChart();
});

p9.addEventListener('change', function(){
    updateChart();
});

