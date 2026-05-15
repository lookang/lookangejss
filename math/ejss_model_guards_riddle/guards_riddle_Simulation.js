function guards_riddle(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var n; // EjsS Model.Variables.Var Table.n
  var guardX; // EjsS Model.Variables.Var Table.guardX
  var guardY; // EjsS Model.Variables.Var Table.guardY
  var initGuardX; // EjsS Model.Variables.Var Table.initGuardX
  var guardVal; // EjsS Model.Variables.Var Table.guardVal
  var guardPos; // EjsS Model.Variables.Var Table.guardPos
  var guardWidth; // EjsS Model.Variables.Var Table.guardWidth
  var guardHeight; // EjsS Model.Variables.Var Table.guardHeight
  var pairList; // EjsS Model.Variables.Var Table.pairList
  var boxX; // EjsS Model.Variables.Var Table.boxX
  var boxY; // EjsS Model.Variables.Var Table.boxY
  var boxPos; // EjsS Model.Variables.Var Table.boxPos
  var boxOccupied; // EjsS Model.Variables.Var Table.boxOccupied
  var textStr; // EjsS Model.Variables.Var Table.textStr
  var interact; // EjsS Model.Variables.Var Table.interact
  var thresholdDist; // EjsS Model.Variables.Var Table.thresholdDist
  var font; // EjsS Model.Variables.Var Table.font
  var score; // EjsS Model.Variables.Var Table.score
  var imageurl; // EjsS Model.Variables.Var Table.imageurl

  var answerkey; // EjsS Model.Variables.lookang.answerkey
  var answerkeylog; // EjsS Model.Variables.lookang.answerkeylog
  var first; // EjsS Model.Variables.lookang.first
  var start; // EjsS Model.Variables.lookang.start
  var clicked; // EjsS Model.Variables.lookang.clicked

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      n : n,
      guardX : guardX,
      guardY : guardY,
      initGuardX : initGuardX,
      guardVal : guardVal,
      guardPos : guardPos,
      guardWidth : guardWidth,
      guardHeight : guardHeight,
      pairList : pairList,
      boxX : boxX,
      boxY : boxY,
      boxPos : boxPos,
      boxOccupied : boxOccupied,
      textStr : textStr,
      interact : interact,
      thresholdDist : thresholdDist,
      font : font,
      score : score,
      imageurl : imageurl,
      answerkey : answerkey,
      answerkeylog : answerkeylog,
      first : first,
      start : start,
      clicked : clicked
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.guardX != "undefined") guardX = json.guardX;
    if(typeof json.guardY != "undefined") guardY = json.guardY;
    if(typeof json.initGuardX != "undefined") initGuardX = json.initGuardX;
    if(typeof json.guardVal != "undefined") guardVal = json.guardVal;
    if(typeof json.guardPos != "undefined") guardPos = json.guardPos;
    if(typeof json.guardWidth != "undefined") guardWidth = json.guardWidth;
    if(typeof json.guardHeight != "undefined") guardHeight = json.guardHeight;
    if(typeof json.pairList != "undefined") pairList = json.pairList;
    if(typeof json.boxX != "undefined") boxX = json.boxX;
    if(typeof json.boxY != "undefined") boxY = json.boxY;
    if(typeof json.boxPos != "undefined") boxPos = json.boxPos;
    if(typeof json.boxOccupied != "undefined") boxOccupied = json.boxOccupied;
    if(typeof json.textStr != "undefined") textStr = json.textStr;
    if(typeof json.interact != "undefined") interact = json.interact;
    if(typeof json.thresholdDist != "undefined") thresholdDist = json.thresholdDist;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.score != "undefined") score = json.score;
    if(typeof json.imageurl != "undefined") imageurl = json.imageurl;
    if(typeof json.answerkey != "undefined") answerkey = json.answerkey;
    if(typeof json.answerkeylog != "undefined") answerkeylog = json.answerkeylog;
    if(typeof json.first != "undefined") first = json.first;
    if(typeof json.start != "undefined") start = json.start;
    if(typeof json.clicked != "undefined") clicked = json.clicked;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["moodle"] = true;
    __pagesEnabled["update"] = true;
    __pagesEnabled["moodle"] = true;
  });

  _model.addToReset(function() {
    guardX = []; // EjsS Model.Variables.Var Table.guardX
    guardY = []; // EjsS Model.Variables.Var Table.guardY
    initGuardX = []; // EjsS Model.Variables.Var Table.initGuardX
    guardVal = []; // EjsS Model.Variables.Var Table.guardVal
    guardPos = []; // EjsS Model.Variables.Var Table.guardPos
    guardWidth = 1; // EjsS Model.Variables.Var Table.guardWidth
    guardHeight = 1.5; // EjsS Model.Variables.Var Table.guardHeight
    pairList = []; // EjsS Model.Variables.Var Table.pairList
    boxX = []; // EjsS Model.Variables.Var Table.boxX
    boxY = []; // EjsS Model.Variables.Var Table.boxY
    boxPos = []; // EjsS Model.Variables.Var Table.boxPos
    boxOccupied = []; // EjsS Model.Variables.Var Table.boxOccupied
    textStr = []; // EjsS Model.Variables.Var Table.textStr
    interact = 0; // EjsS Model.Variables.Var Table.interact
    thresholdDist = 0.3; // EjsS Model.Variables.Var Table.thresholdDist
    font = "normal normal 3vmax"; // EjsS Model.Variables.Var Table.font
    score = 0; // EjsS Model.Variables.Var Table.score
    imageurl = ["./guards_riddle/01.png","./guards_riddle/01.png","./guards_riddle/02.png","./guards_riddle/02.png","./guards_riddle/03.png","./guards_riddle/03.png","./guards_riddle/04.png","./guards_riddle/04.png","./guards_riddle/05.png","./guards_riddle/05.png","./guards_riddle/06.png","./guards_riddle/06.png","./guards_riddle/07.png","./guards_riddle/07.png","./guards_riddle/08.png","./guards_riddle/08.png"]; // EjsS Model.Variables.Var Table.imageurl
  });

  _model.addToReset(function() {
    answerkey = 0; // EjsS Model.Variables.lookang.answerkey
    answerkeylog = 0; // EjsS Model.Variables.lookang.answerkeylog
    first = true; // EjsS Model.Variables.lookang.first
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

  //https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode  // > CustomCode.Lib Page:1
  // does not work for iOS   // > CustomCode.Lib Page:2
  /*jslint browser:true */  // > CustomCode.Lib Page:3
  function toggleFullScreen() {  // > CustomCode.Lib Page:4
    if (!document.fullscreenElement &&    // alternative standard method  // > CustomCode.Lib Page:5
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods  // > CustomCode.Lib Page:6
      if (document.documentElement.requestFullscreen) {  // > CustomCode.Lib Page:7
        document.documentElement.requestFullscreen();  // > CustomCode.Lib Page:8
      } else if (document.documentElement.msRequestFullscreen) {  // > CustomCode.Lib Page:9
        document.documentElement.msRequestFullscreen();  // > CustomCode.Lib Page:10
      } else if (document.documentElement.mozRequestFullScreen) {  // > CustomCode.Lib Page:11
        document.documentElement.mozRequestFullScreen();  // > CustomCode.Lib Page:12
      } else if (document.documentElement.webkitRequestFullscreen) {  // > CustomCode.Lib Page:13
        document.documentElement.webkitRequestFullscreen();  // > CustomCode.Lib Page:14
      }  // > CustomCode.Lib Page:15
    } else {  // > CustomCode.Lib Page:16
      if (document.exitFullscreen) {  // > CustomCode.Lib Page:17
        document.exitFullscreen();  // > CustomCode.Lib Page:18
      } else if (document.msExitFullscreen) {  // > CustomCode.Lib Page:19
        document.msExitFullscreen();  // > CustomCode.Lib Page:20
      } else if (document.mozCancelFullScreen) {  // > CustomCode.Lib Page:21
        document.mozCancelFullScreen();  // > CustomCode.Lib Page:22
      } else if (document.webkitExitFullscreen) {  // > CustomCode.Lib Page:23
        document.webkitExitFullscreen();  // > CustomCode.Lib Page:24
      }  // > CustomCode.Lib Page:25
    }  // > CustomCode.Lib Page:26
  }  // > CustomCode.Lib Page:27

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    if(n == undefined){  // > Initialization.Init Page:1
      n = 3;  // > Initialization.Init Page:2
      }  // > Initialization.Init Page:3
        // > Initialization.Init Page:4
    _view.comboBox.setProperty('SelectedOptions', [n]);  // > Initialization.Init Page:5
    answerkey = [] // lookang adding array  // > Initialization.Init Page:6
    for(var i = 0; i < n * 2; i++){  // > Initialization.Init Page:7
      // guard position  // > Initialization.Init Page:8
      guardX.push(i * guardWidth), guardY.push(guardHeight);  // > Initialization.Init Page:9
      initGuardX.push(i * guardWidth);   // > Initialization.Init Page:10
      guardVal.push(parseInt(i / 2) + 1);  // > Initialization.Init Page:11
      guardPos.push(-1);  // > Initialization.Init Page:12
      // box position  // > Initialization.Init Page:13
      boxX.push(i * guardWidth), boxY.push(-guardHeight);  // > Initialization.Init Page:14
      boxPos.push(i);  // > Initialization.Init Page:15
      boxOccupied.push(false);  // > Initialization.Init Page:16
      // text str  // > Initialization.Init Page:17
      //textStr.push(parseInt(i / 2) + 1+"\n 🐵" );// added unicode of monkey here  // > Initialization.Init Page:18
      textStr.push(parseInt(i / 2) + 1 );// added unicode of monkey here  // > Initialization.Init Page:19
      answerkey.push(0) // lookang adding array with 0  // > Initialization.Init Page:20
    }  // > Initialization.Init Page:21
    //  // > Initialization.Init Page:22
    //["./guards_riddle/01.png","./guards_riddle/01.png","./guards_riddle/02.png","./guards_riddle/02.png","./guards_riddle/03.png","./guards_riddle/03.png","./guards_riddle/04.png","./guards_riddle/04.png","./guards_riddle/05.png","./guards_riddle/05.png","./guards_riddle/06.png","./guards_riddle/06.png","./guards_riddle/07.png","./guards_riddle/07.png","./guards_riddle/08.png","./guards_riddle/08.png"]  // > Initialization.Init Page:23
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["moodle"]) return;
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["update"]) return;
    /*  // > Initialization.update:1
    if (!clicked){  // > Initialization.update:2
      _tools.showOkDialog("Loading....click 'OK' to continue",  // > Initialization.update:3
        function(){   // > Initialization.update:4
        clicked=true;    // > Initialization.update:5
        //_update()  // > Initialization.update:6
        _reset(); // to force update view  // > Initialization.update:7
        //clicked=true;  // > Initialization.update:8
        });  // > Initialization.update:9
        }  // > Initialization.update:10
    */  // > Initialization.update:11
    if (!clicked){  // > Initialization.update:12
      _tools.showOkDialog("Drag the Guard to the yellow positions, read the 'Instructions' and 'Rules' to continue.")  // > Initialization.update:13
      window.setTimeout(_reset,500)  // > Initialization.update:14
      clicked=true;  // > Initialization.update:15
        // > Initialization.update:16
    }  // > Initialization.update:17
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["moodle"]) return;
    //new code in fixed relationship say moodle  // > FixedRelations.moodle:1
    if (typeof _model.isRegisterStarted != 'undefined'){  // > FixedRelations.moodle:2
      start = _model.isRegisterStarted();  // > FixedRelations.moodle:3
      if (first&&start==true) {  // > FixedRelations.moodle:4
    _view._addInteraction(function(){}  ,"Q1",{"property":"value", "element":"question"}); // use to detect beginning of Q1  // > FixedRelations.moodle:5
    //_view._addInteraction(function(){}  ,"Q2",{"property":"value", "element":"question"});   // > FixedRelations.moodle:6
    //_view._addInteraction(function(){}  ,"Q3",{"property":"value", "element":"question"});   // > FixedRelations.moodle:7
    //_view._addInteraction(function(){}  ,"Q4",{"property":"value", "element":"question"});   // > FixedRelations.moodle:8
    //_view._addInteraction(function(){}  ,"Q5",{"property":"value", "element":"question"});   // > FixedRelations.moodle:9
    //_view._addInteraction(function(){}  ,"Q6",{"property":"value", "element":"question"});   // > FixedRelations.moodle:10
    //_view._addInteraction(function(){} , ["1"], {"property":"SelectedOptions", "element": "comboBox1"}); // use to trigger interaction that user defaulted  // > FixedRelations.moodle:11
    //_view._addInteraction(function(){} , ["1"], {"property":"SelectedOptions", "element": "comboBox2"});  // > FixedRelations.moodle:12
    //_view._addInteraction(function(){} , ["1"], {"property":"SelectedOptions", "element": "comboBox3"});  // > FixedRelations.moodle:13
    //_view._addInteraction(function(){} , ["1"], {"property":"SelectedOptions", "element": "comboBox4"});  // > FixedRelations.moodle:14
    //_view._addInteraction(function(){} , ["1"], {"property":"SelectedOptions", "element": "comboBox5"});  // > FixedRelations.moodle:15
    //var option = _view.comboBox.getProperty("SelectedOptions")  // > FixedRelations.moodle:16
     //console.log(option)  // > FixedRelations.moodle:17
    first=false; // turn off first so the code runs only once  // > FixedRelations.moodle:18
    }  // > FixedRelations.moodle:19
      }  // > FixedRelations.moodle:20
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
    _view = new guards_riddle_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.topPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'topPanel'
          _view.label.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'label'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  var selected = _view.comboBox.getProperty("SelectedOptions")[0];
  n = parseInt(selected);
  _reset();
  //start moodle Q
  //alert("n="+n)
  _view._addInteraction(function(){}  ,"Q"+(n-2),{"property":"value", "element":"question"});
  //alert("despite the alert, this line above is not registered to moodle Q"+(n-2));

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.reset.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'reset'
          _view.reset.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'reset'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return guardHeight * 3 / 2; } ); // HtmlView Page linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return guardWidth * n * 2; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("YFixedTick",  function() { return guardY[0]+guardHeight/2; } ); // HtmlView Page linking property 'YFixedTick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return -guardWidth; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return -guardHeight * 3 / 2; } ); // HtmlView Page linking property 'MinimumY' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("YTickStep",  function() { return guardY[0]+guardHeight/2; } ); // HtmlView Page linking property 'YTickStep' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return (typeof _model.isRegisterStarted == 'undefined')?"":first?"Moodle click me to continue="+start:""; } ); // HtmlView Page linking property 'TLMessage' for element 'plottingPanel'
          _view.boxSet.linkProperty("NumberOfElements",  function() { return n * 2; } ); // HtmlView Page linking property 'NumberOfElements' for element 'boxSet'
          _view.boxSet.linkProperty("SizeX",  function() { return guardWidth; }, function(_v) { guardWidth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'boxSet'
          _view.boxSet.linkProperty("X",  function() { return boxX; }, function(_v) { boxX = _v; } ); // HtmlView Page linking property 'X' for element 'boxSet'
          _view.boxSet.linkProperty("Y",  function() { return boxY; }, function(_v) { boxY = _v; } ); // HtmlView Page linking property 'Y' for element 'boxSet'
          _view.boxSet.linkProperty("SizeY",  function() { return guardHeight; }, function(_v) { guardHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'boxSet'
          _view.guardSet.linkProperty("NumberOfElements",  function() { return n * 2; } ); // HtmlView Page linking property 'NumberOfElements' for element 'guardSet'
          _view.guardSet.setAction("OnRelease", function(_data,_info) {
  var x = guardX[interact], y = guardY[interact];
  var choosenBox = -1, minDist = thresholdDist * 2;
  // looping through the boxes to determine the distances, and choosing the closest box
  for(var i = 0; i < n * n; i++){
    if(boxOccupied[i])
      continue;
      
    let curX = boxX[i], curY = boxY[i];
    let dist = (curX - x) ** 2 + (curY - y) ** 2;
    if(dist <= minDist){
      choosenBox = i;
      minDist = dist;
    }
  }
  // if guard was previously occupying a box, set the box to be not occupied
  if(guardPos[interact] != -1){
    boxOccupied[guardPos[interact]] = false;
    // minus score
    score--;
  }
  // getting the idx of the pair card 
  // (since the cards are created next to each other in the array, this is calculation is possible)
  var pairCard = interact % 2 == 0 ? interact + 1 : interact - 1;
  // if the box can be placed in the choosen box
  if(choosenBox != -1 && (guardPos[pairCard] == -1 || Math.abs(guardPos[pairCard] - boxPos[choosenBox]) == guardVal[interact])){
    // snap the guard to the box
    guardX[interact] = boxX[choosenBox];
    guardY[interact] = boxY[choosenBox];
    
    
    // replace 
    answerkey.splice (choosenBox,1,textStr[interact]) //create the answerkey with the values in order
    answerkeylog = answerkeylog +"\n"+answerkey
    // to string to avoid this error
    //Warning: nl2br() expects parameter 1 to be string, array given in /home/iwtstudy/public_html/moodle402/mod/laejss/report_lti.php on line 170
    //answerkey.toString()
    // error log  is the variable with the stored log of mistakes and correct eventually etc 
  _view._addInteraction(function(){} , answerkeylog.toString(), {"property":"Value", "element": "textArea"});
    //guardX is 0,1,2,3,4,5,6,....
    //boxX is 1,2,3,4,5,....
    
    // mark the box as occupied
    boxOccupied[choosenBox] = true;
    // set the position value of the guard to be the same as the box
    guardPos[interact] = boxPos[choosenBox];
    
    // add score for every single match of guard to box
    score++;
    // moodle to make score always live on moodle
    _view._addInteraction(function(){}  ,score,{"property":"value", "element":"answer"+(n-2)});
    // completed condition
    if(score == n * 2){
      _tools.showOkDialog("Congratulations, you managed to arrange all the guards correctly!");
    //sometimes need to trigger fake interaction for moodle to record
    _view._addInteraction(function(){}  ,score,{"property":"value", "element":"answer"+(n-2)});
    alert("n="+n)
    }
  }
  // if a box is not close enough
  else{
    // snap back to original position
    guardX[interact] = initGuardX[interact];
    guardY[interact] = guardHeight;
   
    guardPos[interact] = -1;
  }
  var selected = _view.comboBox.getProperty("SelectedOptions")[0];
  //code to add interactions for moodle assessment.json to pick up data especially Q2
  // end
  _view._addInteraction(function(){}  ,"Q"+(selected-1),{"property":"value", "element":"question"});

}); // HtmlView Page setting action 'OnRelease' for element 'guardSet'
          _view.guardSet.linkProperty("SizeX",  function() { return guardWidth; }, function(_v) { guardWidth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'guardSet'
          _view.guardSet.linkProperty("X",  function() { return guardX; }, function(_v) { guardX = _v; } ); // HtmlView Page linking property 'X' for element 'guardSet'
          _view.guardSet.linkProperty("Y",  function() { return guardY; }, function(_v) { guardY = _v; } ); // HtmlView Page linking property 'Y' for element 'guardSet'
          _view.guardSet.linkProperty("SizeY",  function() { return guardHeight; }, function(_v) { guardHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'guardSet'
          _view.guardSet.linkProperty("ElementInteracted",  function() { return interact; }, function(_v) { interact = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'guardSet'
          _view.textSet.linkProperty("NumberOfElements",  function() { return n * 2; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet'
          _view.textSet.linkProperty("X",  function() { return guardX; }, function(_v) { guardX = _v; } ); // HtmlView Page linking property 'X' for element 'textSet'
          _view.textSet.linkProperty("Y",  function() { return guardY; }, function(_v) { guardY = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet'
          _view.textSet.linkProperty("Text",  function() { return textStr; }, function(_v) { textStr = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet'
          _view.textSet.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'textSet'
          _view.imageSet.linkProperty("NumberOfElements",  function() { return n * 2; } ); // HtmlView Page linking property 'NumberOfElements' for element 'imageSet'
          _view.imageSet.linkProperty("SizeX",  function() { return guardWidth; }, function(_v) { guardWidth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'imageSet'
          _view.imageSet.linkProperty("X",  function() { return guardX; }, function(_v) { guardX = _v; } ); // HtmlView Page linking property 'X' for element 'imageSet'
          _view.imageSet.linkProperty("Y",  function() { return guardY; }, function(_v) { guardY = _v; } ); // HtmlView Page linking property 'Y' for element 'imageSet'
          _view.imageSet.linkProperty("ImageUrl",  function() { return imageurl; }, function(_v) { imageurl = _v; } ); // HtmlView Page linking property 'ImageUrl' for element 'imageSet'
          _view.imageSet.linkProperty("SizeY",  function() { return guardHeight; }, function(_v) { guardHeight = _v; } ); // HtmlView Page linking property 'SizeY' for element 'imageSet'
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
function guards_riddle_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = guards_riddle_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Intro Page','./guards_riddle_Intro_1.html');

  return _view;
} // end of main function

function guards_riddle_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"html2", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'html2'
      .setProperty("Html","<p><b>Instructions:</b> Choose the number of guards based on their ranks for each task and arrange the row of guards according to the rules set. </p> <p><b>Rules:</b> Guards of the same rank should stand away the number of steps from each other according to the rank number, for e.g. two Rank 3 guards are three steps away from each other.</p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'topPanel'
      .setProperty("Display","inline-flex") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'topPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'label'
      .setProperty("Text","Rank: 1 to") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBox'
      .setProperty("Options",[3, 4, 5, 6, 7, 8]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.button,"reset", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'reset'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'reset'
      .setProperty("Text","↻Reset") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'reset'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"mainPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'mainPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","78vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("Gutters",[0, 0, 0, 0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("YScalePrecision",2) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0.5) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"boxSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'boxSet'
      .setProperty("FillColor","Yellow") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'boxSet'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'boxSet'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"guardSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'guardSet'
      .setProperty("FillColor","rgba(200,220,208,1)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'guardSet'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'guardSet'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'guardSet'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'guardSet'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offset", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'offset'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"imageSet", _view.offset) // EJsS HtmlView.HtmlView Page: declaration of element 'imageSet'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("Html","<p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p> 1 to 3 there is no solution possible yet? </p> <p> 1 to 4 one possible solution is 41134232 </p> <p> 1 to 5 one possible solution is 2325341154 </p> <p> 1 to 6 there is no solution possible yet?</p> <p> 1 to 7 there is no solution possible yet? </p> <p> 1 to 8 one possible solution is 1128237536485746 </p> <p> email me at weelookang@gmail.com the solution if you want to share the solution here. Thanks! </p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new guards_riddle("_topFrame","_ejs_library/",null);
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
