/* _inputParameters: an object with different values for the model parameters */
function DipoleTrajectoryWrong602(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var s; // EjsS Model.Variables.Field Vars.s
  var r; // EjsS Model.Variables.Field Vars.r
  var size; // EjsS Model.Variables.Field Vars.size
  var xmin; // EjsS Model.Variables.Field Vars.xmin
  var xmax; // EjsS Model.Variables.Field Vars.xmax
  var ymin; // EjsS Model.Variables.Field Vars.ymin
  var ymax; // EjsS Model.Variables.Field Vars.ymax
  var nx; // EjsS Model.Variables.Field Vars.nx
  var ny; // EjsS Model.Variables.Field Vars.ny
  var xField; // EjsS Model.Variables.Field Vars.xField
  var yField; // EjsS Model.Variables.Field Vars.yField
  var elecField; // EjsS Model.Variables.Field Vars.elecField

  var font; // EjsS Model.Variables.lookang.font
  var text; // EjsS Model.Variables.lookang.text
  var nMax; // EjsS Model.Variables.lookang.nMax
  var xCharge; // EjsS Model.Variables.lookang.xCharge
  var yCharge; // EjsS Model.Variables.lookang.yCharge
  var radius; // EjsS Model.Variables.lookang.radius
  var q; // EjsS Model.Variables.lookang.q
  var k; // EjsS Model.Variables.lookang.k
  var n; // EjsS Model.Variables.lookang.n
  var chargeTextSet; // EjsS Model.Variables.lookang.chargeTextSet
  var nVectors; // EjsS Model.Variables.lookang.nVectors
  var nVectorsMax; // EjsS Model.Variables.lookang.nVectorsMax
  var nVectorsSq; // EjsS Model.Variables.lookang.nVectorsSq
  var nVectorsPotential; // EjsS Model.Variables.lookang.nVectorsPotential
  var nVectorsSqPotential; // EjsS Model.Variables.lookang.nVectorsSqPotential
  var vectorIndex; // EjsS Model.Variables.lookang.vectorIndex
  var Fieldx; // EjsS Model.Variables.lookang.Fieldx
  var Fieldy; // EjsS Model.Variables.lookang.Fieldy
  var Vectorx; // EjsS Model.Variables.lookang.Vectorx
  var Vectory; // EjsS Model.Variables.lookang.Vectory
  var potentialShow; // EjsS Model.Variables.lookang.potentialShow
  var factor; // EjsS Model.Variables.lookang.factor
  var VectorxPotential; // EjsS Model.Variables.lookang.VectorxPotential
  var VectoryPotential; // EjsS Model.Variables.lookang.VectoryPotential
  var potential; // EjsS Model.Variables.lookang.potential
  var posx; // EjsS Model.Variables.lookang.posx
  var posy; // EjsS Model.Variables.lookang.posy
  var FieldFlag; // EjsS Model.Variables.lookang.FieldFlag
  var Fieldmag; // EjsS Model.Variables.lookang.Fieldmag
  var redness; // EjsS Model.Variables.lookang.redness
  var greenness; // EjsS Model.Variables.lookang.greenness
  var blueness; // EjsS Model.Variables.lookang.blueness
  var colorball; // EjsS Model.Variables.lookang.colorball
  var colorballtext; // EjsS Model.Variables.lookang.colorballtext
  var colorVectors; // EjsS Model.Variables.lookang.colorVectors
  var Ex; // EjsS Model.Variables.lookang.Ex
  var Ey; // EjsS Model.Variables.lookang.Ey
  var Enetx; // EjsS Model.Variables.lookang.Enetx
  var Enety; // EjsS Model.Variables.lookang.Enety
  var Enet; // EjsS Model.Variables.lookang.Enet
  var Vnet; // EjsS Model.Variables.lookang.Vnet

  var t; // EjsS Model.Variables.Test Charge Vars.t
  var dt; // EjsS Model.Variables.Test Charge Vars.dt
  var x; // EjsS Model.Variables.Test Charge Vars.x
  var y; // EjsS Model.Variables.Test Charge Vars.y
  var vx; // EjsS Model.Variables.Test Charge Vars.vx
  var vy; // EjsS Model.Variables.Test Charge Vars.vy
  var xArrow; // EjsS Model.Variables.Test Charge Vars.xArrow
  var yArrow; // EjsS Model.Variables.Test Charge Vars.yArrow
  var collision; // EjsS Model.Variables.Test Charge Vars.collision

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
      s : s,
      r : r,
      size : size,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      nx : nx,
      ny : ny,
      xField : xField,
      yField : yField,
      elecField : elecField,
      font : font,
      text : text,
      nMax : nMax,
      xCharge : xCharge,
      yCharge : yCharge,
      radius : radius,
      q : q,
      k : k,
      n : n,
      chargeTextSet : chargeTextSet,
      nVectors : nVectors,
      nVectorsMax : nVectorsMax,
      nVectorsSq : nVectorsSq,
      nVectorsPotential : nVectorsPotential,
      nVectorsSqPotential : nVectorsSqPotential,
      vectorIndex : vectorIndex,
      Fieldx : Fieldx,
      Fieldy : Fieldy,
      Vectorx : Vectorx,
      Vectory : Vectory,
      potentialShow : potentialShow,
      factor : factor,
      VectorxPotential : VectorxPotential,
      VectoryPotential : VectoryPotential,
      potential : potential,
      posx : posx,
      posy : posy,
      FieldFlag : FieldFlag,
      Fieldmag : Fieldmag,
      redness : redness,
      greenness : greenness,
      blueness : blueness,
      colorball : colorball,
      colorballtext : colorballtext,
      colorVectors : colorVectors,
      Ex : Ex,
      Ey : Ey,
      Enetx : Enetx,
      Enety : Enety,
      Enet : Enet,
      Vnet : Vnet,
      t : t,
      dt : dt,
      x : x,
      y : y,
      vx : vx,
      vy : vy,
      xArrow : xArrow,
      yArrow : yArrow,
      collision : collision
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      s : s,
      r : r,
      size : size,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      nx : nx,
      ny : ny,
      xField : xField,
      yField : yField,
      elecField : elecField,
      font : font,
      text : text,
      nMax : nMax,
      xCharge : xCharge,
      yCharge : yCharge,
      radius : radius,
      q : q,
      k : k,
      n : n,
      chargeTextSet : chargeTextSet,
      nVectors : nVectors,
      nVectorsMax : nVectorsMax,
      nVectorsSq : nVectorsSq,
      nVectorsPotential : nVectorsPotential,
      nVectorsSqPotential : nVectorsSqPotential,
      vectorIndex : vectorIndex,
      Fieldx : Fieldx,
      Fieldy : Fieldy,
      Vectorx : Vectorx,
      Vectory : Vectory,
      potentialShow : potentialShow,
      factor : factor,
      VectorxPotential : VectorxPotential,
      VectoryPotential : VectoryPotential,
      potential : potential,
      posx : posx,
      posy : posy,
      FieldFlag : FieldFlag,
      Fieldmag : Fieldmag,
      redness : redness,
      greenness : greenness,
      blueness : blueness,
      colorball : colorball,
      colorballtext : colorballtext,
      colorVectors : colorVectors,
      Ex : Ex,
      Ey : Ey,
      Enetx : Enetx,
      Enety : Enety,
      Enet : Enet,
      Vnet : Vnet,
      t : t,
      dt : dt,
      x : x,
      y : y,
      vx : vx,
      vy : vy,
      xArrow : xArrow,
      yArrow : yArrow,
      collision : collision
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.s != "undefined") s = json.s;
    if(typeof json.r != "undefined") r = json.r;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.nx != "undefined") nx = json.nx;
    if(typeof json.ny != "undefined") ny = json.ny;
    if(typeof json.xField != "undefined") xField = json.xField;
    if(typeof json.yField != "undefined") yField = json.yField;
    if(typeof json.elecField != "undefined") elecField = json.elecField;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.nMax != "undefined") nMax = json.nMax;
    if(typeof json.xCharge != "undefined") xCharge = json.xCharge;
    if(typeof json.yCharge != "undefined") yCharge = json.yCharge;
    if(typeof json.radius != "undefined") radius = json.radius;
    if(typeof json.q != "undefined") q = json.q;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.chargeTextSet != "undefined") chargeTextSet = json.chargeTextSet;
    if(typeof json.nVectors != "undefined") nVectors = json.nVectors;
    if(typeof json.nVectorsMax != "undefined") nVectorsMax = json.nVectorsMax;
    if(typeof json.nVectorsSq != "undefined") nVectorsSq = json.nVectorsSq;
    if(typeof json.nVectorsPotential != "undefined") nVectorsPotential = json.nVectorsPotential;
    if(typeof json.nVectorsSqPotential != "undefined") nVectorsSqPotential = json.nVectorsSqPotential;
    if(typeof json.vectorIndex != "undefined") vectorIndex = json.vectorIndex;
    if(typeof json.Fieldx != "undefined") Fieldx = json.Fieldx;
    if(typeof json.Fieldy != "undefined") Fieldy = json.Fieldy;
    if(typeof json.Vectorx != "undefined") Vectorx = json.Vectorx;
    if(typeof json.Vectory != "undefined") Vectory = json.Vectory;
    if(typeof json.potentialShow != "undefined") potentialShow = json.potentialShow;
    if(typeof json.factor != "undefined") factor = json.factor;
    if(typeof json.VectorxPotential != "undefined") VectorxPotential = json.VectorxPotential;
    if(typeof json.VectoryPotential != "undefined") VectoryPotential = json.VectoryPotential;
    if(typeof json.potential != "undefined") potential = json.potential;
    if(typeof json.posx != "undefined") posx = json.posx;
    if(typeof json.posy != "undefined") posy = json.posy;
    if(typeof json.FieldFlag != "undefined") FieldFlag = json.FieldFlag;
    if(typeof json.Fieldmag != "undefined") Fieldmag = json.Fieldmag;
    if(typeof json.redness != "undefined") redness = json.redness;
    if(typeof json.greenness != "undefined") greenness = json.greenness;
    if(typeof json.blueness != "undefined") blueness = json.blueness;
    if(typeof json.colorball != "undefined") colorball = json.colorball;
    if(typeof json.colorballtext != "undefined") colorballtext = json.colorballtext;
    if(typeof json.colorVectors != "undefined") colorVectors = json.colorVectors;
    if(typeof json.Ex != "undefined") Ex = json.Ex;
    if(typeof json.Ey != "undefined") Ey = json.Ey;
    if(typeof json.Enetx != "undefined") Enetx = json.Enetx;
    if(typeof json.Enety != "undefined") Enety = json.Enety;
    if(typeof json.Enet != "undefined") Enet = json.Enet;
    if(typeof json.Vnet != "undefined") Vnet = json.Vnet;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.xArrow != "undefined") xArrow = json.xArrow;
    if(typeof json.yArrow != "undefined") yArrow = json.yArrow;
    if(typeof json.collision != "undefined") collision = json.collision;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.s != "undefined") s = json.s;
    if(typeof json.r != "undefined") r = json.r;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.nx != "undefined") nx = json.nx;
    if(typeof json.ny != "undefined") ny = json.ny;
    if(typeof json.xField != "undefined") xField = json.xField;
    if(typeof json.yField != "undefined") yField = json.yField;
    if(typeof json.elecField != "undefined") elecField = json.elecField;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.nMax != "undefined") nMax = json.nMax;
    if(typeof json.xCharge != "undefined") xCharge = json.xCharge;
    if(typeof json.yCharge != "undefined") yCharge = json.yCharge;
    if(typeof json.radius != "undefined") radius = json.radius;
    if(typeof json.q != "undefined") q = json.q;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.chargeTextSet != "undefined") chargeTextSet = json.chargeTextSet;
    if(typeof json.nVectors != "undefined") nVectors = json.nVectors;
    if(typeof json.nVectorsMax != "undefined") nVectorsMax = json.nVectorsMax;
    if(typeof json.nVectorsSq != "undefined") nVectorsSq = json.nVectorsSq;
    if(typeof json.nVectorsPotential != "undefined") nVectorsPotential = json.nVectorsPotential;
    if(typeof json.nVectorsSqPotential != "undefined") nVectorsSqPotential = json.nVectorsSqPotential;
    if(typeof json.vectorIndex != "undefined") vectorIndex = json.vectorIndex;
    if(typeof json.Fieldx != "undefined") Fieldx = json.Fieldx;
    if(typeof json.Fieldy != "undefined") Fieldy = json.Fieldy;
    if(typeof json.Vectorx != "undefined") Vectorx = json.Vectorx;
    if(typeof json.Vectory != "undefined") Vectory = json.Vectory;
    if(typeof json.potentialShow != "undefined") potentialShow = json.potentialShow;
    if(typeof json.factor != "undefined") factor = json.factor;
    if(typeof json.VectorxPotential != "undefined") VectorxPotential = json.VectorxPotential;
    if(typeof json.VectoryPotential != "undefined") VectoryPotential = json.VectoryPotential;
    if(typeof json.potential != "undefined") potential = json.potential;
    if(typeof json.posx != "undefined") posx = json.posx;
    if(typeof json.posy != "undefined") posy = json.posy;
    if(typeof json.FieldFlag != "undefined") FieldFlag = json.FieldFlag;
    if(typeof json.Fieldmag != "undefined") Fieldmag = json.Fieldmag;
    if(typeof json.redness != "undefined") redness = json.redness;
    if(typeof json.greenness != "undefined") greenness = json.greenness;
    if(typeof json.blueness != "undefined") blueness = json.blueness;
    if(typeof json.colorball != "undefined") colorball = json.colorball;
    if(typeof json.colorballtext != "undefined") colorballtext = json.colorballtext;
    if(typeof json.colorVectors != "undefined") colorVectors = json.colorVectors;
    if(typeof json.Ex != "undefined") Ex = json.Ex;
    if(typeof json.Ey != "undefined") Ey = json.Ey;
    if(typeof json.Enetx != "undefined") Enetx = json.Enetx;
    if(typeof json.Enety != "undefined") Enety = json.Enety;
    if(typeof json.Enet != "undefined") Enet = json.Enet;
    if(typeof json.Vnet != "undefined") Vnet = json.Vnet;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.xArrow != "undefined") xArrow = json.xArrow;
    if(typeof json.yArrow != "undefined") yArrow = json.yArrow;
    if(typeof json.collision != "undefined") collision = json.collision;
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
    __pagesEnabled["lookang"] = false;
    __pagesEnabled["vectorFieldlookang"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["CollisionZero"] = true;
    __pagesEnabled["CollisionOne"] = true;
    __pagesEnabled["FixRel Page"] = true;
    __pagesEnabled["FixRel Page 2"] = true;
  });

  _model.addToReset(function() {
    s = 1; // EjsS Model.Variables.Field Vars.s
    r = .12; // EjsS Model.Variables.Field Vars.r
    size = 1; // EjsS Model.Variables.Field Vars.size
    xmin = -size; // EjsS Model.Variables.Field Vars.xmin
    xmax = size; // EjsS Model.Variables.Field Vars.xmax
    ymin = -size; // EjsS Model.Variables.Field Vars.ymin
    ymax = size; // EjsS Model.Variables.Field Vars.ymax
    nx = 20; // EjsS Model.Variables.Field Vars.nx
    ny = 20; // EjsS Model.Variables.Field Vars.ny
    xField = new Array(nx); // EjsS Model.Variables.Field Vars.xField
    yField = new Array(nx); // EjsS Model.Variables.Field Vars.yField
    elecField = new Array(nx); // EjsS Model.Variables.Field Vars.elecField
  });

  _model.addToReset(function() {
    font = "normal normal 2vw "; // EjsS Model.Variables.lookang.font
    text = ""; // EjsS Model.Variables.lookang.text
    nMax = 5; // EjsS Model.Variables.lookang.nMax
    xCharge = [0,0,0,0,0]; // EjsS Model.Variables.lookang.xCharge
    yCharge = [0.5,-0.5,0,0,0]; // EjsS Model.Variables.lookang.yCharge
    radius = 0.1; // EjsS Model.Variables.lookang.radius
    q = [1,-1,1,1,1,1]; // EjsS Model.Variables.lookang.q
    k = 9*0.1; // EjsS Model.Variables.lookang.k
    n = 2; // EjsS Model.Variables.lookang.n
    chargeTextSet = ["+","−","0","0","0"]; // EjsS Model.Variables.lookang.chargeTextSet
    nVectors = 16; // EjsS Model.Variables.lookang.nVectors
    nVectorsMax = 16; // EjsS Model.Variables.lookang.nVectorsMax
    nVectorsSq = nVectors*nVectors;; // EjsS Model.Variables.lookang.nVectorsSq
    nVectorsPotential = 101; // EjsS Model.Variables.lookang.nVectorsPotential
    nVectorsSqPotential = nVectorsPotential*nVectorsPotential;; // EjsS Model.Variables.lookang.nVectorsSqPotential
    Fieldx = new Array(nVectorsSq); // EjsS Model.Variables.lookang.Fieldx
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSq; _i0+=1) {  // EjsS Model.Variables.lookang.Fieldx
        Fieldx[_i0] = 0.0;  // EjsS Model.Variables.lookang.Fieldx
      }
    }());
    Fieldy = new Array(nVectorsSq); // EjsS Model.Variables.lookang.Fieldy
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSq; _i0+=1) {  // EjsS Model.Variables.lookang.Fieldy
        Fieldy[_i0] = 0.0;  // EjsS Model.Variables.lookang.Fieldy
      }
    }());
    Vectorx = new Array(nVectorsSq); // EjsS Model.Variables.lookang.Vectorx
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSq; _i0+=1) {  // EjsS Model.Variables.lookang.Vectorx
        Vectorx[_i0] = 0.0;  // EjsS Model.Variables.lookang.Vectorx
      }
    }());
    Vectory = new Array(nVectorsSq); // EjsS Model.Variables.lookang.Vectory
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSq; _i0+=1) {  // EjsS Model.Variables.lookang.Vectory
        Vectory[_i0] = 0.0;  // EjsS Model.Variables.lookang.Vectory
      }
    }());
    factor = 1; // EjsS Model.Variables.lookang.factor
    VectorxPotential = new Array(nVectorsSqPotential); // EjsS Model.Variables.lookang.VectorxPotential
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSqPotential; _i0+=1) {  // EjsS Model.Variables.lookang.VectorxPotential
        VectorxPotential[_i0] = 0.0;  // EjsS Model.Variables.lookang.VectorxPotential
      }
    }());
    VectoryPotential = new Array(nVectorsSqPotential); // EjsS Model.Variables.lookang.VectoryPotential
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSqPotential; _i0+=1) {  // EjsS Model.Variables.lookang.VectoryPotential
        VectoryPotential[_i0] = 0.0;  // EjsS Model.Variables.lookang.VectoryPotential
      }
    }());
    potential = new Array(nVectorsPotential); // EjsS Model.Variables.lookang.potential
    (function () {
      var _i0,_i1;
      for (_i0=0; _i0<nVectorsPotential; _i0+=1) {  // EjsS Model.Variables.lookang.potential
        potential[_i0] = [];
        for (_i1=0; _i1<nVectorsPotential; _i1+=1) {  // EjsS Model.Variables.lookang.potential
          potential[_i0][_i1] = 0;  // EjsS Model.Variables.lookang.potential
        }
      }
    }());
    posx = new Array(nVectorsSq); // EjsS Model.Variables.lookang.posx
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSq; _i0+=1) {  // EjsS Model.Variables.lookang.posx
        posx[_i0] = 0.0;  // EjsS Model.Variables.lookang.posx
      }
    }());
    posy = new Array(nVectorsSq); // EjsS Model.Variables.lookang.posy
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSq; _i0+=1) {  // EjsS Model.Variables.lookang.posy
        posy[_i0] = 0.0;  // EjsS Model.Variables.lookang.posy
      }
    }());
    FieldFlag = true; // EjsS Model.Variables.lookang.FieldFlag
    Fieldmag = 0.0; // EjsS Model.Variables.lookang.Fieldmag
    redness = 220; // EjsS Model.Variables.lookang.redness
    greenness = 220; // EjsS Model.Variables.lookang.greenness
    blueness = 220; // EjsS Model.Variables.lookang.blueness
    colorball = new Array(nMax); // EjsS Model.Variables.lookang.colorball
    (function () {
      var _i0;
      for (_i0=0; _i0<nMax; _i0+=1) {  // EjsS Model.Variables.lookang.colorball
        colorball[_i0] = "rgba("+redness+","+greenness+","+blueness+",0)";  // EjsS Model.Variables.lookang.colorball
      }
    }());
    colorballtext = new Array(nMax); // EjsS Model.Variables.lookang.colorballtext
    (function () {
      var _i0;
      for (_i0=0; _i0<nMax; _i0+=1) {  // EjsS Model.Variables.lookang.colorballtext
        colorballtext[_i0] = "rgba("+redness+","+greenness+","+blueness+",0)";  // EjsS Model.Variables.lookang.colorballtext
      }
    }());
    colorVectors = new Array(nVectorsSq); // EjsS Model.Variables.lookang.colorVectors
    (function () {
      var _i0;
      for (_i0=0; _i0<nVectorsSq; _i0+=1) {  // EjsS Model.Variables.lookang.colorVectors
        colorVectors[_i0] = "";  // EjsS Model.Variables.lookang.colorVectors
      }
    }());
    Ex = new Array(nMax); // EjsS Model.Variables.lookang.Ex
    (function () {
      var _i0;
      for (_i0=0; _i0<nMax; _i0+=1) {  // EjsS Model.Variables.lookang.Ex
        Ex[_i0] = 0.0;  // EjsS Model.Variables.lookang.Ex
      }
    }());
    Ey = new Array(nMax); // EjsS Model.Variables.lookang.Ey
    (function () {
      var _i0;
      for (_i0=0; _i0<nMax; _i0+=1) {  // EjsS Model.Variables.lookang.Ey
        Ey[_i0] = 0.0;  // EjsS Model.Variables.lookang.Ey
      }
    }());
    Enetx = 0.0; // EjsS Model.Variables.lookang.Enetx
    Enety = 0.0; // EjsS Model.Variables.lookang.Enety
    Enet = 0.0; // EjsS Model.Variables.lookang.Enet
    Vnet = 0.0; // EjsS Model.Variables.lookang.Vnet
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.Test Charge Vars.t
    dt = .005; // EjsS Model.Variables.Test Charge Vars.dt
    x = (Math.random()-0.5)*2; // EjsS Model.Variables.Test Charge Vars.x
    y = (Math.random()-0.5)*2; // EjsS Model.Variables.Test Charge Vars.y
    vx = 0; // EjsS Model.Variables.Test Charge Vars.vx
    vy = 0; // EjsS Model.Variables.Test Charge Vars.vy
    collision = false; // EjsS Model.Variables.Test Charge Vars.collision
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

  // Generates vector field shown on plot  // > CustomCode.computeField:1
  // No changes required  // > CustomCode.computeField:2
  function computeField () {  // > CustomCode.computeField:3
  Enetx = 0.0;  // > CustomCode.computeField:4
  Enety = 0.0;  // > CustomCode.computeField:5
  Vnet = 0.0;  // > CustomCode.computeField:6
  for (var i = 0; i < n; i++)  // > CustomCode.computeField:7
  {  // > CustomCode.computeField:8
     var dx = x - xCharge[i];  // > CustomCode.computeField:9
      var dy = y - yCharge[i];  // > CustomCode.computeField:10
       rSquared = dx * dx + dy * dy;  // > CustomCode.computeField:11
  //rSquared=(xCharge[i]-x)*(xCharge[i]-x)+(yCharge[i]-y)*(yCharge[i]-y);  // > CustomCode.computeField:12
  Ex[i]=k*q[i]*(x-xCharge[i])/(rSquared*Math.sqrt(rSquared));  // > CustomCode.computeField:13
  Ey[i]=k*q[i]*(y-yCharge[i])/(rSquared*Math.sqrt(rSquared));  // > CustomCode.computeField:14
  Enetx = Enetx + Ex[i];  // > CustomCode.computeField:15
  Enety = Enety + Ey[i];  // > CustomCode.computeField:16
  Vnet = Vnet + k*q[i]/(Math.sqrt(rSquared));  // > CustomCode.computeField:17
  }  // > CustomCode.computeField:18
  Enet = Math.sqrt(Enetx*Enetx+Enety*Enety);  // > CustomCode.computeField:19
  }  // > CustomCode.computeField:20
  /*  // > CustomCode.computeField:21
  function computeField() {  // > CustomCode.computeField:22
    for (let i = 0; i < nx; i++) {  // > CustomCode.computeField:23
      const x = _view._vectorField2D.indexToX(i);  // > CustomCode.computeField:24
        // > CustomCode.computeField:25
      for (let j = 0; j < ny; j++) {  // > CustomCode.computeField:26
        const y = _view._vectorField2D.indexToY(j);  // > CustomCode.computeField:27
        const e = getE(x, y); // Gets the components  // > CustomCode.computeField:28
        xField[i][j] = e[0];  // > CustomCode.computeField:29
        yField[i][j] = e[1];  // > CustomCode.computeField:30
        elecField[i][j] = e[2];  // > CustomCode.computeField:31
      }  // > CustomCode.computeField:32
    }  // > CustomCode.computeField:33
  }  // > CustomCode.computeField:34
  */  // > CustomCode.computeField:35

  function calculateElectricField() {  // > CustomCode.calculateElectricField:1
   // Field for the vectors zero  // > CustomCode.calculateElectricField:2
  for (var i = 0; i < nVectors; i++)  // > CustomCode.calculateElectricField:3
  {  // > CustomCode.calculateElectricField:4
    for (var j = 0; j < nVectors; j++)  // > CustomCode.calculateElectricField:5
    {  // > CustomCode.calculateElectricField:6
      vectorIndex = i+nVectors*j;  // > CustomCode.calculateElectricField:7
      Fieldx[vectorIndex] = 0.0; //initialise to zero  // > CustomCode.calculateElectricField:8
      Fieldy[vectorIndex] = 0.0;  // > CustomCode.calculateElectricField:9
    }  // > CustomCode.calculateElectricField:10
  }  // > CustomCode.calculateElectricField:11
     // > CustomCode.calculateElectricField:12
     // > CustomCode.calculateElectricField:13
   for (var i2 = 0; i2 < n; i2++) {  // > CustomCode.calculateElectricField:14
      for (var i = 0; i < nVectors; i++) {  // > CustomCode.calculateElectricField:15
        for (var j = 0; j < nVectors; j++) {  // > CustomCode.calculateElectricField:16
          vectorIndex = i + nVectors * j;  // > CustomCode.calculateElectricField:17
       var   rSquared =  // > CustomCode.calculateElectricField:18
            (xCharge[i2] - Vectorx[vectorIndex]) * (xCharge[i2] - Vectorx[vectorIndex]) +  // > CustomCode.calculateElectricField:19
            (yCharge[i2] - Vectory[vectorIndex]) * (yCharge[i2] - Vectory[vectorIndex]);  // > CustomCode.calculateElectricField:20
          Fieldx[vectorIndex] +=  // > CustomCode.calculateElectricField:21
            (k * q[i2] * ( + Vectorx[vectorIndex]-xCharge[i2])) / (rSquared * Math.sqrt(rSquared));  // > CustomCode.calculateElectricField:22
          Fieldy[vectorIndex] +=  // > CustomCode.calculateElectricField:23
            (k * q[i2] * ( + Vectory[vectorIndex]-yCharge[i2])) / (rSquared * Math.sqrt(rSquared));  // > CustomCode.calculateElectricField:24
        }  // > CustomCode.calculateElectricField:25
      }  // > CustomCode.calculateElectricField:26
    }  // > CustomCode.calculateElectricField:27
  }  // > CustomCode.calculateElectricField:28
  function calculatePotential() {  // > CustomCode.calculateElectricField:29
     // > CustomCode.calculateElectricField:30
   // potential zero  // > CustomCode.calculateElectricField:31
  for (var i = 0; i < nVectorsPotential; i++)  // > CustomCode.calculateElectricField:32
  {  // > CustomCode.calculateElectricField:33
    for (var j = 0; j < nVectorsPotential; j++)  // > CustomCode.calculateElectricField:34
    {  // > CustomCode.calculateElectricField:35
      potential[i][j] = 0  // > CustomCode.calculateElectricField:36
    }  // > CustomCode.calculateElectricField:37
  }  // > CustomCode.calculateElectricField:38
     // > CustomCode.calculateElectricField:39
     // > CustomCode.calculateElectricField:40
   for (var i2 = 0; i2 < n; i2++) {  // > CustomCode.calculateElectricField:41
     // var factor = 10  // > CustomCode.calculateElectricField:42
      for (var i = 0; i < nVectorsPotential; i++) {  // > CustomCode.calculateElectricField:43
        for (var j = 0; j < nVectorsPotential; j++) {  // > CustomCode.calculateElectricField:44
          vectorIndexPotential = i + nVectorsPotential * j;  // > CustomCode.calculateElectricField:45
       var   rSquaredPotential =  // > CustomCode.calculateElectricField:46
            (xCharge[i2] - VectorxPotential[vectorIndexPotential]) * (xCharge[i2] - VectorxPotential[vectorIndexPotential]) +  // > CustomCode.calculateElectricField:47
            (yCharge[i2] - VectoryPotential[vectorIndexPotential]) * (yCharge[i2] - VectoryPotential[vectorIndexPotential]);  // > CustomCode.calculateElectricField:48
          potential[i][j] += (k * q[i2]) / Math.sqrt(rSquaredPotential);  // > CustomCode.calculateElectricField:49
        }  // > CustomCode.calculateElectricField:50
      }  // > CustomCode.calculateElectricField:51
    }  // > CustomCode.calculateElectricField:52
  }  // > CustomCode.calculateElectricField:53
  // Call the functions  // > CustomCode.calculateElectricField:54
  //calculateElectricField();  // > CustomCode.calculateElectricField:55
  //calculatePotential();  // > CustomCode.calculateElectricField:56

  function chargeSetup() {  // > CustomCode.chargesetup:1
    for (var i = 0; i < n; i++) {  // > CustomCode.chargesetup:2
      //var redness, greenness, blueness;  // > CustomCode.chargesetup:3
      if (q[i] > 0.0) {  // > CustomCode.chargesetup:4
        redness = 250;  // > CustomCode.chargesetup:5
        greenness = 0;  // > CustomCode.chargesetup:6
        blueness = 0;  // > CustomCode.chargesetup:7
      } else if (q[i] < 0.0) {  // > CustomCode.chargesetup:8
        redness = 0;  // > CustomCode.chargesetup:9
        greenness = 0;  // > CustomCode.chargesetup:10
        blueness = 250;  // > CustomCode.chargesetup:11
      } else {  // > CustomCode.chargesetup:12
        redness = 200;  // > CustomCode.chargesetup:13
        greenness = 200;  // > CustomCode.chargesetup:14
        blueness = 200;  // > CustomCode.chargesetup:15
      }  // > CustomCode.chargesetup:16
      colorball[i] = `rgba(${redness},${greenness},${blueness},1.0)`;  // > CustomCode.chargesetup:17
      colorballtext[i] = q[i] === 0 ? `rgba(${redness},${greenness},${blueness},0)` : "rgba(255,255,255,1.0)";  // > CustomCode.chargesetup:18
    }  // > CustomCode.chargesetup:19
  }  // > CustomCode.chargesetup:20

  function fieldLengthLimit () {  // > CustomCode.FieldLengthLimit:1
    for (i = 0; i < nVectors; i++) {  // > CustomCode.FieldLengthLimit:2
      for (j = 0; j < nVectors; j++) {  // > CustomCode.FieldLengthLimit:3
        vectorIndex = i+nVectors*j;  // > CustomCode.FieldLengthLimit:4
        Fieldmag=Math.sqrt(Fieldx[vectorIndex]*Fieldx[vectorIndex]+Fieldy[vectorIndex]*Fieldy[vectorIndex]);  // > CustomCode.FieldLengthLimit:5
        //Fieldmag=Math.min(100000,Fieldmag);  // > CustomCode.FieldLengthLimit:6
        if (Fieldmag > 0.0) {  // > CustomCode.FieldLengthLimit:7
          var constant = 0.1  // > CustomCode.FieldLengthLimit:8
          Fieldx[vectorIndex]=constant*Fieldx[vectorIndex]/Fieldmag;  // > CustomCode.FieldLengthLimit:9
          Fieldy[vectorIndex]=constant*Fieldy[vectorIndex]/Fieldmag;  // > CustomCode.FieldLengthLimit:10
          //    Fieldx[vectorIndex]=3*Fieldx[vectorIndex]/Fieldmag;  // > CustomCode.FieldLengthLimit:11
          //   Fieldy[vectorIndex]=3*Fieldy[vectorIndex]/Fieldmag;  // > CustomCode.FieldLengthLimit:12
          //  // > CustomCode.FieldLengthLimit:13
        //}  // > CustomCode.FieldLengthLimit:14
        //   posx[vectorIndex]=Vectorx[vectorIndex]-0.5*Fieldx[vectorIndex];  // > CustomCode.FieldLengthLimit:15
        //   posy[vectorIndex]=Vectory[vectorIndex]-0.5*Fieldy[vectorIndex];  // > CustomCode.FieldLengthLimit:16
        //  posx[vectorIndex]=Vectorx[vectorIndex];  // > CustomCode.FieldLengthLimit:17
        //  posy[vectorIndex]=Vectory[vectorIndex];  // > CustomCode.FieldLengthLimit:18
        Fieldmag=Math.min(10000,Fieldmag);  // > CustomCode.FieldLengthLimit:19
        //Fieldmag=Math.min(0.2,Fieldmag);  // > CustomCode.FieldLengthLimit:20
          // > CustomCode.FieldLengthLimit:21
        //redness=255-(int)(255*Fieldmag/10000);  // > CustomCode.FieldLengthLimit:22
        //redness = 255 - Math.floor(255 * Fieldmag / 10000);  // > CustomCode.FieldLengthLimit:23
        //colorVectors[vectorIndex]= "rgb(0,254,0,"+1+")";  // > CustomCode.FieldLengthLimit:24
        colorVectors[vectorIndex]= "rgb(0,100,0,"+1+")";  // > CustomCode.FieldLengthLimit:25
        }  // > CustomCode.FieldLengthLimit:26
      }  // > CustomCode.FieldLengthLimit:27
    }  // > CustomCode.FieldLengthLimit:28
  }  // > CustomCode.FieldLengthLimit:29

  function rgb(r, g, b){  // > CustomCode.rgb:1
    return "rgb("+r+","+g+","+b+")";  // > CustomCode.rgb:2
  }  // > CustomCode.rgb:3

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    t=0;  // > Initialization.Init Page:1
    //x=.3;//reset charge location  // > Initialization.Init Page:2
    //y=.2;  // > Initialization.Init Page:3
    vx=0;  // > Initialization.Init Page:4
    vy=0;  // > Initialization.Init Page:5
    collision=false;//set collision state  // > Initialization.Init Page:6
    _view.testChargeTrail.clear();  // > Initialization.Init Page:7
    computeField();  // > Initialization.Init Page:8
    chargeSetup ()  // > Initialization.Init Page:9
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["lookang"]) return;
    var dx = (xmax-xmin)/(nVectors-1);  // > Initialization.lookang:1
    var dy = (ymax-ymin)/(nVectors-1);  // > Initialization.lookang:2
    //draw outside unused arrays lookang  // > Initialization.lookang:3
    for (var i = 0; i < nVectorsMax+1; i++)  // > Initialization.lookang:4
    {  // > Initialization.lookang:5
      for (var j = 0; j < nVectorsMax+1; j++)  // > Initialization.lookang:6
      {  // > Initialization.lookang:7
       vectorIndex = i+nVectors*j;  // > Initialization.lookang:8
         // > Initialization.lookang:9
       posx[vectorIndex]=xmin-2*dx;  // > Initialization.lookang:10
        posy[vectorIndex]=ymin-2*dy; //put far away  // > Initialization.lookang:11
             // > Initialization.lookang:12
      }  // > Initialization.lookang:13
    }  // > Initialization.lookang:14
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["vectorFieldlookang"]) return;
    //nVectors = 15;  // > Initialization.vectorFieldlookang:1
    //FieldFlag=true;  // > Initialization.vectorFieldlookang:2
    const dx = (xmax - xmin) / (nVectors - 1);  // > Initialization.vectorFieldlookang:3
    const dy = (ymax - ymin) / (nVectors - 1);  // > Initialization.vectorFieldlookang:4
    for (let i = 0; i < nVectors; i++) {  // > Initialization.vectorFieldlookang:5
      for (let j = 0; j < nVectors; j++) {  // > Initialization.vectorFieldlookang:6
        const vectorIndex = i + nVectors * j;  // > Initialization.vectorFieldlookang:7
        const currentX = xmin + dx * i;  // > Initialization.vectorFieldlookang:8
        const currentY = ymin + dy * j;  // > Initialization.vectorFieldlookang:9
          // > Initialization.vectorFieldlookang:10
        posx[vectorIndex] = currentX;  // > Initialization.vectorFieldlookang:11
        posy[vectorIndex] = currentY;  // > Initialization.vectorFieldlookang:12
        Vectorx[vectorIndex] = currentX;  // > Initialization.vectorFieldlookang:13
        Vectory[vectorIndex] = currentY;  // > Initialization.vectorFieldlookang:14
      }  // > Initialization.vectorFieldlookang:15
    }  // > Initialization.vectorFieldlookang:16
    const dxPotential = (xmax - xmin) / (nVectorsPotential - 1);  // > Initialization.vectorFieldlookang:17
    const dyPotential = (ymax - ymin) / (nVectorsPotential - 1);  // > Initialization.vectorFieldlookang:18
    for (let i = 0; i < nVectorsPotential; i++) {  // > Initialization.vectorFieldlookang:19
      for (let j = 0; j < nVectorsPotential; j++) {  // > Initialization.vectorFieldlookang:20
        const vectorIndexPotential = i + nVectorsPotential * j;  // > Initialization.vectorFieldlookang:21
        const currentX = xmin + dxPotential * i;  // > Initialization.vectorFieldlookang:22
        const currentY = ymin + dyPotential * j;  // > Initialization.vectorFieldlookang:23
          // > Initialization.vectorFieldlookang:24
       // posx[vectorIndex] = currentX;  // > Initialization.vectorFieldlookang:25
       // posy[vectorIndex] = currentY;  // > Initialization.vectorFieldlookang:26
        VectorxPotential[vectorIndexPotential] = currentX;  // > Initialization.vectorFieldlookang:27
        VectoryPotential[vectorIndexPotential] = currentY;  // > Initialization.vectorFieldlookang:28
      }  // > Initialization.vectorFieldlookang:29
    }  // > Initialization.vectorFieldlookang:30
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
    computeField ()  // > FixedRelations.FixRel Page:1
    calculateElectricField();  // > FixedRelations.FixRel Page:2
    calculatePotential();  // > FixedRelations.FixRel Page:3
    //console.log(Fieldx,Fieldy)  // > FixedRelations.FixRel Page:4
    fieldLengthLimit ()  // > FixedRelations.FixRel Page:5
    //console.log(potential)  // > FixedRelations.FixRel Page:6
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page 2"]) return;
    //setting velocity arrow to match incorrect trajectory  // > FixedRelations.FixRel Page 2:1
    //and when corrected-- no changes required  // > FixedRelations.FixRel Page 2:2
    var Factor = 0.01  // > FixedRelations.FixRel Page 2:3
    if (vx==0) {  // > FixedRelations.FixRel Page 2:4
      xArrow=Factor*Enetx;  // > FixedRelations.FixRel Page 2:5
    }  // > FixedRelations.FixRel Page 2:6
    else {  // > FixedRelations.FixRel Page 2:7
      xArrow=vx;  // > FixedRelations.FixRel Page 2:8
    }  // > FixedRelations.FixRel Page 2:9
    if (vy==0) {  // > FixedRelations.FixRel Page 2:10
      yArrow=Factor*Enety;  // > FixedRelations.FixRel Page 2:11
    }  // > FixedRelations.FixRel Page 2:12
    else {  // > FixedRelations.FixRel Page 2:13
      yArrow=vy;  // > FixedRelations.FixRel Page 2:14
    }  // > FixedRelations.FixRel Page 2:15
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


    __odeSelf._getOdeVars = function (){ return["x","y","t"]};

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
      if (__pagesEnabled["CollisionZero"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      if (__pagesEnabled["CollisionOne"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
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
        if (__state[__cIn]!=y) __mustReinitialize = true;
        __state[__cIn++] = y;
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
        y = __state[__cOut++];
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
        var x = _aState[__cOut++];
        var y = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Preliminary code: Code to be executed before rate equations are evaluated
        //computeField ();  // > Preliminary code for ODE.Evol Page:1
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = Enetx; // Rate for ODE: Evol Page:x
        _aRate[__cRate++] = Enety; // Rate for ODE: Evol Page:y
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
        var y = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        y = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = y;
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
        var x = _aState[__cOut++];
        var y = _aState[__cOut++];
        var t = _aState[__cOut++];
        return Math.sqrt(Math.pow(xCharge[0]-x, 2) + Math.pow(yCharge[0]-y, 2))-(radius);  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        y = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = y;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        collision=true;  // > Event action for page Evol Page:1
        text="paused";  // > Event action for page Evol Page:2
        _pause();  // > Event action for page Evol Page:3
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
        var y = _aState[__cOut++];
        var t = _aState[__cOut++];
        const dx = xCharge[1] - x;  // > Event zero-condition for page Evol Page:1
            const dy = yCharge[1] - y;  // > Event zero-condition for page Evol Page:2
            const distance = Math.sqrt(dx * dx + dy * dy) - radius;  // > Event zero-condition for page Evol Page:3
            return distance;  // > Event zero-condition for page Evol Page:4
        //return Math.sqrt(Math.pow(xCharge[1] - x, 2) + Math.pow(yCharge[1] - y, 2)) - (radius);  // > Event zero-condition for page Evol Page:5
        //return Math.sqrt(Math.pow(xCharge[1]-x, 2) + Math.pow(yCharge[1]-y, 2))-(radius+0.4);  // > Event zero-condition for page Evol Page:6
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        y = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = y;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        collision=true;  // > Event action for page Evol Page:1
        text="paused";  // > Event action for page Evol Page:2
        _pause();  // > Event action for page Evol Page:3
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

  function _historic_y(__time) {
    var __index = 0 + 1;
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
    _view = new DipoleTrajectoryWrong602_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.executionPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'executionPanel'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  //text="paused";
  _pause();

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  //text="playing";

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton2'
          _view.fieldLinecheckBox2.linkProperty("Checked",  function() { return FieldFlag; }, function(_v) { FieldFlag = _v; } ); // HtmlView Page linking property 'Checked' for element 'fieldLinecheckBox2'
          _view.PotentialcheckBox.linkProperty("Checked",  function() { return potentialShow; }, function(_v) { potentialShow = _v; } ); // HtmlView Page linking property 'Checked' for element 'PotentialcheckBox'
          _view.resetButton2.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'resetButton2'
          _view.WebEJSbutton.setAction("OnClick", function(_data,_info) {
  window.open("https://macmath.inf.um.es/editor?id=lookang&url=https%3A//iwant2study.org/lookangejss/05electricitynmagnetism_11efield/ejss_model_DipoleTrajectoryWrong602.zip");

}); // HtmlView Page setting action 'OnClick' for element 'WebEJSbutton'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return ymax; }, function(_v) { ymax = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return xmax; }, function(_v) { xmax = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return xmin; }, function(_v) { xmin = _v; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return ymin; }, function(_v) { ymin = _v; } ); // HtmlView Page linking property 'MinimumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return "t= "+t.toFixed(2) + " s"; } ); // HtmlView Page linking property 'BRMessage' for element 'plottingPanel'
          _view.fieldpoint.linkProperty("NumberOfElements",  function() { return nVectorsSq; }, function(_v) { nVectorsSq = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'fieldpoint'
          _view.fieldpoint.linkProperty("X",  function() { return posx; }, function(_v) { posx = _v; } ); // HtmlView Page linking property 'X' for element 'fieldpoint'
          _view.fieldpoint.linkProperty("Y",  function() { return posy; }, function(_v) { posy = _v; } ); // HtmlView Page linking property 'Y' for element 'fieldpoint'
          _view.fieldpoint.linkProperty("Visibility",  function() { return FieldFlag; }, function(_v) { FieldFlag = _v; } ); // HtmlView Page linking property 'Visibility' for element 'fieldpoint'
          _view.arrowSet2.linkProperty("NumberOfElements",  function() { return nVectorsSq; }, function(_v) { nVectorsSq = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'arrowSet2'
          _view.arrowSet2.linkProperty("SizeX",  function() { return Fieldx; }, function(_v) { Fieldx = _v; } ); // HtmlView Page linking property 'SizeX' for element 'arrowSet2'
          _view.arrowSet2.linkProperty("X",  function() { return posx; }, function(_v) { posx = _v; } ); // HtmlView Page linking property 'X' for element 'arrowSet2'
          _view.arrowSet2.linkProperty("LineColor",  function() { return colorVectors; }, function(_v) { colorVectors = _v; } ); // HtmlView Page linking property 'LineColor' for element 'arrowSet2'
          _view.arrowSet2.linkProperty("Y",  function() { return posy; }, function(_v) { posy = _v; } ); // HtmlView Page linking property 'Y' for element 'arrowSet2'
          _view.arrowSet2.linkProperty("Visibility",  function() { return FieldFlag; }, function(_v) { FieldFlag = _v; } ); // HtmlView Page linking property 'Visibility' for element 'arrowSet2'
          _view.arrowSet2.linkProperty("SizeY",  function() { return Fieldy; }, function(_v) { Fieldy = _v; } ); // HtmlView Page linking property 'SizeY' for element 'arrowSet2'
          _view.Charges.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'Charges'
          _view.Charges.setAction("OnRelease", function(_data,_info) {
  //_view.trail.clear();

}); // HtmlView Page setting action 'OnRelease' for element 'Charges'
          _view.Charges.linkProperty("FillColor",  function() { return colorball; }, function(_v) { colorball = _v; } ); // HtmlView Page linking property 'FillColor' for element 'Charges'
          _view.Charges.linkProperty("SizeX",  function() { return radius*2; } ); // HtmlView Page linking property 'SizeX' for element 'Charges'
          _view.Charges.linkProperty("X",  function() { return xCharge; }, function(_v) { xCharge = _v; } ); // HtmlView Page linking property 'X' for element 'Charges'
          _view.Charges.setAction("OnEnter", function(_data,_info) {
  //vxtest=0;
  //vytest=0;

}); // HtmlView Page setting action 'OnEnter' for element 'Charges'
          _view.Charges.linkProperty("Y",  function() { return yCharge; }, function(_v) { yCharge = _v; } ); // HtmlView Page linking property 'Y' for element 'Charges'
          _view.Charges.linkProperty("SizeY",  function() { return radius*2; } ); // HtmlView Page linking property 'SizeY' for element 'Charges'
          _view.ChargetextSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'ChargetextSet'
          _view.ChargetextSet.linkProperty("X",  function() { return xCharge; }, function(_v) { xCharge = _v; } ); // HtmlView Page linking property 'X' for element 'ChargetextSet'
          _view.ChargetextSet.linkProperty("Y",  function() { return yCharge; }, function(_v) { yCharge = _v; } ); // HtmlView Page linking property 'Y' for element 'ChargetextSet'
          _view.ChargetextSet.linkProperty("Text",  function() { return chargeTextSet; }, function(_v) { chargeTextSet = _v; } ); // HtmlView Page linking property 'Text' for element 'ChargetextSet'
          _view.ChargetextSet.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'ChargetextSet'
          _view.testChargeTrail.linkProperty("InputX",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'InputX' for element 'testChargeTrail'
          _view.testChargeTrail.linkProperty("InputY",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'InputY' for element 'testChargeTrail'
          _view.testCharge.setAction("OnRelease", function(_data,_info) {
  /*
  var r2=x*x+(Math.abs(y)-s/2)*(Math.abs(y)-s/2);
  if (r2<r*r) {
    _tools.showOkDialog("playPauseButton","Collision","Test charge can not sit on charge.");
   // _view.alert("playPauseButton","Collision","Test charge can not sit on charge.");
    if (x<0) {
      x=x-1.4*r;
    }
    else {
      x=x+1.4*r;
    }
  }
  */
  vx=0;
  vy=0;
  _view.testChargeTrail.clear();

}); // HtmlView Page setting action 'OnRelease' for element 'testCharge'
          _view.testCharge.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'testCharge'
          _view.testCharge.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'testCharge'
          _view.testCharge.setAction("OnDrag", function(_data,_info) {
  collision=false;
  _view.testChargeTrail.clear();
  computeField ();

}); // HtmlView Page setting action 'OnDrag' for element 'testCharge'
          _view.testChargeGroup.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'testChargeGroup'
          _view.testChargeGroup.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'testChargeGroup'
          _view.arrow.linkProperty("SizeX",  function() { return xArrow; }, function(_v) { xArrow = _v; } ); // HtmlView Page linking property 'SizeX' for element 'arrow'
          _view.arrow.linkProperty("Visibility",  function() { return (t!=0); } ); // HtmlView Page linking property 'Visibility' for element 'arrow'
          _view.arrow.linkProperty("SizeY",  function() { return yArrow; }, function(_v) { yArrow = _v; } ); // HtmlView Page linking property 'SizeY' for element 'arrow'
          _view.textBoxShape.linkProperty("Visibility",  function() { return collision; }, function(_v) { collision = _v; } ); // HtmlView Page linking property 'Visibility' for element 'textBoxShape'
          _view.collisionText.linkProperty("Visibility",  function() { return collision; }, function(_v) { collision = _v; } ); // HtmlView Page linking property 'Visibility' for element 'collisionText'
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
function DipoleTrajectoryWrong602_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = DipoleTrajectoryWrong602_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Dipole','./DipoleTrajectoryWrong/DipoleTrajectoryWrong.html');

  return _view;
} // end of main function

function DipoleTrajectoryWrong602_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singlePlotPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'singlePlotPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"executionPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'executionPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'executionPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      .setProperty("Text","What is Wrong?") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","15vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","► Play") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","❚❚ Pause") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"fieldLinecheckBox2", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fieldLinecheckBox2'
      .setProperty("Text","Field Vectors ?") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'fieldLinecheckBox2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"PotentialcheckBox", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'PotentialcheckBox'
      .setProperty("Tooltip","light = high potential, black = low potential") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'PotentialcheckBox'
      .setProperty("Text","Potential ?") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'PotentialcheckBox'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'PotentialcheckBox'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton2", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton2'
      .setProperty("Width","15vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton2'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'resetButton2'
      .setProperty("Text","↻ Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"WebEJSbutton", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'WebEJSbutton'
      .setProperty("Tooltip","open up file in https://macmath.inf.um.es/") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'WebEJSbutton'
      .setProperty("Text","edit in WebEJS") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'WebEJSbutton'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("Background","Black") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel'
      .setProperty("EnabledZooming",false) // EJsS HtmlView.HtmlView Page: setting property 'EnabledZooming' for element 'plottingPanel'
      .setProperty("YScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_NONE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("XTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("MarginX",0) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanel'
      .setProperty("MarginY",0) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"fieldpoint", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fieldpoint'
      .setProperty("FillColor","Orange") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'fieldpoint'
      .setProperty("SizeX",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'fieldpoint'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'fieldpoint'
      .setProperty("SizeY",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'fieldpoint'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'fieldpoint'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"arrowSet2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowSet2'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'arrowSet2'
      .setProperty("LineWidth",8) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'arrowSet2'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrowSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"Charges", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'Charges'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'Charges'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'Charges'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'Charges'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"ChargetextSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ChargetextSet'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'ChargetextSet'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"testChargeTrail", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'testChargeTrail'
      .setProperty("LineColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'testChargeTrail'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'testChargeTrail'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'testChargeTrail'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"testCharge", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'testCharge'
      .setProperty("FillColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'testCharge'
      .setProperty("Sensitivity",30) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'testCharge'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'testCharge'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'testCharge'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'testCharge'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'testCharge'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'testCharge'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"testChargeGroup", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'testChargeGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow", _view.testChargeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'arrow'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'arrow'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"textBoxShape", _view.testChargeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'textBoxShape'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'textBoxShape'
      .setProperty("SizeX",0.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'textBoxShape'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'textBoxShape'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'textBoxShape'
      .setProperty("Y",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'textBoxShape'
      .setProperty("SizeY",0.08) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'textBoxShape'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"collisionText", _view.testChargeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'collisionText'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'collisionText'
      .setProperty("Y",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'collisionText'
      .setProperty("Text","Collision!") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'collisionText'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h2>Dipole Trajectory Wrong Model</h2> <p>The erroneous EJSS Dipole Trajectory model portrays the electric field produced by a dipole, a pair of equal and oppositely charged particles. Rearrange the positions of the two dipole charges by dragging and dropping them, thereby altering the gap between these charges. While a positive test charge travels within the dipole's field, it displays its velocity vector; however, the path it follows is inaccurate.</p>  <p>Using the EJSS authoring toolkit installed <a href=\"https://gitlab.com/ejsS/JavaScriptEditor/release\">here</a>, Select \"A EJSS digital Library\", in Library select \"JS EJS model in Singapore\", double click folder \"05electricitynmagnetism_11efield\", and double click filename \"DipoleTrajectoryWrong\" and click button \"Download\". Save the model source code inside your EJSS defined workspace/source/</p> <h2>Exercises:</h2> <ol>   <li>Run the simulation and observe the dipole field due to fixed charges (red and blue). Also note the trajectory of the test charge. Recall that a test charge is defined to feel the effects of an external electric field, but not change the field itself (therefore, there are no field vectors around it).. You can move the test charge anywhere on the screen (except on top of one of the stationary charges). You can also change the separation by dragging on the charges, between the two fixed charges.</li>   <li>What is wrong with this simulation? What is your evidence? Hint: Pause the simulation at several points and look at the velocity vector.   Compare it with the Electric field. Should the velocity point in the same direction as the field? Why or why not?</li>   <li>If you have EJSS installed, now that you have determined what is wrong with the model, correct it.   You will need to go to Model-&gt;Evolution to make the changes.   Describe how you changed it and how you verified your work.</li> </ol>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new DipoleTrajectoryWrong602("_topFrame","_ejs_library/",null);
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
