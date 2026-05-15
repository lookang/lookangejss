/* _inputParameters: an object with different values for the model parameters */
function SimultaneitySpacetimeDiagram(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var galilean; // EjsS Model.Variables.Tranformation Vars.galilean
  var beta; // EjsS Model.Variables.Tranformation Vars.beta
  var gamma; // EjsS Model.Variables.Tranformation Vars.gamma
  var tInitial; // EjsS Model.Variables.Tranformation Vars.tInitial
  var t; // EjsS Model.Variables.Tranformation Vars.t
  var dt; // EjsS Model.Variables.Tranformation Vars.dt

  var properStickLength; // EjsS Model.Variables.Coordinate Vars.properStickLength
  var stickLength; // EjsS Model.Variables.Coordinate Vars.stickLength
  var x0Proper; // EjsS Model.Variables.Coordinate Vars.x0Proper
  var x1Proper; // EjsS Model.Variables.Coordinate Vars.x1Proper
  var x2Proper; // EjsS Model.Variables.Coordinate Vars.x2Proper
  var t1Proper; // EjsS Model.Variables.Coordinate Vars.t1Proper
  var t2Proper; // EjsS Model.Variables.Coordinate Vars.t2Proper
  var x0; // EjsS Model.Variables.Coordinate Vars.x0
  var x1; // EjsS Model.Variables.Coordinate Vars.x1
  var x2; // EjsS Model.Variables.Coordinate Vars.x2
  var t1; // EjsS Model.Variables.Coordinate Vars.t1
  var t2; // EjsS Model.Variables.Coordinate Vars.t2

  var dragMode; // EjsS Model.Variables.Drawing Vars.dragMode
  var showSpace; // EjsS Model.Variables.Drawing Vars.showSpace
  var otherSpaceView; // EjsS Model.Variables.Drawing Vars.otherSpaceView
  var showOtherFrame; // EjsS Model.Variables.Drawing Vars.showOtherFrame
  var d1Home; // EjsS Model.Variables.Drawing Vars.d1Home
  var d2Home; // EjsS Model.Variables.Drawing Vars.d2Home
  var x0Space; // EjsS Model.Variables.Drawing Vars.x0Space
  var x1Space; // EjsS Model.Variables.Drawing Vars.x1Space
  var x2Space; // EjsS Model.Variables.Drawing Vars.x2Space
  var tSpace; // EjsS Model.Variables.Drawing Vars.tSpace
  var t1Space; // EjsS Model.Variables.Drawing Vars.t1Space
  var t2Space; // EjsS Model.Variables.Drawing Vars.t2Space
  var stickHeight; // EjsS Model.Variables.Drawing Vars.stickHeight
  var trMsg; // EjsS Model.Variables.Drawing Vars.trMsg

  var size; // EjsS Model.Variables.lookang.size
  var font; // EjsS Model.Variables.lookang.font
  var widthField; // EjsS Model.Variables.lookang.widthField
  var stickColor; // EjsS Model.Variables.lookang.stickColor

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      galilean : galilean,
      beta : beta,
      gamma : gamma,
      tInitial : tInitial,
      t : t,
      dt : dt,
      properStickLength : properStickLength,
      stickLength : stickLength,
      x0Proper : x0Proper,
      x1Proper : x1Proper,
      x2Proper : x2Proper,
      t1Proper : t1Proper,
      t2Proper : t2Proper,
      x0 : x0,
      x1 : x1,
      x2 : x2,
      t1 : t1,
      t2 : t2,
      dragMode : dragMode,
      showSpace : showSpace,
      otherSpaceView : otherSpaceView,
      showOtherFrame : showOtherFrame,
      d1Home : d1Home,
      d2Home : d2Home,
      x0Space : x0Space,
      x1Space : x1Space,
      x2Space : x2Space,
      tSpace : tSpace,
      t1Space : t1Space,
      t2Space : t2Space,
      stickHeight : stickHeight,
      trMsg : trMsg,
      size : size,
      font : font,
      widthField : widthField,
      stickColor : stickColor
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      galilean : galilean,
      beta : beta,
      gamma : gamma,
      tInitial : tInitial,
      t : t,
      dt : dt,
      properStickLength : properStickLength,
      stickLength : stickLength,
      x0Proper : x0Proper,
      x1Proper : x1Proper,
      x2Proper : x2Proper,
      t1Proper : t1Proper,
      t2Proper : t2Proper,
      x0 : x0,
      x1 : x1,
      x2 : x2,
      t1 : t1,
      t2 : t2,
      dragMode : dragMode,
      showSpace : showSpace,
      otherSpaceView : otherSpaceView,
      showOtherFrame : showOtherFrame,
      d1Home : d1Home,
      d2Home : d2Home,
      x0Space : x0Space,
      x1Space : x1Space,
      x2Space : x2Space,
      tSpace : tSpace,
      t1Space : t1Space,
      t2Space : t2Space,
      stickHeight : stickHeight,
      trMsg : trMsg,
      size : size,
      font : font,
      widthField : widthField,
      stickColor : stickColor
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.galilean != "undefined") galilean = json.galilean;
    if(typeof json.beta != "undefined") beta = json.beta;
    if(typeof json.gamma != "undefined") gamma = json.gamma;
    if(typeof json.tInitial != "undefined") tInitial = json.tInitial;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.properStickLength != "undefined") properStickLength = json.properStickLength;
    if(typeof json.stickLength != "undefined") stickLength = json.stickLength;
    if(typeof json.x0Proper != "undefined") x0Proper = json.x0Proper;
    if(typeof json.x1Proper != "undefined") x1Proper = json.x1Proper;
    if(typeof json.x2Proper != "undefined") x2Proper = json.x2Proper;
    if(typeof json.t1Proper != "undefined") t1Proper = json.t1Proper;
    if(typeof json.t2Proper != "undefined") t2Proper = json.t2Proper;
    if(typeof json.x0 != "undefined") x0 = json.x0;
    if(typeof json.x1 != "undefined") x1 = json.x1;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.t1 != "undefined") t1 = json.t1;
    if(typeof json.t2 != "undefined") t2 = json.t2;
    if(typeof json.dragMode != "undefined") dragMode = json.dragMode;
    if(typeof json.showSpace != "undefined") showSpace = json.showSpace;
    if(typeof json.otherSpaceView != "undefined") otherSpaceView = json.otherSpaceView;
    if(typeof json.showOtherFrame != "undefined") showOtherFrame = json.showOtherFrame;
    if(typeof json.d1Home != "undefined") d1Home = json.d1Home;
    if(typeof json.d2Home != "undefined") d2Home = json.d2Home;
    if(typeof json.x0Space != "undefined") x0Space = json.x0Space;
    if(typeof json.x1Space != "undefined") x1Space = json.x1Space;
    if(typeof json.x2Space != "undefined") x2Space = json.x2Space;
    if(typeof json.tSpace != "undefined") tSpace = json.tSpace;
    if(typeof json.t1Space != "undefined") t1Space = json.t1Space;
    if(typeof json.t2Space != "undefined") t2Space = json.t2Space;
    if(typeof json.stickHeight != "undefined") stickHeight = json.stickHeight;
    if(typeof json.trMsg != "undefined") trMsg = json.trMsg;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.widthField != "undefined") widthField = json.widthField;
    if(typeof json.stickColor != "undefined") stickColor = json.stickColor;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.galilean != "undefined") galilean = json.galilean;
    if(typeof json.beta != "undefined") beta = json.beta;
    if(typeof json.gamma != "undefined") gamma = json.gamma;
    if(typeof json.tInitial != "undefined") tInitial = json.tInitial;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.properStickLength != "undefined") properStickLength = json.properStickLength;
    if(typeof json.stickLength != "undefined") stickLength = json.stickLength;
    if(typeof json.x0Proper != "undefined") x0Proper = json.x0Proper;
    if(typeof json.x1Proper != "undefined") x1Proper = json.x1Proper;
    if(typeof json.x2Proper != "undefined") x2Proper = json.x2Proper;
    if(typeof json.t1Proper != "undefined") t1Proper = json.t1Proper;
    if(typeof json.t2Proper != "undefined") t2Proper = json.t2Proper;
    if(typeof json.x0 != "undefined") x0 = json.x0;
    if(typeof json.x1 != "undefined") x1 = json.x1;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.t1 != "undefined") t1 = json.t1;
    if(typeof json.t2 != "undefined") t2 = json.t2;
    if(typeof json.dragMode != "undefined") dragMode = json.dragMode;
    if(typeof json.showSpace != "undefined") showSpace = json.showSpace;
    if(typeof json.otherSpaceView != "undefined") otherSpaceView = json.otherSpaceView;
    if(typeof json.showOtherFrame != "undefined") showOtherFrame = json.showOtherFrame;
    if(typeof json.d1Home != "undefined") d1Home = json.d1Home;
    if(typeof json.d2Home != "undefined") d2Home = json.d2Home;
    if(typeof json.x0Space != "undefined") x0Space = json.x0Space;
    if(typeof json.x1Space != "undefined") x1Space = json.x1Space;
    if(typeof json.x2Space != "undefined") x2Space = json.x2Space;
    if(typeof json.tSpace != "undefined") tSpace = json.tSpace;
    if(typeof json.t1Space != "undefined") t1Space = json.t1Space;
    if(typeof json.t2Space != "undefined") t2Space = json.t2Space;
    if(typeof json.stickHeight != "undefined") stickHeight = json.stickHeight;
    if(typeof json.trMsg != "undefined") trMsg = json.trMsg;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.widthField != "undefined") widthField = json.widthField;
    if(typeof json.stickColor != "undefined") stickColor = json.stickColor;
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
    __pagesEnabled["Init Page"] = false;
    __pagesEnabled["Init Page 2"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    beta = 0.5; // EjsS Model.Variables.Tranformation Vars.beta
    gamma = 1/Math.sqrt(1-beta*beta); // EjsS Model.Variables.Tranformation Vars.gamma
    tInitial = -0.4; // EjsS Model.Variables.Tranformation Vars.tInitial
    t = tInitial; // EjsS Model.Variables.Tranformation Vars.t
    dt = 0.01; // EjsS Model.Variables.Tranformation Vars.dt
  });

  _model.addToReset(function() {
    properStickLength = 1; // EjsS Model.Variables.Coordinate Vars.properStickLength
    stickLength = properStickLength/gamma; // EjsS Model.Variables.Coordinate Vars.stickLength
    x0Proper = 0; // EjsS Model.Variables.Coordinate Vars.x0Proper
    x1Proper = properStickLength/2; // EjsS Model.Variables.Coordinate Vars.x1Proper
    x2Proper = -properStickLength/2; // EjsS Model.Variables.Coordinate Vars.x2Proper
    t1Proper = properStickLength/2; // EjsS Model.Variables.Coordinate Vars.t1Proper
    t2Proper = properStickLength/2; // EjsS Model.Variables.Coordinate Vars.t2Proper
    x0 = 0; // EjsS Model.Variables.Coordinate Vars.x0
  });

  _model.addToReset(function() {
    dragMode = 2; // EjsS Model.Variables.Drawing Vars.dragMode
    d1Home = x1Proper/gamma; // EjsS Model.Variables.Drawing Vars.d1Home
    d2Home = x2Proper/gamma; // EjsS Model.Variables.Drawing Vars.d2Home
    stickHeight = 0.1; // EjsS Model.Variables.Drawing Vars.stickHeight
    trMsg = ""; // EjsS Model.Variables.Drawing Vars.trMsg
  });

  _model.addToReset(function() {
    size = 10; // EjsS Model.Variables.lookang.size
    font = "normal normal 1.5vw "; // EjsS Model.Variables.lookang.font
    widthField = "5vw"; // EjsS Model.Variables.lookang.widthField
    stickColor = "rgba(155,155,0,1.0)"; // EjsS Model.Variables.lookang.stickColor
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  function setEvents() {  // > CustomCode.Lib Page:1
  t=tInitial;  // > CustomCode.Lib Page:2
    dragMode=2;  // > CustomCode.Lib Page:3
    if(galilean){  // > CustomCode.Lib Page:4
      setGalileanEvents();   // > CustomCode.Lib Page:5
    }else{  // > CustomCode.Lib Page:6
      setLorentzEvents();  // > CustomCode.Lib Page:7
    }  // > CustomCode.Lib Page:8
    }  // > CustomCode.Lib Page:9

  function setLorentzEvents() {  // > CustomCode.Lib Page 2:1
    // proper distances should be correct  // > CustomCode.Lib Page 2:2
    t1Proper=Math.abs(x0Proper-x1Proper);  // > CustomCode.Lib Page 2:3
    t2Proper=Math.abs(x0Proper-x2Proper);  // > CustomCode.Lib Page 2:4
    gamma=1/Math.sqrt(1-beta*beta);  // > CustomCode.Lib Page 2:5
    stickLength=properStickLength/gamma;  // > CustomCode.Lib Page 2:6
    x0=x0Proper/gamma;  // > CustomCode.Lib Page 2:7
    // Lorenz transformation coordinates synchronized at point where light flash occurs  // > CustomCode.Lib Page 2:8
    t1=(t1Proper+beta*(x1Proper-x0Proper))*gamma;  // > CustomCode.Lib Page 2:9
    t2=(t2Proper+beta*(x2Proper-x0Proper))*gamma;  // > CustomCode.Lib Page 2:10
    x1=(x1Proper-x0Proper+beta*t1Proper)*gamma+x0;  // > CustomCode.Lib Page 2:11
    x2=(x2Proper-x0Proper+beta*t2Proper)*gamma+x0;  // > CustomCode.Lib Page 2:12
  }  // > CustomCode.Lib Page 2:13

  function setGalileanEvents() {  // > CustomCode.Lib Page 3:1
    gamma=1;  // > CustomCode.Lib Page 3:2
    stickLength=properStickLength;  // > CustomCode.Lib Page 3:3
    x0=x0Proper;  // > CustomCode.Lib Page 3:4
    if(x1Proper-x0Proper>0){  // > CustomCode.Lib Page 3:5
      t1=t1Proper=(x1Proper-x0Proper)/(1-beta);  // > CustomCode.Lib Page 3:6
    }else{  // > CustomCode.Lib Page 3:7
      t1=t1Proper=-(x1Proper-x0Proper)/(1+beta);  // > CustomCode.Lib Page 3:8
    }  // > CustomCode.Lib Page 3:9
    if(x2Proper-x0Proper>0){  // > CustomCode.Lib Page 3:10
      t2=t2Proper=(x2Proper-x0Proper)/(1-beta);  // > CustomCode.Lib Page 3:11
    }else{  // > CustomCode.Lib Page 3:12
      t2=t2Proper=-(x2Proper-x0Proper)/(1+beta);  // > CustomCode.Lib Page 3:13
    }  // > CustomCode.Lib Page 3:14
    x1=t1*beta+x1Proper;  // > CustomCode.Lib Page 3:15
    x2=t2*beta+x2Proper;  // > CustomCode.Lib Page 3:16
  }  // > CustomCode.Lib Page 3:17

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    if(otherSpaceView)_view.otherViewRadio.setEnabled(true);  // > Initialization.Init Page:1
    setEvents();  // > Initialization.Init Page:2
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 2"]) return;
    if (showOtherFrame==undefined){  // > Initialization.Init Page 2:1
     showOtherFrame = true  // > Initialization.Init Page 2:2
      }  // > Initialization.Init Page 2:3
     if (showSpace==undefined){  // > Initialization.Init Page 2:4
       showSpace=true  // > Initialization.Init Page 2:5
       }  // > Initialization.Init Page 2:6
     if (otherSpaceView==undefined){  // > Initialization.Init Page 2:7
     otherSpaceView=false  // > Initialization.Init Page 2:8
     }  // > Initialization.Init Page 2:9
     //showSpace=false  // > Initialization.Init Page 2:10
     setEvents();  // > Initialization.Init Page 2:11
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    t+=dt;  // > Evolution.Evol Page:1
    dragMode=(t<0)?2:0;  // > Evolution.Evol Page:2
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
    x0Space=otherSpaceView?x0Proper:x0;  // > FixedRelations.FixRel Page:1
    x1Space=otherSpaceView?x1Proper:x1Proper/gamma;  // > FixedRelations.FixRel Page:2
    x2Space=otherSpaceView?x2Proper:x2Proper/gamma;  // > FixedRelations.FixRel Page:3
    tSpace=otherSpaceView?t*gamma:t;  // > FixedRelations.FixRel Page:4
    t1Space=otherSpaceView?t1Proper:t1;  // > FixedRelations.FixRel Page:5
    t2Space=otherSpaceView?t2Proper:t2;  // > FixedRelations.FixRel Page:6
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
    _view = new SimultaneitySpacetimeDiagram_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.executionPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'executionPanel'
          _view.t22.linkProperty("Width",  function() { return widthField; }, function(_v) { widthField = _v; } ); // HtmlView Page linking property 'Width' for element 't22'
          _view.t22.linkProperty("Value",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'Value' for element 't22'
          _view.t2.linkProperty("Width",  function() { return widthField; }, function(_v) { widthField = _v; } ); // HtmlView Page linking property 'Width' for element 't2'
          _view.t2.linkProperty("Value",  function() { return dt; }, function(_v) { dt = _v; } ); // HtmlView Page linking property 'Value' for element 't2'
          _view.t2.setAction("OnChange", function(_data,_info) {
  t=tInitial;
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 't2'
          _view.showOtherFrame.linkProperty("Checked",  function() { return showOtherFrame; }, function(_v) { showOtherFrame = _v; } ); // HtmlView Page linking property 'Checked' for element 'showOtherFrame'
          _view.showSpace.linkProperty("Checked",  function() { return showSpace; }, function(_v) { showSpace = _v; } ); // HtmlView Page linking property 'Checked' for element 'showSpace'
          _view.beta2.linkProperty("Value",  function() { return beta; }, function(_v) { beta = _v; } ); // HtmlView Page linking property 'Value' for element 'beta2'
          _view.beta2.setAction("OnChange", function(_data,_info) {
  _initialize();
  d1Home=x1Proper/gamma;
  d2Home=x2Proper/gamma;

}); // HtmlView Page setting action 'OnChange' for element 'beta2'
          _view.beta3.linkProperty("Width",  function() { return widthField; }, function(_v) { widthField = _v; } ); // HtmlView Page linking property 'Width' for element 'beta3'
          _view.beta3.linkProperty("Value",  function() { return beta; }, function(_v) { beta = _v; } ); // HtmlView Page linking property 'Value' for element 'beta3'
          _view.beta3.setAction("OnChange", function(_data,_info) {
  beta=Math.min(beta,0.9999);
  beta=Math.max(beta,-0.9999);
  _initialize();
  d1Home=x1Proper/gamma;
  d2Home=x2Proper/gamma;

}); // HtmlView Page setting action 'OnChange' for element 'beta3'
          _view.runPauseButton.setAction("OffClick", _pause); // HtmlView Page setting action 'OffClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'runPauseButton'
          _view.runPauseButton.setAction("OnClick", _play); // HtmlView Page setting action 'OnClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'runPauseButton'
          _view.stepButton.setAction("OnClick", _step); // HtmlView Page setting action 'OnClick' for element 'stepButton'
          _view.stepButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'stepButton'
          _view.initButton.setAction("OnClick", function(_data,_info) {
  _pause();
  _initialize();

}); // HtmlView Page setting action 'OnClick' for element 'initButton'
          _view.initButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'initButton'
          _view.resetButton.setAction("OnClick", _reset); // HtmlView Page setting action 'OnClick' for element 'resetButton'
          _view.resetButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton'
          _view.galilean.linkProperty("Checked",  function() { return galilean; }, function(_v) { galilean = _v; } ); // HtmlView Page linking property 'Checked' for element 'galilean'
          _view.galilean.setAction("OnCheckOff", function(_data,_info) {
  _initialize();
  trMsg=null;
  d1Home=x1Proper/gamma;
  d2Home=x2Proper/gamma;

}); // HtmlView Page setting action 'OnCheckOff' for element 'galilean'
          _view.galilean.setAction("OnCheckOn", function(_data,_info) {
  d1Home=x1Proper;
  d2Home=x2Proper;
  trMsg="Galilean";
  _initialize();

}); // HtmlView Page setting action 'OnCheckOn' for element 'galilean'
          _view.eventPlottingPanel.linkProperty("Width",  function() { return showOtherFrame?"50%":"100%"; } ); // HtmlView Page linking property 'Width' for element 'eventPlottingPanel'
          _view.eventPlottingPanel.linkProperty("BRMessage",  function() { return "t = "+ t.toFixed(2); } ); // HtmlView Page linking property 'BRMessage' for element 'eventPlottingPanel'
          _view.eventOneMarker.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'eventOneMarker'
          _view.eventOneMarker.linkProperty("X",  function() { return x0; }, function(_v) { x0 = _v; } ); // HtmlView Page linking property 'X' for element 'eventOneMarker'
          _view.eventOneMarker.linkProperty("Visibility",  function() { return t>=0; } ); // HtmlView Page linking property 'Visibility' for element 'eventOneMarker'
          _view.eventOneMarker.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'eventOneMarker'
          _view.detectorOneMarker.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'detectorOneMarker'
          _view.detectorOneMarker.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneMarker'
          _view.detectorOneMarker.linkProperty("Y",  function() { return t1; }, function(_v) { t1 = _v; } ); // HtmlView Page linking property 'Y' for element 'detectorOneMarker'
          _view.detectorOneMarker.linkProperty("Visibility",  function() { return t>=t1; } ); // HtmlView Page linking property 'Visibility' for element 'detectorOneMarker'
          _view.detectorOneMarker.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'detectorOneMarker'
          _view.detectorTwoMarker.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'detectorTwoMarker'
          _view.detectorTwoMarker.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'detectorTwoMarker'
          _view.detectorTwoMarker.linkProperty("Y",  function() { return t2; }, function(_v) { t2 = _v; } ); // HtmlView Page linking property 'Y' for element 'detectorTwoMarker'
          _view.detectorTwoMarker.linkProperty("Visibility",  function() { return t>=t2; } ); // HtmlView Page linking property 'Visibility' for element 'detectorTwoMarker'
          _view.detectorTwoMarker.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'detectorTwoMarker'
          _view.meterStickGroup.linkProperty("X",  function() { return beta*t; } ); // HtmlView Page linking property 'X' for element 'meterStickGroup'
          _view.meterStickGroup.linkProperty("Y",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'Y' for element 'meterStickGroup'
          _view.detectorOne.setAction("OnRelease", function(_data,_info) {
  x1Proper=d1Home*gamma;
  setEvents();

}); // HtmlView Page setting action 'OnRelease' for element 'detectorOne'
          _view.detectorOne.linkProperty("FillColor",  function() { return (t>=t1)?"BLUE":"GRAY"; } ); // HtmlView Page linking property 'FillColor' for element 'detectorOne'
          _view.detectorOne.linkProperty("SizeX",  function() { return 13*Math.max(1/gamma,0.3); } ); // HtmlView Page linking property 'SizeX' for element 'detectorOne'
          _view.detectorOne.linkProperty("X",  function() { return d1Home; }, function(_v) { d1Home = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOne'
          _view.detectorOne.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'detectorOne'
          _view.detectorOne.setAction("OnDrag", function(_data,_info) {
  x1Proper=d1Home*gamma;
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'detectorOne'
          _view.detectorOne2.setAction("OnRelease", function(_data,_info) {
  x2Proper=d2Home*gamma; //x2*gamma;
  setEvents();

}); // HtmlView Page setting action 'OnRelease' for element 'detectorOne2'
          _view.detectorOne2.linkProperty("FillColor",  function() { return (t>=t2)?"BLUE":"GRAY"; } ); // HtmlView Page linking property 'FillColor' for element 'detectorOne2'
          _view.detectorOne2.linkProperty("SizeX",  function() { return 13*Math.max(1/gamma,0.3); } ); // HtmlView Page linking property 'SizeX' for element 'detectorOne2'
          _view.detectorOne2.linkProperty("X",  function() { return d2Home; }, function(_v) { d2Home = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOne2'
          _view.detectorOne2.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'detectorOne2'
          _view.detectorOne2.setAction("OnDrag", function(_data,_info) {
  x2Proper=d2Home*gamma;
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'detectorOne2'
          _view.sticksegment.linkProperty("SizeX",  function() { return stickLength; }, function(_v) { stickLength = _v; } ); // HtmlView Page linking property 'SizeX' for element 'sticksegment'
          _view.sticksegment.linkProperty("LineColor",  function() { return stickColor; }, function(_v) { stickColor = _v; } ); // HtmlView Page linking property 'LineColor' for element 'sticksegment'
          _view.eventOne.setAction("OnRelease", function(_data,_info) {
  // user has dragged x0 in home frame
  x0Proper=x0*gamma;  // remove contraction effect
  setEvents();

}); // HtmlView Page setting action 'OnRelease' for element 'eventOne'
          _view.eventOne.linkProperty("FillColor",  function() { return (t>=0)?"RED":"PINK"; } ); // HtmlView Page linking property 'FillColor' for element 'eventOne'
          _view.eventOne.linkProperty("SizeX",  function() { return 13*Math.max(1/gamma,0.3); } ); // HtmlView Page linking property 'SizeX' for element 'eventOne'
          _view.eventOne.linkProperty("X",  function() { return x0; }, function(_v) { x0 = _v; } ); // HtmlView Page linking property 'X' for element 'eventOne'
          _view.eventOne.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'eventOne'
          _view.eventOne.setAction("OnDrag", function(_data,_info) {
  // user has dragged x0 in home frame
  x0Proper=x0*gamma;  // remove contraction effect
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'eventOne'
          _view.detectorOneText.linkProperty("X",  function() { return d1Home; }, function(_v) { d1Home = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneText'
          _view.detectorOneText.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'detectorOneText'
          _view.detectorOneText2.linkProperty("X",  function() { return d2Home; }, function(_v) { d2Home = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneText2'
          _view.detectorOneText2.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'detectorOneText2'
          _view.sourceText.linkProperty("X",  function() { return x0; }, function(_v) { x0 = _v; } ); // HtmlView Page linking property 'X' for element 'sourceText'
          _view.sourceText.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'sourceText'
          _view.rightSignal.linkProperty("Active",  function() { return t>=0; } ); // HtmlView Page linking property 'Active' for element 'rightSignal'
          _view.rightSignal.linkProperty("InputX",  function() { return t+x0; } ); // HtmlView Page linking property 'InputX' for element 'rightSignal'
          _view.rightSignal.linkProperty("InputY",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputY' for element 'rightSignal'
          _view.leftSignal2.linkProperty("Active",  function() { return t>=0; } ); // HtmlView Page linking property 'Active' for element 'leftSignal2'
          _view.leftSignal2.linkProperty("InputX",  function() { return -t+x0; } ); // HtmlView Page linking property 'InputX' for element 'leftSignal2'
          _view.leftSignal2.linkProperty("InputY",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputY' for element 'leftSignal2'
          _view.eventPlottingPanel2.linkProperty("TLMessage",  function() { return trMsg; }, function(_v) { trMsg = _v; } ); // HtmlView Page linking property 'TLMessage' for element 'eventPlottingPanel2'
          _view.eventPlottingPanel2.linkProperty("BRMessage",  function() { return "tProper = "+ (t*gamma).toFixed(2); } ); // HtmlView Page linking property 'BRMessage' for element 'eventPlottingPanel2'
          _view.eventPlottingPanel2.linkProperty("Display",  function() { return showOtherFrame?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'eventPlottingPanel2'
          _view.eventOneMarker2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'eventOneMarker2'
          _view.eventOneMarker2.linkProperty("X",  function() { return x0Proper; }, function(_v) { x0Proper = _v; } ); // HtmlView Page linking property 'X' for element 'eventOneMarker2'
          _view.eventOneMarker2.linkProperty("Visibility",  function() { return t>=0; } ); // HtmlView Page linking property 'Visibility' for element 'eventOneMarker2'
          _view.eventOneMarker2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'eventOneMarker2'
          _view.detectorOneMarker2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'detectorOneMarker2'
          _view.detectorOneMarker2.linkProperty("X",  function() { return x1Proper; }, function(_v) { x1Proper = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneMarker2'
          _view.detectorOneMarker2.linkProperty("Y",  function() { return t1Proper; }, function(_v) { t1Proper = _v; } ); // HtmlView Page linking property 'Y' for element 'detectorOneMarker2'
          _view.detectorOneMarker2.linkProperty("Visibility",  function() { return t*gamma>=t1Proper; } ); // HtmlView Page linking property 'Visibility' for element 'detectorOneMarker2'
          _view.detectorOneMarker2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'detectorOneMarker2'
          _view.detectorTwoMarker2.linkProperty("SizeX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeX' for element 'detectorTwoMarker2'
          _view.detectorTwoMarker2.linkProperty("X",  function() { return x2Proper; }, function(_v) { x2Proper = _v; } ); // HtmlView Page linking property 'X' for element 'detectorTwoMarker2'
          _view.detectorTwoMarker2.linkProperty("Y",  function() { return t2Proper; }, function(_v) { t2Proper = _v; } ); // HtmlView Page linking property 'Y' for element 'detectorTwoMarker2'
          _view.detectorTwoMarker2.linkProperty("Visibility",  function() { return t*gamma>=t2Proper; } ); // HtmlView Page linking property 'Visibility' for element 'detectorTwoMarker2'
          _view.detectorTwoMarker2.linkProperty("SizeY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'SizeY' for element 'detectorTwoMarker2'
          _view.meterStickGroup2.linkProperty("Y",  function() { return t*gamma; } ); // HtmlView Page linking property 'Y' for element 'meterStickGroup2'
          _view.detectorOne3.setAction("OnRelease", function(_data,_info) {
  d1Home=x1Proper*gamma;
  t1Proper=Math.abs(x0Proper-x1Proper);
  setEvents();

}); // HtmlView Page setting action 'OnRelease' for element 'detectorOne3'
          _view.detectorOne3.linkProperty("FillColor",  function() { return (tSpace>=t1Space)?"BLUE":"GRAY"; } ); // HtmlView Page linking property 'FillColor' for element 'detectorOne3'
          _view.detectorOne3.linkProperty("X",  function() { return x1Proper; }, function(_v) { x1Proper = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOne3'
          _view.detectorOne3.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'detectorOne3'
          _view.detectorOne3.setAction("OnDrag", function(_data,_info) {
  d1Home=x1Proper*gamma;
  t1Proper=Math.abs(x0Proper-x1Proper);
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'detectorOne3'
          _view.detectorOne22.setAction("OnRelease", function(_data,_info) {
  t2Proper=Math.abs(x0Proper-x2Proper);
  d2Home=x2Proper*gamma;
  setEvents();

}); // HtmlView Page setting action 'OnRelease' for element 'detectorOne22'
          _view.detectorOne22.linkProperty("FillColor",  function() { return (tSpace>=t2Space)?"BLUE":"GRAY"; } ); // HtmlView Page linking property 'FillColor' for element 'detectorOne22'
          _view.detectorOne22.linkProperty("X",  function() { return x2Proper; }, function(_v) { x2Proper = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOne22'
          _view.detectorOne22.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'detectorOne22'
          _view.detectorOne22.setAction("OnDrag", function(_data,_info) {
  t2Proper=Math.abs(x0Proper-x2Proper);
  d2Home=x2Proper*gamma;
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'detectorOne22'
          _view.segment2.linkProperty("SizeX",  function() { return properStickLength; }, function(_v) { properStickLength = _v; } ); // HtmlView Page linking property 'SizeX' for element 'segment2'
          _view.segment2.linkProperty("LineColor",  function() { return stickColor; }, function(_v) { stickColor = _v; } ); // HtmlView Page linking property 'LineColor' for element 'segment2'
          _view.eventOne2.setAction("OnRelease", function(_data,_info) {
  // user has dragged x0 in home frame
  setEvents();

}); // HtmlView Page setting action 'OnRelease' for element 'eventOne2'
          _view.eventOne2.linkProperty("FillColor",  function() { return (t>=0)?"RED":"PINK"; } ); // HtmlView Page linking property 'FillColor' for element 'eventOne2'
          _view.eventOne2.linkProperty("X",  function() { return x0Proper; }, function(_v) { x0Proper = _v; } ); // HtmlView Page linking property 'X' for element 'eventOne2'
          _view.eventOne2.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'eventOne2'
          _view.eventOne2.setAction("OnDrag", function(_data,_info) {
  // user has dragged x0 in proper frame
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'eventOne2'
          _view.detectorOneText3.linkProperty("X",  function() { return d1Home; }, function(_v) { d1Home = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneText3'
          _view.detectorOneText3.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'detectorOneText3'
          _view.detectorOneText22.linkProperty("X",  function() { return d2Home; }, function(_v) { d2Home = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneText22'
          _view.detectorOneText22.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'detectorOneText22'
          _view.sourceText2.linkProperty("X",  function() { return x0; }, function(_v) { x0 = _v; } ); // HtmlView Page linking property 'X' for element 'sourceText2'
          _view.sourceText2.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'sourceText2'
          _view.rightLightSignal2.linkProperty("Active",  function() { return t>=0; } ); // HtmlView Page linking property 'Active' for element 'rightLightSignal2'
          _view.rightLightSignal2.linkProperty("InputX",  function() { return t*gamma+x0Proper; } ); // HtmlView Page linking property 'InputX' for element 'rightLightSignal2'
          _view.rightLightSignal2.linkProperty("Visibility",  function() { return !galilean; } ); // HtmlView Page linking property 'Visibility' for element 'rightLightSignal2'
          _view.rightLightSignal2.linkProperty("InputY",  function() { return t*gamma; } ); // HtmlView Page linking property 'InputY' for element 'rightLightSignal2'
          _view.leftLightSignal22.linkProperty("Active",  function() { return t>=0; } ); // HtmlView Page linking property 'Active' for element 'leftLightSignal22'
          _view.leftLightSignal22.linkProperty("InputX",  function() { return -t*gamma+x0Proper; } ); // HtmlView Page linking property 'InputX' for element 'leftLightSignal22'
          _view.leftLightSignal22.linkProperty("Visibility",  function() { return !galilean; } ); // HtmlView Page linking property 'Visibility' for element 'leftLightSignal22'
          _view.leftLightSignal22.linkProperty("InputY",  function() { return t*gamma; } ); // HtmlView Page linking property 'InputY' for element 'leftLightSignal22'
          _view.leftClassicalSignal222.linkProperty("Active",  function() { return t>=0; } ); // HtmlView Page linking property 'Active' for element 'leftClassicalSignal222'
          _view.leftClassicalSignal222.linkProperty("InputX",  function() { return -t*(1+beta)+x0; } ); // HtmlView Page linking property 'InputX' for element 'leftClassicalSignal222'
          _view.leftClassicalSignal222.linkProperty("Visibility",  function() { return galilean; }, function(_v) { galilean = _v; } ); // HtmlView Page linking property 'Visibility' for element 'leftClassicalSignal222'
          _view.leftClassicalSignal222.linkProperty("InputY",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputY' for element 'leftClassicalSignal222'
          _view.rightClassicalSignal22.linkProperty("Active",  function() { return t>=0; } ); // HtmlView Page linking property 'Active' for element 'rightClassicalSignal22'
          _view.rightClassicalSignal22.linkProperty("InputX",  function() { return t*(1-beta)+x0; } ); // HtmlView Page linking property 'InputX' for element 'rightClassicalSignal22'
          _view.rightClassicalSignal22.linkProperty("Visibility",  function() { return galilean; }, function(_v) { galilean = _v; } ); // HtmlView Page linking property 'Visibility' for element 'rightClassicalSignal22'
          _view.rightClassicalSignal22.linkProperty("InputY",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputY' for element 'rightClassicalSignal22'
          _view.spaceViewPlottingPanel.linkProperty("TLMessage",  function() { return trMsg; }, function(_v) { trMsg = _v; } ); // HtmlView Page linking property 'TLMessage' for element 'spaceViewPlottingPanel'
          _view.spaceViewPlottingPanel.linkProperty("BRMessage",  function() { return otherSpaceView?"tProper = "+(t*gamma).toFixed(2):"t = "+ t.toFixed(2); } ); // HtmlView Page linking property 'BRMessage' for element 'spaceViewPlottingPanel'
          _view.spaceViewPlottingPanel.linkProperty("Display",  function() { return showSpace?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'spaceViewPlottingPanel'
          _view.SpaceViewStickGroup.linkProperty("X",  function() { return otherSpaceView?0:beta*t; } ); // HtmlView Page linking property 'X' for element 'SpaceViewStickGroup'
          _view.detectorOneShape.linkProperty("FillColor",  function() { return (tSpace>=t1Space)?"BLUE":"GRAY"; } ); // HtmlView Page linking property 'FillColor' for element 'detectorOneShape'
          _view.detectorOneShape.linkProperty("SizeX",  function() { return stickHeight*Math.max(1/gamma,0.3); } ); // HtmlView Page linking property 'SizeX' for element 'detectorOneShape'
          _view.detectorOneShape.linkProperty("X",  function() { return x1Space; }, function(_v) { x1Space = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneShape'
          _view.detectorOneShape.linkProperty("SizeY",  function() { return 2*stickHeight; } ); // HtmlView Page linking property 'SizeY' for element 'detectorOneShape'
          _view.detectorOneShape.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'detectorOneShape'
          _view.detectorOneShape.setAction("OnDrag", function(_data,_info) {
  if(otherSpaceView){
    d1Home=x1Proper=x1Space;
  }else{
    d1Home=x1Proper=x1Space*gamma; 
  }
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'detectorOneShape'
          _view.detectorTwoShape.linkProperty("FillColor",  function() { return (tSpace>=t2Space)?"BLUE":"GRAY"; } ); // HtmlView Page linking property 'FillColor' for element 'detectorTwoShape'
          _view.detectorTwoShape.linkProperty("SizeX",  function() { return stickHeight*Math.max(1/gamma,0.3); } ); // HtmlView Page linking property 'SizeX' for element 'detectorTwoShape'
          _view.detectorTwoShape.linkProperty("X",  function() { return x2Space; }, function(_v) { x2Space = _v; } ); // HtmlView Page linking property 'X' for element 'detectorTwoShape'
          _view.detectorTwoShape.linkProperty("SizeY",  function() { return 2*stickHeight; } ); // HtmlView Page linking property 'SizeY' for element 'detectorTwoShape'
          _view.detectorTwoShape.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'detectorTwoShape'
          _view.detectorTwoShape.setAction("OnDrag", function(_data,_info) {
  if(otherSpaceView){
    d2Home=x2Proper=x2Space;
  }else{
    d2Home=x2Proper=x2Space*gamma; 
  }
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'detectorTwoShape'
          _view.stick.linkProperty("FillColor",  function() { return stickColor; }, function(_v) { stickColor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'stick'
          _view.stick.linkProperty("SizeX",  function() { return otherSpaceView?properStickLength:stickLength; } ); // HtmlView Page linking property 'SizeX' for element 'stick'
          _view.stick.linkProperty("SizeY",  function() { return stickHeight; }, function(_v) { stickHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'stick'
          _view.stick.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'stick'
          _view.stick.setAction("OnDrag", function(_data,_info) {
  if(otherSpaceView){
    d1Home=x1Proper=x1Space;
  }else{
    d1Home=x1Proper=x1Space*gamma; 
  }
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'stick'
          _view.sourceShape.linkProperty("FillColor",  function() { return (t>=0)?"red":"pink"; } ); // HtmlView Page linking property 'FillColor' for element 'sourceShape'
          _view.sourceShape.linkProperty("SizeX",  function() { return stickHeight*Math.max(1/gamma,0.3); } ); // HtmlView Page linking property 'SizeX' for element 'sourceShape'
          _view.sourceShape.linkProperty("X",  function() { return x0Space; }, function(_v) { x0Space = _v; } ); // HtmlView Page linking property 'X' for element 'sourceShape'
          _view.sourceShape.linkProperty("SizeY",  function() { return stickHeight; }, function(_v) { stickHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'sourceShape'
          _view.sourceShape.linkProperty("EnabledPosition",  function() { return dragMode; }, function(_v) { dragMode = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'sourceShape'
          _view.sourceShape.setAction("OnDrag", function(_data,_info) {
  if(otherSpaceView){
    x0Proper=x0Space;
  }else{
    x0Proper=x0Space*gamma; 
  }
  setEvents();

}); // HtmlView Page setting action 'OnDrag' for element 'sourceShape'
          _view.detectorOneText32.linkProperty("X",  function() { return x1Space; }, function(_v) { x1Space = _v; } ); // HtmlView Page linking property 'X' for element 'detectorOneText32'
          _view.detectorOneText32.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'detectorOneText32'
          _view.detectortwoText322.linkProperty("X",  function() { return x2Space; }, function(_v) { x2Space = _v; } ); // HtmlView Page linking property 'X' for element 'detectortwoText322'
          _view.detectortwoText322.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'detectortwoText322'
          _view.sourceText22.linkProperty("X",  function() { return x0Space; }, function(_v) { x0Space = _v; } ); // HtmlView Page linking property 'X' for element 'sourceText22'
          _view.sourceText22.linkProperty("Visibility",  function() { return t==tInitial; } ); // HtmlView Page linking property 'Visibility' for element 'sourceText22'
          _view.waveFrontShape.linkProperty("SizeX",  function() { return otherSpaceView?2*t*gamma:2*t; } ); // HtmlView Page linking property 'SizeX' for element 'waveFrontShape'
          _view.waveFrontShape.linkProperty("X",  function() { return (otherSpaceView&&galilean)?x0Space-beta*tSpace:x0Space; } ); // HtmlView Page linking property 'X' for element 'waveFrontShape'
          _view.waveFrontShape.linkProperty("Visibility",  function() { return t>=0; } ); // HtmlView Page linking property 'Visibility' for element 'waveFrontShape'
          _view.waveFrontShape.linkProperty("SizeY",  function() { return otherSpaceView?2*t*gamma:2*t; } ); // HtmlView Page linking property 'SizeY' for element 'waveFrontShape'
          _view.narrativePanel.linkProperty("Display",  function() { return showSpace?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'narrativePanel'
          _view.radioButton.linkProperty("Checked",  function() { return !otherSpaceView; } ); // HtmlView Page linking property 'Checked' for element 'radioButton'
          _view.radioButton.setAction("OnCheckOff", function(_data,_info) {
  otherSpaceView=true;

}); // HtmlView Page setting action 'OnCheckOff' for element 'radioButton'
          _view.radioButton.setAction("OnCheckOn", function(_data,_info) {
  otherSpaceView=false;

}); // HtmlView Page setting action 'OnCheckOn' for element 'radioButton'
          _view.radioButton2.linkProperty("Checked",  function() { return otherSpaceView; }, function(_v) { otherSpaceView = _v; } ); // HtmlView Page linking property 'Checked' for element 'radioButton2'
          _view.radioButton2.setAction("OnCheckOff", function(_data,_info) {
  otherSpaceView=false;

}); // HtmlView Page setting action 'OnCheckOff' for element 'radioButton2'
          _view.radioButton2.setAction("OnCheckOn", function(_data,_info) {
  otherSpaceView=true;

}); // HtmlView Page setting action 'OnCheckOn' for element 'radioButton2'
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
function SimultaneitySpacetimeDiagram_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = SimultaneitySpacetimeDiagram_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Simultaneity and Spacetime','./SimultaneitySpacetimeDiagram/SimultaneitySpacetimeDiagram.html');
  _view._addDescriptionPage('Understanding Spacetime','./SimultaneitySpacetimeDiagram/UnderstandingSpacetime.html');

  return _view;
} // end of main function

function SimultaneitySpacetimeDiagram_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singlePlotPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'singlePlotPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"firstRowPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'firstRowPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"executionPanel", _view.firstRowPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'executionPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'executionPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"t", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 't'
      .setProperty("Text","t = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 't'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"t22", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 't22'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 't22'
      .setProperty("Tooltip","Time") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 't22'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"dt", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'dt'
      .setProperty("Text","dt = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'dt'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"t2", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 't2'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 't2'
      .setProperty("Tooltip","delta time") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 't2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"showOtherFrame", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'showOtherFrame'
      .setProperty("Tooltip","Show other reference frame.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'showOtherFrame'
      .setProperty("Text","Other frame") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'showOtherFrame'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"showSpace", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'showSpace'
      .setProperty("Tooltip","Show spatial view.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'showSpace'
      .setProperty("Text","Space") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'showSpace'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"beta", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'beta'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'beta'
      .setProperty("Text"," stick v/c = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'beta'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"beta2", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'beta2'
      .setProperty("Minimum",-0.99) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'beta2'
      .setProperty("Maximum",0.99) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'beta2'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'beta2'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"beta3", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'beta3'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'beta3'
      .setProperty("Background","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'beta3'
      .setProperty("Tooltip","Stick velocity.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'beta3'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"runPauseButton", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'runPauseButton'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'runPauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'runPauseButton'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'runPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton'
      .setProperty("Tooltip","Step") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'stepButton'
      .setProperty("Text","Step|►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"initButton", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'initButton'
      .setProperty("Tooltip","Initialize") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'initButton'
      .setProperty("Text","|►Reset Time") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'initButton'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'initButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'resetButton'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"galilean", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'galilean'
      .setProperty("Tooltip","Show the polulation as a function of time.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'galilean'
      .setProperty("Text","Galilean") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'galilean'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"eventPlottingPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'eventPlottingPanel'
      .setProperty("Height","60vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'eventPlottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'eventPlottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'eventPlottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'eventPlottingPanel'
      .setProperty("Title","Events in the home reference frame") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'eventPlottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'eventPlottingPanel'
      .setProperty("MaximumY",2.5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'eventPlottingPanel'
      .setProperty("MaximumX",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'eventPlottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'eventPlottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'eventPlottingPanel'
      .setProperty("TRMessage","Events in the home reference frame") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'eventPlottingPanel'
      .setProperty("MinimumX",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'eventPlottingPanel'
      .setProperty("MinimumY",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'eventPlottingPanel'
      .setProperty("XTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'eventPlottingPanel'
      .setProperty("YTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'eventPlottingPanel'
      .setProperty("TitleY","time") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'eventPlottingPanel'
      .setProperty("TitleX","space") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'eventPlottingPanel'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'eventPlottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'eventPlottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"eventOneMarker", _view.eventPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'eventOneMarker'
      .setProperty("FillColor","PINK") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'eventOneMarker'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'eventOneMarker'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'eventOneMarker'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorOneMarker", _view.eventPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneMarker'
      .setProperty("FillColor","CYAN") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'detectorOneMarker'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorOneMarker'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorTwoMarker", _view.eventPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorTwoMarker'
      .setProperty("FillColor","CYAN") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'detectorTwoMarker'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorTwoMarker'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"meterStickGroup", _view.eventPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'meterStickGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorOne", _view.meterStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOne'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'detectorOne'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOne'
      .setProperty("SizeY",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'detectorOne'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorOne'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorOne2", _view.meterStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOne2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'detectorOne2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOne2'
      .setProperty("SizeY",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'detectorOne2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorOne2'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"sticksegment", _view.meterStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'sticksegment'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'sticksegment'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'sticksegment'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'sticksegment'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'sticksegment'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'sticksegment'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"eventOne", _view.meterStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'eventOne'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'eventOne'
      .setProperty("SizeY",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'eventOne'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'eventOne'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"detectorOneText", _view.meterStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneText'
      .setProperty("Y",0.12) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOneText'
      .setProperty("Text","detector") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'detectorOneText'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"detectorOneText2", _view.meterStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneText2'
      .setProperty("Y",0.12) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOneText2'
      .setProperty("Text","detector") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'detectorOneText2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"sourceText", _view.meterStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'sourceText'
      .setProperty("Y",0.12) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'sourceText'
      .setProperty("Text","source") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'sourceText'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"rightSignal", _view.eventPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'rightSignal'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'rightSignal'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'rightSignal'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'rightSignal'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"leftSignal2", _view.eventPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'leftSignal2'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'leftSignal2'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'leftSignal2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'leftSignal2'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"eventPlottingPanel2", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'eventPlottingPanel2'
      .setProperty("Height","60vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'eventPlottingPanel2'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'eventPlottingPanel2'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'eventPlottingPanel2'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'eventPlottingPanel2'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'eventPlottingPanel2'
      .setProperty("Title","Events in the stick reference frame") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'eventPlottingPanel2'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'eventPlottingPanel2'
      .setProperty("MaximumY",2.5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'eventPlottingPanel2'
      .setProperty("MaximumX",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'eventPlottingPanel2'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'eventPlottingPanel2'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'eventPlottingPanel2'
      .setProperty("TRMessage","Events in the stick reference frame") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'eventPlottingPanel2'
      .setProperty("MinimumX",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'eventPlottingPanel2'
      .setProperty("MinimumY",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'eventPlottingPanel2'
      .setProperty("XTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'eventPlottingPanel2'
      .setProperty("YTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'eventPlottingPanel2'
      .setProperty("TitleY","proper time") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'eventPlottingPanel2'
      .setProperty("TitleX","space") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'eventPlottingPanel2'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'eventPlottingPanel2'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'eventPlottingPanel2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"eventOneMarker2", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'eventOneMarker2'
      .setProperty("FillColor","PINK") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'eventOneMarker2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'eventOneMarker2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'eventOneMarker2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorOneMarker2", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneMarker2'
      .setProperty("FillColor","CYAN") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'detectorOneMarker2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorOneMarker2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorTwoMarker2", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorTwoMarker2'
      .setProperty("FillColor","CYAN") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'detectorTwoMarker2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorTwoMarker2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"meterStickGroup2", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'meterStickGroup2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'meterStickGroup2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorOne3", _view.meterStickGroup2) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOne3'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'detectorOne3'
      .setProperty("SizeX",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'detectorOne3'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOne3'
      .setProperty("SizeY",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'detectorOne3'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorOne3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorOne22", _view.meterStickGroup2) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOne22'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'detectorOne22'
      .setProperty("SizeX",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'detectorOne22'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOne22'
      .setProperty("SizeY",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'detectorOne22'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'detectorOne22'
      ;

    _view._addElement(EJSS_DRAWING2D.segment,"segment2", _view.meterStickGroup2) // EJsS HtmlView.HtmlView Page: declaration of element 'segment2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'segment2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'segment2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'segment2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'segment2'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'segment2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"eventOne2", _view.meterStickGroup2) // EJsS HtmlView.HtmlView Page: declaration of element 'eventOne2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'eventOne2'
      .setProperty("SizeX",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'eventOne2'
      .setProperty("SizeY",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'eventOne2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'eventOne2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"detectorOneText3", _view.meterStickGroup2) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneText3'
      .setProperty("Y",0.12) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOneText3'
      .setProperty("Text","detector") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'detectorOneText3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"detectorOneText22", _view.meterStickGroup2) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneText22'
      .setProperty("Y",0.12) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOneText22'
      .setProperty("Text","detector") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'detectorOneText22'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"sourceText2", _view.meterStickGroup2) // EJsS HtmlView.HtmlView Page: declaration of element 'sourceText2'
      .setProperty("Y",0.12) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'sourceText2'
      .setProperty("Text","source") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'sourceText2'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"rightLightSignal2", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'rightLightSignal2'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'rightLightSignal2'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'rightLightSignal2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'rightLightSignal2'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"leftLightSignal22", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'leftLightSignal22'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'leftLightSignal22'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'leftLightSignal22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'leftLightSignal22'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"leftClassicalSignal222", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'leftClassicalSignal222'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'leftClassicalSignal222'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'leftClassicalSignal222'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'leftClassicalSignal222'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"rightClassicalSignal22", _view.eventPlottingPanel2) // EJsS HtmlView.HtmlView Page: declaration of element 'rightClassicalSignal22'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'rightClassicalSignal22'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'rightClassicalSignal22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'rightClassicalSignal22'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"spaceViewPlottingPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'spaceViewPlottingPanel'
      .setProperty("Height","20vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'spaceViewPlottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'spaceViewPlottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'spaceViewPlottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'spaceViewPlottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'spaceViewPlottingPanel'
      .setProperty("TRMessage","Space View") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'spaceViewPlottingPanel'
      .setProperty("XTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'spaceViewPlottingPanel'
      .setProperty("YTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'spaceViewPlottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'spaceViewPlottingPanel'
      .setProperty("Background","Black") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'spaceViewPlottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'spaceViewPlottingPanel'
      .setProperty("Title","Events in the stick reference frame") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'spaceViewPlottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'spaceViewPlottingPanel'
      .setProperty("MaximumY",0.2) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'spaceViewPlottingPanel'
      .setProperty("MaximumX",2) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'spaceViewPlottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'spaceViewPlottingPanel'
      .setProperty("MinimumX",-2) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'spaceViewPlottingPanel'
      .setProperty("MinimumY",-0.2) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'spaceViewPlottingPanel'
      .setProperty("TitleY","y") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'spaceViewPlottingPanel'
      .setProperty("TitleX","x") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'spaceViewPlottingPanel'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'spaceViewPlottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"SpaceViewStickGroup", _view.spaceViewPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'SpaceViewStickGroup'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'SpaceViewStickGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorOneShape", _view.SpaceViewStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneShape'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'detectorOneShape'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'detectorOneShape'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOneShape'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"detectorTwoShape", _view.SpaceViewStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorTwoShape'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'detectorTwoShape'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'detectorTwoShape'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorTwoShape'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"stick", _view.SpaceViewStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'stick'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'stick'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'stick'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'stick'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'stick'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"sourceShape", _view.SpaceViewStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'sourceShape'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'sourceShape'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'sourceShape'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'sourceShape'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"detectorOneText32", _view.SpaceViewStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectorOneText32'
      .setProperty("FillColor","LIGHTGRAY") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'detectorOneText32'
      .setProperty("Y",0.14) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectorOneText32'
      .setProperty("Text","detector") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'detectorOneText32'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"detectortwoText322", _view.SpaceViewStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'detectortwoText322'
      .setProperty("FillColor","LIGHTGRAY") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'detectortwoText322'
      .setProperty("Y",0.14) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'detectortwoText322'
      .setProperty("Text","detector") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'detectortwoText322'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"sourceText22", _view.SpaceViewStickGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'sourceText22'
      .setProperty("FillColor","LIGHTGRAY") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'sourceText22'
      .setProperty("Y",0.14) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'sourceText22'
      .setProperty("Text","source") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'sourceText22'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"waveFrontShape", _view.spaceViewPlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'waveFrontShape'
      .setProperty("FillColor","rgba(0,0,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'waveFrontShape'
      .setProperty("LineColor","red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'waveFrontShape'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'waveFrontShape'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"narrativePanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'narrativePanel'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"radioButton", _view.narrativePanel) // EJsS HtmlView.HtmlView Page: declaration of element 'radioButton'
      .setProperty("Text","Home view") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'radioButton'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"radioButton2", _view.narrativePanel) // EJsS HtmlView.HtmlView Page: declaration of element 'radioButton2'
      .setProperty("Text","Stick view") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'radioButton2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h2>Simultaneity Spacetime Diagram</h2>     <p>The Simultaneity Spacetime Diagram model uses light-trajectories to show the effect of relative motion when observing (recording) events in special relativity.</p>     <p>In the default scenario, an explosion (an event) at the center of a right-moving stick occurs at t=0, and the arrival of the explosion light signal at each end is recorded. The arrival event at the left end occurs before the arrival event at the right end because the stick is moving. How do the location and time of these events change if they are observed in a reference frame (the Other Frame) in which the stick is stationary?</p>     <p>The Simultaneity Spacetime Diagram model was written for the study of special relativity using spacetime diagrams. Initial conditions, such as the locations of the explosion and the detectors, can be adjusted by dragging before the simulation is run. The slider can be used to change the speed of the stick. A third view shows the stick and the wavefront in space. More importantly, a checkbox allows users to compare the predictions of Galilean and special relativity in order to observe how the assumption of a constant speed of light leads to the relativity of simultaneity.</p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new SimultaneitySpacetimeDiagram("_topFrame","_ejs_library/",null);
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
