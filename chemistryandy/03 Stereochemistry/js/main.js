let scene1, camera1, renderer1;
let scene2, camera2, renderer2;
var controls1; var controls2;

let loader = new THREE.FontLoader();
let font = loader.parse(fontJSON);

var syncView = true;

var turn = false;

//CPK colour rules
var cpk = {
    bond: 0x444444,
    carbon: 0x808080,
    oxygen: 0xF00000,
    hydrogen: 0xFFFFFF,
    nitrogen: 0x8F8FFF,
    sulfur: 0xFFC832,
    phosphurus: 0xFFA500,
    chlorine: 0x00FF00,
    bromine: 0xA52A2A,
    zinc: 0xA52A2A,
    sodium: 0x0000FF,
    iron: 0xFFA500,
    magnesium: 0x2A802A,
    calcium: 0x808090,
    unknown: 0xFF1493
}

function resizeCanvas(){
    camera1.aspect = window.innerWidth / window.innerHeight/2;  
    camera1.updateProjectionMatrix();
    renderer1.setSize(window.innerWidth/2, window.innerHeight);
    camera2.aspect = window.innerWidth / window.innerHeight/2;  
    camera2.updateProjectionMatrix();
    renderer2.setSize(window.innerWidth/2, window.innerHeight);
}
window.addEventListener('resize', resizeCanvas, false);

let drawSphere = function(rad,r,thheta,phhi,col){
    var geometry = new THREE.SphereGeometry(rad,32,32);
    // var material = new THREE.MeshLambertMaterial( { color: col } );
    var material = new THREE.MeshPhongMaterial( { color: col, 
        specular: 0x050505, 
        shininess: 400} );
        
    // var material =new THREE.MeshBasicMaterial( {color: col} );
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = r*Math.sin(thheta)*Math.cos(phhi);
    sphere.position.x = r*Math.sin(thheta)*Math.sin(phhi);
    sphere.position.z = r*Math.cos(thheta);
    return sphere;
}
let drawBond = function(thheta,phhi){
    var geometry = new THREE.CylinderGeometry(4,4,50,32);
    col = 0x40404F;
    //Initialise bond directions to spherical coordinate
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 25, 0 ) );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 180 * 90 ) );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( -Math.PI / 180 * 90 ) );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -thheta ) );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( phhi ) );
    var material = new THREE.MeshPhongMaterial( { color: col, specular: 0x050505, shininess: 400 } );
    var cylinder = new THREE.Mesh( geometry, material );
    // cylinder.rotation.x = Math.PI/2+theta;
    // cylinder.rotation.z = psi;
    return cylinder;
}

let drawLonePair = function(rad,r,thheta,phhi,col){
    var geometry = new THREE.SphereGeometry(rad,32,32);
    var material = new THREE.MeshPhongMaterial( { color: col, specular: 0x050505, shininess: 400, transparent: true, opacity: 0.2 } );
    // var material = new THREE.MeshBasicMaterial( { color: col, wireframe:false,transparent: true, opacity: 0.35  } );
    // var material =new THREE.MeshBasicMaterial( {color: col} );
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = r*Math.sin(thheta)*Math.cos(phhi);
    sphere.position.x = r*Math.sin(thheta)*Math.sin(phhi);
    sphere.position.z = r*Math.cos(thheta);
    return sphere;
}

let drawCH4 = function(sc){
    CH4 = new THREE.Group();
    //Carbon atom
    s1 = drawSphere(20,0,0,0,0x999999);
    //Hydrogen atoms
    s2 = drawSphere(15,50,0,0,0xFFFFFF);
    s3 = drawSphere(15,50,Math.acos(-1/3),2/3*Math.PI,0x00FF00);
    
    if (sc == "l"){
        s4 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xDBDB67);
        s5 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0xD20117);
    }else if (sc == "d"){
        s4 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xD20117);
    s5 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0xDBDB67);
    }
    
    //Draw sticks
    b1 = drawBond(Math.acos(-1/3),4/3*Math.PI,0x444444);
    b2 = drawBond(Math.acos(-1/3), 2*Math.PI,0x444444);
    b3 = drawBond(Math.acos(-1/3), 2/3*Math.PI,0x444444);
    b4 = drawBond(0,0,0x00FF00);

    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("C", {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 15;
    text.position.z = 15;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;

    geometry2 = new THREE.TextGeometry("H", {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry2, material);
    text2.position.x = 0;
    text2.position.y = -5;
    text2.position.z = 67;
    text2.rotation.x = Math.PI/2;
    text2.rotation.y = Math.PI/2;

    geometry4 = new THREE.TextGeometry("Cl", {font:font, size:10, height:1});
    text4 = new THREE.Mesh(geometry4, material);
    text4.position.x = 40;
    text4.position.y = -50;
    text4.position.z = -10;
    text4.rotation.x = Math.PI/2;
    text4.rotation.y = Math.PI/2;

    if (sc == "d"){
        geometry3 = new THREE.TextGeometry("Br", {font:font, size:10, height:1});
        text3 = new THREE.Mesh(geometry3, material);
        text3.position.x = 0;
        text3.position.y = 65;
        text3.position.z = -15;
        text3.rotation.x = Math.PI/2;
        text3.rotation.y = Math.PI/2;
    }else if (sc == "l"){
        geometry3 = new THREE.TextGeometry("F", {font:font, size:10, height:1});
        text3 = new THREE.Mesh(geometry3, material);
        text3.position.x = 0;
        text3.position.y = 60;
        text3.position.z = -10;
        text3.rotation.x = Math.PI/2;
        text3.rotation.y = Math.PI/2;
    }

    if (sc == "d"){
        geometry5 = new THREE.TextGeometry("F", {font:font, size:10, height:1});
        text5 = new THREE.Mesh(geometry5, material);
        text5.position.x = -40;
        text5.position.y = -50;
        text5.position.z = -15;
        text5.rotation.x = Math.PI/2;
        text5.rotation.y = Math.PI/2;
    }else if (sc == "l"){
        geometry5 = new THREE.TextGeometry("Br", {font:font, size:10, height:1});
        text5 = new THREE.Mesh(geometry5, material);
        text5.position.x = -45;
        text5.position.y = -50;
        text5.position.z = -15;
        text5.rotation.x = Math.PI/2;
        text5.rotation.y = Math.PI/2;
    }

    // var material2 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 400 } );
    // var curve = new THREE.EllipseCurve(
    //     0, 0,             // ax, aY
    //     35, 35,            // xRadius, yRadius
    //     0, Math.acos(-1/3), // aStartAngle, aEndAngle
    //     false,             // aClockwise
    //     Math.PI/2                 // rotation
    // );
    // var points = curve.getSpacedPoints( 20 );
    // var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    // var ellipse = new THREE.Line( geometry2, material2 );
    // ellipse.rotation.x = Math.PI/2;
    // ellipse.rotation.z = -Math.PI/8-Math.PI/2;
    // ellipse.rotation.y = Math.PI/2;
    // CH4.add(ellipse);

    CH4.add(s1); CH4.add(s2); CH4.add(s3); CH4.add(s4); CH4.add(s5);
    CH4.add(b1); CH4.add(b2); CH4.add(b3); CH4.add(b4); 
    CH4.add(text); CH4.add(text2); CH4.add(text3); CH4.add(text4); CH4.add(text5);
    return CH4;
}

let drawbut2ene = function(sc){
    but2ene = new THREE.Group();
    //Carbon atom
    s1 = drawSphere(20,30,Math.PI/2,0,0x000000);
    s2 = drawSphere(20,30,-Math.PI/2,0,0x000000);

    s5 = drawSphere(20,60,-Math.PI/6,0,0xFFFFFF);
    s6 = drawSphere(20,60,-Math.PI/6*5,0,0x00FF00);

    if (sc=="Z"){
        s3 = drawSphere(20,60,Math.PI/6,0,0xFFFFFF);
        s4 = drawSphere(20,60,Math.PI/6*5,0,0x00FF00);
    } else if (sc=="E"){
        s3 = drawSphere(20,60,Math.PI/6,0,0x00FF00);
        s4 = drawSphere(20,60,Math.PI/6*5,0,0xFFFFFF);
    }

    s3.translateY(30);
    s4.translateY(30);
    s5.translateY(-30);
    s6.translateY(-30);

    b1 = drawBond(Math.PI/2,0);
    b1.translateY(-25);

    b2 = drawBond(Math.PI/6,0);
    b2.translateY(30);

    b3 = drawBond(Math.PI/6*5,0);
    b3.translateY(30);

    b4 = drawBond(-Math.PI/6,0);
    b4.translateY(-30);

    b5 = drawBond(-Math.PI/6*5,0);
    b5.translateY(-30);

    // lone pair 2
    s7 = drawSphere(3,32,Math.PI/2-Math.PI/360*20,Math.PI/2,0xFF3333);
    s8 = drawSphere(3,32,Math.PI/2+Math.PI/360*20,Math.PI/2,0xFF3333);
    s9 = drawLonePair(20,32,Math.PI/2,Math.PI/2,0xFF0000);

    s7.translateY(30);
    s8.translateY(30);
    s9.translateY(30);

    s10 = drawSphere(3,32,Math.PI/2-Math.PI/360*20,Math.PI/2,0xFF3333);
    s11 = drawSphere(3,32,Math.PI/2+Math.PI/360*20,Math.PI/2,0xFF3333);
    s12 = drawLonePair(20,32,Math.PI/2,Math.PI/2,0xFF0000);

    s10.translateY(-30);
    s11.translateY(-30);
    s12.translateY(-30);

    s13 = drawSphere(3,32,Math.PI/2-Math.PI/360*20,-Math.PI/2,0xFF3333);
    s14 = drawSphere(3,32,Math.PI/2+Math.PI/360*20,-Math.PI/2,0xFF3333);
    s15 = drawLonePair(20,32,Math.PI/2,-Math.PI/2,0xFF0000);

    s13.translateY(30);
    s14.translateY(30);
    s15.translateY(30);

    s16 = drawSphere(3,32,Math.PI/2-Math.PI/360*20,-Math.PI/2,0xFF3333);
    s17 = drawSphere(3,32,Math.PI/2+Math.PI/360*20,-Math.PI/2,0xFF3333);
    s18 = drawLonePair(20,32,Math.PI/2,-Math.PI/2,0xFF0000);

    s16.translateY(-30);
    s17.translateY(-30);
    s18.translateY(-30);

    var material = new THREE.LineDashedMaterial( { 
        color: 0x000000,
        linewidth: 15,
        scale: 1,
        dashSize: 3,
        gapSize: 1 } );


    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 30, -30, 0) );
    geometry.vertices.push(new THREE.Vector3( 30, 30, 0) );
    var line = new THREE.Line( geometry, material );
    line.computeLineDistances ();

    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3( -30, -30, 0) );
    geometry2.vertices.push(new THREE.Vector3( -30, 30, 0) );
    var line2 = new THREE.Line( geometry2, material );
    line2.computeLineDistances ();

    var material2 = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry3 = new THREE.TextGeometry("Cl", {font:font, size:10, height:1});
    geometry4 = new THREE.TextGeometry("H", {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry3, material2);
    text.position.x = 0;
    text.position.y = -70;
    text.position.z = -30;
    text.rotation.z=Math.PI/2;
    text.rotation.y=Math.PI/2;

    text2 = new THREE.Mesh(geometry4, material2);
    text2.position.x = 0;
    text2.position.y = -70;
    text2.position.z = 75;
    text2.rotation.z=Math.PI/2;
    text2.rotation.y=Math.PI/2;

    if(sc=="E"){
        text3 = new THREE.Mesh(geometry4, material2);
    } else if (sc == "Z"){
        text3 = new THREE.Mesh(geometry3, material2);
    }
    text3.position.x = 0;
    text3.position.y = 70;
    text3.position.z = -30;
    text3.rotation.z=Math.PI/2;
    text3.rotation.y=Math.PI/2;

    if(sc=="E"){
        text4 = new THREE.Mesh(geometry3, material2);
    } else if (sc == "Z"){
        text4 = new THREE.Mesh(geometry4, material2);
    }
    text4.position.x = 0;
    text4.position.y = 70;
    text4.position.z = 75;
    text4.rotation.z=Math.PI/2;
    text4.rotation.y=Math.PI/2;


    but2ene.add(s1); but2ene.add(s2); but2ene.add(s3); but2ene.add(s4); but2ene.add(s5); but2ene.add(s6); 
    but2ene.add(b1); but2ene.add(b2); but2ene.add(b3); but2ene.add(b4); but2ene.add(b5); 

    but2ene.add(s7); but2ene.add(s8); but2ene.add(s9); 
    but2ene.add(s10); but2ene.add(s11); but2ene.add(s12); 
    but2ene.add(s13); but2ene.add(s14); but2ene.add(s15); 
    but2ene.add(s16); but2ene.add(s17); but2ene.add(s18); 
    but2ene.add(line); but2ene.add(line2);

    but2ene.add(text); but2ene.add(text2); but2ene.add(text3); but2ene.add(text4);


    return but2ene;

}

let drawcyc = function(sc){
    cyc = new THREE.Group();
    //Carbon atom
    s1 = drawSphere(20,0,0,0,cpk.carbon);
    //Hydrogen atoms
    s2 = drawSphere(15,50,0,0,cpk.hydrogen);
    s3 = drawSphere(15,50,Math.acos(-1/3),2/3*Math.PI,cpk.hydrogen);
    
    s4 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,cpk.hydrogen);
    s5 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,cpk.hydrogen);
    //Draw sticks
    b1 = drawBond(Math.acos(-1/3),4/3*Math.PI,0x444444);
    b2 = drawBond(Math.acos(-1/3), 2*Math.PI,0x444444);
    b3 = drawBond(Math.acos(-1/3), 2/3*Math.PI,0x444444);
    b4 = drawBond(0,0,0x00FF00);

    cyc.add(s1).clone(); cyc.add(s2.clone()); cyc.add(s3.clone()); cyc.add(s4.clone()); cyc.add(s5.clone());
    cyc.add(b1.clone()); cyc.add(b2.clone()); cyc.add(b3.clone()); cyc.add(b4.clone()); 

    cyc2 = cyc.clone();
    cyc3 = cyc.clone();
    cyc4 = cyc.clone();

    s6 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,cpk.chlorine);
    cyc3.add(s6);

    if(sc == "Z"){
        s7 = drawSphere(15,50,Math.acos(-1/3),6/3*Math.PI,cpk.chlorine);
        cyc4.add(s7);
    } else if (sc == "E"){
        s7 = drawSphere(15,50,0,0,cpk.chlorine);
        cyc4.add(s7);
    }
    cyc5 = cyc.clone();

    cyc2.translateZ(-(50+50*Math.sin(Math.acos(-1/3) - Math.PI/2)));
    cyc3.translateZ(-(50+50*Math.sin(Math.acos(-1/3) - Math.PI/2)));
    cyc2.translateY(-(50*Math.cos(Math.acos(-1/3) - Math.PI/2))*Math.sin(Math.PI/6)    );
    cyc3.translateY(-(50*Math.cos(Math.acos(-1/3) - Math.PI/2))*Math.sin(Math.PI/6)    );
    cyc2.translateX((50*Math.cos(Math.acos(-1/3) - Math.PI/2))*Math.cos(Math.PI/6)    );
    cyc3.translateX(-(50*Math.cos(Math.acos(-1/3) - Math.PI/2))*Math.cos(Math.PI/6)    );
    cyc4.translateZ(-(50+100*Math.sin(Math.acos(-1/3) - Math.PI/2)));
    cyc4.translateY(-2*(50*Math.cos(Math.acos(-1/3) - Math.PI/2))*Math.sin(Math.PI/6) );
    cyc4.rotation.x = Math.PI;

    cyc5.translateZ(-50*Math.sin(Math.acos(-1/3)-Math.PI/2));
    cyc5.translateY(-50*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3));
    cyc6 = cyc5.clone();
    cyc5.translateX(-50*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
    cyc6.translateX(50*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
    cyc5.rotation.x = Math.PI;
    cyc6.rotation.x = Math.PI;

    cyc.add(cyc2);
    cyc.add(cyc3);
    cyc.add(cyc4);
    cyc.add(cyc5);
    cyc.add(cyc6);

    cyc.translateZ( 25 + 50*Math.sin(Math.acos(-1/3) - Math.PI/2) );
    cyc.translateY( 50*Math.cos( Math.acos(-1/3) - Math.PI/2 )*Math.sin(Math.PI/6) );
    cyc.rotation.x = Math.PI/2;
    cyc.translateY( -20 );
    cyc.translateZ( 70 );
    
    
    
    return cyc;
}

let drawmeso = function(sc){
    meso = new THREE.Group();
    //Carbon atom
    s1 = drawSphere(20,0,0,0,0x999999);
    //Hydrogen atoms
    s2 = drawSphere(15,50,0,0,0xFFFFFF);
    s3 = drawSphere(15,50,Math.acos(-1/3),2/3*Math.PI,0x00FF00);
    
    if (sc == "l"){
        s4 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xDBDB67);
        s5 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0xD20117);
    }else if (sc == "d"){
        s4 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xD20117);
    s5 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0xDBDB67);
    }
    
    //Draw sticks
    b1 = drawBond(Math.acos(-1/3),4/3*Math.PI,0x444444);
    b2 = drawBond(Math.acos(-1/3), 2*Math.PI,0x444444);
    b3 = drawBond(Math.acos(-1/3), 2/3*Math.PI,0x444444);
    b4 = drawBond(0,0,0x00FF00);

    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("C", {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 15;
    text.position.z = 15;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;

    geometry2 = new THREE.TextGeometry("C", {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry2, material);
    text2.position.x = 0;
    text2.position.y = 15;
    text2.position.z = 70;
    text2.rotation.x = Math.PI/2;
    text2.rotation.y = Math.PI/2;

    geometry4 = new THREE.TextGeometry("Cl", {font:font, size:10, height:1});
    text4 = new THREE.Mesh(geometry4, material);
    text4.position.x = 40;
    text4.position.y = -50;
    text4.position.z = -10;
    text4.rotation.x = Math.PI/2;
    text4.rotation.y = Math.PI/2;

        if (sc == "d"){
            geometry6 = new THREE.TextGeometry("Br", {font:font, size:10, height:1});
            text6 = new THREE.Mesh(geometry6, material);
            text6.position.x = -40;
            text6.position.y = 40;
            text6.position.z = 65;
            text6.rotation.x = Math.PI/2;
            text6.rotation.y = Math.PI/2;
        }else if (sc == "l"){
            geometry6 = new THREE.TextGeometry("F", {font:font, size:10, height:1});
            text6 = new THREE.Mesh(geometry6, material);
            text6.position.x = -40;
            text6.position.y = 40;
            text6.position.z = 65;
            text6.rotation.x = Math.PI/2;
            text6.rotation.y = Math.PI/2;
        }

        if (sc == "d"){
            geometry7 = new THREE.TextGeometry("Cl", {font:font, size:10, height:1});
            text7 = new THREE.Mesh(geometry7, material);
            text7.position.x = 40;
            text7.position.y = 40;
            text7.position.z = 65;
            text7.rotation.x = Math.PI/2;
            text7.rotation.y = Math.PI/2;
        }else if (sc == "l"){
            geometry7 = new THREE.TextGeometry("Cl", {font:font, size:10, height:1});
            text7 = new THREE.Mesh(geometry7, material);
            text7.position.x = 40;
            text7.position.y = 40;
            text7.position.z = 65;
            text7.rotation.x = Math.PI/2;
            text7.rotation.y = Math.PI/2;
        }

        if (sc == "d"){
            geometry8 = new THREE.TextGeometry("F", {font:font, size:10, height:1});
            text8 = new THREE.Mesh(geometry8, material);
            text8.position.x = 0;
            text8.position.y = -70;
            text8.position.z = 65;
            text8.rotation.x = Math.PI/2;
            text8.rotation.y = Math.PI/2;
        }else if (sc == "l"){
            geometry8 = new THREE.TextGeometry("Br", {font:font, size:10, height:1});
            text8 = new THREE.Mesh(geometry8, material);
            text8.position.x = 0;
            text8.position.y = -80;
            text8.position.z = 65;
            text8.rotation.x = Math.PI/2;
            text8.rotation.y = Math.PI/2;
        }

    if (sc == "d"){
        geometry3 = new THREE.TextGeometry("Br", {font:font, size:10, height:1});
        text3 = new THREE.Mesh(geometry3, material);
        text3.position.x = 0;
        text3.position.y = 65;
        text3.position.z = -15;
        text3.rotation.x = Math.PI/2;
        text3.rotation.y = Math.PI/2;
    }else if (sc == "l"){
        geometry3 = new THREE.TextGeometry("F", {font:font, size:10, height:1});
        text3 = new THREE.Mesh(geometry3, material);
        text3.position.x = 0;
        text3.position.y = 60;
        text3.position.z = -10;
        text3.rotation.x = Math.PI/2;
        text3.rotation.y = Math.PI/2;
    }

    if (sc == "d"){
        geometry5 = new THREE.TextGeometry("F", {font:font, size:10, height:1});
        text5 = new THREE.Mesh(geometry5, material);
        text5.position.x = -40;
        text5.position.y = -50;
        text5.position.z = -15;
        text5.rotation.x = Math.PI/2;
        text5.rotation.y = Math.PI/2;
    }else if (sc == "l"){
        geometry5 = new THREE.TextGeometry("Br", {font:font, size:10, height:1});
        text5 = new THREE.Mesh(geometry5, material);
        text5.position.x = -45;
        text5.position.y = -50;
        text5.position.z = -15;
        text5.rotation.x = Math.PI/2;
        text5.rotation.y = Math.PI/2;
    }

    s6 = drawSphere(15,50,Math.acos(-1/3),2/3*Math.PI,0xD20117);
    if (sc == "d"){
        s7 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0x00FF00);
        s8 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0xDBDB67);
    }else if (sc == "l"){
        s7 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xDBDB67);
        s8 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0x00FF00);
    }

    meso.add(s1); meso.add(s2); meso.add(s3); meso.add(s4); meso.add(s5);
    meso.add(b1); meso.add(b2); meso.add(b3); meso.add(b4); 
    meso2 = meso.clone(); 
    meso2.add(s6); meso2.add(s7); meso2.add(s8); 

    meso2.translateZ(50); meso2.rotateY(Math.PI); 

    if (sc == "l"){
        meso2.rotateZ(-Math.PI/3 );
    } else if (sc == "d"){
        meso2.rotateZ(Math.PI/3 );
    }
    
    meso.add(meso2);
    meso.add(text); meso.add(text2); meso.add(text3); meso.add(text4); meso.add(text5);
    meso.add(text6); meso.add(text7); meso.add(text8); 
    


    return meso;
}



let init = function() {
    //create and locate cameras
    camera1 = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight/2, 1,3500);
    camera2 = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight/2, 1,3500);
    camera1.position.set(240,-180,150);
    camera2.position.set(240,-180,150);
    camera1.up = new THREE.Vector3(0,0,1);
    camera2.up = new THREE.Vector3(0,0,1);


    scene1 = new THREE.Scene();
    scene2 = new THREE.Scene();
    // scene1.background = new THREE.Color(0xD5D5D5);
    // scene2.background = new THREE.Color(0xD5D5D5);
    // scene1.background = new THREE.Color(0x050505);
    // scene2.background = new THREE.Color(0x050505);
    scene1.background = new THREE.Color(0xf0f0f0);
    scene2.background = new THREE.Color(0xf0f0f0);

    //create renderer
    renderer1 = new THREE.WebGLRenderer();
    renderer2 = new THREE.WebGLRenderer();
    renderer1.setSize(window.innerWidth/2,window.innerHeight);
    renderer2.setSize(window.innerWidth/2,window.innerHeight);


    container1 = document.getElementById( 'canvas1' );
    document.body.appendChild( container1 );
    container1.appendChild(renderer1.domElement);
    container2 = document.getElementById( 'canvas2' );
    document.body.appendChild( container2 );
    container2.appendChild(renderer2.domElement);


    // controls
    controls1 = new THREE.OrbitControls( camera1, renderer1.domElement );
    controls2 = new THREE.OrbitControls( camera2, renderer2.domElement );
    controls1.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls2.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls1.dampingFactor = 0.1;
    controls2.dampingFactor = 0.1;
    controls1.screenSpacePanning = false;
    controls2.screenSpacePanning = false;
    controls1.minDistance = 5;
    controls2.minDistance = 5;
    controls1.maxDistance = 2000;
    controls2.maxDistance = 2000;
    controls1.maxPolarAngle = Math.PI / 2; 
    controls2.maxPolarAngle = Math.PI / 2;      
    controls1.autoRotate = turn; 
    controls2.autoRotate = turn; 
    controls1.autoRotateSpeed = 0.6;
    controls2.autoRotateSpeed = 0.6;


    light1 = new THREE.PointLight( 0xffffff, 0.4, 0,);
    light2 = new THREE.PointLight( 0xffffff, 0.3, 0 );
    light3 = new THREE.PointLight( 0xffffff, 0.4, 0 );
    light4 = new THREE.PointLight( 0xffffff, 0.5, 0 );
    light5 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    light6 = new THREE.PointLight( 0xffffff, 0.1, 0 );
    light7 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    light8 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    light1.position.set( 100, 100, 100 );
    light2.position.set( 100, -100, 100 );
    light3.position.set( 100, 100, -100 );
    light4.position.set( 100, -100, -100 );
    light5.position.set( -100, 100, 100 );
    light6.position.set( -100, -100, 100 );
    light7.position.set( -100, 100, -100 );
    light8.position.set( -100, -100, -100 );

    lights1 = new THREE.PointLight( 0xffffff, 0.4, 0,);
    lights2 = new THREE.PointLight( 0xffffff, 0.3, 0 );
    lights3 = new THREE.PointLight( 0xffffff, 0.4, 0 );
    lights4 = new THREE.PointLight( 0xffffff, 0.5, 0 );
    lights5 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    lights6 = new THREE.PointLight( 0xffffff, 0.1, 0 );
    lights7 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    lights8 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    lights1.position.set( 100, 100, 100 );
    lights2.position.set( 100, -100, 100 );
    lights3.position.set( 100, 100, -100 );
    lights4.position.set( 100, -100, -100 );
    lights5.position.set( -100, 100, 100 );
    lights6.position.set( -100, -100, 100 );
    lights7.position.set( -100, 100, -100 );
    lights8.position.set( -100, -100, -100 );

	scene1.add( light1 );
	scene1.add( light2 );
    scene1.add( light3 );
    scene1.add( light4 );
	scene1.add( light5 );
    scene1.add( light6 );
    scene1.add( light7 );
    scene1.add( light8 );
    
    scene2.add( lights1 );
	scene2.add( lights2 );
    scene2.add( lights3 );
    scene2.add( lights4 );
	scene2.add( lights5 );
    scene2.add( lights6 );
    scene2.add( lights7 );
	scene2.add( lights8 );

    renderer1.render( scene1, camera1 );
    renderer2.render( scene2, camera2 );
}

function animate() {
    if (syncView){
        align();
    }
    controls1.autoRotate = turn;
    controls2.autoRotate = turn;
    requestAnimationFrame( animate );
    controls1.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer1.render( scene1, camera1 );
    controls2.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer2.render( scene2, camera2 );
}

let align = function(){
    camera1.position.set(camera2.position.x,camera2.position.y,camera2.position.z);
    renderer1.render( scene1, camera1 );
    renderer2.render( scene2, camera2 );
}

let drawAxis = function(){
     // axes helper
    let axes1 = new THREE.AxesHelper(1500);
    let axes2 = new THREE.AxesHelper(1500);
    scene1.add(axes1);
    scene2.add(axes2);
}

init();
// drawAxis();
c1 = new drawCH4("l");
c2 = new drawCH4("d");
c3 = new drawbut2ene("E");
c4 = new drawbut2ene("Z");

c5 = new drawcyc("E");
c6 = new drawcyc("Z");


c7 = new drawmeso("l");
c8 = new drawmeso("d");

scene1.add(c1);
scene2.add(c2);
// drawAxis();
// scene1.add(c3);
// scene2.add(c4);
animate();

