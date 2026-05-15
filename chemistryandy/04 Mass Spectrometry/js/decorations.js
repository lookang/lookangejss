var elem = mass_Mo;  // Super important!!! Mo, Sn, Hg, Ti, Zr, Ru, Pd, Nd, Os, Hf, Cu,
var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementsByTagName('svg')[1]; //Get svg element
for(var i = 0; i < 3; i++){
        dot = document.createElementNS(svgns, 'text');
        dot.setAttributeNS(null, 'x', 122);
        dot.setAttributeNS(null, 'y', 410 - 60*i);
        var textNode = document.createTextNode("x");
        dot.appendChild(textNode);
        dot.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px; fontSize: 10;' );
        svg.appendChild(dot);
}
for(var i=0; i<11;i++){
        for(var j=0; j<5;j++){
                dot = document.createElementNS(svgns, 'text');
                dot.setAttributeNS(null, 'x', 122 + 64*i);
                dot.setAttributeNS(null, 'y', 475 + 65*j);
                var textNode = document.createTextNode("x");
                dot.appendChild(textNode);
                dot.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
                svg.appendChild(dot);
        }
}


// Create 200 molecular ions
// Hiding: (cx,cy)=(870, 630), fill=black, v=0, theta=0, r=4
// Appear: (cx,cy)=(122,151), v = velSel, m_e = (Math.random() < 0.692) ? 62.930 : 64.928

// Pass ioniser: 
        // Condition: cy > 163
        // fill = blue, r = 3;
// Pass velocity selector, into deflection chamber
        // Condition: cy > 430    [Deflection Chamber range: x(110,783.5), y(430,760)]
        // Initial
                // (cx,cy)=(122,430), v=velSel, theta[0] = 0; acc = v(n)*B/[m/e]
        // Update
                // (Universal)  acc = parseFloat(MI.getAttribute("cy")) < 430 ? 0 : v(n)*B/[m/e]             
                // (Universal)  theta2 = parseFloat(MI.getAttribute("cy")) < 430 ? 0 : Math.atan((v[n]*Math.sin(theta) + acc*Math.cos(theta)) / (v[n]*Math.cos(theta) + acc*Math.sin(theta)))
                // (Universal)  cx(n+1) = cx(n) + v(n)*Math.sin(theta)
                // (Universal)  cy(n+1) = cy(n) + v(n)*Math.cos(theta)
                // (Universal)  v(n+1) = Math.sqrt( v(n)^2 + acc^2 + 2*v(n)*acc*Math.sin(2*theta) )
                // (Universal)  theta = theta2;

// Too light, collides with wall
        // Condition: cy > 757
        // (cx,cy)=(870, 630), fill=black, v=0, theta=0, r=4

// Completes trajectory
        // Condition: cx > 125 && cy < 430
        // (cx,cy)=(870, 680), fill=black, v=0, theta=0, r=4
        // Track hits if possible

var MICount = 120;
for( var i=0; i<MICount; i++ ){
        MI = document.createElementNS(svgns, 'circle');
        MI.setAttributeNS(null, 'cx', 870 );
        MI.setAttributeNS(null, 'cy', 680 );
        MI.setAttributeNS(null, 'r', 4);
        MI.setAttributeNS(null, 'style', 'fill: black; stroke: none; stroke-width: 1px;' );
        MI.setAttributeNS(null, 'id', "MI" + i);
        // MI.setAttributeNS(null, 'm_e', (Math.random() < 0.692) ? 12:13 ); // 62.930 : 64.928
        MI.setAttributeNS(null, 'v', 0 ); 
        MI.setAttributeNS(null, 'pRadius', 0 );
        MI.setAttributeNS(null, 'isotope', 0 );
        MI.setAttributeNS(null, 'DOB', new Date().getTime() );
        svg.appendChild(MI); 
}
