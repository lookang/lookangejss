function projectile_shotput_2023(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var font; // EjsS Model.Variables.Var Table.font
  var pi; // EjsS Model.Variables.Var Table.pi
  var xmin; // EjsS Model.Variables.Var Table.xmin
  var xmax; // EjsS Model.Variables.Var Table.xmax
  var ymin; // EjsS Model.Variables.Var Table.ymin
  var ymax; // EjsS Model.Variables.Var Table.ymax
  var yminplot; // EjsS Model.Variables.Var Table.yminplot
  var ymaxplot; // EjsS Model.Variables.Var Table.ymaxplot
  var rangex; // EjsS Model.Variables.Var Table.rangex
  var rangey; // EjsS Model.Variables.Var Table.rangey
  var sizex; // EjsS Model.Variables.Var Table.sizex
  var sizey; // EjsS Model.Variables.Var Table.sizey
  var scalex; // EjsS Model.Variables.Var Table.scalex
  var scaley; // EjsS Model.Variables.Var Table.scaley
  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var x; // EjsS Model.Variables.Var Table.x
  var y; // EjsS Model.Variables.Var Table.y
  var ys0; // EjsS Model.Variables.Var Table.ys0
  var vx; // EjsS Model.Variables.Var Table.vx
  var vy; // EjsS Model.Variables.Var Table.vy
  var vys0; // EjsS Model.Variables.Var Table.vys0
  var vxs; // EjsS Model.Variables.Var Table.vxs
  var vxs0; // EjsS Model.Variables.Var Table.vxs0
  var vys; // EjsS Model.Variables.Var Table.vys
  var vymax; // EjsS Model.Variables.Var Table.vymax
  var vymin; // EjsS Model.Variables.Var Table.vymin
  var v; // EjsS Model.Variables.Var Table.v
  var theta; // EjsS Model.Variables.Var Table.theta
  var thetadeg; // EjsS Model.Variables.Var Table.thetadeg
  var textv; // EjsS Model.Variables.Var Table.textv
  var texts; // EjsS Model.Variables.Var Table.texts
  var ay; // EjsS Model.Variables.Var Table.ay
  var aym; // EjsS Model.Variables.Var Table.aym
  var selected; // EjsS Model.Variables.Var Table.selected
  var textt; // EjsS Model.Variables.Var Table.textt
  var yground; // EjsS Model.Variables.Var Table.yground
  var e; // EjsS Model.Variables.Var Table.e
  var k; // EjsS Model.Variables.Var Table.k
  var memorycolory; // EjsS Model.Variables.Var Table.memorycolory
  var memorycolorv; // EjsS Model.Variables.Var Table.memorycolorv
  var memorycolora; // EjsS Model.Variables.Var Table.memorycolora

  var n; // EjsS Model.Variables.leong.n
  var xc; // EjsS Model.Variables.leong.xc
  var yc; // EjsS Model.Variables.leong.yc
  var lilyx; // EjsS Model.Variables.leong.lilyx
  var lilyy; // EjsS Model.Variables.leong.lilyy
  var lilytext; // EjsS Model.Variables.leong.lilytext
  var catchershow; // EjsS Model.Variables.leong.catchershow
  var score; // EjsS Model.Variables.leong.score
  var enabledposition; // EjsS Model.Variables.leong.enabledposition
  var faceright; // EjsS Model.Variables.leong.faceright
  var xf; // EjsS Model.Variables.leong.xf
  var xd; // EjsS Model.Variables.leong.xd
  var yd; // EjsS Model.Variables.leong.yd
  var platformshape; // EjsS Model.Variables.leong.platformshape
  var win_stage1; // EjsS Model.Variables.leong.win_stage1
  var pointer; // EjsS Model.Variables.leong.pointer
  var thetashow; // EjsS Model.Variables.leong.thetashow

  var AnswerV; // EjsS Model.Variables.lookang.AnswerV
  var escKeyPressed; // EjsS Model.Variables.lookang.escKeyPressed
  var clicked; // EjsS Model.Variables.lookang.clicked

  var numShadows; // EjsS Model.Variables.shadows.numShadows
  var xShadows; // EjsS Model.Variables.shadows.xShadows
  var yShadows; // EjsS Model.Variables.shadows.yShadows
  var vShadows; // EjsS Model.Variables.shadows.vShadows
  var aShadows; // EjsS Model.Variables.shadows.aShadows
  var tShadows; // EjsS Model.Variables.shadows.tShadows
  var shadowColor; // EjsS Model.Variables.shadows.shadowColor
  var shadowVis; // EjsS Model.Variables.shadows.shadowVis
  var counter; // EjsS Model.Variables.shadows.counter
  var prev; // EjsS Model.Variables.shadows.prev
  var xMarkVert; // EjsS Model.Variables.shadows.xMarkVert
  var yMarkVert; // EjsS Model.Variables.shadows.yMarkVert
  var xMarkHoriz; // EjsS Model.Variables.shadows.xMarkHoriz
  var yMarkHoriz; // EjsS Model.Variables.shadows.yMarkHoriz

  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var xvst; // EjsS Model.Variables.layout.xvst
  var vvst; // EjsS Model.Variables.layout.vvst
  var avst; // EjsS Model.Variables.layout.avst
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var world; // EjsS Model.Variables.layout.world
  var graph; // EjsS Model.Variables.layout.graph
  var disabled; // EjsS Model.Variables.layout.disabled
  var datashow; // EjsS Model.Variables.layout.datashow
  var datashow2; // EjsS Model.Variables.layout.datashow2

  var selectedmodel; // EjsS Model.Variables.model.selectedmodel
  var selectedmodely; // EjsS Model.Variables.model.selectedmodely
  var functionY; // EjsS Model.Variables.model.functionY
  var functionY2; // EjsS Model.Variables.model.functionY2
  var xmodel; // EjsS Model.Variables.model.xmodel
  var ymodel; // EjsS Model.Variables.model.ymodel
  var showmodel; // EjsS Model.Variables.model.showmodel

  var ng; // EjsS Model.Variables.grid.ng
  var n2; // EjsS Model.Variables.grid.n2
  var cs; // EjsS Model.Variables.grid.cs
  var c; // EjsS Model.Variables.grid.c
  var xline; // EjsS Model.Variables.grid.xline
  var yline; // EjsS Model.Variables.grid.yline
  var msg; // EjsS Model.Variables.grid.msg
  var Rs; // EjsS Model.Variables.grid.Rs
  var dxs; // EjsS Model.Variables.grid.dxs
  var ds; // EjsS Model.Variables.grid.ds
  var xline2; // EjsS Model.Variables.grid.xline2
  var yline2; // EjsS Model.Variables.grid.yline2
  var dys; // EjsS Model.Variables.grid.dys
  var D; // EjsS Model.Variables.grid.D
  var D2; // EjsS Model.Variables.grid.D2
  var red; // EjsS Model.Variables.grid.red
  var green; // EjsS Model.Variables.grid.green
  var blue; // EjsS Model.Variables.grid.blue
  var color; // EjsS Model.Variables.grid.color
  var stroke; // EjsS Model.Variables.grid.stroke
  var gridtextx; // EjsS Model.Variables.grid.gridtextx
  var gridtexty; // EjsS Model.Variables.grid.gridtexty
  var xlinetext; // EjsS Model.Variables.grid.xlinetext
  var ylinetext; // EjsS Model.Variables.grid.ylinetext
  var gridlengthy; // EjsS Model.Variables.grid.gridlengthy

  var isQuestionAnswered; // EjsS Model.Variables.moodle.isQuestionAnswered
  var isFirstTry; // EjsS Model.Variables.moodle.isFirstTry
  var stage; // EjsS Model.Variables.moodle.stage
  var once; // EjsS Model.Variables.moodle.once

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
      font : font,
      pi : pi,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      yminplot : yminplot,
      ymaxplot : ymaxplot,
      rangex : rangex,
      rangey : rangey,
      sizex : sizex,
      sizey : sizey,
      scalex : scalex,
      scaley : scaley,
      t : t,
      dt : dt,
      x : x,
      y : y,
      ys0 : ys0,
      vx : vx,
      vy : vy,
      vys0 : vys0,
      vxs : vxs,
      vxs0 : vxs0,
      vys : vys,
      vymax : vymax,
      vymin : vymin,
      v : v,
      theta : theta,
      thetadeg : thetadeg,
      textv : textv,
      texts : texts,
      ay : ay,
      aym : aym,
      selected : selected,
      textt : textt,
      yground : yground,
      e : e,
      k : k,
      memorycolory : memorycolory,
      memorycolorv : memorycolorv,
      memorycolora : memorycolora,
      n : n,
      xc : xc,
      yc : yc,
      lilyx : lilyx,
      lilyy : lilyy,
      lilytext : lilytext,
      catchershow : catchershow,
      score : score,
      enabledposition : enabledposition,
      faceright : faceright,
      xf : xf,
      xd : xd,
      yd : yd,
      platformshape : platformshape,
      win_stage1 : win_stage1,
      pointer : pointer,
      thetashow : thetashow,
      AnswerV : AnswerV,
      escKeyPressed : escKeyPressed,
      clicked : clicked,
      numShadows : numShadows,
      xShadows : xShadows,
      yShadows : yShadows,
      vShadows : vShadows,
      aShadows : aShadows,
      tShadows : tShadows,
      shadowColor : shadowColor,
      shadowVis : shadowVis,
      counter : counter,
      prev : prev,
      xMarkVert : xMarkVert,
      yMarkVert : yMarkVert,
      xMarkHoriz : xMarkHoriz,
      yMarkHoriz : yMarkHoriz,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      xvst : xvst,
      vvst : vvst,
      avst : avst,
      disabledworld : disabledworld,
      world : world,
      graph : graph,
      disabled : disabled,
      datashow : datashow,
      datashow2 : datashow2,
      selectedmodel : selectedmodel,
      selectedmodely : selectedmodely,
      functionY : functionY,
      functionY2 : functionY2,
      xmodel : xmodel,
      ymodel : ymodel,
      showmodel : showmodel,
      ng : ng,
      n2 : n2,
      cs : cs,
      c : c,
      xline : xline,
      yline : yline,
      msg : msg,
      Rs : Rs,
      dxs : dxs,
      ds : ds,
      xline2 : xline2,
      yline2 : yline2,
      dys : dys,
      D : D,
      D2 : D2,
      red : red,
      green : green,
      blue : blue,
      color : color,
      stroke : stroke,
      gridtextx : gridtextx,
      gridtexty : gridtexty,
      xlinetext : xlinetext,
      ylinetext : ylinetext,
      gridlengthy : gridlengthy,
      isQuestionAnswered : isQuestionAnswered,
      isFirstTry : isFirstTry,
      stage : stage,
      once : once
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.yminplot != "undefined") yminplot = json.yminplot;
    if(typeof json.ymaxplot != "undefined") ymaxplot = json.ymaxplot;
    if(typeof json.rangex != "undefined") rangex = json.rangex;
    if(typeof json.rangey != "undefined") rangey = json.rangey;
    if(typeof json.sizex != "undefined") sizex = json.sizex;
    if(typeof json.sizey != "undefined") sizey = json.sizey;
    if(typeof json.scalex != "undefined") scalex = json.scalex;
    if(typeof json.scaley != "undefined") scaley = json.scaley;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.ys0 != "undefined") ys0 = json.ys0;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.vys0 != "undefined") vys0 = json.vys0;
    if(typeof json.vxs != "undefined") vxs = json.vxs;
    if(typeof json.vxs0 != "undefined") vxs0 = json.vxs0;
    if(typeof json.vys != "undefined") vys = json.vys;
    if(typeof json.vymax != "undefined") vymax = json.vymax;
    if(typeof json.vymin != "undefined") vymin = json.vymin;
    if(typeof json.v != "undefined") v = json.v;
    if(typeof json.theta != "undefined") theta = json.theta;
    if(typeof json.thetadeg != "undefined") thetadeg = json.thetadeg;
    if(typeof json.textv != "undefined") textv = json.textv;
    if(typeof json.texts != "undefined") texts = json.texts;
    if(typeof json.ay != "undefined") ay = json.ay;
    if(typeof json.aym != "undefined") aym = json.aym;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.textt != "undefined") textt = json.textt;
    if(typeof json.yground != "undefined") yground = json.yground;
    if(typeof json.e != "undefined") e = json.e;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.memorycolory != "undefined") memorycolory = json.memorycolory;
    if(typeof json.memorycolorv != "undefined") memorycolorv = json.memorycolorv;
    if(typeof json.memorycolora != "undefined") memorycolora = json.memorycolora;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.xc != "undefined") xc = json.xc;
    if(typeof json.yc != "undefined") yc = json.yc;
    if(typeof json.lilyx != "undefined") lilyx = json.lilyx;
    if(typeof json.lilyy != "undefined") lilyy = json.lilyy;
    if(typeof json.lilytext != "undefined") lilytext = json.lilytext;
    if(typeof json.catchershow != "undefined") catchershow = json.catchershow;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.enabledposition != "undefined") enabledposition = json.enabledposition;
    if(typeof json.faceright != "undefined") faceright = json.faceright;
    if(typeof json.xf != "undefined") xf = json.xf;
    if(typeof json.xd != "undefined") xd = json.xd;
    if(typeof json.yd != "undefined") yd = json.yd;
    if(typeof json.platformshape != "undefined") platformshape = json.platformshape;
    if(typeof json.win_stage1 != "undefined") win_stage1 = json.win_stage1;
    if(typeof json.pointer != "undefined") pointer = json.pointer;
    if(typeof json.thetashow != "undefined") thetashow = json.thetashow;
    if(typeof json.AnswerV != "undefined") AnswerV = json.AnswerV;
    if(typeof json.escKeyPressed != "undefined") escKeyPressed = json.escKeyPressed;
    if(typeof json.clicked != "undefined") clicked = json.clicked;
    if(typeof json.numShadows != "undefined") numShadows = json.numShadows;
    if(typeof json.xShadows != "undefined") xShadows = json.xShadows;
    if(typeof json.yShadows != "undefined") yShadows = json.yShadows;
    if(typeof json.vShadows != "undefined") vShadows = json.vShadows;
    if(typeof json.aShadows != "undefined") aShadows = json.aShadows;
    if(typeof json.tShadows != "undefined") tShadows = json.tShadows;
    if(typeof json.shadowColor != "undefined") shadowColor = json.shadowColor;
    if(typeof json.shadowVis != "undefined") shadowVis = json.shadowVis;
    if(typeof json.counter != "undefined") counter = json.counter;
    if(typeof json.prev != "undefined") prev = json.prev;
    if(typeof json.xMarkVert != "undefined") xMarkVert = json.xMarkVert;
    if(typeof json.yMarkVert != "undefined") yMarkVert = json.yMarkVert;
    if(typeof json.xMarkHoriz != "undefined") xMarkHoriz = json.xMarkHoriz;
    if(typeof json.yMarkHoriz != "undefined") yMarkHoriz = json.yMarkHoriz;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.xvst != "undefined") xvst = json.xvst;
    if(typeof json.vvst != "undefined") vvst = json.vvst;
    if(typeof json.avst != "undefined") avst = json.avst;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.datashow != "undefined") datashow = json.datashow;
    if(typeof json.datashow2 != "undefined") datashow2 = json.datashow2;
    if(typeof json.selectedmodel != "undefined") selectedmodel = json.selectedmodel;
    if(typeof json.selectedmodely != "undefined") selectedmodely = json.selectedmodely;
    if(typeof json.functionY != "undefined") functionY = json.functionY;
    if(typeof json.functionY2 != "undefined") functionY2 = json.functionY2;
    if(typeof json.xmodel != "undefined") xmodel = json.xmodel;
    if(typeof json.ymodel != "undefined") ymodel = json.ymodel;
    if(typeof json.showmodel != "undefined") showmodel = json.showmodel;
    if(typeof json.ng != "undefined") ng = json.ng;
    if(typeof json.n2 != "undefined") n2 = json.n2;
    if(typeof json.cs != "undefined") cs = json.cs;
    if(typeof json.c != "undefined") c = json.c;
    if(typeof json.xline != "undefined") xline = json.xline;
    if(typeof json.yline != "undefined") yline = json.yline;
    if(typeof json.msg != "undefined") msg = json.msg;
    if(typeof json.Rs != "undefined") Rs = json.Rs;
    if(typeof json.dxs != "undefined") dxs = json.dxs;
    if(typeof json.ds != "undefined") ds = json.ds;
    if(typeof json.xline2 != "undefined") xline2 = json.xline2;
    if(typeof json.yline2 != "undefined") yline2 = json.yline2;
    if(typeof json.dys != "undefined") dys = json.dys;
    if(typeof json.D != "undefined") D = json.D;
    if(typeof json.D2 != "undefined") D2 = json.D2;
    if(typeof json.red != "undefined") red = json.red;
    if(typeof json.green != "undefined") green = json.green;
    if(typeof json.blue != "undefined") blue = json.blue;
    if(typeof json.color != "undefined") color = json.color;
    if(typeof json.stroke != "undefined") stroke = json.stroke;
    if(typeof json.gridtextx != "undefined") gridtextx = json.gridtextx;
    if(typeof json.gridtexty != "undefined") gridtexty = json.gridtexty;
    if(typeof json.xlinetext != "undefined") xlinetext = json.xlinetext;
    if(typeof json.ylinetext != "undefined") ylinetext = json.ylinetext;
    if(typeof json.gridlengthy != "undefined") gridlengthy = json.gridlengthy;
    if(typeof json.isQuestionAnswered != "undefined") isQuestionAnswered = json.isQuestionAnswered;
    if(typeof json.isFirstTry != "undefined") isFirstTry = json.isFirstTry;
    if(typeof json.stage != "undefined") stage = json.stage;
    if(typeof json.once != "undefined") once = json.once;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["stage"] = true;
    __pagesEnabled["grid"] = true;
    __pagesEnabled["message"] = true;
    __pagesEnabled["moodle"] = true;
    __pagesEnabled["update"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["shadows"] = false;
    __pagesEnabled["dragonfly"] = true;
    __pagesEnabled["Landpad0"] = false;
    __pagesEnabled["Landpad1"] = false;
    __pagesEnabled["Land pad2"] = false;
    __pagesEnabled["Land pad 3"] = false;
    __pagesEnabled["Land pad4"] = false;
    __pagesEnabled["Land pad5"] = false;
    __pagesEnabled["Fall in water"] = true;
    __pagesEnabled["FixRel Page 2"] = true;
    __pagesEnabled["frogfacing"] = true;
  });

  _model.addToReset(function() {
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    xmin = -0.4; // EjsS Model.Variables.Var Table.xmin
    xmax = 11; // EjsS Model.Variables.Var Table.xmax
    ymin = -0.5; // EjsS Model.Variables.Var Table.ymin
    ymax = 3; // EjsS Model.Variables.Var Table.ymax
    yminplot = 0; // EjsS Model.Variables.Var Table.yminplot
    ymaxplot = 10; // EjsS Model.Variables.Var Table.ymaxplot
    rangex = xmax-xmin; // EjsS Model.Variables.Var Table.rangex
    rangey = ymax-ymin; // EjsS Model.Variables.Var Table.rangey
    sizex = rangex/20; // EjsS Model.Variables.Var Table.sizex
    sizey = rangey/20; // EjsS Model.Variables.Var Table.sizey
    scalex = rangey/rangex/2; // EjsS Model.Variables.Var Table.scalex
    scaley = rangex/rangey/2; // EjsS Model.Variables.Var Table.scaley
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.01; // EjsS Model.Variables.Var Table.dt
    x = 1; // EjsS Model.Variables.Var Table.x
    y = 0.05; // EjsS Model.Variables.Var Table.y
    ys0 = y; // EjsS Model.Variables.Var Table.ys0
    vx = 2.5*2; // EjsS Model.Variables.Var Table.vx
    vy = 4.33*2; // EjsS Model.Variables.Var Table.vy
    vys0 = vy; // EjsS Model.Variables.Var Table.vys0
    vxs = vx; // EjsS Model.Variables.Var Table.vxs
    vxs0 = vx; // EjsS Model.Variables.Var Table.vxs0
    vys = vy; // EjsS Model.Variables.Var Table.vys
    vymax = 0; // EjsS Model.Variables.Var Table.vymax
    vymin = -5; // EjsS Model.Variables.Var Table.vymin
    v = Math.sqrt(vx*vx+vy*vy); // EjsS Model.Variables.Var Table.v
    theta = Math.atan2(vy,vx); // EjsS Model.Variables.Var Table.theta
    thetadeg = theta*180/pi; // EjsS Model.Variables.Var Table.thetadeg
    textv = ""; // EjsS Model.Variables.Var Table.textv
    texts = ""; // EjsS Model.Variables.Var Table.texts
    ay = -9.81; // EjsS Model.Variables.Var Table.ay
    aym = ay; // EjsS Model.Variables.Var Table.aym
    textt = "Adjust the speed |v| and/or angle ϑ then press Play to jump and land on the target."; // EjsS Model.Variables.Var Table.textt
    yground = -95; // EjsS Model.Variables.Var Table.yground
    e = 1; // EjsS Model.Variables.Var Table.e
    k = 0; // EjsS Model.Variables.Var Table.k
    memorycolory = 2; // EjsS Model.Variables.Var Table.memorycolory
    memorycolorv = 5; // EjsS Model.Variables.Var Table.memorycolorv
    memorycolora = 0; // EjsS Model.Variables.Var Table.memorycolora
  });

  _model.addToReset(function() {
    n = 6; // EjsS Model.Variables.leong.n
    xc = new Array(n); // EjsS Model.Variables.leong.xc
    yc = new Array(n); // EjsS Model.Variables.leong.yc
    lilyx = new Array(n); // EjsS Model.Variables.leong.lilyx
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.leong.lilyx
        lilyx[_i0] = 0.2;  // EjsS Model.Variables.leong.lilyx
      }
    }());
    lilyy = 0.075; // EjsS Model.Variables.leong.lilyy
    lilytext = new Array(n); // EjsS Model.Variables.leong.lilytext
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.leong.lilytext
        lilytext[_i0] = "";  // EjsS Model.Variables.leong.lilytext
      }
    }());
    catchershow = true; // EjsS Model.Variables.leong.catchershow
    score = 0; // EjsS Model.Variables.leong.score
    enabledposition = "ENABLED_ANY"; // EjsS Model.Variables.leong.enabledposition
    faceright = true; // EjsS Model.Variables.leong.faceright
    xf = 0; // EjsS Model.Variables.leong.xf
    xd = 9; // EjsS Model.Variables.leong.xd
    yd = 0; // EjsS Model.Variables.leong.yd
    platformshape = "ELLIPSE"; // EjsS Model.Variables.leong.platformshape
    win_stage1 = false; // EjsS Model.Variables.leong.win_stage1
    pointer = 0; // EjsS Model.Variables.leong.pointer
    thetashow = false; // EjsS Model.Variables.leong.thetashow
  });

  _model.addToReset(function() {
    AnswerV = [0,0]; // EjsS Model.Variables.lookang.AnswerV
    escKeyPressed = false; // EjsS Model.Variables.lookang.escKeyPressed
  });

  _model.addToReset(function() {
    numShadows = 40; // EjsS Model.Variables.shadows.numShadows
    xShadows = new Array(numShadows); // EjsS Model.Variables.shadows.xShadows
    (function () {
      var _i0;
      for (_i0=0; _i0<numShadows; _i0+=1) {  // EjsS Model.Variables.shadows.xShadows
        xShadows[_i0] = 0;  // EjsS Model.Variables.shadows.xShadows
      }
    }());
    yShadows = new Array(numShadows); // EjsS Model.Variables.shadows.yShadows
    (function () {
      var _i0;
      for (_i0=0; _i0<numShadows; _i0+=1) {  // EjsS Model.Variables.shadows.yShadows
        yShadows[_i0] = y;  // EjsS Model.Variables.shadows.yShadows
      }
    }());
    vShadows = new Array(numShadows); // EjsS Model.Variables.shadows.vShadows
    (function () {
      var _i0;
      for (_i0=0; _i0<numShadows; _i0+=1) {  // EjsS Model.Variables.shadows.vShadows
        vShadows[_i0] = vy;  // EjsS Model.Variables.shadows.vShadows
      }
    }());
    aShadows = new Array(numShadows); // EjsS Model.Variables.shadows.aShadows
    (function () {
      var _i0;
      for (_i0=0; _i0<numShadows; _i0+=1) {  // EjsS Model.Variables.shadows.aShadows
        aShadows[_i0] = ay;  // EjsS Model.Variables.shadows.aShadows
      }
    }());
    tShadows = new Array(numShadows); // EjsS Model.Variables.shadows.tShadows
    (function () {
      var _i0;
      for (_i0=0; _i0<numShadows; _i0+=1) {  // EjsS Model.Variables.shadows.tShadows
        tShadows[_i0] = t;  // EjsS Model.Variables.shadows.tShadows
      }
    }());
    shadowColor = "rgba(0,0,255,100)"; // EjsS Model.Variables.shadows.shadowColor
    shadowVis = new Array(numShadows); // EjsS Model.Variables.shadows.shadowVis
    counter = 0; // EjsS Model.Variables.shadows.counter
    prev = -0.05; // EjsS Model.Variables.shadows.prev
    xMarkVert = new Array(numShadows); // EjsS Model.Variables.shadows.xMarkVert
    yMarkVert = new Array(numShadows); // EjsS Model.Variables.shadows.yMarkVert
    xMarkHoriz = new Array(numShadows); // EjsS Model.Variables.shadows.xMarkHoriz
    yMarkHoriz = new Array(numShadows); // EjsS Model.Variables.shadows.yMarkHoriz
  });

  _model.addToReset(function() {
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width1 = "100%"; // EjsS Model.Variables.layout.Width1
    Width2 = "0%"; // EjsS Model.Variables.layout.Width2
    xvst = false; // EjsS Model.Variables.layout.xvst
    world = true; // EjsS Model.Variables.layout.world
    graph = false; // EjsS Model.Variables.layout.graph
    datashow = true; // EjsS Model.Variables.layout.datashow
    datashow2 = true; // EjsS Model.Variables.layout.datashow2
  });

  _model.addToReset(function() {
    selectedmodel = new Array(1); // EjsS Model.Variables.model.selectedmodel
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.model.selectedmodel
        selectedmodel[_i0] = "0";  // EjsS Model.Variables.model.selectedmodel
      }
    }());
    selectedmodely = new Array(1); // EjsS Model.Variables.model.selectedmodely
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.model.selectedmodely
        selectedmodely[_i0] = "0";  // EjsS Model.Variables.model.selectedmodely
      }
    }());
    functionY = "0"; // EjsS Model.Variables.model.functionY
    functionY2 = "0"; // EjsS Model.Variables.model.functionY2
    xmodel = 0; // EjsS Model.Variables.model.xmodel
    ymodel = 0; // EjsS Model.Variables.model.ymodel
    showmodel = false; // EjsS Model.Variables.model.showmodel
  });

  _model.addToReset(function() {
    ng = 10; // EjsS Model.Variables.grid.ng
    n2 = ng*10; // EjsS Model.Variables.grid.n2
    cs = new Array(ng); // EjsS Model.Variables.grid.cs
    (function () {
      var _i0;
      for (_i0=0; _i0<ng; _i0+=1) {  // EjsS Model.Variables.grid.cs
        cs[_i0] = 0;  // EjsS Model.Variables.grid.cs
      }
    }());
    c = pi*2/ng; // EjsS Model.Variables.grid.c
    xline = new Array(ng); // EjsS Model.Variables.grid.xline
    (function () {
      var _i0;
      for (_i0=0; _i0<ng; _i0+=1) {  // EjsS Model.Variables.grid.xline
        xline[_i0] = 0.0;  // EjsS Model.Variables.grid.xline
      }
    }());
    yline = new Array(ng); // EjsS Model.Variables.grid.yline
    (function () {
      var _i0;
      for (_i0=0; _i0<ng; _i0+=1) {  // EjsS Model.Variables.grid.yline
        yline[_i0] = 0.0;  // EjsS Model.Variables.grid.yline
      }
    }());
    msg = new Array(ng); // EjsS Model.Variables.grid.msg
    (function () {
      var _i0;
      for (_i0=0; _i0<ng; _i0+=1) {  // EjsS Model.Variables.grid.msg
        msg[_i0] = "";  // EjsS Model.Variables.grid.msg
      }
    }());
    Rs = xmax*0.75; // EjsS Model.Variables.grid.Rs
    dxs = new Array(n2); // EjsS Model.Variables.grid.dxs
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.dxs
        dxs[_i0] = 0.0;  // EjsS Model.Variables.grid.dxs
      }
    }());
    ds = Rs*0.045; // EjsS Model.Variables.grid.ds
    xline2 = new Array(ng); // EjsS Model.Variables.grid.xline2
    (function () {
      var _i0;
      for (_i0=0; _i0<ng; _i0+=1) {  // EjsS Model.Variables.grid.xline2
        xline2[_i0] = 0.0;  // EjsS Model.Variables.grid.xline2
      }
    }());
    yline2 = new Array(ng); // EjsS Model.Variables.grid.yline2
    (function () {
      var _i0;
      for (_i0=0; _i0<ng; _i0+=1) {  // EjsS Model.Variables.grid.yline2
        yline2[_i0] = 0.0;  // EjsS Model.Variables.grid.yline2
      }
    }());
    dys = new Array(n2); // EjsS Model.Variables.grid.dys
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.dys
        dys[_i0] = 0.0;  // EjsS Model.Variables.grid.dys
      }
    }());
    D = (xmax-xmin)*0.9; // EjsS Model.Variables.grid.D
    D2 = D/2; // EjsS Model.Variables.grid.D2
    red = 0; // EjsS Model.Variables.grid.red
    green = 0; // EjsS Model.Variables.grid.green
    blue = 0; // EjsS Model.Variables.grid.blue
    color = new Array(n2); // EjsS Model.Variables.grid.color
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.color
        color[_i0] = "rgba(200,200,200,1)";  // EjsS Model.Variables.grid.color
      }
    }());
    stroke = new Array(n2); // EjsS Model.Variables.grid.stroke
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.stroke
        stroke[_i0] = 0.4;  // EjsS Model.Variables.grid.stroke
      }
    }());
    gridtextx = new Array(n2); // EjsS Model.Variables.grid.gridtextx
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.gridtextx
        gridtextx[_i0] = "";  // EjsS Model.Variables.grid.gridtextx
      }
    }());
    gridtexty = new Array(n2); // EjsS Model.Variables.grid.gridtexty
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.gridtexty
        gridtexty[_i0] = "";  // EjsS Model.Variables.grid.gridtexty
      }
    }());
    xlinetext = new Array(n2); // EjsS Model.Variables.grid.xlinetext
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.xlinetext
        xlinetext[_i0] = 0.0;  // EjsS Model.Variables.grid.xlinetext
      }
    }());
    ylinetext = new Array(n2); // EjsS Model.Variables.grid.ylinetext
    gridlengthy = new Array(n2); // EjsS Model.Variables.grid.gridlengthy
    (function () {
      var _i0;
      for (_i0=0; _i0<n2; _i0+=1) {  // EjsS Model.Variables.grid.gridlengthy
        gridlengthy[_i0] = xmax-xmin;  // EjsS Model.Variables.grid.gridlengthy
      }
    }());
  });

  _model.addToReset(function() {
    isQuestionAnswered = false; // EjsS Model.Variables.moodle.isQuestionAnswered
    isFirstTry = true; // EjsS Model.Variables.moodle.isFirstTry
    stage = 0; // EjsS Model.Variables.moodle.stage
    once = true; // EjsS Model.Variables.moodle.once
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
    _model.setFPS(100);
    _model.setStepsPerDisplay(1);
  });

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

  function targetedcorrectanswer () {  // > CustomCode.targetedanswer:1
  if (selected.includes("0")||selected.includes("1")){  // > CustomCode.targetedanswer:2
    onAnswer(`|v|= ${v.toFixed(1)}`,true)  // > CustomCode.targetedanswer:3
    }  // > CustomCode.targetedanswer:4
   else if (selected.includes("2")||selected.includes("3")){  // > CustomCode.targetedanswer:5
    onAnswer(`ϑ= ${thetadeg.toFixed(1)}`,true)   // > CustomCode.targetedanswer:6
     }  // > CustomCode.targetedanswer:7
  else {  // > CustomCode.targetedanswer:8
    onAnswer(`|v|= ${v.toFixed(1)}, ϑ= ${thetadeg.toFixed(1)}`,true)  // > CustomCode.targetedanswer:9
    }  // > CustomCode.targetedanswer:10
  }  // > CustomCode.targetedanswer:11
  function targetedwronganswer () {  // > CustomCode.targetedanswer:12
  if (selected.includes("0")||selected.includes("1")){  // > CustomCode.targetedanswer:13
    onAnswer(`|v|= ${v.toFixed(1)}`,false)  // > CustomCode.targetedanswer:14
    }  // > CustomCode.targetedanswer:15
   else if (selected.includes("2")||selected.includes("3")){  // > CustomCode.targetedanswer:16
    onAnswer(`ϑ= ${thetadeg.toFixed(1)}`,false)   // > CustomCode.targetedanswer:17
     }  // > CustomCode.targetedanswer:18
  else {  // > CustomCode.targetedanswer:19
    onAnswer(`|v|= ${v.toFixed(1)}, ϑ= ${thetadeg.toFixed(1)}`,false)  // > CustomCode.targetedanswer:20
    }  // > CustomCode.targetedanswer:21
  }  // > CustomCode.targetedanswer:22

  document.onkeydown = function(evt) {  // > CustomCode.keyPress:1
      evt = evt || window.event;  // > CustomCode.keyPress:2
      var isEscape = false;  // > CustomCode.keyPress:3
      if ("key" in evt) {  // > CustomCode.keyPress:4
          isEscape = (evt.key === "Escape" || evt.key === "Esc");  // > CustomCode.keyPress:5
      } else {  // > CustomCode.keyPress:6
          isEscape = (evt.keyCode === 27);  // > CustomCode.keyPress:7
      }  // > CustomCode.keyPress:8
      if (isEscape) {  // > CustomCode.keyPress:9
          //alert("Escape");  // > CustomCode.keyPress:10
          escKeyPressed = true  // > CustomCode.keyPress:11
      }  // > CustomCode.keyPress:12
  };  // > CustomCode.keyPress:13

  function stageloader () {  // > CustomCode.stageloader:1
    if ( selected=="Stage 0") {  // > CustomCode.stageloader:2
      // change v, angle 60 deg  // > CustomCode.stageloader:3
      stage = 0;  // > CustomCode.stageloader:4
      //xc[0]=0; yc[0]=-0.08;  // > CustomCode.stageloader:5
      //xc[1]=2; yc[1]=-0.08;  // > CustomCode.stageloader:6
      //xc[4]=9; yc[1]=-0.08;  // > CustomCode.stageloader:7
      x=0;y=0.05;  // > CustomCode.stageloader:8
      //vx=2.5; vy=4.33;  // > CustomCode.stageloader:9
      thetadeg = 60  // > CustomCode.stageloader:10
      converttoradian (thetadeg)  // > CustomCode.stageloader:11
      faceright = true;  // > CustomCode.stageloader:12
      xf=0;  // > CustomCode.stageloader:13
      for (var i=0; i<6 ; i++) {  // > CustomCode.stageloader:14
        //xc[i] = 0.5+parseInt(Math.random()*6)/10*1+2*i;  // > CustomCode.stageloader:15
        xc[i]= 0+i*2;  // > CustomCode.stageloader:16
        yc[i] = -0.08;  // > CustomCode.stageloader:17
      }  // > CustomCode.stageloader:18
      xd=xc[5];yd=Math.round(yc[5]);  // > CustomCode.stageloader:19
    }  // > CustomCode.stageloader:20
    else if ( selected=="Stage 1") {  // > CustomCode.stageloader:21
      //random angle, change v  // > CustomCode.stageloader:22
      stage = 1;  // > CustomCode.stageloader:23
      xc[0]=0; yc[0]=-0.08;  // > CustomCode.stageloader:24
      xc[1]=2; yc[1]=-0.08;  // > CustomCode.stageloader:25
      xc[4]=9; yc[1]=-0.08;  // > CustomCode.stageloader:26
      x=0;y=0.05;  // > CustomCode.stageloader:27
      //vx=2.5; vy=4.33;  // > CustomCode.stageloader:28
      //vx = (Math.random()+1)  // > CustomCode.stageloader:29
      //vy = (Math.random()+1)  // > CustomCode.stageloader:30
      thetadeg = getRandom(15,75)  // > CustomCode.stageloader:31
      converttoradian (thetadeg)  // > CustomCode.stageloader:32
      //v = Math.sqrt(vx*vx+vy*vy)  // > CustomCode.stageloader:33
      faceright = true;  // > CustomCode.stageloader:34
      xf=0;  // > CustomCode.stageloader:35
      for (var i=2; i<4 ; i++) {  // > CustomCode.stageloader:36
        xc[i] = 0.5+parseInt(Math.random()*6)/10*1+2*i;  // > CustomCode.stageloader:37
        yc[i] = -0.1;  // > CustomCode.stageloader:38
      }  // > CustomCode.stageloader:39
      xd=xc[3];yd=Math.round(yc[3]);  // > CustomCode.stageloader:40
    }  // > CustomCode.stageloader:41
    // stage 2 settings  // > CustomCode.stageloader:42
    else if ( selected=="Stage 2") {  // > CustomCode.stageloader:43
      //fix v, change angle  // > CustomCode.stageloader:44
      stage = 2;  // > CustomCode.stageloader:45
      xc[0]=0; yc[0]=-0.08;  // > CustomCode.stageloader:46
      xc[1]=2; yc[1]=-0.08;  // > CustomCode.stageloader:47
      xc[4]=9; yc[1]=-0.08;  // > CustomCode.stageloader:48
      x=0;y=0.05;;  // > CustomCode.stageloader:49
      //vx=2.5; vy=4.33;  // > CustomCode.stageloader:50
      faceright = true;  // > CustomCode.stageloader:51
      xf=0;  // > CustomCode.stageloader:52
      for (var i=2; i<=5 ; i++) {  // > CustomCode.stageloader:53
        xc[i] = 0.5+parseInt(Math.random()*6)/10*1+2*i;  // > CustomCode.stageloader:54
        yc[i] = -0.08;  // > CustomCode.stageloader:55
      }  // > CustomCode.stageloader:56
      //xd=getRandom(1, 10);  // > CustomCode.stageloader:57
      yd=yc[4];  // > CustomCode.stageloader:58
      xd = 10;  // > CustomCode.stageloader:59
    }  // > CustomCode.stageloader:60
    // stage 3 settings  // > CustomCode.stageloader:61
    else if ( selected=="Stage 3") {  // > CustomCode.stageloader:62
      stage = 3;  // > CustomCode.stageloader:63
      x =0;  // > CustomCode.stageloader:64
      y=0.05;  // > CustomCode.stageloader:65
      //  vx=2.5;  // > CustomCode.stageloader:66
      //vy=4.33;  // > CustomCode.stageloader:67
      faceright = true;  // > CustomCode.stageloader:68
      xc[0]=0;  // > CustomCode.stageloader:69
      yc[0]=-0.08;  // > CustomCode.stageloader:70
      // platformshape="RECTANGLE"; why not working?  // > CustomCode.stageloader:71
      for (var i=1; i<=n /* Iterations */ ; i++) {  // > CustomCode.stageloader:72
        lilytext[i]= ""+i;  // > CustomCode.stageloader:73
        xc[i] = 0.2+parseInt(Math.random()*5)/10*1+2*i;  // > CustomCode.stageloader:74
        yc[i] = 0  // > CustomCode.stageloader:75
      } ;  // > CustomCode.stageloader:76
      xc[5]=xc[4]-1;  // > CustomCode.stageloader:77
      xd=getRandom(1, 10)  // > CustomCode.stageloader:78
      yd=yc[5];  // > CustomCode.stageloader:79
    }  // > CustomCode.stageloader:80
    // stage 4 settings  // > CustomCode.stageloader:81
    else if ( selected=="Stage 4") {  // > CustomCode.stageloader:82
      stage = 4;  // > CustomCode.stageloader:83
      // x =0;  // > CustomCode.stageloader:84
      // y =2.05;  // > CustomCode.stageloader:85
      // ys0=2;  // > CustomCode.stageloader:86
      // vx=2.5;  // > CustomCode.stageloader:87
      //  vxs0=4;  // > CustomCode.stageloader:88
      //vys0=0;  // > CustomCode.stageloader:89
      //vy=0;  // > CustomCode.stageloader:90
      x=0;y=0.05;  // > CustomCode.stageloader:91
      faceright = true;  // > CustomCode.stageloader:92
      xc[0]=0;  // > CustomCode.stageloader:93
      yc[0]=0;  // > CustomCode.stageloader:94
      for (var i=1; i<=n /* Iterations */ ; i++) {  // > CustomCode.stageloader:95
        lilytext[i]= ""+i;  // > CustomCode.stageloader:96
        xc[i] = 0.2+parseInt(Math.random()*5)/10*1+2*i;  // > CustomCode.stageloader:97
        yc[i] = parseInt(Math.random()*4-2)/10+i/2;  // > CustomCode.stageloader:98
      } ;  // > CustomCode.stageloader:99
      //xc[5]=xc[4]-1;  // > CustomCode.stageloader:100
      xd=getRandom(1, 10)  // > CustomCode.stageloader:101
      yd=getRandom(1, 2)  // > CustomCode.stageloader:102
    }  // > CustomCode.stageloader:103
  }  // > CustomCode.stageloader:104

  function projectileMotionGivenv(xo, yo, x, y, v) {  // > CustomCode.projectileMotionGivenv:1
    // Constants  // > CustomCode.projectileMotionGivenv:2
    var g = 9.81; // Acceleration due to gravity (m/s^2)  // > CustomCode.projectileMotionGivenv:3
    // Calculate horizontal distance  // > CustomCode.projectileMotionGivenv:4
    var d = x - xo;  // > CustomCode.projectileMotionGivenv:5
    // Calculate vertical distance  // > CustomCode.projectileMotionGivenv:6
    var h = y - yo;  // > CustomCode.projectileMotionGivenv:7
    // Calculate launch angle  // > CustomCode.projectileMotionGivenv:8
    var radian = Math.atan((v * v + Math.sqrt(v * v * v * v - g * (g * d * d + 2 * h * v * v))) / (g * d));  // > CustomCode.projectileMotionGivenv:9
    // Calculate time of flight  // > CustomCode.projectileMotionGivenv:10
    var timeOfFlight = d / (v * Math.cos(radian));  // > CustomCode.projectileMotionGivenv:11
    // Return launch angle in degree and time of flight  // > CustomCode.projectileMotionGivenv:12
    return { degree: radian*180/Math.PI, timeOfFlight: timeOfFlight };  // > CustomCode.projectileMotionGivenv:13
  }  // > CustomCode.projectileMotionGivenv:14

  function projectileMotionGivenAngle(xo, yo, x, y, radian) {  // > CustomCode.projectileMotionGivenAngle:1
    // Constants  // > CustomCode.projectileMotionGivenAngle:2
    const g = 9.81; // Acceleration due to gravity (m/s^2)  // > CustomCode.projectileMotionGivenAngle:3
    // Calculate horizontal distance  // > CustomCode.projectileMotionGivenAngle:4
    const dx = x - xo;  // > CustomCode.projectileMotionGivenAngle:5
    // Calculate vertical distance  // > CustomCode.projectileMotionGivenAngle:6
    const dy = y - yo;  // > CustomCode.projectileMotionGivenAngle:7
    // Calculate initial velocity  // > CustomCode.projectileMotionGivenAngle:8
    const v = Math.sqrt((g * dx * dx) / (2 * Math.cos(radian) * Math.cos(radian) * (dx * Math.tan(radian) - dy)));  // > CustomCode.projectileMotionGivenAngle:9
    // Calculate time of flight  // > CustomCode.projectileMotionGivenAngle:10
    const timeOfFlight = dx / (v * Math.cos(radian));  // > CustomCode.projectileMotionGivenAngle:11
    // Return initial velocity and time of flight  // > CustomCode.projectileMotionGivenAngle:12
    return { v: v, timeOfFlight: timeOfFlight };  // > CustomCode.projectileMotionGivenAngle:13
  }  // > CustomCode.projectileMotionGivenAngle:14

  //https://www.freecodecamp.org/news/generate-random-number-within-a-range-in-javascript/  // > CustomCode.getRandom:1
  function getRandom(min, max) {  // > CustomCode.getRandom:2
    const floatRandom = Math.random()  // > CustomCode.getRandom:3
    const difference = max - min  // > CustomCode.getRandom:4
    // random between 0 and the difference  // > CustomCode.getRandom:5
    const random = Math.round(difference * floatRandom)  // > CustomCode.getRandom:6
    const randomWithinRange = random + min  // > CustomCode.getRandom:7
    return randomWithinRange  // > CustomCode.getRandom:8
  }  // > CustomCode.getRandom:9

  function converttoradian (thetadeg) {  // > CustomCode.converttodegree:1
  theta=thetadeg*pi/180;  // > CustomCode.converttodegree:2
  vx=v*Math.cos(theta);  // > CustomCode.converttodegree:3
  vy=v*Math.sin(theta);  // > CustomCode.converttodegree:4
  }  // > CustomCode.converttodegree:5

  // Assume ECMAScript 6; Chrome >=49, Edge >=14, Firefox >=41, Opera >=36, Safari >=8  // > CustomCode.Library:1
  const debugMode = true;  // > CustomCode.Library:2
  const _questionLib = {};  // > CustomCode.Library:3
  _questionLib.stack = [];  // > CustomCode.Library:4
  _questionLib.history = Object.create(null);  // > CustomCode.Library:5
  _questionLib.questionMarksAwarded = Object.create(null);  // > CustomCode.Library:6
  const _nullFunction = debugMode ?  // > CustomCode.Library:7
    console.log  // > CustomCode.Library:8
    :  // > CustomCode.Library:9
    function(){};  // > CustomCode.Library:10
  function _debugPrint(msg) {  // > CustomCode.Library:11
    if (debugMode) {  // > CustomCode.Library:12
      console.log(msg);  // > CustomCode.Library:13
    }  // > CustomCode.Library:14
  }  // > CustomCode.Library:15
  function _getCurrentQuestion() {  // > CustomCode.Library:16
    if (!isQuestionStarted()) {  // > CustomCode.Library:17
      return null;  // > CustomCode.Library:18
    }  // > CustomCode.Library:19
    return _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.Library:20
  }  // > CustomCode.Library:21
  function isQuestionStarted() {  // > CustomCode.Library:22
    return _questionLib.stack.length > 0;  // > CustomCode.Library:23
  }  // > CustomCode.Library:24
  // for assessment.json event - start  // > CustomCode.Library:25
  function startQuestion(questionName) {  // > CustomCode.Library:26
    _view._addInteraction(_nullFunction, {action:"questionStart", name:questionName}, {element:"questionLib", property:"value"});  // > CustomCode.Library:27
    _debugPrint("Start question: " + questionName);  // > CustomCode.Library:28
      // > CustomCode.Library:29
    _questionLib.stack.push(questionName);  // > CustomCode.Library:30
  }  // > CustomCode.Library:31
  // for assessment.json history  // > CustomCode.Library:32
  function addQuestionHistory(history, questionName=null) {  // > CustomCode.Library:33
    if (questionName === null && isQuestionStarted()) {  // > CustomCode.Library:34
      questionName = _getCurrentQuestion();  // > CustomCode.Library:35
    }  // > CustomCode.Library:36
      // > CustomCode.Library:37
    if (!(questionName in _questionLib.history)) {  // > CustomCode.Library:38
      _debugPrint("Create question history for " + questionName);  // > CustomCode.Library:39
        // > CustomCode.Library:40
      _questionLib.history[questionName] = [];  // > CustomCode.Library:41
    }  // > CustomCode.Library:42
    if (debugMode) {  // > CustomCode.Library:43
      console.log("Push \"" + history + "\" to question history for " + questionName);  // > CustomCode.Library:44
    }  // > CustomCode.Library:45
    _questionLib.history[questionName].push(history);  // > CustomCode.Library:46
    _flushQuestionHistory(questionName);  // > CustomCode.Library:47
  }  // > CustomCode.Library:48
  function _flushQuestionHistory(questionName) {  // > CustomCode.Library:49
    // TODO: check if need to flush  // > CustomCode.Library:50
    if (questionName === _getCurrentQuestion()) {  // > CustomCode.Library:51
      const outputHistory = _getQuestionHistory(questionName);  // > CustomCode.Library:52
      _view._addInteraction(_nullFunction, outputHistory, {property: "historyFor" + questionName, element: "questionLib"});  // > CustomCode.Library:53
    }  // > CustomCode.Library:54
  }  // > CustomCode.Library:55
  function _getQuestionHistory(questionName) {  // > CustomCode.Library:56
    if (questionName in _questionLib.history) {  // > CustomCode.Library:57
      return _questionLib.history[questionName].join("\n");  // > CustomCode.Library:58
    } else {  // > CustomCode.Library:59
      _debugPrint("No question \"" + questionName + "\" exists");  // > CustomCode.Library:60
      return "";  // > CustomCode.Library:61
    }  // > CustomCode.Library:62
  }  // > CustomCode.Library:63
  // for assessment.json event - states  // > CustomCode.Library:64
  function onAnswer(answer, isCorrect=false, history=answer, questionName=null) {  // > CustomCode.Library:65
    if (questionName === null && isQuestionStarted()) {  // > CustomCode.Library:66
      questionName = _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.Library:67
    }  // > CustomCode.Library:68
    if (questionName !== null) {  // > CustomCode.Library:69
      const explainer = Object.create(null);  // > CustomCode.Library:70
      explainer[true] = " ✅";  // > CustomCode.Library:71
      explainer[false] = " ❌";  // > CustomCode.Library:72
      addQuestionHistory(history + explainer[isCorrect], questionName);  // > CustomCode.Library:73
      if (questionName === _getCurrentQuestion()) {  // > CustomCode.Library:74
        _view._addInteraction(_nullFunction, {name:questionName, answer:answer, isCorrect:isCorrect, action:"questionAnswer"}, {property: "answer", element:"questionLib"});  // > CustomCode.Library:75
      }  // > CustomCode.Library:76
    }  // > CustomCode.Library:77
  }  // > CustomCode.Library:78
  // for assessment.json event - end  // > CustomCode.Library:79
  function endQuestion() {  // > CustomCode.Library:80
    if (_questionLib.stack.length > 0) {  // > CustomCode.Library:81
      const questionName = _questionLib.stack.pop();  // > CustomCode.Library:82
      _debugPrint("End question: " + questionName);  // > CustomCode.Library:83
      _view._addInteraction(_nullFunction, {action:"questionEnd", name:questionName}, {element: "questionLib", property: "value"});  // > CustomCode.Library:84
    }  // > CustomCode.Library:85
  }  // > CustomCode.Library:86
  // for assessment.json marks  // > CustomCode.Library:87
  function awardQuestionMarks(marks=1) {  // > CustomCode.Library:88
    if (isQuestionStarted()) {  // > CustomCode.Library:89
      const questionName = _getCurrentQuestion();  // > CustomCode.Library:90
      _questionLib.questionMarksAwarded[questionName] = 1;  // > CustomCode.Library:91
        // > CustomCode.Library:92
      for (; _questionLib.questionMarksAwarded[questionName] < marks + 1; _questionLib.questionMarksAwarded[questionName]++) {  // > CustomCode.Library:93
        _view._addInteraction(_nullFunction, _questionLib.questionMarksAwarded[questionName], {element:"questionLib", property:"awardMarkFor"+questionName});  // > CustomCode.Library:94
      }  // > CustomCode.Library:95
    }  // > CustomCode.Library:96
  }  // > CustomCode.Library:97
  function resetQuestionMarks(questionName) {  // > CustomCode.Library:98
    _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.Library:99
  }  // > CustomCode.Library:100
  function questionInstantMark(questionName, message) {  // > CustomCode.Library:101
    startQuestion(questionName);  // > CustomCode.Library:102
    _debugPrint("" + message);  // > CustomCode.Library:103
    if (message) {  // > CustomCode.Library:104
      addQuestionHistory(message);  // > CustomCode.Library:105
    } else {  // > CustomCode.Library:106
      _flushQuestionHistory(questionName);  // > CustomCode.Library:107
    }  // > CustomCode.Library:108
    awardQuestionMarks();  // > CustomCode.Library:109
    endQuestion();  // > CustomCode.Library:110
  }  // > CustomCode.Library:111
  function questionAppendHistory(questionName, message) {  // > CustomCode.Library:112
    if (!(questionName in _questionLib.questionMarksAwarded)) {  // > CustomCode.Library:113
      _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.Library:114
    }  // > CustomCode.Library:115
    let shouldPushQuestion = _getCurrentQuestion() !== questionName;  // > CustomCode.Library:116
    if (shouldPushQuestion) {  // > CustomCode.Library:117
      startQuestion(questionName);  // > CustomCode.Library:118
    }  // > CustomCode.Library:119
    awardQuestionMarks(_questionLib.questionMarksAwarded[questionName])  // > CustomCode.Library:120
    addQuestionHistory(message);  // > CustomCode.Library:121
    if (shouldPushQuestion) {  // > CustomCode.Library:122
      endQuestion();  // > CustomCode.Library:123
    }  // > CustomCode.Library:124
  }  // > CustomCode.Library:125
  function resetQuestionHistory(questionName) {  // > CustomCode.Library:126
    _questionLib.history[questionName] = [];  // > CustomCode.Library:127
  }  // > CustomCode.Library:128
  function resetQuestion(questionName) {  // > CustomCode.Library:129
    resetQuestionHistory(questionName);  // > CustomCode.Library:130
    resetQuestionMarks(questionName);  // > CustomCode.Library:131
  }  // > CustomCode.Library:132

  function sleep(milliseconds) {  // > CustomCode.sleep:1
    const date = Date.now();  // > CustomCode.sleep:2
    let currentDate = null;  // > CustomCode.sleep:3
    do {  // > CustomCode.sleep:4
      currentDate = Date.now();  // > CustomCode.sleep:5
    } while (currentDate - date < milliseconds);  // > CustomCode.sleep:6
  }  // > CustomCode.sleep:7

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (selected == undefined) {  // > Initialization.undefined:1
      selected="Stage 0"  // > Initialization.undefined:2
    }  // > Initialization.undefined:3
    stageloader ()  // > Initialization.undefined:4
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["stage"]) return;
    t=0; //initialize();  // > Initialization.stage:1
        // > Initialization.stage:2
      //lilytext for debugging  // > Initialization.stage:3
    for (var i=0; i<n ; i++) {  // > Initialization.stage:4
      lilytext[i]= ""+i;  // > Initialization.stage:5
    }  // > Initialization.stage:6
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["grid"]) return;
    for(var i=0;i<=(n2);i++){  // > Initialization.grid:1
     xline2[i]=0+i*0.1;  // > Initialization.grid:2
     yline2[i]=0+i*0.1;  // > Initialization.grid:3
     if(i%10===0){  // > Initialization.grid:4
        // > Initialization.grid:5
       color[i]= "rgba(180,180,180)"; //gray  // > Initialization.grid:6
      stroke[i]=0.8; //thick  // > Initialization.grid:7
      gridtextx[i] = ""+_view._format(i/10,"0.0");  // > Initialization.grid:8
       gridtexty[i] = ""+_view._format((i+10)/10,"0.0");  // > Initialization.grid:9
      xlinetext[i] = xline2[i];  // > Initialization.grid:10
      ylinetext[i] = xline2[i]+1;  // > Initialization.grid:11
     // gridlengthy[i]=(xmax-xmin);  // > Initialization.grid:12
       // > Initialization.grid:13
        // > Initialization.grid:14
     }  // > Initialization.grid:15
    }  // > Initialization.grid:16
    //"Debugging"+" x = "+_view._format(x,"0.00")+ " m "+" y = "+_view._format(y,"0.00")+ " m " +" vx = "+_view._format(vx,"0.00")+ " m/s " +" vy = "+_view._format(vy,"0.00")+ " m/s " + " t = "+_view._format(t,"0.00")+ " s "+" vxs = "+_view._format(vxs,"0.00")+ " m/s"+" vys = "+_view._format(vys,"0.00")+ " m/s"+" thetadeg = "+_view._format(thetadeg,"0.00")+ " o "+" faceright = "+faceright+"\nxc="+xc+"\nyc="+yc  // > Initialization.grid:17
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["message"]) return;
    if (_isMobile){  // > Initialization.message:1
      //do nothing  // > Initialization.message:2
      }  // > Initialization.message:3
        // > Initialization.message:4
      else{  // > Initialization.message:5
        // copy this into the initialization  // > Initialization.message:6
    // make the font bigger  // > Initialization.message:7
    _view.plottingPanel.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.message:8
    _view.plottingPanel.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.message:9
    _view.plottingPanel.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.message:10
    _view.plottingPanel.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.message:11
        }  // > Initialization.message:12
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["moodle"]) return;
    startQuestion(`Q${0}`);  // > Initialization.moodle:1
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["update"]) return;
    /*  // > Initialization.update:1
    if (!clicked){  // > Initialization.update:2
      _tools.showOkDialog("Loading....click 'OK' to continue",  // > Initialization.update:3
        function(){   // > Initialization.update:4
        clicked=true;    // > Initialization.update:5
        //_update()  // > Initialization.update:6
        _reset(); // to force update view  // > Initialization.update:7
        //clicked=true;  // > Initialization.update:8
        });  // > Initialization.update:9
        }  // > Initialization.update:10
    */  // > Initialization.update:11
    if (!clicked){  // > Initialization.update:12
      window.setTimeout(_reset,500)  // > Initialization.update:13
      clicked=true;  // > Initialization.update:14
    }  // > Initialization.update:15
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
    if (!__pagesEnabled["FixRel Page 2"]) return;
    //calculate  // > FixedRelations.FixRel Page 2:1
     //console.log(projectileMotionGivenAngle(x, y, xd, yd, thetadeg*Math.PI/180))  // > FixedRelations.FixRel Page 2:2
     //console.log(projectileMotionGivenv(x, y, xd, yd, v))  // > FixedRelations.FixRel Page 2:3
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["frogfacing"]) return;
    if ((thetadeg<=90)){  // > FixedRelations.frogfacing:1
      faceright = true;  // > FixedRelations.frogfacing:2
    }  else {  // > FixedRelations.frogfacing:3
     faceright = false;  // > FixedRelations.frogfacing:4
      }  // > FixedRelations.frogfacing:5
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
    var _ODE_evolution1_Event6;
    var _ODE_evolution1_Event7;
    var _ODE_evolution1_Event8;
    var _ODE_evolution1_Event9;
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["y","vy","x","t"]};

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
      if (__pagesEnabled["shadows"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      if (__pagesEnabled["dragonfly"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
      if (__pagesEnabled["Landpad0"]) __eventSolver.addEvent(_ODE_evolution1_Event3());
      if (__pagesEnabled["Landpad1"]) __eventSolver.addEvent(_ODE_evolution1_Event4());
      if (__pagesEnabled["Land pad2"]) __eventSolver.addEvent(_ODE_evolution1_Event5());
      if (__pagesEnabled["Land pad 3"]) __eventSolver.addEvent(_ODE_evolution1_Event6());
      if (__pagesEnabled["Land pad4"]) __eventSolver.addEvent(_ODE_evolution1_Event7());
      if (__pagesEnabled["Land pad5"]) __eventSolver.addEvent(_ODE_evolution1_Event8());
      if (__pagesEnabled["Fall in water"]) __eventSolver.addEvent(_ODE_evolution1_Event9());
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
        if (__state[__cIn]!=y) __mustReinitialize = true;
        __state[__cIn++] = y;
        if (__state[__cIn]!=vy) __mustReinitialize = true;
        __state[__cIn++] = vy;
        if (__state[__cIn]!=x) __mustReinitialize = true;
        __state[__cIn++] = x;
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
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
      // Check for error
      if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      return __stepTaken;
    }

    __odeSelf.getState = function() { return __state; };

    __odeSelf.getRate = function(_aState,_aRate) {
      _aRate[_aRate.length-1] = 0.0; // In case the prelim code returns
      var __index=-1; // so that it can be used in preliminary code
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Preliminary code: Code to be executed before rate equations are evaluated
        // aym yield -7.4 instead of -9.81, disabled  // > Preliminary code for ODE.Evol Page:1
        vys = vy;  // > Preliminary code for ODE.Evol Page:2
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = vy; // Rate for ODE: Evol Page:y
        _aRate[__cRate++] = ay; // Rate for ODE: Evol Page:vy
        _aRate[__cRate++] = vx; // Rate for ODE: Evol Page:x
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
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
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
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        return counter+1 -t;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        // draw shadow every 1 second  // > Event action for page Evol Page:1
           // > Event action for page Evol Page:2
        //if (Math.ceil(t) > prev &&t>(0)) {  // > Event action for page Evol Page:3
          shadowVis[counter] = true;  // > Event action for page Evol Page:4
          xShadows[counter] = x;  // > Event action for page Evol Page:5
          yShadows[counter] = y;  // > Event action for page Evol Page:6
          tShadows[counter]=t;  // > Event action for page Evol Page:7
          vShadows[counter]=vy;  // > Event action for page Evol Page:8
            // > Event action for page Evol Page:9
              aShadows[counter]=ay-k*vy;  // > Event action for page Evol Page:10
           // > Event action for page Evol Page:11
         // xMarkVert[counter] = x;  // > Event action for page Evol Page:12
         // yMarkVert[counter] = y - 0.15;  // > Event action for page Evol Page:13
         // xMarkHoriz[counter] = x - 0.15;  // > Event action for page Evol Page:14
        //  yMarkHoriz[counter] = y;  // > Event action for page Evol Page:15
            // > Event action for page Evol Page:16
         //prev = Math.ceil(t);  // > Event action for page Evol Page:17
          counter++;  // > Event action for page Evol Page:18
        //}  // > Event action for page Evol Page:19
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event2 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 1000; };

      _eventSelf.getTolerance = function() { return 1.0e-8; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        //return Math.sqrt((x-xc[5]-0.08)*(x-xc[5]-0.08)+(yc[5]-y)*(yc[5]-y))-0.08;  // > Event zero-condition for page Evol Page:1
        //return Math.sqrt((x-xc[1]-0.08)*(x-xc[1]-0.08)+(yc[1]-y)*(yc[1]-y))-0.08;  // > Event zero-condition for page Evol Page:2
        var dx = x - xd;  // > Event zero-condition for page Evol Page:3
        var dy = y - yd;  // > Event zero-condition for page Evol Page:4
        var distance = Math.sqrt(dx * dx + dy * dy);  // > Event zero-condition for page Evol Page:5
        //return Math.sqrt((x-xc[0]-0.08)*(x-xc[0]-0.08)+(yc[0]-y)*(yc[0]-y))-0.08;  // > Event zero-condition for page Evol Page:6
        var spacing = 0.1; // tolerance for collision  // > Event zero-condition for page Evol Page:7
        return distance -spacing;  // > Event zero-condition for page Evol Page:8
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        _view.audio.play();  // > Event action for page Evol Page:2
        textt =" Hit the target! Stage completed. please choose another Stage.";  // > Event action for page Evol Page:3
        // catchershow=false;  // > Event action for page Evol Page:4
        alert(textt);  // > Event action for page Evol Page:5
        theta=thetadeg*pi/180; //use user slider to set values  // > Event action for page Evol Page:6
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:7
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:8
        x=xd;  // > Event action for page Evol Page:9
        y=yd+0.1;  // > Event action for page Evol Page:10
        //t=0;  // > Event action for page Evol Page:11
        if (isFirstTry) {  // > Event action for page Evol Page:12
              awardQuestionMarks(2);  // > Event action for page Evol Page:13
              score = score+2  // > Event action for page Evol Page:14
              targetedcorrectanswer ()  // > Event action for page Evol Page:15
              //onAnswer(`|v|= ${v.toFixed(1)}, ϑ= ${thetadeg.toFixed(1)}`,true)  // > Event action for page Evol Page:16
            once=true // set back to true to prepare for next q  // > Event action for page Evol Page:17
            } else {  // > Event action for page Evol Page:18
              awardQuestionMarks(1);  // > Event action for page Evol Page:19
              score = score+1  // > Event action for page Evol Page:20
              targetedcorrectanswer ()  // > Event action for page Evol Page:21
              //onAnswer(`|v|= ${v.toFixed(1)}, ϑ= ${thetadeg.toFixed(1)}`,true)  // > Event action for page Evol Page:22
               isFirstTry =true // set back to true for next question  // > Event action for page Evol Page:23
            once=true // set back to true to prepare for next q  // > Event action for page Evol Page:24
            }  // > Event action for page Evol Page:25
            endQuestion(); // stamp the end of Question  // > Event action for page Evol Page:26
            isQuestionAnswered = true;  // > Event action for page Evol Page:27
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event3 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 1000; };

      _eventSelf.getTolerance = function() { return 1.0e-8; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        var dx = x - xc[0];  // > Event zero-condition for page Evol Page:1
        var dy = y - yc[0];  // > Event zero-condition for page Evol Page:2
        var distance = Math.sqrt(dx * dx + dy * dy);  // > Event zero-condition for page Evol Page:3
        //return Math.sqrt((x-xc[0]-0.08)*(x-xc[0]-0.08)+(yc[0]-y)*(yc[0]-y))-0.08;  // > Event zero-condition for page Evol Page:4
        var spacing = 0.1; // tolerance for collision  // > Event zero-condition for page Evol Page:5
        return distance -spacing;  // > Event zero-condition for page Evol Page:6
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        _view.audio.play();  // > Event action for page Evol Page:2
        textt =" Landed!!!";  // > Event action for page Evol Page:3
        //vx=vxs0; // return velocity to point in old direction  // > Event action for page Evol Page:4
        //vy=vys0;  // > Event action for page Evol Page:5
        //v= Math.sqrt(vx*vx+vy*vy);   // > Event action for page Evol Page:6
        //theta=Math.atan2(vy,vx); //calculate  // > Event action for page Evol Page:7
        theta=thetadeg*pi/180;  // > Event action for page Evol Page:8
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:9
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:10
        x=xc[0]; // centre frog  // > Event action for page Evol Page:11
        var higher = 0.1;  // > Event action for page Evol Page:12
        y=yc[0]+higher; // position frog higher  // > Event action for page Evol Page:13
        //t=0; //no need?  // > Event action for page Evol Page:14
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event4 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 1000; };

      _eventSelf.getTolerance = function() { return 1.0e-8; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        //return Math.sqrt((x-xc[1]-0.08)*(x-xc[1]-0.08)+(yc[1]-y)*(yc[1]-y))-0.08;  // > Event zero-condition for page Evol Page:1
        var dx = x - xc[1];  // > Event zero-condition for page Evol Page:2
        var dy = y - yc[1];  // > Event zero-condition for page Evol Page:3
        var distance = Math.sqrt(dx * dx + dy * dy);  // > Event zero-condition for page Evol Page:4
        //return Math.sqrt((x-xc[0]-0.08)*(x-xc[0]-0.08)+(yc[0]-y)*(yc[0]-y))-0.08;  // > Event zero-condition for page Evol Page:5
        var spacing = 0.1; // tolerance for collision  // > Event zero-condition for page Evol Page:6
        return distance -spacing;  // > Event zero-condition for page Evol Page:7
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        _view.audio.play();  // > Event action for page Evol Page:2
        textt =" Landed!!!";  // > Event action for page Evol Page:3
        //vx=vxs0;  // > Event action for page Evol Page:4
        //vy=vys0;  // > Event action for page Evol Page:5
        //v= Math.sqrt(vx*vx+vy*vy);   // > Event action for page Evol Page:6
        //theta=Math.atan2(vy,vx);  // > Event action for page Evol Page:7
        theta=thetadeg*pi/180; //use user slider to set values  // > Event action for page Evol Page:8
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:9
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:10
        x=xc[1];  // > Event action for page Evol Page:11
        var higher = 0.1;  // > Event action for page Evol Page:12
        y=yc[1]+higher;  // > Event action for page Evol Page:13
        //t=0;  // > Event action for page Evol Page:14
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event5 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 1000; };

      _eventSelf.getTolerance = function() { return 1.0e-8; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        //return Math.sqrt((x-xc[2]-0.08)*(x-xc[2]-0.08)+(yc[2]-y)*(yc[2]-y))-0.08;  // > Event zero-condition for page Evol Page:1
        //return Math.sqrt((x-xc[1]-0.08)*(x-xc[1]-0.08)+(yc[1]-y)*(yc[1]-y))-0.08;  // > Event zero-condition for page Evol Page:2
        var dx = x - xc[2];  // > Event zero-condition for page Evol Page:3
        var dy = y - yc[2];  // > Event zero-condition for page Evol Page:4
        var distance = Math.sqrt(dx * dx + dy * dy);  // > Event zero-condition for page Evol Page:5
        //return Math.sqrt((x-xc[0]-0.08)*(x-xc[0]-0.08)+(yc[0]-y)*(yc[0]-y))-0.08;  // > Event zero-condition for page Evol Page:6
        var spacing = 0.1; // tolerance for collision  // > Event zero-condition for page Evol Page:7
        return distance -spacing;  // > Event zero-condition for page Evol Page:8
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        _view.audio.play();  // > Event action for page Evol Page:2
        textt =" Landed!!!";  // > Event action for page Evol Page:3
        // catchershow=false;  // > Event action for page Evol Page:4
        theta=thetadeg*pi/180; //use user slider to set values  // > Event action for page Evol Page:5
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:6
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:7
        x=xc[2];  // > Event action for page Evol Page:8
        y=yc[2]+0.1;  // > Event action for page Evol Page:9
        //t=0;  // > Event action for page Evol Page:10
         score=score+1;  // > Event action for page Evol Page:11
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event6 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 1000; };

      _eventSelf.getTolerance = function() { return 1.0e-8; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        //return Math.sqrt((x-xc[3]-0.08)*(x-xc[3]-0.08)+(yc[3]-y)*(yc[3]-y))-0.08;  // > Event zero-condition for page Evol Page:1
        //return Math.sqrt((x-xc[1]-0.08)*(x-xc[1]-0.08)+(yc[1]-y)*(yc[1]-y))-0.08;  // > Event zero-condition for page Evol Page:2
        var dx = x - xc[3];  // > Event zero-condition for page Evol Page:3
        var dy = y - yc[3];  // > Event zero-condition for page Evol Page:4
        var distance = Math.sqrt(dx * dx + dy * dy);  // > Event zero-condition for page Evol Page:5
        //return Math.sqrt((x-xc[0]-0.08)*(x-xc[0]-0.08)+(yc[0]-y)*(yc[0]-y))-0.08;  // > Event zero-condition for page Evol Page:6
        var spacing = 0.1; // tolerance for collision  // > Event zero-condition for page Evol Page:7
        return distance -spacing;  // > Event zero-condition for page Evol Page:8
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        _view.audio.play();  // > Event action for page Evol Page:2
        textt =" Landed!!!";  // > Event action for page Evol Page:3
        // catchershow=false;  // > Event action for page Evol Page:4
        theta=thetadeg*pi/180; //use user slider to set values  // > Event action for page Evol Page:5
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:6
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:7
        x=xc[3];  // > Event action for page Evol Page:8
        y=yc[3]+0.1;  // > Event action for page Evol Page:9
        //t=0;  // > Event action for page Evol Page:10
         score=score+1;  // > Event action for page Evol Page:11
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event7 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 1000; };

      _eventSelf.getTolerance = function() { return 1.0e-8; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        //return Math.sqrt((x-xc[4]-0.08)*(x-xc[4]-0.08)+(yc[4]-y)*(yc[4]-y))-0.08;  // > Event zero-condition for page Evol Page:1
        //return Math.sqrt((x-xc[1]-0.08)*(x-xc[1]-0.08)+(yc[1]-y)*(yc[1]-y))-0.08;  // > Event zero-condition for page Evol Page:2
        var dx = x - xc[4];  // > Event zero-condition for page Evol Page:3
        var dy = y - yc[4];  // > Event zero-condition for page Evol Page:4
        var distance = Math.sqrt(dx * dx + dy * dy);  // > Event zero-condition for page Evol Page:5
        //return Math.sqrt((x-xc[0]-0.08)*(x-xc[0]-0.08)+(yc[0]-y)*(yc[0]-y))-0.08;  // > Event zero-condition for page Evol Page:6
        var spacing = 0.1; // tolerance for collision  // > Event zero-condition for page Evol Page:7
        return distance -spacing;  // > Event zero-condition for page Evol Page:8
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        _view.audio.play();  // > Event action for page Evol Page:2
        textt =" Landed!!!";  // > Event action for page Evol Page:3
        // catchershow=false;  // > Event action for page Evol Page:4
        theta=thetadeg*pi/180; //use user slider to set values  // > Event action for page Evol Page:5
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:6
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:7
        x=xc[4];  // > Event action for page Evol Page:8
        y=yc[4]+0.1;  // > Event action for page Evol Page:9
        //t=0;  // > Event action for page Evol Page:10
         score=score+1;  // > Event action for page Evol Page:11
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event8 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 1000; };

      _eventSelf.getTolerance = function() { return 1.0e-8; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        //return Math.sqrt((x-xc[5]-0.08)*(x-xc[5]-0.08)+(yc[5]-y)*(yc[5]-y))-0.08;  // > Event zero-condition for page Evol Page:1
        //return Math.sqrt((x-xc[1]-0.08)*(x-xc[1]-0.08)+(yc[1]-y)*(yc[1]-y))-0.08;  // > Event zero-condition for page Evol Page:2
        var dx = x - xc[5];  // > Event zero-condition for page Evol Page:3
        var dy = y - yc[5];  // > Event zero-condition for page Evol Page:4
        var distance = Math.sqrt(dx * dx + dy * dy);  // > Event zero-condition for page Evol Page:5
        //return Math.sqrt((x-xc[0]-0.08)*(x-xc[0]-0.08)+(yc[0]-y)*(yc[0]-y))-0.08;  // > Event zero-condition for page Evol Page:6
        var spacing = 0.1; // tolerance for collision  // > Event zero-condition for page Evol Page:7
        return distance -spacing;  // > Event zero-condition for page Evol Page:8
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        _view.audio.play();  // > Event action for page Evol Page:2
        textt =" Landed!!!";  // > Event action for page Evol Page:3
        // catchershow=false;  // > Event action for page Evol Page:4
        theta=thetadeg*pi/180; //use user slider to set values  // > Event action for page Evol Page:5
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:6
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:7
        x=xc[5];  // > Event action for page Evol Page:8
        y=yc[5]+0.1;  // > Event action for page Evol Page:9
        //t=0;  // > Event action for page Evol Page:10
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event9 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var y = _aState[__cOut++];
        var vy = _aState[__cOut++];
        var x = _aState[__cOut++];
        var t = _aState[__cOut++];
        return y-ymin;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        y = __state[__cOut++];
        vy = __state[__cOut++];
        x = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = y;
        __state[__cIn++] = vy;
        __state[__cIn++] = x;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        sleep(2000);  // > Event action for page Evol Page:2
        x=xf;  // > Event action for page Evol Page:3
        y=ys0;  // > Event action for page Evol Page:4
        theta=thetadeg*pi/180; //use user slider to set values  // > Event action for page Evol Page:5
        vx=v*Math.cos(theta);  // > Event action for page Evol Page:6
        vy=v*Math.sin(theta);  // > Event action for page Evol Page:7
        t=0;  // > Event action for page Evol Page:8
        textt ="You missed the jump. Use the equation s=uy*t + 1/2ay*t² to find the time taken to land.";  // > Event action for page Evol Page:9
        isFirstTry =false // for moodle  // > Event action for page Evol Page:10
        awardQuestionMarks(0);  // > Event action for page Evol Page:11
        targetedwronganswer ()  // > Event action for page Evol Page:12
        //onAnswer(`|v|= ${v.toFixed(1)}, ϑ= ${thetadeg.toFixed(1)}`,false)  // > Event action for page Evol Page:13
        //once=true // set back to true to prepare for next q  // > Event action for page Evol Page:14
        endQuestion(); //  // > Event action for page Evol Page:15
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_y(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vy(__time) {
    var __index = 0 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_x(__time) {
    var __index = 0 + 1 + 1;
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
    _view = new projectile_shotput_2023_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'fullscreen'
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.mrocket.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'mrocket'
          _view.Stage_select2.linkProperty("Options",  function() { return ["Stage 0","Stage 1","Stage 2","Stage 3","Stage 4"]; } ); // HtmlView Page linking property 'Options' for element 'Stage_select2'
          _view.Stage_select2.setAction("OnChange", function(_data,_info) {
  //lilytext for debugging
  for (var i=0; i<n ; i++) {
    lilytext[i]= ""+i;
  }
  stageloader ()
  t=0; //to restart the trail line;

}); // HtmlView Page setting action 'OnChange' for element 'Stage_select2'
          _view.Stage_select2.linkProperty("Disabled",  function() { return _isPlaying; } ); // HtmlView Page linking property 'Disabled' for element 'Stage_select2'
          _view.Stage_select2.linkProperty("SelectedOptions",  function() { return selected; }, function(_v) { selected = _v; } ); // HtmlView Page linking property 'SelectedOptions' for element 'Stage_select2'
          _view.Stage_select2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'Stage_select2'
          _view.v_label.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'v_label'
          _view.v_slider.linkProperty("Value",  function() { return v; }, function(_v) { v = _v; } ); // HtmlView Page linking property 'Value' for element 'v_slider'
          _view.v_slider.setAction("OnChange", function(_data,_info) {
  vx=v*Math.cos(theta);
  vy=v*Math.sin(theta);
  vxs0=vx;
  vys0=vy;

}); // HtmlView Page setting action 'OnChange' for element 'v_slider'
          _view.v_slider.linkProperty("Disabled",  function() { return selected=="Stage 2"||selected=="Stage 3"; } ); // HtmlView Page linking property 'Disabled' for element 'v_slider'
          _view.v_slider.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'v_slider'
          _view.v_display.linkProperty("Value",  function() { return v; }, function(_v) { v = _v; } ); // HtmlView Page linking property 'Value' for element 'v_display'
          _view.v_display.linkProperty("Editable",  function() { return selected=="Stage 0"||selected=="Stage 1"||selected=="Stage 4"; } ); // HtmlView Page linking property 'Editable' for element 'v_display'
          _view.v_display.setAction("OnChange", function(_data,_info) {
  vx=v*Math.cos(theta);
  vy=v*Math.sin(theta);
  vxs0=vx;
  vys0=vy;

}); // HtmlView Page setting action 'OnChange' for element 'v_display'
          _view.v_display.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'v_display'
          _view.v_units.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'v_units'
          _view.theta_label.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'theta_label'
          _view.theta_slider.linkProperty("Value",  function() { return thetadeg; }, function(_v) { thetadeg = _v; } ); // HtmlView Page linking property 'Value' for element 'theta_slider'
          _view.theta_slider.setAction("OnChange", function(_data,_info) {
  converttoradian (thetadeg)
  //theta=thetadeg*pi/180;
  //vx=v*Math.cos(theta);
  //vy=v*Math.sin(theta);

}); // HtmlView Page setting action 'OnChange' for element 'theta_slider'
          _view.theta_slider.linkProperty("Disabled",  function() { return selected=="Stage 0"||selected=="Stage 1"; } ); // HtmlView Page linking property 'Disabled' for element 'theta_slider'
          _view.theta_slider.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'theta_slider'
          _view.theta_display.linkProperty("Value",  function() { return thetadeg; }, function(_v) { thetadeg = _v; } ); // HtmlView Page linking property 'Value' for element 'theta_display'
          _view.theta_display.linkProperty("Editable",  function() { return selected=="Stage 2"||selected=="Stage 3"||selected=="Stage 4"; } ); // HtmlView Page linking property 'Editable' for element 'theta_display'
          _view.theta_display.setAction("OnChange", function(_data,_info) {
  converttoradian(thetadeg)
  //theta=thetadeg*pi/180;
  //vx=v*Math.cos(theta);
  //vy=v*Math.sin(theta);

}); // HtmlView Page setting action 'OnChange' for element 'theta_display'
          _view.theta_display.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'theta_display'
          _view.theta_units.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'theta_units'
          _view.fField2.linkProperty("Value",  function() { return functionY2; }, function(_v) { functionY2 = _v; } ); // HtmlView Page linking property 'Value' for element 'fField2'
          _view.stepButton.setAction("OnClick", _step); // HtmlView Page setting action 'OnClick' for element 'stepButton'
          _view.runPauseButton.setAction("OffClick", function(_data,_info) {
  textt="paused";
  _pause();

}); // HtmlView Page setting action 'OffClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'runPauseButton'
          _view.runPauseButton.setAction("OnClick", function(_data,_info) {
  _play();
  textt="playing";
  //if (!isQuestionStarted() && !isQuestionAnswered) {
     startQuestion(`Q${stage}`); //moodle part of the start
     //alert()
      //addQuestionHistory(`Target Measurement: ${l_answer}`); //moodle part of the history
     var vcorrect = projectileMotionGivenAngle(x, y, xd, yd, thetadeg*Math.PI/180).v.toFixed(1)
     var thetadegcorrect = projectileMotionGivenv(x, y, xd, yd, v).degree.toFixed(1)
     if (once){
     addQuestionHistory(`|v|✓= ${vcorrect}, ϑ✓= ${thetadegcorrect}`); //moodle part of the history
   once=false
   }
   // }

}); // HtmlView Page setting action 'OnClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'runPauseButton'
          _view.resetButton.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'resetButton'
          _view.resetButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return textt+"\nscore="+score+"/10"; } ); // HtmlView Page linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return Math.max(ymax,y); } ); // HtmlView Page linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDrag", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();
  var xo = x
  var yo = y
  //console.log(projectileMotionGivenv(xo, yo, position[0], position[1], v));

}); // HtmlView Page setting action 'OnDrag' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return Math.max(xmax,x); } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return Math.min(xmin,x); } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return ymin; }, function(_v) { ymin = _v; } ); // HtmlView Page linking property 'MinimumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return escKeyPressed?"velocity="+projectileMotionGivenAngle(x, y, xd, yd, thetadeg*Math.PI/180).v.toFixed(1)+"\nAngle="+projectileMotionGivenv(x, y, xd, yd, v).degree.toFixed(1)+"\nt="+t.toFixed(2):"t="+t.toFixed(2); } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanel'
          _view.background2.linkProperty("SizeX",  function() { return window.innerWidth*2; } ); // HtmlView Page linking property 'SizeX' for element 'background2'
          _view.background2.linkProperty("SizeY",  function() { return window.innerHeight*2; } ); // HtmlView Page linking property 'SizeY' for element 'background2'
          _view.balltrail2.linkProperty("Connected",  function() { return t>0; } ); // HtmlView Page linking property 'Connected' for element 'balltrail2'
          _view.balltrail2.linkProperty("InputX",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'InputX' for element 'balltrail2'
          _view.balltrail2.linkProperty("InputY",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'InputY' for element 'balltrail2'
          _view.v2.linkProperty("SizeX",  function() { return vx*0.1; } ); // HtmlView Page linking property 'SizeX' for element 'v2'
          _view.v2.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'v2'
          _view.v2.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'v2'
          _view.v2.linkProperty("SizeY",  function() { return vy*0.1; } ); // HtmlView Page linking property 'SizeY' for element 'v2'
          _view.target.linkProperty("X",  function() { return xd; }, function(_v) { xd = _v; } ); // HtmlView Page linking property 'X' for element 'target'
          _view.target.linkProperty("Y",  function() { return yd; }, function(_v) { yd = _v; } ); // HtmlView Page linking property 'Y' for element 'target'
          _view.man_throw_right.linkProperty("Visibility",  function() { return _isPaused&&!faceright; } ); // HtmlView Page linking property 'Visibility' for element 'man_throw_right'
          _view.man_throw_left.linkProperty("Visibility",  function() { return _isPaused&&faceright; } ); // HtmlView Page linking property 'Visibility' for element 'man_throw_left'
          _view.ball_real.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'ball_real'
          _view.ball_real.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'ball_real'
          _view.win_stage_12.setAction("OnRelease", function(_data,_info) {
  selected[0]="Stage 1";

}); // HtmlView Page setting action 'OnRelease' for element 'win_stage_12'
          _view.ball.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'ball'
          _view.ball.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'ball'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(100);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function projectile_shotput_2023_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = projectile_shotput_2023_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function projectile_shotput_2023_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"mrocket", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'mrocket'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"Stage_select2", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'Stage_select2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"v_label", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'v_label'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'v_label'
      .setProperty("Tooltip","magnitude of velocity ") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'v_label'
      .setProperty("Text"," |v| = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'v_label'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"v_slider", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'v_slider'
      .setProperty("Width","15vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'v_slider'
      .setProperty("Maximum",11) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'v_slider'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'v_slider'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'v_slider'
      .setProperty("Step",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'v_slider'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"v_display", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'v_display'
      .setProperty("Width","7vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'v_display'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'v_display'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"v_units", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'v_units'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'v_units'
      .setProperty("Tooltip","metre per second") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'v_units'
      .setProperty("Text"," m/s ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'v_units'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"theta_label", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'theta_label'
      .setProperty("Background","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'theta_label'
      .setProperty("Tooltip","angle of launch ") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'theta_label'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'theta_label'
      .setProperty("Text"," ϑ = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'theta_label'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"theta_slider", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'theta_slider'
      .setProperty("Width","15vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'theta_slider'
      .setProperty("Maximum",180) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'theta_slider'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'theta_slider'
      .setProperty("Background","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'theta_slider'
      .setProperty("Tooltip","angle of launch in degrees") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'theta_slider'
      .setProperty("Step",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'theta_slider'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"theta_display", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'theta_display'
      .setProperty("Width","7vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'theta_display'
      .setProperty("Format","00.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'theta_display'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"theta_units", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'theta_units'
      .setProperty("Background","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'theta_units'
      .setProperty("Tooltip","degrees") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'theta_units'
      .setProperty("Foreground","White") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'theta_units'
      .setProperty("Text"," ° ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'theta_units'
      ;

    _view._addElement(EJSS_INTERFACE.functionField,"fField2", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'fField2'
      .setProperty("Width",200) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'fField2'
      .setProperty("Tooltip","model") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'fField2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'fField2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton'
      .setProperty("ImageUrl","/org/opensourcephysics/resources/controls/images/stepforward.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'stepButton'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'stepButton'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'audio'
      .setProperty("Controls",false) // EJsS HtmlView.HtmlView Page: setting property 'Controls' for element 'audio'
      .setProperty("AudioUrl","./projectile/toy_plastic_inflatable_ball_bounce_on_floor.mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"runPauseButton", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'runPauseButton'
      .setProperty("Width","10vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'runPauseButton'
      .setProperty("TextOn","►Play") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'runPauseButton'
      .setProperty("TextOff","❚❚Pause") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'runPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.mrocket) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton'
      .setProperty("Width","10vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton'
      .setProperty("Tooltip","Resets the simulation") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'resetButton'
      .setProperty("Text","↻Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("EnabledZooming",true) // EJsS HtmlView.HtmlView Page: setting property 'EnabledZooming' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("AxisYFont","normal normal 1vw ") // EJsS HtmlView.HtmlView Page: setting property 'AxisYFont' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("GridXShow",true) // EJsS HtmlView.HtmlView Page: setting property 'GridXShow' for element 'plottingPanel'
      .setProperty("TLMessage","Help the sportsman throw the shot put to reach the target through projectile motion.") // EJsS HtmlView.HtmlView Page: setting property 'TLMessage' for element 'plottingPanel'
      .setProperty("Background","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("GridYShow",true) // EJsS HtmlView.HtmlView Page: setting property 'GridYShow' for element 'plottingPanel'
      .setProperty("AxisXFont","normal normal 1vw ") // EJsS HtmlView.HtmlView Page: setting property 'AxisXFont' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"background2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'background2'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background2'
      .setProperty("Attributes",{"transparency":"0"}) // EJsS HtmlView.HtmlView Page: setting property 'Attributes' for element 'background2'
      .setProperty("ImageUrl","./projectile/stadium.jpg") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'background2'
      .setProperty("Y",1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'background2'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"balltrail2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'balltrail2'
      .setProperty("LineColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'balltrail2'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'balltrail2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"v2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'v2'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'v2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'v2'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'v2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"target", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'target'
      .setProperty("SizeX",80) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'target'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'target'
      .setProperty("ImageUrl","./projectile/bullseye-removebg-preview.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'target'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'target'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'target'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"man_throw_right", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'man_throw_right'
      .setProperty("SizeX",60) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'man_throw_right'
      .setProperty("X",-0.1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'man_throw_right'
      .setProperty("ImageUrl","./projectile/man_throwing_left.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'man_throw_right'
      .setProperty("Y",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'man_throw_right'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'man_throw_right'
      .setProperty("SizeY",90) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'man_throw_right'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"man_throw_left", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'man_throw_left'
      .setProperty("SizeX",60) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'man_throw_left'
      .setProperty("X",0.1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'man_throw_left'
      .setProperty("ImageUrl","./projectile/man_throwing-removebg-preview.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'man_throw_left'
      .setProperty("Y",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'man_throw_left'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'man_throw_left'
      .setProperty("SizeY",90) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'man_throw_left'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"ball_real", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ball_real'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ball_real'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'ball_real'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ball_real'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'ball_real'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'ball_real'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"win_stage_12", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'win_stage_12'
      .setProperty("SizeX",400) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'win_stage_12'
      .setProperty("X",5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'win_stage_12'
      .setProperty("ImageUrl","./projectile/frog_win.jpg") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'win_stage_12'
      .setProperty("Y",2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'win_stage_12'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'win_stage_12'
      .setProperty("SizeY",500) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'win_stage_12'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'win_stage_12'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"ball", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ball'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ball'
      .setProperty("ImageUrl","./projectile/shot_put_ball-removebg-preview.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'ball'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ball'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'ball'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new projectile_shotput_2023("_topFrame","_ejs_library/",null);
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
