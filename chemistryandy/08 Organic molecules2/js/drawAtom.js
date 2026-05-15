//CPK colour rules
var colorChoice = {
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
    var geometry = new THREE.CylinderGeometry(4,4,60,32);
    col = colorChoice.bond;
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