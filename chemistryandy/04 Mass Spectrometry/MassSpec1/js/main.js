var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementsByTagName('svg')[0]; //Get svg element
var vDial = document.getElementById('vDial')
var vSel = 1.0;
var numMole = 30;
var v = 4;
var MIcount = 0;
var B = 1;

var pauseTimer = 0;
var pRadius;

var Cu_counter = [ 0, 0];

// Magnetic fields at Deflection Chamber
for(var i = 0; i < 11; i++){  //each row of 10
    for(var j = 0; j < 6; j++){
        //Magnetic field out of paper
        // dot = document.createElementNS(svgns, 'circle');
        // dot.setAttributeNS(null, 'cx', 194 + 69*i);
        // dot.setAttributeNS(null, 'cy', 434 + 58*j);
        // dot.setAttributeNS(null, 'r', 2);
        // dot.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
        // svg.appendChild(dot);

        //Magnetic field into paper
        dot = document.createElementNS(svgns, 'text');
        dot.setAttributeNS(null, 'x', 194 + 69*i);
        dot.setAttributeNS(null, 'y', 434 + 58*j);
        var textNode = document.createTextNode("x");
        dot.appendChild(textNode);
        dot.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
        svg.appendChild(dot);
    }
}
// Magnetic fields at Velocity selector
for(var i = 0; i < 2; i++){  //each row of 10
    for(var j = 0; j < 4; j++){
        //Magnetic field out of paper
        // dot = document.createElementNS(svgns, 'circle');
        // dot.setAttributeNS(null, 'cx', 194 + 69*i);
        // dot.setAttributeNS(null, 'cy', 434 + 58*j);
        // dot.setAttributeNS(null, 'r', 2);
        // dot.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
        // svg.appendChild(dot);

        //Magnetic field into paper
        dot = document.createElementNS(svgns, 'text');
        dot.setAttributeNS(null, 'x', 160 + 30*i);
        dot.setAttributeNS(null, 'y', 300 + 30*j);
        var textNode = document.createTextNode("x");
        dot.appendChild(textNode);
        dot.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
        svg.appendChild(dot);
    }
}

//vDial Readout
var readout = document.createElementNS(svgns, 'text');
readout.setAttributeNS(null, 'x', 60);
readout.setAttributeNS(null, 'y', 260);
var textNode = document.createTextNode("v = 1.0");
readout.appendChild(textNode);
readout.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
readout.setAttributeNS(null, 'font-size', '20pt' );
svg.appendChild(readout);
readout.setAttributeNS(null, 'id', "vDialReadout");

// Heater
var q = document.getElementById("heater")
var r = document.getElementById("heatingglow")
var heating = false;
var ionising = false;
var electronCount = 0;

function onHeater(){
    heating = !heating;
    if (heating){
        // Heating
        q.style.stroke = "red";
        q.setAttribute("stroke-width",5);
        r.setAttribute("fill","red");
        for(let i = 0;i < numMole; i++){
            molecule = document.createElementNS(svgns, 'circle');
            molecule.setAttributeNS(null, 'cx', (Math.floor(Math.random()*168) + 96) );
            molecule.setAttributeNS(null, 'cy', (Math.floor(Math.random()*96) + 15) );
            molecule.setAttributeNS(null, 'r', 4);
            molecule.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
            molecule.setAttributeNS(null, 'id', "molecule"+i);
            molecule.setAttributeNS(null, 'vx', v * (Math.random()-0.5) );
            molecule.setAttributeNS(null, 'vy', v * (Math.random()-0.5) );
            svg.appendChild(molecule);
        }
    }else{
        // Not heating
        q.style.stroke = "blue";
        q.setAttribute("stroke-width",1);
        r.setAttribute("fill","none");
        for(let i = 0;i < numMole; i++){
            molecule = document.getElementById("molecule"+i);
            molecule.remove();
        }
    }
}

function onIoniser(){
    ionising = !ionising;
}

function clearAnalyser(){
    if(MIcount > 0){
        for (var i = 0; i < MIcount; i++){
            MI = document.getElementById("MI"+i);
            MI.remove();
        }
        MIcount = 0;
    }
}


var circles = false;
function animate(){
    pauseTimer += 1;
    if( heating){
        for(var i =0; i<numMole;i++){
            molecule = document.getElementById("molecule"+i);
            // Horizontal motion
            if (parseFloat(molecule.getAttribute("cx"))+parseFloat(molecule.getAttribute("vx")) > 99 && parseFloat(molecule.getAttribute("cx"))+parseFloat(molecule.getAttribute("vx")) < 266){
                molecule.setAttributeNS(null, 'cx',parseFloat(molecule.getAttribute("cx"))+parseFloat(molecule.getAttribute("vx")));
            } else {
                molecule.setAttributeNS(null, 'vx', -parseFloat(molecule.getAttribute("vx")) );
            }
            // Vertical motion
            if (parseFloat(molecule.getAttribute("cy"))+parseFloat(molecule.getAttribute("vy")) > 12 && parseFloat(molecule.getAttribute("cy"))+parseFloat(molecule.getAttribute("vy")) < 111){
                molecule.setAttributeNS(null, 'cy',parseFloat(molecule.getAttribute("cy"))+parseFloat(molecule.getAttribute("vy")));
            } else {
                molecule.setAttributeNS(null, 'vy', -parseFloat(molecule.getAttribute("vy")) );
            }
            if (vSel-1 > 0.1 && ionising){
                // Heater on, ionising steam on, vSel Dial is on, create stream of molecular ions using vSel speed
                // when molecules are close to exit
                if ( pauseTimer%60 > 3 ){
                    if (parseFloat(molecule.getAttribute("cx")) > 166 && parseFloat(molecule.getAttribute("cx")) < 191){
                        if (Math.abs(parseFloat(molecule.getAttribute("cy")) - 113) < 3 ){
                                MI = document.createElementNS(svgns, 'circle');
                                MI.setAttributeNS(null, 'cx', 178 );
                                MI.setAttributeNS(null, 'cy', 113 );
                                MI.setAttributeNS(null, 'r', 4);
                                MI.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
                                MI.setAttributeNS(null, 'id', "MI" + MIcount);
                                MI.setAttributeNS(null, 'm_e', (Math.random() < 0.692) ? 62.930 : 64.928 );
                                // MI.setAttributeNS(null, 'vy', vSel/10 );
                                svg.appendChild(MI);     
                                MIcount += 1;  
                                pauseTimer = 0;           
                            }
                        }
                    }
            }
        }

        if(MIcount > 0){
            for (var i1 = 0; i1 < MIcount; i1++){
                MI = document.getElementById("MI"+i1);
                // Ioniser animation 
                if( parseFloat(MI.getAttribute("cy"))+vSel > 160 && parseFloat(MI.getAttribute("cy"))+vSel < 403.5 && ionising && Math.abs(parseFloat(MI.getAttribute("cx")) - 178) < 1 ){
                    MI.setAttributeNS(null, 'style', 'fill: blue; stroke: none; stroke-width: 1px;' );
                    MI.setAttributeNS(null, 'r', 2);
                }
                // Movement in plate region
                if(Math.abs(parseFloat(MI.getAttribute("cx")) - 178) < 1 && parseFloat(MI.getAttribute("cy")) <  403.5){
                    MI.setAttributeNS(null, 'cy',parseFloat(MI.getAttribute("cy"))+vSel);
                } else if(parseFloat(MI.getAttribute("cy")) >=  403.5) {
                // Movement in deflection region
                    pRadius = parseFloat(MI.getAttribute("m_e"))/B*vSel; 
                    MI.setAttributeNS(null, 'cx',parseFloat(MI.getAttribute("cx")) + vSel * ( parseFloat(MI.getAttribute("cy")) - 403.5 ) / pRadius   );
                    MI.setAttributeNS(null, 'cy',parseFloat(MI.getAttribute("cy")) + vSel * ( 178 + pRadius - parseFloat(MI.getAttribute("cx")) ) / pRadius  );
                } else {
                // Capture on screen
                    MI.setAttributeNS(null, 'style', 'fill: yellow; stroke: none; stroke-width: 1px;' );
                    if ( parseFloat(MI.getAttribute("m_e")) < 63 ){
                        Cu_counter[0] += 1;
                    } else {
                        Cu_counter[1] += 1;
                    }
                    console.log(Math.floor(Cu_counter[0]/(Cu_counter[0]+Cu_counter[1])*1000)/1000,Math.floor(Cu_counter[1]/(Cu_counter[0]+Cu_counter[1])*1000)/1000);
                }                   
            }
        }
    } 

    if(ionising){
        // Randomly produce and place electrons
        if (electronCount < 25 && Math.random() > 0.85){
            electron = document.createElementNS(svgns, 'circle');
            electron.setAttributeNS(null, 'cx', 162 );
            electron.setAttributeNS(null, 'cy', (Math.floor(Math.random()*34) + 164) );
            electron.setAttributeNS(null, 'r', 2);
            electron.setAttributeNS(null, 'style', 'fill: red; stroke: none; stroke-width: 1px;' );
            electron.setAttributeNS(null, 'id', "electron"+electronCount);
            svg.appendChild(electron);
            electronCount +=1;
        }
        // Move the electrons present
        for(var i = 0; i< electronCount; i++){
            //If electron reaches end of plate, destroy and create back on plate
            electron = document.getElementById("electron"+i);
            if (parseFloat(electron.getAttribute("cx"))+1 > 198){
                electron.setAttributeNS(null, 'cx', 161 );
            }else{
                electron.setAttributeNS(null, 'cx',parseFloat(electron.getAttribute("cx"))+1);
            }
            if (parseFloat(electron.getAttribute("cy"))+1 > 200){
                electron.setAttributeNS(null, 'cy',parseFloat(electron.getAttribute("cy")) - 0.5 );
            } else if(parseFloat(electron.getAttribute("cy"))- 1 < 162){
                electron.setAttributeNS(null, 'cy',parseFloat(electron.getAttribute("cy")) + 0.5 );
            } else{
                electron.setAttributeNS(null, 'cy',parseFloat(electron.getAttribute("cy")) + 3*(Math.random()-0.5) );
            }
        }
    } else {
        //Destroy all electrons
        if(electronCount > 0){
            for(var i =0; i < electronCount; i++){
                electron = document.getElementById("electron"+i);
                electron.remove();
            }
            electronCount = 0;
        }
    }
    requestAnimationFrame(animate);
}
animate();





    //over-ride for debugging
    // onHeater();
    // onIoniser();
    // vSel=3.0;
    //over-ride for debugging