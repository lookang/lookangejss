function areaandperimeter(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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
  var question; // EjsS Model.Variables.Var Table.question
  var questionTL; // EjsS Model.Variables.Var Table.questionTL
  var answer; // EjsS Model.Variables.Var Table.answer
  var answer2; // EjsS Model.Variables.Var Table.answer2
  var logoneline; // EjsS Model.Variables.Var Table.logoneline
  var symbol; // EjsS Model.Variables.Var Table.symbol
  var questionnumber; // EjsS Model.Variables.Var Table.questionnumber
  var counter; // EjsS Model.Variables.Var Table.counter
  var showareainput; // EjsS Model.Variables.Var Table.showareainput
  var showperimeterinput; // EjsS Model.Variables.Var Table.showperimeterinput
  var showcheck; // EjsS Model.Variables.Var Table.showcheck

  var iOS; // EjsS Model.Variables.layout.iOS
  var Android; // EjsS Model.Variables.layout.Android
  var iPad; // EjsS Model.Variables.layout.iPad
  var iPhone; // EjsS Model.Variables.layout.iPhone
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
  var n; // EjsS Model.Variables.cells.n
  var x; // EjsS Model.Variables.cells.x
  var y; // EjsS Model.Variables.cells.y
  var xs; // EjsS Model.Variables.cells.xs
  var ys; // EjsS Model.Variables.cells.ys
  var ncellshow; // EjsS Model.Variables.cells.ncellshow
  var ncell; // EjsS Model.Variables.cells.ncell
  var xcell; // EjsS Model.Variables.cells.xcell
  var cellImageUrl; // EjsS Model.Variables.cells.cellImageUrl
  var cellUnicodeUrl; // EjsS Model.Variables.cells.cellUnicodeUrl
  var ycell; // EjsS Model.Variables.cells.ycell
  var cellsizex; // EjsS Model.Variables.cells.cellsizex
  var cellsizey; // EjsS Model.Variables.cells.cellsizey
  var text; // EjsS Model.Variables.cells.text
  var textby; // EjsS Model.Variables.cells.textby
  var textanswer; // EjsS Model.Variables.cells.textanswer
  var elementinteracted; // EjsS Model.Variables.cells.elementinteracted
  var occupied; // EjsS Model.Variables.cells.occupied
  var occupiedby; // EjsS Model.Variables.cells.occupiedby
  var allowed; // EjsS Model.Variables.cells.allowed
  var allowedtestx; // EjsS Model.Variables.cells.allowedtestx
  var allowedtesty; // EjsS Model.Variables.cells.allowedtesty
  var dx; // EjsS Model.Variables.cells.dx
  var dy; // EjsS Model.Variables.cells.dy
  var distance; // EjsS Model.Variables.cells.distance
  var shortestdistance; // EjsS Model.Variables.cells.shortestdistance
  var area; // EjsS Model.Variables.cells.area
  var count; // EjsS Model.Variables.cells.count
  var showTRtext; // EjsS Model.Variables.cells.showTRtext
  var TRtext; // EjsS Model.Variables.cells.TRtext
  var countoccupied; // EjsS Model.Variables.cells.countoccupied
  var angleRadians; // EjsS Model.Variables.cells.angleRadians
  var curhovered; // EjsS Model.Variables.cells.curhovered

  var mat; // EjsS Model.Variables.matrix.mat

  var xc; // EjsS Model.Variables.Var Table 2.xc
  var yc; // EjsS Model.Variables.Var Table 2.yc

  var lengthxbottom; // EjsS Model.Variables.perimeter.lengthxbottom
  var lengthxtop; // EjsS Model.Variables.perimeter.lengthxtop
  var lengthxleft; // EjsS Model.Variables.perimeter.lengthxleft
  var lengthxright; // EjsS Model.Variables.perimeter.lengthxright
  var thick; // EjsS Model.Variables.perimeter.thick
  var thin; // EjsS Model.Variables.perimeter.thin
  var linewidth; // EjsS Model.Variables.perimeter.linewidth
  var linewidthtop; // EjsS Model.Variables.perimeter.linewidthtop
  var linewidthleft; // EjsS Model.Variables.perimeter.linewidthleft
  var linewidthright; // EjsS Model.Variables.perimeter.linewidthright
  var lineattribute; // EjsS Model.Variables.perimeter.lineattribute
  var lineattributetop; // EjsS Model.Variables.perimeter.lineattributetop
  var lineattributeleft; // EjsS Model.Variables.perimeter.lineattributeleft
  var lineattributeright; // EjsS Model.Variables.perimeter.lineattributeright

  var xtemp; // EjsS Model.Variables.debug.xtemp
  var ytemp; // EjsS Model.Variables.debug.ytemp
  var dragging; // EjsS Model.Variables.debug.dragging

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
      t : t,
      dt : dt,
      pi : pi,
      question : question,
      questionTL : questionTL,
      answer : answer,
      answer2 : answer2,
      logoneline : logoneline,
      symbol : symbol,
      questionnumber : questionnumber,
      counter : counter,
      showareainput : showareainput,
      showperimeterinput : showperimeterinput,
      showcheck : showcheck,
      iOS : iOS,
      Android : Android,
      iPad : iPad,
      iPhone : iPhone,
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
      ymax : ymax,
      n : n,
      x : x,
      y : y,
      xs : xs,
      ys : ys,
      ncellshow : ncellshow,
      ncell : ncell,
      xcell : xcell,
      cellImageUrl : cellImageUrl,
      cellUnicodeUrl : cellUnicodeUrl,
      ycell : ycell,
      cellsizex : cellsizex,
      cellsizey : cellsizey,
      text : text,
      textby : textby,
      textanswer : textanswer,
      elementinteracted : elementinteracted,
      occupied : occupied,
      occupiedby : occupiedby,
      allowed : allowed,
      allowedtestx : allowedtestx,
      allowedtesty : allowedtesty,
      dx : dx,
      dy : dy,
      distance : distance,
      shortestdistance : shortestdistance,
      area : area,
      count : count,
      showTRtext : showTRtext,
      TRtext : TRtext,
      countoccupied : countoccupied,
      angleRadians : angleRadians,
      curhovered : curhovered,
      mat : mat,
      xc : xc,
      yc : yc,
      lengthxbottom : lengthxbottom,
      lengthxtop : lengthxtop,
      lengthxleft : lengthxleft,
      lengthxright : lengthxright,
      thick : thick,
      thin : thin,
      linewidth : linewidth,
      linewidthtop : linewidthtop,
      linewidthleft : linewidthleft,
      linewidthright : linewidthright,
      lineattribute : lineattribute,
      lineattributetop : lineattributetop,
      lineattributeleft : lineattributeleft,
      lineattributeright : lineattributeright,
      xtemp : xtemp,
      ytemp : ytemp,
      dragging : dragging
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.question != "undefined") question = json.question;
    if(typeof json.questionTL != "undefined") questionTL = json.questionTL;
    if(typeof json.answer != "undefined") answer = json.answer;
    if(typeof json.answer2 != "undefined") answer2 = json.answer2;
    if(typeof json.logoneline != "undefined") logoneline = json.logoneline;
    if(typeof json.symbol != "undefined") symbol = json.symbol;
    if(typeof json.questionnumber != "undefined") questionnumber = json.questionnumber;
    if(typeof json.counter != "undefined") counter = json.counter;
    if(typeof json.showareainput != "undefined") showareainput = json.showareainput;
    if(typeof json.showperimeterinput != "undefined") showperimeterinput = json.showperimeterinput;
    if(typeof json.showcheck != "undefined") showcheck = json.showcheck;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.Android != "undefined") Android = json.Android;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
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
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.xs != "undefined") xs = json.xs;
    if(typeof json.ys != "undefined") ys = json.ys;
    if(typeof json.ncellshow != "undefined") ncellshow = json.ncellshow;
    if(typeof json.ncell != "undefined") ncell = json.ncell;
    if(typeof json.xcell != "undefined") xcell = json.xcell;
    if(typeof json.cellImageUrl != "undefined") cellImageUrl = json.cellImageUrl;
    if(typeof json.cellUnicodeUrl != "undefined") cellUnicodeUrl = json.cellUnicodeUrl;
    if(typeof json.ycell != "undefined") ycell = json.ycell;
    if(typeof json.cellsizex != "undefined") cellsizex = json.cellsizex;
    if(typeof json.cellsizey != "undefined") cellsizey = json.cellsizey;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.textby != "undefined") textby = json.textby;
    if(typeof json.textanswer != "undefined") textanswer = json.textanswer;
    if(typeof json.elementinteracted != "undefined") elementinteracted = json.elementinteracted;
    if(typeof json.occupied != "undefined") occupied = json.occupied;
    if(typeof json.occupiedby != "undefined") occupiedby = json.occupiedby;
    if(typeof json.allowed != "undefined") allowed = json.allowed;
    if(typeof json.allowedtestx != "undefined") allowedtestx = json.allowedtestx;
    if(typeof json.allowedtesty != "undefined") allowedtesty = json.allowedtesty;
    if(typeof json.dx != "undefined") dx = json.dx;
    if(typeof json.dy != "undefined") dy = json.dy;
    if(typeof json.distance != "undefined") distance = json.distance;
    if(typeof json.shortestdistance != "undefined") shortestdistance = json.shortestdistance;
    if(typeof json.area != "undefined") area = json.area;
    if(typeof json.count != "undefined") count = json.count;
    if(typeof json.showTRtext != "undefined") showTRtext = json.showTRtext;
    if(typeof json.TRtext != "undefined") TRtext = json.TRtext;
    if(typeof json.countoccupied != "undefined") countoccupied = json.countoccupied;
    if(typeof json.angleRadians != "undefined") angleRadians = json.angleRadians;
    if(typeof json.curhovered != "undefined") curhovered = json.curhovered;
    if(typeof json.mat != "undefined") mat = json.mat;
    if(typeof json.xc != "undefined") xc = json.xc;
    if(typeof json.yc != "undefined") yc = json.yc;
    if(typeof json.lengthxbottom != "undefined") lengthxbottom = json.lengthxbottom;
    if(typeof json.lengthxtop != "undefined") lengthxtop = json.lengthxtop;
    if(typeof json.lengthxleft != "undefined") lengthxleft = json.lengthxleft;
    if(typeof json.lengthxright != "undefined") lengthxright = json.lengthxright;
    if(typeof json.thick != "undefined") thick = json.thick;
    if(typeof json.thin != "undefined") thin = json.thin;
    if(typeof json.linewidth != "undefined") linewidth = json.linewidth;
    if(typeof json.linewidthtop != "undefined") linewidthtop = json.linewidthtop;
    if(typeof json.linewidthleft != "undefined") linewidthleft = json.linewidthleft;
    if(typeof json.linewidthright != "undefined") linewidthright = json.linewidthright;
    if(typeof json.lineattribute != "undefined") lineattribute = json.lineattribute;
    if(typeof json.lineattributetop != "undefined") lineattributetop = json.lineattributetop;
    if(typeof json.lineattributeleft != "undefined") lineattributeleft = json.lineattributeleft;
    if(typeof json.lineattributeright != "undefined") lineattributeright = json.lineattributeright;
    if(typeof json.xtemp != "undefined") xtemp = json.xtemp;
    if(typeof json.ytemp != "undefined") ytemp = json.ytemp;
    if(typeof json.dragging != "undefined") dragging = json.dragging;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["matrix"] = true;
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["matrix"] = true;
    __pagesEnabled["area"] = true;
    __pagesEnabled["perimeter"] = true;
    __pagesEnabled["TRtext"] = true;
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    question = ""; // EjsS Model.Variables.Var Table.question
    questionTL = ""; // EjsS Model.Variables.Var Table.questionTL
    answer = Math.max(Math.round(Math.random()*10),2); // EjsS Model.Variables.Var Table.answer
    answer2 = Math.max(Math.round(Math.random()*10),2); // EjsS Model.Variables.Var Table.answer2
    symbol = ""; // EjsS Model.Variables.Var Table.symbol
    questionnumber = 0; // EjsS Model.Variables.Var Table.questionnumber
    counter = 0; // EjsS Model.Variables.Var Table.counter
  });

  _model.addToReset(function() {
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iOS
    Android = /Android|android/i.test(navigator.userAgent); // EjsS Model.Variables.layout.Android
    iPad = /iPad/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPad
    iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPhone
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
    n = 100; // EjsS Model.Variables.cells.n
    x = new Array(n); // EjsS Model.Variables.cells.x
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.x
        x[_i0] = -2+Math.random()-0.5;  // EjsS Model.Variables.cells.x
      }
    }());
    y = new Array(n); // EjsS Model.Variables.cells.y
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.y
        y[_i0] = 5+Math.random()-0.5;  // EjsS Model.Variables.cells.y
      }
    }());
    xs = new Array(n); // EjsS Model.Variables.cells.xs
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.xs
        xs[_i0] = -2+Math.random()-0.5;  // EjsS Model.Variables.cells.xs
      }
    }());
    ys = new Array(n); // EjsS Model.Variables.cells.ys
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.ys
        ys[_i0] = 5+Math.random()-0.5;  // EjsS Model.Variables.cells.ys
      }
    }());
    ncellshow = new Array(n); // EjsS Model.Variables.cells.ncellshow
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.ncellshow
        ncellshow[_i0] = false;  // EjsS Model.Variables.cells.ncellshow
      }
    }());
    ncell = 100; // EjsS Model.Variables.cells.ncell
    xcell = [-10,-8,-6,-4,-2,0,2,4,6,8,10]; // EjsS Model.Variables.cells.xcell
    cellImageUrl = new Array(n); // EjsS Model.Variables.cells.cellImageUrl
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.cellImageUrl
        cellImageUrl[_i0] = "";  // EjsS Model.Variables.cells.cellImageUrl
      }
    }());
    cellUnicodeUrl = new Array(n); // EjsS Model.Variables.cells.cellUnicodeUrl
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.cellUnicodeUrl
        cellUnicodeUrl[_i0] = "";  // EjsS Model.Variables.cells.cellUnicodeUrl
      }
    }());
    ycell = new Array(n); // EjsS Model.Variables.cells.ycell
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.ycell
        ycell[_i0] = 7;  // EjsS Model.Variables.cells.ycell
      }
    }());
    cellsizex = (xmax-xmin)/(n); // EjsS Model.Variables.cells.cellsizex
    cellsizey = (ymax-ymin)/4; // EjsS Model.Variables.cells.cellsizey
    text = new Array(n); // EjsS Model.Variables.cells.text
    textby = new Array(n); // EjsS Model.Variables.cells.textby
    textanswer = ["dc","dc","dc","dc","dc","ac","ac","ac","ac","ac","acdc"]; // EjsS Model.Variables.cells.textanswer
    elementinteracted = -1; // EjsS Model.Variables.cells.elementinteracted
    occupied = new Array(n); // EjsS Model.Variables.cells.occupied
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.occupied
        occupied[_i0] = 0;  // EjsS Model.Variables.cells.occupied
      }
    }());
    occupiedby = new Array(n); // EjsS Model.Variables.cells.occupiedby
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.occupiedby
        occupiedby[_i0] = 0;  // EjsS Model.Variables.cells.occupiedby
      }
    }());
    allowed = new Array(n); // EjsS Model.Variables.cells.allowed
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.allowed
        allowed[_i0] = 0;  // EjsS Model.Variables.cells.allowed
      }
    }());
    allowedtestx = 0; // EjsS Model.Variables.cells.allowedtestx
    allowedtesty = 0; // EjsS Model.Variables.cells.allowedtesty
    dx = new Array(n); // EjsS Model.Variables.cells.dx
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.dx
        dx[_i0] = 0;  // EjsS Model.Variables.cells.dx
      }
    }());
    dy = new Array(n); // EjsS Model.Variables.cells.dy
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.dy
        dy[_i0] = 0;  // EjsS Model.Variables.cells.dy
      }
    }());
    distance = new Array(n); // EjsS Model.Variables.cells.distance
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.distance
        distance[_i0] = 0;  // EjsS Model.Variables.cells.distance
      }
    }());
    shortestdistance = 10; // EjsS Model.Variables.cells.shortestdistance
    area = 0; // EjsS Model.Variables.cells.area
    count = 0; // EjsS Model.Variables.cells.count
    showTRtext = false; // EjsS Model.Variables.cells.showTRtext
    TRtext = ""; // EjsS Model.Variables.cells.TRtext
    countoccupied = 0; // EjsS Model.Variables.cells.countoccupied
    angleRadians = 0; // EjsS Model.Variables.cells.angleRadians
    curhovered = new Array(n); // EjsS Model.Variables.cells.curhovered
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.curhovered
        curhovered[_i0] = 0;  // EjsS Model.Variables.cells.curhovered
      }
    }());
  });

  _model.addToReset(function() {
    mat = new Array(n/10); // EjsS Model.Variables.matrix.mat
  });

  _model.addToReset(function() {
    xc = 0; // EjsS Model.Variables.Var Table 2.xc
    yc = 0; // EjsS Model.Variables.Var Table 2.yc
  });

  _model.addToReset(function() {
    lengthxbottom = new Array(n); // EjsS Model.Variables.perimeter.lengthxbottom
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.lengthxbottom
        lengthxbottom[_i0] = 0;  // EjsS Model.Variables.perimeter.lengthxbottom
      }
    }());
    lengthxtop = new Array(n); // EjsS Model.Variables.perimeter.lengthxtop
    lengthxleft = new Array(n); // EjsS Model.Variables.perimeter.lengthxleft
    lengthxright = new Array(n); // EjsS Model.Variables.perimeter.lengthxright
    thick = 4; // EjsS Model.Variables.perimeter.thick
    thin = 1; // EjsS Model.Variables.perimeter.thin
    linewidth = new Array(n); // EjsS Model.Variables.perimeter.linewidth
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.linewidth
        linewidth[_i0] = 1;  // EjsS Model.Variables.perimeter.linewidth
      }
    }());
    linewidthtop = new Array(n); // EjsS Model.Variables.perimeter.linewidthtop
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.linewidthtop
        linewidthtop[_i0] = 1;  // EjsS Model.Variables.perimeter.linewidthtop
      }
    }());
    linewidthleft = new Array(n); // EjsS Model.Variables.perimeter.linewidthleft
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.linewidthleft
        linewidthleft[_i0] = 1;  // EjsS Model.Variables.perimeter.linewidthleft
      }
    }());
    linewidthright = new Array(n); // EjsS Model.Variables.perimeter.linewidthright
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.linewidthright
        linewidthright[_i0] = 1;  // EjsS Model.Variables.perimeter.linewidthright
      }
    }());
    lineattribute = new Array(n); // EjsS Model.Variables.perimeter.lineattribute
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.lineattribute
        lineattribute[_i0] = 1;  // EjsS Model.Variables.perimeter.lineattribute
      }
    }());
    lineattributetop = new Array(n); // EjsS Model.Variables.perimeter.lineattributetop
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.lineattributetop
        lineattributetop[_i0] = 1;  // EjsS Model.Variables.perimeter.lineattributetop
      }
    }());
    lineattributeleft = new Array(n); // EjsS Model.Variables.perimeter.lineattributeleft
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.lineattributeleft
        lineattributeleft[_i0] = 1;  // EjsS Model.Variables.perimeter.lineattributeleft
      }
    }());
    lineattributeright = new Array(n); // EjsS Model.Variables.perimeter.lineattributeright
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.perimeter.lineattributeright
        lineattributeright[_i0] = 1;  // EjsS Model.Variables.perimeter.lineattributeright
      }
    }());
  });

  _model.addToReset(function() {
    xtemp = 0; // EjsS Model.Variables.debug.xtemp
    ytemp = 0; // EjsS Model.Variables.debug.ytemp
    dragging = false; // EjsS Model.Variables.debug.dragging
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

  function game () {  // > CustomCode.game:1
  // area=10 level1  // > CustomCode.game:2
  // area =32, perimeter=24  // > CustomCode.game:3
  //find area?  // > CustomCode.game:4
  // find area?  // > CustomCode.game:5
  // area =12, 0.5 this color, 0.5 another color  // > CustomCode.game:6
  }  // > CustomCode.game:7

  function setup () {  // > CustomCode.setup:1
    for (var i=0; i<n ; i++) { // user_reset_put back in basket  // > CustomCode.setup:2
    x[i]= xs[i];  // > CustomCode.setup:3
    y[i]=ys[i];  // > CustomCode.setup:4
    }  // > CustomCode.setup:5
  counter=counter+1;  // > CustomCode.setup:6
  // area <4  // > CustomCode.setup:7
  if (counter==1){  // > CustomCode.setup:8
  var random = Math.round(Math.random()*7)  // > CustomCode.setup:9
  for (var i=0; i<random ; i++) { // horizontal line  // > CustomCode.setup:10
    x[i]= xcell[53+i]  // > CustomCode.setup:11
    y[i]= ycell[53+i]  // > CustomCode.setup:12
      // > CustomCode.setup:13
  }}  // > CustomCode.setup:14
  if (counter==2){  // > CustomCode.setup:15
    var random = Math.round(Math.random()*7)  // > CustomCode.setup:16
  for (var i=0; i<random ; i++) { // vertical line  // > CustomCode.setup:17
    x[i]= xcell[25+i*10]  // > CustomCode.setup:18
    y[i]= ycell[25+i*10]  // > CustomCode.setup:19
      // > CustomCode.setup:20
  }}  // > CustomCode.setup:21
  if (counter==3){  // > CustomCode.setup:22
    // square 2x2  // > CustomCode.setup:23
   var square =2;  // > CustomCode.setup:24
  for (var i=0; i<square*square ; i++) { // square 8x8  // > CustomCode.setup:25
  var start =44  // > CustomCode.setup:26
  //var squareside = 6  // > CustomCode.setup:27
  x[i]= xcell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:28
    y[i]= ycell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:29
  }  // > CustomCode.setup:30
   /*  // > CustomCode.setup:31
   x[0]= xcell[44]  // > CustomCode.setup:32
    y[0]= ycell[44]  // > CustomCode.setup:33
      x[1]= xcell[45]  // > CustomCode.setup:34
    y[1]= ycell[45]  // > CustomCode.setup:35
    x[2]= xcell[54]  // > CustomCode.setup:36
    y[2]= ycell[54]  // > CustomCode.setup:37
      x[3]= xcell[55]  // > CustomCode.setup:38
    y[3]= ycell[55]  // > CustomCode.setup:39
    */  // > CustomCode.setup:40
    }  // > CustomCode.setup:41
      // > CustomCode.setup:42
      // > CustomCode.setup:43
  if (counter==4){    // > CustomCode.setup:44
  // square 3x3  // > CustomCode.setup:45
   var square =3;  // > CustomCode.setup:46
  for (var i=0; i<square*square ; i++) { // square 3  // > CustomCode.setup:47
  var start =44  // > CustomCode.setup:48
  //var squareside = 6  // > CustomCode.setup:49
  x[i]= xcell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:50
    y[i]= ycell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:51
  }  // > CustomCode.setup:52
    /*  // > CustomCode.setup:53
    x[0]= xcell[44]  // > CustomCode.setup:54
    y[0]= ycell[44]  // > CustomCode.setup:55
      x[1]= xcell[45]  // > CustomCode.setup:56
    y[1]= ycell[45] // skip one number, dont matter  // > CustomCode.setup:57
    x[3]=xcell[46]  // > CustomCode.setup:58
    y[3]=ycell[46]  // > CustomCode.setup:59
    x[4]= xcell[54]  // > CustomCode.setup:60
    y[4]= ycell[54]  // > CustomCode.setup:61
      x[5]= xcell[55]  // > CustomCode.setup:62
    y[5]= ycell[55]  // > CustomCode.setup:63
      x[6]= xcell[56]  // > CustomCode.setup:64
    y[6]= ycell[56]  // > CustomCode.setup:65
    x[7]= xcell[64]  // > CustomCode.setup:66
    y[7]= ycell[64]  // > CustomCode.setup:67
      x[8]= xcell[65]  // > CustomCode.setup:68
    y[8]= ycell[65]  // > CustomCode.setup:69
      x[9]= xcell[66]  // > CustomCode.setup:70
    y[9]= ycell[66]  // > CustomCode.setup:71
    */  // > CustomCode.setup:72
    }  // > CustomCode.setup:73
      // > CustomCode.setup:74
      // > CustomCode.setup:75
    if (counter==5){  // > CustomCode.setup:76
    // square 4x4  // > CustomCode.setup:77
     var square =4;  // > CustomCode.setup:78
  for (var i=0; i<square*square ; i++) { // square 44  // > CustomCode.setup:79
  var start =33  // > CustomCode.setup:80
  //var squareside = 6  // > CustomCode.setup:81
  x[i]= xcell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:82
    y[i]= ycell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:83
  }  // > CustomCode.setup:84
  /*  // > CustomCode.setup:85
     x[0]= xcell[33]  // > CustomCode.setup:86
    y[0]= ycell[33]  // > CustomCode.setup:87
      x[1]= xcell[34]  // > CustomCode.setup:88
    y[1]= ycell[34]  // > CustomCode.setup:89
      x[2]= xcell[35]  // > CustomCode.setup:90
    y[2]= ycell[35]  // > CustomCode.setup:91
    x[3]=xcell[36]  // > CustomCode.setup:92
    y[3]=ycell[36] //  // > CustomCode.setup:93
    x[4]= xcell[43]  // > CustomCode.setup:94
    y[4]= ycell[43]  // > CustomCode.setup:95
      x[5]= xcell[44]  // > CustomCode.setup:96
    y[5]= ycell[44]  // > CustomCode.setup:97
      x[6]= xcell[45]  // > CustomCode.setup:98
    y[6]= ycell[45]  // > CustomCode.setup:99
    x[7]= xcell[46]  // > CustomCode.setup:100
    y[7]= ycell[46] //  // > CustomCode.setup:101
      x[8]= xcell[53]  // > CustomCode.setup:102
    y[8]= ycell[53]  // > CustomCode.setup:103
      x[9]= xcell[54]  // > CustomCode.setup:104
    y[9]= ycell[54]  // > CustomCode.setup:105
     x[10]= xcell[55]  // > CustomCode.setup:106
    y[10]= ycell[55]  // > CustomCode.setup:107
      x[11]= xcell[56]  // > CustomCode.setup:108
    y[11]= ycell[56]//  // > CustomCode.setup:109
     x[12]= xcell[63]  // > CustomCode.setup:110
    y[12]= ycell[63]  // > CustomCode.setup:111
      x[13]= xcell[64]  // > CustomCode.setup:112
    y[13]= ycell[64]  // > CustomCode.setup:113
     x[14]= xcell[65]  // > CustomCode.setup:114
    y[14]= ycell[65]  // > CustomCode.setup:115
      x[15]= xcell[66]  // > CustomCode.setup:116
    y[15]= ycell[66]  // > CustomCode.setup:117
  */  // > CustomCode.setup:118
  }  // > CustomCode.setup:119
  if (counter==6){  // > CustomCode.setup:120
  for (var i=0; i<=24 ; i++) { // square 5x5  // > CustomCode.setup:121
    x[i]= xcell[33+Math.floor(i/5)*10+i%5]  // > CustomCode.setup:122
    y[i]= ycell[33+Math.floor(i/5)*10+i%5]  // > CustomCode.setup:123
      // > CustomCode.setup:124
  }  // > CustomCode.setup:125
  }  // > CustomCode.setup:126
  if (counter==7){  // > CustomCode.setup:127
  for (var i=0; i<=35 ; i++) { // square 6x6  // > CustomCode.setup:128
  var start =22  // > CustomCode.setup:129
  var squareside = 6  // > CustomCode.setup:130
  x[i]= xcell[start+Math.floor(i/squareside)*10+i%squareside]  // > CustomCode.setup:131
    y[i]= ycell[start+Math.floor(i/squareside)*10+i%squareside]  // > CustomCode.setup:132
  }  // > CustomCode.setup:133
  }  // > CustomCode.setup:134
  if (counter==8){  // > CustomCode.setup:135
  var square =7;  // > CustomCode.setup:136
  for (var i=0; i<square*square ; i++) { // square 7x7  // > CustomCode.setup:137
  var start =11  // > CustomCode.setup:138
  //var squareside = 6  // > CustomCode.setup:139
  x[i]= xcell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:140
    y[i]= ycell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:141
  }  // > CustomCode.setup:142
  }  // > CustomCode.setup:143
  if (counter==9){  // > CustomCode.setup:144
  var square =8;  // > CustomCode.setup:145
  for (var i=0; i<square*square ; i++) { // square 8x8  // > CustomCode.setup:146
  var start =11  // > CustomCode.setup:147
  //var squareside = 6  // > CustomCode.setup:148
  x[i]= xcell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:149
    y[i]= ycell[start+Math.floor(i/square)*10+i%square]  // > CustomCode.setup:150
  }  // > CustomCode.setup:151
  }  // > CustomCode.setup:152
  if (counter==10){  // > CustomCode.setup:153
  //  if (counter==0){  // > CustomCode.setup:154
  //manual laying from theresa  // > CustomCode.setup:155
   x[0]= xcell[43];  // > CustomCode.setup:156
    y[0]= ycell[43]  // > CustomCode.setup:157
  x[1]= xcell[44];  // > CustomCode.setup:158
    y[1]= ycell[44]  // > CustomCode.setup:159
    x[2]= xcell[45];  // > CustomCode.setup:160
    y[2]= ycell[45]  // > CustomCode.setup:161
    x[3]= xcell[46];  // > CustomCode.setup:162
    y[3]= ycell[46] // up next row  // > CustomCode.setup:163
    x[4]= xcell[52];  // > CustomCode.setup:164
    y[4]= ycell[52]  // > CustomCode.setup:165
     x[5]= xcell[53];  // > CustomCode.setup:166
    y[5]= ycell[53]  // > CustomCode.setup:167
     x[6]= xcell[54];  // > CustomCode.setup:168
    y[6]= ycell[54]  // > CustomCode.setup:169
     x[7]= xcell[55];  // > CustomCode.setup:170
    y[7]= ycell[55]// up next row  // > CustomCode.setup:171
     x[8]= xcell[63];  // > CustomCode.setup:172
    y[8]= ycell[63]  // > CustomCode.setup:173
       x[9]= xcell[65];  // > CustomCode.setup:174
    y[9]= ycell[65]  // > CustomCode.setup:175
      // > CustomCode.setup:176
  }  // > CustomCode.setup:177
  if (counter==11){  // > CustomCode.setup:178
  //  if (counter==0){  // > CustomCode.setup:179
  //manual laying from theresa in document  // > CustomCode.setup:180
   x[0]= xcell[45];  // > CustomCode.setup:181
    y[0]= ycell[45]  // > CustomCode.setup:182
  x[1]= xcell[54]; // up next row  // > CustomCode.setup:183
    y[1]= ycell[54]  // > CustomCode.setup:184
    x[2]= xcell[55];  // > CustomCode.setup:185
    y[2]= ycell[55]  // > CustomCode.setup:186
    x[3]= xcell[56];  // > CustomCode.setup:187
    y[3]= ycell[56]   // > CustomCode.setup:188
    x[4]= xcell[65];// up next row  // > CustomCode.setup:189
    y[4]= ycell[65]  // > CustomCode.setup:190
      // > CustomCode.setup:191
      // > CustomCode.setup:192
  }  // > CustomCode.setup:193
  if (counter==12){  // > CustomCode.setup:194
  //  if (counter==0){  // > CustomCode.setup:195
  //manual laying from theresa in document  // > CustomCode.setup:196
   x[0]= xcell[44];  // > CustomCode.setup:197
    y[0]= ycell[44]  // > CustomCode.setup:198
  x[1]= xcell[54]; // up next row  // > CustomCode.setup:199
    y[1]= ycell[54]  // > CustomCode.setup:200
    x[2]= xcell[55];  // > CustomCode.setup:201
    y[2]= ycell[55]  // > CustomCode.setup:202
    x[3]= xcell[56];  // > CustomCode.setup:203
    y[3]= ycell[56]   // > CustomCode.setup:204
    x[4]= xcell[66];// up next row  // > CustomCode.setup:205
    y[4]= ycell[66]  // > CustomCode.setup:206
      // > CustomCode.setup:207
      // > CustomCode.setup:208
  }  // > CustomCode.setup:209
  if (counter==13){  // > CustomCode.setup:210
  //  if (counter==0){  // > CustomCode.setup:211
  //manual laying from theresa in document  // > CustomCode.setup:212
   x[0]= xcell[44];  // > CustomCode.setup:213
    y[0]= ycell[44]  // > CustomCode.setup:214
  x[1]= xcell[54]; // up next row  // > CustomCode.setup:215
    y[1]= ycell[54]  // > CustomCode.setup:216
    x[2]= xcell[55];  // > CustomCode.setup:217
    y[2]= ycell[55]  // > CustomCode.setup:218
    x[3]= xcell[56];  // > CustomCode.setup:219
    y[3]= ycell[56]   // > CustomCode.setup:220
    x[4]= xcell[65];// up next row  // > CustomCode.setup:221
    y[4]= ycell[65]  // > CustomCode.setup:222
      // > CustomCode.setup:223
      // > CustomCode.setup:224
  }  // > CustomCode.setup:225
  if (counter==14){  // > CustomCode.setup:226
  //  if (counter==0){  // > CustomCode.setup:227
  //manual laying from theresa in document  // > CustomCode.setup:228
   x[0]= xcell[44];  // > CustomCode.setup:229
    y[0]= ycell[44]  // > CustomCode.setup:230
  x[1]= xcell[54]; // up next row  // > CustomCode.setup:231
    y[1]= ycell[54]  // > CustomCode.setup:232
    x[2]= xcell[55];  // > CustomCode.setup:233
    y[2]= ycell[55]  // > CustomCode.setup:234
    x[3]= xcell[56];  // > CustomCode.setup:235
    y[3]= ycell[56]   // > CustomCode.setup:236
    x[4]= xcell[64];// up next row  // > CustomCode.setup:237
    y[4]= ycell[64]  // > CustomCode.setup:238
      // > CustomCode.setup:239
      // > CustomCode.setup:240
  }  // > CustomCode.setup:241
  if (counter==15){  // > CustomCode.setup:242
  //  if (counter==0){  // > CustomCode.setup:243
  //manual laying from theresa in document  // > CustomCode.setup:244
   x[0]= xcell[44];  // > CustomCode.setup:245
    y[0]= ycell[44]  // > CustomCode.setup:246
  x[1]= xcell[45]; // up next row  // > CustomCode.setup:247
    y[1]= ycell[45]  // > CustomCode.setup:248
    x[2]= xcell[54];  // > CustomCode.setup:249
    y[2]= ycell[54]  // > CustomCode.setup:250
    x[3]= xcell[55];  // > CustomCode.setup:251
    y[3]= ycell[55]   // > CustomCode.setup:252
    x[4]= xcell[56];// up next row  // > CustomCode.setup:253
    y[4]= ycell[56]  // > CustomCode.setup:254
     x[5]= xcell[64];// up next row  // > CustomCode.setup:255
    y[5]= ycell[64]  // > CustomCode.setup:256
      // > CustomCode.setup:257
  }  // > CustomCode.setup:258
  if (counter==16){  // > CustomCode.setup:259
  //  if (counter==0){  // > CustomCode.setup:260
  //manual laying from theresa in document  // > CustomCode.setup:261
   x[0]= xcell[43];  // > CustomCode.setup:262
    y[0]= ycell[43]  // > CustomCode.setup:263
  x[1]= xcell[44]; // up next row  // > CustomCode.setup:264
    y[1]= ycell[44]  // > CustomCode.setup:265
    x[2]= xcell[45];  // > CustomCode.setup:266
    y[2]= ycell[45]  // > CustomCode.setup:267
    x[3]= xcell[46];  // > CustomCode.setup:268
    y[3]= ycell[46]   // > CustomCode.setup:269
    x[4]= xcell[55];// up next row  // > CustomCode.setup:270
    y[4]= ycell[55]  // > CustomCode.setup:271
     x[5]= xcell[56];// up next row  // > CustomCode.setup:272
    y[5]= ycell[56]  // > CustomCode.setup:273
     x[6]= xcell[65];// up next row  // > CustomCode.setup:274
    y[6]= ycell[65]  // > CustomCode.setup:275
      // > CustomCode.setup:276
  }  // > CustomCode.setup:277
  if (counter==17){  // > CustomCode.setup:278
  //  if (counter==0){  // > CustomCode.setup:279
  //manual laying from theresa in document  // > CustomCode.setup:280
   x[0]= xcell[43];  // > CustomCode.setup:281
    y[0]= ycell[43]  // > CustomCode.setup:282
  x[1]= xcell[44]; // up next row  // > CustomCode.setup:283
    y[1]= ycell[44]  // > CustomCode.setup:284
    x[2]= xcell[45];  // > CustomCode.setup:285
    y[2]= ycell[45]  // > CustomCode.setup:286
    x[3]= xcell[46];  // > CustomCode.setup:287
    y[3]= ycell[46]   // > CustomCode.setup:288
    x[4]= xcell[54];// up next row  // > CustomCode.setup:289
    y[4]= ycell[54]  // > CustomCode.setup:290
     x[5]= xcell[55];// up next row  // > CustomCode.setup:291
    y[5]= ycell[55]  // > CustomCode.setup:292
     x[6]= xcell[56];// up next row  // > CustomCode.setup:293
    y[6]= ycell[56]  // > CustomCode.setup:294
      // > CustomCode.setup:295
  }  // > CustomCode.setup:296
  if (counter==18){  // > CustomCode.setup:297
  //  if (counter==0){  // > CustomCode.setup:298
  //manual laying from theresa in document  // > CustomCode.setup:299
   x[0]= xcell[44];  // > CustomCode.setup:300
    y[0]= ycell[44]  // > CustomCode.setup:301
  x[1]= xcell[53]; // up next row  // > CustomCode.setup:302
    y[1]= ycell[53]  // > CustomCode.setup:303
    x[2]= xcell[54];  // > CustomCode.setup:304
    y[2]= ycell[54]  // > CustomCode.setup:305
    x[3]= xcell[55];  // > CustomCode.setup:306
    y[3]= ycell[55]   // > CustomCode.setup:307
    x[4]= xcell[56];// up next row  // > CustomCode.setup:308
    y[4]= ycell[56]  // > CustomCode.setup:309
     x[5]= xcell[64];// up next row  // > CustomCode.setup:310
    y[5]= ycell[64]  // > CustomCode.setup:311
     x[6]= xcell[65];// up next row  // > CustomCode.setup:312
    y[6]= ycell[65]  // > CustomCode.setup:313
    x[7]= xcell[66];// up next row  // > CustomCode.setup:314
    y[7]= ycell[66]  // > CustomCode.setup:315
      // > CustomCode.setup:316
  }  // > CustomCode.setup:317
  if (counter==19){  // > CustomCode.setup:318
  //  if (counter==0){  // > CustomCode.setup:319
  //manual laying from theresa in document  // > CustomCode.setup:320
   x[0]= xcell[45];  // > CustomCode.setup:321
    y[0]= ycell[45]  // > CustomCode.setup:322
  x[1]= xcell[53]; // up next row  // > CustomCode.setup:323
    y[1]= ycell[53]  // > CustomCode.setup:324
    x[2]= xcell[54];  // > CustomCode.setup:325
    y[2]= ycell[54]  // > CustomCode.setup:326
    x[3]= xcell[55];  // > CustomCode.setup:327
    y[3]= ycell[55]   // > CustomCode.setup:328
    x[4]= xcell[56];// up next row  // > CustomCode.setup:329
    y[4]= ycell[56]  // > CustomCode.setup:330
     x[5]= xcell[64];// up next row  // > CustomCode.setup:331
    y[5]= ycell[64]  // > CustomCode.setup:332
     x[6]= xcell[65];// up next row  // > CustomCode.setup:333
    y[6]= ycell[65]  // > CustomCode.setup:334
    x[7]= xcell[66];// up next row  // > CustomCode.setup:335
    y[7]= ycell[66]  // > CustomCode.setup:336
      // > CustomCode.setup:337
  }  // > CustomCode.setup:338
  if (counter==20){  // > CustomCode.setup:339
  //  if (counter==0){  // > CustomCode.setup:340
  //manual laying from theresa in document  // > CustomCode.setup:341
   x[0]= xcell[44];  // > CustomCode.setup:342
    y[0]= ycell[44]  // > CustomCode.setup:343
  x[1]= xcell[52]; // up next row  // > CustomCode.setup:344
    y[1]= ycell[52]  // > CustomCode.setup:345
    x[2]= xcell[53];  // > CustomCode.setup:346
    y[2]= ycell[53]  // > CustomCode.setup:347
    x[3]= xcell[54];  // > CustomCode.setup:348
    y[3]= ycell[54]   // > CustomCode.setup:349
    x[4]= xcell[62];// up next row  // > CustomCode.setup:350
    y[4]= ycell[62]  // > CustomCode.setup:351
     x[5]= xcell[64];// up next row  // > CustomCode.setup:352
    y[5]= ycell[64]  // > CustomCode.setup:353
     // > CustomCode.setup:354
      // > CustomCode.setup:355
  }  // > CustomCode.setup:356
  if (counter==21){  // > CustomCode.setup:357
  //  if (counter==0){  // > CustomCode.setup:358
  //manual laying from theresa in document  // > CustomCode.setup:359
   x[0]= xcell[44];  // > CustomCode.setup:360
    y[0]= ycell[44]  // > CustomCode.setup:361
  x[1]= xcell[46]; // up next row  // > CustomCode.setup:362
    y[1]= ycell[46]  // > CustomCode.setup:363
    x[2]= xcell[53];  // > CustomCode.setup:364
    y[2]= ycell[53]  // > CustomCode.setup:365
    x[3]= xcell[54];  // > CustomCode.setup:366
    y[3]= ycell[54]   // > CustomCode.setup:367
    x[4]= xcell[55];// up next row  // > CustomCode.setup:368
    y[4]= ycell[55]  // > CustomCode.setup:369
     x[5]= xcell[56];// up next row  // > CustomCode.setup:370
    y[5]= ycell[56]  // > CustomCode.setup:371
     x[6]= xcell[64];// up next row  // > CustomCode.setup:372
    y[6]= ycell[64]  // > CustomCode.setup:373
     x[7]= xcell[66];// up next row  // > CustomCode.setup:374
    y[7]= ycell[66]  // > CustomCode.setup:375
      x[8]= xcell[57];// up next row  // > CustomCode.setup:376
    y[8]= ycell[57]  // > CustomCode.setup:377
     // > CustomCode.setup:378
      // > CustomCode.setup:379
  }  // > CustomCode.setup:380
  if (counter==22){  // > CustomCode.setup:381
  //  if (counter==0){  // > CustomCode.setup:382
  //manual laying from theresa in document  // > CustomCode.setup:383
  // x[0]= xcell[44];  // > CustomCode.setup:384
   // y[0]= ycell[44]  // > CustomCode.setup:385
  x[1]= xcell[52]; // up next row  // > CustomCode.setup:386
    y[1]= ycell[52]  // > CustomCode.setup:387
    x[2]= xcell[53];  // > CustomCode.setup:388
    y[2]= ycell[53]  // > CustomCode.setup:389
    x[3]= xcell[54];  // > CustomCode.setup:390
    y[3]= ycell[54]   // > CustomCode.setup:391
    x[4]= xcell[62];// up next row  // > CustomCode.setup:392
    y[4]= ycell[62]  // > CustomCode.setup:393
     x[5]= xcell[64];// up next row  // > CustomCode.setup:394
    y[5]= ycell[64]  // > CustomCode.setup:395
     // > CustomCode.setup:396
      // > CustomCode.setup:397
  }  // > CustomCode.setup:398
  if (counter==23){  // > CustomCode.setup:399
  //  if (counter==0){  // > CustomCode.setup:400
  //manual laying from theresa in document  // > CustomCode.setup:401
   x[0]= xcell[32];  // > CustomCode.setup:402
    y[0]= ycell[32]  // > CustomCode.setup:403
  x[1]= xcell[34]; // up next row  // > CustomCode.setup:404
    y[1]= ycell[34]  // > CustomCode.setup:405
    x[2]= xcell[42];  // > CustomCode.setup:406
    y[2]= ycell[42]  // > CustomCode.setup:407
    x[3]= xcell[44];  // > CustomCode.setup:408
    y[3]= ycell[44]   // > CustomCode.setup:409
    x[4]= xcell[52];// up next row  // > CustomCode.setup:410
    y[4]= ycell[52]  // > CustomCode.setup:411
     x[5]= xcell[53];// up next row  // > CustomCode.setup:412
    y[5]= ycell[53]  // > CustomCode.setup:413
     x[6]= xcell[54];// up next row  // > CustomCode.setup:414
    y[6]= ycell[54]  // > CustomCode.setup:415
     x[7]= xcell[62];// up next row  // > CustomCode.setup:416
    y[7]= ycell[62]  // > CustomCode.setup:417
      x[8]= xcell[64];// up next row  // > CustomCode.setup:418
    y[8]= ycell[64]  // > CustomCode.setup:419
     x[9]= xcell[72];// up next row  // > CustomCode.setup:420
    y[9]= ycell[72]  // > CustomCode.setup:421
      x[10]= xcell[74];// up next row  // > CustomCode.setup:422
    y[10]= ycell[74]  // > CustomCode.setup:423
      // > CustomCode.setup:424
  }  // > CustomCode.setup:425
  if (counter==24){  // > CustomCode.setup:426
  //  if (counter==0){  // > CustomCode.setup:427
  //manual laying from theresa in document  // > CustomCode.setup:428
   x[0]= xcell[33];  // > CustomCode.setup:429
    y[0]= ycell[33]  // > CustomCode.setup:430
  x[1]= xcell[34]; // up next row  // > CustomCode.setup:431
    y[1]= ycell[34]  // > CustomCode.setup:432
    x[2]= xcell[35];  // > CustomCode.setup:433
    y[2]= ycell[35]  // > CustomCode.setup:434
    x[3]= xcell[44];  // > CustomCode.setup:435
    y[3]= ycell[44]   // > CustomCode.setup:436
    x[4]= xcell[54];// up next row  // > CustomCode.setup:437
    y[4]= ycell[54]  // > CustomCode.setup:438
     x[5]= xcell[63];// up next row  // > CustomCode.setup:439
    y[5]= ycell[63]  // > CustomCode.setup:440
     x[6]= xcell[64];// up next row  // > CustomCode.setup:441
    y[6]= ycell[64]  // > CustomCode.setup:442
     x[7]= xcell[65];// up next row  // > CustomCode.setup:443
    y[7]= ycell[65]  // > CustomCode.setup:444
     // > CustomCode.setup:445
      // > CustomCode.setup:446
  }  // > CustomCode.setup:447
  if (counter==25){  // > CustomCode.setup:448
  //  if (counter==0){  // > CustomCode.setup:449
  //manual laying from theresa in document  // > CustomCode.setup:450
   x[0]= xcell[33];  // > CustomCode.setup:451
    y[0]= ycell[33]  // > CustomCode.setup:452
  x[1]= xcell[34]; // up next row  // > CustomCode.setup:453
    y[1]= ycell[34]  // > CustomCode.setup:454
    x[2]= xcell[35];  // > CustomCode.setup:455
    y[2]= ycell[35]  // > CustomCode.setup:456
    x[3]= xcell[45];  // > CustomCode.setup:457
    y[3]= ycell[45]   // > CustomCode.setup:458
    x[4]= xcell[55];// up next row  // > CustomCode.setup:459
    y[4]= ycell[55]  // > CustomCode.setup:460
     x[5]= xcell[54];// up next row  // > CustomCode.setup:461
    y[5]= ycell[54]  // > CustomCode.setup:462
     x[6]= xcell[53];// up next row  // > CustomCode.setup:463
    y[6]= ycell[53]  // > CustomCode.setup:464
     x[7]= xcell[63];// up next row  // > CustomCode.setup:465
    y[7]= ycell[63]  // > CustomCode.setup:466
     x[8]= xcell[73];// up next row  // > CustomCode.setup:467
    y[8]= ycell[73]  // > CustomCode.setup:468
     x[9]= xcell[74];// up next row  // > CustomCode.setup:469
    y[9]= ycell[74]  // > CustomCode.setup:470
      x[10]= xcell[75];// up next row  // > CustomCode.setup:471
    y[10]= ycell[75]  // > CustomCode.setup:472
      // > CustomCode.setup:473
  }  // > CustomCode.setup:474
  if (counter==26){  // > CustomCode.setup:475
  //  if (counter==0){  // > CustomCode.setup:476
  //manual laying from theresa in document  // > CustomCode.setup:477
   x[0]= xcell[33];  // > CustomCode.setup:478
    y[0]= ycell[33]  // > CustomCode.setup:479
  x[1]= xcell[34]; // up next row  // > CustomCode.setup:480
    y[1]= ycell[34]  // > CustomCode.setup:481
    x[2]= xcell[36];  // > CustomCode.setup:482
    y[2]= ycell[36]  // > CustomCode.setup:483
    x[3]= xcell[43];  // > CustomCode.setup:484
    y[3]= ycell[43]   // > CustomCode.setup:485
    x[4]= xcell[44];// up next row  // > CustomCode.setup:486
    y[4]= ycell[44]  // > CustomCode.setup:487
     x[5]= xcell[45];// up next row  // > CustomCode.setup:488
    y[5]= ycell[45]  // > CustomCode.setup:489
     x[6]= xcell[46];// up next row  // > CustomCode.setup:490
    y[6]= ycell[46]  // > CustomCode.setup:491
     x[7]= xcell[54];// up next row  // > CustomCode.setup:492
    y[7]= ycell[54]  // > CustomCode.setup:493
     x[8]= xcell[55];// up next row  // > CustomCode.setup:494
    y[8]= ycell[55]  // > CustomCode.setup:495
     x[9]= xcell[56];// up next row  // > CustomCode.setup:496
    y[9]= ycell[56]  // > CustomCode.setup:497
   //   x[10]= xcell[75];// up next row  // > CustomCode.setup:498
   // y[10]= ycell[75]  // > CustomCode.setup:499
      // > CustomCode.setup:500
  }  // > CustomCode.setup:501
  if (counter==27){  // > CustomCode.setup:502
  //  if (counter==0){  // > CustomCode.setup:503
  //manual laying from theresa in document  // > CustomCode.setup:504
   x[0]= xcell[34];  // > CustomCode.setup:505
    y[0]= ycell[34]  // > CustomCode.setup:506
  x[1]= xcell[36]; // up next row  // > CustomCode.setup:507
    y[1]= ycell[36]  // > CustomCode.setup:508
    x[2]= xcell[43];  // > CustomCode.setup:509
    y[2]= ycell[43]  // > CustomCode.setup:510
    x[3]= xcell[44];  // > CustomCode.setup:511
    y[3]= ycell[44]   // > CustomCode.setup:512
    x[4]= xcell[45];// up next row  // > CustomCode.setup:513
    y[4]= ycell[45]  // > CustomCode.setup:514
     x[5]= xcell[46];// up next row  // > CustomCode.setup:515
    y[5]= ycell[46]  // > CustomCode.setup:516
     x[6]= xcell[47];// up next row  // > CustomCode.setup:517
    y[6]= ycell[47]  // > CustomCode.setup:518
     x[7]= xcell[54];// up next row  // > CustomCode.setup:519
    y[7]= ycell[54]  // > CustomCode.setup:520
     x[8]= xcell[55];// up next row  // > CustomCode.setup:521
    y[8]= ycell[55]  // > CustomCode.setup:522
     x[9]= xcell[56];// up next row  // > CustomCode.setup:523
    y[9]= ycell[56]  // > CustomCode.setup:524
   //   x[10]= xcell[75];// up next row  // > CustomCode.setup:525
   // y[10]= ycell[75]  // > CustomCode.setup:526
      // > CustomCode.setup:527
  }  // > CustomCode.setup:528
  if (counter==28){  // > CustomCode.setup:529
  //  if (counter==0){  // > CustomCode.setup:530
  //manual laying from theresa in document  // > CustomCode.setup:531
   x[0]= xcell[36];  // > CustomCode.setup:532
    y[0]= ycell[36]  // > CustomCode.setup:533
  x[1]= xcell[44]; // up next row  // > CustomCode.setup:534
    y[1]= ycell[44]  // > CustomCode.setup:535
    x[2]= xcell[45];  // > CustomCode.setup:536
    y[2]= ycell[45]  // > CustomCode.setup:537
    x[3]= xcell[46];  // > CustomCode.setup:538
    y[3]= ycell[46]   // > CustomCode.setup:539
    x[4]= xcell[54];// up next row  // > CustomCode.setup:540
    y[4]= ycell[54]  // > CustomCode.setup:541
     x[5]= xcell[56];// up next row  // > CustomCode.setup:542
    y[5]= ycell[56]  // > CustomCode.setup:543
      // > CustomCode.setup:544
      // > CustomCode.setup:545
  }  // > CustomCode.setup:546
  if (counter==29){  // > CustomCode.setup:547
  //  if (counter==0){  // > CustomCode.setup:548
  //manual laying from theresa in document  // > CustomCode.setup:549
   x[0]= xcell[44];  // > CustomCode.setup:550
    y[0]= ycell[44]  // > CustomCode.setup:551
  x[1]= xcell[45]; // up next row  // > CustomCode.setup:552
    y[1]= ycell[45]  // > CustomCode.setup:553
    x[2]= xcell[46];  // > CustomCode.setup:554
    y[2]= ycell[46]  // > CustomCode.setup:555
    x[3]= xcell[54];  // > CustomCode.setup:556
    y[3]= ycell[54]   // > CustomCode.setup:557
    x[4]= xcell[56];// up next row  // > CustomCode.setup:558
    y[4]= ycell[56]  // > CustomCode.setup:559
     x[5]= xcell[57];// up next row  // > CustomCode.setup:560
    y[5]= ycell[57]  // > CustomCode.setup:561
      // > CustomCode.setup:562
      // > CustomCode.setup:563
  }  // > CustomCode.setup:564
  if (counter==30){  // > CustomCode.setup:565
  //  if (counter==0){  // > CustomCode.setup:566
  //manual laying from theresa in document  // > CustomCode.setup:567
   x[0]= xcell[44];  // > CustomCode.setup:568
    y[0]= ycell[44]  // > CustomCode.setup:569
  x[1]= xcell[45]; // up next row  // > CustomCode.setup:570
    y[1]= ycell[45]  // > CustomCode.setup:571
    x[2]= xcell[46];  // > CustomCode.setup:572
    y[2]= ycell[46]  // > CustomCode.setup:573
    x[3]= xcell[54];  // > CustomCode.setup:574
    y[3]= ycell[54]   // > CustomCode.setup:575
    x[4]= xcell[56];// up next row  // > CustomCode.setup:576
    y[4]= ycell[56]  // > CustomCode.setup:577
     x[5]= xcell[57];// up next row  // > CustomCode.setup:578
    y[5]= ycell[57]  // > CustomCode.setup:579
     x[6]= xcell[55];// up next row  // > CustomCode.setup:580
    y[6]= ycell[55]  // > CustomCode.setup:581
      // > CustomCode.setup:582
      // > CustomCode.setup:583
  }  // > CustomCode.setup:584
  if (counter>30){  // > CustomCode.setup:585
  //rectangle  // > CustomCode.setup:586
  var lengthx =Math.ceil(Math.random()*8);  // > CustomCode.setup:587
  var lengthy =Math.ceil(Math.random()*8)  // > CustomCode.setup:588
  for (var i=0; i<lengthx*lengthy ; i++) { // square 8x8  // > CustomCode.setup:589
  var start =11  // > CustomCode.setup:590
  //var squareside = 6  // > CustomCode.setup:591
  x[i]= xcell[start+Math.floor(i/lengthx)*10+i%lengthx]  // > CustomCode.setup:592
    y[i]= ycell[start+Math.floor(i/lengthx)*10+i%lengthx]  // > CustomCode.setup:593
  }  // > CustomCode.setup:594
  }  // > CustomCode.setup:595
  }  // > CustomCode.setup:596

  get_random = function (list) {  // > CustomCode.get_random:1
    return list[Math.floor((Math.random()*list.length))];  // > CustomCode.get_random:2
  }   // > CustomCode.get_random:3

  //https://stackoverflow.com/questions/56175595/how-to-calculate-total-perimeter-of-shapes-in-javascript-exercise-and-write-prop  // > CustomCode.numOfNeighbour perimeter:1
  function numOfNeighbour( mat,  i,  j,rows,cols)// usage numOfNeighbour(mat,  i,   j,10,10);  // > CustomCode.numOfNeighbour perimeter:2
  {   // > CustomCode.numOfNeighbour perimeter:3
      var count = 0;     // > CustomCode.numOfNeighbour perimeter:4
      // UP   // > CustomCode.numOfNeighbour perimeter:5
      if (i > 0  && mat[i - 1][j]===1)   // > CustomCode.numOfNeighbour perimeter:6
          count++;   // > CustomCode.numOfNeighbour perimeter:7
      // LEFT   // > CustomCode.numOfNeighbour perimeter:8
      if (j > 0  && mat[i][j - 1]===1)           // > CustomCode.numOfNeighbour perimeter:9
          count++;   // > CustomCode.numOfNeighbour perimeter:10
      // DOWN   // > CustomCode.numOfNeighbour perimeter:11
      if (i < rows-1  && mat[i + 1][j]===1)           // > CustomCode.numOfNeighbour perimeter:12
          count++;   // > CustomCode.numOfNeighbour perimeter:13
      // RIGHT   // > CustomCode.numOfNeighbour perimeter:14
      if (j < cols-1 && mat[i][j + 1]===1)           // > CustomCode.numOfNeighbour perimeter:15
          count++;   // > CustomCode.numOfNeighbour perimeter:16
      return count;   // > CustomCode.numOfNeighbour perimeter:17
  }   // > CustomCode.numOfNeighbour perimeter:18
  function findPerimeter( mat)   // > CustomCode.numOfNeighbour perimeter:19
  {   // > CustomCode.numOfNeighbour perimeter:20
      var perimeter = 0;   // > CustomCode.numOfNeighbour perimeter:21
      var rows=mat.length;  // > CustomCode.numOfNeighbour perimeter:22
      var cols=mat[0].length;  // > CustomCode.numOfNeighbour perimeter:23
      // Traversing the matrix and finding ones to   // > CustomCode.numOfNeighbour perimeter:24
      // calculate their contribution.   // > CustomCode.numOfNeighbour perimeter:25
      for (var i = 0; i < rows; i++)   // > CustomCode.numOfNeighbour perimeter:26
          for (var j = 0; j < cols; j++)   // > CustomCode.numOfNeighbour perimeter:27
             // if (mat[i][j] && mat[i][j]==='X')   // > CustomCode.numOfNeighbour perimeter:28
              if (mat[i][j] && mat[i][j]===1)  //change to 1  // > CustomCode.numOfNeighbour perimeter:29
                  perimeter += (4 - numOfNeighbour(mat, i ,j,rows,cols));   // > CustomCode.numOfNeighbour perimeter:30
      return perimeter;   // > CustomCode.numOfNeighbour perimeter:31
  }   // > CustomCode.numOfNeighbour perimeter:32

  function cal_perimeter () {  // > CustomCode.cal_perimeter:1
  // set to zero first then count  // > CustomCode.cal_perimeter:2
  //var count  // > CustomCode.cal_perimeter:3
  //count=0  // > CustomCode.cal_perimeter:4
  var i ,j  // > CustomCode.cal_perimeter:5
  numOfNeighbour(mat,  i,   j,10,10);  // > CustomCode.cal_perimeter:6
  perimeter =findPerimeter(mat);  // > CustomCode.cal_perimeter:7
  // set to zero first then count  // > CustomCode.cal_perimeter:8
  for (var i=0; i<n ; i++) {  // > CustomCode.cal_perimeter:9
    lengthxbottom[i]= 0;  // > CustomCode.cal_perimeter:10
    allowed[i]=0;  // > CustomCode.cal_perimeter:11
    }  // > CustomCode.cal_perimeter:12
  for (var i=0; i<n ; i++) {  // > CustomCode.cal_perimeter:13
    //count =occupied[i]+count;  // > CustomCode.cal_perimeter:14
    //perimeter bottom  // > CustomCode.cal_perimeter:15
    if (occupied[i]==1&&occupied[i-10]==1) { // check bottom neighbour if something draw thin solid line  // > CustomCode.cal_perimeter:16
      lengthxbottom[i]= 1; // draw bottom line thin  // > CustomCode.cal_perimeter:17
      linewidth[i] = 1;  // > CustomCode.cal_perimeter:18
      lineattribute[i] = { "stroke-dasharray":"8 8" } //dotted  // > CustomCode.cal_perimeter:19
        // > CustomCode.cal_perimeter:20
    }  // > CustomCode.cal_perimeter:21
    else if (occupied[i]==1&&occupied[i-10]==0) { //check bottom of it has block if ntg draw thick solid line  // > CustomCode.cal_perimeter:22
      lengthxbottom[i]= 1; // draw bottom line thick  // > CustomCode.cal_perimeter:23
      linewidth[i] = 4;  // > CustomCode.cal_perimeter:24
      lineattribute[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:25
      allowed[i-10]=1;// use the allowed boolean to allow dragging to the position  // > CustomCode.cal_perimeter:26
    }  // > CustomCode.cal_perimeter:27
     else {  // > CustomCode.cal_perimeter:28
    lengthxbottom[i]= 0;  // > CustomCode.cal_perimeter:29
    lineattribute[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:30
      // > CustomCode.cal_perimeter:31
    }  // > CustomCode.cal_perimeter:32
      // > CustomCode.cal_perimeter:33
    //perimeter top  // > CustomCode.cal_perimeter:34
    if (occupied[i]==1&&occupied[i+10]==1) { // check  neighbour if something draw thin  // > CustomCode.cal_perimeter:35
      lengthxtop[i]= 1; // draw bottom line thick  // > CustomCode.cal_perimeter:36
      linewidthtop[i] = 1;  // > CustomCode.cal_perimeter:37
     lineattributetop[i] = { "stroke-dasharray":"8 8" } //dotted  // > CustomCode.cal_perimeter:38
        // > CustomCode.cal_perimeter:39
    }  // > CustomCode.cal_perimeter:40
    else if (occupied[i]==1&&occupied[i+10]==0) { //check  of it has block if ntg draw thick  // > CustomCode.cal_perimeter:41
      lengthxtop[i]= 1; // draw top line unit 1  // > CustomCode.cal_perimeter:42
      linewidthtop[i] = 4;  // > CustomCode.cal_perimeter:43
      lineattributetop[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:44
      allowed[i+10]=1;// use the allowed boolean to allow dragging to the position  // > CustomCode.cal_perimeter:45
     //  lineattribute[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:46
    }  // > CustomCode.cal_perimeter:47
     else {  // > CustomCode.cal_perimeter:48
    lengthxtop[i]= 0;  // > CustomCode.cal_perimeter:49
    lineattributetop[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:50
   //  lineattribute[i] = { "stroke-dasharray":"8 0" }//solid  // > CustomCode.cal_perimeter:51
      // > CustomCode.cal_perimeter:52
    }  // > CustomCode.cal_perimeter:53
      // > CustomCode.cal_perimeter:54
    //perimeter left  // > CustomCode.cal_perimeter:55
    if (occupied[i]==1&&occupied[i-1]==1) { // check  neighbour if something draw thin  // > CustomCode.cal_perimeter:56
      lengthxleft[i]= 1; // draw bottom line thick  // > CustomCode.cal_perimeter:57
      linewidthleft[i] = 1;  // > CustomCode.cal_perimeter:58
       lineattributeleft[i] = { "stroke-dasharray":"8 8" } //dotted  // > CustomCode.cal_perimeter:59
    }  // > CustomCode.cal_perimeter:60
    else if (occupied[i]==1&&occupied[i-1]==0) { //check of it has block if ntg draw thick  // > CustomCode.cal_perimeter:61
      lengthxleft[i]= 1; // draw top line unit 1  // > CustomCode.cal_perimeter:62
      linewidthleft[i] = 4;  // > CustomCode.cal_perimeter:63
      lineattributeleft[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:64
      if ((i%10==0) ){allowed[i-1]=0;} // to detect 11,21,31,41,etc....  // > CustomCode.cal_perimeter:65
      else {  // > CustomCode.cal_perimeter:66
        allowed[i-1]=1;  // > CustomCode.cal_perimeter:67
        }// use the allowed boolean to allow dragging to the position  // > CustomCode.cal_perimeter:68
    }  // > CustomCode.cal_perimeter:69
     else {  // > CustomCode.cal_perimeter:70
    lengthxleft[i]= 0;  // > CustomCode.cal_perimeter:71
    lineattributeleft[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:72
      // > CustomCode.cal_perimeter:73
    }  // > CustomCode.cal_perimeter:74
      // > CustomCode.cal_perimeter:75
    //perimeter right  // > CustomCode.cal_perimeter:76
    if (occupied[i]==1&&occupied[i+1]==1) { // check bottom neighbour if something draw thin  // > CustomCode.cal_perimeter:77
      lengthxright[i]= 1; // draw bottom line thick  // > CustomCode.cal_perimeter:78
      linewidthright[i] = 1;  // > CustomCode.cal_perimeter:79
       lineattributeright[i] = { "stroke-dasharray":"8 8" } //dotted  // > CustomCode.cal_perimeter:80
    }  // > CustomCode.cal_perimeter:81
    else if (occupied[i]==1&&occupied[i+1]==0) { //check bottom of it has block if ntg draw thick  // > CustomCode.cal_perimeter:82
      lengthxright[i]= 1; // draw top line unit 1  // > CustomCode.cal_perimeter:83
      linewidthright[i] = 4;  // > CustomCode.cal_perimeter:84
      lineattributeright[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:85
      if ((i%10==9) ){allowed[i+1]=0;}  // > CustomCode.cal_perimeter:86
      else{  // > CustomCode.cal_perimeter:87
        allowed[i+1]=1;  // > CustomCode.cal_perimeter:88
        }// use the allowed boolean to allow dragging to the position  // > CustomCode.cal_perimeter:89
    }  // > CustomCode.cal_perimeter:90
     else {  // > CustomCode.cal_perimeter:91
    lengthxright[i]= 0;  // > CustomCode.cal_perimeter:92
    lineattributeright[i] = { "stroke-dasharray":"8 0" } //solid  // > CustomCode.cal_perimeter:93
    }  // > CustomCode.cal_perimeter:94
  }  // > CustomCode.cal_perimeter:95
  //area = count;  // > CustomCode.cal_perimeter:96
  //from fu kwun  // > CustomCode.cal_perimeter:97
  /*  // > CustomCode.cal_perimeter:98
  //assume each area has it's own color  // > CustomCode.cal_perimeter:99
  perimeter=0;  // > CustomCode.cal_perimeter:100
  for(i=0; i<n;i++){// for loop for each square block for blue object  // > CustomCode.cal_perimeter:101
     check if the block at the right hand side is the same color as blue,   // > CustomCode.cal_perimeter:102
      if it is the same then   perimeter=perimeter+1;  // > CustomCode.cal_perimeter:103
     check if the block at the keft hand side is the same color as blue,   // > CustomCode.cal_perimeter:104
      if it is the same then   perimeter=perimeter+1;  // > CustomCode.cal_perimeter:105
     check if the block one level up is the same color as blue,   // > CustomCode.cal_perimeter:106
      if it is the same then   perimeter=perimeter+1;  // > CustomCode.cal_perimeter:107
     check if the block one level down is the same color as blue,   // > CustomCode.cal_perimeter:108
      if it is the same then   perimeter=perimeter+1;  // > CustomCode.cal_perimeter:109
  }  // > CustomCode.cal_perimeter:110
  then you get the value for perimeter  // > CustomCode.cal_perimeter:111
  I hope you can get my idea.  // > CustomCode.cal_perimeter:112
  */  // > CustomCode.cal_perimeter:113
  }  // > CustomCode.cal_perimeter:114

  //unused  // > CustomCode.movedtoallowedposition:1
  function movedtoallowedposition () {  // > CustomCode.movedtoallowedposition:2
  for (var i=0; i<ncell ; i++) {  // > CustomCode.movedtoallowedposition:3
  //for (var j=0; j<ncell ; j++) {  // > CustomCode.movedtoallowedposition:4
  //incomplete  // > CustomCode.movedtoallowedposition:5
  if (occupied[i]==1){ // occupied true  // > CustomCode.movedtoallowedposition:6
    //alert(i);  // > CustomCode.movedtoallowedposition:7
   // x[elementinteracted] = xcell[i+1]  // > CustomCode.movedtoallowedposition:8
   // y[elementinteracted] = ycell[i+1]  // > CustomCode.movedtoallowedposition:9
      // > CustomCode.movedtoallowedposition:10
      // > CustomCode.movedtoallowedposition:11
    }  // > CustomCode.movedtoallowedposition:12
  }  // > CustomCode.movedtoallowedposition:13
  //}  // > CustomCode.movedtoallowedposition:14
  }  // > CustomCode.movedtoallowedposition:15

  function collision () {  // > CustomCode.collision:1
  //duplicate code to increase stable behavoir  // > CustomCode.collision:2
  //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection  // > CustomCode.collision:3
  //var circle1 = {radius: 20, x: 5, y: 5};  // > CustomCode.collision:4
  //var circle2 = {radius: 12, x: 10, y: 5};  // > CustomCode.collision:5
  //1 electrons on 1st rowelectrons  // > CustomCode.collision:6
  for (var i=0; i<ncell ; i++) {   // > CustomCode.collision:7
  var position= position = _view.plottingPanel.getInteraction().getInteractionPoint();  // > CustomCode.collision:8
  x[elementinteracted]=position[0]; // assign mouse position to interacted position  // > CustomCode.collision:9
  y[elementinteracted]=position[1];  // > CustomCode.collision:10
  var dx = x[elementinteracted] - xcell[i];  // > CustomCode.collision:11
  var dy = y[elementinteracted] - ycell[i];  // > CustomCode.collision:12
  var distance = Math.sqrt(dx * dx + dy * dy);  // > CustomCode.collision:13
  if (distance <= 1&&occupied[i]==1) {  // > CustomCode.collision:14
   angleRadians = Math.atan2(y[elementinteracted] - ycell[i], x[elementinteracted] - xcell[i]);  // > CustomCode.collision:15
  var spacing=1;  // > CustomCode.collision:16
  /*  // > CustomCode.collision:17
  if (angleRadians>=0&&angleRadians<=pi/4||angleRadians<0&&angleRadians>=-pi/4){ // right  // > CustomCode.collision:18
   // alert("1");  // > CustomCode.collision:19
    x[elementinteracted]= xcell[i]+1*spacing;  // > CustomCode.collision:20
  y[elementinteracted]= ycell[i]+0*spacing;  // > CustomCode.collision:21
    }  // > CustomCode.collision:22
    else if (angleRadians>pi/4&&angleRadians<3*pi/4){ //top  // > CustomCode.collision:23
   // alert("2");  // > CustomCode.collision:24
    x[elementinteracted]= xcell[i]+0*spacing;  // > CustomCode.collision:25
  y[elementinteracted]= ycell[i]+1*spacing;  // > CustomCode.collision:26
    }  // > CustomCode.collision:27
     else if (angleRadians>3*pi/4&&angleRadians<pi||angleRadians<-3*pi/4&&angleRadians>-pi){ //left  // > CustomCode.collision:28
   // alert("3");  // > CustomCode.collision:29
    x[elementinteracted]= xcell[i]-1*spacing;  // > CustomCode.collision:30
  y[elementinteracted]= ycell[i]+0*spacing;  // > CustomCode.collision:31
    }  // > CustomCode.collision:32
    else if (angleRadians<-pi/4&&angleRadians>-3*pi/4){ //bottom  // > CustomCode.collision:33
   // alert("4");  // > CustomCode.collision:34
    x[elementinteracted]= xcell[i]+0*spacing;  // > CustomCode.collision:35
  y[elementinteracted]= ycell[i]-1*spacing;  // > CustomCode.collision:36
    }  // > CustomCode.collision:37
      // > CustomCode.collision:38
      // > CustomCode.collision:39
  else { // not used?  // > CustomCode.collision:40
    x[elementinteracted]= xcell[i]+Math.cos(angleRadians)*spacing;  // > CustomCode.collision:41
  y[elementinteracted]= ycell[i]+Math.sin(angleRadians)*spacing;  // > CustomCode.collision:42
     // collision detected!  // > CustomCode.collision:43
  }  // > CustomCode.collision:44
  */  // > CustomCode.collision:45
  //position[0]= xcell[i]+Math.cos(angleRadians)*spacing;  // > CustomCode.collision:46
  //position[1]= ycell[i]+Math.sin(angleRadians)*spacing;  // > CustomCode.collision:47
  x[elementinteracted]= xcell[i]+Math.cos(angleRadians)*spacing;  // > CustomCode.collision:48
  y[elementinteracted]= ycell[i]+Math.sin(angleRadians)*spacing;  // > CustomCode.collision:49
     // collision detected!  // > CustomCode.collision:50
  }  // > CustomCode.collision:51
  }  // > CustomCode.collision:52
  }  // > CustomCode.collision:53

  // code to be copied to EJSS source code under Custom and used in drawingPanel3D and plottingPanel2D  // > CustomCode.changeOrientation:1
  // address the problem is height difference is iOS app , epub, and Firefox  // > CustomCode.changeOrientation:2
  // user need to change only k and kepub  // > CustomCode.changeOrientation:3
  // copy %changeOrientation()% into the Height Field of drawingPanel3D and plottingPanel2D  // > CustomCode.changeOrientation:4
  function changeOrientation() {  // > CustomCode.changeOrientation:5
     // > CustomCode.changeOrientation:6
  var k =0.80 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeOrientation:7
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
  // allow code to run in Student Learning Space   // > CustomCode.speech:4
  var isCordova = (!!this.parent.cordova || !!window.cordova);  // > CustomCode.speech:5
  if(isCordova) { // check it is running in Android or iOS  // > CustomCode.speech:6
          parent.TTS.speak(option);  // > CustomCode.speech:7
  } else {  // > CustomCode.speech:8
    var msg = new SpeechSynthesisUtterance(option);  // > CustomCode.speech:9
    //https://stackoverflow.com/questions/43983845/speechsynthesis-api-for-chinese-firefox  // > CustomCode.speech:10
    // Set the text.  // > CustomCode.speech:11
  	//msg.text = option;   // > CustomCode.speech:12
  	//https://forums.developer.apple.com/message/323564#323564  // > CustomCode.speech:13
  //msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Ting-Ting'; })[0];  // > CustomCode.speech:14
  //msg.lang = 'zh-CH'; // need for android?  // > CustomCode.speech:15
  //https://flaviocopes.com/speech-synthesis-api/  // > CustomCode.speech:16
  //debug  // > CustomCode.speech:17
  //console.log(`Voices #: ${speechSynthesis.getVoices().length}`)  // > CustomCode.speech:18
  //speechSynthesis.getVoices().forEach(voice => {  // > CustomCode.speech:19
  // console.log(voice.name, voice.lang)  // > CustomCode.speech:20
  //})  // > CustomCode.speech:21
  //debug  // > CustomCode.speech:22
  // Queue this utterance.  // > CustomCode.speech:23
  window.speechSynthesis.speak(msg);  // > CustomCode.speech:24
  }  // > CustomCode.speech:25
  }  // > CustomCode.speech:26

  // copy this custom function  // > CustomCode.speech 2:1
  // in iOS need to add speech to the play button as On iOS the API works but must be triggered by a user action callback, like a response to a tap event, to provide a better experience to users and avoid unexpected sounds out of your phone  // > CustomCode.speech 2:2
  function speechzh (option) {  // > CustomCode.speech 2:3
  // allow code to run in Student Learning Space   // > CustomCode.speech 2:4
  var isCordova = (!!this.parent.cordova || !!window.cordova);  // > CustomCode.speech 2:5
  if(isCordova) { // check it is running in Android or iOS  // > CustomCode.speech 2:6
          parent.TTS.speak({text:option,locale:'zh-CN'});  // > CustomCode.speech 2:7
  } else {  // > CustomCode.speech 2:8
    var msg = new SpeechSynthesisUtterance(option);  // > CustomCode.speech 2:9
      // > CustomCode.speech 2:10
    //https://stackoverflow.com/questions/43983845/speechsynthesis-api-for-chinese-firefox  // > CustomCode.speech 2:11
    // Set the text.  // > CustomCode.speech 2:12
  	//msg.text = option;   // > CustomCode.speech 2:13
  	//https://forums.developer.apple.com/message/323564#323564  // > CustomCode.speech 2:14
  msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Ting-Ting'; })[0];  // > CustomCode.speech 2:15
  msg.lang = 'zh-CH'; // need for android?  // > CustomCode.speech 2:16
  //https://flaviocopes.com/speech-synthesis-api/  // > CustomCode.speech 2:17
  //debug  // > CustomCode.speech 2:18
  //console.log(`Voices #: ${speechSynthesis.getVoices().length}`)  // > CustomCode.speech 2:19
  //speechSynthesis.getVoices().forEach(voice => {  // > CustomCode.speech 2:20
  // console.log(voice.name, voice.lang)  // > CustomCode.speech 2:21
  //})  // > CustomCode.speech 2:22
  //debug  // > CustomCode.speech 2:23
  // Queue this utterance.  // > CustomCode.speech 2:24
  window.speechSynthesis.speak(msg);  // > CustomCode.speech 2:25
  }  // > CustomCode.speech 2:26
  }  // > CustomCode.speech 2:27

  //https://stackoverflow.com/questions/4492385/how-to-convert-simple-array-into-two-dimensional-array-matrix-with-javascript  // > CustomCode.listToMatrix:1
  function listToMatrix(list, elementsPerSubArray) {  // > CustomCode.listToMatrix:2
      var matrix = [], i, k;  // > CustomCode.listToMatrix:3
      for (i = 0, k = -1; i < list.length; i++) {  // > CustomCode.listToMatrix:4
          if (i % elementsPerSubArray === 0) {  // > CustomCode.listToMatrix:5
              k++;  // > CustomCode.listToMatrix:6
              matrix[k] = [];  // > CustomCode.listToMatrix:7
          }  // > CustomCode.listToMatrix:8
          matrix[k].push(list[i]);  // > CustomCode.listToMatrix:9
      }  // > CustomCode.listToMatrix:10
      return matrix;  // > CustomCode.listToMatrix:11
  }  // > CustomCode.listToMatrix:12
  var matrix = listToMatrix([1, 2, 3, 4, 4, 5, 6, 7, 8, 9], 3);  // > CustomCode.listToMatrix:13
  // result: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]  // > CustomCode.listToMatrix:14

  function removeextra () { // from kyrin  // > CustomCode.removeextra:1
    // each cell has 4 neighbours: xcell+1, xcell-1, ycell+1, ycell-1  // > CustomCode.removeextra:2
    // create array to store all cells within shape  // > CustomCode.removeextra:3
  if (x[elementinteracted]>=0&&x[elementinteracted]<=9&&y[elementinteracted]>=0&&y[elementinteracted]<=8){  // > CustomCode.removeextra:4
     xtemp =x[elementinteracted]  // > CustomCode.removeextra:5
     ytemp =y[elementinteracted]  // > CustomCode.removeextra:6
    var cellsInCurrentShape = [[x[elementinteracted],y[elementinteracted]]];  // > CustomCode.removeextra:7
      // > CustomCode.removeextra:8
  }  // > CustomCode.removeextra:9
  else {  // > CustomCode.removeextra:10
    var cellsInCurrentShape = [[xtemp,ytemp]]; // cheat way to just use last elementinteracted assuming it is good enough  // > CustomCode.removeextra:11
    //console.log("xtemp ="+xtemp,"y        temp ="+ytemp)  // > CustomCode.removeextra:12
    }  // > CustomCode.removeextra:13
     // findNeighbours(cellsInCurrentShape,x[elementinteracted],y[elementinteracted]);  // > CustomCode.removeextra:14
  findNeighbours(cellsInCurrentShape,xtemp,ytemp);  // > CustomCode.removeextra:15
    // vars width and height?  // > CustomCode.removeextra:16
    var width = 10;  // > CustomCode.removeextra:17
    var height = 10;  // > CustomCode.removeextra:18
    // loop thru all cells to find occupied ones  // > CustomCode.removeextra:19
    for (var i=0; i<width; i++) {  // > CustomCode.removeextra:20
      for (var j=0; j<height; j++) {  // > CustomCode.removeextra:21
        if(occupied[conversion(i,j)]==1) {  // > CustomCode.removeextra:22
          var isValid = false;  // > CustomCode.removeextra:23
          // check if occupied cell is in the array of valid occupied cells  // > CustomCode.removeextra:24
          for(var k=0; k<cellsInCurrentShape.length; k++) {  // > CustomCode.removeextra:25
            if(cellsInCurrentShape[k][0]==i && cellsInCurrentShape[k][1]==j) {  // > CustomCode.removeextra:26
               isValid = true;  // > CustomCode.removeextra:27
               break;  // > CustomCode.removeextra:28
            }  // > CustomCode.removeextra:29
          }  // > CustomCode.removeextra:30
          if(!isValid) {  // > CustomCode.removeextra:31
            //  console.log("this cell xcell="+i+" ycell="+j+" i="+(conversion(i,j)+1)+" is illegal!");  // > CustomCode.removeextra:32
               // > CustomCode.removeextra:33
              // reset cell?  // > CustomCode.removeextra:34
              //lookang yes  // > CustomCode.removeextra:35
              // need to find out the actual index of x,y   // > CustomCode.removeextra:36
             x[occupiedby[conversion(i,j)]]=-4; //put position back to basket  // > CustomCode.removeextra:37
              y[occupiedby[conversion(i,j)]]=5; //put position back to basket  // > CustomCode.removeextra:38
            //  alert(occupiedby[conversion(i,j)])  // > CustomCode.removeextra:39
             //occupied[conversion(i,j)+1] = 0;  // > CustomCode.removeextra:40
          }  // > CustomCode.removeextra:41
      }  // > CustomCode.removeextra:42
      }  // > CustomCode.removeextra:43
        // > CustomCode.removeextra:44
    }  // > CustomCode.removeextra:45
  }  // > CustomCode.removeextra:46
  // The function is findNeighbours(<array>, <current_element_x>, <current_element_y>).  // > CustomCode.removeextra:47
  function findNeighbours(cellsInCurrentShape,currentElementX,currentElementY) {  // > CustomCode.removeextra:48
   // console.log(cellsInCurrentShape);  // > CustomCode.removeextra:49
   // console.log("current element is "+currentElementX+","+currentElementY);  // > CustomCode.removeextra:50
    // convert x,y to occupied[i]    // > CustomCode.removeextra:51
    //prevent backtracking to cells already identified    // > CustomCode.removeextra:52
    if(occupied[conversion(currentElementX-1,currentElementY)] == 1) {  // > CustomCode.removeextra:53
      if(!checkIfExists(cellsInCurrentShape,currentElementX-1,currentElementY)) {  // > CustomCode.removeextra:54
        // left cell is occupied, add it to array  // > CustomCode.removeextra:55
        cellsInCurrentShape.push([currentElementX-1,currentElementY]);  // > CustomCode.removeextra:56
        // call recursive function to find nearest neighbours  // > CustomCode.removeextra:57
        findNeighbours(cellsInCurrentShape,currentElementX-1,currentElementY);  // > CustomCode.removeextra:58
      }     // > CustomCode.removeextra:59
    }  // > CustomCode.removeextra:60
      // > CustomCode.removeextra:61
    if(occupied[conversion(currentElementX+1,currentElementY)] == 1) {  // > CustomCode.removeextra:62
      if(!checkIfExists(cellsInCurrentShape,currentElementX+1,currentElementY)) {  // > CustomCode.removeextra:63
        // right cell is occupied, add it to array  // > CustomCode.removeextra:64
        cellsInCurrentShape.push([currentElementX+1,currentElementY]);  // > CustomCode.removeextra:65
        // call recursive function to find nearest neighbours  // > CustomCode.removeextra:66
        findNeighbours(cellsInCurrentShape,currentElementX+1,currentElementY);  // > CustomCode.removeextra:67
      }  // > CustomCode.removeextra:68
    }  // > CustomCode.removeextra:69
      // > CustomCode.removeextra:70
    if(occupied[conversion(currentElementX,currentElementY+1)] == 1) {  // > CustomCode.removeextra:71
      if(!checkIfExists(cellsInCurrentShape,currentElementX,currentElementY+1)) {  // > CustomCode.removeextra:72
        // top cell is occupied, add it to array  // > CustomCode.removeextra:73
        cellsInCurrentShape.push([currentElementX,currentElementY+1]);  // > CustomCode.removeextra:74
        // call recursive function to find nearest neighbours  // > CustomCode.removeextra:75
        findNeighbours(cellsInCurrentShape,currentElementX,currentElementY+1);    // > CustomCode.removeextra:76
      }  // > CustomCode.removeextra:77
    }  // > CustomCode.removeextra:78
      // > CustomCode.removeextra:79
    if(occupied[conversion(currentElementX,currentElementY-1)] == 1) {  // > CustomCode.removeextra:80
      if(!checkIfExists(cellsInCurrentShape,currentElementX,currentElementY-1)) {  // > CustomCode.removeextra:81
        // bottom cell is occupied, add it to array  // > CustomCode.removeextra:82
        cellsInCurrentShape.push([currentElementX,currentElementY-1]);  // > CustomCode.removeextra:83
        // call recursive function to find nearest neighbours  // > CustomCode.removeextra:84
        findNeighbours(cellsInCurrentShape,currentElementX,currentElementY-1);  // > CustomCode.removeextra:85
      }  // > CustomCode.removeextra:86
    }  // > CustomCode.removeextra:87
  }  // > CustomCode.removeextra:88
  function checkIfExists(array,x,y) { // check if value exists in array  // > CustomCode.removeextra:89
     for(var i=0; i<array.length; i++) {  // > CustomCode.removeextra:90
        if(array[i][0]==x && array[i][1]==y) return true;  // > CustomCode.removeextra:91
     }  // > CustomCode.removeextra:92
     return false;  // > CustomCode.removeextra:93
  }  // > CustomCode.removeextra:94
  function conversion(x,y) {  // > CustomCode.removeextra:95
     // find the width of the grid  // > CustomCode.removeextra:96
     var width = 10; // placeholder value for debugging  // > CustomCode.removeextra:97
     var i = y*width + x;  // > CustomCode.removeextra:98
     return i;  // > CustomCode.removeextra:99
  }  // > CustomCode.removeextra:100

  function Count_Occupied () {  // > CustomCode.countoccupied:1
  // set to zero first then count  // > CustomCode.countoccupied:2
  for (var i=0; i<n ; i++) {  // > CustomCode.countoccupied:3
    occupied[i]= 0;  // > CustomCode.countoccupied:4
    occupiedby[i]=0; // reset occupiedby also  // > CustomCode.countoccupied:5
    }  // > CustomCode.countoccupied:6
  countoccupied=0;  // > CustomCode.countoccupied:7
  //counting  // > CustomCode.countoccupied:8
  for (var i=0; i<ncell ; i++) { //loop cell  // > CustomCode.countoccupied:9
  for (var j=0; j<n ; j++) { // loop draggables  // > CustomCode.countoccupied:10
    if ( x[j]==xcell[i]&&y[j]==ycell[i] && !curhovered[j]){ // check positions draggable against cell  // > CustomCode.countoccupied:11
    occupied[i]= 1; // detect occupied in cell  // > CustomCode.countoccupied:12
    countoccupied=countoccupied+1;  // > CustomCode.countoccupied:13
    occupiedby[i] = j // a method to store which draggable is in the occupied[i]  // > CustomCode.countoccupied:14
    //do lcheck here?  // > CustomCode.countoccupied:15
  //  if (countoccupied>0){ // if at least one cell in occupied, limit the ability to drop to adjacent cells  // > CustomCode.countoccupied:16
  //x[elementinteracted]= Math.max(xcell[i]-1,x[elementinteracted]) //limit range of drop zone  // > CustomCode.countoccupied:17
  //x[elementinteracted]= Math.min(xcell[i]+1,x[elementinteracted])  // > CustomCode.countoccupied:18
  //y[elementinteracted]= Math.max(ycell[i]-1,y[elementinteracted])  // > CustomCode.countoccupied:19
  //y[elementinteracted]= Math.min(ycell[i]+1,y[elementinteracted])  // > CustomCode.countoccupied:20
  // occupied[i]= 0;// reverse detection that is wrong  // > CustomCode.countoccupied:21
  // occupied[i+1] = 1; // go right by one space  // > CustomCode.countoccupied:22
  // }  // > CustomCode.countoccupied:23
      // > CustomCode.countoccupied:24
      // > CustomCode.countoccupied:25
    }  // > CustomCode.countoccupied:26
    else {  // > CustomCode.countoccupied:27
   // occupied[i]= Math.max(occupied[i],0);  // > CustomCode.countoccupied:28
   // occupiedby[i] = Math.max(j,0); // do u need this?  // > CustomCode.countoccupied:29
    }  // > CustomCode.countoccupied:30
  }}  // > CustomCode.countoccupied:31
  }  // > CustomCode.countoccupied:32

  function illegalstate () {  // > CustomCode.illegalstate:1
    //counting  // > CustomCode.illegalstate:2
    for (var i=0; i<10 ; i++) {  // > CustomCode.illegalstate:3
      for (var j=0; j<10 ; j++) {  // > CustomCode.illegalstate:4
        if ( occupied[i*10+j]==1) { // do something when 1  // > CustomCode.illegalstate:5
        if (occupied[i*10+j+1]==1){ // check neighbour on the right  // > CustomCode.illegalstate:6
            // > CustomCode.illegalstate:7
          }  // > CustomCode.illegalstate:8
          // > CustomCode.illegalstate:9
          // > CustomCode.illegalstate:10
        }  // > CustomCode.illegalstate:11
      }  // > CustomCode.illegalstate:12
    }  // > CustomCode.illegalstate:13
  }  // > CustomCode.illegalstate:14

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    var length = 10;  // > Initialization.Init Page:1
    var startx = 0;  // > Initialization.Init Page:2
    var lengthy = 10;  // > Initialization.Init Page:3
    var starty = 0;  // > Initialization.Init Page:4
    var numberofdotsperline = 10;  // > Initialization.Init Page:5
    var numberofrows = 10;  // > Initialization.Init Page:6
    for (var i=0; i<=ncell  ; i++) { // line y=3.5  // > Initialization.Init Page:7
        xcell[i] = startx+ i%(numberofdotsperline);  // > Initialization.Init Page:8
       ycell[i] = starty+parseInt(i/(numberofrows)); // divide by 5 to get 4 rows  // > Initialization.Init Page:9
      text[i]= i+1;  // > Initialization.Init Page:10
      textby[i] = i; // for the draggable  // > Initialization.Init Page:11
    }  // > Initialization.Init Page:12
    //trick to hide 0 to 10 and 90 to 100  // > Initialization.Init Page:13
    for (var i=10; i<=ncell-11  ; i++) { // line y=3.5  // > Initialization.Init Page:14
        ncellshow[i]=true  // > Initialization.Init Page:15
    }  // > Initialization.Init Page:16
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["matrix"]) return;
    if (_isMobile){  // > Initialization.matrix:1
      //do nothing  // > Initialization.matrix:2
      }  // > Initialization.matrix:3
        // > Initialization.matrix:4
      else{  // > Initialization.matrix:5
        // copy this into the initialization  // > Initialization.matrix:6
    // make the font bigger  // > Initialization.matrix:7
    _view.plottingPanel.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.matrix:8
    _view.plottingPanel.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.matrix:9
    _view.plottingPanel.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.matrix:10
    _view.plottingPanel.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.matrix:11
        }  // > Initialization.matrix:12
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    // undefined is copy in initialization as a clever way to remember user selection  // > Initialization.undefined:1
    // declare variables required  // > Initialization.undefined:2
    // firsttime2  // > Initialization.undefined:3
      if (logoneline==undefined){  // > Initialization.undefined:4
      logoneline="";  // > Initialization.undefined:5
      }  // > Initialization.undefined:6
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
    if (!__pagesEnabled["matrix"]) return;
    //mat = listToMatrix([1, 2, 3, 4, 4, 5, 6, 7, 8, 9], 3);  // > FixedRelations.matrix:1
    mat = listToMatrix(occupied, 10);  // > FixedRelations.matrix:2
    //console.log(mat);  // > FixedRelations.matrix:3
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["area"]) return;
    // set to zero first then count  // > FixedRelations.area:1
    //var count  // > FixedRelations.area:2
    count=0  // > FixedRelations.area:3
    for (var i=0; i<n ; i++) {  // > FixedRelations.area:4
      count =occupied[i]+count;  // > FixedRelations.area:5
       // > FixedRelations.area:6
    }  // > FixedRelations.area:7
    area = count;  // > FixedRelations.area:8
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["perimeter"]) return;
    Count_Occupied () // count also in fixed for immediate results  // > FixedRelations.perimeter:1
    cal_perimeter (); // need to calucate perimeter  // > FixedRelations.perimeter:2
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["TRtext"]) return;
    if (showTRtext){  // > FixedRelations.TRtext:1
      TRtext = "Area="+area.toFixed(0)+"\nperimeter ="+perimeter   // > FixedRelations.TRtext:2
      }  // > FixedRelations.TRtext:3
    else{  // > FixedRelations.TRtext:4
      TRtext = "Area=?"+"\nperimeter =?"  // > FixedRelations.TRtext:5
      }  // > FixedRelations.TRtext:6
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
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["t"]};

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
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
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
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
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
    _view = new areaandperimeter_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.checkBox.linkProperty("Checked",  function() { return showTRtext; }, function(_v) { showTRtext = _v; } ); // HtmlView Page linking property 'Checked' for element 'checkBox'
          _view.checkBox.setAction("OnCheckOff", function(_data,_info) {
  TRtext = "Area=?"+"\nperimeter =?";

}); // HtmlView Page setting action 'OnCheckOff' for element 'checkBox'
          _view.checkBox.setAction("OnCheckOn", function(_data,_info) {
  TRtext = "Area="+area.toFixed(0)+"\nperimeter ="+perimeter;

}); // HtmlView Page setting action 'OnCheckOn' for element 'checkBox'
          _view.comboBoxgame.linkProperty("Options",  function() { return ["Game","Form a shape with a given Area","Form a shape with a given Perimeter","Form a shape with the given Area and Perimeter","Find Area with a given shape","Find Perimeter with a given shape","Select the Area and then create the shape"]; } ); // HtmlView Page linking property 'Options' for element 'comboBoxgame'
          _view.comboBoxgame.setAction("OnChange", function(_data,_info) {
  // to use
  questionnumber = questionnumber+1; //started from zero
  var opts = _view.comboBoxgame.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option=="Form a shape with a given Area"){
    // area=10 level1
    
    answer= Math.max(Math.round(Math.random()*10),2)
    question = "Question "+questionnumber+":  <br/>Drag the square titles to form Area = "+answer+". <br/><br/>When done, click the<br/>  🤔Check<br/> button to proceed."
    _tools.showOkDialog(question);
    questionTL= "Question "+questionnumber+":  \nArea = "+answer
    showcheck=true
    showareainput=false;
   showperimeterinput=false;
    }
  else if ( option=="Form a shape with a given Perimeter"){
     answer= get_random([4,6,8,10,12,14,16,18,20])
     question = "Question "+questionnumber+":  <br/>Drag the square titles to form Perimeter = "+answer
    _tools.showOkDialog(question);
    questionTL ="Question "+questionnumber+":  \nPerimeter = "+answer
    showcheck=true
    }
    else if ( option=="Form a shape with the given Area and Perimeter"){
    showcheck=true
    showareainput=false;
   showperimeterinput=false;
    answer= Math.max(Math.round(Math.random()*10),2)
     if (answer==2){
     answer2= get_random([6])
     }
     else if (answer==3){
      answer2= get_random([8])
      }
       else if (answer==4){
      answer2= get_random([8,10])
      }
       else if (answer==5){
      answer2= get_random([10,12])
      }
        else if (answer==6){
      answer2= get_random([10,12,14])
      }
       else if (answer==7){
      answer2= get_random([12,14,16])
      }
      else if (answer==8){
      answer2= get_random([12,14,16])
      }
       else if (answer==9){
      answer2= get_random([12,14,16,18,20])
      }
       else if (answer==10){
      answer2= get_random([14,16,18,20,22])
      }
      
     question = "Question "+questionnumber+":  <br/>Drag the square titles to form Area = "+answer +", Perimeter = "+answer2
    _tools.showOkDialog(question);
    questionTL ="Question "+questionnumber+":  \nArea = "+answer +", Perimeter = "+answer2
    
    }
  else if ( option=="Find Area with a given shape"){
   showcheck=false
   setup();
   showareainput=true;
   showperimeterinput=false;
   // area=10 level1
   // answer= Math.max(Math.round(Math.random()*10),2)
    question = "Question "+questionnumber+":  <br/>Select from combo box the correct Area shown = ?"
    _tools.showOkDialog(question);
    questionTL= "Question "+questionnumber+":  \nSelect the correct Area shown = ?"
    
    }
   else if ( option=="Find Perimeter with a given shape"){
   showcheck=false
   showareainput=false;
   showperimeterinput=true;
   setup();
   question = "Question "+questionnumber+":  <br/>Select from combo box the correct Perimeter shown = ?"
    _tools.showOkDialog(question);
    questionTL= "Question "+questionnumber+":  \nSelect the correct Perimeter shown = ?"
    
    }
    else if ( option=="Select the Area and then create the shape"){
   showcheck=true
   showareainput=true;
   showperimeterinput=false;
   //setup();
   question = "Question "+questionnumber+":  <br/>Select from Area combo box your desired number = ?"
    _tools.showOkDialog(question);
    questionTL= "Question "+questionnumber+":  \nCreate the correct Area you selected ?"
    
    }

}); // HtmlView Page setting action 'OnChange' for element 'comboBoxgame'
          _view.area2.linkProperty("Display",  function() { return showareainput?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'area2'
          _view.comboBoxarea.linkProperty("Options",  function() { return ["?",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]; } ); // HtmlView Page linking property 'Options' for element 'comboBoxarea'
          _view.comboBoxarea.setAction("OnChange", function(_data,_info) {
  // to use
  var opts = _view.comboBoxarea.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if (_view.comboBoxgame.getProperty("SelectedOptions")=="Select the Area and then create the shape"){
    _tools.showOkDialog("You have selected an area ="+ option)
    answer = option
    }
  else {
  if ( option==area){
    symbol="✅";
    _view.audio.play()
    _tools.showOkDialog("✅Correct! Next question is....?",
      function(){ 
        questionnumber=questionnumber+1;
    
    setup(); // field next question
    questionTL= "Question "+questionnumber+":  \nArea = ?"
      _update(); // to force update view
      });
     
    
    }
    else{
     symbol="❌";
    _view.audiowrong.play()
    _tools.showOkDialog("❌Incorrect!");
      }
      
   
   logoneline = logoneline+"\nQ "+questionnumber+" : "+" count area? = "+area+". Your area is "+option +symbol
   
   }

}); // HtmlView Page setting action 'OnChange' for element 'comboBoxarea'
          _view.comboBoxarea.linkProperty("Display",  function() { return showareainput?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'comboBoxarea'
          _view.perimeter.linkProperty("Display",  function() { return showperimeterinput?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'perimeter'
          _view.comboBoxperimeter.linkProperty("Options",  function() { return ["?",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]; } ); // HtmlView Page linking property 'Options' for element 'comboBoxperimeter'
          _view.comboBoxperimeter.setAction("OnChange", function(_data,_info) {
  // to use
  var opts = _view.comboBoxperimeter.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option==perimeter){
    symbol="✅";
    _view.audio.play()
    _tools.showOkDialog("✅Correct! Next question is....?", 
      function(){ 
      
      questionnumber=questionnumber+1;
    setup(); // field next question
    questionTL= "Question "+questionnumber+":  \nPerimeter = ?"
        _update(); // to force update view
      
      });
     
    
    }
    else if (option>perimeter) { //user choose too big a number
     symbol="❌";
    _view.audiowrong.play()
    var diff = option-perimeter
   // _tools.showOkDialog("❌Incorrect! Try to count the "+"red"+" lines correctly, you have "+diff+" too many.");
    _tools.showOkDialog("❌Incorrect! Try to count the "+"red"+" lines correctly, you have over counted.");
  }
      
      else if (option<perimeter) { //user choose too small a number
     symbol="❌";
    _view.audiowrong.play()
    var diff = perimeter - option
   // _tools.showOkDialog("❌Incorrect! Try to count the red lines correctly, you have "+diff+" too little.");
    _tools.showOkDialog("❌Incorrect! Try to count the red lines correctly, you have counted less.");
    }
    
    else{
     symbol="❌";
    _view.audiowrong.play()
    _tools.showOkDialog("❌Incorrect!");
      }
      
   
   logoneline = logoneline+"\nQ "+questionnumber+" : "+" count perimeter? = "+perimeter+". Your perimeter is "+option +symbol;

}); // HtmlView Page setting action 'OnChange' for element 'comboBoxperimeter'
          _view.comboBoxperimeter.linkProperty("Display",  function() { return showperimeterinput?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'comboBoxperimeter'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  _pause();
  speech ("paused");

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  speech ("play");

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton2'
          _view.Undo.setAction("OnClick", function(_data,_info) {
  x[elementinteracted]= -2 //return
  y[elementinteracted]= 5
  //cal_perimeter ()
  Count_Occupied ();

}); // HtmlView Page setting action 'OnClick' for element 'Undo'
          _view.Check.setAction("OnClick", function(_data,_info) {
  //["Game","Form a shape with a given Area","Form a shape with a given Perimeter","Form a shape with the given Area and Perimeter","Find Area with a given shape","Find Perimeter with a given shape"]
  option = _view.comboBoxgame.getProperty("SelectedOptions")
  if ( option=="Form a shape with a given Area") {
    if (answer==area) {
      _view.audio.play()
      symbol ="✅ ";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your area is "+area +symbol
      // field next question
      // show something
      EJSS_INTERFACE.BoxPanel.showOkDialog("correct!✅",
      function() {
        // area=10 level1
        questionnumber= questionnumber+1;
        answer= Math.max(Math.round(Math.random()*10),2)
        question = "Question "+questionnumber+":  <br/>Area = "+answer
        _tools.showOkDialog(question);
        questionTL= "Question "+questionnumber+":  \nArea = "+answer
        showcheck=true
        _update(); // to force update view
      } );
      // _tools.showOkDialog("correct!✅");
    }
    else if (answer>area) {
      // put too many squares
      var difference = answer-area
      _tools.showOkDialog(" ❌Incorrect! Try to put "+difference+" more square(s) to increase the area");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your area is "+area +symbol
    }
    else if (answer<area) {
      var difference2 = area-answer
      if (difference2==1)_tools.showOkDialog(" ❌Incorrect!❌Try to remove "+difference2+" more square to decrease the area");
      else _tools.showOkDialog(" ❌Incorrect!❌Try to remove "+difference2+" more squares to decrease the area");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your area is "+area +symbol
    }
  }
  else  if ( _view.comboBoxgame.getProperty("SelectedOptions")=="Form a shape with a given Perimeter") {
    if (answer==perimeter) {
      // _tools.showOkDialog("✅correct!");
      symbol ="✅ ";
      _view.audio.play()
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your perimeter is "+perimeter +symbol
      // show something
      EJSS_INTERFACE.BoxPanel.showOkDialog("✅correct!",
      function() {
        questionnumber=questionnumber+1;
        answer= get_random([4,6,8,10,12,14,16,18,20])
        question = "Question "+questionnumber+":  <br/>Perimeter = "+answer
        _tools.showOkDialog(question);
        questionTL ="Question "+questionnumber+":  \nPerimeter = "+answer
        showcheck=true
        _update(); // to force update view
      } );
    }
    else if (answer>perimeter) {
      // put too many
      _tools.showOkDialog("❌Incorrect! Try to form a square shape, say a 2x2 or a 3x3 square to reduce the perimeter");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your perimeter is "+perimeter +symbol
    }
    else if (answer<perimeter) {
      _tools.showOkDialog("❌Incorrect! Try to increase more squares and/or form the squares in a straight line first");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your perimeter is "+perimeter +symbol
    }
  }
  else  if ( _view.comboBoxgame.getProperty("SelectedOptions")=="Form a shape with the given Area and Perimeter") {
    if (answer==area&&answer2==perimeter) {
      // _tools.showOkDialog("✅correct!");
      _view.audio.play()
      symbol ="✅ ";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your area and perimeter are "+area+" , "+perimeter +symbol
      // show something
      EJSS_INTERFACE.BoxPanel.showOkDialog("✅Correct!",
      function() {
        showcheck=true
        answer= Math.max(Math.round(Math.random()*10),2)
        if (answer==2) {
          answer2= get_random([6])
        }
        else if (answer==3) {
          answer2= get_random([8])
        }
        else if (answer==4) {
          answer2= get_random([8,10])
        }
        else if (answer==5) {
          answer2= get_random([10,12])
        }
        else if (answer==6) {
          answer2= get_random([10,12,14])
        }
        else if (answer==7) {
          answer2= get_random([12,14,16])
        }
        else if (answer==8) {
          answer2= get_random([12,14,16])
        }
        else if (answer==9) {
          answer2= get_random([12,14,16,18,20])
        }
        else if (answer==10) {
          answer2= get_random([14,16,18,20,22])
        }
        questionnumber=questionnumber+1;
        question = "Question "+questionnumber+":  <br/>Area = "+answer +", Perimeter = "+answer2
        _tools.showOkDialog(question);
        questionTL ="Question "+questionnumber+":  \nArea = "+answer +", Perimeter = "+answer2
        _update(); // to force update view
      } );
    }
    else if (answer==area&&answer2<perimeter) {
      // area correct but perimeter too high
      _tools.showOkDialog("❌Incorrect! Try to form a square shape, say a 2x2 or a 3x3 square to reduce the perimeter");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your perimeter is "+perimeter +symbol
    }
    else if (answer==area&&answer2>perimeter) {
      // area correct but perimeter too low
      _tools.showOkDialog("❌Incorrect! Try to move the squares tiles in a straight line first to increase the perimeter");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your perimeter is "+perimeter +symbol
    }
    else {
      _tools.showOkDialog("❌Incorrect! Try to get the correct area first");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your perimeter is "+perimeter +symbol
    }
  }
  else  if ( _view.comboBoxgame.getProperty("SelectedOptions")=="Select the Area and then create the shape") {
    if (answer==area){ 
    symbol ="✅ ";
      _view.audio.play()
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your area is "+area +symbol
     // show something
      EJSS_INTERFACE.BoxPanel.showOkDialog("✅correct!",
      function() {
        questionnumber=questionnumber+1;
        //answer= get_random([4,6,8,10,12,14,16,18,20])
        question = "Question "+questionnumber+":  <br/>Select another area"
        _tools.showOkDialog(question);
        //questionTL ="Question "+questionnumber+":  \nPerimeter = "+answer
        showcheck=true
        _update(); // to force update view
      } );
      }
      
      else if (answer>area) {
       var difference = answer-area
       _tools.showOkDialog(" ❌Incorrect! Try to put "+difference+" more square(s) to increase the area");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your area is "+area +symbol
        }
       
      //if (difference2==1)_tools.showOkDialog(" ❌Incorrect!❌Try to remove "+difference2+" more square to decrease the area");
      else if (answer<area) {
         var difference2 = area-answer
        _tools.showOkDialog(" ❌Incorrect!❌Try to remove "+difference2+" more squares to decrease the area");
      _view.audiowrong.play()
      symbol =" ❌";
      logoneline = logoneline+"\nQ "+questionnumber+" : "+" "+option+" = "+answer+". Your area is "+area +symbol
    }
        
    }
    
  //logoneline = logoneline+"\nQ"+questionTL+"Your area is "+area +symbol+" and perimeter is "+perimeter;

}); // HtmlView Page setting action 'OnClick' for element 'Check'
          _view.Check.linkProperty("Display",  function() { return showcheck?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'Check'
          _view.resetButton3.setAction("OnClick", function(_data,_info) {
  _reset();
  //speechzh ("你好");

}); // HtmlView Page setting action 'OnClick' for element 'resetButton3'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return TRtext; }, function(_v) { TRtext = _v; } ); // HtmlView Page linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();

}); // HtmlView Page setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return questionTL; }, function(_v) { questionTL = _v; } ); // HtmlView Page linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnMove", function(_data,_info) {
  _view.comboBoxperimeter.setSelectedOptions(["?"]); // dooest seems to work if here?
   _view.comboBoxarea.setSelectedOptions(["?"]); // dooest seems to work if here?
  shortestdistance=10; // some large number initailly used in calculation of draggable snapping;

}); // HtmlView Page setting action 'OnMove' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.cells.linkProperty("NumberOfElements",  function() { return ncell; }, function(_v) { ncell = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'cells'
          _view.cells.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'cells'
          _view.cells.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'cells'
          _view.cells.linkProperty("Visibility",  function() { return ncellshow; }, function(_v) { ncellshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'cells'
          _view.celltext.linkProperty("NumberOfElements",  function() { return ncell; }, function(_v) { ncell = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'celltext'
          _view.celltext.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'celltext'
          _view.celltext.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'celltext'
          _view.celltext.linkProperty("Text",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'Text' for element 'celltext'
          _view.celltext.linkProperty("Visibility",  function() { return ncellshow; }, function(_v) { ncellshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'celltext'
          _view.allowed.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'allowed'
          _view.allowed.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'allowed'
          _view.allowed.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'allowed'
          _view.allowed.linkProperty("Visibility",  function() { return allowed; }, function(_v) { allowed = _v; } ); // HtmlView Page linking property 'Visibility' for element 'allowed'
          _view.shapeSetdrag.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSetdrag'
          _view.shapeSetdrag.setAction("OnRelease", function(_data,_info) {
  if(!dragging)
    return;
  dragging = false;
  curhovered[elementinteracted] = false;
  Count_Occupied () // count ahead
  // cannot name the variables the same added tmp
  var basketx = -2
  var baskety = 5
  var dxtmp = x[elementinteracted]-(basketx)
  var dytmp = y[elementinteracted]-baskety
  var distancetmp = Math.sqrt( dxtmp*dxtmp+dytmp*dytmp)
  var tolerance = 1 // set to 2 since x = -2
  if (distancetmp<tolerance) {
    // handle just a bit away
    x[elementinteracted]=basketx;// place back to original of basket
    y[elementinteracted]=baskety;
    console.log("1");
  }
  else if ( x[elementinteracted]<0) {
    // put on the outside of left
    x[elementinteracted]=basketx;// place back to original of basket
    y[elementinteracted]=baskety;
    console.log("2");
  }
  else if ( y[elementinteracted]>9) {
    // put on the outside of right
    x[elementinteracted]=basketx;// place back to original of basket
    y[elementinteracted]=baskety;
    console.log("3");
  }
  else if ( y[elementinteracted]<0) {
    // put on the outside of bottom
    x[elementinteracted]=basketx;// place back to original of basket
    y[elementinteracted]=baskety;
    console.log("4");
  }
  else if ( x[elementinteracted]>10) {
    // put on the outside of top
    x[elementinteracted]=basketx;// place back to original of basket
    y[elementinteracted]=baskety;
    console.log("5");
  }
  else {
    // catch all old code incase above didnt work
    x[elementinteracted]= Math.round(x[elementinteracted]) //round to integer
    x[elementinteracted]= Math.max(0,x[elementinteracted]) //limit range of drop zone
    x[elementinteracted]= Math.min(9,x[elementinteracted])
    y[elementinteracted]= Math.round(y[elementinteracted]);
    y[elementinteracted]= Math.max(1,y[elementinteracted])
    y[elementinteracted]= Math.min(8,y[elementinteracted])
    //
    //move automatically to allowed position
    for (var i=0; i<n  ; i++) {
      dx[i] = x[elementinteracted]-xcell[i]
      dy[i] = y[elementinteracted]-ycell[i]
      distance[i] = Math.sqrt( dx[i]*dx[i]+dy[i]*dy[i])
      // start Computer algorithm to check shortest distance in allowed[]
      if (allowed[i]==1&&countoccupied>0) { //
        shortestdistance= Math.min(distance[i],shortestdistance)
        //var tmp = i
        console.log("6");
      }
    }
    console.log("Shortest distance: ", shortestdistance);
    for (var i=0; i<n  ; i++) {
      // check to placement
      if (shortestdistance==distance[i]&&allowed[i]==1) {
        allowedtestx = xcell[i];
        allowedtesty = ycell[i];
        x[elementinteracted]=allowedtestx
        y[elementinteracted]=allowedtesty
      }
    }
    //console.log("7")
    
  }
  removeextra(); // from kyrin
  //Count_Occupied () // count later
  cal_perimeter ();
  output = [];
  for(var i = 0; i < allowed.length; i++){
    if(allowed[i])
       output.push(i);   
  }
  console.log(output);

}); // HtmlView Page setting action 'OnRelease' for element 'shapeSetdrag'
          _view.shapeSetdrag.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSetdrag'
          _view.shapeSetdrag.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSetdrag'
          _view.shapeSetdrag.setAction("OnDrag", function(_data,_info) {
  //movedtoallowedposition ()
  //collision();
  //Count_Occupied
  curhovered[elementinteracted] = true;
  dragging = true;

}); // HtmlView Page setting action 'OnDrag' for element 'shapeSetdrag'
          _view.shapeSetdrag.linkProperty("ElementInteracted",  function() { return elementinteracted; }, function(_v) { elementinteracted = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'shapeSetdrag'
          _view.celltext2.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'celltext2'
          _view.celltext2.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'celltext2'
          _view.celltext2.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'celltext2'
          _view.celltext2.linkProperty("Text",  function() { return textby; }, function(_v) { textby = _v; } ); // HtmlView Page linking property 'Text' for element 'celltext2'
          _view.textSet.linkProperty("NumberOfElements",  function() { return ncell; }, function(_v) { ncell = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet'
          _view.textSet.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet'
          _view.shape3.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView Page linking property 'X' for element 'shape3'
          _view.shape3.linkProperty("Y",  function() { return yc; }, function(_v) { yc = _v; } ); // HtmlView Page linking property 'Y' for element 'shape3'
          _view.polygon.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView Page linking property 'X' for element 'polygon'
          _view.polygon.linkProperty("Y",  function() { return yc; }, function(_v) { yc = _v; } ); // HtmlView Page linking property 'Y' for element 'polygon'
          _view.bottom.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'bottom'
          _view.bottom.linkProperty("SizeX",  function() { return lengthxbottom; }, function(_v) { lengthxbottom = _v; } ); // HtmlView Page linking property 'SizeX' for element 'bottom'
          _view.bottom.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'bottom'
          _view.bottom.linkProperty("Attributes",  function() { return lineattribute; }, function(_v) { lineattribute = _v; } ); // HtmlView Page linking property 'Attributes' for element 'bottom'
          _view.bottom.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'bottom'
          _view.bottom.linkProperty("LineWidth",  function() { return linewidth; }, function(_v) { linewidth = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'bottom'
          _view.bottom2.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'bottom2'
          _view.bottom2.linkProperty("SizeX",  function() { return lengthxtop; }, function(_v) { lengthxtop = _v; } ); // HtmlView Page linking property 'SizeX' for element 'bottom2'
          _view.bottom2.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'bottom2'
          _view.bottom2.linkProperty("Attributes",  function() { return lineattributetop; }, function(_v) { lineattributetop = _v; } ); // HtmlView Page linking property 'Attributes' for element 'bottom2'
          _view.bottom2.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'bottom2'
          _view.bottom2.linkProperty("LineWidth",  function() { return linewidthtop; }, function(_v) { linewidthtop = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'bottom2'
          _view.left.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'left'
          _view.left.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'left'
          _view.left.linkProperty("Attributes",  function() { return lineattributeleft; }, function(_v) { lineattributeleft = _v; } ); // HtmlView Page linking property 'Attributes' for element 'left'
          _view.left.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'left'
          _view.left.linkProperty("SizeY",  function() { return lengthxleft; }, function(_v) { lengthxleft = _v; } ); // HtmlView Page linking property 'SizeY' for element 'left'
          _view.left.linkProperty("LineWidth",  function() { return linewidthleft; }, function(_v) { linewidthleft = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'left'
          _view.right.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'right'
          _view.right.linkProperty("X",  function() { return xcell; }, function(_v) { xcell = _v; } ); // HtmlView Page linking property 'X' for element 'right'
          _view.right.linkProperty("Attributes",  function() { return lineattributeright; }, function(_v) { lineattributeright = _v; } ); // HtmlView Page linking property 'Attributes' for element 'right'
          _view.right.linkProperty("Y",  function() { return ycell; }, function(_v) { ycell = _v; } ); // HtmlView Page linking property 'Y' for element 'right'
          _view.right.linkProperty("SizeY",  function() { return lengthxright; }, function(_v) { lengthxright = _v; } ); // HtmlView Page linking property 'SizeY' for element 'right'
          _view.right.linkProperty("LineWidth",  function() { return linewidthright; }, function(_v) { linewidthright = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'right'
          _view.textArea.linkProperty("Value",  function() { return logoneline; }, function(_v) { logoneline = _v; } ); // HtmlView Page linking property 'Value' for element 'textArea'
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
function areaandperimeter_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = areaandperimeter_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function areaandperimeter_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'control'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'controlPanel'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'controlPanel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'checkBox'
      .setProperty("Tooltip","show Area and Perimeter") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'checkBox'
      .setProperty("Text","show Area and Perimeter") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'checkBox'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'checkBox'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBoxgame", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBoxgame'
      .setProperty("Width","30vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBoxgame'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'comboBoxgame'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBoxgame'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"area2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'area2'
      .setProperty("Text"," Area= ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'area2'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBoxarea", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBoxarea'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBoxarea'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'comboBoxarea'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"perimeter", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'perimeter'
      .setProperty("Text"," Perimeter= ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'perimeter'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBoxperimeter", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBoxperimeter'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBoxperimeter'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'comboBoxperimeter'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      .setProperty("Font","normal normal 3vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'playPauseButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"Undo", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'Undo'
      .setProperty("Tooltip","click on the square and click remove") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'Undo'
      .setProperty("Text","Remove") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'Undo'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'Undo'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'Undo'
      ;

    _view._addElement(EJSS_INTERFACE.button,"Check", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'Check'
      .setProperty("Background","rgba(200,220,208,1)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'Check'
      .setProperty("Text"," 🤔Check") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'Check'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'Check'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Width","10vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton3'
      .setProperty("Background","Orange") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'resetButton3'
      .setProperty("Text","↻Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'resetButton3'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audio'
      .setProperty("AudioUrl","./areaandperimeter/Ding Sound Effect.m4a") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audiowrong", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audiowrong'
      .setProperty("AudioUrl","./areaandperimeter/Wrong-answer-sound-effect.mp3") // EJsS HtmlView.HtmlView Page: setting property 'AudioUrl' for element 'audiowrong'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("YScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("YFixedTick",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",9.5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",10) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumX",-4) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"cells", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'cells'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'cells'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'cells'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'cells'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'cells'
      .setProperty("LineWidth",0.1) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'cells'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'cells'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'hide2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide2'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"celltext", _view.hide2) // EJsS HtmlView.HtmlView Page: declaration of element 'celltext'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"basket", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'basket'
      .setProperty("X",-2) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'basket'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'basket'
      .setProperty("Text","🥣") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'basket'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'basket'
      .setProperty("Font","normal normal 10vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'basket'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"basket2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'basket2'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'basket2'
      .setProperty("X",-2) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'basket2'
      .setProperty("Y",5.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'basket2'
      .setProperty("ImageUrl","./areaandperimeter/basket.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'basket2'
      .setProperty("SizeY",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'basket2'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"allowed", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'allowed'
      .setProperty("FillColor","rgba(0,0,255,0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'allowed'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'allowed'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'allowed'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'allowed'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'allowed'
      .setProperty("LineWidth",0.1) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'allowed'
      .setProperty("DrawFill",true) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'allowed'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSetdrag", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSetdrag'
      .setProperty("FillColor","rgba(0,255,0,0.2)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeSetdrag'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSetdrag'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shapeSetdrag'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSetdrag'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shapeSetdrag'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSetdrag'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide3", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'hide3'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide3'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"celltext2", _view.hide3) // EJsS HtmlView.HtmlView Page: declaration of element 'celltext2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offset", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'offset'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'offset'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.offset) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'hide'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'shape'
      .setProperty("SizeX",7) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape2", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'shape2'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shape2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape2'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape3", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'shape3'
      .setProperty("SizeX",0.1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape3'
      .setProperty("SizeY",0.1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape3'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shape3'
      ;

    _view._addElement(EJSS_DRAWING2D.polygon,"polygon", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'polygon'
      .setProperty("PointsY",[0,2,2]) // EJsS HtmlView.HtmlView Page: setting property 'PointsY' for element 'polygon'
      .setProperty("PointsX",[0,0,-2]) // EJsS HtmlView.HtmlView Page: setting property 'PointsX' for element 'polygon'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'polygon'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'polygon'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsetdown", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'offsetdown'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'offsetdown'
      ;

    _view._addElement(EJSS_DRAWING2D.segmentSet,"bottom", _view.offsetdown) // EJsS HtmlView.HtmlView Page: declaration of element 'bottom'
      .setProperty("LineColor","red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'bottom'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bottom'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'bottom'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsettop", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'offsettop'
      .setProperty("Y",0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'offsettop'
      ;

    _view._addElement(EJSS_DRAWING2D.segmentSet,"bottom2", _view.offsettop) // EJsS HtmlView.HtmlView Page: declaration of element 'bottom2'
      .setProperty("LineColor","red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'bottom2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bottom2'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'bottom2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsetleft", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'offsetleft'
      .setProperty("X",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'offsetleft'
      ;

    _view._addElement(EJSS_DRAWING2D.segmentSet,"left", _view.offsetleft) // EJsS HtmlView.HtmlView Page: declaration of element 'left'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'left'
      .setProperty("LineColor","red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'left'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'left'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsetright", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'offsetright'
      .setProperty("X",0.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'offsetright'
      ;

    _view._addElement(EJSS_DRAWING2D.segmentSet,"right", _view.offsetright) // EJsS HtmlView.HtmlView Page: declaration of element 'right'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'right'
      .setProperty("LineColor","red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'right'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'right'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"history", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'history'
      .setProperty("Html","<h2>History</h2>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'history'
      ;

    _view._addElement(EJSS_INTERFACE.textArea,"textArea", _view.history) // EJsS HtmlView.HtmlView Page: declaration of element 'textArea'
      .setProperty("Height",600) // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'textArea'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'textArea'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView Page: setting property 'Editable' for element 'textArea'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h2>Description</h2> <p>The interactive is designed to allow exploration of area and perimeter.</p> <p>checkbox shows the area and perimeter calculation.</p> <h2>Game</h2> <p>There are several game modes.</p> <p>Form a shape with a given Area: Students need to drag in the square tiles to form the shape with the correct area specified.</p> <p>Form a shape with a given Perimeter: Students need to drag in the square tiles to form the correct perimeter specified.</p> <p>Form a shape with the given Area and Perimeter: Students need to drag in the square tiles to form the correct area and perimeter specified.</p> <p>Find Area with a given shape: Students need to select the correct combo box for the answer to the given shape.</p> <p>Find Perimeter with a given shape: Students need to select the correct combo box for the answer to the shape.</p> <h2>History or Analytics</h2> <p>There is a record of users past action to support teachers evidence based concept errors remedial actions. From the history, it is possible to analyse if students' had difficulties in getting the correct answers.</p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new areaandperimeter("_topFrame","_ejs_library/",null);
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
