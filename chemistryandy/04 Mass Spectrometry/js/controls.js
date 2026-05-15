var heating = false;
var ionising = false
var numMole = 40;
var vMole = 8;
var cData = false;

var colScheme = ["#FA3200", "#FC8466", "#FED6CC", "#00FA32", "#66FC84",
                 "#CCFED6", "#3200FA", "#8466FC", "#D6CCFE", "#CCDBFE"];

function onHeater(){
    heating = !heating;
    if(heating){
        document.getElementById('heaterSwitch').innerHTML = "Turn off heater";
        TweenMax.to('#heater', 1, { stroke : "red", strokeWidth : "5"});
        TweenMax.to('#vapourChamber', 1, { fill : "red"});
        for(let i = 0;i < numMole; i++){
            //Vaporiser Chamber: x(16,137), y(13,155)
            molecule = document.createElementNS(svgns, 'circle');
            molecule.setAttributeNS(null, 'cx', (Math.floor(Math.random()*114) + 20) );
            molecule.setAttributeNS(null, 'cy', (Math.floor(Math.random()*134) + 17) );
            molecule.setAttributeNS(null, 'r', 4);
            molecule.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
            molecule.setAttributeNS(null, 'id', "molecule"+i);

            vx = vMole * (Math.random()-0.5);
            vy = Math.sqrt( vMole^2-vx^2 )

            molecule.setAttributeNS(null, 'vx', vx );
            molecule.setAttributeNS(null, 'vy', vy );
            svg.appendChild(molecule);
        }
    }else{
        document.getElementById('heaterSwitch').innerHTML = "Turn on heater";
        TweenMax.to('#heater', 1, { stroke : "blue", strokeWidth : "1"});
        TweenMax.to('#vapourChamber', 1, { fill : "none"});
        for(let i = 0;i < numMole; i++){
            molecule = document.getElementById("molecule"+i);
            molecule.remove();
        }
    }
    
}

function onIoniser(){
    ionising = !ionising;
    if(ionising){
        document.getElementById('ioniserSwitch').innerHTML = "Turn off Ioniser";
    } else {document.getElementById('ioniserSwitch').innerHTML = "Turn on Ioniser";}
}

// Create histogram base
theoryMr = 0;
for(var i =0; i< elem.types; i++){

    // Sample Peaks
    var MScreen = document.createElementNS(svgns, 'rect');
    height = 0;
    MScreen.setAttributeNS(null, 'x', 370 + ( elem.isotopes[i] - elem.isotopes[0] )*520/( elem.isotopes[elem.types-1] - elem.isotopes[0] ) );
    MScreen.setAttributeNS(null, 'y', 380 - height);
    MScreen.setAttributeNS(null, 'width', 2);
    MScreen.setAttributeNS(null, 'height', height);
    MScreen.setAttributeNS(null, 'style', 'fill: green; stroke: none; stroke-width: 1px;' );
    MScreen.setAttributeNS(null, 'id', 'MScreenChild'+i);
    svg.appendChild(MScreen); 

    // x-axis labels
    var MStext = document.createElementNS(svgns, 'text');
    MStext.setAttributeNS(null, 'x', 370 + ( elem.isotopes[i] - elem.isotopes[0] )*520/( elem.isotopes[elem.types-1] - elem.isotopes[0] ));
    MStext.setAttributeNS(null, 'y', 395);
    var textNode = document.createTextNode( Math.round(elem.isotopes[i]*100)/100 );
    MStext.appendChild(textNode);
    MStext.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px; font-size: 10;' );
    svg.appendChild(MStext);

    // Data labels
    var MStext = document.createElementNS(svgns, 'text');
    MStext.setAttributeNS(null, 'x', 367 + ( elem.isotopes[i] - elem.isotopes[0] )*520/( elem.isotopes[elem.types-1] - elem.isotopes[0] ));
    MStext.setAttributeNS(null, 'y', 395);
    var textNode = document.createTextNode( "" );
    MStext.appendChild(textNode);
    MStext.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px; font-size: 10;' );
    MStext.setAttributeNS(null, 'id', 'label'+i);
    svg.appendChild(MStext);
    theoryMr += elem.isotopes[i]*elem.abundances[i];
    // Bars to follow spectral lines
    document.getElementById('MScreenChild'+i).style.fill = colScheme[i];

    

    // NIST peaks
    var NIST = document.createElementNS(svgns, 'rect');
    height = elem.abundances[i]*270/Math.max.apply(Math, elem.abundances);
    NIST.setAttributeNS(null, 'x', 373 + ( elem.isotopes[i] - elem.isotopes[0] )*520/( elem.isotopes[elem.types-1] - elem.isotopes[0] ) );
    NIST.setAttributeNS(null, 'y', 380 - height);
    NIST.setAttributeNS(null, 'width', 2);
    NIST.setAttributeNS(null, 'height', height);
    NIST.setAttributeNS(null, 'style', 'fill: pink; stroke: none; stroke-width: 1px;' );
    svg.appendChild(NIST); 


}


theoryMr = Math.round(theoryMr)/100;
document.getElementById('element').innerHTML = elem.name;
document.getElementById('theoryMr').innerHTML = "Mr (NIST) &nbsp &nbsp &nbsp &nbsp: " + theoryMr;

function collectData(){
    cData = !cData;
    // Reset collected data
    massSpectrum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Reset screen output
    for(var w = 0; w<elem.types; w++){
        MChild = document.getElementById('MScreenChild'+w);
        MChild.setAttributeNS(null, 'height', 0 );
        MChild.setAttributeNS(null, 'y', 380 );
        document.getElementById('title').innerHTML = "Mass Spectrum";

        MChild = document.getElementById('label'+w);
        MChild.innerHTML = "";
    }


    if(cData){
        document.getElementById('datanalyser').innerHTML = "Stop MS";
    }else{
        document.getElementById('datanalyser').innerHTML = "Collect data";
    }
}