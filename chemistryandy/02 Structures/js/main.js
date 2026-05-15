// 1 initialise main components
let scene, camera, renderer;
var controls;
let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
var turn = false;
var CPK = {
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
var bondlength = 60;

let init = function() {
    //create and locate camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1,3500);
    camera.position.x = 300;
    camera.position.y = -300;
    camera.position.z = 300;
    camera.up = new THREE.Vector3(0,0,1);
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x050505);
    // scene.background = new THREE.Color(0x2C3539);
    scene.background = new THREE.Color(0xf0f0f0);
    
    //create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.25;
	controls.screenSpacePanning = false;
	controls.minDistance = 5;
	controls.maxDistance = 2000;
    controls.maxPolarAngle = Math.PI / 2;     
    controls.autoRotate = turn;
    controls.autoRotateSpeed = 1.0;
    isRotating = true; // Start with rotation enabled
    light1 = new THREE.PointLight( 0xffffff, 0.5057792580661995, 0,);
    light2 = new THREE.PointLight( 0xffffff, 0.7952415093240066, 0 );
    light3 = new THREE.PointLight( 0xffffff, 0.4343338625849491, 0 );
    light4 = new THREE.PointLight( 0xffffff, 0.690764243910498, 0 );
    light5 = new THREE.PointLight( 0xffffff, 0.8350357296847721, 0 );
    light6 = new THREE.PointLight( 0xffffff, 0.04496769432786896, 0 );
    light7 = new THREE.PointLight( 0xffffff, 0.7136138616313841, 0 );
    light8 = new THREE.PointLight( 0xffffff, 0.4312062090899791, 0 );
    light1.position.set( 300, 300, 300 );
    light2.position.set( 300, -300, 300 );
    light3.position.set( 300, 300, -300 );
    light4.position.set( 300, -300, -300 );
    light5.position.set( -300, 300, 300 );
    light6.position.set( -300, -300, 300 );
    light7.position.set( -300, 300, -300 );
    light8.position.set( -300, -300, -300 );
	// scene.add( light1 );
	scene.add( light2 );
    scene.add( light3 );
    // scene.add( light4 );
	scene.add( light5 );
    scene.add( light6 );
    scene.add( light7 );
	scene.add( light8 );

    renderer.render( scene, camera );
};


function animate() {
    requestAnimationFrame( animate );
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render( scene, camera );
}
function labelAxis(){
    
    let axes = new THREE.AxesHelper(1500);
    scene.add(axes);

    var material = new THREE.MeshPhongMaterial( { color: 0xDBE4EB, specular: 0x2C3539, shininess: 400 } );
    geometry = new THREE.TextGeometry("X", {font:font, size:20, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 200;
    text.position.y = 0;
    text.position.z = 0;
    // text.rotation.z = Math.PI/2;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/4;
    scene.add(text);

    geometry = new THREE.TextGeometry("Y", {font:font, size:20, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 200;
    text.position.z = 0;
    // text.rotation.z = Math.PI/2;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/4;
    scene.add(text);

    geometry = new THREE.TextGeometry("Z", {font:font, size:20, height:1});
    text = new THREE.Mesh(geometry, material);
    text.position.x = 0;
    text.position.y = 0;
    text.position.z = 200;
    // text.rotation.z = Math.PI/2;
    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI/4;
    scene.add(text);
}
function resizeCanvas(){
    camera.aspect = window.innerWidth / window.innerHeight;  
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resizeCanvas, false);

// Draw basic parts
let drawSphere = function(rad,x,y,z,col){
    var geometry = new THREE.SphereGeometry(rad,32,32);
    // var material = new THREE.MeshLambertMaterial( { color: col } );
    var material = new THREE.MeshPhongMaterial( { color: col, 
        specular: 0x050505, 
        shininess: 400} );
        
    // var material =new THREE.MeshBasicMaterial( {color: col} );
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    return sphere;
}
let drawBond = function(thheta,phhi){
    var col = CPK.bond;
    var geometry = new THREE.CylinderGeometry(4,4,bondlength,32);
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


let drawNaCl = function(){
    // Rock-salt structure, designation 225 / B1 
    // NaCl structure due to dissimilar size of ions
    // Coordination - 6:6
    NaCl = new THREE.Group();
    h = 1;
    var sodiumIonRadius = 10.2;
    var chlorideIonRadius = 18.1;
    var dim = 60;
    var interionicRadius = sodiumIonRadius + chlorideIonRadius;
    for (i = -dim; i < dim; i+=interionicRadius){
        for (j = -dim; j < dim; j+=interionicRadius){
            for (k = -dim; k < dim; k+=interionicRadius){
                h=h+1;
                if (h%2 != 1){
                    //sodium ion, 102 pm
                    s1 = drawSphere(sodiumIonRadius,i,j,k,CPK.sodium);
                    NaCl.add(s1);
                }else{
                    //chloride ion, 181 pm
                    s1 = drawSphere(chlorideIonRadius,i,j,k,CPK.chlorine);
                    NaCl.add(s1);
                }
            }
        }
    }
    // s1 = drawSphere(20,0,0,0,0x9900FF);
    // s2 = drawSphere(20,40,0,0,0x00FF00);
    NaCl.add(s1); 
}
let drawCsCl = function(){
    // Caesium chloride structure, designation 221 / B2
    // CsCl structure due to similar size of ions
    // Coordination - 8:8
    CsCl = new THREE.Group();

    var caesiumIonRadius = 17.4;
    var chlorideIonRadius = 18.1;
    var dim = 80;
    var interionicRadius = caesiumIonRadius + chlorideIonRadius;

    // Draw Caesium
    for (i = -dim; i < dim; i+=interionicRadius*Math.sqrt(4/3)){
        for (j = -dim; j < dim; j+=interionicRadius*Math.sqrt(4/3)){
            for (k = -dim; k < dim; k+=interionicRadius*Math.sqrt(4/3)){
                    s1 = drawSphere(caesiumIonRadius,i,j,k,CPK.sodium);
                    CsCl.add(s1);
                
            }
        }
    }
    // Draw Chloride
    for (i = -dim+interionicRadius*Math.sqrt(4/3)/2; i < dim-interionicRadius*Math.sqrt(4/3)/2; i+=interionicRadius*Math.sqrt(4/3)){
        for (j = -dim+interionicRadius*Math.sqrt(4/3)/2; j < dim-interionicRadius*Math.sqrt(4/3)/2; j+=interionicRadius*Math.sqrt(4/3)){
            for (k = -dim+interionicRadius*Math.sqrt(4/3)/2; k < dim-interionicRadius*Math.sqrt(4/3)/2; k+=interionicRadius*Math.sqrt(4/3)){
                    s1 = drawSphere(chlorideIonRadius,i,j,k,CPK.chlorine);
                    CsCl.add(s1);
                
            }
        }
    }
    CsCl.translateX(interionicRadius);
    CsCl.translateY(interionicRadius);
    CsCl.translateZ(interionicRadius);
}
let drawDiamond = function(){
    diamond = new THREE.Group();

    s1 = drawSphere(20, 0 , 0 , 0 ,CPK.carbon);
    s2 = s1.clone()
    s3 = s1.clone()
    s2.translateZ(bondlength);
    s3.translateZ(-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));
    s4 = s3.clone();
    s3.translateY(bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2));
    s4.translateY( -bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3) );
    s5 = s4.clone();
    s4.translateX( -bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3) );
    s5.translateX( bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3) );

    b1 = drawBond(0,0);
    b2 = drawBond(Math.acos(-1/3),0);
    b3 = drawBond(Math.acos(-1/3),2/3*Math.PI);
    b4 = drawBond(Math.acos(-1/3),4/3*Math.PI);

    diamond.add(s1); diamond.add(s2); diamond.add(s3); diamond.add(s4); diamond.add(s5); 
    diamond.add(b1); diamond.add(b2); diamond.add(b3); diamond.add(b4); 

    d2 = diamond.clone()
    d2.translateY(bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2));
    d2.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));

    d3 = diamond.clone()
    d3.translateY(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3));
    d3.translateX(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
    d3.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));

    d4 = diamond.clone()
    d4.translateY(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3));
    d4.translateX(bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
    d4.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));

    // d5 = d4.clone()
    // d5.translateY(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3));
    // d5.translateX(bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
    // d5.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));

    // d6 = d2.clone()
    // d6.translateY(bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2));
    // d6.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));

    // d7 = d3.clone()
    // d7.translateY(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3));
    // d7.translateX(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
    // d7.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));
    diamond.add(d2); diamond.add(d3); diamond.add(d4); 

    for(i=0; i< 2; i+=1){
        d5 = diamond.clone();
        d5.translateY(bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2));
        d5.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));
        d6 = diamond.clone();
        d6.translateY(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3));
        d6.translateX(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
        d6.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));
        d7 = diamond.clone()
        d7.translateY(-bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.cos(Math.PI/3));
        d7.translateX(bondlength*Math.cos(Math.acos(-1/3)-Math.PI/2)*Math.sin(Math.PI/3));
        d7.translateZ(-bondlength-bondlength*Math.sin(Math.acos(-1/3)-Math.PI/2));
        diamond.add(d5); diamond.add(d6); diamond.add(d7); 
    }

    diamond.translateZ(bondlength*i);
    
    
    

    return diamond;
}
let drawgraphite = function(){
    graphite = new THREE.Group();
    elec = new THREE.Group();

    s1 = drawSphere(20, 0 , 0 , 0 ,CPK.carbon);
    s2 = s1.clone();
    s4 = s1.clone();

    s1.translateY(bondlength);  
    s2.translateY(bondlength/2);  
    s3 = s2.clone();  
    s2.translateX(-bondlength*Math.sin(Math.PI/3));
    s3.translateX(bondlength*Math.sin(Math.PI/3));
    s4.translateY(-bondlength); 
    s5 = s2.clone();
    s6 = s3.clone();
    s5.translateY(-bondlength);
    s6.translateY(-bondlength); 

    b1 = drawBond(0,0);
    b2 = b1.clone();  
    b3 = b1.clone();
    b4 = b1.clone();
    b5 = b1.clone();
    b6 = b1.clone();
    b1.position.set(0,bondlength,0);
    b2.position.set(-bondlength*Math.sin(Math.PI/3),bondlength/2,0);
    b3.position.set(bondlength*Math.sin(Math.PI/3),bondlength/2,0);
    b4.position.set(0,-bondlength,0);
    b5.position.set(-bondlength*Math.sin(Math.PI/3),-bondlength/2,0);
    b6.position.set(bondlength*Math.sin(Math.PI/3),-bondlength/2,0);
    b1.rotation.set(-Math.PI/2,2*Math.PI/3,0);  
    b2.rotation.set(-Math.PI/2,Math.PI/3,0);  
    b3.rotation.set(-Math.PI/2,Math.PI,0);  
    b4.rotation.set(-Math.PI/2,-Math.PI/3,0);  
    b5.rotation.set(-Math.PI/2,0,0);  
    b6.rotation.set(-Math.PI/2,-2*Math.PI/3,0);  

    s7 = drawLonePair(15,25,0,0,"red"); 
    s8 = drawSphere(3,0,0,25,"red");
    elec.add(s7); elec.add(s8); 
    s7 = elec.clone();
    s8 = elec.clone();
    s9 = elec.clone();
    s10 = elec.clone();
    s11 = elec.clone();

    elec.position.set(0,bondlength,0);
    s8.position.set(-bondlength*Math.sin(Math.PI/3),bondlength/2,0);
    s9.position.set(bondlength*Math.sin(Math.PI/3),bondlength/2,0);
    s10.position.set(0,-bondlength,0);
    s11.position.set(-bondlength*Math.sin(Math.PI/3),-bondlength/2,0);
    s7.position.set(bondlength*Math.sin(Math.PI/3),-bondlength/2,0);     

    graphite.add(s1); graphite.add(s2); graphite.add(s3); graphite.add(s4); graphite.add(s5); graphite.add(s6); 
    graphite.add(b1); graphite.add(b2); graphite.add(b3); graphite.add(b4); graphite.add(b5); graphite.add(b6); 
    graphite.add(s7); graphite.add(s8); graphite.add(s9); graphite.add(s10); graphite.add(s11); graphite.add(elec); 

    g2 = graphite.clone(); 
    g3 = graphite.clone();  
    g2.position.set(bondlength*Math.cos(Math.PI/6),bondlength*(1 + Math.sin(Math.PI/6)),0);
    g3.position.set(-bondlength*Math.cos(Math.PI/6),bondlength*(1 + Math.sin(Math.PI/6)),0);
    // g2.rotation.z = (Math.PI/6);
    graphite.add(g2); graphite.add(g3); 
    g2 = graphite.clone(); 
    g2.position.set( 0 , -bondlength*(2 + 2*Math.sin(Math.PI/6)) , 0);  
    graphite.add(g2); 
    g2 = graphite.clone(); 
    g2.position.set( 4*bondlength*Math.sin(Math.PI/3) , 0 , 0);  
    graphite.add(g2); 
    graphite.position.set(-3*bondlength,0,0);

    g2 = graphite.clone();  
    g2.translateZ(120);  
    g2.translateX(3*bondlength,);  

    g3 = g2.clone();
    g3.translateZ(-240); 

    
    graphite.add(g2); graphite.add(g3); 
    

    return graphite;
}

init();
// labelAxis();
drawNaCl();
drawCsCl();
drawDiamond();
drawgraphite();

scene.add(graphite);
animate();



