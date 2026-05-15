function astoundingly_average(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var numOfCards; // EjsS Model.Variables.Var Table.numOfCards
  var cardX; // EjsS Model.Variables.Var Table.cardX
  var cardY; // EjsS Model.Variables.Var Table.cardY
  var initX; // EjsS Model.Variables.Var Table.initX
  var initY; // EjsS Model.Variables.Var Table.initY
  var cardVal; // EjsS Model.Variables.Var Table.cardVal
  var cardWidth; // EjsS Model.Variables.Var Table.cardWidth
  var cardHeight; // EjsS Model.Variables.Var Table.cardHeight
  var cardColor; // EjsS Model.Variables.Var Table.cardColor
  var highlightColor; // EjsS Model.Variables.Var Table.highlightColor
  var font; // EjsS Model.Variables.Var Table.font
  var taskFont; // EjsS Model.Variables.Var Table.taskFont
  var dragThreshold; // EjsS Model.Variables.Var Table.dragThreshold
  var whichGroup; // EjsS Model.Variables.Var Table.whichGroup
  var whichCircle; // EjsS Model.Variables.Var Table.whichCircle
  var interact; // EjsS Model.Variables.Var Table.interact
  var curTask; // EjsS Model.Variables.Var Table.curTask
  var task; // EjsS Model.Variables.Var Table.task
  var instructionStr; // EjsS Model.Variables.Var Table.instructionStr
  var ruleStr; // EjsS Model.Variables.Var Table.ruleStr

  var shapeLength; // EjsS Model.Variables.Shape Var.shapeLength
  var shapePoints; // EjsS Model.Variables.Shape Var.shapePoints
  var shapeColor; // EjsS Model.Variables.Shape Var.shapeColor
  var circleCoord; // EjsS Model.Variables.Shape Var.circleCoord
  var circleLength; // EjsS Model.Variables.Shape Var.circleLength
  var groupSpacing; // EjsS Model.Variables.Shape Var.groupSpacing
  var groupArr; // EjsS Model.Variables.Shape Var.groupArr

  var enabledposition; // EjsS Model.Variables.lookang.enabledposition
  var visiblity; // EjsS Model.Variables.lookang.visiblity
  var escKeyPressed; // EjsS Model.Variables.lookang.escKeyPressed

  var isFirstTry; // EjsS Model.Variables.answerHistory.isFirstTry

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      numOfCards : numOfCards,
      cardX : cardX,
      cardY : cardY,
      initX : initX,
      initY : initY,
      cardVal : cardVal,
      cardWidth : cardWidth,
      cardHeight : cardHeight,
      cardColor : cardColor,
      highlightColor : highlightColor,
      font : font,
      taskFont : taskFont,
      dragThreshold : dragThreshold,
      whichGroup : whichGroup,
      whichCircle : whichCircle,
      interact : interact,
      curTask : curTask,
      task : task,
      instructionStr : instructionStr,
      ruleStr : ruleStr,
      shapeLength : shapeLength,
      shapePoints : shapePoints,
      shapeColor : shapeColor,
      circleCoord : circleCoord,
      circleLength : circleLength,
      groupSpacing : groupSpacing,
      groupArr : groupArr,
      enabledposition : enabledposition,
      visiblity : visiblity,
      escKeyPressed : escKeyPressed,
      isFirstTry : isFirstTry
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.numOfCards != "undefined") numOfCards = json.numOfCards;
    if(typeof json.cardX != "undefined") cardX = json.cardX;
    if(typeof json.cardY != "undefined") cardY = json.cardY;
    if(typeof json.initX != "undefined") initX = json.initX;
    if(typeof json.initY != "undefined") initY = json.initY;
    if(typeof json.cardVal != "undefined") cardVal = json.cardVal;
    if(typeof json.cardWidth != "undefined") cardWidth = json.cardWidth;
    if(typeof json.cardHeight != "undefined") cardHeight = json.cardHeight;
    if(typeof json.cardColor != "undefined") cardColor = json.cardColor;
    if(typeof json.highlightColor != "undefined") highlightColor = json.highlightColor;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.taskFont != "undefined") taskFont = json.taskFont;
    if(typeof json.dragThreshold != "undefined") dragThreshold = json.dragThreshold;
    if(typeof json.whichGroup != "undefined") whichGroup = json.whichGroup;
    if(typeof json.whichCircle != "undefined") whichCircle = json.whichCircle;
    if(typeof json.interact != "undefined") interact = json.interact;
    if(typeof json.curTask != "undefined") curTask = json.curTask;
    if(typeof json.task != "undefined") task = json.task;
    if(typeof json.instructionStr != "undefined") instructionStr = json.instructionStr;
    if(typeof json.ruleStr != "undefined") ruleStr = json.ruleStr;
    if(typeof json.shapeLength != "undefined") shapeLength = json.shapeLength;
    if(typeof json.shapePoints != "undefined") shapePoints = json.shapePoints;
    if(typeof json.shapeColor != "undefined") shapeColor = json.shapeColor;
    if(typeof json.circleCoord != "undefined") circleCoord = json.circleCoord;
    if(typeof json.circleLength != "undefined") circleLength = json.circleLength;
    if(typeof json.groupSpacing != "undefined") groupSpacing = json.groupSpacing;
    if(typeof json.groupArr != "undefined") groupArr = json.groupArr;
    if(typeof json.enabledposition != "undefined") enabledposition = json.enabledposition;
    if(typeof json.visiblity != "undefined") visiblity = json.visiblity;
    if(typeof json.escKeyPressed != "undefined") escKeyPressed = json.escKeyPressed;
    if(typeof json.isFirstTry != "undefined") isFirstTry = json.isFirstTry;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["init Shape"] = true;
    __pagesEnabled["Init Task"] = true;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    numOfCards = 20; // EjsS Model.Variables.Var Table.numOfCards
    cardX = []; // EjsS Model.Variables.Var Table.cardX
    cardY = []; // EjsS Model.Variables.Var Table.cardY
    initX = []; // EjsS Model.Variables.Var Table.initX
    initY = []; // EjsS Model.Variables.Var Table.initY
    cardVal = []; // EjsS Model.Variables.Var Table.cardVal
    cardWidth = 1; // EjsS Model.Variables.Var Table.cardWidth
    cardHeight = 1.3; // EjsS Model.Variables.Var Table.cardHeight
    cardColor = new Array(numOfCards); // EjsS Model.Variables.Var Table.cardColor
    (function () {
      var _i0;
      for (_i0=0; _i0<numOfCards; _i0+=1) {  // EjsS Model.Variables.Var Table.cardColor
        cardColor[_i0] = "white";  // EjsS Model.Variables.Var Table.cardColor
      }
    }());
    highlightColor = "#fff176"; // EjsS Model.Variables.Var Table.highlightColor
    font = "normal normal 2vw"; // EjsS Model.Variables.Var Table.font
    taskFont = "normal normal 1.3vw"; // EjsS Model.Variables.Var Table.taskFont
    dragThreshold = 0.7; // EjsS Model.Variables.Var Table.dragThreshold
    whichGroup = []; // EjsS Model.Variables.Var Table.whichGroup
    whichCircle = []; // EjsS Model.Variables.Var Table.whichCircle
    task = []; // EjsS Model.Variables.Var Table.task
  });

  _model.addToReset(function() {
    shapeLength = 3; // EjsS Model.Variables.Shape Var.shapeLength
    shapePoints = {}; // EjsS Model.Variables.Shape Var.shapePoints
    shapeColor = {}; // EjsS Model.Variables.Shape Var.shapeColor
    circleCoord = {}; // EjsS Model.Variables.Shape Var.circleCoord
    circleLength = 1.3; // EjsS Model.Variables.Shape Var.circleLength
    groupSpacing = shapeLength * 2; // EjsS Model.Variables.Shape Var.groupSpacing
    groupArr = []; // EjsS Model.Variables.Shape Var.groupArr
  });

  _model.addToReset(function() {
    enabledposition = new Array(numOfCards); // EjsS Model.Variables.lookang.enabledposition
    (function () {
      var _i0;
      for (_i0=0; _i0<numOfCards; _i0+=1) {  // EjsS Model.Variables.lookang.enabledposition
        enabledposition[_i0] = "ENABLED_NONE";  // EjsS Model.Variables.lookang.enabledposition
      }
    }());
    visiblity = new Array(numOfCards); // EjsS Model.Variables.lookang.visiblity
    (function () {
      var _i0;
      for (_i0=0; _i0<numOfCards; _i0+=1) {  // EjsS Model.Variables.lookang.visiblity
        visiblity[_i0] = false;  // EjsS Model.Variables.lookang.visiblity
      }
    }());
    escKeyPressed = false; // EjsS Model.Variables.lookang.escKeyPressed
  });

  _model.addToReset(function() {
    isFirstTry = new Array(7); // EjsS Model.Variables.answerHistory.isFirstTry
    (function () {
      var _i0;
      for (_i0=0; _i0<7; _i0+=1) {  // EjsS Model.Variables.answerHistory.isFirstTry
        isFirstTry[_i0] = true;  // EjsS Model.Variables.answerHistory.isFirstTry
      }
    }());
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

  // creating a 'Group' class.  // > CustomCode.Group Class:1
  /*  // > CustomCode.Group Class:2
  A "Group" comprises of the shape, and the circles around it.  // > CustomCode.Group Class:3
  Currently, 3 different types of shapes are implemented: "triangle", "square", "pentagon"  // > CustomCode.Group Class:4
  IMPORTANT: if you want to add any of these 'groups' into the plottingPanel, do so via the addGroup() function. Also currently there is no support for  // > CustomCode.Group Class:5
  deleting existing groups (other than through reseting) due to the limitations of EJSS.  // > CustomCode.Group Class:6
  The attributes of this class are:  // > CustomCode.Group Class:7
  shapeType: the shape type of the this group ("triangle", "square", "pentagon")  // > CustomCode.Group Class:8
  id: the unique integer id assigned to this group  // > CustomCode.Group Class:9
  name: the name of the group  // > CustomCode.Group Class:10
  xPos and yPos: arrays containing the x and y positions of the shapes in the group. xPos[0] and yPos[0] refers to position of the center of the group.  // > CustomCode.Group Class:11
  val: array containing the numbers currently contained in the shapes. If there is no number, default to -1. val[0] refers to the number in the center.  // > CustomCode.Group Class:12
  The current methods for this class are:  // > CustomCode.Group Class:13
  isValid(): determines if the average of the values in the circles equals to the value in the center  // > CustomCode.Group Class:14
  getter and setter functions for x and y: refers to the x and y coordinates of the center of the group. Should be accessed if the group has to be repositioned.  // > CustomCode.Group Class:15
  */  // > CustomCode.Group Class:16
  class Group {  // > CustomCode.Group Class:17
    constructor(shapeType, id, x, y) {  // > CustomCode.Group Class:18
      // checking if the shapeType exists  // > CustomCode.Group Class:19
      if(!shapePoints.hasOwnProperty(shapeType)) {  // > CustomCode.Group Class:20
        shapeType = "triangle"  // > CustomCode.Group Class:21
      }  // > CustomCode.Group Class:22
      this.shapeType = shapeType;  // > CustomCode.Group Class:23
      this.id = id, this.name = "group" + this.id;  // > CustomCode.Group Class:24
      this.xPos = [x], this.yPos = [y];  // > CustomCode.Group Class:25
      this.val = [-1];  // > CustomCode.Group Class:26
      // creating the group  // > CustomCode.Group Class:27
      this.groupElement = _view._addElement(EJSS_DRAWING2D.group, this.name, _view.groupSet);  // > CustomCode.Group Class:28
      // setting the coordinates of the group  // > CustomCode.Group Class:29
      this.groupElement.setProperties( {  // > CustomCode.Group Class:30
        "X": x,  // > CustomCode.Group Class:31
        "Y": y  // > CustomCode.Group Class:32
      } );  // > CustomCode.Group Class:33
      // creating the shape  // > CustomCode.Group Class:34
      var mainShape = _view._addElement(EJSS_DRAWING2D.polygon, this.name + "_main", _view[this.name]);  // > CustomCode.Group Class:35
      // setting the points of the shape  // > CustomCode.Group Class:36
      mainShape.setProperties( {  // > CustomCode.Group Class:37
        "X": 0,  // > CustomCode.Group Class:38
        "Y": 0,  // > CustomCode.Group Class:39
        "PointsX": shapePoints[shapeType][0],  // > CustomCode.Group Class:40
        "PointsY": shapePoints[shapeType][1],  // > CustomCode.Group Class:41
        "FillColor": shapeColor[shapeType]  // > CustomCode.Group Class:42
      } );  // > CustomCode.Group Class:43
      // adding the circles  // > CustomCode.Group Class:44
      for(var i = 0; i < circleCoord[shapeType][0].length; i++) {  // > CustomCode.Group Class:45
        // the current X and Y position of the circle  // > CustomCode.Group Class:46
        let curX = circleCoord[shapeType][0][i], curY = circleCoord[shapeType][1][i];  // > CustomCode.Group Class:47
        // adding the circle coordinates to the circleX and circleY array  // > CustomCode.Group Class:48
        this.xPos.push(curX + x), this.yPos.push(curY + y);  // > CustomCode.Group Class:49
        this.val.push(-1);  // > CustomCode.Group Class:50
        // creating the circle in the plottingPanel  // > CustomCode.Group Class:51
        let circleShape = _view._addElement(EJSS_DRAWING2D.shape, this.name + "_" + i, _view[this.name]);  // > CustomCode.Group Class:52
        // setting the size, position and color of the circle  // > CustomCode.Group Class:53
        circleShape.setProperties( {  // > CustomCode.Group Class:54
          "X": curX,  // > CustomCode.Group Class:55
          "Y": curY,  // > CustomCode.Group Class:56
          "SizeX": circleLength,  // > CustomCode.Group Class:57
          "SizeY": circleLength,  // > CustomCode.Group Class:58
          "FillColor": "White"  // > CustomCode.Group Class:59
        } );  // > CustomCode.Group Class:60
      }  // > CustomCode.Group Class:61
      // creating the label at the bottom right hand corner of the group  // > CustomCode.Group Class:62
      var labelFontSize = "24pt";  // > CustomCode.Group Class:63
      if ([1, 3, 4].includes(curTask)) {  // > CustomCode.Group Class:64
        labelFontSize = "0";  // > CustomCode.Group Class:65
      }  // > CustomCode.Group Class:66
      var label = _view._addElement(EJSS_DRAWING2D.text, this.name + "label", _view[this.name]);  // > CustomCode.Group Class:67
      label.setProperties( {  // > CustomCode.Group Class:68
        Text: this.id,  // > CustomCode.Group Class:69
        X: -shapeLength *2/3,  // > CustomCode.Group Class:70
        Y: -shapeLength * (0.6),  // > CustomCode.Group Class:71
        FontSize: labelFontSize  // > CustomCode.Group Class:72
      } );  // > CustomCode.Group Class:73
    }  // > CustomCode.Group Class:74
    // determines if the average of the values in the circles equals to the value in the center  // > CustomCode.Group Class:75
    // returns -1 if not all positions have been filled in; 1 if valid; 0 if invalid  // > CustomCode.Group Class:76
    isValid() {  // > CustomCode.Group Class:77
      var sum = 0;  // > CustomCode.Group Class:78
      for(var i = 0; i < this.val.length; i++) {  // > CustomCode.Group Class:79
        if(this.val[i] == -1) {  // > CustomCode.Group Class:80
          return -1;  // > CustomCode.Group Class:81
        }  // > CustomCode.Group Class:82
        if(i != 0) {  // > CustomCode.Group Class:83
          sum += this.val[i];  // > CustomCode.Group Class:84
        }  // > CustomCode.Group Class:85
      }  // > CustomCode.Group Class:86
      return ((sum /(this.val.length - 1) == this.val[0]) ? 1 : 0);  // > CustomCode.Group Class:87
    }  // > CustomCode.Group Class:88
    // getter and setter functions for x and y  // > CustomCode.Group Class:89
    get x() {  // > CustomCode.Group Class:90
      return this.xPos[0];  // > CustomCode.Group Class:91
    }  // > CustomCode.Group Class:92
    get y() {  // > CustomCode.Group Class:93
      return this.yPos[0];  // > CustomCode.Group Class:94
    }  // > CustomCode.Group Class:95
    set x(val) {  // > CustomCode.Group Class:96
      this.xPos[0] = val;  // > CustomCode.Group Class:97
      for(var i = 1; i <= circleCoord[this.shapeType][0].length; i++) {  // > CustomCode.Group Class:98
        this.xPos[i] = val + circleCoord[this.shapeType][0][i - 1];  // > CustomCode.Group Class:99
      }  // > CustomCode.Group Class:100
      // when we change the x position of the group, the change must also be reflected in EJSS  // > CustomCode.Group Class:101
      this.groupElement.setProperty("X", val);  // > CustomCode.Group Class:102
    }  // > CustomCode.Group Class:103
    set y(val) {  // > CustomCode.Group Class:104
      this.yPos[0] = val;  // > CustomCode.Group Class:105
      for(var i = 1; i <= circleCoord[this.shapeType][1].length; i++) {  // > CustomCode.Group Class:106
        this.yPos[i] = val + circleCoord[this.shapeType][1][i - 1];  // > CustomCode.Group Class:107
      }  // > CustomCode.Group Class:108
      this.groupElement.setProperty("Y", val);  // > CustomCode.Group Class:109
    }  // > CustomCode.Group Class:110
  }  // > CustomCode.Group Class:111

  /*  // > CustomCode.addGroup:1
  The addGroup function is used to add new 'groups' into the plottingPanel.   // > CustomCode.addGroup:2
  It also repositions the groups such that they will always be aligned with the center.  // > CustomCode.addGroup:3
  */  // > CustomCode.addGroup:4
  function addGroup (shapeType) {  // > CustomCode.addGroup:5
      // > CustomCode.addGroup:6
    var groupObj = new Group(shapeType, String.fromCharCode(65 + groupArr.length), 0, -shapeLength * 4/5);  // > CustomCode.addGroup:7
    groupArr.push(groupObj);  // > CustomCode.addGroup:8
      // > CustomCode.addGroup:9
    // setting the X values such that the groups are center aligned  // > CustomCode.addGroup:10
    var n = groupArr.length, curX;  // > CustomCode.addGroup:11
    if(n % 2 == 0){  // > CustomCode.addGroup:12
      curX = -groupSpacing * (n / 2 - 1/2);  // > CustomCode.addGroup:13
    }  // > CustomCode.addGroup:14
    else{  // > CustomCode.addGroup:15
      curX = -groupSpacing * parseInt(n / 2);  // > CustomCode.addGroup:16
    }  // > CustomCode.addGroup:17
    for(var i = 0; i < n; i++){  // > CustomCode.addGroup:18
      groupArr[i].x = curX;  // > CustomCode.addGroup:19
      curX += groupSpacing;  // > CustomCode.addGroup:20
    }  // > CustomCode.addGroup:21
  }  // > CustomCode.addGroup:22

  // the checkTask function is to check whether the numbers are positioned correctly according to the tasks  // > CustomCode.checkTask:1
  function checkTask() {  // > CustomCode.checkTask:2
    var isValid = 1;  // > CustomCode.checkTask:3
    // running through each group and checking if the numbers are valid  // > CustomCode.checkTask:4
    var correctGroups = [];  // > CustomCode.checkTask:5
    for (groupObj of groupArr) {  // > CustomCode.checkTask:6
      let res = groupObj.isValid();  // > CustomCode.checkTask:7
      // compiling a list of all the correct groups for display later  // > CustomCode.checkTask:8
      if (res == 1)  // > CustomCode.checkTask:9
        correctGroups.push(groupObj.id);  // > CustomCode.checkTask:10
      isValid = Math.min(isValid, res);  // > CustomCode.checkTask:11
    }  // > CustomCode.checkTask:12
    // UNFILLED SHAPES  // > CustomCode.checkTask:13
    if (isValid == -1) {  // > CustomCode.checkTask:14
      _tools.showOkDialog("Not all the patterns have been filled in!");  // > CustomCode.checkTask:15
      onAnswerInvalid();  // > CustomCode.checkTask:16
      return;  // > CustomCode.checkTask:17
    }  // > CustomCode.checkTask:18
    // TASK-SPECIFIC CASES  // > CustomCode.checkTask:19
    // must use 13, 17 and 18  // > CustomCode.checkTask:20
    if (curTask == 3) {  // > CustomCode.checkTask:21
      let checkVal = [13, 17, 18];  // > CustomCode.checkTask:22
      for (var i = 0; i < checkVal.length; i++) {  // > CustomCode.checkTask:23
        if (whichGroup[checkVal[i] - 1] == null) {  // > CustomCode.checkTask:24
          _tools.showOkDialog("You didn't use all the required numbers!");  // > CustomCode.checkTask:25
          onAnswerIncorrect();  // > CustomCode.checkTask:26
          return;  // > CustomCode.checkTask:27
        }  // > CustomCode.checkTask:28
      }  // > CustomCode.checkTask:29
    }  // > CustomCode.checkTask:30
    // numbers must be consecutive  // > CustomCode.checkTask:31
    else if (curTask == 4) {  // > CustomCode.checkTask:32
      let checkCounter = 0;  // > CustomCode.checkTask:33
      for (var i = 0; i < whichGroup.length; i++) {  // > CustomCode.checkTask:34
        if (whichGroup[i] == null && checkCounter == 1) {  // > CustomCode.checkTask:35
          checkCounter = 2;  // > CustomCode.checkTask:36
        }  // > CustomCode.checkTask:37
        else if (whichGroup[i] != null) {  // > CustomCode.checkTask:38
          if (checkCounter == 0) {  // > CustomCode.checkTask:39
            checkCounter = 1;  // > CustomCode.checkTask:40
          }  // > CustomCode.checkTask:41
          if (checkCounter == 2) {  // > CustomCode.checkTask:42
            _tools.showOkDialog("The numbers you chose are not consecutive!");  // > CustomCode.checkTask:43
            onAnswerIncorrect();  // > CustomCode.checkTask:44
            return;  // > CustomCode.checkTask:45
          }  // > CustomCode.checkTask:46
        }  // > CustomCode.checkTask:47
      }  // > CustomCode.checkTask:48
    }  // > CustomCode.checkTask:49
    // can only use numbers from 1 - 8  // > CustomCode.checkTask:50
    else if (curTask == 5) {  // > CustomCode.checkTask:51
      for (var i = 8; i < whichGroup.length; i++) {  // > CustomCode.checkTask:52
        if (whichGroup[i] != null) {  // > CustomCode.checkTask:53
          _tools.showOkDialog("You can only use numbers from 1 to 8!");  // > CustomCode.checkTask:54
          onAnswerIncorrect();  // > CustomCode.checkTask:55
          return;  // > CustomCode.checkTask:56
        }  // > CustomCode.checkTask:57
      }  // > CustomCode.checkTask:58
    }  // > CustomCode.checkTask:59
    // can only use numbers from 1 - 12  // > CustomCode.checkTask:60
    else if (curTask == 6 || curTask == 7) {  // > CustomCode.checkTask:61
      for (var i = 12; i < whichGroup.length; i++) {  // > CustomCode.checkTask:62
        if (whichGroup[i] != null) {  // > CustomCode.checkTask:63
          _tools.showOkDialog("You can only use numbers from 1 to 12!");  // > CustomCode.checkTask:64
          onAnswerIncorrect();  // > CustomCode.checkTask:65
          return;  // > CustomCode.checkTask:66
        }  // > CustomCode.checkTask:67
      }  // > CustomCode.checkTask:68
    }  // > CustomCode.checkTask:69
    // INCORRECT PATTERNS i.e. the average of numbers in the circles does not equal to the number in the center  // > CustomCode.checkTask:70
    if (isValid == 0) {  // > CustomCode.checkTask:71
      if (correctGroups.length == 0) {  // > CustomCode.checkTask:72
        _tools.showOkDialog("None of the patterns are correct!");  // > CustomCode.checkTask:73
      }  // > CustomCode.checkTask:74
      else {  // > CustomCode.checkTask:75
        let outputStr = "Only pattern" + (correctGroups.length == 1 ? " " : "s ");  // > CustomCode.checkTask:76
        for (var i = 0; i < correctGroups.length; i++) {  // > CustomCode.checkTask:77
          outputStr += correctGroups[i];  // > CustomCode.checkTask:78
          if (i != correctGroups.length - 1) {  // > CustomCode.checkTask:79
            outputStr += ", ";  // > CustomCode.checkTask:80
          }  // > CustomCode.checkTask:81
        }  // > CustomCode.checkTask:82
        outputStr += (correctGroups.length == 1 ? " is " : " are ") + "correct!";  // > CustomCode.checkTask:83
        _tools.showOkDialog(outputStr);  // > CustomCode.checkTask:84
      }  // > CustomCode.checkTask:85
      onAnswerIncorrect();  // > CustomCode.checkTask:86
    } else {  // > CustomCode.checkTask:87
      // SUCCESS MESSAGE :)  // > CustomCode.checkTask:88
      _tools.showOkDialog("The values are all correctly placed. Well done!");  // > CustomCode.checkTask:89
      onAnswerCorrect();  // > CustomCode.checkTask:90
    }  // > CustomCode.checkTask:91
  }  // > CustomCode.checkTask:92

  var thinkingTimeouts = [];
  var thinkingRunning = false;
  var thinkingEnabledSnapshot = [];

  function getThinkingDefaultHtml() {
    return "<b>Thinking guide</b>: Try the task yourself first. Then click <b>Show Thinking</b> to watch one possible solution, or to see why a task has no solution.";
  }

  var thinkingScripts = {
    1: {
      title: "Task 1: One possible solution",
      lead: "Strategy: choose three outer cards whose total is divisible by 3, because the center must be their average.",
      finish: "This is one valid solution. Many other solutions are possible.",
      steps: [
        { text: "Place 1 in a circle.", move: { value: 1, group: 0, slot: 1 } },
        { text: "Place 2 in another circle.", move: { value: 2, group: 0, slot: 2 } },
        { text: "Place 9 in the last circle. The outer total is now 1 + 2 + 9 = 12.", move: { value: 9, group: 0, slot: 3 } },
        { text: "Now divide by 3. Since 12 / 3 = 4, place 4 in the triangle.", move: { value: 4, group: 0, slot: 0 } }
      ]
    },
    2: {
      title: "Task 2: Solve one shape at a time",
      lead: "A good strategy is to complete one pattern first, then use a second average relationship for the other pattern.",
      finish: "This is one valid arrangement of 9 different cards. Students can look for other working sets too.",
      steps: [
        { text: "Start with the triangle. Place 1 in a circle.", move: { value: 1, group: 0, slot: 1 } },
        { text: "Place 2 in the next triangle circle.", move: { value: 2, group: 0, slot: 2 } },
        { text: "Place 6 in the last triangle circle. The outer total is 1 + 2 + 6 = 9.", move: { value: 6, group: 0, slot: 3 } },
        { text: "The average is 9 / 3 = 3, so place 3 in the triangle.", move: { value: 3, group: 0, slot: 0 } },
        { text: "Now solve the square. Place 4 on the square.", move: { value: 4, group: 1, slot: 1 } },
        { text: "Add 5 to the square.", move: { value: 5, group: 1, slot: 2 } },
        { text: "Add 8 to the square.", move: { value: 8, group: 1, slot: 3 } },
        { text: "Place 11 in the last square circle. The outer total is 4 + 5 + 8 + 11 = 28.", move: { value: 11, group: 1, slot: 4 } },
        { text: "The square center must be 28 / 4 = 7, so place 7 in the square.", move: { value: 7, group: 1, slot: 0 } }
      ]
    },
    3: {
      title: "Task 3: Work backward from the given cards",
      lead: "Here the three given cards fix the outer total, so the missing card is determined by the average rule.",
      finish: "The missing card is 16 because it is the average of 13, 17 and 18.",
      steps: [
        { text: "Place the given card 13 in a circle.", move: { value: 13, group: 0, slot: 1 } },
        { text: "Place the given card 17 in another circle.", move: { value: 17, group: 0, slot: 2 } },
        { text: "Place the given card 18 in the last circle. Their total is 13 + 17 + 18 = 48.", move: { value: 18, group: 0, slot: 3 } },
        { text: "Divide by 3. Since 48 / 3 = 16, the missing card must be 16.", move: { value: 16, group: 0, slot: 0 } }
      ]
    },
    4: {
      title: "Task 4: Why there is no solution",
      lead: "The fastest route is to reason algebraically instead of guessing and checking.",
      finish: "So no set of four consecutive cards can satisfy the triangle-average rule.",
      steps: [
        { text: "Call the four consecutive cards n, n + 1, n + 2 and n + 3." },
        { text: "Their total is 4n + 6." },
        { text: "If one card were the average of the other three, then all four cards together would total 4 times the center card." },
        { text: "That means the total would have to be a multiple of 4." },
        { text: "But 4n + 6 always leaves remainder 2 when divided by 4, so it can never be a multiple of 4." }
      ]
    },
    5: {
      title: "Task 5: Use all 8 cards across two triangles",
      lead: "Solve one triangle cleanly, then use the remaining cards to complete the second triangle.",
      finish: "This uses each number from 1 to 8 exactly once. A second solution also exists.",
      steps: [
        { text: "For the first triangle, place 1 in a circle.", move: { value: 1, group: 0, slot: 1 } },
        { text: "Place 3 in another circle.", move: { value: 3, group: 0, slot: 2 } },
        { text: "Place 8 in the last circle. The outer total is 1 + 3 + 8 = 12.", move: { value: 8, group: 0, slot: 3 } },
        { text: "So the first center is 12 / 3 = 4. Place 4 in the triangle.", move: { value: 4, group: 0, slot: 0 } },
        { text: "Now use the remaining cards on the second triangle. Place 2 in a circle.", move: { value: 2, group: 1, slot: 1 } },
        { text: "Place 6 in another circle.", move: { value: 6, group: 1, slot: 2 } },
        { text: "Place 7 in the last circle. The outer total is 2 + 6 + 7 = 15.", move: { value: 7, group: 1, slot: 3 } },
        { text: "So the second center is 15 / 3 = 5. Place 5 in the triangle.", move: { value: 5, group: 1, slot: 0 } }
      ]
    },
    6: {
      title: "Task 6: Build each pentagon from an average of 5 cards",
      lead: "For each pentagon, add the five outer cards first. The center must be one fifth of that total.",
      finish: "This is one valid arrangement. There are many more because several outer totals can work.",
      steps: [
        { text: "For the first pentagon, place 1 on the outside.", move: { value: 1, group: 0, slot: 1 } },
        { text: "Add 2 to the outside.", move: { value: 2, group: 0, slot: 2 } },
        { text: "Add 3 to the outside.", move: { value: 3, group: 0, slot: 3 } },
        { text: "Add 6 to the outside.", move: { value: 6, group: 0, slot: 4 } },
        { text: "Add 8 to the last outside spot. The outer total is 1 + 2 + 3 + 6 + 8 = 20.", move: { value: 8, group: 0, slot: 5 } },
        { text: "So the first center is 20 / 5 = 4. Place 4 in the pentagon.", move: { value: 4, group: 0, slot: 0 } },
        { text: "Now solve the second pentagon. Place 5 on the outside.", move: { value: 5, group: 1, slot: 1 } },
        { text: "Add 7 to the outside.", move: { value: 7, group: 1, slot: 2 } },
        { text: "Add 10 to the outside.", move: { value: 10, group: 1, slot: 3 } },
        { text: "Add 11 to the outside.", move: { value: 11, group: 1, slot: 4 } },
        { text: "Add 12 to the last outside spot. The outer total is 5 + 7 + 10 + 11 + 12 = 45.", move: { value: 12, group: 1, slot: 5 } },
        { text: "So the second center is 45 / 5 = 9. Place 9 in the pentagon.", move: { value: 9, group: 1, slot: 0 } }
      ]
    },
    7: {
      title: "Task 7: Why there is no solution",
      lead: "Use a total-sum argument. It is faster and more convincing than random trial and error.",
      finish: "So the cards 1 to 12 cannot be split into three valid triangle-average groups.",
      steps: [
        { text: "In any triangle group, the center equals the average of the three outer cards." },
        { text: "So the outer total equals 3 times the center." },
        { text: "That means the total of all four cards in one triangle group is 4 times the center, so it must be a multiple of 4." },
        { text: "If all three triangle groups were valid, the grand total of all 12 cards would also have to be a multiple of 4." },
        { text: "But 1 + 2 + 3 + ... + 12 = 78, and 78 is not a multiple of 4." }
      ]
    }
  };

  function renderThinkingPanel(title, lead, items, conclusion) {
    var html = "<b>" + title + "</b><br/>" + lead;
    if (items.length > 0) {
      html += "<ol>";
      for (var i = 0; i < items.length; i++) {
        html += "<li>" + items[i] + "</li>";
      }
      html += "</ol>";
    }
    if (conclusion) {
      html += "<p><b>Conclusion:</b> " + conclusion + "</p>";
    }
    return html;
  }

  function setThinkingHtml(html) {
    if (_view && _view.solverText) {
      _view.solverText.setProperty("Text", html);
    }
  }

  function clearThinkingTimeouts() {
    for (var i = 0; i < thinkingTimeouts.length; i++) {
      window.clearTimeout(thinkingTimeouts[i]);
    }
    thinkingTimeouts = [];
  }

  function stopThinkingPlayback(resetPanel) {
    if (resetPanel === undefined) {
      resetPanel = true;
    }
    clearThinkingTimeouts();
    thinkingRunning = false;
    if (thinkingEnabledSnapshot.length === enabledposition.length) {
      enabledposition = thinkingEnabledSnapshot.slice();
    }
    thinkingEnabledSnapshot = [];
    if (resetPanel) {
      setThinkingHtml(getThinkingDefaultHtml());
    }
    _update();
  }

  function getCardIndexForValue(value) {
    for (var i = 0; i < cardVal.length; i++) {
      if (cardVal[i] === value) {
        return i;
      }
    }
    return -1;
  }

  function placeCardValueInGroup(value, groupIndex, slotIndex) {
    var cardIndex = getCardIndexForValue(value);
    if (cardIndex < 0 || !groupArr[groupIndex]) {
      return false;
    }
    if (whichGroup[cardIndex] != null) {
      whichGroup[cardIndex].val[whichCircle[cardIndex]] = -1;
    }
    var targetGroup = groupArr[groupIndex];
    cardX[cardIndex] = targetGroup.xPos[slotIndex];
    cardY[cardIndex] = targetGroup.yPos[slotIndex];
    targetGroup.val[slotIndex] = cardVal[cardIndex];
    whichGroup[cardIndex] = targetGroup;
    whichCircle[cardIndex] = slotIndex;
    cardColor[cardIndex] = "#c5e1a5";
    return true;
  }

  function startThinkingPlayback() {
    var script = thinkingScripts[curTask];
    if (!script) {
      setThinkingHtml(getThinkingDefaultHtml());
      return;
    }
    clearThinkingTimeouts();
    thinkingRunning = true;
    thinkingEnabledSnapshot = enabledposition.slice();
    for (var i = 0; i < enabledposition.length; i++) {
      enabledposition[i] = "ENABLED_NONE";
    }
    var items = [];
    var delay = 0;
    setThinkingHtml(renderThinkingPanel(script.title, script.lead, items, ""));
    _update();
    for (var stepIndex = 0; stepIndex < script.steps.length; stepIndex++) {
      (function(step, currentDelay) {
        thinkingTimeouts.push(window.setTimeout(function() {
          if (step.move) {
            placeCardValueInGroup(step.move.value, step.move.group, step.move.slot);
          }
          items.push(step.text);
          setThinkingHtml(renderThinkingPanel(script.title, script.lead, items, ""));
          _update();
        }, currentDelay));
      }(script.steps[stepIndex], delay + (script.steps[stepIndex].delay || 1400)));
      delay += (script.steps[stepIndex].delay || 1400);
    }
    thinkingTimeouts.push(window.setTimeout(function() {
      thinkingRunning = false;
      if (thinkingEnabledSnapshot.length === enabledposition.length) {
        enabledposition = thinkingEnabledSnapshot.slice();
      }
      setThinkingHtml(renderThinkingPanel(script.title, script.lead, items, script.finish));
      _update();
    }, delay + 300));
  }

  function showThinkingProcess() {
    stopThinkingPlayback(false);
    _reset();
    isFirstTry[curTask - 1] = false;
    if (typeof questionAppendHistory === "function") {
      questionAppendHistory("Q" + curTask, "Guided thinking viewed.");
    }
    startThinkingPlayback();
  }

  function onAnswerCorrect() {  // > CustomCode.question:1
    const qn = `Q${curTask}`;  // > CustomCode.question:2
    const groupInfo = groupArr.map(formatGroup);  // > CustomCode.question:3
    startQuestion(qn);  // > CustomCode.question:4
    addQuestionHistory(`Valid answer${isFirstTry[curTask - 1] ? " (First try)" : ""}:\n${groupInfo.join("\n")}\n`);  // > CustomCode.question:5
    awardQuestionMarks(isFirstTry[curTask - 1] ? 2 : 1)  // > CustomCode.question:6
    endQuestion();  // > CustomCode.question:7
  }  // > CustomCode.question:8
  function onAnswerInvalid() {  // > CustomCode.question:9
    const qn = `Q${curTask}`;  // > CustomCode.question:10
    const groupInfo = groupArr.map(formatGroup);  // > CustomCode.question:11
      // > CustomCode.question:12
    questionAppendHistory(qn, `Invalid answer:\n${groupInfo.join("\n")}\n`);  // > CustomCode.question:13
  }  // > CustomCode.question:14
  function onAnswerIncorrect() {  // > CustomCode.question:15
    const qn = `Q${curTask}`;  // > CustomCode.question:16
    isFirstTry[curTask - 1] = false;  // > CustomCode.question:17
    const groupInfo = groupArr.map(formatGroup);  // > CustomCode.question:18
      // > CustomCode.question:19
    questionAppendHistory(qn, `Incorrect answer:\n${groupInfo.join("\n")}\n`);  // > CustomCode.question:20
  }  // > CustomCode.question:21
  /** @param {number} value */  // > CustomCode.question:22
  function formatSlot(value) {  // > CustomCode.question:23
    return value === -1 ? "X" : value.toString();  // > CustomCode.question:24
  }  // > CustomCode.question:25
  function formatGroup(group) {  // > CustomCode.question:26
    const results = ["("];  // > CustomCode.question:27
    for (let i = 1; i < group.val.length; i++) {  // > CustomCode.question:28
      if (i > 1) results.push(" ");  // > CustomCode.question:29
      results.push(formatSlot(group.val[i]));  // > CustomCode.question:30
    }  // > CustomCode.question:31
    results.push(`) Center: ${formatSlot(group.val[0])} `);  // > CustomCode.question:32
    switch (group.isValid()) {  // > CustomCode.question:33
      case -1:  // > CustomCode.question:34
        // do something if group.isValid() === -1  // > CustomCode.question:35
        results.push('🤔');  // > CustomCode.question:36
        break;  // > CustomCode.question:37
      case 0:   // > CustomCode.question:38
        // do something if group.isValid() === 0  // > CustomCode.question:39
        results.push('❌');  // > CustomCode.question:40
        break;  // > CustomCode.question:41
      case 1:  // > CustomCode.question:42
        // do something if group.isValid() === 1  // > CustomCode.question:43
        results.push('✅');  // > CustomCode.question:44
    }  // > CustomCode.question:45
    return results.join("");  // > CustomCode.question:46
  }  // > CustomCode.question:47

  // Assume ECMAScript 6; Chrome >=49, Edge >=14, Firefox >=41, Opera >=36, Safari >=8  // > CustomCode.questionLib:1
  const debugMode = true;  // > CustomCode.questionLib:2
  const _questionLib = {};  // > CustomCode.questionLib:3
  _questionLib.stack = [];  // > CustomCode.questionLib:4
  _questionLib.history = Object.create(null);  // > CustomCode.questionLib:5
  _questionLib.questionMarksAwarded = Object.create(null);  // > CustomCode.questionLib:6
  _questionLib.instantMarksAwarded = Object.create(null);  // > CustomCode.questionLib:7
  const _nullFunction = debugMode ?  // > CustomCode.questionLib:8
    console.log  // > CustomCode.questionLib:9
    :  // > CustomCode.questionLib:10
    function(){};  // > CustomCode.questionLib:11
  function _debugPrint(msg) {  // > CustomCode.questionLib:12
    if (debugMode) {  // > CustomCode.questionLib:13
      console.log(msg);  // > CustomCode.questionLib:14
    }  // > CustomCode.questionLib:15
  }  // > CustomCode.questionLib:16
  function getPendingQuestion() {  // > CustomCode.questionLib:17
    if (!isQuestionStarted()) {  // > CustomCode.questionLib:18
      return null;  // > CustomCode.questionLib:19
    }  // > CustomCode.questionLib:20
    return _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.questionLib:21
  }  // > CustomCode.questionLib:22
  function isQuestionStarted() {  // > CustomCode.questionLib:23
    return _questionLib.stack.length > 0;  // > CustomCode.questionLib:24
  }  // > CustomCode.questionLib:25
  // for assessment.json event - start  // > CustomCode.questionLib:26
  function startQuestion(questionName) {  // > CustomCode.questionLib:27
    _view._addInteraction(_nullFunction, {action:"questionStart", name:questionName}, {element:"questionLib", property:"value"});  // > CustomCode.questionLib:28
    _debugPrint("Start question: " + questionName);  // > CustomCode.questionLib:29
      // > CustomCode.questionLib:30
    _questionLib.stack.push(questionName);  // > CustomCode.questionLib:31
  }  // > CustomCode.questionLib:32
  // for assessment.json history  // > CustomCode.questionLib:33
  function addQuestionHistory(history, questionName=null) {  // > CustomCode.questionLib:34
    if (questionName === null && isQuestionStarted()) {  // > CustomCode.questionLib:35
      questionName = getPendingQuestion();  // > CustomCode.questionLib:36
    }  // > CustomCode.questionLib:37
      // > CustomCode.questionLib:38
    if (!(questionName in _questionLib.history)) {  // > CustomCode.questionLib:39
      _debugPrint("Create question history for " + questionName);  // > CustomCode.questionLib:40
        // > CustomCode.questionLib:41
      _questionLib.history[questionName] = [];  // > CustomCode.questionLib:42
    }  // > CustomCode.questionLib:43
    if (debugMode) {  // > CustomCode.questionLib:44
      console.log("Push \"" + history + "\" to question history for " + questionName);  // > CustomCode.questionLib:45
    }  // > CustomCode.questionLib:46
    _questionLib.history[questionName].push(history);  // > CustomCode.questionLib:47
    _flushQuestionHistory(questionName);  // > CustomCode.questionLib:48
  }  // > CustomCode.questionLib:49
  function _flushQuestionHistory(questionName) {  // > CustomCode.questionLib:50
    // TODO: check if need to flush  // > CustomCode.questionLib:51
    if (questionName === getPendingQuestion()) {  // > CustomCode.questionLib:52
      const outputHistory = _getQuestionHistory(questionName);  // > CustomCode.questionLib:53
      _view._addInteraction(_nullFunction, outputHistory, {property: "historyFor" + questionName, element: "questionLib"});  // > CustomCode.questionLib:54
    }  // > CustomCode.questionLib:55
  }  // > CustomCode.questionLib:56
  function _getQuestionHistory(questionName) {  // > CustomCode.questionLib:57
    if (questionName in _questionLib.history) {  // > CustomCode.questionLib:58
      return _questionLib.history[questionName].join("\n");  // > CustomCode.questionLib:59
    } else {  // > CustomCode.questionLib:60
      _debugPrint("No question \"" + questionName + "\" exists");  // > CustomCode.questionLib:61
      return "";  // > CustomCode.questionLib:62
    }  // > CustomCode.questionLib:63
  }  // > CustomCode.questionLib:64
  // for assessment.json event - states  // > CustomCode.questionLib:65
  function onAnswer(answer, isCorrect=false, history=answer, questionName=null) {  // > CustomCode.questionLib:66
    if (questionName === null && isQuestionStarted()) {  // > CustomCode.questionLib:67
      questionName = _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.questionLib:68
    }  // > CustomCode.questionLib:69
    if (questionName !== null) {  // > CustomCode.questionLib:70
      const explainer = Object.create(null);  // > CustomCode.questionLib:71
      explainer[true] = " ✅";  // > CustomCode.questionLib:72
      explainer[false] = " ❌";  // > CustomCode.questionLib:73
      addQuestionHistory(history + explainer[isCorrect], questionName);  // > CustomCode.questionLib:74
      if (questionName === getPendingQuestion()) {  // > CustomCode.questionLib:75
        _view._addInteraction(_nullFunction, {name:questionName, answer:answer, isCorrect:isCorrect, action:"questionAnswer"}, {property: "answer", element:"questionLib"});  // > CustomCode.questionLib:76
      }  // > CustomCode.questionLib:77
    }  // > CustomCode.questionLib:78
  }  // > CustomCode.questionLib:79
  // for assessment.json event - end  // > CustomCode.questionLib:80
  function endQuestion() {  // > CustomCode.questionLib:81
    if (_questionLib.stack.length > 0) {  // > CustomCode.questionLib:82
      const questionName = _questionLib.stack.pop();  // > CustomCode.questionLib:83
      _debugPrint("End question: " + questionName);  // > CustomCode.questionLib:84
      _view._addInteraction(_nullFunction, {action:"questionEnd", name:questionName}, {element: "questionLib", property: "value"});  // > CustomCode.questionLib:85
    }  // > CustomCode.questionLib:86
  }  // > CustomCode.questionLib:87
  // for assessment.json marks  // > CustomCode.questionLib:88
  function awardQuestionMarks(marks=1) {  // > CustomCode.questionLib:89
    if (isQuestionStarted()) {  // > CustomCode.questionLib:90
      const questionName = getPendingQuestion();  // > CustomCode.questionLib:91
      _questionLib.questionMarksAwarded[questionName] = 1;  // > CustomCode.questionLib:92
        // > CustomCode.questionLib:93
      for (; _questionLib.questionMarksAwarded[questionName] < marks + 1; _questionLib.questionMarksAwarded[questionName]++) {  // > CustomCode.questionLib:94
        _view._addInteraction(_nullFunction, _questionLib.questionMarksAwarded[questionName], {element:"questionLib", property:"awardMarkFor"+questionName});  // > CustomCode.questionLib:95
      }  // > CustomCode.questionLib:96
    }  // > CustomCode.questionLib:97
  }  // > CustomCode.questionLib:98
  function resetQuestionMarks(questionName) {  // > CustomCode.questionLib:99
    _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.questionLib:100
  }  // > CustomCode.questionLib:101
  function questionInstantMark(questionName, message) {  // > CustomCode.questionLib:102
    let shouldAwardMark = true;  // > CustomCode.questionLib:103
    if (questionName in _questionLib.instantMarksAwarded) {  // > CustomCode.questionLib:104
      if (message in _questionLib.instantMarksAwarded[questionName]) {  // > CustomCode.questionLib:105
        shouldAwardMark = false;  // > CustomCode.questionLib:106
      }  // > CustomCode.questionLib:107
    } else {  // > CustomCode.questionLib:108
      _questionLib.instantMarksAwarded[questionName] = Object.create(null);  // > CustomCode.questionLib:109
    }  // > CustomCode.questionLib:110
    _questionLib.instantMarksAwarded[questionName][message] = true;  // > CustomCode.questionLib:111
    if (shouldAwardMark) {  // > CustomCode.questionLib:112
      startQuestion(questionName);  // > CustomCode.questionLib:113
      _debugPrint("" + message);  // > CustomCode.questionLib:114
      if (message) {  // > CustomCode.questionLib:115
        addQuestionHistory(message);  // > CustomCode.questionLib:116
      } else {  // > CustomCode.questionLib:117
        _flushQuestionHistory(questionName);  // > CustomCode.questionLib:118
      }  // > CustomCode.questionLib:119
      awardQuestionMarks();  // > CustomCode.questionLib:120
      endQuestion();  // > CustomCode.questionLib:121
    }  // > CustomCode.questionLib:122
  }  // > CustomCode.questionLib:123
  function questionAppendHistory(questionName, message) {  // > CustomCode.questionLib:124
    if (!(questionName in _questionLib.questionMarksAwarded)) {  // > CustomCode.questionLib:125
      _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.questionLib:126
    }  // > CustomCode.questionLib:127
    let shouldPushQuestion = getPendingQuestion() !== questionName;  // > CustomCode.questionLib:128
    if (shouldPushQuestion) {  // > CustomCode.questionLib:129
      startQuestion(questionName);  // > CustomCode.questionLib:130
    }  // > CustomCode.questionLib:131
    awardQuestionMarks(_questionLib.questionMarksAwarded[questionName])  // > CustomCode.questionLib:132
    addQuestionHistory(message);  // > CustomCode.questionLib:133
    if (shouldPushQuestion) {  // > CustomCode.questionLib:134
      endQuestion();  // > CustomCode.questionLib:135
    }  // > CustomCode.questionLib:136
  }  // > CustomCode.questionLib:137
  function resetQuestionHistory(questionName) {  // > CustomCode.questionLib:138
    _questionLib.history[questionName] = [];  // > CustomCode.questionLib:139
  }  // > CustomCode.questionLib:140
  function resetQuestion(questionName) {  // > CustomCode.questionLib:141
    resetQuestionHistory(questionName);  // > CustomCode.questionLib:142
    resetQuestionMarks(questionName);  // > CustomCode.questionLib:143
  }  // > CustomCode.questionLib:144

  // copy into custom function  // > CustomCode.Lib Page:1
  document.onkeydown = function(evt) {  // > CustomCode.Lib Page:2
    evt = evt || window.event;  // > CustomCode.Lib Page:3
    var isEscape = false;  // > CustomCode.Lib Page:4
    if ("key" in evt) {  // > CustomCode.Lib Page:5
      isEscape = (evt.key === "Escape" || evt.key === "Esc");  // > CustomCode.Lib Page:6
    }   // > CustomCode.Lib Page:7
    else {  // > CustomCode.Lib Page:8
      isEscape = (evt.keyCode === 27);  // > CustomCode.Lib Page:9
    }  // > CustomCode.Lib Page:10
    if (isEscape) {  // > CustomCode.Lib Page:11
      //alert("Escape");  // > CustomCode.Lib Page:12
      //escKeyPressed = true  // > CustomCode.Lib Page:13
    escKeyPressed = !escKeyPressed; // Toggle escKeyPressed  // > CustomCode.Lib Page:14
    }  // > CustomCode.Lib Page:15
      // > CustomCode.Lib Page:16
  }   // > CustomCode.Lib Page:17

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    // Initialising the cards  // > Initialization.Init Page:1
    var curX = -cardWidth * 9 / 2;  // > Initialization.Init Page:2
    for(var i = 1; i <= 20; i++){  // > Initialization.Init Page:3
      let idx = i - 1;  // > Initialization.Init Page:4
      cardVal[idx] = i;  // > Initialization.Init Page:5
      cardX[idx] = curX;  // > Initialization.Init Page:6
      if(i <= 10)  // > Initialization.Init Page:7
        cardY[idx] = cardHeight * 2;  // > Initialization.Init Page:8
      else  // > Initialization.Init Page:9
        cardY[idx] = cardHeight;  // > Initialization.Init Page:10
          // > Initialization.Init Page:11
      initX[idx] = cardX[idx], initY[idx] = cardY[idx];  // > Initialization.Init Page:12
        // > Initialization.Init Page:13
      curX += cardWidth;  // > Initialization.Init Page:14
      if(i == 10)  // > Initialization.Init Page:15
        curX = -cardWidth * 9 / 2;  // > Initialization.Init Page:16
          // > Initialization.Init Page:17
      // whichGroup identifies which group the card is in currently. If the card is not in a group, whichGroup will be null  // > Initialization.Init Page:18
      whichGroup[idx] = null;  // > Initialization.Init Page:19
      // whichCricle identifies which circle the card is in currently. If the card is not in a cricle, whichCricle will be -1.  // > Initialization.Init Page:20
      whichCircle[idx] = -1;  // > Initialization.Init Page:21
    }  // > Initialization.Init Page:22
        // > Initialization.Init Page:23
        // > Initialization.Init Page:24
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["init Shape"]) return;
    // shapePoints is to define the points that we are going to use for the 2d polygons  // > Initialization.init Shape:1
    var penRadius = triRadius = shapeLength / 2;  // > Initialization.init Shape:2
    shapePoints = {  // > Initialization.init Shape:3
      "triangle": [  // > Initialization.init Shape:4
        [0, triRadius * Math.sin(Math.PI / 3), -triRadius * Math.sin(Math.PI / 3), 0],  // > Initialization.init Shape:5
        [triRadius, -triRadius * Math.cos(Math.PI / 3), -triRadius * Math.cos(Math.PI / 3), triRadius]  // > Initialization.init Shape:6
      ],  // > Initialization.init Shape:7
      "square": [  // > Initialization.init Shape:8
        [-shapeLength / 2, shapeLength / 2, shapeLength / 2, -shapeLength / 2, -shapeLength / 2],  // > Initialization.init Shape:9
        [shapeLength / 2, shapeLength / 2, -shapeLength / 2, -shapeLength / 2, shapeLength / 2]  // > Initialization.init Shape:10
      ],  // > Initialization.init Shape:11
      "pentagon": [  // > Initialization.init Shape:12
        [0, penRadius * Math.cos(Math.PI / 10), penRadius * Math.sin(Math.PI / 5), -penRadius * Math.sin(Math.PI / 5), -penRadius * Math.cos(Math.PI / 10), 0],  // > Initialization.init Shape:13
        [penRadius, penRadius * Math.sin(Math.PI / 10), -penRadius * Math.cos(Math.PI / 5), -penRadius * Math.cos(Math.PI / 5), penRadius * Math.sin(Math.PI / 10), penRadius]  // > Initialization.init Shape:14
      ]  // > Initialization.init Shape:15
    };  // > Initialization.init Shape:16
    // circleCoord defines the coordinates of the circles relative to the center  // > Initialization.init Shape:17
    penRadius = shapeLength * 2/3;  // > Initialization.init Shape:18
    triRadius = shapeLength * 1/2;  // > Initialization.init Shape:19
    circleCoord = {  // > Initialization.init Shape:20
      "triangle": [  // > Initialization.init Shape:21
        [-triRadius * Math.sin(Math.PI / 3), triRadius * Math.sin(Math.PI / 3), 0],  // > Initialization.init Shape:22
        [triRadius * Math.cos(Math.PI / 3), triRadius * Math.cos(Math.PI / 3), -triRadius]  // > Initialization.init Shape:23
      ],  // > Initialization.init Shape:24
      "square": [  // > Initialization.init Shape:25
        [-shapeLength * 3/4, 0, shapeLength * 3/4, 0],  // > Initialization.init Shape:26
        [0, shapeLength * 3/4, 0, -shapeLength * 3/4]  // > Initialization.init Shape:27
      ],  // > Initialization.init Shape:28
      "pentagon": [  // > Initialization.init Shape:29
        [-penRadius * Math.sin(Math.PI / 5), penRadius * Math.sin(Math.PI / 5), penRadius * Math.sin(Math.PI * 2/5), 0, -penRadius * Math.sin(Math.PI * 2/5)],  // > Initialization.init Shape:30
        [penRadius * Math.cos(Math.PI / 5), penRadius * Math.cos(Math.PI / 5), -penRadius * Math.cos(Math.PI * 2/5), -penRadius, -penRadius * Math.cos(Math.PI * 2/5)]  // > Initialization.init Shape:31
      ]  // > Initialization.init Shape:32
    };  // > Initialization.init Shape:33
    // the color of the shapes    // > Initialization.init Shape:34
    shapeColor = {  // > Initialization.init Shape:35
      "triangle": "yellow",  // > Initialization.init Shape:36
      "square": "lightblue",  // > Initialization.init Shape:37
      "pentagon": "red"  // > Initialization.init Shape:38
    };  // > Initialization.init Shape:39
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Task"]) return;
    if(curTask == undefined)  // > Initialization.Init Task:1
      curTask = 1;  // > Initialization.Init Task:2
    // defining the different tasks  // > Initialization.Init Task:3
    task = [  // > Initialization.Init Task:4
      [  // > Initialization.Init Task:5
        "Choose any 4 cards and place them in the triangle and circles.",  // > Initialization.Init Task:6
        "The number in the triangle must be the average of the three numbers in the circles surrounding the triangle.",  // > Initialization.Init Task:7
        ["triangle"]  // > Initialization.Init Task:8
      ],  // > Initialization.Init Task:9
      [  // > Initialization.Init Task:10
        "Choose any 9 cards and place them in the triangle, square and circles.",  // > Initialization.Init Task:11
        "(i) The number in the triangle must be the average of the three numbers in the circles surrounding the triangle.<br/>(ii) The number in the square must be the average of the four numbers in the circles surrounding the square.",  // > Initialization.Init Task:12
        ["triangle", "square"]  // > Initialization.Init Task:13
      ],  // > Initialization.Init Task:14
      [  // > Initialization.Init Task:15
        "Choose the given 3 cards (highlighted in yellow) and decide the 4th card number and place all of them in the triangle and circles.",  // > Initialization.Init Task:16
        "The number in the triangle must be the average of the three numbers in the circles surrounding the triangle.",  // > Initialization.Init Task:17
        ["triangle"]  // > Initialization.Init Task:18
      ],  // > Initialization.Init Task:19
      [  // > Initialization.Init Task:20
        "Select four consecutive numbers from the deck of cards to place them in the pattern with the same condition.",  // > Initialization.Init Task:21
        "The number in the triangle must be the average of the three numbers in the circles surrounding the triangle.",  // > Initialization.Init Task:22
        ["triangle"]  // > Initialization.Init Task:23
      ],  // > Initialization.Init Task:24
      [  // > Initialization.Init Task:25
        "Place the numbers, 1, 2, 3, 4, 5, 6, 7 and 8 into the two patterns.",  // > Initialization.Init Task:26
        "The number in the triangle must be the average of the three numbers in the circles surrounding the triangle.",  // > Initialization.Init Task:27
        ["triangle", "triangle"]  // > Initialization.Init Task:28
      ],  // > Initialization.Init Task:29
        // > Initialization.Init Task:30
      [  // > Initialization.Init Task:31
        "Place the number cards 1 to 12 into the two patterns below.",  // > Initialization.Init Task:32
        "The number in the pentagon must be the average of the five numbers in the circles surrounding the pentagon.",  // > Initialization.Init Task:33
        ["pentagon", "pentagon"]  // > Initialization.Init Task:34
      ],  // > Initialization.Init Task:35
      [  // > Initialization.Init Task:36
        "Place the number cards 1 to 12 into the three patterns below.",  // > Initialization.Init Task:37
        "The number in the triangle must be the average of the three numbers in the circles surrounding the triangle.",  // > Initialization.Init Task:38
        ["triangle", "triangle", "triangle"]  // > Initialization.Init Task:39
      ],  // > Initialization.Init Task:40
    ];  // > Initialization.Init Task:41
    // hightlight cards specific to the task  // > Initialization.Init Task:42
    //lookang to enable task1 n 2  // > Initialization.Init Task:43
    if(curTask == 1|| curTask == 2|| curTask == 4){  // > Initialization.Init Task:44
      for (var i=0; i<numOfCards ; i++) {  // > Initialization.Init Task:45
      enabledposition[i] = "ENABLED_ANY"  // > Initialization.Init Task:46
      cardColor[i] =highlightColor  // > Initialization.Init Task:47
      visiblity[i] = true  // > Initialization.Init Task:48
    }  // > Initialization.Init Task:49
      }  // > Initialization.Init Task:50
      //lookang  // > Initialization.Init Task:51
    if(curTask == 3){  // > Initialization.Init Task:52
      cardColor[12] = cardColor[16] = cardColor[17] = highlightColor;  // > Initialization.Init Task:53
      enabledposition[12] = enabledposition[16] =enabledposition[17] = "ENABLED_ANY"  // > Initialization.Init Task:54
    visiblity[12] = true  // > Initialization.Init Task:55
    visiblity[16] = true  // > Initialization.Init Task:56
    visiblity[17] = true  // > Initialization.Init Task:57
    //assume (13+17+18)/3 = 16  // > Initialization.Init Task:58
     enabledposition[15] = "ENABLED_ANY"  // > Initialization.Init Task:59
     // just enable all  // > Initialization.Init Task:60
     for (var i=0; i<numOfCards ; i++) {  // > Initialization.Init Task:61
      enabledposition[i] = "ENABLED_ANY"  // > Initialization.Init Task:62
      visiblity[i] = true  // > Initialization.Init Task:63
      //cardColor[i] =highlightColor  // > Initialization.Init Task:64
    }  // > Initialization.Init Task:65
       // > Initialization.Init Task:66
       // > Initialization.Init Task:67
    }  // > Initialization.Init Task:68
    else if(curTask == 5){  // > Initialization.Init Task:69
      for(var i = 0; i < 8; i++){  // > Initialization.Init Task:70
        cardColor[i] = highlightColor;  // > Initialization.Init Task:71
        enabledposition[i] = "ENABLED_ANY"  // > Initialization.Init Task:72
         visiblity[i] = true  // > Initialization.Init Task:73
      }  // > Initialization.Init Task:74
    }  // > Initialization.Init Task:75
    else if(curTask == 6 || curTask == 7){  // > Initialization.Init Task:76
      for(var i = 0; i < 12; i++){  // > Initialization.Init Task:77
        cardColor[i] = highlightColor;  // > Initialization.Init Task:78
        enabledposition[i] = "ENABLED_ANY"  // > Initialization.Init Task:79
        visiblity[i] = true  // > Initialization.Init Task:80
      }  // > Initialization.Init Task:81
    }  // > Initialization.Init Task:82
    // set the text  // > Initialization.Init Task:83
    instructionStr = task[curTask - 1][0];  // > Initialization.Init Task:84
    ruleStr = task[curTask - 1][1];  // > Initialization.Init Task:85
    // create the groups  // > Initialization.Init Task:86
    for(var i = 0; i < task[curTask - 1][2].length; i++) {  // > Initialization.Init Task:87
      addGroup(task[curTask - 1][2][i]);  // > Initialization.Init Task:88
    }  // > Initialization.Init Task:89
    _view.comboBox.setProperty("SelectedOptions", [curTask]);  // > Initialization.Init Task:90
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

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
    _view = new astoundingly_average_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.taskText2.linkProperty("Text",  function() { return "Instructions: " +instructionStr; } ); // HtmlView Page linking property 'Text' for element 'taskText2'
          _view.taskText2.linkProperty("Font",  function() { return taskFont; }, function(_v) { taskFont = _v; } ); // HtmlView Page linking property 'Font' for element 'taskText2'
          _view.label.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'label'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  stopThinkingPlayback(false);
  var selected = _view.comboBox.getProperty("SelectedOptions")[0];
  curTask = parseInt(selected);
  _reset();

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.checkTask.setAction("OnClick", function(_data,_info) {
  checkTask();

}); // HtmlView Page setting action 'OnClick' for element 'checkTask'
          _view.checkTask.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'checkTask'
          _view.reset.setAction("OnClick", function(_data,_info) {
  stopThinkingPlayback(false);
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'reset'
          _view.reset.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'reset'
          _view.thinkingButton.setAction("OnClick", function(_data,_info) {
  showThinkingProcess();

}); // HtmlView Page setting action 'OnClick' for element 'thinkingButton'
          _view.thinkingButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'thinkingButton'
          _view.taskText.linkProperty("Text",  function() { return "<b>Instructions</b>:<br/>" + instructionStr + "<br/><b>Rules</b>:<br/>" + ruleStr; } ); // HtmlView Page linking property 'Text' for element 'taskText'
          _view.taskText.linkProperty("Font",  function() { return taskFont; }, function(_v) { taskFont = _v; } ); // HtmlView Page linking property 'Font' for element 'taskText'
          _view.shapeSet.linkProperty("NumberOfElements",  function() { return numOfCards; }, function(_v) { numOfCards = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet'
          _view.shapeSet.setAction("OnRelease", function(_data,_info) {
  var minDist = dragThreshold ** 2;
  var curX = cardX[interact], curY = cardY[interact];
  var choosenGroup = null, choosenCircle = -1;
  for (groupObj of groupArr) {
    for (var i = 0; i < groupObj.xPos.length; i++) {
      if (groupObj.val[i] != -1)
        continue;
      var cX = groupObj.xPos[i];
      var cY = groupObj.yPos[i];
      var curDist = (curX - cX) ** 2 + (curY - cY) ** 2;
      if (curDist < minDist) {
        choosenGroup = groupObj;
        choosenCircle = i;
        minDist = curDist;
      }
    }
  }
  if (whichGroup[interact] != null) {
    whichGroup[interact].val[whichCircle[interact]] = -1;
    whichGroup[interact] = null;
  }
  if (choosenGroup == null) {
    cardX[interact] = initX[interact];
    cardY[interact] = initY[interact];
  } else {
    cardX[interact] = choosenGroup.xPos[choosenCircle];
    cardY[interact] = choosenGroup.yPos[choosenCircle];
    choosenGroup.val[choosenCircle] = cardVal[interact];
    whichGroup[interact] = choosenGroup;
    whichCircle[interact] = choosenCircle;
  }
  // console.log(groupArr);

}); // HtmlView Page setting action 'OnRelease' for element 'shapeSet'
          _view.shapeSet.linkProperty("FillColor",  function() { return cardColor; }, function(_v) { cardColor = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeX",  function() { return cardWidth; }, function(_v) { cardWidth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet'
          _view.shapeSet.linkProperty("X",  function() { return cardX; }, function(_v) { cardX = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet'
          _view.shapeSet.linkProperty("Y",  function() { return cardY; }, function(_v) { cardY = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeY",  function() { return cardHeight; }, function(_v) { cardHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet'
          _view.shapeSet.linkProperty("EnabledPosition",  function() { return enabledposition; }, function(_v) { enabledposition = _v; } ); // HtmlView Page linking property 'EnabledPosition' for element 'shapeSet'
          _view.shapeSet.linkProperty("ElementInteracted",  function() { return interact; }, function(_v) { interact = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'shapeSet'
          _view.textSet.linkProperty("NumberOfElements",  function() { return numOfCards; }, function(_v) { numOfCards = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet'
          _view.textSet.linkProperty("X",  function() { return cardX; }, function(_v) { cardX = _v; } ); // HtmlView Page linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return cardY; }, function(_v) { cardY = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return cardVal; }, function(_v) { cardVal = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet'
          _view.textSet.linkProperty("Visibility",  function() { return visiblity; }, function(_v) { visiblity = _v; } ); // HtmlView Page linking property 'Visibility' for element 'textSet'
          _view.textSet.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'textSet'
          _view.taskText3.linkProperty("Text",  function() { return "<br/><b>Rules</b>:<br/>" + ruleStr; } ); // HtmlView Page linking property 'Text' for element 'taskText3'
          _view.taskText3.linkProperty("Font",  function() { return taskFont; }, function(_v) { taskFont = _v; } ); // HtmlView Page linking property 'Font' for element 'taskText3'
          _view.html.linkProperty("Display",  function() { return escKeyPressed?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'html'
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
function astoundingly_average_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = astoundingly_average_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Intro Page','./astoundingly_average_Intro_1.html');

  return _view;
} // end of main function

function astoundingly_average_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"btnContainer", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'btnContainer'
      .setProperty("CSS",{   "justify-content": "center",  "align-items": "flex-start",  "flex-wrap": "wrap",  "gap": "8px" }) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'btnContainer'
      .setProperty("Display","flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'btnContainer'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"taskText2", _view.btnContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'taskText2'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView Page: setting property 'TextAlign' for element 'taskText2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'taskText2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.btnContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      .setProperty("Text","Select Task: ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.btnContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBox'
      .setProperty("Options",[1, 2, 3, 4, 5, 6, 7]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.button,"checkTask", _view.btnContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'checkTask'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'checkTask'
      .setProperty("Text","🤔Check") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'checkTask'
      ;

    _view._addElement(EJSS_INTERFACE.button,"reset", _view.btnContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'reset'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'reset'
      .setProperty("Text","↻Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'reset'
      ;

    _view._addElement(EJSS_INTERFACE.button,"thinkingButton", _view.btnContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'thinkingButton'
      .setProperty("Width","16%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'thinkingButton'
      .setProperty("Text","Show Thinking") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'thinkingButton'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"taskText", _view.btnContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'taskText'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'taskText'
      .setProperty("CSS",{    "border": "2px solid black" }) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'taskText'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView Page: setting property 'TextAlign' for element 'taskText'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'taskText'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"mainPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'mainPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","80vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",-6) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("YFixedTick",-5) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("XTickStep",12) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"groupSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'groupSet'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSet'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"solverText", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'solverText'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'solverText'
      .setProperty("CSS",{    "border": "2px solid #4f6f52",   "background": "#f7fbf5",   "padding": "10px",   "border-radius": "8px" }) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'solverText'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView Page: setting property 'TextAlign' for element 'solverText'
      .setProperty("Text","<b>Thinking guide</b>: Try the task yourself first. Then click <b>Show Thinking</b> to watch one possible solution, or to see why a task has no solution.") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'solverText'
      .setProperty("Font",taskFont) // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'solverText'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'solverText'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"taskText3", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'taskText3'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'taskText3'
      .setProperty("CSS",{    "border": "2px solid black" }) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'taskText3'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView Page: setting property 'TextAlign' for element 'taskText3'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'taskText3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<h2>Hints:</h2> <p>Task 4 has no solution. Suggest a reason why?</p> <p>Task 5 has solutions that the final averages are 4 and 5 respectively, there are two possible solutions. Do you know both of them?</p> <p>Task 6 can take to use final averages in the middle of the range of numbers, like 5 and 8 for example. There should be quite a few solutions here.</p>  <p>Task 7 has no solution.Suggest a reason why?</p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new astoundingly_average("_topFrame","_ejs_library/",null);
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
