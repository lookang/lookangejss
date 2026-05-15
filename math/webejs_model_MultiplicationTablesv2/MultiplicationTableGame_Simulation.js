/* _inputParameters: an object with different values for the model parameters */
function MultiplicationTableGame(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

var numericJS = numeric;
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

  var numberofrounds; // EjsS Model.Variables.EditableVariables.numberofrounds
  var numberofoption; // EjsS Model.Variables.EditableVariables.numberofoption
  var answerstringarray; // EjsS Model.Variables.EditableVariables.answerstringarray
  var catchanswerarray; // EjsS Model.Variables.EditableVariables.catchanswerarray
  var vx; // EjsS Model.Variables.EditableVariables.vx
  var backGroundImage; // EjsS Model.Variables.EditableVariables.backGroundImage
  var title; // EjsS Model.Variables.EditableVariables.title

  var font; // EjsS Model.Variables.Var Table.font
  var t; // EjsS Model.Variables.Var Table.t
  var dt; // EjsS Model.Variables.Var Table.dt
  var n; // EjsS Model.Variables.Var Table.n
  var x; // EjsS Model.Variables.Var Table.x
  var ymax; // EjsS Model.Variables.Var Table.ymax
  var y; // EjsS Model.Variables.Var Table.y
  var vy; // EjsS Model.Variables.Var Table.vy
  var text; // EjsS Model.Variables.Var Table.text
  var textanswer; // EjsS Model.Variables.Var Table.textanswer
  var vocabaudio; // EjsS Model.Variables.Var Table.vocabaudio
  var a; // EjsS Model.Variables.Var Table.a
  var b; // EjsS Model.Variables.Var Table.b
  var c; // EjsS Model.Variables.Var Table.c

  var xc; // EjsS Model.Variables.Var Table 2.xc
  var yc; // EjsS Model.Variables.Var Table 2.yc
  var score; // EjsS Model.Variables.Var Table 2.score
  var textcatch; // EjsS Model.Variables.Var Table 2.textcatch
  var correct; // EjsS Model.Variables.Var Table 2.correct
  var log; // EjsS Model.Variables.Var Table 2.log
  var notrynumber; // EjsS Model.Variables.Var Table 2.notrynumber

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
      numberofrounds : numberofrounds,
      numberofoption : numberofoption,
      answerstringarray : answerstringarray,
      catchanswerarray : catchanswerarray,
      vx : vx,
      backGroundImage : backGroundImage,
      title : title,
      font : font,
      t : t,
      dt : dt,
      n : n,
      x : x,
      ymax : ymax,
      y : y,
      vy : vy,
      text : text,
      textanswer : textanswer,
      vocabaudio : vocabaudio,
      a : a,
      b : b,
      c : c,
      xc : xc,
      yc : yc,
      score : score,
      textcatch : textcatch,
      correct : correct,
      log : log,
      notrynumber : notrynumber
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      numberofrounds : numberofrounds,
      numberofoption : numberofoption,
      answerstringarray : answerstringarray,
      catchanswerarray : catchanswerarray,
      vx : vx,
      backGroundImage : backGroundImage,
      title : title,
      font : font,
      t : t,
      dt : dt,
      n : n,
      x : x,
      ymax : ymax,
      y : y,
      vy : vy,
      text : text,
      textanswer : textanswer,
      vocabaudio : vocabaudio,
      a : a,
      b : b,
      c : c,
      xc : xc,
      yc : yc,
      score : score,
      textcatch : textcatch,
      correct : correct,
      log : log,
      notrynumber : notrynumber
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.numberofrounds != "undefined") numberofrounds = json.numberofrounds;
    if(typeof json.numberofoption != "undefined") numberofoption = json.numberofoption;
    if(typeof json.answerstringarray != "undefined") answerstringarray = json.answerstringarray;
    if(typeof json.catchanswerarray != "undefined") catchanswerarray = json.catchanswerarray;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.backGroundImage != "undefined") backGroundImage = json.backGroundImage;
    if(typeof json.title != "undefined") title = json.title;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.textanswer != "undefined") textanswer = json.textanswer;
    if(typeof json.vocabaudio != "undefined") vocabaudio = json.vocabaudio;
    if(typeof json.a != "undefined") a = json.a;
    if(typeof json.b != "undefined") b = json.b;
    if(typeof json.c != "undefined") c = json.c;
    if(typeof json.xc != "undefined") xc = json.xc;
    if(typeof json.yc != "undefined") yc = json.yc;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.textcatch != "undefined") textcatch = json.textcatch;
    if(typeof json.correct != "undefined") correct = json.correct;
    if(typeof json.log != "undefined") log = json.log;
    if(typeof json.notrynumber != "undefined") notrynumber = json.notrynumber;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.numberofrounds != "undefined") numberofrounds = json.numberofrounds;
    if(typeof json.numberofoption != "undefined") numberofoption = json.numberofoption;
    if(typeof json.answerstringarray != "undefined") answerstringarray = json.answerstringarray;
    if(typeof json.catchanswerarray != "undefined") catchanswerarray = json.catchanswerarray;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.backGroundImage != "undefined") backGroundImage = json.backGroundImage;
    if(typeof json.title != "undefined") title = json.title;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vy != "undefined") vy = json.vy;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.textanswer != "undefined") textanswer = json.textanswer;
    if(typeof json.vocabaudio != "undefined") vocabaudio = json.vocabaudio;
    if(typeof json.a != "undefined") a = json.a;
    if(typeof json.b != "undefined") b = json.b;
    if(typeof json.c != "undefined") c = json.c;
    if(typeof json.xc != "undefined") xc = json.xc;
    if(typeof json.yc != "undefined") yc = json.yc;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.textcatch != "undefined") textcatch = json.textcatch;
    if(typeof json.correct != "undefined") correct = json.correct;
    if(typeof json.log != "undefined") log = json.log;
    if(typeof json.notrynumber != "undefined") notrynumber = json.notrynumber;
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
    __pagesEnabled["Questions"] = true;
    __pagesEnabled["shuffleArray(array)"] = true;
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["messageSize"] = true;
    __pagesEnabled["picturesize"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["collisioncorrect"] = true;
    __pagesEnabled["miss"] = true;
    __pagesEnabled["miss1"] = true;
    __pagesEnabled["miss2"] = true;
    __pagesEnabled["miss3"] = true;
    __pagesEnabled["collisionwrong2"] = true;
    __pagesEnabled["collisionwrong 3"] = true;
    __pagesEnabled["collisionwrong 4"] = true;
    __pagesEnabled["FixRel Page"] = true;
  });

  _model.addToReset(function() {
    numberofrounds = 6; // EjsS Model.Variables.EditableVariables.numberofrounds
    numberofoption = 4; // EjsS Model.Variables.EditableVariables.numberofoption
    answerstringarray = [["6","3","2","23"],["24","6","4","46"],["15","35","8","35"],["42","48","13","49"],["72","17","64","89"],["0","10","100","1"]]; // EjsS Model.Variables.EditableVariables.answerstringarray
    catchanswerarray = ["2 x 3 ","4 x 6","5 x 3","6 x 7","8 x 9","10 x 0"]; // EjsS Model.Variables.EditableVariables.catchanswerarray
    vx = new Array(numberofoption); // EjsS Model.Variables.EditableVariables.vx
    (function () {
      var _i0;
      for (_i0=0; _i0<numberofoption; _i0+=1) {  // EjsS Model.Variables.EditableVariables.vx
        vx[_i0] = Math.max(Math.random(),0.3);  // EjsS Model.Variables.EditableVariables.vx
      }
    }());
    backGroundImage = "./Unnamed3/Artic.png"; // EjsS Model.Variables.EditableVariables.backGroundImage
    title = "Multiplication Tables"; // EjsS Model.Variables.EditableVariables.title
  });

  _model.addToReset(function() {
    font = ""; // EjsS Model.Variables.Var Table.font
    t = 0; // EjsS Model.Variables.Var Table.t
    dt = 0.05; // EjsS Model.Variables.Var Table.dt
    n = numberofoption; // EjsS Model.Variables.Var Table.n
    x = new Array(n); // EjsS Model.Variables.Var Table.x
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.x
        x[_i0] = 2.8;  // EjsS Model.Variables.Var Table.x
      }
    }());
    ymax = 6; // EjsS Model.Variables.Var Table.ymax
    y = new Array(n); // EjsS Model.Variables.Var Table.y
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.y
        y[_i0] = "";  // EjsS Model.Variables.Var Table.y
      }
    }());
    vy = new Array(n); // EjsS Model.Variables.Var Table.vy
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.vy
        vy[_i0] = 0;  // EjsS Model.Variables.Var Table.vy
      }
    }());
    text = [1,2,3,4]; // EjsS Model.Variables.Var Table.text
    textanswer = new Array(n); // EjsS Model.Variables.Var Table.textanswer
    a = new Array(n); // EjsS Model.Variables.Var Table.a
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.a
        a[_i0] = Math.round(Math.random()*10);  // EjsS Model.Variables.Var Table.a
      }
    }());
    b = new Array(n); // EjsS Model.Variables.Var Table.b
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.b
        b[_i0] = Math.round(Math.random()*10);  // EjsS Model.Variables.Var Table.b
      }
    }());
    c = new Array(n); // EjsS Model.Variables.Var Table.c
    (function () {
      var _i0;
      for (_i0=0; _i0<n; _i0+=1) {  // EjsS Model.Variables.Var Table.c
        c[_i0] = 1;  // EjsS Model.Variables.Var Table.c
      }
    }());
  });

  _model.addToReset(function() {
    xc = 0; // EjsS Model.Variables.Var Table 2.xc
    yc = 2.5; // EjsS Model.Variables.Var Table 2.yc
    score = 0; // EjsS Model.Variables.Var Table 2.score
    textcatch = ""; // EjsS Model.Variables.Var Table 2.textcatch
    correct = 0; // EjsS Model.Variables.Var Table 2.correct
    notrynumber = 0; // EjsS Model.Variables.Var Table 2.notrynumber
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

  // in initialization  // > CustomCode.shuffleArray(array):1
  // possible usage if x is the array  // > CustomCode.shuffleArray(array):2
  //shuffleArray(x);  // > CustomCode.shuffleArray(array):3
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array  // > CustomCode.shuffleArray(array):4
  /**  // > CustomCode.shuffleArray(array):5
   * Randomize array element order in-place.  // > CustomCode.shuffleArray(array):6
   * Using Durstenfeld shuffle algorithm.  // > CustomCode.shuffleArray(array):7
   */  // > CustomCode.shuffleArray(array):8
  function shuffleArray(array) {  // > CustomCode.shuffleArray(array):9
      for (var i = array.length - 1; i > 0; i--) {  // > CustomCode.shuffleArray(array):10
          var j = Math.floor(Math.random() * (i + 1));  // > CustomCode.shuffleArray(array):11
          var temp = array[i];  // > CustomCode.shuffleArray(array):12
          array[i] = array[j];  // > CustomCode.shuffleArray(array):13
          array[j] = temp;  // > CustomCode.shuffleArray(array):14
      }  // > CustomCode.shuffleArray(array):15
  }  // > CustomCode.shuffleArray(array):16

  // copy this custom function  // > CustomCode.speech:1
  // in iOS need to add speech to the play button as On iOS the API works but must be triggered by a user action callback, like a response to a tap event, to provide a better experience to users and avoid unexpected sounds out of your phone  // > CustomCode.speech:2
  function speech (option) {  // > CustomCode.speech:3
  // allow code to run in Student Learning Space   // > CustomCode.speech:4
  var isCordova = (!!this.parent.cordova || !!window.cordova);  // > CustomCode.speech:5
  if(isCordova) { // check it is running in Android or iOS  // > CustomCode.speech:6
          parent.TTS.speak({text:option,locale:'en-US'});  // > CustomCode.speech:7
  	// parent.TTS.speak({text:option,locale:'en-US'});  // > CustomCode.speech:8
  } else {  // > CustomCode.speech:9
    var msg = new SpeechSynthesisUtterance(option);  // > CustomCode.speech:10
    //https://stackoverflow.com/questions/43983845/speechsynthesis-api-for-english-firefox  // > CustomCode.speech:11
    // Set the text.  // > CustomCode.speech:12
  	//msg.text = option;   // > CustomCode.speech:13
  	//https://forums.developer.apple.com/message/323564#323564  // > CustomCode.speech:14
  	// comment out the next 2 lines for english  // > CustomCode.speech:15
  //msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Ting-Ting'; })[0];  // > CustomCode.speech:16
  msg.lang = 'en-US'; // need for android?  // > CustomCode.speech:17
  //https://flaviocopes.com/speech-synthesis-api/  // > CustomCode.speech:18
  //debug  // > CustomCode.speech:19
  //console.log(`Voices #: ${speechSynthesis.getVoices().length}`)  // > CustomCode.speech:20
  //speechSynthesis.getVoices().forEach(voice => {  // > CustomCode.speech:21
  // console.log(voice.name, voice.lang)  // > CustomCode.speech:22
  //})  // > CustomCode.speech:23
  //debug  // > CustomCode.speech:24
  // Queue this utterance.  // > CustomCode.speech:25
  window.speechSynthesis.speak(msg);  // > CustomCode.speech:26
  }  // > CustomCode.speech:27
  }  // > CustomCode.speech:28

  function vyspeedchange () {  // > CustomCode.vyspeedchange:1
    for (var counter=0; counter<n  ; counter++) {  // > CustomCode.vyspeedchange:2
    //vx[counter]=0.3;  // > CustomCode.vyspeedchange:3
    vx[counter] = Math.max(Math.random(),0.3);  // > CustomCode.vyspeedchange:4
  }  // > CustomCode.vyspeedchange:5
  }  // > CustomCode.vyspeedchange:6

  function setResponsiveFontSize() {  // > CustomCode.setResponsiveFontSize:1
      // Get the viewport dimensions  // > CustomCode.setResponsiveFontSize:2
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;  // > CustomCode.setResponsiveFontSize:3
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;  // > CustomCode.setResponsiveFontSize:4
      var percent = 0.03  // > CustomCode.setResponsiveFontSize:5
      // Calculate the font size based on viewport width or height  // > CustomCode.setResponsiveFontSize:6
      var fontSize = Math.min(viewportWidth * percent, viewportHeight * percent); // Adjust the multiplier as needed  // > CustomCode.setResponsiveFontSize:7
      // Set the font size  // > CustomCode.setResponsiveFontSize:8
      font = "normal normal " + fontSize + "px"; // You can use px or other units as needed  // > CustomCode.setResponsiveFontSize:9
      // Apply the font size to your elements  // > CustomCode.setResponsiveFontSize:10
      // For example, you can apply it to a specific element with a class  // > CustomCode.setResponsiveFontSize:11
      //document.getElementById("yourElementId").style.font = font;  // > CustomCode.setResponsiveFontSize:12
  }  // > CustomCode.setResponsiveFontSize:13

  // AllQuestions  // > CustomCode.AllQuestions:1
  let multiplicationTable = [  // > CustomCode.AllQuestions:2
    "1x1", "1x2", "1x3", "1x4", "1x5", "1x6", "1x7", "1x8", "1x9", "1x10",  // > CustomCode.AllQuestions:3
    "2x1", "2x2", "2x3", "2x4", "2x5", "2x6", "2x7", "2x8", "2x9", "2x10",  // > CustomCode.AllQuestions:4
    "3x1", "3x2", "3x3", "3x4", "3x5", "3x6", "3x7", "3x8", "3x9", "3x10",  // > CustomCode.AllQuestions:5
    "4x1", "4x2", "4x3", "4x4", "4x5", "4x6", "4x7", "4x8", "4x9", "4x10",  // > CustomCode.AllQuestions:6
    "5x1", "5x2", "5x3", "5x4", "5x5", "5x6", "5x7", "5x8", "5x9", "5x10",  // > CustomCode.AllQuestions:7
    "6x1", "6x2", "6x3", "6x4", "6x5", "6x6", "6x7", "6x8", "6x9", "6x10",  // > CustomCode.AllQuestions:8
    "7x1", "7x2", "7x3", "7x4", "7x5", "7x6", "7x7", "7x8", "7x9", "7x10",  // > CustomCode.AllQuestions:9
    "8x1", "8x2", "8x3", "8x4", "8x5", "8x6", "8x7", "8x8", "8x9", "8x10",  // > CustomCode.AllQuestions:10
    "9x1", "9x2", "9x3", "9x4", "9x5", "9x6", "9x7", "9x8", "9x9", "9x10",  // > CustomCode.AllQuestions:11
    "10x1", "10x2", "10x3", "10x4", "10x5", "10x6", "10x7", "10x8", "10x9", "10x10"  // > CustomCode.AllQuestions:12
  ];  // > CustomCode.AllQuestions:13
  function possibleAnswers(multiplication) {  // > CustomCode.AllQuestions:14
    const numbers = multiplication.match(/\d+/g).map(Number);  // > CustomCode.AllQuestions:15
    const x = numbers[0], y = numbers[1];  // > CustomCode.AllQuestions:16
    //_println("multi = "+multiplication);  // > CustomCode.AllQuestions:17
    //_println("X="+x+ ". y = "+y);  // > CustomCode.AllQuestions:18
    var biggest = parseInt(x+""+y);  // > CustomCode.AllQuestions:19
    if (biggest>100) biggest = x*y + 1;  // > CustomCode.AllQuestions:20
    return [ ""+(x*y), ""+(x+y), ""+ Math.max(x,y)-Math.min(x,y), ""+biggest ];   // > CustomCode.AllQuestions:21
  }   // > CustomCode.AllQuestions:22

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Questions"]) return;
    // Questions  // > Initialization.Questions:1
    shuffleArray(multiplicationTable);  // > Initialization.Questions:2
    answerstringarray = [];  // > Initialization.Questions:3
    for (var i=0; i<numberofrounds; i++) {  // > Initialization.Questions:4
        const mult = multiplicationTable[i];  // > Initialization.Questions:5
        catchanswerarray[i] = mult;  // > Initialization.Questions:6
        answerstringarray[i] = possibleAnswers(mult);  // > Initialization.Questions:7
    }  // > Initialization.Questions:8
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["shuffleArray(array)"]) return;
    textanswer = answerstringarray[0];  // > Initialization.shuffleArray(array):1
    textcatch = catchanswerarray[0] // assign first word to catcher rabbit  // > Initialization.shuffleArray(array):2
    //numeric.linspace (start,stop,number)  // > Initialization.shuffleArray(array):3
    y = numeric.linspace(0,ymax,numberofoption) //using numeric library to arrange  // > Initialization.shuffleArray(array):4
    shuffleArray(y);  // > Initialization.shuffleArray(array):5
    //  // > Initialization.shuffleArray(array):6
    setResponsiveFontSize()  // > Initialization.shuffleArray(array):7
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (log==undefined){  // > Initialization.undefined:1
      log="";  // > Initialization.undefined:2
      }  // > Initialization.undefined:3
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["messageSize"]) return;
    if (_isMobile){  // > Initialization.messageSize:1
      //do nothing  // > Initialization.messageSize:2
      }  // > Initialization.messageSize:3
        // > Initialization.messageSize:4
      else{  // > Initialization.messageSize:5
        // copy this into the initialization  // > Initialization.messageSize:6
    // make the font bigger  // > Initialization.messageSize:7
    var fontSize = "1vw"  // > Initialization.messageSize:8
    _view.plottingPanel.getMessageDecoration("TL").getFont().setFontSize(fontSize);  // > Initialization.messageSize:9
    _view.plottingPanel.getMessageDecoration("TR").getFont().setFontSize(fontSize);  // > Initialization.messageSize:10
    _view.plottingPanel.getMessageDecoration("BL").getFont().setFontSize(fontSize);  // > Initialization.messageSize:11
    _view.plottingPanel.getMessageDecoration("BR").getFont().setFontSize(fontSize);  // > Initialization.messageSize:12
    //_view.plottingPanel.getMessageDecoration("TL").getStyle().setFillColor("red");  // > Initialization.messageSize:13
        }  // > Initialization.messageSize:14
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["picturesize"]) return;
    //orig_listener = _view.plottingPanel.getAxisX().panelChangeListener; _view.plottingPanel.getAxisX().panelChangeListener = function(e) { orig_listener(e); _view.backgroundsoccerfield.setSizeX(_view.plottingPanel.getRealWorldXMax()-_view.plottingPanel.getRealWorldXMin()); _view.backgroundsoccerfield.setSizeY(_view.plottingPanel.getRealWorldYMax()-_view.plottingPanel.getRealWorldYMin()); }  // > Initialization.picturesize:1
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
    var __solverClass = EJSS_ODE_SOLVERS.rungeKutta4;
    var __state=[];
    var _ODE_evolution1_Event1;
    var _ODE_evolution1_Event2;
    var _ODE_evolution1_Event3;
    var _ODE_evolution1_Event4;
    var _ODE_evolution1_Event5;
    var _ODE_evolution1_Event6;
    var _ODE_evolution1_Event7;
    var _ODE_evolution1_Event8;
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
      if (__pagesEnabled["collisioncorrect"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      if (__pagesEnabled["miss"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
      if (__pagesEnabled["miss1"]) __eventSolver.addEvent(_ODE_evolution1_Event3());
      if (__pagesEnabled["miss2"]) __eventSolver.addEvent(_ODE_evolution1_Event4());
      if (__pagesEnabled["miss3"]) __eventSolver.addEvent(_ODE_evolution1_Event5());
      if (__pagesEnabled["collisionwrong2"]) __eventSolver.addEvent(_ODE_evolution1_Event6());
      if (__pagesEnabled["collisionwrong 3"]) __eventSolver.addEvent(_ODE_evolution1_Event7());
      if (__pagesEnabled["collisionwrong 4"]) __eventSolver.addEvent(_ODE_evolution1_Event8());
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
        var i;
        for (i=0;i<_xLength;i++) {
          _aRate[__cRate++] = Array.isArray(-vx[i]) ? -vx[i][i] : -vx[i]; // Rate for ODE: Evol Page:x
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

    _ODE_evolution1_Event1 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[0]-xc)*(x[0]-xc)+(y[0]-yc)*(y[0]-yc))-0.5;  // > Event zero-condition for page Evol Page:1
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
        //alert();  // > Event action for page Evol Page:1
        score=score+2;  // > Event action for page Evol Page:2
        correct = correct +1;  // > Event action for page Evol Page:3
        _view.audio.play();  // > Event action for page Evol Page:4
        log = log+"\n"+textcatch+" = "+textanswer[0]+"✅";   // > Event action for page Evol Page:5
        x[0]=3;  // > Event action for page Evol Page:6
        x[1]=3;  // > Event action for page Evol Page:7
        x[2]=3;  // > Event action for page Evol Page:8
        x[3]=3;  // > Event action for page Evol Page:9
        shuffleArray(y);   // > Event action for page Evol Page:10
        //speech("correct");  // > Event action for page Evol Page:11
        //speech(textanswer[0]+" is the past tense of "+textcatch;  // > Event action for page Evol Page:12
        // new code for   // > Event action for page Evol Page:13
         Speechx = "x";  // > Event action for page Evol Page:14
        var textcatchSpeech = textcatch.split(Speechx).join('and');  // > Event action for page Evol Page:15
        console.log(textcatch); // Output: "Replace the string and with and and more and"  // > Event action for page Evol Page:16
        speech(textanswer[0]+" is the product of "+textcatchSpeech);  // > Event action for page Evol Page:17
        // end of new code  // > Event action for page Evol Page:18
        //speech(textanswer[0]+" is the product of "+textcatch);  // > Event action for page Evol Page:19
        //alert();  // > Event action for page Evol Page:20
        if (correct==numberofrounds){ // game mechanism counter  // > Event action for page Evol Page:21
          _pause();  // > Event action for page Evol Page:22
          _tools.showOkDialog("Well Done，your score is "+score+"/"+2*numberofrounds+" !");  // > Event action for page Evol Page:23
          _view.audio1.play();  // > Event action for page Evol Page:24
          }  // > Event action for page Evol Page:25
          else{  // > Event action for page Evol Page:26
        textanswer=answerstringarray[correct]; //since correct is increase by 1, use this to change 4 options  // > Event action for page Evol Page:27
        textcatch=catchanswerarray[correct]; // change basket text as well  // > Event action for page Evol Page:28
        } // game mechanism counter  // > Event action for page Evol Page:29
        vyspeedchange ();  // > Event action for page Evol Page:30
        notrynumber=0;  // > Event action for page Evol Page:31
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event2 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[0]-0;  // > Event zero-condition for page Evol Page:1
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
        x[0] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event3 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[1]-0;  // > Event zero-condition for page Evol Page:1
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
        x[1] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event4 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[2]-0;  // > Event zero-condition for page Evol Page:1
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
        x[2] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event5 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return x[3]-0;  // > Event zero-condition for page Evol Page:1
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
        x[3] = 3;  // > Event action for page Evol Page:1
        notrynumber = notrynumber+1;  // > Event action for page Evol Page:2
        if (notrynumber%4==0) {  // > Event action for page Evol Page:3
        score=score-0.5;  // > Event action for page Evol Page:4
        log = log+"\n"+"口口"+textcatch+"❓";  // > Event action for page Evol Page:5
        }  // > Event action for page Evol Page:6
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event6 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[1]-xc)*(x[1]-xc)+(y[1]-yc)*(y[1]-yc))-0.25;  // > Event zero-condition for page Evol Page:1
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
        //alert();  // > Event action for page Evol Page:1
        score=score-1;  // > Event action for page Evol Page:2
        log = log+"\n"+textcatch+" = "+textanswer[1]+"❌";  // > Event action for page Evol Page:3
        x[1]=3;  // > Event action for page Evol Page:4
        //x[2]=3;  // > Event action for page Evol Page:5
        //x[3]=3;  // > Event action for page Evol Page:6
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event7 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[2]-xc)*(x[2]-xc)+(y[2]-yc)*(y[2]-yc))-0.25;  // > Event zero-condition for page Evol Page:1
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
        //alert();  // > Event action for page Evol Page:1
        score=score-1;  // > Event action for page Evol Page:2
        log = log+"\n"+textcatch+" = "+textanswer[2]+"❌";  // > Event action for page Evol Page:3
        //x[0]=3;  // > Event action for page Evol Page:4
        //x[1]=3;  // > Event action for page Evol Page:5
        x[2]=3;  // > Event action for page Evol Page:6
        //x[3]=3;  // > Event action for page Evol Page:7
        return false;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event8 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = [];
        for (__i=0;__i<_xLength; __i++) {
          x[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return Math.sqrt((x[3]-xc)*(x[3]-xc)+(y[3]-yc)*(y[3]-yc))-0.25;  // > Event zero-condition for page Evol Page:1
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
        //alert();  // > Event action for page Evol Page:1
        score=score-1;  // > Event action for page Evol Page:2
        log = log+"\n"+textcatch+" = "+textanswer[3]+"❌";  // > Event action for page Evol Page:3
        //x[0]=3;  // > Event action for page Evol Page:4
        //x[1]=3;  // > Event action for page Evol Page:5
        //x[2]=3;  // > Event action for page Evol Page:6
        x[3]=3;  // > Event action for page Evol Page:7
        return false;
      }

      return _eventSelf;
    }; // End of event

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
    _viewsInfo[_counter++] = { name : "HtmlView", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new MultiplicationTableGame_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.parsedField.linkProperty("Value",  function() { return numberofrounds; }, function(_v) { numberofrounds = _v; } ); // HtmlView linking property 'Value' for element 'parsedField'
          _view.parsedField.linkProperty("Editable",  function() { return _isPaused; } ); // HtmlView linking property 'Editable' for element 'parsedField'
          _view.parsedField.setAction("OnChange", _initialize); // HtmlView setting action 'OnChange' for element 'parsedField'
          _view.title.linkProperty("Text",  function() { return title; }, function(_v) { title = _v; } ); // HtmlView linking property 'Text' for element 'title'
          _view.title.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'title'
          _view.executionPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'executionPanel'
          _view.runPauseButton.setAction("OffClick", _pause); // HtmlView setting action 'OffClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView linking property 'State' for element 'runPauseButton'
          _view.runPauseButton.setAction("OnClick", function(_data,_info) {
  _play();
  //speech("玩");

}); // HtmlView setting action 'OnClick' for element 'runPauseButton'
          _view.stepButton.setAction("OnClick", _step); // HtmlView setting action 'OnClick' for element 'stepButton'
          _view.initButton.setAction("OnClick", _initialize); // HtmlView setting action 'OnClick' for element 'initButton'
          _view.resetButton.setAction("OnClick", _reset); // HtmlView setting action 'OnClick' for element 'resetButton'
          _view.button.setAction("OnClick", function(_data,_info) {
  let x = "x";
  var textcatchSpeech = textcatch.split(x).join('and');
  console.log(textcatch); // Output: "Replace the string and with and and more and"
  speech(textanswer[0]+" is the product of "+textcatchSpeech);

}); // HtmlView setting action 'OnClick' for element 'button'
          _view.timeField.linkProperty("Value",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView linking property 'Value' for element 'timeField'
          _view.plottingPanel.linkProperty("Height",  function() { return ""+window.innerHeight*0.9; } ); // HtmlView linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TRMessage",  function() { return "Total Score="+score+"/"+2*numberofrounds+"\n"+log; } ); // HtmlView linking property 'TRMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return "Score = "+score; } ); // HtmlView linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("BRMessage",  function() { return "Not attempted = "+notrynumber; } ); // HtmlView linking property 'BRMessage' for element 'plottingPanel'
          _view.background.linkProperty("SizeY",  function() { return ymax*(1.2+0.2); } ); // HtmlView linking property 'SizeY' for element 'background'
          _view.imageSet.linkProperty("NumberOfElements",  function() { return numberofoption; }, function(_v) { numberofoption = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'imageSet'
          _view.imageSet.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView linking property 'X' for element 'imageSet'
          _view.imageSet.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView linking property 'Y' for element 'imageSet'
          _view.image.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView linking property 'X' for element 'image'
          _view.image.linkProperty("Y",  function() { return yc; }, function(_v) { yc = _v; } ); // HtmlView linking property 'Y' for element 'image'
          _view.backingforwords.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView linking property 'X' for element 'backingforwords'
          _view.backingforwords.linkProperty("Y",  function() { return yc; }, function(_v) { yc = _v; } ); // HtmlView linking property 'Y' for element 'backingforwords'
          _view.textcatch.linkProperty("X",  function() { return xc; }, function(_v) { xc = _v; } ); // HtmlView linking property 'X' for element 'textcatch'
          _view.textcatch.linkProperty("Y",  function() { return yc; }, function(_v) { yc = _v; } ); // HtmlView linking property 'Y' for element 'textcatch'
          _view.textcatch.linkProperty("Text",  function() { return textcatch; }, function(_v) { textcatch = _v; } ); // HtmlView linking property 'Text' for element 'textcatch'
          _view.answerstringarray.linkProperty("NumberOfElements",  function() { return n; }, function(_v) { n = _v; } ); // HtmlView linking property 'NumberOfElements' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView linking property 'X' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView linking property 'Y' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("Text",  function() { return textanswer; }, function(_v) { textanswer = _v; } ); // HtmlView linking property 'Text' for element 'answerstringarray'
          _view.answerstringarray.setAction("OnPress", function(_data,_info) {
  speech(textanswer[vocabaudio]);

}); // HtmlView setting action 'OnPress' for element 'answerstringarray'
          _view.answerstringarray.linkProperty("ElementInteracted",  function() { return vocabaudio; }, function(_v) { vocabaudio = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'answerstringarray'
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
function MultiplicationTableGame_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = MultiplicationTableGame_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function MultiplicationTableGame_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"singlePlotPanel", _view._topFrame) // EJsS HtmlView.HtmlView: declaration of element 'singlePlotPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"labelNQ", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'labelNQ'
      .setProperty("Text","Questions:") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'labelNQ'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'labelNQ'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"parsedField", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'parsedField'
      .setProperty("Height",30) // EJsS HtmlView.HtmlView: setting property 'Height' for element 'parsedField'
      .setProperty("Width",50) // EJsS HtmlView.HtmlView: setting property 'Width' for element 'parsedField'
      .setProperty("Format","0.") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'parsedField'
      .setProperty("Font","normal normal medium Arial, Helvetica, sans-serif") // EJsS HtmlView.HtmlView: setting property 'Font' for element 'parsedField'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'parsedField'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"title", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'title'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"executionPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'executionPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'executionPanel'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"runPauseButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'runPauseButton'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView: setting property 'TextOn' for element 'runPauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'runPauseButton'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView: setting property 'TextOff' for element 'runPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'stepButton'
      .setProperty("Tooltip","Step") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'stepButton'
      .setProperty("Text","Step|►") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'stepButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"initButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'initButton'
      .setProperty("Tooltip","Initialize") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'initButton'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'initButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'resetButton'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'resetButton'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"button", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'button'
      .setProperty("Text","button") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'button'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'button'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"labelTime", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'labelTime'
      .setProperty("Text","Time (s) : ") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'labelTime'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"timeField", _view.executionPanel) // EJsS HtmlView.HtmlView: declaration of element 'timeField'
      .setProperty("Height",30) // EJsS HtmlView.HtmlView: setting property 'Height' for element 'timeField'
      .setProperty("Width",50) // EJsS HtmlView.HtmlView: setting property 'Width' for element 'timeField'
      .setProperty("Format","0.") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'timeField'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView: setting property 'Editable' for element 'timeField'
      .setProperty("Font","normal normal medium Arial, Helvetica, sans-serif") // EJsS HtmlView.HtmlView: setting property 'Font' for element 'timeField'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("MaximumY",6) // EJsS HtmlView.HtmlView: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",3.5) // EJsS HtmlView.HtmlView: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("GridYShow",true) // EJsS HtmlView.HtmlView: setting property 'GridYShow' for element 'plottingPanel'
      .setProperty("MinimumX",-0.5) // EJsS HtmlView.HtmlView: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("MarginY",20) // EJsS HtmlView.HtmlView: setting property 'MarginY' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("GridXShow",true) // EJsS HtmlView.HtmlView: setting property 'GridXShow' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"background", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'background'
      .setProperty("SizeX",4) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'background'
      .setProperty("X",1.5) // EJsS HtmlView.HtmlView: setting property 'X' for element 'background'
      .setProperty("ImageUrl","./Artic.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'background'
      .setProperty("Y",2.5) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'background'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"imageSet", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'imageSet'
      .setProperty("SizeX",150) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'imageSet'
      .setProperty("ImageUrl","./penguinplain.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'imageSet'
      .setProperty("SizeY",150) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'imageSet'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView: setting property 'PixelSize' for element 'imageSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'group'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offSetY", _view.group) // EJsS HtmlView.HtmlView: declaration of element 'offSetY'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'offSetY'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"image", _view.offSetY) // EJsS HtmlView.HtmlView: declaration of element 'image'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'image'
      .setProperty("SizeX",150) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'image'
      .setProperty("ImageUrl","./iglooBigBlank.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'image'
      .setProperty("SizeY",150) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'image'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView: setting property 'PixelSize' for element 'image'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'image'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"backingforwords", _view.group) // EJsS HtmlView.HtmlView: declaration of element 'backingforwords'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'backingforwords'
      .setProperty("SizeX",0.4) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'backingforwords'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'backingforwords'
      .setProperty("SizeY",0.5) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'backingforwords'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"textcatch", _view.group) // EJsS HtmlView.HtmlView: declaration of element 'textcatch'
      .setProperty("FillColor","Black") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'textcatch'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'textcatch'
      .setProperty("OutlineColor","Blue") // EJsS HtmlView.HtmlView: setting property 'OutlineColor' for element 'textcatch'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'textcatch'
      .setProperty("Font","normal bold 20px \"Comic Sans MS\", cursive, sans-serif") // EJsS HtmlView.HtmlView: setting property 'Font' for element 'textcatch'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'textcatch'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsetY", _view.plottingPanel) // EJsS HtmlView.HtmlView: declaration of element 'offsetY'
      .setProperty("Y",-0.40) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'offsetY'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"answerstringarray", _view.offsetY) // EJsS HtmlView.HtmlView: declaration of element 'answerstringarray'
      .setProperty("FillColor","Red") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'answerstringarray'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'answerstringarray'
      .setProperty("Visibility",true) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'answerstringarray'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'answerstringarray'
      .setProperty("Font","normal bold larger Arial, Helvetica, sans-serif") // EJsS HtmlView.HtmlView: setting property 'Font' for element 'answerstringarray'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'audio'
      .setProperty("AudioUrl","./Unnamed3/Ding Sound Effect.m4a") // EJsS HtmlView.HtmlView: setting property 'AudioUrl' for element 'audio'
      ;

    _view._addElement(EJSS_INTERFACE.audio,"audio1", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'audio1'
      .setProperty("AudioUrl","./Unnamed3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3") // EJsS HtmlView.HtmlView: setting property 'AudioUrl' for element 'audio1'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"labelNQuestions", _view.singlePlotPanel) // EJsS HtmlView.HtmlView: declaration of element 'labelNQuestions'
      .setProperty("Text","labelNQuestions") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'labelNQuestions'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'labelNQuestions'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new MultiplicationTableGame("_topFrame","_ejs_library/",null);
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
