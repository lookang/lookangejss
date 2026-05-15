var B = 1.0;    // Magnetic field strength in deflecting electrode
var electronCount = 0;
var acc = 0;
var k, l, m, n;       // counters
var acc = 0;
var theta2 = 0;
var fps = 6000;
var lastPulsed = new Date();
var massSpectrum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];    // Initiate mass spectrum

function animate(){
    // Heating
    if(heating){
        // Movement of vapour molecules
        for( i=0; i < numMole; i++ ){
            molecule = document.getElementById("molecule"+i);
            if (parseFloat(molecule.getAttribute("cx"))+parseFloat(molecule.getAttribute("vx")) > 20 && parseFloat(molecule.getAttribute("cx"))+parseFloat(molecule.getAttribute("vx")) < 133){
                molecule.setAttributeNS(null, 'cx',parseFloat(molecule.getAttribute("cx"))+parseFloat(molecule.getAttribute("vx")));
            } else {
                molecule.setAttributeNS(null, 'vx', -parseFloat(molecule.getAttribute("vx")) );
            }
            // Vertical motion
            if (parseFloat(molecule.getAttribute("cy"))+parseFloat(molecule.getAttribute("vy")) > 17 && parseFloat(molecule.getAttribute("cy"))+parseFloat(molecule.getAttribute("vy")) < 151){
                molecule.setAttributeNS(null, 'cy',parseFloat(molecule.getAttribute("cy"))+parseFloat(molecule.getAttribute("vy")));
            } else {
                molecule.setAttributeNS(null, 'vy', -parseFloat(molecule.getAttribute("vy")) );
            }
            // Heating, ionising and proximity, create molecular ions between pauseTimers
            if(velSel > 0 && ionising){
                if( Math.abs(parseFloat(molecule.getAttribute("cy")) - 151) < 4 && parseFloat(molecule.getAttribute("cx")) > 114 && parseFloat(molecule.getAttribute("cx")) < 133 ){
                    if( new Date() - lastPulsed > 30 ){    // fire every 30 ms at most
                        // Find an available MI to ready
                        for(k = 0; k<MICount; k++){
                            MI = document.getElementById("MI"+k);
                            if( MI.getAttribute("cx") == 870 && MI.getAttribute("cy") == 680 ) {break;}
                        }
                        // Position available MI
                        MI = document.getElementById("MI"+k);
                        // // mass = (Math.random() < 0.692) ? 12 : 13;  
                        // var prob = 100*Math.random();
                        // var cumSum = 0;
                        // for (var o=0; o<elem.types; o++){
                        //     cumSum += elem.abundances[o];
                        //     if(cumSum>prob){break;}
                        // }         
                        // mass = elem.isotopes[o]; // (Math.random() < 0.692) ? 62.930 : 64.928;
                        // pRadius = mass*velSel/B;

                        MI.setAttributeNS(null, 'cx', 122 );
                        MI.setAttributeNS(null, 'cy', 151 );
                        MI.setAttributeNS(null, 'v', velSel );
                        // MI.setAttributeNS(null, 'pRadius', pRadius ); 
                        // MI.setAttributeNS(null, 'isotope', o );
                        MI.setAttributeNS(null, 'DOB', new Date() ); 
                        lastPulsed = new Date();
                    }
                }
            }
        }
        // End of Movement of vapour molecules
    // Movement and ionisation of 200 molecular ions
    for( m=0; m<MICount; m++ ){
        MI = document.getElementById("MI"+m);

        // Obtain motion characteristics
        x = parseFloat(MI.getAttribute("cx"));
        y = parseFloat(MI.getAttribute("cy"));
        v = parseFloat(MI.getAttribute("v"));

        // Usual movement with update due to velocity selector
        if( y < 430 && x < 134 && x > 113){
            MI.setAttributeNS(null, 'cy', y + v );
            MI.setAttributeNS(null, 'v', velSel ); 
            if (y + 2*v > 430){ 
                // mass = (Math.random() < 0.692) ? 12 : 13;  
                var prob = 100*Math.random();
                var cumSum = 0;
                for (var o=0; o<elem.types; o++){
                    cumSum += elem.abundances[o];
                    if(cumSum>prob){break;}
                }         
                mass = elem.isotopes[o]; // (Math.random() < 0.692) ? 62.930 : 64.928;
                pRadius = mass*velSel/B;
                MI.setAttributeNS(null, 'v', velSel );
                MI.setAttributeNS(null, 'pRadius', pRadius ); 
                MI.setAttributeNS(null, 'isotope', o );
                MI.setAttributeNS(null, 'DOB', new Date() ); 
            }
        }
        // Pass ioniser, change colour
        if ( y > 163 && x < 783.5 ){
            MI.setAttributeNS(null, 'style', 'fill: yellow; stroke: black; stroke-width: 1px;' );
            MI.setAttributeNS(null, 'r', 3 );
        }// Pass ioniser, change colour
        // Movement of fragment ions in deflection region

        // Movement of fragment ions in deflection region
        if( x < 783.5 && y >= 430){//Check it is in deflection region
            pRadius = parseFloat(MI.getAttribute("pRadius"));
            o = parseFloat(MI.getAttribute("isotope"));
            MI.setAttributeNS(null, 'cx', x + v /pRadius * ( y - 430 ) );
            MI.setAttributeNS(null, 'cy', y + v /pRadius * ( 122+pRadius-x ) );
            // omega = v/pRadius;
            // x = 122 + pRadius + pRadius*Math.sin(( omega*deltaT - Math.PI/2 ));
            // y = 430 + pRadius*Math.cos(( omega*deltaT - Math.PI/2 ));
            // MI.setAttributeNS(null, 'cx', x );
            // MI.setAttributeNS(null, 'cy', y );
        }
        // Movement of fragment ions in deflection region

        // Too light, collides with wall
        if ( y > 757 && x < 783.5 ){
            MI.setAttributeNS(null, 'style', 'fill: black;' );
            MI.setAttributeNS(null, 'cx', 870 );
            MI.setAttributeNS(null, 'cy', 680 );
            MI.setAttributeNS(null, 'r', 4 );
        }// Too light, collides with wall

        // Completes trajectory
        if ( x > 125 && x < 783.5 &&  y < 430){
            // Determine isotope mass ID
            // Move impact marker 0 - 9
            o = parseFloat(MI.getAttribute("isotope"));
            marker = document.getElementById("mark"+o); 
            TweenMax.to(marker, 0.2, { x : x - 1 - parseFloat(marker.getAttribute("x"))});
            // Collect stochastic simulation data
            if(cData){           
                massSpectrum[o] += 1;
                var MSdata = {
                    x : elem.isotopes,
                    y : massSpectrum
                }
                // console.log(massSpectrum);
            }
            //Reset position
            MI.setAttributeNS(null, 'style', 'fill: black;' );
            MI.setAttributeNS(null, 'cx', 870 );
            MI.setAttributeNS(null, 'cy', 680 );
            MI.setAttributeNS(null, 'r', 4 );
        }// Completes trajectory
    }
    // Movement and ionisation of molecular ions
    }
    // End of Heating

    // x(113,134), y(163,223)
    if(ionising){
        // Randomly produce and place electrons
        if (electronCount < 25 && Math.random() > 0.85){
            electron = document.createElementNS(svgns, 'circle');
            electron.setAttributeNS(null, 'cx', 115 );
            electron.setAttributeNS(null, 'cy', (Math.floor(Math.random()*56) + 163) );
            electron.setAttributeNS(null, 'r', 1);
            electron.setAttributeNS(null, 'style', 'fill: red; stroke: none; stroke-width: 1px;' );
            electron.setAttributeNS(null, 'id', "electron"+electronCount);
            svg.appendChild(electron);
            electronCount +=1;
        }
        // Move the electrons present
        for(var i = 0; i< electronCount; i++){
            //If electron reaches end of plate, destroy and create back on plate
            electron = document.getElementById("electron"+i);
            if (parseFloat(electron.getAttribute("cx"))+1 > 132){
                electron.setAttributeNS(null, 'cx', 115 );
            }else{
                electron.setAttributeNS(null, 'cx',parseFloat(electron.getAttribute("cx"))+1);
            }
            if (parseFloat(electron.getAttribute("cy"))+1 > 221){
                electron.setAttributeNS(null, 'cy',parseFloat(electron.getAttribute("cy")) - 0.5 );
            } else if(parseFloat(electron.getAttribute("cy"))- 1 < 165){
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
    // Plot mass spectrum
    if(cData){
        // Break down x-axis into elem.types segments
        // x-axis range from 340 to 940, break into elem.types + 1 segments
        hits = massSpectrum.reduce((a, b) => a + b, 0);
        if( hits > 0){
            actualMr = 0;
            for(var w = 0; w < elem.types; w++){
                MChild = document.getElementById('MScreenChild'+w);
                height = massSpectrum[w]*270/Math.max.apply(Math, massSpectrum);
                MChild.setAttributeNS(null, 'height', height );
                MChild.setAttributeNS(null, 'y', 380 - height );
                
                MChild = document.getElementById('label'+w);
                MChild.setAttributeNS(null, 'y', 375 - height );
                MChild.innerHTML = Math.round(massSpectrum[w]/hits*1000)/10+" %" + "  ("+Math.round(elem.abundances[w]*10)/10+" %)";
                actualMr += elem.isotopes[w]*massSpectrum[w];
            }
            actualMr = Math.round(actualMr/hits*100)/100;
            document.getElementById('title').innerHTML = "Mass Spectrum (" +hits+" hits)";
            document.getElementById('sampleMr').innerHTML = "Mr (Sampled) &nbsp: " +actualMr;
        }
    }
    requestAnimationFrame(animate);
}
animate();