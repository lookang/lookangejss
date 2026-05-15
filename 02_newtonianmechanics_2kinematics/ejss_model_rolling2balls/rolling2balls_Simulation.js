/* _inputParameters: an object with different values for the model parameters */
function rolling2balls(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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
  var g; // EjsS Model.Variables.Var Table.g
  var L; // EjsS Model.Variables.Var Table.L
  var x; // EjsS Model.Variables.Var Table.x
  var y; // EjsS Model.Variables.Var Table.y
  var vx; // EjsS Model.Variables.Var Table.vx
  var vy; // EjsS Model.Variables.Var Table.vy
  var v; // EjsS Model.Variables.Var Table.v
  var factorForV; // EjsS Model.Variables.Var Table.factorForV
  var showv; // EjsS Model.Variables.Var Table.showv
  var ax; // EjsS Model.Variables.Var Table.ax
  var ay; // EjsS Model.Variables.Var Table.ay
  var showa; // EjsS Model.Variables.Var Table.showa
  var factorForA; // EjsS Model.Variables.Var Table.factorForA
  var t; // EjsS Model.Variables.Var Table.t
  var x2; // EjsS Model.Variables.Var Table.x2
  var y2; // EjsS Model.Variables.Var Table.y2
  var vx2; // EjsS Model.Variables.Var Table.vx2
  var vy2; // EjsS Model.Variables.Var Table.vy2
  var v2; // EjsS Model.Variables.Var Table.v2
  var radius; // EjsS Model.Variables.Var Table.radius
  var radius2; // EjsS Model.Variables.Var Table.radius2
  var angle; // EjsS Model.Variables.Var Table.angle
  var acuteAngle; // EjsS Model.Variables.Var Table.acuteAngle
  var acuteAngledeg; // EjsS Model.Variables.Var Table.acuteAngledeg
  var m; // EjsS Model.Variables.Var Table.m
  var m2; // EjsS Model.Variables.Var Table.m2
  var angle2; // EjsS Model.Variables.Var Table.angle2
  var acuteAngle2; // EjsS Model.Variables.Var Table.acuteAngle2
  var acuteAngle2deg; // EjsS Model.Variables.Var Table.acuteAngle2deg
  var momentofInertia; // EjsS Model.Variables.Var Table.momentofInertia
  var lengthHorizontalTrack; // EjsS Model.Variables.Var Table.lengthHorizontalTrack
  var dt; // EjsS Model.Variables.Var Table.dt
  var offsetEnergyBar; // EjsS Model.Variables.Var Table.offsetEnergyBar
  var font; // EjsS Model.Variables.Var Table.font
  var n; // EjsS Model.Variables.Var Table.n
  var ke1; // EjsS Model.Variables.Var Table.ke1
  var ke2; // EjsS Model.Variables.Var Table.ke2
  var pe1; // EjsS Model.Variables.Var Table.pe1
  var pe2; // EjsS Model.Variables.Var Table.pe2

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
      g : g,
      L : L,
      x : x,
      y : y,
      vx : vx,
      vy : vy,
      v : v,
      factorForV : factorForV,
      showv : showv,
      ax : ax,
      ay : ay,
      showa : showa,
      factorForA : factorForA,
      t : t,
      x2 : x2,
      y2 : y2,
      vx2 : vx2,
      vy2 : vy2,
      v2 : v2,
      radius : radius,
      radius2 : radius2,
      angle : angle,
      acuteAngle : acuteAngle,
      acuteAngledeg : acuteAngledeg,
      m : m,
      m2 : m2,
      angle2 : angle2,
      acuteAngle2 : acuteAngle2,
      acuteAngle2deg : acuteAngle2deg,
      momentofInertia : momentofInertia,
      lengthHorizontalTrack : lengthHorizontalTrack,
      dt : dt,
      offsetEnergyBar : offsetEnergyBar,
      font : font,
      n : n,
      ke1 : ke1,
      ke2 : ke2,
      pe1 : pe1,
      pe2 : pe2,
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
      g : g,
      L : L,
      x : x,
      y : y,
      vx : vx,
      vy : vy,
      v : v,
      factorForV : factorForV,
      showv : showv,
      ax : ax,
      ay : ay,
      showa : showa,
      factorForA : factorForA,
      t : t,
      x2 : x2,
      y2 : y2,
      vx2 : vx2,
      vy2 : vy2,
      v2 : v2,
      radius : radius,
      radius2 : radius2,
      angle : angle,
      acuteAngle : acuteAngle,
      acuteAngledeg : acuteAngledeg,
      m : m,
      m2 : m2,
      angle2 : angle2,
      acuteAngle2 : acuteAngle2,
      acuteAngle2deg : acuteAngle2deg,
      momentofInertia : momentofInertia,
      lengthHorizontalTrack : lengthHorizontalTrack,
      dt : dt,
      offsetEnergyBar : offsetEnergyBar,
      font : font,
      n : n,
      ke1 : ke1,
      ke2 : ke2,
      pe1 : pe1,
      pe2 : pe2,
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
    if(typeof json.g != "undefined") g = json.g;
    if(typeof json.L != "undefined") L = json.L;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.v != "undefined") v = json.v;
    if(typeof json.factorForV != "undefined") factorForV = json.factorForV;
    if(typeof json.showv != "undefined") showv = json.showv;
    if(typeof json.ax != "undefined") ax = json.ax;
    if(typeof json.ay != "undefined") ay = json.ay;
    if(typeof json.showa != "undefined") showa = json.showa;
    if(typeof json.factorForA != "undefined") factorForA = json.factorForA;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.y2 != "undefined") y2 = json.y2;
    if(typeof json.vx2 != "undefined") vx2 = json.vx2;
    if(typeof json.vy2 != "undefined") vy2 = json.vy2;
    if(typeof json.v2 != "undefined") v2 = json.v2;
    if(typeof json.radius != "undefined") radius = json.radius;
    if(typeof json.radius2 != "undefined") radius2 = json.radius2;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.acuteAngle != "undefined") acuteAngle = json.acuteAngle;
    if(typeof json.acuteAngledeg != "undefined") acuteAngledeg = json.acuteAngledeg;
    if(typeof json.m != "undefined") m = json.m;
    if(typeof json.m2 != "undefined") m2 = json.m2;
    if(typeof json.angle2 != "undefined") angle2 = json.angle2;
    if(typeof json.acuteAngle2 != "undefined") acuteAngle2 = json.acuteAngle2;
    if(typeof json.acuteAngle2deg != "undefined") acuteAngle2deg = json.acuteAngle2deg;
    if(typeof json.momentofInertia != "undefined") momentofInertia = json.momentofInertia;
    if(typeof json.lengthHorizontalTrack != "undefined") lengthHorizontalTrack = json.lengthHorizontalTrack;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.offsetEnergyBar != "undefined") offsetEnergyBar = json.offsetEnergyBar;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.ke1 != "undefined") ke1 = json.ke1;
    if(typeof json.ke2 != "undefined") ke2 = json.ke2;
    if(typeof json.pe1 != "undefined") pe1 = json.pe1;
    if(typeof json.pe2 != "undefined") pe2 = json.pe2;
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
    if(typeof json.g != "undefined") g = json.g;
    if(typeof json.L != "undefined") L = json.L;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.v != "undefined") v = json.v;
    if(typeof json.factorForV != "undefined") factorForV = json.factorForV;
    if(typeof json.showv != "undefined") showv = json.showv;
    if(typeof json.ax != "undefined") ax = json.ax;
    if(typeof json.ay != "undefined") ay = json.ay;
    if(typeof json.showa != "undefined") showa = json.showa;
    if(typeof json.factorForA != "undefined") factorForA = json.factorForA;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.y2 != "undefined") y2 = json.y2;
    if(typeof json.vx2 != "undefined") vx2 = json.vx2;
    if(typeof json.vy2 != "undefined") vy2 = json.vy2;
    if(typeof json.v2 != "undefined") v2 = json.v2;
    if(typeof json.radius != "undefined") radius = json.radius;
    if(typeof json.radius2 != "undefined") radius2 = json.radius2;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.acuteAngle != "undefined") acuteAngle = json.acuteAngle;
    if(typeof json.acuteAngledeg != "undefined") acuteAngledeg = json.acuteAngledeg;
    if(typeof json.m != "undefined") m = json.m;
    if(typeof json.m2 != "undefined") m2 = json.m2;
    if(typeof json.angle2 != "undefined") angle2 = json.angle2;
    if(typeof json.acuteAngle2 != "undefined") acuteAngle2 = json.acuteAngle2;
    if(typeof json.acuteAngle2deg != "undefined") acuteAngle2deg = json.acuteAngle2deg;
    if(typeof json.momentofInertia != "undefined") momentofInertia = json.momentofInertia;
    if(typeof json.lengthHorizontalTrack != "undefined") lengthHorizontalTrack = json.lengthHorizontalTrack;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.offsetEnergyBar != "undefined") offsetEnergyBar = json.offsetEnergyBar;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.ke1 != "undefined") ke1 = json.ke1;
    if(typeof json.ke2 != "undefined") ke2 = json.ke2;
    if(typeof json.pe1 != "undefined") pe1 = json.pe1;
    if(typeof json.pe2 != "undefined") pe2 = json.pe2;
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
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["hit horizontal Ball1"] = false;
    __pagesEnabled["hit horizontal ball1"] = true;
    __pagesEnabled["collision"] = true;
    __pagesEnabled["hit horizontal 2"] = false;
    __pagesEnabled["hit horizontal Ball2"] = true;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    g = 9.81; // EjsS Model.Variables.Var Table.g
    L = 0.2; // EjsS Model.Variables.Var Table.L
    x = 0; // EjsS Model.Variables.Var Table.x
    y = 0; // EjsS Model.Variables.Var Table.y
    vx = 0; // EjsS Model.Variables.Var Table.vx
    vy = 0; // EjsS Model.Variables.Var Table.vy
    v = Math.sqrt(vx*vx+vy*vy); // EjsS Model.Variables.Var Table.v
    factorForV = 0.3; // EjsS Model.Variables.Var Table.factorForV
    showv = true; // EjsS Model.Variables.Var Table.showv
    showa = false; // EjsS Model.Variables.Var Table.showa
    factorForA = 0.1; // EjsS Model.Variables.Var Table.factorForA
    t = 0; // EjsS Model.Variables.Var Table.t
    x2 = 5; // EjsS Model.Variables.Var Table.x2
    y2 = 0; // EjsS Model.Variables.Var Table.y2
    vx2 = -0; // EjsS Model.Variables.Var Table.vx2
    vy2 = 0; // EjsS Model.Variables.Var Table.vy2
    v2 = Math.sqrt(vx2*vx2+vy2*vy2); // EjsS Model.Variables.Var Table.v2
    radius = 0.02; // EjsS Model.Variables.Var Table.radius
    radius2 = 0.02; // EjsS Model.Variables.Var Table.radius2
    angle = (180+45)*pi/180; // EjsS Model.Variables.Var Table.angle
    acuteAngle = 3*pi/2 - angle; // EjsS Model.Variables.Var Table.acuteAngle
    acuteAngledeg = acuteAngle*180/pi; // EjsS Model.Variables.Var Table.acuteAngledeg
    m = 1; // EjsS Model.Variables.Var Table.m
    m2 = 1; // EjsS Model.Variables.Var Table.m2
    angle2 = (-45)*pi/180; // EjsS Model.Variables.Var Table.angle2
    acuteAngle2 = pi-angle2; // EjsS Model.Variables.Var Table.acuteAngle2
    acuteAngle2deg = acuteAngle2 *180/pi; // EjsS Model.Variables.Var Table.acuteAngle2deg
    momentofInertia = 2/5*m*radius^2; // EjsS Model.Variables.Var Table.momentofInertia
    lengthHorizontalTrack = 2; // EjsS Model.Variables.Var Table.lengthHorizontalTrack
    dt = 0.01; // EjsS Model.Variables.Var Table.dt
    offsetEnergyBar = 1; // EjsS Model.Variables.Var Table.offsetEnergyBar
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
    n = 32; // EjsS Model.Variables.Var Table.n
    ke1 = 0.5*m*(vx*vx+vy*vy); // EjsS Model.Variables.Var Table.ke1
    ke2 = 0.5*m2*(vx2*vx2+vy2*vy2); // EjsS Model.Variables.Var Table.ke2
    pe1 = m*g*L*Math.sin(acuteAngle); // EjsS Model.Variables.Var Table.pe1
    pe2 = m2*g*L*Math.sin(acuteAngle2); // EjsS Model.Variables.Var Table.pe2
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

  function getA () {  // > CustomCode.getA:1
  var factorOfSphere = 5/7  // > CustomCode.getA:2
  var zeroPositive = 0.01  // > CustomCode.getA:3
  if (x < zeroPositive) {  // > CustomCode.getA:4
      ax = factorOfSphere*Math.cos(acuteAngle) * (-g * Math.cos(angle));  // > CustomCode.getA:5
  } else {  // > CustomCode.getA:6
      ax = 0;  // > CustomCode.getA:7
      //alert("a")  // > CustomCode.getA:8
  }  // > CustomCode.getA:9
  if (x < zeroPositive) {  // > CustomCode.getA:10
      vy = vy;  // > CustomCode.getA:11
  } else {  // > CustomCode.getA:12
      vy = 0;  // > CustomCode.getA:13
      // alert("b")  // > CustomCode.getA:14
  }  // > CustomCode.getA:15
  if (x < zeroPositive) {  // > CustomCode.getA:16
      ay = factorOfSphere*Math.sin(acuteAngle) * (g * Math.cos(angle));  // > CustomCode.getA:17
  } else {  // > CustomCode.getA:18
      ay = 0;  // > CustomCode.getA:19
      // alert("c")  // > CustomCode.getA:20
  }  // > CustomCode.getA:21
  //ball 2  // > CustomCode.getA:22
  //var zeroPositive = 0.01  // > CustomCode.getA:23
  if (x2 > lengthHorizontalTrack-zeroPositive) {  // > CustomCode.getA:24
      ax2 = factorOfSphere*Math.cos(acuteAngle2) * (-g * Math.cos(angle2));  // > CustomCode.getA:25
  } else {  // > CustomCode.getA:26
      ax2 = 0;  // > CustomCode.getA:27
     // alert("a")  // > CustomCode.getA:28
  }  // > CustomCode.getA:29
  if (x2 > lengthHorizontalTrack-zeroPositive) {  // > CustomCode.getA:30
      vy2 = vy2;  // > CustomCode.getA:31
  } else {  // > CustomCode.getA:32
      vy2 = 0;  // > CustomCode.getA:33
      // alert("b")  // > CustomCode.getA:34
  }  // > CustomCode.getA:35
  if (x2 > lengthHorizontalTrack-zeroPositive) {  // > CustomCode.getA:36
      ay2 = factorOfSphere*Math.sin(acuteAngle2) * (-g * Math.cos(angle2));  // > CustomCode.getA:37
  } else {  // > CustomCode.getA:38
      ay2 = 0;  // > CustomCode.getA:39
    //   alert("c")  // > CustomCode.getA:40
  }  // > CustomCode.getA:41
  }  // > CustomCode.getA:42

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    // move to the top of  slope  // > Initialization.Init Page:1
    var tol = 1e-5 // need tol to ensure the event in ODE doesnt jam up  // > Initialization.Init Page:2
    x = L*Math.sin(angle)+tol  // > Initialization.Init Page:3
    y = -L*Math.cos(angle)  // > Initialization.Init Page:4
    //acuteAngle = pi-angle  // > Initialization.Init Page:5
    acuteAngle = 3*pi/2 - angle  // > Initialization.Init Page:6
    acuteAngledeg = acuteAngle*180/pi  // > Initialization.Init Page:7
    x2 = lengthHorizontalTrack+L*Math.sin(-angle2)  // > Initialization.Init Page:8
    y2 = L*Math.cos(angle2)  // > Initialization.Init Page:9
    acuteAngle2 = pi/2 + angle2  // > Initialization.Init Page:10
    acuteAngle2deg = acuteAngle2*180/pi  // > Initialization.Init Page:11
    getA ()  // > Initialization.Init Page:12
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
    //acuteAngle = pi-angle  // > FixedRelations.FixRel Page:1
    acuteAngle = 3*pi/2 - angle  // > FixedRelations.FixRel Page:2
    acuteAngle2 = pi/2 + angle2  // > FixedRelations.FixRel Page:3
    v = Math.sqrt(vx*vx+vy*vy)  // > FixedRelations.FixRel Page:4
    ke1 = 0.5*m*(vx*vx+vy*vy)  // > FixedRelations.FixRel Page:5
    v2= Math.sqrt(vx2*vx2+vy2*vy2)  // > FixedRelations.FixRel Page:6
    ke2 = 0.5*m2*(vx2*vx2+vy2*vy2)  // > FixedRelations.FixRel Page:7
    pe1 = m*g*y  // > FixedRelations.FixRel Page:8
    pe2 = m2*g*y2  // > FixedRelations.FixRel Page:9
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
    var _ODE_evolution1_Event4;
    var _ODE_evolution1_Event5;
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["x","vx","y","vy","x2","vx2","y2","vy2","t"]};

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
      if (__pagesEnabled["hit horizontal Ball1"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      if (__pagesEnabled["hit horizontal ball1"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
      if (__pagesEnabled["collision"]) __eventSolver.addEvent(_ODE_evolution1_Event3());
      if (__pagesEnabled["hit horizontal 2"]) __eventSolver.addEvent(_ODE_evolution1_Event4());
      if (__pagesEnabled["hit horizontal Ball2"]) __eventSolver.addEvent(_ODE_evolution1_Event5());
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
        if (__state[__cIn]!=x) __mustReinitialize = true;
        __state[__cIn++] = x;
        if (__state[__cIn]!=vx) __mustReinitialize = true;
        __state[__cIn++] = vx;
        if (__state[__cIn]!=y) __mustReinitialize = true;
        __state[__cIn++] = y;
        if (__state[__cIn]!=vy) __mustReinitialize = true;
        __state[__cIn++] = vy;
        if (__state[__cIn]!=x2) __mustReinitialize = true;
        __state[__cIn++] = x2;
        if (__state[__cIn]!=vx2) __mustReinitialize = true;
        __state[__cIn++] = vx2;
        if (__state[__cIn]!=y2) __mustReinitialize = true;
        __state[__cIn++] = y2;
        if (__state[__cIn]!=vy2) __mustReinitialize = true;
        __state[__cIn++] = vy2;
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
        x = __state[__cOut++];
        vx = __state[__cOut++];
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x2 = __state[__cOut++];
        vx2 = __state[__cOut++];
        y2 = __state[__cOut++];
        vy2 = __state[__cOut++];
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
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var y2 = _aState[__cOut++];
        var vy2 = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = vx; // Rate for ODE: Evol Page:x
        _aRate[__cRate++] = ax; // Rate for ODE: Evol Page:vx
        _aRate[__cRate++] = vy; // Rate for ODE: Evol Page:y
        _aRate[__cRate++] = ay; // Rate for ODE: Evol Page:vy
        _aRate[__cRate++] = vx2; // Rate for ODE: Evol Page:x2
        _aRate[__cRate++] = ax2; // Rate for ODE: Evol Page:vx2
        _aRate[__cRate++] = vy2; // Rate for ODE: Evol Page:y2
        _aRate[__cRate++] = ay2; // Rate for ODE: Evol Page:vy2
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
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var y2 = _aState[__cOut++];
        var vy2 = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x2 = __state[__cOut++];
        vx2 = __state[__cOut++];
        y2 = __state[__cOut++];
        vy2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = vx;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx2;
        __state[__cIn++] = y2;
        __state[__cIn++] = vy2;
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

      _eventSelf.getTolerance = function() { return 1.0e-2; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var y2 = _aState[__cOut++];
        var vy2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return x -0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x2 = __state[__cOut++];
        vx2 = __state[__cOut++];
        y2 = __state[__cOut++];
        vy2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = vx;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx2;
        __state[__cIn++] = y2;
        __state[__cIn++] = vy2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //_pause()  // > Event action for page Evol Page:1
        ax = 0;  // > Event action for page Evol Page:2
        ay = 0;  // > Event action for page Evol Page:3
        vy = 0;  // > Event action for page Evol Page:4
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
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var y2 = _aState[__cOut++];
        var vy2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return (y -0) || (x - 0);  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x2 = __state[__cOut++];
        vx2 = __state[__cOut++];
        y2 = __state[__cOut++];
        vy2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = vx;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx2;
        __state[__cIn++] = y2;
        __state[__cIn++] = vy2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //_pause()  // > Event action for page Evol Page:1
        y = 0 // force both x and y to zero  // > Event action for page Evol Page:2
        x = 0  // > Event action for page Evol Page:3
        ax = 0;  // > Event action for page Evol Page:4
        ay = 0;  // > Event action for page Evol Page:5
        vy = 0;  // > Event action for page Evol Page:6
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
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var y2 = _aState[__cOut++];
        var vy2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return (x +radius)- (x2-radius2);  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x2 = __state[__cOut++];
        vx2 = __state[__cOut++];
        y2 = __state[__cOut++];
        vy2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = vx;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx2;
        __state[__cIn++] = y2;
        __state[__cIn++] = vy2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause()  // > Event action for page Evol Page:1
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event4 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var y2 = _aState[__cOut++];
        var vy2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return x2 -lengthHorizontalTrack;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x2 = __state[__cOut++];
        vx2 = __state[__cOut++];
        y2 = __state[__cOut++];
        vy2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = vx;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx2;
        __state[__cIn++] = y2;
        __state[__cIn++] = vy2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //_pause()  // > Event action for page Evol Page:1
        ax2 = 0;  // > Event action for page Evol Page:2
        ay2 = 0;  // > Event action for page Evol Page:3
        vy2 = 0;  // > Event action for page Evol Page:4
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event5 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var y2 = _aState[__cOut++];
        var vy2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return (y2 -0|| x - lengthHorizontalTrack);  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x2 = __state[__cOut++];
        vx2 = __state[__cOut++];
        y2 = __state[__cOut++];
        vy2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = vx;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx2;
        __state[__cIn++] = y2;
        __state[__cIn++] = vy2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //_pause()  // > Event action for page Evol Page:1
        y2 = 0  // > Event action for page Evol Page:2
        x2 = lengthHorizontalTrack  // > Event action for page Evol Page:3
        ax2 = 0;  // > Event action for page Evol Page:4
        ay2 = 0;  // > Event action for page Evol Page:5
        vy2 = 0;  // > Event action for page Evol Page:6
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_x(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vx(__time) {
    var __index = 0 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_y(__time) {
    var __index = 0 + 1 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vy(__time) {
    var __index = 0 + 1 + 1 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_x2(__time) {
    var __index = 0 + 1 + 1 + 1 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vx2(__time) {
    var __index = 0 + 1 + 1 + 1 + 1 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_y2(__time) {
    var __index = 0 + 1 + 1 + 1 + 1 + 1 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vy2(__time) {
    var __index = 0 + 1 + 1 + 1 + 1 + 1 + 1 + 1;
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
    _view = new rolling2balls_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.control.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'control'
          _view.checkBoxshowa2.linkProperty("Checked",  function() { return showa; }, function(_v) { showa = _v; } ); // HtmlView Page linking property 'Checked' for element 'checkBoxshowa2'
          _view.checkBoxshowa.linkProperty("Checked",  function() { return showv; }, function(_v) { showv = _v; } ); // HtmlView Page linking property 'Checked' for element 'checkBoxshowa'
          _view.field4.linkProperty("Value",  function() { return lengthHorizontalTrack; }, function(_v) { lengthHorizontalTrack = _v; } ); // HtmlView Page linking property 'Value' for element 'field4'
          _view.field4.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'field4'
          _view.slider2.linkProperty("Value",  function() { return lengthHorizontalTrack; }, function(_v) { lengthHorizontalTrack = _v; } ); // HtmlView Page linking property 'Value' for element 'slider2'
          _view.slider2.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'slider2'
          _view.slider.linkProperty("Value",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'Value' for element 'slider'
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
          _view.field.linkProperty("Value",  function() { return acuteAngledeg; }, function(_v) { acuteAngledeg = _v; } ); // HtmlView Page linking property 'Value' for element 'field'
          _view.field.setAction("OnChange", function(_data,_info) {
  acuteAngle = acuteAngledeg /180 *pi
   //acuteAngle*180/pi
  //acuteAngle =3*pi/2 - angle
  angle = 3*pi/2 -acuteAngle
  x = L*Math.sin(angle)
  y = -L*Math.cos(angle)
  getA ();

}); // HtmlView Page setting action 'OnChange' for element 'field'
          _view.sliderangle.linkProperty("Minimum",  function() { return pi; }, function(_v) { pi = _v; } ); // HtmlView Page linking property 'Minimum' for element 'sliderangle'
          _view.sliderangle.linkProperty("Maximum",  function() { return 3*pi/2; } ); // HtmlView Page linking property 'Maximum' for element 'sliderangle'
          _view.sliderangle.linkProperty("Value",  function() { return angle; }, function(_v) { angle = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderangle'
          _view.sliderangle.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'sliderangle'
          _view.sliderangle.linkProperty("Step",  function() { return pi/30; } ); // HtmlView Page linking property 'Step' for element 'sliderangle'
          _view.field2.linkProperty("Value",  function() { return acuteAngle2deg; }, function(_v) { acuteAngle2deg = _v; } ); // HtmlView Page linking property 'Value' for element 'field2'
          _view.field2.setAction("OnChange", function(_data,_info) {
  acuteAngle2 = acuteAngle2deg /180 *pi
   //acuteAngle*180/pi
  //acuteAngle =3*pi/2 - angle
  angle2 = acuteAngle2 - pi/2
  x2 = lengthHorizontalTrack+L*Math.sin(-angle2)
  y2 = L*Math.cos(angle2)
  getA ()
  //x2 = lengthHorizontalTrack+L*Math.sin(-angle2)
  //y2 = L*Math.cos(angle2)
  //acuteAngle2 = pi/2 + angle2;

}); // HtmlView Page setting action 'OnChange' for element 'field2'
          _view.sliderangle2.linkProperty("Minimum",  function() { return -pi/2; } ); // HtmlView Page linking property 'Minimum' for element 'sliderangle2'
          _view.sliderangle2.linkProperty("Value",  function() { return angle2; }, function(_v) { angle2 = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderangle2'
          _view.sliderangle2.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'sliderangle2'
          _view.sliderangle2.linkProperty("Step",  function() { return pi/30; } ); // HtmlView Page linking property 'Step' for element 'sliderangle2'
          _view.field3.linkProperty("Value",  function() { return m; }, function(_v) { m = _v; } ); // HtmlView Page linking property 'Value' for element 'field3'
          _view.field3.setAction("OnChange", function(_data,_info) {
  acuteAngle = acuteAngledeg /180 *pi
   //acuteAngle*180/pi
  //acuteAngle =3*pi/2 - angle
  angle = 3*pi/2 -acuteAngle
  x = L*Math.sin(angle)
  y = -L*Math.cos(angle)
  getA ();

}); // HtmlView Page setting action 'OnChange' for element 'field3'
          _view.sliderangle3.linkProperty("Value",  function() { return m; }, function(_v) { m = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderangle3'
          _view.sliderangle3.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'sliderangle3'
          _view.field22.linkProperty("Value",  function() { return m2; }, function(_v) { m2 = _v; } ); // HtmlView Page linking property 'Value' for element 'field22'
          _view.field22.setAction("OnChange", function(_data,_info) {
  acuteAngle2 = acuteAngle2deg /180 *pi
   //acuteAngle*180/pi
  //acuteAngle =3*pi/2 - angle
  angle2 = acuteAngle2 - pi/2
  x2 = lengthHorizontalTrack+L*Math.sin(-angle2)
  y2 = L*Math.cos(angle2)
  getA ()
  //x2 = lengthHorizontalTrack+L*Math.sin(-angle2)
  //y2 = L*Math.cos(angle2)
  //acuteAngle2 = pi/2 + angle2;

}); // HtmlView Page setting action 'OnChange' for element 'field22'
          _view.sliderangle22.linkProperty("Value",  function() { return m2; }, function(_v) { m2 = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderangle22'
          _view.sliderangle22.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'sliderangle22'
          _view.field32.linkProperty("Value",  function() { return radius; }, function(_v) { radius = _v; } ); // HtmlView Page linking property 'Value' for element 'field32'
          _view.field32.setAction("OnChange", function(_data,_info) {
  acuteAngle = acuteAngledeg /180 *pi
   //acuteAngle*180/pi
  //acuteAngle =3*pi/2 - angle
  angle = 3*pi/2 -acuteAngle
  x = L*Math.sin(angle)
  y = -L*Math.cos(angle)
  getA ();

}); // HtmlView Page setting action 'OnChange' for element 'field32'
          _view.sliderangle32.linkProperty("Value",  function() { return radius; }, function(_v) { radius = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderangle32'
          _view.sliderangle32.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'sliderangle32'
          _view.field222.linkProperty("Value",  function() { return radius2; }, function(_v) { radius2 = _v; } ); // HtmlView Page linking property 'Value' for element 'field222'
          _view.field222.setAction("OnChange", function(_data,_info) {
  acuteAngle2 = acuteAngle2deg /180 *pi
   //acuteAngle*180/pi
  //acuteAngle =3*pi/2 - angle
  angle2 = acuteAngle2 - pi/2
  x2 = lengthHorizontalTrack+L*Math.sin(-angle2)
  y2 = L*Math.cos(angle2)
  getA ()
  //x2 = lengthHorizontalTrack+L*Math.sin(-angle2)
  //y2 = L*Math.cos(angle2)
  //acuteAngle2 = pi/2 + angle2;

}); // HtmlView Page setting action 'OnChange' for element 'field222'
          _view.sliderangle222.linkProperty("Value",  function() { return radius2; }, function(_v) { radius2 = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderangle222'
          _view.sliderangle222.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'sliderangle222'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();

}); // HtmlView Page setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return Math.max(lengthHorizontalTrack,2)+L+offsetEnergyBar+4; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return -L; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return "Legend: G= gravitational potential store, K= kinetic store"+"\nt = "+_view._format(t,"0.00")+ " s "; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanel'
          _view.shapeBall1.linkProperty("SizeX",  function() { return radius*2; } ); // HtmlView Page linking property 'SizeX' for element 'shapeBall1'
          _view.shapeBall1.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'shapeBall1'
          _view.shapeBall1.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeBall1'
          _view.shapeBall1.linkProperty("SizeY",  function() { return radius*2; } ); // HtmlView Page linking property 'SizeY' for element 'shapeBall1'
          _view.arrow.linkProperty("SizeX",  function() { return ax*factorForA; } ); // HtmlView Page linking property 'SizeX' for element 'arrow'
          _view.arrow.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'arrow'
          _view.arrow.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'arrow'
          _view.arrow.linkProperty("Visibility",  function() { return showa; }, function(_v) { showa = _v; } ); // HtmlView Page linking property 'Visibility' for element 'arrow'
          _view.arrow.linkProperty("SizeY",  function() { return ay*factorForA; } ); // HtmlView Page linking property 'SizeY' for element 'arrow'
          _view.arrowv.linkProperty("SizeX",  function() { return vx*factorForV; } ); // HtmlView Page linking property 'SizeX' for element 'arrowv'
          _view.arrowv.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'arrowv'
          _view.arrowv.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'arrowv'
          _view.arrowv.linkProperty("Visibility",  function() { return showv; }, function(_v) { showv = _v; } ); // HtmlView Page linking property 'Visibility' for element 'arrowv'
          _view.arrowv.linkProperty("SizeY",  function() { return vy*factorForV; } ); // HtmlView Page linking property 'SizeY' for element 'arrowv'
          _view.shapeBall2.linkProperty("SizeX",  function() { return radius2*2; } ); // HtmlView Page linking property 'SizeX' for element 'shapeBall2'
          _view.shapeBall2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'shapeBall2'
          _view.shapeBall2.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeBall2'
          _view.shapeBall2.linkProperty("SizeY",  function() { return radius2*2; } ); // HtmlView Page linking property 'SizeY' for element 'shapeBall2'
          _view.arrow2.linkProperty("SizeX",  function() { return ax2*factorForA; } ); // HtmlView Page linking property 'SizeX' for element 'arrow2'
          _view.arrow2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'arrow2'
          _view.arrow2.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView Page linking property 'Y' for element 'arrow2'
          _view.arrow2.linkProperty("Visibility",  function() { return showa; }, function(_v) { showa = _v; } ); // HtmlView Page linking property 'Visibility' for element 'arrow2'
          _view.arrow2.linkProperty("SizeY",  function() { return ay2*factorForA; } ); // HtmlView Page linking property 'SizeY' for element 'arrow2'
          _view.arrowv2.linkProperty("SizeX",  function() { return vx2*factorForV; } ); // HtmlView Page linking property 'SizeX' for element 'arrowv2'
          _view.arrowv2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'arrowv2'
          _view.arrowv2.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView Page linking property 'Y' for element 'arrowv2'
          _view.arrowv2.linkProperty("Visibility",  function() { return showv; }, function(_v) { showv = _v; } ); // HtmlView Page linking property 'Visibility' for element 'arrowv2'
          _view.arrowv2.linkProperty("SizeY",  function() { return vy2*factorForV; } ); // HtmlView Page linking property 'SizeY' for element 'arrowv2'
          _view.segmentHorizontalRamp.linkProperty("SizeX",  function() { return lengthHorizontalTrack; }, function(_v) { lengthHorizontalTrack = _v; } ); // HtmlView Page linking property 'SizeX' for element 'segmentHorizontalRamp'
          _view.segmentHorizontalRamp.linkProperty("Y",  function() { return -radius; } ); // HtmlView Page linking property 'Y' for element 'segmentHorizontalRamp'
          _view.segmentHorizontalRamp2.linkProperty("SizeX",  function() { return lengthHorizontalTrack; }, function(_v) { lengthHorizontalTrack = _v; } ); // HtmlView Page linking property 'SizeX' for element 'segmentHorizontalRamp2'
          _view.segmentHorizontalRamp2.linkProperty("Y",  function() { return -radius2; } ); // HtmlView Page linking property 'Y' for element 'segmentHorizontalRamp2'
          _view.leftRamp.linkProperty("SizeX",  function() { return L*Math.sin(angle); } ); // HtmlView Page linking property 'SizeX' for element 'leftRamp'
          _view.leftRamp.linkProperty("X",  function() { return radius*Math.cos(angle); } ); // HtmlView Page linking property 'X' for element 'leftRamp'
          _view.leftRamp.linkProperty("Y",  function() { return radius*Math.sin(angle); } ); // HtmlView Page linking property 'Y' for element 'leftRamp'
          _view.leftRamp.linkProperty("SizeY",  function() { return -L*Math.cos(angle); } ); // HtmlView Page linking property 'SizeY' for element 'leftRamp'
          _view.startofRamp.linkProperty("X",  function() { return radius*Math.cos(angle); } ); // HtmlView Page linking property 'X' for element 'startofRamp'
          _view.startofRamp.linkProperty("Y",  function() { return radius*Math.sin(angle); } ); // HtmlView Page linking property 'Y' for element 'startofRamp'
          _view.offset.linkProperty("X",  function() { return lengthHorizontalTrack; }, function(_v) { lengthHorizontalTrack = _v; } ); // HtmlView Page linking property 'X' for element 'offset'
          _view.rightRamp2.linkProperty("SizeX",  function() { return -L*Math.sin(angle2); } ); // HtmlView Page linking property 'SizeX' for element 'rightRamp2'
          _view.rightRamp2.linkProperty("X",  function() { return radius2*Math.cos(angle2); } ); // HtmlView Page linking property 'X' for element 'rightRamp2'
          _view.rightRamp2.linkProperty("Y",  function() { return radius2*Math.sin(angle2); } ); // HtmlView Page linking property 'Y' for element 'rightRamp2'
          _view.rightRamp2.linkProperty("SizeY",  function() { return L*Math.cos(angle2); } ); // HtmlView Page linking property 'SizeY' for element 'rightRamp2'
          _view.energystores.linkProperty("X",  function() { return lengthHorizontalTrack+offsetEnergyBar; } ); // HtmlView Page linking property 'X' for element 'energystores'
          _view.KE.linkProperty("SizeY",  function() { return ke1; }, function(_v) { ke1 = _v; } ); // HtmlView Page linking property 'SizeY' for element 'KE'
          _view.ke.linkProperty("Text",  function() { return "K1 = 0.5*m*v^2 \n=0.5*"+m.toFixed(2)+"*"+v.toFixed(2)+"^2\n="+ke1.toFixed(2) + " J"; } ); // HtmlView Page linking property 'Text' for element 'ke'
          _view.ke2.linkProperty("Text",  function() { return "K2 = 0.5*m2*v2^2 \n=0.5*"+m2.toFixed(2)+"*"+v2.toFixed(2)+"^2\n="+ke2.toFixed(2) + " J"; } ); // HtmlView Page linking property 'Text' for element 'ke2'
          _view.pe.linkProperty("Text",  function() { return "G1 = m*g*y1 \n="+ m.toFixed(2)+"*"+g.toFixed(2)+"*"+y.toFixed(2)+"\n="+pe1.toFixed(2) + " J"; } ); // HtmlView Page linking property 'Text' for element 'pe'
          _view.pe2.linkProperty("Text",  function() { return "G2 = m2*g*y2 \n="+ m2.toFixed(2)+"*"+g.toFixed(2)+"*"+y2.toFixed(2)+"\n="+pe2.toFixed(2) + " J"; } ); // HtmlView Page linking property 'Text' for element 'pe2'
          _view.KE2.linkProperty("SizeY",  function() { return ke2; }, function(_v) { ke2 = _v; } ); // HtmlView Page linking property 'SizeY' for element 'KE2'
          _view.PE3.linkProperty("SizeY",  function() { return pe1; }, function(_v) { pe1 = _v; } ); // HtmlView Page linking property 'SizeY' for element 'PE3'
          _view.PE32.linkProperty("SizeY",  function() { return pe2; }, function(_v) { pe2 = _v; } ); // HtmlView Page linking property 'SizeY' for element 'PE32'
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
function rolling2balls_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = rolling2balls_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function rolling2balls_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'controlPanel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBoxshowa2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'checkBoxshowa2'
      .setProperty("Text","Show a") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'checkBoxshowa2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'checkBoxshowa2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBoxshowa", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'checkBoxshowa'
      .setProperty("Text","Show v") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'checkBoxshowa'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"LengthofRamp", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'LengthofRamp'
      .setProperty("Text","Horizontal Track =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'LengthofRamp'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field4", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'field4'
      .setProperty("Width","5%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field4'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field4'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"m", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'm'
      .setProperty("Text"," m ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'm'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'slider2'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'slider2'
      .setProperty("Minimum",1) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'slider2'
      .setProperty("Maximum",5) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'slider2'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'slider2'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'slider2'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'slider2'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'slider'
      .setProperty("Minimum",1) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'slider'
      .setProperty("Maximum",6) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'slider'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'slider'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'slider'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'slider'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'slider'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","15%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton2'
      .setProperty("Width","15%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'stepButton2'
      .setProperty("Text","Step|►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Width","15%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton3'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel2'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel3", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'panel3'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel3'
      .setProperty("Background","Green") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'panel3'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      .setProperty("Text","Inclined Angle =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'field'
      .setProperty("Width","7%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"deg", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'deg'
      .setProperty("Text"," ° ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'deg'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderangle", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderangle'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'sliderangle'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'sliderangle'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'sliderangle'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel32", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'panel32'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel32'
      .setProperty("Background","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'panel32'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'panel32'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label2", _view.panel32) // EJsS HtmlView.HtmlView Page: declaration of element 'label2'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'label2'
      .setProperty("Text","Inclined Angle2 =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label2'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field2", _view.panel32) // EJsS HtmlView.HtmlView Page: declaration of element 'field2'
      .setProperty("Width","7%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field2'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"deg2", _view.panel32) // EJsS HtmlView.HtmlView Page: declaration of element 'deg2'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'deg2'
      .setProperty("Text"," ° ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'deg2'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderangle2", _view.panel32) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderangle2'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'sliderangle2'
      .setProperty("Maximum",0) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderangle2'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'sliderangle2'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'sliderangle2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"mass", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'mass'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'mass'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'mass'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel33", _view.mass) // EJsS HtmlView.HtmlView Page: declaration of element 'panel33'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel33'
      .setProperty("Background","Green") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'panel33'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label3", _view.panel33) // EJsS HtmlView.HtmlView Page: declaration of element 'label3'
      .setProperty("Text","Mass =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label3'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field3", _view.panel33) // EJsS HtmlView.HtmlView Page: declaration of element 'field3'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field3'
      .setProperty("Format","0.000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field3'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"kg", _view.panel33) // EJsS HtmlView.HtmlView Page: declaration of element 'kg'
      .setProperty("Text"," kg ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'kg'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderangle3", _view.panel33) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderangle3'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'sliderangle3'
      .setProperty("Minimum",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderangle3'
      .setProperty("Maximum",1) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderangle3'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'sliderangle3'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'sliderangle3'
      .setProperty("Step",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderangle3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel322", _view.mass) // EJsS HtmlView.HtmlView Page: declaration of element 'panel322'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel322'
      .setProperty("Background","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'panel322'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'panel322'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label22", _view.panel322) // EJsS HtmlView.HtmlView Page: declaration of element 'label22'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'label22'
      .setProperty("Text","Mass2 =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label22'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field22", _view.panel322) // EJsS HtmlView.HtmlView Page: declaration of element 'field22'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field22'
      .setProperty("Format","0.000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field22'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"kg2", _view.panel322) // EJsS HtmlView.HtmlView Page: declaration of element 'kg2'
      .setProperty("Foreground","white") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'kg2'
      .setProperty("Text"," kg ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'kg2'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderangle22", _view.panel322) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderangle22'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'sliderangle22'
      .setProperty("Minimum",0.01) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderangle22'
      .setProperty("Maximum",1) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderangle22'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'sliderangle22'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'sliderangle22'
      .setProperty("Step",0.01) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderangle22'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"R", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'R'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'R'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'R'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel332", _view.R) // EJsS HtmlView.HtmlView Page: declaration of element 'panel332'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel332'
      .setProperty("Background","Green") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'panel332'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label32", _view.panel332) // EJsS HtmlView.HtmlView Page: declaration of element 'label32'
      .setProperty("Text","Radius =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label32'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field32", _view.panel332) // EJsS HtmlView.HtmlView Page: declaration of element 'field32'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field32'
      .setProperty("Format","0.000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field32'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"m2", _view.panel332) // EJsS HtmlView.HtmlView Page: declaration of element 'm2'
      .setProperty("Text"," m ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'm2'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderangle32", _view.panel332) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderangle32'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'sliderangle32'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderangle32'
      .setProperty("Maximum",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderangle32'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'sliderangle32'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'sliderangle32'
      .setProperty("Step",0.001) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderangle32'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel3222", _view.R) // EJsS HtmlView.HtmlView Page: declaration of element 'panel3222'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel3222'
      .setProperty("Background","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'panel3222'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'panel3222'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label222", _view.panel3222) // EJsS HtmlView.HtmlView Page: declaration of element 'label222'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'label222'
      .setProperty("Text","Radius2 =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label222'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field222", _view.panel3222) // EJsS HtmlView.HtmlView Page: declaration of element 'field222'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field222'
      .setProperty("Format","0.000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field222'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"kg22", _view.panel3222) // EJsS HtmlView.HtmlView Page: declaration of element 'kg22'
      .setProperty("Foreground","white") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'kg22'
      .setProperty("Text"," m ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'kg22'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderangle222", _view.panel3222) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderangle222'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'sliderangle222'
      .setProperty("Minimum",0.01) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderangle222'
      .setProperty("Maximum",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderangle222'
      .setProperty("ShowText",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'sliderangle222'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'sliderangle222'
      .setProperty("Step",0.01) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderangle222'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","70vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("TRMessage","2 Sphere Balls Collision Release From Rest on Slope Model") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("TLMessage","Using the physics equations of motion, predict the position of collision") // EJsS HtmlView.HtmlView Page: setting property 'TLMessage' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumY",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanel'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shapeBall1", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeBall1'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeBall1'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow'
      .setProperty("MarkEnd","POINTED") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow'
      .setProperty("MarkMiddle","POINTED") // EJsS HtmlView.HtmlView Page: setting property 'MarkMiddle' for element 'arrow'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'arrow'
      .setProperty("PixelSize",false) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'arrow'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowv", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowv'
      .setProperty("MarkEnd","ANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrowv'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'arrowv'
      .setProperty("PixelSize",false) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'arrowv'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shapeBall2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeBall2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow2'
      .setProperty("MarkEnd","POINTED") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow2'
      .setProperty("MarkMiddle","POINTED") // EJsS HtmlView.HtmlView Page: setting property 'MarkMiddle' for element 'arrow2'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'arrow2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowv2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowv2'
      .setProperty("MarkEnd","ANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrowv2'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'arrowv2'
      .setProperty("PixelSize",false) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'arrowv2'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"segmentHorizontalRamp", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'segmentHorizontalRamp'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'segmentHorizontalRamp'
      .setProperty("LineColor","Gray") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'segmentHorizontalRamp'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'segmentHorizontalRamp'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'segmentHorizontalRamp'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"segmentHorizontalRamp2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'segmentHorizontalRamp2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'segmentHorizontalRamp2'
      .setProperty("LineColor","Gray") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'segmentHorizontalRamp2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'segmentHorizontalRamp2'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'segmentHorizontalRamp2'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"leftRamp", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'leftRamp'
      .setProperty("LineColor","Gray") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'leftRamp'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'leftRamp'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"startofRamp", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'startofRamp'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'startofRamp'
      .setProperty("SizeX",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'startofRamp'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'startofRamp'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'startofRamp'
      .setProperty("SizeY",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'startofRamp'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'startofRamp'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offset", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'offset'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'offset'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"rightRamp2", _view.offset) // EJsS HtmlView.HtmlView Page: declaration of element 'rightRamp2'
      .setProperty("LineColor","Gray") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'rightRamp2'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'rightRamp2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"energystores", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'energystores'
      .setProperty("SizeY",0.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'energystores'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"KE", _view.energystores) // EJsS HtmlView.HtmlView Page: declaration of element 'KE'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'KE'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'KE'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'KE'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'KE'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'KE'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'KE'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsety", _view.energystores) // EJsS HtmlView.HtmlView Page: declaration of element 'offsety'
      .setProperty("Y",-0.2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'offsety'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"ke", _view.offsety) // EJsS HtmlView.HtmlView Page: declaration of element 'ke'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'ke'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'ke'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'ke'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"ke2", _view.offsety) // EJsS HtmlView.HtmlView Page: declaration of element 'ke2'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'ke2'
      .setProperty("X",1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'ke2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'ke2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"pe", _view.offsety) // EJsS HtmlView.HtmlView Page: declaration of element 'pe'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'pe'
      .setProperty("X",2) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'pe'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'pe'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"pe2", _view.offsety) // EJsS HtmlView.HtmlView Page: declaration of element 'pe2'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'pe2'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'pe2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'pe2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"KE2", _view.energystores) // EJsS HtmlView.HtmlView Page: declaration of element 'KE2'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'KE2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'KE2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'KE2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'KE2'
      .setProperty("X",1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'KE2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'KE2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"PE3", _view.energystores) // EJsS HtmlView.HtmlView Page: declaration of element 'PE3'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'PE3'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'PE3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'PE3'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'PE3'
      .setProperty("X",2) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'PE3'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'PE3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"PE32", _view.energystores) // EJsS HtmlView.HtmlView Page: declaration of element 'PE32'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'PE32'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'PE32'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'PE32'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'PE32'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'PE32'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'PE32'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h2>1. Understanding Gravitational Potential Energy Store</h2> <p><strong>Question:</strong> Observe the Gravitational Potential Energy Store (G) of both spheres before they start moving down the slopes. How is the Gravitational Potential Energy Store related to the height of each sphere on the slope?</p> <p><strong>Follow-up:</strong> Predict how the Gravitational Potential Energy Store will change as each sphere rolls down the slope and explain your reasoning.</p> <h2>2. Comparing Kinetic Energy Store</h2> <p><strong>Question:</strong> As the spheres roll down their respective slopes, how does their Kinetic Energy Store (K) change? Compare the Kinetic Energy Stores of the two spheres when they reach the horizontal track.</p> <p><strong>Follow-up:</strong> Based on your observations, what factors influence the amount of Kinetic Energy Store each sphere has at the bottom of the slope?</p> <h2>3. Effect of Slope Angle on Speed</h2> <p><strong>Question:</strong> Adjust the inclined angle of one slope to be steeper than the other. How does changing the slope angle affect the speed of the sphere at the bottom of the slope? Explain your observations using the concepts of Gravitational Potential Energy Store and Kinetic Energy Store.</p> <p><strong>Follow-up:</strong> What do you predict will happen to the position of collision if one slope is steeper than the other? Justify your answer.</p> <h2>4. Investigating the Impact of Mass</h2> <p><strong>Question:</strong> Set both slopes to the same angle, but give the two spheres different masses. How does the mass of each sphere affect the speed and Kinetic Energy Store at the bottom of the slope? Does mass influence the position of the collision?</p> <p><strong>Follow-up:</strong> Why does the mass of the spheres not affect their acceleration down the slope, even though it does influence their Kinetic Energy Store?</p> <h2>5. Investigating the Radius of the Balls</h2> <p><strong>Question:</strong> Adjust the radius of each sphere. How does changing the radius affect the speed and Kinetic Energy Store of the spheres as they reach the bottom of the slope?</p> <p><strong>Follow-up:</strong> How does the radius of the spheres influence the collision position? Consider the moment of inertia in your explanation.</p> <h2>6. Analyzing the Collision Position</h2> <p><strong>Question:</strong> Using the physics equations of motion and the energy principles, predict the position where the two spheres will collide. How accurate is your prediction compared to the simulation result?</p> <p><strong>Follow-up:</strong> What adjustments would you make to your calculations or the simulation parameters to improve the accuracy of your prediction?</p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new rolling2balls("_topFrame","_ejs_library/",null);
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
