let drawCH4 = function(){
    CH4 = new THREE.Group();
    CH4.add(sp3.clone());
    s2 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.acos(-1/3),2/3*Math.PI,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),4/3*Math.PI,colorChoice.hydrogen);
    CH4.add(s2.clone()); CH4.add(s3.clone()); CH4.add(s4.clone()); CH4.add(s5.clone());  
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    return CH4;
}
let drawC2H6 = function(){
    C2H6 = new THREE.Group();
    C1 = sp3.clone();
    s3 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.acos(-1/3),2/3*Math.PI,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),4/3*Math.PI,colorChoice.hydrogen);
    C1.add(s3.clone());C1.add(s4.clone());C1.add(s5.clone());
    C2 = C1.clone();
    C2.translateY(30);
    C1.translateY(-30);
    C1.rotation.x = -Math.PI/2;
    C2.rotation.x =Math.PI/2;
    C2H6.add(C1.clone());C2H6.add(C2.clone());
    C1.geometry.dispose();    C1.material.dispose();    C1 = undefined;
    C2.geometry.dispose();    C2.material.dispose();    C2 = undefined;
    s3.geometry.dispose();    s3.material.dispose();    s3 = undefined;
    s4.geometry.dispose();    s4.material.dispose();    s4 = undefined;
    s5.geometry.dispose();    s5.material.dispose();    s5 = undefined;
    return C2H6;
}
let drawC8H18 = function(){
    C8H18 = new THREE.Group();
    C1 = sp3.clone();
    s2 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.acos(-1/3),2/3*Math.PI,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),4/3*Math.PI,colorChoice.hydrogen);
    C1.add(s2.clone());C1.add(s3.clone());C1.add(s4.clone());C1.add(s5.clone());
    C2 = C1.clone();
    C3 = C1.clone();
    C4 = C1.clone();
    C5 = C1.clone();
    C6 = C1.clone();
    C7 = C1.clone();
    C8 = C1.clone();
    
    C2.translateY(60*Math.sin( Math.acos(-1/3)/2 ));
    C3.translateY(-60*Math.sin( Math.acos(-1/3)/2 ));
    C4.translateY(120*Math.sin( Math.acos(-1/3)/2 ));
    C5.translateY(-120*Math.sin( Math.acos(-1/3)/2 ));
    C2.translateZ(60*Math.cos( Math.acos(-1/3)/2 ));
    C3.translateZ(60*Math.cos( Math.acos(-1/3)/2 ));
    C6.translateX( 60*Math.sin( Math.acos(-1/3)/2 ) );C7.translateX( -60*Math.sin( Math.acos(-1/3)/2 ) );
    C8.translateX( 60*Math.sin( Math.acos(-1/3)/2 ) );
    C6.translateZ(120*Math.cos( Math.acos(-1/3)/2 ));C7.translateZ(120*Math.cos( Math.acos(-1/3)/2 ));
    C8.translateZ(120*Math.cos( Math.acos(-1/3)/2 ));
    C6.translateY(-60*Math.sin( Math.acos(-1/3)/2 ));C7.translateY(-60*Math.sin( Math.acos(-1/3)/2 ));
    C8.translateY(60*Math.sin( Math.acos(-1/3)/2 ));
    
    C1.rotation.x = Math.acos(-1/3)/2;
    C4.rotation.x = Math.acos(-1/3)/2;
    C5.rotation.x = Math.acos(-1/3)/2;
    C2.rotation.x = Math.acos(-1/3)/2 + Math.PI;
    C3.rotation.x = Math.acos(-1/3)/2 + Math.PI;
    C6.rotation.x = Math.acos(-1/3)/2;
    C7.rotation.x = Math.acos(-1/3)/2;
    C8.rotation.x = Math.acos(-1/3)/2 + Math.PI;

    C8H18.add(C1.clone());C8H18.add(C2.clone());C8H18.add(C3.clone());C8H18.add(C4.clone());C8H18.add(C5.clone());
    C8H18.add(C6.clone());C8H18.add(C7.clone());C8H18.add(C8.clone());

    s2.geometry.dispose();    s2.material.dispose();    s2 = undefined;
    s3.geometry.dispose();    s3.material.dispose();    s3 = undefined;
    s4.geometry.dispose();    s4.material.dispose();    s4 = undefined;
    s5.geometry.dispose();    s5.material.dispose();    s5 = undefined;
    C1.geometry.dispose();    C1.material.dispose();    C1 = undefined;
    C2.geometry.dispose();    C2.material.dispose();    C2 = undefined;
    C3.geometry.dispose();    C3.material.dispose();    C3 = undefined;
    C4.geometry.dispose();    C4.material.dispose();    C4 = undefined;
    C5.geometry.dispose();    C5.material.dispose();    C5 = undefined;
    C6.geometry.dispose();    C6.material.dispose();    C6 = undefined;
    C7.geometry.dispose();    C7.material.dispose();    C7 = undefined;
    C8.geometry.dispose();    C8.material.dispose();    C8 = undefined;
    return C8H18;
}
let drawC6H12 = function(){
    C6H12 = new THREE.Group();
    // carbon atom
    s1 = drawSphere(20,0,0,0,colorChoice.carbon);
    // hydrogen atoms
    s2 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.acos(-1/3),2/3*Math.PI,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),4/3*Math.PI,colorChoice.hydrogen);
    //bonds
    b1 = drawBond(0,0,colorChoice.bond);
    b2 = drawBond(Math.acos(-1/3),0,colorChoice.bond);
    b3 = drawBond(Math.acos(-1/3),2/3*Math.PI,colorChoice.bond);
    b4 = drawBond(Math.acos(-1/3),4/3*Math.PI,colorChoice.bond);

    C6H12.add(s1.clone()); C6H12.add(s2.clone()); C6H12.add(s3.clone()); C6H12.add(s4.clone()); C6H12.add(s5.clone());  
    C6H12.add(b1.clone()); C6H12.add(b2.clone()); C6H12.add(b3.clone()); C6H12.add(b4.clone()); 

    c1 = C6H12.clone();
    c3 = c1.clone();
    c2 = c1.clone();
    c1.translateZ(60);
    c2.translateY(60*Math.cos(Math.acos(-1/3)-Math.PI/2));
    c2.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    c2.rotation.z = Math.PI/3;
    c2.rotation.x = Math.PI - Math.acos(-1/3);
    
    
    c1.rotation.x = Math.PI;
    C6H12.add(c1);

    c4 = C6H12.clone();
    c4.translateY(60*Math.cos(Math.acos( -1/3 ) - Math.PI/2 ) + 60*( Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3) ) );
    c4.translateX(-60*( Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3) ) );


    C6H12.add(c2);
    c3.translateY(60*Math.cos(Math.PI/3));
    c3.translateX(-60*Math.sin(Math.PI/3));
    c3.translateZ(60 + 60*Math.sin(Math.acos(-1/3)-Math.PI/2));

    var delta = -Math.PI*0.1;
    C6H12.add(c4);
    C6H12.add(c3);
    

    s1.geometry.dispose();
    s1.material.dispose();
    s1 = undefined;

    s2.geometry.dispose();
    s2.material.dispose();
    s2 = undefined;

    s3.geometry.dispose();
    s3.material.dispose();
    s3 = undefined;

    s4.geometry.dispose();
    s4.material.dispose();
    s4 = undefined;

    s5.geometry.dispose();
    s5.material.dispose();
    s5 = undefined;

    b1.geometry.dispose();
    b1.material.dispose();
    b1 = undefined;

    b2.geometry.dispose();
    b2.material.dispose();
    b2 = undefined;

    b3.geometry.dispose();
    b3.material.dispose();
    b3 = undefined;

    b4.geometry.dispose();
    b4.material.dispose();
    b4 = undefined;

    c1 = undefined; 
    c2 = undefined;
    c3 = undefined; 
    c4 = undefined;

    C6H12.translateX(30);
    C6H12.translateY(-50);

    C6H12.rotation.z = -Math.PI/6;
    
    C6H12.rotation.y = -Math.PI/2; 
    return C6H12;
}
let drawC6H6 = function(){
    C6H6 = new THREE.Group();
    s1 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,Math.PI/3*1,colorChoice.carbon);
    s3 = drawSphere(20,60,Math.PI/2,Math.PI/3*2,colorChoice.carbon);
    s4 = drawSphere(20,60,Math.PI/2,Math.PI/3*3,colorChoice.carbon);
    s5 = drawSphere(20,60,Math.PI/2,Math.PI/3*4,colorChoice.carbon);
    s6 = drawSphere(20,60,Math.PI/2,Math.PI/3*5,colorChoice.carbon);

    b1 = new drawBond(0,0);  
    b3 = b1.clone();
    b5 = b1.clone();
    b7 = b1.clone();
    b8 = b1.clone();
    b9 = b1.clone();
    b10 = b1.clone();
    b11 = b1.clone();
    b12 = b1.clone();

    b1.translateX(-60*Math.cos(Math.PI/6));
    b1.translateY(-30);
    b2 = b1.clone();
    b2.rotation.x = Math.PI/2;
    b2.rotation.y = Math.PI/3;
    b1.rotation.x = -Math.PI/2;
    b3.translateX(60*Math.cos(Math.PI/6));
    b3.translateY(-30);
    b4 = b3.clone();
    b3.rotation.x = Math.PI/2;
    b3.rotation.y = -Math.PI/3;
    b4.rotation.x = Math.PI/2;
    b4.rotation.y = Math.PI;
    b5.translateY(30+60*Math.cos(Math.PI/3));
    b6 = b5.clone();
    b5.rotation.x = Math.PI/2;
    b6.rotation.x = Math.PI/2;
    b5.rotation.y = Math.PI/3;
    b6.rotation.y = -Math.PI/3;
    b7.translateY(30+60*Math.cos(Math.PI/3));
    b7.rotation.x = -Math.PI/2;
    b8.translateY(-30-60*Math.cos(Math.PI/3));
    b8.rotation.x = Math.PI/2;
    b9.translateX(-60*Math.cos(Math.PI/6));
    b9.translateY(30);
    b9.rotation.x = -Math.PI/2;
    b9.rotation.y = -Math.PI/3;
    b10.translateX(-60*Math.cos(Math.PI/6));
    b10.translateY(-30);
    b10.rotation.x = -Math.PI/2;
    b10.rotation.y = 4*Math.PI/3;
    b11.translateX(60*Math.cos(Math.PI/6));
    b11.translateY(30);
    b11.rotation.x = -Math.PI/2;
    b11.rotation.y = Math.PI/3;
    b12.translateX(60*Math.cos(Math.PI/6));
    b12.translateY(-30);
    b12.rotation.x = -Math.PI/2;
    b12.rotation.y = 2*Math.PI/3;

    s7 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s8 = s7.clone();
    s9 = s7.clone();
    s10 = s7.clone();
    s11 = s7.clone();
    s12 = s7.clone();
    s7.translateY(90+60*Math.cos(Math.PI/3));
    s8.translateY(-90-60*Math.cos(Math.PI/3));
    s9.translateX(120*Math.cos(Math.PI/6));
    s9.translateY(120*Math.sin(Math.PI/6));
    s10.translateX(-120*Math.cos(Math.PI/6));
    s10.translateY(120*Math.sin(Math.PI/6));
    s11.translateX(-120*Math.cos(Math.PI/6));
    s11.translateY(-120*Math.sin(Math.PI/6));
    s12.translateX(120*Math.cos(Math.PI/6));
    s12.translateY(-120*Math.sin(Math.PI/6));
    
    // s13 = drawLonePair(20,32,0,0,0xFF0000);
    // s14 = s13.clone();
    // s15 = s13.clone();
    // s16 = s13.clone();
    // s17 = s13.clone();
    // s18 = s13.clone();
    // s19 = drawLonePair(20,32,Math.PI,0,0xFF0000);
    // s20 = s19.clone();
    // s21 = s19.clone();
    // s22 = s19.clone();
    // s23 = s19.clone();
    // s24 = s19.clone();
    // s13.translateY(60);
    // s19.translateY(60);
    // s14.translateY(-60);
    // s20.translateY(-60);
    var geometry = new THREE.TorusGeometry( 50, 15, 16, 100, 2*Math.PI );
    var material = new THREE.MeshPhongMaterial( { color: 0xFF0000, specular: 0x050505, shininess: 400, transparent: true, opacity: 0.2 } );
    var torus = new THREE.Mesh( geometry, material );
    torus2 = torus.clone();
    torus.translateZ(32);
    torus2.translateZ(-32);

    C6H6.add(s1.clone()); C6H6.add(s2.clone()); C6H6.add(s3.clone()); C6H6.add(s4.clone()); C6H6.add(s5.clone()); C6H6.add(s6.clone()); 
    C6H6.add(s7.clone()); C6H6.add(s8.clone()); C6H6.add(s9.clone()); C6H6.add(s10.clone()); C6H6.add(s11.clone()); C6H6.add(s12.clone()); 
    C6H6.add(b1.clone()); C6H6.add(b2.clone()); C6H6.add(b3.clone()); C6H6.add(b4.clone()); C6H6.add(b5.clone()); C6H6.add(b6.clone()); 
    C6H6.add(b7.clone()); C6H6.add(b8.clone()); C6H6.add(b9.clone()); C6H6.add(b10.clone()); C6H6.add(b11.clone()); C6H6.add(b12.clone()); 
    // C6H6.add(s13.clone());C6H6.add(s14.clone());C6H6.add(s15.clone());C6H6.add(s16.clone());C6H6.add(s17.clone());C6H6.add(s18.clone());
    // C6H6.add(s19.clone());C6H6.add(s20.clone());C6H6.add(s21.clone());C6H6.add(s22.clone());C6H6.add(s23.clone());C6H6.add(s24.clone());
    C6H6.add(torus); C6H6.add(torus2); 
    s1 = undefined;s2 = undefined;s3 = undefined;s4 = undefined;
    s5 = undefined;s6 = undefined;s7 = undefined;s8 = undefined;
    s9 = undefined;s10 = undefined;s11 = undefined;s12 = undefined;
    b1 = undefined;b2 = undefined;b3 = undefined;b4 = undefined;
    b5 = undefined;b6 = undefined;b7 = undefined;b8 = undefined;
    b9 = undefined;b10 = undefined;b11 = undefined;b12 = undefined;

    return C6H6;
}
let drawC6H5Cl = function(){
    C6H5Cl = new THREE.Group();
    s1 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,Math.PI/3*1,colorChoice.carbon);
    s3 = drawSphere(20,60,Math.PI/2,Math.PI/3*2,colorChoice.carbon);
    s4 = drawSphere(20,60,Math.PI/2,Math.PI/3*3,colorChoice.carbon);
    s5 = drawSphere(20,60,Math.PI/2,Math.PI/3*4,colorChoice.carbon);
    s6 = drawSphere(20,60,Math.PI/2,Math.PI/3*5,colorChoice.carbon);

    b1 = new drawBond(0,0);  
    b3 = b1.clone();
    b5 = b1.clone();
    b7 = b1.clone();
    b8 = b1.clone();
    b9 = b1.clone();
    b10 = b1.clone();
    b11 = b1.clone();
    b12 = b1.clone();

    b1.translateX(-60*Math.cos(Math.PI/6));
    b1.translateY(-30);
    b2 = b1.clone();
    b2.rotation.x = Math.PI/2;
    b2.rotation.y = Math.PI/3;
    b1.rotation.x = -Math.PI/2;
    b3.translateX(60*Math.cos(Math.PI/6));
    b3.translateY(-30);
    b4 = b3.clone();
    b3.rotation.x = Math.PI/2;
    b3.rotation.y = -Math.PI/3;
    b4.rotation.x = Math.PI/2;
    b4.rotation.y = Math.PI;
    b5.translateY(30+60*Math.cos(Math.PI/3));
    b6 = b5.clone();
    b5.rotation.x = Math.PI/2;
    b6.rotation.x = Math.PI/2;
    b5.rotation.y = Math.PI/3;
    b6.rotation.y = -Math.PI/3;
    b7.translateY(30+60*Math.cos(Math.PI/3));
    b7.rotation.x = -Math.PI/2;
    b8.translateY(-30-60*Math.cos(Math.PI/3));
    b8.rotation.x = Math.PI/2;
    b9.translateX(-60*Math.cos(Math.PI/6));
    b9.translateY(30);
    b9.rotation.x = -Math.PI/2;
    b9.rotation.y = -Math.PI/3;
    b10.translateX(-60*Math.cos(Math.PI/6));
    b10.translateY(-30);
    b10.rotation.x = -Math.PI/2;
    b10.rotation.y = 4*Math.PI/3;
    b11.translateX(60*Math.cos(Math.PI/6));
    b11.translateY(30);
    b11.rotation.x = -Math.PI/2;
    b11.rotation.y = Math.PI/3;
    b12.translateX(60*Math.cos(Math.PI/6));
    b12.translateY(-30);
    b12.rotation.x = -Math.PI/2;
    b12.rotation.y = 2*Math.PI/3;

    s7 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s8 = s7.clone();
    s9 = s7.clone();
    s10 = s7.clone();
    s11 = s7.clone();
    s12 = s7.clone();
    s7 = drawSphere(25,0,0,0,colorChoice.chlorine);
    s7.translateY(90+60*Math.cos(Math.PI/3));
    s8.translateY(-90-60*Math.cos(Math.PI/3));
    s9.translateX(120*Math.cos(Math.PI/6));
    s9.translateY(120*Math.sin(Math.PI/6));
    s10.translateX(-120*Math.cos(Math.PI/6));
    s10.translateY(120*Math.sin(Math.PI/6));
    s11.translateX(-120*Math.cos(Math.PI/6));
    s11.translateY(-120*Math.sin(Math.PI/6));
    s12.translateX(120*Math.cos(Math.PI/6));
    s12.translateY(-120*Math.sin(Math.PI/6));
    s13 = drawLonePair( 20,25,Math.acos(-1/3)-Math.PI/2,0,"red" );
    s14 = drawLonePair( 20,25,Math.PI/3*2,Math.PI/3,"red" );
    s15 = drawLonePair( 20,25,Math.PI/3*2,-Math.PI/3,"red" );


    s13.translateY( 60*( 1.5 + Math.cos(Math.PI/3) ) );
    s14.translateY( 60*( 1.5 + Math.cos(Math.PI/3) ) );
    s15.translateY( 60*( 1.5 + Math.cos(Math.PI/3) ) );
    
    var geometry = new THREE.TorusGeometry( 50, 15, 16, 100, 2*Math.PI );
    var material = new THREE.MeshPhongMaterial( { color: 0xFF0000, specular: 0x050505, shininess: 400, transparent: true, opacity: 0.2 } );
    var torus = new THREE.Mesh( geometry, material );
    torus2 = torus.clone();
    torus.translateZ(32);
    torus2.translateZ(-32);

    C6H5Cl.add(s1.clone()); C6H5Cl.add(s2.clone()); C6H5Cl.add(s3.clone()); C6H5Cl.add(s4.clone()); C6H5Cl.add(s5.clone()); C6H5Cl.add(s6.clone()); 
    C6H5Cl.add(s7.clone()); C6H5Cl.add(s8.clone()); C6H5Cl.add(s9.clone()); C6H5Cl.add(s10.clone()); C6H5Cl.add(s11.clone()); C6H5Cl.add(s12.clone()); 
    C6H5Cl.add(b1.clone()); C6H5Cl.add(b2.clone()); C6H5Cl.add(b3.clone()); C6H5Cl.add(b4.clone()); C6H5Cl.add(b5.clone()); C6H5Cl.add(b6.clone()); 
    C6H5Cl.add(b7.clone()); C6H5Cl.add(b8.clone()); C6H5Cl.add(b9.clone()); C6H5Cl.add(b10.clone()); C6H5Cl.add(b11.clone()); C6H5Cl.add(b12.clone()); 
    // C6H6.add(s13.clone());C6H6.add(s14.clone());C6H6.add(s15.clone());C6H6.add(s16.clone());C6H6.add(s17.clone());C6H6.add(s18.clone());
    // C6H6.add(s19.clone());C6H6.add(s20.clone());C6H6.add(s21.clone());C6H6.add(s22.clone());C6H6.add(s23.clone());C6H6.add(s24.clone());
    C6H5Cl.add(torus); C6H5Cl.add(torus2); C6H5Cl.add(s13.clone()); C6H5Cl.add(s14.clone()); C6H5Cl.add(s15.clone());
    s1 = undefined;s2 = undefined;s3 = undefined;s4 = undefined;
    s5 = undefined;s6 = undefined;s7 = undefined;s8 = undefined;
    s9 = undefined;s10 = undefined;s11 = undefined;s12 = undefined;s13 = undefined;s14 = undefined;s15 = undefined;
    b1 = undefined;b2 = undefined;b3 = undefined;b4 = undefined;
    b5 = undefined;b6 = undefined;b7 = undefined;b8 = undefined;
    b9 = undefined;b10 = undefined;b11 = undefined;b12 = undefined;

    return C6H5Cl;
}
let drawC6H5OH = function(){
    C6H5OH = new THREE.Group();
    s1 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,Math.PI/3*1,colorChoice.carbon);
    s3 = drawSphere(20,60,Math.PI/2,Math.PI/3*2,colorChoice.carbon);
    s4 = drawSphere(20,60,Math.PI/2,Math.PI/3*3,colorChoice.carbon);
    s5 = drawSphere(20,60,Math.PI/2,Math.PI/3*4,colorChoice.carbon);
    s6 = drawSphere(20,60,Math.PI/2,Math.PI/3*5,colorChoice.carbon);

    b1 = new drawBond(0,0);  
    b3 = b1.clone();
    b5 = b1.clone();
    b7 = b1.clone();
    b8 = b1.clone();
    b9 = b1.clone();
    b10 = b1.clone();
    b11 = b1.clone();
    b12 = b1.clone();
    b13 = new drawBond(Math.PI/3*2,-Math.PI/3);

    b1.translateX(-60*Math.cos(Math.PI/6));
    b1.translateY(-30);
    b2 = b1.clone();
    b2.rotation.x = Math.PI/2;
    b2.rotation.y = Math.PI/3;
    b1.rotation.x = -Math.PI/2;
    b3.translateX(60*Math.cos(Math.PI/6));
    b3.translateY(-30);
    b4 = b3.clone();
    b3.rotation.x = Math.PI/2;
    b3.rotation.y = -Math.PI/3;
    b4.rotation.x = Math.PI/2;
    b4.rotation.y = Math.PI;
    b5.translateY(30+60*Math.cos(Math.PI/3));
    b6 = b5.clone();
    b5.rotation.x = Math.PI/2;
    b6.rotation.x = Math.PI/2;
    b5.rotation.y = Math.PI/3;
    b6.rotation.y = -Math.PI/3;
    b7.translateY(30+60*Math.cos(Math.PI/3));
    b7.rotation.x = -Math.PI/2;
    b8.translateY(-30-60*Math.cos(Math.PI/3));
    b8.rotation.x = Math.PI/2;
    b9.translateX(-60*Math.cos(Math.PI/6));
    b9.translateY(30);
    b9.rotation.x = -Math.PI/2;
    b9.rotation.y = -Math.PI/3;
    b10.translateX(-60*Math.cos(Math.PI/6));
    b10.translateY(-30);
    b10.rotation.x = -Math.PI/2;
    b10.rotation.y = 4*Math.PI/3;
    b11.translateX(60*Math.cos(Math.PI/6));
    b11.translateY(30);
    b11.rotation.x = -Math.PI/2;
    b11.rotation.y = Math.PI/3;
    b12.translateX(60*Math.cos(Math.PI/6));
    b12.translateY(-30);
    b12.rotation.x = -Math.PI/2;
    b12.rotation.y = 2*Math.PI/3;
    b13.translateY(60*( 1.5 + Math.cos(Math.PI/3) ));

    s7 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s8 = s7.clone();
    s9 = s7.clone();
    s10 = s7.clone();
    s11 = s7.clone();
    s12 = s7.clone();
    s7 = drawSphere(20,0,0,0,colorChoice.oxygen);
    s7.translateY(90+60*Math.cos(Math.PI/3));
    s8.translateY(-90-60*Math.cos(Math.PI/3));
    s9.translateX(120*Math.cos(Math.PI/6));
    s9.translateY(120*Math.sin(Math.PI/6));
    s10.translateX(-120*Math.cos(Math.PI/6));
    s10.translateY(120*Math.sin(Math.PI/6));
    s11.translateX(-120*Math.cos(Math.PI/6));
    s11.translateY(-120*Math.sin(Math.PI/6));
    s12.translateX(120*Math.cos(Math.PI/6));
    s12.translateY(-120*Math.sin(Math.PI/6));
    s13 = drawLonePair( 20,25,Math.acos(-1/3)-Math.PI/2,0,"red" );
    s14 = drawSphere( 20,60,Math.PI/3*2,Math.PI/3,colorChoice.hydrogen );
    s15 = drawLonePair( 20,25,Math.PI/3*2,-Math.PI/3,"red" );


    s13.translateY( 60*( 1.5 + Math.cos(Math.PI/3) ) );
    s14.translateY( 60*( 1.5 + Math.cos(Math.PI/3) ) );
    s15.translateY( 60*( 1.5 + Math.cos(Math.PI/3) ) );
    
    var geometry = new THREE.TorusGeometry( 50, 15, 16, 100, 2*Math.PI );
    var material = new THREE.MeshPhongMaterial( { color: 0xFF0000, specular: 0x050505, shininess: 400, transparent: true, opacity: 0.2 } );
    var torus = new THREE.Mesh( geometry, material );
    torus2 = torus.clone();
    torus.translateZ(32);
    torus2.translateZ(-32);

    C6H5OH.add(s1.clone()); C6H5OH.add(s2.clone()); C6H5OH.add(s3.clone()); C6H5OH.add(s4.clone()); C6H5OH.add(s5.clone()); C6H5OH.add(s6.clone()); 
    C6H5OH.add(s7.clone()); C6H5OH.add(s8.clone()); C6H5OH.add(s9.clone()); C6H5OH.add(s10.clone()); C6H5OH.add(s11.clone()); C6H5OH.add(s12.clone()); 
    C6H5OH.add(b1.clone()); C6H5OH.add(b2.clone()); C6H5OH.add(b3.clone()); C6H5OH.add(b4.clone()); C6H5OH.add(b5.clone()); C6H5OH.add(b6.clone()); 
    C6H5OH.add(b7.clone()); C6H5OH.add(b8.clone()); C6H5OH.add(b9.clone()); C6H5OH.add(b10.clone()); C6H5OH.add(b11.clone()); C6H5OH.add(b12.clone()); 
    // C6H6.add(s13.clone());C6H6.add(s14.clone());C6H6.add(s15.clone());C6H6.add(s16.clone());C6H6.add(s17.clone());C6H6.add(s18.clone());
    // C6H6.add(s19.clone());C6H6.add(s20.clone());C6H6.add(s21.clone());C6H6.add(s22.clone());C6H6.add(s23.clone());C6H6.add(s24.clone());
    C6H5OH.add(torus); C6H5OH.add(torus2); C6H5OH.add(s13.clone()); C6H5OH.add(s14.clone()); C6H5OH.add(s15.clone());
    C6H5OH.add(b13);
    s1 = undefined;s2 = undefined;s3 = undefined;s4 = undefined;
    s5 = undefined;s6 = undefined;s7 = undefined;s8 = undefined;
    s9 = undefined;s10 = undefined;s11 = undefined;s12 = undefined;s13 = undefined;s14 = undefined;s15 = undefined;
    b1 = undefined;b2 = undefined;b3 = undefined;b4 = undefined;
    b5 = undefined;b6 = undefined;b7 = undefined;b8 = undefined;
    b9 = undefined;b10 = undefined;b11 = undefined;b12 = undefined;b13 = undefined;

    return C6H5OH;
}
let drawC6H5CO2H = function(){
    C6H5CO2H = new THREE.Group();
    s1 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,Math.PI/3*1,colorChoice.carbon);
    s3 = drawSphere(20,60,Math.PI/2,Math.PI/3*2,colorChoice.carbon);
    s4 = drawSphere(20,60,Math.PI/2,Math.PI/3*3,colorChoice.carbon);
    s5 = drawSphere(20,60,Math.PI/2,Math.PI/3*4,colorChoice.carbon);
    s6 = drawSphere(20,60,Math.PI/2,Math.PI/3*5,colorChoice.carbon);

    b1 = new drawBond(0,0);  
    b3 = b1.clone();
    b5 = b1.clone();
    b7 = b1.clone();
    b8 = b1.clone();
    b9 = b1.clone();
    b10 = b1.clone();
    b11 = b1.clone();
    b12 = b1.clone();

    b1.translateX(-60*Math.cos(Math.PI/6));
    b1.translateY(-30);
    b2 = b1.clone();
    b2.rotation.x = Math.PI/2;
    b2.rotation.y = Math.PI/3;
    b1.rotation.x = -Math.PI/2;
    b3.translateX(60*Math.cos(Math.PI/6));
    b3.translateY(-30);
    b4 = b3.clone();
    b3.rotation.x = Math.PI/2;
    b3.rotation.y = -Math.PI/3;
    b4.rotation.x = Math.PI/2;
    b4.rotation.y = Math.PI;
    b5.translateY(30+60*Math.cos(Math.PI/3));
    b6 = b5.clone();
    b5.rotation.x = Math.PI/2;
    b6.rotation.x = Math.PI/2;
    b5.rotation.y = Math.PI/3;
    b6.rotation.y = -Math.PI/3;
    b7.translateY(30+60*Math.cos(Math.PI/3));
    b7.rotation.x = -Math.PI/2;
    b8.translateY(-30-60*Math.cos(Math.PI/3));
    b8.rotation.x = Math.PI/2;
    b9.translateX(-60*Math.cos(Math.PI/6));
    b9.translateY(30);
    b9.rotation.x = -Math.PI/2;
    b9.rotation.y = -Math.PI/3;
    b10.translateX(-60*Math.cos(Math.PI/6));
    b10.translateY(-30);
    b10.rotation.x = -Math.PI/2;
    b10.rotation.y = 4*Math.PI/3;
    b11.translateX(60*Math.cos(Math.PI/6));
    b11.translateY(30);
    b11.rotation.x = -Math.PI/2;
    b11.rotation.y = Math.PI/3;
    b12.translateX(60*Math.cos(Math.PI/6));
    b12.translateY(-30);
    b12.rotation.x = -Math.PI/2;
    b12.rotation.y = 2*Math.PI/3;

    s7 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s8 = s7.clone();
    s9 = s7.clone();
    s10 = s7.clone();
    s11 = s7.clone();
    s12 = s7.clone();
    s7.translateY(90+60*Math.cos(Math.PI/3));
    s8.translateY(-90-60*Math.cos(Math.PI/3));
    s9.translateX(120*Math.cos(Math.PI/6));
    s9.translateY(120*Math.sin(Math.PI/6));
    s10.translateX(-120*Math.cos(Math.PI/6));
    s10.translateY(120*Math.sin(Math.PI/6));
    s11.translateX(-120*Math.cos(Math.PI/6));
    s11.translateY(-120*Math.sin(Math.PI/6));
    s12.translateX(120*Math.cos(Math.PI/6));
    s12.translateY(-120*Math.sin(Math.PI/6));
    
    var geometry = new THREE.TorusGeometry( 50, 15, 16, 100, 2*Math.PI );
    var material = new THREE.MeshPhongMaterial( { color: 0xFF0000, specular: 0x050505, shininess: 400, transparent: true, opacity: 0.2 } );
    var torus = new THREE.Mesh( geometry, material );
    torus2 = torus.clone();
    torus.translateZ(32);
    torus2.translateZ(-32);

    C6H5CO2H.add(s1.clone()); C6H5CO2H.add(s2.clone()); C6H5CO2H.add(s3.clone()); C6H5CO2H.add(s4.clone()); C6H5CO2H.add(s5.clone()); C6H5CO2H.add(s6.clone()); 
    C6H5CO2H.add(s7.clone()); C6H5CO2H.add(s8.clone()); C6H5CO2H.add(s9.clone()); C6H5CO2H.add(s10.clone()); C6H5CO2H.add(s11.clone()); C6H5CO2H.add(s12.clone()); 
    C6H5CO2H.add(b1.clone()); C6H5CO2H.add(b2.clone()); C6H5CO2H.add(b3.clone()); C6H5CO2H.add(b4.clone()); C6H5CO2H.add(b5.clone()); C6H5CO2H.add(b6.clone()); 
    C6H5CO2H.add(b7.clone()); C6H5CO2H.add(b8.clone()); C6H5CO2H.add(b9.clone()); C6H5CO2H.add(b10.clone()); C6H5CO2H.add(b11.clone()); C6H5CO2H.add(b12.clone()); 
    // C6H6.add(s13.clone());C6H6.add(s14.clone());C6H6.add(s15.clone());C6H6.add(s16.clone());C6H6.add(s17.clone());C6H6.add(s18.clone());
    // C6H6.add(s19.clone());C6H6.add(s20.clone());C6H6.add(s21.clone());C6H6.add(s22.clone());C6H6.add(s23.clone());C6H6.add(s24.clone());
    C6H5CO2H.add(torus); C6H5CO2H.add(torus2); 

    C1 = CO2H.clone();

    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 60, 0) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 60, 0) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    C1.add(line);C1.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;

    e1 = drawLonePair(15,25,Math.PI/3,Math.PI/2,"red");
    e2 = drawLonePair(15,25,Math.PI/3,-Math.PI/2, "red");
    e1.translateY( -60*Math.sin(Math.PI/3) );
    e2.translateY( -60*Math.sin(Math.PI/3) );
    e1.translateZ( 60*Math.cos(Math.PI/3) );
    e2.translateZ( 60*Math.cos(Math.PI/3) );
    C1.add(e1);C1.add(e2);

    C1.translateZ( 60*( 1.5 + Math.cos(Math.PI/3) ) );
    C1.rotation.z += Math.PI/2;
    C1.rotation.y += Math.PI/6;
    
    C6H5CO2H.add(C1);C1=undefined;

    s1 = undefined;s2 = undefined;s3 = undefined;s4 = undefined;
    s5 = undefined;s6 = undefined;s7 = undefined;s8 = undefined;
    s9 = undefined;s10 = undefined;s11 = undefined;s12 = undefined;
    b1 = undefined;b2 = undefined;b3 = undefined;b4 = undefined;
    b5 = undefined;b6 = undefined;b7 = undefined;b8 = undefined;
    b9 = undefined;b10 = undefined;b11 = undefined;b12 = undefined;
    C1 = undefined;e1=undefined;e2=undefined;
    e1 = e2 = l1 = l2 = undefined;

    return C6H5CO2H;
}
let drawC2H4 = function(){
    C2H4 = new THREE.Group();
    // carbon atom
    s1 = drawSphere(20,0,0,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    // hydrogen atoms
    s3 = drawSphere(15,60,-Math.PI/6,0,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.PI/6 - Math.PI,0,colorChoice.hydrogen);
    s5 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s6 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    
    //bonds
    b1 = drawBond(-Math.PI/6,0,colorChoice.bond);
    b2 = drawBond(Math.PI/6 - Math.PI,0,colorChoice.bond);
    b3 = drawBond(Math.PI/6,0,colorChoice.bond);
    b4 = drawBond(-Math.PI/6 + Math.PI,0,colorChoice.bond);
    b5 = drawBond(Math.PI/2,0,colorChoice.bond);
    
    //Lone pairs
    l1 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
    l2 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");
    l3 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
    l4 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");

    // Lines
    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 60, 0) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();

    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 60, 0) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();

    // Adjustments    
    s5.translateY(60+60*Math.cos(Math.PI/3));
    s6.translateY(60+60*Math.cos(Math.PI/3));
    s5.translateZ(60*Math.sin(Math.PI/3));
    s6.translateZ(-60*Math.sin(Math.PI/3));
    b3.translateY(40+40*Math.cos(Math.PI/3));
    b4.translateY(40+40*Math.cos(Math.PI/3));
    l1.translateY(60);
    l2.translateY(60);

    C2H4.add(s1.clone()); C2H4.add(s2.clone()); 
    C2H4.add(s3.clone());C2H4.add(s4.clone());
    C2H4.add(s5.clone());C2H4.add(s6.clone());
    C2H4.add(b1.clone());C2H4.add(b2.clone());
    C2H4.add(b3.clone());C2H4.add(b4.clone());
    C2H4.add(b5.clone());
    C2H4.add(l1.clone());C2H4.add(l2.clone());
    C2H4.add(l3.clone());C2H4.add(l4.clone());
    C2H4.add(line);C2H4.add(line2);
    C2H4.translateY(-30);

    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    b1.geometry.dispose();b1.material.dispose();b1 = undefined;
    b2.geometry.dispose();b2.material.dispose();b2 = undefined;
    b3.geometry.dispose();b3.material.dispose();b3 = undefined;
    b4.geometry.dispose();b4.material.dispose();b4 = undefined;
    b5.geometry.dispose();b5.material.dispose();b5 = undefined;
    l1.geometry.dispose();l1.material.dispose();l1 = undefined;
    l2.geometry.dispose();l2.material.dispose();l2 = undefined;
    l3.geometry.dispose();l3.material.dispose();l3 = undefined;
    l4.geometry.dispose();l4.material.dispose();l4 = undefined;
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;
    return C2H4;
}
let drawC3H6 = function(){
    C3H6 = new THREE.Group();
    methyl = new THREE.Group();
    // carbon atom
    s1 = drawSphere(20,0,0,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    // hydrogen atoms
    s3 = drawSphere(15,60,-Math.PI/6,0,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.PI/6 - Math.PI,0,colorChoice.hydrogen);
    s5 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s6 = drawSphere(15,0,0,0,colorChoice.hydrogen);

    s7 = drawSphere(20,0,0,0,colorChoice.carbon);
    s8 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s9 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s10 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    
    //bonds
    b1 = drawBond(-Math.PI/6,0,colorChoice.bond);
    b2 = drawBond(Math.PI/6 - Math.PI,0,colorChoice.bond);
    b3 = drawBond(Math.PI/6,0,colorChoice.bond);
    b4 = drawBond(-Math.PI/6 + Math.PI,0,colorChoice.bond);
    b5 = drawBond(Math.PI/2,0,colorChoice.bond);
    b6 = drawBond(0,0,colorChoice.bond);
    b7 = drawBond(Math.acos(-1/3),0,colorChoice.bond);
    b8 = drawBond(Math.acos(-1/3),2*Math.PI/3,colorChoice.bond);
    b9 = drawBond(Math.acos(-1/3),4*Math.PI/3,colorChoice.bond);

    methyl.add(s7.clone());methyl.add(s8.clone());
    methyl.add(s9.clone());methyl.add(s10.clone())
    methyl.add(b6.clone());methyl.add(b7.clone());
    methyl.add(b8.clone());methyl.add(b9.clone());
    methyl.translateY(60+60*Math.cos(Math.PI/3));
    methyl.translateZ(60*Math.sin(Math.PI/3));
    methyl.rotation.x = -(Math.PI-Math.acos(-1/3)+Math.PI/6);
    // -7/6*Math.PI + Math.acos(-1/3)
     
    //Lone pairs
    l1 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
    l2 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");
    l3 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
    l4 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");

    // Lines
    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 60, 0) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();

    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 60, 0) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();

    // Adjustments    
    s5.translateY(60+60*Math.cos(Math.PI/3));
    s6.translateY(60+60*Math.cos(Math.PI/3));
    s5.translateZ(60*Math.sin(Math.PI/3));
    s6.translateZ(-60*Math.sin(Math.PI/3));
    b3.translateY(40+40*Math.cos(Math.PI/3));
    b4.translateY(40+40*Math.cos(Math.PI/3));
    l1.translateY(60);
    l2.translateY(60);

    C3H6.add(s1.clone()); C3H6.add(s2.clone()); 
    C3H6.add(s3.clone());C3H6.add(s4.clone());
    C3H6.add(s5.clone());C3H6.add(s6.clone());;
    C3H6.add(methyl);

    C3H6.add(b1.clone());C3H6.add(b2.clone());
    C3H6.add(b3.clone());C3H6.add(b4.clone());
    C3H6.add(b5.clone());
    C3H6.add(l1.clone());C3H6.add(l2.clone());
    C3H6.add(l3.clone());C3H6.add(l4.clone());
    C3H6.add(line);C3H6.add(line2);  

    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    s7.geometry.dispose();s7.material.dispose();s7 = undefined;
    s8.geometry.dispose();s8.material.dispose();s8 = undefined;
    s9.geometry.dispose();s9.material.dispose();s9 = undefined;
    s10.geometry.dispose();s10.material.dispose();s10 = undefined;
        
    b1.geometry.dispose();b1.material.dispose();b1 = undefined;
    b2.geometry.dispose();b2.material.dispose();b2 = undefined;
    b3.geometry.dispose();b3.material.dispose();b3 = undefined;
    b4.geometry.dispose();b4.material.dispose();b4 = undefined;
    b5.geometry.dispose();b5.material.dispose();b5 = undefined;
    
    b6.geometry.dispose();b6.material.dispose();b6 = undefined;
    b7.geometry.dispose();b7.material.dispose();b7 = undefined;
    b8.geometry.dispose();b8.material.dispose();b8 = undefined;
    b9.geometry.dispose();b9.material.dispose();b9 = undefined;

    l1.geometry.dispose();l1.material.dispose();l1 = undefined;
    l2.geometry.dispose();l2.material.dispose();l2 = undefined;
    l3.geometry.dispose();l3.material.dispose();l3 = undefined;
    l4.geometry.dispose();l4.material.dispose();l4 = undefined;
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;
    C3H6.translateY(-30);
    return C3H6;
}
let drawC4H8cis = function(){
    C4H8cis = new THREE.Group();
    methyl = new THREE.Group();
    methyl2 = new THREE.Group();
    // carbon atom
    s1 = drawSphere(20,0,0,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    // hydrogen atoms
    s3 = drawSphere(15,60,-Math.PI/6,0,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.PI/6 - Math.PI,0,colorChoice.hydrogen);
    s5 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s6 = drawSphere(15,0,0,0,colorChoice.hydrogen);

    s7 = drawSphere(20,0,0,0,colorChoice.carbon);
    s8 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s9 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s10 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    
    //bonds
    b1 = drawBond(-Math.PI/6,0,colorChoice.bond);
    b2 = drawBond(Math.PI/6 - Math.PI,0,colorChoice.bond);
    b3 = drawBond(Math.PI/6,0,colorChoice.bond);
    b4 = drawBond(-Math.PI/6 + Math.PI,0,colorChoice.bond);
    b5 = drawBond(Math.PI/2,0,colorChoice.bond);
    b6 = drawBond(0,0,colorChoice.bond);
    b7 = drawBond(Math.acos(-1/3),0,colorChoice.bond);
    b8 = drawBond(Math.acos(-1/3),2*Math.PI/3,colorChoice.bond);
    b9 = drawBond(Math.acos(-1/3),4*Math.PI/3,colorChoice.bond);

    methyl.add(s7.clone());methyl.add(s8.clone());
    methyl.add(s9.clone());methyl.add(s10.clone())
    methyl.add(b6.clone());methyl.add(b7.clone());
    methyl.add(b8.clone());methyl.add(b9.clone());
    methyl2= methyl.clone();

    methyl.translateY(60+60*Math.cos(Math.PI/3));
    methyl.translateZ(60*Math.sin(Math.PI/3));
    methyl.rotation.x = -(Math.PI-Math.acos(-1/3)+Math.PI/6);


    // methyl2.translateY( -60*(1+2*Math.cos(Math.PI/3)) );
    // methyl2.translateZ(-60*Math.sin(Math.PI/3));
    
    methyl2.translateY(-60*Math.sin(Math.PI/6));
    methyl2.translateZ(60*Math.cos(Math.PI/6));
    methyl2.rotation.x=-(Math.PI - Math.acos(-1/3) - Math.PI/6)
    // -7/6*Math.PI + Math.acos(-1/3)
     
    //Lone pairs
    l1 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
    l2 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");
    l3 = drawLonePair(15,30,Math.PI/2,Math.PI/2,"red");
    l4 = drawLonePair(15,30,Math.PI/2,-Math.PI/2,"red");

    // Lines
    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 60, 0) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();

    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 60, 0) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();

    // Adjustments    
    s5.translateY(60+60*Math.cos(Math.PI/3));
    s6.translateY(60+60*Math.cos(Math.PI/3));
    s5.translateZ(60*Math.sin(Math.PI/3));
    s6.translateZ(-60*Math.sin(Math.PI/3));
    b3.translateY(40+40*Math.cos(Math.PI/3));
    b4.translateY(40+40*Math.cos(Math.PI/3));
    l1.translateY(60);
    l2.translateY(60);

    C4H8cis.add(s1.clone()); C4H8cis.add(s2.clone()); 
    C4H8cis.add(s3.clone());C4H8cis.add(s4.clone());
    C4H8cis.add(s5.clone());C4H8cis.add(s6.clone());;
    C4H8cis.add(methyl);C4H8cis.add(methyl2);

    C4H8cis.add(b1.clone());C4H8cis.add(b2.clone());
    C4H8cis.add(b3.clone());C4H8cis.add(b4.clone());
    C4H8cis.add(b5.clone());
    C4H8cis.add(l1.clone());C4H8cis.add(l2.clone());
    C4H8cis.add(l3.clone());C4H8cis.add(l4.clone());
    C4H8cis.add(line);C4H8cis.add(line2);  
    C4H8cis.translateY(-30);

    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    s7.geometry.dispose();s7.material.dispose();s7 = undefined;
    s8.geometry.dispose();s8.material.dispose();s8 = undefined;
    s9.geometry.dispose();s9.material.dispose();s9 = undefined;
    s10.geometry.dispose();s10.material.dispose();s10 = undefined;
        
    b1.geometry.dispose();b1.material.dispose();b1 = undefined;
    b2.geometry.dispose();b2.material.dispose();b2 = undefined;
    b3.geometry.dispose();b3.material.dispose();b3 = undefined;
    b4.geometry.dispose();b4.material.dispose();b4 = undefined;
    b5.geometry.dispose();b5.material.dispose();b5 = undefined;
    
    b6.geometry.dispose();b6.material.dispose();b6 = undefined;
    b7.geometry.dispose();b7.material.dispose();b7 = undefined;
    b8.geometry.dispose();b8.material.dispose();b8 = undefined;
    b9.geometry.dispose();b9.material.dispose();b9 = undefined;

    l1.geometry.dispose();l1.material.dispose();l1 = undefined;
    l2.geometry.dispose();l2.material.dispose();l2 = undefined;
    l3.geometry.dispose();l3.material.dispose();l3 = undefined;
    l4.geometry.dispose();l4.material.dispose();l4 = undefined;
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;

    return C4H8cis;
}
let drawC4H8trans = function(){
    C4H8trans = sp2.clone().translateY(-30);
    methyl = sp3.clone();
    methyl.add( drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen) );
    methyl.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );
    methyl.add( drawSphere(15,60,Math.acos(-1/3),-Math.PI/3*2,colorChoice.hydrogen) );
    methyl2 = methyl.clone();
    methyl.translateY( 60+60*Math.cos( Math.PI/3 ) );
    methyl.translateZ( -60*Math.sin( Math.PI/3 ) )
    methyl.rotation.x += Math.PI/6;

    methyl2.translateY( -60*Math.cos( Math.PI/3 ) );
    methyl2.translateZ( 60*Math.sin( Math.PI/3 ) )
    methyl2.rotation.x += 7*Math.PI/6;

    C4H8trans.add( drawSphere(15,60,Math.PI/6,0,colorChoice.hydrogen).translateY(60) );
    C4H8trans.add( drawSphere(15,60,5*Math.PI/6,Math.PI,colorChoice.hydrogen) );
    C4H8trans.add(methyl);C4H8trans.add(methyl2);
    methyl=undefined;methyl2=undefined;

    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 60, 0) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 60, 0) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    C4H8trans.add(line);C4H8trans.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;

    return C4H8trans;
}
let drawCH3OH = function(){
    CH3OH = new THREE.Group();
    s1 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s2 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    CH3OH.add(OH.clone());
    CH3OH.add(s1.clone());
    CH3OH.add(s2.clone());
    CH3OH.add(s3.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    CH3OH.rotation.x = -Math.PI;
    // CH3OH.rotation.z = -Math.PI/3;
    return CH3OH;
}
let drawC2H5OH = function(){
    C2H5OH = new THREE.Group();
    s1 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s4 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s6 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    C2 = sp3.clone();
    C2.add(s4);
    C2.add(s5);
    C2.add(s6);
    C2.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    C2.translateX(60*Math.cos(Math.PI/6));
    C2.translateY(-60*Math.sin(Math.PI/6));
    C2.rotation.z = Math.PI/3;
    C2.rotation.x = Math.PI - Math.acos(-1/3);
    C2H5OH.add(OH.clone());
    C2H5OH.add(s1.clone());
    C2H5OH.add(s3.clone());
    C2H5OH.add(C2.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    C2.geometry.dispose();C2.material.dispose();C2 = undefined;
    C2H5OH.rotation.x = -Math.PI;
    // C2H5OH.rotation.z = -Math.PI/3;
    return C2H5OH;
}
let drawCH3CH2OHCH3 = function(){
    CH3CH2OHCH3 = new THREE.Group();
    s3 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s4 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s6 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s7 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s8 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s9 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    
    C2 = sp3.clone();
    C2.add(s4);
    C2.add(s5);
    C2.add(s6);
    C2.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    C2.translateX(60*Math.cos(Math.PI/6));
    C2.translateY(-60*Math.sin(Math.PI/6));
    C2.rotation.z = Math.PI/3;
    C2.rotation.x = Math.PI - Math.acos(-1/3);

    C3 = sp3.clone();
    C3.add(s7);
    C3.add(s8);
    C3.add(s9);
    C3.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    C3.translateY(60*Math.cos(Math.acos(-1/3)-Math.PI/2));
    C3.rotation.x = Math.PI-Math.acos(-1/3);

    CH3CH2OHCH3.add(OH.clone());
    CH3CH2OHCH3.add(s3.clone());
    CH3CH2OHCH3.add(C2.clone());
    CH3CH2OHCH3.add(C3.clone());
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    s7.geometry.dispose();s7.material.dispose();s7 = undefined;
    s8.geometry.dispose();s8.material.dispose();s8 = undefined;
    s9.geometry.dispose();s9.material.dispose();s9 = undefined;
    C2.geometry.dispose();C2.material.dispose();C2 = undefined;
    C3.geometry.dispose();C3.material.dispose();C3 = undefined;
    CH3CH2OHCH3.rotation.x = -Math.PI;
    // CH3CH2OHCH3.rotation.z = -Math.PI/3;
    return CH3CH2OHCH3;
}
let drawCH33COH = function(){
    CH33COH = new THREE.Group();
    s4 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s6 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s7 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    s8 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s9 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s10 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s11 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s12 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    
    C2 = sp3.clone();
    C2.add(s4);
    C2.add(s5);
    C2.add(s6);
    C2.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    C2.translateX(60*Math.cos(Math.PI/6));
    C2.translateY(-60*Math.sin(Math.PI/6));
    C2.rotation.z = Math.PI/3;
    C2.rotation.x = Math.PI - Math.acos(-1/3);

    C3 = sp3.clone();
    C3.add(s10);
    C3.add(s11);
    C3.add(s12);
    C3.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    C3.translateY(60*Math.cos(Math.acos(-1/3)-Math.PI/2));
    C3.rotation.x = Math.PI-Math.acos(-1/3);

    C4 = sp3.clone();
    C4.add(s7);
    C4.add(s8);
    C4.add(s9);
    C4.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    C4.translateX(-60*Math.cos(Math.PI/6));
    C4.translateY(-60*Math.sin(Math.PI/6));
    C4.rotation.z = Math.PI/3;
    C4.rotation.x = Math.PI - Math.acos(-1/3);


    CH33COH.add(OH.clone());
    CH33COH.add(C2.clone());
    CH33COH.add(C3.clone());
    CH33COH.add(C4.clone());
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    s7.geometry.dispose();s7.material.dispose();s7 = undefined;
    s8.geometry.dispose();s8.material.dispose();s8 = undefined;
    s9.geometry.dispose();s9.material.dispose();s9 = undefined;
    s10.geometry.dispose();s10.material.dispose();s10 = undefined;
    s11.geometry.dispose();s11.material.dispose();s11 = undefined;
    s12.geometry.dispose();s12.material.dispose();s12 = undefined;
    C2.geometry.dispose();C2.material.dispose();C2 = undefined;
    C3.geometry.dispose();C3.material.dispose();C3 = undefined;
    C4.geometry.dispose();C4.material.dispose();C4 = undefined;
    CH33COH.rotation.x = -Math.PI;
    // CH3CH2OHCH3.rotation.z = -Math.PI/3;
    return CH33COH;
}
let drawHCHO = function(){
    HCHO = new THREE.Group();
    s1 = drawSphere(15,60,-Math.PI/3,0,colorChoice.hydrogen);
    HCHO.add(CHO.clone());
    HCHO.add(s1.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
var material = new THREE.LineDashedMaterial( { 
    color: 0x000000,
    linewidth: 15,
    scale: 1,
    dashSize: 3,
    gapSize: 1 } );
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 30, 0, -60) );
var line = new THREE.Line( geometry, material );
line.computeLineDistances ();
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
geometry2.vertices.push(new THREE.Vector3( -30, 0, -60) );
var line2 = new THREE.Line( geometry2, material );
line2.computeLineDistances ();
HCHO.add(line);HCHO.add(line2);
line.geometry.dispose();line.material.dispose();line=undefined;
line2.geometry.dispose();line2.material.dispose();line2=undefined;
    return HCHO;
}
let drawCH3COCH3 = function(){
    CH3COCH3 = new THREE.Group();
    CH3COCH3.add(CO.clone());
    C1 = sp3.clone();
    C3 = sp3.clone();

    s1 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s2 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    
    C1.add(s1.clone());C1.add(s2.clone());C1.add(s3.clone());
    C3.add(s1.clone());C3.add(s2.clone());C3.add(s3.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    C1.translateZ(60*Math.cos(Math.PI/3));
    C1.translateY(-60*Math.sin(Math.PI/3));
    C3.translateZ(60*Math.cos(Math.PI/3));
    C3.translateY(60*Math.sin(Math.PI/3));
    C1.rotation.x = -2*Math.PI/3;
    C3.rotation.x = 2*Math.PI/3;
    
    
    CH3COCH3.add(C1.clone());
    CH3COCH3.add(C3.clone());
    C1.geometry.dispose();C1.material.dispose();C1 = undefined;
    C3.geometry.dispose();C3.material.dispose();C3 = undefined;
    

    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 0, -60) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 0, -60) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    CH3COCH3.add(line);CH3COCH3.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;

    // CH3OH.rotation.z = -Math.PI/3;
    return CH3COCH3;
}
let drawHCOOH = function(){
    HCOOH = new THREE.Group();
    HCOOH.add(CO2H.clone());
    s1 = drawSphere(15,60,-Math.PI/3,0,colorChoice.hydrogen);
    HCOOH.add(s1.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
        
    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 0, -60) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 0, -60) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    HCOOH.add(line);HCOOH.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;


    HCOOH2 = new THREE.Group();
    HCOOH2.add(CO2H.clone());
    s1 = drawSphere(15,60,-Math.PI/3,0,colorChoice.hydrogen);
    HCOOH2.add(s1.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
        
    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 0, -60) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 0, -60) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    HCOOH2.add(line);HCOOH2.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;

    HCOOH2.translateY(160);
    HCOOH2.translateZ(-60);
    
    HCOOH2.rotation.x += Math.PI;

    HCOOH.add(HCOOH2);

    HCOOH.translateY(-80);
    HCOOH.translateZ(30);

    return HCOOH;
}
let drawCH3CO2H = function(){
    CH3CO2H = new THREE.Group();
    CH3CO2H.add(CO2H.clone());

    C2 = sp3.clone();
    s1 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s2 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    C2.add(s1.clone());    C2.add(s2.clone());    C2.add(s3.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    C2.translateZ(60*Math.cos(Math.PI/3));
    C2.translateY(-60*Math.sin(Math.PI/3)); 
    C2.rotation.x = -2*Math.PI/3;
    CH3CO2H.add(C2.clone());
    C2.geometry.dispose();C2.material.dispose();C2 = undefined;
    
    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 0, -60) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 0, -60) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    CH3CO2H.add(line);CH3CO2H.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;

    CH3CO2H2 = new THREE.Group();
    CH3CO2H2.add(CO2H.clone());

    C2 = sp3.clone();
    s1 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s2 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    C2.add(s1.clone());    C2.add(s2.clone());    C2.add(s3.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    C2.translateZ(60*Math.cos(Math.PI/3));
    C2.translateY(-60*Math.sin(Math.PI/3)); 
    C2.rotation.x = -2*Math.PI/3;
    CH3CO2H2.add(C2.clone());
    C2.geometry.dispose();C2.material.dispose();C2 = undefined;
    
    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 0, -60) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, 0, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 0, -60) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    CH3CO2H2.add(line);CH3CO2H2.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;

    CH3CO2H2.rotation.x += Math.PI;
    CH3CO2H2.translateY(-160);
    CH3CO2H2.translateZ(60);

    CH3CO2H.add(CH3CO2H2);

    
    CH3CO2H.translateY(-80);
    CH3CO2H.translateZ(30);

    return CH3CO2H;
}
let drawNH3 = function(){
    NH3 = new THREE.Group();
    NH3.add(NH2.clone());
    s1 = drawSphere(15,60,Math.PI-Math.acos(-1/3),0,colorChoice.hydrogen);
    s2 = drawSphere(15,60,Math.PI-Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.PI-Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    NH3.add(s1.clone());
    NH3.add(s2.clone());
    NH3.add(s3.clone());
    s1.geometry.dispose();s1.material.dispose();s1 = undefined;
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    return NH3;
}
let drawCH3NH2 = function(){
    CH3NH2 = new THREE.Group();
    CH3NH2.add(NH2.clone());
    C1 = sp3.clone();
    s2 = drawSphere(15,60,Math.PI-Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s3 = drawSphere(15,60,Math.PI-Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s6 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    C1.add(s4.clone());C1.add(s5.clone());C1.add(s6.clone());
    C1.translateY( 60*Math.sin( Math.PI-Math.acos(-1/3) ) );
    C1.translateZ( 60*Math.cos( Math.PI-Math.acos(-1/3) ) );
    C1.rotation.x = ( Math.acos(-1/3) );
    CH3NH2.add(s2.clone());
    CH3NH2.add(s3.clone());
    CH3NH2.add(C1.clone());
    s2.geometry.dispose();s2.material.dispose();s2 = undefined;
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    C1.geometry.dispose();C1.material.dispose();C1 = undefined;
    return CH3NH2;
}
let drawCH3CH3NH = function(){
    CH3CH3NH = new THREE.Group();
    CH3CH3NH.add(NH2.clone());
    C1 = sp3.clone();
    s3 = drawSphere(15,60,Math.PI-Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s6 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s7 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    C1.add(s4.clone());C1.add(s5.clone());C1.add(s6.clone());C1.add(s7.clone());
    C2 = C1.clone();

    C1.translateY( 60*Math.sin( Math.PI-Math.acos(-1/3) ) );
    C1.translateZ( 60*Math.cos( Math.PI-Math.acos(-1/3) ) );
    C2.translateZ( 60*Math.cos( Math.PI-Math.acos(-1/3) ) );
    C2.translateX( 60*Math.cos( Math.PI/6 ) );
    C2.translateY( -60*Math.sin( Math.PI/6 ) );
    C2.rotation.x = Math.acos(-1/3);
    C1.rotation.x = ( Math.acos(-1/3) );
    CH3CH3NH.add(s3.clone());
    CH3CH3NH.add(C1.clone());
    CH3CH3NH.add(C2.clone());

    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    s7.geometry.dispose();s7.material.dispose();s7 = undefined;
    C1.geometry.dispose();C1.material.dispose();C1 = undefined;
    C2.geometry.dispose();C2.material.dispose();C2 = undefined;
    return CH3CH3NH;
}
let drawCH33N = function(){
    CH33N = new THREE.Group();
    CH33N.add(NH2.clone());
    C1 = sp3.clone();
    s3 = drawSphere(15,60,Math.PI-Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s4 = drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen);
    s5 = drawSphere(15,60,Math.acos(-1/3),2*Math.PI/3,colorChoice.hydrogen);
    s6 = drawSphere(15,60,Math.acos(-1/3),4*Math.PI/3,colorChoice.hydrogen);
    s7 = drawSphere(15,60,0,0,colorChoice.hydrogen);
    C1.add(s4.clone());C1.add(s5.clone());C1.add(s6.clone());C1.add(s7.clone());
    C2 = C1.clone();
    C3 = C1.clone();

    C1.translateY( 60*Math.sin( Math.PI-Math.acos(-1/3) ) );
    C1.translateZ( 60*Math.cos( Math.PI-Math.acos(-1/3) ) );
    C2.translateZ( 60*Math.cos( Math.PI-Math.acos(-1/3) ) );
    C2.translateX( 60*Math.cos( Math.PI/6 ) );
    C2.translateY( -60*Math.sin( Math.PI/6 ) );
    C3.translateZ( 60*Math.cos( Math.PI-Math.acos(-1/3) ) );
    C3.translateX( -60*Math.cos( Math.PI/6 ) );
    C3.translateY( -60*Math.sin( Math.PI/6 ) );
    C2.rotation.x = Math.acos(-1/3);
    C1.rotation.x = ( Math.acos(-1/3) );
    C3.rotation.z = ( Math.PI/3 );

    CH33N.add(s3.clone());
    CH33N.add(C1.clone());    
    CH33N.add(C2.clone());
    CH33N.add(C3.clone());
    s3.geometry.dispose();s3.material.dispose();s3 = undefined;
    s4.geometry.dispose();s4.material.dispose();s4 = undefined;
    s5.geometry.dispose();s5.material.dispose();s5 = undefined;
    s6.geometry.dispose();s6.material.dispose();s6 = undefined;
    s7.geometry.dispose();s7.material.dispose();s7 = undefined;
    C1.geometry.dispose();C1.material.dispose();C1 = undefined;
    C2.geometry.dispose();C2.material.dispose();C2 = undefined;
    C3.geometry.dispose();C3.material.dispose();C3 = undefined;
    return CH33N;
}
let drawC6H5NO2 = function(){
    C6H5NO2 = new THREE.Group();
    NO2 = new THREE.Group();
    s1 = drawSphere(20,60,Math.PI/2,0,colorChoice.carbon);
    s2 = drawSphere(20,60,Math.PI/2,Math.PI/3*1,colorChoice.carbon);
    s3 = drawSphere(20,60,Math.PI/2,Math.PI/3*2,colorChoice.carbon);
    s4 = drawSphere(20,60,Math.PI/2,Math.PI/3*3,colorChoice.carbon);
    s5 = drawSphere(20,60,Math.PI/2,Math.PI/3*4,colorChoice.carbon);
    s6 = drawSphere(20,60,Math.PI/2,Math.PI/3*5,colorChoice.carbon);

    b1 = new drawBond(0,0);  
    b3 = b1.clone();
    b5 = b1.clone();
    b7 = b1.clone();
    b8 = b1.clone();
    b9 = b1.clone();
    b10 = b1.clone();
    b11 = b1.clone();
    b12 = b1.clone();

    b1.translateX(-60*Math.cos(Math.PI/6));
    b1.translateY(-30);
    b2 = b1.clone();
    b2.rotation.x = Math.PI/2;
    b2.rotation.y = Math.PI/3;
    b1.rotation.x = -Math.PI/2;
    b3.translateX(60*Math.cos(Math.PI/6));
    b3.translateY(-30);
    b4 = b3.clone();
    b3.rotation.x = Math.PI/2;
    b3.rotation.y = -Math.PI/3;
    b4.rotation.x = Math.PI/2;
    b4.rotation.y = Math.PI;
    b5.translateY(30+60*Math.cos(Math.PI/3));
    b6 = b5.clone();
    b5.rotation.x = Math.PI/2;
    b6.rotation.x = Math.PI/2;
    b5.rotation.y = Math.PI/3;
    b6.rotation.y = -Math.PI/3;
    b7.translateY(30+60*Math.cos(Math.PI/3));
    b7.rotation.x = -Math.PI/2;
    b8.translateY(-30-60*Math.cos(Math.PI/3));
    b8.rotation.x = Math.PI/2;
    b9.translateX(-60*Math.cos(Math.PI/6));
    b9.translateY(30);
    b9.rotation.x = -Math.PI/2;
    b9.rotation.y = -Math.PI/3;
    b10.translateX(-60*Math.cos(Math.PI/6));
    b10.translateY(-30);
    b10.rotation.x = -Math.PI/2;
    b10.rotation.y = 4*Math.PI/3;
    b11.translateX(60*Math.cos(Math.PI/6));
    b11.translateY(30);
    b11.rotation.x = -Math.PI/2;
    b11.rotation.y = Math.PI/3;
    b12.translateX(60*Math.cos(Math.PI/6));
    b12.translateY(-30);
    b12.rotation.x = -Math.PI/2;
    b12.rotation.y = 2*Math.PI/3;

    s7 = drawSphere(15,0,0,0,colorChoice.hydrogen);
    s8 = s7.clone();
    s9 = s7.clone();
    s10 = s7.clone();
    s11 = s7.clone();
    s12 = s7.clone();
    s7.translateY(90+60*Math.cos(Math.PI/3));
    s8.translateY(-90-60*Math.cos(Math.PI/3));
    s9.translateX(120*Math.cos(Math.PI/6));
    s9.translateY(120*Math.sin(Math.PI/6));
    s10.translateX(-120*Math.cos(Math.PI/6));
    s10.translateY(120*Math.sin(Math.PI/6));
    s11.translateX(-120*Math.cos(Math.PI/6));
    s11.translateY(-120*Math.sin(Math.PI/6));
    s12.translateX(120*Math.cos(Math.PI/6));
    s12.translateY(-120*Math.sin(Math.PI/6));
    s7 = drawSphere(20,0,0,0,colorChoice.nitrogen);
    s13 = drawSphere(20,60,Math.PI/2,Math.PI/3,colorChoice.oxygen);
    s14 = drawSphere(20,60,Math.PI/2,-Math.PI/3,colorChoice.oxygen);
    s15 = drawLonePair(15,25,0,0,"red");s16 = drawLonePair(15,25,Math.PI,0,"red");
    s17 = drawLonePair(15,25,0,0,"red");s18 = drawLonePair(15,25,Math.PI,0,"red");
    s17.translateX( 60*Math.sin(Math.PI/3) ); s17.translateY( 60*Math.cos(Math.PI/3) ); 
    s18.translateX( 60*Math.sin(Math.PI/3) ); s18.translateY( 60*Math.cos(Math.PI/3) ); 
    b13 = new drawBond(Math.PI/2,Math.PI/3);  b14 = new drawBond(Math.PI/2,-Math.PI/3);  
    NO2.add(s7);NO2.add(s13);NO2.add(s14);NO2.add(s15);NO2.add(s16);NO2.add(s17);NO2.add(s18);
    NO2.add(b13);NO2.add(b14);
    NO2.translateY( 60*(1.5+Math.cos(Math.PI/3)) );

    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 0, 0, 30) );
    geometry.vertices.push(new THREE.Vector3( 60*Math.sin(Math.PI/3), 60*Math.cos(Math.PI/3), 30) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( 0, 0, -30) );
    geometry2.vertices.push(new THREE.Vector3( 60*Math.sin(Math.PI/3), 60*Math.cos(Math.PI/3), -30) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();
    NO2.add(line);NO2.add(line2);
    line.geometry.dispose();line.material.dispose();line=undefined;
    line2.geometry.dispose();line2.material.dispose();line2=undefined;
    
    var geometry = new THREE.TorusGeometry( 50, 15, 16, 100, 2*Math.PI );
    var material = new THREE.MeshPhongMaterial( { color: 0xFF0000, specular: 0x050505, shininess: 400, transparent: true, opacity: 0.2 } );
    var torus = new THREE.Mesh( geometry, material );
    torus2 = torus.clone();
    torus.translateZ(32);
    torus2.translateZ(-32);

    C6H5NO2.add(s1.clone()); C6H5NO2.add(s2.clone()); C6H5NO2.add(s3.clone()); C6H5NO2.add(s4.clone()); C6H5NO2.add(s5.clone()); C6H5NO2.add(s6.clone()); 
    C6H5NO2.add(s8.clone()); C6H5NO2.add(s9.clone()); C6H5NO2.add(s10.clone()); C6H5NO2.add(s11.clone()); C6H5NO2.add(s12.clone()); 
    C6H5NO2.add(b1.clone()); C6H5NO2.add(b2.clone()); C6H5NO2.add(b3.clone()); C6H5NO2.add(b4.clone()); C6H5NO2.add(b5.clone()); C6H5NO2.add(b6.clone()); 
    C6H5NO2.add(b7.clone()); C6H5NO2.add(b8.clone()); C6H5NO2.add(b9.clone()); C6H5NO2.add(b10.clone()); C6H5NO2.add(b11.clone()); C6H5NO2.add(b12.clone()); 
    C6H5NO2.add(NO2);
    
    C6H5NO2.add(torus); C6H5NO2.add(torus2); 
    s1 = undefined;s2 = undefined;s3 = undefined;s4 = undefined;
    s5 = undefined;s6 = undefined;s7 = undefined;s8 = undefined;
    s9 = undefined;s10 = undefined;s11 = undefined;s12 = undefined;
    s13 = s14 = s15 = s16 =s17 = s18 = undefined;
    b13 = b14 = undefined;
    NO2 = undefined;
    b1 = undefined;b2 = undefined;b3 = undefined;b4 = undefined;
    b5 = undefined;b6 = undefined;b7 = undefined;b8 = undefined;
    b9 = undefined;b10 = undefined;b11 = undefined;b12 = undefined;

    return C6H5NO2;
}
let drawCH3Br = function(){
    CH3Br  = new THREE.Group();
    CH3Br .add( sp3.clone() );
        
    CH3Br.add( drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen) );
    CH3Br.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );
    CH3Br.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*4,colorChoice.hydrogen) );
    CH3Br.rotation.x -= Math.PI/2;
    CH3Br.add( drawSphere(30,60,0,0,colorChoice.bromine) );

    return CH3Br;
}
let drawCH3CH2Br = function(){
    CH3CH2Br = new THREE.Group();
    CH3CH2Br.add( sp3.clone() );
    g1 = sp3.clone().translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2)).translateY(60*Math.cos(Math.acos(-1/3)-Math.PI/2));
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*4,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen) );
    g1.rotation.x += Math.PI - Math.acos(-1/3);
    g1.rotation.z += Math.PI/3;
    CH3CH2Br.add( g1.clone() );
    g1 = undefined;
    
    CH3CH2Br.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );
    CH3CH2Br.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*4,colorChoice.hydrogen) );
    CH3CH2Br.rotation.x -= Math.PI/2;
    CH3CH2Br.add( drawSphere(30,60,0,0,colorChoice.bromine) );

    return CH3CH2Br;
}
let drawCH3CHBrCH3 = function(){
    CH3CHBrCH3 = new THREE.Group();
    CH3CHBrCH3.add( sp3.clone() );
    g1 = sp3.clone();
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*4,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,0,0,colorChoice.hydrogen) );
    g2 = g1.clone();

    g1.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2)).translateY(60*Math.cos(Math.acos(-1/3)-Math.PI/2));
    g1.rotation.x += Math.PI - Math.acos(-1/3);
    g1.rotation.z += Math.PI/3;

    g2.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    g2.translateX( -60*Math.cos( Math.PI*2/3-Math.PI/2 ) );
    g2.translateY( -60*Math.sin( Math.PI*2/3-Math.PI/2 ) );
    g2.rotation.z+=Math.PI/3;
    g2.rotation.x += Math.PI - Math.acos(-1/3);

    CH3CHBrCH3.add( g1.clone() );
    CH3CHBrCH3.add( g2.clone() );
    g1 = undefined;g2 = undefined;
    
    CH3CHBrCH3.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );

    CH3CHBrCH3.rotation.x -= Math.PI/2;
    CH3CHBrCH3.add( drawSphere(30,60,0,0,colorChoice.bromine) );

    return CH3CHBrCH3;
}
let drawCH3CCH3BrCH3 = function(){
    CH3CCH3BrCH3 = new THREE.Group();
    CH3CCH3BrCH3.add( sp3.clone() );
    g1 = sp3.clone();
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*4,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,0,0,colorChoice.hydrogen) );
    g2 = g1.clone();g3 = g1.clone();

    g1.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2)).translateY(60*Math.cos(Math.acos(-1/3)-Math.PI/2));
    g1.rotation.x += Math.PI - Math.acos(-1/3);
    g1.rotation.z += Math.PI/3;

    g2.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    g2.translateX( -60*Math.cos( Math.PI*2/3-Math.PI/2 ) );
    g2.translateY( -60*Math.sin( Math.PI*2/3-Math.PI/2 ) );
    g2.rotation.z+=Math.PI/3;
    g2.rotation.x += Math.PI - Math.acos(-1/3);

    g3.translateZ(-60*Math.sin(Math.acos(-1/3)-Math.PI/2));
    g3.translateX( 60*Math.cos( Math.PI*2/3-Math.PI/2 ) );
    g3.translateY( -60*Math.sin( Math.PI*2/3-Math.PI/2 ) );
    g3.rotation.z+=Math.PI/3;
    g3.rotation.x += Math.PI - Math.acos(-1/3);

    CH3CCH3BrCH3.add( g1.clone() );
    CH3CCH3BrCH3.add( g2.clone() );
    CH3CCH3BrCH3.add( g3.clone() );
    g1 = undefined;g2 = undefined;g3 = undefined;
    
    CH3CCH3BrCH3.rotation.x -= Math.PI/2;
    CH3CCH3BrCH3.add( drawSphere(30,60,0,0,colorChoice.bromine) );

    return CH3CCH3BrCH3;
}


let drawCCH33 = function(){
    CCH33 = drawSphere(20,0,0,0,colorChoice.carbon);
    g1 = sp3.clone();
    g1.add( drawSphere(15,60,0,0,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),0,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*2,colorChoice.hydrogen) );
    g1.add( drawSphere(15,60,Math.acos(-1/3),Math.PI/3*4,colorChoice.hydrogen) );
    g2 = g1.clone();
    g3 = g1.clone();

    g1.translateZ( 60 );
    g2.translateZ( -60*Math.cos( Math.PI/3 ) );
    g3.translateZ( -60*Math.cos( Math.PI/3 ) );
    g2.translateX( 60*Math.sin( Math.PI/3 ) );
    g3.translateX( -60*Math.sin( Math.PI/3 ) );
    g1.rotation.y += Math.PI;
    g2.rotation.y -= Math.PI/3;
    g3.rotation.y += Math.PI/3;
    
    // g1.rotation.z += Math.PI;
    g2.rotation.z += Math.PI/6;
    g3.rotation.z -= Math.PI/6;

    CCH33.add( g1.clone() );CCH33.add( g2.clone() );CCH33.add( g3.clone() );
    g1 = g2 = g3 = undefined;

    var material9 = new THREE.LineBasicMaterial( { color : "red" } );
    geometry9 = new THREE.TextGeometry("+", {font:font, size:30, height:1});
    text = new THREE.Mesh(geometry9, material9);
    text.position.x = 15;
    text.position.y = 0;
    text.position.z = 15;
    text.rotation.x = Math.PI/2;
    CCH33.add(text);
    text.geometry.dispose();text.material.dispose();text = undefined;
    CCH33.rotation.z += Math.PI/2;

    return CCH33;
}