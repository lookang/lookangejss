function photosynthesis_3_factors(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
  var _model = EJSS_CORE.createAnimationLMS();
  var _view;
  var _isPlaying = false;
  var _isPaused = true;
  var _isMobile = (navigator===undefined) ? false : navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);

var _stringProperties = {};
  var _tools = EJSS_CORE.Tools;
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

  var datatable; // EjsS Model.Variables.Var Table.datatable
  var datatable2; // EjsS Model.Variables.Var Table.datatable2
  var datatable3; // EjsS Model.Variables.Var Table.datatable3
  var xmin; // EjsS Model.Variables.Var Table.xmin
  var xmax; // EjsS Model.Variables.Var Table.xmax
  var ymin; // EjsS Model.Variables.Var Table.ymin
  var ymax; // EjsS Model.Variables.Var Table.ymax
  var rangex; // EjsS Model.Variables.Var Table.rangex
  var rangey; // EjsS Model.Variables.Var Table.rangey
  var sizex; // EjsS Model.Variables.Var Table.sizex
  var sizey; // EjsS Model.Variables.Var Table.sizey
  var selected; // EjsS Model.Variables.Var Table.selected
  var text; // EjsS Model.Variables.Var Table.text
  var pi; // EjsS Model.Variables.Var Table.pi
  var y1; // EjsS Model.Variables.Var Table.y1
  var ysize; // EjsS Model.Variables.Var Table.ysize
  var xlamp; // EjsS Model.Variables.Var Table.xlamp
  var ylamp; // EjsS Model.Variables.Var Table.ylamp
  var n; // EjsS Model.Variables.Var Table.n
  var ntotal; // EjsS Model.Variables.Var Table.ntotal
  var index; // EjsS Model.Variables.Var Table.index
  var r; // EjsS Model.Variables.Var Table.r
  var dr; // EjsS Model.Variables.Var Table.dr
  var xbubble; // EjsS Model.Variables.Var Table.xbubble
  var ybubble; // EjsS Model.Variables.Var Table.ybubble
  var dy; // EjsS Model.Variables.Var Table.dy
  var ybubbleshow; // EjsS Model.Variables.Var Table.ybubbleshow
  var count; // EjsS Model.Variables.Var Table.count
  var sumcount; // EjsS Model.Variables.Var Table.sumcount
  var intensity; // EjsS Model.Variables.Var Table.intensity
  var intensitydrag; // EjsS Model.Variables.Var Table.intensitydrag
  var carbondioxide; // EjsS Model.Variables.Var Table.carbondioxide
  var carbondioxidedrag; // EjsS Model.Variables.Var Table.carbondioxidedrag
  var expt; // EjsS Model.Variables.Var Table.expt
  var spd; // EjsS Model.Variables.Var Table.spd
  var bubbleburst; // EjsS Model.Variables.Var Table.bubbleburst
  var bubblebursttime; // EjsS Model.Variables.Var Table.bubblebursttime
  var bubbleburstcheck; // EjsS Model.Variables.Var Table.bubbleburstcheck
  var floory; // EjsS Model.Variables.Var Table.floory
  var font; // EjsS Model.Variables.Var Table.font
  var font2; // EjsS Model.Variables.Var Table.font2
  var scene11; // EjsS Model.Variables.Var Table.scene11
  var scene12; // EjsS Model.Variables.Var Table.scene12
  var scene13; // EjsS Model.Variables.Var Table.scene13
  var scene1firsttime; // EjsS Model.Variables.Var Table.scene1firsttime
  var scene2firsttime; // EjsS Model.Variables.Var Table.scene2firsttime
  var distance; // EjsS Model.Variables.Var Table.distance
  var showdistancefitcurve; // EjsS Model.Variables.Var Table.showdistancefitcurve
  var temperature; // EjsS Model.Variables.Var Table.temperature
  var showLabel; // EjsS Model.Variables.Var Table.showLabel
  var displaydistance; // EjsS Model.Variables.Var Table.displaydistance
  var displaycarbondioxide; // EjsS Model.Variables.Var Table.displaycarbondioxide
  var displaytemperature; // EjsS Model.Variables.Var Table.displaytemperature
  var endofexpt0; // EjsS Model.Variables.Var Table.endofexpt0
  var endofexpt3; // EjsS Model.Variables.Var Table.endofexpt3
  var endofexpt4; // EjsS Model.Variables.Var Table.endofexpt4
  var clicked; // EjsS Model.Variables.Var Table.clicked
  var isToggledOn; // EjsS Model.Variables.Var Table.isToggledOn
  var isCheckingTextBlink; // EjsS Model.Variables.Var Table.isCheckingTextBlink
  var tTextBlink; // EjsS Model.Variables.Var Table.tTextBlink
  var blinkInterval; // EjsS Model.Variables.Var Table.blinkInterval
  var dtTextBlink; // EjsS Model.Variables.Var Table.dtTextBlink

  var drdistance1; // EjsS Model.Variables.bubbles.drdistance1
  var drdistance2; // EjsS Model.Variables.bubbles.drdistance2
  var drdistance3; // EjsS Model.Variables.bubbles.drdistance3
  var drdistance4; // EjsS Model.Variables.bubbles.drdistance4
  var drdistance5; // EjsS Model.Variables.bubbles.drdistance5
  var drcarbondioxide1; // EjsS Model.Variables.bubbles.drcarbondioxide1
  var drcarbondioxide2; // EjsS Model.Variables.bubbles.drcarbondioxide2
  var drcarbondioxide3; // EjsS Model.Variables.bubbles.drcarbondioxide3
  var drcarbondioxide4; // EjsS Model.Variables.bubbles.drcarbondioxide4
  var drcarbondioxide5; // EjsS Model.Variables.bubbles.drcarbondioxide5
  var drtemperature1; // EjsS Model.Variables.bubbles.drtemperature1
  var drtemperature2; // EjsS Model.Variables.bubbles.drtemperature2
  var drtemperature3; // EjsS Model.Variables.bubbles.drtemperature3
  var drtemperature4; // EjsS Model.Variables.bubbles.drtemperature4
  var drtemperature5; // EjsS Model.Variables.bubbles.drtemperature5

  var colorCyan; // EjsS Model.Variables.colors.colorCyan
  var colorPurple; // EjsS Model.Variables.colors.colorPurple
  var colorGreen; // EjsS Model.Variables.colors.colorGreen
  var colorRed; // EjsS Model.Variables.colors.colorRed
  var color1; // EjsS Model.Variables.colors.color1
  var color2; // EjsS Model.Variables.colors.color2
  var color3; // EjsS Model.Variables.colors.color3
  var cssBlink; // EjsS Model.Variables.colors.cssBlink
  var cssBlinkcomboBox; // EjsS Model.Variables.colors.cssBlinkcomboBox

  var print; // EjsS Model.Variables.Comboboxvar.print

  var datanMax; // EjsS Model.Variables.datatable.datanMax
  var datan; // EjsS Model.Variables.datatable.datan
  var distancedata; // EjsS Model.Variables.datatable.distancedata
  var intensitydata; // EjsS Model.Variables.datatable.intensitydata
  var sumcountdata; // EjsS Model.Variables.datatable.sumcountdata
  var sumcountdatadistance; // EjsS Model.Variables.datatable.sumcountdatadistance
  var sumcountdatacarbondioxide; // EjsS Model.Variables.datatable.sumcountdatacarbondioxide
  var sumcountdatatemperature; // EjsS Model.Variables.datatable.sumcountdatatemperature
  var carbondioxidedata; // EjsS Model.Variables.datatable.carbondioxidedata
  var temperaturedata; // EjsS Model.Variables.datatable.temperaturedata

  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width0; // EjsS Model.Variables.layout.Width0
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var Width3; // EjsS Model.Variables.layout.Width3
  var Width4; // EjsS Model.Variables.layout.Width4
  var world; // EjsS Model.Variables.layout.world
  var graph; // EjsS Model.Variables.layout.graph
  var graph2; // EjsS Model.Variables.layout.graph2
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var disabled; // EjsS Model.Variables.layout.disabled

  var m; // EjsS Model.Variables.simplespring.m
  var x; // EjsS Model.Variables.simplespring.x
  var xs; // EjsS Model.Variables.simplespring.xs
  var y; // EjsS Model.Variables.simplespring.y
  var vx; // EjsS Model.Variables.simplespring.vx
  var vxs; // EjsS Model.Variables.simplespring.vxs
  var vxstored; // EjsS Model.Variables.simplespring.vxstored
  var t; // EjsS Model.Variables.simplespring.t
  var T; // EjsS Model.Variables.simplespring.T
  var dt; // EjsS Model.Variables.simplespring.dt

  var selectedmodel; // EjsS Model.Variables.functionY.selectedmodel
  var functionY; // EjsS Model.Variables.functionY.functionY
  var xmodel; // EjsS Model.Variables.functionY.xmodel
  var showmodel; // EjsS Model.Variables.functionY.showmodel

  var splineFunction; // EjsS Model.Variables.splineFunction.splineFunction
  var splinex0; // EjsS Model.Variables.splineFunction.splinex0
  var spliney0; // EjsS Model.Variables.splineFunction.spliney0
  var splinex; // EjsS Model.Variables.splineFunction.splinex
  var spliney; // EjsS Model.Variables.splineFunction.spliney
  var distancecubicsplinex; // EjsS Model.Variables.splineFunction.distancecubicsplinex
  var distancecubicspliney; // EjsS Model.Variables.splineFunction.distancecubicspliney
  var intensitycubicsplinex; // EjsS Model.Variables.splineFunction.intensitycubicsplinex
  var intensitycubicspliney; // EjsS Model.Variables.splineFunction.intensitycubicspliney
  var splinex2; // EjsS Model.Variables.splineFunction.splinex2
  var spliney2; // EjsS Model.Variables.splineFunction.spliney2
  var carbondioxidecubicsplinex; // EjsS Model.Variables.splineFunction.carbondioxidecubicsplinex
  var carbondioxidecubicspliney; // EjsS Model.Variables.splineFunction.carbondioxidecubicspliney
  var splinex3; // EjsS Model.Variables.splineFunction.splinex3
  var spliney3; // EjsS Model.Variables.splineFunction.spliney3
  var temperaturecubicsplinex; // EjsS Model.Variables.splineFunction.temperaturecubicsplinex
  var temperaturecubicspliney; // EjsS Model.Variables.splineFunction.temperaturecubicspliney

  var resultexponential; // EjsS Model.Variables.exponential.resultexponential
  var FittedParametersa; // EjsS Model.Variables.exponential.FittedParametersa
  var FittedParametersb; // EjsS Model.Variables.exponential.FittedParametersb

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
      datatable : datatable,
      datatable2 : datatable2,
      datatable3 : datatable3,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      rangex : rangex,
      rangey : rangey,
      sizex : sizex,
      sizey : sizey,
      selected : selected,
      text : text,
      pi : pi,
      y1 : y1,
      ysize : ysize,
      xlamp : xlamp,
      ylamp : ylamp,
      n : n,
      ntotal : ntotal,
      index : index,
      r : r,
      dr : dr,
      xbubble : xbubble,
      ybubble : ybubble,
      dy : dy,
      ybubbleshow : ybubbleshow,
      count : count,
      sumcount : sumcount,
      intensity : intensity,
      intensitydrag : intensitydrag,
      carbondioxide : carbondioxide,
      carbondioxidedrag : carbondioxidedrag,
      expt : expt,
      spd : spd,
      bubbleburst : bubbleburst,
      bubblebursttime : bubblebursttime,
      bubbleburstcheck : bubbleburstcheck,
      floory : floory,
      font : font,
      font2 : font2,
      scene11 : scene11,
      scene12 : scene12,
      scene13 : scene13,
      scene1firsttime : scene1firsttime,
      scene2firsttime : scene2firsttime,
      distance : distance,
      showdistancefitcurve : showdistancefitcurve,
      temperature : temperature,
      showLabel : showLabel,
      displaydistance : displaydistance,
      displaycarbondioxide : displaycarbondioxide,
      displaytemperature : displaytemperature,
      endofexpt0 : endofexpt0,
      endofexpt3 : endofexpt3,
      endofexpt4 : endofexpt4,
      clicked : clicked,
      isToggledOn : isToggledOn,
      isCheckingTextBlink : isCheckingTextBlink,
      tTextBlink : tTextBlink,
      blinkInterval : blinkInterval,
      dtTextBlink : dtTextBlink,
      drdistance1 : drdistance1,
      drdistance2 : drdistance2,
      drdistance3 : drdistance3,
      drdistance4 : drdistance4,
      drdistance5 : drdistance5,
      drcarbondioxide1 : drcarbondioxide1,
      drcarbondioxide2 : drcarbondioxide2,
      drcarbondioxide3 : drcarbondioxide3,
      drcarbondioxide4 : drcarbondioxide4,
      drcarbondioxide5 : drcarbondioxide5,
      drtemperature1 : drtemperature1,
      drtemperature2 : drtemperature2,
      drtemperature3 : drtemperature3,
      drtemperature4 : drtemperature4,
      drtemperature5 : drtemperature5,
      colorCyan : colorCyan,
      colorPurple : colorPurple,
      colorGreen : colorGreen,
      colorRed : colorRed,
      color1 : color1,
      color2 : color2,
      color3 : color3,
      cssBlink : cssBlink,
      cssBlinkcomboBox : cssBlinkcomboBox,
      print : print,
      datanMax : datanMax,
      datan : datan,
      distancedata : distancedata,
      intensitydata : intensitydata,
      sumcountdata : sumcountdata,
      sumcountdatadistance : sumcountdatadistance,
      sumcountdatacarbondioxide : sumcountdatacarbondioxide,
      sumcountdatatemperature : sumcountdatatemperature,
      carbondioxidedata : carbondioxidedata,
      temperaturedata : temperaturedata,
      Width : Width,
      Height : Height,
      Width0 : Width0,
      Width1 : Width1,
      Width2 : Width2,
      Width3 : Width3,
      Width4 : Width4,
      world : world,
      graph : graph,
      graph2 : graph2,
      disabledworld : disabledworld,
      disabled : disabled,
      m : m,
      x : x,
      xs : xs,
      y : y,
      vx : vx,
      vxs : vxs,
      vxstored : vxstored,
      t : t,
      T : T,
      dt : dt,
      selectedmodel : selectedmodel,
      functionY : functionY,
      xmodel : xmodel,
      showmodel : showmodel,
      splineFunction : splineFunction,
      splinex0 : splinex0,
      spliney0 : spliney0,
      splinex : splinex,
      spliney : spliney,
      distancecubicsplinex : distancecubicsplinex,
      distancecubicspliney : distancecubicspliney,
      intensitycubicsplinex : intensitycubicsplinex,
      intensitycubicspliney : intensitycubicspliney,
      splinex2 : splinex2,
      spliney2 : spliney2,
      carbondioxidecubicsplinex : carbondioxidecubicsplinex,
      carbondioxidecubicspliney : carbondioxidecubicspliney,
      splinex3 : splinex3,
      spliney3 : spliney3,
      temperaturecubicsplinex : temperaturecubicsplinex,
      temperaturecubicspliney : temperaturecubicspliney,
      resultexponential : resultexponential,
      FittedParametersa : FittedParametersa,
      FittedParametersb : FittedParametersb
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.datatable != "undefined") datatable = json.datatable;
    if(typeof json.datatable2 != "undefined") datatable2 = json.datatable2;
    if(typeof json.datatable3 != "undefined") datatable3 = json.datatable3;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.rangex != "undefined") rangex = json.rangex;
    if(typeof json.rangey != "undefined") rangey = json.rangey;
    if(typeof json.sizex != "undefined") sizex = json.sizex;
    if(typeof json.sizey != "undefined") sizey = json.sizey;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.y1 != "undefined") y1 = json.y1;
    if(typeof json.ysize != "undefined") ysize = json.ysize;
    if(typeof json.xlamp != "undefined") xlamp = json.xlamp;
    if(typeof json.ylamp != "undefined") ylamp = json.ylamp;
    if(typeof json.n != "undefined") n = json.n;
    if(typeof json.ntotal != "undefined") ntotal = json.ntotal;
    if(typeof json.index != "undefined") index = json.index;
    if(typeof json.r != "undefined") r = json.r;
    if(typeof json.dr != "undefined") dr = json.dr;
    if(typeof json.xbubble != "undefined") xbubble = json.xbubble;
    if(typeof json.ybubble != "undefined") ybubble = json.ybubble;
    if(typeof json.dy != "undefined") dy = json.dy;
    if(typeof json.ybubbleshow != "undefined") ybubbleshow = json.ybubbleshow;
    if(typeof json.count != "undefined") count = json.count;
    if(typeof json.sumcount != "undefined") sumcount = json.sumcount;
    if(typeof json.intensity != "undefined") intensity = json.intensity;
    if(typeof json.intensitydrag != "undefined") intensitydrag = json.intensitydrag;
    if(typeof json.carbondioxide != "undefined") carbondioxide = json.carbondioxide;
    if(typeof json.carbondioxidedrag != "undefined") carbondioxidedrag = json.carbondioxidedrag;
    if(typeof json.expt != "undefined") expt = json.expt;
    if(typeof json.spd != "undefined") spd = json.spd;
    if(typeof json.bubbleburst != "undefined") bubbleburst = json.bubbleburst;
    if(typeof json.bubblebursttime != "undefined") bubblebursttime = json.bubblebursttime;
    if(typeof json.bubbleburstcheck != "undefined") bubbleburstcheck = json.bubbleburstcheck;
    if(typeof json.floory != "undefined") floory = json.floory;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.font2 != "undefined") font2 = json.font2;
    if(typeof json.scene11 != "undefined") scene11 = json.scene11;
    if(typeof json.scene12 != "undefined") scene12 = json.scene12;
    if(typeof json.scene13 != "undefined") scene13 = json.scene13;
    if(typeof json.scene1firsttime != "undefined") scene1firsttime = json.scene1firsttime;
    if(typeof json.scene2firsttime != "undefined") scene2firsttime = json.scene2firsttime;
    if(typeof json.distance != "undefined") distance = json.distance;
    if(typeof json.showdistancefitcurve != "undefined") showdistancefitcurve = json.showdistancefitcurve;
    if(typeof json.temperature != "undefined") temperature = json.temperature;
    if(typeof json.showLabel != "undefined") showLabel = json.showLabel;
    if(typeof json.displaydistance != "undefined") displaydistance = json.displaydistance;
    if(typeof json.displaycarbondioxide != "undefined") displaycarbondioxide = json.displaycarbondioxide;
    if(typeof json.displaytemperature != "undefined") displaytemperature = json.displaytemperature;
    if(typeof json.endofexpt0 != "undefined") endofexpt0 = json.endofexpt0;
    if(typeof json.endofexpt3 != "undefined") endofexpt3 = json.endofexpt3;
    if(typeof json.endofexpt4 != "undefined") endofexpt4 = json.endofexpt4;
    if(typeof json.clicked != "undefined") clicked = json.clicked;
    if(typeof json.isToggledOn != "undefined") isToggledOn = json.isToggledOn;
    if(typeof json.isCheckingTextBlink != "undefined") isCheckingTextBlink = json.isCheckingTextBlink;
    if(typeof json.tTextBlink != "undefined") tTextBlink = json.tTextBlink;
    if(typeof json.blinkInterval != "undefined") blinkInterval = json.blinkInterval;
    if(typeof json.dtTextBlink != "undefined") dtTextBlink = json.dtTextBlink;
    if(typeof json.drdistance1 != "undefined") drdistance1 = json.drdistance1;
    if(typeof json.drdistance2 != "undefined") drdistance2 = json.drdistance2;
    if(typeof json.drdistance3 != "undefined") drdistance3 = json.drdistance3;
    if(typeof json.drdistance4 != "undefined") drdistance4 = json.drdistance4;
    if(typeof json.drdistance5 != "undefined") drdistance5 = json.drdistance5;
    if(typeof json.drcarbondioxide1 != "undefined") drcarbondioxide1 = json.drcarbondioxide1;
    if(typeof json.drcarbondioxide2 != "undefined") drcarbondioxide2 = json.drcarbondioxide2;
    if(typeof json.drcarbondioxide3 != "undefined") drcarbondioxide3 = json.drcarbondioxide3;
    if(typeof json.drcarbondioxide4 != "undefined") drcarbondioxide4 = json.drcarbondioxide4;
    if(typeof json.drcarbondioxide5 != "undefined") drcarbondioxide5 = json.drcarbondioxide5;
    if(typeof json.drtemperature1 != "undefined") drtemperature1 = json.drtemperature1;
    if(typeof json.drtemperature2 != "undefined") drtemperature2 = json.drtemperature2;
    if(typeof json.drtemperature3 != "undefined") drtemperature3 = json.drtemperature3;
    if(typeof json.drtemperature4 != "undefined") drtemperature4 = json.drtemperature4;
    if(typeof json.drtemperature5 != "undefined") drtemperature5 = json.drtemperature5;
    if(typeof json.colorCyan != "undefined") colorCyan = json.colorCyan;
    if(typeof json.colorPurple != "undefined") colorPurple = json.colorPurple;
    if(typeof json.colorGreen != "undefined") colorGreen = json.colorGreen;
    if(typeof json.colorRed != "undefined") colorRed = json.colorRed;
    if(typeof json.color1 != "undefined") color1 = json.color1;
    if(typeof json.color2 != "undefined") color2 = json.color2;
    if(typeof json.color3 != "undefined") color3 = json.color3;
    if(typeof json.cssBlink != "undefined") cssBlink = json.cssBlink;
    if(typeof json.cssBlinkcomboBox != "undefined") cssBlinkcomboBox = json.cssBlinkcomboBox;
    if(typeof json.print != "undefined") print = json.print;
    if(typeof json.datanMax != "undefined") datanMax = json.datanMax;
    if(typeof json.datan != "undefined") datan = json.datan;
    if(typeof json.distancedata != "undefined") distancedata = json.distancedata;
    if(typeof json.intensitydata != "undefined") intensitydata = json.intensitydata;
    if(typeof json.sumcountdata != "undefined") sumcountdata = json.sumcountdata;
    if(typeof json.sumcountdatadistance != "undefined") sumcountdatadistance = json.sumcountdatadistance;
    if(typeof json.sumcountdatacarbondioxide != "undefined") sumcountdatacarbondioxide = json.sumcountdatacarbondioxide;
    if(typeof json.sumcountdatatemperature != "undefined") sumcountdatatemperature = json.sumcountdatatemperature;
    if(typeof json.carbondioxidedata != "undefined") carbondioxidedata = json.carbondioxidedata;
    if(typeof json.temperaturedata != "undefined") temperaturedata = json.temperaturedata;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width0 != "undefined") Width0 = json.Width0;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.Width3 != "undefined") Width3 = json.Width3;
    if(typeof json.Width4 != "undefined") Width4 = json.Width4;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.graph2 != "undefined") graph2 = json.graph2;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.m != "undefined") m = json.m;
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.xs != "undefined") xs = json.xs;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.vxs != "undefined") vxs = json.vxs;
    if(typeof json.vxstored != "undefined") vxstored = json.vxstored;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.T != "undefined") T = json.T;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.selectedmodel != "undefined") selectedmodel = json.selectedmodel;
    if(typeof json.functionY != "undefined") functionY = json.functionY;
    if(typeof json.xmodel != "undefined") xmodel = json.xmodel;
    if(typeof json.showmodel != "undefined") showmodel = json.showmodel;
    if(typeof json.splineFunction != "undefined") splineFunction = json.splineFunction;
    if(typeof json.splinex0 != "undefined") splinex0 = json.splinex0;
    if(typeof json.spliney0 != "undefined") spliney0 = json.spliney0;
    if(typeof json.splinex != "undefined") splinex = json.splinex;
    if(typeof json.spliney != "undefined") spliney = json.spliney;
    if(typeof json.distancecubicsplinex != "undefined") distancecubicsplinex = json.distancecubicsplinex;
    if(typeof json.distancecubicspliney != "undefined") distancecubicspliney = json.distancecubicspliney;
    if(typeof json.intensitycubicsplinex != "undefined") intensitycubicsplinex = json.intensitycubicsplinex;
    if(typeof json.intensitycubicspliney != "undefined") intensitycubicspliney = json.intensitycubicspliney;
    if(typeof json.splinex2 != "undefined") splinex2 = json.splinex2;
    if(typeof json.spliney2 != "undefined") spliney2 = json.spliney2;
    if(typeof json.carbondioxidecubicsplinex != "undefined") carbondioxidecubicsplinex = json.carbondioxidecubicsplinex;
    if(typeof json.carbondioxidecubicspliney != "undefined") carbondioxidecubicspliney = json.carbondioxidecubicspliney;
    if(typeof json.splinex3 != "undefined") splinex3 = json.splinex3;
    if(typeof json.spliney3 != "undefined") spliney3 = json.spliney3;
    if(typeof json.temperaturecubicsplinex != "undefined") temperaturecubicsplinex = json.temperaturecubicsplinex;
    if(typeof json.temperaturecubicspliney != "undefined") temperaturecubicspliney = json.temperaturecubicspliney;
    if(typeof json.resultexponential != "undefined") resultexponential = json.resultexponential;
    if(typeof json.FittedParametersa != "undefined") FittedParametersa = json.FittedParametersa;
    if(typeof json.FittedParametersb != "undefined") FittedParametersb = json.FittedParametersb;
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model.addToReset(function() {
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["colors"] = true;
    __pagesEnabled["Init Page"] = true;
    __pagesEnabled["resizeListener"] = true;
    __pagesEnabled["message"] = true;
    __pagesEnabled["svg"] = false;
    __pagesEnabled["axes"] = true;
    __pagesEnabled["meesage"] = true;
    __pagesEnabled["fontchanginginfinite"] = false;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["Event"] = true;
    __pagesEnabled["AnimateBlinking"] = false;
    __pagesEnabled["distancebubble"] = true;
    __pagesEnabled["fontincreasing"] = true;
    __pagesEnabled["curvefitdistance"] = true;
    __pagesEnabled["resize view"] = true;
    __pagesEnabled["endofexpt"] = false;
    __pagesEnabled["intensitybubble 2"] = false;
    __pagesEnabled["co2bubble"] = true;
    __pagesEnabled["temperature"] = true;
    __pagesEnabled["numericsJSSpline"] = true;
    __pagesEnabled["co2bubblerandom"] = false;
    __pagesEnabled["sumcount"] = true;
    __pagesEnabled["stop"] = false;
    __pagesEnabled["fazli"] = true;
  });

  _model.addToReset(function() {
    datatable = [[10,0],[20,0],[30,0],[40,0],[50,0]]; // EjsS Model.Variables.Var Table.datatable
    datatable2 = [[0.2,0],[0.4,0],[0.6,0],[0.8,0],[1.0,0]]; // EjsS Model.Variables.Var Table.datatable2
    datatable3 = [[10,0],[20,0],[30,0],[40,0],[50,0]]; // EjsS Model.Variables.Var Table.datatable3
    xmin = -15; // EjsS Model.Variables.Var Table.xmin
    xmax = 13; // EjsS Model.Variables.Var Table.xmax
    ymin = -5; // EjsS Model.Variables.Var Table.ymin
    ymax = 5; // EjsS Model.Variables.Var Table.ymax
    rangex = xmax-xmin; // EjsS Model.Variables.Var Table.rangex
    rangey = ymax-ymin; // EjsS Model.Variables.Var Table.rangey
    sizex = rangex/20; // EjsS Model.Variables.Var Table.sizex
    sizey = rangey/20; // EjsS Model.Variables.Var Table.sizey
    selected = new Array(1); // EjsS Model.Variables.Var Table.selected
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.Var Table.selected
        selected[_i0] = "shm_with_xo=0,vo=2";  // EjsS Model.Variables.Var Table.selected
      }
    }());
    text = "select dropdown menu , vary the slider (eg. distance)\nand click play"; // EjsS Model.Variables.Var Table.text
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    y1 = sizey*5/2; // EjsS Model.Variables.Var Table.y1
    ysize = 0.2; // EjsS Model.Variables.Var Table.ysize
    xlamp = 10; // EjsS Model.Variables.Var Table.xlamp
    ylamp = -2.5; // EjsS Model.Variables.Var Table.ylamp
    n = 100; // EjsS Model.Variables.Var Table.n
    ntotal = 100; // EjsS Model.Variables.Var Table.ntotal
    index = new Array(ntotal); // EjsS Model.Variables.Var Table.index
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.index
        index[_i0] = 0;  // EjsS Model.Variables.Var Table.index
      }
    }());
    r = new Array(ntotal); // EjsS Model.Variables.Var Table.r
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.r
        r[_i0] = 0;  // EjsS Model.Variables.Var Table.r
      }
    }());
    dr = new Array(ntotal); // EjsS Model.Variables.Var Table.dr
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.dr
        dr[_i0] = 0;  // EjsS Model.Variables.Var Table.dr
      }
    }());
    xbubble = new Array(ntotal); // EjsS Model.Variables.Var Table.xbubble
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.xbubble
        xbubble[_i0] = 0;  // EjsS Model.Variables.Var Table.xbubble
      }
    }());
    ybubble = new Array(ntotal); // EjsS Model.Variables.Var Table.ybubble
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.ybubble
        ybubble[_i0] = 0;  // EjsS Model.Variables.Var Table.ybubble
      }
    }());
    dy = new Array(ntotal); // EjsS Model.Variables.Var Table.dy
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.dy
        dy[_i0] = 0;  // EjsS Model.Variables.Var Table.dy
      }
    }());
    ybubbleshow = new Array(ntotal); // EjsS Model.Variables.Var Table.ybubbleshow
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.ybubbleshow
        ybubbleshow[_i0] = true;  // EjsS Model.Variables.Var Table.ybubbleshow
      }
    }());
    count = new Array(ntotal); // EjsS Model.Variables.Var Table.count
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.count
        count[_i0] = 0;  // EjsS Model.Variables.Var Table.count
      }
    }());
    sumcount = 0; // EjsS Model.Variables.Var Table.sumcount
    intensity = 1; // EjsS Model.Variables.Var Table.intensity
    intensitydrag = intensity-3; // EjsS Model.Variables.Var Table.intensitydrag
    carbondioxide = 1; // EjsS Model.Variables.Var Table.carbondioxide
    carbondioxidedrag = -2; // EjsS Model.Variables.Var Table.carbondioxidedrag
    spd = 1; // EjsS Model.Variables.Var Table.spd
    bubbleburst = new Array(ntotal); // EjsS Model.Variables.Var Table.bubbleburst
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.bubbleburst
        bubbleburst[_i0] = false;  // EjsS Model.Variables.Var Table.bubbleburst
      }
    }());
    bubblebursttime = new Array(ntotal); // EjsS Model.Variables.Var Table.bubblebursttime
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.bubblebursttime
        bubblebursttime[_i0] = 0;  // EjsS Model.Variables.Var Table.bubblebursttime
      }
    }());
    bubbleburstcheck = new Array(ntotal); // EjsS Model.Variables.Var Table.bubbleburstcheck
    (function () {
      var _i0;
      for (_i0=0; _i0<ntotal; _i0+=1) {  // EjsS Model.Variables.Var Table.bubbleburstcheck
        bubbleburstcheck[_i0] = 0;  // EjsS Model.Variables.Var Table.bubbleburstcheck
      }
    }());
    floory = -8; // EjsS Model.Variables.Var Table.floory
    font = "normal normal 1.5vw "; // EjsS Model.Variables.Var Table.font
    font2 = "normal normal 1vw "; // EjsS Model.Variables.Var Table.font2
    scene11 = false; // EjsS Model.Variables.Var Table.scene11
    scene12 = false; // EjsS Model.Variables.Var Table.scene12
    scene13 = false; // EjsS Model.Variables.Var Table.scene13
    distance = 50; // EjsS Model.Variables.Var Table.distance
    showdistancefitcurve = false; // EjsS Model.Variables.Var Table.showdistancefitcurve
    temperature = 30; // EjsS Model.Variables.Var Table.temperature
    showLabel = true; // EjsS Model.Variables.Var Table.showLabel
    displaydistance = "inline-block"; // EjsS Model.Variables.Var Table.displaydistance
    displaycarbondioxide = "inline-block"; // EjsS Model.Variables.Var Table.displaycarbondioxide
    displaytemperature = "inline-block"; // EjsS Model.Variables.Var Table.displaytemperature
    endofexpt0 = true; // EjsS Model.Variables.Var Table.endofexpt0
    endofexpt3 = true; // EjsS Model.Variables.Var Table.endofexpt3
    endofexpt4 = true; // EjsS Model.Variables.Var Table.endofexpt4
    clicked = new Array(3); // EjsS Model.Variables.Var Table.clicked
    (function () {
      var _i0;
      for (_i0=0; _i0<3; _i0+=1) {  // EjsS Model.Variables.Var Table.clicked
        clicked[_i0] = false;  // EjsS Model.Variables.Var Table.clicked
      }
    }());
    isToggledOn = true; // EjsS Model.Variables.Var Table.isToggledOn
    isCheckingTextBlink = true; // EjsS Model.Variables.Var Table.isCheckingTextBlink
    tTextBlink = 0; // EjsS Model.Variables.Var Table.tTextBlink
    blinkInterval = 3; // EjsS Model.Variables.Var Table.blinkInterval
    dtTextBlink = 0.1; // EjsS Model.Variables.Var Table.dtTextBlink
  });

  _model.addToReset(function() {
    drdistance1 = 0.22; // EjsS Model.Variables.bubbles.drdistance1
    drdistance2 = 0.118; // EjsS Model.Variables.bubbles.drdistance2
    drdistance3 = 0.082; // EjsS Model.Variables.bubbles.drdistance3
    drdistance4 = 0.062; // EjsS Model.Variables.bubbles.drdistance4
    drdistance5 = 0.053; // EjsS Model.Variables.bubbles.drdistance5
    drcarbondioxide1 = 0.033; // EjsS Model.Variables.bubbles.drcarbondioxide1
    drcarbondioxide2 = 0.105; // EjsS Model.Variables.bubbles.drcarbondioxide2
    drcarbondioxide3 = 0.184; // EjsS Model.Variables.bubbles.drcarbondioxide3
    drcarbondioxide4 = 0.22; // EjsS Model.Variables.bubbles.drcarbondioxide4
    drcarbondioxide5 = 0.22; // EjsS Model.Variables.bubbles.drcarbondioxide5
    drtemperature1 = 0.052; // EjsS Model.Variables.bubbles.drtemperature1
    drtemperature2 = 0.12; // EjsS Model.Variables.bubbles.drtemperature2
    drtemperature3 = 0.22; // EjsS Model.Variables.bubbles.drtemperature3
    drtemperature4 = 0.1846153846151; // EjsS Model.Variables.bubbles.drtemperature4
    drtemperature5 = 0.0067; // EjsS Model.Variables.bubbles.drtemperature5
  });

  _model.addToReset(function() {
    colorCyan = "rgba(0,255,255,0.6)"; // EjsS Model.Variables.colors.colorCyan
    colorPurple = "rgba(255,0,255,0.6)"; // EjsS Model.Variables.colors.colorPurple
    colorGreen = "rgba(0,255,0,0.6)"; // EjsS Model.Variables.colors.colorGreen
    colorRed = "rgba(255,0,0,0.6)"; // EjsS Model.Variables.colors.colorRed
    cssBlink = {}; // EjsS Model.Variables.colors.cssBlink
    cssBlinkcomboBox = {}; // EjsS Model.Variables.colors.cssBlinkcomboBox
  });

  _model.addToReset(function() {
    print = false; // EjsS Model.Variables.Comboboxvar.print
  });

  _model.addToReset(function() {
    datanMax = 20; // EjsS Model.Variables.datatable.datanMax
    datan = 1; // EjsS Model.Variables.datatable.datan
    distancedata = new Array(datanMax); // EjsS Model.Variables.datatable.distancedata
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.distancedata
        distancedata[_i0] = -10;  // EjsS Model.Variables.datatable.distancedata
      }
    }());
    intensitydata = new Array(datanMax); // EjsS Model.Variables.datatable.intensitydata
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.intensitydata
        intensitydata[_i0] = -10;  // EjsS Model.Variables.datatable.intensitydata
      }
    }());
    sumcountdata = new Array(datanMax); // EjsS Model.Variables.datatable.sumcountdata
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.sumcountdata
        sumcountdata[_i0] = 0;  // EjsS Model.Variables.datatable.sumcountdata
      }
    }());
    sumcountdatadistance = new Array(datanMax); // EjsS Model.Variables.datatable.sumcountdatadistance
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.sumcountdatadistance
        sumcountdatadistance[_i0] = 0;  // EjsS Model.Variables.datatable.sumcountdatadistance
      }
    }());
    sumcountdatacarbondioxide = new Array(datanMax); // EjsS Model.Variables.datatable.sumcountdatacarbondioxide
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.sumcountdatacarbondioxide
        sumcountdatacarbondioxide[_i0] = 0;  // EjsS Model.Variables.datatable.sumcountdatacarbondioxide
      }
    }());
    sumcountdatatemperature = new Array(datanMax); // EjsS Model.Variables.datatable.sumcountdatatemperature
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.sumcountdatatemperature
        sumcountdatatemperature[_i0] = 0;  // EjsS Model.Variables.datatable.sumcountdatatemperature
      }
    }());
    carbondioxidedata = new Array(datanMax); // EjsS Model.Variables.datatable.carbondioxidedata
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.carbondioxidedata
        carbondioxidedata[_i0] = -10;  // EjsS Model.Variables.datatable.carbondioxidedata
      }
    }());
    temperaturedata = new Array(datanMax); // EjsS Model.Variables.datatable.temperaturedata
    (function () {
      var _i0;
      for (_i0=0; _i0<datanMax; _i0+=1) {  // EjsS Model.Variables.datatable.temperaturedata
        temperaturedata[_i0] = -10;  // EjsS Model.Variables.datatable.temperaturedata
      }
    }());
  });

  _model.addToReset(function() {
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width0 = "50%"; // EjsS Model.Variables.layout.Width0
    Width1 = "50%"; // EjsS Model.Variables.layout.Width1
    Width2 = "50%"; // EjsS Model.Variables.layout.Width2
    Width3 = "50%"; // EjsS Model.Variables.layout.Width3
    Width4 = "50%"; // EjsS Model.Variables.layout.Width4
    world = true; // EjsS Model.Variables.layout.world
    graph = true; // EjsS Model.Variables.layout.graph
    graph2 = true; // EjsS Model.Variables.layout.graph2
    disabledworld = false; // EjsS Model.Variables.layout.disabledworld
    disabled = false; // EjsS Model.Variables.layout.disabled
  });

  _model.addToReset(function() {
    m = 1; // EjsS Model.Variables.simplespring.m
    x = -1; // EjsS Model.Variables.simplespring.x
    xs = x; // EjsS Model.Variables.simplespring.xs
    y = 0; // EjsS Model.Variables.simplespring.y
    vx = 0; // EjsS Model.Variables.simplespring.vx
    vxs = vx; // EjsS Model.Variables.simplespring.vxs
    vxstored = 0; // EjsS Model.Variables.simplespring.vxstored
    t = 0; // EjsS Model.Variables.simplespring.t
    T = 1; // EjsS Model.Variables.simplespring.T
  });

  _model.addToReset(function() {
    selectedmodel = new Array(1); // EjsS Model.Variables.functionY.selectedmodel
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.functionY.selectedmodel
        selectedmodel[_i0] = "2*sin(t)";  // EjsS Model.Variables.functionY.selectedmodel
      }
    }());
    functionY = selectedmodel+""; // EjsS Model.Variables.functionY.functionY
    showmodel = false; // EjsS Model.Variables.functionY.showmodel
  });

  _model.addToReset(function() {
    splinex0 = new Array(101); // EjsS Model.Variables.splineFunction.splinex0
    spliney0 = new Array(101); // EjsS Model.Variables.splineFunction.spliney0
    splinex = new Array(101); // EjsS Model.Variables.splineFunction.splinex
    spliney = new Array(101); // EjsS Model.Variables.splineFunction.spliney
    distancecubicsplinex = new Array(7); // EjsS Model.Variables.splineFunction.distancecubicsplinex
    (function () {
      var _i0;
      for (_i0=0; _i0<7; _i0+=1) {  // EjsS Model.Variables.splineFunction.distancecubicsplinex
        distancecubicsplinex[_i0] = 0;  // EjsS Model.Variables.splineFunction.distancecubicsplinex
      }
    }());
    distancecubicspliney = [350,0,0,0,0,0,0]; // EjsS Model.Variables.splineFunction.distancecubicspliney
    intensitycubicsplinex = new Array(7); // EjsS Model.Variables.splineFunction.intensitycubicsplinex
    intensitycubicspliney = new Array(7); // EjsS Model.Variables.splineFunction.intensitycubicspliney
    splinex2 = new Array(101); // EjsS Model.Variables.splineFunction.splinex2
    spliney2 = new Array(101); // EjsS Model.Variables.splineFunction.spliney2
    carbondioxidecubicsplinex = new Array(6); // EjsS Model.Variables.splineFunction.carbondioxidecubicsplinex
    (function () {
      var _i0;
      for (_i0=0; _i0<6; _i0+=1) {  // EjsS Model.Variables.splineFunction.carbondioxidecubicsplinex
        carbondioxidecubicsplinex[_i0] = 0;  // EjsS Model.Variables.splineFunction.carbondioxidecubicsplinex
      }
    }());
    carbondioxidecubicspliney = new Array(6); // EjsS Model.Variables.splineFunction.carbondioxidecubicspliney
    (function () {
      var _i0;
      for (_i0=0; _i0<6; _i0+=1) {  // EjsS Model.Variables.splineFunction.carbondioxidecubicspliney
        carbondioxidecubicspliney[_i0] = 0;  // EjsS Model.Variables.splineFunction.carbondioxidecubicspliney
      }
    }());
    splinex3 = new Array(101); // EjsS Model.Variables.splineFunction.splinex3
    spliney3 = new Array(101); // EjsS Model.Variables.splineFunction.spliney3
    temperaturecubicsplinex = new Array(6); // EjsS Model.Variables.splineFunction.temperaturecubicsplinex
    (function () {
      var _i0;
      for (_i0=0; _i0<6; _i0+=1) {  // EjsS Model.Variables.splineFunction.temperaturecubicsplinex
        temperaturecubicsplinex[_i0] = 0;  // EjsS Model.Variables.splineFunction.temperaturecubicsplinex
      }
    }());
    temperaturecubicspliney = new Array(6); // EjsS Model.Variables.splineFunction.temperaturecubicspliney
    (function () {
      var _i0;
      for (_i0=0; _i0<6; _i0+=1) {  // EjsS Model.Variables.splineFunction.temperaturecubicspliney
        temperaturecubicspliney[_i0] = 0;  // EjsS Model.Variables.splineFunction.temperaturecubicspliney
      }
    }());
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
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  var lambda = 5; // mean need to be larger than 0 //http://jsfiddle.net/Xotic750/DXXhs/  // > CustomCode.possion:1
  var k = 0;  // > CustomCode.possion:2
  var p = 1;  // > CustomCode.possion:3
  function poisson (lambda) {  // > CustomCode.possion:4
      var L = Math.exp(-lambda),  // > CustomCode.possion:5
          k = 0,  // > CustomCode.possion:6
          p = 1;  // > CustomCode.possion:7
      do {  // > CustomCode.possion:8
          k = k + 1;  // > CustomCode.possion:9
          p = p * Math.random();  // > CustomCode.possion:10
      } while (p > L);  // > CustomCode.possion:11
      return k - 1;  // > CustomCode.possion:12
  }  // > CustomCode.possion:13

  // remove label after all 3 text are not displayed  // > CustomCode.updateLabel:1
  function updateLabel () {  // > CustomCode.updateLabel:2
    if (scene11==false){  // > CustomCode.updateLabel:3
      if (scene12==false){  // > CustomCode.updateLabel:4
        if (scene13==false){  // > CustomCode.updateLabel:5
          showLabel=false  // > CustomCode.updateLabel:6
        }  // > CustomCode.updateLabel:7
      }  // > CustomCode.updateLabel:8
    }  // > CustomCode.updateLabel:9
  }  // > CustomCode.updateLabel:10

  function fitCurve(xData, yData) {  // > CustomCode.regression:1
    // Define the function to fit  // > CustomCode.regression:2
    function func(a, x) {  // > CustomCode.regression:3
      return a[0] / (x * x) + a[1];  // > CustomCode.regression:4
    }  // > CustomCode.regression:5
    // Define the error function to minimize  // > CustomCode.regression:6
    function errorFunc(a) {  // > CustomCode.regression:7
      var error = 0;  // > CustomCode.regression:8
      for (var i = 0; i < xData.length; i++) {  // > CustomCode.regression:9
        var yFit = func(a, xData[i]);  // > CustomCode.regression:10
        var yError = yData[i] - yFit;  // > CustomCode.regression:11
        error += yError * yError;  // > CustomCode.regression:12
      }  // > CustomCode.regression:13
      return error;  // > CustomCode.regression:14
    }  // > CustomCode.regression:15
    // Perform the curve fit  // > CustomCode.regression:16
    var aInitial = [1, 1];  // > CustomCode.regression:17
    var aFit = numeric.uncmin(errorFunc, aInitial).solution;  // > CustomCode.regression:18
    // Get the values of a and b  // > CustomCode.regression:19
    var a = aFit[0];  // > CustomCode.regression:20
    var b = aFit[1];  // > CustomCode.regression:21
    // Return the values of a and b as an object  // > CustomCode.regression:22
    return { a: a, b: b };  // > CustomCode.regression:23
  }  // > CustomCode.regression:24

  function formatTime(seconds) {  // > CustomCode.formatTime:1
    var hours = Math.floor(seconds / 3600);  // > CustomCode.formatTime:2
    var minutes = Math.floor((seconds % 3600) / 60);  // > CustomCode.formatTime:3
    // add .toFixed(2) to display sec in 0.00 instead of 0.00000000000  // > CustomCode.formatTime:4
    var remainingSeconds = (seconds % 60).toFixed(0);  // > CustomCode.formatTime:5
    var timeString = "";  // > CustomCode.formatTime:6
    if (hours < 10) {  // > CustomCode.formatTime:7
      timeString += "0" + hours + ":";  // > CustomCode.formatTime:8
    } else {  // > CustomCode.formatTime:9
      timeString += hours + ":";  // > CustomCode.formatTime:10
    }  // > CustomCode.formatTime:11
    if (minutes < 10) {  // > CustomCode.formatTime:12
      timeString += "0" + minutes + ":";  // > CustomCode.formatTime:13
    } else {  // > CustomCode.formatTime:14
      timeString += minutes + ":";  // > CustomCode.formatTime:15
    }  // > CustomCode.formatTime:16
    if (remainingSeconds < 10) {  // > CustomCode.formatTime:17
      timeString += "0" + remainingSeconds;  // > CustomCode.formatTime:18
    } else {  // > CustomCode.formatTime:19
      timeString += remainingSeconds;  // > CustomCode.formatTime:20
    }  // > CustomCode.formatTime:21
    return timeString;  // > CustomCode.formatTime:22
  }  // > CustomCode.formatTime:23

  // Assume ECMAScript 6; Chrome >=49, Edge >=14, Firefox >=41, Opera >=36, Safari >=8  // > CustomCode.questionLib 3:1
  const debugMode = true;  // > CustomCode.questionLib 3:2
  const _questionLib = {};  // > CustomCode.questionLib 3:3
  _questionLib.stack = [];  // > CustomCode.questionLib 3:4
  _questionLib.history = Object.create(null);  // > CustomCode.questionLib 3:5
  _questionLib.questionMarksAwarded = Object.create(null);  // > CustomCode.questionLib 3:6
  const _nullFunction = debugMode ?  // > CustomCode.questionLib 3:7
    console.log  // > CustomCode.questionLib 3:8
    :  // > CustomCode.questionLib 3:9
    function(){};  // > CustomCode.questionLib 3:10
  function _debugPrint(msg) {  // > CustomCode.questionLib 3:11
    if (debugMode) {  // > CustomCode.questionLib 3:12
      console.log(msg);  // > CustomCode.questionLib 3:13
    }  // > CustomCode.questionLib 3:14
  }  // > CustomCode.questionLib 3:15
  function isQuestionStarted() {  // > CustomCode.questionLib 3:16
    return _questionLib.stack.length > 0;  // > CustomCode.questionLib 3:17
  }  // > CustomCode.questionLib 3:18
  // for assessment.json event - start  // > CustomCode.questionLib 3:19
  function startQuestion(questionName) {  // > CustomCode.questionLib 3:20
    _view._addInteraction(_nullFunction, {action:"questionStart", name:questionName}, {element:"questionLib", property:"value"});  // > CustomCode.questionLib 3:21
    _debugPrint("Start question: " + questionName);  // > CustomCode.questionLib 3:22
      // > CustomCode.questionLib 3:23
    _questionLib.stack.push(questionName);  // > CustomCode.questionLib 3:24
  }  // > CustomCode.questionLib 3:25
  // for assessment.json history  // > CustomCode.questionLib 3:26
  function addQuestionHistory(history, questionName=null) {  // > CustomCode.questionLib 3:27
    if (questionName === null && _questionLib.stack.length > 0) {  // > CustomCode.questionLib 3:28
      questionName = _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.questionLib 3:29
    }  // > CustomCode.questionLib 3:30
    if (!(questionName in _questionLib.history)) {  // > CustomCode.questionLib 3:31
      _debugPrint("Create question history for " + questionName);  // > CustomCode.questionLib 3:32
        // > CustomCode.questionLib 3:33
      _questionLib.history[questionName] = [];  // > CustomCode.questionLib 3:34
    }  // > CustomCode.questionLib 3:35
    if (debugMode) {  // > CustomCode.questionLib 3:36
      console.log("Push \"" + history + "\" to question history for " + questionName);  // > CustomCode.questionLib 3:37
    }  // > CustomCode.questionLib 3:38
    _questionLib.history[questionName].push(history);  // > CustomCode.questionLib 3:39
    _flushQuestionHistory(questionName);  // > CustomCode.questionLib 3:40
  }  // > CustomCode.questionLib 3:41
  function _flushQuestionHistory(questionName) {  // > CustomCode.questionLib 3:42
    // TODO: check if need to flush  // > CustomCode.questionLib 3:43
    const outputHistory = _getQuestionHistory(questionName);  // > CustomCode.questionLib 3:44
    _view._addInteraction(_nullFunction, outputHistory, {property: "historyFor" + questionName, element: "questionLib"});  // > CustomCode.questionLib 3:45
  }  // > CustomCode.questionLib 3:46
  function _getQuestionHistory(questionName) {  // > CustomCode.questionLib 3:47
    if (questionName in _questionLib.history) {  // > CustomCode.questionLib 3:48
      return _questionLib.history[questionName].join("\n");  // > CustomCode.questionLib 3:49
    } else {  // > CustomCode.questionLib 3:50
      _debugPrint("No question \"" + questionName + "\" exists");  // > CustomCode.questionLib 3:51
      return "";  // > CustomCode.questionLib 3:52
    }  // > CustomCode.questionLib 3:53
  }  // > CustomCode.questionLib 3:54
  // for assessment.json event - states  // > CustomCode.questionLib 3:55
  function onAnswer(answer, isCorrect=false, history=answer, questionName=null) {  // > CustomCode.questionLib 3:56
    if (questionName === null && _questionLib.stack.length > 0) {  // > CustomCode.questionLib 3:57
      questionName = _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.questionLib 3:58
    }  // > CustomCode.questionLib 3:59
    if (questionName !== null) {  // > CustomCode.questionLib 3:60
      const explainer = Object.create(null);  // > CustomCode.questionLib 3:61
      explainer[true] = " ✅";  // > CustomCode.questionLib 3:62
      explainer[false] = " ❌";  // > CustomCode.questionLib 3:63
      addQuestionHistory(history + explainer[isCorrect], questionName);  // > CustomCode.questionLib 3:64
        // > CustomCode.questionLib 3:65
      _view._addInteraction(_nullFunction, {name:questionName, answer:answer, isCorrect:isCorrect, action:"questionAnswer"}, {property: "answer", element:"questionLib"});  // > CustomCode.questionLib 3:66
    }  // > CustomCode.questionLib 3:67
  }  // > CustomCode.questionLib 3:68
  // for assessment.json event - end  // > CustomCode.questionLib 3:69
  function endQuestion() {  // > CustomCode.questionLib 3:70
    if (_questionLib.stack.length > 0) {  // > CustomCode.questionLib 3:71
      const questionName = _questionLib.stack.pop();  // > CustomCode.questionLib 3:72
      _debugPrint("End question: " + questionName);  // > CustomCode.questionLib 3:73
      _view._addInteraction(_nullFunction, {action:"questionEnd", name:questionName}, {element: "questionLib", property: "value"});  // > CustomCode.questionLib 3:74
    }  // > CustomCode.questionLib 3:75
  }  // > CustomCode.questionLib 3:76
  // for assessment.json marks  // > CustomCode.questionLib 3:77
  function awardQuestionMarks(marks=1) {  // > CustomCode.questionLib 3:78
    if (_questionLib.stack.length > 0) {  // > CustomCode.questionLib 3:79
      const questionName = _questionLib.stack[_questionLib.stack.length - 1];  // > CustomCode.questionLib 3:80
      if (!(questionName in _questionLib.questionMarksAwarded)) {  // > CustomCode.questionLib 3:81
        _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.questionLib 3:82
      }  // > CustomCode.questionLib 3:83
      for (; _questionLib.questionMarksAwarded[questionName] < marks; _questionLib.questionMarksAwarded[questionName]++) {  // > CustomCode.questionLib 3:84
        _view._addInteraction(_nullFunction, _questionLib.questionMarksAwarded[questionName] + 1, {element:"questionLib", property:"awardMarkFor"+questionName});  // > CustomCode.questionLib 3:85
      }  // > CustomCode.questionLib 3:86
    }  // > CustomCode.questionLib 3:87
  }  // > CustomCode.questionLib 3:88
  function resetQuestionMarks(questionName) {  // > CustomCode.questionLib 3:89
    _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.questionLib 3:90
  }  // > CustomCode.questionLib 3:91
  function questionInstantMark(questionName, message) {  // > CustomCode.questionLib 3:92
    startQuestion(questionName);  // > CustomCode.questionLib 3:93
    _debugPrint("" + message);  // > CustomCode.questionLib 3:94
    if (message) {  // > CustomCode.questionLib 3:95
      addQuestionHistory(message);  // > CustomCode.questionLib 3:96
    } else {  // > CustomCode.questionLib 3:97
      _flushQuestionHistory(questionName);  // > CustomCode.questionLib 3:98
    }  // > CustomCode.questionLib 3:99
    awardQuestionMarks();  // > CustomCode.questionLib 3:100
    endQuestion();  // > CustomCode.questionLib 3:101
  }  // > CustomCode.questionLib 3:102
  function questionAppendHistory(questionName, message) {  // > CustomCode.questionLib 3:103
    if (!(questionName in _questionLib.questionMarksAwarded)) {  // > CustomCode.questionLib 3:104
      _questionLib.questionMarksAwarded[questionName] = 0;  // > CustomCode.questionLib 3:105
    }  // > CustomCode.questionLib 3:106
    startQuestion(questionName);  // > CustomCode.questionLib 3:107
    awardQuestionMarks(_questionLib.questionMarksAwarded[questionName])  // > CustomCode.questionLib 3:108
    addQuestionHistory(message);  // > CustomCode.questionLib 3:109
    endQuestion();  // > CustomCode.questionLib 3:110
  }  // > CustomCode.questionLib 3:111
  function resetQuestionHistory(questionName) {  // > CustomCode.questionLib 3:112
    _questionLib.history[questionName] = [];  // > CustomCode.questionLib 3:113
  }  // > CustomCode.questionLib 3:114
  function resetQuestion(questionName) {  // > CustomCode.questionLib 3:115
    resetQuestionHistory(questionName);  // > CustomCode.questionLib 3:116
    resetQuestionMarks(questionName);  // > CustomCode.questionLib 3:117
  }  // > CustomCode.questionLib 3:118

  function store () {  // > CustomCode.store:1
    //datan is to setup a counter 0,1,2,3,4,5, but the method is not useful for spline so setup another method to linearize the values  // > CustomCode.store:2
    sumcountdata[datan]=sumcount;  // > CustomCode.store:3
      // > CustomCode.store:4
    if (expt ==0){  // > CustomCode.store:5
      distancedata[datan] = distance // added for distance  // > CustomCode.store:6
      sumcountdatadistance[datan]=sumcount;  // > CustomCode.store:7
      // new code to help with cubic spline as numerics need data in ascending order  // > CustomCode.store:8
      // so using intensity as number in ascending order 0,1,2,3,4,5,6  // > CustomCode.store:9
      var distanceinteger = (distance/10).toFixed(0)  // > CustomCode.store:10
      //distancecubicsplinex[(distance/10).toFixed(0)] = distance  // > CustomCode.store:11
      distancecubicsplinex[distanceinteger] = distance  // > CustomCode.store:12
      distancecubicspliney[distanceinteger] = sumcount  // > CustomCode.store:13
    }  // > CustomCode.store:14
    else if (expt ==2){  // > CustomCode.store:15
      carbondioxidedata[datan]= carbondioxide;  // > CustomCode.store:16
      sumcountdatacarbondioxide[datan]=sumcount;  // > CustomCode.store:17
        // > CustomCode.store:18
      // add values to datatable2  // > CustomCode.store:19
      for (let i=0;i<datatable2.length;i++){  // > CustomCode.store:20
        if (datatable2[i][0] == carbondioxide){  // > CustomCode.store:21
          datatable2[i][1] = sumcount  // > CustomCode.store:22
        }  // > CustomCode.store:23
      }  // > CustomCode.store:24
      carbondioxidecubicsplinex[(carbondioxide*5).toFixed(0)]= carbondioxide;  // > CustomCode.store:25
      carbondioxidecubicspliney[(carbondioxide*5).toFixed(0)]= sumcount;  // > CustomCode.store:26
    }  // > CustomCode.store:27
    else if (expt ==3){  // > CustomCode.store:28
      temperaturedata[datan]= temperature;  // > CustomCode.store:29
      sumcountdatatemperature[datan]=sumcount;  // > CustomCode.store:30
        // > CustomCode.store:31
      // add values to datatable3  // > CustomCode.store:32
      for (let i=0;i<datatable3.length;i++){  // > CustomCode.store:33
        if (datatable3[i][0] == temperature){  // > CustomCode.store:34
          datatable3[i][1] = sumcount  // > CustomCode.store:35
        }  // > CustomCode.store:36
      }  // > CustomCode.store:37
      //console.log(carbondioxidecubicsplinex,carbondioxidecubicspliney)  // > CustomCode.store:38
      temperaturecubicsplinex[(temperature/10).toFixed(0)]= temperature;  // > CustomCode.store:39
      temperaturecubicspliney[(temperature/10).toFixed(0)]= sumcount;  // > CustomCode.store:40
    }  // > CustomCode.store:41
    intensitydata[datan] = intensity;  // > CustomCode.store:42
    datan=datan+1;  // > CustomCode.store:43
    intensitycubicsplinex[intensity] = intensity  // > CustomCode.store:44
    intensitycubicspliney[intensity] = sumcount  // > CustomCode.store:45
    t=0;  // > CustomCode.store:46
    _initialize();   // > CustomCode.store:47
  }  // > CustomCode.store:48

  // count the number of non zero elements in the array  // > CustomCode.countNonZero:1
  function countNonZero (arr) {  // > CustomCode.countNonZero:2
    let counter = 0;  // > CustomCode.countNonZero:3
    for (let i=0;i<arr.length;i++){  // > CustomCode.countNonZero:4
      if (arr[i] != 0){  // > CustomCode.countNonZero:5
        counter++;  // > CustomCode.countNonZero:6
      }  // > CustomCode.countNonZero:7
    }  // > CustomCode.countNonZero:8
    return counter  // > CustomCode.countNonZero:9
  }  // > CustomCode.countNonZero:10

  //https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode  // > CustomCode.fullScreen:1
  // does not work for iOS   // > CustomCode.fullScreen:2
  /*jslint browser:true */  // > CustomCode.fullScreen:3
  function toggleFullScreen() {  // > CustomCode.fullScreen:4
    if (!document.fullscreenElement &&    // alternative standard method  // > CustomCode.fullScreen:5
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods  // > CustomCode.fullScreen:6
      if (document.documentElement.requestFullscreen) {  // > CustomCode.fullScreen:7
        document.documentElement.requestFullscreen();  // > CustomCode.fullScreen:8
      } else if (document.documentElement.msRequestFullscreen) {  // > CustomCode.fullScreen:9
        document.documentElement.msRequestFullscreen();  // > CustomCode.fullScreen:10
      } else if (document.documentElement.mozRequestFullScreen) {  // > CustomCode.fullScreen:11
        document.documentElement.mozRequestFullScreen();  // > CustomCode.fullScreen:12
      } else if (document.documentElement.webkitRequestFullscreen) {  // > CustomCode.fullScreen:13
        document.documentElement.webkitRequestFullscreen();  // > CustomCode.fullScreen:14
      }  // > CustomCode.fullScreen:15
    } else {  // > CustomCode.fullScreen:16
      if (document.exitFullscreen) {  // > CustomCode.fullScreen:17
        document.exitFullscreen();  // > CustomCode.fullScreen:18
      } else if (document.msExitFullscreen) {  // > CustomCode.fullScreen:19
        document.msExitFullscreen();  // > CustomCode.fullScreen:20
      } else if (document.mozCancelFullScreen) {  // > CustomCode.fullScreen:21
        document.mozCancelFullScreen();  // > CustomCode.fullScreen:22
      } else if (document.webkitExitFullscreen) {  // > CustomCode.fullScreen:23
        document.webkitExitFullscreen();  // > CustomCode.fullScreen:24
      }  // > CustomCode.fullScreen:25
    }  // > CustomCode.fullScreen:26
  }  // > CustomCode.fullScreen:27

  function exptnumber (Option) {  // > CustomCode.exptnumber:1
     // > CustomCode.exptnumber:2
   if ( Option==0){  // > CustomCode.exptnumber:3
  world=true;  // > CustomCode.exptnumber:4
  Width1 = "50%"; //world  // > CustomCode.exptnumber:5
  expt =0  // > CustomCode.exptnumber:6
  displaydistance = "inline-block"  // > CustomCode.exptnumber:7
  Width0 = "50%";   // > CustomCode.exptnumber:8
  displaycarbondioxide = "none"  // > CustomCode.exptnumber:9
  displaytemperature = "none"  // > CustomCode.exptnumber:10
  //_view._update();  // > CustomCode.exptnumber:11
  //disabledworld=false;  // > CustomCode.exptnumber:12
  }  // > CustomCode.exptnumber:13
  else if ( Option==3){  // > CustomCode.exptnumber:14
  world=true;  // > CustomCode.exptnumber:15
  Width1 = "50%"; //world  // > CustomCode.exptnumber:16
  expt =2  // > CustomCode.exptnumber:17
  displaydistance = "none"  // > CustomCode.exptnumber:18
  displaycarbondioxide = "inline-block"  // > CustomCode.exptnumber:19
  Width3 = "50%";   // > CustomCode.exptnumber:20
  displaytemperature = "none"  // > CustomCode.exptnumber:21
  //_view._update();  // > CustomCode.exptnumber:22
  //disabledworld=false;  // > CustomCode.exptnumber:23
  alert("optioninside=3")  // > CustomCode.exptnumber:24
  }  // > CustomCode.exptnumber:25
  else if ( Option==4){  // > CustomCode.exptnumber:26
  world=true;  // > CustomCode.exptnumber:27
  Width1 = "50%"; //world  // > CustomCode.exptnumber:28
  expt =3  // > CustomCode.exptnumber:29
  displaydistance = "none"  // > CustomCode.exptnumber:30
  displaycarbondioxide = "none"  // > CustomCode.exptnumber:31
  displaytemperature = "inline-block"  // > CustomCode.exptnumber:32
  Width4 = "50%";   // > CustomCode.exptnumber:33
  //_view._update();  // > CustomCode.exptnumber:34
  //assume remember expt   // > CustomCode.exptnumber:35
  //disabledworld=false;  // > CustomCode.exptnumber:36
  }  // > CustomCode.exptnumber:37
  alert(Option)  // > CustomCode.exptnumber:38
  _view._update();  // > CustomCode.exptnumber:39
  }  // > CustomCode.exptnumber:40

  function formatDialogOK () {  // > CustomCode.formatDialogOK:1
    document.getElementById(".myBoxPanelOk").style.fontSize = "1.5em";  // > CustomCode.formatDialogOK:2
      document.getElementById(".myBoxPanelOk").style.width = "50%";  // > CustomCode.formatDialogOK:3
      document.getElementById(".myBoxPanelOk").style.left = "30%";  // > CustomCode.formatDialogOK:4
      document.getElementById(".myBoxPanelOk").style.top = "10%";  // > CustomCode.formatDialogOK:5
      document.getElementById(".myBoxPanelOk.okbt").style.fontSize = "1.5em";  // > CustomCode.formatDialogOK:6
  }  // > CustomCode.formatDialogOK:7

  function scene2comboBoxSlider () {  // > CustomCode.scene2:1
  if (scene11 == false&&scene12 == false&&scene13 == false) {  // > CustomCode.scene2:2
    _tools.showOkDialog("Select the comboBox for expt 1,2 or 3", function() {  // > CustomCode.scene2:3
     // > CustomCode.scene2:4
    _tools.showOkDialog("Based on the experiment being performed, adjust only one slider while keeping the other two constant. The two sliders that should not be adjusted have been disabled for ease of use.", function() {  // > CustomCode.scene2:5
    } );  // > CustomCode.scene2:6
    //cssBlinkcomboBox = {"animation": "blink 1s step-start infinite"}  // > CustomCode.scene2:7
    cssBlink = {"animation": "blink 1s step-start infinite"}  // > CustomCode.scene2:8
       formatDialogOK ()  // > CustomCode.scene2:9
    } );  // > CustomCode.scene2:10
      // > CustomCode.scene2:11
    cssBlinkcomboBox = {"animation": "blink 1s step-start infinite"}  // > CustomCode.scene2:12
      formatDialogOK ()  // > CustomCode.scene2:13
     // > CustomCode.scene2:14
    }  // > CustomCode.scene2:15
      // > CustomCode.scene2:16
      // > CustomCode.scene2:17
    }  // > CustomCode.scene2:18

  function enableBlinking (elementId) {  // > CustomCode.enableBlinking:1
    var element = document.getElementById(elementId);  // > CustomCode.enableBlinking:2
    element.setAttribute("class", "blinking");  // > CustomCode.enableBlinking:3
  }  // > CustomCode.enableBlinking:4
  function disableBlinking (elementId) {  // > CustomCode.enableBlinking:5
    var element = document.getElementById(elementId);  // > CustomCode.enableBlinking:6
    element.removeAttribute("class");  // > CustomCode.enableBlinking:7
  }  // > CustomCode.enableBlinking:8

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (expt==undefined){  // > Initialization.undefined:1
      expt=0;  // > Initialization.undefined:2
      }  // > Initialization.undefined:3
        // > Initialization.undefined:4
      if (dt==undefined){  // > Initialization.undefined:5
      dt=0.1;  // > Initialization.undefined:6
      }  // > Initialization.undefined:7
    if (scene1firsttime==undefined){  // > Initialization.undefined:8
      scene1firsttime=true  // > Initialization.undefined:9
      }  // > Initialization.undefined:10
        // > Initialization.undefined:11
     // if (scene2firsttime==undefined){  // > Initialization.undefined:12
     //   scene2firsttime=true  // > Initialization.undefined:13
      //  }  // > Initialization.undefined:14
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["colors"]) return;
    color1=colorCyan  // > Initialization.colors:1
    color2=colorPurple  // > Initialization.colors:2
    color3=colorGreen  // > Initialization.colors:3
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Page"]) return;
    for (var i=0; i<ntotal  ; i++) {  // > Initialization.Init Page:1
     //random position  // > Initialization.Init Page:2
     //xbubble[i]=(Math.random()-0.5);  // > Initialization.Init Page:3
    // xbubble[i] =poisson();  // > Initialization.Init Page:4
     //ybubble[i]=(Math.random()*(-3));  // > Initialization.Init Page:5
    // ybubble[i] =poisson()*(-3);  // > Initialization.Init Page:6
    xbubble[i]= 0  // > Initialization.Init Page:7
    ybubble[i]= -0.45  // > Initialization.Init Page:8
     r[i]=0; //reset radius back to zero size  // > Initialization.Init Page:9
     dr[i] =0; // reset radius growth   // > Initialization.Init Page:10
     count[i]=0; //reset counting of bubbles  // > Initialization.Init Page:11
     ybubbleshow[i]=true; //show all bubbles   // > Initialization.Init Page:12
     index[i]=i+"";  // > Initialization.Init Page:13
    }  // > Initialization.Init Page:14
    sumcount  = 0;   // > Initialization.Init Page:15
    if (expt==0){  // > Initialization.Init Page:16
      //["expt 1 vary amount of light","expt 2 vary amount of carbon dioxide"]  // > Initialization.Init Page:17
      // _view.comboBox.setSelectedOptions(["expt 1 vary amount of light"]);  // > Initialization.Init Page:18
        // > Initialization.Init Page:19
      dr[0] = drdistance1; //set first bubble rate of radius increase  // > Initialization.Init Page:20
      //dr[n] = 0.05*intensity/10; //set first bubble rate of radius increase for random appearance  // > Initialization.Init Page:21
      //_tools.showOkDialog("Vary the on screen slider of intensity to a different value!");  // > Initialization.Init Page:22
    }  // > Initialization.Init Page:23
    if (expt==1){  // > Initialization.Init Page:24
      //["expt 1 vary amount of light","expt 2 vary amount of carbon dioxide"]  // > Initialization.Init Page:25
      // _view.comboBox.setSelectedOptions(["expt 1 vary amount of light"]);  // > Initialization.Init Page:26
      dr[0] = 0.05*intensity; //set first bubble rate of radius increase  // > Initialization.Init Page:27
      //dr[n] = 0.05*intensity/10; //set first bubble rate of radius increase for random appearance  // > Initialization.Init Page:28
      //_tools.showOkDialog("Vary the on screen slider of intensity to a different value!");  // > Initialization.Init Page:29
    }  // > Initialization.Init Page:30
    else if (expt==2){  // > Initialization.Init Page:31
      //["expt 1 vary amount of light","expt 2 vary amount of carbon dioxide"]  // > Initialization.Init Page:32
      //_view.comboBox.setSelectedOptions(["expt 2 vary amount of carbon dioxide"]);  // > Initialization.Init Page:33
      dr[0] = 0.22; //set first bubble rate of radius increase   // > Initialization.Init Page:34
      //dr[n] = 0.05*carbondioxide*16/10; //set first bubble rate of radius increase  // > Initialization.Init Page:35
      // _tools.showOkDialog("Vary the on screen slider of carbon dioxide to a different value!");  // > Initialization.Init Page:36
    }  // > Initialization.Init Page:37
    else if (expt==3){  // > Initialization.Init Page:38
      //["expt 1 vary amount of light","expt 2 vary amount of carbon dioxide"]  // > Initialization.Init Page:39
      //_view.comboBox.setSelectedOptions(["expt 2 vary amount of carbon dioxide"]);  // > Initialization.Init Page:40
      //dr[0] = 0.22; //set first bubble rate of radius increase   // > Initialization.Init Page:41
      dr[0]=drtemperature1  // > Initialization.Init Page:42
      if (temperature==10){  // > Initialization.Init Page:43
        console.log("temp: 10")  // > Initialization.Init Page:44
      }  // > Initialization.Init Page:45
      if (temperature==20){  // > Initialization.Init Page:46
        console.log("temp: 20")  // > Initialization.Init Page:47
      }  // > Initialization.Init Page:48
      if (temperature==30){  // > Initialization.Init Page:49
        console.log("temp: 30")  // > Initialization.Init Page:50
      }  // > Initialization.Init Page:51
      if (temperature==40){  // > Initialization.Init Page:52
        console.log("temp: 40")  // > Initialization.Init Page:53
      }  // > Initialization.Init Page:54
      if (temperature==50){  // > Initialization.Init Page:55
        console.log("temp: 50")  // > Initialization.Init Page:56
      }  // > Initialization.Init Page:57
      //dr[n] = 0.05*carbondioxide*16/10; //set first bubble rate of radius increase  // > Initialization.Init Page:58
      // _tools.showOkDialog("Vary the on screen slider of carbon dioxide to a different value!");  // > Initialization.Init Page:59
    }  // > Initialization.Init Page:60
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["resizeListener"]) return;
    if (window) {  // > Initialization.resizeListener:1
      window.addEventListener('resize', function(e) { _update(); });  // > Initialization.resizeListener:2
    }  // > Initialization.resizeListener:3
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
    if (!__pagesEnabled["svg"]) return;
    var container = document.createElement('div');  // > Initialization.svg:1
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svg:2
      '  <radialGradient id="mygrandient" cx="50%" cy="50%" r="90%" fx="90%" fy="10%">'+  // > Initialization.svg:3
      '    <stop offset="0%" style="stop-color:rgb(0,255,255); stop-opacity:0.6" />'+  // > Initialization.svg:4
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0.7" />'+  // > Initialization.svg:5
      '  </radialGradient>'+  // > Initialization.svg:6
      '</defs></svg>';  // > Initialization.svg:7
    container.innerHTML = svggradient;  // > Initialization.svg:8
    document.body.appendChild(container);  // > Initialization.svg:9
    //"url(#mygrandient)"  // > Initialization.svg:10
    var container = document.createElement('div');  // > Initialization.svg:11
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svg:12
      '  <radialGradient id="mygrandient1" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">'+  // > Initialization.svg:13
      '    <stop offset="0%" style="stop-color:rgb(255,255,255); stop-opacity:1" />'+  // > Initialization.svg:14
      '    <stop offset="100%" style="stop-color:rgb(200,200,200);stop-opacity:0.1" />'+  // > Initialization.svg:15
      '  </radialGradient>'+  // > Initialization.svg:16
      '</defs></svg>';  // > Initialization.svg:17
    container.innerHTML = svggradient;  // > Initialization.svg:18
    document.body.appendChild(container);  // > Initialization.svg:19
    //"url(#mygrandient1)"  // > Initialization.svg:20
    var container = document.createElement('div');  // > Initialization.svg:21
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svg:22
      '  <radialGradient id="mygrandient2" cx="50%" cy="50%" r="90%" fx="90%" fy="10%">'+  // > Initialization.svg:23
      '    <stop offset="0%" style="stop-color:rgb(255,255,255); stop-opacity:0.5" />'+  // > Initialization.svg:24
      '    <stop offset="100%" style="stop-color:rgb(0,255,255);stop-opacity:0.5" />'+  // > Initialization.svg:25
      '  </radialGradient>'+  // > Initialization.svg:26
      '</defs></svg>';  // > Initialization.svg:27
    container.innerHTML = svggradient;  // > Initialization.svg:28
    document.body.appendChild(container);  // > Initialization.svg:29
    //"url(#mygrandient2)"  // > Initialization.svg:30
    var container = document.createElement('div');  // > Initialization.svg:31
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svg:32
      '  <radialGradient id="mygrandient3" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">'+  // > Initialization.svg:33
      '    <stop offset="0%" style="stop-color:rgb(0,0,0); stop-opacity:0.5" />'+  // > Initialization.svg:34
      '    <stop offset="100%" style="stop-color:rgb(200,200,200);stop-opacity:0.1" />'+  // > Initialization.svg:35
      '  </radialGradient>'+  // > Initialization.svg:36
      '</defs></svg>';  // > Initialization.svg:37
    container.innerHTML = svggradient;  // > Initialization.svg:38
    document.body.appendChild(container);  // > Initialization.svg:39
    //"url(#mygrandient3)"  // > Initialization.svg:40
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["axes"]) return;
    _view.plottingPanelxvst.getAxisX().setPosition([0,0.047]);  // > Initialization.axes:1
    //_view.plottingPanelxvst.getTitleX().setPosition([0.95,0.1]);  // > Initialization.axes:2
    _view.plottingPanelxvst.getAxisY().setPosition([0.045,0]);  // > Initialization.axes:3
    //_view.plottingPanelxvst.getTitleY().setPosition([0.1,0.9]);  // > Initialization.axes:4
    _view.plottingPanelxvst2.getAxisX().setPosition([0,0.047]);  // > Initialization.axes:5
    //_view.plottingPanelxvst2.getTitleX().setPosition([0.95,0.1]);  // > Initialization.axes:6
    _view.plottingPanelxvst2.getAxisY().setPosition([0.045,0]);  // > Initialization.axes:7
    //_view.plottingPanelxvst2.getTitleY().setPosition([0.1,0.9]);  // > Initialization.axes:8
    _view.plottingPanelxvst0.getAxisX().setPosition([0,0.047]);  // > Initialization.axes:9
    //_view.plottingPanelxvst0.getTitleX().setPosition([0.95,0.1]);  // > Initialization.axes:10
    _view.plottingPanelxvst0.getAxisY().setPosition([0.045,0]);  // > Initialization.axes:11
    //_view.plottingPanelxvst0.getTitleY().setPosition([0.1,0.9]);  // > Initialization.axes:12
    _view.plottingPanelxvst3.getAxisX().setPosition([0,0.047]);  // > Initialization.axes:13
    //_view.plottingPanelxvst3.getTitleX().setPosition([0.95,0.1]);  // > Initialization.axes:14
    _view.plottingPanelxvst3.getAxisY().setPosition([0.045,0]);  // > Initialization.axes:15
    //_view.plottingPanelxvst3.getTitleY().setPosition([0.1,0.9]);  // > Initialization.axes:16
    //console.log(_view)  // > Initialization.axes:17
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["meesage"]) return;
    if (scene1firsttime == true) {  // > Initialization.meesage:1
      _tools.showOkDialog("Investigating factors that affect the rate of photosynthesis", function() {  // > Initialization.meesage:2
        // This function will be called when the user clicks "OK" on the first dialog  // > Initialization.meesage:3
       //displaydistance = "none"  // > Initialization.meesage:4
       displaycarbondioxide = "none"  // > Initialization.meesage:5
       displaytemperature = "none" // to address request to only show one plottingpanel  // > Initialization.meesage:6
         // > Initialization.meesage:7
        _tools.showOkDialog("Introduction: <br/><br/>Photosynthesis is an essential process in plants. <br/><br/>In this virtual lab, you will investigate how light intensity, carbon dioxide concentration and temperature affects the rate of photosynthesis of an aquatic plant.", function() {  // > Initialization.meesage:8
          // This function will be called when the user clicks "OK" on the second dialog  // > Initialization.meesage:9
          _tools.showOkDialog("The experimental setup you will be using as shown below. <br/><br/> Click on 'Description Text with ☒'  after reading them to close them. ", function() {  // > Initialization.meesage:10
          // This function will be called when the user clicks "OK" on the third dialog  // > Initialization.meesage:11
          scene11 = true;  // > Initialization.meesage:12
          scene12 = true;  // > Initialization.meesage:13
          scene13 = true;  // > Initialization.meesage:14
        //  enableBlinking("scene1popupsolution"); // text1 is the name of the element to blink  // > Initialization.meesage:15
        //  enableBlinking("scene1popupthermometer2");   // > Initialization.meesage:16
         // enableBlinking("scene1popupruler");   // > Initialization.meesage:17
          scene1firsttime = false;  // > Initialization.meesage:18
          //function ryan for blinking  // > Initialization.meesage:19
         // toggleFont()  // > Initialization.meesage:20
          _update(); // to force update view  // > Initialization.meesage:21
            // > Initialization.meesage:22
           // > Initialization.meesage:23
            // > Initialization.meesage:24
        } );  // > Initialization.meesage:25
         formatDialogOK ()  // > Initialization.meesage:26
      } );  // > Initialization.meesage:27
        formatDialogOK ()  // > Initialization.meesage:28
      } );  // > Initialization.meesage:29
      formatDialogOK ()  // > Initialization.meesage:30
    }  // > Initialization.meesage:31
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["fontchanginginfinite"]) return;
    var a = document.getElementById("plottingPanel");  // > Initialization.fontchanginginfinite:1
    setTimeout(function() {  // > Initialization.fontchanginginfinite:2
      alert("code running")  // > Initialization.fontchanginginfinite:3
      console.info(a)  // > Initialization.fontchanginginfinite:4
      const textSolution = a.getElementById("solution1");  // > Initialization.fontchanginginfinite:5
      console.info(textSolution)  // > Initialization.fontchanginginfinite:6
      const animate = textSolution.createElementNS("http://www.w3.org/2000/svg", "animate");  // > Initialization.fontchanginginfinite:7
      animate.setAttribute("attributeName","opacity");  // > Initialization.fontchanginginfinite:8
      animate.setAttribute("values","0;1;0");  // > Initialization.fontchanginginfinite:9
      animate.setAttribute("dur","3s");  // > Initialization.fontchanginginfinite:10
      animate.setAttribute("repeatCount","indefinite");  // > Initialization.fontchanginginfinite:11
      //textSolution.setAttribute("animation", "blink 1s step-start infinite");  // > Initialization.fontchanginginfinite:12
    } ,3000 );  // > Initialization.fontchanginginfinite:13
  });

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["AnimateBlinking"]) return;
    /*  // > Evolution.AnimateBlinking:1
    if(!isCheckingTextBlink){  // > Evolution.AnimateBlinking:2
      font2 = "normal normal 1vw";  // > Evolution.AnimateBlinking:3
      tTextBlink = blinkInterval;  // > Evolution.AnimateBlinking:4
      return;  // > Evolution.AnimateBlinking:5
    }  // > Evolution.AnimateBlinking:6
    */    // > Evolution.AnimateBlinking:7
    if(tTextBlink >0&& tTextBlink<1){  // > Evolution.AnimateBlinking:8
      font2 = "normal normal 1vw"   // > Evolution.AnimateBlinking:9
        // > Evolution.AnimateBlinking:10
    }  // > Evolution.AnimateBlinking:11
    else if (tTextBlink >1&& tTextBlink<2){  // > Evolution.AnimateBlinking:12
      font2 = "normal normal 0vw"   // > Evolution.AnimateBlinking:13
      }  // > Evolution.AnimateBlinking:14
    tTextBlink = (tTextBlink + dtTextBlink)%2;  // > Evolution.AnimateBlinking:15
    //console.log(_view)  // > Evolution.AnimateBlinking:16
    //console.log("spd =", _view.spd.getValue())  // > Evolution.AnimateBlinking:17
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["distancebubble"]) return;
    //distancedata = 10*distance/50  // > FixedRelations.distancebubble:1
    if (expt==0) {  // > FixedRelations.distancebubble:2
      //console.log("expt 0")  // > FixedRelations.distancebubble:3
      // 1 for intensity expt  // > FixedRelations.distancebubble:4
      for (var i=0; i<n  ; i++) {  // > FixedRelations.distancebubble:5
        //if (r[i]-0.2*poisson(20)/20>=0) {   //determine bubble radius size  // > FixedRelations.distancebubble:6
        if (r[i]-0.2*1>=0) {   //determine bubble radius size  // > FixedRelations.distancebubble:7
            // > FixedRelations.distancebubble:8
          dr[i]=0; //stop growing this bubble  // > FixedRelations.distancebubble:9
            // > FixedRelations.distancebubble:10
          //dy[i]=3*poisson(10)/10; // start moving up  // > FixedRelations.distancebubble:11
          dy[i]=3*1; // start moving up  // > FixedRelations.distancebubble:12
          count[i] = 1; // count when bubble starts to move up.  // > FixedRelations.distancebubble:13
          // delay depend on intensity  // > FixedRelations.distancebubble:14
          //start next bubble growing  // > FixedRelations.distancebubble:15
          if (distance==10) {  // > FixedRelations.distancebubble:16
            var coeffatdistance10 = 22.55  // > FixedRelations.distancebubble:17
            dr[i+1] = drdistance1  // > FixedRelations.distancebubble:18
          }  // > FixedRelations.distancebubble:19
          else if (distance==20) {  // > FixedRelations.distancebubble:20
            var coeffatdistance20 = 28 // 30 achieve 20 bubbles,  // > FixedRelations.distancebubble:21
            dr[i+1] = drdistance2  // > FixedRelations.distancebubble:22
          }  // > FixedRelations.distancebubble:23
          else if (distance==30) {  // > FixedRelations.distancebubble:24
            var coeffatdistance30 = 42  // 45 gets 11 bubbles  // > FixedRelations.distancebubble:25
            dr[i+1] = drdistance3  // > FixedRelations.distancebubble:26
          }  // > FixedRelations.distancebubble:27
          else if (distance==40) {  // > FixedRelations.distancebubble:28
            var coeffatdistance40 = 80 // 85 gives  8 bubbles  // > FixedRelations.distancebubble:29
            dr[i+1] = drdistance4  // > FixedRelations.distancebubble:30
          }  // > FixedRelations.distancebubble:31
          else if (distance==50) {  // > FixedRelations.distancebubble:32
            var coeffatdistance50 = 50 // 28 gives 4 bubbles vary this to fit real data given of 6 bubbles  // > FixedRelations.distancebubble:33
            dr[i+1] = drdistance5  // > FixedRelations.distancebubble:34
          }  // > FixedRelations.distancebubble:35
            // > FixedRelations.distancebubble:36
            // > FixedRelations.distancebubble:37
            // > FixedRelations.distancebubble:38
            // > FixedRelations.distancebubble:39
           // > FixedRelations.distancebubble:40
            // > FixedRelations.distancebubble:41
          //generalise equation poisson distribution  // > FixedRelations.distancebubble:42
          //dr[i+1] = 0.05 * poisson(100) / 100 * intensity  // > FixedRelations.distancebubble:43
         // var coeffatintensity100 = 0.00208  // > FixedRelations.distancebubble:44
         // dr[i+1] = coeffatintensity100 * 1 * intensity  // > FixedRelations.distancebubble:45
            // > FixedRelations.distancebubble:46
            // > FixedRelations.distancebubble:47
            // > FixedRelations.distancebubble:48
            // > FixedRelations.distancebubble:49
            // > FixedRelations.distancebubble:50
        }  // > FixedRelations.distancebubble:51
        //if (ybubble[i] - 2.5>0) { //reach surface  // > FixedRelations.distancebubble:52
        if (ybubble[i] - 0.2>0) { //reach surface  // > FixedRelations.distancebubble:53
            // > FixedRelations.distancebubble:54
          dy[i] = 0; // stop move y direction  // > FixedRelations.distancebubble:55
          // explode  // > FixedRelations.distancebubble:56
          bubbleburst[i]=true; //to show the ring of bubble bursting  // > FixedRelations.distancebubble:57
          if (bubbleburstcheck[i]==0) { //original bubbleburstcheck[i] are zero  // > FixedRelations.distancebubble:58
          bubblebursttime[i]=t; // start record time  // > FixedRelations.distancebubble:59
          bubbleburstcheck[i]=1; // will not check burtsting  // > FixedRelations.distancebubble:60
    }  // > FixedRelations.distancebubble:61
     if(t>(bubblebursttime[i]+2*dt)&&bubbleburstcheck[i]==1 ){ //   // > FixedRelations.distancebubble:62
       bubbleburst[i]=false; // set to visible false  // > FixedRelations.distancebubble:63
       }  // > FixedRelations.distancebubble:64
          ybubbleshow[i]=false;  // > FixedRelations.distancebubble:65
        }  // > FixedRelations.distancebubble:66
        if (xbubble[i]>0.35&&ybubble[i]>0.9) {  // > FixedRelations.distancebubble:67
          //rightside  // > FixedRelations.distancebubble:68
          xbubble[i]=0.3;  // > FixedRelations.distancebubble:69
        }  // > FixedRelations.distancebubble:70
        if (xbubble[i]<-0.35&&ybubble[i]>0.9) {  // > FixedRelations.distancebubble:71
          //rightside  // > FixedRelations.distancebubble:72
          xbubble[i]=-0.3;  // > FixedRelations.distancebubble:73
        }  // > FixedRelations.distancebubble:74
      }  // > FixedRelations.distancebubble:75
    } //expt 1  // > FixedRelations.distancebubble:76
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["fontincreasing"]) return;
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["curvefitdistance"]) return;
    // initial values so there is no error in numeric  // > FixedRelations.curvefitdistance:1
    if (distancecubicsplinex[1]!=0&&distancecubicsplinex[2]!=0&&distancecubicsplinex[3]!=0&&distancecubicsplinex[4]!=0&&distancecubicsplinex[5]!=0){  // > FixedRelations.curvefitdistance:2
      var xData = [distancecubicsplinex[1], distancecubicsplinex[2], distancecubicsplinex[3], distancecubicsplinex[4], distancecubicsplinex[5]];  // > FixedRelations.curvefitdistance:3
      var yData = [distancecubicspliney[1], distancecubicspliney[2], distancecubicspliney[3], distancecubicspliney[4], distancecubicspliney[5]];  // > FixedRelations.curvefitdistance:4
      showdistancefitcurve = true  // > FixedRelations.curvefitdistance:5
    }  // > FixedRelations.curvefitdistance:6
    else{  // > FixedRelations.curvefitdistance:7
      var xData = [10, 20, 30, 40, 50];  // > FixedRelations.curvefitdistance:8
      var yData = [60, 20, 9, 8, 3];  // > FixedRelations.curvefitdistance:9
    }  // > FixedRelations.curvefitdistance:10
    var result = fitCurve(xData, yData);  // > FixedRelations.curvefitdistance:11
    //console.log(result.a); // approximately 7883.8  // > FixedRelations.curvefitdistance:12
    //console.log(result.b); // approximately 9.7333  // > FixedRelations.curvefitdistance:13
    //for distance fitcurve  // > FixedRelations.curvefitdistance:14
    FittedParametersa = result.a; // returns approximately [70.3859, -0.0927]  // > FixedRelations.curvefitdistance:15
    FittedParametersb = result.b;  // > FixedRelations.curvefitdistance:16
    //FittedParametersa = fitCurve(xData, yData); // returns approximately 7998.325  // > FixedRelations.curvefitdistance:17
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["resize view"]) return;
    if ( scene1firsttime==false&&scene11 == false){  // > FixedRelations.resize view:1
      xmin = -8  // > FixedRelations.resize view:2
     //alert()  // > FixedRelations.resize view:3
        // > FixedRelations.resize view:4
      }  // > FixedRelations.resize view:5
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["endofexpt"]) return;
    if (distancecubicspliney[1]>0&&distancecubicspliney[2]>0&&distancecubicspliney[3]>0&&distancecubicspliney[4]>0&&distancecubicspliney[5]>0){  // > FixedRelations.endofexpt:1
      endofexpt0 = true;  // > FixedRelations.endofexpt:2
      }  // > FixedRelations.endofexpt:3
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["intensitybubble 2"]) return;
    //distancedata = 10*distance/50  // > FixedRelations.intensitybubble 2:1
    if (expt==1) {  // > FixedRelations.intensitybubble 2:2
      // 1 for intensity expt  // > FixedRelations.intensitybubble 2:3
      for (var i=0; i<n  ; i++) {  // > FixedRelations.intensitybubble 2:4
        //if (r[i]-0.2*poisson(20)/20>=0) {   //determine bubble radius size  // > FixedRelations.intensitybubble 2:5
        if (r[i]-0.2*1>=0) {   //determine bubble radius size  // > FixedRelations.intensitybubble 2:6
            // > FixedRelations.intensitybubble 2:7
          dr[i]=0; //stop growing this bubble  // > FixedRelations.intensitybubble 2:8
            // > FixedRelations.intensitybubble 2:9
          //dy[i]=3*poisson(10)/10; // start moving up  // > FixedRelations.intensitybubble 2:10
          dy[i]=3*1; // start moving up  // > FixedRelations.intensitybubble 2:11
          count[i] = 1; // count when bubble starts to move up.  // > FixedRelations.intensitybubble 2:12
          // delay depend on intensity  // > FixedRelations.intensitybubble 2:13
          //start next bubble growing  // > FixedRelations.intensitybubble 2:14
            // > FixedRelations.intensitybubble 2:15
          if (intensity==100) {  // > FixedRelations.intensitybubble 2:16
             var coeffatintensity100 = 0.00208  // > FixedRelations.intensitybubble 2:17
          dr[i+1] = coeffatintensity100 * 1 * intensity  // > FixedRelations.intensitybubble 2:18
          }  // > FixedRelations.intensitybubble 2:19
          else if (intensity==25) {  // > FixedRelations.intensitybubble 2:20
             var coeffatintensity100 = 0.00208  // > FixedRelations.intensitybubble 2:21
          dr[i+1] = 1.25*coeffatintensity100 * 1 * intensity  // > FixedRelations.intensitybubble 2:22
          }  // > FixedRelations.intensitybubble 2:23
          else if (intensity==11) {  // > FixedRelations.intensitybubble 2:24
            var coeffatintensity100 = 0.00208  // > FixedRelations.intensitybubble 2:25
          dr[i+1] = 1.2*coeffatintensity100 * 1 * intensity  // > FixedRelations.intensitybubble 2:26
          }  // > FixedRelations.intensitybubble 2:27
          else if (intensity==6) {  // > FixedRelations.intensitybubble 2:28
             var coeffatintensity100 = 0.00208  // > FixedRelations.intensitybubble 2:29
          dr[i+1] = 1.25*coeffatintensity100 * 1 * intensity  // > FixedRelations.intensitybubble 2:30
          }  // > FixedRelations.intensitybubble 2:31
          else if (intensity==4) {  // > FixedRelations.intensitybubble 2:32
             var coeffatintensity100 = 0.00208  // > FixedRelations.intensitybubble 2:33
          dr[i+1] = 1.2*coeffatintensity100 * 1 * intensity  // > FixedRelations.intensitybubble 2:34
          }  // > FixedRelations.intensitybubble 2:35
           // > FixedRelations.intensitybubble 2:36
            // > FixedRelations.intensitybubble 2:37
          //generalise equation poisson distribution  // > FixedRelations.intensitybubble 2:38
          //dr[i+1] = 0.05 * poisson(100) / 100 * intensity  // > FixedRelations.intensitybubble 2:39
         // var coeffatintensity100 = 0.00208  // > FixedRelations.intensitybubble 2:40
         // dr[i+1] = coeffatintensity100 * 1 * intensity  // > FixedRelations.intensitybubble 2:41
            // > FixedRelations.intensitybubble 2:42
            // > FixedRelations.intensitybubble 2:43
            // > FixedRelations.intensitybubble 2:44
            // > FixedRelations.intensitybubble 2:45
            // > FixedRelations.intensitybubble 2:46
        }  // > FixedRelations.intensitybubble 2:47
        //if (ybubble[i] - 2.5>0) { //reach surface  // > FixedRelations.intensitybubble 2:48
        if (ybubble[i] - 0.2>0) { //reach surface  // > FixedRelations.intensitybubble 2:49
            // > FixedRelations.intensitybubble 2:50
          dy[i] = 0; // stop move y direction  // > FixedRelations.intensitybubble 2:51
          // explode  // > FixedRelations.intensitybubble 2:52
          bubbleburst[i]=true; //to show the ring of bubble bursting  // > FixedRelations.intensitybubble 2:53
          if (bubbleburstcheck[i]==0) { //original bubbleburstcheck[i] are zero  // > FixedRelations.intensitybubble 2:54
          bubblebursttime[i]=t; // start record time  // > FixedRelations.intensitybubble 2:55
          bubbleburstcheck[i]=1; // will not check burtsting  // > FixedRelations.intensitybubble 2:56
    }  // > FixedRelations.intensitybubble 2:57
     if(t>(bubblebursttime[i]+2*dt)&&bubbleburstcheck[i]==1 ){ //   // > FixedRelations.intensitybubble 2:58
       bubbleburst[i]=false; // set to visible false  // > FixedRelations.intensitybubble 2:59
       }  // > FixedRelations.intensitybubble 2:60
          ybubbleshow[i]=false;  // > FixedRelations.intensitybubble 2:61
        }  // > FixedRelations.intensitybubble 2:62
        if (xbubble[i]>0.35&&ybubble[i]>0.9) {  // > FixedRelations.intensitybubble 2:63
          //rightside  // > FixedRelations.intensitybubble 2:64
          xbubble[i]=0.3;  // > FixedRelations.intensitybubble 2:65
        }  // > FixedRelations.intensitybubble 2:66
        if (xbubble[i]<-0.35&&ybubble[i]>0.9) {  // > FixedRelations.intensitybubble 2:67
          //rightside  // > FixedRelations.intensitybubble 2:68
          xbubble[i]=-0.3;  // > FixedRelations.intensitybubble 2:69
        }  // > FixedRelations.intensitybubble 2:70
      }  // > FixedRelations.intensitybubble 2:71
    } //expt 1  // > FixedRelations.intensitybubble 2:72
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["co2bubble"]) return;
    if (expt==2) {  // > FixedRelations.co2bubble:1
      //console.log("spliney2="+spliney2)  // > FixedRelations.co2bubble:2
      //console.log("splinex2="+splinex2)  // > FixedRelations.co2bubble:3
      //console.log("ybubble=", ybubble)  // > FixedRelations.co2bubble:4
      for (var i=0; i<n /* Iterations */ ; i++) {  // > FixedRelations.co2bubble:5
        if (r[i]-0.2>=0) {  // > FixedRelations.co2bubble:6
          //stop growing this bubble  // > FixedRelations.co2bubble:7
          dr[i]=0;  // > FixedRelations.co2bubble:8
          // start moving up  // > FixedRelations.co2bubble:9
          dy[i]=3;  // > FixedRelations.co2bubble:10
          count[i] = 1;  // > FixedRelations.co2bubble:11
          // delay depend on intensity  // > FixedRelations.co2bubble:12
          var constant = 0.59405 // 0.5940 produce 34 bubbles, 0.5941 produce 36 bubbles  // > FixedRelations.co2bubble:13
          //start next bubble growing  // > FixedRelations.co2bubble:14
          if (carbondioxide==0.2) {  // > FixedRelations.co2bubble:15
            var constant = 0.59405 // 0.5940 produce 34 bubbles, 0.5941 produce 36 bubbles  // > FixedRelations.co2bubble:16
            //dr[i+1]=constant*carbondioxide; // intensity=1, sumcount=15 calibrated  // > FixedRelations.co2bubble:17
            //dr[i+1] = 0.11881 //33  // > FixedRelations.co2bubble:18
            //dr[i+1] = 0.118811 //34  // > FixedRelations.co2bubble:19
            //dr[i+1] = 0.1188111 //34  // > FixedRelations.co2bubble:20
            //dr[i+1] = 0.1188115 //34  // > FixedRelations.co2bubble:21
            //dr[i+1] = drcarbondioxide1 //34  // > FixedRelations.co2bubble:22
            //dr[i+1] = 0.118812 //36  // > FixedRelations.co2bubble:23
            //dr[i+1] = 0.118815 //36  // > FixedRelations.co2bubble:24
            //dr[i+1] = 0.11882 //36  // > FixedRelations.co2bubble:25
            //dr[i+1] = 0.11883 //36  // > FixedRelations.co2bubble:26
            //dr[i+1] = 0.11885 //36  // > FixedRelations.co2bubble:27
            //alert();  // > FixedRelations.co2bubble:28
            dr[i+1] = drcarbondioxide1  // > FixedRelations.co2bubble:29
          }  // > FixedRelations.co2bubble:30
          else if (carbondioxide==0.4) {  // > FixedRelations.co2bubble:31
            var constant = 0.42 // 0.42 produce 46 bubbles  // > FixedRelations.co2bubble:32
            //dr[i+1]=constant*carbondioxide; // intensity=2, sumcount=30 calibrated  // > FixedRelations.co2bubble:33
            dr[i+1] = drcarbondioxide2  // > FixedRelations.co2bubble:34
          }  // > FixedRelations.co2bubble:35
          else if (carbondioxide==0.6) {  // > FixedRelations.co2bubble:36
            var constant = 0.32 // 0.32 produce 55 bubbles,  // > FixedRelations.co2bubble:37
            //dr[i+1]=constant*carbondioxide; // intensity=1, sumcount=15 calibrated  // > FixedRelations.co2bubble:38
            dr[i+1] = drcarbondioxide3  // > FixedRelations.co2bubble:39
          }  // > FixedRelations.co2bubble:40
          else if (carbondioxide==0.8) {  // > FixedRelations.co2bubble:41
            var constant = 0.2542405 // 0.254240 produce 55 bubbles, 0.254242 produce 60 bubbles  // > FixedRelations.co2bubble:42
            //dr[i+1]=constant*carbondioxide; // intensity=1, sumcount=50 calibrated  // > FixedRelations.co2bubble:43
            dr[i+1] = drcarbondioxide4  // > FixedRelations.co2bubble:44
          }  // > FixedRelations.co2bubble:45
          else if (carbondioxide==1.0) {  // > FixedRelations.co2bubble:46
            var constant = 0.22 // 0.5940 produce 34 bubbles, 0.5941 produce 36 bubbles  // > FixedRelations.co2bubble:47
            //dr[i+1]=constant*carbondioxide; // intensity=1, sumcount=50 calibrated  // > FixedRelations.co2bubble:48
            dr[i+1] = drcarbondioxide5  // > FixedRelations.co2bubble:49
          }  // > FixedRelations.co2bubble:50
          //else if (carbondioxide==0.3) {  // > FixedRelations.co2bubble:51
            //dr[i+1]=0.029*carbondioxide*16; // intensity=1, sumcount=50 calibrated  // > FixedRelations.co2bubble:52
            //  // > FixedRelations.co2bubble:53
          }  // > FixedRelations.co2bubble:54
            // > FixedRelations.co2bubble:55
          //if (ybubble[i] - 2.5>0) {  // > FixedRelations.co2bubble:56
          if (ybubble[i] - 0.2>0) {  // > FixedRelations.co2bubble:57
            // stop  // > FixedRelations.co2bubble:58
            dy[i] = 0;  // > FixedRelations.co2bubble:59
            // explode  // > FixedRelations.co2bubble:60
            ybubbleshow[i]=false;  // > FixedRelations.co2bubble:61
          }  // > FixedRelations.co2bubble:62
          if (xbubble[i]>0.35&&ybubble[i]>0.9) {  // > FixedRelations.co2bubble:63
            //rightside  // > FixedRelations.co2bubble:64
            xbubble[i]=0.3;  // > FixedRelations.co2bubble:65
          }  // > FixedRelations.co2bubble:66
          if (xbubble[i]<-0.35&&ybubble[i]>0.9) {  // > FixedRelations.co2bubble:67
            //rightside  // > FixedRelations.co2bubble:68
            xbubble[i]=-0.3;  // > FixedRelations.co2bubble:69
          }  // > FixedRelations.co2bubble:70
        }  // > FixedRelations.co2bubble:71
    }  // > FixedRelations.co2bubble:72
      //}   // > FixedRelations.co2bubble:73
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["temperature"]) return;
    if (expt==3) {  // > FixedRelations.temperature:1
      //console.log("spliney3=", spliney3)  // > FixedRelations.temperature:2
      //console.log("splinxy3=", splinex3)  // > FixedRelations.temperature:3
      for (var i=0; i<n /* Iterations */ ; i++) {  // > FixedRelations.temperature:4
        if (r[i]-0.2>=0) {  // > FixedRelations.temperature:5
          //stop growing this bubble  // > FixedRelations.temperature:6
          dr[i]=0;  // > FixedRelations.temperature:7
          // start moving up  // > FixedRelations.temperature:8
          dy[i]=3;  // > FixedRelations.temperature:9
          count[i] = 1;  // > FixedRelations.temperature:10
          // delay depend on intensity  // > FixedRelations.temperature:11
          var constant = 0.59405 // 0.5940 produce 34 bubbles, 0.5941 produce 36 bubbles  // > FixedRelations.temperature:12
          //start next bubble growing  // > FixedRelations.temperature:13
          if (temperature==10) {  // > FixedRelations.temperature:14
            //dr[0] = drtemperature1  // > FixedRelations.temperature:15
            var constant = 0.59405 // 0.5940 produce 34 bubbles, 0.5941 produce 36 bubbles  // > FixedRelations.temperature:16
            dr[i+1] = drtemperature1  // > FixedRelations.temperature:17
          }  // > FixedRelations.temperature:18
          else if (temperature==20) {  // > FixedRelations.temperature:19
            var constant = 0.42 // 0.42 produce 46 bubbles  // > FixedRelations.temperature:20
            //dr[i+1]=constant*carbondioxide; // intensity=2, sumcount=30 calibrated  // > FixedRelations.temperature:21
            dr[i+1] = drtemperature2  // > FixedRelations.temperature:22
          }  // > FixedRelations.temperature:23
          else if (temperature==30) {  // > FixedRelations.temperature:24
            var constant = 0.32 // 0.32 produce 55 bubbles,  // > FixedRelations.temperature:25
            //dr[i+1]=constant*carbondioxide; // intensity=1, sumcount=15 calibrated  // > FixedRelations.temperature:26
            dr[i+1] = drtemperature3  // > FixedRelations.temperature:27
          }  // > FixedRelations.temperature:28
          else if (temperature==40) {  // > FixedRelations.temperature:29
            var constant = 0.24// 0.254240 produce 55 bubbles, 0.254242 produce 60 bubbles  // > FixedRelations.temperature:30
            //dr[i+1]=constant*carbondioxide; // intensity=1, sumcount=50 calibrated  // > FixedRelations.temperature:31
            dr[i+1] = drtemperature4  // > FixedRelations.temperature:32
          }  // > FixedRelations.temperature:33
          else if (temperature==50) {  // > FixedRelations.temperature:34
            var constant = 0.21 // 0.5940 produce 34 bubbles, 0.5941 produce 36 bubbles  // > FixedRelations.temperature:35
            //dr[i+1]=constant*carbondioxide; // intensity=1, sumcount=50 calibrated  // > FixedRelations.temperature:36
            dr[i+1] = drtemperature5  // > FixedRelations.temperature:37
          }  // > FixedRelations.temperature:38
          //else if (carbondioxide==0.3) {  // > FixedRelations.temperature:39
            //dr[i+1]=0.029*carbondioxide*16; // intensity=1, sumcount=50 calibrated  // > FixedRelations.temperature:40
            //  // > FixedRelations.temperature:41
          }  // > FixedRelations.temperature:42
          //if (ybubble[i] - 2.5>0) {  // > FixedRelations.temperature:43
          if (ybubble[i] - 0.2>0) {  // > FixedRelations.temperature:44
            // stop  // > FixedRelations.temperature:45
            dy[i] = 0;  // > FixedRelations.temperature:46
            // explode  // > FixedRelations.temperature:47
            ybubbleshow[i]=false;  // > FixedRelations.temperature:48
          }  // > FixedRelations.temperature:49
          if (xbubble[i]>0.35&&ybubble[i]>0.9) {  // > FixedRelations.temperature:50
            //rightside  // > FixedRelations.temperature:51
            xbubble[i]=0.3;  // > FixedRelations.temperature:52
          }  // > FixedRelations.temperature:53
          if (xbubble[i]<-0.35&&ybubble[i]>0.9) {  // > FixedRelations.temperature:54
            //rightside  // > FixedRelations.temperature:55
            xbubble[i]=-0.3;  // > FixedRelations.temperature:56
          }  // > FixedRelations.temperature:57
        }      // > FixedRelations.temperature:58
    }  // > FixedRelations.temperature:59
      //}   // > FixedRelations.temperature:60
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["numericsJSSpline"]) return;
    //var data = ([0,2,3,4,5],[1,2,1,3,2]).at(numeric.linspace(1,5,10))   // > FixedRelations.numericsJSSpline:1
    /*  // > FixedRelations.numericsJSSpline:2
    https://ccc-js.github.io/numeric2/documentation.html  // > FixedRelations.numericsJSSpline:3
    Cubic splines  // > FixedRelations.numericsJSSpline:4
    You can do some (natural) cubic spline interpolation:  // > FixedRelations.numericsJSSpline:5
    IN> numeric.spline([1,2,3,4,5],[1,2,1,3,2]).at(numeric.linspace(1,5,10))  // > FixedRelations.numericsJSSpline:6
    OUT> [ 1, 1.731, 2.039, 1.604, 1.019, 1.294, 2.364, 3.085, 2.82, 2]  // > FixedRelations.numericsJSSpline:7
    */  // > FixedRelations.numericsJSSpline:8
    var answer0 = numeric.spline([distancecubicsplinex[1],distancecubicsplinex[2],distancecubicsplinex[3],distancecubicsplinex[4],distancecubicsplinex[5]],[distancecubicspliney[1],distancecubicspliney[2],distancecubicspliney[3],distancecubicspliney[4],distancecubicspliney[5]]).at(numeric.linspace(10,50,100))  // > FixedRelations.numericsJSSpline:9
    splinex0 = numeric.linspace(distancecubicsplinex[1],distancecubicsplinex[5],100)  // > FixedRelations.numericsJSSpline:10
    //var answer0 = numeric.spline([distancecubicsplinex[0],distancecubicsplinex[1],distancecubicsplinex[2],distancecubicsplinex[3],distancecubicsplinex[4],distancecubicsplinex[5]],[distancecubicspliney[0],distancecubicspliney[1],distancecubicspliney[2],distancecubicspliney[3],distancecubicspliney[4],distancecubicspliney[5]]).at(numeric.linspace(0,50,100))  // > FixedRelations.numericsJSSpline:11
    //splinex0 = numeric.linspace(distancecubicsplinex[0],distancecubicsplinex[5],100)  // > FixedRelations.numericsJSSpline:12
    spliney0 = answer0  // > FixedRelations.numericsJSSpline:13
    //datatable = [[10,0],[20,0],[30,0],[40,0],[50,0]]  // > FixedRelations.numericsJSSpline:14
      datatable[0][1] = distancecubicspliney[1]  // > FixedRelations.numericsJSSpline:15
      datatable[1][1] = distancecubicspliney[2]  // > FixedRelations.numericsJSSpline:16
      datatable[2][1] = distancecubicspliney[3]  // > FixedRelations.numericsJSSpline:17
      datatable[3][1] = distancecubicspliney[4]  // > FixedRelations.numericsJSSpline:18
      datatable[4][1] = distancecubicspliney[5]  // > FixedRelations.numericsJSSpline:19
        // > FixedRelations.numericsJSSpline:20
        // > FixedRelations.numericsJSSpline:21
    var answer = numeric.spline([intensitycubicsplinex[0],intensitycubicsplinex[1],intensitycubicsplinex[2],intensitycubicsplinex[3],intensitycubicsplinex[4],intensitycubicsplinex[5],intensitycubicsplinex[6]],[intensitycubicspliney[0],intensitycubicspliney[1],intensitycubicspliney[2],intensitycubicspliney[3],intensitycubicspliney[4],intensitycubicspliney[5],intensitycubicspliney[6]]).at(numeric.linspace(0,6,24))  // > FixedRelations.numericsJSSpline:22
    //var answer = numeric.spline([masterListsort[0].key,masterListsort[1].key,masterListsort[2].key,masterListsort[3].key,masterListsort[4].key,masterListsort[5].key,masterListsort[6].key],[masterListsort[0].val,masterListsort[1].val,masterListsort[2].val,masterListsort[3].val,masterListsort[4].val,masterListsort[5].val,masterListsort[6].val]).at(numeric.linspace(0,6,24))  // > FixedRelations.numericsJSSpline:23
    //var answer = numeric.spline([intensitydata[1],intensitydata[2],intensitydata[3],intensitydata[4],intensitydata[5],intensitydata[6],intensitydata[7]],[sumcountdata[1],sumcountdata[2],sumcountdata[3],sumcountdata[4],sumcountdata[5],sumcountdata[6],sumcountdata[7]]).at(numeric.linspace(0,6,24))  // > FixedRelations.numericsJSSpline:24
    splinex = numeric.linspace(0,6,24)  // > FixedRelations.numericsJSSpline:25
    spliney = answer  // > FixedRelations.numericsJSSpline:26
    //var answer2 = numeric.spline([carbondioxidecubicsplinex[1],carbondioxidecubicsplinex[2],carbondioxidecubicsplinex[3],carbondioxidecubicsplinex[4],carbondioxidecubicsplinex[5]],[carbondioxidecubicspliney[1],carbondioxidecubicspliney[2],carbondioxidecubicspliney[3],carbondioxidecubicspliney[4],carbondioxidecubicspliney[5]]).at(numeric.linspace(0.2,1.0,24))  // > FixedRelations.numericsJSSpline:27
    var answer2 = numeric.spline([carbondioxidecubicsplinex[0],carbondioxidecubicsplinex[1],carbondioxidecubicsplinex[2],carbondioxidecubicsplinex[3],carbondioxidecubicsplinex[4],carbondioxidecubicsplinex[5]],[carbondioxidecubicspliney[0],carbondioxidecubicspliney[1],carbondioxidecubicspliney[2],carbondioxidecubicspliney[3],carbondioxidecubicspliney[4],carbondioxidecubicspliney[5]]).at(numeric.linspace(0,1.0,26))  // > FixedRelations.numericsJSSpline:28
    splinex2 = numeric.linspace(0,1.0,26) // change from 24 to 26 for exact spacing of 0.04 so can cut array for 0 to 0.2 - fazli  // > FixedRelations.numericsJSSpline:29
    spliney2 = answer2  // > FixedRelations.numericsJSSpline:30
    //console.log("splinex2:", splinex2, "spliney2:", spliney2)  // > FixedRelations.numericsJSSpline:31
    var answer3 = numeric.spline([temperaturecubicsplinex[0],temperaturecubicsplinex[1],temperaturecubicsplinex[2],temperaturecubicsplinex[3],temperaturecubicsplinex[4],temperaturecubicsplinex[5]],[temperaturecubicspliney[0],temperaturecubicspliney[1],temperaturecubicspliney[2],temperaturecubicspliney[3],temperaturecubicspliney[4],temperaturecubicspliney[5]]).at(numeric.linspace(0,50,101))  // > FixedRelations.numericsJSSpline:32
    splinex3 = numeric.linspace(0,50,101) // change from 100 to 101 for exact spacing of 0.5 so can cut array for 0 to 20 - fazli  // > FixedRelations.numericsJSSpline:33
    spliney3 = answer3  // > FixedRelations.numericsJSSpline:34
    //console.log("splinex3:", splinex3, "spliney3:", spliney3)  // > FixedRelations.numericsJSSpline:35
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["co2bubblerandom"]) return;
    else if (expt == 2) {  // > FixedRelations.co2bubblerandom:1
      for (var i = n; i < ntotal /* Iterations */; i++) {  // > FixedRelations.co2bubblerandom:2
        if (r[i] - 0.2 >= 0) {  // > FixedRelations.co2bubblerandom:3
          //stop growing this bubble  // > FixedRelations.co2bubblerandom:4
          dr[i] = 0;  // > FixedRelations.co2bubblerandom:5
          // start moving up  // > FixedRelations.co2bubblerandom:6
          dy[i] = 3;  // > FixedRelations.co2bubblerandom:7
          count[i] = 1;  // > FixedRelations.co2bubblerandom:8
          // delay depend on intensity  // > FixedRelations.co2bubblerandom:9
          //start next bubble growing  // > FixedRelations.co2bubblerandom:10
          if (carbondioxide == 0.05) {  // > FixedRelations.co2bubblerandom:11
            dr[i + 1] = 0.05 * carbondioxide * 16 / 10; // intensity=1, sumcount=15 calibrated  // > FixedRelations.co2bubblerandom:12
            //alert();  // > FixedRelations.co2bubblerandom:13
          }  // > FixedRelations.co2bubblerandom:14
          else if (carbondioxide == 0.1) {  // > FixedRelations.co2bubblerandom:15
            dr[i + 1] = 0.05 * carbondioxide * 16 / 10; // intensity=2, sumcount=30 calibrated  // > FixedRelations.co2bubblerandom:16
          }  // > FixedRelations.co2bubblerandom:17
          else if (carbondioxide == 0.15) {  // > FixedRelations.co2bubblerandom:18
            dr[i + 1] = 0.047 * carbondioxide * 16 / 10; // intensity=1, sumcount=15 calibrated  // > FixedRelations.co2bubblerandom:19
          }  // > FixedRelations.co2bubblerandom:20
          else if (carbondioxide == 0.2) {  // > FixedRelations.co2bubblerandom:21
            dr[i + 1] = 0.04 * carbondioxide * 16 / 10; // intensity=1, sumcount=50 calibrated  // > FixedRelations.co2bubblerandom:22
          }  // > FixedRelations.co2bubblerandom:23
          else if (carbondioxide == 0.25) {  // > FixedRelations.co2bubblerandom:24
            dr[i + 1] = 0.034 * carbondioxide * 16 / 10; // intensity=1, sumcount=50 calibrated  // > FixedRelations.co2bubblerandom:25
          }  // > FixedRelations.co2bubblerandom:26
          else if (carbondioxide == 0.3) {  // > FixedRelations.co2bubblerandom:27
            dr[i + 1] = 0.029 * carbondioxide * 16 / 10; // intensity=1, sumcount=50 calibrated  // > FixedRelations.co2bubblerandom:28
          }  // > FixedRelations.co2bubblerandom:29
        }  // > FixedRelations.co2bubblerandom:30
        if (ybubble[i] - 2.5 > 0) {  // > FixedRelations.co2bubblerandom:31
          // stop  // > FixedRelations.co2bubblerandom:32
          dy[i] = 0;  // > FixedRelations.co2bubblerandom:33
          // explode  // > FixedRelations.co2bubblerandom:34
          ybubbleshow[i] = false;  // > FixedRelations.co2bubblerandom:35
        }  // > FixedRelations.co2bubblerandom:36
        if (xbubble[i] > 0.35 && ybubble[i] > 0.9) { //rightside  // > FixedRelations.co2bubblerandom:37
          xbubble[i] = 0.3;  // > FixedRelations.co2bubblerandom:38
        }  // > FixedRelations.co2bubblerandom:39
        if (xbubble[i] < -0.35 && ybubble[i] > 0.9) { //rightside  // > FixedRelations.co2bubblerandom:40
          xbubble[i] = -0.3;  // > FixedRelations.co2bubblerandom:41
        }  // > FixedRelations.co2bubblerandom:42
      }  // > FixedRelations.co2bubblerandom:43
    } //expt 1  // > FixedRelations.co2bubblerandom:44
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["sumcount"]) return;
    sumcount  = 0;  // > FixedRelations.sumcount:1
    for (var i=0; i<n /* Iterations */ ; i++) {  // > FixedRelations.sumcount:2
      sumcount = sumcount+count[i];  // > FixedRelations.sumcount:3
    }  // > FixedRelations.sumcount:4
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["stop"]) return;
    if (t >= 60) {  // > FixedRelations.stop:1
      _pause();  // > FixedRelations.stop:2
      text = "pause";  // > FixedRelations.stop:3
      _tools.showOkDialog("Data collected after 60 sec, \nat intensity of light=" + intensity + " and \ncarbon dioxide =" + carbondioxide + " %", function () {  // > FixedRelations.stop:4
        store();  // > FixedRelations.stop:5
        _update(); // to force update view  // > FixedRelations.stop:6
      });  // > FixedRelations.stop:7
    // for moodle  // > FixedRelations.stop:8
      let questionPrefixes = ["A", "B"];  // > FixedRelations.stop:9
      let questionNumber = [intensity, Math.round(carbondioxide * 20)];  // > FixedRelations.stop:10
    //expt = 1 or 2 for the 2 expt  // > FixedRelations.stop:11
      questionInstantMark(questionPrefixes[expt - 1] + questionNumber[expt - 1], "Number of bubbles observed: " + sumcount);  // > FixedRelations.stop:12
      //alert(expt-1)  // > FixedRelations.stop:13
    }  // > FixedRelations.stop:14
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["fazli"]) return;
    if (dt==1){  // > FixedRelations.fazli:1
      // slow down bubbles forming and floating up - too fast before this and unable to see clearly  // > FixedRelations.fazli:2
      for (let i=0;i<dy.length;i++){  // > FixedRelations.fazli:3
        dy[i]=dy[i]/5  // > FixedRelations.fazli:4
      }  // > FixedRelations.fazli:5
        // > FixedRelations.fazli:6
      // sumcount was half when speed up compared to when slowed down  // > FixedRelations.fazli:7
      //sumcount = sumcount * 2  // > FixedRelations.fazli:8
    }  // > FixedRelations.fazli:9
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
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;

    var _rLength;
    var _ybubbleLength;

    __odeSelf._getOdeVars = function (){ return["r","ybubble","t"]};

    __odeSelf.setSolverClass = function(__aSolverClass) {
      __solverClass = __aSolverClass;
      __instantiateSolver();
    };

    function __instantiateSolver() {
      __state=[];
      _rLength = r.length;
      _ybubbleLength = ybubble.length;
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
      if (__pagesEnabled["Event"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
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
        for (__j=0,__n=__cIn; __j<_rLength; __j++)
           if (__state[__n++]!=r[__j]) { __mustReinitialize = true; break; }
        for (__j=0;__j<_rLength; __j++) {
          __state[__cIn++] = r[__j];
        }
      if (!__mustReinitialize)
        for (__j=0,__n=__cIn; __j<_ybubbleLength; __j++)
           if (__state[__n++]!=ybubble[__j]) { __mustReinitialize = true; break; }
        for (__j=0;__j<_ybubbleLength; __j++) {
          __state[__cIn++] = ybubble[__j];
        }
        if (__state[__cIn]!=t) __mustReinitialize = true;
        __state[__cIn++] = t;
    }

    function __arraysChanged () {
      if (_rLength != r.length) return true;
      if (_ybubbleLength != ybubble.length) return true;
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
        for (__i=0;__i<_rLength; __i++) {
          r[__i] = __state[__cOut++];
        }
        for (__i=0;__i<_ybubbleLength; __i++) {
          ybubble[__i] = __state[__cOut++];
        }
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
        var r = [];
        for (__i=0;__i<_rLength; __i++) {
          r[__i] = _aState[__cOut++];
        }
        var ybubble = [];
        for (__i=0;__i<_ybubbleLength; __i++) {
          ybubble[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
      // Preliminary code: Code to be executed before rate equations are evaluated
        //x = poisson(100)/100;  // > Preliminary code for ODE.Evol Page:1
        //x = Math.random()-0.5;  // > Preliminary code for ODE.Evol Page:2
      // Compute the rate
        var __cRate=0;
        for (__i=0;__i<_rLength;__i++) {
          _aRate[__cRate++] = Array.isArray(dr[__i]) ? dr[__i][__i] : dr[__i]; // Rate for ODE: Evol Page:r
        }
        for (__i=0;__i<_ybubbleLength;__i++) {
          _aRate[__cRate++] = Array.isArray(dy[__i]) ? dy[__i][__i] : dy[__i]; // Rate for ODE: Evol Page:ybubble
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
        var r = [];
        for (__i=0;__i<_rLength; __i++) {
          r[__i] = _aState[__cOut++];
        }
        var ybubble = [];
        for (__i=0;__i<_ybubbleLength; __i++) {
          ybubble[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_rLength; __i++) {
          r[__i] = __state[__cOut++];
        }
        for (__i=0;__i<_ybubbleLength; __i++) {
          ybubble[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_rLength; __j++) {
          __state[__cIn++] = r[__j];
        }
        for (__j=0;__j<_ybubbleLength; __j++) {
          __state[__cIn++] = ybubble[__j];
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

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var r = [];
        for (__i=0;__i<_rLength; __i++) {
          r[__i] = _aState[__cOut++];
        }
        var ybubble = [];
        for (__i=0;__i<_ybubbleLength; __i++) {
          ybubble[__i] = _aState[__cOut++];
        }
        var t = _aState[__cOut++];
        return t - 60.0;  // > Event zero-condition for page Evol Page:1
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        for (__i=0;__i<_rLength; __i++) {
          r[__i] = __state[__cOut++];
        }
        for (__i=0;__i<_ybubbleLength; __i++) {
          ybubble[__i] = __state[__cOut++];
        }
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        for (__j=0;__j<_rLength; __j++) {
          __state[__cIn++] = r[__j];
        }
        for (__j=0;__j<_ybubbleLength; __j++) {
          __state[__cIn++] = ybubble[__j];
        }
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
          text = "pause";  // > Event action for page Evol Page:2
          _tools.showOkDialog("Data collected after 60 sec, \nat distance of light=" + distance + " cm , \ncarbon dioxide =" + carbondioxide + " %"+ "\n and temperature ="+ temperature+"⁰C " , function () {  // > Event action for page Evol Page:3
            store();  // > Event action for page Evol Page:4
            _update(); // to force update view  // > Event action for page Evol Page:5
          });  // > Event action for page Evol Page:6
        // for moodle  // > Event action for page Evol Page:7
          let questionPrefixes = ["A", "B"];  // > Event action for page Evol Page:8
          let questionNumber = [intensity, Math.round(carbondioxide * 20)];  // > Event action for page Evol Page:9
        //expt = 1 or 2 for the 2 expt  // > Event action for page Evol Page:10
          questionInstantMark(questionPrefixes[expt - 1] + questionNumber[expt - 1], "Number of bubbles observed: " + sumcount);  // > Event action for page Evol Page:11
          //alert(expt-1)  // > Event action for page Evol Page:12
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_r(__time) {
    var __beginIndex = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,new Array(r.length),__beginIndex,r.ength);
  }

  function _historic_ybubble(__time) {
    var __beginIndex = 0 + r.length;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,new Array(ybubble.length),__beginIndex,ybubble.ength);
  }

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
    _view = new photosynthesis_3_factors_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Height",  function() { return Height; }, function(_v) { Height = _v; } ); // HtmlView Page linking property 'Height' for element 'fullscreen'
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.controlPanel.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'controlPanel'
          _view.controlPanel.linkProperty("Display",  function() { return print?"none":"inline-flex"; } ); // HtmlView Page linking property 'Display' for element 'controlPanel'
          _view.Labels.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'Labels'
          _view.checkBox.linkProperty("Checked",  function() { return showLabel; }, function(_v) { showLabel = _v; } ); // HtmlView Page linking property 'Checked' for element 'checkBox'
          _view.comboBox.linkProperty("Options",  function() { return ["expt 1 vary distance of light source","expt 2 vary concentration of dissolved carbon dioxide","expt 3 vary temperature"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox'
          _view.comboBox.linkProperty("CSS",  function() { return cssBlinkcomboBox; }, function(_v) { cssBlinkcomboBox = _v; } ); // HtmlView Page linking property 'CSS' for element 'comboBox'
          _view.comboBox.setAction("OnFocus", function(_data,_info) {
  cssBlinkcomboBox = {"animation": "blink 0s step-start infinite"}

}); // HtmlView Page setting action 'OnFocus' for element 'comboBox'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  //alert(option);
  //_view._update();
  //_reset() // seems to be the only code i know that forces the panels to be lay properly
   var opts = _view.comboBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  //["expt 1 vary amount of light","expt 2 vary amount of carbon dioxide","","🗺world","📈graph","both","graph2","speed up","slow down","","print"]
  if ( option=="expt 1 vary distance of light source"){
  expt=0;
  carbondioxide = 1 // set to a fixed storyboard value
  temperature = 30
  text= "experiment 1, \nnumber of bubbles vs \ndistance of light";
  //disabled=false;
  //
  world=true;
  Width1 = "50%"; //world
  expt =0
  displaydistance = "inline-block"
  Width0 = "50%"; 
  displaycarbondioxide = "none"
  displaytemperature = "none"
  //
    }
    else if ( option=="expt 1 vary amount of light source"){
  expt=1;
  text= "experiment 1, \nnumber of bubbles vs \nintensity of light";
  //disabled=false;
  Width0 = "0%";
  Width1 = "50%";
  Width2 = "50%";
  Width3 = "50%";
  Width4 = "50%";
    }
  //print
  else if ( option == "print"){
    print = true;
    }
  //print
  else if ( option=="expt 2 vary concentration of dissolved carbon dioxide"){
  text= "experiment 2, \nnumber of bubbles vs \npercentage of carbon dioxide in water";
  //carbondioxide = 1 // set to a fixed storyboard value
  distance =10
  temperature = 30
  expt=2;
  world=true;
  Width1 = "50%"; //world
  expt =2
  displaydistance = "none"
  displaycarbondioxide = "inline-block"
  Width3 = "50%"; 
  displaytemperature = "none"
  //exptnumber ("3")
  }
  else if ( option=="expt 3 vary temperature"){
  text= "experiment 3, \nnumber of bubbles vs \ntemperature in water";
  distance = 10
  carbondioxide = 1 // set to a fixed storyboard value
  //temperature = 30
  expt=3;
  //exptnumber ("4")
  world=true;
  Width1 = "50%"; //world
  expt =3
  displaydistance = "none"
  displaycarbondioxide = "none"
  displaytemperature = "inline-block"
  Width4 = "50%"; 
  }
  if (expt ==0){
  _view.comboBox.setSelectedOptions(["expt 1 vary distance of light source"]);
  }
  else if (expt ==1){
  _view.comboBox.setSelectedOptions(["expt 1 vary amount of light source"]);
  }
  else if (expt ==2){
  _view.comboBox.setSelectedOptions(["expt 2 vary concentration of dissolved carbon dioxide"]);
  }
  else if (expt ==3){
    //"expt 3 vary temperature"
  _view.comboBox.setSelectedOptions(["expt 3 vary temperature"]);
  }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.distance.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'distance'
          _view.label3.linkProperty("Text",  function() { return "distance="+distance.toFixed(0); } ); // HtmlView Page linking property 'Text' for element 'label3'
          _view.label3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'label3'
          _view.sliderlight2.setAction("OnRelease", function(_data,_info) {
  cssBlink = {"animation": "blink 0s step-start infinite"}
  cssBlinkcomboBox = {"animation": "blink 0s step-start infinite"} // off the combobox as well;

}); // HtmlView Page setting action 'OnRelease' for element 'sliderlight2'
          _view.sliderlight2.linkProperty("CSS",  function() { return cssBlink; }, function(_v) { cssBlink = _v; } ); // HtmlView Page linking property 'CSS' for element 'sliderlight2'
          _view.sliderlight2.linkProperty("Value",  function() { return distance; }, function(_v) { distance = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderlight2'
          _view.sliderlight2.setAction("OnChange", function(_data,_info) {
  if(distance==10){
    dr[0]=drdistance1
  }
  if(distance==20){
    dr[0]=drdistance2
  }
  if(distance==30){
    dr[0]=drdistance3
  }
  if(distance==40){
    dr[0]=drdistance4
  }
  if(distance==50){
    dr[0]=drdistance5
  }

}); // HtmlView Page setting action 'OnChange' for element 'sliderlight2'
          _view.sliderlight2.linkProperty("Disabled",  function() { return expt!=0; } ); // HtmlView Page linking property 'Disabled' for element 'sliderlight2'
          _view.cm.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'cm'
          _view.light.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'light'
          _view.label.linkProperty("Text",  function() { return "light intensity="+intensity.toFixed(0); } ); // HtmlView Page linking property 'Text' for element 'label'
          _view.label.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'label'
          _view.sliderlight.setAction("OnRelease", function(_data,_info) {
  cssBlink = {"animation": "blink 0s step-start infinite"}
  cssBlinkcomboBox = {"animation": "blink 0s step-start infinite"} // off the combobox as well;

}); // HtmlView Page setting action 'OnRelease' for element 'sliderlight'
          _view.sliderlight.linkProperty("CSS",  function() { return cssBlink; }, function(_v) { cssBlink = _v; } ); // HtmlView Page linking property 'CSS' for element 'sliderlight'
          _view.sliderlight.linkProperty("Value",  function() { return intensity; }, function(_v) { intensity = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderlight'
          _view.sliderlight.setAction("OnChange", function(_data,_info) {
  dr[0] = 0.05*intensity;

}); // HtmlView Page setting action 'OnChange' for element 'sliderlight'
          _view.sliderlight.linkProperty("Disabled",  function() { return expt!=1; } ); // HtmlView Page linking property 'Disabled' for element 'sliderlight'
          _view.co2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'co2'
          _view.label2.linkProperty("Text",  function() { return "carbon dioxide="+carbondioxide.toFixed(1); } ); // HtmlView Page linking property 'Text' for element 'label2'
          _view.label2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'label2'
          _view.sliderCo2.setAction("OnRelease", function(_data,_info) {
  cssBlink = {"animation": "blink 0s step-start infinite"}
  cssBlinkcomboBox = {"animation": "blink 0s step-start infinite"} // off the combobox as well;

}); // HtmlView Page setting action 'OnRelease' for element 'sliderCo2'
          _view.sliderCo2.linkProperty("CSS",  function() { return cssBlink; }, function(_v) { cssBlink = _v; } ); // HtmlView Page linking property 'CSS' for element 'sliderCo2'
          _view.sliderCo2.linkProperty("Value",  function() { return carbondioxide; }, function(_v) { carbondioxide = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderCo2'
          _view.sliderCo2.setAction("OnChange", function(_data,_info) {
  if (carbondioxide==0.2){
    dr[0]=drcarbondioxide1
  }
  if (carbondioxide==0.4){
    dr[0]=drcarbondioxide2
  }
  if (carbondioxide==0.6){
    dr[0]=drcarbondioxide3
  }
  if (carbondioxide==0.8){
    dr[0]=drcarbondioxide4
  }
  if (carbondioxide==1.0){
    dr[0]=drcarbondioxide5
  }

}); // HtmlView Page setting action 'OnChange' for element 'sliderCo2'
          _view.sliderCo2.linkProperty("Disabled",  function() { return expt!=2; } ); // HtmlView Page linking property 'Disabled' for element 'sliderCo2'
          _view.percent.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'percent'
          _view.temperature.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'temperature'
          _view.label22.linkProperty("Text",  function() { return "temperature="+temperature.toFixed(0); } ); // HtmlView Page linking property 'Text' for element 'label22'
          _view.label22.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'label22'
          _view.sliderT.setAction("OnRelease", function(_data,_info) {
  cssBlink = {"animation": "blink 0s step-start infinite"}
  cssBlinkcomboBox = {"animation": "blink 0s step-start infinite"} // off the combobox as well;

}); // HtmlView Page setting action 'OnRelease' for element 'sliderT'
          _view.sliderT.linkProperty("CSS",  function() { return cssBlink; }, function(_v) { cssBlink = _v; } ); // HtmlView Page linking property 'CSS' for element 'sliderT'
          _view.sliderT.linkProperty("Value",  function() { return temperature; }, function(_v) { temperature = _v; } ); // HtmlView Page linking property 'Value' for element 'sliderT'
          _view.sliderT.setAction("OnChange", function(_data,_info) {
  if (temperature==10){
    dr[0]=drtemperature1
  }
  if (temperature==20){
    dr[0]=drtemperature2
  }
  if (temperature==30){
    dr[0]=drtemperature3
  }
  if (temperature==40){
    dr[0]=drtemperature4
  }
  if (temperature==50){
    dr[0]=drtemperature5
  }

}); // HtmlView Page setting action 'OnChange' for element 'sliderT'
          _view.sliderT.linkProperty("Disabled",  function() { return expt!=3; } ); // HtmlView Page linking property 'Disabled' for element 'sliderT'
          _view.oc.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'oc'
          _view.comboBox2.linkProperty("Options",  function() { return ["both expt 1","both expt 2","both expt 3","🗺world","graph 1","graph 2","graph 3"]; } ); // HtmlView Page linking property 'Options' for element 'comboBox2'
          _view.comboBox2.setAction("OnChange", function(_data,_info) {
  var opts = _view.comboBox2.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if ( option=="🗺world"){
    world=true;
    expt =-1
  //  Width0 = "0%";
  Width1 = "100%";
  displaydistance = "none"
  displaycarbondioxide = "none"
  displaytemperature = "none"
  //Width2 = "0%";
  //Width3 = "0%";
  //Width4 = "0%";
  //disabled=false;
    }
  else if ( option=="graph 1"){
  world=false;
  //graph=true;
  expt =0
  displaydistance = "inline-block"
  Width0 = "100%";
  displaycarbondioxide = "none"
  displaytemperature = "none"
  //disabledworld=false;
  }
  else if ( option=="graph 2"){
  world=false;
  //graph=true;
  expt =2
  displaydistance = "none"
  displaycarbondioxide = "inline-block"
  Width3 = "100%";
  displaytemperature = "none"
  //disabledworld=false;
  }
  else if ( option=="graph 3"){
  world=false;
  //graph=true;
  expt =3
  displaydistance = "none"
  displaycarbondioxide = "none"
  displaytemperature = "inline-block"
  Width4 = "100%";
  //disabledworld=false;
  }
  else if ( option=="both expt 1"){
  world=true;
  Width1 = "50%"; //world
  expt =0
  displaydistance = "inline-block"
  Width0 = "50%"; 
  displaycarbondioxide = "none"
  displaytemperature = "none"
  //_view._update();
  //disabledworld=false;
  }
  else if ( option=="both expt 2"){
  world=true;
  Width1 = "50%"; //world
  expt =2
  displaydistance = "none"
  displaycarbondioxide = "inline-block"
  Width3 = "50%"; 
  displaytemperature = "none"
  //_view._update();
  //disabledworld=false;
  }
  else if ( option=="both expt 3"){
  world=true;
  Width1 = "50%"; //world
  expt =3
  displaydistance = "none"
  displaycarbondioxide = "none"
  displaytemperature = "inline-block"
  Width4 = "50%"; 
  //_view._update();
  //assume remember expt 
  //disabledworld=false;
  }
  //alert(option);
  //_update();

}); // HtmlView Page setting action 'OnChange' for element 'comboBox2'
          _view.comboBox2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox2'
          _view.auto.setAction("OnClick", function(_data,_info) {
  _play();
  text="playing";
  if (t>59.9){
    alert();
  sumcountdata[datan]=sumcount;
  intensitydata[datan] = intensity;
  carbondioxidedata[datan]= carbondioxide;
  datan=datan+1;
  t=0;
  _initialize();
  }

}); // HtmlView Page setting action 'OnClick' for element 'auto'
          _view.twoStateButton.setAction("OffClick", function(_data,_info) {
  _setStepsPerDisplay(1)
  //spd = 1
  //_setFPS(20);
  //console.log(_view.twoStateButton.getState());

}); // HtmlView Page setting action 'OffClick' for element 'twoStateButton'
          _view.twoStateButton.linkProperty("Background",  function() { return (_view.twoStateButton.getState())?"yellow":"cyan"; } ); // HtmlView Page linking property 'Background' for element 'twoStateButton'
          _view.twoStateButton.setAction("OnClick", function(_data,_info) {
  _setStepsPerDisplay(20)
  //spd = 100
  //_setFPS(100);
  //console.log(_view.twoStateButton.getState());

}); // HtmlView Page setting action 'OnClick' for element 'twoStateButton'
          _view.twoStateButton.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'twoStateButton'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  text="paused";
  _pause();

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  _play();
  text="playing, wait for 60 sec for data to be collected";

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'playPauseButton2'
          _view.store.setAction("OnClick", function(_data,_info) {
  sumcountdata[datan]=sumcount;
  intensitydata[datan] = intensity;
  carbondioxidedata[datan]= carbondioxide;
  datan=datan+1;
  t=0;
  _initialize();

}); // HtmlView Page setting action 'OnClick' for element 'store'
          _view.resetButton3.setAction("OnClick", function(_data,_info) {
  _reset();
  //["expt 1 vary amount of light","expt 2 vary amount of carbon dioxide"]
  if (expt ==0){
    console.log("reset expt 0");
   // _view.comboBox.setSelectedOptions(["expt 1 vary amount of light"]);
    _view.comboBox.setSelectedOptions(["expt 1 vary distance of light source"]);
     //displaydistance = "none"
     displaycarbondioxide = "none"
     displaytemperature = "none" // to address request to only show one plottingpanel
  }
  if (expt ==2){
    console.log("reset expt 2");
    _view.comboBox.setSelectedOptions(["expt 2 vary concentration of dissolved carbon dioxide"]);
    displaydistance = "none"
    // displaycarbondioxide = "none"
     displaytemperature = "none" // to address request to only show one plottingpanel
  }
  if (expt ==3){
    console.log("reset expt 3");
    _view.comboBox.setSelectedOptions(["expt 3 vary temperature"]);
   displaydistance = "none"
     displaycarbondioxide = "none"
   //  displaytemperature = "none" // to address request to only show one plottingpanel
  }

}); // HtmlView Page setting action 'OnClick' for element 'resetButton3'
          _view.resetButton3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton3'
          _view.spd.linkProperty("Value",  function() { return dt; }, function(_v) { dt = _v; } ); // HtmlView Page linking property 'Value' for element 'spd'
          _view.model3.setAction("OnCheckOff", function(_data,_info) {
  showmodel=false;

}); // HtmlView Page setting action 'OnCheckOff' for element 'model3'
          _view.model3.linkProperty("Checked",  function() { return showmodel; }, function(_v) { showmodel = _v; } ); // HtmlView Page linking property 'Checked' for element 'model3'
          _view.model3.setAction("OnCheckOn", function(_data,_info) {
  showmodel=true;

}); // HtmlView Page setting action 'OnCheckOn' for element 'model3'
          _view.models.linkProperty("Options",  function() { return ["2*sin(t)","2*cos(t)","0","-2*cos(t)","-1*cos(t)","1*sin(t+1.57)","1.41*sin(t+0.5236)","show me"]; } ); // HtmlView Page linking property 'Options' for element 'models'
          _view.models.setAction("OnChange", function(_data,_info) {
  showmodel=true;
  functionY=selectedmodel+"";
  if (selectedmodel[0]==="show me"){
  functionY= +_view._format(Acalculated,"0.0")+"*sin(" +_view._format(w,"0.00")+"*t+("+_view._format(phi,"0.00")+"))";  
    }
  xmodel=_view.fField.evaluate({ t : t, x : xmodel });

}); // HtmlView Page setting action 'OnChange' for element 'models'
          _view.models.linkProperty("SelectedOptions",  function() { return selectedmodel; }, function(_v) { selectedmodel = _v; } ); // HtmlView Page linking property 'SelectedOptions' for element 'models'
          _view.fField.linkProperty("Value",  function() { return functionY; }, function(_v) { functionY = _v; } ); // HtmlView Page linking property 'Value' for element 'fField'
          _view.fField.setAction("OnChange", function(_data,_info) {
  showmodel=true;
  xmodel=_view.fField.evaluate({ t : t, x : xmodel });

}); // HtmlView Page setting action 'OnChange' for element 'fField'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return xmax; }, function(_v) { xmax = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return xmin; }, function(_v) { xmin = _v; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return "Number of bubble(s)="+sumcount; } ); // HtmlView Page linking property 'TLMessage' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Display",  function() { return world?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'plottingPanel'
          _view.table3.linkProperty("Y",  function() { return floory; }, function(_v) { floory = _v; } ); // HtmlView Page linking property 'Y' for element 'table3'
          _view.stopwatch2.linkProperty("Y",  function() { return floory-3; } ); // HtmlView Page linking property 'Y' for element 'stopwatch2'
          _view.stopwatchtext.linkProperty("Text",  function() { return ""+formatTime(t); } ); // HtmlView Page linking property 'Text' for element 'stopwatchtext'
          _view.stopwatchtext.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'stopwatchtext'
          _view.tripod.linkProperty("Y",  function() { return floory-0.05; } ); // HtmlView Page linking property 'Y' for element 'tripod'
          _view.retortstand.linkProperty("Y",  function() { return floory-0.1; } ); // HtmlView Page linking property 'Y' for element 'retortstand'
          _view.lamp2.linkProperty("X",  function() { return 10*distance/50; } ); // HtmlView Page linking property 'X' for element 'lamp2'
          _view.lamp2.linkProperty("Y",  function() { return floory; }, function(_v) { floory = _v; } ); // HtmlView Page linking property 'Y' for element 'lamp2'
          _view.beaker.linkProperty("Y",  function() { return floory+3; } ); // HtmlView Page linking property 'Y' for element 'beaker'
          _view.scene1popupruler.linkProperty("Visibility",  function() { return scene13; }, function(_v) { scene13 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'scene1popupruler'
          _view.background.linkProperty("FillColor",  function() { return color1; }, function(_v) { color1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'background'
          _view.shape2.linkProperty("Visibility",  function() { return scene13; }, function(_v) { scene13 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'shape2'
          _view.solution1.setAction("OnExit", function(_data,_info) {
  color1=colorCyan;

}); // HtmlView Page setting action 'OnExit' for element 'solution1'
          _view.solution1.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'solution1'
          _view.solution1.setAction("OnRelease", function(_data,_info) {
  // When the "clicked" state changes, set it to true
  // This will stop the timeout and exit the function
  clicked = true;
  //isToggledOn = false
  scene2comboBoxSlider ();

}); // HtmlView Page setting action 'OnRelease' for element 'solution1'
          _view.solution1.setAction("OnEnter", function(_data,_info) {
  color1=colorRed;

}); // HtmlView Page setting action 'OnEnter' for element 'solution1'
          _view.solution1.linkProperty("Visibility",  function() { return scene13; }, function(_v) { scene13 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'solution1'
          _view.solution1.setAction("OnPress", function(_data,_info) {
  scene13=false
  updateLabel();

}); // HtmlView Page setting action 'OnPress' for element 'solution1'
          _view.ruler.linkProperty("Y",  function() { return floory-1; } ); // HtmlView Page linking property 'Y' for element 'ruler'
          _view.ruler.setAction("OnPress", function(_data,_info) {
  scene13=false
  updateLabel();

}); // HtmlView Page setting action 'OnPress' for element 'ruler'
          _view.imageSet2.linkProperty("NumberOfElements",  function() { return ntotal; }, function(_v) { ntotal = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'imageSet2'
          _view.imageSet2.linkProperty("X",  function() { return xbubble; }, function(_v) { xbubble = _v; } ); // HtmlView Page linking property 'X' for element 'imageSet2'
          _view.imageSet2.linkProperty("Y",  function() { return ybubble; }, function(_v) { ybubble = _v; } ); // HtmlView Page linking property 'Y' for element 'imageSet2'
          _view.imageSet2.linkProperty("Visibility",  function() { return bubbleburst; }, function(_v) { bubbleburst = _v; } ); // HtmlView Page linking property 'Visibility' for element 'imageSet2'
          _view.textSet2.linkProperty("NumberOfElements",  function() { return ntotal; }, function(_v) { ntotal = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'textSet2'
          _view.textSet2.linkProperty("X",  function() { return xbubble; }, function(_v) { xbubble = _v; } ); // HtmlView Page linking property 'X' for element 'textSet2'
          _view.textSet2.linkProperty("Y",  function() { return ybubble; }, function(_v) { ybubble = _v; } ); // HtmlView Page linking property 'Y' for element 'textSet2'
          _view.textSet2.linkProperty("Text",  function() { return index; }, function(_v) { index = _v; } ); // HtmlView Page linking property 'Text' for element 'textSet2'
          _view.background2.linkProperty("FillColor",  function() { return color2; }, function(_v) { color2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'background2'
          _view.background2.linkProperty("Visibility",  function() { return scene12; }, function(_v) { scene12 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'background2'
          _view.background22.linkProperty("FillColor",  function() { return color2; }, function(_v) { color2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'background22'
          _view.background22.linkProperty("Visibility",  function() { return scene12; }, function(_v) { scene12 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'background22'
          _view.background23.linkProperty("FillColor",  function() { return color2; }, function(_v) { color2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'background23'
          _view.background23.linkProperty("Visibility",  function() { return scene12; }, function(_v) { scene12 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'background23'
          _view.shape23.linkProperty("Visibility",  function() { return scene12; }, function(_v) { scene12 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'shape23'
          _view.solution3.setAction("OnRelease", function(_data,_info) {
  // When the "clicked" state changes, set it to true
  // This will stop the timeout and exit the function
  clicked = true;
  scene2comboBoxSlider ();

}); // HtmlView Page setting action 'OnRelease' for element 'solution3'
          _view.solution3.setAction("OnExit", function(_data,_info) {
  color2=colorPurple
  //font2 = "normal normal 1vw ";

}); // HtmlView Page setting action 'OnExit' for element 'solution3'
          _view.solution3.setAction("OnEnter", function(_data,_info) {
  color2=colorRed
  //font2 = "normal normal 1.2vw ";

}); // HtmlView Page setting action 'OnEnter' for element 'solution3'
          _view.solution3.linkProperty("Visibility",  function() { return scene12; }, function(_v) { scene12 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'solution3'
          _view.solution3.setAction("OnPress", function(_data,_info) {
  scene12=false
  updateLabel();

}); // HtmlView Page setting action 'OnPress' for element 'solution3'
          _view.solution3.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'solution3'
          _view.thermometer.setAction("OnPress", function(_data,_info) {
  scene12=false
  updateLabel();

}); // HtmlView Page setting action 'OnPress' for element 'thermometer'
          _view.bubble2.linkProperty("NumberOfElements",  function() { return ntotal; }, function(_v) { ntotal = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'bubble2'
          _view.bubble2.linkProperty("SizeX",  function() { return r; }, function(_v) { r = _v; } ); // HtmlView Page linking property 'SizeX' for element 'bubble2'
          _view.bubble2.linkProperty("X",  function() { return xbubble; }, function(_v) { xbubble = _v; } ); // HtmlView Page linking property 'X' for element 'bubble2'
          _view.bubble2.linkProperty("Y",  function() { return ybubble; }, function(_v) { ybubble = _v; } ); // HtmlView Page linking property 'Y' for element 'bubble2'
          _view.bubble2.linkProperty("Visibility",  function() { return ybubbleshow; }, function(_v) { ybubbleshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'bubble2'
          _view.bubble2.linkProperty("SizeY",  function() { return r; }, function(_v) { r = _v; } ); // HtmlView Page linking property 'SizeY' for element 'bubble2'
          _view.background3.linkProperty("FillColor",  function() { return color3; }, function(_v) { color3 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'background3'
          _view.background3.linkProperty("X",  function() { return xmin; }, function(_v) { xmin = _v; } ); // HtmlView Page linking property 'X' for element 'background3'
          _view.background3.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'background3'
          _view.background32.linkProperty("FillColor",  function() { return color3; }, function(_v) { color3 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'background32'
          _view.background32.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'background32'
          _view.background33.linkProperty("FillColor",  function() { return color3; }, function(_v) { color3 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'background33'
          _view.background33.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'background33'
          _view.shape22.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'shape22'
          _view.solution2.setAction("OnExit", function(_data,_info) {
  color3=colorGreen;

}); // HtmlView Page setting action 'OnExit' for element 'solution2'
          _view.solution2.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'solution2'
          _view.solution2.setAction("OnRelease", function(_data,_info) {
  // When the "clicked" state changes, set it to true
  // This will stop the timeout and exit the function
  clicked = true;
  scene2comboBoxSlider ();

}); // HtmlView Page setting action 'OnRelease' for element 'solution2'
          _view.solution2.linkProperty("X",  function() { return xmin; }, function(_v) { xmin = _v; } ); // HtmlView Page linking property 'X' for element 'solution2'
          _view.solution2.setAction("OnEnter", function(_data,_info) {
  color3=colorRed;

}); // HtmlView Page setting action 'OnEnter' for element 'solution2'
          _view.solution2.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'solution2'
          _view.solution2.setAction("OnPress", function(_data,_info) {
  scene11=false
  updateLabel();

}); // HtmlView Page setting action 'OnPress' for element 'solution2'
          _view.container.linkProperty("Y",  function() { return floory-0.1; } ); // HtmlView Page linking property 'Y' for element 'container'
          _view.container.setAction("OnPress", function(_data,_info) {
  scene11=false
  updateLabel();

}); // HtmlView Page setting action 'OnPress' for element 'container'
          _view.container.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'container'
          _view.x2.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'x2'
          _view.labels.linkProperty("Visibility",  function() { return showLabel; }, function(_v) { showLabel = _v; } ); // HtmlView Page linking property 'Visibility' for element 'labels'
          _view.thermometer2.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'thermometer2'
          _view.aquaticplant.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'aquaticplant'
          _view.labellamp.linkProperty("Visibility",  function() { return showLabel; }, function(_v) { showLabel = _v; } ); // HtmlView Page linking property 'Visibility' for element 'labellamp'
          _view.lamp3.linkProperty("X",  function() { return 10*distance/50+1; } ); // HtmlView Page linking property 'X' for element 'lamp3'
          _view.lamp3.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'lamp3'
          _view.arrow32.linkProperty("X",  function() { return 10*distance/50+1; } ); // HtmlView Page linking property 'X' for element 'arrow32'
          _view.ruler2.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'ruler2'
          _view.labels22.linkProperty("Visibility",  function() { return showLabel; }, function(_v) { showLabel = _v; } ); // HtmlView Page linking property 'Visibility' for element 'labels22'
          _view.biolingtube.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'biolingtube'
          _view.beaker2.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'beaker2'
          _view.cutendofplant.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'cutendofplant'
          _view.sodium.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'sodium'
          _view.waterbath.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'waterbath'
          _view.tripod2.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'tripod2'
          _view.sodium2.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'sodium2'
          _view.sodium2.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'sodium2'
          _view.arrow2222222.linkProperty("Visibility",  function() { return scene11; }, function(_v) { scene11 = _v; } ); // HtmlView Page linking property 'Visibility' for element 'arrow2222222'
          _view.stopwatch3.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'stopwatch3'
          _view.debugging.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'debugging'
          _view.panelONE.linkProperty("Width",  function() { return Width0; }, function(_v) { Width0 = _v; } ); // HtmlView Page linking property 'Width' for element 'panelONE'
          _view.panelONE.linkProperty("Display",  function() { return displaydistance; }, function(_v) { displaydistance = _v; } ); // HtmlView Page linking property 'Display' for element 'panelONE'
          _view.plottingPanelxvst0.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanelxvst0'
          _view.plottingPanelxvst0.linkProperty("Tooltip",  function() { return (expt==0)?"inline-block":"none"; } ); // HtmlView Page linking property 'Tooltip' for element 'plottingPanelxvst0'
          _view.plottingPanelxvst0.linkProperty("Display",  function() { return displaydistance; }, function(_v) { displaydistance = _v; } ); // HtmlView Page linking property 'Display' for element 'plottingPanelxvst0'
          _view.analyticCurve22.linkProperty("FunctionY",  function() { return FittedParametersa+"*1/(x*x)+"+FittedParametersb; } ); // HtmlView Page linking property 'FunctionY' for element 'analyticCurve22'
          _view.analyticCurve22.linkProperty("Visibility",  function() { return showdistancefitcurve; }, function(_v) { showdistancefitcurve = _v; } ); // HtmlView Page linking property 'Visibility' for element 'analyticCurve22'
          _view.instantaneousdata3.linkProperty("X",  function() { return distance; }, function(_v) { distance = _v; } ); // HtmlView Page linking property 'X' for element 'instantaneousdata3'
          _view.instantaneousdata3.linkProperty("Y",  function() { return sumcount; }, function(_v) { sumcount = _v; } ); // HtmlView Page linking property 'Y' for element 'instantaneousdata3'
          _view.shapeSet3.linkProperty("NumberOfElements",  function() { return datanMax; }, function(_v) { datanMax = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("X",  function() { return distancedata; }, function(_v) { distancedata = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("Y",  function() { return sumcountdatadistance; }, function(_v) { sumcountdatadistance = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet3'
          _view.trace3.linkProperty("InputX",  function() { return splinex0; }, function(_v) { splinex0 = _v; } ); // HtmlView Page linking property 'InputX' for element 'trace3'
          _view.trace3.linkProperty("InputY",  function() { return spliney0; }, function(_v) { spliney0 = _v; } ); // HtmlView Page linking property 'InputY' for element 'trace3'
          _view.dataTable.linkProperty("Input",  function() { return datatable; }, function(_v) { datatable = _v; } ); // HtmlView Page linking property 'Input' for element 'dataTable'
          _view.dataTable.linkProperty("HeadersText",  function() { return ["Distance from lamp (cm)","Rate of bubbles produced (bubbles / min)"]; } ); // HtmlView Page linking property 'HeadersText' for element 'dataTable'
          _view.dataTable.linkProperty("CellsFormat",  function() { return ["0","0"]; } ); // HtmlView Page linking property 'CellsFormat' for element 'dataTable'
          _view.dataTable.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'dataTable'
          _view.arrayPanel.linkProperty("HeadersText",  function() { return ["distance","number of bubbles per minute"]; } ); // HtmlView Page linking property 'HeadersText' for element 'arrayPanel'
          _view.arrayPanel.linkProperty("CellsFormat",  function() { return ["0","0"]; } ); // HtmlView Page linking property 'CellsFormat' for element 'arrayPanel'
          _view.arrayPanel.linkProperty("DataArray",  function() { return datatable; }, function(_v) { datatable = _v; } ); // HtmlView Page linking property 'DataArray' for element 'arrayPanel'
          _view.panelTWO.linkProperty("Width",  function() { return Width3; }, function(_v) { Width3 = _v; } ); // HtmlView Page linking property 'Width' for element 'panelTWO'
          _view.panelTWO.linkProperty("Display",  function() { return displaycarbondioxide; }, function(_v) { displaycarbondioxide = _v; } ); // HtmlView Page linking property 'Display' for element 'panelTWO'
          _view.plottingPanelxvst2.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanelxvst2'
          _view.plottingPanelxvst2.linkProperty("Tooltip",  function() { return (expt==2)?"inline-block":"none"; } ); // HtmlView Page linking property 'Tooltip' for element 'plottingPanelxvst2'
          _view.plottingPanelxvst2.linkProperty("Display",  function() { return displaycarbondioxide; }, function(_v) { displaycarbondioxide = _v; } ); // HtmlView Page linking property 'Display' for element 'plottingPanelxvst2'
          _view.instantaneousdata2.linkProperty("X",  function() { return carbondioxide; }, function(_v) { carbondioxide = _v; } ); // HtmlView Page linking property 'X' for element 'instantaneousdata2'
          _view.instantaneousdata2.linkProperty("Y",  function() { return sumcount; }, function(_v) { sumcount = _v; } ); // HtmlView Page linking property 'Y' for element 'instantaneousdata2'
          _view.shapeSet2.linkProperty("NumberOfElements",  function() { return datanMax; }, function(_v) { datanMax = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("X",  function() { return carbondioxidedata; }, function(_v) { carbondioxidedata = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("Y",  function() { return sumcountdatacarbondioxide; }, function(_v) { sumcountdatacarbondioxide = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet2'
          _view.trace2.linkProperty("InputX",  function() { return splinex2.slice(5); } ); // HtmlView Page linking property 'InputX' for element 'trace2'
          _view.trace2.linkProperty("Visibility",  function() { return countNonZero(sumcountdatacarbondioxide)>=5; } ); // HtmlView Page linking property 'Visibility' for element 'trace2'
          _view.trace2.linkProperty("InputY",  function() { return spliney2.slice(5); } ); // HtmlView Page linking property 'InputY' for element 'trace2'
          _view.dataTable2.linkProperty("Input",  function() { return datatable2; }, function(_v) { datatable2 = _v; } ); // HtmlView Page linking property 'Input' for element 'dataTable2'
          _view.dataTable2.linkProperty("HeadersText",  function() { return ["concentration of sodium hydrogen carbonate solution (%)" ,"Rate of bubbles produced (bubbles / min)"]; } ); // HtmlView Page linking property 'HeadersText' for element 'dataTable2'
          _view.dataTable2.linkProperty("CellsFormat",  function() { return ["0.0","0"]; } ); // HtmlView Page linking property 'CellsFormat' for element 'dataTable2'
          _view.dataTable2.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'dataTable2'
          _view.panelTHREE.linkProperty("Width",  function() { return Width4; }, function(_v) { Width4 = _v; } ); // HtmlView Page linking property 'Width' for element 'panelTHREE'
          _view.panelTHREE.linkProperty("Display",  function() { return displaytemperature; }, function(_v) { displaytemperature = _v; } ); // HtmlView Page linking property 'Display' for element 'panelTHREE'
          _view.plottingPanelxvst3.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanelxvst3'
          _view.plottingPanelxvst3.linkProperty("Tooltip",  function() { return (expt==3)?"inline-block":"none"; } ); // HtmlView Page linking property 'Tooltip' for element 'plottingPanelxvst3'
          _view.plottingPanelxvst3.linkProperty("Display",  function() { return displaytemperature; }, function(_v) { displaytemperature = _v; } ); // HtmlView Page linking property 'Display' for element 'plottingPanelxvst3'
          _view.instantaneousdata22.linkProperty("X",  function() { return temperature; }, function(_v) { temperature = _v; } ); // HtmlView Page linking property 'X' for element 'instantaneousdata22'
          _view.instantaneousdata22.linkProperty("Y",  function() { return sumcount; }, function(_v) { sumcount = _v; } ); // HtmlView Page linking property 'Y' for element 'instantaneousdata22'
          _view.shapeSet22.linkProperty("NumberOfElements",  function() { return datanMax; }, function(_v) { datanMax = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("X",  function() { return temperaturedata; }, function(_v) { temperaturedata = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("Y",  function() { return sumcountdatatemperature; }, function(_v) { sumcountdatatemperature = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet22'
          _view.trace22.linkProperty("InputX",  function() { return splinex3.slice(20); } ); // HtmlView Page linking property 'InputX' for element 'trace22'
          _view.trace22.linkProperty("Visibility",  function() { return countNonZero(sumcountdatatemperature)>=5; } ); // HtmlView Page linking property 'Visibility' for element 'trace22'
          _view.trace22.linkProperty("InputY",  function() { return spliney3.slice(20); } ); // HtmlView Page linking property 'InputY' for element 'trace22'
          _view.dataTable22.linkProperty("Input",  function() { return datatable3; }, function(_v) { datatable3 = _v; } ); // HtmlView Page linking property 'Input' for element 'dataTable22'
          _view.dataTable22.linkProperty("HeadersText",  function() { return ["temperature (°C)","Rate of bubbles produced (bubbles / min)"]; } ); // HtmlView Page linking property 'HeadersText' for element 'dataTable22'
          _view.dataTable22.linkProperty("CellsFormat",  function() { return ["0","0"]; } ); // HtmlView Page linking property 'CellsFormat' for element 'dataTable22'
          _view.dataTable22.linkProperty("Font",  function() { return font2; }, function(_v) { font2 = _v; } ); // HtmlView Page linking property 'Font' for element 'dataTable22'
          _view.plottingPanelxvst.linkProperty("Width",  function() { return Width2; }, function(_v) { Width2 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanelxvst'
          _view.plottingPanelxvst.setAction("OnDoubleClick", function(_data,_info) {
  toggleFullScreen();

}); // HtmlView Page setting action 'OnDoubleClick' for element 'plottingPanelxvst'
          _view.instantaneousdata.linkProperty("X",  function() { return intensity; }, function(_v) { intensity = _v; } ); // HtmlView Page linking property 'X' for element 'instantaneousdata'
          _view.instantaneousdata.linkProperty("Y",  function() { return sumcount; }, function(_v) { sumcount = _v; } ); // HtmlView Page linking property 'Y' for element 'instantaneousdata'
          _view.shapeSet.linkProperty("NumberOfElements",  function() { return datanMax; }, function(_v) { datanMax = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet'
          _view.shapeSet.linkProperty("X",  function() { return intensitydata; }, function(_v) { intensitydata = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet'
          _view.shapeSet.linkProperty("Y",  function() { return sumcountdatatemperature; }, function(_v) { sumcountdatatemperature = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet'
          _view.trace.linkProperty("InputX",  function() { return splinex; }, function(_v) { splinex = _v; } ); // HtmlView Page linking property 'InputX' for element 'trace'
          _view.trace.linkProperty("Visibility",  function() { return showdistancefitcurve; }, function(_v) { showdistancefitcurve = _v; } ); // HtmlView Page linking property 'Visibility' for element 'trace'
          _view.trace.linkProperty("InputY",  function() { return spliney; }, function(_v) { spliney = _v; } ); // HtmlView Page linking property 'InputY' for element 'trace'
          _view.html.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'html'
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
function photosynthesis_3_factors_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = photosynthesis_3_factors_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function photosynthesis_3_factors_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"Labels", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'Labels'
      .setProperty("Text","Labels") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'Labels'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Width","10%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBox'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"distance", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'distance'
      .setProperty("Background","rgba(249,211,87,1.0)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'distance'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label3", _view.distance) // EJsS HtmlView.HtmlView Page: declaration of element 'label3'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderlight2", _view.distance) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderlight2'
      .setProperty("Minimum",10) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderlight2'
      .setProperty("Maximum",50) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderlight2'
      .setProperty("Step",10) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderlight2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"cm", _view.distance) // EJsS HtmlView.HtmlView Page: declaration of element 'cm'
      .setProperty("Text","cm") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'cm'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"light", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'light'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'light'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.light) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderlight", _view.light) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderlight'
      .setProperty("Minimum",0) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderlight'
      .setProperty("Maximum",100) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderlight'
      .setProperty("Step",1) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderlight'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"co2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'co2'
      .setProperty("Background","rgba(80,125,35,1.0)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'co2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label2", _view.co2) // EJsS HtmlView.HtmlView Page: declaration of element 'label2'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderCo2", _view.co2) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderCo2'
      .setProperty("Minimum",0.2) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderCo2'
      .setProperty("Maximum",1.0) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderCo2'
      .setProperty("Step",0.2) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderCo2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"percent", _view.co2) // EJsS HtmlView.HtmlView Page: declaration of element 'percent'
      .setProperty("Text","%") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'percent'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"temperature", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'temperature'
      .setProperty("Background","rgba(86,194,192,1)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'temperature'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label22", _view.temperature) // EJsS HtmlView.HtmlView Page: declaration of element 'label22'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"sliderT", _view.temperature) // EJsS HtmlView.HtmlView Page: declaration of element 'sliderT'
      .setProperty("Minimum",10) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'sliderT'
      .setProperty("Maximum",50) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'sliderT'
      .setProperty("Step",10) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'sliderT'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"oc", _view.temperature) // EJsS HtmlView.HtmlView Page: declaration of element 'oc'
      .setProperty("Text","⁰C") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'oc'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"comboBox2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox2'
      .setProperty("Width","15%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'comboBox2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"auto", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'auto'
      .setProperty("Tooltip","store") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'auto'
      .setProperty("Text","🚗") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'auto'
      .setProperty("Font","normal normal 3vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'auto'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'auto'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"twoStateButton", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'twoStateButton'
      .setProperty("TextOn","Speed↑") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'twoStateButton'
      .setProperty("TextOff","Slow↓") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'twoStateButton'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("TextOn","Play▶") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("TextOff","Pause❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'playPauseButton2'
      ;

    _view._addElement(EJSS_INTERFACE.button,"store", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'store'
      .setProperty("Tooltip","store") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'store'
      .setProperty("Text","⚫") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'store'
      .setProperty("Font","normal normal 2vw ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'store'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'store'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton3", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton3'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'resetButton3'
      .setProperty("Text","Reset↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton3'
      ;

    _view._addElement(EJSS_INTERFACE.slider,"spd", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'spd'
      .setProperty("Minimum",0.05) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'spd'
      .setProperty("Maximum",1) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'spd'
      .setProperty("Step",0.05) // EJsS HtmlView.HtmlView Page: setting property 'Step' for element 'spd'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'spd'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"model", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'model'
      .setProperty("Background","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'model'
      .setProperty("Tooltip","key in expression like 2*sin(1*t)") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'model'
      .setProperty("Text","your model, X =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'model'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"model3", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'model3'
      .setProperty("Background","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'model3'
      .setProperty("Tooltip","show model") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'model3'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"models", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'models'
      .setProperty("Tooltip","select suggested models") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'models'
      ;

    _view._addElement(EJSS_INTERFACE.functionField,"fField", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'fField'
      .setProperty("Width",200) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'fField'
      .setProperty("Tooltip","model input field") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'fField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("Background","rgba(200,220,208,0.5)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",10) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",6) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("YFixedTick",10) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("XTickStep",100) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("MinimumY",-12) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("YTickStep",100) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"table3", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'table3'
      .setProperty("SizeX",30) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'table3'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'table3'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'table3'
      .setProperty("ImageUrl","./photosynthesis_3_factors/Table.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'table3'
      .setProperty("SizeY",10) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'table3'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"stopwatch2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stopwatch2'
      .setProperty("X",-3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'stopwatch2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"stopwatch", _view.stopwatch2) // EJsS HtmlView.HtmlView Page: declaration of element 'stopwatch'
      .setProperty("SizeX",7) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'stopwatch'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'stopwatch'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'stopwatch'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'stopwatch'
      .setProperty("ImageUrl","./photosynthesis_3_factors/stopwatch.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'stopwatch'
      .setProperty("SizeY",7) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'stopwatch'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"stopwatchtext", _view.stopwatch2) // EJsS HtmlView.HtmlView Page: declaration of element 'stopwatchtext'
      .setProperty("X",-0.05) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'stopwatchtext'
      .setProperty("Y",-0.05) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'stopwatchtext'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"tripod", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'tripod'
      .setProperty("SizeX",5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'tripod'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'tripod'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'tripod'
      .setProperty("ImageUrl","./photosynthesis_3_factors/tripod stand.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'tripod'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'tripod'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"retortstand", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'retortstand'
      .setProperty("SizeX",8.7) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'retortstand'
      .setProperty("RelativePosition","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'retortstand'
      .setProperty("X",-7) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'retortstand'
      .setProperty("ImageUrl","./photosynthesis_3_factors/retort stand.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'retortstand'
      .setProperty("SizeY",12) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'retortstand'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"lamp2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'lamp2'
      .setProperty("SizeX",4) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'lamp2'
      .setProperty("RelativePosition","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'lamp2'
      .setProperty("ImageUrl","./photosynthesis_3_factors/lamp.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'lamp2'
      .setProperty("SizeY",7) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'lamp2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"beaker", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'beaker'
      .setProperty("SizeX",5.2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'beaker'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'beaker'
      .setProperty("Attributes",{"animation": "blink 1s step-start infinite"}) // EJsS HtmlView.HtmlView Page: setting property 'Attributes' for element 'beaker'
      .setProperty("ImageUrl","./photosynthesis_3_factors/beaker.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'beaker'
      .setProperty("SizeY",7) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'beaker'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"testtube", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'testtube'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'testtube'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'testtube'
      .setProperty("ImageUrl","./photosynthesis_3_factors/Tube.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'testtube'
      .setProperty("Y",-3.8) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'testtube'
      .setProperty("SizeY",8) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'testtube'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"pondweed2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'pondweed2'
      .setProperty("SizeX",1.3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'pondweed2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'pondweed2'
      .setProperty("ImageUrl","./photosynthesis_3_factors/aquatic plant.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'pondweed2'
      .setProperty("Y",-3.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'pondweed2'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'pondweed2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"pondweed3", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'pondweed3'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'pondweed3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'pondweed3'
      .setProperty("ImageUrl","./photosynthesis/pondweed2.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'pondweed3'
      .setProperty("Y",-3) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'pondweed3'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'pondweed3'
      .setProperty("SizeY",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'pondweed3'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"scene1popupruler", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'scene1popupruler'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'scene1popupruler'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"background", _view.scene1popupruler) // EJsS HtmlView.HtmlView Page: declaration of element 'background'
      .setProperty("SizeX",13) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background'
      .setProperty("RelativePosition","NORTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'background'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background'
      .setProperty("Y",-8.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'background'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide", _view.scene1popupruler) // EJsS HtmlView.HtmlView Page: declaration of element 'hide'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape2", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'shape2'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shape2'
      .setProperty("SizeX",8) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape2'
      .setProperty("X",8) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'shape2'
      .setProperty("Y",-11) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'shape2'
      .setProperty("SizeY",2.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"solution1", _view.scene1popupruler) // EJsS HtmlView.HtmlView Page: declaration of element 'solution1'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'solution1'
      .setProperty("Attributes",{"background-color": "black"}) // EJsS HtmlView.HtmlView Page: setting property 'Attributes' for element 'solution1'
      .setProperty("Text","☒The ruler measures the distance \n of the plant from the lamp. \nThe further the plant, the lower the \nlight intensity. ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'solution1'
      .setProperty("Sensitivity",100) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'solution1'
      .setProperty("X",8) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'solution1'
      .setProperty("Y",-11) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'solution1'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'solution1'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"ruler", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ruler'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'ruler'
      .setProperty("SizeX",11) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ruler'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'ruler'
      .setProperty("ImageUrl","./photosynthesis_3_factors/ruler.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'ruler'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ruler'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'ruler'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"imageSet2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'imageSet2'
      .setProperty("SizeX",40) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'imageSet2'
      .setProperty("ImageUrl","./photosynthesis/212.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'imageSet2'
      .setProperty("SizeY",40) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'imageSet2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'imageSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"textSet2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'textSet2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'textSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"scene1popupthermometer2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'scene1popupthermometer2'
      .setProperty("Y",1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'scene1popupthermometer2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"background2", _view.scene1popupthermometer2) // EJsS HtmlView.HtmlView Page: declaration of element 'background2'
      .setProperty("SizeX",9) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background2'
      .setProperty("RelativePosition","CENTERED") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'background2'
      .setProperty("X",-4) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background2'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background2'
      .setProperty("SizeY",2.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'background2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"background22", _view.scene1popupthermometer2) // EJsS HtmlView.HtmlView Page: declaration of element 'background22'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background22'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'background22'
      .setProperty("X",-1.25) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background22'
      .setProperty("Y",-4.75) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background22'
      .setProperty("SizeY",7.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background22'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'background22'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"background23", _view.scene1popupthermometer2) // EJsS HtmlView.HtmlView Page: declaration of element 'background23'
      .setProperty("SizeX",3.7) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background23'
      .setProperty("RelativePosition","EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background23'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'background23'
      .setProperty("X",-2.3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background23'
      .setProperty("Y",2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background23'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background23'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'background23'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide3", _view.scene1popupthermometer2) // EJsS HtmlView.HtmlView Page: declaration of element 'hide3'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape23", _view.hide3) // EJsS HtmlView.HtmlView Page: declaration of element 'shape23'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shape23'
      .setProperty("SizeX",8) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape23'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape23'
      .setProperty("X",-4) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'shape23'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'shape23'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape23'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"solution3", _view.scene1popupthermometer2) // EJsS HtmlView.HtmlView Page: declaration of element 'solution3'
      .setProperty("FillColor","blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'solution3'
      .setProperty("Sensitivity",100) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'solution3'
      .setProperty("EnabledSize","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledSize' for element 'solution3'
      .setProperty("X",-4) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'solution3'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'solution3'
      .setProperty("Text","☒The thermometer measures \nthe temperature of the\n water in the beaker.") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'solution3'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"thermometer", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thermometer'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'thermometer'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'thermometer'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'thermometer'
      .setProperty("X",-1.25) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'thermometer'
      .setProperty("ImageUrl","./photosynthesis_3_factors/thermometer.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'thermometer'
      .setProperty("Y",-4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'thermometer'
      .setProperty("SizeY",8) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'thermometer'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'thermometer'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"bubble2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'bubble2'
      .setProperty("FillColor","url(#mygrandient)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'bubble2'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'bubble2'
      .setProperty("LineColor","White") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'bubble2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'bubble2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"scene1popupsolution", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'scene1popupsolution'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'scene1popupsolution'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"background3", _view.scene1popupsolution) // EJsS HtmlView.HtmlView Page: declaration of element 'background3'
      .setProperty("SizeX",12) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background3'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background3'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'background3'
      .setProperty("Y",-6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background3'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background3'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'background3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"background32", _view.scene1popupsolution) // EJsS HtmlView.HtmlView Page: declaration of element 'background32'
      .setProperty("SizeX",7) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background32'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background32'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'background32'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background32'
      .setProperty("Y",-6.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background32'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background32'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'background32'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"background33", _view.scene1popupsolution) // EJsS HtmlView.HtmlView Page: declaration of element 'background33'
      .setProperty("SizeX",7) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'background33'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'background33'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'background33'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'background33'
      .setProperty("Y",-1.7) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'background33'
      .setProperty("SizeY",1.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'background33'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'background33'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide2", _view.scene1popupsolution) // EJsS HtmlView.HtmlView Page: declaration of element 'hide2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"shape22", _view.hide2) // EJsS HtmlView.HtmlView Page: declaration of element 'shape22'
      .setProperty("FillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shape22'
      .setProperty("SizeX",8) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shape22'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shape22'
      .setProperty("X",-4) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'shape22'
      .setProperty("Y",-6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'shape22'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shape22'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"solution2", _view.scene1popupsolution) // EJsS HtmlView.HtmlView Page: declaration of element 'solution2'
      .setProperty("FillColor","blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'solution2'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'solution2'
      .setProperty("Text","☒Sodium hydrogencarbonate \nsolution is used to provide \ndissolved carbon dioxide \nto the plant.  ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'solution2'
      .setProperty("Sensitivity",100) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'solution2'
      .setProperty("EnabledSize","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledSize' for element 'solution2'
      .setProperty("Y",-6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'solution2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"container", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'container'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'container'
      .setProperty("SizeX",4) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'container'
      .setProperty("RelativePosition","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'container'
      .setProperty("X",-6.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'container'
      .setProperty("ImageUrl","./photosynthesis_3_factors/colourless liquid.png") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'container'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'container'
      .setProperty("EnabledPosition","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'container'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"x2", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'x2'
      .setProperty("FillColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'x2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'x2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'x2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'x2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"labels", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'labels'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"thermometer2", _view.labels) // EJsS HtmlView.HtmlView Page: declaration of element 'thermometer2'
      .setProperty("RelativePosition","EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'thermometer2'
      .setProperty("X",-2.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'thermometer2'
      .setProperty("Y",3.) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'thermometer2'
      .setProperty("Text","thermometer") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'thermometer2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow", _view.labels) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow'
      .setProperty("X",-2.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow'
      .setProperty("Y",3) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"aquaticplant", _view.labels) // EJsS HtmlView.HtmlView Page: declaration of element 'aquaticplant'
      .setProperty("RelativePosition","EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'aquaticplant'
      .setProperty("X",-2.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'aquaticplant'
      .setProperty("Y",-2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'aquaticplant'
      .setProperty("Text","aquatic plant") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'aquaticplant'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow2", _view.labels) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow2'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow2'
      .setProperty("SizeX",2.4) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow2'
      .setProperty("X",-2.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow2'
      .setProperty("Y",-2) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow2'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"labellamp", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'labellamp'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"lamp3", _view.labellamp) // EJsS HtmlView.HtmlView Page: declaration of element 'lamp3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'lamp3'
      .setProperty("Attributes",{"animation": "blink 1s step-start infinite"}) // EJsS HtmlView.HtmlView Page: setting property 'Attributes' for element 'lamp3'
      .setProperty("Y",1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'lamp3'
      .setProperty("Text","lamp") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'lamp3'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow32", _view.labellamp) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow32'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow32'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow32'
      .setProperty("Y",1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow32'
      .setProperty("SizeY",2.7) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow32'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow32'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"ruler2", _view.labellamp) // EJsS HtmlView.HtmlView Page: declaration of element 'ruler2'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'ruler2'
      .setProperty("X",11.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'ruler2'
      .setProperty("Y",-9) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'ruler2'
      .setProperty("Text","ruler") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'ruler2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow222222222", _view.labellamp) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow222222222'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow222222222'
      .setProperty("SizeX",0.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow222222222'
      .setProperty("X",11.5) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow222222222'
      .setProperty("Y",-9) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow222222222'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow222222222'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow222222222'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"labels22", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'labels22'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"biolingtube", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'biolingtube'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'biolingtube'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'biolingtube'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'biolingtube'
      .setProperty("Text","boiling tube") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'biolingtube'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow3", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow3'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow3'
      .setProperty("SizeX",-2.2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow3'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow3'
      .setProperty("Y",4) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow3'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow3'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow3'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"beaker2", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'beaker2'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'beaker2'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'beaker2'
      .setProperty("Y",1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'beaker2'
      .setProperty("Text","beaker") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'beaker2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow22", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow22'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow22'
      .setProperty("SizeX",1.2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow22'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow22'
      .setProperty("Y",1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow22'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow22'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow22'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"cutendofplant", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'cutendofplant'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'cutendofplant'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'cutendofplant'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'cutendofplant'
      .setProperty("Text","cut end of plant facing upwards") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'cutendofplant'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow222", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow222'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow222'
      .setProperty("SizeX",3.0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow222'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow222'
      .setProperty("Y",-0.6) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow222'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow222'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow222'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"sodium", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'sodium'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'sodium'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'sodium'
      .setProperty("Y",-1.7) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'sodium'
      .setProperty("Text","sodium hydrogencarbonate \nsolution ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'sodium'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow2222", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow2222'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow2222'
      .setProperty("SizeX",2.45) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow2222'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow2222'
      .setProperty("Y",-1.7) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow2222'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow2222'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow2222'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"waterbath", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'waterbath'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'waterbath'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'waterbath'
      .setProperty("Y",-3) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'waterbath'
      .setProperty("Text","water bath \n(to keep temperature constant)") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'waterbath'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow22222", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow22222'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow22222'
      .setProperty("SizeX",2.) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow22222'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow22222'
      .setProperty("Y",-3) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow22222'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow22222'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow22222'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"tripod2", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'tripod2'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'tripod2'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'tripod2'
      .setProperty("Y",-5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'tripod2'
      .setProperty("Text","tripod") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'tripod2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow222222", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow222222'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow222222'
      .setProperty("SizeX",1.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow222222'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow222222'
      .setProperty("Y",-5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow222222'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow222222'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow222222'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"sodium2", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'sodium2'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'sodium2'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'sodium2'
      .setProperty("Y",-6.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'sodium2'
      .setProperty("Text","sodium hydrogencarbonate \nsolution ") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'sodium2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow2222222", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow2222222'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow2222222'
      .setProperty("SizeX",6.5) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow2222222'
      .setProperty("X",3) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow2222222'
      .setProperty("Y",-6.5) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow2222222'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow2222222'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow2222222'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"stopwatch3", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'stopwatch3'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'stopwatch3'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'stopwatch3'
      .setProperty("Y",-13) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'stopwatch3'
      .setProperty("Text","stopwatch") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'stopwatch3'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrow22222222", _view.labels22) // EJsS HtmlView.HtmlView Page: declaration of element 'arrow22222222'
      .setProperty("MarkEnd","NONE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrow22222222'
      .setProperty("SizeX",3) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'arrow22222222'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'arrow22222222'
      .setProperty("Y",-13) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrow22222222'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrow22222222'
      .setProperty("Offset","NORTH_EAST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'arrow22222222'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"debugging", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'debugging'
      .setProperty("X",-10) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'debugging'
      .setProperty("Y",-10) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'debugging'
      .setProperty("Text","debugging") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'debugging'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'debugging'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'debugging'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panelONE", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'panelONE'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanelxvst0", _view.panelONE) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanelxvst0'
      .setProperty("Height","70vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanelxvst0'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanelxvst0'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanelxvst0'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanelxvst0'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanelxvst0'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanelxvst0'
      .setProperty("AxisYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisYFont' for element 'plottingPanelxvst0'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanelxvst0'
      .setProperty("XTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanelxvst0'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanelxvst0'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanelxvst0'
      .setProperty("TitleYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleYFont' for element 'plottingPanelxvst0'
      .setProperty("TitleXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleXFont' for element 'plottingPanelxvst0'
      .setProperty("Title","Displacement vs. Time") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanelxvst0'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanelxvst0'
      .setProperty("MaximumY",60) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanelxvst0'
      .setProperty("MaximumX",50) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanelxvst0'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanelxvst0'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanelxvst0'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanelxvst0'
      .setProperty("TitleY","Rate of bubbles produced (bubbles / min)") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanelxvst0'
      .setProperty("AxisXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisXFont' for element 'plottingPanelxvst0'
      .setProperty("TitleX","Distance from lamp (cm)") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanelxvst0'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanelxvst0'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanelxvst0'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanelxvst0'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanelxvst0'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanelxvst0'
      ;

    _view._addElement(EJSS_DRAWING2D.analyticCurve,"analyticCurve22", _view.plottingPanelxvst0) // EJsS HtmlView.HtmlView Page: declaration of element 'analyticCurve22'
      .setProperty("FunctionX","x") // EJsS HtmlView.HtmlView Page: setting property 'FunctionX' for element 'analyticCurve22'
      .setProperty("Minimum",10) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'analyticCurve22'
      .setProperty("Maximum",50) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'analyticCurve22'
      .setProperty("Variable","x") // EJsS HtmlView.HtmlView Page: setting property 'Variable' for element 'analyticCurve22'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'analyticCurve22'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'analyticCurve22'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"instantaneousdata3", _view.plottingPanelxvst0) // EJsS HtmlView.HtmlView Page: declaration of element 'instantaneousdata3'
      .setProperty("FillColor","rgba(0,0,255,0.5)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'instantaneousdata3'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'instantaneousdata3'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'instantaneousdata3'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'instantaneousdata3'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'instantaneousdata3'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet3", _view.plottingPanelxvst0) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet3'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeSet3'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shapeSet3'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet3'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shapeSet3'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'shapeSet3'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace3", _view.plottingPanelxvst0) // EJsS HtmlView.HtmlView Page: declaration of element 'trace3'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'trace3'
      .setProperty("Maximum",100) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trace3'
      .setProperty("LineColor","red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trace3'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'trace3'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace3'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace3'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trace3'
      ;

    _view._addElement(EJSS_INTERFACE.dataTable,"dataTable", _view.panelONE) // EJsS HtmlView.HtmlView Page: declaration of element 'dataTable'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'dataTable'
      .setProperty("CellsCSS",{"text-align":"center"}) // EJsS HtmlView.HtmlView Page: setting property 'CellsCSS' for element 'dataTable'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'dataTable'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'dataTable'
      ;

    _view._addElement(EJSS_INTERFACE.arrayPanel,"arrayPanel", _view.panelONE) // EJsS HtmlView.HtmlView Page: declaration of element 'arrayPanel'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView Page: setting property 'Editable' for element 'arrayPanel'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'arrayPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panelTWO", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'panelTWO'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanelxvst2", _view.panelTWO) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanelxvst2'
      .setProperty("Height","70vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanelxvst2'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanelxvst2'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanelxvst2'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanelxvst2'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanelxvst2'
      .setProperty("AxisYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisYFont' for element 'plottingPanelxvst2'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanelxvst2'
      .setProperty("XTickStep",0.2) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanelxvst2'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanelxvst2'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanelxvst2'
      .setProperty("TitleYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleYFont' for element 'plottingPanelxvst2'
      .setProperty("TitleXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleXFont' for element 'plottingPanelxvst2'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanelxvst2'
      .setProperty("MaximumY",60) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanelxvst2'
      .setProperty("MaximumX",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanelxvst2'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanelxvst2'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanelxvst2'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanelxvst2'
      .setProperty("TitleY","Rate of bubbles produced (bubbles / min)") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanelxvst2'
      .setProperty("AxisXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisXFont' for element 'plottingPanelxvst2'
      .setProperty("TitleX","concentration of sodium hydrogen carbonate solution (%)") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanelxvst2'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanelxvst2'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanelxvst2'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanelxvst2'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanelxvst2'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanelxvst2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"instantaneousdata2", _view.plottingPanelxvst2) // EJsS HtmlView.HtmlView Page: declaration of element 'instantaneousdata2'
      .setProperty("FillColor","rgba(255,0,0,0.5)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'instantaneousdata2'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'instantaneousdata2'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'instantaneousdata2'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'instantaneousdata2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'instantaneousdata2'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet2", _view.plottingPanelxvst2) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet2'
      .setProperty("FillColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeSet2'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shapeSet2'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet2'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shapeSet2'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'shapeSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace2", _view.plottingPanelxvst2) // EJsS HtmlView.HtmlView Page: declaration of element 'trace2'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'trace2'
      .setProperty("Maximum",100) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trace2'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trace2'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace2'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace2'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trace2'
      ;

    _view._addElement(EJSS_INTERFACE.dataTable,"dataTable2", _view.panelTWO) // EJsS HtmlView.HtmlView Page: declaration of element 'dataTable2'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'dataTable2'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'dataTable2'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'dataTable2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panelTHREE", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'panelTHREE'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanelxvst3", _view.panelTHREE) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanelxvst3'
      .setProperty("Height","70vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanelxvst3'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanelxvst3'
      .setProperty("Gutters",[50,0,0,50]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanelxvst3'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanelxvst3'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanelxvst3'
      .setProperty("AxisYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisYFont' for element 'plottingPanelxvst3'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanelxvst3'
      .setProperty("XTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanelxvst3'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanelxvst3'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanelxvst3'
      .setProperty("TitleYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleYFont' for element 'plottingPanelxvst3'
      .setProperty("TitleXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleXFont' for element 'plottingPanelxvst3'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanelxvst3'
      .setProperty("MaximumY",60) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanelxvst3'
      .setProperty("MaximumX",50) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanelxvst3'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanelxvst3'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanelxvst3'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanelxvst3'
      .setProperty("TitleY","Rate of bubbles produced (bubbles / min)") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanelxvst3'
      .setProperty("AxisXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisXFont' for element 'plottingPanelxvst3'
      .setProperty("TitleX","temperature (℃)") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanelxvst3'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanelxvst3'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanelxvst3'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanelxvst3'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanelxvst3'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanelxvst3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"instantaneousdata22", _view.plottingPanelxvst3) // EJsS HtmlView.HtmlView Page: declaration of element 'instantaneousdata22'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'instantaneousdata22'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'instantaneousdata22'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'instantaneousdata22'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'instantaneousdata22'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'instantaneousdata22'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet22", _view.plottingPanelxvst3) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet22'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeSet22'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shapeSet22'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet22'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shapeSet22'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'shapeSet22'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace22", _view.plottingPanelxvst3) // EJsS HtmlView.HtmlView Page: declaration of element 'trace22'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'trace22'
      .setProperty("Maximum",100) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trace22'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trace22'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace22'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace22'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trace22'
      ;

    _view._addElement(EJSS_INTERFACE.dataTable,"dataTable22", _view.panelTHREE) // EJsS HtmlView.HtmlView Page: declaration of element 'dataTable22'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'dataTable22'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'dataTable22'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'dataTable22'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanelxvst", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanelxvst'
      .setProperty("Height","90vh") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanelxvst'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanelxvst'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanelxvst'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanelxvst'
      .setProperty("AxisYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisYFont' for element 'plottingPanelxvst'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanelxvst'
      .setProperty("XTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanelxvst'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanelxvst'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanelxvst'
      .setProperty("TitleYFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleYFont' for element 'plottingPanelxvst'
      .setProperty("TitleXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'TitleXFont' for element 'plottingPanelxvst'
      .setProperty("Title","Displacement vs. Time") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanelxvst'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanelxvst'
      .setProperty("MaximumY",60) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanelxvst'
      .setProperty("MaximumX",100) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanelxvst'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanelxvst'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanelxvst'
      .setProperty("MinimumY",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanelxvst'
      .setProperty("TitleY","number of bubbles \nin 1 minute") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanelxvst'
      .setProperty("AxisXFont","normal normal 1vw") // EJsS HtmlView.HtmlView Page: setting property 'AxisXFont' for element 'plottingPanelxvst'
      .setProperty("TitleX","intensity") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanelxvst'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanelxvst'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanelxvst'
      .setProperty("MarginX",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginX' for element 'plottingPanelxvst'
      .setProperty("MarginY",10) // EJsS HtmlView.HtmlView Page: setting property 'MarginY' for element 'plottingPanelxvst'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanelxvst'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'plottingPanelxvst'
      ;

    _view._addElement(EJSS_DRAWING2D.analyticCurve,"analyticCurve2", _view.plottingPanelxvst) // EJsS HtmlView.HtmlView Page: declaration of element 'analyticCurve2'
      .setProperty("FunctionY","50.5/(1+50*exp(-2.5*x+1))-0.5") // EJsS HtmlView.HtmlView Page: setting property 'FunctionY' for element 'analyticCurve2'
      .setProperty("FunctionX","x") // EJsS HtmlView.HtmlView Page: setting property 'FunctionX' for element 'analyticCurve2'
      .setProperty("Minimum",0.2) // EJsS HtmlView.HtmlView Page: setting property 'Minimum' for element 'analyticCurve2'
      .setProperty("Maximum",100) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'analyticCurve2'
      .setProperty("Variable","x") // EJsS HtmlView.HtmlView Page: setting property 'Variable' for element 'analyticCurve2'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'analyticCurve2'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'analyticCurve2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"instantaneousdata", _view.plottingPanelxvst) // EJsS HtmlView.HtmlView Page: declaration of element 'instantaneousdata'
      .setProperty("FillColor","rgba(0,0,255,0.5)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'instantaneousdata'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'instantaneousdata'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'instantaneousdata'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'instantaneousdata'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'instantaneousdata'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet", _view.plottingPanelxvst) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet'
      .setProperty("FillColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'shapeSet'
      .setProperty("SizeX",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'shapeSet'
      .setProperty("ShapeType","WHEEL") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet'
      .setProperty("SizeY",20) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'shapeSet'
      .setProperty("PixelSize",true) // EJsS HtmlView.HtmlView Page: setting property 'PixelSize' for element 'shapeSet'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace", _view.plottingPanelxvst) // EJsS HtmlView.HtmlView Page: declaration of element 'trace'
      .setProperty("Active",true) // EJsS HtmlView.HtmlView Page: setting property 'Active' for element 'trace'
      .setProperty("Maximum",100) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'trace'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'trace'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'trace'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"html", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'html'
      .setProperty("CSS",{"line-height": "1.5em"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'html'
      .setProperty("Html","<h2>Introduction</h2> <p>Plants make food through a process called photosynthesis.</p> <p>Activity 1: Let’s find out how the amount of light can affect photosynthesis through this activity. Record your observations by filling in your own table of amount of light versus amount of oxygen produced, using the automated graph readings as data.</p> <p>When the amount of light increased, the plant produced more oxygen. Hence, the rate of photosynthesis increased when the amount of light increased.</p> <p>Activity 2: Let’s find out how the amount of carbon dioxide can affect photosynthesis through this activity. Record your observations by filling in your own table of amount of light versus amount of oxygen produced, using the automated graph readings as data.</p> <p>When the amount of carbon dioxide increased, the plant produced more oxygen. Hence, the rate of photosynthesis increased when the amount of carbon dioxide increased.</p> <h2>Critical thinking skills</h2> <p>More light generally equates to higher levels of photosynthesis. However, as the light intensity increases, the photosynthetic rate eventually reaches a maximum point. This point where the light intensity does not increase the photosynthesis rate is called the light saturation point. </p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'html'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'html'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new photosynthesis_3_factors("_topFrame","_ejs_library/",null);
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
