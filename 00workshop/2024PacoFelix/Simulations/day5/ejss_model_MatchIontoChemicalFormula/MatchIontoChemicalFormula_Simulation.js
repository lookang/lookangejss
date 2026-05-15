/* _inputParameters: an object with different values for the model parameters */
function MatchIontoChemicalFormula(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

var numericJS = numeric;
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

  var numberOfAnswers; // EjsS Model.Variables.EditableVariables.numberOfAnswers
  var answerStringArray; // EjsS Model.Variables.EditableVariables.answerStringArray
  var numberofrounds; // EjsS Model.Variables.EditableVariables.numberofrounds
  var vx; // EjsS Model.Variables.EditableVariables.vx
  var backGroundImage; // EjsS Model.Variables.EditableVariables.backGroundImage
  var title; // EjsS Model.Variables.EditableVariables.title
  var Once; // EjsS Model.Variables.EditableVariables.Once

  var font; // EjsS Model.Variables.Var Table.font
  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var n; // EjsS Model.Variables.Var Table.n
  var x; // EjsS Model.Variables.Var Table.x
  var ymax; // EjsS Model.Variables.Var Table.ymax
  var y; // EjsS Model.Variables.Var Table.y
  var vy; // EjsS Model.Variables.Var Table.vy
  var text; // EjsS Model.Variables.Var Table.text
  var textanswer; // EjsS Model.Variables.Var Table.textanswer
  var vocabaudio; // EjsS Model.Variables.Var Table.vocabaudio
  var a; // EjsS Model.Variables.Var Table.a
  var b; // EjsS Model.Variables.Var Table.b
  var c; // EjsS Model.Variables.Var Table.c

  var xc; // EjsS Model.Variables.Var Table 2.xc
  var yc; // EjsS Model.Variables.Var Table 2.yc
  var score; // EjsS Model.Variables.Var Table 2.score
  var textcatch; // EjsS Model.Variables.Var Table 2.textcatch
  var correct; // EjsS Model.Variables.Var Table 2.correct
  var log; // EjsS Model.Variables.Var Table 2.log
  var notrynumber; // EjsS Model.Variables.Var Table 2.notrynumber

  var xText; // EjsS Model.Variables.Texts.xText
  var yText; // EjsS Model.Variables.Texts.yText
  var xTextDisp; // EjsS Model.Variables.Texts.xTextDisp
  var yTextDisp; // EjsS Model.Variables.Texts.yTextDisp
  var textFontSize; // EjsS Model.Variables.Texts.textFontSize

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
      numberOfAnswers : numberOfAnswers,
      answerStringArray : answerStringArray,
      numberofrounds : numberofrounds,
      vx : vx,
      backGroundImage : backGroundImage,
      title : title,
      Once : Once,
      font : font,
      t : t,
      dt : dt,
      n : n,
      x : x,
      ymax : ymax,
      y : y,
      vy : vy,
      text : text,
      textanswer : textanswer,
      vocabaudio : vocabaudio,
      a : a,
      b : b,
      c : c,
      xc : xc,
      yc : yc,
      score : score,
      textcatch : textcatch,
      correct : correct,
      log : log,
      notrynumber : notrynumber,
      xText : xText,
      yText : yText,
      xTextDisp : xTextDisp,
      yTextDisp : yTextDisp,
      textFontSize : textFontSize
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      numberOfAnswers : numberOfAnswers,
      answerStringArray : answerStringArray,
      numberofrounds : numberofrounds,
      vx : vx,
      backGroundImage : backGroundImage,
      title : title,
      font : font,
      t : t,
      dt : dt,
      n : n,
      x : x,
      ymax : ymax,
      y : y,
      vy : vy,
      text : text,
      textanswer : textanswer,
      vocabaudio : vocabaudio,
      a : a,
      b : b,
      c : c,
      xc : xc,
      yc : yc,
      score : score,
      textcatch : textcatch,
      correct : correct,
      log : log,
      notrynumber : notrynumber
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.numberOfAnswers != "undefined") numberOfAnswers = json.numberOfAnswers;
    if(typeof json.answerStringArray != "undefined") answerStringArray = json.answerStringArray;
    if(typeof json.numberofrounds != "undefined") numberofrounds = json.numberofrounds;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.backGroundImage != "undefined") backGroundImage = json.backGroundImage;
    if(typeof json.title != "undefined") title = json.title;
    if(typeof json.Once != "undefined") Once = json.Once;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.textanswer != "undefined") textanswer = json.textanswer;
    if(typeof json.vocabaudio != "undefined") vocabaudio = json.vocabaudio;
    if(typeof json.a != "undefined") a = json.a;
    if(typeof json.b != "undefined") b = json.b;
    if(typeof json.c != "undefined") c = json.c;
    if(typeof json.xc != "undefined") xc = json.xc;
    if(typeof json.yc != "undefined") yc = json.yc;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.textcatch != "undefined") textcatch = json.textcatch;
    if(typeof json.correct != "undefined") correct = json.correct;
    if(typeof json.log != "undefined") log = json.log;
    if(typeof json.notrynumber != "undefined") notrynumber = json.notrynumber;
    if(typeof json.xText != "undefined") xText = json.xText;
    if(typeof json.yText != "undefined") yText = json.yText;
    if(typeof json.xTextDisp != "undefined") xTextDisp = json.xTextDisp;
    if(typeof json.yTextDisp != "undefined") yTextDisp = json.yTextDisp;
    if(typeof json.textFontSize != "undefined") textFontSize = json.textFontSize;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.numberOfAnswers != "undefined") numberOfAnswers = json.numberOfAnswers;
    if(typeof json.answerStringArray != "undefined") answerStringArray = json.answerStringArray;
    if(typeof json.numberofrounds != "undefined") numberofrounds = json.numberofrounds;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.backGroundImage != "undefined") backGroundImage = json.backGroundImage;
    if(typeof json.title != "undefined") title = json.title;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.textanswer != "undefined") textanswer = json.textanswer;
    if(typeof json.vocabaudio != "undefined") vocabaudio = json.vocabaudio;
    if(typeof json.a != "undefined") a = json.a;
    if(typeof json.b != "undefined") b = json.b;
    if(typeof json.c != "undefined") c = json.c;
    if(typeof json.xc != "undefined") xc = json.xc;
    if(typeof json.yc != "undefined") yc = json.yc;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.textcatch != "undefined") textcatch = json.textcatch;
    if(typeof json.correct != "undefined") correct = json.correct;
    if(typeof json.log != "undefined") log = json.log;
    if(typeof json.notrynumber != "undefined") notrynumber = json.notrynumber;
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
    __pagesEnabled["FullElements"] = true;
    __pagesEnabled["shuffleArray(array)"] = true;
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["messageSize"] = true;
    __pagesEnabled["picturesize"] = true;
    __pagesEnabled["Text"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["collisioncorrect"] = true;
    __pagesEnabled["miss"] = true;
    __pagesEnabled["miss1"] = true;
    __pagesEnabled["miss2"] = true;
    __pagesEnabled["miss3"] = true;
    __pagesEnabled["collisionwrong2"] = true;
    __pagesEnabled["collisionwrong 3"] = true;
    __pagesEnabled["collisionwrong 4"] = true;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    numberOfAnswers = 4; // EjsS Model.Variables.EditableVariables.numberOfAnswers
    answerStringArray = new Array(numberOfAnswers); // EjsS Model.Variables.EditableVariables.answerStringArray
    numberofrounds = 10; // EjsS Model.Variables.EditableVariables.numberofrounds
    vx = new Array(numberOfAnswers); // EjsS Model.Variables.EditableVariables.vx
    (function () {
      var _i0;
      for (_i0=0; _i0<numberOfAnswers; _i0+=1) {  // EjsS Model.Variables.EditableVariables.vx
        vx[_i0] = Math.max(Math.random(),0.5);  // EjsS Model.Variables.EditableVariables.vx
      }
    }());
    backGroundImage = "./Unnamed3/soccer-field.png"; // EjsS Model.Variables.EditableVariables.backGroundImage
    title = "Match the Ion to its corresponding Chemical Formula"; // EjsS Model.Variables.EditableVariables.title
    Once = false; // EjsS Model.Variables.EditableVariables.Once
  });

  _model.addToReset(function() {
    font = ""; // EjsS Model.Variables.Var Table.font
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    n = numberOfAnswers; // EjsS Model.Variables.Var Table.n
    x = new Array(n); // EjsS Model.Variables.Var Table.x
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.x
        x[_i0] = 2.8;  // EjsS Model.Variables.Var Table.x
      }
    }());
    ymax = 6; // EjsS Model.Variables.Var Table.ymax
    y = new Array(n); // EjsS Model.Variables.Var Table.y
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.y
        y[_i0] = "";  // EjsS Model.Variables.Var Table.y
      }
    }());
    vy = new Array(n); // EjsS Model.Variables.Var Table.vy
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.vy
        vy[_i0] = 0;  // EjsS Model.Variables.Var Table.vy
      }
    }());
    text = [1,2,3,4]; // EjsS Model.Variables.Var Table.text
    textanswer = new Array(n); // EjsS Model.Variables.Var Table.textanswer
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.textanswer
        textanswer[_i0] = "";  // EjsS Model.Variables.Var Table.textanswer
      }
    }());
    a = new Array(n); // EjsS Model.Variables.Var Table.a
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.a
        a[_i0] = Math.round(Math.random()*10);  // EjsS Model.Variables.Var Table.a
      }
    }());
    b = new Array(n); // EjsS Model.Variables.Var Table.b
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.b
        b[_i0] = Math.round(Math.random()*10);  // EjsS Model.Variables.Var Table.b
      }
    }());
    c = new Array(n); // EjsS Model.Variables.Var Table.c
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.c
        c[_i0] = 1;  // EjsS Model.Variables.Var Table.c
      }
    }());
  });

  _model.addToReset(function() {
    xc = 0; // EjsS Model.Variables.Var Table 2.xc
    yc = 2.5; // EjsS Model.Variables.Var Table 2.yc
    score = 0; // EjsS Model.Variables.Var Table 2.score
    textcatch = ""; // EjsS Model.Variables.Var Table 2.textcatch
    correct = 0; // EjsS Model.Variables.Var Table 2.correct
    notrynumber = 0; // EjsS Model.Variables.Var Table 2.notrynumber
  });

  _model.addToReset(function() {
    xText = new Array(n); // EjsS Model.Variables.Texts.xText
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Texts.xText
        xText[_i0] = 0;  // EjsS Model.Variables.Texts.xText
      }
    }());
    yText = new Array(n); // EjsS Model.Variables.Texts.yText
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Texts.yText
        yText[_i0] = 0;  // EjsS Model.Variables.Texts.yText
      }
    }());
    xTextDisp = new Array(n); // EjsS Model.Variables.Texts.xTextDisp
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Texts.xTextDisp
        xTextDisp[_i0] = 0;  // EjsS Model.Variables.Texts.xTextDisp
      }
    }());
    yTextDisp = new Array(n); // EjsS Model.Variables.Texts.yTextDisp
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Texts.yTextDisp
        yTextDisp[_i0] = 0.25;  // EjsS Model.Variables.Texts.yTextDisp
      }
    }());
    textFontSize = 20; // EjsS Model.Variables.Texts.textFontSize
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

  // in initialization  // > CustomCode.shuffleArray(array):1
  // possible usage if x is the array  // > CustomCode.shuffleArray(array):2
  //shuffleArray(x);  // > CustomCode.shuffleArray(array):3
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array  // > CustomCode.shuffleArray(array):4
  /**  // > CustomCode.shuffleArray(array):5
   * Randomize array element order in-place.  // > CustomCode.shuffleArray(array):6
   * Using Durstenfeld shuffle algorithm.  // > CustomCode.shuffleArray(array):7
   */  // > CustomCode.shuffleArray(array):8
  function shuffleArray(array) {  // > CustomCode.shuffleArray(array):9
      for (var i = array.length - 1; i > 0; i--) {  // > CustomCode.shuffleArray(array):10
          var j = Math.floor(Math.random() * (i + 1));  // > CustomCode.shuffleArray(array):11
          var temp = array[i];  // > CustomCode.shuffleArray(array):12
          array[i] = array[j];  // > CustomCode.shuffleArray(array):13
          array[j] = temp;  // > CustomCode.shuffleArray(array):14
      }  // > CustomCode.shuffleArray(array):15
  }  // > CustomCode.shuffleArray(array):16

  var ions = [  // > CustomCode.Ions:1
      { name: "Hydrogen Ion", symbol: "H⁺" },  // > CustomCode.Ions:2
      { name: "Hydride", symbol: "H⁻" },  // > CustomCode.Ions:3
      { name: "Lithium Ion", symbol: "Li⁺" },  // > CustomCode.Ions:4
      { name: "Sodium Ion", symbol: "Na⁺" },  // > CustomCode.Ions:5
      { name: "Potassium Ion", symbol: "K⁺" },  // > CustomCode.Ions:6
      { name: "Rubidium Ion", symbol: "Rb⁺" },  // > CustomCode.Ions:7
      { name: "Cesium Ion", symbol: "Cs⁺" },  // > CustomCode.Ions:8
      { name: "Beryllium Ion", symbol: "Be²⁺" },  // > CustomCode.Ions:9
      { name: "Magnesium Ion", symbol: "Mg²⁺" },  // > CustomCode.Ions:10
      { name: "Calcium Ion", symbol: "Ca²⁺" },  // > CustomCode.Ions:11
      { name: "Strontium Ion", symbol: "Sr²⁺" },  // > CustomCode.Ions:12
      { name: "Barium Ion", symbol: "Ba²⁺" },  // > CustomCode.Ions:13
      { name: "Aluminum Ion", symbol: "Al³⁺" },  // > CustomCode.Ions:14
      { name: "Gallium Ion", symbol: "Ga³⁺" },  // > CustomCode.Ions:15
      { name: "Iron(II) Ion", symbol: "Fe²⁺" },  // > CustomCode.Ions:16
      { name: "Iron(III) Ion", symbol: "Fe³⁺" },  // > CustomCode.Ions:17
      { name: "Copper(I) Ion", symbol: "Cu⁺" },  // > CustomCode.Ions:18
      { name: "Copper(II) Ion", symbol: "Cu²⁺" },  // > CustomCode.Ions:19
      { name: "Silver Ion", symbol: "Ag⁺" },  // > CustomCode.Ions:20
      { name: "Zinc Ion", symbol: "Zn²⁺" },  // > CustomCode.Ions:21
      { name: "Nickel(II) Ion", symbol: "Ni²⁺" },  // > CustomCode.Ions:22
      { name: "Nickel(III) Ion", symbol: "Ni³⁺" },  // > CustomCode.Ions:23
      { name: "Lead(II) Ion", symbol: "Pb²⁺" },  // > CustomCode.Ions:24
      { name: "Lead(IV) Ion", symbol: "Pb⁴⁺" },  // > CustomCode.Ions:25
      { name: "Tin(II) Ion", symbol: "Sn²⁺" },  // > CustomCode.Ions:26
      { name: "Tin(IV) Ion", symbol: "Sn⁴⁺" },  // > CustomCode.Ions:27
      { name: "Mercury(I) Ion", symbol: "Hg²⁺" },  // > CustomCode.Ions:28
      { name: "Mercury(II) Ion", symbol: "Hg²⁺" },  // > CustomCode.Ions:29
      { name: "Chromium(II) Ion", symbol: "Cr²⁺" },  // > CustomCode.Ions:30
      { name: "Chromium(III) Ion", symbol: "Cr³⁺" },  // > CustomCode.Ions:31
      { name: "Manganese(II) Ion", symbol: "Mn²⁺" },  // > CustomCode.Ions:32
      { name: "Manganese(IV) Ion", symbol: "Mn⁴⁺" },  // > CustomCode.Ions:33
      { name: "Cobalt(II) Ion", symbol: "Co²⁺" },  // > CustomCode.Ions:34
      { name: "Cobalt(III) Ion", symbol: "Co³⁺" },  // > CustomCode.Ions:35
      { name: "Cadmium Ion", symbol: "Cd²⁺" },  // > CustomCode.Ions:36
      { name: "Bismuth(III) Ion", symbol: "Bi³⁺" },  // > CustomCode.Ions:37
      { name: "Tungsten(II) Ion", symbol: "W²⁺" },  // > CustomCode.Ions:38
      { name: "Tungsten(IV) Ion", symbol: "W⁴⁺" },  // > CustomCode.Ions:39
      { name: "Vanadium(II) Ion", symbol: "V²⁺" },  // > CustomCode.Ions:40
      { name: "Vanadium(III) Ion", symbol: "V³⁺" },  // > CustomCode.Ions:41
      { name: "Ammonium", symbol: "NH₄⁺" },  // > CustomCode.Ions:42
      { name: "Oxide", symbol: "O²⁻" },  // > CustomCode.Ions:43
      { name: "Peroxide", symbol: "O₂²⁻" },  // > CustomCode.Ions:44
      { name: "Hydroxide", symbol: "OH⁻" },  // > CustomCode.Ions:45
      { name: "Fluoride", symbol: "F⁻" },  // > CustomCode.Ions:46
      { name: "Chloride", symbol: "Cl⁻" },  // > CustomCode.Ions:47
      { name: "Bromide", symbol: "Br⁻" },  // > CustomCode.Ions:48
      { name: "Iodide", symbol: "I⁻" },  // > CustomCode.Ions:49
      { name: "Nitrate", symbol: "NO₃⁻" },  // > CustomCode.Ions:50
      { name: "Nitrite", symbol: "NO₂⁻" },  // > CustomCode.Ions:51
      { name: "Sulfate", symbol: "SO₄²⁻" },  // > CustomCode.Ions:52
      { name: "Sulfite", symbol: "SO₃²⁻" },  // > CustomCode.Ions:53
      { name: "Phosphate", symbol: "PO₄³⁻" },  // > CustomCode.Ions:54
      { name: "Phosphite", symbol: "PO₃³⁻" },  // > CustomCode.Ions:55
      { name: "Carbonate", symbol: "CO₃²⁻" },  // > CustomCode.Ions:56
      { name: "Bicarbonate", symbol: "HCO₃⁻" },  // > CustomCode.Ions:57
      { name: "Acetate", symbol: "C₂H₃O₂⁻" },  // > CustomCode.Ions:58
      { name: "Oxalate", symbol: "C₂O₄²⁻" },  // > CustomCode.Ions:59
      { name: "Cyanide", symbol: "CN⁻" },  // > CustomCode.Ions:60
      { name: "Thiocyanate", symbol: "SCN⁻" },  // > CustomCode.Ions:61
      { name: "Manganate(VII)", symbol: "MnO₄⁻" },  // > CustomCode.Ions:62
      { name: "Chromate(III)", symbol: "CrO₄²⁻" },  // > CustomCode.Ions:63
      { name: "Chromate(VI)", symbol: "Cr₂O₇²⁻" },  // > CustomCode.Ions:64
      { name: "Chlorate(VII)", symbol: "ClO₄⁻" },  // > CustomCode.Ions:65
      { name: "Chlorate(V)", symbol: "ClO₃⁻" },  // > CustomCode.Ions:66
      { name: "Chlorate(III)", symbol: "ClO₂⁻" },  // > CustomCode.Ions:67
      { name: "Chlorate(I)", symbol: "ClO⁻" },  // > CustomCode.Ions:68
      { name: "Thiosulfate", symbol: "S₂O₃²⁻" },  // > CustomCode.Ions:69
      { name: "Thiocyanate", symbol: "SCN⁻" },  // > CustomCode.Ions:70
      { name: "Zincate", symbol: "Zn(OH)₄²⁻" },  // > CustomCode.Ions:71
      { name: "Aluminate", symbol: "Al(OH)₄⁻" },  // > CustomCode.Ions:72
      { name: "Silicate", symbol: "SiO₄⁴⁻" },  // > CustomCode.Ions:73
      { name: "Hydrogen Phosphate", symbol: "HPO₄²⁻" },  // > CustomCode.Ions:74
      { name: "Hydrogen Sulfate", symbol: "HSO₄⁻" },  // > CustomCode.Ions:75
      { name: "Hydrogen Sulfite", symbol: "HSO₃⁻" },  // > CustomCode.Ions:76
      { name: "Hydrogen Carbonate", symbol: "HCO₃⁻" },  // > CustomCode.Ions:77
      { name: "Hydrogen Sulfide", symbol: "HS⁻" },  // > CustomCode.Ions:78
      { name: "Carbide", symbol: "C₂²⁻" },  // > CustomCode.Ions:79
      { name: "Tartrate", symbol: "C₄H₄O₆²⁻" },  // > CustomCode.Ions:80
      { name: "Citrate", symbol: "C₆H₅O₇³⁻" },  // > CustomCode.Ions:81
      { name: "Oxalate", symbol: "C₂O₄²⁻" },  // > CustomCode.Ions:82
  ];  // > CustomCode.Ions:83

  // copy this custom function  // > CustomCode.speech:1
  // in iOS need to add speech to the play button as On iOS the API works but must be triggered by a user action callback, like a response to a tap event, to provide a better experience to users and avoid unexpected sounds out of your phone  // > CustomCode.speech:2
  function speech (option) {  // > CustomCode.speech:3
  // allow code to run in Student Learning Space   // > CustomCode.speech:4
  var isCordova = (!!this.parent.cordova || !!window.cordova);  // > CustomCode.speech:5
  if(isCordova) { // check it is running in Android or iOS  // > CustomCode.speech:6
          parent.TTS.speak({text:option,locale:'en-US'});  // > CustomCode.speech:7
  	// parent.TTS.speak({text:option,locale:'en-US'});  // > CustomCode.speech:8
  } else {  // > CustomCode.speech:9
    var msg = new SpeechSynthesisUtterance(option);  // > CustomCode.speech:10
    //https://stackoverflow.com/questions/43983845/speechsynthesis-api-for-english-firefox  // > CustomCode.speech:11
    // Set the text.  // > CustomCode.speech:12
  	//msg.text = option;   // > CustomCode.speech:13
  	//https://forums.developer.apple.com/message/323564#323564  // > CustomCode.speech:14
  	// comment out the next 2 lines for english  // > CustomCode.speech:15
  //msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Ting-Ting'; })[0];  // > CustomCode.speech:16
  msg.lang = 'en-US'; // need for android?  // > CustomCode.speech:17
  //https://flaviocopes.com/speech-synthesis-api/  // > CustomCode.speech:18
  //debug  // > CustomCode.speech:19
  //console.log(`Voices #: ${speechSynthesis.getVoices().length}`)  // > CustomCode.speech:20
  //speechSynthesis.getVoices().forEach(voice => {  // > CustomCode.speech:21
  // console.log(voice.name, voice.lang)  // > CustomCode.speech:22
  //})  // > CustomCode.speech:23
  //debug  // > CustomCode.speech:24
  // Queue this utterance.  // > CustomCode.speech:25
  window.speechSynthesis.speak(msg);  // > CustomCode.speech:26
  }  // > CustomCode.speech:27
  }  // > CustomCode.speech:28

  function vyspeedchange () {  // > CustomCode.vyspeedchange:1
    for (var counter=0; counter<n  ; counter++) {  // > CustomCode.vyspeedchange:2
    vx[counter] = Math.max(Math.random(),0.5);  // > CustomCode.vyspeedchange:3
  }  // > CustomCode.vyspeedchange:4
  }  // > CustomCode.vyspeedchange:5

  function setResponsiveFontSize() {  // > CustomCode.setResponsiveFontSize:1
      // Get the viewport dimensions  // > CustomCode.setResponsiveFontSize:2
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;  // > CustomCode.setResponsiveFontSize:3
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;  // > CustomCode.setResponsiveFontSize:4
      var percent = 0.03  // > CustomCode.setResponsiveFontSize:5
      // Calculate the font size based on viewport width or height  // > CustomCode.setResponsiveFontSize:6
      var fontSize = Math.min(viewportWidth * percent, viewportHeight * percent); // Adjust the multiplier as needed  // > CustomCode.setResponsiveFontSize:7
      // Set the font size  // > CustomCode.setResponsiveFontSize:8
      font = "normal normal " + fontSize + "px"; // You can use px or other units as needed  // > CustomCode.setResponsiveFontSize:9
      // Apply the font size to your elements  // > CustomCode.setResponsiveFontSize:10
      // For example, you can apply it to a specific element with a class  // > CustomCode.setResponsiveFontSize:11
      //document.getElementById("yourElementId").style.font = font;  // > CustomCode.setResponsiveFontSize:12
  }  // > CustomCode.setResponsiveFontSize:13

  // shuffleAA  // > CustomCode.shuffleAA:1
  function shuffleIndices(arrayLength) {  // > CustomCode.shuffleAA:2
      let indices = Array.from({ length: arrayLength }, (_, i) => i);  // > CustomCode.shuffleAA:3
      for (let i = indices.length - 1; i > 0; i--) {  // > CustomCode.shuffleAA:4
          const j = Math.floor(Math.random() * (i + 1));  // > CustomCode.shuffleAA:5
          [indices[i], indices[j]] = [indices[j], indices[i]];  // > CustomCode.shuffleAA:6
      }  // > CustomCode.shuffleAA:7
      return indices;  // > CustomCode.shuffleAA:8
  }  // > CustomCode.shuffleAA:9

  _model.addToInitialization(function() {
    if (!__pagesEnabled["FullElements"]) return;
    // Shuffle the indices of all ions  // > Initialization.FullElements:1
    let shuffledIndices = shuffleIndices(ions.length);  // > Initialization.FullElements:2
    ions = shuffledIndices.map(i => ions[i]);  // > Initialization.FullElements:3
    _println(ions[0].name + "'s symbol is "+ions[0].symbol);  // > Initialization.FullElements:4
    textcatch = ions[0].name // assign first word to catcher rabbit  // > Initialization.FullElements:5
    for (var i=0; i<answerStringArray.length; i++) {  // > Initialization.FullElements:6
        answerStringArray[i] = ions[i].symbol;  // > Initialization.FullElements:7
    }  // > Initialization.FullElements:8
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["shuffleArray(array)"]) return;
    let shuffledIndices = shuffleIndices(answerStringArray.length);  // > Initialization.shuffleArray(array):1
    ///answerStringArray = shuffledIndices.map(i => answerStringArray[i]);  // > Initialization.shuffleArray(array):2
    console.log("Shuffled  answerStringArray:", answerStringArray);  // > Initialization.shuffleArray(array):3
    textanswer = answerStringArray;  // > Initialization.shuffleArray(array):4
    //numeric.linspace (start,stop,number)  // > Initialization.shuffleArray(array):5
    y = numeric.linspace(0,ymax,numberOfAnswers) //using numeric library to arrange  // > Initialization.shuffleArray(array):6
    shuffleArray(y);  // > Initialization.shuffleArray(array):7
    //  // > Initialization.shuffleArray(array):8
    setResponsiveFontSize()  // > Initialization.shuffleArray(array):9
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (log==undefined){  // > Initialization.undefined:1
      log="";  // > Initialization.undefined:2
      }  // > Initialization.undefined:3
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["messageSize"]) return;
    if (_isMobile){  // > Initialization.messageSize:1
      //do nothing  // > Initialization.messageSize:2
      }  // > Initialization.messageSize:3
        // > Initialization.messageSize:4
      else{  // > Initialization.messageSize:5
        // copy this into the initialization  // > Initialization.messageSize:6
    // make the font bigger  // > Initialization.messageSize:7
    var fontSize = "1vw"  // > Initialization.messageSize:8
    _view.plottingPanel.getMessageDecoration("TL").getFont().setFontSize(fontSize);  // > Initialization.messageSize:9
    _view.plottingPanel.getMessageDecoration("TR").getFont().setFontSize(fontSize);  // > Initialization.messageSize:10
    _view.plottingPanel.getMessageDecoration("BL").getFont().setFontSize(fontSize);  // > Initialization.messageSize:11
    _view.plottingPanel.getMessageDecoration("BR").getFont().setFontSize(fontSize);  // > Initialization.messageSize:12
    //_view.plottingPanel.getMessageDecoration("TL").getStyle().setFillColor("red");  // > Initialization.messageSize:13
        }  // > Initialization.messageSize:14
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["picturesize"]) return;
    //orig_listener = _view.plottingPanel.getAxisX().panelChangeListener; _view.plottingPanel.getAxisX().panelChangeListener = function(e) { orig_listener(e); _view.backgroundsoccerfield.setSizeX(_view.plottingPanel.getRealWorldXMax()-_view.plottingPanel.getRealWorldXMin()); _view.backgroundsoccerfield.setSizeY(_view.plottingPanel.getRealWorldYMax()-_view.plottingPanel.getRealWorldYMin()); }  // > Initialization.picturesize:1
    if (Once ==false){  // > Initialization.picturesize:2
    EJSS_INTERFACE.BoxPanel.showOkDialog("Move the Hive to catch the bees carrying the correct Chemical Formula to the Ion!");  // > Initialization.picturesize:3
    Once =true  // > Initialization.picturesize:4
          // > Initialization.picturesize:5
    }  // > Initialization.picturesize:6
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Text"]) return;
    // Text  // > Initialization.Text:1
    const POSITIONS =  [-0.01,0.1];  // > Initialization.Text:2
    for (var i=0; i<n; i++) {  // > Initialization.Text:3
        var random = Math.random();  // > Initialization.Text:4
        var index = (random<0.5) ? 0 : 1;   // > Initialization.Text:5
      //  xTextDisp[i] = POSITIONS[index];  // > Initialization.Text:6
    }  // > Initialization.Text:7
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
    for (var i=0; i<n; i++) {  // > FixedRelations.FixRel Page:1
        xText[i] = x[i] + xTextDisp[i];  // > FixedRelations.FixRel Page:2
        yText[i] = y[i] + yTextDisp[i];  // > FixedRelations.FixRel Page:3
    }  // > FixedRelations.FixRel Page:4
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
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;

    var _xLength;

    __odeSelf._getOdeVars = function (){ return["x","t"]};

    __odeSelf.setSolverClass = function(__aSolverClass) {
      __solverClass = __aSolverClass;
      __instantiateSolver();
    };

    function __instantiateSolver() {
      __state=[];
      _xLength = x.length;
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
      if (__pagesEnabled["collisioncorrect"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      if (__pagesEnabled["miss"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
      if (__pagesEnabled["miss1"]) __eventSolver.addEvent(_ODE_evolution1_Event3());
      if (__pagesEnabled["miss2"]) __eventSolver.addEvent(_ODE_evolution1_Event4());
      if (__pagesEnabled["miss3"]) __eventSolver.addEvent(_ODE_evolution1_Event5());
      if (__pagesEnabled["collisionwrong2"]) __eventSolver.addEvent(_ODE_evolution1_Event6());
      if (__pagesEnabled["collisionwrong 3"]) __eventSolver.addEvent(_ODE_evolution1_Event7());
      if (__pagesEnabled["collisionwrong 4"]) __eventSolver.addEvent(_ODE_evolution1_Event8());
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
      if (!__mustReinitialize)
        for (__j=0,__n=__cIn; __j<_xLength; __j++)
           if (__state[__n++]!=x[__j]) { __mustReinitialize = true; break; }
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        if (__state[__cIn]!=t) __mustReinitialize = true;
        __state[__cIn++] = t;
    }

    function __arraysChanged () {
      if (_xLength != x.length) return true;
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
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
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
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        var i;
        for (i=0;i<_xLength;i++) {
          _aRate[__cRate++] = Array.isArray(-vx[i]) ? -vx[i][i] : -vx[i]; // Rate for ODE: Evol Page:x
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
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
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

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[0]-xc)*(x[0]-xc)+(y[0]-yc)*(y[0]-yc))-0.5;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //alert();  // > Event action for page Evol Page:1
        score=score+2;  // > Event action for page Evol Page:2
        correct = correct +1;  // > Event action for page Evol Page:3
        _view.audio.play();  // > Event action for page Evol Page:4
        // log = log+"\n"+textanswer[0]+" is the past tense of "+textcatch+"✅";   // > Event action for page Evol Page:5
        x[0]=3;  // > Event action for page Evol Page:6
        x[1]=3;  // > Event action for page Evol Page:7
        x[2]=3;  // > Event action for page Evol Page:8
        x[3]=3;  // > Event action for page Evol Page:9
        shuffleArray(y);   // > Event action for page Evol Page:10
        //speech("correct");  // > Event action for page Evol Page:11
          speech("good job");  // > Event action for page Evol Page:12
        //alert();  // > Event action for page Evol Page:13
        if (correct==numberofrounds){ // game mechanism counter  // > Event action for page Evol Page:14
         // _pause();  // > Event action for page Evol Page:15
          _tools.showOkDialog("Good Job ☺");  // > Event action for page Evol Page:16
          _view.audio1.play();  // > Event action for page Evol Page:17
          }  // > Event action for page Evol Page:18
          else{  // > Event action for page Evol Page:19
            //  _pause();  // > Event action for page Evol Page:20
              _initialize();  // > Event action for page Evol Page:21
        } // game mechanism counter  // > Event action for page Evol Page:22
        vyspeedchange ();  // > Event action for page Evol Page:23
        notrynumber=0;  // > Event action for page Evol Page:24
        return false;
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
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[0]-0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        x[0] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        //log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
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
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[1]-0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        x[1] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        //log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
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
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[2]-0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        x[2] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        //log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
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
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[3]-0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        x[3] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        //log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event6 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[1]-xc)*(x[1]-xc)+(y[1]-yc)*(y[1]-yc))-0.25;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //alert();  // > Event action for page Evol Page:1
        score=score-1;  // > Event action for page Evol Page:2
        //log = log+"\n"+textanswer[1]+textcatch+"❌";  // > Event action for page Evol Page:3
        //x[0]=3;  // > Event action for page Evol Page:4
        x[1]=3;  // > Event action for page Evol Page:5
        //x[2]=3;  // > Event action for page Evol Page:6
        //x[3]=3;  // > Event action for page Evol Page:7
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event7 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[2]-xc)*(x[2]-xc)+(y[2]-yc)*(y[2]-yc))-0.25;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //alert();  // > Event action for page Evol Page:1
        score=score-1;  // > Event action for page Evol Page:2
        //log = log+"\n"+textanswer[2]+textcatch+"❌";  // > Event action for page Evol Page:3
        //x[0]=3;  // > Event action for page Evol Page:4
        //x[1]=3;  // > Event action for page Evol Page:5
        x[2]=3;  // > Event action for page Evol Page:6
        //x[3]=3;  // > Event action for page Evol Page:7
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event8 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[3]-xc)*(x[3]-xc)+(y[3]-yc)*(y[3]-yc))-0.25;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_xLength; __j++) {
          __state[__cIn++] = x[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        //alert();  // > Event action for page Evol Page:1
        score=score-1;  // > Event action for page Evol Page:2
        //log = log+"\n"+textanswer[3]+textcatch+"❌";  // > Event action for page Evol Page:3
        //x[0]=3;  // > Event action for page Evol Page:4
        //x[1]=3;  // > Event action for page Evol Page:5
        //x[2]=3;  // > Event action for page Evol Page:6
        x[3]=3;  // > Event action for page Evol Page:7
        return false;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_x(__time) {
    var __beginIndex = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,new Array(x.length),__beginIndex,x.ength);
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
    _view = new MatchIontoChemicalFormula_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.title.linkProperty("Text",  function() { return title; }, function(_v) { title = _v; } ); // HtmlView linking property 'Text' for element 'title'
          _view.title.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'title'
          _view.executionPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'executionPanel'
          _view.runPauseButton.setAction("OffClick", _pause); // HtmlView setting action 'OffClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView linking property 'State' for element 'runPauseButton'
          _view.runPauseButton.setAction("OnClick", function(_data,_info) {
  _play();
  //speech("玩");

}); // HtmlView setting action 'OnClick' for element 'runPauseButton'
          _view.stepButton.setAction("OnClick", _step); // HtmlView setting action 'OnClick' for element 'stepButton'
          _view.initButton.setAction("OnClick", _initialize); // HtmlView setting action 'OnClick' for element 'initButton'
          _view.resetButton.setAction("OnClick", _reset); // HtmlView setting action 'OnClick' for element 'resetButton'
          _view.plottingPanel.linkProperty("Height",  function() { return ""+window.innerHeight*0.9; } ); // HtmlView linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return "Total Score="+score+"/"+2*numberofrounds+"\n"+log; } ); // HtmlView linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return "Score = "+score; } ); // HtmlView linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return "Not attempted = "+notrynumber; } ); // HtmlView linking property 'BRMessage' for element 'plottingPanel'
          _view.background.linkProperty("SizeY",  function() { return ymax*(1.2+0.4); } ); // HtmlView linking property 'SizeY' for element 'background'
          _view.imageSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'imageSet'
          _view.imageSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView linking property 'X' for element 'imageSet'
          _view.imageSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView linking property 'Y' for element 'imageSet'
          _view.image.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView linking property 'X' for element 'image'
          _view.image.linkProperty("Y",  function() { return yc; }, function(_v) { yc = _v; } ); // HtmlView linking property 'Y' for element 'image'
          _view.textcatch.linkProperty("X",  function() { return xc-0.145; } ); // HtmlView linking property 'X' for element 'textcatch'
          _view.textcatch.linkProperty("Y",  function() { return yc+0.5; } ); // HtmlView linking property 'Y' for element 'textcatch'
          _view.textcatch.linkProperty("Text",  function() { return textcatch; }, function(_v) { textcatch = _v; } ); // HtmlView linking property 'Text' for element 'textcatch'
          _view.shape2D.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView linking property 'X' for element 'shape2D'
          _view.shape2D.linkProperty("Y",  function() { return yc; }, function(_v) { yc = _v; } ); // HtmlView linking property 'Y' for element 'shape2D'
          _view.answerstringarray.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("FontSize",  function() { return textFontSize; }, function(_v) { textFontSize = _v; } ); // HtmlView linking property 'FontSize' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("X",  function() { return xText; }, function(_v) { xText = _v; } ); // HtmlView linking property 'X' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("Y",  function() { return yText; }, function(_v) { yText = _v; } ); // HtmlView linking property 'Y' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("Text",  function() { return textanswer; }, function(_v) { textanswer = _v; } ); // HtmlView linking property 'Text' for element 'answerstringarray'
          _view.answerstringarray.setAction("OnPress", function(_data,_info) {
  speech(textanswer[vocabaudio]);

}); // HtmlView setting action 'OnPress' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("ElementInteracted",  function() { return vocabaudio; }, function(_v) { vocabaudio = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'answerstringarray'
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
function MatchIontoChemicalFormula_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = MatchIontoChemicalFormula_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function MatchIontoChemicalFormula_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singlePlotPanel", _view._topFrame) // EJsS HtmlView.HtmlView: declaration of element 'singlePlotPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"title", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'title'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"executionPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'executionPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'executionPanel'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"runPauseButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'runPauseButton'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView: setting property 'TextOn' for element 'runPauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'runPauseButton'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView: setting property 'TextOff' for element 'runPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'stepButton'
      .setProperty("Tooltip","Step") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'stepButton'
      .setProperty("Text","Next|►") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'stepButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"initButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'initButton'
      .setProperty("Tooltip","Initialize") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'initButton'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'initButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'resetButton'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'resetButton'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'resetButton'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("MaximumY",6) // EJsS HtmlView.HtmlView: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",3.5) // EJsS HtmlView.HtmlView: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("GridYShow",true) // EJsS HtmlView.HtmlView: setting property 'GridYShow' for element 'plottingPanel'
      .setProperty("MinimumX",-0.5) // EJsS HtmlView.HtmlView: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("MarginY",40) // EJsS HtmlView.HtmlView: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("GridXShow",true) // EJsS HtmlView.HtmlView: setting property 'GridXShow' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"background", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'background'
      .setProperty("SizeX",4) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'background'
      .setProperty("X",1.5) // EJsS HtmlView.HtmlView: setting property 'X' for element 'background'
      .setProperty("ImageUrl","./garden and sky.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'background'
      .setProperty("Y",2.5) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'background'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"imageSet", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'imageSet'
      .setProperty("SizeX",0.4) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'imageSet'
      .setProperty("ImageUrl","./bee honey 1_no bkgrd.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'imageSet'
      .setProperty("SizeY",1.8) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'imageSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'group'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image", _view.group) // EJsS HtmlView.HtmlView: declaration of element 'image'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'image'
      .setProperty("SizeX",80) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'image'
      .setProperty("ImageUrl","./hive 1_no bkgrd.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'image'
      .setProperty("SizeY",100) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'image'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView: setting property 'PixelSize' for element 'image'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'image'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"textcatch", _view.group) // EJsS HtmlView.HtmlView: declaration of element 'textcatch'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'textcatch'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'textcatch'
      .setProperty("Font","normal bold 25px \"Comic Sans MS\", cursive, sans-serif") // EJsS HtmlView.HtmlView: setting property 'Font' for element 'textcatch'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape2D", _view.group) // EJsS HtmlView.HtmlView: declaration of element 'shape2D'
      .setProperty("SizeX",10) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'shape2D'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'shape2D'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView: setting property 'PixelSize' for element 'shape2D'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsetY", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'offsetY'
      .setProperty("Y",-0.7) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'offsetY'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"answerstringarray", _view.offsetY) // EJsS HtmlView.HtmlView: declaration of element 'answerstringarray'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'answerstringarray'
      .setProperty("Visibility",true) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'answerstringarray'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'answerstringarray'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'audio'
      .setProperty("AudioUrl","./Unnamed3/Ding Sound Effect.m4a") // EJsS HtmlView.HtmlView: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio1", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'audio1'
      .setProperty("AudioUrl","./Unnamed3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3") // EJsS HtmlView.HtmlView: setting property 'AudioUrl' for element 'audio1'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new MatchIontoChemicalFormula("_topFrame","_ejs_library/",null);
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
