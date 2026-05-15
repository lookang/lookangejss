function sum_numberCardGameAIOddOnlywith2PlayersweakAI(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var isGameStarted; // EjsS Model.Variables.stateVariables.isGameStarted
  var resetButtonText; // EjsS Model.Variables.stateVariables.resetButtonText
  var startButtonText; // EjsS Model.Variables.stateVariables.startButtonText
  var startButtonSetText; // EjsS Model.Variables.stateVariables.startButtonSetText
  var selectedPlayer; // EjsS Model.Variables.stateVariables.selectedPlayer

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
  var activeStrategist; // EjsS Model.Variables.cardGameVariables.activeStrategist
  var strategistTurn; // EjsS Model.Variables.cardGameVariables.strategistTurn
  var humanTurnPrompt; // EjsS Model.Variables.cardGameVariables.humanTurnPrompt
  var computerTurnPrompt; // EjsS Model.Variables.cardGameVariables.computerTurnPrompt
  var humanWinPrompt; // EjsS Model.Variables.cardGameVariables.humanWinPrompt
  var computerWinPrompt; // EjsS Model.Variables.cardGameVariables.computerWinPrompt
  var cardsActive; // EjsS Model.Variables.cardGameVariables.cardsActive
  var enabledPosition; // EjsS Model.Variables.cardGameVariables.enabledPosition

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

  var cardsRemaining; // EjsS Model.Variables.EditableVariable.cardsRemaining
  var toWinMultiplesof; // EjsS Model.Variables.EditableVariable.toWinMultiplesof

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      isGameStarted : isGameStarted,
      resetButtonText : resetButtonText,
      startButtonText : startButtonText,
      startButtonSetText : startButtonSetText,
      selectedPlayer : selectedPlayer,
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
      activeStrategist : activeStrategist,
      strategistTurn : strategistTurn,
      humanTurnPrompt : humanTurnPrompt,
      computerTurnPrompt : computerTurnPrompt,
      humanWinPrompt : humanWinPrompt,
      computerWinPrompt : computerWinPrompt,
      cardsActive : cardsActive,
      enabledPosition : enabledPosition,
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
      cardInteract : cardInteract,
      cardsRemaining : cardsRemaining,
      toWinMultiplesof : toWinMultiplesof
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.isGameStarted != "undefined") isGameStarted = json.isGameStarted;
    if(typeof json.resetButtonText != "undefined") resetButtonText = json.resetButtonText;
    if(typeof json.startButtonText != "undefined") startButtonText = json.startButtonText;
    if(typeof json.startButtonSetText != "undefined") startButtonSetText = json.startButtonSetText;
    if(typeof json.selectedPlayer != "undefined") selectedPlayer = json.selectedPlayer;
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
    if(typeof json.activeStrategist != "undefined") activeStrategist = json.activeStrategist;
    if(typeof json.strategistTurn != "undefined") strategistTurn = json.strategistTurn;
    if(typeof json.humanTurnPrompt != "undefined") humanTurnPrompt = json.humanTurnPrompt;
    if(typeof json.computerTurnPrompt != "undefined") computerTurnPrompt = json.computerTurnPrompt;
    if(typeof json.humanWinPrompt != "undefined") humanWinPrompt = json.humanWinPrompt;
    if(typeof json.computerWinPrompt != "undefined") computerWinPrompt = json.computerWinPrompt;
    if(typeof json.cardsActive != "undefined") cardsActive = json.cardsActive;
    if(typeof json.enabledPosition != "undefined") enabledPosition = json.enabledPosition;
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
    if(typeof json.cardsRemaining != "undefined") cardsRemaining = json.cardsRemaining;
    if(typeof json.toWinMultiplesof != "undefined") toWinMultiplesof = json.toWinMultiplesof;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["SVG"] = true;
    __pagesEnabled["message"] = true;
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    isGameStarted = false; // EjsS Model.Variables.stateVariables.isGameStarted
    resetButtonText = "↻Reset"; // EjsS Model.Variables.stateVariables.resetButtonText
    startButtonText = "Start"; // EjsS Model.Variables.stateVariables.startButtonText
    startButtonSetText = startButtonText; // EjsS Model.Variables.stateVariables.startButtonSetText
    selectedPlayer = 0; // EjsS Model.Variables.stateVariables.selectedPlayer
  });

  _model.addToReset(function() {
    numberArray = [1, 2, 3, 4, 5, 6, 7]; // EjsS Model.Variables.cardGameVariables.numberArray
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
    activeStrategist = bypasserStrategist; // EjsS Model.Variables.cardGameVariables.activeStrategist
    strategistTurn = 1; // EjsS Model.Variables.cardGameVariables.strategistTurn
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
  });

  _model.addToReset(function() {
    t = 0; // EjsS Model.Variables.animate.t
    dt = 1/20; // EjsS Model.Variables.animate.dt
    animate = false; // EjsS Model.Variables.animate.animate
    animateInit = false; // EjsS Model.Variables.animate.animateInit
    animateDuration = 1; // EjsS Model.Variables.animate.animateDuration
  });

  _model.addToReset(function() {
    cardsRemaining = 3; // EjsS Model.Variables.EditableVariable.cardsRemaining
    toWinMultiplesof = 3; // EjsS Model.Variables.EditableVariable.toWinMultiplesof
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
      turnText = strategistTurn ? humanTurnPrompt : computerTurnPrompt;  // > CustomCode.init:32
  }  // > CustomCode.init:33

  function selectCard (cardInteract, turn) {  // > CustomCode.selectCard:1
    gameStart = 1;  // > CustomCode.selectCard:2
    animate = true;  // > CustomCode.selectCard:3
    animateIdx = cardInteract;  // > CustomCode.selectCard:4
    destX = playerX[playerIdx];  // > CustomCode.selectCard:5
    destY = playerY;  // > CustomCode.selectCard:6
    cardColors[cardInteract] = turn == 0 ? player1Color : player2Color;  // > CustomCode.selectCard:7
    enabledPosition[cardInteract] = "ENABLED_NONE"  // > CustomCode.selectCard:8
  }  // > CustomCode.selectCard:9

  /**  // > CustomCode.ai:1
   *   // > CustomCode.ai:2
   * @param {int[]} arr  // > CustomCode.ai:3
   * @returns {int}  // > CustomCode.ai:4
   */  // > CustomCode.ai:5
  function getRandomMove(arr) {  // > CustomCode.ai:6
    if (arr.length === 0) {  // > CustomCode.ai:7
      console.warn("No valid move choice");  // > CustomCode.ai:8
      return -1;  // > CustomCode.ai:9
    }  // > CustomCode.ai:10
    return arr[Math.floor(Math.random() * arr.length)];  // > CustomCode.ai:11
  }  // > CustomCode.ai:12
  /**  // > CustomCode.ai:13
   *   // > CustomCode.ai:14
   */  // > CustomCode.ai:15
  function performStrategyMove(strategist) {  // > CustomCode.ai:16
    isStrategistThinking = true;  // > CustomCode.ai:17
    setTimeout(function () {  // > CustomCode.ai:18
      const strategistMove = strategist(cardAvailable, numberArray);  // > CustomCode.ai:19
      if (strategistMove < 0) {  // > CustomCode.ai:20
        console.warn("Strategist could not decide!");  // > CustomCode.ai:21
      } else {  // > CustomCode.ai:22
        selectCard(strategistMove, turn);  // > CustomCode.ai:23
      }  // > CustomCode.ai:24
      isStrategistThinking = false;  // > CustomCode.ai:25
    }, 500);  // > CustomCode.ai:26
  }  // > CustomCode.ai:27
  /**  // > CustomCode.ai:28
   * @function blockerStrategist  // > CustomCode.ai:29
   * @param {bool[]} availableMoves   // > CustomCode.ai:30
   * @param {int[]} moveValues  // > CustomCode.ai:31
   * @returns {int} The move id it will make  // > CustomCode.ai:32
   * @desc Returns the move ID that the blocker AI would move  // > CustomCode.ai:33
   */  // > CustomCode.ai:34
  function blockerStrategist(availableMoves, moveValues) {  // > CustomCode.ai:35
    // Since we only care about whether the end position value is divisible by 3, we only care about move values mod 3  // > CustomCode.ai:36
    if (toWinMultiplesof !== 3 || cardsRemaining !== 3) { //the target multiple and remaining cards  // > CustomCode.ai:37
      console.warn("Blocker AI only supports game setting (3, 3)");  // > CustomCode.ai:38
      return getRandomMove(availableMoves.filter(v => v));  // > CustomCode.ai:39
    }  // > CustomCode.ai:40
    const moveMod = [0, 0, 0]; //count how many moves have a remainder of 0, 1, and 2 when divided by 3.  // > CustomCode.ai:41
    let movesMade = 0;  // > CustomCode.ai:42
    for (let i = 0; i < availableMoves.length; i++) {  // > CustomCode.ai:43
      if (availableMoves[i]) {  // > CustomCode.ai:44
        moveMod[moveValues[i] % 3] += 1;  // > CustomCode.ai:45
        movesMade += 1;  // > CustomCode.ai:46
      }  // > CustomCode.ai:47
    }  // > CustomCode.ai:48
    if (moveValues.length % 2 === 0) { //checks if the number of moves made is odd  // > CustomCode.ai:49
      console.warn("Blocker AI only supports odd number of cards")  // > CustomCode.ai:50
      return getRandomMove(availableMoves.filter(v => v)); //makes a random move.  // > CustomCode.ai:51
    }  // > CustomCode.ai:52
      // > CustomCode.ai:53
    // State: 3 symbols, either -, 1, 2, O, or E.   // > CustomCode.ai:54
    // The position of the character represents whether it represents move values mod 0, 1 or 2  // > CustomCode.ai:55
    // - represents 0 moves in that slot  // > CustomCode.ai:56
    // 1 or 2 represents 1 and 2 moves in that slot respectively  // > CustomCode.ai:57
    // O represents odd number of moves in that slot  // > CustomCode.ai:58
    // E represents even number of moves in that slot  // > CustomCode.ai:59
    // Start state will either be 2O2, OOO, OEE, or EOE  // > CustomCode.ai:60
    // The target state is either -22, 2-2, or 22-.  // > CustomCode.ai:61
    // When a corresponding move is played, 1 -> -, 2 -> 1, E -> O, and O -> (2 | E)  // > CustomCode.ai:62
    // State: 212, E12, 21E, or E1E  // > CustomCode.ai:63
    // Strategy: Remove 1 slot  // > CustomCode.ai:64
    if (moveMod[0] === 1 || moveMod[1] === 1 || moveMod[2] === 1) {  // > CustomCode.ai:65
      const moves = [];  // > CustomCode.ai:66
      for (let i = 0; i < availableMoves.length; i++) {  // > CustomCode.ai:67
        if (availableMoves[i] && moveMod[moveValues[i] % 3] === 1) {  // > CustomCode.ai:68
          moves.push(i)  // > CustomCode.ai:69
        }  // > CustomCode.ai:70
      }  // > CustomCode.ai:71
      return getRandomMove(moves)  // > CustomCode.ai:72
    }  // > CustomCode.ai:73
    const moves = [];  // > CustomCode.ai:74
    for (let i = 0; i < availableMoves.length; i++) {  // > CustomCode.ai:75
      if (availableMoves[i] && moveMod[moveValues[i] % 3] % 2 === 1) {  // > CustomCode.ai:76
        moves.push(i);  // > CustomCode.ai:77
      }  // > CustomCode.ai:78
    }  // > CustomCode.ai:79
    return getRandomMove(moves);  // > CustomCode.ai:80
  }  // > CustomCode.ai:81
  /**  // > CustomCode.ai:82
   * @function bypasserStrategist  // > CustomCode.ai:83
   * @param {bool[]} availableMoves   // > CustomCode.ai:84
   * @param {int[]} moveValues  // > CustomCode.ai:85
   * @returns {int} The move id it will make  // > CustomCode.ai:86
   * @desc Returns the move ID that the AI would move  // > CustomCode.ai:87
   */  // > CustomCode.ai:88
  function bypasserStrategist(availableMoves, moveValues) {  // > CustomCode.ai:89
    //calculates the number of remaining moves and their total value.  // > CustomCode.ai:90
    let movesLeft = 0;  // > CustomCode.ai:91
    let remainingValue = 0;  // > CustomCode.ai:92
    for (let i = 0; i < availableMoves.length; i++) {  // > CustomCode.ai:93
      if (availableMoves[i]) {  // > CustomCode.ai:94
        movesLeft += 1;  // > CustomCode.ai:95
        remainingValue += moveValues[i];  // > CustomCode.ai:96
      }  // > CustomCode.ai:97
    }  // > CustomCode.ai:98
    //If there are more moves left than allowed (movesLeft > cardsRemaining + 1), it returns a random available move.  // > CustomCode.ai:99
    if (movesLeft > cardsRemaining + 1) {  // > CustomCode.ai:100
      const moves = [];  // > CustomCode.ai:101
      for (let i = 0; i < availableMoves.length; i++) {  // > CustomCode.ai:102
        if (availableMoves[i]) {  // > CustomCode.ai:103
          moves.push(i);  // > CustomCode.ai:104
        }  // > CustomCode.ai:105
      }  // > CustomCode.ai:106
      return getRandomMove(moves);  // > CustomCode.ai:107
    }  // > CustomCode.ai:108
    const winningMoves = [];  // > CustomCode.ai:109
    const losingMoves = [];  // > CustomCode.ai:110
      // > CustomCode.ai:111
    for (let i = 0; i < availableMoves.length; i++) {  // > CustomCode.ai:112
      if (availableMoves[i]) {  // > CustomCode.ai:113
        if ((remainingValue - moveValues[i]) % 3 === 0) {  // > CustomCode.ai:114
          winningMoves.push(i);  // > CustomCode.ai:115
        } else {  // > CustomCode.ai:116
          losingMoves.push(i);  // > CustomCode.ai:117
        }  // > CustomCode.ai:118
      }  // > CustomCode.ai:119
    }  // > CustomCode.ai:120
  //If there are more moves left than allowed (movesLeft > cardsRemaining + 1), it returns a random available move.  // > CustomCode.ai:121
    if (winningMoves.length > 0) {  // > CustomCode.ai:122
      return getRandomMove(winningMoves);  // > CustomCode.ai:123
    }  // > CustomCode.ai:124
    if (losingMoves.length > 0) {  // > CustomCode.ai:125
      return getRandomMove(losingMoves);  // > CustomCode.ai:126
    }  // > CustomCode.ai:127
    console.warn("No moves available?");  // > CustomCode.ai:128
    return 0;  // > CustomCode.ai:129
  }  // > CustomCode.ai:130
  /**  // > CustomCode.ai:131
   * @function randomStrategist  // > CustomCode.ai:132
   * @param {bool[]} availableMoves   // > CustomCode.ai:133
   * @param {int[]} moveValues  // > CustomCode.ai:134
   * @returns {int} The move id it will make  // > CustomCode.ai:135
   * @desc Returns the move ID that the AI would move  // > CustomCode.ai:136
   */  // > CustomCode.ai:137
   //This strategist function returns a random available move among all possible moves.  // > CustomCode.ai:138
  function randomStrategist(availableMoves, moveValues) {  // > CustomCode.ai:139
    const legalMoves = [];  // > CustomCode.ai:140
    for (let i = 0; i < availableMoves.length; i++) {  // > CustomCode.ai:141
      if (availableMoves[i]) {  // > CustomCode.ai:142
        legalMoves.push(i);  // > CustomCode.ai:143
      }  // > CustomCode.ai:144
    }  // > CustomCode.ai:145
    return getRandomMove(legalMoves);  // > CustomCode.ai:146
  }  // > CustomCode.ai:147

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
    clicked = true  // > Initialization.SVG:16
    }  // > Initialization.SVG:17
  });

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
    for (var i=0; i<n  ; i++) {  // > Initialization.Init Page:6
     enabledPosition[i]= "ENABLED_NO_MOVE"  // > Initialization.Init Page:7
     //cardsActive = true  // > Initialization.Init Page:8
    }  // > Initialization.Init Page:9
    // set selectedOption in comboxBox  // > Initialization.Init Page:10
    _view.cardCountSelection.setProperty('SelectedOptions', [n]);  // > Initialization.Init Page:11
    // initialisation of the arrays  // > Initialization.Init Page:12
    init();  // > Initialization.Init Page:13
    //performStrategyMove(blockerStrategist);  // > Initialization.Init Page:14
    if (strategistTurn == 0 && clicked == undefined){  // > Initialization.Init Page:15
      _tools.showOkDialog("Select the 'Number of Cards' to start the game!");  // > Initialization.Init Page:16
    }  // > Initialization.Init Page:17
    turnText = "Press Start to begin";  // > Initialization.Init Page:18
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    // CARD ANIMATION  // > Evolution.Evol Page:1
    if(!animate) // conditional check to see if animation is enabled (animate is true). If animation is not enabled, the code immediately returns, implying that no animation should occur.  // > Evolution.Evol Page:2
      return;  // > Evolution.Evol Page:3
    // terminate animation condition  // > Evolution.Evol Page:4
    if(animateInit && t >= animateDuration){  // > Evolution.Evol Page:5
      cardX[animateIdx] = destX;  // > Evolution.Evol Page:6
      cardY[animateIdx] = destY;  // > Evolution.Evol Page:7
        // > Evolution.Evol Page:8
      animate = false;  // > Evolution.Evol Page:9
      animateInit = false;  // > Evolution.Evol Page:10
        // > Evolution.Evol Page:11
      // minus from sum : value of the card is subtracted from a sum (currentSum).  // > Evolution.Evol Page:12
      currentSum -= numberArray[animateIdx];  // > Evolution.Evol Page:13
        // > Evolution.Evol Page:14
      // set the card to be unavailable  // > Evolution.Evol Page:15
      cardAvailable[animateIdx] = 0;  // > Evolution.Evol Page:16
       // > Evolution.Evol Page:17
      playerIdx++; //player index is incremented  // > Evolution.Evol Page:18
      // switch turns  // > Evolution.Evol Page:19
      turn = !turn;  // > Evolution.Evol Page:20
      //after AI  // > Evolution.Evol Page:21
        // > Evolution.Evol Page:22
      if (turn == strategistTurn) { //turnText is updated based on whose turn it is.  // > Evolution.Evol Page:23
        turnText = computerTurnPrompt;  // > Evolution.Evol Page:24
      } else {  // > Evolution.Evol Page:25
        turnText = humanTurnPrompt;  // > Evolution.Evol Page:26
      }  // > Evolution.Evol Page:27
      // game over condition  // > Evolution.Evol Page:28
      if(playerIdx == n - cardsRemaining){  // > Evolution.Evol Page:29
        var winText  = "";  // > Evolution.Evol Page:30
        if(currentSum % toWinMultiplesof == 0){  // > Evolution.Evol Page:31
          if (strategistTurn == 0)  // > Evolution.Evol Page:32
            winText = humanWinPrompt;  // > Evolution.Evol Page:33
          else  // > Evolution.Evol Page:34
            winText = computerWinPrompt;  // > Evolution.Evol Page:35
          turn = 1;  // > Evolution.Evol Page:36
        }  // > Evolution.Evol Page:37
        else{  // > Evolution.Evol Page:38
          if (strategistTurn == 0)  // > Evolution.Evol Page:39
            winText = computerWinPrompt;  // > Evolution.Evol Page:40
          else  // > Evolution.Evol Page:41
            winText = humanWinPrompt;  // > Evolution.Evol Page:42
          turn = 0;  // > Evolution.Evol Page:43
        }  // > Evolution.Evol Page:44
        _tools.showOkDialog("Game Over! " + winText);  // > Evolution.Evol Page:45
        turnText = winText;  // > Evolution.Evol Page:46
          // > Evolution.Evol Page:47
        gameOver = 1;  // > Evolution.Evol Page:48
      } else if ((strategistTurn === 0 && !turn) || (strategistTurn !== 0 && turn)) {  // > Evolution.Evol Page:49
        performStrategyMove(activeStrategist);  // > Evolution.Evol Page:50
      }  // > Evolution.Evol Page:51
      return;  // > Evolution.Evol Page:52
    }  // > Evolution.Evol Page:53
        // > Evolution.Evol Page:54
    // calculating the speed of the animation  // > Evolution.Evol Page:55
    if(!animateInit){  // > Evolution.Evol Page:56
      // calculating the distance  // > Evolution.Evol Page:57
      var distX = destX - cardX[animateIdx];  // > Evolution.Evol Page:58
      var distY = destY - cardY[animateIdx];  // > Evolution.Evol Page:59
        // > Evolution.Evol Page:60
      accelX = 4 * distX / animateDuration ** 2;  // > Evolution.Evol Page:61
      accelY = 4 * distY / animateDuration ** 2;  // > Evolution.Evol Page:62
        // > Evolution.Evol Page:63
      speedX = speedY = t = 0;  // > Evolution.Evol Page:64
      //console.log(speedX, speedY, destX, destY);  // > Evolution.Evol Page:65
      animateInit = true;  // > Evolution.Evol Page:66
    }  // > Evolution.Evol Page:67
    t += dt;  // > Evolution.Evol Page:68
    //Depending on the current time (t) within the animation duration, the speed values are adjusted. During the first half of the animation duration, the speed increases; during the second half, the speed decreases.  // > Evolution.Evol Page:69
    if(t < animateDuration / 2){  // > Evolution.Evol Page:70
      speedX += accelX * dt;  // > Evolution.Evol Page:71
      speedY += accelY * dt;  // > Evolution.Evol Page:72
    }  // > Evolution.Evol Page:73
    else{  // > Evolution.Evol Page:74
      speedX -= accelX * dt;  // > Evolution.Evol Page:75
      speedY -= accelY * dt;  // > Evolution.Evol Page:76
    }  // > Evolution.Evol Page:77
    //The card's position (cardX and cardY) is updated based on the calculated speed values (speedX and speedY) and the time step dt.    // > Evolution.Evol Page:78
    cardX[animateIdx] += speedX * dt;  // > Evolution.Evol Page:79
    cardY[animateIdx] += speedY * dt;  // > Evolution.Evol Page:80
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
    _view = new sum_numberCardGameAIOddOnlywith2PlayersweakAI_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.playerSelection.linkProperty("Options",  function() { return ["Play as player 1", "Play as player 2"]; } ); // HtmlView Page linking property 'Options' for element 'playerSelection'
          _view.playerSelection.linkProperty("Tooltip",  function() { return "For Player 1 to win, remaining sum is NOT a multiple of "+toWinMultiplesof+" \nelse Player 2 win if remaining sum is a multiple of "+toWinMultiplesof; } ); // HtmlView Page linking property 'Tooltip' for element 'playerSelection'
          _view.playerSelection.setAction("OnChange", function(_data,_info) {
  let userSelection = _view.playerSelection.getProperty("SelectedOptions")[0];
  let options = _view.playerSelection.getProperty("Options");
  selectedPlayer = options.indexOf(userSelection);
  console.log({userSelection});
  console.log({options});
  console.log({selectedPlayer});

}); // HtmlView Page setting action 'OnChange' for element 'playerSelection'
          _view.playerSelection.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'playerSelection'
          _view.numberOfCards.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'numberOfCards'
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
    _reset();
  } else {
    isGameStarted = true;
    startButtonSetText = resetButtonText;
    switch (selectedPlayer) {
      case 0:
        activeStrategist = bypasserStrategist;
        strategistTurn = 1;
        break;
      case 1:
        activeStrategist = randomStrategist;
        strategistTurn = 0;
        break;
    }
    init();
    console.log({selectedPlayer});
    if (turn == strategistTurn)
      performStrategyMove(blockerStrategist);
  }

}); // HtmlView Page setting action 'OnPress' for element 'resetBtn'
          _view.resetBtn.linkProperty("Disabled",  function() { return selectedPlayer !== 0 && selectedPlayer !== 1; } ); // HtmlView Page linking property 'Disabled' for element 'resetBtn'
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
          _view.instructions.linkProperty("Text",  function() { return " <h1>Sum Number Game</h1>  <ol type = 'a'> <li>Two players take turns to remove one number at a time from the set of numbers 1, 2, 3, 4, 5, 6, …"+ n +" from the board in the centre.</li> <li>First, Player 1 will pick a number from the board. </li> <li>Then Player 2 will continue to pick a number from the rest of the numbers on the board.</li> <li>This game will continue until there are "+cardsRemaining+" numbers left on the board, the sum of these "+cardsRemaining+" numbers will be calculated. If the remaining sum is a multiple of "+toWinMultiplesof+", then Player 2 wins the game; otherwise, player 1 wins.</li>  </ol> "; } ); // HtmlView Page linking property 'Text' for element 'instructions'
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
function sum_numberCardGameAIOddOnlywith2PlayersweakAI_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = sum_numberCardGameAIOddOnlywith2PlayersweakAI_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Intro Page','./sum_numberCardGameAIOddOnlywith2PlayersweakAI_Intro_1.html');

  return _view;
} // end of main function

function sum_numberCardGameAIOddOnlywith2PlayersweakAI_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      .setProperty("CSS",{"justify-content": "center"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'topPanel'
      .setProperty("Display","flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'topPanel'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"playerSelection", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playerSelection'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"numberOfCards", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'numberOfCards'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'numberOfCards'
      .setProperty("Background","Orange") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'numberOfCards'
      .setProperty("Text","Number of Cards: ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'numberOfCards'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"cardCountSelection", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'cardCountSelection'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'cardCountSelection'
      .setProperty("Options",[5, 7, 9, 11, 13, 15]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'cardCountSelection'
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
          _model =  new sum_numberCardGameAIOddOnlywith2PlayersweakAI("_topFrame","_ejs_library/",null);
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
