/* _inputParameters: an object with different values for the model parameters */
function SolarPanelTry6(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2

  var pi; // EjsS Model.Variables.draw_Panel.pi
  var standSize; // EjsS Model.Variables.draw_Panel.standSize
  var standZpos; // EjsS Model.Variables.draw_Panel.standZpos
  var faceZpos; // EjsS Model.Variables.draw_Panel.faceZpos
  var faceXsize; // EjsS Model.Variables.draw_Panel.faceXsize
  var faceYsize; // EjsS Model.Variables.draw_Panel.faceYsize
  var faceZsize; // EjsS Model.Variables.draw_Panel.faceZsize
  var faceAngle; // EjsS Model.Variables.draw_Panel.faceAngle
  var faceAngleDeg; // EjsS Model.Variables.draw_Panel.faceAngleDeg
  var sunXpos; // EjsS Model.Variables.draw_Panel.sunXpos
  var displayGraph; // EjsS Model.Variables.draw_Panel.displayGraph
  var displayGraphShow; // EjsS Model.Variables.draw_Panel.displayGraphShow

  var day; // EjsS Model.Variables.Var Table.day
  var declinationAngle; // EjsS Model.Variables.Var Table.declinationAngle
  var alpha; // EjsS Model.Variables.Var Table.alpha
  var beta; // EjsS Model.Variables.Var Table.beta
  var sModule; // EjsS Model.Variables.Var Table.sModule
  var sHorizontal; // EjsS Model.Variables.Var Table.sHorizontal
  var sIncident; // EjsS Model.Variables.Var Table.sIncident
  var x; // EjsS Model.Variables.Var Table.x
  var fluctuationFactor; // EjsS Model.Variables.Var Table.fluctuationFactor

  var t; // EjsS Model.Variables.lookang.t
  var dt; // EjsS Model.Variables.lookang.dt
  var font; // EjsS Model.Variables.lookang.font
  var clockTime; // EjsS Model.Variables.lookang.clockTime
  var sunAngle; // EjsS Model.Variables.lookang.sunAngle
  var cameraX; // EjsS Model.Variables.lookang.cameraX
  var cameraY; // EjsS Model.Variables.lookang.cameraY
  var cameraZ; // EjsS Model.Variables.lookang.cameraZ
  var functionX; // EjsS Model.Variables.lookang.functionX
  var functionY; // EjsS Model.Variables.lookang.functionY
  var functionZ; // EjsS Model.Variables.lookang.functionZ
  var sunRealPosX; // EjsS Model.Variables.lookang.sunRealPosX
  var sunRealPosY; // EjsS Model.Variables.lookang.sunRealPosY
  var sunRealPosZ; // EjsS Model.Variables.lookang.sunRealPosZ
  var sunRealAngle; // EjsS Model.Variables.lookang.sunRealAngle
  var powerCollected; // EjsS Model.Variables.lookang.powerCollected
  var G; // EjsS Model.Variables.lookang.G
  var optionState; // EjsS Model.Variables.lookang.optionState
  var cloudRainText; // EjsS Model.Variables.lookang.cloudRainText
  var memoryColor; // EjsS Model.Variables.lookang.memoryColor
  var textSet; // EjsS Model.Variables.lookang.textSet
  var textSetShow; // EjsS Model.Variables.lookang.textSetShow
  var textSetX; // EjsS Model.Variables.lookang.textSetX
  var textSetY; // EjsS Model.Variables.lookang.textSetY
  var labelShow; // EjsS Model.Variables.lookang.labelShow
  var debug; // EjsS Model.Variables.lookang.debug
  var showWhat; // EjsS Model.Variables.lookang.showWhat
  var rotationMatrix; // EjsS Model.Variables.lookang.rotationMatrix
  var codeBlockExecuted; // EjsS Model.Variables.lookang.codeBlockExecuted

  var _privateOdesList;
  var _ODEi_evolution1;
  var userEvents1=[];

  _model.getOdes = function() { return [_ODEi_evolution1]; };

  _model.removeEvents = function(){
    userEvents1=[];
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      pi : pi,
      standSize : standSize,
      standZpos : standZpos,
      faceZpos : faceZpos,
      faceXsize : faceXsize,
      faceYsize : faceYsize,
      faceZsize : faceZsize,
      faceAngle : faceAngle,
      faceAngleDeg : faceAngleDeg,
      sunXpos : sunXpos,
      displayGraph : displayGraph,
      displayGraphShow : displayGraphShow,
      day : day,
      declinationAngle : declinationAngle,
      alpha : alpha,
      beta : beta,
      sModule : sModule,
      sHorizontal : sHorizontal,
      sIncident : sIncident,
      x : x,
      fluctuationFactor : fluctuationFactor,
      t : t,
      dt : dt,
      font : font,
      clockTime : clockTime,
      sunAngle : sunAngle,
      cameraX : cameraX,
      cameraY : cameraY,
      cameraZ : cameraZ,
      functionX : functionX,
      functionY : functionY,
      functionZ : functionZ,
      sunRealPosX : sunRealPosX,
      sunRealPosY : sunRealPosY,
      sunRealPosZ : sunRealPosZ,
      sunRealAngle : sunRealAngle,
      powerCollected : powerCollected,
      G : G,
      optionState : optionState,
      cloudRainText : cloudRainText,
      memoryColor : memoryColor,
      textSet : textSet,
      textSetShow : textSetShow,
      textSetX : textSetX,
      textSetY : textSetY,
      labelShow : labelShow,
      debug : debug,
      showWhat : showWhat,
      rotationMatrix : rotationMatrix,
      codeBlockExecuted : codeBlockExecuted
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      pi : pi,
      standSize : standSize,
      standZpos : standZpos,
      faceZpos : faceZpos,
      faceXsize : faceXsize,
      faceYsize : faceYsize,
      faceZsize : faceZsize,
      faceAngle : faceAngle,
      faceAngleDeg : faceAngleDeg,
      sunXpos : sunXpos,
      displayGraph : displayGraph,
      displayGraphShow : displayGraphShow,
      day : day,
      declinationAngle : declinationAngle,
      alpha : alpha,
      beta : beta,
      sModule : sModule,
      sHorizontal : sHorizontal,
      sIncident : sIncident,
      x : x,
      fluctuationFactor : fluctuationFactor,
      t : t,
      dt : dt,
      font : font,
      clockTime : clockTime,
      sunAngle : sunAngle,
      cameraX : cameraX,
      cameraY : cameraY,
      cameraZ : cameraZ,
      functionX : functionX,
      functionY : functionY,
      functionZ : functionZ,
      sunRealPosX : sunRealPosX,
      sunRealPosY : sunRealPosY,
      sunRealPosZ : sunRealPosZ,
      sunRealAngle : sunRealAngle,
      powerCollected : powerCollected,
      G : G,
      optionState : optionState,
      cloudRainText : cloudRainText,
      memoryColor : memoryColor,
      textSet : textSet,
      textSetShow : textSetShow,
      textSetX : textSetX,
      textSetY : textSetY,
      labelShow : labelShow,
      debug : debug,
      showWhat : showWhat,
      rotationMatrix : rotationMatrix,
      codeBlockExecuted : codeBlockExecuted
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.standSize != "undefined") standSize = json.standSize;
    if(typeof json.standZpos != "undefined") standZpos = json.standZpos;
    if(typeof json.faceZpos != "undefined") faceZpos = json.faceZpos;
    if(typeof json.faceXsize != "undefined") faceXsize = json.faceXsize;
    if(typeof json.faceYsize != "undefined") faceYsize = json.faceYsize;
    if(typeof json.faceZsize != "undefined") faceZsize = json.faceZsize;
    if(typeof json.faceAngle != "undefined") faceAngle = json.faceAngle;
    if(typeof json.faceAngleDeg != "undefined") faceAngleDeg = json.faceAngleDeg;
    if(typeof json.sunXpos != "undefined") sunXpos = json.sunXpos;
    if(typeof json.displayGraph != "undefined") displayGraph = json.displayGraph;
    if(typeof json.displayGraphShow != "undefined") displayGraphShow = json.displayGraphShow;
    if(typeof json.day != "undefined") day = json.day;
    if(typeof json.declinationAngle != "undefined") declinationAngle = json.declinationAngle;
    if(typeof json.alpha != "undefined") alpha = json.alpha;
    if(typeof json.beta != "undefined") beta = json.beta;
    if(typeof json.sModule != "undefined") sModule = json.sModule;
    if(typeof json.sHorizontal != "undefined") sHorizontal = json.sHorizontal;
    if(typeof json.sIncident != "undefined") sIncident = json.sIncident;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.fluctuationFactor != "undefined") fluctuationFactor = json.fluctuationFactor;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.clockTime != "undefined") clockTime = json.clockTime;
    if(typeof json.sunAngle != "undefined") sunAngle = json.sunAngle;
    if(typeof json.cameraX != "undefined") cameraX = json.cameraX;
    if(typeof json.cameraY != "undefined") cameraY = json.cameraY;
    if(typeof json.cameraZ != "undefined") cameraZ = json.cameraZ;
    if(typeof json.functionX != "undefined") functionX = json.functionX;
    if(typeof json.functionY != "undefined") functionY = json.functionY;
    if(typeof json.functionZ != "undefined") functionZ = json.functionZ;
    if(typeof json.sunRealPosX != "undefined") sunRealPosX = json.sunRealPosX;
    if(typeof json.sunRealPosY != "undefined") sunRealPosY = json.sunRealPosY;
    if(typeof json.sunRealPosZ != "undefined") sunRealPosZ = json.sunRealPosZ;
    if(typeof json.sunRealAngle != "undefined") sunRealAngle = json.sunRealAngle;
    if(typeof json.powerCollected != "undefined") powerCollected = json.powerCollected;
    if(typeof json.G != "undefined") G = json.G;
    if(typeof json.optionState != "undefined") optionState = json.optionState;
    if(typeof json.cloudRainText != "undefined") cloudRainText = json.cloudRainText;
    if(typeof json.memoryColor != "undefined") memoryColor = json.memoryColor;
    if(typeof json.textSet != "undefined") textSet = json.textSet;
    if(typeof json.textSetShow != "undefined") textSetShow = json.textSetShow;
    if(typeof json.textSetX != "undefined") textSetX = json.textSetX;
    if(typeof json.textSetY != "undefined") textSetY = json.textSetY;
    if(typeof json.labelShow != "undefined") labelShow = json.labelShow;
    if(typeof json.debug != "undefined") debug = json.debug;
    if(typeof json.showWhat != "undefined") showWhat = json.showWhat;
    if(typeof json.rotationMatrix != "undefined") rotationMatrix = json.rotationMatrix;
    if(typeof json.codeBlockExecuted != "undefined") codeBlockExecuted = json.codeBlockExecuted;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.standSize != "undefined") standSize = json.standSize;
    if(typeof json.standZpos != "undefined") standZpos = json.standZpos;
    if(typeof json.faceZpos != "undefined") faceZpos = json.faceZpos;
    if(typeof json.faceXsize != "undefined") faceXsize = json.faceXsize;
    if(typeof json.faceYsize != "undefined") faceYsize = json.faceYsize;
    if(typeof json.faceZsize != "undefined") faceZsize = json.faceZsize;
    if(typeof json.faceAngle != "undefined") faceAngle = json.faceAngle;
    if(typeof json.faceAngleDeg != "undefined") faceAngleDeg = json.faceAngleDeg;
    if(typeof json.sunXpos != "undefined") sunXpos = json.sunXpos;
    if(typeof json.displayGraph != "undefined") displayGraph = json.displayGraph;
    if(typeof json.displayGraphShow != "undefined") displayGraphShow = json.displayGraphShow;
    if(typeof json.day != "undefined") day = json.day;
    if(typeof json.declinationAngle != "undefined") declinationAngle = json.declinationAngle;
    if(typeof json.alpha != "undefined") alpha = json.alpha;
    if(typeof json.beta != "undefined") beta = json.beta;
    if(typeof json.sModule != "undefined") sModule = json.sModule;
    if(typeof json.sHorizontal != "undefined") sHorizontal = json.sHorizontal;
    if(typeof json.sIncident != "undefined") sIncident = json.sIncident;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.fluctuationFactor != "undefined") fluctuationFactor = json.fluctuationFactor;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.clockTime != "undefined") clockTime = json.clockTime;
    if(typeof json.sunAngle != "undefined") sunAngle = json.sunAngle;
    if(typeof json.cameraX != "undefined") cameraX = json.cameraX;
    if(typeof json.cameraY != "undefined") cameraY = json.cameraY;
    if(typeof json.cameraZ != "undefined") cameraZ = json.cameraZ;
    if(typeof json.functionX != "undefined") functionX = json.functionX;
    if(typeof json.functionY != "undefined") functionY = json.functionY;
    if(typeof json.functionZ != "undefined") functionZ = json.functionZ;
    if(typeof json.sunRealPosX != "undefined") sunRealPosX = json.sunRealPosX;
    if(typeof json.sunRealPosY != "undefined") sunRealPosY = json.sunRealPosY;
    if(typeof json.sunRealPosZ != "undefined") sunRealPosZ = json.sunRealPosZ;
    if(typeof json.sunRealAngle != "undefined") sunRealAngle = json.sunRealAngle;
    if(typeof json.powerCollected != "undefined") powerCollected = json.powerCollected;
    if(typeof json.G != "undefined") G = json.G;
    if(typeof json.optionState != "undefined") optionState = json.optionState;
    if(typeof json.cloudRainText != "undefined") cloudRainText = json.cloudRainText;
    if(typeof json.memoryColor != "undefined") memoryColor = json.memoryColor;
    if(typeof json.textSet != "undefined") textSet = json.textSet;
    if(typeof json.textSetShow != "undefined") textSetShow = json.textSetShow;
    if(typeof json.textSetX != "undefined") textSetX = json.textSetX;
    if(typeof json.textSetY != "undefined") textSetY = json.textSetY;
    if(typeof json.labelShow != "undefined") labelShow = json.labelShow;
    if(typeof json.debug != "undefined") debug = json.debug;
    if(typeof json.showWhat != "undefined") showWhat = json.showWhat;
    if(typeof json.rotationMatrix != "undefined") rotationMatrix = json.rotationMatrix;
    if(typeof json.codeBlockExecuted != "undefined") codeBlockExecuted = json.codeBlockExecuted;
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
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["functionAnalyticsCurve"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["FixRel Page"] = true;
    __pagesEnabled["simpleModel"] = true;
    __pagesEnabled["stop"] = true;
    __pagesEnabled["textLabel"] = true;
    __pagesEnabled["realdata"] = true;
    __pagesEnabled["rotation"] = true;
  });

  _model.addToReset(function() {
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width1 = "50%"; // EjsS Model.Variables.layout.Width1
    Width2 = "50%"; // EjsS Model.Variables.layout.Width2
  });

  _model.addToReset(function() {
    pi = Math.PI; // EjsS Model.Variables.draw_Panel.pi
    standSize = 0; // EjsS Model.Variables.draw_Panel.standSize
    standZpos = standSize/2; // EjsS Model.Variables.draw_Panel.standZpos
    faceZpos = standSize; // EjsS Model.Variables.draw_Panel.faceZpos
    faceXsize = 0.2; // EjsS Model.Variables.draw_Panel.faceXsize
    faceYsize = 0.3; // EjsS Model.Variables.draw_Panel.faceYsize
    faceZsize = 0.01; // EjsS Model.Variables.draw_Panel.faceZsize
    faceAngle = 0; // EjsS Model.Variables.draw_Panel.faceAngle
    faceAngleDeg = 0; // EjsS Model.Variables.draw_Panel.faceAngleDeg
    sunXpos = 1; // EjsS Model.Variables.draw_Panel.sunXpos
    displayGraph = "inline-block"; // EjsS Model.Variables.draw_Panel.displayGraph
    displayGraphShow = true; // EjsS Model.Variables.draw_Panel.displayGraphShow
  });

  _model.addToReset(function() {
    day = 1; // EjsS Model.Variables.Var Table.day
    declinationAngle = (23.45*pi/180) * Math.sin( (360/365)*(284+day) ); // EjsS Model.Variables.Var Table.declinationAngle
    alpha = 0; // EjsS Model.Variables.Var Table.alpha
    beta = 0; // EjsS Model.Variables.Var Table.beta
    sModule = 0; // EjsS Model.Variables.Var Table.sModule
    sHorizontal = 0; // EjsS Model.Variables.Var Table.sHorizontal
    sIncident = 1; // EjsS Model.Variables.Var Table.sIncident
    x = 1; // EjsS Model.Variables.Var Table.x
    fluctuationFactor = 0.1; // EjsS Model.Variables.Var Table.fluctuationFactor
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.lookang.t
    dt = 1/60; // EjsS Model.Variables.lookang.dt
    font = "normal normal 1.5vw "; // EjsS Model.Variables.lookang.font
    clockTime = t+6; // EjsS Model.Variables.lookang.clockTime
    sunAngle = -pi/2; // EjsS Model.Variables.lookang.sunAngle
    cameraX = 0; // EjsS Model.Variables.lookang.cameraX
    cameraY = -2.5; // EjsS Model.Variables.lookang.cameraY
    cameraZ = 1; // EjsS Model.Variables.lookang.cameraZ
    functionX = ""; // EjsS Model.Variables.lookang.functionX
    functionY = ""; // EjsS Model.Variables.lookang.functionY
    functionZ = ""; // EjsS Model.Variables.lookang.functionZ
    sunRealPosX = 1; // EjsS Model.Variables.lookang.sunRealPosX
    sunRealPosY = 0; // EjsS Model.Variables.lookang.sunRealPosY
    sunRealPosZ = 0; // EjsS Model.Variables.lookang.sunRealPosZ
    sunRealAngle = 0; // EjsS Model.Variables.lookang.sunRealAngle
    powerCollected = 0; // EjsS Model.Variables.lookang.powerCollected
    G = 6; // EjsS Model.Variables.lookang.G
    optionState = "Sunny"; // EjsS Model.Variables.lookang.optionState
    cloudRainText = ""; // EjsS Model.Variables.lookang.cloudRainText
    memoryColor = 0; // EjsS Model.Variables.lookang.memoryColor
    textSet = ["Sunny","Cloudy","Rainy"]; // EjsS Model.Variables.lookang.textSet
    textSetShow = [,false,false]; // EjsS Model.Variables.lookang.textSetShow
    textSetX = new Array(3); // EjsS Model.Variables.lookang.textSetX
    (function () {
      var _i0;
      for (_i0=0; _i0<3; _i0+=1) {  // EjsS Model.Variables.lookang.textSetX
        textSetX[_i0] = 0;  // EjsS Model.Variables.lookang.textSetX
      }
    }());
    textSetY = new Array(3); // EjsS Model.Variables.lookang.textSetY
    (function () {
      var _i0;
      for (_i0=0; _i0<3; _i0+=1) {  // EjsS Model.Variables.lookang.textSetY
        textSetY[_i0] = 0;  // EjsS Model.Variables.lookang.textSetY
      }
    }());
    debug = 0; // EjsS Model.Variables.lookang.debug
    showWhat = 0; // EjsS Model.Variables.lookang.showWhat
    rotationMatrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0]]; // EjsS Model.Variables.lookang.rotationMatrix
    codeBlockExecuted = false; // EjsS Model.Variables.lookang.codeBlockExecuted
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _privateOdesList=[];
    _ODEi_evolution1 = _ODE_evolution1();
    _privateOdesList.push(_ODEi_evolution1);
  });

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(5);
  });

  //https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode  // > CustomCode.fullscreen:1
  // does not work for iOS   // > CustomCode.fullscreen:2
  /*jslint browser:true */  // > CustomCode.fullscreen:3
  function toggleFullScreen() {  // > CustomCode.fullscreen:4
    if (!document.fullscreenElement &&    // alternative standard method  // > CustomCode.fullscreen:5
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods  // > CustomCode.fullscreen:6
      if (document.documentElement.requestFullscreen) {  // > CustomCode.fullscreen:7
        document.documentElement.requestFullscreen();  // > CustomCode.fullscreen:8
      } else if (document.documentElement.msRequestFullscreen) {  // > CustomCode.fullscreen:9
        document.documentElement.msRequestFullscreen();  // > CustomCode.fullscreen:10
      } else if (document.documentElement.mozRequestFullScreen) {  // > CustomCode.fullscreen:11
        document.documentElement.mozRequestFullScreen();  // > CustomCode.fullscreen:12
      } else if (document.documentElement.webkitRequestFullscreen) {  // > CustomCode.fullscreen:13
        document.documentElement.webkitRequestFullscreen();  // > CustomCode.fullscreen:14
      }  // > CustomCode.fullscreen:15
    } else {  // > CustomCode.fullscreen:16
      if (document.exitFullscreen) {  // > CustomCode.fullscreen:17
        document.exitFullscreen();  // > CustomCode.fullscreen:18
      } else if (document.msExitFullscreen) {  // > CustomCode.fullscreen:19
        document.msExitFullscreen();  // > CustomCode.fullscreen:20
      } else if (document.mozCancelFullScreen) {  // > CustomCode.fullscreen:21
        document.mozCancelFullScreen();  // > CustomCode.fullscreen:22
      } else if (document.webkitExitFullscreen) {  // > CustomCode.fullscreen:23
        document.webkitExitFullscreen();  // > CustomCode.fullscreen:24
      }  // > CustomCode.fullscreen:25
    }  // > CustomCode.fullscreen:26
  }  // > CustomCode.fullscreen:27

  // code to be copied to EJSS source code under Custom and used in drawingPanel3D and plottingPanel2D  // > CustomCode.changeOrientation:1
  // address the problem is height difference is iOS app , epub, and Firefox  // > CustomCode.changeOrientation:2
  // user need to change only k and kepub  // > CustomCode.changeOrientation:3
  // copy %changeOrientation()% into the Height Field of drawingPanel3D and plottingPanel2D  // > CustomCode.changeOrientation:4
  function changeOrientation() {  // > CustomCode.changeOrientation:5
     // > CustomCode.changeOrientation:6
  var k =0.90 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeOrientation:7
  var kapple =0.90 // control apple app height  // > CustomCode.changeOrientation:8
  var kepub =0.90 ;  // > CustomCode.changeOrientation:9
  // check platform for Apps  // > CustomCode.changeOrientation:10
  try { // allow code to run in Student Learning Space   // > CustomCode.changeOrientation:11
    var iOSapp =  (typeof parent.device != 'undefined' && parent.device.platform == "iOS");  // > CustomCode.changeOrientation:12
    var Androidapp = (typeof parent.device != 'undefined' && parent.device.platform == "Android");  // > CustomCode.changeOrientation:13
  } catch(e) {  // > CustomCode.changeOrientation:14
    var iOSapp = false;  // > CustomCode.changeOrientation:15
    var Androidapp = false;  // > CustomCode.changeOrientation:16
  }  // > CustomCode.changeOrientation:17
  // check platform for web browsers  // > CustomCode.changeOrientation:18
  var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:19
  var iPad =/iPad/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:20
  var iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:21
  var Android= /Android|android/i.test(navigator.userAgent);  // > CustomCode.changeOrientation:22
  //navigator  // > CustomCode.changeOrientation:23
  var Firefox = navigator.userAgent.indexOf("Firefox") != -1;  // > CustomCode.changeOrientation:24
     // > CustomCode.changeOrientation:25
  switch (window.orientation) { // using window.orientation as deciding factor  // > CustomCode.changeOrientation:26
    case 0:  // > CustomCode.changeOrientation:27
    case 180:  // > CustomCode.changeOrientation:28
      this.screenOrientation = 'portrait';  // > CustomCode.changeOrientation:29
      if (iOSapp){ // does not seems to work  // > CustomCode.changeOrientation:30
          // > CustomCode.changeOrientation:31
        return window.screen.height*kapple;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:32
        // > CustomCode.changeOrientation:33
      }  // > CustomCode.changeOrientation:34
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeOrientation:35
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:36
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:37
        // return window.screen.height;  // > CustomCode.changeOrientation:38
        //  return window.innerHeight;  // > CustomCode.changeOrientation:39
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:40
      }  // > CustomCode.changeOrientation:41
       // > CustomCode.changeOrientation:42
      else {  // > CustomCode.changeOrientation:43
         // > CustomCode.changeOrientation:44
        return 100*k+"vh";  // > CustomCode.changeOrientation:45
      }  // > CustomCode.changeOrientation:46
      break;  // > CustomCode.changeOrientation:47
    case 90:  // > CustomCode.changeOrientation:48
    case -90:  // > CustomCode.changeOrientation:49
      this.screenOrientation = 'landscape';  // > CustomCode.changeOrientation:50
     // > CustomCode.changeOrientation:51
      if (iOSapp){ // App  // > CustomCode.changeOrientation:52
        return window.screen.width*kapple;    // > CustomCode.changeOrientation:53
        // return window.screen.height;  // > CustomCode.changeOrientation:54
        //  return window.innerHeight;  // > CustomCode.changeOrientation:55
        //  return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:56
      }  // > CustomCode.changeOrientation:57
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeOrientation:58
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:59
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:60
        // return window.screen.height;  // > CustomCode.changeOrientation:61
        //  return window.innerHeight;  // > CustomCode.changeOrientation:62
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:63
      }  // > CustomCode.changeOrientation:64
       // > CustomCode.changeOrientation:65
      else {  // > CustomCode.changeOrientation:66
        return 100*k+"vh";  // > CustomCode.changeOrientation:67
        }  // > CustomCode.changeOrientation:68
      break;  // > CustomCode.changeOrientation:69
    default:  // > CustomCode.changeOrientation:70
      this.screenOrientation = 'unknown';  // > CustomCode.changeOrientation:71
      //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.changeOrientation:72
       if (Firefox){  // > CustomCode.changeOrientation:73
        return window.innerHeight*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeOrientation:74
        }  // > CustomCode.changeOrientation:75
     //   else if (iOS&&(window.orientation==0)||(window.orientation==180)){  // > CustomCode.changeOrientation:76
     //   return  window.screen.height*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeOrientation:77
     //   }  // > CustomCode.changeOrientation:78
      //  else if (iOS&&(window.orientation==90)||(window.orientation==-90)){  // > CustomCode.changeOrientation:79
     //   return  window.screen.width*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeOrientation:80
     //   }  // > CustomCode.changeOrientation:81
        else {  // > CustomCode.changeOrientation:82
        //alert();  // > CustomCode.changeOrientation:83
        // return 100*k+"%"; // work on fullscreen works in EJSS6.0beta  // > CustomCode.changeOrientation:84
          //  works in EjsS_5.3_180131  // > CustomCode.changeOrientation:85
        return  window.innerHeight*k; // work on panel   // > CustomCode.changeOrientation:86
           // > CustomCode.changeOrientation:87
  }  // > CustomCode.changeOrientation:88
  }  // > CustomCode.changeOrientation:89
     // > CustomCode.changeOrientation:90
  }  // > CustomCode.changeOrientation:91

  // copy this custom function  // > CustomCode.speech:1
  // in iOS need to add speech to the play button as On iOS the API works but must be triggered by a user action callback, like a response to a tap event, to provide a better experience to users and avoid unexpected sounds out of your phone  // > CustomCode.speech:2
  function speech (option) {  // > CustomCode.speech:3
  try { // allow code to run in Student Learning Space   // > CustomCode.speech:4
  var isCordova = (!!this.parent.cordova || !!window.cordova);  // > CustomCode.speech:5
  if(isCordova) { // check it is running in Android or iOS  // > CustomCode.speech:6
         // parent.TTS.speak({text:option,locale:'zh-CN'});  // > CustomCode.speech:7
  	parent.TTS.speak({text:option,locale:'us-EN'});  // > CustomCode.speech:8
  	// parent.TTS.speak({text:option,locale:'en-US'});  // > CustomCode.speech:9
  	// parent.TTS.speak({text:option,locale:'id-ID'});  // > CustomCode.speech:10
  }   // > CustomCode.speech:11
  }   // > CustomCode.speech:12
  catch(e) {  // > CustomCode.speech:13
    var isCordova = false;  // > CustomCode.speech:14
    }  // > CustomCode.speech:15
      // > CustomCode.speech:16
     var msg = new SpeechSynthesisUtterance(option);  // > CustomCode.speech:17
    //https://stackoverflow.com/questions/43983845/speechsynthesis-api-for-chinese-firefox  // > CustomCode.speech:18
    // Set the text.  // > CustomCode.speech:19
  	//msg.text = option;   // > CustomCode.speech:20
  	//https://forums.developer.apple.com/message/323564#323564  // > CustomCode.speech:21
  	// comment out the next 2 lines for english  // > CustomCode.speech:22
  //msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Ting-Ting'; })[0];  // > CustomCode.speech:23
  //msg.lang = 'zh-CH'; // need for android?  // > CustomCode.speech:24
  //msg.lang = 'id-ID'; // need for android?  // > CustomCode.speech:25
  msg.lang = 'us-EN'; // need for android?  // > CustomCode.speech:26
  //https://flaviocopes.com/speech-synthesis-api/  // > CustomCode.speech:27
  //debug  // > CustomCode.speech:28
  //console.log(`Voices #: ${speechSynthesis.getVoices().length}`)  // > CustomCode.speech:29
  //speechSynthesis.getVoices().forEach(voice => {  // > CustomCode.speech:30
  // console.log(voice.name, voice.lang)  // > CustomCode.speech:31
  //})  // > CustomCode.speech:32
  //debug  // > CustomCode.speech:33
  // Queue this utterance.  // > CustomCode.speech:34
  window.speechSynthesis.speak(msg);  // > CustomCode.speech:35
     // > CustomCode.speech:36
  }  // > CustomCode.speech:37

  // Function to create rotation matrix in 3D  // > CustomCode.rotationMatrix3D:1
  function createRotationMatrix3D(angleX, angleY, angleZ) {  // > CustomCode.rotationMatrix3D:2
      const cosX = Math.cos(angleX);  // > CustomCode.rotationMatrix3D:3
      const sinX = Math.sin(angleX);  // > CustomCode.rotationMatrix3D:4
      const cosY = Math.cos(angleY);  // > CustomCode.rotationMatrix3D:5
      const sinY = Math.sin(angleY);  // > CustomCode.rotationMatrix3D:6
      const cosZ = Math.cos(angleZ);  // > CustomCode.rotationMatrix3D:7
      const sinZ = Math.sin(angleZ);  // > CustomCode.rotationMatrix3D:8
      const rotationMatrix = [  // > CustomCode.rotationMatrix3D:9
          [angleX, 1, 0, 0],  // > CustomCode.rotationMatrix3D:10
          [angleY, 0, 1, 0],  // > CustomCode.rotationMatrix3D:11
          [angleZ, 0, 0, 1]  // > CustomCode.rotationMatrix3D:12
      ];  // > CustomCode.rotationMatrix3D:13
      return rotationMatrix;  // > CustomCode.rotationMatrix3D:14
  }  // > CustomCode.rotationMatrix3D:15

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    if (textSetShow[0]==undefined){  // > Initialization.Init Page:1
      textSetShow[0] =true  // > Initialization.Init Page:2
      }  // > Initialization.Init Page:3
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["functionAnalyticsCurve"]) return;
    functionX = _view._format(2*sunXpos,"0.00")+"*cos(cta)"  // > Initialization.functionAnalyticsCurve:1
    functionY = _view._format(2*sunXpos,"0.00")+"*sin("+declinationAngle+")"  // > Initialization.functionAnalyticsCurve:2
    functionZ = _view._format(2*sunXpos,"0.00")+"*sin(cta)"  // > Initialization.functionAnalyticsCurve:3
  });

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
    // Add 6 hours  // > FixedRelations.FixRel Page:1
        clockTime = (t + 6) % 24;  // > FixedRelations.FixRel Page:2
        // If the result is negative, add 24 to get the correct clock time  // > FixedRelations.FixRel Page:3
        if (clockTime < 0) {  // > FixedRelations.FixRel Page:4
            clockTime += 24;  // > FixedRelations.FixRel Page:5
        }  // > FixedRelations.FixRel Page:6
          // > FixedRelations.FixRel Page:7
    //day = clockTime /24  // > FixedRelations.FixRel Page:8
    //https://www.pveducation.org/pvcdrom/properties-of-sunlight/declination-angle  // > FixedRelations.FixRel Page:9
    //declinationAngle = (23.45*pi/180) * Math.sin( (360/365)*(284+day) )  // formula from website  // > FixedRelations.FixRel Page:10
    declinationAngle = (23.45*pi/180) * Math.sin( (2*pi/365)*(284+day) )    // dummy formula  // > FixedRelations.FixRel Page:11
    //coordindate system in XZ plane (RED-BLUE)  // > FixedRelations.FixRel Page:12
    sunRealPosX = Math.cos(sunRealAngle)  // > FixedRelations.FixRel Page:13
    sunRealPosY =  Math.sin(declinationAngle) // correct?  // > FixedRelations.FixRel Page:14
    sunRealPosZ = Math.sin(sunRealAngle)  // > FixedRelations.FixRel Page:15
    /*  // > FixedRelations.FixRel Page:16
    //Singapore data:  // > FixedRelations.FixRel Page:17
    //https://www.pveducation.org/pvcdrom/properties-of-sunlight/solar-radiation-on-a-tilted-surface  // > FixedRelations.FixRel Page:18
    var Latitude	=1.290270     // = Φ, in degree  // > FixedRelations.FixRel Page:19
    var Longitude	=103.851959  // > FixedRelations.FixRel Page:20
    // faceAngle = beta in website β is the tilt angle of the module measured from the horizontal.  // > FixedRelations.FixRel Page:21
    // alpha = alpha α is the elevation angle  // > FixedRelations.FixRel Page:22
    // sModule has units (kWh/m^2/day)  // > FixedRelations.FixRel Page:23
    alpha = sunRealAngle*180/pi - Latitude + declinationAngle*180/pi  // > FixedRelations.FixRel Page:24
        //sModule = sIncident * Math.sin(alpha + faceAngle*180/pi)  wrong cuz it goes -ve  // > FixedRelations.FixRel Page:25
    sModule = sIncident * Math.sin(sunRealAngle*pi/180 + faceAngle*pi/180)  // > FixedRelations.FixRel Page:26
      // Restrict output power (sModule) to not go -ve at night  // > FixedRelations.FixRel Page:27
    if (sModule<0){sModule=0}  // > FixedRelations.FixRel Page:28
    */  // > FixedRelations.FixRel Page:29
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["simpleModel"]) return;
    //P=A×G×η×cos(θs−β)  // > FixedRelations.simpleModel:1
    /*  // > FixedRelations.simpleModel:2
    Where:  // > FixedRelations.simpleModel:3
    P is the output power of the solar panel (in watts),  // > FixedRelations.simpleModel:4
    A is the area of the solar panel (in square meters),  // > FixedRelations.simpleModel:5
    G is the incident solar radiation (in watts per square meter),  // > FixedRelations.simpleModel:6
    η is the efficiency of the solar panel (a decimal fraction),  // > FixedRelations.simpleModel:7
    θ s is the solar elevation angle (angle of the sun from the horizon),  // > FixedRelations.simpleModel:8
    β is the tilt angle of the solar panel (angle between the panel and the horizontal plane).  // > FixedRelations.simpleModel:9
    */  // > FixedRelations.simpleModel:10
    var factor = 9.1// abritray decided to make the number near to 1  // > FixedRelations.simpleModel:11
    var Area = faceXsize*faceYsize*factor  // > FixedRelations.simpleModel:12
    //In Singapore, the average annual solar radiation typically ranges from around 1,800 to 2,200 kilowatt-hours per square meter per year (kWh/m²/year). This translates to an average daily solar radiation of approximately 4.9 to 6.0 kWh/m²/day.  // > FixedRelations.simpleModel:13
    //var G = 4.9 // cloudy  // > FixedRelations.simpleModel:14
    //var G = 6 // sunny  // > FixedRelations.simpleModel:15
    //var efficiency = 0.2 // Monocrystalline Silicon Solar Panels:  // > FixedRelations.simpleModel:16
    //var efficiency = 0.15 // Polycrystalline Silicon Solar Panels:  // > FixedRelations.simpleModel:17
    //var efficiency = 0.10 //Thin-Film Solar Panels:  // > FixedRelations.simpleModel:18
    var efficiency = 0.30 //Concentrated Photovoltaic (CPV) Solar Panels:  // > FixedRelations.simpleModel:19
    var faceAngleNormal = (faceAngle-pi/2)  // > FixedRelations.simpleModel:20
    var random = Math.random()  // > FixedRelations.simpleModel:21
    if (powerCollected==0){ // prevent 0 to be shown with a non-zero value  // > FixedRelations.simpleModel:22
      powerCollected = Area*G*efficiency* Math.sin( sunRealAngle + faceAngle)  // > FixedRelations.simpleModel:23
      }  // > FixedRelations.simpleModel:24
      else if (powerCollected>0){  // > FixedRelations.simpleModel:25
    powerCollected = Area*G*efficiency* Math.sin( sunRealAngle + faceAngle)+ fluctuationFactor*random  // > FixedRelations.simpleModel:26
    }  // > FixedRelations.simpleModel:27
    powerCollected = Math.max(0,powerCollected )  // > FixedRelations.simpleModel:28
    if (sunRealAngle >pi ||sunRealAngle <0) {  // > FixedRelations.simpleModel:29
      powerCollected = 0  // > FixedRelations.simpleModel:30
      }  // > FixedRelations.simpleModel:31
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["stop"]) return;
    if (t >= 24){  // > FixedRelations.stop:1
    _pause()  // > FixedRelations.stop:2
    }  // > FixedRelations.stop:3
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["textLabel"]) return;
    //optionState = _view.comboBox2.getProperty("SelectedOptions");  // array of options  // > FixedRelations.textLabel:1
    if (clockTime <12){ // create illusion of following the dot  // > FixedRelations.textLabel:2
    if (optionState =="Sunny"){  // > FixedRelations.textLabel:3
    textSetX[0] = Math.max(clockTime,textSetX[0]) // assume peak at 12 noon  // > FixedRelations.textLabel:4
    }  // > FixedRelations.textLabel:5
    else if (optionState =="Cloudy"){  // > FixedRelations.textLabel:6
    textSetX[1] = Math.max(clockTime,textSetX[1]) // assume peak at 12 noon  // > FixedRelations.textLabel:7
    }  // > FixedRelations.textLabel:8
    else if (optionState =="Rainy"){  // > FixedRelations.textLabel:9
    textSetX[2] = Math.max(clockTime,textSetX[2]) // assume peak at 12 noon  // > FixedRelations.textLabel:10
    }  // > FixedRelations.textLabel:11
    }  // > FixedRelations.textLabel:12
    else if (clockTime >=12){ // fix the positon to assumed peak at clockTime =12  // > FixedRelations.textLabel:13
     if (optionState =="Sunny"){ textSetX[0] = 12;}  // > FixedRelations.textLabel:14
      else if (optionState =="Cloudy"){ textSetX[1] = 12;}  // > FixedRelations.textLabel:15
      else if (optionState =="Rainy"){textSetX[2] = 12;}  // > FixedRelations.textLabel:16
      }  // > FixedRelations.textLabel:17
    if (optionState =="Sunny"){  // > FixedRelations.textLabel:18
    textSetY[0] = Math.max(powerCollected,textSetY[0])  // > FixedRelations.textLabel:19
    }  // > FixedRelations.textLabel:20
    else if (optionState =="Cloudy"){  // > FixedRelations.textLabel:21
    textSetY[1] = Math.max(powerCollected,textSetY[1])  // > FixedRelations.textLabel:22
    }  // > FixedRelations.textLabel:23
    else if (optionState =="Rainy"){  // > FixedRelations.textLabel:24
    textSetY[2] = Math.max(powerCollected,textSetY[2])  // > FixedRelations.textLabel:25
    }  // > FixedRelations.textLabel:26
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["realdata"]) return;
    // Define a flag variable  // > FixedRelations.realdata:1
    let codeBlockExecuted = false;  // > FixedRelations.realdata:2
    // Check if the code block has not been executed yet and the conditions are met  // > FixedRelations.realdata:3
    if (!codeBlockExecuted && optionState == "Real Data") {  // > FixedRelations.realdata:4
        if (t>0 && t <= 3) {  // > FixedRelations.realdata:5
            G = 6;  // > FixedRelations.realdata:6
            showWhat=0  // > FixedRelations.realdata:7
           // optionState = "Sunny"  // > FixedRelations.realdata:8
         //  _view.comboBox2.setSelectedOptions(["Sunny"]);  // > FixedRelations.realdata:9
           //_view._update();  // > FixedRelations.realdata:10
           debug = 1  // > FixedRelations.realdata:11
        }   // > FixedRelations.realdata:12
        else if (t >3 && t <= 6) {  // > FixedRelations.realdata:13
            G = 4.9;  // > FixedRelations.realdata:14
            showWhat=1  // > FixedRelations.realdata:15
           // _view.comboBox2.setSelectedOptions(["Cloudy"]);  // > FixedRelations.realdata:16
           // _view._update();  // > FixedRelations.realdata:17
         //   _update()  // > FixedRelations.realdata:18
         //  optionState = "Cloudy"  // > FixedRelations.realdata:19
           debug = 2  // > FixedRelations.realdata:20
             // > FixedRelations.realdata:21
        }   // > FixedRelations.realdata:22
        else if (t > 6  && t <= 9) {  // > FixedRelations.realdata:23
            G = 2;  // > FixedRelations.realdata:24
            showWhat=2  // > FixedRelations.realdata:25
          //  _view.comboBox2.setSelectedOptions(["Rainy"]);  // > FixedRelations.realdata:26
          //  _view._update();  // > FixedRelations.realdata:27
         //    _update()  // > FixedRelations.realdata:28
          //  optionState = "Rainy"  // > FixedRelations.realdata:29
            debug = 3  // > FixedRelations.realdata:30
        }   // > FixedRelations.realdata:31
        else if (t > 9 && t <= 12) {  // > FixedRelations.realdata:32
            G = 6;  // > FixedRelations.realdata:33
            showWhat=0  // > FixedRelations.realdata:34
         // _view.comboBox2.setSelectedOptions(["Sunny"]);  // > FixedRelations.realdata:35
        //   _update()  // > FixedRelations.realdata:36
         //   optionState = "Sunny"  // > FixedRelations.realdata:37
           debug = 4  // > FixedRelations.realdata:38
        }  // > FixedRelations.realdata:39
        else if (t>12&& t <23) {  // > FixedRelations.realdata:40
           // Set the flag to true to indicate that the code block has been executed  // > FixedRelations.realdata:41
         //_view.comboBox2.setSelectedOptions(["Real Data"]);  // > FixedRelations.realdata:42
        //  _update()  // > FixedRelations.realdata:43
        showWhat=0  // > FixedRelations.realdata:44
         codeBlockExecuted = true;  // > FixedRelations.realdata:45
         debug = 5  // > FixedRelations.realdata:46
          }  // > FixedRelations.realdata:47
          // > FixedRelations.realdata:48
          // > FixedRelations.realdata:49
    }  // > FixedRelations.realdata:50
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["rotation"]) return;
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  function _initializeSolvers() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].initializeSolver();
  }

  function _automaticResetSolvers() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].automaticResetSolver();
  }

  _model.resetSolvers = function() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].resetSolver();
  };

  _getODE = function (_odeName) {
    if (_odeName=="Evol Page") return _ODEi_evolution1;
    return null;
  }

  function _getEventSolver(_odeName) {
    var ode = _getODE(_odeName);
    if (ode===null) return null;
    return ode.getEventSolver();
  }

  function _setSolverClass(_odeName, _engine) {
    var ode = _getODE(_odeName);
    if (ode===null) return;
    if (!_engine.setODE) {
      var classname = _engine.toLowerCase();
      if      (classname.indexOf("boga")>=0)   _engine = EJSS_ODE_SOLVERS.bogackiShampine23;
      else if (classname.indexOf("cash")>=0)   _engine = EJSS_ODE_SOLVERS.cashKarp45;
      else if (classname.indexOf("dopri5")>=0) _engine = EJSS_ODE_SOLVERS.dopri5;
      else if (classname.indexOf("dopri8")>=0) _engine = EJSS_ODE_SOLVERS.dopri853;
      else if (classname.indexOf("richa")>=0)  _engine = EJSS_ODE_SOLVERS.eulerRichardson;
      else if (classname.indexOf("euler")>=0)  _engine = EJSS_ODE_SOLVERS.euler;
      else if (classname.indexOf("fehlberg87")>=0) _engine = EJSS_ODE_SOLVERS.fehlberg87;
      else if (classname.indexOf("fehlberg8")>=0)  _engine = EJSS_ODE_SOLVERS.fehlberg8;
      else if (classname.indexOf("radau")>=0)   _engine = EJSS_ODE_SOLVERS.radau5;
      else if (classname.indexOf("runge")>=0)  _engine = EJSS_ODE_SOLVERS.rungeKutta4;
      else if (classname.indexOf("rk4")>=0)    _engine = EJSS_ODE_SOLVERS.rungeKutta4;
      else if (classname.indexOf("verlet")>=0) _engine = EJSS_ODE_SOLVERS.velocityVerlet;
    }
    if (_engine) ode.setSolverClass(_engine);
  }

  function _ODE_evolution1() {
    var __odeSelf = {};
    var __eventSolver;
    var __solverClass = EJSS_ODE_SOLVERS.rungeKutta4;
    var __state=[];
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["sunAngle","sunRealAngle","t"]};

    __odeSelf.setSolverClass = function(__aSolverClass) {
      __solverClass = __aSolverClass;
      __instantiateSolver();
    };

    function __instantiateSolver() {
      __state=[];
      __pushState();
      __eventSolver = EJSS_ODE_SOLVERS.interpolatorEventSolver(__solverClass(),__odeSelf);
      __mustInitialize = true;
    }

    __odeSelf.setEnabled = function(_enabled) { __isEnabled = _enabled; };

    __odeSelf.getIndependentVariableValue = function() { return __eventSolver.getIndependentVariableValue(); };

    __odeSelf.getInternalStepSize = function() { return __eventSolver.getInternalStepSize(); };

    __odeSelf.isAccelerationIndependentOfVelocity = function() { return false; };

    __odeSelf.initializeSolver = function() {
      if (__arraysChanged()) { __instantiateSolver(); __odeSelf.initializeSolver(); return; }
      __pushState();
      __eventSolver.initialize(dt);
      __eventSolver.setBestInterpolation(false);
      __eventSolver.setMaximumInternalSteps(10000);
      __eventSolver.removeAllEvents();
      for(k in userEvents1){__eventSolver.addEvent(userEvents1[k]);}
      __eventSolver.setEstimateFirstStep(false);
      __eventSolver.setEnableExceptions(false);
      __eventSolver.setTolerances(0.00001,0.00001);
      __mustReinitialize = true;
      __mustInitialize = false;
    };

    function __pushState() {
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        if (__state[__cIn]!=sunAngle) __mustReinitialize = true;
        __state[__cIn++] = sunAngle;
        if (__state[__cIn]!=sunRealAngle) __mustReinitialize = true;
        __state[__cIn++] = sunRealAngle;
        if (__state[__cIn]!=t) __mustReinitialize = true;
        __state[__cIn++] = t;
    }

    function __arraysChanged () {
      return false;
    }

    __odeSelf.getEventSolver = function() {
      return __eventSolver;
    };

    __odeSelf.resetSolver = function() {
      __mustUserReinitialize = true;
    };

    __odeSelf.automaticResetSolver = function() {
      __mustReinitialize = true;
    };

    function __errorAction () {
      if (__ignoreErrors) return;
      console.log (__eventSolver.getErrorMessage());
      _pause();
      // Make sure the solver is reinitialized;
      __mustReinitialize = true;
    }

    __odeSelf.step = function() { return __privateStep(false); };

    __odeSelf.solverStep = function() { return __privateStep(true); };

    function __privateStep(__takeMaximumStep) {
      if (!__isEnabled) return 0;
      if (dt===0) return 0;
      if (__mustInitialize) __odeSelf.initializeSolver();
      if (__arraysChanged()) { __instantiateSolver(); __odeSelf.initializeSolver(); }
      __eventSolver.setStepSize(dt);
      __eventSolver.setInternalStepSize(dt);
      __eventSolver.setMaximumInternalSteps(10000);
      __eventSolver.setTolerances(0.00001,0.00001);
      __pushState();
      if (__mustUserReinitialize) { 
        __eventSolver.userReinitialize();
        __mustUserReinitialize = false;
        __mustReinitialize = false;
        if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      }
      else if (__mustReinitialize) { 
        __eventSolver.reinitialize();
        __mustReinitialize = false;
        if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      }
      var __stepTaken = __takeMaximumStep ? __eventSolver.maxStep() : __eventSolver.step();
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        sunAngle = __state[__cOut++];
        sunRealAngle = __state[__cOut++];
        t = __state[__cOut++];
      // Check for error
      if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      return __stepTaken;
    }

    __odeSelf.getState = function() { return __state; };

    __odeSelf.getRate = function(_aState,_aRate) {
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var sunAngle = _aState[__cOut++];
        var sunRealAngle = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = 0.1; // Rate for ODE: Evol Page:sunAngle
        _aRate[__cRate++] = pi/12; // Rate for ODE: Evol Page:sunRealAngle
        _aRate[__cRate++] = 1; // independent variable
        return _aRate;
    }; //end of getRate

    __odeSelf._addEvent = function(userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent){
    var User_Event = function (userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent) {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return eventType; };

      _eventSelf.getRootFindingMethod = function() { return eventMethod; };

      _eventSelf.getMaxIterations = function() { return maxIter; };

      _eventSelf.getTolerance = function() { return eventTolerance; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var sunAngle = _aState[__cOut++];
        var sunRealAngle = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        sunAngle = __state[__cOut++];
        sunRealAngle = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = sunAngle;
        __state[__cIn++] = sunRealAngle;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        if (undefined != functions) eval(functions.toString());
        eval(userAction);
        return endAtEvent;
      }

      return _eventSelf;
    }; // End of event

   userEvents1.push(User_Event(userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent));
   }

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_sunAngle(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_sunRealAngle(__time) {
    var __index = 0 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "Simulation view", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new SolarPanelTry6_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.control.linkProperty("CSS",  function() { return {padding:"10px"}; } ); // Simulation view linking property 'CSS' for element 'control'
          _view.control.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // Simulation view linking property 'Font' for element 'control'
          _view.Day.linkProperty("Value",  function() { return day; }, function(_v) { day = _v; } ); // Simulation view linking property 'Value' for element 'Day'
          _view.Day.setAction("OnChange", function(_data,_info) {
  //declinationAngle = (23.45*pi/180) * Math.sin( (360/365)*(284+day) )
  declinationAngle = (23.45*pi/180) * Math.sin( (2*pi/365)*(284+day) )    // dummy formula
  functionY = _view._format(2*sunXpos,"0.00")+"*sin("+declinationAngle+")";

}); // Simulation view setting action 'OnChange' for element 'Day'
          _view.Angle.linkProperty("Value",  function() { return faceAngleDeg; }, function(_v) { faceAngleDeg = _v; } ); // Simulation view linking property 'Value' for element 'Angle'
          _view.Angle.setAction("OnChange", function(_data,_info) {
  //faceAngleDeg = faceAngle*180/pi
  faceAngle = faceAngleDeg*pi/180;

}); // Simulation view setting action 'OnChange' for element 'Angle'
          _view.slider.linkProperty("Minimum",  function() { return -90*pi/180; } ); // Simulation view linking property 'Minimum' for element 'slider'
          _view.slider.linkProperty("Maximum",  function() { return 90*pi/180; } ); // Simulation view linking property 'Maximum' for element 'slider'
          _view.slider.linkProperty("Value",  function() { return faceAngle; }, function(_v) { faceAngle = _v; } ); // Simulation view linking property 'Value' for element 'slider'
          _view.slider.setAction("OnChange", function(_data,_info) {
  faceAngleDeg = faceAngle*180/pi
  //faceAngle = faceAngleDeg*pi/180
  var angleX = 0
  var angleY = faceAngle
  var angleZ = declinationAngle
  // Create the rotation matrix
  rotationMatrix = createRotationMatrix3D(angleX, angleY, angleZ);

}); // Simulation view setting action 'OnChange' for element 'slider'
          _view.slider.linkProperty("Step",  function() { return pi/18; } ); // Simulation view linking property 'Step' for element 'slider'
          _view.checkBox.linkProperty("Checked",  function() { return labelShow; }, function(_v) { labelShow = _v; } ); // Simulation view linking property 'Checked' for element 'checkBox'
          _view.comboBox.linkProperty("Options",  function() { return ["Singapore","Scene2"]; } ); // Simulation view linking property 'Options' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  var opts = _view.comboBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
      
  // Below can call "option" to use it.;

}); // Simulation view setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // Simulation view linking property 'Font' for element 'comboBox'
          _view.comboBox2.linkProperty("Options",  function() { return ["Sunny","Cloudy","Rainy","Real Data"]; } ); // Simulation view linking property 'Options' for element 'comboBox2'
          _view.comboBox2.setAction("OnChange", function(_data,_info) {
  optionState = _view.comboBox2.getProperty("SelectedOptions");  // array of options
      var option = (optionState.length > 0)? optionState[0]:""; // selected option 
      
     // fluctuationFactor = 0.01 //constant for all cases
      if (option == "Sunny"){
        memoryColor = 0
        G = 6
       // textSetShow[memoryColor]=true
        //fluctuationFactor = 0.5
        }
        else  
      if (option == "Cloudy"){
        memoryColor = 1
        //textSetShow[memoryColor]=true
        G = 4.9
        cloudRainText= "🌥🌥🌥🌥🌥"
        //fluctuationFactor = 0.8
        //fluctuationFactor = 0.8
        }
        else  
      if (option == "Rainy"){
        memoryColor = 2
        
        G = 1
        cloudRainText= "🌧🌧🌧🌧🌧"
        //fluctuationFactor = 1.2
        }
         if (option == "Real Data"){
       
       
        //fluctuationFactor = 1.2
        }
  optionState = option
  textSetShow[memoryColor]=true;

}); // Simulation view setting action 'OnChange' for element 'comboBox2'
          _view.comboBox2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // Simulation view linking property 'Font' for element 'comboBox2'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  text="paused";
  _pause();

}); // Simulation view setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // Simulation view linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  text="playing, wait for 60 sec for data to be collected";

}); // Simulation view setting action 'OnClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // Simulation view linking property 'Font' for element 'playPauseButton2'
          _view.initialize.setAction("OnClick", function(_data,_info) {
  optionState = _view.comboBox2.getProperty("SelectedOptions");  // array of options
  if (optionState == "Sunny"){
    //memoryColor = 0
    }
    else if (optionState == "Rainy"){
    //memoryColor = 2
    }
    if (optionState == "Cloudy"){
    //memoryColor = 1
    }
  //store textSetX n Y
  //alert(memoryColor)
  //textSetX[memoryColor] = t
  //textSetY[memoryColor] = powerCollected
  textSetShow[memoryColor]=true
  _update()
  _view.trail.newSegment();
  //setTimeout(memoryColor=memoryColor+1, 1000);
  t=0;
  powerCollected = 0
  sunRealAngle= 0
  //_initialize();

}); // Simulation view setting action 'OnClick' for element 'initialize'
          _view.resetButton3.setAction("OnClick", function(_data,_info) {
  _reset();
  //["expt 1 vary amount of light","expt 2 vary amount of carbon dioxide"];

}); // Simulation view setting action 'OnClick' for element 'resetButton3'
          _view.resetButton3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // Simulation view linking property 'Font' for element 'resetButton3'
          _view.DisplayGraph.linkProperty("Checked",  function() { return displayGraphShow; }, function(_v) { displayGraphShow = _v; } ); // Simulation view linking property 'Checked' for element 'DisplayGraph'
          _view.DisplayGraph.setAction("OnCheckOff", function(_data,_info) {
  Width1 = "100%"
  displayGraph = "none"
  _update();

}); // Simulation view setting action 'OnCheckOff' for element 'DisplayGraph'
          _view.DisplayGraph.setAction("OnCheckOn", function(_data,_info) {
  Width1 = "50%"
  displayGraph = "";

}); // Simulation view setting action 'OnCheckOn' for element 'DisplayGraph'
          _view.sunAngle.linkProperty("Value",  function() { return sunRealAngle; }, function(_v) { sunRealAngle = _v; } ); // Simulation view linking property 'Value' for element 'sunAngle'
          _view.drawingPanel3D.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // Simulation view linking property 'Height' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // Simulation view linking property 'Width' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("CameraZ",  function() { return cameraZ; }, function(_v) { cameraZ = _v; } ); // Simulation view linking property 'CameraZ' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("CameraY",  function() { return cameraY; }, function(_v) { cameraY = _v; } ); // Simulation view linking property 'CameraY' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("CameraX",  function() { return cameraX; }, function(_v) { cameraX = _v; } ); // Simulation view linking property 'CameraX' for element 'drawingPanel3D'
          _view.panelhide.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'panelhide'
          _view.panelhide.linkProperty("Z",  function() { return faceZpos; }, function(_v) { faceZpos = _v; } ); // Simulation view linking property 'Z' for element 'panelhide'
          _view.panelFace2.linkProperty("Transformation",  function() { return [[0,1,0,0],[faceAngle,0,1,0],[declinationAngle,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'panelFace2'
          _view.panelFace2.linkProperty("SizeX",  function() { return faceXsize; }, function(_v) { faceXsize = _v; } ); // Simulation view linking property 'SizeX' for element 'panelFace2'
          _view.panelFace2.linkProperty("SizeZ",  function() { return faceZsize; }, function(_v) { faceZsize = _v; } ); // Simulation view linking property 'SizeZ' for element 'panelFace2'
          _view.panelFace2.linkProperty("SizeY",  function() { return faceYsize; }, function(_v) { faceYsize = _v; } ); // Simulation view linking property 'SizeY' for element 'panelFace2'
          _view.lines3D3.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[declinationAngle,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'lines3D3'
          _view.lines3D3.linkProperty("SizeX",  function() { return faceXsize; }, function(_v) { faceXsize = _v; } ); // Simulation view linking property 'SizeX' for element 'lines3D3'
          _view.lines3D3.linkProperty("SizeZ",  function() { return faceZsize; }, function(_v) { faceZsize = _v; } ); // Simulation view linking property 'SizeZ' for element 'lines3D3'
          _view.lines3D3.linkProperty("SizeY",  function() { return faceYsize; }, function(_v) { faceYsize = _v; } ); // Simulation view linking property 'SizeY' for element 'lines3D3'
          _view.lines3D22.linkProperty("Transformation",  function() { return rotationMatrix; }, function(_v) { rotationMatrix = _v; } ); // Simulation view linking property 'Transformation' for element 'lines3D22'
          _view.lines3D22.linkProperty("SizeX",  function() { return faceXsize; }, function(_v) { faceXsize = _v; } ); // Simulation view linking property 'SizeX' for element 'lines3D22'
          _view.lines3D22.linkProperty("SizeZ",  function() { return faceZsize; }, function(_v) { faceZsize = _v; } ); // Simulation view linking property 'SizeZ' for element 'lines3D22'
          _view.lines3D22.linkProperty("SizeY",  function() { return faceYsize; }, function(_v) { faceYsize = _v; } ); // Simulation view linking property 'SizeY' for element 'lines3D22'
          _view.panelusingParentTransformationTechnique.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[declinationAngle,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'panelusingParentTransformationTechnique'
          _view.panelusingParentTransformationTechnique.linkProperty("Z",  function() { return faceZpos; }, function(_v) { faceZpos = _v; } ); // Simulation view linking property 'Z' for element 'panelusingParentTransformationTechnique'
          _view.panelFace.linkProperty("Transformation",  function() { return [[0,1,0,0],[faceAngle,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'panelFace'
          _view.panelFace.linkProperty("SizeX",  function() { return faceXsize; }, function(_v) { faceXsize = _v; } ); // Simulation view linking property 'SizeX' for element 'panelFace'
          _view.panelFace.linkProperty("SizeZ",  function() { return faceZsize; }, function(_v) { faceZsize = _v; } ); // Simulation view linking property 'SizeZ' for element 'panelFace'
          _view.panelFace.linkProperty("SizeY",  function() { return faceYsize; }, function(_v) { faceYsize = _v; } ); // Simulation view linking property 'SizeY' for element 'panelFace'
          _view.lines3D.linkProperty("Transformation",  function() { return [[0,1,0,0],[faceAngle,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'lines3D'
          _view.lines3D.linkProperty("SizeX",  function() { return faceXsize; }, function(_v) { faceXsize = _v; } ); // Simulation view linking property 'SizeX' for element 'lines3D'
          _view.lines3D.linkProperty("SizeZ",  function() { return faceZsize; }, function(_v) { faceZsize = _v; } ); // Simulation view linking property 'SizeZ' for element 'lines3D'
          _view.lines3D.linkProperty("SizeY",  function() { return faceYsize; }, function(_v) { faceYsize = _v; } ); // Simulation view linking property 'SizeY' for element 'lines3D'
          _view.sun.linkProperty("X",  function() { return -sunXpos*2; } ); // Simulation view linking property 'X' for element 'sun'
          _view.sunSphere.linkProperty("Transformation",  function() { return [[0,1,0,0],[pi/2+sunAngle,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'sunSphere'
          _view.sunSphere.linkProperty("X",  function() { return sunXpos; }, function(_v) { sunXpos = _v; } ); // Simulation view linking property 'X' for element 'sunSphere'
          _view.lightRay.linkProperty("Transformation",  function() { return [[0,1,0,0],[pi/2+sunAngle,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'lightRay'
          _view.lightRay.linkProperty("X",  function() { return sunXpos; }, function(_v) { sunXpos = _v; } ); // Simulation view linking property 'X' for element 'lightRay'
          _view.analyticCurve3DSun.linkProperty("FunctionY",  function() { return functionY; }, function(_v) { functionY = _v; } ); // Simulation view linking property 'FunctionY' for element 'analyticCurve3DSun'
          _view.analyticCurve3DSun.linkProperty("FunctionX",  function() { return functionX; }, function(_v) { functionX = _v; } ); // Simulation view linking property 'FunctionX' for element 'analyticCurve3DSun'
          _view.analyticCurve3DSun.linkProperty("FunctionZ",  function() { return functionZ; }, function(_v) { functionZ = _v; } ); // Simulation view linking property 'FunctionZ' for element 'analyticCurve3DSun'
          _view.analyticCurve3DSun.linkProperty("MaxValue",  function() { return pi; }, function(_v) { pi = _v; } ); // Simulation view linking property 'MaxValue' for element 'analyticCurve3DSun'
          _view.sunSphere2.linkProperty("X",  function() { return sunRealPosX; }, function(_v) { sunRealPosX = _v; } ); // Simulation view linking property 'X' for element 'sunSphere2'
          _view.sunSphere2.linkProperty("Y",  function() { return sunRealPosY; }, function(_v) { sunRealPosY = _v; } ); // Simulation view linking property 'Y' for element 'sunSphere2'
          _view.sunSphere2.linkProperty("Z",  function() { return sunRealPosZ; }, function(_v) { sunRealPosZ = _v; } ); // Simulation view linking property 'Z' for element 'sunSphere2'
          _view.lightRay2.linkProperty("SizeX",  function() { return -Math.cos(sunRealAngle); } ); // Simulation view linking property 'SizeX' for element 'lightRay2'
          _view.lightRay2.linkProperty("X",  function() { return sunRealPosX; }, function(_v) { sunRealPosX = _v; } ); // Simulation view linking property 'X' for element 'lightRay2'
          _view.lightRay2.linkProperty("Y",  function() { return sunRealPosY; }, function(_v) { sunRealPosY = _v; } ); // Simulation view linking property 'Y' for element 'lightRay2'
          _view.lightRay2.linkProperty("SizeZ",  function() { return -Math.sin(sunRealAngle); } ); // Simulation view linking property 'SizeZ' for element 'lightRay2'
          _view.lightRay2.linkProperty("Z",  function() { return sunRealPosZ; }, function(_v) { sunRealPosZ = _v; } ); // Simulation view linking property 'Z' for element 'lightRay2'
          _view.lightRay2.linkProperty("SizeY",  function() { return -Math.sin(sunRealPosY); } ); // Simulation view linking property 'SizeY' for element 'lightRay2'
          _view.group3D.linkProperty("X",  function() { return sunRealPosX; }, function(_v) { sunRealPosX = _v; } ); // Simulation view linking property 'X' for element 'group3D'
          _view.group3D.linkProperty("Y",  function() { return sunRealPosY; }, function(_v) { sunRealPosY = _v; } ); // Simulation view linking property 'Y' for element 'group3D'
          _view.group3D.linkProperty("Z",  function() { return sunRealPosZ; }, function(_v) { sunRealPosZ = _v; } ); // Simulation view linking property 'Z' for element 'group3D'
          _view.text3D.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[-pi/2,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'text3D'
          _view.text3D.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // Simulation view linking property 'Font' for element 'text3D'
          _view.E.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[-pi/2,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'E'
          _view.cloud.linkProperty("Visibility",  function() { return optionState==="Cloudy"||optionState==="Rainy"; } ); // Simulation view linking property 'Visibility' for element 'cloud'
          _view.cloud.linkProperty("Text",  function() { return cloudRainText; }, function(_v) { cloudRainText = _v; } ); // Simulation view linking property 'Text' for element 'cloud'
          _view.cloud.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // Simulation view linking property 'Font' for element 'cloud'
          _view.object3DCloud.linkProperty("Transformation",  function() { return [[pi/2,1,0,0],[pi/2,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'object3DCloud'
          _view.object3DCloud.linkProperty("Visibility",  function() { return optionState=="Cloudy"||showWhat==1; } ); // Simulation view linking property 'Visibility' for element 'object3DCloud'
          _view.object3DCloud2.linkProperty("Transformation",  function() { return [[pi/2,1,0,0],[pi/2,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'object3DCloud2'
          _view.object3DCloud2.linkProperty("Visibility",  function() { return optionState=="Cloudy"||showWhat==1; } ); // Simulation view linking property 'Visibility' for element 'object3DCloud2'
          _view.object3DRainy.linkProperty("Transformation",  function() { return [[pi/2,1,0,0],[pi/2,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'object3DRainy'
          _view.object3DRainy.linkProperty("Visibility",  function() { return optionState=="Rainy"||showWhat==2; } ); // Simulation view linking property 'Visibility' for element 'object3DRainy'
          _view.object3DRain.linkProperty("Transformation",  function() { return [[pi/2,1,0,0],[pi/2,0,1,0],[0,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'object3DRain'
          _view.object3DRain.linkProperty("Visibility",  function() { return optionState=="Rainy"||showWhat==2; } ); // Simulation view linking property 'Visibility' for element 'object3DRain'
          _view.W.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[-pi/2,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'W'
          _view.W2.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[-pi/2,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'W2'
          _view.S.linkProperty("Transformation",  function() { return [[0,1,0,0],[0,0,1,0],[-pi/2,0,0,1]]; } ); // Simulation view linking property 'Transformation' for element 'S'
          _view.graph.linkProperty("Width",  function() { return Width2; }, function(_v) { Width2 = _v; } ); // Simulation view linking property 'Width' for element 'graph'
          _view.graph.linkProperty("TRMessage",  function() { return "incident intensity of sunlight on the solar panel = "+powerCollected.toFixed(2)+ " kW/m²"; } ); // Simulation view linking property 'TRMessage' for element 'graph'
          _view.graph.linkProperty("Display",  function() { return displayGraph; }, function(_v) { displayGraph = _v; } ); // Simulation view linking property 'Display' for element 'graph'
          _view.trail.linkProperty("LineColor",  function() { return memoryColor; }, function(_v) { memoryColor = _v; } ); // Simulation view linking property 'LineColor' for element 'trail'
          _view.trail.linkProperty("InputX",  function() { return clockTime; }, function(_v) { clockTime = _v; } ); // Simulation view linking property 'InputX' for element 'trail'
          _view.trail.linkProperty("InputY",  function() { return powerCollected; }, function(_v) { powerCollected = _v; } ); // Simulation view linking property 'InputY' for element 'trail'
          _view.shape.linkProperty("X",  function() { return clockTime; }, function(_v) { clockTime = _v; } ); // Simulation view linking property 'X' for element 'shape'
          _view.shape.linkProperty("Y",  function() { return powerCollected; }, function(_v) { powerCollected = _v; } ); // Simulation view linking property 'Y' for element 'shape'
          _view.textSet.linkProperty("X",  function() { return textSetX; }, function(_v) { textSetX = _v; } ); // Simulation view linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return textSetY; }, function(_v) { textSetY = _v; } ); // Simulation view linking property 'Y' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return textSet; }, function(_v) { textSet = _v; } ); // Simulation view linking property 'Text' for element 'textSet'
          _view.textSet.linkProperty("Visibility",  function() { return textSetShow&&labelShow; } ); // Simulation view linking property 'Visibility' for element 'textSet'
          _view.fieldt.linkProperty("Value",  function() { return t; }, function(_v) { t = _v; } ); // Simulation view linking property 'Value' for element 'fieldt'
          _view.fieldclockt.linkProperty("Value",  function() { return clockTime; }, function(_v) { clockTime = _v; } ); // Simulation view linking property 'Value' for element 'fieldclockt'
          _view.fieldclockSmodule.linkProperty("Value",  function() { return sModule; }, function(_v) { sModule = _v; } ); // Simulation view linking property 'Value' for element 'fieldclockSmodule'
          _view.field.linkProperty("Value",  function() { return sunRealAngle; }, function(_v) { sunRealAngle = _v; } ); // Simulation view linking property 'Value' for element 'field'
          _view.field2.linkProperty("Value",  function() { return declinationAngle; }, function(_v) { declinationAngle = _v; } ); // Simulation view linking property 'Value' for element 'field2'
          _view.field22.linkProperty("Value",  function() { return powerCollected; }, function(_v) { powerCollected = _v; } ); // Simulation view linking property 'Value' for element 'field22'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(20);
  _model.setStepsPerDisplay(5);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function SolarPanelTry6_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = SolarPanelTry6_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Description','./SolarPanelTry6_Intro_1.html');

  return _view;
} // end of main function

function SolarPanelTry6_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.Simulation view: declaration of element 'fullscreen'
      .setProperty("Width","Width") // EJsS HtmlView.Simulation view: setting property 'Width' for element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.Simulation view: declaration of element 'control'
      .setProperty("Width","100%") // EJsS HtmlView.Simulation view: setting property 'Width' for element 'control'
      .setProperty("BorderColor","Black") // EJsS HtmlView.Simulation view: setting property 'BorderColor' for element 'control'
      .setProperty("BorderWidth","1") // EJsS HtmlView.Simulation view: setting property 'BorderWidth' for element 'control'
      .setProperty("Display","inline-flex") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"day2", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'day2'
      .setProperty("Background","Magenta") // EJsS HtmlView.Simulation view: setting property 'Background' for element 'day2'
      .setProperty("Display","inline-block") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'day2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"day", _view.day2) // EJsS HtmlView.Simulation view: declaration of element 'day'
      .setProperty("Tooltip","d is the day of the year with Jan 1 as d = 1") // EJsS HtmlView.Simulation view: setting property 'Tooltip' for element 'day'
      .setProperty("Foreground","White") // EJsS HtmlView.Simulation view: setting property 'Foreground' for element 'day'
      .setProperty("Text","Day = ") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'day'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"Day", _view.day2) // EJsS HtmlView.Simulation view: declaration of element 'Day'
      .setProperty("Width","3vw") // EJsS HtmlView.Simulation view: setting property 'Width' for element 'Day'
      .setProperty("Format","000") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'Day'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"angle", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'angle'
      .setProperty("Width","50%") // EJsS HtmlView.Simulation view: setting property 'Width' for element 'angle'
      .setProperty("Background","LightGray") // EJsS HtmlView.Simulation view: setting property 'Background' for element 'angle'
      .setProperty("Foreground","Black") // EJsS HtmlView.Simulation view: setting property 'Foreground' for element 'angle'
      .setProperty("Display","inline-flex") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'angle'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"Title", _view.angle) // EJsS HtmlView.Simulation view: declaration of element 'Title'
      .setProperty("Foreground","Black") // EJsS HtmlView.Simulation view: setting property 'Foreground' for element 'Title'
      .setProperty("Text","Angle of Solar Panel =  ") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'Title'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"Angle", _view.angle) // EJsS HtmlView.Simulation view: declaration of element 'Angle'
      .setProperty("Width","3vw") // EJsS HtmlView.Simulation view: setting property 'Width' for element 'Angle'
      .setProperty("Format","000") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'Angle'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"deg", _view.angle) // EJsS HtmlView.Simulation view: declaration of element 'deg'
      .setProperty("Foreground","Black") // EJsS HtmlView.Simulation view: setting property 'Foreground' for element 'deg'
      .setProperty("Text","°") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'deg'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider", _view.angle) // EJsS HtmlView.Simulation view: declaration of element 'slider'
      .setProperty("Width","50%") // EJsS HtmlView.Simulation view: setting property 'Width' for element 'slider'
      .setProperty("Foreground","White") // EJsS HtmlView.Simulation view: setting property 'Foreground' for element 'slider'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'checkBox'
      .setProperty("Text","Label?") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'comboBox'
      .setProperty("Display","none") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox2", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'comboBox2'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'playPauseButton2'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.Simulation view: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.Simulation view: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.Simulation view: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"initialize", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'initialize'
      .setProperty("Text","Store Data") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'initialize'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'resetButton3'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.Simulation view: setting property 'Tooltip' for element 'resetButton3'
      .setProperty("Text","Reset↻") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"DisplayGraph", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'DisplayGraph'
      .setProperty("Foreground","White") // EJsS HtmlView.Simulation view: setting property 'Foreground' for element 'DisplayGraph'
      .setProperty("Text","Display Graph?") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'DisplayGraph'
      .setProperty("Display","NONE") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'DisplayGraph'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"sunAngle", _view.control) // EJsS HtmlView.Simulation view: declaration of element 'sunAngle'
      .setProperty("Display","none") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'sunAngle'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"simulationPanel", _view.fullscreen) // EJsS HtmlView.Simulation view: declaration of element 'simulationPanel'
      .setProperty("Height","100%") // EJsS HtmlView.Simulation view: setting property 'Height' for element 'simulationPanel'
      .setProperty("Width","100%") // EJsS HtmlView.Simulation view: setting property 'Width' for element 'simulationPanel'
      .setProperty("BorderColor","Black") // EJsS HtmlView.Simulation view: setting property 'BorderColor' for element 'simulationPanel'
      ;

    _view._addElement(EJSS_DRAWING3D.drawingPanel,"drawingPanel3D", _view.simulationPanel) // EJsS HtmlView.Simulation view: declaration of element 'drawingPanel3D'
      .setProperty("Draggable","AZIMUTH") // EJsS HtmlView.Simulation view: setting property 'Draggable' for element 'drawingPanel3D'
      .setProperty("CameraZoomRate",1.1) // EJsS HtmlView.Simulation view: setting property 'CameraZoomRate' for element 'drawingPanel3D'
      .setProperty("Projection","PERSPECTIVE_ON") // EJsS HtmlView.Simulation view: setting property 'Projection' for element 'drawingPanel3D'
      .setProperty("Enabled",true) // EJsS HtmlView.Simulation view: setting property 'Enabled' for element 'drawingPanel3D'
      .setProperty("DecorationType","NONE") // EJsS HtmlView.Simulation view: setting property 'DecorationType' for element 'drawingPanel3D'
      ;

    _view._addElement(EJSS_DRAWING3D.cone,"cone3D", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'cone3D'
      .setProperty("SizeX",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'cone3D'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'cone3D'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'cone3D'
      .setProperty("Z",-0.05) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'cone3D'
      .setProperty("SizeZ",0.1) // EJsS HtmlView.Simulation view: setting property 'SizeZ' for element 'cone3D'
      .setProperty("SizeY",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'cone3D'
      ;

    _view._addElement(EJSS_DRAWING3D.disk,"platform", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'platform'
      .setProperty("BottomRadius",2) // EJsS HtmlView.Simulation view: setting property 'BottomRadius' for element 'platform'
      .setProperty("FillColor","Green") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'platform'
      .setProperty("SizeX",1) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'platform'
      .setProperty("Z",-0.1) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'platform'
      .setProperty("SizeY",1) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'platform'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"panelhide", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'panelhide'
      .setProperty("Visibility",false) // EJsS HtmlView.Simulation view: setting property 'Visibility' for element 'panelhide'
      ;

    _view._addElement(EJSS_DRAWING3D.box,"panelFace2", _view.panelhide) // EJsS HtmlView.Simulation view: declaration of element 'panelFace2'
      .setProperty("FillColor","Blue") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'panelFace2'
      .setProperty("LineColor","Black") // EJsS HtmlView.Simulation view: setting property 'LineColor' for element 'panelFace2'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'panelFace2'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'panelFace2'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'panelFace2'
      .setProperty("DrawLines",true) // EJsS HtmlView.Simulation view: setting property 'DrawLines' for element 'panelFace2'
      .setProperty("ClosedTop",false) // EJsS HtmlView.Simulation view: setting property 'ClosedTop' for element 'panelFace2'
      ;

    _view._addElement(EJSS_DRAWING3D.plane,"lines3D3", _view.panelhide) // EJsS HtmlView.Simulation view: declaration of element 'lines3D3'
      .setProperty("FillColor","Blue") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'lines3D3'
      .setProperty("LineColor","White") // EJsS HtmlView.Simulation view: setting property 'LineColor' for element 'lines3D3'
      .setProperty("DrawLines",true) // EJsS HtmlView.Simulation view: setting property 'DrawLines' for element 'lines3D3'
      .setProperty("LineWidth",2) // EJsS HtmlView.Simulation view: setting property 'LineWidth' for element 'lines3D3'
      ;

    _view._addElement(EJSS_DRAWING3D.plane,"lines3D22", _view.panelhide) // EJsS HtmlView.Simulation view: declaration of element 'lines3D22'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'lines3D22'
      .setProperty("LineColor","White") // EJsS HtmlView.Simulation view: setting property 'LineColor' for element 'lines3D22'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'lines3D22'
      .setProperty("DrawLines",true) // EJsS HtmlView.Simulation view: setting property 'DrawLines' for element 'lines3D22'
      .setProperty("LineWidth",2) // EJsS HtmlView.Simulation view: setting property 'LineWidth' for element 'lines3D22'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"panelusingParentTransformationTechnique", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'panelusingParentTransformationTechnique'
      ;

    _view._addElement(EJSS_DRAWING3D.box,"panelFace", _view.panelusingParentTransformationTechnique) // EJsS HtmlView.Simulation view: declaration of element 'panelFace'
      .setProperty("FillColor","Blue") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'panelFace'
      .setProperty("LineColor","Black") // EJsS HtmlView.Simulation view: setting property 'LineColor' for element 'panelFace'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'panelFace'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'panelFace'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'panelFace'
      .setProperty("DrawLines",true) // EJsS HtmlView.Simulation view: setting property 'DrawLines' for element 'panelFace'
      .setProperty("ClosedTop",false) // EJsS HtmlView.Simulation view: setting property 'ClosedTop' for element 'panelFace'
      ;

    _view._addElement(EJSS_DRAWING3D.plane,"lines3D", _view.panelusingParentTransformationTechnique) // EJsS HtmlView.Simulation view: declaration of element 'lines3D'
      .setProperty("FillColor","Blue") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'lines3D'
      .setProperty("LineColor","White") // EJsS HtmlView.Simulation view: setting property 'LineColor' for element 'lines3D'
      .setProperty("DrawLines",true) // EJsS HtmlView.Simulation view: setting property 'DrawLines' for element 'lines3D'
      .setProperty("LineWidth",2) // EJsS HtmlView.Simulation view: setting property 'LineWidth' for element 'lines3D'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"hidden", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'hidden'
      .setProperty("Visibility",false) // EJsS HtmlView.Simulation view: setting property 'Visibility' for element 'hidden'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"sun", _view.hidden) // EJsS HtmlView.Simulation view: declaration of element 'sun'
      ;

    _view._addElement(EJSS_DRAWING3D.sphere,"sunSphere", _view.sun) // EJsS HtmlView.Simulation view: declaration of element 'sunSphere'
      .setProperty("Radius",0.1) // EJsS HtmlView.Simulation view: setting property 'Radius' for element 'sunSphere'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'sunSphere'
      .setProperty("SpecularColor","Orange") // EJsS HtmlView.Simulation view: setting property 'SpecularColor' for element 'sunSphere'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"lightRay", _view.sun) // EJsS HtmlView.Simulation view: declaration of element 'lightRay'
      .setProperty("FillColor","Orange") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'lightRay'
      .setProperty("SizeX",1) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'lightRay'
      .setProperty("SizeZ",1) // EJsS HtmlView.Simulation view: setting property 'SizeZ' for element 'lightRay'
      ;

    _view._addElement(EJSS_DRAWING3D.analyticCurve,"analyticCurve3DSun", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'analyticCurve3DSun'
      .setProperty("NumPoints",360) // EJsS HtmlView.Simulation view: setting property 'NumPoints' for element 'analyticCurve3DSun'
      .setProperty("Variable","cta") // EJsS HtmlView.Simulation view: setting property 'Variable' for element 'analyticCurve3DSun'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.Simulation view: setting property 'LineColor' for element 'analyticCurve3DSun'
      .setProperty("MinValue",0) // EJsS HtmlView.Simulation view: setting property 'MinValue' for element 'analyticCurve3DSun'
      .setProperty("LineWidth",10) // EJsS HtmlView.Simulation view: setting property 'LineWidth' for element 'analyticCurve3DSun'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"sunRealCoordinates", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'sunRealCoordinates'
      ;

    _view._addElement(EJSS_DRAWING3D.sphere,"sunSphere2", _view.sunRealCoordinates) // EJsS HtmlView.Simulation view: declaration of element 'sunSphere2'
      .setProperty("Radius",0.1) // EJsS HtmlView.Simulation view: setting property 'Radius' for element 'sunSphere2'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'sunSphere2'
      .setProperty("Transparency",0.5) // EJsS HtmlView.Simulation view: setting property 'Transparency' for element 'sunSphere2'
      .setProperty("SpecularColor","Orange") // EJsS HtmlView.Simulation view: setting property 'SpecularColor' for element 'sunSphere2'
      ;

    _view._addElement(EJSS_DRAWING3D.arrow,"lightRay2", _view.sunRealCoordinates) // EJsS HtmlView.Simulation view: declaration of element 'lightRay2'
      .setProperty("FillColor","Orange") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'lightRay2'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"group3D", _view.sunRealCoordinates) // EJsS HtmlView.Simulation view: declaration of element 'group3D'
      ;

    _view._addElement(EJSS_DRAWING3D.text,"text3D", _view.group3D) // EJsS HtmlView.Simulation view: declaration of element 'text3D'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'text3D'
      .setProperty("FontColor","Black") // EJsS HtmlView.Simulation view: setting property 'FontColor' for element 'text3D'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'text3D'
      .setProperty("Text","Sun") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'text3D'
      .setProperty("Z",0.1) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'text3D'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"directions", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'directions'
      .setProperty("X",1) // EJsS HtmlView.Simulation view: setting property 'X' for element 'directions'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'directions'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'directions'
      ;

    _view._addElement(EJSS_DRAWING3D.text,"E", _view.directions) // EJsS HtmlView.Simulation view: declaration of element 'E'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'E'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'E'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'E'
      .setProperty("Text","East") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'E'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"group3D2", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'group3D2'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'group3D2'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"hide", _view.group3D2) // EJsS HtmlView.Simulation view: declaration of element 'hide'
      .setProperty("Visibility",false) // EJsS HtmlView.Simulation view: setting property 'Visibility' for element 'hide'
      ;

    _view._addElement(EJSS_DRAWING3D.text,"cloud", _view.hide) // EJsS HtmlView.Simulation view: declaration of element 'cloud'
      .setProperty("SizeX",1) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'cloud'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'cloud'
      .setProperty("FontColor","Gray") // EJsS HtmlView.Simulation view: setting property 'FontColor' for element 'cloud'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'cloud'
      .setProperty("SizeZ",1) // EJsS HtmlView.Simulation view: setting property 'SizeZ' for element 'cloud'
      .setProperty("Z",0.5) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'cloud'
      .setProperty("SizeY",1) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'cloud'
      ;

    _view._addElement(EJSS_DRAWING3D.basic,"object3DCloud", _view.group3D2) // EJsS HtmlView.Simulation view: declaration of element 'object3DCloud'
      .setProperty("FillColor","White") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'object3DCloud'
      .setProperty("Description","./obj/cloud.js") // EJsS HtmlView.Simulation view: setting property 'Description' for element 'object3DCloud'
      .setProperty("SizeX",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'object3DCloud'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'object3DCloud'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'object3DCloud'
      .setProperty("Z",0.2) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'object3DCloud'
      .setProperty("SizeZ",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeZ' for element 'object3DCloud'
      .setProperty("SizeY",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'object3DCloud'
      ;

    _view._addElement(EJSS_DRAWING3D.basic,"object3DCloud2", _view.group3D2) // EJsS HtmlView.Simulation view: declaration of element 'object3DCloud2'
      .setProperty("FillColor","LightGray") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'object3DCloud2'
      .setProperty("Description","./obj/cloud.js") // EJsS HtmlView.Simulation view: setting property 'Description' for element 'object3DCloud2'
      .setProperty("SizeX",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'object3DCloud2'
      .setProperty("X",0.2) // EJsS HtmlView.Simulation view: setting property 'X' for element 'object3DCloud2'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'object3DCloud2'
      .setProperty("Z",0.2) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'object3DCloud2'
      .setProperty("SizeZ",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeZ' for element 'object3DCloud2'
      .setProperty("SizeY",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'object3DCloud2'
      ;

    _view._addElement(EJSS_DRAWING3D.basic,"object3DRainy", _view.group3D2) // EJsS HtmlView.Simulation view: declaration of element 'object3DRainy'
      .setProperty("FillColor","White") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'object3DRainy'
      .setProperty("Description","./obj/Raincloud.js") // EJsS HtmlView.Simulation view: setting property 'Description' for element 'object3DRainy'
      .setProperty("SizeX",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'object3DRainy'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'object3DRainy'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'object3DRainy'
      .setProperty("Z",0.15) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'object3DRainy'
      .setProperty("SizeZ",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeZ' for element 'object3DRainy'
      .setProperty("SizeY",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'object3DRainy'
      ;

    _view._addElement(EJSS_DRAWING3D.basic,"object3DRain", _view.group3D2) // EJsS HtmlView.Simulation view: declaration of element 'object3DRain'
      .setProperty("FillColor","LightGray") // EJsS HtmlView.Simulation view: setting property 'FillColor' for element 'object3DRain'
      .setProperty("Description","./obj/Raincloud.js") // EJsS HtmlView.Simulation view: setting property 'Description' for element 'object3DRain'
      .setProperty("SizeX",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'object3DRain'
      .setProperty("X",0.2) // EJsS HtmlView.Simulation view: setting property 'X' for element 'object3DRain'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'object3DRain'
      .setProperty("Z",0.15) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'object3DRain'
      .setProperty("SizeZ",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeZ' for element 'object3DRain'
      .setProperty("SizeY",0.01) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'object3DRain'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"directions2", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'directions2'
      .setProperty("X",-1) // EJsS HtmlView.Simulation view: setting property 'X' for element 'directions2'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'directions2'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'directions2'
      ;

    _view._addElement(EJSS_DRAWING3D.text,"W", _view.directions2) // EJsS HtmlView.Simulation view: declaration of element 'W'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'W'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'W'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'W'
      .setProperty("Text","West") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'W'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"directions22", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'directions22'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'directions22'
      .setProperty("Y",1) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'directions22'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'directions22'
      ;

    _view._addElement(EJSS_DRAWING3D.text,"W2", _view.directions22) // EJsS HtmlView.Simulation view: declaration of element 'W2'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'W2'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'W2'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'W2'
      .setProperty("Text","North") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'W2'
      ;

    _view._addElement(EJSS_DRAWING3D.group,"directions222", _view.drawingPanel3D) // EJsS HtmlView.Simulation view: declaration of element 'directions222'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'directions222'
      .setProperty("Y",-1) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'directions222'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'directions222'
      ;

    _view._addElement(EJSS_DRAWING3D.text,"S", _view.directions222) // EJsS HtmlView.Simulation view: declaration of element 'S'
      .setProperty("X",0) // EJsS HtmlView.Simulation view: setting property 'X' for element 'S'
      .setProperty("Y",0) // EJsS HtmlView.Simulation view: setting property 'Y' for element 'S'
      .setProperty("Z",0) // EJsS HtmlView.Simulation view: setting property 'Z' for element 'S'
      .setProperty("Text","South") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'S'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"graph", _view.simulationPanel) // EJsS HtmlView.Simulation view: declaration of element 'graph'
      .setProperty("Height","90vh") // EJsS HtmlView.Simulation view: setting property 'Height' for element 'graph'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.Simulation view: setting property 'ShowAreaRectangle' for element 'graph'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.Simulation view: setting property 'Gutters' for element 'graph'
      .setProperty("YScalePrecision",1) // EJsS HtmlView.Simulation view: setting property 'YScalePrecision' for element 'graph'
      .setProperty("XFixedTick",0) // EJsS HtmlView.Simulation view: setting property 'XFixedTick' for element 'graph'
      .setProperty("YFixedTick",0) // EJsS HtmlView.Simulation view: setting property 'YFixedTick' for element 'graph'
      .setProperty("XTickStep",1) // EJsS HtmlView.Simulation view: setting property 'XTickStep' for element 'graph'
      .setProperty("YTickStep",0.1) // EJsS HtmlView.Simulation view: setting property 'YTickStep' for element 'graph'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.Simulation view: setting property 'XAutoTicks' for element 'graph'
      .setProperty("TLMessage","Simplified 3D Model of a Solar Panel") // EJsS HtmlView.Simulation view: setting property 'TLMessage' for element 'graph'
      .setProperty("Title","Solar Power Collected") // EJsS HtmlView.Simulation view: setting property 'Title' for element 'graph'
      .setProperty("Enabled",true) // EJsS HtmlView.Simulation view: setting property 'Enabled' for element 'graph'
      .setProperty("MaximumY",1.2) // EJsS HtmlView.Simulation view: setting property 'MaximumY' for element 'graph'
      .setProperty("MaximumX",24) // EJsS HtmlView.Simulation view: setting property 'MaximumX' for element 'graph'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.Simulation view: setting property 'YAutoTicks' for element 'graph'
      .setProperty("MinimumX",0) // EJsS HtmlView.Simulation view: setting property 'MinimumX' for element 'graph'
      .setProperty("MinimumY",0) // EJsS HtmlView.Simulation view: setting property 'MinimumY' for element 'graph'
      .setProperty("TitleY","Incident intensity of sunlight on the solar panel (kW/m²)") // EJsS HtmlView.Simulation view: setting property 'TitleY' for element 'graph'
      .setProperty("TitleX","Time of day, t (hour)") // EJsS HtmlView.Simulation view: setting property 'TitleX' for element 'graph'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.Simulation view: setting property 'AutoScaleY' for element 'graph'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.Simulation view: setting property 'AutoScaleX' for element 'graph'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.Simulation view: setting property 'XScalePrecision' for element 'graph'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail", _view.graph) // EJsS HtmlView.Simulation view: declaration of element 'trail'
      .setProperty("NoRepeat",true) // EJsS HtmlView.Simulation view: setting property 'NoRepeat' for element 'trail'
      .setProperty("LineWidth",2) // EJsS HtmlView.Simulation view: setting property 'LineWidth' for element 'trail'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape", _view.graph) // EJsS HtmlView.Simulation view: declaration of element 'shape'
      .setProperty("SizeX",15) // EJsS HtmlView.Simulation view: setting property 'SizeX' for element 'shape'
      .setProperty("SizeY",15) // EJsS HtmlView.Simulation view: setting property 'SizeY' for element 'shape'
      .setProperty("PixelSize",true) // EJsS HtmlView.Simulation view: setting property 'PixelSize' for element 'shape'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.graph) // EJsS HtmlView.Simulation view: declaration of element 'textSet'
      .setProperty("NumberOfElements",3) // EJsS HtmlView.Simulation view: setting property 'NumberOfElements' for element 'textSet'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.Simulation view: setting property 'EnabledPosition' for element 'textSet'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"display", _view.fullscreen) // EJsS HtmlView.Simulation view: declaration of element 'display'
      .setProperty("Display","none") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'display'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"t", _view.display) // EJsS HtmlView.Simulation view: declaration of element 't'
      .setProperty("Text","t = ") // EJsS HtmlView.Simulation view: setting property 'Text' for element 't'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"fieldt", _view.display) // EJsS HtmlView.Simulation view: declaration of element 'fieldt'
      .setProperty("Format","0.00") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'fieldt'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"clockt", _view.display) // EJsS HtmlView.Simulation view: declaration of element 'clockt'
      .setProperty("Text","time = ") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'clockt'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"fieldclockt", _view.display) // EJsS HtmlView.Simulation view: declaration of element 'fieldclockt'
      .setProperty("Format","0.00") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'fieldclockt'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"outputPower", _view.display) // EJsS HtmlView.Simulation view: declaration of element 'outputPower'
      .setProperty("Text","Output power = ") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'outputPower'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"fieldclockSmodule", _view.display) // EJsS HtmlView.Simulation view: declaration of element 'fieldclockSmodule'
      .setProperty("Format","0.000") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'fieldclockSmodule'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"debugdisplay", _view.fullscreen) // EJsS HtmlView.Simulation view: declaration of element 'debugdisplay'
      .setProperty("Display","none") // EJsS HtmlView.Simulation view: setting property 'Display' for element 'debugdisplay'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.debugdisplay) // EJsS HtmlView.Simulation view: declaration of element 'label'
      .setProperty("Text","sunRealAngle=") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field", _view.debugdisplay) // EJsS HtmlView.Simulation view: declaration of element 'field'
      .setProperty("Format","0.00") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'field'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label2", _view.debugdisplay) // EJsS HtmlView.Simulation view: declaration of element 'label2'
      .setProperty("Text","declinationAngle=") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'label2'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field2", _view.debugdisplay) // EJsS HtmlView.Simulation view: declaration of element 'field2'
      .setProperty("Format","0.00") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'field2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label22", _view.debugdisplay) // EJsS HtmlView.Simulation view: declaration of element 'label22'
      .setProperty("Text","powerCollected") // EJsS HtmlView.Simulation view: setting property 'Text' for element 'label22'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field22", _view.debugdisplay) // EJsS HtmlView.Simulation view: declaration of element 'field22'
      .setProperty("Format","0.00") // EJsS HtmlView.Simulation view: setting property 'Format' for element 'field22'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.fullscreen) // EJsS HtmlView.Simulation view: declaration of element 'html'
      .setProperty("Html","<h2>Solar Panel Simulation</h2> <p>Experience the power of renewable energy with our solar panel simulation!</p> <p>Our simulation allows you to explore the functionality and efficiency of solar panels in various conditions. Witness how solar panels harness sunlight and convert it into electricity, providing clean and sustainable energy for your needs.</p> <p>Adjust parameters such as day of the year 1 means January 1, declinationAngle = (23.45*pi/180) * Math.sin( (2*pi/365)*(284+day) ) automate orientate towards the Sun's position at 6 a.m., and angle of tilt, faceAngle to see how these factors affect energy production. Visualize real-time data on incident intensity of sunlight in different conditions such as Sunny, Cloudy, Rainy and Real Data where a mix of different conditions in observed over different times, helping you make informed decisions about solar panel installation and usage.</p> <p>Our solar panel simulation offers an interactive and educational experience to deepen your understanding of solar technology and its environmental benefits.</p> <p>Step into the world of solar energy with our simulation and embark on a journey towards a greener future!</p>") // EJsS HtmlView.Simulation view: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new SolarPanelTry6("_topFrame","_ejs_library/",null);
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
