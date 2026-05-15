/* _inputParameters: an object with different values for the model parameters */
function mirror11(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var print; // EjsS Model.Variables.Parameters and constants.print
  var fontb; // EjsS Model.Variables.Parameters and constants.fontb
  var font; // EjsS Model.Variables.Parameters and constants.font
  var xMin; // EjsS Model.Variables.Parameters and constants.xMin
  var xMax; // EjsS Model.Variables.Parameters and constants.xMax
  var yMin; // EjsS Model.Variables.Parameters and constants.yMin
  var yMax; // EjsS Model.Variables.Parameters and constants.yMax
  var r; // EjsS Model.Variables.Parameters and constants.r
  var x1; // EjsS Model.Variables.Parameters and constants.x1
  var y1; // EjsS Model.Variables.Parameters and constants.y1
  var x2; // EjsS Model.Variables.Parameters and constants.x2
  var y2; // EjsS Model.Variables.Parameters and constants.y2
  var xe1; // EjsS Model.Variables.Parameters and constants.xe1
  var ye1; // EjsS Model.Variables.Parameters and constants.ye1
  var vye1; // EjsS Model.Variables.Parameters and constants.vye1
  var xi1; // EjsS Model.Variables.Parameters and constants.xi1
  var yi1; // EjsS Model.Variables.Parameters and constants.yi1
  var c1; // EjsS Model.Variables.Parameters and constants.c1
  var c2; // EjsS Model.Variables.Parameters and constants.c2
  var c3; // EjsS Model.Variables.Parameters and constants.c3
  var c4; // EjsS Model.Variables.Parameters and constants.c4
  var lx; // EjsS Model.Variables.Parameters and constants.lx
  var ly; // EjsS Model.Variables.Parameters and constants.ly
  var xe2; // EjsS Model.Variables.Parameters and constants.xe2
  var ye2; // EjsS Model.Variables.Parameters and constants.ye2
  var width; // EjsS Model.Variables.Parameters and constants.width
  var height; // EjsS Model.Variables.Parameters and constants.height
  var css; // EjsS Model.Variables.Parameters and constants.css
  var r2show; // EjsS Model.Variables.Parameters and constants.r2show
  var r3show; // EjsS Model.Variables.Parameters and constants.r3show
  var bshow; // EjsS Model.Variables.Parameters and constants.bshow

  var anglei; // EjsS Model.Variables.lookang.anglei
  var angleitext; // EjsS Model.Variables.lookang.angleitext
  var angleideg; // EjsS Model.Variables.lookang.angleideg
  var angler; // EjsS Model.Variables.lookang.angler
  var angleshow; // EjsS Model.Variables.lookang.angleshow
  var pi; // EjsS Model.Variables.lookang.pi
  var anglerdeg; // EjsS Model.Variables.lookang.anglerdeg
  var anglertext; // EjsS Model.Variables.lookang.anglertext
  var text; // EjsS Model.Variables.lookang.text
  var distimage; // EjsS Model.Variables.lookang.distimage
  var distobject; // EjsS Model.Variables.lookang.distobject
  var distshow; // EjsS Model.Variables.lookang.distshow
  var disttext; // EjsS Model.Variables.lookang.disttext
  var dist2text; // EjsS Model.Variables.lookang.dist2text
  var t; // EjsS Model.Variables.lookang.t
  var dt; // EjsS Model.Variables.lookang.dt
  var bearShow; // EjsS Model.Variables.lookang.bearShow
  var winkShow; // EjsS Model.Variables.lookang.winkShow
  var objectShow; // EjsS Model.Variables.lookang.objectShow
  var textObject; // EjsS Model.Variables.lookang.textObject
  var textObjectShow; // EjsS Model.Variables.lookang.textObjectShow

  var Width1; // EjsS Model.Variables.layout.Width1
  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var isAndroid; // EjsS Model.Variables.layout.isAndroid

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
      print : print,
      fontb : fontb,
      font : font,
      xMin : xMin,
      xMax : xMax,
      yMin : yMin,
      yMax : yMax,
      r : r,
      x1 : x1,
      y1 : y1,
      x2 : x2,
      y2 : y2,
      xe1 : xe1,
      ye1 : ye1,
      vye1 : vye1,
      xi1 : xi1,
      yi1 : yi1,
      c1 : c1,
      c2 : c2,
      c3 : c3,
      c4 : c4,
      lx : lx,
      ly : ly,
      xe2 : xe2,
      ye2 : ye2,
      width : width,
      height : height,
      css : css,
      r2show : r2show,
      r3show : r3show,
      bshow : bshow,
      anglei : anglei,
      angleitext : angleitext,
      angleideg : angleideg,
      angler : angler,
      angleshow : angleshow,
      pi : pi,
      anglerdeg : anglerdeg,
      anglertext : anglertext,
      text : text,
      distimage : distimage,
      distobject : distobject,
      distshow : distshow,
      disttext : disttext,
      dist2text : dist2text,
      t : t,
      dt : dt,
      bearShow : bearShow,
      winkShow : winkShow,
      objectShow : objectShow,
      textObject : textObject,
      textObjectShow : textObjectShow,
      Width1 : Width1,
      Width : Width,
      Height : Height,
      isAndroid : isAndroid
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      print : print,
      fontb : fontb,
      font : font,
      xMin : xMin,
      xMax : xMax,
      yMin : yMin,
      yMax : yMax,
      r : r,
      x1 : x1,
      y1 : y1,
      x2 : x2,
      y2 : y2,
      xe1 : xe1,
      ye1 : ye1,
      vye1 : vye1,
      xi1 : xi1,
      yi1 : yi1,
      c1 : c1,
      c2 : c2,
      c3 : c3,
      c4 : c4,
      lx : lx,
      ly : ly,
      xe2 : xe2,
      ye2 : ye2,
      width : width,
      height : height,
      css : css,
      r2show : r2show,
      r3show : r3show,
      bshow : bshow,
      anglei : anglei,
      angleitext : angleitext,
      angleideg : angleideg,
      angler : angler,
      angleshow : angleshow,
      pi : pi,
      anglerdeg : anglerdeg,
      anglertext : anglertext,
      text : text,
      distimage : distimage,
      distobject : distobject,
      distshow : distshow,
      disttext : disttext,
      dist2text : dist2text,
      t : t,
      dt : dt,
      bearShow : bearShow,
      winkShow : winkShow,
      objectShow : objectShow,
      textObject : textObject,
      textObjectShow : textObjectShow,
      Width1 : Width1,
      Width : Width,
      Height : Height,
      isAndroid : isAndroid
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.print != "undefined") print = json.print;
    if(typeof json.fontb != "undefined") fontb = json.fontb;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.xMin != "undefined") xMin = json.xMin;
    if(typeof json.xMax != "undefined") xMax = json.xMax;
    if(typeof json.yMin != "undefined") yMin = json.yMin;
    if(typeof json.yMax != "undefined") yMax = json.yMax;
    if(typeof json.r != "undefined") r = json.r;
    if(typeof json.x1 != "undefined") x1 = json.x1;
    if(typeof json.y1 != "undefined") y1 = json.y1;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.y2 != "undefined") y2 = json.y2;
    if(typeof json.xe1 != "undefined") xe1 = json.xe1;
    if(typeof json.ye1 != "undefined") ye1 = json.ye1;
    if(typeof json.vye1 != "undefined") vye1 = json.vye1;
    if(typeof json.xi1 != "undefined") xi1 = json.xi1;
    if(typeof json.yi1 != "undefined") yi1 = json.yi1;
    if(typeof json.c1 != "undefined") c1 = json.c1;
    if(typeof json.c2 != "undefined") c2 = json.c2;
    if(typeof json.c3 != "undefined") c3 = json.c3;
    if(typeof json.c4 != "undefined") c4 = json.c4;
    if(typeof json.lx != "undefined") lx = json.lx;
    if(typeof json.ly != "undefined") ly = json.ly;
    if(typeof json.xe2 != "undefined") xe2 = json.xe2;
    if(typeof json.ye2 != "undefined") ye2 = json.ye2;
    if(typeof json.width != "undefined") width = json.width;
    if(typeof json.height != "undefined") height = json.height;
    if(typeof json.css != "undefined") css = json.css;
    if(typeof json.r2show != "undefined") r2show = json.r2show;
    if(typeof json.r3show != "undefined") r3show = json.r3show;
    if(typeof json.bshow != "undefined") bshow = json.bshow;
    if(typeof json.anglei != "undefined") anglei = json.anglei;
    if(typeof json.angleitext != "undefined") angleitext = json.angleitext;
    if(typeof json.angleideg != "undefined") angleideg = json.angleideg;
    if(typeof json.angler != "undefined") angler = json.angler;
    if(typeof json.angleshow != "undefined") angleshow = json.angleshow;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.anglerdeg != "undefined") anglerdeg = json.anglerdeg;
    if(typeof json.anglertext != "undefined") anglertext = json.anglertext;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.distimage != "undefined") distimage = json.distimage;
    if(typeof json.distobject != "undefined") distobject = json.distobject;
    if(typeof json.distshow != "undefined") distshow = json.distshow;
    if(typeof json.disttext != "undefined") disttext = json.disttext;
    if(typeof json.dist2text != "undefined") dist2text = json.dist2text;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.bearShow != "undefined") bearShow = json.bearShow;
    if(typeof json.winkShow != "undefined") winkShow = json.winkShow;
    if(typeof json.objectShow != "undefined") objectShow = json.objectShow;
    if(typeof json.textObject != "undefined") textObject = json.textObject;
    if(typeof json.textObjectShow != "undefined") textObjectShow = json.textObjectShow;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.isAndroid != "undefined") isAndroid = json.isAndroid;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.print != "undefined") print = json.print;
    if(typeof json.fontb != "undefined") fontb = json.fontb;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.xMin != "undefined") xMin = json.xMin;
    if(typeof json.xMax != "undefined") xMax = json.xMax;
    if(typeof json.yMin != "undefined") yMin = json.yMin;
    if(typeof json.yMax != "undefined") yMax = json.yMax;
    if(typeof json.r != "undefined") r = json.r;
    if(typeof json.x1 != "undefined") x1 = json.x1;
    if(typeof json.y1 != "undefined") y1 = json.y1;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.y2 != "undefined") y2 = json.y2;
    if(typeof json.xe1 != "undefined") xe1 = json.xe1;
    if(typeof json.ye1 != "undefined") ye1 = json.ye1;
    if(typeof json.vye1 != "undefined") vye1 = json.vye1;
    if(typeof json.xi1 != "undefined") xi1 = json.xi1;
    if(typeof json.yi1 != "undefined") yi1 = json.yi1;
    if(typeof json.c1 != "undefined") c1 = json.c1;
    if(typeof json.c2 != "undefined") c2 = json.c2;
    if(typeof json.c3 != "undefined") c3 = json.c3;
    if(typeof json.c4 != "undefined") c4 = json.c4;
    if(typeof json.lx != "undefined") lx = json.lx;
    if(typeof json.ly != "undefined") ly = json.ly;
    if(typeof json.xe2 != "undefined") xe2 = json.xe2;
    if(typeof json.ye2 != "undefined") ye2 = json.ye2;
    if(typeof json.width != "undefined") width = json.width;
    if(typeof json.height != "undefined") height = json.height;
    if(typeof json.css != "undefined") css = json.css;
    if(typeof json.r2show != "undefined") r2show = json.r2show;
    if(typeof json.r3show != "undefined") r3show = json.r3show;
    if(typeof json.bshow != "undefined") bshow = json.bshow;
    if(typeof json.anglei != "undefined") anglei = json.anglei;
    if(typeof json.angleitext != "undefined") angleitext = json.angleitext;
    if(typeof json.angleideg != "undefined") angleideg = json.angleideg;
    if(typeof json.angler != "undefined") angler = json.angler;
    if(typeof json.angleshow != "undefined") angleshow = json.angleshow;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.anglerdeg != "undefined") anglerdeg = json.anglerdeg;
    if(typeof json.anglertext != "undefined") anglertext = json.anglertext;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.distimage != "undefined") distimage = json.distimage;
    if(typeof json.distobject != "undefined") distobject = json.distobject;
    if(typeof json.distshow != "undefined") distshow = json.distshow;
    if(typeof json.disttext != "undefined") disttext = json.disttext;
    if(typeof json.dist2text != "undefined") dist2text = json.dist2text;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.bearShow != "undefined") bearShow = json.bearShow;
    if(typeof json.winkShow != "undefined") winkShow = json.winkShow;
    if(typeof json.objectShow != "undefined") objectShow = json.objectShow;
    if(typeof json.textObject != "undefined") textObject = json.textObject;
    if(typeof json.textObjectShow != "undefined") textObjectShow = json.textObjectShow;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.isAndroid != "undefined") isAndroid = json.isAndroid;
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
    __pagesEnabled["svgradial"] = true;
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["Event"] = true;
    __pagesEnabled["Event 2"] = true;
    __pagesEnabled["fromevo"] = true;
    __pagesEnabled["FixRel Page"] = true;
    __pagesEnabled["lookang"] = true;
    __pagesEnabled["axes"] = true;
  });

  _model.addToReset(function() {
    print = false; // EjsS Model.Variables.Parameters and constants.print
    fontb = "normal bold 2vw "; // EjsS Model.Variables.Parameters and constants.fontb
    font = "normal normal 2vw "; // EjsS Model.Variables.Parameters and constants.font
    xMin = -20; // EjsS Model.Variables.Parameters and constants.xMin
    xMax = 20; // EjsS Model.Variables.Parameters and constants.xMax
    yMin = 0; // EjsS Model.Variables.Parameters and constants.yMin
    yMax = 20; // EjsS Model.Variables.Parameters and constants.yMax
    r = 0.2; // EjsS Model.Variables.Parameters and constants.r
    x1 = Math.random()*15+1; // EjsS Model.Variables.Parameters and constants.x1
    y1 = Math.random()*15+1; // EjsS Model.Variables.Parameters and constants.y1
    x2 = 15; // EjsS Model.Variables.Parameters and constants.x2
    y2 = 12; // EjsS Model.Variables.Parameters and constants.y2
    xe1 = Math.random()*15+1; // EjsS Model.Variables.Parameters and constants.xe1
    ye1 = Math.random()*15+1; // EjsS Model.Variables.Parameters and constants.ye1
    vye1 = 1; // EjsS Model.Variables.Parameters and constants.vye1
    xi1 = -1; // EjsS Model.Variables.Parameters and constants.xi1
    yi1 = -1; // EjsS Model.Variables.Parameters and constants.yi1
    c1 = -1; // EjsS Model.Variables.Parameters and constants.c1
    c2 = -1; // EjsS Model.Variables.Parameters and constants.c2
    c3 = -1; // EjsS Model.Variables.Parameters and constants.c3
    c4 = -1; // EjsS Model.Variables.Parameters and constants.c4
    lx = 0; // EjsS Model.Variables.Parameters and constants.lx
    ly = -3; // EjsS Model.Variables.Parameters and constants.ly
    xe2 = xe1; // EjsS Model.Variables.Parameters and constants.xe2
    ye2 = ye1; // EjsS Model.Variables.Parameters and constants.ye2
    width = 250; // EjsS Model.Variables.Parameters and constants.width
    height = 100; // EjsS Model.Variables.Parameters and constants.height
    css = {"display":"inline-block", "margin":"10px", "vertical-align": "top"}; // EjsS Model.Variables.Parameters and constants.css
    r2show = false; // EjsS Model.Variables.Parameters and constants.r2show
    r3show = false; // EjsS Model.Variables.Parameters and constants.r3show
    bshow = false; // EjsS Model.Variables.Parameters and constants.bshow
  });

  _model.addToReset(function() {
    anglei = 0; // EjsS Model.Variables.lookang.anglei
    angleitext = ""; // EjsS Model.Variables.lookang.angleitext
    angleideg = 0; // EjsS Model.Variables.lookang.angleideg
    pi = Math.PI; // EjsS Model.Variables.lookang.pi
    anglerdeg = 0; // EjsS Model.Variables.lookang.anglerdeg
    anglertext = ""; // EjsS Model.Variables.lookang.anglertext
    text = "Drag the Yellow object to observe reflection"; // EjsS Model.Variables.lookang.text
    disttext = ""; // EjsS Model.Variables.lookang.disttext
    dist2text = ""; // EjsS Model.Variables.lookang.dist2text
    t = 0; // EjsS Model.Variables.lookang.t
    dt = 0.05; // EjsS Model.Variables.lookang.dt
    textObject = "Ambulance"; // EjsS Model.Variables.lookang.textObject
  });

  _model.addToReset(function() {
    Width1 = "100%"; // EjsS Model.Variables.layout.Width1
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
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
  // _view.plottingPanel.getGraphics().setHeight(changeOrientation(0.85));  // > CustomCode.changeOrientation:5
  function changeOrientation(kheight) {  // > CustomCode.changeOrientation:6
     // > CustomCode.changeOrientation:7
  var k =0.90 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeOrientation:8
  var kapple =kheight // control apple app height  // > CustomCode.changeOrientation:9
  var kepub =0.90 ;  // > CustomCode.changeOrientation:10
  // check platform for Apps  // > CustomCode.changeOrientation:11
  try { // allow code to run in Student Learning Space   // > CustomCode.changeOrientation:12
    var iOSapp =  (typeof parent.device != 'undefined' && parent.device.platform == "iOS");  // > CustomCode.changeOrientation:13
    var Androidapp = (typeof parent.device != 'undefined' && parent.device.platform == "Android");  // > CustomCode.changeOrientation:14
  } catch(e) {  // > CustomCode.changeOrientation:15
    var iOSapp = false;  // > CustomCode.changeOrientation:16
    var Androidapp = false;  // > CustomCode.changeOrientation:17
  }  // > CustomCode.changeOrientation:18
  // check platform for web browsers  // > CustomCode.changeOrientation:19
  var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:20
  var iPad =/iPad/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:21
  var iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:22
  var Android= /Android|android/i.test(navigator.userAgent);  // > CustomCode.changeOrientation:23
  //navigator  // > CustomCode.changeOrientation:24
  var Firefox = navigator.userAgent.indexOf("Firefox") != -1;  // > CustomCode.changeOrientation:25
     // > CustomCode.changeOrientation:26
  switch (window.orientation) { // using window.orientation as deciding factor  // > CustomCode.changeOrientation:27
    case 0:  // > CustomCode.changeOrientation:28
    case 180:  // > CustomCode.changeOrientation:29
      this.screenOrientation = 'portrait';  // > CustomCode.changeOrientation:30
      if (iOSapp){ // does not seems to work  // > CustomCode.changeOrientation:31
          // > CustomCode.changeOrientation:32
        return window.screen.height*kapple;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:33
        // > CustomCode.changeOrientation:34
      }  // > CustomCode.changeOrientation:35
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeOrientation:36
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:37
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:38
        // return window.screen.height;  // > CustomCode.changeOrientation:39
        //  return window.innerHeight;  // > CustomCode.changeOrientation:40
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:41
      }  // > CustomCode.changeOrientation:42
       // > CustomCode.changeOrientation:43
      else {  // > CustomCode.changeOrientation:44
       return window.innerHeight*kheight;  // > CustomCode.changeOrientation:45
        //return 100*k+"vh";  // > CustomCode.changeOrientation:46
      }  // > CustomCode.changeOrientation:47
      break;  // > CustomCode.changeOrientation:48
    case 90:  // > CustomCode.changeOrientation:49
    case -90:  // > CustomCode.changeOrientation:50
      this.screenOrientation = 'landscape';  // > CustomCode.changeOrientation:51
     // > CustomCode.changeOrientation:52
      if (iOSapp){ // App  // > CustomCode.changeOrientation:53
        return window.screen.width*kapple;    // > CustomCode.changeOrientation:54
        // return window.screen.height;  // > CustomCode.changeOrientation:55
        //  return window.innerHeight;  // > CustomCode.changeOrientation:56
        //  return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:57
      }  // > CustomCode.changeOrientation:58
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeOrientation:59
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:60
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:61
        // return window.screen.height;  // > CustomCode.changeOrientation:62
        //  return window.innerHeight;  // > CustomCode.changeOrientation:63
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:64
      }  // > CustomCode.changeOrientation:65
       // > CustomCode.changeOrientation:66
      else {  // > CustomCode.changeOrientation:67
        return window.innerHeight*kheight;  // > CustomCode.changeOrientation:68
        //return 100*k+"vh"; // safari produce error  // > CustomCode.changeOrientation:69
        }  // > CustomCode.changeOrientation:70
      break;  // > CustomCode.changeOrientation:71
    default:  // > CustomCode.changeOrientation:72
      this.screenOrientation = 'unknown';  // > CustomCode.changeOrientation:73
      //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.changeOrientation:74
       if (Firefox){  // > CustomCode.changeOrientation:75
        return window.innerHeight*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeOrientation:76
        }  // > CustomCode.changeOrientation:77
     //   else if (iOS&&(window.orientation==0)||(window.orientation==180)){  // > CustomCode.changeOrientation:78
     //   return  window.screen.height*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeOrientation:79
     //   }  // > CustomCode.changeOrientation:80
      //  else if (iOS&&(window.orientation==90)||(window.orientation==-90)){  // > CustomCode.changeOrientation:81
     //   return  window.screen.width*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeOrientation:82
     //   }  // > CustomCode.changeOrientation:83
        else {  // > CustomCode.changeOrientation:84
        //alert();  // > CustomCode.changeOrientation:85
        // return 100*k+"%"; // work on fullscreen works in EJSS6.0beta  // > CustomCode.changeOrientation:86
          //  works in EjsS_5.3_180131  // > CustomCode.changeOrientation:87
        //return  window.innerHeight*kheight; // work on panel   // > CustomCode.changeOrientation:88
        // take note the panel that contains the plottingPanel needs to be 100% in Height to maximize the view  // > CustomCode.changeOrientation:89
        return 100*k+"vh";  // > CustomCode.changeOrientation:90
         // 100% does not work on iOS after clicking reset it lengthens  // > CustomCode.changeOrientation:91
  }  // > CustomCode.changeOrientation:92
  }  // > CustomCode.changeOrientation:93
     // > CustomCode.changeOrientation:94
  }  // > CustomCode.changeOrientation:95

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    _view.plottingPanel.getAxisX().setPosition([0,0.045]);  // > Initialization.Init Page:1
    _view.plottingPanel.getTitleX().setPosition([0.95,0.1]);  // > Initialization.Init Page:2
    _view.plottingPanel.getAxisY().setPosition([0.5,0]);  // > Initialization.Init Page:3
    _view.plottingPanel.getTitleY().setPosition([0.5,0.85]);  // > Initialization.Init Page:4
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["svgradial"]) return;
    var container = document.createElement('div');  // > Initialization.svgradial:1
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svgradial:2
      '  <radialGradient id="mygrandient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">'+  // > Initialization.svgradial:3
      '    <stop offset="0%" style="stop-color:rgb(0,0,0); stop-opacity:1" />'+  // > Initialization.svgradial:4
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />'+  // > Initialization.svgradial:5
      '  </radialGradient>'+  // > Initialization.svgradial:6
      '</defs></svg>';  // > Initialization.svgradial:7
    container.innerHTML = svggradient;  // > Initialization.svgradial:8
    document.body.appendChild(container);  // > Initialization.svgradial:9
    var container = document.createElement('div');  // > Initialization.svgradial:10
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svgradial:11
      '  <radialGradient id="mygrandient1" cx="50%" cy="50%" r="80%" fx="30%" fy="30%">'+  // > Initialization.svgradial:12
      '    <stop offset="0%" style="stop-color:rgb(0,0,0); stop-opacity:0.5" />'+  // > Initialization.svgradial:13
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />'+  // > Initialization.svgradial:14
      '  </radialGradient>'+  // > Initialization.svgradial:15
      '</defs></svg>';  // > Initialization.svgradial:16
    container.innerHTML = svggradient;  // > Initialization.svgradial:17
    document.body.appendChild(container);  // > Initialization.svgradial:18
    //"url(#mygrandient1)"  // > Initialization.svgradial:19
    var container = document.createElement('div');  // > Initialization.svgradial:20
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svgradial:21
      '  <radialGradient id="mygrandient2" cx="50%" cy="50%" r="70%" fx="90%" fy="50%">'+  // > Initialization.svgradial:22
      '    <stop offset="0%" style="stop-color:rgb(0,255,0); stop-opacity:0.5" />'+  // > Initialization.svgradial:23
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />'+  // > Initialization.svgradial:24
      '  </radialGradient>'+  // > Initialization.svgradial:25
      '</defs></svg>';  // > Initialization.svgradial:26
    container.innerHTML = svggradient;  // > Initialization.svgradial:27
    document.body.appendChild(container);  // > Initialization.svgradial:28
    //"url(#mygrandient2)"  // > Initialization.svgradial:29
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (objectShow==undefined){  // > Initialization.undefined:1
      objectShow=true  // > Initialization.undefined:2
      }  // > Initialization.undefined:3
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
    if (!__pagesEnabled["fromevo"]) return;
    //calculate c, the intersection of rays with mirror  // > FixedRelations.fromevo:1
    // assume ray  model of light is straight line  // > FixedRelations.fromevo:2
    //ratio of triangle lengths  // > FixedRelations.fromevo:3
    // tan r = tan i  // > FixedRelations.fromevo:4
    // (y1 - c1)/(x1 - 0) = (c1 - ye1)/(xe1 - 0)  // > FixedRelations.fromevo:5
    // (y1 -c1)/x1 = (c1 - ye1)/xe1  // > FixedRelations.fromevo:6
    //   (y1 -c1)xe1 = (c1 -ye1)x1  // > FixedRelations.fromevo:7
    //    y1*xe1+ ye1*x1     = c1 *(x1+xe1)  // > FixedRelations.fromevo:8
    //  // > FixedRelations.fromevo:9
    c1 = (y1*xe1+ ye1*x1)/(x1+xe1);  // > FixedRelations.fromevo:10
    // you can comment out the line above and add your own c1 based on your "ray model" assumption   // > FixedRelations.fromevo:11
    // for example assume c1 is a fix point on the mirror  // > FixedRelations.fromevo:12
    // uncomment out the line below  // > FixedRelations.fromevo:13
    // c1 = 8; // where 8 is arbitrary  // > FixedRelations.fromevo:14
    //c1 = y1 - x1*(y1-ye1)/(x1+xe1);  // > FixedRelations.fromevo:15
    c2 = y1 - x1*(y1-ye2)/(x1+xe2); // original equivalent form from leongster  // > FixedRelations.fromevo:16
    c3 = y2 - x2*(y2-ye1)/(x2+xe1);  // > FixedRelations.fromevo:17
    c4 = y2 - x2*(y2-ye2)/(x2+xe2);  // > FixedRelations.fromevo:18
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
    //if (x1<0){x1=0};  // > FixedRelations.FixRel Page:1
    //if (x2<0){x2=0};  // > FixedRelations.FixRel Page:2
    //if (xe1<0){xe1=0;xe2=0};  // > FixedRelations.FixRel Page:3
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["lookang"]) return;
    anglei = Math.atan2(y1-c1,x1);  // > FixedRelations.lookang:1
    angleideg = anglei*180/pi;  // > FixedRelations.lookang:2
    angleitext = "i = "+_view._format(Math.abs(angleideg),"0.0") +" ° ";  // > FixedRelations.lookang:3
    angler = Math.atan2(ye1-c1,xe1);  // > FixedRelations.lookang:4
    anglerdeg = angler*180/pi;  // > FixedRelations.lookang:5
    anglertext = "r = "+_view._format(Math.abs(anglerdeg),"0.0") +" ° ";  // > FixedRelations.lookang:6
    distimage = x1-0;  // > FixedRelations.lookang:7
    distobject = x1-0;  // > FixedRelations.lookang:8
    disttext = "d2 = "+_view._format(distimage,"0.0") +" m ";  // > FixedRelations.lookang:9
    dist2text = "d1 = "+_view._format(distobject,"0.0") +" m ";  // > FixedRelations.lookang:10
    //if (x1<=0.1)x1=0.1;  // > FixedRelations.lookang:11
    //if (xe1<=0.1)xe1=0.1;  // > FixedRelations.lookang:12
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["axes"]) return;
    if (_model.isPlaying()===true) { //NEED this for conflict with initialize page values  // > FixedRelations.axes:1
    _view.plottingPanel.getAxisX().setAbsoluteY(_view.plottingPanel.getGrid().getFixedTickY());  // > FixedRelations.axes:2
    _view.plottingPanel.getAxisY().setAbsoluteX(_view.plottingPanel.getGrid().getFixedTickX());  // > FixedRelations.axes:3
    }  // > FixedRelations.axes:4
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
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["ye1","t"]};

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
        if (__state[__cIn]!=ye1) __mustReinitialize = true;
        __state[__cIn++] = ye1;
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
        ye1 = __state[__cOut++];
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
        var ye1 = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = vye1; // Rate for ODE: Evol Page:ye1
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
        var ye1 = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        ye1 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = ye1;
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
        var ye1 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return ye1-yMax;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        ye1 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = ye1;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //_pause();  // > Event action for page Evol Page:1
        vye1=-vye1;  // > Event action for page Evol Page:2
        //text="paused";  // > Event action for page Evol Page:3
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
        var ye1 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return ye1-yMin;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        ye1 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = ye1;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //_pause();  // > Event action for page Evol Page:1
        vye1=-vye1;  // > Event action for page Evol Page:2
        //text="paused";  // > Event action for page Evol Page:3
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_ye1(__time) {
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
    _view = new mirror11_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView linking property 'Height' for element 'fullscreen'
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView linking property 'Width' for element 'fullscreen'
          _view.control_panel.linkProperty("Visibility",  function() { return !print; } ); // HtmlView linking property 'Visibility' for element 'control_panel'
          _view.controlcomboBox.linkProperty("Options",  function() { return ["Point Object","Wink","Bear","Large Object","Write Your Own","print"]; } ); // HtmlView linking property 'Options' for element 'controlcomboBox'
          _view.controlcomboBox.setAction("OnChange", function(_data,_info) {
  //var option = _view.Modules.getProperty("SelectedOptions");
  var opts = _view.controlcomboBox.getProperty("SelectedOptions");  // array of options
  var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option=="Show Angles"){
  angleshow=true;
  alert("angle of incidence, |i| = " +_view._format(Math.abs(angleideg),"0.0")+" ° , angle of reflection, |r| = " +_view._format(Math.abs(anglerdeg),"0.0")+" °");
    }
  //print
  else if ( option == "print"){
    print = true;
    }
  //print
  else if ( option=="Hide Angles"){
  angleshow=false;
    }
    
  if ( option=="Show Distance"){
  distshow=true;
    }
    
    else if ( option=="Hide Distance"){
  distshow=false;
    }
    
  if ( option=="Large Object"){
  bshow=true;
  r3show=true;
    }
    
  else if ( option=="Point Object"){
  bshow=false;
  r3show=false;
  bearShow = false;
  winkShow = false;
  objectShow= true
  textObjectShow = false
  }  
  //bearShow
  else if ( option == "Bear"){
    bearShow = true;
    winkShow = false;
    bshow=false;
    objectShow= false
    textObjectShow = false
    }
  //bearShow
  else if ( option == "Wink"){
    winkShow = true;
    bearShow = false;
    bshow=false;
    objectShow= false
    textObjectShow = false
    }
    //"Write Your Own"
   else if ( option == "Write Your Own"){
    winkShow = false;
    bearShow = false;
    bshow=false;
    objectShow= false
    textObjectShow = true
    } 
    
    
    
  if (option == "Show Custom Ray"){
    r2show=true;
    r3show=true;
    }
  else if (option == "Hide Custom Ray"){
    r2show=false;
    r3show=false;
    }

}); // HtmlView setting action 'OnChange' for element 'controlcomboBox'
          _view.controlcomboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'controlcomboBox'
          _view.textField.linkProperty("Value",  function() { return textObject; }, function(_v) { textObject = _v; } ); // HtmlView linking property 'Value' for element 'textField'
          _view.textField.linkProperty("Display",  function() { return textObjectShow?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'textField'
          _view.checkBox.linkProperty("Checked",  function() { return angleshow; }, function(_v) { angleshow = _v; } ); // HtmlView linking property 'Checked' for element 'checkBox'
          _view.checkBox2.linkProperty("Checked",  function() { return distshow; }, function(_v) { distshow = _v; } ); // HtmlView linking property 'Checked' for element 'checkBox2'
          _view.checkBox22.linkProperty("Checked",  function() { return r2show; }, function(_v) { r2show = _v; } ); // HtmlView linking property 'Checked' for element 'checkBox22'
          _view.checkBox22.setAction("OnCheckOff", function(_data,_info) {
  r3show = false;

}); // HtmlView setting action 'OnCheckOff' for element 'checkBox22'
          _view.checkBox22.setAction("OnCheckOn", function(_data,_info) {
  r3show = true;

}); // HtmlView setting action 'OnCheckOn' for element 'checkBox22'
          _view.playpauseButton.setAction("OffClick", function(_data,_info) {
  _pause();
  text="paused";

}); // HtmlView setting action 'OffClick' for element 'playpauseButton'
          _view.playpauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView linking property 'State' for element 'playpauseButton'
          _view.playpauseButton.setAction("OnClick", function(_data,_info) {
  _play();
  text="playing";

}); // HtmlView setting action 'OnClick' for element 'playpauseButton'
          _view.playpauseButton.linkProperty("Font",  function() { return fontb; }, function(_v) { fontb = _v; } ); // HtmlView linking property 'Font' for element 'playpauseButton'
          _view.stepButton2.setAction("OnClick", function(_data,_info) {
  _step();

}); // HtmlView setting action 'OnClick' for element 'stepButton2'
          _view.stepButton2.linkProperty("Font",  function() { return fontb; }, function(_v) { fontb = _v; } ); // HtmlView linking property 'Font' for element 'stepButton2'
          _view.resetButton.setAction("OnPress", _reset); // HtmlView setting action 'OnPress' for element 'resetButton'
          _view.resetButton.setAction("OnClick", _reset); // HtmlView setting action 'OnClick' for element 'resetButton'
          _view.resetButton.linkProperty("Font",  function() { return fontb; }, function(_v) { fontb = _v; } ); // HtmlView linking property 'Font' for element 'resetButton'
          _view.print.linkProperty("Checked",  function() { return print; }, function(_v) { print = _v; } ); // HtmlView linking property 'Checked' for element 'print'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(0.9); }, function(_v) { changeOrientation(0.9) = _v; } ); // HtmlView linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return print?"":"Mirror Reflection Model"; } ); // HtmlView linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return print?"":text; } ); // HtmlView linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return yMax; }, function(_v) { yMax = _v; } ); // HtmlView linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return xMax; }, function(_v) { xMax = _v; } ); // HtmlView linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return xMin; }, function(_v) { xMin = _v; } ); // HtmlView linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return yMin; }, function(_v) { yMin = _v; } ); // HtmlView linking property 'MinimumY' for element 'plottingPanel'
          _view.object_A.linkProperty("Visibility",  function() { return objectShow; }, function(_v) { objectShow = _v; } ); // HtmlView linking property 'Visibility' for element 'object_A'
          _view.Image_A.linkProperty("X",  function() { return -x1; } ); // HtmlView linking property 'X' for element 'Image_A'
          _view.Image_A.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'Image_A'
          _view.Image_A.linkProperty("Visibility",  function() { return winkShow; }, function(_v) { winkShow = _v; } ); // HtmlView linking property 'Visibility' for element 'Image_A'
          _view.Object_A.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'Object_A'
          _view.Object_A.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'Object_A'
          _view.Object_A.setAction("OnDrag", function(_data,_info) {
  var tol = 1.5/2
  if (x1<=tol)x1=tol;

}); // HtmlView setting action 'OnDrag' for element 'Object_A'
          _view.reflected_ray_O1_E1.linkProperty("SizeX",  function() { return xe1; }, function(_v) { xe1 = _v; } ); // HtmlView linking property 'SizeX' for element 'reflected_ray_O1_E1'
          _view.reflected_ray_O1_E1.linkProperty("Y",  function() { return c1; }, function(_v) { c1 = _v; } ); // HtmlView linking property 'Y' for element 'reflected_ray_O1_E1'
          _view.reflected_ray_O1_E1.linkProperty("SizeY",  function() { return ye1-c1; } ); // HtmlView linking property 'SizeY' for element 'reflected_ray_O1_E1'
          _view.virtual_ray_13.linkProperty("SizeX",  function() { return -x1; } ); // HtmlView linking property 'SizeX' for element 'virtual_ray_13'
          _view.virtual_ray_13.linkProperty("Y",  function() { return c1; }, function(_v) { c1 = _v; } ); // HtmlView linking property 'Y' for element 'virtual_ray_13'
          _view.virtual_ray_13.linkProperty("SizeY",  function() { return y1-c1; } ); // HtmlView linking property 'SizeY' for element 'virtual_ray_13'
          _view.incident_ray_O1_E1.linkProperty("SizeX",  function() { return -x1; } ); // HtmlView linking property 'SizeX' for element 'incident_ray_O1_E1'
          _view.incident_ray_O1_E1.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'incident_ray_O1_E1'
          _view.incident_ray_O1_E1.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'incident_ray_O1_E1'
          _view.incident_ray_O1_E1.linkProperty("SizeY",  function() { return c1-y1; } ); // HtmlView linking property 'SizeY' for element 'incident_ray_O1_E1'
          _view.normal1.linkProperty("Y",  function() { return c1; }, function(_v) { c1 = _v; } ); // HtmlView linking property 'Y' for element 'normal1'
          _view.normal.linkProperty("Y",  function() { return c1-0.2; } ); // HtmlView linking property 'Y' for element 'normal'
          _view.group3.linkProperty("X",  function() { return x1/2; } ); // HtmlView linking property 'X' for element 'group3'
          _view.group3.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'group3'
          _view.distanceimage2.linkProperty("Text",  function() { return print?"d1":dist2text; } ); // HtmlView linking property 'Text' for element 'distanceimage2'
          _view.distanceimage2.linkProperty("Visibility",  function() { return distshow; }, function(_v) { distshow = _v; } ); // HtmlView linking property 'Visibility' for element 'distanceimage2'
          _view.group4.linkProperty("X",  function() { return -x1/2; } ); // HtmlView linking property 'X' for element 'group4'
          _view.group4.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'group4'
          _view.distanceimage.linkProperty("Text",  function() { return print?"d2":disttext; } ); // HtmlView linking property 'Text' for element 'distanceimage'
          _view.distanceimage.linkProperty("Visibility",  function() { return distshow; }, function(_v) { distshow = _v; } ); // HtmlView linking property 'Visibility' for element 'distanceimage'
          _view.angkeA32.linkProperty("PointsY",  function() { return [0,0, Math.sin(anglei/16),Math.sin(anglei/8), Math.sin(anglei*3/16),Math.sin(anglei/4), Math.sin(anglei*5/16),Math.sin(anglei*3/8), Math.sin(anglei*7/16),Math.sin(anglei/2), Math.sin(anglei*9/16),Math.sin(anglei*5/8), Math.sin(anglei*11/16),Math.sin(anglei*3/4), Math.sin(anglei*13/16),Math.sin(anglei*7/8), Math.sin(anglei*15/16),Math.sin(anglei)]; } ); // HtmlView linking property 'PointsY' for element 'angkeA32'
          _view.angkeA32.linkProperty("PointsX",  function() { return [0,1, Math.cos(anglei/16),Math.cos(anglei/8), Math.cos(anglei*3/16),Math.cos(anglei/4), Math.cos(anglei*5/16),Math.cos(anglei*3/8), Math.cos(anglei*7/16),Math.cos(anglei/2), Math.cos(anglei*9/16),Math.cos(anglei*5/8), Math.cos(anglei*11/16),Math.cos(anglei*3/4), Math.cos(anglei*13/16),Math.cos(anglei*7/8), Math.cos(anglei*15/16),Math.cos(anglei)]; } ); // HtmlView linking property 'PointsX' for element 'angkeA32'
          _view.angkeA32.linkProperty("Y",  function() { return c1; }, function(_v) { c1 = _v; } ); // HtmlView linking property 'Y' for element 'angkeA32'
          _view.group.linkProperty("X",  function() { return 1+Math.cos(anglei); } ); // HtmlView linking property 'X' for element 'group'
          _view.group.linkProperty("Y",  function() { return c1+Math.sin(anglei); } ); // HtmlView linking property 'Y' for element 'group'
          _view.angleofincidence.linkProperty("Text",  function() { return angleitext; }, function(_v) { angleitext = _v; } ); // HtmlView linking property 'Text' for element 'angleofincidence'
          _view.angleofincidence.linkProperty("Visibility",  function() { return angleshow; }, function(_v) { angleshow = _v; } ); // HtmlView linking property 'Visibility' for element 'angleofincidence'
          _view.angkeA322.linkProperty("PointsY",  function() { return [0,0, Math.sin(angler/16),Math.sin(angler/8), Math.sin(angler*3/16),Math.sin(angler/4), Math.sin(angler*5/16),Math.sin(angler*3/8), Math.sin(angler*7/16),Math.sin(angler/2), Math.sin(angler*9/16),Math.sin(angler*5/8), Math.sin(angler*11/16),Math.sin(angler*3/4), Math.sin(angler*13/16),Math.sin(angler*7/8), Math.sin(angler*15/16),Math.sin(angler)]; } ); // HtmlView linking property 'PointsY' for element 'angkeA322'
          _view.angkeA322.linkProperty("PointsX",  function() { return [0,1, Math.cos(angler/16),Math.cos(angler/8), Math.cos(angler*3/16),Math.cos(angler/4), Math.cos(angler*5/16),Math.cos(angler*3/8), Math.cos(angler*7/16),Math.cos(angler/2), Math.cos(angler*9/16),Math.cos(angler*5/8), Math.cos(angler*11/16),Math.cos(angler*3/4), Math.cos(angler*13/16),Math.cos(angler*7/8), Math.cos(angler*15/16),Math.cos(angler)]; } ); // HtmlView linking property 'PointsX' for element 'angkeA322'
          _view.angkeA322.linkProperty("Y",  function() { return c1; }, function(_v) { c1 = _v; } ); // HtmlView linking property 'Y' for element 'angkeA322'
          _view.group2.linkProperty("X",  function() { return 1+Math.cos(angler); } ); // HtmlView linking property 'X' for element 'group2'
          _view.group2.linkProperty("Y",  function() { return c1+Math.sin(angler); } ); // HtmlView linking property 'Y' for element 'group2'
          _view.angleofreflection.linkProperty("Text",  function() { return anglertext; }, function(_v) { anglertext = _v; } ); // HtmlView linking property 'Text' for element 'angleofreflection'
          _view.angleofreflection.linkProperty("Visibility",  function() { return angleshow; }, function(_v) { angleshow = _v; } ); // HtmlView linking property 'Visibility' for element 'angleofreflection'
          _view.rayA2.linkProperty("Visibility",  function() { return r2show; }, function(_v) { r2show = _v; } ); // HtmlView linking property 'Visibility' for element 'rayA2'
          _view.dragpointlookang.linkProperty("X",  function() { return xe2; }, function(_v) { xe2 = _v; } ); // HtmlView linking property 'X' for element 'dragpointlookang'
          _view.dragpointlookang.linkProperty("Y",  function() { return ye2; }, function(_v) { ye2 = _v; } ); // HtmlView linking property 'Y' for element 'dragpointlookang'
          _view.incident_ray_O1_E2.linkProperty("SizeX",  function() { return -x1; } ); // HtmlView linking property 'SizeX' for element 'incident_ray_O1_E2'
          _view.incident_ray_O1_E2.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'incident_ray_O1_E2'
          _view.incident_ray_O1_E2.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'incident_ray_O1_E2'
          _view.incident_ray_O1_E2.linkProperty("SizeY",  function() { return c2-y1; } ); // HtmlView linking property 'SizeY' for element 'incident_ray_O1_E2'
          _view.reflected_ray_O1_E2.linkProperty("SizeX",  function() { return xe2; }, function(_v) { xe2 = _v; } ); // HtmlView linking property 'SizeX' for element 'reflected_ray_O1_E2'
          _view.reflected_ray_O1_E2.linkProperty("Y",  function() { return c2; }, function(_v) { c2 = _v; } ); // HtmlView linking property 'Y' for element 'reflected_ray_O1_E2'
          _view.reflected_ray_O1_E2.linkProperty("SizeY",  function() { return ye2-c2; } ); // HtmlView linking property 'SizeY' for element 'reflected_ray_O1_E2'
          _view.virtual_ray_132.linkProperty("SizeX",  function() { return -x1; } ); // HtmlView linking property 'SizeX' for element 'virtual_ray_132'
          _view.virtual_ray_132.linkProperty("Y",  function() { return c2; }, function(_v) { c2 = _v; } ); // HtmlView linking property 'Y' for element 'virtual_ray_132'
          _view.virtual_ray_132.linkProperty("SizeY",  function() { return y1-c2; } ); // HtmlView linking property 'SizeY' for element 'virtual_ray_132'
          _view.normal2.linkProperty("Y",  function() { return c2; }, function(_v) { c2 = _v; } ); // HtmlView linking property 'Y' for element 'normal2'
          _view.rayA3.linkProperty("Visibility",  function() { return r3show; }, function(_v) { r3show = _v; } ); // HtmlView linking property 'Visibility' for element 'rayA3'
          _view.incident_ray_normal.linkProperty("SizeX",  function() { return -x1; } ); // HtmlView linking property 'SizeX' for element 'incident_ray_normal'
          _view.incident_ray_normal.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'incident_ray_normal'
          _view.incident_ray_normal.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'incident_ray_normal'
          _view.reflected_ray_normal.linkProperty("SizeX",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'SizeX' for element 'reflected_ray_normal'
          _view.reflected_ray_normal.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'reflected_ray_normal'
          _view.virtual_ray_normal2.linkProperty("SizeX",  function() { return -x1; } ); // HtmlView linking property 'SizeX' for element 'virtual_ray_normal2'
          _view.virtual_ray_normal2.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'virtual_ray_normal2'
          _view.virtual_ray_normal.linkProperty("SizeX",  function() { return -x1; } ); // HtmlView linking property 'SizeX' for element 'virtual_ray_normal'
          _view.virtual_ray_normal.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'virtual_ray_normal'
          _view.segment.linkProperty("SizeX",  function() { return -x1*2; } ); // HtmlView linking property 'SizeX' for element 'segment'
          _view.segment.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'segment'
          _view.segment.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'segment'
          _view.object_Bigger.linkProperty("Visibility",  function() { return bshow; }, function(_v) { bshow = _v; } ); // HtmlView linking property 'Visibility' for element 'object_Bigger'
          _view.Object_B.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView linking property 'X' for element 'Object_B'
          _view.Object_B.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView linking property 'Y' for element 'Object_B'
          _view.Object_B.setAction("OnDrag", function(_data,_info) {
  if (x2<=0.1)x2=0.1;

}); // HtmlView setting action 'OnDrag' for element 'Object_B'
          _view.object_AB.linkProperty("SizeX",  function() { return x1-x2; } ); // HtmlView linking property 'SizeX' for element 'object_AB'
          _view.object_AB.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView linking property 'X' for element 'object_AB'
          _view.object_AB.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView linking property 'Y' for element 'object_AB'
          _view.object_AB.linkProperty("SizeY",  function() { return y1-y2; } ); // HtmlView linking property 'SizeY' for element 'object_AB'
          _view.Image_AB.linkProperty("SizeX",  function() { return x2-x1; } ); // HtmlView linking property 'SizeX' for element 'Image_AB'
          _view.Image_AB.linkProperty("X",  function() { return -x2; } ); // HtmlView linking property 'X' for element 'Image_AB'
          _view.Image_AB.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView linking property 'Y' for element 'Image_AB'
          _view.Image_AB.linkProperty("SizeY",  function() { return y1-y2; } ); // HtmlView linking property 'SizeY' for element 'Image_AB'
          _view.reflected_ray_O1_E12.linkProperty("SizeX",  function() { return xe1; }, function(_v) { xe1 = _v; } ); // HtmlView linking property 'SizeX' for element 'reflected_ray_O1_E12'
          _view.reflected_ray_O1_E12.linkProperty("Y",  function() { return c3; }, function(_v) { c3 = _v; } ); // HtmlView linking property 'Y' for element 'reflected_ray_O1_E12'
          _view.reflected_ray_O1_E12.linkProperty("SizeY",  function() { return ye1-c3; } ); // HtmlView linking property 'SizeY' for element 'reflected_ray_O1_E12'
          _view.virtual_ray_133.linkProperty("SizeX",  function() { return -x2; } ); // HtmlView linking property 'SizeX' for element 'virtual_ray_133'
          _view.virtual_ray_133.linkProperty("Y",  function() { return c3; }, function(_v) { c3 = _v; } ); // HtmlView linking property 'Y' for element 'virtual_ray_133'
          _view.virtual_ray_133.linkProperty("SizeY",  function() { return y2-c3; } ); // HtmlView linking property 'SizeY' for element 'virtual_ray_133'
          _view.incident_ray_O1_E12.linkProperty("SizeX",  function() { return -x2; } ); // HtmlView linking property 'SizeX' for element 'incident_ray_O1_E12'
          _view.incident_ray_O1_E12.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView linking property 'X' for element 'incident_ray_O1_E12'
          _view.incident_ray_O1_E12.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView linking property 'Y' for element 'incident_ray_O1_E12'
          _view.incident_ray_O1_E12.linkProperty("SizeY",  function() { return c3-y2; } ); // HtmlView linking property 'SizeY' for element 'incident_ray_O1_E12'
          _view.normal12.linkProperty("Y",  function() { return c3; }, function(_v) { c3 = _v; } ); // HtmlView linking property 'Y' for element 'normal12'
          _view.rayB2.linkProperty("Visibility",  function() { return r2show; }, function(_v) { r2show = _v; } ); // HtmlView linking property 'Visibility' for element 'rayB2'
          _view.incident_ray_O1_E22.linkProperty("SizeX",  function() { return -x2; } ); // HtmlView linking property 'SizeX' for element 'incident_ray_O1_E22'
          _view.incident_ray_O1_E22.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView linking property 'X' for element 'incident_ray_O1_E22'
          _view.incident_ray_O1_E22.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView linking property 'Y' for element 'incident_ray_O1_E22'
          _view.incident_ray_O1_E22.linkProperty("SizeY",  function() { return c4-y2; } ); // HtmlView linking property 'SizeY' for element 'incident_ray_O1_E22'
          _view.reflected_ray_O1_E22.linkProperty("SizeX",  function() { return xe2; }, function(_v) { xe2 = _v; } ); // HtmlView linking property 'SizeX' for element 'reflected_ray_O1_E22'
          _view.reflected_ray_O1_E22.linkProperty("Y",  function() { return c4; }, function(_v) { c4 = _v; } ); // HtmlView linking property 'Y' for element 'reflected_ray_O1_E22'
          _view.reflected_ray_O1_E22.linkProperty("SizeY",  function() { return ye2-c4; } ); // HtmlView linking property 'SizeY' for element 'reflected_ray_O1_E22'
          _view.virtual_ray_1332.linkProperty("SizeX",  function() { return -x2; } ); // HtmlView linking property 'SizeX' for element 'virtual_ray_1332'
          _view.virtual_ray_1332.linkProperty("Y",  function() { return c4; }, function(_v) { c4 = _v; } ); // HtmlView linking property 'Y' for element 'virtual_ray_1332'
          _view.virtual_ray_1332.linkProperty("SizeY",  function() { return y2-c4; } ); // HtmlView linking property 'SizeY' for element 'virtual_ray_1332'
          _view.normal22.linkProperty("Y",  function() { return c4; }, function(_v) { c4 = _v; } ); // HtmlView linking property 'Y' for element 'normal22'
          _view.normal22.linkProperty("Visibility",  function() { return distshow; }, function(_v) { distshow = _v; } ); // HtmlView linking property 'Visibility' for element 'normal22'
          _view.eye.setAction("OnRelease", function(_data,_info) {
  xe2=xe1;
  ye2=ye1+2;
  if (xe1<=0.1)xe1=0.1;

}); // HtmlView setting action 'OnRelease' for element 'eye'
          _view.eye.linkProperty("Transformation",  function() { return angler; }, function(_v) { angler = _v; } ); // HtmlView linking property 'Transformation' for element 'eye'
          _view.eye.linkProperty("X",  function() { return xe1; }, function(_v) { xe1 = _v; } ); // HtmlView linking property 'X' for element 'eye'
          _view.eye.linkProperty("Y",  function() { return ye1; }, function(_v) { ye1 = _v; } ); // HtmlView linking property 'Y' for element 'eye'
          _view.eye.setAction("OnDrag", function(_data,_info) {
  xe2=xe1;
  ye2=ye1+2;
  if (xe1<=0.1)xe1=0.1;

}); // HtmlView setting action 'OnDrag' for element 'eye'
          _view.teddybear2.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'teddybear2'
          _view.teddybear2.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'teddybear2'
          _view.teddybear2.linkProperty("Visibility",  function() { return bearShow; }, function(_v) { bearShow = _v; } ); // HtmlView linking property 'Visibility' for element 'teddybear2'
          _view.teddybear2.setAction("OnDrag", function(_data,_info) {
  var tol = 1.5
  if (x1<=tol)x1=tol;

}); // HtmlView setting action 'OnDrag' for element 'teddybear2'
          _view.teddyimage.linkProperty("X",  function() { return -x1; } ); // HtmlView linking property 'X' for element 'teddyimage'
          _view.teddyimage.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'teddyimage'
          _view.teddyimage.linkProperty("Visibility",  function() { return bearShow; }, function(_v) { bearShow = _v; } ); // HtmlView linking property 'Visibility' for element 'teddyimage'
          _view.Wink.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'Wink'
          _view.Wink.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'Wink'
          _view.Wink.linkProperty("Visibility",  function() { return winkShow; }, function(_v) { winkShow = _v; } ); // HtmlView linking property 'Visibility' for element 'Wink'
          _view.Wink.setAction("OnDrag", function(_data,_info) {
  var tol = 1.5
  if (x1<=tol)x1=tol;

}); // HtmlView setting action 'OnDrag' for element 'Wink'
          _view.WinkImage.linkProperty("X",  function() { return -x1; } ); // HtmlView linking property 'X' for element 'WinkImage'
          _view.WinkImage.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'WinkImage'
          _view.WinkImage.linkProperty("Visibility",  function() { return winkShow; }, function(_v) { winkShow = _v; } ); // HtmlView linking property 'Visibility' for element 'WinkImage'
          _view.TextObject.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView linking property 'X' for element 'TextObject'
          _view.TextObject.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'TextObject'
          _view.TextObject.linkProperty("Text",  function() { return textObject; }, function(_v) { textObject = _v; } ); // HtmlView linking property 'Text' for element 'TextObject'
          _view.TextObject.linkProperty("Visibility",  function() { return textObjectShow; }, function(_v) { textObjectShow = _v; } ); // HtmlView linking property 'Visibility' for element 'TextObject'
          _view.TextObject.setAction("OnDrag", function(_data,_info) {
  if (x1<=0.1)x1=0.1;

}); // HtmlView setting action 'OnDrag' for element 'TextObject'
          _view.TextObjectImage.linkProperty("X",  function() { return -x1; } ); // HtmlView linking property 'X' for element 'TextObjectImage'
          _view.TextObjectImage.linkProperty("Y",  function() { return y1; }, function(_v) { y1 = _v; } ); // HtmlView linking property 'Y' for element 'TextObjectImage'
          _view.TextObjectImage.linkProperty("Text",  function() { return textObject; }, function(_v) { textObject = _v; } ); // HtmlView linking property 'Text' for element 'TextObjectImage'
          _view.TextObjectImage.linkProperty("Visibility",  function() { return textObjectShow; }, function(_v) { textObjectShow = _v; } ); // HtmlView linking property 'Visibility' for element 'TextObjectImage'
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
function mirror11_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = mirror11_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('About','./mirror11_Intro_1.html');

  return _view;
} // end of main function

function mirror11_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control_panel", _view.fullscreen) // EJsS HtmlView.HtmlView: declaration of element 'control_panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'control_panel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'control_panel'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"controlcomboBox", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'controlcomboBox'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"textField", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'textField'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'checkBox'
      .setProperty("Text","Angles") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox2", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'checkBox2'
      .setProperty("Text","Perpendicular Distance") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'checkBox2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox22", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'checkBox22'
      .setProperty("Text","Custom Ray?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'checkBox22'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playpauseButton", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'playpauseButton'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'playpauseButton'
      .setProperty("TextOn","Play►") // EJsS HtmlView.HtmlView: setting property 'TextOn' for element 'playpauseButton'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView: setting property 'TextOff' for element 'playpauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'playpauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'stepButton2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'stepButton2'
      .setProperty("Tooltip","Step") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'stepButton2'
      .setProperty("Text","Step❚►") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'resetButton'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'resetButton'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'resetButton'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"print", _view.control_panel) // EJsS HtmlView.HtmlView: declaration of element 'print'
      .setProperty("Text","Print") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'print'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'print'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.fullscreen) // EJsS HtmlView.HtmlView: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("AxisYFont","normal normal 1vw") // EJsS HtmlView.HtmlView: setting property 'AxisYFont' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("AxisXFont","normal normal 1vw") // EJsS HtmlView.HtmlView: setting property 'AxisXFont' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rotategroup", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'rotategroup'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"mirror_shaded", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'mirror_shaded'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'mirror_shaded'
      .setProperty("LineColor","rgba(200,220,208,255)") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'mirror_shaded'
      .setProperty("X",-0.2) // EJsS HtmlView.HtmlView: setting property 'X' for element 'mirror_shaded'
      .setProperty("Y",20) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'mirror_shaded'
      .setProperty("SizeY",-20) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'mirror_shaded'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'mirror_shaded'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"mirror", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'mirror'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'mirror'
      .setProperty("LineColor","rgba(64,0,128,255)") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'mirror'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'mirror'
      .setProperty("Y",20) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'mirror'
      .setProperty("SizeY",-20) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'mirror'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'mirror'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"mirror2", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'mirror2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'mirror2'
      .setProperty("Y",19) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'mirror2'
      .setProperty("Text","Plane Mirror") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'mirror2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"object_A", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'object_A'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"Image_A", _view.object_A) // EJsS HtmlView.HtmlView: declaration of element 'Image_A'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'Image_A'
      .setProperty("Transformation",[-1,0,0,1,0,0]) // EJsS HtmlView.HtmlView: setting property 'Transformation' for element 'Image_A'
      .setProperty("SizeX",1.5) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'Image_A'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'Image_A'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'Image_A'
      .setProperty("SizeY",1.5) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'Image_A'
      .setProperty("DrawLines",true) // EJsS HtmlView.HtmlView: setting property 'DrawLines' for element 'Image_A'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'Image_A'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"Object_A", _view.object_A) // EJsS HtmlView.HtmlView: declaration of element 'Object_A'
      .setProperty("Sensitivity",20) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'Object_A'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'Object_A'
      .setProperty("SizeX",1.5) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'Object_A'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'Object_A'
      .setProperty("SizeY",1.5) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'Object_A'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'Object_A'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'Object_A'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rays", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'rays'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rayA1", _view.rays) // EJsS HtmlView.HtmlView: declaration of element 'rayA1'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"reflected_ray_O1_E1", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'reflected_ray_O1_E1'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'reflected_ray_O1_E1'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'reflected_ray_O1_E1'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'reflected_ray_O1_E1'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'reflected_ray_O1_E1'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"virtual_ray_13", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'virtual_ray_13'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'virtual_ray_13'
      .setProperty("MarkMiddle","INVANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'virtual_ray_13'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'virtual_ray_13'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'virtual_ray_13'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'virtual_ray_13'
      .setProperty("MarkStart","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkStart' for element 'virtual_ray_13'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'virtual_ray_13'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"incident_ray_O1_E1", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'incident_ray_O1_E1'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'incident_ray_O1_E1'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'incident_ray_O1_E1'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'incident_ray_O1_E1'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"normal1", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'normal1'
      .setProperty("SizeX",12) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'normal1'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'normal1'
      .setProperty("X",-6) // EJsS HtmlView.HtmlView: setting property 'X' for element 'normal1'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'normal1'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'normal1'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"normal", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'normal'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'normal'
      .setProperty("X",5) // EJsS HtmlView.HtmlView: setting property 'X' for element 'normal'
      .setProperty("Text","normal") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'normal'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group3", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'group3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"distanceimage2", _view.group3) // EJsS HtmlView.HtmlView: declaration of element 'distanceimage2'
      .setProperty("FillColor","Orange") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'distanceimage2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'distanceimage2'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'distanceimage2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'distanceimage2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group4", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'group4'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"distanceimage", _view.group4) // EJsS HtmlView.HtmlView: declaration of element 'distanceimage'
      .setProperty("FillColor","Orange") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'distanceimage'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'distanceimage'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'distanceimage'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'distanceimage'
      ;

    _view._addElement(EJSS_DRAWING2D.polygon,"angkeA32", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'angkeA32'
      .setProperty("FillColor","rgba(255,0,255,0.5)") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'angkeA32'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'angkeA32'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'angkeA32'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'angkeA32'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView: setting property 'PixelSize' for element 'angkeA32'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'group'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"angleofincidence", _view.group) // EJsS HtmlView.HtmlView: declaration of element 'angleofincidence'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'angleofincidence'
      .setProperty("RelativePosition","SOUTH_WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'angleofincidence'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'angleofincidence'
      ;

    _view._addElement(EJSS_DRAWING2D.polygon,"angkeA322", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'angkeA322'
      .setProperty("FillColor","rgba(0,0,255,0.5)") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'angkeA322'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'angkeA322'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'angkeA322'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'angkeA322'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView: setting property 'PixelSize' for element 'angkeA322'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group2", _view.rayA1) // EJsS HtmlView.HtmlView: declaration of element 'group2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"angleofreflection", _view.group2) // EJsS HtmlView.HtmlView: declaration of element 'angleofreflection'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'angleofreflection'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'angleofreflection'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'angleofreflection'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rayA2", _view.rays) // EJsS HtmlView.HtmlView: declaration of element 'rayA2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragpointlookang", _view.rayA2) // EJsS HtmlView.HtmlView: declaration of element 'dragpointlookang'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'dragpointlookang'
      .setProperty("SizeX",5) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragpointlookang'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragpointlookang'
      .setProperty("LineColor","Green") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'dragpointlookang'
      .setProperty("SizeY",5) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'dragpointlookang'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView: setting property 'PixelSize' for element 'dragpointlookang'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragpointlookang'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"incident_ray_O1_E2", _view.rayA2) // EJsS HtmlView.HtmlView: declaration of element 'incident_ray_O1_E2'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'incident_ray_O1_E2'
      .setProperty("LineColor","Green") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'incident_ray_O1_E2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'incident_ray_O1_E2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"reflected_ray_O1_E2", _view.rayA2) // EJsS HtmlView.HtmlView: declaration of element 'reflected_ray_O1_E2'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'reflected_ray_O1_E2'
      .setProperty("LineColor","Green") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'reflected_ray_O1_E2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'reflected_ray_O1_E2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'reflected_ray_O1_E2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"virtual_ray_132", _view.rayA2) // EJsS HtmlView.HtmlView: declaration of element 'virtual_ray_132'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'virtual_ray_132'
      .setProperty("MarkMiddle","INVANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'virtual_ray_132'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'virtual_ray_132'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'virtual_ray_132'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'virtual_ray_132'
      .setProperty("MarkStart","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkStart' for element 'virtual_ray_132'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'virtual_ray_132'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"normal2", _view.rayA2) // EJsS HtmlView.HtmlView: declaration of element 'normal2'
      .setProperty("SizeX",12) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'normal2'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'normal2'
      .setProperty("X",-6) // EJsS HtmlView.HtmlView: setting property 'X' for element 'normal2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'normal2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rayA3", _view.rays) // EJsS HtmlView.HtmlView: declaration of element 'rayA3'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"incident_ray_normal", _view.rayA3) // EJsS HtmlView.HtmlView: declaration of element 'incident_ray_normal'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'incident_ray_normal'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'incident_ray_normal'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'incident_ray_normal'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'incident_ray_normal'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"reflected_ray_normal", _view.rayA3) // EJsS HtmlView.HtmlView: declaration of element 'reflected_ray_normal'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'reflected_ray_normal'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'reflected_ray_normal'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'reflected_ray_normal'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'reflected_ray_normal'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'reflected_ray_normal'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'reflected_ray_normal'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"virtual_ray_normal2", _view.rayA3) // EJsS HtmlView.HtmlView: declaration of element 'virtual_ray_normal2'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'virtual_ray_normal2'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'virtual_ray_normal2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'virtual_ray_normal2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'virtual_ray_normal2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'virtual_ray_normal2'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"virtual_ray_normal", _view.rayA3) // EJsS HtmlView.HtmlView: declaration of element 'virtual_ray_normal'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'virtual_ray_normal'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'virtual_ray_normal'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'virtual_ray_normal'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'virtual_ray_normal'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'virtual_ray_normal'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"incident_ray_line", _view.rayA3) // EJsS HtmlView.HtmlView: declaration of element 'incident_ray_line'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"raylookang", _view.rays) // EJsS HtmlView.HtmlView: declaration of element 'raylookang'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"segment", _view.raylookang) // EJsS HtmlView.HtmlView: declaration of element 'segment'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'segment'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'segment'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'segment'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"object_Bigger", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'object_Bigger'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"Object_B", _view.object_Bigger) // EJsS HtmlView.HtmlView: declaration of element 'Object_B'
      .setProperty("Sensitivity",20) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'Object_B'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'Object_B'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'Object_B'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'Object_B'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'Object_B'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'Object_B'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"object_AB", _view.object_Bigger) // EJsS HtmlView.HtmlView: declaration of element 'object_AB'
      .setProperty("MarkEnd","CIRCLE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'object_AB'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'object_AB'
      .setProperty("MarkEndHeight",40) // EJsS HtmlView.HtmlView: setting property 'MarkEndHeight' for element 'object_AB'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'object_AB'
      .setProperty("MarkEndWidth",40) // EJsS HtmlView.HtmlView: setting property 'MarkEndWidth' for element 'object_AB'
      .setProperty("LineWidth",6) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'object_AB'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"Image_AB", _view.object_Bigger) // EJsS HtmlView.HtmlView: declaration of element 'Image_AB'
      .setProperty("MarkEnd","CIRCLE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'Image_AB'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'Image_AB'
      .setProperty("MarkEndHeight",40) // EJsS HtmlView.HtmlView: setting property 'MarkEndHeight' for element 'Image_AB'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'Image_AB'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'Image_AB'
      .setProperty("MarkEndWidth",40) // EJsS HtmlView.HtmlView: setting property 'MarkEndWidth' for element 'Image_AB'
      .setProperty("LineWidth",6) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'Image_AB'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView: setting property 'DrawFill' for element 'Image_AB'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rays_B", _view.object_Bigger) // EJsS HtmlView.HtmlView: declaration of element 'rays_B'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rayB1", _view.rays_B) // EJsS HtmlView.HtmlView: declaration of element 'rayB1'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"reflected_ray_O1_E12", _view.rayB1) // EJsS HtmlView.HtmlView: declaration of element 'reflected_ray_O1_E12'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'reflected_ray_O1_E12'
      .setProperty("LineColor","Cyan") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'reflected_ray_O1_E12'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'reflected_ray_O1_E12'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'reflected_ray_O1_E12'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"virtual_ray_133", _view.rayB1) // EJsS HtmlView.HtmlView: declaration of element 'virtual_ray_133'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'virtual_ray_133'
      .setProperty("MarkMiddle","INVANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'virtual_ray_133'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'virtual_ray_133'
      .setProperty("LineColor","Cyan") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'virtual_ray_133'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'virtual_ray_133'
      .setProperty("MarkStart","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkStart' for element 'virtual_ray_133'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'virtual_ray_133'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"incident_ray_O1_E12", _view.rayB1) // EJsS HtmlView.HtmlView: declaration of element 'incident_ray_O1_E12'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'incident_ray_O1_E12'
      .setProperty("LineColor","Cyan") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'incident_ray_O1_E12'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'incident_ray_O1_E12'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"normal12", _view.rayB1) // EJsS HtmlView.HtmlView: declaration of element 'normal12'
      .setProperty("SizeX",12) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'normal12'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'normal12'
      .setProperty("X",-6) // EJsS HtmlView.HtmlView: setting property 'X' for element 'normal12'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'normal12'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rayB2", _view.rays_B) // EJsS HtmlView.HtmlView: declaration of element 'rayB2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"incident_ray_O1_E22", _view.rayB2) // EJsS HtmlView.HtmlView: declaration of element 'incident_ray_O1_E22'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'incident_ray_O1_E22'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'incident_ray_O1_E22'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'incident_ray_O1_E22'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"reflected_ray_O1_E22", _view.rayB2) // EJsS HtmlView.HtmlView: declaration of element 'reflected_ray_O1_E22'
      .setProperty("MarkMiddle","ANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'reflected_ray_O1_E22'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'reflected_ray_O1_E22'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'reflected_ray_O1_E22'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'reflected_ray_O1_E22'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"virtual_ray_1332", _view.rayB2) // EJsS HtmlView.HtmlView: declaration of element 'virtual_ray_1332'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'virtual_ray_1332'
      .setProperty("MarkMiddle","INVANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkMiddle' for element 'virtual_ray_1332'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'virtual_ray_1332'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'virtual_ray_1332'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'virtual_ray_1332'
      .setProperty("MarkStart","NONE") // EJsS HtmlView.HtmlView: setting property 'MarkStart' for element 'virtual_ray_1332'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'virtual_ray_1332'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"normal22", _view.rayB2) // EJsS HtmlView.HtmlView: declaration of element 'normal22'
      .setProperty("SizeX",12) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'normal22'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'normal22'
      .setProperty("X",-6) // EJsS HtmlView.HtmlView: setting property 'X' for element 'normal22'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'normal22'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"eye", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'eye'
      .setProperty("Sensitivity",30) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'eye'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'eye'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'eye'
      .setProperty("ImageUrl","./eye-fill-white-with-space.gif") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'eye'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'eye'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'eye'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"teddybear2", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'teddybear2'
      .setProperty("SizeX",4) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'teddybear2'
      .setProperty("ImageUrl","./teddybear.gif") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'teddybear2'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'teddybear2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'teddybear2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"teddyimage", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'teddyimage'
      .setProperty("Transformation",[-1,0,0,1,0,0]) // EJsS HtmlView.HtmlView: setting property 'Transformation' for element 'teddyimage'
      .setProperty("SizeX",4) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'teddyimage'
      .setProperty("ImageUrl","./teddybear.gif") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'teddyimage'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'teddyimage'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Wink", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'Wink'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'Wink'
      .setProperty("FontSize","5vw") // EJsS HtmlView.HtmlView: setting property 'FontSize' for element 'Wink'
      .setProperty("Text","😉") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'Wink'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'Wink'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"WinkImage", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'WinkImage'
      .setProperty("Transformation",[-1,0,0,1,0,0]) // EJsS HtmlView.HtmlView: setting property 'Transformation' for element 'WinkImage'
      .setProperty("FontSize","5vw") // EJsS HtmlView.HtmlView: setting property 'FontSize' for element 'WinkImage'
      .setProperty("Text","😉") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'WinkImage'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"TextObject", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'TextObject'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'TextObject'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'TextObject'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'TextObject'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"TextObjectImage", _view.rotategroup) // EJsS HtmlView.HtmlView: declaration of element 'TextObjectImage'
      .setProperty("Transformation",[-1,0,0,1,0,0]) // EJsS HtmlView.HtmlView: setting property 'Transformation' for element 'TextObjectImage'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'TextObjectImage'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.fullscreen) // EJsS HtmlView.HtmlView: declaration of element 'html'
      .setProperty("Html","<h1>Ray Model of Light with Mirror</h1>                     <p>The ray model of light describes how light travels in straight lines called rays. When these rays encounter a reflective surface, such as a mirror, they obey the law of reflection. This law states that the angle of incidence (the angle between the incoming ray and the normal to the surface) is equal to the angle of reflection (the angle between the reflected ray and the normal).</p>             <h2>Law of Reflection</h2>             <p>According to the law of reflection:</p>             <ul>                 <li><strong>Angle of Incidence</strong>: The angle between the incident ray and the normal.</li>                 <li><strong>Angle of Reflection</strong>: The angle between the reflected ray and the normal.</li>                 <li>These angles are measured relative to the normal, which is an imaginary line perpendicular to the surface of the mirror at the point of incidence.</li>             </ul>             <h2>Types of Mirrors</h2>             <p>There are two main types of mirrors used to study the behavior of light rays:</p>             <ul>                 <li><strong>Plane Mirrors</strong>: Flat mirrors that reflect light to form virtual images that are the same size as the object.</li>                 <li><strong><s>Curved Mirrors</s></strong>: <s>Mirrors with curved surfaces (concave or convex) that can magnify or reduce the size of the reflected image.</s></li>             </ul>             <h3>Example: Plane Mirror Reflection</h3>             <p>When light rays hit a plane mirror, they reflect in such a way that the reflected rays appear to come from behind the mirror. This creates a virtual image that is laterally inverted.</p>") // EJsS HtmlView.HtmlView: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new mirror11("_topFrame","_ejs_library/",null);
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
