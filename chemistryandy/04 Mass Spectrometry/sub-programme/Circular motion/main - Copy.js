circ = document.getElementById("circ");

v = 1;
pRadius = 211; 
omega = v/pRadius;
var t = new Date();

animate = function(){
    x = parseFloat(circ.getAttribute("cx"));
    y = parseFloat(circ.getAttribute("cy"));
    // circ.setAttributeNS(null, 'cx', 122 + pRadius + pRadius*Math.sin( omega*(new Date().getTime() - t) + 3*Math.PI/2 ) );
    // circ.setAttributeNS(null, 'cy', 430 + pRadius*Math.cos( omega*((new Date().getTime() - t)) + 3*Math.PI/2 ) );
    circ.setAttributeNS(null, 'cx', 122 + pRadius + pRadius*Math.sin( omega*(new Date() - t) + 3*Math.PI/2 ) );
    circ.setAttributeNS(null, 'cy', 430 + pRadius*Math.cos( omega*((new Date() - t)) + 3*Math.PI/2 ) );
    requestAnimationFrame(animate);
}
animate();