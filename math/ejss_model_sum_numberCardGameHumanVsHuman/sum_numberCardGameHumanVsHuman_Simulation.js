function sum_numberCardGameHumanVsHuman(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var cardsRemaining; // EjsS Model.Variables.EditableVariable.cardsRemaining
  var toWinMultiplesof; // EjsS Model.Variables.EditableVariable.toWinMultiplesof
  var cardCombinations; // EjsS Model.Variables.EditableVariable.cardCombinations

  var isGameStarted; // EjsS Model.Variables.stateVariables.isGameStarted
  var resetButtonText; // EjsS Model.Variables.stateVariables.resetButtonText
  var startButtonText; // EjsS Model.Variables.stateVariables.startButtonText
  var startButtonSetText; // EjsS Model.Variables.stateVariables.startButtonSetText
  var attemptHistory; // EjsS Model.Variables.stateVariables.attemptHistory
  var attemptState; // EjsS Model.Variables.stateVariables.attemptState
  var gameId; // EjsS Model.Variables.stateVariables.gameId

  var clicked; // EjsS Model.Variables.cardGameVariables.clicked
  var numberArray; // EjsS Model.Variables.cardGameVariables.numberArray
  var n; // EjsS Model.Variables.cardGameVariables.n
  var currentSum; // EjsS Model.Variables.cardGameVariables.currentSum
  var cardWidth; // EjsS Model.Variables.cardGameVariables.cardWidth
  var cardHeight; // EjsS Model.Variables.cardGameVariables.cardHeight
  var cardX; // EjsS Model.Variables.cardGameVariables.cardX
  var cardY; // EjsS Model.Variables.cardGameVariables.cardY
  var cardColors; // EjsS Model.Variables.cardGameVariables.cardColors
  var cardAvailable; // EjsS Model.Variables.cardGameVariables.cardAvailable
  var playerX; // EjsS Model.Variables.cardGameVariables.playerX
  var playerY; // EjsS Model.Variables.cardGameVariables.playerY
  var playerIdx; // EjsS Model.Variables.cardGameVariables.playerIdx
  var turn; // EjsS Model.Variables.cardGameVariables.turn
  var turnText; // EjsS Model.Variables.cardGameVariables.turnText
  var player1Color; // EjsS Model.Variables.cardGameVariables.player1Color
  var player2Color; // EjsS Model.Variables.cardGameVariables.player2Color
  var cardColorDefault; // EjsS Model.Variables.cardGameVariables.cardColorDefault
  var gameStart; // EjsS Model.Variables.cardGameVariables.gameStart
  var gameOver; // EjsS Model.Variables.cardGameVariables.gameOver
  var minX; // EjsS Model.Variables.cardGameVariables.minX
  var maxX; // EjsS Model.Variables.cardGameVariables.maxX
  var minY; // EjsS Model.Variables.cardGameVariables.minY
  var maxY; // EjsS Model.Variables.cardGameVariables.maxY
  var font; // EjsS Model.Variables.cardGameVariables.font
  var isStrategistThinking; // EjsS Model.Variables.cardGameVariables.isStrategistThinking
  var humanTurnPrompt; // EjsS Model.Variables.cardGameVariables.humanTurnPrompt
  var computerTurnPrompt; // EjsS Model.Variables.cardGameVariables.computerTurnPrompt
  var humanWinPrompt; // EjsS Model.Variables.cardGameVariables.humanWinPrompt
  var computerWinPrompt; // EjsS Model.Variables.cardGameVariables.computerWinPrompt
  var cardsActive; // EjsS Model.Variables.cardGameVariables.cardsActive
  var enabledPosition; // EjsS Model.Variables.cardGameVariables.enabledPosition
  var availableMoves; // EjsS Model.Variables.cardGameVariables.availableMoves

  var t; // EjsS Model.Variables.animate.t
  var dt; // EjsS Model.Variables.animate.dt
  var animate; // EjsS Model.Variables.animate.animate
  var animateInit; // EjsS Model.Variables.animate.animateInit
  var speedX; // EjsS Model.Variables.animate.speedX
  var sppedY; // EjsS Model.Variables.animate.sppedY
  var accelX; // EjsS Model.Variables.animate.accelX
  var aceelY; // EjsS Model.Variables.animate.aceelY
  var animateDuration; // EjsS Model.Variables.animate.animateDuration
  var animateIdx; // EjsS Model.Variables.animate.animateIdx
  var destX; // EjsS Model.Variables.animate.destX
  var destY; // EjsS Model.Variables.animate.destY
  var cardInteract; // EjsS Model.Variables.animate.cardInteract


  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      cardsRemaining : cardsRemaining,
      toWinMultiplesof : toWinMultiplesof,
      cardCombinations : cardCombinations,
      isGameStarted : isGameStarted,
      resetButtonText : resetButtonText,
      startButtonText : startButtonText,
      startButtonSetText : startButtonSetText,
      attemptHistory : attemptHistory,
      attemptState : attemptState,
      gameId : gameId,
      clicked : clicked,
      numberArray : numberArray,
      n : n,
      currentSum : currentSum,
      cardWidth : cardWidth,
      cardHeight : cardHeight,
      cardX : cardX,
      cardY : cardY,
      cardColors : cardColors,
      cardAvailable : cardAvailable,
      playerX : playerX,
      playerY : playerY,
      playerIdx : playerIdx,
      turn : turn,
      turnText : turnText,
      player1Color : player1Color,
      player2Color : player2Color,
      cardColorDefault : cardColorDefault,
      gameStart : gameStart,
      gameOver : gameOver,
      minX : minX,
      maxX : maxX,
      minY : minY,
      maxY : maxY,
      font : font,
      isStrategistThinking : isStrategistThinking,
      humanTurnPrompt : humanTurnPrompt,
      computerTurnPrompt : computerTurnPrompt,
      humanWinPrompt : humanWinPrompt,
      computerWinPrompt : computerWinPrompt,
      cardsActive : cardsActive,
      enabledPosition : enabledPosition,
      availableMoves : availableMoves,
      t : t,
      dt : dt,
      animate : animate,
      animateInit : animateInit,
      speedX : speedX,
      sppedY : sppedY,
      accelX : accelX,
      aceelY : aceelY,
      animateDuration : animateDuration,
      animateIdx : animateIdx,
      destX : destX,
      destY : destY,
      cardInteract : cardInteract
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.cardsRemaining != "undefined") cardsRemaining = json.cardsRemaining;
    if(typeof json.toWinMultiplesof != "undefined") toWinMultiplesof = json.toWinMultiplesof;
    if(typeof json.cardCombinations != "undefined") cardCombinations = json.cardCombinations;
    if(typeof json.isGameStarted != "undefined") isGameStarted = json.isGameStarted;
    if(typeof json.resetButtonText != "undefined") resetButtonText = json.resetButtonText;
    if(typeof json.startButtonText != "undefined") startButtonText = json.startButtonText;
    if(typeof json.startButtonSetText != "undefined") startButtonSetText = json.startButtonSetText;
    if(typeof json.attemptHistory != "undefined") attemptHistory = json.attemptHistory;
    if(typeof json.attemptState != "undefined") attemptState = json.attemptState;
    if(typeof json.gameId != "undefined") gameId = json.gameId;
    if(typeof json.clicked != "undefined") clicked = json.clicked;
    if(typeof json.numberArray != "undefined") numberArray = json.numberArray;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.currentSum != "undefined") currentSum = json.currentSum;
    if(typeof json.cardWidth != "undefined") cardWidth = json.cardWidth;
    if(typeof json.cardHeight != "undefined") cardHeight = json.cardHeight;
    if(typeof json.cardX != "undefined") cardX = json.cardX;
    if(typeof json.cardY != "undefined") cardY = json.cardY;
    if(typeof json.cardColors != "undefined") cardColors = json.cardColors;
    if(typeof json.cardAvailable != "undefined") cardAvailable = json.cardAvailable;
    if(typeof json.playerX != "undefined") playerX = json.playerX;
    if(typeof json.playerY != "undefined") playerY = json.playerY;
    if(typeof json.playerIdx != "undefined") playerIdx = json.playerIdx;
    if(typeof json.turn != "undefined") turn = json.turn;
    if(typeof json.turnText != "undefined") turnText = json.turnText;
    if(typeof json.player1Color != "undefined") player1Color = json.player1Color;
    if(typeof json.player2Color != "undefined") player2Color = json.player2Color;
    if(typeof json.cardColorDefault != "undefined") cardColorDefault = json.cardColorDefault;
    if(typeof json.gameStart != "undefined") gameStart = json.gameStart;
    if(typeof json.gameOver != "undefined") gameOver = json.gameOver;
    if(typeof json.minX != "undefined") minX = json.minX;
    if(typeof json.maxX != "undefined") maxX = json.maxX;
    if(typeof json.minY != "undefined") minY = json.minY;
    if(typeof json.maxY != "undefined") maxY = json.maxY;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.isStrategistThinking != "undefined") isStrategistThinking = json.isStrategistThinking;
    if(typeof json.humanTurnPrompt != "undefined") humanTurnPrompt = json.humanTurnPrompt;
    if(typeof json.computerTurnPrompt != "undefined") computerTurnPrompt = json.computerTurnPrompt;
    if(typeof json.humanWinPrompt != "undefined") humanWinPrompt = json.humanWinPrompt;
    if(typeof json.computerWinPrompt != "undefined") computerWinPrompt = json.computerWinPrompt;
    if(typeof json.cardsActive != "undefined") cardsActive = json.cardsActive;
    if(typeof json.enabledPosition != "undefined") enabledPosition = json.enabledPosition;
    if(typeof json.availableMoves != "undefined") availableMoves = json.availableMoves;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.animate != "undefined") animate = json.animate;
    if(typeof json.animateInit != "undefined") animateInit = json.animateInit;
    if(typeof json.speedX != "undefined") speedX = json.speedX;
    if(typeof json.sppedY != "undefined") sppedY = json.sppedY;
    if(typeof json.accelX != "undefined") accelX = json.accelX;
    if(typeof json.aceelY != "undefined") aceelY = json.aceelY;
    if(typeof json.animateDuration != "undefined") animateDuration = json.animateDuration;
    if(typeof json.animateIdx != "undefined") animateIdx = json.animateIdx;
    if(typeof json.destX != "undefined") destX = json.destX;
    if(typeof json.destY != "undefined") destY = json.destY;
    if(typeof json.cardInteract != "undefined") cardInteract = json.cardInteract;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["message"] = true;
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["SVG"] = true;
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    cardsRemaining = 3; // EjsS Model.Variables.EditableVariable.cardsRemaining
    toWinMultiplesof = 3; // EjsS Model.Variables.EditableVariable.toWinMultiplesof
    cardCombinations = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // EjsS Model.Variables.EditableVariable.cardCombinations
  });

  _model.addToReset(function() {
    isGameStarted = false; // EjsS Model.Variables.stateVariables.isGameStarted
    resetButtonText = "↻Reset"; // EjsS Model.Variables.stateVariables.resetButtonText
    startButtonText = "Start"; // EjsS Model.Variables.stateVariables.startButtonText
    startButtonSetText = startButtonText; // EjsS Model.Variables.stateVariables.startButtonSetText
    attemptState = {NOT_ATTEMPTED: 0, ATTEMPTED: 1, FIRST_TRY: 2, COMPLETED: 3}; // EjsS Model.Variables.stateVariables.attemptState
  });

  _model.addToReset(function() {
    numberArray = [1, 2, 3, 4, 5]; // EjsS Model.Variables.cardGameVariables.numberArray
    currentSum = 0; // EjsS Model.Variables.cardGameVariables.currentSum
    cardWidth = 5; // EjsS Model.Variables.cardGameVariables.cardWidth
    cardHeight = 7; // EjsS Model.Variables.cardGameVariables.cardHeight
    cardX = []; // EjsS Model.Variables.cardGameVariables.cardX
    cardY = []; // EjsS Model.Variables.cardGameVariables.cardY
    cardColors = []; // EjsS Model.Variables.cardGameVariables.cardColors
    cardAvailable = []; // EjsS Model.Variables.cardGameVariables.cardAvailable
    playerX = []; // EjsS Model.Variables.cardGameVariables.playerX
    playerY = -cardHeight; // EjsS Model.Variables.cardGameVariables.playerY
    playerIdx = 0; // EjsS Model.Variables.cardGameVariables.playerIdx
    turn = 0; // EjsS Model.Variables.cardGameVariables.turn
    turnText = "It is Computer Player 1’s turn!"; // EjsS Model.Variables.cardGameVariables.turnText
    player1Color = "#ef5350"; // EjsS Model.Variables.cardGameVariables.player1Color
    player2Color = "#29b6f6"; // EjsS Model.Variables.cardGameVariables.player2Color
    cardColorDefault = "orange"; // EjsS Model.Variables.cardGameVariables.cardColorDefault
    gameStart = 0; // EjsS Model.Variables.cardGameVariables.gameStart
    gameOver = 0; // EjsS Model.Variables.cardGameVariables.gameOver
    minY = -cardHeight * 3/2; // EjsS Model.Variables.cardGameVariables.minY
    maxY = cardHeight * 3/2; // EjsS Model.Variables.cardGameVariables.maxY
    font = "normal normal 2vw"; // EjsS Model.Variables.cardGameVariables.font
    isStrategistThinking = false; // EjsS Model.Variables.cardGameVariables.isStrategistThinking
    humanTurnPrompt = "It is your turn"; // EjsS Model.Variables.cardGameVariables.humanTurnPrompt
    computerTurnPrompt = "It is the computer's turn"; // EjsS Model.Variables.cardGameVariables.computerTurnPrompt
    humanWinPrompt = "You win!"; // EjsS Model.Variables.cardGameVariables.humanWinPrompt
    computerWinPrompt = "The computer won"; // EjsS Model.Variables.cardGameVariables.computerWinPrompt
    cardsActive = false; // EjsS Model.Variables.cardGameVariables.cardsActive
    enabledPosition = new Array(n); // EjsS Model.Variables.cardGameVariables.enabledPosition
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.cardGameVariables.enabledPosition
        enabledPosition[_i0] = "ENABLED_NO_MOVE";  // EjsS Model.Variables.cardGameVariables.enabledPosition
      }
    }());
    availableMoves = new Array(7); // EjsS Model.Variables.cardGameVariables.availableMoves
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.animate.t
    dt = 1/20; // EjsS Model.Variables.animate.dt
    animate = false; // EjsS Model.Variables.animate.animate
    animateInit = false; // EjsS Model.Variables.animate.animateInit
    animateDuration = 1; // EjsS Model.Variables.animate.animateDuration
  });

  _model.addToReset(function() {
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(true);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  function init() {  // > CustomCode.init:1
    // initialising the numbers  // > CustomCode.init:2
    numberArray = [], cardAvailable = [];  // > CustomCode.init:3
    for(var i = 0; i < n; i++) {  // > CustomCode.init:4
      numberArray[i] = i + 1;  // > CustomCode.init:5
      cardAvailable[i] = true;  // > CustomCode.init:6
      enabledPosition[i]= "ENABLED_NO_MOVE" //lookang to fix bug of card 8 to 15 not active  // > CustomCode.init:7
    }  // > CustomCode.init:8
    // initialising the x position of the cards  // > CustomCode.init:9
    minX = Math.floor(n / 2) * -cardWidth;  // > CustomCode.init:10
    // if n is even  // > CustomCode.init:11
    if(n % 2 == 0) {  // > CustomCode.init:12
      minX += cardWidth / 2;  // > CustomCode.init:13
    }  // > CustomCode.init:14
    maxX = minX;  // > CustomCode.init:15
    currentSum = 0, cardX = [], cardY = [], cardColors = [], playerX = [];  // > CustomCode.init:16
    for(var i = 0; i < n; i++) {  // > CustomCode.init:17
      cardX[i] = maxX;  // > CustomCode.init:18
      if (i < n - cardsRemaining) {  // > CustomCode.init:19
        playerX[i] = cardX[i] + (cardWidth * cardsRemaining) / 2;  // > CustomCode.init:20
      }  // > CustomCode.init:21
  //    console.log(`cardX[${i}] = ${cardX[i]}`);  // > CustomCode.init:22
      cardY[i] = cardHeight;  // > CustomCode.init:23
      cardColors[i] = cardColorDefault;  // > CustomCode.init:24
      maxX += cardWidth;  // > CustomCode.init:25
      // calculating the current sum  // > CustomCode.init:26
      currentSum += numberArray[i];  // > CustomCode.init:27
    }  // > CustomCode.init:28
    minX -= cardWidth;  // > CustomCode.init:29
      // > CustomCode.init:30
    if (isGameStarted)  // > CustomCode.init:31
      turnText = "Player 1's turn";  // > CustomCode.init:32
  }  // > CustomCode.init:33

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

  function onGameStart () {  // > CustomCode.onGameStart:1
    isGameStarted = true;  // > CustomCode.onGameStart:2
    startButtonSetText = resetButtonText;  // > CustomCode.onGameStart:3
    const cardCount = n;  // > CustomCode.onGameStart:4
    let cardCountIndex = -1;  // > CustomCode.onGameStart:5
    if (typeof(cardCombinations[0]) === 'string') {  // > CustomCode.onGameStart:6
      gameId = cardCombinations.indexOf(String(cardCount));  // > CustomCode.onGameStart:7
      cardCountIndex = cardCombinations.indexOf(String(cardCount));  // > CustomCode.onGameStart:8
    } else if (typeof(cardCombinations[0]) === 'number') {  // > CustomCode.onGameStart:9
      cardCountIndex = cardCombinations.indexOf(cardCount);  // > CustomCode.onGameStart:10
    }  // > CustomCode.onGameStart:11
    if (cardCountIndex === -1) {  // > CustomCode.onGameStart:12
      _tools.showOkDialog("EJSS has modified a variable to an invalid state.");  // > CustomCode.onGameStart:13
    }  // > CustomCode.onGameStart:14
    gameId = cardCountIndex;  // > CustomCode.onGameStart:15
    init();  // > CustomCode.onGameStart:16
      // > CustomCode.onGameStart:17
    if (attemptHistory[gameId] === attemptState.NOT_ATTEMPTED)  // > CustomCode.onGameStart:18
      startQuestion(getQuestionNameFromGameId(gameId)); //moodle  // > CustomCode.onGameStart:19
  }  // > CustomCode.onGameStart:20

  function onGameOver () {  // > CustomCode.onGameOver:1
    var lastPlayerWon = currentSum % toWinMultiplesof === 0;  // > CustomCode.onGameOver:2
    var player1Won = playerIdx % 2 !== 0 ? lastPlayerWon : !lastPlayerWon;  // > CustomCode.onGameOver:3
    var winText = `Player ${player1Won ? 1 : 2} wins`;  // > CustomCode.onGameOver:4
    attemptHistory[gameId] = attemptState.COMPLETED;  // > CustomCode.onGameOver:5
    addQuestionHistory(`Sum remaining: ${currentSum} which is ${lastPlayerWon ? "" : "not "}a multiple of ${toWinMultiplesof}. ${winText}`);  // > CustomCode.onGameOver:6
    awardQuestionMarks(1);  // > CustomCode.onGameOver:7
    endQuestion();  // > CustomCode.onGameOver:8
    _tools.showOkDialog("Game Over! " + winText);  // > CustomCode.onGameOver:9
      // > CustomCode.onGameOver:10
    turnText = winText;  // > CustomCode.onGameOver:11
    gameOver = 1;  // > CustomCode.onGameOver:12
  }  // > CustomCode.onGameOver:13

  function getQuestionNameFromGameId () {  // > CustomCode.getQuestionNameFromGameId:1
    const cardCount = n;  // > CustomCode.getQuestionNameFromGameId:2
    return `${cardCount}-card`;  // > CustomCode.getQuestionNameFromGameId:3
  }  // > CustomCode.getQuestionNameFromGameId:4

  function selectCard (cardInteract, turn) {  // > CustomCode.selectCard:1
    gameStart = 1;  // > CustomCode.selectCard:2
    animate = true;  // > CustomCode.selectCard:3
    animateIdx = cardInteract;  // > CustomCode.selectCard:4
    destX = playerX[playerIdx];  // > CustomCode.selectCard:5
    destY = playerY;  // > CustomCode.selectCard:6
    cardColors[cardInteract] = turn == 0 ? player1Color : player2Color;  // > CustomCode.selectCard:7
    enabledPosition[cardInteract] = "ENABLED_NONE"  // > CustomCode.selectCard:8
    if (isQuestionStarted()) {  // > CustomCode.selectCard:9
      const stateString = numberArray.filter((_, idx) =>  idx !== cardInteract && cardAvailable[idx]).join(' ');  // > CustomCode.selectCard:10
      // console.log (stateString)  // > CustomCode.selectCard:11
      addQuestionHistory(`Player ${(turn+1)} chose: ${numberArray[cardInteract]} leaving behind [${stateString}]`);  // > CustomCode.selectCard:12
    }  // > CustomCode.selectCard:13
  }  // > CustomCode.selectCard:14

  _model.addToInitialization(function() {
    if (!__pagesEnabled["message"]) return;
    if (_isMobile){  // > Initialization.message:1
      //do nothing  // > Initialization.message:2
      }  // > Initialization.message:3
        // > Initialization.message:4
      else{  // > Initialization.message:5
        // copy this into the initialization  // > Initialization.message:6
    // make the font bigger  // > Initialization.message:7
    _view.plottingPanel.getMessageDecoration("TL").getFont().setFontSize("1vw");  // > Initialization.message:8
    _view.plottingPanel.getMessageDecoration("TR").getFont().setFontSize("1vw");  // > Initialization.message:9
    _view.plottingPanel.getMessageDecoration("BL").getFont().setFontSize("1vw");  // > Initialization.message:10
    _view.plottingPanel.getMessageDecoration("BR").getFont().setFontSize("1vw");  // > Initialization.message:11
        }  // > Initialization.message:12
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    // n is set to undefined initially (in the Variables page) so that we are able to retain the value of n after each reset  // > Initialization.Init Page:1
    if(n == undefined){  // > Initialization.Init Page:2
      n = numberArray.length;  // > Initialization.Init Page:3
        // > Initialization.Init Page:4
    }  // > Initialization.Init Page:5
    if (attemptHistory === undefined) {  // > Initialization.Init Page:6
      attemptHistory = [];  // > Initialization.Init Page:7
    }  // > Initialization.Init Page:8
    if (attemptHistory.length === 0) {  // > Initialization.Init Page:9
      attemptHistory.length = cardCombinations.length * 2;  // > Initialization.Init Page:10
      attemptHistory.fill(attemptState.NOT_ATTEMPTED);  // > Initialization.Init Page:11
    }  // > Initialization.Init Page:12
    for (var i=0; i<n  ; i++) {  // > Initialization.Init Page:13
      enabledPosition[i] = "ENABLED_NO_MOVE";  // > Initialization.Init Page:14
    }  // > Initialization.Init Page:15
    // set selectedOption in comboxBox  // > Initialization.Init Page:16
    _view.cardCountSelection.setProperty('SelectedOptions', [n]);  // > Initialization.Init Page:17
    // initialisation of the arrays  // > Initialization.Init Page:18
    init();  // > Initialization.Init Page:19
    turnText = "Press Start to begin";  // > Initialization.Init Page:20
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["SVG"]) return;
    //golden color  // > Initialization.SVG:1
    if (clicked==undefined){  // > Initialization.SVG:2
      var container = document.createElement('div');  // > Initialization.SVG:3
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.SVG:4
      '  <radialGradient id="mygrandientgolden" cx="50%" cy="50%" r="80%" fx="30%" fy="30%">'+  // > Initialization.SVG:5
      '    <stop offset="0%" style="stop-color:rgb(255,255,255); stop-opacity:1" />'+  // > Initialization.SVG:6
      '    <stop offset="100%" style="stop-color:rgb(255,255,0);stop-opacity:0" />'+  // > Initialization.SVG:7
      '  </radialGradient>'+  // > Initialization.SVG:8
      '</defs></svg>';  // > Initialization.SVG:9
    container.innerHTML = svggradient;  // > Initialization.SVG:10
    container.style.width = 0;  // > Initialization.SVG:11
    container.style.height = 0;  // > Initialization.SVG:12
    container.style.display = 'flex';  // > Initialization.SVG:13
    document.body.appendChild(container);  // > Initialization.SVG:14
    //"url(#mygrandientgolden)"  // > Initialization.SVG:15
    //clicked = true  // > Initialization.SVG:16
    }  // > Initialization.SVG:17
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (!clicked){  // > Initialization.undefined:1
      window.setTimeout(_reset,1000)  // > Initialization.undefined:2
      clicked=true;  // > Initialization.undefined:3
    }  // > Initialization.undefined:4
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    // CARD ANIMATION  // > Evolution.Evol Page:1
    if(!animate) // conditional check to see if animation is enabled (animate is true). If animation is not enabled, the code immediately returns, implying that no animation should occur.  // > Evolution.Evol Page:2
    return;  // > Evolution.Evol Page:3
    // terminate animation condition  // > Evolution.Evol Page:4
    if(animateInit && t >= animateDuration) {  // > Evolution.Evol Page:5
      cardX[animateIdx] = destX;  // > Evolution.Evol Page:6
      cardY[animateIdx] = destY;  // > Evolution.Evol Page:7
      animate = false;  // > Evolution.Evol Page:8
      animateInit = false;  // > Evolution.Evol Page:9
      // minus from sum : value of the card is subtracted from a sum (currentSum).  // > Evolution.Evol Page:10
      currentSum -= numberArray[animateIdx];  // > Evolution.Evol Page:11
      // set the card to be unavailable  // > Evolution.Evol Page:12
      cardAvailable[animateIdx] = 0;  // > Evolution.Evol Page:13
      playerIdx++; //player index is incremented  // > Evolution.Evol Page:14
      // switch turns  // > Evolution.Evol Page:15
      turn = !turn;  // > Evolution.Evol Page:16
      //after AI  // > Evolution.Evol Page:17
      turnText = `Player ${turn + 1}'s turn`;  // > Evolution.Evol Page:18
      // game over condition  // > Evolution.Evol Page:19
      if(playerIdx == n - cardsRemaining) {  // > Evolution.Evol Page:20
        onGameOver();  // > Evolution.Evol Page:21
      }  // > Evolution.Evol Page:22
      return;  // > Evolution.Evol Page:23
    }  // > Evolution.Evol Page:24
    // calculating the speed of the animation  // > Evolution.Evol Page:25
    if(!animateInit) {  // > Evolution.Evol Page:26
      // calculating the distance  // > Evolution.Evol Page:27
      var distX = destX - cardX[animateIdx];  // > Evolution.Evol Page:28
      var distY = destY - cardY[animateIdx];  // > Evolution.Evol Page:29
      accelX = 4 * distX / animateDuration ** 2;  // > Evolution.Evol Page:30
      accelY = 4 * distY / animateDuration ** 2;  // > Evolution.Evol Page:31
      speedX = speedY = t = 0;  // > Evolution.Evol Page:32
      //console.log(speedX, speedY, destX, destY);  // > Evolution.Evol Page:33
      animateInit = true;  // > Evolution.Evol Page:34
    }  // > Evolution.Evol Page:35
    t += dt;  // > Evolution.Evol Page:36
    //Depending on the current time (t) within the animation duration, the speed values are adjusted. During the first half of the animation duration, the speed increases; during the second half, the speed decreases.  // > Evolution.Evol Page:37
    if(t < animateDuration / 2) {  // > Evolution.Evol Page:38
      speedX += accelX * dt;  // > Evolution.Evol Page:39
      speedY += accelY * dt;  // > Evolution.Evol Page:40
    }  // > Evolution.Evol Page:41
    else {  // > Evolution.Evol Page:42
      speedX -= accelX * dt;  // > Evolution.Evol Page:43
      speedY -= accelY * dt;  // > Evolution.Evol Page:44
    }  // > Evolution.Evol Page:45
    //The card's position (cardX and cardY) is updated based on the calculated speed values (speedX and speedY) and the time step dt.  // > Evolution.Evol Page:46
    cardX[animateIdx] += speedX * dt;  // > Evolution.Evol Page:47
    cardY[animateIdx] += speedY * dt;  // > Evolution.Evol Page:48
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["FixRel Page"]) return;
    if (!isGameStarted)  // > FixedRelations.FixRel Page:1
      cardsActive = false;  // > FixedRelations.FixRel Page:2
    else if (isStrategistThinking || animate || gameOver)  // > FixedRelations.FixRel Page:3
      cardsActive = false;  // > FixedRelations.FixRel Page:4
    else  // > FixedRelations.FixRel Page:5
      cardsActive = true;  // > FixedRelations.FixRel Page:6
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
    _view = new sum_numberCardGameHumanVsHuman_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.numberOfCards.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'numberOfCards'
          _view.cardCountSelection.linkProperty("Options",  function() { return cardCombinations; }, function(_v) { cardCombinations = _v; } ); // HtmlView Page linking property 'Options' for element 'cardCountSelection'
          _view.cardCountSelection.setAction("OnChange", function(_data,_info) {
  n = parseInt(_view.cardCountSelection.getProperty("SelectedOptions")[0]);
  // re-initialise
  init();

}); // HtmlView Page setting action 'OnChange' for element 'cardCountSelection'
          _view.cardCountSelection.linkProperty("Disabled",  function() { return gameStart; }, function(_v) { gameStart = _v; } ); // HtmlView Page linking property 'Disabled' for element 'cardCountSelection'
          _view.cardCountSelection.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'cardCountSelection'
          _view.turnLabel.linkProperty("Background",  function() { return turn ? "#4fc3f7" : "#ef5350"; } ); // HtmlView Page linking property 'Background' for element 'turnLabel'
          _view.turnLabel.linkProperty("Text",  function() { return turnText; }, function(_v) { turnText = _v; } ); // HtmlView Page linking property 'Text' for element 'turnLabel'
          _view.turnLabel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'turnLabel'
          _view.currentSumLabel.linkProperty("Text",  function() { return "Remaining Sum: " + currentSum; } ); // HtmlView Page linking property 'Text' for element 'currentSumLabel'
          _view.currentSumLabel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'currentSumLabel'
          _view.resetBtn.linkProperty("Text",  function() { return startButtonSetText; }, function(_v) { startButtonSetText = _v; } ); // HtmlView Page linking property 'Text' for element 'resetBtn'
          _view.resetBtn.setAction("OnPress", function(_data,_info) {
  if (isGameStarted) { 
    switch (attemptHistory[gameId]) {
      case attemptState.NOT_ATTEMPTED:
        attemptHistory[gameId] = attemptState.ATTEMPTED;
        break;
      case attemptState.ATTEMPTED:
      case attemptState.FIRST_TRY:
      case attemptState.COMPLETED:
        // Don't change the attempt state
        break;
    }
    
    _reset();
    //["Play as player 1", "Play as player 2"]
    _view.cardCountSelection.setSelectedOptions([""+n]);
    
  } else {
    onGameStart();
  }

}); // HtmlView Page setting action 'OnPress' for element 'resetBtn'
          _view.resetBtn.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetBtn'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return "Remaining Sum: " + currentSum; } ); // HtmlView Page linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return maxY; }, function(_v) { maxY = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return maxX; }, function(_v) { maxX = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return minX; }, function(_v) { minX = _v; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return minY; }, function(_v) { minY = _v; } ); // HtmlView Page linking property 'MinimumY' for element 'plottingPanel'
          _view.playerSet.linkProperty("NumberOfElements",  function() { return numberArray.length - cardsRemaining; } ); // HtmlView Page linking property 'NumberOfElements' for element 'playerSet'
          _view.playerSet.linkProperty("SizeX",  function() { return cardWidth; }, function(_v) { cardWidth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'playerSet'
          _view.playerSet.linkProperty("X",  function() { return playerX; }, function(_v) { playerX = _v; } ); // HtmlView Page linking property 'X' for element 'playerSet'
          _view.playerSet.linkProperty("Y",  function() { return playerY; }, function(_v) { playerY = _v; } ); // HtmlView Page linking property 'Y' for element 'playerSet'
          _view.playerSet.linkProperty("SizeY",  function() { return cardHeight; }, function(_v) { cardHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'playerSet'
          _view.playerText.linkProperty("Y",  function() { return playerY / 2 + 1; } ); // HtmlView Page linking property 'Y' for element 'playerText'
          _view.cardBackground.linkProperty("NumberOfElements",  function() { return numberArray.length; } ); // HtmlView Page linking property 'NumberOfElements' for element 'cardBackground'
          _view.cardBackground.linkProperty("FillColor",  function() { return cardColors; }, function(_v) { cardColors = _v; } ); // HtmlView Page linking property 'FillColor' for element 'cardBackground'
          _view.cardBackground.linkProperty("SizeX",  function() { return cardWidth; }, function(_v) { cardWidth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'cardBackground'
          _view.cardBackground.linkProperty("X",  function() { return cardX; }, function(_v) { cardX = _v; } ); // HtmlView Page linking property 'X' for element 'cardBackground'
          _view.cardBackground.linkProperty("Y",  function() { return cardY; }, function(_v) { cardY = _v; } ); // HtmlView Page linking property 'Y' for element 'cardBackground'
          _view.cardBackground.linkProperty("SizeY",  function() { return cardHeight; }, function(_v) { cardHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'cardBackground'
          _view.cardController.linkProperty("NumberOfElements",  function() { return numberArray.length; } ); // HtmlView Page linking property 'NumberOfElements' for element 'cardController'
          _view.cardController.linkProperty("ElementInteracted",  function() { return cardInteract; }, function(_v) { cardInteract = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'cardController'
          _view.cardController.linkProperty("SizeX",  function() { return cardWidth; }, function(_v) { cardWidth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'cardController'
          _view.cardController.linkProperty("X",  function() { return cardX; }, function(_v) { cardX = _v; } ); // HtmlView Page linking property 'X' for element 'cardController'
          _view.cardController.linkProperty("Y",  function() { return cardY; }, function(_v) { cardY = _v; } ); // HtmlView Page linking property 'Y' for element 'cardController'
          _view.cardController.setAction("OnPress", function(_data,_info) {
  if (!isGameStarted)
    return;
  if (isStrategistThinking || animate || !cardAvailable[cardInteract] || gameOver)
    return;
  selectCard(cardInteract, turn);

}); // HtmlView Page setting action 'OnPress' for element 'cardController'
          _view.cardController.linkProperty("SizeY",  function() { return cardHeight; }, function(_v) { cardHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'cardController'
          _view.cardController.linkProperty("EnabledPosition",  function() { return cardsActive ? enabledPosition : "ENABLED_NONE"; } ); // HtmlView Page linking property 'EnabledPosition' for element 'cardController'
          _view.cardText.linkProperty("NumberOfElements",  function() { return numberArray.length; } ); // HtmlView Page linking property 'NumberOfElements' for element 'cardText'
          _view.cardText.linkProperty("X",  function() { return cardX; }, function(_v) { cardX = _v; } ); // HtmlView Page linking property 'X' for element 'cardText'
          _view.cardText.linkProperty("Y",  function() { return cardY; }, function(_v) { cardY = _v; } ); // HtmlView Page linking property 'Y' for element 'cardText'
          _view.cardText.linkProperty("Text",  function() { return numberArray; }, function(_v) { numberArray = _v; } ); // HtmlView Page linking property 'Text' for element 'cardText'
          _view.instructions.linkProperty("Text",  function() { return " <h1>Sum Number Game</h1>  <ol type = 'a'> <li>Two players take turns to remove one number at a time from the set of numbers 1, 2, 3, 4, 5, 6, …"+ n +" from the board in the centre.</li> <li>First, Player 1 will pick a number from the board. </li> <li>Then Player 2 will continue to pick a number from the rest of the numbers on the board.</li> <li>This game will continue until there are "+cardsRemaining+" numbers left on the board, the sum of these "+cardsRemaining+" numbers will be calculated. If the remaining sum is a multiple of "+toWinMultiplesof+", then the last player to move wins; otherwise, the other player wins.</li>  </ol> "; } ); // HtmlView Page linking property 'Text' for element 'instructions'
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
function sum_numberCardGameHumanVsHuman_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = sum_numberCardGameHumanVsHuman_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Intro Page','./sum_numberCardGameHumanVsHuman_Intro_1.html');

  return _view;
} // end of main function

function sum_numberCardGameHumanVsHuman_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      .setProperty("CSS",{"justify-content": "center"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'topPanel'
      .setProperty("Display","flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'topPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"numberOfCards", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'numberOfCards'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'numberOfCards'
      .setProperty("Background","Orange") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'numberOfCards'
      .setProperty("Text","Number of Cards: ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'numberOfCards'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"cardCountSelection", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'cardCountSelection'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'cardCountSelection'
      .setProperty("Tooltip","Select how many cards in this game") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'cardCountSelection'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"turnLabel", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'turnLabel'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'turnLabel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"currentSumLabel", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'currentSumLabel'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'currentSumLabel'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetBtn", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetBtn'
      .setProperty("Width","20%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'resetBtn'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"mainPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'mainPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("XTicks",0) // EJsS HtmlView.HtmlView Page: setting property 'XTicks' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("AxisXShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisXShow' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("YTicks",0) // EJsS HtmlView.HtmlView Page: setting property 'YTicks' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("AxisYShow",false) // EJsS HtmlView.HtmlView Page: setting property 'AxisYShow' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("MarginY",5) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("CursorTypeForMove","pointer") // EJsS HtmlView.HtmlView Page: setting property 'CursorTypeForMove' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"playerSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playerSet'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'playerSet'
      .setProperty("LineColor","black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'playerSet'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'playerSet'
      .setProperty("DrawFill",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'playerSet'
      .setProperty("EnabledPosition","ENABLED_NONE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'playerSet'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"playerText", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playerText'
      .setProperty("FillColor","black") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'playerText'
      .setProperty("FontSize","1.5em") // EJsS HtmlView.HtmlView Page: setting property 'FontSize' for element 'playerText'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'playerText'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'playerText'
      .setProperty("Text","Players' Cards") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'playerText'
      .setProperty("FontWeight","bold") // EJsS HtmlView.HtmlView Page: setting property 'FontWeight' for element 'playerText'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"cards", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'cards'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"cardBackground", _view.cards) // EJsS HtmlView.HtmlView Page: declaration of element 'cardBackground'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'cardBackground'
      .setProperty("DrawLines",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'cardBackground'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"cardController", _view.cards) // EJsS HtmlView.HtmlView Page: declaration of element 'cardController'
      .setProperty("FillColor","url(#mygrandientgolden)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'cardController'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'cardController'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'cardController'
      .setProperty("LineColor","black") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'cardController'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'cardController'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"cardText", _view.cards) // EJsS HtmlView.HtmlView Page: declaration of element 'cardText'
      .setProperty("FontSize","2em") // EJsS HtmlView.HtmlView Page: setting property 'FontSize' for element 'cardText'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'cardText'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"bottomPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'bottomPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"instructions", _view.bottomPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'instructions'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView Page: setting property 'TextAlign' for element 'instructions'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new sum_numberCardGameHumanVsHuman("_topFrame","_ejs_library/",null);
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
