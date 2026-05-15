sp3 = new THREE.Group();    // done
sp2 = new THREE.Group();    // done
OH = new THREE.Group();     // done
CO2H = new THREE.Group();   // done
CO = new THREE.Group();     // done
CHO = new THREE.Group();    // done
NH2 = new THREE.Group();    // done

// sp3 carbon
sp3 = drawSphere(20,0,0,0,colorChoice.carbon);
b1 = drawBond(0,0,colorChoice.bond);
b2 = drawBond(Math.acos(-1/3),0,colorChoice.bond);
b3 = drawBond(Math.acos(-1/3),2/3*Math.PI,colorChoice.bond);
b4 = drawBond(Math.acos(-1/3),4/3*Math.PI,colorChoice.bond);
sp3.add(b1.clone()); sp3.add(b2.clone()); sp3.add(b3.clone()); sp3.add(b4.clone()); 
b1.geometry.dispose();b1.material.dispose();b1 = undefined;
b2.geometry.dispose();b2.material.dispose();b2 = undefined;
b3.geometry.dispose();b3.material.dispose();b3 = undefined;
b4.geometry.dispose();b4.material.dispose();b4 = undefined;

// sp2 carbon
sp2 = drawSphere(20,0,0,0,colorChoice.carbon);
s2 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
b1 = drawBond(-Math.PI/6,0,colorChoice.bond);
b2 = drawBond(Math.PI/6 - Math.PI,0,colorChoice.bond);
b3 = drawBond(Math.PI/6,0,colorChoice.bond);
b4 = drawBond(-Math.PI/6 + Math.PI,0,colorChoice.bond);
b5 = drawBond(Math.PI/2,0,colorChoice.bond);
l1 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
l2 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");
l3 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
l4 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");
// var material = new THREE.LineDashedMaterial( { 
//     color: 0x000000,
//     linewidth: 15,
//     scale: 1,
//     dashSize: 3,
//     gapSize: 1 } );
// var geometry = new THREE.Geometry();
// geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
// geometry.vertices.push(new THREE.Vector3( 30, 60, 0) );
// var line = new THREE.Line( geometry, material );
// line.computeLineDistances ();
// var geometry2 = new THREE.Geometry();
// geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
// geometry2.vertices.push(new THREE.Vector3( -30, 60, 0) );
// var line2 = new THREE.Line( geometry2, material );
// line2.computeLineDistances ();
b3.translateY(40+40*Math.cos(Math.PI/3));
b4.translateY(40+40*Math.cos(Math.PI/3));
l1.translateY(60);
l2.translateY(60);
sp2.add(s2.clone()); 
sp2.add(b1.clone());sp2.add(b2.clone());
sp2.add(b3.clone());sp2.add(b4.clone());
sp2.add(b5.clone());
sp2.add(l1.clone());sp2.add(l2.clone());
sp2.add(l3.clone());sp2.add(l4.clone());
// sp2.add(line);sp2.add(line2);
s2.geometry.dispose();s2.material.dispose();s2 = undefined;
b1.geometry.dispose();b1.material.dispose();b1 = undefined;
b2.geometry.dispose();b2.material.dispose();b2 = undefined;
b3.geometry.dispose();b3.material.dispose();b3 = undefined;
b4.geometry.dispose();b4.material.dispose();b4 = undefined;
b5.geometry.dispose();b5.material.dispose();b5 = undefined;
// l1.geometry.dispose();l1.material.dispose();l1 = undefined;
// l2.geometry.dispose();l2.material.dispose();l2 = undefined;
// l3.geometry.dispose();l3.material.dispose();l3 = undefined;
// l4.geometry.dispose();l4.material.dispose();l4 = undefined;
// line.geometry.dispose();line.material.dispose();line=undefined;
// line2.geometry.dispose();line2.material.dispose();line2=undefined;

// CO
CO = drawSphere(20,0,0,0,colorChoice.carbon);
s2 = drawSphere(20,60,Math.PI/2,0,colorChoice.oxygen);
b1 = drawBond(Math.PI/6 + Math.PI,0,colorChoice.bond);
b2 = drawBond(Math.PI/2,0,colorChoice.bond);
b3 = drawBond(-Math.PI/6,0,colorChoice.bond);
l1 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
l2 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");
l3 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
l4 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");
l1.translateY(60);
l2.translateY(60);
CO.add(s2.clone()); 
CO.add(b1.clone());CO.add(b2.clone());
CO.add(b3.clone());
CO.add(l1.clone());CO.add(l2.clone());
CO.add(l3.clone());CO.add(l4.clone());
s2.geometry.dispose();s2.material.dispose();s2 = undefined;
b1.geometry.dispose();b1.material.dispose();b1 = undefined;
b2.geometry.dispose();b2.material.dispose();b2 = undefined;
b3.geometry.dispose();b3.material.dispose();b3 = undefined;
l1.geometry.dispose();l1.material.dispose();l1 = undefined;
l2.geometry.dispose();l2.material.dispose();l2 = undefined;
l3.geometry.dispose();l3.material.dispose();l3 = undefined;
l4.geometry.dispose();l4.material.dispose();l4 = undefined;
CO.rotation.x = -Math.PI/2;

//CHO
CHO = CO.clone();
s2 = drawSphere(15,60,-Math.PI/6,0,colorChoice.hydrogen);
CHO.add(s2.clone());
s2.geometry.dispose();s2.material.dispose();s2 = undefined;

//CO2H
CO2H = CO.clone();
CO2H.rotation.x = 0;
s2 = drawSphere(20,60,-Math.PI/6,0,colorChoice.oxygen);
CO2H.add(s2.clone());
s2.geometry.dispose();s2.material.dispose();s2 = undefined;
b1 = drawBond(-Math.acos(-1/3)+Math.PI/2+Math.PI/6,0,colorChoice.bond);
b1.translateZ(60*Math.cos(Math.PI/6));
b1.translateY(-60*Math.sin(Math.PI/6));
CO2H.add(b1.clone());
b1.geometry.dispose();b1.material.dispose();b1 = undefined;
s3 = drawSphere(15,60,0,0,colorChoice.hydrogen);
s3.translateZ( 60*Math.sin(Math.acos(-1/3)-Math.PI/3 ) );
s3.translateY( -30*Math.cos(Math.acos(-1/3)-Math.PI/3 ) );
CO2H.add(s3.clone());
s3.geometry.dispose();s3.material.dispose();s3 = undefined;
CO2H.rotation.x = -Math.PI/2;

//NH2
NH2 = drawSphere(20,0,0,0,colorChoice.nitrogen);
b1 = drawBond(Math.acos(-1/3),4/3*Math.PI,colorChoice.bond);
b2 = drawBond(Math.acos(-1/3),0,colorChoice.bond);
b3 = drawBond(Math.acos(-1/3),2/3*Math.PI,colorChoice.bond);
l1 = drawLonePair(15,30,0,0,"red");
NH2.add(b1.clone()); NH2.add(b2.clone()); NH2.add(b3.clone()); NH2.add(l1.clone()); 
NH2.rotation.x = Math.PI;
NH2.rotation.z = Math.PI/3;
b1.geometry.dispose();b1.material.dispose();b1 = undefined;
b2.geometry.dispose();b2.material.dispose();b2 = undefined;
b3.geometry.dispose();b3.material.dispose();b3 = undefined;
l1.geometry.dispose();l1.material.dispose();l1 = undefined;

//OH
OH = sp3.clone();
// OH.rotation.z = Math.PI/6;
O = drawSphere(20,0,0,0,colorChoice.oxygen);
s1 = drawSphere(15,60,Math.PI-Math.acos(-1/3),0,colorChoice.hydrogen);
b1 = drawBond(Math.PI-Math.acos(-1/3),0,colorChoice.bond);
O.add(s1.clone());O.add(b1.clone());
O.translateZ(60);
O.rotation.z = Math.PI/3;
OH.add(O.clone());

b1.geometry.dispose();b1.material.dispose();b1 = undefined;
s1.geometry.dispose();s1.material.dispose();s1 = undefined;
O.geometry.dispose();O.material.dispose();O = undefined;


// Lines cannot be cloned and must be added manually
// var material = new THREE.LineDashedMaterial( { 
//     color: 0x000000,
//     linewidth: 15,
//     scale: 1,
//     dashSize: 3,
//     gapSize: 1 } );
// var geometry = new THREE.Geometry();
// geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
// geometry.vertices.push(new THREE.Vector3( 30, 60, 0) );
// var line = new THREE.Line( geometry, material );
// line.computeLineDistances ();
// var geometry2 = new THREE.Geometry();
// geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
// geometry2.vertices.push(new THREE.Vector3( -30, 60, 0) );
// var line2 = new THREE.Line( geometry2, material );
// line2.computeLineDistances ();
// CO.add(line);CO.add(line2);
// line.geometry.dispose();line.material.dispose();line=undefined;
// line2.geometry.dispose();line2.material.dispose();line2=undefined;