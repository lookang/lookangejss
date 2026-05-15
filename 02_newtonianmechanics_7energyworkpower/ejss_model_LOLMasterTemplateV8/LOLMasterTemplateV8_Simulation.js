/* _inputParameters: an object with different values for the model parameters */
function LOLMasterTemplateV8(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var title; // EjsS Model.Variables.toEdit.title
  var systemText2; // EjsS Model.Variables.toEdit.systemText2
  var initialState; // EjsS Model.Variables.toEdit.initialState
  var initialState2; // EjsS Model.Variables.toEdit.initialState2
  var finalState; // EjsS Model.Variables.toEdit.finalState
  var finalState2; // EjsS Model.Variables.toEdit.finalState2
  var remarks2; // EjsS Model.Variables.toEdit.remarks2

  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var debuggg; // EjsS Model.Variables.layout.debuggg
  var debugggTR; // EjsS Model.Variables.layout.debugggTR

  var editing; // EjsS Model.Variables.settings.editing
  var physicsonly; // EjsS Model.Variables.settings.physicsonly
  var versions; // EjsS Model.Variables.settings.versions
  var revealRadioButton; // EjsS Model.Variables.settings.revealRadioButton
  var isC; // EjsS Model.Variables.settings.isC
  var isE; // EjsS Model.Variables.settings.isE
  var isG; // EjsS Model.Variables.settings.isG
  var isI; // EjsS Model.Variables.settings.isI
  var isK; // EjsS Model.Variables.settings.isK
  var isN; // EjsS Model.Variables.settings.isN
  var ignoreEnergyLst; // EjsS Model.Variables.settings.ignoreEnergyLst
  var check3a; // EjsS Model.Variables.settings.check3a
  var check3b; // EjsS Model.Variables.settings.check3b
  var check4a; // EjsS Model.Variables.settings.check4a
  var check4b; // EjsS Model.Variables.settings.check4b
  var check3aEnergy; // EjsS Model.Variables.settings.check3aEnergy
  var check3bEnergy; // EjsS Model.Variables.settings.check3bEnergy
  var check4aEnergy; // EjsS Model.Variables.settings.check4aEnergy
  var check4bEnergy; // EjsS Model.Variables.settings.check4bEnergy
  var check3aReason; // EjsS Model.Variables.settings.check3aReason
  var check3bReason; // EjsS Model.Variables.settings.check3bReason
  var check4aReason; // EjsS Model.Variables.settings.check4aReason
  var check4bReason; // EjsS Model.Variables.settings.check4bReason
  var iniC; // EjsS Model.Variables.settings.iniC
  var iniE; // EjsS Model.Variables.settings.iniE
  var iniG; // EjsS Model.Variables.settings.iniG
  var iniI; // EjsS Model.Variables.settings.iniI
  var iniK; // EjsS Model.Variables.settings.iniK
  var iniN; // EjsS Model.Variables.settings.iniN
  var finC; // EjsS Model.Variables.settings.finC
  var finE; // EjsS Model.Variables.settings.finE
  var finG; // EjsS Model.Variables.settings.finG
  var finI; // EjsS Model.Variables.settings.finI
  var finK; // EjsS Model.Variables.settings.finK
  var finN; // EjsS Model.Variables.settings.finN
  var check7a; // EjsS Model.Variables.settings.check7a
  var operators; // EjsS Model.Variables.settings.operators
  var finalC; // EjsS Model.Variables.settings.finalC
  var finalE; // EjsS Model.Variables.settings.finalE
  var finalG; // EjsS Model.Variables.settings.finalG
  var finalI; // EjsS Model.Variables.settings.finalI
  var finalK; // EjsS Model.Variables.settings.finalK
  var finalN; // EjsS Model.Variables.settings.finalN
  var passfail; // EjsS Model.Variables.settings.passfail
  var inequalityCheckLst; // EjsS Model.Variables.settings.inequalityCheckLst
  var userPlay; // EjsS Model.Variables.settings.userPlay
  var displayChemical; // EjsS Model.Variables.settings.displayChemical
  var displayElastic; // EjsS Model.Variables.settings.displayElastic
  var displayGravitational; // EjsS Model.Variables.settings.displayGravitational
  var displayInternal; // EjsS Model.Variables.settings.displayInternal
  var displayKinetic; // EjsS Model.Variables.settings.displayKinetic
  var displayNuclear; // EjsS Model.Variables.settings.displayNuclear
  var PropagationofWaves; // EjsS Model.Variables.settings.PropagationofWaves
  var Mechanically; // EjsS Model.Variables.settings.Mechanically
  var Electrically; // EjsS Model.Variables.settings.Electrically

  var nEnergy; // EjsS Model.Variables.Var Table.nEnergy
  var C; // EjsS Model.Variables.Var Table.C
  var E; // EjsS Model.Variables.Var Table.E
  var G; // EjsS Model.Variables.Var Table.G
  var I; // EjsS Model.Variables.Var Table.I
  var K; // EjsS Model.Variables.Var Table.K
  var N; // EjsS Model.Variables.Var Table.N
  var iniTotalEnergy; // EjsS Model.Variables.Var Table.iniTotalEnergy
  var fC; // EjsS Model.Variables.Var Table.fC
  var fE; // EjsS Model.Variables.Var Table.fE
  var fG; // EjsS Model.Variables.Var Table.fG
  var fI; // EjsS Model.Variables.Var Table.fI
  var fK; // EjsS Model.Variables.Var Table.fK
  var fN; // EjsS Model.Variables.Var Table.fN
  var finTotalEnergy; // EjsS Model.Variables.Var Table.finTotalEnergy
  var updateTransIN; // EjsS Model.Variables.Var Table.updateTransIN
  var transIN; // EjsS Model.Variables.Var Table.transIN
  var updateTransOUT; // EjsS Model.Variables.Var Table.updateTransOUT
  var transOUT; // EjsS Model.Variables.Var Table.transOUT
  var EtransIN; // EjsS Model.Variables.Var Table.EtransIN
  var EtransOUT; // EjsS Model.Variables.Var Table.EtransOUT
  var transIN2; // EjsS Model.Variables.Var Table.transIN2
  var transOUT2; // EjsS Model.Variables.Var Table.transOUT2
  var updateTransIN2; // EjsS Model.Variables.Var Table.updateTransIN2
  var updateTransOUT2; // EjsS Model.Variables.Var Table.updateTransOUT2
  var EtransIN2; // EjsS Model.Variables.Var Table.EtransIN2
  var EtransOUT2; // EjsS Model.Variables.Var Table.EtransOUT2

  var energyXpos; // EjsS Model.Variables.draw_L.energyXpos
  var interactPrompt1; // EjsS Model.Variables.draw_L.interactPrompt1
  var interactPrompt2; // EjsS Model.Variables.draw_L.interactPrompt2
  var show3D; // EjsS Model.Variables.draw_L.show3D
  var show2D; // EjsS Model.Variables.draw_L.show2D
  var size2DX; // EjsS Model.Variables.draw_L.size2DX
  var size2DY; // EjsS Model.Variables.draw_L.size2DY
  var size3DX; // EjsS Model.Variables.draw_L.size3DX
  var size3DY; // EjsS Model.Variables.draw_L.size3DY
  var energyColour; // EjsS Model.Variables.draw_L.energyColour
  var promptLineColour; // EjsS Model.Variables.draw_L.promptLineColour

  var pi; // EjsS Model.Variables.draw_O.pi
  var imgIN; // EjsS Model.Variables.draw_O.imgIN
  var imgOUT; // EjsS Model.Variables.draw_O.imgOUT
  var imgIN2; // EjsS Model.Variables.draw_O.imgIN2
  var imgOUT2; // EjsS Model.Variables.draw_O.imgOUT2
  var imgSIZE; // EjsS Model.Variables.draw_O.imgSIZE
  var imgIconSIZE; // EjsS Model.Variables.draw_O.imgIconSIZE
  var energyWidth; // EjsS Model.Variables.draw_O.energyWidth
  var updateAnswer; // EjsS Model.Variables.draw_O.updateAnswer
  var answer; // EjsS Model.Variables.draw_O.answer
  var answerY; // EjsS Model.Variables.draw_O.answerY
  var answerColour; // EjsS Model.Variables.draw_O.answerColour
  var showAnswer; // EjsS Model.Variables.draw_O.showAnswer
  var showHint; // EjsS Model.Variables.draw_O.showHint
  var hintY; // EjsS Model.Variables.draw_O.hintY
  var hint; // EjsS Model.Variables.draw_O.hint
  var hintFont; // EjsS Model.Variables.draw_O.hintFont
  var INimgX; // EjsS Model.Variables.draw_O.INimgX
  var INimgY; // EjsS Model.Variables.draw_O.INimgY
  var INenergyX; // EjsS Model.Variables.draw_O.INenergyX
  var INenergyY; // EjsS Model.Variables.draw_O.INenergyY
  var INtextX; // EjsS Model.Variables.draw_O.INtextX
  var INtextY; // EjsS Model.Variables.draw_O.INtextY
  var INinteract; // EjsS Model.Variables.draw_O.INinteract
  var IN2imgX; // EjsS Model.Variables.draw_O.IN2imgX
  var IN2imgY; // EjsS Model.Variables.draw_O.IN2imgY
  var IN2energyX; // EjsS Model.Variables.draw_O.IN2energyX
  var IN2energyY; // EjsS Model.Variables.draw_O.IN2energyY
  var IN2textX; // EjsS Model.Variables.draw_O.IN2textX
  var IN2textY; // EjsS Model.Variables.draw_O.IN2textY
  var IN2interact; // EjsS Model.Variables.draw_O.IN2interact
  var OUTimgX; // EjsS Model.Variables.draw_O.OUTimgX
  var OUTimgY; // EjsS Model.Variables.draw_O.OUTimgY
  var OUTenergyX; // EjsS Model.Variables.draw_O.OUTenergyX
  var OUTenergyY; // EjsS Model.Variables.draw_O.OUTenergyY
  var OUTtextX; // EjsS Model.Variables.draw_O.OUTtextX
  var OUTtextY; // EjsS Model.Variables.draw_O.OUTtextY
  var OUTinteract; // EjsS Model.Variables.draw_O.OUTinteract
  var OUT2imgX; // EjsS Model.Variables.draw_O.OUT2imgX
  var OUT2imgY; // EjsS Model.Variables.draw_O.OUT2imgY
  var OUT2energyX; // EjsS Model.Variables.draw_O.OUT2energyX
  var OUT2energyY; // EjsS Model.Variables.draw_O.OUT2energyY
  var OUT2textX; // EjsS Model.Variables.draw_O.OUT2textX
  var OUT2textY; // EjsS Model.Variables.draw_O.OUT2textY
  var OUT2interact; // EjsS Model.Variables.draw_O.OUT2interact

  var fillColorforDrag; // EjsS Model.Variables.lookang.fillColorforDrag
  var dragSizeY; // EjsS Model.Variables.lookang.dragSizeY
  var editBackgroundColor; // EjsS Model.Variables.lookang.editBackgroundColor
  var systemText; // EjsS Model.Variables.lookang.systemText
  var elementInteracted; // EjsS Model.Variables.lookang.elementInteracted
  var remarks; // EjsS Model.Variables.lookang.remarks
  var font; // EjsS Model.Variables.lookang.font
  var arrowLength; // EjsS Model.Variables.lookang.arrowLength
  var energyInArrowX; // EjsS Model.Variables.lookang.energyInArrowX
  var energyInArrowY; // EjsS Model.Variables.lookang.energyInArrowY
  var angleIN; // EjsS Model.Variables.lookang.angleIN
  var angleOUT; // EjsS Model.Variables.lookang.angleOUT
  var energyOutArrowX; // EjsS Model.Variables.lookang.energyOutArrowX
  var energyOutArrowY; // EjsS Model.Variables.lookang.energyOutArrowY
  var energyIn2ArrowX; // EjsS Model.Variables.lookang.energyIn2ArrowX
  var energyIn2ArrowY; // EjsS Model.Variables.lookang.energyIn2ArrowY
  var energyOut2ArrowX; // EjsS Model.Variables.lookang.energyOut2ArrowX
  var energyOut2ArrowY; // EjsS Model.Variables.lookang.energyOut2ArrowY
  var dragCY; // EjsS Model.Variables.lookang.dragCY
  var dragEY; // EjsS Model.Variables.lookang.dragEY
  var dragGY; // EjsS Model.Variables.lookang.dragGY
  var dragIY; // EjsS Model.Variables.lookang.dragIY
  var dragKY; // EjsS Model.Variables.lookang.dragKY
  var dragNY; // EjsS Model.Variables.lookang.dragNY
  var dragC2Y; // EjsS Model.Variables.lookang.dragC2Y
  var dragE2Y; // EjsS Model.Variables.lookang.dragE2Y
  var dragG2Y; // EjsS Model.Variables.lookang.dragG2Y
  var dragI2Y; // EjsS Model.Variables.lookang.dragI2Y
  var dragK2Y; // EjsS Model.Variables.lookang.dragK2Y
  var dragN2Y; // EjsS Model.Variables.lookang.dragN2Y
  var dragEtransIN; // EjsS Model.Variables.lookang.dragEtransIN
  var dragEtransIN2; // EjsS Model.Variables.lookang.dragEtransIN2
  var dragEtransOUT; // EjsS Model.Variables.lookang.dragEtransOUT
  var dragEtransOUT2; // EjsS Model.Variables.lookang.dragEtransOUT2
  var iniEnergiesLst; // EjsS Model.Variables.lookang.iniEnergiesLst
  var finEnergiesLst; // EjsS Model.Variables.lookang.finEnergiesLst
  var dragEnergiesLst; // EjsS Model.Variables.lookang.dragEnergiesLst
  var dragEnergies2Lst; // EjsS Model.Variables.lookang.dragEnergies2Lst
  var customOrder; // EjsS Model.Variables.lookang.customOrder

  var formulaText; // EjsS Model.Variables.description.formulaText
  var legendText; // EjsS Model.Variables.description.legendText
  var eTooltip; // EjsS Model.Variables.description.eTooltip
  var hTooltip; // EjsS Model.Variables.description.hTooltip
  var mTooltip; // EjsS Model.Variables.description.mTooltip
  var pTooltip; // EjsS Model.Variables.description.pTooltip

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      title : title,
      systemText2 : systemText2,
      initialState : initialState,
      initialState2 : initialState2,
      finalState : finalState,
      finalState2 : finalState2,
      remarks2 : remarks2,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      debuggg : debuggg,
      debugggTR : debugggTR,
      editing : editing,
      physicsonly : physicsonly,
      versions : versions,
      revealRadioButton : revealRadioButton,
      isC : isC,
      isE : isE,
      isG : isG,
      isI : isI,
      isK : isK,
      isN : isN,
      ignoreEnergyLst : ignoreEnergyLst,
      check3a : check3a,
      check3b : check3b,
      check4a : check4a,
      check4b : check4b,
      check3aEnergy : check3aEnergy,
      check3bEnergy : check3bEnergy,
      check4aEnergy : check4aEnergy,
      check4bEnergy : check4bEnergy,
      check3aReason : check3aReason,
      check3bReason : check3bReason,
      check4aReason : check4aReason,
      check4bReason : check4bReason,
      iniC : iniC,
      iniE : iniE,
      iniG : iniG,
      iniI : iniI,
      iniK : iniK,
      iniN : iniN,
      finC : finC,
      finE : finE,
      finG : finG,
      finI : finI,
      finK : finK,
      finN : finN,
      check7a : check7a,
      operators : operators,
      finalC : finalC,
      finalE : finalE,
      finalG : finalG,
      finalI : finalI,
      finalK : finalK,
      finalN : finalN,
      passfail : passfail,
      inequalityCheckLst : inequalityCheckLst,
      userPlay : userPlay,
      displayChemical : displayChemical,
      displayElastic : displayElastic,
      displayGravitational : displayGravitational,
      displayInternal : displayInternal,
      displayKinetic : displayKinetic,
      displayNuclear : displayNuclear,
      PropagationofWaves : PropagationofWaves,
      Mechanically : Mechanically,
      Electrically : Electrically,
      nEnergy : nEnergy,
      C : C,
      E : E,
      G : G,
      I : I,
      K : K,
      N : N,
      iniTotalEnergy : iniTotalEnergy,
      fC : fC,
      fE : fE,
      fG : fG,
      fI : fI,
      fK : fK,
      fN : fN,
      finTotalEnergy : finTotalEnergy,
      updateTransIN : updateTransIN,
      transIN : transIN,
      updateTransOUT : updateTransOUT,
      transOUT : transOUT,
      EtransIN : EtransIN,
      EtransOUT : EtransOUT,
      transIN2 : transIN2,
      transOUT2 : transOUT2,
      updateTransIN2 : updateTransIN2,
      updateTransOUT2 : updateTransOUT2,
      EtransIN2 : EtransIN2,
      EtransOUT2 : EtransOUT2,
      energyXpos : energyXpos,
      interactPrompt1 : interactPrompt1,
      interactPrompt2 : interactPrompt2,
      show3D : show3D,
      show2D : show2D,
      size2DX : size2DX,
      size2DY : size2DY,
      size3DX : size3DX,
      size3DY : size3DY,
      energyColour : energyColour,
      promptLineColour : promptLineColour,
      pi : pi,
      imgIN : imgIN,
      imgOUT : imgOUT,
      imgIN2 : imgIN2,
      imgOUT2 : imgOUT2,
      imgSIZE : imgSIZE,
      imgIconSIZE : imgIconSIZE,
      energyWidth : energyWidth,
      updateAnswer : updateAnswer,
      answer : answer,
      answerY : answerY,
      answerColour : answerColour,
      showAnswer : showAnswer,
      showHint : showHint,
      hintY : hintY,
      hint : hint,
      hintFont : hintFont,
      INimgX : INimgX,
      INimgY : INimgY,
      INenergyX : INenergyX,
      INenergyY : INenergyY,
      INtextX : INtextX,
      INtextY : INtextY,
      INinteract : INinteract,
      IN2imgX : IN2imgX,
      IN2imgY : IN2imgY,
      IN2energyX : IN2energyX,
      IN2energyY : IN2energyY,
      IN2textX : IN2textX,
      IN2textY : IN2textY,
      IN2interact : IN2interact,
      OUTimgX : OUTimgX,
      OUTimgY : OUTimgY,
      OUTenergyX : OUTenergyX,
      OUTenergyY : OUTenergyY,
      OUTtextX : OUTtextX,
      OUTtextY : OUTtextY,
      OUTinteract : OUTinteract,
      OUT2imgX : OUT2imgX,
      OUT2imgY : OUT2imgY,
      OUT2energyX : OUT2energyX,
      OUT2energyY : OUT2energyY,
      OUT2textX : OUT2textX,
      OUT2textY : OUT2textY,
      OUT2interact : OUT2interact,
      fillColorforDrag : fillColorforDrag,
      dragSizeY : dragSizeY,
      editBackgroundColor : editBackgroundColor,
      systemText : systemText,
      elementInteracted : elementInteracted,
      remarks : remarks,
      font : font,
      arrowLength : arrowLength,
      energyInArrowX : energyInArrowX,
      energyInArrowY : energyInArrowY,
      angleIN : angleIN,
      angleOUT : angleOUT,
      energyOutArrowX : energyOutArrowX,
      energyOutArrowY : energyOutArrowY,
      energyIn2ArrowX : energyIn2ArrowX,
      energyIn2ArrowY : energyIn2ArrowY,
      energyOut2ArrowX : energyOut2ArrowX,
      energyOut2ArrowY : energyOut2ArrowY,
      dragCY : dragCY,
      dragEY : dragEY,
      dragGY : dragGY,
      dragIY : dragIY,
      dragKY : dragKY,
      dragNY : dragNY,
      dragC2Y : dragC2Y,
      dragE2Y : dragE2Y,
      dragG2Y : dragG2Y,
      dragI2Y : dragI2Y,
      dragK2Y : dragK2Y,
      dragN2Y : dragN2Y,
      dragEtransIN : dragEtransIN,
      dragEtransIN2 : dragEtransIN2,
      dragEtransOUT : dragEtransOUT,
      dragEtransOUT2 : dragEtransOUT2,
      iniEnergiesLst : iniEnergiesLst,
      finEnergiesLst : finEnergiesLst,
      dragEnergiesLst : dragEnergiesLst,
      dragEnergies2Lst : dragEnergies2Lst,
      customOrder : customOrder,
      formulaText : formulaText,
      legendText : legendText,
      eTooltip : eTooltip,
      hTooltip : hTooltip,
      mTooltip : mTooltip,
      pTooltip : pTooltip
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      title : title,
      systemText2 : systemText2,
      initialState : initialState,
      initialState2 : initialState2,
      finalState : finalState,
      finalState2 : finalState2,
      remarks2 : remarks2,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      debuggg : debuggg,
      debugggTR : debugggTR,
      editing : editing,
      physicsonly : physicsonly,
      versions : versions,
      revealRadioButton : revealRadioButton,
      isC : isC,
      isE : isE,
      isG : isG,
      isI : isI,
      isK : isK,
      isN : isN,
      ignoreEnergyLst : ignoreEnergyLst,
      check3a : check3a,
      check3b : check3b,
      check4a : check4a,
      check4b : check4b,
      check3aEnergy : check3aEnergy,
      check3bEnergy : check3bEnergy,
      check4aEnergy : check4aEnergy,
      check4bEnergy : check4bEnergy,
      check3aReason : check3aReason,
      check3bReason : check3bReason,
      check4aReason : check4aReason,
      check4bReason : check4bReason,
      iniC : iniC,
      iniE : iniE,
      iniG : iniG,
      iniI : iniI,
      iniK : iniK,
      iniN : iniN,
      finC : finC,
      finE : finE,
      finG : finG,
      finI : finI,
      finK : finK,
      finN : finN,
      check7a : check7a,
      operators : operators,
      finalC : finalC,
      finalE : finalE,
      finalG : finalG,
      finalI : finalI,
      finalK : finalK,
      finalN : finalN,
      passfail : passfail,
      inequalityCheckLst : inequalityCheckLst,
      userPlay : userPlay,
      displayChemical : displayChemical,
      displayElastic : displayElastic,
      displayGravitational : displayGravitational,
      displayInternal : displayInternal,
      displayKinetic : displayKinetic,
      displayNuclear : displayNuclear,
      PropagationofWaves : PropagationofWaves,
      Mechanically : Mechanically,
      Electrically : Electrically,
      nEnergy : nEnergy,
      C : C,
      E : E,
      G : G,
      I : I,
      K : K,
      N : N,
      iniTotalEnergy : iniTotalEnergy,
      fC : fC,
      fE : fE,
      fG : fG,
      fI : fI,
      fK : fK,
      fN : fN,
      finTotalEnergy : finTotalEnergy,
      updateTransIN : updateTransIN,
      transIN : transIN,
      updateTransOUT : updateTransOUT,
      transOUT : transOUT,
      EtransIN : EtransIN,
      EtransOUT : EtransOUT,
      transIN2 : transIN2,
      transOUT2 : transOUT2,
      updateTransIN2 : updateTransIN2,
      updateTransOUT2 : updateTransOUT2,
      EtransIN2 : EtransIN2,
      EtransOUT2 : EtransOUT2,
      energyXpos : energyXpos,
      interactPrompt1 : interactPrompt1,
      interactPrompt2 : interactPrompt2,
      show3D : show3D,
      show2D : show2D,
      size2DX : size2DX,
      size2DY : size2DY,
      size3DX : size3DX,
      size3DY : size3DY,
      energyColour : energyColour,
      promptLineColour : promptLineColour,
      pi : pi,
      imgIN : imgIN,
      imgOUT : imgOUT,
      imgIN2 : imgIN2,
      imgOUT2 : imgOUT2,
      imgSIZE : imgSIZE,
      imgIconSIZE : imgIconSIZE,
      energyWidth : energyWidth,
      updateAnswer : updateAnswer,
      answer : answer,
      answerY : answerY,
      answerColour : answerColour,
      showAnswer : showAnswer,
      showHint : showHint,
      hintY : hintY,
      hint : hint,
      hintFont : hintFont,
      INimgX : INimgX,
      INimgY : INimgY,
      INenergyX : INenergyX,
      INenergyY : INenergyY,
      INtextX : INtextX,
      INtextY : INtextY,
      INinteract : INinteract,
      IN2imgX : IN2imgX,
      IN2imgY : IN2imgY,
      IN2energyX : IN2energyX,
      IN2energyY : IN2energyY,
      IN2textX : IN2textX,
      IN2textY : IN2textY,
      IN2interact : IN2interact,
      OUTimgX : OUTimgX,
      OUTimgY : OUTimgY,
      OUTenergyX : OUTenergyX,
      OUTenergyY : OUTenergyY,
      OUTtextX : OUTtextX,
      OUTtextY : OUTtextY,
      OUTinteract : OUTinteract,
      OUT2imgX : OUT2imgX,
      OUT2imgY : OUT2imgY,
      OUT2energyX : OUT2energyX,
      OUT2energyY : OUT2energyY,
      OUT2textX : OUT2textX,
      OUT2textY : OUT2textY,
      OUT2interact : OUT2interact,
      fillColorforDrag : fillColorforDrag,
      dragSizeY : dragSizeY,
      editBackgroundColor : editBackgroundColor,
      systemText : systemText,
      elementInteracted : elementInteracted,
      remarks : remarks,
      font : font,
      arrowLength : arrowLength,
      energyInArrowX : energyInArrowX,
      energyInArrowY : energyInArrowY,
      angleIN : angleIN,
      angleOUT : angleOUT,
      energyOutArrowX : energyOutArrowX,
      energyOutArrowY : energyOutArrowY,
      energyIn2ArrowX : energyIn2ArrowX,
      energyIn2ArrowY : energyIn2ArrowY,
      energyOut2ArrowX : energyOut2ArrowX,
      energyOut2ArrowY : energyOut2ArrowY,
      dragCY : dragCY,
      dragEY : dragEY,
      dragGY : dragGY,
      dragIY : dragIY,
      dragKY : dragKY,
      dragNY : dragNY,
      dragC2Y : dragC2Y,
      dragE2Y : dragE2Y,
      dragG2Y : dragG2Y,
      dragI2Y : dragI2Y,
      dragK2Y : dragK2Y,
      dragN2Y : dragN2Y,
      dragEtransIN : dragEtransIN,
      dragEtransIN2 : dragEtransIN2,
      dragEtransOUT : dragEtransOUT,
      dragEtransOUT2 : dragEtransOUT2,
      iniEnergiesLst : iniEnergiesLst,
      finEnergiesLst : finEnergiesLst,
      dragEnergiesLst : dragEnergiesLst,
      dragEnergies2Lst : dragEnergies2Lst,
      customOrder : customOrder,
      formulaText : formulaText,
      legendText : legendText,
      eTooltip : eTooltip,
      hTooltip : hTooltip,
      mTooltip : mTooltip,
      pTooltip : pTooltip
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.title != "undefined") title = json.title;
    if(typeof json.systemText2 != "undefined") systemText2 = json.systemText2;
    if(typeof json.initialState != "undefined") initialState = json.initialState;
    if(typeof json.initialState2 != "undefined") initialState2 = json.initialState2;
    if(typeof json.finalState != "undefined") finalState = json.finalState;
    if(typeof json.finalState2 != "undefined") finalState2 = json.finalState2;
    if(typeof json.remarks2 != "undefined") remarks2 = json.remarks2;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.debuggg != "undefined") debuggg = json.debuggg;
    if(typeof json.debugggTR != "undefined") debugggTR = json.debugggTR;
    if(typeof json.editing != "undefined") editing = json.editing;
    if(typeof json.physicsonly != "undefined") physicsonly = json.physicsonly;
    if(typeof json.versions != "undefined") versions = json.versions;
    if(typeof json.revealRadioButton != "undefined") revealRadioButton = json.revealRadioButton;
    if(typeof json.isC != "undefined") isC = json.isC;
    if(typeof json.isE != "undefined") isE = json.isE;
    if(typeof json.isG != "undefined") isG = json.isG;
    if(typeof json.isI != "undefined") isI = json.isI;
    if(typeof json.isK != "undefined") isK = json.isK;
    if(typeof json.isN != "undefined") isN = json.isN;
    if(typeof json.ignoreEnergyLst != "undefined") ignoreEnergyLst = json.ignoreEnergyLst;
    if(typeof json.check3a != "undefined") check3a = json.check3a;
    if(typeof json.check3b != "undefined") check3b = json.check3b;
    if(typeof json.check4a != "undefined") check4a = json.check4a;
    if(typeof json.check4b != "undefined") check4b = json.check4b;
    if(typeof json.check3aEnergy != "undefined") check3aEnergy = json.check3aEnergy;
    if(typeof json.check3bEnergy != "undefined") check3bEnergy = json.check3bEnergy;
    if(typeof json.check4aEnergy != "undefined") check4aEnergy = json.check4aEnergy;
    if(typeof json.check4bEnergy != "undefined") check4bEnergy = json.check4bEnergy;
    if(typeof json.check3aReason != "undefined") check3aReason = json.check3aReason;
    if(typeof json.check3bReason != "undefined") check3bReason = json.check3bReason;
    if(typeof json.check4aReason != "undefined") check4aReason = json.check4aReason;
    if(typeof json.check4bReason != "undefined") check4bReason = json.check4bReason;
    if(typeof json.iniC != "undefined") iniC = json.iniC;
    if(typeof json.iniE != "undefined") iniE = json.iniE;
    if(typeof json.iniG != "undefined") iniG = json.iniG;
    if(typeof json.iniI != "undefined") iniI = json.iniI;
    if(typeof json.iniK != "undefined") iniK = json.iniK;
    if(typeof json.iniN != "undefined") iniN = json.iniN;
    if(typeof json.finC != "undefined") finC = json.finC;
    if(typeof json.finE != "undefined") finE = json.finE;
    if(typeof json.finG != "undefined") finG = json.finG;
    if(typeof json.finI != "undefined") finI = json.finI;
    if(typeof json.finK != "undefined") finK = json.finK;
    if(typeof json.finN != "undefined") finN = json.finN;
    if(typeof json.check7a != "undefined") check7a = json.check7a;
    if(typeof json.operators != "undefined") operators = json.operators;
    if(typeof json.finalC != "undefined") finalC = json.finalC;
    if(typeof json.finalE != "undefined") finalE = json.finalE;
    if(typeof json.finalG != "undefined") finalG = json.finalG;
    if(typeof json.finalI != "undefined") finalI = json.finalI;
    if(typeof json.finalK != "undefined") finalK = json.finalK;
    if(typeof json.finalN != "undefined") finalN = json.finalN;
    if(typeof json.passfail != "undefined") passfail = json.passfail;
    if(typeof json.inequalityCheckLst != "undefined") inequalityCheckLst = json.inequalityCheckLst;
    if(typeof json.userPlay != "undefined") userPlay = json.userPlay;
    if(typeof json.displayChemical != "undefined") displayChemical = json.displayChemical;
    if(typeof json.displayElastic != "undefined") displayElastic = json.displayElastic;
    if(typeof json.displayGravitational != "undefined") displayGravitational = json.displayGravitational;
    if(typeof json.displayInternal != "undefined") displayInternal = json.displayInternal;
    if(typeof json.displayKinetic != "undefined") displayKinetic = json.displayKinetic;
    if(typeof json.displayNuclear != "undefined") displayNuclear = json.displayNuclear;
    if(typeof json.PropagationofWaves != "undefined") PropagationofWaves = json.PropagationofWaves;
    if(typeof json.Mechanically != "undefined") Mechanically = json.Mechanically;
    if(typeof json.Electrically != "undefined") Electrically = json.Electrically;
    if(typeof json.nEnergy != "undefined") nEnergy = json.nEnergy;
    if(typeof json.C != "undefined") C = json.C;
    if(typeof json.E != "undefined") E = json.E;
    if(typeof json.G != "undefined") G = json.G;
    if(typeof json.I != "undefined") I = json.I;
    if(typeof json.K != "undefined") K = json.K;
    if(typeof json.N != "undefined") N = json.N;
    if(typeof json.iniTotalEnergy != "undefined") iniTotalEnergy = json.iniTotalEnergy;
    if(typeof json.fC != "undefined") fC = json.fC;
    if(typeof json.fE != "undefined") fE = json.fE;
    if(typeof json.fG != "undefined") fG = json.fG;
    if(typeof json.fI != "undefined") fI = json.fI;
    if(typeof json.fK != "undefined") fK = json.fK;
    if(typeof json.fN != "undefined") fN = json.fN;
    if(typeof json.finTotalEnergy != "undefined") finTotalEnergy = json.finTotalEnergy;
    if(typeof json.updateTransIN != "undefined") updateTransIN = json.updateTransIN;
    if(typeof json.transIN != "undefined") transIN = json.transIN;
    if(typeof json.updateTransOUT != "undefined") updateTransOUT = json.updateTransOUT;
    if(typeof json.transOUT != "undefined") transOUT = json.transOUT;
    if(typeof json.EtransIN != "undefined") EtransIN = json.EtransIN;
    if(typeof json.EtransOUT != "undefined") EtransOUT = json.EtransOUT;
    if(typeof json.transIN2 != "undefined") transIN2 = json.transIN2;
    if(typeof json.transOUT2 != "undefined") transOUT2 = json.transOUT2;
    if(typeof json.updateTransIN2 != "undefined") updateTransIN2 = json.updateTransIN2;
    if(typeof json.updateTransOUT2 != "undefined") updateTransOUT2 = json.updateTransOUT2;
    if(typeof json.EtransIN2 != "undefined") EtransIN2 = json.EtransIN2;
    if(typeof json.EtransOUT2 != "undefined") EtransOUT2 = json.EtransOUT2;
    if(typeof json.energyXpos != "undefined") energyXpos = json.energyXpos;
    if(typeof json.interactPrompt1 != "undefined") interactPrompt1 = json.interactPrompt1;
    if(typeof json.interactPrompt2 != "undefined") interactPrompt2 = json.interactPrompt2;
    if(typeof json.show3D != "undefined") show3D = json.show3D;
    if(typeof json.show2D != "undefined") show2D = json.show2D;
    if(typeof json.size2DX != "undefined") size2DX = json.size2DX;
    if(typeof json.size2DY != "undefined") size2DY = json.size2DY;
    if(typeof json.size3DX != "undefined") size3DX = json.size3DX;
    if(typeof json.size3DY != "undefined") size3DY = json.size3DY;
    if(typeof json.energyColour != "undefined") energyColour = json.energyColour;
    if(typeof json.promptLineColour != "undefined") promptLineColour = json.promptLineColour;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.imgIN != "undefined") imgIN = json.imgIN;
    if(typeof json.imgOUT != "undefined") imgOUT = json.imgOUT;
    if(typeof json.imgIN2 != "undefined") imgIN2 = json.imgIN2;
    if(typeof json.imgOUT2 != "undefined") imgOUT2 = json.imgOUT2;
    if(typeof json.imgSIZE != "undefined") imgSIZE = json.imgSIZE;
    if(typeof json.imgIconSIZE != "undefined") imgIconSIZE = json.imgIconSIZE;
    if(typeof json.energyWidth != "undefined") energyWidth = json.energyWidth;
    if(typeof json.updateAnswer != "undefined") updateAnswer = json.updateAnswer;
    if(typeof json.answer != "undefined") answer = json.answer;
    if(typeof json.answerY != "undefined") answerY = json.answerY;
    if(typeof json.answerColour != "undefined") answerColour = json.answerColour;
    if(typeof json.showAnswer != "undefined") showAnswer = json.showAnswer;
    if(typeof json.showHint != "undefined") showHint = json.showHint;
    if(typeof json.hintY != "undefined") hintY = json.hintY;
    if(typeof json.hint != "undefined") hint = json.hint;
    if(typeof json.hintFont != "undefined") hintFont = json.hintFont;
    if(typeof json.INimgX != "undefined") INimgX = json.INimgX;
    if(typeof json.INimgY != "undefined") INimgY = json.INimgY;
    if(typeof json.INenergyX != "undefined") INenergyX = json.INenergyX;
    if(typeof json.INenergyY != "undefined") INenergyY = json.INenergyY;
    if(typeof json.INtextX != "undefined") INtextX = json.INtextX;
    if(typeof json.INtextY != "undefined") INtextY = json.INtextY;
    if(typeof json.INinteract != "undefined") INinteract = json.INinteract;
    if(typeof json.IN2imgX != "undefined") IN2imgX = json.IN2imgX;
    if(typeof json.IN2imgY != "undefined") IN2imgY = json.IN2imgY;
    if(typeof json.IN2energyX != "undefined") IN2energyX = json.IN2energyX;
    if(typeof json.IN2energyY != "undefined") IN2energyY = json.IN2energyY;
    if(typeof json.IN2textX != "undefined") IN2textX = json.IN2textX;
    if(typeof json.IN2textY != "undefined") IN2textY = json.IN2textY;
    if(typeof json.IN2interact != "undefined") IN2interact = json.IN2interact;
    if(typeof json.OUTimgX != "undefined") OUTimgX = json.OUTimgX;
    if(typeof json.OUTimgY != "undefined") OUTimgY = json.OUTimgY;
    if(typeof json.OUTenergyX != "undefined") OUTenergyX = json.OUTenergyX;
    if(typeof json.OUTenergyY != "undefined") OUTenergyY = json.OUTenergyY;
    if(typeof json.OUTtextX != "undefined") OUTtextX = json.OUTtextX;
    if(typeof json.OUTtextY != "undefined") OUTtextY = json.OUTtextY;
    if(typeof json.OUTinteract != "undefined") OUTinteract = json.OUTinteract;
    if(typeof json.OUT2imgX != "undefined") OUT2imgX = json.OUT2imgX;
    if(typeof json.OUT2imgY != "undefined") OUT2imgY = json.OUT2imgY;
    if(typeof json.OUT2energyX != "undefined") OUT2energyX = json.OUT2energyX;
    if(typeof json.OUT2energyY != "undefined") OUT2energyY = json.OUT2energyY;
    if(typeof json.OUT2textX != "undefined") OUT2textX = json.OUT2textX;
    if(typeof json.OUT2textY != "undefined") OUT2textY = json.OUT2textY;
    if(typeof json.OUT2interact != "undefined") OUT2interact = json.OUT2interact;
    if(typeof json.fillColorforDrag != "undefined") fillColorforDrag = json.fillColorforDrag;
    if(typeof json.dragSizeY != "undefined") dragSizeY = json.dragSizeY;
    if(typeof json.editBackgroundColor != "undefined") editBackgroundColor = json.editBackgroundColor;
    if(typeof json.systemText != "undefined") systemText = json.systemText;
    if(typeof json.elementInteracted != "undefined") elementInteracted = json.elementInteracted;
    if(typeof json.remarks != "undefined") remarks = json.remarks;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.arrowLength != "undefined") arrowLength = json.arrowLength;
    if(typeof json.energyInArrowX != "undefined") energyInArrowX = json.energyInArrowX;
    if(typeof json.energyInArrowY != "undefined") energyInArrowY = json.energyInArrowY;
    if(typeof json.angleIN != "undefined") angleIN = json.angleIN;
    if(typeof json.angleOUT != "undefined") angleOUT = json.angleOUT;
    if(typeof json.energyOutArrowX != "undefined") energyOutArrowX = json.energyOutArrowX;
    if(typeof json.energyOutArrowY != "undefined") energyOutArrowY = json.energyOutArrowY;
    if(typeof json.energyIn2ArrowX != "undefined") energyIn2ArrowX = json.energyIn2ArrowX;
    if(typeof json.energyIn2ArrowY != "undefined") energyIn2ArrowY = json.energyIn2ArrowY;
    if(typeof json.energyOut2ArrowX != "undefined") energyOut2ArrowX = json.energyOut2ArrowX;
    if(typeof json.energyOut2ArrowY != "undefined") energyOut2ArrowY = json.energyOut2ArrowY;
    if(typeof json.dragCY != "undefined") dragCY = json.dragCY;
    if(typeof json.dragEY != "undefined") dragEY = json.dragEY;
    if(typeof json.dragGY != "undefined") dragGY = json.dragGY;
    if(typeof json.dragIY != "undefined") dragIY = json.dragIY;
    if(typeof json.dragKY != "undefined") dragKY = json.dragKY;
    if(typeof json.dragNY != "undefined") dragNY = json.dragNY;
    if(typeof json.dragC2Y != "undefined") dragC2Y = json.dragC2Y;
    if(typeof json.dragE2Y != "undefined") dragE2Y = json.dragE2Y;
    if(typeof json.dragG2Y != "undefined") dragG2Y = json.dragG2Y;
    if(typeof json.dragI2Y != "undefined") dragI2Y = json.dragI2Y;
    if(typeof json.dragK2Y != "undefined") dragK2Y = json.dragK2Y;
    if(typeof json.dragN2Y != "undefined") dragN2Y = json.dragN2Y;
    if(typeof json.dragEtransIN != "undefined") dragEtransIN = json.dragEtransIN;
    if(typeof json.dragEtransIN2 != "undefined") dragEtransIN2 = json.dragEtransIN2;
    if(typeof json.dragEtransOUT != "undefined") dragEtransOUT = json.dragEtransOUT;
    if(typeof json.dragEtransOUT2 != "undefined") dragEtransOUT2 = json.dragEtransOUT2;
    if(typeof json.iniEnergiesLst != "undefined") iniEnergiesLst = json.iniEnergiesLst;
    if(typeof json.finEnergiesLst != "undefined") finEnergiesLst = json.finEnergiesLst;
    if(typeof json.dragEnergiesLst != "undefined") dragEnergiesLst = json.dragEnergiesLst;
    if(typeof json.dragEnergies2Lst != "undefined") dragEnergies2Lst = json.dragEnergies2Lst;
    if(typeof json.customOrder != "undefined") customOrder = json.customOrder;
    if(typeof json.formulaText != "undefined") formulaText = json.formulaText;
    if(typeof json.legendText != "undefined") legendText = json.legendText;
    if(typeof json.eTooltip != "undefined") eTooltip = json.eTooltip;
    if(typeof json.hTooltip != "undefined") hTooltip = json.hTooltip;
    if(typeof json.mTooltip != "undefined") mTooltip = json.mTooltip;
    if(typeof json.pTooltip != "undefined") pTooltip = json.pTooltip;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.title != "undefined") title = json.title;
    if(typeof json.systemText2 != "undefined") systemText2 = json.systemText2;
    if(typeof json.initialState != "undefined") initialState = json.initialState;
    if(typeof json.initialState2 != "undefined") initialState2 = json.initialState2;
    if(typeof json.finalState != "undefined") finalState = json.finalState;
    if(typeof json.finalState2 != "undefined") finalState2 = json.finalState2;
    if(typeof json.remarks2 != "undefined") remarks2 = json.remarks2;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.debuggg != "undefined") debuggg = json.debuggg;
    if(typeof json.debugggTR != "undefined") debugggTR = json.debugggTR;
    if(typeof json.editing != "undefined") editing = json.editing;
    if(typeof json.physicsonly != "undefined") physicsonly = json.physicsonly;
    if(typeof json.versions != "undefined") versions = json.versions;
    if(typeof json.revealRadioButton != "undefined") revealRadioButton = json.revealRadioButton;
    if(typeof json.isC != "undefined") isC = json.isC;
    if(typeof json.isE != "undefined") isE = json.isE;
    if(typeof json.isG != "undefined") isG = json.isG;
    if(typeof json.isI != "undefined") isI = json.isI;
    if(typeof json.isK != "undefined") isK = json.isK;
    if(typeof json.isN != "undefined") isN = json.isN;
    if(typeof json.ignoreEnergyLst != "undefined") ignoreEnergyLst = json.ignoreEnergyLst;
    if(typeof json.check3a != "undefined") check3a = json.check3a;
    if(typeof json.check3b != "undefined") check3b = json.check3b;
    if(typeof json.check4a != "undefined") check4a = json.check4a;
    if(typeof json.check4b != "undefined") check4b = json.check4b;
    if(typeof json.check3aEnergy != "undefined") check3aEnergy = json.check3aEnergy;
    if(typeof json.check3bEnergy != "undefined") check3bEnergy = json.check3bEnergy;
    if(typeof json.check4aEnergy != "undefined") check4aEnergy = json.check4aEnergy;
    if(typeof json.check4bEnergy != "undefined") check4bEnergy = json.check4bEnergy;
    if(typeof json.check3aReason != "undefined") check3aReason = json.check3aReason;
    if(typeof json.check3bReason != "undefined") check3bReason = json.check3bReason;
    if(typeof json.check4aReason != "undefined") check4aReason = json.check4aReason;
    if(typeof json.check4bReason != "undefined") check4bReason = json.check4bReason;
    if(typeof json.iniC != "undefined") iniC = json.iniC;
    if(typeof json.iniE != "undefined") iniE = json.iniE;
    if(typeof json.iniG != "undefined") iniG = json.iniG;
    if(typeof json.iniI != "undefined") iniI = json.iniI;
    if(typeof json.iniK != "undefined") iniK = json.iniK;
    if(typeof json.iniN != "undefined") iniN = json.iniN;
    if(typeof json.finC != "undefined") finC = json.finC;
    if(typeof json.finE != "undefined") finE = json.finE;
    if(typeof json.finG != "undefined") finG = json.finG;
    if(typeof json.finI != "undefined") finI = json.finI;
    if(typeof json.finK != "undefined") finK = json.finK;
    if(typeof json.finN != "undefined") finN = json.finN;
    if(typeof json.check7a != "undefined") check7a = json.check7a;
    if(typeof json.operators != "undefined") operators = json.operators;
    if(typeof json.finalC != "undefined") finalC = json.finalC;
    if(typeof json.finalE != "undefined") finalE = json.finalE;
    if(typeof json.finalG != "undefined") finalG = json.finalG;
    if(typeof json.finalI != "undefined") finalI = json.finalI;
    if(typeof json.finalK != "undefined") finalK = json.finalK;
    if(typeof json.finalN != "undefined") finalN = json.finalN;
    if(typeof json.passfail != "undefined") passfail = json.passfail;
    if(typeof json.inequalityCheckLst != "undefined") inequalityCheckLst = json.inequalityCheckLst;
    if(typeof json.userPlay != "undefined") userPlay = json.userPlay;
    if(typeof json.displayChemical != "undefined") displayChemical = json.displayChemical;
    if(typeof json.displayElastic != "undefined") displayElastic = json.displayElastic;
    if(typeof json.displayGravitational != "undefined") displayGravitational = json.displayGravitational;
    if(typeof json.displayInternal != "undefined") displayInternal = json.displayInternal;
    if(typeof json.displayKinetic != "undefined") displayKinetic = json.displayKinetic;
    if(typeof json.displayNuclear != "undefined") displayNuclear = json.displayNuclear;
    if(typeof json.PropagationofWaves != "undefined") PropagationofWaves = json.PropagationofWaves;
    if(typeof json.Mechanically != "undefined") Mechanically = json.Mechanically;
    if(typeof json.Electrically != "undefined") Electrically = json.Electrically;
    if(typeof json.nEnergy != "undefined") nEnergy = json.nEnergy;
    if(typeof json.C != "undefined") C = json.C;
    if(typeof json.E != "undefined") E = json.E;
    if(typeof json.G != "undefined") G = json.G;
    if(typeof json.I != "undefined") I = json.I;
    if(typeof json.K != "undefined") K = json.K;
    if(typeof json.N != "undefined") N = json.N;
    if(typeof json.iniTotalEnergy != "undefined") iniTotalEnergy = json.iniTotalEnergy;
    if(typeof json.fC != "undefined") fC = json.fC;
    if(typeof json.fE != "undefined") fE = json.fE;
    if(typeof json.fG != "undefined") fG = json.fG;
    if(typeof json.fI != "undefined") fI = json.fI;
    if(typeof json.fK != "undefined") fK = json.fK;
    if(typeof json.fN != "undefined") fN = json.fN;
    if(typeof json.finTotalEnergy != "undefined") finTotalEnergy = json.finTotalEnergy;
    if(typeof json.updateTransIN != "undefined") updateTransIN = json.updateTransIN;
    if(typeof json.transIN != "undefined") transIN = json.transIN;
    if(typeof json.updateTransOUT != "undefined") updateTransOUT = json.updateTransOUT;
    if(typeof json.transOUT != "undefined") transOUT = json.transOUT;
    if(typeof json.EtransIN != "undefined") EtransIN = json.EtransIN;
    if(typeof json.EtransOUT != "undefined") EtransOUT = json.EtransOUT;
    if(typeof json.transIN2 != "undefined") transIN2 = json.transIN2;
    if(typeof json.transOUT2 != "undefined") transOUT2 = json.transOUT2;
    if(typeof json.updateTransIN2 != "undefined") updateTransIN2 = json.updateTransIN2;
    if(typeof json.updateTransOUT2 != "undefined") updateTransOUT2 = json.updateTransOUT2;
    if(typeof json.EtransIN2 != "undefined") EtransIN2 = json.EtransIN2;
    if(typeof json.EtransOUT2 != "undefined") EtransOUT2 = json.EtransOUT2;
    if(typeof json.energyXpos != "undefined") energyXpos = json.energyXpos;
    if(typeof json.interactPrompt1 != "undefined") interactPrompt1 = json.interactPrompt1;
    if(typeof json.interactPrompt2 != "undefined") interactPrompt2 = json.interactPrompt2;
    if(typeof json.show3D != "undefined") show3D = json.show3D;
    if(typeof json.show2D != "undefined") show2D = json.show2D;
    if(typeof json.size2DX != "undefined") size2DX = json.size2DX;
    if(typeof json.size2DY != "undefined") size2DY = json.size2DY;
    if(typeof json.size3DX != "undefined") size3DX = json.size3DX;
    if(typeof json.size3DY != "undefined") size3DY = json.size3DY;
    if(typeof json.energyColour != "undefined") energyColour = json.energyColour;
    if(typeof json.promptLineColour != "undefined") promptLineColour = json.promptLineColour;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.imgIN != "undefined") imgIN = json.imgIN;
    if(typeof json.imgOUT != "undefined") imgOUT = json.imgOUT;
    if(typeof json.imgIN2 != "undefined") imgIN2 = json.imgIN2;
    if(typeof json.imgOUT2 != "undefined") imgOUT2 = json.imgOUT2;
    if(typeof json.imgSIZE != "undefined") imgSIZE = json.imgSIZE;
    if(typeof json.imgIconSIZE != "undefined") imgIconSIZE = json.imgIconSIZE;
    if(typeof json.energyWidth != "undefined") energyWidth = json.energyWidth;
    if(typeof json.updateAnswer != "undefined") updateAnswer = json.updateAnswer;
    if(typeof json.answer != "undefined") answer = json.answer;
    if(typeof json.answerY != "undefined") answerY = json.answerY;
    if(typeof json.answerColour != "undefined") answerColour = json.answerColour;
    if(typeof json.showAnswer != "undefined") showAnswer = json.showAnswer;
    if(typeof json.showHint != "undefined") showHint = json.showHint;
    if(typeof json.hintY != "undefined") hintY = json.hintY;
    if(typeof json.hint != "undefined") hint = json.hint;
    if(typeof json.hintFont != "undefined") hintFont = json.hintFont;
    if(typeof json.INimgX != "undefined") INimgX = json.INimgX;
    if(typeof json.INimgY != "undefined") INimgY = json.INimgY;
    if(typeof json.INenergyX != "undefined") INenergyX = json.INenergyX;
    if(typeof json.INenergyY != "undefined") INenergyY = json.INenergyY;
    if(typeof json.INtextX != "undefined") INtextX = json.INtextX;
    if(typeof json.INtextY != "undefined") INtextY = json.INtextY;
    if(typeof json.INinteract != "undefined") INinteract = json.INinteract;
    if(typeof json.IN2imgX != "undefined") IN2imgX = json.IN2imgX;
    if(typeof json.IN2imgY != "undefined") IN2imgY = json.IN2imgY;
    if(typeof json.IN2energyX != "undefined") IN2energyX = json.IN2energyX;
    if(typeof json.IN2energyY != "undefined") IN2energyY = json.IN2energyY;
    if(typeof json.IN2textX != "undefined") IN2textX = json.IN2textX;
    if(typeof json.IN2textY != "undefined") IN2textY = json.IN2textY;
    if(typeof json.IN2interact != "undefined") IN2interact = json.IN2interact;
    if(typeof json.OUTimgX != "undefined") OUTimgX = json.OUTimgX;
    if(typeof json.OUTimgY != "undefined") OUTimgY = json.OUTimgY;
    if(typeof json.OUTenergyX != "undefined") OUTenergyX = json.OUTenergyX;
    if(typeof json.OUTenergyY != "undefined") OUTenergyY = json.OUTenergyY;
    if(typeof json.OUTtextX != "undefined") OUTtextX = json.OUTtextX;
    if(typeof json.OUTtextY != "undefined") OUTtextY = json.OUTtextY;
    if(typeof json.OUTinteract != "undefined") OUTinteract = json.OUTinteract;
    if(typeof json.OUT2imgX != "undefined") OUT2imgX = json.OUT2imgX;
    if(typeof json.OUT2imgY != "undefined") OUT2imgY = json.OUT2imgY;
    if(typeof json.OUT2energyX != "undefined") OUT2energyX = json.OUT2energyX;
    if(typeof json.OUT2energyY != "undefined") OUT2energyY = json.OUT2energyY;
    if(typeof json.OUT2textX != "undefined") OUT2textX = json.OUT2textX;
    if(typeof json.OUT2textY != "undefined") OUT2textY = json.OUT2textY;
    if(typeof json.OUT2interact != "undefined") OUT2interact = json.OUT2interact;
    if(typeof json.fillColorforDrag != "undefined") fillColorforDrag = json.fillColorforDrag;
    if(typeof json.dragSizeY != "undefined") dragSizeY = json.dragSizeY;
    if(typeof json.editBackgroundColor != "undefined") editBackgroundColor = json.editBackgroundColor;
    if(typeof json.systemText != "undefined") systemText = json.systemText;
    if(typeof json.elementInteracted != "undefined") elementInteracted = json.elementInteracted;
    if(typeof json.remarks != "undefined") remarks = json.remarks;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.arrowLength != "undefined") arrowLength = json.arrowLength;
    if(typeof json.energyInArrowX != "undefined") energyInArrowX = json.energyInArrowX;
    if(typeof json.energyInArrowY != "undefined") energyInArrowY = json.energyInArrowY;
    if(typeof json.angleIN != "undefined") angleIN = json.angleIN;
    if(typeof json.angleOUT != "undefined") angleOUT = json.angleOUT;
    if(typeof json.energyOutArrowX != "undefined") energyOutArrowX = json.energyOutArrowX;
    if(typeof json.energyOutArrowY != "undefined") energyOutArrowY = json.energyOutArrowY;
    if(typeof json.energyIn2ArrowX != "undefined") energyIn2ArrowX = json.energyIn2ArrowX;
    if(typeof json.energyIn2ArrowY != "undefined") energyIn2ArrowY = json.energyIn2ArrowY;
    if(typeof json.energyOut2ArrowX != "undefined") energyOut2ArrowX = json.energyOut2ArrowX;
    if(typeof json.energyOut2ArrowY != "undefined") energyOut2ArrowY = json.energyOut2ArrowY;
    if(typeof json.dragCY != "undefined") dragCY = json.dragCY;
    if(typeof json.dragEY != "undefined") dragEY = json.dragEY;
    if(typeof json.dragGY != "undefined") dragGY = json.dragGY;
    if(typeof json.dragIY != "undefined") dragIY = json.dragIY;
    if(typeof json.dragKY != "undefined") dragKY = json.dragKY;
    if(typeof json.dragNY != "undefined") dragNY = json.dragNY;
    if(typeof json.dragC2Y != "undefined") dragC2Y = json.dragC2Y;
    if(typeof json.dragE2Y != "undefined") dragE2Y = json.dragE2Y;
    if(typeof json.dragG2Y != "undefined") dragG2Y = json.dragG2Y;
    if(typeof json.dragI2Y != "undefined") dragI2Y = json.dragI2Y;
    if(typeof json.dragK2Y != "undefined") dragK2Y = json.dragK2Y;
    if(typeof json.dragN2Y != "undefined") dragN2Y = json.dragN2Y;
    if(typeof json.dragEtransIN != "undefined") dragEtransIN = json.dragEtransIN;
    if(typeof json.dragEtransIN2 != "undefined") dragEtransIN2 = json.dragEtransIN2;
    if(typeof json.dragEtransOUT != "undefined") dragEtransOUT = json.dragEtransOUT;
    if(typeof json.dragEtransOUT2 != "undefined") dragEtransOUT2 = json.dragEtransOUT2;
    if(typeof json.iniEnergiesLst != "undefined") iniEnergiesLst = json.iniEnergiesLst;
    if(typeof json.finEnergiesLst != "undefined") finEnergiesLst = json.finEnergiesLst;
    if(typeof json.dragEnergiesLst != "undefined") dragEnergiesLst = json.dragEnergiesLst;
    if(typeof json.dragEnergies2Lst != "undefined") dragEnergies2Lst = json.dragEnergies2Lst;
    if(typeof json.customOrder != "undefined") customOrder = json.customOrder;
    if(typeof json.formulaText != "undefined") formulaText = json.formulaText;
    if(typeof json.legendText != "undefined") legendText = json.legendText;
    if(typeof json.eTooltip != "undefined") eTooltip = json.eTooltip;
    if(typeof json.hTooltip != "undefined") hTooltip = json.hTooltip;
    if(typeof json.mTooltip != "undefined") mTooltip = json.mTooltip;
    if(typeof json.pTooltip != "undefined") pTooltip = json.pTooltip;
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
    __pagesEnabled["initial"] = true;
    __pagesEnabled["userPlay"] = true;
    __pagesEnabled["import"] = true;
    __pagesEnabled["scaleWrestrictions_INITIAL"] = true;
    __pagesEnabled["scaleWrestrictions_FINAL"] = true;
    __pagesEnabled["answer"] = true;
    __pagesEnabled["EnableToDebug"] = false;
    __pagesEnabled["reOrder"] = true;
  });

  _model.addToReset(function() {
    title = "<b>Scenario 1</b>: A Moving Toy Car"; // EjsS Model.Variables.toEdit.title
    systemText2 = "Toy car"; // EjsS Model.Variables.toEdit.systemText2
    initialState = "<b>Initial State:</b> "; // EjsS Model.Variables.toEdit.initialState
    initialState2 = "A toy car was moving at constant speed along a smooth horizontal surface."; // EjsS Model.Variables.toEdit.initialState2
    finalState = "<b>Final State: </b>"; // EjsS Model.Variables.toEdit.finalState
    finalState2 = "The toy car moved at a higher constant speed after a child pushed it."; // EjsS Model.Variables.toEdit.finalState2
    remarks2 = "Nil"; // EjsS Model.Variables.toEdit.remarks2
  });

  _model.addToReset(function() {
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width1 = "100%"; // EjsS Model.Variables.layout.Width1
    Width2 = "50%"; // EjsS Model.Variables.layout.Width2
    debuggg = ""; // EjsS Model.Variables.layout.debuggg
    debugggTR = ""; // EjsS Model.Variables.layout.debugggTR
  });

  _model.addToReset(function() {
    editing = true; // EjsS Model.Variables.settings.editing
    physicsonly = true; // EjsS Model.Variables.settings.physicsonly
    versions = editing?["Blank Version","Scenario 1","---To Add On---"]:["User Set"]; // EjsS Model.Variables.settings.versions
    revealRadioButton = true; // EjsS Model.Variables.settings.revealRadioButton
    isC = true; // EjsS Model.Variables.settings.isC
    isE = true; // EjsS Model.Variables.settings.isE
    isG = true; // EjsS Model.Variables.settings.isG
    isI = true; // EjsS Model.Variables.settings.isI
    isK = true; // EjsS Model.Variables.settings.isK
    isN = true; // EjsS Model.Variables.settings.isN
    ignoreEnergyLst = []; // EjsS Model.Variables.settings.ignoreEnergyLst
    check3a = true; // EjsS Model.Variables.settings.check3a
    check3b = false; // EjsS Model.Variables.settings.check3b
    check4a = false; // EjsS Model.Variables.settings.check4a
    check4b = false; // EjsS Model.Variables.settings.check4b
    check3aEnergy = "mechanically"; // EjsS Model.Variables.settings.check3aEnergy
    check3bEnergy = ""; // EjsS Model.Variables.settings.check3bEnergy
    check4aEnergy = ""; // EjsS Model.Variables.settings.check4aEnergy
    check4bEnergy = ""; // EjsS Model.Variables.settings.check4bEnergy
    check3aReason = "the work done by the child on the car."; // EjsS Model.Variables.settings.check3aReason
    check3bReason = ""; // EjsS Model.Variables.settings.check3bReason
    check4aReason = ""; // EjsS Model.Variables.settings.check4aReason
    check4bReason = ""; // EjsS Model.Variables.settings.check4bReason
    iniC = false; // EjsS Model.Variables.settings.iniC
    iniE = false; // EjsS Model.Variables.settings.iniE
    iniG = false; // EjsS Model.Variables.settings.iniG
    iniI = false; // EjsS Model.Variables.settings.iniI
    iniK = true; // EjsS Model.Variables.settings.iniK
    iniN = false; // EjsS Model.Variables.settings.iniN
    finC = false; // EjsS Model.Variables.settings.finC
    finE = false; // EjsS Model.Variables.settings.finE
    finG = false; // EjsS Model.Variables.settings.finG
    finI = false; // EjsS Model.Variables.settings.finI
    finK = true; // EjsS Model.Variables.settings.finK
    finN = false; // EjsS Model.Variables.settings.finN
    check7a = false; // EjsS Model.Variables.settings.check7a
    operators = ["﹥","≥","×2=","=","=2×","＜","≤"]; // EjsS Model.Variables.settings.operators
    finalC = fC; // EjsS Model.Variables.settings.finalC
    finalE = fE; // EjsS Model.Variables.settings.finalE
    finalG = fG; // EjsS Model.Variables.settings.finalG
    finalI = fI; // EjsS Model.Variables.settings.finalI
    finalK = fK; // EjsS Model.Variables.settings.finalK
    finalN = fN; // EjsS Model.Variables.settings.finalN
    passfail = []; // EjsS Model.Variables.settings.passfail
    inequalityCheckLst = []; // EjsS Model.Variables.settings.inequalityCheckLst
    displayChemical = true; // EjsS Model.Variables.settings.displayChemical
    displayElastic = true; // EjsS Model.Variables.settings.displayElastic
    displayGravitational = true; // EjsS Model.Variables.settings.displayGravitational
    displayInternal = true; // EjsS Model.Variables.settings.displayInternal
    displayKinetic = true; // EjsS Model.Variables.settings.displayKinetic
    displayNuclear = true; // EjsS Model.Variables.settings.displayNuclear
    PropagationofWaves = "Propagation of Waves"; // EjsS Model.Variables.settings.PropagationofWaves
    Mechanically = "Mechanically"; // EjsS Model.Variables.settings.Mechanically
    Electrically = "Electrically"; // EjsS Model.Variables.settings.Electrically
  });

  _model.addToReset(function() {
    nEnergy = 6; // EjsS Model.Variables.Var Table.nEnergy
    C = 0; // EjsS Model.Variables.Var Table.C
    E = 0; // EjsS Model.Variables.Var Table.E
    G = 0; // EjsS Model.Variables.Var Table.G
    I = 0; // EjsS Model.Variables.Var Table.I
    K = 0; // EjsS Model.Variables.Var Table.K
    N = 0; // EjsS Model.Variables.Var Table.N
    iniTotalEnergy = [C,E,G,I,K,N]; // EjsS Model.Variables.Var Table.iniTotalEnergy
    fC = 0; // EjsS Model.Variables.Var Table.fC
    fE = 0; // EjsS Model.Variables.Var Table.fE
    fG = 0; // EjsS Model.Variables.Var Table.fG
    fI = 0; // EjsS Model.Variables.Var Table.fI
    fK = 0; // EjsS Model.Variables.Var Table.fK
    fN = 0; // EjsS Model.Variables.Var Table.fN
    finTotalEnergy = [fC,fE,fG,fI,fK,fN]; // EjsS Model.Variables.Var Table.finTotalEnergy
    updateTransIN = 0; // EjsS Model.Variables.Var Table.updateTransIN
    transIN = ["- Tin₁ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; // EjsS Model.Variables.Var Table.transIN
    updateTransOUT = updateTransIN; // EjsS Model.Variables.Var Table.updateTransOUT
    transOUT = ["- Tout₁ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; // EjsS Model.Variables.Var Table.transOUT
    EtransIN = 0; // EjsS Model.Variables.Var Table.EtransIN
    EtransOUT = 0; // EjsS Model.Variables.Var Table.EtransOUT
    transIN2 = ["- Tin₂ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; // EjsS Model.Variables.Var Table.transIN2
    transOUT2 = ["- Tout₂ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; // EjsS Model.Variables.Var Table.transOUT2
    updateTransIN2 = 0; // EjsS Model.Variables.Var Table.updateTransIN2
    updateTransOUT2 = updateTransIN2; // EjsS Model.Variables.Var Table.updateTransOUT2
    EtransIN2 = 0; // EjsS Model.Variables.Var Table.EtransIN2
    EtransOUT2 = 0; // EjsS Model.Variables.Var Table.EtransOUT2
  });

  _model.addToReset(function() {
    energyXpos = []; // EjsS Model.Variables.draw_L.energyXpos
    interactPrompt1 = new Array(nEnergy); // EjsS Model.Variables.draw_L.interactPrompt1
    (function () {
      var _i0;
      for (_i0=0; _i0<nEnergy; _i0+=1) {  // EjsS Model.Variables.draw_L.interactPrompt1
        interactPrompt1[_i0] = false;  // EjsS Model.Variables.draw_L.interactPrompt1
      }
    }());
    interactPrompt2 = new Array(nEnergy); // EjsS Model.Variables.draw_L.interactPrompt2
    (function () {
      var _i0;
      for (_i0=0; _i0<nEnergy; _i0+=1) {  // EjsS Model.Variables.draw_L.interactPrompt2
        interactPrompt2[_i0] = false;  // EjsS Model.Variables.draw_L.interactPrompt2
      }
    }());
    show3D = false; // EjsS Model.Variables.draw_L.show3D
    show2D = true; // EjsS Model.Variables.draw_L.show2D
    size2DX = 0.85; // EjsS Model.Variables.draw_L.size2DX
    size2DY = 1; // EjsS Model.Variables.draw_L.size2DY
    size3DX = size2DX; // EjsS Model.Variables.draw_L.size3DX
    size3DY = 1.2; // EjsS Model.Variables.draw_L.size3DY
    energyColour = "rgba(0,200,255,1.0)"; // EjsS Model.Variables.draw_L.energyColour
    promptLineColour = "rgba(0,255,255,0.2)"; // EjsS Model.Variables.draw_L.promptLineColour
  });

  _model.addToReset(function() {
    pi = Math.PI; // EjsS Model.Variables.draw_O.pi
    imgIN = ["./Settings/qnmark.png","./Settings/Propagation of waves.png","./Settings/Mechanically.png","./Settings/Heating.png","./Settings/Electrically.png","./Settings/Chemically.png"]; // EjsS Model.Variables.draw_O.imgIN
    imgOUT = imgIN; // EjsS Model.Variables.draw_O.imgOUT
    imgIN2 = imgIN; // EjsS Model.Variables.draw_O.imgIN2
    imgOUT2 = imgIN; // EjsS Model.Variables.draw_O.imgOUT2
    imgSIZE = 1; // EjsS Model.Variables.draw_O.imgSIZE
    imgIconSIZE = 1; // EjsS Model.Variables.draw_O.imgIconSIZE
    energyWidth = 1; // EjsS Model.Variables.draw_O.energyWidth
    updateAnswer = 0; // EjsS Model.Variables.draw_O.updateAnswer
    answer = ["Unbalanced","Balanced"]; // EjsS Model.Variables.draw_O.answer
    answerY = -5; // EjsS Model.Variables.draw_O.answerY
    answerColour = ["Red","Green"]; // EjsS Model.Variables.draw_O.answerColour
    showAnswer = true; // EjsS Model.Variables.draw_O.showAnswer
    showHint = false; // EjsS Model.Variables.draw_O.showHint
    hintY = -4.5; // EjsS Model.Variables.draw_O.hintY
    hint = "-"; // EjsS Model.Variables.draw_O.hint
    INimgX = energyInArrowX-1; // EjsS Model.Variables.draw_O.INimgX
    INimgY = energyInArrowY+1; // EjsS Model.Variables.draw_O.INimgY
    INenergyX = -5; // EjsS Model.Variables.draw_O.INenergyX
    INenergyY = -5; // EjsS Model.Variables.draw_O.INenergyY
    INtextX = INenergyX; // EjsS Model.Variables.draw_O.INtextX
    INtextY = INenergyY -0.25; // EjsS Model.Variables.draw_O.INtextY
    INinteract = false; // EjsS Model.Variables.draw_O.INinteract
    IN2imgX = energyIn2ArrowX-1; // EjsS Model.Variables.draw_O.IN2imgX
    IN2imgY = energyIn2ArrowY-1; // EjsS Model.Variables.draw_O.IN2imgY
    IN2energyX = -4; // EjsS Model.Variables.draw_O.IN2energyX
    IN2energyY = -5; // EjsS Model.Variables.draw_O.IN2energyY
    IN2textX = IN2energyX; // EjsS Model.Variables.draw_O.IN2textX
    IN2textY = IN2energyY -0.25; // EjsS Model.Variables.draw_O.IN2textY
    IN2interact = false; // EjsS Model.Variables.draw_O.IN2interact
    OUTimgX = energyOutArrowX+1.1; // EjsS Model.Variables.draw_O.OUTimgX
    OUTimgY = energyOutArrowY+1.1; // EjsS Model.Variables.draw_O.OUTimgY
    OUTenergyX = -IN2energyX; // EjsS Model.Variables.draw_O.OUTenergyX
    OUTenergyY = IN2energyY; // EjsS Model.Variables.draw_O.OUTenergyY
    OUTtextX = OUTenergyX; // EjsS Model.Variables.draw_O.OUTtextX
    OUTtextY = OUTenergyY -0.25; // EjsS Model.Variables.draw_O.OUTtextY
    OUTinteract = false; // EjsS Model.Variables.draw_O.OUTinteract
    OUT2imgX = energyOut2ArrowX+1; // EjsS Model.Variables.draw_O.OUT2imgX
    OUT2imgY = energyOut2ArrowY-1; // EjsS Model.Variables.draw_O.OUT2imgY
    OUT2energyX = -INenergyX; // EjsS Model.Variables.draw_O.OUT2energyX
    OUT2energyY = INenergyY; // EjsS Model.Variables.draw_O.OUT2energyY
    OUT2textX = OUT2energyX; // EjsS Model.Variables.draw_O.OUT2textX
    OUT2textY = OUT2energyY -0.25; // EjsS Model.Variables.draw_O.OUT2textY
    OUT2interact = false; // EjsS Model.Variables.draw_O.OUT2interact
  });

  _model.addToReset(function() {
    fillColorforDrag = "rgba(0,0,255,0.1)"; // EjsS Model.Variables.lookang.fillColorforDrag
    dragSizeY = 1.5; // EjsS Model.Variables.lookang.dragSizeY
    editBackgroundColor = "LightGray"; // EjsS Model.Variables.lookang.editBackgroundColor
    systemText = "<b>System:</b>"; // EjsS Model.Variables.lookang.systemText
    elementInteracted = -1; // EjsS Model.Variables.lookang.elementInteracted
    remarks = "<b>Remarks: </b>"; // EjsS Model.Variables.lookang.remarks
    font = "normal normal 1vw"; // EjsS Model.Variables.lookang.font
    arrowLength = 2; // EjsS Model.Variables.lookang.arrowLength
    energyInArrowX = -2; // EjsS Model.Variables.lookang.energyInArrowX
    energyInArrowY = 2; // EjsS Model.Variables.lookang.energyInArrowY
    angleIN = Math.atan2(energyInArrowY, energyInArrowX); // EjsS Model.Variables.lookang.angleIN
    energyOutArrowX = -energyInArrowX; // EjsS Model.Variables.lookang.energyOutArrowX
    energyOutArrowY = energyInArrowY; // EjsS Model.Variables.lookang.energyOutArrowY
    energyIn2ArrowX = energyInArrowX; // EjsS Model.Variables.lookang.energyIn2ArrowX
    energyIn2ArrowY = -energyInArrowY; // EjsS Model.Variables.lookang.energyIn2ArrowY
    energyOut2ArrowX = energyOutArrowX; // EjsS Model.Variables.lookang.energyOut2ArrowX
    energyOut2ArrowY = -energyOutArrowY; // EjsS Model.Variables.lookang.energyOut2ArrowY
    dragCY = iniTotalEnergy[0]; // EjsS Model.Variables.lookang.dragCY
    dragEY = iniTotalEnergy[1]; // EjsS Model.Variables.lookang.dragEY
    dragGY = iniTotalEnergy[2]; // EjsS Model.Variables.lookang.dragGY
    dragIY = iniTotalEnergy[3]; // EjsS Model.Variables.lookang.dragIY
    dragKY = iniTotalEnergy[4]; // EjsS Model.Variables.lookang.dragKY
    dragNY = iniTotalEnergy[5]; // EjsS Model.Variables.lookang.dragNY
    dragC2Y = finTotalEnergy[0]; // EjsS Model.Variables.lookang.dragC2Y
    dragE2Y = finTotalEnergy[1]; // EjsS Model.Variables.lookang.dragE2Y
    dragG2Y = finTotalEnergy[2]; // EjsS Model.Variables.lookang.dragG2Y
    dragI2Y = finTotalEnergy[3]; // EjsS Model.Variables.lookang.dragI2Y
    dragK2Y = finTotalEnergy[4]; // EjsS Model.Variables.lookang.dragK2Y
    dragN2Y = finTotalEnergy[5]; // EjsS Model.Variables.lookang.dragN2Y
    dragEtransIN = EtransIN; // EjsS Model.Variables.lookang.dragEtransIN
    dragEtransIN2 = EtransIN2; // EjsS Model.Variables.lookang.dragEtransIN2
    dragEtransOUT = EtransOUT; // EjsS Model.Variables.lookang.dragEtransOUT
    dragEtransOUT2 = EtransOUT2; // EjsS Model.Variables.lookang.dragEtransOUT2
    iniEnergiesLst = [iniC, iniE, iniG, iniI, iniK, iniN]; // EjsS Model.Variables.lookang.iniEnergiesLst
    finEnergiesLst = [finC, finE, finG, finI, finK, finN]; // EjsS Model.Variables.lookang.finEnergiesLst
    dragEnergiesLst = [dragCY, dragEY, dragGY, dragIY, dragKY, dragNY]; // EjsS Model.Variables.lookang.dragEnergiesLst
    dragEnergies2Lst = [dragC2Y, dragE2Y, dragG2Y, dragI2Y, dragK2Y, dragN2Y]; // EjsS Model.Variables.lookang.dragEnergies2Lst
    customOrder = [1, 2, 3, 4,5,6]; // EjsS Model.Variables.lookang.customOrder
  });

  _model.addToReset(function() {
    formulaText = ""; // EjsS Model.Variables.description.formulaText
    legendText = ""; // EjsS Model.Variables.description.legendText
    eTooltip = ""; // EjsS Model.Variables.description.eTooltip
    hTooltip = ""; // EjsS Model.Variables.description.hTooltip
    mTooltip = ""; // EjsS Model.Variables.description.mTooltip
    pTooltip = ""; // EjsS Model.Variables.description.pTooltip
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

  function answers1 () {    // depends on SCENARIO, need to include in Fixed relations.   // > CustomCode.generalAnswer:1
    var LHS = 0;  // > CustomCode.generalAnswer:2
    var RHS = 0;  // > CustomCode.generalAnswer:3
    for (let i=0; i< iniTotalEnergy.length; i++){  // > CustomCode.generalAnswer:4
      LHS += iniTotalEnergy[i];  // > CustomCode.generalAnswer:5
      RHS += finTotalEnergy[i];  // > CustomCode.generalAnswer:6
      }  // > CustomCode.generalAnswer:7
    debuggg = "LHS +EtransIN+EtransIN2: "+LHS +EtransIN+EtransIN2+ "\nRHS: "+RHS +EtransOUT+EtransOUT2;  // > CustomCode.generalAnswer:8
    // (1) Total initial + transferred in = total final + transferred out  // > CustomCode.generalAnswer:9
    if (LHS + EtransIN + EtransIN2 == RHS + EtransOUT + EtransOUT2){  // > CustomCode.generalAnswer:10
      // (2) Zero C, E, G, I and N in the initial and final amount → only has kinetic  // > CustomCode.generalAnswer:11
      if (zeroExceptEnergy(isC,isE,isG,isI,isK,isN) ||true){  // (C,E,G,I,K,N) || true to skip check  // > CustomCode.generalAnswer:12
        ignoreEnergyLst = energyToIgnore(isC,isE,isG,isI,isK,isN);  // > CustomCode.generalAnswer:13
        // (3) identify energy being transferred IN  // > CustomCode.generalAnswer:14
        if ( check3assistant() ){  // > CustomCode.generalAnswer:15
          // (4) identify energy being transferred OUT  // > CustomCode.generalAnswer:16
          if ( check4assistant() ){      // > CustomCode.generalAnswer:17
            // (5) Initial state only has check5 energies (iniC,iniE,iniG,iniI,iniK,iniN) → T/F  // > CustomCode.generalAnswer:18
            if ( check5n6assistant(iniC,iniE,iniG,iniI,iniK,iniN, iniTotalEnergy, "INITIAL") ){  // > CustomCode.generalAnswer:19
              // (6)  Final state only has check6 energies (finC,finE,finG,finI,finK,finN)→ T/F  // > CustomCode.generalAnswer:20
              if ( check5n6assistant(finC,finE,finG,finI,finK,finN, finTotalEnergy, "FINAL")  ){  // > CustomCode.generalAnswer:21
                // (7) Other criteria: Final state K > initial state K  // > CustomCode.generalAnswer:22
                if ( (check7a==false) || (check7a==true && check7assistant() ) ){   // > CustomCode.generalAnswer:23
                  updateAnswer = 1;  // > CustomCode.generalAnswer:24
                  hint = '';  // > CustomCode.generalAnswer:25
                  debuggg = '';  // > CustomCode.generalAnswer:26
                  }  // > CustomCode.generalAnswer:27
                else {  // > CustomCode.generalAnswer:28
                  updateAnswer = 0;  // > CustomCode.generalAnswer:29
                  debuggg += "\nDid not pass check 7"  // > CustomCode.generalAnswer:30
                  }  // > CustomCode.generalAnswer:31
                }  // > CustomCode.generalAnswer:32
              // (6) is wrong  // > CustomCode.generalAnswer:33
              else {  // > CustomCode.generalAnswer:34
                updateAnswer = 0;  // > CustomCode.generalAnswer:35
                //debuggg = "Did not pass check 6";  // > CustomCode.generalAnswer:36
                }  // > CustomCode.generalAnswer:37
              }  // > CustomCode.generalAnswer:38
            // (5) is wrong  // > CustomCode.generalAnswer:39
            else {  // > CustomCode.generalAnswer:40
              updateAnswer = 0;  // > CustomCode.generalAnswer:41
              //debuggg = "Did not pass check 5";  // > CustomCode.generalAnswer:42
              }  // > CustomCode.generalAnswer:43
            }  // > CustomCode.generalAnswer:44
          // (4) is wrong  // > CustomCode.generalAnswer:45
          else {  // > CustomCode.generalAnswer:46
            updateAnswer = 0;  // > CustomCode.generalAnswer:47
            // hints kept w the assistant  // > CustomCode.generalAnswer:48
            }  // > CustomCode.generalAnswer:49
          }  // > CustomCode.generalAnswer:50
        // (3) is wrong  // > CustomCode.generalAnswer:51
        else {  // > CustomCode.generalAnswer:52
          updateAnswer = 0;  // > CustomCode.generalAnswer:53
          // hints kept w the assistant  // > CustomCode.generalAnswer:54
          debuggg = "Did not pass check 3";  // > CustomCode.generalAnswer:55
          }  // > CustomCode.generalAnswer:56
        }  // > CustomCode.generalAnswer:57
      // (2) is wrong  // > CustomCode.generalAnswer:58
      else {  // > CustomCode.generalAnswer:59
        updateAnswer = 0;  // > CustomCode.generalAnswer:60
        hint = "The amount of energy in the \n";  // > CustomCode.generalAnswer:61
        if (isC == false){hint += "chemical, "}  // > CustomCode.generalAnswer:62
        if (isE == false){hint += "elastic, "}  // > CustomCode.generalAnswer:63
        if (isG == false){hint += "gravitational, "}  // > CustomCode.generalAnswer:64
        if (isI == false){hint += "internal, "}  // > CustomCode.generalAnswer:65
        if (isK == false){hint += "kinetic, "}  // > CustomCode.generalAnswer:66
        if (isN == false){hint += "nuclear "}  // > CustomCode.generalAnswer:67
        hint += "\nstores should be zero.";  // > CustomCode.generalAnswer:68
        }  // > CustomCode.generalAnswer:69
      }  // > CustomCode.generalAnswer:70
    // (1) is wrong  // > CustomCode.generalAnswer:71
    else {  // > CustomCode.generalAnswer:72
      updateAnswer = 0;  // > CustomCode.generalAnswer:73
      hint = "Total energy in the initial state of the system \n+ the energy transferred into the system should be\n = to the total energy in the final state of the system \n+ the energy transferred out of the system.";  // > CustomCode.generalAnswer:74
      hint = "Total energy in the initial state of the system + the energy transferred into\nthe system should be = to the total energy in the final state of the system\n+ the energy transferred out of the system.";  // > CustomCode.generalAnswer:75
      }  // > CustomCode.generalAnswer:76
      // > CustomCode.generalAnswer:77
    }  // > CustomCode.generalAnswer:78

  //////////////////////////////////////  // > CustomCode.answerAssistants:1
  // 1) Energy displayed / considered //  ** Affects checks and displays  // > CustomCode.answerAssistants:2
  //////////////////////////////////////  // > CustomCode.answerAssistants:3
  function isLastEnergyDisplayed(){  // > CustomCode.answerAssistants:4
    displayEnergiesLst = [displayChemical, displayElastic, displayGravitational,  // > CustomCode.answerAssistants:5
                          displayInternal, displayKinetic, displayNuclear];  // > CustomCode.answerAssistants:6
    let trueCount = displayEnergiesLst.filter(item => item === true).length;  // > CustomCode.answerAssistants:7
    if (trueCount==1){  // > CustomCode.answerAssistants:8
      alert("At least one energy should be considered to play the simulation!");  // > CustomCode.answerAssistants:9
      // narrow down to that energy and disable it.   // > CustomCode.answerAssistants:10
      if (displayChemical==true){document.getElementById("displayChemical").disabled = true;}  // > CustomCode.answerAssistants:11
      else if (displayElastic==true){document.getElementById("displayElastic").disabled = true;}  // > CustomCode.answerAssistants:12
      else if (displayGravitational==true){document.getElementById("displayGravitational").disabled = true;}  // > CustomCode.answerAssistants:13
      else if (displayInternal==true){document.getElementById("displayInternal").disabled = true;}  // > CustomCode.answerAssistants:14
      else if (displayKinetic==true){document.getElementById("displayKinetic").disabled = true;}  // > CustomCode.answerAssistants:15
      else if (displayNuclear==true){document.getElementById("displayNuclear").disabled = true;}  // > CustomCode.answerAssistants:16
      }  // > CustomCode.answerAssistants:17
    else{  // > CustomCode.answerAssistants:18
      document.getElementById("displayChemical").disabled = false;  // > CustomCode.answerAssistants:19
      document.getElementById("displayElastic").disabled = false;  // > CustomCode.answerAssistants:20
      document.getElementById("displayGravitational").disabled = false;  // > CustomCode.answerAssistants:21
      document.getElementById("displayInternal").disabled = false;  // > CustomCode.answerAssistants:22
      document.getElementById("displayKinetic").disabled = false;  // > CustomCode.answerAssistants:23
      document.getElementById("displayNuclear").disabled = false;  // > CustomCode.answerAssistants:24
      }  // > CustomCode.answerAssistants:25
    }  // > CustomCode.answerAssistants:26
      // > CustomCode.answerAssistants:27
  function updateVariables(){  // > CustomCode.answerAssistants:28
    displayEnergiesLst = [displayChemical, displayElastic, displayGravitational,  // > CustomCode.answerAssistants:29
                          displayInternal, displayKinetic, displayNuclear];  // > CustomCode.answerAssistants:30
    // ID is same as iniTotalEnergy and finTotalEnergy //  // > CustomCode.answerAssistants:31
    for (let i=0; i < iniTotalEnergy.length; i++){  // > CustomCode.answerAssistants:32
      if (displayEnergiesLst[i] == false){  // > CustomCode.answerAssistants:33
        iniTotalEnergy[i] = 0;    // Update iniTotalEnergy  // > CustomCode.answerAssistants:34
        finTotalEnergy[i] = 0;    // Update finTotalEnergy  // > CustomCode.answerAssistants:35
        }  // > CustomCode.answerAssistants:36
      }  // > CustomCode.answerAssistants:37
    // update check2, check 5 and check6 by restarting them to false //  // > CustomCode.answerAssistants:38
    if (displayChemical==false)     {isC =false; iniC =false; finC =false;}  // > CustomCode.answerAssistants:39
    if (displayElastic==false)      {isE =false; iniE =false; finE =false;}  // > CustomCode.answerAssistants:40
    if (displayGravitational==false){isG =false; iniG =false; finG =false;}  // > CustomCode.answerAssistants:41
    if (displayInternal==false)     {isI =false; iniI =false; finI =false;}  // > CustomCode.answerAssistants:42
    if (displayKinetic==false)      {isK =false; iniK =false; finK =false;}  // > CustomCode.answerAssistants:43
    if (displayNuclear==false)      {isN =false; iniN =false; finN =false;}  // > CustomCode.answerAssistants:44
    }  // > CustomCode.answerAssistants:45
  ///////////////////////////////////////////////  // > CustomCode.answerAssistants:46
  // 2) Check what energy to ignore its amount //  ** Affects check 5 and 6  // > CustomCode.answerAssistants:47
  ///////////////////////////////////////////////  returns a list ID to ignore  // > CustomCode.answerAssistants:48
  function energyToIgnore(C,E,G,I,K,N){  // > CustomCode.answerAssistants:49
    let checkLst = [C,E,G,I,K,N];  // lst contains T/F  // > CustomCode.answerAssistants:50
    let indexLst = [];  // > CustomCode.answerAssistants:51
    for (let i=0; i < checkLst.length; i++){  // > CustomCode.answerAssistants:52
      if (checkLst[i]==true){indexLst.push(i);}  // > CustomCode.answerAssistants:53
      }  // > CustomCode.answerAssistants:54
    return indexLst  // > CustomCode.answerAssistants:55
    }  // > CustomCode.answerAssistants:56
  function zeroExceptEnergy(C,E,G,I,K,N){  // Scenario 1: (false, false, false, false, TRUE, false)  // > CustomCode.answerAssistants:57
    // check which index gives false from the argument --> index to check //  // > CustomCode.answerAssistants:58
    let indexLst = [];  // > CustomCode.answerAssistants:59
    if (C==false){indexLst.push(0)}  // > CustomCode.answerAssistants:60
    if (E==false){indexLst.push(1)}  // > CustomCode.answerAssistants:61
    if (G==false){indexLst.push(2)}  // > CustomCode.answerAssistants:62
    if (I==false){indexLst.push(3)}  // > CustomCode.answerAssistants:63
    if (K==false){indexLst.push(4)}  // > CustomCode.answerAssistants:64
    if (N==false){indexLst.push(5)}  // > CustomCode.answerAssistants:65
    // checking process: //  // > CustomCode.answerAssistants:66
    for (let i=0; i< iniTotalEnergy.length; i++){  // > CustomCode.answerAssistants:67
      // Skip any energy that is true, so to check for 0 //  // > CustomCode.answerAssistants:68
      for (let j=0; j < indexLst.length; j++){  // > CustomCode.answerAssistants:69
        if ( (indexLst[j] ==i) && ( (iniTotalEnergy[i] !=0)||(finTotalEnergy[i] !=0)  ) ){  // > CustomCode.answerAssistants:70
          return false  // > CustomCode.answerAssistants:71
          }  // > CustomCode.answerAssistants:72
        }  // > CustomCode.answerAssistants:73
      }  // > CustomCode.answerAssistants:74
    return true  // > CustomCode.answerAssistants:75
    }  // > CustomCode.answerAssistants:76
      // > CustomCode.answerAssistants:77
  /////////////////////////////////////////////////  // > CustomCode.answerAssistants:78
  // 3) Check what energy is being transfered IN // (O)  // > CustomCode.answerAssistants:79
  /////////////////////////////////////////////////  // > CustomCode.answerAssistants:80
  function check3assistant(){    // > CustomCode.answerAssistants:81
    // check3b is true, means confirm 2 types of energy are transferred  // > CustomCode.answerAssistants:82
    if (check3b){  // > CustomCode.answerAssistants:83
      // → if 2, need check IN correct, followed by IN2 and vice versa.   // > CustomCode.answerAssistants:84
      if (check3a && (EtransIN >0 && EtransIN2 >0) ){   // > CustomCode.answerAssistants:85
        if ((updateTransIN == 1 && check3aEnergy == "through propagation of waves") ||   // > CustomCode.answerAssistants:86
            (updateTransIN == 2 && check3aEnergy == "mechanically") ||   // > CustomCode.answerAssistants:87
            (updateTransIN == 3 && check3aEnergy == "through heating") ||   // > CustomCode.answerAssistants:88
            (updateTransIN == 4 && check3aEnergy == "electrically") ||   // > CustomCode.answerAssistants:89
            (updateTransIN == 5 && check3aEnergy == "chemically") ){  // > CustomCode.answerAssistants:90
          if (updateTransIN2 == 1 && check3bEnergy == "through propagation of waves"){return true}  // > CustomCode.answerAssistants:91
          else if (updateTransIN2 == 2 && check3bEnergy == "mechanically"){return true}  // > CustomCode.answerAssistants:92
          else if (updateTransIN2 == 3 && check3bEnergy == "through heating"){return true}  // > CustomCode.answerAssistants:93
          else if (updateTransIN2 == 4 && check3bEnergy == "electrically"){return true}  // > CustomCode.answerAssistants:94
          else if (updateTransIN2 == 5 && check3bEnergy == "chemically"){return true}  // > CustomCode.answerAssistants:95
          else{  // > CustomCode.answerAssistants:96
            hint = "There should be some energy transferred into\nthe system "+check3bEnergy+" due to \n"+check3bReason;  // > CustomCode.answerAssistants:97
            return false  // > CustomCode.answerAssistants:98
            }  // > CustomCode.answerAssistants:99
          }  // > CustomCode.answerAssistants:100
        else if ((updateTransIN2 == 1 && check3aEnergy == "through propagation of waves") ||   // > CustomCode.answerAssistants:101
            (updateTransIN2 == 2 && check3aEnergy == "mechanically") ||   // > CustomCode.answerAssistants:102
            (updateTransIN2 == 3 && check3aEnergy == "through heating") ||   // > CustomCode.answerAssistants:103
            (updateTransIN2 == 4 && check3aEnergy == "electrically") ||  // > CustomCode.answerAssistants:104
            (updateTransIN2 == 5 && check3aEnergy == "chemically") ){  // > CustomCode.answerAssistants:105
          if (updateTransIN == 1 && check3bEnergy == "through propagation of waves"){return true}  // > CustomCode.answerAssistants:106
          else if (updateTransIN == 2 && check3bEnergy == "mechanically"){return true}  // > CustomCode.answerAssistants:107
          else if (updateTransIN == 3 && check3bEnergy == "through heating"){return true}  // > CustomCode.answerAssistants:108
          else if (updateTransIN == 4 && check3bEnergy == "electrically"){return true}  // > CustomCode.answerAssistants:109
          else if (updateTransIN == 5 && check3bEnergy == "chemically"){return true}  // > CustomCode.answerAssistants:110
          else{  // > CustomCode.answerAssistants:111
            hint = "There should be some energy transferred\ninto the system "+check3bEnergy+" due to \n"+check3bReason;  // > CustomCode.answerAssistants:112
            return false  // > CustomCode.answerAssistants:113
            }  // > CustomCode.answerAssistants:114
          }  // > CustomCode.answerAssistants:115
        else{  // > CustomCode.answerAssistants:116
          hint = "There should be some energy transferred\ninto the system "+check3aEnergy+" due to \n"+check3aReason;  // > CustomCode.answerAssistants:117
          return false  // > CustomCode.answerAssistants:118
          }  // > CustomCode.answerAssistants:119
        }  // > CustomCode.answerAssistants:120
      else{  // > CustomCode.answerAssistants:121
        hint = "There should have some energy\ntransferred into the system\n"+check3aEnergy+" and "+check3bEnergy+".";  // > CustomCode.answerAssistants:122
        }  // > CustomCode.answerAssistants:123
      }  // > CustomCode.answerAssistants:124
    // check3a is true, means there can be 1 or 2 types of energy transferred → no need check for 2 cuz check3b wldve been T  // > CustomCode.answerAssistants:125
    else if (check3a){  // > CustomCode.answerAssistants:126
      // → if only 1, just need to check whether the IN or IN2 is correctly identified  // > CustomCode.answerAssistants:127
      if (EtransIN >0 && EtransIN2 ==0){  // > CustomCode.answerAssistants:128
        if (updateTransIN == 1 && check3aEnergy == "through propagation of waves"){return true}  // > CustomCode.answerAssistants:129
        if (updateTransIN == 2 && check3aEnergy == "mechanically"){return true}  // > CustomCode.answerAssistants:130
        if (updateTransIN == 3 && check3aEnergy == "through heating"){return true}  // > CustomCode.answerAssistants:131
        if (updateTransIN == 4 && check3aEnergy == "electrically"){return true}  // > CustomCode.answerAssistants:132
        if (updateTransIN == 5 && check3aEnergy == "chemically"){return true}  // > CustomCode.answerAssistants:133
        }  // > CustomCode.answerAssistants:134
      else if (EtransIN ==0 && EtransIN2 >0){  // > CustomCode.answerAssistants:135
        if (updateTransIN2 == 1 && check3aEnergy == "through propagation of waves"){return true}  // > CustomCode.answerAssistants:136
        if (updateTransIN2 == 2 && check3aEnergy == "mechanically"){return true}  // > CustomCode.answerAssistants:137
        if (updateTransIN2 == 3 && check3aEnergy == "through heating"){return true}  // > CustomCode.answerAssistants:138
        if (updateTransIN2 == 4 && check3aEnergy == "electrically"){return true}  // > CustomCode.answerAssistants:139
        if (updateTransIN2 == 5 && check3aEnergy == "chemically"){return true}  // > CustomCode.answerAssistants:140
        }  // > CustomCode.answerAssistants:141
      else if (EtransIN >0 && EtransIN2 >0){  // > CustomCode.answerAssistants:142
        if (updateTransIN == 1 && updateTransIN2 == 1 && check3aEnergy == "through propagation of waves"){return true}  // > CustomCode.answerAssistants:143
        if (updateTransIN == 2 && updateTransIN2 == 2 && check3aEnergy == "mechanically"){return true}  // > CustomCode.answerAssistants:144
        if (updateTransIN == 3 && updateTransIN2 == 3 && check3aEnergy == "through heating"){return true}  // > CustomCode.answerAssistants:145
        if (updateTransIN == 4 && updateTransIN2 == 4 && check3aEnergy == "electrically"){return true}  // > CustomCode.answerAssistants:146
        if (updateTransIN == 5 && updateTransIN2 == 5 && check3aEnergy == "chemically"){return true}  // > CustomCode.answerAssistants:147
        hint = "There should only be some energy transferred\ninto the system "+ check3aEnergy+".";  // > CustomCode.answerAssistants:148
        return false  // > CustomCode.answerAssistants:149
        }  // > CustomCode.answerAssistants:150
      /*  // > CustomCode.answerAssistants:151
      else{  // > CustomCode.answerAssistants:152
        hint = "There should be some energy transferred\ninto the system "+check3aEnergy+" due to \n"+check3aReason;  // > CustomCode.answerAssistants:153
        return false  // > CustomCode.answerAssistants:154
        }  // > CustomCode.answerAssistants:155
      */  // > CustomCode.answerAssistants:156
      hint = "There should be some energy transferred\ninto the system "+check3aEnergy+" due to \n"+check3aReason;  // > CustomCode.answerAssistants:157
      return false  // > CustomCode.answerAssistants:158
      }  // > CustomCode.answerAssistants:159
    else if (check3a ==false && check3b ==false){  // > CustomCode.answerAssistants:160
      if (EtransIN ==0 && EtransIN2 ==0){return true}  // > CustomCode.answerAssistants:161
      else{  // > CustomCode.answerAssistants:162
        hint = "The energy transferred into\nthe system should be zero.";  // > CustomCode.answerAssistants:163
        return false  // > CustomCode.answerAssistants:164
        }  // > CustomCode.answerAssistants:165
      }  // > CustomCode.answerAssistants:166
    else{  // > CustomCode.answerAssistants:167
      debuggg="smth wrong at check3 :( ";  // > CustomCode.answerAssistants:168
      return true  // > CustomCode.answerAssistants:169
      }  // > CustomCode.answerAssistants:170
    }  // > CustomCode.answerAssistants:171
      // > CustomCode.answerAssistants:172
  //////////////////////////////////////////////////////////  // > CustomCode.answerAssistants:173
  // 5,6) Check what energy is present in both L diagrams //  // > CustomCode.answerAssistants:174
  //////////////////////////////////////////////////////////  // > CustomCode.answerAssistants:175
  function check5n6assistant(C,E,G,I,K,N,energyLst,stateWord){  // > CustomCode.answerAssistants:176
    // works similarly to zeroExceptEnergy() where it checks arguments for FALSE  // > CustomCode.answerAssistants:177
    // C is either (iniC) or (finC), which give T or F → same goes for the other variables  // > CustomCode.answerAssistants:178
    // energyLst - [iniTotalEnergy] or [finTotalEnergy]  // > CustomCode.answerAssistants:179
    // stateWord - "initial" or "final" strings to put in the hint  // > CustomCode.answerAssistants:180
    ///////////////////////////////////////////////////////////////////////////////////////  // > CustomCode.answerAssistants:181
      // > CustomCode.answerAssistants:182
    // Setting up: //  // > CustomCode.answerAssistants:183
    let checkLst = [C,E,G,I,K,N]    // lst contains T / F  // > CustomCode.answerAssistants:184
    let wordings = ["Chemical","Elastic","Gravitational","Internal","Kinetic","Nuclear"]  // > CustomCode.answerAssistants:185
      // > CustomCode.answerAssistants:186
    // checking process: //  // > CustomCode.answerAssistants:187
    for (let i=0; i< energyLst.length; i++){  // > CustomCode.answerAssistants:188
      if ( (checkLst[i] ==false) && ( energyLst[i] !=0) && (!ignoreEnergyLst.includes(i)) ){  // > CustomCode.answerAssistants:189
        // Hint to wrong energy stored //  // > CustomCode.answerAssistants:190
        hint = ""  // > CustomCode.answerAssistants:191
        for (let wordID=0; wordID < wordings.length; wordID++){  // > CustomCode.answerAssistants:192
          if (i==wordID){hint += wordings[wordID]}  // > CustomCode.answerAssistants:193
          }  // > CustomCode.answerAssistants:194
        hint += " energy should NOT be\nstored in the "+stateWord+" state of the system."  // > CustomCode.answerAssistants:195
        return false  // > CustomCode.answerAssistants:196
        }  // > CustomCode.answerAssistants:197
      else if ( (checkLst[i] ==true) && (energyLst[i] ==0) ){  // > CustomCode.answerAssistants:198
        // Hint to store correct energy //  // > CustomCode.answerAssistants:199
        hint = ""  // > CustomCode.answerAssistants:200
        for (let wordID=0; wordID < wordings.length; wordID++){  // > CustomCode.answerAssistants:201
          if (i==wordID){hint += wordings[wordID]}  // > CustomCode.answerAssistants:202
          }  // > CustomCode.answerAssistants:203
        hint += " energy should be\nstored in the "+stateWord+" state of the system."  // > CustomCode.answerAssistants:204
        return false  // > CustomCode.answerAssistants:205
        }  // > CustomCode.answerAssistants:206
      }  // > CustomCode.answerAssistants:207
    return true  // > CustomCode.answerAssistants:208
    }  // > CustomCode.answerAssistants:209
      // > CustomCode.answerAssistants:210
  //////////////////////////////////////////////////////////  // > CustomCode.answerAssistants:211
  // 7) Check the amount of energy with the formula given //  // > CustomCode.answerAssistants:212
  //////////////////////////////////////////////////////////  // > CustomCode.answerAssistants:213
  function check7assistant(){  // > CustomCode.answerAssistants:214
    let wordings = ["chemical","elastic","gravitational potential","internal","kinetic","nuclear"]  // > CustomCode.answerAssistants:215
    // load formula from userCode //  // > CustomCode.answerAssistants:216
    finalC=999; finalE=999; finalG=999; finalI=999; finalK=999; finalN=999; // to check whether user edited var  // > CustomCode.answerAssistants:217
    inequalityCheckLst = []  // final judgement  // > CustomCode.answerAssistants:218
    runUserCode("Error in code, please review code again.");  // > CustomCode.answerAssistants:219
    // checking process: //  // > CustomCode.answerAssistants:220
    passfail = []; // final judgement  // > CustomCode.answerAssistants:221
    let finalLst = [finalC, finalE, finalG, finalI, finalK, finalN];  // > CustomCode.answerAssistants:222
    //let finalLst = [fC,fE, fG, fI, fK, fN]; // = this is finTotalEnergy  // > CustomCode.answerAssistants:223
    let checkLst = [finC,finE,finG,finI,finK,finN];    // lst contains T/F  // > CustomCode.answerAssistants:224
    debuggg = finalLst+"\ncheckLst: "+checkLst+"\ninequalityCheckLst: "+inequalityCheckLst;  // > CustomCode.answerAssistants:225
    // check for the correct energy present in the initial state before checking condition //   // > CustomCode.answerAssistants:226
    for (let i=0; i < finTotalEnergy.length ; i++){  // > CustomCode.answerAssistants:227
      if ( checkLst[i] ==true && finalLst[i]!=999 ) {  // > CustomCode.answerAssistants:228
        if (finalLst[i] == finTotalEnergy[i]) {  // > CustomCode.answerAssistants:229
          passfail += true  // > CustomCode.answerAssistants:230
          }  // > CustomCode.answerAssistants:231
        else{  // > CustomCode.answerAssistants:232
          //alert("wrong")  // > CustomCode.answerAssistants:233
          hint = "The amount of "+wordings[i]+" energy in the final state is wrong"  // > CustomCode.answerAssistants:234
          passfail += false  // > CustomCode.answerAssistants:235
          }  // > CustomCode.answerAssistants:236
        }  // > CustomCode.answerAssistants:237
      }  // > CustomCode.answerAssistants:238
    // Final judgement: //  // > CustomCode.answerAssistants:239
    debuggg += "\npassfail: "+passfail;  // Equality formulas  // > CustomCode.answerAssistants:240
    if ( !inequalityCheckLst.includes(false) ){  // check inequality formula(s) if any  // > CustomCode.answerAssistants:241
      if ( allFalseLst(checkLst) ){  // highly unlikely this will occur  // > CustomCode.answerAssistants:242
        hint = "There should be no energy\npresent in the FINAL state.";  // > CustomCode.answerAssistants:243
        return false  // > CustomCode.answerAssistants:244
        }  // > CustomCode.answerAssistants:245
      if ( !passfail.includes(false) ){return true}  // check equality formula(s) if any  // > CustomCode.answerAssistants:246
      if ( passfail.includes(false) ){return false}   // > CustomCode.answerAssistants:247
      return true    // > CustomCode.answerAssistants:248
      }  // > CustomCode.answerAssistants:249
    else if ( inequalityCheckLst.includes(false) ){  // > CustomCode.answerAssistants:250
      hint = "The amount of energy in the final state is wrong.";  // > CustomCode.answerAssistants:251
      return false  // > CustomCode.answerAssistants:252
      }  // > CustomCode.answerAssistants:253
    }  // > CustomCode.answerAssistants:254

  //////////////////////////////////////////////////  // > CustomCode.check4assistant:1
  // 4) Check what energy is being transfered OUT //  // > CustomCode.check4assistant:2
  //////////////////////////////////////////////////  // > CustomCode.check4assistant:3
  function check4assistant(){  // > CustomCode.check4assistant:4
    if (check4b){    // → confirm 2 types of energy are transferred  // > CustomCode.check4assistant:5
      if (check4b && (EtransOUT >0 && EtransOUT2 >0) ){   // > CustomCode.check4assistant:6
        if ((updateTransOUT == 1 && check4aEnergy == "through propagation of waves") ||   // > CustomCode.check4assistant:7
            (updateTransOUT == 2 && check4aEnergy == "mechanically") ||   // > CustomCode.check4assistant:8
            (updateTransOUT == 3 && check4aEnergy == "through heating") ||   // > CustomCode.check4assistant:9
            (updateTransOUT == 4 && check4aEnergy == "electrically") ||  // > CustomCode.check4assistant:10
            (updateTransOUT == 5 && check4aEnergy == "chemically") ){  // > CustomCode.check4assistant:11
          if (updateTransOUT2 == 1 && check4bEnergy == "through propagation of waves"){return true}  // > CustomCode.check4assistant:12
          else if (updateTransOUT2 == 2 && check4bEnergy == "mechanically"){return true}  // > CustomCode.check4assistant:13
          else if (updateTransOUT2 == 3 && check4bEnergy == "through heating"){return true}  // > CustomCode.check4assistant:14
          else if (updateTransOUT2 == 4 && check4bEnergy == "electrically"){return true}  // > CustomCode.check4assistant:15
          else if (updateTransOUT2 == 5 && check4bEnergy == "chemically"){return true}  // > CustomCode.check4assistant:16
          else{  // > CustomCode.check4assistant:17
            hint = "There should be some energy transferred out\nof the system "+check4bEnergy+" due to \n"+check4bReason;  // > CustomCode.check4assistant:18
            return false  // > CustomCode.check4assistant:19
            }  // > CustomCode.check4assistant:20
          }  // > CustomCode.check4assistant:21
        else if ((updateTransOUT2 == 1 && check4aEnergy == "through propagation of waves") ||   // > CustomCode.check4assistant:22
            (updateTransOUT2 == 2 && check4aEnergy == "mechanically") ||   // > CustomCode.check4assistant:23
            (updateTransOUT2 == 3 && check4aEnergy == "through heating") ||    // > CustomCode.check4assistant:24
            (updateTransOUT2 == 4 && check4aEnergy == "electrically") ||  // > CustomCode.check4assistant:25
            (updateTransOUT2 == 5 && check4aEnergy == "chemically") ){  // > CustomCode.check4assistant:26
          if (updateTransOUT == 1 && check4bEnergy == "through propagation of waves"){return true}  // > CustomCode.check4assistant:27
          else if (updateTransOUT == 2 && check4bEnergy == "mechanically"){return true}  // > CustomCode.check4assistant:28
          else if (updateTransOUT == 3 && check4bEnergy == "through heating"){return true}  // > CustomCode.check4assistant:29
          else if (updateTransOUT == 4 && check4bEnergy == "electrically"){return true}  // > CustomCode.check4assistant:30
          else if (updateTransOUT == 5 && check4bEnergy == "chemically"){return true}  // > CustomCode.check4assistant:31
          else{  // > CustomCode.check4assistant:32
            hint = "There should be some energy transferred\nout of the system "+check4bEnergy+" due to \n"+check4bReason;  // > CustomCode.check4assistant:33
            return false  // > CustomCode.check4assistant:34
            }  // > CustomCode.check4assistant:35
          }  // > CustomCode.check4assistant:36
        else{  // > CustomCode.check4assistant:37
          hint = "There should be some energy transferred\nout of the system "+check4aEnergy+" due to \n"+check4aReason;  // > CustomCode.check4assistant:38
          return false  // > CustomCode.check4assistant:39
          }  // > CustomCode.check4assistant:40
        }  // > CustomCode.check4assistant:41
      else{  // > CustomCode.check4assistant:42
        hint = "There should have some energy\ntransferred out of the system\n"+check4aEnergy+" and "+check4bEnergy+".";  // > CustomCode.check4assistant:43
        }  // > CustomCode.check4assistant:44
      }  // > CustomCode.check4assistant:45
    else if (check4a){  // > CustomCode.check4assistant:46
      if (EtransOUT >0 && EtransOUT2 ==0){  // > CustomCode.check4assistant:47
        if (updateTransOUT == 1 && check4aEnergy == "through propagation of waves"){return true}  // > CustomCode.check4assistant:48
        if (updateTransOUT == 2 && check4aEnergy == "mechanically"){return true}  // > CustomCode.check4assistant:49
        if (updateTransOUT == 3 && check4aEnergy == "through heating"){return true}  // > CustomCode.check4assistant:50
        if (updateTransOUT == 4 && check4aEnergy == "electrically"){return true}  // > CustomCode.check4assistant:51
        if (updateTransOUT == 5 && check4aEnergy == "chemically"){return true}  // > CustomCode.check4assistant:52
        }  // > CustomCode.check4assistant:53
      else if (EtransOUT ==0 && EtransOUT2 >0){  // > CustomCode.check4assistant:54
        if (updateTransOUT2 == 1 && check4aEnergy == "through propagation of waves"){return true}  // > CustomCode.check4assistant:55
        if (updateTransOUT2 == 2 && check4aEnergy == "mechanically"){return true}  // > CustomCode.check4assistant:56
        if (updateTransOUT2 == 3 && check4aEnergy == "through heating"){return true}  // > CustomCode.check4assistant:57
        if (updateTransOUT2 == 4 && check4aEnergy == "electrically"){return true}  // > CustomCode.check4assistant:58
        if (updateTransOUT2 == 5 && check4aEnergy == "chemically"){return true}  // > CustomCode.check4assistant:59
        }  // > CustomCode.check4assistant:60
      else if (EtransOUT >0 && EtransOUT2 >0){  // > CustomCode.check4assistant:61
        if (updateTransOUT == 1 && updateTransOUT2 == 1 && check4aEnergy == "through propagation of waves"){return true}  // > CustomCode.check4assistant:62
        if (updateTransOUT == 2 && updateTransOUT2 == 2 && check4aEnergy == "mechanically"){return true}  // > CustomCode.check4assistant:63
        if (updateTransOUT == 3 && updateTransOUT2 == 3 && check4aEnergy == "through heating"){return true}  // > CustomCode.check4assistant:64
        if (updateTransOUT == 4 && updateTransOUT2 == 4 && check4aEnergy == "electrically"){return true}  // > CustomCode.check4assistant:65
        if (updateTransOUT == 5 && updateTransOUT2 == 5 && check4aEnergy == "chemically"){return true}  // > CustomCode.check4assistant:66
        hint = "There should only be some energy transferred\nout of the system "+ check4aEnergy+".";  // > CustomCode.check4assistant:67
        return false  // > CustomCode.check4assistant:68
        }  // > CustomCode.check4assistant:69
      hint = "There should be some energy transferred\nout of the system "+check4aEnergy+" due to \n"+check4aReason;  // > CustomCode.check4assistant:70
      return false  // > CustomCode.check4assistant:71
      }  // > CustomCode.check4assistant:72
    else if (check4a ==false && check4b ==false){  // > CustomCode.check4assistant:73
      if (EtransOUT ==0 && EtransOUT2 ==0){return true}  // > CustomCode.check4assistant:74
      else{  // > CustomCode.check4assistant:75
        hint = "The energy transferred out\nof the system should be zero.";  // > CustomCode.check4assistant:76
        return false  // > CustomCode.check4assistant:77
        }  // > CustomCode.check4assistant:78
      }  // > CustomCode.check4assistant:79
    else{  // > CustomCode.check4assistant:80
      debuggg="smth wrong at check4 :( ";  // > CustomCode.check4assistant:81
      return true  // > CustomCode.check4assistant:82
      }  // > CustomCode.check4assistant:83
    }  // > CustomCode.check4assistant:84

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
  var k =0.90 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeOrientation:7
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
  try { // allow code to run in Student Learning Space   // > CustomCode.speech:4
  var isCordova = (!!this.parent.cordova || !!window.cordova);  // > CustomCode.speech:5
  if(isCordova) { // check it is running in Android or iOS  // > CustomCode.speech:6
         // parent.TTS.speak({text:option,locale:'zh-CN'});  // > CustomCode.speech:7
  	parent.TTS.speak({text:option,locale:'us-EN'});  // > CustomCode.speech:8
  	// parent.TTS.speak({text:option,locale:'en-US'});  // > CustomCode.speech:9
  	// parent.TTS.speak({text:option,locale:'id-ID'});  // > CustomCode.speech:10
  }   // > CustomCode.speech:11
  }   // > CustomCode.speech:12
  catch(e) {  // > CustomCode.speech:13
    var isCordova = false;  // > CustomCode.speech:14
    }  // > CustomCode.speech:15
      // > CustomCode.speech:16
     var msg = new SpeechSynthesisUtterance(option);  // > CustomCode.speech:17
    //https://stackoverflow.com/questions/43983845/speechsynthesis-api-for-chinese-firefox  // > CustomCode.speech:18
    // Set the text.  // > CustomCode.speech:19
  	//msg.text = option;   // > CustomCode.speech:20
  	//https://forums.developer.apple.com/message/323564#323564  // > CustomCode.speech:21
  	// comment out the next 2 lines for english  // > CustomCode.speech:22
  //msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Ting-Ting'; })[0];  // > CustomCode.speech:23
  //msg.lang = 'zh-CH'; // need for android?  // > CustomCode.speech:24
  //msg.lang = 'id-ID'; // need for android?  // > CustomCode.speech:25
  msg.lang = 'us-EN'; // need for android?  // > CustomCode.speech:26
  //https://flaviocopes.com/speech-synthesis-api/  // > CustomCode.speech:27
  //debug  // > CustomCode.speech:28
  //console.log(`Voices #: ${speechSynthesis.getVoices().length}`)  // > CustomCode.speech:29
  //speechSynthesis.getVoices().forEach(voice => {  // > CustomCode.speech:30
  // console.log(voice.name, voice.lang)  // > CustomCode.speech:31
  //})  // > CustomCode.speech:32
  //debug  // > CustomCode.speech:33
  // Queue this utterance.  // > CustomCode.speech:34
  window.speechSynthesis.speak(msg);  // > CustomCode.speech:35
     // > CustomCode.speech:36
  }  // > CustomCode.speech:37

  function runUserCode (errorMsg) {  // > CustomCode.runUserCode:1
    var userPlay = _view.userCode.getValue();  // > CustomCode.runUserCode:2
    try {  // > CustomCode.runUserCode:3
      eval(userPlay);  // > CustomCode.runUserCode:4
      }  // > CustomCode.runUserCode:5
    catch(error){  // > CustomCode.runUserCode:6
      _tools.showOkDialog(errorMsg);  // > CustomCode.runUserCode:7
      }  // > CustomCode.runUserCode:8
  }  // > CustomCode.runUserCode:9

  function revealSolution () {    // used in the reveal button  // > CustomCode.revealSol:1
    // to handle infinite loops causing page timeout  // > CustomCode.revealSol:2
    let loopCount = 0;  // > CustomCode.revealSol:3
    let maxIterations = 1000000;    // > CustomCode.revealSol:4
    // Read through the checks for answer --> Update var in control of displaying the answers //  // > CustomCode.revealSol:5
    while (true){  // > CustomCode.revealSol:6
      // Read through check 3 //  // > CustomCode.revealSol:7
      if (true){  // > CustomCode.revealSol:8
        if (check3aEnergy == "through propagation of waves"){updateTransIN =1; EtransIN =Math.ceil( Math.random()*10 );_view.energyTypeIN.setSelectedOptions(["Propagation of waves"]);  // > CustomCode.revealSol:9
        }  // > CustomCode.revealSol:10
        else if (check3aEnergy == "mechanically")           {updateTransIN =2;EtransIN =Math.ceil( Math.random()*10 );_view.energyTypeIN.setSelectedOptions(["Mechanically"]);  // > CustomCode.revealSol:11
        }  // > CustomCode.revealSol:12
        else if (check3aEnergy == "through heating")        {updateTransIN =3; EtransIN =Math.ceil( Math.random()*10 );_view.energyTypeIN.setSelectedOptions(["Heating"]);  // > CustomCode.revealSol:13
        }  // > CustomCode.revealSol:14
        else if (check3aEnergy == "electrically")           {updateTransIN =4; EtransIN =Math.ceil( Math.random()*10 );_view.energyTypeIN.setSelectedOptions(["Electrically"]);  // > CustomCode.revealSol:15
        }  // > CustomCode.revealSol:16
        else if (check3aEnergy == "chemically")             {updateTransIN =5; EtransIN =Math.ceil( Math.random()*10 );_view.energyTypeIN.setSelectedOptions(["Chemically"]);  // > CustomCode.revealSol:17
        }  // > CustomCode.revealSol:18
        else{  updateTransIN =0; EtransIN =0;}  // > CustomCode.revealSol:19
        // Correctly set the combobox  // > CustomCode.revealSol:20
          // > CustomCode.revealSol:21
        //_view.energyTypeIN.setSelectedOptions(["Mechanically"];  // > CustomCode.revealSol:22
        //alert(check3aEnergy)  // > CustomCode.revealSol:23
        dragEtransIN =EtransIN;  // > CustomCode.revealSol:24
        }  // > CustomCode.revealSol:25
      if (true){  // > CustomCode.revealSol:26
        if (check3bEnergy == "through propagation of waves"){updateTransIN2 =1; EtransIN2 =Math.ceil( Math.random()*10 );_view.energyTypeIN2.setSelectedOptions(["Propagation of waves"])  // > CustomCode.revealSol:27
        }  // > CustomCode.revealSol:28
        else if (check3bEnergy == "mechanically")           {updateTransIN2 =2; EtransIN2 =Math.ceil( Math.random()*10 );_view.energyTypeIN2.setSelectedOptions(["Mechanically"])  // > CustomCode.revealSol:29
        }  // > CustomCode.revealSol:30
        else if (check3bEnergy == "through heating")        {updateTransIN2 =3; EtransIN2 =Math.ceil( Math.random()*10 );_view.energyTypeIN2.setSelectedOptions(["Heating"])  // > CustomCode.revealSol:31
        }  // > CustomCode.revealSol:32
        else if (check3bEnergy == "electrically")           {updateTransIN2 =4; EtransIN2 =Math.ceil( Math.random()*10 );_view.energyTypeIN2.setSelectedOptions(["Electrically"])  // > CustomCode.revealSol:33
        }  // > CustomCode.revealSol:34
        else if (check3bEnergy == "chemically")             {updateTransIN2 =5; EtransIN2 =Math.ceil( Math.random()*10 );_view.energyTypeIN2.setSelectedOptions(["Chemically"])  // > CustomCode.revealSol:35
        }  // > CustomCode.revealSol:36
        else{  updateTransIN2 =0; EtransIN2 =0;}  // > CustomCode.revealSol:37
        dragEtransIN2 =EtransIN2;  // > CustomCode.revealSol:38
        }  // > CustomCode.revealSol:39
      // Read through check 4 //  // > CustomCode.revealSol:40
      if (true){  // > CustomCode.revealSol:41
        if (check4aEnergy == "through propagation of waves"){updateTransOUT =1; EtransOUT =Math.ceil( Math.random()*10 );_view.energyTypeOUT.setSelectedOptions(["Propagation of waves"])  // > CustomCode.revealSol:42
        }  // > CustomCode.revealSol:43
        else if (check4aEnergy == "mechanically")           {updateTransOUT =2; EtransOUT =Math.ceil( Math.random()*10 );_view.energyTypeOUT.setSelectedOptions(["Mechanically"]);  // > CustomCode.revealSol:44
        }  // > CustomCode.revealSol:45
        else if (check4aEnergy == "through heating")        {updateTransOUT =3; EtransOUT =Math.ceil( Math.random()*10 );_view.energyTypeOUT.setSelectedOptions(["Heating"]);  // > CustomCode.revealSol:46
        }  // > CustomCode.revealSol:47
        else if (check4aEnergy == "electrically")           {updateTransOUT =4; EtransOUT =Math.ceil( Math.random()*10 );_view.energyTypeOUT.setSelectedOptions(["Electrically"])  // > CustomCode.revealSol:48
        }  // > CustomCode.revealSol:49
        else if (check4aEnergy == "chemically")             {updateTransOUT =5; EtransOUT =Math.ceil( Math.random()*10 );_view.energyTypeOUT.setSelectedOptions(["Chemically"])  // > CustomCode.revealSol:50
        }  // > CustomCode.revealSol:51
        else{  updateTransOUT =0; EtransOUT =0;}  // > CustomCode.revealSol:52
        dragEtransOUT =EtransOUT;  // > CustomCode.revealSol:53
        }  // > CustomCode.revealSol:54
      if (true){  // > CustomCode.revealSol:55
        if (check4bEnergy == "through propagation of waves"){updateTransOUT2 =1; EtransOUT2 =Math.ceil( Math.random()*10 );_view.energyTypeOUT2.setSelectedOptions(["Propagation of waves"])  // > CustomCode.revealSol:56
        }  // > CustomCode.revealSol:57
        else if (check4bEnergy == "mechanically")           {updateTransOUT2 =2; EtransOUT2 =Math.ceil( Math.random()*10 );_view.energyTypeOUT2.setSelectedOptions(["Mechanically"]);  // > CustomCode.revealSol:58
        }  // > CustomCode.revealSol:59
        else if (check4bEnergy == "through heating")        {updateTransOUT2 =3; EtransOUT2 =Math.ceil( Math.random()*10 );_view.energyTypeOUT2.setSelectedOptions(["Heating"]);  // > CustomCode.revealSol:60
        }  // > CustomCode.revealSol:61
        else if (check4bEnergy == "electrically")           {updateTransOUT2 =4; EtransOUT2 =Math.ceil( Math.random()*10 );_view.energyTypeOUT2.setSelectedOptions(["Electrically"])  // > CustomCode.revealSol:62
        }  // > CustomCode.revealSol:63
        else if (check4bEnergy == "chemically")             {updateTransOUT2 =5; EtransOUT2 =Math.ceil( Math.random()*10 );_view.energyTypeOUT2.setSelectedOptions(["Chemically"])  // > CustomCode.revealSol:64
        }  // > CustomCode.revealSol:65
        else{  updateTransOUT2 =0; EtransOUT2 =0;}  // > CustomCode.revealSol:66
        dragEtransOUT2 =EtransOUT2;  // > CustomCode.revealSol:67
        }  // > CustomCode.revealSol:68
      // Read through check 5n6 //  // > CustomCode.revealSol:69
     // > CustomCode.revealSol:70
       iniEnergiesLst = [iniC, iniE, iniG, iniI, iniK, iniN];  // > CustomCode.revealSol:71
       finEnergiesLst = [finC, finE, finG, finI, finK, finN];  // > CustomCode.revealSol:72
       dragEnergiesLst = [dragCY, dragEY, dragGY, dragIY, dragKY, dragNY];  // > CustomCode.revealSol:73
       dragEnergies2Lst = [dragC2Y, dragE2Y, dragG2Y, dragI2Y, dragK2Y, dragN2Y];  // > CustomCode.revealSol:74
      for (let i=0; i < iniEnergiesLst.length; i++){  // ID is same as iniTotalEnergy and finTotalEnergy  // > CustomCode.revealSol:75
        if (iniEnergiesLst[i] == true){  // > CustomCode.revealSol:76
          iniTotalEnergy[i] =dragEnergiesLst[i] = Math.ceil( Math.random()*10 );  // > CustomCode.revealSol:77
          //dragEnergiesLst[i] = iniTotalEnergy[i];  // > CustomCode.revealSol:78
         // alert(dragEnergiesLst[4])  // > CustomCode.revealSol:79
         // alert("dragKY ="+ dragKY)  // > CustomCode.revealSol:80
          } // fixed by lookang dragEnergiesLst  // > CustomCode.revealSol:81
        else if (iniEnergiesLst[i] == false){   // > CustomCode.revealSol:82
        iniTotalEnergy[i] =0;  // > CustomCode.revealSol:83
        dragEnergiesLst[i] = iniTotalEnergy[i];  // > CustomCode.revealSol:84
        }  // > CustomCode.revealSol:85
          // > CustomCode.revealSol:86
        if (finEnergiesLst[i] == true){  // > CustomCode.revealSol:87
          finTotalEnergy[i]  = Math.ceil( Math.random()*10 );  // > CustomCode.revealSol:88
          dragEnergies2Lst[i] = finTotalEnergy[i];  // > CustomCode.revealSol:89
          } // fixed by lookang dragEnergies2Lst  // > CustomCode.revealSol:90
        else{   // > CustomCode.revealSol:91
        finTotalEnergy[i] =0;  // > CustomCode.revealSol:92
        dragEnergies2Lst[i] = finTotalEnergy[i];  // > CustomCode.revealSol:93
        }  // > CustomCode.revealSol:94
        //update dragYs after loop fix by lookang 20240624  // > CustomCode.revealSol:95
        dragCY = dragEnergiesLst[0];  // > CustomCode.revealSol:96
        dragEY = dragEnergiesLst[1]  // > CustomCode.revealSol:97
        dragGY = dragEnergiesLst[2]  // > CustomCode.revealSol:98
        dragIY = dragEnergiesLst[3]  // > CustomCode.revealSol:99
        dragKY = dragEnergiesLst[4];  // > CustomCode.revealSol:100
        dragNY = dragEnergiesLst[5]  // > CustomCode.revealSol:101
        dragC2Y = dragEnergies2Lst[0];  // > CustomCode.revealSol:102
        dragE2Y = dragEnergies2Lst[1]  // > CustomCode.revealSol:103
        dragG2Y = dragEnergies2Lst[2]  // > CustomCode.revealSol:104
        dragI2Y = dragEnergies2Lst[3]  // > CustomCode.revealSol:105
        dragK2Y = dragEnergies2Lst[4];  // > CustomCode.revealSol:106
        dragN2Y = dragEnergies2Lst[5]  // > CustomCode.revealSol:107
          // > CustomCode.revealSol:108
      // > CustomCode.revealSol:109
        }  // > CustomCode.revealSol:110
        // > CustomCode.revealSol:111
      // Read through check 7 //  // > CustomCode.revealSol:112
      if (check7a==true){ maxIterations = 5000000;    // let it load longer  // > CustomCode.revealSol:113
        _update();  // > CustomCode.revealSol:114
        let equalityEnergies = [finalC, finalE, finalG, finalI, finalK, finalN];  // > CustomCode.revealSol:115
        for (let i=0; i < equalityEnergies; i++){  // ID is same as finTotalEnergy  // > CustomCode.revealSol:116
          finTotalEnergy[i] = Math.round( equalityEnergies[i] );  // > CustomCode.revealSol:117
          }  // > CustomCode.revealSol:118
        }  // > CustomCode.revealSol:119
      // Check if all variables meet the criteria  // > CustomCode.revealSol:120
      try{  // > CustomCode.revealSol:121
        answers1();  // > CustomCode.revealSol:122
        loopCount++;  // > CustomCode.revealSol:123
        if (loopCount >= maxIterations) {throw new Error("Maximum iteration limit reached, exiting loop.");}  // > CustomCode.revealSol:124
        if (updateAnswer ==1)  {break;}  // > CustomCode.revealSol:125
        } catch (error){alert("Error in generating answer key. Please refresh browser and try again.");break;}  // > CustomCode.revealSol:126
      }  // > CustomCode.revealSol:127
    }  // > CustomCode.revealSol:128

  function roundTheLst(lst){  // > CustomCode.roundTheLst:1
    for (let i=0; i<lst.length; i++){  // > CustomCode.roundTheLst:2
      lst[i] = Math.round(lst[i]);  // > CustomCode.roundTheLst:3
      }  // > CustomCode.roundTheLst:4
    return lst  // > CustomCode.roundTheLst:5
  }  // > CustomCode.roundTheLst:6
  function oneTrueLst(lst,element){         // used on interactPrompt lst   // > CustomCode.roundTheLst:7
    for (let i=0; i<lst.length; i++){  // > CustomCode.roundTheLst:8
      lst[i] = false;  // > CustomCode.roundTheLst:9
      if (i==element){  lst[i] = true  };  // > CustomCode.roundTheLst:10
      }  // > CustomCode.roundTheLst:11
    }  // > CustomCode.roundTheLst:12
  function numberedLst(number) {  // > CustomCode.roundTheLst:13
    let lst = [];  // > CustomCode.roundTheLst:14
    // Populate the list with negative numbers if number is negative  // > CustomCode.roundTheLst:15
    if (number < 0) {  // > CustomCode.roundTheLst:16
      for (let i = -1; i >= number; i--) {  // > CustomCode.roundTheLst:17
        lst.push(i);  // > CustomCode.roundTheLst:18
      }  // > CustomCode.roundTheLst:19
    }  // > CustomCode.roundTheLst:20
    // Append positive numbers starting from 1 up to the absolute value of the input number  // > CustomCode.roundTheLst:21
    for (let i = 0; i < Math.floor(number); i++) {  // > CustomCode.roundTheLst:22
      lst.push(i);  // > CustomCode.roundTheLst:23
    }  // > CustomCode.roundTheLst:24
    return lst;  // > CustomCode.roundTheLst:25
  }  // > CustomCode.roundTheLst:26
  /*  // > CustomCode.roundTheLst:27
  function numberedLst(number){          // used in iconsPicts (L)  // > CustomCode.roundTheLst:28
    lst = [];  // > CustomCode.roundTheLst:29
    for (let i=0; i < Math.floor(number); i++){  // > CustomCode.roundTheLst:30
      lst.push(i);  // > CustomCode.roundTheLst:31
      }  // > CustomCode.roundTheLst:32
    //alert(lst);  // > CustomCode.roundTheLst:33
    return lst    // return [0,1,2, ...]  // > CustomCode.roundTheLst:34
    }  // > CustomCode.roundTheLst:35
  */  // > CustomCode.roundTheLst:36
  function numberedLstFromX(number,X){  // used in iconsPicts (O)  // > CustomCode.roundTheLst:37
    lst = numberedLst(number);  // > CustomCode.roundTheLst:38
    for (let i=0; i < lst.length; i++){  // > CustomCode.roundTheLst:39
      lst[i] = lst[i] + X;   // > CustomCode.roundTheLst:40
      }  // > CustomCode.roundTheLst:41
    //alert(lst)  // > CustomCode.roundTheLst:42
    return lst    // return [X,X+1, ...]  // > CustomCode.roundTheLst:43
    }  // > CustomCode.roundTheLst:44
      // > CustomCode.roundTheLst:45
  function allFalseLst(lst){          // used the check7 for checkLst  // > CustomCode.roundTheLst:46
    for (let i=0; i<lst.length; i++){  // > CustomCode.roundTheLst:47
      if (lst[i] == true){return false}  // > CustomCode.roundTheLst:48
      }  // > CustomCode.roundTheLst:49
    debuggg += "\ninside allFalseLst"  // > CustomCode.roundTheLst:50
    return true  // > CustomCode.roundTheLst:51
    }  // > CustomCode.roundTheLst:52
      // > CustomCode.roundTheLst:53
  /////////////////////////////////////  Function serves to label the  // > CustomCode.roundTheLst:54
  // specifically for trans_Text (O) //  trans_Text where ID=0 gives   // > CustomCode.roundTheLst:55
  /////////////////////////////////////  textLst[0] but img otherwise  // > CustomCode.roundTheLst:56
  // ERROR: (Text != ImageUrl)  →→→ FUNCTION NOT USED, IDEA DECLINED  →→→  just (T₁) will do  // > CustomCode.roundTheLst:57
  // :/ HtmlView / transIN_text / Text → % transIN[updateTransIN] %  // > CustomCode.roundTheLst:58
  // → % textToImgLst(transIN, imgIN, updateTransIN) %  // > CustomCode.roundTheLst:59
  function textToImgLst(textLst, imgLst, updateID){    // > CustomCode.roundTheLst:60
    if (updateID==0){return textLst[updateID]}  // > CustomCode.roundTheLst:61
    else  {return imgLst[updateID]}  // > CustomCode.roundTheLst:62
    }  // > CustomCode.roundTheLst:63



  //written by ryan451  // > CustomCode.import:1
  //copy to custom function of ejss  // > CustomCode.import:2
  //version 2  // > CustomCode.import:3
  /**  // > CustomCode.import:4
   * @async  // > CustomCode.import:5
   * @function attemptLoadGraph  // > CustomCode.import:6
   * @returns {Promise<object>} Promise resolved: an object representing the data that was loaded  // > CustomCode.import:7
   */  // > CustomCode.import:8
  async function attemptLoadGraph() {  // > CustomCode.import:9
    const graphResponse = await fetch("records.json");  // > CustomCode.import:10
    const graphSettings = await graphResponse.json();  // > CustomCode.import:11
    return graphSettings;  // > CustomCode.import:12
  }  // > CustomCode.import:13
  /*  // > CustomCode.import:14
  Use like this:  // > CustomCode.import:15
  attemptLoadGraph().then(function(data) {  // > CustomCode.import:16
    uiVariable1 = data.uiVariable1;  // > CustomCode.import:17
    buttonText = data.buttonText;  // > CustomCode.import:18
    _view.update();  // > CustomCode.import:19
  });  // > CustomCode.import:20
  */  // > CustomCode.import:21

  async function exportGraph(exportObject, filename="export.zip") {  // > CustomCode.export:1
    // Get the zipped export template  // > CustomCode.export:2
    const exportTemplatePath = "export-template.zip";  // > CustomCode.export:3
    const graphFileName = "records.json";  // > CustomCode.export:4
    //const IS_TESTING_EXPORT = true;  // > CustomCode.export:5
    let exportZip;  // > CustomCode.export:6
    //if (IS_TESTING_EXPORT) {  // > CustomCode.export:7
     // exportZip = new JSZip();  // > CustomCode.export:8
    //} else {  // > CustomCode.export:9
      exportZip = await getZipFromPath(exportTemplatePath);  // > CustomCode.export:10
    //}  // > CustomCode.export:11
    exportZip.file(graphFileName, JSON.stringify(exportObject));  // > CustomCode.export:12
    exportZip.generateAsync({type: "blob"}).then(blob => saveAs(blob, filename));  // > CustomCode.export:13
  }  // > CustomCode.export:14
  function onGraphExportComplete() {  // > CustomCode.export:15
    alert("Export complete");  // > CustomCode.export:16
  }  // > CustomCode.export:17
  async function getZipFromPath(path) {  // > CustomCode.export:18
    return await JSZip.loadAsync(await (await fetch(path)).blob());  // > CustomCode.export:19
  }  // > CustomCode.export:20
  function saveBlob(blob, filename) {  // > CustomCode.export:21
    var elem = window.document.createElement("a");  // > CustomCode.export:22
    var objectUrl = window.URL.createObjectURL(blob);  // > CustomCode.export:23
    elem.href = objectUrl;  // > CustomCode.export:24
    elem.download = filename;  // > CustomCode.export:25
    elem.click();  // > CustomCode.export:26
      // > CustomCode.export:27
    // Cleanup allocated objects to avoid memory leaks  // > CustomCode.export:28
    // These objects do not get GCed  // > CustomCode.export:29
    setTimeout(function(elem, objectUrl) {  // > CustomCode.export:30
      elem.remove();  // > CustomCode.export:31
      window.URL.revokeObjectURL(objectUrl);  // > CustomCode.export:32
    }, 1_000, elem, objectUrl);  // > CustomCode.export:33
  }  // > CustomCode.export:34

  _model.addToInitialization(function() {
    if (!__pagesEnabled["initial"]) return;
    /*  // > Initialization.initial:1
    // draw X positions of the energy: //  // > Initialization.initial:2
    for (let i=1; i<= iniTotalEnergy.length; i++){  // > Initialization.initial:3
      energyXpos.push(i);  // gives [1,2,3,4,5,6]  // > Initialization.initial:4
      }  // > Initialization.initial:5
      */  // > Initialization.initial:6
     // let customOrder = [1, 2, 5, 4, 6, 3];  // Your desired order  // > Initialization.initial:7
    //pushCustomOrder(customOrder, energyXpos);  // > Initialization.initial:8
    energyXpos[0] = 1  //C  // > Initialization.initial:9
    energyXpos[1] = 2 // E  // > Initialization.initial:10
    energyXpos[2] = 6 //G  // > Initialization.initial:11
    energyXpos[3] = 4 //I  // > Initialization.initial:12
    energyXpos[4] = 3 //K  // > Initialization.initial:13
    energyXpos[5] = 5 // N to acheive Desired order CEGIKN  // > Initialization.initial:14
    //customOrder = [1, 2, 6, 4, 3, 5];  // Desired order CEKING  // > Initialization.initial:15
    customOrder = [1, 2, 3, 4, 5, 6];  // Desired order CEGIKN  // > Initialization.initial:16
    //customOrder = [5, 6, 4, 2, 1, 3]  // Desired order KINGCE  // > Initialization.initial:17
    // writing here cuz there's space to read //  // > Initialization.initial:18
    formulaText = "Initial Energy of the System <b>+</b> Energy Transferred Into the System "  // > Initialization.initial:19
    formulaText += "<b>=</b> Energy Transferred Out of the System <b>+</b> Final Energy of the System"  // > Initialization.initial:20
    legendText = "<b><u>Legend</u>:</b>"  // > Initialization.initial:21
    legendText += "\nC - Chemical || "  // > Initialization.initial:22
    legendText += "\nE - Elastic || "  // > Initialization.initial:23
    legendText += "\nG - Gravitational || "  // > Initialization.initial:24
    legendText += "\nI - Internal || "  // > Initialization.initial:25
    legendText += "\nK - Kinetic || "  // > Initialization.initial:26
    legendText += "\nN - Nuclear "  // > Initialization.initial:27
    eTooltip = "Electrically: \nTransfer of energy from the chemical store of a power supply to the kinetic store of a fan motor."  // > Initialization.initial:28
    eTooltip+= "\nE.g. switching on a fan."  // > Initialization.initial:29
    hTooltip = "Heating: \nTransfer of energy from the internal store of a heating element to the internal store of water molecules."  // > Initialization.initial:30
    hTooltip+= "\nE.g. Boiling water in a kettle."  // > Initialization.initial:31
    mTooltip = "Mechanically: \nTransfer of energy from the chemical store of a person to the kinetic store of a trolley."  // > Initialization.initial:32
    mTooltip+= "\nE.g. Pushing a trolley."  // > Initialization.initial:33
    pTooltip = "Propogation of waves: \nTransfer of energy from the chemical store of a power supply to the kinetic store of a fan motor."  // > Initialization.initial:34
    pTooltip+= "\nE.g. Switching on a fan."  // > Initialization.initial:35
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["userPlay"]) return;
    var userPlay =  // > Initialization.userPlay:1
    "// Pls ENSURE that the above checks have been gone through before proceeding in this check, especially in the initial & final state.\n"+  // > Initialization.userPlay:2
    "// initial energy variables are ⇒ C, E, G, I, K, N\n"+  // > Initialization.userPlay:3
    "// final energy variables are   ⇒ finalC, finalE, finalG, finalI, finalK, finalN\n"+  // > Initialization.userPlay:4
    "// To edit the following codes, please remove the comments '//' to implement the line of the code.\n"+  // > Initialization.userPlay:5
    "// Edit the following codes (Change magnitude) to get desired conditions:\n\n"+  // > Initialization.userPlay:6
    "//finalC = 0.5 * C\n"+  // > Initialization.userPlay:7
    "//finalE = 2 * E\n"+  // > Initialization.userPlay:8
    "//finalG = 1 * G\n"+  // > Initialization.userPlay:9
    "//finalI = 1 * I\n"+  // > Initialization.userPlay:10
    "//finalK = 1 * K\n"+  // > Initialization.userPlay:11
    "//finalN = 1 * N\n\n"+  // > Initialization.userPlay:12
    "// Final energy variables becomes ⇒ fC, fE, fG, fI, fK, fN\n"+  // > Initialization.userPlay:13
    "// Edit the following INEQUALITY formulas & the operators in the brackets () to get desired conditions: uncomment '//' for required formulas \n\n"+  // > Initialization.userPlay:14
    "//if (fC < C){inequalityCheckLst += true} else{inequalityCheckLst += false}\n"+  // > Initialization.userPlay:15
    "//if (fE <= E){inequalityCheckLst += true} else{inequalityCheckLst += false}\n"+  // > Initialization.userPlay:16
    "//if (fG > G) {inequalityCheckLst += true} else{inequalityCheckLst += false}\n"+  // > Initialization.userPlay:17
    "//if (fI > I) {inequalityCheckLst += true} else{inequalityCheckLst += false}\n"+  // > Initialization.userPlay:18
    "//if (fK >= K){inequalityCheckLst += true} else{inequalityCheckLst += false}\n"+  // > Initialization.userPlay:19
    "//if (fN >= N){inequalityCheckLst += true} else{inequalityCheckLst += false}\n"+  // > Initialization.userPlay:20
    "//customOrder = [1, 2, 3, 4, 5, 6];  // Desired alphabetic order CEGIKN \n"+  // > Initialization.userPlay:21
    "//customOrder = [1, 2, 6, 4, 3, 5];  // Desired easy to recall order CEKING \n"+  // > Initialization.userPlay:22
    "//customOrder = [5, 6, 4, 2, 1, 3]  // Desired easy to recall order KINGCE \n"  // > Initialization.userPlay:23
    _view.userCode.setValue(userPlay);  // > Initialization.userPlay:24
    // var userPlay = _view.userCode.getValue(); // ⇒ to be included   // > Initialization.userPlay:25
    ///////////////  // > Initialization.userPlay:26
    // REFERENCE //  // > Initialization.userPlay:27
    ///////////////  // > Initialization.userPlay:28
    /*  // > Initialization.userPlay:29
    " M = [ [1,2,3,4], //M matrix is declared globally\n"+  // > Initialization.userPlay:30
    "          [5,6,7,8], \n"+  // > Initialization.userPlay:31
    "          [9,1,2,3],  \n"+  // > Initialization.userPlay:32
    "          [4,5,9,7] ]; \n"+  // > Initialization.userPlay:33
    "function det(M) { \n"+  // > Initialization.userPlay:34
    "    if (M.length==1) { return (M[0][0]);} // handle case M is 1x1 \n"+  // > Initialization.userPlay:35
    "if (M.length==2) { return (M[0][0]*M[1][1])-(M[0][1]*M[1][0]); } // handle case M is 2x2\n"+  // > Initialization.userPlay:36
    "    var answer = 0; \n"+  // > Initialization.userPlay:37
    "    for (var i=0; i< M.length; i++) { answer += Math.pow(-1,i)*M[0][i]*det(deleteRowAndColumn(M,i)); } // handle case M >= 3x3\n"+  // > Initialization.userPlay:38
    "    return answer;\n"+  // > Initialization.userPlay:39
    "}\n"+  // > Initialization.userPlay:40
    "function deleteRowAndColumn(M,index) { \n"+  // > Initialization.userPlay:41
    "    var temp = []; // copy the array first \n"+  // > Initialization.userPlay:42
    "    for (var i=0; i<M.length; i++) {  \n"+  // > Initialization.userPlay:43
    "temp.push(M[i].slice(0));  } \n"+  // > Initialization.userPlay:44
    "    temp.splice(0,1);   // delete the first row  \n"+  // > Initialization.userPlay:45
    "    for (var i=0; i<temp.length; i++) {  \n"+  // > Initialization.userPlay:46
    "       temp[i].splice(index,1); } // delete the column at the index specified \n"+  // > Initialization.userPlay:47
    "    return temp;   \n"+  // > Initialization.userPlay:48
    "} \n"  // > Initialization.userPlay:49
    */  // > Initialization.userPlay:50
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["import"]) return;
    if (!editing) {  // > Initialization.import:1
      //if (!newsim) {  // > Initialization.import:2
        attemptLoadGraph().then(function(data) {  // > Initialization.import:3
          //alert( "loading new values")  // > Initialization.import:4
          ////////////////////////////////////////////  // > Initialization.import:5
          // data to be loaded into export & import //  // > Initialization.import:6
          ////////////////////////////////////////////  // > Initialization.import:7
          // Setting: //   // > Initialization.import:8
          systemText2 = data.systemText2;  // > Initialization.import:9
          initialState2 = data.initialState2;  // > Initialization.import:10
          finalState2 = data.finalState2;  // > Initialization.import:11
          remarks2 = data.remarks2;  // > Initialization.import:12
          show2D = data.show2D;  // > Initialization.import:13
          show3D = data.show3D;  // > Initialization.import:14
          revealRadioButton = data.revealRadioButton;  // > Initialization.import:15
            // > Initialization.import:16
            // > Initialization.import:17
          //check 1  // > Initialization.import:18
          displayChemical = data.displayChemical;  // > Initialization.import:19
          displayElastic = data.displayElastic;  // > Initialization.import:20
          displayGravitational= data.displayGravitational;  // > Initialization.import:21
          displayInternal= data.displayInternal;  // > Initialization.import:22
          displayKinetic = data.displayKinetic;  // > Initialization.import:23
          displayNuclear = data.displayNuclear;  // > Initialization.import:24
            // > Initialization.import:25
            // > Initialization.import:26
          // check2 - ignoring of energy: //  // > Initialization.import:27
          isC = data.isC;  // > Initialization.import:28
          isE = data.isE;  // > Initialization.import:29
          isG = data.isG;  // > Initialization.import:30
          isI = data.isI;  // > Initialization.import:31
          isK = data.isK;  // > Initialization.import:32
          isN = data.isN;  // > Initialization.import:33
          ignoreEnergyLst = data.ignoreEnergyLst;  // > Initialization.import:34
            // > Initialization.import:35
          // check3/4 - Transferable Energy: //  // > Initialization.import:36
          check3a = data.check3a;    // > Initialization.import:37
          check3b = data.check3b;  // > Initialization.import:38
          check4a = data.check4a;  // > Initialization.import:39
          check4b = data.check4b;  // > Initialization.import:40
            // > Initialization.import:41
          check3aEnergy = data.check3aEnergy;  // > Initialization.import:42
          check3bEnergy = data.check3bEnergy;  // > Initialization.import:43
          check4aEnergy = data.check4aEnergy;  // > Initialization.import:44
          check4bEnergy = data.check4bEnergy;  // > Initialization.import:45
            // > Initialization.import:46
          check3aReason = data.check3aReason;  // > Initialization.import:47
          check3bReason = data.check3bReason;  // > Initialization.import:48
          check4aReason = data.check4aReason;  // > Initialization.import:49
          check4bReason = data.check4bReason;  // > Initialization.import:50
            // > Initialization.import:51
          // check5 - avail energy initially: //  // > Initialization.import:52
          iniC = data.iniC;  // > Initialization.import:53
          iniE = data.iniE;  // > Initialization.import:54
          iniG = data.iniG;  // > Initialization.import:55
          iniI = data.iniI;  // > Initialization.import:56
          iniK = data.iniK;  // > Initialization.import:57
          iniN = data.iniN;  // > Initialization.import:58
            // > Initialization.import:59
          // check6 - final state energy: //  // > Initialization.import:60
          finC = data.finC;  // > Initialization.import:61
          finE = data.finE;  // > Initialization.import:62
          finG = data.finG;  // > Initialization.import:63
          finI = data.finI;  // > Initialization.import:64
          finK = data.finK;  // > Initialization.import:65
          finN = data.finN;  // > Initialization.import:66
            // > Initialization.import:67
          // check7 - formula: //  // > Initialization.import:68
          check7a = data.check7a;  // > Initialization.import:69
          finalC = data.finalC;  // > Initialization.import:70
          finalE = data.finalE;  // > Initialization.import:71
          finalG = data.finalG;  // > Initialization.import:72
          finalI = data.finalI;  // > Initialization.import:73
          finalK = data.finalK;  // > Initialization.import:74
          finalN = data.finalN;  // > Initialization.import:75
          passfail = data.passfail;  // > Initialization.import:76
          inequalityCheckLst = data.inequalityCheckLst;  // > Initialization.import:77
          userPlay = data.userPlay;  // > Initialization.import:78
            // > Initialization.import:79
          // ... to be continued if necessary ...  // > Initialization.import:80
            // > Initialization.import:81
          //_view._addInteraction(function(){}  ,"Q1",{"property":"value", "element":"question"}); // use to detect beginning of Q1  // > Initialization.import:82
          //alert( "add interaction")  // > Initialization.import:83
            // > Initialization.import:84
          _update();  // > Initialization.import:85
          //alert( not working if use "_view._update")  // > Initialization.import:86
        } );  // > Initialization.import:87
      }  // > Initialization.import:88
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["scaleWrestrictions_INITIAL"]) return;
    for (let i=0; i< iniTotalEnergy.length; i++){  // > FixedRelations.scaleWrestrictions_INITIAL:1
      // 0 <= Boundary limits <=10 //  // > FixedRelations.scaleWrestrictions_INITIAL:2
      if (iniTotalEnergy[i] >10){  // > FixedRelations.scaleWrestrictions_INITIAL:3
        iniTotalEnergy[i] = 10;  // > FixedRelations.scaleWrestrictions_INITIAL:4
        }  // > FixedRelations.scaleWrestrictions_INITIAL:5
      else if (iniTotalEnergy[i] <0){  // > FixedRelations.scaleWrestrictions_INITIAL:6
        if (i!=2){  // > FixedRelations.scaleWrestrictions_INITIAL:7
          iniTotalEnergy[i] = 0;  // > FixedRelations.scaleWrestrictions_INITIAL:8
          }  // > FixedRelations.scaleWrestrictions_INITIAL:9
        else if (i==2 && iniTotalEnergy[i] < -10) {iniTotalEnergy[i] =-10}  // > FixedRelations.scaleWrestrictions_INITIAL:10
        }  // > FixedRelations.scaleWrestrictions_INITIAL:11
      // update number of pictures w Y position //  // > FixedRelations.scaleWrestrictions_INITIAL:12
      //chemicalY = numberedLst( iniTotalEnergy[i] );  // > FixedRelations.scaleWrestrictions_INITIAL:13
      /*  // > FixedRelations.scaleWrestrictions_INITIAL:14
      for (let j=0; j < Math.round(iniTotalEnergy[i]); j++){  // > FixedRelations.scaleWrestrictions_INITIAL:15
        chemicalY.push(j);  // gives [0,1,2, ... ]  // > FixedRelations.scaleWrestrictions_INITIAL:16
        }  // > FixedRelations.scaleWrestrictions_INITIAL:17
      */  // > FixedRelations.scaleWrestrictions_INITIAL:18
      // Restrict numbers to integers --> Makes dragging difficult --> fixed by moving to OnRelease //  // > FixedRelations.scaleWrestrictions_INITIAL:19
      /*  // > FixedRelations.scaleWrestrictions_INITIAL:20
      iniTotalEnergy[i] =  Math.round(iniTotalEnergy[i]);  // > FixedRelations.scaleWrestrictions_INITIAL:21
      */  // > FixedRelations.scaleWrestrictions_INITIAL:22
        // > FixedRelations.scaleWrestrictions_INITIAL:23
      }  // > FixedRelations.scaleWrestrictions_INITIAL:24
    // Restrict EtransIN at O diagram //  // > FixedRelations.scaleWrestrictions_INITIAL:25
    if (EtransIN < 0){EtransIN = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:26
      else if (EtransIN > 10){EtransIN = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:27
    if (dragEtransIN < 0){dragEtransIN = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:28
      else if (dragEtransIN > 10){dragEtransIN = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:29
    // Restrict EtransIN2 at O diagram //  // > FixedRelations.scaleWrestrictions_INITIAL:30
    if (EtransIN2 < 0){EtransIN2 = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:31
      else if (EtransIN2 > 10){EtransIN2 = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:32
    if (dragEtransIN2 < 0){dragEtransIN2 = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:33
      else if (dragEtransIN2 > 10){dragEtransIN2 = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:34
    // Restrict dragHelpers at L diagram //   // > FixedRelations.scaleWrestrictions_INITIAL:35
    if (dragCY < 0){dragCY = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:36
    else if (dragCY > 10){dragCY = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:37
    if (dragEY < 0){dragEY = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:38
    else if (dragEY > 10){dragEY = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:39
    //if (dragGY < -10){dragGY = -10}    // G can go -ve till -10  // > FixedRelations.scaleWrestrictions_INITIAL:40
    if (dragGY < 0){dragGY = 0}     // > FixedRelations.scaleWrestrictions_INITIAL:41
    else if (dragGY > 10){dragGY = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:42
    if (dragIY < 0){dragIY = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:43
    else if (dragIY > 10){dragIY = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:44
    if (dragKY < 0){dragKY = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:45
    else if (dragKY > 10){dragKY = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:46
    if (dragNY < 0){dragNY = 0}  // > FixedRelations.scaleWrestrictions_INITIAL:47
    else if (dragNY > 10){dragNY = 10}  // > FixedRelations.scaleWrestrictions_INITIAL:48
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["scaleWrestrictions_FINAL"]) return;
    for (let i=0; i< finTotalEnergy.length; i++){  // > FixedRelations.scaleWrestrictions_FINAL:1
      // 0 <= Boundary limits <=10 //  // > FixedRelations.scaleWrestrictions_FINAL:2
      if (finTotalEnergy[i] >10){  // > FixedRelations.scaleWrestrictions_FINAL:3
        finTotalEnergy[i] = 10;  // > FixedRelations.scaleWrestrictions_FINAL:4
        }  // > FixedRelations.scaleWrestrictions_FINAL:5
      else if (finTotalEnergy[i] <0){  // > FixedRelations.scaleWrestrictions_FINAL:6
        if (i!=2){  // > FixedRelations.scaleWrestrictions_FINAL:7
          finTotalEnergy[i] = 0;  // > FixedRelations.scaleWrestrictions_FINAL:8
          }  // > FixedRelations.scaleWrestrictions_FINAL:9
        else if (i==2 && finTotalEnergy[i] < -10) {finTotalEnergy[i] =-10}  // > FixedRelations.scaleWrestrictions_FINAL:10
        }  // > FixedRelations.scaleWrestrictions_FINAL:11
      }  // > FixedRelations.scaleWrestrictions_FINAL:12
    // Restrict EtransOUT at O diagram //  // > FixedRelations.scaleWrestrictions_FINAL:13
    if (EtransOUT < 0){EtransOUT = 0}  // > FixedRelations.scaleWrestrictions_FINAL:14
      else if (EtransOUT > 10){EtransOUT = 10}  // > FixedRelations.scaleWrestrictions_FINAL:15
    if (dragEtransOUT < 0){dragEtransOUT = 0}  // > FixedRelations.scaleWrestrictions_FINAL:16
      else if (dragEtransOUT > 10){dragEtransOUT = 10}  // > FixedRelations.scaleWrestrictions_FINAL:17
    // Restrict EtransOUT2 at O diagram //  // > FixedRelations.scaleWrestrictions_FINAL:18
    if (EtransOUT2 < 0){EtransOUT2 = 0}  // > FixedRelations.scaleWrestrictions_FINAL:19
      else if (EtransOUT2 > 10){EtransOUT2 = 10}  // > FixedRelations.scaleWrestrictions_FINAL:20
    if (dragEtransOUT2 < 0){dragEtransOUT2 = 0}  // > FixedRelations.scaleWrestrictions_FINAL:21
      else if (dragEtransOUT2 > 10){dragEtransOUT2 = 10}  // > FixedRelations.scaleWrestrictions_FINAL:22
    // Restrict dragHelpers at L diagram //   // > FixedRelations.scaleWrestrictions_FINAL:23
    if (dragC2Y < 0){dragC2Y = 0}  // > FixedRelations.scaleWrestrictions_FINAL:24
    else if (dragC2Y > 10){dragC2Y = 10}  // > FixedRelations.scaleWrestrictions_FINAL:25
    if (dragE2Y < 0){dragE2Y = 0}  // > FixedRelations.scaleWrestrictions_FINAL:26
    else if (dragE2Y > 10){dragE2Y = 10}  // > FixedRelations.scaleWrestrictions_FINAL:27
    //if (dragG2Y < -10){dragG2Y = -10}  // G can go -ve till -10  // > FixedRelations.scaleWrestrictions_FINAL:28
    if (dragG2Y < 0){dragG2Y = 0}   // > FixedRelations.scaleWrestrictions_FINAL:29
    else if (dragG2Y > 10){dragG2Y = 10}  // > FixedRelations.scaleWrestrictions_FINAL:30
    if (dragI2Y < 0){dragI2Y = 0}  // > FixedRelations.scaleWrestrictions_FINAL:31
    else if (dragI2Y > 10){dragI2Y = 10}  // > FixedRelations.scaleWrestrictions_FINAL:32
    if (dragK2Y < 0){dragK2Y = 0}  // > FixedRelations.scaleWrestrictions_FINAL:33
    else if (dragK2Y > 10){dragK2Y = 10}  // > FixedRelations.scaleWrestrictions_FINAL:34
    if (dragN2Y < 0){dragN2Y = 0}  // > FixedRelations.scaleWrestrictions_FINAL:35
    else if (dragN2Y > 10){dragN2Y = 10}  // > FixedRelations.scaleWrestrictions_FINAL:36
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["answer"]) return;
    C = iniTotalEnergy[0];  // > FixedRelations.answer:1
    E = iniTotalEnergy[1];  // > FixedRelations.answer:2
    G = iniTotalEnergy[2];  // > FixedRelations.answer:3
    I = iniTotalEnergy[3];  // > FixedRelations.answer:4
    K = iniTotalEnergy[4];  // > FixedRelations.answer:5
    N = iniTotalEnergy[5];  // > FixedRelations.answer:6
    fC = finTotalEnergy[0];  // > FixedRelations.answer:7
    fE = finTotalEnergy[1];  // > FixedRelations.answer:8
    fG = finTotalEnergy[2];  // > FixedRelations.answer:9
    fI = finTotalEnergy[3];  // > FixedRelations.answer:10
    fK = finTotalEnergy[4];  // > FixedRelations.answer:11
    fN = finTotalEnergy[5];  // > FixedRelations.answer:12
    answers1 ();  // > FixedRelations.answer:13
    //myOwnCode ()  // > FixedRelations.answer:14
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["EnableToDebug"]) return;
    ////////////////////////////////////////////////////////  // > FixedRelations.EnableToDebug:1
    // To include Variables on PlottingPanel TR/TLMessage //  // > FixedRelations.EnableToDebug:2
    ////////////////////////////////////////////////////////  // > FixedRelations.EnableToDebug:3
    //debuggg = "";  // > FixedRelations.EnableToDebug:4
    debugggTR = "";  // > FixedRelations.EnableToDebug:5
    debugggTR += "EtransIN= "+EtransIN;  // > FixedRelations.EnableToDebug:6
    debugggTR += "\nEtransIN2= "+EtransIN2;  // > FixedRelations.EnableToDebug:7
    debugggTR += "\nEtransOUT= "+EtransOUT;  // > FixedRelations.EnableToDebug:8
    debugggTR += "\nEtransOUT2= "+EtransOUT2;  // > FixedRelations.EnableToDebug:9
    debugggTR += "\ndragCY= "+dragCY;  // > FixedRelations.EnableToDebug:10
    //debugggTR += "\ncheck3aEnergy= "+check3aEnergy;  // > FixedRelations.EnableToDebug:11
    //debugggTR += "\ncheck3bEnergy= "+check3bEnergy;  // > FixedRelations.EnableToDebug:12
    //debugggTR += "\nupdateTransIN= " + updateTransIN;  // > FixedRelations.EnableToDebug:13
    //debugggTR += "\nupdateTransIN2= " + updateTransIN2;  // > FixedRelations.EnableToDebug:14
    //debugggTR += "\nINenergyY= "+INenergyY;  // > FixedRelations.EnableToDebug:15
    //debugggTR += "\niniEnergiesLst= "+ [iniC, iniE, iniG, iniI, iniK, iniN];  // > FixedRelations.EnableToDebug:16
    //debugggTR += "\niniTotalEnergy= "+iniTotalEnergy;  // > FixedRelations.EnableToDebug:17
    //debugggTR += "\nfinTotalEnergy= "+finTotalEnergy;  // > FixedRelations.EnableToDebug:18
    //debugggTR += "\nfinalC= "+finalC;  // > FixedRelations.EnableToDebug:19
    //debugggTR += "\nfC= "+fC;  // > FixedRelations.EnableToDebug:20
    //debugggTR += "\ndisplayChemical= "+displayChemical;  // > FixedRelations.EnableToDebug:21
    //debugggTR += "\nisG= "+isG;  // > FixedRelations.EnableToDebug:22
    //debugggTR += "\nMath.ceil(Math.random() * 10)= "+ Math.ceil(Math.random() * 10);  // > FixedRelations.EnableToDebug:23
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["reOrder"]) return;
    for (let i = 0; i < customOrder.length; i++) {  // > FixedRelations.reOrder:1
      energyXpos[i] = customOrder[i];  // > FixedRelations.reOrder:2
    }  // > FixedRelations.reOrder:3
  });

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
    _view = new LOLMasterTemplateV8_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'fullscreen'
          _view.answersTOEDIT.linkProperty("Background",  function() { return editBackgroundColor; }, function(_v) { editBackgroundColor = _v; } ); // HtmlView linking property 'Background' for element 'answersTOEDIT'
          _view.answersTOEDIT.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'answersTOEDIT'
          _view.answersTOEDIT.linkProperty("Display",  function() { return editing ?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'answersTOEDIT'
          _view.fileUpload.setAction("OnChange", function(_data,_info) {
  attemptLoadGraph().then(function(data) {
        //alert( "loading new values")
        ////////////////////////////////////////////
        // data to be loaded into export & import //
        ////////////////////////////////////////////
        // Setting: // 
        systemText2 = data.systemText2;
        initialState2 = data.initialState2;
        finalState2 = data.finalState2;
        remarks2 = data.remarks2;
        show2D = data.show2D;
        show3D = data.show3D;
        revealRadioButton = data.revealRadioButton;
        
        
        //check 1
        displayChemical = data.displayChemical;
        displayElastic = data.displayElastic;
        displayGravitational= data.displayGravitational;
        displayInternal= data.displayInternal;
        displayKinetic = data.displayKinetic;
        displayNuclear = data.displayNuclear;
        
        
        // check2 - ignoring of energy: //
        isC = data.isC;
        isE = data.isE;
        isG = data.isG;
        isI = data.isI;
        isK = data.isK;
        isN = data.isN;
        ignoreEnergyLst = data.ignoreEnergyLst;
        
        // check3/4 - Transferable Energy: //
        check3a = data.check3a;  
        check3b = data.check3b;
        check4a = data.check4a;
        check4b = data.check4b;
        
        check3aEnergy = data.check3aEnergy;
        check3bEnergy = data.check3bEnergy;
        check4aEnergy = data.check4aEnergy;
        check4bEnergy = data.check4bEnergy;
        
        check3aReason = data.check3aReason;
        check3bReason = data.check3bReason;
        check4aReason = data.check4aReason;
        check4bReason = data.check4bReason;
        
        // check5 - avail energy initially: //
        iniC = data.iniC;
        iniE = data.iniE;
        iniG = data.iniG;
        iniI = data.iniI;
        iniK = data.iniK;
        iniN = data.iniN;
        
        // check6 - final state energy: //
        finC = data.finC;
        finE = data.finE;
        finG = data.finG;
        finI = data.finI;
        finK = data.finK;
        finN = data.finN;
        
        // check7 - formula: //
        check7a = data.check7a;
        finalC = data.finalC;
        finalE = data.finalE;
        finalG = data.finalG;
        finalI = data.finalI;
        finalK = data.finalK;
        finalN = data.finalN;
        passfail = data.passfail;
        inequalityCheckLst = data.inequalityCheckLst;
        userPlay = data.userPlay;
        
        // ... to be continued if necessary ...
        
        //_view._addInteraction(function(){}  ,"Q1",{"property":"value", "element":"question"}); // use to detect beginning of Q1
        //alert( "add interaction")
        
        _update();
        //alert( not working if use "_view._update")
      } );

}); // HtmlView setting action 'OnChange' for element 'fileUpload'
          _view.displayChemical.linkProperty("Checked",  function() { return displayChemical; }, function(_v) { displayChemical = _v; } ); // HtmlView linking property 'Checked' for element 'displayChemical'
          _view.displayChemical.setAction("OnCheckOff", function(_data,_info) {
  displayChemical = false;

}); // HtmlView setting action 'OnCheckOff' for element 'displayChemical'
          _view.displayChemical.setAction("OnChange", function(_data,_info) {
  isLastEnergyDisplayed();
  updateVariables();

}); // HtmlView setting action 'OnChange' for element 'displayChemical'
          _view.displayChemical.setAction("OnCheckOn", function(_data,_info) {
  displayChemical = true;

}); // HtmlView setting action 'OnCheckOn' for element 'displayChemical'
          _view.displayElastic.linkProperty("Checked",  function() { return displayElastic; }, function(_v) { displayElastic = _v; } ); // HtmlView linking property 'Checked' for element 'displayElastic'
          _view.displayElastic.setAction("OnCheckOff", function(_data,_info) {
  displayElastic = false;

}); // HtmlView setting action 'OnCheckOff' for element 'displayElastic'
          _view.displayElastic.setAction("OnChange", function(_data,_info) {
  isLastEnergyDisplayed();
  updateVariables();

}); // HtmlView setting action 'OnChange' for element 'displayElastic'
          _view.displayElastic.setAction("OnCheckOn", function(_data,_info) {
  displayElastic = true;

}); // HtmlView setting action 'OnCheckOn' for element 'displayElastic'
          _view.displayGravitational.linkProperty("Checked",  function() { return displayGravitational; }, function(_v) { displayGravitational = _v; } ); // HtmlView linking property 'Checked' for element 'displayGravitational'
          _view.displayGravitational.setAction("OnCheckOff", function(_data,_info) {
  displayGravitational = false;

}); // HtmlView setting action 'OnCheckOff' for element 'displayGravitational'
          _view.displayGravitational.setAction("OnChange", function(_data,_info) {
  isLastEnergyDisplayed();
  updateVariables();

}); // HtmlView setting action 'OnChange' for element 'displayGravitational'
          _view.displayGravitational.setAction("OnCheckOn", function(_data,_info) {
  displayGravitational = true;

}); // HtmlView setting action 'OnCheckOn' for element 'displayGravitational'
          _view.displayInternal.linkProperty("Checked",  function() { return displayInternal; }, function(_v) { displayInternal = _v; } ); // HtmlView linking property 'Checked' for element 'displayInternal'
          _view.displayInternal.setAction("OnCheckOff", function(_data,_info) {
  displayInternal = false;

}); // HtmlView setting action 'OnCheckOff' for element 'displayInternal'
          _view.displayInternal.setAction("OnChange", function(_data,_info) {
  isLastEnergyDisplayed();
  updateVariables();

}); // HtmlView setting action 'OnChange' for element 'displayInternal'
          _view.displayInternal.setAction("OnCheckOn", function(_data,_info) {
  displayInternal = true;

}); // HtmlView setting action 'OnCheckOn' for element 'displayInternal'
          _view.displayKinetic.linkProperty("Checked",  function() { return displayKinetic; }, function(_v) { displayKinetic = _v; } ); // HtmlView linking property 'Checked' for element 'displayKinetic'
          _view.displayKinetic.setAction("OnCheckOff", function(_data,_info) {
  displayKinetic = false;

}); // HtmlView setting action 'OnCheckOff' for element 'displayKinetic'
          _view.displayKinetic.setAction("OnChange", function(_data,_info) {
  isLastEnergyDisplayed();
  updateVariables();

}); // HtmlView setting action 'OnChange' for element 'displayKinetic'
          _view.displayKinetic.setAction("OnCheckOn", function(_data,_info) {
  displayKinetic = true;

}); // HtmlView setting action 'OnCheckOn' for element 'displayKinetic'
          _view.displayNuclear.linkProperty("Checked",  function() { return displayNuclear; }, function(_v) { displayNuclear = _v; } ); // HtmlView linking property 'Checked' for element 'displayNuclear'
          _view.displayNuclear.setAction("OnCheckOff", function(_data,_info) {
  displayNuclear = false;

}); // HtmlView setting action 'OnCheckOff' for element 'displayNuclear'
          _view.displayNuclear.setAction("OnChange", function(_data,_info) {
  isLastEnergyDisplayed();
  updateVariables();

}); // HtmlView setting action 'OnChange' for element 'displayNuclear'
          _view.displayNuclear.setAction("OnCheckOn", function(_data,_info) {
  displayNuclear = true;

}); // HtmlView setting action 'OnCheckOn' for element 'displayNuclear'
          _view.isC.linkProperty("Checked",  function() { return isC; }, function(_v) { isC = _v; } ); // HtmlView linking property 'Checked' for element 'isC'
          _view.isC.setAction("OnCheckOff", function(_data,_info) {
  isC = false;

}); // HtmlView setting action 'OnCheckOff' for element 'isC'
          _view.isC.linkProperty("Disabled",  function() { return physicsonly; }, function(_v) { physicsonly = _v; } ); // HtmlView linking property 'Disabled' for element 'isC'
          _view.isC.setAction("OnCheckOn", function(_data,_info) {
  isC = true;

}); // HtmlView setting action 'OnCheckOn' for element 'isC'
          _view.isC.linkProperty("Display",  function() { return displayChemical? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'isC'
          _view.isE.linkProperty("Checked",  function() { return isE; }, function(_v) { isE = _v; } ); // HtmlView linking property 'Checked' for element 'isE'
          _view.isE.setAction("OnCheckOff", function(_data,_info) {
  isE = false;

}); // HtmlView setting action 'OnCheckOff' for element 'isE'
          _view.isE.linkProperty("Disabled",  function() { return physicsonly; }, function(_v) { physicsonly = _v; } ); // HtmlView linking property 'Disabled' for element 'isE'
          _view.isE.setAction("OnCheckOn", function(_data,_info) {
  isE = true;

}); // HtmlView setting action 'OnCheckOn' for element 'isE'
          _view.isE.linkProperty("Display",  function() { return displayElastic? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'isE'
          _view.isG.linkProperty("Checked",  function() { return isG; }, function(_v) { isG = _v; } ); // HtmlView linking property 'Checked' for element 'isG'
          _view.isG.setAction("OnCheckOff", function(_data,_info) {
  isG = false;

}); // HtmlView setting action 'OnCheckOff' for element 'isG'
          _view.isG.linkProperty("Disabled",  function() { return physicsonly; }, function(_v) { physicsonly = _v; } ); // HtmlView linking property 'Disabled' for element 'isG'
          _view.isG.setAction("OnCheckOn", function(_data,_info) {
  isG = true;

}); // HtmlView setting action 'OnCheckOn' for element 'isG'
          _view.isG.linkProperty("Display",  function() { return displayGravitational? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'isG'
          _view.isI.linkProperty("Checked",  function() { return isI; }, function(_v) { isI = _v; } ); // HtmlView linking property 'Checked' for element 'isI'
          _view.isI.setAction("OnCheckOff", function(_data,_info) {
  isI = false;

}); // HtmlView setting action 'OnCheckOff' for element 'isI'
          _view.isI.linkProperty("Disabled",  function() { return physicsonly; }, function(_v) { physicsonly = _v; } ); // HtmlView linking property 'Disabled' for element 'isI'
          _view.isI.setAction("OnCheckOn", function(_data,_info) {
  isI = true;

}); // HtmlView setting action 'OnCheckOn' for element 'isI'
          _view.isI.linkProperty("Display",  function() { return displayInternal? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'isI'
          _view.isK.linkProperty("Checked",  function() { return isK; }, function(_v) { isK = _v; } ); // HtmlView linking property 'Checked' for element 'isK'
          _view.isK.setAction("OnCheckOff", function(_data,_info) {
  isK = false;

}); // HtmlView setting action 'OnCheckOff' for element 'isK'
          _view.isK.linkProperty("Disabled",  function() { return physicsonly; }, function(_v) { physicsonly = _v; } ); // HtmlView linking property 'Disabled' for element 'isK'
          _view.isK.setAction("OnCheckOn", function(_data,_info) {
  isK = true;

}); // HtmlView setting action 'OnCheckOn' for element 'isK'
          _view.isK.linkProperty("Display",  function() { return displayKinetic? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'isK'
          _view.isN.linkProperty("Checked",  function() { return isN; }, function(_v) { isN = _v; } ); // HtmlView linking property 'Checked' for element 'isN'
          _view.isN.setAction("OnCheckOff", function(_data,_info) {
  isN = false;

}); // HtmlView setting action 'OnCheckOff' for element 'isN'
          _view.isN.linkProperty("Disabled",  function() { return physicsonly; }, function(_v) { physicsonly = _v; } ); // HtmlView linking property 'Disabled' for element 'isN'
          _view.isN.setAction("OnCheckOn", function(_data,_info) {
  isN = true;

}); // HtmlView setting action 'OnCheckOn' for element 'isN'
          _view.isN.linkProperty("Display",  function() { return displayNuclear? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'isN'
          _view.zeroIN.linkProperty("Checked",  function() { return (check3a==false && check3b==false) ? true:false; } ); // HtmlView linking property 'Checked' for element 'zeroIN'
          _view.zeroIN.setAction("OnCheckOn", function(_data,_info) {
  check3a = false;
  check3aEnergy = "";
  check3b = false;
  check3bEnergy = "";

}); // HtmlView setting action 'OnCheckOn' for element 'zeroIN'
          _view.oneIN.linkProperty("Checked",  function() { return (check3a==true && check3b==false) ? true:false; } ); // HtmlView linking property 'Checked' for element 'oneIN'
          _view.oneIN.setAction("OnCheckOn", function(_data,_info) {
  check3a = true;
  check3b = false;
  check3bEnergy = "";

}); // HtmlView setting action 'OnCheckOn' for element 'oneIN'
          _view.twoIN.linkProperty("Checked",  function() { return (check3a==true && check3b==true) ? true:false; } ); // HtmlView linking property 'Checked' for element 'twoIN'
          _view.twoIN.setAction("OnCheckOn", function(_data,_info) {
  check3a = true;
  check3b = true;

}); // HtmlView setting action 'OnCheckOn' for element 'twoIN'
          _view.check3a.linkProperty("Display",  function() { return check3a ? "":"none"; } ); // HtmlView linking property 'Display' for element 'check3a'
          _view.isPropagationIN.linkProperty("Checked",  function() { return check3aEnergy == "through propagation of waves" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isPropagationIN'
          _view.isPropagationIN.linkProperty("Text",  function() { return PropagationofWaves; }, function(_v) { PropagationofWaves = _v; } ); // HtmlView linking property 'Text' for element 'isPropagationIN'
          _view.isPropagationIN.linkProperty("Disabled",  function() { return check3bEnergy=="through propagation of waves" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isPropagationIN'
          _view.isPropagationIN.setAction("OnCheckOn", function(_data,_info) {
  check3aEnergy = "through propagation of waves";

}); // HtmlView setting action 'OnCheckOn' for element 'isPropagationIN'
          _view.isMechanicIN.linkProperty("Checked",  function() { return check3aEnergy == "mechanically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isMechanicIN'
          _view.isMechanicIN.linkProperty("Text",  function() { return Mechanically; }, function(_v) { Mechanically = _v; } ); // HtmlView linking property 'Text' for element 'isMechanicIN'
          _view.isMechanicIN.linkProperty("Disabled",  function() { return check3bEnergy=="mechanically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isMechanicIN'
          _view.isMechanicIN.setAction("OnCheckOn", function(_data,_info) {
  check3aEnergy = "mechanically";

}); // HtmlView setting action 'OnCheckOn' for element 'isMechanicIN'
          _view.isHeatingIN.linkProperty("Checked",  function() { return check3aEnergy == "through heating" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isHeatingIN'
          _view.isHeatingIN.linkProperty("Disabled",  function() { return check3bEnergy=="through heating" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isHeatingIN'
          _view.isHeatingIN.setAction("OnCheckOn", function(_data,_info) {
  check3aEnergy = "through heating";

}); // HtmlView setting action 'OnCheckOn' for element 'isHeatingIN'
          _view.isElectricIN.linkProperty("Checked",  function() { return check3aEnergy == "electrically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isElectricIN'
          _view.isElectricIN.linkProperty("Text",  function() { return Electrically; }, function(_v) { Electrically = _v; } ); // HtmlView linking property 'Text' for element 'isElectricIN'
          _view.isElectricIN.linkProperty("Disabled",  function() { return check3bEnergy=="electrically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isElectricIN'
          _view.isElectricIN.setAction("OnCheckOn", function(_data,_info) {
  check3aEnergy= "electrically";

}); // HtmlView setting action 'OnCheckOn' for element 'isElectricIN'
          _view.isChemicalIN.linkProperty("Checked",  function() { return check3aEnergy == "chemically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isChemicalIN'
          _view.isChemicalIN.linkProperty("Text",  function() { return physicsonly?"":"Chemically"; } ); // HtmlView linking property 'Text' for element 'isChemicalIN'
          _view.isChemicalIN.linkProperty("Disabled",  function() { return check3bEnergy=="chemically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isChemicalIN'
          _view.isChemicalIN.setAction("OnCheckOn", function(_data,_info) {
  check3aEnergy= "chemically";

}); // HtmlView setting action 'OnCheckOn' for element 'isChemicalIN'
          _view.isChemicalIN.linkProperty("Display",  function() { return physicsonly?"none":"inline-block"; } ); // HtmlView linking property 'Display' for element 'isChemicalIN'
          _view.check3Areason.linkProperty("Value",  function() { return check3aReason; }, function(_v) { check3aReason = _v; } ); // HtmlView linking property 'Value' for element 'check3Areason'
          _view.check3Areason.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'check3Areason'
          _view.check3b.linkProperty("Display",  function() { return check3b ? "":"none"; } ); // HtmlView linking property 'Display' for element 'check3b'
          _view.isPropagationIN2.linkProperty("Checked",  function() { return check3bEnergy == "through propagation of waves" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isPropagationIN2'
          _view.isPropagationIN2.linkProperty("Text",  function() { return PropagationofWaves; }, function(_v) { PropagationofWaves = _v; } ); // HtmlView linking property 'Text' for element 'isPropagationIN2'
          _view.isPropagationIN2.linkProperty("Disabled",  function() { return check3aEnergy=="through propagation of waves" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isPropagationIN2'
          _view.isPropagationIN2.setAction("OnCheckOn", function(_data,_info) {
  check3bEnergy = "through propagation of waves";

}); // HtmlView setting action 'OnCheckOn' for element 'isPropagationIN2'
          _view.isMechanicIN2.linkProperty("Checked",  function() { return check3bEnergy == "mechanically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isMechanicIN2'
          _view.isMechanicIN2.linkProperty("Text",  function() { return Mechanically; }, function(_v) { Mechanically = _v; } ); // HtmlView linking property 'Text' for element 'isMechanicIN2'
          _view.isMechanicIN2.linkProperty("Disabled",  function() { return check3aEnergy=="mechanically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isMechanicIN2'
          _view.isMechanicIN2.setAction("OnCheckOn", function(_data,_info) {
  check3bEnergy = "mechanically";

}); // HtmlView setting action 'OnCheckOn' for element 'isMechanicIN2'
          _view.isHeatingIN2.linkProperty("Checked",  function() { return check3bEnergy == "through heating" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isHeatingIN2'
          _view.isHeatingIN2.linkProperty("Disabled",  function() { return check3aEnergy=="through heating" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isHeatingIN2'
          _view.isHeatingIN2.setAction("OnCheckOn", function(_data,_info) {
  check3bEnergy = "through heating";

}); // HtmlView setting action 'OnCheckOn' for element 'isHeatingIN2'
          _view.isElectricIN2.linkProperty("Checked",  function() { return (check3b && check3bEnergy!="electrically") ? false:true; } ); // HtmlView linking property 'Checked' for element 'isElectricIN2'
          _view.isElectricIN2.linkProperty("Text",  function() { return Electrically; }, function(_v) { Electrically = _v; } ); // HtmlView linking property 'Text' for element 'isElectricIN2'
          _view.isElectricIN2.linkProperty("Disabled",  function() { return check3aEnergy=="electrically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isElectricIN2'
          _view.isElectricIN2.setAction("OnCheckOn", function(_data,_info) {
  check3bEnergy = "electrically"
  //(check3aEnergy=="electrically") ?"true":"false";

}); // HtmlView setting action 'OnCheckOn' for element 'isElectricIN2'
          _view.isChemicalIN2.linkProperty("Checked",  function() { return (check3b && check3bEnergy!="chemically") ? false:true; } ); // HtmlView linking property 'Checked' for element 'isChemicalIN2'
          _view.isChemicalIN2.linkProperty("Text",  function() { return physicsonly?"":"Chemically"; } ); // HtmlView linking property 'Text' for element 'isChemicalIN2'
          _view.isChemicalIN2.linkProperty("Disabled",  function() { return check3aEnergy=="chemically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isChemicalIN2'
          _view.isChemicalIN2.setAction("OnCheckOn", function(_data,_info) {
  check3bEnergy = "chemically"
  //(check3aEnergy=="electrically") ?"true":"false";

}); // HtmlView setting action 'OnCheckOn' for element 'isChemicalIN2'
          _view.isChemicalIN2.linkProperty("Display",  function() { return physicsonly?"none":"inline-block"; } ); // HtmlView linking property 'Display' for element 'isChemicalIN2'
          _view.check3Breason.linkProperty("Value",  function() { return check3bReason; }, function(_v) { check3bReason = _v; } ); // HtmlView linking property 'Value' for element 'check3Breason'
          _view.check3Breason.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'check3Breason'
          _view.zeroOUT.linkProperty("Checked",  function() { return (check4a==false && check4b==false) ? true:false; } ); // HtmlView linking property 'Checked' for element 'zeroOUT'
          _view.zeroOUT.setAction("OnCheckOn", function(_data,_info) {
  check4a = false;
  check4aEnergy = "";
  check4b = false;
  check4bEnergy = "";

}); // HtmlView setting action 'OnCheckOn' for element 'zeroOUT'
          _view.oneOUT.linkProperty("Checked",  function() { return (check4a==true && check4b==false) ? true:false; } ); // HtmlView linking property 'Checked' for element 'oneOUT'
          _view.oneOUT.setAction("OnCheckOn", function(_data,_info) {
  check4a = true;
  check4b = false;
  check4bEnergy = "";

}); // HtmlView setting action 'OnCheckOn' for element 'oneOUT'
          _view.twoOUT.linkProperty("Checked",  function() { return (check4a==true && check4b==true) ? true:false; } ); // HtmlView linking property 'Checked' for element 'twoOUT'
          _view.twoOUT.setAction("OnCheckOn", function(_data,_info) {
  check4a = true;
  check4b = true;

}); // HtmlView setting action 'OnCheckOn' for element 'twoOUT'
          _view.check4a.linkProperty("Display",  function() { return check4a ? "":"none"; } ); // HtmlView linking property 'Display' for element 'check4a'
          _view.isPropagationOUT.linkProperty("Checked",  function() { return check4aEnergy == "through propagation of waves" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isPropagationOUT'
          _view.isPropagationOUT.linkProperty("Text",  function() { return PropagationofWaves; }, function(_v) { PropagationofWaves = _v; } ); // HtmlView linking property 'Text' for element 'isPropagationOUT'
          _view.isPropagationOUT.linkProperty("Disabled",  function() { return check4bEnergy=="through propagation of waves" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isPropagationOUT'
          _view.isPropagationOUT.setAction("OnCheckOn", function(_data,_info) {
  check4aEnergy = "through propagation of waves";

}); // HtmlView setting action 'OnCheckOn' for element 'isPropagationOUT'
          _view.isMechanicOUT.linkProperty("Checked",  function() { return check4aEnergy == "mechanically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isMechanicOUT'
          _view.isMechanicOUT.linkProperty("Text",  function() { return Mechanically; }, function(_v) { Mechanically = _v; } ); // HtmlView linking property 'Text' for element 'isMechanicOUT'
          _view.isMechanicOUT.linkProperty("Disabled",  function() { return check4bEnergy=="mechanically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isMechanicOUT'
          _view.isMechanicOUT.setAction("OnCheckOn", function(_data,_info) {
  check4aEnergy = "mechanically";

}); // HtmlView setting action 'OnCheckOn' for element 'isMechanicOUT'
          _view.isHeatingOUT.linkProperty("Checked",  function() { return check4aEnergy == "through heating" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isHeatingOUT'
          _view.isHeatingOUT.linkProperty("Disabled",  function() { return check4bEnergy=="through heating" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isHeatingOUT'
          _view.isHeatingOUT.setAction("OnCheckOn", function(_data,_info) {
  check4aEnergy = "through heating";

}); // HtmlView setting action 'OnCheckOn' for element 'isHeatingOUT'
          _view.isElectricOUT.linkProperty("Checked",  function() { return check4aEnergy == "electrically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isElectricOUT'
          _view.isElectricOUT.linkProperty("Text",  function() { return Electrically; }, function(_v) { Electrically = _v; } ); // HtmlView linking property 'Text' for element 'isElectricOUT'
          _view.isElectricOUT.linkProperty("Disabled",  function() { return check4bEnergy=="electrically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isElectricOUT'
          _view.isElectricOUT.setAction("OnCheckOn", function(_data,_info) {
  check4aEnergy = "electrically";

}); // HtmlView setting action 'OnCheckOn' for element 'isElectricOUT'
          _view.isChemicalOUT.linkProperty("Checked",  function() { return check4aEnergy == "chemically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isChemicalOUT'
          _view.isChemicalOUT.linkProperty("Text",  function() { return physicsonly?"":"Chemically"; } ); // HtmlView linking property 'Text' for element 'isChemicalOUT'
          _view.isChemicalOUT.linkProperty("Disabled",  function() { return check4bEnergy=="chemically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isChemicalOUT'
          _view.isChemicalOUT.setAction("OnCheckOn", function(_data,_info) {
  check4aEnergy = "chemically";

}); // HtmlView setting action 'OnCheckOn' for element 'isChemicalOUT'
          _view.isChemicalOUT.linkProperty("Display",  function() { return physicsonly?"none":"inline-block"; } ); // HtmlView linking property 'Display' for element 'isChemicalOUT'
          _view.check4Areason.linkProperty("Value",  function() { return check4aReason; }, function(_v) { check4aReason = _v; } ); // HtmlView linking property 'Value' for element 'check4Areason'
          _view.check4Areason.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'check4Areason'
          _view.check4b.linkProperty("Display",  function() { return check4b ? "":"none"; } ); // HtmlView linking property 'Display' for element 'check4b'
          _view.isPropagationOUT2.linkProperty("Checked",  function() { return check4bEnergy == "through propagation of waves" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isPropagationOUT2'
          _view.isPropagationOUT2.linkProperty("Text",  function() { return PropagationofWaves; }, function(_v) { PropagationofWaves = _v; } ); // HtmlView linking property 'Text' for element 'isPropagationOUT2'
          _view.isPropagationOUT2.linkProperty("Disabled",  function() { return check4aEnergy=="through propagation of waves" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isPropagationOUT2'
          _view.isPropagationOUT2.setAction("OnCheckOn", function(_data,_info) {
  check4bEnergy = "through propagation of waves";

}); // HtmlView setting action 'OnCheckOn' for element 'isPropagationOUT2'
          _view.isMechanicOUT2.linkProperty("Checked",  function() { return check4bEnergy == "mechanically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isMechanicOUT2'
          _view.isMechanicOUT2.linkProperty("Text",  function() { return Mechanically; }, function(_v) { Mechanically = _v; } ); // HtmlView linking property 'Text' for element 'isMechanicOUT2'
          _view.isMechanicOUT2.linkProperty("Disabled",  function() { return check4aEnergy=="mechanically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isMechanicOUT2'
          _view.isMechanicOUT2.setAction("OnCheckOn", function(_data,_info) {
  check4bEnergy = "mechanically";

}); // HtmlView setting action 'OnCheckOn' for element 'isMechanicOUT2'
          _view.isHeatingOUT2.linkProperty("Checked",  function() { return check4bEnergy == "through heating" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isHeatingOUT2'
          _view.isHeatingOUT2.linkProperty("Disabled",  function() { return check4aEnergy=="through heating" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isHeatingOUT2'
          _view.isHeatingOUT2.setAction("OnCheckOn", function(_data,_info) {
  check4bEnergy = "through heating";

}); // HtmlView setting action 'OnCheckOn' for element 'isHeatingOUT2'
          _view.isElectricOUT2.linkProperty("Checked",  function() { return (check4b && check4bEnergy!="electrically") ? false:true; } ); // HtmlView linking property 'Checked' for element 'isElectricOUT2'
          _view.isElectricOUT2.linkProperty("Text",  function() { return Electrically; }, function(_v) { Electrically = _v; } ); // HtmlView linking property 'Text' for element 'isElectricOUT2'
          _view.isElectricOUT2.linkProperty("Disabled",  function() { return check4aEnergy=="electrically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isElectricOUT2'
          _view.isElectricOUT2.setAction("OnCheckOn", function(_data,_info) {
  check4bEnergy = "electrically";

}); // HtmlView setting action 'OnCheckOn' for element 'isElectricOUT2'
          _view.isChemicalOUT2.linkProperty("Checked",  function() { return check4bEnergy == "chemically" ? true:false; } ); // HtmlView linking property 'Checked' for element 'isChemicalOUT2'
          _view.isChemicalOUT2.linkProperty("Text",  function() { return physicsonly?"":"Chemically"; } ); // HtmlView linking property 'Text' for element 'isChemicalOUT2'
          _view.isChemicalOUT2.linkProperty("Disabled",  function() { return check4aEnergy=="chemically" ?true:false; } ); // HtmlView linking property 'Disabled' for element 'isChemicalOUT2'
          _view.isChemicalOUT2.setAction("OnCheckOn", function(_data,_info) {
  check4bEnergy = "chemically";

}); // HtmlView setting action 'OnCheckOn' for element 'isChemicalOUT2'
          _view.isChemicalOUT2.linkProperty("Display",  function() { return physicsonly?"none":"inline-block"; } ); // HtmlView linking property 'Display' for element 'isChemicalOUT2'
          _view.check4Breason.linkProperty("Value",  function() { return check4bReason; }, function(_v) { check4bReason = _v; } ); // HtmlView linking property 'Value' for element 'check4Breason'
          _view.iniC.linkProperty("Checked",  function() { return iniC; }, function(_v) { iniC = _v; } ); // HtmlView linking property 'Checked' for element 'iniC'
          _view.iniC.setAction("OnCheckOff", function(_data,_info) {
  iniC = false;

}); // HtmlView setting action 'OnCheckOff' for element 'iniC'
          _view.iniC.setAction("OnCheckOn", function(_data,_info) {
  iniC = true;

}); // HtmlView setting action 'OnCheckOn' for element 'iniC'
          _view.iniC.linkProperty("Display",  function() { return displayChemical? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'iniC'
          _view.iniE.linkProperty("Checked",  function() { return iniE; }, function(_v) { iniE = _v; } ); // HtmlView linking property 'Checked' for element 'iniE'
          _view.iniE.setAction("OnCheckOff", function(_data,_info) {
  iniE = false;

}); // HtmlView setting action 'OnCheckOff' for element 'iniE'
          _view.iniE.setAction("OnCheckOn", function(_data,_info) {
  iniE = true;

}); // HtmlView setting action 'OnCheckOn' for element 'iniE'
          _view.iniE.linkProperty("Display",  function() { return displayElastic? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'iniE'
          _view.iniG.linkProperty("Checked",  function() { return iniG; }, function(_v) { iniG = _v; } ); // HtmlView linking property 'Checked' for element 'iniG'
          _view.iniG.setAction("OnCheckOff", function(_data,_info) {
  iniG = false;

}); // HtmlView setting action 'OnCheckOff' for element 'iniG'
          _view.iniG.setAction("OnCheckOn", function(_data,_info) {
  iniG = true;

}); // HtmlView setting action 'OnCheckOn' for element 'iniG'
          _view.iniG.linkProperty("Display",  function() { return displayGravitational? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'iniG'
          _view.iniI.linkProperty("Checked",  function() { return iniI; }, function(_v) { iniI = _v; } ); // HtmlView linking property 'Checked' for element 'iniI'
          _view.iniI.setAction("OnCheckOff", function(_data,_info) {
  iniI = false;

}); // HtmlView setting action 'OnCheckOff' for element 'iniI'
          _view.iniI.setAction("OnCheckOn", function(_data,_info) {
  iniI = true;

}); // HtmlView setting action 'OnCheckOn' for element 'iniI'
          _view.iniI.linkProperty("Display",  function() { return displayInternal? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'iniI'
          _view.iniK.linkProperty("Checked",  function() { return iniK; }, function(_v) { iniK = _v; } ); // HtmlView linking property 'Checked' for element 'iniK'
          _view.iniK.setAction("OnCheckOff", function(_data,_info) {
  iniK = false;

}); // HtmlView setting action 'OnCheckOff' for element 'iniK'
          _view.iniK.setAction("OnCheckOn", function(_data,_info) {
  iniK = true;

}); // HtmlView setting action 'OnCheckOn' for element 'iniK'
          _view.iniK.linkProperty("Display",  function() { return displayKinetic? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'iniK'
          _view.iniN.linkProperty("Checked",  function() { return iniN; }, function(_v) { iniN = _v; } ); // HtmlView linking property 'Checked' for element 'iniN'
          _view.iniN.setAction("OnCheckOff", function(_data,_info) {
  iniN = false;

}); // HtmlView setting action 'OnCheckOff' for element 'iniN'
          _view.iniN.setAction("OnCheckOn", function(_data,_info) {
  iniN = true;

}); // HtmlView setting action 'OnCheckOn' for element 'iniN'
          _view.iniN.linkProperty("Display",  function() { return displayNuclear? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'iniN'
          _view.finC.linkProperty("Checked",  function() { return finC; }, function(_v) { finC = _v; } ); // HtmlView linking property 'Checked' for element 'finC'
          _view.finC.setAction("OnCheckOff", function(_data,_info) {
  finC = false;

}); // HtmlView setting action 'OnCheckOff' for element 'finC'
          _view.finC.setAction("OnCheckOn", function(_data,_info) {
  finC = true;

}); // HtmlView setting action 'OnCheckOn' for element 'finC'
          _view.finC.linkProperty("Display",  function() { return displayChemical? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'finC'
          _view.finE.linkProperty("Checked",  function() { return finE; }, function(_v) { finE = _v; } ); // HtmlView linking property 'Checked' for element 'finE'
          _view.finE.setAction("OnCheckOff", function(_data,_info) {
  finE = false;

}); // HtmlView setting action 'OnCheckOff' for element 'finE'
          _view.finE.setAction("OnCheckOn", function(_data,_info) {
  finE = true;

}); // HtmlView setting action 'OnCheckOn' for element 'finE'
          _view.finE.linkProperty("Display",  function() { return displayElastic? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'finE'
          _view.finG.linkProperty("Checked",  function() { return finG; }, function(_v) { finG = _v; } ); // HtmlView linking property 'Checked' for element 'finG'
          _view.finG.setAction("OnCheckOff", function(_data,_info) {
  finG = false;

}); // HtmlView setting action 'OnCheckOff' for element 'finG'
          _view.finG.setAction("OnCheckOn", function(_data,_info) {
  finG = true;

}); // HtmlView setting action 'OnCheckOn' for element 'finG'
          _view.finG.linkProperty("Display",  function() { return displayGravitational? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'finG'
          _view.finI.linkProperty("Checked",  function() { return finI; }, function(_v) { finI = _v; } ); // HtmlView linking property 'Checked' for element 'finI'
          _view.finI.setAction("OnCheckOff", function(_data,_info) {
  finI = false;

}); // HtmlView setting action 'OnCheckOff' for element 'finI'
          _view.finI.setAction("OnCheckOn", function(_data,_info) {
  finI = true;

}); // HtmlView setting action 'OnCheckOn' for element 'finI'
          _view.finI.linkProperty("Display",  function() { return displayInternal? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'finI'
          _view.finK.linkProperty("Checked",  function() { return finK; }, function(_v) { finK = _v; } ); // HtmlView linking property 'Checked' for element 'finK'
          _view.finK.setAction("OnCheckOff", function(_data,_info) {
  finK = false;

}); // HtmlView setting action 'OnCheckOff' for element 'finK'
          _view.finK.setAction("OnCheckOn", function(_data,_info) {
  finK = true;

}); // HtmlView setting action 'OnCheckOn' for element 'finK'
          _view.finK.linkProperty("Display",  function() { return displayKinetic? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'finK'
          _view.finN.linkProperty("Checked",  function() { return finN; }, function(_v) { finN = _v; } ); // HtmlView linking property 'Checked' for element 'finN'
          _view.finN.setAction("OnCheckOff", function(_data,_info) {
  finN = false;

}); // HtmlView setting action 'OnCheckOff' for element 'finN'
          _view.finN.setAction("OnCheckOn", function(_data,_info) {
  finN = true;

}); // HtmlView setting action 'OnCheckOn' for element 'finN'
          _view.finN.linkProperty("Display",  function() { return displayNuclear? "inline":"none"; } ); // HtmlView linking property 'Display' for element 'finN'
          _view.check7words.setAction("OnClick", function(_data,_info) {
  // (<, >, 2×=, =2×);

}); // HtmlView setting action 'OnClick' for element 'check7words'
          _view.No.linkProperty("Checked",  function() { return !check7a; } ); // HtmlView linking property 'Checked' for element 'No'
          _view.No.setAction("OnCheckOn", function(_data,_info) {
  check7a = false;

}); // HtmlView setting action 'OnCheckOn' for element 'No'
          _view.Yes.linkProperty("Checked",  function() { return check7a; }, function(_v) { check7a = _v; } ); // HtmlView linking property 'Checked' for element 'Yes'
          _view.Yes.setAction("OnCheckOn", function(_data,_info) {
  check7a = true;

}); // HtmlView setting action 'OnCheckOn' for element 'Yes'
          _view.runCodeButton.setAction("OnClick", function(_data,_info) {
  runUserCode("Error in code, please check.\nRefresh the page if you need to restart.");

}); // HtmlView setting action 'OnClick' for element 'runCodeButton'
          _view.runCodeButton.linkProperty("Display",  function() { return check7a ?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'runCodeButton'
          _view.check7a.linkProperty("Display",  function() { return check7a ?"":"none"; } ); // HtmlView linking property 'Display' for element 'check7a'
          _view.userCode.setAction("OnChange", function(_data,_info) {
  runUserCode("Error in code, please check.");
  ///////////////
  // REFERENCE //
  ///////////////
  /*
  var userPlay = _view.autoplayTextAreaMgeneral.getValue();
   try {
   eval(userPlay);
   //xgeneral=numeric.dot(matrix_invert(Mgeneral),bgeneral);
  det(M);
  }
  catch(error) {
    _tools.showOkCancelDialog("you can define your own variables. There should be an output for the solution I, or that could be some error in code, try again!");
    }
  */;

}); // HtmlView setting action 'OnChange' for element 'userCode'
          _view.downloadButton.setAction("OnClick", function(_data,_info) {
  var records = {};
  ////////////////////////////////////////////
  // data to be loaded into export & import //
  ////////////////////////////////////////////
  // Setting: //
  records['systemText2'] = systemText2
  records['initialState2'] = initialState2
  records['finalState2'] = finalState2
  records['remarks2'] = remarks2
  records['show2D']= show2D //lookang
  records['show3D']= show3D //lookang
  records['revealRadioButton'] = revealRadioButton //lookang
  //check 1 fixed by lookang 20240624
  records['displayChemical'] = displayChemical
  records['displayElastic'] = displayElastic
  records['displayGravitational'] = displayGravitational
  records['displayInternal'] = displayInternal
  records['displayKinetic'] = displayKinetic
  records['displayNuclear'] = displayNuclear
  // check2 - ignoring of energy: //
  records['isC'] = isC
  records['isE'] = isE
  records['isG'] = isG
  records['isI'] = isI
  records['isK'] = isK
  records['isN'] = isN
  records['ignoreEnergyLst'] = ignoreEnergyLst
  // check3/4 - Transferable Energy: //
  records['check3a'] = check3a
  records['check3b'] = check3b
  records['check4a'] = check4a
  records['check4b'] = check4b
  records['check3aEnergy'] = check3aEnergy
  records['check3bEnergy'] = check3bEnergy
  records['check4aEnergy'] = check4aEnergy
  records['check4bEnergy'] = check4bEnergy
  records['check3aReason'] = check3aReason
  records['check3bReason'] = check3bReason
  records['check4aReason'] = check4aReason
  records['check4bReason'] = check4bReason
  // check5 - initial state energy: //
  records['iniC'] = iniC
  records['iniE'] = iniE
  records['iniG'] = iniG
  records['iniI'] = iniI
  records['iniK'] = iniK
  records['iniN'] = iniN
  // check6 - final state energy: //
  records['finC'] = finC
  records['finE'] = finE
  records['finG'] = finG
  records['finI'] = finI
  records['finK'] = finK
  records['finN'] = finN
  // check7 - formula: //
  records['check7a'] = check7a
  records['finalC'] = finalC
  records['finalE'] = finalE
  records['finalG'] = finalG
  records['finalI'] = finalI
  records['finalK'] = finalK
  records['finalN'] = finalN
  records['passfail'] = passfail
  records['inequalityCheckLst'] = inequalityCheckLst
  records['userPlay'] = userPlay
  // ... to be continued ...
  exportGraph(records).then(onGraphExportComplete);

}); // HtmlView setting action 'OnClick' for element 'downloadButton'
          _view.masterPanel.linkProperty("Width",  function() { return editing ?"65%":"100%"; } ); // HtmlView linking property 'Width' for element 'masterPanel'
          _view.setting.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'setting'
          _view.MAster.linkProperty("Display",  function() { return editing?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'MAster'
          _view.showNone.setAction("OnCheckOn", function(_data,_info) {
  show2D = false;
  show3D = false;
  energyColour="rgba(0,200,255,1.0)";

}); // HtmlView setting action 'OnCheckOn' for element 'showNone'
          _view.showNone.linkProperty("Display",  function() { return editing?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'showNone'
          _view.show2D.linkProperty("Checked",  function() { return show2D; }, function(_v) { show2D = _v; } ); // HtmlView linking property 'Checked' for element 'show2D'
          _view.show2D.setAction("OnCheckOff", function(_data,_info) {
  /*
  show2D = false;
  show3D = true;
  */;

}); // HtmlView setting action 'OnCheckOff' for element 'show2D'
          _view.show2D.setAction("OnCheckOn", function(_data,_info) {
  show2D = true;
  show3D = false;
  energyColour="rgba(0,200,255,1.0)";

}); // HtmlView setting action 'OnCheckOn' for element 'show2D'
          _view.show2D.linkProperty("Display",  function() { return editing?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'show2D'
          _view.show3D.linkProperty("Checked",  function() { return show3D; }, function(_v) { show3D = _v; } ); // HtmlView linking property 'Checked' for element 'show3D'
          _view.show3D.setAction("OnCheckOff", function(_data,_info) {
  /*
  show3D = false;
  show2D = true;
  */;

}); // HtmlView setting action 'OnCheckOff' for element 'show3D'
          _view.show3D.setAction("OnCheckOn", function(_data,_info) {
  show3D = true;
  show2D = false;
  //energyColour = "White";
  energyColour="rgba(255,150,0,1.0)";  // orange;

}); // HtmlView setting action 'OnCheckOn' for element 'show3D'
          _view.show3D.linkProperty("Display",  function() { return editing?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'show3D'
          _view.title.linkProperty("Text",  function() { return title; }, function(_v) { title = _v; } ); // HtmlView linking property 'Text' for element 'title'
          _view.scenarios.linkProperty("Options",  function() { return versions; }, function(_v) { versions = _v; } ); // HtmlView linking property 'Options' for element 'scenarios'
          _view.scenarios.setAction("OnChange", function(_data,_info) {
  // versions = ["Blank Version",  "Scenario 1",  "---To Add On---"]
  var opts = _view.scenarios.getProperty("SelectedOptions");  // array of options
  var option = (opts.length > 0)? opts[0]:""; // selected option 
      
  // use option == ""
  if (option=="Blank Version"){
    editing = true;
    }
    
  if (option=="Scenario 1"){
    editing = false;
    }

}); // HtmlView setting action 'OnChange' for element 'scenarios'
          _view.showAnswer.setAction("OnCheckOff", function(_data,_info) {
  showAnswer = false;

}); // HtmlView setting action 'OnCheckOff' for element 'showAnswer'
          _view.showAnswer.linkProperty("Disabled",  function() { return editing; }, function(_v) { editing = _v; } ); // HtmlView linking property 'Disabled' for element 'showAnswer'
          _view.showAnswer.setAction("OnCheckOn", function(_data,_info) {
  showAnswer = true;

}); // HtmlView setting action 'OnCheckOn' for element 'showAnswer'
          _view.EditAnswer.setAction("OffClick", function(_data,_info) {
  editing = false;

}); // HtmlView setting action 'OffClick' for element 'EditAnswer'
          _view.EditAnswer.linkProperty("State",  function() { return !editing; } ); // HtmlView linking property 'State' for element 'EditAnswer'
          _view.EditAnswer.setAction("OnClick", function(_data,_info) {
  editing = true
  alert("Scroll down to see the conditions to get the answers!");

}); // HtmlView setting action 'OnClick' for element 'EditAnswer'
          _view.checkBox.linkProperty("Checked",  function() { return revealRadioButton; }, function(_v) { revealRadioButton = _v; } ); // HtmlView linking property 'Checked' for element 'checkBox'
          _view.checkBox.linkProperty("Background",  function() { return editBackgroundColor; }, function(_v) { editBackgroundColor = _v; } ); // HtmlView linking property 'Background' for element 'checkBox'
          _view.checkBox.linkProperty("Display",  function() { return editing?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'checkBox'
          _view.revealBtn.setAction("OnClick", function(_data,_info) {
  EJSS_INTERFACE.BoxPanel.showOkCancelDialog("⚠️Warning! Your work will be erased and a possible solution will be shown.⚠️Simulation loads longer when there are too many of external conditions applied.⚠️Proceed or Cancel?",
    function()  {// User click OK  
      revealSolution();
      _update();
      },
    function(){  // User click Cancel
      // Nothing happens :)
      });
  //revealSolution();

}); // HtmlView setting action 'OnClick' for element 'revealBtn'
          _view.revealBtn.linkProperty("Display",  function() { return revealRadioButton?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'revealBtn'
          _view.hintButton.setAction("OnPress", function(_data,_info) {
  alert("Hint1:\nConsider the principle of conservation of energy.");

}); // HtmlView setting action 'OnPress' for element 'hintButton'
          _view.systemBolded.linkProperty("Text",  function() { return systemText; }, function(_v) { systemText = _v; } ); // HtmlView linking property 'Text' for element 'systemBolded'
          _view.system2.linkProperty("Text",  function() { return systemText2; }, function(_v) { systemText2 = _v; } ); // HtmlView linking property 'Text' for element 'system2'
          _view.system2.linkProperty("Display",  function() { return editing ?"none":"inline-block"; } ); // HtmlView linking property 'Display' for element 'system2'
          _view.system_textField.linkProperty("Background",  function() { return editBackgroundColor; }, function(_v) { editBackgroundColor = _v; } ); // HtmlView linking property 'Background' for element 'system_textField'
          _view.system_textField.linkProperty("Value",  function() { return systemText2; }, function(_v) { systemText2 = _v; } ); // HtmlView linking property 'Value' for element 'system_textField'
          _view.system_textField.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'system_textField'
          _view.system_textField.linkProperty("Display",  function() { return editing ?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'system_textField'
          _view.remarks.linkProperty("Text",  function() { return remarks; }, function(_v) { remarks = _v; } ); // HtmlView linking property 'Text' for element 'remarks'
          _view.finalState22.linkProperty("Text",  function() { return remarks2; }, function(_v) { remarks2 = _v; } ); // HtmlView linking property 'Text' for element 'finalState22'
          _view.finalState22.linkProperty("Display",  function() { return editing ?"none":"inline-block"; } ); // HtmlView linking property 'Display' for element 'finalState22'
          _view.remarks_textField.linkProperty("Background",  function() { return editBackgroundColor; }, function(_v) { editBackgroundColor = _v; } ); // HtmlView linking property 'Background' for element 'remarks_textField'
          _view.remarks_textField.linkProperty("Value",  function() { return remarks2; }, function(_v) { remarks2 = _v; } ); // HtmlView linking property 'Value' for element 'remarks_textField'
          _view.remarks_textField.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'remarks_textField'
          _view.remarks_textField.linkProperty("Display",  function() { return editing ?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'remarks_textField'
          _view.initialState.linkProperty("Text",  function() { return initialState; }, function(_v) { initialState = _v; } ); // HtmlView linking property 'Text' for element 'initialState'
          _view.initialState2.linkProperty("Text",  function() { return initialState2; }, function(_v) { initialState2 = _v; } ); // HtmlView linking property 'Text' for element 'initialState2'
          _view.initialState2.linkProperty("Display",  function() { return editing ?"none":"block"; } ); // HtmlView linking property 'Display' for element 'initialState2'
          _view.initialState_textField.linkProperty("Background",  function() { return editBackgroundColor; }, function(_v) { editBackgroundColor = _v; } ); // HtmlView linking property 'Background' for element 'initialState_textField'
          _view.initialState_textField.linkProperty("Value",  function() { return initialState2; }, function(_v) { initialState2 = _v; } ); // HtmlView linking property 'Value' for element 'initialState_textField'
          _view.initialState_textField.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'initialState_textField'
          _view.initialState_textField.linkProperty("Display",  function() { return editing ?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'initialState_textField'
          _view.finalState.linkProperty("Text",  function() { return finalState; }, function(_v) { finalState = _v; } ); // HtmlView linking property 'Text' for element 'finalState'
          _view.finalState2.linkProperty("Text",  function() { return finalState2; }, function(_v) { finalState2 = _v; } ); // HtmlView linking property 'Text' for element 'finalState2'
          _view.finalState2.linkProperty("Display",  function() { return editing ?"none":"block"; } ); // HtmlView linking property 'Display' for element 'finalState2'
          _view.finalState_textField.linkProperty("Background",  function() { return editBackgroundColor; }, function(_v) { editBackgroundColor = _v; } ); // HtmlView linking property 'Background' for element 'finalState_textField'
          _view.finalState_textField.linkProperty("Value",  function() { return finalState2; }, function(_v) { finalState2 = _v; } ); // HtmlView linking property 'Value' for element 'finalState_textField'
          _view.finalState_textField.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'finalState_textField'
          _view.finalState_textField.linkProperty("Display",  function() { return editing ?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'finalState_textField'
          _view.IN.linkProperty("Display",  function() { return check3a?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'IN'
          _view.energyTypeIN.linkProperty("Options",  function() { return physicsonly?["- Tin₁ -","Propagation of waves","Mechanically","Heating","Electrically"]:["- Tin₁ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; } ); // HtmlView linking property 'Options' for element 'energyTypeIN'
          _view.energyTypeIN.setAction("OnChange", function(_data,_info) {
  var opts = _view.energyTypeIN.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
      
  //transIN == ["- Tin₁ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]
  if (option == "- Tin₁ -"){updateTransIN = 0};
  if (option == "Propagation of waves"){updateTransIN = 1};
  if (option == "Mechanically"){updateTransIN = 2};
  if (option == "Heating"){updateTransIN = 3};
  if (option == "Electrically"){updateTransIN = 4};
  if (option == "Chemically"){updateTransIN = 5};

}); // HtmlView setting action 'OnChange' for element 'energyTypeIN'
          _view.energyTypeIN.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'energyTypeIN'
          _view.field.linkProperty("Value",  function() { return EtransIN; }, function(_v) { EtransIN = _v; } ); // HtmlView linking property 'Value' for element 'field'
          _view.field.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'field'
          _view.OUT.linkProperty("Display",  function() { return check4a?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'OUT'
          _view.energyTypeOUT.linkProperty("Options",  function() { return physicsonly?["- Tout₁ -","Propagation of waves","Mechanically","Heating","Electrically"]:["- Tout₁ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; } ); // HtmlView linking property 'Options' for element 'energyTypeOUT'
          _view.energyTypeOUT.setAction("OnChange", function(_data,_info) {
  var opts = _view.energyTypeOUT.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
      
  //updateTransOUT == ["- Tout₁ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]
  if (option == "- Tout₁ -"){updateTransOUT = 0};
  if (option == "Propagation of waves"){updateTransOUT = 1};
  if (option == "Mechanically"){updateTransOUT = 2};
  if (option == "Heating"){updateTransOUT = 3};
  if (option == "Electrically"){updateTransOUT = 4};
  if (option == "Chemically"){updateTransOUT = 5};

}); // HtmlView setting action 'OnChange' for element 'energyTypeOUT'
          _view.energyTypeOUT.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'energyTypeOUT'
          _view.field2.linkProperty("Value",  function() { return EtransOUT; }, function(_v) { EtransOUT = _v; } ); // HtmlView linking property 'Value' for element 'field2'
          _view.field2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'field2'
          _view.IN2.linkProperty("Display",  function() { return check3b?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'IN2'
          _view.energyTypeIN2.linkProperty("Options",  function() { return physicsonly?["- Tin₂ -","Propagation of waves","Mechanically","Heating","Electrically"]:["- Tin₂ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; } ); // HtmlView linking property 'Options' for element 'energyTypeIN2'
          _view.energyTypeIN2.setAction("OnChange", function(_data,_info) {
  var opts = _view.energyTypeIN2.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
      
  //transIN2 == ["- Tin₂ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]
  if (option == "- Tin₂ -"){updateTransIN2 = 0};
  if (option == "Propagation of waves"){updateTransIN2 = 1};
  if (option == "Mechanically"){updateTransIN2 = 2};
  if (option == "Heating"){updateTransIN2 = 3};
  if (option == "Electrically"){updateTransIN2 = 4};
  if (option == "Chemically"){updateTransIN2 = 5};

}); // HtmlView setting action 'OnChange' for element 'energyTypeIN2'
          _view.energyTypeIN2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'energyTypeIN2'
          _view.field3.linkProperty("Value",  function() { return EtransIN2; }, function(_v) { EtransIN2 = _v; } ); // HtmlView linking property 'Value' for element 'field3'
          _view.field3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'field3'
          _view.OUT2.linkProperty("Display",  function() { return check4b?"inline-block":"none"; } ); // HtmlView linking property 'Display' for element 'OUT2'
          _view.energyTypeOUT2.linkProperty("Options",  function() { return physicsonly?["- Tout₂ -","Propagation of waves","Mechanically","Heating","Electrically"]:["- Tout₂ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]; } ); // HtmlView linking property 'Options' for element 'energyTypeOUT2'
          _view.energyTypeOUT2.setAction("OnChange", function(_data,_info) {
  var opts = _view.energyTypeOUT2.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
      
  //updateTransOUT == ["- Tout₂ -","Propagation of waves","Mechanically","Heating","Electrically","Chemically"]
  if (option == "- Tout₂ -"){updateTransOUT2 = 0};
  if (option == "Propagation of waves"){updateTransOUT2 = 1};
  if (option == "Mechanically"){updateTransOUT2 = 2};
  if (option == "Heating"){updateTransOUT2 = 3};
  if (option == "Electrically"){updateTransOUT2 = 4};
  if (option == "Chemically"){updateTransOUT2 = 5};

}); // HtmlView setting action 'OnChange' for element 'energyTypeOUT2'
          _view.energyTypeOUT2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'energyTypeOUT2'
          _view.field22.linkProperty("Value",  function() { return EtransOUT2; }, function(_v) { EtransOUT2 = _v; } ); // HtmlView linking property 'Value' for element 'field22'
          _view.field22.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'field22'
          _view.L.linkProperty("TRMessage",  function() { return debugggTR; }, function(_v) { debugggTR = _v; } ); // HtmlView linking property 'TRMessage' for element 'L'
          _view.L.linkProperty("TitleYFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'TitleYFont' for element 'L'
          _view.L.linkProperty("TitleXFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'TitleXFont' for element 'L'
          _view.L.linkProperty("TitleFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'TitleFont' for element 'L'
          _view.interactPROMPT.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'interactPROMPT'
          _view.interactPROMPT.linkProperty("LineColor",  function() { return promptLineColour; }, function(_v) { promptLineColour = _v; } ); // HtmlView linking property 'LineColor' for element 'interactPROMPT'
          _view.interactPROMPT.linkProperty("Visibility",  function() { return interactPrompt1; }, function(_v) { interactPrompt1 = _v; } ); // HtmlView linking property 'Visibility' for element 'interactPROMPT'
          _view.interactPROMPT.linkProperty("SizeY",  function() { return iniTotalEnergy; }, function(_v) { iniTotalEnergy = _v; } ); // HtmlView linking property 'SizeY' for element 'interactPROMPT'
          _view.shapeSet.linkProperty("FillColor",  function() { return energyColour; }, function(_v) { energyColour = _v; } ); // HtmlView linking property 'FillColor' for element 'shapeSet'
          _view.shapeSet.setAction("OnExit", function(_data,_info) {
  interactPrompt1[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'shapeSet'
          _view.shapeSet.linkProperty("ElementInteracted",  function() { return elementInteracted; }, function(_v) { elementInteracted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'shapeSet'
          _view.shapeSet.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  for (let i=0; i< iniTotalEnergy.length; i++){
    iniTotalEnergy[i] = Math.round(iniTotalEnergy[i]);
    }

}); // HtmlView setting action 'OnRelease' for element 'shapeSet'
          _view.shapeSet.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'shapeSet'
          _view.shapeSet.setAction("OnEnter", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt1, elementInteracted);

}); // HtmlView setting action 'OnEnter' for element 'shapeSet'
          _view.shapeSet.linkProperty("Visibility",  function() { return [displayChemical, displayElastic, displayGravitational, displayInternal, displayKinetic, displayNuclear]; } ); // HtmlView linking property 'Visibility' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeY",  function() { return iniTotalEnergy; }, function(_v) { iniTotalEnergy = _v; } ); // HtmlView linking property 'SizeY' for element 'shapeSet'
          _view.xlabel.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'xlabel'
          _view.xlabel.linkProperty("Text",  function() { return ["C","E","G","I","K","N"]; } ); // HtmlView linking property 'Text' for element 'xlabel'
          _view.xlabel.linkProperty("Visibility",  function() { return [displayChemical, displayElastic, displayGravitational, displayInternal, displayKinetic, displayNuclear]; } ); // HtmlView linking property 'Visibility' for element 'xlabel'
          _view.amt.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'amt'
          _view.amt.linkProperty("Y",  function() { return iniTotalEnergy; }, function(_v) { iniTotalEnergy = _v; } ); // HtmlView linking property 'Y' for element 'amt'
          _view.amt.linkProperty("Text",  function() { return roundTheLst(iniTotalEnergy); }, function(_v) { roundTheLst(iniTotalEnergy) = _v; } ); // HtmlView linking property 'Text' for element 'amt'
          _view.amt.linkProperty("Visibility",  function() { return [displayChemical, displayElastic, displayGravitational, displayInternal, displayKinetic, displayNuclear]; } ); // HtmlView linking property 'Visibility' for element 'amt'
          _view.dragC.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragC'
          _view.dragC.setAction("OnExit", function(_data,_info) {
  elementInteracted = 0 
  interactPrompt1[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragC'
          _view.dragC.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 0 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt1, elementInteracted);
   //iniTotalEnergy[elementInteracted] = dragCY
    //iniTotalEnergy[elementInteracted] = Math.round(iniTotalEnergy[elementInteracted]);

}); // HtmlView setting action 'OnDrag' for element 'dragC'
          _view.dragC.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 0 
    iniTotalEnergy[elementInteracted] = Math.round(dragCY);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragC'
          _view.dragC.linkProperty("X",  function() { return energyXpos[0]; } ); // HtmlView linking property 'X' for element 'dragC'
          _view.dragC.linkProperty("Y",  function() { return dragCY; }, function(_v) { dragCY = _v; } ); // HtmlView linking property 'Y' for element 'dragC'
          _view.dragC.linkProperty("Visibility",  function() { return displayChemical; }, function(_v) { displayChemical = _v; } ); // HtmlView linking property 'Visibility' for element 'dragC'
          _view.dragC.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragC'
          _view.dragE.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragE'
          _view.dragE.setAction("OnExit", function(_data,_info) {
  elementInteracted = 1
  interactPrompt1[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragE'
          _view.dragE.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  elementInteracted = 1 
  oneTrueLst(interactPrompt1, elementInteracted);
   //iniTotalEnergy[elementInteracted] = Math.round(dragEY);

}); // HtmlView setting action 'OnDrag' for element 'dragE'
          _view.dragE.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 1 
    iniTotalEnergy[elementInteracted] = Math.round(dragEY);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragE'
          _view.dragE.linkProperty("X",  function() { return energyXpos[1]; } ); // HtmlView linking property 'X' for element 'dragE'
          _view.dragE.linkProperty("Y",  function() { return dragEY; }, function(_v) { dragEY = _v; } ); // HtmlView linking property 'Y' for element 'dragE'
          _view.dragE.linkProperty("Visibility",  function() { return displayElastic; }, function(_v) { displayElastic = _v; } ); // HtmlView linking property 'Visibility' for element 'dragE'
          _view.dragE.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragE'
          _view.dragG.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragG'
          _view.dragG.setAction("OnExit", function(_data,_info) {
  elementInteracted = 2
  interactPrompt1[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragG'
          _view.dragG.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  elementInteracted = 2 
  oneTrueLst(interactPrompt1, elementInteracted);
   //iniTotalEnergy[elementInteracted] = Math.round(dragGY);

}); // HtmlView setting action 'OnDrag' for element 'dragG'
          _view.dragG.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 2
    iniTotalEnergy[elementInteracted] = Math.round(dragGY);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragG'
          _view.dragG.linkProperty("X",  function() { return energyXpos[2]; } ); // HtmlView linking property 'X' for element 'dragG'
          _view.dragG.linkProperty("Y",  function() { return dragGY; }, function(_v) { dragGY = _v; } ); // HtmlView linking property 'Y' for element 'dragG'
          _view.dragG.linkProperty("Visibility",  function() { return displayGravitational; }, function(_v) { displayGravitational = _v; } ); // HtmlView linking property 'Visibility' for element 'dragG'
          _view.dragG.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragG'
          _view.dragI.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragI'
          _view.dragI.setAction("OnExit", function(_data,_info) {
  elementInteracted = 3 
  interactPrompt1[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragI'
          _view.dragI.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 3 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt1, elementInteracted);
   //iniTotalEnergy[elementInteracted] = Math.round(dragIY);

}); // HtmlView setting action 'OnDrag' for element 'dragI'
          _view.dragI.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 3 
    iniTotalEnergy[elementInteracted] = Math.round(dragIY);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragI'
          _view.dragI.linkProperty("X",  function() { return energyXpos[3]; } ); // HtmlView linking property 'X' for element 'dragI'
          _view.dragI.linkProperty("Y",  function() { return dragIY; }, function(_v) { dragIY = _v; } ); // HtmlView linking property 'Y' for element 'dragI'
          _view.dragI.linkProperty("Visibility",  function() { return displayInternal; }, function(_v) { displayInternal = _v; } ); // HtmlView linking property 'Visibility' for element 'dragI'
          _view.dragI.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragI'
          _view.dragK.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragK'
          _view.dragK.setAction("OnExit", function(_data,_info) {
  elementInteracted = 4 
  interactPrompt1[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragK'
          _view.dragK.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 4 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt1, elementInteracted);
   //iniTotalEnergy[elementInteracted] = Math.round(dragKY);

}); // HtmlView setting action 'OnDrag' for element 'dragK'
          _view.dragK.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 4 
    iniTotalEnergy[elementInteracted] = Math.round(dragKY);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragK'
          _view.dragK.linkProperty("X",  function() { return energyXpos[4]; } ); // HtmlView linking property 'X' for element 'dragK'
          _view.dragK.linkProperty("Y",  function() { return dragKY; }, function(_v) { dragKY = _v; } ); // HtmlView linking property 'Y' for element 'dragK'
          _view.dragK.linkProperty("Visibility",  function() { return displayKinetic; }, function(_v) { displayKinetic = _v; } ); // HtmlView linking property 'Visibility' for element 'dragK'
          _view.dragK.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragK'
          _view.dragN.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragN'
          _view.dragN.setAction("OnExit", function(_data,_info) {
  elementInteracted = 5 
  interactPrompt1[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragN'
          _view.dragN.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 5 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt1, elementInteracted);
   //iniTotalEnergy[elementInteracted] = Math.round(dragNY)
   //iniTotalEnergy[elementInteracted] = Math.round(_info.point[1]);

}); // HtmlView setting action 'OnDrag' for element 'dragN'
          _view.dragN.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 5 
    iniTotalEnergy[elementInteracted] = Math.round(dragNY);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragN'
          _view.dragN.linkProperty("X",  function() { return energyXpos[5]; } ); // HtmlView linking property 'X' for element 'dragN'
          _view.dragN.linkProperty("Y",  function() { return dragNY; }, function(_v) { dragNY = _v; } ); // HtmlView linking property 'Y' for element 'dragN'
          _view.dragN.linkProperty("Visibility",  function() { return displayNuclear; }, function(_v) { displayNuclear = _v; } ); // HtmlView linking property 'Visibility' for element 'dragN'
          _view.dragN.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragN'
          _view.images.linkProperty("Visibility",  function() { return show2D; }, function(_v) { show2D = _v; } ); // HtmlView linking property 'Visibility' for element 'images'
          _view.chemical.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[0]); } ); // HtmlView linking property 'NumberOfElements' for element 'chemical'
          _view.chemical.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'chemical'
          _view.chemical.linkProperty("X",  function() { return energyXpos[0]; } ); // HtmlView linking property 'X' for element 'chemical'
          _view.chemical.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[0] ); } ); // HtmlView linking property 'Y' for element 'chemical'
          _view.chemical.linkProperty("Visibility",  function() { return iniTotalEnergy[0]>0; } ); // HtmlView linking property 'Visibility' for element 'chemical'
          _view.chemical.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'chemical'
          _view.elastic.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[1]); } ); // HtmlView linking property 'NumberOfElements' for element 'elastic'
          _view.elastic.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'elastic'
          _view.elastic.linkProperty("X",  function() { return energyXpos[1]; } ); // HtmlView linking property 'X' for element 'elastic'
          _view.elastic.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[1] ); } ); // HtmlView linking property 'Y' for element 'elastic'
          _view.elastic.linkProperty("Visibility",  function() { return iniTotalEnergy[1]>0; } ); // HtmlView linking property 'Visibility' for element 'elastic'
          _view.elastic.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'elastic'
          _view.gravity.linkProperty("NumberOfElements",  function() { return Math.abs(Math.round(iniTotalEnergy[2])); } ); // HtmlView linking property 'NumberOfElements' for element 'gravity'
          _view.gravity.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'gravity'
          _view.gravity.linkProperty("X",  function() { return energyXpos[2]; } ); // HtmlView linking property 'X' for element 'gravity'
          _view.gravity.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[2] ); } ); // HtmlView linking property 'Y' for element 'gravity'
          _view.gravity.linkProperty("Visibility",  function() { return Math.abs(iniTotalEnergy[2])>0; } ); // HtmlView linking property 'Visibility' for element 'gravity'
          _view.gravity.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'gravity'
          _view.internal.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[3]); } ); // HtmlView linking property 'NumberOfElements' for element 'internal'
          _view.internal.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'internal'
          _view.internal.linkProperty("X",  function() { return energyXpos[3]; } ); // HtmlView linking property 'X' for element 'internal'
          _view.internal.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[3] ); } ); // HtmlView linking property 'Y' for element 'internal'
          _view.internal.linkProperty("Visibility",  function() { return iniTotalEnergy[3]>0; } ); // HtmlView linking property 'Visibility' for element 'internal'
          _view.internal.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'internal'
          _view.kinetic.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[4]); } ); // HtmlView linking property 'NumberOfElements' for element 'kinetic'
          _view.kinetic.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'kinetic'
          _view.kinetic.linkProperty("X",  function() { return energyXpos[4]; } ); // HtmlView linking property 'X' for element 'kinetic'
          _view.kinetic.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[4] ); } ); // HtmlView linking property 'Y' for element 'kinetic'
          _view.kinetic.linkProperty("Visibility",  function() { return iniTotalEnergy[4]>0; } ); // HtmlView linking property 'Visibility' for element 'kinetic'
          _view.kinetic.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'kinetic'
          _view.nuclear.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[5]); } ); // HtmlView linking property 'NumberOfElements' for element 'nuclear'
          _view.nuclear.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'nuclear'
          _view.nuclear.linkProperty("X",  function() { return energyXpos[5]; } ); // HtmlView linking property 'X' for element 'nuclear'
          _view.nuclear.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[5] ); } ); // HtmlView linking property 'Y' for element 'nuclear'
          _view.nuclear.linkProperty("Visibility",  function() { return iniTotalEnergy[5]>0; } ); // HtmlView linking property 'Visibility' for element 'nuclear'
          _view.nuclear.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'nuclear'
          _view.images3D.linkProperty("Visibility",  function() { return show3D; }, function(_v) { show3D = _v; } ); // HtmlView linking property 'Visibility' for element 'images3D'
          _view.chemical3.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[0]); } ); // HtmlView linking property 'NumberOfElements' for element 'chemical3'
          _view.chemical3.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'chemical3'
          _view.chemical3.linkProperty("X",  function() { return energyXpos[0]; } ); // HtmlView linking property 'X' for element 'chemical3'
          _view.chemical3.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[0] ); } ); // HtmlView linking property 'Y' for element 'chemical3'
          _view.chemical3.linkProperty("Visibility",  function() { return iniTotalEnergy[0]>0; } ); // HtmlView linking property 'Visibility' for element 'chemical3'
          _view.chemical3.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'chemical3'
          _view.elastic3.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[1]); } ); // HtmlView linking property 'NumberOfElements' for element 'elastic3'
          _view.elastic3.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'elastic3'
          _view.elastic3.linkProperty("X",  function() { return energyXpos[1]; } ); // HtmlView linking property 'X' for element 'elastic3'
          _view.elastic3.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[1] ); } ); // HtmlView linking property 'Y' for element 'elastic3'
          _view.elastic3.linkProperty("Visibility",  function() { return iniTotalEnergy[1]>0; } ); // HtmlView linking property 'Visibility' for element 'elastic3'
          _view.elastic3.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'elastic3'
          _view.gravity3.linkProperty("NumberOfElements",  function() { return Math.abs(Math.round(iniTotalEnergy[2])); } ); // HtmlView linking property 'NumberOfElements' for element 'gravity3'
          _view.gravity3.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'gravity3'
          _view.gravity3.linkProperty("X",  function() { return energyXpos[2]; } ); // HtmlView linking property 'X' for element 'gravity3'
          _view.gravity3.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[2] ); } ); // HtmlView linking property 'Y' for element 'gravity3'
          _view.gravity3.linkProperty("Visibility",  function() { return Math.abs(iniTotalEnergy[2])>0; } ); // HtmlView linking property 'Visibility' for element 'gravity3'
          _view.gravity3.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'gravity3'
          _view.internal3.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[3]); } ); // HtmlView linking property 'NumberOfElements' for element 'internal3'
          _view.internal3.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'internal3'
          _view.internal3.linkProperty("X",  function() { return energyXpos[3]; } ); // HtmlView linking property 'X' for element 'internal3'
          _view.internal3.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[3] ); } ); // HtmlView linking property 'Y' for element 'internal3'
          _view.internal3.linkProperty("Visibility",  function() { return iniTotalEnergy[3]>0; } ); // HtmlView linking property 'Visibility' for element 'internal3'
          _view.internal3.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'internal3'
          _view.kinetic3.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[4]); } ); // HtmlView linking property 'NumberOfElements' for element 'kinetic3'
          _view.kinetic3.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'kinetic3'
          _view.kinetic3.linkProperty("X",  function() { return energyXpos[4]; } ); // HtmlView linking property 'X' for element 'kinetic3'
          _view.kinetic3.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[4] ); } ); // HtmlView linking property 'Y' for element 'kinetic3'
          _view.kinetic3.linkProperty("Visibility",  function() { return iniTotalEnergy[4]>0; } ); // HtmlView linking property 'Visibility' for element 'kinetic3'
          _view.kinetic3.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'kinetic3'
          _view.nuclear3.linkProperty("NumberOfElements",  function() { return Math.round(iniTotalEnergy[5]); } ); // HtmlView linking property 'NumberOfElements' for element 'nuclear3'
          _view.nuclear3.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'nuclear3'
          _view.nuclear3.linkProperty("X",  function() { return energyXpos[5]; } ); // HtmlView linking property 'X' for element 'nuclear3'
          _view.nuclear3.linkProperty("Y",  function() { return numberedLst( iniTotalEnergy[5] ); } ); // HtmlView linking property 'Y' for element 'nuclear3'
          _view.nuclear3.linkProperty("Visibility",  function() { return iniTotalEnergy[5]>0; } ); // HtmlView linking property 'Visibility' for element 'nuclear3'
          _view.nuclear3.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'nuclear3'
          _view.O.linkProperty("TitleX",  function() { return hint; }, function(_v) { hint = _v; } ); // HtmlView linking property 'TitleX' for element 'O'
          _view.O.linkProperty("TitleFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'TitleFont' for element 'O'
          _view.textObject.linkProperty("Text",  function() { return systemText2; }, function(_v) { systemText2 = _v; } ); // HtmlView linking property 'Text' for element 'textObject'
          _view.arrowIN.linkProperty("SizeX",  function() { return -arrowLength; } ); // HtmlView linking property 'SizeX' for element 'arrowIN'
          _view.arrowIN.linkProperty("Rotate",  function() { return Math.atan2(energyInArrowY, energyInArrowX); } ); // HtmlView linking property 'Rotate' for element 'arrowIN'
          _view.arrowIN.linkProperty("X",  function() { return energyInArrowX; }, function(_v) { energyInArrowX = _v; } ); // HtmlView linking property 'X' for element 'arrowIN'
          _view.arrowIN.linkProperty("Y",  function() { return energyInArrowY; }, function(_v) { energyInArrowY = _v; } ); // HtmlView linking property 'Y' for element 'arrowIN'
          _view.arrowIN.linkProperty("Visibility",  function() { return check3a; }, function(_v) { check3a = _v; } ); // HtmlView linking property 'Visibility' for element 'arrowIN'
          _view.arrowIN.setAction("OnDrag", function(_data,_info) {
  // Calculate the magnitude of the vector
  var magnitude = Math.sqrt(energyInArrowX * energyInArrowX + energyInArrowY * energyInArrowY);
  var angle = Math.atan2(energyInArrowY, energyInArrowX)
  var minDistance = 3;
  var maxDistance = 9;
  var radius = 2.5
  energyInArrowX = radius * Math.cos(angle);
  energyInArrowY = radius * Math.sin(angle);
  // update the image positions
  radius += 2;
  INimgX = radius * Math.cos(angle);
  INimgY = radius * Math.sin(angle);
    
     /*
     // If magnitude exceeds maxDistance, scale down the vector
      if (magnitude > maxDistance) {
          var scaleFactor = maxDistance / magnitude;
          energyInArrowX *= scaleFactor;
          energyInArrowY *= scaleFactor;
      }
      else if (magnitude < minDistance) {
          var scaleFactor = maxDistance / magnitude;
          energyInArrowX *= scaleFactor;
          energyInArrowY *= scaleFactor;
      }
  */;

}); // HtmlView setting action 'OnDrag' for element 'arrowIN'
          _view.arrowIN2.linkProperty("SizeX",  function() { return -arrowLength; } ); // HtmlView linking property 'SizeX' for element 'arrowIN2'
          _view.arrowIN2.linkProperty("Rotate",  function() { return Math.atan2(energyIn2ArrowY, energyIn2ArrowX); } ); // HtmlView linking property 'Rotate' for element 'arrowIN2'
          _view.arrowIN2.linkProperty("X",  function() { return energyIn2ArrowX; }, function(_v) { energyIn2ArrowX = _v; } ); // HtmlView linking property 'X' for element 'arrowIN2'
          _view.arrowIN2.linkProperty("Y",  function() { return energyIn2ArrowY; }, function(_v) { energyIn2ArrowY = _v; } ); // HtmlView linking property 'Y' for element 'arrowIN2'
          _view.arrowIN2.linkProperty("Visibility",  function() { return check3b; }, function(_v) { check3b = _v; } ); // HtmlView linking property 'Visibility' for element 'arrowIN2'
          _view.arrowIN2.setAction("OnDrag", function(_data,_info) {
  // Calculate the magnitude of the vector
  var magnitude = Math.sqrt(energyIn2ArrowX * energyIn2ArrowX + energyIn2ArrowY * energyIn2ArrowY);
  var angle = Math.atan2(energyIn2ArrowY, energyIn2ArrowX)
  var minDistance = 3;
  var maxDistance = 9;
  var radius = 2.5
  energyIn2ArrowX = radius * Math.cos(angle);
  energyIn2ArrowY = radius * Math.sin(angle);
  // update the image positions
  radius += 2;
  IN2imgX = radius * Math.cos(angle);
  IN2imgY = radius * Math.sin(angle);

}); // HtmlView setting action 'OnDrag' for element 'arrowIN2'
          _view.arrowOUT.linkProperty("SizeX",  function() { return arrowLength; }, function(_v) { arrowLength = _v; } ); // HtmlView linking property 'SizeX' for element 'arrowOUT'
          _view.arrowOUT.linkProperty("Rotate",  function() { return Math.atan2(energyOutArrowY, energyOutArrowX); } ); // HtmlView linking property 'Rotate' for element 'arrowOUT'
          _view.arrowOUT.linkProperty("X",  function() { return energyOutArrowX; }, function(_v) { energyOutArrowX = _v; } ); // HtmlView linking property 'X' for element 'arrowOUT'
          _view.arrowOUT.linkProperty("Y",  function() { return energyOutArrowY; }, function(_v) { energyOutArrowY = _v; } ); // HtmlView linking property 'Y' for element 'arrowOUT'
          _view.arrowOUT.linkProperty("Visibility",  function() { return check4a; }, function(_v) { check4a = _v; } ); // HtmlView linking property 'Visibility' for element 'arrowOUT'
          _view.arrowOUT.setAction("OnDrag", function(_data,_info) {
  // Calculate the magnitude of the vector
  var magnitude = Math.sqrt(energyOutArrowX * energyOutArrowX + energyOutArrowY * energyOutArrowY);
  var angle = Math.atan2(energyOutArrowY, energyOutArrowX)
  var minDistance = 3;
  var maxDistance = 9;
  var radius = 2.5
  energyOutArrowX = radius * Math.cos(angle);
  energyOutArrowY = radius * Math.sin(angle);
  // Update the image positions
  radius += 2;
  OUTimgX = radius * Math.cos(angle);
  OUTimgY = radius * Math.sin(angle);

}); // HtmlView setting action 'OnDrag' for element 'arrowOUT'
          _view.arrowOUT2.linkProperty("SizeX",  function() { return arrowLength; }, function(_v) { arrowLength = _v; } ); // HtmlView linking property 'SizeX' for element 'arrowOUT2'
          _view.arrowOUT2.linkProperty("Rotate",  function() { return Math.atan2(energyOut2ArrowY, energyOut2ArrowX); } ); // HtmlView linking property 'Rotate' for element 'arrowOUT2'
          _view.arrowOUT2.linkProperty("X",  function() { return energyOut2ArrowX; }, function(_v) { energyOut2ArrowX = _v; } ); // HtmlView linking property 'X' for element 'arrowOUT2'
          _view.arrowOUT2.linkProperty("Y",  function() { return energyOut2ArrowY; }, function(_v) { energyOut2ArrowY = _v; } ); // HtmlView linking property 'Y' for element 'arrowOUT2'
          _view.arrowOUT2.linkProperty("Visibility",  function() { return check4b; }, function(_v) { check4b = _v; } ); // HtmlView linking property 'Visibility' for element 'arrowOUT2'
          _view.arrowOUT2.setAction("OnDrag", function(_data,_info) {
  // Calculate the magnitude of the vector
  var magnitude = Math.sqrt(energyOut2ArrowX * energyOut2ArrowX + energyOut2ArrowY * energyOut2ArrowY);
  var angle = Math.atan2(energyOut2ArrowY, energyOut2ArrowX)
  var minDistance = 3;
  var maxDistance = 9;
  var radius = 2.5
  energyOut2ArrowX = radius * Math.cos(angle);
  energyOut2ArrowY = radius * Math.sin(angle);
  // Update the image positions
  radius += 2;
  OUT2imgX = radius * Math.cos(angle);
  OUT2imgY = radius * Math.sin(angle);

}); // HtmlView setting action 'OnDrag' for element 'arrowOUT2'
          _view.imageIN.linkProperty("SizeX",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'imageIN'
          _view.imageIN.linkProperty("X",  function() { return INimgX; }, function(_v) { INimgX = _v; } ); // HtmlView linking property 'X' for element 'imageIN'
          _view.imageIN.linkProperty("ImageUrl",  function() { return imgIN[updateTransIN]; }, function(_v) { imgIN[updateTransIN] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'imageIN'
          _view.imageIN.linkProperty("Y",  function() { return INimgY; }, function(_v) { INimgY = _v; } ); // HtmlView linking property 'Y' for element 'imageIN'
          _view.imageIN.linkProperty("Visibility",  function() { return check3a; }, function(_v) { check3a = _v; } ); // HtmlView linking property 'Visibility' for element 'imageIN'
          _view.imageIN.linkProperty("SizeY",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'imageIN'
          _view.interactPrompt.linkProperty("SizeX",  function() { return energyWidth+0.1; } ); // HtmlView linking property 'SizeX' for element 'interactPrompt'
          _view.interactPrompt.linkProperty("LineColor",  function() { return promptLineColour; }, function(_v) { promptLineColour = _v; } ); // HtmlView linking property 'LineColor' for element 'interactPrompt'
          _view.interactPrompt.linkProperty("X",  function() { return INenergyX; }, function(_v) { INenergyX = _v; } ); // HtmlView linking property 'X' for element 'interactPrompt'
          _view.interactPrompt.linkProperty("Y",  function() { return INenergyY; }, function(_v) { INenergyY = _v; } ); // HtmlView linking property 'Y' for element 'interactPrompt'
          _view.interactPrompt.linkProperty("Visibility",  function() { return INinteract; }, function(_v) { INinteract = _v; } ); // HtmlView linking property 'Visibility' for element 'interactPrompt'
          _view.interactPrompt.linkProperty("SizeY",  function() { return EtransIN+0.1; } ); // HtmlView linking property 'SizeY' for element 'interactPrompt'
          _view.energyIN2.linkProperty("FillColor",  function() { return energyColour; }, function(_v) { energyColour = _v; } ); // HtmlView linking property 'FillColor' for element 'energyIN2'
          _view.energyIN2.setAction("OnExit", function(_data,_info) {
  INinteract = false;

}); // HtmlView setting action 'OnExit' for element 'energyIN2'
          _view.energyIN2.setAction("OnDrag", function(_data,_info) {
  // Restrict numbers to integers //
  //EtransIN = Math.round(EtransIN);
  //EtransIN = Math.round(EtransIN);

}); // HtmlView setting action 'OnDrag' for element 'energyIN2'
          _view.energyIN2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //EtransIN = Math.round(EtransIN);
  EtransIN = Math.round(EtransIN);

}); // HtmlView setting action 'OnRelease' for element 'energyIN2'
          _view.energyIN2.linkProperty("SizeX",  function() { return energyWidth; }, function(_v) { energyWidth = _v; } ); // HtmlView linking property 'SizeX' for element 'energyIN2'
          _view.energyIN2.linkProperty("X",  function() { return INenergyX; }, function(_v) { INenergyX = _v; } ); // HtmlView linking property 'X' for element 'energyIN2'
          _view.energyIN2.setAction("OnEnter", function(_data,_info) {
  INinteract = true;

}); // HtmlView setting action 'OnEnter' for element 'energyIN2'
          _view.energyIN2.linkProperty("Y",  function() { return INenergyY; }, function(_v) { INenergyY = _v; } ); // HtmlView linking property 'Y' for element 'energyIN2'
          _view.energyIN2.setAction("OnPress", function(_data,_info) {
  INinteract = true;

}); // HtmlView setting action 'OnPress' for element 'energyIN2'
          _view.energyIN2.linkProperty("SizeY",  function() { return EtransIN; }, function(_v) { EtransIN = _v; } ); // HtmlView linking property 'SizeY' for element 'energyIN2'
          _view.transIN_text.linkProperty("X",  function() { return INtextX; }, function(_v) { INtextX = _v; } ); // HtmlView linking property 'X' for element 'transIN_text'
          _view.transIN_text.linkProperty("Y",  function() { return INtextY; }, function(_v) { INtextY = _v; } ); // HtmlView linking property 'Y' for element 'transIN_text'
          _view.transIN_text.linkProperty("Visibility",  function() { return check3a; }, function(_v) { check3a = _v; } ); // HtmlView linking property 'Visibility' for element 'transIN_text'
          _view.iconINamt.linkProperty("NumberOfElements",  function() { return Math.round(EtransIN); } ); // HtmlView linking property 'NumberOfElements' for element 'iconINamt'
          _view.iconINamt.linkProperty("SizeX",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'iconINamt'
          _view.iconINamt.linkProperty("X",  function() { return INenergyX; }, function(_v) { INenergyX = _v; } ); // HtmlView linking property 'X' for element 'iconINamt'
          _view.iconINamt.linkProperty("ImageUrl",  function() { return imgIN[updateTransIN]; }, function(_v) { imgIN[updateTransIN] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'iconINamt'
          _view.iconINamt.linkProperty("Y",  function() { return numberedLstFromX(EtransIN,INenergyY); } ); // HtmlView linking property 'Y' for element 'iconINamt'
          _view.iconINamt.linkProperty("Visibility",  function() { return EtransIN>0; } ); // HtmlView linking property 'Visibility' for element 'iconINamt'
          _view.iconINamt.linkProperty("SizeY",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'iconINamt'
          _view.amtIN.linkProperty("X",  function() { return INenergyX; }, function(_v) { INenergyX = _v; } ); // HtmlView linking property 'X' for element 'amtIN'
          _view.amtIN.linkProperty("Y",  function() { return INenergyY+EtransIN+0.2; } ); // HtmlView linking property 'Y' for element 'amtIN'
          _view.amtIN.linkProperty("Text",  function() { return Math.round(EtransIN); }, function(_v) { Math.round(EtransIN) = _v; } ); // HtmlView linking property 'Text' for element 'amtIN'
          _view.amtIN.linkProperty("Visibility",  function() { return check3a; }, function(_v) { check3a = _v; } ); // HtmlView linking property 'Visibility' for element 'amtIN'
          _view.drag3Helper.linkProperty("Y",  function() { return INenergyY; }, function(_v) { INenergyY = _v; } ); // HtmlView linking property 'Y' for element 'drag3Helper'
          _view.dragTin1.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragTin1'
          _view.dragTin1.setAction("OnExit", function(_data,_info) {
  INinteract = false;

}); // HtmlView setting action 'OnExit' for element 'dragTin1'
          _view.dragTin1.setAction("OnDrag", function(_data,_info) {
  INinteract = true;

}); // HtmlView setting action 'OnDrag' for element 'dragTin1'
          _view.dragTin1.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
    //EtransIN = Math.round(EtransIN);    // → restrict movements in Ipad Pro :(
    //EtransIN = Math.round(_info.point[1]);
  EtransIN = Math.round(dragEtransIN);
  INinteract = false;

}); // HtmlView setting action 'OnRelease' for element 'dragTin1'
          _view.dragTin1.linkProperty("X",  function() { return INenergyX; }, function(_v) { INenergyX = _v; } ); // HtmlView linking property 'X' for element 'dragTin1'
          _view.dragTin1.setAction("OnEnter", function(_data,_info) {
  INinteract = true;

}); // HtmlView setting action 'OnEnter' for element 'dragTin1'
          _view.dragTin1.linkProperty("Y",  function() { return dragEtransIN; }, function(_v) { dragEtransIN = _v; } ); // HtmlView linking property 'Y' for element 'dragTin1'
          _view.dragTin1.linkProperty("Visibility",  function() { return check3a; }, function(_v) { check3a = _v; } ); // HtmlView linking property 'Visibility' for element 'dragTin1'
          _view.dragTin1.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragTin1'
          _view.drag4Helper.linkProperty("Y",  function() { return IN2energyY; }, function(_v) { IN2energyY = _v; } ); // HtmlView linking property 'Y' for element 'drag4Helper'
          _view.dragTin2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragTin2'
          _view.dragTin2.setAction("OnExit", function(_data,_info) {
  IN2interact = false;

}); // HtmlView setting action 'OnExit' for element 'dragTin2'
          _view.dragTin2.setAction("OnDrag", function(_data,_info) {
  IN2interact = true;

}); // HtmlView setting action 'OnDrag' for element 'dragTin2'
          _view.dragTin2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
    //EtransIN2 = Math.round(EtransIN2);  // → restrict movements in Ipad Pro
  EtransIN2 = Math.round(dragEtransIN2); 
  IN2interact = false;

}); // HtmlView setting action 'OnRelease' for element 'dragTin2'
          _view.dragTin2.linkProperty("X",  function() { return IN2energyX; }, function(_v) { IN2energyX = _v; } ); // HtmlView linking property 'X' for element 'dragTin2'
          _view.dragTin2.setAction("OnEnter", function(_data,_info) {
  IN2interact = true;

}); // HtmlView setting action 'OnEnter' for element 'dragTin2'
          _view.dragTin2.linkProperty("Y",  function() { return dragEtransIN2; }, function(_v) { dragEtransIN2 = _v; } ); // HtmlView linking property 'Y' for element 'dragTin2'
          _view.dragTin2.linkProperty("Visibility",  function() { return check3b; }, function(_v) { check3b = _v; } ); // HtmlView linking property 'Visibility' for element 'dragTin2'
          _view.dragTin2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragTin2'
          _view.imageIN2.linkProperty("SizeX",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'imageIN2'
          _view.imageIN2.linkProperty("X",  function() { return IN2imgX; }, function(_v) { IN2imgX = _v; } ); // HtmlView linking property 'X' for element 'imageIN2'
          _view.imageIN2.linkProperty("ImageUrl",  function() { return imgIN2[updateTransIN2]; }, function(_v) { imgIN2[updateTransIN2] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'imageIN2'
          _view.imageIN2.linkProperty("Y",  function() { return IN2imgY; }, function(_v) { IN2imgY = _v; } ); // HtmlView linking property 'Y' for element 'imageIN2'
          _view.imageIN2.linkProperty("Visibility",  function() { return check3b; }, function(_v) { check3b = _v; } ); // HtmlView linking property 'Visibility' for element 'imageIN2'
          _view.imageIN2.linkProperty("SizeY",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'imageIN2'
          _view.interactPrompt3.linkProperty("SizeX",  function() { return energyWidth+0.1; } ); // HtmlView linking property 'SizeX' for element 'interactPrompt3'
          _view.interactPrompt3.linkProperty("LineColor",  function() { return promptLineColour; }, function(_v) { promptLineColour = _v; } ); // HtmlView linking property 'LineColor' for element 'interactPrompt3'
          _view.interactPrompt3.linkProperty("X",  function() { return IN2energyX; }, function(_v) { IN2energyX = _v; } ); // HtmlView linking property 'X' for element 'interactPrompt3'
          _view.interactPrompt3.linkProperty("Y",  function() { return IN2energyY; }, function(_v) { IN2energyY = _v; } ); // HtmlView linking property 'Y' for element 'interactPrompt3'
          _view.interactPrompt3.linkProperty("Visibility",  function() { return IN2interact; }, function(_v) { IN2interact = _v; } ); // HtmlView linking property 'Visibility' for element 'interactPrompt3'
          _view.interactPrompt3.linkProperty("SizeY",  function() { return EtransIN2+0.1; } ); // HtmlView linking property 'SizeY' for element 'interactPrompt3'
          _view.energyIN22.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  EtransIN2 = Math.round(EtransIN2);

}); // HtmlView setting action 'OnRelease' for element 'energyIN22'
          _view.energyIN22.linkProperty("FillColor",  function() { return energyColour; }, function(_v) { energyColour = _v; } ); // HtmlView linking property 'FillColor' for element 'energyIN22'
          _view.energyIN22.setAction("OnExit", function(_data,_info) {
  IN2interact = false;

}); // HtmlView setting action 'OnExit' for element 'energyIN22'
          _view.energyIN22.linkProperty("SizeX",  function() { return energyWidth; }, function(_v) { energyWidth = _v; } ); // HtmlView linking property 'SizeX' for element 'energyIN22'
          _view.energyIN22.linkProperty("X",  function() { return IN2energyX; }, function(_v) { IN2energyX = _v; } ); // HtmlView linking property 'X' for element 'energyIN22'
          _view.energyIN22.setAction("OnEnter", function(_data,_info) {
  IN2interact = true;

}); // HtmlView setting action 'OnEnter' for element 'energyIN22'
          _view.energyIN22.linkProperty("Y",  function() { return IN2energyY; }, function(_v) { IN2energyY = _v; } ); // HtmlView linking property 'Y' for element 'energyIN22'
          _view.energyIN22.linkProperty("SizeY",  function() { return EtransIN2; }, function(_v) { EtransIN2 = _v; } ); // HtmlView linking property 'SizeY' for element 'energyIN22'
          _view.transIN_text2.linkProperty("X",  function() { return IN2textX; }, function(_v) { IN2textX = _v; } ); // HtmlView linking property 'X' for element 'transIN_text2'
          _view.transIN_text2.linkProperty("Y",  function() { return IN2textY; }, function(_v) { IN2textY = _v; } ); // HtmlView linking property 'Y' for element 'transIN_text2'
          _view.transIN_text2.linkProperty("Visibility",  function() { return check3b; }, function(_v) { check3b = _v; } ); // HtmlView linking property 'Visibility' for element 'transIN_text2'
          _view.iconINamt2.linkProperty("NumberOfElements",  function() { return Math.round(EtransIN2); } ); // HtmlView linking property 'NumberOfElements' for element 'iconINamt2'
          _view.iconINamt2.linkProperty("SizeX",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'iconINamt2'
          _view.iconINamt2.linkProperty("X",  function() { return IN2energyX; }, function(_v) { IN2energyX = _v; } ); // HtmlView linking property 'X' for element 'iconINamt2'
          _view.iconINamt2.linkProperty("ImageUrl",  function() { return imgIN2[updateTransIN2]; }, function(_v) { imgIN2[updateTransIN2] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'iconINamt2'
          _view.iconINamt2.linkProperty("Y",  function() { return numberedLstFromX(EtransIN2,IN2energyY); } ); // HtmlView linking property 'Y' for element 'iconINamt2'
          _view.iconINamt2.linkProperty("Visibility",  function() { return EtransIN2>0; } ); // HtmlView linking property 'Visibility' for element 'iconINamt2'
          _view.iconINamt2.linkProperty("SizeY",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'iconINamt2'
          _view.amtIN2.linkProperty("X",  function() { return IN2energyX; }, function(_v) { IN2energyX = _v; } ); // HtmlView linking property 'X' for element 'amtIN2'
          _view.amtIN2.linkProperty("Y",  function() { return IN2energyY+EtransIN2+0.2; } ); // HtmlView linking property 'Y' for element 'amtIN2'
          _view.amtIN2.linkProperty("Text",  function() { return Math.round(EtransIN2); }, function(_v) { Math.round(EtransIN2) = _v; } ); // HtmlView linking property 'Text' for element 'amtIN2'
          _view.amtIN2.linkProperty("Visibility",  function() { return check3b; }, function(_v) { check3b = _v; } ); // HtmlView linking property 'Visibility' for element 'amtIN2'
          _view.imageOUT.linkProperty("SizeX",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'imageOUT'
          _view.imageOUT.linkProperty("X",  function() { return OUTimgX; }, function(_v) { OUTimgX = _v; } ); // HtmlView linking property 'X' for element 'imageOUT'
          _view.imageOUT.linkProperty("ImageUrl",  function() { return imgOUT[updateTransOUT]; }, function(_v) { imgOUT[updateTransOUT] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'imageOUT'
          _view.imageOUT.linkProperty("Y",  function() { return OUTimgY; }, function(_v) { OUTimgY = _v; } ); // HtmlView linking property 'Y' for element 'imageOUT'
          _view.imageOUT.linkProperty("Visibility",  function() { return check4a; }, function(_v) { check4a = _v; } ); // HtmlView linking property 'Visibility' for element 'imageOUT'
          _view.imageOUT.linkProperty("SizeY",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'imageOUT'
          _view.interactPrompt2.linkProperty("SizeX",  function() { return energyWidth+0.1; } ); // HtmlView linking property 'SizeX' for element 'interactPrompt2'
          _view.interactPrompt2.linkProperty("LineColor",  function() { return promptLineColour; }, function(_v) { promptLineColour = _v; } ); // HtmlView linking property 'LineColor' for element 'interactPrompt2'
          _view.interactPrompt2.linkProperty("X",  function() { return OUTenergyX; }, function(_v) { OUTenergyX = _v; } ); // HtmlView linking property 'X' for element 'interactPrompt2'
          _view.interactPrompt2.linkProperty("Y",  function() { return OUTenergyY; }, function(_v) { OUTenergyY = _v; } ); // HtmlView linking property 'Y' for element 'interactPrompt2'
          _view.interactPrompt2.linkProperty("Visibility",  function() { return OUTinteract; }, function(_v) { OUTinteract = _v; } ); // HtmlView linking property 'Visibility' for element 'interactPrompt2'
          _view.interactPrompt2.linkProperty("SizeY",  function() { return EtransOUT+0.1; } ); // HtmlView linking property 'SizeY' for element 'interactPrompt2'
          _view.energyOUT2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  EtransOUT = Math.round(EtransOUT);

}); // HtmlView setting action 'OnRelease' for element 'energyOUT2'
          _view.energyOUT2.linkProperty("FillColor",  function() { return energyColour; }, function(_v) { energyColour = _v; } ); // HtmlView linking property 'FillColor' for element 'energyOUT2'
          _view.energyOUT2.setAction("OnExit", function(_data,_info) {
  OUTinteract = false;

}); // HtmlView setting action 'OnExit' for element 'energyOUT2'
          _view.energyOUT2.linkProperty("SizeX",  function() { return energyWidth; }, function(_v) { energyWidth = _v; } ); // HtmlView linking property 'SizeX' for element 'energyOUT2'
          _view.energyOUT2.linkProperty("X",  function() { return OUTenergyX; }, function(_v) { OUTenergyX = _v; } ); // HtmlView linking property 'X' for element 'energyOUT2'
          _view.energyOUT2.setAction("OnEnter", function(_data,_info) {
  OUTinteract = true;

}); // HtmlView setting action 'OnEnter' for element 'energyOUT2'
          _view.energyOUT2.linkProperty("Y",  function() { return OUTenergyY; }, function(_v) { OUTenergyY = _v; } ); // HtmlView linking property 'Y' for element 'energyOUT2'
          _view.energyOUT2.linkProperty("SizeY",  function() { return EtransOUT; }, function(_v) { EtransOUT = _v; } ); // HtmlView linking property 'SizeY' for element 'energyOUT2'
          _view.out_text.linkProperty("X",  function() { return OUTtextX; }, function(_v) { OUTtextX = _v; } ); // HtmlView linking property 'X' for element 'out_text'
          _view.out_text.linkProperty("Y",  function() { return OUTtextY; }, function(_v) { OUTtextY = _v; } ); // HtmlView linking property 'Y' for element 'out_text'
          _view.out_text.linkProperty("Visibility",  function() { return check4a; }, function(_v) { check4a = _v; } ); // HtmlView linking property 'Visibility' for element 'out_text'
          _view.amtOUT.linkProperty("X",  function() { return OUTenergyX; }, function(_v) { OUTenergyX = _v; } ); // HtmlView linking property 'X' for element 'amtOUT'
          _view.amtOUT.linkProperty("Y",  function() { return OUTenergyY + EtransOUT+0.2; } ); // HtmlView linking property 'Y' for element 'amtOUT'
          _view.amtOUT.linkProperty("Text",  function() { return Math.round(EtransOUT); }, function(_v) { Math.round(EtransOUT) = _v; } ); // HtmlView linking property 'Text' for element 'amtOUT'
          _view.amtOUT.linkProperty("Visibility",  function() { return check4a; }, function(_v) { check4a = _v; } ); // HtmlView linking property 'Visibility' for element 'amtOUT'
          _view.iconOUTamt.linkProperty("NumberOfElements",  function() { return Math.round(EtransOUT); } ); // HtmlView linking property 'NumberOfElements' for element 'iconOUTamt'
          _view.iconOUTamt.linkProperty("SizeX",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'iconOUTamt'
          _view.iconOUTamt.linkProperty("X",  function() { return OUTenergyX; }, function(_v) { OUTenergyX = _v; } ); // HtmlView linking property 'X' for element 'iconOUTamt'
          _view.iconOUTamt.linkProperty("ImageUrl",  function() { return imgOUT[updateTransOUT]; }, function(_v) { imgOUT[updateTransOUT] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'iconOUTamt'
          _view.iconOUTamt.linkProperty("Y",  function() { return numberedLstFromX(EtransOUT,OUTenergyY); } ); // HtmlView linking property 'Y' for element 'iconOUTamt'
          _view.iconOUTamt.linkProperty("Visibility",  function() { return EtransOUT>0; } ); // HtmlView linking property 'Visibility' for element 'iconOUTamt'
          _view.iconOUTamt.linkProperty("SizeY",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'iconOUTamt'
          _view.drag5Helper.linkProperty("Y",  function() { return OUTenergyY; }, function(_v) { OUTenergyY = _v; } ); // HtmlView linking property 'Y' for element 'drag5Helper'
          _view.dragTout1.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragTout1'
          _view.dragTout1.setAction("OnExit", function(_data,_info) {
  OUTinteract = false;

}); // HtmlView setting action 'OnExit' for element 'dragTout1'
          _view.dragTout1.setAction("OnDrag", function(_data,_info) {
  OUTinteract = true;

}); // HtmlView setting action 'OnDrag' for element 'dragTout1'
          _view.dragTout1.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
    //EtransOUT = Math.round(EtransOUT);  // → restrict movements in Ipad Pro
    
  EtransOUT = Math.round(dragEtransOUT);
  OUTinteract = false;

}); // HtmlView setting action 'OnRelease' for element 'dragTout1'
          _view.dragTout1.linkProperty("X",  function() { return OUTenergyX; }, function(_v) { OUTenergyX = _v; } ); // HtmlView linking property 'X' for element 'dragTout1'
          _view.dragTout1.setAction("OnEnter", function(_data,_info) {
  OUTinteract = true;

}); // HtmlView setting action 'OnEnter' for element 'dragTout1'
          _view.dragTout1.linkProperty("Y",  function() { return dragEtransOUT; }, function(_v) { dragEtransOUT = _v; } ); // HtmlView linking property 'Y' for element 'dragTout1'
          _view.dragTout1.linkProperty("Visibility",  function() { return check4a; }, function(_v) { check4a = _v; } ); // HtmlView linking property 'Visibility' for element 'dragTout1'
          _view.dragTout1.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragTout1'
          _view.imageOUT2.linkProperty("SizeX",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'imageOUT2'
          _view.imageOUT2.linkProperty("X",  function() { return OUT2imgX; }, function(_v) { OUT2imgX = _v; } ); // HtmlView linking property 'X' for element 'imageOUT2'
          _view.imageOUT2.linkProperty("ImageUrl",  function() { return imgOUT2[updateTransOUT2]; }, function(_v) { imgOUT2[updateTransOUT2] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'imageOUT2'
          _view.imageOUT2.linkProperty("Y",  function() { return OUT2imgY; }, function(_v) { OUT2imgY = _v; } ); // HtmlView linking property 'Y' for element 'imageOUT2'
          _view.imageOUT2.linkProperty("Visibility",  function() { return check4b; }, function(_v) { check4b = _v; } ); // HtmlView linking property 'Visibility' for element 'imageOUT2'
          _view.imageOUT2.linkProperty("SizeY",  function() { return imgSIZE; }, function(_v) { imgSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'imageOUT2'
          _view.interactPrompt22.linkProperty("SizeX",  function() { return energyWidth+0.1; } ); // HtmlView linking property 'SizeX' for element 'interactPrompt22'
          _view.interactPrompt22.linkProperty("LineColor",  function() { return promptLineColour; }, function(_v) { promptLineColour = _v; } ); // HtmlView linking property 'LineColor' for element 'interactPrompt22'
          _view.interactPrompt22.linkProperty("X",  function() { return OUT2energyX; }, function(_v) { OUT2energyX = _v; } ); // HtmlView linking property 'X' for element 'interactPrompt22'
          _view.interactPrompt22.linkProperty("Y",  function() { return OUT2energyY; }, function(_v) { OUT2energyY = _v; } ); // HtmlView linking property 'Y' for element 'interactPrompt22'
          _view.interactPrompt22.linkProperty("Visibility",  function() { return OUT2interact; }, function(_v) { OUT2interact = _v; } ); // HtmlView linking property 'Visibility' for element 'interactPrompt22'
          _view.interactPrompt22.linkProperty("SizeY",  function() { return EtransOUT2 + 0.1; } ); // HtmlView linking property 'SizeY' for element 'interactPrompt22'
          _view.energyOUT22.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  EtransOUT2 = Math.round(EtransOUT2);
  //EtransOUT2 = Math.round(_info.point[0]);

}); // HtmlView setting action 'OnRelease' for element 'energyOUT22'
          _view.energyOUT22.linkProperty("FillColor",  function() { return energyColour; }, function(_v) { energyColour = _v; } ); // HtmlView linking property 'FillColor' for element 'energyOUT22'
          _view.energyOUT22.setAction("OnExit", function(_data,_info) {
  OUT2interact = false;

}); // HtmlView setting action 'OnExit' for element 'energyOUT22'
          _view.energyOUT22.linkProperty("SizeX",  function() { return energyWidth; }, function(_v) { energyWidth = _v; } ); // HtmlView linking property 'SizeX' for element 'energyOUT22'
          _view.energyOUT22.linkProperty("X",  function() { return OUT2energyX; }, function(_v) { OUT2energyX = _v; } ); // HtmlView linking property 'X' for element 'energyOUT22'
          _view.energyOUT22.setAction("OnEnter", function(_data,_info) {
  OUT2interact = true;

}); // HtmlView setting action 'OnEnter' for element 'energyOUT22'
          _view.energyOUT22.linkProperty("Y",  function() { return OUT2energyY; }, function(_v) { OUT2energyY = _v; } ); // HtmlView linking property 'Y' for element 'energyOUT22'
          _view.energyOUT22.linkProperty("SizeY",  function() { return EtransOUT2; }, function(_v) { EtransOUT2 = _v; } ); // HtmlView linking property 'SizeY' for element 'energyOUT22'
          _view.out_text2.linkProperty("X",  function() { return OUT2textX; }, function(_v) { OUT2textX = _v; } ); // HtmlView linking property 'X' for element 'out_text2'
          _view.out_text2.linkProperty("Y",  function() { return OUT2textY; }, function(_v) { OUT2textY = _v; } ); // HtmlView linking property 'Y' for element 'out_text2'
          _view.out_text2.linkProperty("Visibility",  function() { return check4b; }, function(_v) { check4b = _v; } ); // HtmlView linking property 'Visibility' for element 'out_text2'
          _view.amtOUT2.linkProperty("X",  function() { return OUT2energyX; }, function(_v) { OUT2energyX = _v; } ); // HtmlView linking property 'X' for element 'amtOUT2'
          _view.amtOUT2.linkProperty("Y",  function() { return OUT2energyY + EtransOUT2+0.2; } ); // HtmlView linking property 'Y' for element 'amtOUT2'
          _view.amtOUT2.linkProperty("Text",  function() { return Math.round(EtransOUT2); }, function(_v) { Math.round(EtransOUT2) = _v; } ); // HtmlView linking property 'Text' for element 'amtOUT2'
          _view.amtOUT2.linkProperty("Visibility",  function() { return check4b; }, function(_v) { check4b = _v; } ); // HtmlView linking property 'Visibility' for element 'amtOUT2'
          _view.iconOUTamt2.linkProperty("NumberOfElements",  function() { return Math.round(EtransOUT2); } ); // HtmlView linking property 'NumberOfElements' for element 'iconOUTamt2'
          _view.iconOUTamt2.linkProperty("SizeX",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeX' for element 'iconOUTamt2'
          _view.iconOUTamt2.linkProperty("X",  function() { return OUT2energyX; }, function(_v) { OUT2energyX = _v; } ); // HtmlView linking property 'X' for element 'iconOUTamt2'
          _view.iconOUTamt2.linkProperty("ImageUrl",  function() { return imgOUT2[updateTransOUT2]; }, function(_v) { imgOUT2[updateTransOUT2] = _v; } ); // HtmlView linking property 'ImageUrl' for element 'iconOUTamt2'
          _view.iconOUTamt2.linkProperty("Y",  function() { return numberedLstFromX(EtransOUT2,OUT2energyY); } ); // HtmlView linking property 'Y' for element 'iconOUTamt2'
          _view.iconOUTamt2.linkProperty("Visibility",  function() { return EtransOUT2>0; } ); // HtmlView linking property 'Visibility' for element 'iconOUTamt2'
          _view.iconOUTamt2.linkProperty("SizeY",  function() { return imgIconSIZE; }, function(_v) { imgIconSIZE = _v; } ); // HtmlView linking property 'SizeY' for element 'iconOUTamt2'
          _view.drag6Helper.linkProperty("Y",  function() { return OUT2energyY; }, function(_v) { OUT2energyY = _v; } ); // HtmlView linking property 'Y' for element 'drag6Helper'
          _view.dragTout2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragTout2'
          _view.dragTout2.setAction("OnExit", function(_data,_info) {
  OUT2interact = false;

}); // HtmlView setting action 'OnExit' for element 'dragTout2'
          _view.dragTout2.setAction("OnDrag", function(_data,_info) {
  OUT2interact = true;

}); // HtmlView setting action 'OnDrag' for element 'dragTout2'
          _view.dragTout2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
    //EtransOUT2 = Math.round(EtransOUT2);  // → restrict movements in Ipad Pro
    EtransOUT2 = Math.round(dragEtransOUT2);
    OUT2interact = false;

}); // HtmlView setting action 'OnRelease' for element 'dragTout2'
          _view.dragTout2.linkProperty("X",  function() { return OUT2energyX; }, function(_v) { OUT2energyX = _v; } ); // HtmlView linking property 'X' for element 'dragTout2'
          _view.dragTout2.setAction("OnEnter", function(_data,_info) {
  OUT2interact = true;

}); // HtmlView setting action 'OnEnter' for element 'dragTout2'
          _view.dragTout2.linkProperty("Y",  function() { return dragEtransOUT2; }, function(_v) { dragEtransOUT2 = _v; } ); // HtmlView linking property 'Y' for element 'dragTout2'
          _view.dragTout2.linkProperty("Visibility",  function() { return check4b; }, function(_v) { check4b = _v; } ); // HtmlView linking property 'Visibility' for element 'dragTout2'
          _view.dragTout2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragTout2'
          _view.answer.linkProperty("FillColor",  function() { return answerColour[updateAnswer]; }, function(_v) { answerColour[updateAnswer] = _v; } ); // HtmlView linking property 'FillColor' for element 'answer'
          _view.answer.linkProperty("Y",  function() { return answerY; }, function(_v) { answerY = _v; } ); // HtmlView linking property 'Y' for element 'answer'
          _view.answer.linkProperty("Text",  function() { return answer[updateAnswer]; }, function(_v) { answer[updateAnswer] = _v; } ); // HtmlView linking property 'Text' for element 'answer'
          _view.answer.linkProperty("Visibility",  function() { return showAnswer; }, function(_v) { showAnswer = _v; } ); // HtmlView linking property 'Visibility' for element 'answer'
          _view.answerHint.linkProperty("Y",  function() { return hintY; }, function(_v) { hintY = _v; } ); // HtmlView linking property 'Y' for element 'answerHint'
          _view.answerHint.linkProperty("Text",  function() { return hint; }, function(_v) { hint = _v; } ); // HtmlView linking property 'Text' for element 'answerHint'
          _view.L2.linkProperty("TitleYFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'TitleYFont' for element 'L2'
          _view.L2.linkProperty("TitleXFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'TitleXFont' for element 'L2'
          _view.L2.linkProperty("TitleFont",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'TitleFont' for element 'L2'
          _view.interactPROMPT2.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'interactPROMPT2'
          _view.interactPROMPT2.linkProperty("LineColor",  function() { return promptLineColour; }, function(_v) { promptLineColour = _v; } ); // HtmlView linking property 'LineColor' for element 'interactPROMPT2'
          _view.interactPROMPT2.linkProperty("Visibility",  function() { return interactPrompt2; }, function(_v) { interactPrompt2 = _v; } ); // HtmlView linking property 'Visibility' for element 'interactPROMPT2'
          _view.interactPROMPT2.linkProperty("SizeY",  function() { return finTotalEnergy; }, function(_v) { finTotalEnergy = _v; } ); // HtmlView linking property 'SizeY' for element 'interactPROMPT2'
          _view.shapeSet2.linkProperty("FillColor",  function() { return energyColour; }, function(_v) { energyColour = _v; } ); // HtmlView linking property 'FillColor' for element 'shapeSet2'
          _view.shapeSet2.setAction("OnExit", function(_data,_info) {
  interactPrompt2[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("ElementInteracted",  function() { return elementInteracted; }, function(_v) { elementInteracted = _v; } ); // HtmlView linking property 'ElementInteracted' for element 'shapeSet2'
          _view.shapeSet2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  for (let i=0; i< finTotalEnergy.length; i++){
    finTotalEnergy[i] = Math.round(finTotalEnergy[i]);
    }

}); // HtmlView setting action 'OnRelease' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'shapeSet2'
          _view.shapeSet2.setAction("OnEnter", function(_data,_info) {
  //interactPrompt = true;
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt2, elementInteracted);

}); // HtmlView setting action 'OnEnter' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("Visibility",  function() { return [displayChemical, displayElastic, displayGravitational, displayInternal, displayKinetic, displayNuclear]; } ); // HtmlView linking property 'Visibility' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("SizeY",  function() { return finTotalEnergy; }, function(_v) { finTotalEnergy = _v; } ); // HtmlView linking property 'SizeY' for element 'shapeSet2'
          _view.xlabel2.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'xlabel2'
          _view.xlabel2.linkProperty("Text",  function() { return ["C","E","G","I","K","N"]; } ); // HtmlView linking property 'Text' for element 'xlabel2'
          _view.xlabel2.linkProperty("Visibility",  function() { return [displayChemical, displayElastic, displayGravitational, displayInternal, displayKinetic, displayNuclear]; } ); // HtmlView linking property 'Visibility' for element 'xlabel2'
          _view.amt2.linkProperty("X",  function() { return energyXpos; }, function(_v) { energyXpos = _v; } ); // HtmlView linking property 'X' for element 'amt2'
          _view.amt2.linkProperty("Y",  function() { return finTotalEnergy; }, function(_v) { finTotalEnergy = _v; } ); // HtmlView linking property 'Y' for element 'amt2'
          _view.amt2.linkProperty("Text",  function() { return roundTheLst(finTotalEnergy); }, function(_v) { roundTheLst(finTotalEnergy) = _v; } ); // HtmlView linking property 'Text' for element 'amt2'
          _view.amt2.linkProperty("Visibility",  function() { return [displayChemical, displayElastic, displayGravitational, displayInternal, displayKinetic, displayNuclear]; } ); // HtmlView linking property 'Visibility' for element 'amt2'
          _view.images2D.linkProperty("Visibility",  function() { return show2D; }, function(_v) { show2D = _v; } ); // HtmlView linking property 'Visibility' for element 'images2D'
          _view.chemical2.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[0]); } ); // HtmlView linking property 'NumberOfElements' for element 'chemical2'
          _view.chemical2.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'chemical2'
          _view.chemical2.linkProperty("X",  function() { return energyXpos[0]; } ); // HtmlView linking property 'X' for element 'chemical2'
          _view.chemical2.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[0] ); } ); // HtmlView linking property 'Y' for element 'chemical2'
          _view.chemical2.linkProperty("Visibility",  function() { return finTotalEnergy[0]>0; } ); // HtmlView linking property 'Visibility' for element 'chemical2'
          _view.chemical2.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'chemical2'
          _view.elastic2.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[1]); } ); // HtmlView linking property 'NumberOfElements' for element 'elastic2'
          _view.elastic2.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'elastic2'
          _view.elastic2.linkProperty("X",  function() { return energyXpos[1]; } ); // HtmlView linking property 'X' for element 'elastic2'
          _view.elastic2.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[1] ); } ); // HtmlView linking property 'Y' for element 'elastic2'
          _view.elastic2.linkProperty("Visibility",  function() { return finTotalEnergy[1]>0; } ); // HtmlView linking property 'Visibility' for element 'elastic2'
          _view.elastic2.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'elastic2'
          _view.gravity2.linkProperty("NumberOfElements",  function() { return Math.abs(Math.round(finTotalEnergy[2])); } ); // HtmlView linking property 'NumberOfElements' for element 'gravity2'
          _view.gravity2.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'gravity2'
          _view.gravity2.linkProperty("X",  function() { return energyXpos[2]; } ); // HtmlView linking property 'X' for element 'gravity2'
          _view.gravity2.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[2] ); } ); // HtmlView linking property 'Y' for element 'gravity2'
          _view.gravity2.linkProperty("Visibility",  function() { return Math.abs(finTotalEnergy[2])>0; } ); // HtmlView linking property 'Visibility' for element 'gravity2'
          _view.gravity2.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'gravity2'
          _view.internal2.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[3]); } ); // HtmlView linking property 'NumberOfElements' for element 'internal2'
          _view.internal2.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'internal2'
          _view.internal2.linkProperty("X",  function() { return energyXpos[3]; } ); // HtmlView linking property 'X' for element 'internal2'
          _view.internal2.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[3] ); } ); // HtmlView linking property 'Y' for element 'internal2'
          _view.internal2.linkProperty("Visibility",  function() { return finTotalEnergy[3]>0; } ); // HtmlView linking property 'Visibility' for element 'internal2'
          _view.internal2.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'internal2'
          _view.kinetic2.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[4]); } ); // HtmlView linking property 'NumberOfElements' for element 'kinetic2'
          _view.kinetic2.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'kinetic2'
          _view.kinetic2.linkProperty("X",  function() { return energyXpos[4]; } ); // HtmlView linking property 'X' for element 'kinetic2'
          _view.kinetic2.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[4] ); } ); // HtmlView linking property 'Y' for element 'kinetic2'
          _view.kinetic2.linkProperty("Visibility",  function() { return finTotalEnergy[4]>0; } ); // HtmlView linking property 'Visibility' for element 'kinetic2'
          _view.kinetic2.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'kinetic2'
          _view.nuclear2.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[5]); } ); // HtmlView linking property 'NumberOfElements' for element 'nuclear2'
          _view.nuclear2.linkProperty("SizeX",  function() { return size2DX; }, function(_v) { size2DX = _v; } ); // HtmlView linking property 'SizeX' for element 'nuclear2'
          _view.nuclear2.linkProperty("X",  function() { return energyXpos[5]; } ); // HtmlView linking property 'X' for element 'nuclear2'
          _view.nuclear2.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[5] ); } ); // HtmlView linking property 'Y' for element 'nuclear2'
          _view.nuclear2.linkProperty("Visibility",  function() { return finTotalEnergy[5]>0; } ); // HtmlView linking property 'Visibility' for element 'nuclear2'
          _view.nuclear2.linkProperty("SizeY",  function() { return size2DY; }, function(_v) { size2DY = _v; } ); // HtmlView linking property 'SizeY' for element 'nuclear2'
          _view.images3D2.linkProperty("Visibility",  function() { return show3D; }, function(_v) { show3D = _v; } ); // HtmlView linking property 'Visibility' for element 'images3D2'
          _view.chemical22.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[0]); } ); // HtmlView linking property 'NumberOfElements' for element 'chemical22'
          _view.chemical22.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'chemical22'
          _view.chemical22.linkProperty("X",  function() { return energyXpos[0]; } ); // HtmlView linking property 'X' for element 'chemical22'
          _view.chemical22.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[0] ); } ); // HtmlView linking property 'Y' for element 'chemical22'
          _view.chemical22.linkProperty("Visibility",  function() { return finTotalEnergy[0]>0; } ); // HtmlView linking property 'Visibility' for element 'chemical22'
          _view.chemical22.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'chemical22'
          _view.elastic22.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[1]); } ); // HtmlView linking property 'NumberOfElements' for element 'elastic22'
          _view.elastic22.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'elastic22'
          _view.elastic22.linkProperty("X",  function() { return energyXpos[1]; } ); // HtmlView linking property 'X' for element 'elastic22'
          _view.elastic22.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[1] ); } ); // HtmlView linking property 'Y' for element 'elastic22'
          _view.elastic22.linkProperty("Visibility",  function() { return finTotalEnergy[1]>0; } ); // HtmlView linking property 'Visibility' for element 'elastic22'
          _view.elastic22.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'elastic22'
          _view.gravity22.linkProperty("NumberOfElements",  function() { return Math.abs(Math.round(finTotalEnergy[2])); } ); // HtmlView linking property 'NumberOfElements' for element 'gravity22'
          _view.gravity22.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'gravity22'
          _view.gravity22.linkProperty("X",  function() { return energyXpos[2]; } ); // HtmlView linking property 'X' for element 'gravity22'
          _view.gravity22.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[2] ); } ); // HtmlView linking property 'Y' for element 'gravity22'
          _view.gravity22.linkProperty("Visibility",  function() { return Math.abs(finTotalEnergy[2])>0; } ); // HtmlView linking property 'Visibility' for element 'gravity22'
          _view.gravity22.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'gravity22'
          _view.internal22.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[3]); } ); // HtmlView linking property 'NumberOfElements' for element 'internal22'
          _view.internal22.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'internal22'
          _view.internal22.linkProperty("X",  function() { return energyXpos[3]; } ); // HtmlView linking property 'X' for element 'internal22'
          _view.internal22.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[3] ); } ); // HtmlView linking property 'Y' for element 'internal22'
          _view.internal22.linkProperty("Visibility",  function() { return finTotalEnergy[3]>0; } ); // HtmlView linking property 'Visibility' for element 'internal22'
          _view.internal22.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'internal22'
          _view.kinetic22.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[4]); } ); // HtmlView linking property 'NumberOfElements' for element 'kinetic22'
          _view.kinetic22.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'kinetic22'
          _view.kinetic22.linkProperty("X",  function() { return energyXpos[4]; } ); // HtmlView linking property 'X' for element 'kinetic22'
          _view.kinetic22.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[4] ); } ); // HtmlView linking property 'Y' for element 'kinetic22'
          _view.kinetic22.linkProperty("Visibility",  function() { return finTotalEnergy[4]>0; } ); // HtmlView linking property 'Visibility' for element 'kinetic22'
          _view.kinetic22.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'kinetic22'
          _view.nuclear22.linkProperty("NumberOfElements",  function() { return Math.round(finTotalEnergy[5]); } ); // HtmlView linking property 'NumberOfElements' for element 'nuclear22'
          _view.nuclear22.linkProperty("SizeX",  function() { return size3DX; }, function(_v) { size3DX = _v; } ); // HtmlView linking property 'SizeX' for element 'nuclear22'
          _view.nuclear22.linkProperty("X",  function() { return energyXpos[5]; } ); // HtmlView linking property 'X' for element 'nuclear22'
          _view.nuclear22.linkProperty("Y",  function() { return numberedLst( finTotalEnergy[5] ); } ); // HtmlView linking property 'Y' for element 'nuclear22'
          _view.nuclear22.linkProperty("Visibility",  function() { return finTotalEnergy[5]>0; } ); // HtmlView linking property 'Visibility' for element 'nuclear22'
          _view.nuclear22.linkProperty("SizeY",  function() { return size3DY; }, function(_v) { size3DY = _v; } ); // HtmlView linking property 'SizeY' for element 'nuclear22'
          _view.dragC2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragC2'
          _view.dragC2.setAction("OnExit", function(_data,_info) {
  elementInteracted = 0 
  interactPrompt2[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragC2'
          _view.dragC2.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 0 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt2, elementInteracted);
  // finTotalEnergy[elementInteracted] = Math.round(dragC2Y);

}); // HtmlView setting action 'OnDrag' for element 'dragC2'
          _view.dragC2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 0 
    finTotalEnergy[elementInteracted] = Math.round(dragC2Y);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragC2'
          _view.dragC2.linkProperty("X",  function() { return energyXpos[0]; } ); // HtmlView linking property 'X' for element 'dragC2'
          _view.dragC2.linkProperty("Y",  function() { return dragC2Y; }, function(_v) { dragC2Y = _v; } ); // HtmlView linking property 'Y' for element 'dragC2'
          _view.dragC2.linkProperty("Visibility",  function() { return displayChemical; }, function(_v) { displayChemical = _v; } ); // HtmlView linking property 'Visibility' for element 'dragC2'
          _view.dragC2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragC2'
          _view.dragE2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragE2'
          _view.dragE2.setAction("OnExit", function(_data,_info) {
  elementInteracted = 1
  interactPrompt2[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragE2'
          _view.dragE2.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  elementInteracted = 1 
  oneTrueLst(interactPrompt2, elementInteracted);
   //finTotalEnergy[elementInteracted] = Math.round(dragE2Y);

}); // HtmlView setting action 'OnDrag' for element 'dragE2'
          _view.dragE2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 1 
    finTotalEnergy[elementInteracted] = Math.round(dragE2Y);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragE2'
          _view.dragE2.linkProperty("X",  function() { return energyXpos[1]; } ); // HtmlView linking property 'X' for element 'dragE2'
          _view.dragE2.linkProperty("Y",  function() { return dragE2Y; }, function(_v) { dragE2Y = _v; } ); // HtmlView linking property 'Y' for element 'dragE2'
          _view.dragE2.linkProperty("Visibility",  function() { return displayElastic; }, function(_v) { displayElastic = _v; } ); // HtmlView linking property 'Visibility' for element 'dragE2'
          _view.dragE2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragE2'
          _view.dragG2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragG2'
          _view.dragG2.setAction("OnExit", function(_data,_info) {
  elementInteracted = 2
  interactPrompt2[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragG2'
          _view.dragG2.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  elementInteracted = 2 
  oneTrueLst(interactPrompt2, elementInteracted);
  // finTotalEnergy[elementInteracted] = Math.round(dragG2Y);

}); // HtmlView setting action 'OnDrag' for element 'dragG2'
          _view.dragG2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 2
    finTotalEnergy[elementInteracted] = Math.round(dragG2Y);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragG2'
          _view.dragG2.linkProperty("X",  function() { return energyXpos[2]; } ); // HtmlView linking property 'X' for element 'dragG2'
          _view.dragG2.linkProperty("Y",  function() { return dragG2Y; }, function(_v) { dragG2Y = _v; } ); // HtmlView linking property 'Y' for element 'dragG2'
          _view.dragG2.linkProperty("Visibility",  function() { return displayGravitational; }, function(_v) { displayGravitational = _v; } ); // HtmlView linking property 'Visibility' for element 'dragG2'
          _view.dragG2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragG2'
          _view.dragI2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragI2'
          _view.dragI2.setAction("OnExit", function(_data,_info) {
  elementInteracted = 3 
  interactPrompt2[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragI2'
          _view.dragI2.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 3 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt2, elementInteracted);
   //finTotalEnergy[elementInteracted] = Math.round(dragI2Y);

}); // HtmlView setting action 'OnDrag' for element 'dragI2'
          _view.dragI2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 3 
    finTotalEnergy[elementInteracted] = Math.round(dragI2Y);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragI2'
          _view.dragI2.linkProperty("X",  function() { return energyXpos[3]; } ); // HtmlView linking property 'X' for element 'dragI2'
          _view.dragI2.linkProperty("Y",  function() { return dragI2Y; }, function(_v) { dragI2Y = _v; } ); // HtmlView linking property 'Y' for element 'dragI2'
          _view.dragI2.linkProperty("Visibility",  function() { return displayInternal; }, function(_v) { displayInternal = _v; } ); // HtmlView linking property 'Visibility' for element 'dragI2'
          _view.dragI2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragI2'
          _view.dragK2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragK2'
          _view.dragK2.setAction("OnExit", function(_data,_info) {
  elementInteracted = 4 
  interactPrompt2[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragK2'
          _view.dragK2.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 4 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt2, elementInteracted);
  // finTotalEnergy[elementInteracted] = Math.round(dragK2Y);

}); // HtmlView setting action 'OnDrag' for element 'dragK2'
          _view.dragK2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 4 
    finTotalEnergy[elementInteracted] = Math.round(dragK2Y);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragK2'
          _view.dragK2.linkProperty("X",  function() { return energyXpos[4]; } ); // HtmlView linking property 'X' for element 'dragK2'
          _view.dragK2.linkProperty("Y",  function() { return dragK2Y; }, function(_v) { dragK2Y = _v; } ); // HtmlView linking property 'Y' for element 'dragK2'
          _view.dragK2.linkProperty("Visibility",  function() { return displayKinetic; }, function(_v) { displayKinetic = _v; } ); // HtmlView linking property 'Visibility' for element 'dragK2'
          _view.dragK2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragK2'
          _view.dragN2.linkProperty("FillColor",  function() { return fillColorforDrag; }, function(_v) { fillColorforDrag = _v; } ); // HtmlView linking property 'FillColor' for element 'dragN2'
          _view.dragN2.setAction("OnExit", function(_data,_info) {
  elementInteracted = 5 
  interactPrompt2[elementInteracted] = false;

}); // HtmlView setting action 'OnExit' for element 'dragN2'
          _view.dragN2.setAction("OnDrag", function(_data,_info) {
  //interactPrompt[elementInteracted]= true;
  elementInteracted = 5 
  // Fixed bug on element remaining true when moved to another part of the same ShapeSet: //
  oneTrueLst(interactPrompt2, elementInteracted);
  // finTotalEnergy[elementInteracted] = Math.round(dragN2Y);

}); // HtmlView setting action 'OnDrag' for element 'dragN2'
          _view.dragN2.setAction("OnRelease", function(_data,_info) {
  // Restrict numbers to integers //
  //for (let i=0; i< iniTotalEnergy.length; i++){
    elementInteracted = 5 
    finTotalEnergy[elementInteracted] = Math.round(dragN2Y);
    //}

}); // HtmlView setting action 'OnRelease' for element 'dragN2'
          _view.dragN2.linkProperty("X",  function() { return energyXpos[5]; } ); // HtmlView linking property 'X' for element 'dragN2'
          _view.dragN2.linkProperty("Y",  function() { return dragN2Y; }, function(_v) { dragN2Y = _v; } ); // HtmlView linking property 'Y' for element 'dragN2'
          _view.dragN2.linkProperty("Visibility",  function() { return displayNuclear; }, function(_v) { displayNuclear = _v; } ); // HtmlView linking property 'Visibility' for element 'dragN2'
          _view.dragN2.linkProperty("SizeY",  function() { return dragSizeY; }, function(_v) { dragSizeY = _v; } ); // HtmlView linking property 'SizeY' for element 'dragN2'
          _view.descriptions.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView linking property 'Font' for element 'descriptions'
          _view.formula.linkProperty("CSS",  function() { return {   "display": "inline-block",   "padding": "10px", }; } ); // HtmlView linking property 'CSS' for element 'formula'
          _view.formulaText.linkProperty("Text",  function() { return formulaText; }, function(_v) { formulaText = _v; } ); // HtmlView linking property 'Text' for element 'formulaText'
          _view.legendText.linkProperty("Text",  function() { return legendText; }, function(_v) { legendText = _v; } ); // HtmlView linking property 'Text' for element 'legendText'
          _view.label.linkProperty("Width",  function() { return physicsonly?"15%":"10%"; } ); // HtmlView linking property 'Width' for element 'label'
          _view.waves.linkProperty("Width",  function() { return physicsonly?"25%":"20%"; } ); // HtmlView linking property 'Width' for element 'waves'
          _view.waves.linkProperty("Tooltip",  function() { return pTooltip; }, function(_v) { pTooltip = _v; } ); // HtmlView linking property 'Tooltip' for element 'waves'
          _view.mechanic.linkProperty("Width",  function() { return physicsonly?"20%":"15%"; } ); // HtmlView linking property 'Width' for element 'mechanic'
          _view.mechanic.linkProperty("Tooltip",  function() { return mTooltip; }, function(_v) { mTooltip = _v; } ); // HtmlView linking property 'Tooltip' for element 'mechanic'
          _view.fire.linkProperty("Width",  function() { return physicsonly?"20%":"15%"; } ); // HtmlView linking property 'Width' for element 'fire'
          _view.fire.linkProperty("Tooltip",  function() { return hTooltip; }, function(_v) { hTooltip = _v; } ); // HtmlView linking property 'Tooltip' for element 'fire'
          _view.electric.linkProperty("Width",  function() { return physicsonly?"20%":"15%"; } ); // HtmlView linking property 'Width' for element 'electric'
          _view.electric.linkProperty("Tooltip",  function() { return eTooltip; }, function(_v) { eTooltip = _v; } ); // HtmlView linking property 'Tooltip' for element 'electric'
          _view.chemically.linkProperty("Display",  function() { return physicsonly?"none":"inline-block"; } ); // HtmlView linking property 'Display' for element 'chemically'
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
function LOLMasterTemplateV8_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = LOLMasterTemplateV8_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function LOLMasterTemplateV8_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView: declaration of element 'fullscreen'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'fullscreen'
      .setProperty("Display","inlne-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'fullscreen'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"answersTOEDIT", _view.fullscreen) // EJsS HtmlView.HtmlView: declaration of element 'answersTOEDIT'
      .setProperty("Width","25%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'answersTOEDIT'
      .setProperty("CSS",{   "padding": "5px", "vertical-align": "top" }) // EJsS HtmlView.HtmlView: setting property 'CSS' for element 'answersTOEDIT'
      .setProperty("Tooltip","change all the text in Grey color on the Master Template and click Download the Simulation") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'answersTOEDIT'
      .setProperty("BorderColor","Black") // EJsS HtmlView.HtmlView: setting property 'BorderColor' for element 'answersTOEDIT'
      .setProperty("Html","<p><b> Checks </b> </p>") // EJsS HtmlView.HtmlView: setting property 'Html' for element 'answersTOEDIT'
      .setProperty("BorderWidth",2) // EJsS HtmlView.HtmlView: setting property 'BorderWidth' for element 'answersTOEDIT'
      ;

    _view._addElement(EJSS_INTERFACE.fileUpload,"fileUpload", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'fileUpload'
      .setProperty("Tooltip","you can find this file in the EJS model") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'fileUpload'
      .setProperty("Text","records.json FileUpload") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'fileUpload'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check1", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check1'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check1words", _view.check1) // EJsS HtmlView.HtmlView: declaration of element 'check1words'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'check1words'
      .setProperty("Tooltip","Hide Unnecessary Energy Stores:  Identify any energy forms that are not relevant or do not contribute significantly to the understanding of the context. Ensure these irrelevant energy forms or stores are not displayed to avoid confusion or clutter.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check1words'
      .setProperty("Text","Check 1) What energy stores to show? Hide unnecessary stores") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check1words'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel22", _view.check1) // EJsS HtmlView.HtmlView: declaration of element 'panel22'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"displayChemical", _view.panel22) // EJsS HtmlView.HtmlView: declaration of element 'displayChemical'
      .setProperty("Text","C") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'displayChemical'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"displayElastic", _view.panel22) // EJsS HtmlView.HtmlView: declaration of element 'displayElastic'
      .setProperty("Text","E") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'displayElastic'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"displayGravitational", _view.panel22) // EJsS HtmlView.HtmlView: declaration of element 'displayGravitational'
      .setProperty("Text","G") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'displayGravitational'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"displayInternal", _view.panel22) // EJsS HtmlView.HtmlView: declaration of element 'displayInternal'
      .setProperty("Text","I") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'displayInternal'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"displayKinetic", _view.panel22) // EJsS HtmlView.HtmlView: declaration of element 'displayKinetic'
      .setProperty("Text","K") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'displayKinetic'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"displayNuclear", _view.panel22) // EJsS HtmlView.HtmlView: declaration of element 'displayNuclear'
      .setProperty("Text","N") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'displayNuclear'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check2", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check2'
      .setProperty("Tooltip","Some energy may be ignored in check 5 and 6 as it does not affect the system.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check2words", _view.check2) // EJsS HtmlView.HtmlView: declaration of element 'check2words'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'check2words'
      .setProperty("Tooltip","Identify which forms of energy can be non-zero, such as gravitational potential energy (GPE)") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check2words'
      .setProperty("Text","Check 2) What energy can be non-zero, like GPE?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check2words'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel2", _view.check2) // EJsS HtmlView.HtmlView: declaration of element 'panel2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"isC", _view.panel2) // EJsS HtmlView.HtmlView: declaration of element 'isC'
      .setProperty("Text","C") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isC'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"isE", _view.panel2) // EJsS HtmlView.HtmlView: declaration of element 'isE'
      .setProperty("Text","E") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isE'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"isG", _view.panel2) // EJsS HtmlView.HtmlView: declaration of element 'isG'
      .setProperty("Text","G") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isG'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"isI", _view.panel2) // EJsS HtmlView.HtmlView: declaration of element 'isI'
      .setProperty("Text","I") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isI'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"isK", _view.panel2) // EJsS HtmlView.HtmlView: declaration of element 'isK'
      .setProperty("Text","K") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isK'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"isN", _view.panel2) // EJsS HtmlView.HtmlView: declaration of element 'isN'
      .setProperty("Text","N") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isN'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check3", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check3'
      .setProperty("Background","rgba(222,222,222,1)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'check3'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check3words", _view.check3) // EJsS HtmlView.HtmlView: declaration of element 'check3words'
      .setProperty("Tooltip","Determine how many types of energy are being transferred in.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check3words'
      .setProperty("Text","Check 3) How many type(s) of energy is/are transferred IN?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check3words'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"zeroIN", _view.check3) // EJsS HtmlView.HtmlView: declaration of element 'zeroIN'
      .setProperty("Text","0") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'zeroIN'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"oneIN", _view.check3) // EJsS HtmlView.HtmlView: declaration of element 'oneIN'
      .setProperty("Text","1") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'oneIN'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"twoIN", _view.check3) // EJsS HtmlView.HtmlView: declaration of element 'twoIN'
      .setProperty("Text","2") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'twoIN'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check3a", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check3a'
      .setProperty("Background","rgba(222,222,222,1)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'check3a'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check3Awords", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'check3Awords'
      .setProperty("Tooltip","Identify which types of energy are being transferred in") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check3Awords'
      .setProperty("Text","Check 3a) What type of energy is transferred in?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check3Awords'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isPropagationIN", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'isPropagationIN'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isMechanicIN", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'isMechanicIN'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isHeatingIN", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'isHeatingIN'
      .setProperty("Text","Heating") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isHeatingIN'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isElectricIN", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'isElectricIN'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isChemicalIN", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'isChemicalIN'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check3Areaonss", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'check3Areaonss'
      .setProperty("Text",", due to ") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check3Areaonss'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"check3Areason", _view.check3a) // EJsS HtmlView.HtmlView: declaration of element 'check3Areason'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'check3Areason'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'check3Areason'
      .setProperty("Tooltip","Reasoning for type of energy being transfered.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check3Areason'
      .setProperty("Display","inline") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'check3Areason'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check3b", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check3b'
      .setProperty("Background","rgba(222,222,222,1)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'check3b'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check3Bwords", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'check3Bwords'
      .setProperty("Text","Check 3b) What type of energy is transferred in?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check3Bwords'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isPropagationIN2", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'isPropagationIN2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isMechanicIN2", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'isMechanicIN2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isHeatingIN2", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'isHeatingIN2'
      .setProperty("Text","Heating") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isHeatingIN2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isElectricIN2", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'isElectricIN2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isChemicalIN2", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'isChemicalIN2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check3Areaonss2", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'check3Areaonss2'
      .setProperty("Text",", due to ") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check3Areaonss2'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"check3Breason", _view.check3b) // EJsS HtmlView.HtmlView: declaration of element 'check3Breason'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'check3Breason'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'check3Breason'
      .setProperty("Tooltip","Reasoning for type of energy being transfered.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check3Breason'
      .setProperty("Display","inline") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'check3Breason'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check4", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check4'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check4words", _view.check4) // EJsS HtmlView.HtmlView: declaration of element 'check4words'
      .setProperty("Tooltip","Determine how many types of energy are being transferred out") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check4words'
      .setProperty("Text","Check 4) How many type(s) of energy is/are transferred OUT?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check4words'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"zeroOUT", _view.check4) // EJsS HtmlView.HtmlView: declaration of element 'zeroOUT'
      .setProperty("Text","0") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'zeroOUT'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"oneOUT", _view.check4) // EJsS HtmlView.HtmlView: declaration of element 'oneOUT'
      .setProperty("Text","1") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'oneOUT'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"twoOUT", _view.check4) // EJsS HtmlView.HtmlView: declaration of element 'twoOUT'
      .setProperty("Text","2") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'twoOUT'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check4a", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check4a'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check4Awords", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'check4Awords'
      .setProperty("Text","Check 4a) What type of energy is transferred out?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check4Awords'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isPropagationOUT", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'isPropagationOUT'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isMechanicOUT", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'isMechanicOUT'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isHeatingOUT", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'isHeatingOUT'
      .setProperty("Text","Heating") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isHeatingOUT'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isElectricOUT", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'isElectricOUT'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isChemicalOUT", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'isChemicalOUT'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check3Areaonss3", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'check3Areaonss3'
      .setProperty("Text",", due to ") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check3Areaonss3'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"check4Areason", _view.check4a) // EJsS HtmlView.HtmlView: declaration of element 'check4Areason'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'check4Areason'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'check4Areason'
      .setProperty("Tooltip","Reasoning for type of energy being transfered.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check4Areason'
      .setProperty("Display","inline") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'check4Areason'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check4b", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check4b'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check4Bwords", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'check4Bwords'
      .setProperty("Text","Check 4b) What type of energy is transferred out?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check4Bwords'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isPropagationOUT2", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'isPropagationOUT2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isMechanicOUT2", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'isMechanicOUT2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isHeatingOUT2", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'isHeatingOUT2'
      .setProperty("Text","Heating") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'isHeatingOUT2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isElectricOUT2", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'isElectricOUT2'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"isChemicalOUT2", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'isChemicalOUT2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check3Areaonss32", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'check3Areaonss32'
      .setProperty("Text",", due to ") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check3Areaonss32'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"check4Breason", _view.check4b) // EJsS HtmlView.HtmlView: declaration of element 'check4Breason'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'check4Breason'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'check4Breason'
      .setProperty("Tooltip","Reasoning for type of energy being transfered.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check4Breason'
      .setProperty("Display","inline") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'check4Breason'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check5", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check5'
      .setProperty("Background","rgba(222,222,222,1)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'check5'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check2words2", _view.check5) // EJsS HtmlView.HtmlView: declaration of element 'check2words2'
      .setProperty("Tooltip","Identify the types of energy present in the initial state.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'check2words2'
      .setProperty("Text","Check 5) What energy(ies) is/are present, ie.>0 in the INITIAL state?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check2words2'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"iniC", _view.check5) // EJsS HtmlView.HtmlView: declaration of element 'iniC'
      .setProperty("Text","C") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'iniC'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"iniE", _view.check5) // EJsS HtmlView.HtmlView: declaration of element 'iniE'
      .setProperty("Text","E") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'iniE'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"iniG", _view.check5) // EJsS HtmlView.HtmlView: declaration of element 'iniG'
      .setProperty("Text","G") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'iniG'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"iniI", _view.check5) // EJsS HtmlView.HtmlView: declaration of element 'iniI'
      .setProperty("Text","I") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'iniI'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"iniK", _view.check5) // EJsS HtmlView.HtmlView: declaration of element 'iniK'
      .setProperty("Text","K") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'iniK'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"iniN", _view.check5) // EJsS HtmlView.HtmlView: declaration of element 'iniN'
      .setProperty("Text","N") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'iniN'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check6", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check6'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check2words22", _view.check6) // EJsS HtmlView.HtmlView: declaration of element 'check2words22'
      .setProperty("Text","Check 6) What energy(ies) is/are present, ie>0 in the FINAL state?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check2words22'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"finC", _view.check6) // EJsS HtmlView.HtmlView: declaration of element 'finC'
      .setProperty("Text","C") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'finC'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"finE", _view.check6) // EJsS HtmlView.HtmlView: declaration of element 'finE'
      .setProperty("Text","E") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'finE'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"finG", _view.check6) // EJsS HtmlView.HtmlView: declaration of element 'finG'
      .setProperty("Text","G") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'finG'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"finI", _view.check6) // EJsS HtmlView.HtmlView: declaration of element 'finI'
      .setProperty("Text","I") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'finI'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"finK", _view.check6) // EJsS HtmlView.HtmlView: declaration of element 'finK'
      .setProperty("Text","K") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'finK'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"finN", _view.check6) // EJsS HtmlView.HtmlView: declaration of element 'finN'
      .setProperty("Text","N") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'finN'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check7_conditions", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'check7_conditions'
      .setProperty("Background","rgba(222,222,222,1)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'check7_conditions'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"check7words", _view.check7_conditions) // EJsS HtmlView.HtmlView: declaration of element 'check7words'
      .setProperty("Text","Check 7) Code other conditions?") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'check7words'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"No", _view.check7_conditions) // EJsS HtmlView.HtmlView: declaration of element 'No'
      .setProperty("Text","No") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'No'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"Yes", _view.check7_conditions) // EJsS HtmlView.HtmlView: declaration of element 'Yes'
      .setProperty("Text","Yes") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'Yes'
      ;

    _view._addElement(EJSS_INTERFACE.button,"runCodeButton", _view.check7_conditions) // EJsS HtmlView.HtmlView: declaration of element 'runCodeButton'
      .setProperty("Tooltip","Please check your code.") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'runCodeButton'
      .setProperty("TextAlign","center") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'runCodeButton'
      .setProperty("Foreground","rgba(0,192,192,1)") // EJsS HtmlView.HtmlView: setting property 'Foreground' for element 'runCodeButton'
      .setProperty("Text","✓ Apply Code") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'runCodeButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"check7a", _view.check7_conditions) // EJsS HtmlView.HtmlView: declaration of element 'check7a'
      ;

    _view._addElement(EJSS_INTERFACE.textArea,"userCode", _view.check7a) // EJsS HtmlView.HtmlView: declaration of element 'userCode'
      .setProperty("Height","30vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'userCode'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'userCode'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"download", _view.answersTOEDIT) // EJsS HtmlView.HtmlView: declaration of element 'download'
      ;

    _view._addElement(EJSS_INTERFACE.button,"downloadButton", _view.download) // EJsS HtmlView.HtmlView: declaration of element 'downloadButton'
      .setProperty("Tooltip","only works on server") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'downloadButton'
      .setProperty("Text","⌊↧⌋ Download the simulation") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'downloadButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"masterPanel", _view.fullscreen) // EJsS HtmlView.HtmlView: declaration of element 'masterPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'masterPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"setting", _view.masterPanel) // EJsS HtmlView.HtmlView: declaration of element 'setting'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'setting'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"Titlepanel2", _view.setting) // EJsS HtmlView.HtmlView: declaration of element 'Titlepanel2'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'Titlepanel2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"MAster", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'MAster'
      .setProperty("Text","Master Template for all LOL diagrams") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'MAster'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"showNone", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'showNone'
      .setProperty("Checked",false) // EJsS HtmlView.HtmlView: setting property 'Checked' for element 'showNone'
      .setProperty("Background","Pink") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'showNone'
      .setProperty("Text","Show Bar") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'showNone'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"show2D", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'show2D'
      .setProperty("Background","Pink") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'show2D'
      .setProperty("Text","Show Squares") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'show2D'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"show3D", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'show3D'
      .setProperty("Background","Pink") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'show3D'
      .setProperty("Text","Show Cubes") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'show3D'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"title", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'title'
      .setProperty("Width","50%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'title'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'title'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"scenarios", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'scenarios'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'scenarios'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"showAnswer", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'showAnswer'
      .setProperty("Checked",true) // EJsS HtmlView.HtmlView: setting property 'Checked' for element 'showAnswer'
      .setProperty("Background","Pink") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'showAnswer'
      .setProperty("Text","Show Answer") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'showAnswer'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'showAnswer'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"EditAnswer", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'EditAnswer'
      .setProperty("TextOn","✎ Edit Answer Key") // EJsS HtmlView.HtmlView: setting property 'TextOn' for element 'EditAnswer'
      .setProperty("TextOff","✓ Save Edits") // EJsS HtmlView.HtmlView: setting property 'TextOff' for element 'EditAnswer'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'EditAnswer'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"checkBox", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'checkBox'
      ;

    _view._addElement(EJSS_INTERFACE.button,"revealBtn", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'revealBtn'
      .setProperty("Tooltip","Reveal a possible solution") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'revealBtn'
      .setProperty("Text","Reveal 📖") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'revealBtn'
      ;

    _view._addElement(EJSS_INTERFACE.button,"hintButton", _view.Titlepanel2) // EJsS HtmlView.HtmlView: declaration of element 'hintButton'
      .setProperty("Background","Pink") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'hintButton'
      .setProperty("Text","Hint 🔍") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'hintButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"systemWords", _view.setting) // EJsS HtmlView.HtmlView: declaration of element 'systemWords'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'systemWords'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'systemWords'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"system_panel", _view.systemWords) // EJsS HtmlView.HtmlView: declaration of element 'system_panel'
      .setProperty("Width","45%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'system_panel'
      .setProperty("CSS",{"float": "left"}) // EJsS HtmlView.HtmlView: setting property 'CSS' for element 'system_panel'
      .setProperty("BorderColor","rgba(225,0,0,0.5)") // EJsS HtmlView.HtmlView: setting property 'BorderColor' for element 'system_panel'
      .setProperty("BorderWidth",2) // EJsS HtmlView.HtmlView: setting property 'BorderWidth' for element 'system_panel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'system_panel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"systemBolded", _view.system_panel) // EJsS HtmlView.HtmlView: declaration of element 'systemBolded'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'systemBolded'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'systemBolded'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"system2", _view.system_panel) // EJsS HtmlView.HtmlView: declaration of element 'system2'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'system2'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"system_textField", _view.system_panel) // EJsS HtmlView.HtmlView: declaration of element 'system_textField'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'system_textField'
      .setProperty("Width","70%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'system_textField'
      .setProperty("Tooltip","System") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'system_textField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"remarks_panel", _view.systemWords) // EJsS HtmlView.HtmlView: declaration of element 'remarks_panel'
      .setProperty("Width","45%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'remarks_panel'
      .setProperty("CSS",{"float": "left"}) // EJsS HtmlView.HtmlView: setting property 'CSS' for element 'remarks_panel'
      .setProperty("BorderColor","rgba(225,0,0,0.5)") // EJsS HtmlView.HtmlView: setting property 'BorderColor' for element 'remarks_panel'
      .setProperty("BorderWidth",2) // EJsS HtmlView.HtmlView: setting property 'BorderWidth' for element 'remarks_panel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'remarks_panel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"remarks", _view.remarks_panel) // EJsS HtmlView.HtmlView: declaration of element 'remarks'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'remarks'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'remarks'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"finalState22", _view.remarks_panel) // EJsS HtmlView.HtmlView: declaration of element 'finalState22'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'finalState22'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"remarks_textField", _view.remarks_panel) // EJsS HtmlView.HtmlView: declaration of element 'remarks_textField'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'remarks_textField'
      .setProperty("Width","70%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'remarks_textField'
      .setProperty("Tooltip","Remarks") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'remarks_textField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"stateWords", _view.setting) // EJsS HtmlView.HtmlView: declaration of element 'stateWords'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'stateWords'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'stateWords'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"initialState_panel", _view.stateWords) // EJsS HtmlView.HtmlView: declaration of element 'initialState_panel'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'initialState_panel'
      .setProperty("BorderColor","rgba(225,0,0,0.5)") // EJsS HtmlView.HtmlView: setting property 'BorderColor' for element 'initialState_panel'
      .setProperty("BorderWidth",2) // EJsS HtmlView.HtmlView: setting property 'BorderWidth' for element 'initialState_panel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'initialState_panel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"initialState", _view.initialState_panel) // EJsS HtmlView.HtmlView: declaration of element 'initialState'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'initialState'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'initialState'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"initialState2", _view.initialState_panel) // EJsS HtmlView.HtmlView: declaration of element 'initialState2'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'initialState2'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"initialState_textField", _view.initialState_panel) // EJsS HtmlView.HtmlView: declaration of element 'initialState_textField'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'initialState_textField'
      .setProperty("Width","80%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'initialState_textField'
      .setProperty("Tooltip","Initial State") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'initialState_textField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"finalState_panel", _view.stateWords) // EJsS HtmlView.HtmlView: declaration of element 'finalState_panel'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'finalState_panel'
      .setProperty("BorderColor","rgba(225,0,0,0.5)") // EJsS HtmlView.HtmlView: setting property 'BorderColor' for element 'finalState_panel'
      .setProperty("BorderWidth",2) // EJsS HtmlView.HtmlView: setting property 'BorderWidth' for element 'finalState_panel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'finalState_panel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"finalState", _view.finalState_panel) // EJsS HtmlView.HtmlView: declaration of element 'finalState'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'finalState'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'finalState'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"finalState2", _view.finalState_panel) // EJsS HtmlView.HtmlView: declaration of element 'finalState2'
      .setProperty("TextAlign","left") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'finalState2'
      ;

    _view._addElement(EJSS_INTERFACE.textField,"finalState_textField", _view.finalState_panel) // EJsS HtmlView.HtmlView: declaration of element 'finalState_textField'
      .setProperty("Height","2vh") // EJsS HtmlView.HtmlView: setting property 'Height' for element 'finalState_textField'
      .setProperty("Width","80%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'finalState_textField'
      .setProperty("Tooltip","Final State") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'finalState_textField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"energyTransferONE", _view.setting) // EJsS HtmlView.HtmlView: declaration of element 'energyTransferONE'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'energyTransferONE'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'energyTransferONE'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"IN", _view.energyTransferONE) // EJsS HtmlView.HtmlView: declaration of element 'IN'
      .setProperty("Background","rgba(0,150,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'IN'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"energyIN", _view.IN) // EJsS HtmlView.HtmlView: declaration of element 'energyIN'
      .setProperty("Text","<b>Energy Transfer In: </b>") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'energyIN'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"energyTypeIN", _view.IN) // EJsS HtmlView.HtmlView: declaration of element 'energyTypeIN'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field", _view.IN) // EJsS HtmlView.HtmlView: declaration of element 'field'
      .setProperty("Width","3vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'field'
      .setProperty("Format","1") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'field'
      .setProperty("Tooltip","EtransIN") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'field'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"OUT", _view.energyTransferONE) // EJsS HtmlView.HtmlView: declaration of element 'OUT'
      .setProperty("Background","rgba(0,150,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'OUT'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"energyOUT", _view.OUT) // EJsS HtmlView.HtmlView: declaration of element 'energyOUT'
      .setProperty("TextAlign","right") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'energyOUT'
      .setProperty("Text","<b>Energy Transfer Out: </b>") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'energyOUT'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"energyTypeOUT", _view.OUT) // EJsS HtmlView.HtmlView: declaration of element 'energyTypeOUT'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field2", _view.OUT) // EJsS HtmlView.HtmlView: declaration of element 'field2'
      .setProperty("Width","3vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'field2'
      .setProperty("Format","1") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'field2'
      .setProperty("Tooltip","EtransOUT") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'field2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"energyTransferTWO", _view.setting) // EJsS HtmlView.HtmlView: declaration of element 'energyTransferTWO'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'energyTransferTWO'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'energyTransferTWO'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"IN2", _view.energyTransferTWO) // EJsS HtmlView.HtmlView: declaration of element 'IN2'
      .setProperty("Background","rgba(0,255,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'IN2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"energyIN3", _view.IN2) // EJsS HtmlView.HtmlView: declaration of element 'energyIN3'
      .setProperty("Text","<b>Energy Transfer In: </b>") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'energyIN3'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"energyTypeIN2", _view.IN2) // EJsS HtmlView.HtmlView: declaration of element 'energyTypeIN2'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field3", _view.IN2) // EJsS HtmlView.HtmlView: declaration of element 'field3'
      .setProperty("Width","3vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'field3'
      .setProperty("Format","1") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'field3'
      .setProperty("Tooltip","EtransIN2") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'field3'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"OUT2", _view.energyTransferTWO) // EJsS HtmlView.HtmlView: declaration of element 'OUT2'
      .setProperty("Background","rgba(0,255,255,1)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'OUT2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"energyOUT3", _view.OUT2) // EJsS HtmlView.HtmlView: declaration of element 'energyOUT3'
      .setProperty("TextAlign","right") // EJsS HtmlView.HtmlView: setting property 'TextAlign' for element 'energyOUT3'
      .setProperty("Text","<b>Energy Transfer Out: </b>") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'energyOUT3'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"energyTypeOUT2", _view.OUT2) // EJsS HtmlView.HtmlView: declaration of element 'energyTypeOUT2'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"field22", _view.OUT2) // EJsS HtmlView.HtmlView: declaration of element 'field22'
      .setProperty("Width","3vw") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'field22'
      .setProperty("Format","1") // EJsS HtmlView.HtmlView: setting property 'Format' for element 'field22'
      .setProperty("Tooltip","EtransOUT2") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'field22'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"panel", _view.masterPanel) // EJsS HtmlView.HtmlView: declaration of element 'panel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"L", _view.panel) // EJsS HtmlView.HtmlView: declaration of element 'L'
      .setProperty("Width","33%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'L'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView: setting property 'ShowAreaRectangle' for element 'L'
      .setProperty("Gutters",[50,50,0,50]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'L'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'YScalePrecision' for element 'L'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'XFixedTick' for element 'L'
      .setProperty("AxisXShow",false) // EJsS HtmlView.HtmlView: setting property 'AxisXShow' for element 'L'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'L'
      .setProperty("AxisYLineWidth",2) // EJsS HtmlView.HtmlView: setting property 'AxisYLineWidth' for element 'L'
      .setProperty("XTickStep",1) // EJsS HtmlView.HtmlView: setting property 'XTickStep' for element 'L'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView: setting property 'YTickStep' for element 'L'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'XAutoTicks' for element 'L'
      .setProperty("Title","Initial Amount of Energy of the System") // EJsS HtmlView.HtmlView: setting property 'Title' for element 'L'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'L'
      .setProperty("MaximumY",11) // EJsS HtmlView.HtmlView: setting property 'MaximumY' for element 'L'
      .setProperty("MaximumX",7) // EJsS HtmlView.HtmlView: setting property 'MaximumX' for element 'L'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'L'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView: setting property 'MinimumX' for element 'L'
      .setProperty("MinimumY",-2) // EJsS HtmlView.HtmlView: setting property 'MinimumY' for element 'L'
      .setProperty("TitleY","Energy / Units") // EJsS HtmlView.HtmlView: setting property 'TitleY' for element 'L'
      .setProperty("TitleX","Energy") // EJsS HtmlView.HtmlView: setting property 'TitleX' for element 'L'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView: setting property 'AutoScaleY' for element 'L'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"xAxis", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'xAxis'
      .setProperty("SizeX",6.5) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'xAxis'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'xAxis'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'xAxis'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'xAxis'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'xAxis'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"interactPROMPT", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'interactPROMPT'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'interactPROMPT'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'interactPROMPT'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'interactPROMPT'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'interactPROMPT'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'interactPROMPT'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'interactPROMPT'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'interactPROMPT'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'shapeSet'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'shapeSet'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'shapeSet'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'shapeSet'
      .setProperty("Sensitivity",30) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'shapeSet'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'shapeSet'
      .setProperty("EnabledSize","ENABLED_NONE") // EJsS HtmlView.HtmlView: setting property 'EnabledSize' for element 'shapeSet'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'shapeSet'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'shapeSet'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"xlabel", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'xlabel'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'xlabel'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'xlabel'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsety", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'offsety'
      .setProperty("Y",0.2) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'offsety'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"amt", _view.offsety) // EJsS HtmlView.HtmlView: declaration of element 'amt'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'amt'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'amt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"dragHelper", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'dragHelper'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragC", _view.dragHelper) // EJsS HtmlView.HtmlView: declaration of element 'dragC'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragC'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragC'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragC'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragC'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragC'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragE", _view.dragHelper) // EJsS HtmlView.HtmlView: declaration of element 'dragE'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragE'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragE'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragE'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragE'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragE'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragG", _view.dragHelper) // EJsS HtmlView.HtmlView: declaration of element 'dragG'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragG'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragG'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragG'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'dragG'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragG'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragG'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragI", _view.dragHelper) // EJsS HtmlView.HtmlView: declaration of element 'dragI'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragI'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragI'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragI'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragI'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragI'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragK", _view.dragHelper) // EJsS HtmlView.HtmlView: declaration of element 'dragK'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragK'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragK'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragK'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragK'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragK'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragN", _view.dragHelper) // EJsS HtmlView.HtmlView: declaration of element 'dragN'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragN'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragN'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragN'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragN'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragN'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"images", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'images'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"chemical", _view.images) // EJsS HtmlView.HtmlView: declaration of element 'chemical'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'chemical'
      .setProperty("ImageUrl","./Settings/chemical.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'chemical'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"elastic", _view.images) // EJsS HtmlView.HtmlView: declaration of element 'elastic'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'elastic'
      .setProperty("ImageUrl","./Settings/elestic.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'elastic'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"gravity", _view.images) // EJsS HtmlView.HtmlView: declaration of element 'gravity'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'gravity'
      .setProperty("ImageUrl","./Settings/gravity.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'gravity'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"internal", _view.images) // EJsS HtmlView.HtmlView: declaration of element 'internal'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'internal'
      .setProperty("ImageUrl","./Settings/internal.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'internal'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"kinetic", _view.images) // EJsS HtmlView.HtmlView: declaration of element 'kinetic'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'kinetic'
      .setProperty("ImageUrl","./Settings/kinetic.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'kinetic'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"nuclear", _view.images) // EJsS HtmlView.HtmlView: declaration of element 'nuclear'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'nuclear'
      .setProperty("ImageUrl","./Settings/nuclear.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'nuclear'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"images3D", _view.L) // EJsS HtmlView.HtmlView: declaration of element 'images3D'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"chemical3", _view.images3D) // EJsS HtmlView.HtmlView: declaration of element 'chemical3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'chemical3'
      .setProperty("ImageUrl","./Settings/chemical3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'chemical3'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"elastic3", _view.images3D) // EJsS HtmlView.HtmlView: declaration of element 'elastic3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'elastic3'
      .setProperty("ImageUrl","./Settings/elestic3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'elastic3'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"gravity3", _view.images3D) // EJsS HtmlView.HtmlView: declaration of element 'gravity3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'gravity3'
      .setProperty("ImageUrl","./Settings/gravity3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'gravity3'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"internal3", _view.images3D) // EJsS HtmlView.HtmlView: declaration of element 'internal3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'internal3'
      .setProperty("ImageUrl","./Settings/internal3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'internal3'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"kinetic3", _view.images3D) // EJsS HtmlView.HtmlView: declaration of element 'kinetic3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'kinetic3'
      .setProperty("ImageUrl","./Settings/kinetic3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'kinetic3'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"nuclear3", _view.images3D) // EJsS HtmlView.HtmlView: declaration of element 'nuclear3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'nuclear3'
      .setProperty("ImageUrl","./Settings/nuclear3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'nuclear3'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"O", _view.panel) // EJsS HtmlView.HtmlView: declaration of element 'O'
      .setProperty("Width","33%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'O'
      .setProperty("Gutters",[0,50,0,50]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'O'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView: setting property 'ShowAreaRectangle' for element 'O'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'YScalePrecision' for element 'O'
      .setProperty("XFixedTick",-6) // EJsS HtmlView.HtmlView: setting property 'XFixedTick' for element 'O'
      .setProperty("Title","System") // EJsS HtmlView.HtmlView: setting property 'Title' for element 'O'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'O'
      .setProperty("AxisXShow",false) // EJsS HtmlView.HtmlView: setting property 'AxisXShow' for element 'O'
      .setProperty("MaximumY",6) // EJsS HtmlView.HtmlView: setting property 'MaximumY' for element 'O'
      .setProperty("MaximumX",6) // EJsS HtmlView.HtmlView: setting property 'MaximumX' for element 'O'
      .setProperty("YFixedTick",-6) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'O'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'O'
      .setProperty("MinimumX",-6) // EJsS HtmlView.HtmlView: setting property 'MinimumX' for element 'O'
      .setProperty("MinimumY",-6) // EJsS HtmlView.HtmlView: setting property 'MinimumY' for element 'O'
      .setProperty("XTickStep",12) // EJsS HtmlView.HtmlView: setting property 'XTickStep' for element 'O'
      .setProperty("AxisYShow",false) // EJsS HtmlView.HtmlView: setting property 'AxisYShow' for element 'O'
      .setProperty("YTickStep",12) // EJsS HtmlView.HtmlView: setting property 'YTickStep' for element 'O'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'XAutoTicks' for element 'O'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'XScalePrecision' for element 'O'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"Closed_System", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'Closed_System'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'Closed_System'
      .setProperty("SizeX",4) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'Closed_System'
      .setProperty("ShapeType","ELLIPSE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'Closed_System'
      .setProperty("LineColor","Black") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'Closed_System'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'Closed_System'
      .setProperty("Attributes",{ "stroke-dasharray":"8 8 8 8" }) // EJsS HtmlView.HtmlView: setting property 'Attributes' for element 'Closed_System'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'Closed_System'
      .setProperty("SizeY",4) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'Closed_System'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'Closed_System'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"textObject", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'textObject'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'textObject'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'textObject'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowIN", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'arrowIN'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'arrowIN'
      .setProperty("LineColor","rgba(0,150,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'arrowIN'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'arrowIN'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'arrowIN'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'arrowIN'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView: setting property 'Offset' for element 'arrowIN'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowIN2", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'arrowIN2'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'arrowIN2'
      .setProperty("LineColor","rgba(0,255,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'arrowIN2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'arrowIN2'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'arrowIN2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'arrowIN2'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView: setting property 'Offset' for element 'arrowIN2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowOUT", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'arrowOUT'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'arrowOUT'
      .setProperty("LineColor","rgba(0,150,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'arrowOUT'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'arrowOUT'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'arrowOUT'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'arrowOUT'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView: setting property 'Offset' for element 'arrowOUT'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowOUT2", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'arrowOUT2'
      .setProperty("Sensitivity",50) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'arrowOUT2'
      .setProperty("LineColor","rgba(0,255,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'arrowOUT2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'arrowOUT2'
      .setProperty("LineWidth",5) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'arrowOUT2'
      .setProperty("EnabledPosition","ENABLED_ANY") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'arrowOUT2'
      .setProperty("Offset","CENTERED") // EJsS HtmlView.HtmlView: setting property 'Offset' for element 'arrowOUT2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"groupIN", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'groupIN'
      .setProperty("Y",0.9) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'groupIN'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"imageIN", _view.groupIN) // EJsS HtmlView.HtmlView: declaration of element 'imageIN'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"interactPrompt", _view.groupIN) // EJsS HtmlView.HtmlView: declaration of element 'interactPrompt'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'interactPrompt'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'interactPrompt'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'interactPrompt'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'interactPrompt'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"energyIN2", _view.groupIN) // EJsS HtmlView.HtmlView: declaration of element 'energyIN2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'energyIN2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'energyIN2'
      .setProperty("EnabledSize","ENABLED_NONE") // EJsS HtmlView.HtmlView: setting property 'EnabledSize' for element 'energyIN2'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'energyIN2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"transIN_text", _view.groupIN) // EJsS HtmlView.HtmlView: declaration of element 'transIN_text'
      .setProperty("FillColor","rgba(0,150,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'transIN_text'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'transIN_text'
      .setProperty("Text","Tin₁") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'transIN_text'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"iconINamt", _view.groupIN) // EJsS HtmlView.HtmlView: declaration of element 'iconINamt'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'iconINamt'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"amtIN", _view.groupIN) // EJsS HtmlView.HtmlView: declaration of element 'amtIN'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'amtIN'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"drag3Helper", _view.groupIN) // EJsS HtmlView.HtmlView: declaration of element 'drag3Helper'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragTin1", _view.drag3Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragTin1'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragTin1'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragTin1'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragTin1'
      .setProperty("LineColor","Pink") // EJsS HtmlView.HtmlView: setting property 'LineColor' for element 'dragTin1'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragTin1'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragTin1'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"groupIN2", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'groupIN2'
      .setProperty("Y",0.9) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'groupIN2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"drag4Helper", _view.groupIN2) // EJsS HtmlView.HtmlView: declaration of element 'drag4Helper'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragTin2", _view.drag4Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragTin2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragTin2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragTin2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragTin2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragTin2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragTin2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"imageIN2", _view.groupIN2) // EJsS HtmlView.HtmlView: declaration of element 'imageIN2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"interactPrompt3", _view.groupIN2) // EJsS HtmlView.HtmlView: declaration of element 'interactPrompt3'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'interactPrompt3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'interactPrompt3'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'interactPrompt3'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'interactPrompt3'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"energyIN22", _view.groupIN2) // EJsS HtmlView.HtmlView: declaration of element 'energyIN22'
      .setProperty("EnabledSize","ENABLED_NONE") // EJsS HtmlView.HtmlView: setting property 'EnabledSize' for element 'energyIN22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'energyIN22'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'energyIN22'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'energyIN22'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"transIN_text2", _view.groupIN2) // EJsS HtmlView.HtmlView: declaration of element 'transIN_text2'
      .setProperty("FillColor","rgba(0,200,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'transIN_text2'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'transIN_text2'
      .setProperty("Text","Tin₂") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'transIN_text2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"iconINamt2", _view.groupIN2) // EJsS HtmlView.HtmlView: declaration of element 'iconINamt2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'iconINamt2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"amtIN2", _view.groupIN2) // EJsS HtmlView.HtmlView: declaration of element 'amtIN2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'amtIN2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"groupOUT", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'groupOUT'
      .setProperty("Y",0.9) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'groupOUT'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"imageOUT", _view.groupOUT) // EJsS HtmlView.HtmlView: declaration of element 'imageOUT'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"interactPrompt2", _view.groupOUT) // EJsS HtmlView.HtmlView: declaration of element 'interactPrompt2'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'interactPrompt2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'interactPrompt2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'interactPrompt2'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'interactPrompt2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"energyOUT2", _view.groupOUT) // EJsS HtmlView.HtmlView: declaration of element 'energyOUT2'
      .setProperty("EnabledSize","ENABLED_NONE") // EJsS HtmlView.HtmlView: setting property 'EnabledSize' for element 'energyOUT2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'energyOUT2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'energyOUT2'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'energyOUT2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"out_text", _view.groupOUT) // EJsS HtmlView.HtmlView: declaration of element 'out_text'
      .setProperty("FillColor","rgba(0,150,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'out_text'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'out_text'
      .setProperty("Text","Tout₁") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'out_text'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"amtOUT", _view.groupOUT) // EJsS HtmlView.HtmlView: declaration of element 'amtOUT'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'amtOUT'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"iconOUTamt", _view.groupOUT) // EJsS HtmlView.HtmlView: declaration of element 'iconOUTamt'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'iconOUTamt'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"drag5Helper", _view.groupOUT) // EJsS HtmlView.HtmlView: declaration of element 'drag5Helper'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragTout1", _view.drag5Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragTout1'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragTout1'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragTout1'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragTout1'
      .setProperty("DrawLines",0) // EJsS HtmlView.HtmlView: setting property 'DrawLines' for element 'dragTout1'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragTout1'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"groupOUT2", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'groupOUT2'
      .setProperty("Y",0.9) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'groupOUT2'
      ;

    _view._addElement(EJSS_DRAWING2D.image,"imageOUT2", _view.groupOUT2) // EJsS HtmlView.HtmlView: declaration of element 'imageOUT2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"interactPrompt22", _view.groupOUT2) // EJsS HtmlView.HtmlView: declaration of element 'interactPrompt22'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'interactPrompt22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'interactPrompt22'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'interactPrompt22'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'interactPrompt22'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"energyOUT22", _view.groupOUT2) // EJsS HtmlView.HtmlView: declaration of element 'energyOUT22'
      .setProperty("EnabledSize","ENABLED_NONE") // EJsS HtmlView.HtmlView: setting property 'EnabledSize' for element 'energyOUT22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'energyOUT22'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'energyOUT22'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'energyOUT22'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"out_text2", _view.groupOUT2) // EJsS HtmlView.HtmlView: declaration of element 'out_text2'
      .setProperty("FillColor","rgba(0,200,255,1.0)") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'out_text2'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'out_text2'
      .setProperty("Text","Tout₂") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'out_text2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"amtOUT2", _view.groupOUT2) // EJsS HtmlView.HtmlView: declaration of element 'amtOUT2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'amtOUT2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"iconOUTamt2", _view.groupOUT2) // EJsS HtmlView.HtmlView: declaration of element 'iconOUTamt2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'iconOUTamt2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"drag6Helper", _view.groupOUT2) // EJsS HtmlView.HtmlView: declaration of element 'drag6Helper'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragTout2", _view.drag6Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragTout2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragTout2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragTout2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragTout2'
      .setProperty("DrawLines",0) // EJsS HtmlView.HtmlView: setting property 'DrawLines' for element 'dragTout2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragTout2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"answer", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'answer'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"answerHint", _view.O) // EJsS HtmlView.HtmlView: declaration of element 'answerHint'
      .setProperty("OutlineColor","DarkGray") // EJsS HtmlView.HtmlView: setting property 'OutlineColor' for element 'answerHint'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView: setting property 'Visibility' for element 'answerHint'
      .setProperty("Font","normal normal 13px Georgia, serif") // EJsS HtmlView.HtmlView: setting property 'Font' for element 'answerHint'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"L2", _view.panel) // EJsS HtmlView.HtmlView: declaration of element 'L2'
      .setProperty("Width","33%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'L2'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView: setting property 'ShowAreaRectangle' for element 'L2'
      .setProperty("Gutters",[50,50,0,50]) // EJsS HtmlView.HtmlView: setting property 'Gutters' for element 'L2'
      .setProperty("ShowCoordinates",false) // EJsS HtmlView.HtmlView: setting property 'ShowCoordinates' for element 'L2'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView: setting property 'YScalePrecision' for element 'L2'
      .setProperty("Title","Final Amount of Energy of the System") // EJsS HtmlView.HtmlView: setting property 'Title' for element 'L2'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView: setting property 'Enabled' for element 'L2'
      .setProperty("AxisXShow",false) // EJsS HtmlView.HtmlView: setting property 'AxisXShow' for element 'L2'
      .setProperty("MaximumY",11) // EJsS HtmlView.HtmlView: setting property 'MaximumY' for element 'L2'
      .setProperty("MaximumX",7) // EJsS HtmlView.HtmlView: setting property 'MaximumX' for element 'L2'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView: setting property 'YFixedTick' for element 'L2'
      .setProperty("AxisYLineWidth",2) // EJsS HtmlView.HtmlView: setting property 'AxisYLineWidth' for element 'L2'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView: setting property 'YAutoTicks' for element 'L2'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView: setting property 'MinimumX' for element 'L2'
      .setProperty("MinimumY",-2) // EJsS HtmlView.HtmlView: setting property 'MinimumY' for element 'L2'
      .setProperty("TitleY","Energy / Units") // EJsS HtmlView.HtmlView: setting property 'TitleY' for element 'L2'
      .setProperty("YTickStep",1) // EJsS HtmlView.HtmlView: setting property 'YTickStep' for element 'L2'
      .setProperty("TitleX","Energy") // EJsS HtmlView.HtmlView: setting property 'TitleX' for element 'L2'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView: setting property 'AutoScaleY' for element 'L2'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"xAxis2", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'xAxis2'
      .setProperty("SizeX",6.5) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'xAxis2'
      .setProperty("X",0) // EJsS HtmlView.HtmlView: setting property 'X' for element 'xAxis2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'xAxis2'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView: setting property 'SizeY' for element 'xAxis2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'xAxis2'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"interactPROMPT2", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'interactPROMPT2'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'interactPROMPT2'
      .setProperty("FillColor","White") // EJsS HtmlView.HtmlView: setting property 'FillColor' for element 'interactPROMPT2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'interactPROMPT2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'interactPROMPT2'
      .setProperty("ShapeType","ROUND_RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'interactPROMPT2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'interactPROMPT2'
      .setProperty("LineWidth",10) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'interactPROMPT2'
      ;

    _view._addElement(EJSS_DRAWING2D.shapeSet,"shapeSet2", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'shapeSet2'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'shapeSet2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'shapeSet2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'shapeSet2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'shapeSet2'
      .setProperty("EnabledSize","ENABLED_NO_MOVE") // EJsS HtmlView.HtmlView: setting property 'EnabledSize' for element 'shapeSet2'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'shapeSet2'
      .setProperty("LineWidth",1) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'shapeSet2'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"xlabel2", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'xlabel2'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'xlabel2'
      .setProperty("Y",-0.5) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'xlabel2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"offsety2", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'offsety2'
      .setProperty("Y",0.2) // EJsS HtmlView.HtmlView: setting property 'Y' for element 'offsety2'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"amt2", _view.offsety2) // EJsS HtmlView.HtmlView: declaration of element 'amt2'
      .setProperty("NumberOfElements",6) // EJsS HtmlView.HtmlView: setting property 'NumberOfElements' for element 'amt2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'amt2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"images2D", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'images2D'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"chemical2", _view.images2D) // EJsS HtmlView.HtmlView: declaration of element 'chemical2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'chemical2'
      .setProperty("ImageUrl","./Settings/chemical.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'chemical2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"elastic2", _view.images2D) // EJsS HtmlView.HtmlView: declaration of element 'elastic2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'elastic2'
      .setProperty("ImageUrl","./Settings/elestic.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'elastic2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"gravity2", _view.images2D) // EJsS HtmlView.HtmlView: declaration of element 'gravity2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'gravity2'
      .setProperty("ImageUrl","./Settings/gravity.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'gravity2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"internal2", _view.images2D) // EJsS HtmlView.HtmlView: declaration of element 'internal2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'internal2'
      .setProperty("ImageUrl","./Settings/internal.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'internal2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"kinetic2", _view.images2D) // EJsS HtmlView.HtmlView: declaration of element 'kinetic2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'kinetic2'
      .setProperty("ImageUrl","./Settings/kinetic.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'kinetic2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"nuclear2", _view.images2D) // EJsS HtmlView.HtmlView: declaration of element 'nuclear2'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'nuclear2'
      .setProperty("ImageUrl","./Settings/nuclear.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'nuclear2'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"images3D2", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'images3D2'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"chemical22", _view.images3D2) // EJsS HtmlView.HtmlView: declaration of element 'chemical22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'chemical22'
      .setProperty("ImageUrl","./Settings/chemical3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'chemical22'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"elastic22", _view.images3D2) // EJsS HtmlView.HtmlView: declaration of element 'elastic22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'elastic22'
      .setProperty("ImageUrl","./Settings/elestic3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'elastic22'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"gravity22", _view.images3D2) // EJsS HtmlView.HtmlView: declaration of element 'gravity22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'gravity22'
      .setProperty("ImageUrl","./Settings/gravity3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'gravity22'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"internal22", _view.images3D2) // EJsS HtmlView.HtmlView: declaration of element 'internal22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'internal22'
      .setProperty("ImageUrl","./Settings/internal3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'internal22'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"kinetic22", _view.images3D2) // EJsS HtmlView.HtmlView: declaration of element 'kinetic22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'kinetic22'
      .setProperty("ImageUrl","./Settings/kinetic3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'kinetic22'
      ;

    _view._addElement(EJSS_DRAWING2D.imageSet,"nuclear22", _view.images3D2) // EJsS HtmlView.HtmlView: declaration of element 'nuclear22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView: setting property 'RelativePosition' for element 'nuclear22'
      .setProperty("ImageUrl","./Settings/nuclear3D.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'nuclear22'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"drag2Helper", _view.L2) // EJsS HtmlView.HtmlView: declaration of element 'drag2Helper'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragC2", _view.drag2Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragC2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragC2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragC2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragC2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragC2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragC2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragE2", _view.drag2Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragE2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragE2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragE2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragE2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragE2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragE2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragG2", _view.drag2Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragG2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragG2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragG2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragG2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragG2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragG2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragI2", _view.drag2Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragI2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragI2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragI2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragI2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragI2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragI2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragK2", _view.drag2Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragK2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragK2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragK2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragK2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragK2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragK2'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"dragN2", _view.drag2Helper) // EJsS HtmlView.HtmlView: declaration of element 'dragN2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView: setting property 'ShapeType' for element 'dragN2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView: setting property 'Sensitivity' for element 'dragN2'
      .setProperty("SizeX",0.8) // EJsS HtmlView.HtmlView: setting property 'SizeX' for element 'dragN2'
      .setProperty("LineWidth",0) // EJsS HtmlView.HtmlView: setting property 'LineWidth' for element 'dragN2'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView: setting property 'EnabledPosition' for element 'dragN2'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"descriptions", _view.masterPanel) // EJsS HtmlView.HtmlView: declaration of element 'descriptions'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"formula", _view.descriptions) // EJsS HtmlView.HtmlView: declaration of element 'formula'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'formula'
      .setProperty("Background","Pink") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'formula'
      .setProperty("BorderColor","Black") // EJsS HtmlView.HtmlView: setting property 'BorderColor' for element 'formula'
      .setProperty("BorderWidth",2) // EJsS HtmlView.HtmlView: setting property 'BorderWidth' for element 'formula'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'formula'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"formulaText", _view.formula) // EJsS HtmlView.HtmlView: declaration of element 'formulaText'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"legend", _view.descriptions) // EJsS HtmlView.HtmlView: declaration of element 'legend'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'legend'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"legendText", _view.legend) // EJsS HtmlView.HtmlView: declaration of element 'legendText'
      .setProperty("Background","rgba(255,200,0,0.5)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'legendText'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"transfer", _view.legend) // EJsS HtmlView.HtmlView: declaration of element 'transfer'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'transfer'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.transfer) // EJsS HtmlView.HtmlView: declaration of element 'label'
      .setProperty("Text","<b><u>Legend for Transfers</u>:</b>") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"waves", _view.transfer) // EJsS HtmlView.HtmlView: declaration of element 'waves'
      .setProperty("Background","rgba(0,0,255,0.1)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'waves'
      .setProperty("ImageUrl","./Settings/Propagation of waves.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'waves'
      .setProperty("Text","Propagation of waves") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'waves'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'waves'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"mechanic", _view.transfer) // EJsS HtmlView.HtmlView: declaration of element 'mechanic'
      .setProperty("Background","rgba(0,0,255,0.2)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'mechanic'
      .setProperty("ImageUrl","./Settings/Mechanically.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'mechanic'
      .setProperty("Text","Mechanically") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'mechanic'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'mechanic'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"fire", _view.transfer) // EJsS HtmlView.HtmlView: declaration of element 'fire'
      .setProperty("Background","rgba(0,0,255,0.3)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'fire'
      .setProperty("ImageUrl","./Settings/Heating.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'fire'
      .setProperty("Text","Heating") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'fire'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'fire'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"electric", _view.transfer) // EJsS HtmlView.HtmlView: declaration of element 'electric'
      .setProperty("Background","rgba(0,0,255,0.4)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'electric'
      .setProperty("ImageUrl","./Settings/Electrically.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'electric'
      .setProperty("Text","Electrically") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'electric'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView: setting property 'Display' for element 'electric'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"chemically", _view.transfer) // EJsS HtmlView.HtmlView: declaration of element 'chemically'
      .setProperty("Width","15%") // EJsS HtmlView.HtmlView: setting property 'Width' for element 'chemically'
      .setProperty("Background","rgba(0,0,255,0.4)") // EJsS HtmlView.HtmlView: setting property 'Background' for element 'chemically'
      .setProperty("Tooltip","Chemically") // EJsS HtmlView.HtmlView: setting property 'Tooltip' for element 'chemically'
      .setProperty("ImageUrl","./Settings/Chemically.png") // EJsS HtmlView.HtmlView: setting property 'ImageUrl' for element 'chemically'
      .setProperty("Text","Chemically") // EJsS HtmlView.HtmlView: setting property 'Text' for element 'chemically'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new LOLMasterTemplateV8("_topFrame","_ejs_library/",null);
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
