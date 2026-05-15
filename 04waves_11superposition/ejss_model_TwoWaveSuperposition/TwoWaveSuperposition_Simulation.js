/* _inputParameters: an object with different values for the model parameters */
function TwoWaveSuperposition(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var x; // EjsS Model.Variables.Dynamical Vars.x
  var vx; // EjsS Model.Variables.Dynamical Vars.vx
  var t; // EjsS Model.Variables.Dynamical Vars.t
  var dt; // EjsS Model.Variables.Dynamical Vars.dt
  var wave1_x; // EjsS Model.Variables.Dynamical Vars.wave1_x
  var wave1_y; // EjsS Model.Variables.Dynamical Vars.wave1_y
  var wave2_x; // EjsS Model.Variables.Dynamical Vars.wave2_x
  var wave2_y; // EjsS Model.Variables.Dynamical Vars.wave2_y
  var wave3_x; // EjsS Model.Variables.Dynamical Vars.wave3_x
  var wave3_y; // EjsS Model.Variables.Dynamical Vars.wave3_y
  var phase; // EjsS Model.Variables.Dynamical Vars.phase
  var knobDegree; // EjsS Model.Variables.Dynamical Vars.knobDegree
  var showResultant; // EjsS Model.Variables.Dynamical Vars.showResultant

  var PI; // EjsS Model.Variables.Constants.PI

  var font; // EjsS Model.Variables.lookang.font
  var knobDegreeSlider; // EjsS Model.Variables.lookang.knobDegreeSlider

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
      x : x,
      vx : vx,
      t : t,
      dt : dt,
      wave1_x : wave1_x,
      wave1_y : wave1_y,
      wave2_x : wave2_x,
      wave2_y : wave2_y,
      wave3_x : wave3_x,
      wave3_y : wave3_y,
      phase : phase,
      knobDegree : knobDegree,
      showResultant : showResultant,
      PI : PI,
      font : font,
      knobDegreeSlider : knobDegreeSlider
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      x : x,
      vx : vx,
      t : t,
      dt : dt,
      wave1_x : wave1_x,
      wave1_y : wave1_y,
      wave2_x : wave2_x,
      wave2_y : wave2_y,
      wave3_x : wave3_x,
      wave3_y : wave3_y,
      phase : phase,
      knobDegree : knobDegree,
      showResultant : showResultant,
      PI : PI,
      font : font,
      knobDegreeSlider : knobDegreeSlider
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.wave1_x != "undefined") wave1_x = json.wave1_x;
    if(typeof json.wave1_y != "undefined") wave1_y = json.wave1_y;
    if(typeof json.wave2_x != "undefined") wave2_x = json.wave2_x;
    if(typeof json.wave2_y != "undefined") wave2_y = json.wave2_y;
    if(typeof json.wave3_x != "undefined") wave3_x = json.wave3_x;
    if(typeof json.wave3_y != "undefined") wave3_y = json.wave3_y;
    if(typeof json.phase != "undefined") phase = json.phase;
    if(typeof json.knobDegree != "undefined") knobDegree = json.knobDegree;
    if(typeof json.showResultant != "undefined") showResultant = json.showResultant;
    if(typeof json.PI != "undefined") PI = json.PI;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.knobDegreeSlider != "undefined") knobDegreeSlider = json.knobDegreeSlider;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.wave1_x != "undefined") wave1_x = json.wave1_x;
    if(typeof json.wave1_y != "undefined") wave1_y = json.wave1_y;
    if(typeof json.wave2_x != "undefined") wave2_x = json.wave2_x;
    if(typeof json.wave2_y != "undefined") wave2_y = json.wave2_y;
    if(typeof json.wave3_x != "undefined") wave3_x = json.wave3_x;
    if(typeof json.wave3_y != "undefined") wave3_y = json.wave3_y;
    if(typeof json.phase != "undefined") phase = json.phase;
    if(typeof json.knobDegree != "undefined") knobDegree = json.knobDegree;
    if(typeof json.showResultant != "undefined") showResultant = json.showResultant;
    if(typeof json.PI != "undefined") PI = json.PI;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.knobDegreeSlider != "undefined") knobDegreeSlider = json.knobDegreeSlider;
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
    __pagesEnabled["Equations"] = true;
    __pagesEnabled["End of simulation"] = true;
  });

  _model.addToReset(function() {
    x = -1.5; // EjsS Model.Variables.Dynamical Vars.x
    vx = 0.0; // EjsS Model.Variables.Dynamical Vars.vx
    t = 0.0; // EjsS Model.Variables.Dynamical Vars.t
    dt = 1; // EjsS Model.Variables.Dynamical Vars.dt
    wave1_x = new Array(1080); // EjsS Model.Variables.Dynamical Vars.wave1_x
    wave1_y = new Array(1080); // EjsS Model.Variables.Dynamical Vars.wave1_y
    wave2_x = new Array(1080); // EjsS Model.Variables.Dynamical Vars.wave2_x
    wave2_y = new Array(1080); // EjsS Model.Variables.Dynamical Vars.wave2_y
    wave3_x = new Array(1080); // EjsS Model.Variables.Dynamical Vars.wave3_x
    wave3_y = new Array(1080); // EjsS Model.Variables.Dynamical Vars.wave3_y
    phase = 90; // EjsS Model.Variables.Dynamical Vars.phase
    knobDegree = 90; // EjsS Model.Variables.Dynamical Vars.knobDegree
    showResultant = false; // EjsS Model.Variables.Dynamical Vars.showResultant
  });

  _model.addToReset(function() {
    PI = 3.141592654; // EjsS Model.Variables.Constants.PI
  });

  _model.addToReset(function() {
    font = "normal normal 1.5vw "; // EjsS Model.Variables.lookang.font
    knobDegreeSlider = knobDegree; // EjsS Model.Variables.lookang.knobDegreeSlider
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
    _model.setAutoplay(true);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  function update() {  // > CustomCode.Lib Page:1
    phase = knobDegree;  // > CustomCode.Lib Page:2
   // knobDegree = knobDegreeSlider  // > CustomCode.Lib Page:3
    knobDegreeSlider = knobDegree%360 //lookang to sync slider  // > CustomCode.Lib Page:4
    for (let i = 0; i < 1080; i++) {  // > CustomCode.Lib Page:5
      wave1_y[i] = 100 * Math.sin(i / 180 * Math.PI);  // > CustomCode.Lib Page:6
      wave2_y[i] = 100 * Math.sin((i - phase) / 180 * Math.PI);  // > CustomCode.Lib Page:7
      wave3_y[i] = wave1_y[i] + wave2_y[i];  // > CustomCode.Lib Page:8
    }  // > CustomCode.Lib Page:9
  }  // > CustomCode.Lib Page:10
  function updateKnob() {  // > CustomCode.Lib Page:11
    if (knobDegree < 0) {  // > CustomCode.Lib Page:12
      knobDegree = 359;  // > CustomCode.Lib Page:13
    }  // > CustomCode.Lib Page:14
    if (knobDegree > 360) {  // > CustomCode.Lib Page:15
      knobDegree = 0;  // > CustomCode.Lib Page:16
    }  // > CustomCode.Lib Page:17
    update();  // > CustomCode.Lib Page:18
  }  // > CustomCode.Lib Page:19

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    for (let i = 0; i < 1080; i++) {  // > Initialization.Init Page:1
      wave1_x[i] = i;  // > Initialization.Init Page:2
      wave2_x[i] = i;  // > Initialization.Init Page:3
      wave3_x[i] = i;  // > Initialization.Init Page:4
    }  // > Initialization.Init Page:5
    for (let i = 0; i < 1080; i++) {  // > Initialization.Init Page:6
      wave1_y[i] = 100 * Math.sin(i / 180 * Math.PI);  // > Initialization.Init Page:7
      wave2_y[i] = 100 * Math.sin((i - phase) / 180 * Math.PI);  // > Initialization.Init Page:8
      wave3_y[i] = wave1_y[i] + wave2_y[i];  // > Initialization.Init Page:9
    }  // > Initialization.Init Page:10
  });

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Equations"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["End of simulation"]) return;
    update()  // > FixedRelations.End of simulation:1
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
    if (_odeName=="Equations") return _ODEi_evolution1;
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
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["knobDegree","t"]};

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
      __mustReinitialize = true;
      __mustInitialize = false;
    };

    function __pushState() {
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        if (__state[__cIn]!=knobDegree) __mustReinitialize = true;
        __state[__cIn++] = knobDegree;
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
        knobDegree = __state[__cOut++];
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
        var knobDegree = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = 5; // Rate for ODE: Equations:knobDegree
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
        var knobDegree = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        knobDegree = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = knobDegree;
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

  function _historic_knobDegree(__time) {
    var __index = 0;
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
    _view = new TwoWaveSuperposition_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.labelPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'labelPanel'
          _view.slider.linkProperty("Value",  function() { return knobDegreeSlider; }, function(_v) { knobDegreeSlider = _v; } ); // HtmlView Page linking property 'Value' for element 'slider'
          _view.slider.setAction("OnChange", function(_data,_info) {
  knobDegree = knobDegreeSlider 
  update()
  //updateKnob();

}); // HtmlView Page setting action 'OnChange' for element 'slider'
          _view.checkBox.linkProperty("Checked",  function() { return showResultant; }, function(_v) { showResultant = _v; } ); // HtmlView Page linking property 'Checked' for element 'checkBox'
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
          _view.plottingPanel.linkProperty("XTickStep",  function() { return 1080/4; } ); // HtmlView Page linking property 'XTickStep' for element 'plottingPanel'
          _view.trace1.linkProperty("Skip",  function() { return 1080/400; } ); // HtmlView Page linking property 'Skip' for element 'trace1'
          _view.trace1.linkProperty("InputX",  function() { return wave1_x; }, function(_v) { wave1_x = _v; } ); // HtmlView Page linking property 'InputX' for element 'trace1'
          _view.trace1.linkProperty("InputY",  function() { return wave1_y; }, function(_v) { wave1_y = _v; } ); // HtmlView Page linking property 'InputY' for element 'trace1'
          _view.trace12.linkProperty("Skip",  function() { return 1080/400; } ); // HtmlView Page linking property 'Skip' for element 'trace12'
          _view.trace12.linkProperty("InputX",  function() { return wave2_x; }, function(_v) { wave2_x = _v; } ); // HtmlView Page linking property 'InputX' for element 'trace12'
          _view.trace12.linkProperty("InputY",  function() { return wave2_y; }, function(_v) { wave2_y = _v; } ); // HtmlView Page linking property 'InputY' for element 'trace12'
          _view.trace122.linkProperty("Skip",  function() { return 1080/400; } ); // HtmlView Page linking property 'Skip' for element 'trace122'
          _view.trace122.linkProperty("InputX",  function() { return wave3_x; }, function(_v) { wave3_x = _v; } ); // HtmlView Page linking property 'InputX' for element 'trace122'
          _view.trace122.linkProperty("Visibility",  function() { return showResultant; }, function(_v) { showResultant = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trace122'
          _view.trace122.linkProperty("InputY",  function() { return wave3_y; }, function(_v) { wave3_y = _v; } ); // HtmlView Page linking property 'InputY' for element 'trace122'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(true);
  _model.setFPS(20);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function TwoWaveSuperposition_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = TwoWaveSuperposition_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function TwoWaveSuperposition_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singleDrawingPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'singleDrawingPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"labelPanel", _view.singleDrawingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'labelPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"topLabel", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'topLabel'
      .setProperty("Text","Knob Angle = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'topLabel'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'slider'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'slider'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'slider'
      .setProperty("Maximum",360) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'slider'
      .setProperty("ShowText",true) // EJsS HtmlView.HtmlView Page: setting property 'ShowText' for element 'slider'
      .setProperty("Format","000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'slider'
      .setProperty("Step",5) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'slider'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'checkBox'
      .setProperty("Text","showResultant") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'stepButton2'
      .setProperty("Text","Step|►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton3'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.singleDrawingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",200) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",1080) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("TRMessage","Two Wave Superposition Model") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'plottingPanel'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",-200) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("YTickStep",100) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("MarginY",5) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace1", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'trace1'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'trace1'
      .setProperty("MarkSize",[5,5]) // EJsS HtmlView.HtmlView Page: setting property 'MarkSize' for element 'trace1'
      .setProperty("Connected",true) // EJsS HtmlView.HtmlView Page: setting property 'Connected' for element 'trace1'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trace1'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace1'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace1'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trace1'
      .setProperty("MarkType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'MarkType' for element 'trace1'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"hSegment", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'hSegment'
      .setProperty("SizeX",1080) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'hSegment'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'hSegment'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'hSegment'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'hSegment'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'hSegment'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'hSegment'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace12", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'trace12'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'trace12'
      .setProperty("MarkSize",[5,5]) // EJsS HtmlView.HtmlView Page: setting property 'MarkSize' for element 'trace12'
      .setProperty("Connected",true) // EJsS HtmlView.HtmlView Page: setting property 'Connected' for element 'trace12'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trace12'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace12'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace12'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trace12'
      .setProperty("MarkType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'MarkType' for element 'trace12'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace122", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'trace122'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'trace122'
      .setProperty("MarkSize",[5,5]) // EJsS HtmlView.HtmlView Page: setting property 'MarkSize' for element 'trace122'
      .setProperty("Connected",true) // EJsS HtmlView.HtmlView Page: setting property 'Connected' for element 'trace122'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trace122'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace122'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace122'
      .setProperty("MarkType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'MarkType' for element 'trace122'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trace122'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new TwoWaveSuperposition("_topFrame","_ejs_library/",null);
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
