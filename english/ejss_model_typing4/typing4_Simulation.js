/* _inputParameters: an object with different values for the model parameters */
function typing4(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var canvasHeight; // EjsS Model.Variables.Var table 1.canvasHeight
  var canvasWidth; // EjsS Model.Variables.Var table 1.canvasWidth
  var bubbles; // EjsS Model.Variables.Var table 1.bubbles
  var typedWord; // EjsS Model.Variables.Var table 1.typedWord
  var gameOver; // EjsS Model.Variables.Var table 1.gameOver
  var speed; // EjsS Model.Variables.Var table 1.speed
  var wordList; // EjsS Model.Variables.Var table 1.wordList
  var score; // EjsS Model.Variables.Var table 1.score
  var timeElapsed; // EjsS Model.Variables.Var table 1.timeElapsed
  var maxFallTime; // EjsS Model.Variables.Var table 1.maxFallTime
  var minFallTime; // EjsS Model.Variables.Var table 1.minFallTime
  var started; // EjsS Model.Variables.Var table 1.started

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      canvasHeight : canvasHeight,
      canvasWidth : canvasWidth,
      bubbles : bubbles,
      typedWord : typedWord,
      gameOver : gameOver,
      speed : speed,
      wordList : wordList,
      score : score,
      timeElapsed : timeElapsed,
      maxFallTime : maxFallTime,
      minFallTime : minFallTime,
      started : started
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      canvasHeight : canvasHeight,
      canvasWidth : canvasWidth,
      bubbles : bubbles,
      typedWord : typedWord,
      gameOver : gameOver,
      speed : speed,
      wordList : wordList,
      score : score,
      timeElapsed : timeElapsed,
      maxFallTime : maxFallTime,
      minFallTime : minFallTime,
      started : started
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.canvasHeight != "undefined") canvasHeight = json.canvasHeight;
    if(typeof json.canvasWidth != "undefined") canvasWidth = json.canvasWidth;
    if(typeof json.bubbles != "undefined") bubbles = json.bubbles;
    if(typeof json.typedWord != "undefined") typedWord = json.typedWord;
    if(typeof json.gameOver != "undefined") gameOver = json.gameOver;
    if(typeof json.speed != "undefined") speed = json.speed;
    if(typeof json.wordList != "undefined") wordList = json.wordList;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.timeElapsed != "undefined") timeElapsed = json.timeElapsed;
    if(typeof json.maxFallTime != "undefined") maxFallTime = json.maxFallTime;
    if(typeof json.minFallTime != "undefined") minFallTime = json.minFallTime;
    if(typeof json.started != "undefined") started = json.started;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.canvasHeight != "undefined") canvasHeight = json.canvasHeight;
    if(typeof json.canvasWidth != "undefined") canvasWidth = json.canvasWidth;
    if(typeof json.bubbles != "undefined") bubbles = json.bubbles;
    if(typeof json.typedWord != "undefined") typedWord = json.typedWord;
    if(typeof json.gameOver != "undefined") gameOver = json.gameOver;
    if(typeof json.speed != "undefined") speed = json.speed;
    if(typeof json.wordList != "undefined") wordList = json.wordList;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.timeElapsed != "undefined") timeElapsed = json.timeElapsed;
    if(typeof json.maxFallTime != "undefined") maxFallTime = json.maxFallTime;
    if(typeof json.minFallTime != "undefined") minFallTime = json.minFallTime;
    if(typeof json.started != "undefined") started = json.started;
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
    __pagesEnabled["Init Page 1"] = true;
    __pagesEnabled["Evol Page 1"] = true;
  });

  _model.addToReset(function() {
    canvasHeight = 600; // EjsS Model.Variables.Var table 1.canvasHeight
    canvasWidth = 1000; // EjsS Model.Variables.Var table 1.canvasWidth
    bubbles = []; // EjsS Model.Variables.Var table 1.bubbles
    typedWord = ""; // EjsS Model.Variables.Var table 1.typedWord
    gameOver = false; // EjsS Model.Variables.Var table 1.gameOver
    speed = 1; // EjsS Model.Variables.Var table 1.speed
    wordList = ["apple", "banana", "orange", "grape", "strawberry", "pineapple", "blueberry", "watermelon", "mango", "cherry"]; // EjsS Model.Variables.Var table 1.wordList
    score = 0; // EjsS Model.Variables.Var table 1.score
    timeElapsed = 0; // EjsS Model.Variables.Var table 1.timeElapsed
    maxFallTime = 10000; // EjsS Model.Variables.Var table 1.maxFallTime
    minFallTime = 1000; // EjsS Model.Variables.Var table 1.minFallTime
    started = false; // EjsS Model.Variables.Var table 1.started
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(true);
    _model.setPauseOnPageExit(true);
    _model.setFPS(22);
    _model.setStepsPerDisplay(1);
  });

  function createBubbles() {  // > CustomCode.createBubbles:1
    const bubbleSpacing = canvasWidth / (wordList.length + 1);  // > CustomCode.createBubbles:2
    const margin = 50;  // > CustomCode.createBubbles:3
    const initialY = canvasHeight/2 + 60;  // Start at the top of the canvas  // > CustomCode.createBubbles:4
    const shuffledWordList = wordList.sort(() => Math.random() - 0.5);  // > CustomCode.createBubbles:5
    let fallInterval = 1000;  // > CustomCode.createBubbles:6
      // > CustomCode.createBubbles:7
    let bubblesList = []  // > CustomCode.createBubbles:8
    for (let i = 0; i < wordList.length; i++) {  // > CustomCode.createBubbles:9
      let bubble = {  // > CustomCode.createBubbles:10
        word: shuffledWordList[i],  // > CustomCode.createBubbles:11
        //x: -canvasWidth / 2 + bubbleSpacing * (i + 1),  // > CustomCode.createBubbles:12
        x: Math.random() * (canvasWidth - 2 * margin) - (canvasWidth / 2 - margin),  // > CustomCode.createBubbles:13
        y: initialY,  // Set Y position to 0 (top)  // > CustomCode.createBubbles:14
        shape: _view["bubbleShape" + i],  // Reference the Shape2D elements  // > CustomCode.createBubbles:15
        text: _view["bubbleText" + i],  // Reference a Text2D element  // > CustomCode.createBubbles:16
        // fallDelay: i * 1000  // > CustomCode.createBubbles:17
        fallDelay: maxFallTime - (i * (maxFallTime - minFallTime) / wordList.length)  // > CustomCode.createBubbles:18
      };  // > CustomCode.createBubbles:19
      bubblesList.push(bubble);  // > CustomCode.createBubbles:20
     }  // > CustomCode.createBubbles:21
      // > CustomCode.createBubbles:22
    shuffledBubblesList = bubblesList.sort(() => Math.random() - 0.5);  // > CustomCode.createBubbles:23
      // > CustomCode.createBubbles:24
    for (let i = 0; i < shuffledBubblesList.length; i++) {  // > CustomCode.createBubbles:25
      let bubble = shuffledBubblesList[i];  // > CustomCode.createBubbles:26
        // > CustomCode.createBubbles:27
       //lookang Set random color to the bubble shape  // > CustomCode.createBubbles:28
      const randomColor = getRandomGoodColorForBlackText() //getRandomColor();  // > CustomCode.createBubbles:29
      bubble.shape.setProperty("FillColor", randomColor);  // Correct way in EJS  // > CustomCode.createBubbles:30
        // > CustomCode.createBubbles:31
        // > CustomCode.createBubbles:32
        // > CustomCode.createBubbles:33
      // Dynamically adjust bubble size based on word length  // > CustomCode.createBubbles:34
      const bubbleSize = Math.max(50, bubble.word.length * 12);  // Adjust bubble size based on text length  // > CustomCode.createBubbles:35
      // Set initial properties of the bubble shape  // > CustomCode.createBubbles:36
       // > CustomCode.createBubbles:37
      bubble.shape.setPosition([bubble.x, bubble.y]);  // > CustomCode.createBubbles:38
      bubble.text.setProperty("FillColor", "black");  // Setting the fill color to black  // > CustomCode.createBubbles:39
   // lookang Set text color to black  // > CustomCode.createBubbles:40
      bubble.shape.setSize([bubbleSize, bubbleSize]);  // Set a reasonable size for visibility  // > CustomCode.createBubbles:41
      bubble.shape.setVisible(true);  // Ensure visibility  // > CustomCode.createBubbles:42
        // > CustomCode.createBubbles:43
      bubble.text.setText(bubble.word);  // Set the word inside the bubble  // > CustomCode.createBubbles:44
      bubble.text.setPosition([bubble.x, bubble.y]);  // Position the text in the center of the bubble  // > CustomCode.createBubbles:45
      bubble.text.setVisible(true);  // Ensure the text is visible  // > CustomCode.createBubbles:46
        // > CustomCode.createBubbles:47
      bubbles.push(bubble);  // > CustomCode.createBubbles:48
    }  // > CustomCode.createBubbles:49
  }  // > CustomCode.createBubbles:50

  function updateBubbles() {  // > CustomCode.updateBubbles:1
    const currentTime = new Date().getTime();  // > CustomCode.updateBubbles:2
    timeElapsed += 30;    // > CustomCode.updateBubbles:3
    for (let i = 0; i < bubbles.length; i++) {  // > CustomCode.updateBubbles:4
      if (timeElapsed < bubbles[i].fallDelay) continue;  // > CustomCode.updateBubbles:5
      bubbles[i].y -= speed;  // Move down by 'speed' units  // > CustomCode.updateBubbles:6
      if (bubbles[i].y < (-canvasHeight/2)) {  // If a bubble reaches the bottom  // > CustomCode.updateBubbles:7
        gameOver = true;  // > CustomCode.updateBubbles:8
      }  // > CustomCode.updateBubbles:9
    }  // > CustomCode.updateBubbles:10
      // > CustomCode.updateBubbles:11
      if (bubbles.length === 0 && !gameOver) {  // > CustomCode.updateBubbles:12
      playerWins();  // > CustomCode.updateBubbles:13
    }  // > CustomCode.updateBubbles:14
  }  // > CustomCode.updateBubbles:15

  function checkInput() {  // > CustomCode.checkInput:1
    for (let i = 0; i < bubbles.length; i++) {  // > CustomCode.checkInput:2
      if (typedWord === bubbles[i].word) {  // > CustomCode.checkInput:3
        bubbles[i].shape.setVisible(false);  // Hide the bubble shape  // > CustomCode.checkInput:4
        bubbles[i].text.setVisible(false);  // > CustomCode.checkInput:5
        bubbles.splice(i, 1);  // Remove the bubble from the array  // > CustomCode.checkInput:6
        score += 10;  // Increase the score  // > CustomCode.checkInput:7
        typedWord = "";  // Reset the typed word  // > CustomCode.checkInput:8
        break;  // Exit loop after finding the matching bubble  // > CustomCode.checkInput:9
      }  // > CustomCode.checkInput:10
    }  // > CustomCode.checkInput:11
  }  // > CustomCode.checkInput:12

  function checkGameOver() {  // > CustomCode.checkGameOver:1
    if (gameOver) {  // > CustomCode.checkGameOver:2
      let retry = confirm("Game Over! Try again?");  // > CustomCode.checkGameOver:3
      if (retry) {  // > CustomCode.checkGameOver:4
        resetGame();  // > CustomCode.checkGameOver:5
      }  // > CustomCode.checkGameOver:6
    }  // > CustomCode.checkGameOver:7
  }  // > CustomCode.checkGameOver:8

  function resetGame() {  // > CustomCode.resetGame:1
    bubbles = [];  // > CustomCode.resetGame:2
    typedWord = "";  // > CustomCode.resetGame:3
    gameOver = false;  // > CustomCode.resetGame:4
    score = 0;  // > CustomCode.resetGame:5
    timeElapsed = 0;  // > CustomCode.resetGame:6
    createBubbles();  // Restart the game  // > CustomCode.resetGame:7
    //createBubblesSet();   // > CustomCode.resetGame:8
  }  // > CustomCode.resetGame:9

  function drawBubbles() {  // > CustomCode.drawBubbles:1
    for (let i = 0; i < bubbles.length; i++) {  // > CustomCode.drawBubbles:2
      let bubble = bubbles[i];  // > CustomCode.drawBubbles:3
      bubble.shape.setPosition([bubble.x, bubble.y]);  // Update position  // > CustomCode.drawBubbles:4
      //_view.canvasPanel.render();  // Repaint the canvas  // > CustomCode.drawBubbles:5
    }  // > CustomCode.drawBubbles:6
      // > CustomCode.drawBubbles:7
     for (let i = 0; i < bubbles.length; i++) {  // > CustomCode.drawBubbles:8
      let bubble = bubbles[i];  // > CustomCode.drawBubbles:9
      bubble.text.setPosition([bubble.x, bubble.y]);  // Update position of the text  // > CustomCode.drawBubbles:10
    }  // > CustomCode.drawBubbles:11
    _view.canvasPanel.render();  // Repaint the canvas  // > CustomCode.drawBubbles:12
  }  // > CustomCode.drawBubbles:13

  function playerWins() {  // > CustomCode.playerWins:1
    //const playAgain = confirm("Congratulations, you've popped all the bubbles! Do you want to play again?");  // > CustomCode.playerWins:2
      // > CustomCode.playerWins:3
    if (playAgain) {  // > CustomCode.playerWins:4
      resetGame();  // Reset the game and start again  // > CustomCode.playerWins:5
    }  // > CustomCode.playerWins:6
  }  // > CustomCode.playerWins:7

  function getRandomGoodColorForBlackText() {  // > CustomCode.getRandomColor:1
    const hue = Math.floor(Math.random() * 360);  // Random hue from 0 to 360  // > CustomCode.getRandomColor:2
    const saturation = Math.floor(Math.random() * 31) + 70;  // Saturation between 70% and 100%  // > CustomCode.getRandomColor:3
    const lightness = Math.floor(Math.random() * 31) + 50;  // Lightness between 50% and 80%  // > CustomCode.getRandomColor:4
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;  // HSL color format  // > CustomCode.getRandomColor:5
  }  // > CustomCode.getRandomColor:6
  /*  // > CustomCode.getRandomColor:7
  function getRandomColor() {  // > CustomCode.getRandomColor:8
    const r = Math.floor(Math.random() * 256);  // > CustomCode.getRandomColor:9
    const g = Math.floor(Math.random() * 256);  // > CustomCode.getRandomColor:10
    const b = Math.floor(Math.random() * 256);  // > CustomCode.getRandomColor:11
    return `rgb(${r},${g},${b})`;  // > CustomCode.getRandomColor:12
  }  // > CustomCode.getRandomColor:13
  */  // > CustomCode.getRandomColor:14

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 1"]) return;
    let keydownListenerAdded = false;  // > Initialization.Init Page 1:1
    function addKeydownListener() {  // > Initialization.Init Page 1:2
      if (!keydownListenerAdded) {  // > Initialization.Init Page 1:3
        document.addEventListener('keydown', function(event) {  // > Initialization.Init Page 1:4
          if (event.key === "Backspace") {  // > Initialization.Init Page 1:5
            typedWord = typedWord.slice(0, -1);  // Handle backspace  // > Initialization.Init Page 1:6
          } else {  // > Initialization.Init Page 1:7
            typedWord += event.key;  // Add key to typedWord  // > Initialization.Init Page 1:8
          }  // > Initialization.Init Page 1:9
          checkInput();  // Check if the typed word matches a bubble  // > Initialization.Init Page 1:10
        });  // > Initialization.Init Page 1:11
        keydownListenerAdded = true;  // Ensure listener is only added once  // > Initialization.Init Page 1:12
      }  // > Initialization.Init Page 1:13
    }  // > Initialization.Init Page 1:14
    addKeydownListener();  // Call this in the initialization phase  // > Initialization.Init Page 1:15
    createBubbles();  // > Initialization.Init Page 1:16
    //createBubblesSet()    // > Initialization.Init Page 1:17
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page 1"]) return;
    if (!gameOver && started) {  // > Evolution.Evol Page 1:1
        updateBubbles();  // Update bubble positions  // > Evolution.Evol Page 1:2
        checkGameOver();  // Check for game over  // > Evolution.Evol Page 1:3
        drawBubbles();  // Redraw the bubbles on the canvas  // > Evolution.Evol Page 1:4
    }  // > Evolution.Evol Page 1:5
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "HtmlView Page 1", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new typing4_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.scoreLabel.linkProperty("Text",  function() { return "Score: " + score; } ); // HtmlView Page 1 linking property 'Text' for element 'scoreLabel'
          _view.canvasPanel.linkProperty("Height",  function() { return canvasHeight; }, function(_v) { canvasHeight = _v; } ); // HtmlView Page 1 linking property 'Height' for element 'canvasPanel'
          _view.canvasPanel.linkProperty("Width",  function() { return canvasWidth; }, function(_v) { canvasWidth = _v; } ); // HtmlView Page 1 linking property 'Width' for element 'canvasPanel'
          _view.canvasPanel.linkProperty("MinimumX",  function() { return -canvasWidth/2; } ); // HtmlView Page 1 linking property 'MinimumX' for element 'canvasPanel'
          _view.canvasPanel.linkProperty("MinimumY",  function() { return -canvasHeight/2; } ); // HtmlView Page 1 linking property 'MinimumY' for element 'canvasPanel'
          _view.canvasPanel.linkProperty("MaximumY",  function() { return canvasHeight/2; } ); // HtmlView Page 1 linking property 'MaximumY' for element 'canvasPanel'
          _view.canvasPanel.linkProperty("MaximumX",  function() { return canvasWidth/2; } ); // HtmlView Page 1 linking property 'MaximumX' for element 'canvasPanel'
          _view.Before_you_start__please_make_sure_to_click_anywhere_in_this_window.linkProperty("Visibility",  function() { return !started; } ); // HtmlView Page 1 linking property 'Visibility' for element 'Before_you_start__please_make_sure_to_click_anywhere_in_this_window'
          _view.startButton.linkProperty("Visibility",  function() { return !started; } ); // HtmlView Page 1 linking property 'Visibility' for element 'startButton'
          _view.startButton.setAction("OnClick", function(_data,_info) {
  started = true;

}); // HtmlView Page 1 setting action 'OnClick' for element 'startButton'
          _view.typedWordField.linkProperty("Value",  function() { return typedWord; }, function(_v) { typedWord = _v; } ); // HtmlView Page 1 linking property 'Value' for element 'typedWordField'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(true);
  _model.setFPS(22);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function typing4_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = typing4_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('About','./typing4_Intro_1.html');

  return _view;
} // end of main function

function typing4_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singleDrawingPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page 1: declaration of element 'singleDrawingPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"labelPanel", _view.singleDrawingPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'labelPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"scoreLabel", _view.labelPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'scoreLabel'
      ;

    _view._addElement(EJSS_INTERFACE.wrappedPanel,"wrappedPanel", _view.singleDrawingPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'wrappedPanel'
      .setProperty("CSS",{ "display":"block"}) // EJsS HtmlView.HtmlView Page 1: setting property 'CSS' for element 'wrappedPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.drawingPanel,"canvasPanel", _view.wrappedPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'canvasPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape0", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape0'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape0'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView Page 1: setting property 'LineWidth' for element 'bubbleShape0'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape1", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape1'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape1'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape2", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape2'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape3", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape3'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape4", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape4'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape4'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape5", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape5'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape5'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape6", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape6'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape6'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape7", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape7'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape7'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape8", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape8'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape8'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"bubbleShape9", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShape9'
      .setProperty("FillColor","red") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleShape9'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Before_you_start__please_make_sure_to_click_anywhere_in_this_window", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'Before_you_start__please_make_sure_to_click_anywhere_in_this_window'
      .setProperty("Text","Click on anywhere in this window and then press the button below to start.") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'Before_you_start__please_make_sure_to_click_anywhere_in_this_window'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText0", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText0'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText0'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText0'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText1", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText1'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText1'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText1'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText2", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText2'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText2'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText3", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText3'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText3'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText4", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText4'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText4'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText4'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText5", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText5'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText5'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText5'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText6", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText6'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText6'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText6'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText7", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText7'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText7'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText7'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText8", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText8'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText8'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText8'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"bubbleText9", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleText9'
      .setProperty("FillColor","white") // EJsS HtmlView.HtmlView Page 1: setting property 'FillColor' for element 'bubbleText9'
      .setProperty("Text","bubbleText0") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'bubbleText9'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"bubbleShapeSet", _view.canvasPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'bubbleShapeSet'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"startPanel", _view.wrappedPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'startPanel'
      ;

    _view._addElement(EJSS_INTERFACE.button,"startButton", _view.startPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'startButton'
      .setProperty("Text","Click here to start") // EJsS HtmlView.HtmlView Page 1: setting property 'Text' for element 'startButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"displayPanel", _view.wrappedPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'displayPanel'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"typedWordField", _view.displayPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'typedWordField'
      .setProperty("Height",100) // EJsS HtmlView.HtmlView Page 1: setting property 'Height' for element 'typedWordField'
      .setProperty("Width",500) // EJsS HtmlView.HtmlView Page 1: setting property 'Width' for element 'typedWordField'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView Page 1: setting property 'Editable' for element 'typedWordField'
      .setProperty("Font","normal normal 25px ") // EJsS HtmlView.HtmlView Page 1: setting property 'Font' for element 'typedWordField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"narrativePanel", _view.singleDrawingPanel) // EJsS HtmlView.HtmlView Page 1: declaration of element 'narrativePanel'
      .setProperty("Html","<h2>Bubble Typer!</h2> <p>Bubble Typer is an exciting typing game where your speed and accuracy are put to the test! Words appear inside bubbles that randomly fall from the top of the screen. Your goal is to type each word correctly before the bubbles hit the bottom. The bubbles fall progressively faster as the game goes on, making it more challenging. With dynamic bubble sizes and random positioning, every round is a new experience. Can you pop all the bubbles and beat the game? Type fast and stay sharp!</p>") // EJsS HtmlView.HtmlView Page 1: setting property 'Html' for element 'narrativePanel'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new typing4("_topFrame","_ejs_library/",null);
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
