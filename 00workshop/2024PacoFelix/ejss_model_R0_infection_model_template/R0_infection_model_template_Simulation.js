/* _inputParameters: an object with different values for the model parameters */
function R0_infection_model_template(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var r0; // EjsS Model.Variables.Var Table 5.r0
  var level; // EjsS Model.Variables.Var Table 5.level
  var infections; // EjsS Model.Variables.Var Table 5.infections
  var isPlaying; // EjsS Model.Variables.Var Table 5.isPlaying
  var interval; // EjsS Model.Variables.Var Table 5.interval
  var currentLevelInfections; // EjsS Model.Variables.Var Table 5.currentLevelInfections
  var newInfections; // EjsS Model.Variables.Var Table 5.newInfections
  var x; // EjsS Model.Variables.Var Table 5.x
  var y; // EjsS Model.Variables.Var Table 5.y
  var simulationArea; // EjsS Model.Variables.Var Table 5.simulationArea
  var stopInfection; // EjsS Model.Variables.Var Table 5.stopInfection
  var generations; // EjsS Model.Variables.Var Table 5.generations
  var isRunning; // EjsS Model.Variables.Var Table 5.isRunning
  var pointsInLevel; // EjsS Model.Variables.Var Table 5.pointsInLevel
  var sizeX; // EjsS Model.Variables.Var Table 5.sizeX
  var sizeY; // EjsS Model.Variables.Var Table 5.sizeY
  var infectionNumber; // EjsS Model.Variables.Var Table 5.infectionNumber

  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var pi; // EjsS Model.Variables.Var Table.pi
  var font; // EjsS Model.Variables.Var Table.font
  var n; // EjsS Model.Variables.Var Table.n
  var angle; // EjsS Model.Variables.Var Table.angle
  var posX; // EjsS Model.Variables.Var Table.posX
  var posY; // EjsS Model.Variables.Var Table.posY
  var velX; // EjsS Model.Variables.Var Table.velX
  var velY; // EjsS Model.Variables.Var Table.velY
  var accX; // EjsS Model.Variables.Var Table.accX
  var accY; // EjsS Model.Variables.Var Table.accY

  var theta; // EjsS Model.Variables.circle.theta

  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var world; // EjsS Model.Variables.layout.world
  var graph; // EjsS Model.Variables.layout.graph
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var disabled; // EjsS Model.Variables.layout.disabled

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
      r0 : r0,
      level : level,
      infections : infections,
      isPlaying : isPlaying,
      interval : interval,
      currentLevelInfections : currentLevelInfections,
      newInfections : newInfections,
      x : x,
      y : y,
      simulationArea : simulationArea,
      stopInfection : stopInfection,
      generations : generations,
      isRunning : isRunning,
      pointsInLevel : pointsInLevel,
      sizeX : sizeX,
      sizeY : sizeY,
      infectionNumber : infectionNumber,
      t : t,
      dt : dt,
      pi : pi,
      font : font,
      n : n,
      angle : angle,
      posX : posX,
      posY : posY,
      velX : velX,
      velY : velY,
      accX : accX,
      accY : accY,
      theta : theta,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled,
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
      posX : posX,
      posY : posY,
      velX : velX,
      velY : velY,
      accX : accX,
      accY : accY,
      theta : theta,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.r0 != "undefined") r0 = json.r0;
    if(typeof json.level != "undefined") level = json.level;
    if(typeof json.infections != "undefined") infections = json.infections;
    if(typeof json.isPlaying != "undefined") isPlaying = json.isPlaying;
    if(typeof json.interval != "undefined") interval = json.interval;
    if(typeof json.currentLevelInfections != "undefined") currentLevelInfections = json.currentLevelInfections;
    if(typeof json.newInfections != "undefined") newInfections = json.newInfections;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.simulationArea != "undefined") simulationArea = json.simulationArea;
    if(typeof json.stopInfection != "undefined") stopInfection = json.stopInfection;
    if(typeof json.generations != "undefined") generations = json.generations;
    if(typeof json.isRunning != "undefined") isRunning = json.isRunning;
    if(typeof json.pointsInLevel != "undefined") pointsInLevel = json.pointsInLevel;
    if(typeof json.sizeX != "undefined") sizeX = json.sizeX;
    if(typeof json.sizeY != "undefined") sizeY = json.sizeY;
    if(typeof json.infectionNumber != "undefined") infectionNumber = json.infectionNumber;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.posX != "undefined") posX = json.posX;
    if(typeof json.posY != "undefined") posY = json.posY;
    if(typeof json.velX != "undefined") velX = json.velX;
    if(typeof json.velY != "undefined") velY = json.velY;
    if(typeof json.accX != "undefined") accX = json.accX;
    if(typeof json.accY != "undefined") accY = json.accY;
    if(typeof json.theta != "undefined") theta = json.theta;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
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
    if(typeof json.posX != "undefined") posX = json.posX;
    if(typeof json.posY != "undefined") posY = json.posY;
    if(typeof json.velX != "undefined") velX = json.velX;
    if(typeof json.velY != "undefined") velY = json.velY;
    if(typeof json.accX != "undefined") accX = json.accX;
    if(typeof json.accY != "undefined") accY = json.accY;
    if(typeof json.theta != "undefined") theta = json.theta;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
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
    __pagesEnabled["Init Page 1"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["FixRel Page 1"] = false;
    __pagesEnabled["FixRel Page 2"] = false;
    __pagesEnabled["FixRel Page 3"] = true;
    __pagesEnabled["Lines"] = false;
    __pagesEnabled["FixRel Page 5"] = false;
    __pagesEnabled["FixRel Page 6"] = true;
  });

  _model.addToReset(function() {
    r0 = 3; // EjsS Model.Variables.Var Table 5.r0
    level = 0; // EjsS Model.Variables.Var Table 5.level
    infections = [{level: 0, count: 1}]; // EjsS Model.Variables.Var Table 5.infections
    isPlaying = false; // EjsS Model.Variables.Var Table 5.isPlaying
    newInfections = currentLevelInfections * r0; // EjsS Model.Variables.Var Table 5.newInfections
    x = []; // EjsS Model.Variables.Var Table 5.x
    y = []; // EjsS Model.Variables.Var Table 5.y
    simulationArea = {offsetHeight:50}; // EjsS Model.Variables.Var Table 5.simulationArea
    stopInfection = 4; // EjsS Model.Variables.Var Table 5.stopInfection
    generations = [[{infected: true}]]; // EjsS Model.Variables.Var Table 5.generations
    isRunning = false; // EjsS Model.Variables.Var Table 5.isRunning
    pointsInLevel = 0; // EjsS Model.Variables.Var Table 5.pointsInLevel
    sizeX = []; // EjsS Model.Variables.Var Table 5.sizeX
    sizeY = []; // EjsS Model.Variables.Var Table 5.sizeY
    infectionNumber = []; // EjsS Model.Variables.Var Table 5.infectionNumber
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
    n = 32; // EjsS Model.Variables.Var Table.n
    angle = pi; // EjsS Model.Variables.Var Table.angle
    posX = 0; // EjsS Model.Variables.Var Table.posX
    posY = 0; // EjsS Model.Variables.Var Table.posY
    velX = 0; // EjsS Model.Variables.Var Table.velX
    velY = 0; // EjsS Model.Variables.Var Table.velY
    accX = 0; // EjsS Model.Variables.Var Table.accX
    accY = 0; // EjsS Model.Variables.Var Table.accY
  });

  _model.addToReset(function() {
    theta = pi/4; // EjsS Model.Variables.circle.theta
  });

  _model.addToReset(function() {
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width1 = "100%"; // EjsS Model.Variables.layout.Width1
    Width2 = "50%"; // EjsS Model.Variables.layout.Width2
    world = true; // EjsS Model.Variables.layout.world
    graph = true; // EjsS Model.Variables.layout.graph
    disabledworld = false; // EjsS Model.Variables.layout.disabledworld
    disabled = false; // EjsS Model.Variables.layout.disabled
  });

  _model.addToReset(function() {
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
    _model.setFPS(1);
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

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 1"]) return;
    // Init Page 1  // > Initialization.Init Page 1:1
    infectionNumber[0] = 1  // > Initialization.Init Page 1:2
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
    if (!__pagesEnabled["FixRel Page 1"]) return;
    if (level == 0) {  // > FixedRelations.FixRel Page 1:1
        x[0] = 0  // > FixedRelations.FixRel Page 1:2
        y[0] = 0  // > FixedRelations.FixRel Page 1:3
    } else if (level == 1) {  // > FixedRelations.FixRel Page 1:4
         // > FixedRelations.FixRel Page 1:5
        x[1] = 100  // > FixedRelations.FixRel Page 1:6
        y[1] = 100  // > FixedRelations.FixRel Page 1:7
        x[2] = 100  // > FixedRelations.FixRel Page 1:8
        y[2] = 0  // > FixedRelations.FixRel Page 1:9
        x[3] = 100  // > FixedRelations.FixRel Page 1:10
        y[3] = -100  // > FixedRelations.FixRel Page 1:11
    } else if (level == 2) {  // > FixedRelations.FixRel Page 1:12
        // > FixedRelations.FixRel Page 1:13
        x[4] = 200  // > FixedRelations.FixRel Page 1:14
        y[4] = 400  // > FixedRelations.FixRel Page 1:15
        x[5] = 200  // > FixedRelations.FixRel Page 1:16
        y[5] = 300  // > FixedRelations.FixRel Page 1:17
        x[6] = 200  // > FixedRelations.FixRel Page 1:18
        y[6] = 200  // > FixedRelations.FixRel Page 1:19
        x[7] = 200  // > FixedRelations.FixRel Page 1:20
        y[7] = 100  // > FixedRelations.FixRel Page 1:21
        x[8] = 200  // > FixedRelations.FixRel Page 1:22
        y[8] = 0  // > FixedRelations.FixRel Page 1:23
        x[9] = 200  // > FixedRelations.FixRel Page 1:24
        y[9] = -100  // > FixedRelations.FixRel Page 1:25
        x[10] = 200  // > FixedRelations.FixRel Page 1:26
        y[10] = -200  // > FixedRelations.FixRel Page 1:27
        x[11] = 200  // > FixedRelations.FixRel Page 1:28
        y[11] = -300  // > FixedRelations.FixRel Page 1:29
        x[12] = 200  // > FixedRelations.FixRel Page 1:30
        y[12] = -400  // > FixedRelations.FixRel Page 1:31
    }  // > FixedRelations.FixRel Page 1:32
    // Add more levels as needed, following the same pattern.  // > FixedRelations.FixRel Page 1:33
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page 2"]) return;
      // Initialize the first point  // > FixedRelations.FixRel Page 2:1
        x[0] = 0;  // > FixedRelations.FixRel Page 2:2
        y[0] = 0;  // > FixedRelations.FixRel Page 2:3
        if (level >= 1) {  // > FixedRelations.FixRel Page 2:4
            for (let i = 1; i <= 3; i++) {  // > FixedRelations.FixRel Page 2:5
                x[i] = 100;  // > FixedRelations.FixRel Page 2:6
                y[i] = (i - 2) * 100; // Generates 100, 0, -100 for y  // > FixedRelations.FixRel Page 2:7
            }  // > FixedRelations.FixRel Page 2:8
        }  // > FixedRelations.FixRel Page 2:9
        if (level >= 2) {  // > FixedRelations.FixRel Page 2:10
            for (let i = 4; i <= 12; i++) {  // > FixedRelations.FixRel Page 2:11
                x[i] = 200;  // > FixedRelations.FixRel Page 2:12
                y[i] = (i - 8) * 100; // Generates values from 400 to -400 for y  // > FixedRelations.FixRel Page 2:13
            }  // > FixedRelations.FixRel Page 2:14
        }  // > FixedRelations.FixRel Page 2:15
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page 3"]) return;
     // Initialize the first point  // > FixedRelations.FixRel Page 3:1
        x[0] = 0;  // > FixedRelations.FixRel Page 3:2
        y[0] = 0;  // > FixedRelations.FixRel Page 3:3
        let index = 1;  // > FixedRelations.FixRel Page 3:4
        let step = 100;  // > FixedRelations.FixRel Page 3:5
        for (let l = 1; l <= level; l++) {  // > FixedRelations.FixRel Page 3:6
             //pointsInLevel = Math.pow(3, l ) ; // Calculate the number of points in this level  // > FixedRelations.FixRel Page 3:7
             pointsInLevel = Math.pow(r0, l ) ; // Calculate the number of points in this level  // > FixedRelations.FixRel Page 3:8
             infectionNumber[level] = pointsInLevel; // Store the value of pointsInLevel  // > FixedRelations.FixRel Page 3:9
            let startY = (pointsInLevel - 1) / 2 * step; // Starting y coordinate for the level  // > FixedRelations.FixRel Page 3:10
            for (let i = 0; i < pointsInLevel; i++) {  // > FixedRelations.FixRel Page 3:11
                x[index] = l * step;  // > FixedRelations.FixRel Page 3:12
                y[index] = startY - i * step;  // > FixedRelations.FixRel Page 3:13
                index++;  // > FixedRelations.FixRel Page 3:14
            }  // > FixedRelations.FixRel Page 3:15
        }  // > FixedRelations.FixRel Page 3:16
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["Lines"]) return;
     let connections = [];  // > FixedRelations.Lines:1
        let step = 100;  // > FixedRelations.Lines:2
        let index = 1;  // > FixedRelations.Lines:3
        for (let l = 1; l <= Math.log(x.length) / Math.log(3); l++) {  // > FixedRelations.Lines:4
            let pointsInLevel = Math.pow(3, l);  // > FixedRelations.Lines:5
            for (let i = 0; i < pointsInLevel; i++) {  // > FixedRelations.Lines:6
                let parentIndex;  // > FixedRelations.Lines:7
                if (l === 1) {  // > FixedRelations.Lines:8
                    parentIndex = 0; // The first level points connect to the origin  // > FixedRelations.Lines:9
                } else {  // > FixedRelations.Lines:10
                    parentIndex = Math.floor((index - 1) / 3); // Calculate the parent index  // > FixedRelations.Lines:11
                }  // > FixedRelations.Lines:12
                sizeX = x[index] - x[parentIndex];  // > FixedRelations.Lines:13
                sizeY = y[index] - y[parentIndex];  // > FixedRelations.Lines:14
                connections.push({ sizeX, sizeY });  // > FixedRelations.Lines:15
                index++;  // > FixedRelations.Lines:16
            }  // > FixedRelations.Lines:17
        }  // > FixedRelations.Lines:18
        return connections;  // > FixedRelations.Lines:19
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page 5"]) return;
    // FixRel Page 5  // > FixedRelations.FixRel Page 5:1
    if (level == 1) {  // > FixedRelations.FixRel Page 5:2
         // > FixedRelations.FixRel Page 5:3
    sizeX[1] = x[0] -  x[1]   // > FixedRelations.FixRel Page 5:4
    sizeY[1] = y[0] -  y[1]   // > FixedRelations.FixRel Page 5:5
    sizeX[2] = x[0] -  x[2]   // > FixedRelations.FixRel Page 5:6
    sizeY[2] = y[0] -  y[2]   // > FixedRelations.FixRel Page 5:7
    sizeX[3] = x[0] -  x[3]   // > FixedRelations.FixRel Page 5:8
    sizeY[3] = y[0] -  y[3]   // > FixedRelations.FixRel Page 5:9
         // > FixedRelations.FixRel Page 5:10
    }  // > FixedRelations.FixRel Page 5:11
    else if (level == 2) {  // > FixedRelations.FixRel Page 5:12
         // > FixedRelations.FixRel Page 5:13
    sizeX[4] = x[1] -  x[4]   // > FixedRelations.FixRel Page 5:14
    sizeY[4] = y[1] -  y[4]   // > FixedRelations.FixRel Page 5:15
    sizeX[5] = x[1] -  x[5]   // > FixedRelations.FixRel Page 5:16
    sizeY[5] = y[1] -  y[5]   // > FixedRelations.FixRel Page 5:17
    sizeX[6] = x[1] -  x[6]   // > FixedRelations.FixRel Page 5:18
    sizeY[6] = y[1] -  y[6]   // > FixedRelations.FixRel Page 5:19
    sizeX[7] = x[2] -  x[7]   // > FixedRelations.FixRel Page 5:20
    sizeY[7] = y[2] -  y[7]   // > FixedRelations.FixRel Page 5:21
    sizeX[8] = x[2] -  x[8]   // > FixedRelations.FixRel Page 5:22
    sizeY[8] = y[2] -  y[8]   // > FixedRelations.FixRel Page 5:23
    sizeX[9] = x[2] -  x[9]   // > FixedRelations.FixRel Page 5:24
    sizeY[9] = y[2] -  y[9]   // > FixedRelations.FixRel Page 5:25
    sizeX[10] = x[3] -  x[10]   // > FixedRelations.FixRel Page 5:26
    sizeY[10] = y[3] -  y[10]   // > FixedRelations.FixRel Page 5:27
    sizeX[11] = x[3] -  x[11]   // > FixedRelations.FixRel Page 5:28
    sizeY[11] = y[3] -  y[11]   // > FixedRelations.FixRel Page 5:29
    sizeX[12] = x[3] -  x[12]   // > FixedRelations.FixRel Page 5:30
    sizeY[12] = y[3] -  y[12]   // > FixedRelations.FixRel Page 5:31
         // > FixedRelations.FixRel Page 5:32
    }  // > FixedRelations.FixRel Page 5:33
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page 6"]) return;
     let index = 1;  // > FixedRelations.FixRel Page 6:1
        for (let l = 1; l <= level; l++) {  // > FixedRelations.FixRel Page 6:2
            //let pointsInLevel = Math.pow(3, l);  // > FixedRelations.FixRel Page 6:3
            let pointsInLevel = Math.pow(r0, l);  // > FixedRelations.FixRel Page 6:4
            for (let i = 0; i < pointsInLevel; i++) {  // > FixedRelations.FixRel Page 6:5
                let parentIndex;  // > FixedRelations.FixRel Page 6:6
                if (l === 1) {  // > FixedRelations.FixRel Page 6:7
                    parentIndex = 0; // The first level points connect to the origin  // > FixedRelations.FixRel Page 6:8
                } else {  // > FixedRelations.FixRel Page 6:9
                   // parentIndex = Math.floor((index - 1) / 3); // Calculate the parent index  // > FixedRelations.FixRel Page 6:10
                     parentIndex = Math.floor((index - 1) / r0); // Calculate the parent index  // > FixedRelations.FixRel Page 6:11
                }  // > FixedRelations.FixRel Page 6:12
                sizeX[index] = x[parentIndex] - x[index];  // > FixedRelations.FixRel Page 6:13
                sizeY[index] = y[parentIndex] - y[index];  // > FixedRelations.FixRel Page 6:14
                index++;  // > FixedRelations.FixRel Page 6:15
            }  // > FixedRelations.FixRel Page 6:16
        }  // > FixedRelations.FixRel Page 6:17
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


    __odeSelf._getOdeVars = function (){ return["level","t"]};

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
      __eventSolver.initialize(1);
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
        if (__state[__cIn]!=level) __mustReinitialize = true;
        __state[__cIn++] = level;
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
      if (1===0) return 0;
      if (__mustInitialize) __odeSelf.initializeSolver();
      if (__arraysChanged()) { __instantiateSolver(); __odeSelf.initializeSolver(); }
      __eventSolver.setStepSize(1);
      __eventSolver.setInternalStepSize(1);
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
        level = __state[__cOut++];
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
        var level = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = 1; // Rate for ODE: Evol Page:level
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
        var level = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        level = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = level;
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

  function _historic_level(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "HtmlView", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new R0_infection_model_template_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView linking property 'Width' for element 'fullscreen'
          _view.slider.linkProperty("Value",  function() { return r0; }, function(_v) { r0 = _v; } ); // HtmlView linking property 'Value' for element 'slider'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  _pause();
  //speech ("paused");

}); // HtmlView setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return isRunning; }, function(_v) { isRunning = _v; } ); // HtmlView linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  //speech ("play");

}); // HtmlView setting action 'OnClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'playPauseButton2'
          _view.stepButton2.linkProperty("Disabled",  function() { return level>=6; } ); // HtmlView linking property 'Disabled' for element 'stepButton2'
          _view.stepButton2.setAction("OnClick", function(_data,_info) {
  _step();

}); // HtmlView setting action 'OnClick' for element 'stepButton2'
          _view.stepButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'stepButton2'
          _view.resetButton3.setAction("OnClick", function(_data,_info) {
  _reset();
  //speechzh ("你好");

}); // HtmlView setting action 'OnClick' for element 'resetButton3'
          _view.resetButton3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'resetButton3'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // HtmlView linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return "pointsInLevel="+pointsInLevel; } ); // HtmlView linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();

}); // HtmlView setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return "pointsInLevel="+pointsInLevel; } ); // HtmlView linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView linking property 'Visibility' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BLMessage",  function() { return "infectionNumber="+infectionNumber; } ); // HtmlView linking property 'BLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return "t = "+_view._format(t,"0.00")+ " s "; } ); // HtmlView linking property 'BRMessage' for element 'plottingPanel'
          _view.shape.linkProperty("X",  function() { return posX; }, function(_v) { posX = _v; } ); // HtmlView linking property 'X' for element 'shape'
          _view.shape.linkProperty("Y",  function() { return posY; }, function(_v) { posY = _v; } ); // HtmlView linking property 'Y' for element 'shape'
          _view.shapeSet2D.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView linking property 'X' for element 'shapeSet2D'
          _view.shapeSet2D.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView linking property 'Y' for element 'shapeSet2D'
          _view.arrowSet2D.linkProperty("SizeX",  function() { return sizeX; }, function(_v) { sizeX = _v; } ); // HtmlView linking property 'SizeX' for element 'arrowSet2D'
          _view.arrowSet2D.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView linking property 'X' for element 'arrowSet2D'
          _view.arrowSet2D.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView linking property 'Y' for element 'arrowSet2D'
          _view.arrowSet2D.linkProperty("SizeY",  function() { return sizeY; }, function(_v) { sizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'arrowSet2D'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(1);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function R0_infection_model_template_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = R0_infection_model_template_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function R0_infection_model_template_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView: declaration of element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView: setting property 'BorderWidth' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView: declaration of element 'controlPanel'
      .setProperty("CSS",{"display":"inline"}) // EJsS HtmlView.HtmlView: setting property 'CSS' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'label'
      .setProperty("Text","R0 =") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'slider'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'slider'
      .setProperty("Minimum",1) // EJsS HtmlView.HtmlView: setting property 'Minimum' for element 'slider'
      .setProperty("Maximum",5) // EJsS HtmlView.HtmlView: setting property 'Maximum' for element 'slider'
      .setProperty("ShowText","true") // EJsS HtmlView.HtmlView: setting property 'ShowText' for element 'slider'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'slider'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView: setting property 'Step' for element 'slider'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'playPauseButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView: setting property 'TextOff' for element 'playPauseButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'stepButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'stepButton2'
      .setProperty("Text","Step|►") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'resetButton3'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'resetButton3'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView: declaration of element 'panel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView: declaration of element 'plottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("EnabledZooming",true) // EJsS HtmlView.HtmlView: setting property 'EnabledZooming' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",100) // EJsS HtmlView.HtmlView: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",100) // EJsS HtmlView.HtmlView: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("MaximumY",1000) // EJsS HtmlView.HtmlView: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",800) // EJsS HtmlView.HtmlView: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",-1000) // EJsS HtmlView.HtmlView: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("MarginX",5) // EJsS HtmlView.HtmlView: setting property 'MarginX' for element 'plottingPanel'
      .setProperty("MarginY",5) // EJsS HtmlView.HtmlView: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'shape'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'shape'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'shape'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet2D", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'shapeSet2D'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'shapeSet2D'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'shapeSet2D'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"arrowSet2D", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'arrowSet2D'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'arrowSet2D'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView: setting property 'Offset' for element 'arrowSet2D'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new R0_infection_model_template("_topFrame","_ejs_library/",null);
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
