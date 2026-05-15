/* _inputParameters: an object with different values for the model parameters */
function cube3D(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var pi; // EjsS Model.Variables.Var Table.pi
  var n; // EjsS Model.Variables.Var Table.n
  var x; // EjsS Model.Variables.Var Table.x
  var y; // EjsS Model.Variables.Var Table.y
  var z; // EjsS Model.Variables.Var Table.z
  var zCube; // EjsS Model.Variables.Var Table.zCube
  var elementInteracted; // EjsS Model.Variables.Var Table.elementInteracted
  var clickCount; // EjsS Model.Variables.Var Table.clickCount
  var sizeZ; // EjsS Model.Variables.Var Table.sizeZ
  var cameraAlititude; // EjsS Model.Variables.Var Table.cameraAlititude
  var cameraAzimuth; // EjsS Model.Variables.Var Table.cameraAzimuth
  var cameraTilt; // EjsS Model.Variables.Var Table.cameraTilt
  var angle; // EjsS Model.Variables.Var Table.angle
  var polColor; // EjsS Model.Variables.Var Table.polColor
  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var font; // EjsS Model.Variables.Var Table.font
  var angle; // EjsS Model.Variables.Var Table.angle

  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var world; // EjsS Model.Variables.layout.world
  var graph; // EjsS Model.Variables.layout.graph
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var disabled; // EjsS Model.Variables.layout.disabled

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
      pi : pi,
      n : n,
      x : x,
      y : y,
      z : z,
      zCube : zCube,
      elementInteracted : elementInteracted,
      clickCount : clickCount,
      sizeZ : sizeZ,
      cameraAlititude : cameraAlititude,
      cameraAzimuth : cameraAzimuth,
      cameraTilt : cameraTilt,
      angle : angle,
      polColor : polColor,
      t : t,
      dt : dt,
      font : font,
      angle : angle,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      pi : pi,
      n : n,
      x : x,
      y : y,
      z : z,
      zCube : zCube,
      elementInteracted : elementInteracted,
      clickCount : clickCount,
      sizeZ : sizeZ,
      cameraAlititude : cameraAlititude,
      cameraAzimuth : cameraAzimuth,
      cameraTilt : cameraTilt,
      angle : angle,
      polColor : polColor,
      t : t,
      dt : dt,
      font : font,
      angle : angle,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.z != "undefined") z = json.z;
    if(typeof json.zCube != "undefined") zCube = json.zCube;
    if(typeof json.elementInteracted != "undefined") elementInteracted = json.elementInteracted;
    if(typeof json.clickCount != "undefined") clickCount = json.clickCount;
    if(typeof json.sizeZ != "undefined") sizeZ = json.sizeZ;
    if(typeof json.cameraAlititude != "undefined") cameraAlititude = json.cameraAlititude;
    if(typeof json.cameraAzimuth != "undefined") cameraAzimuth = json.cameraAzimuth;
    if(typeof json.cameraTilt != "undefined") cameraTilt = json.cameraTilt;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.polColor != "undefined") polColor = json.polColor;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.z != "undefined") z = json.z;
    if(typeof json.zCube != "undefined") zCube = json.zCube;
    if(typeof json.elementInteracted != "undefined") elementInteracted = json.elementInteracted;
    if(typeof json.clickCount != "undefined") clickCount = json.clickCount;
    if(typeof json.sizeZ != "undefined") sizeZ = json.sizeZ;
    if(typeof json.cameraAlititude != "undefined") cameraAlititude = json.cameraAlititude;
    if(typeof json.cameraAzimuth != "undefined") cameraAzimuth = json.cameraAzimuth;
    if(typeof json.cameraTilt != "undefined") cameraTilt = json.cameraTilt;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.polColor != "undefined") polColor = json.polColor;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
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
    __pagesEnabled["colorPicker"] = true;
    __pagesEnabled["Evol Page"] = true;
  });

  _model.addToReset(function() {
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    n = 5; // EjsS Model.Variables.Var Table.n
    x = []; // EjsS Model.Variables.Var Table.x
    y = []; // EjsS Model.Variables.Var Table.y
    z = []; // EjsS Model.Variables.Var Table.z
    zCube = []; // EjsS Model.Variables.Var Table.zCube
    elementInteracted = -1; // EjsS Model.Variables.Var Table.elementInteracted
    clickCount = new Array(n*n); // EjsS Model.Variables.Var Table.clickCount
    (function () {
      var _i0;
      for (_i0=0; _i0<n*n; _i0+=1) {  // EjsS Model.Variables.Var Table.clickCount
        clickCount[_i0] = 0;  // EjsS Model.Variables.Var Table.clickCount
      }
    }());
    sizeZ = new Array(n*n); // EjsS Model.Variables.Var Table.sizeZ
    (function () {
      var _i0;
      for (_i0=0; _i0<n*n; _i0+=1) {  // EjsS Model.Variables.Var Table.sizeZ
        sizeZ[_i0] = 0;  // EjsS Model.Variables.Var Table.sizeZ
      }
    }());
    cameraAlititude = 0; // EjsS Model.Variables.Var Table.cameraAlititude
    cameraAzimuth = 90; // EjsS Model.Variables.Var Table.cameraAzimuth
    cameraTilt = 0; // EjsS Model.Variables.Var Table.cameraTilt
    angle = 0; // EjsS Model.Variables.Var Table.angle
    polColor = new Array(n*n); // EjsS Model.Variables.Var Table.polColor
    (function () {
      var _i0;
      for (_i0=0; _i0<n*n; _i0+=1) {  // EjsS Model.Variables.Var Table.polColor
        polColor[_i0] = "blue";  // EjsS Model.Variables.Var Table.polColor
      }
    }());
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
    angle = pi; // EjsS Model.Variables.Var Table.angle
  });

  _model.addToReset(function() {
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width1 = "50%"; // EjsS Model.Variables.layout.Width1
    Width2 = "50%"; // EjsS Model.Variables.layout.Width2
    world = true; // EjsS Model.Variables.layout.world
    graph = true; // EjsS Model.Variables.layout.graph
    disabledworld = false; // EjsS Model.Variables.layout.disabledworld
    disabled = false; // EjsS Model.Variables.layout.disabled
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
    _model.setAutoplay(true);
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
    if (!__pagesEnabled["Init Page"]) return;
    // Loop through each row and column  // > Initialization.Init Page:1
        for (var i = 1; i <= n; i++) {  // > Initialization.Init Page:2
            for (var j = 1; j <= n; j++) {  // > Initialization.Init Page:3
                x.push(i); // x-coordinate  // > Initialization.Init Page:4
                y.push(j); // y-coordinate  // > Initialization.Init Page:5
            }  // > Initialization.Init Page:6
        }  // > Initialization.Init Page:7
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["colorPicker"]) return;
    function toggleInputType(id) {  // > Initialization.colorPicker:1
        var input = document.getElementById(id);  // > Initialization.colorPicker:2
        input.type = 'color';  // > Initialization.colorPicker:3
    }  // > Initialization.colorPicker:4
    // Change input type  // > Initialization.colorPicker:5
    toggleInputType('picker');  // > Initialization.colorPicker:6
    document.getElementById('picker').value = '#ff0000';  // > Initialization.colorPicker:7
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


    __odeSelf._getOdeVars = function (){ return["cameraAzimuth","t"]};

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
        if (__state[__cIn]!=cameraAzimuth) __mustReinitialize = true;
        __state[__cIn++] = cameraAzimuth;
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
        cameraAzimuth = __state[__cOut++];
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
        var cameraAzimuth = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = 1; // Rate for ODE: Evol Page:cameraAzimuth
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
        var cameraAzimuth = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        cameraAzimuth = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = cameraAzimuth;
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

  function _historic_cameraAzimuth(__time) {
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
    _view = new cube3D_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.picker.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'picker'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  _pause();
  //speech ("paused");

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
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
  _reset();
  //speechzh ("你好");

}); // HtmlView Page setting action 'OnClick' for element 'resetButton3'
          _view.resetButton3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton3'
          _view.cameraAlititude.linkProperty("Value",  function() { return cameraAlititude%360; } ); // HtmlView Page linking property 'Value' for element 'cameraAlititude'
          _view.cameraAlititude.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'cameraAlititude'
          _view.cameraAzimuth.linkProperty("Value",  function() { return cameraAzimuth%360; } ); // HtmlView Page linking property 'Value' for element 'cameraAzimuth'
          _view.cameraAzimuth.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'cameraAzimuth'
          _view.cameraTilt.linkProperty("Value",  function() { return cameraTilt%360; } ); // HtmlView Page linking property 'Value' for element 'cameraTilt'
          _view.cameraTilt.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'cameraTilt'
          _view.angle.linkProperty("Maximum",  function() { return 2*pi; } ); // HtmlView Page linking property 'Maximum' for element 'angle'
          _view.angle.linkProperty("Value",  function() { return angle; }, function(_v) { angle = _v; } ); // HtmlView Page linking property 'Value' for element 'angle'
          _view.angle.setAction("OnChange", function(_data,_info) {
  _update();

}); // HtmlView Page setting action 'OnChange' for element 'angle'
          _view.angle.linkProperty("Step",  function() { return pi/4; } ); // HtmlView Page linking property 'Step' for element 'angle'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();

}); // HtmlView Page setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return "t = "+_view._format(t,"0.00")+ " s "; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanel'
          _view.shapeSet.linkProperty("FillColor",  function() { return polColor; }, function(_v) { polColor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shapeSet'
          _view.shapeSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet'
          _view.shapeSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet'
          _view.shapeSet.setAction("OnPress", function(_data,_info) {
  elementInteracted=elementInteracted
  if (elementInteracted==elementInteracted){
    clickCount[elementInteracted] = clickCount[elementInteracted]+1
    sizeZ[elementInteracted] = clickCount[elementInteracted]-0.05
    zCube[elementInteracted] = +(clickCount[elementInteracted])/2
    }
  polColor[elementInteracted] = document.getElementById('picker').value;

}); // HtmlView Page setting action 'OnPress' for element 'shapeSet'
          _view.shapeSet.linkProperty("ElementInteracted",  function() { return elementInteracted; }, function(_v) { elementInteracted = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'shapeSet'
          _view.textSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return clickCount; }, function(_v) { clickCount = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet'
          _view.drawingPanel3D.linkProperty("Width",  function() { return Width2; }, function(_v) { Width2 = _v; } ); // HtmlView Page linking property 'Width' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("CameraTilt",  function() { return cameraTilt; }, function(_v) { cameraTilt = _v; } ); // HtmlView Page linking property 'CameraTilt' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("CameraAltitude",  function() { return cameraAlititude; }, function(_v) { cameraAlititude = _v; } ); // HtmlView Page linking property 'CameraAltitude' for element 'drawingPanel3D'
          _view.drawingPanel3D.linkProperty("CameraAzimuth",  function() { return cameraAzimuth; }, function(_v) { cameraAzimuth = _v; } ); // HtmlView Page linking property 'CameraAzimuth' for element 'drawingPanel3D'
          _view.boxSet3D.linkProperty("FillColor",  function() { return polColor; }, function(_v) { polColor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'boxSet3D'
          _view.boxSet3D.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'boxSet3D'
          _view.boxSet3D.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'boxSet3D'
          _view.boxSet3D.linkProperty("SizeZ",  function() { return sizeZ; }, function(_v) { sizeZ = _v; } ); // HtmlView Page linking property 'SizeZ' for element 'boxSet3D'
          _view.boxSet3D.linkProperty("Z",  function() { return zCube; }, function(_v) { zCube = _v; } ); // HtmlView Page linking property 'Z' for element 'boxSet3D'
          _view.textSet3D.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'textSet3D'
          _view.textSet3D.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet3D'
          _view.textSet3D.linkProperty("Z",  function() { return zCube; }, function(_v) { zCube = _v; } ); // HtmlView Page linking property 'Z' for element 'textSet3D'
          _view.textSet3D.linkProperty("Text",  function() { return clickCount; }, function(_v) { clickCount = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet3D'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(true);
  _model.setFPS(20);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function cube3D_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = cube3D_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function cube3D_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("CSS",{"display":"inline"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"picker", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'picker'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'picker'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'stepButton2'
      .setProperty("Text","Step|►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton3'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel2'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"cameraAlititude", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'cameraAlititude'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'cameraAlititude'
      .setProperty("Maximum",360) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'cameraAlititude'
      .setProperty("ShowText",true) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'cameraAlititude'
      .setProperty("Format","000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'cameraAlititude'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'cameraAlititude'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"cameraAzimuth", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'cameraAzimuth'
      .setProperty("ShowText",true) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'cameraAzimuth'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'cameraAzimuth'
      .setProperty("Maximum",360) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'cameraAzimuth'
      .setProperty("Format","000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'cameraAzimuth'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'cameraAzimuth'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"cameraTilt", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'cameraTilt'
      .setProperty("ShowText",true) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'cameraTilt'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'cameraTilt'
      .setProperty("Maximum",360) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'cameraTilt'
      .setProperty("Format","000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'cameraTilt'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'cameraTilt'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"angle", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'angle'
      .setProperty("ShowText",true) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'angle'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'angle'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'angle'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",6) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",6) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSet'
      .setProperty("SizeX",0.95) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shapeSet'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet'
      .setProperty("SizeY",0.95) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shapeSet'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shapeSet'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet'
      ;

    _view._addElement(EJSS_DRAWING3D.drawingPanel,"drawingPanel3D", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'drawingPanel3D'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'drawingPanel3D'
      .setProperty("Draggable","ANY") // EJsS HtmlView.HtmlView Page: setting property 'Draggable' for element 'drawingPanel3D'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'drawingPanel3D'
      .setProperty("MaximumZ",6) // EJsS HtmlView.HtmlView Page: setting property 'MaximumZ' for element 'drawingPanel3D'
      .setProperty("MaximumY",6) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'drawingPanel3D'
      .setProperty("MaximumX",6) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'drawingPanel3D'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'drawingPanel3D'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'drawingPanel3D'
      .setProperty("MinimumZ",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumZ' for element 'drawingPanel3D'
      .setProperty("DecorationType","CENTERED_AXES") // EJsS HtmlView.HtmlView Page: setting property 'DecorationType' for element 'drawingPanel3D'
      ;

    _view._addElement(EJSS_DRAWING3D.boxSet,"boxSet3D", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'boxSet3D'
      .setProperty("Transparency",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Transparency' for element 'boxSet3D'
      .setProperty("SizeX",0.95) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'boxSet3D'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'boxSet3D'
      .setProperty("SizeY",0.95) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'boxSet3D'
      .setProperty("DrawLines",true) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'boxSet3D'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'boxSet3D'
      ;

    _view._addElement(EJSS_DRAWING3D.textSet,"textSet3D", _view.drawingPanel3D) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet3D'
      .setProperty("FontColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'FontColor' for element 'textSet3D'
      .setProperty("Font","normal normal 5vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'textSet3D'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new cube3D("_topFrame","_ejs_library/",null);
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
