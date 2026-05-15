/* _inputParameters: an object with different values for the model parameters */
function geoboard(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var gridSize; // EjsS Model.Variables.Var Table 5.gridSize
  var spacing; // EjsS Model.Variables.Var Table 5.spacing
  var x; // EjsS Model.Variables.Var Table 5.x
  var y; // EjsS Model.Variables.Var Table 5.y
  var elementInteracted; // EjsS Model.Variables.Var Table 5.elementInteracted
  var xLine; // EjsS Model.Variables.Var Table 5.xLine
  var yLine; // EjsS Model.Variables.Var Table 5.yLine
  var lineSizeX; // EjsS Model.Variables.Var Table 5.lineSizeX
  var lineSizeY; // EjsS Model.Variables.Var Table 5.lineSizeY
  var counter; // EjsS Model.Variables.Var Table 5.counter 
  var polColor; // EjsS Model.Variables.Var Table 5.polColor
  var elementInteractedLine; // EjsS Model.Variables.Var Table 5.elementInteractedLine
  var visibleLine; // EjsS Model.Variables.Var Table 5.visibleLine

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
      gridSize : gridSize,
      spacing : spacing,
      x : x,
      y : y,
      elementInteracted : elementInteracted,
      xLine : xLine,
      yLine : yLine,
      lineSizeX : lineSizeX,
      lineSizeY : lineSizeY,
      counter  : counter ,
      polColor : polColor,
      elementInteractedLine : elementInteractedLine,
      visibleLine : visibleLine,
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
    if(typeof json.gridSize != "undefined") gridSize = json.gridSize;
    if(typeof json.spacing != "undefined") spacing = json.spacing;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.elementInteracted != "undefined") elementInteracted = json.elementInteracted;
    if(typeof json.xLine != "undefined") xLine = json.xLine;
    if(typeof json.yLine != "undefined") yLine = json.yLine;
    if(typeof json.lineSizeX != "undefined") lineSizeX = json.lineSizeX;
    if(typeof json.lineSizeY != "undefined") lineSizeY = json.lineSizeY;
    if(typeof json.counter  != "undefined") counter  = json.counter ;
    if(typeof json.polColor != "undefined") polColor = json.polColor;
    if(typeof json.elementInteractedLine != "undefined") elementInteractedLine = json.elementInteractedLine;
    if(typeof json.visibleLine != "undefined") visibleLine = json.visibleLine;
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
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["Init Page 1"] = true;
    __pagesEnabled["colorPicker"] = true;
    __pagesEnabled["Evol Page"] = true;
  });

  _model.addToReset(function() {
    spacing = 1; // EjsS Model.Variables.Var Table 5.spacing
    x = []; // EjsS Model.Variables.Var Table 5.x
    y = []; // EjsS Model.Variables.Var Table 5.y
    elementInteracted = -1; // EjsS Model.Variables.Var Table 5.elementInteracted
    xLine = []; // EjsS Model.Variables.Var Table 5.xLine
    yLine = []; // EjsS Model.Variables.Var Table 5.yLine
    lineSizeX = []; // EjsS Model.Variables.Var Table 5.lineSizeX
    lineSizeY = []; // EjsS Model.Variables.Var Table 5.lineSizeY
    counter  = 0; // EjsS Model.Variables.Var Table 5.counter 
    polColor = []; // EjsS Model.Variables.Var Table 5.polColor
    elementInteractedLine = -1; // EjsS Model.Variables.Var Table 5.elementInteractedLine
    visibleLine = []; // EjsS Model.Variables.Var Table 5.visibleLine
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

  // Custom Page 4  // > CustomCode.Custom Page 4:1

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
    if (!__pagesEnabled["undefined"]) return;
    // to hide the initial spawn of lines length at 0,0  // > Initialization.undefined:1
    xLine[counter] = undefined;  // > Initialization.undefined:2
    yLine[counter] = undefined;  // > Initialization.undefined:3
    lineSizeX[counter] = undefined;  // > Initialization.undefined:4
    lineSizeY[counter] = undefined;  // > Initialization.undefined:5
    //counter = counter + 1;  // > Initialization.undefined:6
    if (gridSize == undefined ){  // > Initialization.undefined:7
      gridSize = 10  // > Initialization.undefined:8
      }  // > Initialization.undefined:9
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 1"]) return;
    for (var i = 0; i <= gridSize; i++) {  // > Initialization.Init Page 1:1
        for (var j = 0; j <= gridSize; j++) {  // > Initialization.Init Page 1:2
            x.push(i * spacing);  // > Initialization.Init Page 1:3
            y.push(j * spacing);  // > Initialization.Init Page 1:4
        }  // > Initialization.Init Page 1:5
    }  // > Initialization.Init Page 1:6
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["colorPicker"]) return;
    function toggleInputType(id) {  // > Initialization.colorPicker:1
        var input = document.getElementById(id);  // > Initialization.colorPicker:2
        input.type = 'color';  // > Initialization.colorPicker:3
    }  // > Initialization.colorPicker:4
    // Change input type  // > Initialization.colorPicker:5
    toggleInputType('picker');  // > Initialization.colorPicker:6
  });

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

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


    __odeSelf._getOdeVars = function (){ return["posX","velX","t"]};

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
        if (__state[__cIn]!=posX) __mustReinitialize = true;
        __state[__cIn++] = posX;
        if (__state[__cIn]!=velX) __mustReinitialize = true;
        __state[__cIn++] = velX;
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
        posX = __state[__cOut++];
        velX = __state[__cOut++];
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
        var posX = _aState[__cOut++];
        var velX = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = 1; // Rate for ODE: Evol Page:posX
        _aRate[__cRate++] = 1; // Rate for ODE: Evol Page:velX
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
        var posX = _aState[__cOut++];
        var velX = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        posX = __state[__cOut++];
        velX = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = posX;
        __state[__cIn++] = velX;
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

  function _historic_posX(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_velX(__time) {
    var __index = 0 + 1;
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
    _view = new geoboard_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView linking property 'Width' for element 'fullscreen'
          _view.field.linkProperty("Value",  function() { return gridSize; }, function(_v) { gridSize = _v; } ); // HtmlView linking property 'Value' for element 'field'
          _view.field.setAction("OnChange", function(_data,_info) {
  gridSize = Math.min (gridSize,10)
  gridSize = Math.max (gridSize,1);

}); // HtmlView setting action 'OnChange' for element 'field'
          _view.field.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'field'
          _view.picker.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'picker'
          _view.DeleteLine.setAction("OnPress", function(_data,_info) {
  visibleLine[elementInteractedLine] = false;

}); // HtmlView setting action 'OnPress' for element 'DeleteLine'
          _view.DeleteLine.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'DeleteLine'
          _view.newLine.setAction("OnPress", function(_data,_info) {
  xLine[counter] = undefined;
  yLine[counter] = undefined;
  lineSizeX[counter] = undefined;
  lineSizeY[counter] = undefined;
  counter = counter + 1;

}); // HtmlView setting action 'OnPress' for element 'newLine'
          _view.newLine.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'newLine'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  _pause();
  //speech ("paused");

}); // HtmlView setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  //speech ("play");

}); // HtmlView setting action 'OnClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'playPauseButton2'
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
          _view.plottingPanel.linkProperty("TRMessage",  function() { return "elementInteracted="+elementInteracted; } ); // HtmlView linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();

}); // HtmlView setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return "xLine="+xLine+"\nyLine="+yLine+"\ncounter ="+counter+"\nlineSizeX="+lineSizeX+"\nvisibleLine="+visibleLine; } ); // HtmlView linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return gridSize; }, function(_v) { gridSize = _v; } ); // HtmlView linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return gridSize; }, function(_v) { gridSize = _v; } ); // HtmlView linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView linking property 'Visibility' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BLMessage",  function() { return " polColor="+ polColor; } ); // HtmlView linking property 'BLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return "t = "+_view._format(t,"0.00")+ " s "; } ); // HtmlView linking property 'BRMessage' for element 'plottingPanel'
          _view.shapeSet2D.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView linking property 'X' for element 'shapeSet2D'
          _view.shapeSet2D.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView linking property 'Y' for element 'shapeSet2D'
          _view.shapeSet2D.setAction("OnPress", function(_data,_info) {
  elementInteracted =elementInteracted
  xLine[counter] = x[elementInteracted]
  yLine[counter] = y[elementInteracted]
  lineSizeX[counter] = xLine[counter-1] - xLine[counter]
  lineSizeY[counter] = yLine[counter-1] - yLine[counter]
  //initialise the color inside the line
  polColor[counter] = document.getElementById('picker').value;
  visibleLine[counter] = true
  counter = counter +1;

}); // HtmlView setting action 'OnPress' for element 'shapeSet2D'
          _view.shapeSet2D.linkProperty("ElementInteracted",  function() { return elementInteracted; }, function(_v) { elementInteracted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'shapeSet2D'
          _view.segmentSet2D.linkProperty("SizeX",  function() { return lineSizeX; }, function(_v) { lineSizeX = _v; } ); // HtmlView linking property 'SizeX' for element 'segmentSet2D'
          _view.segmentSet2D.linkProperty("X",  function() { return xLine; }, function(_v) { xLine = _v; } ); // HtmlView linking property 'X' for element 'segmentSet2D'
          _view.segmentSet2D.linkProperty("LineColor",  function() { return polColor; }, function(_v) { polColor = _v; } ); // HtmlView linking property 'LineColor' for element 'segmentSet2D'
          _view.segmentSet2D.linkProperty("Y",  function() { return yLine; }, function(_v) { yLine = _v; } ); // HtmlView linking property 'Y' for element 'segmentSet2D'
          _view.segmentSet2D.setAction("OnPress", function(_data,_info) {
  polColor[elementInteractedLine] = document.getElementById('picker').value;

}); // HtmlView setting action 'OnPress' for element 'segmentSet2D'
          _view.segmentSet2D.linkProperty("Visibility",  function() { return visibleLine; }, function(_v) { visibleLine = _v; } ); // HtmlView linking property 'Visibility' for element 'segmentSet2D'
          _view.segmentSet2D.linkProperty("SizeY",  function() { return lineSizeY; }, function(_v) { lineSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'segmentSet2D'
          _view.segmentSet2D.linkProperty("ElementInteracted",  function() { return elementInteractedLine; }, function(_v) { elementInteractedLine = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'segmentSet2D'
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
function geoboard_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = geoboard_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function geoboard_View_0 (_topFrame) {
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

    _view._addElement(EJSS_INTERFACE.numberField,"field", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'field'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'field'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'field'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"picker", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'picker'
      ;

    _view._addElement(EJSS_INTERFACE.button,"DeleteLine", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'DeleteLine'
      .setProperty("Tooltip","slect the line first and then click") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'DeleteLine'
      .setProperty("Text","Delete Line") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'DeleteLine'
      ;

    _view._addElement(EJSS_INTERFACE.button,"newLine", _view.controlPanel) // EJsS HtmlView.HtmlView: declaration of element 'newLine'
      .setProperty("Text","new Line") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'newLine'
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
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'stepButton2'
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
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_X") // EJsS HtmlView.HtmlView: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("MarginX",5) // EJsS HtmlView.HtmlView: setting property 'MarginX' for element 'plottingPanel'
      .setProperty("MarginY",5) // EJsS HtmlView.HtmlView: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet2D", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'shapeSet2D'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'shapeSet2D'
      .setProperty("SizeX",0.1) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'shapeSet2D'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'shapeSet2D'
      .setProperty("SizeY",0.1) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'shapeSet2D'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'shapeSet2D'
      ;

    _view._addElement(EJSS_DRAWING2D.segmentSet,"segmentSet2D", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'segmentSet2D'
      .setProperty("Sensitivity",20) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'segmentSet2D'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'segmentSet2D'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'segmentSet2D'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new geoboard("_topFrame","_ejs_library/",null);
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
