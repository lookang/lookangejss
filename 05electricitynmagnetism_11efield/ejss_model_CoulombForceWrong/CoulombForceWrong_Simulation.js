/* _inputParameters: an object with different values for the model parameters */
function CoulombForceWrong(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var n; // EjsS Model.Variables.Field Vars.n
  var nmax; // EjsS Model.Variables.Field Vars.nmax
  var q0; // EjsS Model.Variables.Field Vars.q0
  var q; // EjsS Model.Variables.Field Vars.q
  var x; // EjsS Model.Variables.Field Vars.x
  var y; // EjsS Model.Variables.Field Vars.y
  var xForce; // EjsS Model.Variables.Field Vars.xForce
  var yForce; // EjsS Model.Variables.Field Vars.yForce
  var xForceScale; // EjsS Model.Variables.Field Vars.xForceScale
  var yForceScale; // EjsS Model.Variables.Field Vars.yForceScale
  var elecForce; // EjsS Model.Variables.Field Vars.elecForce
  var forceValue; // EjsS Model.Variables.Field Vars.forceValue

  var font; // EjsS Model.Variables.lookang.font
  var fontAxis; // EjsS Model.Variables.lookang.fontAxis

  var color; // EjsS Model.Variables.Display Vars.color
  var r; // EjsS Model.Variables.Display Vars.r
  var size; // EjsS Model.Variables.Display Vars.size
  var xmin; // EjsS Model.Variables.Display Vars.xmin
  var xmax; // EjsS Model.Variables.Display Vars.xmax
  var ymin; // EjsS Model.Variables.Display Vars.ymin
  var ymax; // EjsS Model.Variables.Display Vars.ymax
  var colorStr; // EjsS Model.Variables.Display Vars.colorStr
  var colorValue; // EjsS Model.Variables.Display Vars.colorValue
  var qLabel; // EjsS Model.Variables.Display Vars.qLabel
  var StrData; // EjsS Model.Variables.Display Vars.StrData

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      n : n,
      nmax : nmax,
      q0 : q0,
      q : q,
      x : x,
      y : y,
      xForce : xForce,
      yForce : yForce,
      xForceScale : xForceScale,
      yForceScale : yForceScale,
      elecForce : elecForce,
      forceValue : forceValue,
      font : font,
      fontAxis : fontAxis,
      color : color,
      r : r,
      size : size,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      colorStr : colorStr,
      colorValue : colorValue,
      qLabel : qLabel,
      StrData : StrData
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      n : n,
      nmax : nmax,
      q0 : q0,
      q : q,
      x : x,
      y : y,
      xForce : xForce,
      yForce : yForce,
      xForceScale : xForceScale,
      yForceScale : yForceScale,
      elecForce : elecForce,
      forceValue : forceValue,
      font : font,
      fontAxis : fontAxis,
      color : color,
      r : r,
      size : size,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      colorStr : colorStr,
      colorValue : colorValue,
      qLabel : qLabel,
      StrData : StrData
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.nmax != "undefined") nmax = json.nmax;
    if(typeof json.q0 != "undefined") q0 = json.q0;
    if(typeof json.q != "undefined") q = json.q;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.xForce != "undefined") xForce = json.xForce;
    if(typeof json.yForce != "undefined") yForce = json.yForce;
    if(typeof json.xForceScale != "undefined") xForceScale = json.xForceScale;
    if(typeof json.yForceScale != "undefined") yForceScale = json.yForceScale;
    if(typeof json.elecForce != "undefined") elecForce = json.elecForce;
    if(typeof json.forceValue != "undefined") forceValue = json.forceValue;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.fontAxis != "undefined") fontAxis = json.fontAxis;
    if(typeof json.color != "undefined") color = json.color;
    if(typeof json.r != "undefined") r = json.r;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.colorStr != "undefined") colorStr = json.colorStr;
    if(typeof json.colorValue != "undefined") colorValue = json.colorValue;
    if(typeof json.qLabel != "undefined") qLabel = json.qLabel;
    if(typeof json.StrData != "undefined") StrData = json.StrData;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.nmax != "undefined") nmax = json.nmax;
    if(typeof json.q0 != "undefined") q0 = json.q0;
    if(typeof json.q != "undefined") q = json.q;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.xForce != "undefined") xForce = json.xForce;
    if(typeof json.yForce != "undefined") yForce = json.yForce;
    if(typeof json.xForceScale != "undefined") xForceScale = json.xForceScale;
    if(typeof json.yForceScale != "undefined") yForceScale = json.yForceScale;
    if(typeof json.elecForce != "undefined") elecForce = json.elecForce;
    if(typeof json.forceValue != "undefined") forceValue = json.forceValue;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.fontAxis != "undefined") fontAxis = json.fontAxis;
    if(typeof json.color != "undefined") color = json.color;
    if(typeof json.r != "undefined") r = json.r;
    if(typeof json.size != "undefined") size = json.size;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.colorStr != "undefined") colorStr = json.colorStr;
    if(typeof json.colorValue != "undefined") colorValue = json.colorValue;
    if(typeof json.qLabel != "undefined") qLabel = json.qLabel;
    if(typeof json.StrData != "undefined") StrData = json.StrData;
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
    __pagesEnabled["Init Page 2"] = true;
  });

  _model.addToReset(function() {
    n = 2; // EjsS Model.Variables.Field Vars.n
    nmax = 6; // EjsS Model.Variables.Field Vars.nmax
    q0 = 1.0; // EjsS Model.Variables.Field Vars.q0
    q = new Array(nmax); // EjsS Model.Variables.Field Vars.q
    x = new Array(nmax); // EjsS Model.Variables.Field Vars.x
    y = new Array(nmax); // EjsS Model.Variables.Field Vars.y
    xForce = new Array(nmax); // EjsS Model.Variables.Field Vars.xForce
    yForce = new Array(nmax); // EjsS Model.Variables.Field Vars.yForce
    xForceScale = new Array(nmax); // EjsS Model.Variables.Field Vars.xForceScale
    yForceScale = new Array(nmax); // EjsS Model.Variables.Field Vars.yForceScale
    elecForce = new Array(nmax); // EjsS Model.Variables.Field Vars.elecForce
    forceValue = new Array(nmax); // EjsS Model.Variables.Field Vars.forceValue
  });

  _model.addToReset(function() {
    font = "normal normal 2vw "; // EjsS Model.Variables.lookang.font
    fontAxis = "normal normal 1vw "; // EjsS Model.Variables.lookang.fontAxis
  });

  _model.addToReset(function() {
    color = new Array(nmax); // EjsS Model.Variables.Display Vars.color
    r = new Array(nmax); // EjsS Model.Variables.Display Vars.r
    size = 1.0; // EjsS Model.Variables.Display Vars.size
    xmin = -size; // EjsS Model.Variables.Display Vars.xmin
    xmax = size; // EjsS Model.Variables.Display Vars.xmax
    ymin = -size; // EjsS Model.Variables.Display Vars.ymin
    ymax = size; // EjsS Model.Variables.Display Vars.ymax
    colorStr = ["red","green"]; // EjsS Model.Variables.Display Vars.colorStr
    colorValue = "null"; // EjsS Model.Variables.Display Vars.colorValue
    qLabel = 0; // EjsS Model.Variables.Display Vars.qLabel
    StrData = ["red","green","blue","yellow","cyan","magneta"]; // EjsS Model.Variables.Display Vars.StrData
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  // computes force between charges incorrectly  // > CustomCode.Calculate Force:1
  //figure out what is wrong and fix it  // > CustomCode.Calculate Force:2
  function calcF() {  // > CustomCode.Calculate Force:3
    for (var i=0; i<n; i++) {  // > CustomCode.Calculate Force:4
      xForce[i]=0;  // > CustomCode.Calculate Force:5
      yForce[i]=0;  // > CustomCode.Calculate Force:6
      elecForce[i]=0;  // > CustomCode.Calculate Force:7
      for (var j=0; j<n; j++) {  // > CustomCode.Calculate Force:8
        if (i!=j) {  // > CustomCode.Calculate Force:9
          //calculate force on ith particle due to  // > CustomCode.Calculate Force:10
          //jth particle (therefore exclude i=j calculation)  // > CustomCode.Calculate Force:11
          var deltaX=x[i]-x[j];  // > CustomCode.Calculate Force:12
          var deltaY=y[i]-y[j];  // > CustomCode.Calculate Force:13
          var r2=deltaX*deltaX+deltaY*deltaY;  // > CustomCode.Calculate Force:14
          var r=Math.sqrt(r2);  // > CustomCode.Calculate Force:15
          var cos=deltaX/r;  // > CustomCode.Calculate Force:16
          var sin=deltaY/r;  // > CustomCode.Calculate Force:17
          var magnitude=q[i]/r2;  // > CustomCode.Calculate Force:18
          xForce[i]=xForce[i]+magnitude*cos;  // x compondent  // > CustomCode.Calculate Force:19
          yForce[i]=yForce[i]+magnitude*sin;  // y component  // > CustomCode.Calculate Force:20
          xForceScale[i]=xForce[i]*0.1;  // x compondent  // > CustomCode.Calculate Force:21
          yForceScale[i]=yForce[i]*0.1;  // y component  // > CustomCode.Calculate Force:22
            // > CustomCode.Calculate Force:23
        }  // > CustomCode.Calculate Force:24
      }  // > CustomCode.Calculate Force:25
      elecForce[i]=Math.sqrt(xForce[i]*xForce[i]+yForce[i]*yForce[i]);  // > CustomCode.Calculate Force:26
      //magnitude reported in the yellow message boxes  // > CustomCode.Calculate Force:27
      forceValue[i]=" F="+_view._format(elecForce[i],"0.0");  // > CustomCode.Calculate Force:28
    }  // > CustomCode.Calculate Force:29
  }  // > CustomCode.Calculate Force:30

  //add more charges (different color)  // > CustomCode.add Charge:1
  //this method works correctly  // > CustomCode.add Charge:2
  function addCharge () {  // > CustomCode.add Charge:3
    if (n>nmax-1) {  // > CustomCode.add Charge:4
    _tools.showOkDialog("Too many charges! Model is limited to 6 charges.");  // > CustomCode.add Charge:5
    //_view.alert("addChargeButton","Too many charges","Model is limited to 6 charges.");  // > CustomCode.add Charge:6
      }  // > CustomCode.add Charge:7
    else {  // > CustomCode.add Charge:8
      x[n]=-1+2*Math.random();  // > CustomCode.add Charge:9
      y[n]=-1+2*Math.random();  // > CustomCode.add Charge:10
      color[n]=n;  // > CustomCode.add Charge:11
      q[n]=1;  // > CustomCode.add Charge:12
      r[n]=q[n]/10;  // > CustomCode.add Charge:13
      colorStr+=StrData[n]+";";  // > CustomCode.add Charge:14
      n=n+1;  // > CustomCode.add Charge:15
    }  // > CustomCode.add Charge:16
    calcF();  // > CustomCode.add Charge:17
  }  // > CustomCode.add Charge:18

  //set which charge the slider controls using the drop-down menu  // > CustomCode.set Q:1
  //this method works correctly  // > CustomCode.set Q:2
  function setQ () {  // > CustomCode.set Q:3
    if (colorValue=="red"){  // > CustomCode.set Q:4
      qLabel=0;  // > CustomCode.set Q:5
      }  // > CustomCode.set Q:6
      else if (colorValue=="green"){  // > CustomCode.set Q:7
        qLabel=1;  // > CustomCode.set Q:8
        }  // > CustomCode.set Q:9
    else if (colorValue=="blue"){  // > CustomCode.set Q:10
      qLabel=2;  // > CustomCode.set Q:11
      }  // > CustomCode.set Q:12
      else if (colorValue=="yellow"){  // > CustomCode.set Q:13
      qLabel=3;  // > CustomCode.set Q:14
      }  // > CustomCode.set Q:15
      else if (colorValue=="cyan"){  // > CustomCode.set Q:16
      qLabel=4;  // > CustomCode.set Q:17
      }  // > CustomCode.set Q:18
      else if (colorValue=="magneta"){  // > CustomCode.set Q:19
      qLabel=5;  // > CustomCode.set Q:20
      }  // > CustomCode.set Q:21
      q[qLabel]=q0;  // > CustomCode.set Q:22
      r[qLabel]=q[qLabel]/10;  // > CustomCode.set Q:23
      calcF();  // > CustomCode.set Q:24
  }  // > CustomCode.set Q:25

  function setComboBox() {  // > CustomCode.setComboBox:1
    const colors = ["red", "green", "blue", "yellow", "cyan", "magenta"];  // > CustomCode.setComboBox:2
    colorStr = colors.slice(0, n);  // > CustomCode.setComboBox:3
  }  // > CustomCode.setComboBox:4
  /*  // > CustomCode.setComboBox:5
  function setComboBox () {  // > CustomCode.setComboBox:6
  if (n ==2) {  // > CustomCode.setComboBox:7
    colorStr = ["red","green"]  // > CustomCode.setComboBox:8
    }  // > CustomCode.setComboBox:9
    else if (n ==3) {  // > CustomCode.setComboBox:10
    colorStr = ["red","green","blue"]  // > CustomCode.setComboBox:11
    }  // > CustomCode.setComboBox:12
    else if (n ==4) {  // > CustomCode.setComboBox:13
    colorStr = ["red","green","blue","yellow"]  // > CustomCode.setComboBox:14
    }  // > CustomCode.setComboBox:15
    else if (n ==5) {  // > CustomCode.setComboBox:16
    colorStr = ["red","green","blue","yellow","cyan"]  // > CustomCode.setComboBox:17
    }  // > CustomCode.setComboBox:18
    else if (n ==6) {  // > CustomCode.setComboBox:19
    colorStr = ["red","green","blue","yellow","cyan","magneta"]  // > CustomCode.setComboBox:20
    }  // > CustomCode.setComboBox:21
      // > CustomCode.setComboBox:22
  }  // > CustomCode.setComboBox:23
  */  // > CustomCode.setComboBox:24

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    //setting up initial configuration with two charges  // > Initialization.Init Page:1
    n=2;  // > Initialization.Init Page:2
    for (var i=0;i<n;i++){  // > Initialization.Init Page:3
      q[i]=1;  // > Initialization.Init Page:4
    x[i]=-1+2*Math.random();  // > Initialization.Init Page:5
    y[i]=-1+2*Math.random();  // > Initialization.Init Page:6
    color[i]=i;  // > Initialization.Init Page:7
    r[i]=q[i]/10;  // > Initialization.Init Page:8
    forceValue[i]="F";  // > Initialization.Init Page:9
    //colorStr+=StrData[i]+";";  // > Initialization.Init Page:10
    //colorStr += StrData[i];  // > Initialization.Init Page:11
    }  // > Initialization.Init Page:12
    calcF();  // > Initialization.Init Page:13
        // > Initialization.Init Page:14
        // > Initialization.Init Page:15
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 2"]) return;
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

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
    _view = new CoulombForceWrong_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.executionPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'executionPanel'
          _view.addButton.setAction("OnClick", function(_data,_info) {
  addCharge()
  setComboBox ();

}); // HtmlView Page setting action 'OnClick' for element 'addButton'
          _view.addButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'addButton'
          _view.comboBox.linkProperty("Options",  function() { return colorStr; }, function(_v) { colorStr = _v; } ); // HtmlView Page linking property 'Options' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  setQ();

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("SelectedOptions",  function() { return colorValue; }, function(_v) { colorValue = _v; } ); // HtmlView Page linking property 'SelectedOptions' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.label.linkProperty("Foreground",  function() { return qLabel; }, function(_v) { qLabel = _v; } ); // HtmlView Page linking property 'Foreground' for element 'label'
          _view.slider.linkProperty("Background",  function() { return qLabel; }, function(_v) { qLabel = _v; } ); // HtmlView Page linking property 'Background' for element 'slider'
          _view.slider.linkProperty("Value",  function() { return q0; }, function(_v) { q0 = _v; } ); // HtmlView Page linking property 'Value' for element 'slider'
          _view.slider.setAction("OnChange", function(_data,_info) {
  //r[qLabel]=q[qLabel]/10;
  //calcF ();
  setQ();

}); // HtmlView Page setting action 'OnChange' for element 'slider'
          _view.field.linkProperty("Value",  function() { return q0; }, function(_v) { q0 = _v; } ); // HtmlView Page linking property 'Value' for element 'field'
          _view.field.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'field'
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
          _view.stepButton.setAction("OnClick", _step); // HtmlView Page setting action 'OnClick' for element 'stepButton'
          _view.reset.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'reset'
          _view.reset.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'reset'
          _view.WebEJSbutton.setAction("OnClick", function(_data,_info) {
  window.open("https://macmath.inf.um.es/editor?id=lookang&url=https%3A//iwant2study.org/lookangejss/05electricitynmagnetism_11efield/ejss_model_CoulombForceWrong.zip");

}); // HtmlView Page setting action 'OnClick' for element 'WebEJSbutton'
          _view.plottingPanel.linkProperty("XFixedTick",  function() { return -size; } ); // HtmlView Page linking property 'XFixedTick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("AxisYFont",  function() { return fontAxis; }, function(_v) { fontAxis = _v; } ); // HtmlView Page linking property 'AxisYFont' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return size; }, function(_v) { size = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("YFixedTick",  function() { return -size; } ); // HtmlView Page linking property 'YFixedTick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return -size; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return -size; } ); // HtmlView Page linking property 'MinimumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("AxisXFont",  function() { return fontAxis; }, function(_v) { fontAxis = _v; } ); // HtmlView Page linking property 'AxisXFont' for element 'plottingPanel'
          _view.shapeSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet'
          _view.shapeSet.linkProperty("FillColor",  function() { return color; }, function(_v) { color = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeX",  function() { return r; }, function(_v) { r = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet'
          _view.shapeSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet'
          _view.shapeSet.linkProperty("LineColor",  function() { return color; }, function(_v) { color = _v; } ); // HtmlView Page linking property 'LineColor' for element 'shapeSet'
          _view.shapeSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeY",  function() { return r; }, function(_v) { r = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet'
          _view.shapeSet.setAction("OnDrag", function(_data,_info) {
  calcF();

}); // HtmlView Page setting action 'OnDrag' for element 'shapeSet'
          _view.arrowSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'arrowSet'
          _view.arrowSet.linkProperty("SizeX",  function() { return xForceScale; }, function(_v) { xForceScale = _v; } ); // HtmlView Page linking property 'SizeX' for element 'arrowSet'
          _view.arrowSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'arrowSet'
          _view.arrowSet.linkProperty("LineColor",  function() { return color; }, function(_v) { color = _v; } ); // HtmlView Page linking property 'LineColor' for element 'arrowSet'
          _view.arrowSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'arrowSet'
          _view.arrowSet.linkProperty("SizeY",  function() { return yForceScale; }, function(_v) { yForceScale = _v; } ); // HtmlView Page linking property 'SizeY' for element 'arrowSet'
          _view.textBoxSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textBoxSet'
          _view.textBoxSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'textBoxSet'
          _view.textBoxSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'textBoxSet'
          _view.textSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet'
          _view.textSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return forceValue; }, function(_v) { forceValue = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet'
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
function CoulombForceWrong_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = CoulombForceWrong_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Coulomb Force: What is Wrong?','./CoulombForceWrong/CoulombForceWrong.html');

  return _view;
} // end of main function

function CoulombForceWrong_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singlePlotPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'singlePlotPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"executionPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'executionPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'executionPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'executionPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"sliderControl", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderControl'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'sliderControl'
      ;

    _view._addElement(EJSS_INTERFACE.button,"addButton", _view.sliderControl) // EJsS HtmlView.HtmlView Page: declaration of element 'addButton'
      .setProperty("Width","15vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'addButton'
      .setProperty("Tooltip","Add another charge.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'addButton'
      .setProperty("Text","Add Charge") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'addButton'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.sliderControl) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Tooltip","Choose charge to change using slider.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.sliderControl) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      .setProperty("Tooltip","Charge") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'label'
      .setProperty("Text","  q = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"slider", _view.sliderControl) // EJsS HtmlView.HtmlView Page: declaration of element 'slider'
      .setProperty("Width","15vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'slider'
      .setProperty("Minimum",1) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'slider'
      .setProperty("Maximum",3) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'slider'
      .setProperty("Tooltip","Charge") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'slider'
      .setProperty("Step",0.2) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'slider'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field", _view.sliderControl) // EJsS HtmlView.HtmlView Page: declaration of element 'field'
      .setProperty("Width","5vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field'
      .setProperty("Tooltip","Charge") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'field'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView Page: setting property 'Editable' for element 'field'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'playPauseButton2'
      .setProperty("TextOn","▶ Play") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","❚❚ Pause") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton'
      .setProperty("Tooltip","Step") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'stepButton'
      .setProperty("ImageUrl","/org/opensourcephysics/resources/controls/images/stepforward.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'stepButton'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'stepButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"reset", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'reset'
      .setProperty("Width","15vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'reset'
      .setProperty("Text","↻ Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'reset'
      ;

    _view._addElement(EJSS_INTERFACE.button,"WebEJSbutton", _view.executionPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'WebEJSbutton'
      .setProperty("Tooltip","open up file in https://macmath.inf.um.es/") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'WebEJSbutton'
      .setProperty("Text","edit in WebEJS") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'WebEJSbutton'
      ;

    _view._addElement(EJSS_INTERFACE.wrappedPanel,"wrappedPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'wrappedPanel'
      .setProperty("CSS",{ "display":"block"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'wrappedPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.wrappedPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("Background","Black") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel'
      .setProperty("YScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("XTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"arrowSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowSet'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'arrowSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"textBoxGroup", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'textBoxGroup'
      .setProperty("Y",-0.06) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'textBoxGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"textBoxSet", _view.textBoxGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'textBoxSet'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'textBoxSet'
      .setProperty("SizeX",0.25) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'textBoxSet'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'textBoxSet'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'textBoxSet'
      .setProperty("SizeY",0.08) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'textBoxSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"textGroup", _view.textBoxGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'textGroup'
      .setProperty("Y",-0.03) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'textGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.textGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'textSet'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h1>Coulomb Force Wrong Model</h1> <p>The EJSS Coulomb Force Wrong model challenges students to identify errors in a simulation involving multiple charges, complete with force vectors. Users are empowered to modify individual charges and introduce additional charges. This model can be examined and rectified <strong>if EJSS is installed</strong>.</p> <h2>Exercises:</h2> <ol>   <li>Run the simulation and explore in https://macmath.inf.um.es/ by clicking on Edit on WebEJS button. Rearrange the charges to observe the force vectors and their magnitudes. Analyze the model's correctness and gather evidence to support your observations.</li>   <li>Utilize the slider to adjust the charge of a selected charge (its size will also change to indicate the modification). The drop-down menu permits you to choose the charge (by color) for adjustment. Identify any discrepancies in the force vectors or magnitude readings. Provide evidence for your observations. For confirmation, add an extra charge using the <code>Add Charge</code> button.</li>   <li>If you have EJSS installed or on https://macmath.inf.um.es/, embark on rectifying the identified issues within the model. The correction lies within <code>Model-&gt;Custom-&gt;Calculate Force</code>. Elaborate on your corrective steps. (Background understanding required: <a href=\"http://java.sun.com/docs/books/tutorial/java/nutsandbolts/arrays.html\">arrays</a> and <a href=\"http://java.sun.com/docs/books/tutorial/java/nutsandbolts/for.html\">for loops</a> or refer to <a href=\"../docs/Computing Basics for use with EJSS(clean).doc\">EJSS Computing Basics</a>.)</li> </ol> <h3>References:</h3> <ul>   <li>Giancoli, <em>Physics for Scientists and Engineers</em>, 4th edition, Chapter 21 (2008).</li> </ul> <h3>Credits:</h3> <p>The Coulomb Force Wrong Model was conceived by Anne Cox, Wolfgang Christian, and Francisco Esquembre, utilizing the Easy JavaScript Simulations (EJSS) authoring and modeling tool. Exercises were composed by Anne J Cox, Darren Tan, and lookang.</p> <p><strong>Navigating to Model:</strong> Using the <a href=\"https://gitlab.com/ejsS/JavaScriptEditor/release\" target=\"_blank\">EJSS authoring toolkit</a> installed, follow these steps: Select \"A EJSS digital Library,\" choose \"JS EJS model in Singapore\" from the Library, double click the \"05electricitynmagnetism_11efield\" folder, and then double click on the \"CoulombForceWrong\" filename. Finally, click the \"Download\" button. Store the model source code within your EJSS defined workspace/source/ directory.</p> <p>For more information about EJSS, visit: <a href=\"http://www.um.es/fem/Ejs/\" target=\"_blank\">http://www.um.es/fem/Ejs/</a> and explore the OSP ComPADRE collection: <a href=\"http://www.compadre.org/OSP/\" target=\"_blank\">http://www.compadre.org/OSP/</a>.</p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new CoulombForceWrong("_topFrame","_ejs_library/",null);
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
