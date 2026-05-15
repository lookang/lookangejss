/* _inputParameters: an object with different values for the model parameters */
function transpiration_sec(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var pi; // EjsS Model.Variables.Var Table.pi
  var font; // EjsS Model.Variables.Var Table.font
  var n; // EjsS Model.Variables.Var Table.n
  var angle; // EjsS Model.Variables.Var Table.angle

  var rulerX; // EjsS Model.Variables.circle.rulerX
  var rulerY; // EjsS Model.Variables.circle.rulerY
  var rulerSizeX; // EjsS Model.Variables.circle.rulerSizeX
  var rulerSizeY; // EjsS Model.Variables.circle.rulerSizeY
  var x; // EjsS Model.Variables.circle.x
  var y; // EjsS Model.Variables.circle.y
  var theta; // EjsS Model.Variables.circle.theta
  var clockX; // EjsS Model.Variables.circle.clockX
  var clockY; // EjsS Model.Variables.circle.clockY
  var clockHourSize; // EjsS Model.Variables.circle.clockHourSize
  var clockMinSize; // EjsS Model.Variables.circle.clockMinSize
  var clockSize; // EjsS Model.Variables.circle.clockSize
  var clockHourAngle; // EjsS Model.Variables.circle.clockHourAngle
  var clockMinAngle; // EjsS Model.Variables.circle.clockMinAngle
  var imageURL; // EjsS Model.Variables.circle.imageURL
  var temperatureText; // EjsS Model.Variables.circle.temperatureText
  var bubbleX; // EjsS Model.Variables.circle.bubbleX
  var bubbleY; // EjsS Model.Variables.circle.bubbleY
  var bubblevX; // EjsS Model.Variables.circle.bubblevX

  var dataTime; // EjsS Model.Variables.data.dataTime
  var dataControl; // EjsS Model.Variables.data.dataControl
  var dataLight; // EjsS Model.Variables.data.dataLight
  var dataWind; // EjsS Model.Variables.data.dataWind
  var dataTemp; // EjsS Model.Variables.data.dataTemp
  var dataHumidity; // EjsS Model.Variables.data.dataHumidity
  var datatable; // EjsS Model.Variables.data.datatable
  var datatableStore; // EjsS Model.Variables.data.datatableStore

  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var world; // EjsS Model.Variables.layout.world
  var graph; // EjsS Model.Variables.layout.graph
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var disabled; // EjsS Model.Variables.layout.disabled

  var imageSizeX; // EjsS Model.Variables.cells.imageSizeX
  var imageSizeY; // EjsS Model.Variables.cells.imageSizeY
  var offSetX; // EjsS Model.Variables.cells.offSetX
  var xmin; // EjsS Model.Variables.cells.xmin
  var xmax; // EjsS Model.Variables.cells.xmax
  var ymin; // EjsS Model.Variables.cells.ymin
  var ymax; // EjsS Model.Variables.cells.ymax

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
      t : t,
      dt : dt,
      pi : pi,
      font : font,
      n : n,
      angle : angle,
      rulerX : rulerX,
      rulerY : rulerY,
      rulerSizeX : rulerSizeX,
      rulerSizeY : rulerSizeY,
      x : x,
      y : y,
      theta : theta,
      clockX : clockX,
      clockY : clockY,
      clockHourSize : clockHourSize,
      clockMinSize : clockMinSize,
      clockSize : clockSize,
      clockHourAngle : clockHourAngle,
      clockMinAngle : clockMinAngle,
      imageURL : imageURL,
      temperatureText : temperatureText,
      bubbleX : bubbleX,
      bubbleY : bubbleY,
      bubblevX : bubblevX,
      dataTime : dataTime,
      dataControl : dataControl,
      dataLight : dataLight,
      dataWind : dataWind,
      dataTemp : dataTemp,
      dataHumidity : dataHumidity,
      datatable : datatable,
      datatableStore : datatableStore,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled,
      imageSizeX : imageSizeX,
      imageSizeY : imageSizeY,
      offSetX : offSetX,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      t : t,
      dt : dt,
      pi : pi,
      font : font,
      n : n,
      angle : angle,
      rulerX : rulerX,
      rulerY : rulerY,
      rulerSizeX : rulerSizeX,
      rulerSizeY : rulerSizeY,
      x : x,
      y : y,
      theta : theta,
      clockX : clockX,
      clockY : clockY,
      clockHourSize : clockHourSize,
      clockMinSize : clockMinSize,
      clockSize : clockSize,
      clockHourAngle : clockHourAngle,
      clockMinAngle : clockMinAngle,
      imageURL : imageURL,
      temperatureText : temperatureText,
      bubbleX : bubbleX,
      bubbleY : bubbleY,
      bubblevX : bubblevX,
      dataTime : dataTime,
      dataControl : dataControl,
      dataLight : dataLight,
      dataWind : dataWind,
      dataTemp : dataTemp,
      dataHumidity : dataHumidity,
      datatableStore : datatableStore,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled,
      imageSizeX : imageSizeX,
      imageSizeY : imageSizeY,
      offSetX : offSetX,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.rulerX != "undefined") rulerX = json.rulerX;
    if(typeof json.rulerY != "undefined") rulerY = json.rulerY;
    if(typeof json.rulerSizeX != "undefined") rulerSizeX = json.rulerSizeX;
    if(typeof json.rulerSizeY != "undefined") rulerSizeY = json.rulerSizeY;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.theta != "undefined") theta = json.theta;
    if(typeof json.clockX != "undefined") clockX = json.clockX;
    if(typeof json.clockY != "undefined") clockY = json.clockY;
    if(typeof json.clockHourSize != "undefined") clockHourSize = json.clockHourSize;
    if(typeof json.clockMinSize != "undefined") clockMinSize = json.clockMinSize;
    if(typeof json.clockSize != "undefined") clockSize = json.clockSize;
    if(typeof json.clockHourAngle != "undefined") clockHourAngle = json.clockHourAngle;
    if(typeof json.clockMinAngle != "undefined") clockMinAngle = json.clockMinAngle;
    if(typeof json.imageURL != "undefined") imageURL = json.imageURL;
    if(typeof json.temperatureText != "undefined") temperatureText = json.temperatureText;
    if(typeof json.bubbleX != "undefined") bubbleX = json.bubbleX;
    if(typeof json.bubbleY != "undefined") bubbleY = json.bubbleY;
    if(typeof json.bubblevX != "undefined") bubblevX = json.bubblevX;
    if(typeof json.dataTime != "undefined") dataTime = json.dataTime;
    if(typeof json.dataControl != "undefined") dataControl = json.dataControl;
    if(typeof json.dataLight != "undefined") dataLight = json.dataLight;
    if(typeof json.dataWind != "undefined") dataWind = json.dataWind;
    if(typeof json.dataTemp != "undefined") dataTemp = json.dataTemp;
    if(typeof json.dataHumidity != "undefined") dataHumidity = json.dataHumidity;
    if(typeof json.datatable != "undefined") datatable = json.datatable;
    if(typeof json.datatableStore != "undefined") datatableStore = json.datatableStore;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.imageSizeX != "undefined") imageSizeX = json.imageSizeX;
    if(typeof json.imageSizeY != "undefined") imageSizeY = json.imageSizeY;
    if(typeof json.offSetX != "undefined") offSetX = json.offSetX;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.rulerX != "undefined") rulerX = json.rulerX;
    if(typeof json.rulerY != "undefined") rulerY = json.rulerY;
    if(typeof json.rulerSizeX != "undefined") rulerSizeX = json.rulerSizeX;
    if(typeof json.rulerSizeY != "undefined") rulerSizeY = json.rulerSizeY;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.theta != "undefined") theta = json.theta;
    if(typeof json.clockX != "undefined") clockX = json.clockX;
    if(typeof json.clockY != "undefined") clockY = json.clockY;
    if(typeof json.clockHourSize != "undefined") clockHourSize = json.clockHourSize;
    if(typeof json.clockMinSize != "undefined") clockMinSize = json.clockMinSize;
    if(typeof json.clockSize != "undefined") clockSize = json.clockSize;
    if(typeof json.clockHourAngle != "undefined") clockHourAngle = json.clockHourAngle;
    if(typeof json.clockMinAngle != "undefined") clockMinAngle = json.clockMinAngle;
    if(typeof json.imageURL != "undefined") imageURL = json.imageURL;
    if(typeof json.temperatureText != "undefined") temperatureText = json.temperatureText;
    if(typeof json.bubbleX != "undefined") bubbleX = json.bubbleX;
    if(typeof json.bubbleY != "undefined") bubbleY = json.bubbleY;
    if(typeof json.bubblevX != "undefined") bubblevX = json.bubblevX;
    if(typeof json.dataTime != "undefined") dataTime = json.dataTime;
    if(typeof json.dataControl != "undefined") dataControl = json.dataControl;
    if(typeof json.dataLight != "undefined") dataLight = json.dataLight;
    if(typeof json.dataWind != "undefined") dataWind = json.dataWind;
    if(typeof json.dataTemp != "undefined") dataTemp = json.dataTemp;
    if(typeof json.dataHumidity != "undefined") dataHumidity = json.dataHumidity;
    if(typeof json.datatableStore != "undefined") datatableStore = json.datatableStore;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.imageSizeX != "undefined") imageSizeX = json.imageSizeX;
    if(typeof json.imageSizeY != "undefined") imageSizeY = json.imageSizeY;
    if(typeof json.offSetX != "undefined") offSetX = json.offSetX;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
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
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["Event"] = true;
    __pagesEnabled["Event 2"] = true;
    __pagesEnabled["Event 2 2"] = true;
    __pagesEnabled["clock"] = true;
    __pagesEnabled["bubble"] = false;
    __pagesEnabled["bubbleBing"] = true;
    __pagesEnabled["data"] = true;
    __pagesEnabled["dataBing"] = false;
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.1; // EjsS Model.Variables.Var Table.dt
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
    n = 32; // EjsS Model.Variables.Var Table.n
    angle = pi; // EjsS Model.Variables.Var Table.angle
  });

  _model.addToReset(function() {
    rulerX = 0.29; // EjsS Model.Variables.circle.rulerX
    rulerY = -1.6; // EjsS Model.Variables.circle.rulerY
    rulerSizeX = 3.2; // EjsS Model.Variables.circle.rulerSizeX
    rulerSizeY = 0.3; // EjsS Model.Variables.circle.rulerSizeY
    x = new Array(n+1); // EjsS Model.Variables.circle.x
    y = new Array(n+1); // EjsS Model.Variables.circle.y
    theta = pi/4; // EjsS Model.Variables.circle.theta
    clockX = -2.5; // EjsS Model.Variables.circle.clockX
    clockY = 3.15; // EjsS Model.Variables.circle.clockY
    clockHourSize = 0.6; // EjsS Model.Variables.circle.clockHourSize
    clockMinSize = 0.8; // EjsS Model.Variables.circle.clockMinSize
    clockSize = 0.6; // EjsS Model.Variables.circle.clockSize
    clockHourAngle = 0; // EjsS Model.Variables.circle.clockHourAngle
    clockMinAngle = 0; // EjsS Model.Variables.circle.clockMinAngle
    imageURL = "./images/004-min.png"; // EjsS Model.Variables.circle.imageURL
    temperatureText = "25 ⁰C"; // EjsS Model.Variables.circle.temperatureText
    bubbleX = 0; // EjsS Model.Variables.circle.bubbleX
    bubbleY = -2.11; // EjsS Model.Variables.circle.bubbleY
    bubblevX = -0.4; // EjsS Model.Variables.circle.bubblevX
  });

  _model.addToReset(function() {
    dataTime = [0,1,2,3]; // EjsS Model.Variables.data.dataTime
    dataControl = [0,0.6,0.8,1]; // EjsS Model.Variables.data.dataControl
    dataLight = [0,0.8,1,1.4]; // EjsS Model.Variables.data.dataLight
    dataWind = [0,0.9,1.1,1.7]; // EjsS Model.Variables.data.dataWind
    dataTemp = [0,0.8,1.1,1.3]; // EjsS Model.Variables.data.dataTemp
    dataHumidity = [0,0.4,0.3,0.2]; // EjsS Model.Variables.data.dataHumidity
    datatable = [[0,0,0,0,0,0],[1,"?","?","?","?","?"],[2,"?","?","?","?","?"],[3,"?","?","?","?","?"]]; // EjsS Model.Variables.data.datatable
    datatableStore = [[],[],[],[]]; // EjsS Model.Variables.data.datatableStore
  });

  _model.addToReset(function() {
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width1 = "100%"; // EjsS Model.Variables.layout.Width1
    Width2 = "100%"; // EjsS Model.Variables.layout.Width2
    world = true; // EjsS Model.Variables.layout.world
    graph = true; // EjsS Model.Variables.layout.graph
    disabledworld = false; // EjsS Model.Variables.layout.disabledworld
    disabled = false; // EjsS Model.Variables.layout.disabled
  });

  _model.addToReset(function() {
    imageSizeX = 10500; // EjsS Model.Variables.cells.imageSizeX
    imageSizeY = 6300; // EjsS Model.Variables.cells.imageSizeY
    offSetX = -6; // EjsS Model.Variables.cells.offSetX
    xmin = -10; // EjsS Model.Variables.cells.xmin
    xmax = 10; // EjsS Model.Variables.cells.xmax
    ymin = -10; // EjsS Model.Variables.cells.ymin
    ymax = 10; // EjsS Model.Variables.cells.ymax
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
    _model.setStepsPerDisplay(1);
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
  var k =0.7 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeOrientation:7
  var kapple =0.70 // control apple app height  // > CustomCode.changeOrientation:8
  var kepub =0.70 ;  // > CustomCode.changeOrientation:9
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

  function popup () {  // > CustomCode.popup 2:1
  var opts = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > CustomCode.popup 2:2
  //var counter =0  // > CustomCode.popup 2:3
  var styleing = function() {  // > CustomCode.popup 2:4
      //for styling the popup  // > CustomCode.popup 2:5
  document.getElementById(".BoxPanelSelect").style.fontSize = "2vw";  // > CustomCode.popup 2:6
  document.getElementById(".BoxPanelSelect.select").style.fontSize = "1vw";  // > CustomCode.popup 2:7
  document.getElementById(".BoxPanelSelect").style.color = "black";  // > CustomCode.popup 2:8
  document.getElementById(".BoxPanelSelect").style.background = "white";  // > CustomCode.popup 2:9
  document.getElementById(".BoxPanelSelect").style.width = "70%";  // > CustomCode.popup 2:10
  document.getElementById(".BoxPanelSelect.select").style.width = "100%";  // > CustomCode.popup 2:11
  document.getElementById(".BoxPanelSelect").style.left = "20%";  // > CustomCode.popup 2:12
  document.getElementById(".BoxPanelSelect").style.border = "white";  // > CustomCode.popup 2:13
  //document.getElementById(".BoxPanelSelect.select").background = "black";  // > CustomCode.popup 2:14
  document.getElementById(".BoxPanelSelect").style.top = "center";  // > CustomCode.popup 2:15
  // to remove the cancel button  // > CustomCode.popup 2:16
  document.getElementById(".BoxPanelSelect.cancelbt").style.display = "none";  // > CustomCode.popup 2:17
  document.getElementById(".BoxPanelSelect.select").style.textAlign = "center";  // > CustomCode.popup 2:18
    }  // > CustomCode.popup 2:19
  var correctFeedback = "Correct!. You have completed this investigation. You may proceed to investigate other factors that may affect rate of water loss."  // > CustomCode.popup 2:20
  var incorrectFeedback = "Incorrect. Please try again."  // > CustomCode.popup 2:21
  var okfunc = function(s) {  //2  // > CustomCode.popup 2:22
        alert(s);      // > CustomCode.popup 2:23
       // counter=counter+1;  // > CustomCode.popup 2:24
      //  _play();  // > CustomCode.popup 2:25
        if (s != correctFeedback) {  // > CustomCode.popup 2:26
          _view.audioWrong.play()  // > CustomCode.popup 2:27
          EJSS_INTERFACE.BoxPanel.showSelectDialog(temptext, options, okfunc); //second title  // > CustomCode.popup 2:28
          styleing();  // > CustomCode.popup 2:29
        }  // > CustomCode.popup 2:30
        else if(s == correctFeedback){  // > CustomCode.popup 2:31
        // counter=counter+1;  // > CustomCode.popup 2:32
        //_play();  // > CustomCode.popup 2:33
        _view.audio.play()  // > CustomCode.popup 2:34
        }  // > CustomCode.popup 2:35
        //_update();        // > CustomCode.popup 2:36
      }   // > CustomCode.popup 2:37
  var correctFeedback = "Correct!. You have completed this investigation. You may proceed to investigate other factors that may affect rate of water loss."  // > CustomCode.popup 2:38
  var incorrectFeedback = "Incorrect. Please try again."  // > CustomCode.popup 2:39
     // > CustomCode.popup 2:40
  if (opts=="Fan"){ //1  // > CustomCode.popup 2:41
  var options = {text: ["(a) Water loss is faster in moving air.  Rate of transpiration is higher in moving air than in still air (control).", "(b) Water loss is slower in moving air. Rate of transpiration is lower in moving air than in still air (control)." ], value: [correctFeedback ,incorrectFeedback]};  // > CustomCode.popup 2:42
  var temptext = "State the effect of moving air on the water loss from the leafy shoot?"; // so that copy and paste of qn is not needed  // > CustomCode.popup 2:43
  EJSS_INTERFACE.BoxPanel.showSelectDialog(temptext, options, okfunc); //2 first title  // > CustomCode.popup 2:44
  styleing();  // > CustomCode.popup 2:45
      // > CustomCode.popup 2:46
  }//1  // > CustomCode.popup 2:47
  //2  // > CustomCode.popup 2:48
  if (opts=="Lamp"){ //2  // > CustomCode.popup 2:49
  var options = {text: ["(a) Water loss is faster in higher light intensity. Rate of transpiration is higher in higher light intensity than lower light intensity.(control).", "(b) Water loss is slower in lower light intensity. Rate of transpiration is lower in higher light intensity than lower light intensity." ], value: [correctFeedback ,incorrectFeedback]};  // > CustomCode.popup 2:50
  var temptext = "State the effect of light intensity on the water loss from the leafy shoot?"; // so that copy and paste of qn is not needed  // > CustomCode.popup 2:51
  EJSS_INTERFACE.BoxPanel.showSelectDialog(temptext, options, okfunc); //2 first title  // > CustomCode.popup 2:52
  styleing();  // > CustomCode.popup 2:53
      // > CustomCode.popup 2:54
  }//2  // > CustomCode.popup 2:55
  //3  // > CustomCode.popup 2:56
  if (opts=="Heater"){ //3  // > CustomCode.popup 2:57
  var options = {text: ["(a) Water loss is faster in higher temperature. Rate of transpiration is higher in higher temperature than lower temperature.(control).", "(b) Water loss is slower in lower temperature. Rate of transpiration is lower in higher temperature than lower temperature." ], value: [correctFeedback ,incorrectFeedback]};  // > CustomCode.popup 2:58
  var temptext = "State the effect of high temperature on the water loss from the leafy shoot?"; // so that copy and paste of qn is not needed  // > CustomCode.popup 2:59
  EJSS_INTERFACE.BoxPanel.showSelectDialog(temptext, options, okfunc); //2 first title  // > CustomCode.popup 2:60
  styleing();  // > CustomCode.popup 2:61
      // > CustomCode.popup 2:62
  }//3  // > CustomCode.popup 2:63
  //4  // > CustomCode.popup 2:64
  if (opts=="Plastic Bag"){ //4  // > CustomCode.popup 2:65
  var options = {text: ["(a) Water loss is faster in increased humidity . Rate of transpiration is higher in increased humidity than lower humidity.(control).", "(b) Water loss is slower in increased humidity . Rate of transpiration is lower in increased humidity than lower humidity." ], value: [correctFeedback ,incorrectFeedback]};  // > CustomCode.popup 2:66
  var temptext = "State the effect of increased humidity on the water loss from the leafy shoot?"; // so that copy and paste of qn is not needed  // > CustomCode.popup 2:67
  EJSS_INTERFACE.BoxPanel.showSelectDialog(temptext, options, okfunc); //2 first title  // > CustomCode.popup 2:68
  styleing();  // > CustomCode.popup 2:69
      // > CustomCode.popup 2:70
  }//3  // > CustomCode.popup 2:71
  }  // > CustomCode.popup 2:72

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    //[[dataTime[0],dataControl[0],dataLight[0],dataWind[0],dataTemp[0],dataHumidity[0]],[dataTime[1],dataControl[1],dataLight[1],dataWind[1],dataTemp[1],dataHumidity[1]],[dataTime[2],dataControl[2],dataLight[2],dataWind[2],dataTemp[2],dataHumidity[2]],[dataTime[3],dataControl[3],dataLight[3],dataWind[3],dataTemp[3],dataHumidity[3]]]   // > Initialization.Init Page:1
    //datatable = datatableStore  // > Initialization.Init Page:2
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
    if (!__pagesEnabled["clock"]) return;
    // t is in hour?  // > FixedRelations.clock:1
    clockHourAngle = -t*2*pi/12  // > FixedRelations.clock:2
    clockMinAngle = -t*2*pi/12*12  // > FixedRelations.clock:3
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["bubble"]) return;
    var option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > FixedRelations.bubble:1
    if (option =="Control"){  // > FixedRelations.bubble:2
      if (t<1){  // > FixedRelations.bubble:3
        bubblevX = (dataControl[1] - dataControl[0])  // > FixedRelations.bubble:4
        }  // > FixedRelations.bubble:5
        else if (t<2&&t>=1){  // > FixedRelations.bubble:6
        bubblevX = (dataControl[2] - dataControl[1])  // > FixedRelations.bubble:7
        }  // > FixedRelations.bubble:8
         else if (t<3&&t>=2){  // > FixedRelations.bubble:9
        bubblevX = (dataControl[3] - dataControl[2])  // > FixedRelations.bubble:10
        }  // > FixedRelations.bubble:11
        else {  // > FixedRelations.bubble:12
          bubblevX = 0  // > FixedRelations.bubble:13
          }  // > FixedRelations.bubble:14
        // > FixedRelations.bubble:15
      }  // > FixedRelations.bubble:16
     else if (option =="Pastic Bag"){  // > FixedRelations.bubble:17
      if (t<1){  // > FixedRelations.bubble:18
        bubblevX = (dataHumidity[1] - dataHumidity[0])  // > FixedRelations.bubble:19
        }  // > FixedRelations.bubble:20
        else if (t<2&&t>=1){  // > FixedRelations.bubble:21
        bubblevX = (dataHumidity[2] - dataHumidity[1])  // > FixedRelations.bubble:22
        }  // > FixedRelations.bubble:23
         else if (t<3&&t>=2){  // > FixedRelations.bubble:24
        bubblevX = (dataHumidity[3] - dataHumidity[2])  // > FixedRelations.bubble:25
        }  // > FixedRelations.bubble:26
        else {  // > FixedRelations.bubble:27
          bubblevX = 0  // > FixedRelations.bubble:28
          }  // > FixedRelations.bubble:29
        // > FixedRelations.bubble:30
      }  // > FixedRelations.bubble:31
        // > FixedRelations.bubble:32
      else if (option =="Fan"){  // > FixedRelations.bubble:33
      if (t<1){  // > FixedRelations.bubble:34
        bubblevX = (dataWind[1] - dataWind[0])  // > FixedRelations.bubble:35
        }  // > FixedRelations.bubble:36
        else if (t<2&&t>=1){  // > FixedRelations.bubble:37
        bubblevX = (dataWind[2] - dataWind[1])  // > FixedRelations.bubble:38
        }  // > FixedRelations.bubble:39
         else if (t<3&&t>=2){  // > FixedRelations.bubble:40
        bubblevX = (dataWind[3] - dataWind[2])  // > FixedRelations.bubble:41
        }  // > FixedRelations.bubble:42
        else {  // > FixedRelations.bubble:43
          bubblevX = 0  // > FixedRelations.bubble:44
          }  // > FixedRelations.bubble:45
        // > FixedRelations.bubble:46
      }  // > FixedRelations.bubble:47
        // > FixedRelations.bubble:48
      else if (option =="Lamp"){  // > FixedRelations.bubble:49
      if (t<1){  // > FixedRelations.bubble:50
        bubblevX = (dataLight[1] - dataLight[0])  // > FixedRelations.bubble:51
        }  // > FixedRelations.bubble:52
        else if (t<2&&t>=1){  // > FixedRelations.bubble:53
        bubblevX = (dataWind[2] - dataLight[1])  // > FixedRelations.bubble:54
        }  // > FixedRelations.bubble:55
         else if (t<3&&t>=2){  // > FixedRelations.bubble:56
        bubblevX = (dataLight[3] - dataLight[2])  // > FixedRelations.bubble:57
        }  // > FixedRelations.bubble:58
        else {  // > FixedRelations.bubble:59
          bubblevX = 0  // > FixedRelations.bubble:60
          }  // > FixedRelations.bubble:61
        // > FixedRelations.bubble:62
      }  // > FixedRelations.bubble:63
        // > FixedRelations.bubble:64
        else if (option =="Heater"){  // > FixedRelations.bubble:65
      if (t<1){  // > FixedRelations.bubble:66
        bubblevX = (dataTemp[1] - dataTemp[0])  // > FixedRelations.bubble:67
        }  // > FixedRelations.bubble:68
        else if (t<2&&t>=1){  // > FixedRelations.bubble:69
        bubblevX = (dataTemp[2] - dataTemp[1])  // > FixedRelations.bubble:70
        }  // > FixedRelations.bubble:71
         else if (t<3&&t>=2){  // > FixedRelations.bubble:72
        bubblevX = (dataTemp[3] - dataTemp[2])  // > FixedRelations.bubble:73
        }  // > FixedRelations.bubble:74
        else {  // > FixedRelations.bubble:75
          bubblevX = 0  // > FixedRelations.bubble:76
          }  // > FixedRelations.bubble:77
        // > FixedRelations.bubble:78
      }  // > FixedRelations.bubble:79
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["bubbleBing"]) return;
    var option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > FixedRelations.bubbleBing:1
    var dataMap = {  // > FixedRelations.bubbleBing:2
      "Control": dataControl,  // > FixedRelations.bubbleBing:3
      "Plastic Bag": dataHumidity,  // > FixedRelations.bubbleBing:4
      "Fan": dataWind,  // > FixedRelations.bubbleBing:5
      "Lamp": dataLight,  // > FixedRelations.bubbleBing:6
      "Heater": dataTemp  // > FixedRelations.bubbleBing:7
    };  // > FixedRelations.bubbleBing:8
    if (dataMap.hasOwnProperty(option)) {  // > FixedRelations.bubbleBing:9
      var data = dataMap[option];  // > FixedRelations.bubbleBing:10
      if (t < 1) {  // > FixedRelations.bubbleBing:11
        bubblevX = data[1] - data[0];  // > FixedRelations.bubbleBing:12
          // > FixedRelations.bubbleBing:13
      } else if (t < 2 && t >= 1) {  // > FixedRelations.bubbleBing:14
        bubblevX = data[2] - data[1];  // > FixedRelations.bubbleBing:15
          // > FixedRelations.bubbleBing:16
      } else if (t < 3 && t >= 2) {  // > FixedRelations.bubbleBing:17
        bubblevX = data[3] - data[2];  // > FixedRelations.bubbleBing:18
         // > FixedRelations.bubbleBing:19
      } else {  // > FixedRelations.bubbleBing:20
        bubblevX = 0;  // > FixedRelations.bubbleBing:21
      }  // > FixedRelations.bubbleBing:22
    }  // > FixedRelations.bubbleBing:23
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["data"]) return;
    var option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > FixedRelations.data:1
    var offSet = 0.1  // > FixedRelations.data:2
    if (option =="Control"){  // > FixedRelations.data:3
      //alert()  // > FixedRelations.data:4
      if (Math.floor(t+offSet)==1){  // > FixedRelations.data:5
        datatable[1][1] = dataControl[1]  // > FixedRelations.data:6
        }  // > FixedRelations.data:7
        else if (Math.floor(t+offSet)==2){  // > FixedRelations.data:8
        datatable[2][1] = dataControl[2]  // > FixedRelations.data:9
        }  // > FixedRelations.data:10
         else if (Math.floor(t+offSet)==3){  // > FixedRelations.data:11
       datatable[3][1] = dataControl[3]  // > FixedRelations.data:12
        }  // > FixedRelations.data:13
          // > FixedRelations.data:14
        // > FixedRelations.data:15
      }  // > FixedRelations.data:16
     else if (option =="Plastic Bag"){  // > FixedRelations.data:17
        // > FixedRelations.data:18
      if (Math.floor(t+offSet)==1){  // > FixedRelations.data:19
        datatable[1][2] = dataHumidity[1]  // > FixedRelations.data:20
        }  // > FixedRelations.data:21
        else if (Math.floor(t+offSet)==2){  // > FixedRelations.data:22
        datatable[2][2] = dataHumidity[2]  // > FixedRelations.data:23
        }  // > FixedRelations.data:24
         else if (Math.floor(t+offSet)==3){  // > FixedRelations.data:25
       datatable[3][2] = dataHumidity[3]  // > FixedRelations.data:26
        }  // > FixedRelations.data:27
      //alert()  // > FixedRelations.data:28
      }  // > FixedRelations.data:29
        // > FixedRelations.data:30
      else if (option =="Fan"){  // > FixedRelations.data:31
      if (Math.floor(t+offSet)==1){  // > FixedRelations.data:32
        datatable[1][3] = dataWind[1]  // > FixedRelations.data:33
        }  // > FixedRelations.data:34
        else if (Math.floor(t+offSet)==2){  // > FixedRelations.data:35
        datatable[2][3] = dataWind[2]  // > FixedRelations.data:36
        }  // > FixedRelations.data:37
         else if (Math.floor(t+offSet)==3){  // > FixedRelations.data:38
       datatable[3][3] = dataWind[3]  // > FixedRelations.data:39
        }  // > FixedRelations.data:40
        // > FixedRelations.data:41
      }  // > FixedRelations.data:42
        // > FixedRelations.data:43
      else if (option =="Lamp"){  // > FixedRelations.data:44
      if (Math.floor(t+offSet)==1){  // > FixedRelations.data:45
        datatable[1][4] = dataLight[1]  // > FixedRelations.data:46
        }  // > FixedRelations.data:47
        else if (Math.floor(t+offSet)==2){  // > FixedRelations.data:48
        datatable[2][4] = dataLight[2]  // > FixedRelations.data:49
        }  // > FixedRelations.data:50
         else if (Math.floor(t+offSet)==3){  // > FixedRelations.data:51
       datatable[3][4] = dataLight[3]  // > FixedRelations.data:52
        }  // > FixedRelations.data:53
        // > FixedRelations.data:54
      }  // > FixedRelations.data:55
        // > FixedRelations.data:56
        else if (option =="Heater"){  // > FixedRelations.data:57
      if (Math.floor(t+offSet)==1){  // > FixedRelations.data:58
        datatable[1][5] = dataTemp[1]  // > FixedRelations.data:59
        }  // > FixedRelations.data:60
        else if (Math.floor(t+offSet)==2){  // > FixedRelations.data:61
        datatable[2][5] = dataTemp[2]  // > FixedRelations.data:62
        }  // > FixedRelations.data:63
         else if (Math.floor(t+offSet)==3){  // > FixedRelations.data:64
       datatable[3][5] = dataTemp[3]  // > FixedRelations.data:65
        }  // > FixedRelations.data:66
        // > FixedRelations.data:67
      }  // > FixedRelations.data:68
    //console.log(datatable)  // > FixedRelations.data:69
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["dataBing"]) return;
    /*  // > FixedRelations.dataBing:1
    var option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > FixedRelations.dataBing:2
    var offSet = 0.1;  // > FixedRelations.dataBing:3
    var dataMap = {  // > FixedRelations.dataBing:4
      "Control": dataControl,  // > FixedRelations.dataBing:5
      "Plastic Bag": dataHumidity,  // > FixedRelations.dataBing:6
      "Fan": dataWind,  // > FixedRelations.dataBing:7
      "Lamp": dataLight,  // > FixedRelations.dataBing:8
      "Heater": dataTemp  // > FixedRelations.dataBing:9
    };  // > FixedRelations.dataBing:10
    if (dataMap.hasOwnProperty(option)) {  // > FixedRelations.dataBing:11
      var data = dataMap[option];  // > FixedRelations.dataBing:12
      var tFloor = Math.floor(t + offSet);  // > FixedRelations.dataBing:13
      if (tFloor >= 0 && tFloor <= 3) {  // > FixedRelations.dataBing:14
        datatable[tFloor][datatable[0].indexOf(option)] = data[tFloor];  // > FixedRelations.dataBing:15
        console.log(datatable)  // > FixedRelations.dataBing:16
      }  // > FixedRelations.dataBing:17
    }  // > FixedRelations.dataBing:18
    */  // > FixedRelations.dataBing:19
    /*  // > FixedRelations.dataBing:20
    var option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > FixedRelations.dataBing:21
    var offSet = 0.1;  // > FixedRelations.dataBing:22
    var tFloor = Math.floor(t + offSet);  // > FixedRelations.dataBing:23
    var dataOptions = {  // > FixedRelations.dataBing:24
      "Control": dataControl,  // > FixedRelations.dataBing:25
      "Plastic Bag": dataHumidity,  // > FixedRelations.dataBing:26
      "Fan": dataWind,  // > FixedRelations.dataBing:27
      "Lamp": dataLight,  // > FixedRelations.dataBing:28
      "Heater": dataTemp  // > FixedRelations.dataBing:29
    };  // > FixedRelations.dataBing:30
    if (dataOptions.hasOwnProperty(option)) {  // > FixedRelations.dataBing:31
      if (tFloor >= 1 && tFloor <= 3) {  // > FixedRelations.dataBing:32
        datatable[tFloor][dataOptions[option].length] = dataOptions[option][tFloor];  // > FixedRelations.dataBing:33
      }  // > FixedRelations.dataBing:34
    }  // > FixedRelations.dataBing:35
    console.log(datatable);  // > FixedRelations.dataBing:36
    */  // > FixedRelations.dataBing:37
    /*  // > FixedRelations.dataBing:38
    var option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > FixedRelations.dataBing:39
    var offSet = 0.1;  // > FixedRelations.dataBing:40
    var tFloor = Math.floor(t + offSet);  // > FixedRelations.dataBing:41
    var dataOptions = {  // > FixedRelations.dataBing:42
      "Control": dataControl,  // > FixedRelations.dataBing:43
      "Plastic Bag": dataHumidity,  // > FixedRelations.dataBing:44
      "Fan": dataWind,  // > FixedRelations.dataBing:45
      "Lamp": dataLight,  // > FixedRelations.dataBing:46
      "Heater": dataTemp  // > FixedRelations.dataBing:47
    };  // > FixedRelations.dataBing:48
    if (dataOptions.hasOwnProperty(option)) {  // > FixedRelations.dataBing:49
      if (tFloor >= 1 && tFloor <= 3) {  // > FixedRelations.dataBing:50
        if (dataOptions[option][tFloor] !== undefined) {  // > FixedRelations.dataBing:51
          datatable[tFloor][dataOptions[option].length] = dataOptions[option][tFloor];  // > FixedRelations.dataBing:52
        } else {  // > FixedRelations.dataBing:53
          console.log('Error: data for option "' + option + '" at index ' + tFloor + ' is undefined.');  // > FixedRelations.dataBing:54
        }  // > FixedRelations.dataBing:55
      }  // > FixedRelations.dataBing:56
    }  // > FixedRelations.dataBing:57
    console.log(datatable);  // > FixedRelations.dataBing:58
    */  // > FixedRelations.dataBing:59
    var option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > FixedRelations.dataBing:60
    var offSet = 0.1;  // > FixedRelations.dataBing:61
    var tFloor = Math.floor(t + offSet);  // > FixedRelations.dataBing:62
    var dataOptions = {  // > FixedRelations.dataBing:63
      "Control": dataControl,  // > FixedRelations.dataBing:64
      "Plastic Bag": dataHumidity,  // > FixedRelations.dataBing:65
      "Fan": dataWind,  // > FixedRelations.dataBing:66
      "Lamp": dataLight,  // > FixedRelations.dataBing:67
      "Heater": dataTemp  // > FixedRelations.dataBing:68
    };  // > FixedRelations.dataBing:69
    if (dataOptions.hasOwnProperty(option)) {  // > FixedRelations.dataBing:70
      if (tFloor >= 1 && tFloor <= 3) {  // > FixedRelations.dataBing:71
        var columnIndex = Object.keys(dataOptions).indexOf(option);  // > FixedRelations.dataBing:72
        if (dataOptions[option][tFloor] !== undefined) {  // > FixedRelations.dataBing:73
          datatable[tFloor][columnIndex] = dataOptions[option][tFloor];  // > FixedRelations.dataBing:74
        } else {  // > FixedRelations.dataBing:75
          console.log('Error: data for option "' + option + '" at index ' + tFloor + ' is undefined.');  // > FixedRelations.dataBing:76
        }  // > FixedRelations.dataBing:77
      }  // > FixedRelations.dataBing:78
    }  // > FixedRelations.dataBing:79
    console.log(datatable);  // > FixedRelations.dataBing:80
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
    var _ODE_evolution1_Event1;
    var _ODE_evolution1_Event2;
    var _ODE_evolution1_Event3;
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["bubbleX","t"]};

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
      if (__pagesEnabled["Event"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      if (__pagesEnabled["Event 2"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
      if (__pagesEnabled["Event 2 2"]) __eventSolver.addEvent(_ODE_evolution1_Event3());
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
        if (__state[__cIn]!=bubbleX) __mustReinitialize = true;
        __state[__cIn++] = bubbleX;
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
        bubbleX = __state[__cOut++];
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
        var bubbleX = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = -bubblevX; // Rate for ODE: Evol Page:bubbleX
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
        var bubbleX = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        bubbleX = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = bubbleX;
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

    _ODE_evolution1_Event1 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var bubbleX = _aState[__cOut++];
        var t = _aState[__cOut++];
        return t - 1.0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        bubbleX = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = bubbleX;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause()  // > Event action for page Evol Page:1
        _tools.showOkDialog("Click 'Ok ' button to continue the experiment",   // > Event action for page Evol Page:2
            function(){   // > Event action for page Evol Page:3
              _play()  // > Event action for page Evol Page:4
            //_update(); // to force update view  // > Event action for page Evol Page:5
            });  // > Event action for page Evol Page:6
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event2 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var bubbleX = _aState[__cOut++];
        var t = _aState[__cOut++];
        return t - 2.0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        bubbleX = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = bubbleX;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause()  // > Event action for page Evol Page:1
        _tools.showOkDialog("Click 'Ok ' button to continue the experiment",   // > Event action for page Evol Page:2
            function(){   // > Event action for page Evol Page:3
              _play()  // > Event action for page Evol Page:4
            //_update(); // to force update view  // > Event action for page Evol Page:5
            });  // > Event action for page Evol Page:6
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event3 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var bubbleX = _aState[__cOut++];
        var t = _aState[__cOut++];
        return t - 3.0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        bubbleX = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = bubbleX;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause()  // > Event action for page Evol Page:1
        popup()  // > Event action for page Evol Page:2
        //popupChatGPT()  // > Event action for page Evol Page:3
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_bubbleX(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

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
    _view = new transpiration_sec_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.comboBox.linkProperty("Options",  function() { return ["Control","Plastic Bag","Fan","Lamp","Heater"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  //["Plastic Bag","Fan","Lamp","Heater"]
  var opts = _view.comboBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option=="Control"){
    imageURL = "./images/004-min.png"
    temperatureText = "25 ⁰C"
    }
    else if ( option=="Plastic Bag"){
    imageURL = "./images/005-min.png"
     temperatureText = "25 ⁰C"
     }
    else if  ( option=="Fan"){
    imageURL = "./images/009-min.png"
     temperatureText = "25 ⁰C"
     }
   else if  ( option=="Lamp"){
    imageURL = "./images/007-min.png"
     temperatureText = "25 ⁰C"
     }
     else if  ( option=="Heater"){
    imageURL = "./images/008-min.png"
     temperatureText = "38 ⁰C"
     }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Disabled",  function() { return t>0; } ); // HtmlView Page linking property 'Disabled' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  _pause();
  //speech ("paused");

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("Disabled",  function() { return t>2; } ); // HtmlView Page linking property 'Disabled' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  //speech ("play");

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'playPauseButton2'
          _view.stepButton2.setAction("OnClick", function(_data,_info) {
  _step();

}); // HtmlView Page setting action 'OnClick' for element 'stepButton2'
          _view.stepButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'stepButton2'
          _view.resetButton3.setAction("OnClick", function(_data,_info) {
  //_reset();
  //speechzh ("你好");
   t =0
   bubbleX= 0;

}); // HtmlView Page setting action 'OnClick' for element 'resetButton3'
          _view.resetButton3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton3'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();

}); // HtmlView Page setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return 5*imageSizeX/imageSizeY+offSetX; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return -5*imageSizeX/imageSizeY+offSetX; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.backgroundimage.linkProperty("SizeX",  function() { return 10*imageSizeX/imageSizeY; } ); // HtmlView Page linking property 'SizeX' for element 'backgroundimage'
          _view.backgroundimage.linkProperty("X",  function() { return offSetX; }, function(_v) { offSetX = _v; } ); // HtmlView Page linking property 'X' for element 'backgroundimage'
          _view.backgroundimage.linkProperty("ImageUrl",  function() { return imageURL; }, function(_v) { imageURL = _v; } ); // HtmlView Page linking property 'ImageUrl' for element 'backgroundimage'
          _view.ruler.linkProperty("SizeX",  function() { return rulerSizeX; }, function(_v) { rulerSizeX = _v; } ); // HtmlView Page linking property 'SizeX' for element 'ruler'
          _view.ruler.linkProperty("X",  function() { return rulerX; }, function(_v) { rulerX = _v; } ); // HtmlView Page linking property 'X' for element 'ruler'
          _view.ruler.linkProperty("Y",  function() { return rulerY; }, function(_v) { rulerY = _v; } ); // HtmlView Page linking property 'Y' for element 'ruler'
          _view.ruler.linkProperty("SizeY",  function() { return rulerSizeY; }, function(_v) { rulerSizeY = _v; } ); // HtmlView Page linking property 'SizeY' for element 'ruler'
          _view.ruler2.linkProperty("Length",  function() { return rulerSizeX; }, function(_v) { rulerSizeX = _v; } ); // HtmlView Page linking property 'Length' for element 'ruler2'
          _view.ruler2.linkProperty("X",  function() { return rulerX; }, function(_v) { rulerX = _v; } ); // HtmlView Page linking property 'X' for element 'ruler2'
          _view.ruler2.linkProperty("Y",  function() { return rulerY; }, function(_v) { rulerY = _v; } ); // HtmlView Page linking property 'Y' for element 'ruler2'
          _view.ruler2.linkProperty("Width",  function() { return rulerSizeY; }, function(_v) { rulerSizeY = _v; } ); // HtmlView Page linking property 'Width' for element 'ruler2'
          _view.clockCentre.linkProperty("X",  function() { return clockX; }, function(_v) { clockX = _v; } ); // HtmlView Page linking property 'X' for element 'clockCentre'
          _view.clockCentre.linkProperty("Y",  function() { return clockY; }, function(_v) { clockY = _v; } ); // HtmlView Page linking property 'Y' for element 'clockCentre'
          _view.clockCentre.setAction("OnPress", function(_data,_info) {
  if (t>=0&&t<(3-dt)){
  _play()
  }

}); // HtmlView Page setting action 'OnPress' for element 'clockCentre'
          _view.hourHandarrow.linkProperty("SizeX",  function() { return clockHourSize; }, function(_v) { clockHourSize = _v; } ); // HtmlView Page linking property 'SizeX' for element 'hourHandarrow'
          _view.hourHandarrow.linkProperty("Rotate",  function() { return pi/2+clockHourAngle; } ); // HtmlView Page linking property 'Rotate' for element 'hourHandarrow'
          _view.hourHandarrow.linkProperty("X",  function() { return clockX; }, function(_v) { clockX = _v; } ); // HtmlView Page linking property 'X' for element 'hourHandarrow'
          _view.hourHandarrow.linkProperty("Y",  function() { return clockY; }, function(_v) { clockY = _v; } ); // HtmlView Page linking property 'Y' for element 'hourHandarrow'
          _view.minHandarrow.linkProperty("SizeX",  function() { return clockMinSize; }, function(_v) { clockMinSize = _v; } ); // HtmlView Page linking property 'SizeX' for element 'minHandarrow'
          _view.minHandarrow.linkProperty("Rotate",  function() { return pi/2+clockMinAngle; } ); // HtmlView Page linking property 'Rotate' for element 'minHandarrow'
          _view.minHandarrow.linkProperty("X",  function() { return clockX; }, function(_v) { clockX = _v; } ); // HtmlView Page linking property 'X' for element 'minHandarrow'
          _view.minHandarrow.linkProperty("Y",  function() { return clockY; }, function(_v) { clockY = _v; } ); // HtmlView Page linking property 'Y' for element 'minHandarrow'
          _view.Temperaturetext.linkProperty("Text",  function() { return temperatureText; }, function(_v) { temperatureText = _v; } ); // HtmlView Page linking property 'Text' for element 'Temperaturetext'
          _view.bubble.linkProperty("X",  function() { return bubbleX; }, function(_v) { bubbleX = _v; } ); // HtmlView Page linking property 'X' for element 'bubble'
          _view.bubble.linkProperty("Y",  function() { return bubbleY; }, function(_v) { bubbleY = _v; } ); // HtmlView Page linking property 'Y' for element 'bubble'
          _view.panel2.linkProperty("Width",  function() { return Width2; }, function(_v) { Width2 = _v; } ); // HtmlView Page linking property 'Width' for element 'panel2'
          _view.dataTable.linkProperty("Input",  function() { return datatable; }, function(_v) { datatable = _v; } ); // HtmlView Page linking property 'Input' for element 'dataTable'
          _view.dataTable.linkProperty("HeadersText",  function() { return ["Duration /h","Distance moved by bubble /mm (Control) ","Distance moved by bubble with plastic bag /mm ","Distance moved by bubble with fan /mm ","Distance moved by bubble with lamp /mm ","Distance moved by bubble with heater /mm "]; } ); // HtmlView Page linking property 'HeadersText' for element 'dataTable'
          _view.dataTable.linkProperty("CellsFormat",  function() { return ["0","0.0","0.0","0.0","0.0","0.0"]; } ); // HtmlView Page linking property 'CellsFormat' for element 'dataTable'
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
function transpiration_sec_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = transpiration_sec_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function transpiration_sec_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audio'
      .setProperty("AudioUrl","./images/sound/correct.mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audioWrong", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audioWrong'
      .setProperty("AudioUrl","./images/sound/Wrong-answer-sound-effect.mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audioWrong'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","Play ▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","Pause ❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'stepButton2'
      .setProperty("Text","|►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton3'
      .setProperty("Text","Reset ↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("AxisXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisXShow' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("TRMessage","Factors affecting Transpiration Virtual Lab") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("GridXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridXShow' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("GridYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridYShow' for element 'plottingPanel'
      .setProperty("MinimumY",-5) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AxisYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisYShow' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"backgroundimage", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'backgroundimage'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'backgroundimage'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"ruler", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ruler'
      .setProperty("FillColor","rgba(224,158,95,1.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'ruler'
      .setProperty("RelativePosition","EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'ruler'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'ruler'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ruler'
      ;

    _view._addElement(EJSS_DRAWING2D.ruler,"ruler2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ruler2'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'ruler2'
      .setProperty("Maximum",2) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'ruler2'
      .setProperty("NumberOfMarks",3) // EJsS HtmlView.HtmlView Page: setting property 'NumberOfMarks' for element 'ruler2'
      .setProperty("MediumMark",30) // EJsS HtmlView.HtmlView Page: setting property 'MediumMark' for element 'ruler2'
      .setProperty("BigMark",3) // EJsS HtmlView.HtmlView Page: setting property 'BigMark' for element 'ruler2'
      .setProperty("Digits",1) // EJsS HtmlView.HtmlView Page: setting property 'Digits' for element 'ruler2'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'ruler2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'ruler2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"clockCentre", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'clockCentre'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'clockCentre'
      .setProperty("Sensitivity",100) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'clockCentre'
      .setProperty("SizeX",0.1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'clockCentre'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'clockCentre'
      .setProperty("SizeY",0.1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'clockCentre'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'clockCentre'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"hourHandarrow", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'hourHandarrow'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'hourHandarrow'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'hourHandarrow'
      .setProperty("LineWidth",4) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'hourHandarrow'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"minHandarrow", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'minHandarrow'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'minHandarrow'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'minHandarrow'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'minHandarrow'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Temperaturetext", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'Temperaturetext'
      .setProperty("X",0.6) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'Temperaturetext'
      .setProperty("Y",3.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'Temperaturetext'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubble", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'bubble'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'bubble'
      .setProperty("SizeX",0.35) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'bubble'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'bubble'
      .setProperty("SizeY",0.35) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bubble'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"magnifyingGlass", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'magnifyingGlass'
      .setProperty("FillColor","rgba(224,158,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'magnifyingGlass'
      .setProperty("SizeX",3.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'magnifyingGlass'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'magnifyingGlass'
      .setProperty("X",-1.2) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'magnifyingGlass'
      .setProperty("LineColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'magnifyingGlass'
      .setProperty("Y",-2.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'magnifyingGlass'
      .setProperty("SizeY",3.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'magnifyingGlass'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'magnifyingGlass'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"magnify", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'magnify'
      .setProperty("X",-1.2) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'magnify'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'magnify'
      .setProperty("Text","Magnified View") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'magnify'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel2'
      ;

    _view._addElement(EJSS_INTERFACE.dataTable,"dataTable", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'dataTable'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'dataTable'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'dataTable'
      .setProperty("CellsCSS",{"text-align":"center"}) // EJsS HtmlView.HtmlView Page: setting property 'CellsCSS' for element 'dataTable'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'dataTable'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'dataTable'
      .setProperty("Font","normal normal 1vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'dataTable'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h2>Others</h2> <ul>   <li><a href=\"https://iwant2study.org/ospsg/index.php/interactive-resources/biology/1182-transpiration-sec\" target=\"_blank\">Need a 3 hour version?</a></li>   <li><a href=\"https://iwant2study.org/ospsg/index.php/interactive-resources/biology/1061-transpiration\" target=\"_blank\">Need a 1 hour version?</a></li> </ul>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new transpiration_sec("_topFrame","_ejs_library/",null);
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
