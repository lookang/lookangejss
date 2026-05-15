/* _inputParameters: an object with different values for the model parameters */
function newtonscadlerealwee(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var range; // EjsS Model.Variables.coordinate.range
  var xmin; // EjsS Model.Variables.coordinate.xmin
  var xmax; // EjsS Model.Variables.coordinate.xmax
  var ymin; // EjsS Model.Variables.coordinate.ymin
  var ymax; // EjsS Model.Variables.coordinate.ymax
  var t; // EjsS Model.Variables.coordinate.t
  var dt; // EjsS Model.Variables.coordinate.dt
  var size; // EjsS Model.Variables.coordinate.size
  var size2; // EjsS Model.Variables.coordinate.size2
  var stroke; // EjsS Model.Variables.coordinate.stroke
  var pi; // EjsS Model.Variables.coordinate.pi
  var L; // EjsS Model.Variables.coordinate.L
  var g; // EjsS Model.Variables.coordinate.g
  var TOLERANCE; // EjsS Model.Variables.coordinate.TOLERANCE
  var vscale; // EjsS Model.Variables.coordinate.vscale
  var sound; // EjsS Model.Variables.coordinate.sound

  var n; // EjsS Model.Variables.basic.n
  var n1; // EjsS Model.Variables.basic.n1
  var cid; // EjsS Model.Variables.basic.cid
  var m; // EjsS Model.Variables.basic.m
  var cta; // EjsS Model.Variables.basic.cta
  var omega; // EjsS Model.Variables.basic.omega
  var x; // EjsS Model.Variables.basic.x
  var y; // EjsS Model.Variables.basic.y
  var z; // EjsS Model.Variables.basic.z
  var xc; // EjsS Model.Variables.basic.xc
  var dx; // EjsS Model.Variables.basic.dx
  var dy; // EjsS Model.Variables.basic.dy
  var vx; // EjsS Model.Variables.basic.vx
  var vy; // EjsS Model.Variables.basic.vy
  var l_m; // EjsS Model.Variables.basic.l_m
  var v1; // EjsS Model.Variables.basic.v1
  var v2; // EjsS Model.Variables.basic.v2
  var va; // EjsS Model.Variables.basic.va
  var vb; // EjsS Model.Variables.basic.vb
  var m1; // EjsS Model.Variables.basic.m1
  var m2; // EjsS Model.Variables.basic.m2

  var l_play; // EjsS Model.Variables.language.l_play
  var l_pause; // EjsS Model.Variables.language.l_pause
  var l_reset; // EjsS Model.Variables.language.l_reset
  var l_init; // EjsS Model.Variables.language.l_init
  var label; // EjsS Model.Variables.language.label
  var l_step; // EjsS Model.Variables.language.l_step
  var l_id; // EjsS Model.Variables.language.l_id
  var l_mass; // EjsS Model.Variables.language.l_mass

  var id; // EjsS Model.Variables.control.id
  var mi; // EjsS Model.Variables.control.mi

  var ballMass; // EjsS Model.Variables.lookang.ballMass
  var ballMoved; // EjsS Model.Variables.lookang.ballMoved
  var maxAngle; // EjsS Model.Variables.lookang.maxAngle
  var k; // EjsS Model.Variables.lookang.k
  var mom; // EjsS Model.Variables.lookang.mom
  var KE; // EjsS Model.Variables.lookang.KE
  var PE; // EjsS Model.Variables.lookang.PE
  var TE; // EjsS Model.Variables.lookang.TE
  var tetotal; // EjsS Model.Variables.lookang.tetotal
  var petotal; // EjsS Model.Variables.lookang.petotal
  var ketotal; // EjsS Model.Variables.lookang.ketotal
  var momtotal; // EjsS Model.Variables.lookang.momtotal
  var text1; // EjsS Model.Variables.lookang.text1
  var text; // EjsS Model.Variables.lookang.text
  var selected; // EjsS Model.Variables.lookang.selected

  var graph; // EjsS Model.Variables.boolean.graph
  var hint; // EjsS Model.Variables.boolean.hint
  var threeD; // EjsS Model.Variables.boolean.threeD
  var twoD; // EjsS Model.Variables.boolean.twoD
  var mode; // EjsS Model.Variables.boolean.mode
  var tetotalb; // EjsS Model.Variables.boolean.tetotalb
  var petotalb; // EjsS Model.Variables.boolean.petotalb
  var ketotalb; // EjsS Model.Variables.boolean.ketotalb
  var show; // EjsS Model.Variables.boolean.show

  var font; // EjsS Model.Variables.layout.font
  var iOS; // EjsS Model.Variables.layout.iOS
  var iPad; // EjsS Model.Variables.layout.iPad
  var iPhone; // EjsS Model.Variables.layout.iPhone
  var Android; // EjsS Model.Variables.layout.Android
  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var xvst; // EjsS Model.Variables.layout.xvst
  var vvst; // EjsS Model.Variables.layout.vvst
  var avst; // EjsS Model.Variables.layout.avst
  var kevst; // EjsS Model.Variables.layout.kevst
  var pevst; // EjsS Model.Variables.layout.pevst
  var tevst; // EjsS Model.Variables.layout.tevst
  var world; // EjsS Model.Variables.layout.world
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var disabled; // EjsS Model.Variables.layout.disabled
  var autoscaley; // EjsS Model.Variables.layout.autoscaley

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
      range : range,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      t : t,
      dt : dt,
      size : size,
      size2 : size2,
      stroke : stroke,
      pi : pi,
      L : L,
      g : g,
      TOLERANCE : TOLERANCE,
      vscale : vscale,
      sound : sound,
      n : n,
      n1 : n1,
      cid : cid,
      m : m,
      cta : cta,
      omega : omega,
      x : x,
      y : y,
      z : z,
      xc : xc,
      dx : dx,
      dy : dy,
      vx : vx,
      vy : vy,
      l_m : l_m,
      v1 : v1,
      v2 : v2,
      va : va,
      vb : vb,
      m1 : m1,
      m2 : m2,
      l_play : l_play,
      l_pause : l_pause,
      l_reset : l_reset,
      l_init : l_init,
      label : label,
      l_step : l_step,
      l_id : l_id,
      l_mass : l_mass,
      id : id,
      mi : mi,
      ballMass : ballMass,
      ballMoved : ballMoved,
      maxAngle : maxAngle,
      k : k,
      mom : mom,
      KE : KE,
      PE : PE,
      TE : TE,
      tetotal : tetotal,
      petotal : petotal,
      ketotal : ketotal,
      momtotal : momtotal,
      text1 : text1,
      text : text,
      selected : selected,
      graph : graph,
      hint : hint,
      threeD : threeD,
      twoD : twoD,
      mode : mode,
      tetotalb : tetotalb,
      petotalb : petotalb,
      ketotalb : ketotalb,
      show : show,
      font : font,
      iOS : iOS,
      iPad : iPad,
      iPhone : iPhone,
      Android : Android,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      xvst : xvst,
      vvst : vvst,
      avst : avst,
      kevst : kevst,
      pevst : pevst,
      tevst : tevst,
      world : world,
      disabledworld : disabledworld,
      disabled : disabled,
      autoscaley : autoscaley
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {

    };
  };

  _model._readParameters = function(json) {
    if(typeof json.range != "undefined") range = json.range;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.size2 != "undefined") size2 = json.size2;
    if(typeof json.stroke != "undefined") stroke = json.stroke;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.L != "undefined") L = json.L;
    if(typeof json.g != "undefined") g = json.g;
    if(typeof json.TOLERANCE != "undefined") TOLERANCE = json.TOLERANCE;
    if(typeof json.vscale != "undefined") vscale = json.vscale;
    if(typeof json.sound != "undefined") sound = json.sound;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.n1 != "undefined") n1 = json.n1;
    if(typeof json.cid != "undefined") cid = json.cid;
    if(typeof json.m != "undefined") m = json.m;
    if(typeof json.cta != "undefined") cta = json.cta;
    if(typeof json.omega != "undefined") omega = json.omega;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.z != "undefined") z = json.z;
    if(typeof json.xc != "undefined") xc = json.xc;
    if(typeof json.dx != "undefined") dx = json.dx;
    if(typeof json.dy != "undefined") dy = json.dy;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.l_m != "undefined") l_m = json.l_m;
    if(typeof json.v1 != "undefined") v1 = json.v1;
    if(typeof json.v2 != "undefined") v2 = json.v2;
    if(typeof json.va != "undefined") va = json.va;
    if(typeof json.vb != "undefined") vb = json.vb;
    if(typeof json.m1 != "undefined") m1 = json.m1;
    if(typeof json.m2 != "undefined") m2 = json.m2;
    if(typeof json.l_play != "undefined") l_play = json.l_play;
    if(typeof json.l_pause != "undefined") l_pause = json.l_pause;
    if(typeof json.l_reset != "undefined") l_reset = json.l_reset;
    if(typeof json.l_init != "undefined") l_init = json.l_init;
    if(typeof json.label != "undefined") label = json.label;
    if(typeof json.l_step != "undefined") l_step = json.l_step;
    if(typeof json.l_id != "undefined") l_id = json.l_id;
    if(typeof json.l_mass != "undefined") l_mass = json.l_mass;
    if(typeof json.id != "undefined") id = json.id;
    if(typeof json.mi != "undefined") mi = json.mi;
    if(typeof json.ballMass != "undefined") ballMass = json.ballMass;
    if(typeof json.ballMoved != "undefined") ballMoved = json.ballMoved;
    if(typeof json.maxAngle != "undefined") maxAngle = json.maxAngle;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.mom != "undefined") mom = json.mom;
    if(typeof json.KE != "undefined") KE = json.KE;
    if(typeof json.PE != "undefined") PE = json.PE;
    if(typeof json.TE != "undefined") TE = json.TE;
    if(typeof json.tetotal != "undefined") tetotal = json.tetotal;
    if(typeof json.petotal != "undefined") petotal = json.petotal;
    if(typeof json.ketotal != "undefined") ketotal = json.ketotal;
    if(typeof json.momtotal != "undefined") momtotal = json.momtotal;
    if(typeof json.text1 != "undefined") text1 = json.text1;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.hint != "undefined") hint = json.hint;
    if(typeof json.threeD != "undefined") threeD = json.threeD;
    if(typeof json.twoD != "undefined") twoD = json.twoD;
    if(typeof json.mode != "undefined") mode = json.mode;
    if(typeof json.tetotalb != "undefined") tetotalb = json.tetotalb;
    if(typeof json.petotalb != "undefined") petotalb = json.petotalb;
    if(typeof json.ketotalb != "undefined") ketotalb = json.ketotalb;
    if(typeof json.show != "undefined") show = json.show;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
    if(typeof json.Android != "undefined") Android = json.Android;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.xvst != "undefined") xvst = json.xvst;
    if(typeof json.vvst != "undefined") vvst = json.vvst;
    if(typeof json.avst != "undefined") avst = json.avst;
    if(typeof json.kevst != "undefined") kevst = json.kevst;
    if(typeof json.pevst != "undefined") pevst = json.pevst;
    if(typeof json.tevst != "undefined") tevst = json.tevst;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.autoscaley != "undefined") autoscaley = json.autoscaley;
  };

  _model._readParametersPublic = function(json) {
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
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["Axes"] = true;
    __pagesEnabled["Init Page 2"] = true;
    __pagesEnabled["svgradial"] = true;
    __pagesEnabled["Init Page 3"] = true;
    __pagesEnabled["Init Page 4"] = true;
    __pagesEnabled["ODE"] = true;
    __pagesEnabled["¨Æ¥ó"] = true;
    __pagesEnabled["Ãö«Y¦¡"] = true;
    __pagesEnabled["axes"] = false;
    __pagesEnabled["FixRel Page"] = true;
    __pagesEnabled["world"] = false;
  });

  _model.addToReset(function() {
    range = 1.2; // EjsS Model.Variables.coordinate.range
    xmin = -range/2; // EjsS Model.Variables.coordinate.xmin
    xmax = range/2; // EjsS Model.Variables.coordinate.xmax
    ymin = -range/2; // EjsS Model.Variables.coordinate.ymin
    ymax = range/2; // EjsS Model.Variables.coordinate.ymax
    t = 0.0; // EjsS Model.Variables.coordinate.t
    dt = 0.01; // EjsS Model.Variables.coordinate.dt
    size = range/10; // EjsS Model.Variables.coordinate.size
    size2 = size/2; // EjsS Model.Variables.coordinate.size2
    stroke = 2.0; // EjsS Model.Variables.coordinate.stroke
    pi = Math.PI; // EjsS Model.Variables.coordinate.pi
    L = 1; // EjsS Model.Variables.coordinate.L
    g = 9.8; // EjsS Model.Variables.coordinate.g
    TOLERANCE = 0.001; // EjsS Model.Variables.coordinate.TOLERANCE
    vscale = 0.3; // EjsS Model.Variables.coordinate.vscale
  });

  _model.addToReset(function() {
    n = 7; // EjsS Model.Variables.basic.n
    n1 = n-1; // EjsS Model.Variables.basic.n1
    cid = 0; // EjsS Model.Variables.basic.cid
    m = new Array(n); // EjsS Model.Variables.basic.m
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.m
        m[_i0] = 1.0;  // EjsS Model.Variables.basic.m
      }
    }());
    cta = new Array(n); // EjsS Model.Variables.basic.cta
    omega = new Array(n); // EjsS Model.Variables.basic.omega
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.omega
        omega[_i0] = 0.0;  // EjsS Model.Variables.basic.omega
      }
    }());
    x = new Array(n); // EjsS Model.Variables.basic.x
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.x
        x[_i0] = 0.0;  // EjsS Model.Variables.basic.x
      }
    }());
    y = new Array(n); // EjsS Model.Variables.basic.y
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.y
        y[_i0] = 0.0;  // EjsS Model.Variables.basic.y
      }
    }());
    z = new Array(n); // EjsS Model.Variables.basic.z
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.z
        z[_i0] = 0.0;  // EjsS Model.Variables.basic.z
      }
    }());
    xc = new Array(n); // EjsS Model.Variables.basic.xc
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.xc
        xc[_i0] = 0.0;  // EjsS Model.Variables.basic.xc
      }
    }());
    dx = new Array(n); // EjsS Model.Variables.basic.dx
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.dx
        dx[_i0] = 0.0;  // EjsS Model.Variables.basic.dx
      }
    }());
    dy = new Array(n); // EjsS Model.Variables.basic.dy
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.dy
        dy[_i0] = 0.0;  // EjsS Model.Variables.basic.dy
      }
    }());
    vx = new Array(n); // EjsS Model.Variables.basic.vx
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.vx
        vx[_i0] = 0.0;  // EjsS Model.Variables.basic.vx
      }
    }());
    vy = new Array(n); // EjsS Model.Variables.basic.vy
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.vy
        vy[_i0] = 0.0;  // EjsS Model.Variables.basic.vy
      }
    }());
    l_m = new Array(n); // EjsS Model.Variables.basic.l_m
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.basic.l_m
        l_m[_i0] = "";  // EjsS Model.Variables.basic.l_m
      }
    }());
    v1 = 0.0; // EjsS Model.Variables.basic.v1
    v2 = 0.0; // EjsS Model.Variables.basic.v2
    va = 0.0; // EjsS Model.Variables.basic.va
    vb = 0.0; // EjsS Model.Variables.basic.vb
    m1 = 0.0; // EjsS Model.Variables.basic.m1
    m2 = 0.0; // EjsS Model.Variables.basic.m2
  });

  _model.addToReset(function() {
    l_play = "play"; // EjsS Model.Variables.language.l_play
    l_pause = "pause"; // EjsS Model.Variables.language.l_pause
    l_reset = "reset"; // EjsS Model.Variables.language.l_reset
    l_init = "initialize"; // EjsS Model.Variables.language.l_init
    label = "play"; // EjsS Model.Variables.language.label
    l_step = "step"; // EjsS Model.Variables.language.l_step
    l_id = "select ball ID=0"; // EjsS Model.Variables.language.l_id
    l_mass = "change mass to=0.0"; // EjsS Model.Variables.language.l_mass
  });

  _model.addToReset(function() {
    id = 0; // EjsS Model.Variables.control.id
    mi = 1; // EjsS Model.Variables.control.mi
  });

  _model.addToReset(function() {
    ballMass = 0; // EjsS Model.Variables.lookang.ballMass
    ballMoved = 0; // EjsS Model.Variables.lookang.ballMoved
    maxAngle = pi/2; // EjsS Model.Variables.lookang.maxAngle
    k = 0; // EjsS Model.Variables.lookang.k
    mom = new Array(n); // EjsS Model.Variables.lookang.mom
    KE = new Array(n); // EjsS Model.Variables.lookang.KE
    PE = new Array(n); // EjsS Model.Variables.lookang.PE
    TE = new Array(n); // EjsS Model.Variables.lookang.TE
    text1 = ""; // EjsS Model.Variables.lookang.text1
    text = "Drag the balls to create different motions and click play"; // EjsS Model.Variables.lookang.text
    selected = new Array(1); // EjsS Model.Variables.lookang.selected
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.lookang.selected
        selected[_i0] = "1 ball";  // EjsS Model.Variables.lookang.selected
      }
    }());
  });

  _model.addToReset(function() {
    graph = false; // EjsS Model.Variables.boolean.graph
    threeD = false; // EjsS Model.Variables.boolean.threeD
    show = new Array(n); // EjsS Model.Variables.boolean.show
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.boolean.show
        show[_i0] = true;  // EjsS Model.Variables.boolean.show
      }
    }());
  });

  _model.addToReset(function() {
    font = "normal normal 2vw "; // EjsS Model.Variables.layout.font
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iOS
    iPad = /iPad/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPad
    iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPhone
    Android = /Android|android/i.test(navigator.userAgent); // EjsS Model.Variables.layout.Android
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    xvst = false; // EjsS Model.Variables.layout.xvst
    vvst = false; // EjsS Model.Variables.layout.vvst
    avst = false; // EjsS Model.Variables.layout.avst
    world = true; // EjsS Model.Variables.layout.world
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

  function drag () {  // > CustomCode.drag:1
  // Compute new angle and freeze the ball  // > CustomCode.drag:2
  cta[ballMoved] = Math.atan2(x[ballMoved]-xc[ballMoved],ymax-y[ballMoved]);  // > CustomCode.drag:3
  omega[ballMoved] = 0;  // > CustomCode.drag:4
  z[ballMoved]=0; // for 3D  // > CustomCode.drag:5
  // Limit the motion  // > CustomCode.drag:6
  var maxAngle = Math.PI/2; // change maxAngle for new limit of swing  // > CustomCode.drag:7
  if (cta[ballMoved]> maxAngle) cta[ballMoved] =  maxAngle;  // > CustomCode.drag:8
  if (cta[ballMoved]<-maxAngle) cta[ballMoved] = -maxAngle;  // > CustomCode.drag:9
  // Check for one ball moving the others  // > CustomCode.drag:10
  for (var i=ballMoved+1; i<n; i++) {  // > CustomCode.drag:11
    if (cta[ballMoved]>cta[i]) { cta[i] = cta[ballMoved]; omega[i] = 0; }  // > CustomCode.drag:12
  }  // > CustomCode.drag:13
  for ( i=0; i<ballMoved; i++) {  // > CustomCode.drag:14
    if (cta[ballMoved]<cta[i]) { cta[i] = cta[ballMoved]; omega[i] = 0; }  // > CustomCode.drag:15
  }  // > CustomCode.drag:16
  /*  // > CustomCode.drag:17
  // Force constant rod length  // > CustomCode.drag:18
  for (int i=0; i<n; i++) {  // > CustomCode.drag:19
    x[i] = xTop[i] + l*Math.sin(alpha[i]);  // > CustomCode.drag:20
    y[i] = yTop - l*Math.cos(alpha[i]);  // > CustomCode.drag:21
  }  // > CustomCode.drag:22
  */  // > CustomCode.drag:23
  }  // > CustomCode.drag:24

  //https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode  // > CustomCode.Lib Page:1
  // does not work for iOS   // > CustomCode.Lib Page:2
  /*jslint browser:true */  // > CustomCode.Lib Page:3
  function toggleFullScreen() {  // > CustomCode.Lib Page:4
    if (!document.fullscreenElement &&    // alternative standard method  // > CustomCode.Lib Page:5
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods  // > CustomCode.Lib Page:6
      if (document.documentElement.requestFullscreen) {  // > CustomCode.Lib Page:7
        document.documentElement.requestFullscreen();  // > CustomCode.Lib Page:8
      } else if (document.documentElement.msRequestFullscreen) {  // > CustomCode.Lib Page:9
        document.documentElement.msRequestFullscreen();  // > CustomCode.Lib Page:10
      } else if (document.documentElement.mozRequestFullScreen) {  // > CustomCode.Lib Page:11
        document.documentElement.mozRequestFullScreen();  // > CustomCode.Lib Page:12
      } else if (document.documentElement.webkitRequestFullscreen) {  // > CustomCode.Lib Page:13
        document.documentElement.webkitRequestFullscreen();  // > CustomCode.Lib Page:14
      }  // > CustomCode.Lib Page:15
    } else {  // > CustomCode.Lib Page:16
      if (document.exitFullscreen) {  // > CustomCode.Lib Page:17
        document.exitFullscreen();  // > CustomCode.Lib Page:18
      } else if (document.msExitFullscreen) {  // > CustomCode.Lib Page:19
        document.msExitFullscreen();  // > CustomCode.Lib Page:20
      } else if (document.mozCancelFullScreen) {  // > CustomCode.Lib Page:21
        document.mozCancelFullScreen();  // > CustomCode.Lib Page:22
      } else if (document.webkitExitFullscreen) {  // > CustomCode.Lib Page:23
        document.webkitExitFullscreen();  // > CustomCode.Lib Page:24
      }  // > CustomCode.Lib Page:25
    }  // > CustomCode.Lib Page:26
  }  // > CustomCode.Lib Page:27

  // code to be copied to EJSS source code under Custom and used in drawingPanel3D and plottingPanel2D  // > CustomCode.changeO:1
  // address the problem is height difference is iOS app , epub, and Firefox  // > CustomCode.changeO:2
  // user need to change only k and kepub  // > CustomCode.changeO:3
  // copy %changeOrientation()% into the Height Field of drawingPanel3D and plottingPanel2D  // > CustomCode.changeO:4
  // _view.plottingPanel.getGraphics().setHeight(changeOrientation(0.85));  // > CustomCode.changeO:5
  function changeOrientation(kheight) {  // > CustomCode.changeO:6
     // > CustomCode.changeO:7
  var k =0.90 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeO:8
  var kapple =kheight // control apple app height  // > CustomCode.changeO:9
  var kepub =0.90 ;  // > CustomCode.changeO:10
  // check platform for Apps  // > CustomCode.changeO:11
  try { // allow code to run in Student Learning Space   // > CustomCode.changeO:12
    var iOSapp =  (typeof parent.device != 'undefined' && parent.device.platform == "iOS");  // > CustomCode.changeO:13
    var Androidapp = (typeof parent.device != 'undefined' && parent.device.platform == "Android");  // > CustomCode.changeO:14
  } catch(e) {  // > CustomCode.changeO:15
    var iOSapp = false;  // > CustomCode.changeO:16
    var Androidapp = false;  // > CustomCode.changeO:17
  }  // > CustomCode.changeO:18
  // check platform for web browsers  // > CustomCode.changeO:19
  var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeO:20
  var iPad =/iPad/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeO:21
  var iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeO:22
  var Android= /Android|android/i.test(navigator.userAgent);  // > CustomCode.changeO:23
  //navigator  // > CustomCode.changeO:24
  var Firefox = navigator.userAgent.indexOf("Firefox") != -1;  // > CustomCode.changeO:25
     // > CustomCode.changeO:26
  switch (window.orientation) { // using window.orientation as deciding factor  // > CustomCode.changeO:27
    case 0:  // > CustomCode.changeO:28
    case 180:  // > CustomCode.changeO:29
      this.screenOrientation = 'portrait';  // > CustomCode.changeO:30
      if (iOSapp){ // does not seems to work  // > CustomCode.changeO:31
          // > CustomCode.changeO:32
        return window.screen.height*kapple;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeO:33
        // > CustomCode.changeO:34
      }  // > CustomCode.changeO:35
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeO:36
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeO:37
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeO:38
        // return window.screen.height;  // > CustomCode.changeO:39
        //  return window.innerHeight;  // > CustomCode.changeO:40
        // return document.documentElement.clientHeight;  // > CustomCode.changeO:41
      }  // > CustomCode.changeO:42
       // > CustomCode.changeO:43
      else {  // > CustomCode.changeO:44
       return window.innerHeight*kheight;  // > CustomCode.changeO:45
        //return 100*k+"vh";  // > CustomCode.changeO:46
      }  // > CustomCode.changeO:47
      break;  // > CustomCode.changeO:48
    case 90:  // > CustomCode.changeO:49
    case -90:  // > CustomCode.changeO:50
      this.screenOrientation = 'landscape';  // > CustomCode.changeO:51
     // > CustomCode.changeO:52
      if (iOSapp){ // App  // > CustomCode.changeO:53
        return window.screen.width*kapple;    // > CustomCode.changeO:54
        // return window.screen.height;  // > CustomCode.changeO:55
        //  return window.innerHeight;  // > CustomCode.changeO:56
        //  return document.documentElement.clientHeight;  // > CustomCode.changeO:57
      }  // > CustomCode.changeO:58
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeO:59
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeO:60
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeO:61
        // return window.screen.height;  // > CustomCode.changeO:62
        //  return window.innerHeight;  // > CustomCode.changeO:63
        // return document.documentElement.clientHeight;  // > CustomCode.changeO:64
      }  // > CustomCode.changeO:65
       // > CustomCode.changeO:66
      else {  // > CustomCode.changeO:67
        return window.innerHeight*kheight;  // > CustomCode.changeO:68
        //return 100*k+"vh"; // safari produce error  // > CustomCode.changeO:69
        }  // > CustomCode.changeO:70
      break;  // > CustomCode.changeO:71
    default:  // > CustomCode.changeO:72
      this.screenOrientation = 'unknown';  // > CustomCode.changeO:73
      //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.changeO:74
       if (Firefox){  // > CustomCode.changeO:75
        return window.innerHeight*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeO:76
        }  // > CustomCode.changeO:77
     //   else if (iOS&&(window.orientation==0)||(window.orientation==180)){  // > CustomCode.changeO:78
     //   return  window.screen.height*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeO:79
     //   }  // > CustomCode.changeO:80
      //  else if (iOS&&(window.orientation==90)||(window.orientation==-90)){  // > CustomCode.changeO:81
     //   return  window.screen.width*k;// number as of 20180831 Firefox does not support vh yet so need a separate line to handle  // > CustomCode.changeO:82
     //   }  // > CustomCode.changeO:83
        else {  // > CustomCode.changeO:84
        //alert();  // > CustomCode.changeO:85
        // return 100*k+"%"; // work on fullscreen works in EJSS6.0beta  // > CustomCode.changeO:86
          //  works in EjsS_5.3_180131  // > CustomCode.changeO:87
        //return  window.innerHeight*kheight; // work on panel   // > CustomCode.changeO:88
        // take note the panel that contains the plottingPanel needs to be 100% in Height to maximize the view  // > CustomCode.changeO:89
        return 100*k+"vh";  // > CustomCode.changeO:90
         // 100% does not work on iOS after clicking reset it lengthens  // > CustomCode.changeO:91
  }  // > CustomCode.changeO:92
  }  // > CustomCode.changeO:93
     // > CustomCode.changeO:94
  }  // > CustomCode.changeO:95

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (Width1==undefined){   // > Initialization.undefined:1
      Width1="100%";  // > Initialization.undefined:2
      }  // > Initialization.undefined:3
      if (Width2==undefined){   // > Initialization.undefined:4
      Width2="0%";  // > Initialization.undefined:5
      }  // > Initialization.undefined:6
        if (kevst==undefined){   // > Initialization.undefined:7
     kevst=true;  // > Initialization.undefined:8
      }  // > Initialization.undefined:9
      if (pevst==undefined){   // > Initialization.undefined:10
     pevst=false;  // > Initialization.undefined:11
      }  // > Initialization.undefined:12
      if (tevst==undefined){   // > Initialization.undefined:13
     tevst=false;  // > Initialization.undefined:14
      }  // > Initialization.undefined:15
        // > Initialization.undefined:16
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    for(var i=0;i<n;i++){  // > Initialization.Init Page:1
     xc[i]=-(n/2)*size+i*size; // change to + by lookang for left to right lineup  // > Initialization.Init Page:2
     cta[i]=0.;  // > Initialization.Init Page:3
     omega[i]=0.;  // > Initialization.Init Page:4
     l_m[i]=m[i]+"";  // > Initialization.Init Page:5
    }  // > Initialization.Init Page:6
    t=0.;  // > Initialization.Init Page:7
    xmin = -n*size; // optimize view  // > Initialization.Init Page:8
    xmax = +n*size;  // > Initialization.Init Page:9
    //cta[0]=-pi/10;  // > Initialization.Init Page:10
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Axes"]) return;
    _view.plottingPanel2.getAxisX().setPosition([0,0.025]);  // > Initialization.Axes:1
    _view.plottingPanel2.getTitleX().setPosition([0.95,0.045]);  // > Initialization.Axes:2
    _view.plottingPanel2.getAxisY().setPosition([0.025,0]);  // > Initialization.Axes:3
    _view.plottingPanel2.getTitleY().setPosition([0.05,0]);  // > Initialization.Axes:4
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 2"]) return;
     //if ( _view.comboBox.getProperty("SelectedOptions")=="1 ball"){  // > Initialization.Init Page 2:1
      cta[0]= -pi/4;  // > Initialization.Init Page 2:2
        // > Initialization.Init Page 2:3
     // }  // > Initialization.Init Page 2:4
        // > Initialization.Init Page 2:5
       // > Initialization.Init Page 2:6
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["svgradial"]) return;
    var container = document.createElement('div');  // > Initialization.svgradial:1
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svgradial:2
      '  <radialGradient id="mygrandient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">'+  // > Initialization.svgradial:3
      '    <stop offset="0%" style="stop-color:rgb(0,0,0); stop-opacity:1" />'+  // > Initialization.svgradial:4
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />'+  // > Initialization.svgradial:5
      '  </radialGradient>'+  // > Initialization.svgradial:6
      '</defs></svg>';  // > Initialization.svgradial:7
    container.innerHTML = svggradient;  // > Initialization.svgradial:8
    document.body.appendChild(container);  // > Initialization.svgradial:9
    var container = document.createElement('div');  // > Initialization.svgradial:10
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svgradial:11
      '  <radialGradient id="mygrandient1" cx="50%" cy="50%" r="80%" fx="30%" fy="30%">'+  // > Initialization.svgradial:12
      '    <stop offset="0%" style="stop-color:rgb(0,0,0); stop-opacity:1" />'+  // > Initialization.svgradial:13
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />'+  // > Initialization.svgradial:14
      '  </radialGradient>'+  // > Initialization.svgradial:15
      '</defs></svg>';  // > Initialization.svgradial:16
    container.innerHTML = svggradient;  // > Initialization.svgradial:17
    document.body.appendChild(container);  // > Initialization.svgradial:18
    //"url(#mygrandient1)"  // > Initialization.svgradial:19
    var container = document.createElement('div');  // > Initialization.svgradial:20
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svgradial:21
      '  <radialGradient id="mygrandient2" cx="50%" cy="50%" r="70%" fx="90%" fy="50%">'+  // > Initialization.svgradial:22
      '    <stop offset="0%" style="stop-color:rgb(0,255,0); stop-opacity:1" />'+  // > Initialization.svgradial:23
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />'+  // > Initialization.svgradial:24
      '  </radialGradient>'+  // > Initialization.svgradial:25
      '</defs></svg>';  // > Initialization.svgradial:26
    container.innerHTML = svggradient;  // > Initialization.svgradial:27
    document.body.appendChild(container);  // > Initialization.svgradial:28
    //"url(#mygrandient2)"  // > Initialization.svgradial:29
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 3"]) return;
    if (_isMobile){  // > Initialization.Init Page 3:1
      //do nothing  // > Initialization.Init Page 3:2
      }  // > Initialization.Init Page 3:3
        // > Initialization.Init Page 3:4
      else{  // > Initialization.Init Page 3:5
        // copy this into the initialization  // > Initialization.Init Page 3:6
    // make the font bigger  // > Initialization.Init Page 3:7
    _view.plottingPanel.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:8
    _view.plottingPanel.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:9
    _view.plottingPanel.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:10
    _view.plottingPanel.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:11
        }  // > Initialization.Init Page 3:12
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 4"]) return;
    //copy to initialization page  // > Initialization.Init Page 4:1
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);  // > Initialization.Init Page 4:2
    //https://docs.mathjax.org/en/v1.0/options/tex2jax.html#configure-tex2jax  // > Initialization.Init Page 4:3
    MathJax.Hub.Config({  // > Initialization.Init Page 4:4
      tex2jax: {  // > Initialization.Init Page 4:5
        inlineMath: [ ['$','$'], ['\\(','\\)'] ]  // > Initialization.Init Page 4:6
      }  // > Initialization.Init Page 4:7
    });  // > Initialization.Init Page 4:8
  });

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["ODE"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["Ãö«Y¦¡"]) return;
    //graph  // > FixedRelations.Ãö«Y¦¡:1
    ketotal = 0 ; // reset to zero before it sums else without this line, it is a cummulative sum wrong is wrong  // > FixedRelations.Ãö«Y¦¡:2
    petotal = 0 ;  // > FixedRelations.Ãö«Y¦¡:3
    tetotal = 0 ;  // > FixedRelations.Ãö«Y¦¡:4
    momtotal = 0;   // > FixedRelations.Ãö«Y¦¡:5
    for(var i=0;i<n;i++){  // > FixedRelations.Ãö«Y¦¡:6
     dx[i]=L*Math.sin(cta[i]);  // > FixedRelations.Ãö«Y¦¡:7
     dy[i]=-L*Math.cos(cta[i]);  // > FixedRelations.Ãö«Y¦¡:8
     x[i]=xc[i]+dx[i];  // > FixedRelations.Ãö«Y¦¡:9
     y[i]=ymax+dy[i];  // > FixedRelations.Ãö«Y¦¡:10
     vx[i]=L*omega[i]*Math.cos(cta[i]);  // > FixedRelations.Ãö«Y¦¡:11
     vy[i]=L*omega[i]*Math.sin(cta[i]);  // > FixedRelations.Ãö«Y¦¡:12
     //graph  // > FixedRelations.Ãö«Y¦¡:13
       KE[i] = 0.5*m[i]*L*L*omega[i]*omega[i];  // > FixedRelations.Ãö«Y¦¡:14
      PE[i] = m[i]*g*(-L*Math.cos(cta[i])+L);  // > FixedRelations.Ãö«Y¦¡:15
      TE[i] = KE[i] + PE[i];  // > FixedRelations.Ãö«Y¦¡:16
       // total energy   // > FixedRelations.Ãö«Y¦¡:17
    ketotal = ketotal+KE[i]; // summing all KE[i=0 to n]  // > FixedRelations.Ãö«Y¦¡:18
    petotal = petotal+PE[i]; // code similar to ketotal+=KE;  // > FixedRelations.Ãö«Y¦¡:19
    tetotal = tetotal+TE[i];  // > FixedRelations.Ãö«Y¦¡:20
    // momentum  // > FixedRelations.Ãö«Y¦¡:21
      mom[i] = m[i]*omega[i]*L;  // > FixedRelations.Ãö«Y¦¡:22
    momtotal += mom[i];   // > FixedRelations.Ãö«Y¦¡:23
    }  // > FixedRelations.Ãö«Y¦¡:24
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["axes"]) return;
    if (_model.isPlaying()===true) { //NEED this for conflict with initialize page values  // > FixedRelations.axes:1
    //_view.plottingPanel.getGrid().setFixedTickY()=(M*y+m*y2)/(M+m);  // > FixedRelations.axes:2
    //_view.plottingPanel.setFixedTickY()=2;  // > FixedRelations.axes:3
    _view.plottingPanel2.getAxisX().setAbsoluteY(_view.plottingPanel2.getGrid().getFixedTickY());  // > FixedRelations.axes:4
    _view.plottingPanel2.getAxisY().setAbsoluteX(_view.plottingPanel2.getGrid().getFixedTickX());  // > FixedRelations.axes:5
    //var getRealWorldYMin = _view.plottingPanel.getRealWorldYMin();  // > FixedRelations.axes:6
    //var getRealWorldYMax = _view.plottingPanel.getRealWorldYMax();  // > FixedRelations.axes:7
    //_view.plottingPanel.getAxisX().setPosition([0,_view.plottingPanel.getRealWorldYMin()/(_view.plottingPanel.getRealWorldYMax()-_view.plottingPanel.getRealWorldYMin())]);  // > FixedRelations.axes:8
    //_view.plottingPanel.getTitleX().setPosition([0.95,-_view.plottingPanel.getRealWorldYMin()/(_view.plottingPanel.getRealWorldYMax()-_view.plottingPanel.getRealWorldYMin())]);  // > FixedRelations.axes:9
    }  // > FixedRelations.axes:10
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
    text1 =  " KE = " + _view._format(ketotal,"0.00") + " J , "+" \nPE = " + _view._format(petotal,"0.00") + " J , "+" \nTE = " + _view._format(tetotal,"0.00") + " J , "+ " \nt = " + _view._format(t,"0.00") + " s ";  // > FixedRelations.FixRel Page:1
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["world"]) return;
    if ((kevst===false)&&(pevst===false)&&(tevst===false)){  // > FixedRelations.world:1
     graph=false;   // > FixedRelations.world:2
     Width1="100%";  // > FixedRelations.world:3
     Width2="0%";  // > FixedRelations.world:4
     disabledworld=true;  // > FixedRelations.world:5
      }  // > FixedRelations.world:6
     else if (((kevst)||(pevst)||(tevst))&&(world)){  // > FixedRelations.world:7
       graph=true;  // > FixedRelations.world:8
        Width1="50%";  // > FixedRelations.world:9
     Width2="50%";  // > FixedRelations.world:10
      disabledworld=false;  // > FixedRelations.world:11
       }  // > FixedRelations.world:12
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
    if (_odeName=="ODE") return _ODEi_evolution1;
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
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;

    var _ctaLength;
    var _omegaLength;

    __odeSelf._getOdeVars = function (){ return["cta","omega","t"]};

    __odeSelf.setSolverClass = function(__aSolverClass) {
      __solverClass = __aSolverClass;
      __instantiateSolver();
    };

    function __instantiateSolver() {
      __state=[];
      _ctaLength = cta.length;
      _omegaLength = omega.length;
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
      if (__pagesEnabled["¨Æ¥ó"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      for(k in userEvents1){__eventSolver.addEvent(userEvents1[k]);}
      __eventSolver.setEstimateFirstStep(false);
      __eventSolver.setEnableExceptions(false);
      __eventSolver.setTolerances(TOLERANCE,TOLERANCE);
      __mustReinitialize = true;
      __mustInitialize = false;
    };

    function __pushState() {
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
      if (!__mustReinitialize)
        for (__j=0,__n=__cIn; __j<_ctaLength; __j++)
          if (__state[__n++]!=cta[__j] || __state[__n++]!=omega[__j]) { __mustReinitialize = true; break; }
      for (__j=0; __j<_ctaLength; __j++) { // These two alternate in the state
         __state[__cIn++] = cta[__j];
         __state[__cIn++] = omega[__j];
      }
        if (__state[__cIn]!=t) __mustReinitialize = true;
        __state[__cIn++] = t;
    }

    function __arraysChanged () {
      if (_ctaLength != cta.length) return true;
      if (_omegaLength != omega.length) return true;
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
      __eventSolver.setTolerances(TOLERANCE,TOLERANCE);
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
        for (__i=0; __i<_ctaLength; __i++) { // These two alternate in the state
          cta[__i] = __state[__cOut++];
          omega[__i] = __state[__cOut++];
        }
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
        var cta = [];
        var omega = [];
        for (__i=0; __i<_ctaLength; __i++) { // These two alternate in the state
          cta[__i] = _aState[__cOut++];
          omega[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        var i;
        for (i=0;i<_ctaLength;i++) { // These two alternate in the state
          _aRate[__cRate++] = Array.isArray(omega[i]) ? omega[i][i] : omega[i]; // Rate for ODE: ODE:cta
          _aRate[__cRate++] = Array.isArray(-g*Math.sin(cta[i])/L-k*L*omega[i]) ? -g*Math.sin(cta[i])/L-k*L*omega[i][i] : -g*Math.sin(cta[i])/L-k*L*omega[i]; // Rate for ODE: ODE:omega
        }
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
        var cta = [];
        var omega = [];
        for (__i=0; __i<_ctaLength; __i++) { // These two alternate in the state
          cta[__i] = _aState[__cOut++];
          omega[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0; __i<_ctaLength; __i++) { // These two alternate in the state
          cta[__i] = __state[__cOut++];
          omega[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
      for (__j=0; __j<_ctaLength; __j++) { // These two alternate in the state
         __state[__cIn++] = cta[__j];
         __state[__cIn++] = omega[__j];
      }
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

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.STATE_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return TOLERANCE; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var cta = [];
        var omega = [];
        for (__i=0; __i<_ctaLength; __i++) { // These two alternate in the state
          cta[__i] = _aState[__cOut++];
          omega[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        var TOLERANCE =0.0001;  // > Event zero-condition for page ODE:1
        for(var i=0;i<n-1;i++){  // > Event zero-condition for page ODE:2
         if(cta[i]>cta[i+1]+TOLERANCE){//<TOLERANCE){// collision between i and i+1;  // > Event zero-condition for page ODE:3
          cid=i;  // > Event zero-condition for page ODE:4
          text= " computing collisions ";  // > Event zero-condition for page ODE:5
          return cta[i+1]-cta[i];  // > Event zero-condition for page ODE:6
            // > Event zero-condition for page ODE:7
         }  // > Event zero-condition for page ODE:8
        }  // > Event zero-condition for page ODE:9
        return TOLERANCE;// no collision   // > Event zero-condition for page ODE:10
        text= " Playing ";  // > Event zero-condition for page ODE:11
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0; __i<_ctaLength; __i++) { // These two alternate in the state
          cta[__i] = __state[__cOut++];
          omega[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
      for (__j=0; __j<_ctaLength; __j++) { // These two alternate in the state
         __state[__cIn++] = cta[__j];
         __state[__cIn++] = omega[__j];
      }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        m1=m[cid];  // > Event action for page ODE:1
        m2=m[cid+1];  // > Event action for page ODE:2
        v1=L*omega[cid];  // > Event action for page ODE:3
        v2=L*omega[cid+1];  // > Event action for page ODE:4
        va=((m1-m2)*v1+2*m2*v2)/(m1+m2);// velocity after collision  // > Event action for page ODE:5
        vb=(2*m1*v1+(m2-m1)*v2)/(m1+m2);  // > Event action for page ODE:6
        omega[cid]=va/L;// back to omega  // > Event action for page ODE:7
        omega[cid+1]=vb/L;  // > Event action for page ODE:8
        var speedforsound = 0.5;  // > Event action for page ODE:9
        // sound effect added despite the energy conservation  // > Event action for page ODE:10
        if (sound===true&&(Math.abs(v1)>speedforsound||Math.abs(v2)>speedforsound)){ // arbitrary set as 1  // > Event action for page ODE:11
        //Toolkit.getDefaultToolkit().beep(); // taken from http://www.compadre.org/OSP/items/detail.cfm?ID=8385&Attached=1  // > Event action for page ODE:12
        //Ceiling Bounce Model written by Wolfgang Christian  // > Event action for page ODE:13
        _view.audio.play();  // > Event action for page ODE:14
        }  // > Event action for page ODE:15
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_cta(__time) {
    var __beginIndex = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,new Array(cta.length),__beginIndex,cta.ength);
  }

  function _historic_omega(__time) {
    var __beginIndex = 0 + cta.length;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,new Array(omega.length),__beginIndex,omega.ength);
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
    _view = new newtonscadlerealwee_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.displayPanel.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'displayPanel'
          _view.displayPanel.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'displayPanel'
          _view.controlPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'controlPanel'
          _view.sound.linkProperty("Checked",  function() { return sound; }, function(_v) { sound = _v; } ); // HtmlView Page linking property 'Checked' for element 'sound'
          _view.sound.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'sound'
          _view.comboBox.linkProperty("Options",  function() { return ["1 ball","2 ball","3 ball","4 ball","5 ball","6 ball","7 ball","1 ball 1","2 ball 1","2 ball 2","3 ball 3","Buy from Shopee","Need a 2D version?","Need a 3D version?"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  var opts = _view.comboBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option=="user_defined"){
    
    }
  else if ( option=="1 ball"){
    cta[0]= -pi/4;
    
    }
    
    else if ( option=="2 ball"){
    cta[0]= -pi/4;
    cta[1]= -pi/4;
    }
    else if ( option=="3 ball"){
    cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[2]= -pi/4;
    }
    else if ( option=="4 ball"){
     cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[2]= -pi/4;
   cta[3]= -pi/4;
    
    }
    else if ( option=="5 ball"){
     cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[2]= -pi/4;
   cta[3]= -pi/4;
    cta[4]= -pi/4;
   
    }
    else if ( option=="6 ball"){
     cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[2]= -pi/4;
   cta[3]= -pi/4;
    cta[4]= -pi/4;
    cta[5]= -pi/4;
    }
    else if ( option=="7 ball"){
    cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[2]= -pi/4;
   cta[3]= -pi/4;
    cta[4]= -pi/4;
    cta[5]= -pi/4;
    cta[6]= -pi/4;
   }
  else if ( option=="1 ball 1"){
    cta[0]= -pi/4;
    
    cta[6]= pi/4;
   }
   else if ( option=="2 ball 1"){
    cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[6]= pi/4;
   }
   else if ( option=="2 ball 2"){
    cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[5]= pi/4;
    cta[6]= pi/4;
   }
   else if ( option=="3 ball 3"){
    cta[0]= -pi/4;
    cta[1]= -pi/4;
    cta[2]= -pi/4;
     cta[4]= pi/4;
    cta[5]= pi/4;
    cta[6]= pi/4;
   }
  //["1 ball","2 ball","3 ball","4 ball","5 ball","6 ball","7 ball","1 ball 1","2 ball 1","2 ball 2","3 ball 3","Buy from Shopee?","Need a 3D model?"]
    else if (option=="Buy from Shopee")
  {
    window.open("https://shope.ee/3AhkYwOP03?share_channel_code=1");
    }
   //["1 ball","2 ball","3 ball","4 ball","5 ball","6 ball","7 ball","1 ball 1","2 ball 1","2 ball 2","3 ball 3","Buy from Shopee","Need a 2D model?","Need a 3D model?"]
   else if (option=="Need a 2D version?")
  {
    window.open("https://iwant2study.org/ospsg/index.php/interactive-resources/physics/02-newtonian-mechanics/02-dynamics/47-newton-cradle");
    }
   else if (option=="Need a 3D version?")
  {
    window.open("https://iwant2study.org/ospsg/index.php/interactive-resources/physics/02-newtonian-mechanics/02-dynamics/48-newton-cradle-3d");
    }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.playPauseButton.setAction("OffClick", function(_data,_info) {
  _pause();
  text = " Paused";

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton'
          _view.playPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton'
          _view.playPauseButton.setAction("OnClick", function(_data,_info) {
  _play();
  text = " Playing";

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton'
          _view.resetButton.setAction("OnClick", _reset); // HtmlView Page setting action 'OnClick' for element 'resetButton'
          _view.controlPanel2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'controlPanel2'
          _view.worldgraph.linkProperty("Width",  function() { return (_isMobile)?"50":""; } ); // HtmlView Page linking property 'Width' for element 'worldgraph'
          _view.worldgraph.linkProperty("Options",  function() { return ["world","graph","world and E vs t","","KE vs t","KE vs t off","PE vs t","PE vs t off","TE vs t","TE vs t off"]; } ); // HtmlView Page linking property 'Options' for element 'worldgraph'
          _view.worldgraph.setAction("OnChange", function(_data,_info) {
  //var option = _view.worldgraph.getProperty("SelectedOptions");
  //alert(option);
  var opts = _view.worldgraph.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  //["world","x vs t"," v vs t","a vs t","world and x vs t","world and v vs t","world and a vs t"]
  if ( option=="world"){
    world=true;
  graph=false;
  Width1 = "100%";
  Width2 = "0%";
    }
   
  else if ( option=="world and E vs t"){
    world=true;
  graph=true;
  Width1 = "50%";
  Width2 = "50%";
    } 
    
    else if ( option=="graph"){
    world=false;
  graph=true;
  Width1 = "0%";
  Width2 = "100%";
    } 
    //kevst
    else if ( option=="KE vs t"){
  kevst=true;
    } 
     else if ( option=="KE vs t off"){
  kevst=false;
    } 
    
    //pevst
    else if ( option=="PE vs t"){
  pevst=true;
    } 
     else if ( option=="PE vs t off"){
  pevst=false;
    } 
    //tevst
    else if ( option=="TE vs t"){
  tevst=true;
    } 
     else if ( option=="TE vs t off"){
  tevst=false;
    }

}); // HtmlView Page setting action 'OnChange' for element 'worldgraph'
          _view.slider22.linkProperty("Width",  function() { return (_isEPub)?"0":""; } ); // HtmlView Page linking property 'Width' for element 'slider22'
          _view.slider22.linkProperty("Value",  function() { return g; }, function(_v) { g = _v; } ); // HtmlView Page linking property 'Value' for element 'slider22'
          _view.slider22.setAction("OnChange", _initialize); // HtmlView Page setting action 'OnChange' for element 'slider22'
          _view.field22.linkProperty("Value",  function() { return g; }, function(_v) { g = _v; } ); // HtmlView Page linking property 'Value' for element 'field22'
          _view.field22.setAction("OnChange", _initialize); // HtmlView Page setting action 'OnChange' for element 'field22'
          _view.label222.linkProperty("Width",  function() { return (_isEPub)?"0":""; } ); // HtmlView Page linking property 'Width' for element 'label222'
          _view.n22.linkProperty("Width",  function() { return (_isEPub)?"0":""; } ); // HtmlView Page linking property 'Width' for element 'n22'
          _view.n22.linkProperty("Value",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'Value' for element 'n22'
          _view.n22.setAction("OnChange", _initialize); // HtmlView Page setting action 'OnChange' for element 'n22'
          _view.n32.linkProperty("Value",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'Value' for element 'n32'
          _view.n32.setAction("OnChange", _initialize); // HtmlView Page setting action 'OnChange' for element 'n32'
          _view.ballmoved23.linkProperty("Width",  function() { return (_isEPub)?"0":""; } ); // HtmlView Page linking property 'Width' for element 'ballmoved23'
          _view.ballmoved23.linkProperty("Value",  function() { return ballMoved; }, function(_v) { ballMoved = _v; } ); // HtmlView Page linking property 'Value' for element 'ballmoved23'
          _view.ballmoved23.setAction("OnChange", _initialize); // HtmlView Page setting action 'OnChange' for element 'ballmoved23'
          _view.ballmoved33.linkProperty("Value",  function() { return ballMoved; }, function(_v) { ballMoved = _v; } ); // HtmlView Page linking property 'Value' for element 'ballmoved33'
          _view.ballmoved33.setAction("OnChange", _initialize); // HtmlView Page setting action 'OnChange' for element 'ballmoved33'
          _view.mi2.linkProperty("Disabled",  function() { return _isPlaying; } ); // HtmlView Page linking property 'Disabled' for element 'mi2'
          _view.ballmoved222.linkProperty("Width",  function() { return (_isEPub)?"0":""; } ); // HtmlView Page linking property 'Width' for element 'ballmoved222'
          _view.ballmoved222.linkProperty("Value",  function() { return mi; }, function(_v) { mi = _v; } ); // HtmlView Page linking property 'Value' for element 'ballmoved222'
          _view.ballmoved222.setAction("OnChange", function(_data,_info) {
  m[ballMoved]=mi;
  l_m[ballMoved]=""+_view._format(m[ballMoved],"0");

}); // HtmlView Page setting action 'OnChange' for element 'ballmoved222'
          _view.ballmoved222.linkProperty("Disabled",  function() { return _isPlaying; } ); // HtmlView Page linking property 'Disabled' for element 'ballmoved222'
          _view.ballmoved322.linkProperty("Value",  function() { return mi; }, function(_v) { mi = _v; } ); // HtmlView Page linking property 'Value' for element 'ballmoved322'
          _view.ballmoved322.setAction("OnChange", function(_data,_info) {
  m[ballMoved]=mi;
   l_m[ballMoved]=_view.format(m[ballMoved],"0.0")+"";

}); // HtmlView Page setting action 'OnChange' for element 'ballmoved322'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(0.8); }, function(_v) { changeOrientation(0.8) = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return ymax; }, function(_v) { ymax = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return xmax; }, function(_v) { xmax = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return _isMobile?"":"Newton Cradle Model"; } ); // HtmlView Page linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return xmin; }, function(_v) { xmin = _v; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return ymin; }, function(_v) { ymin = _v; } ); // HtmlView Page linking property 'MinimumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world; }, function(_v) { world = _v; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return text1; }, function(_v) { text1 = _v; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanel'
          _view.plus.setAction("OnPress", function(_data,_info) {
  n=n+1;
  if (n >7) 
  {
    n=7; //limit
  alert("limit reached, maximum is seven balls");
  }
  for(var i=0;i<n;i++){
   xc[i]=-(n/2)*size+i*size; // change to + by lookang for left to right lineup
   cta[i]=0.;
   omega[i]=0.;
   l_m[i]=m[i]+"";
  }
  t=0.;
  xmin = -n*size; // optimize view
  xmax = +n*size;
  //cta[0]=-pi/10;

}); // HtmlView Page setting action 'OnPress' for element 'plus'
          _view.plus.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'plus'
          _view.minus.setAction("OnPress", function(_data,_info) {
  n=n-1;
  if (n <1) {
    n=1; //limit
  alert("limit reached, minimum is one ball");
  }
  for(var i=0;i<n;i++){
   xc[i]=-(n/2)*size+i*size; // change to + by lookang for left to right lineup
   cta[i]=0.;
   omega[i]=0.;
   l_m[i]=m[i]+"";
  }
  t=0.;
  xmin = -n*size; // optimize view
  xmax = +n*size;
  //cta[0]=-pi/10;

}); // HtmlView Page setting action 'OnPress' for element 'minus'
          _view.minus.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'minus'
          _view.segmentSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'segmentSet'
          _view.segmentSet.linkProperty("SizeX",  function() { return dx; }, function(_v) { dx = _v; } ); // HtmlView Page linking property 'SizeX' for element 'segmentSet'
          _view.segmentSet.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView Page linking property 'X' for element 'segmentSet'
          _view.segmentSet.linkProperty("Y",  function() { return ymax; }, function(_v) { ymax = _v; } ); // HtmlView Page linking property 'Y' for element 'segmentSet'
          _view.segmentSet.linkProperty("SizeY",  function() { return dy; }, function(_v) { dy = _v; } ); // HtmlView Page linking property 'SizeY' for element 'segmentSet'
          _view.shapeSet2.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("Transformation",  function() { return cta; }, function(_v) { cta = _v; } ); // HtmlView Page linking property 'Transformation' for element 'shapeSet2'
          _view.shapeSet2.setAction("OnDrag", function(_data,_info) {
  drag ();

}); // HtmlView Page setting action 'OnDrag' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("ElementInteracted",  function() { return ballMoved; }, function(_v) { ballMoved = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet2'
          _view.shapeSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet'
          _view.shapeSet.linkProperty("Transformation",  function() { return cta; }, function(_v) { cta = _v; } ); // HtmlView Page linking property 'Transformation' for element 'shapeSet'
          _view.shapeSet.setAction("OnDrag", function(_data,_info) {
  drag ();

}); // HtmlView Page setting action 'OnDrag' for element 'shapeSet'
          _view.shapeSet.linkProperty("ElementInteracted",  function() { return ballMoved; }, function(_v) { ballMoved = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet'
          _view.shapeSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet'
          _view.shapeSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet'
          _view.textSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return l_m; }, function(_v) { l_m = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet'
          _view.textSet.setAction("OnDrag", function(_data,_info) {
  mi= m[ballMoved]=+1;
  //m[ballMoved]=mi;
  l_m[ballMoved]=""+_view._format(m[ballMoved],"0");

}); // HtmlView Page setting action 'OnDrag' for element 'textSet'
          _view.textSet.linkProperty("ElementInteracted",  function() { return ballMoved; }, function(_v) { ballMoved = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'textSet'
          _view.textSet.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'textSet'
          _view.textSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet'
          _view.textSet.setAction("OnPress", function(_data,_info) {
  mi= m[ballMoved]=+1;
  //m[ballMoved]=mi;
  l_m[ballMoved]=""+_view._format(m[ballMoved],"0");

}); // HtmlView Page setting action 'OnPress' for element 'textSet'
          _view.textSet.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'textSet'
          _view.controlmass.linkProperty("Visibility",  function() { return n>0.5; } ); // HtmlView Page linking property 'Visibility' for element 'controlmass'
          _view.decreasem.linkProperty("Transformation",  function() { return cta[0]; } ); // HtmlView Page linking property 'Transformation' for element 'decreasem'
          _view.decreasem.linkProperty("X",  function() { return x[0]+size/2*Math.sin(cta[0]); } ); // HtmlView Page linking property 'X' for element 'decreasem'
          _view.decreasem.linkProperty("Y",  function() { return y[0]-size/2*Math.cos(cta[0]); } ); // HtmlView Page linking property 'Y' for element 'decreasem'
          _view.decreasem.setAction("OnPress", function(_data,_info) {
  m[0]=m[0]-1;
  if (m[0]<1 ){
    m[0]=1; // set lower limit
  alert("limit to minimum mass of 1");
  }
  l_m[0]=""+_view._format(m[0],"0");
  ballMoved=0; //sync with sliders
  mi=m[0];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'decreasem'
          _view.increasem.linkProperty("Transformation",  function() { return cta[0]; } ); // HtmlView Page linking property 'Transformation' for element 'increasem'
          _view.increasem.linkProperty("X",  function() { return x[0]-size/2*Math.sin(cta[0]); } ); // HtmlView Page linking property 'X' for element 'increasem'
          _view.increasem.linkProperty("Y",  function() { return y[0]+size/2*Math.cos(cta[0]); } ); // HtmlView Page linking property 'Y' for element 'increasem'
          _view.increasem.setAction("OnPress", function(_data,_info) {
  m[0]=m[0]+1;
  l_m[0]=""+_view._format(m[0],"0");
  ballMoved=0; //sync with sliders
  mi=m[0];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'increasem'
          _view.controlmass2.linkProperty("Visibility",  function() { return n>1.5; } ); // HtmlView Page linking property 'Visibility' for element 'controlmass2'
          _view.decreasem2.linkProperty("Transformation",  function() { return cta[1]; } ); // HtmlView Page linking property 'Transformation' for element 'decreasem2'
          _view.decreasem2.linkProperty("X",  function() { return x[1]+size/2*Math.sin(cta[1]); } ); // HtmlView Page linking property 'X' for element 'decreasem2'
          _view.decreasem2.linkProperty("Y",  function() { return y[1]-size/2*Math.cos(cta[1]); } ); // HtmlView Page linking property 'Y' for element 'decreasem2'
          _view.decreasem2.setAction("OnPress", function(_data,_info) {
  m[1]=m[1]-1;
  if (m[1]<1 ){
    m[1]=1; // set lower limit
  alert("limit to minimum mass of 1");
  }
  l_m[1]=""+_view._format(m[1],"0");
  ballMoved=1; //sync with sliders
  mi=m[1];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'decreasem2'
          _view.increasem2.linkProperty("Transformation",  function() { return cta[1]; } ); // HtmlView Page linking property 'Transformation' for element 'increasem2'
          _view.increasem2.linkProperty("X",  function() { return x[1]-size/2*Math.sin(cta[1]); } ); // HtmlView Page linking property 'X' for element 'increasem2'
          _view.increasem2.linkProperty("Y",  function() { return y[1]+size/2*Math.cos(cta[1]); } ); // HtmlView Page linking property 'Y' for element 'increasem2'
          _view.increasem2.setAction("OnPress", function(_data,_info) {
  m[1]=m[1]+1;
  l_m[1]=""+_view._format(m[1],"0");
  ballMoved=1; //sync with sliders
  mi=m[1];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'increasem2'
          _view.controlmass22.linkProperty("Visibility",  function() { return n>2.5; } ); // HtmlView Page linking property 'Visibility' for element 'controlmass22'
          _view.decreasem22.linkProperty("Transformation",  function() { return cta[2]; } ); // HtmlView Page linking property 'Transformation' for element 'decreasem22'
          _view.decreasem22.linkProperty("X",  function() { return x[2]+size/2*Math.sin(cta[2]); } ); // HtmlView Page linking property 'X' for element 'decreasem22'
          _view.decreasem22.linkProperty("Y",  function() { return y[2]-size/2*Math.cos(cta[2]); } ); // HtmlView Page linking property 'Y' for element 'decreasem22'
          _view.decreasem22.setAction("OnPress", function(_data,_info) {
  m[2]=m[2]-1;
  if (m[2]<1 ){
    
    m[2]=1; // set lower limit
  alert("limit to minimum mass of 1");
  }
  l_m[2]=""+_view._format(m[2],"0");
  ballMoved=2; //sync with sliders
  mi=m[2];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'decreasem22'
          _view.increasem22.linkProperty("Transformation",  function() { return cta[2]; } ); // HtmlView Page linking property 'Transformation' for element 'increasem22'
          _view.increasem22.linkProperty("X",  function() { return x[2]-size/2*Math.sin(cta[2]); } ); // HtmlView Page linking property 'X' for element 'increasem22'
          _view.increasem22.linkProperty("Y",  function() { return y[2]+size/2*Math.cos(cta[2]); } ); // HtmlView Page linking property 'Y' for element 'increasem22'
          _view.increasem22.setAction("OnPress", function(_data,_info) {
  m[2]=m[2]+1;
  l_m[2]=""+_view._format(m[2],"0");
  ballMoved=2; //sync with sliders
  mi=m[2];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'increasem22'
          _view.controlmass23.linkProperty("Visibility",  function() { return n>3.5; } ); // HtmlView Page linking property 'Visibility' for element 'controlmass23'
          _view.decreasem23.linkProperty("Transformation",  function() { return cta[3]; } ); // HtmlView Page linking property 'Transformation' for element 'decreasem23'
          _view.decreasem23.linkProperty("X",  function() { return x[3]+size/2*Math.sin(cta[3]); } ); // HtmlView Page linking property 'X' for element 'decreasem23'
          _view.decreasem23.linkProperty("Y",  function() { return y[3]-size/2*Math.cos(cta[3]); } ); // HtmlView Page linking property 'Y' for element 'decreasem23'
          _view.decreasem23.setAction("OnPress", function(_data,_info) {
  m[3]=m[3]-1;
  if (m[3]<1 ){
    m[3]=1; // set lower limit
  alert("limit to minimum mass of 1");
  }
  l_m[3]=""+_view._format(m[3],"0");
  ballMoved=3; //sync with sliders
  mi=m[3];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'decreasem23'
          _view.increasem23.linkProperty("Transformation",  function() { return cta[3]; } ); // HtmlView Page linking property 'Transformation' for element 'increasem23'
          _view.increasem23.linkProperty("X",  function() { return x[3]-size/2*Math.sin(cta[3]); } ); // HtmlView Page linking property 'X' for element 'increasem23'
          _view.increasem23.linkProperty("Y",  function() { return y[3]+size/2*Math.cos(cta[3]); } ); // HtmlView Page linking property 'Y' for element 'increasem23'
          _view.increasem23.setAction("OnPress", function(_data,_info) {
  m[3]=m[3]+1;
  l_m[3]=""+_view._format(m[3],"0");
  ballMoved=3; //sync with sliders
  mi=m[3];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'increasem23'
          _view.controlmass24.linkProperty("Visibility",  function() { return n>4.5; } ); // HtmlView Page linking property 'Visibility' for element 'controlmass24'
          _view.decreasem24.linkProperty("Transformation",  function() { return cta[4]; } ); // HtmlView Page linking property 'Transformation' for element 'decreasem24'
          _view.decreasem24.linkProperty("X",  function() { return x[4]+size/2*Math.sin(cta[4]); } ); // HtmlView Page linking property 'X' for element 'decreasem24'
          _view.decreasem24.linkProperty("Y",  function() { return y[4]-size/2*Math.cos(cta[4]); } ); // HtmlView Page linking property 'Y' for element 'decreasem24'
          _view.decreasem24.setAction("OnPress", function(_data,_info) {
  m[4]=m[4]-1;
  if (m[4]<1 ){
    m[4]=1; // set lower limit
  alert("limit to minimum mass of 1");
  }
  l_m[4]=""+_view._format(m[4],"0");
  ballMoved=4; //sync with sliders
  mi=m[4];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'decreasem24'
          _view.increasem24.linkProperty("Transformation",  function() { return cta[4]; } ); // HtmlView Page linking property 'Transformation' for element 'increasem24'
          _view.increasem24.linkProperty("X",  function() { return x[4]-size/2*Math.sin(cta[4]); } ); // HtmlView Page linking property 'X' for element 'increasem24'
          _view.increasem24.linkProperty("Y",  function() { return y[4]+size/2*Math.cos(cta[4]); } ); // HtmlView Page linking property 'Y' for element 'increasem24'
          _view.increasem24.setAction("OnPress", function(_data,_info) {
  m[4]=m[4]+1;
  l_m[4]=""+_view._format(m[4],"0");
  ballMoved=4; //sync with sliders
  mi=m[4];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'increasem24'
          _view.controlmass25.linkProperty("Visibility",  function() { return n>5.5; } ); // HtmlView Page linking property 'Visibility' for element 'controlmass25'
          _view.decreasem25.linkProperty("Transformation",  function() { return cta[5]; } ); // HtmlView Page linking property 'Transformation' for element 'decreasem25'
          _view.decreasem25.linkProperty("X",  function() { return x[5]+size/2*Math.sin(cta[5]); } ); // HtmlView Page linking property 'X' for element 'decreasem25'
          _view.decreasem25.linkProperty("Y",  function() { return y[5]-size/2*Math.cos(cta[5]); } ); // HtmlView Page linking property 'Y' for element 'decreasem25'
          _view.decreasem25.setAction("OnPress", function(_data,_info) {
  m[5]=m[5]-1;
  if (m[5]<1 ) {
    m[5]=1; // set lower limit
  alert("limit to minimum mass of 1");
  }
  l_m[5]=""+_view._format(m[5],"0");
  ballMoved=5; //sync with sliders
  mi=m[5];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'decreasem25'
          _view.increasem25.linkProperty("Transformation",  function() { return cta[5]; } ); // HtmlView Page linking property 'Transformation' for element 'increasem25'
          _view.increasem25.linkProperty("X",  function() { return x[5]-size/2*Math.sin(cta[5]); } ); // HtmlView Page linking property 'X' for element 'increasem25'
          _view.increasem25.linkProperty("Y",  function() { return y[5]+size/2*Math.cos(cta[5]); } ); // HtmlView Page linking property 'Y' for element 'increasem25'
          _view.increasem25.setAction("OnPress", function(_data,_info) {
  m[5]=m[5]+1;
  l_m[5]=""+_view._format(m[5],"0");
  ballMoved=5; //sync with sliders
  mi=m[5];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'increasem25'
          _view.controlmass26.linkProperty("Visibility",  function() { return n>6.5; } ); // HtmlView Page linking property 'Visibility' for element 'controlmass26'
          _view.decreasem26.linkProperty("Transformation",  function() { return cta[6]; } ); // HtmlView Page linking property 'Transformation' for element 'decreasem26'
          _view.decreasem26.linkProperty("X",  function() { return x[6]+size/2*Math.sin(cta[6]); } ); // HtmlView Page linking property 'X' for element 'decreasem26'
          _view.decreasem26.linkProperty("Y",  function() { return y[6]-size/2*Math.cos(cta[6]); } ); // HtmlView Page linking property 'Y' for element 'decreasem26'
          _view.decreasem26.setAction("OnPress", function(_data,_info) {
  m[6]=m[6]-1;
  if (m[6]<1 ){
    m[6]=1; // set lower limit
  alert("limit to minimum mass of 1");
  }
  l_m[6]=""+_view._format(m[6],"0");
  ballMoved=6; //sync with sliders
  mi=m[6];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'decreasem26'
          _view.increasem26.linkProperty("Transformation",  function() { return cta[6]; } ); // HtmlView Page linking property 'Transformation' for element 'increasem26'
          _view.increasem26.linkProperty("X",  function() { return x[6]-size/2*Math.sin(cta[6]); } ); // HtmlView Page linking property 'X' for element 'increasem26'
          _view.increasem26.linkProperty("Y",  function() { return y[6]+size/2*Math.cos(cta[6]); } ); // HtmlView Page linking property 'Y' for element 'increasem26'
          _view.increasem26.setAction("OnPress", function(_data,_info) {
  m[6]=m[6]+1;
  l_m[6]=""+_view._format(m[6],"0");
  ballMoved=6; //sync with sliders
  mi=m[6];//sync with sliders;

}); // HtmlView Page setting action 'OnPress' for element 'increasem26'
          _view.plottingPanel2.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel2'
          _view.plottingPanel2.linkProperty("Width",  function() { return Width2; }, function(_v) { Width2 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel2'
          _view.plottingPanel2.linkProperty("TRMessage",  function() { return "KE1="+_view._format(KE[0],"0.00")+", KE2="+_view._format(KE[1],"0.00")+", KE3="+_view._format(KE[2],"0.00")+", KE4="+_view._format(KE[3],"0.00")+", KE5="+_view._format(KE[4],"0.00")+", KE6="+_view._format(KE[5],"0.00")+", KE7="+_view._format(KE[6],"0.00"); } ); // HtmlView Page linking property 'TRMessage' for element 'plottingPanel2'
          _view.plottingPanel2.linkProperty("BRMessage",  function() { return text1; }, function(_v) { text1 = _v; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanel2'
          _view.trail.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'trail'
          _view.trail.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail'
          _view.trail.linkProperty("Visibility",  function() { return kevst; }, function(_v) { kevst = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail'
          _view.trail.linkProperty("InputY",  function() { return ketotal; }, function(_v) { ketotal = _v; } ); // HtmlView Page linking property 'InputY' for element 'trail'
          _view.trail2.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'trail2'
          _view.trail2.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail2'
          _view.trail2.linkProperty("Visibility",  function() { return pevst; }, function(_v) { pevst = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail2'
          _view.trail2.linkProperty("InputY",  function() { return petotal; }, function(_v) { petotal = _v; } ); // HtmlView Page linking property 'InputY' for element 'trail2'
          _view.trail22.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'trail22'
          _view.trail22.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail22'
          _view.trail22.linkProperty("Visibility",  function() { return tevst; }, function(_v) { tevst = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail22'
          _view.trail22.linkProperty("InputY",  function() { return tetotal; }, function(_v) { tetotal = _v; } ); // HtmlView Page linking property 'InputY' for element 'trail22'
          _view.trailSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'trailSet'
          _view.trailSet.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'trailSet'
          _view.trailSet.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trailSet'
          _view.trailSet.linkProperty("InputY",  function() { return KE; }, function(_v) { KE = _v; } ); // HtmlView Page linking property 'InputY' for element 'trailSet'
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
function newtonscadlerealwee_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = newtonscadlerealwee_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Intro Page','./newtonscadlerealwee_Intro_1.html');

  return _view;
} // end of main function

function newtonscadlerealwee_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"displayPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'displayPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.displayPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audio'
      .setProperty("AudioUrl","./NewtonCradle/lookang-SoundSilk-Newtons-Cradle.mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"sound", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'sound'
      .setProperty("Text","Sound 🔊") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'sound'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Tooltip","select user_defined and drag the mass") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton'
      .setProperty("Width","30vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton'
      .setProperty("TextOn","Play ►") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton'
      .setProperty("TextOff","Pause ||") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton'
      .setProperty("Width","30vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton'
      .setProperty("Text","Reset ↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel2", _view.displayPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel2'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"worldgraph", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'worldgraph'
      .setProperty("Tooltip","select user_defined and drag the mass") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'worldgraph'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'worldgraph'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'worldgraph'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"g", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'g'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'g'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label32", _view.g) // EJsS HtmlView.HtmlView Page: declaration of element 'label32'
      .setProperty("Background","Red") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'label32'
      .setProperty("Tooltip","gravitational acceleration") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'label32'
      .setProperty("Text"," g = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label32'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider22", _view.g) // EJsS HtmlView.HtmlView Page: declaration of element 'slider22'
      .setProperty("Maximum",19.62) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'slider22'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'slider22'
      .setProperty("Background","Red") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'slider22'
      .setProperty("Tooltip","gravitational acceleration") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'slider22'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field22", _view.g) // EJsS HtmlView.HtmlView Page: declaration of element 'field22'
      .setProperty("Width",30) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field22'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field22'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label222", _view.g) // EJsS HtmlView.HtmlView Page: declaration of element 'label222'
      .setProperty("Background","Red") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'label222'
      .setProperty("Tooltip","metre per second square") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'label222'
      .setProperty("Text"," m/s^2 ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label222'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"n4", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'n4'
      .setProperty("Background","Gray") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'n4'
      .setProperty("Tooltip","number of balls ") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'n4'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'n4'
      .setProperty("Text"," n = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'n4'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"n22", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'n22'
      .setProperty("Maximum",7) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'n22'
      .setProperty("Minimum",1) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'n22'
      .setProperty("Background","Gray") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'n22'
      .setProperty("Tooltip","number of balls ") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'n22'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"n32", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'n32'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'n32'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'n32'
      .setProperty("Tooltip","number of balls ") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'n32'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"ballmoved4", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'ballmoved4'
      .setProperty("Background","Gray") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'ballmoved4'
      .setProperty("Tooltip","ball number to move from left to right") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ballmoved4'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'ballmoved4'
      .setProperty("Text"," i = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'ballmoved4'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"ballmoved23", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'ballmoved23'
      .setProperty("Maximum",6) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'ballmoved23'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'ballmoved23'
      .setProperty("Background","Gray") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'ballmoved23'
      .setProperty("Tooltip","ball number to move from left to right") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ballmoved23'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'ballmoved23'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"ballmoved33", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'ballmoved33'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'ballmoved33'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'ballmoved33'
      .setProperty("Tooltip","ball number to move from left to right") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ballmoved33'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"mi2", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'mi2'
      .setProperty("Background","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'mi2'
      .setProperty("Tooltip","mass of ballMoved") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'mi2'
      .setProperty("Text"," m[i] = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'mi2'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"ballmoved222", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'ballmoved222'
      .setProperty("Maximum",5) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'ballmoved222'
      .setProperty("Minimum",1) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'ballmoved222'
      .setProperty("Background","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'ballmoved222'
      .setProperty("Tooltip","ball number to move from left to right") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ballmoved222'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'ballmoved222'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"ballmoved322", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'ballmoved322'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'ballmoved322'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'ballmoved322'
      .setProperty("Tooltip","ball number to move from left to right") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ballmoved322'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"ballmoved422", _view.controlPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'ballmoved422'
      .setProperty("Background","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'ballmoved422'
      .setProperty("Tooltip","kilogram") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ballmoved422'
      .setProperty("Text"," kg ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'ballmoved422'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view.displayPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'topPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("Background","url(#mygrandient2)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("GridYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridYShow' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("GridXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'GridXShow' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controln", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'controln'
      .setProperty("Y",-1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'controln'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"plus", _view.controln) // EJsS HtmlView.HtmlView Page: declaration of element 'plus'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'plus'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'plus'
      .setProperty("X",0.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'plus'
      .setProperty("Y",0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'plus'
      .setProperty("Text","+") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'plus'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'plus'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"minus", _view.controln) // EJsS HtmlView.HtmlView Page: declaration of element 'minus'
      .setProperty("RelativePosition","EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'minus'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'minus'
      .setProperty("X",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'minus'
      .setProperty("Y",0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'minus'
      .setProperty("Text","-") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'minus'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'minus'
      ;

    _view._addElement(EJSS_DRAWING2D.segmentSet,"segmentSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'segmentSet'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'segmentSet'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'segmentSet'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet2'
      .setProperty("FillColor","Gray") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeSet2'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet2'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'shapeSet2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shapeSet2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet'
      .setProperty("FillColor","url(#mygrandient1)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeSet'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet'
      .setProperty("Sensitivity",30) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSet'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'shapeSet'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shapeSet'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'textSet'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'textSet'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'textSet'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'textSet'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'textSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'group'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controlmass", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'controlmass'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"decreasem", _view.controlmass) // EJsS HtmlView.HtmlView Page: declaration of element 'decreasem'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'decreasem'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'decreasem'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'decreasem'
      .setProperty("SizeY",-10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'decreasem'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'decreasem'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'decreasem'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'decreasem'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'decreasem'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"increasem", _view.controlmass) // EJsS HtmlView.HtmlView Page: declaration of element 'increasem'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'increasem'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'increasem'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'increasem'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'increasem'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'increasem'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'increasem'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'increasem'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'increasem'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controlmass2", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'controlmass2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"decreasem2", _view.controlmass2) // EJsS HtmlView.HtmlView Page: declaration of element 'decreasem2'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'decreasem2'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'decreasem2'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'decreasem2'
      .setProperty("SizeY",-10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'decreasem2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'decreasem2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'decreasem2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'decreasem2'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'decreasem2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"increasem2", _view.controlmass2) // EJsS HtmlView.HtmlView Page: declaration of element 'increasem2'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'increasem2'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'increasem2'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'increasem2'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'increasem2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'increasem2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'increasem2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'increasem2'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'increasem2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controlmass22", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'controlmass22'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"decreasem22", _view.controlmass22) // EJsS HtmlView.HtmlView Page: declaration of element 'decreasem22'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'decreasem22'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'decreasem22'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'decreasem22'
      .setProperty("SizeY",-10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'decreasem22'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'decreasem22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'decreasem22'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'decreasem22'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'decreasem22'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"increasem22", _view.controlmass22) // EJsS HtmlView.HtmlView Page: declaration of element 'increasem22'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'increasem22'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'increasem22'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'increasem22'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'increasem22'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'increasem22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'increasem22'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'increasem22'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'increasem22'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controlmass23", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'controlmass23'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"decreasem23", _view.controlmass23) // EJsS HtmlView.HtmlView Page: declaration of element 'decreasem23'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'decreasem23'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'decreasem23'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'decreasem23'
      .setProperty("SizeY",-10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'decreasem23'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'decreasem23'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'decreasem23'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'decreasem23'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'decreasem23'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"increasem23", _view.controlmass23) // EJsS HtmlView.HtmlView Page: declaration of element 'increasem23'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'increasem23'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'increasem23'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'increasem23'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'increasem23'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'increasem23'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'increasem23'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'increasem23'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'increasem23'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controlmass24", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'controlmass24'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"decreasem24", _view.controlmass24) // EJsS HtmlView.HtmlView Page: declaration of element 'decreasem24'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'decreasem24'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'decreasem24'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'decreasem24'
      .setProperty("SizeY",-10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'decreasem24'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'decreasem24'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'decreasem24'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'decreasem24'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'decreasem24'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"increasem24", _view.controlmass24) // EJsS HtmlView.HtmlView Page: declaration of element 'increasem24'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'increasem24'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'increasem24'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'increasem24'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'increasem24'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'increasem24'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'increasem24'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'increasem24'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'increasem24'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controlmass25", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'controlmass25'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"decreasem25", _view.controlmass25) // EJsS HtmlView.HtmlView Page: declaration of element 'decreasem25'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'decreasem25'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'decreasem25'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'decreasem25'
      .setProperty("SizeY",-10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'decreasem25'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'decreasem25'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'decreasem25'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'decreasem25'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'decreasem25'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"increasem25", _view.controlmass25) // EJsS HtmlView.HtmlView Page: declaration of element 'increasem25'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'increasem25'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'increasem25'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'increasem25'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'increasem25'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'increasem25'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'increasem25'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'increasem25'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'increasem25'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"controlmass26", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'controlmass26'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"decreasem26", _view.controlmass26) // EJsS HtmlView.HtmlView Page: declaration of element 'decreasem26'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'decreasem26'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'decreasem26'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'decreasem26'
      .setProperty("SizeY",-10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'decreasem26'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'decreasem26'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'decreasem26'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'decreasem26'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'decreasem26'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"increasem26", _view.controlmass26) // EJsS HtmlView.HtmlView Page: declaration of element 'increasem26'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'increasem26'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'increasem26'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'increasem26'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'increasem26'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'increasem26'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'increasem26'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'increasem26'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'increasem26'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel2", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel2'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel2'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel2'
      .setProperty("Title","energy") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanel2'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel2'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel2'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel2'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel2'
      .setProperty("TitleX","t") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanel2'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel2'
      .setProperty("MarginX",5) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanel2'
      .setProperty("MarginY",5) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanel2'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel2'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group2", _view.plottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'group2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'group2'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail", _view.group2) // EJsS HtmlView.HtmlView Page: declaration of element 'trail'
      .setProperty("Maximum",400) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trail'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trail'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail2", _view.group2) // EJsS HtmlView.HtmlView Page: declaration of element 'trail2'
      .setProperty("Maximum",400) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trail2'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail2'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trail2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail2'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail22", _view.group2) // EJsS HtmlView.HtmlView Page: declaration of element 'trail22'
      .setProperty("Maximum",400) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trail22'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail22'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trail22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail22'
      ;

    _view._addElement(EJSS_DRAWING2D.trailSet,"trailSet", _view.group2) // EJsS HtmlView.HtmlView Page: declaration of element 'trailSet'
      .setProperty("Maximum",400) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trailSet'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trailSet'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'trailSet'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trailSet'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trailSet'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.displayPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h2>Newton's cradle</h2>  <p>Newton's cradle is a device that demonstrates conservation of momentum and energy using a series of swinging spheres. When one sphere at the end is lifted and released, it strikes the stationary spheres, transmitting a force through the stationary spheres that pushes the last sphere upward. The last sphere swings back and strikes the still nearly stationary spheres, repeating the effect in the opposite direction. The device is named after 17th-century English scientist Sir Isaac Newton. It is also known as Newton's pendulum, Newton's balls, Newton's rocker or executive ball clicker (since the device makes a click each time the balls collide, which they do repeatedly in a steady rhythm).</p> <p>A typical Newton's cradle consists of a series of identically sized metal balls suspended in a metal frame so that they are just touching each other at rest. Each ball is attached to the frame by two wires of equal length angled away from each other. This restricts the pendulums' movements to the same plane.</p> <h2>Controls</h2> <p>The first comboBox allows eay selection of number of balls in the Newton's cradle</p> <p> 1 ball to the left</p> <p> 2 balls to the left</p> <p> 3 balls to the left</p> <p> 4 balls to the left</p> <p> 5 balls to the left</p> <p> 6 balls to the left</p> <p> 7 balls to the left</p> <p> 1 ball 1 raises 1 ball to the left and 1 ball to the right</p> <p> 2 ball 1 raises 2 ball to the left and 1 ball to the right</p> <p> 2 ball 2 raises 2 balls to the left and 2 balls to the right</p> <p> 3 ball 3 raises 3 balls to the left and 3 balls to the right</p> <p>n is the number of balls allowed</p> <p>i is the index of the ball to change</p> <p>for which m[i] is the mass of the index ball</p> <p>play button starts the simulation</p> <p>reset button starts the simulation at afresh</p> <h2>Physics explanation</h2> <p>Newton's cradle can be modeled fairly accurately with simple mathematical equations with the assumption that the balls always collide in pairs.</p> <p> The motion of the balls are modelled using $ \\frac{d\\theta[i]}{dt} = \\omega[i]$ </p> <p>where $\\theta$ is the angle of the ball</p> <p> $ \\omega $ is the angular velocity </p> <p> i represents each element of the ball</p> <p> t is time </p> <p> the second order differential equation is $\\frac{d(\\omega[i])}{dt}=-\\frac{g*sin(\\theta[i])}{L}-k*L*\\omega[i] $ </p> <p> where g is gravitational constant 9.81 $m/s^2$ </p> <p> L is the length of the inextensible string connecting the ball to the support for rotational motion </p> <p> k is a resistant coefficient to rotational motion $ \\omega $ </p> <h2>Events of the ordinary differential equations</h2> <p>In a state event, a TOLERANCE =1.0e-6 is defined, a loop to check through each ball i, where a check of the $\\theta[i]$ is greater than $\\theta[i+1]$ plus the TOLERANCE, if true, return the balls to their closed up angular position $\\theta[i+1]-\\theta[i]$. If false, do nothing. </p> <p>The following actions are carried out at the end of the event</p> <p>$m_{1}=m[cid]$ where $m_{1}$ is a dummy variable to contain mass of collision with index = cid</p> <p>$m_{2}=m[cid+1]$;where $m_{2}$ is a dummy variable to contain mass of collision with index = cid+1</p> <p>$v_{1}=L*\\omega[cid]$;</p> <p>$v_{2}=L*\\omega[cid+1]$;</p> <p>$v_{a}=\\frac{((m_{1}-m_{2})*v_{1}+2*m_{2}*v_{2})}{(m_{1}+m_{2})}$;// velocity after collision</p> <p>$v_{b}=\\frac{(2*m_{1}*v_{1}+(m_{2}-m_{1})*v_{2})}{(m_{1}+m_{2})}$;</p> <p>$\\omega[cid]=\\frac{v_{a}}{L}$;// back to omega</p> <p>$\\omega[cid+1]=\\frac{v_{b}}{L}$;</p> <h2>Fixed Relationship Calculations</h2> <p>There is a for loop over i=0 to i less than number of balls to calculate the following to constraint the masses to move in pendulum-part of a circular path</p> <p> $ dx[i]=L*(sin \\theta[i]) $ where dx[i] is the change is x[i] position</p> <p> $ dy[i]=-L*cos(\\theta[i])  $ where dy[i] is the change in y[i] position</p> <p> x[i]=xc[i]+dx[i] where xc[i] is each balls centre or equilibrium x position</p> <p> y[i]=ymax+dy[i] where ymax is the support y position</p> <p>  $ vx[i]=L*\\omega[i]*cos(\\theta[i]) $ where vx[i] is the x direction linear velocities of each ball</p> <p> $ vy[i]=L*\\omega[i]*sin(\\theta[i]) $ where vy[i] is the y direction linear velocities of each ball</p> <h2>Others</h2> <ul>   <li><a href=\"https://shope.ee/3AhkYwOP03?share_channel_code=1\" target=\"_blank\">Buy from Shopee</a></li>   <li><a href=\"https://iwant2study.org/ospsg/index.php/interactive-resources/physics/02-newtonian-mechanics/02-dynamics/47-newton-cradle\" target=\"_blank\">Need a 2D version?</a></li>   <li><a href=\"https://iwant2study.org/ospsg/index.php/interactive-resources/physics/02-newtonian-mechanics/02-dynamics/48-newton-cradle-3d\" target=\"_blank\">Need a 3D version?</a></li> </ul>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new newtonscadlerealwee("_topFrame","_ejs_library/",null);
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
