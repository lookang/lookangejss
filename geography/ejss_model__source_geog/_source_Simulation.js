/* _inputParameters: an object with different values for the model parameters */
function _source(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var data; // EjsS Model.Variables.Var Table 1.data

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      data : data
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {

    };
  };

  _model._readParameters = function(json) {
    if(typeof json.data != "undefined") data = json.data;
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
    __pagesEnabled["Init Page 1"] = true;
  });

  _model.addToReset(function() {
    data = []; // EjsS Model.Variables.Var Table 1.data
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

  // Function to perform linear regression  // > CustomCode.Custom Page 1:1
      function linearRegression(x, y) {  // > CustomCode.Custom Page 1:2
          const n = x.length;  // > CustomCode.Custom Page 1:3
          const sumX = x.reduce((a, b) => a + b, 0);  // > CustomCode.Custom Page 1:4
          const sumY = y.reduce((a, b) => a + b, 0);  // > CustomCode.Custom Page 1:5
          const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);  // > CustomCode.Custom Page 1:6
          const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);  // > CustomCode.Custom Page 1:7
          const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);  // > CustomCode.Custom Page 1:8
          const intercept = (sumY - slope * sumX) / n;  // > CustomCode.Custom Page 1:9
          return { slope, intercept };  // > CustomCode.Custom Page 1:10
      }  // > CustomCode.Custom Page 1:11
  function readCSVFromPath() {  // > CustomCode.Custom Page 1:12
      //fetch('https://webejs.iwant2study.org:8000/static/sessions/317ea4eb-99af-4d88-a13a-06f65fd35ac8/source/data.csv')  // Replace 'yourfile.csv' with the actual file name  // > CustomCode.Custom Page 1:13
        fetch('./data.csv')  // Replace 'yourfile.csv' with the actual file name  // > CustomCode.Custom Page 1:14
        .then(response => {  // > CustomCode.Custom Page 1:15
              if (!response.ok) {  // > CustomCode.Custom Page 1:16
                  throw new Error("Failed to fetch the CSV file");  // > CustomCode.Custom Page 1:17
              }  // > CustomCode.Custom Page 1:18
              return response.text();  // Return the CSV content as plain text  // > CustomCode.Custom Page 1:19
          })  // > CustomCode.Custom Page 1:20
          .then(data => {  // > CustomCode.Custom Page 1:21
              const parsedData = parseCSV(data);  // Parse the CSV data  // > CustomCode.Custom Page 1:22
              console.log("Parsed CSV Data:", parsedData);  // Log the parsed data for debugging  // > CustomCode.Custom Page 1:23
              // You can now use the parsedData for further processing in your simulation  // > CustomCode.Custom Page 1:24
          })  // > CustomCode.Custom Page 1:25
          .catch(error => {  // > CustomCode.Custom Page 1:26
              console.error("Error reading the CSV file:", error);  // > CustomCode.Custom Page 1:27
          });  // > CustomCode.Custom Page 1:28
  }  // > CustomCode.Custom Page 1:29
  // Function to parse the CSV data  // > CustomCode.Custom Page 1:30
  function parseCSV(csvText) {  // > CustomCode.Custom Page 1:31
      const rows = csvText.split("\n").filter(row => row.trim() !== "");  // Split by new lines and filter empty rows  // > CustomCode.Custom Page 1:32
      const result = rows.map(row => row.split(","));  // Split each row by commas  // > CustomCode.Custom Page 1:33
      return result;  // > CustomCode.Custom Page 1:34
  }  // > CustomCode.Custom Page 1:35
  // Call the function to read the CSV file  // > CustomCode.Custom Page 1:36
      function polynomialRegression(x, y, degree) {  // > CustomCode.Custom Page 1:37
          const X = x.map(xi => Array.from({length: degree + 1}, (_, i) => Math.pow(xi, i)));  // > CustomCode.Custom Page 1:38
          const Xt = math.transpose(X);  // > CustomCode.Custom Page 1:39
          const XtX = math.multiply(Xt, X);  // > CustomCode.Custom Page 1:40
          const XtY = math.multiply(Xt, y);  // > CustomCode.Custom Page 1:41
          const coefficients = math.lusolve(XtX, XtY).flat();  // > CustomCode.Custom Page 1:42
          return coefficients;  // > CustomCode.Custom Page 1:43
      }  // > CustomCode.Custom Page 1:44
      // Function to generate a line of best fit  // > CustomCode.Custom Page 1:45
      function generateBestFitLine(xData, yData) {  // > CustomCode.Custom Page 1:46
          // Dynamically determine the degree of polynomial (start with quadratic)  // > CustomCode.Custom Page 1:47
          const degree = 2; // Adjust based on data complexity  // > CustomCode.Custom Page 1:48
          const coefficients = polynomialRegression(xData, yData, degree);  // > CustomCode.Custom Page 1:49
          // Generate y-values for the best fit line  // > CustomCode.Custom Page 1:50
          const bestFitY = xData.map(xi =>   // > CustomCode.Custom Page 1:51
              coefficients.reduce((acc, coef, i) => acc + coef * Math.pow(xi, i), 0)  // > CustomCode.Custom Page 1:52
          );  // > CustomCode.Custom Page 1:53
          return bestFitY;  // > CustomCode.Custom Page 1:54
      }  // > CustomCode.Custom Page 1:55

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page 1"]) return;
        // Scatter data (your provided data)  // > Initialization.Init Page 1:1
        const scatterData = {  // > Initialization.Init Page 1:2
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  // > Initialization.Init Page 1:3
            y: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100],  // > Initialization.Init Page 1:4
            mode: 'markers',  // > Initialization.Init Page 1:5
            type: 'scatter',  // > Initialization.Init Page 1:6
            name: 'Scatter Data',  // > Initialization.Init Page 1:7
            marker: { color: 'blue' }  // > Initialization.Init Page 1:8
        };  // > Initialization.Init Page 1:9
        // Perform linear regression to get the best-fit line  // > Initialization.Init Page 1:10
        const { slope, intercept } = linearRegression(scatterData.x, scatterData.y);  // > Initialization.Init Page 1:11
        // Generate y-values for the best fit line using the linear equation: y = mx + b  // > Initialization.Init Page 1:12
        const bestFitY = scatterData.x.map(xi => slope * xi + intercept);  // > Initialization.Init Page 1:13
          // > Initialization.Init Page 1:14
        const bestFitLine = {  // > Initialization.Init Page 1:15
            x: scatterData.x,  // > Initialization.Init Page 1:16
            y: bestFitY,  // > Initialization.Init Page 1:17
            mode: 'lines',  // > Initialization.Init Page 1:18
            type: 'scatter',  // > Initialization.Init Page 1:19
            name: 'Best Fit Line',  // > Initialization.Init Page 1:20
            line: { color: 'red' }  // > Initialization.Init Page 1:21
        };  // > Initialization.Init Page 1:22
        const layout = {  // > Initialization.Init Page 1:23
            title: 'Linear Best Fit Line',  // > Initialization.Init Page 1:24
            margin: { t: 30 },  // > Initialization.Init Page 1:25
            xaxis: { title: 'X-axis' },  // > Initialization.Init Page 1:26
            yaxis: { title: 'Y-axis' }  // > Initialization.Init Page 1:27
        };  // > Initialization.Init Page 1:28
        // Plot the scatter data and the best-fit line  // > Initialization.Init Page 1:29
        Plotly.newPlot("plot", [scatterData, bestFitLine], layout);  // > Initialization.Init Page 1:30
          // > Initialization.Init Page 1:31
    data = readCSVFromPath()  // > Initialization.Init Page 1:32
    console.log(data)  // > Initialization.Init Page 1:33
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

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
    _view = new _source_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.dataTable.linkProperty("Input",  function() { return data; }, function(_v) { data = _v; } ); // HtmlView linking property 'Input' for element 'dataTable'
          _view.dataTable.linkProperty("HeadersText",  function() { return ["a","b","c","d"]; } ); // HtmlView linking property 'HeadersText' for element 'dataTable'
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
function _source_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = _source_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function _source_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"panel", _view._topFrame) // EJsS HtmlView.HtmlView: declaration of element 'panel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"plot", _view.panel) // EJsS HtmlView.HtmlView: declaration of element 'plot'
      .setProperty("ClassName","plot") // EJsS HtmlView.HtmlView: setting property 'ClassName' for element 'plot'
      ;

    _view._addElement(EJSS_INTERFACE.dataTable,"dataTable", _view.panel) // EJsS HtmlView.HtmlView: declaration of element 'dataTable'
      .setProperty("Tooltip","data") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'dataTable'
      .setProperty("ColumnsWidth",[20,20,20,20]) // EJsS HtmlView.HtmlView: setting property 'ColumnsWidth' for element 'dataTable'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView: setting property 'NoRepeat' for element 'dataTable'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new _source("_topFrame","_ejs_library/",null);
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
