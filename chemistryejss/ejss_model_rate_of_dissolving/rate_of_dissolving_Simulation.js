/* _inputParameters: an object with different values for the model parameters */
function rate_of_dissolving(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var videoWidth; // EjsS Model.Variables.layout.videoWidth
  var videoHeight; // EjsS Model.Variables.layout.videoHeight
  var factor; // EjsS Model.Variables.layout.factor
  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height

  var topcss; // EjsS Model.Variables.video.topcss
  var css; // EjsS Model.Variables.video.css
  var css2; // EjsS Model.Variables.video.css2
  var control; // EjsS Model.Variables.video.control
  var video; // EjsS Model.Variables.video.video
  var firsttime; // EjsS Model.Variables.video.firsttime

  var offSet; // EjsS Model.Variables.panel.offSet
  var cssPanel; // EjsS Model.Variables.panel.cssPanel
  var cssPanelAndy; // EjsS Model.Variables.panel.cssPanelAndy

  var gold; // EjsS Model.Variables.interactive parts.gold
  var clearcolor; // EjsS Model.Variables.interactive parts.clearcolor
  var optioncolor; // EjsS Model.Variables.interactive parts.optioncolor
  var optioncolor2; // EjsS Model.Variables.interactive parts.optioncolor2
  var choosecopper; // EjsS Model.Variables.interactive parts.choosecopper
  var chooseplastic; // EjsS Model.Variables.interactive parts.chooseplastic
  var playedSize; // EjsS Model.Variables.interactive parts.playedSize
  var playedSize2; // EjsS Model.Variables.interactive parts.playedSize2
  var playedTemperature; // EjsS Model.Variables.interactive parts.playedTemperature
  var playedTemperature2; // EjsS Model.Variables.interactive parts.playedTemperature2
  var playedStirring; // EjsS Model.Variables.interactive parts.playedStirring
  var playedStirring2; // EjsS Model.Variables.interactive parts.playedStirring2

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      t : t,
      dt : dt,
      pi : pi,
      font : font,
      videoWidth : videoWidth,
      videoHeight : videoHeight,
      factor : factor,
      Width : Width,
      Height : Height,
      topcss : topcss,
      css : css,
      css2 : css2,
      control : control,
      video : video,
      firsttime : firsttime,
      offSet : offSet,
      cssPanel : cssPanel,
      cssPanelAndy : cssPanelAndy,
      gold : gold,
      clearcolor : clearcolor,
      optioncolor : optioncolor,
      optioncolor2 : optioncolor2,
      choosecopper : choosecopper,
      chooseplastic : chooseplastic,
      playedSize : playedSize,
      playedSize2 : playedSize2,
      playedTemperature : playedTemperature,
      playedTemperature2 : playedTemperature2,
      playedStirring : playedStirring,
      playedStirring2 : playedStirring2
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      t : t,
      dt : dt,
      pi : pi,
      font : font,
      videoWidth : videoWidth,
      videoHeight : videoHeight,
      factor : factor,
      Width : Width,
      Height : Height,
      topcss : topcss,
      css : css,
      css2 : css2,
      control : control,
      video : video,
      firsttime : firsttime,
      offSet : offSet,
      cssPanel : cssPanel,
      cssPanelAndy : cssPanelAndy,
      gold : gold,
      clearcolor : clearcolor,
      optioncolor : optioncolor,
      optioncolor2 : optioncolor2,
      choosecopper : choosecopper,
      chooseplastic : chooseplastic,
      playedSize : playedSize,
      playedSize2 : playedSize2,
      playedTemperature : playedTemperature,
      playedTemperature2 : playedTemperature2,
      playedStirring : playedStirring,
      playedStirring2 : playedStirring2
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.videoWidth != "undefined") videoWidth = json.videoWidth;
    if(typeof json.videoHeight != "undefined") videoHeight = json.videoHeight;
    if(typeof json.factor != "undefined") factor = json.factor;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.topcss != "undefined") topcss = json.topcss;
    if(typeof json.css != "undefined") css = json.css;
    if(typeof json.css2 != "undefined") css2 = json.css2;
    if(typeof json.control != "undefined") control = json.control;
    if(typeof json.video != "undefined") video = json.video;
    if(typeof json.firsttime != "undefined") firsttime = json.firsttime;
    if(typeof json.offSet != "undefined") offSet = json.offSet;
    if(typeof json.cssPanel != "undefined") cssPanel = json.cssPanel;
    if(typeof json.cssPanelAndy != "undefined") cssPanelAndy = json.cssPanelAndy;
    if(typeof json.gold != "undefined") gold = json.gold;
    if(typeof json.clearcolor != "undefined") clearcolor = json.clearcolor;
    if(typeof json.optioncolor != "undefined") optioncolor = json.optioncolor;
    if(typeof json.optioncolor2 != "undefined") optioncolor2 = json.optioncolor2;
    if(typeof json.choosecopper != "undefined") choosecopper = json.choosecopper;
    if(typeof json.chooseplastic != "undefined") chooseplastic = json.chooseplastic;
    if(typeof json.playedSize != "undefined") playedSize = json.playedSize;
    if(typeof json.playedSize2 != "undefined") playedSize2 = json.playedSize2;
    if(typeof json.playedTemperature != "undefined") playedTemperature = json.playedTemperature;
    if(typeof json.playedTemperature2 != "undefined") playedTemperature2 = json.playedTemperature2;
    if(typeof json.playedStirring != "undefined") playedStirring = json.playedStirring;
    if(typeof json.playedStirring2 != "undefined") playedStirring2 = json.playedStirring2;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.videoWidth != "undefined") videoWidth = json.videoWidth;
    if(typeof json.videoHeight != "undefined") videoHeight = json.videoHeight;
    if(typeof json.factor != "undefined") factor = json.factor;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.topcss != "undefined") topcss = json.topcss;
    if(typeof json.css != "undefined") css = json.css;
    if(typeof json.css2 != "undefined") css2 = json.css2;
    if(typeof json.control != "undefined") control = json.control;
    if(typeof json.video != "undefined") video = json.video;
    if(typeof json.firsttime != "undefined") firsttime = json.firsttime;
    if(typeof json.offSet != "undefined") offSet = json.offSet;
    if(typeof json.cssPanel != "undefined") cssPanel = json.cssPanel;
    if(typeof json.cssPanelAndy != "undefined") cssPanelAndy = json.cssPanelAndy;
    if(typeof json.gold != "undefined") gold = json.gold;
    if(typeof json.clearcolor != "undefined") clearcolor = json.clearcolor;
    if(typeof json.optioncolor != "undefined") optioncolor = json.optioncolor;
    if(typeof json.optioncolor2 != "undefined") optioncolor2 = json.optioncolor2;
    if(typeof json.choosecopper != "undefined") choosecopper = json.choosecopper;
    if(typeof json.chooseplastic != "undefined") chooseplastic = json.chooseplastic;
    if(typeof json.playedSize != "undefined") playedSize = json.playedSize;
    if(typeof json.playedSize2 != "undefined") playedSize2 = json.playedSize2;
    if(typeof json.playedTemperature != "undefined") playedTemperature = json.playedTemperature;
    if(typeof json.playedTemperature2 != "undefined") playedTemperature2 = json.playedTemperature2;
    if(typeof json.playedStirring != "undefined") playedStirring = json.playedStirring;
    if(typeof json.playedStirring2 != "undefined") playedStirring2 = json.playedStirring2;
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
    __pagesEnabled["video"] = true;
    __pagesEnabled["css"] = true;
  });

  _model.addToReset(function() {
    t = 1; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
  });

  _model.addToReset(function() {
    videoWidth = 1920; // EjsS Model.Variables.layout.videoWidth
    videoHeight = 1080; // EjsS Model.Variables.layout.videoHeight
    factor = 0.95; // EjsS Model.Variables.layout.factor
    Width = Math.min(window.innerWidth,window.innerHeight*videoWidth/videoHeight*factor); // EjsS Model.Variables.layout.Width
    Height = Width*videoHeight/videoWidth; // EjsS Model.Variables.layout.Height
  });

  _model.addToReset(function() {
    topcss = "0vh"; // EjsS Model.Variables.video.topcss
    css = {"top": topcss}; // EjsS Model.Variables.video.css
    css2 = { "position" : "absolute",  "left" : "23vw", "top": topcss}; // EjsS Model.Variables.video.css2
    control = false; // EjsS Model.Variables.video.control
    video = document.getElementById("video"); // EjsS Model.Variables.video.video
    firsttime = true; // EjsS Model.Variables.video.firsttime
  });

  _model.addToReset(function() {
    offSet = "1vh"; // EjsS Model.Variables.panel.offSet
    cssPanel = {"position":"absolute","top":offSet}; // EjsS Model.Variables.panel.cssPanel
    cssPanelAndy = {  "display": "flex",         "justify-content": "center",     "align-items": "center"}; // EjsS Model.Variables.panel.cssPanelAndy
  });

  _model.addToReset(function() {
    gold = "rgba(255,215,0,0.2)"; // EjsS Model.Variables.interactive parts.gold
    clearcolor = "rgba(0,0,0,0.0)"; // EjsS Model.Variables.interactive parts.clearcolor
    optioncolor = clearcolor; // EjsS Model.Variables.interactive parts.optioncolor
    optioncolor2 = clearcolor; // EjsS Model.Variables.interactive parts.optioncolor2
    choosecopper = false; // EjsS Model.Variables.interactive parts.choosecopper
    chooseplastic = false; // EjsS Model.Variables.interactive parts.chooseplastic
    playedSize = false; // EjsS Model.Variables.interactive parts.playedSize
    playedSize2 = false; // EjsS Model.Variables.interactive parts.playedSize2
    playedTemperature = false; // EjsS Model.Variables.interactive parts.playedTemperature
    playedTemperature2 = false; // EjsS Model.Variables.interactive parts.playedTemperature2
    playedStirring = false; // EjsS Model.Variables.interactive parts.playedStirring
    playedStirring2 = false; // EjsS Model.Variables.interactive parts.playedStirring2
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(false);
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

  // example usage videoId == video41  // > CustomCode.videofunction:1
  //var videoId  // > CustomCode.videofunction:2
  function playSelectedVideo(videoId, isRecursed=false) {  // > CustomCode.videofunction:3
    // Pause all videos  // > CustomCode.videofunction:4
    const allVideos = document.querySelectorAll('video');  // > CustomCode.videofunction:5
    allVideos.forEach((video) => {  // > CustomCode.videofunction:6
      if (video.id !== videoId) {  // > CustomCode.videofunction:7
       // console.log (video.id)  // > CustomCode.videofunction:8
       // video41  // > CustomCode.videofunction:9
       video.pause();  // > CustomCode.videofunction:10
       // var temp = video.id  // > CustomCode.videofunction:11
       // _view[temp].pause();  // > CustomCode.videofunction:12
      }  // > CustomCode.videofunction:13
    });  // > CustomCode.videofunction:14
    // Play selected video  // > CustomCode.videofunction:15
    const selectedVideo = document.getElementById(videoId);  // > CustomCode.videofunction:16
    console.log(selectedVideo);  // > CustomCode.videofunction:17
    selectedVideo.play().catch(function(err) {  // > CustomCode.videofunction:18
      // Probably iOS  // > CustomCode.videofunction:19
      if (!isRecursed) {  // > CustomCode.videofunction:20
        EJSS_INTERFACE.BoxPanel.showOkDialog("Click 'OK' to continue",   // > CustomCode.videofunction:21
        function(){   // > CustomCode.videofunction:22
          playSelectedVideo(videoId,true);  // > CustomCode.videofunction:23
        });  // > CustomCode.videofunction:24
      }  // > CustomCode.videofunction:25
    });  // > CustomCode.videofunction:26
    // _view[videoId].play();  // > CustomCode.videofunction:27
  }  // > CustomCode.videofunction:28

  function setPlaysInlineForAllVideos() {  // > CustomCode.setPlaysInlineForAllVideos:1
    const allVideos = document.querySelectorAll("video");  // > CustomCode.setPlaysInlineForAllVideos:2
    allVideos.forEach((video) => {  // > CustomCode.setPlaysInlineForAllVideos:3
      video.setAttribute("playsinline", true);  // > CustomCode.setPlaysInlineForAllVideos:4
    });  // > CustomCode.setPlaysInlineForAllVideos:5
  }  // > CustomCode.setPlaysInlineForAllVideos:6

  _model.addToInitialization(function() {
    if (!__pagesEnabled["video"]) return;
    //frame=frameStart;  // > Initialization.video:1
    //_view.video.setCurrentTime(0);  // > Initialization.video:2
    //alert("Click ok to start the video")  // > Initialization.video:3
    //alert("click the Play button of the video player on the bottom left to move on.")  // > Initialization.video:4
    //_view.video.play()  // > Initialization.video:5
    // show something  // > Initialization.video:6
    if (firsttime==true){ // to skip on retry to   // > Initialization.video:7
      EJSS_INTERFACE.BoxPanel.showOkDialog("Click 'OK' to start.",   // > Initialization.video:8
        function(){   // > Initialization.video:9
          //_view.video1.play(); // to force video play  // > Initialization.video:10
          playSelectedVideo("videocredits")  // > Initialization.video:11
          _view.audio.play()  // > Initialization.video:12
        });  // > Initialization.video:13
        // > Initialization.video:14
      }  // > Initialization.video:15
    //debug  // > Initialization.video:16
    // Play selected video  // > Initialization.video:17
     // const selectedVideo = document.getElementById("video1");  // > Initialization.video:18
     // console.log(selectedVideo)  // > Initialization.video:19
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["css"]) return;
    //document.getElementById("image3_5_Board_Option").style.cursor = "grab";  // > Initialization.css:1
    setPlaysInlineForAllVideos()  // > Initialization.css:2
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

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
    _view = new rate_of_dissolving_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.audio.setAction("OnEnded", function(_data,_info) {
  _view.audio.play();

}); // HtmlView Page setting action 'OnEnded' for element 'audio'
          _view.videocredits.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'videocredits'
          _view.videocredits.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'videocredits'
          _view.videocredits.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'videocredits'
          _view.videocredits.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'videocredits'
          _view.videocredits.linkProperty("Visibility",  function() { return t==0; } ); // HtmlView Page linking property 'Visibility' for element 'videocredits'
          _view.videocredits.setAction("OnEnded", function(_data,_info) {
  t=1;

}); // HtmlView Page setting action 'OnEnded' for element 'videocredits'
          _view.videocredits.linkProperty("Display",  function() { return t==0?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'videocredits'
          _view.video11.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video11'
          _view.video11.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video11'
          _view.video11.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video11'
          _view.video11.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video11'
          _view.video11.linkProperty("Visibility",  function() { return Math.floor(t)==11; } ); // HtmlView Page linking property 'Visibility' for element 'video11'
          _view.video11.setAction("OnEnded", function(_data,_info) {
  /*
  playedSize = true
  if (playedSize&&playedSize2){
    t = 13
    playSelectedVideo("video13")
  } else{
    t = 11.1
  }
  */
  t=12
  playSelectedVideo("video12");

}); // HtmlView Page setting action 'OnEnded' for element 'video11'
          _view.video11.linkProperty("Display",  function() { return Math.floor(t)==11?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video11'
          _view.video12.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video12'
          _view.video12.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video12'
          _view.video12.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video12'
          _view.video12.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video12'
          _view.video12.linkProperty("Visibility",  function() { return Math.floor(t)==12; } ); // HtmlView Page linking property 'Visibility' for element 'video12'
          _view.video12.setAction("OnEnded", function(_data,_info) {
  /*
  playedSize2 = true
  if (playedSize&&playedSize2){
    t = 13
    playSelectedVideo("video13")
  } else{
    t = 12.1
  }
  */
  t=13
  playSelectedVideo("video13");

}); // HtmlView Page setting action 'OnEnded' for element 'video12'
          _view.video12.linkProperty("Display",  function() { return Math.floor(t)==12?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video12'
          _view.video13.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video13'
          _view.video13.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video13'
          _view.video13.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video13'
          _view.video13.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video13'
          _view.video13.linkProperty("Visibility",  function() { return Math.floor(t)==13; } ); // HtmlView Page linking property 'Visibility' for element 'video13'
          _view.video13.setAction("OnEnded", function(_data,_info) {
  t=13.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video13'
          _view.video13.linkProperty("Display",  function() { return Math.floor(t)==13?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video13'
          _view.video21.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video21'
          _view.video21.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video21'
          _view.video21.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video21'
          _view.video21.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video21'
          _view.video21.linkProperty("Visibility",  function() { return Math.floor(t)==21; } ); // HtmlView Page linking property 'Visibility' for element 'video21'
          _view.video21.setAction("OnEnded", function(_data,_info) {
  /*
  playedTemperature = true
  if (playedTemperature&&playedTemperature2){
    t = 23
    playSelectedVideo("video23")
  } else{
    t = 21.1
  }
  */
  t=22
  playSelectedVideo("video22");

}); // HtmlView Page setting action 'OnEnded' for element 'video21'
          _view.video21.linkProperty("Display",  function() { return Math.floor(t)==21?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video21'
          _view.video22.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video22'
          _view.video22.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video22'
          _view.video22.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video22'
          _view.video22.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video22'
          _view.video22.linkProperty("Visibility",  function() { return Math.floor(t)==22; } ); // HtmlView Page linking property 'Visibility' for element 'video22'
          _view.video22.setAction("OnEnded", function(_data,_info) {
  /*
  playedTemperature2 = true
  if (playedTemperature&&playedTemperature2){
    t = 23
    playSelectedVideo("video23")
  } else{
    t = 22.1
  }
  */
  t=23
  playSelectedVideo("video23");

}); // HtmlView Page setting action 'OnEnded' for element 'video22'
          _view.video22.linkProperty("Display",  function() { return Math.floor(t)==22?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video22'
          _view.video23.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video23'
          _view.video23.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video23'
          _view.video23.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video23'
          _view.video23.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video23'
          _view.video23.linkProperty("Visibility",  function() { return Math.floor(t)==23; } ); // HtmlView Page linking property 'Visibility' for element 'video23'
          _view.video23.setAction("OnEnded", function(_data,_info) {
  t=23.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video23'
          _view.video23.linkProperty("Display",  function() { return Math.floor(t)==23?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video23'
          _view.video31.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video31'
          _view.video31.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video31'
          _view.video31.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video31'
          _view.video31.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video31'
          _view.video31.linkProperty("Visibility",  function() { return Math.floor(t)==31; } ); // HtmlView Page linking property 'Visibility' for element 'video31'
          _view.video31.setAction("OnEnded", function(_data,_info) {
  /*
  playedStirring = true
  if (playedStirring&&playedStirring2){
    t = 33
    playSelectedVideo("video33")
  } else{
    t = 31.1
  }
  */
  t=32
  playSelectedVideo("video32");

}); // HtmlView Page setting action 'OnEnded' for element 'video31'
          _view.video31.linkProperty("Display",  function() { return Math.floor(t)==31?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video31'
          _view.video32.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video32'
          _view.video32.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video32'
          _view.video32.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video32'
          _view.video32.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video32'
          _view.video32.linkProperty("Visibility",  function() { return Math.floor(t)==32; } ); // HtmlView Page linking property 'Visibility' for element 'video32'
          _view.video32.setAction("OnEnded", function(_data,_info) {
  /*
  playedStirring2 = true
  if (playedStirring&&playedStirring2){
    t = 33
    playSelectedVideo("video33")
  } else{
    t = 32.1
  }
  */
  t=33
  playSelectedVideo("video33");

}); // HtmlView Page setting action 'OnEnded' for element 'video32'
          _view.video32.linkProperty("Display",  function() { return Math.floor(t)==32?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video32'
          _view.video33.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video33'
          _view.video33.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video33'
          _view.video33.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video33'
          _view.video33.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video33'
          _view.video33.linkProperty("Visibility",  function() { return Math.floor(t)==33; } ); // HtmlView Page linking property 'Visibility' for element 'video33'
          _view.video33.setAction("OnEnded", function(_data,_info) {
  t=33.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video33'
          _view.video33.linkProperty("Display",  function() { return Math.floor(t)==33?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video33'
          _view.panel2.linkProperty("CSS",  function() { return cssPanelAndy; }, function(_v) { cssPanelAndy = _v; } ); // HtmlView Page linking property 'CSS' for element 'panel2'
          _view.plottingPanel2.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel2'
          _view.plottingPanel2.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel2'
          _view.plottingPanel2.setAction("OnResize", function(_data,_info) {
  Width="75vw"
  Height=75*(1080/1920)+"vw"
  _view._update();

}); // HtmlView Page setting action 'OnResize' for element 'plottingPanel2'
          _view.plottingPanel2.setAction("OnOrientationChange", function(_data,_info) {
  Width="75vw"
  Height=75*(1080/1920)+"vw"
  _view._update();

}); // HtmlView Page setting action 'OnOrientationChange' for element 'plottingPanel2'
          _view.plottingPanel2.linkProperty("CSS",  function() { return cssPanel; }, function(_v) { cssPanel = _v; } ); // HtmlView Page linking property 'CSS' for element 'plottingPanel2'
          _view.landing_page.linkProperty("Visibility",  function() { return t==1; } ); // HtmlView Page linking property 'Visibility' for element 'landing_page'
          _view.backbutton.linkProperty("Visibility",  function() { return t==11.1||t==12.1||t==13.1; } ); // HtmlView Page linking property 'Visibility' for element 'backbutton'
          _view.backbutton.setAction("OnPress", function(_data,_info) {
  //t=2
  t=1;

}); // HtmlView Page setting action 'OnPress' for element 'backbutton'
          _view.backbutton2.linkProperty("Visibility",  function() { return t==21.1||t==22.1||t==23.1; } ); // HtmlView Page linking property 'Visibility' for element 'backbutton2'
          _view.backbutton2.setAction("OnPress", function(_data,_info) {
  //t=3
  t=1;

}); // HtmlView Page setting action 'OnPress' for element 'backbutton2'
          _view.backbutton3.linkProperty("Visibility",  function() { return t==31.1||t==32.1||t==33.1; } ); // HtmlView Page linking property 'Visibility' for element 'backbutton3'
          _view.backbutton3.setAction("OnPress", function(_data,_info) {
  //t=4
  t=1;

}); // HtmlView Page setting action 'OnPress' for element 'backbutton3'
          _view.option.linkProperty("Visibility",  function() { return t==1; } ); // HtmlView Page linking property 'Visibility' for element 'option'
          _view.option.setAction("OnPress", function(_data,_info) {
  t=11
  playSelectedVideo("video11");

}); // HtmlView Page setting action 'OnPress' for element 'option'
          _view.option2.linkProperty("Visibility",  function() { return t==1; } ); // HtmlView Page linking property 'Visibility' for element 'option2'
          _view.option2.setAction("OnPress", function(_data,_info) {
  t=21
  playSelectedVideo("video21");

}); // HtmlView Page setting action 'OnPress' for element 'option2'
          _view.option3.linkProperty("Visibility",  function() { return t==1; } ); // HtmlView Page linking property 'Visibility' for element 'option3'
          _view.option3.setAction("OnPress", function(_data,_info) {
  t=31
  playSelectedVideo("video31");

}); // HtmlView Page setting action 'OnPress' for element 'option3'
          _view.back.linkProperty("Visibility",  function() { return t==2||t==3||t==4; } ); // HtmlView Page linking property 'Visibility' for element 'back'
          _view.back.setAction("OnPress", function(_data,_info) {
  t=1;

}); // HtmlView Page setting action 'OnPress' for element 'back'
          _view.option11.linkProperty("Visibility",  function() { return t==2; } ); // HtmlView Page linking property 'Visibility' for element 'option11'
          _view.option11.setAction("OnPress", function(_data,_info) {
  t=11
  playSelectedVideo("video11");

}); // HtmlView Page setting action 'OnPress' for element 'option11'
          _view.option12.linkProperty("Visibility",  function() { return t==2; } ); // HtmlView Page linking property 'Visibility' for element 'option12'
          _view.option12.setAction("OnPress", function(_data,_info) {
  t=12
  playSelectedVideo("video12");

}); // HtmlView Page setting action 'OnPress' for element 'option12'
          _view.option21.linkProperty("Visibility",  function() { return t==3; } ); // HtmlView Page linking property 'Visibility' for element 'option21'
          _view.option21.setAction("OnPress", function(_data,_info) {
  t=21
  playSelectedVideo("video21");

}); // HtmlView Page setting action 'OnPress' for element 'option21'
          _view.option22.linkProperty("Visibility",  function() { return t==3; } ); // HtmlView Page linking property 'Visibility' for element 'option22'
          _view.option22.setAction("OnPress", function(_data,_info) {
  t=22
  playSelectedVideo("video22");

}); // HtmlView Page setting action 'OnPress' for element 'option22'
          _view.option31.linkProperty("Visibility",  function() { return t==4; } ); // HtmlView Page linking property 'Visibility' for element 'option31'
          _view.option31.setAction("OnPress", function(_data,_info) {
  t=31
  playSelectedVideo("video31");

}); // HtmlView Page setting action 'OnPress' for element 'option31'
          _view.option32.linkProperty("Visibility",  function() { return t==4; } ); // HtmlView Page linking property 'Visibility' for element 'option32'
          _view.option32.setAction("OnPress", function(_data,_info) {
  t=32
  playSelectedVideo("video32");

}); // HtmlView Page setting action 'OnPress' for element 'option32'
          _view.size_page.linkProperty("Visibility",  function() { return t==2; } ); // HtmlView Page linking property 'Visibility' for element 'size_page'
          _view.temperature_page.linkProperty("Visibility",  function() { return t==3; } ); // HtmlView Page linking property 'Visibility' for element 'temperature_page'
          _view.stirring_page.linkProperty("Visibility",  function() { return t==4; } ); // HtmlView Page linking property 'Visibility' for element 'stirring_page'
          _view.checkBox.setAction("OnCheckOff", function(_data,_info) {
  _view.audio.pause();

}); // HtmlView Page setting action 'OnCheckOff' for element 'checkBox'
          _view.checkBox.setAction("OnCheckOn", function(_data,_info) {
  _view.audio.play();

}); // HtmlView Page setting action 'OnCheckOn' for element 'checkBox'
          _view.time.linkProperty("Value",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'Value' for element 'time'
          _view.time.setAction("OnChange", function(_data,_info) {
  var middle2 = "video"+(t-1).toFixed(0)
  "_view."+middle2+".pause()"
  var middle = "video"+t.toFixed(0)
  "_view."+middle+".play()";

}); // HtmlView Page setting action 'OnChange' for element 'time'
          _view.button.setAction("OnPress", function(_data,_info) {
  window.onload = function() {
    const elem = document.getElementById('.myPanel');
    elem.setAttribute('stroke-width','0');
  };

}); // HtmlView Page setting action 'OnPress' for element 'button'
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
          _view.stepButton22.setAction("OnClick", function(_data,_info) {
  dt = -1;
  _step();

}); // HtmlView Page setting action 'OnClick' for element 'stepButton22'
          _view.stepButton22.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'stepButton22'
          _view.stepButton2.setAction("OnClick", function(_data,_info) {
  _step();

}); // HtmlView Page setting action 'OnClick' for element 'stepButton2'
          _view.stepButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'stepButton2'
          _view.resetButton3.setAction("OnClick", function(_data,_info) {
  _reset();
  //speechzh ("你好");

}); // HtmlView Page setting action 'OnClick' for element 'resetButton3'
          _view.resetButton3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton3'
          _view.label.linkProperty("Text",  function() { return "t="+t.toFixed(1); } ); // HtmlView Page linking property 'Text' for element 'label'
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
function rate_of_dissolving_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = rate_of_dissolving_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Desc Page','./rate_of_dissolving_Intro_1.html');

  return _view;
} // end of main function

function rate_of_dissolving_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"videos", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'videos'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'videos'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'audio'
      .setProperty("Volume",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Volume' for element 'audio'
      .setProperty("AudioUrl","./Final/Credits/ukulele.mp3 (soundtrack).mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.video,"videocredits", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'videocredits'
      .setProperty("VideoUrl","./Final/Credits/Credits and opening (updated 2).mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'videocredits'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video11", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video11'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Size of solute particles/Smaller solute particles.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video11'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video12", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video12'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Size of solute particles/Larger solute particles.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video12'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video13", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video13'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Size of solute particles/Concluding_Size of particles.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video13'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video21", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video21'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Temperature of solvent/Lower temperature.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video21'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video22", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video22'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Temperature of solvent/Higher temperature.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video22'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video23", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video23'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Temperature of solvent/Concluding_Temperature.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video23'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video31", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video31'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Rate of stirring/Lower rate of stirring.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video31'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video32", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video32'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Rate of stirring/Higher rate of stirring.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video32'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video33", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video33'
      .setProperty("VideoUrl","./Final/Animations (updated_2)/Rate of stirring/Concluding_Stirring.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video33'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel2'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel2", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel2'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel2'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel2'
      .setProperty("AxisYLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'AxisYLineColor' for element 'plottingPanel2'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel2'
      .setProperty("XFixedTick",-20) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel2'
      .setProperty("GuttersLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GuttersLineColor' for element 'plottingPanel2'
      .setProperty("AxisXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisXShow' for element 'plottingPanel2'
      .setProperty("GuttersLineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'GuttersLineWidth' for element 'plottingPanel2'
      .setProperty("YFixedTick",-20) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel2'
      .setProperty("XTickStep",40) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel2'
      .setProperty("YTickStep",40) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel2'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel2'
      .setProperty("GridXLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GridXLineColor' for element 'plottingPanel2'
      .setProperty("GridXLineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'GridXLineWidth' for element 'plottingPanel2'
      .setProperty("GridXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridXShow' for element 'plottingPanel2'
      .setProperty("Background","rgba(0,0,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel2'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel2'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel2'
      .setProperty("MaximumY",10) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel2'
      .setProperty("EnabledDragging","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel2'
      .setProperty("MaximumX",8) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel2'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel2'
      .setProperty("GridYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridYShow' for element 'plottingPanel2'
      .setProperty("MinimumX",-8) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel2'
      .setProperty("GridYLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GridYLineColor' for element 'plottingPanel2'
      .setProperty("AxisXLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'AxisXLineColor' for element 'plottingPanel2'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel2'
      .setProperty("AxisYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisYShow' for element 'plottingPanel2'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel2'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel2'
      .setProperty("CursorTypeForMove","grab") // EJsS HtmlView.HtmlView Page: setting property 'CursorTypeForMove' for element 'plottingPanel2'
      .setProperty("GuttersColor","rgba(0,0,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GuttersColor' for element 'plottingPanel2'
      .setProperty("GridYLineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'GridYLineWidth' for element 'plottingPanel2'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'plottingPanel2'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"landing_page", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'landing_page'
      .setProperty("SizeX",17.76) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'landing_page'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'landing_page'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'landing_page'
      .setProperty("Y",5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'landing_page'
      .setProperty("ImageUrl","./Final/Landing page/Rate of dissolving.jpg") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'landing_page'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'landing_page'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"backbutton", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'backbutton'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'backbutton'
      .setProperty("SizeX",2.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'backbutton'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'backbutton'
      .setProperty("X",-7.23) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'backbutton'
      .setProperty("ImageUrl","./Final/Buttons/Back.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'backbutton'
      .setProperty("Y",2.45) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'backbutton'
      .setProperty("SizeY",2.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'backbutton'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'backbutton'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"backbutton2", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'backbutton2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'backbutton2'
      .setProperty("SizeX",2.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'backbutton2'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'backbutton2'
      .setProperty("X",-7.23) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'backbutton2'
      .setProperty("ImageUrl","./Final/Buttons/Back.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'backbutton2'
      .setProperty("Y",2.45) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'backbutton2'
      .setProperty("SizeY",2.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'backbutton2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'backbutton2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"backbutton3", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'backbutton3'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'backbutton3'
      .setProperty("SizeX",2.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'backbutton3'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'backbutton3'
      .setProperty("X",-7.23) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'backbutton3'
      .setProperty("ImageUrl","./Final/Buttons/Back.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'backbutton3'
      .setProperty("Y",2.45) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'backbutton3'
      .setProperty("SizeY",2.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'backbutton3'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'backbutton3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'option'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option'
      .setProperty("Y",7.3) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option2", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'option2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option2'
      .setProperty("SizeX",3.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option2'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option2'
      .setProperty("Y",4.85) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option2'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option2'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option3", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'option3'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option3'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option3'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option3'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option3'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option3'
      .setProperty("Y",2.46) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option3'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option3'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option3'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option3'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option3'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'hide'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"back", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'back'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'back'
      .setProperty("SizeX",2.1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'back'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'back'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'back'
      .setProperty("X",-7.23) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'back'
      .setProperty("Y",1.37) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'back'
      .setProperty("SizeY",0.8) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'back'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'back'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'back'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'back'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option11", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'option11'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option11'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option11'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option11'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option11'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option11'
      .setProperty("Y",6.53) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option11'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option11'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option11'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option11'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option11'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option12", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'option12'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option12'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option12'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option12'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option12'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option12'
      .setProperty("Y",3.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option12'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option12'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option12'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option12'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option12'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option21", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'option21'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option21'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option21'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option21'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option21'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option21'
      .setProperty("Y",6.53) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option21'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option21'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option21'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option21'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option21'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option22", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'option22'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option22'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option22'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option22'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option22'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option22'
      .setProperty("Y",3.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option22'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option22'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option22'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option22'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option22'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option31", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'option31'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option31'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option31'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option31'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option31'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option31'
      .setProperty("Y",6.53) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option31'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option31'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option31'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option31'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option31'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"option32", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'option32'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'option32'
      .setProperty("SizeX",4.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'option32'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'option32'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'option32'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'option32'
      .setProperty("Y",3.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'option32'
      .setProperty("SizeY",1.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'option32'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'option32'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'option32'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'option32'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"size_page", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'size_page'
      .setProperty("SizeX",17.76) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'size_page'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'size_page'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'size_page'
      .setProperty("Y",5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'size_page'
      .setProperty("ImageUrl","./Final/Landing page/Size of Solute Particles.jpg") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'size_page'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'size_page'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"temperature_page", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'temperature_page'
      .setProperty("SizeX",17.76) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'temperature_page'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'temperature_page'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'temperature_page'
      .setProperty("Y",5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'temperature_page'
      .setProperty("ImageUrl","./Final/Landing page/Temperature of Solvent.jpg") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'temperature_page'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'temperature_page'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"stirring_page", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'stirring_page'
      .setProperty("SizeX",17.76) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'stirring_page'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'stirring_page'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'stirring_page'
      .setProperty("Y",5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'stirring_page'
      .setProperty("ImageUrl","./Final/Landing page/Rate of Stirring.jpg") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'stirring_page'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'stirring_page'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("CSS",{ "position" : "absolute",  "left" : "0px", "top": "5vh"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'checkBox'
      .setProperty("Checked",true) // EJsS HtmlView.HtmlView Page: setting property 'Checked' for element 'checkBox'
      .setProperty("Text","Sound") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"time", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'time'
      .setProperty("CSS",{"cursor": "grab"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'time'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'time'
      ;

    _view._addElement(EJSS_INTERFACE.button,"button", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'button'
      .setProperty("Text","video1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'button'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton22", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton22'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'stepButton22'
      .setProperty("Text","?|") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton22'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'stepButton2'
      .setProperty("Text","|►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton3'
      .setProperty("Text","↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'label'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new rate_of_dissolving("_topFrame","_ejs_library/",null);
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
