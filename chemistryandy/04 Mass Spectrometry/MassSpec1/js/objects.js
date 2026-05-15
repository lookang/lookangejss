// vDial.setAttribute("transform", "translate(10 270) scale(0.7 0.7) rotate("+ 45 + ", 100, 100)");
// GSAP solution
var rotationSnap = 45;
Draggable.create("#vDial", {
   type: "rotation", 
   lockAxis: true,
   snap:function() { 
    //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
        return Math.round(vDialAOR()/360*Math.PI / rotationSnap) * rotationSnap;
    },
    onDragEnd:function() {
        document.getElementById("vDialReadout").remove();
        var readout = document.createElementNS(svgns, 'text');
        readout.setAttributeNS(null, 'x', 60);
        readout.setAttributeNS(null, 'y', 260);
        var textNode = document.createTextNode("v = "+ Math.round(vDialAOR()*10)/10 );
        readout.appendChild(textNode);
        readout.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
        readout.setAttributeNS(null, 'font-size', '20pt' );
        svg.appendChild(readout);
        readout.setAttributeNS(null, 'id', "vDialReadout");
        vSel = Math.round(vDialAOR()*10)/10;
        // vDial.setAttribute("transform", "translate(10 270) scale(0.7 0.7) rotate("+ Math.round(vDialAOR() / rotationSnap) * rotationSnap +")");
	}
});


// Initiate scale values
var initialScale = vDial.getCTM().a;
// Obtain value of velocitySelector dial setting using rotation of vDial
var vDialAOR = function(){
    if(vDial.getCTM().b > 0){
        return (Math.acos(vDial.getCTM().a/initialScale)/Math.PI*180/360*8%8+1);
    } else {
        return ((360 - Math.acos(vDial.getCTM().a/initialScale)/Math.PI*180)/360*8%8+1);
    }
}
    
