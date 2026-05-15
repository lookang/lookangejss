/* _inputParameters: an object with different values for the model parameters */
function gravity10(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
  var _model = EJSS_CORE.createAnimationLMS();
  var _view;
  var _isPlaying = false;
  var _isPaused = true;
  var _isMobile = (navigator===undefined) ? false : navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);

var _stringProperties = {};
  var _tools = {
    showInputDialog : EJSS_INTERFACE.BoxPanel.showInputDialog,
    showOkDialog : EJSS_INTERFACE.BoxPanel.showOkDialog,
    showOkCancelDialog : EJSS_INTERFACE.BoxPanel.showOkCancelDialog,
    downloadText: EJSS_TOOLS.File.downloadText,
    uploadText: function(action) { EJSS_TOOLS.File.uploadText(_model,action); } 
  };

  function _play()  { _isPaused = false; _isPlaying = true;  _model.play();  }
  function _pause() { _isPaused = true;  _isPlaying = false; _model.pause(); }
  function _step()  { _pause();  _model.step(); }
  function _reset() { _model.reset();  _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); }
  _model._play  = _play;
  _model._pause = _pause;
  _model._step  = _step;
  _model._reset = _reset;
  function _update() { _model.update(); }
  function _initialize() { _model.initialize(); }
  function _setFPS(_fps) { _model.setFPS(_fps); }
  function _setDelay(_delay) { _model.setDelay(_delay); }
  function _setStepsPerDisplay(_spd) { _model.setStepsPerDisplay(_spd); }
  function _setUpdateView(_updateView) { _model.setUpdateView(_updateView); }
  function _setAutoplay(_auto) { _model.setAutoplay(_auto); }
  function _println(_message) { console.log(_message); }

  function _breakAfterThisPage() { _model.setShouldBreak(true); }

  function _resetSolvers() { if (_model.resetSolvers) _model.resetSolvers(); }

  function _saveText(name,type,content) { if (_model.saveText) _model.saveText(name,type,content); }

  function _saveState(name) { if (_model.saveState) _model.saveState(name); }

  function _saveImage(name,panelname) { if (_model.saveImage) _model.saveImage(name,panelname); }

  function _readState(url,type) { if (_model.readState) _model.readState(url,type); }

  function _readText(url,type,varname) { if (_model.readText) _model.readText(url,type,varname); }

  function _getStringProperty(propertyName) {
    var _value = _stringProperties[propertyName];
    if (_value===undefined) return propertyName;
    else return _value;
  }
  var __pagesEnabled = [];
  function _setPageEnabled(pageName,enabled) { __pagesEnabled[pageName] = enabled; }

  var lineWidthBugFix; // EjsS Model.Variables.Var Table.lineWidthBugFix
  var print; // EjsS Model.Variables.Var Table.print
  var fontb; // EjsS Model.Variables.Var Table.fontb
  var font; // EjsS Model.Variables.Var Table.font
  var mode; // EjsS Model.Variables.Var Table.mode
  var iOS; // EjsS Model.Variables.Var Table.iOS
  var iPad; // EjsS Model.Variables.Var Table.iPad
  var iPhone; // EjsS Model.Variables.Var Table.iPhone
  var angle; // EjsS Model.Variables.Var Table.angle
  var anglez; // EjsS Model.Variables.Var Table.anglez
  var faction; // EjsS Model.Variables.Var Table.faction
  var R; // EjsS Model.Variables.Var Table.R
  var x; // EjsS Model.Variables.Var Table.x
  var y; // EjsS Model.Variables.Var Table.y
  var z; // EjsS Model.Variables.Var Table.z
  var xs; // EjsS Model.Variables.Var Table.xs
  var ys; // EjsS Model.Variables.Var Table.ys
  var zs; // EjsS Model.Variables.Var Table.zs
  var rotation; // EjsS Model.Variables.Var Table.rotation
  var scale; // EjsS Model.Variables.Var Table.scale
  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var omega; // EjsS Model.Variables.Var Table.omega
  var spinomega; // EjsS Model.Variables.Var Table.spinomega
  var angleincrease; // EjsS Model.Variables.Var Table.angleincrease
  var anglezincrease; // EjsS Model.Variables.Var Table.anglezincrease
  var geostationary; // EjsS Model.Variables.Var Table.geostationary
  var geostationaryearth; // EjsS Model.Variables.Var Table.geostationaryearth
  var picturemode; // EjsS Model.Variables.Var Table.picturemode
  var buttonmode1; // EjsS Model.Variables.Var Table.buttonmode1
  var buttonmode2; // EjsS Model.Variables.Var Table.buttonmode2
  var buttonmode3; // EjsS Model.Variables.Var Table.buttonmode3
  var buttonmode4; // EjsS Model.Variables.Var Table.buttonmode4
  var buttonmode5; // EjsS Model.Variables.Var Table.buttonmode5
  var buttonmode51; // EjsS Model.Variables.Var Table.buttonmode51
  var buttonmode52; // EjsS Model.Variables.Var Table.buttonmode52
  var buttonmode53; // EjsS Model.Variables.Var Table.buttonmode53
  var buttonmode6; // EjsS Model.Variables.Var Table.buttonmode6
  var buttonmode61; // EjsS Model.Variables.Var Table.buttonmode61
  var buttonmode7; // EjsS Model.Variables.Var Table.buttonmode7
  var EquatorPlane; // EjsS Model.Variables.Var Table.EquatorPlane
  var forces; // EjsS Model.Variables.Var Table.forces
  var earth; // EjsS Model.Variables.Var Table.earth
  var moon; // EjsS Model.Variables.Var Table.moon

  var xgeo; // EjsS Model.Variables.geostationary.xgeo
  var ygeo; // EjsS Model.Variables.geostationary.ygeo
  var zgeo; // EjsS Model.Variables.geostationary.zgeo
  var anglegeo; // EjsS Model.Variables.geostationary.anglegeo
  var anglezgeo; // EjsS Model.Variables.geostationary.anglezgeo
  var anglegeoincrease; // EjsS Model.Variables.geostationary.anglegeoincrease
  var axesearth; // EjsS Model.Variables.geostationary.axesearth
  var axesplanet; // EjsS Model.Variables.geostationary.axesplanet
  var vectorx; // EjsS Model.Variables.geostationary.vectorx
  var vectory; // EjsS Model.Variables.geostationary.vectory
  var vectorz; // EjsS Model.Variables.geostationary.vectorz
  var axisx; // EjsS Model.Variables.geostationary.axisx
  var axisy; // EjsS Model.Variables.geostationary.axisy
  var axisz; // EjsS Model.Variables.geostationary.axisz
  var text; // EjsS Model.Variables.geostationary.text
  var zoom; // EjsS Model.Variables.geostationary.zoom
  var screen; // EjsS Model.Variables.geostationary.screen

  var selected; // EjsS Model.Variables.lookang.selected
  var selected1; // EjsS Model.Variables.lookang.selected1
  var Width; // EjsS Model.Variables.lookang.Width
  var Height; // EjsS Model.Variables.lookang.Height
  var Width1; // EjsS Model.Variables.lookang.Width1

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      lineWidthBugFix : lineWidthBugFix,
      print : print,
      fontb : fontb,
      font : font,
      mode : mode,
      iOS : iOS,
      iPad : iPad,
      iPhone : iPhone,
      angle : angle,
      anglez : anglez,
      faction : faction,
      R : R,
      x : x,
      y : y,
      z : z,
      xs : xs,
      ys : ys,
      zs : zs,
      rotation : rotation,
      scale : scale,
      t : t,
      dt : dt,
      omega : omega,
      spinomega : spinomega,
      angleincrease : angleincrease,
      anglezincrease : anglezincrease,
      geostationary : geostationary,
      geostationaryearth : geostationaryearth,
      picturemode : picturemode,
      buttonmode1 : buttonmode1,
      buttonmode2 : buttonmode2,
      buttonmode3 : buttonmode3,
      buttonmode4 : buttonmode4,
      buttonmode5 : buttonmode5,
      buttonmode51 : buttonmode51,
      buttonmode52 : buttonmode52,
      buttonmode53 : buttonmode53,
      buttonmode6 : buttonmode6,
      buttonmode61 : buttonmode61,
      buttonmode7 : buttonmode7,
      EquatorPlane : EquatorPlane,
      forces : forces,
      earth : earth,
      moon : moon,
      xgeo : xgeo,
      ygeo : ygeo,
      zgeo : zgeo,
      anglegeo : anglegeo,
      anglezgeo : anglezgeo,
      anglegeoincrease : anglegeoincrease,
      axesearth : axesearth,
      axesplanet : axesplanet,
      vectorx : vectorx,
      vectory : vectory,
      vectorz : vectorz,
      axisx : axisx,
      axisy : axisy,
      axisz : axisz,
      text : text,
      zoom : zoom,
      screen : screen,
      selected : selected,
      selected1 : selected1,
      Width : Width,
      Height : Height,
      Width1 : Width1
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      lineWidthBugFix : lineWidthBugFix,
      print : print,
      fontb : fontb,
      font : font,
      mode : mode,
      iOS : iOS,
      iPad : iPad,
      iPhone : iPhone,
      angle : angle,
      anglez : anglez,
      faction : faction,
      R : R,
      x : x,
      y : y,
      z : z,
      xs : xs,
      ys : ys,
      zs : zs,
      rotation : rotation,
      scale : scale,
      t : t,
      dt : dt,
      omega : omega,
      spinomega : spinomega,
      angleincrease : angleincrease,
      anglezincrease : anglezincrease,
      geostationary : geostationary,
      geostationaryearth : geostationaryearth,
      picturemode : picturemode,
      buttonmode1 : buttonmode1,
      buttonmode2 : buttonmode2,
      buttonmode3 : buttonmode3,
      buttonmode4 : buttonmode4,
      buttonmode5 : buttonmode5,
      buttonmode51 : buttonmode51,
      buttonmode52 : buttonmode52,
      buttonmode53 : buttonmode53,
      buttonmode6 : buttonmode6,
      buttonmode61 : buttonmode61,
      buttonmode7 : buttonmode7,
      EquatorPlane : EquatorPlane,
      forces : forces,
      earth : earth,
      moon : moon,
      xgeo : xgeo,
      ygeo : ygeo,
      zgeo : zgeo,
      anglegeo : anglegeo,
      anglezgeo : anglezgeo,
      anglegeoincrease : anglegeoincrease,
      axesearth : axesearth,
      axesplanet : axesplanet,
      vectorx : vectorx,
      vectory : vectory,
      vectorz : vectorz,
      axisx : axisx,
      axisy : axisy,
      axisz : axisz,
      text : text,
      zoom : zoom,
      screen : screen,
      selected : selected,
      selected1 : selected1,
      Width : Width,
      Height : Height,
      Width1 : Width1
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.lineWidthBugFix != "undefined") lineWidthBugFix = json.lineWidthBugFix;
    if(typeof json.print != "undefined") print = json.print;
    if(typeof json.fontb != "undefined") fontb = json.fontb;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.mode != "undefined") mode = json.mode;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.anglez != "undefined") anglez = json.anglez;
    if(typeof json.faction != "undefined") faction = json.faction;
    if(typeof json.R != "undefined") R = json.R;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.z != "undefined") z = json.z;
    if(typeof json.xs != "undefined") xs = json.xs;
    if(typeof json.ys != "undefined") ys = json.ys;
    if(typeof json.zs != "undefined") zs = json.zs;
    if(typeof json.rotation != "undefined") rotation = json.rotation;
    if(typeof json.scale != "undefined") scale = json.scale;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.omega != "undefined") omega = json.omega;
    if(typeof json.spinomega != "undefined") spinomega = json.spinomega;
    if(typeof json.angleincrease != "undefined") angleincrease = json.angleincrease;
    if(typeof json.anglezincrease != "undefined") anglezincrease = json.anglezincrease;
    if(typeof json.geostationary != "undefined") geostationary = json.geostationary;
    if(typeof json.geostationaryearth != "undefined") geostationaryearth = json.geostationaryearth;
    if(typeof json.picturemode != "undefined") picturemode = json.picturemode;
    if(typeof json.buttonmode1 != "undefined") buttonmode1 = json.buttonmode1;
    if(typeof json.buttonmode2 != "undefined") buttonmode2 = json.buttonmode2;
    if(typeof json.buttonmode3 != "undefined") buttonmode3 = json.buttonmode3;
    if(typeof json.buttonmode4 != "undefined") buttonmode4 = json.buttonmode4;
    if(typeof json.buttonmode5 != "undefined") buttonmode5 = json.buttonmode5;
    if(typeof json.buttonmode51 != "undefined") buttonmode51 = json.buttonmode51;
    if(typeof json.buttonmode52 != "undefined") buttonmode52 = json.buttonmode52;
    if(typeof json.buttonmode53 != "undefined") buttonmode53 = json.buttonmode53;
    if(typeof json.buttonmode6 != "undefined") buttonmode6 = json.buttonmode6;
    if(typeof json.buttonmode61 != "undefined") buttonmode61 = json.buttonmode61;
    if(typeof json.buttonmode7 != "undefined") buttonmode7 = json.buttonmode7;
    if(typeof json.EquatorPlane != "undefined") EquatorPlane = json.EquatorPlane;
    if(typeof json.forces != "undefined") forces = json.forces;
    if(typeof json.earth != "undefined") earth = json.earth;
    if(typeof json.moon != "undefined") moon = json.moon;
    if(typeof json.xgeo != "undefined") xgeo = json.xgeo;
    if(typeof json.ygeo != "undefined") ygeo = json.ygeo;
    if(typeof json.zgeo != "undefined") zgeo = json.zgeo;
    if(typeof json.anglegeo != "undefined") anglegeo = json.anglegeo;
    if(typeof json.anglezgeo != "undefined") anglezgeo = json.anglezgeo;
    if(typeof json.anglegeoincrease != "undefined") anglegeoincrease = json.anglegeoincrease;
    if(typeof json.axesearth != "undefined") axesearth = json.axesearth;
    if(typeof json.axesplanet != "undefined") axesplanet = json.axesplanet;
    if(typeof json.vectorx != "undefined") vectorx = json.vectorx;
    if(typeof json.vectory != "undefined") vectory = json.vectory;
    if(typeof json.vectorz != "undefined") vectorz = json.vectorz;
    if(typeof json.axisx != "undefined") axisx = json.axisx;
    if(typeof json.axisy != "undefined") axisy = json.axisy;
    if(typeof json.axisz != "undefined") axisz = json.axisz;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.zoom != "undefined") zoom = json.zoom;
    if(typeof json.screen != "undefined") screen = json.screen;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.selected1 != "undefined") selected1 = json.selected1;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.lineWidthBugFix != "undefined") lineWidthBugFix = json.lineWidthBugFix;
    if(typeof json.print != "undefined") print = json.print;
    if(typeof json.fontb != "undefined") fontb = json.fontb;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.mode != "undefined") mode = json.mode;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.anglez != "undefined") anglez = json.anglez;
    if(typeof json.faction != "undefined") faction = json.faction;
    if(typeof json.R != "undefined") R = json.R;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.z != "undefined") z = json.z;
    if(typeof json.xs != "undefined") xs = json.xs;
    if(typeof json.ys != "undefined") ys = json.ys;
    if(typeof json.zs != "undefined") zs = json.zs;
    if(typeof json.rotation != "undefined") rotation = json.rotation;
    if(typeof json.scale != "undefined") scale = json.scale;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.omega != "undefined") omega = json.omega;
    if(typeof json.spinomega != "undefined") spinomega = json.spinomega;
    if(typeof json.angleincrease != "undefined") angleincrease = json.angleincrease;
    if(typeof json.anglezincrease != "undefined") anglezincrease = json.anglezincrease;
    if(typeof json.geostationary != "undefined") geostationary = json.geostationary;
    if(typeof json.geostationaryearth != "undefined") geostationaryearth = json.geostationaryearth;
    if(typeof json.picturemode != "undefined") picturemode = json.picturemode;
    if(typeof json.buttonmode1 != "undefined") buttonmode1 = json.buttonmode1;
    if(typeof json.buttonmode2 != "undefined") buttonmode2 = json.buttonmode2;
    if(typeof json.buttonmode3 != "undefined") buttonmode3 = json.buttonmode3;
    if(typeof json.buttonmode4 != "undefined") buttonmode4 = json.buttonmode4;
    if(typeof json.buttonmode5 != "undefined") buttonmode5 = json.buttonmode5;
    if(typeof json.buttonmode51 != "undefined") buttonmode51 = json.buttonmode51;
    if(typeof json.buttonmode52 != "undefined") buttonmode52 = json.buttonmode52;
    if(typeof json.buttonmode53 != "undefined") buttonmode53 = json.buttonmode53;
    if(typeof json.buttonmode6 != "undefined") buttonmode6 = json.buttonmode6;
    if(typeof json.buttonmode61 != "undefined") buttonmode61 = json.buttonmode61;
    if(typeof json.buttonmode7 != "undefined") buttonmode7 = json.buttonmode7;
    if(typeof json.EquatorPlane != "undefined") EquatorPlane = json.EquatorPlane;
    if(typeof json.forces != "undefined") forces = json.forces;
    if(typeof json.earth != "undefined") earth = json.earth;
    if(typeof json.moon != "undefined") moon = json.moon;
    if(typeof json.xgeo != "undefined") xgeo = json.xgeo;
    if(typeof json.ygeo != "undefined") ygeo = json.ygeo;
    if(typeof json.zgeo != "undefined") zgeo = json.zgeo;
    if(typeof json.anglegeo != "undefined") anglegeo = json.anglegeo;
    if(typeof json.anglezgeo != "undefined") anglezgeo = json.anglezgeo;
    if(typeof json.anglegeoincrease != "undefined") anglegeoincrease = json.anglegeoincrease;
    if(typeof json.axesearth != "undefined") axesearth = json.axesearth;
    if(typeof json.axesplanet != "undefined") axesplanet = json.axesplanet;
    if(typeof json.vectorx != "undefined") vectorx = json.vectorx;
    if(typeof json.vectory != "undefined") vectory = json.vectory;
    if(typeof json.vectorz != "undefined") vectorz = json.vectorz;
    if(typeof json.axisx != "undefined") axisx = json.axisx;
    if(typeof json.axisy != "undefined") axisy = json.axisy;
    if(typeof json.axisz != "undefined") axisz = json.axisz;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.zoom != "undefined") zoom = json.zoom;
    if(typeof json.screen != "undefined") screen = json.screen;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.selected1 != "undefined") selected1 = json.selected1;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
  };

  function _unserializePublic(json) { return _model.unserializePublic(json); }

  _model._userUnserializePublic = function(json) {
    _model._readParametersPublic(json);
   _resetSolvers();
   _model.update();
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model._userUnserialize = function(json) {
    _model._readParameters(json);
   _resetSolvers();
   _model.update();
  };

  _model.addToReset(function() {
    __pagesEnabled["modebylookang"] = true;
    __pagesEnabled["_view.drawingPanel3D.setCamLocX(0.5);"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["FixRel Page"] = true;
    __pagesEnabled["maxview"] = true;
  });

  _model.addToReset(function() {
    lineWidthBugFix = 0.01; // EjsS Model.Variables.Var Table.lineWidthBugFix
    print = false; // EjsS Model.Variables.Var Table.print
    fontb = "normal bold 1.2vw "; // EjsS Model.Variables.Var Table.fontb
    font = "normal normal 1vw "; // EjsS Model.Variables.Var Table.font
    mode = 1; // EjsS Model.Variables.Var Table.mode
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.Var Table.iOS
    iPad = /iPad/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.Var Table.iPad
    iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.Var Table.iPhone
    angle = 0.25; // EjsS Model.Variables.Var Table.angle
    anglez = 0; // EjsS Model.Variables.Var Table.anglez
    faction = 1/10000000; // EjsS Model.Variables.Var Table.faction
    R = 4.23; // EjsS Model.Variables.Var Table.R
    x = R*Math.cos(angle); // EjsS Model.Variables.Var Table.x
    y = R*Math.sin(angle); // EjsS Model.Variables.Var Table.y
    z = R*Math.sin(anglez); // EjsS Model.Variables.Var Table.z
    xs = x; // EjsS Model.Variables.Var Table.xs
    ys = y; // EjsS Model.Variables.Var Table.ys
    zs = z; // EjsS Model.Variables.Var Table.zs
    rotation = 0; // EjsS Model.Variables.Var Table.rotation
    scale = 5; // EjsS Model.Variables.Var Table.scale
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.1; // EjsS Model.Variables.Var Table.dt
    omega = 0; // EjsS Model.Variables.Var Table.omega
    spinomega = 0; // EjsS Model.Variables.Var Table.spinomega
    angleincrease = 2*Math.PI/24*dt; // EjsS Model.Variables.Var Table.angleincrease
    anglezincrease = 0; // EjsS Model.Variables.Var Table.anglezincrease
    geostationary = false; // EjsS Model.Variables.Var Table.geostationary
    EquatorPlane = true; // EjsS Model.Variables.Var Table.EquatorPlane
    forces = false; // EjsS Model.Variables.Var Table.forces
    earth = true; // EjsS Model.Variables.Var Table.earth
    moon = true; // EjsS Model.Variables.Var Table.moon
  });

  _model.addToReset(function() {
    xgeo = x; // EjsS Model.Variables.geostationary.xgeo
    ygeo = y; // EjsS Model.Variables.geostationary.ygeo
    zgeo = z; // EjsS Model.Variables.geostationary.zgeo
    anglegeo = angle; // EjsS Model.Variables.geostationary.anglegeo
    anglezgeo = 0; // EjsS Model.Variables.geostationary.anglezgeo
    anglegeoincrease = 2*Math.PI/24*dt; // EjsS Model.Variables.geostationary.anglegeoincrease
    vectorx = 0; // EjsS Model.Variables.geostationary.vectorx
    vectory = 0; // EjsS Model.Variables.geostationary.vectory
    vectorz = 2; // EjsS Model.Variables.geostationary.vectorz
    axisx = 0; // EjsS Model.Variables.geostationary.axisx
    axisy = 0; // EjsS Model.Variables.geostationary.axisy
    axisz = 0; // EjsS Model.Variables.geostationary.axisz
    screen = 10.0; // EjsS Model.Variables.geostationary.screen
  });

  _model.addToReset(function() {
    selected = new Array(1); // EjsS Model.Variables.lookang.selected
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.lookang.selected
        selected[_i0] = "Geostationary near Singapore";  // EjsS Model.Variables.lookang.selected
      }
    }());
    selected1 = new Array(1); // EjsS Model.Variables.lookang.selected1
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.lookang.selected1
        selected1[_i0] = "Geostationary near Singapore";  // EjsS Model.Variables.lookang.selected1
      }
    }());
    Width = "100%"; // EjsS Model.Variables.lookang.Width
    Height = "100%"; // EjsS Model.Variables.lookang.Height
    Width1 = "100%"; // EjsS Model.Variables.lookang.Width1
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  // code to be copied to EJSS source code under Custom and used in drawingPanel3D and plottingPanel2D  // > CustomCode.Lib Page:1
  // address the problem is height difference is iOS app , epub, and Firefox  // > CustomCode.Lib Page:2
  // user need to change only k and kepub  // > CustomCode.Lib Page:3
  // copy %changeOrientation()% into the Height Field of drawingPanel3D and plottingPanel2D  // > CustomCode.Lib Page:4
  function changeOrientation() {  // > CustomCode.Lib Page:5
     // > CustomCode.Lib Page:6
  var k =1 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.Lib Page:7
  var kapple =0.95 // control apple app height  // > CustomCode.Lib Page:8
  var kepub =0.95 ;  // > CustomCode.Lib Page:9
  // check platform for Apps  // > CustomCode.Lib Page:10
  try { // allow code to run in Student Learning Space   // > CustomCode.Lib Page:11
    var iOSapp =  (typeof parent.device != 'undefined' && parent.device.platform == "iOS");  // > CustomCode.Lib Page:12
    var Androidapp = (typeof parent.device != 'undefined' && parent.device.platform == "Android");  // > CustomCode.Lib Page:13
  } catch(e) {  // > CustomCode.Lib Page:14
    var iOSapp = false;  // > CustomCode.Lib Page:15
    var Androidapp = false;  // > CustomCode.Lib Page:16
  }  // > CustomCode.Lib Page:17
  // check platform for web browsers  // > CustomCode.Lib Page:18
  var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.Lib Page:19
  var iPad =/iPad/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.Lib Page:20
  var iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.Lib Page:21
  var Android= /Android|android/i.test(navigator.userAgent);  // > CustomCode.Lib Page:22
  //navigator  // > CustomCode.Lib Page:23
  var Firefox = navigator.userAgent.indexOf("Firefox") != -1;  // > CustomCode.Lib Page:24
     // > CustomCode.Lib Page:25
  switch (window.orientation) { // using window.orientation as deciding factor  // > CustomCode.Lib Page:26
    case 0:  // > CustomCode.Lib Page:27
    case 180:  // > CustomCode.Lib Page:28
      this.screenOrientation = 'portrait';  // > CustomCode.Lib Page:29
      if (iOSapp){ // does not seems to work  // > CustomCode.Lib Page:30
          // > CustomCode.Lib Page:31
        return window.screen.height*kapple;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.Lib Page:32
        // > CustomCode.Lib Page:33
      }  // > CustomCode.Lib Page:34
      else if (_isEPub){ // does not seems to work  // > CustomCode.Lib Page:35
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.Lib Page:36
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.Lib Page:37
        // return window.screen.height;  // > CustomCode.Lib Page:38
        //  return window.innerHeight;  // > CustomCode.Lib Page:39
        // return document.documentElement.clientHeight;  // > CustomCode.Lib Page:40
      }  // > CustomCode.Lib Page:41
       // > CustomCode.Lib Page:42
      else {  // > CustomCode.Lib Page:43
         // > CustomCode.Lib Page:44
        return 100*k+"vh";  // > CustomCode.Lib Page:45
      }  // > CustomCode.Lib Page:46
      break;  // > CustomCode.Lib Page:47
    case 90:  // > CustomCode.Lib Page:48
    case -90:  // > CustomCode.Lib Page:49
      this.screenOrientation = 'landscape';  // > CustomCode.Lib Page:50
     // > CustomCode.Lib Page:51
      if (iOSapp){ // App  // > CustomCode.Lib Page:52
        return window.screen.width*kapple;    // > CustomCode.Lib Page:53
        // return window.screen.height;  // > CustomCode.Lib Page:54
        //  return window.innerHeight;  // > CustomCode.Lib Page:55
        //  return document.documentElement.clientHeight;  // > CustomCode.Lib Page:56
      }  // > CustomCode.Lib Page:57
      else if (_isEPub){ // does not seems to work  // > CustomCode.Lib Page:58
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.Lib Page:59
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.Lib Page:60
        // return window.screen.height;  // > CustomCode.Lib Page:61
        //  return window.innerHeight;  // > CustomCode.Lib Page:62
        // return document.documentElement.clientHeight;  // > CustomCode.Lib Page:63
      }  // > CustomCode.Lib Page:64
       // > CustomCode.Lib Page:65
      else {  // > CustomCode.Lib Page:66
        return 100*k+"vh";  // > CustomCode.Lib Page:67
        }  // > CustomCode.Lib Page:68
      break;  // > CustomCode.Lib Page:69
    default:  // > CustomCode.Lib Page:70
      this.screenOrientation = 'unknown';  // > CustomCode.Lib Page:71
      //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.Lib Page:72
       if (Firefox){  // > CustomCode.Lib Page:73
        return window.innerHeight*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.Lib Page:74
        }  // > CustomCode.Lib Page:75
          // > CustomCode.Lib Page:76
        else {  // > CustomCode.Lib Page:77
          return 100*k+"vh"; // string every other solid deployment, Android Android App web chrome etc works in EJSS6.0beta  // > CustomCode.Lib Page:78
          //  works in EjsS_5.3_180131  // > CustomCode.Lib Page:79
          //window.innerHeight*k;  // > CustomCode.Lib Page:80
  }  // > CustomCode.Lib Page:81
  }  // > CustomCode.Lib Page:82
     // > CustomCode.Lib Page:83
  }  // > CustomCode.Lib Page:84

  _model.addToInitialization(function() {
    if (!__pagesEnabled["modebylookang"]) return;
    angleincrease = 2*Math.PI/24*dt; // incase no selection  // > Initialization.modebylookang:1
    z = 0;  // > Initialization.modebylookang:2
    t = 0;  // > Initialization.modebylookang:3
    geostationary =false;  // > Initialization.modebylookang:4
    if (_view.comboBox.getProperty("SelectedOptions")==undefined){ // does not work  // > Initialization.modebylookang:5
      _view.comboBox.setProperty("SelectedOptions")="Geostationary near Singapore";  // > Initialization.modebylookang:6
    buttonmode1= true;  // > Initialization.modebylookang:7
    buttonmode2= false;  // > Initialization.modebylookang:8
    buttonmode3= false;  // > Initialization.modebylookang:9
    buttonmode4= false;  // > Initialization.modebylookang:10
    buttonmode5= false;  // > Initialization.modebylookang:11
    buttonmode51= false;  // > Initialization.modebylookang:12
    buttonmode52= false;  // > Initialization.modebylookang:13
    buttonmode53= false;  // > Initialization.modebylookang:14
    buttonmode6= false;  // > Initialization.modebylookang:15
    buttonmode61= false;  // > Initialization.modebylookang:16
    buttonmode7= false;  // > Initialization.modebylookang:17
    picturemode= 0;  // > Initialization.modebylookang:18
    angle = 0.25+rotation;  // > Initialization.modebylookang:19
    geostationary =true;  // > Initialization.modebylookang:20
    angleincrease = 2*Math.PI/24*dt;  // > Initialization.modebylookang:21
    anglez=0;  // > Initialization.modebylookang:22
    anglezincrease = 0;  // > Initialization.modebylookang:23
    R = 4.23;  // > Initialization.modebylookang:24
    vectorx = 0; // for the axes of satelite  // > Initialization.modebylookang:25
    vectory =0;  // > Initialization.modebylookang:26
    vectorz =2;  // > Initialization.modebylookang:27
    axisz = 0;  // > Initialization.modebylookang:28
      }  // > Initialization.modebylookang:29
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["_view.drawingPanel3D.setCamLocX(0.5);"]) return;
    _view.drawingPanel3D.setCamLocX(8);  // > Initialization._view.drawingPanel3D.setCamLocX(0.5);:1
    //_view.drawingPanel3D.setZoomimits([4,20]);  // > Initialization._view.drawingPanel3D.setCamLocX(0.5);:2
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    t = t+dt; // model time increase by dt  // > Evolution.Evol Page:1
    angle += angleincrease; // model x and y motion  // > Evolution.Evol Page:2
    anglez += anglezincrease; // model z motion  // > Evolution.Evol Page:3
    rotation += 2*Math.PI/24*dt; // model earth spinning   // > Evolution.Evol Page:4
    anglegeo += anglegeoincrease; // model a separate red ball in geostationary orbit.  // > Evolution.Evol Page:5
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
    if (_view.comboBox.getProperty("SelectedOptions")=="Non-Geostationary generally"){  // > FixedRelations.FixRel Page:1
    x = R*Math.cos(angle); // to overcome a strange orbit when mode 6 is selected  // > FixedRelations.FixRel Page:2
    y = R*Math.sin(angle);  // > FixedRelations.FixRel Page:3
    z = R*Math.sin(anglez); // lookang for other orbits  // > FixedRelations.FixRel Page:4
      }  // > FixedRelations.FixRel Page:5
      else {  // > FixedRelations.FixRel Page:6
    x = R*(Math.cos(angle)*Math.cos(anglez));  // > FixedRelations.FixRel Page:7
    y = R*(Math.sin(angle)*Math.cos(anglez));  // > FixedRelations.FixRel Page:8
    z = R*Math.sin(anglez); // lookang for other orbits  // > FixedRelations.FixRel Page:9
    }  // > FixedRelations.FixRel Page:10
    xgeo = 4.23*Math.cos(anglegeo);  // > FixedRelations.FixRel Page:11
    ygeo = 4.23*Math.sin(anglegeo);  // > FixedRelations.FixRel Page:12
    zgeo = 4.23*Math.sin(anglezgeo); // lookang for // for the permanent geostationary  // > FixedRelations.FixRel Page:13
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["maxview"]) return;
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "HtmlView Page", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new gravity10_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'fullscreen'
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.controlPanel.linkProperty("Display",  function() { return !print?"inline-flex":"none"; } ); // HtmlView Page linking property 'Display' for element 'controlPanel'
          _view.comboBox.linkProperty("Options",  function() { return ["Geostationary near Singapore","Geostationary near Africa","Geostationary near America","Non-geostationary due to direction","Non-geostationary at R=Re","Non-geostationary at R=2*Re","Non-geostationary circular R=3*Re","Non-geostationary circular R=10.5*Re","Non-Geostationary generally","Polar Orbits at R=1.133Re","Polar Orbits with T=24hrs","Unlikely Orbits","","Equator Plane show","Equator Plane off","Geostationary show","Geostationary off","Earth axis show","Earth axis off","Satellite axis show","Satellite axis off","Satellite show","Satellite off","Free Body show","Free Body off","","Front View","Top View","","print"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  //var option = _view.comboBox.getProperty("SelectedOptions");
  //alert(option);
  _view.moontrail.clear();
  var opts = _view.comboBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if(option=="Geostationary near Singapore")
  {
  buttonmode1= true;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
  picturemode= 0;
  angle = 0.25+rotation;
  geostationary =true;
  angleincrease = 2*Math.PI/24*dt;
  anglez=0;
  anglezincrease = 0;
  R = 4.23;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2;
  axisz = 0;
  }
  //printing starts today
  else if (option == "print"){
    print = true;
    }
  //printing ends early
  else if(option=="Geostationary near Africa")
  {
  buttonmode1= false;
  buttonmode2= true;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
  picturemode= 1;
  angle = 5.2+rotation;
  geostationary =true;
  angleincrease = 2*Math.PI/24*dt;
  anglez=0;
  anglezincrease = 0;
  R = 4.23;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2;
  axisz = 0;
  }
  else if(option=="Geostationary near America")
  {
  buttonmode1= false;
  buttonmode2= false;
  buttonmode3= true;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
  picturemode= 2;
  angle = 3.6+rotation;
  geostationary =true;
  angleincrease = 2*Math.PI/24*dt;
  anglez=0;
  anglezincrease = 0;
  R = 4.23;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2;
  axisz = 0;
  }
  else if(option=="Non-geostationary due to direction")
  {
   buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= true;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
  picturemode= 3;
  angleincrease = -2*Math.PI/24*dt;
  anglezincrease = 0; 
  anglez=0;
  R = 4.23;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =-2;
  axisz = 0;
  }
  else if(option=="Non-geostationary at R=Re")
  {
    buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= true;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
    picturemode= 3;
  angleincrease = 2*Math.PI/(1.39)*dt; // 1.39 is derived from different simulation http://www.phy.ntnu.edu.tw/ntnujava/index.php?topic=2204.0
  anglezincrease = 0; 
  anglez=0;
  R = 0.637;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2*1.5;
  axisz = 0;
  }
  else if(option=="Non-geostationary at R=2*Re")
  {
    buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= true;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
    picturemode= 3;
  angleincrease = 2*Math.PI/(3.98)*dt; // 3.98 is derived from different simulation http://www.phy.ntnu.edu.tw/ntnujava/index.php?topic=2204.0
  anglezincrease = 0; 
  anglez=0;
  R = 2*0.637;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2*1.5;
  axisz = 0;
  }
  else if(option=="Non-geostationary circular R=3*Re")
  {
    buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= true;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
    picturemode= 3;
  angleincrease = 2*Math.PI/(7.30)*dt; // 7.30 is derived from different simulation http://www.phy.ntnu.edu.tw/ntnujava/index.php?topic=2204.0
  anglezincrease = 0; 
  anglez=0;
  R = 3*0.637;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2*1.5;
  axisz = 0;
  }
  else if(option=="Non-geostationary circular R=10.5*Re")
  {
    buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= true;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= false;
    picturemode= 3;
  angleincrease = 2*Math.PI/(48.0)*dt; // 7.30 is derived from different simulation http://www.phy.ntnu.edu.tw/ntnujava/index.php?topic=2204.0
  anglezincrease = 0; 
  anglez=0;
  R = 10.5*0.637;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2*1.5;
  axisz = 0;
  }
  else if(option=="Non-Geostationary generally")
  {
    buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= true;
  buttonmode61= false;
  buttonmode7= false;
   picturemode= 3;
  anglezincrease = -2*Math.PI/24*dt;
  angleincrease = -2*Math.PI/24*dt;
  R = 4.23;
  vectorx = 0;// for the axes of satelite hard codes not calculated
  vectory =1*2;
  vectorz =-1*2; // to create illusion of 90 deg choose y =1, z =-1 equal length
  axisz = -1;
  }
    else if(option=="Polar Orbits with T=24hrs")
  {
     buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= true;
  buttonmode7= false;
    picturemode= 3;
  angleincrease = 0;
  anglezincrease = 2*Math.PI/24*dt;
  anglez=0;
  R = 4.23;
  vectorx = 2*Math.sin(0.25); // for the axes of satelite
  vectory =-2*Math.cos(0.25);
  vectorz =0;
  axisx = 0;
  axisy = 0;
  axisz = 0;
    }
    
    else if(option=="Polar Orbits at R=1.133Re")
  {
    
  angleincrease = 0;
  anglezincrease = 2*Math.PI/24*12*dt; // multiply by another 12 for T =2 hours
  anglez=0;
  R = 0.722;
  vectorx = 2*Math.sin(0.25); // for the axes of satelite
  vectory =-2*Math.cos(0.25);
  vectorz =0;
  axisx = 0;
  axisy = 0;
  axisz = 0;
    }
  else if(option=="Unlikely Orbits")
  {
     buttonmode1= false;
  buttonmode2= false;
  buttonmode3= false;
  buttonmode4= false;
  buttonmode5= false;
  buttonmode51= false;
  buttonmode52= false;
  buttonmode53= false;
  buttonmode6= false;
  buttonmode61= false;
  buttonmode7= true;
    picturemode= 3;
  z = 2;
  angleincrease = 2*Math.PI/24*dt;
  anglezincrease = 0;
  anglez=0.5;
  R = 4.23;
  vectorx = 0; // for the axes of satelite
  vectory =0;
  vectorz =2;
  axisx = 0;
  axisy = 0;
  axisz = 2;
    }
    
    else if ( option=="Equator Plane show"){
  EquatorPlane=true;
    }
     else if ( option=="Equator Plane off"){
  EquatorPlane=false;
    }
    else if ( option=="Geostationary show"){
  geostationaryearth=true;
    }
     else if ( option=="Geostationary off"){
  geostationaryearth=false;
    }
     else if ( option=="Earth axis show"){
  axesearth=true;
  geostationaryearth=true;
    }
     else if ( option=="Earth axis off"){
  axesearth=false;
  geostationaryearth=false;
    }
  else if ( option=="Satellite axis show"){
  axesplanet=true;
    }
     else if ( option=="Satellite axis off"){
  axesplanet=false;
    }
  else if ( option=="Satellite show"){
  moon=true;
    }
     else if ( option=="Satellite off"){
  moon=false;
    }
  else if ( option=="Free Body show"){
  forces=true;
    }
     else if ( option=="Free Body off"){
  forces=false;
    }
    
    //"PERSPECTIVE_OFF"
  else if ( option=="Isometric"){
  _view.drawingPanel3D.setProperty("Projection","PERSPECTIVE_OFF");
  _view.drawingPanel3D.setCamLocX(0.5);
  }
  //"PERSPECTIVE_ON"
  else if ( option=="Real 3D"){
  _view.drawingPanel3D.setProperty("Projection","PERSPECTIVE_ON");
  _view.drawingPanel3D.setCamLocX(8);
  }
  else if ( option=="Front View"){
  //_view.drawingPanel3D.setProperty("Projection","PLANAR_XY");
  _view.drawingPanel3D.setCamLocX(8);
  _view.drawingPanel3D.setCamLocY(0);
  _view.drawingPanel3D.setCamLocZ(0);
  _view.drawingPanel3D.setCamTilt(0); //-90
  _view.drawingPanel3D.setCamAltitude(0);
  _view.drawingPanel3D.setCamAzimuth(0);
  // new method
  //rotationangle=0; //release the rotationangle compensated by _view.drawingPanel3D.setCamTilt(0); //-90
  //_view.drawingPanel3D.setCamTilt(-90);
  }
  else if ( option=="Side View"){
  //_view.drawingPanel3D.setProperty("Projection","PERSPECTIVE_OFF");
  _view.drawingPanel3D.setCamLocX(8);
  _view.drawingPanel3D.setCamLocY(0);
  _view.drawingPanel3D.setCamLocZ(0);
  _view.drawingPanel3D.setCamTilt(0);
  _view.drawingPanel3D.setCamAltitude(0);
  _view.drawingPanel3D.setCamAzimuth(90);
  //rotationangle=0; //release the rotationangle
  }
  else if ( option=="Top View"){
  //_view.drawingPanel3D.setProperty("Projection","PERSPECTIVE_OFF");
  //_view.drawingPanel3D.setProperty("Projection","PERSPECTIVE_OFF");
  _view.drawingPanel3D.setCamLocX(12);
  //_view.drawingPanel3D.setCamLocY(0);
  //_view.drawingPanel3D.setCamLocZ(0);
  _view.drawingPanel3D.setCamTilt(0);
  _view.drawingPanel3D.setCamAltitude(90);
  _view.drawingPanel3D.setCamAzimuth(0);
  //rotationangle=0; //release the rotationangle
  }
  //"PLANAR_XY","PLANAR_XZ","PLANAR_YZ"
  else if ( option=="PLANAR_XY"){
  _view.drawingPanel3D.setProperty("Projection","PERSPECTIVE_OFF");
  //_view.drawingPanel3D.serProperty("CameraY","5");
  //_view._reset();
  }
  else if ( option=="PLANAR_XZ"){
  _view.drawingPanel3D.setProperty("Projection","PLANAR_XZ");
  //_view._reset();
  }
  else if ( option=="PLANAR_YZ"){
  _view.drawingPanel3D.setProperty("Projection","PLANAR_YZ");
  //_view._reset();
  }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.EquatorPlane.linkProperty("Checked",  function() { return EquatorPlane; }, function(_v) { EquatorPlane = _v; } ); // HtmlView Page linking property 'Checked' for element 'EquatorPlane'
          _view.EquatorPlane.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'EquatorPlane'
          _view.geostationaryearth.linkProperty("Checked",  function() { return geostationaryearth; }, function(_v) { geostationaryearth = _v; } ); // HtmlView Page linking property 'Checked' for element 'geostationaryearth'
          _view.geostationaryearth.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'geostationaryearth'
          _view.axesearth.linkProperty("Checked",  function() { return axesearth; }, function(_v) { axesearth = _v; } ); // HtmlView Page linking property 'Checked' for element 'axesearth'
          _view.axesearth.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'axesearth'
          _view.axesplanet.linkProperty("Checked",  function() { return axesplanet; }, function(_v) { axesplanet = _v; } ); // HtmlView Page linking property 'Checked' for element 'axesplanet'
          _view.axesplanet.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'axesplanet'
          _view.playPauseButton.setAction("OffClick", _pause); // HtmlView Page setting action 'OffClick' for element 'playPauseButton'
          _view.playPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton'
          _view.playPauseButton.setAction("OnClick", _play); // HtmlView Page setting action 'OnClick' for element 'playPauseButton'
          _view.playPauseButton.linkProperty("Font",  function() { return fontb; }, function(_v) { fontb = _v; } ); // HtmlView Page linking property 'Font' for element 'playPauseButton'
          _view.step.setAction("OnClick", _step); // HtmlView Page setting action 'OnClick' for element 'step'
          _view.step.linkProperty("Font",  function() { return fontb; }, function(_v) { fontb = _v; } ); // HtmlView Page linking property 'Font' for element 'step'
          _view.init.setAction("OnClick", function(_data,_info) {
  _view.moontrail.newSegment();
  t =0;
  _initialize();

}); // HtmlView Page setting action 'OnClick' for element 'init'
          _view.init.linkProperty("Font",  function() { return fontb; }, function(_v) { fontb = _v; } ); // HtmlView Page linking property 'Font' for element 'init'
          _view.resetButton.setAction("OnClick", _reset); // HtmlView Page setting action 'OnClick' for element 'resetButton'
          _view.resetButton.linkProperty("Font",  function() { return fontb; }, function(_v) { fontb = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton'
          _view.time.linkProperty("Visibility",  function() { return !print; } ); // HtmlView Page linking property 'Visibility' for element 'time'
          _view.timeLabel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'timeLabel'
          _view.timeField.linkProperty("Value",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'Value' for element 'timeField'
          _view.timeField.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'timeField'
          _view.messagesLabel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'messagesLabel'
          _view.drawingPanel3D.setAction("OnDoubleClick", function(_data,_info) {
  if (_model.isPlaying())_pause();
  else if (_model.isPaused())_play();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("MaximumY",  function() { return scale; }, function(_v) { scale = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("MaximumX",  function() { return scale; }, function(_v) { scale = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("MinimumX",  function() { return -scale; } ); // HtmlView Page linking property 'MinimumX' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("MinimumY",  function() { return -scale; } ); // HtmlView Page linking property 'MinimumY' for element 'drawingPanel3D'
          _view.drawingPanel3D.setAction("OnZoom", function(_data,_info) {
  _view.drawingPanel3D.setCamLocX(Math.min(40,_view.drawingPanel3D.getCamLocX()));
  _view.drawingPanel3D.setCamLocX(Math.max(2,_view.drawingPanel3D.getCamLocX()));
  //_view.drawingPanel3D.setProperty("MinimumX",Math.max(_view.plottingPanel.getProperty("MinimumX"),-80));
  //_view.plottingPanel.setProperty("MaximumX",Math.min(_view.plottingPanel.getProperty("MaximumX"),80));

}); // HtmlView Page setting action 'OnZoom' for element 'drawingPanel3D'
          _view.geostationary.linkProperty("X",  function() { return xgeo; }, function(_v) { xgeo = _v; } ); // HtmlView Page linking property 'X' for element 'geostationary'
          _view.geostationary.linkProperty("Y",  function() { return ygeo; }, function(_v) { ygeo = _v; } ); // HtmlView Page linking property 'Y' for element 'geostationary'
          _view.geostationary.linkProperty("Z",  function() { return zgeo; }, function(_v) { zgeo = _v; } ); // HtmlView Page linking property 'Z' for element 'geostationary'
          _view.geostationary.linkProperty("Visibility",  function() { return geostationaryearth; }, function(_v) { geostationaryearth = _v; } ); // HtmlView Page linking property 'Visibility' for element 'geostationary'
          _view.geo.linkProperty("InputZ",  function() { return zgeo; }, function(_v) { zgeo = _v; } ); // HtmlView Page linking property 'InputZ' for element 'geo'
          _view.geo.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'geo'
          _view.geo.linkProperty("InputX",  function() { return xgeo; }, function(_v) { xgeo = _v; } ); // HtmlView Page linking property 'InputX' for element 'geo'
          _view.geo.linkProperty("Visibility",  function() { return geostationaryearth; }, function(_v) { geostationaryearth = _v; } ); // HtmlView Page linking property 'Visibility' for element 'geo'
          _view.geo.linkProperty("InputY",  function() { return ygeo; }, function(_v) { ygeo = _v; } ); // HtmlView Page linking property 'InputY' for element 'geo'
          _view.geo.linkProperty("LineWidth",  function() { return lineWidthBugFix; }, function(_v) { lineWidthBugFix = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'geo'
          _view.spaceSphere.linkProperty("Radius",  function() { return _view.drawingPanel3D.getCamLocX(); } ); // HtmlView Page linking property 'Radius' for element 'spaceSphere'
          _view.earth.linkProperty("Transformation",  function() { return [[rotation,0,0,1]]; } ); // HtmlView Page linking property 'Transformation' for element 'earth'
          _view.earthforcefreebody.linkProperty("Transformation",  function() { return [[rotation,0,0,1]]; } ); // HtmlView Page linking property 'Transformation' for element 'earthforcefreebody'
          _view.earthforcefreebody.linkProperty("Visibility",  function() { return forces; }, function(_v) { forces = _v; } ); // HtmlView Page linking property 'Visibility' for element 'earthforcefreebody'
          _view.moon.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'moon'
          _view.moon.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'moon'
          _view.moon.linkProperty("Z",  function() { return z; }, function(_v) { z = _v; } ); // HtmlView Page linking property 'Z' for element 'moon'
          _view.moon.linkProperty("Visibility",  function() { return moon; }, function(_v) { moon = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moon'
          _view.moontrail.linkProperty("InputZ",  function() { return z; }, function(_v) { z = _v; } ); // HtmlView Page linking property 'InputZ' for element 'moontrail'
          _view.moontrail.linkProperty("Connected",  function() { return t>0||_isPlaying; } ); // HtmlView Page linking property 'Connected' for element 'moontrail'
          _view.moontrail.linkProperty("InputX",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'InputX' for element 'moontrail'
          _view.moontrail.linkProperty("Visibility",  function() { return moon; }, function(_v) { moon = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moontrail'
          _view.moontrail.linkProperty("InputY",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'InputY' for element 'moontrail'
          _view.moontrail.linkProperty("LineWidth",  function() { return lineWidthBugFix; }, function(_v) { lineWidthBugFix = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'moontrail'
          _view.pathonearth.linkProperty("InputZ",  function() { return z/R*0.64; } ); // HtmlView Page linking property 'InputZ' for element 'pathonearth'
          _view.pathonearth.linkProperty("InputX",  function() { return x/R*0.64; } ); // HtmlView Page linking property 'InputX' for element 'pathonearth'
          _view.pathonearth.linkProperty("InputY",  function() { return y/R*0.64; } ); // HtmlView Page linking property 'InputY' for element 'pathonearth'
          _view.pathonearth.linkProperty("LineWidth",  function() { return lineWidthBugFix; }, function(_v) { lineWidthBugFix = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'pathonearth'
          _view.cylinder3D.linkProperty("Transformation",  function() { return [[0,1,0,0]]; } ); // HtmlView Page linking property 'Transformation' for element 'cylinder3D'
          _view.cylinder3D.linkProperty("Visibility",  function() { return EquatorPlane; }, function(_v) { EquatorPlane = _v; } ); // HtmlView Page linking property 'Visibility' for element 'cylinder3D'
          _view.axissat.linkProperty("SizeX",  function() { return vectorx; }, function(_v) { vectorx = _v; } ); // HtmlView Page linking property 'SizeX' for element 'axissat'
          _view.axissat.linkProperty("X",  function() { return axisx; }, function(_v) { axisx = _v; } ); // HtmlView Page linking property 'X' for element 'axissat'
          _view.axissat.linkProperty("Y",  function() { return axisy; }, function(_v) { axisy = _v; } ); // HtmlView Page linking property 'Y' for element 'axissat'
          _view.axissat.linkProperty("Z",  function() { return axisz-vectorz/2; } ); // HtmlView Page linking property 'Z' for element 'axissat'
          _view.axissat.linkProperty("SizeZ",  function() { return vectorz; }, function(_v) { vectorz = _v; } ); // HtmlView Page linking property 'SizeZ' for element 'axissat'
          _view.axissat.linkProperty("Visibility",  function() { return axesplanet; }, function(_v) { axesplanet = _v; } ); // HtmlView Page linking property 'Visibility' for element 'axissat'
          _view.axissat.linkProperty("SizeY",  function() { return vectory; }, function(_v) { vectory = _v; } ); // HtmlView Page linking property 'SizeY' for element 'axissat'
          _view.axisearth2.linkProperty("Visibility",  function() { return axesearth; }, function(_v) { axesearth = _v; } ); // HtmlView Page linking property 'Visibility' for element 'axisearth2'
          _view.linemoon.linkProperty("SizeX",  function() { return -x; } ); // HtmlView Page linking property 'SizeX' for element 'linemoon'
          _view.linemoon.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'linemoon'
          _view.linemoon.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'linemoon'
          _view.linemoon.linkProperty("Z",  function() { return z; }, function(_v) { z = _v; } ); // HtmlView Page linking property 'Z' for element 'linemoon'
          _view.linemoon.linkProperty("SizeZ",  function() { return -z; } ); // HtmlView Page linking property 'SizeZ' for element 'linemoon'
          _view.linemoon.linkProperty("Visibility",  function() { return moon; }, function(_v) { moon = _v; } ); // HtmlView Page linking property 'Visibility' for element 'linemoon'
          _view.linemoon.linkProperty("SizeY",  function() { return -y; } ); // HtmlView Page linking property 'SizeY' for element 'linemoon'
          _view.linegeo.linkProperty("SizeX",  function() { return -xgeo; } ); // HtmlView Page linking property 'SizeX' for element 'linegeo'
          _view.linegeo.linkProperty("X",  function() { return xgeo; }, function(_v) { xgeo = _v; } ); // HtmlView Page linking property 'X' for element 'linegeo'
          _view.linegeo.linkProperty("Y",  function() { return ygeo; }, function(_v) { ygeo = _v; } ); // HtmlView Page linking property 'Y' for element 'linegeo'
          _view.linegeo.linkProperty("Z",  function() { return zgeo; }, function(_v) { zgeo = _v; } ); // HtmlView Page linking property 'Z' for element 'linegeo'
          _view.linegeo.linkProperty("SizeZ",  function() { return -zgeo; } ); // HtmlView Page linking property 'SizeZ' for element 'linegeo'
          _view.linegeo.linkProperty("Visibility",  function() { return geostationaryearth; }, function(_v) { geostationaryearth = _v; } ); // HtmlView Page linking property 'Visibility' for element 'linegeo'
          _view.linegeo.linkProperty("SizeY",  function() { return -ygeo; } ); // HtmlView Page linking property 'SizeY' for element 'linegeo'
          _view.forces22.linkProperty("SizeX",  function() { return -x/3; } ); // HtmlView Page linking property 'SizeX' for element 'forces22'
          _view.forces22.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'forces22'
          _view.forces22.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'forces22'
          _view.forces22.linkProperty("Z",  function() { return z; }, function(_v) { z = _v; } ); // HtmlView Page linking property 'Z' for element 'forces22'
          _view.forces22.linkProperty("SizeZ",  function() { return -z/3; } ); // HtmlView Page linking property 'SizeZ' for element 'forces22'
          _view.forces22.linkProperty("Visibility",  function() { return forces; }, function(_v) { forces = _v; } ); // HtmlView Page linking property 'Visibility' for element 'forces22'
          _view.forces22.linkProperty("SizeY",  function() { return -y/3; } ); // HtmlView Page linking property 'SizeY' for element 'forces22'
          _view.forces2.linkProperty("SizeX",  function() { return x/3; } ); // HtmlView Page linking property 'SizeX' for element 'forces2'
          _view.forces2.linkProperty("SizeZ",  function() { return z/3; } ); // HtmlView Page linking property 'SizeZ' for element 'forces2'
          _view.forces2.linkProperty("Visibility",  function() { return forces; }, function(_v) { forces = _v; } ); // HtmlView Page linking property 'Visibility' for element 'forces2'
          _view.forces2.linkProperty("SizeY",  function() { return y/3; } ); // HtmlView Page linking property 'SizeY' for element 'forces2'
          _view.field42.linkProperty("Value",  function() { return _view.drawingPanel3D.getProperty("CameraX"); } ); // HtmlView Page linking property 'Value' for element 'field42'
          _view.field42.setAction("OnChange", function(_data,_info) {
  _view.drawingPanel3D.setCamLocX(_view.field42.getValue());

}); // HtmlView Page setting action 'OnChange' for element 'field42'
          _view.field43.linkProperty("Value",  function() { return _view.drawingPanel3D.getProperty("CameraY"); } ); // HtmlView Page linking property 'Value' for element 'field43'
          _view.field43.setAction("OnChange", function(_data,_info) {
  _view.drawingPanel3D.setCamLocY(_view.field43.getValue());

}); // HtmlView Page setting action 'OnChange' for element 'field43'
          _view.field4.linkProperty("Value",  function() { return _view.drawingPanel3D.getProperty("CameraZ"); } ); // HtmlView Page linking property 'Value' for element 'field4'
          _view.field4.setAction("OnChange", function(_data,_info) {
  _view.drawingPanel3D.setCamLocZ(_view.field4.getValue());

}); // HtmlView Page setting action 'OnChange' for element 'field4'
          _view.field432.linkProperty("Value",  function() { return _view.drawingPanel3D.getProperty("CameraTilt"); } ); // HtmlView Page linking property 'Value' for element 'field432'
          _view.field432.setAction("OnChange", function(_data,_info) {
  _view.drawingPanel3D.setCamTilt(_view.field432.getValue());

}); // HtmlView Page setting action 'OnChange' for element 'field432'
          _view.field422.linkProperty("Value",  function() { return _view.drawingPanel3D.getProperty("CameraAltitude"); } ); // HtmlView Page linking property 'Value' for element 'field422'
          _view.field422.setAction("OnChange", function(_data,_info) {
  _view.drawingPanel3D.setCamAltitude(_view.field422.getValue());

}); // HtmlView Page setting action 'OnChange' for element 'field422'
          _view.field44.linkProperty("Value",  function() { return _view.drawingPanel3D.getProperty("CameraAzimuth"); } ); // HtmlView Page linking property 'Value' for element 'field44'
          _view.field44.setAction("OnChange", function(_data,_info) {
  _view.drawingPanel3D.setCamAzimuth(_view.field44.getValue());

}); // HtmlView Page setting action 'OnChange' for element 'field44'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(20);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function gravity10_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = gravity10_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('7.5.2_Geostationary_Satellites','./gravity10.xhtml');

  return _view;
} // end of main function

function gravity10_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Tooltip","select user_defined and drag the mass") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"EquatorPlane", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'EquatorPlane'
      .setProperty("Tooltip","EquatorPlane") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'EquatorPlane'
      .setProperty("Text","Equator Plane") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'EquatorPlane'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"geostationaryearth", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'geostationaryearth'
      .setProperty("Background","Red") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'geostationaryearth'
      .setProperty("Tooltip","geostationaryearth") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'geostationaryearth'
      .setProperty("Text","Geostationary Earth") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'geostationaryearth'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"axesearth", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'axesearth'
      .setProperty("Background","Green") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'axesearth'
      .setProperty("Tooltip","axesearth") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'axesearth'
      .setProperty("Text","Axes Earth") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'axesearth'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"axesplanet", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'axesplanet'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'axesplanet'
      .setProperty("Tooltip","Axes Satellite") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'axesplanet'
      .setProperty("Text","Axes Satellite") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'axesplanet'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton'
      .setProperty("TextOn","Play ►") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton'
      .setProperty("TextOff","Pause ❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"step", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'step'
      .setProperty("Tooltip","Step by dt") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'step'
      .setProperty("Text","Step ❚►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'step'
      ;

    _view._addElement(EJSS_INTERFACE.button,"init", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'init'
      .setProperty("Tooltip","initialize to t=0 while retaining the traces") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'init'
      .setProperty("Text","Initialise ◀◀") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'init'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'resetButton'
      .setProperty("Text","Reset ↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"time", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'time'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"timeLabel", _view.time) // EJsS HtmlView.HtmlView Page: declaration of element 'timeLabel'
      .setProperty("Background","White") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'timeLabel'
      .setProperty("Tooltip","time") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'timeLabel'
      .setProperty("Text","Time = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'timeLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"timeField", _view.time) // EJsS HtmlView.HtmlView Page: declaration of element 'timeField'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'timeField'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'timeField'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView Page: setting property 'Editable' for element 'timeField'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"messagesLabel", _view.time) // EJsS HtmlView.HtmlView Page: declaration of element 'messagesLabel'
      .setProperty("Background","White") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'messagesLabel'
      .setProperty("Tooltip","hours") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'messagesLabel'
      .setProperty("Text"," hr ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'messagesLabel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'topPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'topPanel'
      ;

    _view._addElement(EJSS_DRAWING3D.drawingPanel,"drawingPanel3D", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'drawingPanel3D'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'drawingPanel3D'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'drawingPanel3D'
      .setProperty("CameraAltitude",15) // EJsS HtmlView.HtmlView Page: setting property 'CameraAltitude' for element 'drawingPanel3D'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'drawingPanel3D'
      .setProperty("MaximumZ",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumZ' for element 'drawingPanel3D'
      .setProperty("MinimumZ",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumZ' for element 'drawingPanel3D'
      .setProperty("DecorationType","NONE") // EJsS HtmlView.HtmlView Page: setting property 'DecorationType' for element 'drawingPanel3D'
      ;

    _view._addElement(EJSS_DRAWING3D.sphere,"geostationary", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'geostationary'
      .setProperty("Radius",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Radius' for element 'geostationary'
      .setProperty("FillColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'geostationary'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'geostationary'
      ;

    _view._addElement(EJSS_DRAWING3D.trail,"geo", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'geo'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'geo'
      ;

    _view._addElement(EJSS_DRAWING3D.sphere,"spaceSphere", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'spaceSphere'
      .setProperty("TextureUrl","./EarthAndSatelite/stars2.jpg") // EJsS HtmlView.HtmlView Page: setting property 'TextureUrl' for element 'spaceSphere'
      .setProperty("SizeX",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'spaceSphere'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'spaceSphere'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'spaceSphere'
      .setProperty("SizeZ",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeZ' for element 'spaceSphere'
      .setProperty("Z",0) // EJsS HtmlView.HtmlView Page: setting property 'Z' for element 'spaceSphere'
      .setProperty("SizeY",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'spaceSphere'
      ;

    _view._addElement(EJSS_DRAWING3D.sphere,"earth", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'earth'
      .setProperty("Radius",0.637) // EJsS HtmlView.HtmlView Page: setting property 'Radius' for element 'earth'
      .setProperty("TextureUrl","./EarthAndSatelite/2_no_clouds_2k.jpg") // EJsS HtmlView.HtmlView Page: setting property 'TextureUrl' for element 'earth'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'earth'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'earth'
      .setProperty("Z",0) // EJsS HtmlView.HtmlView Page: setting property 'Z' for element 'earth'
      ;

    _view._addElement(EJSS_DRAWING3D.sphere,"earthforcefreebody", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'earthforcefreebody'
      .setProperty("Radius",0.637) // EJsS HtmlView.HtmlView Page: setting property 'Radius' for element 'earthforcefreebody'
      .setProperty("FillColor","rgb(0,0,255)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'earthforcefreebody'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'earthforcefreebody'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'earthforcefreebody'
      .setProperty("Z",0) // EJsS HtmlView.HtmlView Page: setting property 'Z' for element 'earthforcefreebody'
      ;

    _view._addElement(EJSS_DRAWING3D.sphere,"moon", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'moon'
      .setProperty("Radius",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Radius' for element 'moon'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'moon'
      ;

    _view._addElement(EJSS_DRAWING3D.trail,"moontrail", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'moontrail'
      .setProperty("LineColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'moontrail'
      ;

    _view._addElement(EJSS_DRAWING3D.trail,"pathonearth", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'pathonearth'
      .setProperty("LineColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'pathonearth'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'pathonearth'
      ;

    _view._addElement(EJSS_DRAWING3D.cylinder,"cylinder3D", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'cylinder3D'
      .setProperty("FillColor","rgb(255,255,255)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'cylinder3D'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'cylinder3D'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'cylinder3D'
      .setProperty("LineColor","White") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'cylinder3D'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'cylinder3D'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'cylinder3D'
      .setProperty("SizeZ",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeZ' for element 'cylinder3D'
      .setProperty("Z",0) // EJsS HtmlView.HtmlView Page: setting property 'Z' for element 'cylinder3D'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'cylinder3D'
      .setProperty("DrawLines",true) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'cylinder3D'
      .setProperty("Resolution",72) // EJsS HtmlView.HtmlView Page: setting property 'Resolution' for element 'cylinder3D'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"axissat", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'axissat'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'axissat'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'axissat'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"axisearth2", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'axisearth2'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'axisearth2'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'axisearth2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'axisearth2'
      .setProperty("LineColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'axisearth2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'axisearth2'
      .setProperty("Z",-1) // EJsS HtmlView.HtmlView Page: setting property 'Z' for element 'axisearth2'
      .setProperty("SizeZ",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeZ' for element 'axisearth2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'axisearth2'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"linemoon", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'linemoon'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'linemoon'
      .setProperty("LineColor","White") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'linemoon'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"linegeo", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'linegeo'
      .setProperty("FillColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'linegeo'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'linegeo'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"forces22", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'forces22'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'forces22'
      .setProperty("LineColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'forces22'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'forces22'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"forces2", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'forces2'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'forces2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'forces2'
      .setProperty("LineColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'forces2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'forces2'
      .setProperty("Z",0) // EJsS HtmlView.HtmlView Page: setting property 'Z' for element 'forces2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'forces2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"debug", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'debug'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'debug'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"a", _view.debug) // EJsS HtmlView.HtmlView Page: declaration of element 'a'
      .setProperty("Text","CameraX=") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'a'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field42", _view.debug) // EJsS HtmlView.HtmlView Page: declaration of element 'field42'
      .setProperty("Width",30) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field42'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field42'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"a2", _view.debug) // EJsS HtmlView.HtmlView Page: declaration of element 'a2'
      .setProperty("Text","CameraY=") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'a2'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field43", _view.debug) // EJsS HtmlView.HtmlView Page: declaration of element 'field43'
      .setProperty("Width",30) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field43'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field43'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"a22", _view.debug) // EJsS HtmlView.HtmlView Page: declaration of element 'a22'
      .setProperty("Text","CameraZ=") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'a22'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field4", _view.debug) // EJsS HtmlView.HtmlView Page: declaration of element 'field4'
      .setProperty("Width",30) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field4'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field4'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"debug2", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'debug2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'debug2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"a23", _view.debug2) // EJsS HtmlView.HtmlView Page: declaration of element 'a23'
      .setProperty("Text","CameraTilt=") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'a23'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field432", _view.debug2) // EJsS HtmlView.HtmlView Page: declaration of element 'field432'
      .setProperty("Width",30) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field432'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field432'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"a3", _view.debug2) // EJsS HtmlView.HtmlView Page: declaration of element 'a3'
      .setProperty("Text","CameraAltitude") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'a3'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field422", _view.debug2) // EJsS HtmlView.HtmlView Page: declaration of element 'field422'
      .setProperty("Width",30) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field422'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field422'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"a222", _view.debug2) // EJsS HtmlView.HtmlView Page: declaration of element 'a222'
      .setProperty("Text","CameraAzimuth=") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'a222'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field44", _view.debug2) // EJsS HtmlView.HtmlView Page: declaration of element 'field44'
      .setProperty("Width",30) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field44'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field44'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new gravity10("_topFrame","_ejs_library/",null);
          if (typeof _isApp !== "undefined" && _isApp) _model.setRunAlways(true);
          TextResizeDetector.TARGET_ELEMENT_ID = '_topFrame';
          TextResizeDetector.USER_INIT_FUNC = function () {
            var iBase = TextResizeDetector.addEventListener(function(e,args) {
              _model._fontResized(args[0].iBase,args[0].iSize,args[0].iDelta);
              },null);
            _model._fontResized(iBase);
          };
          _model.onload();
        }, false);
