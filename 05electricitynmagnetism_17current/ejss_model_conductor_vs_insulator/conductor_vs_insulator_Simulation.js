/* _inputParameters: an object with different values for the model parameters */
function conductor_vs_insulator(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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
  var control; // EjsS Model.Variables.video.control
  var video; // EjsS Model.Variables.video.video
  var firsttime; // EjsS Model.Variables.video.firsttime

  var offSet; // EjsS Model.Variables.board.offSet
  var cssPanel; // EjsS Model.Variables.board.cssPanel
  var cssPanelAndy; // EjsS Model.Variables.board.cssPanelAndy

  var gold; // EjsS Model.Variables.interactive parts.gold
  var clearcolor; // EjsS Model.Variables.interactive parts.clearcolor
  var optioncolor; // EjsS Model.Variables.interactive parts.optioncolor
  var optioncolor2; // EjsS Model.Variables.interactive parts.optioncolor2
  var choosecopper; // EjsS Model.Variables.interactive parts.choosecopper
  var chooseplastic; // EjsS Model.Variables.interactive parts.chooseplastic

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
      chooseplastic : chooseplastic
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
      chooseplastic : chooseplastic
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
    __pagesEnabled["end"] = true;
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
    topcss = "0 vh"; // EjsS Model.Variables.video.topcss
    css = {"top": topcss}; // EjsS Model.Variables.video.css
    control = false; // EjsS Model.Variables.video.control
    video = document.getElementById("video"); // EjsS Model.Variables.video.video
    firsttime = true; // EjsS Model.Variables.video.firsttime
  });

  _model.addToReset(function() {
    offSet = "1vh"; // EjsS Model.Variables.board.offSet
    cssPanel = {"position":"absolute","top":offSet}; // EjsS Model.Variables.board.cssPanel
    cssPanelAndy = {  "display": "flex",         "justify-content": "center",     "align-items": "center"}; // EjsS Model.Variables.board.cssPanelAndy
  });

  _model.addToReset(function() {
    gold = "rgba(255,215,0,0.2)"; // EjsS Model.Variables.interactive parts.gold
    clearcolor = "rgba(0,0,0,0.0)"; // EjsS Model.Variables.interactive parts.clearcolor
    optioncolor = clearcolor; // EjsS Model.Variables.interactive parts.optioncolor
    optioncolor2 = clearcolor; // EjsS Model.Variables.interactive parts.optioncolor2
    choosecopper = false; // EjsS Model.Variables.interactive parts.choosecopper
    chooseplastic = false; // EjsS Model.Variables.interactive parts.chooseplastic
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
          //playSelectedVideo("video1")  // > Initialization.video:11
          playSelectedVideo("videocredits")  // > Initialization.video:12
          _view.audio.play()  // > Initialization.video:13
        });  // > Initialization.video:14
        // > Initialization.video:15
      }  // > Initialization.video:16
       // > Initialization.video:17
    //debug  // > Initialization.video:18
    // Play selected video  // > Initialization.video:19
     // const selectedVideo = document.getElementById("video1");  // > Initialization.video:20
     // console.log(selectedVideo)  // > Initialization.video:21
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["css"]) return;
    //document.getElementById("image3_5_Board_Option").style.cursor = "grab";  // > Initialization.css:1
    setPlaysInlineForAllVideos()  // > Initialization.css:2
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["end"]) return;
    if (t==-1){  // > FixedRelations.end:1
      _view.audio.pause()  // > FixedRelations.end:2
    }  // > FixedRelations.end:3
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
    _view = new conductor_vs_insulator_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.fullscreen.setAction("OnMove", function(_data,_info) {
  if (t==1){
   // promisevideo (video)
    _view.video1.play(); // to force video play
    }

}); // HtmlView Page setting action 'OnMove' for element 'fullscreen'
          _view.fullscreen.setAction("OnPress", function(_data,_info) {
  if (t==1){
    //promisevideo (video)
    _view.video1.play(); // to force video play
    }

}); // HtmlView Page setting action 'OnPress' for element 'fullscreen'
          _view.fullscreen.setAction("OnClick", function(_data,_info) {
  if (t==1){
    //promisevideo (video)
    _view.video1.play(); // to force video play
    }

}); // HtmlView Page setting action 'OnClick' for element 'fullscreen'
          _view.audio.setAction("OnEnded", function(_data,_info) {
  _view.audio.play();

}); // HtmlView Page setting action 'OnEnded' for element 'audio'
          _view.videocredits.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'videocredits'
          _view.videocredits.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'videocredits'
          _view.videocredits.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'videocredits'
          _view.videocredits.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'videocredits'
          _view.videocredits.linkProperty("Visibility",  function() { return t==0; } ); // HtmlView Page linking property 'Visibility' for element 'videocredits'
          _view.videocredits.setAction("OnEnded", function(_data,_info) {
  t=1
  playSelectedVideo("video1");

}); // HtmlView Page setting action 'OnEnded' for element 'videocredits'
          _view.videocredits.linkProperty("Display",  function() { return t==0?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'videocredits'
          _view.video1.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video1'
          _view.video1.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video1'
          _view.video1.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video1'
          _view.video1.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video1'
          _view.video1.linkProperty("Visibility",  function() { return Math.floor(t)==1; } ); // HtmlView Page linking property 'Visibility' for element 'video1'
          _view.video1.setAction("OnEnded", function(_data,_info) {
  t=2
  playSelectedVideo("video2");

}); // HtmlView Page setting action 'OnEnded' for element 'video1'
          _view.video1.linkProperty("Display",  function() { return Math.floor(t)==1?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video1'
          _view.video2.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video2'
          _view.video2.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video2'
          _view.video2.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video2'
          _view.video2.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video2'
          _view.video2.linkProperty("Visibility",  function() { return Math.floor(t)==2; } ); // HtmlView Page linking property 'Visibility' for element 'video2'
          _view.video2.setAction("OnEnded", function(_data,_info) {
  t=3
  playSelectedVideo("video3");

}); // HtmlView Page setting action 'OnEnded' for element 'video2'
          _view.video2.linkProperty("Display",  function() { return Math.floor(t)==2?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video2'
          _view.video3.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video3'
          _view.video3.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video3'
          _view.video3.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video3'
          _view.video3.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video3'
          _view.video3.linkProperty("Visibility",  function() { return Math.floor(t)==3; } ); // HtmlView Page linking property 'Visibility' for element 'video3'
          _view.video3.setAction("OnEnded", function(_data,_info) {
  t=3.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video3'
          _view.video3.linkProperty("Display",  function() { return Math.floor(t)==3?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video3'
          _view.video4.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video4'
          _view.video4.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video4'
          _view.video4.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video4'
          _view.video4.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video4'
          _view.video4.linkProperty("Visibility",  function() { return Math.floor(t)==4; } ); // HtmlView Page linking property 'Visibility' for element 'video4'
          _view.video4.setAction("OnEnded", function(_data,_info) {
  t=5
  playSelectedVideo("video5");

}); // HtmlView Page setting action 'OnEnded' for element 'video4'
          _view.video4.linkProperty("Display",  function() { return Math.floor(t)==4?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video4'
          _view.video5.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video5'
          _view.video5.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video5'
          _view.video5.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video5'
          _view.video5.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video5'
          _view.video5.linkProperty("Visibility",  function() { return Math.floor(t)==5; } ); // HtmlView Page linking property 'Visibility' for element 'video5'
          _view.video5.setAction("OnEnded", function(_data,_info) {
  t=6
  playSelectedVideo("video6");

}); // HtmlView Page setting action 'OnEnded' for element 'video5'
          _view.video5.linkProperty("Display",  function() { return Math.floor(t)==5?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video5'
          _view.video6.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video6'
          _view.video6.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video6'
          _view.video6.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video6'
          _view.video6.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video6'
          _view.video6.linkProperty("Visibility",  function() { return Math.floor(t)==6; } ); // HtmlView Page linking property 'Visibility' for element 'video6'
          _view.video6.setAction("OnEnded", function(_data,_info) {
  t=6.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video6'
          _view.video6.linkProperty("Display",  function() { return Math.floor(t)==6?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video6'
          _view.video7.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video7'
          _view.video7.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video7'
          _view.video7.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video7'
          _view.video7.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video7'
          _view.video7.linkProperty("Visibility",  function() { return Math.floor(t)==7; } ); // HtmlView Page linking property 'Visibility' for element 'video7'
          _view.video7.setAction("OnEnded", function(_data,_info) {
  t=7.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video7'
          _view.video7.linkProperty("Display",  function() { return Math.floor(t)==7?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video7'
          _view.video8.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video8'
          _view.video8.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video8'
          _view.video8.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video8'
          _view.video8.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video8'
          _view.video8.linkProperty("Visibility",  function() { return Math.floor(t)==8; } ); // HtmlView Page linking property 'Visibility' for element 'video8'
          _view.video8.setAction("OnEnded", function(_data,_info) {
  t=8.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video8'
          _view.video8.linkProperty("Display",  function() { return Math.floor(t)==8?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video8'
          _view.video9.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video9'
          _view.video9.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video9'
          _view.video9.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video9'
          _view.video9.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video9'
          _view.video9.linkProperty("Visibility",  function() { return Math.floor(t)==9; } ); // HtmlView Page linking property 'Visibility' for element 'video9'
          _view.video9.setAction("OnEnded", function(_data,_info) {
  t=11
  playSelectedVideo("video11");

}); // HtmlView Page setting action 'OnEnded' for element 'video9'
          _view.video9.linkProperty("Display",  function() { return Math.floor(t)==9?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video9'
          _view.video10.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video10'
          _view.video10.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video10'
          _view.video10.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video10'
          _view.video10.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video10'
          _view.video10.linkProperty("Visibility",  function() { return Math.floor(t)==10; } ); // HtmlView Page linking property 'Visibility' for element 'video10'
          _view.video10.setAction("OnEnded", function(_data,_info) {
  t=11
  playSelectedVideo("video11");

}); // HtmlView Page setting action 'OnEnded' for element 'video10'
          _view.video10.linkProperty("Display",  function() { return Math.floor(t)==10?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video10'
          _view.video11.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video11'
          _view.video11.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video11'
          _view.video11.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video11'
          _view.video11.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video11'
          _view.video11.linkProperty("Visibility",  function() { return Math.floor(t)==11; } ); // HtmlView Page linking property 'Visibility' for element 'video11'
          _view.video11.setAction("OnEnded", function(_data,_info) {
  if (chooseplastic){
    // end
    t=13
    playSelectedVideo("video13")
  } else {
    t=12
    playSelectedVideo("video12")
  }

}); // HtmlView Page setting action 'OnEnded' for element 'video11'
          _view.video11.linkProperty("Display",  function() { return Math.floor(t)==11?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video11'
          _view.video12.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video12'
          _view.video12.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video12'
          _view.video12.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video12'
          _view.video12.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video12'
          _view.video12.linkProperty("Visibility",  function() { return Math.floor(t)==12; } ); // HtmlView Page linking property 'Visibility' for element 'video12'
          _view.video12.setAction("OnEnded", function(_data,_info) {
  t=14
  playSelectedVideo("video14");

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
          _view.video14.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video14'
          _view.video14.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video14'
          _view.video14.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video14'
          _view.video14.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video14'
          _view.video14.linkProperty("Visibility",  function() { return Math.floor(t)==14; } ); // HtmlView Page linking property 'Visibility' for element 'video14'
          _view.video14.setAction("OnEnded", function(_data,_info) {
  t=14.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video14'
          _view.video14.linkProperty("Display",  function() { return Math.floor(t)==14?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video14'
          _view.video15.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video15'
          _view.video15.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video15'
          _view.video15.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video15'
          _view.video15.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video15'
          _view.video15.linkProperty("Visibility",  function() { return Math.floor(t)==15; } ); // HtmlView Page linking property 'Visibility' for element 'video15'
          _view.video15.setAction("OnEnded", function(_data,_info) {
  t=15.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video15'
          _view.video15.linkProperty("Display",  function() { return Math.floor(t)==15?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video15'
          _view.video16.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video16'
          _view.video16.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video16'
          _view.video16.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video16'
          _view.video16.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video16'
          _view.video16.linkProperty("Visibility",  function() { return Math.floor(t)==16; } ); // HtmlView Page linking property 'Visibility' for element 'video16'
          _view.video16.setAction("OnEnded", function(_data,_info) {
  t=16.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video16'
          _view.video16.linkProperty("Display",  function() { return Math.floor(t)==16?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video16'
          _view.video17.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video17'
          _view.video17.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video17'
          _view.video17.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video17'
          _view.video17.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video17'
          _view.video17.linkProperty("Visibility",  function() { return Math.floor(t)==17; } ); // HtmlView Page linking property 'Visibility' for element 'video17'
          _view.video17.setAction("OnEnded", function(_data,_info) {
  t=19
  playSelectedVideo("video19");

}); // HtmlView Page setting action 'OnEnded' for element 'video17'
          _view.video17.linkProperty("Display",  function() { return Math.floor(t)==17?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video17'
          _view.video18.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video18'
          _view.video18.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video18'
          _view.video18.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video18'
          _view.video18.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video18'
          _view.video18.linkProperty("Visibility",  function() { return Math.floor(t)==18; } ); // HtmlView Page linking property 'Visibility' for element 'video18'
          _view.video18.setAction("OnEnded", function(_data,_info) {
  t=19
  playSelectedVideo("video19");

}); // HtmlView Page setting action 'OnEnded' for element 'video18'
          _view.video18.linkProperty("Display",  function() { return Math.floor(t)==18?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video18'
          _view.video19.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video19'
          _view.video19.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video19'
          _view.video19.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video19'
          _view.video19.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video19'
          _view.video19.linkProperty("Visibility",  function() { return Math.floor(t)==19; } ); // HtmlView Page linking property 'Visibility' for element 'video19'
          _view.video19.setAction("OnEnded", function(_data,_info) {
  if (choosecopper){
    // end
    t=21
    playSelectedVideo("video21")
  } else {
    t=20
    playSelectedVideo("video20")
  }

}); // HtmlView Page setting action 'OnEnded' for element 'video19'
          _view.video19.linkProperty("Display",  function() { return Math.floor(t)==19?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video19'
          _view.video20.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video20'
          _view.video20.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video20'
          _view.video20.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video20'
          _view.video20.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video20'
          _view.video20.linkProperty("Visibility",  function() { return Math.floor(t)==20; } ); // HtmlView Page linking property 'Visibility' for element 'video20'
          _view.video20.setAction("OnEnded", function(_data,_info) {
  t=25
  playSelectedVideo("video25");

}); // HtmlView Page setting action 'OnEnded' for element 'video20'
          _view.video20.linkProperty("Display",  function() { return Math.floor(t)==20?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video20'
          _view.video21.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video21'
          _view.video21.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video21'
          _view.video21.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video21'
          _view.video21.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video21'
          _view.video21.linkProperty("Visibility",  function() { return Math.floor(t)==21; } ); // HtmlView Page linking property 'Visibility' for element 'video21'
          _view.video21.setAction("OnEnded", function(_data,_info) {
  t=21.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video21'
          _view.video21.linkProperty("Display",  function() { return Math.floor(t)==21?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video21'
          _view.video22.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video22'
          _view.video22.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video22'
          _view.video22.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video22'
          _view.video22.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video22'
          _view.video22.linkProperty("Visibility",  function() { return Math.floor(t)==22; } ); // HtmlView Page linking property 'Visibility' for element 'video22'
          _view.video22.setAction("OnEnded", function(_data,_info) {
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
  t=24
  playSelectedVideo("video24");

}); // HtmlView Page setting action 'OnEnded' for element 'video23'
          _view.video23.linkProperty("Display",  function() { return Math.floor(t)==23?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video23'
          _view.video24.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video24'
          _view.video24.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video24'
          _view.video24.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video24'
          _view.video24.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video24'
          _view.video24.linkProperty("Visibility",  function() { return Math.floor(t)==24; } ); // HtmlView Page linking property 'Visibility' for element 'video24'
          _view.video24.setAction("OnEnded", function(_data,_info) {
  t=24.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video24'
          _view.video24.linkProperty("Display",  function() { return Math.floor(t)==24?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video24'
          _view.video25.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video25'
          _view.video25.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video25'
          _view.video25.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video25'
          _view.video25.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video25'
          _view.video25.linkProperty("Visibility",  function() { return Math.floor(t)==25; } ); // HtmlView Page linking property 'Visibility' for element 'video25'
          _view.video25.setAction("OnEnded", function(_data,_info) {
  t=25.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video25'
          _view.video25.linkProperty("Display",  function() { return Math.floor(t)==25?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video25'
          _view.video26.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video26'
          _view.video26.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video26'
          _view.video26.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video26'
          _view.video26.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video26'
          _view.video26.linkProperty("Visibility",  function() { return Math.floor(t)==26; } ); // HtmlView Page linking property 'Visibility' for element 'video26'
          _view.video26.setAction("OnEnded", function(_data,_info) {
  t=26.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video26'
          _view.video26.linkProperty("Display",  function() { return Math.floor(t)==26?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video26'
          _view.video27.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video27'
          _view.video27.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video27'
          _view.video27.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video27'
          _view.video27.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video27'
          _view.video27.linkProperty("Visibility",  function() { return Math.floor(t)==27; } ); // HtmlView Page linking property 'Visibility' for element 'video27'
          _view.video27.setAction("OnEnded", function(_data,_info) {
  t=27.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video27'
          _view.video27.linkProperty("Display",  function() { return Math.floor(t)==27?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video27'
          _view.video28.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video28'
          _view.video28.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video28'
          _view.video28.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video28'
          _view.video28.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video28'
          _view.video28.linkProperty("Visibility",  function() { return Math.floor(t)==28; } ); // HtmlView Page linking property 'Visibility' for element 'video28'
          _view.video28.setAction("OnEnded", function(_data,_info) {
  t=28.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video28'
          _view.video28.linkProperty("Display",  function() { return Math.floor(t)==28?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video28'
          _view.video29.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video29'
          _view.video29.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video29'
          _view.video29.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video29'
          _view.video29.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video29'
          _view.video29.linkProperty("Visibility",  function() { return Math.floor(t)==29; } ); // HtmlView Page linking property 'Visibility' for element 'video29'
          _view.video29.setAction("OnEnded", function(_data,_info) {
  t=29.1;

}); // HtmlView Page setting action 'OnEnded' for element 'video29'
          _view.video29.linkProperty("Display",  function() { return Math.floor(t)==29?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video29'
          _view.panel2.linkProperty("CSS",  function() { return cssPanelAndy; }, function(_v) { cssPanelAndy = _v; } ); // HtmlView Page linking property 'CSS' for element 'panel2'
          _view.plottingPanel.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  //toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnResize", function(_data,_info) {
  Width="75vw"
  Height=75*(1080/1920)+"vw"
  _view._update();

}); // HtmlView Page setting action 'OnResize' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  //var position = _view.plottingPanel.getInteraction().getInteractionPoint();
  //console.log(position)
  // for mobile
  if (t==0){
    _view.videocredits.play(); // to force video play
  }

}); // HtmlView Page setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnOrientationChange", function(_data,_info) {
  Width="75vw"
  Height=75*(1080/1920)+"vw"
  _view._update();

}); // HtmlView Page setting action 'OnOrientationChange' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("CSS",  function() { return cssPanel; }, function(_v) { cssPanel = _v; } ); // HtmlView Page linking property 'CSS' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnMove", function(_data,_info) {
  if (t==0||firsttime){
   
   _view.videocredits.play(); // to force video play
   firsttime=false
  }

}); // HtmlView Page setting action 'OnMove' for element 'plottingPanel'
          _view.summary.linkProperty("Visibility",  function() { return t==30; } ); // HtmlView Page linking property 'Visibility' for element 'summary'
          _view.plastic_2_5.linkProperty("FillColor",  function() { return clearcolor; }, function(_v) { clearcolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'plastic_2_5'
          _view.plastic_2_5.linkProperty("Visibility",  function() { return t==3.1; } ); // HtmlView Page linking property 'Visibility' for element 'plastic_2_5'
          _view.plastic_2_5.setAction("OnPress", function(_data,_info) {
  choosecopper=false
  chooseplastic=true
  playSelectedVideo("video22")
  t=22;

}); // HtmlView Page setting action 'OnPress' for element 'plastic_2_5'
          _view.copper_2_5.linkProperty("FillColor",  function() { return clearcolor; }, function(_v) { clearcolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'copper_2_5'
          _view.copper_2_5.linkProperty("Visibility",  function() { return t==3.1; } ); // HtmlView Page linking property 'Visibility' for element 'copper_2_5'
          _view.copper_2_5.setAction("OnPress", function(_data,_info) {
  choosecopper=true
  chooseplastic=false
  playSelectedVideo("video4")
  t=4;

}); // HtmlView Page setting action 'OnPress' for element 'copper_2_5'
          _view.optionA_4.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_4'
          _view.optionA_4.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_4'
          _view.optionA_4.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_4'
          _view.optionA_4.linkProperty("Visibility",  function() { return t==6.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_4'
          _view.optionA_4.setAction("OnPress", function(_data,_info) {
  t=8
  playSelectedVideo("video8")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_4'
          _view.optionB_4.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_4'
          _view.optionB_4.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_4'
          _view.optionB_4.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_4'
          _view.optionB_4.linkProperty("Visibility",  function() { return t==6.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_4'
          _view.optionB_4.setAction("OnPress", function(_data,_info) {
  t=7
  playSelectedVideo("video7")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_4'
          _view.optionA_5_6.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_5_6'
          _view.optionA_5_6.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_5_6'
          _view.optionA_5_6.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_5_6'
          _view.optionA_5_6.linkProperty("Visibility",  function() { return t==7.1||t==8.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_5_6'
          _view.optionA_5_6.setAction("OnPress", function(_data,_info) {
  t=9
  playSelectedVideo("video9")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_5_6'
          _view.optionB_5_6.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_5_6'
          _view.optionB_5_6.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_5_6'
          _view.optionB_5_6.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_5_6'
          _view.optionB_5_6.linkProperty("Visibility",  function() { return t==7.1||t==8.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_5_6'
          _view.optionB_5_6.setAction("OnPress", function(_data,_info) {
  t=10
  playSelectedVideo("video10")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_5_6'
          _view.optionA_10.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_10'
          _view.optionA_10.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_10'
          _view.optionA_10.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_10'
          _view.optionA_10.linkProperty("Visibility",  function() { return t==14.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_10'
          _view.optionA_10.setAction("OnPress", function(_data,_info) {
  t=15
  playSelectedVideo("video15")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_10'
          _view.optionB_10.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_10'
          _view.optionB_10.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_10'
          _view.optionB_10.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_10'
          _view.optionB_10.linkProperty("Visibility",  function() { return t==14.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_10'
          _view.optionB_10.setAction("OnPress", function(_data,_info) {
  t=16
  playSelectedVideo("video16")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_10'
          _view.optionA_11_12.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_11_12'
          _view.optionA_11_12.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_11_12'
          _view.optionA_11_12.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_11_12'
          _view.optionA_11_12.linkProperty("Visibility",  function() { return t==15.1||t==16.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_11_12'
          _view.optionA_11_12.setAction("OnPress", function(_data,_info) {
  t=18
  playSelectedVideo("video18")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_11_12'
          _view.optionB_11_12.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_11_12'
          _view.optionB_11_12.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_11_12'
          _view.optionB_11_12.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_11_12'
          _view.optionB_11_12.linkProperty("Visibility",  function() { return t==15.1||t==16.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_11_12'
          _view.optionB_11_12.setAction("OnPress", function(_data,_info) {
  t=17
  playSelectedVideo("video17")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_11_12'
          _view.optionA_17.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_17'
          _view.optionA_17.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_17'
          _view.optionA_17.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_17'
          _view.optionA_17.linkProperty("Visibility",  function() { return t==24.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_17'
          _view.optionA_17.setAction("OnPress", function(_data,_info) {
  t=28
  playSelectedVideo("video28")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_17'
          _view.optionB_17.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_17'
          _view.optionB_17.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_17'
          _view.optionB_17.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_17'
          _view.optionB_17.linkProperty("Visibility",  function() { return t==24.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_17'
          _view.optionB_17.setAction("OnPress", function(_data,_info) {
  t=29
  playSelectedVideo("video29")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_17'
          _view.optionA_20_12.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_20_12'
          _view.optionA_20_12.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_20_12'
          _view.optionA_20_12.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_20_12'
          _view.optionA_20_12.linkProperty("Visibility",  function() { return t==28.1||t==29.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_20_12'
          _view.optionA_20_12.setAction("OnPress", function(_data,_info) {
  t=18
  playSelectedVideo("video18")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_20_12'
          _view.optionB_20_12.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_20_12'
          _view.optionB_20_12.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_20_12'
          _view.optionB_20_12.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_20_12'
          _view.optionB_20_12.linkProperty("Visibility",  function() { return t==28.1||t==29.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_20_12'
          _view.optionB_20_12.setAction("OnPress", function(_data,_info) {
  t=17
  playSelectedVideo("video17")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_20_12'
          _view.optionA_18.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_18'
          _view.optionA_18.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_18'
          _view.optionA_18.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_18'
          _view.optionA_18.linkProperty("Visibility",  function() { return t==25.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_18'
          _view.optionA_18.setAction("OnPress", function(_data,_info) {
  t=27
  playSelectedVideo("video27")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_18'
          _view.optionB_18.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_18'
          _view.optionB_18.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_18'
          _view.optionB_18.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_18'
          _view.optionB_18.linkProperty("Visibility",  function() { return t==25.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_18'
          _view.optionB_18.setAction("OnPress", function(_data,_info) {
  t=26
  playSelectedVideo("video26")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_18'
          _view.optionA_19_6.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionA_19_6'
          _view.optionA_19_6.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionA_19_6'
          _view.optionA_19_6.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionA_19_6'
          _view.optionA_19_6.linkProperty("Visibility",  function() { return t==26.1||t==27.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionA_19_6'
          _view.optionA_19_6.setAction("OnPress", function(_data,_info) {
  t=9
  playSelectedVideo("video9")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionA_19_6'
          _view.optionB_19_6.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'optionB_19_6'
          _view.optionB_19_6.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'optionB_19_6'
          _view.optionB_19_6.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'optionB_19_6'
          _view.optionB_19_6.linkProperty("Visibility",  function() { return t==26.1||t==27.1; } ); // HtmlView Page linking property 'Visibility' for element 'optionB_19_6'
          _view.optionB_19_6.setAction("OnPress", function(_data,_info) {
  t=10
  playSelectedVideo("video10")
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'optionB_19_6'
          _view.startagain_button.linkProperty("FillColor",  function() { return optioncolor; }, function(_v) { optioncolor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'startagain_button'
          _view.startagain_button.setAction("OnExit", function(_data,_info) {
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'startagain_button'
          _view.startagain_button.setAction("OnEnter", function(_data,_info) {
  optioncolor=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'startagain_button'
          _view.startagain_button.linkProperty("Visibility",  function() { return t==13.1||t==21.1||t==30; } ); // HtmlView Page linking property 'Visibility' for element 'startagain_button'
          _view.startagain_button.setAction("OnPress", function(_data,_info) {
  t=1
  playSelectedVideo("video1")
  optioncolor=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'startagain_button'
          _view.summary_button.linkProperty("FillColor",  function() { return optioncolor2; }, function(_v) { optioncolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'summary_button'
          _view.summary_button.setAction("OnExit", function(_data,_info) {
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnExit' for element 'summary_button'
          _view.summary_button.setAction("OnEnter", function(_data,_info) {
  optioncolor2=gold;

}); // HtmlView Page setting action 'OnEnter' for element 'summary_button'
          _view.summary_button.linkProperty("Visibility",  function() { return t==13.1||t==21.1; } ); // HtmlView Page linking property 'Visibility' for element 'summary_button'
          _view.summary_button.setAction("OnPress", function(_data,_info) {
  t=30
  optioncolor2=clearcolor;

}); // HtmlView Page setting action 'OnPress' for element 'summary_button'
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
function conductor_vs_insulator_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = conductor_vs_insulator_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Desc Page','./conductor_vs_insulator_Intro_1.html');

  return _view;
} // end of main function

function conductor_vs_insulator_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"videos", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'videos'
      .setProperty("Height","0vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'videos'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'videos'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'audio'
      .setProperty("Volume",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Volume' for element 'audio'
      .setProperty("AudioUrl","./assets/Final/Credits/clearday.mp3 (soundtrack).mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.video,"videocredits", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'videocredits'
      .setProperty("VideoUrl","./assets/Final/Credits/Credits.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'videocredits'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame1", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame1'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame1'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame1'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video1", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video1'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 1.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video1'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame2", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame2'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame2'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video2", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video2'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 2.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame2o5", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame2o5'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame2o5'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame2o5'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video3", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video3'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 2.5.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video3'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame3", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame3'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame3'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame3'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video4", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video4'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 3.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video4'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame3o5", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame3o5'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame3o5'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame3o5'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video5", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video5'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 3.5.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video5'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame4", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame4'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame4'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame4'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video6", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video6'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 4.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video6'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame5_6", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame5_6'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame5_6'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame5_6'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video7", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video7'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 5 _ 6.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video7'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame5o5_6", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame5o5_6'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame5o5_6'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame5o5_6'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video8", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video8'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 5.5 _ 6.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video8'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame7", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame7'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame7'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame7'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video9", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video9'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 7.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video9'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame7o5", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame7o5'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame7o5'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame7o5'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video10", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video10'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 7.5.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video10'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame8", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame8'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame8'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame8'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video11", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video11'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 8.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video11'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame9", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame9'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame9'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame9'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video12", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video12'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 9.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video12'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame9_end", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame9_end'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame9_end'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame9_end'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video13", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video13'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 9_End.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video13'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame10", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame10'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame10'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame10'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video14", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video14'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 10.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video14'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame11_12", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame11_12'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame11_12'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame11_12'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video15", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video15'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 11 _ 12.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video15'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame11o5_12", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame11o5_12'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame11o5_12'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame11o5_12'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video16", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video16'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 11.5 _ 12.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video16'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame13", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame13'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame13'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame13'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video17", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video17'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 13.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video17'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame13o5", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame13o5'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame13o5'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame13o5'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video18", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video18'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 13.5.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video18'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame14", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame14'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame14'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame14'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video19", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video19'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 14.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video19'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame15", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame15'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame15'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame15'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video20", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video20'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 15.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video20'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame15_end", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame15_end'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame15_end'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame15_end'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video21", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video21'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 15_End.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video21'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame16", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame16'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame16'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame16'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video22", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video22'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 16.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video22'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame16_5", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame16_5'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame16_5'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame16_5'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video23", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video23'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 16.5.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video23'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame17", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame17'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame17'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame17'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video24", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video24'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 17.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video24'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame18", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame18'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame18'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame18'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video25", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video25'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 18.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video25'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame19_6", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame19_6'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame19_6'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame19_6'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video26", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video26'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 19 _ 6.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video26'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame19o5_6", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame19o5_6'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame19o5_6'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame19o5_6'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video27", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video27'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 19.5 _ 6.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video27'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame20_12", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame20_12'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame20_12'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame20_12'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video28", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video28'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 20 _ 12.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video28'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"frame20o5_12", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'frame20o5_12'
      .setProperty("Text","frame1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'frame20o5_12'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'frame20o5_12'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video29", _view.videos) // EJsS HtmlView.HtmlView Page: declaration of element 'video29'
      .setProperty("VideoUrl","./assets/Final/Animation (updated)/Frame 20.5 _ 12.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video29'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("Height","42.5vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel2'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel2'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("AxisYLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'AxisYLineColor' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",-20) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("GuttersLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GuttersLineColor' for element 'plottingPanel'
      .setProperty("AxisXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisXShow' for element 'plottingPanel'
      .setProperty("GuttersLineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'GuttersLineWidth' for element 'plottingPanel'
      .setProperty("YFixedTick",-20) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",40) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",40) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("GridXLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GridXLineColor' for element 'plottingPanel'
      .setProperty("GridXLineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'GridXLineWidth' for element 'plottingPanel'
      .setProperty("GridXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridXShow' for element 'plottingPanel'
      .setProperty("Background","rgba(0,0,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",10) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",8) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("GridYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridYShow' for element 'plottingPanel'
      .setProperty("MinimumX",-8) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("AxisXLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'AxisXLineColor' for element 'plottingPanel'
      .setProperty("GridYLineColor","rgba(0,255,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GridYLineColor' for element 'plottingPanel'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AxisYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisYShow' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("GuttersColor","rgba(0,0,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'GuttersColor' for element 'plottingPanel'
      .setProperty("CursorTypeForMove","grab") // EJsS HtmlView.HtmlView Page: setting property 'CursorTypeForMove' for element 'plottingPanel'
      .setProperty("GridYLineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'GridYLineWidth' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"summary", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'summary'
      .setProperty("SizeX",17.76) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'summary'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'summary'
      .setProperty("Y",5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'summary'
      .setProperty("ImageUrl","./assets/Final/Summary/Summary0.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'summary'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'summary'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"plastic_2_5", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plastic_2_5'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'plastic_2_5'
      .setProperty("SizeX",5.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'plastic_2_5'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'plastic_2_5'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'plastic_2_5'
      .setProperty("X",-9) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'plastic_2_5'
      .setProperty("Y",10) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'plastic_2_5'
      .setProperty("SizeY",5.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'plastic_2_5'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'plastic_2_5'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'plastic_2_5'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"copper_2_5", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'copper_2_5'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'copper_2_5'
      .setProperty("SizeX",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'copper_2_5'
      .setProperty("RelativePosition","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'copper_2_5'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'copper_2_5'
      .setProperty("X",9) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'copper_2_5'
      .setProperty("Y",10) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'copper_2_5'
      .setProperty("SizeY",5.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'copper_2_5'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'copper_2_5'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'copper_2_5'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_4", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_4'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_4'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_4'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_4'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_4'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_4'
      .setProperty("Y",2.6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_4'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_4'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_4'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_4'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_4", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_4'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_4'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_4'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_4'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_4'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_4'
      .setProperty("Y",1.4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_4'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_4'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_4'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_4'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_5_6", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_5_6'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_5_6'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_5_6'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_5_6'
      .setProperty("SizeX",10.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_5_6'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_5_6'
      .setProperty("Y",3.93) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_5_6'
      .setProperty("SizeY",1.58) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_5_6'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_5_6'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_5_6'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_5_6", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_5_6'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_5_6'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_5_6'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_5_6'
      .setProperty("SizeX",9.92) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_5_6'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_5_6'
      .setProperty("Y",2.2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_5_6'
      .setProperty("SizeY",1.58) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_5_6'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_5_6'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_5_6'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_10", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_10'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_10'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_10'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_10'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_10'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_10'
      .setProperty("Y",2.6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_10'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_10'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_10'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_10'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_10", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_10'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_10'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_10'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_10'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_10'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_10'
      .setProperty("Y",1.4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_10'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_10'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_10'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_10'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_11_12", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_11_12'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_11_12'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_11_12'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_11_12'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_11_12'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_11_12'
      .setProperty("Y",3.96) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_11_12'
      .setProperty("SizeY",1.6) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_11_12'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_11_12'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_11_12'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_11_12", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_11_12'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_11_12'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_11_12'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_11_12'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_11_12'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_11_12'
      .setProperty("Y",2.25) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_11_12'
      .setProperty("SizeY",1.6) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_11_12'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_11_12'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_11_12'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_17", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_17'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_17'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_17'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_17'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_17'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_17'
      .setProperty("Y",2.6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_17'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_17'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_17'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_17'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_17", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_17'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_17'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_17'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_17'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_17'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_17'
      .setProperty("Y",1.4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_17'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_17'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_17'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_17'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_20_12", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_20_12'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_20_12'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_20_12'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_20_12'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_20_12'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_20_12'
      .setProperty("Y",3.96) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_20_12'
      .setProperty("SizeY",1.6) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_20_12'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_20_12'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_20_12'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_20_12", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_20_12'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_20_12'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_20_12'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_20_12'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_20_12'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_20_12'
      .setProperty("Y",2.25) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_20_12'
      .setProperty("SizeY",1.6) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_20_12'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_20_12'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_20_12'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_18", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_18'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_18'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_18'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_18'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_18'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_18'
      .setProperty("Y",2.6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_18'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_18'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_18'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_18'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_18", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_18'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_18'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_18'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_18'
      .setProperty("SizeX",10.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_18'
      .setProperty("X",-8.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_18'
      .setProperty("Y",1.4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_18'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_18'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_18'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_18'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionA_19_6", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionA_19_6'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionA_19_6'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionA_19_6'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionA_19_6'
      .setProperty("SizeX",10.26) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionA_19_6'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionA_19_6'
      .setProperty("Y",4.15) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionA_19_6'
      .setProperty("SizeY",1.6) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionA_19_6'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionA_19_6'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionA_19_6'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"optionB_19_6", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionB_19_6'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'optionB_19_6'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'optionB_19_6'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'optionB_19_6'
      .setProperty("SizeX",9.96) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'optionB_19_6'
      .setProperty("X",-8.35) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'optionB_19_6'
      .setProperty("Y",2.2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'optionB_19_6'
      .setProperty("SizeY",1.6) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'optionB_19_6'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'optionB_19_6'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'optionB_19_6'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"startagain_button", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'startagain_button'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'startagain_button'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'startagain_button'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'startagain_button'
      .setProperty("SizeX",2.61) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'startagain_button'
      .setProperty("X",-8.43) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'startagain_button'
      .setProperty("Y",1.13) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'startagain_button'
      .setProperty("SizeY",0.78) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'startagain_button'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'startagain_button'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'startagain_button'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"summary_button", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'summary_button'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'summary_button'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'summary_button'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'summary_button'
      .setProperty("SizeX",2.31) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'summary_button'
      .setProperty("X",-5.43, -3.12) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'summary_button'
      .setProperty("Y",1.13) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'summary_button'
      .setProperty("SizeY",0.78) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'summary_button'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'summary_button'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'summary_button'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("CSS",{ "position" : "absolute",  "left" : "0px", "top": "5vh"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'checkBox'
      .setProperty("Checked",true) // EJsS HtmlView.HtmlView Page: setting property 'Checked' for element 'checkBox'
      .setProperty("Text","Sound") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"time", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'time'
      .setProperty("CSS",{"cursor": "grab"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'time'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'time'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'time'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
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
          _model =  new conductor_vs_insulator("_topFrame","_ejs_library/",null);
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
