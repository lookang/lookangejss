/* _inputParameters: an object with different values for the model parameters */
function perimeter(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var pi; // EjsS Model.Variables.Var Table.pi
  var font; // EjsS Model.Variables.Var Table.font

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
  var n2; // EjsS Model.Variables.cells.n2
  var x; // EjsS Model.Variables.cells.x
  var y; // EjsS Model.Variables.cells.y
  var x2; // EjsS Model.Variables.cells.x2
  var y2; // EjsS Model.Variables.cells.y2
  var x3; // EjsS Model.Variables.cells.x3
  var y3; // EjsS Model.Variables.cells.y3
  var x4; // EjsS Model.Variables.cells.x4
  var y4; // EjsS Model.Variables.cells.y4
  var elementinteracted; // EjsS Model.Variables.cells.elementinteracted
  var elementinteracted2; // EjsS Model.Variables.cells.elementinteracted2
  var elementinteracted3; // EjsS Model.Variables.cells.elementinteracted3
  var elementinteracted4; // EjsS Model.Variables.cells.elementinteracted4
  var coloroff; // EjsS Model.Variables.cells.coloroff
  var coloron; // EjsS Model.Variables.cells.coloron
  var colorhighlight; // EjsS Model.Variables.cells.colorhighlight
  var linecolor; // EjsS Model.Variables.cells.linecolor
  var linecolor2; // EjsS Model.Variables.cells.linecolor2
  var linecolor3; // EjsS Model.Variables.cells.linecolor3
  var linecolor4; // EjsS Model.Variables.cells.linecolor4
  var selectedwidth; // EjsS Model.Variables.cells.selectedwidth
  var selectedwidtho; // EjsS Model.Variables.cells.selectedwidtho
  var linehighlightwidth; // EjsS Model.Variables.cells.linehighlightwidth
  var linewidth; // EjsS Model.Variables.cells.linewidth
  var linewidth2; // EjsS Model.Variables.cells.linewidth2
  var linewidth3; // EjsS Model.Variables.cells.linewidth3
  var linewidth4; // EjsS Model.Variables.cells.linewidth4
  var xcell; // EjsS Model.Variables.cells.xcell
  var cellImageUrl; // EjsS Model.Variables.cells.cellImageUrl
  var cellUnicodeUrl; // EjsS Model.Variables.cells.cellUnicodeUrl
  var ycell; // EjsS Model.Variables.cells.ycell
  var cellsizex; // EjsS Model.Variables.cells.cellsizex
  var cellsizey; // EjsS Model.Variables.cells.cellsizey
  var text; // EjsS Model.Variables.cells.text
  var text2; // EjsS Model.Variables.cells.text2
  var textanswer; // EjsS Model.Variables.cells.textanswer
  var noOfNodes; // EjsS Model.Variables.cells.noOfNodes
  var noOfRow; // EjsS Model.Variables.cells.noOfRow
  var noOfCol; // EjsS Model.Variables.cells.noOfCol
  var noOfCell; // EjsS Model.Variables.cells.noOfCell
  var lineToNode1; // EjsS Model.Variables.cells.lineToNode1
  var lineToNode2; // EjsS Model.Variables.cells.lineToNode2
  var nodeToLine1; // EjsS Model.Variables.cells.nodeToLine1
  var nodeToLine2; // EjsS Model.Variables.cells.nodeToLine2
  var lineGrid1; // EjsS Model.Variables.cells.lineGrid1
  var lineGrid2; // EjsS Model.Variables.cells.lineGrid2
  var lineGrid3; // EjsS Model.Variables.cells.lineGrid3
  var lineGrid4; // EjsS Model.Variables.cells.lineGrid4
  var adjMat; // EjsS Model.Variables.cells.adjMat
  var maxPeri; // EjsS Model.Variables.cells.maxPeri
  var maxArea1; // EjsS Model.Variables.cells.maxArea1
  var maxArea2; // EjsS Model.Variables.cells.maxArea2
  var periOfMaxArea1; // EjsS Model.Variables.cells.periOfMaxArea1
  var periOfMaxArea2; // EjsS Model.Variables.cells.periOfMaxArea2
  var activityDesc; // EjsS Model.Variables.cells.activityDesc

  var inputPerimeterA; // EjsS Model.Variables.inputsanswers.inputPerimeterA
  var inputAreaA; // EjsS Model.Variables.inputsanswers.inputAreaA

  var hintanswers; // EjsS Model.Variables.hint.hintanswers

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
      font : font,
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
      n2 : n2,
      x : x,
      y : y,
      x2 : x2,
      y2 : y2,
      x3 : x3,
      y3 : y3,
      x4 : x4,
      y4 : y4,
      elementinteracted : elementinteracted,
      elementinteracted2 : elementinteracted2,
      elementinteracted3 : elementinteracted3,
      elementinteracted4 : elementinteracted4,
      coloroff : coloroff,
      coloron : coloron,
      colorhighlight : colorhighlight,
      linecolor : linecolor,
      linecolor2 : linecolor2,
      linecolor3 : linecolor3,
      linecolor4 : linecolor4,
      selectedwidth : selectedwidth,
      selectedwidtho : selectedwidtho,
      linehighlightwidth : linehighlightwidth,
      linewidth : linewidth,
      linewidth2 : linewidth2,
      linewidth3 : linewidth3,
      linewidth4 : linewidth4,
      xcell : xcell,
      cellImageUrl : cellImageUrl,
      cellUnicodeUrl : cellUnicodeUrl,
      ycell : ycell,
      cellsizex : cellsizex,
      cellsizey : cellsizey,
      text : text,
      text2 : text2,
      textanswer : textanswer,
      noOfNodes : noOfNodes,
      noOfRow : noOfRow,
      noOfCol : noOfCol,
      noOfCell : noOfCell,
      lineToNode1 : lineToNode1,
      lineToNode2 : lineToNode2,
      nodeToLine1 : nodeToLine1,
      nodeToLine2 : nodeToLine2,
      lineGrid1 : lineGrid1,
      lineGrid2 : lineGrid2,
      lineGrid3 : lineGrid3,
      lineGrid4 : lineGrid4,
      adjMat : adjMat,
      maxPeri : maxPeri,
      maxArea1 : maxArea1,
      maxArea2 : maxArea2,
      periOfMaxArea1 : periOfMaxArea1,
      periOfMaxArea2 : periOfMaxArea2,
      activityDesc : activityDesc,
      inputPerimeterA : inputPerimeterA,
      inputAreaA : inputAreaA,
      hintanswers : hintanswers
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      t : t,
      dt : dt,
      pi : pi,
      font : font,
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
      n2 : n2,
      x : x,
      y : y,
      x2 : x2,
      y2 : y2,
      x3 : x3,
      y3 : y3,
      x4 : x4,
      y4 : y4,
      elementinteracted : elementinteracted,
      elementinteracted2 : elementinteracted2,
      elementinteracted3 : elementinteracted3,
      elementinteracted4 : elementinteracted4,
      coloroff : coloroff,
      coloron : coloron,
      colorhighlight : colorhighlight,
      linecolor : linecolor,
      linecolor2 : linecolor2,
      linecolor3 : linecolor3,
      linecolor4 : linecolor4,
      selectedwidth : selectedwidth,
      selectedwidtho : selectedwidtho,
      linehighlightwidth : linehighlightwidth,
      linewidth : linewidth,
      linewidth2 : linewidth2,
      linewidth3 : linewidth3,
      linewidth4 : linewidth4,
      xcell : xcell,
      cellImageUrl : cellImageUrl,
      cellUnicodeUrl : cellUnicodeUrl,
      ycell : ycell,
      cellsizex : cellsizex,
      cellsizey : cellsizey,
      text : text,
      text2 : text2,
      textanswer : textanswer,
      noOfNodes : noOfNodes,
      noOfRow : noOfRow,
      noOfCol : noOfCol,
      noOfCell : noOfCell,
      lineToNode1 : lineToNode1,
      lineToNode2 : lineToNode2,
      nodeToLine1 : nodeToLine1,
      nodeToLine2 : nodeToLine2,
      lineGrid1 : lineGrid1,
      lineGrid2 : lineGrid2,
      lineGrid3 : lineGrid3,
      lineGrid4 : lineGrid4,
      adjMat : adjMat,
      maxPeri : maxPeri,
      maxArea1 : maxArea1,
      maxArea2 : maxArea2,
      periOfMaxArea1 : periOfMaxArea1,
      periOfMaxArea2 : periOfMaxArea2,
      activityDesc : activityDesc,
      inputPerimeterA : inputPerimeterA,
      inputAreaA : inputAreaA,
      hintanswers : hintanswers
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
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
    if(typeof json.n2 != "undefined") n2 = json.n2;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.y2 != "undefined") y2 = json.y2;
    if(typeof json.x3 != "undefined") x3 = json.x3;
    if(typeof json.y3 != "undefined") y3 = json.y3;
    if(typeof json.x4 != "undefined") x4 = json.x4;
    if(typeof json.y4 != "undefined") y4 = json.y4;
    if(typeof json.elementinteracted != "undefined") elementinteracted = json.elementinteracted;
    if(typeof json.elementinteracted2 != "undefined") elementinteracted2 = json.elementinteracted2;
    if(typeof json.elementinteracted3 != "undefined") elementinteracted3 = json.elementinteracted3;
    if(typeof json.elementinteracted4 != "undefined") elementinteracted4 = json.elementinteracted4;
    if(typeof json.coloroff != "undefined") coloroff = json.coloroff;
    if(typeof json.coloron != "undefined") coloron = json.coloron;
    if(typeof json.colorhighlight != "undefined") colorhighlight = json.colorhighlight;
    if(typeof json.linecolor != "undefined") linecolor = json.linecolor;
    if(typeof json.linecolor2 != "undefined") linecolor2 = json.linecolor2;
    if(typeof json.linecolor3 != "undefined") linecolor3 = json.linecolor3;
    if(typeof json.linecolor4 != "undefined") linecolor4 = json.linecolor4;
    if(typeof json.selectedwidth != "undefined") selectedwidth = json.selectedwidth;
    if(typeof json.selectedwidtho != "undefined") selectedwidtho = json.selectedwidtho;
    if(typeof json.linehighlightwidth != "undefined") linehighlightwidth = json.linehighlightwidth;
    if(typeof json.linewidth != "undefined") linewidth = json.linewidth;
    if(typeof json.linewidth2 != "undefined") linewidth2 = json.linewidth2;
    if(typeof json.linewidth3 != "undefined") linewidth3 = json.linewidth3;
    if(typeof json.linewidth4 != "undefined") linewidth4 = json.linewidth4;
    if(typeof json.xcell != "undefined") xcell = json.xcell;
    if(typeof json.cellImageUrl != "undefined") cellImageUrl = json.cellImageUrl;
    if(typeof json.cellUnicodeUrl != "undefined") cellUnicodeUrl = json.cellUnicodeUrl;
    if(typeof json.ycell != "undefined") ycell = json.ycell;
    if(typeof json.cellsizex != "undefined") cellsizex = json.cellsizex;
    if(typeof json.cellsizey != "undefined") cellsizey = json.cellsizey;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.text2 != "undefined") text2 = json.text2;
    if(typeof json.textanswer != "undefined") textanswer = json.textanswer;
    if(typeof json.noOfNodes != "undefined") noOfNodes = json.noOfNodes;
    if(typeof json.noOfRow != "undefined") noOfRow = json.noOfRow;
    if(typeof json.noOfCol != "undefined") noOfCol = json.noOfCol;
    if(typeof json.noOfCell != "undefined") noOfCell = json.noOfCell;
    if(typeof json.lineToNode1 != "undefined") lineToNode1 = json.lineToNode1;
    if(typeof json.lineToNode2 != "undefined") lineToNode2 = json.lineToNode2;
    if(typeof json.nodeToLine1 != "undefined") nodeToLine1 = json.nodeToLine1;
    if(typeof json.nodeToLine2 != "undefined") nodeToLine2 = json.nodeToLine2;
    if(typeof json.lineGrid1 != "undefined") lineGrid1 = json.lineGrid1;
    if(typeof json.lineGrid2 != "undefined") lineGrid2 = json.lineGrid2;
    if(typeof json.lineGrid3 != "undefined") lineGrid3 = json.lineGrid3;
    if(typeof json.lineGrid4 != "undefined") lineGrid4 = json.lineGrid4;
    if(typeof json.adjMat != "undefined") adjMat = json.adjMat;
    if(typeof json.maxPeri != "undefined") maxPeri = json.maxPeri;
    if(typeof json.maxArea1 != "undefined") maxArea1 = json.maxArea1;
    if(typeof json.maxArea2 != "undefined") maxArea2 = json.maxArea2;
    if(typeof json.periOfMaxArea1 != "undefined") periOfMaxArea1 = json.periOfMaxArea1;
    if(typeof json.periOfMaxArea2 != "undefined") periOfMaxArea2 = json.periOfMaxArea2;
    if(typeof json.activityDesc != "undefined") activityDesc = json.activityDesc;
    if(typeof json.inputPerimeterA != "undefined") inputPerimeterA = json.inputPerimeterA;
    if(typeof json.inputAreaA != "undefined") inputAreaA = json.inputAreaA;
    if(typeof json.hintanswers != "undefined") hintanswers = json.hintanswers;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.font != "undefined") font = json.font;
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
    if(typeof json.n2 != "undefined") n2 = json.n2;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.y2 != "undefined") y2 = json.y2;
    if(typeof json.x3 != "undefined") x3 = json.x3;
    if(typeof json.y3 != "undefined") y3 = json.y3;
    if(typeof json.x4 != "undefined") x4 = json.x4;
    if(typeof json.y4 != "undefined") y4 = json.y4;
    if(typeof json.elementinteracted != "undefined") elementinteracted = json.elementinteracted;
    if(typeof json.elementinteracted2 != "undefined") elementinteracted2 = json.elementinteracted2;
    if(typeof json.elementinteracted3 != "undefined") elementinteracted3 = json.elementinteracted3;
    if(typeof json.elementinteracted4 != "undefined") elementinteracted4 = json.elementinteracted4;
    if(typeof json.coloroff != "undefined") coloroff = json.coloroff;
    if(typeof json.coloron != "undefined") coloron = json.coloron;
    if(typeof json.colorhighlight != "undefined") colorhighlight = json.colorhighlight;
    if(typeof json.linecolor != "undefined") linecolor = json.linecolor;
    if(typeof json.linecolor2 != "undefined") linecolor2 = json.linecolor2;
    if(typeof json.linecolor3 != "undefined") linecolor3 = json.linecolor3;
    if(typeof json.linecolor4 != "undefined") linecolor4 = json.linecolor4;
    if(typeof json.selectedwidth != "undefined") selectedwidth = json.selectedwidth;
    if(typeof json.selectedwidtho != "undefined") selectedwidtho = json.selectedwidtho;
    if(typeof json.linehighlightwidth != "undefined") linehighlightwidth = json.linehighlightwidth;
    if(typeof json.linewidth != "undefined") linewidth = json.linewidth;
    if(typeof json.linewidth2 != "undefined") linewidth2 = json.linewidth2;
    if(typeof json.linewidth3 != "undefined") linewidth3 = json.linewidth3;
    if(typeof json.linewidth4 != "undefined") linewidth4 = json.linewidth4;
    if(typeof json.xcell != "undefined") xcell = json.xcell;
    if(typeof json.cellImageUrl != "undefined") cellImageUrl = json.cellImageUrl;
    if(typeof json.cellUnicodeUrl != "undefined") cellUnicodeUrl = json.cellUnicodeUrl;
    if(typeof json.ycell != "undefined") ycell = json.ycell;
    if(typeof json.cellsizex != "undefined") cellsizex = json.cellsizex;
    if(typeof json.cellsizey != "undefined") cellsizey = json.cellsizey;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.text2 != "undefined") text2 = json.text2;
    if(typeof json.textanswer != "undefined") textanswer = json.textanswer;
    if(typeof json.noOfNodes != "undefined") noOfNodes = json.noOfNodes;
    if(typeof json.noOfRow != "undefined") noOfRow = json.noOfRow;
    if(typeof json.noOfCol != "undefined") noOfCol = json.noOfCol;
    if(typeof json.noOfCell != "undefined") noOfCell = json.noOfCell;
    if(typeof json.lineToNode1 != "undefined") lineToNode1 = json.lineToNode1;
    if(typeof json.lineToNode2 != "undefined") lineToNode2 = json.lineToNode2;
    if(typeof json.nodeToLine1 != "undefined") nodeToLine1 = json.nodeToLine1;
    if(typeof json.nodeToLine2 != "undefined") nodeToLine2 = json.nodeToLine2;
    if(typeof json.lineGrid1 != "undefined") lineGrid1 = json.lineGrid1;
    if(typeof json.lineGrid2 != "undefined") lineGrid2 = json.lineGrid2;
    if(typeof json.lineGrid3 != "undefined") lineGrid3 = json.lineGrid3;
    if(typeof json.lineGrid4 != "undefined") lineGrid4 = json.lineGrid4;
    if(typeof json.adjMat != "undefined") adjMat = json.adjMat;
    if(typeof json.maxPeri != "undefined") maxPeri = json.maxPeri;
    if(typeof json.maxArea1 != "undefined") maxArea1 = json.maxArea1;
    if(typeof json.maxArea2 != "undefined") maxArea2 = json.maxArea2;
    if(typeof json.periOfMaxArea1 != "undefined") periOfMaxArea1 = json.periOfMaxArea1;
    if(typeof json.periOfMaxArea2 != "undefined") periOfMaxArea2 = json.periOfMaxArea2;
    if(typeof json.activityDesc != "undefined") activityDesc = json.activityDesc;
    if(typeof json.inputPerimeterA != "undefined") inputPerimeterA = json.inputPerimeterA;
    if(typeof json.inputAreaA != "undefined") inputAreaA = json.inputAreaA;
    if(typeof json.hintanswers != "undefined") hintanswers = json.hintanswers;
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
    __pagesEnabled["activity 1"] = true;
    __pagesEnabled["Message"] = true;
    __pagesEnabled["Evol Page"] = false;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    font = "normal normal 2vw "; // EjsS Model.Variables.Var Table.font
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
    n = 6*5; // EjsS Model.Variables.cells.n
    n2 = 7*5; // EjsS Model.Variables.cells.n2
    x = new Array(n); // EjsS Model.Variables.cells.x
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.x
        x[_i0] = 0;  // EjsS Model.Variables.cells.x
      }
    }());
    y = new Array(n); // EjsS Model.Variables.cells.y
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.y
        y[_i0] = 0;  // EjsS Model.Variables.cells.y
      }
    }());
    x2 = new Array(n); // EjsS Model.Variables.cells.x2
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.x2
        x2[_i0] = 0;  // EjsS Model.Variables.cells.x2
      }
    }());
    y2 = new Array(n); // EjsS Model.Variables.cells.y2
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.y2
        y2[_i0] = 0;  // EjsS Model.Variables.cells.y2
      }
    }());
    x3 = new Array(n); // EjsS Model.Variables.cells.x3
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.x3
        x3[_i0] = 0;  // EjsS Model.Variables.cells.x3
      }
    }());
    y3 = new Array(n); // EjsS Model.Variables.cells.y3
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.y3
        y3[_i0] = 0;  // EjsS Model.Variables.cells.y3
      }
    }());
    x4 = new Array(n); // EjsS Model.Variables.cells.x4
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.x4
        x4[_i0] = 0;  // EjsS Model.Variables.cells.x4
      }
    }());
    y4 = new Array(n); // EjsS Model.Variables.cells.y4
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.y4
        y4[_i0] = 0;  // EjsS Model.Variables.cells.y4
      }
    }());
    elementinteracted = -1; // EjsS Model.Variables.cells.elementinteracted
    elementinteracted2 = -1; // EjsS Model.Variables.cells.elementinteracted2
    elementinteracted3 = -1; // EjsS Model.Variables.cells.elementinteracted3
    elementinteracted4 = -1; // EjsS Model.Variables.cells.elementinteracted4
    coloroff = "grey"; // EjsS Model.Variables.cells.coloroff
    coloron = "red"; // EjsS Model.Variables.cells.coloron
    colorhighlight = "green"; // EjsS Model.Variables.cells.colorhighlight
    linecolor = new Array(n); // EjsS Model.Variables.cells.linecolor
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linecolor
        linecolor[_i0] = coloroff;  // EjsS Model.Variables.cells.linecolor
      }
    }());
    linecolor2 = new Array(n); // EjsS Model.Variables.cells.linecolor2
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linecolor2
        linecolor2[_i0] = coloroff;  // EjsS Model.Variables.cells.linecolor2
      }
    }());
    linecolor3 = new Array(n); // EjsS Model.Variables.cells.linecolor3
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linecolor3
        linecolor3[_i0] = coloroff;  // EjsS Model.Variables.cells.linecolor3
      }
    }());
    linecolor4 = new Array(n); // EjsS Model.Variables.cells.linecolor4
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linecolor4
        linecolor4[_i0] = coloroff;  // EjsS Model.Variables.cells.linecolor4
      }
    }());
    selectedwidth = 5; // EjsS Model.Variables.cells.selectedwidth
    selectedwidtho = 3; // EjsS Model.Variables.cells.selectedwidtho
    linehighlightwidth = 8; // EjsS Model.Variables.cells.linehighlightwidth
    linewidth = new Array(n); // EjsS Model.Variables.cells.linewidth
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linewidth
        linewidth[_i0] = selectedwidtho;  // EjsS Model.Variables.cells.linewidth
      }
    }());
    linewidth2 = new Array(n); // EjsS Model.Variables.cells.linewidth2
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linewidth2
        linewidth2[_i0] = selectedwidtho;  // EjsS Model.Variables.cells.linewidth2
      }
    }());
    linewidth3 = new Array(n); // EjsS Model.Variables.cells.linewidth3
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linewidth3
        linewidth3[_i0] = selectedwidtho;  // EjsS Model.Variables.cells.linewidth3
      }
    }());
    linewidth4 = new Array(n); // EjsS Model.Variables.cells.linewidth4
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cells.linewidth4
        linewidth4[_i0] = selectedwidtho;  // EjsS Model.Variables.cells.linewidth4
      }
    }());
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
    text = ["dc","dc","dc","dc","dc","ac","ac","ac","ac","ac","acdc"]; // EjsS Model.Variables.cells.text
    text2 = ["dc","dc","dc","dc","dc","ac","ac","ac","ac","ac","acdc"]; // EjsS Model.Variables.cells.text2
    textanswer = ["dc","dc","dc","dc","dc","ac","ac","ac","ac","ac","acdc"]; // EjsS Model.Variables.cells.textanswer
    noOfNodes = 36; // EjsS Model.Variables.cells.noOfNodes
    noOfRow = 5; // EjsS Model.Variables.cells.noOfRow
    noOfCol = 5; // EjsS Model.Variables.cells.noOfCol
    noOfCell = noOfRow * noOfCol; // EjsS Model.Variables.cells.noOfCell
    lineToNode1 = [-1]; // EjsS Model.Variables.cells.lineToNode1
    lineToNode2 = [-1]; // EjsS Model.Variables.cells.lineToNode2
    nodeToLine1 = [-1]; // EjsS Model.Variables.cells.nodeToLine1
    nodeToLine2 = [-1]; // EjsS Model.Variables.cells.nodeToLine2
    lineGrid1 = [0]; // EjsS Model.Variables.cells.lineGrid1
    lineGrid2 = [0]; // EjsS Model.Variables.cells.lineGrid2
    lineGrid3 = [0]; // EjsS Model.Variables.cells.lineGrid3
    lineGrid4 = [0]; // EjsS Model.Variables.cells.lineGrid4
    adjMat = [0]; // EjsS Model.Variables.cells.adjMat
    maxPeri = 0; // EjsS Model.Variables.cells.maxPeri
    maxArea1 = 0; // EjsS Model.Variables.cells.maxArea1
    maxArea2 = 0; // EjsS Model.Variables.cells.maxArea2
    periOfMaxArea1 = 0; // EjsS Model.Variables.cells.periOfMaxArea1
    periOfMaxArea2 = 0; // EjsS Model.Variables.cells.periOfMaxArea2
    activityDesc = "Make two figures with different perimeters and different areas."; // EjsS Model.Variables.cells.activityDesc
  });

  _model.addToReset(function() {
    inputPerimeterA = 0; // EjsS Model.Variables.inputsanswers.inputPerimeterA
    inputAreaA = 0; // EjsS Model.Variables.inputsanswers.inputAreaA
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

  // code to be copied to EJSS source code under Custom and used in drawingPanel3D and plottingPanel2D  // > CustomCode.changeOrientation:1
  // address the problem is height difference is iOS app , epub, and Firefox  // > CustomCode.changeOrientation:2
  // user need to change only k and kepub  // > CustomCode.changeOrientation:3
  // copy %changeOrientation()% into the Height Field of drawingPanel3D and plottingPanel2D  // > CustomCode.changeOrientation:4
  function changeOrientation() {  // > CustomCode.changeOrientation:5
     // > CustomCode.changeOrientation:6
  var k =0.75 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeOrientation:7
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

  //https://www.codeproject.com/Articles/13467/A-JavaScript-Implementation-of-the-Surveyor-s-Form  // > CustomCode.perimeter:1
  /*  // > CustomCode.perimeter:2
  PLEASE NOTE: These functions calculate the shape with the maximum perimeter;   // > CustomCode.perimeter:3
  for the algorithm that calculates the perimeter of the shape with the maximum area,   // > CustomCode.perimeter:4
  please see the 'area' tab  // > CustomCode.perimeter:5
  */  // > CustomCode.perimeter:6
  // dist records if a node has been used in the current recursion cycle, as well as distance from origin  // > CustomCode.perimeter:7
  // visited records if a node has been used in a previous recursion cycle  // > CustomCode.perimeter:8
  var dist = [], visited = [];  // > CustomCode.perimeter:9
  // path records the current path we're on  // > CustomCode.perimeter:10
  var path = [], maxPath = [];  // > CustomCode.perimeter:11
  var peri = [];  // > CustomCode.perimeter:12
  //Depth First Search (DFS)  // > CustomCode.perimeter:13
  function dfs(curnode, prevnode, curdist){ // current node/point, previous node, current distance  // > CustomCode.perimeter:14
    dist[curnode] = curdist; //initialize  // > CustomCode.perimeter:15
    path.push(curnode);  // > CustomCode.perimeter:16
    visited[curnode] = 1;  // > CustomCode.perimeter:17
      // > CustomCode.perimeter:18
    for(var i = 0; i < noOfNodes; i++){  // > CustomCode.perimeter:19
      if(!adjMat[curnode][i]) // how do you visualise adjMat? console.log?  // > CustomCode.perimeter:20
        continue;  // > CustomCode.perimeter:21
          // > CustomCode.perimeter:22
      // loop detection  // > CustomCode.perimeter:23
      if(dist[i] != -1 && i != prevnode){  // > CustomCode.perimeter:24
          var l = (dist[curnode] + 1) - dist[i];  // > CustomCode.perimeter:25
          // storing all the perimeters in an array  // > CustomCode.perimeter:26
          peri.push(l);  // > CustomCode.perimeter:27
          // recording the maximum possible perimeter  // > CustomCode.perimeter:28
          if(l > maxPeri){        // > CustomCode.perimeter:29
            maxPeri = l;  // > CustomCode.perimeter:30
            // recording the actual path  // > CustomCode.perimeter:31
            maxPath = [];  // > CustomCode.perimeter:32
            for(var k = path.length - 1; k >= 0; k--){  // > CustomCode.perimeter:33
               maxPath.push(path[k]);  // > CustomCode.perimeter:34
               if(path[k] == i) break;  // > CustomCode.perimeter:35
           }     // > CustomCode.perimeter:36
         }  // > CustomCode.perimeter:37
       }  // > CustomCode.perimeter:38
         // > CustomCode.perimeter:39
       else if(dist[i] == -1)  // > CustomCode.perimeter:40
         // recursion  // > CustomCode.perimeter:41
         dfs(i, curnode, curdist + 1); //curnode, prevnode, curdist  // > CustomCode.perimeter:42
    }  // > CustomCode.perimeter:43
      // > CustomCode.perimeter:44
    path.pop();  // > CustomCode.perimeter:45
    dist[curnode] = -1;  // > CustomCode.perimeter:46
  }  // > CustomCode.perimeter:47
  function perimeter () {  // > CustomCode.perimeter:48
    peri = [];  // > CustomCode.perimeter:49
    maxPath = [];  // > CustomCode.perimeter:50
    maxPeri = 0;  // > CustomCode.perimeter:51
      // > CustomCode.perimeter:52
    // reseting the array  // > CustomCode.perimeter:53
    for(var i = 0; i < noOfNodes; i++){  // > CustomCode.perimeter:54
      visited[i] = 0;  // > CustomCode.perimeter:55
      dist[i] = -1;  // > CustomCode.perimeter:56
    }  // > CustomCode.perimeter:57
      // > CustomCode.perimeter:58
    // running the dfs  // > CustomCode.perimeter:59
    for(var i = 0; i < noOfNodes; i++){  // > CustomCode.perimeter:60
      if(!visited[i])  // > CustomCode.perimeter:61
        dfs(i, -1, 0); //curnode, prevnode, curdist  // > CustomCode.perimeter:62
    }  // > CustomCode.perimeter:63
    // setting the color of the perimeter  // > CustomCode.perimeter:64
    // first we reset the colors  // > CustomCode.perimeter:65
    for(var i = 0; i < linecolor.length; i++){  // > CustomCode.perimeter:66
      if(linecolor[i] != coloroff)  // > CustomCode.perimeter:67
        linecolor[i] = coloron;  // > CustomCode.perimeter:68
      if(linecolor2[i] != coloroff)  // > CustomCode.perimeter:69
        linecolor2[i] = coloron;  // > CustomCode.perimeter:70
    }  // > CustomCode.perimeter:71
    // then we set the color of the largest perimeter to green  // > CustomCode.perimeter:72
    for(var i = 0; i < maxPath.length; i++){  // > CustomCode.perimeter:73
      var node1 = maxPath[i], node2 = i == maxPath.length - 1 ? maxPath[0] : maxPath[i + 1];  // > CustomCode.perimeter:74
      if(nodeToLine1[node1][node2] != -1)  {  // > CustomCode.perimeter:75
        linecolor[nodeToLine1[node1][node2]] = colorhighlight;  // > CustomCode.perimeter:76
       // linewidth[nodeToLine1[node1][node2]] = 18;  // > CustomCode.perimeter:77
        }  // > CustomCode.perimeter:78
      else{  // > CustomCode.perimeter:79
        linecolor2[nodeToLine2[node1][node2]] = colorhighlight;  // > CustomCode.perimeter:80
      //  linewidth2[nodeToLine2[node1][node2]] = 18;  // > CustomCode.perimeter:81
        }  // > CustomCode.perimeter:82
    }  // > CustomCode.perimeter:83
    return;  // > CustomCode.perimeter:84
  }  // > CustomCode.perimeter:85

  // down, right, left, up  // > CustomCode.area:1
  var dy = [-1, 0, 0, 1];  // > CustomCode.area:2
  var dx = [0, 1, -1, 0];  // > CustomCode.area:3
  var ly = [0, 0, 0, 1];  // > CustomCode.area:4
  var lx = [0, 1, 0, 0];  // > CustomCode.area:5
  var isEnclosed = [], isFilled = [];  // > CustomCode.area:6
  var curLineGrid1 = [], curLineGrid2 = [], curMaxArea = 0, curPeri = 0;  // > CustomCode.area:7
  var curLineColor1 = [], curLineColor2 = [], curLineWidth1 = [], curLineWidth2 = [];  // > CustomCode.area:8
  // function to check whether a cell is enclosed by a box  // > CustomCode.area:9
  function checkEnclosed(row, col){  // > CustomCode.area:10
    isEnclosed[row][col] = 0;  // > CustomCode.area:11
    for(var i = 0; i < 4; i++){  // > CustomCode.area:12
      var curcol = col + dx[i];  // > CustomCode.area:13
      var currow = row + dy[i];  // > CustomCode.area:14
      // out of bounds or already visited  // > CustomCode.area:15
      if(curcol < 0 || curcol >= noOfCol + 2 || currow < 0 || currow >= noOfRow + 2   // > CustomCode.area:16
      || !isEnclosed[currow][curcol])  // > CustomCode.area:17
        continue;  // > CustomCode.area:18
              // > CustomCode.area:19
      // finding the coordinates of the adjacent grid line  // > CustomCode.area:20
      var lrow = row + ly[i], lcol = col + lx[i];  // > CustomCode.area:21
      // down or up  // > CustomCode.area:22
      if((i == 0 || i == 3) && curLineGrid1[lrow][lcol])  // > CustomCode.area:23
        continue;  // > CustomCode.area:24
      // left or right  // > CustomCode.area:25
      else if((i == 1 || i == 2) && curLineGrid2[lrow][lcol])  // > CustomCode.area:26
        continue;  // > CustomCode.area:27
      else{  // > CustomCode.area:28
        checkEnclosed(currow, curcol);  // > CustomCode.area:29
      }  // > CustomCode.area:30
    }  // > CustomCode.area:31
  }  // > CustomCode.area:32
  var curArea = 0;  // > CustomCode.area:33
  var areaIdx, maxAreaIdx;  // > CustomCode.area:34
  function floodFill(row, col){  // > CustomCode.area:35
    isFilled[row][col] = areaIdx;  // > CustomCode.area:36
    curArea++;  // > CustomCode.area:37
    for(var i = 0; i < 4; i++){  // > CustomCode.area:38
      var currow = row + dy[i], curcol = col + dx[i];  // > CustomCode.area:39
      // check for out of bounds  // > CustomCode.area:40
      if(currow <= 0 || currow >= noOfRow + 1 || curcol <= 0 || curcol >= noOfCol + 1   // > CustomCode.area:41
      || isFilled[currow][curcol] || !isEnclosed[currow][curcol])  // > CustomCode.area:42
        continue;  // > CustomCode.area:43
          // > CustomCode.area:44
      floodFill(currow, curcol);   // > CustomCode.area:45
    }  // > CustomCode.area:46
  }  // > CustomCode.area:47
  function area (figure) {  // > CustomCode.area:48
    // switching arrays depending on the figure  // > CustomCode.area:49
    if(figure == 0){  // > CustomCode.area:50
      curLineGrid1 = lineGrid1; curLineGrid2 = lineGrid2;  // > CustomCode.area:51
      curLineColor1 = linecolor; curLineColor2 = linecolor2;  // > CustomCode.area:52
      curLineWidth1 = linewidth; curLineWidth2 = linewidth2;  // > CustomCode.area:53
    }  // > CustomCode.area:54
    else if(figure == 1){    // > CustomCode.area:55
      curLineGrid1 = lineGrid3; curLineGrid2 = lineGrid4;  // > CustomCode.area:56
      curLineColor1 = linecolor3; curLineColor2 = linecolor4;  // > CustomCode.area:57
      curLineWidth1 = linewidth3; curLineWidth2 = linewidth4;  // > CustomCode.area:58
    }  // > CustomCode.area:59
      // > CustomCode.area:60
    // initialising maxArea, maxAreaIdx, areaIdx  // > CustomCode.area:61
    curMaxArea = 0; curPeri = 0;  // > CustomCode.area:62
    maxAreaIdx = -1; areaIdx = 1;  // > CustomCode.area:63
    // initialising isEnclosed and isFilled area  // > CustomCode.area:64
    for(var i = 0; i < noOfRow + 2; i++){  // > CustomCode.area:65
      isEnclosed[i] = [];  // > CustomCode.area:66
      isFilled[i] = [];  // > CustomCode.area:67
      for(var k = 0; k < noOfCol + 2; k++){  // > CustomCode.area:68
          isEnclosed[i][k] = 1;  // > CustomCode.area:69
          isFilled[i][k] = 0;  // > CustomCode.area:70
      }  // > CustomCode.area:71
    }  // > CustomCode.area:72
    checkEnclosed(0, 0);  // > CustomCode.area:73
    for(var i = 1; i <= noOfRow; i++){  // > CustomCode.area:74
      for(var k = 1; k <= noOfCol; k++){  // > CustomCode.area:75
        if(!isEnclosed[i][k] || isFilled[i][k])  // > CustomCode.area:76
          continue;  // > CustomCode.area:77
        curArea = 0;  // > CustomCode.area:78
        areaIdx++;  // > CustomCode.area:79
        floodFill(i, k);  // > CustomCode.area:80
          // > CustomCode.area:81
        if(curArea > curMaxArea){  // > CustomCode.area:82
          curMaxArea = curArea;  // > CustomCode.area:83
          maxAreaIdx = areaIdx;  // > CustomCode.area:84
        }  // > CustomCode.area:85
      }  // > CustomCode.area:86
    }  // > CustomCode.area:87
        // > CustomCode.area:88
    // calculating the perimeter of the shape with the largest area  // > CustomCode.area:89
    // reseting the colors first  // > CustomCode.area:90
    for(var i = 0; i < curLineColor1.length; i++){  // > CustomCode.area:91
      if(curLineColor1[i] != coloroff){  // > CustomCode.area:92
        curLineColor1[i] = coloron;  // > CustomCode.area:93
        curLineWidth1[i] = selectedwidth;  // > CustomCode.area:94
      }  // > CustomCode.area:95
      if(curLineColor2[i] != coloroff){  // > CustomCode.area:96
        curLineColor2[i] = coloron;  // > CustomCode.area:97
        curLineWidth2[i] = selectedwidth;  // > CustomCode.area:98
      }  // > CustomCode.area:99
    }  // > CustomCode.area:100
    // how it works: if a line is adjacent to a filled square as well as a non-filled square, highlight it  // > CustomCode.area:101
      // > CustomCode.area:102
    // highlight horizontal lines  // > CustomCode.area:103
    for(var i = 1; i <= noOfRow + 1; i++){  // > CustomCode.area:104
      for(var k = 1; k <= noOfCol; k++){  // > CustomCode.area:105
        var element = (i - 1) * noOfCol + (k - 1);  // > CustomCode.area:106
        if(isFilled[i][k] == maxAreaIdx && !isFilled[i-1][k]  // > CustomCode.area:107
        || !isFilled[i][k] && isFilled[i-1][k] == maxAreaIdx){  // > CustomCode.area:108
          curLineColor1[element] = colorhighlight;  // > CustomCode.area:109
          curLineWidth1[element] = linehighlightwidth; //addded by lookang to make thicker border  // > CustomCode.area:110
          curPeri++;  // > CustomCode.area:111
        }  // > CustomCode.area:112
      }  // > CustomCode.area:113
    }  // > CustomCode.area:114
    // highlight vertical lines  // > CustomCode.area:115
    for(var i = 1; i <= noOfRow; i++){  // > CustomCode.area:116
      for(var k = 1; k <= noOfCol + 1; k++){  // > CustomCode.area:117
        var element = (i - 1) * (noOfCol + 1) + (k - 1);  // > CustomCode.area:118
        if(isFilled[i][k] == maxAreaIdx && !isFilled[i][k-1]  // > CustomCode.area:119
        || !isFilled[i][k] && isFilled[i][k-1] == maxAreaIdx){  // > CustomCode.area:120
          curLineColor2[element] = colorhighlight;  // > CustomCode.area:121
          curLineWidth2[element] = linehighlightwidth; //addded by lookang to make thicker border  // > CustomCode.area:122
          curPeri++;  // > CustomCode.area:123
        }  // > CustomCode.area:124
      }  // > CustomCode.area:125
    }  // > CustomCode.area:126
    // link back by figure  // > CustomCode.area:127
    if(figure == 0){  // > CustomCode.area:128
      linecolor = curLineColor1; linecolor2 = curLineColor2;  // > CustomCode.area:129
      linewidth = curLineWidth1; linewidth2 = curLineWidth2;    // > CustomCode.area:130
      maxArea1 = curMaxArea;  // > CustomCode.area:131
      periOfMaxArea1 = curPeri;  // > CustomCode.area:132
    }  // > CustomCode.area:133
    else if(figure == 1){    // > CustomCode.area:134
      linecolor3 = curLineColor1; linecolor4 = curLineColor2;  // > CustomCode.area:135
      linewidth3 = curLineWidth1; linewidth4 = curLineWidth2;  // > CustomCode.area:136
      maxArea2 = curMaxArea;  // > CustomCode.area:137
      periOfMaxArea2 = curPeri;  // > CustomCode.area:138
    }  // > CustomCode.area:139
    return;  // > CustomCode.area:140
  }  // > CustomCode.area:141

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    // initialising the adjacency matrix  // > Initialization.Init Page:1
    /*  // > Initialization.Init Page:2
    for(var i = 0; i < noOfNodes; i++){  // > Initialization.Init Page:3
      adjMat[i] = [];  // > Initialization.Init Page:4
      nodeToLine1[i] = []; nodeToLine2[i] = [];  // > Initialization.Init Page:5
      for(var k = 0; k < noOfNodes; k++){  // > Initialization.Init Page:6
        adjMat[i][k] = 0;  // > Initialization.Init Page:7
        nodeToLine1[i][k] = -1; nodeToLine2[i][k] = -1;  // > Initialization.Init Page:8
      }  // > Initialization.Init Page:9
    }  // > Initialization.Init Page:10
    */  // > Initialization.Init Page:11
    // initialising lineGrid (the additional 5 is a buffer)  // > Initialization.Init Page:12
    // lineGrid1 is the horizontal lines; lineGrid 2 is the vertical lines  // > Initialization.Init Page:13
    for(var i = 0; i < noOfRow + 5; i++){  // > Initialization.Init Page:14
      lineGrid1[i] = [];  // > Initialization.Init Page:15
      lineGrid2[i] = [];  // > Initialization.Init Page:16
      lineGrid3[i] = [];  // > Initialization.Init Page:17
      lineGrid4[i] = [];  // > Initialization.Init Page:18
      for(var k = 0; k < noOfCol + 5; k++){  // > Initialization.Init Page:19
        lineGrid1[i][k] = 0;  // > Initialization.Init Page:20
        lineGrid2[i][k] = 0;  // > Initialization.Init Page:21
        lineGrid3[i][k] = 0;  // > Initialization.Init Page:22
        lineGrid4[i][k] = 0;  // > Initialization.Init Page:23
      }  // > Initialization.Init Page:24
    }  // > Initialization.Init Page:25
       // > Initialization.Init Page:26
     //horizontal  // > Initialization.Init Page:27
    var length = 10;  // > Initialization.Init Page:28
    var startx = 0;  // > Initialization.Init Page:29
    var lengthy = 5;  // > Initialization.Init Page:30
    var starty = 0;  // > Initialization.Init Page:31
    var numberofdotsperline = 5;  // > Initialization.Init Page:32
    var numberofrows = 5;  // > Initialization.Init Page:33
    var nodeBuffer = 0;  // > Initialization.Init Page:34
    for (var i=0; i<=n ; i++) { // line y=3.5  // > Initialization.Init Page:35
        x[i] = startx+ i%(numberofdotsperline);    // > Initialization.Init Page:36
       y[i] = starty+parseInt(i/(numberofrows)); // divide by 5 to get 4 rows  // > Initialization.Init Page:37
      text[i]= i;  // > Initialization.Init Page:38
      //textby[i] = i; // for the draggable  // > Initialization.Init Page:39
      /*  // > Initialization.Init Page:40
      // setting lineToNode1  // > Initialization.Init Page:41
      var curnode = i + nodeBuffer;  // > Initialization.Init Page:42
      lineToNode1[i] = [curnode, curnode + 1];  // > Initialization.Init Page:43
      // setting nodeToLine1  // > Initialization.Init Page:44
      if(curnode + 1 < noOfNodes){  // > Initialization.Init Page:45
        nodeToLine1[curnode][curnode + 1] = i;   // > Initialization.Init Page:46
        nodeToLine1[curnode + 1][curnode] = i;  // > Initialization.Init Page:47
      }  // > Initialization.Init Page:48
          // > Initialization.Init Page:49
      if((i + 1) % numberofdotsperline == 0)  // > Initialization.Init Page:50
        nodeBuffer++;  // > Initialization.Init Page:51
      */  // > Initialization.Init Page:52
    }  // > Initialization.Init Page:53
    //vertical  // > Initialization.Init Page:54
    var length = 10;  // > Initialization.Init Page:55
    var startx = 0;  // > Initialization.Init Page:56
    var lengthy = 5;  // > Initialization.Init Page:57
    var starty = 0;  // > Initialization.Init Page:58
    var numberofdotsperline = 6;  // > Initialization.Init Page:59
    var numberofrows = 6;  // > Initialization.Init Page:60
    for (var i=0; i<=n2  ; i++) { // line y=3.5  // > Initialization.Init Page:61
        x2[i] = startx+ i%(numberofdotsperline);  // > Initialization.Init Page:62
       y2[i] = starty+parseInt(i/(numberofrows)); // divide by 5 to get 4 rows  // > Initialization.Init Page:63
      text2[i]= 1;  // > Initialization.Init Page:64
      //textby[i] = i; // for the draggable  // > Initialization.Init Page:65
        // > Initialization.Init Page:66
      /*  // > Initialization.Init Page:67
      // setting lineToNode2  // > Initialization.Init Page:68
      lineToNode2[i] = [i, i + numberofdotsperline];  // > Initialization.Init Page:69
      // setting nodeToLine2  // > Initialization.Init Page:70
      if(i + numberofdotsperline < noOfNodes){  // > Initialization.Init Page:71
        nodeToLine2[i][i + numberofdotsperline] = i;   // > Initialization.Init Page:72
        nodeToLine2[i + numberofdotsperline][i] = i;  // > Initialization.Init Page:73
      }  // > Initialization.Init Page:74
      */  // > Initialization.Init Page:75
    }  // > Initialization.Init Page:76
    //horizontal2  // > Initialization.Init Page:77
    var length = 10;  // > Initialization.Init Page:78
    var startx = 6;  // > Initialization.Init Page:79
    var lengthy = 5;  // > Initialization.Init Page:80
    var starty = 0;  // > Initialization.Init Page:81
    var numberofdotsperline = 5;  // > Initialization.Init Page:82
    var numberofrows = 5;  // > Initialization.Init Page:83
    for (var i=0; i<=n  ; i++) { // line y=3.5  // > Initialization.Init Page:84
        x3[i] = startx+ i%(numberofdotsperline);  // > Initialization.Init Page:85
       y3[i] = starty+parseInt(i/(numberofrows)); // divide by 5 to get 4 rows  // > Initialization.Init Page:86
     // text[i]= i+1;  // > Initialization.Init Page:87
      //textby[i] = i; // for the draggable  // > Initialization.Init Page:88
    }  // > Initialization.Init Page:89
    //vertical2  // > Initialization.Init Page:90
    var length = 10;  // > Initialization.Init Page:91
    var startx = 6;  // > Initialization.Init Page:92
    var lengthy = 5;  // > Initialization.Init Page:93
    var starty = 0;  // > Initialization.Init Page:94
    var numberofdotsperline = 6;  // > Initialization.Init Page:95
    var numberofrows = 6;  // > Initialization.Init Page:96
    for (var i=0; i<=n2  ; i++) { // line y=3.5  // > Initialization.Init Page:97
        x4[i] = startx+ i%(numberofdotsperline);  // > Initialization.Init Page:98
       y4[i] = starty+parseInt(i/(numberofrows)); // divide by 5 to get 4 rows  // > Initialization.Init Page:99
    //  text2[i]= i+1;  // > Initialization.Init Page:100
      //textby[i] = i; // for the draggable  // > Initialization.Init Page:101
    }  // > Initialization.Init Page:102
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["activity 1"]) return;
    //if ( option=="Activity 1"){  // > Initialization.activity 1:1
      _tools.showOkDialog("Make two figures with different perimeters and different areas.");  // > Initialization.activity 1:2
     // }  // > Initialization.activity 1:3
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Message"]) return;
    if (_isMobile){  // > Initialization.Message:1
      //do nothing  // > Initialization.Message:2
      }  // > Initialization.Message:3
        // > Initialization.Message:4
      else{  // > Initialization.Message:5
        // copy this into the initialization  // > Initialization.Message:6
    // make the font bigger  // > Initialization.Message:7
    _view.plottingPanel.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.Message:8
    _view.plottingPanel.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.Message:9
    _view.plottingPanel.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.Message:10
    _view.plottingPanel.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.Message:11
        }  // > Initialization.Message:12
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
    //console.log(path); // trying to understand   // > FixedRelations.FixRel Page:1
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
        for (__i=0;__i<_xLength;__i++) {
          _aRate[__cRate++] = Array.isArray(1) ? 1[__i] : 1; // Rate for ODE: Evol Page:x
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
    _viewsInfo[_counter++] = { name : "HtmlView Page", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new perimeter_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.comboBox.linkProperty("Options",  function() { return ["Activity 1","Activity 2","Activity 3","Activity 4","Activity 5","Activity 6"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  //
  // to use
  var opts = _view.comboBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option=="Activity 1"){
    activityDesc = "Make two figures with different perimeters and different areas.";
    }
   //Make two different figures with the same area but have different perimeters.
  else if ( option=="Activity 2"){ // was 2
    activityDesc = "Make two different figures with the same area but have different perimeters.";
    }
    else if ( option=="Activity 3"){
      activityDesc = "Make two different figures with the same perimeter but have different areas.";
    }
     //Make two different figures with same perimeter and same area.
  else if ( option=="Activity 4"){ // was 2
    activityDesc = "Make two different figures with same perimeter and same area.";
    }
    else if ( option=="Activity 5"){
      activityDesc = "Make two different figures with perimeter 12 units but have different areas.";
    }
    else if ( option=="Activity 6"){
    activityDesc ="Make two different figures with area 6 square units but have different perimeters.";
    }
    else if ( option=="Activity 7"){
    activityDesc = "Make two different figures with the same perimeter but have different areas.";
    }
  _tools.showOkDialog(activityDesc);

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.check.setAction("OnPress", function(_data,_info) {
  // added code to check
  //inputPerimeterA against maxArea
  //inputAreaA against periOfMaxArea
  var option = _view.comboBox.getProperty("SelectedOptions");  // array of options
  if (option=="Activity 1"){
    
    //check both Per and Area correct
    //activityDesc = "Make two figures with different perimeters and different areas.";
    if ((periOfMaxArea1!=periOfMaxArea2)&&(maxArea1!=maxArea2)){
    _tools.showOkDialog("Correct!");
    }
    // only peri correct
     else if ((periOfMaxArea1!=periOfMaxArea2)&&(maxArea1==maxArea2)){
    _tools.showOkDialog("Partially Correct! Only the Perimeters of Figure A and B are different, try to make the areas different too!");
    }
    // only area correct and different
     else if ((periOfMaxArea1==periOfMaxArea2)&&(maxArea1!=maxArea2)){
    _tools.showOkDialog("Partially Correct! Only the Areas of Figure A and B are different, try to make the perimeters different too!");
    }
    
    else {
     _tools.showOkDialog("Incorrect! Both Perimeters and Areas for both Figure A and B are the same. Try again. "); 
      }
    
    }
  //activityDesc = "Make two different figures with the same area but have different perimeters.";
  //else if(option=="Activity 2" || option=="Activity 7"){
    else if(option=="Activity 2"){
    if(periOfMaxArea1 != periOfMaxArea2 && maxArea1 == maxArea2)
      _tools.showOkDialog("Correct!");
    else if(periOfMaxArea1 != periOfMaxArea2 && maxArea1 != maxArea2)
      _tools.showOkDialog("Partially Correct! Only their perimeter are different, try to make their Areas same.");
    else if(periOfMaxArea1 == periOfMaxArea2 && maxArea1 == maxArea2)
      _tools.showOkDialog("Partially Correct! Only their areas the same, try to make their Perimeters different.");
    else
      _tools.showOkDialog("Incorrect! Try again.");
  }
  //activityDesc = "Make two different figures with the same perimeter but have different areas.";
  else if(option=="Activity 3"){
    if(periOfMaxArea1 == periOfMaxArea2 && maxArea1 != maxArea2)
      _tools.showOkDialog("Correct!");
    else if(periOfMaxArea1 == periOfMaxArea2 && maxArea1 == maxArea2)
      _tools.showOkDialog("Partially correct! Their Perimeters are the same, try to make their Areas different.");
    else if(periOfMaxArea1 != periOfMaxArea2 && maxArea1 != maxArea2)
      _tools.showOkDialog("Partially correct! Their Areas are different, try to make their Perimeters");
    else
      _tools.showOkDialog("Incorrect! Try again.");
  }
  //activityDesc = "Make two different figures with same perimeter and same area.";
  else if(option=="Activity 4"){
      if(periOfMaxArea1 == periOfMaxArea2 && maxArea1 == maxArea2)
      _tools.showOkDialog("Correct!");
    else if(periOfMaxArea1 == periOfMaxArea2 && maxArea1 != maxArea2)
      _tools.showOkDialog("Partially correct! Their perimeters are the same!");
    else if(periOfMaxArea1 != periOfMaxArea2 && maxArea1 == maxArea2)
      _tools.showOkDialog("Partially correct! Their areas are different!");
    else
      _tools.showOkDialog("Incorrect! Try again.");
  }
    // activityDesc = "Make two different figures with perimeter 12 units but have different areas.";
  else if(option=="Activity 5"){
    if(periOfMaxArea1 == 12 && periOfMaxArea2 == 12 && maxArea1 != maxArea2)
      _tools.showOkDialog("Correct!");
      
    else if(periOfMaxArea1 != 12 && periOfMaxArea2 == 12 && maxArea1 != maxArea2 
    || periOfMaxArea1 == 12 && periOfMaxArea2 != 12 && maxArea1 != maxArea2)
      _tools.showOkDialog("Partially Correct! Only one of the shape's perimeter is 12 units!");
        
    else if(periOfMaxArea1 == 12 && periOfMaxArea2 == 12 && maxArea1 == maxArea2)
      _tools.showOkDialog("Partially Correct! The 2 shapes have the same area!")
      
    else
      _tools.showOkDialog("Incorrect! Try again.")
  }//activityDesc ="Make two different figures with area 6 square units but have different perimeters.";
  else if(option=='Activity 6'){
     if(maxArea1 == 6 && maxArea2 == 6 && periOfMaxArea1 != periOfMaxArea2)
      _tools.showOkDialog("Correct!");
      
    else if(maxArea1 != 6 && maxArea2 == 6 && periOfMaxArea1 != periOfMaxArea2 
    || maxArea1 == 6 && maxArea2 != 6 && periOfMaxArea1 != periOfMaxArea2)
      _tools.showOkDialog("Partially Correct! Only one of the shape's area is 6 units!");
        
    else if(maxArea1 == 6 && maxArea2 == 6 && periOfMaxArea1 == periOfMaxArea2)
      _tools.showOkDialog("Partially Correct! The 2 shapes have the same perimter!")
      
    else
      _tools.showOkDialog("Incorrect! Try again.")
  }

}); // HtmlView Page setting action 'OnPress' for element 'check'
          _view.check.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'check'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  _pause();
  //speech ("paused");

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  //speech ("play");

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton2'
          _view.hint.linkProperty("Checked",  function() { return hintanswers; }, function(_v) { hintanswers = _v; } ); // HtmlView Page linking property 'Checked' for element 'hint'
          _view.hint.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'hint'
          _view.stepButton2.setAction("OnClick", function(_data,_info) {
  _step();

}); // HtmlView Page setting action 'OnClick' for element 'stepButton2'
          _view.resetButton3.setAction("OnClick", function(_data,_info) {
  _reset();
  //speechzh ("你好");

}); // HtmlView Page setting action 'OnClick' for element 'resetButton3'
          _view.resetButton3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton3'
          _view.activityDesc.linkProperty("Text",  function() { return ""+activityDesc; } ); // HtmlView Page linking property 'Text' for element 'activityDesc'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return hintanswers?"Perimeter Figure A="+periOfMaxArea1+"\nArea Figure A="+maxArea1+"\nPerimeter Figure B="+periOfMaxArea2+"\nArea Figure B ="+maxArea2:""; } ); // HtmlView Page linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnPress", function(_data,_info) {
  var position = _view.plottingPanel.getInteraction().getInteractionPoint();

}); // HtmlView Page setting action 'OnPress' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return ""+activityDesc; } ); // HtmlView Page linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return 12+0.25; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return -1+0.25; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.HorizonalarrowSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'HorizonalarrowSet'
          _view.HorizonalarrowSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'HorizonalarrowSet'
          _view.HorizonalarrowSet.linkProperty("LineColor",  function() { return linecolor; }, function(_v) { linecolor = _v; } ); // HtmlView Page linking property 'LineColor' for element 'HorizonalarrowSet'
          _view.HorizonalarrowSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'HorizonalarrowSet'
          _view.HorizonalarrowSet.setAction("OnPress", function(_data,_info) {
  //console.log("lineToNode1[elementinteracted]="+lineToNode1[elementinteracted]) //make easier to read console.og
  //output looks like lineToNode1[elementinteracted]=0,1 for first line etc
  // imagine all corners are called nodes,
  //30,31,32,33,34,35
  //24,25,26,27,28,29
  //18,19,20,21,22,23
  //12,13,14,15,16,17
  //6,7,8,9,10,11,
  //0,1,2,3,4,5
  //console.log("color="+linecolor[elementinteracted]);
  //var node1 = lineToNode1[elementinteracted][0], //just shorten name zeroth index
  //    node2 = lineToNode1[elementinteracted][1]; //just shorten name index 1//
  //console.log("node1,node 2="+node1+" , "+node2);
  var row = Math.floor(elementinteracted / noOfCol) + 1,
      col = elementinteracted % noOfCol + 1;
  //console.log("row, col="+row, col); // shows the row,col =1,1 for first row, first column etc
  if (linecolor[elementinteracted]==coloroff){
    linecolor[elementinteracted] = coloron;
    linewidth[elementinteracted] =selectedwidth; //new to make width thicker if selected
    //adjMat[node1][node2] = 1; // what does adjMat do? adjMat is a matrix of [36,36]
    //adjMat[node2][node1] = 1;
    //console.log("adjMat="+adjMat);
    lineGrid1[row][col] = 1;
    //console.log("lineGrid1="+lineGrid1)
  }
  else if (linecolor[elementinteracted]==coloron || linecolor[elementinteracted]==colorhighlight){
    console.log('testttting');
    linecolor[elementinteracted] = coloroff;
    linewidth[elementinteracted] =selectedwidtho; //new to make width thicker if selected
    //adjMat[node1][node2] = 0;
    //adjMat[node2][node1] = 0;
    lineGrid1[row][col] = 0;
  }
  //perimeter();
  area(0);

}); // HtmlView Page setting action 'OnPress' for element 'HorizonalarrowSet'
          _view.HorizonalarrowSet.linkProperty("LineWidth",  function() { return linewidth; }, function(_v) { linewidth = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'HorizonalarrowSet'
          _view.HorizonalarrowSet.linkProperty("ElementInteracted",  function() { return elementinteracted; }, function(_v) { elementinteracted = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'HorizonalarrowSet'
          _view.textSet.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet'
          _view.textSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet'
          _view.verticallarrowSet2.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'verticallarrowSet2'
          _view.verticallarrowSet2.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'verticallarrowSet2'
          _view.verticallarrowSet2.linkProperty("LineColor",  function() { return linecolor2; }, function(_v) { linecolor2 = _v; } ); // HtmlView Page linking property 'LineColor' for element 'verticallarrowSet2'
          _view.verticallarrowSet2.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView Page linking property 'Y' for element 'verticallarrowSet2'
          _view.verticallarrowSet2.setAction("OnPress", function(_data,_info) {
  //console.log("lineToNode2[elementinteracted2]="+lineToNode2[elementinteracted2]);
  //var node1 = lineToNode2[elementinteracted2][0],
  //    node2 = lineToNode2[elementinteracted2][1];
  var row = Math.floor(elementinteracted2 / (noOfCol + 1)) + 1
      col = elementinteracted2 % (noOfCol + 1) + 1;
      
  if (linecolor2[elementinteracted2]==coloroff){
    linecolor2[elementinteracted2] = coloron;
    linewidth2[elementinteracted2] =selectedwidth; //new to make width thicker if selected
    //adjMat[node1][node2] = 1;
    //adjMat[node2][node1] = 1;
    lineGrid2[row][col] = 1;
  }
  else if (linecolor2[elementinteracted2]==coloron || linecolor2[elementinteracted2]==colorhighlight){
    linecolor2[elementinteracted2] = coloroff;
     linewidth2[elementinteracted2] =selectedwidtho; //new to make width thicker if selected
    //adjMat[node1][node2] = 0;
    //adjMat[node2][node1] = 0;
    lineGrid2[row][col] = 0;
  }
  //perimeter();
  area(0);

}); // HtmlView Page setting action 'OnPress' for element 'verticallarrowSet2'
          _view.verticallarrowSet2.linkProperty("LineWidth",  function() { return linewidth2; }, function(_v) { linewidth2 = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'verticallarrowSet2'
          _view.verticallarrowSet2.linkProperty("ElementInteracted",  function() { return elementinteracted2; }, function(_v) { elementinteracted2 = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'verticallarrowSet2'
          _view.textSet3.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet3'
          _view.textSet3.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'textSet3'
          _view.textSet3.linkProperty("Y",  function() { return y2; }, function(_v) { y2 = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet3'
          _view.textSet3.linkProperty("Text",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet3'
          _view.figure1.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'figure1'
          _view.HorizonalarrowSet2.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'HorizonalarrowSet2'
          _view.HorizonalarrowSet2.linkProperty("X",  function() { return x3; }, function(_v) { x3 = _v; } ); // HtmlView Page linking property 'X' for element 'HorizonalarrowSet2'
          _view.HorizonalarrowSet2.linkProperty("LineColor",  function() { return linecolor3; }, function(_v) { linecolor3 = _v; } ); // HtmlView Page linking property 'LineColor' for element 'HorizonalarrowSet2'
          _view.HorizonalarrowSet2.linkProperty("Y",  function() { return y3; }, function(_v) { y3 = _v; } ); // HtmlView Page linking property 'Y' for element 'HorizonalarrowSet2'
          _view.HorizonalarrowSet2.setAction("OnPress", function(_data,_info) {
  var row = Math.floor(elementinteracted3 / noOfCol) + 1,
      col = elementinteracted3 % noOfCol + 1;
  //console.log("row, col="+row, col); // shows the row,col =1,1 for first row, first column etc
  if (linecolor3[elementinteracted3]==coloroff){
    linecolor3[elementinteracted3] = coloron;
    linewidth3[elementinteracted3] =selectedwidth; //new to make width thicker if selected
    //adjMat[node1][node2] = 1; // what does adjMat do? adjMat is a matrix of [36,36]
    //adjMat[node2][node1] = 1;
    //console.log("adjMat="+adjMat);
    lineGrid3[row][col] = 1;
    //console.log("lineGrid1="+lineGrid1)
  }
  else if (linecolor3[elementinteracted3]==coloron || linecolor3[elementinteracted3]==colorhighlight){
    linecolor3[elementinteracted3] = coloroff;
    linewidth3[elementinteracted3] =selectedwidtho; //new to make width thicker if selected
    //adjMat[node1][node2] = 0;
    //adjMat[node2][node1] = 0;
    lineGrid3[row][col] = 0;
  }
  //perimeter();
  area(1);

}); // HtmlView Page setting action 'OnPress' for element 'HorizonalarrowSet2'
          _view.HorizonalarrowSet2.linkProperty("LineWidth",  function() { return linewidth3; }, function(_v) { linewidth3 = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'HorizonalarrowSet2'
          _view.HorizonalarrowSet2.linkProperty("ElementInteracted",  function() { return elementinteracted3; }, function(_v) { elementinteracted3 = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'HorizonalarrowSet2'
          _view.textSet2.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet2'
          _view.textSet2.linkProperty("FillColor",  function() { return linecolor3; }, function(_v) { linecolor3 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'textSet2'
          _view.textSet2.linkProperty("X",  function() { return x3; }, function(_v) { x3 = _v; } ); // HtmlView Page linking property 'X' for element 'textSet2'
          _view.textSet2.linkProperty("Y",  function() { return y3; }, function(_v) { y3 = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet2'
          _view.textSet2.linkProperty("Text",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet2'
          _view.verticallarrowSet22.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'verticallarrowSet22'
          _view.verticallarrowSet22.linkProperty("X",  function() { return x4; }, function(_v) { x4 = _v; } ); // HtmlView Page linking property 'X' for element 'verticallarrowSet22'
          _view.verticallarrowSet22.linkProperty("LineColor",  function() { return linecolor4; }, function(_v) { linecolor4 = _v; } ); // HtmlView Page linking property 'LineColor' for element 'verticallarrowSet22'
          _view.verticallarrowSet22.linkProperty("Y",  function() { return y4; }, function(_v) { y4 = _v; } ); // HtmlView Page linking property 'Y' for element 'verticallarrowSet22'
          _view.verticallarrowSet22.setAction("OnPress", function(_data,_info) {
  //console.log("lineToNode2[elementinteracted2]="+lineToNode2[elementinteracted2]);
  //var node1 = lineToNode2[elementinteracted2][0],
  //    node2 = lineToNode2[elementinteracted2][1];
  var row = Math.floor(elementinteracted4 / (noOfCol + 1)) + 1
      col = elementinteracted4 % (noOfCol + 1) + 1;
      
  if (linecolor4[elementinteracted4]==coloroff){
    linecolor4[elementinteracted4] = coloron;
    linewidth4[elementinteracted4] =selectedwidth; //new to make width thicker if selected
    //adjMat[node1][node2] = 1;
    //adjMat[node2][node1] = 1;
    lineGrid4[row][col] = 1;
  }
  else if (linecolor4[elementinteracted4]==coloron || linecolor4[elementinteracted4]==colorhighlight){
    linecolor4[elementinteracted4] = coloroff;
     linewidth4[elementinteracted4] =selectedwidtho; //new to make width thicker if selected
    //adjMat[node1][node2] = 0;
    //adjMat[node2][node1] = 0;
    lineGrid4[row][col] = 0;
  }
  //perimeter();
  area(1);

}); // HtmlView Page setting action 'OnPress' for element 'verticallarrowSet22'
          _view.verticallarrowSet22.linkProperty("LineWidth",  function() { return linewidth4; }, function(_v) { linewidth4 = _v; } ); // HtmlView Page linking property 'LineWidth' for element 'verticallarrowSet22'
          _view.verticallarrowSet22.linkProperty("ElementInteracted",  function() { return elementinteracted4; }, function(_v) { elementinteracted4 = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'verticallarrowSet22'
          _view.textSet32.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet32'
          _view.textSet32.linkProperty("FillColor",  function() { return linecolor4; }, function(_v) { linecolor4 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'textSet32'
          _view.textSet32.linkProperty("X",  function() { return x4; }, function(_v) { x4 = _v; } ); // HtmlView Page linking property 'X' for element 'textSet32'
          _view.textSet32.linkProperty("Y",  function() { return y4; }, function(_v) { y4 = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet32'
          _view.textSet32.linkProperty("Text",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet32'
          _view.figure12.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'figure12'
          _view.figureA.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'figureA'
          _view.comboBoxinputPerimeterA.setAction("OnChange", function(_data,_info) {
  //inputPerimeterA
  // to use
  var opts = _view.comboBoxinputPerimeterA.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option==periOfMaxArea1){
    _tools.showOkDialog("Correct!");
    }
    else{
      _tools.showOkDialog("Incorrect!");
      }

}); // HtmlView Page setting action 'OnChange' for element 'comboBoxinputPerimeterA'
          _view.comboBoxinputPerimeterA.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBoxinputPerimeterA'
          _view.field.linkProperty("Value",  function() { return inputPerimeterA; }, function(_v) { inputPerimeterA = _v; } ); // HtmlView Page linking property 'Value' for element 'field'
          _view.comboBoxinputAreaA.setAction("OnChange", function(_data,_info) {
  //inputPerimeterA
  // to use
  var opts = _view.comboBoxinputAreaA.getProperty("SelectedOptions");  // array of options
  var option = (opts.length > 0)? opts[0]:"";
  if ( option==maxArea1){
    _tools.showOkDialog("Correct!");
  }
  else{
    _tools.showOkDialog("Incorrect!");
  }

}); // HtmlView Page setting action 'OnChange' for element 'comboBoxinputAreaA'
          _view.comboBoxinputAreaA.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBoxinputAreaA'
          _view.field2.linkProperty("Value",  function() { return inputAreaA; }, function(_v) { inputAreaA = _v; } ); // HtmlView Page linking property 'Value' for element 'field2'
          _view.figureB.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'figureB'
          _view.field4.linkProperty("Value",  function() { return inputPerimeterA; }, function(_v) { inputPerimeterA = _v; } ); // HtmlView Page linking property 'Value' for element 'field4'
          _view.comboBoxinputPerimeterB.setAction("OnChange", function(_data,_info) {
  //inputPerimeterB
  // to use
  var opts = _view.comboBoxinputPerimeterB.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option==periOfMaxArea2){
    _tools.showOkDialog("Correct!");
    }
    else{
      _tools.showOkDialog("Incorrect!");
      }

}); // HtmlView Page setting action 'OnChange' for element 'comboBoxinputPerimeterB'
          _view.comboBoxinputPerimeterB.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBoxinputPerimeterB'
          _view.comboBoxinputAreaB.setAction("OnChange", function(_data,_info) {
  //inputPerimeterA
  // to use
  var opts = _view.comboBoxinputAreaB.getProperty("SelectedOptions");  // array of options
  var option = (opts.length > 0)? opts[0]:"";
  if ( option==maxArea2){
    _tools.showOkDialog("Correct!");
  }
  else{
    _tools.showOkDialog("Incorrect!");
  }

}); // HtmlView Page setting action 'OnChange' for element 'comboBoxinputAreaB'
          _view.comboBoxinputAreaB.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBoxinputAreaB'
          _view.field23.linkProperty("Value",  function() { return inputAreaA; }, function(_v) { inputAreaA = _v; } ); // HtmlView Page linking property 'Value' for element 'field23'
          _view.arrayPanel.linkProperty("DataArray",  function() { return adjMat; }, function(_v) { adjMat = _v; } ); // HtmlView Page linking property 'DataArray' for element 'arrayPanel'
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
function perimeter_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = perimeter_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function perimeter_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("CSS",{"display":"inline"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'controlPanel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.button,"check", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'check'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'check'
      .setProperty("Text","✅ Check") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'check'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("TextOn","▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      .setProperty("Font","normal normal 3vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'playPauseButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"hint", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'hint'
      .setProperty("Text","Hint") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'hint'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton2'
      .setProperty("Text","|►") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stepButton2'
      .setProperty("Font","normal normal 3vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'stepButton2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'stepButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Width","20vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetButton3'
      .setProperty("Text","↻Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"activityPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'activityPanel'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'activityPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"activityDesc", _view.activityPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'activityDesc'
      .setProperty("CSS",{"font-weight": "bold"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'activityDesc'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",-1) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("YFixedTick",-1) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XTickStep",13) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",7) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",6) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumY",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"left", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'left'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"HorizonalarrowSet", _view.left) // EJsS HtmlView.HtmlView Page: declaration of element 'HorizonalarrowSet'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'HorizonalarrowSet'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'HorizonalarrowSet'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'HorizonalarrowSet'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'HorizonalarrowSet'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'HorizonalarrowSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide", _view.left) // EJsS HtmlView.HtmlView Page: declaration of element 'hide'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'textSet'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'textSet'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"verticallarrowSet2", _view.left) // EJsS HtmlView.HtmlView Page: declaration of element 'verticallarrowSet2'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'verticallarrowSet2'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'verticallarrowSet2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'verticallarrowSet2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'verticallarrowSet2'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'verticallarrowSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide2", _view.left) // EJsS HtmlView.HtmlView Page: declaration of element 'hide2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide2'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet3", _view.hide2) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet3'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'textSet3'
      .setProperty("RelativePosition","SOUTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'textSet3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"figure1", _view.left) // EJsS HtmlView.HtmlView Page: declaration of element 'figure1'
      .setProperty("X",2.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'figure1'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'figure1'
      .setProperty("Text","Figure A") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'figure1'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"right", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'right'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"HorizonalarrowSet2", _view.right) // EJsS HtmlView.HtmlView Page: declaration of element 'HorizonalarrowSet2'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'HorizonalarrowSet2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'HorizonalarrowSet2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'HorizonalarrowSet2'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'HorizonalarrowSet2'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'HorizonalarrowSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide3", _view.right) // EJsS HtmlView.HtmlView Page: declaration of element 'hide3'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide3'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet2", _view.hide3) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet2'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'textSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"verticallarrowSet22", _view.right) // EJsS HtmlView.HtmlView Page: declaration of element 'verticallarrowSet22'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'verticallarrowSet22'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'verticallarrowSet22'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'verticallarrowSet22'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'verticallarrowSet22'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'verticallarrowSet22'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide4", _view.right) // EJsS HtmlView.HtmlView Page: declaration of element 'hide4'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide4'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet32", _view.hide4) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet32'
      .setProperty("RelativePosition","SOUTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'textSet32'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"figure12", _view.right) // EJsS HtmlView.HtmlView Page: declaration of element 'figure12'
      .setProperty("X",8.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'figure12'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'figure12'
      .setProperty("Text","Figure B") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'figure12'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"combinedleftright", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'combinedleftright'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'combinedleftright'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"figureA", _view.combinedleftright) // EJsS HtmlView.HtmlView Page: declaration of element 'figureA'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'figureA'
      .setProperty("Background","darkseagreen") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'figureA'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'figureA'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"left2", _view.figureA) // EJsS HtmlView.HtmlView Page: declaration of element 'left2'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'left2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"Figure_A2", _view.left2) // EJsS HtmlView.HtmlView Page: declaration of element 'Figure_A2'
      .setProperty("Text","Figure A:") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'Figure_A2'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'Figure_A2'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'Figure_A2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"right2", _view.figureA) // EJsS HtmlView.HtmlView Page: declaration of element 'right2'
      .setProperty("Width","80%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'right2'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'right2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"upper", _view.right2) // EJsS HtmlView.HtmlView Page: declaration of element 'upper'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"perimeter", _view.upper) // EJsS HtmlView.HtmlView Page: declaration of element 'perimeter'
      .setProperty("Text","Perimeter = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'perimeter'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBoxinputPerimeterA", _view.upper) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBoxinputPerimeterA'
      .setProperty("Options",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBoxinputPerimeterA'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field", _view.upper) // EJsS HtmlView.HtmlView Page: declaration of element 'field'
      .setProperty("Width","7vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'field'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"units", _view.upper) // EJsS HtmlView.HtmlView Page: declaration of element 'units'
      .setProperty("Text","units") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'units'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"lower", _view.right2) // EJsS HtmlView.HtmlView Page: declaration of element 'lower'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"Area", _view.lower) // EJsS HtmlView.HtmlView Page: declaration of element 'Area'
      .setProperty("Text","Area = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'Area'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBoxinputAreaA", _view.lower) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBoxinputAreaA'
      .setProperty("Options",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBoxinputAreaA'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field2", _view.lower) // EJsS HtmlView.HtmlView Page: declaration of element 'field2'
      .setProperty("Width","7vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field2'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'field2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"units2", _view.lower) // EJsS HtmlView.HtmlView Page: declaration of element 'units2'
      .setProperty("Text","units²") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'units2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"figureB", _view.combinedleftright) // EJsS HtmlView.HtmlView Page: declaration of element 'figureB'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'figureB'
      .setProperty("Background","lightblue") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'figureB'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'figureB'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"left22", _view.figureB) // EJsS HtmlView.HtmlView Page: declaration of element 'left22'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'left22'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"Figure_B", _view.left22) // EJsS HtmlView.HtmlView Page: declaration of element 'Figure_B'
      .setProperty("Text","Figure B:") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'Figure_B'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"right3", _view.figureB) // EJsS HtmlView.HtmlView Page: declaration of element 'right3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"upper2", _view.right3) // EJsS HtmlView.HtmlView Page: declaration of element 'upper2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"perimeter3", _view.upper2) // EJsS HtmlView.HtmlView Page: declaration of element 'perimeter3'
      .setProperty("Text","Perimeter = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'perimeter3'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field4", _view.upper2) // EJsS HtmlView.HtmlView Page: declaration of element 'field4'
      .setProperty("Width","7vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field4'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field4'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'field4'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBoxinputPerimeterB", _view.upper2) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBoxinputPerimeterB'
      .setProperty("Options",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBoxinputPerimeterB'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"units4", _view.upper2) // EJsS HtmlView.HtmlView Page: declaration of element 'units4'
      .setProperty("Text","units") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'units4'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"lower3", _view.right3) // EJsS HtmlView.HtmlView Page: declaration of element 'lower3'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"Area3", _view.lower3) // EJsS HtmlView.HtmlView Page: declaration of element 'Area3'
      .setProperty("Text","Area = ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'Area3'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBoxinputAreaB", _view.lower3) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBoxinputAreaB'
      .setProperty("Options",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBoxinputAreaB'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field23", _view.lower3) // EJsS HtmlView.HtmlView Page: declaration of element 'field23'
      .setProperty("Width","7vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'field23'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'field23'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'field23'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"units23", _view.lower3) // EJsS HtmlView.HtmlView Page: declaration of element 'units23'
      .setProperty("Text","units²") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'units23'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"visual", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'visual'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'visual'
      ;

    _view._addElement(EJSS_INTERFACE.arrayPanel,"arrayPanel", _view.visual) // EJsS HtmlView.HtmlView Page: declaration of element 'arrayPanel'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new perimeter("_topFrame","_ejs_library/",null);
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
