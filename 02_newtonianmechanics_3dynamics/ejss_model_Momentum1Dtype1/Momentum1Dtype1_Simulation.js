function Momentum1Dtype1(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var clicked; // EjsS Model.Variables.Var Table.clicked
  var font; // EjsS Model.Variables.Var Table.font
  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var tcollision; // EjsS Model.Variables.Var Table.tcollision
  var texplosion; // EjsS Model.Variables.Var Table.texplosion
  var pi; // EjsS Model.Variables.Var Table.pi
  var max; // EjsS Model.Variables.Var Table.max
  var xmin; // EjsS Model.Variables.Var Table.xmin
  var xmax; // EjsS Model.Variables.Var Table.xmax
  var ymin; // EjsS Model.Variables.Var Table.ymin
  var ymax; // EjsS Model.Variables.Var Table.ymax
  var range; // EjsS Model.Variables.Var Table.range
  var size; // EjsS Model.Variables.Var Table.size
  var size2; // EjsS Model.Variables.Var Table.size2
  var mass1; // EjsS Model.Variables.Var Table.mass1
  var mass2; // EjsS Model.Variables.Var Table.mass2
  var radius1; // EjsS Model.Variables.Var Table.radius1
  var radius2; // EjsS Model.Variables.Var Table.radius2
  var height; // EjsS Model.Variables.Var Table.height
  var x1; // EjsS Model.Variables.Var Table.x1
  var x2; // EjsS Model.Variables.Var Table.x2
  var y; // EjsS Model.Variables.Var Table.y
  var vx1; // EjsS Model.Variables.Var Table.vx1
  var vx1s; // EjsS Model.Variables.Var Table.vx1s
  var vxf1; // EjsS Model.Variables.Var Table.vxf1
  var vx2; // EjsS Model.Variables.Var Table.vx2
  var vx2s; // EjsS Model.Variables.Var Table.vx2s
  var vxf2; // EjsS Model.Variables.Var Table.vxf2
  var es; // EjsS Model.Variables.Var Table.es
  var klinear; // EjsS Model.Variables.Var Table.klinear
  var L; // EjsS Model.Variables.Var Table.L
  var selected; // EjsS Model.Variables.Var Table.selected
  var F1; // EjsS Model.Variables.Var Table.F1
  var F2; // EjsS Model.Variables.Var Table.F2
  var Fmax; // EjsS Model.Variables.Var Table.Fmax
  var totalF; // EjsS Model.Variables.Var Table.totalF
  var view; // EjsS Model.Variables.Var Table.view
  var textt; // EjsS Model.Variables.Var Table.textt
  var mvvst; // EjsS Model.Variables.Var Table.mvvst
  var kevst; // EjsS Model.Variables.Var Table.kevst
  var fvst; // EjsS Model.Variables.Var Table.fvst
  var mom1; // EjsS Model.Variables.Var Table.mom1
  var mom1s; // EjsS Model.Variables.Var Table.mom1s
  var mom2; // EjsS Model.Variables.Var Table.mom2
  var mom2s; // EjsS Model.Variables.Var Table.mom2s
  var mommax; // EjsS Model.Variables.Var Table.mommax
  var KE1; // EjsS Model.Variables.Var Table.KE1
  var KE1s; // EjsS Model.Variables.Var Table.KE1s
  var KE2; // EjsS Model.Variables.Var Table.KE2
  var KE2s; // EjsS Model.Variables.Var Table.KE2s
  var KEmax; // EjsS Model.Variables.Var Table.KEmax
  var totalKE; // EjsS Model.Variables.Var Table.totalKE
  var totalmomentum; // EjsS Model.Variables.Var Table.totalmomentum
  var ideal; // EjsS Model.Variables.Var Table.ideal
  var show1; // EjsS Model.Variables.Var Table.show1
  var show2; // EjsS Model.Variables.Var Table.show2
  var showtotal; // EjsS Model.Variables.Var Table.showtotal
  var showtotaltext; // EjsS Model.Variables.Var Table.showtotaltext
  var brmsg; // EjsS Model.Variables.Var Table.brmsg
  var trmsg; // EjsS Model.Variables.Var Table.trmsg

  var svgDone; // EjsS Model.Variables.once.svgDone

  var x1radius1; // EjsS Model.Variables.test.x1radius1

  var leftwidth; // EjsS Model.Variables.display.leftwidth
  var rightwidth; // EjsS Model.Variables.display.rightwidth
  var leftgraphwidth; // EjsS Model.Variables.display.leftgraphwidth
  var leftgraphheight1; // EjsS Model.Variables.display.leftgraphheight1
  var leftgraphheight2; // EjsS Model.Variables.display.leftgraphheight2
  var leftgraphheight3; // EjsS Model.Variables.display.leftgraphheight3
  var rightgraphwidth; // EjsS Model.Variables.display.rightgraphwidth

  var Android; // EjsS Model.Variables.layout.Android
  var iOS; // EjsS Model.Variables.layout.iOS
  var iPad; // EjsS Model.Variables.layout.iPad
  var iPhone; // EjsS Model.Variables.layout.iPhone
  var isAndroid; // EjsS Model.Variables.layout.isAndroid
  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var Width3; // EjsS Model.Variables.layout.Width3
  var Width4; // EjsS Model.Variables.layout.Width4
  var selectedview; // EjsS Model.Variables.layout.selectedview
  var world; // EjsS Model.Variables.layout.world
  var autoscaley; // EjsS Model.Variables.layout.autoscaley
  var graph; // EjsS Model.Variables.layout.graph
  var graph3; // EjsS Model.Variables.layout.graph3
  var graph4; // EjsS Model.Variables.layout.graph4
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var disabled; // EjsS Model.Variables.layout.disabled

  var MaximumY; // EjsS Model.Variables.graph.MaximumY

  var elasticityMode; // EjsS Model.Variables.questionStuff.elasticityMode

  var wheelAngle; // EjsS Model.Variables.objectwheel.wheelAngle
  var wheelAngle2; // EjsS Model.Variables.objectwheel.wheelAngle2

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
      clicked : clicked,
      font : font,
      t : t,
      dt : dt,
      tcollision : tcollision,
      texplosion : texplosion,
      pi : pi,
      max : max,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      range : range,
      size : size,
      size2 : size2,
      mass1 : mass1,
      mass2 : mass2,
      radius1 : radius1,
      radius2 : radius2,
      height : height,
      x1 : x1,
      x2 : x2,
      y : y,
      vx1 : vx1,
      vx1s : vx1s,
      vxf1 : vxf1,
      vx2 : vx2,
      vx2s : vx2s,
      vxf2 : vxf2,
      es : es,
      klinear : klinear,
      L : L,
      selected : selected,
      F1 : F1,
      F2 : F2,
      Fmax : Fmax,
      totalF : totalF,
      view : view,
      textt : textt,
      mvvst : mvvst,
      kevst : kevst,
      fvst : fvst,
      mom1 : mom1,
      mom1s : mom1s,
      mom2 : mom2,
      mom2s : mom2s,
      mommax : mommax,
      KE1 : KE1,
      KE1s : KE1s,
      KE2 : KE2,
      KE2s : KE2s,
      KEmax : KEmax,
      totalKE : totalKE,
      totalmomentum : totalmomentum,
      ideal : ideal,
      show1 : show1,
      show2 : show2,
      showtotal : showtotal,
      showtotaltext : showtotaltext,
      brmsg : brmsg,
      trmsg : trmsg,
      svgDone : svgDone,
      x1radius1 : x1radius1,
      leftwidth : leftwidth,
      rightwidth : rightwidth,
      leftgraphwidth : leftgraphwidth,
      leftgraphheight1 : leftgraphheight1,
      leftgraphheight2 : leftgraphheight2,
      leftgraphheight3 : leftgraphheight3,
      rightgraphwidth : rightgraphwidth,
      Android : Android,
      iOS : iOS,
      iPad : iPad,
      iPhone : iPhone,
      isAndroid : isAndroid,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      Width3 : Width3,
      Width4 : Width4,
      selectedview : selectedview,
      world : world,
      autoscaley : autoscaley,
      graph : graph,
      graph3 : graph3,
      graph4 : graph4,
      disabledworld : disabledworld,
      disabled : disabled,
      MaximumY : MaximumY,
      elasticityMode : elasticityMode,
      wheelAngle : wheelAngle,
      wheelAngle2 : wheelAngle2
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.clicked != "undefined") clicked = json.clicked;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.tcollision != "undefined") tcollision = json.tcollision;
    if(typeof json.texplosion != "undefined") texplosion = json.texplosion;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.max != "undefined") max = json.max;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.range != "undefined") range = json.range;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.size2 != "undefined") size2 = json.size2;
    if(typeof json.mass1 != "undefined") mass1 = json.mass1;
    if(typeof json.mass2 != "undefined") mass2 = json.mass2;
    if(typeof json.radius1 != "undefined") radius1 = json.radius1;
    if(typeof json.radius2 != "undefined") radius2 = json.radius2;
    if(typeof json.height != "undefined") height = json.height;
    if(typeof json.x1 != "undefined") x1 = json.x1;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vx1 != "undefined") vx1 = json.vx1;
    if(typeof json.vx1s != "undefined") vx1s = json.vx1s;
    if(typeof json.vxf1 != "undefined") vxf1 = json.vxf1;
    if(typeof json.vx2 != "undefined") vx2 = json.vx2;
    if(typeof json.vx2s != "undefined") vx2s = json.vx2s;
    if(typeof json.vxf2 != "undefined") vxf2 = json.vxf2;
    if(typeof json.es != "undefined") es = json.es;
    if(typeof json.klinear != "undefined") klinear = json.klinear;
    if(typeof json.L != "undefined") L = json.L;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.F1 != "undefined") F1 = json.F1;
    if(typeof json.F2 != "undefined") F2 = json.F2;
    if(typeof json.Fmax != "undefined") Fmax = json.Fmax;
    if(typeof json.totalF != "undefined") totalF = json.totalF;
    if(typeof json.view != "undefined") view = json.view;
    if(typeof json.textt != "undefined") textt = json.textt;
    if(typeof json.mvvst != "undefined") mvvst = json.mvvst;
    if(typeof json.kevst != "undefined") kevst = json.kevst;
    if(typeof json.fvst != "undefined") fvst = json.fvst;
    if(typeof json.mom1 != "undefined") mom1 = json.mom1;
    if(typeof json.mom1s != "undefined") mom1s = json.mom1s;
    if(typeof json.mom2 != "undefined") mom2 = json.mom2;
    if(typeof json.mom2s != "undefined") mom2s = json.mom2s;
    if(typeof json.mommax != "undefined") mommax = json.mommax;
    if(typeof json.KE1 != "undefined") KE1 = json.KE1;
    if(typeof json.KE1s != "undefined") KE1s = json.KE1s;
    if(typeof json.KE2 != "undefined") KE2 = json.KE2;
    if(typeof json.KE2s != "undefined") KE2s = json.KE2s;
    if(typeof json.KEmax != "undefined") KEmax = json.KEmax;
    if(typeof json.totalKE != "undefined") totalKE = json.totalKE;
    if(typeof json.totalmomentum != "undefined") totalmomentum = json.totalmomentum;
    if(typeof json.ideal != "undefined") ideal = json.ideal;
    if(typeof json.show1 != "undefined") show1 = json.show1;
    if(typeof json.show2 != "undefined") show2 = json.show2;
    if(typeof json.showtotal != "undefined") showtotal = json.showtotal;
    if(typeof json.showtotaltext != "undefined") showtotaltext = json.showtotaltext;
    if(typeof json.brmsg != "undefined") brmsg = json.brmsg;
    if(typeof json.trmsg != "undefined") trmsg = json.trmsg;
    if(typeof json.svgDone != "undefined") svgDone = json.svgDone;
    if(typeof json.x1radius1 != "undefined") x1radius1 = json.x1radius1;
    if(typeof json.leftwidth != "undefined") leftwidth = json.leftwidth;
    if(typeof json.rightwidth != "undefined") rightwidth = json.rightwidth;
    if(typeof json.leftgraphwidth != "undefined") leftgraphwidth = json.leftgraphwidth;
    if(typeof json.leftgraphheight1 != "undefined") leftgraphheight1 = json.leftgraphheight1;
    if(typeof json.leftgraphheight2 != "undefined") leftgraphheight2 = json.leftgraphheight2;
    if(typeof json.leftgraphheight3 != "undefined") leftgraphheight3 = json.leftgraphheight3;
    if(typeof json.rightgraphwidth != "undefined") rightgraphwidth = json.rightgraphwidth;
    if(typeof json.Android != "undefined") Android = json.Android;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
    if(typeof json.isAndroid != "undefined") isAndroid = json.isAndroid;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.Width3 != "undefined") Width3 = json.Width3;
    if(typeof json.Width4 != "undefined") Width4 = json.Width4;
    if(typeof json.selectedview != "undefined") selectedview = json.selectedview;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.autoscaley != "undefined") autoscaley = json.autoscaley;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.graph3 != "undefined") graph3 = json.graph3;
    if(typeof json.graph4 != "undefined") graph4 = json.graph4;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.MaximumY != "undefined") MaximumY = json.MaximumY;
    if(typeof json.elasticityMode != "undefined") elasticityMode = json.elasticityMode;
    if(typeof json.wheelAngle != "undefined") wheelAngle = json.wheelAngle;
    if(typeof json.wheelAngle2 != "undefined") wheelAngle2 = json.wheelAngle2;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["Init Page 2"] = true;
    __pagesEnabled["svg"] = true;
    __pagesEnabled["Init Page 3"] = true;
    __pagesEnabled["wait"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["Event"] = true;
    __pagesEnabled["leftwall"] = true;
    __pagesEnabled["rightwall"] = true;
    __pagesEnabled["collision"] = true;
    __pagesEnabled["FixRel Page"] = true;
    __pagesEnabled["test"] = true;
    __pagesEnabled["Force"] = true;
    __pagesEnabled["wheels"] = true;
    __pagesEnabled["momentum"] = true;
    __pagesEnabled["axes"] = true;
    __pagesEnabled["equations"] = true;
  });

  _model.addToReset(function() {
    font = "normal normal 1.5vw "; // EjsS Model.Variables.Var Table.font
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.01; // EjsS Model.Variables.Var Table.dt
    tcollision = 10; // EjsS Model.Variables.Var Table.tcollision
    texplosion = 1; // EjsS Model.Variables.Var Table.texplosion
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    max = 10; // EjsS Model.Variables.Var Table.max
    xmin = -3; // EjsS Model.Variables.Var Table.xmin
    xmax = 3; // EjsS Model.Variables.Var Table.xmax
    ymin = -max/2; // EjsS Model.Variables.Var Table.ymin
    ymax = max/2; // EjsS Model.Variables.Var Table.ymax
    range = max; // EjsS Model.Variables.Var Table.range
    size = range/20; // EjsS Model.Variables.Var Table.size
    size2 = size/2; // EjsS Model.Variables.Var Table.size2
    radius1 = size*2; // EjsS Model.Variables.Var Table.radius1
    radius2 = size*2; // EjsS Model.Variables.Var Table.radius2
    height = size; // EjsS Model.Variables.Var Table.height
    x1 = -1; // EjsS Model.Variables.Var Table.x1
    x2 = 1.5; // EjsS Model.Variables.Var Table.x2
    y = 0; // EjsS Model.Variables.Var Table.y
    vxf1 = vx1; // EjsS Model.Variables.Var Table.vxf1
    vxf2 = vx2; // EjsS Model.Variables.Var Table.vxf2
    klinear = 10000; // EjsS Model.Variables.Var Table.klinear
    L = radius2; // EjsS Model.Variables.Var Table.L
    selected = new Array(1); // EjsS Model.Variables.Var Table.selected
    Fmax = 0; // EjsS Model.Variables.Var Table.Fmax
    textt = "Drag carts to adjust their positions,\nthe pink arrows to vary the initial velocities, \n and use the -+buttons to vary the mass of the carts."; // EjsS Model.Variables.Var Table.textt
    mom1 = mass1*vx1; // EjsS Model.Variables.Var Table.mom1
    mom1s = mass1*vx1; // EjsS Model.Variables.Var Table.mom1s
    mom2 = mass2*vx2; // EjsS Model.Variables.Var Table.mom2
    mom2s = mass2*vx2; // EjsS Model.Variables.Var Table.mom2s
    mommax = Math.max(mom1,mom2); // EjsS Model.Variables.Var Table.mommax
    KE1 = 0.5*mass1*(vx1*vx1); // EjsS Model.Variables.Var Table.KE1
    KE1s = 0.5*mass1*(vx1*vx1); // EjsS Model.Variables.Var Table.KE1s
    KE2 = 0.5*mass2*(vx2*vx2); // EjsS Model.Variables.Var Table.KE2
    KE2s = 0.5*mass2*(vx2*vx2); // EjsS Model.Variables.Var Table.KE2s
    KEmax = 10; // EjsS Model.Variables.Var Table.KEmax
    totalKE = KE1 +KE2; // EjsS Model.Variables.Var Table.totalKE
    totalmomentum = mom1 + mom2; // EjsS Model.Variables.Var Table.totalmomentum
    brmsg = ""; // EjsS Model.Variables.Var Table.brmsg
    trmsg = "ideal case of world view of 2 collision carts"; // EjsS Model.Variables.Var Table.trmsg
  });

  _model.addToReset(function() {
  });

  _model.addToReset(function() {
    x1radius1 = x1+radius1; // EjsS Model.Variables.test.x1radius1
  });

  _model.addToReset(function() {
    leftwidth = (_isMobile||_isEPub)?"300px":"45%"; // EjsS Model.Variables.display.leftwidth
    rightwidth = (_isMobile||_isEPub)?"300px":"45%"; // EjsS Model.Variables.display.rightwidth
    leftgraphwidth = (_isMobile||_isEPub)?"300px":"100%"; // EjsS Model.Variables.display.leftgraphwidth
    leftgraphheight1 = (_isMobile||_isEPub)?"300px":"60%"; // EjsS Model.Variables.display.leftgraphheight1
    leftgraphheight2 = (_isMobile||_isEPub)?"300px":"20%"; // EjsS Model.Variables.display.leftgraphheight2
    leftgraphheight3 = (_isMobile||_isEPub)?"300px":"10%"; // EjsS Model.Variables.display.leftgraphheight3
    rightgraphwidth = (_isMobile||_isEPub)?"300px":"100%"; // EjsS Model.Variables.display.rightgraphwidth
  });

  _model.addToReset(function() {
    Android = /Android|android/i.test(navigator.userAgent); // EjsS Model.Variables.layout.Android
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iOS
    iPad = /iPad/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPad
    iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPhone
    isAndroid = checkAndroid(); // EjsS Model.Variables.layout.isAndroid
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"600":"100%"; // EjsS Model.Variables.layout.Height
    selectedview = new Array(1); // EjsS Model.Variables.layout.selectedview
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.layout.selectedview
        selectedview[_i0] = "both";  // EjsS Model.Variables.layout.selectedview
      }
    }());
    world = true; // EjsS Model.Variables.layout.world
    graph = true; // EjsS Model.Variables.layout.graph
    graph3 = true; // EjsS Model.Variables.layout.graph3
    graph4 = true; // EjsS Model.Variables.layout.graph4
    disabledworld = false; // EjsS Model.Variables.layout.disabledworld
    disabled = false; // EjsS Model.Variables.layout.disabled
  });

  _model.addToReset(function() {
    MaximumY = 5; // EjsS Model.Variables.graph.MaximumY
  });

  _model.addToReset(function() {
    elasticityMode = "elastic"; // EjsS Model.Variables.questionStuff.elasticityMode
  });

  _model.addToReset(function() {
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

  function impactForce(xa, xb, va, vb) {  // > CustomCode.Lib Page:1
    var x, z, a, f, masstotal, y;  // > CustomCode.Lib Page:2
    a = 0;  // > CustomCode.Lib Page:3
    if (es > 0.05) { // for es > 0  // > CustomCode.Lib Page:4
      x = Math.log(es) * Math.log(es);  // > CustomCode.Lib Page:5
      z = Math.sqrt(x / (Math.PI * Math.PI + x));  // > CustomCode.Lib Page:6
    } else z = 1; // for es = 0  // > CustomCode.Lib Page:7
    if (xa < xb) {  // > CustomCode.Lib Page:8
      f = klinear * ((xb - xa) - (radius1 + radius2)); //   // > CustomCode.Lib Page:9
    } else {  // > CustomCode.Lib Page:10
      f = klinear * ((radius1 + radius2) - (xa - xb)); //   // > CustomCode.Lib Page:11
    }  // > CustomCode.Lib Page:12
      // > CustomCode.Lib Page:13
    if (Math.abs(xa - xb) < (radius1 + radius2)) { // change to 2*L by lookang  // > CustomCode.Lib Page:14
      a = -2 * z * (Math.sqrt(klinear * mass1 * mass2 / (mass1 + mass2))) * (va - vb) + f;  // > CustomCode.Lib Page:15
    }  // > CustomCode.Lib Page:16
    return a;  // > CustomCode.Lib Page:17
  }  // > CustomCode.Lib Page:18

  function changeOrientation() {  // > CustomCode.changeOrentation:1
    switch (window.orientation) {  // > CustomCode.changeOrentation:2
      case 0:  // > CustomCode.changeOrentation:3
        this.screenOrientation = 'portrait';  // > CustomCode.changeOrentation:4
        if (iPad) {  // > CustomCode.changeOrentation:5
          return Math.max(window.screen.width, window.screen.height) * 0.8;  // > CustomCode.changeOrentation:6
        }  // > CustomCode.changeOrentation:7
        else if (iPhone) {  // > CustomCode.changeOrentation:8
          return Math.max(window.screen.width, window.screen.height) * 0.7;  // > CustomCode.changeOrentation:9
        }  // > CustomCode.changeOrentation:10
        else if (Android && parent.cordova) {  // > CustomCode.changeOrentation:11
          return Math.max(window.innerWidth, window.innerHeight) * 0.8;  // > CustomCode.changeOrentation:12
        }  // > CustomCode.changeOrentation:13
        else {  // > CustomCode.changeOrentation:14
          //return Math.max(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrentation:15
          return window.innerHeight * 0.9;  // > CustomCode.changeOrentation:16
        }  // > CustomCode.changeOrentation:17
        break;  // > CustomCode.changeOrentation:18
      case 90:  // > CustomCode.changeOrentation:19
        this.screenOrientation = 'landscape';  // > CustomCode.changeOrentation:20
        if (iPad) {  // > CustomCode.changeOrentation:21
          return Math.min(window.screen.width, window.screen.height) * 0.8;  // > CustomCode.changeOrentation:22
          // alert("ipad");  // > CustomCode.changeOrentation:23
        }  // > CustomCode.changeOrentation:24
        else if (iPhone) {  // > CustomCode.changeOrentation:25
          return Math.min(window.screen.width, window.screen.height) * 0.7;  // > CustomCode.changeOrentation:26
        }  // > CustomCode.changeOrentation:27
        else if (Android && parent.cordova) { // in Android App form  // > CustomCode.changeOrentation:28
          return Math.min(window.innerWidth, window.innerHeight) * 0.75;  // > CustomCode.changeOrentation:29
          // alert("in Android App form");  // > CustomCode.changeOrentation:30
        }  // > CustomCode.changeOrentation:31
        else { // browser Android and PC  // > CustomCode.changeOrentation:32
          // return Math.min(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrentation:33
          // alert("browser Android and PC");  // > CustomCode.changeOrentation:34
          return window.innerHeight * 0.9;  // > CustomCode.changeOrentation:35
        }  // > CustomCode.changeOrentation:36
        break;  // > CustomCode.changeOrentation:37
      case 180:  // > CustomCode.changeOrentation:38
        this.screenOrientation = 'portrait';  // > CustomCode.changeOrentation:39
        if (iPad) {  // > CustomCode.changeOrentation:40
          return Math.max(window.screen.width, window.screen.height) * 0.8;  // > CustomCode.changeOrentation:41
        }  // > CustomCode.changeOrentation:42
        else if (iPhone) {  // > CustomCode.changeOrentation:43
          return Math.max(window.screen.width, window.screen.height) * 0.7;  // > CustomCode.changeOrentation:44
        }  // > CustomCode.changeOrentation:45
        else if (Android && parent.cordova) {  // > CustomCode.changeOrentation:46
          return Math.max(window.innerWidth, window.innerHeight) * 0.8;  // > CustomCode.changeOrentation:47
        }  // > CustomCode.changeOrentation:48
        else {  // > CustomCode.changeOrentation:49
          // return Math.max(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrentation:50
          return window.innerHeight * 0.9;  // > CustomCode.changeOrentation:51
        }  // > CustomCode.changeOrentation:52
        break;  // > CustomCode.changeOrentation:53
      case -90:  // > CustomCode.changeOrentation:54
        this.screenOrientation = 'landscape';  // > CustomCode.changeOrentation:55
        if (iPad) {  // > CustomCode.changeOrentation:56
          return Math.min(window.screen.width, window.screen.height) * 0.8;  // > CustomCode.changeOrentation:57
        }  // > CustomCode.changeOrentation:58
        else if (iPhone) {  // > CustomCode.changeOrentation:59
          return Math.min(window.screen.width, window.screen.height) * 0.7;  // > CustomCode.changeOrentation:60
        }  // > CustomCode.changeOrentation:61
        else if (Android && parent.cordova) {  // > CustomCode.changeOrentation:62
          return Math.min(window.innerWidth, window.innerHeight) * 0.75;  // > CustomCode.changeOrentation:63
        }  // > CustomCode.changeOrentation:64
        else {  // > CustomCode.changeOrentation:65
          // return Math.min(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrentation:66
          return window.innerHeight * 0.9;  // > CustomCode.changeOrentation:67
        }  // > CustomCode.changeOrentation:68
        break;  // > CustomCode.changeOrentation:69
      default:  // > CustomCode.changeOrentation:70
        this.screenOrientation = 'unknown';  // > CustomCode.changeOrentation:71
        //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.changeOrentation:72
        return window.innerHeight * 0.9;  // > CustomCode.changeOrentation:73
    }  // > CustomCode.changeOrentation:74
  }  // > CustomCode.changeOrentation:75

  function checkAndroid() {  // > CustomCode.android:1
    var ua = navigator.userAgent.toLowerCase();  // > CustomCode.android:2
    return ua.includes("android");  // > CustomCode.android:3
  }  // > CustomCode.android:4

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

  function submitAnalytics() {  // > CustomCode.submitAnalytics:1
    const modeToQn = {"elastic": "Q1", "inelastic": "Q2", "perfectly inelastic": "Q3"};  // > CustomCode.submitAnalytics:2
    const qn = modeToQn[elasticityMode];  // > CustomCode.submitAnalytics:3
    // m1 = mass1  // > CustomCode.submitAnalytics:4
    // m2 = mass2  // > CustomCode.submitAnalytics:5
    // u1 = vx1s  // > CustomCode.submitAnalytics:6
    // u2 = vx2s  // > CustomCode.submitAnalytics:7
    const output = `Mode: ${elasticityMode}\nm1 = ${mass1}\nm2 = ${mass2}\nu1 = ${vx1s}\nu2 = ${vx2s}`;  // > CustomCode.submitAnalytics:8
    questionInstantMark(qn, output);  // > CustomCode.submitAnalytics:9
  }  // > CustomCode.submitAnalytics:10
  function submitAnalytics2() {  // > CustomCode.submitAnalytics:11
    const modeToQn = {"elastic": "Q1", "inelastic": "Q2", "perfectly inelastic": "Q3"};  // > CustomCode.submitAnalytics:12
    const qn = modeToQn[elasticityMode];  // > CustomCode.submitAnalytics:13
    // m1 = mass1  // > CustomCode.submitAnalytics:14
    // m2 = mass2  // > CustomCode.submitAnalytics:15
    // u1 = vx1s  // > CustomCode.submitAnalytics:16
    // u2 = vx2s  // > CustomCode.submitAnalytics:17
    //const output = `Mode: ${elasticityMode},m1 = ${mass1},u1 = ${vx1s},m2 = ${mass2},u1 = ${vx1s},u2 = ${vx2s}`;  // > CustomCode.submitAnalytics:18
    const output = `m1 = ${mass1},u1 = ${vx1s},m2 = ${mass2},u1 = ${vx1s},u2 = ${vx2s}`;  // > CustomCode.submitAnalytics:19
    //questionInstantMark(qn, output);  // > CustomCode.submitAnalytics:20
    startQuestion(qn);  // > CustomCode.submitAnalytics:21
    addQuestionHistory(output); //moodle part of the history  // > CustomCode.submitAnalytics:22
    awardQuestionMarks(1);  // > CustomCode.submitAnalytics:23
    endQuestion(); // stamp the end of Question  // > CustomCode.submitAnalytics:24
  }  // > CustomCode.submitAnalytics:25

  // Assume ECMAScript 6; Chrome >=49, Edge >=14, Firefox >=41, Opera >=36, Safari >=8  // > CustomCode.questionLib:1
  const debugMode = true;  // > CustomCode.questionLib:2
  const _questionLib = {};  // > CustomCode.questionLib:3
  _questionLib.stack = [];  // > CustomCode.questionLib:4
  _questionLib.history = Object.create(null);  // > CustomCode.questionLib:5
  _questionLib.questionMarksAwarded = Object.create(null);  // > CustomCode.questionLib:6
  _questionLib.instantMarksAwarded = Object.create(null);  // > CustomCode.questionLib:7
  const _nullFunction = debugMode ?  // > CustomCode.questionLib:8
    console.log  // > CustomCode.questionLib:9
    :  // > CustomCode.questionLib:10
    function(){};  // > CustomCode.questionLib:11
  function _debugPrint(msg) {  // > CustomCode.questionLib:12
    if (debugMode) {  // > CustomCode.questionLib:13
      console.log(msg);  // > CustomCode.questionLib:14
    }  // > CustomCode.questionLib:15
  }  // > CustomCode.questionLib:16
  function getPendingQuestion() {  // > CustomCode.questionLib:17
    if (!isQuestionStarted()) {  // > CustomCode.questionLib:18
      return null;  // > CustomCode.questionLib:19
    }  // > CustomCode.questionLib:20
    return _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.questionLib:21
  }  // > CustomCode.questionLib:22
  function isQuestionStarted() {  // > CustomCode.questionLib:23
    return _questionLib.stack.length > 0;  // > CustomCode.questionLib:24
  }  // > CustomCode.questionLib:25
  // for assessment.json event - start  // > CustomCode.questionLib:26
  function startQuestion(questionName) {  // > CustomCode.questionLib:27
    _view._addInteraction(_nullFunction, {action:"questionStart", name:questionName}, {element:"questionLib", property:"value"});  // > CustomCode.questionLib:28
    _debugPrint("Start question: " + questionName);  // > CustomCode.questionLib:29
      // > CustomCode.questionLib:30
    _questionLib.stack.push(questionName);  // > CustomCode.questionLib:31
  }  // > CustomCode.questionLib:32
  // for assessment.json history  // > CustomCode.questionLib:33
  function addQuestionHistory(history, questionName=null) {  // > CustomCode.questionLib:34
    if (questionName === null && isQuestionStarted()) {  // > CustomCode.questionLib:35
      questionName = getPendingQuestion();  // > CustomCode.questionLib:36
    }  // > CustomCode.questionLib:37
      // > CustomCode.questionLib:38
    if (!(questionName in _questionLib.history)) {  // > CustomCode.questionLib:39
      _debugPrint("Create question history for " + questionName);  // > CustomCode.questionLib:40
        // > CustomCode.questionLib:41
      _questionLib.history[questionName] = [];  // > CustomCode.questionLib:42
    }  // > CustomCode.questionLib:43
    if (debugMode) {  // > CustomCode.questionLib:44
      console.log("Push \"" + history + "\" to question history for " + questionName);  // > CustomCode.questionLib:45
    }  // > CustomCode.questionLib:46
    _questionLib.history[questionName].push(history);  // > CustomCode.questionLib:47
    _flushQuestionHistory(questionName);  // > CustomCode.questionLib:48
  }  // > CustomCode.questionLib:49
  function _flushQuestionHistory(questionName) {  // > CustomCode.questionLib:50
    // TODO: check if need to flush  // > CustomCode.questionLib:51
    if (questionName === getPendingQuestion()) {  // > CustomCode.questionLib:52
      const outputHistory = _getQuestionHistory(questionName);  // > CustomCode.questionLib:53
      _view._addInteraction(_nullFunction, outputHistory, {property: "historyFor" + questionName, element: "questionLib"});  // > CustomCode.questionLib:54
    }  // > CustomCode.questionLib:55
  }  // > CustomCode.questionLib:56
  function _getQuestionHistory(questionName) {  // > CustomCode.questionLib:57
    if (questionName in _questionLib.history) {  // > CustomCode.questionLib:58
      return _questionLib.history[questionName].join("\n");  // > CustomCode.questionLib:59
    } else {  // > CustomCode.questionLib:60
      _debugPrint("No question \"" + questionName + "\" exists");  // > CustomCode.questionLib:61
      return "";  // > CustomCode.questionLib:62
    }  // > CustomCode.questionLib:63
  }  // > CustomCode.questionLib:64
  // for assessment.json event - states  // > CustomCode.questionLib:65
  function onAnswer(answer, isCorrect=false, history=answer, questionName=null) {  // > CustomCode.questionLib:66
    if (questionName === null && isQuestionStarted()) {  // > CustomCode.questionLib:67
      questionName = _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.questionLib:68
    }  // > CustomCode.questionLib:69
    if (questionName !== null) {  // > CustomCode.questionLib:70
      const explainer = Object.create(null);  // > CustomCode.questionLib:71
      explainer[true] = " ✅";  // > CustomCode.questionLib:72
      explainer[false] = " ❌";  // > CustomCode.questionLib:73
      addQuestionHistory(history + explainer[isCorrect], questionName);  // > CustomCode.questionLib:74
      if (questionName === getPendingQuestion()) {  // > CustomCode.questionLib:75
        _view._addInteraction(_nullFunction, {name:questionName, answer:answer, isCorrect:isCorrect, action:"questionAnswer"}, {property: "answer", element:"questionLib"});  // > CustomCode.questionLib:76
      }  // > CustomCode.questionLib:77
    }  // > CustomCode.questionLib:78
  }  // > CustomCode.questionLib:79
  // for assessment.json event - end  // > CustomCode.questionLib:80
  function endQuestion() {  // > CustomCode.questionLib:81
    if (_questionLib.stack.length > 0) {  // > CustomCode.questionLib:82
      const questionName = _questionLib.stack.pop();  // > CustomCode.questionLib:83
      _debugPrint("End question: " + questionName);  // > CustomCode.questionLib:84
      _view._addInteraction(_nullFunction, {action:"questionEnd", name:questionName}, {element: "questionLib", property: "value"});  // > CustomCode.questionLib:85
    }  // > CustomCode.questionLib:86
  }  // > CustomCode.questionLib:87
  // for assessment.json marks  // > CustomCode.questionLib:88
  function awardQuestionMarks(marks=1) {  // > CustomCode.questionLib:89
    if (isQuestionStarted()) {  // > CustomCode.questionLib:90
      const questionName = getPendingQuestion();  // > CustomCode.questionLib:91
      _questionLib.questionMarksAwarded[questionName] = 1;  // > CustomCode.questionLib:92
        // > CustomCode.questionLib:93
      for (; _questionLib.questionMarksAwarded[questionName] < marks + 1; _questionLib.questionMarksAwarded[questionName]++) {  // > CustomCode.questionLib:94
        _view._addInteraction(_nullFunction, _questionLib.questionMarksAwarded[questionName], {element:"questionLib", property:"awardMarkFor"+questionName});  // > CustomCode.questionLib:95
      }  // > CustomCode.questionLib:96
    }  // > CustomCode.questionLib:97
  }  // > CustomCode.questionLib:98
  function resetQuestionMarks(questionName) {  // > CustomCode.questionLib:99
    _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.questionLib:100
  }  // > CustomCode.questionLib:101
  function questionInstantMark(questionName, message) {  // > CustomCode.questionLib:102
    let shouldAwardMark = true;  // > CustomCode.questionLib:103
    if (questionName in _questionLib.instantMarksAwarded) {  // > CustomCode.questionLib:104
      if (message in _questionLib.instantMarksAwarded[questionName]) {  // > CustomCode.questionLib:105
        shouldAwardMark = false;  // > CustomCode.questionLib:106
      }  // > CustomCode.questionLib:107
    } else {  // > CustomCode.questionLib:108
      _questionLib.instantMarksAwarded[questionName] = Object.create(null);  // > CustomCode.questionLib:109
    }  // > CustomCode.questionLib:110
    _questionLib.instantMarksAwarded[questionName][message] = true;  // > CustomCode.questionLib:111
    if (shouldAwardMark) {  // > CustomCode.questionLib:112
      startQuestion(questionName);  // > CustomCode.questionLib:113
      _debugPrint("" + message);  // > CustomCode.questionLib:114
      if (message) {  // > CustomCode.questionLib:115
        addQuestionHistory(message);  // > CustomCode.questionLib:116
      } else {  // > CustomCode.questionLib:117
        _flushQuestionHistory(questionName);  // > CustomCode.questionLib:118
      }  // > CustomCode.questionLib:119
      awardQuestionMarks();  // > CustomCode.questionLib:120
      endQuestion();  // > CustomCode.questionLib:121
    }  // > CustomCode.questionLib:122
  }  // > CustomCode.questionLib:123
  function questionAppendHistory(questionName, message) {  // > CustomCode.questionLib:124
    if (!(questionName in _questionLib.questionMarksAwarded)) {  // > CustomCode.questionLib:125
      _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.questionLib:126
    }  // > CustomCode.questionLib:127
    let shouldPushQuestion = getPendingQuestion() !== questionName;  // > CustomCode.questionLib:128
    if (shouldPushQuestion) {  // > CustomCode.questionLib:129
      startQuestion(questionName);  // > CustomCode.questionLib:130
    }  // > CustomCode.questionLib:131
    awardQuestionMarks(_questionLib.questionMarksAwarded[questionName])  // > CustomCode.questionLib:132
    addQuestionHistory(message);  // > CustomCode.questionLib:133
    if (shouldPushQuestion) {  // > CustomCode.questionLib:134
      endQuestion();  // > CustomCode.questionLib:135
    }  // > CustomCode.questionLib:136
  }  // > CustomCode.questionLib:137
  function resetQuestionHistory(questionName) {  // > CustomCode.questionLib:138
    _questionLib.history[questionName] = [];  // > CustomCode.questionLib:139
  }  // > CustomCode.questionLib:140
  function resetQuestion(questionName) {  // > CustomCode.questionLib:141
    resetQuestionHistory(questionName);  // > CustomCode.questionLib:142
    resetQuestionMarks(questionName);  // > CustomCode.questionLib:143
  }  // > CustomCode.questionLib:144

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    _view.plottingPanelmom.getAxisX().setPosition([0,0.5]);  // > Initialization.Init Page:1
    _view.plottingPanelmom.getTitleX().setPosition([0.95,0.45]);  // > Initialization.Init Page:2
    _view.plottingPanelmom.getAxisY().setPosition([0.045,0]);  // > Initialization.Init Page:3
    _view.plottingPanelmom.getTitleY().setPosition([0.125,0.85]);  // > Initialization.Init Page:4
    _view.plottingPanelKE.getAxisX().setPosition([0,0.5]);  // > Initialization.Init Page:5
    _view.plottingPanelKE.getTitleX().setPosition([0.95,0.45]);  // > Initialization.Init Page:6
    _view.plottingPanelKE.getAxisY().setPosition([0.045,0]);  // > Initialization.Init Page:7
    _view.plottingPanelKE.getTitleY().setPosition([0.125,0.85]);  // > Initialization.Init Page:8
    _view.plottingPanelF.getAxisX().setPosition([0,0.5]);  // > Initialization.Init Page:9
    _view.plottingPanelF.getTitleX().setPosition([0.95,0.45]);  // > Initialization.Init Page:10
    _view.plottingPanelF.getAxisY().setPosition([0.045,0]);  // > Initialization.Init Page:11
    _view.plottingPanelF.getTitleY().setPosition([0.125,0.85]);  // > Initialization.Init Page:12
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (Width1 == undefined || Width2 == undefined || Width3 == undefined || Width4 == undefined) {  // > Initialization.undefined:1
      Width1 = "50%";  // > Initialization.undefined:2
      Width2 = "0%";  // > Initialization.undefined:3
      Width3 = "0%";  // > Initialization.undefined:4
      Width4 = "50%";  // > Initialization.undefined:5
    }  // > Initialization.undefined:6
    if (showtotal == undefined) {  // > Initialization.undefined:7
      showtotal = true;  // > Initialization.undefined:8
    }  // > Initialization.undefined:9
    if (showtotaltext == undefined) {  // > Initialization.undefined:10
      showtotaltext = false;  // > Initialization.undefined:11
    }  // > Initialization.undefined:12
    if (ideal == undefined) {  // > Initialization.undefined:13
      ideal = true;  // > Initialization.undefined:14
      trmsg = "ideal case of world view of 2 collision carts";  // > Initialization.undefined:15
    }  // > Initialization.undefined:16
    if (ideal == false) {  // > Initialization.undefined:17
      trmsg = "realistic case of world view of 2 collision carts";  // > Initialization.undefined:18
    }  // > Initialization.undefined:19
    if (mass1 == undefined && mass2 == undefined) {  // > Initialization.undefined:20
      mass1 = 4; // 4 is the mid point of the slider  // > Initialization.undefined:21
      mass2 = 4;  // > Initialization.undefined:22
    }  // > Initialization.undefined:23
    if (vx1 == undefined && vx2 == undefined && vx1s == undefined && vx2s == undefined) {  // > Initialization.undefined:24
      vx1 = 2; // 4 is the mid point of the slider  // > Initialization.undefined:25
      vx2 = 0;  // > Initialization.undefined:26
      vx1s = 2; // 4 is the mid point of the slider  // > Initialization.undefined:27
      vx2s = 0;  // > Initialization.undefined:28
      es = 1;  // > Initialization.undefined:29
    }  // > Initialization.undefined:30
    if (mvvst == undefined && kevst == undefined && fvst == undefined) {  // > Initialization.undefined:31
      mvvst = true;  // > Initialization.undefined:32
      show1 = true;  // > Initialization.undefined:33
      show2 = true;  // > Initialization.undefined:34
    }  // > Initialization.undefined:35
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 2"]) return;
    vx1 = vx1s;  // > Initialization.Init Page 2:1
    vx2 = vx2s;  // > Initialization.Init Page 2:2
    mom1s = mom1 = mass1 * vx1s;  // > Initialization.Init Page 2:3
    mom2s = mom2 = mass2 * vx2s;  // > Initialization.Init Page 2:4
    mommax = Math.max(mom1, mom2);  // > Initialization.Init Page 2:5
    MaximumY = Math.max(mommax, KEmax) * 2;  // > Initialization.Init Page 2:6
    KE1s = KE1 = 0.5 * mass1 * (vx1s * vx1s);  // > Initialization.Init Page 2:7
    KE2s = KE2 = 0.5 * mass2 * (vx2s * vx2s);  // > Initialization.Init Page 2:8
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["svg"]) return;
    if (svgDone === undefined) {  // > Initialization.svg:1
      var container = document.createElement('div');  // > Initialization.svg:2
      var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>' +  // > Initialization.svg:3
        '  <radialGradient id="mygrandient" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">' +  // > Initialization.svg:4
        '    <stop offset="0%" style="stop-color:rgb(0,0,0); stop-opacity:1" />' +  // > Initialization.svg:5
        '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />' +  // > Initialization.svg:6
        '  </radialGradient>' +  // > Initialization.svg:7
        '  <radialGradient id="mygrandient1" cx="50%" cy="50%" r="70%" fx="80%" fy="80%">' +  // > Initialization.svg:8
        '    <stop offset="0%" style="stop-color:rgb(0,255,0); stop-opacity:0.1" />' +  // > Initialization.svg:9
        '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +  // > Initialization.svg:10
        '  </radialGradient>' +  // > Initialization.svg:11
        '  <radialGradient id="mygrandient3" cx="50%" cy="50%" r="70%" fx="80%" fy="80%">' +  // > Initialization.svg:12
        '    <stop offset="0%" style="stop-color:rgb(0,0,255); stop-opacity:0.1" />' +  // > Initialization.svg:13
        '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +  // > Initialization.svg:14
        '  </radialGradient>' +  // > Initialization.svg:15
        '  <radialGradient id="mygrandient2" cx="50%" cy="50%" r="70%" fx="90%" fy="50%">' +  // > Initialization.svg:16
        '    <stop offset="0%" style="stop-color:rgb(0,255,0); stop-opacity:0.5" />' +  // > Initialization.svg:17
        '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />' +  // > Initialization.svg:18
        '  </radialGradient>' +  // > Initialization.svg:19
        '  <radialGradient id="mygrandient4" cx="50%" cy="50%" r="90%" fx="90%" fy="10%">' +  // > Initialization.svg:20
        '    <stop offset="0%" style="stop-color:rgb(0,255,255); stop-opacity:0.5" />' +  // > Initialization.svg:21
        '    <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:0.5" />' +  // > Initialization.svg:22
        '  </radialGradient>' +  // > Initialization.svg:23
        '</defs></svg>';  // > Initialization.svg:24
      container.innerHTML = svggradient;  // > Initialization.svg:25
      document.body.appendChild(container);  // > Initialization.svg:26
      svgDone = true;  // > Initialization.svg:27
    }  // > Initialization.svg:28
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
    _view.plottingPanelmom.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:12
    _view.plottingPanelmom.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:13
    _view.plottingPanelmom.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:14
    _view.plottingPanelmom.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:15
    _view.plottingPanelKE.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:16
    _view.plottingPanelKE.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:17
    _view.plottingPanelKE.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:18
    _view.plottingPanelKE.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:19
    _view.plottingPanelF.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:20
    _view.plottingPanelF.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:21
    _view.plottingPanelF.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:22
    _view.plottingPanelF.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.Init Page 3:23
    //_view.plottingPanel.getMessageDecoration("TL").getStyle().setFillColor("red");  // > Initialization.Init Page 3:24
        }  // > Initialization.Init Page 3:25
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["wait"]) return;
    // new way to make Moodle slow down to reset afrer 500 ms then run the code _reset  // > Initialization.wait:1
    // 500 is decided after testing on moodle, as an acceptable delay  // > Initialization.wait:2
    if (!clicked){  // > Initialization.wait:3
      window.setTimeout(_reset,1000)  // > Initialization.wait:4
      clicked=true;  // > Initialization.wait:5
     startQuestion(`Q1`) //moodle added here to allow Q1 to start automatically in case not triggered by function submitAnalytics2()  // > Initialization.wait:6
    }  // > Initialization.wait:7
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
    if ((x1 - radius1 < -xmax) || (x2 + radius2 > xmax)) {  // > FixedRelations.FixRel Page:1
      _pause();  // > FixedRelations.FixRel Page:2
      textt = "paused";  // > FixedRelations.FixRel Page:3
    }  // > FixedRelations.FixRel Page:4
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["test"]) return;
    x1radius1 = x1 + radius1  // > FixedRelations.test:1
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["Force"]) return;
    // add the address need for Ft graph  // > FixedRelations.Force:1
    // add the address need for Ft graph  // > FixedRelations.Force:2
    //F1= impactForce(x1,x2,vx1,vx2);  // > FixedRelations.Force:3
    //F2 = - impactForce(x1,x2,vx1,vx2);  // > FixedRelations.Force:4
    //totalF = F1+F2;  // > FixedRelations.Force:5
    if (ideal == false) {  // > FixedRelations.Force:6
      F1 = impactForce(x1, x2, vx1, vx2);  // > FixedRelations.Force:7
      F2 = - impactForce(x1, x2, vx1, vx2);  // > FixedRelations.Force:8
      totalF = F1 + F2;  // > FixedRelations.Force:9
    }  // > FixedRelations.Force:10
    else if (ideal == true && t > tcollision || t < tcollision) {  // > FixedRelations.Force:11
      F1 = 0;  // > FixedRelations.Force:12
      F2 = - 0;  // > FixedRelations.Force:13
      totalF = F1 + F2;  // > FixedRelations.Force:14
    }  // > FixedRelations.Force:15
    Fmax = Math.max(Math.max(F1, F2), Fmax);  // > FixedRelations.Force:16
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["wheels"]) return;
    wheelAngle = -x1 / radius1 * 2;  // > FixedRelations.wheels:1
    wheelAngle2 = -x2 / radius2 * 2;  // > FixedRelations.wheels:2
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["momentum"]) return;
    mom1 = mass1 * vx1;  // > FixedRelations.momentum:1
    mom2 = mass2 * vx2;  // > FixedRelations.momentum:2
    totalmomentum = mom1 + mom2;  // > FixedRelations.momentum:3
    mommax = Math.max(Math.max(mom1, mom2), mommax);  // > FixedRelations.momentum:4
    mommax = Math.max(totalmomentum, mommax);  // > FixedRelations.momentum:5
    KE1 = 0.5 * mass1 * (vx1 * vx1);  // should be 0.5*mass1*(vx1*vx1+vy1*vy1);  // > FixedRelations.momentum:6
    KE2 = 0.5 * mass2 * (vx2 * vx2); // should be 0.5*mass2*(vx2*vx2+vy2*vy2);  // > FixedRelations.momentum:7
    totalKE = KE1 + KE2;  // > FixedRelations.momentum:8
    KEmax = Math.max(Math.max(KE1, KE2), KEmax);  // > FixedRelations.momentum:9
    KEmax = Math.max(totalKE, KEmax);  // > FixedRelations.momentum:10
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["axes"]) return;
    if (_model.isPlaying()) { //NEED this for conflict with initialize page values  // > FixedRelations.axes:1
      _view.plottingPanelmom.getAxisX().setAbsoluteY(_view.plottingPanelmom.getGrid().getFixedTickY());  // > FixedRelations.axes:2
      _view.plottingPanelmom.getAxisY().setAbsoluteX(_view.plottingPanelmom.getGrid().getFixedTickX());  // > FixedRelations.axes:3
      _view.plottingPanelKE.getAxisX().setAbsoluteY(_view.plottingPanelKE.getGrid().getFixedTickY());  // > FixedRelations.axes:4
      _view.plottingPanelKE.getAxisY().setAbsoluteX(_view.plottingPanelKE.getGrid().getFixedTickX());  // > FixedRelations.axes:5
      _view.plottingPanelF.getAxisX().setAbsoluteY(_view.plottingPanelF.getGrid().getFixedTickY());  // > FixedRelations.axes:6
      _view.plottingPanelF.getAxisY().setAbsoluteX(_view.plottingPanelF.getGrid().getFixedTickX());  // > FixedRelations.axes:7
    }  // > FixedRelations.axes:8
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["equations"]) return;
    if (t >= tcollision) {  // > FixedRelations.equations:1
      brmsg = `m₁u₁+m₂u₂ = ${_view._format(mom1 + mom2, "0.0")}, m₁v₁+m₂v₂ = ${_view._format(totalmomentum, "0.0")},\n0.5m₁u₁² + 0.5m₂u₂² = ${_view._format(KE1s + KE2s, "0.00")}, 0.5m₁v₁² + 0.5m₂v₂² = ${_view._format(KE1 + KE2, "0.00")},\n t = ${_view._format(t, "0.00")} s`;  // > FixedRelations.equations:2
    }  // > FixedRelations.equations:3
    else if (t < tcollision) {  // > FixedRelations.equations:4
      brmsg = `m₁u₁+m₂u₂ = ${_view._format(mom1 + mom2, "0.0")}, m₁v₁+m₂v₂ = ??,\n0.5m₁u₁² + 0.5m₂u₂²= ${_view._format(KE1s + KE2s, "0.00")}, 0.5m₁v₁² + 0.5m₂v₂²= ??,\nt = ${_view._format(t, "0.00")} s`;  // > FixedRelations.equations:5
    }  // > FixedRelations.equations:6
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
    var __solverClass = EJSS_ODE_SOLVERS.cashKarp45;
    var __state=[];
    var _ODE_evolution1_Event1;
    var _ODE_evolution1_Event2;
    var _ODE_evolution1_Event3;
    var _ODE_evolution1_Event4;
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["x1","x2","vx1","vx2","t"]};

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
      if (__pagesEnabled["leftwall"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
      if (__pagesEnabled["rightwall"]) __eventSolver.addEvent(_ODE_evolution1_Event3());
      if (__pagesEnabled["collision"]) __eventSolver.addEvent(_ODE_evolution1_Event4());
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
        if (__state[__cIn]!=x1) __mustReinitialize = true;
        __state[__cIn++] = x1;
        if (__state[__cIn]!=x2) __mustReinitialize = true;
        __state[__cIn++] = x2;
        if (__state[__cIn]!=vx1) __mustReinitialize = true;
        __state[__cIn++] = vx1;
        if (__state[__cIn]!=vx2) __mustReinitialize = true;
        __state[__cIn++] = vx2;
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
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        vx1 = __state[__cOut++];
        vx2 = __state[__cOut++];
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
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx1 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = vx1; // Rate for ODE: Evol Page:x1
        _aRate[__cRate++] = vx2; // Rate for ODE: Evol Page:x2
        _aRate[__cRate++] = impactForce(x1,x2,vx1,vx2)/mass1; // Rate for ODE: Evol Page:vx1
        _aRate[__cRate++] = impactForce(x2,x1,vx2,vx1)/mass2; // Rate for ODE: Evol Page:vx2
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
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx1 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        vx1 = __state[__cOut++];
        vx2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx1;
        __state[__cIn++] = vx2;
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
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx1 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        //var option = _view.comboBox.getProperty("SelectedOptions");  // > Event zero-condition for page Evol Page:1
        //if (option=!"explosion"){  // > Event zero-condition for page Evol Page:2
          return Math.abs(x1-x2)-(radius1+radius2);  // > Event zero-condition for page Evol Page:3
        //}  // > Event zero-condition for page Evol Page:4
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        vx1 = __state[__cOut++];
        vx2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx1;
        __state[__cIn++] = vx2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        var vtemp1 = vx1; // to allow formula to work on lower lines  // > Event action for page Evol Page:1
        var vtemp2 = vx2;  // > Event action for page Evol Page:2
        _view.audio.play();  // > Event action for page Evol Page:3
        if (ideal==true) {  // > Event action for page Evol Page:4
           // > Event action for page Evol Page:5
        //vtemp2s = vtemp2; // code to fix problem with v_temp2s always 1.2x10^-4  // > Event action for page Evol Page:6
        //vx1 = (2*mass2*vx2   +(mass1-mass2)*vx1)/(mass1+mass2);  // > Event action for page Evol Page:7
        //vx2 = (2*mass2*v_temp+(mass2-mass1)*vx2)/(mass1+mass2);  // > Event action for page Evol Page:8
        // adding e coefficient of restitution  // > Event action for page Evol Page:9
        // formula from http://en.wikipedia.org/wiki/Inelastic_collision  // > Event action for page Evol Page:10
        vx1 = vxf1 = ((es+1)*mass2*vtemp2 + vtemp1*(mass1-es*mass2))/(mass1+mass2);  // > Event action for page Evol Page:11
        vx2 = vxf2 = ((es+1)*mass1*vtemp1 + vtemp2*(mass2-es*mass1))/(mass1+mass2);  // > Event action for page Evol Page:12
        //contact force triangle by ajc  // > Event action for page Evol Page:13
        //dt = dt*10; //increase time step  // > Event action for page Evol Page:14
        F1= mass1*(vx1-vx1s)/(dt); // divded by a reasonable time step to show triangle  // > Event action for page Evol Page:15
        F2= mass2*(vx2-vx2s)/(dt);  // > Event action for page Evol Page:16
        // add code to define t = collision  // > Event action for page Evol Page:17
        tcollision = t; // for checking formula for tcollision determination  // > Event action for page Evol Page:18
        // add code to make mass remember stored values  // > Event action for page Evol Page:19
        //mass1s= mass1;  // > Event action for page Evol Page:20
        //mass2s= mass2;  // > Event action for page Evol Page:21
          }  // > Event action for page Evol Page:22
          else if (ideal==false){  // > Event action for page Evol Page:23
            // > Event action for page Evol Page:24
          }  // > Event action for page Evol Page:25
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
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx1 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return (x1-radius1)-xmin;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        vx1 = __state[__cOut++];
        vx2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx1;
        __state[__cIn++] = vx2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        textt = "paused";  // > Event action for page Evol Page:2
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
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx1 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        return x2+radius2-xmax;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        vx1 = __state[__cOut++];
        vx2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx1;
        __state[__cIn++] = vx2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        textt = "paused";  // > Event action for page Evol Page:2
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
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var vx1 = _aState[__cOut++];
        var vx2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        var option = _view.comboBox.getProperty("SelectedOptions");  // > Event zero-condition for page Evol Page:1
        if (option=="explosion"){  // > Event zero-condition for page Evol Page:2
        return texplosion-t;  // > Event zero-condition for page Evol Page:3
        //alert(option);  // > Event zero-condition for page Evol Page:4
        }  // > Event zero-condition for page Evol Page:5
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        vx1 = __state[__cOut++];
        vx2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = vx1;
        __state[__cIn++] = vx2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //assume 3 is the velocity after explosion for mass =1  // > Event action for page Evol Page:1
        vx1 =vx1s= -12/mass1;  // > Event action for page Evol Page:2
        vx2 =vx2s= 12/mass2;  // > Event action for page Evol Page:3
        _view.explosionaudio.play();  // > Event action for page Evol Page:4
        //contact force triangle by ajc  // > Event action for page Evol Page:5
        //dt = dt*10; //increase time step  // > Event action for page Evol Page:6
        //F1= mass1*(vx1-vx1s)/(dt); // divded by a reasonable time step to show triangle  // > Event action for page Evol Page:7
        //F2= mass2*(vx2-vx2s)/(dt);  // > Event action for page Evol Page:8
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_x1(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_x2(__time) {
    var __index = 0 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vx1(__time) {
    var __index = 0 + 1 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vx2(__time) {
    var __index = 0 + 1 + 1 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

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
    _view = new Momentum1Dtype1_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'fullscreen'
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.comboBox.linkProperty("Options",  function() { return ["elastic","inelastic", "perfectly inelastic"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  //["","elastic","inelastic", "perfectly inelastic","explosion" ,"user defined","","ideal","realistic","","world-mv","world-KE","world-F","world","graph mv vs t","graph KE vs t","graph F vs t","","cart 1","cart 1 off","cart 2","cart 2 off","total","total off"]
  var option = _view.comboBox.getProperty("SelectedOptions");
  //alert(option);
  if (option == "perfectly inelastic") {
    es = 0;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "inelastic") {
    es = Math.round((Math.random() * 0.8 + 0.1) * 10) / 10;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "elastic") {
    es = 1;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "explosion") {
    es = 1;
    x1 = -radius1;
    x2 = radius2;
    vx1s = vx1 = 0;
    vx2s = vx2 = 0;
  }
  //"ideal","realistic"
  else if (option == "ideal") {
    ideal = true;
    trmsg = "e=" + es + ", ideal case of world view of 2 collision carts";
  }
  else if (option == "realistic") {
    ideal = false;
    trmsg = "e=" + es + ", realistic case of world view of 2 collision carts";
  }
  else if (option == "world") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  //"world","world off","mv vs t on","mv vs t off","ke vs t on","ke vs t off","F vs t on","F vs t off"
  else if (option == "world-mv") {
    world = true;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "50%";
    Width2 = "50%";
    Width3 = "0%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-KE") {
    world = true;
    graph2 = false;
    graph3 = true;
    graph4 = false;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "50%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-F") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "50%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "graph mv vs t") {
    world = false;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "100%"; //Width1 cannot be zero, slows down computing
    Width2 = "100%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph KE vs t") {
    world = false;
    graph = false;
    graph3 = true;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "100%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph F vs t") {
    world = false;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "100%";
    //disabled=false;
  }
  else if (option == "mv vs t on") {
    graph = true;
    mvvst = true;
    //disabledworld=false;
    MaximumY = mommax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 5);
    //showtotal = true;
  }
  else if (option == "mv vs t off") {
    graph = true;
    mvvst = false;
    //disabledworld=false;
  }
  else if (option == "ke vs t on") {
    graph = true;
    kevst = true;
    MaximumY = KEmax;
    _view.plottingPanel.setProperty("YTickStep", 5);
  }
  else if (option == "ke vs t off") {
    graph = true;
    kevst = false;
    //disabledworld=false;
  }
  else if (option == "F vs t on") {
    graph = true;
    fvst = true;
    autoscaley = true;
    if (Fmax > 50) MaximumY = 50
    else
      MaximumY = Fmax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 50);
    //disabledworld=false;
    show1 = true;
    show2 = true;
  }
  else if (option == "F vs t off") {
    graph = true;
    fvst = false;
    autoscaley = false;
    //disabledworld=false;
  }
  //"cart 1","cart 2","total"
  else if (option == "cart 1") {
    show1 = true;
  }
  else if (option == "cart 2") {
    show2 = true;
  }
  else if (option == "total") {
    showtotal = true;
    showtotaltext = true;
  }
  else if (option == "cart 1 off") {
    show1 = false;
  }
  else if (option == "cart 2 off") {
    show2 = false;
  }
  else if (option == "total off") {
    showtotal = false;
    showtotaltext = false;
  }
  textt = "select collision type, \n change m₁,u₁,m₂,u₂ \n and click play";

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.cart1.linkProperty("Checked",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Checked' for element 'cart1'
          _view.cart1.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'cart1'
          _view.comboBox2.linkProperty("Options",  function() { return ["cart 1","cart 1 off"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox2'
          _view.comboBox2.setAction("OnChange", function(_data,_info) {
  //["","elastic","inelastic", "perfectly inelastic","explosion" ,"user defined","","ideal","realistic","","world-mv","world-KE","world-F","world","graph mv vs t","graph KE vs t","graph F vs t","","cart 1","cart 1 off","cart 2","cart 2 off","total","total off"]
  var option = _view.comboBox2.getProperty("SelectedOptions");
  //alert(option);
  if (option == "perfectly inelastic") {
    es = 0;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "inelastic") {
    es = Math.round((Math.random() * 0.8 + 0.1) * 10) / 10;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "elastic") {
    es = 1;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "explosion") {
    es = 1;
    x1 = -radius1;
    x2 = radius2;
    vx1s = vx1 = 0;
    vx2s = vx2 = 0;
  }
  //"ideal","realistic"
  else if (option == "ideal") {
    ideal = true;
    trmsg = "e=" + es + ", ideal case of world view of 2 collision carts";
  }
  else if (option == "realistic") {
    ideal = false;
    trmsg = "e=" + es + ", realistic case of world view of 2 collision carts";
  }
  else if (option == "world") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  //"world","world off","mv vs t on","mv vs t off","ke vs t on","ke vs t off","F vs t on","F vs t off"
  else if (option == "world-mv") {
    world = true;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "50%";
    Width2 = "50%";
    Width3 = "0%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-KE") {
    world = true;
    graph2 = false;
    graph3 = true;
    graph4 = false;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "50%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-F") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "50%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "graph mv vs t") {
    world = false;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "100%"; //Width1 cannot be zero, slows down computing
    Width2 = "100%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph KE vs t") {
    world = false;
    graph = false;
    graph3 = true;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "100%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph F vs t") {
    world = false;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "100%";
    //disabled=false;
  }
  else if (option == "mv vs t on") {
    graph = true;
    mvvst = true;
    //disabledworld=false;
    MaximumY = mommax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 5);
    //showtotal = true;
  }
  else if (option == "mv vs t off") {
    graph = true;
    mvvst = false;
    //disabledworld=false;
  }
  else if (option == "ke vs t on") {
    graph = true;
    kevst = true;
    MaximumY = KEmax;
    _view.plottingPanel.setProperty("YTickStep", 5);
  }
  else if (option == "ke vs t off") {
    graph = true;
    kevst = false;
    //disabledworld=false;
  }
  else if (option == "F vs t on") {
    graph = true;
    fvst = true;
    autoscaley = true;
    if (Fmax > 50) MaximumY = 50
    else
      MaximumY = Fmax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 50);
    //disabledworld=false;
    show1 = true;
    show2 = true;
  }
  else if (option == "F vs t off") {
    graph = true;
    fvst = false;
    autoscaley = false;
    //disabledworld=false;
  }
  //"cart 1","cart 2","total"
  else if (option == "cart 1") {
    show1 = true;
  }
  else if (option == "cart 2") {
    show2 = true;
  }
  else if (option == "total") {
    showtotal = true;
    showtotaltext = true;
  }
  else if (option == "cart 1 off") {
    show1 = false;
  }
  else if (option == "cart 2 off") {
    show2 = false;
  }
  else if (option == "total off") {
    showtotal = false;
    showtotaltext = false;
  }
  textt = "select collision type, \n change m₁,u₁,m₂,u₂ \n and click play";

}); // HtmlView Page setting action 'OnChange' for element 'comboBox2'
          _view.comboBox2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox2'
          _view.cart12.linkProperty("Checked",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Checked' for element 'cart12'
          _view.cart12.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'cart12'
          _view.comboBox3.linkProperty("Options",  function() { return ["cart 2","cart 2 off"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox3'
          _view.comboBox3.setAction("OnChange", function(_data,_info) {
  //["","elastic","inelastic", "perfectly inelastic","explosion" ,"user defined","","ideal","realistic","","world-mv","world-KE","world-F","world","graph mv vs t","graph KE vs t","graph F vs t","","cart 1","cart 1 off","cart 2","cart 2 off","total","total off"]
  var option = _view.comboBox3.getProperty("SelectedOptions");
  //alert(option);
  if (option == "perfectly inelastic") {
    es = 0;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "inelastic") {
    es = Math.round((Math.random() * 0.8 + 0.1) * 10) / 10;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "elastic") {
    es = 1;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "explosion") {
    es = 1;
    x1 = -radius1;
    x2 = radius2;
    vx1s = vx1 = 0;
    vx2s = vx2 = 0;
  }
  //"ideal","realistic"
  else if (option == "ideal") {
    ideal = true;
    trmsg = "e=" + es + ", ideal case of world view of 2 collision carts";
  }
  else if (option == "realistic") {
    ideal = false;
    trmsg = "e=" + es + ", realistic case of world view of 2 collision carts";
  }
  else if (option == "world") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  //"world","world off","mv vs t on","mv vs t off","ke vs t on","ke vs t off","F vs t on","F vs t off"
  else if (option == "world-mv") {
    world = true;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "50%";
    Width2 = "50%";
    Width3 = "0%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-KE") {
    world = true;
    graph2 = false;
    graph3 = true;
    graph4 = false;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "50%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-F") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "50%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "graph mv vs t") {
    world = false;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "100%"; //Width1 cannot be zero, slows down computing
    Width2 = "100%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph KE vs t") {
    world = false;
    graph = false;
    graph3 = true;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "100%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph F vs t") {
    world = false;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "100%";
    //disabled=false;
  }
  else if (option == "mv vs t on") {
    graph = true;
    mvvst = true;
    //disabledworld=false;
    MaximumY = mommax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 5);
    //showtotal = true;
  }
  else if (option == "mv vs t off") {
    graph = true;
    mvvst = false;
    //disabledworld=false;
  }
  else if (option == "ke vs t on") {
    graph = true;
    kevst = true;
    MaximumY = KEmax;
    _view.plottingPanel.setProperty("YTickStep", 5);
  }
  else if (option == "ke vs t off") {
    graph = true;
    kevst = false;
    //disabledworld=false;
  }
  else if (option == "F vs t on") {
    graph = true;
    fvst = true;
    autoscaley = true;
    if (Fmax > 50) MaximumY = 50
    else
      MaximumY = Fmax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 50);
    //disabledworld=false;
    show1 = true;
    show2 = true;
  }
  else if (option == "F vs t off") {
    graph = true;
    fvst = false;
    autoscaley = false;
    //disabledworld=false;
  }
  //"cart 1","cart 2","total"
  else if (option == "cart 1") {
    show1 = true;
  }
  else if (option == "cart 2") {
    show2 = true;
  }
  else if (option == "total") {
    showtotal = true;
    showtotaltext = true;
  }
  else if (option == "cart 1 off") {
    show1 = false;
  }
  else if (option == "cart 2 off") {
    show2 = false;
  }
  else if (option == "total off") {
    showtotal = false;
    showtotaltext = false;
  }
  textt = "select collision type, \n change m₁,u₁,m₂,u₂ \n and click play";

}); // HtmlView Page setting action 'OnChange' for element 'comboBox3'
          _view.comboBox3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox3'
          _view.total6.linkProperty("Checked",  function() { return showtotal; }, function(_v) { showtotal = _v; } ); // HtmlView Page linking property 'Checked' for element 'total6'
          _view.total6.setAction("OnCheckOff", function(_data,_info) {
  showtotal = false;
    showtotaltext = false;

}); // HtmlView Page setting action 'OnCheckOff' for element 'total6'
          _view.total6.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'total6'
          _view.total6.setAction("OnCheckOn", function(_data,_info) {
  showtotal = true;
    showtotaltext = true;

}); // HtmlView Page setting action 'OnCheckOn' for element 'total6'
          _view.comboBox4.linkProperty("Options",  function() { return ["total","total off"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox4'
          _view.comboBox4.setAction("OnChange", function(_data,_info) {
  //["","elastic","inelastic", "perfectly inelastic","explosion" ,"user defined","","ideal","realistic","","world-mv","world-KE","world-F","world","graph mv vs t","graph KE vs t","graph F vs t","","cart 1","cart 1 off","cart 2","cart 2 off","total","total off"]
  var option = _view.comboBox4.getProperty("SelectedOptions");
  //alert(option);
  if (option == "perfectly inelastic") {
    es = 0;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "inelastic") {
    es = Math.round((Math.random() * 0.8 + 0.1) * 10) / 10;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "elastic") {
    es = 1;
    trmsg = "e=" + es;
    elasticityMode = option;
  }
  else if (option == "explosion") {
    es = 1;
    x1 = -radius1;
    x2 = radius2;
    vx1s = vx1 = 0;
    vx2s = vx2 = 0;
  }
  //"ideal","realistic"
  else if (option == "ideal") {
    ideal = true;
    trmsg = "e=" + es + ", ideal case of world view of 2 collision carts";
  }
  else if (option == "realistic") {
    ideal = false;
    trmsg = "e=" + es + ", realistic case of world view of 2 collision carts";
  }
  else if (option == "world") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  //"world","world off","mv vs t on","mv vs t off","ke vs t on","ke vs t off","F vs t on","F vs t off"
  else if (option == "world-mv") {
    world = true;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "50%";
    Width2 = "50%";
    Width3 = "0%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-KE") {
    world = true;
    graph2 = false;
    graph3 = true;
    graph4 = false;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "50%";
    Width4 = "0%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "world-F") {
    world = true;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "50%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "50%";
    //mvvst=true; // increase ease of use by opening one graph
    //disabled=false;
  }
  else if (option == "graph mv vs t") {
    world = false;
    graph = true;
    graph3 = false;
    graph4 = false;
    Width1 = "100%"; //Width1 cannot be zero, slows down computing
    Width2 = "100%";
    Width3 = "0%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph KE vs t") {
    world = false;
    graph = false;
    graph3 = true;
    graph4 = false;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "100%";
    Width4 = "0%";
    //disabled=false;
  }
  else if (option == "graph F vs t") {
    world = false;
    graph = false;
    graph3 = false;
    graph4 = true;
    Width1 = "100%";
    Width2 = "0%";
    Width3 = "0%";
    Width4 = "100%";
    //disabled=false;
  }
  else if (option == "mv vs t on") {
    graph = true;
    mvvst = true;
    //disabledworld=false;
    MaximumY = mommax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 5);
    //showtotal = true;
  }
  else if (option == "mv vs t off") {
    graph = true;
    mvvst = false;
    //disabledworld=false;
  }
  else if (option == "ke vs t on") {
    graph = true;
    kevst = true;
    MaximumY = KEmax;
    _view.plottingPanel.setProperty("YTickStep", 5);
  }
  else if (option == "ke vs t off") {
    graph = true;
    kevst = false;
    //disabledworld=false;
  }
  else if (option == "F vs t on") {
    graph = true;
    fvst = true;
    autoscaley = true;
    if (Fmax > 50) MaximumY = 50
    else
      MaximumY = Fmax; // set maximum plottPanelY
    _view.plottingPanel.setProperty("YTickStep", 50);
    //disabledworld=false;
    show1 = true;
    show2 = true;
  }
  else if (option == "F vs t off") {
    graph = true;
    fvst = false;
    autoscaley = false;
    //disabledworld=false;
  }
  //"cart 1","cart 2","total"
  else if (option == "cart 1") {
    show1 = true;
  }
  else if (option == "cart 2") {
    show2 = true;
  }
  else if (option == "total") {
    showtotal = true;
    showtotaltext = true;
  }
  else if (option == "cart 1 off") {
    show1 = false;
  }
  else if (option == "cart 2 off") {
    show2 = false;
  }
  else if (option == "total off") {
    showtotal = false;
    showtotaltext = false;
  }
  textt = "select collision type, \n change m₁,u₁,m₂,u₂ \n and click play";

}); // HtmlView Page setting action 'OnChange' for element 'comboBox4'
          _view.comboBox4.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox4'
          _view.label5.linkProperty("Width",  function() { return _view.comboBox.getProperty("SelectedOptions")=="user defined"?50:0; } ); // HtmlView Page linking property 'Width' for element 'label5'
          _view.label5.linkProperty("Visibility",  function() { return _view.comboBox.getProperty("SelectedOptions")=="user defined"; } ); // HtmlView Page linking property 'Visibility' for element 'label5'
          _view.label5.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'label5'
          _view.field4.linkProperty("Value",  function() { return es; }, function(_v) { es = _v; } ); // HtmlView Page linking property 'Value' for element 'field4'
          _view.field4.setAction("OnChange", function(_data,_info) {
  if (es==0.000){
  _view.comboBox.setSelectedOptions(["perfectly_inelastic"]);
   }
   else if (es>0.000&&es<1.000){
  _view.comboBox.setSelectedOptions(["inelastic"]);
   }
   else if (es==1.000){
  _view.comboBox.setSelectedOptions(["perfectly_elastic"]);
   }
   else {
  _view.comboBox.setSelectedOptions(["user_defined"]);
   }

}); // HtmlView Page setting action 'OnChange' for element 'field4'
          _view.field4.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'field4'
          _view.field4.linkProperty("Display",  function() { return _view.comboBox.getProperty("SelectedOptions")=="user defined"?"inline":"none"; } ); // HtmlView Page linking property 'Display' for element 'field4'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  textt="paused";
  _pause();

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  textt="playing";
  //submitAnalytics();
  submitAnalytics2();

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'playPauseButton2'
          _view.stepButton2.setAction("OnClick", function(_data,_info) {
  _step();

}); // HtmlView Page setting action 'OnClick' for element 'stepButton2'
          _view.stepButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'stepButton2'
          _view.resetButton2.setAction("OnClick", function(_data,_info) {
  _reset()
  // to set
  if (es==0){
  _view.comboBox.setSelectedOptions(["perfectly inelastic"]);
  }
  else if (es ==1){
    _view.comboBox.setSelectedOptions(["elastic"]);
    }
    
    else if (es>0&&es<1){
      _view.comboBox.setSelectedOptions(["inelastic"]);
      }

}); // HtmlView Page setting action 'OnClick' for element 'resetButton2'
          _view.resetButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton2'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  if (_model.isPaused){
    _play();
    }
    else if (_model.isPlaying){
    _pause();
    }

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return trmsg; }, function(_v) { trmsg = _v; } ); // HtmlView Page linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return textt; }, function(_v) { textt = _v; } ); // HtmlView Page linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return brmsg; }, function(_v) { brmsg = _v; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Display",  function() { return world?"inline":"none"; } ); // HtmlView Page linking property 'Display' for element 'plottingPanel'
          _view.world.linkProperty("SizeX",  function() { return xmax-xmin; } ); // HtmlView Page linking property 'SizeX' for element 'world'
          _view.world.linkProperty("SizeY",  function() { return ymax-ymin; } ); // HtmlView Page linking property 'SizeY' for element 'world'
          _view.table2.linkProperty("SizeX",  function() { return xmax-xmin; } ); // HtmlView Page linking property 'SizeX' for element 'table2'
          _view.table2.linkProperty("Y",  function() { return y - 1.5*height; } ); // HtmlView Page linking property 'Y' for element 'table2'
          _view.table2.linkProperty("SizeY",  function() { return .70*height; } ); // HtmlView Page linking property 'SizeY' for element 'table2'
          _view.table.linkProperty("SizeX",  function() { return xmax-xmin; } ); // HtmlView Page linking property 'SizeX' for element 'table'
          _view.table.linkProperty("Y",  function() { return y - 1.5*height; } ); // HtmlView Page linking property 'Y' for element 'table'
          _view.table.linkProperty("SizeY",  function() { return .70*height; } ); // HtmlView Page linking property 'SizeY' for element 'table'
          _view.image.linkProperty("SizeX",  function() { return 2*radius1; } ); // HtmlView Page linking property 'SizeX' for element 'image'
          _view.image.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'image'
          _view.image.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'image'
          _view.image.linkProperty("SizeY",  function() { return 2*height; } ); // HtmlView Page linking property 'SizeY' for element 'image'
          _view.body13.linkProperty("SizeX",  function() { return 2*radius1; } ); // HtmlView Page linking property 'SizeX' for element 'body13'
          _view.body13.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'body13'
          _view.body13.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'body13'
          _view.body13.linkProperty("SizeY",  function() { return 2*height; } ); // HtmlView Page linking property 'SizeY' for element 'body13'
          _view.body13.setAction("OnDrag", function(_data,_info) {
  // overlap solution for press cart1
  if ( Math.abs(x1-x2)<=(radius2+radius1) ) 
  {
    x2 = x1+(radius2+radius1);
  //  x1 = x2-(radius2+radius1);
  }
  //drag stop on left wall
  if ((x1-radius1)-xmin<=0){
    x1=radius1+xmin;
    }
  //drag stop right wall tricky include mass2
  if ((x1+radius1)+2*radius2-xmax>=0){
    x1=-radius1-2*radius2+xmax;
    x2 = -radius2+xmax;
    }
  //_view.comboBox.setSelectedOptions(["user_defined"]);

}); // HtmlView Page setting action 'OnDrag' for element 'body13'
          _view.body1infopoint.linkProperty("SizeX",  function() { return 2*radius1; } ); // HtmlView Page linking property 'SizeX' for element 'body1infopoint'
          _view.body1infopoint.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'body1infopoint'
          _view.body1infopoint.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'body1infopoint'
          _view.body1infopoint.linkProperty("SizeY",  function() { return 2*height; } ); // HtmlView Page linking property 'SizeY' for element 'body1infopoint'
          _view.body1infopoint.setAction("OnDrag", function(_data,_info) {
  // overlap solution for press cart1
  x1 = Math.round(_info.point[0]*2)/2;
  if ( Math.abs(x1-x2)<=(radius2+radius1) ) 
  {
    x2 = x1+(radius2+radius1);
  //  x1 = x2-(radius2+radius1);
  }
  //drag stop on left wall
  if ((x1-radius1)-xmin<=0){
    x1=radius1+xmin;
    }
  //drag stop right wall tricky include mass2
  if ((x1+radius1)+2*radius2-xmax>=0){
    x1=-radius1-2*radius2+xmax;
    x2 = -radius2+xmax;
    }
  //_view.comboBox.setSelectedOptions(["user_defined"]);

}); // HtmlView Page setting action 'OnDrag' for element 'body1infopoint'
          _view.minus_button1.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'minus_button1'
          _view.minus_button1.linkProperty("X",  function() { return x1 - size*1.5; } ); // HtmlView Page linking property 'X' for element 'minus_button1'
          _view.minus_button1.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'minus_button1'
          _view.minus_button1.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'minus_button1'
          _view.minus1.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'minus1'
          _view.minus1.linkProperty("X",  function() { return x1-size*1.5; } ); // HtmlView Page linking property 'X' for element 'minus1'
          _view.minus1.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'minus1'
          _view.minus1.setAction("OnPress", function(_data,_info) {
  if (mass1 > 1) {
    mass1 -= 1;
  }

}); // HtmlView Page setting action 'OnPress' for element 'minus1'
          _view.minus1.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'minus1'
          _view.plus_button1.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'plus_button1'
          _view.plus_button1.linkProperty("X",  function() { return x1+size*1.5; } ); // HtmlView Page linking property 'X' for element 'plus_button1'
          _view.plus_button1.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'plus_button1'
          _view.plus_button1.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'plus_button1'
          _view.plus1.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'plus1'
          _view.plus1.linkProperty("X",  function() { return x1+size*1.5; } ); // HtmlView Page linking property 'X' for element 'plus1'
          _view.plus1.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'plus1'
          _view.plus1.setAction("OnPress", function(_data,_info) {
  if (mass1 < 8) {
    mass1 += 1;
  }

}); // HtmlView Page setting action 'OnPress' for element 'plus1'
          _view.plus1.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'plus1'
          _view.mass_1_name.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'mass_1_name'
          _view.mass_1_name.linkProperty("Y",  function() { return -size*0.2; } ); // HtmlView Page linking property 'Y' for element 'mass_1_name'
          _view.m12.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'm12'
          _view.m12.linkProperty("Y",  function() { return size*1.2; } ); // HtmlView Page linking property 'Y' for element 'm12'
          _view.m12.linkProperty("Text",  function() { return +_view._format(mass1,"0.0")+ "kg"; } ); // HtmlView Page linking property 'Text' for element 'm12'
          _view.u.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'u'
          _view.u.linkProperty("Y",  function() { return y+radius1+size; } ); // HtmlView Page linking property 'Y' for element 'u'
          _view.vdrag.linkProperty("X",  function() { return vx1s; }, function(_v) { vx1s = _v; } ); // HtmlView Page linking property 'X' for element 'vdrag'
          _view.vdrag.setAction("OnDrag", function(_data,_info) {
  vx1s = Math.round((_info.point[0]-x1)*2)/2;
  //vx1s = Math.round(vx1s*2)/2;
  _initialize();

}); // HtmlView Page setting action 'OnDrag' for element 'vdrag'
          _view.velocity.linkProperty("SizeX",  function() { return vx1s; }, function(_v) { vx1s = _v; } ); // HtmlView Page linking property 'SizeX' for element 'velocity'
          _view.velocity.setAction("OnPress", function(_data,_info) {
  vx1= vx1s;
  vx2= vx2s;
  mom1s =mom1= mass1*vx1s;
  mom2s =mom2= mass2*vx2s;
  KE1s =KE1=0.5*mass1*(vx1s*vx1s);
  KE2s =KE2= 0.5*mass2*(vx2s*vx2s);

}); // HtmlView Page setting action 'OnPress' for element 'velocity'
          _view.group4.linkProperty("X",  function() { return vx1s; }, function(_v) { vx1s = _v; } ); // HtmlView Page linking property 'X' for element 'group4'
          _view.group4.linkProperty("Y",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'Y' for element 'group4'
          _view.v3.linkProperty("Text",  function() { return "u₁ = "+_view._format(vx1s,"0.0")+ "m/s"; } ); // HtmlView Page linking property 'Text' for element 'v3'
          _view.v3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'v3'
          _view.v4.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'v4'
          _view.v4.linkProperty("Y",  function() { return -y-radius1-2*size; } ); // HtmlView Page linking property 'Y' for element 'v4'
          _view.v4.linkProperty("Visibility",  function() { return t>=tcollision; } ); // HtmlView Page linking property 'Visibility' for element 'v4'
          _view.velocity3.linkProperty("SizeX",  function() { return vx1; }, function(_v) { vx1 = _v; } ); // HtmlView Page linking property 'SizeX' for element 'velocity3'
          _view.group3.linkProperty("X",  function() { return vx1; }, function(_v) { vx1 = _v; } ); // HtmlView Page linking property 'X' for element 'group3'
          _view.group3.linkProperty("Y",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'Y' for element 'group3'
          _view.v33.linkProperty("Text",  function() { return "v₁ = "+_view._format(vx1,"0.0")+ "m/s"; } ); // HtmlView Page linking property 'Text' for element 'v33'
          _view.wheel12.linkProperty("Transformation",  function() { return wheelAngle; }, function(_v) { wheelAngle = _v; } ); // HtmlView Page linking property 'Transformation' for element 'wheel12'
          _view.wheel12.linkProperty("SizeX",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeX' for element 'wheel12'
          _view.wheel12.linkProperty("X",  function() { return x1 - 0.5*radius1; } ); // HtmlView Page linking property 'X' for element 'wheel12'
          _view.wheel12.linkProperty("Y",  function() { return y - height*0.93; } ); // HtmlView Page linking property 'Y' for element 'wheel12'
          _view.wheel12.linkProperty("SizeY",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeY' for element 'wheel12'
          _view.wheel1.linkProperty("Transformation",  function() { return wheelAngle; }, function(_v) { wheelAngle = _v; } ); // HtmlView Page linking property 'Transformation' for element 'wheel1'
          _view.wheel1.linkProperty("SizeX",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeX' for element 'wheel1'
          _view.wheel1.linkProperty("X",  function() { return x1 + 0.5*radius1; } ); // HtmlView Page linking property 'X' for element 'wheel1'
          _view.wheel1.linkProperty("Y",  function() { return y - height*0.93; } ); // HtmlView Page linking property 'Y' for element 'wheel1'
          _view.wheel1.linkProperty("SizeY",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeY' for element 'wheel1'
          _view.velcro3.linkProperty("SizeX",  function() { return size/4; } ); // HtmlView Page linking property 'SizeX' for element 'velcro3'
          _view.velcro3.linkProperty("X",  function() { return x1+radius1; } ); // HtmlView Page linking property 'X' for element 'velcro3'
          _view.velcro3.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'velcro3'
          _view.velcro3.linkProperty("Visibility",  function() { return es==0; } ); // HtmlView Page linking property 'Visibility' for element 'velcro3'
          _view.velcro3.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'velcro3'
          _view.spring.linkProperty("Radius",  function() { return size2; }, function(_v) { size2 = _v; } ); // HtmlView Page linking property 'Radius' for element 'spring'
          _view.spring.linkProperty("SizeX",  function() { return -radius1/2; } ); // HtmlView Page linking property 'SizeX' for element 'spring'
          _view.spring.linkProperty("X",  function() { return x1+radius1; } ); // HtmlView Page linking property 'X' for element 'spring'
          _view.spring.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'spring'
          _view.gravity.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'gravity'
          _view.gravity.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'gravity'
          _view.gravity.linkProperty("SizeY",  function() { return -mass1*9.81/50; } ); // HtmlView Page linking property 'SizeY' for element 'gravity'
          _view.reaction.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'reaction'
          _view.reaction.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'reaction'
          _view.reaction.linkProperty("SizeY",  function() { return mass1*9.81/50; } ); // HtmlView Page linking property 'SizeY' for element 'reaction'
          _view.F1.linkProperty("SizeX",  function() { return F1/500; } ); // HtmlView Page linking property 'SizeX' for element 'F1'
          _view.F1.linkProperty("X",  function() { return x1+radius1; } ); // HtmlView Page linking property 'X' for element 'F1'
          _view.F1.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'F1'
          _view.F12.linkProperty("X",  function() { return x1+radius1+F1/500; } ); // HtmlView Page linking property 'X' for element 'F12'
          _view.F12.linkProperty("Y",  function() { return y+height/2.5; } ); // HtmlView Page linking property 'Y' for element 'F12'
          _view.F12.linkProperty("Text",  function() { return "| F = "+_view._format(Math.abs(F1),"0.0"); } ); // HtmlView Page linking property 'Text' for element 'F12'
          _view.F12.linkProperty("Visibility",  function() { return Math.abs(F1)>0.1; } ); // HtmlView Page linking property 'Visibility' for element 'F12'
          _view.image2.linkProperty("SizeX",  function() { return 2*radius2; } ); // HtmlView Page linking property 'SizeX' for element 'image2'
          _view.image2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'image2'
          _view.image2.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'image2'
          _view.image2.linkProperty("SizeY",  function() { return 2*height; } ); // HtmlView Page linking property 'SizeY' for element 'image2'
          _view.body122.linkProperty("SizeX",  function() { return 2*radius2; } ); // HtmlView Page linking property 'SizeX' for element 'body122'
          _view.body122.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'body122'
          _view.body122.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'body122'
          _view.body122.linkProperty("SizeY",  function() { return 2*height; } ); // HtmlView Page linking property 'SizeY' for element 'body122'
          _view.body122.setAction("OnDrag", function(_data,_info) {
  // overlap solution for press1 cart2
  if ( Math.abs(x1-x2)<=(radius2+radius1) ) 
  {
  //  x2 = x1+(radius2+radius1);
    x1 = x2-(radius2+radius1);
  }
  //drag stop on right wall
  if ((x2+radius2)-xmax>=0){
    x2=-radius2+xmax;
    }
  //drag stop left wall tricky include mass1
  if ((x2-radius2)-2*radius1-xmin<=0){
    x2=+radius2+2*radius1+xmin;
    x1 = +radius1+xmin;
    }
    
    
  //_view.comboBox.setSelectedOptions(["user_defined"]);

}); // HtmlView Page setting action 'OnDrag' for element 'body122'
          _view.body12infopoint.linkProperty("SizeX",  function() { return 2*radius2; } ); // HtmlView Page linking property 'SizeX' for element 'body12infopoint'
          _view.body12infopoint.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'body12infopoint'
          _view.body12infopoint.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'body12infopoint'
          _view.body12infopoint.linkProperty("SizeY",  function() { return 2*height; } ); // HtmlView Page linking property 'SizeY' for element 'body12infopoint'
          _view.body12infopoint.setAction("OnDrag", function(_data,_info) {
  // overlap solution for press1 cart2
  x2 = Math.round(_info.point[0]*2)/2;
  if ( Math.abs(x1-x2)<=(radius2+radius1) )
  {
  //  x2 = x1+(radius2+radius1);
    x1 = x2-(radius2+radius1);
  }
  //drag stop on right wall
  if ((x2+radius2)-xmax>=0){
    x2=-radius2+xmax;
    }
  //drag stop left wall tricky include mass1
  if ((x2-radius2)-2*radius1-xmin<=0){
    x2=+radius2+2*radius1+xmin;
    x1 = +radius1+xmin;
    }
    
    
  //_view.comboBox.setSelectedOptions(["user_defined"]);

}); // HtmlView Page setting action 'OnDrag' for element 'body12infopoint'
          _view.minus_button2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'minus_button2'
          _view.minus_button2.linkProperty("X",  function() { return x2 - size*1.5; } ); // HtmlView Page linking property 'X' for element 'minus_button2'
          _view.minus_button2.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'minus_button2'
          _view.minus_button2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'minus_button2'
          _view.minus2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'minus2'
          _view.minus2.linkProperty("X",  function() { return x2-size*1.5; } ); // HtmlView Page linking property 'X' for element 'minus2'
          _view.minus2.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'minus2'
          _view.minus2.setAction("OnPress", function(_data,_info) {
  if (mass2 > 1) {
    mass2 -= 1;
  }

}); // HtmlView Page setting action 'OnPress' for element 'minus2'
          _view.minus2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'minus2'
          _view.plus_button2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'plus_button2'
          _view.plus_button2.linkProperty("X",  function() { return x2+size*1.5; } ); // HtmlView Page linking property 'X' for element 'plus_button2'
          _view.plus_button2.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'plus_button2'
          _view.plus_button2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'plus_button2'
          _view.plus2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'plus2'
          _view.plus2.linkProperty("X",  function() { return x2+size*1.5; } ); // HtmlView Page linking property 'X' for element 'plus2'
          _view.plus2.linkProperty("Y",  function() { return size*1.5; } ); // HtmlView Page linking property 'Y' for element 'plus2'
          _view.plus2.setAction("OnPress", function(_data,_info) {
  if (mass2 < 8) {
    mass2 += 1;
  }

}); // HtmlView Page setting action 'OnPress' for element 'plus2'
          _view.plus2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'plus2'
          _view.mass_2_name.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'mass_2_name'
          _view.mass_2_name.linkProperty("Y",  function() { return -size*0.2; } ); // HtmlView Page linking property 'Y' for element 'mass_2_name'
          _view.m122.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'm122'
          _view.m122.linkProperty("Y",  function() { return size*1.2; } ); // HtmlView Page linking property 'Y' for element 'm122'
          _view.m122.linkProperty("Text",  function() { return +_view._format(mass2,"0")+"kg"; } ); // HtmlView Page linking property 'Text' for element 'm122'
          _view.m122.setAction("OnPress", function(_data,_info) {
  mass2=mass2+1;
  if (mass2==8){
    mass2=1;
    }
   alert("m₂ has been changed to "+mass2);

}); // HtmlView Page setting action 'OnPress' for element 'm122'
          _view.u2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'u2'
          _view.u2.linkProperty("Y",  function() { return y+radius2+2*size; } ); // HtmlView Page linking property 'Y' for element 'u2'
          _view.vdrag2.linkProperty("X",  function() { return vx2s; }, function(_v) { vx2s = _v; } ); // HtmlView Page linking property 'X' for element 'vdrag2'
          _view.vdrag2.setAction("OnDrag", function(_data,_info) {
  vx2s = Math.round((_info.point[0]-x2)*2)/2;
  _initialize();

}); // HtmlView Page setting action 'OnDrag' for element 'vdrag2'
          _view.velocity2.linkProperty("SizeX",  function() { return vx2s; }, function(_v) { vx2s = _v; } ); // HtmlView Page linking property 'SizeX' for element 'velocity2'
          _view.velocity2.setAction("OnPress", function(_data,_info) {
  vx1= vx1s;
  vx2= vx2s;
  mom1s =mom1= mass1*vx1s;
  mom2s =mom2= mass2*vx2s;
  KE1s =KE1=0.5*mass1*(vx1s*vx1s);
  KE2s =KE2= 0.5*mass2*(vx2s*vx2s);

}); // HtmlView Page setting action 'OnPress' for element 'velocity2'
          _view.group2.linkProperty("X",  function() { return vx2s; }, function(_v) { vx2s = _v; } ); // HtmlView Page linking property 'X' for element 'group2'
          _view.group2.linkProperty("Y",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'Y' for element 'group2'
          _view.v32.linkProperty("Text",  function() { return "u₂ = "+_view._format(vx2s,"0.0")+ "m/s"; } ); // HtmlView Page linking property 'Text' for element 'v32'
          _view.v42.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'v42'
          _view.v42.linkProperty("Y",  function() { return -y-radius2-2*size; } ); // HtmlView Page linking property 'Y' for element 'v42'
          _view.v42.linkProperty("Visibility",  function() { return t>=tcollision; } ); // HtmlView Page linking property 'Visibility' for element 'v42'
          _view.velocity32.linkProperty("SizeX",  function() { return vx2; }, function(_v) { vx2 = _v; } ); // HtmlView Page linking property 'SizeX' for element 'velocity32'
          _view.group.linkProperty("Y",  function() { return -size; } ); // HtmlView Page linking property 'Y' for element 'group'
          _view.v332.linkProperty("Text",  function() { return "v₂ = "+_view._format(vx2,"0.0")+ "m/s"; } ); // HtmlView Page linking property 'Text' for element 'v332'
          _view.v332.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'v332'
          _view.wheel1222.linkProperty("Transformation",  function() { return wheelAngle2; }, function(_v) { wheelAngle2 = _v; } ); // HtmlView Page linking property 'Transformation' for element 'wheel1222'
          _view.wheel1222.linkProperty("SizeX",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeX' for element 'wheel1222'
          _view.wheel1222.linkProperty("X",  function() { return x2 - 0.5*radius2; } ); // HtmlView Page linking property 'X' for element 'wheel1222'
          _view.wheel1222.linkProperty("Y",  function() { return y - height*0.93; } ); // HtmlView Page linking property 'Y' for element 'wheel1222'
          _view.wheel1222.linkProperty("SizeY",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeY' for element 'wheel1222'
          _view.wheel122.linkProperty("Transformation",  function() { return wheelAngle2; }, function(_v) { wheelAngle2 = _v; } ); // HtmlView Page linking property 'Transformation' for element 'wheel122'
          _view.wheel122.linkProperty("SizeX",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeX' for element 'wheel122'
          _view.wheel122.linkProperty("X",  function() { return x2 + 0.5*radius2; } ); // HtmlView Page linking property 'X' for element 'wheel122'
          _view.wheel122.linkProperty("Y",  function() { return y - height*0.93; } ); // HtmlView Page linking property 'Y' for element 'wheel122'
          _view.wheel122.linkProperty("SizeY",  function() { return height/1.5; } ); // HtmlView Page linking property 'SizeY' for element 'wheel122'
          _view.velcro32.linkProperty("SizeX",  function() { return size/4; } ); // HtmlView Page linking property 'SizeX' for element 'velcro32'
          _view.velcro32.linkProperty("X",  function() { return x2-radius2; } ); // HtmlView Page linking property 'X' for element 'velcro32'
          _view.velcro32.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'velcro32'
          _view.velcro32.linkProperty("Visibility",  function() { return es==0; } ); // HtmlView Page linking property 'Visibility' for element 'velcro32'
          _view.velcro32.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'velcro32'
          _view.spring2.linkProperty("Radius",  function() { return size2; }, function(_v) { size2 = _v; } ); // HtmlView Page linking property 'Radius' for element 'spring2'
          _view.spring2.linkProperty("SizeX",  function() { return radius2/2; } ); // HtmlView Page linking property 'SizeX' for element 'spring2'
          _view.spring2.linkProperty("X",  function() { return x2-radius2; } ); // HtmlView Page linking property 'X' for element 'spring2'
          _view.spring2.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'spring2'
          _view.gravity2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'gravity2'
          _view.gravity2.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'gravity2'
          _view.gravity2.linkProperty("SizeY",  function() { return -mass2*9.81/50; } ); // HtmlView Page linking property 'SizeY' for element 'gravity2'
          _view.reaction2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'reaction2'
          _view.reaction2.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'reaction2'
          _view.reaction2.linkProperty("SizeY",  function() { return mass2*9.81/50; } ); // HtmlView Page linking property 'SizeY' for element 'reaction2'
          _view.F13.linkProperty("SizeX",  function() { return F2/500; } ); // HtmlView Page linking property 'SizeX' for element 'F13'
          _view.F13.linkProperty("X",  function() { return x2-radius2; } ); // HtmlView Page linking property 'X' for element 'F13'
          _view.F13.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'F13'
          _view.F122.linkProperty("X",  function() { return x2-radius2+F2/500; } ); // HtmlView Page linking property 'X' for element 'F122'
          _view.F122.linkProperty("Y",  function() { return y+height/2.5; } ); // HtmlView Page linking property 'Y' for element 'F122'
          _view.F122.linkProperty("Text",  function() { return "|F| = "+_view._format(Math.abs(F2),"0.0"); } ); // HtmlView Page linking property 'Text' for element 'F122'
          _view.F122.linkProperty("Visibility",  function() { return Math.abs(F2)>0.1; } ); // HtmlView Page linking property 'Visibility' for element 'F122'
          _view.bomb.linkProperty("Visibility",  function() { return _view.comboBox.getProperty("SelectedOptions")=="explosion"&&t<texplosion; } ); // HtmlView Page linking property 'Visibility' for element 'bomb'
          _view.afterexplosion.linkProperty("Visibility",  function() { return _view.comboBox.getProperty("SelectedOptions")=="explosion"&&t>texplosion; } ); // HtmlView Page linking property 'Visibility' for element 'afterexplosion'
          _view.plottingPanelmom.linkProperty("Width",  function() { return Width2; }, function(_v) { Width2 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanelmom'
          _view.plottingPanelmom.linkProperty("AxisYFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'AxisYFont' for element 'plottingPanelmom'
          _view.plottingPanelmom.linkProperty("YTickStep",  function() { return !fvst?5:100; } ); // HtmlView Page linking property 'YTickStep' for element 'plottingPanelmom'
          _view.plottingPanelmom.linkProperty("AxisXFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'AxisXFont' for element 'plottingPanelmom'
          _view.plottingPanelmom.linkProperty("Display",  function() { return graph?"inline":"none"; } ); // HtmlView Page linking property 'Display' for element 'plottingPanelmom'
          _view.plottingPanelmom.linkProperty("BRMessage",  function() { return "Legend:"+"\ngreen = cart 1"+"\nblue = cart 2"+"\nblack = total cart 1 and 2"; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanelmom'
          _view.total2.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'total2'
          _view.total2.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'total2'
          _view.total2.linkProperty("Visibility",  function() { return showtotal; }, function(_v) { showtotal = _v; } ); // HtmlView Page linking property 'Visibility' for element 'total2'
          _view.total2.linkProperty("InputY",  function() { return totalmomentum; }, function(_v) { totalmomentum = _v; } ); // HtmlView Page linking property 'InputY' for element 'total2'
          _view.total5.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'total5'
          _view.total5.linkProperty("Y",  function() { return totalmomentum; }, function(_v) { totalmomentum = _v; } ); // HtmlView Page linking property 'Y' for element 'total5'
          _view.total5.linkProperty("Visibility",  function() { return showtotaltext; }, function(_v) { showtotaltext = _v; } ); // HtmlView Page linking property 'Visibility' for element 'total5'
          _view.text5.linkProperty("Text",  function() { return "total mom="+totalmomentum.toFixed(2); } ); // HtmlView Page linking property 'Text' for element 'text5'
          _view.text5.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'text5'
          _view.total.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'total'
          _view.total.linkProperty("Y",  function() { return totalmomentum; }, function(_v) { totalmomentum = _v; } ); // HtmlView Page linking property 'Y' for element 'total'
          _view.total.linkProperty("Visibility",  function() { return showtotal; }, function(_v) { showtotal = _v; } ); // HtmlView Page linking property 'Visibility' for element 'total'
          _view.mvvxst.linkProperty("Visibility",  function() { return mvvst; }, function(_v) { mvvst = _v; } ); // HtmlView Page linking property 'Visibility' for element 'mvvxst'
          _view.moving1.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'moving1'
          _view.moving1.linkProperty("Y",  function() { return mom1; }, function(_v) { mom1 = _v; } ); // HtmlView Page linking property 'Y' for element 'moving1'
          _view.moving1.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moving1'
          _view.moving1.setAction("OnDrag", function(_data,_info) {
  mom1=Math.round(mom1);
  vx1=vx1s=mom1/mass1;

}); // HtmlView Page setting action 'OnDrag' for element 'moving1'
          _view.trail3.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'trail3'
          _view.trail3.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail3'
          _view.trail3.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail3'
          _view.trail3.linkProperty("InputY",  function() { return mom1; }, function(_v) { mom1 = _v; } ); // HtmlView Page linking property 'InputY' for element 'trail3'
          _view.final.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'final'
          _view.final.linkProperty("Y",  function() { return mom1; }, function(_v) { mom1 = _v; } ); // HtmlView Page linking property 'Y' for element 'final'
          _view.final.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'final'
          _view.text.linkProperty("Text",  function() { return "m₁v₁="+_view._format(mass1*vx1,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text'
          _view.text.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'text'
          _view.initial.linkProperty("Y",  function() { return mom1s; }, function(_v) { mom1s = _v; } ); // HtmlView Page linking property 'Y' for element 'initial'
          _view.initial.linkProperty("Visibility",  function() { return show1||t>0; } ); // HtmlView Page linking property 'Visibility' for element 'initial'
          _view.text3.linkProperty("Text",  function() { return "m₁u₁="+_view._format(mom1s,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text3'
          _view.text3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'text3'
          _view.moving2.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'moving2'
          _view.moving2.linkProperty("Y",  function() { return mom2; }, function(_v) { mom2 = _v; } ); // HtmlView Page linking property 'Y' for element 'moving2'
          _view.moving2.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moving2'
          _view.moving2.setAction("OnDrag", function(_data,_info) {
  mom2=Math.round(mom2);
  vx2=vx2s=mom2/mass2;

}); // HtmlView Page setting action 'OnDrag' for element 'moving2'
          _view.final3.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'final3'
          _view.final3.linkProperty("Y",  function() { return mom2; }, function(_v) { mom2 = _v; } ); // HtmlView Page linking property 'Y' for element 'final3'
          _view.final3.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'final3'
          _view.text2.linkProperty("Text",  function() { return "m₂v₂="+_view._format(mass2*vx2,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text2'
          _view.text2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'text2'
          _view.trail22.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'trail22'
          _view.trail22.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail22'
          _view.trail22.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail22'
          _view.trail22.linkProperty("InputY",  function() { return mom2; }, function(_v) { mom2 = _v; } ); // HtmlView Page linking property 'InputY' for element 'trail22'
          _view.initial2.linkProperty("Y",  function() { return mom2s; }, function(_v) { mom2s = _v; } ); // HtmlView Page linking property 'Y' for element 'initial2'
          _view.initial2.linkProperty("Visibility",  function() { return show2||t>0; } ); // HtmlView Page linking property 'Visibility' for element 'initial2'
          _view.text22.linkProperty("Text",  function() { return "m₂u₂="+_view._format(mom2s,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text22'
          _view.text22.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'text22'
          _view.plottingPanelKE.linkProperty("Width",  function() { return Width3; }, function(_v) { Width3 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanelKE'
          _view.plottingPanelKE.linkProperty("AxisYFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'AxisYFont' for element 'plottingPanelKE'
          _view.plottingPanelKE.linkProperty("YTickStep",  function() { return !fvst?5:100; } ); // HtmlView Page linking property 'YTickStep' for element 'plottingPanelKE'
          _view.plottingPanelKE.linkProperty("AxisXFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'AxisXFont' for element 'plottingPanelKE'
          _view.plottingPanelKE.linkProperty("Display",  function() { return graph3?"inline":"none"; } ); // HtmlView Page linking property 'Display' for element 'plottingPanelKE'
          _view.plottingPanelKE.linkProperty("BRMessage",  function() { return "Legend:"+"\ngreen = cart 1"+"\nblue = cart 2"+"\nblack = total cart 1 and 2"; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanelKE'
          _view.moving.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'moving'
          _view.moving.linkProperty("Y",  function() { return KE1; }, function(_v) { KE1 = _v; } ); // HtmlView Page linking property 'Y' for element 'moving'
          _view.moving.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moving'
          _view.moving.setAction("OnDrag", function(_data,_info) {
  if (KE1<0) KE1=0;
  KE1=Math.round(KE1);
  vx1=vx1s=Math.sqrt(KE1*2/mass1);

}); // HtmlView Page setting action 'OnDrag' for element 'moving'
          _view.trail32.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail32'
          _view.trail32.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail32'
          _view.trail32.linkProperty("InputY",  function() { return 0.5*mass1*vx1*vx1; } ); // HtmlView Page linking property 'InputY' for element 'trail32'
          _view.final2.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'final2'
          _view.final2.linkProperty("Y",  function() { return KE1; }, function(_v) { KE1 = _v; } ); // HtmlView Page linking property 'Y' for element 'final2'
          _view.final2.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'final2'
          _view.text4.linkProperty("Text",  function() { return "KE₁f="+_view._format(KE1,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text4'
          _view.initial3.linkProperty("Y",  function() { return KE1s; }, function(_v) { KE1s = _v; } ); // HtmlView Page linking property 'Y' for element 'initial3'
          _view.initial3.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'initial3'
          _view.text32.linkProperty("Text",  function() { return "KE₁i="+_view._format(KE1s,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text32'
          _view.moving3.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'moving3'
          _view.moving3.linkProperty("Y",  function() { return KE2; }, function(_v) { KE2 = _v; } ); // HtmlView Page linking property 'Y' for element 'moving3'
          _view.moving3.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moving3'
          _view.moving3.setAction("OnDrag", function(_data,_info) {
  if (KE2<0) KE2=0;
  KE2=Math.round(KE2);
  vx2=vx2s=Math.sqrt(KE2*2/mass2);

}); // HtmlView Page setting action 'OnDrag' for element 'moving3'
          _view.trail222.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail222'
          _view.trail222.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail222'
          _view.trail222.linkProperty("InputY",  function() { return 0.5*mass2*vx2*vx2; } ); // HtmlView Page linking property 'InputY' for element 'trail222'
          _view.final32.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'final32'
          _view.final32.linkProperty("Y",  function() { return KE2; }, function(_v) { KE2 = _v; } ); // HtmlView Page linking property 'Y' for element 'final32'
          _view.final32.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'final32'
          _view.text23.linkProperty("Text",  function() { return "KE₂f="+_view._format(KE2,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text23'
          _view.initial22.linkProperty("Y",  function() { return KE2s; }, function(_v) { KE2s = _v; } ); // HtmlView Page linking property 'Y' for element 'initial22'
          _view.initial22.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'initial22'
          _view.text222.linkProperty("Text",  function() { return "KE₂="+_view._format(KE2s,"0.00"); } ); // HtmlView Page linking property 'Text' for element 'text222'
          _view.total4.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'total4'
          _view.total4.linkProperty("Visibility",  function() { return showtotal; }, function(_v) { showtotal = _v; } ); // HtmlView Page linking property 'Visibility' for element 'total4'
          _view.total4.linkProperty("InputY",  function() { return totalKE; }, function(_v) { totalKE = _v; } ); // HtmlView Page linking property 'InputY' for element 'total4'
          _view.total3.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'total3'
          _view.total3.linkProperty("Y",  function() { return totalKE; }, function(_v) { totalKE = _v; } ); // HtmlView Page linking property 'Y' for element 'total3'
          _view.total3.linkProperty("Visibility",  function() { return showtotal; }, function(_v) { showtotal = _v; } ); // HtmlView Page linking property 'Visibility' for element 'total3'
          _view.plottingPanelF.linkProperty("Width",  function() { return Width4; }, function(_v) { Width4 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanelF'
          _view.plottingPanelF.linkProperty("AxisYFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'AxisYFont' for element 'plottingPanelF'
          _view.plottingPanelF.linkProperty("AxisXFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'AxisXFont' for element 'plottingPanelF'
          _view.plottingPanelF.linkProperty("Display",  function() { return graph4?"inline":"none"; } ); // HtmlView Page linking property 'Display' for element 'plottingPanelF'
          _view.plottingPanelF.linkProperty("BRMessage",  function() { return "Legend:"+"\ngreen = cart 1"+"\nblue = cart 2"+"\nblack = total cart 1 and 2"; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanelF'
          _view.trail.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail'
          _view.trail.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail'
          _view.trail.linkProperty("InputY",  function() { return F1; }, function(_v) { F1 = _v; } ); // HtmlView Page linking property 'InputY' for element 'trail'
          _view.moving4.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'moving4'
          _view.moving4.linkProperty("Y",  function() { return F1; }, function(_v) { F1 = _v; } ); // HtmlView Page linking property 'Y' for element 'moving4'
          _view.moving4.linkProperty("Visibility",  function() { return show1; }, function(_v) { show1 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moving4'
          _view.trail2.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'trail2'
          _view.trail2.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trail2'
          _view.trail2.linkProperty("InputY",  function() { return F2; }, function(_v) { F2 = _v; } ); // HtmlView Page linking property 'InputY' for element 'trail2'
          _view.moving42.linkProperty("X",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'X' for element 'moving42'
          _view.moving42.linkProperty("Y",  function() { return F2; }, function(_v) { F2 = _v; } ); // HtmlView Page linking property 'Y' for element 'moving42'
          _view.moving42.linkProperty("Visibility",  function() { return show2; }, function(_v) { show2 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'moving42'
          _view.F14.linkProperty("X",  function() { return tcollision; }, function(_v) { tcollision = _v; } ); // HtmlView Page linking property 'X' for element 'F14'
          _view.F14.linkProperty("Y",  function() { return -Fmax; } ); // HtmlView Page linking property 'Y' for element 'F14'
          _view.F14.linkProperty("Text",  function() { return "F₁=-"+Fmax.toFixed(0)+" N"; } ); // HtmlView Page linking property 'Text' for element 'F14'
          _view.F142.linkProperty("X",  function() { return tcollision; }, function(_v) { tcollision = _v; } ); // HtmlView Page linking property 'X' for element 'F142'
          _view.F142.linkProperty("Y",  function() { return Fmax; }, function(_v) { Fmax = _v; } ); // HtmlView Page linking property 'Y' for element 'F142'
          _view.F142.linkProperty("Text",  function() { return "F₂="+Fmax.toFixed(0)+" N"; } ); // HtmlView Page linking property 'Text' for element 'F142'
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
function Momentum1Dtype1_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = Momentum1Dtype1_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Intro Page','./Momentum1Dtype1_Intro_1.html');

  return _view;
} // end of main function

function Momentum1Dtype1_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"bottomPanel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'bottomPanel'
      .setProperty("CSS",{"display":"inline"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'bottomPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"bottomPanel2", _view.bottomPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'bottomPanel2'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'bottomPanel2'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'bottomPanel2'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"cart1", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'cart1'
      .setProperty("Width","25%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'cart1'
      .setProperty("Text","cart 1") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'cart1'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox2", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"cart12", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'cart12'
      .setProperty("Width","25%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'cart12'
      .setProperty("Text","cart 2") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'cart12'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox3", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox3'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox3'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"total6", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'total6'
      .setProperty("Width","25%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'total6'
      .setProperty("Text","total") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'total6'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox4", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox4'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox4'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label5", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'label5'
      .setProperty("Tooltip","coefficient of restitution") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'label5'
      .setProperty("Text"," e = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label5'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field4", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'field4'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field4'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field4'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","►Play") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","❚❚Pause") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'stepButton2'
      .setProperty("Text","❚►Step") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton2", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton2'
      .setProperty("Text","↻Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton2'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"explosionaudio", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'explosionaudio'
      .setProperty("Volume",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Volume' for element 'explosionaudio'
      .setProperty("Controls",false) // EJsS HtmlView.HtmlView Page: setting property 'Controls' for element 'explosionaudio'
      .setProperty("AudioUrl","./Momentum1D/Flashbang-Kibblesbob-899170896.mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'explosionaudio'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.bottomPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'audio'
      .setProperty("Volume",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Volume' for element 'audio'
      .setProperty("Controls",false) // EJsS HtmlView.HtmlView Page: setting property 'Controls' for element 'audio'
      .setProperty("AudioUrl","./Momentum1D/collision.ogg") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel3", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel3'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("Background","url(#mygrandient4)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",3) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",3) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumX",-3) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",-3) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"world", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'world'
      .setProperty("FillColor","rgba(255,255,255,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'world'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'world'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'world'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'world'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"table2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'table2'
      .setProperty("FillColor","LightGray") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'table2'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'table2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'table2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'table2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"table", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'table'
      .setProperty("FillColor","url(#mygrandient)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'table'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'table'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'table'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'table'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"mass1", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'mass1'
      .setProperty("Visibility",true) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'mass1'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'image'
      .setProperty("ImageUrl","./Momentum1D/cart_large.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'image'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'image'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"body13", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'body13'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'body13'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'body13'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'body13'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"body1infopoint", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'body1infopoint'
      .setProperty("FillColor","url(#mygrandient1)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'body1infopoint'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'body1infopoint'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'body1infopoint'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"m1_plusminus", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'm1_plusminus'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'm1_plusminus'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"minus_button1", _view.m1_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'minus_button1'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'minus_button1'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'minus_button1'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"minus1", _view.m1_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'minus1'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'minus1'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'minus1'
      .setProperty("Text","-") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'minus1'
      .setProperty("PixelSize",false) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'minus1'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'minus1'
      .setProperty("Font","normal normal 50px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'minus1'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"plus_button1", _view.m1_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'plus_button1'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'plus_button1'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'plus_button1'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"plus1", _view.m1_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'plus1'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'plus1'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'plus1'
      .setProperty("Text","+") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'plus1'
      .setProperty("PixelSize",false) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'plus1'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'plus1'
      .setProperty("Font","normal normal 50px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'plus1'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"mass_1_name", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'mass_1_name'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'mass_1_name'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'mass_1_name'
      .setProperty("Text","m₁") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'mass_1_name'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"m12", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'm12'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'm12'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'm12'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"u", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'u'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"vdrag", _view.u) // EJsS HtmlView.HtmlView Page: declaration of element 'vdrag'
      .setProperty("FillColor","rgba(255,0,255,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'vdrag'
      .setProperty("SizeX",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'vdrag'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'vdrag'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'vdrag'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'vdrag'
      .setProperty("SizeY",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'vdrag'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'vdrag'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'vdrag'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"velocity", _view.u) // EJsS HtmlView.HtmlView Page: declaration of element 'velocity'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'velocity'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'velocity'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'velocity'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'velocity'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group4", _view.u) // EJsS HtmlView.HtmlView Page: declaration of element 'group4'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"v3", _view.group4) // EJsS HtmlView.HtmlView Page: declaration of element 'v3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'v3'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'v3'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'v3'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'v3'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"v4", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'v4'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"velocity3", _view.v4) // EJsS HtmlView.HtmlView Page: declaration of element 'velocity3'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'velocity3'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'velocity3'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'velocity3'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'velocity3'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group3", _view.v4) // EJsS HtmlView.HtmlView Page: declaration of element 'group3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"v33", _view.group3) // EJsS HtmlView.HtmlView Page: declaration of element 'v33'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'v33'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'v33'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'v33'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'v33'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"wheel12", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'wheel12'
      .setProperty("FillColor","url(#mygrandient)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'wheel12'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'wheel12'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'wheel12'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"wheel1", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'wheel1'
      .setProperty("FillColor","url(#mygrandient)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'wheel1'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'wheel1'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'wheel1'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"velcro3", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'velcro3'
      .setProperty("FillColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'velcro3'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'velcro3'
      ;

    _view._addElement(EJSS_DRAWING2D.spring,"spring", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'spring'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'spring'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'spring'
      .setProperty("Loops",5) // EJsS HtmlView.HtmlView Page: setting property 'Loops' for element 'spring'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'spring'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"gravity", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'gravity'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'gravity'
      .setProperty("LineColor","rgba(0,100,0,255)") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'gravity'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'gravity'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"reaction", _view.mass1) // EJsS HtmlView.HtmlView Page: declaration of element 'reaction'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'reaction'
      .setProperty("LineColor","rgba(0,100,0,255)") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'reaction'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'reaction'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"F1", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'F1'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'F1'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'F1'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"F12", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'F12'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"mass2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'mass2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image2", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'image2'
      .setProperty("ImageUrl","./Momentum1D/cart_large.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'image2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'image2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"body122", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'body122'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'body122'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'body122'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'body122'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"body12infopoint", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'body12infopoint'
      .setProperty("FillColor","url(#mygrandient3)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'body12infopoint'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'body12infopoint'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'body12infopoint'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"m2_plusminus", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'm2_plusminus'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'm2_plusminus'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"minus_button2", _view.m2_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'minus_button2'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'minus_button2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'minus_button2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"minus2", _view.m2_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'minus2'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'minus2'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'minus2'
      .setProperty("Text","-") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'minus2'
      .setProperty("PixelSize",false) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'minus2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'minus2'
      .setProperty("Font","normal normal 50px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'minus2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"plus_button2", _view.m2_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'plus_button2'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'plus_button2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'plus_button2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"plus2", _view.m2_plusminus) // EJsS HtmlView.HtmlView Page: declaration of element 'plus2'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'plus2'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'plus2'
      .setProperty("Text","+") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'plus2'
      .setProperty("PixelSize",false) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'plus2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'plus2'
      .setProperty("Font","normal normal 50px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'plus2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"mass_2_name", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'mass_2_name'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'mass_2_name'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'mass_2_name'
      .setProperty("Text","m₂") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'mass_2_name'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"m122", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'm122'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'm122'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'm122'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"u2", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'u2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"vdrag2", _view.u2) // EJsS HtmlView.HtmlView Page: declaration of element 'vdrag2'
      .setProperty("FillColor","rgba(255,0,255,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'vdrag2'
      .setProperty("SizeX",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'vdrag2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'vdrag2'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'vdrag2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'vdrag2'
      .setProperty("SizeY",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'vdrag2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'vdrag2'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'vdrag2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"velocity2", _view.u2) // EJsS HtmlView.HtmlView Page: declaration of element 'velocity2'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'velocity2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'velocity2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'velocity2'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'velocity2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group2", _view.u2) // EJsS HtmlView.HtmlView Page: declaration of element 'group2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"v32", _view.group2) // EJsS HtmlView.HtmlView Page: declaration of element 'v32'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'v32'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'v32'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'v32'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'v32'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"v42", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'v42'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"velocity32", _view.v42) // EJsS HtmlView.HtmlView Page: declaration of element 'velocity32'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'velocity32'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'velocity32'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'velocity32'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'velocity32'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group", _view.v42) // EJsS HtmlView.HtmlView Page: declaration of element 'group'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'group'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"v332", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'v332'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'v332'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'v332'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"wheel1222", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'wheel1222'
      .setProperty("FillColor","url(#mygrandient)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'wheel1222'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'wheel1222'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'wheel1222'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"wheel122", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'wheel122'
      .setProperty("FillColor","url(#mygrandient)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'wheel122'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'wheel122'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'wheel122'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"velcro32", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'velcro32'
      .setProperty("FillColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'velcro32'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'velcro32'
      ;

    _view._addElement(EJSS_DRAWING2D.spring,"spring2", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'spring2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'spring2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'spring2'
      .setProperty("Loops",5) // EJsS HtmlView.HtmlView Page: setting property 'Loops' for element 'spring2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'spring2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"gravity2", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'gravity2'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'gravity2'
      .setProperty("LineColor","rgba(0,100,0,255)") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'gravity2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'gravity2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"reaction2", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'reaction2'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'reaction2'
      .setProperty("LineColor","rgba(0,100,0,255)") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'reaction2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'reaction2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"F13", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'F13'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'F13'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'F13'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"F122", _view.mass2) // EJsS HtmlView.HtmlView Page: declaration of element 'F122'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"bomb", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'bomb'
      .setProperty("SizeX",30) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'bomb'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'bomb'
      .setProperty("ImageUrl","./Momentum1D/bomb-26497_640.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'bomb'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'bomb'
      .setProperty("SizeY",30) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bomb'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'bomb'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"afterexplosion", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'afterexplosion'
      .setProperty("SizeX",60) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'afterexplosion'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'afterexplosion'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'afterexplosion'
      .setProperty("ImageUrl","./Momentum1D/64px-Explosion.svg.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'afterexplosion'
      .setProperty("SizeY",60) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'afterexplosion'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'afterexplosion'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanelmom", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanelmom'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanelmom'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanelmom'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanelmom'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanelmom'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanelmom'
      .setProperty("TRMessage","Values can be reposition by dragging for better reading if need") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'plottingPanelmom'
      .setProperty("XTickStep",0.5) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanelmom'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanelmom'
      .setProperty("Title","momentum versus time graph") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanelmom'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanelmom'
      .setProperty("MaximumY",10) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanelmom'
      .setProperty("MaximumX",0.5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanelmom'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanelmom'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanelmom'
      .setProperty("MinimumY",-10) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanelmom'
      .setProperty("TitleY","momentum") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanelmom'
      .setProperty("TitleX","time") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanelmom'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanelmom'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanelmom'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanelmom'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanelmom'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanelmom'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"total2", _view.plottingPanelmom) // EJsS HtmlView.HtmlView Page: declaration of element 'total2'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'total2'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'total2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"total5", _view.plottingPanelmom) // EJsS HtmlView.HtmlView Page: declaration of element 'total5'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text5", _view.total5) // EJsS HtmlView.HtmlView Page: declaration of element 'text5'
      .setProperty("RelativePosition","SOUTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text5'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'text5'
      .setProperty("Y",1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text5'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text5'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"total", _view.plottingPanelmom) // EJsS HtmlView.HtmlView Page: declaration of element 'total'
      .setProperty("FillColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'total'
      .setProperty("SizeX",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'total'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'total'
      .setProperty("SizeY",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'total'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'total'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"mvvxst", _view.plottingPanelmom) // EJsS HtmlView.HtmlView Page: declaration of element 'mvvxst'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"moving1", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'moving1'
      .setProperty("SizeX",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'moving1'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'moving1'
      .setProperty("LineColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'moving1'
      .setProperty("SizeY",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'moving1'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'moving1'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'moving1'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'moving1'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail3", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'trail3'
      .setProperty("LineColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail3'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail3'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"final", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'final'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text", _view.final) // EJsS HtmlView.HtmlView Page: declaration of element 'text'
      .setProperty("RelativePosition","SOUTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'text'
      .setProperty("Y",0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"initial", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'initial'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'initial'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text3", _view.initial) // EJsS HtmlView.HtmlView Page: declaration of element 'text3'
      .setProperty("RelativePosition","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text3'
      .setProperty("Y",0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text3'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"moving2", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'moving2'
      .setProperty("FillColor","rgba(0,0,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'moving2'
      .setProperty("SizeX",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'moving2'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'moving2'
      .setProperty("LineColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'moving2'
      .setProperty("SizeY",15) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'moving2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'moving2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'moving2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"final3", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'final3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text2", _view.final3) // EJsS HtmlView.HtmlView Page: declaration of element 'text2'
      .setProperty("RelativePosition","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'text2'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text2'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail22", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'trail22'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail22'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail22'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"initial2", _view.mvvxst) // EJsS HtmlView.HtmlView Page: declaration of element 'initial2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'initial2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text22", _view.initial2) // EJsS HtmlView.HtmlView Page: declaration of element 'text22'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text22'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text22'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text22'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanelKE", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanelKE'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanelKE'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanelKE'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanelKE'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanelKE'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanelKE'
      .setProperty("XTickStep",0.5) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanelKE'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanelKE'
      .setProperty("Title","momentum versus time graph") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanelKE'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanelKE'
      .setProperty("MaximumY",10) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanelKE'
      .setProperty("MaximumX",0.5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanelKE'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanelKE'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanelKE'
      .setProperty("MinimumY",-10) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanelKE'
      .setProperty("TitleY","K.E.") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanelKE'
      .setProperty("TitleX","time") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanelKE'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanelKE'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanelKE'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanelKE'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanelKE'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanelKE'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"kevt", _view.plottingPanelKE) // EJsS HtmlView.HtmlView Page: declaration of element 'kevt'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"moving", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'moving'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'moving'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'moving'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'moving'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'moving'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'moving'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'moving'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail32", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'trail32'
      .setProperty("LineColor","rgba(0,200,0,1.0)") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail32'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail32'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"final2", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'final2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text4", _view.final2) // EJsS HtmlView.HtmlView Page: declaration of element 'text4'
      .setProperty("RelativePosition","SOUTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text4'
      .setProperty("Y",0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text4'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text4'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"initial3", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'initial3'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'initial3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text32", _view.initial3) // EJsS HtmlView.HtmlView Page: declaration of element 'text32'
      .setProperty("RelativePosition","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text32'
      .setProperty("Y",0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text32'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text32'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"moving3", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'moving3'
      .setProperty("FillColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'moving3'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'moving3'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'moving3'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'moving3'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'moving3'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'moving3'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail222", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'trail222'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail222'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail222'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"final32", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'final32'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text23", _view.final32) // EJsS HtmlView.HtmlView Page: declaration of element 'text23'
      .setProperty("RelativePosition","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text23'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text23'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text23'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"initial22", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'initial22'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'initial22'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text222", _view.initial22) // EJsS HtmlView.HtmlView Page: declaration of element 'text222'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text222'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text222'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'text222'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"total4", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'total4'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'total4'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'total4'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"total3", _view.kevt) // EJsS HtmlView.HtmlView Page: declaration of element 'total3'
      .setProperty("FillColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'total3'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'total3'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'total3'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'total3'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'total3'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanelF", _view.panel3) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanelF'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanelF'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanelF'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanelF'
      .setProperty("EnabledZooming",true) // EJsS HtmlView.HtmlView Page: setting property 'EnabledZooming' for element 'plottingPanelF'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanelF'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanelF'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanelF'
      .setProperty("XTickStep",0.5) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanelF'
      .setProperty("YTickStep",500) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanelF'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanelF'
      .setProperty("Title","momentum versus time graph") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanelF'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanelF'
      .setProperty("MaximumY",500) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanelF'
      .setProperty("MaximumX",0.5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanelF'
      .setProperty("EnabledDragging","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanelF'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanelF'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanelF'
      .setProperty("MinimumY",-500) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanelF'
      .setProperty("TitleY","Force") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanelF'
      .setProperty("TitleX","time") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanelF'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanelF'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanelF'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanelF'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanelF'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanelF'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"fvt", _view.plottingPanelF) // EJsS HtmlView.HtmlView Page: declaration of element 'fvt'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail", _view.fvt) // EJsS HtmlView.HtmlView Page: declaration of element 'trail'
      .setProperty("LineColor","rgba(0,100,0,1.0)") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"moving4", _view.fvt) // EJsS HtmlView.HtmlView Page: declaration of element 'moving4'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'moving4'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'moving4'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'moving4'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'moving4'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'moving4'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"trail2", _view.fvt) // EJsS HtmlView.HtmlView Page: declaration of element 'trail2'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trail2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trail2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"moving42", _view.fvt) // EJsS HtmlView.HtmlView Page: declaration of element 'moving42'
      .setProperty("FillColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'moving42'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'moving42'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'moving42'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'moving42'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'moving42'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"F14", _view.fvt) // EJsS HtmlView.HtmlView Page: declaration of element 'F14'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"F142", _view.fvt) // EJsS HtmlView.HtmlView Page: declaration of element 'F142'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new Momentum1Dtype1("_topFrame","_ejs_library/",null);
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
