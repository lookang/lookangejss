function animate() {
    requestAnimationFrame( animate );
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render( scene, camera );
    // intersects = rayCast.intersectObjects(scene.children);
    // intersects.forEach(obj => obj.object.material.color.set(0x00ff00));
}
function axisDraw(){
    let axes = new THREE.AxesHelper(1500);
    scene.add(axes);
}
function resizeCanvas(){
    camera.aspect = window.innerWidth / window.innerHeight;  
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resizeCanvas, false);

init();
// axisDraw();

// Saturated
methane = new drawCH4();
ethane = new drawC2H6();
octane = new drawC8H18();
cyclohex = new drawC6H12();
// Unsaturated
benzene = new drawC6H6();
chlorobenzene = new drawC6H5Cl();
phenol = new drawC6H5OH();
benzoic = new drawC6H5CO2H();
nitrobenzene = new drawC6H5NO2();
ethene = new drawC2H4();
propene = new drawC3H6();
cisbut2ene = new drawC4H8cis();
transbut2ene = new drawC4H8trans();
// halogenoalkanes
bromomethane = new drawCH3Br();
bromoethane = new drawCH3CH2Br();
bromo2propane = new drawCH3CHBrCH3();
tertbromobutane = new drawCH3CCH3BrCH3()
carbenium = new drawCCH33();
// Alcohols
methanol = new drawCH3OH();
ethanol = new drawC2H5OH();
propan2ol = new drawCH3CH2OHCH3();
tertbutanol = new drawCH33COH();
// Carbonyls
methanal = new drawHCHO();
propanone = new drawCH3COCH3();
//Carboxylic acids
methanoic = new drawHCOOH();
ethanoic = new drawCH3CO2H();

//Amines
ammonia = new drawNH3();
methylamine = new drawCH3NH2();
dimethylamine = new drawCH3CH3NH();
trimethylamine = new drawCH33N();

scene.add(carbenium);
curMol = carbenium;
document.getElementById('structure').innerHTML = 'tertiary carbenium';





animate();