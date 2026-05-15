gdjs.magnet_95scene_95Part1Code = {};
gdjs.magnet_95scene_95Part1Code.GDmagnetObjects1= [];
gdjs.magnet_95scene_95Part1Code.GDmagnetObjects2= [];
gdjs.magnet_95scene_95Part1Code.GDdropAreaObjects1= [];
gdjs.magnet_95scene_95Part1Code.GDdropAreaObjects2= [];
gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects1= [];
gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects2= [];
gdjs.magnet_95scene_95Part1Code.GDunattractedBallObjects1= [];
gdjs.magnet_95scene_95Part1Code.GDunattractedBallObjects2= [];
gdjs.magnet_95scene_95Part1Code.GDyellowBallObjects1= [];
gdjs.magnet_95scene_95Part1Code.GDyellowBallObjects2= [];
gdjs.magnet_95scene_95Part1Code.GDQuestion1Objects1= [];
gdjs.magnet_95scene_95Part1Code.GDQuestion1Objects2= [];
gdjs.magnet_95scene_95Part1Code.GDscene2BtnObjects1= [];
gdjs.magnet_95scene_95Part1Code.GDscene2BtnObjects2= [];

gdjs.magnet_95scene_95Part1Code.conditionTrue_0 = {val:false};
gdjs.magnet_95scene_95Part1Code.condition0IsTrue_0 = {val:false};
gdjs.magnet_95scene_95Part1Code.condition1IsTrue_0 = {val:false};
gdjs.magnet_95scene_95Part1Code.condition2IsTrue_0 = {val:false};
gdjs.magnet_95scene_95Part1Code.conditionTrue_1 = {val:false};
gdjs.magnet_95scene_95Part1Code.condition0IsTrue_1 = {val:false};
gdjs.magnet_95scene_95Part1Code.condition1IsTrue_1 = {val:false};
gdjs.magnet_95scene_95Part1Code.condition2IsTrue_1 = {val:false};


gdjs.magnet_95scene_95Part1Code.mapOfGDgdjs_46magnet_9595scene_9595Part1Code_46GDattractedBallObjects1Objects = Hashtable.newFrom({"attractedBall": gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects1});gdjs.magnet_95scene_95Part1Code.mapOfGDgdjs_46magnet_9595scene_9595Part1Code_46GDdropAreaObjects1Objects = Hashtable.newFrom({"dropArea": gdjs.magnet_95scene_95Part1Code.GDdropAreaObjects1});gdjs.magnet_95scene_95Part1Code.mapOfGDgdjs_46magnet_9595scene_9595Part1Code_46GDscene2BtnObjects1Objects = Hashtable.newFrom({"scene2Btn": gdjs.magnet_95scene_95Part1Code.GDscene2BtnObjects1});gdjs.magnet_95scene_95Part1Code.eventsList0xb4be0 = function(runtimeScene) {

{

gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects1.createFrom(runtimeScene.getObjects("attractedBall"));
gdjs.magnet_95scene_95Part1Code.GDdropAreaObjects1.createFrom(runtimeScene.getObjects("dropArea"));

gdjs.magnet_95scene_95Part1Code.condition0IsTrue_0.val = false;
{
gdjs.magnet_95scene_95Part1Code.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.magnet_95scene_95Part1Code.mapOfGDgdjs_46magnet_9595scene_9595Part1Code_46GDattractedBallObjects1Objects, gdjs.magnet_95scene_95Part1Code.mapOfGDgdjs_46magnet_9595scene_9595Part1Code_46GDdropAreaObjects1Objects, false, runtimeScene, false);
}if (gdjs.magnet_95scene_95Part1Code.condition0IsTrue_0.val) {
/* Reuse gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects1 */
gdjs.magnet_95scene_95Part1Code.GDmagnetObjects1.createFrom(runtimeScene.getObjects("magnet"));
{for(var i = 0, len = gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects1.length ;i < len;++i) {
    gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects1[i].addForceTowardPosition((( gdjs.magnet_95scene_95Part1Code.GDmagnetObjects1.length === 0 ) ? 0 :gdjs.magnet_95scene_95Part1Code.GDmagnetObjects1[0].getPointX("attractionPoint")), (( gdjs.magnet_95scene_95Part1Code.GDmagnetObjects1.length === 0 ) ? 0 :gdjs.magnet_95scene_95Part1Code.GDmagnetObjects1[0].getPointY("attractionPoint")), 300, 0);
}
}}

}


{

gdjs.magnet_95scene_95Part1Code.GDscene2BtnObjects1.createFrom(runtimeScene.getObjects("scene2Btn"));

gdjs.magnet_95scene_95Part1Code.condition0IsTrue_0.val = false;
{
{gdjs.magnet_95scene_95Part1Code.conditionTrue_1 = gdjs.magnet_95scene_95Part1Code.condition0IsTrue_0;
gdjs.magnet_95scene_95Part1Code.condition0IsTrue_1.val = false;
gdjs.magnet_95scene_95Part1Code.condition1IsTrue_1.val = false;
{
gdjs.magnet_95scene_95Part1Code.condition0IsTrue_1.val = gdjs.evtTools.input.cursorOnObject(gdjs.magnet_95scene_95Part1Code.mapOfGDgdjs_46magnet_9595scene_9595Part1Code_46GDscene2BtnObjects1Objects, runtimeScene, true, false);
}if ( gdjs.magnet_95scene_95Part1Code.condition0IsTrue_1.val ) {
{
gdjs.magnet_95scene_95Part1Code.condition1IsTrue_1.val = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}}
gdjs.magnet_95scene_95Part1Code.conditionTrue_1.val = true && gdjs.magnet_95scene_95Part1Code.condition0IsTrue_1.val && gdjs.magnet_95scene_95Part1Code.condition1IsTrue_1.val;
}
}if (gdjs.magnet_95scene_95Part1Code.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "magnet_scene_Part2", false);
}}

}


{



}


{



}


}; //End of gdjs.magnet_95scene_95Part1Code.eventsList0xb4be0


gdjs.magnet_95scene_95Part1Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.magnet_95scene_95Part1Code.GDmagnetObjects1.length = 0;
gdjs.magnet_95scene_95Part1Code.GDmagnetObjects2.length = 0;
gdjs.magnet_95scene_95Part1Code.GDdropAreaObjects1.length = 0;
gdjs.magnet_95scene_95Part1Code.GDdropAreaObjects2.length = 0;
gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects1.length = 0;
gdjs.magnet_95scene_95Part1Code.GDattractedBallObjects2.length = 0;
gdjs.magnet_95scene_95Part1Code.GDunattractedBallObjects1.length = 0;
gdjs.magnet_95scene_95Part1Code.GDunattractedBallObjects2.length = 0;
gdjs.magnet_95scene_95Part1Code.GDyellowBallObjects1.length = 0;
gdjs.magnet_95scene_95Part1Code.GDyellowBallObjects2.length = 0;
gdjs.magnet_95scene_95Part1Code.GDQuestion1Objects1.length = 0;
gdjs.magnet_95scene_95Part1Code.GDQuestion1Objects2.length = 0;
gdjs.magnet_95scene_95Part1Code.GDscene2BtnObjects1.length = 0;
gdjs.magnet_95scene_95Part1Code.GDscene2BtnObjects2.length = 0;

gdjs.magnet_95scene_95Part1Code.eventsList0xb4be0(runtimeScene);
return;

}
gdjs['magnet_95scene_95Part1Code'] = gdjs.magnet_95scene_95Part1Code;
