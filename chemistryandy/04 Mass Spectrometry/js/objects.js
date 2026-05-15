// vDial.setAttribute("transform", "translate(10 270) scale(0.7 0.7) rotate("+ 45 + ", 100, 100)");
// GSAP solution
gsap.set("#vDial", {transformOrigin:"50% 50%"})
var rotationSnap = 45;
Draggable.create("#vDial", {
   type: "rotation", 
   transformOrigin:"50% 50%",
   bounds: {
    minRotation: 0,
    maxRotation: 355,
  },
   inertia:true,
   lockAxis: true,
   snap:function(endValue) { 
    //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. 
    //In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
    return Math.round(endValue / rotationSnap) * rotationSnap;
    },
    onDrag:function() {
        mark = carbonReference() + 125 - parseFloat(carbonRef.getAttribute("cx"));
        TweenMax.to('#cRef', 0.5, { x : mark});
        C12mark['innerText' in C12mark ? "innerText" : "textContent"] = "C12: " + carbonReference() + " cm";
        velSel = Math.round(vDialAOR()*10)/10;
	}
});
var vDial = document.getElementById("vDial");
// Initiate scale values
var initialScale = vDial.getCTM().a;
// Obtain value of velocitySelector dial setting using rotation of vDial
var velSel = 0;
var vDialAOR = function(){
    if(vDial.getCTM().b > 0){
        // return Math.round((Math.acos(vDial.getCTM().a/initialScale)/Math.PI*180/360*8%8)*10)/10;
        velSel = Math.round((Math.acos(vDial.getCTM().a/initialScale)/Math.PI*180/360*8%8)*10)/10;;
    } else {
        // return Math.round(((360 - Math.acos(vDial.getCTM().a/initialScale)/Math.PI*180)/360*8%8)*10)/10;
        velSel = Math.round(((360 - Math.acos(vDial.getCTM().a/initialScale)/Math.PI*180)/360*8%8)*10)/10;;
    }
    if( Math.abs(velSel - 8.0) < 0.03 ){
        velSel = 0.0;
    }
    return velSel;
}

var carbonReference = function(){
    return Math.floor(2*vDialAOR()*12/B*100)/100;
}
carbonRef = document.getElementById("carbonRef");
C12mark = document.getElementById("C12mark");
cRef = document.getElementById("cRef");