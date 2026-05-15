/* _inputParameters: an object with different values for the model parameters */
function Blending_Segmenting_Board_Teacher_Version_Selector(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var canvasWidth; // EjsS Model.Variables.Var Table 1.canvasWidth
  var canvasHeight; // EjsS Model.Variables.Var Table 1.canvasHeight
  var vowelX; // EjsS Model.Variables.Var Table 1.vowelX
  var vowelY; // EjsS Model.Variables.Var Table 1.vowelY
  var consonantX; // EjsS Model.Variables.Var Table 1.consonantX
  var consonantY; // EjsS Model.Variables.Var Table 1.consonantY
  var vowels; // EjsS Model.Variables.Var Table 1.vowels
  var consonants; // EjsS Model.Variables.Var Table 1.consonants
  var margin; // EjsS Model.Variables.Var Table 1.margin
  var tileWidth; // EjsS Model.Variables.Var Table 1.tileWidth
  var tileHeight; // EjsS Model.Variables.Var Table 1.tileHeight
  var numVowels; // EjsS Model.Variables.Var Table 1.numVowels
  var numConsonants; // EjsS Model.Variables.Var Table 1.numConsonants
  var vowelRows; // EjsS Model.Variables.Var Table 1.vowelRows
  var vowelColumns; // EjsS Model.Variables.Var Table 1.vowelColumns
  var vowelStartX; // EjsS Model.Variables.Var Table 1.vowelStartX
  var vowelStartY; // EjsS Model.Variables.Var Table 1.vowelStartY
  var consonantRows; // EjsS Model.Variables.Var Table 1.consonantRows
  var consonantColumns; // EjsS Model.Variables.Var Table 1.consonantColumns
  var consonantStartX; // EjsS Model.Variables.Var Table 1.consonantStartX
  var consonantStartY; // EjsS Model.Variables.Var Table 1.consonantStartY

  var vowelsText; // EjsS Model.Variables.Var Table 2.vowelsText
  var consonantsText; // EjsS Model.Variables.Var Table 2.consonantsText
  var vowelsTextColor; // EjsS Model.Variables.Var Table 2.vowelsTextColor
  var consonantsTextColor; // EjsS Model.Variables.Var Table 2.consonantsTextColor
  var vowelsBgColor; // EjsS Model.Variables.Var Table 2.vowelsBgColor
  var consonantsBgColor; // EjsS Model.Variables.Var Table 2.consonantsBgColor
  var vowelInteracted; // EjsS Model.Variables.Var Table 2.vowelInteracted
  var consonantInteracted; // EjsS Model.Variables.Var Table 2.consonantInteracted
  var placementBoxX; // EjsS Model.Variables.Var Table 2.placementBoxX
  var placementBoxY; // EjsS Model.Variables.Var Table 2.placementBoxY
  var placementBoxWidth; // EjsS Model.Variables.Var Table 2.placementBoxWidth
  var placementBoxHeight; // EjsS Model.Variables.Var Table 2.placementBoxHeight
  var numPlacementBoxes; // EjsS Model.Variables.Var Table 2.numPlacementBoxes
  var selectedTileIndex; // EjsS Model.Variables.Var Table 2.selectedTileIndex
  var selectedTileType; // EjsS Model.Variables.Var Table 2.selectedTileType
  var placementCardBgColor; // EjsS Model.Variables.Var Table 2.placementCardBgColor
  var placementCardTextColor; // EjsS Model.Variables.Var Table 2.placementCardTextColor
  var placementCardText; // EjsS Model.Variables.Var Table 2.placementCardText
  var placementCardInteracted; // EjsS Model.Variables.Var Table 2.placementCardInteracted
  var restartX; // EjsS Model.Variables.Var Table 2.restartX
  var restartY; // EjsS Model.Variables.Var Table 2.restartY
  var placementCards; // EjsS Model.Variables.Var Table 2.placementCards

  var vowelsBordered; // EjsS Model.Variables.Var Table 3.vowelsBordered
  var consonantsBordered; // EjsS Model.Variables.Var Table 3.consonantsBordered
  var previousSelectedTileIndex; // EjsS Model.Variables.Var Table 3.previousSelectedTileIndex
  var previousSelectedTileType; // EjsS Model.Variables.Var Table 3.previousSelectedTileType
  var wordsReadPanelX; // EjsS Model.Variables.Var Table 3.wordsReadPanelX
  var wordsReadPanelYStart; // EjsS Model.Variables.Var Table 3.wordsReadPanelYStart
  var wordsReadPanelYStep; // EjsS Model.Variables.Var Table 3.wordsReadPanelYStep
  var blendBtnX; // EjsS Model.Variables.Var Table 3.blendBtnX
  var blendBtnY; // EjsS Model.Variables.Var Table 3.blendBtnY
  var wordsReadSet1Y; // EjsS Model.Variables.Var Table 3.wordsReadSet1Y
  var wordsReadSet2Y; // EjsS Model.Variables.Var Table 3.wordsReadSet2Y
  var wordsReadSet1X; // EjsS Model.Variables.Var Table 3.wordsReadSet1X
  var wordsReadSet2X; // EjsS Model.Variables.Var Table 3.wordsReadSet2X
  var wordsReadSetStartY; // EjsS Model.Variables.Var Table 3.wordsReadSetStartY
  var numOfWordsReadByColumn; // EjsS Model.Variables.Var Table 3.numOfWordsReadByColumn

  var wordsReadSet1Text; // EjsS Model.Variables.Var Table 5.wordsReadSet1Text
  var wordsReadSet2Text; // EjsS Model.Variables.Var Table 5.wordsReadSet2Text
  var wordsReadSet1Info; // EjsS Model.Variables.Var Table 5.wordsReadSet1Info
  var wordsReadSet2Info; // EjsS Model.Variables.Var Table 5.wordsReadSet2Info
  var wordsReadSet1Interacted; // EjsS Model.Variables.Var Table 5.wordsReadSet1Interacted
  var wordsReadSet2Interacted; // EjsS Model.Variables.Var Table 5.wordsReadSet2Interacted

  var editing; // EjsS Model.Variables.lookang.editing
  var blendX; // EjsS Model.Variables.lookang.blendX
  var blendY; // EjsS Model.Variables.lookang.blendY
  var fontSize; // EjsS Model.Variables.lookang.fontSize
  var font; // EjsS Model.Variables.lookang.font
  var fontSmall; // EjsS Model.Variables.lookang.fontSmall
  var t; // EjsS Model.Variables.lookang.t
  var dt; // EjsS Model.Variables.lookang.dt
  var blendvX; // EjsS Model.Variables.lookang.blendvX
  var lastCardIndex; // EjsS Model.Variables.lookang.lastCardIndex

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
      canvasWidth : canvasWidth,
      canvasHeight : canvasHeight,
      vowelX : vowelX,
      vowelY : vowelY,
      consonantX : consonantX,
      consonantY : consonantY,
      vowels : vowels,
      consonants : consonants,
      margin : margin,
      tileWidth : tileWidth,
      tileHeight : tileHeight,
      numVowels : numVowels,
      numConsonants : numConsonants,
      vowelRows : vowelRows,
      vowelColumns : vowelColumns,
      vowelStartX : vowelStartX,
      vowelStartY : vowelStartY,
      consonantRows : consonantRows,
      consonantColumns : consonantColumns,
      consonantStartX : consonantStartX,
      consonantStartY : consonantStartY,
      vowelsText : vowelsText,
      consonantsText : consonantsText,
      vowelsTextColor : vowelsTextColor,
      consonantsTextColor : consonantsTextColor,
      vowelsBgColor : vowelsBgColor,
      consonantsBgColor : consonantsBgColor,
      vowelInteracted : vowelInteracted,
      consonantInteracted : consonantInteracted,
      placementBoxX : placementBoxX,
      placementBoxY : placementBoxY,
      placementBoxWidth : placementBoxWidth,
      placementBoxHeight : placementBoxHeight,
      numPlacementBoxes : numPlacementBoxes,
      selectedTileIndex : selectedTileIndex,
      selectedTileType : selectedTileType,
      placementCardBgColor : placementCardBgColor,
      placementCardTextColor : placementCardTextColor,
      placementCardText : placementCardText,
      placementCardInteracted : placementCardInteracted,
      restartX : restartX,
      restartY : restartY,
      placementCards : placementCards,
      vowelsBordered : vowelsBordered,
      consonantsBordered : consonantsBordered,
      previousSelectedTileIndex : previousSelectedTileIndex,
      previousSelectedTileType : previousSelectedTileType,
      wordsReadPanelX : wordsReadPanelX,
      wordsReadPanelYStart : wordsReadPanelYStart,
      wordsReadPanelYStep : wordsReadPanelYStep,
      blendBtnX : blendBtnX,
      blendBtnY : blendBtnY,
      wordsReadSet1Y : wordsReadSet1Y,
      wordsReadSet2Y : wordsReadSet2Y,
      wordsReadSet1X : wordsReadSet1X,
      wordsReadSet2X : wordsReadSet2X,
      wordsReadSetStartY : wordsReadSetStartY,
      numOfWordsReadByColumn : numOfWordsReadByColumn,
      wordsReadSet1Text : wordsReadSet1Text,
      wordsReadSet2Text : wordsReadSet2Text,
      wordsReadSet1Info : wordsReadSet1Info,
      wordsReadSet2Info : wordsReadSet2Info,
      wordsReadSet1Interacted : wordsReadSet1Interacted,
      wordsReadSet2Interacted : wordsReadSet2Interacted,
      editing : editing,
      blendX : blendX,
      blendY : blendY,
      fontSize : fontSize,
      font : font,
      fontSmall : fontSmall,
      t : t,
      dt : dt,
      blendvX : blendvX,
      lastCardIndex : lastCardIndex
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {

    };
  };

  _model._readParameters = function(json) {
    if(typeof json.canvasWidth != "undefined") canvasWidth = json.canvasWidth;
    if(typeof json.canvasHeight != "undefined") canvasHeight = json.canvasHeight;
    if(typeof json.vowelX != "undefined") vowelX = json.vowelX;
    if(typeof json.vowelY != "undefined") vowelY = json.vowelY;
    if(typeof json.consonantX != "undefined") consonantX = json.consonantX;
    if(typeof json.consonantY != "undefined") consonantY = json.consonantY;
    if(typeof json.vowels != "undefined") vowels = json.vowels;
    if(typeof json.consonants != "undefined") consonants = json.consonants;
    if(typeof json.margin != "undefined") margin = json.margin;
    if(typeof json.tileWidth != "undefined") tileWidth = json.tileWidth;
    if(typeof json.tileHeight != "undefined") tileHeight = json.tileHeight;
    if(typeof json.numVowels != "undefined") numVowels = json.numVowels;
    if(typeof json.numConsonants != "undefined") numConsonants = json.numConsonants;
    if(typeof json.vowelRows != "undefined") vowelRows = json.vowelRows;
    if(typeof json.vowelColumns != "undefined") vowelColumns = json.vowelColumns;
    if(typeof json.vowelStartX != "undefined") vowelStartX = json.vowelStartX;
    if(typeof json.vowelStartY != "undefined") vowelStartY = json.vowelStartY;
    if(typeof json.consonantRows != "undefined") consonantRows = json.consonantRows;
    if(typeof json.consonantColumns != "undefined") consonantColumns = json.consonantColumns;
    if(typeof json.consonantStartX != "undefined") consonantStartX = json.consonantStartX;
    if(typeof json.consonantStartY != "undefined") consonantStartY = json.consonantStartY;
    if(typeof json.vowelsText != "undefined") vowelsText = json.vowelsText;
    if(typeof json.consonantsText != "undefined") consonantsText = json.consonantsText;
    if(typeof json.vowelsTextColor != "undefined") vowelsTextColor = json.vowelsTextColor;
    if(typeof json.consonantsTextColor != "undefined") consonantsTextColor = json.consonantsTextColor;
    if(typeof json.vowelsBgColor != "undefined") vowelsBgColor = json.vowelsBgColor;
    if(typeof json.consonantsBgColor != "undefined") consonantsBgColor = json.consonantsBgColor;
    if(typeof json.vowelInteracted != "undefined") vowelInteracted = json.vowelInteracted;
    if(typeof json.consonantInteracted != "undefined") consonantInteracted = json.consonantInteracted;
    if(typeof json.placementBoxX != "undefined") placementBoxX = json.placementBoxX;
    if(typeof json.placementBoxY != "undefined") placementBoxY = json.placementBoxY;
    if(typeof json.placementBoxWidth != "undefined") placementBoxWidth = json.placementBoxWidth;
    if(typeof json.placementBoxHeight != "undefined") placementBoxHeight = json.placementBoxHeight;
    if(typeof json.numPlacementBoxes != "undefined") numPlacementBoxes = json.numPlacementBoxes;
    if(typeof json.selectedTileIndex != "undefined") selectedTileIndex = json.selectedTileIndex;
    if(typeof json.selectedTileType != "undefined") selectedTileType = json.selectedTileType;
    if(typeof json.placementCardBgColor != "undefined") placementCardBgColor = json.placementCardBgColor;
    if(typeof json.placementCardTextColor != "undefined") placementCardTextColor = json.placementCardTextColor;
    if(typeof json.placementCardText != "undefined") placementCardText = json.placementCardText;
    if(typeof json.placementCardInteracted != "undefined") placementCardInteracted = json.placementCardInteracted;
    if(typeof json.restartX != "undefined") restartX = json.restartX;
    if(typeof json.restartY != "undefined") restartY = json.restartY;
    if(typeof json.placementCards != "undefined") placementCards = json.placementCards;
    if(typeof json.vowelsBordered != "undefined") vowelsBordered = json.vowelsBordered;
    if(typeof json.consonantsBordered != "undefined") consonantsBordered = json.consonantsBordered;
    if(typeof json.previousSelectedTileIndex != "undefined") previousSelectedTileIndex = json.previousSelectedTileIndex;
    if(typeof json.previousSelectedTileType != "undefined") previousSelectedTileType = json.previousSelectedTileType;
    if(typeof json.wordsReadPanelX != "undefined") wordsReadPanelX = json.wordsReadPanelX;
    if(typeof json.wordsReadPanelYStart != "undefined") wordsReadPanelYStart = json.wordsReadPanelYStart;
    if(typeof json.wordsReadPanelYStep != "undefined") wordsReadPanelYStep = json.wordsReadPanelYStep;
    if(typeof json.blendBtnX != "undefined") blendBtnX = json.blendBtnX;
    if(typeof json.blendBtnY != "undefined") blendBtnY = json.blendBtnY;
    if(typeof json.wordsReadSet1Y != "undefined") wordsReadSet1Y = json.wordsReadSet1Y;
    if(typeof json.wordsReadSet2Y != "undefined") wordsReadSet2Y = json.wordsReadSet2Y;
    if(typeof json.wordsReadSet1X != "undefined") wordsReadSet1X = json.wordsReadSet1X;
    if(typeof json.wordsReadSet2X != "undefined") wordsReadSet2X = json.wordsReadSet2X;
    if(typeof json.wordsReadSetStartY != "undefined") wordsReadSetStartY = json.wordsReadSetStartY;
    if(typeof json.numOfWordsReadByColumn != "undefined") numOfWordsReadByColumn = json.numOfWordsReadByColumn;
    if(typeof json.wordsReadSet1Text != "undefined") wordsReadSet1Text = json.wordsReadSet1Text;
    if(typeof json.wordsReadSet2Text != "undefined") wordsReadSet2Text = json.wordsReadSet2Text;
    if(typeof json.wordsReadSet1Info != "undefined") wordsReadSet1Info = json.wordsReadSet1Info;
    if(typeof json.wordsReadSet2Info != "undefined") wordsReadSet2Info = json.wordsReadSet2Info;
    if(typeof json.wordsReadSet1Interacted != "undefined") wordsReadSet1Interacted = json.wordsReadSet1Interacted;
    if(typeof json.wordsReadSet2Interacted != "undefined") wordsReadSet2Interacted = json.wordsReadSet2Interacted;
    if(typeof json.editing != "undefined") editing = json.editing;
    if(typeof json.blendX != "undefined") blendX = json.blendX;
    if(typeof json.blendY != "undefined") blendY = json.blendY;
    if(typeof json.fontSize != "undefined") fontSize = json.fontSize;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.fontSmall != "undefined") fontSmall = json.fontSmall;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.blendvX != "undefined") blendvX = json.blendvX;
    if(typeof json.lastCardIndex != "undefined") lastCardIndex = json.lastCardIndex;
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
    __pagesEnabled["varInit"] = true;
    __pagesEnabled["positioning"] = true;
    __pagesEnabled["font"] = true;
    __pagesEnabled["fontTL"] = true;
    __pagesEnabled["import_lookang"] = true;
    __pagesEnabled["Evol Page 1"] = true;
    __pagesEnabled["Event 1"] = true;
  });

  _model.addToReset(function() {
    canvasWidth = "100%"; // EjsS Model.Variables.Var Table 1.canvasWidth
    canvasHeight = "90vh"; // EjsS Model.Variables.Var Table 1.canvasHeight
    vowelX = []; // EjsS Model.Variables.Var Table 1.vowelX
    vowelY = []; // EjsS Model.Variables.Var Table 1.vowelY
    consonantX = []; // EjsS Model.Variables.Var Table 1.consonantX
    consonantY = []; // EjsS Model.Variables.Var Table 1.consonantY
    margin = 0.005; // EjsS Model.Variables.Var Table 1.margin
    tileWidth = 0.2; // EjsS Model.Variables.Var Table 1.tileWidth
    tileHeight = 0.15; // EjsS Model.Variables.Var Table 1.tileHeight
    numVowels = 0; // EjsS Model.Variables.Var Table 1.numVowels
    numConsonants = 0; // EjsS Model.Variables.Var Table 1.numConsonants
    vowelRows = 3; // EjsS Model.Variables.Var Table 1.vowelRows
    vowelColumns = 5; // EjsS Model.Variables.Var Table 1.vowelColumns
    vowelStartX = -0.9; // EjsS Model.Variables.Var Table 1.vowelStartX
    vowelStartY = 0.5; // EjsS Model.Variables.Var Table 1.vowelStartY
    consonantRows = 3; // EjsS Model.Variables.Var Table 1.consonantRows
    consonantColumns = 5; // EjsS Model.Variables.Var Table 1.consonantColumns
    consonantStartX = 0.0; // EjsS Model.Variables.Var Table 1.consonantStartX
    consonantStartY = 0.5; // EjsS Model.Variables.Var Table 1.consonantStartY
  });

  _model.addToReset(function() {
    vowelsText = []; // EjsS Model.Variables.Var Table 2.vowelsText
    consonantsText = []; // EjsS Model.Variables.Var Table 2.consonantsText
    vowelsTextColor = []; // EjsS Model.Variables.Var Table 2.vowelsTextColor
    consonantsTextColor = []; // EjsS Model.Variables.Var Table 2.consonantsTextColor
    vowelsBgColor = []; // EjsS Model.Variables.Var Table 2.vowelsBgColor
    consonantsBgColor = []; // EjsS Model.Variables.Var Table 2.consonantsBgColor
    vowelInteracted = -1; // EjsS Model.Variables.Var Table 2.vowelInteracted
    consonantInteracted = -1; // EjsS Model.Variables.Var Table 2.consonantInteracted
    placementBoxX = []; // EjsS Model.Variables.Var Table 2.placementBoxX
    placementBoxY = 0.8; // EjsS Model.Variables.Var Table 2.placementBoxY
    placementBoxWidth = 0.2; // EjsS Model.Variables.Var Table 2.placementBoxWidth
    placementBoxHeight = 0.2; // EjsS Model.Variables.Var Table 2.placementBoxHeight
    numPlacementBoxes = 6; // EjsS Model.Variables.Var Table 2.numPlacementBoxes
    placementCardBgColor = ["white","white","white","white","white","white"]; // EjsS Model.Variables.Var Table 2.placementCardBgColor
    placementCardTextColor = ["white","white","white","white","white","white"]; // EjsS Model.Variables.Var Table 2.placementCardTextColor
    placementCardText = ["","","","","",""]; // EjsS Model.Variables.Var Table 2.placementCardText
    placementCardInteracted = -1; // EjsS Model.Variables.Var Table 2.placementCardInteracted
    restartX = 0; // EjsS Model.Variables.Var Table 2.restartX
    restartY = 0.8; // EjsS Model.Variables.Var Table 2.restartY
    placementCards = []; // EjsS Model.Variables.Var Table 2.placementCards
  });

  _model.addToReset(function() {
    vowelsBordered = []; // EjsS Model.Variables.Var Table 3.vowelsBordered
    consonantsBordered = []; // EjsS Model.Variables.Var Table 3.consonantsBordered
    wordsReadPanelX = 0.7; // EjsS Model.Variables.Var Table 3.wordsReadPanelX
    wordsReadPanelYStart = 0.8; // EjsS Model.Variables.Var Table 3.wordsReadPanelYStart
    wordsReadPanelYStep = 0.1; // EjsS Model.Variables.Var Table 3.wordsReadPanelYStep
    blendBtnY = placementBoxY; // EjsS Model.Variables.Var Table 3.blendBtnY
    wordsReadSet1Y = []; // EjsS Model.Variables.Var Table 3.wordsReadSet1Y
    wordsReadSet2Y = []; // EjsS Model.Variables.Var Table 3.wordsReadSet2Y
    wordsReadSet1X = 0.7; // EjsS Model.Variables.Var Table 3.wordsReadSet1X
    wordsReadSet2X = 0.91; // EjsS Model.Variables.Var Table 3.wordsReadSet2X
    wordsReadSetStartY = 0.43; // EjsS Model.Variables.Var Table 3.wordsReadSetStartY
    numOfWordsReadByColumn = 15; // EjsS Model.Variables.Var Table 3.numOfWordsReadByColumn
  });

  _model.addToReset(function() {
    wordsReadSet1Text = ["","","","","","","","","","","","","","",""]; // EjsS Model.Variables.Var Table 5.wordsReadSet1Text
    wordsReadSet2Text = ["","","","","","","","","","","","","","",""]; // EjsS Model.Variables.Var Table 5.wordsReadSet2Text
    wordsReadSet1Info = []; // EjsS Model.Variables.Var Table 5.wordsReadSet1Info
    wordsReadSet2Info = []; // EjsS Model.Variables.Var Table 5.wordsReadSet2Info
    wordsReadSet1Interacted = -1; // EjsS Model.Variables.Var Table 5.wordsReadSet1Interacted
    wordsReadSet2Interacted = -1; // EjsS Model.Variables.Var Table 5.wordsReadSet2Interacted
  });

  _model.addToReset(function() {
    editing = true; // EjsS Model.Variables.lookang.editing
    blendX = -0.5; // EjsS Model.Variables.lookang.blendX
    blendY = 0.65; // EjsS Model.Variables.lookang.blendY
    fontSize = 12; // EjsS Model.Variables.lookang.fontSize
    font = font = "normal normal " + fontSize + "px";; // EjsS Model.Variables.lookang.font
    fontSmall = font = "normal normal " + fontSize/2 + "px";; // EjsS Model.Variables.lookang.fontSmall
    t = 0; // EjsS Model.Variables.lookang.t
    dt = 0.05; // EjsS Model.Variables.lookang.dt
    blendvX = 1; // EjsS Model.Variables.lookang.blendvX
    lastCardIndex = -1; // EjsS Model.Variables.lookang.lastCardIndex
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

  // Function to handle vowel clicks  // > CustomCode.onVowelClick:1
  function onVowelClick(index) {  // > CustomCode.onVowelClick:2
      // if (previousSelectedTileIndex !== null && previousSelectedTileType === "vowel") {  // > CustomCode.onVowelClick:3
      //     vowelsBordered[previousSelectedTileIndex] = 0;  // > CustomCode.onVowelClick:4
      // } else if (previousSelectedTileIndex !== null && previousSelectedTileType === "consonant") {  // > CustomCode.onVowelClick:5
      //     consonantsBordered[previousSelectedTileIndex] = 0;  // > CustomCode.onVowelClick:6
      // }  // > CustomCode.onVowelClick:7
        // > CustomCode.onVowelClick:8
      selectedTileIndex = index;  // > CustomCode.onVowelClick:9
      selectedTileType = "vowel";  // Mark this as a vowel selection  // > CustomCode.onVowelClick:10
      if (vowels[index].enabled) {  // > CustomCode.onVowelClick:11
          vowels[index].enabled = false;  // > CustomCode.onVowelClick:12
          vowelsBordered[index] = 0;  // > CustomCode.onVowelClick:13
      } else {  // > CustomCode.onVowelClick:14
          vowels[index].enabled = true;  // > CustomCode.onVowelClick:15
          vowelsBordered[index] = 1;  // > CustomCode.onVowelClick:16
      }  // > CustomCode.onVowelClick:17
        // > CustomCode.onVowelClick:18
        // > CustomCode.onVowelClick:19
      console.log(vowels);  // > CustomCode.onVowelClick:20
        // > CustomCode.onVowelClick:21
      previousSelectedTileIndex = index;  // > CustomCode.onVowelClick:22
      previousSelectedTileType = "vowel";  // > CustomCode.onVowelClick:23
  }  // > CustomCode.onVowelClick:24

  // Function to handle consonant clicks  // > CustomCode.onConsonantClick:1
  function onConsonantClick(index) {  // > CustomCode.onConsonantClick:2
      // if (previousSelectedTileIndex !== null && previousSelectedTileType === "vowel") {  // > CustomCode.onConsonantClick:3
      //     vowelsBordered[previousSelectedTileIndex] = 0;  // > CustomCode.onConsonantClick:4
      // } else if (previousSelectedTileIndex !== null && previousSelectedTileType === "consonant") {  // > CustomCode.onConsonantClick:5
      //     consonantsBordered[previousSelectedTileIndex] = 0;  // > CustomCode.onConsonantClick:6
      // }  // > CustomCode.onConsonantClick:7
        // > CustomCode.onConsonantClick:8
      selectedTileIndex = index;  // > CustomCode.onConsonantClick:9
      selectedTileType = "consonant";  // Mark this as a vowel selection  // > CustomCode.onConsonantClick:10
      if (consonants[index].enabled) {  // > CustomCode.onConsonantClick:11
          consonants[index].enabled = false;  // > CustomCode.onConsonantClick:12
          consonantsBordered[index] = 0;  // > CustomCode.onConsonantClick:13
      } else {  // > CustomCode.onConsonantClick:14
          consonants[index].enabled = true;  // > CustomCode.onConsonantClick:15
          consonantsBordered[index] = 1;  // > CustomCode.onConsonantClick:16
      }  // > CustomCode.onConsonantClick:17
        // > CustomCode.onConsonantClick:18
      console.log(consonants);  // > CustomCode.onConsonantClick:19
        // > CustomCode.onConsonantClick:20
      previousSelectedTileIndex = index;  // > CustomCode.onConsonantClick:21
      previousSelectedTileType = "consonant";  // > CustomCode.onConsonantClick:22
  }  // > CustomCode.onConsonantClick:23

  // onDownloadClick  // > CustomCode.onDownloadClick:1
  function onDownloadClick() {  // > CustomCode.onDownloadClick:2
      console.log("vowels", vowels);  // > CustomCode.onDownloadClick:3
      console.log("consonants", consonants);  // > CustomCode.onDownloadClick:4
        // > CustomCode.onDownloadClick:5
      exportData({  // > CustomCode.onDownloadClick:6
          "vowels": vowels,  // > CustomCode.onDownloadClick:7
          "consonants": consonants  // > CustomCode.onDownloadClick:8
      })  // > CustomCode.onDownloadClick:9
  }  // > CustomCode.onDownloadClick:10
  async function exportData(exportObject, filename="export.zip") {  // > CustomCode.onDownloadClick:11
    // Get the zipped export template  // > CustomCode.onDownloadClick:12
     const exportTemplatePath = "export-template.zip";  // > CustomCode.onDownloadClick:13
   // const exportTemplatePath = "https://webejs.iwant2study.org:8000/static/sessions/eb8a0ede-53a6-4eb0-ad53-455beb0fa62b/source/export-template.zip";  // > CustomCode.onDownloadClick:14
    const graphFileName = "records.json";  // > CustomCode.onDownloadClick:15
    let exportZip;  // > CustomCode.onDownloadClick:16
    exportZip = await getZipFromPath(exportTemplatePath);  // > CustomCode.onDownloadClick:17
    exportZip.file(graphFileName, JSON.stringify(exportObject));  // > CustomCode.onDownloadClick:18
    exportZip.generateAsync({type: "blob"}).then(blob => saveAs(blob, filename));  // > CustomCode.onDownloadClick:19
  }  // > CustomCode.onDownloadClick:20
  function onGraphExportComplete() {  // > CustomCode.onDownloadClick:21
    alert("Export complete");  // > CustomCode.onDownloadClick:22
  }  // > CustomCode.onDownloadClick:23
  async function getZipFromPath(path) {  // > CustomCode.onDownloadClick:24
    return await JSZip.loadAsync(await (await fetch(path)).blob());  // > CustomCode.onDownloadClick:25
  }  // > CustomCode.onDownloadClick:26
  // function saveBlob(blob, filename) {  // > CustomCode.onDownloadClick:27
  //   var elem = window.document.createElement("a");  // > CustomCode.onDownloadClick:28
  //   var objectUrl = window.URL.createObjectURL(blob);  // > CustomCode.onDownloadClick:29
  //   elem.href = objectUrl;  // > CustomCode.onDownloadClick:30
  //   elem.download = filename;  // > CustomCode.onDownloadClick:31
  //   elem.click();  // > CustomCode.onDownloadClick:32
      // > CustomCode.onDownloadClick:33
  //   // Cleanup allocated objects to avoid memory leaks  // > CustomCode.onDownloadClick:34
  //   // These objects do not get GCed  // > CustomCode.onDownloadClick:35
  //   setTimeout(function(elem, objectUrl) {  // > CustomCode.onDownloadClick:36
  //     elem.remove();  // > CustomCode.onDownloadClick:37
  //     window.URL.revokeObjectURL(objectUrl);  // > CustomCode.onDownloadClick:38
  //   }, 1_000, elem, objectUrl);  // > CustomCode.onDownloadClick:39
  // }  // > CustomCode.onDownloadClick:40

  // onSelectAllClick  // > CustomCode.onSelectAllClick:1
  function onSelectAllClick() {  // > CustomCode.onSelectAllClick:2
      for (let i = 0; i < vowels.length; i++) {  // > CustomCode.onSelectAllClick:3
          vowels[i].enabled = true;  // > CustomCode.onSelectAllClick:4
          vowelsBordered[i] = 1;  // > CustomCode.onSelectAllClick:5
      }  // > CustomCode.onSelectAllClick:6
        // > CustomCode.onSelectAllClick:7
      for (let i = 0; i < consonants.length; i++) {  // > CustomCode.onSelectAllClick:8
          consonants[i].enabled = true;  // > CustomCode.onSelectAllClick:9
          consonantsBordered[i] = 1;  // > CustomCode.onSelectAllClick:10
      }  // > CustomCode.onSelectAllClick:11
  }  // > CustomCode.onSelectAllClick:12

  // onUnselectAllClick  // > CustomCode.onUnselectAllClick:1
  function onUnselectAllClick() {  // > CustomCode.onUnselectAllClick:2
      for (let i = 0; i < vowels.length; i++) {  // > CustomCode.onUnselectAllClick:3
          vowels[i].enabled = false;  // > CustomCode.onUnselectAllClick:4
          vowelsBordered[i] = 0;  // > CustomCode.onUnselectAllClick:5
      }  // > CustomCode.onUnselectAllClick:6
        // > CustomCode.onUnselectAllClick:7
      for (let i = 0; i < consonants.length; i++) {  // > CustomCode.onUnselectAllClick:8
          consonants[i].enabled = false;  // > CustomCode.onUnselectAllClick:9
          consonantsBordered[i] = 0;  // > CustomCode.onUnselectAllClick:10
      }  // > CustomCode.onUnselectAllClick:11
  }  // > CustomCode.onUnselectAllClick:12

  // responsiveFont  // > CustomCode.responsiveFont:1
  function setResponsiveFontSize(percent) {  // > CustomCode.responsiveFont:2
      // Get the viewport dimensions  // > CustomCode.responsiveFont:3
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;  // > CustomCode.responsiveFont:4
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;  // > CustomCode.responsiveFont:5
      var percent = 0.05  // > CustomCode.responsiveFont:6
      // Calculate the font size based on viewport width or height  // > CustomCode.responsiveFont:7
      var fontSize = Math.min(viewportWidth * percent, viewportHeight * percent); // Adjust the multiplier as needed  // > CustomCode.responsiveFont:8
      // Set the font size  // > CustomCode.responsiveFont:9
      // Set the font size and font family (Comic Sans)  // > CustomCode.responsiveFont:10
      font = "normal normal " + fontSize + "px 'Comic Sans MS', 'Comic Sans', cursive";  // > CustomCode.responsiveFont:11
     fontSmall = "normal normal " + 0.75 * fontSize + "px 'Comic Sans MS', 'Comic Sans', cursive";  // > CustomCode.responsiveFont:12
      // Apply the font size to your elements  // > CustomCode.responsiveFont:13
      // For example, you can apply it to a specific element with a class  // > CustomCode.responsiveFont:14
      //document.getElementById("yourElementId").style.font = font;  // > CustomCode.responsiveFont:15
  }  // > CustomCode.responsiveFont:16

  // fullScreen  // > CustomCode.fullScreen:1
  /*jslint browser:true */  // > CustomCode.fullScreen:2
  function toggleFullScreen() {  // > CustomCode.fullScreen:3
    try {  // > CustomCode.fullScreen:4
      const doc = document.documentElement;  // > CustomCode.fullScreen:5
        // > CustomCode.fullScreen:6
      // Check if any fullscreen element exists  // > CustomCode.fullScreen:7
      const isFullScreen = document.fullscreenElement ||   // > CustomCode.fullScreen:8
                           document.mozFullScreenElement ||   // > CustomCode.fullScreen:9
                           document.webkitFullscreenElement ||   // > CustomCode.fullScreen:10
                           document.msFullscreenElement;  // > CustomCode.fullScreen:11
      if (!isFullScreen) {  // > CustomCode.fullScreen:12
        // Request full-screen mode based on the browser  // > CustomCode.fullScreen:13
        if (doc.requestFullscreen) {  // > CustomCode.fullScreen:14
          doc.requestFullscreen();  // > CustomCode.fullScreen:15
        } else if (doc.msRequestFullscreen) {  // > CustomCode.fullScreen:16
          doc.msRequestFullscreen();  // > CustomCode.fullScreen:17
        } else if (doc.mozRequestFullScreen) {  // > CustomCode.fullScreen:18
          doc.mozRequestFullScreen();  // > CustomCode.fullScreen:19
        } else if (doc.webkitRequestFullscreen) {  // > CustomCode.fullScreen:20
          doc.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT); // Pass input permission for older WebKit  // > CustomCode.fullScreen:21
        }  // > CustomCode.fullScreen:22
      } else {  // > CustomCode.fullScreen:23
        // Exit full-screen mode based on the browser  // > CustomCode.fullScreen:24
        if (document.exitFullscreen) {  // > CustomCode.fullScreen:25
          document.exitFullscreen();  // > CustomCode.fullScreen:26
        } else if (document.msExitFullscreen) {  // > CustomCode.fullScreen:27
          document.msExitFullscreen();  // > CustomCode.fullScreen:28
        } else if (document.mozCancelFullScreen) {  // > CustomCode.fullScreen:29
          document.mozCancelFullScreen();  // > CustomCode.fullScreen:30
        } else if (document.webkitExitFullscreen) {  // > CustomCode.fullScreen:31
          document.webkitExitFullscreen();  // > CustomCode.fullScreen:32
        }  // > CustomCode.fullScreen:33
      }  // > CustomCode.fullScreen:34
    } catch (e) {  // > CustomCode.fullScreen:35
      console.error("Error toggling full-screen mode:", e);  // > CustomCode.fullScreen:36
    }  // > CustomCode.fullScreen:37
  }  // > CustomCode.fullScreen:38
  // Handle screen orientation for mobile devices (optional)  // > CustomCode.fullScreen:39
  window.addEventListener("orientationchange", () => {  // > CustomCode.fullScreen:40
    if (screen.orientation && screen.orientation.lock) {  // > CustomCode.fullScreen:41
      screen.orientation.lock('landscape').catch(err => console.warn('Failed to lock orientation:', err));  // > CustomCode.fullScreen:42
    }  // > CustomCode.fullScreen:43
  });  // > CustomCode.fullScreen:44

  // onPlacementBoxClick  // > CustomCode.onPlacementBoxClick:1
  function onPlacementBoxClick(index) {  // > CustomCode.onPlacementBoxClick:2
      // Check if a tile card has been selected  // > CustomCode.onPlacementBoxClick:3
      if (selectedTileIndex !== null && selectedTileIndex !== undefined && selectedTileType !== null && selectedTileType !== undefined) {  // > CustomCode.onPlacementBoxClick:4
            // > CustomCode.onPlacementBoxClick:5
          // Check if a vowel or consonant is selected  // > CustomCode.onPlacementBoxClick:6
          let selectedTile;  // > CustomCode.onPlacementBoxClick:7
          //let selectedTile.backgroundColor = "white" //lookang to fix bug if click without any selected vowels etc  // > CustomCode.onPlacementBoxClick:8
          if (selectedTileType === "vowel") {  // > CustomCode.onPlacementBoxClick:9
              selectedTile = vowels[selectedTileIndex];  // > CustomCode.onPlacementBoxClick:10
          } else if (selectedTileType === "consonant") {  // > CustomCode.onPlacementBoxClick:11
              selectedTile = consonants[selectedTileIndex];  // > CustomCode.onPlacementBoxClick:12
          }  // > CustomCode.onPlacementBoxClick:13
          // Place the selected tile into the clicked placement box  // > CustomCode.onPlacementBoxClick:14
          placementCardBgColor[index] = selectedTile.backgroundColor;  // > CustomCode.onPlacementBoxClick:15
          placementCardTextColor[index] = selectedTile.textColor;  // > CustomCode.onPlacementBoxClick:16
          placementCardText[index] = selectedTile.text;  // > CustomCode.onPlacementBoxClick:17
            // > CustomCode.onPlacementBoxClick:18
          if (selectedTileIndex !== null && selectedTileType === "vowel") {  // > CustomCode.onPlacementBoxClick:19
          vowelsBordered[selectedTileIndex] = 0;  // > CustomCode.onPlacementBoxClick:20
          } else if (selectedTileIndex !== null && selectedTileType === "consonant") {  // > CustomCode.onPlacementBoxClick:21
          consonantsBordered[selectedTileIndex] = 0;  // > CustomCode.onPlacementBoxClick:22
          }  // > CustomCode.onPlacementBoxClick:23
            // > CustomCode.onPlacementBoxClick:24
          placementCards[index] = {  // > CustomCode.onPlacementBoxClick:25
              tileIndex: selectedTileIndex,  // > CustomCode.onPlacementBoxClick:26
              tileType: selectedTileType  // > CustomCode.onPlacementBoxClick:27
          };  // > CustomCode.onPlacementBoxClick:28
          // Reset the selected tile after placing it in the box  // > CustomCode.onPlacementBoxClick:29
          selectedTileIndex = null;  // > CustomCode.onPlacementBoxClick:30
          selectedTileType = null;  // > CustomCode.onPlacementBoxClick:31
      } else {  // > CustomCode.onPlacementBoxClick:32
          placementCardBgColor[index] = "white";  // > CustomCode.onPlacementBoxClick:33
          placementCardTextColor[index] = "white";  // > CustomCode.onPlacementBoxClick:34
          placementCardText[index] = "";  // > CustomCode.onPlacementBoxClick:35
            // > CustomCode.onPlacementBoxClick:36
          placementCards[index] = null;  // > CustomCode.onPlacementBoxClick:37
      }  // > CustomCode.onPlacementBoxClick:38
      lastCardIndex = findHighestNonNullIndex(placementCards);  // > CustomCode.onPlacementBoxClick:39
  }  // > CustomCode.onPlacementBoxClick:40

  // onRestartButtonClick  // > CustomCode.onResetButtonClick:1
  function onResetButtonClick() {  // > CustomCode.onResetButtonClick:2
      // Clear all placement boxes  // > CustomCode.onResetButtonClick:3
      for (let i = 0; i < numPlacementBoxes; i++) {  // > CustomCode.onResetButtonClick:4
          placementCardBgColor[i] = "white";  // > CustomCode.onResetButtonClick:5
          placementCardTextColor[i] = "white";  // > CustomCode.onResetButtonClick:6
          placementCardText[i] = "";  // > CustomCode.onResetButtonClick:7
      }  // > CustomCode.onResetButtonClick:8
      placementCards = [];  // > CustomCode.onResetButtonClick:9
      lastCardIndex = -1;  // > CustomCode.onResetButtonClick:10
        // > CustomCode.onResetButtonClick:11
      // move arrow back  // > CustomCode.onResetButtonClick:12
      blendX = -0.5 // start is -0.5 instead of 0  // > CustomCode.onResetButtonClick:13
      blendvX = 0  // > CustomCode.onResetButtonClick:14
        // > CustomCode.onResetButtonClick:15
  }  // > CustomCode.onResetButtonClick:16

  // speech  // > CustomCode.speech:1
  // copy this custom function  // > CustomCode.speech:2
  // in iOS need to add speech to the play button as On iOS the API works but must be triggered by a user action callback, like a response to a tap event, to provide a better experience to users and avoid unexpected sounds out of your phone  // > CustomCode.speech:3
  function speech (option) {  // > CustomCode.speech:4
  try { // allow code to run in Student Learning Space   // > CustomCode.speech:5
  var isCordova = (!!this.parent.cordova || !!window.cordova);  // > CustomCode.speech:6
  if(isCordova) { // check it is running in Android or iOS  // > CustomCode.speech:7
         // parent.TTS.speak({text:option,locale:'zh-CN'});  // > CustomCode.speech:8
  	parent.TTS.speak({text:option,locale:'us-EN'});  // > CustomCode.speech:9
  	// parent.TTS.speak({text:option,locale:'en-US'});  // > CustomCode.speech:10
  	// parent.TTS.speak({text:option,locale:'id-ID'});  // > CustomCode.speech:11
  }   // > CustomCode.speech:12
  }   // > CustomCode.speech:13
  catch(e) {  // > CustomCode.speech:14
    var isCordova = false;  // > CustomCode.speech:15
    }  // > CustomCode.speech:16
      // > CustomCode.speech:17
     var msg = new SpeechSynthesisUtterance(option);  // > CustomCode.speech:18
    //https://stackoverflow.com/questions/43983845/speechsynthesis-api-for-chinese-firefox  // > CustomCode.speech:19
    // Set the text.  // > CustomCode.speech:20
  	//msg.text = option;   // > CustomCode.speech:21
  	//https://forums.developer.apple.com/message/323564#323564  // > CustomCode.speech:22
  	// comment out the next 2 lines for english  // > CustomCode.speech:23
  //msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Ting-Ting'; })[0];  // > CustomCode.speech:24
  //msg.lang = 'zh-CH'; // need for android?  // > CustomCode.speech:25
  //msg.lang = 'id-ID'; // need for android?  // > CustomCode.speech:26
  msg.lang = 'us-EN'; // need for android?  // > CustomCode.speech:27
  //https://flaviocopes.com/speech-synthesis-api/  // > CustomCode.speech:28
  //debug  // > CustomCode.speech:29
  //console.log(`Voices #: ${speechSynthesis.getVoices().length}`)  // > CustomCode.speech:30
  //speechSynthesis.getVoices().forEach(voice => {  // > CustomCode.speech:31
  // console.log(voice.name, voice.lang)  // > CustomCode.speech:32
  //})  // > CustomCode.speech:33
  //debug  // > CustomCode.speech:34
  // Queue this utterance.  // > CustomCode.speech:35
  window.speechSynthesis.speak(msg);  // > CustomCode.speech:36
     // > CustomCode.speech:37
  }  // > CustomCode.speech:38

  function onBlendClick() {  // > CustomCode.onBlendClick:1
        // > CustomCode.onBlendClick:2
      let isAdded = false;  // > CustomCode.onBlendClick:3
      let word = placementCardText.join("");  // > CustomCode.onBlendClick:4
        // > CustomCode.onBlendClick:5
      if (!word) return;  // > CustomCode.onBlendClick:6
        // > CustomCode.onBlendClick:7
        // > CustomCode.onBlendClick:8
      for (let i = 0; i < wordsReadSet1Text.length; i++) {  // > CustomCode.onBlendClick:9
          if (wordsReadSet1Text[i] === word) {  // > CustomCode.onBlendClick:10
              isAdded = true;  // > CustomCode.onBlendClick:11
              break;  // > CustomCode.onBlendClick:12
          }  // > CustomCode.onBlendClick:13
          else if (!wordsReadSet1Text[i]) {  // > CustomCode.onBlendClick:14
              wordsReadSet1Text[i] = word;  // > CustomCode.onBlendClick:15
              isAdded = true;  // > CustomCode.onBlendClick:16
              wordsReadSet1Info.push([...placementCards]);  // > CustomCode.onBlendClick:17
              console.log(wordsReadSet1Info);  // > CustomCode.onBlendClick:18
              break;  // > CustomCode.onBlendClick:19
          }  // > CustomCode.onBlendClick:20
      }  // > CustomCode.onBlendClick:21
        // > CustomCode.onBlendClick:22
      console.log(wordsReadSet1Text.join());  // > CustomCode.onBlendClick:23
        // > CustomCode.onBlendClick:24
      if (!isAdded) {  // > CustomCode.onBlendClick:25
          for (let i = 0; i < wordsReadSet1Text.length; i++) {  // > CustomCode.onBlendClick:26
          if (wordsReadSet2Text[i] === word) {  // > CustomCode.onBlendClick:27
              isAdded = true;  // > CustomCode.onBlendClick:28
              break;  // > CustomCode.onBlendClick:29
          } else if (!wordsReadSet2Text[i]) {  // > CustomCode.onBlendClick:30
              wordsReadSet2Text[i] = word;  // > CustomCode.onBlendClick:31
              isAdded = true;  // > CustomCode.onBlendClick:32
              wordsReadSet2Info.push([...placementCards]);  // > CustomCode.onBlendClick:33
              console.log(wordsReadSet2Info);  // > CustomCode.onBlendClick:34
              break;  // > CustomCode.onBlendClick:35
          }  // > CustomCode.onBlendClick:36
      }  // > CustomCode.onBlendClick:37
      }  // > CustomCode.onBlendClick:38
  }  // > CustomCode.onBlendClick:39

  // onWordReadClick  // > CustomCode.onWordReadClick:1
  function onWordReadClick(newPlacementCards) {  // > CustomCode.onWordReadClick:2
      onResetButtonClick();  // > CustomCode.onWordReadClick:3
      let tileInfo;  // > CustomCode.onWordReadClick:4
      for (let i = 0; i < newPlacementCards.length; i++) {  // > CustomCode.onWordReadClick:5
          if (!newPlacementCards[i]) continue;  // > CustomCode.onWordReadClick:6
          if (newPlacementCards[i].tileType === "vowel") {  // > CustomCode.onWordReadClick:7
              tileInfo = vowels[newPlacementCards[i].tileIndex];  // > CustomCode.onWordReadClick:8
          } else if (newPlacementCards[i].tileType === "consonant") {  // > CustomCode.onWordReadClick:9
              tileInfo = consonants[newPlacementCards[i].tileIndex];  // > CustomCode.onWordReadClick:10
          }  // > CustomCode.onWordReadClick:11
          placementCardBgColor[i] = tileInfo.backgroundColor;  // > CustomCode.onWordReadClick:12
          placementCardTextColor[i] = tileInfo.textColor;  // > CustomCode.onWordReadClick:13
          placementCardText[i] = tileInfo.text;  // > CustomCode.onWordReadClick:14
            // > CustomCode.onWordReadClick:15
          placementCards = [...newPlacementCards];  // > CustomCode.onWordReadClick:16
          lastCardIndex = findHighestNonNullIndex(placementCards);  // > CustomCode.onWordReadClick:17
      }  // > CustomCode.onWordReadClick:18
  }  // > CustomCode.onWordReadClick:19

  // findHighestNonNullIndex  // > CustomCode.findHighestNonNullIndex:1
  function findHighestNonNullIndex(arr) {  // > CustomCode.findHighestNonNullIndex:2
      // Start from the end of the array and move backwards  // > CustomCode.findHighestNonNullIndex:3
      for (let i = arr.length - 1; i >= 0; i--) {  // > CustomCode.findHighestNonNullIndex:4
          if (arr[i] !== null) {  // > CustomCode.findHighestNonNullIndex:5
              return i; // Return the index as soon as a non-null element is found  // > CustomCode.findHighestNonNullIndex:6
          }  // > CustomCode.findHighestNonNullIndex:7
      }  // > CustomCode.findHighestNonNullIndex:8
      return -1; // Return -1 if no non-null element is found  // > CustomCode.findHighestNonNullIndex:9
  }  // > CustomCode.findHighestNonNullIndex:10

  // jszip  // > CustomCode.jszip:1
  /*!  // > CustomCode.jszip:2
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files  // > CustomCode.jszip:3
  <http://stuartk.com/jszip>  // > CustomCode.jszip:4
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>  // > CustomCode.jszip:5
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.  // > CustomCode.jszip:6
  JSZip uses the library pako released under the MIT license :  // > CustomCode.jszip:7
  https://github.com/nodeca/pako/blob/main/LICENSE  // > CustomCode.jszip:8
  */  // > CustomCode.jszip:9
  (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JSZip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){  // > CustomCode.jszip:10
  "use strict";  // > CustomCode.jszip:11
  var utils = require("./utils");  // > CustomCode.jszip:12
  var support = require("./support");  // > CustomCode.jszip:13
  // private property  // > CustomCode.jszip:14
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  // > CustomCode.jszip:15
  // public method for encoding  // > CustomCode.jszip:16
  exports.encode = function(input) {  // > CustomCode.jszip:17
      var output = [];  // > CustomCode.jszip:18
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  // > CustomCode.jszip:19
      var i = 0, len = input.length, remainingBytes = len;  // > CustomCode.jszip:20
      var isArray = utils.getTypeOf(input) !== "string";  // > CustomCode.jszip:21
      while (i < input.length) {  // > CustomCode.jszip:22
          remainingBytes = len - i;  // > CustomCode.jszip:23
          if (!isArray) {  // > CustomCode.jszip:24
              chr1 = input.charCodeAt(i++);  // > CustomCode.jszip:25
              chr2 = i < len ? input.charCodeAt(i++) : 0;  // > CustomCode.jszip:26
              chr3 = i < len ? input.charCodeAt(i++) : 0;  // > CustomCode.jszip:27
          } else {  // > CustomCode.jszip:28
              chr1 = input[i++];  // > CustomCode.jszip:29
              chr2 = i < len ? input[i++] : 0;  // > CustomCode.jszip:30
              chr3 = i < len ? input[i++] : 0;  // > CustomCode.jszip:31
          }  // > CustomCode.jszip:32
          enc1 = chr1 >> 2;  // > CustomCode.jszip:33
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  // > CustomCode.jszip:34
          enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;  // > CustomCode.jszip:35
          enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;  // > CustomCode.jszip:36
          output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));  // > CustomCode.jszip:37
      }  // > CustomCode.jszip:38
      return output.join("");  // > CustomCode.jszip:39
  };  // > CustomCode.jszip:40
  // public method for decoding  // > CustomCode.jszip:41
  exports.decode = function(input) {  // > CustomCode.jszip:42
      var chr1, chr2, chr3;  // > CustomCode.jszip:43
      var enc1, enc2, enc3, enc4;  // > CustomCode.jszip:44
      var i = 0, resultIndex = 0;  // > CustomCode.jszip:45
      var dataUrlPrefix = "data:";  // > CustomCode.jszip:46
      if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {  // > CustomCode.jszip:47
          // This is a common error: people give a data url  // > CustomCode.jszip:48
          // (data:image/png;base64,iVBOR...) with a {base64: true} and  // > CustomCode.jszip:49
          // wonders why things don't work.  // > CustomCode.jszip:50
          // We can detect that the string input looks like a data url but we  // > CustomCode.jszip:51
          // *can't* be sure it is one: removing everything up to the comma would  // > CustomCode.jszip:52
          // be too dangerous.  // > CustomCode.jszip:53
          throw new Error("Invalid base64 input, it looks like a data url.");  // > CustomCode.jszip:54
      }  // > CustomCode.jszip:55
      input = input.replace(/[^A-Za-z0-9+/=]/g, "");  // > CustomCode.jszip:56
      var totalLength = input.length * 3 / 4;  // > CustomCode.jszip:57
      if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {  // > CustomCode.jszip:58
          totalLength--;  // > CustomCode.jszip:59
      }  // > CustomCode.jszip:60
      if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {  // > CustomCode.jszip:61
          totalLength--;  // > CustomCode.jszip:62
      }  // > CustomCode.jszip:63
      if (totalLength % 1 !== 0) {  // > CustomCode.jszip:64
          // totalLength is not an integer, the length does not match a valid  // > CustomCode.jszip:65
          // base64 content. That can happen if:  // > CustomCode.jszip:66
          // - the input is not a base64 content  // > CustomCode.jszip:67
          // - the input is *almost* a base64 content, with a extra chars at the  // > CustomCode.jszip:68
          //   beginning or at the end  // > CustomCode.jszip:69
          // - the input uses a base64 variant (base64url for example)  // > CustomCode.jszip:70
          throw new Error("Invalid base64 input, bad content length.");  // > CustomCode.jszip:71
      }  // > CustomCode.jszip:72
      var output;  // > CustomCode.jszip:73
      if (support.uint8array) {  // > CustomCode.jszip:74
          output = new Uint8Array(totalLength|0);  // > CustomCode.jszip:75
      } else {  // > CustomCode.jszip:76
          output = new Array(totalLength|0);  // > CustomCode.jszip:77
      }  // > CustomCode.jszip:78
      while (i < input.length) {  // > CustomCode.jszip:79
          enc1 = _keyStr.indexOf(input.charAt(i++));  // > CustomCode.jszip:80
          enc2 = _keyStr.indexOf(input.charAt(i++));  // > CustomCode.jszip:81
          enc3 = _keyStr.indexOf(input.charAt(i++));  // > CustomCode.jszip:82
          enc4 = _keyStr.indexOf(input.charAt(i++));  // > CustomCode.jszip:83
          chr1 = (enc1 << 2) | (enc2 >> 4);  // > CustomCode.jszip:84
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  // > CustomCode.jszip:85
          chr3 = ((enc3 & 3) << 6) | enc4;  // > CustomCode.jszip:86
          output[resultIndex++] = chr1;  // > CustomCode.jszip:87
          if (enc3 !== 64) {  // > CustomCode.jszip:88
              output[resultIndex++] = chr2;  // > CustomCode.jszip:89
          }  // > CustomCode.jszip:90
          if (enc4 !== 64) {  // > CustomCode.jszip:91
              output[resultIndex++] = chr3;  // > CustomCode.jszip:92
          }  // > CustomCode.jszip:93
      }  // > CustomCode.jszip:94
      return output;  // > CustomCode.jszip:95
  };  // > CustomCode.jszip:96
  },{"./support":30,"./utils":32}],2:[function(require,module,exports){  // > CustomCode.jszip:97
  "use strict";  // > CustomCode.jszip:98
  var external = require("./external");  // > CustomCode.jszip:99
  var DataWorker = require("./stream/DataWorker");  // > CustomCode.jszip:100
  var Crc32Probe = require("./stream/Crc32Probe");  // > CustomCode.jszip:101
  var DataLengthProbe = require("./stream/DataLengthProbe");  // > CustomCode.jszip:102
  /**  // > CustomCode.jszip:103
   * Represent a compressed object, with everything needed to decompress it.  // > CustomCode.jszip:104
   * @constructor  // > CustomCode.jszip:105
   * @param {number} compressedSize the size of the data compressed.  // > CustomCode.jszip:106
   * @param {number} uncompressedSize the size of the data after decompression.  // > CustomCode.jszip:107
   * @param {number} crc32 the crc32 of the decompressed file.  // > CustomCode.jszip:108
   * @param {object} compression the type of compression, see lib/compressions.js.  // > CustomCode.jszip:109
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.  // > CustomCode.jszip:110
   */  // > CustomCode.jszip:111
  function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {  // > CustomCode.jszip:112
      this.compressedSize = compressedSize;  // > CustomCode.jszip:113
      this.uncompressedSize = uncompressedSize;  // > CustomCode.jszip:114
      this.crc32 = crc32;  // > CustomCode.jszip:115
      this.compression = compression;  // > CustomCode.jszip:116
      this.compressedContent = data;  // > CustomCode.jszip:117
  }  // > CustomCode.jszip:118
  CompressedObject.prototype = {  // > CustomCode.jszip:119
      /**  // > CustomCode.jszip:120
       * Create a worker to get the uncompressed content.  // > CustomCode.jszip:121
       * @return {GenericWorker} the worker.  // > CustomCode.jszip:122
       */  // > CustomCode.jszip:123
      getContentWorker: function () {  // > CustomCode.jszip:124
          var worker = new DataWorker(external.Promise.resolve(this.compressedContent))  // > CustomCode.jszip:125
              .pipe(this.compression.uncompressWorker())  // > CustomCode.jszip:126
              .pipe(new DataLengthProbe("data_length"));  // > CustomCode.jszip:127
          var that = this;  // > CustomCode.jszip:128
          worker.on("end", function () {  // > CustomCode.jszip:129
              if (this.streamInfo["data_length"] !== that.uncompressedSize) {  // > CustomCode.jszip:130
                  throw new Error("Bug : uncompressed data size mismatch");  // > CustomCode.jszip:131
              }  // > CustomCode.jszip:132
          });  // > CustomCode.jszip:133
          return worker;  // > CustomCode.jszip:134
      },  // > CustomCode.jszip:135
      /**  // > CustomCode.jszip:136
       * Create a worker to get the compressed content.  // > CustomCode.jszip:137
       * @return {GenericWorker} the worker.  // > CustomCode.jszip:138
       */  // > CustomCode.jszip:139
      getCompressedWorker: function () {  // > CustomCode.jszip:140
          return new DataWorker(external.Promise.resolve(this.compressedContent))  // > CustomCode.jszip:141
              .withStreamInfo("compressedSize", this.compressedSize)  // > CustomCode.jszip:142
              .withStreamInfo("uncompressedSize", this.uncompressedSize)  // > CustomCode.jszip:143
              .withStreamInfo("crc32", this.crc32)  // > CustomCode.jszip:144
              .withStreamInfo("compression", this.compression)  // > CustomCode.jszip:145
          ;  // > CustomCode.jszip:146
      }  // > CustomCode.jszip:147
  };  // > CustomCode.jszip:148
  /**  // > CustomCode.jszip:149
   * Chain the given worker with other workers to compress the content with the  // > CustomCode.jszip:150
   * given compression.  // > CustomCode.jszip:151
   * @param {GenericWorker} uncompressedWorker the worker to pipe.  // > CustomCode.jszip:152
   * @param {Object} compression the compression object.  // > CustomCode.jszip:153
   * @param {Object} compressionOptions the options to use when compressing.  // > CustomCode.jszip:154
   * @return {GenericWorker} the new worker compressing the content.  // > CustomCode.jszip:155
   */  // > CustomCode.jszip:156
  CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {  // > CustomCode.jszip:157
      return uncompressedWorker  // > CustomCode.jszip:158
          .pipe(new Crc32Probe())  // > CustomCode.jszip:159
          .pipe(new DataLengthProbe("uncompressedSize"))  // > CustomCode.jszip:160
          .pipe(compression.compressWorker(compressionOptions))  // > CustomCode.jszip:161
          .pipe(new DataLengthProbe("compressedSize"))  // > CustomCode.jszip:162
          .withStreamInfo("compression", compression);  // > CustomCode.jszip:163
  };  // > CustomCode.jszip:164
  module.exports = CompressedObject;  // > CustomCode.jszip:165
  },{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(require,module,exports){  // > CustomCode.jszip:166
  "use strict";  // > CustomCode.jszip:167
  var GenericWorker = require("./stream/GenericWorker");  // > CustomCode.jszip:168
  exports.STORE = {  // > CustomCode.jszip:169
      magic: "\x00\x00",  // > CustomCode.jszip:170
      compressWorker : function () {  // > CustomCode.jszip:171
          return new GenericWorker("STORE compression");  // > CustomCode.jszip:172
      },  // > CustomCode.jszip:173
      uncompressWorker : function () {  // > CustomCode.jszip:174
          return new GenericWorker("STORE decompression");  // > CustomCode.jszip:175
      }  // > CustomCode.jszip:176
  };  // > CustomCode.jszip:177
  exports.DEFLATE = require("./flate");  // > CustomCode.jszip:178
  },{"./flate":7,"./stream/GenericWorker":28}],4:[function(require,module,exports){  // > CustomCode.jszip:179
  "use strict";  // > CustomCode.jszip:180
  var utils = require("./utils");  // > CustomCode.jszip:181
  /**  // > CustomCode.jszip:182
   * The following functions come from pako, from pako/lib/zlib/crc32.js  // > CustomCode.jszip:183
   * released under the MIT license, see pako https://github.com/nodeca/pako/  // > CustomCode.jszip:184
   */  // > CustomCode.jszip:185
  // Use ordinary array, since untyped makes no boost here  // > CustomCode.jszip:186
  function makeTable() {  // > CustomCode.jszip:187
      var c, table = [];  // > CustomCode.jszip:188
      for(var n =0; n < 256; n++){  // > CustomCode.jszip:189
          c = n;  // > CustomCode.jszip:190
          for(var k =0; k < 8; k++){  // > CustomCode.jszip:191
              c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));  // > CustomCode.jszip:192
          }  // > CustomCode.jszip:193
          table[n] = c;  // > CustomCode.jszip:194
      }  // > CustomCode.jszip:195
      return table;  // > CustomCode.jszip:196
  }  // > CustomCode.jszip:197
  // Create table on load. Just 255 signed longs. Not a problem.  // > CustomCode.jszip:198
  var crcTable = makeTable();  // > CustomCode.jszip:199
  function crc32(crc, buf, len, pos) {  // > CustomCode.jszip:200
      var t = crcTable, end = pos + len;  // > CustomCode.jszip:201
      crc = crc ^ (-1);  // > CustomCode.jszip:202
      for (var i = pos; i < end; i++ ) {  // > CustomCode.jszip:203
          crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];  // > CustomCode.jszip:204
      }  // > CustomCode.jszip:205
      return (crc ^ (-1)); // >>> 0;  // > CustomCode.jszip:206
  }  // > CustomCode.jszip:207
  // That's all for the pako functions.  // > CustomCode.jszip:208
  /**  // > CustomCode.jszip:209
   * Compute the crc32 of a string.  // > CustomCode.jszip:210
   * This is almost the same as the function crc32, but for strings. Using the  // > CustomCode.jszip:211
   * same function for the two use cases leads to horrible performances.  // > CustomCode.jszip:212
   * @param {Number} crc the starting value of the crc.  // > CustomCode.jszip:213
   * @param {String} str the string to use.  // > CustomCode.jszip:214
   * @param {Number} len the length of the string.  // > CustomCode.jszip:215
   * @param {Number} pos the starting position for the crc32 computation.  // > CustomCode.jszip:216
   * @return {Number} the computed crc32.  // > CustomCode.jszip:217
   */  // > CustomCode.jszip:218
  function crc32str(crc, str, len, pos) {  // > CustomCode.jszip:219
      var t = crcTable, end = pos + len;  // > CustomCode.jszip:220
      crc = crc ^ (-1);  // > CustomCode.jszip:221
      for (var i = pos; i < end; i++ ) {  // > CustomCode.jszip:222
          crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];  // > CustomCode.jszip:223
      }  // > CustomCode.jszip:224
      return (crc ^ (-1)); // >>> 0;  // > CustomCode.jszip:225
  }  // > CustomCode.jszip:226
  module.exports = function crc32wrapper(input, crc) {  // > CustomCode.jszip:227
      if (typeof input === "undefined" || !input.length) {  // > CustomCode.jszip:228
          return 0;  // > CustomCode.jszip:229
      }  // > CustomCode.jszip:230
      var isArray = utils.getTypeOf(input) !== "string";  // > CustomCode.jszip:231
      if(isArray) {  // > CustomCode.jszip:232
          return crc32(crc|0, input, input.length, 0);  // > CustomCode.jszip:233
      } else {  // > CustomCode.jszip:234
          return crc32str(crc|0, input, input.length, 0);  // > CustomCode.jszip:235
      }  // > CustomCode.jszip:236
  };  // > CustomCode.jszip:237
  },{"./utils":32}],5:[function(require,module,exports){  // > CustomCode.jszip:238
  "use strict";  // > CustomCode.jszip:239
  exports.base64 = false;  // > CustomCode.jszip:240
  exports.binary = false;  // > CustomCode.jszip:241
  exports.dir = false;  // > CustomCode.jszip:242
  exports.createFolders = true;  // > CustomCode.jszip:243
  exports.date = null;  // > CustomCode.jszip:244
  exports.compression = null;  // > CustomCode.jszip:245
  exports.compressionOptions = null;  // > CustomCode.jszip:246
  exports.comment = null;  // > CustomCode.jszip:247
  exports.unixPermissions = null;  // > CustomCode.jszip:248
  exports.dosPermissions = null;  // > CustomCode.jszip:249
  },{}],6:[function(require,module,exports){  // > CustomCode.jszip:250
  "use strict";  // > CustomCode.jszip:251
  // load the global object first:  // > CustomCode.jszip:252
  // - it should be better integrated in the system (unhandledRejection in node)  // > CustomCode.jszip:253
  // - the environment may have a custom Promise implementation (see zone.js)  // > CustomCode.jszip:254
  var ES6Promise = null;  // > CustomCode.jszip:255
  if (typeof Promise !== "undefined") {  // > CustomCode.jszip:256
      ES6Promise = Promise;  // > CustomCode.jszip:257
  } else {  // > CustomCode.jszip:258
      ES6Promise = require("lie");  // > CustomCode.jszip:259
  }  // > CustomCode.jszip:260
  /**  // > CustomCode.jszip:261
   * Let the user use/change some implementations.  // > CustomCode.jszip:262
   */  // > CustomCode.jszip:263
  module.exports = {  // > CustomCode.jszip:264
      Promise: ES6Promise  // > CustomCode.jszip:265
  };  // > CustomCode.jszip:266
  },{"lie":37}],7:[function(require,module,exports){  // > CustomCode.jszip:267
  "use strict";  // > CustomCode.jszip:268
  var USE_TYPEDARRAY = (typeof Uint8Array !== "undefined") && (typeof Uint16Array !== "undefined") && (typeof Uint32Array !== "undefined");  // > CustomCode.jszip:269
  var pako = require("pako");  // > CustomCode.jszip:270
  var utils = require("./utils");  // > CustomCode.jszip:271
  var GenericWorker = require("./stream/GenericWorker");  // > CustomCode.jszip:272
  var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";  // > CustomCode.jszip:273
  exports.magic = "\x08\x00";  // > CustomCode.jszip:274
  /**  // > CustomCode.jszip:275
   * Create a worker that uses pako to inflate/deflate.  // > CustomCode.jszip:276
   * @constructor  // > CustomCode.jszip:277
   * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".  // > CustomCode.jszip:278
   * @param {Object} options the options to use when (de)compressing.  // > CustomCode.jszip:279
   */  // > CustomCode.jszip:280
  function FlateWorker(action, options) {  // > CustomCode.jszip:281
      GenericWorker.call(this, "FlateWorker/" + action);  // > CustomCode.jszip:282
      this._pako = null;  // > CustomCode.jszip:283
      this._pakoAction = action;  // > CustomCode.jszip:284
      this._pakoOptions = options;  // > CustomCode.jszip:285
      // the `meta` object from the last chunk received  // > CustomCode.jszip:286
      // this allow this worker to pass around metadata  // > CustomCode.jszip:287
      this.meta = {};  // > CustomCode.jszip:288
  }  // > CustomCode.jszip:289
  utils.inherits(FlateWorker, GenericWorker);  // > CustomCode.jszip:290
  /**  // > CustomCode.jszip:291
   * @see GenericWorker.processChunk  // > CustomCode.jszip:292
   */  // > CustomCode.jszip:293
  FlateWorker.prototype.processChunk = function (chunk) {  // > CustomCode.jszip:294
      this.meta = chunk.meta;  // > CustomCode.jszip:295
      if (this._pako === null) {  // > CustomCode.jszip:296
          this._createPako();  // > CustomCode.jszip:297
      }  // > CustomCode.jszip:298
      this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);  // > CustomCode.jszip:299
  };  // > CustomCode.jszip:300
  /**  // > CustomCode.jszip:301
   * @see GenericWorker.flush  // > CustomCode.jszip:302
   */  // > CustomCode.jszip:303
  FlateWorker.prototype.flush = function () {  // > CustomCode.jszip:304
      GenericWorker.prototype.flush.call(this);  // > CustomCode.jszip:305
      if (this._pako === null) {  // > CustomCode.jszip:306
          this._createPako();  // > CustomCode.jszip:307
      }  // > CustomCode.jszip:308
      this._pako.push([], true);  // > CustomCode.jszip:309
  };  // > CustomCode.jszip:310
  /**  // > CustomCode.jszip:311
   * @see GenericWorker.cleanUp  // > CustomCode.jszip:312
   */  // > CustomCode.jszip:313
  FlateWorker.prototype.cleanUp = function () {  // > CustomCode.jszip:314
      GenericWorker.prototype.cleanUp.call(this);  // > CustomCode.jszip:315
      this._pako = null;  // > CustomCode.jszip:316
  };  // > CustomCode.jszip:317
  /**  // > CustomCode.jszip:318
   * Create the _pako object.  // > CustomCode.jszip:319
   * TODO: lazy-loading this object isn't the best solution but it's the  // > CustomCode.jszip:320
   * quickest. The best solution is to lazy-load the worker list. See also the  // > CustomCode.jszip:321
   * issue #446.  // > CustomCode.jszip:322
   */  // > CustomCode.jszip:323
  FlateWorker.prototype._createPako = function () {  // > CustomCode.jszip:324
      this._pako = new pako[this._pakoAction]({  // > CustomCode.jszip:325
          raw: true,  // > CustomCode.jszip:326
          level: this._pakoOptions.level || -1 // default compression  // > CustomCode.jszip:327
      });  // > CustomCode.jszip:328
      var self = this;  // > CustomCode.jszip:329
      this._pako.onData = function(data) {  // > CustomCode.jszip:330
          self.push({  // > CustomCode.jszip:331
              data : data,  // > CustomCode.jszip:332
              meta : self.meta  // > CustomCode.jszip:333
          });  // > CustomCode.jszip:334
      };  // > CustomCode.jszip:335
  };  // > CustomCode.jszip:336
  exports.compressWorker = function (compressionOptions) {  // > CustomCode.jszip:337
      return new FlateWorker("Deflate", compressionOptions);  // > CustomCode.jszip:338
  };  // > CustomCode.jszip:339
  exports.uncompressWorker = function () {  // > CustomCode.jszip:340
      return new FlateWorker("Inflate", {});  // > CustomCode.jszip:341
  };  // > CustomCode.jszip:342
  },{"./stream/GenericWorker":28,"./utils":32,"pako":38}],8:[function(require,module,exports){  // > CustomCode.jszip:343
  "use strict";  // > CustomCode.jszip:344
  var utils = require("../utils");  // > CustomCode.jszip:345
  var GenericWorker = require("../stream/GenericWorker");  // > CustomCode.jszip:346
  var utf8 = require("../utf8");  // > CustomCode.jszip:347
  var crc32 = require("../crc32");  // > CustomCode.jszip:348
  var signature = require("../signature");  // > CustomCode.jszip:349
  /**  // > CustomCode.jszip:350
   * Transform an integer into a string in hexadecimal.  // > CustomCode.jszip:351
   * @private  // > CustomCode.jszip:352
   * @param {number} dec the number to convert.  // > CustomCode.jszip:353
   * @param {number} bytes the number of bytes to generate.  // > CustomCode.jszip:354
   * @returns {string} the result.  // > CustomCode.jszip:355
   */  // > CustomCode.jszip:356
  var decToHex = function(dec, bytes) {  // > CustomCode.jszip:357
      var hex = "", i;  // > CustomCode.jszip:358
      for (i = 0; i < bytes; i++) {  // > CustomCode.jszip:359
          hex += String.fromCharCode(dec & 0xff);  // > CustomCode.jszip:360
          dec = dec >>> 8;  // > CustomCode.jszip:361
      }  // > CustomCode.jszip:362
      return hex;  // > CustomCode.jszip:363
  };  // > CustomCode.jszip:364
  /**  // > CustomCode.jszip:365
   * Generate the UNIX part of the external file attributes.  // > CustomCode.jszip:366
   * @param {Object} unixPermissions the unix permissions or null.  // > CustomCode.jszip:367
   * @param {Boolean} isDir true if the entry is a directory, false otherwise.  // > CustomCode.jszip:368
   * @return {Number} a 32 bit integer.  // > CustomCode.jszip:369
   *  // > CustomCode.jszip:370
   * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :  // > CustomCode.jszip:371
   *  // > CustomCode.jszip:372
   * TTTTsstrwxrwxrwx0000000000ADVSHR  // > CustomCode.jszip:373
   * ^^^^____________________________ file type, see zipinfo.c (UNX_*)  // > CustomCode.jszip:374
   *     ^^^_________________________ setuid, setgid, sticky  // > CustomCode.jszip:375
   *        ^^^^^^^^^________________ permissions  // > CustomCode.jszip:376
   *                 ^^^^^^^^^^______ not used ?  // > CustomCode.jszip:377
   *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only  // > CustomCode.jszip:378
   */  // > CustomCode.jszip:379
  var generateUnixExternalFileAttr = function (unixPermissions, isDir) {  // > CustomCode.jszip:380
      var result = unixPermissions;  // > CustomCode.jszip:381
      if (!unixPermissions) {  // > CustomCode.jszip:382
          // I can't use octal values in strict mode, hence the hexa.  // > CustomCode.jszip:383
          //  040775 => 0x41fd  // > CustomCode.jszip:384
          // 0100664 => 0x81b4  // > CustomCode.jszip:385
          result = isDir ? 0x41fd : 0x81b4;  // > CustomCode.jszip:386
      }  // > CustomCode.jszip:387
      return (result & 0xFFFF) << 16;  // > CustomCode.jszip:388
  };  // > CustomCode.jszip:389
  /**  // > CustomCode.jszip:390
   * Generate the DOS part of the external file attributes.  // > CustomCode.jszip:391
   * @param {Object} dosPermissions the dos permissions or null.  // > CustomCode.jszip:392
   * @param {Boolean} isDir true if the entry is a directory, false otherwise.  // > CustomCode.jszip:393
   * @return {Number} a 32 bit integer.  // > CustomCode.jszip:394
   *  // > CustomCode.jszip:395
   * Bit 0     Read-Only  // > CustomCode.jszip:396
   * Bit 1     Hidden  // > CustomCode.jszip:397
   * Bit 2     System  // > CustomCode.jszip:398
   * Bit 3     Volume Label  // > CustomCode.jszip:399
   * Bit 4     Directory  // > CustomCode.jszip:400
   * Bit 5     Archive  // > CustomCode.jszip:401
   */  // > CustomCode.jszip:402
  var generateDosExternalFileAttr = function (dosPermissions) {  // > CustomCode.jszip:403
      // the dir flag is already set for compatibility  // > CustomCode.jszip:404
      return (dosPermissions || 0)  & 0x3F;  // > CustomCode.jszip:405
  };  // > CustomCode.jszip:406
  /**  // > CustomCode.jszip:407
   * Generate the various parts used in the construction of the final zip file.  // > CustomCode.jszip:408
   * @param {Object} streamInfo the hash with information about the compressed file.  // > CustomCode.jszip:409
   * @param {Boolean} streamedContent is the content streamed ?  // > CustomCode.jszip:410
   * @param {Boolean} streamingEnded is the stream finished ?  // > CustomCode.jszip:411
   * @param {number} offset the current offset from the start of the zip file.  // > CustomCode.jszip:412
   * @param {String} platform let's pretend we are this platform (change platform dependents fields)  // > CustomCode.jszip:413
   * @param {Function} encodeFileName the function to encode the file name / comment.  // > CustomCode.jszip:414
   * @return {Object} the zip parts.  // > CustomCode.jszip:415
   */  // > CustomCode.jszip:416
  var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {  // > CustomCode.jszip:417
      var file = streamInfo["file"],  // > CustomCode.jszip:418
          compression = streamInfo["compression"],  // > CustomCode.jszip:419
          useCustomEncoding = encodeFileName !== utf8.utf8encode,  // > CustomCode.jszip:420
          encodedFileName = utils.transformTo("string", encodeFileName(file.name)),  // > CustomCode.jszip:421
          utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),  // > CustomCode.jszip:422
          comment = file.comment,  // > CustomCode.jszip:423
          encodedComment = utils.transformTo("string", encodeFileName(comment)),  // > CustomCode.jszip:424
          utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),  // > CustomCode.jszip:425
          useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,  // > CustomCode.jszip:426
          useUTF8ForComment = utfEncodedComment.length !== comment.length,  // > CustomCode.jszip:427
          dosTime,  // > CustomCode.jszip:428
          dosDate,  // > CustomCode.jszip:429
          extraFields = "",  // > CustomCode.jszip:430
          unicodePathExtraField = "",  // > CustomCode.jszip:431
          unicodeCommentExtraField = "",  // > CustomCode.jszip:432
          dir = file.dir,  // > CustomCode.jszip:433
          date = file.date;  // > CustomCode.jszip:434
      var dataInfo = {  // > CustomCode.jszip:435
          crc32 : 0,  // > CustomCode.jszip:436
          compressedSize : 0,  // > CustomCode.jszip:437
          uncompressedSize : 0  // > CustomCode.jszip:438
      };  // > CustomCode.jszip:439
      // if the content is streamed, the sizes/crc32 are only available AFTER  // > CustomCode.jszip:440
      // the end of the stream.  // > CustomCode.jszip:441
      if (!streamedContent || streamingEnded) {  // > CustomCode.jszip:442
          dataInfo.crc32 = streamInfo["crc32"];  // > CustomCode.jszip:443
          dataInfo.compressedSize = streamInfo["compressedSize"];  // > CustomCode.jszip:444
          dataInfo.uncompressedSize = streamInfo["uncompressedSize"];  // > CustomCode.jszip:445
      }  // > CustomCode.jszip:446
      var bitflag = 0;  // > CustomCode.jszip:447
      if (streamedContent) {  // > CustomCode.jszip:448
          // Bit 3: the sizes/crc32 are set to zero in the local header.  // > CustomCode.jszip:449
          // The correct values are put in the data descriptor immediately  // > CustomCode.jszip:450
          // following the compressed data.  // > CustomCode.jszip:451
          bitflag |= 0x0008;  // > CustomCode.jszip:452
      }  // > CustomCode.jszip:453
      if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {  // > CustomCode.jszip:454
          // Bit 11: Language encoding flag (EFS).  // > CustomCode.jszip:455
          bitflag |= 0x0800;  // > CustomCode.jszip:456
      }  // > CustomCode.jszip:457
      var extFileAttr = 0;  // > CustomCode.jszip:458
      var versionMadeBy = 0;  // > CustomCode.jszip:459
      if (dir) {  // > CustomCode.jszip:460
          // dos or unix, we set the dos dir flag  // > CustomCode.jszip:461
          extFileAttr |= 0x00010;  // > CustomCode.jszip:462
      }  // > CustomCode.jszip:463
      if(platform === "UNIX") {  // > CustomCode.jszip:464
          versionMadeBy = 0x031E; // UNIX, version 3.0  // > CustomCode.jszip:465
          extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);  // > CustomCode.jszip:466
      } else { // DOS or other, fallback to DOS  // > CustomCode.jszip:467
          versionMadeBy = 0x0014; // DOS, version 2.0  // > CustomCode.jszip:468
          extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);  // > CustomCode.jszip:469
      }  // > CustomCode.jszip:470
      // date  // > CustomCode.jszip:471
      // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html  // > CustomCode.jszip:472
      // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html  // > CustomCode.jszip:473
      // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html  // > CustomCode.jszip:474
      dosTime = date.getUTCHours();  // > CustomCode.jszip:475
      dosTime = dosTime << 6;  // > CustomCode.jszip:476
      dosTime = dosTime | date.getUTCMinutes();  // > CustomCode.jszip:477
      dosTime = dosTime << 5;  // > CustomCode.jszip:478
      dosTime = dosTime | date.getUTCSeconds() / 2;  // > CustomCode.jszip:479
      dosDate = date.getUTCFullYear() - 1980;  // > CustomCode.jszip:480
      dosDate = dosDate << 4;  // > CustomCode.jszip:481
      dosDate = dosDate | (date.getUTCMonth() + 1);  // > CustomCode.jszip:482
      dosDate = dosDate << 5;  // > CustomCode.jszip:483
      dosDate = dosDate | date.getUTCDate();  // > CustomCode.jszip:484
      if (useUTF8ForFileName) {  // > CustomCode.jszip:485
          // set the unicode path extra field. unzip needs at least one extra  // > CustomCode.jszip:486
          // field to correctly handle unicode path, so using the path is as good  // > CustomCode.jszip:487
          // as any other information. This could improve the situation with  // > CustomCode.jszip:488
          // other archive managers too.  // > CustomCode.jszip:489
          // This field is usually used without the utf8 flag, with a non  // > CustomCode.jszip:490
          // unicode path in the header (winrar, winzip). This helps (a bit)  // > CustomCode.jszip:491
          // with the messy Windows' default compressed folders feature but  // > CustomCode.jszip:492
          // breaks on p7zip which doesn't seek the unicode path extra field.  // > CustomCode.jszip:493
          // So for now, UTF-8 everywhere !  // > CustomCode.jszip:494
          unicodePathExtraField =  // > CustomCode.jszip:495
              // Version  // > CustomCode.jszip:496
              decToHex(1, 1) +  // > CustomCode.jszip:497
              // NameCRC32  // > CustomCode.jszip:498
              decToHex(crc32(encodedFileName), 4) +  // > CustomCode.jszip:499
              // UnicodeName  // > CustomCode.jszip:500
              utfEncodedFileName;  // > CustomCode.jszip:501
          extraFields +=  // > CustomCode.jszip:502
              // Info-ZIP Unicode Path Extra Field  // > CustomCode.jszip:503
              "\x75\x70" +  // > CustomCode.jszip:504
              // size  // > CustomCode.jszip:505
              decToHex(unicodePathExtraField.length, 2) +  // > CustomCode.jszip:506
              // content  // > CustomCode.jszip:507
              unicodePathExtraField;  // > CustomCode.jszip:508
      }  // > CustomCode.jszip:509
      if(useUTF8ForComment) {  // > CustomCode.jszip:510
          unicodeCommentExtraField =  // > CustomCode.jszip:511
              // Version  // > CustomCode.jszip:512
              decToHex(1, 1) +  // > CustomCode.jszip:513
              // CommentCRC32  // > CustomCode.jszip:514
              decToHex(crc32(encodedComment), 4) +  // > CustomCode.jszip:515
              // UnicodeName  // > CustomCode.jszip:516
              utfEncodedComment;  // > CustomCode.jszip:517
          extraFields +=  // > CustomCode.jszip:518
              // Info-ZIP Unicode Path Extra Field  // > CustomCode.jszip:519
              "\x75\x63" +  // > CustomCode.jszip:520
              // size  // > CustomCode.jszip:521
              decToHex(unicodeCommentExtraField.length, 2) +  // > CustomCode.jszip:522
              // content  // > CustomCode.jszip:523
              unicodeCommentExtraField;  // > CustomCode.jszip:524
      }  // > CustomCode.jszip:525
      var header = "";  // > CustomCode.jszip:526
      // version needed to extract  // > CustomCode.jszip:527
      header += "\x0A\x00";  // > CustomCode.jszip:528
      // general purpose bit flag  // > CustomCode.jszip:529
      header += decToHex(bitflag, 2);  // > CustomCode.jszip:530
      // compression method  // > CustomCode.jszip:531
      header += compression.magic;  // > CustomCode.jszip:532
      // last mod file time  // > CustomCode.jszip:533
      header += decToHex(dosTime, 2);  // > CustomCode.jszip:534
      // last mod file date  // > CustomCode.jszip:535
      header += decToHex(dosDate, 2);  // > CustomCode.jszip:536
      // crc-32  // > CustomCode.jszip:537
      header += decToHex(dataInfo.crc32, 4);  // > CustomCode.jszip:538
      // compressed size  // > CustomCode.jszip:539
      header += decToHex(dataInfo.compressedSize, 4);  // > CustomCode.jszip:540
      // uncompressed size  // > CustomCode.jszip:541
      header += decToHex(dataInfo.uncompressedSize, 4);  // > CustomCode.jszip:542
      // file name length  // > CustomCode.jszip:543
      header += decToHex(encodedFileName.length, 2);  // > CustomCode.jszip:544
      // extra field length  // > CustomCode.jszip:545
      header += decToHex(extraFields.length, 2);  // > CustomCode.jszip:546
      var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;  // > CustomCode.jszip:547
      var dirRecord = signature.CENTRAL_FILE_HEADER +  // > CustomCode.jszip:548
          // version made by (00: DOS)  // > CustomCode.jszip:549
          decToHex(versionMadeBy, 2) +  // > CustomCode.jszip:550
          // file header (common to file and central directory)  // > CustomCode.jszip:551
          header +  // > CustomCode.jszip:552
          // file comment length  // > CustomCode.jszip:553
          decToHex(encodedComment.length, 2) +  // > CustomCode.jszip:554
          // disk number start  // > CustomCode.jszip:555
          "\x00\x00" +  // > CustomCode.jszip:556
          // internal file attributes TODO  // > CustomCode.jszip:557
          "\x00\x00" +  // > CustomCode.jszip:558
          // external file attributes  // > CustomCode.jszip:559
          decToHex(extFileAttr, 4) +  // > CustomCode.jszip:560
          // relative offset of local header  // > CustomCode.jszip:561
          decToHex(offset, 4) +  // > CustomCode.jszip:562
          // file name  // > CustomCode.jszip:563
          encodedFileName +  // > CustomCode.jszip:564
          // extra field  // > CustomCode.jszip:565
          extraFields +  // > CustomCode.jszip:566
          // file comment  // > CustomCode.jszip:567
          encodedComment;  // > CustomCode.jszip:568
      return {  // > CustomCode.jszip:569
          fileRecord: fileRecord,  // > CustomCode.jszip:570
          dirRecord: dirRecord  // > CustomCode.jszip:571
      };  // > CustomCode.jszip:572
  };  // > CustomCode.jszip:573
  /**  // > CustomCode.jszip:574
   * Generate the EOCD record.  // > CustomCode.jszip:575
   * @param {Number} entriesCount the number of entries in the zip file.  // > CustomCode.jszip:576
   * @param {Number} centralDirLength the length (in bytes) of the central dir.  // > CustomCode.jszip:577
   * @param {Number} localDirLength the length (in bytes) of the local dir.  // > CustomCode.jszip:578
   * @param {String} comment the zip file comment as a binary string.  // > CustomCode.jszip:579
   * @param {Function} encodeFileName the function to encode the comment.  // > CustomCode.jszip:580
   * @return {String} the EOCD record.  // > CustomCode.jszip:581
   */  // > CustomCode.jszip:582
  var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {  // > CustomCode.jszip:583
      var dirEnd = "";  // > CustomCode.jszip:584
      var encodedComment = utils.transformTo("string", encodeFileName(comment));  // > CustomCode.jszip:585
      // end of central dir signature  // > CustomCode.jszip:586
      dirEnd = signature.CENTRAL_DIRECTORY_END +  // > CustomCode.jszip:587
          // number of this disk  // > CustomCode.jszip:588
          "\x00\x00" +  // > CustomCode.jszip:589
          // number of the disk with the start of the central directory  // > CustomCode.jszip:590
          "\x00\x00" +  // > CustomCode.jszip:591
          // total number of entries in the central directory on this disk  // > CustomCode.jszip:592
          decToHex(entriesCount, 2) +  // > CustomCode.jszip:593
          // total number of entries in the central directory  // > CustomCode.jszip:594
          decToHex(entriesCount, 2) +  // > CustomCode.jszip:595
          // size of the central directory   4 bytes  // > CustomCode.jszip:596
          decToHex(centralDirLength, 4) +  // > CustomCode.jszip:597
          // offset of start of central directory with respect to the starting disk number  // > CustomCode.jszip:598
          decToHex(localDirLength, 4) +  // > CustomCode.jszip:599
          // .ZIP file comment length  // > CustomCode.jszip:600
          decToHex(encodedComment.length, 2) +  // > CustomCode.jszip:601
          // .ZIP file comment  // > CustomCode.jszip:602
          encodedComment;  // > CustomCode.jszip:603
      return dirEnd;  // > CustomCode.jszip:604
  };  // > CustomCode.jszip:605
  /**  // > CustomCode.jszip:606
   * Generate data descriptors for a file entry.  // > CustomCode.jszip:607
   * @param {Object} streamInfo the hash generated by a worker, containing information  // > CustomCode.jszip:608
   * on the file entry.  // > CustomCode.jszip:609
   * @return {String} the data descriptors.  // > CustomCode.jszip:610
   */  // > CustomCode.jszip:611
  var generateDataDescriptors = function (streamInfo) {  // > CustomCode.jszip:612
      var descriptor = "";  // > CustomCode.jszip:613
      descriptor = signature.DATA_DESCRIPTOR +  // > CustomCode.jszip:614
          // crc-32                          4 bytes  // > CustomCode.jszip:615
          decToHex(streamInfo["crc32"], 4) +  // > CustomCode.jszip:616
          // compressed size                 4 bytes  // > CustomCode.jszip:617
          decToHex(streamInfo["compressedSize"], 4) +  // > CustomCode.jszip:618
          // uncompressed size               4 bytes  // > CustomCode.jszip:619
          decToHex(streamInfo["uncompressedSize"], 4);  // > CustomCode.jszip:620
      return descriptor;  // > CustomCode.jszip:621
  };  // > CustomCode.jszip:622
  /**  // > CustomCode.jszip:623
   * A worker to concatenate other workers to create a zip file.  // > CustomCode.jszip:624
   * @param {Boolean} streamFiles `true` to stream the content of the files,  // > CustomCode.jszip:625
   * `false` to accumulate it.  // > CustomCode.jszip:626
   * @param {String} comment the comment to use.  // > CustomCode.jszip:627
   * @param {String} platform the platform to use, "UNIX" or "DOS".  // > CustomCode.jszip:628
   * @param {Function} encodeFileName the function to encode file names and comments.  // > CustomCode.jszip:629
   */  // > CustomCode.jszip:630
  function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {  // > CustomCode.jszip:631
      GenericWorker.call(this, "ZipFileWorker");  // > CustomCode.jszip:632
      // The number of bytes written so far. This doesn't count accumulated chunks.  // > CustomCode.jszip:633
      this.bytesWritten = 0;  // > CustomCode.jszip:634
      // The comment of the zip file  // > CustomCode.jszip:635
      this.zipComment = comment;  // > CustomCode.jszip:636
      // The platform "generating" the zip file.  // > CustomCode.jszip:637
      this.zipPlatform = platform;  // > CustomCode.jszip:638
      // the function to encode file names and comments.  // > CustomCode.jszip:639
      this.encodeFileName = encodeFileName;  // > CustomCode.jszip:640
      // Should we stream the content of the files ?  // > CustomCode.jszip:641
      this.streamFiles = streamFiles;  // > CustomCode.jszip:642
      // If `streamFiles` is false, we will need to accumulate the content of the  // > CustomCode.jszip:643
      // files to calculate sizes / crc32 (and write them *before* the content).  // > CustomCode.jszip:644
      // This boolean indicates if we are accumulating chunks (it will change a lot  // > CustomCode.jszip:645
      // during the lifetime of this worker).  // > CustomCode.jszip:646
      this.accumulate = false;  // > CustomCode.jszip:647
      // The buffer receiving chunks when accumulating content.  // > CustomCode.jszip:648
      this.contentBuffer = [];  // > CustomCode.jszip:649
      // The list of generated directory records.  // > CustomCode.jszip:650
      this.dirRecords = [];  // > CustomCode.jszip:651
      // The offset (in bytes) from the beginning of the zip file for the current source.  // > CustomCode.jszip:652
      this.currentSourceOffset = 0;  // > CustomCode.jszip:653
      // The total number of entries in this zip file.  // > CustomCode.jszip:654
      this.entriesCount = 0;  // > CustomCode.jszip:655
      // the name of the file currently being added, null when handling the end of the zip file.  // > CustomCode.jszip:656
      // Used for the emitted metadata.  // > CustomCode.jszip:657
      this.currentFile = null;  // > CustomCode.jszip:658
      this._sources = [];  // > CustomCode.jszip:659
  }  // > CustomCode.jszip:660
  utils.inherits(ZipFileWorker, GenericWorker);  // > CustomCode.jszip:661
  /**  // > CustomCode.jszip:662
   * @see GenericWorker.push  // > CustomCode.jszip:663
   */  // > CustomCode.jszip:664
  ZipFileWorker.prototype.push = function (chunk) {  // > CustomCode.jszip:665
      var currentFilePercent = chunk.meta.percent || 0;  // > CustomCode.jszip:666
      var entriesCount = this.entriesCount;  // > CustomCode.jszip:667
      var remainingFiles = this._sources.length;  // > CustomCode.jszip:668
      if(this.accumulate) {  // > CustomCode.jszip:669
          this.contentBuffer.push(chunk);  // > CustomCode.jszip:670
      } else {  // > CustomCode.jszip:671
          this.bytesWritten += chunk.data.length;  // > CustomCode.jszip:672
          GenericWorker.prototype.push.call(this, {  // > CustomCode.jszip:673
              data : chunk.data,  // > CustomCode.jszip:674
              meta : {  // > CustomCode.jszip:675
                  currentFile : this.currentFile,  // > CustomCode.jszip:676
                  percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100  // > CustomCode.jszip:677
              }  // > CustomCode.jszip:678
          });  // > CustomCode.jszip:679
      }  // > CustomCode.jszip:680
  };  // > CustomCode.jszip:681
  /**  // > CustomCode.jszip:682
   * The worker started a new source (an other worker).  // > CustomCode.jszip:683
   * @param {Object} streamInfo the streamInfo object from the new source.  // > CustomCode.jszip:684
   */  // > CustomCode.jszip:685
  ZipFileWorker.prototype.openedSource = function (streamInfo) {  // > CustomCode.jszip:686
      this.currentSourceOffset = this.bytesWritten;  // > CustomCode.jszip:687
      this.currentFile = streamInfo["file"].name;  // > CustomCode.jszip:688
      var streamedContent = this.streamFiles && !streamInfo["file"].dir;  // > CustomCode.jszip:689
      // don't stream folders (because they don't have any content)  // > CustomCode.jszip:690
      if(streamedContent) {  // > CustomCode.jszip:691
          var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);  // > CustomCode.jszip:692
          this.push({  // > CustomCode.jszip:693
              data : record.fileRecord,  // > CustomCode.jszip:694
              meta : {percent:0}  // > CustomCode.jszip:695
          });  // > CustomCode.jszip:696
      } else {  // > CustomCode.jszip:697
          // we need to wait for the whole file before pushing anything  // > CustomCode.jszip:698
          this.accumulate = true;  // > CustomCode.jszip:699
      }  // > CustomCode.jszip:700
  };  // > CustomCode.jszip:701
  /**  // > CustomCode.jszip:702
   * The worker finished a source (an other worker).  // > CustomCode.jszip:703
   * @param {Object} streamInfo the streamInfo object from the finished source.  // > CustomCode.jszip:704
   */  // > CustomCode.jszip:705
  ZipFileWorker.prototype.closedSource = function (streamInfo) {  // > CustomCode.jszip:706
      this.accumulate = false;  // > CustomCode.jszip:707
      var streamedContent = this.streamFiles && !streamInfo["file"].dir;  // > CustomCode.jszip:708
      var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);  // > CustomCode.jszip:709
      this.dirRecords.push(record.dirRecord);  // > CustomCode.jszip:710
      if(streamedContent) {  // > CustomCode.jszip:711
          // after the streamed file, we put data descriptors  // > CustomCode.jszip:712
          this.push({  // > CustomCode.jszip:713
              data : generateDataDescriptors(streamInfo),  // > CustomCode.jszip:714
              meta : {percent:100}  // > CustomCode.jszip:715
          });  // > CustomCode.jszip:716
      } else {  // > CustomCode.jszip:717
          // the content wasn't streamed, we need to push everything now  // > CustomCode.jszip:718
          // first the file record, then the content  // > CustomCode.jszip:719
          this.push({  // > CustomCode.jszip:720
              data : record.fileRecord,  // > CustomCode.jszip:721
              meta : {percent:0}  // > CustomCode.jszip:722
          });  // > CustomCode.jszip:723
          while(this.contentBuffer.length) {  // > CustomCode.jszip:724
              this.push(this.contentBuffer.shift());  // > CustomCode.jszip:725
          }  // > CustomCode.jszip:726
      }  // > CustomCode.jszip:727
      this.currentFile = null;  // > CustomCode.jszip:728
  };  // > CustomCode.jszip:729
  /**  // > CustomCode.jszip:730
   * @see GenericWorker.flush  // > CustomCode.jszip:731
   */  // > CustomCode.jszip:732
  ZipFileWorker.prototype.flush = function () {  // > CustomCode.jszip:733
      var localDirLength = this.bytesWritten;  // > CustomCode.jszip:734
      for(var i = 0; i < this.dirRecords.length; i++) {  // > CustomCode.jszip:735
          this.push({  // > CustomCode.jszip:736
              data : this.dirRecords[i],  // > CustomCode.jszip:737
              meta : {percent:100}  // > CustomCode.jszip:738
          });  // > CustomCode.jszip:739
      }  // > CustomCode.jszip:740
      var centralDirLength = this.bytesWritten - localDirLength;  // > CustomCode.jszip:741
      var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);  // > CustomCode.jszip:742
      this.push({  // > CustomCode.jszip:743
          data : dirEnd,  // > CustomCode.jszip:744
          meta : {percent:100}  // > CustomCode.jszip:745
      });  // > CustomCode.jszip:746
  };  // > CustomCode.jszip:747
  /**  // > CustomCode.jszip:748
   * Prepare the next source to be read.  // > CustomCode.jszip:749
   */  // > CustomCode.jszip:750
  ZipFileWorker.prototype.prepareNextSource = function () {  // > CustomCode.jszip:751
      this.previous = this._sources.shift();  // > CustomCode.jszip:752
      this.openedSource(this.previous.streamInfo);  // > CustomCode.jszip:753
      if (this.isPaused) {  // > CustomCode.jszip:754
          this.previous.pause();  // > CustomCode.jszip:755
      } else {  // > CustomCode.jszip:756
          this.previous.resume();  // > CustomCode.jszip:757
      }  // > CustomCode.jszip:758
  };  // > CustomCode.jszip:759
  /**  // > CustomCode.jszip:760
   * @see GenericWorker.registerPrevious  // > CustomCode.jszip:761
   */  // > CustomCode.jszip:762
  ZipFileWorker.prototype.registerPrevious = function (previous) {  // > CustomCode.jszip:763
      this._sources.push(previous);  // > CustomCode.jszip:764
      var self = this;  // > CustomCode.jszip:765
      previous.on("data", function (chunk) {  // > CustomCode.jszip:766
          self.processChunk(chunk);  // > CustomCode.jszip:767
      });  // > CustomCode.jszip:768
      previous.on("end", function () {  // > CustomCode.jszip:769
          self.closedSource(self.previous.streamInfo);  // > CustomCode.jszip:770
          if(self._sources.length) {  // > CustomCode.jszip:771
              self.prepareNextSource();  // > CustomCode.jszip:772
          } else {  // > CustomCode.jszip:773
              self.end();  // > CustomCode.jszip:774
          }  // > CustomCode.jszip:775
      });  // > CustomCode.jszip:776
      previous.on("error", function (e) {  // > CustomCode.jszip:777
          self.error(e);  // > CustomCode.jszip:778
      });  // > CustomCode.jszip:779
      return this;  // > CustomCode.jszip:780
  };  // > CustomCode.jszip:781
  /**  // > CustomCode.jszip:782
   * @see GenericWorker.resume  // > CustomCode.jszip:783
   */  // > CustomCode.jszip:784
  ZipFileWorker.prototype.resume = function () {  // > CustomCode.jszip:785
      if(!GenericWorker.prototype.resume.call(this)) {  // > CustomCode.jszip:786
          return false;  // > CustomCode.jszip:787
      }  // > CustomCode.jszip:788
      if (!this.previous && this._sources.length) {  // > CustomCode.jszip:789
          this.prepareNextSource();  // > CustomCode.jszip:790
          return true;  // > CustomCode.jszip:791
      }  // > CustomCode.jszip:792
      if (!this.previous && !this._sources.length && !this.generatedError) {  // > CustomCode.jszip:793
          this.end();  // > CustomCode.jszip:794
          return true;  // > CustomCode.jszip:795
      }  // > CustomCode.jszip:796
  };  // > CustomCode.jszip:797
  /**  // > CustomCode.jszip:798
   * @see GenericWorker.error  // > CustomCode.jszip:799
   */  // > CustomCode.jszip:800
  ZipFileWorker.prototype.error = function (e) {  // > CustomCode.jszip:801
      var sources = this._sources;  // > CustomCode.jszip:802
      if(!GenericWorker.prototype.error.call(this, e)) {  // > CustomCode.jszip:803
          return false;  // > CustomCode.jszip:804
      }  // > CustomCode.jszip:805
      for(var i = 0; i < sources.length; i++) {  // > CustomCode.jszip:806
          try {  // > CustomCode.jszip:807
              sources[i].error(e);  // > CustomCode.jszip:808
          } catch(e) {  // > CustomCode.jszip:809
              // the `error` exploded, nothing to do  // > CustomCode.jszip:810
          }  // > CustomCode.jszip:811
      }  // > CustomCode.jszip:812
      return true;  // > CustomCode.jszip:813
  };  // > CustomCode.jszip:814
  /**  // > CustomCode.jszip:815
   * @see GenericWorker.lock  // > CustomCode.jszip:816
   */  // > CustomCode.jszip:817
  ZipFileWorker.prototype.lock = function () {  // > CustomCode.jszip:818
      GenericWorker.prototype.lock.call(this);  // > CustomCode.jszip:819
      var sources = this._sources;  // > CustomCode.jszip:820
      for(var i = 0; i < sources.length; i++) {  // > CustomCode.jszip:821
          sources[i].lock();  // > CustomCode.jszip:822
      }  // > CustomCode.jszip:823
  };  // > CustomCode.jszip:824
  module.exports = ZipFileWorker;  // > CustomCode.jszip:825
  },{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(require,module,exports){  // > CustomCode.jszip:826
  "use strict";  // > CustomCode.jszip:827
  var compressions = require("../compressions");  // > CustomCode.jszip:828
  var ZipFileWorker = require("./ZipFileWorker");  // > CustomCode.jszip:829
  /**  // > CustomCode.jszip:830
   * Find the compression to use.  // > CustomCode.jszip:831
   * @param {String} fileCompression the compression defined at the file level, if any.  // > CustomCode.jszip:832
   * @param {String} zipCompression the compression defined at the load() level.  // > CustomCode.jszip:833
   * @return {Object} the compression object to use.  // > CustomCode.jszip:834
   */  // > CustomCode.jszip:835
  var getCompression = function (fileCompression, zipCompression) {  // > CustomCode.jszip:836
      var compressionName = fileCompression || zipCompression;  // > CustomCode.jszip:837
      var compression = compressions[compressionName];  // > CustomCode.jszip:838
      if (!compression) {  // > CustomCode.jszip:839
          throw new Error(compressionName + " is not a valid compression method !");  // > CustomCode.jszip:840
      }  // > CustomCode.jszip:841
      return compression;  // > CustomCode.jszip:842
  };  // > CustomCode.jszip:843
  /**  // > CustomCode.jszip:844
   * Create a worker to generate a zip file.  // > CustomCode.jszip:845
   * @param {JSZip} zip the JSZip instance at the right root level.  // > CustomCode.jszip:846
   * @param {Object} options to generate the zip file.  // > CustomCode.jszip:847
   * @param {String} comment the comment to use.  // > CustomCode.jszip:848
   */  // > CustomCode.jszip:849
  exports.generateWorker = function (zip, options, comment) {  // > CustomCode.jszip:850
      var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);  // > CustomCode.jszip:851
      var entriesCount = 0;  // > CustomCode.jszip:852
      try {  // > CustomCode.jszip:853
          zip.forEach(function (relativePath, file) {  // > CustomCode.jszip:854
              entriesCount++;  // > CustomCode.jszip:855
              var compression = getCompression(file.options.compression, options.compression);  // > CustomCode.jszip:856
              var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};  // > CustomCode.jszip:857
              var dir = file.dir, date = file.date;  // > CustomCode.jszip:858
              file._compressWorker(compression, compressionOptions)  // > CustomCode.jszip:859
                  .withStreamInfo("file", {  // > CustomCode.jszip:860
                      name : relativePath,  // > CustomCode.jszip:861
                      dir : dir,  // > CustomCode.jszip:862
                      date : date,  // > CustomCode.jszip:863
                      comment : file.comment || "",  // > CustomCode.jszip:864
                      unixPermissions : file.unixPermissions,  // > CustomCode.jszip:865
                      dosPermissions : file.dosPermissions  // > CustomCode.jszip:866
                  })  // > CustomCode.jszip:867
                  .pipe(zipFileWorker);  // > CustomCode.jszip:868
          });  // > CustomCode.jszip:869
          zipFileWorker.entriesCount = entriesCount;  // > CustomCode.jszip:870
      } catch (e) {  // > CustomCode.jszip:871
          zipFileWorker.error(e);  // > CustomCode.jszip:872
      }  // > CustomCode.jszip:873
      return zipFileWorker;  // > CustomCode.jszip:874
  };  // > CustomCode.jszip:875
  },{"../compressions":3,"./ZipFileWorker":8}],10:[function(require,module,exports){  // > CustomCode.jszip:876
  "use strict";  // > CustomCode.jszip:877
  /**  // > CustomCode.jszip:878
   * Representation a of zip file in js  // > CustomCode.jszip:879
   * @constructor  // > CustomCode.jszip:880
   */  // > CustomCode.jszip:881
  function JSZip() {  // > CustomCode.jszip:882
      // if this constructor is used without `new`, it adds `new` before itself:  // > CustomCode.jszip:883
      if(!(this instanceof JSZip)) {  // > CustomCode.jszip:884
          return new JSZip();  // > CustomCode.jszip:885
      }  // > CustomCode.jszip:886
      if(arguments.length) {  // > CustomCode.jszip:887
          throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");  // > CustomCode.jszip:888
      }  // > CustomCode.jszip:889
      // object containing the files :  // > CustomCode.jszip:890
      // {  // > CustomCode.jszip:891
      //   "folder/" : {...},  // > CustomCode.jszip:892
      //   "folder/data.txt" : {...}  // > CustomCode.jszip:893
      // }  // > CustomCode.jszip:894
      // NOTE: we use a null prototype because we do not  // > CustomCode.jszip:895
      // want filenames like "toString" coming from a zip file  // > CustomCode.jszip:896
      // to overwrite methods and attributes in a normal Object.  // > CustomCode.jszip:897
      this.files = Object.create(null);  // > CustomCode.jszip:898
      this.comment = null;  // > CustomCode.jszip:899
      // Where we are in the hierarchy  // > CustomCode.jszip:900
      this.root = "";  // > CustomCode.jszip:901
      this.clone = function() {  // > CustomCode.jszip:902
          var newObj = new JSZip();  // > CustomCode.jszip:903
          for (var i in this) {  // > CustomCode.jszip:904
              if (typeof this[i] !== "function") {  // > CustomCode.jszip:905
                  newObj[i] = this[i];  // > CustomCode.jszip:906
              }  // > CustomCode.jszip:907
          }  // > CustomCode.jszip:908
          return newObj;  // > CustomCode.jszip:909
      };  // > CustomCode.jszip:910
  }  // > CustomCode.jszip:911
  JSZip.prototype = require("./object");  // > CustomCode.jszip:912
  JSZip.prototype.loadAsync = require("./load");  // > CustomCode.jszip:913
  JSZip.support = require("./support");  // > CustomCode.jszip:914
  JSZip.defaults = require("./defaults");  // > CustomCode.jszip:915
  // TODO find a better way to handle this version,  // > CustomCode.jszip:916
  // a require('package.json').version doesn't work with webpack, see #327  // > CustomCode.jszip:917
  JSZip.version = "3.10.1";  // > CustomCode.jszip:918
  JSZip.loadAsync = function (content, options) {  // > CustomCode.jszip:919
      return new JSZip().loadAsync(content, options);  // > CustomCode.jszip:920
  };  // > CustomCode.jszip:921
  JSZip.external = require("./external");  // > CustomCode.jszip:922
  module.exports = JSZip;  // > CustomCode.jszip:923
  },{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(require,module,exports){  // > CustomCode.jszip:924
  "use strict";  // > CustomCode.jszip:925
  var utils = require("./utils");  // > CustomCode.jszip:926
  var external = require("./external");  // > CustomCode.jszip:927
  var utf8 = require("./utf8");  // > CustomCode.jszip:928
  var ZipEntries = require("./zipEntries");  // > CustomCode.jszip:929
  var Crc32Probe = require("./stream/Crc32Probe");  // > CustomCode.jszip:930
  var nodejsUtils = require("./nodejsUtils");  // > CustomCode.jszip:931
  /**  // > CustomCode.jszip:932
   * Check the CRC32 of an entry.  // > CustomCode.jszip:933
   * @param {ZipEntry} zipEntry the zip entry to check.  // > CustomCode.jszip:934
   * @return {Promise} the result.  // > CustomCode.jszip:935
   */  // > CustomCode.jszip:936
  function checkEntryCRC32(zipEntry) {  // > CustomCode.jszip:937
      return new external.Promise(function (resolve, reject) {  // > CustomCode.jszip:938
          var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());  // > CustomCode.jszip:939
          worker.on("error", function (e) {  // > CustomCode.jszip:940
              reject(e);  // > CustomCode.jszip:941
          })  // > CustomCode.jszip:942
              .on("end", function () {  // > CustomCode.jszip:943
                  if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {  // > CustomCode.jszip:944
                      reject(new Error("Corrupted zip : CRC32 mismatch"));  // > CustomCode.jszip:945
                  } else {  // > CustomCode.jszip:946
                      resolve();  // > CustomCode.jszip:947
                  }  // > CustomCode.jszip:948
              })  // > CustomCode.jszip:949
              .resume();  // > CustomCode.jszip:950
      });  // > CustomCode.jszip:951
  }  // > CustomCode.jszip:952
  module.exports = function (data, options) {  // > CustomCode.jszip:953
      var zip = this;  // > CustomCode.jszip:954
      options = utils.extend(options || {}, {  // > CustomCode.jszip:955
          base64: false,  // > CustomCode.jszip:956
          checkCRC32: false,  // > CustomCode.jszip:957
          optimizedBinaryString: false,  // > CustomCode.jszip:958
          createFolders: false,  // > CustomCode.jszip:959
          decodeFileName: utf8.utf8decode  // > CustomCode.jszip:960
      });  // > CustomCode.jszip:961
      if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {  // > CustomCode.jszip:962
          return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));  // > CustomCode.jszip:963
      }  // > CustomCode.jszip:964
      return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)  // > CustomCode.jszip:965
          .then(function (data) {  // > CustomCode.jszip:966
              var zipEntries = new ZipEntries(options);  // > CustomCode.jszip:967
              zipEntries.load(data);  // > CustomCode.jszip:968
              return zipEntries;  // > CustomCode.jszip:969
          }).then(function checkCRC32(zipEntries) {  // > CustomCode.jszip:970
              var promises = [external.Promise.resolve(zipEntries)];  // > CustomCode.jszip:971
              var files = zipEntries.files;  // > CustomCode.jszip:972
              if (options.checkCRC32) {  // > CustomCode.jszip:973
                  for (var i = 0; i < files.length; i++) {  // > CustomCode.jszip:974
                      promises.push(checkEntryCRC32(files[i]));  // > CustomCode.jszip:975
                  }  // > CustomCode.jszip:976
              }  // > CustomCode.jszip:977
              return external.Promise.all(promises);  // > CustomCode.jszip:978
          }).then(function addFiles(results) {  // > CustomCode.jszip:979
              var zipEntries = results.shift();  // > CustomCode.jszip:980
              var files = zipEntries.files;  // > CustomCode.jszip:981
              for (var i = 0; i < files.length; i++) {  // > CustomCode.jszip:982
                  var input = files[i];  // > CustomCode.jszip:983
                  var unsafeName = input.fileNameStr;  // > CustomCode.jszip:984
                  var safeName = utils.resolve(input.fileNameStr);  // > CustomCode.jszip:985
                  zip.file(safeName, input.decompressed, {  // > CustomCode.jszip:986
                      binary: true,  // > CustomCode.jszip:987
                      optimizedBinaryString: true,  // > CustomCode.jszip:988
                      date: input.date,  // > CustomCode.jszip:989
                      dir: input.dir,  // > CustomCode.jszip:990
                      comment: input.fileCommentStr.length ? input.fileCommentStr : null,  // > CustomCode.jszip:991
                      unixPermissions: input.unixPermissions,  // > CustomCode.jszip:992
                      dosPermissions: input.dosPermissions,  // > CustomCode.jszip:993
                      createFolders: options.createFolders  // > CustomCode.jszip:994
                  });  // > CustomCode.jszip:995
                  if (!input.dir) {  // > CustomCode.jszip:996
                      zip.file(safeName).unsafeOriginalName = unsafeName;  // > CustomCode.jszip:997
                  }  // > CustomCode.jszip:998
              }  // > CustomCode.jszip:999
              if (zipEntries.zipComment.length) {  // > CustomCode.jszip:1000
                  zip.comment = zipEntries.zipComment;  // > CustomCode.jszip:1001
              }  // > CustomCode.jszip:1002
              return zip;  // > CustomCode.jszip:1003
          });  // > CustomCode.jszip:1004
  };  // > CustomCode.jszip:1005
  },{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(require,module,exports){  // > CustomCode.jszip:1006
  "use strict";  // > CustomCode.jszip:1007
  var utils = require("../utils");  // > CustomCode.jszip:1008
  var GenericWorker = require("../stream/GenericWorker");  // > CustomCode.jszip:1009
  /**  // > CustomCode.jszip:1010
   * A worker that use a nodejs stream as source.  // > CustomCode.jszip:1011
   * @constructor  // > CustomCode.jszip:1012
   * @param {String} filename the name of the file entry for this stream.  // > CustomCode.jszip:1013
   * @param {Readable} stream the nodejs stream.  // > CustomCode.jszip:1014
   */  // > CustomCode.jszip:1015
  function NodejsStreamInputAdapter(filename, stream) {  // > CustomCode.jszip:1016
      GenericWorker.call(this, "Nodejs stream input adapter for " + filename);  // > CustomCode.jszip:1017
      this._upstreamEnded = false;  // > CustomCode.jszip:1018
      this._bindStream(stream);  // > CustomCode.jszip:1019
  }  // > CustomCode.jszip:1020
  utils.inherits(NodejsStreamInputAdapter, GenericWorker);  // > CustomCode.jszip:1021
  /**  // > CustomCode.jszip:1022
   * Prepare the stream and bind the callbacks on it.  // > CustomCode.jszip:1023
   * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.  // > CustomCode.jszip:1024
   * @param {Stream} stream the nodejs stream to use.  // > CustomCode.jszip:1025
   */  // > CustomCode.jszip:1026
  NodejsStreamInputAdapter.prototype._bindStream = function (stream) {  // > CustomCode.jszip:1027
      var self = this;  // > CustomCode.jszip:1028
      this._stream = stream;  // > CustomCode.jszip:1029
      stream.pause();  // > CustomCode.jszip:1030
      stream  // > CustomCode.jszip:1031
          .on("data", function (chunk) {  // > CustomCode.jszip:1032
              self.push({  // > CustomCode.jszip:1033
                  data: chunk,  // > CustomCode.jszip:1034
                  meta : {  // > CustomCode.jszip:1035
                      percent : 0  // > CustomCode.jszip:1036
                  }  // > CustomCode.jszip:1037
              });  // > CustomCode.jszip:1038
          })  // > CustomCode.jszip:1039
          .on("error", function (e) {  // > CustomCode.jszip:1040
              if(self.isPaused) {  // > CustomCode.jszip:1041
                  this.generatedError = e;  // > CustomCode.jszip:1042
              } else {  // > CustomCode.jszip:1043
                  self.error(e);  // > CustomCode.jszip:1044
              }  // > CustomCode.jszip:1045
          })  // > CustomCode.jszip:1046
          .on("end", function () {  // > CustomCode.jszip:1047
              if(self.isPaused) {  // > CustomCode.jszip:1048
                  self._upstreamEnded = true;  // > CustomCode.jszip:1049
              } else {  // > CustomCode.jszip:1050
                  self.end();  // > CustomCode.jszip:1051
              }  // > CustomCode.jszip:1052
          });  // > CustomCode.jszip:1053
  };  // > CustomCode.jszip:1054
  NodejsStreamInputAdapter.prototype.pause = function () {  // > CustomCode.jszip:1055
      if(!GenericWorker.prototype.pause.call(this)) {  // > CustomCode.jszip:1056
          return false;  // > CustomCode.jszip:1057
      }  // > CustomCode.jszip:1058
      this._stream.pause();  // > CustomCode.jszip:1059
      return true;  // > CustomCode.jszip:1060
  };  // > CustomCode.jszip:1061
  NodejsStreamInputAdapter.prototype.resume = function () {  // > CustomCode.jszip:1062
      if(!GenericWorker.prototype.resume.call(this)) {  // > CustomCode.jszip:1063
          return false;  // > CustomCode.jszip:1064
      }  // > CustomCode.jszip:1065
      if(this._upstreamEnded) {  // > CustomCode.jszip:1066
          this.end();  // > CustomCode.jszip:1067
      } else {  // > CustomCode.jszip:1068
          this._stream.resume();  // > CustomCode.jszip:1069
      }  // > CustomCode.jszip:1070
      return true;  // > CustomCode.jszip:1071
  };  // > CustomCode.jszip:1072
  module.exports = NodejsStreamInputAdapter;  // > CustomCode.jszip:1073
  },{"../stream/GenericWorker":28,"../utils":32}],13:[function(require,module,exports){  // > CustomCode.jszip:1074
  "use strict";  // > CustomCode.jszip:1075
  var Readable = require("readable-stream").Readable;  // > CustomCode.jszip:1076
  var utils = require("../utils");  // > CustomCode.jszip:1077
  utils.inherits(NodejsStreamOutputAdapter, Readable);  // > CustomCode.jszip:1078
  /**  // > CustomCode.jszip:1079
  * A nodejs stream using a worker as source.  // > CustomCode.jszip:1080
  * @see the SourceWrapper in http://nodejs.org/api/stream.html  // > CustomCode.jszip:1081
  * @constructor  // > CustomCode.jszip:1082
  * @param {StreamHelper} helper the helper wrapping the worker  // > CustomCode.jszip:1083
  * @param {Object} options the nodejs stream options  // > CustomCode.jszip:1084
  * @param {Function} updateCb the update callback.  // > CustomCode.jszip:1085
  */  // > CustomCode.jszip:1086
  function NodejsStreamOutputAdapter(helper, options, updateCb) {  // > CustomCode.jszip:1087
      Readable.call(this, options);  // > CustomCode.jszip:1088
      this._helper = helper;  // > CustomCode.jszip:1089
      var self = this;  // > CustomCode.jszip:1090
      helper.on("data", function (data, meta) {  // > CustomCode.jszip:1091
          if (!self.push(data)) {  // > CustomCode.jszip:1092
              self._helper.pause();  // > CustomCode.jszip:1093
          }  // > CustomCode.jszip:1094
          if(updateCb) {  // > CustomCode.jszip:1095
              updateCb(meta);  // > CustomCode.jszip:1096
          }  // > CustomCode.jszip:1097
      })  // > CustomCode.jszip:1098
          .on("error", function(e) {  // > CustomCode.jszip:1099
              self.emit("error", e);  // > CustomCode.jszip:1100
          })  // > CustomCode.jszip:1101
          .on("end", function () {  // > CustomCode.jszip:1102
              self.push(null);  // > CustomCode.jszip:1103
          });  // > CustomCode.jszip:1104
  }  // > CustomCode.jszip:1105
  NodejsStreamOutputAdapter.prototype._read = function() {  // > CustomCode.jszip:1106
      this._helper.resume();  // > CustomCode.jszip:1107
  };  // > CustomCode.jszip:1108
  module.exports = NodejsStreamOutputAdapter;  // > CustomCode.jszip:1109
  },{"../utils":32,"readable-stream":16}],14:[function(require,module,exports){  // > CustomCode.jszip:1110
  "use strict";  // > CustomCode.jszip:1111
  module.exports = {  // > CustomCode.jszip:1112
      /**  // > CustomCode.jszip:1113
       * True if this is running in Nodejs, will be undefined in a browser.  // > CustomCode.jszip:1114
       * In a browser, browserify won't include this file and the whole module  // > CustomCode.jszip:1115
       * will be resolved an empty object.  // > CustomCode.jszip:1116
       */  // > CustomCode.jszip:1117
      isNode : typeof Buffer !== "undefined",  // > CustomCode.jszip:1118
      /**  // > CustomCode.jszip:1119
       * Create a new nodejs Buffer from an existing content.  // > CustomCode.jszip:1120
       * @param {Object} data the data to pass to the constructor.  // > CustomCode.jszip:1121
       * @param {String} encoding the encoding to use.  // > CustomCode.jszip:1122
       * @return {Buffer} a new Buffer.  // > CustomCode.jszip:1123
       */  // > CustomCode.jszip:1124
      newBufferFrom: function(data, encoding) {  // > CustomCode.jszip:1125
          if (Buffer.from && Buffer.from !== Uint8Array.from) {  // > CustomCode.jszip:1126
              return Buffer.from(data, encoding);  // > CustomCode.jszip:1127
          } else {  // > CustomCode.jszip:1128
              if (typeof data === "number") {  // > CustomCode.jszip:1129
                  // Safeguard for old Node.js versions. On newer versions,  // > CustomCode.jszip:1130
                  // Buffer.from(number) / Buffer(number, encoding) already throw.  // > CustomCode.jszip:1131
                  throw new Error("The \"data\" argument must not be a number");  // > CustomCode.jszip:1132
              }  // > CustomCode.jszip:1133
              return new Buffer(data, encoding);  // > CustomCode.jszip:1134
          }  // > CustomCode.jszip:1135
      },  // > CustomCode.jszip:1136
      /**  // > CustomCode.jszip:1137
       * Create a new nodejs Buffer with the specified size.  // > CustomCode.jszip:1138
       * @param {Integer} size the size of the buffer.  // > CustomCode.jszip:1139
       * @return {Buffer} a new Buffer.  // > CustomCode.jszip:1140
       */  // > CustomCode.jszip:1141
      allocBuffer: function (size) {  // > CustomCode.jszip:1142
          if (Buffer.alloc) {  // > CustomCode.jszip:1143
              return Buffer.alloc(size);  // > CustomCode.jszip:1144
          } else {  // > CustomCode.jszip:1145
              var buf = new Buffer(size);  // > CustomCode.jszip:1146
              buf.fill(0);  // > CustomCode.jszip:1147
              return buf;  // > CustomCode.jszip:1148
          }  // > CustomCode.jszip:1149
      },  // > CustomCode.jszip:1150
      /**  // > CustomCode.jszip:1151
       * Find out if an object is a Buffer.  // > CustomCode.jszip:1152
       * @param {Object} b the object to test.  // > CustomCode.jszip:1153
       * @return {Boolean} true if the object is a Buffer, false otherwise.  // > CustomCode.jszip:1154
       */  // > CustomCode.jszip:1155
      isBuffer : function(b){  // > CustomCode.jszip:1156
          return Buffer.isBuffer(b);  // > CustomCode.jszip:1157
      },  // > CustomCode.jszip:1158
      isStream : function (obj) {  // > CustomCode.jszip:1159
          return obj &&  // > CustomCode.jszip:1160
              typeof obj.on === "function" &&  // > CustomCode.jszip:1161
              typeof obj.pause === "function" &&  // > CustomCode.jszip:1162
              typeof obj.resume === "function";  // > CustomCode.jszip:1163
      }  // > CustomCode.jszip:1164
  };  // > CustomCode.jszip:1165
  },{}],15:[function(require,module,exports){  // > CustomCode.jszip:1166
  "use strict";  // > CustomCode.jszip:1167
  var utf8 = require("./utf8");  // > CustomCode.jszip:1168
  var utils = require("./utils");  // > CustomCode.jszip:1169
  var GenericWorker = require("./stream/GenericWorker");  // > CustomCode.jszip:1170
  var StreamHelper = require("./stream/StreamHelper");  // > CustomCode.jszip:1171
  var defaults = require("./defaults");  // > CustomCode.jszip:1172
  var CompressedObject = require("./compressedObject");  // > CustomCode.jszip:1173
  var ZipObject = require("./zipObject");  // > CustomCode.jszip:1174
  var generate = require("./generate");  // > CustomCode.jszip:1175
  var nodejsUtils = require("./nodejsUtils");  // > CustomCode.jszip:1176
  var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");  // > CustomCode.jszip:1177
  /**  // > CustomCode.jszip:1178
   * Add a file in the current folder.  // > CustomCode.jszip:1179
   * @private  // > CustomCode.jszip:1180
   * @param {string} name the name of the file  // > CustomCode.jszip:1181
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file  // > CustomCode.jszip:1182
   * @param {Object} originalOptions the options of the file  // > CustomCode.jszip:1183
   * @return {Object} the new file.  // > CustomCode.jszip:1184
   */  // > CustomCode.jszip:1185
  var fileAdd = function(name, data, originalOptions) {  // > CustomCode.jszip:1186
      // be sure sub folders exist  // > CustomCode.jszip:1187
      var dataType = utils.getTypeOf(data),  // > CustomCode.jszip:1188
          parent;  // > CustomCode.jszip:1189
      /*  // > CustomCode.jszip:1190
       * Correct options.  // > CustomCode.jszip:1191
       */  // > CustomCode.jszip:1192
      var o = utils.extend(originalOptions || {}, defaults);  // > CustomCode.jszip:1193
      o.date = o.date || new Date();  // > CustomCode.jszip:1194
      if (o.compression !== null) {  // > CustomCode.jszip:1195
          o.compression = o.compression.toUpperCase();  // > CustomCode.jszip:1196
      }  // > CustomCode.jszip:1197
      if (typeof o.unixPermissions === "string") {  // > CustomCode.jszip:1198
          o.unixPermissions = parseInt(o.unixPermissions, 8);  // > CustomCode.jszip:1199
      }  // > CustomCode.jszip:1200
      // UNX_IFDIR  0040000 see zipinfo.c  // > CustomCode.jszip:1201
      if (o.unixPermissions && (o.unixPermissions & 0x4000)) {  // > CustomCode.jszip:1202
          o.dir = true;  // > CustomCode.jszip:1203
      }  // > CustomCode.jszip:1204
      // Bit 4    Directory  // > CustomCode.jszip:1205
      if (o.dosPermissions && (o.dosPermissions & 0x0010)) {  // > CustomCode.jszip:1206
          o.dir = true;  // > CustomCode.jszip:1207
      }  // > CustomCode.jszip:1208
      if (o.dir) {  // > CustomCode.jszip:1209
          name = forceTrailingSlash(name);  // > CustomCode.jszip:1210
      }  // > CustomCode.jszip:1211
      if (o.createFolders && (parent = parentFolder(name))) {  // > CustomCode.jszip:1212
          folderAdd.call(this, parent, true);  // > CustomCode.jszip:1213
      }  // > CustomCode.jszip:1214
      var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;  // > CustomCode.jszip:1215
      if (!originalOptions || typeof originalOptions.binary === "undefined") {  // > CustomCode.jszip:1216
          o.binary = !isUnicodeString;  // > CustomCode.jszip:1217
      }  // > CustomCode.jszip:1218
      var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;  // > CustomCode.jszip:1219
      if (isCompressedEmpty || o.dir || !data || data.length === 0) {  // > CustomCode.jszip:1220
          o.base64 = false;  // > CustomCode.jszip:1221
          o.binary = true;  // > CustomCode.jszip:1222
          data = "";  // > CustomCode.jszip:1223
          o.compression = "STORE";  // > CustomCode.jszip:1224
          dataType = "string";  // > CustomCode.jszip:1225
      }  // > CustomCode.jszip:1226
      /*  // > CustomCode.jszip:1227
       * Convert content to fit.  // > CustomCode.jszip:1228
       */  // > CustomCode.jszip:1229
      var zipObjectContent = null;  // > CustomCode.jszip:1230
      if (data instanceof CompressedObject || data instanceof GenericWorker) {  // > CustomCode.jszip:1231
          zipObjectContent = data;  // > CustomCode.jszip:1232
      } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {  // > CustomCode.jszip:1233
          zipObjectContent = new NodejsStreamInputAdapter(name, data);  // > CustomCode.jszip:1234
      } else {  // > CustomCode.jszip:1235
          zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);  // > CustomCode.jszip:1236
      }  // > CustomCode.jszip:1237
      var object = new ZipObject(name, zipObjectContent, o);  // > CustomCode.jszip:1238
      this.files[name] = object;  // > CustomCode.jszip:1239
      /*  // > CustomCode.jszip:1240
      TODO: we can't throw an exception because we have async promises  // > CustomCode.jszip:1241
      (we can have a promise of a Date() for example) but returning a  // > CustomCode.jszip:1242
      promise is useless because file(name, data) returns the JSZip  // > CustomCode.jszip:1243
      object for chaining. Should we break that to allow the user  // > CustomCode.jszip:1244
      to catch the error ?  // > CustomCode.jszip:1245
      return external.Promise.resolve(zipObjectContent)  // > CustomCode.jszip:1246
      .then(function () {  // > CustomCode.jszip:1247
          return object;  // > CustomCode.jszip:1248
      });  // > CustomCode.jszip:1249
      */  // > CustomCode.jszip:1250
  };  // > CustomCode.jszip:1251
  /**  // > CustomCode.jszip:1252
   * Find the parent folder of the path.  // > CustomCode.jszip:1253
   * @private  // > CustomCode.jszip:1254
   * @param {string} path the path to use  // > CustomCode.jszip:1255
   * @return {string} the parent folder, or ""  // > CustomCode.jszip:1256
   */  // > CustomCode.jszip:1257
  var parentFolder = function (path) {  // > CustomCode.jszip:1258
      if (path.slice(-1) === "/") {  // > CustomCode.jszip:1259
          path = path.substring(0, path.length - 1);  // > CustomCode.jszip:1260
      }  // > CustomCode.jszip:1261
      var lastSlash = path.lastIndexOf("/");  // > CustomCode.jszip:1262
      return (lastSlash > 0) ? path.substring(0, lastSlash) : "";  // > CustomCode.jszip:1263
  };  // > CustomCode.jszip:1264
  /**  // > CustomCode.jszip:1265
   * Returns the path with a slash at the end.  // > CustomCode.jszip:1266
   * @private  // > CustomCode.jszip:1267
   * @param {String} path the path to check.  // > CustomCode.jszip:1268
   * @return {String} the path with a trailing slash.  // > CustomCode.jszip:1269
   */  // > CustomCode.jszip:1270
  var forceTrailingSlash = function(path) {  // > CustomCode.jszip:1271
      // Check the name ends with a /  // > CustomCode.jszip:1272
      if (path.slice(-1) !== "/") {  // > CustomCode.jszip:1273
          path += "/"; // IE doesn't like substr(-1)  // > CustomCode.jszip:1274
      }  // > CustomCode.jszip:1275
      return path;  // > CustomCode.jszip:1276
  };  // > CustomCode.jszip:1277
  /**  // > CustomCode.jszip:1278
   * Add a (sub) folder in the current folder.  // > CustomCode.jszip:1279
   * @private  // > CustomCode.jszip:1280
   * @param {string} name the folder's name  // > CustomCode.jszip:1281
   * @param {boolean=} [createFolders] If true, automatically create sub  // > CustomCode.jszip:1282
   *  folders. Defaults to false.  // > CustomCode.jszip:1283
   * @return {Object} the new folder.  // > CustomCode.jszip:1284
   */  // > CustomCode.jszip:1285
  var folderAdd = function(name, createFolders) {  // > CustomCode.jszip:1286
      createFolders = (typeof createFolders !== "undefined") ? createFolders : defaults.createFolders;  // > CustomCode.jszip:1287
      name = forceTrailingSlash(name);  // > CustomCode.jszip:1288
      // Does this folder already exist?  // > CustomCode.jszip:1289
      if (!this.files[name]) {  // > CustomCode.jszip:1290
          fileAdd.call(this, name, null, {  // > CustomCode.jszip:1291
              dir: true,  // > CustomCode.jszip:1292
              createFolders: createFolders  // > CustomCode.jszip:1293
          });  // > CustomCode.jszip:1294
      }  // > CustomCode.jszip:1295
      return this.files[name];  // > CustomCode.jszip:1296
  };  // > CustomCode.jszip:1297
  /**  // > CustomCode.jszip:1298
  * Cross-window, cross-Node-context regular expression detection  // > CustomCode.jszip:1299
  * @param  {Object}  object Anything  // > CustomCode.jszip:1300
  * @return {Boolean}        true if the object is a regular expression,  // > CustomCode.jszip:1301
  * false otherwise  // > CustomCode.jszip:1302
  */  // > CustomCode.jszip:1303
  function isRegExp(object) {  // > CustomCode.jszip:1304
      return Object.prototype.toString.call(object) === "[object RegExp]";  // > CustomCode.jszip:1305
  }  // > CustomCode.jszip:1306
  // return the actual prototype of JSZip  // > CustomCode.jszip:1307
  var out = {  // > CustomCode.jszip:1308
      /**  // > CustomCode.jszip:1309
       * @see loadAsync  // > CustomCode.jszip:1310
       */  // > CustomCode.jszip:1311
      load: function() {  // > CustomCode.jszip:1312
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");  // > CustomCode.jszip:1313
      },  // > CustomCode.jszip:1314
      /**  // > CustomCode.jszip:1315
       * Call a callback function for each entry at this folder level.  // > CustomCode.jszip:1316
       * @param {Function} cb the callback function:  // > CustomCode.jszip:1317
       * function (relativePath, file) {...}  // > CustomCode.jszip:1318
       * It takes 2 arguments : the relative path and the file.  // > CustomCode.jszip:1319
       */  // > CustomCode.jszip:1320
      forEach: function(cb) {  // > CustomCode.jszip:1321
          var filename, relativePath, file;  // > CustomCode.jszip:1322
          // ignore warning about unwanted properties because this.files is a null prototype object  // > CustomCode.jszip:1323
          /* eslint-disable-next-line guard-for-in */  // > CustomCode.jszip:1324
          for (filename in this.files) {  // > CustomCode.jszip:1325
              file = this.files[filename];  // > CustomCode.jszip:1326
              relativePath = filename.slice(this.root.length, filename.length);  // > CustomCode.jszip:1327
              if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root  // > CustomCode.jszip:1328
                  cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...  // > CustomCode.jszip:1329
              }  // > CustomCode.jszip:1330
          }  // > CustomCode.jszip:1331
      },  // > CustomCode.jszip:1332
      /**  // > CustomCode.jszip:1333
       * Filter nested files/folders with the specified function.  // > CustomCode.jszip:1334
       * @param {Function} search the predicate to use :  // > CustomCode.jszip:1335
       * function (relativePath, file) {...}  // > CustomCode.jszip:1336
       * It takes 2 arguments : the relative path and the file.  // > CustomCode.jszip:1337
       * @return {Array} An array of matching elements.  // > CustomCode.jszip:1338
       */  // > CustomCode.jszip:1339
      filter: function(search) {  // > CustomCode.jszip:1340
          var result = [];  // > CustomCode.jszip:1341
          this.forEach(function (relativePath, entry) {  // > CustomCode.jszip:1342
              if (search(relativePath, entry)) { // the file matches the function  // > CustomCode.jszip:1343
                  result.push(entry);  // > CustomCode.jszip:1344
              }  // > CustomCode.jszip:1345
          });  // > CustomCode.jszip:1346
          return result;  // > CustomCode.jszip:1347
      },  // > CustomCode.jszip:1348
      /**  // > CustomCode.jszip:1349
       * Add a file to the zip file, or search a file.  // > CustomCode.jszip:1350
       * @param   {string|RegExp} name The name of the file to add (if data is defined),  // > CustomCode.jszip:1351
       * the name of the file to find (if no data) or a regex to match files.  // > CustomCode.jszip:1352
       * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded  // > CustomCode.jszip:1353
       * @param   {Object} o     File options  // > CustomCode.jszip:1354
       * @return  {JSZip|Object|Array} this JSZip object (when adding a file),  // > CustomCode.jszip:1355
       * a file (when searching by string) or an array of files (when searching by regex).  // > CustomCode.jszip:1356
       */  // > CustomCode.jszip:1357
      file: function(name, data, o) {  // > CustomCode.jszip:1358
          if (arguments.length === 1) {  // > CustomCode.jszip:1359
              if (isRegExp(name)) {  // > CustomCode.jszip:1360
                  var regexp = name;  // > CustomCode.jszip:1361
                  return this.filter(function(relativePath, file) {  // > CustomCode.jszip:1362
                      return !file.dir && regexp.test(relativePath);  // > CustomCode.jszip:1363
                  });  // > CustomCode.jszip:1364
              }  // > CustomCode.jszip:1365
              else { // text  // > CustomCode.jszip:1366
                  var obj = this.files[this.root + name];  // > CustomCode.jszip:1367
                  if (obj && !obj.dir) {  // > CustomCode.jszip:1368
                      return obj;  // > CustomCode.jszip:1369
                  } else {  // > CustomCode.jszip:1370
                      return null;  // > CustomCode.jszip:1371
                  }  // > CustomCode.jszip:1372
              }  // > CustomCode.jszip:1373
          }  // > CustomCode.jszip:1374
          else { // more than one argument : we have data !  // > CustomCode.jszip:1375
              name = this.root + name;  // > CustomCode.jszip:1376
              fileAdd.call(this, name, data, o);  // > CustomCode.jszip:1377
          }  // > CustomCode.jszip:1378
          return this;  // > CustomCode.jszip:1379
      },  // > CustomCode.jszip:1380
      /**  // > CustomCode.jszip:1381
       * Add a directory to the zip file, or search.  // > CustomCode.jszip:1382
       * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.  // > CustomCode.jszip:1383
       * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.  // > CustomCode.jszip:1384
       */  // > CustomCode.jszip:1385
      folder: function(arg) {  // > CustomCode.jszip:1386
          if (!arg) {  // > CustomCode.jszip:1387
              return this;  // > CustomCode.jszip:1388
          }  // > CustomCode.jszip:1389
          if (isRegExp(arg)) {  // > CustomCode.jszip:1390
              return this.filter(function(relativePath, file) {  // > CustomCode.jszip:1391
                  return file.dir && arg.test(relativePath);  // > CustomCode.jszip:1392
              });  // > CustomCode.jszip:1393
          }  // > CustomCode.jszip:1394
          // else, name is a new folder  // > CustomCode.jszip:1395
          var name = this.root + arg;  // > CustomCode.jszip:1396
          var newFolder = folderAdd.call(this, name);  // > CustomCode.jszip:1397
          // Allow chaining by returning a new object with this folder as the root  // > CustomCode.jszip:1398
          var ret = this.clone();  // > CustomCode.jszip:1399
          ret.root = newFolder.name;  // > CustomCode.jszip:1400
          return ret;  // > CustomCode.jszip:1401
      },  // > CustomCode.jszip:1402
      /**  // > CustomCode.jszip:1403
       * Delete a file, or a directory and all sub-files, from the zip  // > CustomCode.jszip:1404
       * @param {string} name the name of the file to delete  // > CustomCode.jszip:1405
       * @return {JSZip} this JSZip object  // > CustomCode.jszip:1406
       */  // > CustomCode.jszip:1407
      remove: function(name) {  // > CustomCode.jszip:1408
          name = this.root + name;  // > CustomCode.jszip:1409
          var file = this.files[name];  // > CustomCode.jszip:1410
          if (!file) {  // > CustomCode.jszip:1411
              // Look for any folders  // > CustomCode.jszip:1412
              if (name.slice(-1) !== "/") {  // > CustomCode.jszip:1413
                  name += "/";  // > CustomCode.jszip:1414
              }  // > CustomCode.jszip:1415
              file = this.files[name];  // > CustomCode.jszip:1416
          }  // > CustomCode.jszip:1417
          if (file && !file.dir) {  // > CustomCode.jszip:1418
              // file  // > CustomCode.jszip:1419
              delete this.files[name];  // > CustomCode.jszip:1420
          } else {  // > CustomCode.jszip:1421
              // maybe a folder, delete recursively  // > CustomCode.jszip:1422
              var kids = this.filter(function(relativePath, file) {  // > CustomCode.jszip:1423
                  return file.name.slice(0, name.length) === name;  // > CustomCode.jszip:1424
              });  // > CustomCode.jszip:1425
              for (var i = 0; i < kids.length; i++) {  // > CustomCode.jszip:1426
                  delete this.files[kids[i].name];  // > CustomCode.jszip:1427
              }  // > CustomCode.jszip:1428
          }  // > CustomCode.jszip:1429
          return this;  // > CustomCode.jszip:1430
      },  // > CustomCode.jszip:1431
      /**  // > CustomCode.jszip:1432
       * @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.  // > CustomCode.jszip:1433
       */  // > CustomCode.jszip:1434
      generate: function() {  // > CustomCode.jszip:1435
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");  // > CustomCode.jszip:1436
      },  // > CustomCode.jszip:1437
      /**  // > CustomCode.jszip:1438
       * Generate the complete zip file as an internal stream.  // > CustomCode.jszip:1439
       * @param {Object} options the options to generate the zip file :  // > CustomCode.jszip:1440
       * - compression, "STORE" by default.  // > CustomCode.jszip:1441
       * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.  // > CustomCode.jszip:1442
       * @return {StreamHelper} the streamed zip file.  // > CustomCode.jszip:1443
       */  // > CustomCode.jszip:1444
      generateInternalStream: function(options) {  // > CustomCode.jszip:1445
          var worker, opts = {};  // > CustomCode.jszip:1446
          try {  // > CustomCode.jszip:1447
              opts = utils.extend(options || {}, {  // > CustomCode.jszip:1448
                  streamFiles: false,  // > CustomCode.jszip:1449
                  compression: "STORE",  // > CustomCode.jszip:1450
                  compressionOptions : null,  // > CustomCode.jszip:1451
                  type: "",  // > CustomCode.jszip:1452
                  platform: "DOS",  // > CustomCode.jszip:1453
                  comment: null,  // > CustomCode.jszip:1454
                  mimeType: "application/zip",  // > CustomCode.jszip:1455
                  encodeFileName: utf8.utf8encode  // > CustomCode.jszip:1456
              });  // > CustomCode.jszip:1457
              opts.type = opts.type.toLowerCase();  // > CustomCode.jszip:1458
              opts.compression = opts.compression.toUpperCase();  // > CustomCode.jszip:1459
              // "binarystring" is preferred but the internals use "string".  // > CustomCode.jszip:1460
              if(opts.type === "binarystring") {  // > CustomCode.jszip:1461
                  opts.type = "string";  // > CustomCode.jszip:1462
              }  // > CustomCode.jszip:1463
              if (!opts.type) {  // > CustomCode.jszip:1464
                  throw new Error("No output type specified.");  // > CustomCode.jszip:1465
              }  // > CustomCode.jszip:1466
              utils.checkSupport(opts.type);  // > CustomCode.jszip:1467
              // accept nodejs `process.platform`  // > CustomCode.jszip:1468
              if(  // > CustomCode.jszip:1469
                  opts.platform === "darwin" ||  // > CustomCode.jszip:1470
                  opts.platform === "freebsd" ||  // > CustomCode.jszip:1471
                  opts.platform === "linux" ||  // > CustomCode.jszip:1472
                  opts.platform === "sunos"  // > CustomCode.jszip:1473
              ) {  // > CustomCode.jszip:1474
                  opts.platform = "UNIX";  // > CustomCode.jszip:1475
              }  // > CustomCode.jszip:1476
              if (opts.platform === "win32") {  // > CustomCode.jszip:1477
                  opts.platform = "DOS";  // > CustomCode.jszip:1478
              }  // > CustomCode.jszip:1479
              var comment = opts.comment || this.comment || "";  // > CustomCode.jszip:1480
              worker = generate.generateWorker(this, opts, comment);  // > CustomCode.jszip:1481
          } catch (e) {  // > CustomCode.jszip:1482
              worker = new GenericWorker("error");  // > CustomCode.jszip:1483
              worker.error(e);  // > CustomCode.jszip:1484
          }  // > CustomCode.jszip:1485
          return new StreamHelper(worker, opts.type || "string", opts.mimeType);  // > CustomCode.jszip:1486
      },  // > CustomCode.jszip:1487
      /**  // > CustomCode.jszip:1488
       * Generate the complete zip file asynchronously.  // > CustomCode.jszip:1489
       * @see generateInternalStream  // > CustomCode.jszip:1490
       */  // > CustomCode.jszip:1491
      generateAsync: function(options, onUpdate) {  // > CustomCode.jszip:1492
          return this.generateInternalStream(options).accumulate(onUpdate);  // > CustomCode.jszip:1493
      },  // > CustomCode.jszip:1494
      /**  // > CustomCode.jszip:1495
       * Generate the complete zip file asynchronously.  // > CustomCode.jszip:1496
       * @see generateInternalStream  // > CustomCode.jszip:1497
       */  // > CustomCode.jszip:1498
      generateNodeStream: function(options, onUpdate) {  // > CustomCode.jszip:1499
          options = options || {};  // > CustomCode.jszip:1500
          if (!options.type) {  // > CustomCode.jszip:1501
              options.type = "nodebuffer";  // > CustomCode.jszip:1502
          }  // > CustomCode.jszip:1503
          return this.generateInternalStream(options).toNodejsStream(onUpdate);  // > CustomCode.jszip:1504
      }  // > CustomCode.jszip:1505
  };  // > CustomCode.jszip:1506
  module.exports = out;  // > CustomCode.jszip:1507
  },{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(require,module,exports){  // > CustomCode.jszip:1508
  "use strict";  // > CustomCode.jszip:1509
  /*  // > CustomCode.jszip:1510
   * This file is used by module bundlers (browserify/webpack/etc) when  // > CustomCode.jszip:1511
   * including a stream implementation. We use "readable-stream" to get a  // > CustomCode.jszip:1512
   * consistent behavior between nodejs versions but bundlers often have a shim  // > CustomCode.jszip:1513
   * for "stream". Using this shim greatly improve the compatibility and greatly  // > CustomCode.jszip:1514
   * reduce the final size of the bundle (only one stream implementation, not  // > CustomCode.jszip:1515
   * two).  // > CustomCode.jszip:1516
   */  // > CustomCode.jszip:1517
  module.exports = require("stream");  // > CustomCode.jszip:1518
  },{"stream":undefined}],17:[function(require,module,exports){  // > CustomCode.jszip:1519
  "use strict";  // > CustomCode.jszip:1520
  var DataReader = require("./DataReader");  // > CustomCode.jszip:1521
  var utils = require("../utils");  // > CustomCode.jszip:1522
  function ArrayReader(data) {  // > CustomCode.jszip:1523
      DataReader.call(this, data);  // > CustomCode.jszip:1524
      for(var i = 0; i < this.data.length; i++) {  // > CustomCode.jszip:1525
          data[i] = data[i] & 0xFF;  // > CustomCode.jszip:1526
      }  // > CustomCode.jszip:1527
  }  // > CustomCode.jszip:1528
  utils.inherits(ArrayReader, DataReader);  // > CustomCode.jszip:1529
  /**  // > CustomCode.jszip:1530
   * @see DataReader.byteAt  // > CustomCode.jszip:1531
   */  // > CustomCode.jszip:1532
  ArrayReader.prototype.byteAt = function(i) {  // > CustomCode.jszip:1533
      return this.data[this.zero + i];  // > CustomCode.jszip:1534
  };  // > CustomCode.jszip:1535
  /**  // > CustomCode.jszip:1536
   * @see DataReader.lastIndexOfSignature  // > CustomCode.jszip:1537
   */  // > CustomCode.jszip:1538
  ArrayReader.prototype.lastIndexOfSignature = function(sig) {  // > CustomCode.jszip:1539
      var sig0 = sig.charCodeAt(0),  // > CustomCode.jszip:1540
          sig1 = sig.charCodeAt(1),  // > CustomCode.jszip:1541
          sig2 = sig.charCodeAt(2),  // > CustomCode.jszip:1542
          sig3 = sig.charCodeAt(3);  // > CustomCode.jszip:1543
      for (var i = this.length - 4; i >= 0; --i) {  // > CustomCode.jszip:1544
          if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {  // > CustomCode.jszip:1545
              return i - this.zero;  // > CustomCode.jszip:1546
          }  // > CustomCode.jszip:1547
      }  // > CustomCode.jszip:1548
      return -1;  // > CustomCode.jszip:1549
  };  // > CustomCode.jszip:1550
  /**  // > CustomCode.jszip:1551
   * @see DataReader.readAndCheckSignature  // > CustomCode.jszip:1552
   */  // > CustomCode.jszip:1553
  ArrayReader.prototype.readAndCheckSignature = function (sig) {  // > CustomCode.jszip:1554
      var sig0 = sig.charCodeAt(0),  // > CustomCode.jszip:1555
          sig1 = sig.charCodeAt(1),  // > CustomCode.jszip:1556
          sig2 = sig.charCodeAt(2),  // > CustomCode.jszip:1557
          sig3 = sig.charCodeAt(3),  // > CustomCode.jszip:1558
          data = this.readData(4);  // > CustomCode.jszip:1559
      return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];  // > CustomCode.jszip:1560
  };  // > CustomCode.jszip:1561
  /**  // > CustomCode.jszip:1562
   * @see DataReader.readData  // > CustomCode.jszip:1563
   */  // > CustomCode.jszip:1564
  ArrayReader.prototype.readData = function(size) {  // > CustomCode.jszip:1565
      this.checkOffset(size);  // > CustomCode.jszip:1566
      if(size === 0) {  // > CustomCode.jszip:1567
          return [];  // > CustomCode.jszip:1568
      }  // > CustomCode.jszip:1569
      var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);  // > CustomCode.jszip:1570
      this.index += size;  // > CustomCode.jszip:1571
      return result;  // > CustomCode.jszip:1572
  };  // > CustomCode.jszip:1573
  module.exports = ArrayReader;  // > CustomCode.jszip:1574
  },{"../utils":32,"./DataReader":18}],18:[function(require,module,exports){  // > CustomCode.jszip:1575
  "use strict";  // > CustomCode.jszip:1576
  var utils = require("../utils");  // > CustomCode.jszip:1577
  function DataReader(data) {  // > CustomCode.jszip:1578
      this.data = data; // type : see implementation  // > CustomCode.jszip:1579
      this.length = data.length;  // > CustomCode.jszip:1580
      this.index = 0;  // > CustomCode.jszip:1581
      this.zero = 0;  // > CustomCode.jszip:1582
  }  // > CustomCode.jszip:1583
  DataReader.prototype = {  // > CustomCode.jszip:1584
      /**  // > CustomCode.jszip:1585
       * Check that the offset will not go too far.  // > CustomCode.jszip:1586
       * @param {string} offset the additional offset to check.  // > CustomCode.jszip:1587
       * @throws {Error} an Error if the offset is out of bounds.  // > CustomCode.jszip:1588
       */  // > CustomCode.jszip:1589
      checkOffset: function(offset) {  // > CustomCode.jszip:1590
          this.checkIndex(this.index + offset);  // > CustomCode.jszip:1591
      },  // > CustomCode.jszip:1592
      /**  // > CustomCode.jszip:1593
       * Check that the specified index will not be too far.  // > CustomCode.jszip:1594
       * @param {string} newIndex the index to check.  // > CustomCode.jszip:1595
       * @throws {Error} an Error if the index is out of bounds.  // > CustomCode.jszip:1596
       */  // > CustomCode.jszip:1597
      checkIndex: function(newIndex) {  // > CustomCode.jszip:1598
          if (this.length < this.zero + newIndex || newIndex < 0) {  // > CustomCode.jszip:1599
              throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");  // > CustomCode.jszip:1600
          }  // > CustomCode.jszip:1601
      },  // > CustomCode.jszip:1602
      /**  // > CustomCode.jszip:1603
       * Change the index.  // > CustomCode.jszip:1604
       * @param {number} newIndex The new index.  // > CustomCode.jszip:1605
       * @throws {Error} if the new index is out of the data.  // > CustomCode.jszip:1606
       */  // > CustomCode.jszip:1607
      setIndex: function(newIndex) {  // > CustomCode.jszip:1608
          this.checkIndex(newIndex);  // > CustomCode.jszip:1609
          this.index = newIndex;  // > CustomCode.jszip:1610
      },  // > CustomCode.jszip:1611
      /**  // > CustomCode.jszip:1612
       * Skip the next n bytes.  // > CustomCode.jszip:1613
       * @param {number} n the number of bytes to skip.  // > CustomCode.jszip:1614
       * @throws {Error} if the new index is out of the data.  // > CustomCode.jszip:1615
       */  // > CustomCode.jszip:1616
      skip: function(n) {  // > CustomCode.jszip:1617
          this.setIndex(this.index + n);  // > CustomCode.jszip:1618
      },  // > CustomCode.jszip:1619
      /**  // > CustomCode.jszip:1620
       * Get the byte at the specified index.  // > CustomCode.jszip:1621
       * @param {number} i the index to use.  // > CustomCode.jszip:1622
       * @return {number} a byte.  // > CustomCode.jszip:1623
       */  // > CustomCode.jszip:1624
      byteAt: function() {  // > CustomCode.jszip:1625
          // see implementations  // > CustomCode.jszip:1626
      },  // > CustomCode.jszip:1627
      /**  // > CustomCode.jszip:1628
       * Get the next number with a given byte size.  // > CustomCode.jszip:1629
       * @param {number} size the number of bytes to read.  // > CustomCode.jszip:1630
       * @return {number} the corresponding number.  // > CustomCode.jszip:1631
       */  // > CustomCode.jszip:1632
      readInt: function(size) {  // > CustomCode.jszip:1633
          var result = 0,  // > CustomCode.jszip:1634
              i;  // > CustomCode.jszip:1635
          this.checkOffset(size);  // > CustomCode.jszip:1636
          for (i = this.index + size - 1; i >= this.index; i--) {  // > CustomCode.jszip:1637
              result = (result << 8) + this.byteAt(i);  // > CustomCode.jszip:1638
          }  // > CustomCode.jszip:1639
          this.index += size;  // > CustomCode.jszip:1640
          return result;  // > CustomCode.jszip:1641
      },  // > CustomCode.jszip:1642
      /**  // > CustomCode.jszip:1643
       * Get the next string with a given byte size.  // > CustomCode.jszip:1644
       * @param {number} size the number of bytes to read.  // > CustomCode.jszip:1645
       * @return {string} the corresponding string.  // > CustomCode.jszip:1646
       */  // > CustomCode.jszip:1647
      readString: function(size) {  // > CustomCode.jszip:1648
          return utils.transformTo("string", this.readData(size));  // > CustomCode.jszip:1649
      },  // > CustomCode.jszip:1650
      /**  // > CustomCode.jszip:1651
       * Get raw data without conversion, <size> bytes.  // > CustomCode.jszip:1652
       * @param {number} size the number of bytes to read.  // > CustomCode.jszip:1653
       * @return {Object} the raw data, implementation specific.  // > CustomCode.jszip:1654
       */  // > CustomCode.jszip:1655
      readData: function() {  // > CustomCode.jszip:1656
          // see implementations  // > CustomCode.jszip:1657
      },  // > CustomCode.jszip:1658
      /**  // > CustomCode.jszip:1659
       * Find the last occurrence of a zip signature (4 bytes).  // > CustomCode.jszip:1660
       * @param {string} sig the signature to find.  // > CustomCode.jszip:1661
       * @return {number} the index of the last occurrence, -1 if not found.  // > CustomCode.jszip:1662
       */  // > CustomCode.jszip:1663
      lastIndexOfSignature: function() {  // > CustomCode.jszip:1664
          // see implementations  // > CustomCode.jszip:1665
      },  // > CustomCode.jszip:1666
      /**  // > CustomCode.jszip:1667
       * Read the signature (4 bytes) at the current position and compare it with sig.  // > CustomCode.jszip:1668
       * @param {string} sig the expected signature  // > CustomCode.jszip:1669
       * @return {boolean} true if the signature matches, false otherwise.  // > CustomCode.jszip:1670
       */  // > CustomCode.jszip:1671
      readAndCheckSignature: function() {  // > CustomCode.jszip:1672
          // see implementations  // > CustomCode.jszip:1673
      },  // > CustomCode.jszip:1674
      /**  // > CustomCode.jszip:1675
       * Get the next date.  // > CustomCode.jszip:1676
       * @return {Date} the date.  // > CustomCode.jszip:1677
       */  // > CustomCode.jszip:1678
      readDate: function() {  // > CustomCode.jszip:1679
          var dostime = this.readInt(4);  // > CustomCode.jszip:1680
          return new Date(Date.UTC(  // > CustomCode.jszip:1681
              ((dostime >> 25) & 0x7f) + 1980, // year  // > CustomCode.jszip:1682
              ((dostime >> 21) & 0x0f) - 1, // month  // > CustomCode.jszip:1683
              (dostime >> 16) & 0x1f, // day  // > CustomCode.jszip:1684
              (dostime >> 11) & 0x1f, // hour  // > CustomCode.jszip:1685
              (dostime >> 5) & 0x3f, // minute  // > CustomCode.jszip:1686
              (dostime & 0x1f) << 1)); // second  // > CustomCode.jszip:1687
      }  // > CustomCode.jszip:1688
  };  // > CustomCode.jszip:1689
  module.exports = DataReader;  // > CustomCode.jszip:1690
  },{"../utils":32}],19:[function(require,module,exports){  // > CustomCode.jszip:1691
  "use strict";  // > CustomCode.jszip:1692
  var Uint8ArrayReader = require("./Uint8ArrayReader");  // > CustomCode.jszip:1693
  var utils = require("../utils");  // > CustomCode.jszip:1694
  function NodeBufferReader(data) {  // > CustomCode.jszip:1695
      Uint8ArrayReader.call(this, data);  // > CustomCode.jszip:1696
  }  // > CustomCode.jszip:1697
  utils.inherits(NodeBufferReader, Uint8ArrayReader);  // > CustomCode.jszip:1698
  /**  // > CustomCode.jszip:1699
   * @see DataReader.readData  // > CustomCode.jszip:1700
   */  // > CustomCode.jszip:1701
  NodeBufferReader.prototype.readData = function(size) {  // > CustomCode.jszip:1702
      this.checkOffset(size);  // > CustomCode.jszip:1703
      var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);  // > CustomCode.jszip:1704
      this.index += size;  // > CustomCode.jszip:1705
      return result;  // > CustomCode.jszip:1706
  };  // > CustomCode.jszip:1707
  module.exports = NodeBufferReader;  // > CustomCode.jszip:1708
  },{"../utils":32,"./Uint8ArrayReader":21}],20:[function(require,module,exports){  // > CustomCode.jszip:1709
  "use strict";  // > CustomCode.jszip:1710
  var DataReader = require("./DataReader");  // > CustomCode.jszip:1711
  var utils = require("../utils");  // > CustomCode.jszip:1712
  function StringReader(data) {  // > CustomCode.jszip:1713
      DataReader.call(this, data);  // > CustomCode.jszip:1714
  }  // > CustomCode.jszip:1715
  utils.inherits(StringReader, DataReader);  // > CustomCode.jszip:1716
  /**  // > CustomCode.jszip:1717
   * @see DataReader.byteAt  // > CustomCode.jszip:1718
   */  // > CustomCode.jszip:1719
  StringReader.prototype.byteAt = function(i) {  // > CustomCode.jszip:1720
      return this.data.charCodeAt(this.zero + i);  // > CustomCode.jszip:1721
  };  // > CustomCode.jszip:1722
  /**  // > CustomCode.jszip:1723
   * @see DataReader.lastIndexOfSignature  // > CustomCode.jszip:1724
   */  // > CustomCode.jszip:1725
  StringReader.prototype.lastIndexOfSignature = function(sig) {  // > CustomCode.jszip:1726
      return this.data.lastIndexOf(sig) - this.zero;  // > CustomCode.jszip:1727
  };  // > CustomCode.jszip:1728
  /**  // > CustomCode.jszip:1729
   * @see DataReader.readAndCheckSignature  // > CustomCode.jszip:1730
   */  // > CustomCode.jszip:1731
  StringReader.prototype.readAndCheckSignature = function (sig) {  // > CustomCode.jszip:1732
      var data = this.readData(4);  // > CustomCode.jszip:1733
      return sig === data;  // > CustomCode.jszip:1734
  };  // > CustomCode.jszip:1735
  /**  // > CustomCode.jszip:1736
   * @see DataReader.readData  // > CustomCode.jszip:1737
   */  // > CustomCode.jszip:1738
  StringReader.prototype.readData = function(size) {  // > CustomCode.jszip:1739
      this.checkOffset(size);  // > CustomCode.jszip:1740
      // this will work because the constructor applied the "& 0xff" mask.  // > CustomCode.jszip:1741
      var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);  // > CustomCode.jszip:1742
      this.index += size;  // > CustomCode.jszip:1743
      return result;  // > CustomCode.jszip:1744
  };  // > CustomCode.jszip:1745
  module.exports = StringReader;  // > CustomCode.jszip:1746
  },{"../utils":32,"./DataReader":18}],21:[function(require,module,exports){  // > CustomCode.jszip:1747
  "use strict";  // > CustomCode.jszip:1748
  var ArrayReader = require("./ArrayReader");  // > CustomCode.jszip:1749
  var utils = require("../utils");  // > CustomCode.jszip:1750
  function Uint8ArrayReader(data) {  // > CustomCode.jszip:1751
      ArrayReader.call(this, data);  // > CustomCode.jszip:1752
  }  // > CustomCode.jszip:1753
  utils.inherits(Uint8ArrayReader, ArrayReader);  // > CustomCode.jszip:1754
  /**  // > CustomCode.jszip:1755
   * @see DataReader.readData  // > CustomCode.jszip:1756
   */  // > CustomCode.jszip:1757
  Uint8ArrayReader.prototype.readData = function(size) {  // > CustomCode.jszip:1758
      this.checkOffset(size);  // > CustomCode.jszip:1759
      if(size === 0) {  // > CustomCode.jszip:1760
          // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].  // > CustomCode.jszip:1761
          return new Uint8Array(0);  // > CustomCode.jszip:1762
      }  // > CustomCode.jszip:1763
      var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);  // > CustomCode.jszip:1764
      this.index += size;  // > CustomCode.jszip:1765
      return result;  // > CustomCode.jszip:1766
  };  // > CustomCode.jszip:1767
  module.exports = Uint8ArrayReader;  // > CustomCode.jszip:1768
  },{"../utils":32,"./ArrayReader":17}],22:[function(require,module,exports){  // > CustomCode.jszip:1769
  "use strict";  // > CustomCode.jszip:1770
  var utils = require("../utils");  // > CustomCode.jszip:1771
  var support = require("../support");  // > CustomCode.jszip:1772
  var ArrayReader = require("./ArrayReader");  // > CustomCode.jszip:1773
  var StringReader = require("./StringReader");  // > CustomCode.jszip:1774
  var NodeBufferReader = require("./NodeBufferReader");  // > CustomCode.jszip:1775
  var Uint8ArrayReader = require("./Uint8ArrayReader");  // > CustomCode.jszip:1776
  /**  // > CustomCode.jszip:1777
   * Create a reader adapted to the data.  // > CustomCode.jszip:1778
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.  // > CustomCode.jszip:1779
   * @return {DataReader} the data reader.  // > CustomCode.jszip:1780
   */  // > CustomCode.jszip:1781
  module.exports = function (data) {  // > CustomCode.jszip:1782
      var type = utils.getTypeOf(data);  // > CustomCode.jszip:1783
      utils.checkSupport(type);  // > CustomCode.jszip:1784
      if (type === "string" && !support.uint8array) {  // > CustomCode.jszip:1785
          return new StringReader(data);  // > CustomCode.jszip:1786
      }  // > CustomCode.jszip:1787
      if (type === "nodebuffer") {  // > CustomCode.jszip:1788
          return new NodeBufferReader(data);  // > CustomCode.jszip:1789
      }  // > CustomCode.jszip:1790
      if (support.uint8array) {  // > CustomCode.jszip:1791
          return new Uint8ArrayReader(utils.transformTo("uint8array", data));  // > CustomCode.jszip:1792
      }  // > CustomCode.jszip:1793
      return new ArrayReader(utils.transformTo("array", data));  // > CustomCode.jszip:1794
  };  // > CustomCode.jszip:1795
  },{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(require,module,exports){  // > CustomCode.jszip:1796
  "use strict";  // > CustomCode.jszip:1797
  exports.LOCAL_FILE_HEADER = "PK\x03\x04";  // > CustomCode.jszip:1798
  exports.CENTRAL_FILE_HEADER = "PK\x01\x02";  // > CustomCode.jszip:1799
  exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";  // > CustomCode.jszip:1800
  exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";  // > CustomCode.jszip:1801
  exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";  // > CustomCode.jszip:1802
  exports.DATA_DESCRIPTOR = "PK\x07\x08";  // > CustomCode.jszip:1803
  },{}],24:[function(require,module,exports){  // > CustomCode.jszip:1804
  "use strict";  // > CustomCode.jszip:1805
  var GenericWorker = require("./GenericWorker");  // > CustomCode.jszip:1806
  var utils = require("../utils");  // > CustomCode.jszip:1807
  /**  // > CustomCode.jszip:1808
   * A worker which convert chunks to a specified type.  // > CustomCode.jszip:1809
   * @constructor  // > CustomCode.jszip:1810
   * @param {String} destType the destination type.  // > CustomCode.jszip:1811
   */  // > CustomCode.jszip:1812
  function ConvertWorker(destType) {  // > CustomCode.jszip:1813
      GenericWorker.call(this, "ConvertWorker to " + destType);  // > CustomCode.jszip:1814
      this.destType = destType;  // > CustomCode.jszip:1815
  }  // > CustomCode.jszip:1816
  utils.inherits(ConvertWorker, GenericWorker);  // > CustomCode.jszip:1817
  /**  // > CustomCode.jszip:1818
   * @see GenericWorker.processChunk  // > CustomCode.jszip:1819
   */  // > CustomCode.jszip:1820
  ConvertWorker.prototype.processChunk = function (chunk) {  // > CustomCode.jszip:1821
      this.push({  // > CustomCode.jszip:1822
          data : utils.transformTo(this.destType, chunk.data),  // > CustomCode.jszip:1823
          meta : chunk.meta  // > CustomCode.jszip:1824
      });  // > CustomCode.jszip:1825
  };  // > CustomCode.jszip:1826
  module.exports = ConvertWorker;  // > CustomCode.jszip:1827
  },{"../utils":32,"./GenericWorker":28}],25:[function(require,module,exports){  // > CustomCode.jszip:1828
  "use strict";  // > CustomCode.jszip:1829
  var GenericWorker = require("./GenericWorker");  // > CustomCode.jszip:1830
  var crc32 = require("../crc32");  // > CustomCode.jszip:1831
  var utils = require("../utils");  // > CustomCode.jszip:1832
  /**  // > CustomCode.jszip:1833
   * A worker which calculate the crc32 of the data flowing through.  // > CustomCode.jszip:1834
   * @constructor  // > CustomCode.jszip:1835
   */  // > CustomCode.jszip:1836
  function Crc32Probe() {  // > CustomCode.jszip:1837
      GenericWorker.call(this, "Crc32Probe");  // > CustomCode.jszip:1838
      this.withStreamInfo("crc32", 0);  // > CustomCode.jszip:1839
  }  // > CustomCode.jszip:1840
  utils.inherits(Crc32Probe, GenericWorker);  // > CustomCode.jszip:1841
  /**  // > CustomCode.jszip:1842
   * @see GenericWorker.processChunk  // > CustomCode.jszip:1843
   */  // > CustomCode.jszip:1844
  Crc32Probe.prototype.processChunk = function (chunk) {  // > CustomCode.jszip:1845
      this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);  // > CustomCode.jszip:1846
      this.push(chunk);  // > CustomCode.jszip:1847
  };  // > CustomCode.jszip:1848
  module.exports = Crc32Probe;  // > CustomCode.jszip:1849
  },{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(require,module,exports){  // > CustomCode.jszip:1850
  "use strict";  // > CustomCode.jszip:1851
  var utils = require("../utils");  // > CustomCode.jszip:1852
  var GenericWorker = require("./GenericWorker");  // > CustomCode.jszip:1853
  /**  // > CustomCode.jszip:1854
   * A worker which calculate the total length of the data flowing through.  // > CustomCode.jszip:1855
   * @constructor  // > CustomCode.jszip:1856
   * @param {String} propName the name used to expose the length  // > CustomCode.jszip:1857
   */  // > CustomCode.jszip:1858
  function DataLengthProbe(propName) {  // > CustomCode.jszip:1859
      GenericWorker.call(this, "DataLengthProbe for " + propName);  // > CustomCode.jszip:1860
      this.propName = propName;  // > CustomCode.jszip:1861
      this.withStreamInfo(propName, 0);  // > CustomCode.jszip:1862
  }  // > CustomCode.jszip:1863
  utils.inherits(DataLengthProbe, GenericWorker);  // > CustomCode.jszip:1864
  /**  // > CustomCode.jszip:1865
   * @see GenericWorker.processChunk  // > CustomCode.jszip:1866
   */  // > CustomCode.jszip:1867
  DataLengthProbe.prototype.processChunk = function (chunk) {  // > CustomCode.jszip:1868
      if(chunk) {  // > CustomCode.jszip:1869
          var length = this.streamInfo[this.propName] || 0;  // > CustomCode.jszip:1870
          this.streamInfo[this.propName] = length + chunk.data.length;  // > CustomCode.jszip:1871
      }  // > CustomCode.jszip:1872
      GenericWorker.prototype.processChunk.call(this, chunk);  // > CustomCode.jszip:1873
  };  // > CustomCode.jszip:1874
  module.exports = DataLengthProbe;  // > CustomCode.jszip:1875
  },{"../utils":32,"./GenericWorker":28}],27:[function(require,module,exports){  // > CustomCode.jszip:1876
  "use strict";  // > CustomCode.jszip:1877
  var utils = require("../utils");  // > CustomCode.jszip:1878
  var GenericWorker = require("./GenericWorker");  // > CustomCode.jszip:1879
  // the size of the generated chunks  // > CustomCode.jszip:1880
  // TODO expose this as a public variable  // > CustomCode.jszip:1881
  var DEFAULT_BLOCK_SIZE = 16 * 1024;  // > CustomCode.jszip:1882
  /**  // > CustomCode.jszip:1883
   * A worker that reads a content and emits chunks.  // > CustomCode.jszip:1884
   * @constructor  // > CustomCode.jszip:1885
   * @param {Promise} dataP the promise of the data to split  // > CustomCode.jszip:1886
   */  // > CustomCode.jszip:1887
  function DataWorker(dataP) {  // > CustomCode.jszip:1888
      GenericWorker.call(this, "DataWorker");  // > CustomCode.jszip:1889
      var self = this;  // > CustomCode.jszip:1890
      this.dataIsReady = false;  // > CustomCode.jszip:1891
      this.index = 0;  // > CustomCode.jszip:1892
      this.max = 0;  // > CustomCode.jszip:1893
      this.data = null;  // > CustomCode.jszip:1894
      this.type = "";  // > CustomCode.jszip:1895
      this._tickScheduled = false;  // > CustomCode.jszip:1896
      dataP.then(function (data) {  // > CustomCode.jszip:1897
          self.dataIsReady = true;  // > CustomCode.jszip:1898
          self.data = data;  // > CustomCode.jszip:1899
          self.max = data && data.length || 0;  // > CustomCode.jszip:1900
          self.type = utils.getTypeOf(data);  // > CustomCode.jszip:1901
          if(!self.isPaused) {  // > CustomCode.jszip:1902
              self._tickAndRepeat();  // > CustomCode.jszip:1903
          }  // > CustomCode.jszip:1904
      }, function (e) {  // > CustomCode.jszip:1905
          self.error(e);  // > CustomCode.jszip:1906
      });  // > CustomCode.jszip:1907
  }  // > CustomCode.jszip:1908
  utils.inherits(DataWorker, GenericWorker);  // > CustomCode.jszip:1909
  /**  // > CustomCode.jszip:1910
   * @see GenericWorker.cleanUp  // > CustomCode.jszip:1911
   */  // > CustomCode.jszip:1912
  DataWorker.prototype.cleanUp = function () {  // > CustomCode.jszip:1913
      GenericWorker.prototype.cleanUp.call(this);  // > CustomCode.jszip:1914
      this.data = null;  // > CustomCode.jszip:1915
  };  // > CustomCode.jszip:1916
  /**  // > CustomCode.jszip:1917
   * @see GenericWorker.resume  // > CustomCode.jszip:1918
   */  // > CustomCode.jszip:1919
  DataWorker.prototype.resume = function () {  // > CustomCode.jszip:1920
      if(!GenericWorker.prototype.resume.call(this)) {  // > CustomCode.jszip:1921
          return false;  // > CustomCode.jszip:1922
      }  // > CustomCode.jszip:1923
      if (!this._tickScheduled && this.dataIsReady) {  // > CustomCode.jszip:1924
          this._tickScheduled = true;  // > CustomCode.jszip:1925
          utils.delay(this._tickAndRepeat, [], this);  // > CustomCode.jszip:1926
      }  // > CustomCode.jszip:1927
      return true;  // > CustomCode.jszip:1928
  };  // > CustomCode.jszip:1929
  /**  // > CustomCode.jszip:1930
   * Trigger a tick a schedule an other call to this function.  // > CustomCode.jszip:1931
   */  // > CustomCode.jszip:1932
  DataWorker.prototype._tickAndRepeat = function() {  // > CustomCode.jszip:1933
      this._tickScheduled = false;  // > CustomCode.jszip:1934
      if(this.isPaused || this.isFinished) {  // > CustomCode.jszip:1935
          return;  // > CustomCode.jszip:1936
      }  // > CustomCode.jszip:1937
      this._tick();  // > CustomCode.jszip:1938
      if(!this.isFinished) {  // > CustomCode.jszip:1939
          utils.delay(this._tickAndRepeat, [], this);  // > CustomCode.jszip:1940
          this._tickScheduled = true;  // > CustomCode.jszip:1941
      }  // > CustomCode.jszip:1942
  };  // > CustomCode.jszip:1943
  /**  // > CustomCode.jszip:1944
   * Read and push a chunk.  // > CustomCode.jszip:1945
   */  // > CustomCode.jszip:1946
  DataWorker.prototype._tick = function() {  // > CustomCode.jszip:1947
      if(this.isPaused || this.isFinished) {  // > CustomCode.jszip:1948
          return false;  // > CustomCode.jszip:1949
      }  // > CustomCode.jszip:1950
      var size = DEFAULT_BLOCK_SIZE;  // > CustomCode.jszip:1951
      var data = null, nextIndex = Math.min(this.max, this.index + size);  // > CustomCode.jszip:1952
      if (this.index >= this.max) {  // > CustomCode.jszip:1953
          // EOF  // > CustomCode.jszip:1954
          return this.end();  // > CustomCode.jszip:1955
      } else {  // > CustomCode.jszip:1956
          switch(this.type) {  // > CustomCode.jszip:1957
          case "string":  // > CustomCode.jszip:1958
              data = this.data.substring(this.index, nextIndex);  // > CustomCode.jszip:1959
              break;  // > CustomCode.jszip:1960
          case "uint8array":  // > CustomCode.jszip:1961
              data = this.data.subarray(this.index, nextIndex);  // > CustomCode.jszip:1962
              break;  // > CustomCode.jszip:1963
          case "array":  // > CustomCode.jszip:1964
          case "nodebuffer":  // > CustomCode.jszip:1965
              data = this.data.slice(this.index, nextIndex);  // > CustomCode.jszip:1966
              break;  // > CustomCode.jszip:1967
          }  // > CustomCode.jszip:1968
          this.index = nextIndex;  // > CustomCode.jszip:1969
          return this.push({  // > CustomCode.jszip:1970
              data : data,  // > CustomCode.jszip:1971
              meta : {  // > CustomCode.jszip:1972
                  percent : this.max ? this.index / this.max * 100 : 0  // > CustomCode.jszip:1973
              }  // > CustomCode.jszip:1974
          });  // > CustomCode.jszip:1975
      }  // > CustomCode.jszip:1976
  };  // > CustomCode.jszip:1977
  module.exports = DataWorker;  // > CustomCode.jszip:1978
  },{"../utils":32,"./GenericWorker":28}],28:[function(require,module,exports){  // > CustomCode.jszip:1979
  "use strict";  // > CustomCode.jszip:1980
  /**  // > CustomCode.jszip:1981
   * A worker that does nothing but passing chunks to the next one. This is like  // > CustomCode.jszip:1982
   * a nodejs stream but with some differences. On the good side :  // > CustomCode.jszip:1983
   * - it works on IE 6-9 without any issue / polyfill  // > CustomCode.jszip:1984
   * - it weights less than the full dependencies bundled with browserify  // > CustomCode.jszip:1985
   * - it forwards errors (no need to declare an error handler EVERYWHERE)  // > CustomCode.jszip:1986
   *  // > CustomCode.jszip:1987
   * A chunk is an object with 2 attributes : `meta` and `data`. The former is an  // > CustomCode.jszip:1988
   * object containing anything (`percent` for example), see each worker for more  // > CustomCode.jszip:1989
   * details. The latter is the real data (String, Uint8Array, etc).  // > CustomCode.jszip:1990
   *  // > CustomCode.jszip:1991
   * @constructor  // > CustomCode.jszip:1992
   * @param {String} name the name of the stream (mainly used for debugging purposes)  // > CustomCode.jszip:1993
   */  // > CustomCode.jszip:1994
  function GenericWorker(name) {  // > CustomCode.jszip:1995
      // the name of the worker  // > CustomCode.jszip:1996
      this.name = name || "default";  // > CustomCode.jszip:1997
      // an object containing metadata about the workers chain  // > CustomCode.jszip:1998
      this.streamInfo = {};  // > CustomCode.jszip:1999
      // an error which happened when the worker was paused  // > CustomCode.jszip:2000
      this.generatedError = null;  // > CustomCode.jszip:2001
      // an object containing metadata to be merged by this worker into the general metadata  // > CustomCode.jszip:2002
      this.extraStreamInfo = {};  // > CustomCode.jszip:2003
      // true if the stream is paused (and should not do anything), false otherwise  // > CustomCode.jszip:2004
      this.isPaused = true;  // > CustomCode.jszip:2005
      // true if the stream is finished (and should not do anything), false otherwise  // > CustomCode.jszip:2006
      this.isFinished = false;  // > CustomCode.jszip:2007
      // true if the stream is locked to prevent further structure updates (pipe), false otherwise  // > CustomCode.jszip:2008
      this.isLocked = false;  // > CustomCode.jszip:2009
      // the event listeners  // > CustomCode.jszip:2010
      this._listeners = {  // > CustomCode.jszip:2011
          "data":[],  // > CustomCode.jszip:2012
          "end":[],  // > CustomCode.jszip:2013
          "error":[]  // > CustomCode.jszip:2014
      };  // > CustomCode.jszip:2015
      // the previous worker, if any  // > CustomCode.jszip:2016
      this.previous = null;  // > CustomCode.jszip:2017
  }  // > CustomCode.jszip:2018
  GenericWorker.prototype = {  // > CustomCode.jszip:2019
      /**  // > CustomCode.jszip:2020
       * Push a chunk to the next workers.  // > CustomCode.jszip:2021
       * @param {Object} chunk the chunk to push  // > CustomCode.jszip:2022
       */  // > CustomCode.jszip:2023
      push : function (chunk) {  // > CustomCode.jszip:2024
          this.emit("data", chunk);  // > CustomCode.jszip:2025
      },  // > CustomCode.jszip:2026
      /**  // > CustomCode.jszip:2027
       * End the stream.  // > CustomCode.jszip:2028
       * @return {Boolean} true if this call ended the worker, false otherwise.  // > CustomCode.jszip:2029
       */  // > CustomCode.jszip:2030
      end : function () {  // > CustomCode.jszip:2031
          if (this.isFinished) {  // > CustomCode.jszip:2032
              return false;  // > CustomCode.jszip:2033
          }  // > CustomCode.jszip:2034
          this.flush();  // > CustomCode.jszip:2035
          try {  // > CustomCode.jszip:2036
              this.emit("end");  // > CustomCode.jszip:2037
              this.cleanUp();  // > CustomCode.jszip:2038
              this.isFinished = true;  // > CustomCode.jszip:2039
          } catch (e) {  // > CustomCode.jszip:2040
              this.emit("error", e);  // > CustomCode.jszip:2041
          }  // > CustomCode.jszip:2042
          return true;  // > CustomCode.jszip:2043
      },  // > CustomCode.jszip:2044
      /**  // > CustomCode.jszip:2045
       * End the stream with an error.  // > CustomCode.jszip:2046
       * @param {Error} e the error which caused the premature end.  // > CustomCode.jszip:2047
       * @return {Boolean} true if this call ended the worker with an error, false otherwise.  // > CustomCode.jszip:2048
       */  // > CustomCode.jszip:2049
      error : function (e) {  // > CustomCode.jszip:2050
          if (this.isFinished) {  // > CustomCode.jszip:2051
              return false;  // > CustomCode.jszip:2052
          }  // > CustomCode.jszip:2053
          if(this.isPaused) {  // > CustomCode.jszip:2054
              this.generatedError = e;  // > CustomCode.jszip:2055
          } else {  // > CustomCode.jszip:2056
              this.isFinished = true;  // > CustomCode.jszip:2057
              this.emit("error", e);  // > CustomCode.jszip:2058
              // in the workers chain exploded in the middle of the chain,  // > CustomCode.jszip:2059
              // the error event will go downward but we also need to notify  // > CustomCode.jszip:2060
              // workers upward that there has been an error.  // > CustomCode.jszip:2061
              if(this.previous) {  // > CustomCode.jszip:2062
                  this.previous.error(e);  // > CustomCode.jszip:2063
              }  // > CustomCode.jszip:2064
              this.cleanUp();  // > CustomCode.jszip:2065
          }  // > CustomCode.jszip:2066
          return true;  // > CustomCode.jszip:2067
      },  // > CustomCode.jszip:2068
      /**  // > CustomCode.jszip:2069
       * Add a callback on an event.  // > CustomCode.jszip:2070
       * @param {String} name the name of the event (data, end, error)  // > CustomCode.jszip:2071
       * @param {Function} listener the function to call when the event is triggered  // > CustomCode.jszip:2072
       * @return {GenericWorker} the current object for chainability  // > CustomCode.jszip:2073
       */  // > CustomCode.jszip:2074
      on : function (name, listener) {  // > CustomCode.jszip:2075
          this._listeners[name].push(listener);  // > CustomCode.jszip:2076
          return this;  // > CustomCode.jszip:2077
      },  // > CustomCode.jszip:2078
      /**  // > CustomCode.jszip:2079
       * Clean any references when a worker is ending.  // > CustomCode.jszip:2080
       */  // > CustomCode.jszip:2081
      cleanUp : function () {  // > CustomCode.jszip:2082
          this.streamInfo = this.generatedError = this.extraStreamInfo = null;  // > CustomCode.jszip:2083
          this._listeners = [];  // > CustomCode.jszip:2084
      },  // > CustomCode.jszip:2085
      /**  // > CustomCode.jszip:2086
       * Trigger an event. This will call registered callback with the provided arg.  // > CustomCode.jszip:2087
       * @param {String} name the name of the event (data, end, error)  // > CustomCode.jszip:2088
       * @param {Object} arg the argument to call the callback with.  // > CustomCode.jszip:2089
       */  // > CustomCode.jszip:2090
      emit : function (name, arg) {  // > CustomCode.jszip:2091
          if (this._listeners[name]) {  // > CustomCode.jszip:2092
              for(var i = 0; i < this._listeners[name].length; i++) {  // > CustomCode.jszip:2093
                  this._listeners[name][i].call(this, arg);  // > CustomCode.jszip:2094
              }  // > CustomCode.jszip:2095
          }  // > CustomCode.jszip:2096
      },  // > CustomCode.jszip:2097
      /**  // > CustomCode.jszip:2098
       * Chain a worker with an other.  // > CustomCode.jszip:2099
       * @param {Worker} next the worker receiving events from the current one.  // > CustomCode.jszip:2100
       * @return {worker} the next worker for chainability  // > CustomCode.jszip:2101
       */  // > CustomCode.jszip:2102
      pipe : function (next) {  // > CustomCode.jszip:2103
          return next.registerPrevious(this);  // > CustomCode.jszip:2104
      },  // > CustomCode.jszip:2105
      /**  // > CustomCode.jszip:2106
       * Same as `pipe` in the other direction.  // > CustomCode.jszip:2107
       * Using an API with `pipe(next)` is very easy.  // > CustomCode.jszip:2108
       * Implementing the API with the point of view of the next one registering  // > CustomCode.jszip:2109
       * a source is easier, see the ZipFileWorker.  // > CustomCode.jszip:2110
       * @param {Worker} previous the previous worker, sending events to this one  // > CustomCode.jszip:2111
       * @return {Worker} the current worker for chainability  // > CustomCode.jszip:2112
       */  // > CustomCode.jszip:2113
      registerPrevious : function (previous) {  // > CustomCode.jszip:2114
          if (this.isLocked) {  // > CustomCode.jszip:2115
              throw new Error("The stream '" + this + "' has already been used.");  // > CustomCode.jszip:2116
          }  // > CustomCode.jszip:2117
          // sharing the streamInfo...  // > CustomCode.jszip:2118
          this.streamInfo = previous.streamInfo;  // > CustomCode.jszip:2119
          // ... and adding our own bits  // > CustomCode.jszip:2120
          this.mergeStreamInfo();  // > CustomCode.jszip:2121
          this.previous =  previous;  // > CustomCode.jszip:2122
          var self = this;  // > CustomCode.jszip:2123
          previous.on("data", function (chunk) {  // > CustomCode.jszip:2124
              self.processChunk(chunk);  // > CustomCode.jszip:2125
          });  // > CustomCode.jszip:2126
          previous.on("end", function () {  // > CustomCode.jszip:2127
              self.end();  // > CustomCode.jszip:2128
          });  // > CustomCode.jszip:2129
          previous.on("error", function (e) {  // > CustomCode.jszip:2130
              self.error(e);  // > CustomCode.jszip:2131
          });  // > CustomCode.jszip:2132
          return this;  // > CustomCode.jszip:2133
      },  // > CustomCode.jszip:2134
      /**  // > CustomCode.jszip:2135
       * Pause the stream so it doesn't send events anymore.  // > CustomCode.jszip:2136
       * @return {Boolean} true if this call paused the worker, false otherwise.  // > CustomCode.jszip:2137
       */  // > CustomCode.jszip:2138
      pause : function () {  // > CustomCode.jszip:2139
          if(this.isPaused || this.isFinished) {  // > CustomCode.jszip:2140
              return false;  // > CustomCode.jszip:2141
          }  // > CustomCode.jszip:2142
          this.isPaused = true;  // > CustomCode.jszip:2143
          if(this.previous) {  // > CustomCode.jszip:2144
              this.previous.pause();  // > CustomCode.jszip:2145
          }  // > CustomCode.jszip:2146
          return true;  // > CustomCode.jszip:2147
      },  // > CustomCode.jszip:2148
      /**  // > CustomCode.jszip:2149
       * Resume a paused stream.  // > CustomCode.jszip:2150
       * @return {Boolean} true if this call resumed the worker, false otherwise.  // > CustomCode.jszip:2151
       */  // > CustomCode.jszip:2152
      resume : function () {  // > CustomCode.jszip:2153
          if(!this.isPaused || this.isFinished) {  // > CustomCode.jszip:2154
              return false;  // > CustomCode.jszip:2155
          }  // > CustomCode.jszip:2156
          this.isPaused = false;  // > CustomCode.jszip:2157
          // if true, the worker tried to resume but failed  // > CustomCode.jszip:2158
          var withError = false;  // > CustomCode.jszip:2159
          if(this.generatedError) {  // > CustomCode.jszip:2160
              this.error(this.generatedError);  // > CustomCode.jszip:2161
              withError = true;  // > CustomCode.jszip:2162
          }  // > CustomCode.jszip:2163
          if(this.previous) {  // > CustomCode.jszip:2164
              this.previous.resume();  // > CustomCode.jszip:2165
          }  // > CustomCode.jszip:2166
          return !withError;  // > CustomCode.jszip:2167
      },  // > CustomCode.jszip:2168
      /**  // > CustomCode.jszip:2169
       * Flush any remaining bytes as the stream is ending.  // > CustomCode.jszip:2170
       */  // > CustomCode.jszip:2171
      flush : function () {},  // > CustomCode.jszip:2172
      /**  // > CustomCode.jszip:2173
       * Process a chunk. This is usually the method overridden.  // > CustomCode.jszip:2174
       * @param {Object} chunk the chunk to process.  // > CustomCode.jszip:2175
       */  // > CustomCode.jszip:2176
      processChunk : function(chunk) {  // > CustomCode.jszip:2177
          this.push(chunk);  // > CustomCode.jszip:2178
      },  // > CustomCode.jszip:2179
      /**  // > CustomCode.jszip:2180
       * Add a key/value to be added in the workers chain streamInfo once activated.  // > CustomCode.jszip:2181
       * @param {String} key the key to use  // > CustomCode.jszip:2182
       * @param {Object} value the associated value  // > CustomCode.jszip:2183
       * @return {Worker} the current worker for chainability  // > CustomCode.jszip:2184
       */  // > CustomCode.jszip:2185
      withStreamInfo : function (key, value) {  // > CustomCode.jszip:2186
          this.extraStreamInfo[key] = value;  // > CustomCode.jszip:2187
          this.mergeStreamInfo();  // > CustomCode.jszip:2188
          return this;  // > CustomCode.jszip:2189
      },  // > CustomCode.jszip:2190
      /**  // > CustomCode.jszip:2191
       * Merge this worker's streamInfo into the chain's streamInfo.  // > CustomCode.jszip:2192
       */  // > CustomCode.jszip:2193
      mergeStreamInfo : function () {  // > CustomCode.jszip:2194
          for(var key in this.extraStreamInfo) {  // > CustomCode.jszip:2195
              if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, key)) {  // > CustomCode.jszip:2196
                  continue;  // > CustomCode.jszip:2197
              }  // > CustomCode.jszip:2198
              this.streamInfo[key] = this.extraStreamInfo[key];  // > CustomCode.jszip:2199
          }  // > CustomCode.jszip:2200
      },  // > CustomCode.jszip:2201
      /**  // > CustomCode.jszip:2202
       * Lock the stream to prevent further updates on the workers chain.  // > CustomCode.jszip:2203
       * After calling this method, all calls to pipe will fail.  // > CustomCode.jszip:2204
       */  // > CustomCode.jszip:2205
      lock: function () {  // > CustomCode.jszip:2206
          if (this.isLocked) {  // > CustomCode.jszip:2207
              throw new Error("The stream '" + this + "' has already been used.");  // > CustomCode.jszip:2208
          }  // > CustomCode.jszip:2209
          this.isLocked = true;  // > CustomCode.jszip:2210
          if (this.previous) {  // > CustomCode.jszip:2211
              this.previous.lock();  // > CustomCode.jszip:2212
          }  // > CustomCode.jszip:2213
      },  // > CustomCode.jszip:2214
      /**  // > CustomCode.jszip:2215
       *  // > CustomCode.jszip:2216
       * Pretty print the workers chain.  // > CustomCode.jszip:2217
       */  // > CustomCode.jszip:2218
      toString : function () {  // > CustomCode.jszip:2219
          var me = "Worker " + this.name;  // > CustomCode.jszip:2220
          if (this.previous) {  // > CustomCode.jszip:2221
              return this.previous + " -> " + me;  // > CustomCode.jszip:2222
          } else {  // > CustomCode.jszip:2223
              return me;  // > CustomCode.jszip:2224
          }  // > CustomCode.jszip:2225
      }  // > CustomCode.jszip:2226
  };  // > CustomCode.jszip:2227
  module.exports = GenericWorker;  // > CustomCode.jszip:2228
  },{}],29:[function(require,module,exports){  // > CustomCode.jszip:2229
  "use strict";  // > CustomCode.jszip:2230
  var utils = require("../utils");  // > CustomCode.jszip:2231
  var ConvertWorker = require("./ConvertWorker");  // > CustomCode.jszip:2232
  var GenericWorker = require("./GenericWorker");  // > CustomCode.jszip:2233
  var base64 = require("../base64");  // > CustomCode.jszip:2234
  var support = require("../support");  // > CustomCode.jszip:2235
  var external = require("../external");  // > CustomCode.jszip:2236
  var NodejsStreamOutputAdapter = null;  // > CustomCode.jszip:2237
  if (support.nodestream) {  // > CustomCode.jszip:2238
      try {  // > CustomCode.jszip:2239
          NodejsStreamOutputAdapter = require("../nodejs/NodejsStreamOutputAdapter");  // > CustomCode.jszip:2240
      } catch(e) {  // > CustomCode.jszip:2241
          // ignore  // > CustomCode.jszip:2242
      }  // > CustomCode.jszip:2243
  }  // > CustomCode.jszip:2244
  /**  // > CustomCode.jszip:2245
   * Apply the final transformation of the data. If the user wants a Blob for  // > CustomCode.jszip:2246
   * example, it's easier to work with an U8intArray and finally do the  // > CustomCode.jszip:2247
   * ArrayBuffer/Blob conversion.  // > CustomCode.jszip:2248
   * @param {String} type the name of the final type  // > CustomCode.jszip:2249
   * @param {String|Uint8Array|Buffer} content the content to transform  // > CustomCode.jszip:2250
   * @param {String} mimeType the mime type of the content, if applicable.  // > CustomCode.jszip:2251
   * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.  // > CustomCode.jszip:2252
   */  // > CustomCode.jszip:2253
  function transformZipOutput(type, content, mimeType) {  // > CustomCode.jszip:2254
      switch(type) {  // > CustomCode.jszip:2255
      case "blob" :  // > CustomCode.jszip:2256
          return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);  // > CustomCode.jszip:2257
      case "base64" :  // > CustomCode.jszip:2258
          return base64.encode(content);  // > CustomCode.jszip:2259
      default :  // > CustomCode.jszip:2260
          return utils.transformTo(type, content);  // > CustomCode.jszip:2261
      }  // > CustomCode.jszip:2262
  }  // > CustomCode.jszip:2263
  /**  // > CustomCode.jszip:2264
   * Concatenate an array of data of the given type.  // > CustomCode.jszip:2265
   * @param {String} type the type of the data in the given array.  // > CustomCode.jszip:2266
   * @param {Array} dataArray the array containing the data chunks to concatenate  // > CustomCode.jszip:2267
   * @return {String|Uint8Array|Buffer} the concatenated data  // > CustomCode.jszip:2268
   * @throws Error if the asked type is unsupported  // > CustomCode.jszip:2269
   */  // > CustomCode.jszip:2270
  function concat (type, dataArray) {  // > CustomCode.jszip:2271
      var i, index = 0, res = null, totalLength = 0;  // > CustomCode.jszip:2272
      for(i = 0; i < dataArray.length; i++) {  // > CustomCode.jszip:2273
          totalLength += dataArray[i].length;  // > CustomCode.jszip:2274
      }  // > CustomCode.jszip:2275
      switch(type) {  // > CustomCode.jszip:2276
      case "string":  // > CustomCode.jszip:2277
          return dataArray.join("");  // > CustomCode.jszip:2278
      case "array":  // > CustomCode.jszip:2279
          return Array.prototype.concat.apply([], dataArray);  // > CustomCode.jszip:2280
      case "uint8array":  // > CustomCode.jszip:2281
          res = new Uint8Array(totalLength);  // > CustomCode.jszip:2282
          for(i = 0; i < dataArray.length; i++) {  // > CustomCode.jszip:2283
              res.set(dataArray[i], index);  // > CustomCode.jszip:2284
              index += dataArray[i].length;  // > CustomCode.jszip:2285
          }  // > CustomCode.jszip:2286
          return res;  // > CustomCode.jszip:2287
      case "nodebuffer":  // > CustomCode.jszip:2288
          return Buffer.concat(dataArray);  // > CustomCode.jszip:2289
      default:  // > CustomCode.jszip:2290
          throw new Error("concat : unsupported type '"  + type + "'");  // > CustomCode.jszip:2291
      }  // > CustomCode.jszip:2292
  }  // > CustomCode.jszip:2293
  /**  // > CustomCode.jszip:2294
   * Listen a StreamHelper, accumulate its content and concatenate it into a  // > CustomCode.jszip:2295
   * complete block.  // > CustomCode.jszip:2296
   * @param {StreamHelper} helper the helper to use.  // > CustomCode.jszip:2297
   * @param {Function} updateCallback a callback called on each update. Called  // > CustomCode.jszip:2298
   * with one arg :  // > CustomCode.jszip:2299
   * - the metadata linked to the update received.  // > CustomCode.jszip:2300
   * @return Promise the promise for the accumulation.  // > CustomCode.jszip:2301
   */  // > CustomCode.jszip:2302
  function accumulate(helper, updateCallback) {  // > CustomCode.jszip:2303
      return new external.Promise(function (resolve, reject){  // > CustomCode.jszip:2304
          var dataArray = [];  // > CustomCode.jszip:2305
          var chunkType = helper._internalType,  // > CustomCode.jszip:2306
              resultType = helper._outputType,  // > CustomCode.jszip:2307
              mimeType = helper._mimeType;  // > CustomCode.jszip:2308
          helper  // > CustomCode.jszip:2309
              .on("data", function (data, meta) {  // > CustomCode.jszip:2310
                  dataArray.push(data);  // > CustomCode.jszip:2311
                  if(updateCallback) {  // > CustomCode.jszip:2312
                      updateCallback(meta);  // > CustomCode.jszip:2313
                  }  // > CustomCode.jszip:2314
              })  // > CustomCode.jszip:2315
              .on("error", function(err) {  // > CustomCode.jszip:2316
                  dataArray = [];  // > CustomCode.jszip:2317
                  reject(err);  // > CustomCode.jszip:2318
              })  // > CustomCode.jszip:2319
              .on("end", function (){  // > CustomCode.jszip:2320
                  try {  // > CustomCode.jszip:2321
                      var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);  // > CustomCode.jszip:2322
                      resolve(result);  // > CustomCode.jszip:2323
                  } catch (e) {  // > CustomCode.jszip:2324
                      reject(e);  // > CustomCode.jszip:2325
                  }  // > CustomCode.jszip:2326
                  dataArray = [];  // > CustomCode.jszip:2327
              })  // > CustomCode.jszip:2328
              .resume();  // > CustomCode.jszip:2329
      });  // > CustomCode.jszip:2330
  }  // > CustomCode.jszip:2331
  /**  // > CustomCode.jszip:2332
   * An helper to easily use workers outside of JSZip.  // > CustomCode.jszip:2333
   * @constructor  // > CustomCode.jszip:2334
   * @param {Worker} worker the worker to wrap  // > CustomCode.jszip:2335
   * @param {String} outputType the type of data expected by the use  // > CustomCode.jszip:2336
   * @param {String} mimeType the mime type of the content, if applicable.  // > CustomCode.jszip:2337
   */  // > CustomCode.jszip:2338
  function StreamHelper(worker, outputType, mimeType) {  // > CustomCode.jszip:2339
      var internalType = outputType;  // > CustomCode.jszip:2340
      switch(outputType) {  // > CustomCode.jszip:2341
      case "blob":  // > CustomCode.jszip:2342
      case "arraybuffer":  // > CustomCode.jszip:2343
          internalType = "uint8array";  // > CustomCode.jszip:2344
          break;  // > CustomCode.jszip:2345
      case "base64":  // > CustomCode.jszip:2346
          internalType = "string";  // > CustomCode.jszip:2347
          break;  // > CustomCode.jszip:2348
      }  // > CustomCode.jszip:2349
      try {  // > CustomCode.jszip:2350
          // the type used internally  // > CustomCode.jszip:2351
          this._internalType = internalType;  // > CustomCode.jszip:2352
          // the type used to output results  // > CustomCode.jszip:2353
          this._outputType = outputType;  // > CustomCode.jszip:2354
          // the mime type  // > CustomCode.jszip:2355
          this._mimeType = mimeType;  // > CustomCode.jszip:2356
          utils.checkSupport(internalType);  // > CustomCode.jszip:2357
          this._worker = worker.pipe(new ConvertWorker(internalType));  // > CustomCode.jszip:2358
          // the last workers can be rewired without issues but we need to  // > CustomCode.jszip:2359
          // prevent any updates on previous workers.  // > CustomCode.jszip:2360
          worker.lock();  // > CustomCode.jszip:2361
      } catch(e) {  // > CustomCode.jszip:2362
          this._worker = new GenericWorker("error");  // > CustomCode.jszip:2363
          this._worker.error(e);  // > CustomCode.jszip:2364
      }  // > CustomCode.jszip:2365
  }  // > CustomCode.jszip:2366
  StreamHelper.prototype = {  // > CustomCode.jszip:2367
      /**  // > CustomCode.jszip:2368
       * Listen a StreamHelper, accumulate its content and concatenate it into a  // > CustomCode.jszip:2369
       * complete block.  // > CustomCode.jszip:2370
       * @param {Function} updateCb the update callback.  // > CustomCode.jszip:2371
       * @return Promise the promise for the accumulation.  // > CustomCode.jszip:2372
       */  // > CustomCode.jszip:2373
      accumulate : function (updateCb) {  // > CustomCode.jszip:2374
          return accumulate(this, updateCb);  // > CustomCode.jszip:2375
      },  // > CustomCode.jszip:2376
      /**  // > CustomCode.jszip:2377
       * Add a listener on an event triggered on a stream.  // > CustomCode.jszip:2378
       * @param {String} evt the name of the event  // > CustomCode.jszip:2379
       * @param {Function} fn the listener  // > CustomCode.jszip:2380
       * @return {StreamHelper} the current helper.  // > CustomCode.jszip:2381
       */  // > CustomCode.jszip:2382
      on : function (evt, fn) {  // > CustomCode.jszip:2383
          var self = this;  // > CustomCode.jszip:2384
          if(evt === "data") {  // > CustomCode.jszip:2385
              this._worker.on(evt, function (chunk) {  // > CustomCode.jszip:2386
                  fn.call(self, chunk.data, chunk.meta);  // > CustomCode.jszip:2387
              });  // > CustomCode.jszip:2388
          } else {  // > CustomCode.jszip:2389
              this._worker.on(evt, function () {  // > CustomCode.jszip:2390
                  utils.delay(fn, arguments, self);  // > CustomCode.jszip:2391
              });  // > CustomCode.jszip:2392
          }  // > CustomCode.jszip:2393
          return this;  // > CustomCode.jszip:2394
      },  // > CustomCode.jszip:2395
      /**  // > CustomCode.jszip:2396
       * Resume the flow of chunks.  // > CustomCode.jszip:2397
       * @return {StreamHelper} the current helper.  // > CustomCode.jszip:2398
       */  // > CustomCode.jszip:2399
      resume : function () {  // > CustomCode.jszip:2400
          utils.delay(this._worker.resume, [], this._worker);  // > CustomCode.jszip:2401
          return this;  // > CustomCode.jszip:2402
      },  // > CustomCode.jszip:2403
      /**  // > CustomCode.jszip:2404
       * Pause the flow of chunks.  // > CustomCode.jszip:2405
       * @return {StreamHelper} the current helper.  // > CustomCode.jszip:2406
       */  // > CustomCode.jszip:2407
      pause : function () {  // > CustomCode.jszip:2408
          this._worker.pause();  // > CustomCode.jszip:2409
          return this;  // > CustomCode.jszip:2410
      },  // > CustomCode.jszip:2411
      /**  // > CustomCode.jszip:2412
       * Return a nodejs stream for this helper.  // > CustomCode.jszip:2413
       * @param {Function} updateCb the update callback.  // > CustomCode.jszip:2414
       * @return {NodejsStreamOutputAdapter} the nodejs stream.  // > CustomCode.jszip:2415
       */  // > CustomCode.jszip:2416
      toNodejsStream : function (updateCb) {  // > CustomCode.jszip:2417
          utils.checkSupport("nodestream");  // > CustomCode.jszip:2418
          if (this._outputType !== "nodebuffer") {  // > CustomCode.jszip:2419
              // an object stream containing blob/arraybuffer/uint8array/string  // > CustomCode.jszip:2420
              // is strange and I don't know if it would be useful.  // > CustomCode.jszip:2421
              // I you find this comment and have a good usecase, please open a  // > CustomCode.jszip:2422
              // bug report !  // > CustomCode.jszip:2423
              throw new Error(this._outputType + " is not supported by this method");  // > CustomCode.jszip:2424
          }  // > CustomCode.jszip:2425
          return new NodejsStreamOutputAdapter(this, {  // > CustomCode.jszip:2426
              objectMode : this._outputType !== "nodebuffer"  // > CustomCode.jszip:2427
          }, updateCb);  // > CustomCode.jszip:2428
      }  // > CustomCode.jszip:2429
  };  // > CustomCode.jszip:2430
  module.exports = StreamHelper;  // > CustomCode.jszip:2431
  },{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(require,module,exports){  // > CustomCode.jszip:2432
  "use strict";  // > CustomCode.jszip:2433
  exports.base64 = true;  // > CustomCode.jszip:2434
  exports.array = true;  // > CustomCode.jszip:2435
  exports.string = true;  // > CustomCode.jszip:2436
  exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";  // > CustomCode.jszip:2437
  exports.nodebuffer = typeof Buffer !== "undefined";  // > CustomCode.jszip:2438
  // contains true if JSZip can read/generate Uint8Array, false otherwise.  // > CustomCode.jszip:2439
  exports.uint8array = typeof Uint8Array !== "undefined";  // > CustomCode.jszip:2440
  if (typeof ArrayBuffer === "undefined") {  // > CustomCode.jszip:2441
      exports.blob = false;  // > CustomCode.jszip:2442
  }  // > CustomCode.jszip:2443
  else {  // > CustomCode.jszip:2444
      var buffer = new ArrayBuffer(0);  // > CustomCode.jszip:2445
      try {  // > CustomCode.jszip:2446
          exports.blob = new Blob([buffer], {  // > CustomCode.jszip:2447
              type: "application/zip"  // > CustomCode.jszip:2448
          }).size === 0;  // > CustomCode.jszip:2449
      }  // > CustomCode.jszip:2450
      catch (e) {  // > CustomCode.jszip:2451
          try {  // > CustomCode.jszip:2452
              var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;  // > CustomCode.jszip:2453
              var builder = new Builder();  // > CustomCode.jszip:2454
              builder.append(buffer);  // > CustomCode.jszip:2455
              exports.blob = builder.getBlob("application/zip").size === 0;  // > CustomCode.jszip:2456
          }  // > CustomCode.jszip:2457
          catch (e) {  // > CustomCode.jszip:2458
              exports.blob = false;  // > CustomCode.jszip:2459
          }  // > CustomCode.jszip:2460
      }  // > CustomCode.jszip:2461
  }  // > CustomCode.jszip:2462
  try {  // > CustomCode.jszip:2463
      exports.nodestream = !!require("readable-stream").Readable;  // > CustomCode.jszip:2464
  } catch(e) {  // > CustomCode.jszip:2465
      exports.nodestream = false;  // > CustomCode.jszip:2466
  }  // > CustomCode.jszip:2467
  },{"readable-stream":16}],31:[function(require,module,exports){  // > CustomCode.jszip:2468
  "use strict";  // > CustomCode.jszip:2469
  var utils = require("./utils");  // > CustomCode.jszip:2470
  var support = require("./support");  // > CustomCode.jszip:2471
  var nodejsUtils = require("./nodejsUtils");  // > CustomCode.jszip:2472
  var GenericWorker = require("./stream/GenericWorker");  // > CustomCode.jszip:2473
  /**  // > CustomCode.jszip:2474
   * The following functions come from pako, from pako/lib/utils/strings  // > CustomCode.jszip:2475
   * released under the MIT license, see pako https://github.com/nodeca/pako/  // > CustomCode.jszip:2476
   */  // > CustomCode.jszip:2477
  // Table with utf8 lengths (calculated by first byte of sequence)  // > CustomCode.jszip:2478
  // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,  // > CustomCode.jszip:2479
  // because max possible codepoint is 0x10ffff  // > CustomCode.jszip:2480
  var _utf8len = new Array(256);  // > CustomCode.jszip:2481
  for (var i=0; i<256; i++) {  // > CustomCode.jszip:2482
      _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);  // > CustomCode.jszip:2483
  }  // > CustomCode.jszip:2484
  _utf8len[254]=_utf8len[254]=1; // Invalid sequence start  // > CustomCode.jszip:2485
  // convert string to array (typed, when possible)  // > CustomCode.jszip:2486
  var string2buf = function (str) {  // > CustomCode.jszip:2487
      var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;  // > CustomCode.jszip:2488
      // count binary size  // > CustomCode.jszip:2489
      for (m_pos = 0; m_pos < str_len; m_pos++) {  // > CustomCode.jszip:2490
          c = str.charCodeAt(m_pos);  // > CustomCode.jszip:2491
          if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {  // > CustomCode.jszip:2492
              c2 = str.charCodeAt(m_pos+1);  // > CustomCode.jszip:2493
              if ((c2 & 0xfc00) === 0xdc00) {  // > CustomCode.jszip:2494
                  c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);  // > CustomCode.jszip:2495
                  m_pos++;  // > CustomCode.jszip:2496
              }  // > CustomCode.jszip:2497
          }  // > CustomCode.jszip:2498
          buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;  // > CustomCode.jszip:2499
      }  // > CustomCode.jszip:2500
      // allocate buffer  // > CustomCode.jszip:2501
      if (support.uint8array) {  // > CustomCode.jszip:2502
          buf = new Uint8Array(buf_len);  // > CustomCode.jszip:2503
      } else {  // > CustomCode.jszip:2504
          buf = new Array(buf_len);  // > CustomCode.jszip:2505
      }  // > CustomCode.jszip:2506
      // convert  // > CustomCode.jszip:2507
      for (i=0, m_pos = 0; i < buf_len; m_pos++) {  // > CustomCode.jszip:2508
          c = str.charCodeAt(m_pos);  // > CustomCode.jszip:2509
          if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {  // > CustomCode.jszip:2510
              c2 = str.charCodeAt(m_pos+1);  // > CustomCode.jszip:2511
              if ((c2 & 0xfc00) === 0xdc00) {  // > CustomCode.jszip:2512
                  c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);  // > CustomCode.jszip:2513
                  m_pos++;  // > CustomCode.jszip:2514
              }  // > CustomCode.jszip:2515
          }  // > CustomCode.jszip:2516
          if (c < 0x80) {  // > CustomCode.jszip:2517
              /* one byte */  // > CustomCode.jszip:2518
              buf[i++] = c;  // > CustomCode.jszip:2519
          } else if (c < 0x800) {  // > CustomCode.jszip:2520
              /* two bytes */  // > CustomCode.jszip:2521
              buf[i++] = 0xC0 | (c >>> 6);  // > CustomCode.jszip:2522
              buf[i++] = 0x80 | (c & 0x3f);  // > CustomCode.jszip:2523
          } else if (c < 0x10000) {  // > CustomCode.jszip:2524
              /* three bytes */  // > CustomCode.jszip:2525
              buf[i++] = 0xE0 | (c >>> 12);  // > CustomCode.jszip:2526
              buf[i++] = 0x80 | (c >>> 6 & 0x3f);  // > CustomCode.jszip:2527
              buf[i++] = 0x80 | (c & 0x3f);  // > CustomCode.jszip:2528
          } else {  // > CustomCode.jszip:2529
              /* four bytes */  // > CustomCode.jszip:2530
              buf[i++] = 0xf0 | (c >>> 18);  // > CustomCode.jszip:2531
              buf[i++] = 0x80 | (c >>> 12 & 0x3f);  // > CustomCode.jszip:2532
              buf[i++] = 0x80 | (c >>> 6 & 0x3f);  // > CustomCode.jszip:2533
              buf[i++] = 0x80 | (c & 0x3f);  // > CustomCode.jszip:2534
          }  // > CustomCode.jszip:2535
      }  // > CustomCode.jszip:2536
      return buf;  // > CustomCode.jszip:2537
  };  // > CustomCode.jszip:2538
  // Calculate max possible position in utf8 buffer,  // > CustomCode.jszip:2539
  // that will not break sequence. If that's not possible  // > CustomCode.jszip:2540
  // - (very small limits) return max size as is.  // > CustomCode.jszip:2541
  //  // > CustomCode.jszip:2542
  // buf[] - utf8 bytes array  // > CustomCode.jszip:2543
  // max   - length limit (mandatory);  // > CustomCode.jszip:2544
  var utf8border = function(buf, max) {  // > CustomCode.jszip:2545
      var pos;  // > CustomCode.jszip:2546
      max = max || buf.length;  // > CustomCode.jszip:2547
      if (max > buf.length) { max = buf.length; }  // > CustomCode.jszip:2548
      // go back from last position, until start of sequence found  // > CustomCode.jszip:2549
      pos = max-1;  // > CustomCode.jszip:2550
      while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }  // > CustomCode.jszip:2551
      // Fuckup - very small and broken sequence,  // > CustomCode.jszip:2552
      // return max, because we should return something anyway.  // > CustomCode.jszip:2553
      if (pos < 0) { return max; }  // > CustomCode.jszip:2554
      // If we came to start of buffer - that means vuffer is too small,  // > CustomCode.jszip:2555
      // return max too.  // > CustomCode.jszip:2556
      if (pos === 0) { return max; }  // > CustomCode.jszip:2557
      return (pos + _utf8len[buf[pos]] > max) ? pos : max;  // > CustomCode.jszip:2558
  };  // > CustomCode.jszip:2559
  // convert array to string  // > CustomCode.jszip:2560
  var buf2string = function (buf) {  // > CustomCode.jszip:2561
      var i, out, c, c_len;  // > CustomCode.jszip:2562
      var len = buf.length;  // > CustomCode.jszip:2563
      // Reserve max possible length (2 words per char)  // > CustomCode.jszip:2564
      // NB: by unknown reasons, Array is significantly faster for  // > CustomCode.jszip:2565
      //     String.fromCharCode.apply than Uint16Array.  // > CustomCode.jszip:2566
      var utf16buf = new Array(len*2);  // > CustomCode.jszip:2567
      for (out=0, i=0; i<len;) {  // > CustomCode.jszip:2568
          c = buf[i++];  // > CustomCode.jszip:2569
          // quick process ascii  // > CustomCode.jszip:2570
          if (c < 0x80) { utf16buf[out++] = c; continue; }  // > CustomCode.jszip:2571
          c_len = _utf8len[c];  // > CustomCode.jszip:2572
          // skip 5 & 6 byte codes  // > CustomCode.jszip:2573
          if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }  // > CustomCode.jszip:2574
          // apply mask on first byte  // > CustomCode.jszip:2575
          c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;  // > CustomCode.jszip:2576
          // join the rest  // > CustomCode.jszip:2577
          while (c_len > 1 && i < len) {  // > CustomCode.jszip:2578
              c = (c << 6) | (buf[i++] & 0x3f);  // > CustomCode.jszip:2579
              c_len--;  // > CustomCode.jszip:2580
          }  // > CustomCode.jszip:2581
          // terminated by end of string?  // > CustomCode.jszip:2582
          if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }  // > CustomCode.jszip:2583
          if (c < 0x10000) {  // > CustomCode.jszip:2584
              utf16buf[out++] = c;  // > CustomCode.jszip:2585
          } else {  // > CustomCode.jszip:2586
              c -= 0x10000;  // > CustomCode.jszip:2587
              utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);  // > CustomCode.jszip:2588
              utf16buf[out++] = 0xdc00 | (c & 0x3ff);  // > CustomCode.jszip:2589
          }  // > CustomCode.jszip:2590
      }  // > CustomCode.jszip:2591
      // shrinkBuf(utf16buf, out)  // > CustomCode.jszip:2592
      if (utf16buf.length !== out) {  // > CustomCode.jszip:2593
          if(utf16buf.subarray) {  // > CustomCode.jszip:2594
              utf16buf = utf16buf.subarray(0, out);  // > CustomCode.jszip:2595
          } else {  // > CustomCode.jszip:2596
              utf16buf.length = out;  // > CustomCode.jszip:2597
          }  // > CustomCode.jszip:2598
      }  // > CustomCode.jszip:2599
      // return String.fromCharCode.apply(null, utf16buf);  // > CustomCode.jszip:2600
      return utils.applyFromCharCode(utf16buf);  // > CustomCode.jszip:2601
  };  // > CustomCode.jszip:2602
  // That's all for the pako functions.  // > CustomCode.jszip:2603
  /**  // > CustomCode.jszip:2604
   * Transform a javascript string into an array (typed if possible) of bytes,  // > CustomCode.jszip:2605
   * UTF-8 encoded.  // > CustomCode.jszip:2606
   * @param {String} str the string to encode  // > CustomCode.jszip:2607
   * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.  // > CustomCode.jszip:2608
   */  // > CustomCode.jszip:2609
  exports.utf8encode = function utf8encode(str) {  // > CustomCode.jszip:2610
      if (support.nodebuffer) {  // > CustomCode.jszip:2611
          return nodejsUtils.newBufferFrom(str, "utf-8");  // > CustomCode.jszip:2612
      }  // > CustomCode.jszip:2613
      return string2buf(str);  // > CustomCode.jszip:2614
  };  // > CustomCode.jszip:2615
  /**  // > CustomCode.jszip:2616
   * Transform a bytes array (or a representation) representing an UTF-8 encoded  // > CustomCode.jszip:2617
   * string into a javascript string.  // > CustomCode.jszip:2618
   * @param {Array|Uint8Array|Buffer} buf the data de decode  // > CustomCode.jszip:2619
   * @return {String} the decoded string.  // > CustomCode.jszip:2620
   */  // > CustomCode.jszip:2621
  exports.utf8decode = function utf8decode(buf) {  // > CustomCode.jszip:2622
      if (support.nodebuffer) {  // > CustomCode.jszip:2623
          return utils.transformTo("nodebuffer", buf).toString("utf-8");  // > CustomCode.jszip:2624
      }  // > CustomCode.jszip:2625
      buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);  // > CustomCode.jszip:2626
      return buf2string(buf);  // > CustomCode.jszip:2627
  };  // > CustomCode.jszip:2628
  /**  // > CustomCode.jszip:2629
   * A worker to decode utf8 encoded binary chunks into string chunks.  // > CustomCode.jszip:2630
   * @constructor  // > CustomCode.jszip:2631
   */  // > CustomCode.jszip:2632
  function Utf8DecodeWorker() {  // > CustomCode.jszip:2633
      GenericWorker.call(this, "utf-8 decode");  // > CustomCode.jszip:2634
      // the last bytes if a chunk didn't end with a complete codepoint.  // > CustomCode.jszip:2635
      this.leftOver = null;  // > CustomCode.jszip:2636
  }  // > CustomCode.jszip:2637
  utils.inherits(Utf8DecodeWorker, GenericWorker);  // > CustomCode.jszip:2638
  /**  // > CustomCode.jszip:2639
   * @see GenericWorker.processChunk  // > CustomCode.jszip:2640
   */  // > CustomCode.jszip:2641
  Utf8DecodeWorker.prototype.processChunk = function (chunk) {  // > CustomCode.jszip:2642
      var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);  // > CustomCode.jszip:2643
      // 1st step, re-use what's left of the previous chunk  // > CustomCode.jszip:2644
      if (this.leftOver && this.leftOver.length) {  // > CustomCode.jszip:2645
          if(support.uint8array) {  // > CustomCode.jszip:2646
              var previousData = data;  // > CustomCode.jszip:2647
              data = new Uint8Array(previousData.length + this.leftOver.length);  // > CustomCode.jszip:2648
              data.set(this.leftOver, 0);  // > CustomCode.jszip:2649
              data.set(previousData, this.leftOver.length);  // > CustomCode.jszip:2650
          } else {  // > CustomCode.jszip:2651
              data = this.leftOver.concat(data);  // > CustomCode.jszip:2652
          }  // > CustomCode.jszip:2653
          this.leftOver = null;  // > CustomCode.jszip:2654
      }  // > CustomCode.jszip:2655
      var nextBoundary = utf8border(data);  // > CustomCode.jszip:2656
      var usableData = data;  // > CustomCode.jszip:2657
      if (nextBoundary !== data.length) {  // > CustomCode.jszip:2658
          if (support.uint8array) {  // > CustomCode.jszip:2659
              usableData = data.subarray(0, nextBoundary);  // > CustomCode.jszip:2660
              this.leftOver = data.subarray(nextBoundary, data.length);  // > CustomCode.jszip:2661
          } else {  // > CustomCode.jszip:2662
              usableData = data.slice(0, nextBoundary);  // > CustomCode.jszip:2663
              this.leftOver = data.slice(nextBoundary, data.length);  // > CustomCode.jszip:2664
          }  // > CustomCode.jszip:2665
      }  // > CustomCode.jszip:2666
      this.push({  // > CustomCode.jszip:2667
          data : exports.utf8decode(usableData),  // > CustomCode.jszip:2668
          meta : chunk.meta  // > CustomCode.jszip:2669
      });  // > CustomCode.jszip:2670
  };  // > CustomCode.jszip:2671
  /**  // > CustomCode.jszip:2672
   * @see GenericWorker.flush  // > CustomCode.jszip:2673
   */  // > CustomCode.jszip:2674
  Utf8DecodeWorker.prototype.flush = function () {  // > CustomCode.jszip:2675
      if(this.leftOver && this.leftOver.length) {  // > CustomCode.jszip:2676
          this.push({  // > CustomCode.jszip:2677
              data : exports.utf8decode(this.leftOver),  // > CustomCode.jszip:2678
              meta : {}  // > CustomCode.jszip:2679
          });  // > CustomCode.jszip:2680
          this.leftOver = null;  // > CustomCode.jszip:2681
      }  // > CustomCode.jszip:2682
  };  // > CustomCode.jszip:2683
  exports.Utf8DecodeWorker = Utf8DecodeWorker;  // > CustomCode.jszip:2684
  /**  // > CustomCode.jszip:2685
   * A worker to endcode string chunks into utf8 encoded binary chunks.  // > CustomCode.jszip:2686
   * @constructor  // > CustomCode.jszip:2687
   */  // > CustomCode.jszip:2688
  function Utf8EncodeWorker() {  // > CustomCode.jszip:2689
      GenericWorker.call(this, "utf-8 encode");  // > CustomCode.jszip:2690
  }  // > CustomCode.jszip:2691
  utils.inherits(Utf8EncodeWorker, GenericWorker);  // > CustomCode.jszip:2692
  /**  // > CustomCode.jszip:2693
   * @see GenericWorker.processChunk  // > CustomCode.jszip:2694
   */  // > CustomCode.jszip:2695
  Utf8EncodeWorker.prototype.processChunk = function (chunk) {  // > CustomCode.jszip:2696
      this.push({  // > CustomCode.jszip:2697
          data : exports.utf8encode(chunk.data),  // > CustomCode.jszip:2698
          meta : chunk.meta  // > CustomCode.jszip:2699
      });  // > CustomCode.jszip:2700
  };  // > CustomCode.jszip:2701
  exports.Utf8EncodeWorker = Utf8EncodeWorker;  // > CustomCode.jszip:2702
  },{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(require,module,exports){  // > CustomCode.jszip:2703
  "use strict";  // > CustomCode.jszip:2704
  var support = require("./support");  // > CustomCode.jszip:2705
  var base64 = require("./base64");  // > CustomCode.jszip:2706
  var nodejsUtils = require("./nodejsUtils");  // > CustomCode.jszip:2707
  var external = require("./external");  // > CustomCode.jszip:2708
  require("setimmediate");  // > CustomCode.jszip:2709
  /**  // > CustomCode.jszip:2710
   * Convert a string that pass as a "binary string": it should represent a byte  // > CustomCode.jszip:2711
   * array but may have > 255 char codes. Be sure to take only the first byte  // > CustomCode.jszip:2712
   * and returns the byte array.  // > CustomCode.jszip:2713
   * @param {String} str the string to transform.  // > CustomCode.jszip:2714
   * @return {Array|Uint8Array} the string in a binary format.  // > CustomCode.jszip:2715
   */  // > CustomCode.jszip:2716
  function string2binary(str) {  // > CustomCode.jszip:2717
      var result = null;  // > CustomCode.jszip:2718
      if (support.uint8array) {  // > CustomCode.jszip:2719
          result = new Uint8Array(str.length);  // > CustomCode.jszip:2720
      } else {  // > CustomCode.jszip:2721
          result = new Array(str.length);  // > CustomCode.jszip:2722
      }  // > CustomCode.jszip:2723
      return stringToArrayLike(str, result);  // > CustomCode.jszip:2724
  }  // > CustomCode.jszip:2725
  /**  // > CustomCode.jszip:2726
   * Create a new blob with the given content and the given type.  // > CustomCode.jszip:2727
   * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use  // > CustomCode.jszip:2728
   * an Uint8Array because the stock browser of android 4 won't accept it (it  // > CustomCode.jszip:2729
   * will be silently converted to a string, "[object Uint8Array]").  // > CustomCode.jszip:2730
   *  // > CustomCode.jszip:2731
   * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:  // > CustomCode.jszip:2732
   * when a large amount of Array is used to create the Blob, the amount of  // > CustomCode.jszip:2733
   * memory consumed is nearly 100 times the original data amount.  // > CustomCode.jszip:2734
   *  // > CustomCode.jszip:2735
   * @param {String} type the mime type of the blob.  // > CustomCode.jszip:2736
   * @return {Blob} the created blob.  // > CustomCode.jszip:2737
   */  // > CustomCode.jszip:2738
  exports.newBlob = function(part, type) {  // > CustomCode.jszip:2739
      exports.checkSupport("blob");  // > CustomCode.jszip:2740
      try {  // > CustomCode.jszip:2741
          // Blob constructor  // > CustomCode.jszip:2742
          return new Blob([part], {  // > CustomCode.jszip:2743
              type: type  // > CustomCode.jszip:2744
          });  // > CustomCode.jszip:2745
      }  // > CustomCode.jszip:2746
      catch (e) {  // > CustomCode.jszip:2747
          try {  // > CustomCode.jszip:2748
              // deprecated, browser only, old way  // > CustomCode.jszip:2749
              var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;  // > CustomCode.jszip:2750
              var builder = new Builder();  // > CustomCode.jszip:2751
              builder.append(part);  // > CustomCode.jszip:2752
              return builder.getBlob(type);  // > CustomCode.jszip:2753
          }  // > CustomCode.jszip:2754
          catch (e) {  // > CustomCode.jszip:2755
              // well, fuck ?!  // > CustomCode.jszip:2756
              throw new Error("Bug : can't construct the Blob.");  // > CustomCode.jszip:2757
          }  // > CustomCode.jszip:2758
      }  // > CustomCode.jszip:2759
  };  // > CustomCode.jszip:2760
  /**  // > CustomCode.jszip:2761
   * The identity function.  // > CustomCode.jszip:2762
   * @param {Object} input the input.  // > CustomCode.jszip:2763
   * @return {Object} the same input.  // > CustomCode.jszip:2764
   */  // > CustomCode.jszip:2765
  function identity(input) {  // > CustomCode.jszip:2766
      return input;  // > CustomCode.jszip:2767
  }  // > CustomCode.jszip:2768
  /**  // > CustomCode.jszip:2769
   * Fill in an array with a string.  // > CustomCode.jszip:2770
   * @param {String} str the string to use.  // > CustomCode.jszip:2771
   * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).  // > CustomCode.jszip:2772
   * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.  // > CustomCode.jszip:2773
   */  // > CustomCode.jszip:2774
  function stringToArrayLike(str, array) {  // > CustomCode.jszip:2775
      for (var i = 0; i < str.length; ++i) {  // > CustomCode.jszip:2776
          array[i] = str.charCodeAt(i) & 0xFF;  // > CustomCode.jszip:2777
      }  // > CustomCode.jszip:2778
      return array;  // > CustomCode.jszip:2779
  }  // > CustomCode.jszip:2780
  /**  // > CustomCode.jszip:2781
   * An helper for the function arrayLikeToString.  // > CustomCode.jszip:2782
   * This contains static information and functions that  // > CustomCode.jszip:2783
   * can be optimized by the browser JIT compiler.  // > CustomCode.jszip:2784
   */  // > CustomCode.jszip:2785
  var arrayToStringHelper = {  // > CustomCode.jszip:2786
      /**  // > CustomCode.jszip:2787
       * Transform an array of int into a string, chunk by chunk.  // > CustomCode.jszip:2788
       * See the performances notes on arrayLikeToString.  // > CustomCode.jszip:2789
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.  // > CustomCode.jszip:2790
       * @param {String} type the type of the array.  // > CustomCode.jszip:2791
       * @param {Integer} chunk the chunk size.  // > CustomCode.jszip:2792
       * @return {String} the resulting string.  // > CustomCode.jszip:2793
       * @throws Error if the chunk is too big for the stack.  // > CustomCode.jszip:2794
       */  // > CustomCode.jszip:2795
      stringifyByChunk: function(array, type, chunk) {  // > CustomCode.jszip:2796
          var result = [], k = 0, len = array.length;  // > CustomCode.jszip:2797
          // shortcut  // > CustomCode.jszip:2798
          if (len <= chunk) {  // > CustomCode.jszip:2799
              return String.fromCharCode.apply(null, array);  // > CustomCode.jszip:2800
          }  // > CustomCode.jszip:2801
          while (k < len) {  // > CustomCode.jszip:2802
              if (type === "array" || type === "nodebuffer") {  // > CustomCode.jszip:2803
                  result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));  // > CustomCode.jszip:2804
              }  // > CustomCode.jszip:2805
              else {  // > CustomCode.jszip:2806
                  result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));  // > CustomCode.jszip:2807
              }  // > CustomCode.jszip:2808
              k += chunk;  // > CustomCode.jszip:2809
          }  // > CustomCode.jszip:2810
          return result.join("");  // > CustomCode.jszip:2811
      },  // > CustomCode.jszip:2812
      /**  // > CustomCode.jszip:2813
       * Call String.fromCharCode on every item in the array.  // > CustomCode.jszip:2814
       * This is the naive implementation, which generate A LOT of intermediate string.  // > CustomCode.jszip:2815
       * This should be used when everything else fail.  // > CustomCode.jszip:2816
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.  // > CustomCode.jszip:2817
       * @return {String} the result.  // > CustomCode.jszip:2818
       */  // > CustomCode.jszip:2819
      stringifyByChar: function(array){  // > CustomCode.jszip:2820
          var resultStr = "";  // > CustomCode.jszip:2821
          for(var i = 0; i < array.length; i++) {  // > CustomCode.jszip:2822
              resultStr += String.fromCharCode(array[i]);  // > CustomCode.jszip:2823
          }  // > CustomCode.jszip:2824
          return resultStr;  // > CustomCode.jszip:2825
      },  // > CustomCode.jszip:2826
      applyCanBeUsed : {  // > CustomCode.jszip:2827
          /**  // > CustomCode.jszip:2828
           * true if the browser accepts to use String.fromCharCode on Uint8Array  // > CustomCode.jszip:2829
           */  // > CustomCode.jszip:2830
          uint8array : (function () {  // > CustomCode.jszip:2831
              try {  // > CustomCode.jszip:2832
                  return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;  // > CustomCode.jszip:2833
              } catch (e) {  // > CustomCode.jszip:2834
                  return false;  // > CustomCode.jszip:2835
              }  // > CustomCode.jszip:2836
          })(),  // > CustomCode.jszip:2837
          /**  // > CustomCode.jszip:2838
           * true if the browser accepts to use String.fromCharCode on nodejs Buffer.  // > CustomCode.jszip:2839
           */  // > CustomCode.jszip:2840
          nodebuffer : (function () {  // > CustomCode.jszip:2841
              try {  // > CustomCode.jszip:2842
                  return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;  // > CustomCode.jszip:2843
              } catch (e) {  // > CustomCode.jszip:2844
                  return false;  // > CustomCode.jszip:2845
              }  // > CustomCode.jszip:2846
          })()  // > CustomCode.jszip:2847
      }  // > CustomCode.jszip:2848
  };  // > CustomCode.jszip:2849
  /**  // > CustomCode.jszip:2850
   * Transform an array-like object to a string.  // > CustomCode.jszip:2851
   * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.  // > CustomCode.jszip:2852
   * @return {String} the result.  // > CustomCode.jszip:2853
   */  // > CustomCode.jszip:2854
  function arrayLikeToString(array) {  // > CustomCode.jszip:2855
      // Performances notes :  // > CustomCode.jszip:2856
      // --------------------  // > CustomCode.jszip:2857
      // String.fromCharCode.apply(null, array) is the fastest, see  // > CustomCode.jszip:2858
      // see http://jsperf.com/converting-a-uint8array-to-a-string/2  // > CustomCode.jszip:2859
      // but the stack is limited (and we can get huge arrays !).  // > CustomCode.jszip:2860
      //  // > CustomCode.jszip:2861
      // result += String.fromCharCode(array[i]); generate too many strings !  // > CustomCode.jszip:2862
      //  // > CustomCode.jszip:2863
      // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2  // > CustomCode.jszip:2864
      // TODO : we now have workers that split the work. Do we still need that ?  // > CustomCode.jszip:2865
      var chunk = 65536,  // > CustomCode.jszip:2866
          type = exports.getTypeOf(array),  // > CustomCode.jszip:2867
          canUseApply = true;  // > CustomCode.jszip:2868
      if (type === "uint8array") {  // > CustomCode.jszip:2869
          canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;  // > CustomCode.jszip:2870
      } else if (type === "nodebuffer") {  // > CustomCode.jszip:2871
          canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;  // > CustomCode.jszip:2872
      }  // > CustomCode.jszip:2873
      if (canUseApply) {  // > CustomCode.jszip:2874
          while (chunk > 1) {  // > CustomCode.jszip:2875
              try {  // > CustomCode.jszip:2876
                  return arrayToStringHelper.stringifyByChunk(array, type, chunk);  // > CustomCode.jszip:2877
              } catch (e) {  // > CustomCode.jszip:2878
                  chunk = Math.floor(chunk / 2);  // > CustomCode.jszip:2879
              }  // > CustomCode.jszip:2880
          }  // > CustomCode.jszip:2881
      }  // > CustomCode.jszip:2882
      // no apply or chunk error : slow and painful algorithm  // > CustomCode.jszip:2883
      // default browser on android 4.*  // > CustomCode.jszip:2884
      return arrayToStringHelper.stringifyByChar(array);  // > CustomCode.jszip:2885
  }  // > CustomCode.jszip:2886
  exports.applyFromCharCode = arrayLikeToString;  // > CustomCode.jszip:2887
  /**  // > CustomCode.jszip:2888
   * Copy the data from an array-like to an other array-like.  // > CustomCode.jszip:2889
   * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.  // > CustomCode.jszip:2890
   * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.  // > CustomCode.jszip:2891
   * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.  // > CustomCode.jszip:2892
   */  // > CustomCode.jszip:2893
  function arrayLikeToArrayLike(arrayFrom, arrayTo) {  // > CustomCode.jszip:2894
      for (var i = 0; i < arrayFrom.length; i++) {  // > CustomCode.jszip:2895
          arrayTo[i] = arrayFrom[i];  // > CustomCode.jszip:2896
      }  // > CustomCode.jszip:2897
      return arrayTo;  // > CustomCode.jszip:2898
  }  // > CustomCode.jszip:2899
  // a matrix containing functions to transform everything into everything.  // > CustomCode.jszip:2900
  var transform = {};  // > CustomCode.jszip:2901
  // string to ?  // > CustomCode.jszip:2902
  transform["string"] = {  // > CustomCode.jszip:2903
      "string": identity,  // > CustomCode.jszip:2904
      "array": function(input) {  // > CustomCode.jszip:2905
          return stringToArrayLike(input, new Array(input.length));  // > CustomCode.jszip:2906
      },  // > CustomCode.jszip:2907
      "arraybuffer": function(input) {  // > CustomCode.jszip:2908
          return transform["string"]["uint8array"](input).buffer;  // > CustomCode.jszip:2909
      },  // > CustomCode.jszip:2910
      "uint8array": function(input) {  // > CustomCode.jszip:2911
          return stringToArrayLike(input, new Uint8Array(input.length));  // > CustomCode.jszip:2912
      },  // > CustomCode.jszip:2913
      "nodebuffer": function(input) {  // > CustomCode.jszip:2914
          return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));  // > CustomCode.jszip:2915
      }  // > CustomCode.jszip:2916
  };  // > CustomCode.jszip:2917
  // array to ?  // > CustomCode.jszip:2918
  transform["array"] = {  // > CustomCode.jszip:2919
      "string": arrayLikeToString,  // > CustomCode.jszip:2920
      "array": identity,  // > CustomCode.jszip:2921
      "arraybuffer": function(input) {  // > CustomCode.jszip:2922
          return (new Uint8Array(input)).buffer;  // > CustomCode.jszip:2923
      },  // > CustomCode.jszip:2924
      "uint8array": function(input) {  // > CustomCode.jszip:2925
          return new Uint8Array(input);  // > CustomCode.jszip:2926
      },  // > CustomCode.jszip:2927
      "nodebuffer": function(input) {  // > CustomCode.jszip:2928
          return nodejsUtils.newBufferFrom(input);  // > CustomCode.jszip:2929
      }  // > CustomCode.jszip:2930
  };  // > CustomCode.jszip:2931
  // arraybuffer to ?  // > CustomCode.jszip:2932
  transform["arraybuffer"] = {  // > CustomCode.jszip:2933
      "string": function(input) {  // > CustomCode.jszip:2934
          return arrayLikeToString(new Uint8Array(input));  // > CustomCode.jszip:2935
      },  // > CustomCode.jszip:2936
      "array": function(input) {  // > CustomCode.jszip:2937
          return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));  // > CustomCode.jszip:2938
      },  // > CustomCode.jszip:2939
      "arraybuffer": identity,  // > CustomCode.jszip:2940
      "uint8array": function(input) {  // > CustomCode.jszip:2941
          return new Uint8Array(input);  // > CustomCode.jszip:2942
      },  // > CustomCode.jszip:2943
      "nodebuffer": function(input) {  // > CustomCode.jszip:2944
          return nodejsUtils.newBufferFrom(new Uint8Array(input));  // > CustomCode.jszip:2945
      }  // > CustomCode.jszip:2946
  };  // > CustomCode.jszip:2947
  // uint8array to ?  // > CustomCode.jszip:2948
  transform["uint8array"] = {  // > CustomCode.jszip:2949
      "string": arrayLikeToString,  // > CustomCode.jszip:2950
      "array": function(input) {  // > CustomCode.jszip:2951
          return arrayLikeToArrayLike(input, new Array(input.length));  // > CustomCode.jszip:2952
      },  // > CustomCode.jszip:2953
      "arraybuffer": function(input) {  // > CustomCode.jszip:2954
          return input.buffer;  // > CustomCode.jszip:2955
      },  // > CustomCode.jszip:2956
      "uint8array": identity,  // > CustomCode.jszip:2957
      "nodebuffer": function(input) {  // > CustomCode.jszip:2958
          return nodejsUtils.newBufferFrom(input);  // > CustomCode.jszip:2959
      }  // > CustomCode.jszip:2960
  };  // > CustomCode.jszip:2961
  // nodebuffer to ?  // > CustomCode.jszip:2962
  transform["nodebuffer"] = {  // > CustomCode.jszip:2963
      "string": arrayLikeToString,  // > CustomCode.jszip:2964
      "array": function(input) {  // > CustomCode.jszip:2965
          return arrayLikeToArrayLike(input, new Array(input.length));  // > CustomCode.jszip:2966
      },  // > CustomCode.jszip:2967
      "arraybuffer": function(input) {  // > CustomCode.jszip:2968
          return transform["nodebuffer"]["uint8array"](input).buffer;  // > CustomCode.jszip:2969
      },  // > CustomCode.jszip:2970
      "uint8array": function(input) {  // > CustomCode.jszip:2971
          return arrayLikeToArrayLike(input, new Uint8Array(input.length));  // > CustomCode.jszip:2972
      },  // > CustomCode.jszip:2973
      "nodebuffer": identity  // > CustomCode.jszip:2974
  };  // > CustomCode.jszip:2975
  /**  // > CustomCode.jszip:2976
   * Transform an input into any type.  // > CustomCode.jszip:2977
   * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.  // > CustomCode.jszip:2978
   * If no output type is specified, the unmodified input will be returned.  // > CustomCode.jszip:2979
   * @param {String} outputType the output type.  // > CustomCode.jszip:2980
   * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.  // > CustomCode.jszip:2981
   * @throws {Error} an Error if the browser doesn't support the requested output type.  // > CustomCode.jszip:2982
   */  // > CustomCode.jszip:2983
  exports.transformTo = function(outputType, input) {  // > CustomCode.jszip:2984
      if (!input) {  // > CustomCode.jszip:2985
          // undefined, null, etc  // > CustomCode.jszip:2986
          // an empty string won't harm.  // > CustomCode.jszip:2987
          input = "";  // > CustomCode.jszip:2988
      }  // > CustomCode.jszip:2989
      if (!outputType) {  // > CustomCode.jszip:2990
          return input;  // > CustomCode.jszip:2991
      }  // > CustomCode.jszip:2992
      exports.checkSupport(outputType);  // > CustomCode.jszip:2993
      var inputType = exports.getTypeOf(input);  // > CustomCode.jszip:2994
      var result = transform[inputType][outputType](input);  // > CustomCode.jszip:2995
      return result;  // > CustomCode.jszip:2996
  };  // > CustomCode.jszip:2997
  /**  // > CustomCode.jszip:2998
   * Resolve all relative path components, "." and "..", in a path. If these relative components  // > CustomCode.jszip:2999
   * traverse above the root then the resulting path will only contain the final path component.  // > CustomCode.jszip:3000
   *  // > CustomCode.jszip:3001
   * All empty components, e.g. "//", are removed.  // > CustomCode.jszip:3002
   * @param {string} path A path with / or \ separators  // > CustomCode.jszip:3003
   * @returns {string} The path with all relative path components resolved.  // > CustomCode.jszip:3004
   */  // > CustomCode.jszip:3005
  exports.resolve = function(path) {  // > CustomCode.jszip:3006
      var parts = path.split("/");  // > CustomCode.jszip:3007
      var result = [];  // > CustomCode.jszip:3008
      for (var index = 0; index < parts.length; index++) {  // > CustomCode.jszip:3009
          var part = parts[index];  // > CustomCode.jszip:3010
          // Allow the first and last component to be empty for trailing slashes.  // > CustomCode.jszip:3011
          if (part === "." || (part === "" && index !== 0 && index !== parts.length - 1)) {  // > CustomCode.jszip:3012
              continue;  // > CustomCode.jszip:3013
          } else if (part === "..") {  // > CustomCode.jszip:3014
              result.pop();  // > CustomCode.jszip:3015
          } else {  // > CustomCode.jszip:3016
              result.push(part);  // > CustomCode.jszip:3017
          }  // > CustomCode.jszip:3018
      }  // > CustomCode.jszip:3019
      return result.join("/");  // > CustomCode.jszip:3020
  };  // > CustomCode.jszip:3021
  /**  // > CustomCode.jszip:3022
   * Return the type of the input.  // > CustomCode.jszip:3023
   * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.  // > CustomCode.jszip:3024
   * @param {Object} input the input to identify.  // > CustomCode.jszip:3025
   * @return {String} the (lowercase) type of the input.  // > CustomCode.jszip:3026
   */  // > CustomCode.jszip:3027
  exports.getTypeOf = function(input) {  // > CustomCode.jszip:3028
      if (typeof input === "string") {  // > CustomCode.jszip:3029
          return "string";  // > CustomCode.jszip:3030
      }  // > CustomCode.jszip:3031
      if (Object.prototype.toString.call(input) === "[object Array]") {  // > CustomCode.jszip:3032
          return "array";  // > CustomCode.jszip:3033
      }  // > CustomCode.jszip:3034
      if (support.nodebuffer && nodejsUtils.isBuffer(input)) {  // > CustomCode.jszip:3035
          return "nodebuffer";  // > CustomCode.jszip:3036
      }  // > CustomCode.jszip:3037
      if (support.uint8array && input instanceof Uint8Array) {  // > CustomCode.jszip:3038
          return "uint8array";  // > CustomCode.jszip:3039
      }  // > CustomCode.jszip:3040
      if (support.arraybuffer && input instanceof ArrayBuffer) {  // > CustomCode.jszip:3041
          return "arraybuffer";  // > CustomCode.jszip:3042
      }  // > CustomCode.jszip:3043
  };  // > CustomCode.jszip:3044
  /**  // > CustomCode.jszip:3045
   * Throw an exception if the type is not supported.  // > CustomCode.jszip:3046
   * @param {String} type the type to check.  // > CustomCode.jszip:3047
   * @throws {Error} an Error if the browser doesn't support the requested type.  // > CustomCode.jszip:3048
   */  // > CustomCode.jszip:3049
  exports.checkSupport = function(type) {  // > CustomCode.jszip:3050
      var supported = support[type.toLowerCase()];  // > CustomCode.jszip:3051
      if (!supported) {  // > CustomCode.jszip:3052
          throw new Error(type + " is not supported by this platform");  // > CustomCode.jszip:3053
      }  // > CustomCode.jszip:3054
  };  // > CustomCode.jszip:3055
  exports.MAX_VALUE_16BITS = 65535;  // > CustomCode.jszip:3056
  exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1  // > CustomCode.jszip:3057
  /**  // > CustomCode.jszip:3058
   * Prettify a string read as binary.  // > CustomCode.jszip:3059
   * @param {string} str the string to prettify.  // > CustomCode.jszip:3060
   * @return {string} a pretty string.  // > CustomCode.jszip:3061
   */  // > CustomCode.jszip:3062
  exports.pretty = function(str) {  // > CustomCode.jszip:3063
      var res = "",  // > CustomCode.jszip:3064
          code, i;  // > CustomCode.jszip:3065
      for (i = 0; i < (str || "").length; i++) {  // > CustomCode.jszip:3066
          code = str.charCodeAt(i);  // > CustomCode.jszip:3067
          res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();  // > CustomCode.jszip:3068
      }  // > CustomCode.jszip:3069
      return res;  // > CustomCode.jszip:3070
  };  // > CustomCode.jszip:3071
  /**  // > CustomCode.jszip:3072
   * Defer the call of a function.  // > CustomCode.jszip:3073
   * @param {Function} callback the function to call asynchronously.  // > CustomCode.jszip:3074
   * @param {Array} args the arguments to give to the callback.  // > CustomCode.jszip:3075
   */  // > CustomCode.jszip:3076
  exports.delay = function(callback, args, self) {  // > CustomCode.jszip:3077
      setImmediate(function () {  // > CustomCode.jszip:3078
          callback.apply(self || null, args || []);  // > CustomCode.jszip:3079
      });  // > CustomCode.jszip:3080
  };  // > CustomCode.jszip:3081
  /**  // > CustomCode.jszip:3082
   * Extends a prototype with an other, without calling a constructor with  // > CustomCode.jszip:3083
   * side effects. Inspired by nodejs' `utils.inherits`  // > CustomCode.jszip:3084
   * @param {Function} ctor the constructor to augment  // > CustomCode.jszip:3085
   * @param {Function} superCtor the parent constructor to use  // > CustomCode.jszip:3086
   */  // > CustomCode.jszip:3087
  exports.inherits = function (ctor, superCtor) {  // > CustomCode.jszip:3088
      var Obj = function() {};  // > CustomCode.jszip:3089
      Obj.prototype = superCtor.prototype;  // > CustomCode.jszip:3090
      ctor.prototype = new Obj();  // > CustomCode.jszip:3091
  };  // > CustomCode.jszip:3092
  /**  // > CustomCode.jszip:3093
   * Merge the objects passed as parameters into a new one.  // > CustomCode.jszip:3094
   * @private  // > CustomCode.jszip:3095
   * @param {...Object} var_args All objects to merge.  // > CustomCode.jszip:3096
   * @return {Object} a new object with the data of the others.  // > CustomCode.jszip:3097
   */  // > CustomCode.jszip:3098
  exports.extend = function() {  // > CustomCode.jszip:3099
      var result = {}, i, attr;  // > CustomCode.jszip:3100
      for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers  // > CustomCode.jszip:3101
          for (attr in arguments[i]) {  // > CustomCode.jszip:3102
              if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") {  // > CustomCode.jszip:3103
                  result[attr] = arguments[i][attr];  // > CustomCode.jszip:3104
              }  // > CustomCode.jszip:3105
          }  // > CustomCode.jszip:3106
      }  // > CustomCode.jszip:3107
      return result;  // > CustomCode.jszip:3108
  };  // > CustomCode.jszip:3109
  /**  // > CustomCode.jszip:3110
   * Transform arbitrary content into a Promise.  // > CustomCode.jszip:3111
   * @param {String} name a name for the content being processed.  // > CustomCode.jszip:3112
   * @param {Object} inputData the content to process.  // > CustomCode.jszip:3113
   * @param {Boolean} isBinary true if the content is not an unicode string  // > CustomCode.jszip:3114
   * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.  // > CustomCode.jszip:3115
   * @param {Boolean} isBase64 true if the string content is encoded with base64.  // > CustomCode.jszip:3116
   * @return {Promise} a promise in a format usable by JSZip.  // > CustomCode.jszip:3117
   */  // > CustomCode.jszip:3118
  exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {  // > CustomCode.jszip:3119
      // if inputData is already a promise, this flatten it.  // > CustomCode.jszip:3120
      var promise = external.Promise.resolve(inputData).then(function(data) {  // > CustomCode.jszip:3121
          var isBlob = support.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);  // > CustomCode.jszip:3122
          if (isBlob && typeof FileReader !== "undefined") {  // > CustomCode.jszip:3123
              return new external.Promise(function (resolve, reject) {  // > CustomCode.jszip:3124
                  var reader = new FileReader();  // > CustomCode.jszip:3125
                  reader.onload = function(e) {  // > CustomCode.jszip:3126
                      resolve(e.target.result);  // > CustomCode.jszip:3127
                  };  // > CustomCode.jszip:3128
                  reader.onerror = function(e) {  // > CustomCode.jszip:3129
                      reject(e.target.error);  // > CustomCode.jszip:3130
                  };  // > CustomCode.jszip:3131
                  reader.readAsArrayBuffer(data);  // > CustomCode.jszip:3132
              });  // > CustomCode.jszip:3133
          } else {  // > CustomCode.jszip:3134
              return data;  // > CustomCode.jszip:3135
          }  // > CustomCode.jszip:3136
      });  // > CustomCode.jszip:3137
      return promise.then(function(data) {  // > CustomCode.jszip:3138
          var dataType = exports.getTypeOf(data);  // > CustomCode.jszip:3139
          if (!dataType) {  // > CustomCode.jszip:3140
              return external.Promise.reject(  // > CustomCode.jszip:3141
                  new Error("Can't read the data of '" + name + "'. Is it " +  // > CustomCode.jszip:3142
                            "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")  // > CustomCode.jszip:3143
              );  // > CustomCode.jszip:3144
          }  // > CustomCode.jszip:3145
          // special case : it's way easier to work with Uint8Array than with ArrayBuffer  // > CustomCode.jszip:3146
          if (dataType === "arraybuffer") {  // > CustomCode.jszip:3147
              data = exports.transformTo("uint8array", data);  // > CustomCode.jszip:3148
          } else if (dataType === "string") {  // > CustomCode.jszip:3149
              if (isBase64) {  // > CustomCode.jszip:3150
                  data = base64.decode(data);  // > CustomCode.jszip:3151
              }  // > CustomCode.jszip:3152
              else if (isBinary) {  // > CustomCode.jszip:3153
                  // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask  // > CustomCode.jszip:3154
                  if (isOptimizedBinaryString !== true) {  // > CustomCode.jszip:3155
                      // this is a string, not in a base64 format.  // > CustomCode.jszip:3156
                      // Be sure that this is a correct "binary string"  // > CustomCode.jszip:3157
                      data = string2binary(data);  // > CustomCode.jszip:3158
                  }  // > CustomCode.jszip:3159
              }  // > CustomCode.jszip:3160
          }  // > CustomCode.jszip:3161
          return data;  // > CustomCode.jszip:3162
      });  // > CustomCode.jszip:3163
  };  // > CustomCode.jszip:3164
  },{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"setimmediate":54}],33:[function(require,module,exports){  // > CustomCode.jszip:3165
  "use strict";  // > CustomCode.jszip:3166
  var readerFor = require("./reader/readerFor");  // > CustomCode.jszip:3167
  var utils = require("./utils");  // > CustomCode.jszip:3168
  var sig = require("./signature");  // > CustomCode.jszip:3169
  var ZipEntry = require("./zipEntry");  // > CustomCode.jszip:3170
  var support = require("./support");  // > CustomCode.jszip:3171
  //  class ZipEntries {{{  // > CustomCode.jszip:3172
  /**  // > CustomCode.jszip:3173
   * All the entries in the zip file.  // > CustomCode.jszip:3174
   * @constructor  // > CustomCode.jszip:3175
   * @param {Object} loadOptions Options for loading the stream.  // > CustomCode.jszip:3176
   */  // > CustomCode.jszip:3177
  function ZipEntries(loadOptions) {  // > CustomCode.jszip:3178
      this.files = [];  // > CustomCode.jszip:3179
      this.loadOptions = loadOptions;  // > CustomCode.jszip:3180
  }  // > CustomCode.jszip:3181
  ZipEntries.prototype = {  // > CustomCode.jszip:3182
      /**  // > CustomCode.jszip:3183
       * Check that the reader is on the specified signature.  // > CustomCode.jszip:3184
       * @param {string} expectedSignature the expected signature.  // > CustomCode.jszip:3185
       * @throws {Error} if it is an other signature.  // > CustomCode.jszip:3186
       */  // > CustomCode.jszip:3187
      checkSignature: function(expectedSignature) {  // > CustomCode.jszip:3188
          if (!this.reader.readAndCheckSignature(expectedSignature)) {  // > CustomCode.jszip:3189
              this.reader.index -= 4;  // > CustomCode.jszip:3190
              var signature = this.reader.readString(4);  // > CustomCode.jszip:3191
              throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");  // > CustomCode.jszip:3192
          }  // > CustomCode.jszip:3193
      },  // > CustomCode.jszip:3194
      /**  // > CustomCode.jszip:3195
       * Check if the given signature is at the given index.  // > CustomCode.jszip:3196
       * @param {number} askedIndex the index to check.  // > CustomCode.jszip:3197
       * @param {string} expectedSignature the signature to expect.  // > CustomCode.jszip:3198
       * @return {boolean} true if the signature is here, false otherwise.  // > CustomCode.jszip:3199
       */  // > CustomCode.jszip:3200
      isSignature: function(askedIndex, expectedSignature) {  // > CustomCode.jszip:3201
          var currentIndex = this.reader.index;  // > CustomCode.jszip:3202
          this.reader.setIndex(askedIndex);  // > CustomCode.jszip:3203
          var signature = this.reader.readString(4);  // > CustomCode.jszip:3204
          var result = signature === expectedSignature;  // > CustomCode.jszip:3205
          this.reader.setIndex(currentIndex);  // > CustomCode.jszip:3206
          return result;  // > CustomCode.jszip:3207
      },  // > CustomCode.jszip:3208
      /**  // > CustomCode.jszip:3209
       * Read the end of the central directory.  // > CustomCode.jszip:3210
       */  // > CustomCode.jszip:3211
      readBlockEndOfCentral: function() {  // > CustomCode.jszip:3212
          this.diskNumber = this.reader.readInt(2);  // > CustomCode.jszip:3213
          this.diskWithCentralDirStart = this.reader.readInt(2);  // > CustomCode.jszip:3214
          this.centralDirRecordsOnThisDisk = this.reader.readInt(2);  // > CustomCode.jszip:3215
          this.centralDirRecords = this.reader.readInt(2);  // > CustomCode.jszip:3216
          this.centralDirSize = this.reader.readInt(4);  // > CustomCode.jszip:3217
          this.centralDirOffset = this.reader.readInt(4);  // > CustomCode.jszip:3218
          this.zipCommentLength = this.reader.readInt(2);  // > CustomCode.jszip:3219
          // warning : the encoding depends of the system locale  // > CustomCode.jszip:3220
          // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.  // > CustomCode.jszip:3221
          // On a windows machine, this field is encoded with the localized windows code page.  // > CustomCode.jszip:3222
          var zipComment = this.reader.readData(this.zipCommentLength);  // > CustomCode.jszip:3223
          var decodeParamType = support.uint8array ? "uint8array" : "array";  // > CustomCode.jszip:3224
          // To get consistent behavior with the generation part, we will assume that  // > CustomCode.jszip:3225
          // this is utf8 encoded unless specified otherwise.  // > CustomCode.jszip:3226
          var decodeContent = utils.transformTo(decodeParamType, zipComment);  // > CustomCode.jszip:3227
          this.zipComment = this.loadOptions.decodeFileName(decodeContent);  // > CustomCode.jszip:3228
      },  // > CustomCode.jszip:3229
      /**  // > CustomCode.jszip:3230
       * Read the end of the Zip 64 central directory.  // > CustomCode.jszip:3231
       * Not merged with the method readEndOfCentral :  // > CustomCode.jszip:3232
       * The end of central can coexist with its Zip64 brother,  // > CustomCode.jszip:3233
       * I don't want to read the wrong number of bytes !  // > CustomCode.jszip:3234
       */  // > CustomCode.jszip:3235
      readBlockZip64EndOfCentral: function() {  // > CustomCode.jszip:3236
          this.zip64EndOfCentralSize = this.reader.readInt(8);  // > CustomCode.jszip:3237
          this.reader.skip(4);  // > CustomCode.jszip:3238
          // this.versionMadeBy = this.reader.readString(2);  // > CustomCode.jszip:3239
          // this.versionNeeded = this.reader.readInt(2);  // > CustomCode.jszip:3240
          this.diskNumber = this.reader.readInt(4);  // > CustomCode.jszip:3241
          this.diskWithCentralDirStart = this.reader.readInt(4);  // > CustomCode.jszip:3242
          this.centralDirRecordsOnThisDisk = this.reader.readInt(8);  // > CustomCode.jszip:3243
          this.centralDirRecords = this.reader.readInt(8);  // > CustomCode.jszip:3244
          this.centralDirSize = this.reader.readInt(8);  // > CustomCode.jszip:3245
          this.centralDirOffset = this.reader.readInt(8);  // > CustomCode.jszip:3246
          this.zip64ExtensibleData = {};  // > CustomCode.jszip:3247
          var extraDataSize = this.zip64EndOfCentralSize - 44,  // > CustomCode.jszip:3248
              index = 0,  // > CustomCode.jszip:3249
              extraFieldId,  // > CustomCode.jszip:3250
              extraFieldLength,  // > CustomCode.jszip:3251
              extraFieldValue;  // > CustomCode.jszip:3252
          while (index < extraDataSize) {  // > CustomCode.jszip:3253
              extraFieldId = this.reader.readInt(2);  // > CustomCode.jszip:3254
              extraFieldLength = this.reader.readInt(4);  // > CustomCode.jszip:3255
              extraFieldValue = this.reader.readData(extraFieldLength);  // > CustomCode.jszip:3256
              this.zip64ExtensibleData[extraFieldId] = {  // > CustomCode.jszip:3257
                  id: extraFieldId,  // > CustomCode.jszip:3258
                  length: extraFieldLength,  // > CustomCode.jszip:3259
                  value: extraFieldValue  // > CustomCode.jszip:3260
              };  // > CustomCode.jszip:3261
          }  // > CustomCode.jszip:3262
      },  // > CustomCode.jszip:3263
      /**  // > CustomCode.jszip:3264
       * Read the end of the Zip 64 central directory locator.  // > CustomCode.jszip:3265
       */  // > CustomCode.jszip:3266
      readBlockZip64EndOfCentralLocator: function() {  // > CustomCode.jszip:3267
          this.diskWithZip64CentralDirStart = this.reader.readInt(4);  // > CustomCode.jszip:3268
          this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);  // > CustomCode.jszip:3269
          this.disksCount = this.reader.readInt(4);  // > CustomCode.jszip:3270
          if (this.disksCount > 1) {  // > CustomCode.jszip:3271
              throw new Error("Multi-volumes zip are not supported");  // > CustomCode.jszip:3272
          }  // > CustomCode.jszip:3273
      },  // > CustomCode.jszip:3274
      /**  // > CustomCode.jszip:3275
       * Read the local files, based on the offset read in the central part.  // > CustomCode.jszip:3276
       */  // > CustomCode.jszip:3277
      readLocalFiles: function() {  // > CustomCode.jszip:3278
          var i, file;  // > CustomCode.jszip:3279
          for (i = 0; i < this.files.length; i++) {  // > CustomCode.jszip:3280
              file = this.files[i];  // > CustomCode.jszip:3281
              this.reader.setIndex(file.localHeaderOffset);  // > CustomCode.jszip:3282
              this.checkSignature(sig.LOCAL_FILE_HEADER);  // > CustomCode.jszip:3283
              file.readLocalPart(this.reader);  // > CustomCode.jszip:3284
              file.handleUTF8();  // > CustomCode.jszip:3285
              file.processAttributes();  // > CustomCode.jszip:3286
          }  // > CustomCode.jszip:3287
      },  // > CustomCode.jszip:3288
      /**  // > CustomCode.jszip:3289
       * Read the central directory.  // > CustomCode.jszip:3290
       */  // > CustomCode.jszip:3291
      readCentralDir: function() {  // > CustomCode.jszip:3292
          var file;  // > CustomCode.jszip:3293
          this.reader.setIndex(this.centralDirOffset);  // > CustomCode.jszip:3294
          while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {  // > CustomCode.jszip:3295
              file = new ZipEntry({  // > CustomCode.jszip:3296
                  zip64: this.zip64  // > CustomCode.jszip:3297
              }, this.loadOptions);  // > CustomCode.jszip:3298
              file.readCentralPart(this.reader);  // > CustomCode.jszip:3299
              this.files.push(file);  // > CustomCode.jszip:3300
          }  // > CustomCode.jszip:3301
          if (this.centralDirRecords !== this.files.length) {  // > CustomCode.jszip:3302
              if (this.centralDirRecords !== 0 && this.files.length === 0) {  // > CustomCode.jszip:3303
                  // We expected some records but couldn't find ANY.  // > CustomCode.jszip:3304
                  // This is really suspicious, as if something went wrong.  // > CustomCode.jszip:3305
                  throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);  // > CustomCode.jszip:3306
              } else {  // > CustomCode.jszip:3307
                  // We found some records but not all.  // > CustomCode.jszip:3308
                  // Something is wrong but we got something for the user: no error here.  // > CustomCode.jszip:3309
                  // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);  // > CustomCode.jszip:3310
              }  // > CustomCode.jszip:3311
          }  // > CustomCode.jszip:3312
      },  // > CustomCode.jszip:3313
      /**  // > CustomCode.jszip:3314
       * Read the end of central directory.  // > CustomCode.jszip:3315
       */  // > CustomCode.jszip:3316
      readEndOfCentral: function() {  // > CustomCode.jszip:3317
          var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);  // > CustomCode.jszip:3318
          if (offset < 0) {  // > CustomCode.jszip:3319
              // Check if the content is a truncated zip or complete garbage.  // > CustomCode.jszip:3320
              // A "LOCAL_FILE_HEADER" is not required at the beginning (auto  // > CustomCode.jszip:3321
              // extractible zip for example) but it can give a good hint.  // > CustomCode.jszip:3322
              // If an ajax request was used without responseType, we will also  // > CustomCode.jszip:3323
              // get unreadable data.  // > CustomCode.jszip:3324
              var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);  // > CustomCode.jszip:3325
              if (isGarbage) {  // > CustomCode.jszip:3326
                  throw new Error("Can't find end of central directory : is this a zip file ? " +  // > CustomCode.jszip:3327
                                  "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");  // > CustomCode.jszip:3328
              } else {  // > CustomCode.jszip:3329
                  throw new Error("Corrupted zip: can't find end of central directory");  // > CustomCode.jszip:3330
              }  // > CustomCode.jszip:3331
          }  // > CustomCode.jszip:3332
          this.reader.setIndex(offset);  // > CustomCode.jszip:3333
          var endOfCentralDirOffset = offset;  // > CustomCode.jszip:3334
          this.checkSignature(sig.CENTRAL_DIRECTORY_END);  // > CustomCode.jszip:3335
          this.readBlockEndOfCentral();  // > CustomCode.jszip:3336
          /* extract from the zip spec :  // > CustomCode.jszip:3337
              4)  If one of the fields in the end of central directory  // > CustomCode.jszip:3338
                  record is too small to hold required data, the field  // > CustomCode.jszip:3339
                  should be set to -1 (0xFFFF or 0xFFFFFFFF) and the  // > CustomCode.jszip:3340
                  ZIP64 format record should be created.  // > CustomCode.jszip:3341
              5)  The end of central directory record and the  // > CustomCode.jszip:3342
                  Zip64 end of central directory locator record must  // > CustomCode.jszip:3343
                  reside on the same disk when splitting or spanning  // > CustomCode.jszip:3344
                  an archive.  // > CustomCode.jszip:3345
           */  // > CustomCode.jszip:3346
          if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {  // > CustomCode.jszip:3347
              this.zip64 = true;  // > CustomCode.jszip:3348
              /*  // > CustomCode.jszip:3349
              Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from  // > CustomCode.jszip:3350
              the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents  // > CustomCode.jszip:3351
              all numbers as 64-bit double precision IEEE 754 floating point numbers.  // > CustomCode.jszip:3352
              So, we have 53bits for integers and bitwise operations treat everything as 32bits.  // > CustomCode.jszip:3353
              see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators  // > CustomCode.jszip:3354
              and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5  // > CustomCode.jszip:3355
              */  // > CustomCode.jszip:3356
              // should look for a zip64 EOCD locator  // > CustomCode.jszip:3357
              offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);  // > CustomCode.jszip:3358
              if (offset < 0) {  // > CustomCode.jszip:3359
                  throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");  // > CustomCode.jszip:3360
              }  // > CustomCode.jszip:3361
              this.reader.setIndex(offset);  // > CustomCode.jszip:3362
              this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);  // > CustomCode.jszip:3363
              this.readBlockZip64EndOfCentralLocator();  // > CustomCode.jszip:3364
              // now the zip64 EOCD record  // > CustomCode.jszip:3365
              if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {  // > CustomCode.jszip:3366
                  // console.warn("ZIP64 end of central directory not where expected.");  // > CustomCode.jszip:3367
                  this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);  // > CustomCode.jszip:3368
                  if (this.relativeOffsetEndOfZip64CentralDir < 0) {  // > CustomCode.jszip:3369
                      throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");  // > CustomCode.jszip:3370
                  }  // > CustomCode.jszip:3371
              }  // > CustomCode.jszip:3372
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);  // > CustomCode.jszip:3373
              this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);  // > CustomCode.jszip:3374
              this.readBlockZip64EndOfCentral();  // > CustomCode.jszip:3375
          }  // > CustomCode.jszip:3376
          var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;  // > CustomCode.jszip:3377
          if (this.zip64) {  // > CustomCode.jszip:3378
              expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator  // > CustomCode.jszip:3379
              expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;  // > CustomCode.jszip:3380
          }  // > CustomCode.jszip:3381
          var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;  // > CustomCode.jszip:3382
          if (extraBytes > 0) {  // > CustomCode.jszip:3383
              // console.warn(extraBytes, "extra bytes at beginning or within zipfile");  // > CustomCode.jszip:3384
              if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {  // > CustomCode.jszip:3385
                  // The offsets seem wrong, but we have something at the specified offset.  // > CustomCode.jszip:3386
                  // So… we keep it.  // > CustomCode.jszip:3387
              } else {  // > CustomCode.jszip:3388
                  // the offset is wrong, update the "zero" of the reader  // > CustomCode.jszip:3389
                  // this happens if data has been prepended (crx files for example)  // > CustomCode.jszip:3390
                  this.reader.zero = extraBytes;  // > CustomCode.jszip:3391
              }  // > CustomCode.jszip:3392
          } else if (extraBytes < 0) {  // > CustomCode.jszip:3393
              throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");  // > CustomCode.jszip:3394
          }  // > CustomCode.jszip:3395
      },  // > CustomCode.jszip:3396
      prepareReader: function(data) {  // > CustomCode.jszip:3397
          this.reader = readerFor(data);  // > CustomCode.jszip:3398
      },  // > CustomCode.jszip:3399
      /**  // > CustomCode.jszip:3400
       * Read a zip file and create ZipEntries.  // > CustomCode.jszip:3401
       * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.  // > CustomCode.jszip:3402
       */  // > CustomCode.jszip:3403
      load: function(data) {  // > CustomCode.jszip:3404
          this.prepareReader(data);  // > CustomCode.jszip:3405
          this.readEndOfCentral();  // > CustomCode.jszip:3406
          this.readCentralDir();  // > CustomCode.jszip:3407
          this.readLocalFiles();  // > CustomCode.jszip:3408
      }  // > CustomCode.jszip:3409
  };  // > CustomCode.jszip:3410
  // }}} end of ZipEntries  // > CustomCode.jszip:3411
  module.exports = ZipEntries;  // > CustomCode.jszip:3412
  },{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(require,module,exports){  // > CustomCode.jszip:3413
  "use strict";  // > CustomCode.jszip:3414
  var readerFor = require("./reader/readerFor");  // > CustomCode.jszip:3415
  var utils = require("./utils");  // > CustomCode.jszip:3416
  var CompressedObject = require("./compressedObject");  // > CustomCode.jszip:3417
  var crc32fn = require("./crc32");  // > CustomCode.jszip:3418
  var utf8 = require("./utf8");  // > CustomCode.jszip:3419
  var compressions = require("./compressions");  // > CustomCode.jszip:3420
  var support = require("./support");  // > CustomCode.jszip:3421
  var MADE_BY_DOS = 0x00;  // > CustomCode.jszip:3422
  var MADE_BY_UNIX = 0x03;  // > CustomCode.jszip:3423
  /**  // > CustomCode.jszip:3424
   * Find a compression registered in JSZip.  // > CustomCode.jszip:3425
   * @param {string} compressionMethod the method magic to find.  // > CustomCode.jszip:3426
   * @return {Object|null} the JSZip compression object, null if none found.  // > CustomCode.jszip:3427
   */  // > CustomCode.jszip:3428
  var findCompression = function(compressionMethod) {  // > CustomCode.jszip:3429
      for (var method in compressions) {  // > CustomCode.jszip:3430
          if (!Object.prototype.hasOwnProperty.call(compressions, method)) {  // > CustomCode.jszip:3431
              continue;  // > CustomCode.jszip:3432
          }  // > CustomCode.jszip:3433
          if (compressions[method].magic === compressionMethod) {  // > CustomCode.jszip:3434
              return compressions[method];  // > CustomCode.jszip:3435
          }  // > CustomCode.jszip:3436
      }  // > CustomCode.jszip:3437
      return null;  // > CustomCode.jszip:3438
  };  // > CustomCode.jszip:3439
  // class ZipEntry {{{  // > CustomCode.jszip:3440
  /**  // > CustomCode.jszip:3441
   * An entry in the zip file.  // > CustomCode.jszip:3442
   * @constructor  // > CustomCode.jszip:3443
   * @param {Object} options Options of the current file.  // > CustomCode.jszip:3444
   * @param {Object} loadOptions Options for loading the stream.  // > CustomCode.jszip:3445
   */  // > CustomCode.jszip:3446
  function ZipEntry(options, loadOptions) {  // > CustomCode.jszip:3447
      this.options = options;  // > CustomCode.jszip:3448
      this.loadOptions = loadOptions;  // > CustomCode.jszip:3449
  }  // > CustomCode.jszip:3450
  ZipEntry.prototype = {  // > CustomCode.jszip:3451
      /**  // > CustomCode.jszip:3452
       * say if the file is encrypted.  // > CustomCode.jszip:3453
       * @return {boolean} true if the file is encrypted, false otherwise.  // > CustomCode.jszip:3454
       */  // > CustomCode.jszip:3455
      isEncrypted: function() {  // > CustomCode.jszip:3456
          // bit 1 is set  // > CustomCode.jszip:3457
          return (this.bitFlag & 0x0001) === 0x0001;  // > CustomCode.jszip:3458
      },  // > CustomCode.jszip:3459
      /**  // > CustomCode.jszip:3460
       * say if the file has utf-8 filename/comment.  // > CustomCode.jszip:3461
       * @return {boolean} true if the filename/comment is in utf-8, false otherwise.  // > CustomCode.jszip:3462
       */  // > CustomCode.jszip:3463
      useUTF8: function() {  // > CustomCode.jszip:3464
          // bit 11 is set  // > CustomCode.jszip:3465
          return (this.bitFlag & 0x0800) === 0x0800;  // > CustomCode.jszip:3466
      },  // > CustomCode.jszip:3467
      /**  // > CustomCode.jszip:3468
       * Read the local part of a zip file and add the info in this object.  // > CustomCode.jszip:3469
       * @param {DataReader} reader the reader to use.  // > CustomCode.jszip:3470
       */  // > CustomCode.jszip:3471
      readLocalPart: function(reader) {  // > CustomCode.jszip:3472
          var compression, localExtraFieldsLength;  // > CustomCode.jszip:3473
          // we already know everything from the central dir !  // > CustomCode.jszip:3474
          // If the central dir data are false, we are doomed.  // > CustomCode.jszip:3475
          // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.  // > CustomCode.jszip:3476
          // The less data we get here, the more reliable this should be.  // > CustomCode.jszip:3477
          // Let's skip the whole header and dash to the data !  // > CustomCode.jszip:3478
          reader.skip(22);  // > CustomCode.jszip:3479
          // in some zip created on windows, the filename stored in the central dir contains \ instead of /.  // > CustomCode.jszip:3480
          // Strangely, the filename here is OK.  // > CustomCode.jszip:3481
          // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes  // > CustomCode.jszip:3482
          // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...  // > CustomCode.jszip:3483
          // Search "unzip mismatching "local" filename continuing with "central" filename version" on  // > CustomCode.jszip:3484
          // the internet.  // > CustomCode.jszip:3485
          //  // > CustomCode.jszip:3486
          // I think I see the logic here : the central directory is used to display  // > CustomCode.jszip:3487
          // content and the local directory is used to extract the files. Mixing / and \  // > CustomCode.jszip:3488
          // may be used to display \ to windows users and use / when extracting the files.  // > CustomCode.jszip:3489
          // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394  // > CustomCode.jszip:3490
          this.fileNameLength = reader.readInt(2);  // > CustomCode.jszip:3491
          localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir  // > CustomCode.jszip:3492
          // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.  // > CustomCode.jszip:3493
          this.fileName = reader.readData(this.fileNameLength);  // > CustomCode.jszip:3494
          reader.skip(localExtraFieldsLength);  // > CustomCode.jszip:3495
          if (this.compressedSize === -1 || this.uncompressedSize === -1) {  // > CustomCode.jszip:3496
              throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");  // > CustomCode.jszip:3497
          }  // > CustomCode.jszip:3498
          compression = findCompression(this.compressionMethod);  // > CustomCode.jszip:3499
          if (compression === null) { // no compression found  // > CustomCode.jszip:3500
              throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");  // > CustomCode.jszip:3501
          }  // > CustomCode.jszip:3502
          this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));  // > CustomCode.jszip:3503
      },  // > CustomCode.jszip:3504
      /**  // > CustomCode.jszip:3505
       * Read the central part of a zip file and add the info in this object.  // > CustomCode.jszip:3506
       * @param {DataReader} reader the reader to use.  // > CustomCode.jszip:3507
       */  // > CustomCode.jszip:3508
      readCentralPart: function(reader) {  // > CustomCode.jszip:3509
          this.versionMadeBy = reader.readInt(2);  // > CustomCode.jszip:3510
          reader.skip(2);  // > CustomCode.jszip:3511
          // this.versionNeeded = reader.readInt(2);  // > CustomCode.jszip:3512
          this.bitFlag = reader.readInt(2);  // > CustomCode.jszip:3513
          this.compressionMethod = reader.readString(2);  // > CustomCode.jszip:3514
          this.date = reader.readDate();  // > CustomCode.jszip:3515
          this.crc32 = reader.readInt(4);  // > CustomCode.jszip:3516
          this.compressedSize = reader.readInt(4);  // > CustomCode.jszip:3517
          this.uncompressedSize = reader.readInt(4);  // > CustomCode.jszip:3518
          var fileNameLength = reader.readInt(2);  // > CustomCode.jszip:3519
          this.extraFieldsLength = reader.readInt(2);  // > CustomCode.jszip:3520
          this.fileCommentLength = reader.readInt(2);  // > CustomCode.jszip:3521
          this.diskNumberStart = reader.readInt(2);  // > CustomCode.jszip:3522
          this.internalFileAttributes = reader.readInt(2);  // > CustomCode.jszip:3523
          this.externalFileAttributes = reader.readInt(4);  // > CustomCode.jszip:3524
          this.localHeaderOffset = reader.readInt(4);  // > CustomCode.jszip:3525
          if (this.isEncrypted()) {  // > CustomCode.jszip:3526
              throw new Error("Encrypted zip are not supported");  // > CustomCode.jszip:3527
          }  // > CustomCode.jszip:3528
          // will be read in the local part, see the comments there  // > CustomCode.jszip:3529
          reader.skip(fileNameLength);  // > CustomCode.jszip:3530
          this.readExtraFields(reader);  // > CustomCode.jszip:3531
          this.parseZIP64ExtraField(reader);  // > CustomCode.jszip:3532
          this.fileComment = reader.readData(this.fileCommentLength);  // > CustomCode.jszip:3533
      },  // > CustomCode.jszip:3534
      /**  // > CustomCode.jszip:3535
       * Parse the external file attributes and get the unix/dos permissions.  // > CustomCode.jszip:3536
       */  // > CustomCode.jszip:3537
      processAttributes: function () {  // > CustomCode.jszip:3538
          this.unixPermissions = null;  // > CustomCode.jszip:3539
          this.dosPermissions = null;  // > CustomCode.jszip:3540
          var madeBy = this.versionMadeBy >> 8;  // > CustomCode.jszip:3541
          // Check if we have the DOS directory flag set.  // > CustomCode.jszip:3542
          // We look for it in the DOS and UNIX permissions  // > CustomCode.jszip:3543
          // but some unknown platform could set it as a compatibility flag.  // > CustomCode.jszip:3544
          this.dir = this.externalFileAttributes & 0x0010 ? true : false;  // > CustomCode.jszip:3545
          if(madeBy === MADE_BY_DOS) {  // > CustomCode.jszip:3546
              // first 6 bits (0 to 5)  // > CustomCode.jszip:3547
              this.dosPermissions = this.externalFileAttributes & 0x3F;  // > CustomCode.jszip:3548
          }  // > CustomCode.jszip:3549
          if(madeBy === MADE_BY_UNIX) {  // > CustomCode.jszip:3550
              this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;  // > CustomCode.jszip:3551
              // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);  // > CustomCode.jszip:3552
          }  // > CustomCode.jszip:3553
          // fail safe : if the name ends with a / it probably means a folder  // > CustomCode.jszip:3554
          if (!this.dir && this.fileNameStr.slice(-1) === "/") {  // > CustomCode.jszip:3555
              this.dir = true;  // > CustomCode.jszip:3556
          }  // > CustomCode.jszip:3557
      },  // > CustomCode.jszip:3558
      /**  // > CustomCode.jszip:3559
       * Parse the ZIP64 extra field and merge the info in the current ZipEntry.  // > CustomCode.jszip:3560
       * @param {DataReader} reader the reader to use.  // > CustomCode.jszip:3561
       */  // > CustomCode.jszip:3562
      parseZIP64ExtraField: function() {  // > CustomCode.jszip:3563
          if (!this.extraFields[0x0001]) {  // > CustomCode.jszip:3564
              return;  // > CustomCode.jszip:3565
          }  // > CustomCode.jszip:3566
          // should be something, preparing the extra reader  // > CustomCode.jszip:3567
          var extraReader = readerFor(this.extraFields[0x0001].value);  // > CustomCode.jszip:3568
          // I really hope that these 64bits integer can fit in 32 bits integer, because js  // > CustomCode.jszip:3569
          // won't let us have more.  // > CustomCode.jszip:3570
          if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {  // > CustomCode.jszip:3571
              this.uncompressedSize = extraReader.readInt(8);  // > CustomCode.jszip:3572
          }  // > CustomCode.jszip:3573
          if (this.compressedSize === utils.MAX_VALUE_32BITS) {  // > CustomCode.jszip:3574
              this.compressedSize = extraReader.readInt(8);  // > CustomCode.jszip:3575
          }  // > CustomCode.jszip:3576
          if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {  // > CustomCode.jszip:3577
              this.localHeaderOffset = extraReader.readInt(8);  // > CustomCode.jszip:3578
          }  // > CustomCode.jszip:3579
          if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {  // > CustomCode.jszip:3580
              this.diskNumberStart = extraReader.readInt(4);  // > CustomCode.jszip:3581
          }  // > CustomCode.jszip:3582
      },  // > CustomCode.jszip:3583
      /**  // > CustomCode.jszip:3584
       * Read the central part of a zip file and add the info in this object.  // > CustomCode.jszip:3585
       * @param {DataReader} reader the reader to use.  // > CustomCode.jszip:3586
       */  // > CustomCode.jszip:3587
      readExtraFields: function(reader) {  // > CustomCode.jszip:3588
          var end = reader.index + this.extraFieldsLength,  // > CustomCode.jszip:3589
              extraFieldId,  // > CustomCode.jszip:3590
              extraFieldLength,  // > CustomCode.jszip:3591
              extraFieldValue;  // > CustomCode.jszip:3592
          if (!this.extraFields) {  // > CustomCode.jszip:3593
              this.extraFields = {};  // > CustomCode.jszip:3594
          }  // > CustomCode.jszip:3595
          while (reader.index + 4 < end) {  // > CustomCode.jszip:3596
              extraFieldId = reader.readInt(2);  // > CustomCode.jszip:3597
              extraFieldLength = reader.readInt(2);  // > CustomCode.jszip:3598
              extraFieldValue = reader.readData(extraFieldLength);  // > CustomCode.jszip:3599
              this.extraFields[extraFieldId] = {  // > CustomCode.jszip:3600
                  id: extraFieldId,  // > CustomCode.jszip:3601
                  length: extraFieldLength,  // > CustomCode.jszip:3602
                  value: extraFieldValue  // > CustomCode.jszip:3603
              };  // > CustomCode.jszip:3604
          }  // > CustomCode.jszip:3605
          reader.setIndex(end);  // > CustomCode.jszip:3606
      },  // > CustomCode.jszip:3607
      /**  // > CustomCode.jszip:3608
       * Apply an UTF8 transformation if needed.  // > CustomCode.jszip:3609
       */  // > CustomCode.jszip:3610
      handleUTF8: function() {  // > CustomCode.jszip:3611
          var decodeParamType = support.uint8array ? "uint8array" : "array";  // > CustomCode.jszip:3612
          if (this.useUTF8()) {  // > CustomCode.jszip:3613
              this.fileNameStr = utf8.utf8decode(this.fileName);  // > CustomCode.jszip:3614
              this.fileCommentStr = utf8.utf8decode(this.fileComment);  // > CustomCode.jszip:3615
          } else {  // > CustomCode.jszip:3616
              var upath = this.findExtraFieldUnicodePath();  // > CustomCode.jszip:3617
              if (upath !== null) {  // > CustomCode.jszip:3618
                  this.fileNameStr = upath;  // > CustomCode.jszip:3619
              } else {  // > CustomCode.jszip:3620
                  // ASCII text or unsupported code page  // > CustomCode.jszip:3621
                  var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);  // > CustomCode.jszip:3622
                  this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);  // > CustomCode.jszip:3623
              }  // > CustomCode.jszip:3624
              var ucomment = this.findExtraFieldUnicodeComment();  // > CustomCode.jszip:3625
              if (ucomment !== null) {  // > CustomCode.jszip:3626
                  this.fileCommentStr = ucomment;  // > CustomCode.jszip:3627
              } else {  // > CustomCode.jszip:3628
                  // ASCII text or unsupported code page  // > CustomCode.jszip:3629
                  var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);  // > CustomCode.jszip:3630
                  this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);  // > CustomCode.jszip:3631
              }  // > CustomCode.jszip:3632
          }  // > CustomCode.jszip:3633
      },  // > CustomCode.jszip:3634
      /**  // > CustomCode.jszip:3635
       * Find the unicode path declared in the extra field, if any.  // > CustomCode.jszip:3636
       * @return {String} the unicode path, null otherwise.  // > CustomCode.jszip:3637
       */  // > CustomCode.jszip:3638
      findExtraFieldUnicodePath: function() {  // > CustomCode.jszip:3639
          var upathField = this.extraFields[0x7075];  // > CustomCode.jszip:3640
          if (upathField) {  // > CustomCode.jszip:3641
              var extraReader = readerFor(upathField.value);  // > CustomCode.jszip:3642
              // wrong version  // > CustomCode.jszip:3643
              if (extraReader.readInt(1) !== 1) {  // > CustomCode.jszip:3644
                  return null;  // > CustomCode.jszip:3645
              }  // > CustomCode.jszip:3646
              // the crc of the filename changed, this field is out of date.  // > CustomCode.jszip:3647
              if (crc32fn(this.fileName) !== extraReader.readInt(4)) {  // > CustomCode.jszip:3648
                  return null;  // > CustomCode.jszip:3649
              }  // > CustomCode.jszip:3650
              return utf8.utf8decode(extraReader.readData(upathField.length - 5));  // > CustomCode.jszip:3651
          }  // > CustomCode.jszip:3652
          return null;  // > CustomCode.jszip:3653
      },  // > CustomCode.jszip:3654
      /**  // > CustomCode.jszip:3655
       * Find the unicode comment declared in the extra field, if any.  // > CustomCode.jszip:3656
       * @return {String} the unicode comment, null otherwise.  // > CustomCode.jszip:3657
       */  // > CustomCode.jszip:3658
      findExtraFieldUnicodeComment: function() {  // > CustomCode.jszip:3659
          var ucommentField = this.extraFields[0x6375];  // > CustomCode.jszip:3660
          if (ucommentField) {  // > CustomCode.jszip:3661
              var extraReader = readerFor(ucommentField.value);  // > CustomCode.jszip:3662
              // wrong version  // > CustomCode.jszip:3663
              if (extraReader.readInt(1) !== 1) {  // > CustomCode.jszip:3664
                  return null;  // > CustomCode.jszip:3665
              }  // > CustomCode.jszip:3666
              // the crc of the comment changed, this field is out of date.  // > CustomCode.jszip:3667
              if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {  // > CustomCode.jszip:3668
                  return null;  // > CustomCode.jszip:3669
              }  // > CustomCode.jszip:3670
              return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));  // > CustomCode.jszip:3671
          }  // > CustomCode.jszip:3672
          return null;  // > CustomCode.jszip:3673
      }  // > CustomCode.jszip:3674
  };  // > CustomCode.jszip:3675
  module.exports = ZipEntry;  // > CustomCode.jszip:3676
  },{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(require,module,exports){  // > CustomCode.jszip:3677
  "use strict";  // > CustomCode.jszip:3678
  var StreamHelper = require("./stream/StreamHelper");  // > CustomCode.jszip:3679
  var DataWorker = require("./stream/DataWorker");  // > CustomCode.jszip:3680
  var utf8 = require("./utf8");  // > CustomCode.jszip:3681
  var CompressedObject = require("./compressedObject");  // > CustomCode.jszip:3682
  var GenericWorker = require("./stream/GenericWorker");  // > CustomCode.jszip:3683
  /**  // > CustomCode.jszip:3684
   * A simple object representing a file in the zip file.  // > CustomCode.jszip:3685
   * @constructor  // > CustomCode.jszip:3686
   * @param {string} name the name of the file  // > CustomCode.jszip:3687
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data  // > CustomCode.jszip:3688
   * @param {Object} options the options of the file  // > CustomCode.jszip:3689
   */  // > CustomCode.jszip:3690
  var ZipObject = function(name, data, options) {  // > CustomCode.jszip:3691
      this.name = name;  // > CustomCode.jszip:3692
      this.dir = options.dir;  // > CustomCode.jszip:3693
      this.date = options.date;  // > CustomCode.jszip:3694
      this.comment = options.comment;  // > CustomCode.jszip:3695
      this.unixPermissions = options.unixPermissions;  // > CustomCode.jszip:3696
      this.dosPermissions = options.dosPermissions;  // > CustomCode.jszip:3697
      this._data = data;  // > CustomCode.jszip:3698
      this._dataBinary = options.binary;  // > CustomCode.jszip:3699
      // keep only the compression  // > CustomCode.jszip:3700
      this.options = {  // > CustomCode.jszip:3701
          compression : options.compression,  // > CustomCode.jszip:3702
          compressionOptions : options.compressionOptions  // > CustomCode.jszip:3703
      };  // > CustomCode.jszip:3704
  };  // > CustomCode.jszip:3705
  ZipObject.prototype = {  // > CustomCode.jszip:3706
      /**  // > CustomCode.jszip:3707
       * Create an internal stream for the content of this object.  // > CustomCode.jszip:3708
       * @param {String} type the type of each chunk.  // > CustomCode.jszip:3709
       * @return StreamHelper the stream.  // > CustomCode.jszip:3710
       */  // > CustomCode.jszip:3711
      internalStream: function (type) {  // > CustomCode.jszip:3712
          var result = null, outputType = "string";  // > CustomCode.jszip:3713
          try {  // > CustomCode.jszip:3714
              if (!type) {  // > CustomCode.jszip:3715
                  throw new Error("No output type specified.");  // > CustomCode.jszip:3716
              }  // > CustomCode.jszip:3717
              outputType = type.toLowerCase();  // > CustomCode.jszip:3718
              var askUnicodeString = outputType === "string" || outputType === "text";  // > CustomCode.jszip:3719
              if (outputType === "binarystring" || outputType === "text") {  // > CustomCode.jszip:3720
                  outputType = "string";  // > CustomCode.jszip:3721
              }  // > CustomCode.jszip:3722
              result = this._decompressWorker();  // > CustomCode.jszip:3723
              var isUnicodeString = !this._dataBinary;  // > CustomCode.jszip:3724
              if (isUnicodeString && !askUnicodeString) {  // > CustomCode.jszip:3725
                  result = result.pipe(new utf8.Utf8EncodeWorker());  // > CustomCode.jszip:3726
              }  // > CustomCode.jszip:3727
              if (!isUnicodeString && askUnicodeString) {  // > CustomCode.jszip:3728
                  result = result.pipe(new utf8.Utf8DecodeWorker());  // > CustomCode.jszip:3729
              }  // > CustomCode.jszip:3730
          } catch (e) {  // > CustomCode.jszip:3731
              result = new GenericWorker("error");  // > CustomCode.jszip:3732
              result.error(e);  // > CustomCode.jszip:3733
          }  // > CustomCode.jszip:3734
          return new StreamHelper(result, outputType, "");  // > CustomCode.jszip:3735
      },  // > CustomCode.jszip:3736
      /**  // > CustomCode.jszip:3737
       * Prepare the content in the asked type.  // > CustomCode.jszip:3738
       * @param {String} type the type of the result.  // > CustomCode.jszip:3739
       * @param {Function} onUpdate a function to call on each internal update.  // > CustomCode.jszip:3740
       * @return Promise the promise of the result.  // > CustomCode.jszip:3741
       */  // > CustomCode.jszip:3742
      async: function (type, onUpdate) {  // > CustomCode.jszip:3743
          return this.internalStream(type).accumulate(onUpdate);  // > CustomCode.jszip:3744
      },  // > CustomCode.jszip:3745
      /**  // > CustomCode.jszip:3746
       * Prepare the content as a nodejs stream.  // > CustomCode.jszip:3747
       * @param {String} type the type of each chunk.  // > CustomCode.jszip:3748
       * @param {Function} onUpdate a function to call on each internal update.  // > CustomCode.jszip:3749
       * @return Stream the stream.  // > CustomCode.jszip:3750
       */  // > CustomCode.jszip:3751
      nodeStream: function (type, onUpdate) {  // > CustomCode.jszip:3752
          return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);  // > CustomCode.jszip:3753
      },  // > CustomCode.jszip:3754
      /**  // > CustomCode.jszip:3755
       * Return a worker for the compressed content.  // > CustomCode.jszip:3756
       * @private  // > CustomCode.jszip:3757
       * @param {Object} compression the compression object to use.  // > CustomCode.jszip:3758
       * @param {Object} compressionOptions the options to use when compressing.  // > CustomCode.jszip:3759
       * @return Worker the worker.  // > CustomCode.jszip:3760
       */  // > CustomCode.jszip:3761
      _compressWorker: function (compression, compressionOptions) {  // > CustomCode.jszip:3762
          if (  // > CustomCode.jszip:3763
              this._data instanceof CompressedObject &&  // > CustomCode.jszip:3764
              this._data.compression.magic === compression.magic  // > CustomCode.jszip:3765
          ) {  // > CustomCode.jszip:3766
              return this._data.getCompressedWorker();  // > CustomCode.jszip:3767
          } else {  // > CustomCode.jszip:3768
              var result = this._decompressWorker();  // > CustomCode.jszip:3769
              if(!this._dataBinary) {  // > CustomCode.jszip:3770
                  result = result.pipe(new utf8.Utf8EncodeWorker());  // > CustomCode.jszip:3771
              }  // > CustomCode.jszip:3772
              return CompressedObject.createWorkerFrom(result, compression, compressionOptions);  // > CustomCode.jszip:3773
          }  // > CustomCode.jszip:3774
      },  // > CustomCode.jszip:3775
      /**  // > CustomCode.jszip:3776
       * Return a worker for the decompressed content.  // > CustomCode.jszip:3777
       * @private  // > CustomCode.jszip:3778
       * @return Worker the worker.  // > CustomCode.jszip:3779
       */  // > CustomCode.jszip:3780
      _decompressWorker : function () {  // > CustomCode.jszip:3781
          if (this._data instanceof CompressedObject) {  // > CustomCode.jszip:3782
              return this._data.getContentWorker();  // > CustomCode.jszip:3783
          } else if (this._data instanceof GenericWorker) {  // > CustomCode.jszip:3784
              return this._data;  // > CustomCode.jszip:3785
          } else {  // > CustomCode.jszip:3786
              return new DataWorker(this._data);  // > CustomCode.jszip:3787
          }  // > CustomCode.jszip:3788
      }  // > CustomCode.jszip:3789
  };  // > CustomCode.jszip:3790
  var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];  // > CustomCode.jszip:3791
  var removedFn = function () {  // > CustomCode.jszip:3792
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");  // > CustomCode.jszip:3793
  };  // > CustomCode.jszip:3794
  for(var i = 0; i < removedMethods.length; i++) {  // > CustomCode.jszip:3795
      ZipObject.prototype[removedMethods[i]] = removedFn;  // > CustomCode.jszip:3796
  }  // > CustomCode.jszip:3797
  module.exports = ZipObject;  // > CustomCode.jszip:3798
  },{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(require,module,exports){  // > CustomCode.jszip:3799
  (function (global){  // > CustomCode.jszip:3800
  'use strict';  // > CustomCode.jszip:3801
  var Mutation = global.MutationObserver || global.WebKitMutationObserver;  // > CustomCode.jszip:3802
  var scheduleDrain;  // > CustomCode.jszip:3803
  {  // > CustomCode.jszip:3804
    if (Mutation) {  // > CustomCode.jszip:3805
      var called = 0;  // > CustomCode.jszip:3806
      var observer = new Mutation(nextTick);  // > CustomCode.jszip:3807
      var element = global.document.createTextNode('');  // > CustomCode.jszip:3808
      observer.observe(element, {  // > CustomCode.jszip:3809
        characterData: true  // > CustomCode.jszip:3810
      });  // > CustomCode.jszip:3811
      scheduleDrain = function () {  // > CustomCode.jszip:3812
        element.data = (called = ++called % 2);  // > CustomCode.jszip:3813
      };  // > CustomCode.jszip:3814
    } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {  // > CustomCode.jszip:3815
      var channel = new global.MessageChannel();  // > CustomCode.jszip:3816
      channel.port1.onmessage = nextTick;  // > CustomCode.jszip:3817
      scheduleDrain = function () {  // > CustomCode.jszip:3818
        channel.port2.postMessage(0);  // > CustomCode.jszip:3819
      };  // > CustomCode.jszip:3820
    } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {  // > CustomCode.jszip:3821
      scheduleDrain = function () {  // > CustomCode.jszip:3822
        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted  // > CustomCode.jszip:3823
        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.  // > CustomCode.jszip:3824
        var scriptEl = global.document.createElement('script');  // > CustomCode.jszip:3825
        scriptEl.onreadystatechange = function () {  // > CustomCode.jszip:3826
          nextTick();  // > CustomCode.jszip:3827
          scriptEl.onreadystatechange = null;  // > CustomCode.jszip:3828
          scriptEl.parentNode.removeChild(scriptEl);  // > CustomCode.jszip:3829
          scriptEl = null;  // > CustomCode.jszip:3830
        };  // > CustomCode.jszip:3831
        global.document.documentElement.appendChild(scriptEl);  // > CustomCode.jszip:3832
      };  // > CustomCode.jszip:3833
    } else {  // > CustomCode.jszip:3834
      scheduleDrain = function () {  // > CustomCode.jszip:3835
        setTimeout(nextTick, 0);  // > CustomCode.jszip:3836
      };  // > CustomCode.jszip:3837
    }  // > CustomCode.jszip:3838
  }  // > CustomCode.jszip:3839
  var draining;  // > CustomCode.jszip:3840
  var queue = [];  // > CustomCode.jszip:3841
  //named nextTick for less confusing stack traces  // > CustomCode.jszip:3842
  function nextTick() {  // > CustomCode.jszip:3843
    draining = true;  // > CustomCode.jszip:3844
    var i, oldQueue;  // > CustomCode.jszip:3845
    var len = queue.length;  // > CustomCode.jszip:3846
    while (len) {  // > CustomCode.jszip:3847
      oldQueue = queue;  // > CustomCode.jszip:3848
      queue = [];  // > CustomCode.jszip:3849
      i = -1;  // > CustomCode.jszip:3850
      while (++i < len) {  // > CustomCode.jszip:3851
        oldQueue[i]();  // > CustomCode.jszip:3852
      }  // > CustomCode.jszip:3853
      len = queue.length;  // > CustomCode.jszip:3854
    }  // > CustomCode.jszip:3855
    draining = false;  // > CustomCode.jszip:3856
  }  // > CustomCode.jszip:3857
  module.exports = immediate;  // > CustomCode.jszip:3858
  function immediate(task) {  // > CustomCode.jszip:3859
    if (queue.push(task) === 1 && !draining) {  // > CustomCode.jszip:3860
      scheduleDrain();  // > CustomCode.jszip:3861
    }  // > CustomCode.jszip:3862
  }  // > CustomCode.jszip:3863
  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})  // > CustomCode.jszip:3864
  },{}],37:[function(require,module,exports){  // > CustomCode.jszip:3865
  'use strict';  // > CustomCode.jszip:3866
  var immediate = require('immediate');  // > CustomCode.jszip:3867
  /* istanbul ignore next */  // > CustomCode.jszip:3868
  function INTERNAL() {}  // > CustomCode.jszip:3869
  var handlers = {};  // > CustomCode.jszip:3870
  var REJECTED = ['REJECTED'];  // > CustomCode.jszip:3871
  var FULFILLED = ['FULFILLED'];  // > CustomCode.jszip:3872
  var PENDING = ['PENDING'];  // > CustomCode.jszip:3873
  module.exports = Promise;  // > CustomCode.jszip:3874
  function Promise(resolver) {  // > CustomCode.jszip:3875
    if (typeof resolver !== 'function') {  // > CustomCode.jszip:3876
      throw new TypeError('resolver must be a function');  // > CustomCode.jszip:3877
    }  // > CustomCode.jszip:3878
    this.state = PENDING;  // > CustomCode.jszip:3879
    this.queue = [];  // > CustomCode.jszip:3880
    this.outcome = void 0;  // > CustomCode.jszip:3881
    if (resolver !== INTERNAL) {  // > CustomCode.jszip:3882
      safelyResolveThenable(this, resolver);  // > CustomCode.jszip:3883
    }  // > CustomCode.jszip:3884
  }  // > CustomCode.jszip:3885
  Promise.prototype["finally"] = function (callback) {  // > CustomCode.jszip:3886
    if (typeof callback !== 'function') {  // > CustomCode.jszip:3887
      return this;  // > CustomCode.jszip:3888
    }  // > CustomCode.jszip:3889
    var p = this.constructor;  // > CustomCode.jszip:3890
    return this.then(resolve, reject);  // > CustomCode.jszip:3891
    function resolve(value) {  // > CustomCode.jszip:3892
      function yes () {  // > CustomCode.jszip:3893
        return value;  // > CustomCode.jszip:3894
      }  // > CustomCode.jszip:3895
      return p.resolve(callback()).then(yes);  // > CustomCode.jszip:3896
    }  // > CustomCode.jszip:3897
    function reject(reason) {  // > CustomCode.jszip:3898
      function no () {  // > CustomCode.jszip:3899
        throw reason;  // > CustomCode.jszip:3900
      }  // > CustomCode.jszip:3901
      return p.resolve(callback()).then(no);  // > CustomCode.jszip:3902
    }  // > CustomCode.jszip:3903
  };  // > CustomCode.jszip:3904
  Promise.prototype["catch"] = function (onRejected) {  // > CustomCode.jszip:3905
    return this.then(null, onRejected);  // > CustomCode.jszip:3906
  };  // > CustomCode.jszip:3907
  Promise.prototype.then = function (onFulfilled, onRejected) {  // > CustomCode.jszip:3908
    if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||  // > CustomCode.jszip:3909
      typeof onRejected !== 'function' && this.state === REJECTED) {  // > CustomCode.jszip:3910
      return this;  // > CustomCode.jszip:3911
    }  // > CustomCode.jszip:3912
    var promise = new this.constructor(INTERNAL);  // > CustomCode.jszip:3913
    if (this.state !== PENDING) {  // > CustomCode.jszip:3914
      var resolver = this.state === FULFILLED ? onFulfilled : onRejected;  // > CustomCode.jszip:3915
      unwrap(promise, resolver, this.outcome);  // > CustomCode.jszip:3916
    } else {  // > CustomCode.jszip:3917
      this.queue.push(new QueueItem(promise, onFulfilled, onRejected));  // > CustomCode.jszip:3918
    }  // > CustomCode.jszip:3919
    return promise;  // > CustomCode.jszip:3920
  };  // > CustomCode.jszip:3921
  function QueueItem(promise, onFulfilled, onRejected) {  // > CustomCode.jszip:3922
    this.promise = promise;  // > CustomCode.jszip:3923
    if (typeof onFulfilled === 'function') {  // > CustomCode.jszip:3924
      this.onFulfilled = onFulfilled;  // > CustomCode.jszip:3925
      this.callFulfilled = this.otherCallFulfilled;  // > CustomCode.jszip:3926
    }  // > CustomCode.jszip:3927
    if (typeof onRejected === 'function') {  // > CustomCode.jszip:3928
      this.onRejected = onRejected;  // > CustomCode.jszip:3929
      this.callRejected = this.otherCallRejected;  // > CustomCode.jszip:3930
    }  // > CustomCode.jszip:3931
  }  // > CustomCode.jszip:3932
  QueueItem.prototype.callFulfilled = function (value) {  // > CustomCode.jszip:3933
    handlers.resolve(this.promise, value);  // > CustomCode.jszip:3934
  };  // > CustomCode.jszip:3935
  QueueItem.prototype.otherCallFulfilled = function (value) {  // > CustomCode.jszip:3936
    unwrap(this.promise, this.onFulfilled, value);  // > CustomCode.jszip:3937
  };  // > CustomCode.jszip:3938
  QueueItem.prototype.callRejected = function (value) {  // > CustomCode.jszip:3939
    handlers.reject(this.promise, value);  // > CustomCode.jszip:3940
  };  // > CustomCode.jszip:3941
  QueueItem.prototype.otherCallRejected = function (value) {  // > CustomCode.jszip:3942
    unwrap(this.promise, this.onRejected, value);  // > CustomCode.jszip:3943
  };  // > CustomCode.jszip:3944
  function unwrap(promise, func, value) {  // > CustomCode.jszip:3945
    immediate(function () {  // > CustomCode.jszip:3946
      var returnValue;  // > CustomCode.jszip:3947
      try {  // > CustomCode.jszip:3948
        returnValue = func(value);  // > CustomCode.jszip:3949
      } catch (e) {  // > CustomCode.jszip:3950
        return handlers.reject(promise, e);  // > CustomCode.jszip:3951
      }  // > CustomCode.jszip:3952
      if (returnValue === promise) {  // > CustomCode.jszip:3953
        handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));  // > CustomCode.jszip:3954
      } else {  // > CustomCode.jszip:3955
        handlers.resolve(promise, returnValue);  // > CustomCode.jszip:3956
      }  // > CustomCode.jszip:3957
    });  // > CustomCode.jszip:3958
  }  // > CustomCode.jszip:3959
  handlers.resolve = function (self, value) {  // > CustomCode.jszip:3960
    var result = tryCatch(getThen, value);  // > CustomCode.jszip:3961
    if (result.status === 'error') {  // > CustomCode.jszip:3962
      return handlers.reject(self, result.value);  // > CustomCode.jszip:3963
    }  // > CustomCode.jszip:3964
    var thenable = result.value;  // > CustomCode.jszip:3965
    if (thenable) {  // > CustomCode.jszip:3966
      safelyResolveThenable(self, thenable);  // > CustomCode.jszip:3967
    } else {  // > CustomCode.jszip:3968
      self.state = FULFILLED;  // > CustomCode.jszip:3969
      self.outcome = value;  // > CustomCode.jszip:3970
      var i = -1;  // > CustomCode.jszip:3971
      var len = self.queue.length;  // > CustomCode.jszip:3972
      while (++i < len) {  // > CustomCode.jszip:3973
        self.queue[i].callFulfilled(value);  // > CustomCode.jszip:3974
      }  // > CustomCode.jszip:3975
    }  // > CustomCode.jszip:3976
    return self;  // > CustomCode.jszip:3977
  };  // > CustomCode.jszip:3978
  handlers.reject = function (self, error) {  // > CustomCode.jszip:3979
    self.state = REJECTED;  // > CustomCode.jszip:3980
    self.outcome = error;  // > CustomCode.jszip:3981
    var i = -1;  // > CustomCode.jszip:3982
    var len = self.queue.length;  // > CustomCode.jszip:3983
    while (++i < len) {  // > CustomCode.jszip:3984
      self.queue[i].callRejected(error);  // > CustomCode.jszip:3985
    }  // > CustomCode.jszip:3986
    return self;  // > CustomCode.jszip:3987
  };  // > CustomCode.jszip:3988
  function getThen(obj) {  // > CustomCode.jszip:3989
    // Make sure we only access the accessor once as required by the spec  // > CustomCode.jszip:3990
    var then = obj && obj.then;  // > CustomCode.jszip:3991
    if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {  // > CustomCode.jszip:3992
      return function appyThen() {  // > CustomCode.jszip:3993
        then.apply(obj, arguments);  // > CustomCode.jszip:3994
      };  // > CustomCode.jszip:3995
    }  // > CustomCode.jszip:3996
  }  // > CustomCode.jszip:3997
  function safelyResolveThenable(self, thenable) {  // > CustomCode.jszip:3998
    // Either fulfill, reject or reject with error  // > CustomCode.jszip:3999
    var called = false;  // > CustomCode.jszip:4000
    function onError(value) {  // > CustomCode.jszip:4001
      if (called) {  // > CustomCode.jszip:4002
        return;  // > CustomCode.jszip:4003
      }  // > CustomCode.jszip:4004
      called = true;  // > CustomCode.jszip:4005
      handlers.reject(self, value);  // > CustomCode.jszip:4006
    }  // > CustomCode.jszip:4007
    function onSuccess(value) {  // > CustomCode.jszip:4008
      if (called) {  // > CustomCode.jszip:4009
        return;  // > CustomCode.jszip:4010
      }  // > CustomCode.jszip:4011
      called = true;  // > CustomCode.jszip:4012
      handlers.resolve(self, value);  // > CustomCode.jszip:4013
    }  // > CustomCode.jszip:4014
    function tryToUnwrap() {  // > CustomCode.jszip:4015
      thenable(onSuccess, onError);  // > CustomCode.jszip:4016
    }  // > CustomCode.jszip:4017
    var result = tryCatch(tryToUnwrap);  // > CustomCode.jszip:4018
    if (result.status === 'error') {  // > CustomCode.jszip:4019
      onError(result.value);  // > CustomCode.jszip:4020
    }  // > CustomCode.jszip:4021
  }  // > CustomCode.jszip:4022
  function tryCatch(func, value) {  // > CustomCode.jszip:4023
    var out = {};  // > CustomCode.jszip:4024
    try {  // > CustomCode.jszip:4025
      out.value = func(value);  // > CustomCode.jszip:4026
      out.status = 'success';  // > CustomCode.jszip:4027
    } catch (e) {  // > CustomCode.jszip:4028
      out.status = 'error';  // > CustomCode.jszip:4029
      out.value = e;  // > CustomCode.jszip:4030
    }  // > CustomCode.jszip:4031
    return out;  // > CustomCode.jszip:4032
  }  // > CustomCode.jszip:4033
  Promise.resolve = resolve;  // > CustomCode.jszip:4034
  function resolve(value) {  // > CustomCode.jszip:4035
    if (value instanceof this) {  // > CustomCode.jszip:4036
      return value;  // > CustomCode.jszip:4037
    }  // > CustomCode.jszip:4038
    return handlers.resolve(new this(INTERNAL), value);  // > CustomCode.jszip:4039
  }  // > CustomCode.jszip:4040
  Promise.reject = reject;  // > CustomCode.jszip:4041
  function reject(reason) {  // > CustomCode.jszip:4042
    var promise = new this(INTERNAL);  // > CustomCode.jszip:4043
    return handlers.reject(promise, reason);  // > CustomCode.jszip:4044
  }  // > CustomCode.jszip:4045
  Promise.all = all;  // > CustomCode.jszip:4046
  function all(iterable) {  // > CustomCode.jszip:4047
    var self = this;  // > CustomCode.jszip:4048
    if (Object.prototype.toString.call(iterable) !== '[object Array]') {  // > CustomCode.jszip:4049
      return this.reject(new TypeError('must be an array'));  // > CustomCode.jszip:4050
    }  // > CustomCode.jszip:4051
    var len = iterable.length;  // > CustomCode.jszip:4052
    var called = false;  // > CustomCode.jszip:4053
    if (!len) {  // > CustomCode.jszip:4054
      return this.resolve([]);  // > CustomCode.jszip:4055
    }  // > CustomCode.jszip:4056
    var values = new Array(len);  // > CustomCode.jszip:4057
    var resolved = 0;  // > CustomCode.jszip:4058
    var i = -1;  // > CustomCode.jszip:4059
    var promise = new this(INTERNAL);  // > CustomCode.jszip:4060
    while (++i < len) {  // > CustomCode.jszip:4061
      allResolver(iterable[i], i);  // > CustomCode.jszip:4062
    }  // > CustomCode.jszip:4063
    return promise;  // > CustomCode.jszip:4064
    function allResolver(value, i) {  // > CustomCode.jszip:4065
      self.resolve(value).then(resolveFromAll, function (error) {  // > CustomCode.jszip:4066
        if (!called) {  // > CustomCode.jszip:4067
          called = true;  // > CustomCode.jszip:4068
          handlers.reject(promise, error);  // > CustomCode.jszip:4069
        }  // > CustomCode.jszip:4070
      });  // > CustomCode.jszip:4071
      function resolveFromAll(outValue) {  // > CustomCode.jszip:4072
        values[i] = outValue;  // > CustomCode.jszip:4073
        if (++resolved === len && !called) {  // > CustomCode.jszip:4074
          called = true;  // > CustomCode.jszip:4075
          handlers.resolve(promise, values);  // > CustomCode.jszip:4076
        }  // > CustomCode.jszip:4077
      }  // > CustomCode.jszip:4078
    }  // > CustomCode.jszip:4079
  }  // > CustomCode.jszip:4080
  Promise.race = race;  // > CustomCode.jszip:4081
  function race(iterable) {  // > CustomCode.jszip:4082
    var self = this;  // > CustomCode.jszip:4083
    if (Object.prototype.toString.call(iterable) !== '[object Array]') {  // > CustomCode.jszip:4084
      return this.reject(new TypeError('must be an array'));  // > CustomCode.jszip:4085
    }  // > CustomCode.jszip:4086
    var len = iterable.length;  // > CustomCode.jszip:4087
    var called = false;  // > CustomCode.jszip:4088
    if (!len) {  // > CustomCode.jszip:4089
      return this.resolve([]);  // > CustomCode.jszip:4090
    }  // > CustomCode.jszip:4091
    var i = -1;  // > CustomCode.jszip:4092
    var promise = new this(INTERNAL);  // > CustomCode.jszip:4093
    while (++i < len) {  // > CustomCode.jszip:4094
      resolver(iterable[i]);  // > CustomCode.jszip:4095
    }  // > CustomCode.jszip:4096
    return promise;  // > CustomCode.jszip:4097
    function resolver(value) {  // > CustomCode.jszip:4098
      self.resolve(value).then(function (response) {  // > CustomCode.jszip:4099
        if (!called) {  // > CustomCode.jszip:4100
          called = true;  // > CustomCode.jszip:4101
          handlers.resolve(promise, response);  // > CustomCode.jszip:4102
        }  // > CustomCode.jszip:4103
      }, function (error) {  // > CustomCode.jszip:4104
        if (!called) {  // > CustomCode.jszip:4105
          called = true;  // > CustomCode.jszip:4106
          handlers.reject(promise, error);  // > CustomCode.jszip:4107
        }  // > CustomCode.jszip:4108
      });  // > CustomCode.jszip:4109
    }  // > CustomCode.jszip:4110
  }  // > CustomCode.jszip:4111
  },{"immediate":36}],38:[function(require,module,exports){  // > CustomCode.jszip:4112
  // Top level file is just a mixin of submodules & constants  // > CustomCode.jszip:4113
  'use strict';  // > CustomCode.jszip:4114
  var assign    = require('./lib/utils/common').assign;  // > CustomCode.jszip:4115
  var deflate   = require('./lib/deflate');  // > CustomCode.jszip:4116
  var inflate   = require('./lib/inflate');  // > CustomCode.jszip:4117
  var constants = require('./lib/zlib/constants');  // > CustomCode.jszip:4118
  var pako = {};  // > CustomCode.jszip:4119
  assign(pako, deflate, inflate, constants);  // > CustomCode.jszip:4120
  module.exports = pako;  // > CustomCode.jszip:4121
  },{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(require,module,exports){  // > CustomCode.jszip:4122
  'use strict';  // > CustomCode.jszip:4123
  var zlib_deflate = require('./zlib/deflate');  // > CustomCode.jszip:4124
  var utils        = require('./utils/common');  // > CustomCode.jszip:4125
  var strings      = require('./utils/strings');  // > CustomCode.jszip:4126
  var msg          = require('./zlib/messages');  // > CustomCode.jszip:4127
  var ZStream      = require('./zlib/zstream');  // > CustomCode.jszip:4128
  var toString = Object.prototype.toString;  // > CustomCode.jszip:4129
  /* Public constants ==========================================================*/  // > CustomCode.jszip:4130
  /* ===========================================================================*/  // > CustomCode.jszip:4131
  var Z_NO_FLUSH      = 0;  // > CustomCode.jszip:4132
  var Z_FINISH        = 4;  // > CustomCode.jszip:4133
  var Z_OK            = 0;  // > CustomCode.jszip:4134
  var Z_STREAM_END    = 1;  // > CustomCode.jszip:4135
  var Z_SYNC_FLUSH    = 2;  // > CustomCode.jszip:4136
  var Z_DEFAULT_COMPRESSION = -1;  // > CustomCode.jszip:4137
  var Z_DEFAULT_STRATEGY    = 0;  // > CustomCode.jszip:4138
  var Z_DEFLATED  = 8;  // > CustomCode.jszip:4139
  /* ===========================================================================*/  // > CustomCode.jszip:4140
  /**  // > CustomCode.jszip:4141
   * class Deflate  // > CustomCode.jszip:4142
   *  // > CustomCode.jszip:4143
   * Generic JS-style wrapper for zlib calls. If you don't need  // > CustomCode.jszip:4144
   * streaming behaviour - use more simple functions: [[deflate]],  // > CustomCode.jszip:4145
   * [[deflateRaw]] and [[gzip]].  // > CustomCode.jszip:4146
   **/  // > CustomCode.jszip:4147
  /* internal  // > CustomCode.jszip:4148
   * Deflate.chunks -> Array  // > CustomCode.jszip:4149
   *  // > CustomCode.jszip:4150
   * Chunks of output data, if [[Deflate#onData]] not overriden.  // > CustomCode.jszip:4151
   **/  // > CustomCode.jszip:4152
  /**  // > CustomCode.jszip:4153
   * Deflate.result -> Uint8Array|Array  // > CustomCode.jszip:4154
   *  // > CustomCode.jszip:4155
   * Compressed result, generated by default [[Deflate#onData]]  // > CustomCode.jszip:4156
   * and [[Deflate#onEnd]] handlers. Filled after you push last chunk  // > CustomCode.jszip:4157
   * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you  // > CustomCode.jszip:4158
   * push a chunk with explicit flush (call [[Deflate#push]] with  // > CustomCode.jszip:4159
   * `Z_SYNC_FLUSH` param).  // > CustomCode.jszip:4160
   **/  // > CustomCode.jszip:4161
  /**  // > CustomCode.jszip:4162
   * Deflate.err -> Number  // > CustomCode.jszip:4163
   *  // > CustomCode.jszip:4164
   * Error code after deflate finished. 0 (Z_OK) on success.  // > CustomCode.jszip:4165
   * You will not need it in real life, because deflate errors  // > CustomCode.jszip:4166
   * are possible only on wrong options or bad `onData` / `onEnd`  // > CustomCode.jszip:4167
   * custom handlers.  // > CustomCode.jszip:4168
   **/  // > CustomCode.jszip:4169
  /**  // > CustomCode.jszip:4170
   * Deflate.msg -> String  // > CustomCode.jszip:4171
   *  // > CustomCode.jszip:4172
   * Error message, if [[Deflate.err]] != 0  // > CustomCode.jszip:4173
   **/  // > CustomCode.jszip:4174
  /**  // > CustomCode.jszip:4175
   * new Deflate(options)  // > CustomCode.jszip:4176
   * - options (Object): zlib deflate options.  // > CustomCode.jszip:4177
   *  // > CustomCode.jszip:4178
   * Creates new deflator instance with specified params. Throws exception  // > CustomCode.jszip:4179
   * on bad params. Supported options:  // > CustomCode.jszip:4180
   *  // > CustomCode.jszip:4181
   * - `level`  // > CustomCode.jszip:4182
   * - `windowBits`  // > CustomCode.jszip:4183
   * - `memLevel`  // > CustomCode.jszip:4184
   * - `strategy`  // > CustomCode.jszip:4185
   * - `dictionary`  // > CustomCode.jszip:4186
   *  // > CustomCode.jszip:4187
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)  // > CustomCode.jszip:4188
   * for more information on these.  // > CustomCode.jszip:4189
   *  // > CustomCode.jszip:4190
   * Additional options, for internal needs:  // > CustomCode.jszip:4191
   *  // > CustomCode.jszip:4192
   * - `chunkSize` - size of generated data chunks (16K by default)  // > CustomCode.jszip:4193
   * - `raw` (Boolean) - do raw deflate  // > CustomCode.jszip:4194
   * - `gzip` (Boolean) - create gzip wrapper  // > CustomCode.jszip:4195
   * - `to` (String) - if equal to 'string', then result will be "binary string"  // > CustomCode.jszip:4196
   *    (each char code [0..255])  // > CustomCode.jszip:4197
   * - `header` (Object) - custom header for gzip  // > CustomCode.jszip:4198
   *   - `text` (Boolean) - true if compressed data believed to be text  // > CustomCode.jszip:4199
   *   - `time` (Number) - modification time, unix timestamp  // > CustomCode.jszip:4200
   *   - `os` (Number) - operation system code  // > CustomCode.jszip:4201
   *   - `extra` (Array) - array of bytes with extra data (max 65536)  // > CustomCode.jszip:4202
   *   - `name` (String) - file name (binary string)  // > CustomCode.jszip:4203
   *   - `comment` (String) - comment (binary string)  // > CustomCode.jszip:4204
   *   - `hcrc` (Boolean) - true if header crc should be added  // > CustomCode.jszip:4205
   *  // > CustomCode.jszip:4206
   * ##### Example:  // > CustomCode.jszip:4207
   *  // > CustomCode.jszip:4208
   * ```javascript  // > CustomCode.jszip:4209
   * var pako = require('pako')  // > CustomCode.jszip:4210
   *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])  // > CustomCode.jszip:4211
   *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);  // > CustomCode.jszip:4212
   *  // > CustomCode.jszip:4213
   * var deflate = new pako.Deflate({ level: 3});  // > CustomCode.jszip:4214
   *  // > CustomCode.jszip:4215
   * deflate.push(chunk1, false);  // > CustomCode.jszip:4216
   * deflate.push(chunk2, true);  // true -> last chunk  // > CustomCode.jszip:4217
   *  // > CustomCode.jszip:4218
   * if (deflate.err) { throw new Error(deflate.err); }  // > CustomCode.jszip:4219
   *  // > CustomCode.jszip:4220
   * console.log(deflate.result);  // > CustomCode.jszip:4221
   * ```  // > CustomCode.jszip:4222
   **/  // > CustomCode.jszip:4223
  function Deflate(options) {  // > CustomCode.jszip:4224
    if (!(this instanceof Deflate)) return new Deflate(options);  // > CustomCode.jszip:4225
    this.options = utils.assign({  // > CustomCode.jszip:4226
      level: Z_DEFAULT_COMPRESSION,  // > CustomCode.jszip:4227
      method: Z_DEFLATED,  // > CustomCode.jszip:4228
      chunkSize: 16384,  // > CustomCode.jszip:4229
      windowBits: 15,  // > CustomCode.jszip:4230
      memLevel: 8,  // > CustomCode.jszip:4231
      strategy: Z_DEFAULT_STRATEGY,  // > CustomCode.jszip:4232
      to: ''  // > CustomCode.jszip:4233
    }, options || {});  // > CustomCode.jszip:4234
    var opt = this.options;  // > CustomCode.jszip:4235
    if (opt.raw && (opt.windowBits > 0)) {  // > CustomCode.jszip:4236
      opt.windowBits = -opt.windowBits;  // > CustomCode.jszip:4237
    }  // > CustomCode.jszip:4238
    else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {  // > CustomCode.jszip:4239
      opt.windowBits += 16;  // > CustomCode.jszip:4240
    }  // > CustomCode.jszip:4241
    this.err    = 0;      // error code, if happens (0 = Z_OK)  // > CustomCode.jszip:4242
    this.msg    = '';     // error message  // > CustomCode.jszip:4243
    this.ended  = false;  // used to avoid multiple onEnd() calls  // > CustomCode.jszip:4244
    this.chunks = [];     // chunks of compressed data  // > CustomCode.jszip:4245
    this.strm = new ZStream();  // > CustomCode.jszip:4246
    this.strm.avail_out = 0;  // > CustomCode.jszip:4247
    var status = zlib_deflate.deflateInit2(  // > CustomCode.jszip:4248
      this.strm,  // > CustomCode.jszip:4249
      opt.level,  // > CustomCode.jszip:4250
      opt.method,  // > CustomCode.jszip:4251
      opt.windowBits,  // > CustomCode.jszip:4252
      opt.memLevel,  // > CustomCode.jszip:4253
      opt.strategy  // > CustomCode.jszip:4254
    );  // > CustomCode.jszip:4255
    if (status !== Z_OK) {  // > CustomCode.jszip:4256
      throw new Error(msg[status]);  // > CustomCode.jszip:4257
    }  // > CustomCode.jszip:4258
    if (opt.header) {  // > CustomCode.jszip:4259
      zlib_deflate.deflateSetHeader(this.strm, opt.header);  // > CustomCode.jszip:4260
    }  // > CustomCode.jszip:4261
    if (opt.dictionary) {  // > CustomCode.jszip:4262
      var dict;  // > CustomCode.jszip:4263
      // Convert data if needed  // > CustomCode.jszip:4264
      if (typeof opt.dictionary === 'string') {  // > CustomCode.jszip:4265
        // If we need to compress text, change encoding to utf8.  // > CustomCode.jszip:4266
        dict = strings.string2buf(opt.dictionary);  // > CustomCode.jszip:4267
      } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {  // > CustomCode.jszip:4268
        dict = new Uint8Array(opt.dictionary);  // > CustomCode.jszip:4269
      } else {  // > CustomCode.jszip:4270
        dict = opt.dictionary;  // > CustomCode.jszip:4271
      }  // > CustomCode.jszip:4272
      status = zlib_deflate.deflateSetDictionary(this.strm, dict);  // > CustomCode.jszip:4273
      if (status !== Z_OK) {  // > CustomCode.jszip:4274
        throw new Error(msg[status]);  // > CustomCode.jszip:4275
      }  // > CustomCode.jszip:4276
      this._dict_set = true;  // > CustomCode.jszip:4277
    }  // > CustomCode.jszip:4278
  }  // > CustomCode.jszip:4279
  /**  // > CustomCode.jszip:4280
   * Deflate#push(data[, mode]) -> Boolean  // > CustomCode.jszip:4281
   * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be  // > CustomCode.jszip:4282
   *   converted to utf8 byte sequence.  // > CustomCode.jszip:4283
   * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.  // > CustomCode.jszip:4284
   *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.  // > CustomCode.jszip:4285
   *  // > CustomCode.jszip:4286
   * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with  // > CustomCode.jszip:4287
   * new compressed chunks. Returns `true` on success. The last data block must have  // > CustomCode.jszip:4288
   * mode Z_FINISH (or `true`). That will flush internal pending buffers and call  // > CustomCode.jszip:4289
   * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you  // > CustomCode.jszip:4290
   * can use mode Z_SYNC_FLUSH, keeping the compression context.  // > CustomCode.jszip:4291
   *  // > CustomCode.jszip:4292
   * On fail call [[Deflate#onEnd]] with error code and return false.  // > CustomCode.jszip:4293
   *  // > CustomCode.jszip:4294
   * We strongly recommend to use `Uint8Array` on input for best speed (output  // > CustomCode.jszip:4295
   * array format is detected automatically). Also, don't skip last param and always  // > CustomCode.jszip:4296
   * use the same type in your code (boolean or number). That will improve JS speed.  // > CustomCode.jszip:4297
   *  // > CustomCode.jszip:4298
   * For regular `Array`-s make sure all elements are [0..255].  // > CustomCode.jszip:4299
   *  // > CustomCode.jszip:4300
   * ##### Example  // > CustomCode.jszip:4301
   *  // > CustomCode.jszip:4302
   * ```javascript  // > CustomCode.jszip:4303
   * push(chunk, false); // push one of data chunks  // > CustomCode.jszip:4304
   * ...  // > CustomCode.jszip:4305
   * push(chunk, true);  // push last chunk  // > CustomCode.jszip:4306
   * ```  // > CustomCode.jszip:4307
   **/  // > CustomCode.jszip:4308
  Deflate.prototype.push = function (data, mode) {  // > CustomCode.jszip:4309
    var strm = this.strm;  // > CustomCode.jszip:4310
    var chunkSize = this.options.chunkSize;  // > CustomCode.jszip:4311
    var status, _mode;  // > CustomCode.jszip:4312
    if (this.ended) { return false; }  // > CustomCode.jszip:4313
    _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);  // > CustomCode.jszip:4314
    // Convert data if needed  // > CustomCode.jszip:4315
    if (typeof data === 'string') {  // > CustomCode.jszip:4316
      // If we need to compress text, change encoding to utf8.  // > CustomCode.jszip:4317
      strm.input = strings.string2buf(data);  // > CustomCode.jszip:4318
    } else if (toString.call(data) === '[object ArrayBuffer]') {  // > CustomCode.jszip:4319
      strm.input = new Uint8Array(data);  // > CustomCode.jszip:4320
    } else {  // > CustomCode.jszip:4321
      strm.input = data;  // > CustomCode.jszip:4322
    }  // > CustomCode.jszip:4323
    strm.next_in = 0;  // > CustomCode.jszip:4324
    strm.avail_in = strm.input.length;  // > CustomCode.jszip:4325
    do {  // > CustomCode.jszip:4326
      if (strm.avail_out === 0) {  // > CustomCode.jszip:4327
        strm.output = new utils.Buf8(chunkSize);  // > CustomCode.jszip:4328
        strm.next_out = 0;  // > CustomCode.jszip:4329
        strm.avail_out = chunkSize;  // > CustomCode.jszip:4330
      }  // > CustomCode.jszip:4331
      status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */  // > CustomCode.jszip:4332
      if (status !== Z_STREAM_END && status !== Z_OK) {  // > CustomCode.jszip:4333
        this.onEnd(status);  // > CustomCode.jszip:4334
        this.ended = true;  // > CustomCode.jszip:4335
        return false;  // > CustomCode.jszip:4336
      }  // > CustomCode.jszip:4337
      if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {  // > CustomCode.jszip:4338
        if (this.options.to === 'string') {  // > CustomCode.jszip:4339
          this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));  // > CustomCode.jszip:4340
        } else {  // > CustomCode.jszip:4341
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));  // > CustomCode.jszip:4342
        }  // > CustomCode.jszip:4343
      }  // > CustomCode.jszip:4344
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);  // > CustomCode.jszip:4345
    // Finalize on the last chunk.  // > CustomCode.jszip:4346
    if (_mode === Z_FINISH) {  // > CustomCode.jszip:4347
      status = zlib_deflate.deflateEnd(this.strm);  // > CustomCode.jszip:4348
      this.onEnd(status);  // > CustomCode.jszip:4349
      this.ended = true;  // > CustomCode.jszip:4350
      return status === Z_OK;  // > CustomCode.jszip:4351
    }  // > CustomCode.jszip:4352
    // callback interim results if Z_SYNC_FLUSH.  // > CustomCode.jszip:4353
    if (_mode === Z_SYNC_FLUSH) {  // > CustomCode.jszip:4354
      this.onEnd(Z_OK);  // > CustomCode.jszip:4355
      strm.avail_out = 0;  // > CustomCode.jszip:4356
      return true;  // > CustomCode.jszip:4357
    }  // > CustomCode.jszip:4358
    return true;  // > CustomCode.jszip:4359
  };  // > CustomCode.jszip:4360
  /**  // > CustomCode.jszip:4361
   * Deflate#onData(chunk) -> Void  // > CustomCode.jszip:4362
   * - chunk (Uint8Array|Array|String): ouput data. Type of array depends  // > CustomCode.jszip:4363
   *   on js engine support. When string output requested, each chunk  // > CustomCode.jszip:4364
   *   will be string.  // > CustomCode.jszip:4365
   *  // > CustomCode.jszip:4366
   * By default, stores data blocks in `chunks[]` property and glue  // > CustomCode.jszip:4367
   * those in `onEnd`. Override this handler, if you need another behaviour.  // > CustomCode.jszip:4368
   **/  // > CustomCode.jszip:4369
  Deflate.prototype.onData = function (chunk) {  // > CustomCode.jszip:4370
    this.chunks.push(chunk);  // > CustomCode.jszip:4371
  };  // > CustomCode.jszip:4372
  /**  // > CustomCode.jszip:4373
   * Deflate#onEnd(status) -> Void  // > CustomCode.jszip:4374
   * - status (Number): deflate status. 0 (Z_OK) on success,  // > CustomCode.jszip:4375
   *   other if not.  // > CustomCode.jszip:4376
   *  // > CustomCode.jszip:4377
   * Called once after you tell deflate that the input stream is  // > CustomCode.jszip:4378
   * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)  // > CustomCode.jszip:4379
   * or if an error happened. By default - join collected chunks,  // > CustomCode.jszip:4380
   * free memory and fill `results` / `err` properties.  // > CustomCode.jszip:4381
   **/  // > CustomCode.jszip:4382
  Deflate.prototype.onEnd = function (status) {  // > CustomCode.jszip:4383
    // On success - join  // > CustomCode.jszip:4384
    if (status === Z_OK) {  // > CustomCode.jszip:4385
      if (this.options.to === 'string') {  // > CustomCode.jszip:4386
        this.result = this.chunks.join('');  // > CustomCode.jszip:4387
      } else {  // > CustomCode.jszip:4388
        this.result = utils.flattenChunks(this.chunks);  // > CustomCode.jszip:4389
      }  // > CustomCode.jszip:4390
    }  // > CustomCode.jszip:4391
    this.chunks = [];  // > CustomCode.jszip:4392
    this.err = status;  // > CustomCode.jszip:4393
    this.msg = this.strm.msg;  // > CustomCode.jszip:4394
  };  // > CustomCode.jszip:4395
  /**  // > CustomCode.jszip:4396
   * deflate(data[, options]) -> Uint8Array|Array|String  // > CustomCode.jszip:4397
   * - data (Uint8Array|Array|String): input data to compress.  // > CustomCode.jszip:4398
   * - options (Object): zlib deflate options.  // > CustomCode.jszip:4399
   *  // > CustomCode.jszip:4400
   * Compress `data` with deflate algorithm and `options`.  // > CustomCode.jszip:4401
   *  // > CustomCode.jszip:4402
   * Supported options are:  // > CustomCode.jszip:4403
   *  // > CustomCode.jszip:4404
   * - level  // > CustomCode.jszip:4405
   * - windowBits  // > CustomCode.jszip:4406
   * - memLevel  // > CustomCode.jszip:4407
   * - strategy  // > CustomCode.jszip:4408
   * - dictionary  // > CustomCode.jszip:4409
   *  // > CustomCode.jszip:4410
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)  // > CustomCode.jszip:4411
   * for more information on these.  // > CustomCode.jszip:4412
   *  // > CustomCode.jszip:4413
   * Sugar (options):  // > CustomCode.jszip:4414
   *  // > CustomCode.jszip:4415
   * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify  // > CustomCode.jszip:4416
   *   negative windowBits implicitly.  // > CustomCode.jszip:4417
   * - `to` (String) - if equal to 'string', then result will be "binary string"  // > CustomCode.jszip:4418
   *    (each char code [0..255])  // > CustomCode.jszip:4419
   *  // > CustomCode.jszip:4420
   * ##### Example:  // > CustomCode.jszip:4421
   *  // > CustomCode.jszip:4422
   * ```javascript  // > CustomCode.jszip:4423
   * var pako = require('pako')  // > CustomCode.jszip:4424
   *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);  // > CustomCode.jszip:4425
   *  // > CustomCode.jszip:4426
   * console.log(pako.deflate(data));  // > CustomCode.jszip:4427
   * ```  // > CustomCode.jszip:4428
   **/  // > CustomCode.jszip:4429
  function deflate(input, options) {  // > CustomCode.jszip:4430
    var deflator = new Deflate(options);  // > CustomCode.jszip:4431
    deflator.push(input, true);  // > CustomCode.jszip:4432
    // That will never happens, if you don't cheat with options :)  // > CustomCode.jszip:4433
    if (deflator.err) { throw deflator.msg || msg[deflator.err]; }  // > CustomCode.jszip:4434
    return deflator.result;  // > CustomCode.jszip:4435
  }  // > CustomCode.jszip:4436
  /**  // > CustomCode.jszip:4437
   * deflateRaw(data[, options]) -> Uint8Array|Array|String  // > CustomCode.jszip:4438
   * - data (Uint8Array|Array|String): input data to compress.  // > CustomCode.jszip:4439
   * - options (Object): zlib deflate options.  // > CustomCode.jszip:4440
   *  // > CustomCode.jszip:4441
   * The same as [[deflate]], but creates raw data, without wrapper  // > CustomCode.jszip:4442
   * (header and adler32 crc).  // > CustomCode.jszip:4443
   **/  // > CustomCode.jszip:4444
  function deflateRaw(input, options) {  // > CustomCode.jszip:4445
    options = options || {};  // > CustomCode.jszip:4446
    options.raw = true;  // > CustomCode.jszip:4447
    return deflate(input, options);  // > CustomCode.jszip:4448
  }  // > CustomCode.jszip:4449
  /**  // > CustomCode.jszip:4450
   * gzip(data[, options]) -> Uint8Array|Array|String  // > CustomCode.jszip:4451
   * - data (Uint8Array|Array|String): input data to compress.  // > CustomCode.jszip:4452
   * - options (Object): zlib deflate options.  // > CustomCode.jszip:4453
   *  // > CustomCode.jszip:4454
   * The same as [[deflate]], but create gzip wrapper instead of  // > CustomCode.jszip:4455
   * deflate one.  // > CustomCode.jszip:4456
   **/  // > CustomCode.jszip:4457
  function gzip(input, options) {  // > CustomCode.jszip:4458
    options = options || {};  // > CustomCode.jszip:4459
    options.gzip = true;  // > CustomCode.jszip:4460
    return deflate(input, options);  // > CustomCode.jszip:4461
  }  // > CustomCode.jszip:4462
  exports.Deflate = Deflate;  // > CustomCode.jszip:4463
  exports.deflate = deflate;  // > CustomCode.jszip:4464
  exports.deflateRaw = deflateRaw;  // > CustomCode.jszip:4465
  exports.gzip = gzip;  // > CustomCode.jszip:4466
  },{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(require,module,exports){  // > CustomCode.jszip:4467
  'use strict';  // > CustomCode.jszip:4468
  var zlib_inflate = require('./zlib/inflate');  // > CustomCode.jszip:4469
  var utils        = require('./utils/common');  // > CustomCode.jszip:4470
  var strings      = require('./utils/strings');  // > CustomCode.jszip:4471
  var c            = require('./zlib/constants');  // > CustomCode.jszip:4472
  var msg          = require('./zlib/messages');  // > CustomCode.jszip:4473
  var ZStream      = require('./zlib/zstream');  // > CustomCode.jszip:4474
  var GZheader     = require('./zlib/gzheader');  // > CustomCode.jszip:4475
  var toString = Object.prototype.toString;  // > CustomCode.jszip:4476
  /**  // > CustomCode.jszip:4477
   * class Inflate  // > CustomCode.jszip:4478
   *  // > CustomCode.jszip:4479
   * Generic JS-style wrapper for zlib calls. If you don't need  // > CustomCode.jszip:4480
   * streaming behaviour - use more simple functions: [[inflate]]  // > CustomCode.jszip:4481
   * and [[inflateRaw]].  // > CustomCode.jszip:4482
   **/  // > CustomCode.jszip:4483
  /* internal  // > CustomCode.jszip:4484
   * inflate.chunks -> Array  // > CustomCode.jszip:4485
   *  // > CustomCode.jszip:4486
   * Chunks of output data, if [[Inflate#onData]] not overriden.  // > CustomCode.jszip:4487
   **/  // > CustomCode.jszip:4488
  /**  // > CustomCode.jszip:4489
   * Inflate.result -> Uint8Array|Array|String  // > CustomCode.jszip:4490
   *  // > CustomCode.jszip:4491
   * Uncompressed result, generated by default [[Inflate#onData]]  // > CustomCode.jszip:4492
   * and [[Inflate#onEnd]] handlers. Filled after you push last chunk  // > CustomCode.jszip:4493
   * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you  // > CustomCode.jszip:4494
   * push a chunk with explicit flush (call [[Inflate#push]] with  // > CustomCode.jszip:4495
   * `Z_SYNC_FLUSH` param).  // > CustomCode.jszip:4496
   **/  // > CustomCode.jszip:4497
  /**  // > CustomCode.jszip:4498
   * Inflate.err -> Number  // > CustomCode.jszip:4499
   *  // > CustomCode.jszip:4500
   * Error code after inflate finished. 0 (Z_OK) on success.  // > CustomCode.jszip:4501
   * Should be checked if broken data possible.  // > CustomCode.jszip:4502
   **/  // > CustomCode.jszip:4503
  /**  // > CustomCode.jszip:4504
   * Inflate.msg -> String  // > CustomCode.jszip:4505
   *  // > CustomCode.jszip:4506
   * Error message, if [[Inflate.err]] != 0  // > CustomCode.jszip:4507
   **/  // > CustomCode.jszip:4508
  /**  // > CustomCode.jszip:4509
   * new Inflate(options)  // > CustomCode.jszip:4510
   * - options (Object): zlib inflate options.  // > CustomCode.jszip:4511
   *  // > CustomCode.jszip:4512
   * Creates new inflator instance with specified params. Throws exception  // > CustomCode.jszip:4513
   * on bad params. Supported options:  // > CustomCode.jszip:4514
   *  // > CustomCode.jszip:4515
   * - `windowBits`  // > CustomCode.jszip:4516
   * - `dictionary`  // > CustomCode.jszip:4517
   *  // > CustomCode.jszip:4518
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)  // > CustomCode.jszip:4519
   * for more information on these.  // > CustomCode.jszip:4520
   *  // > CustomCode.jszip:4521
   * Additional options, for internal needs:  // > CustomCode.jszip:4522
   *  // > CustomCode.jszip:4523
   * - `chunkSize` - size of generated data chunks (16K by default)  // > CustomCode.jszip:4524
   * - `raw` (Boolean) - do raw inflate  // > CustomCode.jszip:4525
   * - `to` (String) - if equal to 'string', then result will be converted  // > CustomCode.jszip:4526
   *   from utf8 to utf16 (javascript) string. When string output requested,  // > CustomCode.jszip:4527
   *   chunk length can differ from `chunkSize`, depending on content.  // > CustomCode.jszip:4528
   *  // > CustomCode.jszip:4529
   * By default, when no options set, autodetect deflate/gzip data format via  // > CustomCode.jszip:4530
   * wrapper header.  // > CustomCode.jszip:4531
   *  // > CustomCode.jszip:4532
   * ##### Example:  // > CustomCode.jszip:4533
   *  // > CustomCode.jszip:4534
   * ```javascript  // > CustomCode.jszip:4535
   * var pako = require('pako')  // > CustomCode.jszip:4536
   *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])  // > CustomCode.jszip:4537
   *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);  // > CustomCode.jszip:4538
   *  // > CustomCode.jszip:4539
   * var inflate = new pako.Inflate({ level: 3});  // > CustomCode.jszip:4540
   *  // > CustomCode.jszip:4541
   * inflate.push(chunk1, false);  // > CustomCode.jszip:4542
   * inflate.push(chunk2, true);  // true -> last chunk  // > CustomCode.jszip:4543
   *  // > CustomCode.jszip:4544
   * if (inflate.err) { throw new Error(inflate.err); }  // > CustomCode.jszip:4545
   *  // > CustomCode.jszip:4546
   * console.log(inflate.result);  // > CustomCode.jszip:4547
   * ```  // > CustomCode.jszip:4548
   **/  // > CustomCode.jszip:4549
  function Inflate(options) {  // > CustomCode.jszip:4550
    if (!(this instanceof Inflate)) return new Inflate(options);  // > CustomCode.jszip:4551
    this.options = utils.assign({  // > CustomCode.jszip:4552
      chunkSize: 16384,  // > CustomCode.jszip:4553
      windowBits: 0,  // > CustomCode.jszip:4554
      to: ''  // > CustomCode.jszip:4555
    }, options || {});  // > CustomCode.jszip:4556
    var opt = this.options;  // > CustomCode.jszip:4557
    // Force window size for `raw` data, if not set directly,  // > CustomCode.jszip:4558
    // because we have no header for autodetect.  // > CustomCode.jszip:4559
    if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {  // > CustomCode.jszip:4560
      opt.windowBits = -opt.windowBits;  // > CustomCode.jszip:4561
      if (opt.windowBits === 0) { opt.windowBits = -15; }  // > CustomCode.jszip:4562
    }  // > CustomCode.jszip:4563
    // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate  // > CustomCode.jszip:4564
    if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&  // > CustomCode.jszip:4565
        !(options && options.windowBits)) {  // > CustomCode.jszip:4566
      opt.windowBits += 32;  // > CustomCode.jszip:4567
    }  // > CustomCode.jszip:4568
    // Gzip header has no info about windows size, we can do autodetect only  // > CustomCode.jszip:4569
    // for deflate. So, if window size not set, force it to max when gzip possible  // > CustomCode.jszip:4570
    if ((opt.windowBits > 15) && (opt.windowBits < 48)) {  // > CustomCode.jszip:4571
      // bit 3 (16) -> gzipped data  // > CustomCode.jszip:4572
      // bit 4 (32) -> autodetect gzip/deflate  // > CustomCode.jszip:4573
      if ((opt.windowBits & 15) === 0) {  // > CustomCode.jszip:4574
        opt.windowBits |= 15;  // > CustomCode.jszip:4575
      }  // > CustomCode.jszip:4576
    }  // > CustomCode.jszip:4577
    this.err    = 0;      // error code, if happens (0 = Z_OK)  // > CustomCode.jszip:4578
    this.msg    = '';     // error message  // > CustomCode.jszip:4579
    this.ended  = false;  // used to avoid multiple onEnd() calls  // > CustomCode.jszip:4580
    this.chunks = [];     // chunks of compressed data  // > CustomCode.jszip:4581
    this.strm   = new ZStream();  // > CustomCode.jszip:4582
    this.strm.avail_out = 0;  // > CustomCode.jszip:4583
    var status  = zlib_inflate.inflateInit2(  // > CustomCode.jszip:4584
      this.strm,  // > CustomCode.jszip:4585
      opt.windowBits  // > CustomCode.jszip:4586
    );  // > CustomCode.jszip:4587
    if (status !== c.Z_OK) {  // > CustomCode.jszip:4588
      throw new Error(msg[status]);  // > CustomCode.jszip:4589
    }  // > CustomCode.jszip:4590
    this.header = new GZheader();  // > CustomCode.jszip:4591
    zlib_inflate.inflateGetHeader(this.strm, this.header);  // > CustomCode.jszip:4592
  }  // > CustomCode.jszip:4593
  /**  // > CustomCode.jszip:4594
   * Inflate#push(data[, mode]) -> Boolean  // > CustomCode.jszip:4595
   * - data (Uint8Array|Array|ArrayBuffer|String): input data  // > CustomCode.jszip:4596
   * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.  // > CustomCode.jszip:4597
   *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.  // > CustomCode.jszip:4598
   *  // > CustomCode.jszip:4599
   * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with  // > CustomCode.jszip:4600
   * new output chunks. Returns `true` on success. The last data block must have  // > CustomCode.jszip:4601
   * mode Z_FINISH (or `true`). That will flush internal pending buffers and call  // > CustomCode.jszip:4602
   * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you  // > CustomCode.jszip:4603
   * can use mode Z_SYNC_FLUSH, keeping the decompression context.  // > CustomCode.jszip:4604
   *  // > CustomCode.jszip:4605
   * On fail call [[Inflate#onEnd]] with error code and return false.  // > CustomCode.jszip:4606
   *  // > CustomCode.jszip:4607
   * We strongly recommend to use `Uint8Array` on input for best speed (output  // > CustomCode.jszip:4608
   * format is detected automatically). Also, don't skip last param and always  // > CustomCode.jszip:4609
   * use the same type in your code (boolean or number). That will improve JS speed.  // > CustomCode.jszip:4610
   *  // > CustomCode.jszip:4611
   * For regular `Array`-s make sure all elements are [0..255].  // > CustomCode.jszip:4612
   *  // > CustomCode.jszip:4613
   * ##### Example  // > CustomCode.jszip:4614
   *  // > CustomCode.jszip:4615
   * ```javascript  // > CustomCode.jszip:4616
   * push(chunk, false); // push one of data chunks  // > CustomCode.jszip:4617
   * ...  // > CustomCode.jszip:4618
   * push(chunk, true);  // push last chunk  // > CustomCode.jszip:4619
   * ```  // > CustomCode.jszip:4620
   **/  // > CustomCode.jszip:4621
  Inflate.prototype.push = function (data, mode) {  // > CustomCode.jszip:4622
    var strm = this.strm;  // > CustomCode.jszip:4623
    var chunkSize = this.options.chunkSize;  // > CustomCode.jszip:4624
    var dictionary = this.options.dictionary;  // > CustomCode.jszip:4625
    var status, _mode;  // > CustomCode.jszip:4626
    var next_out_utf8, tail, utf8str;  // > CustomCode.jszip:4627
    var dict;  // > CustomCode.jszip:4628
    // Flag to properly process Z_BUF_ERROR on testing inflate call  // > CustomCode.jszip:4629
    // when we check that all output data was flushed.  // > CustomCode.jszip:4630
    var allowBufError = false;  // > CustomCode.jszip:4631
    if (this.ended) { return false; }  // > CustomCode.jszip:4632
    _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);  // > CustomCode.jszip:4633
    // Convert data if needed  // > CustomCode.jszip:4634
    if (typeof data === 'string') {  // > CustomCode.jszip:4635
      // Only binary strings can be decompressed on practice  // > CustomCode.jszip:4636
      strm.input = strings.binstring2buf(data);  // > CustomCode.jszip:4637
    } else if (toString.call(data) === '[object ArrayBuffer]') {  // > CustomCode.jszip:4638
      strm.input = new Uint8Array(data);  // > CustomCode.jszip:4639
    } else {  // > CustomCode.jszip:4640
      strm.input = data;  // > CustomCode.jszip:4641
    }  // > CustomCode.jszip:4642
    strm.next_in = 0;  // > CustomCode.jszip:4643
    strm.avail_in = strm.input.length;  // > CustomCode.jszip:4644
    do {  // > CustomCode.jszip:4645
      if (strm.avail_out === 0) {  // > CustomCode.jszip:4646
        strm.output = new utils.Buf8(chunkSize);  // > CustomCode.jszip:4647
        strm.next_out = 0;  // > CustomCode.jszip:4648
        strm.avail_out = chunkSize;  // > CustomCode.jszip:4649
      }  // > CustomCode.jszip:4650
      status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */  // > CustomCode.jszip:4651
      if (status === c.Z_NEED_DICT && dictionary) {  // > CustomCode.jszip:4652
        // Convert data if needed  // > CustomCode.jszip:4653
        if (typeof dictionary === 'string') {  // > CustomCode.jszip:4654
          dict = strings.string2buf(dictionary);  // > CustomCode.jszip:4655
        } else if (toString.call(dictionary) === '[object ArrayBuffer]') {  // > CustomCode.jszip:4656
          dict = new Uint8Array(dictionary);  // > CustomCode.jszip:4657
        } else {  // > CustomCode.jszip:4658
          dict = dictionary;  // > CustomCode.jszip:4659
        }  // > CustomCode.jszip:4660
        status = zlib_inflate.inflateSetDictionary(this.strm, dict);  // > CustomCode.jszip:4661
      }  // > CustomCode.jszip:4662
      if (status === c.Z_BUF_ERROR && allowBufError === true) {  // > CustomCode.jszip:4663
        status = c.Z_OK;  // > CustomCode.jszip:4664
        allowBufError = false;  // > CustomCode.jszip:4665
      }  // > CustomCode.jszip:4666
      if (status !== c.Z_STREAM_END && status !== c.Z_OK) {  // > CustomCode.jszip:4667
        this.onEnd(status);  // > CustomCode.jszip:4668
        this.ended = true;  // > CustomCode.jszip:4669
        return false;  // > CustomCode.jszip:4670
      }  // > CustomCode.jszip:4671
      if (strm.next_out) {  // > CustomCode.jszip:4672
        if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {  // > CustomCode.jszip:4673
          if (this.options.to === 'string') {  // > CustomCode.jszip:4674
            next_out_utf8 = strings.utf8border(strm.output, strm.next_out);  // > CustomCode.jszip:4675
            tail = strm.next_out - next_out_utf8;  // > CustomCode.jszip:4676
            utf8str = strings.buf2string(strm.output, next_out_utf8);  // > CustomCode.jszip:4677
            // move tail  // > CustomCode.jszip:4678
            strm.next_out = tail;  // > CustomCode.jszip:4679
            strm.avail_out = chunkSize - tail;  // > CustomCode.jszip:4680
            if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }  // > CustomCode.jszip:4681
            this.onData(utf8str);  // > CustomCode.jszip:4682
          } else {  // > CustomCode.jszip:4683
            this.onData(utils.shrinkBuf(strm.output, strm.next_out));  // > CustomCode.jszip:4684
          }  // > CustomCode.jszip:4685
        }  // > CustomCode.jszip:4686
      }  // > CustomCode.jszip:4687
      // When no more input data, we should check that internal inflate buffers  // > CustomCode.jszip:4688
      // are flushed. The only way to do it when avail_out = 0 - run one more  // > CustomCode.jszip:4689
      // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.  // > CustomCode.jszip:4690
      // Here we set flag to process this error properly.  // > CustomCode.jszip:4691
      //  // > CustomCode.jszip:4692
      // NOTE. Deflate does not return error in this case and does not needs such  // > CustomCode.jszip:4693
      // logic.  // > CustomCode.jszip:4694
      if (strm.avail_in === 0 && strm.avail_out === 0) {  // > CustomCode.jszip:4695
        allowBufError = true;  // > CustomCode.jszip:4696
      }  // > CustomCode.jszip:4697
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);  // > CustomCode.jszip:4698
    if (status === c.Z_STREAM_END) {  // > CustomCode.jszip:4699
      _mode = c.Z_FINISH;  // > CustomCode.jszip:4700
    }  // > CustomCode.jszip:4701
    // Finalize on the last chunk.  // > CustomCode.jszip:4702
    if (_mode === c.Z_FINISH) {  // > CustomCode.jszip:4703
      status = zlib_inflate.inflateEnd(this.strm);  // > CustomCode.jszip:4704
      this.onEnd(status);  // > CustomCode.jszip:4705
      this.ended = true;  // > CustomCode.jszip:4706
      return status === c.Z_OK;  // > CustomCode.jszip:4707
    }  // > CustomCode.jszip:4708
    // callback interim results if Z_SYNC_FLUSH.  // > CustomCode.jszip:4709
    if (_mode === c.Z_SYNC_FLUSH) {  // > CustomCode.jszip:4710
      this.onEnd(c.Z_OK);  // > CustomCode.jszip:4711
      strm.avail_out = 0;  // > CustomCode.jszip:4712
      return true;  // > CustomCode.jszip:4713
    }  // > CustomCode.jszip:4714
    return true;  // > CustomCode.jszip:4715
  };  // > CustomCode.jszip:4716
  /**  // > CustomCode.jszip:4717
   * Inflate#onData(chunk) -> Void  // > CustomCode.jszip:4718
   * - chunk (Uint8Array|Array|String): ouput data. Type of array depends  // > CustomCode.jszip:4719
   *   on js engine support. When string output requested, each chunk  // > CustomCode.jszip:4720
   *   will be string.  // > CustomCode.jszip:4721
   *  // > CustomCode.jszip:4722
   * By default, stores data blocks in `chunks[]` property and glue  // > CustomCode.jszip:4723
   * those in `onEnd`. Override this handler, if you need another behaviour.  // > CustomCode.jszip:4724
   **/  // > CustomCode.jszip:4725
  Inflate.prototype.onData = function (chunk) {  // > CustomCode.jszip:4726
    this.chunks.push(chunk);  // > CustomCode.jszip:4727
  };  // > CustomCode.jszip:4728
  /**  // > CustomCode.jszip:4729
   * Inflate#onEnd(status) -> Void  // > CustomCode.jszip:4730
   * - status (Number): inflate status. 0 (Z_OK) on success,  // > CustomCode.jszip:4731
   *   other if not.  // > CustomCode.jszip:4732
   *  // > CustomCode.jszip:4733
   * Called either after you tell inflate that the input stream is  // > CustomCode.jszip:4734
   * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)  // > CustomCode.jszip:4735
   * or if an error happened. By default - join collected chunks,  // > CustomCode.jszip:4736
   * free memory and fill `results` / `err` properties.  // > CustomCode.jszip:4737
   **/  // > CustomCode.jszip:4738
  Inflate.prototype.onEnd = function (status) {  // > CustomCode.jszip:4739
    // On success - join  // > CustomCode.jszip:4740
    if (status === c.Z_OK) {  // > CustomCode.jszip:4741
      if (this.options.to === 'string') {  // > CustomCode.jszip:4742
        // Glue & convert here, until we teach pako to send  // > CustomCode.jszip:4743
        // utf8 alligned strings to onData  // > CustomCode.jszip:4744
        this.result = this.chunks.join('');  // > CustomCode.jszip:4745
      } else {  // > CustomCode.jszip:4746
        this.result = utils.flattenChunks(this.chunks);  // > CustomCode.jszip:4747
      }  // > CustomCode.jszip:4748
    }  // > CustomCode.jszip:4749
    this.chunks = [];  // > CustomCode.jszip:4750
    this.err = status;  // > CustomCode.jszip:4751
    this.msg = this.strm.msg;  // > CustomCode.jszip:4752
  };  // > CustomCode.jszip:4753
  /**  // > CustomCode.jszip:4754
   * inflate(data[, options]) -> Uint8Array|Array|String  // > CustomCode.jszip:4755
   * - data (Uint8Array|Array|String): input data to decompress.  // > CustomCode.jszip:4756
   * - options (Object): zlib inflate options.  // > CustomCode.jszip:4757
   *  // > CustomCode.jszip:4758
   * Decompress `data` with inflate/ungzip and `options`. Autodetect  // > CustomCode.jszip:4759
   * format via wrapper header by default. That's why we don't provide  // > CustomCode.jszip:4760
   * separate `ungzip` method.  // > CustomCode.jszip:4761
   *  // > CustomCode.jszip:4762
   * Supported options are:  // > CustomCode.jszip:4763
   *  // > CustomCode.jszip:4764
   * - windowBits  // > CustomCode.jszip:4765
   *  // > CustomCode.jszip:4766
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)  // > CustomCode.jszip:4767
   * for more information.  // > CustomCode.jszip:4768
   *  // > CustomCode.jszip:4769
   * Sugar (options):  // > CustomCode.jszip:4770
   *  // > CustomCode.jszip:4771
   * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify  // > CustomCode.jszip:4772
   *   negative windowBits implicitly.  // > CustomCode.jszip:4773
   * - `to` (String) - if equal to 'string', then result will be converted  // > CustomCode.jszip:4774
   *   from utf8 to utf16 (javascript) string. When string output requested,  // > CustomCode.jszip:4775
   *   chunk length can differ from `chunkSize`, depending on content.  // > CustomCode.jszip:4776
   *  // > CustomCode.jszip:4777
   *  // > CustomCode.jszip:4778
   * ##### Example:  // > CustomCode.jszip:4779
   *  // > CustomCode.jszip:4780
   * ```javascript  // > CustomCode.jszip:4781
   * var pako = require('pako')  // > CustomCode.jszip:4782
   *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])  // > CustomCode.jszip:4783
   *   , output;  // > CustomCode.jszip:4784
   *  // > CustomCode.jszip:4785
   * try {  // > CustomCode.jszip:4786
   *   output = pako.inflate(input);  // > CustomCode.jszip:4787
   * } catch (err)  // > CustomCode.jszip:4788
   *   console.log(err);  // > CustomCode.jszip:4789
   * }  // > CustomCode.jszip:4790
   * ```  // > CustomCode.jszip:4791
   **/  // > CustomCode.jszip:4792
  function inflate(input, options) {  // > CustomCode.jszip:4793
    var inflator = new Inflate(options);  // > CustomCode.jszip:4794
    inflator.push(input, true);  // > CustomCode.jszip:4795
    // That will never happens, if you don't cheat with options :)  // > CustomCode.jszip:4796
    if (inflator.err) { throw inflator.msg || msg[inflator.err]; }  // > CustomCode.jszip:4797
    return inflator.result;  // > CustomCode.jszip:4798
  }  // > CustomCode.jszip:4799
  /**  // > CustomCode.jszip:4800
   * inflateRaw(data[, options]) -> Uint8Array|Array|String  // > CustomCode.jszip:4801
   * - data (Uint8Array|Array|String): input data to decompress.  // > CustomCode.jszip:4802
   * - options (Object): zlib inflate options.  // > CustomCode.jszip:4803
   *  // > CustomCode.jszip:4804
   * The same as [[inflate]], but creates raw data, without wrapper  // > CustomCode.jszip:4805
   * (header and adler32 crc).  // > CustomCode.jszip:4806
   **/  // > CustomCode.jszip:4807
  function inflateRaw(input, options) {  // > CustomCode.jszip:4808
    options = options || {};  // > CustomCode.jszip:4809
    options.raw = true;  // > CustomCode.jszip:4810
    return inflate(input, options);  // > CustomCode.jszip:4811
  }  // > CustomCode.jszip:4812
  /**  // > CustomCode.jszip:4813
   * ungzip(data[, options]) -> Uint8Array|Array|String  // > CustomCode.jszip:4814
   * - data (Uint8Array|Array|String): input data to decompress.  // > CustomCode.jszip:4815
   * - options (Object): zlib inflate options.  // > CustomCode.jszip:4816
   *  // > CustomCode.jszip:4817
   * Just shortcut to [[inflate]], because it autodetects format  // > CustomCode.jszip:4818
   * by header.content. Done for convenience.  // > CustomCode.jszip:4819
   **/  // > CustomCode.jszip:4820
  exports.Inflate = Inflate;  // > CustomCode.jszip:4821
  exports.inflate = inflate;  // > CustomCode.jszip:4822
  exports.inflateRaw = inflateRaw;  // > CustomCode.jszip:4823
  exports.ungzip  = inflate;  // > CustomCode.jszip:4824
  },{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(require,module,exports){  // > CustomCode.jszip:4825
  'use strict';  // > CustomCode.jszip:4826
  var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&  // > CustomCode.jszip:4827
                  (typeof Uint16Array !== 'undefined') &&  // > CustomCode.jszip:4828
                  (typeof Int32Array !== 'undefined');  // > CustomCode.jszip:4829
  exports.assign = function (obj /*from1, from2, from3, ...*/) {  // > CustomCode.jszip:4830
    var sources = Array.prototype.slice.call(arguments, 1);  // > CustomCode.jszip:4831
    while (sources.length) {  // > CustomCode.jszip:4832
      var source = sources.shift();  // > CustomCode.jszip:4833
      if (!source) { continue; }  // > CustomCode.jszip:4834
      if (typeof source !== 'object') {  // > CustomCode.jszip:4835
        throw new TypeError(source + 'must be non-object');  // > CustomCode.jszip:4836
      }  // > CustomCode.jszip:4837
      for (var p in source) {  // > CustomCode.jszip:4838
        if (source.hasOwnProperty(p)) {  // > CustomCode.jszip:4839
          obj[p] = source[p];  // > CustomCode.jszip:4840
        }  // > CustomCode.jszip:4841
      }  // > CustomCode.jszip:4842
    }  // > CustomCode.jszip:4843
    return obj;  // > CustomCode.jszip:4844
  };  // > CustomCode.jszip:4845
  // reduce buffer size, avoiding mem copy  // > CustomCode.jszip:4846
  exports.shrinkBuf = function (buf, size) {  // > CustomCode.jszip:4847
    if (buf.length === size) { return buf; }  // > CustomCode.jszip:4848
    if (buf.subarray) { return buf.subarray(0, size); }  // > CustomCode.jszip:4849
    buf.length = size;  // > CustomCode.jszip:4850
    return buf;  // > CustomCode.jszip:4851
  };  // > CustomCode.jszip:4852
  var fnTyped = {  // > CustomCode.jszip:4853
    arraySet: function (dest, src, src_offs, len, dest_offs) {  // > CustomCode.jszip:4854
      if (src.subarray && dest.subarray) {  // > CustomCode.jszip:4855
        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);  // > CustomCode.jszip:4856
        return;  // > CustomCode.jszip:4857
      }  // > CustomCode.jszip:4858
      // Fallback to ordinary array  // > CustomCode.jszip:4859
      for (var i = 0; i < len; i++) {  // > CustomCode.jszip:4860
        dest[dest_offs + i] = src[src_offs + i];  // > CustomCode.jszip:4861
      }  // > CustomCode.jszip:4862
    },  // > CustomCode.jszip:4863
    // Join array of chunks to single array.  // > CustomCode.jszip:4864
    flattenChunks: function (chunks) {  // > CustomCode.jszip:4865
      var i, l, len, pos, chunk, result;  // > CustomCode.jszip:4866
      // calculate data length  // > CustomCode.jszip:4867
      len = 0;  // > CustomCode.jszip:4868
      for (i = 0, l = chunks.length; i < l; i++) {  // > CustomCode.jszip:4869
        len += chunks[i].length;  // > CustomCode.jszip:4870
      }  // > CustomCode.jszip:4871
      // join chunks  // > CustomCode.jszip:4872
      result = new Uint8Array(len);  // > CustomCode.jszip:4873
      pos = 0;  // > CustomCode.jszip:4874
      for (i = 0, l = chunks.length; i < l; i++) {  // > CustomCode.jszip:4875
        chunk = chunks[i];  // > CustomCode.jszip:4876
        result.set(chunk, pos);  // > CustomCode.jszip:4877
        pos += chunk.length;  // > CustomCode.jszip:4878
      }  // > CustomCode.jszip:4879
      return result;  // > CustomCode.jszip:4880
    }  // > CustomCode.jszip:4881
  };  // > CustomCode.jszip:4882
  var fnUntyped = {  // > CustomCode.jszip:4883
    arraySet: function (dest, src, src_offs, len, dest_offs) {  // > CustomCode.jszip:4884
      for (var i = 0; i < len; i++) {  // > CustomCode.jszip:4885
        dest[dest_offs + i] = src[src_offs + i];  // > CustomCode.jszip:4886
      }  // > CustomCode.jszip:4887
    },  // > CustomCode.jszip:4888
    // Join array of chunks to single array.  // > CustomCode.jszip:4889
    flattenChunks: function (chunks) {  // > CustomCode.jszip:4890
      return [].concat.apply([], chunks);  // > CustomCode.jszip:4891
    }  // > CustomCode.jszip:4892
  };  // > CustomCode.jszip:4893
  // Enable/Disable typed arrays use, for testing  // > CustomCode.jszip:4894
  //  // > CustomCode.jszip:4895
  exports.setTyped = function (on) {  // > CustomCode.jszip:4896
    if (on) {  // > CustomCode.jszip:4897
      exports.Buf8  = Uint8Array;  // > CustomCode.jszip:4898
      exports.Buf16 = Uint16Array;  // > CustomCode.jszip:4899
      exports.Buf32 = Int32Array;  // > CustomCode.jszip:4900
      exports.assign(exports, fnTyped);  // > CustomCode.jszip:4901
    } else {  // > CustomCode.jszip:4902
      exports.Buf8  = Array;  // > CustomCode.jszip:4903
      exports.Buf16 = Array;  // > CustomCode.jszip:4904
      exports.Buf32 = Array;  // > CustomCode.jszip:4905
      exports.assign(exports, fnUntyped);  // > CustomCode.jszip:4906
    }  // > CustomCode.jszip:4907
  };  // > CustomCode.jszip:4908
  exports.setTyped(TYPED_OK);  // > CustomCode.jszip:4909
  },{}],42:[function(require,module,exports){  // > CustomCode.jszip:4910
  // String encode/decode helpers  // > CustomCode.jszip:4911
  'use strict';  // > CustomCode.jszip:4912
  var utils = require('./common');  // > CustomCode.jszip:4913
  // Quick check if we can use fast array to bin string conversion  // > CustomCode.jszip:4914
  //  // > CustomCode.jszip:4915
  // - apply(Array) can fail on Android 2.2  // > CustomCode.jszip:4916
  // - apply(Uint8Array) can fail on iOS 5.1 Safary  // > CustomCode.jszip:4917
  //  // > CustomCode.jszip:4918
  var STR_APPLY_OK = true;  // > CustomCode.jszip:4919
  var STR_APPLY_UIA_OK = true;  // > CustomCode.jszip:4920
  try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }  // > CustomCode.jszip:4921
  try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }  // > CustomCode.jszip:4922
  // Table with utf8 lengths (calculated by first byte of sequence)  // > CustomCode.jszip:4923
  // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,  // > CustomCode.jszip:4924
  // because max possible codepoint is 0x10ffff  // > CustomCode.jszip:4925
  var _utf8len = new utils.Buf8(256);  // > CustomCode.jszip:4926
  for (var q = 0; q < 256; q++) {  // > CustomCode.jszip:4927
    _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);  // > CustomCode.jszip:4928
  }  // > CustomCode.jszip:4929
  _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start  // > CustomCode.jszip:4930
  // convert string to array (typed, when possible)  // > CustomCode.jszip:4931
  exports.string2buf = function (str) {  // > CustomCode.jszip:4932
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;  // > CustomCode.jszip:4933
    // count binary size  // > CustomCode.jszip:4934
    for (m_pos = 0; m_pos < str_len; m_pos++) {  // > CustomCode.jszip:4935
      c = str.charCodeAt(m_pos);  // > CustomCode.jszip:4936
      if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {  // > CustomCode.jszip:4937
        c2 = str.charCodeAt(m_pos + 1);  // > CustomCode.jszip:4938
        if ((c2 & 0xfc00) === 0xdc00) {  // > CustomCode.jszip:4939
          c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);  // > CustomCode.jszip:4940
          m_pos++;  // > CustomCode.jszip:4941
        }  // > CustomCode.jszip:4942
      }  // > CustomCode.jszip:4943
      buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;  // > CustomCode.jszip:4944
    }  // > CustomCode.jszip:4945
    // allocate buffer  // > CustomCode.jszip:4946
    buf = new utils.Buf8(buf_len);  // > CustomCode.jszip:4947
    // convert  // > CustomCode.jszip:4948
    for (i = 0, m_pos = 0; i < buf_len; m_pos++) {  // > CustomCode.jszip:4949
      c = str.charCodeAt(m_pos);  // > CustomCode.jszip:4950
      if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {  // > CustomCode.jszip:4951
        c2 = str.charCodeAt(m_pos + 1);  // > CustomCode.jszip:4952
        if ((c2 & 0xfc00) === 0xdc00) {  // > CustomCode.jszip:4953
          c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);  // > CustomCode.jszip:4954
          m_pos++;  // > CustomCode.jszip:4955
        }  // > CustomCode.jszip:4956
      }  // > CustomCode.jszip:4957
      if (c < 0x80) {  // > CustomCode.jszip:4958
        /* one byte */  // > CustomCode.jszip:4959
        buf[i++] = c;  // > CustomCode.jszip:4960
      } else if (c < 0x800) {  // > CustomCode.jszip:4961
        /* two bytes */  // > CustomCode.jszip:4962
        buf[i++] = 0xC0 | (c >>> 6);  // > CustomCode.jszip:4963
        buf[i++] = 0x80 | (c & 0x3f);  // > CustomCode.jszip:4964
      } else if (c < 0x10000) {  // > CustomCode.jszip:4965
        /* three bytes */  // > CustomCode.jszip:4966
        buf[i++] = 0xE0 | (c >>> 12);  // > CustomCode.jszip:4967
        buf[i++] = 0x80 | (c >>> 6 & 0x3f);  // > CustomCode.jszip:4968
        buf[i++] = 0x80 | (c & 0x3f);  // > CustomCode.jszip:4969
      } else {  // > CustomCode.jszip:4970
        /* four bytes */  // > CustomCode.jszip:4971
        buf[i++] = 0xf0 | (c >>> 18);  // > CustomCode.jszip:4972
        buf[i++] = 0x80 | (c >>> 12 & 0x3f);  // > CustomCode.jszip:4973
        buf[i++] = 0x80 | (c >>> 6 & 0x3f);  // > CustomCode.jszip:4974
        buf[i++] = 0x80 | (c & 0x3f);  // > CustomCode.jszip:4975
      }  // > CustomCode.jszip:4976
    }  // > CustomCode.jszip:4977
    return buf;  // > CustomCode.jszip:4978
  };  // > CustomCode.jszip:4979
  // Helper (used in 2 places)  // > CustomCode.jszip:4980
  function buf2binstring(buf, len) {  // > CustomCode.jszip:4981
    // use fallback for big arrays to avoid stack overflow  // > CustomCode.jszip:4982
    if (len < 65537) {  // > CustomCode.jszip:4983
      if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {  // > CustomCode.jszip:4984
        return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));  // > CustomCode.jszip:4985
      }  // > CustomCode.jszip:4986
    }  // > CustomCode.jszip:4987
    var result = '';  // > CustomCode.jszip:4988
    for (var i = 0; i < len; i++) {  // > CustomCode.jszip:4989
      result += String.fromCharCode(buf[i]);  // > CustomCode.jszip:4990
    }  // > CustomCode.jszip:4991
    return result;  // > CustomCode.jszip:4992
  }  // > CustomCode.jszip:4993
  // Convert byte array to binary string  // > CustomCode.jszip:4994
  exports.buf2binstring = function (buf) {  // > CustomCode.jszip:4995
    return buf2binstring(buf, buf.length);  // > CustomCode.jszip:4996
  };  // > CustomCode.jszip:4997
  // Convert binary string (typed, when possible)  // > CustomCode.jszip:4998
  exports.binstring2buf = function (str) {  // > CustomCode.jszip:4999
    var buf = new utils.Buf8(str.length);  // > CustomCode.jszip:5000
    for (var i = 0, len = buf.length; i < len; i++) {  // > CustomCode.jszip:5001
      buf[i] = str.charCodeAt(i);  // > CustomCode.jszip:5002
    }  // > CustomCode.jszip:5003
    return buf;  // > CustomCode.jszip:5004
  };  // > CustomCode.jszip:5005
  // convert array to string  // > CustomCode.jszip:5006
  exports.buf2string = function (buf, max) {  // > CustomCode.jszip:5007
    var i, out, c, c_len;  // > CustomCode.jszip:5008
    var len = max || buf.length;  // > CustomCode.jszip:5009
    // Reserve max possible length (2 words per char)  // > CustomCode.jszip:5010
    // NB: by unknown reasons, Array is significantly faster for  // > CustomCode.jszip:5011
    //     String.fromCharCode.apply than Uint16Array.  // > CustomCode.jszip:5012
    var utf16buf = new Array(len * 2);  // > CustomCode.jszip:5013
    for (out = 0, i = 0; i < len;) {  // > CustomCode.jszip:5014
      c = buf[i++];  // > CustomCode.jszip:5015
      // quick process ascii  // > CustomCode.jszip:5016
      if (c < 0x80) { utf16buf[out++] = c; continue; }  // > CustomCode.jszip:5017
      c_len = _utf8len[c];  // > CustomCode.jszip:5018
      // skip 5 & 6 byte codes  // > CustomCode.jszip:5019
      if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }  // > CustomCode.jszip:5020
      // apply mask on first byte  // > CustomCode.jszip:5021
      c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;  // > CustomCode.jszip:5022
      // join the rest  // > CustomCode.jszip:5023
      while (c_len > 1 && i < len) {  // > CustomCode.jszip:5024
        c = (c << 6) | (buf[i++] & 0x3f);  // > CustomCode.jszip:5025
        c_len--;  // > CustomCode.jszip:5026
      }  // > CustomCode.jszip:5027
      // terminated by end of string?  // > CustomCode.jszip:5028
      if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }  // > CustomCode.jszip:5029
      if (c < 0x10000) {  // > CustomCode.jszip:5030
        utf16buf[out++] = c;  // > CustomCode.jszip:5031
      } else {  // > CustomCode.jszip:5032
        c -= 0x10000;  // > CustomCode.jszip:5033
        utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);  // > CustomCode.jszip:5034
        utf16buf[out++] = 0xdc00 | (c & 0x3ff);  // > CustomCode.jszip:5035
      }  // > CustomCode.jszip:5036
    }  // > CustomCode.jszip:5037
    return buf2binstring(utf16buf, out);  // > CustomCode.jszip:5038
  };  // > CustomCode.jszip:5039
  // Calculate max possible position in utf8 buffer,  // > CustomCode.jszip:5040
  // that will not break sequence. If that's not possible  // > CustomCode.jszip:5041
  // - (very small limits) return max size as is.  // > CustomCode.jszip:5042
  //  // > CustomCode.jszip:5043
  // buf[] - utf8 bytes array  // > CustomCode.jszip:5044
  // max   - length limit (mandatory);  // > CustomCode.jszip:5045
  exports.utf8border = function (buf, max) {  // > CustomCode.jszip:5046
    var pos;  // > CustomCode.jszip:5047
    max = max || buf.length;  // > CustomCode.jszip:5048
    if (max > buf.length) { max = buf.length; }  // > CustomCode.jszip:5049
    // go back from last position, until start of sequence found  // > CustomCode.jszip:5050
    pos = max - 1;  // > CustomCode.jszip:5051
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }  // > CustomCode.jszip:5052
    // Fuckup - very small and broken sequence,  // > CustomCode.jszip:5053
    // return max, because we should return something anyway.  // > CustomCode.jszip:5054
    if (pos < 0) { return max; }  // > CustomCode.jszip:5055
    // If we came to start of buffer - that means vuffer is too small,  // > CustomCode.jszip:5056
    // return max too.  // > CustomCode.jszip:5057
    if (pos === 0) { return max; }  // > CustomCode.jszip:5058
    return (pos + _utf8len[buf[pos]] > max) ? pos : max;  // > CustomCode.jszip:5059
  };  // > CustomCode.jszip:5060
  },{"./common":41}],43:[function(require,module,exports){  // > CustomCode.jszip:5061
  'use strict';  // > CustomCode.jszip:5062
  // Note: adler32 takes 12% for level 0 and 2% for level 6.  // > CustomCode.jszip:5063
  // It doesn't worth to make additional optimizationa as in original.  // > CustomCode.jszip:5064
  // Small size is preferable.  // > CustomCode.jszip:5065
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:5066
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:5067
  //  // > CustomCode.jszip:5068
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:5069
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:5070
  // arising from the use of this software.  // > CustomCode.jszip:5071
  //  // > CustomCode.jszip:5072
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:5073
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:5074
  // freely, subject to the following restrictions:  // > CustomCode.jszip:5075
  //  // > CustomCode.jszip:5076
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:5077
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:5078
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:5079
  //   appreciated but is not required.  // > CustomCode.jszip:5080
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:5081
  //   misrepresented as being the original software.  // > CustomCode.jszip:5082
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:5083
  function adler32(adler, buf, len, pos) {  // > CustomCode.jszip:5084
    var s1 = (adler & 0xffff) |0,  // > CustomCode.jszip:5085
        s2 = ((adler >>> 16) & 0xffff) |0,  // > CustomCode.jszip:5086
        n = 0;  // > CustomCode.jszip:5087
    while (len !== 0) {  // > CustomCode.jszip:5088
      // Set limit ~ twice less than 5552, to keep  // > CustomCode.jszip:5089
      // s2 in 31-bits, because we force signed ints.  // > CustomCode.jszip:5090
      // in other case %= will fail.  // > CustomCode.jszip:5091
      n = len > 2000 ? 2000 : len;  // > CustomCode.jszip:5092
      len -= n;  // > CustomCode.jszip:5093
      do {  // > CustomCode.jszip:5094
        s1 = (s1 + buf[pos++]) |0;  // > CustomCode.jszip:5095
        s2 = (s2 + s1) |0;  // > CustomCode.jszip:5096
      } while (--n);  // > CustomCode.jszip:5097
      s1 %= 65521;  // > CustomCode.jszip:5098
      s2 %= 65521;  // > CustomCode.jszip:5099
    }  // > CustomCode.jszip:5100
    return (s1 | (s2 << 16)) |0;  // > CustomCode.jszip:5101
  }  // > CustomCode.jszip:5102
  module.exports = adler32;  // > CustomCode.jszip:5103
  },{}],44:[function(require,module,exports){  // > CustomCode.jszip:5104
  'use strict';  // > CustomCode.jszip:5105
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:5106
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:5107
  //  // > CustomCode.jszip:5108
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:5109
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:5110
  // arising from the use of this software.  // > CustomCode.jszip:5111
  //  // > CustomCode.jszip:5112
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:5113
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:5114
  // freely, subject to the following restrictions:  // > CustomCode.jszip:5115
  //  // > CustomCode.jszip:5116
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:5117
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:5118
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:5119
  //   appreciated but is not required.  // > CustomCode.jszip:5120
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:5121
  //   misrepresented as being the original software.  // > CustomCode.jszip:5122
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:5123
  module.exports = {  // > CustomCode.jszip:5124
    /* Allowed flush values; see deflate() and inflate() below for details */  // > CustomCode.jszip:5125
    Z_NO_FLUSH:         0,  // > CustomCode.jszip:5126
    Z_PARTIAL_FLUSH:    1,  // > CustomCode.jszip:5127
    Z_SYNC_FLUSH:       2,  // > CustomCode.jszip:5128
    Z_FULL_FLUSH:       3,  // > CustomCode.jszip:5129
    Z_FINISH:           4,  // > CustomCode.jszip:5130
    Z_BLOCK:            5,  // > CustomCode.jszip:5131
    Z_TREES:            6,  // > CustomCode.jszip:5132
    /* Return codes for the compression/decompression functions. Negative values  // > CustomCode.jszip:5133
    * are errors, positive values are used for special but normal events.  // > CustomCode.jszip:5134
    */  // > CustomCode.jszip:5135
    Z_OK:               0,  // > CustomCode.jszip:5136
    Z_STREAM_END:       1,  // > CustomCode.jszip:5137
    Z_NEED_DICT:        2,  // > CustomCode.jszip:5138
    Z_ERRNO:           -1,  // > CustomCode.jszip:5139
    Z_STREAM_ERROR:    -2,  // > CustomCode.jszip:5140
    Z_DATA_ERROR:      -3,  // > CustomCode.jszip:5141
    //Z_MEM_ERROR:     -4,  // > CustomCode.jszip:5142
    Z_BUF_ERROR:       -5,  // > CustomCode.jszip:5143
    //Z_VERSION_ERROR: -6,  // > CustomCode.jszip:5144
    /* compression levels */  // > CustomCode.jszip:5145
    Z_NO_COMPRESSION:         0,  // > CustomCode.jszip:5146
    Z_BEST_SPEED:             1,  // > CustomCode.jszip:5147
    Z_BEST_COMPRESSION:       9,  // > CustomCode.jszip:5148
    Z_DEFAULT_COMPRESSION:   -1,  // > CustomCode.jszip:5149
    Z_FILTERED:               1,  // > CustomCode.jszip:5150
    Z_HUFFMAN_ONLY:           2,  // > CustomCode.jszip:5151
    Z_RLE:                    3,  // > CustomCode.jszip:5152
    Z_FIXED:                  4,  // > CustomCode.jszip:5153
    Z_DEFAULT_STRATEGY:       0,  // > CustomCode.jszip:5154
    /* Possible values of the data_type field (though see inflate()) */  // > CustomCode.jszip:5155
    Z_BINARY:                 0,  // > CustomCode.jszip:5156
    Z_TEXT:                   1,  // > CustomCode.jszip:5157
    //Z_ASCII:                1, // = Z_TEXT (deprecated)  // > CustomCode.jszip:5158
    Z_UNKNOWN:                2,  // > CustomCode.jszip:5159
    /* The deflate compression method */  // > CustomCode.jszip:5160
    Z_DEFLATED:               8  // > CustomCode.jszip:5161
    //Z_NULL:                 null // Use -1 or null inline, depending on var type  // > CustomCode.jszip:5162
  };  // > CustomCode.jszip:5163
  },{}],45:[function(require,module,exports){  // > CustomCode.jszip:5164
  'use strict';  // > CustomCode.jszip:5165
  // Note: we can't get significant speed boost here.  // > CustomCode.jszip:5166
  // So write code to minimize size - no pregenerated tables  // > CustomCode.jszip:5167
  // and array tools dependencies.  // > CustomCode.jszip:5168
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:5169
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:5170
  //  // > CustomCode.jszip:5171
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:5172
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:5173
  // arising from the use of this software.  // > CustomCode.jszip:5174
  //  // > CustomCode.jszip:5175
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:5176
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:5177
  // freely, subject to the following restrictions:  // > CustomCode.jszip:5178
  //  // > CustomCode.jszip:5179
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:5180
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:5181
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:5182
  //   appreciated but is not required.  // > CustomCode.jszip:5183
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:5184
  //   misrepresented as being the original software.  // > CustomCode.jszip:5185
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:5186
  // Use ordinary array, since untyped makes no boost here  // > CustomCode.jszip:5187
  function makeTable() {  // > CustomCode.jszip:5188
    var c, table = [];  // > CustomCode.jszip:5189
    for (var n = 0; n < 256; n++) {  // > CustomCode.jszip:5190
      c = n;  // > CustomCode.jszip:5191
      for (var k = 0; k < 8; k++) {  // > CustomCode.jszip:5192
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));  // > CustomCode.jszip:5193
      }  // > CustomCode.jszip:5194
      table[n] = c;  // > CustomCode.jszip:5195
    }  // > CustomCode.jszip:5196
    return table;  // > CustomCode.jszip:5197
  }  // > CustomCode.jszip:5198
  // Create table on load. Just 255 signed longs. Not a problem.  // > CustomCode.jszip:5199
  var crcTable = makeTable();  // > CustomCode.jszip:5200
  function crc32(crc, buf, len, pos) {  // > CustomCode.jszip:5201
    var t = crcTable,  // > CustomCode.jszip:5202
        end = pos + len;  // > CustomCode.jszip:5203
    crc ^= -1;  // > CustomCode.jszip:5204
    for (var i = pos; i < end; i++) {  // > CustomCode.jszip:5205
      crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];  // > CustomCode.jszip:5206
    }  // > CustomCode.jszip:5207
    return (crc ^ (-1)); // >>> 0;  // > CustomCode.jszip:5208
  }  // > CustomCode.jszip:5209
  module.exports = crc32;  // > CustomCode.jszip:5210
  },{}],46:[function(require,module,exports){  // > CustomCode.jszip:5211
  'use strict';  // > CustomCode.jszip:5212
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:5213
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:5214
  //  // > CustomCode.jszip:5215
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:5216
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:5217
  // arising from the use of this software.  // > CustomCode.jszip:5218
  //  // > CustomCode.jszip:5219
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:5220
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:5221
  // freely, subject to the following restrictions:  // > CustomCode.jszip:5222
  //  // > CustomCode.jszip:5223
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:5224
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:5225
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:5226
  //   appreciated but is not required.  // > CustomCode.jszip:5227
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:5228
  //   misrepresented as being the original software.  // > CustomCode.jszip:5229
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:5230
  var utils   = require('../utils/common');  // > CustomCode.jszip:5231
  var trees   = require('./trees');  // > CustomCode.jszip:5232
  var adler32 = require('./adler32');  // > CustomCode.jszip:5233
  var crc32   = require('./crc32');  // > CustomCode.jszip:5234
  var msg     = require('./messages');  // > CustomCode.jszip:5235
  /* Public constants ==========================================================*/  // > CustomCode.jszip:5236
  /* ===========================================================================*/  // > CustomCode.jszip:5237
  /* Allowed flush values; see deflate() and inflate() below for details */  // > CustomCode.jszip:5238
  var Z_NO_FLUSH      = 0;  // > CustomCode.jszip:5239
  var Z_PARTIAL_FLUSH = 1;  // > CustomCode.jszip:5240
  //var Z_SYNC_FLUSH    = 2;  // > CustomCode.jszip:5241
  var Z_FULL_FLUSH    = 3;  // > CustomCode.jszip:5242
  var Z_FINISH        = 4;  // > CustomCode.jszip:5243
  var Z_BLOCK         = 5;  // > CustomCode.jszip:5244
  //var Z_TREES         = 6;  // > CustomCode.jszip:5245
  /* Return codes for the compression/decompression functions. Negative values  // > CustomCode.jszip:5246
   * are errors, positive values are used for special but normal events.  // > CustomCode.jszip:5247
   */  // > CustomCode.jszip:5248
  var Z_OK            = 0;  // > CustomCode.jszip:5249
  var Z_STREAM_END    = 1;  // > CustomCode.jszip:5250
  //var Z_NEED_DICT     = 2;  // > CustomCode.jszip:5251
  //var Z_ERRNO         = -1;  // > CustomCode.jszip:5252
  var Z_STREAM_ERROR  = -2;  // > CustomCode.jszip:5253
  var Z_DATA_ERROR    = -3;  // > CustomCode.jszip:5254
  //var Z_MEM_ERROR     = -4;  // > CustomCode.jszip:5255
  var Z_BUF_ERROR     = -5;  // > CustomCode.jszip:5256
  //var Z_VERSION_ERROR = -6;  // > CustomCode.jszip:5257
  /* compression levels */  // > CustomCode.jszip:5258
  //var Z_NO_COMPRESSION      = 0;  // > CustomCode.jszip:5259
  //var Z_BEST_SPEED          = 1;  // > CustomCode.jszip:5260
  //var Z_BEST_COMPRESSION    = 9;  // > CustomCode.jszip:5261
  var Z_DEFAULT_COMPRESSION = -1;  // > CustomCode.jszip:5262
  var Z_FILTERED            = 1;  // > CustomCode.jszip:5263
  var Z_HUFFMAN_ONLY        = 2;  // > CustomCode.jszip:5264
  var Z_RLE                 = 3;  // > CustomCode.jszip:5265
  var Z_FIXED               = 4;  // > CustomCode.jszip:5266
  var Z_DEFAULT_STRATEGY    = 0;  // > CustomCode.jszip:5267
  /* Possible values of the data_type field (though see inflate()) */  // > CustomCode.jszip:5268
  //var Z_BINARY              = 0;  // > CustomCode.jszip:5269
  //var Z_TEXT                = 1;  // > CustomCode.jszip:5270
  //var Z_ASCII               = 1; // = Z_TEXT  // > CustomCode.jszip:5271
  var Z_UNKNOWN             = 2;  // > CustomCode.jszip:5272
  /* The deflate compression method */  // > CustomCode.jszip:5273
  var Z_DEFLATED  = 8;  // > CustomCode.jszip:5274
  /*============================================================================*/  // > CustomCode.jszip:5275
  var MAX_MEM_LEVEL = 9;  // > CustomCode.jszip:5276
  /* Maximum value for memLevel in deflateInit2 */  // > CustomCode.jszip:5277
  var MAX_WBITS = 15;  // > CustomCode.jszip:5278
  /* 32K LZ77 window */  // > CustomCode.jszip:5279
  var DEF_MEM_LEVEL = 8;  // > CustomCode.jszip:5280
  var LENGTH_CODES  = 29;  // > CustomCode.jszip:5281
  /* number of length codes, not counting the special END_BLOCK code */  // > CustomCode.jszip:5282
  var LITERALS      = 256;  // > CustomCode.jszip:5283
  /* number of literal bytes 0..255 */  // > CustomCode.jszip:5284
  var L_CODES       = LITERALS + 1 + LENGTH_CODES;  // > CustomCode.jszip:5285
  /* number of Literal or Length codes, including the END_BLOCK code */  // > CustomCode.jszip:5286
  var D_CODES       = 30;  // > CustomCode.jszip:5287
  /* number of distance codes */  // > CustomCode.jszip:5288
  var BL_CODES      = 19;  // > CustomCode.jszip:5289
  /* number of codes used to transfer the bit lengths */  // > CustomCode.jszip:5290
  var HEAP_SIZE     = 2 * L_CODES + 1;  // > CustomCode.jszip:5291
  /* maximum heap size */  // > CustomCode.jszip:5292
  var MAX_BITS  = 15;  // > CustomCode.jszip:5293
  /* All codes must not exceed MAX_BITS bits */  // > CustomCode.jszip:5294
  var MIN_MATCH = 3;  // > CustomCode.jszip:5295
  var MAX_MATCH = 258;  // > CustomCode.jszip:5296
  var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);  // > CustomCode.jszip:5297
  var PRESET_DICT = 0x20;  // > CustomCode.jszip:5298
  var INIT_STATE = 42;  // > CustomCode.jszip:5299
  var EXTRA_STATE = 69;  // > CustomCode.jszip:5300
  var NAME_STATE = 73;  // > CustomCode.jszip:5301
  var COMMENT_STATE = 91;  // > CustomCode.jszip:5302
  var HCRC_STATE = 103;  // > CustomCode.jszip:5303
  var BUSY_STATE = 113;  // > CustomCode.jszip:5304
  var FINISH_STATE = 666;  // > CustomCode.jszip:5305
  var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */  // > CustomCode.jszip:5306
  var BS_BLOCK_DONE     = 2; /* block flush performed */  // > CustomCode.jszip:5307
  var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */  // > CustomCode.jszip:5308
  var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */  // > CustomCode.jszip:5309
  var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.  // > CustomCode.jszip:5310
  function err(strm, errorCode) {  // > CustomCode.jszip:5311
    strm.msg = msg[errorCode];  // > CustomCode.jszip:5312
    return errorCode;  // > CustomCode.jszip:5313
  }  // > CustomCode.jszip:5314
  function rank(f) {  // > CustomCode.jszip:5315
    return ((f) << 1) - ((f) > 4 ? 9 : 0);  // > CustomCode.jszip:5316
  }  // > CustomCode.jszip:5317
  function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }  // > CustomCode.jszip:5318
  /* =========================================================================  // > CustomCode.jszip:5319
   * Flush as much pending output as possible. All deflate() output goes  // > CustomCode.jszip:5320
   * through this function so some applications may wish to modify it  // > CustomCode.jszip:5321
   * to avoid allocating a large strm->output buffer and copying into it.  // > CustomCode.jszip:5322
   * (See also read_buf()).  // > CustomCode.jszip:5323
   */  // > CustomCode.jszip:5324
  function flush_pending(strm) {  // > CustomCode.jszip:5325
    var s = strm.state;  // > CustomCode.jszip:5326
    //_tr_flush_bits(s);  // > CustomCode.jszip:5327
    var len = s.pending;  // > CustomCode.jszip:5328
    if (len > strm.avail_out) {  // > CustomCode.jszip:5329
      len = strm.avail_out;  // > CustomCode.jszip:5330
    }  // > CustomCode.jszip:5331
    if (len === 0) { return; }  // > CustomCode.jszip:5332
    utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);  // > CustomCode.jszip:5333
    strm.next_out += len;  // > CustomCode.jszip:5334
    s.pending_out += len;  // > CustomCode.jszip:5335
    strm.total_out += len;  // > CustomCode.jszip:5336
    strm.avail_out -= len;  // > CustomCode.jszip:5337
    s.pending -= len;  // > CustomCode.jszip:5338
    if (s.pending === 0) {  // > CustomCode.jszip:5339
      s.pending_out = 0;  // > CustomCode.jszip:5340
    }  // > CustomCode.jszip:5341
  }  // > CustomCode.jszip:5342
  function flush_block_only(s, last) {  // > CustomCode.jszip:5343
    trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);  // > CustomCode.jszip:5344
    s.block_start = s.strstart;  // > CustomCode.jszip:5345
    flush_pending(s.strm);  // > CustomCode.jszip:5346
  }  // > CustomCode.jszip:5347
  function put_byte(s, b) {  // > CustomCode.jszip:5348
    s.pending_buf[s.pending++] = b;  // > CustomCode.jszip:5349
  }  // > CustomCode.jszip:5350
  /* =========================================================================  // > CustomCode.jszip:5351
   * Put a short in the pending buffer. The 16-bit value is put in MSB order.  // > CustomCode.jszip:5352
   * IN assertion: the stream state is correct and there is enough room in  // > CustomCode.jszip:5353
   * pending_buf.  // > CustomCode.jszip:5354
   */  // > CustomCode.jszip:5355
  function putShortMSB(s, b) {  // > CustomCode.jszip:5356
  //  put_byte(s, (Byte)(b >> 8));  // > CustomCode.jszip:5357
  //  put_byte(s, (Byte)(b & 0xff));  // > CustomCode.jszip:5358
    s.pending_buf[s.pending++] = (b >>> 8) & 0xff;  // > CustomCode.jszip:5359
    s.pending_buf[s.pending++] = b & 0xff;  // > CustomCode.jszip:5360
  }  // > CustomCode.jszip:5361
  /* ===========================================================================  // > CustomCode.jszip:5362
   * Read a new buffer from the current input stream, update the adler32  // > CustomCode.jszip:5363
   * and total number of bytes read.  All deflate() input goes through  // > CustomCode.jszip:5364
   * this function so some applications may wish to modify it to avoid  // > CustomCode.jszip:5365
   * allocating a large strm->input buffer and copying from it.  // > CustomCode.jszip:5366
   * (See also flush_pending()).  // > CustomCode.jszip:5367
   */  // > CustomCode.jszip:5368
  function read_buf(strm, buf, start, size) {  // > CustomCode.jszip:5369
    var len = strm.avail_in;  // > CustomCode.jszip:5370
    if (len > size) { len = size; }  // > CustomCode.jszip:5371
    if (len === 0) { return 0; }  // > CustomCode.jszip:5372
    strm.avail_in -= len;  // > CustomCode.jszip:5373
    // zmemcpy(buf, strm->next_in, len);  // > CustomCode.jszip:5374
    utils.arraySet(buf, strm.input, strm.next_in, len, start);  // > CustomCode.jszip:5375
    if (strm.state.wrap === 1) {  // > CustomCode.jszip:5376
      strm.adler = adler32(strm.adler, buf, len, start);  // > CustomCode.jszip:5377
    }  // > CustomCode.jszip:5378
    else if (strm.state.wrap === 2) {  // > CustomCode.jszip:5379
      strm.adler = crc32(strm.adler, buf, len, start);  // > CustomCode.jszip:5380
    }  // > CustomCode.jszip:5381
    strm.next_in += len;  // > CustomCode.jszip:5382
    strm.total_in += len;  // > CustomCode.jszip:5383
    return len;  // > CustomCode.jszip:5384
  }  // > CustomCode.jszip:5385
  /* ===========================================================================  // > CustomCode.jszip:5386
   * Set match_start to the longest match starting at the given string and  // > CustomCode.jszip:5387
   * return its length. Matches shorter or equal to prev_length are discarded,  // > CustomCode.jszip:5388
   * in which case the result is equal to prev_length and match_start is  // > CustomCode.jszip:5389
   * garbage.  // > CustomCode.jszip:5390
   * IN assertions: cur_match is the head of the hash chain for the current  // > CustomCode.jszip:5391
   *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1  // > CustomCode.jszip:5392
   * OUT assertion: the match length is not greater than s->lookahead.  // > CustomCode.jszip:5393
   */  // > CustomCode.jszip:5394
  function longest_match(s, cur_match) {  // > CustomCode.jszip:5395
    var chain_length = s.max_chain_length;      /* max hash chain length */  // > CustomCode.jszip:5396
    var scan = s.strstart; /* current string */  // > CustomCode.jszip:5397
    var match;                       /* matched string */  // > CustomCode.jszip:5398
    var len;                           /* length of current match */  // > CustomCode.jszip:5399
    var best_len = s.prev_length;              /* best match length so far */  // > CustomCode.jszip:5400
    var nice_match = s.nice_match;             /* stop if match long enough */  // > CustomCode.jszip:5401
    var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?  // > CustomCode.jszip:5402
        s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;  // > CustomCode.jszip:5403
    var _win = s.window; // shortcut  // > CustomCode.jszip:5404
    var wmask = s.w_mask;  // > CustomCode.jszip:5405
    var prev  = s.prev;  // > CustomCode.jszip:5406
    /* Stop when cur_match becomes <= limit. To simplify the code,  // > CustomCode.jszip:5407
     * we prevent matches with the string of window index 0.  // > CustomCode.jszip:5408
     */  // > CustomCode.jszip:5409
    var strend = s.strstart + MAX_MATCH;  // > CustomCode.jszip:5410
    var scan_end1  = _win[scan + best_len - 1];  // > CustomCode.jszip:5411
    var scan_end   = _win[scan + best_len];  // > CustomCode.jszip:5412
    /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.  // > CustomCode.jszip:5413
     * It is easy to get rid of this optimization if necessary.  // > CustomCode.jszip:5414
     */  // > CustomCode.jszip:5415
    // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");  // > CustomCode.jszip:5416
    /* Do not waste too much time if we already have a good match: */  // > CustomCode.jszip:5417
    if (s.prev_length >= s.good_match) {  // > CustomCode.jszip:5418
      chain_length >>= 2;  // > CustomCode.jszip:5419
    }  // > CustomCode.jszip:5420
    /* Do not look for matches beyond the end of the input. This is necessary  // > CustomCode.jszip:5421
     * to make deflate deterministic.  // > CustomCode.jszip:5422
     */  // > CustomCode.jszip:5423
    if (nice_match > s.lookahead) { nice_match = s.lookahead; }  // > CustomCode.jszip:5424
    // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");  // > CustomCode.jszip:5425
    do {  // > CustomCode.jszip:5426
      // Assert(cur_match < s->strstart, "no future");  // > CustomCode.jszip:5427
      match = cur_match;  // > CustomCode.jszip:5428
      /* Skip to next match if the match length cannot increase  // > CustomCode.jszip:5429
       * or if the match length is less than 2.  Note that the checks below  // > CustomCode.jszip:5430
       * for insufficient lookahead only occur occasionally for performance  // > CustomCode.jszip:5431
       * reasons.  Therefore uninitialized memory will be accessed, and  // > CustomCode.jszip:5432
       * conditional jumps will be made that depend on those values.  // > CustomCode.jszip:5433
       * However the length of the match is limited to the lookahead, so  // > CustomCode.jszip:5434
       * the output of deflate is not affected by the uninitialized values.  // > CustomCode.jszip:5435
       */  // > CustomCode.jszip:5436
      if (_win[match + best_len]     !== scan_end  ||  // > CustomCode.jszip:5437
          _win[match + best_len - 1] !== scan_end1 ||  // > CustomCode.jszip:5438
          _win[match]                !== _win[scan] ||  // > CustomCode.jszip:5439
          _win[++match]              !== _win[scan + 1]) {  // > CustomCode.jszip:5440
        continue;  // > CustomCode.jszip:5441
      }  // > CustomCode.jszip:5442
      /* The check at best_len-1 can be removed because it will be made  // > CustomCode.jszip:5443
       * again later. (This heuristic is not always a win.)  // > CustomCode.jszip:5444
       * It is not necessary to compare scan[2] and match[2] since they  // > CustomCode.jszip:5445
       * are always equal when the other bytes match, given that  // > CustomCode.jszip:5446
       * the hash keys are equal and that HASH_BITS >= 8.  // > CustomCode.jszip:5447
       */  // > CustomCode.jszip:5448
      scan += 2;  // > CustomCode.jszip:5449
      match++;  // > CustomCode.jszip:5450
      // Assert(*scan == *match, "match[2]?");  // > CustomCode.jszip:5451
      /* We check for insufficient lookahead only every 8th comparison;  // > CustomCode.jszip:5452
       * the 256th check will be made at strstart+258.  // > CustomCode.jszip:5453
       */  // > CustomCode.jszip:5454
      do {  // > CustomCode.jszip:5455
        /*jshint noempty:false*/  // > CustomCode.jszip:5456
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&  // > CustomCode.jszip:5457
               _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&  // > CustomCode.jszip:5458
               _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&  // > CustomCode.jszip:5459
               _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&  // > CustomCode.jszip:5460
               scan < strend);  // > CustomCode.jszip:5461
      // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");  // > CustomCode.jszip:5462
      len = MAX_MATCH - (strend - scan);  // > CustomCode.jszip:5463
      scan = strend - MAX_MATCH;  // > CustomCode.jszip:5464
      if (len > best_len) {  // > CustomCode.jszip:5465
        s.match_start = cur_match;  // > CustomCode.jszip:5466
        best_len = len;  // > CustomCode.jszip:5467
        if (len >= nice_match) {  // > CustomCode.jszip:5468
          break;  // > CustomCode.jszip:5469
        }  // > CustomCode.jszip:5470
        scan_end1  = _win[scan + best_len - 1];  // > CustomCode.jszip:5471
        scan_end   = _win[scan + best_len];  // > CustomCode.jszip:5472
      }  // > CustomCode.jszip:5473
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);  // > CustomCode.jszip:5474
    if (best_len <= s.lookahead) {  // > CustomCode.jszip:5475
      return best_len;  // > CustomCode.jszip:5476
    }  // > CustomCode.jszip:5477
    return s.lookahead;  // > CustomCode.jszip:5478
  }  // > CustomCode.jszip:5479
  /* ===========================================================================  // > CustomCode.jszip:5480
   * Fill the window when the lookahead becomes insufficient.  // > CustomCode.jszip:5481
   * Updates strstart and lookahead.  // > CustomCode.jszip:5482
   *  // > CustomCode.jszip:5483
   * IN assertion: lookahead < MIN_LOOKAHEAD  // > CustomCode.jszip:5484
   * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD  // > CustomCode.jszip:5485
   *    At least one byte has been read, or avail_in == 0; reads are  // > CustomCode.jszip:5486
   *    performed for at least two bytes (required for the zip translate_eol  // > CustomCode.jszip:5487
   *    option -- not supported here).  // > CustomCode.jszip:5488
   */  // > CustomCode.jszip:5489
  function fill_window(s) {  // > CustomCode.jszip:5490
    var _w_size = s.w_size;  // > CustomCode.jszip:5491
    var p, n, m, more, str;  // > CustomCode.jszip:5492
    //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");  // > CustomCode.jszip:5493
    do {  // > CustomCode.jszip:5494
      more = s.window_size - s.lookahead - s.strstart;  // > CustomCode.jszip:5495
      // JS ints have 32 bit, block below not needed  // > CustomCode.jszip:5496
      /* Deal with !@#$% 64K limit: */  // > CustomCode.jszip:5497
      //if (sizeof(int) <= 2) {  // > CustomCode.jszip:5498
      //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {  // > CustomCode.jszip:5499
      //        more = wsize;  // > CustomCode.jszip:5500
      //  // > CustomCode.jszip:5501
      //  } else if (more == (unsigned)(-1)) {  // > CustomCode.jszip:5502
      //        /* Very unlikely, but possible on 16 bit machine if  // > CustomCode.jszip:5503
      //         * strstart == 0 && lookahead == 1 (input done a byte at time)  // > CustomCode.jszip:5504
      //         */  // > CustomCode.jszip:5505
      //        more--;  // > CustomCode.jszip:5506
      //    }  // > CustomCode.jszip:5507
      //}  // > CustomCode.jszip:5508
      /* If the window is almost full and there is insufficient lookahead,  // > CustomCode.jszip:5509
       * move the upper half to the lower one to make room in the upper half.  // > CustomCode.jszip:5510
       */  // > CustomCode.jszip:5511
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {  // > CustomCode.jszip:5512
        utils.arraySet(s.window, s.window, _w_size, _w_size, 0);  // > CustomCode.jszip:5513
        s.match_start -= _w_size;  // > CustomCode.jszip:5514
        s.strstart -= _w_size;  // > CustomCode.jszip:5515
        /* we now have strstart >= MAX_DIST */  // > CustomCode.jszip:5516
        s.block_start -= _w_size;  // > CustomCode.jszip:5517
        /* Slide the hash table (could be avoided with 32 bit values  // > CustomCode.jszip:5518
         at the expense of memory usage). We slide even when level == 0  // > CustomCode.jszip:5519
         to keep the hash table consistent if we switch back to level > 0  // > CustomCode.jszip:5520
         later. (Using level 0 permanently is not an optimal usage of  // > CustomCode.jszip:5521
         zlib, so we don't care about this pathological case.)  // > CustomCode.jszip:5522
         */  // > CustomCode.jszip:5523
        n = s.hash_size;  // > CustomCode.jszip:5524
        p = n;  // > CustomCode.jszip:5525
        do {  // > CustomCode.jszip:5526
          m = s.head[--p];  // > CustomCode.jszip:5527
          s.head[p] = (m >= _w_size ? m - _w_size : 0);  // > CustomCode.jszip:5528
        } while (--n);  // > CustomCode.jszip:5529
        n = _w_size;  // > CustomCode.jszip:5530
        p = n;  // > CustomCode.jszip:5531
        do {  // > CustomCode.jszip:5532
          m = s.prev[--p];  // > CustomCode.jszip:5533
          s.prev[p] = (m >= _w_size ? m - _w_size : 0);  // > CustomCode.jszip:5534
          /* If n is not on any hash chain, prev[n] is garbage but  // > CustomCode.jszip:5535
           * its value will never be used.  // > CustomCode.jszip:5536
           */  // > CustomCode.jszip:5537
        } while (--n);  // > CustomCode.jszip:5538
        more += _w_size;  // > CustomCode.jszip:5539
      }  // > CustomCode.jszip:5540
      if (s.strm.avail_in === 0) {  // > CustomCode.jszip:5541
        break;  // > CustomCode.jszip:5542
      }  // > CustomCode.jszip:5543
      /* If there was no sliding:  // > CustomCode.jszip:5544
       *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&  // > CustomCode.jszip:5545
       *    more == window_size - lookahead - strstart  // > CustomCode.jszip:5546
       * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)  // > CustomCode.jszip:5547
       * => more >= window_size - 2*WSIZE + 2  // > CustomCode.jszip:5548
       * In the BIG_MEM or MMAP case (not yet supported),  // > CustomCode.jszip:5549
       *   window_size == input_size + MIN_LOOKAHEAD  &&  // > CustomCode.jszip:5550
       *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.  // > CustomCode.jszip:5551
       * Otherwise, window_size == 2*WSIZE so more >= 2.  // > CustomCode.jszip:5552
       * If there was sliding, more >= WSIZE. So in all cases, more >= 2.  // > CustomCode.jszip:5553
       */  // > CustomCode.jszip:5554
      //Assert(more >= 2, "more < 2");  // > CustomCode.jszip:5555
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);  // > CustomCode.jszip:5556
      s.lookahead += n;  // > CustomCode.jszip:5557
      /* Initialize the hash value now that we have some input: */  // > CustomCode.jszip:5558
      if (s.lookahead + s.insert >= MIN_MATCH) {  // > CustomCode.jszip:5559
        str = s.strstart - s.insert;  // > CustomCode.jszip:5560
        s.ins_h = s.window[str];  // > CustomCode.jszip:5561
        /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */  // > CustomCode.jszip:5562
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;  // > CustomCode.jszip:5563
  //#if MIN_MATCH != 3  // > CustomCode.jszip:5564
  //        Call update_hash() MIN_MATCH-3 more times  // > CustomCode.jszip:5565
  //#endif  // > CustomCode.jszip:5566
        while (s.insert) {  // > CustomCode.jszip:5567
          /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */  // > CustomCode.jszip:5568
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;  // > CustomCode.jszip:5569
          s.prev[str & s.w_mask] = s.head[s.ins_h];  // > CustomCode.jszip:5570
          s.head[s.ins_h] = str;  // > CustomCode.jszip:5571
          str++;  // > CustomCode.jszip:5572
          s.insert--;  // > CustomCode.jszip:5573
          if (s.lookahead + s.insert < MIN_MATCH) {  // > CustomCode.jszip:5574
            break;  // > CustomCode.jszip:5575
          }  // > CustomCode.jszip:5576
        }  // > CustomCode.jszip:5577
      }  // > CustomCode.jszip:5578
      /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,  // > CustomCode.jszip:5579
       * but this is not important since only literal bytes will be emitted.  // > CustomCode.jszip:5580
       */  // > CustomCode.jszip:5581
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);  // > CustomCode.jszip:5582
    /* If the WIN_INIT bytes after the end of the current data have never been  // > CustomCode.jszip:5583
     * written, then zero those bytes in order to avoid memory check reports of  // > CustomCode.jszip:5584
     * the use of uninitialized (or uninitialised as Julian writes) bytes by  // > CustomCode.jszip:5585
     * the longest match routines.  Update the high water mark for the next  // > CustomCode.jszip:5586
     * time through here.  WIN_INIT is set to MAX_MATCH since the longest match  // > CustomCode.jszip:5587
     * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.  // > CustomCode.jszip:5588
     */  // > CustomCode.jszip:5589
  //  if (s.high_water < s.window_size) {  // > CustomCode.jszip:5590
  //    var curr = s.strstart + s.lookahead;  // > CustomCode.jszip:5591
  //    var init = 0;  // > CustomCode.jszip:5592
  //  // > CustomCode.jszip:5593
  //    if (s.high_water < curr) {  // > CustomCode.jszip:5594
  //      /* Previous high water mark below current data -- zero WIN_INIT  // > CustomCode.jszip:5595
  //       * bytes or up to end of window, whichever is less.  // > CustomCode.jszip:5596
  //       */  // > CustomCode.jszip:5597
  //      init = s.window_size - curr;  // > CustomCode.jszip:5598
  //      if (init > WIN_INIT)  // > CustomCode.jszip:5599
  //        init = WIN_INIT;  // > CustomCode.jszip:5600
  //      zmemzero(s->window + curr, (unsigned)init);  // > CustomCode.jszip:5601
  //      s->high_water = curr + init;  // > CustomCode.jszip:5602
  //    }  // > CustomCode.jszip:5603
  //    else if (s->high_water < (ulg)curr + WIN_INIT) {  // > CustomCode.jszip:5604
  //      /* High water mark at or above current data, but below current data  // > CustomCode.jszip:5605
  //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up  // > CustomCode.jszip:5606
  //       * to end of window, whichever is less.  // > CustomCode.jszip:5607
  //       */  // > CustomCode.jszip:5608
  //      init = (ulg)curr + WIN_INIT - s->high_water;  // > CustomCode.jszip:5609
  //      if (init > s->window_size - s->high_water)  // > CustomCode.jszip:5610
  //        init = s->window_size - s->high_water;  // > CustomCode.jszip:5611
  //      zmemzero(s->window + s->high_water, (unsigned)init);  // > CustomCode.jszip:5612
  //      s->high_water += init;  // > CustomCode.jszip:5613
  //    }  // > CustomCode.jszip:5614
  //  }  // > CustomCode.jszip:5615
  //  // > CustomCode.jszip:5616
  //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,  // > CustomCode.jszip:5617
  //    "not enough room for search");  // > CustomCode.jszip:5618
  }  // > CustomCode.jszip:5619
  /* ===========================================================================  // > CustomCode.jszip:5620
   * Copy without compression as much as possible from the input stream, return  // > CustomCode.jszip:5621
   * the current block state.  // > CustomCode.jszip:5622
   * This function does not insert new strings in the dictionary since  // > CustomCode.jszip:5623
   * uncompressible data is probably not useful. This function is used  // > CustomCode.jszip:5624
   * only for the level=0 compression option.  // > CustomCode.jszip:5625
   * NOTE: this function should be optimized to avoid extra copying from  // > CustomCode.jszip:5626
   * window to pending_buf.  // > CustomCode.jszip:5627
   */  // > CustomCode.jszip:5628
  function deflate_stored(s, flush) {  // > CustomCode.jszip:5629
    /* Stored blocks are limited to 0xffff bytes, pending_buf is limited  // > CustomCode.jszip:5630
     * to pending_buf_size, and each stored block has a 5 byte header:  // > CustomCode.jszip:5631
     */  // > CustomCode.jszip:5632
    var max_block_size = 0xffff;  // > CustomCode.jszip:5633
    if (max_block_size > s.pending_buf_size - 5) {  // > CustomCode.jszip:5634
      max_block_size = s.pending_buf_size - 5;  // > CustomCode.jszip:5635
    }  // > CustomCode.jszip:5636
    /* Copy as much as possible from input to output: */  // > CustomCode.jszip:5637
    for (;;) {  // > CustomCode.jszip:5638
      /* Fill the window as much as possible: */  // > CustomCode.jszip:5639
      if (s.lookahead <= 1) {  // > CustomCode.jszip:5640
        //Assert(s->strstart < s->w_size+MAX_DIST(s) ||  // > CustomCode.jszip:5641
        //  s->block_start >= (long)s->w_size, "slide too late");  // > CustomCode.jszip:5642
  //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||  // > CustomCode.jszip:5643
  //        s.block_start >= s.w_size)) {  // > CustomCode.jszip:5644
  //        throw  new Error("slide too late");  // > CustomCode.jszip:5645
  //      }  // > CustomCode.jszip:5646
        fill_window(s);  // > CustomCode.jszip:5647
        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {  // > CustomCode.jszip:5648
          return BS_NEED_MORE;  // > CustomCode.jszip:5649
        }  // > CustomCode.jszip:5650
        if (s.lookahead === 0) {  // > CustomCode.jszip:5651
          break;  // > CustomCode.jszip:5652
        }  // > CustomCode.jszip:5653
        /* flush the current block */  // > CustomCode.jszip:5654
      }  // > CustomCode.jszip:5655
      //Assert(s->block_start >= 0L, "block gone");  // > CustomCode.jszip:5656
  //    if (s.block_start < 0) throw new Error("block gone");  // > CustomCode.jszip:5657
      s.strstart += s.lookahead;  // > CustomCode.jszip:5658
      s.lookahead = 0;  // > CustomCode.jszip:5659
      /* Emit a stored block if pending_buf will be full: */  // > CustomCode.jszip:5660
      var max_start = s.block_start + max_block_size;  // > CustomCode.jszip:5661
      if (s.strstart === 0 || s.strstart >= max_start) {  // > CustomCode.jszip:5662
        /* strstart == 0 is possible when wraparound on 16-bit machine */  // > CustomCode.jszip:5663
        s.lookahead = s.strstart - max_start;  // > CustomCode.jszip:5664
        s.strstart = max_start;  // > CustomCode.jszip:5665
        /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:5666
        flush_block_only(s, false);  // > CustomCode.jszip:5667
        if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5668
          return BS_NEED_MORE;  // > CustomCode.jszip:5669
        }  // > CustomCode.jszip:5670
        /***/  // > CustomCode.jszip:5671
      }  // > CustomCode.jszip:5672
      /* Flush if we may have to slide, otherwise block_start may become  // > CustomCode.jszip:5673
       * negative and the data will be gone:  // > CustomCode.jszip:5674
       */  // > CustomCode.jszip:5675
      if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {  // > CustomCode.jszip:5676
        /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:5677
        flush_block_only(s, false);  // > CustomCode.jszip:5678
        if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5679
          return BS_NEED_MORE;  // > CustomCode.jszip:5680
        }  // > CustomCode.jszip:5681
        /***/  // > CustomCode.jszip:5682
      }  // > CustomCode.jszip:5683
    }  // > CustomCode.jszip:5684
    s.insert = 0;  // > CustomCode.jszip:5685
    if (flush === Z_FINISH) {  // > CustomCode.jszip:5686
      /*** FLUSH_BLOCK(s, 1); ***/  // > CustomCode.jszip:5687
      flush_block_only(s, true);  // > CustomCode.jszip:5688
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5689
        return BS_FINISH_STARTED;  // > CustomCode.jszip:5690
      }  // > CustomCode.jszip:5691
      /***/  // > CustomCode.jszip:5692
      return BS_FINISH_DONE;  // > CustomCode.jszip:5693
    }  // > CustomCode.jszip:5694
    if (s.strstart > s.block_start) {  // > CustomCode.jszip:5695
      /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:5696
      flush_block_only(s, false);  // > CustomCode.jszip:5697
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5698
        return BS_NEED_MORE;  // > CustomCode.jszip:5699
      }  // > CustomCode.jszip:5700
      /***/  // > CustomCode.jszip:5701
    }  // > CustomCode.jszip:5702
    return BS_NEED_MORE;  // > CustomCode.jszip:5703
  }  // > CustomCode.jszip:5704
  /* ===========================================================================  // > CustomCode.jszip:5705
   * Compress as much as possible from the input stream, return the current  // > CustomCode.jszip:5706
   * block state.  // > CustomCode.jszip:5707
   * This function does not perform lazy evaluation of matches and inserts  // > CustomCode.jszip:5708
   * new strings in the dictionary only for unmatched strings or for short  // > CustomCode.jszip:5709
   * matches. It is used only for the fast compression options.  // > CustomCode.jszip:5710
   */  // > CustomCode.jszip:5711
  function deflate_fast(s, flush) {  // > CustomCode.jszip:5712
    var hash_head;        /* head of the hash chain */  // > CustomCode.jszip:5713
    var bflush;           /* set if current block must be flushed */  // > CustomCode.jszip:5714
    for (;;) {  // > CustomCode.jszip:5715
      /* Make sure that we always have enough lookahead, except  // > CustomCode.jszip:5716
       * at the end of the input file. We need MAX_MATCH bytes  // > CustomCode.jszip:5717
       * for the next match, plus MIN_MATCH bytes to insert the  // > CustomCode.jszip:5718
       * string following the next match.  // > CustomCode.jszip:5719
       */  // > CustomCode.jszip:5720
      if (s.lookahead < MIN_LOOKAHEAD) {  // > CustomCode.jszip:5721
        fill_window(s);  // > CustomCode.jszip:5722
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {  // > CustomCode.jszip:5723
          return BS_NEED_MORE;  // > CustomCode.jszip:5724
        }  // > CustomCode.jszip:5725
        if (s.lookahead === 0) {  // > CustomCode.jszip:5726
          break; /* flush the current block */  // > CustomCode.jszip:5727
        }  // > CustomCode.jszip:5728
      }  // > CustomCode.jszip:5729
      /* Insert the string window[strstart .. strstart+2] in the  // > CustomCode.jszip:5730
       * dictionary, and set hash_head to the head of the hash chain:  // > CustomCode.jszip:5731
       */  // > CustomCode.jszip:5732
      hash_head = 0/*NIL*/;  // > CustomCode.jszip:5733
      if (s.lookahead >= MIN_MATCH) {  // > CustomCode.jszip:5734
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/  // > CustomCode.jszip:5735
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;  // > CustomCode.jszip:5736
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];  // > CustomCode.jszip:5737
        s.head[s.ins_h] = s.strstart;  // > CustomCode.jszip:5738
        /***/  // > CustomCode.jszip:5739
      }  // > CustomCode.jszip:5740
      /* Find the longest match, discarding those <= prev_length.  // > CustomCode.jszip:5741
       * At this point we have always match_length < MIN_MATCH  // > CustomCode.jszip:5742
       */  // > CustomCode.jszip:5743
      if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {  // > CustomCode.jszip:5744
        /* To simplify the code, we prevent matches with the string  // > CustomCode.jszip:5745
         * of window index 0 (in particular we have to avoid a match  // > CustomCode.jszip:5746
         * of the string with itself at the start of the input file).  // > CustomCode.jszip:5747
         */  // > CustomCode.jszip:5748
        s.match_length = longest_match(s, hash_head);  // > CustomCode.jszip:5749
        /* longest_match() sets match_start */  // > CustomCode.jszip:5750
      }  // > CustomCode.jszip:5751
      if (s.match_length >= MIN_MATCH) {  // > CustomCode.jszip:5752
        // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only  // > CustomCode.jszip:5753
        /*** _tr_tally_dist(s, s.strstart - s.match_start,  // > CustomCode.jszip:5754
                       s.match_length - MIN_MATCH, bflush); ***/  // > CustomCode.jszip:5755
        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);  // > CustomCode.jszip:5756
        s.lookahead -= s.match_length;  // > CustomCode.jszip:5757
        /* Insert new strings in the hash table only if the match length  // > CustomCode.jszip:5758
         * is not too large. This saves time but degrades compression.  // > CustomCode.jszip:5759
         */  // > CustomCode.jszip:5760
        if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {  // > CustomCode.jszip:5761
          s.match_length--; /* string at strstart already in table */  // > CustomCode.jszip:5762
          do {  // > CustomCode.jszip:5763
            s.strstart++;  // > CustomCode.jszip:5764
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/  // > CustomCode.jszip:5765
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;  // > CustomCode.jszip:5766
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];  // > CustomCode.jszip:5767
            s.head[s.ins_h] = s.strstart;  // > CustomCode.jszip:5768
            /***/  // > CustomCode.jszip:5769
            /* strstart never exceeds WSIZE-MAX_MATCH, so there are  // > CustomCode.jszip:5770
             * always MIN_MATCH bytes ahead.  // > CustomCode.jszip:5771
             */  // > CustomCode.jszip:5772
          } while (--s.match_length !== 0);  // > CustomCode.jszip:5773
          s.strstart++;  // > CustomCode.jszip:5774
        } else  // > CustomCode.jszip:5775
        {  // > CustomCode.jszip:5776
          s.strstart += s.match_length;  // > CustomCode.jszip:5777
          s.match_length = 0;  // > CustomCode.jszip:5778
          s.ins_h = s.window[s.strstart];  // > CustomCode.jszip:5779
          /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */  // > CustomCode.jszip:5780
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;  // > CustomCode.jszip:5781
  //#if MIN_MATCH != 3  // > CustomCode.jszip:5782
  //                Call UPDATE_HASH() MIN_MATCH-3 more times  // > CustomCode.jszip:5783
  //#endif  // > CustomCode.jszip:5784
          /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not  // > CustomCode.jszip:5785
           * matter since it will be recomputed at next deflate call.  // > CustomCode.jszip:5786
           */  // > CustomCode.jszip:5787
        }  // > CustomCode.jszip:5788
      } else {  // > CustomCode.jszip:5789
        /* No match, output a literal byte */  // > CustomCode.jszip:5790
        //Tracevv((stderr,"%c", s.window[s.strstart]));  // > CustomCode.jszip:5791
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/  // > CustomCode.jszip:5792
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);  // > CustomCode.jszip:5793
        s.lookahead--;  // > CustomCode.jszip:5794
        s.strstart++;  // > CustomCode.jszip:5795
      }  // > CustomCode.jszip:5796
      if (bflush) {  // > CustomCode.jszip:5797
        /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:5798
        flush_block_only(s, false);  // > CustomCode.jszip:5799
        if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5800
          return BS_NEED_MORE;  // > CustomCode.jszip:5801
        }  // > CustomCode.jszip:5802
        /***/  // > CustomCode.jszip:5803
      }  // > CustomCode.jszip:5804
    }  // > CustomCode.jszip:5805
    s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);  // > CustomCode.jszip:5806
    if (flush === Z_FINISH) {  // > CustomCode.jszip:5807
      /*** FLUSH_BLOCK(s, 1); ***/  // > CustomCode.jszip:5808
      flush_block_only(s, true);  // > CustomCode.jszip:5809
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5810
        return BS_FINISH_STARTED;  // > CustomCode.jszip:5811
      }  // > CustomCode.jszip:5812
      /***/  // > CustomCode.jszip:5813
      return BS_FINISH_DONE;  // > CustomCode.jszip:5814
    }  // > CustomCode.jszip:5815
    if (s.last_lit) {  // > CustomCode.jszip:5816
      /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:5817
      flush_block_only(s, false);  // > CustomCode.jszip:5818
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5819
        return BS_NEED_MORE;  // > CustomCode.jszip:5820
      }  // > CustomCode.jszip:5821
      /***/  // > CustomCode.jszip:5822
    }  // > CustomCode.jszip:5823
    return BS_BLOCK_DONE;  // > CustomCode.jszip:5824
  }  // > CustomCode.jszip:5825
  /* ===========================================================================  // > CustomCode.jszip:5826
   * Same as above, but achieves better compression. We use a lazy  // > CustomCode.jszip:5827
   * evaluation for matches: a match is finally adopted only if there is  // > CustomCode.jszip:5828
   * no better match at the next window position.  // > CustomCode.jszip:5829
   */  // > CustomCode.jszip:5830
  function deflate_slow(s, flush) {  // > CustomCode.jszip:5831
    var hash_head;          /* head of hash chain */  // > CustomCode.jszip:5832
    var bflush;              /* set if current block must be flushed */  // > CustomCode.jszip:5833
    var max_insert;  // > CustomCode.jszip:5834
    /* Process the input block. */  // > CustomCode.jszip:5835
    for (;;) {  // > CustomCode.jszip:5836
      /* Make sure that we always have enough lookahead, except  // > CustomCode.jszip:5837
       * at the end of the input file. We need MAX_MATCH bytes  // > CustomCode.jszip:5838
       * for the next match, plus MIN_MATCH bytes to insert the  // > CustomCode.jszip:5839
       * string following the next match.  // > CustomCode.jszip:5840
       */  // > CustomCode.jszip:5841
      if (s.lookahead < MIN_LOOKAHEAD) {  // > CustomCode.jszip:5842
        fill_window(s);  // > CustomCode.jszip:5843
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {  // > CustomCode.jszip:5844
          return BS_NEED_MORE;  // > CustomCode.jszip:5845
        }  // > CustomCode.jszip:5846
        if (s.lookahead === 0) { break; } /* flush the current block */  // > CustomCode.jszip:5847
      }  // > CustomCode.jszip:5848
      /* Insert the string window[strstart .. strstart+2] in the  // > CustomCode.jszip:5849
       * dictionary, and set hash_head to the head of the hash chain:  // > CustomCode.jszip:5850
       */  // > CustomCode.jszip:5851
      hash_head = 0/*NIL*/;  // > CustomCode.jszip:5852
      if (s.lookahead >= MIN_MATCH) {  // > CustomCode.jszip:5853
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/  // > CustomCode.jszip:5854
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;  // > CustomCode.jszip:5855
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];  // > CustomCode.jszip:5856
        s.head[s.ins_h] = s.strstart;  // > CustomCode.jszip:5857
        /***/  // > CustomCode.jszip:5858
      }  // > CustomCode.jszip:5859
      /* Find the longest match, discarding those <= prev_length.  // > CustomCode.jszip:5860
       */  // > CustomCode.jszip:5861
      s.prev_length = s.match_length;  // > CustomCode.jszip:5862
      s.prev_match = s.match_start;  // > CustomCode.jszip:5863
      s.match_length = MIN_MATCH - 1;  // > CustomCode.jszip:5864
      if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&  // > CustomCode.jszip:5865
          s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {  // > CustomCode.jszip:5866
        /* To simplify the code, we prevent matches with the string  // > CustomCode.jszip:5867
         * of window index 0 (in particular we have to avoid a match  // > CustomCode.jszip:5868
         * of the string with itself at the start of the input file).  // > CustomCode.jszip:5869
         */  // > CustomCode.jszip:5870
        s.match_length = longest_match(s, hash_head);  // > CustomCode.jszip:5871
        /* longest_match() sets match_start */  // > CustomCode.jszip:5872
        if (s.match_length <= 5 &&  // > CustomCode.jszip:5873
           (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {  // > CustomCode.jszip:5874
          /* If prev_match is also MIN_MATCH, match_start is garbage  // > CustomCode.jszip:5875
           * but we will ignore the current match anyway.  // > CustomCode.jszip:5876
           */  // > CustomCode.jszip:5877
          s.match_length = MIN_MATCH - 1;  // > CustomCode.jszip:5878
        }  // > CustomCode.jszip:5879
      }  // > CustomCode.jszip:5880
      /* If there was a match at the previous step and the current  // > CustomCode.jszip:5881
       * match is not better, output the previous match:  // > CustomCode.jszip:5882
       */  // > CustomCode.jszip:5883
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {  // > CustomCode.jszip:5884
        max_insert = s.strstart + s.lookahead - MIN_MATCH;  // > CustomCode.jszip:5885
        /* Do not insert strings in hash table beyond this. */  // > CustomCode.jszip:5886
        //check_match(s, s.strstart-1, s.prev_match, s.prev_length);  // > CustomCode.jszip:5887
        /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,  // > CustomCode.jszip:5888
                       s.prev_length - MIN_MATCH, bflush);***/  // > CustomCode.jszip:5889
        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);  // > CustomCode.jszip:5890
        /* Insert in hash table all strings up to the end of the match.  // > CustomCode.jszip:5891
         * strstart-1 and strstart are already inserted. If there is not  // > CustomCode.jszip:5892
         * enough lookahead, the last two strings are not inserted in  // > CustomCode.jszip:5893
         * the hash table.  // > CustomCode.jszip:5894
         */  // > CustomCode.jszip:5895
        s.lookahead -= s.prev_length - 1;  // > CustomCode.jszip:5896
        s.prev_length -= 2;  // > CustomCode.jszip:5897
        do {  // > CustomCode.jszip:5898
          if (++s.strstart <= max_insert) {  // > CustomCode.jszip:5899
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/  // > CustomCode.jszip:5900
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;  // > CustomCode.jszip:5901
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];  // > CustomCode.jszip:5902
            s.head[s.ins_h] = s.strstart;  // > CustomCode.jszip:5903
            /***/  // > CustomCode.jszip:5904
          }  // > CustomCode.jszip:5905
        } while (--s.prev_length !== 0);  // > CustomCode.jszip:5906
        s.match_available = 0;  // > CustomCode.jszip:5907
        s.match_length = MIN_MATCH - 1;  // > CustomCode.jszip:5908
        s.strstart++;  // > CustomCode.jszip:5909
        if (bflush) {  // > CustomCode.jszip:5910
          /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:5911
          flush_block_only(s, false);  // > CustomCode.jszip:5912
          if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5913
            return BS_NEED_MORE;  // > CustomCode.jszip:5914
          }  // > CustomCode.jszip:5915
          /***/  // > CustomCode.jszip:5916
        }  // > CustomCode.jszip:5917
      } else if (s.match_available) {  // > CustomCode.jszip:5918
        /* If there was no match at the previous position, output a  // > CustomCode.jszip:5919
         * single literal. If there was a match but the current match  // > CustomCode.jszip:5920
         * is longer, truncate the previous match to a single literal.  // > CustomCode.jszip:5921
         */  // > CustomCode.jszip:5922
        //Tracevv((stderr,"%c", s->window[s->strstart-1]));  // > CustomCode.jszip:5923
        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/  // > CustomCode.jszip:5924
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);  // > CustomCode.jszip:5925
        if (bflush) {  // > CustomCode.jszip:5926
          /*** FLUSH_BLOCK_ONLY(s, 0) ***/  // > CustomCode.jszip:5927
          flush_block_only(s, false);  // > CustomCode.jszip:5928
          /***/  // > CustomCode.jszip:5929
        }  // > CustomCode.jszip:5930
        s.strstart++;  // > CustomCode.jszip:5931
        s.lookahead--;  // > CustomCode.jszip:5932
        if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5933
          return BS_NEED_MORE;  // > CustomCode.jszip:5934
        }  // > CustomCode.jszip:5935
      } else {  // > CustomCode.jszip:5936
        /* There is no previous match to compare with, wait for  // > CustomCode.jszip:5937
         * the next step to decide.  // > CustomCode.jszip:5938
         */  // > CustomCode.jszip:5939
        s.match_available = 1;  // > CustomCode.jszip:5940
        s.strstart++;  // > CustomCode.jszip:5941
        s.lookahead--;  // > CustomCode.jszip:5942
      }  // > CustomCode.jszip:5943
    }  // > CustomCode.jszip:5944
    //Assert (flush != Z_NO_FLUSH, "no flush?");  // > CustomCode.jszip:5945
    if (s.match_available) {  // > CustomCode.jszip:5946
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));  // > CustomCode.jszip:5947
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/  // > CustomCode.jszip:5948
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);  // > CustomCode.jszip:5949
      s.match_available = 0;  // > CustomCode.jszip:5950
    }  // > CustomCode.jszip:5951
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;  // > CustomCode.jszip:5952
    if (flush === Z_FINISH) {  // > CustomCode.jszip:5953
      /*** FLUSH_BLOCK(s, 1); ***/  // > CustomCode.jszip:5954
      flush_block_only(s, true);  // > CustomCode.jszip:5955
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5956
        return BS_FINISH_STARTED;  // > CustomCode.jszip:5957
      }  // > CustomCode.jszip:5958
      /***/  // > CustomCode.jszip:5959
      return BS_FINISH_DONE;  // > CustomCode.jszip:5960
    }  // > CustomCode.jszip:5961
    if (s.last_lit) {  // > CustomCode.jszip:5962
      /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:5963
      flush_block_only(s, false);  // > CustomCode.jszip:5964
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:5965
        return BS_NEED_MORE;  // > CustomCode.jszip:5966
      }  // > CustomCode.jszip:5967
      /***/  // > CustomCode.jszip:5968
    }  // > CustomCode.jszip:5969
    return BS_BLOCK_DONE;  // > CustomCode.jszip:5970
  }  // > CustomCode.jszip:5971
  /* ===========================================================================  // > CustomCode.jszip:5972
   * For Z_RLE, simply look for runs of bytes, generate matches only of distance  // > CustomCode.jszip:5973
   * one.  Do not maintain a hash table.  (It will be regenerated if this run of  // > CustomCode.jszip:5974
   * deflate switches away from Z_RLE.)  // > CustomCode.jszip:5975
   */  // > CustomCode.jszip:5976
  function deflate_rle(s, flush) {  // > CustomCode.jszip:5977
    var bflush;            /* set if current block must be flushed */  // > CustomCode.jszip:5978
    var prev;              /* byte at distance one to match */  // > CustomCode.jszip:5979
    var scan, strend;      /* scan goes up to strend for length of run */  // > CustomCode.jszip:5980
    var _win = s.window;  // > CustomCode.jszip:5981
    for (;;) {  // > CustomCode.jszip:5982
      /* Make sure that we always have enough lookahead, except  // > CustomCode.jszip:5983
       * at the end of the input file. We need MAX_MATCH bytes  // > CustomCode.jszip:5984
       * for the longest run, plus one for the unrolled loop.  // > CustomCode.jszip:5985
       */  // > CustomCode.jszip:5986
      if (s.lookahead <= MAX_MATCH) {  // > CustomCode.jszip:5987
        fill_window(s);  // > CustomCode.jszip:5988
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {  // > CustomCode.jszip:5989
          return BS_NEED_MORE;  // > CustomCode.jszip:5990
        }  // > CustomCode.jszip:5991
        if (s.lookahead === 0) { break; } /* flush the current block */  // > CustomCode.jszip:5992
      }  // > CustomCode.jszip:5993
      /* See how many times the previous byte repeats */  // > CustomCode.jszip:5994
      s.match_length = 0;  // > CustomCode.jszip:5995
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {  // > CustomCode.jszip:5996
        scan = s.strstart - 1;  // > CustomCode.jszip:5997
        prev = _win[scan];  // > CustomCode.jszip:5998
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {  // > CustomCode.jszip:5999
          strend = s.strstart + MAX_MATCH;  // > CustomCode.jszip:6000
          do {  // > CustomCode.jszip:6001
            /*jshint noempty:false*/  // > CustomCode.jszip:6002
          } while (prev === _win[++scan] && prev === _win[++scan] &&  // > CustomCode.jszip:6003
                   prev === _win[++scan] && prev === _win[++scan] &&  // > CustomCode.jszip:6004
                   prev === _win[++scan] && prev === _win[++scan] &&  // > CustomCode.jszip:6005
                   prev === _win[++scan] && prev === _win[++scan] &&  // > CustomCode.jszip:6006
                   scan < strend);  // > CustomCode.jszip:6007
          s.match_length = MAX_MATCH - (strend - scan);  // > CustomCode.jszip:6008
          if (s.match_length > s.lookahead) {  // > CustomCode.jszip:6009
            s.match_length = s.lookahead;  // > CustomCode.jszip:6010
          }  // > CustomCode.jszip:6011
        }  // > CustomCode.jszip:6012
        //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");  // > CustomCode.jszip:6013
      }  // > CustomCode.jszip:6014
      /* Emit match if have run of MIN_MATCH or longer, else emit literal */  // > CustomCode.jszip:6015
      if (s.match_length >= MIN_MATCH) {  // > CustomCode.jszip:6016
        //check_match(s, s.strstart, s.strstart - 1, s.match_length);  // > CustomCode.jszip:6017
        /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/  // > CustomCode.jszip:6018
        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);  // > CustomCode.jszip:6019
        s.lookahead -= s.match_length;  // > CustomCode.jszip:6020
        s.strstart += s.match_length;  // > CustomCode.jszip:6021
        s.match_length = 0;  // > CustomCode.jszip:6022
      } else {  // > CustomCode.jszip:6023
        /* No match, output a literal byte */  // > CustomCode.jszip:6024
        //Tracevv((stderr,"%c", s->window[s->strstart]));  // > CustomCode.jszip:6025
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/  // > CustomCode.jszip:6026
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);  // > CustomCode.jszip:6027
        s.lookahead--;  // > CustomCode.jszip:6028
        s.strstart++;  // > CustomCode.jszip:6029
      }  // > CustomCode.jszip:6030
      if (bflush) {  // > CustomCode.jszip:6031
        /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:6032
        flush_block_only(s, false);  // > CustomCode.jszip:6033
        if (s.strm.avail_out === 0) {  // > CustomCode.jszip:6034
          return BS_NEED_MORE;  // > CustomCode.jszip:6035
        }  // > CustomCode.jszip:6036
        /***/  // > CustomCode.jszip:6037
      }  // > CustomCode.jszip:6038
    }  // > CustomCode.jszip:6039
    s.insert = 0;  // > CustomCode.jszip:6040
    if (flush === Z_FINISH) {  // > CustomCode.jszip:6041
      /*** FLUSH_BLOCK(s, 1); ***/  // > CustomCode.jszip:6042
      flush_block_only(s, true);  // > CustomCode.jszip:6043
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:6044
        return BS_FINISH_STARTED;  // > CustomCode.jszip:6045
      }  // > CustomCode.jszip:6046
      /***/  // > CustomCode.jszip:6047
      return BS_FINISH_DONE;  // > CustomCode.jszip:6048
    }  // > CustomCode.jszip:6049
    if (s.last_lit) {  // > CustomCode.jszip:6050
      /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:6051
      flush_block_only(s, false);  // > CustomCode.jszip:6052
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:6053
        return BS_NEED_MORE;  // > CustomCode.jszip:6054
      }  // > CustomCode.jszip:6055
      /***/  // > CustomCode.jszip:6056
    }  // > CustomCode.jszip:6057
    return BS_BLOCK_DONE;  // > CustomCode.jszip:6058
  }  // > CustomCode.jszip:6059
  /* ===========================================================================  // > CustomCode.jszip:6060
   * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.  // > CustomCode.jszip:6061
   * (It will be regenerated if this run of deflate switches away from Huffman.)  // > CustomCode.jszip:6062
   */  // > CustomCode.jszip:6063
  function deflate_huff(s, flush) {  // > CustomCode.jszip:6064
    var bflush;             /* set if current block must be flushed */  // > CustomCode.jszip:6065
    for (;;) {  // > CustomCode.jszip:6066
      /* Make sure that we have a literal to write. */  // > CustomCode.jszip:6067
      if (s.lookahead === 0) {  // > CustomCode.jszip:6068
        fill_window(s);  // > CustomCode.jszip:6069
        if (s.lookahead === 0) {  // > CustomCode.jszip:6070
          if (flush === Z_NO_FLUSH) {  // > CustomCode.jszip:6071
            return BS_NEED_MORE;  // > CustomCode.jszip:6072
          }  // > CustomCode.jszip:6073
          break;      /* flush the current block */  // > CustomCode.jszip:6074
        }  // > CustomCode.jszip:6075
      }  // > CustomCode.jszip:6076
      /* Output a literal byte */  // > CustomCode.jszip:6077
      s.match_length = 0;  // > CustomCode.jszip:6078
      //Tracevv((stderr,"%c", s->window[s->strstart]));  // > CustomCode.jszip:6079
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/  // > CustomCode.jszip:6080
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);  // > CustomCode.jszip:6081
      s.lookahead--;  // > CustomCode.jszip:6082
      s.strstart++;  // > CustomCode.jszip:6083
      if (bflush) {  // > CustomCode.jszip:6084
        /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:6085
        flush_block_only(s, false);  // > CustomCode.jszip:6086
        if (s.strm.avail_out === 0) {  // > CustomCode.jszip:6087
          return BS_NEED_MORE;  // > CustomCode.jszip:6088
        }  // > CustomCode.jszip:6089
        /***/  // > CustomCode.jszip:6090
      }  // > CustomCode.jszip:6091
    }  // > CustomCode.jszip:6092
    s.insert = 0;  // > CustomCode.jszip:6093
    if (flush === Z_FINISH) {  // > CustomCode.jszip:6094
      /*** FLUSH_BLOCK(s, 1); ***/  // > CustomCode.jszip:6095
      flush_block_only(s, true);  // > CustomCode.jszip:6096
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:6097
        return BS_FINISH_STARTED;  // > CustomCode.jszip:6098
      }  // > CustomCode.jszip:6099
      /***/  // > CustomCode.jszip:6100
      return BS_FINISH_DONE;  // > CustomCode.jszip:6101
    }  // > CustomCode.jszip:6102
    if (s.last_lit) {  // > CustomCode.jszip:6103
      /*** FLUSH_BLOCK(s, 0); ***/  // > CustomCode.jszip:6104
      flush_block_only(s, false);  // > CustomCode.jszip:6105
      if (s.strm.avail_out === 0) {  // > CustomCode.jszip:6106
        return BS_NEED_MORE;  // > CustomCode.jszip:6107
      }  // > CustomCode.jszip:6108
      /***/  // > CustomCode.jszip:6109
    }  // > CustomCode.jszip:6110
    return BS_BLOCK_DONE;  // > CustomCode.jszip:6111
  }  // > CustomCode.jszip:6112
  /* Values for max_lazy_match, good_match and max_chain_length, depending on  // > CustomCode.jszip:6113
   * the desired pack level (0..9). The values given below have been tuned to  // > CustomCode.jszip:6114
   * exclude worst case performance for pathological files. Better values may be  // > CustomCode.jszip:6115
   * found for specific files.  // > CustomCode.jszip:6116
   */  // > CustomCode.jszip:6117
  function Config(good_length, max_lazy, nice_length, max_chain, func) {  // > CustomCode.jszip:6118
    this.good_length = good_length;  // > CustomCode.jszip:6119
    this.max_lazy = max_lazy;  // > CustomCode.jszip:6120
    this.nice_length = nice_length;  // > CustomCode.jszip:6121
    this.max_chain = max_chain;  // > CustomCode.jszip:6122
    this.func = func;  // > CustomCode.jszip:6123
  }  // > CustomCode.jszip:6124
  var configuration_table;  // > CustomCode.jszip:6125
  configuration_table = [  // > CustomCode.jszip:6126
    /*      good lazy nice chain */  // > CustomCode.jszip:6127
    new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */  // > CustomCode.jszip:6128
    new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */  // > CustomCode.jszip:6129
    new Config(4, 5, 16, 8, deflate_fast),           /* 2 */  // > CustomCode.jszip:6130
    new Config(4, 6, 32, 32, deflate_fast),          /* 3 */  // > CustomCode.jszip:6131
    new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */  // > CustomCode.jszip:6132
    new Config(8, 16, 32, 32, deflate_slow),         /* 5 */  // > CustomCode.jszip:6133
    new Config(8, 16, 128, 128, deflate_slow),       /* 6 */  // > CustomCode.jszip:6134
    new Config(8, 32, 128, 256, deflate_slow),       /* 7 */  // > CustomCode.jszip:6135
    new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */  // > CustomCode.jszip:6136
    new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */  // > CustomCode.jszip:6137
  ];  // > CustomCode.jszip:6138
  /* ===========================================================================  // > CustomCode.jszip:6139
   * Initialize the "longest match" routines for a new zlib stream  // > CustomCode.jszip:6140
   */  // > CustomCode.jszip:6141
  function lm_init(s) {  // > CustomCode.jszip:6142
    s.window_size = 2 * s.w_size;  // > CustomCode.jszip:6143
    /*** CLEAR_HASH(s); ***/  // > CustomCode.jszip:6144
    zero(s.head); // Fill with NIL (= 0);  // > CustomCode.jszip:6145
    /* Set the default configuration parameters:  // > CustomCode.jszip:6146
     */  // > CustomCode.jszip:6147
    s.max_lazy_match = configuration_table[s.level].max_lazy;  // > CustomCode.jszip:6148
    s.good_match = configuration_table[s.level].good_length;  // > CustomCode.jszip:6149
    s.nice_match = configuration_table[s.level].nice_length;  // > CustomCode.jszip:6150
    s.max_chain_length = configuration_table[s.level].max_chain;  // > CustomCode.jszip:6151
    s.strstart = 0;  // > CustomCode.jszip:6152
    s.block_start = 0;  // > CustomCode.jszip:6153
    s.lookahead = 0;  // > CustomCode.jszip:6154
    s.insert = 0;  // > CustomCode.jszip:6155
    s.match_length = s.prev_length = MIN_MATCH - 1;  // > CustomCode.jszip:6156
    s.match_available = 0;  // > CustomCode.jszip:6157
    s.ins_h = 0;  // > CustomCode.jszip:6158
  }  // > CustomCode.jszip:6159
  function DeflateState() {  // > CustomCode.jszip:6160
    this.strm = null;            /* pointer back to this zlib stream */  // > CustomCode.jszip:6161
    this.status = 0;            /* as the name implies */  // > CustomCode.jszip:6162
    this.pending_buf = null;      /* output still pending */  // > CustomCode.jszip:6163
    this.pending_buf_size = 0;  /* size of pending_buf */  // > CustomCode.jszip:6164
    this.pending_out = 0;       /* next pending byte to output to the stream */  // > CustomCode.jszip:6165
    this.pending = 0;           /* nb of bytes in the pending buffer */  // > CustomCode.jszip:6166
    this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */  // > CustomCode.jszip:6167
    this.gzhead = null;         /* gzip header information to write */  // > CustomCode.jszip:6168
    this.gzindex = 0;           /* where in extra, name, or comment */  // > CustomCode.jszip:6169
    this.method = Z_DEFLATED; /* can only be DEFLATED */  // > CustomCode.jszip:6170
    this.last_flush = -1;   /* value of flush param for previous deflate call */  // > CustomCode.jszip:6171
    this.w_size = 0;  /* LZ77 window size (32K by default) */  // > CustomCode.jszip:6172
    this.w_bits = 0;  /* log2(w_size)  (8..16) */  // > CustomCode.jszip:6173
    this.w_mask = 0;  /* w_size - 1 */  // > CustomCode.jszip:6174
    this.window = null;  // > CustomCode.jszip:6175
    /* Sliding window. Input bytes are read into the second half of the window,  // > CustomCode.jszip:6176
     * and move to the first half later to keep a dictionary of at least wSize  // > CustomCode.jszip:6177
     * bytes. With this organization, matches are limited to a distance of  // > CustomCode.jszip:6178
     * wSize-MAX_MATCH bytes, but this ensures that IO is always  // > CustomCode.jszip:6179
     * performed with a length multiple of the block size.  // > CustomCode.jszip:6180
     */  // > CustomCode.jszip:6181
    this.window_size = 0;  // > CustomCode.jszip:6182
    /* Actual size of window: 2*wSize, except when the user input buffer  // > CustomCode.jszip:6183
     * is directly used as sliding window.  // > CustomCode.jszip:6184
     */  // > CustomCode.jszip:6185
    this.prev = null;  // > CustomCode.jszip:6186
    /* Link to older string with same hash index. To limit the size of this  // > CustomCode.jszip:6187
     * array to 64K, this link is maintained only for the last 32K strings.  // > CustomCode.jszip:6188
     * An index in this array is thus a window index modulo 32K.  // > CustomCode.jszip:6189
     */  // > CustomCode.jszip:6190
    this.head = null;   /* Heads of the hash chains or NIL. */  // > CustomCode.jszip:6191
    this.ins_h = 0;       /* hash index of string to be inserted */  // > CustomCode.jszip:6192
    this.hash_size = 0;   /* number of elements in hash table */  // > CustomCode.jszip:6193
    this.hash_bits = 0;   /* log2(hash_size) */  // > CustomCode.jszip:6194
    this.hash_mask = 0;   /* hash_size-1 */  // > CustomCode.jszip:6195
    this.hash_shift = 0;  // > CustomCode.jszip:6196
    /* Number of bits by which ins_h must be shifted at each input  // > CustomCode.jszip:6197
     * step. It must be such that after MIN_MATCH steps, the oldest  // > CustomCode.jszip:6198
     * byte no longer takes part in the hash key, that is:  // > CustomCode.jszip:6199
     *   hash_shift * MIN_MATCH >= hash_bits  // > CustomCode.jszip:6200
     */  // > CustomCode.jszip:6201
    this.block_start = 0;  // > CustomCode.jszip:6202
    /* Window position at the beginning of the current output block. Gets  // > CustomCode.jszip:6203
     * negative when the window is moved backwards.  // > CustomCode.jszip:6204
     */  // > CustomCode.jszip:6205
    this.match_length = 0;      /* length of best match */  // > CustomCode.jszip:6206
    this.prev_match = 0;        /* previous match */  // > CustomCode.jszip:6207
    this.match_available = 0;   /* set if previous match exists */  // > CustomCode.jszip:6208
    this.strstart = 0;          /* start of string to insert */  // > CustomCode.jszip:6209
    this.match_start = 0;       /* start of matching string */  // > CustomCode.jszip:6210
    this.lookahead = 0;         /* number of valid bytes ahead in window */  // > CustomCode.jszip:6211
    this.prev_length = 0;  // > CustomCode.jszip:6212
    /* Length of the best match at previous step. Matches not greater than this  // > CustomCode.jszip:6213
     * are discarded. This is used in the lazy match evaluation.  // > CustomCode.jszip:6214
     */  // > CustomCode.jszip:6215
    this.max_chain_length = 0;  // > CustomCode.jszip:6216
    /* To speed up deflation, hash chains are never searched beyond this  // > CustomCode.jszip:6217
     * length.  A higher limit improves compression ratio but degrades the  // > CustomCode.jszip:6218
     * speed.  // > CustomCode.jszip:6219
     */  // > CustomCode.jszip:6220
    this.max_lazy_match = 0;  // > CustomCode.jszip:6221
    /* Attempt to find a better match only when the current match is strictly  // > CustomCode.jszip:6222
     * smaller than this value. This mechanism is used only for compression  // > CustomCode.jszip:6223
     * levels >= 4.  // > CustomCode.jszip:6224
     */  // > CustomCode.jszip:6225
    // That's alias to max_lazy_match, don't use directly  // > CustomCode.jszip:6226
    //this.max_insert_length = 0;  // > CustomCode.jszip:6227
    /* Insert new strings in the hash table only if the match length is not  // > CustomCode.jszip:6228
     * greater than this length. This saves time but degrades compression.  // > CustomCode.jszip:6229
     * max_insert_length is used only for compression levels <= 3.  // > CustomCode.jszip:6230
     */  // > CustomCode.jszip:6231
    this.level = 0;     /* compression level (1..9) */  // > CustomCode.jszip:6232
    this.strategy = 0;  /* favor or force Huffman coding*/  // > CustomCode.jszip:6233
    this.good_match = 0;  // > CustomCode.jszip:6234
    /* Use a faster search when the previous match is longer than this */  // > CustomCode.jszip:6235
    this.nice_match = 0; /* Stop searching when current match exceeds this */  // > CustomCode.jszip:6236
                /* used by trees.c: */  // > CustomCode.jszip:6237
    /* Didn't use ct_data typedef below to suppress compiler warning */  // > CustomCode.jszip:6238
    // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */  // > CustomCode.jszip:6239
    // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */  // > CustomCode.jszip:6240
    // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */  // > CustomCode.jszip:6241
    // Use flat array of DOUBLE size, with interleaved fata,  // > CustomCode.jszip:6242
    // because JS does not support effective  // > CustomCode.jszip:6243
    this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);  // > CustomCode.jszip:6244
    this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);  // > CustomCode.jszip:6245
    this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);  // > CustomCode.jszip:6246
    zero(this.dyn_ltree);  // > CustomCode.jszip:6247
    zero(this.dyn_dtree);  // > CustomCode.jszip:6248
    zero(this.bl_tree);  // > CustomCode.jszip:6249
    this.l_desc   = null;         /* desc. for literal tree */  // > CustomCode.jszip:6250
    this.d_desc   = null;         /* desc. for distance tree */  // > CustomCode.jszip:6251
    this.bl_desc  = null;         /* desc. for bit length tree */  // > CustomCode.jszip:6252
    //ush bl_count[MAX_BITS+1];  // > CustomCode.jszip:6253
    this.bl_count = new utils.Buf16(MAX_BITS + 1);  // > CustomCode.jszip:6254
    /* number of codes at each bit length for an optimal tree */  // > CustomCode.jszip:6255
    //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */  // > CustomCode.jszip:6256
    this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */  // > CustomCode.jszip:6257
    zero(this.heap);  // > CustomCode.jszip:6258
    this.heap_len = 0;               /* number of elements in the heap */  // > CustomCode.jszip:6259
    this.heap_max = 0;               /* element of largest frequency */  // > CustomCode.jszip:6260
    /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.  // > CustomCode.jszip:6261
     * The same heap array is used to build all trees.  // > CustomCode.jszip:6262
     */  // > CustomCode.jszip:6263
    this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];  // > CustomCode.jszip:6264
    zero(this.depth);  // > CustomCode.jszip:6265
    /* Depth of each subtree used as tie breaker for trees of equal frequency  // > CustomCode.jszip:6266
     */  // > CustomCode.jszip:6267
    this.l_buf = 0;          /* buffer index for literals or lengths */  // > CustomCode.jszip:6268
    this.lit_bufsize = 0;  // > CustomCode.jszip:6269
    /* Size of match buffer for literals/lengths.  There are 4 reasons for  // > CustomCode.jszip:6270
     * limiting lit_bufsize to 64K:  // > CustomCode.jszip:6271
     *   - frequencies can be kept in 16 bit counters  // > CustomCode.jszip:6272
     *   - if compression is not successful for the first block, all input  // > CustomCode.jszip:6273
     *     data is still in the window so we can still emit a stored block even  // > CustomCode.jszip:6274
     *     when input comes from standard input.  (This can also be done for  // > CustomCode.jszip:6275
     *     all blocks if lit_bufsize is not greater than 32K.)  // > CustomCode.jszip:6276
     *   - if compression is not successful for a file smaller than 64K, we can  // > CustomCode.jszip:6277
     *     even emit a stored file instead of a stored block (saving 5 bytes).  // > CustomCode.jszip:6278
     *     This is applicable only for zip (not gzip or zlib).  // > CustomCode.jszip:6279
     *   - creating new Huffman trees less frequently may not provide fast  // > CustomCode.jszip:6280
     *     adaptation to changes in the input data statistics. (Take for  // > CustomCode.jszip:6281
     *     example a binary file with poorly compressible code followed by  // > CustomCode.jszip:6282
     *     a highly compressible string table.) Smaller buffer sizes give  // > CustomCode.jszip:6283
     *     fast adaptation but have of course the overhead of transmitting  // > CustomCode.jszip:6284
     *     trees more frequently.  // > CustomCode.jszip:6285
     *   - I can't count above 4  // > CustomCode.jszip:6286
     */  // > CustomCode.jszip:6287
    this.last_lit = 0;      /* running index in l_buf */  // > CustomCode.jszip:6288
    this.d_buf = 0;  // > CustomCode.jszip:6289
    /* Buffer index for distances. To simplify the code, d_buf and l_buf have  // > CustomCode.jszip:6290
     * the same number of elements. To use different lengths, an extra flag  // > CustomCode.jszip:6291
     * array would be necessary.  // > CustomCode.jszip:6292
     */  // > CustomCode.jszip:6293
    this.opt_len = 0;       /* bit length of current block with optimal trees */  // > CustomCode.jszip:6294
    this.static_len = 0;    /* bit length of current block with static trees */  // > CustomCode.jszip:6295
    this.matches = 0;       /* number of string matches in current block */  // > CustomCode.jszip:6296
    this.insert = 0;        /* bytes at end of window left to insert */  // > CustomCode.jszip:6297
    this.bi_buf = 0;  // > CustomCode.jszip:6298
    /* Output buffer. bits are inserted starting at the bottom (least  // > CustomCode.jszip:6299
     * significant bits).  // > CustomCode.jszip:6300
     */  // > CustomCode.jszip:6301
    this.bi_valid = 0;  // > CustomCode.jszip:6302
    /* Number of valid bits in bi_buf.  All bits above the last valid bit  // > CustomCode.jszip:6303
     * are always zero.  // > CustomCode.jszip:6304
     */  // > CustomCode.jszip:6305
    // Used for window memory init. We safely ignore it for JS. That makes  // > CustomCode.jszip:6306
    // sense only for pointers and memory check tools.  // > CustomCode.jszip:6307
    //this.high_water = 0;  // > CustomCode.jszip:6308
    /* High water mark offset in window for initialized bytes -- bytes above  // > CustomCode.jszip:6309
     * this are set to zero in order to avoid memory check warnings when  // > CustomCode.jszip:6310
     * longest match routines access bytes past the input.  This is then  // > CustomCode.jszip:6311
     * updated to the new high water mark.  // > CustomCode.jszip:6312
     */  // > CustomCode.jszip:6313
  }  // > CustomCode.jszip:6314
  function deflateResetKeep(strm) {  // > CustomCode.jszip:6315
    var s;  // > CustomCode.jszip:6316
    if (!strm || !strm.state) {  // > CustomCode.jszip:6317
      return err(strm, Z_STREAM_ERROR);  // > CustomCode.jszip:6318
    }  // > CustomCode.jszip:6319
    strm.total_in = strm.total_out = 0;  // > CustomCode.jszip:6320
    strm.data_type = Z_UNKNOWN;  // > CustomCode.jszip:6321
    s = strm.state;  // > CustomCode.jszip:6322
    s.pending = 0;  // > CustomCode.jszip:6323
    s.pending_out = 0;  // > CustomCode.jszip:6324
    if (s.wrap < 0) {  // > CustomCode.jszip:6325
      s.wrap = -s.wrap;  // > CustomCode.jszip:6326
      /* was made negative by deflate(..., Z_FINISH); */  // > CustomCode.jszip:6327
    }  // > CustomCode.jszip:6328
    s.status = (s.wrap ? INIT_STATE : BUSY_STATE);  // > CustomCode.jszip:6329
    strm.adler = (s.wrap === 2) ?  // > CustomCode.jszip:6330
      0  // crc32(0, Z_NULL, 0)  // > CustomCode.jszip:6331
    :  // > CustomCode.jszip:6332
      1; // adler32(0, Z_NULL, 0)  // > CustomCode.jszip:6333
    s.last_flush = Z_NO_FLUSH;  // > CustomCode.jszip:6334
    trees._tr_init(s);  // > CustomCode.jszip:6335
    return Z_OK;  // > CustomCode.jszip:6336
  }  // > CustomCode.jszip:6337
  function deflateReset(strm) {  // > CustomCode.jszip:6338
    var ret = deflateResetKeep(strm);  // > CustomCode.jszip:6339
    if (ret === Z_OK) {  // > CustomCode.jszip:6340
      lm_init(strm.state);  // > CustomCode.jszip:6341
    }  // > CustomCode.jszip:6342
    return ret;  // > CustomCode.jszip:6343
  }  // > CustomCode.jszip:6344
  function deflateSetHeader(strm, head) {  // > CustomCode.jszip:6345
    if (!strm || !strm.state) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:6346
    if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:6347
    strm.state.gzhead = head;  // > CustomCode.jszip:6348
    return Z_OK;  // > CustomCode.jszip:6349
  }  // > CustomCode.jszip:6350
  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {  // > CustomCode.jszip:6351
    if (!strm) { // === Z_NULL  // > CustomCode.jszip:6352
      return Z_STREAM_ERROR;  // > CustomCode.jszip:6353
    }  // > CustomCode.jszip:6354
    var wrap = 1;  // > CustomCode.jszip:6355
    if (level === Z_DEFAULT_COMPRESSION) {  // > CustomCode.jszip:6356
      level = 6;  // > CustomCode.jszip:6357
    }  // > CustomCode.jszip:6358
    if (windowBits < 0) { /* suppress zlib wrapper */  // > CustomCode.jszip:6359
      wrap = 0;  // > CustomCode.jszip:6360
      windowBits = -windowBits;  // > CustomCode.jszip:6361
    }  // > CustomCode.jszip:6362
    else if (windowBits > 15) {  // > CustomCode.jszip:6363
      wrap = 2;           /* write gzip wrapper instead */  // > CustomCode.jszip:6364
      windowBits -= 16;  // > CustomCode.jszip:6365
    }  // > CustomCode.jszip:6366
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||  // > CustomCode.jszip:6367
      windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||  // > CustomCode.jszip:6368
      strategy < 0 || strategy > Z_FIXED) {  // > CustomCode.jszip:6369
      return err(strm, Z_STREAM_ERROR);  // > CustomCode.jszip:6370
    }  // > CustomCode.jszip:6371
    if (windowBits === 8) {  // > CustomCode.jszip:6372
      windowBits = 9;  // > CustomCode.jszip:6373
    }  // > CustomCode.jszip:6374
    /* until 256-byte window bug fixed */  // > CustomCode.jszip:6375
    var s = new DeflateState();  // > CustomCode.jszip:6376
    strm.state = s;  // > CustomCode.jszip:6377
    s.strm = strm;  // > CustomCode.jszip:6378
    s.wrap = wrap;  // > CustomCode.jszip:6379
    s.gzhead = null;  // > CustomCode.jszip:6380
    s.w_bits = windowBits;  // > CustomCode.jszip:6381
    s.w_size = 1 << s.w_bits;  // > CustomCode.jszip:6382
    s.w_mask = s.w_size - 1;  // > CustomCode.jszip:6383
    s.hash_bits = memLevel + 7;  // > CustomCode.jszip:6384
    s.hash_size = 1 << s.hash_bits;  // > CustomCode.jszip:6385
    s.hash_mask = s.hash_size - 1;  // > CustomCode.jszip:6386
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);  // > CustomCode.jszip:6387
    s.window = new utils.Buf8(s.w_size * 2);  // > CustomCode.jszip:6388
    s.head = new utils.Buf16(s.hash_size);  // > CustomCode.jszip:6389
    s.prev = new utils.Buf16(s.w_size);  // > CustomCode.jszip:6390
    // Don't need mem init magic for JS.  // > CustomCode.jszip:6391
    //s.high_water = 0;  /* nothing written to s->window yet */  // > CustomCode.jszip:6392
    s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */  // > CustomCode.jszip:6393
    s.pending_buf_size = s.lit_bufsize * 4;  // > CustomCode.jszip:6394
    //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);  // > CustomCode.jszip:6395
    //s->pending_buf = (uchf *) overlay;  // > CustomCode.jszip:6396
    s.pending_buf = new utils.Buf8(s.pending_buf_size);  // > CustomCode.jszip:6397
    // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)  // > CustomCode.jszip:6398
    //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);  // > CustomCode.jszip:6399
    s.d_buf = 1 * s.lit_bufsize;  // > CustomCode.jszip:6400
    //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;  // > CustomCode.jszip:6401
    s.l_buf = (1 + 2) * s.lit_bufsize;  // > CustomCode.jszip:6402
    s.level = level;  // > CustomCode.jszip:6403
    s.strategy = strategy;  // > CustomCode.jszip:6404
    s.method = method;  // > CustomCode.jszip:6405
    return deflateReset(strm);  // > CustomCode.jszip:6406
  }  // > CustomCode.jszip:6407
  function deflateInit(strm, level) {  // > CustomCode.jszip:6408
    return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);  // > CustomCode.jszip:6409
  }  // > CustomCode.jszip:6410
  function deflate(strm, flush) {  // > CustomCode.jszip:6411
    var old_flush, s;  // > CustomCode.jszip:6412
    var beg, val; // for gzip header write only  // > CustomCode.jszip:6413
    if (!strm || !strm.state ||  // > CustomCode.jszip:6414
      flush > Z_BLOCK || flush < 0) {  // > CustomCode.jszip:6415
      return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;  // > CustomCode.jszip:6416
    }  // > CustomCode.jszip:6417
    s = strm.state;  // > CustomCode.jszip:6418
    if (!strm.output ||  // > CustomCode.jszip:6419
        (!strm.input && strm.avail_in !== 0) ||  // > CustomCode.jszip:6420
        (s.status === FINISH_STATE && flush !== Z_FINISH)) {  // > CustomCode.jszip:6421
      return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);  // > CustomCode.jszip:6422
    }  // > CustomCode.jszip:6423
    s.strm = strm; /* just in case */  // > CustomCode.jszip:6424
    old_flush = s.last_flush;  // > CustomCode.jszip:6425
    s.last_flush = flush;  // > CustomCode.jszip:6426
    /* Write the header */  // > CustomCode.jszip:6427
    if (s.status === INIT_STATE) {  // > CustomCode.jszip:6428
      if (s.wrap === 2) { // GZIP header  // > CustomCode.jszip:6429
        strm.adler = 0;  //crc32(0L, Z_NULL, 0);  // > CustomCode.jszip:6430
        put_byte(s, 31);  // > CustomCode.jszip:6431
        put_byte(s, 139);  // > CustomCode.jszip:6432
        put_byte(s, 8);  // > CustomCode.jszip:6433
        if (!s.gzhead) { // s->gzhead == Z_NULL  // > CustomCode.jszip:6434
          put_byte(s, 0);  // > CustomCode.jszip:6435
          put_byte(s, 0);  // > CustomCode.jszip:6436
          put_byte(s, 0);  // > CustomCode.jszip:6437
          put_byte(s, 0);  // > CustomCode.jszip:6438
          put_byte(s, 0);  // > CustomCode.jszip:6439
          put_byte(s, s.level === 9 ? 2 :  // > CustomCode.jszip:6440
                      (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?  // > CustomCode.jszip:6441
                       4 : 0));  // > CustomCode.jszip:6442
          put_byte(s, OS_CODE);  // > CustomCode.jszip:6443
          s.status = BUSY_STATE;  // > CustomCode.jszip:6444
        }  // > CustomCode.jszip:6445
        else {  // > CustomCode.jszip:6446
          put_byte(s, (s.gzhead.text ? 1 : 0) +  // > CustomCode.jszip:6447
                      (s.gzhead.hcrc ? 2 : 0) +  // > CustomCode.jszip:6448
                      (!s.gzhead.extra ? 0 : 4) +  // > CustomCode.jszip:6449
                      (!s.gzhead.name ? 0 : 8) +  // > CustomCode.jszip:6450
                      (!s.gzhead.comment ? 0 : 16)  // > CustomCode.jszip:6451
                  );  // > CustomCode.jszip:6452
          put_byte(s, s.gzhead.time & 0xff);  // > CustomCode.jszip:6453
          put_byte(s, (s.gzhead.time >> 8) & 0xff);  // > CustomCode.jszip:6454
          put_byte(s, (s.gzhead.time >> 16) & 0xff);  // > CustomCode.jszip:6455
          put_byte(s, (s.gzhead.time >> 24) & 0xff);  // > CustomCode.jszip:6456
          put_byte(s, s.level === 9 ? 2 :  // > CustomCode.jszip:6457
                      (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?  // > CustomCode.jszip:6458
                       4 : 0));  // > CustomCode.jszip:6459
          put_byte(s, s.gzhead.os & 0xff);  // > CustomCode.jszip:6460
          if (s.gzhead.extra && s.gzhead.extra.length) {  // > CustomCode.jszip:6461
            put_byte(s, s.gzhead.extra.length & 0xff);  // > CustomCode.jszip:6462
            put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);  // > CustomCode.jszip:6463
          }  // > CustomCode.jszip:6464
          if (s.gzhead.hcrc) {  // > CustomCode.jszip:6465
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);  // > CustomCode.jszip:6466
          }  // > CustomCode.jszip:6467
          s.gzindex = 0;  // > CustomCode.jszip:6468
          s.status = EXTRA_STATE;  // > CustomCode.jszip:6469
        }  // > CustomCode.jszip:6470
      }  // > CustomCode.jszip:6471
      else // DEFLATE header  // > CustomCode.jszip:6472
      {  // > CustomCode.jszip:6473
        var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;  // > CustomCode.jszip:6474
        var level_flags = -1;  // > CustomCode.jszip:6475
        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {  // > CustomCode.jszip:6476
          level_flags = 0;  // > CustomCode.jszip:6477
        } else if (s.level < 6) {  // > CustomCode.jszip:6478
          level_flags = 1;  // > CustomCode.jszip:6479
        } else if (s.level === 6) {  // > CustomCode.jszip:6480
          level_flags = 2;  // > CustomCode.jszip:6481
        } else {  // > CustomCode.jszip:6482
          level_flags = 3;  // > CustomCode.jszip:6483
        }  // > CustomCode.jszip:6484
        header |= (level_flags << 6);  // > CustomCode.jszip:6485
        if (s.strstart !== 0) { header |= PRESET_DICT; }  // > CustomCode.jszip:6486
        header += 31 - (header % 31);  // > CustomCode.jszip:6487
        s.status = BUSY_STATE;  // > CustomCode.jszip:6488
        putShortMSB(s, header);  // > CustomCode.jszip:6489
        /* Save the adler32 of the preset dictionary: */  // > CustomCode.jszip:6490
        if (s.strstart !== 0) {  // > CustomCode.jszip:6491
          putShortMSB(s, strm.adler >>> 16);  // > CustomCode.jszip:6492
          putShortMSB(s, strm.adler & 0xffff);  // > CustomCode.jszip:6493
        }  // > CustomCode.jszip:6494
        strm.adler = 1; // adler32(0L, Z_NULL, 0);  // > CustomCode.jszip:6495
      }  // > CustomCode.jszip:6496
    }  // > CustomCode.jszip:6497
  //#ifdef GZIP  // > CustomCode.jszip:6498
    if (s.status === EXTRA_STATE) {  // > CustomCode.jszip:6499
      if (s.gzhead.extra/* != Z_NULL*/) {  // > CustomCode.jszip:6500
        beg = s.pending;  /* start of bytes to update crc */  // > CustomCode.jszip:6501
        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {  // > CustomCode.jszip:6502
          if (s.pending === s.pending_buf_size) {  // > CustomCode.jszip:6503
            if (s.gzhead.hcrc && s.pending > beg) {  // > CustomCode.jszip:6504
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);  // > CustomCode.jszip:6505
            }  // > CustomCode.jszip:6506
            flush_pending(strm);  // > CustomCode.jszip:6507
            beg = s.pending;  // > CustomCode.jszip:6508
            if (s.pending === s.pending_buf_size) {  // > CustomCode.jszip:6509
              break;  // > CustomCode.jszip:6510
            }  // > CustomCode.jszip:6511
          }  // > CustomCode.jszip:6512
          put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);  // > CustomCode.jszip:6513
          s.gzindex++;  // > CustomCode.jszip:6514
        }  // > CustomCode.jszip:6515
        if (s.gzhead.hcrc && s.pending > beg) {  // > CustomCode.jszip:6516
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);  // > CustomCode.jszip:6517
        }  // > CustomCode.jszip:6518
        if (s.gzindex === s.gzhead.extra.length) {  // > CustomCode.jszip:6519
          s.gzindex = 0;  // > CustomCode.jszip:6520
          s.status = NAME_STATE;  // > CustomCode.jszip:6521
        }  // > CustomCode.jszip:6522
      }  // > CustomCode.jszip:6523
      else {  // > CustomCode.jszip:6524
        s.status = NAME_STATE;  // > CustomCode.jszip:6525
      }  // > CustomCode.jszip:6526
    }  // > CustomCode.jszip:6527
    if (s.status === NAME_STATE) {  // > CustomCode.jszip:6528
      if (s.gzhead.name/* != Z_NULL*/) {  // > CustomCode.jszip:6529
        beg = s.pending;  /* start of bytes to update crc */  // > CustomCode.jszip:6530
        //int val;  // > CustomCode.jszip:6531
        do {  // > CustomCode.jszip:6532
          if (s.pending === s.pending_buf_size) {  // > CustomCode.jszip:6533
            if (s.gzhead.hcrc && s.pending > beg) {  // > CustomCode.jszip:6534
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);  // > CustomCode.jszip:6535
            }  // > CustomCode.jszip:6536
            flush_pending(strm);  // > CustomCode.jszip:6537
            beg = s.pending;  // > CustomCode.jszip:6538
            if (s.pending === s.pending_buf_size) {  // > CustomCode.jszip:6539
              val = 1;  // > CustomCode.jszip:6540
              break;  // > CustomCode.jszip:6541
            }  // > CustomCode.jszip:6542
          }  // > CustomCode.jszip:6543
          // JS specific: little magic to add zero terminator to end of string  // > CustomCode.jszip:6544
          if (s.gzindex < s.gzhead.name.length) {  // > CustomCode.jszip:6545
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;  // > CustomCode.jszip:6546
          } else {  // > CustomCode.jszip:6547
            val = 0;  // > CustomCode.jszip:6548
          }  // > CustomCode.jszip:6549
          put_byte(s, val);  // > CustomCode.jszip:6550
        } while (val !== 0);  // > CustomCode.jszip:6551
        if (s.gzhead.hcrc && s.pending > beg) {  // > CustomCode.jszip:6552
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);  // > CustomCode.jszip:6553
        }  // > CustomCode.jszip:6554
        if (val === 0) {  // > CustomCode.jszip:6555
          s.gzindex = 0;  // > CustomCode.jszip:6556
          s.status = COMMENT_STATE;  // > CustomCode.jszip:6557
        }  // > CustomCode.jszip:6558
      }  // > CustomCode.jszip:6559
      else {  // > CustomCode.jszip:6560
        s.status = COMMENT_STATE;  // > CustomCode.jszip:6561
      }  // > CustomCode.jszip:6562
    }  // > CustomCode.jszip:6563
    if (s.status === COMMENT_STATE) {  // > CustomCode.jszip:6564
      if (s.gzhead.comment/* != Z_NULL*/) {  // > CustomCode.jszip:6565
        beg = s.pending;  /* start of bytes to update crc */  // > CustomCode.jszip:6566
        //int val;  // > CustomCode.jszip:6567
        do {  // > CustomCode.jszip:6568
          if (s.pending === s.pending_buf_size) {  // > CustomCode.jszip:6569
            if (s.gzhead.hcrc && s.pending > beg) {  // > CustomCode.jszip:6570
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);  // > CustomCode.jszip:6571
            }  // > CustomCode.jszip:6572
            flush_pending(strm);  // > CustomCode.jszip:6573
            beg = s.pending;  // > CustomCode.jszip:6574
            if (s.pending === s.pending_buf_size) {  // > CustomCode.jszip:6575
              val = 1;  // > CustomCode.jszip:6576
              break;  // > CustomCode.jszip:6577
            }  // > CustomCode.jszip:6578
          }  // > CustomCode.jszip:6579
          // JS specific: little magic to add zero terminator to end of string  // > CustomCode.jszip:6580
          if (s.gzindex < s.gzhead.comment.length) {  // > CustomCode.jszip:6581
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;  // > CustomCode.jszip:6582
          } else {  // > CustomCode.jszip:6583
            val = 0;  // > CustomCode.jszip:6584
          }  // > CustomCode.jszip:6585
          put_byte(s, val);  // > CustomCode.jszip:6586
        } while (val !== 0);  // > CustomCode.jszip:6587
        if (s.gzhead.hcrc && s.pending > beg) {  // > CustomCode.jszip:6588
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);  // > CustomCode.jszip:6589
        }  // > CustomCode.jszip:6590
        if (val === 0) {  // > CustomCode.jszip:6591
          s.status = HCRC_STATE;  // > CustomCode.jszip:6592
        }  // > CustomCode.jszip:6593
      }  // > CustomCode.jszip:6594
      else {  // > CustomCode.jszip:6595
        s.status = HCRC_STATE;  // > CustomCode.jszip:6596
      }  // > CustomCode.jszip:6597
    }  // > CustomCode.jszip:6598
    if (s.status === HCRC_STATE) {  // > CustomCode.jszip:6599
      if (s.gzhead.hcrc) {  // > CustomCode.jszip:6600
        if (s.pending + 2 > s.pending_buf_size) {  // > CustomCode.jszip:6601
          flush_pending(strm);  // > CustomCode.jszip:6602
        }  // > CustomCode.jszip:6603
        if (s.pending + 2 <= s.pending_buf_size) {  // > CustomCode.jszip:6604
          put_byte(s, strm.adler & 0xff);  // > CustomCode.jszip:6605
          put_byte(s, (strm.adler >> 8) & 0xff);  // > CustomCode.jszip:6606
          strm.adler = 0; //crc32(0L, Z_NULL, 0);  // > CustomCode.jszip:6607
          s.status = BUSY_STATE;  // > CustomCode.jszip:6608
        }  // > CustomCode.jszip:6609
      }  // > CustomCode.jszip:6610
      else {  // > CustomCode.jszip:6611
        s.status = BUSY_STATE;  // > CustomCode.jszip:6612
      }  // > CustomCode.jszip:6613
    }  // > CustomCode.jszip:6614
  //#endif  // > CustomCode.jszip:6615
    /* Flush as much pending output as possible */  // > CustomCode.jszip:6616
    if (s.pending !== 0) {  // > CustomCode.jszip:6617
      flush_pending(strm);  // > CustomCode.jszip:6618
      if (strm.avail_out === 0) {  // > CustomCode.jszip:6619
        /* Since avail_out is 0, deflate will be called again with  // > CustomCode.jszip:6620
         * more output space, but possibly with both pending and  // > CustomCode.jszip:6621
         * avail_in equal to zero. There won't be anything to do,  // > CustomCode.jszip:6622
         * but this is not an error situation so make sure we  // > CustomCode.jszip:6623
         * return OK instead of BUF_ERROR at next call of deflate:  // > CustomCode.jszip:6624
         */  // > CustomCode.jszip:6625
        s.last_flush = -1;  // > CustomCode.jszip:6626
        return Z_OK;  // > CustomCode.jszip:6627
      }  // > CustomCode.jszip:6628
      /* Make sure there is something to do and avoid duplicate consecutive  // > CustomCode.jszip:6629
       * flushes. For repeated and useless calls with Z_FINISH, we keep  // > CustomCode.jszip:6630
       * returning Z_STREAM_END instead of Z_BUF_ERROR.  // > CustomCode.jszip:6631
       */  // > CustomCode.jszip:6632
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&  // > CustomCode.jszip:6633
      flush !== Z_FINISH) {  // > CustomCode.jszip:6634
      return err(strm, Z_BUF_ERROR);  // > CustomCode.jszip:6635
    }  // > CustomCode.jszip:6636
    /* User must not provide more input after the first FINISH: */  // > CustomCode.jszip:6637
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {  // > CustomCode.jszip:6638
      return err(strm, Z_BUF_ERROR);  // > CustomCode.jszip:6639
    }  // > CustomCode.jszip:6640
    /* Start a new block or continue the current one.  // > CustomCode.jszip:6641
     */  // > CustomCode.jszip:6642
    if (strm.avail_in !== 0 || s.lookahead !== 0 ||  // > CustomCode.jszip:6643
      (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {  // > CustomCode.jszip:6644
      var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :  // > CustomCode.jszip:6645
        (s.strategy === Z_RLE ? deflate_rle(s, flush) :  // > CustomCode.jszip:6646
          configuration_table[s.level].func(s, flush));  // > CustomCode.jszip:6647
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {  // > CustomCode.jszip:6648
        s.status = FINISH_STATE;  // > CustomCode.jszip:6649
      }  // > CustomCode.jszip:6650
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {  // > CustomCode.jszip:6651
        if (strm.avail_out === 0) {  // > CustomCode.jszip:6652
          s.last_flush = -1;  // > CustomCode.jszip:6653
          /* avoid BUF_ERROR next call, see above */  // > CustomCode.jszip:6654
        }  // > CustomCode.jszip:6655
        return Z_OK;  // > CustomCode.jszip:6656
        /* If flush != Z_NO_FLUSH && avail_out == 0, the next call  // > CustomCode.jszip:6657
         * of deflate should use the same flush parameter to make sure  // > CustomCode.jszip:6658
         * that the flush is complete. So we don't have to output an  // > CustomCode.jszip:6659
         * empty block here, this will be done at next call. This also  // > CustomCode.jszip:6660
         * ensures that for a very small output buffer, we emit at most  // > CustomCode.jszip:6661
         * one empty block.  // > CustomCode.jszip:6662
         */  // > CustomCode.jszip:6663
      }  // > CustomCode.jszip:6664
      if (bstate === BS_BLOCK_DONE) {  // > CustomCode.jszip:6665
        if (flush === Z_PARTIAL_FLUSH) {  // > CustomCode.jszip:6666
          trees._tr_align(s);  // > CustomCode.jszip:6667
        }  // > CustomCode.jszip:6668
        else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */  // > CustomCode.jszip:6669
          trees._tr_stored_block(s, 0, 0, false);  // > CustomCode.jszip:6670
          /* For a full flush, this empty block will be recognized  // > CustomCode.jszip:6671
           * as a special marker by inflate_sync().  // > CustomCode.jszip:6672
           */  // > CustomCode.jszip:6673
          if (flush === Z_FULL_FLUSH) {  // > CustomCode.jszip:6674
            /*** CLEAR_HASH(s); ***/             /* forget history */  // > CustomCode.jszip:6675
            zero(s.head); // Fill with NIL (= 0);  // > CustomCode.jszip:6676
            if (s.lookahead === 0) {  // > CustomCode.jszip:6677
              s.strstart = 0;  // > CustomCode.jszip:6678
              s.block_start = 0;  // > CustomCode.jszip:6679
              s.insert = 0;  // > CustomCode.jszip:6680
            }  // > CustomCode.jszip:6681
          }  // > CustomCode.jszip:6682
        }  // > CustomCode.jszip:6683
        flush_pending(strm);  // > CustomCode.jszip:6684
        if (strm.avail_out === 0) {  // > CustomCode.jszip:6685
          s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */  // > CustomCode.jszip:6686
          return Z_OK;  // > CustomCode.jszip:6687
        }  // > CustomCode.jszip:6688
      }  // > CustomCode.jszip:6689
    }  // > CustomCode.jszip:6690
    //Assert(strm->avail_out > 0, "bug2");  // > CustomCode.jszip:6691
    //if (strm.avail_out <= 0) { throw new Error("bug2");}  // > CustomCode.jszip:6692
    if (flush !== Z_FINISH) { return Z_OK; }  // > CustomCode.jszip:6693
    if (s.wrap <= 0) { return Z_STREAM_END; }  // > CustomCode.jszip:6694
    /* Write the trailer */  // > CustomCode.jszip:6695
    if (s.wrap === 2) {  // > CustomCode.jszip:6696
      put_byte(s, strm.adler & 0xff);  // > CustomCode.jszip:6697
      put_byte(s, (strm.adler >> 8) & 0xff);  // > CustomCode.jszip:6698
      put_byte(s, (strm.adler >> 16) & 0xff);  // > CustomCode.jszip:6699
      put_byte(s, (strm.adler >> 24) & 0xff);  // > CustomCode.jszip:6700
      put_byte(s, strm.total_in & 0xff);  // > CustomCode.jszip:6701
      put_byte(s, (strm.total_in >> 8) & 0xff);  // > CustomCode.jszip:6702
      put_byte(s, (strm.total_in >> 16) & 0xff);  // > CustomCode.jszip:6703
      put_byte(s, (strm.total_in >> 24) & 0xff);  // > CustomCode.jszip:6704
    }  // > CustomCode.jszip:6705
    else  // > CustomCode.jszip:6706
    {  // > CustomCode.jszip:6707
      putShortMSB(s, strm.adler >>> 16);  // > CustomCode.jszip:6708
      putShortMSB(s, strm.adler & 0xffff);  // > CustomCode.jszip:6709
    }  // > CustomCode.jszip:6710
    flush_pending(strm);  // > CustomCode.jszip:6711
    /* If avail_out is zero, the application will call deflate again  // > CustomCode.jszip:6712
     * to flush the rest.  // > CustomCode.jszip:6713
     */  // > CustomCode.jszip:6714
    if (s.wrap > 0) { s.wrap = -s.wrap; }  // > CustomCode.jszip:6715
    /* write the trailer only once! */  // > CustomCode.jszip:6716
    return s.pending !== 0 ? Z_OK : Z_STREAM_END;  // > CustomCode.jszip:6717
  }  // > CustomCode.jszip:6718
  function deflateEnd(strm) {  // > CustomCode.jszip:6719
    var status;  // > CustomCode.jszip:6720
    if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {  // > CustomCode.jszip:6721
      return Z_STREAM_ERROR;  // > CustomCode.jszip:6722
    }  // > CustomCode.jszip:6723
    status = strm.state.status;  // > CustomCode.jszip:6724
    if (status !== INIT_STATE &&  // > CustomCode.jszip:6725
      status !== EXTRA_STATE &&  // > CustomCode.jszip:6726
      status !== NAME_STATE &&  // > CustomCode.jszip:6727
      status !== COMMENT_STATE &&  // > CustomCode.jszip:6728
      status !== HCRC_STATE &&  // > CustomCode.jszip:6729
      status !== BUSY_STATE &&  // > CustomCode.jszip:6730
      status !== FINISH_STATE  // > CustomCode.jszip:6731
    ) {  // > CustomCode.jszip:6732
      return err(strm, Z_STREAM_ERROR);  // > CustomCode.jszip:6733
    }  // > CustomCode.jszip:6734
    strm.state = null;  // > CustomCode.jszip:6735
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;  // > CustomCode.jszip:6736
  }  // > CustomCode.jszip:6737
  /* =========================================================================  // > CustomCode.jszip:6738
   * Initializes the compression dictionary from the given byte  // > CustomCode.jszip:6739
   * sequence without producing any compressed output.  // > CustomCode.jszip:6740
   */  // > CustomCode.jszip:6741
  function deflateSetDictionary(strm, dictionary) {  // > CustomCode.jszip:6742
    var dictLength = dictionary.length;  // > CustomCode.jszip:6743
    var s;  // > CustomCode.jszip:6744
    var str, n;  // > CustomCode.jszip:6745
    var wrap;  // > CustomCode.jszip:6746
    var avail;  // > CustomCode.jszip:6747
    var next;  // > CustomCode.jszip:6748
    var input;  // > CustomCode.jszip:6749
    var tmpDict;  // > CustomCode.jszip:6750
    if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {  // > CustomCode.jszip:6751
      return Z_STREAM_ERROR;  // > CustomCode.jszip:6752
    }  // > CustomCode.jszip:6753
    s = strm.state;  // > CustomCode.jszip:6754
    wrap = s.wrap;  // > CustomCode.jszip:6755
    if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {  // > CustomCode.jszip:6756
      return Z_STREAM_ERROR;  // > CustomCode.jszip:6757
    }  // > CustomCode.jszip:6758
    /* when using zlib wrappers, compute Adler-32 for provided dictionary */  // > CustomCode.jszip:6759
    if (wrap === 1) {  // > CustomCode.jszip:6760
      /* adler32(strm->adler, dictionary, dictLength); */  // > CustomCode.jszip:6761
      strm.adler = adler32(strm.adler, dictionary, dictLength, 0);  // > CustomCode.jszip:6762
    }  // > CustomCode.jszip:6763
    s.wrap = 0;   /* avoid computing Adler-32 in read_buf */  // > CustomCode.jszip:6764
    /* if dictionary would fill window, just replace the history */  // > CustomCode.jszip:6765
    if (dictLength >= s.w_size) {  // > CustomCode.jszip:6766
      if (wrap === 0) {            /* already empty otherwise */  // > CustomCode.jszip:6767
        /*** CLEAR_HASH(s); ***/  // > CustomCode.jszip:6768
        zero(s.head); // Fill with NIL (= 0);  // > CustomCode.jszip:6769
        s.strstart = 0;  // > CustomCode.jszip:6770
        s.block_start = 0;  // > CustomCode.jszip:6771
        s.insert = 0;  // > CustomCode.jszip:6772
      }  // > CustomCode.jszip:6773
      /* use the tail */  // > CustomCode.jszip:6774
      // dictionary = dictionary.slice(dictLength - s.w_size);  // > CustomCode.jszip:6775
      tmpDict = new utils.Buf8(s.w_size);  // > CustomCode.jszip:6776
      utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);  // > CustomCode.jszip:6777
      dictionary = tmpDict;  // > CustomCode.jszip:6778
      dictLength = s.w_size;  // > CustomCode.jszip:6779
    }  // > CustomCode.jszip:6780
    /* insert dictionary into window and hash */  // > CustomCode.jszip:6781
    avail = strm.avail_in;  // > CustomCode.jszip:6782
    next = strm.next_in;  // > CustomCode.jszip:6783
    input = strm.input;  // > CustomCode.jszip:6784
    strm.avail_in = dictLength;  // > CustomCode.jszip:6785
    strm.next_in = 0;  // > CustomCode.jszip:6786
    strm.input = dictionary;  // > CustomCode.jszip:6787
    fill_window(s);  // > CustomCode.jszip:6788
    while (s.lookahead >= MIN_MATCH) {  // > CustomCode.jszip:6789
      str = s.strstart;  // > CustomCode.jszip:6790
      n = s.lookahead - (MIN_MATCH - 1);  // > CustomCode.jszip:6791
      do {  // > CustomCode.jszip:6792
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */  // > CustomCode.jszip:6793
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;  // > CustomCode.jszip:6794
        s.prev[str & s.w_mask] = s.head[s.ins_h];  // > CustomCode.jszip:6795
        s.head[s.ins_h] = str;  // > CustomCode.jszip:6796
        str++;  // > CustomCode.jszip:6797
      } while (--n);  // > CustomCode.jszip:6798
      s.strstart = str;  // > CustomCode.jszip:6799
      s.lookahead = MIN_MATCH - 1;  // > CustomCode.jszip:6800
      fill_window(s);  // > CustomCode.jszip:6801
    }  // > CustomCode.jszip:6802
    s.strstart += s.lookahead;  // > CustomCode.jszip:6803
    s.block_start = s.strstart;  // > CustomCode.jszip:6804
    s.insert = s.lookahead;  // > CustomCode.jszip:6805
    s.lookahead = 0;  // > CustomCode.jszip:6806
    s.match_length = s.prev_length = MIN_MATCH - 1;  // > CustomCode.jszip:6807
    s.match_available = 0;  // > CustomCode.jszip:6808
    strm.next_in = next;  // > CustomCode.jszip:6809
    strm.input = input;  // > CustomCode.jszip:6810
    strm.avail_in = avail;  // > CustomCode.jszip:6811
    s.wrap = wrap;  // > CustomCode.jszip:6812
    return Z_OK;  // > CustomCode.jszip:6813
  }  // > CustomCode.jszip:6814
  exports.deflateInit = deflateInit;  // > CustomCode.jszip:6815
  exports.deflateInit2 = deflateInit2;  // > CustomCode.jszip:6816
  exports.deflateReset = deflateReset;  // > CustomCode.jszip:6817
  exports.deflateResetKeep = deflateResetKeep;  // > CustomCode.jszip:6818
  exports.deflateSetHeader = deflateSetHeader;  // > CustomCode.jszip:6819
  exports.deflate = deflate;  // > CustomCode.jszip:6820
  exports.deflateEnd = deflateEnd;  // > CustomCode.jszip:6821
  exports.deflateSetDictionary = deflateSetDictionary;  // > CustomCode.jszip:6822
  exports.deflateInfo = 'pako deflate (from Nodeca project)';  // > CustomCode.jszip:6823
  /* Not implemented  // > CustomCode.jszip:6824
  exports.deflateBound = deflateBound;  // > CustomCode.jszip:6825
  exports.deflateCopy = deflateCopy;  // > CustomCode.jszip:6826
  exports.deflateParams = deflateParams;  // > CustomCode.jszip:6827
  exports.deflatePending = deflatePending;  // > CustomCode.jszip:6828
  exports.deflatePrime = deflatePrime;  // > CustomCode.jszip:6829
  exports.deflateTune = deflateTune;  // > CustomCode.jszip:6830
  */  // > CustomCode.jszip:6831
  },{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(require,module,exports){  // > CustomCode.jszip:6832
  'use strict';  // > CustomCode.jszip:6833
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:6834
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:6835
  //  // > CustomCode.jszip:6836
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:6837
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:6838
  // arising from the use of this software.  // > CustomCode.jszip:6839
  //  // > CustomCode.jszip:6840
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:6841
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:6842
  // freely, subject to the following restrictions:  // > CustomCode.jszip:6843
  //  // > CustomCode.jszip:6844
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:6845
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:6846
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:6847
  //   appreciated but is not required.  // > CustomCode.jszip:6848
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:6849
  //   misrepresented as being the original software.  // > CustomCode.jszip:6850
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:6851
  function GZheader() {  // > CustomCode.jszip:6852
    /* true if compressed data believed to be text */  // > CustomCode.jszip:6853
    this.text       = 0;  // > CustomCode.jszip:6854
    /* modification time */  // > CustomCode.jszip:6855
    this.time       = 0;  // > CustomCode.jszip:6856
    /* extra flags (not used when writing a gzip file) */  // > CustomCode.jszip:6857
    this.xflags     = 0;  // > CustomCode.jszip:6858
    /* operating system */  // > CustomCode.jszip:6859
    this.os         = 0;  // > CustomCode.jszip:6860
    /* pointer to extra field or Z_NULL if none */  // > CustomCode.jszip:6861
    this.extra      = null;  // > CustomCode.jszip:6862
    /* extra field length (valid if extra != Z_NULL) */  // > CustomCode.jszip:6863
    this.extra_len  = 0; // Actually, we don't need it in JS,  // > CustomCode.jszip:6864
                         // but leave for few code modifications  // > CustomCode.jszip:6865
    //  // > CustomCode.jszip:6866
    // Setup limits is not necessary because in js we should not preallocate memory  // > CustomCode.jszip:6867
    // for inflate use constant limit in 65536 bytes  // > CustomCode.jszip:6868
    //  // > CustomCode.jszip:6869
    /* space at extra (only when reading header) */  // > CustomCode.jszip:6870
    // this.extra_max  = 0;  // > CustomCode.jszip:6871
    /* pointer to zero-terminated file name or Z_NULL */  // > CustomCode.jszip:6872
    this.name       = '';  // > CustomCode.jszip:6873
    /* space at name (only when reading header) */  // > CustomCode.jszip:6874
    // this.name_max   = 0;  // > CustomCode.jszip:6875
    /* pointer to zero-terminated comment or Z_NULL */  // > CustomCode.jszip:6876
    this.comment    = '';  // > CustomCode.jszip:6877
    /* space at comment (only when reading header) */  // > CustomCode.jszip:6878
    // this.comm_max   = 0;  // > CustomCode.jszip:6879
    /* true if there was or will be a header crc */  // > CustomCode.jszip:6880
    this.hcrc       = 0;  // > CustomCode.jszip:6881
    /* true when done reading gzip header (not used when writing a gzip file) */  // > CustomCode.jszip:6882
    this.done       = false;  // > CustomCode.jszip:6883
  }  // > CustomCode.jszip:6884
  module.exports = GZheader;  // > CustomCode.jszip:6885
  },{}],48:[function(require,module,exports){  // > CustomCode.jszip:6886
  'use strict';  // > CustomCode.jszip:6887
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:6888
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:6889
  //  // > CustomCode.jszip:6890
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:6891
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:6892
  // arising from the use of this software.  // > CustomCode.jszip:6893
  //  // > CustomCode.jszip:6894
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:6895
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:6896
  // freely, subject to the following restrictions:  // > CustomCode.jszip:6897
  //  // > CustomCode.jszip:6898
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:6899
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:6900
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:6901
  //   appreciated but is not required.  // > CustomCode.jszip:6902
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:6903
  //   misrepresented as being the original software.  // > CustomCode.jszip:6904
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:6905
  // See state defs from inflate.js  // > CustomCode.jszip:6906
  var BAD = 30;       /* got a data error -- remain here until reset */  // > CustomCode.jszip:6907
  var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */  // > CustomCode.jszip:6908
  /*  // > CustomCode.jszip:6909
     Decode literal, length, and distance codes and write out the resulting  // > CustomCode.jszip:6910
     literal and match bytes until either not enough input or output is  // > CustomCode.jszip:6911
     available, an end-of-block is encountered, or a data error is encountered.  // > CustomCode.jszip:6912
     When large enough input and output buffers are supplied to inflate(), for  // > CustomCode.jszip:6913
     example, a 16K input buffer and a 64K output buffer, more than 95% of the  // > CustomCode.jszip:6914
     inflate execution time is spent in this routine.  // > CustomCode.jszip:6915
     Entry assumptions:  // > CustomCode.jszip:6916
          state.mode === LEN  // > CustomCode.jszip:6917
          strm.avail_in >= 6  // > CustomCode.jszip:6918
          strm.avail_out >= 258  // > CustomCode.jszip:6919
          start >= strm.avail_out  // > CustomCode.jszip:6920
          state.bits < 8  // > CustomCode.jszip:6921
     On return, state.mode is one of:  // > CustomCode.jszip:6922
          LEN -- ran out of enough output space or enough available input  // > CustomCode.jszip:6923
          TYPE -- reached end of block code, inflate() to interpret next block  // > CustomCode.jszip:6924
          BAD -- error in block data  // > CustomCode.jszip:6925
     Notes:  // > CustomCode.jszip:6926
      - The maximum input bits used by a length/distance pair is 15 bits for the  // > CustomCode.jszip:6927
        length code, 5 bits for the length extra, 15 bits for the distance code,  // > CustomCode.jszip:6928
        and 13 bits for the distance extra.  This totals 48 bits, or six bytes.  // > CustomCode.jszip:6929
        Therefore if strm.avail_in >= 6, then there is enough input to avoid  // > CustomCode.jszip:6930
        checking for available input while decoding.  // > CustomCode.jszip:6931
      - The maximum bytes that a single length/distance pair can output is 258  // > CustomCode.jszip:6932
        bytes, which is the maximum length that can be coded.  inflate_fast()  // > CustomCode.jszip:6933
        requires strm.avail_out >= 258 for each loop to avoid checking for  // > CustomCode.jszip:6934
        output space.  // > CustomCode.jszip:6935
   */  // > CustomCode.jszip:6936
  module.exports = function inflate_fast(strm, start) {  // > CustomCode.jszip:6937
    var state;  // > CustomCode.jszip:6938
    var _in;                    /* local strm.input */  // > CustomCode.jszip:6939
    var last;                   /* have enough input while in < last */  // > CustomCode.jszip:6940
    var _out;                   /* local strm.output */  // > CustomCode.jszip:6941
    var beg;                    /* inflate()'s initial strm.output */  // > CustomCode.jszip:6942
    var end;                    /* while out < end, enough space available */  // > CustomCode.jszip:6943
  //#ifdef INFLATE_STRICT  // > CustomCode.jszip:6944
    var dmax;                   /* maximum distance from zlib header */  // > CustomCode.jszip:6945
  //#endif  // > CustomCode.jszip:6946
    var wsize;                  /* window size or zero if not using window */  // > CustomCode.jszip:6947
    var whave;                  /* valid bytes in the window */  // > CustomCode.jszip:6948
    var wnext;                  /* window write index */  // > CustomCode.jszip:6949
    // Use `s_window` instead `window`, avoid conflict with instrumentation tools  // > CustomCode.jszip:6950
    var s_window;               /* allocated sliding window, if wsize != 0 */  // > CustomCode.jszip:6951
    var hold;                   /* local strm.hold */  // > CustomCode.jszip:6952
    var bits;                   /* local strm.bits */  // > CustomCode.jszip:6953
    var lcode;                  /* local strm.lencode */  // > CustomCode.jszip:6954
    var dcode;                  /* local strm.distcode */  // > CustomCode.jszip:6955
    var lmask;                  /* mask for first level of length codes */  // > CustomCode.jszip:6956
    var dmask;                  /* mask for first level of distance codes */  // > CustomCode.jszip:6957
    var here;                   /* retrieved table entry */  // > CustomCode.jszip:6958
    var op;                     /* code bits, operation, extra bits, or */  // > CustomCode.jszip:6959
                                /*  window position, window bytes to copy */  // > CustomCode.jszip:6960
    var len;                    /* match length, unused bytes */  // > CustomCode.jszip:6961
    var dist;                   /* match distance */  // > CustomCode.jszip:6962
    var from;                   /* where to copy match from */  // > CustomCode.jszip:6963
    var from_source;  // > CustomCode.jszip:6964
    var input, output; // JS specific, because we have no pointers  // > CustomCode.jszip:6965
    /* copy state to local variables */  // > CustomCode.jszip:6966
    state = strm.state;  // > CustomCode.jszip:6967
    //here = state.here;  // > CustomCode.jszip:6968
    _in = strm.next_in;  // > CustomCode.jszip:6969
    input = strm.input;  // > CustomCode.jszip:6970
    last = _in + (strm.avail_in - 5);  // > CustomCode.jszip:6971
    _out = strm.next_out;  // > CustomCode.jszip:6972
    output = strm.output;  // > CustomCode.jszip:6973
    beg = _out - (start - strm.avail_out);  // > CustomCode.jszip:6974
    end = _out + (strm.avail_out - 257);  // > CustomCode.jszip:6975
  //#ifdef INFLATE_STRICT  // > CustomCode.jszip:6976
    dmax = state.dmax;  // > CustomCode.jszip:6977
  //#endif  // > CustomCode.jszip:6978
    wsize = state.wsize;  // > CustomCode.jszip:6979
    whave = state.whave;  // > CustomCode.jszip:6980
    wnext = state.wnext;  // > CustomCode.jszip:6981
    s_window = state.window;  // > CustomCode.jszip:6982
    hold = state.hold;  // > CustomCode.jszip:6983
    bits = state.bits;  // > CustomCode.jszip:6984
    lcode = state.lencode;  // > CustomCode.jszip:6985
    dcode = state.distcode;  // > CustomCode.jszip:6986
    lmask = (1 << state.lenbits) - 1;  // > CustomCode.jszip:6987
    dmask = (1 << state.distbits) - 1;  // > CustomCode.jszip:6988
    /* decode literals and length/distances until end-of-block or not enough  // > CustomCode.jszip:6989
       input data or output space */  // > CustomCode.jszip:6990
    top:  // > CustomCode.jszip:6991
    do {  // > CustomCode.jszip:6992
      if (bits < 15) {  // > CustomCode.jszip:6993
        hold += input[_in++] << bits;  // > CustomCode.jszip:6994
        bits += 8;  // > CustomCode.jszip:6995
        hold += input[_in++] << bits;  // > CustomCode.jszip:6996
        bits += 8;  // > CustomCode.jszip:6997
      }  // > CustomCode.jszip:6998
      here = lcode[hold & lmask];  // > CustomCode.jszip:6999
      dolen:  // > CustomCode.jszip:7000
      for (;;) { // Goto emulation  // > CustomCode.jszip:7001
        op = here >>> 24/*here.bits*/;  // > CustomCode.jszip:7002
        hold >>>= op;  // > CustomCode.jszip:7003
        bits -= op;  // > CustomCode.jszip:7004
        op = (here >>> 16) & 0xff/*here.op*/;  // > CustomCode.jszip:7005
        if (op === 0) {                          /* literal */  // > CustomCode.jszip:7006
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?  // > CustomCode.jszip:7007
          //        "inflate:         literal '%c'\n" :  // > CustomCode.jszip:7008
          //        "inflate:         literal 0x%02x\n", here.val));  // > CustomCode.jszip:7009
          output[_out++] = here & 0xffff/*here.val*/;  // > CustomCode.jszip:7010
        }  // > CustomCode.jszip:7011
        else if (op & 16) {                     /* length base */  // > CustomCode.jszip:7012
          len = here & 0xffff/*here.val*/;  // > CustomCode.jszip:7013
          op &= 15;                           /* number of extra bits */  // > CustomCode.jszip:7014
          if (op) {  // > CustomCode.jszip:7015
            if (bits < op) {  // > CustomCode.jszip:7016
              hold += input[_in++] << bits;  // > CustomCode.jszip:7017
              bits += 8;  // > CustomCode.jszip:7018
            }  // > CustomCode.jszip:7019
            len += hold & ((1 << op) - 1);  // > CustomCode.jszip:7020
            hold >>>= op;  // > CustomCode.jszip:7021
            bits -= op;  // > CustomCode.jszip:7022
          }  // > CustomCode.jszip:7023
          //Tracevv((stderr, "inflate:         length %u\n", len));  // > CustomCode.jszip:7024
          if (bits < 15) {  // > CustomCode.jszip:7025
            hold += input[_in++] << bits;  // > CustomCode.jszip:7026
            bits += 8;  // > CustomCode.jszip:7027
            hold += input[_in++] << bits;  // > CustomCode.jszip:7028
            bits += 8;  // > CustomCode.jszip:7029
          }  // > CustomCode.jszip:7030
          here = dcode[hold & dmask];  // > CustomCode.jszip:7031
          dodist:  // > CustomCode.jszip:7032
          for (;;) { // goto emulation  // > CustomCode.jszip:7033
            op = here >>> 24/*here.bits*/;  // > CustomCode.jszip:7034
            hold >>>= op;  // > CustomCode.jszip:7035
            bits -= op;  // > CustomCode.jszip:7036
            op = (here >>> 16) & 0xff/*here.op*/;  // > CustomCode.jszip:7037
            if (op & 16) {                      /* distance base */  // > CustomCode.jszip:7038
              dist = here & 0xffff/*here.val*/;  // > CustomCode.jszip:7039
              op &= 15;                       /* number of extra bits */  // > CustomCode.jszip:7040
              if (bits < op) {  // > CustomCode.jszip:7041
                hold += input[_in++] << bits;  // > CustomCode.jszip:7042
                bits += 8;  // > CustomCode.jszip:7043
                if (bits < op) {  // > CustomCode.jszip:7044
                  hold += input[_in++] << bits;  // > CustomCode.jszip:7045
                  bits += 8;  // > CustomCode.jszip:7046
                }  // > CustomCode.jszip:7047
              }  // > CustomCode.jszip:7048
              dist += hold & ((1 << op) - 1);  // > CustomCode.jszip:7049
  //#ifdef INFLATE_STRICT  // > CustomCode.jszip:7050
              if (dist > dmax) {  // > CustomCode.jszip:7051
                strm.msg = 'invalid distance too far back';  // > CustomCode.jszip:7052
                state.mode = BAD;  // > CustomCode.jszip:7053
                break top;  // > CustomCode.jszip:7054
              }  // > CustomCode.jszip:7055
  //#endif  // > CustomCode.jszip:7056
              hold >>>= op;  // > CustomCode.jszip:7057
              bits -= op;  // > CustomCode.jszip:7058
              //Tracevv((stderr, "inflate:         distance %u\n", dist));  // > CustomCode.jszip:7059
              op = _out - beg;                /* max distance in output */  // > CustomCode.jszip:7060
              if (dist > op) {                /* see if copy from window */  // > CustomCode.jszip:7061
                op = dist - op;               /* distance back in window */  // > CustomCode.jszip:7062
                if (op > whave) {  // > CustomCode.jszip:7063
                  if (state.sane) {  // > CustomCode.jszip:7064
                    strm.msg = 'invalid distance too far back';  // > CustomCode.jszip:7065
                    state.mode = BAD;  // > CustomCode.jszip:7066
                    break top;  // > CustomCode.jszip:7067
                  }  // > CustomCode.jszip:7068
  // (!) This block is disabled in zlib defailts,  // > CustomCode.jszip:7069
  // don't enable it for binary compatibility  // > CustomCode.jszip:7070
  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR  // > CustomCode.jszip:7071
  //                if (len <= op - whave) {  // > CustomCode.jszip:7072
  //                  do {  // > CustomCode.jszip:7073
  //                    output[_out++] = 0;  // > CustomCode.jszip:7074
  //                  } while (--len);  // > CustomCode.jszip:7075
  //                  continue top;  // > CustomCode.jszip:7076
  //                }  // > CustomCode.jszip:7077
  //                len -= op - whave;  // > CustomCode.jszip:7078
  //                do {  // > CustomCode.jszip:7079
  //                  output[_out++] = 0;  // > CustomCode.jszip:7080
  //                } while (--op > whave);  // > CustomCode.jszip:7081
  //                if (op === 0) {  // > CustomCode.jszip:7082
  //                  from = _out - dist;  // > CustomCode.jszip:7083
  //                  do {  // > CustomCode.jszip:7084
  //                    output[_out++] = output[from++];  // > CustomCode.jszip:7085
  //                  } while (--len);  // > CustomCode.jszip:7086
  //                  continue top;  // > CustomCode.jszip:7087
  //                }  // > CustomCode.jszip:7088
  //#endif  // > CustomCode.jszip:7089
                }  // > CustomCode.jszip:7090
                from = 0; // window index  // > CustomCode.jszip:7091
                from_source = s_window;  // > CustomCode.jszip:7092
                if (wnext === 0) {           /* very common case */  // > CustomCode.jszip:7093
                  from += wsize - op;  // > CustomCode.jszip:7094
                  if (op < len) {         /* some from window */  // > CustomCode.jszip:7095
                    len -= op;  // > CustomCode.jszip:7096
                    do {  // > CustomCode.jszip:7097
                      output[_out++] = s_window[from++];  // > CustomCode.jszip:7098
                    } while (--op);  // > CustomCode.jszip:7099
                    from = _out - dist;  /* rest from output */  // > CustomCode.jszip:7100
                    from_source = output;  // > CustomCode.jszip:7101
                  }  // > CustomCode.jszip:7102
                }  // > CustomCode.jszip:7103
                else if (wnext < op) {      /* wrap around window */  // > CustomCode.jszip:7104
                  from += wsize + wnext - op;  // > CustomCode.jszip:7105
                  op -= wnext;  // > CustomCode.jszip:7106
                  if (op < len) {         /* some from end of window */  // > CustomCode.jszip:7107
                    len -= op;  // > CustomCode.jszip:7108
                    do {  // > CustomCode.jszip:7109
                      output[_out++] = s_window[from++];  // > CustomCode.jszip:7110
                    } while (--op);  // > CustomCode.jszip:7111
                    from = 0;  // > CustomCode.jszip:7112
                    if (wnext < len) {  /* some from start of window */  // > CustomCode.jszip:7113
                      op = wnext;  // > CustomCode.jszip:7114
                      len -= op;  // > CustomCode.jszip:7115
                      do {  // > CustomCode.jszip:7116
                        output[_out++] = s_window[from++];  // > CustomCode.jszip:7117
                      } while (--op);  // > CustomCode.jszip:7118
                      from = _out - dist;      /* rest from output */  // > CustomCode.jszip:7119
                      from_source = output;  // > CustomCode.jszip:7120
                    }  // > CustomCode.jszip:7121
                  }  // > CustomCode.jszip:7122
                }  // > CustomCode.jszip:7123
                else {                      /* contiguous in window */  // > CustomCode.jszip:7124
                  from += wnext - op;  // > CustomCode.jszip:7125
                  if (op < len) {         /* some from window */  // > CustomCode.jszip:7126
                    len -= op;  // > CustomCode.jszip:7127
                    do {  // > CustomCode.jszip:7128
                      output[_out++] = s_window[from++];  // > CustomCode.jszip:7129
                    } while (--op);  // > CustomCode.jszip:7130
                    from = _out - dist;  /* rest from output */  // > CustomCode.jszip:7131
                    from_source = output;  // > CustomCode.jszip:7132
                  }  // > CustomCode.jszip:7133
                }  // > CustomCode.jszip:7134
                while (len > 2) {  // > CustomCode.jszip:7135
                  output[_out++] = from_source[from++];  // > CustomCode.jszip:7136
                  output[_out++] = from_source[from++];  // > CustomCode.jszip:7137
                  output[_out++] = from_source[from++];  // > CustomCode.jszip:7138
                  len -= 3;  // > CustomCode.jszip:7139
                }  // > CustomCode.jszip:7140
                if (len) {  // > CustomCode.jszip:7141
                  output[_out++] = from_source[from++];  // > CustomCode.jszip:7142
                  if (len > 1) {  // > CustomCode.jszip:7143
                    output[_out++] = from_source[from++];  // > CustomCode.jszip:7144
                  }  // > CustomCode.jszip:7145
                }  // > CustomCode.jszip:7146
              }  // > CustomCode.jszip:7147
              else {  // > CustomCode.jszip:7148
                from = _out - dist;          /* copy direct from output */  // > CustomCode.jszip:7149
                do {                        /* minimum length is three */  // > CustomCode.jszip:7150
                  output[_out++] = output[from++];  // > CustomCode.jszip:7151
                  output[_out++] = output[from++];  // > CustomCode.jszip:7152
                  output[_out++] = output[from++];  // > CustomCode.jszip:7153
                  len -= 3;  // > CustomCode.jszip:7154
                } while (len > 2);  // > CustomCode.jszip:7155
                if (len) {  // > CustomCode.jszip:7156
                  output[_out++] = output[from++];  // > CustomCode.jszip:7157
                  if (len > 1) {  // > CustomCode.jszip:7158
                    output[_out++] = output[from++];  // > CustomCode.jszip:7159
                  }  // > CustomCode.jszip:7160
                }  // > CustomCode.jszip:7161
              }  // > CustomCode.jszip:7162
            }  // > CustomCode.jszip:7163
            else if ((op & 64) === 0) {          /* 2nd level distance code */  // > CustomCode.jszip:7164
              here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];  // > CustomCode.jszip:7165
              continue dodist;  // > CustomCode.jszip:7166
            }  // > CustomCode.jszip:7167
            else {  // > CustomCode.jszip:7168
              strm.msg = 'invalid distance code';  // > CustomCode.jszip:7169
              state.mode = BAD;  // > CustomCode.jszip:7170
              break top;  // > CustomCode.jszip:7171
            }  // > CustomCode.jszip:7172
            break; // need to emulate goto via "continue"  // > CustomCode.jszip:7173
          }  // > CustomCode.jszip:7174
        }  // > CustomCode.jszip:7175
        else if ((op & 64) === 0) {              /* 2nd level length code */  // > CustomCode.jszip:7176
          here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];  // > CustomCode.jszip:7177
          continue dolen;  // > CustomCode.jszip:7178
        }  // > CustomCode.jszip:7179
        else if (op & 32) {                     /* end-of-block */  // > CustomCode.jszip:7180
          //Tracevv((stderr, "inflate:         end of block\n"));  // > CustomCode.jszip:7181
          state.mode = TYPE;  // > CustomCode.jszip:7182
          break top;  // > CustomCode.jszip:7183
        }  // > CustomCode.jszip:7184
        else {  // > CustomCode.jszip:7185
          strm.msg = 'invalid literal/length code';  // > CustomCode.jszip:7186
          state.mode = BAD;  // > CustomCode.jszip:7187
          break top;  // > CustomCode.jszip:7188
        }  // > CustomCode.jszip:7189
        break; // need to emulate goto via "continue"  // > CustomCode.jszip:7190
      }  // > CustomCode.jszip:7191
    } while (_in < last && _out < end);  // > CustomCode.jszip:7192
    /* return unused bytes (on entry, bits < 8, so in won't go too far back) */  // > CustomCode.jszip:7193
    len = bits >> 3;  // > CustomCode.jszip:7194
    _in -= len;  // > CustomCode.jszip:7195
    bits -= len << 3;  // > CustomCode.jszip:7196
    hold &= (1 << bits) - 1;  // > CustomCode.jszip:7197
    /* update state and return */  // > CustomCode.jszip:7198
    strm.next_in = _in;  // > CustomCode.jszip:7199
    strm.next_out = _out;  // > CustomCode.jszip:7200
    strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));  // > CustomCode.jszip:7201
    strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));  // > CustomCode.jszip:7202
    state.hold = hold;  // > CustomCode.jszip:7203
    state.bits = bits;  // > CustomCode.jszip:7204
    return;  // > CustomCode.jszip:7205
  };  // > CustomCode.jszip:7206
  },{}],49:[function(require,module,exports){  // > CustomCode.jszip:7207
  'use strict';  // > CustomCode.jszip:7208
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:7209
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:7210
  //  // > CustomCode.jszip:7211
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:7212
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:7213
  // arising from the use of this software.  // > CustomCode.jszip:7214
  //  // > CustomCode.jszip:7215
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:7216
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:7217
  // freely, subject to the following restrictions:  // > CustomCode.jszip:7218
  //  // > CustomCode.jszip:7219
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:7220
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:7221
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:7222
  //   appreciated but is not required.  // > CustomCode.jszip:7223
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:7224
  //   misrepresented as being the original software.  // > CustomCode.jszip:7225
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:7226
  var utils         = require('../utils/common');  // > CustomCode.jszip:7227
  var adler32       = require('./adler32');  // > CustomCode.jszip:7228
  var crc32         = require('./crc32');  // > CustomCode.jszip:7229
  var inflate_fast  = require('./inffast');  // > CustomCode.jszip:7230
  var inflate_table = require('./inftrees');  // > CustomCode.jszip:7231
  var CODES = 0;  // > CustomCode.jszip:7232
  var LENS = 1;  // > CustomCode.jszip:7233
  var DISTS = 2;  // > CustomCode.jszip:7234
  /* Public constants ==========================================================*/  // > CustomCode.jszip:7235
  /* ===========================================================================*/  // > CustomCode.jszip:7236
  /* Allowed flush values; see deflate() and inflate() below for details */  // > CustomCode.jszip:7237
  //var Z_NO_FLUSH      = 0;  // > CustomCode.jszip:7238
  //var Z_PARTIAL_FLUSH = 1;  // > CustomCode.jszip:7239
  //var Z_SYNC_FLUSH    = 2;  // > CustomCode.jszip:7240
  //var Z_FULL_FLUSH    = 3;  // > CustomCode.jszip:7241
  var Z_FINISH        = 4;  // > CustomCode.jszip:7242
  var Z_BLOCK         = 5;  // > CustomCode.jszip:7243
  var Z_TREES         = 6;  // > CustomCode.jszip:7244
  /* Return codes for the compression/decompression functions. Negative values  // > CustomCode.jszip:7245
   * are errors, positive values are used for special but normal events.  // > CustomCode.jszip:7246
   */  // > CustomCode.jszip:7247
  var Z_OK            = 0;  // > CustomCode.jszip:7248
  var Z_STREAM_END    = 1;  // > CustomCode.jszip:7249
  var Z_NEED_DICT     = 2;  // > CustomCode.jszip:7250
  //var Z_ERRNO         = -1;  // > CustomCode.jszip:7251
  var Z_STREAM_ERROR  = -2;  // > CustomCode.jszip:7252
  var Z_DATA_ERROR    = -3;  // > CustomCode.jszip:7253
  var Z_MEM_ERROR     = -4;  // > CustomCode.jszip:7254
  var Z_BUF_ERROR     = -5;  // > CustomCode.jszip:7255
  //var Z_VERSION_ERROR = -6;  // > CustomCode.jszip:7256
  /* The deflate compression method */  // > CustomCode.jszip:7257
  var Z_DEFLATED  = 8;  // > CustomCode.jszip:7258
  /* STATES ====================================================================*/  // > CustomCode.jszip:7259
  /* ===========================================================================*/  // > CustomCode.jszip:7260
  var    HEAD = 1;       /* i: waiting for magic header */  // > CustomCode.jszip:7261
  var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */  // > CustomCode.jszip:7262
  var    TIME = 3;       /* i: waiting for modification time (gzip) */  // > CustomCode.jszip:7263
  var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */  // > CustomCode.jszip:7264
  var    EXLEN = 5;      /* i: waiting for extra length (gzip) */  // > CustomCode.jszip:7265
  var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */  // > CustomCode.jszip:7266
  var    NAME = 7;       /* i: waiting for end of file name (gzip) */  // > CustomCode.jszip:7267
  var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */  // > CustomCode.jszip:7268
  var    HCRC = 9;       /* i: waiting for header crc (gzip) */  // > CustomCode.jszip:7269
  var    DICTID = 10;    /* i: waiting for dictionary check value */  // > CustomCode.jszip:7270
  var    DICT = 11;      /* waiting for inflateSetDictionary() call */  // > CustomCode.jszip:7271
  var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */  // > CustomCode.jszip:7272
  var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */  // > CustomCode.jszip:7273
  var        STORED = 14;    /* i: waiting for stored size (length and complement) */  // > CustomCode.jszip:7274
  var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */  // > CustomCode.jszip:7275
  var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */  // > CustomCode.jszip:7276
  var        TABLE = 17;     /* i: waiting for dynamic block table lengths */  // > CustomCode.jszip:7277
  var        LENLENS = 18;   /* i: waiting for code length code lengths */  // > CustomCode.jszip:7278
  var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */  // > CustomCode.jszip:7279
  var            LEN_ = 20;      /* i: same as LEN below, but only first time in */  // > CustomCode.jszip:7280
  var            LEN = 21;       /* i: waiting for length/lit/eob code */  // > CustomCode.jszip:7281
  var            LENEXT = 22;    /* i: waiting for length extra bits */  // > CustomCode.jszip:7282
  var            DIST = 23;      /* i: waiting for distance code */  // > CustomCode.jszip:7283
  var            DISTEXT = 24;   /* i: waiting for distance extra bits */  // > CustomCode.jszip:7284
  var            MATCH = 25;     /* o: waiting for output space to copy string */  // > CustomCode.jszip:7285
  var            LIT = 26;       /* o: waiting for output space to write literal */  // > CustomCode.jszip:7286
  var    CHECK = 27;     /* i: waiting for 32-bit check value */  // > CustomCode.jszip:7287
  var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */  // > CustomCode.jszip:7288
  var    DONE = 29;      /* finished check, done -- remain here until reset */  // > CustomCode.jszip:7289
  var    BAD = 30;       /* got a data error -- remain here until reset */  // > CustomCode.jszip:7290
  var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */  // > CustomCode.jszip:7291
  var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */  // > CustomCode.jszip:7292
  /* ===========================================================================*/  // > CustomCode.jszip:7293
  var ENOUGH_LENS = 852;  // > CustomCode.jszip:7294
  var ENOUGH_DISTS = 592;  // > CustomCode.jszip:7295
  //var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);  // > CustomCode.jszip:7296
  var MAX_WBITS = 15;  // > CustomCode.jszip:7297
  /* 32K LZ77 window */  // > CustomCode.jszip:7298
  var DEF_WBITS = MAX_WBITS;  // > CustomCode.jszip:7299
  function zswap32(q) {  // > CustomCode.jszip:7300
    return  (((q >>> 24) & 0xff) +  // > CustomCode.jszip:7301
            ((q >>> 8) & 0xff00) +  // > CustomCode.jszip:7302
            ((q & 0xff00) << 8) +  // > CustomCode.jszip:7303
            ((q & 0xff) << 24));  // > CustomCode.jszip:7304
  }  // > CustomCode.jszip:7305
  function InflateState() {  // > CustomCode.jszip:7306
    this.mode = 0;             /* current inflate mode */  // > CustomCode.jszip:7307
    this.last = false;          /* true if processing last block */  // > CustomCode.jszip:7308
    this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */  // > CustomCode.jszip:7309
    this.havedict = false;      /* true if dictionary provided */  // > CustomCode.jszip:7310
    this.flags = 0;             /* gzip header method and flags (0 if zlib) */  // > CustomCode.jszip:7311
    this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */  // > CustomCode.jszip:7312
    this.check = 0;             /* protected copy of check value */  // > CustomCode.jszip:7313
    this.total = 0;             /* protected copy of output count */  // > CustomCode.jszip:7314
    // TODO: may be {}  // > CustomCode.jszip:7315
    this.head = null;           /* where to save gzip header information */  // > CustomCode.jszip:7316
    /* sliding window */  // > CustomCode.jszip:7317
    this.wbits = 0;             /* log base 2 of requested window size */  // > CustomCode.jszip:7318
    this.wsize = 0;             /* window size or zero if not using window */  // > CustomCode.jszip:7319
    this.whave = 0;             /* valid bytes in the window */  // > CustomCode.jszip:7320
    this.wnext = 0;             /* window write index */  // > CustomCode.jszip:7321
    this.window = null;         /* allocated sliding window, if needed */  // > CustomCode.jszip:7322
    /* bit accumulator */  // > CustomCode.jszip:7323
    this.hold = 0;              /* input bit accumulator */  // > CustomCode.jszip:7324
    this.bits = 0;              /* number of bits in "in" */  // > CustomCode.jszip:7325
    /* for string and stored block copying */  // > CustomCode.jszip:7326
    this.length = 0;            /* literal or length of data to copy */  // > CustomCode.jszip:7327
    this.offset = 0;            /* distance back to copy string from */  // > CustomCode.jszip:7328
    /* for table and code decoding */  // > CustomCode.jszip:7329
    this.extra = 0;             /* extra bits needed */  // > CustomCode.jszip:7330
    /* fixed and dynamic code tables */  // > CustomCode.jszip:7331
    this.lencode = null;          /* starting table for length/literal codes */  // > CustomCode.jszip:7332
    this.distcode = null;         /* starting table for distance codes */  // > CustomCode.jszip:7333
    this.lenbits = 0;           /* index bits for lencode */  // > CustomCode.jszip:7334
    this.distbits = 0;          /* index bits for distcode */  // > CustomCode.jszip:7335
    /* dynamic table building */  // > CustomCode.jszip:7336
    this.ncode = 0;             /* number of code length code lengths */  // > CustomCode.jszip:7337
    this.nlen = 0;              /* number of length code lengths */  // > CustomCode.jszip:7338
    this.ndist = 0;             /* number of distance code lengths */  // > CustomCode.jszip:7339
    this.have = 0;              /* number of code lengths in lens[] */  // > CustomCode.jszip:7340
    this.next = null;              /* next available space in codes[] */  // > CustomCode.jszip:7341
    this.lens = new utils.Buf16(320); /* temporary storage for code lengths */  // > CustomCode.jszip:7342
    this.work = new utils.Buf16(288); /* work area for code table building */  // > CustomCode.jszip:7343
    /*  // > CustomCode.jszip:7344
     because we don't have pointers in js, we use lencode and distcode directly  // > CustomCode.jszip:7345
     as buffers so we don't need codes  // > CustomCode.jszip:7346
    */  // > CustomCode.jszip:7347
    //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */  // > CustomCode.jszip:7348
    this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */  // > CustomCode.jszip:7349
    this.distdyn = null;             /* dynamic table for distance codes (JS specific) */  // > CustomCode.jszip:7350
    this.sane = 0;                   /* if false, allow invalid distance too far */  // > CustomCode.jszip:7351
    this.back = 0;                   /* bits back of last unprocessed length/lit */  // > CustomCode.jszip:7352
    this.was = 0;                    /* initial length of match */  // > CustomCode.jszip:7353
  }  // > CustomCode.jszip:7354
  function inflateResetKeep(strm) {  // > CustomCode.jszip:7355
    var state;  // > CustomCode.jszip:7356
    if (!strm || !strm.state) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:7357
    state = strm.state;  // > CustomCode.jszip:7358
    strm.total_in = strm.total_out = state.total = 0;  // > CustomCode.jszip:7359
    strm.msg = ''; /*Z_NULL*/  // > CustomCode.jszip:7360
    if (state.wrap) {       /* to support ill-conceived Java test suite */  // > CustomCode.jszip:7361
      strm.adler = state.wrap & 1;  // > CustomCode.jszip:7362
    }  // > CustomCode.jszip:7363
    state.mode = HEAD;  // > CustomCode.jszip:7364
    state.last = 0;  // > CustomCode.jszip:7365
    state.havedict = 0;  // > CustomCode.jszip:7366
    state.dmax = 32768;  // > CustomCode.jszip:7367
    state.head = null/*Z_NULL*/;  // > CustomCode.jszip:7368
    state.hold = 0;  // > CustomCode.jszip:7369
    state.bits = 0;  // > CustomCode.jszip:7370
    //state.lencode = state.distcode = state.next = state.codes;  // > CustomCode.jszip:7371
    state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);  // > CustomCode.jszip:7372
    state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);  // > CustomCode.jszip:7373
    state.sane = 1;  // > CustomCode.jszip:7374
    state.back = -1;  // > CustomCode.jszip:7375
    //Tracev((stderr, "inflate: reset\n"));  // > CustomCode.jszip:7376
    return Z_OK;  // > CustomCode.jszip:7377
  }  // > CustomCode.jszip:7378
  function inflateReset(strm) {  // > CustomCode.jszip:7379
    var state;  // > CustomCode.jszip:7380
    if (!strm || !strm.state) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:7381
    state = strm.state;  // > CustomCode.jszip:7382
    state.wsize = 0;  // > CustomCode.jszip:7383
    state.whave = 0;  // > CustomCode.jszip:7384
    state.wnext = 0;  // > CustomCode.jszip:7385
    return inflateResetKeep(strm);  // > CustomCode.jszip:7386
  }  // > CustomCode.jszip:7387
  function inflateReset2(strm, windowBits) {  // > CustomCode.jszip:7388
    var wrap;  // > CustomCode.jszip:7389
    var state;  // > CustomCode.jszip:7390
    /* get the state */  // > CustomCode.jszip:7391
    if (!strm || !strm.state) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:7392
    state = strm.state;  // > CustomCode.jszip:7393
    /* extract wrap request from windowBits parameter */  // > CustomCode.jszip:7394
    if (windowBits < 0) {  // > CustomCode.jszip:7395
      wrap = 0;  // > CustomCode.jszip:7396
      windowBits = -windowBits;  // > CustomCode.jszip:7397
    }  // > CustomCode.jszip:7398
    else {  // > CustomCode.jszip:7399
      wrap = (windowBits >> 4) + 1;  // > CustomCode.jszip:7400
      if (windowBits < 48) {  // > CustomCode.jszip:7401
        windowBits &= 15;  // > CustomCode.jszip:7402
      }  // > CustomCode.jszip:7403
    }  // > CustomCode.jszip:7404
    /* set number of window bits, free window if different */  // > CustomCode.jszip:7405
    if (windowBits && (windowBits < 8 || windowBits > 15)) {  // > CustomCode.jszip:7406
      return Z_STREAM_ERROR;  // > CustomCode.jszip:7407
    }  // > CustomCode.jszip:7408
    if (state.window !== null && state.wbits !== windowBits) {  // > CustomCode.jszip:7409
      state.window = null;  // > CustomCode.jszip:7410
    }  // > CustomCode.jszip:7411
    /* update state and reset the rest of it */  // > CustomCode.jszip:7412
    state.wrap = wrap;  // > CustomCode.jszip:7413
    state.wbits = windowBits;  // > CustomCode.jszip:7414
    return inflateReset(strm);  // > CustomCode.jszip:7415
  }  // > CustomCode.jszip:7416
  function inflateInit2(strm, windowBits) {  // > CustomCode.jszip:7417
    var ret;  // > CustomCode.jszip:7418
    var state;  // > CustomCode.jszip:7419
    if (!strm) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:7420
    //strm.msg = Z_NULL;                 /* in case we return an error */  // > CustomCode.jszip:7421
    state = new InflateState();  // > CustomCode.jszip:7422
    //if (state === Z_NULL) return Z_MEM_ERROR;  // > CustomCode.jszip:7423
    //Tracev((stderr, "inflate: allocated\n"));  // > CustomCode.jszip:7424
    strm.state = state;  // > CustomCode.jszip:7425
    state.window = null/*Z_NULL*/;  // > CustomCode.jszip:7426
    ret = inflateReset2(strm, windowBits);  // > CustomCode.jszip:7427
    if (ret !== Z_OK) {  // > CustomCode.jszip:7428
      strm.state = null/*Z_NULL*/;  // > CustomCode.jszip:7429
    }  // > CustomCode.jszip:7430
    return ret;  // > CustomCode.jszip:7431
  }  // > CustomCode.jszip:7432
  function inflateInit(strm) {  // > CustomCode.jszip:7433
    return inflateInit2(strm, DEF_WBITS);  // > CustomCode.jszip:7434
  }  // > CustomCode.jszip:7435
  /*  // > CustomCode.jszip:7436
   Return state with length and distance decoding tables and index sizes set to  // > CustomCode.jszip:7437
   fixed code decoding.  Normally this returns fixed tables from inffixed.h.  // > CustomCode.jszip:7438
   If BUILDFIXED is defined, then instead this routine builds the tables the  // > CustomCode.jszip:7439
   first time it's called, and returns those tables the first time and  // > CustomCode.jszip:7440
   thereafter.  This reduces the size of the code by about 2K bytes, in  // > CustomCode.jszip:7441
   exchange for a little execution time.  However, BUILDFIXED should not be  // > CustomCode.jszip:7442
   used for threaded applications, since the rewriting of the tables and virgin  // > CustomCode.jszip:7443
   may not be thread-safe.  // > CustomCode.jszip:7444
   */  // > CustomCode.jszip:7445
  var virgin = true;  // > CustomCode.jszip:7446
  var lenfix, distfix; // We have no pointers in JS, so keep tables separate  // > CustomCode.jszip:7447
  function fixedtables(state) {  // > CustomCode.jszip:7448
    /* build fixed huffman tables if first call (may not be thread safe) */  // > CustomCode.jszip:7449
    if (virgin) {  // > CustomCode.jszip:7450
      var sym;  // > CustomCode.jszip:7451
      lenfix = new utils.Buf32(512);  // > CustomCode.jszip:7452
      distfix = new utils.Buf32(32);  // > CustomCode.jszip:7453
      /* literal/length table */  // > CustomCode.jszip:7454
      sym = 0;  // > CustomCode.jszip:7455
      while (sym < 144) { state.lens[sym++] = 8; }  // > CustomCode.jszip:7456
      while (sym < 256) { state.lens[sym++] = 9; }  // > CustomCode.jszip:7457
      while (sym < 280) { state.lens[sym++] = 7; }  // > CustomCode.jszip:7458
      while (sym < 288) { state.lens[sym++] = 8; }  // > CustomCode.jszip:7459
      inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });  // > CustomCode.jszip:7460
      /* distance table */  // > CustomCode.jszip:7461
      sym = 0;  // > CustomCode.jszip:7462
      while (sym < 32) { state.lens[sym++] = 5; }  // > CustomCode.jszip:7463
      inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });  // > CustomCode.jszip:7464
      /* do this just once */  // > CustomCode.jszip:7465
      virgin = false;  // > CustomCode.jszip:7466
    }  // > CustomCode.jszip:7467
    state.lencode = lenfix;  // > CustomCode.jszip:7468
    state.lenbits = 9;  // > CustomCode.jszip:7469
    state.distcode = distfix;  // > CustomCode.jszip:7470
    state.distbits = 5;  // > CustomCode.jszip:7471
  }  // > CustomCode.jszip:7472
  /*  // > CustomCode.jszip:7473
   Update the window with the last wsize (normally 32K) bytes written before  // > CustomCode.jszip:7474
   returning.  If window does not exist yet, create it.  This is only called  // > CustomCode.jszip:7475
   when a window is already in use, or when output has been written during this  // > CustomCode.jszip:7476
   inflate call, but the end of the deflate stream has not been reached yet.  // > CustomCode.jszip:7477
   It is also called to create a window for dictionary data when a dictionary  // > CustomCode.jszip:7478
   is loaded.  // > CustomCode.jszip:7479
   Providing output buffers larger than 32K to inflate() should provide a speed  // > CustomCode.jszip:7480
   advantage, since only the last 32K of output is copied to the sliding window  // > CustomCode.jszip:7481
   upon return from inflate(), and since all distances after the first 32K of  // > CustomCode.jszip:7482
   output will fall in the output data, making match copies simpler and faster.  // > CustomCode.jszip:7483
   The advantage may be dependent on the size of the processor's data caches.  // > CustomCode.jszip:7484
   */  // > CustomCode.jszip:7485
  function updatewindow(strm, src, end, copy) {  // > CustomCode.jszip:7486
    var dist;  // > CustomCode.jszip:7487
    var state = strm.state;  // > CustomCode.jszip:7488
    /* if it hasn't been done already, allocate space for the window */  // > CustomCode.jszip:7489
    if (state.window === null) {  // > CustomCode.jszip:7490
      state.wsize = 1 << state.wbits;  // > CustomCode.jszip:7491
      state.wnext = 0;  // > CustomCode.jszip:7492
      state.whave = 0;  // > CustomCode.jszip:7493
      state.window = new utils.Buf8(state.wsize);  // > CustomCode.jszip:7494
    }  // > CustomCode.jszip:7495
    /* copy state->wsize or less output bytes into the circular window */  // > CustomCode.jszip:7496
    if (copy >= state.wsize) {  // > CustomCode.jszip:7497
      utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);  // > CustomCode.jszip:7498
      state.wnext = 0;  // > CustomCode.jszip:7499
      state.whave = state.wsize;  // > CustomCode.jszip:7500
    }  // > CustomCode.jszip:7501
    else {  // > CustomCode.jszip:7502
      dist = state.wsize - state.wnext;  // > CustomCode.jszip:7503
      if (dist > copy) {  // > CustomCode.jszip:7504
        dist = copy;  // > CustomCode.jszip:7505
      }  // > CustomCode.jszip:7506
      //zmemcpy(state->window + state->wnext, end - copy, dist);  // > CustomCode.jszip:7507
      utils.arraySet(state.window, src, end - copy, dist, state.wnext);  // > CustomCode.jszip:7508
      copy -= dist;  // > CustomCode.jszip:7509
      if (copy) {  // > CustomCode.jszip:7510
        //zmemcpy(state->window, end - copy, copy);  // > CustomCode.jszip:7511
        utils.arraySet(state.window, src, end - copy, copy, 0);  // > CustomCode.jszip:7512
        state.wnext = copy;  // > CustomCode.jszip:7513
        state.whave = state.wsize;  // > CustomCode.jszip:7514
      }  // > CustomCode.jszip:7515
      else {  // > CustomCode.jszip:7516
        state.wnext += dist;  // > CustomCode.jszip:7517
        if (state.wnext === state.wsize) { state.wnext = 0; }  // > CustomCode.jszip:7518
        if (state.whave < state.wsize) { state.whave += dist; }  // > CustomCode.jszip:7519
      }  // > CustomCode.jszip:7520
    }  // > CustomCode.jszip:7521
    return 0;  // > CustomCode.jszip:7522
  }  // > CustomCode.jszip:7523
  function inflate(strm, flush) {  // > CustomCode.jszip:7524
    var state;  // > CustomCode.jszip:7525
    var input, output;          // input/output buffers  // > CustomCode.jszip:7526
    var next;                   /* next input INDEX */  // > CustomCode.jszip:7527
    var put;                    /* next output INDEX */  // > CustomCode.jszip:7528
    var have, left;             /* available input and output */  // > CustomCode.jszip:7529
    var hold;                   /* bit buffer */  // > CustomCode.jszip:7530
    var bits;                   /* bits in bit buffer */  // > CustomCode.jszip:7531
    var _in, _out;              /* save starting available input and output */  // > CustomCode.jszip:7532
    var copy;                   /* number of stored or match bytes to copy */  // > CustomCode.jszip:7533
    var from;                   /* where to copy match bytes from */  // > CustomCode.jszip:7534
    var from_source;  // > CustomCode.jszip:7535
    var here = 0;               /* current decoding table entry */  // > CustomCode.jszip:7536
    var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)  // > CustomCode.jszip:7537
    //var last;                   /* parent table entry */  // > CustomCode.jszip:7538
    var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)  // > CustomCode.jszip:7539
    var len;                    /* length to copy for repeats, bits to drop */  // > CustomCode.jszip:7540
    var ret;                    /* return code */  // > CustomCode.jszip:7541
    var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */  // > CustomCode.jszip:7542
    var opts;  // > CustomCode.jszip:7543
    var n; // temporary var for NEED_BITS  // > CustomCode.jszip:7544
    var order = /* permutation of code lengths */  // > CustomCode.jszip:7545
      [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];  // > CustomCode.jszip:7546
    if (!strm || !strm.state || !strm.output ||  // > CustomCode.jszip:7547
        (!strm.input && strm.avail_in !== 0)) {  // > CustomCode.jszip:7548
      return Z_STREAM_ERROR;  // > CustomCode.jszip:7549
    }  // > CustomCode.jszip:7550
    state = strm.state;  // > CustomCode.jszip:7551
    if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */  // > CustomCode.jszip:7552
    //--- LOAD() ---  // > CustomCode.jszip:7553
    put = strm.next_out;  // > CustomCode.jszip:7554
    output = strm.output;  // > CustomCode.jszip:7555
    left = strm.avail_out;  // > CustomCode.jszip:7556
    next = strm.next_in;  // > CustomCode.jszip:7557
    input = strm.input;  // > CustomCode.jszip:7558
    have = strm.avail_in;  // > CustomCode.jszip:7559
    hold = state.hold;  // > CustomCode.jszip:7560
    bits = state.bits;  // > CustomCode.jszip:7561
    //---  // > CustomCode.jszip:7562
    _in = have;  // > CustomCode.jszip:7563
    _out = left;  // > CustomCode.jszip:7564
    ret = Z_OK;  // > CustomCode.jszip:7565
    inf_leave: // goto emulation  // > CustomCode.jszip:7566
    for (;;) {  // > CustomCode.jszip:7567
      switch (state.mode) {  // > CustomCode.jszip:7568
      case HEAD:  // > CustomCode.jszip:7569
        if (state.wrap === 0) {  // > CustomCode.jszip:7570
          state.mode = TYPEDO;  // > CustomCode.jszip:7571
          break;  // > CustomCode.jszip:7572
        }  // > CustomCode.jszip:7573
        //=== NEEDBITS(16);  // > CustomCode.jszip:7574
        while (bits < 16) {  // > CustomCode.jszip:7575
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7576
          have--;  // > CustomCode.jszip:7577
          hold += input[next++] << bits;  // > CustomCode.jszip:7578
          bits += 8;  // > CustomCode.jszip:7579
        }  // > CustomCode.jszip:7580
        //===//  // > CustomCode.jszip:7581
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */  // > CustomCode.jszip:7582
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;  // > CustomCode.jszip:7583
          //=== CRC2(state.check, hold);  // > CustomCode.jszip:7584
          hbuf[0] = hold & 0xff;  // > CustomCode.jszip:7585
          hbuf[1] = (hold >>> 8) & 0xff;  // > CustomCode.jszip:7586
          state.check = crc32(state.check, hbuf, 2, 0);  // > CustomCode.jszip:7587
          //===//  // > CustomCode.jszip:7588
          //=== INITBITS();  // > CustomCode.jszip:7589
          hold = 0;  // > CustomCode.jszip:7590
          bits = 0;  // > CustomCode.jszip:7591
          //===//  // > CustomCode.jszip:7592
          state.mode = FLAGS;  // > CustomCode.jszip:7593
          break;  // > CustomCode.jszip:7594
        }  // > CustomCode.jszip:7595
        state.flags = 0;           /* expect zlib header */  // > CustomCode.jszip:7596
        if (state.head) {  // > CustomCode.jszip:7597
          state.head.done = false;  // > CustomCode.jszip:7598
        }  // > CustomCode.jszip:7599
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */  // > CustomCode.jszip:7600
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {  // > CustomCode.jszip:7601
          strm.msg = 'incorrect header check';  // > CustomCode.jszip:7602
          state.mode = BAD;  // > CustomCode.jszip:7603
          break;  // > CustomCode.jszip:7604
        }  // > CustomCode.jszip:7605
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {  // > CustomCode.jszip:7606
          strm.msg = 'unknown compression method';  // > CustomCode.jszip:7607
          state.mode = BAD;  // > CustomCode.jszip:7608
          break;  // > CustomCode.jszip:7609
        }  // > CustomCode.jszip:7610
        //--- DROPBITS(4) ---//  // > CustomCode.jszip:7611
        hold >>>= 4;  // > CustomCode.jszip:7612
        bits -= 4;  // > CustomCode.jszip:7613
        //---//  // > CustomCode.jszip:7614
        len = (hold & 0x0f)/*BITS(4)*/ + 8;  // > CustomCode.jszip:7615
        if (state.wbits === 0) {  // > CustomCode.jszip:7616
          state.wbits = len;  // > CustomCode.jszip:7617
        }  // > CustomCode.jszip:7618
        else if (len > state.wbits) {  // > CustomCode.jszip:7619
          strm.msg = 'invalid window size';  // > CustomCode.jszip:7620
          state.mode = BAD;  // > CustomCode.jszip:7621
          break;  // > CustomCode.jszip:7622
        }  // > CustomCode.jszip:7623
        state.dmax = 1 << len;  // > CustomCode.jszip:7624
        //Tracev((stderr, "inflate:   zlib header ok\n"));  // > CustomCode.jszip:7625
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;  // > CustomCode.jszip:7626
        state.mode = hold & 0x200 ? DICTID : TYPE;  // > CustomCode.jszip:7627
        //=== INITBITS();  // > CustomCode.jszip:7628
        hold = 0;  // > CustomCode.jszip:7629
        bits = 0;  // > CustomCode.jszip:7630
        //===//  // > CustomCode.jszip:7631
        break;  // > CustomCode.jszip:7632
      case FLAGS:  // > CustomCode.jszip:7633
        //=== NEEDBITS(16); */  // > CustomCode.jszip:7634
        while (bits < 16) {  // > CustomCode.jszip:7635
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7636
          have--;  // > CustomCode.jszip:7637
          hold += input[next++] << bits;  // > CustomCode.jszip:7638
          bits += 8;  // > CustomCode.jszip:7639
        }  // > CustomCode.jszip:7640
        //===//  // > CustomCode.jszip:7641
        state.flags = hold;  // > CustomCode.jszip:7642
        if ((state.flags & 0xff) !== Z_DEFLATED) {  // > CustomCode.jszip:7643
          strm.msg = 'unknown compression method';  // > CustomCode.jszip:7644
          state.mode = BAD;  // > CustomCode.jszip:7645
          break;  // > CustomCode.jszip:7646
        }  // > CustomCode.jszip:7647
        if (state.flags & 0xe000) {  // > CustomCode.jszip:7648
          strm.msg = 'unknown header flags set';  // > CustomCode.jszip:7649
          state.mode = BAD;  // > CustomCode.jszip:7650
          break;  // > CustomCode.jszip:7651
        }  // > CustomCode.jszip:7652
        if (state.head) {  // > CustomCode.jszip:7653
          state.head.text = ((hold >> 8) & 1);  // > CustomCode.jszip:7654
        }  // > CustomCode.jszip:7655
        if (state.flags & 0x0200) {  // > CustomCode.jszip:7656
          //=== CRC2(state.check, hold);  // > CustomCode.jszip:7657
          hbuf[0] = hold & 0xff;  // > CustomCode.jszip:7658
          hbuf[1] = (hold >>> 8) & 0xff;  // > CustomCode.jszip:7659
          state.check = crc32(state.check, hbuf, 2, 0);  // > CustomCode.jszip:7660
          //===//  // > CustomCode.jszip:7661
        }  // > CustomCode.jszip:7662
        //=== INITBITS();  // > CustomCode.jszip:7663
        hold = 0;  // > CustomCode.jszip:7664
        bits = 0;  // > CustomCode.jszip:7665
        //===//  // > CustomCode.jszip:7666
        state.mode = TIME;  // > CustomCode.jszip:7667
        /* falls through */  // > CustomCode.jszip:7668
      case TIME:  // > CustomCode.jszip:7669
        //=== NEEDBITS(32); */  // > CustomCode.jszip:7670
        while (bits < 32) {  // > CustomCode.jszip:7671
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7672
          have--;  // > CustomCode.jszip:7673
          hold += input[next++] << bits;  // > CustomCode.jszip:7674
          bits += 8;  // > CustomCode.jszip:7675
        }  // > CustomCode.jszip:7676
        //===//  // > CustomCode.jszip:7677
        if (state.head) {  // > CustomCode.jszip:7678
          state.head.time = hold;  // > CustomCode.jszip:7679
        }  // > CustomCode.jszip:7680
        if (state.flags & 0x0200) {  // > CustomCode.jszip:7681
          //=== CRC4(state.check, hold)  // > CustomCode.jszip:7682
          hbuf[0] = hold & 0xff;  // > CustomCode.jszip:7683
          hbuf[1] = (hold >>> 8) & 0xff;  // > CustomCode.jszip:7684
          hbuf[2] = (hold >>> 16) & 0xff;  // > CustomCode.jszip:7685
          hbuf[3] = (hold >>> 24) & 0xff;  // > CustomCode.jszip:7686
          state.check = crc32(state.check, hbuf, 4, 0);  // > CustomCode.jszip:7687
          //===  // > CustomCode.jszip:7688
        }  // > CustomCode.jszip:7689
        //=== INITBITS();  // > CustomCode.jszip:7690
        hold = 0;  // > CustomCode.jszip:7691
        bits = 0;  // > CustomCode.jszip:7692
        //===//  // > CustomCode.jszip:7693
        state.mode = OS;  // > CustomCode.jszip:7694
        /* falls through */  // > CustomCode.jszip:7695
      case OS:  // > CustomCode.jszip:7696
        //=== NEEDBITS(16); */  // > CustomCode.jszip:7697
        while (bits < 16) {  // > CustomCode.jszip:7698
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7699
          have--;  // > CustomCode.jszip:7700
          hold += input[next++] << bits;  // > CustomCode.jszip:7701
          bits += 8;  // > CustomCode.jszip:7702
        }  // > CustomCode.jszip:7703
        //===//  // > CustomCode.jszip:7704
        if (state.head) {  // > CustomCode.jszip:7705
          state.head.xflags = (hold & 0xff);  // > CustomCode.jszip:7706
          state.head.os = (hold >> 8);  // > CustomCode.jszip:7707
        }  // > CustomCode.jszip:7708
        if (state.flags & 0x0200) {  // > CustomCode.jszip:7709
          //=== CRC2(state.check, hold);  // > CustomCode.jszip:7710
          hbuf[0] = hold & 0xff;  // > CustomCode.jszip:7711
          hbuf[1] = (hold >>> 8) & 0xff;  // > CustomCode.jszip:7712
          state.check = crc32(state.check, hbuf, 2, 0);  // > CustomCode.jszip:7713
          //===//  // > CustomCode.jszip:7714
        }  // > CustomCode.jszip:7715
        //=== INITBITS();  // > CustomCode.jszip:7716
        hold = 0;  // > CustomCode.jszip:7717
        bits = 0;  // > CustomCode.jszip:7718
        //===//  // > CustomCode.jszip:7719
        state.mode = EXLEN;  // > CustomCode.jszip:7720
        /* falls through */  // > CustomCode.jszip:7721
      case EXLEN:  // > CustomCode.jszip:7722
        if (state.flags & 0x0400) {  // > CustomCode.jszip:7723
          //=== NEEDBITS(16); */  // > CustomCode.jszip:7724
          while (bits < 16) {  // > CustomCode.jszip:7725
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7726
            have--;  // > CustomCode.jszip:7727
            hold += input[next++] << bits;  // > CustomCode.jszip:7728
            bits += 8;  // > CustomCode.jszip:7729
          }  // > CustomCode.jszip:7730
          //===//  // > CustomCode.jszip:7731
          state.length = hold;  // > CustomCode.jszip:7732
          if (state.head) {  // > CustomCode.jszip:7733
            state.head.extra_len = hold;  // > CustomCode.jszip:7734
          }  // > CustomCode.jszip:7735
          if (state.flags & 0x0200) {  // > CustomCode.jszip:7736
            //=== CRC2(state.check, hold);  // > CustomCode.jszip:7737
            hbuf[0] = hold & 0xff;  // > CustomCode.jszip:7738
            hbuf[1] = (hold >>> 8) & 0xff;  // > CustomCode.jszip:7739
            state.check = crc32(state.check, hbuf, 2, 0);  // > CustomCode.jszip:7740
            //===//  // > CustomCode.jszip:7741
          }  // > CustomCode.jszip:7742
          //=== INITBITS();  // > CustomCode.jszip:7743
          hold = 0;  // > CustomCode.jszip:7744
          bits = 0;  // > CustomCode.jszip:7745
          //===//  // > CustomCode.jszip:7746
        }  // > CustomCode.jszip:7747
        else if (state.head) {  // > CustomCode.jszip:7748
          state.head.extra = null/*Z_NULL*/;  // > CustomCode.jszip:7749
        }  // > CustomCode.jszip:7750
        state.mode = EXTRA;  // > CustomCode.jszip:7751
        /* falls through */  // > CustomCode.jszip:7752
      case EXTRA:  // > CustomCode.jszip:7753
        if (state.flags & 0x0400) {  // > CustomCode.jszip:7754
          copy = state.length;  // > CustomCode.jszip:7755
          if (copy > have) { copy = have; }  // > CustomCode.jszip:7756
          if (copy) {  // > CustomCode.jszip:7757
            if (state.head) {  // > CustomCode.jszip:7758
              len = state.head.extra_len - state.length;  // > CustomCode.jszip:7759
              if (!state.head.extra) {  // > CustomCode.jszip:7760
                // Use untyped array for more conveniend processing later  // > CustomCode.jszip:7761
                state.head.extra = new Array(state.head.extra_len);  // > CustomCode.jszip:7762
              }  // > CustomCode.jszip:7763
              utils.arraySet(  // > CustomCode.jszip:7764
                state.head.extra,  // > CustomCode.jszip:7765
                input,  // > CustomCode.jszip:7766
                next,  // > CustomCode.jszip:7767
                // extra field is limited to 65536 bytes  // > CustomCode.jszip:7768
                // - no need for additional size check  // > CustomCode.jszip:7769
                copy,  // > CustomCode.jszip:7770
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/  // > CustomCode.jszip:7771
                len  // > CustomCode.jszip:7772
              );  // > CustomCode.jszip:7773
              //zmemcpy(state.head.extra + len, next,  // > CustomCode.jszip:7774
              //        len + copy > state.head.extra_max ?  // > CustomCode.jszip:7775
              //        state.head.extra_max - len : copy);  // > CustomCode.jszip:7776
            }  // > CustomCode.jszip:7777
            if (state.flags & 0x0200) {  // > CustomCode.jszip:7778
              state.check = crc32(state.check, input, copy, next);  // > CustomCode.jszip:7779
            }  // > CustomCode.jszip:7780
            have -= copy;  // > CustomCode.jszip:7781
            next += copy;  // > CustomCode.jszip:7782
            state.length -= copy;  // > CustomCode.jszip:7783
          }  // > CustomCode.jszip:7784
          if (state.length) { break inf_leave; }  // > CustomCode.jszip:7785
        }  // > CustomCode.jszip:7786
        state.length = 0;  // > CustomCode.jszip:7787
        state.mode = NAME;  // > CustomCode.jszip:7788
        /* falls through */  // > CustomCode.jszip:7789
      case NAME:  // > CustomCode.jszip:7790
        if (state.flags & 0x0800) {  // > CustomCode.jszip:7791
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7792
          copy = 0;  // > CustomCode.jszip:7793
          do {  // > CustomCode.jszip:7794
            // TODO: 2 or 1 bytes?  // > CustomCode.jszip:7795
            len = input[next + copy++];  // > CustomCode.jszip:7796
            /* use constant limit because in js we should not preallocate memory */  // > CustomCode.jszip:7797
            if (state.head && len &&  // > CustomCode.jszip:7798
                (state.length < 65536 /*state.head.name_max*/)) {  // > CustomCode.jszip:7799
              state.head.name += String.fromCharCode(len);  // > CustomCode.jszip:7800
            }  // > CustomCode.jszip:7801
          } while (len && copy < have);  // > CustomCode.jszip:7802
          if (state.flags & 0x0200) {  // > CustomCode.jszip:7803
            state.check = crc32(state.check, input, copy, next);  // > CustomCode.jszip:7804
          }  // > CustomCode.jszip:7805
          have -= copy;  // > CustomCode.jszip:7806
          next += copy;  // > CustomCode.jszip:7807
          if (len) { break inf_leave; }  // > CustomCode.jszip:7808
        }  // > CustomCode.jszip:7809
        else if (state.head) {  // > CustomCode.jszip:7810
          state.head.name = null;  // > CustomCode.jszip:7811
        }  // > CustomCode.jszip:7812
        state.length = 0;  // > CustomCode.jszip:7813
        state.mode = COMMENT;  // > CustomCode.jszip:7814
        /* falls through */  // > CustomCode.jszip:7815
      case COMMENT:  // > CustomCode.jszip:7816
        if (state.flags & 0x1000) {  // > CustomCode.jszip:7817
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7818
          copy = 0;  // > CustomCode.jszip:7819
          do {  // > CustomCode.jszip:7820
            len = input[next + copy++];  // > CustomCode.jszip:7821
            /* use constant limit because in js we should not preallocate memory */  // > CustomCode.jszip:7822
            if (state.head && len &&  // > CustomCode.jszip:7823
                (state.length < 65536 /*state.head.comm_max*/)) {  // > CustomCode.jszip:7824
              state.head.comment += String.fromCharCode(len);  // > CustomCode.jszip:7825
            }  // > CustomCode.jszip:7826
          } while (len && copy < have);  // > CustomCode.jszip:7827
          if (state.flags & 0x0200) {  // > CustomCode.jszip:7828
            state.check = crc32(state.check, input, copy, next);  // > CustomCode.jszip:7829
          }  // > CustomCode.jszip:7830
          have -= copy;  // > CustomCode.jszip:7831
          next += copy;  // > CustomCode.jszip:7832
          if (len) { break inf_leave; }  // > CustomCode.jszip:7833
        }  // > CustomCode.jszip:7834
        else if (state.head) {  // > CustomCode.jszip:7835
          state.head.comment = null;  // > CustomCode.jszip:7836
        }  // > CustomCode.jszip:7837
        state.mode = HCRC;  // > CustomCode.jszip:7838
        /* falls through */  // > CustomCode.jszip:7839
      case HCRC:  // > CustomCode.jszip:7840
        if (state.flags & 0x0200) {  // > CustomCode.jszip:7841
          //=== NEEDBITS(16); */  // > CustomCode.jszip:7842
          while (bits < 16) {  // > CustomCode.jszip:7843
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7844
            have--;  // > CustomCode.jszip:7845
            hold += input[next++] << bits;  // > CustomCode.jszip:7846
            bits += 8;  // > CustomCode.jszip:7847
          }  // > CustomCode.jszip:7848
          //===//  // > CustomCode.jszip:7849
          if (hold !== (state.check & 0xffff)) {  // > CustomCode.jszip:7850
            strm.msg = 'header crc mismatch';  // > CustomCode.jszip:7851
            state.mode = BAD;  // > CustomCode.jszip:7852
            break;  // > CustomCode.jszip:7853
          }  // > CustomCode.jszip:7854
          //=== INITBITS();  // > CustomCode.jszip:7855
          hold = 0;  // > CustomCode.jszip:7856
          bits = 0;  // > CustomCode.jszip:7857
          //===//  // > CustomCode.jszip:7858
        }  // > CustomCode.jszip:7859
        if (state.head) {  // > CustomCode.jszip:7860
          state.head.hcrc = ((state.flags >> 9) & 1);  // > CustomCode.jszip:7861
          state.head.done = true;  // > CustomCode.jszip:7862
        }  // > CustomCode.jszip:7863
        strm.adler = state.check = 0;  // > CustomCode.jszip:7864
        state.mode = TYPE;  // > CustomCode.jszip:7865
        break;  // > CustomCode.jszip:7866
      case DICTID:  // > CustomCode.jszip:7867
        //=== NEEDBITS(32); */  // > CustomCode.jszip:7868
        while (bits < 32) {  // > CustomCode.jszip:7869
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7870
          have--;  // > CustomCode.jszip:7871
          hold += input[next++] << bits;  // > CustomCode.jszip:7872
          bits += 8;  // > CustomCode.jszip:7873
        }  // > CustomCode.jszip:7874
        //===//  // > CustomCode.jszip:7875
        strm.adler = state.check = zswap32(hold);  // > CustomCode.jszip:7876
        //=== INITBITS();  // > CustomCode.jszip:7877
        hold = 0;  // > CustomCode.jszip:7878
        bits = 0;  // > CustomCode.jszip:7879
        //===//  // > CustomCode.jszip:7880
        state.mode = DICT;  // > CustomCode.jszip:7881
        /* falls through */  // > CustomCode.jszip:7882
      case DICT:  // > CustomCode.jszip:7883
        if (state.havedict === 0) {  // > CustomCode.jszip:7884
          //--- RESTORE() ---  // > CustomCode.jszip:7885
          strm.next_out = put;  // > CustomCode.jszip:7886
          strm.avail_out = left;  // > CustomCode.jszip:7887
          strm.next_in = next;  // > CustomCode.jszip:7888
          strm.avail_in = have;  // > CustomCode.jszip:7889
          state.hold = hold;  // > CustomCode.jszip:7890
          state.bits = bits;  // > CustomCode.jszip:7891
          //---  // > CustomCode.jszip:7892
          return Z_NEED_DICT;  // > CustomCode.jszip:7893
        }  // > CustomCode.jszip:7894
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;  // > CustomCode.jszip:7895
        state.mode = TYPE;  // > CustomCode.jszip:7896
        /* falls through */  // > CustomCode.jszip:7897
      case TYPE:  // > CustomCode.jszip:7898
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }  // > CustomCode.jszip:7899
        /* falls through */  // > CustomCode.jszip:7900
      case TYPEDO:  // > CustomCode.jszip:7901
        if (state.last) {  // > CustomCode.jszip:7902
          //--- BYTEBITS() ---//  // > CustomCode.jszip:7903
          hold >>>= bits & 7;  // > CustomCode.jszip:7904
          bits -= bits & 7;  // > CustomCode.jszip:7905
          //---//  // > CustomCode.jszip:7906
          state.mode = CHECK;  // > CustomCode.jszip:7907
          break;  // > CustomCode.jszip:7908
        }  // > CustomCode.jszip:7909
        //=== NEEDBITS(3); */  // > CustomCode.jszip:7910
        while (bits < 3) {  // > CustomCode.jszip:7911
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7912
          have--;  // > CustomCode.jszip:7913
          hold += input[next++] << bits;  // > CustomCode.jszip:7914
          bits += 8;  // > CustomCode.jszip:7915
        }  // > CustomCode.jszip:7916
        //===//  // > CustomCode.jszip:7917
        state.last = (hold & 0x01)/*BITS(1)*/;  // > CustomCode.jszip:7918
        //--- DROPBITS(1) ---//  // > CustomCode.jszip:7919
        hold >>>= 1;  // > CustomCode.jszip:7920
        bits -= 1;  // > CustomCode.jszip:7921
        //---//  // > CustomCode.jszip:7922
        switch ((hold & 0x03)/*BITS(2)*/) {  // > CustomCode.jszip:7923
        case 0:                             /* stored block */  // > CustomCode.jszip:7924
          //Tracev((stderr, "inflate:     stored block%s\n",  // > CustomCode.jszip:7925
          //        state.last ? " (last)" : ""));  // > CustomCode.jszip:7926
          state.mode = STORED;  // > CustomCode.jszip:7927
          break;  // > CustomCode.jszip:7928
        case 1:                             /* fixed block */  // > CustomCode.jszip:7929
          fixedtables(state);  // > CustomCode.jszip:7930
          //Tracev((stderr, "inflate:     fixed codes block%s\n",  // > CustomCode.jszip:7931
          //        state.last ? " (last)" : ""));  // > CustomCode.jszip:7932
          state.mode = LEN_;             /* decode codes */  // > CustomCode.jszip:7933
          if (flush === Z_TREES) {  // > CustomCode.jszip:7934
            //--- DROPBITS(2) ---//  // > CustomCode.jszip:7935
            hold >>>= 2;  // > CustomCode.jszip:7936
            bits -= 2;  // > CustomCode.jszip:7937
            //---//  // > CustomCode.jszip:7938
            break inf_leave;  // > CustomCode.jszip:7939
          }  // > CustomCode.jszip:7940
          break;  // > CustomCode.jszip:7941
        case 2:                             /* dynamic block */  // > CustomCode.jszip:7942
          //Tracev((stderr, "inflate:     dynamic codes block%s\n",  // > CustomCode.jszip:7943
          //        state.last ? " (last)" : ""));  // > CustomCode.jszip:7944
          state.mode = TABLE;  // > CustomCode.jszip:7945
          break;  // > CustomCode.jszip:7946
        case 3:  // > CustomCode.jszip:7947
          strm.msg = 'invalid block type';  // > CustomCode.jszip:7948
          state.mode = BAD;  // > CustomCode.jszip:7949
        }  // > CustomCode.jszip:7950
        //--- DROPBITS(2) ---//  // > CustomCode.jszip:7951
        hold >>>= 2;  // > CustomCode.jszip:7952
        bits -= 2;  // > CustomCode.jszip:7953
        //---//  // > CustomCode.jszip:7954
        break;  // > CustomCode.jszip:7955
      case STORED:  // > CustomCode.jszip:7956
        //--- BYTEBITS() ---// /* go to byte boundary */  // > CustomCode.jszip:7957
        hold >>>= bits & 7;  // > CustomCode.jszip:7958
        bits -= bits & 7;  // > CustomCode.jszip:7959
        //---//  // > CustomCode.jszip:7960
        //=== NEEDBITS(32); */  // > CustomCode.jszip:7961
        while (bits < 32) {  // > CustomCode.jszip:7962
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:7963
          have--;  // > CustomCode.jszip:7964
          hold += input[next++] << bits;  // > CustomCode.jszip:7965
          bits += 8;  // > CustomCode.jszip:7966
        }  // > CustomCode.jszip:7967
        //===//  // > CustomCode.jszip:7968
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {  // > CustomCode.jszip:7969
          strm.msg = 'invalid stored block lengths';  // > CustomCode.jszip:7970
          state.mode = BAD;  // > CustomCode.jszip:7971
          break;  // > CustomCode.jszip:7972
        }  // > CustomCode.jszip:7973
        state.length = hold & 0xffff;  // > CustomCode.jszip:7974
        //Tracev((stderr, "inflate:       stored length %u\n",  // > CustomCode.jszip:7975
        //        state.length));  // > CustomCode.jszip:7976
        //=== INITBITS();  // > CustomCode.jszip:7977
        hold = 0;  // > CustomCode.jszip:7978
        bits = 0;  // > CustomCode.jszip:7979
        //===//  // > CustomCode.jszip:7980
        state.mode = COPY_;  // > CustomCode.jszip:7981
        if (flush === Z_TREES) { break inf_leave; }  // > CustomCode.jszip:7982
        /* falls through */  // > CustomCode.jszip:7983
      case COPY_:  // > CustomCode.jszip:7984
        state.mode = COPY;  // > CustomCode.jszip:7985
        /* falls through */  // > CustomCode.jszip:7986
      case COPY:  // > CustomCode.jszip:7987
        copy = state.length;  // > CustomCode.jszip:7988
        if (copy) {  // > CustomCode.jszip:7989
          if (copy > have) { copy = have; }  // > CustomCode.jszip:7990
          if (copy > left) { copy = left; }  // > CustomCode.jszip:7991
          if (copy === 0) { break inf_leave; }  // > CustomCode.jszip:7992
          //--- zmemcpy(put, next, copy); ---  // > CustomCode.jszip:7993
          utils.arraySet(output, input, next, copy, put);  // > CustomCode.jszip:7994
          //---//  // > CustomCode.jszip:7995
          have -= copy;  // > CustomCode.jszip:7996
          next += copy;  // > CustomCode.jszip:7997
          left -= copy;  // > CustomCode.jszip:7998
          put += copy;  // > CustomCode.jszip:7999
          state.length -= copy;  // > CustomCode.jszip:8000
          break;  // > CustomCode.jszip:8001
        }  // > CustomCode.jszip:8002
        //Tracev((stderr, "inflate:       stored end\n"));  // > CustomCode.jszip:8003
        state.mode = TYPE;  // > CustomCode.jszip:8004
        break;  // > CustomCode.jszip:8005
      case TABLE:  // > CustomCode.jszip:8006
        //=== NEEDBITS(14); */  // > CustomCode.jszip:8007
        while (bits < 14) {  // > CustomCode.jszip:8008
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8009
          have--;  // > CustomCode.jszip:8010
          hold += input[next++] << bits;  // > CustomCode.jszip:8011
          bits += 8;  // > CustomCode.jszip:8012
        }  // > CustomCode.jszip:8013
        //===//  // > CustomCode.jszip:8014
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;  // > CustomCode.jszip:8015
        //--- DROPBITS(5) ---//  // > CustomCode.jszip:8016
        hold >>>= 5;  // > CustomCode.jszip:8017
        bits -= 5;  // > CustomCode.jszip:8018
        //---//  // > CustomCode.jszip:8019
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;  // > CustomCode.jszip:8020
        //--- DROPBITS(5) ---//  // > CustomCode.jszip:8021
        hold >>>= 5;  // > CustomCode.jszip:8022
        bits -= 5;  // > CustomCode.jszip:8023
        //---//  // > CustomCode.jszip:8024
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;  // > CustomCode.jszip:8025
        //--- DROPBITS(4) ---//  // > CustomCode.jszip:8026
        hold >>>= 4;  // > CustomCode.jszip:8027
        bits -= 4;  // > CustomCode.jszip:8028
        //---//  // > CustomCode.jszip:8029
  //#ifndef PKZIP_BUG_WORKAROUND  // > CustomCode.jszip:8030
        if (state.nlen > 286 || state.ndist > 30) {  // > CustomCode.jszip:8031
          strm.msg = 'too many length or distance symbols';  // > CustomCode.jszip:8032
          state.mode = BAD;  // > CustomCode.jszip:8033
          break;  // > CustomCode.jszip:8034
        }  // > CustomCode.jszip:8035
  //#endif  // > CustomCode.jszip:8036
        //Tracev((stderr, "inflate:       table sizes ok\n"));  // > CustomCode.jszip:8037
        state.have = 0;  // > CustomCode.jszip:8038
        state.mode = LENLENS;  // > CustomCode.jszip:8039
        /* falls through */  // > CustomCode.jszip:8040
      case LENLENS:  // > CustomCode.jszip:8041
        while (state.have < state.ncode) {  // > CustomCode.jszip:8042
          //=== NEEDBITS(3);  // > CustomCode.jszip:8043
          while (bits < 3) {  // > CustomCode.jszip:8044
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8045
            have--;  // > CustomCode.jszip:8046
            hold += input[next++] << bits;  // > CustomCode.jszip:8047
            bits += 8;  // > CustomCode.jszip:8048
          }  // > CustomCode.jszip:8049
          //===//  // > CustomCode.jszip:8050
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);  // > CustomCode.jszip:8051
          //--- DROPBITS(3) ---//  // > CustomCode.jszip:8052
          hold >>>= 3;  // > CustomCode.jszip:8053
          bits -= 3;  // > CustomCode.jszip:8054
          //---//  // > CustomCode.jszip:8055
        }  // > CustomCode.jszip:8056
        while (state.have < 19) {  // > CustomCode.jszip:8057
          state.lens[order[state.have++]] = 0;  // > CustomCode.jszip:8058
        }  // > CustomCode.jszip:8059
        // We have separate tables & no pointers. 2 commented lines below not needed.  // > CustomCode.jszip:8060
        //state.next = state.codes;  // > CustomCode.jszip:8061
        //state.lencode = state.next;  // > CustomCode.jszip:8062
        // Switch to use dynamic table  // > CustomCode.jszip:8063
        state.lencode = state.lendyn;  // > CustomCode.jszip:8064
        state.lenbits = 7;  // > CustomCode.jszip:8065
        opts = { bits: state.lenbits };  // > CustomCode.jszip:8066
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);  // > CustomCode.jszip:8067
        state.lenbits = opts.bits;  // > CustomCode.jszip:8068
        if (ret) {  // > CustomCode.jszip:8069
          strm.msg = 'invalid code lengths set';  // > CustomCode.jszip:8070
          state.mode = BAD;  // > CustomCode.jszip:8071
          break;  // > CustomCode.jszip:8072
        }  // > CustomCode.jszip:8073
        //Tracev((stderr, "inflate:       code lengths ok\n"));  // > CustomCode.jszip:8074
        state.have = 0;  // > CustomCode.jszip:8075
        state.mode = CODELENS;  // > CustomCode.jszip:8076
        /* falls through */  // > CustomCode.jszip:8077
      case CODELENS:  // > CustomCode.jszip:8078
        while (state.have < state.nlen + state.ndist) {  // > CustomCode.jszip:8079
          for (;;) {  // > CustomCode.jszip:8080
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/  // > CustomCode.jszip:8081
            here_bits = here >>> 24;  // > CustomCode.jszip:8082
            here_op = (here >>> 16) & 0xff;  // > CustomCode.jszip:8083
            here_val = here & 0xffff;  // > CustomCode.jszip:8084
            if ((here_bits) <= bits) { break; }  // > CustomCode.jszip:8085
            //--- PULLBYTE() ---//  // > CustomCode.jszip:8086
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8087
            have--;  // > CustomCode.jszip:8088
            hold += input[next++] << bits;  // > CustomCode.jszip:8089
            bits += 8;  // > CustomCode.jszip:8090
            //---//  // > CustomCode.jszip:8091
          }  // > CustomCode.jszip:8092
          if (here_val < 16) {  // > CustomCode.jszip:8093
            //--- DROPBITS(here.bits) ---//  // > CustomCode.jszip:8094
            hold >>>= here_bits;  // > CustomCode.jszip:8095
            bits -= here_bits;  // > CustomCode.jszip:8096
            //---//  // > CustomCode.jszip:8097
            state.lens[state.have++] = here_val;  // > CustomCode.jszip:8098
          }  // > CustomCode.jszip:8099
          else {  // > CustomCode.jszip:8100
            if (here_val === 16) {  // > CustomCode.jszip:8101
              //=== NEEDBITS(here.bits + 2);  // > CustomCode.jszip:8102
              n = here_bits + 2;  // > CustomCode.jszip:8103
              while (bits < n) {  // > CustomCode.jszip:8104
                if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8105
                have--;  // > CustomCode.jszip:8106
                hold += input[next++] << bits;  // > CustomCode.jszip:8107
                bits += 8;  // > CustomCode.jszip:8108
              }  // > CustomCode.jszip:8109
              //===//  // > CustomCode.jszip:8110
              //--- DROPBITS(here.bits) ---//  // > CustomCode.jszip:8111
              hold >>>= here_bits;  // > CustomCode.jszip:8112
              bits -= here_bits;  // > CustomCode.jszip:8113
              //---//  // > CustomCode.jszip:8114
              if (state.have === 0) {  // > CustomCode.jszip:8115
                strm.msg = 'invalid bit length repeat';  // > CustomCode.jszip:8116
                state.mode = BAD;  // > CustomCode.jszip:8117
                break;  // > CustomCode.jszip:8118
              }  // > CustomCode.jszip:8119
              len = state.lens[state.have - 1];  // > CustomCode.jszip:8120
              copy = 3 + (hold & 0x03);//BITS(2);  // > CustomCode.jszip:8121
              //--- DROPBITS(2) ---//  // > CustomCode.jszip:8122
              hold >>>= 2;  // > CustomCode.jszip:8123
              bits -= 2;  // > CustomCode.jszip:8124
              //---//  // > CustomCode.jszip:8125
            }  // > CustomCode.jszip:8126
            else if (here_val === 17) {  // > CustomCode.jszip:8127
              //=== NEEDBITS(here.bits + 3);  // > CustomCode.jszip:8128
              n = here_bits + 3;  // > CustomCode.jszip:8129
              while (bits < n) {  // > CustomCode.jszip:8130
                if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8131
                have--;  // > CustomCode.jszip:8132
                hold += input[next++] << bits;  // > CustomCode.jszip:8133
                bits += 8;  // > CustomCode.jszip:8134
              }  // > CustomCode.jszip:8135
              //===//  // > CustomCode.jszip:8136
              //--- DROPBITS(here.bits) ---//  // > CustomCode.jszip:8137
              hold >>>= here_bits;  // > CustomCode.jszip:8138
              bits -= here_bits;  // > CustomCode.jszip:8139
              //---//  // > CustomCode.jszip:8140
              len = 0;  // > CustomCode.jszip:8141
              copy = 3 + (hold & 0x07);//BITS(3);  // > CustomCode.jszip:8142
              //--- DROPBITS(3) ---//  // > CustomCode.jszip:8143
              hold >>>= 3;  // > CustomCode.jszip:8144
              bits -= 3;  // > CustomCode.jszip:8145
              //---//  // > CustomCode.jszip:8146
            }  // > CustomCode.jszip:8147
            else {  // > CustomCode.jszip:8148
              //=== NEEDBITS(here.bits + 7);  // > CustomCode.jszip:8149
              n = here_bits + 7;  // > CustomCode.jszip:8150
              while (bits < n) {  // > CustomCode.jszip:8151
                if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8152
                have--;  // > CustomCode.jszip:8153
                hold += input[next++] << bits;  // > CustomCode.jszip:8154
                bits += 8;  // > CustomCode.jszip:8155
              }  // > CustomCode.jszip:8156
              //===//  // > CustomCode.jszip:8157
              //--- DROPBITS(here.bits) ---//  // > CustomCode.jszip:8158
              hold >>>= here_bits;  // > CustomCode.jszip:8159
              bits -= here_bits;  // > CustomCode.jszip:8160
              //---//  // > CustomCode.jszip:8161
              len = 0;  // > CustomCode.jszip:8162
              copy = 11 + (hold & 0x7f);//BITS(7);  // > CustomCode.jszip:8163
              //--- DROPBITS(7) ---//  // > CustomCode.jszip:8164
              hold >>>= 7;  // > CustomCode.jszip:8165
              bits -= 7;  // > CustomCode.jszip:8166
              //---//  // > CustomCode.jszip:8167
            }  // > CustomCode.jszip:8168
            if (state.have + copy > state.nlen + state.ndist) {  // > CustomCode.jszip:8169
              strm.msg = 'invalid bit length repeat';  // > CustomCode.jszip:8170
              state.mode = BAD;  // > CustomCode.jszip:8171
              break;  // > CustomCode.jszip:8172
            }  // > CustomCode.jszip:8173
            while (copy--) {  // > CustomCode.jszip:8174
              state.lens[state.have++] = len;  // > CustomCode.jszip:8175
            }  // > CustomCode.jszip:8176
          }  // > CustomCode.jszip:8177
        }  // > CustomCode.jszip:8178
        /* handle error breaks in while */  // > CustomCode.jszip:8179
        if (state.mode === BAD) { break; }  // > CustomCode.jszip:8180
        /* check for end-of-block code (better have one) */  // > CustomCode.jszip:8181
        if (state.lens[256] === 0) {  // > CustomCode.jszip:8182
          strm.msg = 'invalid code -- missing end-of-block';  // > CustomCode.jszip:8183
          state.mode = BAD;  // > CustomCode.jszip:8184
          break;  // > CustomCode.jszip:8185
        }  // > CustomCode.jszip:8186
        /* build code tables -- note: do not change the lenbits or distbits  // > CustomCode.jszip:8187
           values here (9 and 6) without reading the comments in inftrees.h  // > CustomCode.jszip:8188
           concerning the ENOUGH constants, which depend on those values */  // > CustomCode.jszip:8189
        state.lenbits = 9;  // > CustomCode.jszip:8190
        opts = { bits: state.lenbits };  // > CustomCode.jszip:8191
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);  // > CustomCode.jszip:8192
        // We have separate tables & no pointers. 2 commented lines below not needed.  // > CustomCode.jszip:8193
        // state.next_index = opts.table_index;  // > CustomCode.jszip:8194
        state.lenbits = opts.bits;  // > CustomCode.jszip:8195
        // state.lencode = state.next;  // > CustomCode.jszip:8196
        if (ret) {  // > CustomCode.jszip:8197
          strm.msg = 'invalid literal/lengths set';  // > CustomCode.jszip:8198
          state.mode = BAD;  // > CustomCode.jszip:8199
          break;  // > CustomCode.jszip:8200
        }  // > CustomCode.jszip:8201
        state.distbits = 6;  // > CustomCode.jszip:8202
        //state.distcode.copy(state.codes);  // > CustomCode.jszip:8203
        // Switch to use dynamic table  // > CustomCode.jszip:8204
        state.distcode = state.distdyn;  // > CustomCode.jszip:8205
        opts = { bits: state.distbits };  // > CustomCode.jszip:8206
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);  // > CustomCode.jszip:8207
        // We have separate tables & no pointers. 2 commented lines below not needed.  // > CustomCode.jszip:8208
        // state.next_index = opts.table_index;  // > CustomCode.jszip:8209
        state.distbits = opts.bits;  // > CustomCode.jszip:8210
        // state.distcode = state.next;  // > CustomCode.jszip:8211
        if (ret) {  // > CustomCode.jszip:8212
          strm.msg = 'invalid distances set';  // > CustomCode.jszip:8213
          state.mode = BAD;  // > CustomCode.jszip:8214
          break;  // > CustomCode.jszip:8215
        }  // > CustomCode.jszip:8216
        //Tracev((stderr, 'inflate:       codes ok\n'));  // > CustomCode.jszip:8217
        state.mode = LEN_;  // > CustomCode.jszip:8218
        if (flush === Z_TREES) { break inf_leave; }  // > CustomCode.jszip:8219
        /* falls through */  // > CustomCode.jszip:8220
      case LEN_:  // > CustomCode.jszip:8221
        state.mode = LEN;  // > CustomCode.jszip:8222
        /* falls through */  // > CustomCode.jszip:8223
      case LEN:  // > CustomCode.jszip:8224
        if (have >= 6 && left >= 258) {  // > CustomCode.jszip:8225
          //--- RESTORE() ---  // > CustomCode.jszip:8226
          strm.next_out = put;  // > CustomCode.jszip:8227
          strm.avail_out = left;  // > CustomCode.jszip:8228
          strm.next_in = next;  // > CustomCode.jszip:8229
          strm.avail_in = have;  // > CustomCode.jszip:8230
          state.hold = hold;  // > CustomCode.jszip:8231
          state.bits = bits;  // > CustomCode.jszip:8232
          //---  // > CustomCode.jszip:8233
          inflate_fast(strm, _out);  // > CustomCode.jszip:8234
          //--- LOAD() ---  // > CustomCode.jszip:8235
          put = strm.next_out;  // > CustomCode.jszip:8236
          output = strm.output;  // > CustomCode.jszip:8237
          left = strm.avail_out;  // > CustomCode.jszip:8238
          next = strm.next_in;  // > CustomCode.jszip:8239
          input = strm.input;  // > CustomCode.jszip:8240
          have = strm.avail_in;  // > CustomCode.jszip:8241
          hold = state.hold;  // > CustomCode.jszip:8242
          bits = state.bits;  // > CustomCode.jszip:8243
          //---  // > CustomCode.jszip:8244
          if (state.mode === TYPE) {  // > CustomCode.jszip:8245
            state.back = -1;  // > CustomCode.jszip:8246
          }  // > CustomCode.jszip:8247
          break;  // > CustomCode.jszip:8248
        }  // > CustomCode.jszip:8249
        state.back = 0;  // > CustomCode.jszip:8250
        for (;;) {  // > CustomCode.jszip:8251
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/  // > CustomCode.jszip:8252
          here_bits = here >>> 24;  // > CustomCode.jszip:8253
          here_op = (here >>> 16) & 0xff;  // > CustomCode.jszip:8254
          here_val = here & 0xffff;  // > CustomCode.jszip:8255
          if (here_bits <= bits) { break; }  // > CustomCode.jszip:8256
          //--- PULLBYTE() ---//  // > CustomCode.jszip:8257
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8258
          have--;  // > CustomCode.jszip:8259
          hold += input[next++] << bits;  // > CustomCode.jszip:8260
          bits += 8;  // > CustomCode.jszip:8261
          //---//  // > CustomCode.jszip:8262
        }  // > CustomCode.jszip:8263
        if (here_op && (here_op & 0xf0) === 0) {  // > CustomCode.jszip:8264
          last_bits = here_bits;  // > CustomCode.jszip:8265
          last_op = here_op;  // > CustomCode.jszip:8266
          last_val = here_val;  // > CustomCode.jszip:8267
          for (;;) {  // > CustomCode.jszip:8268
            here = state.lencode[last_val +  // > CustomCode.jszip:8269
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];  // > CustomCode.jszip:8270
            here_bits = here >>> 24;  // > CustomCode.jszip:8271
            here_op = (here >>> 16) & 0xff;  // > CustomCode.jszip:8272
            here_val = here & 0xffff;  // > CustomCode.jszip:8273
            if ((last_bits + here_bits) <= bits) { break; }  // > CustomCode.jszip:8274
            //--- PULLBYTE() ---//  // > CustomCode.jszip:8275
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8276
            have--;  // > CustomCode.jszip:8277
            hold += input[next++] << bits;  // > CustomCode.jszip:8278
            bits += 8;  // > CustomCode.jszip:8279
            //---//  // > CustomCode.jszip:8280
          }  // > CustomCode.jszip:8281
          //--- DROPBITS(last.bits) ---//  // > CustomCode.jszip:8282
          hold >>>= last_bits;  // > CustomCode.jszip:8283
          bits -= last_bits;  // > CustomCode.jszip:8284
          //---//  // > CustomCode.jszip:8285
          state.back += last_bits;  // > CustomCode.jszip:8286
        }  // > CustomCode.jszip:8287
        //--- DROPBITS(here.bits) ---//  // > CustomCode.jszip:8288
        hold >>>= here_bits;  // > CustomCode.jszip:8289
        bits -= here_bits;  // > CustomCode.jszip:8290
        //---//  // > CustomCode.jszip:8291
        state.back += here_bits;  // > CustomCode.jszip:8292
        state.length = here_val;  // > CustomCode.jszip:8293
        if (here_op === 0) {  // > CustomCode.jszip:8294
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?  // > CustomCode.jszip:8295
          //        "inflate:         literal '%c'\n" :  // > CustomCode.jszip:8296
          //        "inflate:         literal 0x%02x\n", here.val));  // > CustomCode.jszip:8297
          state.mode = LIT;  // > CustomCode.jszip:8298
          break;  // > CustomCode.jszip:8299
        }  // > CustomCode.jszip:8300
        if (here_op & 32) {  // > CustomCode.jszip:8301
          //Tracevv((stderr, "inflate:         end of block\n"));  // > CustomCode.jszip:8302
          state.back = -1;  // > CustomCode.jszip:8303
          state.mode = TYPE;  // > CustomCode.jszip:8304
          break;  // > CustomCode.jszip:8305
        }  // > CustomCode.jszip:8306
        if (here_op & 64) {  // > CustomCode.jszip:8307
          strm.msg = 'invalid literal/length code';  // > CustomCode.jszip:8308
          state.mode = BAD;  // > CustomCode.jszip:8309
          break;  // > CustomCode.jszip:8310
        }  // > CustomCode.jszip:8311
        state.extra = here_op & 15;  // > CustomCode.jszip:8312
        state.mode = LENEXT;  // > CustomCode.jszip:8313
        /* falls through */  // > CustomCode.jszip:8314
      case LENEXT:  // > CustomCode.jszip:8315
        if (state.extra) {  // > CustomCode.jszip:8316
          //=== NEEDBITS(state.extra);  // > CustomCode.jszip:8317
          n = state.extra;  // > CustomCode.jszip:8318
          while (bits < n) {  // > CustomCode.jszip:8319
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8320
            have--;  // > CustomCode.jszip:8321
            hold += input[next++] << bits;  // > CustomCode.jszip:8322
            bits += 8;  // > CustomCode.jszip:8323
          }  // > CustomCode.jszip:8324
          //===//  // > CustomCode.jszip:8325
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;  // > CustomCode.jszip:8326
          //--- DROPBITS(state.extra) ---//  // > CustomCode.jszip:8327
          hold >>>= state.extra;  // > CustomCode.jszip:8328
          bits -= state.extra;  // > CustomCode.jszip:8329
          //---//  // > CustomCode.jszip:8330
          state.back += state.extra;  // > CustomCode.jszip:8331
        }  // > CustomCode.jszip:8332
        //Tracevv((stderr, "inflate:         length %u\n", state.length));  // > CustomCode.jszip:8333
        state.was = state.length;  // > CustomCode.jszip:8334
        state.mode = DIST;  // > CustomCode.jszip:8335
        /* falls through */  // > CustomCode.jszip:8336
      case DIST:  // > CustomCode.jszip:8337
        for (;;) {  // > CustomCode.jszip:8338
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/  // > CustomCode.jszip:8339
          here_bits = here >>> 24;  // > CustomCode.jszip:8340
          here_op = (here >>> 16) & 0xff;  // > CustomCode.jszip:8341
          here_val = here & 0xffff;  // > CustomCode.jszip:8342
          if ((here_bits) <= bits) { break; }  // > CustomCode.jszip:8343
          //--- PULLBYTE() ---//  // > CustomCode.jszip:8344
          if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8345
          have--;  // > CustomCode.jszip:8346
          hold += input[next++] << bits;  // > CustomCode.jszip:8347
          bits += 8;  // > CustomCode.jszip:8348
          //---//  // > CustomCode.jszip:8349
        }  // > CustomCode.jszip:8350
        if ((here_op & 0xf0) === 0) {  // > CustomCode.jszip:8351
          last_bits = here_bits;  // > CustomCode.jszip:8352
          last_op = here_op;  // > CustomCode.jszip:8353
          last_val = here_val;  // > CustomCode.jszip:8354
          for (;;) {  // > CustomCode.jszip:8355
            here = state.distcode[last_val +  // > CustomCode.jszip:8356
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];  // > CustomCode.jszip:8357
            here_bits = here >>> 24;  // > CustomCode.jszip:8358
            here_op = (here >>> 16) & 0xff;  // > CustomCode.jszip:8359
            here_val = here & 0xffff;  // > CustomCode.jszip:8360
            if ((last_bits + here_bits) <= bits) { break; }  // > CustomCode.jszip:8361
            //--- PULLBYTE() ---//  // > CustomCode.jszip:8362
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8363
            have--;  // > CustomCode.jszip:8364
            hold += input[next++] << bits;  // > CustomCode.jszip:8365
            bits += 8;  // > CustomCode.jszip:8366
            //---//  // > CustomCode.jszip:8367
          }  // > CustomCode.jszip:8368
          //--- DROPBITS(last.bits) ---//  // > CustomCode.jszip:8369
          hold >>>= last_bits;  // > CustomCode.jszip:8370
          bits -= last_bits;  // > CustomCode.jszip:8371
          //---//  // > CustomCode.jszip:8372
          state.back += last_bits;  // > CustomCode.jszip:8373
        }  // > CustomCode.jszip:8374
        //--- DROPBITS(here.bits) ---//  // > CustomCode.jszip:8375
        hold >>>= here_bits;  // > CustomCode.jszip:8376
        bits -= here_bits;  // > CustomCode.jszip:8377
        //---//  // > CustomCode.jszip:8378
        state.back += here_bits;  // > CustomCode.jszip:8379
        if (here_op & 64) {  // > CustomCode.jszip:8380
          strm.msg = 'invalid distance code';  // > CustomCode.jszip:8381
          state.mode = BAD;  // > CustomCode.jszip:8382
          break;  // > CustomCode.jszip:8383
        }  // > CustomCode.jszip:8384
        state.offset = here_val;  // > CustomCode.jszip:8385
        state.extra = (here_op) & 15;  // > CustomCode.jszip:8386
        state.mode = DISTEXT;  // > CustomCode.jszip:8387
        /* falls through */  // > CustomCode.jszip:8388
      case DISTEXT:  // > CustomCode.jszip:8389
        if (state.extra) {  // > CustomCode.jszip:8390
          //=== NEEDBITS(state.extra);  // > CustomCode.jszip:8391
          n = state.extra;  // > CustomCode.jszip:8392
          while (bits < n) {  // > CustomCode.jszip:8393
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8394
            have--;  // > CustomCode.jszip:8395
            hold += input[next++] << bits;  // > CustomCode.jszip:8396
            bits += 8;  // > CustomCode.jszip:8397
          }  // > CustomCode.jszip:8398
          //===//  // > CustomCode.jszip:8399
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;  // > CustomCode.jszip:8400
          //--- DROPBITS(state.extra) ---//  // > CustomCode.jszip:8401
          hold >>>= state.extra;  // > CustomCode.jszip:8402
          bits -= state.extra;  // > CustomCode.jszip:8403
          //---//  // > CustomCode.jszip:8404
          state.back += state.extra;  // > CustomCode.jszip:8405
        }  // > CustomCode.jszip:8406
  //#ifdef INFLATE_STRICT  // > CustomCode.jszip:8407
        if (state.offset > state.dmax) {  // > CustomCode.jszip:8408
          strm.msg = 'invalid distance too far back';  // > CustomCode.jszip:8409
          state.mode = BAD;  // > CustomCode.jszip:8410
          break;  // > CustomCode.jszip:8411
        }  // > CustomCode.jszip:8412
  //#endif  // > CustomCode.jszip:8413
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));  // > CustomCode.jszip:8414
        state.mode = MATCH;  // > CustomCode.jszip:8415
        /* falls through */  // > CustomCode.jszip:8416
      case MATCH:  // > CustomCode.jszip:8417
        if (left === 0) { break inf_leave; }  // > CustomCode.jszip:8418
        copy = _out - left;  // > CustomCode.jszip:8419
        if (state.offset > copy) {         /* copy from window */  // > CustomCode.jszip:8420
          copy = state.offset - copy;  // > CustomCode.jszip:8421
          if (copy > state.whave) {  // > CustomCode.jszip:8422
            if (state.sane) {  // > CustomCode.jszip:8423
              strm.msg = 'invalid distance too far back';  // > CustomCode.jszip:8424
              state.mode = BAD;  // > CustomCode.jszip:8425
              break;  // > CustomCode.jszip:8426
            }  // > CustomCode.jszip:8427
  // (!) This block is disabled in zlib defailts,  // > CustomCode.jszip:8428
  // don't enable it for binary compatibility  // > CustomCode.jszip:8429
  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR  // > CustomCode.jszip:8430
  //          Trace((stderr, "inflate.c too far\n"));  // > CustomCode.jszip:8431
  //          copy -= state.whave;  // > CustomCode.jszip:8432
  //          if (copy > state.length) { copy = state.length; }  // > CustomCode.jszip:8433
  //          if (copy > left) { copy = left; }  // > CustomCode.jszip:8434
  //          left -= copy;  // > CustomCode.jszip:8435
  //          state.length -= copy;  // > CustomCode.jszip:8436
  //          do {  // > CustomCode.jszip:8437
  //            output[put++] = 0;  // > CustomCode.jszip:8438
  //          } while (--copy);  // > CustomCode.jszip:8439
  //          if (state.length === 0) { state.mode = LEN; }  // > CustomCode.jszip:8440
  //          break;  // > CustomCode.jszip:8441
  //#endif  // > CustomCode.jszip:8442
          }  // > CustomCode.jszip:8443
          if (copy > state.wnext) {  // > CustomCode.jszip:8444
            copy -= state.wnext;  // > CustomCode.jszip:8445
            from = state.wsize - copy;  // > CustomCode.jszip:8446
          }  // > CustomCode.jszip:8447
          else {  // > CustomCode.jszip:8448
            from = state.wnext - copy;  // > CustomCode.jszip:8449
          }  // > CustomCode.jszip:8450
          if (copy > state.length) { copy = state.length; }  // > CustomCode.jszip:8451
          from_source = state.window;  // > CustomCode.jszip:8452
        }  // > CustomCode.jszip:8453
        else {                              /* copy from output */  // > CustomCode.jszip:8454
          from_source = output;  // > CustomCode.jszip:8455
          from = put - state.offset;  // > CustomCode.jszip:8456
          copy = state.length;  // > CustomCode.jszip:8457
        }  // > CustomCode.jszip:8458
        if (copy > left) { copy = left; }  // > CustomCode.jszip:8459
        left -= copy;  // > CustomCode.jszip:8460
        state.length -= copy;  // > CustomCode.jszip:8461
        do {  // > CustomCode.jszip:8462
          output[put++] = from_source[from++];  // > CustomCode.jszip:8463
        } while (--copy);  // > CustomCode.jszip:8464
        if (state.length === 0) { state.mode = LEN; }  // > CustomCode.jszip:8465
        break;  // > CustomCode.jszip:8466
      case LIT:  // > CustomCode.jszip:8467
        if (left === 0) { break inf_leave; }  // > CustomCode.jszip:8468
        output[put++] = state.length;  // > CustomCode.jszip:8469
        left--;  // > CustomCode.jszip:8470
        state.mode = LEN;  // > CustomCode.jszip:8471
        break;  // > CustomCode.jszip:8472
      case CHECK:  // > CustomCode.jszip:8473
        if (state.wrap) {  // > CustomCode.jszip:8474
          //=== NEEDBITS(32);  // > CustomCode.jszip:8475
          while (bits < 32) {  // > CustomCode.jszip:8476
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8477
            have--;  // > CustomCode.jszip:8478
            // Use '|' insdead of '+' to make sure that result is signed  // > CustomCode.jszip:8479
            hold |= input[next++] << bits;  // > CustomCode.jszip:8480
            bits += 8;  // > CustomCode.jszip:8481
          }  // > CustomCode.jszip:8482
          //===//  // > CustomCode.jszip:8483
          _out -= left;  // > CustomCode.jszip:8484
          strm.total_out += _out;  // > CustomCode.jszip:8485
          state.total += _out;  // > CustomCode.jszip:8486
          if (_out) {  // > CustomCode.jszip:8487
            strm.adler = state.check =  // > CustomCode.jszip:8488
                /*UPDATE(state.check, put - _out, _out);*/  // > CustomCode.jszip:8489
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));  // > CustomCode.jszip:8490
          }  // > CustomCode.jszip:8491
          _out = left;  // > CustomCode.jszip:8492
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too  // > CustomCode.jszip:8493
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {  // > CustomCode.jszip:8494
            strm.msg = 'incorrect data check';  // > CustomCode.jszip:8495
            state.mode = BAD;  // > CustomCode.jszip:8496
            break;  // > CustomCode.jszip:8497
          }  // > CustomCode.jszip:8498
          //=== INITBITS();  // > CustomCode.jszip:8499
          hold = 0;  // > CustomCode.jszip:8500
          bits = 0;  // > CustomCode.jszip:8501
          //===//  // > CustomCode.jszip:8502
          //Tracev((stderr, "inflate:   check matches trailer\n"));  // > CustomCode.jszip:8503
        }  // > CustomCode.jszip:8504
        state.mode = LENGTH;  // > CustomCode.jszip:8505
        /* falls through */  // > CustomCode.jszip:8506
      case LENGTH:  // > CustomCode.jszip:8507
        if (state.wrap && state.flags) {  // > CustomCode.jszip:8508
          //=== NEEDBITS(32);  // > CustomCode.jszip:8509
          while (bits < 32) {  // > CustomCode.jszip:8510
            if (have === 0) { break inf_leave; }  // > CustomCode.jszip:8511
            have--;  // > CustomCode.jszip:8512
            hold += input[next++] << bits;  // > CustomCode.jszip:8513
            bits += 8;  // > CustomCode.jszip:8514
          }  // > CustomCode.jszip:8515
          //===//  // > CustomCode.jszip:8516
          if (hold !== (state.total & 0xffffffff)) {  // > CustomCode.jszip:8517
            strm.msg = 'incorrect length check';  // > CustomCode.jszip:8518
            state.mode = BAD;  // > CustomCode.jszip:8519
            break;  // > CustomCode.jszip:8520
          }  // > CustomCode.jszip:8521
          //=== INITBITS();  // > CustomCode.jszip:8522
          hold = 0;  // > CustomCode.jszip:8523
          bits = 0;  // > CustomCode.jszip:8524
          //===//  // > CustomCode.jszip:8525
          //Tracev((stderr, "inflate:   length matches trailer\n"));  // > CustomCode.jszip:8526
        }  // > CustomCode.jszip:8527
        state.mode = DONE;  // > CustomCode.jszip:8528
        /* falls through */  // > CustomCode.jszip:8529
      case DONE:  // > CustomCode.jszip:8530
        ret = Z_STREAM_END;  // > CustomCode.jszip:8531
        break inf_leave;  // > CustomCode.jszip:8532
      case BAD:  // > CustomCode.jszip:8533
        ret = Z_DATA_ERROR;  // > CustomCode.jszip:8534
        break inf_leave;  // > CustomCode.jszip:8535
      case MEM:  // > CustomCode.jszip:8536
        return Z_MEM_ERROR;  // > CustomCode.jszip:8537
      case SYNC:  // > CustomCode.jszip:8538
        /* falls through */  // > CustomCode.jszip:8539
      default:  // > CustomCode.jszip:8540
        return Z_STREAM_ERROR;  // > CustomCode.jszip:8541
      }  // > CustomCode.jszip:8542
    }  // > CustomCode.jszip:8543
    // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"  // > CustomCode.jszip:8544
    /*  // > CustomCode.jszip:8545
       Return from inflate(), updating the total counts and the check value.  // > CustomCode.jszip:8546
       If there was no progress during the inflate() call, return a buffer  // > CustomCode.jszip:8547
       error.  Call updatewindow() to create and/or update the window state.  // > CustomCode.jszip:8548
       Note: a memory error from inflate() is non-recoverable.  // > CustomCode.jszip:8549
     */  // > CustomCode.jszip:8550
    //--- RESTORE() ---  // > CustomCode.jszip:8551
    strm.next_out = put;  // > CustomCode.jszip:8552
    strm.avail_out = left;  // > CustomCode.jszip:8553
    strm.next_in = next;  // > CustomCode.jszip:8554
    strm.avail_in = have;  // > CustomCode.jszip:8555
    state.hold = hold;  // > CustomCode.jszip:8556
    state.bits = bits;  // > CustomCode.jszip:8557
    //---  // > CustomCode.jszip:8558
    if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&  // > CustomCode.jszip:8559
                        (state.mode < CHECK || flush !== Z_FINISH))) {  // > CustomCode.jszip:8560
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {  // > CustomCode.jszip:8561
        state.mode = MEM;  // > CustomCode.jszip:8562
        return Z_MEM_ERROR;  // > CustomCode.jszip:8563
      }  // > CustomCode.jszip:8564
    }  // > CustomCode.jszip:8565
    _in -= strm.avail_in;  // > CustomCode.jszip:8566
    _out -= strm.avail_out;  // > CustomCode.jszip:8567
    strm.total_in += _in;  // > CustomCode.jszip:8568
    strm.total_out += _out;  // > CustomCode.jszip:8569
    state.total += _out;  // > CustomCode.jszip:8570
    if (state.wrap && _out) {  // > CustomCode.jszip:8571
      strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/  // > CustomCode.jszip:8572
        (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));  // > CustomCode.jszip:8573
    }  // > CustomCode.jszip:8574
    strm.data_type = state.bits + (state.last ? 64 : 0) +  // > CustomCode.jszip:8575
                      (state.mode === TYPE ? 128 : 0) +  // > CustomCode.jszip:8576
                      (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);  // > CustomCode.jszip:8577
    if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {  // > CustomCode.jszip:8578
      ret = Z_BUF_ERROR;  // > CustomCode.jszip:8579
    }  // > CustomCode.jszip:8580
    return ret;  // > CustomCode.jszip:8581
  }  // > CustomCode.jszip:8582
  function inflateEnd(strm) {  // > CustomCode.jszip:8583
    if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {  // > CustomCode.jszip:8584
      return Z_STREAM_ERROR;  // > CustomCode.jszip:8585
    }  // > CustomCode.jszip:8586
    var state = strm.state;  // > CustomCode.jszip:8587
    if (state.window) {  // > CustomCode.jszip:8588
      state.window = null;  // > CustomCode.jszip:8589
    }  // > CustomCode.jszip:8590
    strm.state = null;  // > CustomCode.jszip:8591
    return Z_OK;  // > CustomCode.jszip:8592
  }  // > CustomCode.jszip:8593
  function inflateGetHeader(strm, head) {  // > CustomCode.jszip:8594
    var state;  // > CustomCode.jszip:8595
    /* check state */  // > CustomCode.jszip:8596
    if (!strm || !strm.state) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:8597
    state = strm.state;  // > CustomCode.jszip:8598
    if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:8599
    /* save header structure */  // > CustomCode.jszip:8600
    state.head = head;  // > CustomCode.jszip:8601
    head.done = false;  // > CustomCode.jszip:8602
    return Z_OK;  // > CustomCode.jszip:8603
  }  // > CustomCode.jszip:8604
  function inflateSetDictionary(strm, dictionary) {  // > CustomCode.jszip:8605
    var dictLength = dictionary.length;  // > CustomCode.jszip:8606
    var state;  // > CustomCode.jszip:8607
    var dictid;  // > CustomCode.jszip:8608
    var ret;  // > CustomCode.jszip:8609
    /* check state */  // > CustomCode.jszip:8610
    if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }  // > CustomCode.jszip:8611
    state = strm.state;  // > CustomCode.jszip:8612
    if (state.wrap !== 0 && state.mode !== DICT) {  // > CustomCode.jszip:8613
      return Z_STREAM_ERROR;  // > CustomCode.jszip:8614
    }  // > CustomCode.jszip:8615
    /* check for correct dictionary identifier */  // > CustomCode.jszip:8616
    if (state.mode === DICT) {  // > CustomCode.jszip:8617
      dictid = 1; /* adler32(0, null, 0)*/  // > CustomCode.jszip:8618
      /* dictid = adler32(dictid, dictionary, dictLength); */  // > CustomCode.jszip:8619
      dictid = adler32(dictid, dictionary, dictLength, 0);  // > CustomCode.jszip:8620
      if (dictid !== state.check) {  // > CustomCode.jszip:8621
        return Z_DATA_ERROR;  // > CustomCode.jszip:8622
      }  // > CustomCode.jszip:8623
    }  // > CustomCode.jszip:8624
    /* copy dictionary to window using updatewindow(), which will amend the  // > CustomCode.jszip:8625
     existing dictionary if appropriate */  // > CustomCode.jszip:8626
    ret = updatewindow(strm, dictionary, dictLength, dictLength);  // > CustomCode.jszip:8627
    if (ret) {  // > CustomCode.jszip:8628
      state.mode = MEM;  // > CustomCode.jszip:8629
      return Z_MEM_ERROR;  // > CustomCode.jszip:8630
    }  // > CustomCode.jszip:8631
    state.havedict = 1;  // > CustomCode.jszip:8632
    // Tracev((stderr, "inflate:   dictionary set\n"));  // > CustomCode.jszip:8633
    return Z_OK;  // > CustomCode.jszip:8634
  }  // > CustomCode.jszip:8635
  exports.inflateReset = inflateReset;  // > CustomCode.jszip:8636
  exports.inflateReset2 = inflateReset2;  // > CustomCode.jszip:8637
  exports.inflateResetKeep = inflateResetKeep;  // > CustomCode.jszip:8638
  exports.inflateInit = inflateInit;  // > CustomCode.jszip:8639
  exports.inflateInit2 = inflateInit2;  // > CustomCode.jszip:8640
  exports.inflate = inflate;  // > CustomCode.jszip:8641
  exports.inflateEnd = inflateEnd;  // > CustomCode.jszip:8642
  exports.inflateGetHeader = inflateGetHeader;  // > CustomCode.jszip:8643
  exports.inflateSetDictionary = inflateSetDictionary;  // > CustomCode.jszip:8644
  exports.inflateInfo = 'pako inflate (from Nodeca project)';  // > CustomCode.jszip:8645
  /* Not implemented  // > CustomCode.jszip:8646
  exports.inflateCopy = inflateCopy;  // > CustomCode.jszip:8647
  exports.inflateGetDictionary = inflateGetDictionary;  // > CustomCode.jszip:8648
  exports.inflateMark = inflateMark;  // > CustomCode.jszip:8649
  exports.inflatePrime = inflatePrime;  // > CustomCode.jszip:8650
  exports.inflateSync = inflateSync;  // > CustomCode.jszip:8651
  exports.inflateSyncPoint = inflateSyncPoint;  // > CustomCode.jszip:8652
  exports.inflateUndermine = inflateUndermine;  // > CustomCode.jszip:8653
  */  // > CustomCode.jszip:8654
  },{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(require,module,exports){  // > CustomCode.jszip:8655
  'use strict';  // > CustomCode.jszip:8656
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:8657
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:8658
  //  // > CustomCode.jszip:8659
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:8660
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:8661
  // arising from the use of this software.  // > CustomCode.jszip:8662
  //  // > CustomCode.jszip:8663
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:8664
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:8665
  // freely, subject to the following restrictions:  // > CustomCode.jszip:8666
  //  // > CustomCode.jszip:8667
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:8668
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:8669
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:8670
  //   appreciated but is not required.  // > CustomCode.jszip:8671
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:8672
  //   misrepresented as being the original software.  // > CustomCode.jszip:8673
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:8674
  var utils = require('../utils/common');  // > CustomCode.jszip:8675
  var MAXBITS = 15;  // > CustomCode.jszip:8676
  var ENOUGH_LENS = 852;  // > CustomCode.jszip:8677
  var ENOUGH_DISTS = 592;  // > CustomCode.jszip:8678
  //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);  // > CustomCode.jszip:8679
  var CODES = 0;  // > CustomCode.jszip:8680
  var LENS = 1;  // > CustomCode.jszip:8681
  var DISTS = 2;  // > CustomCode.jszip:8682
  var lbase = [ /* Length codes 257..285 base */  // > CustomCode.jszip:8683
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,  // > CustomCode.jszip:8684
    35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0  // > CustomCode.jszip:8685
  ];  // > CustomCode.jszip:8686
  var lext = [ /* Length codes 257..285 extra */  // > CustomCode.jszip:8687
    16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,  // > CustomCode.jszip:8688
    19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78  // > CustomCode.jszip:8689
  ];  // > CustomCode.jszip:8690
  var dbase = [ /* Distance codes 0..29 base */  // > CustomCode.jszip:8691
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,  // > CustomCode.jszip:8692
    257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,  // > CustomCode.jszip:8693
    8193, 12289, 16385, 24577, 0, 0  // > CustomCode.jszip:8694
  ];  // > CustomCode.jszip:8695
  var dext = [ /* Distance codes 0..29 extra */  // > CustomCode.jszip:8696
    16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,  // > CustomCode.jszip:8697
    23, 23, 24, 24, 25, 25, 26, 26, 27, 27,  // > CustomCode.jszip:8698
    28, 28, 29, 29, 64, 64  // > CustomCode.jszip:8699
  ];  // > CustomCode.jszip:8700
  module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)  // > CustomCode.jszip:8701
  {  // > CustomCode.jszip:8702
    var bits = opts.bits;  // > CustomCode.jszip:8703
        //here = opts.here; /* table entry for duplication */  // > CustomCode.jszip:8704
    var len = 0;               /* a code's length in bits */  // > CustomCode.jszip:8705
    var sym = 0;               /* index of code symbols */  // > CustomCode.jszip:8706
    var min = 0, max = 0;          /* minimum and maximum code lengths */  // > CustomCode.jszip:8707
    var root = 0;              /* number of index bits for root table */  // > CustomCode.jszip:8708
    var curr = 0;              /* number of index bits for current table */  // > CustomCode.jszip:8709
    var drop = 0;              /* code bits to drop for sub-table */  // > CustomCode.jszip:8710
    var left = 0;                   /* number of prefix codes available */  // > CustomCode.jszip:8711
    var used = 0;              /* code entries in table used */  // > CustomCode.jszip:8712
    var huff = 0;              /* Huffman code */  // > CustomCode.jszip:8713
    var incr;              /* for incrementing code, index */  // > CustomCode.jszip:8714
    var fill;              /* index for replicating entries */  // > CustomCode.jszip:8715
    var low;               /* low bits for current root entry */  // > CustomCode.jszip:8716
    var mask;              /* mask for low root bits */  // > CustomCode.jszip:8717
    var next;             /* next available space in table */  // > CustomCode.jszip:8718
    var base = null;     /* base value table to use */  // > CustomCode.jszip:8719
    var base_index = 0;  // > CustomCode.jszip:8720
  //  var shoextra;    /* extra bits table to use */  // > CustomCode.jszip:8721
    var end;                    /* use base and extra for symbol > end */  // > CustomCode.jszip:8722
    var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */  // > CustomCode.jszip:8723
    var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */  // > CustomCode.jszip:8724
    var extra = null;  // > CustomCode.jszip:8725
    var extra_index = 0;  // > CustomCode.jszip:8726
    var here_bits, here_op, here_val;  // > CustomCode.jszip:8727
    /*  // > CustomCode.jszip:8728
     Process a set of code lengths to create a canonical Huffman code.  The  // > CustomCode.jszip:8729
     code lengths are lens[0..codes-1].  Each length corresponds to the  // > CustomCode.jszip:8730
     symbols 0..codes-1.  The Huffman code is generated by first sorting the  // > CustomCode.jszip:8731
     symbols by length from short to long, and retaining the symbol order  // > CustomCode.jszip:8732
     for codes with equal lengths.  Then the code starts with all zero bits  // > CustomCode.jszip:8733
     for the first code of the shortest length, and the codes are integer  // > CustomCode.jszip:8734
     increments for the same length, and zeros are appended as the length  // > CustomCode.jszip:8735
     increases.  For the deflate format, these bits are stored backwards  // > CustomCode.jszip:8736
     from their more natural integer increment ordering, and so when the  // > CustomCode.jszip:8737
     decoding tables are built in the large loop below, the integer codes  // > CustomCode.jszip:8738
     are incremented backwards.  // > CustomCode.jszip:8739
     This routine assumes, but does not check, that all of the entries in  // > CustomCode.jszip:8740
     lens[] are in the range 0..MAXBITS.  The caller must assure this.  // > CustomCode.jszip:8741
     1..MAXBITS is interpreted as that code length.  zero means that that  // > CustomCode.jszip:8742
     symbol does not occur in this code.  // > CustomCode.jszip:8743
     The codes are sorted by computing a count of codes for each length,  // > CustomCode.jszip:8744
     creating from that a table of starting indices for each length in the  // > CustomCode.jszip:8745
     sorted table, and then entering the symbols in order in the sorted  // > CustomCode.jszip:8746
     table.  The sorted table is work[], with that space being provided by  // > CustomCode.jszip:8747
     the caller.  // > CustomCode.jszip:8748
     The length counts are used for other purposes as well, i.e. finding  // > CustomCode.jszip:8749
     the minimum and maximum length codes, determining if there are any  // > CustomCode.jszip:8750
     codes at all, checking for a valid set of lengths, and looking ahead  // > CustomCode.jszip:8751
     at length counts to determine sub-table sizes when building the  // > CustomCode.jszip:8752
     decoding tables.  // > CustomCode.jszip:8753
     */  // > CustomCode.jszip:8754
    /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */  // > CustomCode.jszip:8755
    for (len = 0; len <= MAXBITS; len++) {  // > CustomCode.jszip:8756
      count[len] = 0;  // > CustomCode.jszip:8757
    }  // > CustomCode.jszip:8758
    for (sym = 0; sym < codes; sym++) {  // > CustomCode.jszip:8759
      count[lens[lens_index + sym]]++;  // > CustomCode.jszip:8760
    }  // > CustomCode.jszip:8761
    /* bound code lengths, force root to be within code lengths */  // > CustomCode.jszip:8762
    root = bits;  // > CustomCode.jszip:8763
    for (max = MAXBITS; max >= 1; max--) {  // > CustomCode.jszip:8764
      if (count[max] !== 0) { break; }  // > CustomCode.jszip:8765
    }  // > CustomCode.jszip:8766
    if (root > max) {  // > CustomCode.jszip:8767
      root = max;  // > CustomCode.jszip:8768
    }  // > CustomCode.jszip:8769
    if (max === 0) {                     /* no symbols to code at all */  // > CustomCode.jszip:8770
      //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */  // > CustomCode.jszip:8771
      //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;  // > CustomCode.jszip:8772
      //table.val[opts.table_index++] = 0;   //here.val = (var short)0;  // > CustomCode.jszip:8773
      table[table_index++] = (1 << 24) | (64 << 16) | 0;  // > CustomCode.jszip:8774
      //table.op[opts.table_index] = 64;  // > CustomCode.jszip:8775
      //table.bits[opts.table_index] = 1;  // > CustomCode.jszip:8776
      //table.val[opts.table_index++] = 0;  // > CustomCode.jszip:8777
      table[table_index++] = (1 << 24) | (64 << 16) | 0;  // > CustomCode.jszip:8778
      opts.bits = 1;  // > CustomCode.jszip:8779
      return 0;     /* no symbols, but wait for decoding to report error */  // > CustomCode.jszip:8780
    }  // > CustomCode.jszip:8781
    for (min = 1; min < max; min++) {  // > CustomCode.jszip:8782
      if (count[min] !== 0) { break; }  // > CustomCode.jszip:8783
    }  // > CustomCode.jszip:8784
    if (root < min) {  // > CustomCode.jszip:8785
      root = min;  // > CustomCode.jszip:8786
    }  // > CustomCode.jszip:8787
    /* check for an over-subscribed or incomplete set of lengths */  // > CustomCode.jszip:8788
    left = 1;  // > CustomCode.jszip:8789
    for (len = 1; len <= MAXBITS; len++) {  // > CustomCode.jszip:8790
      left <<= 1;  // > CustomCode.jszip:8791
      left -= count[len];  // > CustomCode.jszip:8792
      if (left < 0) {  // > CustomCode.jszip:8793
        return -1;  // > CustomCode.jszip:8794
      }        /* over-subscribed */  // > CustomCode.jszip:8795
    }  // > CustomCode.jszip:8796
    if (left > 0 && (type === CODES || max !== 1)) {  // > CustomCode.jszip:8797
      return -1;                      /* incomplete set */  // > CustomCode.jszip:8798
    }  // > CustomCode.jszip:8799
    /* generate offsets into symbol table for each length for sorting */  // > CustomCode.jszip:8800
    offs[1] = 0;  // > CustomCode.jszip:8801
    for (len = 1; len < MAXBITS; len++) {  // > CustomCode.jszip:8802
      offs[len + 1] = offs[len] + count[len];  // > CustomCode.jszip:8803
    }  // > CustomCode.jszip:8804
    /* sort symbols by length, by symbol order within each length */  // > CustomCode.jszip:8805
    for (sym = 0; sym < codes; sym++) {  // > CustomCode.jszip:8806
      if (lens[lens_index + sym] !== 0) {  // > CustomCode.jszip:8807
        work[offs[lens[lens_index + sym]]++] = sym;  // > CustomCode.jszip:8808
      }  // > CustomCode.jszip:8809
    }  // > CustomCode.jszip:8810
    /*  // > CustomCode.jszip:8811
     Create and fill in decoding tables.  In this loop, the table being  // > CustomCode.jszip:8812
     filled is at next and has curr index bits.  The code being used is huff  // > CustomCode.jszip:8813
     with length len.  That code is converted to an index by dropping drop  // > CustomCode.jszip:8814
     bits off of the bottom.  For codes where len is less than drop + curr,  // > CustomCode.jszip:8815
     those top drop + curr - len bits are incremented through all values to  // > CustomCode.jszip:8816
     fill the table with replicated entries.  // > CustomCode.jszip:8817
     root is the number of index bits for the root table.  When len exceeds  // > CustomCode.jszip:8818
     root, sub-tables are created pointed to by the root entry with an index  // > CustomCode.jszip:8819
     of the low root bits of huff.  This is saved in low to check for when a  // > CustomCode.jszip:8820
     new sub-table should be started.  drop is zero when the root table is  // > CustomCode.jszip:8821
     being filled, and drop is root when sub-tables are being filled.  // > CustomCode.jszip:8822
     When a new sub-table is needed, it is necessary to look ahead in the  // > CustomCode.jszip:8823
     code lengths to determine what size sub-table is needed.  The length  // > CustomCode.jszip:8824
     counts are used for this, and so count[] is decremented as codes are  // > CustomCode.jszip:8825
     entered in the tables.  // > CustomCode.jszip:8826
     used keeps track of how many table entries have been allocated from the  // > CustomCode.jszip:8827
     provided *table space.  It is checked for LENS and DIST tables against  // > CustomCode.jszip:8828
     the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in  // > CustomCode.jszip:8829
     the initial root table size constants.  See the comments in inftrees.h  // > CustomCode.jszip:8830
     for more information.  // > CustomCode.jszip:8831
     sym increments through all symbols, and the loop terminates when  // > CustomCode.jszip:8832
     all codes of length max, i.e. all codes, have been processed.  This  // > CustomCode.jszip:8833
     routine permits incomplete codes, so another loop after this one fills  // > CustomCode.jszip:8834
     in the rest of the decoding tables with invalid code markers.  // > CustomCode.jszip:8835
     */  // > CustomCode.jszip:8836
    /* set up for code type */  // > CustomCode.jszip:8837
    // poor man optimization - use if-else instead of switch,  // > CustomCode.jszip:8838
    // to avoid deopts in old v8  // > CustomCode.jszip:8839
    if (type === CODES) {  // > CustomCode.jszip:8840
      base = extra = work;    /* dummy value--not used */  // > CustomCode.jszip:8841
      end = 19;  // > CustomCode.jszip:8842
    } else if (type === LENS) {  // > CustomCode.jszip:8843
      base = lbase;  // > CustomCode.jszip:8844
      base_index -= 257;  // > CustomCode.jszip:8845
      extra = lext;  // > CustomCode.jszip:8846
      extra_index -= 257;  // > CustomCode.jszip:8847
      end = 256;  // > CustomCode.jszip:8848
    } else {                    /* DISTS */  // > CustomCode.jszip:8849
      base = dbase;  // > CustomCode.jszip:8850
      extra = dext;  // > CustomCode.jszip:8851
      end = -1;  // > CustomCode.jszip:8852
    }  // > CustomCode.jszip:8853
    /* initialize opts for loop */  // > CustomCode.jszip:8854
    huff = 0;                   /* starting code */  // > CustomCode.jszip:8855
    sym = 0;                    /* starting code symbol */  // > CustomCode.jszip:8856
    len = min;                  /* starting code length */  // > CustomCode.jszip:8857
    next = table_index;              /* current table to fill in */  // > CustomCode.jszip:8858
    curr = root;                /* current table index bits */  // > CustomCode.jszip:8859
    drop = 0;                   /* current bits to drop from code for index */  // > CustomCode.jszip:8860
    low = -1;                   /* trigger new sub-table when len > root */  // > CustomCode.jszip:8861
    used = 1 << root;          /* use root table entries */  // > CustomCode.jszip:8862
    mask = used - 1;            /* mask for comparing low */  // > CustomCode.jszip:8863
    /* check available table space */  // > CustomCode.jszip:8864
    if ((type === LENS && used > ENOUGH_LENS) ||  // > CustomCode.jszip:8865
      (type === DISTS && used > ENOUGH_DISTS)) {  // > CustomCode.jszip:8866
      return 1;  // > CustomCode.jszip:8867
    }  // > CustomCode.jszip:8868
    /* process all codes and make table entries */  // > CustomCode.jszip:8869
    for (;;) {  // > CustomCode.jszip:8870
      /* create table entry */  // > CustomCode.jszip:8871
      here_bits = len - drop;  // > CustomCode.jszip:8872
      if (work[sym] < end) {  // > CustomCode.jszip:8873
        here_op = 0;  // > CustomCode.jszip:8874
        here_val = work[sym];  // > CustomCode.jszip:8875
      }  // > CustomCode.jszip:8876
      else if (work[sym] > end) {  // > CustomCode.jszip:8877
        here_op = extra[extra_index + work[sym]];  // > CustomCode.jszip:8878
        here_val = base[base_index + work[sym]];  // > CustomCode.jszip:8879
      }  // > CustomCode.jszip:8880
      else {  // > CustomCode.jszip:8881
        here_op = 32 + 64;         /* end of block */  // > CustomCode.jszip:8882
        here_val = 0;  // > CustomCode.jszip:8883
      }  // > CustomCode.jszip:8884
      /* replicate for those indices with low len bits equal to huff */  // > CustomCode.jszip:8885
      incr = 1 << (len - drop);  // > CustomCode.jszip:8886
      fill = 1 << curr;  // > CustomCode.jszip:8887
      min = fill;                 /* save offset to next table */  // > CustomCode.jszip:8888
      do {  // > CustomCode.jszip:8889
        fill -= incr;  // > CustomCode.jszip:8890
        table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;  // > CustomCode.jszip:8891
      } while (fill !== 0);  // > CustomCode.jszip:8892
      /* backwards increment the len-bit code huff */  // > CustomCode.jszip:8893
      incr = 1 << (len - 1);  // > CustomCode.jszip:8894
      while (huff & incr) {  // > CustomCode.jszip:8895
        incr >>= 1;  // > CustomCode.jszip:8896
      }  // > CustomCode.jszip:8897
      if (incr !== 0) {  // > CustomCode.jszip:8898
        huff &= incr - 1;  // > CustomCode.jszip:8899
        huff += incr;  // > CustomCode.jszip:8900
      } else {  // > CustomCode.jszip:8901
        huff = 0;  // > CustomCode.jszip:8902
      }  // > CustomCode.jszip:8903
      /* go to next symbol, update count, len */  // > CustomCode.jszip:8904
      sym++;  // > CustomCode.jszip:8905
      if (--count[len] === 0) {  // > CustomCode.jszip:8906
        if (len === max) { break; }  // > CustomCode.jszip:8907
        len = lens[lens_index + work[sym]];  // > CustomCode.jszip:8908
      }  // > CustomCode.jszip:8909
      /* create new sub-table if needed */  // > CustomCode.jszip:8910
      if (len > root && (huff & mask) !== low) {  // > CustomCode.jszip:8911
        /* if first time, transition to sub-tables */  // > CustomCode.jszip:8912
        if (drop === 0) {  // > CustomCode.jszip:8913
          drop = root;  // > CustomCode.jszip:8914
        }  // > CustomCode.jszip:8915
        /* increment past last table */  // > CustomCode.jszip:8916
        next += min;            /* here min is 1 << curr */  // > CustomCode.jszip:8917
        /* determine length of next table */  // > CustomCode.jszip:8918
        curr = len - drop;  // > CustomCode.jszip:8919
        left = 1 << curr;  // > CustomCode.jszip:8920
        while (curr + drop < max) {  // > CustomCode.jszip:8921
          left -= count[curr + drop];  // > CustomCode.jszip:8922
          if (left <= 0) { break; }  // > CustomCode.jszip:8923
          curr++;  // > CustomCode.jszip:8924
          left <<= 1;  // > CustomCode.jszip:8925
        }  // > CustomCode.jszip:8926
        /* check for enough space */  // > CustomCode.jszip:8927
        used += 1 << curr;  // > CustomCode.jszip:8928
        if ((type === LENS && used > ENOUGH_LENS) ||  // > CustomCode.jszip:8929
          (type === DISTS && used > ENOUGH_DISTS)) {  // > CustomCode.jszip:8930
          return 1;  // > CustomCode.jszip:8931
        }  // > CustomCode.jszip:8932
        /* point entry in root table to sub-table */  // > CustomCode.jszip:8933
        low = huff & mask;  // > CustomCode.jszip:8934
        /*table.op[low] = curr;  // > CustomCode.jszip:8935
        table.bits[low] = root;  // > CustomCode.jszip:8936
        table.val[low] = next - opts.table_index;*/  // > CustomCode.jszip:8937
        table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;  // > CustomCode.jszip:8938
      }  // > CustomCode.jszip:8939
    }  // > CustomCode.jszip:8940
    /* fill in remaining table entry if code is incomplete (guaranteed to have  // > CustomCode.jszip:8941
     at most one remaining entry, since if the code is incomplete, the  // > CustomCode.jszip:8942
     maximum code length that was allowed to get this far is one bit) */  // > CustomCode.jszip:8943
    if (huff !== 0) {  // > CustomCode.jszip:8944
      //table.op[next + huff] = 64;            /* invalid code marker */  // > CustomCode.jszip:8945
      //table.bits[next + huff] = len - drop;  // > CustomCode.jszip:8946
      //table.val[next + huff] = 0;  // > CustomCode.jszip:8947
      table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;  // > CustomCode.jszip:8948
    }  // > CustomCode.jszip:8949
    /* set return parameters */  // > CustomCode.jszip:8950
    //opts.table_index += used;  // > CustomCode.jszip:8951
    opts.bits = root;  // > CustomCode.jszip:8952
    return 0;  // > CustomCode.jszip:8953
  };  // > CustomCode.jszip:8954
  },{"../utils/common":41}],51:[function(require,module,exports){  // > CustomCode.jszip:8955
  'use strict';  // > CustomCode.jszip:8956
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:8957
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:8958
  //  // > CustomCode.jszip:8959
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:8960
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:8961
  // arising from the use of this software.  // > CustomCode.jszip:8962
  //  // > CustomCode.jszip:8963
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:8964
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:8965
  // freely, subject to the following restrictions:  // > CustomCode.jszip:8966
  //  // > CustomCode.jszip:8967
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:8968
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:8969
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:8970
  //   appreciated but is not required.  // > CustomCode.jszip:8971
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:8972
  //   misrepresented as being the original software.  // > CustomCode.jszip:8973
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:8974
  module.exports = {  // > CustomCode.jszip:8975
    2:      'need dictionary',     /* Z_NEED_DICT       2  */  // > CustomCode.jszip:8976
    1:      'stream end',          /* Z_STREAM_END      1  */  // > CustomCode.jszip:8977
    0:      '',                    /* Z_OK              0  */  // > CustomCode.jszip:8978
    '-1':   'file error',          /* Z_ERRNO         (-1) */  // > CustomCode.jszip:8979
    '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */  // > CustomCode.jszip:8980
    '-3':   'data error',          /* Z_DATA_ERROR    (-3) */  // > CustomCode.jszip:8981
    '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */  // > CustomCode.jszip:8982
    '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */  // > CustomCode.jszip:8983
    '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */  // > CustomCode.jszip:8984
  };  // > CustomCode.jszip:8985
  },{}],52:[function(require,module,exports){  // > CustomCode.jszip:8986
  'use strict';  // > CustomCode.jszip:8987
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:8988
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:8989
  //  // > CustomCode.jszip:8990
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:8991
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:8992
  // arising from the use of this software.  // > CustomCode.jszip:8993
  //  // > CustomCode.jszip:8994
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:8995
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:8996
  // freely, subject to the following restrictions:  // > CustomCode.jszip:8997
  //  // > CustomCode.jszip:8998
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:8999
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:9000
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:9001
  //   appreciated but is not required.  // > CustomCode.jszip:9002
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:9003
  //   misrepresented as being the original software.  // > CustomCode.jszip:9004
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:9005
  var utils = require('../utils/common');  // > CustomCode.jszip:9006
  /* Public constants ==========================================================*/  // > CustomCode.jszip:9007
  /* ===========================================================================*/  // > CustomCode.jszip:9008
  //var Z_FILTERED          = 1;  // > CustomCode.jszip:9009
  //var Z_HUFFMAN_ONLY      = 2;  // > CustomCode.jszip:9010
  //var Z_RLE               = 3;  // > CustomCode.jszip:9011
  var Z_FIXED               = 4;  // > CustomCode.jszip:9012
  //var Z_DEFAULT_STRATEGY  = 0;  // > CustomCode.jszip:9013
  /* Possible values of the data_type field (though see inflate()) */  // > CustomCode.jszip:9014
  var Z_BINARY              = 0;  // > CustomCode.jszip:9015
  var Z_TEXT                = 1;  // > CustomCode.jszip:9016
  //var Z_ASCII             = 1; // = Z_TEXT  // > CustomCode.jszip:9017
  var Z_UNKNOWN             = 2;  // > CustomCode.jszip:9018
  /*============================================================================*/  // > CustomCode.jszip:9019
  function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }  // > CustomCode.jszip:9020
  // From zutil.h  // > CustomCode.jszip:9021
  var STORED_BLOCK = 0;  // > CustomCode.jszip:9022
  var STATIC_TREES = 1;  // > CustomCode.jszip:9023
  var DYN_TREES    = 2;  // > CustomCode.jszip:9024
  /* The three kinds of block type */  // > CustomCode.jszip:9025
  var MIN_MATCH    = 3;  // > CustomCode.jszip:9026
  var MAX_MATCH    = 258;  // > CustomCode.jszip:9027
  /* The minimum and maximum match lengths */  // > CustomCode.jszip:9028
  // From deflate.h  // > CustomCode.jszip:9029
  /* ===========================================================================  // > CustomCode.jszip:9030
   * Internal compression state.  // > CustomCode.jszip:9031
   */  // > CustomCode.jszip:9032
  var LENGTH_CODES  = 29;  // > CustomCode.jszip:9033
  /* number of length codes, not counting the special END_BLOCK code */  // > CustomCode.jszip:9034
  var LITERALS      = 256;  // > CustomCode.jszip:9035
  /* number of literal bytes 0..255 */  // > CustomCode.jszip:9036
  var L_CODES       = LITERALS + 1 + LENGTH_CODES;  // > CustomCode.jszip:9037
  /* number of Literal or Length codes, including the END_BLOCK code */  // > CustomCode.jszip:9038
  var D_CODES       = 30;  // > CustomCode.jszip:9039
  /* number of distance codes */  // > CustomCode.jszip:9040
  var BL_CODES      = 19;  // > CustomCode.jszip:9041
  /* number of codes used to transfer the bit lengths */  // > CustomCode.jszip:9042
  var HEAP_SIZE     = 2 * L_CODES + 1;  // > CustomCode.jszip:9043
  /* maximum heap size */  // > CustomCode.jszip:9044
  var MAX_BITS      = 15;  // > CustomCode.jszip:9045
  /* All codes must not exceed MAX_BITS bits */  // > CustomCode.jszip:9046
  var Buf_size      = 16;  // > CustomCode.jszip:9047
  /* size of bit buffer in bi_buf */  // > CustomCode.jszip:9048
  /* ===========================================================================  // > CustomCode.jszip:9049
   * Constants  // > CustomCode.jszip:9050
   */  // > CustomCode.jszip:9051
  var MAX_BL_BITS = 7;  // > CustomCode.jszip:9052
  /* Bit length codes must not exceed MAX_BL_BITS bits */  // > CustomCode.jszip:9053
  var END_BLOCK   = 256;  // > CustomCode.jszip:9054
  /* end of block literal code */  // > CustomCode.jszip:9055
  var REP_3_6     = 16;  // > CustomCode.jszip:9056
  /* repeat previous bit length 3-6 times (2 bits of repeat count) */  // > CustomCode.jszip:9057
  var REPZ_3_10   = 17;  // > CustomCode.jszip:9058
  /* repeat a zero length 3-10 times  (3 bits of repeat count) */  // > CustomCode.jszip:9059
  var REPZ_11_138 = 18;  // > CustomCode.jszip:9060
  /* repeat a zero length 11-138 times  (7 bits of repeat count) */  // > CustomCode.jszip:9061
  /* eslint-disable comma-spacing,array-bracket-spacing */  // > CustomCode.jszip:9062
  var extra_lbits =   /* extra bits for each length code */  // > CustomCode.jszip:9063
    [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];  // > CustomCode.jszip:9064
  var extra_dbits =   /* extra bits for each distance code */  // > CustomCode.jszip:9065
    [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];  // > CustomCode.jszip:9066
  var extra_blbits =  /* extra bits for each bit length code */  // > CustomCode.jszip:9067
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];  // > CustomCode.jszip:9068
  var bl_order =  // > CustomCode.jszip:9069
    [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];  // > CustomCode.jszip:9070
  /* eslint-enable comma-spacing,array-bracket-spacing */  // > CustomCode.jszip:9071
  /* The lengths of the bit length codes are sent in order of decreasing  // > CustomCode.jszip:9072
   * probability, to avoid transmitting the lengths for unused bit length codes.  // > CustomCode.jszip:9073
   */  // > CustomCode.jszip:9074
  /* ===========================================================================  // > CustomCode.jszip:9075
   * Local data. These are initialized only once.  // > CustomCode.jszip:9076
   */  // > CustomCode.jszip:9077
  // We pre-fill arrays with 0 to avoid uninitialized gaps  // > CustomCode.jszip:9078
  var DIST_CODE_LEN = 512; /* see definition of array dist_code below */  // > CustomCode.jszip:9079
  // !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1  // > CustomCode.jszip:9080
  var static_ltree  = new Array((L_CODES + 2) * 2);  // > CustomCode.jszip:9081
  zero(static_ltree);  // > CustomCode.jszip:9082
  /* The static literal tree. Since the bit lengths are imposed, there is no  // > CustomCode.jszip:9083
   * need for the L_CODES extra codes used during heap construction. However  // > CustomCode.jszip:9084
   * The codes 286 and 287 are needed to build a canonical tree (see _tr_init  // > CustomCode.jszip:9085
   * below).  // > CustomCode.jszip:9086
   */  // > CustomCode.jszip:9087
  var static_dtree  = new Array(D_CODES * 2);  // > CustomCode.jszip:9088
  zero(static_dtree);  // > CustomCode.jszip:9089
  /* The static distance tree. (Actually a trivial tree since all codes use  // > CustomCode.jszip:9090
   * 5 bits.)  // > CustomCode.jszip:9091
   */  // > CustomCode.jszip:9092
  var _dist_code    = new Array(DIST_CODE_LEN);  // > CustomCode.jszip:9093
  zero(_dist_code);  // > CustomCode.jszip:9094
  /* Distance codes. The first 256 values correspond to the distances  // > CustomCode.jszip:9095
   * 3 .. 258, the last 256 values correspond to the top 8 bits of  // > CustomCode.jszip:9096
   * the 15 bit distances.  // > CustomCode.jszip:9097
   */  // > CustomCode.jszip:9098
  var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);  // > CustomCode.jszip:9099
  zero(_length_code);  // > CustomCode.jszip:9100
  /* length code for each normalized match length (0 == MIN_MATCH) */  // > CustomCode.jszip:9101
  var base_length   = new Array(LENGTH_CODES);  // > CustomCode.jszip:9102
  zero(base_length);  // > CustomCode.jszip:9103
  /* First normalized length for each code (0 = MIN_MATCH) */  // > CustomCode.jszip:9104
  var base_dist     = new Array(D_CODES);  // > CustomCode.jszip:9105
  zero(base_dist);  // > CustomCode.jszip:9106
  /* First normalized distance for each code (0 = distance of 1) */  // > CustomCode.jszip:9107
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {  // > CustomCode.jszip:9108
    this.static_tree  = static_tree;  /* static tree or NULL */  // > CustomCode.jszip:9109
    this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */  // > CustomCode.jszip:9110
    this.extra_base   = extra_base;   /* base index for extra_bits */  // > CustomCode.jszip:9111
    this.elems        = elems;        /* max number of elements in the tree */  // > CustomCode.jszip:9112
    this.max_length   = max_length;   /* max bit length for the codes */  // > CustomCode.jszip:9113
    // show if `static_tree` has data or dummy - needed for monomorphic objects  // > CustomCode.jszip:9114
    this.has_stree    = static_tree && static_tree.length;  // > CustomCode.jszip:9115
  }  // > CustomCode.jszip:9116
  var static_l_desc;  // > CustomCode.jszip:9117
  var static_d_desc;  // > CustomCode.jszip:9118
  var static_bl_desc;  // > CustomCode.jszip:9119
  function TreeDesc(dyn_tree, stat_desc) {  // > CustomCode.jszip:9120
    this.dyn_tree = dyn_tree;     /* the dynamic tree */  // > CustomCode.jszip:9121
    this.max_code = 0;            /* largest code with non zero frequency */  // > CustomCode.jszip:9122
    this.stat_desc = stat_desc;   /* the corresponding static tree */  // > CustomCode.jszip:9123
  }  // > CustomCode.jszip:9124
  function d_code(dist) {  // > CustomCode.jszip:9125
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];  // > CustomCode.jszip:9126
  }  // > CustomCode.jszip:9127
  /* ===========================================================================  // > CustomCode.jszip:9128
   * Output a short LSB first on the stream.  // > CustomCode.jszip:9129
   * IN assertion: there is enough room in pendingBuf.  // > CustomCode.jszip:9130
   */  // > CustomCode.jszip:9131
  function put_short(s, w) {  // > CustomCode.jszip:9132
  //    put_byte(s, (uch)((w) & 0xff));  // > CustomCode.jszip:9133
  //    put_byte(s, (uch)((ush)(w) >> 8));  // > CustomCode.jszip:9134
    s.pending_buf[s.pending++] = (w) & 0xff;  // > CustomCode.jszip:9135
    s.pending_buf[s.pending++] = (w >>> 8) & 0xff;  // > CustomCode.jszip:9136
  }  // > CustomCode.jszip:9137
  /* ===========================================================================  // > CustomCode.jszip:9138
   * Send a value on a given number of bits.  // > CustomCode.jszip:9139
   * IN assertion: length <= 16 and value fits in length bits.  // > CustomCode.jszip:9140
   */  // > CustomCode.jszip:9141
  function send_bits(s, value, length) {  // > CustomCode.jszip:9142
    if (s.bi_valid > (Buf_size - length)) {  // > CustomCode.jszip:9143
      s.bi_buf |= (value << s.bi_valid) & 0xffff;  // > CustomCode.jszip:9144
      put_short(s, s.bi_buf);  // > CustomCode.jszip:9145
      s.bi_buf = value >> (Buf_size - s.bi_valid);  // > CustomCode.jszip:9146
      s.bi_valid += length - Buf_size;  // > CustomCode.jszip:9147
    } else {  // > CustomCode.jszip:9148
      s.bi_buf |= (value << s.bi_valid) & 0xffff;  // > CustomCode.jszip:9149
      s.bi_valid += length;  // > CustomCode.jszip:9150
    }  // > CustomCode.jszip:9151
  }  // > CustomCode.jszip:9152
  function send_code(s, c, tree) {  // > CustomCode.jszip:9153
    send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);  // > CustomCode.jszip:9154
  }  // > CustomCode.jszip:9155
  /* ===========================================================================  // > CustomCode.jszip:9156
   * Reverse the first len bits of a code, using straightforward code (a faster  // > CustomCode.jszip:9157
   * method would use a table)  // > CustomCode.jszip:9158
   * IN assertion: 1 <= len <= 15  // > CustomCode.jszip:9159
   */  // > CustomCode.jszip:9160
  function bi_reverse(code, len) {  // > CustomCode.jszip:9161
    var res = 0;  // > CustomCode.jszip:9162
    do {  // > CustomCode.jszip:9163
      res |= code & 1;  // > CustomCode.jszip:9164
      code >>>= 1;  // > CustomCode.jszip:9165
      res <<= 1;  // > CustomCode.jszip:9166
    } while (--len > 0);  // > CustomCode.jszip:9167
    return res >>> 1;  // > CustomCode.jszip:9168
  }  // > CustomCode.jszip:9169
  /* ===========================================================================  // > CustomCode.jszip:9170
   * Flush the bit buffer, keeping at most 7 bits in it.  // > CustomCode.jszip:9171
   */  // > CustomCode.jszip:9172
  function bi_flush(s) {  // > CustomCode.jszip:9173
    if (s.bi_valid === 16) {  // > CustomCode.jszip:9174
      put_short(s, s.bi_buf);  // > CustomCode.jszip:9175
      s.bi_buf = 0;  // > CustomCode.jszip:9176
      s.bi_valid = 0;  // > CustomCode.jszip:9177
    } else if (s.bi_valid >= 8) {  // > CustomCode.jszip:9178
      s.pending_buf[s.pending++] = s.bi_buf & 0xff;  // > CustomCode.jszip:9179
      s.bi_buf >>= 8;  // > CustomCode.jszip:9180
      s.bi_valid -= 8;  // > CustomCode.jszip:9181
    }  // > CustomCode.jszip:9182
  }  // > CustomCode.jszip:9183
  /* ===========================================================================  // > CustomCode.jszip:9184
   * Compute the optimal bit lengths for a tree and update the total bit length  // > CustomCode.jszip:9185
   * for the current block.  // > CustomCode.jszip:9186
   * IN assertion: the fields freq and dad are set, heap[heap_max] and  // > CustomCode.jszip:9187
   *    above are the tree nodes sorted by increasing frequency.  // > CustomCode.jszip:9188
   * OUT assertions: the field len is set to the optimal bit length, the  // > CustomCode.jszip:9189
   *     array bl_count contains the frequencies for each bit length.  // > CustomCode.jszip:9190
   *     The length opt_len is updated; static_len is also updated if stree is  // > CustomCode.jszip:9191
   *     not null.  // > CustomCode.jszip:9192
   */  // > CustomCode.jszip:9193
  function gen_bitlen(s, desc)  // > CustomCode.jszip:9194
  //    deflate_state *s;  // > CustomCode.jszip:9195
  //    tree_desc *desc;    /* the tree descriptor */  // > CustomCode.jszip:9196
  {  // > CustomCode.jszip:9197
    var tree            = desc.dyn_tree;  // > CustomCode.jszip:9198
    var max_code        = desc.max_code;  // > CustomCode.jszip:9199
    var stree           = desc.stat_desc.static_tree;  // > CustomCode.jszip:9200
    var has_stree       = desc.stat_desc.has_stree;  // > CustomCode.jszip:9201
    var extra           = desc.stat_desc.extra_bits;  // > CustomCode.jszip:9202
    var base            = desc.stat_desc.extra_base;  // > CustomCode.jszip:9203
    var max_length      = desc.stat_desc.max_length;  // > CustomCode.jszip:9204
    var h;              /* heap index */  // > CustomCode.jszip:9205
    var n, m;           /* iterate over the tree elements */  // > CustomCode.jszip:9206
    var bits;           /* bit length */  // > CustomCode.jszip:9207
    var xbits;          /* extra bits */  // > CustomCode.jszip:9208
    var f;              /* frequency */  // > CustomCode.jszip:9209
    var overflow = 0;   /* number of elements with bit length too large */  // > CustomCode.jszip:9210
    for (bits = 0; bits <= MAX_BITS; bits++) {  // > CustomCode.jszip:9211
      s.bl_count[bits] = 0;  // > CustomCode.jszip:9212
    }  // > CustomCode.jszip:9213
    /* In a first pass, compute the optimal bit lengths (which may  // > CustomCode.jszip:9214
     * overflow in the case of the bit length tree).  // > CustomCode.jszip:9215
     */  // > CustomCode.jszip:9216
    tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */  // > CustomCode.jszip:9217
    for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {  // > CustomCode.jszip:9218
      n = s.heap[h];  // > CustomCode.jszip:9219
      bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;  // > CustomCode.jszip:9220
      if (bits > max_length) {  // > CustomCode.jszip:9221
        bits = max_length;  // > CustomCode.jszip:9222
        overflow++;  // > CustomCode.jszip:9223
      }  // > CustomCode.jszip:9224
      tree[n * 2 + 1]/*.Len*/ = bits;  // > CustomCode.jszip:9225
      /* We overwrite tree[n].Dad which is no longer needed */  // > CustomCode.jszip:9226
      if (n > max_code) { continue; } /* not a leaf node */  // > CustomCode.jszip:9227
      s.bl_count[bits]++;  // > CustomCode.jszip:9228
      xbits = 0;  // > CustomCode.jszip:9229
      if (n >= base) {  // > CustomCode.jszip:9230
        xbits = extra[n - base];  // > CustomCode.jszip:9231
      }  // > CustomCode.jszip:9232
      f = tree[n * 2]/*.Freq*/;  // > CustomCode.jszip:9233
      s.opt_len += f * (bits + xbits);  // > CustomCode.jszip:9234
      if (has_stree) {  // > CustomCode.jszip:9235
        s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);  // > CustomCode.jszip:9236
      }  // > CustomCode.jszip:9237
    }  // > CustomCode.jszip:9238
    if (overflow === 0) { return; }  // > CustomCode.jszip:9239
    // Trace((stderr,"\nbit length overflow\n"));  // > CustomCode.jszip:9240
    /* This happens for example on obj2 and pic of the Calgary corpus */  // > CustomCode.jszip:9241
    /* Find the first bit length which could increase: */  // > CustomCode.jszip:9242
    do {  // > CustomCode.jszip:9243
      bits = max_length - 1;  // > CustomCode.jszip:9244
      while (s.bl_count[bits] === 0) { bits--; }  // > CustomCode.jszip:9245
      s.bl_count[bits]--;      /* move one leaf down the tree */  // > CustomCode.jszip:9246
      s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */  // > CustomCode.jszip:9247
      s.bl_count[max_length]--;  // > CustomCode.jszip:9248
      /* The brother of the overflow item also moves one step up,  // > CustomCode.jszip:9249
       * but this does not affect bl_count[max_length]  // > CustomCode.jszip:9250
       */  // > CustomCode.jszip:9251
      overflow -= 2;  // > CustomCode.jszip:9252
    } while (overflow > 0);  // > CustomCode.jszip:9253
    /* Now recompute all bit lengths, scanning in increasing frequency.  // > CustomCode.jszip:9254
     * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all  // > CustomCode.jszip:9255
     * lengths instead of fixing only the wrong ones. This idea is taken  // > CustomCode.jszip:9256
     * from 'ar' written by Haruhiko Okumura.)  // > CustomCode.jszip:9257
     */  // > CustomCode.jszip:9258
    for (bits = max_length; bits !== 0; bits--) {  // > CustomCode.jszip:9259
      n = s.bl_count[bits];  // > CustomCode.jszip:9260
      while (n !== 0) {  // > CustomCode.jszip:9261
        m = s.heap[--h];  // > CustomCode.jszip:9262
        if (m > max_code) { continue; }  // > CustomCode.jszip:9263
        if (tree[m * 2 + 1]/*.Len*/ !== bits) {  // > CustomCode.jszip:9264
          // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));  // > CustomCode.jszip:9265
          s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;  // > CustomCode.jszip:9266
          tree[m * 2 + 1]/*.Len*/ = bits;  // > CustomCode.jszip:9267
        }  // > CustomCode.jszip:9268
        n--;  // > CustomCode.jszip:9269
      }  // > CustomCode.jszip:9270
    }  // > CustomCode.jszip:9271
  }  // > CustomCode.jszip:9272
  /* ===========================================================================  // > CustomCode.jszip:9273
   * Generate the codes for a given tree and bit counts (which need not be  // > CustomCode.jszip:9274
   * optimal).  // > CustomCode.jszip:9275
   * IN assertion: the array bl_count contains the bit length statistics for  // > CustomCode.jszip:9276
   * the given tree and the field len is set for all tree elements.  // > CustomCode.jszip:9277
   * OUT assertion: the field code is set for all tree elements of non  // > CustomCode.jszip:9278
   *     zero code length.  // > CustomCode.jszip:9279
   */  // > CustomCode.jszip:9280
  function gen_codes(tree, max_code, bl_count)  // > CustomCode.jszip:9281
  //    ct_data *tree;             /* the tree to decorate */  // > CustomCode.jszip:9282
  //    int max_code;              /* largest code with non zero frequency */  // > CustomCode.jszip:9283
  //    ushf *bl_count;            /* number of codes at each bit length */  // > CustomCode.jszip:9284
  {  // > CustomCode.jszip:9285
    var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */  // > CustomCode.jszip:9286
    var code = 0;              /* running code value */  // > CustomCode.jszip:9287
    var bits;                  /* bit index */  // > CustomCode.jszip:9288
    var n;                     /* code index */  // > CustomCode.jszip:9289
    /* The distribution counts are first used to generate the code values  // > CustomCode.jszip:9290
     * without bit reversal.  // > CustomCode.jszip:9291
     */  // > CustomCode.jszip:9292
    for (bits = 1; bits <= MAX_BITS; bits++) {  // > CustomCode.jszip:9293
      next_code[bits] = code = (code + bl_count[bits - 1]) << 1;  // > CustomCode.jszip:9294
    }  // > CustomCode.jszip:9295
    /* Check that the bit counts in bl_count are consistent. The last code  // > CustomCode.jszip:9296
     * must be all ones.  // > CustomCode.jszip:9297
     */  // > CustomCode.jszip:9298
    //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,  // > CustomCode.jszip:9299
    //        "inconsistent bit counts");  // > CustomCode.jszip:9300
    //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));  // > CustomCode.jszip:9301
    for (n = 0;  n <= max_code; n++) {  // > CustomCode.jszip:9302
      var len = tree[n * 2 + 1]/*.Len*/;  // > CustomCode.jszip:9303
      if (len === 0) { continue; }  // > CustomCode.jszip:9304
      /* Now reverse the bits */  // > CustomCode.jszip:9305
      tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);  // > CustomCode.jszip:9306
      //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",  // > CustomCode.jszip:9307
      //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));  // > CustomCode.jszip:9308
    }  // > CustomCode.jszip:9309
  }  // > CustomCode.jszip:9310
  /* ===========================================================================  // > CustomCode.jszip:9311
   * Initialize the various 'constant' tables.  // > CustomCode.jszip:9312
   */  // > CustomCode.jszip:9313
  function tr_static_init() {  // > CustomCode.jszip:9314
    var n;        /* iterates over tree elements */  // > CustomCode.jszip:9315
    var bits;     /* bit counter */  // > CustomCode.jszip:9316
    var length;   /* length value */  // > CustomCode.jszip:9317
    var code;     /* code value */  // > CustomCode.jszip:9318
    var dist;     /* distance index */  // > CustomCode.jszip:9319
    var bl_count = new Array(MAX_BITS + 1);  // > CustomCode.jszip:9320
    /* number of codes at each bit length for an optimal tree */  // > CustomCode.jszip:9321
    // do check in _tr_init()  // > CustomCode.jszip:9322
    //if (static_init_done) return;  // > CustomCode.jszip:9323
    /* For some embedded targets, global variables are not initialized: */  // > CustomCode.jszip:9324
  /*#ifdef NO_INIT_GLOBAL_POINTERS  // > CustomCode.jszip:9325
    static_l_desc.static_tree = static_ltree;  // > CustomCode.jszip:9326
    static_l_desc.extra_bits = extra_lbits;  // > CustomCode.jszip:9327
    static_d_desc.static_tree = static_dtree;  // > CustomCode.jszip:9328
    static_d_desc.extra_bits = extra_dbits;  // > CustomCode.jszip:9329
    static_bl_desc.extra_bits = extra_blbits;  // > CustomCode.jszip:9330
  #endif*/  // > CustomCode.jszip:9331
    /* Initialize the mapping length (0..255) -> length code (0..28) */  // > CustomCode.jszip:9332
    length = 0;  // > CustomCode.jszip:9333
    for (code = 0; code < LENGTH_CODES - 1; code++) {  // > CustomCode.jszip:9334
      base_length[code] = length;  // > CustomCode.jszip:9335
      for (n = 0; n < (1 << extra_lbits[code]); n++) {  // > CustomCode.jszip:9336
        _length_code[length++] = code;  // > CustomCode.jszip:9337
      }  // > CustomCode.jszip:9338
    }  // > CustomCode.jszip:9339
    //Assert (length == 256, "tr_static_init: length != 256");  // > CustomCode.jszip:9340
    /* Note that the length 255 (match length 258) can be represented  // > CustomCode.jszip:9341
     * in two different ways: code 284 + 5 bits or code 285, so we  // > CustomCode.jszip:9342
     * overwrite length_code[255] to use the best encoding:  // > CustomCode.jszip:9343
     */  // > CustomCode.jszip:9344
    _length_code[length - 1] = code;  // > CustomCode.jszip:9345
    /* Initialize the mapping dist (0..32K) -> dist code (0..29) */  // > CustomCode.jszip:9346
    dist = 0;  // > CustomCode.jszip:9347
    for (code = 0; code < 16; code++) {  // > CustomCode.jszip:9348
      base_dist[code] = dist;  // > CustomCode.jszip:9349
      for (n = 0; n < (1 << extra_dbits[code]); n++) {  // > CustomCode.jszip:9350
        _dist_code[dist++] = code;  // > CustomCode.jszip:9351
      }  // > CustomCode.jszip:9352
    }  // > CustomCode.jszip:9353
    //Assert (dist == 256, "tr_static_init: dist != 256");  // > CustomCode.jszip:9354
    dist >>= 7; /* from now on, all distances are divided by 128 */  // > CustomCode.jszip:9355
    for (; code < D_CODES; code++) {  // > CustomCode.jszip:9356
      base_dist[code] = dist << 7;  // > CustomCode.jszip:9357
      for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {  // > CustomCode.jszip:9358
        _dist_code[256 + dist++] = code;  // > CustomCode.jszip:9359
      }  // > CustomCode.jszip:9360
    }  // > CustomCode.jszip:9361
    //Assert (dist == 256, "tr_static_init: 256+dist != 512");  // > CustomCode.jszip:9362
    /* Construct the codes of the static literal tree */  // > CustomCode.jszip:9363
    for (bits = 0; bits <= MAX_BITS; bits++) {  // > CustomCode.jszip:9364
      bl_count[bits] = 0;  // > CustomCode.jszip:9365
    }  // > CustomCode.jszip:9366
    n = 0;  // > CustomCode.jszip:9367
    while (n <= 143) {  // > CustomCode.jszip:9368
      static_ltree[n * 2 + 1]/*.Len*/ = 8;  // > CustomCode.jszip:9369
      n++;  // > CustomCode.jszip:9370
      bl_count[8]++;  // > CustomCode.jszip:9371
    }  // > CustomCode.jszip:9372
    while (n <= 255) {  // > CustomCode.jszip:9373
      static_ltree[n * 2 + 1]/*.Len*/ = 9;  // > CustomCode.jszip:9374
      n++;  // > CustomCode.jszip:9375
      bl_count[9]++;  // > CustomCode.jszip:9376
    }  // > CustomCode.jszip:9377
    while (n <= 279) {  // > CustomCode.jszip:9378
      static_ltree[n * 2 + 1]/*.Len*/ = 7;  // > CustomCode.jszip:9379
      n++;  // > CustomCode.jszip:9380
      bl_count[7]++;  // > CustomCode.jszip:9381
    }  // > CustomCode.jszip:9382
    while (n <= 287) {  // > CustomCode.jszip:9383
      static_ltree[n * 2 + 1]/*.Len*/ = 8;  // > CustomCode.jszip:9384
      n++;  // > CustomCode.jszip:9385
      bl_count[8]++;  // > CustomCode.jszip:9386
    }  // > CustomCode.jszip:9387
    /* Codes 286 and 287 do not exist, but we must include them in the  // > CustomCode.jszip:9388
     * tree construction to get a canonical Huffman tree (longest code  // > CustomCode.jszip:9389
     * all ones)  // > CustomCode.jszip:9390
     */  // > CustomCode.jszip:9391
    gen_codes(static_ltree, L_CODES + 1, bl_count);  // > CustomCode.jszip:9392
    /* The static distance tree is trivial: */  // > CustomCode.jszip:9393
    for (n = 0; n < D_CODES; n++) {  // > CustomCode.jszip:9394
      static_dtree[n * 2 + 1]/*.Len*/ = 5;  // > CustomCode.jszip:9395
      static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);  // > CustomCode.jszip:9396
    }  // > CustomCode.jszip:9397
    // Now data ready and we can init static trees  // > CustomCode.jszip:9398
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);  // > CustomCode.jszip:9399
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);  // > CustomCode.jszip:9400
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);  // > CustomCode.jszip:9401
    //static_init_done = true;  // > CustomCode.jszip:9402
  }  // > CustomCode.jszip:9403
  /* ===========================================================================  // > CustomCode.jszip:9404
   * Initialize a new block.  // > CustomCode.jszip:9405
   */  // > CustomCode.jszip:9406
  function init_block(s) {  // > CustomCode.jszip:9407
    var n; /* iterates over tree elements */  // > CustomCode.jszip:9408
    /* Initialize the trees. */  // > CustomCode.jszip:9409
    for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }  // > CustomCode.jszip:9410
    for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }  // > CustomCode.jszip:9411
    for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }  // > CustomCode.jszip:9412
    s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;  // > CustomCode.jszip:9413
    s.opt_len = s.static_len = 0;  // > CustomCode.jszip:9414
    s.last_lit = s.matches = 0;  // > CustomCode.jszip:9415
  }  // > CustomCode.jszip:9416
  /* ===========================================================================  // > CustomCode.jszip:9417
   * Flush the bit buffer and align the output on a byte boundary  // > CustomCode.jszip:9418
   */  // > CustomCode.jszip:9419
  function bi_windup(s)  // > CustomCode.jszip:9420
  {  // > CustomCode.jszip:9421
    if (s.bi_valid > 8) {  // > CustomCode.jszip:9422
      put_short(s, s.bi_buf);  // > CustomCode.jszip:9423
    } else if (s.bi_valid > 0) {  // > CustomCode.jszip:9424
      //put_byte(s, (Byte)s->bi_buf);  // > CustomCode.jszip:9425
      s.pending_buf[s.pending++] = s.bi_buf;  // > CustomCode.jszip:9426
    }  // > CustomCode.jszip:9427
    s.bi_buf = 0;  // > CustomCode.jszip:9428
    s.bi_valid = 0;  // > CustomCode.jszip:9429
  }  // > CustomCode.jszip:9430
  /* ===========================================================================  // > CustomCode.jszip:9431
   * Copy a stored block, storing first the length and its  // > CustomCode.jszip:9432
   * one's complement if requested.  // > CustomCode.jszip:9433
   */  // > CustomCode.jszip:9434
  function copy_block(s, buf, len, header)  // > CustomCode.jszip:9435
  //DeflateState *s;  // > CustomCode.jszip:9436
  //charf    *buf;    /* the input data */  // > CustomCode.jszip:9437
  //unsigned len;     /* its length */  // > CustomCode.jszip:9438
  //int      header;  /* true if block header must be written */  // > CustomCode.jszip:9439
  {  // > CustomCode.jszip:9440
    bi_windup(s);        /* align on byte boundary */  // > CustomCode.jszip:9441
    if (header) {  // > CustomCode.jszip:9442
      put_short(s, len);  // > CustomCode.jszip:9443
      put_short(s, ~len);  // > CustomCode.jszip:9444
    }  // > CustomCode.jszip:9445
  //  while (len--) {  // > CustomCode.jszip:9446
  //    put_byte(s, *buf++);  // > CustomCode.jszip:9447
  //  }  // > CustomCode.jszip:9448
    utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);  // > CustomCode.jszip:9449
    s.pending += len;  // > CustomCode.jszip:9450
  }  // > CustomCode.jszip:9451
  /* ===========================================================================  // > CustomCode.jszip:9452
   * Compares to subtrees, using the tree depth as tie breaker when  // > CustomCode.jszip:9453
   * the subtrees have equal frequency. This minimizes the worst case length.  // > CustomCode.jszip:9454
   */  // > CustomCode.jszip:9455
  function smaller(tree, n, m, depth) {  // > CustomCode.jszip:9456
    var _n2 = n * 2;  // > CustomCode.jszip:9457
    var _m2 = m * 2;  // > CustomCode.jszip:9458
    return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||  // > CustomCode.jszip:9459
           (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));  // > CustomCode.jszip:9460
  }  // > CustomCode.jszip:9461
  /* ===========================================================================  // > CustomCode.jszip:9462
   * Restore the heap property by moving down the tree starting at node k,  // > CustomCode.jszip:9463
   * exchanging a node with the smallest of its two sons if necessary, stopping  // > CustomCode.jszip:9464
   * when the heap property is re-established (each father smaller than its  // > CustomCode.jszip:9465
   * two sons).  // > CustomCode.jszip:9466
   */  // > CustomCode.jszip:9467
  function pqdownheap(s, tree, k)  // > CustomCode.jszip:9468
  //    deflate_state *s;  // > CustomCode.jszip:9469
  //    ct_data *tree;  /* the tree to restore */  // > CustomCode.jszip:9470
  //    int k;               /* node to move down */  // > CustomCode.jszip:9471
  {  // > CustomCode.jszip:9472
    var v = s.heap[k];  // > CustomCode.jszip:9473
    var j = k << 1;  /* left son of k */  // > CustomCode.jszip:9474
    while (j <= s.heap_len) {  // > CustomCode.jszip:9475
      /* Set j to the smallest of the two sons: */  // > CustomCode.jszip:9476
      if (j < s.heap_len &&  // > CustomCode.jszip:9477
        smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {  // > CustomCode.jszip:9478
        j++;  // > CustomCode.jszip:9479
      }  // > CustomCode.jszip:9480
      /* Exit if v is smaller than both sons */  // > CustomCode.jszip:9481
      if (smaller(tree, v, s.heap[j], s.depth)) { break; }  // > CustomCode.jszip:9482
      /* Exchange v with the smallest son */  // > CustomCode.jszip:9483
      s.heap[k] = s.heap[j];  // > CustomCode.jszip:9484
      k = j;  // > CustomCode.jszip:9485
      /* And continue down the tree, setting j to the left son of k */  // > CustomCode.jszip:9486
      j <<= 1;  // > CustomCode.jszip:9487
    }  // > CustomCode.jszip:9488
    s.heap[k] = v;  // > CustomCode.jszip:9489
  }  // > CustomCode.jszip:9490
  // inlined manually  // > CustomCode.jszip:9491
  // var SMALLEST = 1;  // > CustomCode.jszip:9492
  /* ===========================================================================  // > CustomCode.jszip:9493
   * Send the block data compressed using the given Huffman trees  // > CustomCode.jszip:9494
   */  // > CustomCode.jszip:9495
  function compress_block(s, ltree, dtree)  // > CustomCode.jszip:9496
  //    deflate_state *s;  // > CustomCode.jszip:9497
  //    const ct_data *ltree; /* literal tree */  // > CustomCode.jszip:9498
  //    const ct_data *dtree; /* distance tree */  // > CustomCode.jszip:9499
  {  // > CustomCode.jszip:9500
    var dist;           /* distance of matched string */  // > CustomCode.jszip:9501
    var lc;             /* match length or unmatched char (if dist == 0) */  // > CustomCode.jszip:9502
    var lx = 0;         /* running index in l_buf */  // > CustomCode.jszip:9503
    var code;           /* the code to send */  // > CustomCode.jszip:9504
    var extra;          /* number of extra bits to send */  // > CustomCode.jszip:9505
    if (s.last_lit !== 0) {  // > CustomCode.jszip:9506
      do {  // > CustomCode.jszip:9507
        dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);  // > CustomCode.jszip:9508
        lc = s.pending_buf[s.l_buf + lx];  // > CustomCode.jszip:9509
        lx++;  // > CustomCode.jszip:9510
        if (dist === 0) {  // > CustomCode.jszip:9511
          send_code(s, lc, ltree); /* send a literal byte */  // > CustomCode.jszip:9512
          //Tracecv(isgraph(lc), (stderr," '%c' ", lc));  // > CustomCode.jszip:9513
        } else {  // > CustomCode.jszip:9514
          /* Here, lc is the match length - MIN_MATCH */  // > CustomCode.jszip:9515
          code = _length_code[lc];  // > CustomCode.jszip:9516
          send_code(s, code + LITERALS + 1, ltree); /* send the length code */  // > CustomCode.jszip:9517
          extra = extra_lbits[code];  // > CustomCode.jszip:9518
          if (extra !== 0) {  // > CustomCode.jszip:9519
            lc -= base_length[code];  // > CustomCode.jszip:9520
            send_bits(s, lc, extra);       /* send the extra length bits */  // > CustomCode.jszip:9521
          }  // > CustomCode.jszip:9522
          dist--; /* dist is now the match distance - 1 */  // > CustomCode.jszip:9523
          code = d_code(dist);  // > CustomCode.jszip:9524
          //Assert (code < D_CODES, "bad d_code");  // > CustomCode.jszip:9525
          send_code(s, code, dtree);       /* send the distance code */  // > CustomCode.jszip:9526
          extra = extra_dbits[code];  // > CustomCode.jszip:9527
          if (extra !== 0) {  // > CustomCode.jszip:9528
            dist -= base_dist[code];  // > CustomCode.jszip:9529
            send_bits(s, dist, extra);   /* send the extra distance bits */  // > CustomCode.jszip:9530
          }  // > CustomCode.jszip:9531
        } /* literal or match pair ? */  // > CustomCode.jszip:9532
        /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */  // > CustomCode.jszip:9533
        //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,  // > CustomCode.jszip:9534
        //       "pendingBuf overflow");  // > CustomCode.jszip:9535
      } while (lx < s.last_lit);  // > CustomCode.jszip:9536
    }  // > CustomCode.jszip:9537
    send_code(s, END_BLOCK, ltree);  // > CustomCode.jszip:9538
  }  // > CustomCode.jszip:9539
  /* ===========================================================================  // > CustomCode.jszip:9540
   * Construct one Huffman tree and assigns the code bit strings and lengths.  // > CustomCode.jszip:9541
   * Update the total bit length for the current block.  // > CustomCode.jszip:9542
   * IN assertion: the field freq is set for all tree elements.  // > CustomCode.jszip:9543
   * OUT assertions: the fields len and code are set to the optimal bit length  // > CustomCode.jszip:9544
   *     and corresponding code. The length opt_len is updated; static_len is  // > CustomCode.jszip:9545
   *     also updated if stree is not null. The field max_code is set.  // > CustomCode.jszip:9546
   */  // > CustomCode.jszip:9547
  function build_tree(s, desc)  // > CustomCode.jszip:9548
  //    deflate_state *s;  // > CustomCode.jszip:9549
  //    tree_desc *desc; /* the tree descriptor */  // > CustomCode.jszip:9550
  {  // > CustomCode.jszip:9551
    var tree     = desc.dyn_tree;  // > CustomCode.jszip:9552
    var stree    = desc.stat_desc.static_tree;  // > CustomCode.jszip:9553
    var has_stree = desc.stat_desc.has_stree;  // > CustomCode.jszip:9554
    var elems    = desc.stat_desc.elems;  // > CustomCode.jszip:9555
    var n, m;          /* iterate over heap elements */  // > CustomCode.jszip:9556
    var max_code = -1; /* largest code with non zero frequency */  // > CustomCode.jszip:9557
    var node;          /* new node being created */  // > CustomCode.jszip:9558
    /* Construct the initial heap, with least frequent element in  // > CustomCode.jszip:9559
     * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].  // > CustomCode.jszip:9560
     * heap[0] is not used.  // > CustomCode.jszip:9561
     */  // > CustomCode.jszip:9562
    s.heap_len = 0;  // > CustomCode.jszip:9563
    s.heap_max = HEAP_SIZE;  // > CustomCode.jszip:9564
    for (n = 0; n < elems; n++) {  // > CustomCode.jszip:9565
      if (tree[n * 2]/*.Freq*/ !== 0) {  // > CustomCode.jszip:9566
        s.heap[++s.heap_len] = max_code = n;  // > CustomCode.jszip:9567
        s.depth[n] = 0;  // > CustomCode.jszip:9568
      } else {  // > CustomCode.jszip:9569
        tree[n * 2 + 1]/*.Len*/ = 0;  // > CustomCode.jszip:9570
      }  // > CustomCode.jszip:9571
    }  // > CustomCode.jszip:9572
    /* The pkzip format requires that at least one distance code exists,  // > CustomCode.jszip:9573
     * and that at least one bit should be sent even if there is only one  // > CustomCode.jszip:9574
     * possible code. So to avoid special checks later on we force at least  // > CustomCode.jszip:9575
     * two codes of non zero frequency.  // > CustomCode.jszip:9576
     */  // > CustomCode.jszip:9577
    while (s.heap_len < 2) {  // > CustomCode.jszip:9578
      node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);  // > CustomCode.jszip:9579
      tree[node * 2]/*.Freq*/ = 1;  // > CustomCode.jszip:9580
      s.depth[node] = 0;  // > CustomCode.jszip:9581
      s.opt_len--;  // > CustomCode.jszip:9582
      if (has_stree) {  // > CustomCode.jszip:9583
        s.static_len -= stree[node * 2 + 1]/*.Len*/;  // > CustomCode.jszip:9584
      }  // > CustomCode.jszip:9585
      /* node is 0 or 1 so it does not have extra bits */  // > CustomCode.jszip:9586
    }  // > CustomCode.jszip:9587
    desc.max_code = max_code;  // > CustomCode.jszip:9588
    /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,  // > CustomCode.jszip:9589
     * establish sub-heaps of increasing lengths:  // > CustomCode.jszip:9590
     */  // > CustomCode.jszip:9591
    for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }  // > CustomCode.jszip:9592
    /* Construct the Huffman tree by repeatedly combining the least two  // > CustomCode.jszip:9593
     * frequent nodes.  // > CustomCode.jszip:9594
     */  // > CustomCode.jszip:9595
    node = elems;              /* next internal node of the tree */  // > CustomCode.jszip:9596
    do {  // > CustomCode.jszip:9597
      //pqremove(s, tree, n);  /* n = node of least frequency */  // > CustomCode.jszip:9598
      /*** pqremove ***/  // > CustomCode.jszip:9599
      n = s.heap[1/*SMALLEST*/];  // > CustomCode.jszip:9600
      s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];  // > CustomCode.jszip:9601
      pqdownheap(s, tree, 1/*SMALLEST*/);  // > CustomCode.jszip:9602
      /***/  // > CustomCode.jszip:9603
      m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */  // > CustomCode.jszip:9604
      s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */  // > CustomCode.jszip:9605
      s.heap[--s.heap_max] = m;  // > CustomCode.jszip:9606
      /* Create a new node father of n and m */  // > CustomCode.jszip:9607
      tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;  // > CustomCode.jszip:9608
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;  // > CustomCode.jszip:9609
      tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;  // > CustomCode.jszip:9610
      /* and insert the new node in the heap */  // > CustomCode.jszip:9611
      s.heap[1/*SMALLEST*/] = node++;  // > CustomCode.jszip:9612
      pqdownheap(s, tree, 1/*SMALLEST*/);  // > CustomCode.jszip:9613
    } while (s.heap_len >= 2);  // > CustomCode.jszip:9614
    s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];  // > CustomCode.jszip:9615
    /* At this point, the fields freq and dad are set. We can now  // > CustomCode.jszip:9616
     * generate the bit lengths.  // > CustomCode.jszip:9617
     */  // > CustomCode.jszip:9618
    gen_bitlen(s, desc);  // > CustomCode.jszip:9619
    /* The field len is now set, we can generate the bit codes */  // > CustomCode.jszip:9620
    gen_codes(tree, max_code, s.bl_count);  // > CustomCode.jszip:9621
  }  // > CustomCode.jszip:9622
  /* ===========================================================================  // > CustomCode.jszip:9623
   * Scan a literal or distance tree to determine the frequencies of the codes  // > CustomCode.jszip:9624
   * in the bit length tree.  // > CustomCode.jszip:9625
   */  // > CustomCode.jszip:9626
  function scan_tree(s, tree, max_code)  // > CustomCode.jszip:9627
  //    deflate_state *s;  // > CustomCode.jszip:9628
  //    ct_data *tree;   /* the tree to be scanned */  // > CustomCode.jszip:9629
  //    int max_code;    /* and its largest code of non zero frequency */  // > CustomCode.jszip:9630
  {  // > CustomCode.jszip:9631
    var n;                     /* iterates over all tree elements */  // > CustomCode.jszip:9632
    var prevlen = -1;          /* last emitted length */  // > CustomCode.jszip:9633
    var curlen;                /* length of current code */  // > CustomCode.jszip:9634
    var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */  // > CustomCode.jszip:9635
    var count = 0;             /* repeat count of the current code */  // > CustomCode.jszip:9636
    var max_count = 7;         /* max repeat count */  // > CustomCode.jszip:9637
    var min_count = 4;         /* min repeat count */  // > CustomCode.jszip:9638
    if (nextlen === 0) {  // > CustomCode.jszip:9639
      max_count = 138;  // > CustomCode.jszip:9640
      min_count = 3;  // > CustomCode.jszip:9641
    }  // > CustomCode.jszip:9642
    tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */  // > CustomCode.jszip:9643
    for (n = 0; n <= max_code; n++) {  // > CustomCode.jszip:9644
      curlen = nextlen;  // > CustomCode.jszip:9645
      nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;  // > CustomCode.jszip:9646
      if (++count < max_count && curlen === nextlen) {  // > CustomCode.jszip:9647
        continue;  // > CustomCode.jszip:9648
      } else if (count < min_count) {  // > CustomCode.jszip:9649
        s.bl_tree[curlen * 2]/*.Freq*/ += count;  // > CustomCode.jszip:9650
      } else if (curlen !== 0) {  // > CustomCode.jszip:9651
        if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }  // > CustomCode.jszip:9652
        s.bl_tree[REP_3_6 * 2]/*.Freq*/++;  // > CustomCode.jszip:9653
      } else if (count <= 10) {  // > CustomCode.jszip:9654
        s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;  // > CustomCode.jszip:9655
      } else {  // > CustomCode.jszip:9656
        s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;  // > CustomCode.jszip:9657
      }  // > CustomCode.jszip:9658
      count = 0;  // > CustomCode.jszip:9659
      prevlen = curlen;  // > CustomCode.jszip:9660
      if (nextlen === 0) {  // > CustomCode.jszip:9661
        max_count = 138;  // > CustomCode.jszip:9662
        min_count = 3;  // > CustomCode.jszip:9663
      } else if (curlen === nextlen) {  // > CustomCode.jszip:9664
        max_count = 6;  // > CustomCode.jszip:9665
        min_count = 3;  // > CustomCode.jszip:9666
      } else {  // > CustomCode.jszip:9667
        max_count = 7;  // > CustomCode.jszip:9668
        min_count = 4;  // > CustomCode.jszip:9669
      }  // > CustomCode.jszip:9670
    }  // > CustomCode.jszip:9671
  }  // > CustomCode.jszip:9672
  /* ===========================================================================  // > CustomCode.jszip:9673
   * Send a literal or distance tree in compressed form, using the codes in  // > CustomCode.jszip:9674
   * bl_tree.  // > CustomCode.jszip:9675
   */  // > CustomCode.jszip:9676
  function send_tree(s, tree, max_code)  // > CustomCode.jszip:9677
  //    deflate_state *s;  // > CustomCode.jszip:9678
  //    ct_data *tree; /* the tree to be scanned */  // > CustomCode.jszip:9679
  //    int max_code;       /* and its largest code of non zero frequency */  // > CustomCode.jszip:9680
  {  // > CustomCode.jszip:9681
    var n;                     /* iterates over all tree elements */  // > CustomCode.jszip:9682
    var prevlen = -1;          /* last emitted length */  // > CustomCode.jszip:9683
    var curlen;                /* length of current code */  // > CustomCode.jszip:9684
    var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */  // > CustomCode.jszip:9685
    var count = 0;             /* repeat count of the current code */  // > CustomCode.jszip:9686
    var max_count = 7;         /* max repeat count */  // > CustomCode.jszip:9687
    var min_count = 4;         /* min repeat count */  // > CustomCode.jszip:9688
    /* tree[max_code+1].Len = -1; */  /* guard already set */  // > CustomCode.jszip:9689
    if (nextlen === 0) {  // > CustomCode.jszip:9690
      max_count = 138;  // > CustomCode.jszip:9691
      min_count = 3;  // > CustomCode.jszip:9692
    }  // > CustomCode.jszip:9693
    for (n = 0; n <= max_code; n++) {  // > CustomCode.jszip:9694
      curlen = nextlen;  // > CustomCode.jszip:9695
      nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;  // > CustomCode.jszip:9696
      if (++count < max_count && curlen === nextlen) {  // > CustomCode.jszip:9697
        continue;  // > CustomCode.jszip:9698
      } else if (count < min_count) {  // > CustomCode.jszip:9699
        do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);  // > CustomCode.jszip:9700
      } else if (curlen !== 0) {  // > CustomCode.jszip:9701
        if (curlen !== prevlen) {  // > CustomCode.jszip:9702
          send_code(s, curlen, s.bl_tree);  // > CustomCode.jszip:9703
          count--;  // > CustomCode.jszip:9704
        }  // > CustomCode.jszip:9705
        //Assert(count >= 3 && count <= 6, " 3_6?");  // > CustomCode.jszip:9706
        send_code(s, REP_3_6, s.bl_tree);  // > CustomCode.jszip:9707
        send_bits(s, count - 3, 2);  // > CustomCode.jszip:9708
      } else if (count <= 10) {  // > CustomCode.jszip:9709
        send_code(s, REPZ_3_10, s.bl_tree);  // > CustomCode.jszip:9710
        send_bits(s, count - 3, 3);  // > CustomCode.jszip:9711
      } else {  // > CustomCode.jszip:9712
        send_code(s, REPZ_11_138, s.bl_tree);  // > CustomCode.jszip:9713
        send_bits(s, count - 11, 7);  // > CustomCode.jszip:9714
      }  // > CustomCode.jszip:9715
      count = 0;  // > CustomCode.jszip:9716
      prevlen = curlen;  // > CustomCode.jszip:9717
      if (nextlen === 0) {  // > CustomCode.jszip:9718
        max_count = 138;  // > CustomCode.jszip:9719
        min_count = 3;  // > CustomCode.jszip:9720
      } else if (curlen === nextlen) {  // > CustomCode.jszip:9721
        max_count = 6;  // > CustomCode.jszip:9722
        min_count = 3;  // > CustomCode.jszip:9723
      } else {  // > CustomCode.jszip:9724
        max_count = 7;  // > CustomCode.jszip:9725
        min_count = 4;  // > CustomCode.jszip:9726
      }  // > CustomCode.jszip:9727
    }  // > CustomCode.jszip:9728
  }  // > CustomCode.jszip:9729
  /* ===========================================================================  // > CustomCode.jszip:9730
   * Construct the Huffman tree for the bit lengths and return the index in  // > CustomCode.jszip:9731
   * bl_order of the last bit length code to send.  // > CustomCode.jszip:9732
   */  // > CustomCode.jszip:9733
  function build_bl_tree(s) {  // > CustomCode.jszip:9734
    var max_blindex;  /* index of last bit length code of non zero freq */  // > CustomCode.jszip:9735
    /* Determine the bit length frequencies for literal and distance trees */  // > CustomCode.jszip:9736
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);  // > CustomCode.jszip:9737
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);  // > CustomCode.jszip:9738
    /* Build the bit length tree: */  // > CustomCode.jszip:9739
    build_tree(s, s.bl_desc);  // > CustomCode.jszip:9740
    /* opt_len now includes the length of the tree representations, except  // > CustomCode.jszip:9741
     * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.  // > CustomCode.jszip:9742
     */  // > CustomCode.jszip:9743
    /* Determine the number of bit length codes to send. The pkzip format  // > CustomCode.jszip:9744
     * requires that at least 4 bit length codes be sent. (appnote.txt says  // > CustomCode.jszip:9745
     * 3 but the actual value used is 4.)  // > CustomCode.jszip:9746
     */  // > CustomCode.jszip:9747
    for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {  // > CustomCode.jszip:9748
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {  // > CustomCode.jszip:9749
        break;  // > CustomCode.jszip:9750
      }  // > CustomCode.jszip:9751
    }  // > CustomCode.jszip:9752
    /* Update opt_len to include the bit length tree and counts */  // > CustomCode.jszip:9753
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;  // > CustomCode.jszip:9754
    //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",  // > CustomCode.jszip:9755
    //        s->opt_len, s->static_len));  // > CustomCode.jszip:9756
    return max_blindex;  // > CustomCode.jszip:9757
  }  // > CustomCode.jszip:9758
  /* ===========================================================================  // > CustomCode.jszip:9759
   * Send the header for a block using dynamic Huffman trees: the counts, the  // > CustomCode.jszip:9760
   * lengths of the bit length codes, the literal tree and the distance tree.  // > CustomCode.jszip:9761
   * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.  // > CustomCode.jszip:9762
   */  // > CustomCode.jszip:9763
  function send_all_trees(s, lcodes, dcodes, blcodes)  // > CustomCode.jszip:9764
  //    deflate_state *s;  // > CustomCode.jszip:9765
  //    int lcodes, dcodes, blcodes; /* number of codes for each tree */  // > CustomCode.jszip:9766
  {  // > CustomCode.jszip:9767
    var rank;                    /* index in bl_order */  // > CustomCode.jszip:9768
    //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");  // > CustomCode.jszip:9769
    //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,  // > CustomCode.jszip:9770
    //        "too many codes");  // > CustomCode.jszip:9771
    //Tracev((stderr, "\nbl counts: "));  // > CustomCode.jszip:9772
    send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */  // > CustomCode.jszip:9773
    send_bits(s, dcodes - 1,   5);  // > CustomCode.jszip:9774
    send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */  // > CustomCode.jszip:9775
    for (rank = 0; rank < blcodes; rank++) {  // > CustomCode.jszip:9776
      //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));  // > CustomCode.jszip:9777
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);  // > CustomCode.jszip:9778
    }  // > CustomCode.jszip:9779
    //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));  // > CustomCode.jszip:9780
    send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */  // > CustomCode.jszip:9781
    //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));  // > CustomCode.jszip:9782
    send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */  // > CustomCode.jszip:9783
    //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));  // > CustomCode.jszip:9784
  }  // > CustomCode.jszip:9785
  /* ===========================================================================  // > CustomCode.jszip:9786
   * Check if the data type is TEXT or BINARY, using the following algorithm:  // > CustomCode.jszip:9787
   * - TEXT if the two conditions below are satisfied:  // > CustomCode.jszip:9788
   *    a) There are no non-portable control characters belonging to the  // > CustomCode.jszip:9789
   *       "black list" (0..6, 14..25, 28..31).  // > CustomCode.jszip:9790
   *    b) There is at least one printable character belonging to the  // > CustomCode.jszip:9791
   *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).  // > CustomCode.jszip:9792
   * - BINARY otherwise.  // > CustomCode.jszip:9793
   * - The following partially-portable control characters form a  // > CustomCode.jszip:9794
   *   "gray list" that is ignored in this detection algorithm:  // > CustomCode.jszip:9795
   *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).  // > CustomCode.jszip:9796
   * IN assertion: the fields Freq of dyn_ltree are set.  // > CustomCode.jszip:9797
   */  // > CustomCode.jszip:9798
  function detect_data_type(s) {  // > CustomCode.jszip:9799
    /* black_mask is the bit mask of black-listed bytes  // > CustomCode.jszip:9800
     * set bits 0..6, 14..25, and 28..31  // > CustomCode.jszip:9801
     * 0xf3ffc07f = binary 11110011111111111100000001111111  // > CustomCode.jszip:9802
     */  // > CustomCode.jszip:9803
    var black_mask = 0xf3ffc07f;  // > CustomCode.jszip:9804
    var n;  // > CustomCode.jszip:9805
    /* Check for non-textual ("black-listed") bytes. */  // > CustomCode.jszip:9806
    for (n = 0; n <= 31; n++, black_mask >>>= 1) {  // > CustomCode.jszip:9807
      if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {  // > CustomCode.jszip:9808
        return Z_BINARY;  // > CustomCode.jszip:9809
      }  // > CustomCode.jszip:9810
    }  // > CustomCode.jszip:9811
    /* Check for textual ("white-listed") bytes. */  // > CustomCode.jszip:9812
    if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||  // > CustomCode.jszip:9813
        s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {  // > CustomCode.jszip:9814
      return Z_TEXT;  // > CustomCode.jszip:9815
    }  // > CustomCode.jszip:9816
    for (n = 32; n < LITERALS; n++) {  // > CustomCode.jszip:9817
      if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {  // > CustomCode.jszip:9818
        return Z_TEXT;  // > CustomCode.jszip:9819
      }  // > CustomCode.jszip:9820
    }  // > CustomCode.jszip:9821
    /* There are no "black-listed" or "white-listed" bytes:  // > CustomCode.jszip:9822
     * this stream either is empty or has tolerated ("gray-listed") bytes only.  // > CustomCode.jszip:9823
     */  // > CustomCode.jszip:9824
    return Z_BINARY;  // > CustomCode.jszip:9825
  }  // > CustomCode.jszip:9826
  var static_init_done = false;  // > CustomCode.jszip:9827
  /* ===========================================================================  // > CustomCode.jszip:9828
   * Initialize the tree data structures for a new zlib stream.  // > CustomCode.jszip:9829
   */  // > CustomCode.jszip:9830
  function _tr_init(s)  // > CustomCode.jszip:9831
  {  // > CustomCode.jszip:9832
    if (!static_init_done) {  // > CustomCode.jszip:9833
      tr_static_init();  // > CustomCode.jszip:9834
      static_init_done = true;  // > CustomCode.jszip:9835
    }  // > CustomCode.jszip:9836
    s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);  // > CustomCode.jszip:9837
    s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);  // > CustomCode.jszip:9838
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);  // > CustomCode.jszip:9839
    s.bi_buf = 0;  // > CustomCode.jszip:9840
    s.bi_valid = 0;  // > CustomCode.jszip:9841
    /* Initialize the first block of the first file: */  // > CustomCode.jszip:9842
    init_block(s);  // > CustomCode.jszip:9843
  }  // > CustomCode.jszip:9844
  /* ===========================================================================  // > CustomCode.jszip:9845
   * Send a stored block  // > CustomCode.jszip:9846
   */  // > CustomCode.jszip:9847
  function _tr_stored_block(s, buf, stored_len, last)  // > CustomCode.jszip:9848
  //DeflateState *s;  // > CustomCode.jszip:9849
  //charf *buf;       /* input block */  // > CustomCode.jszip:9850
  //ulg stored_len;   /* length of input block */  // > CustomCode.jszip:9851
  //int last;         /* one if this is the last block for a file */  // > CustomCode.jszip:9852
  {  // > CustomCode.jszip:9853
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */  // > CustomCode.jszip:9854
    copy_block(s, buf, stored_len, true); /* with header */  // > CustomCode.jszip:9855
  }  // > CustomCode.jszip:9856
  /* ===========================================================================  // > CustomCode.jszip:9857
   * Send one empty static block to give enough lookahead for inflate.  // > CustomCode.jszip:9858
   * This takes 10 bits, of which 7 may remain in the bit buffer.  // > CustomCode.jszip:9859
   */  // > CustomCode.jszip:9860
  function _tr_align(s) {  // > CustomCode.jszip:9861
    send_bits(s, STATIC_TREES << 1, 3);  // > CustomCode.jszip:9862
    send_code(s, END_BLOCK, static_ltree);  // > CustomCode.jszip:9863
    bi_flush(s);  // > CustomCode.jszip:9864
  }  // > CustomCode.jszip:9865
  /* ===========================================================================  // > CustomCode.jszip:9866
   * Determine the best encoding for the current block: dynamic trees, static  // > CustomCode.jszip:9867
   * trees or store, and output the encoded block to the zip file.  // > CustomCode.jszip:9868
   */  // > CustomCode.jszip:9869
  function _tr_flush_block(s, buf, stored_len, last)  // > CustomCode.jszip:9870
  //DeflateState *s;  // > CustomCode.jszip:9871
  //charf *buf;       /* input block, or NULL if too old */  // > CustomCode.jszip:9872
  //ulg stored_len;   /* length of input block */  // > CustomCode.jszip:9873
  //int last;         /* one if this is the last block for a file */  // > CustomCode.jszip:9874
  {  // > CustomCode.jszip:9875
    var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */  // > CustomCode.jszip:9876
    var max_blindex = 0;        /* index of last bit length code of non zero freq */  // > CustomCode.jszip:9877
    /* Build the Huffman trees unless a stored block is forced */  // > CustomCode.jszip:9878
    if (s.level > 0) {  // > CustomCode.jszip:9879
      /* Check if the file is binary or text */  // > CustomCode.jszip:9880
      if (s.strm.data_type === Z_UNKNOWN) {  // > CustomCode.jszip:9881
        s.strm.data_type = detect_data_type(s);  // > CustomCode.jszip:9882
      }  // > CustomCode.jszip:9883
      /* Construct the literal and distance trees */  // > CustomCode.jszip:9884
      build_tree(s, s.l_desc);  // > CustomCode.jszip:9885
      // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,  // > CustomCode.jszip:9886
      //        s->static_len));  // > CustomCode.jszip:9887
      build_tree(s, s.d_desc);  // > CustomCode.jszip:9888
      // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,  // > CustomCode.jszip:9889
      //        s->static_len));  // > CustomCode.jszip:9890
      /* At this point, opt_len and static_len are the total bit lengths of  // > CustomCode.jszip:9891
       * the compressed block data, excluding the tree representations.  // > CustomCode.jszip:9892
       */  // > CustomCode.jszip:9893
      /* Build the bit length tree for the above two trees, and get the index  // > CustomCode.jszip:9894
       * in bl_order of the last bit length code to send.  // > CustomCode.jszip:9895
       */  // > CustomCode.jszip:9896
      max_blindex = build_bl_tree(s);  // > CustomCode.jszip:9897
      /* Determine the best encoding. Compute the block lengths in bytes. */  // > CustomCode.jszip:9898
      opt_lenb = (s.opt_len + 3 + 7) >>> 3;  // > CustomCode.jszip:9899
      static_lenb = (s.static_len + 3 + 7) >>> 3;  // > CustomCode.jszip:9900
      // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",  // > CustomCode.jszip:9901
      //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,  // > CustomCode.jszip:9902
      //        s->last_lit));  // > CustomCode.jszip:9903
      if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }  // > CustomCode.jszip:9904
    } else {  // > CustomCode.jszip:9905
      // Assert(buf != (char*)0, "lost buf");  // > CustomCode.jszip:9906
      opt_lenb = static_lenb = stored_len + 5; /* force a stored block */  // > CustomCode.jszip:9907
    }  // > CustomCode.jszip:9908
    if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {  // > CustomCode.jszip:9909
      /* 4: two words for the lengths */  // > CustomCode.jszip:9910
      /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.  // > CustomCode.jszip:9911
       * Otherwise we can't have processed more than WSIZE input bytes since  // > CustomCode.jszip:9912
       * the last block flush, because compression would have been  // > CustomCode.jszip:9913
       * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to  // > CustomCode.jszip:9914
       * transform a block into a stored block.  // > CustomCode.jszip:9915
       */  // > CustomCode.jszip:9916
      _tr_stored_block(s, buf, stored_len, last);  // > CustomCode.jszip:9917
    } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {  // > CustomCode.jszip:9918
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);  // > CustomCode.jszip:9919
      compress_block(s, static_ltree, static_dtree);  // > CustomCode.jszip:9920
    } else {  // > CustomCode.jszip:9921
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);  // > CustomCode.jszip:9922
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);  // > CustomCode.jszip:9923
      compress_block(s, s.dyn_ltree, s.dyn_dtree);  // > CustomCode.jszip:9924
    }  // > CustomCode.jszip:9925
    // Assert (s->compressed_len == s->bits_sent, "bad compressed size");  // > CustomCode.jszip:9926
    /* The above check is made mod 2^32, for files larger than 512 MB  // > CustomCode.jszip:9927
     * and uLong implemented on 32 bits.  // > CustomCode.jszip:9928
     */  // > CustomCode.jszip:9929
    init_block(s);  // > CustomCode.jszip:9930
    if (last) {  // > CustomCode.jszip:9931
      bi_windup(s);  // > CustomCode.jszip:9932
    }  // > CustomCode.jszip:9933
    // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,  // > CustomCode.jszip:9934
    //       s->compressed_len-7*last));  // > CustomCode.jszip:9935
  }  // > CustomCode.jszip:9936
  /* ===========================================================================  // > CustomCode.jszip:9937
   * Save the match info and tally the frequency counts. Return true if  // > CustomCode.jszip:9938
   * the current block must be flushed.  // > CustomCode.jszip:9939
   */  // > CustomCode.jszip:9940
  function _tr_tally(s, dist, lc)  // > CustomCode.jszip:9941
  //    deflate_state *s;  // > CustomCode.jszip:9942
  //    unsigned dist;  /* distance of matched string */  // > CustomCode.jszip:9943
  //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */  // > CustomCode.jszip:9944
  {  // > CustomCode.jszip:9945
    //var out_length, in_length, dcode;  // > CustomCode.jszip:9946
    s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;  // > CustomCode.jszip:9947
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;  // > CustomCode.jszip:9948
    s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;  // > CustomCode.jszip:9949
    s.last_lit++;  // > CustomCode.jszip:9950
    if (dist === 0) {  // > CustomCode.jszip:9951
      /* lc is the unmatched char */  // > CustomCode.jszip:9952
      s.dyn_ltree[lc * 2]/*.Freq*/++;  // > CustomCode.jszip:9953
    } else {  // > CustomCode.jszip:9954
      s.matches++;  // > CustomCode.jszip:9955
      /* Here, lc is the match length - MIN_MATCH */  // > CustomCode.jszip:9956
      dist--;             /* dist = match distance - 1 */  // > CustomCode.jszip:9957
      //Assert((ush)dist < (ush)MAX_DIST(s) &&  // > CustomCode.jszip:9958
      //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&  // > CustomCode.jszip:9959
      //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");  // > CustomCode.jszip:9960
      s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;  // > CustomCode.jszip:9961
      s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;  // > CustomCode.jszip:9962
    }  // > CustomCode.jszip:9963
  // (!) This block is disabled in zlib defailts,  // > CustomCode.jszip:9964
  // don't enable it for binary compatibility  // > CustomCode.jszip:9965
  //#ifdef TRUNCATE_BLOCK  // > CustomCode.jszip:9966
  //  /* Try to guess if it is profitable to stop the current block here */  // > CustomCode.jszip:9967
  //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {  // > CustomCode.jszip:9968
  //    /* Compute an upper bound for the compressed length */  // > CustomCode.jszip:9969
  //    out_length = s.last_lit*8;  // > CustomCode.jszip:9970
  //    in_length = s.strstart - s.block_start;  // > CustomCode.jszip:9971
  //  // > CustomCode.jszip:9972
  //    for (dcode = 0; dcode < D_CODES; dcode++) {  // > CustomCode.jszip:9973
  //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);  // > CustomCode.jszip:9974
  //    }  // > CustomCode.jszip:9975
  //    out_length >>>= 3;  // > CustomCode.jszip:9976
  //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",  // > CustomCode.jszip:9977
  //    //       s->last_lit, in_length, out_length,  // > CustomCode.jszip:9978
  //    //       100L - out_length*100L/in_length));  // > CustomCode.jszip:9979
  //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {  // > CustomCode.jszip:9980
  //      return true;  // > CustomCode.jszip:9981
  //    }  // > CustomCode.jszip:9982
  //  }  // > CustomCode.jszip:9983
  //#endif  // > CustomCode.jszip:9984
    return (s.last_lit === s.lit_bufsize - 1);  // > CustomCode.jszip:9985
    /* We avoid equality with lit_bufsize because of wraparound at 64K  // > CustomCode.jszip:9986
     * on 16 bit machines and because stored blocks are restricted to  // > CustomCode.jszip:9987
     * 64K-1 bytes.  // > CustomCode.jszip:9988
     */  // > CustomCode.jszip:9989
  }  // > CustomCode.jszip:9990
  exports._tr_init  = _tr_init;  // > CustomCode.jszip:9991
  exports._tr_stored_block = _tr_stored_block;  // > CustomCode.jszip:9992
  exports._tr_flush_block  = _tr_flush_block;  // > CustomCode.jszip:9993
  exports._tr_tally = _tr_tally;  // > CustomCode.jszip:9994
  exports._tr_align = _tr_align;  // > CustomCode.jszip:9995
  },{"../utils/common":41}],53:[function(require,module,exports){  // > CustomCode.jszip:9996
  'use strict';  // > CustomCode.jszip:9997
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler  // > CustomCode.jszip:9998
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin  // > CustomCode.jszip:9999
  //  // > CustomCode.jszip:10000
  // This software is provided 'as-is', without any express or implied  // > CustomCode.jszip:10001
  // warranty. In no event will the authors be held liable for any damages  // > CustomCode.jszip:10002
  // arising from the use of this software.  // > CustomCode.jszip:10003
  //  // > CustomCode.jszip:10004
  // Permission is granted to anyone to use this software for any purpose,  // > CustomCode.jszip:10005
  // including commercial applications, and to alter it and redistribute it  // > CustomCode.jszip:10006
  // freely, subject to the following restrictions:  // > CustomCode.jszip:10007
  //  // > CustomCode.jszip:10008
  // 1. The origin of this software must not be misrepresented; you must not  // > CustomCode.jszip:10009
  //   claim that you wrote the original software. If you use this software  // > CustomCode.jszip:10010
  //   in a product, an acknowledgment in the product documentation would be  // > CustomCode.jszip:10011
  //   appreciated but is not required.  // > CustomCode.jszip:10012
  // 2. Altered source versions must be plainly marked as such, and must not be  // > CustomCode.jszip:10013
  //   misrepresented as being the original software.  // > CustomCode.jszip:10014
  // 3. This notice may not be removed or altered from any source distribution.  // > CustomCode.jszip:10015
  function ZStream() {  // > CustomCode.jszip:10016
    /* next input byte */  // > CustomCode.jszip:10017
    this.input = null; // JS specific, because we have no pointers  // > CustomCode.jszip:10018
    this.next_in = 0;  // > CustomCode.jszip:10019
    /* number of bytes available at input */  // > CustomCode.jszip:10020
    this.avail_in = 0;  // > CustomCode.jszip:10021
    /* total number of input bytes read so far */  // > CustomCode.jszip:10022
    this.total_in = 0;  // > CustomCode.jszip:10023
    /* next output byte should be put there */  // > CustomCode.jszip:10024
    this.output = null; // JS specific, because we have no pointers  // > CustomCode.jszip:10025
    this.next_out = 0;  // > CustomCode.jszip:10026
    /* remaining free space at output */  // > CustomCode.jszip:10027
    this.avail_out = 0;  // > CustomCode.jszip:10028
    /* total number of bytes output so far */  // > CustomCode.jszip:10029
    this.total_out = 0;  // > CustomCode.jszip:10030
    /* last error message, NULL if no error */  // > CustomCode.jszip:10031
    this.msg = ''/*Z_NULL*/;  // > CustomCode.jszip:10032
    /* not visible by applications */  // > CustomCode.jszip:10033
    this.state = null;  // > CustomCode.jszip:10034
    /* best guess about the data type: binary or text */  // > CustomCode.jszip:10035
    this.data_type = 2/*Z_UNKNOWN*/;  // > CustomCode.jszip:10036
    /* adler32 value of the uncompressed data */  // > CustomCode.jszip:10037
    this.adler = 0;  // > CustomCode.jszip:10038
  }  // > CustomCode.jszip:10039
  module.exports = ZStream;  // > CustomCode.jszip:10040
  },{}],54:[function(require,module,exports){  // > CustomCode.jszip:10041
  (function (global){  // > CustomCode.jszip:10042
  (function (global, undefined) {  // > CustomCode.jszip:10043
      "use strict";  // > CustomCode.jszip:10044
      if (global.setImmediate) {  // > CustomCode.jszip:10045
          return;  // > CustomCode.jszip:10046
      }  // > CustomCode.jszip:10047
      var nextHandle = 1; // Spec says greater than zero  // > CustomCode.jszip:10048
      var tasksByHandle = {};  // > CustomCode.jszip:10049
      var currentlyRunningATask = false;  // > CustomCode.jszip:10050
      var doc = global.document;  // > CustomCode.jszip:10051
      var registerImmediate;  // > CustomCode.jszip:10052
      function setImmediate(callback) {  // > CustomCode.jszip:10053
        // Callback can either be a function or a string  // > CustomCode.jszip:10054
        if (typeof callback !== "function") {  // > CustomCode.jszip:10055
          callback = new Function("" + callback);  // > CustomCode.jszip:10056
        }  // > CustomCode.jszip:10057
        // Copy function arguments  // > CustomCode.jszip:10058
        var args = new Array(arguments.length - 1);  // > CustomCode.jszip:10059
        for (var i = 0; i < args.length; i++) {  // > CustomCode.jszip:10060
            args[i] = arguments[i + 1];  // > CustomCode.jszip:10061
        }  // > CustomCode.jszip:10062
        // Store and register the task  // > CustomCode.jszip:10063
        var task = { callback: callback, args: args };  // > CustomCode.jszip:10064
        tasksByHandle[nextHandle] = task;  // > CustomCode.jszip:10065
        registerImmediate(nextHandle);  // > CustomCode.jszip:10066
        return nextHandle++;  // > CustomCode.jszip:10067
      }  // > CustomCode.jszip:10068
      function clearImmediate(handle) {  // > CustomCode.jszip:10069
          delete tasksByHandle[handle];  // > CustomCode.jszip:10070
      }  // > CustomCode.jszip:10071
      function run(task) {  // > CustomCode.jszip:10072
          var callback = task.callback;  // > CustomCode.jszip:10073
          var args = task.args;  // > CustomCode.jszip:10074
          switch (args.length) {  // > CustomCode.jszip:10075
          case 0:  // > CustomCode.jszip:10076
              callback();  // > CustomCode.jszip:10077
              break;  // > CustomCode.jszip:10078
          case 1:  // > CustomCode.jszip:10079
              callback(args[0]);  // > CustomCode.jszip:10080
              break;  // > CustomCode.jszip:10081
          case 2:  // > CustomCode.jszip:10082
              callback(args[0], args[1]);  // > CustomCode.jszip:10083
              break;  // > CustomCode.jszip:10084
          case 3:  // > CustomCode.jszip:10085
              callback(args[0], args[1], args[2]);  // > CustomCode.jszip:10086
              break;  // > CustomCode.jszip:10087
          default:  // > CustomCode.jszip:10088
              callback.apply(undefined, args);  // > CustomCode.jszip:10089
              break;  // > CustomCode.jszip:10090
          }  // > CustomCode.jszip:10091
      }  // > CustomCode.jszip:10092
      function runIfPresent(handle) {  // > CustomCode.jszip:10093
          // From the spec: "Wait until any invocations of this algorithm started before this one have completed."  // > CustomCode.jszip:10094
          // So if we're currently running a task, we'll need to delay this invocation.  // > CustomCode.jszip:10095
          if (currentlyRunningATask) {  // > CustomCode.jszip:10096
              // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a  // > CustomCode.jszip:10097
              // "too much recursion" error.  // > CustomCode.jszip:10098
              setTimeout(runIfPresent, 0, handle);  // > CustomCode.jszip:10099
          } else {  // > CustomCode.jszip:10100
              var task = tasksByHandle[handle];  // > CustomCode.jszip:10101
              if (task) {  // > CustomCode.jszip:10102
                  currentlyRunningATask = true;  // > CustomCode.jszip:10103
                  try {  // > CustomCode.jszip:10104
                      run(task);  // > CustomCode.jszip:10105
                  } finally {  // > CustomCode.jszip:10106
                      clearImmediate(handle);  // > CustomCode.jszip:10107
                      currentlyRunningATask = false;  // > CustomCode.jszip:10108
                  }  // > CustomCode.jszip:10109
              }  // > CustomCode.jszip:10110
          }  // > CustomCode.jszip:10111
      }  // > CustomCode.jszip:10112
      function installNextTickImplementation() {  // > CustomCode.jszip:10113
          registerImmediate = function(handle) {  // > CustomCode.jszip:10114
              process.nextTick(function () { runIfPresent(handle); });  // > CustomCode.jszip:10115
          };  // > CustomCode.jszip:10116
      }  // > CustomCode.jszip:10117
      function canUsePostMessage() {  // > CustomCode.jszip:10118
          // The test against `importScripts` prevents this implementation from being installed inside a web worker,  // > CustomCode.jszip:10119
          // where `global.postMessage` means something completely different and can't be used for this purpose.  // > CustomCode.jszip:10120
          if (global.postMessage && !global.importScripts) {  // > CustomCode.jszip:10121
              var postMessageIsAsynchronous = true;  // > CustomCode.jszip:10122
              var oldOnMessage = global.onmessage;  // > CustomCode.jszip:10123
              global.onmessage = function() {  // > CustomCode.jszip:10124
                  postMessageIsAsynchronous = false;  // > CustomCode.jszip:10125
              };  // > CustomCode.jszip:10126
              global.postMessage("", "*");  // > CustomCode.jszip:10127
              global.onmessage = oldOnMessage;  // > CustomCode.jszip:10128
              return postMessageIsAsynchronous;  // > CustomCode.jszip:10129
          }  // > CustomCode.jszip:10130
      }  // > CustomCode.jszip:10131
      function installPostMessageImplementation() {  // > CustomCode.jszip:10132
          // Installs an event handler on `global` for the `message` event: see  // > CustomCode.jszip:10133
          // * https://developer.mozilla.org/en/DOM/window.postMessage  // > CustomCode.jszip:10134
          // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages  // > CustomCode.jszip:10135
          var messagePrefix = "setImmediate$" + Math.random() + "$";  // > CustomCode.jszip:10136
          var onGlobalMessage = function(event) {  // > CustomCode.jszip:10137
              if (event.source === global &&  // > CustomCode.jszip:10138
                  typeof event.data === "string" &&  // > CustomCode.jszip:10139
                  event.data.indexOf(messagePrefix) === 0) {  // > CustomCode.jszip:10140
                  runIfPresent(+event.data.slice(messagePrefix.length));  // > CustomCode.jszip:10141
              }  // > CustomCode.jszip:10142
          };  // > CustomCode.jszip:10143
          if (global.addEventListener) {  // > CustomCode.jszip:10144
              global.addEventListener("message", onGlobalMessage, false);  // > CustomCode.jszip:10145
          } else {  // > CustomCode.jszip:10146
              global.attachEvent("onmessage", onGlobalMessage);  // > CustomCode.jszip:10147
          }  // > CustomCode.jszip:10148
          registerImmediate = function(handle) {  // > CustomCode.jszip:10149
              global.postMessage(messagePrefix + handle, "*");  // > CustomCode.jszip:10150
          };  // > CustomCode.jszip:10151
      }  // > CustomCode.jszip:10152
      function installMessageChannelImplementation() {  // > CustomCode.jszip:10153
          var channel = new MessageChannel();  // > CustomCode.jszip:10154
          channel.port1.onmessage = function(event) {  // > CustomCode.jszip:10155
              var handle = event.data;  // > CustomCode.jszip:10156
              runIfPresent(handle);  // > CustomCode.jszip:10157
          };  // > CustomCode.jszip:10158
          registerImmediate = function(handle) {  // > CustomCode.jszip:10159
              channel.port2.postMessage(handle);  // > CustomCode.jszip:10160
          };  // > CustomCode.jszip:10161
      }  // > CustomCode.jszip:10162
      function installReadyStateChangeImplementation() {  // > CustomCode.jszip:10163
          var html = doc.documentElement;  // > CustomCode.jszip:10164
          registerImmediate = function(handle) {  // > CustomCode.jszip:10165
              // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted  // > CustomCode.jszip:10166
              // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.  // > CustomCode.jszip:10167
              var script = doc.createElement("script");  // > CustomCode.jszip:10168
              script.onreadystatechange = function () {  // > CustomCode.jszip:10169
                  runIfPresent(handle);  // > CustomCode.jszip:10170
                  script.onreadystatechange = null;  // > CustomCode.jszip:10171
                  html.removeChild(script);  // > CustomCode.jszip:10172
                  script = null;  // > CustomCode.jszip:10173
              };  // > CustomCode.jszip:10174
              html.appendChild(script);  // > CustomCode.jszip:10175
          };  // > CustomCode.jszip:10176
      }  // > CustomCode.jszip:10177
      function installSetTimeoutImplementation() {  // > CustomCode.jszip:10178
          registerImmediate = function(handle) {  // > CustomCode.jszip:10179
              setTimeout(runIfPresent, 0, handle);  // > CustomCode.jszip:10180
          };  // > CustomCode.jszip:10181
      }  // > CustomCode.jszip:10182
      // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.  // > CustomCode.jszip:10183
      var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);  // > CustomCode.jszip:10184
      attachTo = attachTo && attachTo.setTimeout ? attachTo : global;  // > CustomCode.jszip:10185
      // Don't get fooled by e.g. browserify environments.  // > CustomCode.jszip:10186
      if ({}.toString.call(global.process) === "[object process]") {  // > CustomCode.jszip:10187
          // For Node.js before 0.9  // > CustomCode.jszip:10188
          installNextTickImplementation();  // > CustomCode.jszip:10189
      } else if (canUsePostMessage()) {  // > CustomCode.jszip:10190
          // For non-IE10 modern browsers  // > CustomCode.jszip:10191
          installPostMessageImplementation();  // > CustomCode.jszip:10192
      } else if (global.MessageChannel) {  // > CustomCode.jszip:10193
          // For web workers, where supported  // > CustomCode.jszip:10194
          installMessageChannelImplementation();  // > CustomCode.jszip:10195
      } else if (doc && "onreadystatechange" in doc.createElement("script")) {  // > CustomCode.jszip:10196
          // For IE 6–8  // > CustomCode.jszip:10197
          installReadyStateChangeImplementation();  // > CustomCode.jszip:10198
      } else {  // > CustomCode.jszip:10199
          // For older browsers  // > CustomCode.jszip:10200
          installSetTimeoutImplementation();  // > CustomCode.jszip:10201
      }  // > CustomCode.jszip:10202
      attachTo.setImmediate = setImmediate;  // > CustomCode.jszip:10203
      attachTo.clearImmediate = clearImmediate;  // > CustomCode.jszip:10204
  }(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));  // > CustomCode.jszip:10205
  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})  // > CustomCode.jszip:10206
  },{}]},{},[10])(10)  // > CustomCode.jszip:10207
  });  // > CustomCode.jszip:10208

  // FileSaver  // > CustomCode.FileSaver:1
  (function (global, factory) {  // > CustomCode.FileSaver:2
    if (typeof define === "function" && define.amd) {  // > CustomCode.FileSaver:3
      define([], factory);  // > CustomCode.FileSaver:4
    } else if (typeof exports !== "undefined") {  // > CustomCode.FileSaver:5
      factory();  // > CustomCode.FileSaver:6
    } else {  // > CustomCode.FileSaver:7
      var mod = {  // > CustomCode.FileSaver:8
        exports: {}  // > CustomCode.FileSaver:9
      };  // > CustomCode.FileSaver:10
      factory();  // > CustomCode.FileSaver:11
      global.FileSaver = mod.exports;  // > CustomCode.FileSaver:12
    }  // > CustomCode.FileSaver:13
  })(this, function () {  // > CustomCode.FileSaver:14
    "use strict";  // > CustomCode.FileSaver:15
    /*  // > CustomCode.FileSaver:16
    * FileSaver.js  // > CustomCode.FileSaver:17
    * A saveAs() FileSaver implementation.  // > CustomCode.FileSaver:18
    *  // > CustomCode.FileSaver:19
    * By Eli Grey, http://eligrey.com  // > CustomCode.FileSaver:20
    *  // > CustomCode.FileSaver:21
    * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)  // > CustomCode.FileSaver:22
    * source  : http://purl.eligrey.com/github/FileSaver.js  // > CustomCode.FileSaver:23
    */  // > CustomCode.FileSaver:24
    // The one and only way of getting global scope in all environments  // > CustomCode.FileSaver:25
    // https://stackoverflow.com/q/3277182/1008999  // > CustomCode.FileSaver:26
    var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;  // > CustomCode.FileSaver:27
    function bom(blob, opts) {  // > CustomCode.FileSaver:28
      if (typeof opts === 'undefined') opts = {  // > CustomCode.FileSaver:29
        autoBom: false  // > CustomCode.FileSaver:30
      };else if (typeof opts !== 'object') {  // > CustomCode.FileSaver:31
        console.warn('Deprecated: Expected third argument to be a object');  // > CustomCode.FileSaver:32
        opts = {  // > CustomCode.FileSaver:33
          autoBom: !opts  // > CustomCode.FileSaver:34
        };  // > CustomCode.FileSaver:35
      } // prepend BOM for UTF-8 XML and text/* types (including HTML)  // > CustomCode.FileSaver:36
      // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF  // > CustomCode.FileSaver:37
      if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {  // > CustomCode.FileSaver:38
        return new Blob([String.fromCharCode(0xFEFF), blob], {  // > CustomCode.FileSaver:39
          type: blob.type  // > CustomCode.FileSaver:40
        });  // > CustomCode.FileSaver:41
      }  // > CustomCode.FileSaver:42
      return blob;  // > CustomCode.FileSaver:43
    }  // > CustomCode.FileSaver:44
    function download(url, name, opts) {  // > CustomCode.FileSaver:45
      var xhr = new XMLHttpRequest();  // > CustomCode.FileSaver:46
      xhr.open('GET', url);  // > CustomCode.FileSaver:47
      xhr.responseType = 'blob';  // > CustomCode.FileSaver:48
      xhr.onload = function () {  // > CustomCode.FileSaver:49
        saveAs(xhr.response, name, opts);  // > CustomCode.FileSaver:50
      };  // > CustomCode.FileSaver:51
      xhr.onerror = function () {  // > CustomCode.FileSaver:52
        console.error('could not download file');  // > CustomCode.FileSaver:53
      };  // > CustomCode.FileSaver:54
      xhr.send();  // > CustomCode.FileSaver:55
    }  // > CustomCode.FileSaver:56
    function corsEnabled(url) {  // > CustomCode.FileSaver:57
      var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker  // > CustomCode.FileSaver:58
      xhr.open('HEAD', url, false);  // > CustomCode.FileSaver:59
      try {  // > CustomCode.FileSaver:60
        xhr.send();  // > CustomCode.FileSaver:61
      } catch (e) {}  // > CustomCode.FileSaver:62
      return xhr.status >= 200 && xhr.status <= 299;  // > CustomCode.FileSaver:63
    } // `a.click()` doesn't work for all browsers (#465)  // > CustomCode.FileSaver:64
    function click(node) {  // > CustomCode.FileSaver:65
      try {  // > CustomCode.FileSaver:66
        node.dispatchEvent(new MouseEvent('click'));  // > CustomCode.FileSaver:67
      } catch (e) {  // > CustomCode.FileSaver:68
        var evt = document.createEvent('MouseEvents');  // > CustomCode.FileSaver:69
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);  // > CustomCode.FileSaver:70
        node.dispatchEvent(evt);  // > CustomCode.FileSaver:71
      }  // > CustomCode.FileSaver:72
    } // Detect WebView inside a native macOS app by ruling out all browsers  // > CustomCode.FileSaver:73
    // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too  // > CustomCode.FileSaver:74
    // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos  // > CustomCode.FileSaver:75
    var isMacOSWebView = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);  // > CustomCode.FileSaver:76
    var saveAs = _global.saveAs || ( // probably in some web worker  // > CustomCode.FileSaver:77
    typeof window !== 'object' || window !== _global ? function saveAs() {}  // > CustomCode.FileSaver:78
    /* noop */  // > CustomCode.FileSaver:79
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView  // > CustomCode.FileSaver:80
    : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {  // > CustomCode.FileSaver:81
      var URL = _global.URL || _global.webkitURL;  // > CustomCode.FileSaver:82
      var a = document.createElement('a');  // > CustomCode.FileSaver:83
      name = name || blob.name || 'download';  // > CustomCode.FileSaver:84
      a.download = name;  // > CustomCode.FileSaver:85
      a.rel = 'noopener'; // tabnabbing  // > CustomCode.FileSaver:86
      // TODO: detect chrome extensions & packaged apps  // > CustomCode.FileSaver:87
      // a.target = '_blank'  // > CustomCode.FileSaver:88
      if (typeof blob === 'string') {  // > CustomCode.FileSaver:89
        // Support regular links  // > CustomCode.FileSaver:90
        a.href = blob;  // > CustomCode.FileSaver:91
        if (a.origin !== location.origin) {  // > CustomCode.FileSaver:92
          corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');  // > CustomCode.FileSaver:93
        } else {  // > CustomCode.FileSaver:94
          click(a);  // > CustomCode.FileSaver:95
        }  // > CustomCode.FileSaver:96
      } else {  // > CustomCode.FileSaver:97
        // Support blobs  // > CustomCode.FileSaver:98
        a.href = URL.createObjectURL(blob);  // > CustomCode.FileSaver:99
        setTimeout(function () {  // > CustomCode.FileSaver:100
          URL.revokeObjectURL(a.href);  // > CustomCode.FileSaver:101
        }, 4E4); // 40s  // > CustomCode.FileSaver:102
        setTimeout(function () {  // > CustomCode.FileSaver:103
          click(a);  // > CustomCode.FileSaver:104
        }, 0);  // > CustomCode.FileSaver:105
      }  // > CustomCode.FileSaver:106
    } // Use msSaveOrOpenBlob as a second approach  // > CustomCode.FileSaver:107
    : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {  // > CustomCode.FileSaver:108
      name = name || blob.name || 'download';  // > CustomCode.FileSaver:109
      if (typeof blob === 'string') {  // > CustomCode.FileSaver:110
        if (corsEnabled(blob)) {  // > CustomCode.FileSaver:111
          download(blob, name, opts);  // > CustomCode.FileSaver:112
        } else {  // > CustomCode.FileSaver:113
          var a = document.createElement('a');  // > CustomCode.FileSaver:114
          a.href = blob;  // > CustomCode.FileSaver:115
          a.target = '_blank';  // > CustomCode.FileSaver:116
          setTimeout(function () {  // > CustomCode.FileSaver:117
            click(a);  // > CustomCode.FileSaver:118
          });  // > CustomCode.FileSaver:119
        }  // > CustomCode.FileSaver:120
      } else {  // > CustomCode.FileSaver:121
        navigator.msSaveOrOpenBlob(bom(blob, opts), name);  // > CustomCode.FileSaver:122
      }  // > CustomCode.FileSaver:123
    } // Fallback to using FileReader and a popup  // > CustomCode.FileSaver:124
    : function saveAs(blob, name, opts, popup) {  // > CustomCode.FileSaver:125
      // Open a popup immediately do go around popup blocker  // > CustomCode.FileSaver:126
      // Mostly only available on user interaction and the fileReader is async so...  // > CustomCode.FileSaver:127
      popup = popup || open('', '_blank');  // > CustomCode.FileSaver:128
      if (popup) {  // > CustomCode.FileSaver:129
        popup.document.title = popup.document.body.innerText = 'downloading...';  // > CustomCode.FileSaver:130
      }  // > CustomCode.FileSaver:131
      if (typeof blob === 'string') return download(blob, name, opts);  // > CustomCode.FileSaver:132
      var force = blob.type === 'application/octet-stream';  // > CustomCode.FileSaver:133
      var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;  // > CustomCode.FileSaver:134
      var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);  // > CustomCode.FileSaver:135
      if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {  // > CustomCode.FileSaver:136
        // Safari doesn't allow downloading of blob URLs  // > CustomCode.FileSaver:137
        var reader = new FileReader();  // > CustomCode.FileSaver:138
        reader.onloadend = function () {  // > CustomCode.FileSaver:139
          var url = reader.result;  // > CustomCode.FileSaver:140
          url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');  // > CustomCode.FileSaver:141
          if (popup) popup.location.href = url;else location = url;  // > CustomCode.FileSaver:142
          popup = null; // reverse-tabnabbing #460  // > CustomCode.FileSaver:143
        };  // > CustomCode.FileSaver:144
        reader.readAsDataURL(blob);  // > CustomCode.FileSaver:145
      } else {  // > CustomCode.FileSaver:146
        var URL = _global.URL || _global.webkitURL;  // > CustomCode.FileSaver:147
        var url = URL.createObjectURL(blob);  // > CustomCode.FileSaver:148
        if (popup) popup.location = url;else location.href = url;  // > CustomCode.FileSaver:149
        popup = null; // reverse-tabnabbing #460  // > CustomCode.FileSaver:150
        setTimeout(function () {  // > CustomCode.FileSaver:151
          URL.revokeObjectURL(url);  // > CustomCode.FileSaver:152
        }, 4E4); // 40s  // > CustomCode.FileSaver:153
      }  // > CustomCode.FileSaver:154
    });  // > CustomCode.FileSaver:155
    _global.saveAs = saveAs.saveAs = saveAs;  // > CustomCode.FileSaver:156
    if (typeof module !== 'undefined') {  // > CustomCode.FileSaver:157
      module.exports = saveAs;  // > CustomCode.FileSaver:158
    }  // > CustomCode.FileSaver:159
  });  // > CustomCode.FileSaver:160

  _model.addToInitialization(function() {
    if (!__pagesEnabled["varInit"]) return;
    // varInit  // > Initialization.varInit:1
       // > Initialization.varInit:2
    vowels = [  // > Initialization.varInit:3
        { text: 'a', backgroundColor: 'yellow', textColor: 'red', enabled: false },  // > Initialization.varInit:4
        { text: 'e', backgroundColor: 'yellow', textColor: 'red', enabled: false },  // > Initialization.varInit:5
        { text: 'i', backgroundColor: 'yellow', textColor: 'red', enabled: false },  // > Initialization.varInit:6
        { text: 'o', backgroundColor: 'yellow', textColor: 'red', enabled: false },  // > Initialization.varInit:7
        { text: 'u', backgroundColor: 'yellow', textColor: 'red', enabled: false },  // > Initialization.varInit:8
        { text: 'y', backgroundColor: 'yellow', textColor: 'red', enabled: false }, //lookang  // > Initialization.varInit:9
        // R-controlled vowels  // > Initialization.varInit:10
        { text: 'ar', backgroundColor: 'orange', textColor: 'red', enabled: false },  // > Initialization.varInit:11
        { text: 'er', backgroundColor: 'orange', textColor: 'red', enabled: false },  // > Initialization.varInit:12
        { text: 'ir', backgroundColor: 'orange', textColor: 'red', enabled: false },  // > Initialization.varInit:13
        { text: 'or', backgroundColor: 'orange', textColor: 'red', enabled: false },  // > Initialization.varInit:14
        { text: 'ur', backgroundColor: 'orange', textColor: 'red', enabled: false },  // > Initialization.varInit:15
        // Vowel teams and diphthongs  // > Initialization.varInit:16
        { text: 'ai', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:17
        { text: 'ay', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:18
        { text: 'ea', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:19
        { text: 'ee', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:20
        { text: 'ie', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:21
        { text: 'igh', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:22
        { text: 'oa', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:23
        { text: 'oo', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:24
        { text: 'ow', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:25
        { text: 'ou', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:26
        { text: 'oi', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:27
        { text: 'oy', backgroundColor: 'pink', textColor: 'red', enabled: false },  // > Initialization.varInit:28
        { text: 'al', backgroundColor: 'pink', textColor: 'red', enabled: false } // lookang  // > Initialization.varInit:29
    ];  // > Initialization.varInit:30
    // Consonants array  // > Initialization.varInit:31
    consonants = [  // > Initialization.varInit:32
        { text: 'b', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:33
        { text: 'c', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:34
        { text: 'd', backgroundColor: 'lightblue', textColor: 'black', sound: './sound/d.m4a', enabled: false },  // > Initialization.varInit:35
        { text: 'f', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:36
        { text: 'g', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:37
        { text: 'h', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:38
        { text: 'j', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:39
        { text: 'k', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:40
        { text: 'l', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:41
        { text: 'm', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:42
        { text: 'n', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:43
        { text: 'p', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:44
        { text: 'qu', backgroundColor: 'lightblue', textColor: 'black', enabled: false }, //lookang  // > Initialization.varInit:45
        { text: 'r', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:46
        { text: 's', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:47
        { text: 't', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:48
        { text: 'v', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:49
        { text: 'w', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:50
        { text: 'x', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:51
        { text: 'y', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:52
        { text: 'z', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:53
        // Consonant digraphs  // > Initialization.varInit:54
        { text: 'ff', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:55
        { text: 'll', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:56
        { text: 'ss', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:57
        { text: 'zz', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:58
        { text: 'ch', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:59
        { text: 'sh', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:60
        { text: 'th', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:61
        { text: 'wh', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:62
       // { text: 'ph', backgroundColor: 'lightblue', textColor: 'black' }, //lookang 20240920  // > Initialization.varInit:63
        { text: 'tch', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:64
        { text: 'dge', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:65
        { text: 'ck', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:66
        { text: 'ng', backgroundColor: 'lightblue', textColor: 'black', enabled: false },  // > Initialization.varInit:67
        //{ text: 'nk', backgroundColor: 'lightblue', textColor: 'black' }  //lookang 20240920  // > Initialization.varInit:68
    ];  // > Initialization.varInit:69
    // Extract text for TextSet2D  // > Initialization.varInit:70
    vowelsText = vowels.map(v => v.text);          // Extract vowel texts  // > Initialization.varInit:71
    consonantsText = consonants.map(c => c.text);  // Extract consonant texts  // > Initialization.varInit:72
    vowelsBgColor = vowels.map(v => v.backgroundColor);  // > Initialization.varInit:73
    consonantsBgColor = consonants.map(c => c.backgroundColor);  // > Initialization.varInit:74
    vowelsTextColor = vowels.map(v => v.textColor);  // > Initialization.varInit:75
    consonantsTextColor = consonants.map(c => c.textColor);  // > Initialization.varInit:76
    numVowels = vowels.length;  // > Initialization.varInit:77
    numConsonants = consonants.length;  // > Initialization.varInit:78
       // > Initialization.varInit:79
    for (let i = 0; i < numVowels; i++) {  // > Initialization.varInit:80
        vowelsBordered[i] = 0;  // > Initialization.varInit:81
    }  // > Initialization.varInit:82
    for (let i = 0; i < numConsonants; i++) {  // > Initialization.varInit:83
        consonantsBordered[i] = 0;  // > Initialization.varInit:84
    }  // > Initialization.varInit:85
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["positioning"]) return;
    // positioning  // > Initialization.positioning:1
    let halfWidth = 1.0;  // > Initialization.positioning:2
    let maxColumns = Math.floor(halfWidth / (tileWidth + margin));  // > Initialization.positioning:3
    // **Positioning vowels**  // > Initialization.positioning:4
    let vowelStartX = -0.88;  // Start vowels on the left side  // > Initialization.positioning:5
    // **Positioning consonants**  // > Initialization.positioning:6
    let consonantStartX = -0.05;  // Start consonants in the right half  // > Initialization.positioning:7
    for (let i = 0; i < numVowels; i++) {  // > Initialization.positioning:8
        let row = Math.floor(i / maxColumns);  // Calculate the current row  // > Initialization.positioning:9
        let col = i % maxColumns;              // Calculate the current column  // > Initialization.positioning:10
        vowelX[i] = vowelStartX + col * (tileWidth + margin);  // X position for each vowel  // > Initialization.positioning:11
        vowelY[i] = vowelStartY - row * (tileHeight + margin);  // Move down a row if needed  // > Initialization.positioning:12
    }  // > Initialization.positioning:13
    for (let i = 0; i < numConsonants; i++) {  // > Initialization.positioning:14
        let row = Math.floor(i / maxColumns);  // Calculate the current row  // > Initialization.positioning:15
        let col = i % maxColumns;              // Calculate the current column  // > Initialization.positioning:16
        consonantX[i] = consonantStartX + col * (tileWidth + margin);  // X position for each consonant  // > Initialization.positioning:17
        consonantY[i] = consonantStartY - row * (tileHeight + margin);  // Move down a row if needed  // > Initialization.positioning:18
    }  // > Initialization.positioning:19
    let totalWidth = numPlacementBoxes * placementBoxWidth;  // Total width occupied by boxes  // > Initialization.positioning:20
    // Center the placement boxes horizontally  // > Initialization.positioning:21
    let boxStartX = -(totalWidth / 2) + 0.1;  // > Initialization.positioning:22
    restartX = boxStartX - 0.2;  // > Initialization.positioning:23
    for (let i = 0; i < numPlacementBoxes; i++) {  // > Initialization.positioning:24
        placementBoxX.push(boxStartX + i * placementBoxWidth);  // Tight alignment, no gaps between boxes  // > Initialization.positioning:25
    }  // > Initialization.positioning:26
    blendBtnX = boxStartX + totalWidth + 0.05;  // > Initialization.positioning:27
    for (let i = 0; i < numOfWordsReadByColumn; i++) {  // > Initialization.positioning:28
        wordsReadSet1Y.push(wordsReadSetStartY - i * 0.09);  // > Initialization.positioning:29
    }  // > Initialization.positioning:30
    for (let i = 0; i < numOfWordsReadByColumn; i++) {  // > Initialization.positioning:31
        wordsReadSet2Y.push(wordsReadSetStartY - i * 0.09);  // > Initialization.positioning:32
    }  // > Initialization.positioning:33
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["font"]) return;
    // font  // > Initialization.font:1
    setResponsiveFontSize()  // > Initialization.font:2
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["fontTL"]) return;
    // fontTL  // > Initialization.fontTL:1
    if (_isMobile){  // > Initialization.fontTL:2
      //do nothing  // > Initialization.fontTL:3
      }  // > Initialization.fontTL:4
        // > Initialization.fontTL:5
      else{  // > Initialization.fontTL:6
        // copy this into the initialization  // > Initialization.fontTL:7
    // make the font bigger  // > Initialization.fontTL:8
    _view.letterTilePanel_2.getMessageDecoration("TL").getFont().setFontSize("1.5vw");  // > Initialization.fontTL:9
    _view.letterTilePanel_2.getMessageDecoration("TL").getFont().setFontFamily("'Comic Sans MS', 'Comic Sans', cursive");  // > Initialization.fontTL:10
    _view.letterTilePanel_2.getMessageDecoration("TR").getFont().setFontSize("1.5vw");  // > Initialization.fontTL:11
    _view.letterTilePanel_2.getMessageDecoration("TR").getFont().setFontFamily("'Comic Sans MS', 'Comic Sans', cursive");  // > Initialization.fontTL:12
    _view.letterTilePanel_2.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.fontTL:13
    _view.letterTilePanel_2.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.fontTL:14
    _view.letterTilePanel_2.getMessageDecoration("TL").getStyle().setFillColor("red");  // > Initialization.fontTL:15
        }  // > Initialization.fontTL:16
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["import_lookang"]) return;
    if (!editing) {  // > Initialization.import_lookang:1
      //if (!newsim) {  // > Initialization.import_lookang:2
        attemptLoadGraph().then(function(data) {  // > Initialization.import_lookang:3
          //alert( "loading new values")  // > Initialization.import_lookang:4
          ////////////////////////////////////////////  // > Initialization.import_lookang:5
          // data to be loaded into export & import //  // > Initialization.import_lookang:6
          ////////////////////////////////////////////  // > Initialization.import_lookang:7
          // Setting: //   // > Initialization.import_lookang:8
        //  systemText2 = data.systemText2;  // > Initialization.import_lookang:9
      // > Initialization.import_lookang:10
            // > Initialization.import_lookang:11
          // ... to be continued if necessary ...  // > Initialization.import_lookang:12
            // > Initialization.import_lookang:13
          //_view._addInteraction(function(){}  ,"Q1",{"property":"value", "element":"question"}); // use to detect beginning of Q1  // > Initialization.import_lookang:14
          //alert( "add interaction")  // > Initialization.import_lookang:15
            // > Initialization.import_lookang:16
          _update();  // > Initialization.import_lookang:17
          //alert( not working if use "_view._update")  // > Initialization.import_lookang:18
        } );  // > Initialization.import_lookang:19
      // > Initialization.import_lookang:20
      // > Initialization.import_lookang:21
      }  // > Initialization.import_lookang:22
  });

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page 1"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

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
    if (_odeName=="Evol Page 1") return _ODEi_evolution1;
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


    __odeSelf._getOdeVars = function (){ return["blendX","t"]};

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
      if (__pagesEnabled["Event 1"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
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
        if (__state[__cIn]!=blendX) __mustReinitialize = true;
        __state[__cIn++] = blendX;
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
        blendX = __state[__cOut++];
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
        var blendX = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Preliminary code: 
        // Preliminary code for ODE : Evol Page 1  // > Preliminary code for ODE.Evol Page 1:1
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = blendvX; // Rate for ODE: Evol Page 1:blendX
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
        var blendX = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        blendX = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = blendX;
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
        var blendX = _aState[__cOut++];
        var t = _aState[__cOut++];
        var blendXmax = Math.max(-0.5,lastCardIndex/5-0.5);  // > Event zero-condition for page Evol Page 1:1
        console.log(blendXmax - blendX);  // > Event zero-condition for page Evol Page 1:2
        return blendXmax - blendX ; // Condition for Event 1  // > Event zero-condition for page Evol Page 1:3
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        blendX = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = blendX;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        // Action for Event 1  // > Event action for page Evol Page 1:1
        blendvX = 0  // > Event action for page Evol Page 1:2
        _pause()  // > Event action for page Evol Page 1:3
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_blendX(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
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
    _view = new Blending_Segmenting_Board_Teacher_Version_Selector_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.sound.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'sound'
          _view.topLabel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'topLabel'
          _view.blendbutton_2.setAction("OnRelease", function(_data,_info) {
  //if (lastCardIndex !== -1 ||lastCardIndex !== 0) { 
  if (lastCardIndex >0.5 ) { //0.5 is chosen as -1,0 dont move
  if (blendX !== -0.5) blendX = -0.5;
  blendvX = 0.5
  _play()
  }

}); // HtmlView setting action 'OnRelease' for element 'blendbutton_2'
          _view.blendbutton_2.setAction("OnPress", function(_data,_info) {
  onBlendClick();

}); // HtmlView setting action 'OnPress' for element 'blendbutton_2'
          _view.blendbutton_2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'blendbutton_2'
          _view.resetbutton_2_2.setAction("OnPress", function(_data,_info) {
  //_reset();
  onResetButtonClick();

}); // HtmlView setting action 'OnPress' for element 'resetbutton_2_2'
          _view.resetbutton_2_2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'resetbutton_2_2'
          _view.downloadButton.setAction("OnPress", function(_data,_info) {
  onDownloadClick();

}); // HtmlView setting action 'OnPress' for element 'downloadButton'
          _view.downloadButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'downloadButton'
          _view.selectAllButton.setAction("OnPress", function(_data,_info) {
  onSelectAllClick();

}); // HtmlView setting action 'OnPress' for element 'selectAllButton'
          _view.selectAllButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'selectAllButton'
          _view.unselectallbutton_2.setAction("OnPress", function(_data,_info) {
  onUnselectAllClick();

}); // HtmlView setting action 'OnPress' for element 'unselectallbutton_2'
          _view.unselectallbutton_2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'unselectallbutton_2'
          _view.letterTilePanel_2.linkProperty("Height",  function() { return canvasHeight; }, function(_v) { canvasHeight = _v; } ); // HtmlView linking property 'Height' for element 'letterTilePanel_2'
          _view.letterTilePanel_2.linkProperty("Width",  function() { return canvasWidth; }, function(_v) { canvasWidth = _v; } ); // HtmlView linking property 'Width' for element 'letterTilePanel_2'
          _view.letterTilePanel_2.setAction("OnZoom", function(_data,_info) {
  setResponsiveFontSize();

}); // HtmlView setting action 'OnZoom' for element 'letterTilePanel_2'
          _view.letterTilePanel_2.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView setting action 'OnDoubleClick' for element 'letterTilePanel_2'
          _view.letterTilePanel_2.setAction("OnOrientationChange", function(_data,_info) {
  setResponsiveFontSize();

}); // HtmlView setting action 'OnOrientationChange' for element 'letterTilePanel_2'
          _view.letterTilePanel_2.setAction("OnResize", function(_data,_info) {
  setResponsiveFontSize();

}); // HtmlView setting action 'OnResize' for element 'letterTilePanel_2'
          _view.placementBoxSet.linkProperty("NumberOfElements",  function() { return numPlacementBoxes; }, function(_v) { numPlacementBoxes = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'placementBoxSet'
          _view.placementBoxSet.linkProperty("SizeX",  function() { return placementBoxWidth; }, function(_v) { placementBoxWidth = _v; } ); // HtmlView linking property 'SizeX' for element 'placementBoxSet'
          _view.placementBoxSet.linkProperty("X",  function() { return placementBoxX; }, function(_v) { placementBoxX = _v; } ); // HtmlView linking property 'X' for element 'placementBoxSet'
          _view.placementBoxSet.linkProperty("Y",  function() { return placementBoxY; }, function(_v) { placementBoxY = _v; } ); // HtmlView linking property 'Y' for element 'placementBoxSet'
          _view.placementBoxSet.setAction("OnPress", function(_data,_info) {
  placementCardInteracted=placementCardInteracted
  if (placementCardInteracted==placementCardInteracted){
      onPlacementBoxClick(placementCardInteracted);
  }

}); // HtmlView setting action 'OnPress' for element 'placementBoxSet'
          _view.placementBoxSet.linkProperty("SizeY",  function() { return placementBoxHeight; }, function(_v) { placementBoxHeight = _v; } ); // HtmlView linking property 'SizeY' for element 'placementBoxSet'
          _view.placementBoxSet.linkProperty("ElementInteracted",  function() { return placementCardInteracted; }, function(_v) { placementCardInteracted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'placementBoxSet'
          _view.placementCardSet.linkProperty("NumberOfElements",  function() { return numPlacementBoxes; }, function(_v) { numPlacementBoxes = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'placementCardSet'
          _view.placementCardSet.linkProperty("FillColor",  function() { return placementCardBgColor; }, function(_v) { placementCardBgColor = _v; } ); // HtmlView linking property 'FillColor' for element 'placementCardSet'
          _view.placementCardSet.linkProperty("SizeX",  function() { return placementBoxWidth * 5/6; } ); // HtmlView linking property 'SizeX' for element 'placementCardSet'
          _view.placementCardSet.linkProperty("X",  function() { return placementBoxX; }, function(_v) { placementBoxX = _v; } ); // HtmlView linking property 'X' for element 'placementCardSet'
          _view.placementCardSet.linkProperty("Y",  function() { return placementBoxY; }, function(_v) { placementBoxY = _v; } ); // HtmlView linking property 'Y' for element 'placementCardSet'
          _view.placementCardSet.linkProperty("SizeY",  function() { return placementBoxHeight * 5/6; } ); // HtmlView linking property 'SizeY' for element 'placementCardSet'
          _view.Reset.linkProperty("X",  function() { return restartX; }, function(_v) { restartX = _v; } ); // HtmlView linking property 'X' for element 'Reset'
          _view.Reset.linkProperty("Y",  function() { return restartY; }, function(_v) { restartY = _v; } ); // HtmlView linking property 'Y' for element 'Reset'
          _view.Reset.setAction("OnPress", function(_data,_info) {
  onResetButtonClick();

}); // HtmlView setting action 'OnPress' for element 'Reset'
          _view.placementCardText.linkProperty("NumberOfElements",  function() { return numPlacementBoxes; }, function(_v) { numPlacementBoxes = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'placementCardText'
          _view.placementCardText.linkProperty("FillColor",  function() { return placementCardTextColor; }, function(_v) { placementCardTextColor = _v; } ); // HtmlView linking property 'FillColor' for element 'placementCardText'
          _view.placementCardText.linkProperty("X",  function() { return placementBoxX; }, function(_v) { placementBoxX = _v; } ); // HtmlView linking property 'X' for element 'placementCardText'
          _view.placementCardText.linkProperty("Y",  function() { return placementBoxY; }, function(_v) { placementBoxY = _v; } ); // HtmlView linking property 'Y' for element 'placementCardText'
          _view.placementCardText.linkProperty("Text",  function() { return placementCardText; }, function(_v) { placementCardText = _v; } ); // HtmlView linking property 'Text' for element 'placementCardText'
          _view.placementCardText.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'placementCardText'
          _view.vowelSet.linkProperty("NumberOfElements",  function() { return numVowels; }, function(_v) { numVowels = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'vowelSet'
          _view.vowelSet.linkProperty("FillColor",  function() { return vowelsBgColor; }, function(_v) { vowelsBgColor = _v; } ); // HtmlView linking property 'FillColor' for element 'vowelSet'
          _view.vowelSet.linkProperty("SizeX",  function() { return tileWidth; }, function(_v) { tileWidth = _v; } ); // HtmlView linking property 'SizeX' for element 'vowelSet'
          _view.vowelSet.linkProperty("X",  function() { return vowelX; }, function(_v) { vowelX = _v; } ); // HtmlView linking property 'X' for element 'vowelSet'
          _view.vowelSet.linkProperty("Y",  function() { return vowelY; }, function(_v) { vowelY = _v; } ); // HtmlView linking property 'Y' for element 'vowelSet'
          _view.vowelSet.setAction("OnPress", function(_data,_info) {
  vowelInteracted=vowelInteracted
  if (vowelInteracted==vowelInteracted){
      onVowelClick(vowelInteracted);
      console.log("selectedTileIndex " + selectedTileIndex);
      console.log("selectedTileType " + selectedTileType);
  //speech(vowelsText[vowelInteracted])
  }

}); // HtmlView setting action 'OnPress' for element 'vowelSet'
          _view.vowelSet.linkProperty("SizeY",  function() { return tileHeight; }, function(_v) { tileHeight = _v; } ); // HtmlView linking property 'SizeY' for element 'vowelSet'
          _view.vowelSet.linkProperty("LineWidth",  function() { return vowelsBordered; }, function(_v) { vowelsBordered = _v; } ); // HtmlView linking property 'LineWidth' for element 'vowelSet'
          _view.vowelSet.linkProperty("ElementInteracted",  function() { return vowelInteracted; }, function(_v) { vowelInteracted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'vowelSet'
          _view.consonantSet.linkProperty("NumberOfElements",  function() { return numConsonants; }, function(_v) { numConsonants = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'consonantSet'
          _view.consonantSet.linkProperty("FillColor",  function() { return consonantsBgColor; }, function(_v) { consonantsBgColor = _v; } ); // HtmlView linking property 'FillColor' for element 'consonantSet'
          _view.consonantSet.linkProperty("SizeX",  function() { return tileWidth; }, function(_v) { tileWidth = _v; } ); // HtmlView linking property 'SizeX' for element 'consonantSet'
          _view.consonantSet.linkProperty("X",  function() { return consonantX; }, function(_v) { consonantX = _v; } ); // HtmlView linking property 'X' for element 'consonantSet'
          _view.consonantSet.linkProperty("Y",  function() { return consonantY; }, function(_v) { consonantY = _v; } ); // HtmlView linking property 'Y' for element 'consonantSet'
          _view.consonantSet.setAction("OnPress", function(_data,_info) {
  consonantInteracted=consonantInteracted
  if (consonantInteracted==consonantInteracted){
      onConsonantClick(consonantInteracted);
      console.log("selectedTileIndex " + selectedTileIndex);
      console.log("selectedTileType " + selectedTileType);
  //speech(consonantsText[consonantInteracted]) //lookang
  }

}); // HtmlView setting action 'OnPress' for element 'consonantSet'
          _view.consonantSet.linkProperty("SizeY",  function() { return tileHeight; }, function(_v) { tileHeight = _v; } ); // HtmlView linking property 'SizeY' for element 'consonantSet'
          _view.consonantSet.linkProperty("LineWidth",  function() { return consonantsBordered; }, function(_v) { consonantsBordered = _v; } ); // HtmlView linking property 'LineWidth' for element 'consonantSet'
          _view.consonantSet.linkProperty("ElementInteracted",  function() { return consonantInteracted; }, function(_v) { consonantInteracted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'consonantSet'
          _view.vowelText.linkProperty("NumberOfElements",  function() { return numVowels; }, function(_v) { numVowels = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'vowelText'
          _view.vowelText.linkProperty("FillColor",  function() { return vowelsTextColor; }, function(_v) { vowelsTextColor = _v; } ); // HtmlView linking property 'FillColor' for element 'vowelText'
          _view.vowelText.linkProperty("X",  function() { return vowelX; }, function(_v) { vowelX = _v; } ); // HtmlView linking property 'X' for element 'vowelText'
          _view.vowelText.linkProperty("Y",  function() { return vowelY; }, function(_v) { vowelY = _v; } ); // HtmlView linking property 'Y' for element 'vowelText'
          _view.vowelText.linkProperty("Text",  function() { return vowelsText; }, function(_v) { vowelsText = _v; } ); // HtmlView linking property 'Text' for element 'vowelText'
          _view.vowelText.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'vowelText'
          _view.consonantText.linkProperty("NumberOfElements",  function() { return numConsonants; }, function(_v) { numConsonants = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'consonantText'
          _view.consonantText.linkProperty("FillColor",  function() { return consonantsTextColor; }, function(_v) { consonantsTextColor = _v; } ); // HtmlView linking property 'FillColor' for element 'consonantText'
          _view.consonantText.linkProperty("X",  function() { return consonantX; }, function(_v) { consonantX = _v; } ); // HtmlView linking property 'X' for element 'consonantText'
          _view.consonantText.linkProperty("Y",  function() { return consonantY; }, function(_v) { consonantY = _v; } ); // HtmlView linking property 'Y' for element 'consonantText'
          _view.consonantText.linkProperty("Text",  function() { return consonantsText; }, function(_v) { consonantsText = _v; } ); // HtmlView linking property 'Text' for element 'consonantText'
          _view.consonantText.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'consonantText'
          _view.blendBtn.linkProperty("X",  function() { return blendBtnX; }, function(_v) { blendBtnX = _v; } ); // HtmlView linking property 'X' for element 'blendBtn'
          _view.blendBtn.linkProperty("Y",  function() { return blendBtnY; }, function(_v) { blendBtnY = _v; } ); // HtmlView linking property 'Y' for element 'blendBtn'
          _view.blendBtn.setAction("OnPress", function(_data,_info) {
  onBlendClick();

}); // HtmlView setting action 'OnPress' for element 'blendBtn'
          _view.Blend.linkProperty("X",  function() { return blendBtnX; }, function(_v) { blendBtnX = _v; } ); // HtmlView linking property 'X' for element 'Blend'
          _view.Blend.linkProperty("Y",  function() { return blendBtnY; }, function(_v) { blendBtnY = _v; } ); // HtmlView linking property 'Y' for element 'Blend'
          _view.Words_read.linkProperty("Font",  function() { return fontSmall; }, function(_v) { fontSmall = _v; } ); // HtmlView linking property 'Font' for element 'Words_read'
          _view.wordsReadSet1.linkProperty("NumberOfElements",  function() { return numOfWordsReadByColumn; }, function(_v) { numOfWordsReadByColumn = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'wordsReadSet1'
          _view.wordsReadSet1.linkProperty("X",  function() { return wordsReadSet1X; }, function(_v) { wordsReadSet1X = _v; } ); // HtmlView linking property 'X' for element 'wordsReadSet1'
          _view.wordsReadSet1.linkProperty("Y",  function() { return wordsReadSet1Y; }, function(_v) { wordsReadSet1Y = _v; } ); // HtmlView linking property 'Y' for element 'wordsReadSet1'
          _view.wordsReadSet1.linkProperty("Text",  function() { return wordsReadSet1Text; }, function(_v) { wordsReadSet1Text = _v; } ); // HtmlView linking property 'Text' for element 'wordsReadSet1'
          _view.wordsReadSet1.setAction("OnPress", function(_data,_info) {
  wordsReadSet1Interacted=wordsReadSet1Interacted;
  if (wordsReadSet1Interacted==wordsReadSet1Interacted){
    if (!wordsReadSet1Info[wordsReadSet1Interacted]) return;
    onWordReadClick(wordsReadSet1Info[wordsReadSet1Interacted]);
    console.log(wordsReadSet1Info[wordsReadSet1Interacted]);
  }

}); // HtmlView setting action 'OnPress' for element 'wordsReadSet1'
          _view.wordsReadSet1.linkProperty("Font",  function() { return fontSmall; }, function(_v) { fontSmall = _v; } ); // HtmlView linking property 'Font' for element 'wordsReadSet1'
          _view.wordsReadSet1.linkProperty("ElementInteracted",  function() { return wordsReadSet1Interacted; }, function(_v) { wordsReadSet1Interacted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'wordsReadSet1'
          _view.wordsReadSet2.linkProperty("NumberOfElements",  function() { return numOfWordsReadByColumn; }, function(_v) { numOfWordsReadByColumn = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'wordsReadSet2'
          _view.wordsReadSet2.linkProperty("X",  function() { return wordsReadSet2X; }, function(_v) { wordsReadSet2X = _v; } ); // HtmlView linking property 'X' for element 'wordsReadSet2'
          _view.wordsReadSet2.linkProperty("Y",  function() { return wordsReadSet2Y; }, function(_v) { wordsReadSet2Y = _v; } ); // HtmlView linking property 'Y' for element 'wordsReadSet2'
          _view.wordsReadSet2.linkProperty("Text",  function() { return wordsReadSet2Text; }, function(_v) { wordsReadSet2Text = _v; } ); // HtmlView linking property 'Text' for element 'wordsReadSet2'
          _view.wordsReadSet2.setAction("OnPress", function(_data,_info) {
  wordsReadSet2Interacted=wordsReadSet2Interacted;
  if (wordsReadSet2Interacted==wordsReadSet2Interacted){
    if (!wordsReadSet2Info[wordsReadSet2Interacted]) return;
    onWordReadClick(wordsReadSet2Info[wordsReadSet2Interacted]);
    console.log(wordsReadSet2Info[wordsReadSet2Interacted]);
  }

}); // HtmlView setting action 'OnPress' for element 'wordsReadSet2'
          _view.wordsReadSet2.linkProperty("Font",  function() { return fontSmall; }, function(_v) { fontSmall = _v; } ); // HtmlView linking property 'Font' for element 'wordsReadSet2'
          _view.wordsReadSet2.linkProperty("ElementInteracted",  function() { return wordsReadSet2Interacted; }, function(_v) { wordsReadSet2Interacted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'wordsReadSet2'
          _view.blend_text.linkProperty("X",  function() { return blendX; }, function(_v) { blendX = _v; } ); // HtmlView linking property 'X' for element 'blend_text'
          _view.blend_text.linkProperty("Y",  function() { return blendY; }, function(_v) { blendY = _v; } ); // HtmlView linking property 'Y' for element 'blend_text'
          _view.blend_text.setAction("OnDrag", function(_data,_info) {
  var blendXmax = 0.5
  var blendXmin = -0.5
  blendX = Math.max(blendXmin, blendX);
  blendX = Math.min(blendXmax, blendX);

}); // HtmlView setting action 'OnDrag' for element 'blend_text'
          _view.blend_text.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'blend_text'
          _view.arrow2D.linkProperty("X",  function() { return blendX; }, function(_v) { blendX = _v; } ); // HtmlView linking property 'X' for element 'arrow2D'
          _view.arrow2D.linkProperty("Y",  function() { return blendY; }, function(_v) { blendY = _v; } ); // HtmlView linking property 'Y' for element 'arrow2D'
          _view.arrow2D.setAction("OnPress", function(_data,_info) {
  if (lastCardIndex !== -1) {
  if (blendX !== -0.5) blendX = -0.5;
  blendvX = 0.5
  _play()
  }

}); // HtmlView setting action 'OnPress' for element 'arrow2D'
          _view.arrow2D.setAction("OnDrag", function(_data,_info) {
  var blendXmax = Math.max(placementCardInteracted/5-0.5,-0.5)
  var blendXmin = -0.5
  blendX = Math.max(blendXmin, blendX);
  blendX = Math.min(blendXmax, blendX);

}); // HtmlView setting action 'OnDrag' for element 'arrow2D'
          _view.blendArrowDrag.linkProperty("X",  function() { return blendX; }, function(_v) { blendX = _v; } ); // HtmlView linking property 'X' for element 'blendArrowDrag'
          _view.blendArrowDrag.linkProperty("Y",  function() { return blendY; }, function(_v) { blendY = _v; } ); // HtmlView linking property 'Y' for element 'blendArrowDrag'
          _view.blendArrowDrag.setAction("OnPress", function(_data,_info) {
  if (lastCardIndex !== -1) {
  if (blendX !== -0.5) blendX = -0.5;
  blendvX = 0.5
  _play()
  }

}); // HtmlView setting action 'OnPress' for element 'blendArrowDrag'
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
function Blending_Segmenting_Board_Teacher_Version_Selector_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = Blending_Segmenting_Board_Teacher_Version_Selector_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function Blending_Segmenting_Board_Teacher_Version_Selector_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singlePlotPanel", _view._topFrame) // EJsS HtmlView.HtmlView: declaration of element 'singlePlotPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"labelPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'labelPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'labelPanel'
      .setProperty("CSS",{ "justify-content": "flex-end"}) // EJsS HtmlView.HtmlView: setting property 'CSS' for element 'labelPanel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'labelPanel'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"sound", _view.labelPanel) // EJsS HtmlView.HtmlView: declaration of element 'sound'
      .setProperty("Text","sound") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'sound'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"topLabel", _view.labelPanel) // EJsS HtmlView.HtmlView: declaration of element 'topLabel'
      .setProperty("Text","Blending/Segmenting Board") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'topLabel'
      ;

    _view._addElement(EJSS_INTERFACE.button,"blendbutton_2", _view.labelPanel) // EJsS HtmlView.HtmlView: declaration of element 'blendbutton_2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'blendbutton_2'
      .setProperty("Text","Blend →") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'blendbutton_2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'blendbutton_2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetbutton_2_2", _view.labelPanel) // EJsS HtmlView.HtmlView: declaration of element 'resetbutton_2_2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'resetbutton_2_2'
      .setProperty("Text","Reset ↺") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'resetbutton_2_2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'resetbutton_2_2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"downloadButton", _view.labelPanel) // EJsS HtmlView.HtmlView: declaration of element 'downloadButton'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'downloadButton'
      .setProperty("Text","Download") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'downloadButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"selectAllButton", _view.labelPanel) // EJsS HtmlView.HtmlView: declaration of element 'selectAllButton'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'selectAllButton'
      .setProperty("Text","Select all") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'selectAllButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"unselectallbutton_2", _view.labelPanel) // EJsS HtmlView.HtmlView: declaration of element 'unselectallbutton_2'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'unselectallbutton_2'
      .setProperty("Text","Unselect All") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'unselectallbutton_2'
      ;

    _view._addElement(EJSS_INTERFACE.wrappedPanel,"wrappedPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'wrappedPanel'
      .setProperty("CSS",{ "display":"block"}) // EJsS HtmlView.HtmlView: setting property 'CSS' for element 'wrappedPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"letterTilePanel_2", _view.wrappedPanel) // EJsS HtmlView.HtmlView: declaration of element 'letterTilePanel_2'
      .setProperty("TRMessage","Click on the black arrow to blend and read the word.") // EJsS HtmlView.HtmlView: setting property 'TRMessage' for element 'letterTilePanel_2'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'letterTilePanel_2'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'letterTilePanel_2'
      .setProperty("EnabledDragging","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledDragging' for element 'letterTilePanel_2'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"placementBoxSet", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'placementBoxSet'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'placementBoxSet'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'placementBoxSet'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'placementBoxSet'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'placementBoxSet'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'placementBoxSet'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"placementCardSet", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'placementCardSet'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'placementCardSet'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'placementCardSet'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'placementCardSet'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Reset", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'Reset'
      .setProperty("Text","Reset") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'Reset'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'Reset'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'Reset'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"placementCardText", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'placementCardText'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'placementCardText'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"vowelSet", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'vowelSet'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'vowelSet'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'vowelSet'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'vowelSet'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"consonantSet", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'consonantSet'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'consonantSet'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'consonantSet'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'consonantSet'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"vowelText", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'vowelText'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"consonantText", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'consonantText'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"wordsReadBackground", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'wordsReadBackground'
      .setProperty("FillColor","rgb(200,220,208)") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'wordsReadBackground'
      .setProperty("SizeX",0.3) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'wordsReadBackground'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'wordsReadBackground'
      .setProperty("X",0.83) // EJsS HtmlView.HtmlView: setting property 'X' for element 'wordsReadBackground'
      .setProperty("Y",-0.15) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'wordsReadBackground'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'wordsReadBackground'
      .setProperty("SizeY",1.45) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'wordsReadBackground'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"blendBtn", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'blendBtn'
      .setProperty("FillColor","Green") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'blendBtn'
      .setProperty("SizeX",0.15) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'blendBtn'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'blendBtn'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'blendBtn'
      .setProperty("SizeY",0.15) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'blendBtn'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'blendBtn'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Blend", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'Blend'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'Blend'
      .setProperty("Text","Blend") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'Blend'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Words_read", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'Words_read'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'Words_read'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'Words_read'
      .setProperty("X",0.7) // EJsS HtmlView.HtmlView: setting property 'X' for element 'Words_read'
      .setProperty("Y",0.53) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'Words_read'
      .setProperty("Text","Words read") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'Words_read'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'Words_read'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"wordsReadSet1", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'wordsReadSet1'
      .setProperty("Sensitivity",20) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'wordsReadSet1'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'wordsReadSet1'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'wordsReadSet1'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"wordsReadSet2", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'wordsReadSet2'
      .setProperty("Sensitivity",20) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'wordsReadSet2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'wordsReadSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"blend_text", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'blend_text'
      .setProperty("Text","➤") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'blend_text'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'blend_text'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'blend_text'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow2D", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'arrow2D'
      .setProperty("MarkEnd","TRIANGLE") // EJsS HtmlView.HtmlView: setting property 'MarkEnd' for element 'arrow2D'
      .setProperty("Sensitivity",20) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'arrow2D'
      .setProperty("SizeX",0.2) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'arrow2D'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'arrow2D'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'arrow2D'
      .setProperty("LineWidth",4) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'arrow2D'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'arrow2D'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView: setting property 'Offset' for element 'arrow2D'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"blendArrowDrag", _view.letterTilePanel_2) // EJsS HtmlView.HtmlView: declaration of element 'blendArrowDrag'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'blendArrowDrag'
      .setProperty("SizeX",0.2) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'blendArrowDrag'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'blendArrowDrag'
      .setProperty("SizeY",0.1) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'blendArrowDrag'
      .setProperty("DrawLines",false) // EJsS HtmlView.HtmlView: setting property 'DrawLines' for element 'blendArrowDrag'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView: setting property 'DrawFill' for element 'blendArrowDrag'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'blendArrowDrag'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"soundPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'soundPanel'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.soundPanel) // EJsS HtmlView.HtmlView: declaration of element 'audio'
      .setProperty("Controls",true) // EJsS HtmlView.HtmlView: setting property 'Controls' for element 'audio'
      .setProperty("AudioUrl","./sound/d.m4a") // EJsS HtmlView.HtmlView: setting property 'AudioUrl' for element 'audio'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new Blending_Segmenting_Board_Teacher_Version_Selector("_topFrame","_ejs_library/",null);
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
