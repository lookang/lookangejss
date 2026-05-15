function light_travel_in_straight_line9(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
  var _model = EJSS_CORE.createAnimationLMS();
  var _view;
  var _isPlaying = false;
  var _isPaused = true;
  var _isMobile = (navigator===undefined) ? false : navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);

var _stringProperties = {};
  var _tools = EJSS_CORE.Tools;
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

  var x; // EjsS Model.Variables.circle.x
  var y; // EjsS Model.Variables.circle.y
  var theta; // EjsS Model.Variables.circle.theta

  var iOS; // EjsS Model.Variables.layout.iOS
  var Android; // EjsS Model.Variables.layout.Android
  var iPad; // EjsS Model.Variables.layout.iPad
  var iPhone; // EjsS Model.Variables.layout.iPhone
  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Height2; // EjsS Model.Variables.layout.Height2
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

  var videoUrl; // EjsS Model.Variables.video.videoUrl
  var frameStart; // EjsS Model.Variables.video.frameStart
  var frame; // EjsS Model.Variables.video.frame
  var frameDelta; // EjsS Model.Variables.video.frameDelta
  var topcss; // EjsS Model.Variables.video.topcss
  var css; // EjsS Model.Variables.video.css
  var css2; // EjsS Model.Variables.video.css2
  var videoW; // EjsS Model.Variables.video.videoW
  var videoH; // EjsS Model.Variables.video.videoH
  var control; // EjsS Model.Variables.video.control
  var video; // EjsS Model.Variables.video.video
  var videoActualWidth; // EjsS Model.Variables.video.videoActualWidth
  var videoActualHeight; // EjsS Model.Variables.video.videoActualHeight
  var firsttime; // EjsS Model.Variables.video.firsttime

  var squareBoardX; // EjsS Model.Variables.board.squareBoardX
  var squareBoardY; // EjsS Model.Variables.board.squareBoardY
  var squareBoardX2; // EjsS Model.Variables.board.squareBoardX2
  var squareBoardY2; // EjsS Model.Variables.board.squareBoardY2
  var squareBoardX3; // EjsS Model.Variables.board.squareBoardX3
  var squareBoardY3; // EjsS Model.Variables.board.squareBoardY3
  var eightfiveLeft; // EjsS Model.Variables.board.eightfiveLeft
  var eightfiveRight; // EjsS Model.Variables.board.eightfiveRight
  var FirstTry; // EjsS Model.Variables.board.FirstTry
  var bothButtons; // EjsS Model.Variables.board.bothButtons
  var shapeYesLeftX; // EjsS Model.Variables.board.shapeYesLeftX
  var shapeYesLeftY; // EjsS Model.Variables.board.shapeYesLeftY
  var shapeNoLeftX; // EjsS Model.Variables.board.shapeNoLeftX
  var shapeNoLeftY; // EjsS Model.Variables.board.shapeNoLeftY
  var shapeFillColorL1; // EjsS Model.Variables.board.shapeFillColorL1
  var shapeLineWidthL1; // EjsS Model.Variables.board.shapeLineWidthL1
  var shapeFillColorL2; // EjsS Model.Variables.board.shapeFillColorL2
  var shapeLineWidthL2; // EjsS Model.Variables.board.shapeLineWidthL2
  var shapeFillColorR1; // EjsS Model.Variables.board.shapeFillColorR1
  var shapeLineWidthR1; // EjsS Model.Variables.board.shapeLineWidthR1
  var shapeFillColorR2; // EjsS Model.Variables.board.shapeFillColorR2
  var shapeLineWidthR2; // EjsS Model.Variables.board.shapeLineWidthR2
  var shapeYesRightX; // EjsS Model.Variables.board.shapeYesRightX
  var shapeYesRightY; // EjsS Model.Variables.board.shapeYesRightY
  var shapeNoRightX; // EjsS Model.Variables.board.shapeNoRightX
  var shapeNoRightY; // EjsS Model.Variables.board.shapeNoRightY
  var cssPanel; // EjsS Model.Variables.board.cssPanel
  var cssPanel2; // EjsS Model.Variables.board.cssPanel2
  var cssPanelAndy; // EjsS Model.Variables.board.cssPanelAndy
  var imageURL; // EjsS Model.Variables.board.imageURL
  var target; // EjsS Model.Variables.board.target
  var triggered35; // EjsS Model.Variables.board.triggered35
  var triggered145; // EjsS Model.Variables.board.triggered145
  var triggered255; // EjsS Model.Variables.board.triggered255

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
      n : n,
      angle : angle,
      x : x,
      y : y,
      theta : theta,
      iOS : iOS,
      Android : Android,
      iPad : iPad,
      iPhone : iPhone,
      Width : Width,
      Height : Height,
      Height2 : Height2,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      videoUrl : videoUrl,
      frameStart : frameStart,
      frame : frame,
      frameDelta : frameDelta,
      topcss : topcss,
      css : css,
      css2 : css2,
      videoW : videoW,
      videoH : videoH,
      control : control,
      video : video,
      videoActualWidth : videoActualWidth,
      videoActualHeight : videoActualHeight,
      firsttime : firsttime,
      squareBoardX : squareBoardX,
      squareBoardY : squareBoardY,
      squareBoardX2 : squareBoardX2,
      squareBoardY2 : squareBoardY2,
      squareBoardX3 : squareBoardX3,
      squareBoardY3 : squareBoardY3,
      eightfiveLeft : eightfiveLeft,
      eightfiveRight : eightfiveRight,
      FirstTry : FirstTry,
      bothButtons : bothButtons,
      shapeYesLeftX : shapeYesLeftX,
      shapeYesLeftY : shapeYesLeftY,
      shapeNoLeftX : shapeNoLeftX,
      shapeNoLeftY : shapeNoLeftY,
      shapeFillColorL1 : shapeFillColorL1,
      shapeLineWidthL1 : shapeLineWidthL1,
      shapeFillColorL2 : shapeFillColorL2,
      shapeLineWidthL2 : shapeLineWidthL2,
      shapeFillColorR1 : shapeFillColorR1,
      shapeLineWidthR1 : shapeLineWidthR1,
      shapeFillColorR2 : shapeFillColorR2,
      shapeLineWidthR2 : shapeLineWidthR2,
      shapeYesRightX : shapeYesRightX,
      shapeYesRightY : shapeYesRightY,
      shapeNoRightX : shapeNoRightX,
      shapeNoRightY : shapeNoRightY,
      cssPanel : cssPanel,
      cssPanel2 : cssPanel2,
      cssPanelAndy : cssPanelAndy,
      imageURL : imageURL,
      target : target,
      triggered35 : triggered35,
      triggered145 : triggered145,
      triggered255 : triggered255
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.theta != "undefined") theta = json.theta;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.Android != "undefined") Android = json.Android;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Height2 != "undefined") Height2 = json.Height2;
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
    if(typeof json.videoUrl != "undefined") videoUrl = json.videoUrl;
    if(typeof json.frameStart != "undefined") frameStart = json.frameStart;
    if(typeof json.frame != "undefined") frame = json.frame;
    if(typeof json.frameDelta != "undefined") frameDelta = json.frameDelta;
    if(typeof json.topcss != "undefined") topcss = json.topcss;
    if(typeof json.css != "undefined") css = json.css;
    if(typeof json.css2 != "undefined") css2 = json.css2;
    if(typeof json.videoW != "undefined") videoW = json.videoW;
    if(typeof json.videoH != "undefined") videoH = json.videoH;
    if(typeof json.control != "undefined") control = json.control;
    if(typeof json.video != "undefined") video = json.video;
    if(typeof json.videoActualWidth != "undefined") videoActualWidth = json.videoActualWidth;
    if(typeof json.videoActualHeight != "undefined") videoActualHeight = json.videoActualHeight;
    if(typeof json.firsttime != "undefined") firsttime = json.firsttime;
    if(typeof json.squareBoardX != "undefined") squareBoardX = json.squareBoardX;
    if(typeof json.squareBoardY != "undefined") squareBoardY = json.squareBoardY;
    if(typeof json.squareBoardX2 != "undefined") squareBoardX2 = json.squareBoardX2;
    if(typeof json.squareBoardY2 != "undefined") squareBoardY2 = json.squareBoardY2;
    if(typeof json.squareBoardX3 != "undefined") squareBoardX3 = json.squareBoardX3;
    if(typeof json.squareBoardY3 != "undefined") squareBoardY3 = json.squareBoardY3;
    if(typeof json.eightfiveLeft != "undefined") eightfiveLeft = json.eightfiveLeft;
    if(typeof json.eightfiveRight != "undefined") eightfiveRight = json.eightfiveRight;
    if(typeof json.FirstTry != "undefined") FirstTry = json.FirstTry;
    if(typeof json.bothButtons != "undefined") bothButtons = json.bothButtons;
    if(typeof json.shapeYesLeftX != "undefined") shapeYesLeftX = json.shapeYesLeftX;
    if(typeof json.shapeYesLeftY != "undefined") shapeYesLeftY = json.shapeYesLeftY;
    if(typeof json.shapeNoLeftX != "undefined") shapeNoLeftX = json.shapeNoLeftX;
    if(typeof json.shapeNoLeftY != "undefined") shapeNoLeftY = json.shapeNoLeftY;
    if(typeof json.shapeFillColorL1 != "undefined") shapeFillColorL1 = json.shapeFillColorL1;
    if(typeof json.shapeLineWidthL1 != "undefined") shapeLineWidthL1 = json.shapeLineWidthL1;
    if(typeof json.shapeFillColorL2 != "undefined") shapeFillColorL2 = json.shapeFillColorL2;
    if(typeof json.shapeLineWidthL2 != "undefined") shapeLineWidthL2 = json.shapeLineWidthL2;
    if(typeof json.shapeFillColorR1 != "undefined") shapeFillColorR1 = json.shapeFillColorR1;
    if(typeof json.shapeLineWidthR1 != "undefined") shapeLineWidthR1 = json.shapeLineWidthR1;
    if(typeof json.shapeFillColorR2 != "undefined") shapeFillColorR2 = json.shapeFillColorR2;
    if(typeof json.shapeLineWidthR2 != "undefined") shapeLineWidthR2 = json.shapeLineWidthR2;
    if(typeof json.shapeYesRightX != "undefined") shapeYesRightX = json.shapeYesRightX;
    if(typeof json.shapeYesRightY != "undefined") shapeYesRightY = json.shapeYesRightY;
    if(typeof json.shapeNoRightX != "undefined") shapeNoRightX = json.shapeNoRightX;
    if(typeof json.shapeNoRightY != "undefined") shapeNoRightY = json.shapeNoRightY;
    if(typeof json.cssPanel != "undefined") cssPanel = json.cssPanel;
    if(typeof json.cssPanel2 != "undefined") cssPanel2 = json.cssPanel2;
    if(typeof json.cssPanelAndy != "undefined") cssPanelAndy = json.cssPanelAndy;
    if(typeof json.imageURL != "undefined") imageURL = json.imageURL;
    if(typeof json.target != "undefined") target = json.target;
    if(typeof json.triggered35 != "undefined") triggered35 = json.triggered35;
    if(typeof json.triggered145 != "undefined") triggered145 = json.triggered145;
    if(typeof json.triggered255 != "undefined") triggered255 = json.triggered255;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["Init Page"] = false;
    __pagesEnabled["video"] = true;
    __pagesEnabled["deetct video dimension"] = true;
    __pagesEnabled["css"] = true;
    __pagesEnabled["FixRel Page"] = false;
    __pagesEnabled["FixRel Page 2"] = true;
    __pagesEnabled["bothbuttons"] = false;
  });

  _model.addToReset(function() {
    t = 1; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
    n = 32; // EjsS Model.Variables.Var Table.n
    angle = pi; // EjsS Model.Variables.Var Table.angle
  });

  _model.addToReset(function() {
    x = new Array(n+1); // EjsS Model.Variables.circle.x
    y = new Array(n+1); // EjsS Model.Variables.circle.y
    theta = pi/4; // EjsS Model.Variables.circle.theta
  });

  _model.addToReset(function() {
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iOS
    Android = /Android|android/i.test(navigator.userAgent); // EjsS Model.Variables.layout.Android
    iPad = /iPad/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPad
    iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPhone
    Width = Math.min(window.innerWidth,window.innerHeight*4/3*0.9); // EjsS Model.Variables.layout.Width
    Height = Width*3/4; // EjsS Model.Variables.layout.Height
    Height2 = Width*3/4-64; // EjsS Model.Variables.layout.Height2
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

  _model.addToReset(function() {
    videoUrl = "./public/assets/videos/01-intro.mp4"; // EjsS Model.Variables.video.videoUrl
    frameStart = 1; // EjsS Model.Variables.video.frameStart
    frame = frameStart; // EjsS Model.Variables.video.frame
    frameDelta = frameDelta; // EjsS Model.Variables.video.frameDelta
    topcss = "0 vh"; // EjsS Model.Variables.video.topcss
    css = {"top": topcss}; // EjsS Model.Variables.video.css
    css2 = { "position" : "absolute",  "left" : "23vw", "top": topcss}; // EjsS Model.Variables.video.css2
    videoW = 0; // EjsS Model.Variables.video.videoW
    videoH = 0; // EjsS Model.Variables.video.videoH
    control = false; // EjsS Model.Variables.video.control
    video = document.getElementById("video"); // EjsS Model.Variables.video.video
    firsttime = true; // EjsS Model.Variables.video.firsttime
  });

  _model.addToReset(function() {
    squareBoardX = 0; // EjsS Model.Variables.board.squareBoardX
    squareBoardY = 0.87; // EjsS Model.Variables.board.squareBoardY
    squareBoardX2 = 3.1; // EjsS Model.Variables.board.squareBoardX2
    squareBoardY2 = 0.87; // EjsS Model.Variables.board.squareBoardY2
    squareBoardX3 = 6.1; // EjsS Model.Variables.board.squareBoardX3
    squareBoardY3 = 0.87; // EjsS Model.Variables.board.squareBoardY3
    FirstTry = true; // EjsS Model.Variables.board.FirstTry
    bothButtons = false; // EjsS Model.Variables.board.bothButtons
    shapeYesLeftX = 0; // EjsS Model.Variables.board.shapeYesLeftX
    shapeYesLeftY = 6.2; // EjsS Model.Variables.board.shapeYesLeftY
    shapeNoLeftX = 0; // EjsS Model.Variables.board.shapeNoLeftX
    shapeNoLeftY = 5.4; // EjsS Model.Variables.board.shapeNoLeftY
    shapeFillColorL1 = "rgba(0,255,0,0.05)"; // EjsS Model.Variables.board.shapeFillColorL1
    shapeLineWidthL1 = 0; // EjsS Model.Variables.board.shapeLineWidthL1
    shapeFillColorL2 = "rgba(0,255,0,0.05)"; // EjsS Model.Variables.board.shapeFillColorL2
    shapeLineWidthL2 = 0; // EjsS Model.Variables.board.shapeLineWidthL2
    shapeFillColorR1 = "rgba(0,255,0,0.05)"; // EjsS Model.Variables.board.shapeFillColorR1
    shapeLineWidthR1 = 0; // EjsS Model.Variables.board.shapeLineWidthR1
    shapeFillColorR2 = "rgba(0,255,0,0.05)"; // EjsS Model.Variables.board.shapeFillColorR2
    shapeLineWidthR2 = 0; // EjsS Model.Variables.board.shapeLineWidthR2
    shapeYesRightX = 4.2; // EjsS Model.Variables.board.shapeYesRightX
    shapeYesRightY = 6.2; // EjsS Model.Variables.board.shapeYesRightY
    shapeNoRightX = 4.2; // EjsS Model.Variables.board.shapeNoRightX
    shapeNoRightY = 5.4; // EjsS Model.Variables.board.shapeNoRightY
    cssPanel = {"position":"absolute","top":"2vh"}; // EjsS Model.Variables.board.cssPanel
    cssPanel2 = {  "position" : "relative",  "display":"flex", "justify-content":"center", "align-items":"center", "top": "90vh"}; // EjsS Model.Variables.board.cssPanel2
    cssPanelAndy = {  "display": "flex",         "justify-content": "center",     "align-items": "center"}; // EjsS Model.Variables.board.cssPanelAndy
    imageURL = ""; // EjsS Model.Variables.board.imageURL
    target = [-2,3,2,6]; // EjsS Model.Variables.board.target
    triggered35 = false; // EjsS Model.Variables.board.triggered35
    triggered145 = false; // EjsS Model.Variables.board.triggered145
    triggered255 = false; // EjsS Model.Variables.board.triggered255
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

  function eightfive () {  // > CustomCode.eightfive:1
    if (eightfiveLeft == false && eightfiveRight == false && FirstTry) {  // > CustomCode.eightfive:2
      if (FirstTry&&(t==8.5||t==8)) {  // > CustomCode.eightfive:3
        t= 9 //nono  // > CustomCode.eightfive:4
        _view.video8.pause()  // > CustomCode.eightfive:5
        _view.video9.play()  // > CustomCode.eightfive:6
      }  // > CustomCode.eightfive:7
      else if (FirstTry&&(t==19.5||t==19)) {  // > CustomCode.eightfive:8
        t= 24 //nono  // > CustomCode.eightfive:9
       // alert( "24 t ="+t)  // > CustomCode.eightfive:10
        _view.video19.pause()  // > CustomCode.eightfive:11
        _view.video24.play()  // > CustomCode.eightfive:12
      }  // > CustomCode.eightfive:13
      else if (FirstTry&&(t==30.5)||t==30) {  // > CustomCode.eightfive:14
        t= 35 //nono  // > CustomCode.eightfive:15
        //alert( "35 t ="+t)  // > CustomCode.eightfive:16
        _view.video30.pause()  // > CustomCode.eightfive:17
        _view.video35.play()  // > CustomCode.eightfive:18
      }  // > CustomCode.eightfive:19
      // alert( "t ="+t)  // > CustomCode.eightfive:20
      FirstTry = false  // > CustomCode.eightfive:21
    }  // > CustomCode.eightfive:22
    else if (eightfiveLeft == true && eightfiveRight == false && FirstTry) {  // > CustomCode.eightfive:23
      // t =10  // > CustomCode.eightfive:24
      if (FirstTry&&(t==8.5||t==8)) {  // > CustomCode.eightfive:25
        t= 10 //yesno  // > CustomCode.eightfive:26
        _view.video8.pause()  // > CustomCode.eightfive:27
        _view.video10.play()  // > CustomCode.eightfive:28
      }  // > CustomCode.eightfive:29
      else  if (FirstTry&&(t==19.5||t==19)) {  // > CustomCode.eightfive:30
        t= 21  // > CustomCode.eightfive:31
        _view.video19.pause()  // > CustomCode.eightfive:32
        _view.video21.play()  // > CustomCode.eightfive:33
      }  // > CustomCode.eightfive:34
      else  if (FirstTry&&(t==30.5||t==30)) {  // > CustomCode.eightfive:35
        t= 32  // > CustomCode.eightfive:36
        _view.video30.pause()  // > CustomCode.eightfive:37
        _view.video32.play()  // > CustomCode.eightfive:38
      }  // > CustomCode.eightfive:39
      FirstTry = false  // > CustomCode.eightfive:40
    }  // > CustomCode.eightfive:41
    else if (eightfiveLeft == false && eightfiveRight ==  true && FirstTry) {  // > CustomCode.eightfive:42
      // t =11  // > CustomCode.eightfive:43
      if (FirstTry&&(t==8.5||t==8)) {  // > CustomCode.eightfive:44
        t= 11 //noyes  // > CustomCode.eightfive:45
        _view.video8.pause()  // > CustomCode.eightfive:46
        _view.video11.play()  // > CustomCode.eightfive:47
      }  // > CustomCode.eightfive:48
      else  if (FirstTry&&(t==19.5||t==19)) {  // > CustomCode.eightfive:49
        t= 22  // > CustomCode.eightfive:50
        _view.video19.pause()  // > CustomCode.eightfive:51
        _view.video22.play()  // > CustomCode.eightfive:52
      }  // > CustomCode.eightfive:53
      else  if (FirstTry&&(t==30.5||t==30)) {  // > CustomCode.eightfive:54
        t= 33  // > CustomCode.eightfive:55
        _view.video30.pause()  // > CustomCode.eightfive:56
        _view.video33.play()  // > CustomCode.eightfive:57
      }  // > CustomCode.eightfive:58
      FirstTry = false  // > CustomCode.eightfive:59
    }  // > CustomCode.eightfive:60
    else if (eightfiveLeft ==  true && eightfiveRight ==  true && FirstTry) {  // > CustomCode.eightfive:61
      // clip 13  // > CustomCode.eightfive:62
      // t =12  // > CustomCode.eightfive:63
      if (FirstTry&&(t==8.5||t==8)) {  // > CustomCode.eightfive:64
        t= 13 //yesyes is the correct  // > CustomCode.eightfive:65
        _view.video8.pause()  // > CustomCode.eightfive:66
        _view.video13.play()  // > CustomCode.eightfive:67
      }  // > CustomCode.eightfive:68
      else   if (FirstTry&&(t==19.5||t==19)) {  // > CustomCode.eightfive:69
        t= 20  // > CustomCode.eightfive:70
        _view.video19.pause()  // > CustomCode.eightfive:71
        _view.video20.play()  // > CustomCode.eightfive:72
      }  // > CustomCode.eightfive:73
      else   if (FirstTry&&(t==30.5||t==30)) {  // > CustomCode.eightfive:74
        t= 31  // > CustomCode.eightfive:75
        _view.video30.pause()  // > CustomCode.eightfive:76
        _view.video31.play()  // > CustomCode.eightfive:77
      }  // > CustomCode.eightfive:78
      FirstTry = false  // > CustomCode.eightfive:79
        // > CustomCode.eightfive:80
    }  // > CustomCode.eightfive:81
  }  // > CustomCode.eightfive:82

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

  function checkbothButtons(){  // > CustomCode.checkbothButtons:1
  if (eightfiveLeft==undefined||eightfiveRight==undefined){  // > CustomCode.checkbothButtons:2
    bothButtons=false  // > CustomCode.checkbothButtons:3
    }  // > CustomCode.checkbothButtons:4
      // > CustomCode.checkbothButtons:5
    else {  // > CustomCode.checkbothButtons:6
    bothButtons=true  // > CustomCode.checkbothButtons:7
      }  // > CustomCode.checkbothButtons:8
  }  // > CustomCode.checkbothButtons:9

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
      // > CustomCode.videofunction:18
    // Set 'autoplay' attribute to true but didnt seems to makw the video autoplay  // > CustomCode.videofunction:19
    selectedVideo.autoplay = true;  // > CustomCode.videofunction:20
      // > CustomCode.videofunction:21
    selectedVideo.play().catch(function(err) {  // > CustomCode.videofunction:22
      // Probably iOS  // > CustomCode.videofunction:23
      if (!isRecursed) {  // > CustomCode.videofunction:24
        EJSS_INTERFACE.BoxPanel.showOkDialog("Click 'OK' to continue, this is NOT a bug but an iOS requirement",   // > CustomCode.videofunction:25
        function(){   // > CustomCode.videofunction:26
          playSelectedVideo(videoId,true);  // > CustomCode.videofunction:27
        });  // > CustomCode.videofunction:28
      }  // > CustomCode.videofunction:29
    });  // > CustomCode.videofunction:30
    // _view[videoId].play();  // > CustomCode.videofunction:31
  }  // > CustomCode.videofunction:32

  function setPlaysInlineForAllVideos() {  // > CustomCode.setPlaysInlineForAllVideos:1
    const allVideos = document.querySelectorAll("video");  // > CustomCode.setPlaysInlineForAllVideos:2
    allVideos.forEach((video) => {  // > CustomCode.setPlaysInlineForAllVideos:3
      video.setAttribute("playsinline", true);  // > CustomCode.setPlaysInlineForAllVideos:4
    });  // > CustomCode.setPlaysInlineForAllVideos:5
  }  // > CustomCode.setPlaysInlineForAllVideos:6

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    //circle  // > Initialization.Init Page:1
    angle = pi; //angle to draw  // > Initialization.Init Page:2
    dangle = angle/n; //spacing of angle  // > Initialization.Init Page:3
    for (var i=0; i<=n  ; i++) {  // > Initialization.Init Page:4
       // > Initialization.Init Page:5
     x[i] = Math.cos(i*dangle); // first point is on the right corner say x of(1,0)  // > Initialization.Init Page:6
     y[i] = Math.sin(i*dangle); // first point is on the right corner say  y of (1,0)  // > Initialization.Init Page:7
       // > Initialization.Init Page:8
    }  // > Initialization.Init Page:9
    //x[0] = 0;  // > Initialization.Init Page:10
    //y[0]=0;  // > Initialization.Init Page:11
    x[n+1] = x[0]; // join back to start  // > Initialization.Init Page:12
    y[n+1]=y[0];// join back to start  // > Initialization.Init Page:13
  });

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
        playSelectedVideo("video1")  // > Initialization.video:11
        });  // > Initialization.video:12
        // > Initialization.video:13
      }  // > Initialization.video:14
    //debug  // > Initialization.video:15
    // Play selected video  // > Initialization.video:16
     // const selectedVideo = document.getElementById("video1");  // > Initialization.video:17
     // console.log(selectedVideo)  // > Initialization.video:18
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["deetct video dimension"]) return;
    //"window.innerWidth="+window.innerWidth+"\nwindow.innerHeight="+window.innerHeight  // > Initialization.deetct video dimension:1
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["css"]) return;
    //document.getElementById("image3_5_Board_Option").style.cursor = "grab";  // > Initialization.css:1
    setPlaysInlineForAllVideos()  // > Initialization.css:2
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
    if (t>=1&&t<2) {  // > FixedRelations.FixRel Page:1
     videoUrl = "./public/assets/videos/01-intro.mp4"  // > FixedRelations.FixRel Page:2
    }  // > FixedRelations.FixRel Page:3
    else if (t >=2&&t<3){  // > FixedRelations.FixRel Page:4
      videoUrl ="./public/assets/videos/02-begin.mp4"   // > FixedRelations.FixRel Page:5
      }  // > FixedRelations.FixRel Page:6
    else  if (t >=3&&t<3.5){  // > FixedRelations.FixRel Page:7
      videoUrl ="./public/assets/videos/03-part-1-intro.mp4"   // > FixedRelations.FixRel Page:8
      }  // > FixedRelations.FixRel Page:9
      else  if (t >=4&&t<5){  // > FixedRelations.FixRel Page:10
      videoUrl ="./public/assets/videos/04-part-1-anim.mp4"   // > FixedRelations.FixRel Page:11
      }  // > FixedRelations.FixRel Page:12
      else  if (t >=5&&t<6){  // > FixedRelations.FixRel Page:13
      videoUrl ="./public/assets/videos/06-part-1-result.mp4"   // > FixedRelations.FixRel Page:14
      }  // > FixedRelations.FixRel Page:15
      else  if (t >=6&&t<7){  // > FixedRelations.FixRel Page:16
      videoUrl ="./public/assets/videos/07-part-1-record-intro.mp4"   // > FixedRelations.FixRel Page:17
      }  // > FixedRelations.FixRel Page:18
      else  if (t >=7&&t<8){  // > FixedRelations.FixRel Page:19
      videoUrl ="./public/assets/videos/08-part-1-record.mp4"   // > FixedRelations.FixRel Page:20
      }  // > FixedRelations.FixRel Page:21
      else  if (t >=8&&t<9){  // > FixedRelations.FixRel Page:22
      videoUrl ="./public/assets/videos/09-part-1-record-no-no.mp4"   // > FixedRelations.FixRel Page:23
      }  // > FixedRelations.FixRel Page:24
      else  if (t >=9&&t<10){  // > FixedRelations.FixRel Page:25
      videoUrl ="./public/assets/videos/10-part-1-record-yes-no.mp4"   // > FixedRelations.FixRel Page:26
      }  // > FixedRelations.FixRel Page:27
      else  if (t >=10&&t<11){  // > FixedRelations.FixRel Page:28
      videoUrl ="./public/assets/videos/03-part-1-intro.mp4"   // > FixedRelations.FixRel Page:29
      }  // > FixedRelations.FixRel Page:30
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page 2"]) return;
    if (((t ==8.5||t==8) && bothButtons)||((t ==19.5||t==19) && bothButtons)||((t ==30.5||t==30) && bothButtons)) {  // > FixedRelations.FixRel Page 2:1
      eightfive ()  // > FixedRelations.FixRel Page 2:2
    }  // > FixedRelations.FixRel Page 2:3
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["bothbuttons"]) return;
    video = document.getElementById("video");  // > FixedRelations.bothbuttons:1
    //vid.videoHeight; // returns the intrinsic height of the video  // > FixedRelations.bothbuttons:2
    //vid.videoWidth; // returns the intrinsic width of the video  // > FixedRelations.bothbuttons:3
    videoActualWidth = video.getBoundingClientRect().width;  // > FixedRelations.bothbuttons:4
    videoActualHeight = video.getBoundingClientRect().height;  // > FixedRelations.bothbuttons:5
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "HtmlView Page", width : null, height : null };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new light_travel_in_straight_line9_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
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
          _view.panel.linkProperty("CSS",  function() { return cssPanel; }, function(_v) { cssPanel = _v; } ); // HtmlView Page linking property 'CSS' for element 'panel'
          _view.video41.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video41'
          _view.video41.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video41'
          _view.video41.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video41'
          _view.video41.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video41'
          _view.video41.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video41'
          _view.video41.linkProperty("Visibility",  function() { return t>=41&&t<42; } ); // HtmlView Page linking property 'Visibility' for element 'video41'
          _view.video41.setAction("OnEnded", function(_data,_info) {
  //end
  t = 41.5 //go to next scene
  //_view.video41.play()
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  //eightfiveLeft = undefined // need to set to undefined to allow re choosing
  //eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video41'
          _view.video41.linkProperty("Display",  function() { return t>=41&&t<42?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video41'
          _view.video40.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video40'
          _view.video40.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video40'
          _view.video40.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video40'
          _view.video40.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video40'
          _view.video40.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video40'
          _view.video40.linkProperty("Visibility",  function() { return t>=40&&t<41; } ); // HtmlView Page linking property 'Visibility' for element 'video40'
          _view.video40.setAction("OnEnded", function(_data,_info) {
  //setTimeout(() => {  console.log("World!"); }, 1000);
  t = 41 //go to next scene
  //_view.video41.play()
  playSelectedVideo("video41")
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  //eightfiveLeft = undefined // need to set to undefined to allow re choosing
  //eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video40'
          _view.video40.linkProperty("Display",  function() { return t>=40&&t<41?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video40'
          _view.video39.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video39'
          _view.video39.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video39'
          _view.video39.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video39'
          _view.video39.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video39'
          _view.video39.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video39'
          _view.video39.linkProperty("Visibility",  function() { return t>=39&&t<40; } ); // HtmlView Page linking property 'Visibility' for element 'video39'
          _view.video39.setAction("OnEnded", function(_data,_info) {
  //setTimeout(() => {  console.log("World!"); }, 1000);
  t = 40 //go to next scene
  //_view.video40.play()
  playSelectedVideo("video40")
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  //eightfiveLeft = undefined // need to set to undefined to allow re choosing
  //eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video39'
          _view.video39.linkProperty("Display",  function() { return t>=39&&t<40?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video39'
          _view.video38.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video38'
          _view.video38.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video38'
          _view.video38.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video38'
          _view.video38.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video38'
          _view.video38.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video38'
          _view.video38.linkProperty("Visibility",  function() { return t>=38&&t<39; } ); // HtmlView Page linking property 'Visibility' for element 'video38'
          _view.video38.setAction("OnEnded", function(_data,_info) {
  t = 39 //go to next scene
  //_view.video39.play()
  playSelectedVideo("video39")
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  //eightfiveLeft = undefined // need to set to undefined to allow re choosing
  //eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video38'
          _view.video38.linkProperty("Display",  function() { return t>=38&&t<39?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video38'
          _view.video37.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video37'
          _view.video37.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video37'
          _view.video37.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video37'
          _view.video37.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video37'
          _view.video37.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video37'
          _view.video37.linkProperty("Visibility",  function() { return t>=37&&t<38; } ); // HtmlView Page linking property 'Visibility' for element 'video37'
          _view.video37.setAction("OnEnded", function(_data,_info) {
  t = 38 //go to next scene
  //_view.video38.play()
  playSelectedVideo("video38")
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  //eightfiveLeft = undefined // need to set to undefined to allow re choosing
  //eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video37'
          _view.video37.linkProperty("Display",  function() { return t>=37&&t<38?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video37'
          _view.video35.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video35'
          _view.video35.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video35'
          _view.video35.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video35'
          _view.video35.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video35'
          _view.video35.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video35'
          _view.video35.linkProperty("Visibility",  function() { return t>=35&&t<36; } ); // HtmlView Page linking property 'Visibility' for element 'video35'
          _view.video35.setAction("OnEnded", function(_data,_info) {
  t = 37 //go to next scene
  //_view.video37.play()
  playSelectedVideo("video37")
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  //eightfiveLeft = undefined // need to set to undefined to allow re choosing
  //eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video35'
          _view.video35.linkProperty("Display",  function() { return t>=35&&t<36?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video35'
          _view.video34.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video34'
          _view.video34.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video34'
          _view.video34.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video34'
          _view.video34.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video34'
          _view.video34.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video34'
          _view.video34.linkProperty("Visibility",  function() { return t>=34&&t<35; } ); // HtmlView Page linking property 'Visibility' for element 'video34'
          _view.video34.setAction("OnEnded", function(_data,_info) {
  //t = 8.5
  //return to choice video again
  //alert("from video 10")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  shapeLineWidthL1 = 0
  shapeLineWidthL2 = 0
  shapeLineWidthR1 = 0
  shapeLineWidthR2 = 0;

}); // HtmlView Page setting action 'OnEnded' for element 'video34'
          _view.video34.linkProperty("Display",  function() { return t>=34&&t<35?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video34'
          _view.video33.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video33'
          _view.video33.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video33'
          _view.video33.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video33'
          _view.video33.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video33'
          _view.video33.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video33'
          _view.video33.linkProperty("Visibility",  function() { return t>=33&&t<34; } ); // HtmlView Page linking property 'Visibility' for element 'video33'
          _view.video33.setAction("OnEnded", function(_data,_info) {
  t =34
  playSelectedVideo("video34")
  //_view.video34.play()
  //t = 30.5
  //return to choice video again
  //alert("from video 20")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video33'
          _view.video33.linkProperty("Display",  function() { return t>=33&&t<34?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video33'
          _view.video32.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video32'
          _view.video32.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video32'
          _view.video32.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video32'
          _view.video32.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video32'
          _view.video32.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video32'
          _view.video32.linkProperty("Visibility",  function() { return t>=32&&t<33; } ); // HtmlView Page linking property 'Visibility' for element 'video32'
          _view.video32.setAction("OnEnded", function(_data,_info) {
  t =34
  playSelectedVideo("video34")
  //_view.video34.play()
  //t = 30.5
  //return to choice video again
  //alert("from video 20")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video32'
          _view.video32.linkProperty("Display",  function() { return t>=32&&t<33?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video32'
          _view.video31.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video31'
          _view.video31.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video31'
          _view.video31.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video31'
          _view.video31.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video31'
          _view.video31.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video31'
          _view.video31.linkProperty("Visibility",  function() { return t>=31&&t<32; } ); // HtmlView Page linking property 'Visibility' for element 'video31'
          _view.video31.setAction("OnEnded", function(_data,_info) {
  t =34
  playSelectedVideo("video34")
  //_view.video34.play()
  //t = 30.5
  //return to choice video again
  //alert("from video 20")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video31'
          _view.video31.linkProperty("Display",  function() { return t>=31&&t<32?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video31'
          _view.video30.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video30'
          _view.video30.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video30'
          _view.video30.setAction("OnPlay", function(_data,_info) {
  // set up third board yynn options
   shapeYesLeftX = 0
   shapeYesLeftY= 2.4
   shapeNoLeftX = 0
   shapeNoLeftY= 1.6
   shapeYesRightX = 4.5
   shapeYesRightY= 2.4
   shapeNoRightX = 4.5
   shapeNoRightY= 1.6;

}); // HtmlView Page setting action 'OnPlay' for element 'video30'
          _view.video30.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video30'
          _view.video30.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video30'
          _view.video30.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video30'
          _view.video30.linkProperty("Visibility",  function() { return t>=30&&t<31; } ); // HtmlView Page linking property 'Visibility' for element 'video30'
          _view.video30.setAction("OnEnded", function(_data,_info) {
  // video missing 16 so need to add 2
    t = 30.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video30'
          _view.video30.linkProperty("Display",  function() { return t>=30&&t<31?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video30'
          _view.video29.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video29'
          _view.video29.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video29'
          _view.video29.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video29'
          _view.video29.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video29'
          _view.video29.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video29'
          _view.video29.linkProperty("Visibility",  function() { return t>=29&&t<30; } ); // HtmlView Page linking property 'Visibility' for element 'video29'
          _view.video29.setAction("OnEnded", function(_data,_info) {
  // video missing 16 so need to add 2
    t = 29.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video29'
          _view.video29.linkProperty("Display",  function() { return t>=29&&t<30?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video29'
          _view.video28.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video28'
          _view.video28.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video28'
          _view.video28.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video28'
          _view.video28.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video28'
          _view.video28.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video28'
          _view.video28.linkProperty("Visibility",  function() { return t>=28&&t<29; } ); // HtmlView Page linking property 'Visibility' for element 'video28'
          _view.video28.setAction("OnEnded", function(_data,_info) {
  // video missing 16 so need to add 2
    t = 29
    playSelectedVideo("video29")
    //_view.video29.play();

}); // HtmlView Page setting action 'OnEnded' for element 'video28'
          _view.video28.linkProperty("Display",  function() { return t>=28&&t<29?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video28'
          _view.video26.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video26'
          _view.video26.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video26'
          _view.video26.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video26'
          _view.video26.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video26'
          _view.video26.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video26'
          _view.video26.linkProperty("Visibility",  function() { return t>=26&&t<27; } ); // HtmlView Page linking property 'Visibility' for element 'video26'
          _view.video26.setAction("OnEnded", function(_data,_info) {
  // video missing 16 so need to add 2
    t = 28
    playSelectedVideo("video28")
    //_view.video28.play();

}); // HtmlView Page setting action 'OnEnded' for element 'video26'
          _view.video26.linkProperty("Display",  function() { return t>=26&&t<27?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video26'
          _view.video25.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video25'
          _view.video25.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video25'
          _view.video25.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video25'
          _view.video25.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video25'
          _view.video25.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video25'
          _view.video25.linkProperty("Visibility",  function() { return t>=25&&t<26; } ); // HtmlView Page linking property 'Visibility' for element 'video25'
          _view.video25.setAction("OnEnded", function(_data,_info) {
  // video missing 16 so need to add 2
    t = 25.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video25'
          _view.video25.linkProperty("Display",  function() { return t>=25&&t<26?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video25'
          _view.video24.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video24'
          _view.video24.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video24'
          _view.video24.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video24'
          _view.video24.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video24'
          _view.video24.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video24'
          _view.video24.linkProperty("Visibility",  function() { return t>=24&&t<25; } ); // HtmlView Page linking property 'Visibility' for element 'video24'
          _view.video24.setAction("OnEnded", function(_data,_info) {
  t = 24.5 //go to next scene
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  //eightfiveLeft = undefined // need to set to undefined to allow re choosing
  //eightfiveRight = undefined
  //t =19.5
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  //alert("t=19.5");

}); // HtmlView Page setting action 'OnEnded' for element 'video24'
          _view.video24.linkProperty("Display",  function() { return t>=24&&t<25?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video24'
          _view.video23.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video23'
          _view.video23.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video23'
          _view.video23.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video23'
          _view.video23.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video23'
          _view.video23.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video23'
          _view.video23.linkProperty("Visibility",  function() { return t>=23&&t<24; } ); // HtmlView Page linking property 'Visibility' for element 'video23'
          _view.video23.setAction("OnEnded", function(_data,_info) {
  //t = 8.5
  //return to choice video again
  //alert("from video 10")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  shapeLineWidthL1 = 0
  shapeLineWidthL2 = 0
  shapeLineWidthR1 = 0
  shapeLineWidthR2 = 0;

}); // HtmlView Page setting action 'OnEnded' for element 'video23'
          _view.video23.linkProperty("Display",  function() { return t>=23&&t<24?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video23'
          _view.video22.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video22'
          _view.video22.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video22'
          _view.video22.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video22'
          _view.video22.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video22'
          _view.video22.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video22'
          _view.video22.linkProperty("Visibility",  function() { return t>=22&&t<23; } ); // HtmlView Page linking property 'Visibility' for element 'video22'
          _view.video22.setAction("OnEnded", function(_data,_info) {
  t =23
  playSelectedVideo("video23")
  //_view.video23.play()
  //t = 19.5
  //return to choice video again
  //alert("from video 22")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video22'
          _view.video22.linkProperty("Display",  function() { return t>=22&&t<23?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video22'
          _view.video21.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video21'
          _view.video21.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video21'
          _view.video21.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video21'
          _view.video21.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video21'
          _view.video21.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video21'
          _view.video21.linkProperty("Visibility",  function() { return t>=21&&t<22; } ); // HtmlView Page linking property 'Visibility' for element 'video21'
          _view.video21.setAction("OnEnded", function(_data,_info) {
  t =23
  playSelectedVideo("video23")
  //_view.video23.play()
  //t = 19.5
  //return to choice video again
  //alert("from video 21")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video21'
          _view.video21.linkProperty("Display",  function() { return t>=21&&t<22?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video21'
          _view.video20.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video20'
          _view.video20.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video20'
          _view.video20.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video20'
          _view.video20.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video20'
          _view.video20.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video20'
          _view.video20.linkProperty("Visibility",  function() { return t>=20&&t<21; } ); // HtmlView Page linking property 'Visibility' for element 'video20'
          _view.video20.setAction("OnEnded", function(_data,_info) {
  t =23
  playSelectedVideo("video23")
  //_view.video23.play() 
  //t = 19.5
  //return to choice video again
  //alert("from video 20")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video20'
          _view.video20.linkProperty("Display",  function() { return t>=20&&t<21?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video20'
          _view.video19.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video19'
          _view.video19.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video19'
          _view.video19.setAction("OnPlay", function(_data,_info) {
  // put here to enable faster clicks of yynn  
   // set up second board yynn options
   shapeYesLeftX = 0
   shapeYesLeftY= 4.4
   shapeNoLeftX = 0
   shapeNoLeftY= 3.6
   shapeYesRightX = 4.5
   shapeYesRightY= 4.4
   shapeNoRightX = 4.5
   shapeNoRightY= 3.6;

}); // HtmlView Page setting action 'OnPlay' for element 'video19'
          _view.video19.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video19'
          _view.video19.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video19'
          _view.video19.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video19'
          _view.video19.linkProperty("Visibility",  function() { return t>=19&&t<20; } ); // HtmlView Page linking property 'Visibility' for element 'video19'
          _view.video19.setAction("OnEnded", function(_data,_info) {
  t = 19.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video19'
          _view.video19.linkProperty("Display",  function() { return t>=19&&t<20?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video19'
          _view.video18.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video18'
          _view.video18.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video18'
          _view.video18.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video18'
          _view.video18.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video18'
          _view.video18.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video18'
          _view.video18.linkProperty("Visibility",  function() { return t>=18&&t<19; } ); // HtmlView Page linking property 'Visibility' for element 'video18'
          _view.video18.setAction("OnEnded", function(_data,_info) {
  t = t +0.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video18'
          _view.video18.linkProperty("Display",  function() { return t>=18&&t<19?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video18'
          _view.video17.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video17'
          _view.video17.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video17'
          _view.video17.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video17'
          _view.video17.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video17'
          _view.video17.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video17'
          _view.video17.linkProperty("Visibility",  function() { return t>=17&&t<18; } ); // HtmlView Page linking property 'Visibility' for element 'video17'
          _view.video17.setAction("OnEnded", function(_data,_info) {
  t = 18
    playSelectedVideo("video18")
   // _view.video18.play();

}); // HtmlView Page setting action 'OnEnded' for element 'video17'
          _view.video17.linkProperty("Display",  function() { return t>=17&&t<18?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video17'
          _view.video15.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video15'
          _view.video15.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video15'
          _view.video15.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video15'
          _view.video15.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video15'
          _view.video15.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video15'
          _view.video15.linkProperty("Visibility",  function() { return t>=15&&t<16; } ); // HtmlView Page linking property 'Visibility' for element 'video15'
          _view.video15.setAction("OnEnded", function(_data,_info) {
  // video missing 16 so need to add 2
    t = 17
    playSelectedVideo("video17")
    //_view.video17.play();

}); // HtmlView Page setting action 'OnEnded' for element 'video15'
          _view.video15.linkProperty("Display",  function() { return t>=15&&t<16?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video15'
          _view.video14.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video14'
          _view.video14.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video14'
          _view.video14.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video14'
          _view.video14.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video14'
          _view.video14.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video14'
          _view.video14.linkProperty("Visibility",  function() { return t>=14&&t<15; } ); // HtmlView Page linking property 'Visibility' for element 'video14'
          _view.video14.setAction("OnEnded", function(_data,_info) {
  t = 14.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video14'
          _view.video14.linkProperty("Display",  function() { return t>=14&&t<15?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video14'
          _view.video13.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video13'
          _view.video13.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video13'
          _view.video13.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video13'
          _view.video13.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video13'
          _view.video13.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video13'
          _view.video13.linkProperty("Visibility",  function() { return t>=13&&t<14; } ); // HtmlView Page linking property 'Visibility' for element 'video13'
          _view.video13.setAction("OnEnded", function(_data,_info) {
  t = 13.5 //go to next scene
  //return to choice video again
  //alert("click Next at the top right corner")
  //_tools.showOkDialog("Click 'Next' at the top right corner");
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined;

}); // HtmlView Page setting action 'OnEnded' for element 'video13'
          _view.video13.linkProperty("Display",  function() { return t>=13&&t<14?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video13'
          _view.video12.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video12'
          _view.video12.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video12'
          _view.video12.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video12'
          _view.video12.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video12'
          _view.video12.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video12'
          _view.video12.linkProperty("Visibility",  function() { return t>=12&&t<13; } ); // HtmlView Page linking property 'Visibility' for element 'video12'
          _view.video12.setAction("OnEnded", function(_data,_info) {
  //t = 8.5
  //return to choice video again
  //alert("from video 10")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  shapeLineWidthL1 = 0
  shapeLineWidthL2 = 0
  shapeLineWidthR1 = 0
  shapeLineWidthR2 = 0;

}); // HtmlView Page setting action 'OnEnded' for element 'video12'
          _view.video12.linkProperty("Display",  function() { return t>=12&&t<13?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video12'
          _view.video11.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video11'
          _view.video11.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video11'
          _view.video11.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video11'
          _view.video11.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video11'
          _view.video11.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video11'
          _view.video11.linkProperty("Visibility",  function() { return t>=11&&t<12; } ); // HtmlView Page linking property 'Visibility' for element 'video11'
          _view.video11.setAction("OnEnded", function(_data,_info) {
  t =12
  //_view.video12.play() 
  playSelectedVideo("video12")
  //t = 8.5
  //return to choice video again
  //alert("from video 11")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  shapeLineWidthL1 = 0
  shapeLineWidthL2 = 0
  shapeLineWidthR1 = 0
  shapeLineWidthR2 = 0;

}); // HtmlView Page setting action 'OnEnded' for element 'video11'
          _view.video11.linkProperty("Display",  function() { return t>=11&&t<12?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video11'
          _view.video10.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video10'
          _view.video10.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video10'
          _view.video10.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video10'
          _view.video10.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video10'
          _view.video10.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video10'
          _view.video10.linkProperty("Visibility",  function() { return t>=10&&t<11; } ); // HtmlView Page linking property 'Visibility' for element 'video10'
          _view.video10.setAction("OnEnded", function(_data,_info) {
  t =12
  playSelectedVideo("video12")
  //_view.video12.play() 
  //t = 8.5
  //return to choice video again
  //alert("from video 10")
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  shapeLineWidthL1 = 0
  shapeLineWidthL2 = 0
  shapeLineWidthR1 = 0
  shapeLineWidthR2 = 0;

}); // HtmlView Page setting action 'OnEnded' for element 'video10'
          _view.video10.linkProperty("Display",  function() { return t>=10&&t<11?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video10'
          _view.video9.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video9'
          _view.video9.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video9'
          _view.video9.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video9'
          _view.video9.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video9'
          _view.video9.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video9'
          _view.video9.linkProperty("Visibility",  function() { return t>=9&&t<10; } ); // HtmlView Page linking property 'Visibility' for element 'video9'
          _view.video9.setAction("OnEnded", function(_data,_info) {
  t =12
  playSelectedVideo("video12")
  //_view.video12.play() 
  //alert("from video 9")
  //t =12
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  shapeLineWidthL1 = 0
  shapeLineWidthL2 = 0
  shapeLineWidthR1 = 0
  shapeLineWidthR2 = 0
  //alert("t=8.5");

}); // HtmlView Page setting action 'OnEnded' for element 'video9'
          _view.video9.linkProperty("Display",  function() { return t>=9&&t<10?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video9'
          _view.video8.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video8'
          _view.video8.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video8'
          _view.video8.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video8'
          _view.video8.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video8'
          _view.video8.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video8'
          _view.video8.linkProperty("Visibility",  function() { return t>=8&&t<9; } ); // HtmlView Page linking property 'Visibility' for element 'video8'
          _view.video8.setAction("OnEnded", function(_data,_info) {
  t =8.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video8'
          _view.video8.linkProperty("Display",  function() { return t>=8&&t<9?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video8'
          _view.video7.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video7'
          _view.video7.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video7'
          _view.video7.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video7'
          _view.video7.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video7'
          _view.video7.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video7'
          _view.video7.linkProperty("Visibility",  function() { return t>=7&&t<8; } ); // HtmlView Page linking property 'Visibility' for element 'video7'
          _view.video7.setAction("OnEnded", function(_data,_info) {
  if (t ==3){
    t =3.5
    
    }
    else if (t ==7){
    t =7.5
    
    }
  else {
  t = t +1
  //alert("click to move on")
  }

}); // HtmlView Page setting action 'OnEnded' for element 'video7'
          _view.video7.linkProperty("Display",  function() { return t>=7&&t<8?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video7'
          _view.video6.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video6'
          _view.video6.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video6'
          _view.video6.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video6'
          _view.video6.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video6'
          _view.video6.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video6'
          _view.video6.linkProperty("Visibility",  function() { return Math.floor(t) === 6; } ); // HtmlView Page linking property 'Visibility' for element 'video6'
          _view.video6.setAction("OnEnded", function(_data,_info) {
  t = t +1
  //_view.video7.play()
  playSelectedVideo("video7")
  //alert("click to move on");

}); // HtmlView Page setting action 'OnEnded' for element 'video6'
          _view.video6.linkProperty("Display",  function() { return Math.floor(t) === 6?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video6'
          _view.video4.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video4'
          _view.video4.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video4'
          _view.video4.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video4'
          _view.video4.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video4'
          _view.video4.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video4'
          _view.video4.linkProperty("Visibility",  function() { return Math.floor(t) === 4; } ); // HtmlView Page linking property 'Visibility' for element 'video4'
          _view.video4.setAction("OnEnded", function(_data,_info) {
  t = 6; // skip as no video 5
  playSelectedVideo("video6");

}); // HtmlView Page setting action 'OnEnded' for element 'video4'
          _view.video4.linkProperty("Display",  function() { return Math.floor(t) === 4?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video4'
          _view.video3.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video3'
          _view.video3.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video3'
          _view.video3.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video3'
          _view.video3.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video3'
          _view.video3.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video3'
          _view.video3.linkProperty("Visibility",  function() { return Math.floor(t) === 3; } ); // HtmlView Page linking property 'Visibility' for element 'video3'
          _view.video3.setAction("OnEnded", function(_data,_info) {
  if (t ==3){
    t =3.5
    
   }

}); // HtmlView Page setting action 'OnEnded' for element 'video3'
          _view.video3.linkProperty("Display",  function() { return Math.floor(t) === 3?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video3'
          _view.video2.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video2'
          _view.video2.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video2'
          _view.video2.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video2'
          _view.video2.setAction("OnLoadedData", function(_data,_info) {
  //_view.video.setCurrentTime(0);

}); // HtmlView Page setting action 'OnLoadedData' for element 'video2'
          _view.video2.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video2'
          _view.video2.linkProperty("Visibility",  function() { return Math.floor(t) === 2; } ); // HtmlView Page linking property 'Visibility' for element 'video2'
          _view.video2.setAction("OnEnded", function(_data,_info) {
  t = 2.5;

}); // HtmlView Page setting action 'OnEnded' for element 'video2'
          _view.video2.linkProperty("Display",  function() { return Math.floor(t) === 2?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video2'
          _view.video1.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'video1'
          _view.video1.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'video1'
          _view.video1.setAction("OnPlay", function(_data,_info) {
  if (t !== 1) {
    _view.video1.pause();
  }

}); // HtmlView Page setting action 'OnPlay' for element 'video1'
          _view.video1.linkProperty("CSS",  function() { return css; }, function(_v) { css = _v; } ); // HtmlView Page linking property 'CSS' for element 'video1'
          _view.video1.linkProperty("Controls",  function() { return control; }, function(_v) { control = _v; } ); // HtmlView Page linking property 'Controls' for element 'video1'
          _view.video1.linkProperty("Visibility",  function() { return t==1; } ); // HtmlView Page linking property 'Visibility' for element 'video1'
          _view.video1.setAction("OnEnded", function(_data,_info) {
  t = 2
  //alert("click the Play button of the video player on the bottom left to move on.")
  playSelectedVideo("video2")
  //_view.video2.play();

}); // HtmlView Page setting action 'OnEnded' for element 'video1'
          _view.video1.linkProperty("Display",  function() { return t==1?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'video1'
          _view.panel2.linkProperty("CSS",  function() { return cssPanelAndy; }, function(_v) { cssPanelAndy = _v; } ); // HtmlView Page linking property 'CSS' for element 'panel2'
          _view.plottingPanel.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  //toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnResize", function(_data,_info) {
  Width=Math.min(window.innerWidth,window.innerHeight*4/3*0.9)
  Height=Width*3/4
  _view._update();

}); // HtmlView Page setting action 'OnResize' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  //var position = _view.plottingPanel.getInteraction().getInteractionPoint();
  // for mobile
  if (t==1){
    _view.video1.play(); // to force video play
    }

}); // HtmlView Page setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnOrientationChange", function(_data,_info) {
  Width=Math.min(window.innerWidth,window.innerHeight*4/3*0.9)
  Height=Width*3/4
  _view._update();

}); // HtmlView Page setting action 'OnOrientationChange' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("CSS",  function() { return cssPanel; }, function(_v) { cssPanel = _v; } ); // HtmlView Page linking property 'CSS' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnMove", function(_data,_info) {
  if (t==1||firsttime){
   
   _view.video1.play(); // to force video play
   firsttime=false
   }

}); // HtmlView Page setting action 'OnMove' for element 'plottingPanel'
          _view.shape_t_2clickthesetup.linkProperty("Visibility",  function() { return t < 3; } ); // HtmlView Page linking property 'Visibility' for element 'shape_t_2clickthesetup'
          _view.shape_t_2clickthesetup.setAction("OnPress", function(_data,_info) {
  // put here to catch student need to click incase he didnt wait for video to video
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  t = 3
  //_view.video1.pause() // need to intro pause to support advance clicking
  //_view.video2.pause() // need to intro pause to support advance clicking
  //_view.video3.play()
  playSelectedVideo("video3");

}); // HtmlView Page setting action 'OnPress' for element 'shape_t_2clickthesetup'
          _view.target3_5.linkProperty("SizeX",  function() { return target[1]-target[0]; } ); // HtmlView Page linking property 'SizeX' for element 'target3_5'
          _view.target3_5.linkProperty("SizeY",  function() { return target[3]-target[2]; } ); // HtmlView Page linking property 'SizeY' for element 'target3_5'
          _view.image3_5_Board_Option.setAction("OnRelease", function(_data,_info) {
  /*
  if (squareBoardX >= target[0] && squareBoardX <= target[1] && squareBoardY >= target[2] && squareBoardY <= target[3]) {
    // move on the next scene
    t = 4; 
    playSelectedVideo("video4");
  }
  */;

}); // HtmlView Page setting action 'OnRelease' for element 'image3_5_Board_Option'
          _view.image3_5_Board_Option.linkProperty("X",  function() { return squareBoardX; }, function(_v) { squareBoardX = _v; } ); // HtmlView Page linking property 'X' for element 'image3_5_Board_Option'
          _view.image3_5_Board_Option.linkProperty("Y",  function() { return squareBoardY; }, function(_v) { squareBoardY = _v; } ); // HtmlView Page linking property 'Y' for element 'image3_5_Board_Option'
          _view.image3_5_Board_Option.linkProperty("Visibility",  function() { return Math.floor(t) === 3; } ); // HtmlView Page linking property 'Visibility' for element 'image3_5_Board_Option'
          _view.image3_5_Board_Option.setAction("OnDrag", function(_data,_info) {
  //iOS cannot use onDrag for video
  if (!triggered35&&squareBoardX >= target[0] && squareBoardX <= target[1] && squareBoardY >= target[2] && squareBoardY <= target[3]) {
    // move on the next scene
    t = 4; 
    playSelectedVideo("video4");
    triggered35=true
  }

}); // HtmlView Page setting action 'OnDrag' for element 'image3_5_Board_Option'
          _view.image7_5_Record.linkProperty("Visibility",  function() { return t==7.5||t==7||t==12.5||t==12; } ); // HtmlView Page linking property 'Visibility' for element 'image7_5_Record'
          _view.image7_5_Record.setAction("OnPress", function(_data,_info) {
  t =8;
  //_view.video7.pause() // need to intro pause to support advance clicking
  //_view.video8.play()
  playSelectedVideo("video8");

}); // HtmlView Page setting action 'OnPress' for element 'image7_5_Record'
          _view.thumbup.linkProperty("X",  function() { return shapeYesLeftX-1; } ); // HtmlView Page linking property 'X' for element 'thumbup'
          _view.thumbup.linkProperty("Y",  function() { return shapeYesLeftY; }, function(_v) { shapeYesLeftY = _v; } ); // HtmlView Page linking property 'Y' for element 'thumbup'
          _view.thumbup.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30)&&eightfiveLeft&&FirstTry; } ); // HtmlView Page linking property 'Visibility' for element 'thumbup'
          _view.shape8_5Yes.linkProperty("FillColor",  function() { return shapeFillColorL1; }, function(_v) { shapeFillColorL1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shape8_5Yes'
          _view.shape8_5Yes.setAction("OnExit", function(_data,_info) {
  //checkbothButtons();

}); // HtmlView Page setting action 'OnExit' for element 'shape8_5Yes'
          _view.shape8_5Yes.setAction("OnRelease", function(_data,_info) {
  checkbothButtons();

}); // HtmlView Page setting action 'OnRelease' for element 'shape8_5Yes'
          _view.shape8_5Yes.linkProperty("X",  function() { return shapeYesLeftX; }, function(_v) { shapeYesLeftX = _v; } ); // HtmlView Page linking property 'X' for element 'shape8_5Yes'
          _view.shape8_5Yes.linkProperty("Y",  function() { return shapeYesLeftY; }, function(_v) { shapeYesLeftY = _v; } ); // HtmlView Page linking property 'Y' for element 'shape8_5Yes'
          _view.shape8_5Yes.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30); } ); // HtmlView Page linking property 'Visibility' for element 'shape8_5Yes'
          _view.shape8_5Yes.setAction("OnPress", function(_data,_info) {
  //alert("Yes")
  //shapeLineWidthL1 = 5
  eightfiveLeft = true
  FirstTry = true;

}); // HtmlView Page setting action 'OnPress' for element 'shape8_5Yes'
          _view.shape8_5Yes.linkProperty("LineWidth",  function() { return shapeLineWidthL1; }, function(_v) { shapeLineWidthL1 = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'shape8_5Yes'
          _view.thumbup2.linkProperty("X",  function() { return shapeNoLeftX-1; } ); // HtmlView Page linking property 'X' for element 'thumbup2'
          _view.thumbup2.linkProperty("Y",  function() { return shapeNoLeftY; }, function(_v) { shapeNoLeftY = _v; } ); // HtmlView Page linking property 'Y' for element 'thumbup2'
          _view.thumbup2.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30)&&eightfiveLeft==false&&FirstTry; } ); // HtmlView Page linking property 'Visibility' for element 'thumbup2'
          _view.shape8_5No.linkProperty("FillColor",  function() { return shapeFillColorL2; }, function(_v) { shapeFillColorL2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shape8_5No'
          _view.shape8_5No.setAction("OnExit", function(_data,_info) {
  //checkbothButtons();

}); // HtmlView Page setting action 'OnExit' for element 'shape8_5No'
          _view.shape8_5No.setAction("OnRelease", function(_data,_info) {
  checkbothButtons();

}); // HtmlView Page setting action 'OnRelease' for element 'shape8_5No'
          _view.shape8_5No.linkProperty("X",  function() { return shapeNoLeftX; }, function(_v) { shapeNoLeftX = _v; } ); // HtmlView Page linking property 'X' for element 'shape8_5No'
          _view.shape8_5No.linkProperty("Y",  function() { return shapeNoLeftY; }, function(_v) { shapeNoLeftY = _v; } ); // HtmlView Page linking property 'Y' for element 'shape8_5No'
          _view.shape8_5No.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30); } ); // HtmlView Page linking property 'Visibility' for element 'shape8_5No'
          _view.shape8_5No.setAction("OnPress", function(_data,_info) {
  //alert("No")
  //shapeLineWidthL2 = 5
  eightfiveLeft = false
  FirstTry = true;

}); // HtmlView Page setting action 'OnPress' for element 'shape8_5No'
          _view.shape8_5No.linkProperty("LineWidth",  function() { return shapeLineWidthL2; }, function(_v) { shapeLineWidthL2 = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'shape8_5No'
          _view.thumbup3.linkProperty("X",  function() { return shapeYesRightX-1; } ); // HtmlView Page linking property 'X' for element 'thumbup3'
          _view.thumbup3.linkProperty("Y",  function() { return shapeYesRightY; }, function(_v) { shapeYesRightY = _v; } ); // HtmlView Page linking property 'Y' for element 'thumbup3'
          _view.thumbup3.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30)&&eightfiveRight&&FirstTry; } ); // HtmlView Page linking property 'Visibility' for element 'thumbup3'
          _view.shape8_5Yes2.linkProperty("FillColor",  function() { return shapeFillColorR1; }, function(_v) { shapeFillColorR1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shape8_5Yes2'
          _view.shape8_5Yes2.setAction("OnExit", function(_data,_info) {
  //checkbothButtons();

}); // HtmlView Page setting action 'OnExit' for element 'shape8_5Yes2'
          _view.shape8_5Yes2.setAction("OnRelease", function(_data,_info) {
  checkbothButtons();

}); // HtmlView Page setting action 'OnRelease' for element 'shape8_5Yes2'
          _view.shape8_5Yes2.linkProperty("X",  function() { return shapeYesRightX; }, function(_v) { shapeYesRightX = _v; } ); // HtmlView Page linking property 'X' for element 'shape8_5Yes2'
          _view.shape8_5Yes2.linkProperty("Y",  function() { return shapeYesRightY; }, function(_v) { shapeYesRightY = _v; } ); // HtmlView Page linking property 'Y' for element 'shape8_5Yes2'
          _view.shape8_5Yes2.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30); } ); // HtmlView Page linking property 'Visibility' for element 'shape8_5Yes2'
          _view.shape8_5Yes2.setAction("OnPress", function(_data,_info) {
  //alert("Yes")
  //shapeLineWidthR1 = 5
  eightfiveRight = true
  FirstTry = true;

}); // HtmlView Page setting action 'OnPress' for element 'shape8_5Yes2'
          _view.shape8_5Yes2.linkProperty("LineWidth",  function() { return shapeLineWidthR1; }, function(_v) { shapeLineWidthR1 = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'shape8_5Yes2'
          _view.thumbup32.linkProperty("X",  function() { return shapeNoRightX-1; } ); // HtmlView Page linking property 'X' for element 'thumbup32'
          _view.thumbup32.linkProperty("Y",  function() { return shapeNoRightY; }, function(_v) { shapeNoRightY = _v; } ); // HtmlView Page linking property 'Y' for element 'thumbup32'
          _view.thumbup32.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30)&&eightfiveRight==false&&FirstTry; } ); // HtmlView Page linking property 'Visibility' for element 'thumbup32'
          _view.shape8_5No2.linkProperty("FillColor",  function() { return shapeFillColorR2; }, function(_v) { shapeFillColorR2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shape8_5No2'
          _view.shape8_5No2.setAction("OnExit", function(_data,_info) {
  //checkbothButtons();

}); // HtmlView Page setting action 'OnExit' for element 'shape8_5No2'
          _view.shape8_5No2.setAction("OnRelease", function(_data,_info) {
  checkbothButtons();

}); // HtmlView Page setting action 'OnRelease' for element 'shape8_5No2'
          _view.shape8_5No2.linkProperty("X",  function() { return shapeNoRightX; }, function(_v) { shapeNoRightX = _v; } ); // HtmlView Page linking property 'X' for element 'shape8_5No2'
          _view.shape8_5No2.linkProperty("Y",  function() { return shapeNoRightY; }, function(_v) { shapeNoRightY = _v; } ); // HtmlView Page linking property 'Y' for element 'shape8_5No2'
          _view.shape8_5No2.linkProperty("Visibility",  function() { return (t==8.5||t==8||t==19.5||t==19||t==30.5||t==30); } ); // HtmlView Page linking property 'Visibility' for element 'shape8_5No2'
          _view.shape8_5No2.setAction("OnPress", function(_data,_info) {
  //alert("No")
  //shapeLineWidthR2 = 5
  eightfiveRight = false
  FirstTry = true;

}); // HtmlView Page setting action 'OnPress' for element 'shape8_5No2'
          _view.shape8_5No2.linkProperty("LineWidth",  function() { return shapeLineWidthR2; }, function(_v) { shapeLineWidthR2 = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'shape8_5No2'
          _view.image12_Return.linkProperty("Visibility",  function() { return t==9||t==10||t==11||t==12; } ); // HtmlView Page linking property 'Visibility' for element 'image12_Return'
          _view.image12_Return.setAction("OnPress", function(_data,_info) {
  t =8;
  /*
  _view.video7.pause() 
  _view.video9.pause() 
  _view.video10.pause() 
  _view.video11.pause() 
  _view.video12.pause() // there could be serveral paths so just to pause
  _view.video8.play()
  */
  playSelectedVideo("video8");

}); // HtmlView Page setting action 'OnPress' for element 'image12_Return'
          _view.image13_5_Next.linkProperty("Visibility",  function() { return t==13||t==13.5||t==24.5||t==24; } ); // HtmlView Page linking property 'Visibility' for element 'image13_5_Next'
          _view.image13_5_Next.setAction("OnPress", function(_data,_info) {
  // put here to catch student need to click incase he didnt wait for video to video
  eightfiveLeft = undefined // need to set to undefined to allow re choosing
  eightfiveRight = undefined
  if (t==13.5||t==13){
    t =14;
   //_view.video13.pause() 
  //_view.video14.play()
  playSelectedVideo("video14")
  }
  else if (t==24.5||t==24){
    t =25;
   // _view.video24.pause() 
   // _view.video25.play()
    playSelectedVideo("video25")
    }

}); // HtmlView Page setting action 'OnPress' for element 'image13_5_Next'
          _view.image14_5_Board2.linkProperty("X",  function() { return squareBoardX2; }, function(_v) { squareBoardX2 = _v; } ); // HtmlView Page linking property 'X' for element 'image14_5_Board2'
          _view.image14_5_Board2.linkProperty("Y",  function() { return squareBoardY2; }, function(_v) { squareBoardY2 = _v; } ); // HtmlView Page linking property 'Y' for element 'image14_5_Board2'
          _view.image14_5_Board2.linkProperty("Visibility",  function() { return t==14.5||t==14; } ); // HtmlView Page linking property 'Visibility' for element 'image14_5_Board2'
          _view.image14_5_Board2.setAction("OnDrag", function(_data,_info) {
  //squareBoardX2 = Math.round(squareBoardX2)
  //squareBoardY2 = Math.round(squareBoardY2)
  //if (squareBoardX2 == 0 &&squareBoardY2== 4){
     if (triggered145==false&&squareBoardX2 >= target[0] &&squareBoardX2 <= target[1]&&squareBoardY2>=target[2]&&squareBoardY2<= target[3]){
       // move on the next scene
    t =15;
    //_view.video14.pause() 
   // _view.video15.play()
    playSelectedVideo("video15")
    triggered145=true
    }

}); // HtmlView Page setting action 'OnDrag' for element 'image14_5_Board2'
          _view.image18_5_Record.linkProperty("Visibility",  function() { return t==18||t==18.5||t==23; } ); // HtmlView Page linking property 'Visibility' for element 'image18_5_Record'
          _view.image18_5_Record.setAction("OnPress", function(_data,_info) {
  t =19;
  //_view.video18.pause() 
  //_view.video19.play()
   playSelectedVideo("video19");

}); // HtmlView Page setting action 'OnPress' for element 'image18_5_Record'
          _view.image25_5_Board3.linkProperty("X",  function() { return squareBoardX3; }, function(_v) { squareBoardX3 = _v; } ); // HtmlView Page linking property 'X' for element 'image25_5_Board3'
          _view.image25_5_Board3.linkProperty("Y",  function() { return squareBoardY3; }, function(_v) { squareBoardY3 = _v; } ); // HtmlView Page linking property 'Y' for element 'image25_5_Board3'
          _view.image25_5_Board3.linkProperty("Visibility",  function() { return t==25.5||t==25; } ); // HtmlView Page linking property 'Visibility' for element 'image25_5_Board3'
          _view.image25_5_Board3.setAction("OnDrag", function(_data,_info) {
  //squareBoardX3 = Math.round(squareBoardX3)
  //squareBoardY3 = Math.round(squareBoardY3)
  //if (squareBoardX3 == 0 &&squareBoardY3== 4){
     if (triggered255==false&&squareBoardX3 >= target[0] &&squareBoardX3 <= target[1]&&squareBoardY3>= target[2]&&squareBoardY3<=  target[3]){
       // move on the next scene
    t =26;
    
   // _view.video25.pause() 
   // _view.video26.play()
     playSelectedVideo("video26")
     triggered255=true
    }

}); // HtmlView Page setting action 'OnDrag' for element 'image25_5_Board3'
          _view.image29_5_Record.linkProperty("Visibility",  function() { return t==29||t==29.5||t==34; } ); // HtmlView Page linking property 'Visibility' for element 'image29_5_Record'
          _view.image29_5_Record.setAction("OnPress", function(_data,_info) {
  t =30;
  //_view.video29.pause() 
  //_view.video30.play()
  playSelectedVideo("video30");

}); // HtmlView Page setting action 'OnPress' for element 'image29_5_Record'
          _view.image41_5_Home.linkProperty("Visibility",  function() { return t==41||t==41.5; } ); // HtmlView Page linking property 'Visibility' for element 'image41_5_Home'
          _view.image41_5_Home.setAction("OnPress", function(_data,_info) {
  t =1;
  //_view.video41.pause() 
  //_view.video1.play()
  _reset(); // force everything to go back to original states
  playSelectedVideo("video1");

}); // HtmlView Page setting action 'OnPress' for element 'image41_5_Home'
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
          _view.slider.linkProperty("Maximum",  function() { return pi; }, function(_v) { pi = _v; } ); // HtmlView Page linking property 'Maximum' for element 'slider'
          _view.slider.linkProperty("Value",  function() { return theta; }, function(_v) { theta = _v; } ); // HtmlView Page linking property 'Value' for element 'slider'
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
function light_travel_in_straight_line9_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = light_travel_in_straight_line9_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function light_travel_in_straight_line9_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Height","0") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video41", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video41'
      .setProperty("VideoUrl","./public/assets/videos/41-end.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video41'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video40", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video40'
      .setProperty("VideoUrl","./public/assets/videos/40-summary-2.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video40'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video39", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video39'
      .setProperty("VideoUrl","./public/assets/videos/39-summary-1.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video39'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video38", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video38'
      .setProperty("VideoUrl","./public/assets/videos/38-conc-2.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video38'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video37", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video37'
      .setProperty("VideoUrl","./public/assets/videos/37-conc-1.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video37'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video35", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video35'
      .setProperty("VideoUrl","./public/assets/videos/35-part-3-record-no-no.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video35'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video34", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video34'
      .setProperty("VideoUrl","./public/assets/videos/34-part-3-retry.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video34'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video33", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video33'
      .setProperty("VideoUrl","./public/assets/videos/33-part-3-record-no-yes.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video33'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video32", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video32'
      .setProperty("VideoUrl","./public/assets/videos/32-part-3-record-yes-no.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video32'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video31", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video31'
      .setProperty("VideoUrl","./public/assets/videos/31-part-3-record-yes-yes.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video31'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video30", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video30'
      .setProperty("VideoUrl","./public/assets/videos/30-part-3-record.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video30'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video29", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video29'
      .setProperty("VideoUrl","./public/assets/videos/29-part-3-record-intro.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video29'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video28", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video28'
      .setProperty("VideoUrl","./public/assets/videos/28-part-3-result.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video28'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video26", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video26'
      .setProperty("VideoUrl","./public/assets/videos/26-part-3-anim.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video26'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video25", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video25'
      .setProperty("VideoUrl","./public/assets/videos/25-part-3-intro.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video25'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video24", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video24'
      .setProperty("VideoUrl","./public/assets/videos/24-part-2-record-no-no.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video24'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video23", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video23'
      .setProperty("VideoUrl","./public/assets/videos/23-part-2-retry.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video23'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video22", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video22'
      .setProperty("VideoUrl","./public/assets/videos/22-part-2-record-no-yes.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video22'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video21", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video21'
      .setProperty("VideoUrl","./public/assets/videos/21-part-2-record-yes-no.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video21'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video20", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video20'
      .setProperty("VideoUrl","./public/assets/videos/20-part-2-record-yes-yes.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video20'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video19", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video19'
      .setProperty("VideoUrl","./public/assets/videos/19-part-2-record.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video19'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video18", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video18'
      .setProperty("VideoUrl","./public/assets/videos/18-part-2-record-intro.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video18'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video17", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video17'
      .setProperty("VideoUrl","./public/assets/videos/17-part-2-result.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video17'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video15", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video15'
      .setProperty("VideoUrl","./public/assets/videos/15-part-2-anim.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video15'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video14", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video14'
      .setProperty("VideoUrl","./public/assets/videos/14-part-2-intro.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video14'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video13", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video13'
      .setProperty("VideoUrl","./public/assets/videos/13-part-1-record-yes-yes.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video13'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video12", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video12'
      .setProperty("VideoUrl","./public/assets/videos/12-part-1-retry.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video12'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video11", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video11'
      .setProperty("VideoUrl","./public/assets/videos/11-part-1-record-no-yes.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video11'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video10", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video10'
      .setProperty("VideoUrl","./public/assets/videos/10-part-1-record-yes-no.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video10'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video9", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video9'
      .setProperty("VideoUrl","./public/assets/videos/09-part-1-record-no-no.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video9'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video8", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video8'
      .setProperty("VideoUrl","./public/assets/videos/08-part-1-record.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video8'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video7", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video7'
      .setProperty("VideoUrl","./public/assets/videos/07-part-1-record-intro.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video7'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video6", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video6'
      .setProperty("VideoUrl","./public/assets/videos/06-part-1-result.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video6'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video4", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video4'
      .setProperty("VideoUrl","./public/assets/videos/04-part-1-anim.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video4'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video3", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video3'
      .setProperty("VideoUrl","./public/assets/videos/03-part-1-intro.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video3'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video2", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video2'
      .setProperty("VideoUrl","./public/assets/videos/02-begin.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video2'
      ;

    _view._addElement(EJSS_INTERFACE.video,"video1", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'video1'
      .setProperty("VideoUrl","./public/assets/videos/01-intro.mp4") // EJsS HtmlView.HtmlView Page: setting property 'VideoUrl' for element 'video1'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel2'
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

    _view._addElement(EJSS_DRAWING2D.shape,"shape_t_2clickthesetup", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shape_t_2clickthesetup'
      .setProperty("FillColor","rgba(0,0,255,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shape_t_2clickthesetup'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shape_t_2clickthesetup'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape_t_2clickthesetup'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape_t_2clickthesetup'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'shape_t_2clickthesetup'
      .setProperty("Y",2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'shape_t_2clickthesetup'
      .setProperty("SizeY",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape_t_2clickthesetup'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shape_t_2clickthesetup'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape_t_2clickthesetup'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"background_3_5", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'background_3_5'
      .setProperty("SizeX",16) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background_3_5'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background_3_5'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background_3_5'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background_3_5'
      .setProperty("ImageUrl","./public/assets/stills/03-bg.jpg") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'background_3_5'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'background_3_5'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background_3_5'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"target3_5", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'target3_5'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'target3_5'
      .setProperty("X",0.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'target3_5'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'target3_5'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'target3_5'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image3_5_Board_Option", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image3_5_Board_Option'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image3_5_Board_Option'
      .setProperty("SizeX",2.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image3_5_Board_Option'
      .setProperty("ImageUrl","./public/assets/stills/03-opt_1-glow.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'image3_5_Board_Option'
      .setProperty("SizeY",2.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image3_5_Board_Option'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image3_5_Board_Option'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image7_5_Record", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image7_5_Record'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image7_5_Record'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image7_5_Record'
      .setProperty("X",5.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'image7_5_Record'
      .setProperty("Y",7.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'image7_5_Record'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image7_5_Record'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image7_5_Record'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"thumbup", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thumbup'
      .setProperty("Text"," 🖐️") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'thumbup'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape8_5Yes", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shape8_5Yes'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape8_5Yes'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shape8_5Yes'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape8_5Yes'
      .setProperty("SizeY",0.65) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape8_5Yes'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape8_5Yes'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"thumbup2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thumbup2'
      .setProperty("Text"," 🖐️") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'thumbup2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape8_5No", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shape8_5No'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape8_5No'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shape8_5No'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape8_5No'
      .setProperty("SizeY",0.65) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape8_5No'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape8_5No'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"thumbup3", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thumbup3'
      .setProperty("Text"," 🖐️") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'thumbup3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape8_5Yes2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shape8_5Yes2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape8_5Yes2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shape8_5Yes2'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape8_5Yes2'
      .setProperty("SizeY",0.65) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape8_5Yes2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape8_5Yes2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"thumbup32", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thumbup32'
      .setProperty("Text"," 🖐️") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'thumbup32'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape8_5No2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shape8_5No2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape8_5No2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shape8_5No2'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape8_5No2'
      .setProperty("SizeY",0.65) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape8_5No2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape8_5No2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image12_Return", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image12_Return'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image12_Return'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image12_Return'
      .setProperty("X",5.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'image12_Return'
      .setProperty("Y",7.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'image12_Return'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image12_Return'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image12_Return'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image13_5_Next", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image13_5_Next'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image13_5_Next'
      .setProperty("SizeX",3.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image13_5_Next'
      .setProperty("X",6) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'image13_5_Next'
      .setProperty("Y",9.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'image13_5_Next'
      .setProperty("SizeY",3.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image13_5_Next'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image13_5_Next'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image14_5_Board2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image14_5_Board2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image14_5_Board2'
      .setProperty("SizeX",2.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image14_5_Board2'
      .setProperty("ImageUrl","./public/assets/stills/14-opt_2-glow.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'image14_5_Board2'
      .setProperty("SizeY",2.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image14_5_Board2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image14_5_Board2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image18_5_Record", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image18_5_Record'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image18_5_Record'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image18_5_Record'
      .setProperty("X",5.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'image18_5_Record'
      .setProperty("Y",7.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'image18_5_Record'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image18_5_Record'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image18_5_Record'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image25_5_Board3", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image25_5_Board3'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image25_5_Board3'
      .setProperty("SizeX",2.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image25_5_Board3'
      .setProperty("ImageUrl","./public/assets/stills/25-opt_3-glow.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'image25_5_Board3'
      .setProperty("SizeY",2.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image25_5_Board3'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image25_5_Board3'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image29_5_Record", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image29_5_Record'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image29_5_Record'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image29_5_Record'
      .setProperty("X",5.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'image29_5_Record'
      .setProperty("Y",7.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'image29_5_Record'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image29_5_Record'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image29_5_Record'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image41_5_Home", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'image41_5_Home'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'image41_5_Home'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'image41_5_Home'
      .setProperty("X",6) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'image41_5_Home'
      .setProperty("Y",9.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'image41_5_Home'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'image41_5_Home'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'image41_5_Home'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("CSS",{ "position" : "absolute",  "left" : "0px", "top": "92vh"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"time", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'time'
      .setProperty("CSS",{"cursor": "grab"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'time'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'time'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.button,"button", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'button'
      .setProperty("Text","video1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'button'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'slider'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'slider'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'slider'
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
          _model =  new light_travel_in_straight_line9("_topFrame","_ejs_library/",null);
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
