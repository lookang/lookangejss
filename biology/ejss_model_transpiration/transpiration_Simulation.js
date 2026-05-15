/* _inputParameters: an object with different values for the model parameters */
function transpiration(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var board; // EjsS Model.Variables.EditableVariable.board
  var numOfRows; // EjsS Model.Variables.EditableVariable.numOfRows
  var numOfCols; // EjsS Model.Variables.EditableVariable.numOfCols
  var cardSet1; // EjsS Model.Variables.EditableVariable.cardSet1
  var cardSet2; // EjsS Model.Variables.EditableVariable.cardSet2
  var numOfPlayers; // EjsS Model.Variables.EditableVariable.numOfPlayers
  var playericon; // EjsS Model.Variables.EditableVariable.playericon
  var bonusmove; // EjsS Model.Variables.EditableVariable.bonusmove
  var penaltymove; // EjsS Model.Variables.EditableVariable.penaltymove
  var shufflecards; // EjsS Model.Variables.EditableVariable.shufflecards
  var showinstruction; // EjsS Model.Variables.EditableVariable.showinstruction
  var font; // EjsS Model.Variables.EditableVariable.font

  var appliance; // EjsS Model.Variables.Var Table.appliance
  var plant; // EjsS Model.Variables.Var Table.plant
  var temperature; // EjsS Model.Variables.Var Table.temperature
  var time; // EjsS Model.Variables.Var Table.time
  var reading; // EjsS Model.Variables.Var Table.reading
  var showSim; // EjsS Model.Variables.Var Table.showSim
  var showData; // EjsS Model.Variables.Var Table.showData
  var visiblePlant; // EjsS Model.Variables.Var Table.visiblePlant
  var visibleAppliance; // EjsS Model.Variables.Var Table.visibleAppliance
  var numPlants; // EjsS Model.Variables.Var Table.numPlants
  var numAppliances; // EjsS Model.Variables.Var Table.numAppliances
  var meterx; // EjsS Model.Variables.Var Table.meterx
  var metery; // EjsS Model.Variables.Var Table.metery

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      board : board,
      numOfRows : numOfRows,
      numOfCols : numOfCols,
      cardSet1 : cardSet1,
      cardSet2 : cardSet2,
      numOfPlayers : numOfPlayers,
      playericon : playericon,
      bonusmove : bonusmove,
      penaltymove : penaltymove,
      shufflecards : shufflecards,
      showinstruction : showinstruction,
      font : font,
      appliance : appliance,
      plant : plant,
      temperature : temperature,
      time : time,
      reading : reading,
      showSim : showSim,
      showData : showData,
      visiblePlant : visiblePlant,
      visibleAppliance : visibleAppliance,
      numPlants : numPlants,
      numAppliances : numAppliances,
      meterx : meterx,
      metery : metery
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      board : board,
      numOfRows : numOfRows,
      numOfCols : numOfCols,
      cardSet1 : cardSet1,
      cardSet2 : cardSet2,
      numOfPlayers : numOfPlayers,
      playericon : playericon,
      bonusmove : bonusmove,
      penaltymove : penaltymove,
      shufflecards : shufflecards,
      showinstruction : showinstruction,
      font : font,
      appliance : appliance,
      plant : plant,
      temperature : temperature,
      time : time,
      reading : reading,
      showSim : showSim,
      showData : showData,
      visiblePlant : visiblePlant,
      visibleAppliance : visibleAppliance,
      numPlants : numPlants,
      numAppliances : numAppliances,
      meterx : meterx,
      metery : metery
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.board != "undefined") board = json.board;
    if(typeof json.numOfRows != "undefined") numOfRows = json.numOfRows;
    if(typeof json.numOfCols != "undefined") numOfCols = json.numOfCols;
    if(typeof json.cardSet1 != "undefined") cardSet1 = json.cardSet1;
    if(typeof json.cardSet2 != "undefined") cardSet2 = json.cardSet2;
    if(typeof json.numOfPlayers != "undefined") numOfPlayers = json.numOfPlayers;
    if(typeof json.playericon != "undefined") playericon = json.playericon;
    if(typeof json.bonusmove != "undefined") bonusmove = json.bonusmove;
    if(typeof json.penaltymove != "undefined") penaltymove = json.penaltymove;
    if(typeof json.shufflecards != "undefined") shufflecards = json.shufflecards;
    if(typeof json.showinstruction != "undefined") showinstruction = json.showinstruction;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.appliance != "undefined") appliance = json.appliance;
    if(typeof json.plant != "undefined") plant = json.plant;
    if(typeof json.temperature != "undefined") temperature = json.temperature;
    if(typeof json.time != "undefined") time = json.time;
    if(typeof json.reading != "undefined") reading = json.reading;
    if(typeof json.showSim != "undefined") showSim = json.showSim;
    if(typeof json.showData != "undefined") showData = json.showData;
    if(typeof json.visiblePlant != "undefined") visiblePlant = json.visiblePlant;
    if(typeof json.visibleAppliance != "undefined") visibleAppliance = json.visibleAppliance;
    if(typeof json.numPlants != "undefined") numPlants = json.numPlants;
    if(typeof json.numAppliances != "undefined") numAppliances = json.numAppliances;
    if(typeof json.meterx != "undefined") meterx = json.meterx;
    if(typeof json.metery != "undefined") metery = json.metery;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.board != "undefined") board = json.board;
    if(typeof json.numOfRows != "undefined") numOfRows = json.numOfRows;
    if(typeof json.numOfCols != "undefined") numOfCols = json.numOfCols;
    if(typeof json.cardSet1 != "undefined") cardSet1 = json.cardSet1;
    if(typeof json.cardSet2 != "undefined") cardSet2 = json.cardSet2;
    if(typeof json.numOfPlayers != "undefined") numOfPlayers = json.numOfPlayers;
    if(typeof json.playericon != "undefined") playericon = json.playericon;
    if(typeof json.bonusmove != "undefined") bonusmove = json.bonusmove;
    if(typeof json.penaltymove != "undefined") penaltymove = json.penaltymove;
    if(typeof json.shufflecards != "undefined") shufflecards = json.shufflecards;
    if(typeof json.showinstruction != "undefined") showinstruction = json.showinstruction;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.appliance != "undefined") appliance = json.appliance;
    if(typeof json.plant != "undefined") plant = json.plant;
    if(typeof json.temperature != "undefined") temperature = json.temperature;
    if(typeof json.time != "undefined") time = json.time;
    if(typeof json.reading != "undefined") reading = json.reading;
    if(typeof json.showSim != "undefined") showSim = json.showSim;
    if(typeof json.showData != "undefined") showData = json.showData;
    if(typeof json.visiblePlant != "undefined") visiblePlant = json.visiblePlant;
    if(typeof json.visibleAppliance != "undefined") visibleAppliance = json.visibleAppliance;
    if(typeof json.numPlants != "undefined") numPlants = json.numPlants;
    if(typeof json.numAppliances != "undefined") numAppliances = json.numAppliances;
    if(typeof json.meterx != "undefined") meterx = json.meterx;
    if(typeof json.metery != "undefined") metery = json.metery;
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
  });

  _model.addToReset(function() {
    board = [   "?!oo??ooo!oo!",   "o___________o",   "!oo?_____?oo!",   "___o_____o___",   "!oo?_____o?o!",   "!___________o",   "oooos___eooo?" ]; // EjsS Model.Variables.EditableVariable.board
    numOfRows = 7; // EjsS Model.Variables.EditableVariable.numOfRows
    numOfCols = 13; // EjsS Model.Variables.EditableVariable.numOfCols
    cardSet1 = [ ["What is 2 + 2?", "4"],   ["What is 10 * 1?", "10"],   ["How many lives does a cat have?", "9"],   ["What is the smallest prime number with repeating digits?", "11"],   ["Why is 6 afraid of 7?", "Because 7 ate 9"] ]; // EjsS Model.Variables.EditableVariable.cardSet1
    cardSet2 = [   ["After watching the following video, determine if the lemonade stand had, prior to the man's meeting with the duck, accquired any grapes.",    "No, he had not.",    "https://www.youtube.com/embed/MtN1YnoL46Q"],   ["What is Einstein's most famous equation?", "E = mc^2"],   ["The invention of calculus is often credited to 2 people, one of which is Newton. Who is the other person?", "Leibniz"],   ["These 4 equations are often critical when discussing electromagnetism. Who is largely credited to have created these equations?", "Maxwell"],   ["What is Newton's 1st law?", "With 0 net force acting on an object, it either remains stationary, or travels at constant velocity."] ]; // EjsS Model.Variables.EditableVariable.cardSet2
    numOfPlayers = 6; // EjsS Model.Variables.EditableVariable.numOfPlayers
    playericon = ["♟","♞","♝","♜","♛","♚"]; // EjsS Model.Variables.EditableVariable.playericon
    bonusmove = Math.round(Math.random()*6); // EjsS Model.Variables.EditableVariable.bonusmove
    penaltymove = Math.round(Math.random()*2); // EjsS Model.Variables.EditableVariable.penaltymove
    shufflecards = true; // EjsS Model.Variables.EditableVariable.shufflecards
    showinstruction = false; // EjsS Model.Variables.EditableVariable.showinstruction
    font = "normal normal 2vmax "; // EjsS Model.Variables.EditableVariable.font
  });

  _model.addToReset(function() {
    appliance = 0; // EjsS Model.Variables.Var Table.appliance
    plant = 0; // EjsS Model.Variables.Var Table.plant
    temperature = 21.0; // EjsS Model.Variables.Var Table.temperature
    time = 0; // EjsS Model.Variables.Var Table.time
    reading = 0; // EjsS Model.Variables.Var Table.reading
    showSim = true; // EjsS Model.Variables.Var Table.showSim
    showData = true; // EjsS Model.Variables.Var Table.showData
    visiblePlant = 1; // EjsS Model.Variables.Var Table.visiblePlant
    visibleAppliance = 0; // EjsS Model.Variables.Var Table.visibleAppliance
    numPlants = 10; // EjsS Model.Variables.Var Table.numPlants
    numAppliances = 4; // EjsS Model.Variables.Var Table.numAppliances
    meterx = -2; // EjsS Model.Variables.Var Table.meterx
    metery = 0.5; // EjsS Model.Variables.Var Table.metery
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

  function editableFunction () {  // > CustomCode.EditableFunction:1
  }  // > CustomCode.EditableFunction:2

  // in initialization  // > CustomCode.shuffle:1
  // possible usage if x is the array  // > CustomCode.shuffle:2
  //shuffleArray(x);  // > CustomCode.shuffle:3
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array  // > CustomCode.shuffle:4
  /**  // > CustomCode.shuffle:5
   * Randomize array element order in-place.  // > CustomCode.shuffle:6
   * Using Durstenfeld shuffle algorithm.  // > CustomCode.shuffle:7
   */  // > CustomCode.shuffle:8
  function shuffleArray(array) {  // > CustomCode.shuffle:9
      for (var i = array.length - 1; i > 0; i--) {  // > CustomCode.shuffle:10
          var j = Math.floor(Math.random() * (i + 1));  // > CustomCode.shuffle:11
          var temp = array[i];  // > CustomCode.shuffle:12
          array[i] = array[j];  // > CustomCode.shuffle:13
          array[j] = temp;  // > CustomCode.shuffle:14
      }  // > CustomCode.shuffle:15
  }  // > CustomCode.shuffle:16

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

  function changePlant (plant) {  // > CustomCode.changePlant:1
    // 0=nothing, 1=english ivy, 2=weeping fig, 3=dieffenbachia, 4=devils ivy  // > CustomCode.changePlant:2
    if(plant>0 && plant<numPlants) { // check validity of change plant value  // > CustomCode.changePlant:3
      visiblePlant = plant; // set selected plant as visible  // > CustomCode.changePlant:4
    }  // > CustomCode.changePlant:5
  }  // > CustomCode.changePlant:6

  function changeAppliance (appliance) {  // > CustomCode.changeAppliance:1
    // 0=nothing, 1=heater, 2=fan, 3=lamp  // > CustomCode.changeAppliance:2
    if(appliance>=0 && appliance<numAppliances) {  // > CustomCode.changeAppliance:3
      visibleAppliance = appliance;  // > CustomCode.changeAppliance:4
    }  // > CustomCode.changeAppliance:5
  }  // > CustomCode.changeAppliance:6

  function calcTranspiration () {  // > CustomCode.calcTranspiration:1
    var plant = visiblePlant;  // > CustomCode.calcTranspiration:2
    var appliance = visibleAppliance;  // > CustomCode.calcTranspiration:3
    if (plant<0 || appliance<0 || plant>=numPlants || appliance>=numAppliances) return 0;  // > CustomCode.calcTranspiration:4
    var results = [[0, 0, 0, 0],  // > CustomCode.calcTranspiration:5
                   [1.8, 3.2, 5.1, 2.1], // english ivy  // > CustomCode.calcTranspiration:6
                   [3.3, 4.9, 6.1, 2.5], // weeping fig  // > CustomCode.calcTranspiration:7
                   [4.1, 6.0, 7.7, 3.9], // dieffenbachia  // > CustomCode.calcTranspiration:8
                   [2.9, 4.1, 4.6, 3.0], // devils ivy  // > CustomCode.calcTranspiration:9
                   [3.6, 6.6, 7.5, 4.0], // arrowhead  // > CustomCode.calcTranspiration:10
                   [0.9, 3.9, 6.0, 3.0], // coleus  // > CustomCode.calcTranspiration:11
                   [1.2, 5.8, 4.7, 2.4], // geranium  // > CustomCode.calcTranspiration:12
                   [4.9, 6.8, 8.4, 4.3], // rubber plant  // > CustomCode.calcTranspiration:13
                   [4.2, 6.1, 7.6, 3.2]]; // zebra plant  // > CustomCode.calcTranspiration:14
    _view.meter.setValue(results[plant][appliance]);  // > CustomCode.calcTranspiration:15
    _view.reading.setText(results[plant][appliance]+" mL");  // > CustomCode.calcTranspiration:16
    //document.getElementById("reading.text").getElementsByTagName("tspan")[0].innerHTML = results[plant][appliance]+" mL";  // > CustomCode.calcTranspiration:17
    document.getElementById("plant"+plant+"_appliance"+appliance).innerHTML = results[plant][appliance].toFixed(1);  // > CustomCode.calcTranspiration:18
    return(results[plant][appliance]);  // > CustomCode.calcTranspiration:19
  }  // > CustomCode.calcTranspiration:20

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
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
    _view = new transpiration_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.topPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'topPanel'
          _view.showSim.setAction("OnCheckOff", function(_data,_info) {
  showSim=false;

}); // HtmlView Page setting action 'OnCheckOff' for element 'showSim'
          _view.showSim.setAction("OnCheckOn", function(_data,_info) {
  showSim=true;

}); // HtmlView Page setting action 'OnCheckOn' for element 'showSim'
          _view.showData.setAction("OnCheckOff", function(_data,_info) {
  showData=false;

}); // HtmlView Page setting action 'OnCheckOff' for element 'showData'
          _view.showData.setAction("OnCheckOn", function(_data,_info) {
  showData=true;

}); // HtmlView Page setting action 'OnCheckOn' for element 'showData'
          _view.plantSelect.linkProperty("Options",  function() { return ["English Ivy","Weeping Fig","Dieffenbachia","Devil's Ivy","Arrowhead","Coleus","Geranium","Rubber Plant","Zebra Plant"]; } ); // HtmlView Page linking property 'Options' for element 'plantSelect'
          _view.plantSelect.setAction("OnChange", function(_data,_info) {
  // placeholder selection for plant
  var opts = _view.plantSelect.getProperty("SelectedOptions");  // array of options
  var option = (opts.length > 0)? opts[0]:""; // selected option 
  console.log("you selected "+option);
  if(option=="English Ivy") {
    changePlant(1);
  } else if(option=="Weeping Fig") {
    changePlant(2);
  } else if(option=="Dieffenbachia") {
    changePlant(3);
  } else if(option=="Devil's Ivy") {
    changePlant(4);
  } else if(option=="Arrowhead") {
    changePlant(5);
  } else if(option=="Coleus") {
    changePlant(6);
  } else if(option=="Geranium") {
    changePlant(7);
  } else if(option=="Rubber Plant") {
    changePlant(8);
  } else if(option=="Zebra Plant") {
    changePlant(9);
  }

}); // HtmlView Page setting action 'OnChange' for element 'plantSelect'
          _view.plantSelect.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'plantSelect'
          _view.applianceSelect.linkProperty("Options",  function() { return ["nothing","heater","fan","lamp"]; } ); // HtmlView Page linking property 'Options' for element 'applianceSelect'
          _view.applianceSelect.setAction("OnChange", function(_data,_info) {
  // placeholder selection for appliance
  var opts = _view.applianceSelect.getProperty("SelectedOptions");  // array of options
  var option = (opts.length > 0)? opts[0]:""; // selected option 
  if(option=="nothing") {
    changeAppliance(0);
  } else if(option=="heater") {
    changeAppliance(1);
  } else if(option=="fan") {
    changeAppliance(2);
  } else if(option=="lamp") {
    changeAppliance(3);
  }

}); // HtmlView Page setting action 'OnChange' for element 'applianceSelect'
          _view.applianceSelect.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'applianceSelect'
          _view.run.setAction("OnClick", function(_data,_info) {
  calcTranspiration();

}); // HtmlView Page setting action 'OnClick' for element 'run'
          _view.reset.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'reset'
          _view.reset.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'reset'
          _view.mainPanel.linkProperty("Width",  function() { return showData==true?"50%":"100%"; } ); // HtmlView Page linking property 'Width' for element 'mainPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return showSim===true; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Display",  function() { return showSim==true?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'plottingPanel'
          _view.engIvy.linkProperty("Visibility",  function() { return visiblePlant===1; } ); // HtmlView Page linking property 'Visibility' for element 'engIvy'
          _view.weepingFig.linkProperty("Visibility",  function() { return visiblePlant===2; } ); // HtmlView Page linking property 'Visibility' for element 'weepingFig'
          _view.dieffenbachia.linkProperty("Visibility",  function() { return visiblePlant===3; } ); // HtmlView Page linking property 'Visibility' for element 'dieffenbachia'
          _view.devilsIvy.linkProperty("Visibility",  function() { return visiblePlant===4; } ); // HtmlView Page linking property 'Visibility' for element 'devilsIvy'
          _view.arrowhead.linkProperty("Visibility",  function() { return visiblePlant===5; } ); // HtmlView Page linking property 'Visibility' for element 'arrowhead'
          _view.coleus.linkProperty("Visibility",  function() { return visiblePlant===6; } ); // HtmlView Page linking property 'Visibility' for element 'coleus'
          _view.geranium.linkProperty("Visibility",  function() { return visiblePlant===7; } ); // HtmlView Page linking property 'Visibility' for element 'geranium'
          _view.rubberPlant.linkProperty("Visibility",  function() { return visiblePlant===8; } ); // HtmlView Page linking property 'Visibility' for element 'rubberPlant'
          _view.zebraPlant.linkProperty("Visibility",  function() { return visiblePlant===9; } ); // HtmlView Page linking property 'Visibility' for element 'zebraPlant'
          _view.meter.linkProperty("X",  function() { return meterx; }, function(_v) { meterx = _v; } ); // HtmlView Page linking property 'X' for element 'meter'
          _view.meter.linkProperty("Y",  function() { return metery; }, function(_v) { metery = _v; } ); // HtmlView Page linking property 'Y' for element 'meter'
          _view.reading.linkProperty("X",  function() { return meterx; }, function(_v) { meterx = _v; } ); // HtmlView Page linking property 'X' for element 'reading'
          _view.reading.linkProperty("Y",  function() { return metery; }, function(_v) { metery = _v; } ); // HtmlView Page linking property 'Y' for element 'reading'
          _view.fan.linkProperty("Visibility",  function() { return visibleAppliance===2; } ); // HtmlView Page linking property 'Visibility' for element 'fan'
          _view.lamp.linkProperty("Visibility",  function() { return visibleAppliance===3; } ); // HtmlView Page linking property 'Visibility' for element 'lamp'
          _view.heater.linkProperty("Visibility",  function() { return visibleAppliance===1; } ); // HtmlView Page linking property 'Visibility' for element 'heater'
          _view.dataPanel.linkProperty("Width",  function() { return showSim==true?"50%":"100%"; } ); // HtmlView Page linking property 'Width' for element 'dataPanel'
          _view.dataPanel.linkProperty("Visibility",  function() { return showData===true; } ); // HtmlView Page linking property 'Visibility' for element 'dataPanel'
          _view.dataPanel.linkProperty("Display",  function() { return showData==true?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'dataPanel'
          _view.tabbedPanel.linkProperty("Titles",  function() { return ["Instructions","Experiment Info","Practice Questions"]; } ); // HtmlView Page linking property 'Titles' for element 'tabbedPanel'
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
function transpiration_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = transpiration_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('To-Do','./transpiration_Intro_1.html');

  return _view;
} // end of main function

function transpiration_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'topPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'topPanel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'topPanel'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"showSim", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'showSim'
      .setProperty("Checked",true) // EJsS HtmlView.HtmlView Page: setting property 'Checked' for element 'showSim'
      .setProperty("Text","show model") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'showSim'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"showData", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'showData'
      .setProperty("Checked",true) // EJsS HtmlView.HtmlView Page: setting property 'Checked' for element 'showData'
      .setProperty("Text","show data") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'showData'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"plantSelect", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plantSelect'
      .setProperty("Width","15%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plantSelect'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"applianceSelect", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'applianceSelect'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'applianceSelect'
      ;

    _view._addElement(EJSS_INTERFACE.button,"run", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'run'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'run'
      .setProperty("Text","Run for 1 hour") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'run'
      ;

    _view._addElement(EJSS_INTERFACE.button,"reset", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'reset'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'reset'
      .setProperty("Text","↻Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'reset'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"mainPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'mainPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'mainPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","80vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[0, 0, 0, 0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("ShowCoordinates",true) // EJsS HtmlView.HtmlView Page: setting property 'ShowCoordinates' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("TRMessage","Potometer Model") // EJsS HtmlView.HtmlView Page: setting property 'TRMessage' for element 'plottingPanel'
      .setProperty("XTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",3) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("EnabledDragging","true") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("MaximumX",5.5) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumX",-3) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",-4.5) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"potometer", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'potometer'
      .setProperty("SizeX",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'potometer'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'potometer'
      .setProperty("X",-3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'potometer'
      .setProperty("ImageUrl","./assets/potometer.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'potometer'
      .setProperty("Y",-2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'potometer'
      .setProperty("SizeY",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'potometer'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"plant", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plant'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'plant'
      .setProperty("Y",-4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'plant'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"engIvy", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'engIvy'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"engIvyImg", _view.engIvy) // EJsS HtmlView.HtmlView Page: declaration of element 'engIvyImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'engIvyImg'
      .setProperty("X",0.8) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'engIvyImg'
      .setProperty("ImageUrl","./assets/englishivy.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'engIvyImg'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'engIvyImg'
      .setProperty("SizeY",3.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'engIvyImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"engIvyTxt", _view.engIvy) // EJsS HtmlView.HtmlView Page: declaration of element 'engIvyTxt'
      .setProperty("Text","English Ivy") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'engIvyTxt'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'engIvyTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"weepingFig", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'weepingFig'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"weepingFigImg", _view.weepingFig) // EJsS HtmlView.HtmlView Page: declaration of element 'weepingFigImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'weepingFigImg'
      .setProperty("X",0.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'weepingFigImg'
      .setProperty("ImageUrl","./assets/weepingfig.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'weepingFigImg'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'weepingFigImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'weepingFigImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"weepingFigTxt", _view.weepingFig) // EJsS HtmlView.HtmlView Page: declaration of element 'weepingFigTxt'
      .setProperty("Text","Weeping Fig") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'weepingFigTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"dieffenbachia", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'dieffenbachia'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"dieffImg", _view.dieffenbachia) // EJsS HtmlView.HtmlView Page: declaration of element 'dieffImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'dieffImg'
      .setProperty("X",1.2) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'dieffImg'
      .setProperty("ImageUrl","./assets/dieffenbachia.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'dieffImg'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'dieffImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'dieffImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"dieffTxt", _view.dieffenbachia) // EJsS HtmlView.HtmlView Page: declaration of element 'dieffTxt'
      .setProperty("Text","Dieffenbachia") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'dieffTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"devilsIvy", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'devilsIvy'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"devilsIvyImg", _view.devilsIvy) // EJsS HtmlView.HtmlView Page: declaration of element 'devilsIvyImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'devilsIvyImg'
      .setProperty("X",0.7) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'devilsIvyImg'
      .setProperty("ImageUrl","./assets/devilsivy.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'devilsIvyImg'
      .setProperty("Y",4.2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'devilsIvyImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'devilsIvyImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"devilsIvyTxt", _view.devilsIvy) // EJsS HtmlView.HtmlView Page: declaration of element 'devilsIvyTxt'
      .setProperty("Text","Devil's Ivy") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'devilsIvyTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"arrowhead", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowhead'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"arrowheadImg", _view.arrowhead) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowheadImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrowheadImg'
      .setProperty("X",1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrowheadImg'
      .setProperty("ImageUrl","./assets/arrowhead.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'arrowheadImg'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrowheadImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrowheadImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"arrowheadTxt", _view.arrowhead) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowheadTxt'
      .setProperty("Text","Arrowhead") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'arrowheadTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"coleus", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'coleus'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"coleusImg", _view.coleus) // EJsS HtmlView.HtmlView Page: declaration of element 'coleusImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'coleusImg'
      .setProperty("X",1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'coleusImg'
      .setProperty("ImageUrl","./assets/coleus.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'coleusImg'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'coleusImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'coleusImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"coleusTxt", _view.coleus) // EJsS HtmlView.HtmlView Page: declaration of element 'coleusTxt'
      .setProperty("Text","Coleus") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'coleusTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"geranium", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'geranium'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"geraniumImg", _view.geranium) // EJsS HtmlView.HtmlView Page: declaration of element 'geraniumImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'geraniumImg'
      .setProperty("X",1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'geraniumImg'
      .setProperty("ImageUrl","./assets/geranium.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'geraniumImg'
      .setProperty("Y",4.2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'geraniumImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'geraniumImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"geraniumTxt", _view.geranium) // EJsS HtmlView.HtmlView Page: declaration of element 'geraniumTxt'
      .setProperty("Text","Geranium") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'geraniumTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"rubberPlant", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'rubberPlant'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"rubberPlantImg", _view.rubberPlant) // EJsS HtmlView.HtmlView Page: declaration of element 'rubberPlantImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'rubberPlantImg'
      .setProperty("X",0.95) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'rubberPlantImg'
      .setProperty("ImageUrl","./assets/rubberplant.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'rubberPlantImg'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'rubberPlantImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'rubberPlantImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"rubberPlantTxt", _view.rubberPlant) // EJsS HtmlView.HtmlView Page: declaration of element 'rubberPlantTxt'
      .setProperty("Text","Rubber Plant") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'rubberPlantTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"zebraPlant", _view.plant) // EJsS HtmlView.HtmlView Page: declaration of element 'zebraPlant'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"zebraPlantImg", _view.zebraPlant) // EJsS HtmlView.HtmlView Page: declaration of element 'zebraPlantImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'zebraPlantImg'
      .setProperty("X",0.7) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'zebraPlantImg'
      .setProperty("ImageUrl","./assets/zebraplant.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'zebraPlantImg'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'zebraPlantImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'zebraPlantImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"zebraPlantTxt", _view.zebraPlant) // EJsS HtmlView.HtmlView Page: declaration of element 'zebraPlantTxt'
      .setProperty("Text","Zebra Plant") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'zebraPlantTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"meterg", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'meterg'
      ;

    _view._addElement(EJSS_DRAWING2D.meter,"meter", _view.meterg) // EJsS HtmlView.HtmlView Page: declaration of element 'meter'
      .setProperty("Radius",1) // EJsS HtmlView.HtmlView Page: setting property 'Radius' for element 'meter'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'meter'
      .setProperty("Maximum",10) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'meter'
      .setProperty("ArrowColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'ArrowColor' for element 'meter'
      .setProperty("Digits",1) // EJsS HtmlView.HtmlView Page: setting property 'Digits' for element 'meter'
      .setProperty("Value",0) // EJsS HtmlView.HtmlView Page: setting property 'Value' for element 'meter'
      .setProperty("CircleWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'CircleWidth' for element 'meter'
      .setProperty("Units","mL") // EJsS HtmlView.HtmlView Page: setting property 'Units' for element 'meter'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"reading", _view.meterg) // EJsS HtmlView.HtmlView Page: declaration of element 'reading'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'reading'
      .setProperty("Text","0 mL") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'reading'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'reading'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"appliance", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'appliance'
      .setProperty("X",4) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'appliance'
      .setProperty("Y",-3) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'appliance'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"fan", _view.appliance) // EJsS HtmlView.HtmlView Page: declaration of element 'fan'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"fanImg", _view.fan) // EJsS HtmlView.HtmlView Page: declaration of element 'fanImg'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'fanImg'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'fanImg'
      .setProperty("ImageUrl","./assets/fan.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'fanImg'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'fanImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"fanTxt", _view.fan) // EJsS HtmlView.HtmlView Page: declaration of element 'fanTxt'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'fanTxt'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'fanTxt'
      .setProperty("Y",-0.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'fanTxt'
      .setProperty("Text","Fan") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'fanTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"lamp", _view.appliance) // EJsS HtmlView.HtmlView Page: declaration of element 'lamp'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'lamp'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'lamp'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"lampImg", _view.lamp) // EJsS HtmlView.HtmlView Page: declaration of element 'lampImg'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'lampImg'
      .setProperty("ImageUrl","./assets/lamp.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'lampImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"lampTxt", _view.lamp) // EJsS HtmlView.HtmlView Page: declaration of element 'lampTxt'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'lampTxt'
      .setProperty("Y",-0.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'lampTxt'
      .setProperty("Text","Lamp") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'lampTxt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"heater", _view.appliance) // EJsS HtmlView.HtmlView Page: declaration of element 'heater'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'heater'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'heater'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"heaterImg", _view.heater) // EJsS HtmlView.HtmlView Page: declaration of element 'heaterImg'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'heaterImg'
      .setProperty("ImageUrl","./assets/heater.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'heaterImg'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"heaterTxt", _view.heater) // EJsS HtmlView.HtmlView Page: declaration of element 'heaterTxt'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'heaterTxt'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'heaterTxt'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'heaterTxt'
      .setProperty("Text","Heater") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'heaterTxt'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"dataPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'dataPanel'
      .setProperty("Height","80vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'dataPanel'
      .setProperty("Background","#aaa") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'dataPanel'
      .setProperty("Html","<table class=\"dataTable\">     <tr>       <th class=\"splitCell\">         <div><span class=\"bottom\">Plant</span>           <span class=\"top\">Amt (mL)</span>         </div>       </th>       <!--<th>Plant/Transpiration Rate (mL)</th>-->       <th>no appliance</th>       <th>with heater</th>       <th>with fan</th>       <th>with lamp</th>     </tr>     <tr id=\"table_plant1\">       <th>English Ivy</th>       <td id=\"plant1_appliance0\"></td>       <td id=\"plant1_appliance1\"></td>       <td id=\"plant1_appliance2\"></td>       <td id=\"plant1_appliance3\"></td>     </tr>     <tr id=\"table_plant2\">       <th>Weeping Fig</th>       <td id=\"plant2_appliance0\"></td>       <td id=\"plant2_appliance1\"></td>       <td id=\"plant2_appliance2\"></td>       <td id=\"plant2_appliance3\"></td>     </tr>     <tr id=\"table_plant3\">       <th>Dieffenbachia</th>       <td id=\"plant3_appliance0\"></td>       <td id=\"plant3_appliance1\"></td>       <td id=\"plant3_appliance2\"></td>       <td id=\"plant3_appliance3\"></td>     </tr>     <tr id=\"table_plant4\">       <th>Devil's Ivy</th>       <td id=\"plant4_appliance0\"></td>       <td id=\"plant4_appliance1\"></td>       <td id=\"plant4_appliance2\"></td>       <td id=\"plant4_appliance3\"></td>     </tr>     <tr id=\"table_plant5\">       <th>Arrowhead</th>       <td id=\"plant5_appliance0\"></td>       <td id=\"plant5_appliance1\"></td>       <td id=\"plant5_appliance2\"></td>       <td id=\"plant5_appliance3\"></td>     </tr>     <tr id=\"table_plant6\">       <th>Coleus</th>       <td id=\"plant6_appliance0\"></td>       <td id=\"plant6_appliance1\"></td>       <td id=\"plant6_appliance2\"></td>       <td id=\"plant6_appliance3\"></td>     </tr>     <tr id=\"table_plant7\">       <th>Geranium</th>       <td id=\"plant7_appliance0\"></td>       <td id=\"plant7_appliance1\"></td>       <td id=\"plant7_appliance2\"></td>       <td id=\"plant7_appliance3\"></td>     </tr>     <tr id=\"table_plant8\">       <th>Rubber Plant</th>       <td id=\"plant8_appliance0\"></td>       <td id=\"plant8_appliance1\"></td>       <td id=\"plant8_appliance2\"></td>       <td id=\"plant8_appliance3\"></td>     </tr>     <tr id=\"table_plant9\">       <th>Zebra Plant</th>       <td id=\"plant9_appliance0\"></td>       <td id=\"plant9_appliance1\"></td>       <td id=\"plant9_appliance2\"></td>       <td id=\"plant9_appliance3\"></td>     </tr> </table> <style>   .dataTable {     width: 100%;     height: 100%;     border: 2px solid #555;   }   .dataTable tr {       background: #eee;   }   .dataTable tr th {       background: #ddd;   }   .dataTable tr td, .dataTable tr th {       width: 20%;       padding: 0.5em;   }   .splitCell {     height: 3em;   }   /*.splitCell {     background: linear-gradient(to right top, #ffffff 0%,#ffffff 49.9%,#000000 50%,#000000 51%,#ffffff 51.1%,#ffffff 100%);   }*/ .splitCell>div {   position: relative;   height: 100%;   width: 100%;   top: 0;   left: 0; } .bottom {   position: absolute;   bottom: 1px;   left: 1px; } .top {   position: absolute;   top: 1px;   right: 1px; } </style>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'dataPanel'
      ;

    _view._addElement(EJSS_INTERFACE.tabbedPanel,"tabbedPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'tabbedPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'tabbedPanel'
      .setProperty("BorderStyle","solid") // EJsS HtmlView.HtmlView Page: setting property 'BorderStyle' for element 'tabbedPanel'
      .setProperty("BoxShadow","2px 2px 0.25em #333") // EJsS HtmlView.HtmlView Page: setting property 'BoxShadow' for element 'tabbedPanel'
      .setProperty("BorderColor","#555") // EJsS HtmlView.HtmlView Page: setting property 'BorderColor' for element 'tabbedPanel'
      .setProperty("BorderWidth","1px") // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'tabbedPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'tabbedPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"instructions", _view.tabbedPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'instructions'
      .setProperty("CSS",{ "text-align": "left", "padding":"1em", "padding-bottom": "2em"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'instructions'
      .setProperty("Html","<h2>Factors Affecting Transpiration Rate in Plants</h2> <h3>Purpose</h3> In this investigation you will compare the rates of transpiration for several different species of plants under varying environmental conditions. You will investigate the effect of environmental factors (heat, light and wind) on the transpiration rate.<br/><br/> <h3>Objectives</h3> <ul>   <li>Describe the process of transpiration in vascular plants</li>   <li>Investigate the effect of various environmental factors on the transpiration rate in plants</li> </ul> <h3>Procedure</h3> Click on the \"Experiment Info\" tab to read more about this experiment.<br/><br/> Use the dropdown to select a plant and an appliance.<br/><br/> Click \"Run\" to simulate the experiment. The reading on the meter shows the amount of water transpired by the plant after 1 hour. Each reading will be automatically populated in the data table.  <br/>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'instructions'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"info", _view.tabbedPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'info'
      .setProperty("CSS",{ "text-align": "left", "padding":"1em", "padding-bottom": "2em"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'info'
      .setProperty("Html","<h2>What factors affect the transpiration rate in plants?</h2> In vascular plants, water is absorbed through the roots and carried upward through the stem to the leaves. The force behind this upward movement is called capillary action, a force of attraction between molecules that causes liquids to move up narrow tubes, such as those inside a plant's stem.<br/><br/> Some of the water absorbed by a plant's roots is used for photosynthesis, but much is lost to the environment through a process called transpiration. During photosynthesis, tiny pores on the surface of the leaves, called stomata, open to permit the intake of carbon dioxide and the release of oxygen. Because the stomata must remain open for the exchange of gases, large amounts of water are lost to the environment through evaporation.<br/><br/> Water that evaporates from the leaves is continually replaced with water that is absorbed through the roots. Therefore a plant's rate of transpiration can be measured by observing the amount of water taken up through a plant's roots over a period of time. The transpiration rate can be approximated by measuring the amount of water taken up in a short time through the plant's stem.<br/><br/> In a laboratory, a plant's transpiration rate can be measured using a potometer. A potometer can be assembled from standard laboratory materials including: a ring stand, clamps, a 10mL pipette, a 100mL burette, a T-tube, glass tubing, and rubber tubing. <br/><br/> To measure transpiration rate, a plant sprig is mounted on the potometer and the burette and pipette are filled with water. Over time the plant will transpire and absorb water through its stem. The potometer is constructed in such a way that the plant's water source is the pipette, therefore the amount of water transpired over time can be determined by reading the water level in the pipette after time has passed. The water supply in the pipette can be replenished from the water supply in the burette by releasing the pinch clamp. <br/>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'info'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"questions", _view.tabbedPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'questions'
      .setProperty("CSS",{ "text-align": "left", "padding":"1em", "padding-bottom": "2em"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'questions'
      .setProperty("Html","<style>   /* Hide answers by default */   .answer {     display: none;   } </style> <ol>   <li>Describe the process of transpiration in vascular plants.</li>   <li>Describe any experimental controls used in the Investigation.</li>   <li>What environmental factors that you tested increased the rate of transpiration? Was the rate of transpiration increased for all plants tested?</li>   <!-- Suggested Answer to Question 3 -->     <div class=\"answer\">       <p><b>Suggested Answer:</b> Several factors could contribute to the observed phenomenon where the transpiration rate appears to be lower for some plants under a lamp, despite the expectation that transpiration generally increases with more light. Here are some potential explanations:</p>       <p>Intensity and Quality of Light:</p>       <p>The type of light (e.g., intensity and spectrum) emitted by the lamp may not be suitable for promoting optimal photosynthesis and transpiration in certain plants. Plants have specific light requirements, and if the lamp does not provide the right intensity or spectrum, it could affect their physiological processes.</p>     </div>   <li>Did any of the environmental factors (heat, light, or wind) increase the transpiration rate more than the others? Why?</li>   <li>Which species of plants that you tested had the highest transpiration rates? Why do you think different species of plants transpire at different rates?</li>   <li>Suppose you coated the leaves of a plant with petroleum jelly. How would the plant's rate of transpiration be affected?</li>   <li>Of what value to a plant is the ability to lose water through transpiration?</li> </ol> <!-- Button to reveal answers --> <button onclick=\"revealAnswers()\">Reveal Answers</button>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'questions'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"credits", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'credits'
      .setProperty("Html","<h2>Image Credits</h2><ul> <li>Heater: <a href=\"https://commons.wikimedia.org/wiki/File:Heating-Radiator.svg\" target=\"_blank\">Inkwina</a>, CC BY-SA 4.0, via Wikimedia Commons</li> <li>Potometer: <a href=\"https://commons.wikimedia.org/wiki/File:Potometer.png\" target=\"_blank\">User Theresa knott</a>, CC BY-SA 3.0, via Wikimedia Commons</li> <li>Fan: <a href=\"https://commons.wikimedia.org/wiki/File:Fan_(Electric)_(PSF).png\" target=\"_blank\">Pearson Scott Foresman</a>, Public domain, via Wikimedia Commons</li> <li>English Ivy: <a href=\"https://www.invasive.org/browse/detail.cfm?imgnum=2307146\" target=\"_blank\">James H. Miller</a>, USDA Forest Service, Bugwood.org</li> <li>Weeping Fig: <a href=\"https://commons.wikimedia.org/wiki/File:Ficus_benjamina_(Weeping_Fig)_in_Hyderabad_W_IMG_8308.jpg\" target=\"_blank\">J.M.Garg</a>, CC BY 3.0, via Wikimedia Commons</li> <li>Dieffenbachia: <a href=\"https://commons.wikimedia.org/wiki/File:Dieffenbachia_seguine_kz04.jpg\" target=\"_blank\">Krzysztof Ziarnek, Kenraiz</a>, CC BY-SA 4.0, via Wikimedia Commons</li> <li>Devil's Ivy: <a href=\"https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_vine.jpg\" target=\"_blank\">ZooFari</a>, CC BY-SA 3.0, via Wikimedia Commons</li> <li>Arrowhead: <a href=\"https://commons.wikimedia.org/wiki/File:Syngonium_podophyllum_01.jpg\" target=\"_blank\">Digigalos</a>, CC BY-SA 3.0, via Wikimedia Commons</li> <li>Coleus: <a href=\"https://commons.wikimedia.org/wiki/File:Coleus-1.jpg\" target=\"_blank\">Aftabbanoori</a>, CC BY-SA 3.0, via Wikimedia Commons</li> <li>Geranium: <a href=\"https://commons.wikimedia.org/wiki/File:Geranium_February_2008-3.jpg\" target=\"_blank\">Alvesgaspar</a>, CC BY-SA 3.0, via Wikimedia Commons</li> <li>Rubber Plant: <a href=\"https://commons.wikimedia.org/wiki/File:Rubber_Plant_(Ficus_elastica)_1.jpg\" target=\"_blank\">Mokkie</a>, CC BY-SA 4.0, via Wikimedia Commons</li> <li>Zebra Plant: <a href=\"https://commons.wikimedia.org/wiki/File:Aphelandra_squarrosa_Zebra_Plant_%E1%83%90%E1%83%A4%E1%83%94%E1%83%9A%E1%83%90%E1%83%9C%E1%83%93%E1%83%A0%E1%83%90.jpg\" target=\"_blank\">Lazaregagnidze</a>, CC BY-SA 4.0, via Wikimedia Commons</li> </ul> <h2>Idea based on a swf file</h2> <a href=\"http://glencoe.mheducation.com/sites/dl/free/0078802849/383946/BL_10.html\" target=\"_blank\">here</a>  <h2>Others</h2> <ul>   <li><a href=\"https://iwant2study.org/ospsg/index.php/interactive-resources/biology/1182-transpiration-sec\" target=\"_blank\">Need a 3 hour version?</a></li>   <li><a href=\"https://iwant2study.org/ospsg/index.php/interactive-resources/biology/1061-transpiration\" target=\"_blank\">Need a 1 hour version?</a></li> </ul>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'credits'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new transpiration("_topFrame","_ejs_library/",null);
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
