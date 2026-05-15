let scene, camera, renderer;
var controls;
let loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
var curMol;


var checkbox = document.getElementById("checkbox");

let init = function() {
    //create and locate camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1,3500);
    // camera.position.x = 100;
    // camera.position.y = 100;
    // camera.position.z = 100;

    camera.position.set(250,150,100);
    camera.up = new THREE.Vector3(0,0,1);
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x050505);
    scene.background = new THREE.Color(0xD5D5D5);
    // scene.background = new THREE.Color(0xf0f0f0);
    // axes helper
    
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
    controls.autoRotate = false; 
    controls.autoRotateSpeed = 0.6;

    light1 = new THREE.PointLight( 0xffffff, 0.4, 0,);
    light2 = new THREE.PointLight( 0xffffff, 0.3, 0 );
    light3 = new THREE.PointLight( 0xffffff, 0.4, 0 );
    light4 = new THREE.PointLight( 0xffffff, 0.5, 0 );
    light5 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    light6 = new THREE.PointLight( 0xffffff, 0.1, 0 );
    light7 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    light8 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    // light1.position.set( 100, 100, 100 );
    // light2.position.set( 100, -100, 100 );
    // light3.position.set( 100, 100, -100 );
    // light4.position.set( 100, -100, -100 );
    // light5.position.set( -100, 100, 100 );
    // light6.position.set( -100, -100, 100 );
    // light7.position.set( -100, 100, -100 );
    // light8.position.set( -100, -100, -100 );
    light1.position.set( 200, 200, 200 );
    light2.position.set( 200, -200, 200 );
    light3.position.set( 200, 200, -200 );
    light4.position.set( 200, -200, -200 );
    light5.position.set( -200, 200, 200 );
    light6.position.set( -200, -200, 200 );
    light7.position.set( -200, 200, -200 );
    light8.position.set( -200, -200, -200 );
	scene.add( light1 );
	scene.add( light2 );
    scene.add( light3 );
    scene.add( light4 );
	scene.add( light5 );
    scene.add( light6 );
    scene.add( light7 );
    scene.add( light8 );
    
    // rayCast = new THREE.Raycaster();
    // mouse = new THREE.Vector2();
    // mouse.x = mouse.y = -1;
    // var intersects = rayCast.intersectObjects( scene.children );
    // let onMouseClick = function(e){
    //     mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    //     mouse.z = 1;
    //     rayCast.setFromCamera(mouse,camera);
    //     intersects = rayCast.intersectObjects( scene.children );
        
    //     intersects.forEach(obj => obj.object.material.color.set('#69f'));
    //     for ( var i = 0; i < intersects.length; i++ ) {
    //         console.log( intersects[ i ] ); 
    //         // intersects[ i ].object.material.color.set("green");
    //         intersects[i].object.translateZ(2);
    //     }
    // }
    // document.addEventListener("click", onMouseClick, false);
    // document.addEventListener("mousemove", onMouseClick, false);


    renderer.render( scene, camera );// controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.1;
	controls.screenSpacePanning = false;
	controls.minDistance = 5;
	controls.maxDistance = 2000;
    controls.maxPolarAngle = Math.PI / 2;     
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 0.6;
    controls.autoRotate = true; 
}

checkbox.addEventListener( 'change', function() {
    if(this.checked) {  
        controls.autoRotate = true; 
    } else {
        controls.autoRotate = false; 
    }
});
