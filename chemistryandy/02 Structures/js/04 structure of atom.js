// 1 initialise main components
let scene, camera, renderer;
var controls;
var points1s, points2s, points3s;
var points2px, points2py, points2pz;
var points3px, points3py, points3pz;
var points3dxy, points3dyz, points3dxz;
var points4s, points3dz2, points3dx2y2;
var  atomID = document.getElementById("atomID")
var orbitalOn = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var probs = [0.3, 0.10,0.4,0.4,0.2,0.3,0.6];

var cols = [[0,1,1]];

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
    camera.position.x = -500;
    camera.position.y = 700;
    camera.position.z = 1500;
    camera.rotation.y += 120*Math.PI/180;
    camera.rotation.z += 120*Math.PI/180;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    //scene.background = new THREE.Color(0xf0f0f0);
    // axes helper
    let axes = new THREE.AxesHelper(1500);
    scene.add(axes);
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
    controls.autoRotate = true; 


    renderer.render( scene, camera );

};
function animate() {
    requestAnimationFrame( animate );
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
}
function render() {
    renderer.render( scene, camera );
}
let drawOrbital_1s = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];

    r = 100;

    for (var theta = 0; theta < Math.PI*2;theta+=0.13){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.13){
            if(Math.random() > probs[0]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0,1,1);
                    colors.push(color.r,color.g,color.b);
            }
        }
    }
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();
    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points1s = new THREE.Points(geometry, material);
    //scene.add( points1s );
}
let drawOrbital_2s = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    r = 280;
    for (var theta = 0; theta < Math.PI*2;theta+=0.08){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.1){
            if(Math.random()>probs[1]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.6,0.7,0.7);
                    colors.push(color.r,color.g,color.b);
            }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points2s = new THREE.Points(geometry, material);
    //scene.add( points2s );
}
let drawOrbital_2px = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.06){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.06){
            r = 300*(Math.sin(theta)*Math.cos(psi))^2;
                if(Math.random() > probs[2]){
                    positions.push(1.5*r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.7,1,1);
                    colors.push(color.r,color.g,color.b);
                    positions.push(-1.5*r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.7,1,1);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points2px = new THREE.Points(geometry, material);
    //scene.add( points2px );
}
let drawOrbital_2py = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.06){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.06){
            r = 300*(Math.sin(theta)*Math.sin(psi))^2;
                if(Math.random() > probs[2]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),1.5*r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(1,0.7,1);
                    colors.push(color.r,color.g,color.b);
                    positions.push(r*Math.sin(theta)*Math.cos(psi),-1.5*r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(1,0.7,1);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points2py = new THREE.Points(geometry, material);
    //scene.add( points2py );
}
let drawOrbital_2pz = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.06){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.06){
            r = 300*(Math.cos(theta))^2;
                if(Math.random() > probs[2]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),1.5*r*Math.cos(theta));
                    color.setRGB(1,1,0.7);
                    colors.push(color.r,color.g,color.b);
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),-1.5*r*Math.cos(theta));
                    color.setRGB(1,1,0.7);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points2pz = new THREE.Points(geometry, material);
    //scene.add( points2pz );
}
let drawOrbital_3s = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    r = 450;
    for (var theta = 0; theta < Math.PI*2;theta+=0.04){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.04){
            if(Math.random()>probs[3]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(1,0.3,0.3);
                    colors.push(color.r,color.g,color.b);
            }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3s = new THREE.Points(geometry, material);
    //scene.add( points3s );
}
let drawOrbital_3px = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.05){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.05){
            r = 400*(Math.sin(theta)*Math.cos(psi))^2;
                if(Math.random() > probs[4]){
                    positions.push(1.5*r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.4,0.7,0.5);
                    colors.push(color.r,color.g,color.b);
                    positions.push(-1.5*r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.4,0.7,0.5);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3px = new THREE.Points(geometry, material);
    //scene.add( points3px );
}
let drawOrbital_3py = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.05){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.05){
            r = 400*(Math.sin(theta)*Math.sin(psi))^2;
                if(Math.random() > probs[4]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),1.5*r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.3,0.7,0.3);
                    colors.push(color.r,color.g,color.b);
                    positions.push(r*Math.sin(theta)*Math.cos(psi),-1.5*r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.3,0.7,0.3);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3py = new THREE.Points(geometry, material);
    //scene.add( points3py );
}
let drawOrbital_3pz = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.05){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.05){
            r = 400*(Math.cos(theta))^2;
                if(Math.random() > probs[4]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),1.5*r*Math.cos(theta));
                    color.setRGB(0.3,0.5,0.7);
                    colors.push(color.r,color.g,color.b);
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),-1.5*r*Math.cos(theta));
                    color.setRGB(0.3,0.5,0.7);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3pz = new THREE.Points(geometry, material);
    //scene.add( points3pz );
}
let drawOrbital_3dxy = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.02){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.02){
            r = 800*((Math.sin(theta))*(Math.sin(2*psi)))^2;
                if(Math.random() > probs[5]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r/2*Math.cos(theta));
                    color.setRGB(1,0.3,0.7);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3dxy = new THREE.Points(geometry, material);
    //scene.add( points3dxy );
}
let drawOrbital_3dxz = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.02){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.02){
            r = 2*(800*Math.sin(theta)*Math.cos(theta)*Math.cos(psi))^2//800*((Math.sin(theta))*(Math.sin(2*psi)))^2;
                if(Math.random() > probs[5]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r/2*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.7,1,0.3);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3dxz = new THREE.Points(geometry, material);
    //scene.add( points3dxz );
}
let drawOrbital_3dyz = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = 0; theta < Math.PI*2;theta+=0.02){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.02){
            r = (2*800*Math.sin(theta)*Math.cos(theta)*Math.sin(psi))^2;
                if(Math.random() > probs[5]){
                    positions.push(r/2*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.3,0.7,1.0);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3dyz = new THREE.Points(geometry, material);
    //scene.add( points3dyz );
}
let drawOrbital_4s = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    r = 600;
    for (var theta = 0; theta < Math.PI*2;theta+=0.04){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.04){
            if(Math.random()>probs[6]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.7,1.0,0.3);
                    colors.push(color.r,color.g,color.b);
            }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points4s = new THREE.Points(geometry, material);
}
let drawOrbital_3dz2 = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var psi = 0; psi < 2*Math.PI;psi+=0.02){
        for (var theta = 0; theta <Math.PI; theta+=0.02){
            r = (3*(Math.cos(theta))^2-1)*100;
                if(Math.random() > probs[5]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(1,0.3,0.7);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3dz2 = new THREE.Points(geometry, material);
}
let drawOrbital_3dx2y2 = function(){
    var geometry = new THREE.BufferGeometry();
    var color = new THREE.Color();
    var positions = [];
    var colors = [];
    for (var theta = -Math.PI/2; theta < Math.PI/2;theta+=0.02){
        for (var psi = -Math.PI; psi <Math.PI; psi+=0.02){
            r = (((Math.sin(psi)^2)*Math.cos(2*theta))^2)*200;
                if(Math.random() > probs[5]){
                    positions.push(r*Math.sin(theta)*Math.cos(psi),r/2*Math.sin(theta)*Math.sin(psi),r*Math.cos(theta));
                    color.setRGB(0.7,1,0.3);
                    colors.push(color.r,color.g,color.b);
                }
        }
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.addAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial( { size:1, vertexColors: THREE.VertexColors } );
    points3dx2y2 = new THREE.Points(geometry, material);
    //scene.add( points3dxz );
}






function draw4s(){
    if(orbitalOn[15]){
        orbitalOn[15] = false;
        scene.remove(points4s);
    } else {
        orbitalOn[15] = true;
        scene.add(points4s);
    }
}
function draw3dxy(){
    if(orbitalOn[9]){
        orbitalOn[9] = false;
        scene.remove(points3dxy);
    } else {
        orbitalOn[9] = true;
        scene.add(points3dxy);
    }
}
function draw3dxz(){
    if(orbitalOn[10]){
        orbitalOn[10] = false;
        scene.remove(points3dxz);
    } else {
        orbitalOn[10] = true;
        scene.add(points3dxz);
    }
}
function draw3dyz(){
    if(orbitalOn[11]){
        orbitalOn[11] = false;
        scene.remove(points3dyz);
    } else {
        orbitalOn[11] = true;
        scene.add(points3dyz);
    }
}
function draw3dz2(){
    if(orbitalOn[12]){
        orbitalOn[12] = false;
        scene.remove(points3dz2);
    } else {
        orbitalOn[12] = true;
        scene.add(points3dz2);
    }
}
function draw3dx2_y2(){
    if(orbitalOn[13]){
        orbitalOn[13] = false;
        scene.remove(points3dx2y2);
    } else {
        orbitalOn[13] = true;
        scene.add(points3dx2y2);
    }
}
function draw3px(){
    if(orbitalOn[6]){
        orbitalOn[6] = false;
        scene.remove(points3px);
    } else {
        orbitalOn[6] = true;
        scene.add(points3px);
    }
}
function draw3py(){
    if(orbitalOn[7]){
        orbitalOn[7] = false;
        scene.remove(points3py);
    } else {
        orbitalOn[7] = true;
        scene.add(points3py);
    }
}
function draw3pz(){
    if(orbitalOn[8]){
        orbitalOn[8] = false;
        scene.remove(points3pz);
    } else {
        orbitalOn[8] = true;
        scene.add(points3pz);
    }
}
function draw3s(){
    if(orbitalOn[5]){
        orbitalOn[5] = false;
        scene.remove(points3s);
    } else {
        orbitalOn[5] = true;
        scene.add(points3s);
    }
}
function draw2px(){
    if(orbitalOn[2]){
        orbitalOn[2] = false;
        scene.remove(points2px);
    } else {
        orbitalOn[2] = true;
        scene.add(points2px);
    }
}
function draw2py(){
    if(orbitalOn[3]){
        orbitalOn[3] = false;
        scene.remove(points2py);
    } else {
        orbitalOn[3] = true;
        scene.add(points2py);
    }
}
function draw2pz(){
    if(orbitalOn[4]){
        orbitalOn[4] = false;
        scene.remove(points2pz);
    } else {
        orbitalOn[4] = true;
        scene.add(points2pz);
    }
}
function draw2s(){
    if(orbitalOn[1]){
        orbitalOn[1] = false;
        scene.remove(points2s);
    } else {
        orbitalOn[1] = true;
        scene.add(points2s);
    }
}
function draw1s(){
    if(orbitalOn[0]){
        orbitalOn[0] = false;
        scene.remove(points1s);
    } else {
        orbitalOn[0] = true;
        scene.add(points1s);
    }
}



function clearAll(){
    orbitalOn = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    scene.remove(points1s);
    scene.remove(points2s);
    scene.remove(points3s);
    scene.remove(points2px);
    scene.remove(points2py);
    scene.remove(points2pz);
    scene.remove(points3px);
    scene.remove(points3py);
    scene.remove(points3pz);
    scene.remove(points3dxy); 
    scene.remove(points3dyz);
    scene.remove(points3dxz);
    scene.remove(points4s);
    atomID.innerHTML = "";
}
function addAll(){
    orbitalOn = [true,true,true,true,true,true,true,true,true,true,true,true];
    scene.add(points1s);
    scene.add(points2s);
    scene.add(points3s);
    scene.add(points2px);
    scene.add(points2py);
    scene.add(points2pz);
    scene.add(points3px);
    scene.add(points3py);
    scene.add(points3pz);
    scene.add(points3dxy); 
    scene.add(points3dyz);
    scene.add(points3dxz);
    scene.add(points4s);
}

init();
// Draw orbitals
drawOrbital_1s();
drawOrbital_2s();
drawOrbital_2px();
drawOrbital_2py();
drawOrbital_2pz();
drawOrbital_3s();
drawOrbital_3px();
drawOrbital_3py();
drawOrbital_3pz();
drawOrbital_3dxy();
drawOrbital_3dxz();
drawOrbital_3dyz();
drawOrbital_4s();
drawOrbital_3dz2();
drawOrbital_3dx2y2();
animate();

function resizeCanvas(){
    var canva = document.getElementsByTagName("canvas");
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
}
document.addEventListener('resize', resizeCanvas, false);