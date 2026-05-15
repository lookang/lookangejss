var self;
var frameAni;
var timer;
var timerCnt=0;
var greyTB;
var txtVal=4.5;
var isAudioPlayed = false;
var lbl1,lbl2,lbl3,lbl4,timertxt,lbl10;
var isMobile = false;
var isExit = false;
var dropdownBoxes = document.getElementsByClassName("ui-combobox");
var inputBoxes = document.getElementsByClassName("ui-textinput");
function setScope(scope) {
  self = scope;
  self.addEventListener("mousedown", selfClick);
  self.foura_mc.correct_mc.visible = false;
  self.foura_mc.wrong_mc.visible = false;
  // self.foura_mc.reset_mc.visible = false;
  self.foura_mc.stop_mc.visible = false;
  // self.foura_mc.timer_txt.text = "00.0 s";
  self.foura_mc.submit_btn.visible =false;
  timertxt = document.getElementById("timer_txt");
  timertxt.value = "00.0 s";

  setTimeout(function () {
    initActivity()
    checkDevice();
    resizeWindow()
  }, 10);
}
function comboBlur() {
    //alert("comboBlur")
    console.log("comboBlur");
    $("#textbox1_text").blur();
    $("#textbox2_text").blur();
    $("#textbox3_text").blur();
    $("#textbox4_text").blur();
    $("#textbox10_text").blur();
    $("#timer_txt").blur();
    $("#graytext").blur();

  }

function selfClick(evt) {
  //console.log("Cliecked on Stage");
  comboBlur();
}
function resizeWindow() {
  //alert("Resize Working");
  comboBlur();
  var fontDelta = 0;
    var tD = getMobileOperatingSystem()
  var cWidth = document.documentElement.clientWidth;
  var cHeight = document.documentElement.clientHeight;
  var mainHeight = document.body.getBoundingClientRect().height;
    var mainWidth = document.body.getBoundingClientRect().width;
  var fontSize;
  if(cHeight *16/9 <cWidth){
    // Window is scaled using height
    fontSize = mainHeight *0.04;
  }
  if(cWidth * 9/ 16 < cHeight){
    // Window is scaled using width
    //fontSize = mainWidth * 0.02;
    fontSize = mainWidth * 0.02;
  }
    if(tD == "Android"){
    //  alert("android")
      if(screen.orientation.angle == 0){
        //potrait
        //  alert("potrait")
          fontDelta = 15;//13
      }else if(screen.orientation.angle == 90){
        //alert("landscape")
        // landscape
          fontDelta = 12;//11
      }
    }else if(tD == "iOS"){
    //  alert("iOS")
      if (Math.abs(window.orientation) === 90) {
              // Landscape
            //  alert("iOS Landscape")
              fontDelta = 22
          } else {
          	// Portrait
          //  alert("iOS Portrait")
            fontDelta = 18
          }
    }
    // Input;
  for (var i = 0; i < inputBoxes.length; i++) {
    inputBoxes[i].style.fontSize = (fontSize + fontDelta) + "px"
    if(tD == "iOS"){
    // inputBoxes[i].style.color = "#00ff00"
    }
    if(tD == "Android"){
     //inputBoxes[i].style.color = "#22ff00"
    }
  }
  // Drop down boxes
  for (var i = 0; i < dropdownBoxes.length; i++) {
    dropdownBoxes[i].style.fontSize = (fontSize + fontDelta) + "px"
    if(tD == "iOS"){
     //dropdownBoxes[i].style.color = "#00ff00"
     dropdownBoxes[i].style.paddingTop = "15px"
    }
    if(tD == "Android"){
     //dropdownBoxes[i].style.paddingBottom = "5px"
    }
  }
  console.log(fontSize);
  comboBlur();
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "unknown";
}

function checkDevice() {
    console.log("check");
		var chek = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		if(chek){
			isMobile = chek;
      window.onorientationchange = function() {
        resizeWindow()
      };
		}else{
			isMobile = false;
      $(window).resize(function() {
        resizeWindow()
        if(!isExit){
        //  window.open("the_scoter_02.html","_self");
        }
        });
		}
	}
function initActivity(){
  checkDevice();
    resizeWindow()
	self.blocker.cursor = "default";
  self.blocker.visible = true;
  self.foura_mc.boy_mc.gotoAndStop("play");
  self.foura_mc.boy_mc.rightarm_mc.gotoAndStop(0);
  timertxt.style.display = "block";
  if(!isAudioPlayed){
    self.audiomc1.gotoAndPlay("4a_VO1");
    isAudioPlayed=true;
  }else{
    self.blocker.visible =false;
  }
  // self.foura_mc.timer_txt.text = "00.0 s";
  timertxt.value = "00.0 s";
  self.foura_mc.help_mc.gotoAndStop(0);
  self.foura_mc.graybox_mc.gotoAndStop(0);
  self.foura_mc.start_mc.cursor="pointer";

  self.foura_mc.submit_btn.visible =false;
  self.foura_mc.stop_mc.visible = false;
  self.foura_mc.reset_mc.visible = true;
  self.foura_mc.start_mc.addEventListener("mousedown",timerStart);

  // self.foura_mc.help_mc.addEventListener("mousedown",helpBtnClick)

  self.foura_mc.visible = true;
  self.foura1_mc.visible = false;
  self.fourd_mc.visible = false;
  self.fourd1_mc.visible = false;
  $('input').on('input', function() {
    this.value = this.value
      .replace(/[^\d.]/g, '')             // numbers and decimals only
      .replace(/(^[\d]{2})[\d]/g, '$1')   // not more than 2 digits at the beginning
      .replace(/(\..*)\./g, '$1')         // decimal can't exist more than once
      .replace(/(\.[\d]{2})./g, '$1');    // not more than 4 digits after decimal
  });

  greyTB = document.getElementById("graytext");
  greyTB.style.display = "block";
  greyTB.maxLength = 5;
    greyTB.value = "";
  greyTB.setAttribute("disabled",true);
  greyTB.addEventListener("keyup",checkKey)
  self.foura_mc.submit_btn.addEventListener("mousedown",function(){resultTimerTxtChange(greyTB)});
  setInputFilter(document.getElementById("graytext"), function(value) {
  return /^-?\d*[.,]?\d*$/.test(value); });
  // greyTB.addEventListener("keypress",function(){isNumberKey(event,this)})
  // showScreen4D();
  // showScreen4A1();
  // showScreen4D1();
}
function checkKey(e){
  var tVal = greyTB.value;
  if(tVal.length>0){
    self.foura_mc.submit_btn.mouseEnabled = true;
  }else{
    self.foura_mc.submit_btn.mouseEnabled = false;
  }
}
function helpBtnClick(){
  self.foura_mc.help_mc.removeEventListener("mousedown",helpBtnClick);
  timertxt.style.display = "none";
  self.blocker.visible = true;
   clearInterval(timer);
  self.foura_mc.help_mc.gotoAndStop(1);
  setTimeout(function(){
    self.foura_mc.visible = false;
    self.foura1_mc.visible = true;
    greyTB.style.display="none";
    showScreen4A1();
  },1000)
}

var isFalse = false;
function resultTimerTxtChange(ele){
  self.blocker.visible = true;
  checkDec(ele);
  txtVal = greyTB.value;

  if(txtVal.length>0){

  self.foura_mc.start_mc.mouseEnabled = false;
  self.foura_mc.reset_mc.mouseEnabled = false;

    self.foura_mc.submit_btn.visible =false;
    if(txtVal >= 7 && txtVal <= 8){
      console.log("filled");
      isFalse = true;
      // setTimeout(function(){
        if(txtVal.length ==1)greyTB.value = txtVal + ".0";
      // },1000)

      setTimeout(function(){
        self.foura_mc.correct_mc.visible = true;
        greyTB.setAttribute("disabled",true);
        self.blocker.visible=true;
        self.audiomc.gotoAndPlay("4c_VO1");
      },500)


      setTimeout(function(){
        greyTB.style.display = "none";
        self.foura_mc.visible = false;
        self.foura1_mc.visible = false;
        self.fourd_mc.visible = true;
        timertxt.style.display = "none";
        showScreen4D();
      },3000)

    }else{
      // setTimeout(function(){
        // setTimeout(function(){
          if(txtVal.length ==1)greyTB.value = txtVal + ".0";

        if(!isFalse){
         greyTB.setAttribute("disabled",true);
        // createjs.Sound.stop()
        self.audiomc.gotoAndPlay("4b_VO1");
        self.foura_mc.help_mc.removeEventListener("mousedown",helpBtnClick);
        self.foura_mc.help_mc.cursor="default";
        self.foura_mc.wrong_mc.visible = true;
        self.foura_mc.help_mc.gotoAndStop(1);
        isFalse = true;
      }
      // },1000);
     // },1000)

      // self.foura_mc.help_mc.removeEventListener("mousedown",helpBtnClick)
      setTimeout(function(){
        greyTB.value = "";
        self.foura_mc.graybox_mc.gotoAndStop(0);
        // greyTB.style.display = "none";
        self.foura_mc.help_mc.gotoAndStop(0);
        self.foura_mc.wrong_mc.visible = false;
        self.foura_mc.help_mc.cursor="pointer";
        self.foura_mc.help_mc.addEventListener("mousedown",helpBtnClick);
        // greyTB.removeAttribute("disabled");
        self.foura_mc.start_mc.mouseEnabled = true;
        self.foura_mc.reset_mc.mouseEnabled = true;
      },4000)
    }
  }
}


function timerStart(){
  checkDevice();
    resizeWindow()
  self.foura_mc.start_mc.visible = false;
  self.foura_mc.start_mc.cursor="default";
  self.foura_mc.start_mc.removeEventListener("mousedown",timerStart);
  self.foura_mc.reset_mc.cursor="pointer";
  self.foura_mc.reset_mc.addEventListener("mousedown",resetTimer);
  self.foura_mc.stop_mc.cursor="pointer";
  self.foura_mc.stop_mc.addEventListener("mousedown",timerStop);
  // self.foura_mc.reset_mc.visible = false;
  self.foura_mc.stop_mc.visible = true;
  timer = setInterval(function(){
    timerCnt++;
    // self.foura_mc.timer_txt.text = parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
    timertxt.value = parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
  },100)
}

function timerStop(){
  clearInterval(timer);
  self.foura_mc.submit_btn.visible =true;
  self.foura_mc.submit_btn.mouseEnabled = false;
  // self.foura_mc.cursor="pointer";
  isFalse = false;
  self.foura_mc.start_mc.cursor="pointer";
  self.foura_mc.start_mc.addEventListener("mousedown",timerStart);
  self.foura_mc.stop_mc.visible = false;
  self.foura_mc.start_mc.visible = true;
  // self.foura_mc.reset_mc.visible = true;
  self.foura_mc.graybox_mc.gotoAndStop(1);
  greyTB.style.display = "block";
  greyTB.removeAttribute("disabled");
}

function resetTimer(){
  clearInterval(timer);
  checkDevice();
    resizeWindow()
  self.foura_mc.submit_btn.visible = false;
  self.foura_mc.reset_mc.cursor="default";
  self.foura_mc.reset_mc.removeEventListener("mousedown",resetTimer);
  self.foura_mc.stop_mc.cursor="default";
  self.foura_mc.stop_mc.removeEventListener("mousedown",timerStop);
  self.foura_mc.graybox_mc.gotoAndStop(0);
  // self.foura_mc.reset_mc.visible = false;
  self.foura_mc.stop_mc.visible = false;
  self.foura_mc.start_mc.visible = true;
  self.foura_mc.start_mc.cursor="pointer";
  self.foura_mc.start_mc.addEventListener("mousedown",timerStart);
  // self.foura_mc.timer_txt.text = "00.0 s";
  timertxt.value = "00.0 s";
  greyTB.value = "";
  greyTB.length=3;
  greyTB.style.display = "none";
  greyTB.setAttribute("disabled",true);
  timerCnt=0;
}

function showScreen4A1(){
  self.foura_mc.visible = false;
  self.fourd_mc.visible = false;
  self.foura1_mc.visible = true;
  self.audiomc.gotoAndPlay("update4a1_VO1");
  self.foura1_mc.leftarm_mc.gotoAndStop(0);
  self.foura1_mc.replay_mc.visible = false;
  self.foura1_mc.next_mc.visible = false;
  // setTimeout(function(){
    self.foura1_mc.leftarm_mc.gotoAndPlay(1);
  // },8000)

}
function showScreen4D(){
  checkDevice();
    resizeWindow()
  lbl1 = document.getElementById("textbox1_text");
  lbl2 = document.getElementById('textbox2_text');
  lbl3 = document.getElementById("textbox3_text");
  lbl4 = document.getElementById("textbox4_text");
  lbl10 = document.getElementById("textbox10_text");

  // lbl1.style.display = "none";
  // lbl2.style.display = "none";
  // lbl3.style.display = "none";
  // lbl4.style.display = "none";
  self.audiomc.gotoAndPlay("4d11_VO1");
  // self.foura_mc.next_mc.visible = false;
  // self.fourd_mc.textbox1_text.text = "";
  // self.fourd_mc.textbox2_text.text = "";
  // self.fourd_mc.textbox3_text.text = "";
  // self.fourd_mc.textbox4_text.text = "";
}

function showScreen4D1(){
  self.fourd1_mc.visible = true;
  self.fourd1_mc.lessthan_mc.visible = false;
  self.fourd1_mc.twohz_mc.visible = false;
  self.fourd1_mc.morethan_mc.visible = false;
  self.fourd1_mc.next_mc.visible = false;
  self.fourd1_mc.boy_mc.gotoAndStop("play")
  self.audiomc.gotoAndPlay("4d1_VO1");
// self.fourd1_mc.boy_mc.rightarm_mc.gotoAndPlay(1);
}
function endOfAudio(val){}

function endOfAudio1(val){
  lbl1 = document.getElementById("textbox1_text");
  lbl2 = document.getElementById('textbox2_text');
  lbl3 = document.getElementById("textbox3_text");
  lbl4 = document.getElementById("textbox4_text");
  lbl10 = document.getElementById("textbox10_text");
  console.log("End of Audio: " + val)
  self.blocker.visible = false;

  if(val =="4a_VO1"){
        self.foura_mc.help_mc.addEventListener("mousedown",helpBtnClick);
        self.foura_mc.help_mc.cursor="pointer";
  }
  if(val=="4d11_VO1"){
    // self.fourd_mc.textbox1_text.text = txtVal
    lbl1.style.display = "block";
    if(txtVal.indexOf(".")< 0){
      txtVal = txtVal+".0"
    }
    lbl1.value = txtVal
    setTimeout(function(){
      // self.fourd_mc.textbox2_text.text = txtVal
      lbl2.style.display = "block";
      lbl2.value = txtVal;
      try {


      lbl10.style.display = "block";
    lbl10.value = "10";
  } catch (e) {

  }
      self.fourd_mc.graybox_mc.gotoAndStop("highlight");
      self.audiomc.gotoAndPlay("4d12_VO1");
    },1000)
  }else if(val=="4d12_VO1"){
    self.fourd_mc.graybox_mc.gotoAndStop("normal");
    self.fourd_mc.pinkbox1_mc.gotoAndStop("highlight");

    // self.fourd_mc.textbox3_text.text = parseFloat(10/txtVal).toFixed(1);
    lbl3.style.display = "block";
    lbl3.value = parseFloat(10/txtVal).toFixed(1);
    setTimeout(function(){
      self.fourd_mc.pinkbox2_mc.gotoAndStop("highlight");
      // self.fourd_mc.textbox4_text.text = parseFloat(10/txtVal).toFixed(1);
      lbl4.style.display = "block";
      lbl4.value = parseFloat(10/txtVal).toFixed(1);
      self.audiomc.gotoAndPlay("4d13_VO1");
    },2000)
  }else if(val=="4d13_VO1"){
    self.fourd_mc.pinkbox1_mc.gotoAndStop("normal");
    self.fourd_mc.leftarm_mc.gotoAndStop("normal");
    self.fourd_mc.next_mc.visible=true;
    self.fourd_mc.next_mc.cursor="pointer";
    self.fourd_mc.next_mc.addEventListener("mousedown",nextClick);
  }
  // else if(val == "4a1_VO1"){
  //   self.foura1_mc.leftarm_mc.gotoAndPlay(1);
  //   setTimeout(function(){
  //     self.foura1_mc.leftarm_mc.gotoAndPlay(2);
  //     self.audiomc.gotoAndPlay("4a3_VO1");
  //     self.foura1_mc.leftarm_mc.gotoAndPlay(3);
  //   },50)
  // }else if(val == "4a3_VO1"){
  //   self.audiomc.gotoAndPlay("4a7_VO1");
  // }

  else if(val == "update4a1_VO1mp3copy"){
    setTimeout(function(){
    self.foura1_mc.replay_mc.visible = true;
    self.foura1_mc.next_mc.visible = true;
  },1000)
    self.foura1_mc.next_mc.cursor="pointer";
    self.foura1_mc.replay_mc.cursor="pointer";
    self.foura1_mc.next_mc.addEventListener("mousedown",nextAfterHelp)
    self.foura1_mc.replay_mc.addEventListener("mousedown",replayAfterHelp)
  }else if (val == "4c_VO1"){
    self.blocker.visible = true;
  }else if(val == "4d1_VO1"){
    self.fourd1_mc.lessthan_mc.visible = true;
    self.fourd1_mc.lessthan_mc.cursor = "pointer";
    self.fourd1_mc.twohz_mc.visible = true;
    self.fourd1_mc.twohz_mc.cursor = "pointer";
    self.fourd1_mc.morethan_mc.visible = true;
    self.fourd1_mc.morethan_mc.cursor = "pointer";
    self.fourd1_mc.lessthan_mc.addEventListener("mousedown",option1Clicked)
    self.fourd1_mc.twohz_mc.addEventListener("mousedown",option2Clicked)
    self.fourd1_mc.morethan_mc.addEventListener("mousedown",option3Clicked)
  }else if (val == "4d2_VO1"){
    self.blocker.visible = true;
    setTimeout(function(){
      self.blocker.visible = false;
      self.fourd1_mc.gotoAndStop(0);
    },2000)

  }else if (val == "4d3_VO1"){
    setTimeout(function(){
      self.fourd1_mc.gotoAndStop(0);
      window.location.href= "frequency_5a.html";
    },2000)
  }
}

function replayAfterHelp(){
  self.foura1_mc.replay_mc.removeEventListener("mousedown",replayAfterHelp)
  self.foura1_mc.replay_mc.gotoAndStop(1);
  setTimeout(function(){
    showScreen4A1()
  },1000)
}

function nextAfterHelp(){
  self.foura_mc.help_mc.addEventListener("mousedown",helpBtnClick);
  self.foura_mc.help_mc.cursor="pointer";
  self.foura1_mc.next_mc.removeEventListener("mousedown",replayAfterHelp)
  self.foura1_mc.next_mc.gotoAndStop(1);
  setTimeout(function(){
    initActivity()
  },1000)
}
function nextClick(){
  self.fourd_mc.next_mc.removeEventListener("mousedown",nextClick);
    setTimeout(function(){
    self.fourd_mc.next_mc.gotoAndStop(1)
    lbl1.style.display = "none";
    lbl2.style.display = "none";
    lbl3.style.display = "none";
    lbl4.style.display = "none";
    try {
      lbl10.style.display = "none";
    } catch (e) {

    }



      self.fourd_mc.visible = false;
      self.fourd1_mc.visible = true;
      showScreen4D1();
  },1000)
}

function option1Clicked(){
  self.blocker.visible = true;
  self.audiomc.gotoAndPlay("4d3_VO1");
  self.fourd1_mc.gotoAndStop(1)
}
function option2Clicked(){
  self.blocker.visible = true;
  self.audiomc.gotoAndPlay("4d2_VO1");
  self.fourd1_mc.gotoAndStop(2)

}
function option3Clicked(){
  self.blocker.visible = true;
  self.audiomc.gotoAndPlay("4d2_VO1");
  self.fourd1_mc.gotoAndStop(3)
}

function isNumberKey(evt, obj) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function checkDec(el){
 var ex = /^\d*(.\d{0,1})?$/;
 // var ex = /^[0-9]+\.?[0-9]$/;
  // txt.match(/^\d*(.\d{0,2})?$/);
//  console.log(ex.test(el.value));
 if(ex.test(el.value)==false){
   el.value = el.value.substring(0,el.value.length - 1);
  }
  if(el.value.length>2 && el.value.indexOf(".")<0){
    el.value = el.value.substring(0,el.value.length - 1);
  }if(el.value.length>4){
    el.value = el.value.substring(0,el.value.length - 1);
  }
}

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.oldValue = "";
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}
