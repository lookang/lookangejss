let scene, camera, renderer;
var controls;

var CO2, BF3, SO2, CH4, NH3,H2O, PCl5, SF4, ClF3;
var curMol;

let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);

var checkbox = document.getElementById("checkbox");
checkbox.addEventListener( 'change', function() {
    if(this.checked) {  
        controls.autoRotate = true; 
    } else {
        controls.autoRotate = false; 
    }
});

let init = function() {
    //create and locate camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1,3500);
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 100;
    camera.rotation.y += 120*Math.PI/180;
    camera.rotation.z += 120*Math.PI/180;
    camera.up = new THREE.Vector3(0,0,1);
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x050505);
    scene.background = new THREE.Color(0xD5D5D5);
    // scene.background = new THREE.Color(0xf0f0f0);
    // axes helper
    let axes = new THREE.AxesHelper(1500);
    // scene.add(axes);
    //create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.1;
	controls.screenSpacePanning = false;
	controls.minDistance = 5;
	controls.maxDistance = 2000;
    controls.maxPolarAngle = Math.PI / 2;     
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 0.6;

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
	scene.add( light1 );
	scene.add( light2 );
    scene.add( light3 );
    scene.add( light4 );
	scene.add( light5 );
    scene.add( light6 );
    scene.add( light7 );
	scene.add( light8 );

    renderer.render( scene, camera );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render( scene, camera );
}

function resizeCanvas(){
    camera.aspect = window.innerWidth / window.innerHeight;  
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resizeCanvas, false);

// Draw basic parts
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

// Draw molecules 
let drawCO2 = function(){
    CO2 = new THREE.Group();
    //Carbon atom
    s1 = drawSphere(20,0,0,0,0x999999);
    //Oxygen atoms
    s2 = drawSphere(15,50,Math.PI/2,Math.PI,"red");
    s3 = drawSphere(15,50,Math.PI/2,2*Math.PI,"red");
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, Math.PI,0x444444);
    // Label angle
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("180"+String.fromCharCode(176), {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 45;
    text.position.y = -10;
    text.position.z = 0;
    text.rotation.z = Math.PI/2;

    var material2 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 400 } );
    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        -Math.PI/2, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var ellipse = new THREE.Line( geometry2, material2 );
    // ellipse2.rotation.x = Math.PI/2;
    ellipse.rotation.z = -Math.PI/2;
    CO2.add(s1); CO2.add(s2); CO2.add(s3); CO2.add(b1); CO2.add(b2); CO2.add(text); CO2.add(ellipse);
}
let drawBF3 = function(){
    BF3 = new THREE.Group();
    //Boron atom
    s1 = drawSphere(20,0,0,0,0xC0C0C0);
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,2/3*Math.PI,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/2,4/3*Math.PI,0x00FF00);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, 2/3*Math.PI,0x444444);
    b3 = drawBond(Math.PI/2, 4/3*Math.PI,0x444444);

    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("120"+String.fromCharCode(176), {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 45;
    text.position.y = 10;
    text.position.z = 0;
    text.rotation.z = Math.PI/3*2;

    var material2 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 400 } );
    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        -Math.PI/6, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var ellipse = new THREE.Line( geometry2, material2 );
    // ellipse2.rotation.x = Math.PI/2;
    ellipse.rotation.z = -Math.PI/2;

    BF3.add(s1); BF3.add(s2); BF3.add(s3); BF3.add(s4);
    BF3.add(b1); BF3.add(b2); BF3.add(b3); BF3.add(text); BF3.add(ellipse);
}
let drawSO2 = function(){
    SO2 = new THREE.Group();
    //Sulfur atom
    s1 = drawSphere(20,0,0,0,"yellow");
    //Oxygen atoms
    s2 = drawSphere(15,50,Math.PI/2,0,"red");
    s3 = drawSphere(15,50,Math.PI/2,2/3*Math.PI,"red");
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, 4/3*Math.PI,0x444444);
    //lone pair 2
    s4 = drawSphere(3,32,Math.PI/2,4/3*Math.PI-Math.PI/360*20,0xFF3333);
    s5 = drawSphere(3,32,Math.PI/2,4/3*Math.PI+Math.PI/360*20,0xFF3333);
    s6 = drawLonePair(20,32,Math.PI/2,4/3*Math.PI,0xFF0000);
    
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("119"+String.fromCharCode(176), {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 45;
    text.position.y = 10;
    text.position.z = 0;
    text.rotation.z = Math.PI/3*2;

    var material2 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 400 } );
    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        -Math.PI/6, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var ellipse = new THREE.Line( geometry2, material2 );
    // ellipse2.rotation.x = Math.PI/2;
    ellipse.rotation.z = -Math.PI/2;

    SO2.add(s1); SO2.add(s2); SO2.add(s3); SO2.add(s4); SO2.add(s5); SO2.add(s6);
    SO2.add(b1); SO2.add(b2); SO2.add(text); SO2.add(ellipse);
}
let drawCH4 = function(){
    CH4 = new THREE.Group();
    //Carbon atom
    s1 = drawSphere(20,0,0,0,0x999999);
    //Hydrogen atoms
    s2 = drawSphere(15,50,Math.acos(-1/3),2/3*Math.PI,0xFFFFFF);
    s3 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xFFFFFF);
    s4 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0xFFFFFF);
    s5 = drawSphere(15,50,0,0,0xFFFFFF);
    //Draw sticks
    b1 = drawBond(Math.acos(-1/3),4/3*Math.PI,0x444444);
    b2 = drawBond(Math.acos(-1/3), 2*Math.PI,0x444444);
    b3 = drawBond(Math.acos(-1/3), 2/3*Math.PI,0x444444);
    b4 = drawBond(0,0,0x444444);

    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("109.5"+String.fromCharCode(176), {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.z = 10;
    text.position.y = 30;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;

    var material2 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 400 } );
    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.acos(-1/3), // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var ellipse = new THREE.Line( geometry2, material2 );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.z = -Math.PI/8-Math.PI/2;
    ellipse.rotation.y = Math.PI/2;


    CH4.add(s1); CH4.add(s2); CH4.add(s3); CH4.add(s4); CH4.add(s5);
    CH4.add(b1); CH4.add(b2); CH4.add(b3); CH4.add(b4); CH4.add(text); CH4.add(ellipse);
}
let drawNH3 = function(){
    NH3 = new THREE.Group();
    //Nitrogen atom
    s1 = drawSphere(20,0,0,0,0x0062FF);
    //Hydrogen atoms
    s2 = drawSphere(15,50,0,0,0xFFFFFF);
    s3 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xFFFFFF);
    s4 = drawSphere(15,50,Math.acos(-1/3),4/3*Math.PI,0xFFFFFF);
    // Draw lone pair
    s5 = drawSphere(3,32,Math.acos(-1/3),2/3*Math.PI-2*Math.PI/360*10,0xFF3333);
    s6 = drawSphere(3,32,Math.acos(-1/3),2/3*Math.PI+2*Math.PI/360*10,0xFF3333);
    s7 = drawLonePair(20,32,Math.acos(-1/3),2/3*Math.PI,0xFF0000);
    //Draw sticks
    b1 = drawBond(0,0,0x444444);
    b2 = drawBond(Math.acos(-1/3), 2*Math.PI,0x444444);
    b3 = drawBond(Math.acos(-1/3), 2/3*Math.PI,0x444444);

    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("107"+String.fromCharCode(176), {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.z = 10;
    text.position.y = 30;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;

    var material2 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 400 } );
    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.acos(-1/3), // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var ellipse = new THREE.Line( geometry2, material2 );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.z = -Math.PI/8-Math.PI/2;
    ellipse.rotation.y = Math.PI/2;

    NH3.add(s1); NH3.add(s2); NH3.add(s3); NH3.add(s4); NH3.add(s5); NH3.add(s6); NH3.add(s7); 
    NH3.add(b1); NH3.add(b2); NH3.add(b3); 
    NH3.add(ellipse); NH3.add(text); 
}
let drawH2O = function(){
    H2O = new THREE.Group();
    //Oxygen atom
    s1 = drawSphere(20,0,0,0,"red");
    //Hydrogen atoms
    s2 = drawSphere(15,50,0,0,0xFFFFFF);
    s3 = drawSphere(15,50,Math.acos(-1/3),2*Math.PI,0xFFFFFF);
    //lone pair 1
    s4 = drawSphere(3,32,Math.acos(-1/3)-Math.PI/360*20,2/3*Math.PI-Math.PI/360*10,0xFF3333);
    s5 = drawSphere(3,32,Math.acos(-1/3)+Math.PI/360*20,2/3*Math.PI+Math.PI/360*10,0xFF3333);
    s6 = drawLonePair(20,32,Math.acos(-1/3),2/3*Math.PI,0xFF0000);
    //lone pair 2
    s7 = drawSphere(3,32,Math.acos(-1/3),4/3*Math.PI-Math.PI/360*20,0xFF3333);
    s8 = drawSphere(3,32,Math.acos(-1/3),4/3*Math.PI+Math.PI/360*20,0xFF3333);
    s9 = drawLonePair(20,32,Math.acos(-1/3),4/3*Math.PI,0xFF0000);
    //Draw sticks
    b1 = drawBond(0,0,0x444444);
    b2 = drawBond(Math.acos(-1/3), 2*Math.PI,0x444444);

    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    geometry = new THREE.TextGeometry("104.5"+String.fromCharCode(176), {font:font, size:10, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.z = 10;
    text.position.y = 30;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;

    var material2 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 400 } );
    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.acos(-1/3), // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var ellipse = new THREE.Line( geometry2, material2 );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.z = -Math.PI/8-Math.PI/2;
    ellipse.rotation.y = Math.PI/2;

    H2O.add(s1); H2O.add(s2); H2O.add(s3); H2O.add(s4); H2O.add(s5); H2O.add(s6); H2O.add(s7); H2O.add(s8); H2O.add(s9);
    H2O.add(b1); H2O.add(b2); H2O.add(text); H2O.add(ellipse);  
}
let drawPCl5 = function(){
    PCl5 = new THREE.Group();
    //Phosphorus atom
    s1 = drawSphere(20,0,0,0,0xEEEEEE);
    //Chlorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,2/3*Math.PI,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/2,4/3*Math.PI,0x00FF00);
    s5 = drawSphere(15,50,0,0,0x00FF00);
    s6 = drawSphere(15,50,Math.PI,0,0x00FF00);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, 2/3*Math.PI,0x444444);
    b3 = drawBond(Math.PI/2, 4/3*Math.PI,0x444444);
    b4 = drawBond(0,0,0x444444);
    b5 = drawBond(Math.PI, 0,0x444444);

    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry2, material );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.y = -Math.PI/2;
    // scene.add( ellipse );

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    let geometry = new THREE.TextGeometry("90"+String.fromCharCode(176), {font:font, size:10, height:1});
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 25;
    text.position.z = 25;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;
    // scene.add(text);   
    
    geometry3 = new THREE.TextGeometry("120"+String.fromCharCode(176), {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 45;
    text2.position.y = 10;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/3*2;
    // scene.add(text2);

    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        -Math.PI/6, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    // ellipse2.rotation.x = Math.PI/2;
    ellipse2.rotation.z = -Math.PI/2;

    PCl5.add(s1); PCl5.add(s2); PCl5.add(s3); PCl5.add(s4); PCl5.add(s5); PCl5.add(s6); 
    PCl5.add(b1); PCl5.add(b2); PCl5.add(b3); PCl5.add(b4); PCl5.add(b5); 
    PCl5.add(text); PCl5.add(text2); PCl5.add(ellipse); PCl5.add(ellipse2); 
}
let drawSF4 = function(){
    SF4 = new THREE.Group();
    //Sulfur atom
    s1 = drawSphere(20,0,0,0,"yellow");
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,Math.PI/180*101.6,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/180*3.45,0,0x00FF00);
    s5 = drawSphere(15,50,Math.PI/180*176.55,0,0x00FF00);
    //lone pair
    s6 = drawSphere(3,32,Math.PI/2,4/3*Math.PI-Math.PI/360*20-Math.PI/180*9.2,0xFF3333);
    s7 = drawSphere(3,32,Math.PI/2,4/3*Math.PI+Math.PI/360*20-Math.PI/180*9.2,0xFF3333);
    s8 = drawLonePair(20,32,Math.PI/2,4/3*Math.PI-Math.PI/180*9.2,0xFF0000);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, 4/3*Math.PI+Math.PI/180*18.4,0x444444);
    b3 = drawBond(Math.PI/180*3.45,0,0x444444);
    b4 = drawBond(Math.PI/180*176.55, 0,0x444444);
    
    geometry3 = new THREE.TextGeometry("101.6"+String.fromCharCode(176), {font:font, size:10, height:1});
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 45;
    text2.position.y = 10;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/3*2;
    // scene.add(text2);

    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        -Math.PI/6+Math.PI/180*18.4, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    // ellipse2.rotation.x = Math.PI/2;
    ellipse2.rotation.z = -Math.PI/2;
    // scene.add( ellipse2 );    

    SF4.add(s1); SF4.add(s2); SF4.add(s3); SF4.add(s4); SF4.add(s5); SF4.add(s6); SF4.add(s7); SF4.add(s8); 
    SF4.add(b1); SF4.add(b2); SF4.add(b3); SF4.add(b4);
    SF4.add(text2); SF4.add(ellipse2);    
}
let drawClF3 = function(){
    ClF3 = new THREE.Group();
    //Chlorine atom
    s1 = drawSphere(20,0,0,0,0xEEEEEE);
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2+Math.PI/180*2.5,0,0x00FF00);
    s4 = drawSphere(15,50,Math.PI*3/2-Math.PI/180*2.5,0,0x00FF00);
    //lone pair
    s5 = drawSphere(3,32,Math.PI/3,Math.PI/2-Math.PI/360*20,0xFF3333);
    s6 = drawSphere(3,32,Math.PI/3,Math.PI/2+Math.PI/360*20,0xFF3333);
    s7 = drawLonePair(20,32,Math.PI/3,Math.PI/2,0xFF0000);
    s8 = drawSphere(3,32,Math.PI/3,Math.PI*3/2-Math.PI/360*20,0xFF3333);
    s9 = drawSphere(3,32,Math.PI/3,Math.PI*3/2+Math.PI/360*20,0xFF3333);
    s10 = drawLonePair(20,32,Math.PI/3,Math.PI*3/2,0xFF0000);
    //Draw sticks
    b1 = drawBond(Math.PI,0,0x444444);
    b2 = drawBond(Math.PI/2+Math.PI/180*2.5,0,0x444444);
    b3 = drawBond(Math.PI*3/2-Math.PI/180*2.5, 0,0x444444);

    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        Math.PI/2+Math.PI/180*2.5, Math.PI/2+Math.PI-Math.PI/180*2.5, // aStartAngle, aEndAngle
        true,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry2, material );
    ellipse.rotation.x = -Math.PI/2;
    ellipse.rotation.y = Math.PI/2;
    scene.add( ellipse );

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    let geometry = new THREE.TextGeometry("175"+String.fromCharCode(176), {font:font, size:10, height:1});
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 8;
    text.position.z = -40;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2; 

    ClF3.add(s1); ClF3.add(s2); ClF3.add(s3); ClF3.add(s4); ClF3.add(s5); ClF3.add(s6); ClF3.add(s7); ClF3.add(s8);  ClF3.add(s9);  ClF3.add(s10); 
    ClF3.add(b1); ClF3.add(b2); ClF3.add(b3); 
    ClF3.add(text); ClF3.add(ellipse);    
}
let drawXeF2 = function(){
    XeF2 = new THREE.Group();
    //Xenon atom
    s1 = drawSphere(20,0,0,0,0x0892D0);
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,Math.PI,0x00FF00);
    //lone pair
    s4 = drawSphere(3,32,-Math.PI*10/180,0,0xFF3333);
    s5 = drawSphere(3,32,Math.PI*10/180,0,0xFF3333);
    s6 = drawLonePair(20,32,0,0,0xFF0000);
    //lone pair
    s7 = drawSphere(3,32,Math.PI*2/3-Math.PI*10/180,Math.PI/2,0xFF3333);
    s8 = drawSphere(3,32,Math.PI*2/3+Math.PI*10/180,Math.PI/2,0xFF3333);
    s9 = drawLonePair(20,32,Math.PI*2/3,Math.PI/2,0xFF0000);
    //lone pair
    s10 = drawSphere(3,32,Math.PI*4/3-Math.PI*10/180,Math.PI/2,0xFF3333);
    s11 = drawSphere(3,32,Math.PI*4/3+Math.PI*10/180,Math.PI/2,0xFF3333);
    s12 = drawLonePair(20,32,Math.PI*4/3,Math.PI/2,0xFF0000);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, Math.PI,0x444444);

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    
    geometry3 = new THREE.TextGeometry("180"+String.fromCharCode(176), {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 40;
    text2.position.y = -20;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/2;

    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        -Math.PI/2, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    ellipse2.rotation.z = -Math.PI/2;

    XeF2.add(s1); XeF2.add(s2); XeF2.add(s3); 
    XeF2.add(s4); XeF2.add(s5); XeF2.add(s6); 
    XeF2.add(s7); XeF2.add(s8); XeF2.add(s9); 
    XeF2.add(s10); XeF2.add(s11); XeF2.add(s12); 
    XeF2.add(b1); XeF2.add(b2);
    XeF2.add(text2); XeF2.add(ellipse2); 
}
let drawSF6 = function(){
    SF6 = new THREE.Group();
    //Sulfur atom
    s1 = drawSphere(20,0,0,0,"yellow");
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,Math.PI/2,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/2,Math.PI,0x00FF00);
    s5 = drawSphere(15,50,Math.PI/2,Math.PI*3/2,0x00FF00);
    s6 = drawSphere(15,50,0,0,0x00FF00);
    s7 = drawSphere(15,50,Math.PI,0,0x00FF00);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, Math.PI/2,0x444444);
    b3 = drawBond(Math.PI/2, Math.PI,0x444444);
    b4 = drawBond(Math.PI/2, 3/2*Math.PI,0x444444);
    b5 = drawBond(0,0,0x444444);
    b6 = drawBond(Math.PI, 0,0x444444);

    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry2, material );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.y = -Math.PI/2;
    // scene.add( ellipse );

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    let geometry = new THREE.TextGeometry("90"+String.fromCharCode(176), {font:font, size:10, height:1});
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 25;
    text.position.z = 25;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;
    
    geometry3 = new THREE.TextGeometry("90"+String.fromCharCode(176), {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 30;
    text2.position.y = 20;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/2;

    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    ellipse2.rotation.z = -Math.PI/2;

    SF6.add(s1); SF6.add(s2); SF6.add(s3); SF6.add(s4); SF6.add(s5); SF6.add(s6); SF6.add(s7);
    SF6.add(b1); SF6.add(b2); SF6.add(b3); SF6.add(b4); SF6.add(b5); SF6.add(b6); 
    SF6.add(text); SF6.add(text2); SF6.add(ellipse); SF6.add(ellipse2); 
}
let drawBrF5 = function(){
    BrF5 = new THREE.Group();
    //Fluorine atom
    s1 = drawSphere(20,0,0,0,"yellow");
    //Chlorine atoms
    s2 = drawSphere(15,50,Math.PI/180*84.8,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/180*84.8,Math.PI/2,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/180*84.8,Math.PI,0x00FF00);
    s5 = drawSphere(15,50,Math.PI/180*84.8,Math.PI*3/2,0x00FF00);
    s6 = drawSphere(15,50,0,0,0x00FF00);
    //lone pair
    s7 = drawSphere(3,32,Math.PI-Math.PI*10/180,0,0xFF3333);
    s8 = drawSphere(3,32,Math.PI+Math.PI*10/180,0,0xFF3333);
    s9 = drawLonePair(20,32,Math.PI,0,0xFF0000);
    //Draw sticks
    b1 = drawBond(Math.PI/180*84.8,0,0x444444);
    b2 = drawBond(Math.PI/180*84.8, Math.PI/2,0x444444);
    b3 = drawBond(Math.PI/180*84.8, Math.PI,0x444444);
    b4 = drawBond(Math.PI/180*84.8, 3/2*Math.PI,0x444444);
    b5 = drawBond(0,0,0x444444);

    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry2, material );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.y = -Math.PI/2;
    // scene.add( ellipse );

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    let geometry = new THREE.TextGeometry("84.8"+String.fromCharCode(176), {font:font, size:10, height:1});
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 25;
    text.position.z = 25;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;
    
    

    BrF5.add(s1); BrF5.add(s2); BrF5.add(s3); BrF5.add(s4); BrF5.add(s5); BrF5.add(s6); BrF5.add(s7); BrF5.add(s8); BrF5.add(s9); 
    BrF5.add(b1); BrF5.add(b2); BrF5.add(b3); BrF5.add(b4); BrF5.add(b5);  
    BrF5.add(text); BrF5.add(ellipse); 
} 
let drawXeF4 = function(){
    XeF4 = new THREE.Group();
    //Xenon atom
    s1 = drawSphere(20,0,0,0,0x0892D0);
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,Math.PI/2,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/2,Math.PI,0x00FF00);
    s5 = drawSphere(15,50,Math.PI/2,Math.PI*3/2,0x00FF00);
    //lone pair
    s6 = drawSphere(3,32,-Math.PI*10/180,0,0xFF3333);
    s7 = drawSphere(3,32,Math.PI*10/180,0,0xFF3333);
    s8 = drawLonePair(20,32,0,0,0xFF0000);
    //lone pair
    s9 = drawSphere(3,32,Math.PI-Math.PI*10/180,0,0xFF3333);
    s10 = drawSphere(3,32,Math.PI+Math.PI*10/180,0,0xFF3333);
    s11 = drawLonePair(20,32,Math.PI,0,0xFF0000);

    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, Math.PI/2,0x444444);
    b3 = drawBond(Math.PI/2, Math.PI,0x444444);
    b4 = drawBond(Math.PI/2, 3/2*Math.PI,0x444444);

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    
    geometry3 = new THREE.TextGeometry("90"+String.fromCharCode(176), {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 30;
    text2.position.y = 20;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/2;

    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    ellipse2.rotation.z = -Math.PI/2;

    XeF4.add(s1); XeF4.add(s2); XeF4.add(s3); XeF4.add(s4); XeF4.add(s5); 
    XeF4.add(s6); XeF4.add(s7); XeF4.add(s8); XeF4.add(s9); XeF4.add(s10); XeF4.add(s11); 
    XeF4.add(b1); XeF4.add(b2); XeF4.add(b3); XeF4.add(b4); 
    XeF4.add(text2); XeF4.add(ellipse2); 
}
let drawIF7 = function(){
    IF7 = new THREE.Group();
    //Iodine atom
    s1 = drawSphere(20,0,0,0,0x9900FF);
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*1,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*2,0x00FF00);
    s5 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*3,0x00FF00);
    s6 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*4,0x00FF00);
    s7 = drawSphere(15,50,0,0,0x00FF00);
    s8 = drawSphere(15,50,Math.PI,0,0x00FF00);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, Math.PI/180*72*1,0x444444);
    b3 = drawBond(Math.PI/2, Math.PI/180*72*2,0x444444);
    b4 = drawBond(Math.PI/2, Math.PI/180*72*3,0x444444);
    b5 = drawBond(Math.PI/2, Math.PI/180*72*4,0x444444);
    b6 = drawBond(0,0,0x444444);
    b7 = drawBond(Math.PI, 0,0x444444);

    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry2, material );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.y = -Math.PI/2;
    // scene.add( ellipse );

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    let geometry = new THREE.TextGeometry("90"+String.fromCharCode(176), {font:font, size:10, height:1});
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 25;
    text.position.z = 25;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;
    
    geometry3 = new THREE.TextGeometry("72"+String.fromCharCode(176), {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 45;
    text2.position.y = -22;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/180*70;

    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        Math.PI/180*18, -Math.PI/180*54, // aStartAngle, aEndAngle
        true,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    ellipse2.rotation.z = -Math.PI/2;

    IF7.add(s1); IF7.add(s2); IF7.add(s3); IF7.add(s4); IF7.add(s5); IF7.add(s6); IF7.add(s7); IF7.add(s8);
    IF7.add(b1); IF7.add(b2); IF7.add(b3); IF7.add(b4); IF7.add(b5); IF7.add(b6); IF7.add(b7);
    IF7.add(text); IF7.add(text2); IF7.add(ellipse); IF7.add(ellipse2); 
}
let drawXeOF5 = function(){
    XeOF5 = new THREE.Group();
    //Xenon atom
    s1 = drawSphere(20,0,0,0,0x0892D0);
    //Oxygen atom
    s2 = drawSphere(15,50,0,0,"red");
    //Fluorine atoms
    s3 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*1,0x00FF00);
    s5 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*2,0x00FF00);
    s6 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*3,0x00FF00);
    s7 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*4,0x00FF00);
    //lone pair
    s8 = drawSphere(3,32,Math.PI-Math.PI*10/180,0,0xFF3333);
    s9 = drawSphere(3,32,Math.PI+Math.PI*10/180,0,0xFF3333);
    s10 = drawLonePair(20,32,Math.PI,0,0xFF0000);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, Math.PI/180*72*1,0x444444);
    b3 = drawBond(Math.PI/2, Math.PI/180*72*2,0x444444);
    b4 = drawBond(Math.PI/2, Math.PI/180*72*3,0x444444);
    b5 = drawBond(Math.PI/2, Math.PI/180*72*4,0x444444);
    b6 = drawBond(0,0,0x444444);

    var curve = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        0, Math.PI/2, // aStartAngle, aEndAngle
        false,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points = curve.getSpacedPoints( 20 );
    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry2, material );
    ellipse.rotation.x = Math.PI/2;
    ellipse.rotation.y = -Math.PI/2;
    // scene.add( ellipse );

    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    let geometry = new THREE.TextGeometry("90"+String.fromCharCode(176), {font:font, size:10, height:1});
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 25;
    text.position.z = 25;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/2;
    
    geometry3 = new THREE.TextGeometry("72"+String.fromCharCode(176), {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 45;
    text2.position.y = -22;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/180*70;

    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        Math.PI/180*18, -Math.PI/180*54, // aStartAngle, aEndAngle
        true,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    ellipse2.rotation.z = -Math.PI/2;

    XeOF5.add(s1); XeOF5.add(s2); XeOF5.add(s3); XeOF5.add(s4); XeOF5.add(s5); XeOF5.add(s6); XeOF5.add(s7);
    XeOF5.add(s8); XeOF5.add(s9); XeOF5.add(s10); 
    XeOF5.add(b1); XeOF5.add(b2); XeOF5.add(b3); XeOF5.add(b4); XeOF5.add(b5); XeOF5.add(b6); 
    XeOF5.add(text); XeOF5.add(text2); XeOF5.add(ellipse); XeOF5.add(ellipse2); 
}
let drawXeF5 = function(){
    XeF5 = new THREE.Group();
    //Xenon atom
    s1 = drawSphere(20,0,0,0,0x0892D0);
    //Fluorine atoms
    s2 = drawSphere(15,50,Math.PI/2,0,0x00FF00);
    s3 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*1,0x00FF00);
    s4 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*2,0x00FF00);
    s5 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*3,0x00FF00);
    s6 = drawSphere(15,50,Math.PI/2,Math.PI/180*72*4,0x00FF00);
    //lone pair
    s7 = drawSphere(3,32,Math.PI-Math.PI*10/180,0,0xFF3333);
    s8 = drawSphere(3,32,Math.PI+Math.PI*10/180,0,0xFF3333);
    s9 = drawLonePair(20,32,Math.PI,0,0xFF0000);
    //lone pair
    s10 = drawSphere(3,32,-Math.PI*10/180,0,0xFF3333);
    s11 = drawSphere(3,32,Math.PI*10/180,0,0xFF3333);
    s12 = drawLonePair(20,32,0,0,0xFF0000);
    //Draw sticks
    b1 = drawBond(Math.PI/2,0,0x444444);
    b2 = drawBond(Math.PI/2, Math.PI/180*72*1,0x444444);
    b3 = drawBond(Math.PI/2, Math.PI/180*72*2,0x444444);
    b4 = drawBond(Math.PI/2, Math.PI/180*72*3,0x444444);
    b5 = drawBond(Math.PI/2, Math.PI/180*72*4,0x444444);

    
    let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x2C3539, shininess: 100 } );
    
    geometry3 = new THREE.TextGeometry("72"+String.fromCharCode(176), {font:font, size:10, height:1});
    text2 = new THREE.Mesh(geometry3, material);
    text2.position.x = 45;
    text2.position.y = -22;
    text2.position.z = 0;
    text2.rotation.z = Math.PI/180*70;

    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );
    var curve2 = new THREE.EllipseCurve(
        0, 0,             // ax, aY
        35, 35,            // xRadius, yRadius
        Math.PI/180*18, -Math.PI/180*54, // aStartAngle, aEndAngle
        true,             // aClockwise
        Math.PI/2                 // rotation
    );
    var points2 = curve2.getSpacedPoints( 20 );
    var geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
    var ellipse2 = new THREE.Line( geometry4, material );
    ellipse2.rotation.z = -Math.PI/2;

    XeF5.add(s1); XeF5.add(s2); XeF5.add(s3); XeF5.add(s4); XeF5.add(s5); XeF5.add(s6); XeF5.add(s7);
    XeF5.add(s8); XeF5.add(s9); XeF5.add(s10); XeF5.add(s11); XeF5.add(s12);  
    XeF5.add(b1); XeF5.add(b2); XeF5.add(b3); XeF5.add(b4); XeF5.add(b5); 
    XeF5.add(text2); XeF5.add(ellipse2); 
}



init();
drawCO2();
drawBF3();
drawSO2();
drawCH4();
drawNH3();
drawH2O();
drawPCl5();
drawSF4();
drawClF3();
drawXeF2();
drawSF6();
drawBrF5();
drawXeF4();
drawIF7();
drawXeOF5();
drawXeF5();
document.getElementById("structure").innerHTML = "Linear";
scene.add(CO2);
curMol = CO2;
animate();