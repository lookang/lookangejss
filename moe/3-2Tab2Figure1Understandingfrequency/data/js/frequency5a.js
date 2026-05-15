var self;
var frameAni;
var timer;
var timerCnt=0;
var greyTB;
var txtVal=4.5;
var txt1;
var ifAudioPlayed=false;
var timertxt;

var isMobile = false;
var isExit = false;
var dropdownBoxes = document.getElementsByClassName("ui-combobox");
var inputBoxes = document.getElementsByClassName("ui-textinput");

function setScope(scope) {
  self = scope;
  self.addEventListener("mousedown", selfClick);
  timertxt = document.getElementById("timer_txt")
  setTimeout(function () {
    initActivity();
    checkDevice();
    resizeWindow()
    self.audiomc.gotoAndPlay("5a_VO1");
  }, 10);
}
function comboBlur() {
    //alert("comboBlur")
    console.log("comboBlur");
    $("#timer_txt").blur();
    $("#waveinput").blur();


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
          fontDelta = 13;//13
      }else if(screen.orientation.angle == 90){
        //alert("landscape")
        // landscape
          fontDelta = 11;//11
      }
    }else if(tD == "iOS"){
    //  alert("iOS")
      if (Math.abs(window.orientation) === 90) {
              // Landscape
            //  alert("iOS Landscape")
              fontDelta = 20
          } else {
          	// Portrait
          //  alert("iOS Portrait")
            fontDelta = 17
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
function runTime(val) {
  checkDevice();
    resizeWindow()
  timertxt.value = val;
}
function stopTime() {
  self.fivea_mc.paused1_mc.visible = true;
  self.fivea_mc.replay1_mc.visible = true;
}

function initActivity(){
  checkDevice();
    resizeWindow()
	self.blocker.cursor = "default";
  	self.blocker.visible = true;
	// self.fivea_mc.timer_mc.text = "00.0 s";
	timertxt.value  = "00.0 s";
  	// self.fivea_mc.timer_mc.text = "";
}

function nextClick(){
	self.fivea_mc.next_btn.gotoAndStop(1)
	self.fivea_mc.next_btn.mouseEnabled=false;
	setTimeout(function(){
		showScreen5B();
		self.fivea_mc.next_btn.mouseEnabled=true;
	},1000)

}

function showScreen5B(){
  console.log("showScreen5B  ");
	/*self.fivea_mc.hint_mc.removeEventListener("mousedown",showHint);*/
	self.fivea_mc.replay_mc.visible=true;
	self.fivea_mc.replay_mc.gotoAndStop(1);
	self.fivea_mc.hint1_mc.visible = false;
	self.fivea_mc.hide1_mc.visible = false;
	self.fivea_mc.hintmsg_mc.visible = false;
	self.fivea_mc.hide_mc.visible=false;
	self.fivea_mc.next_btn.removeEventListener("mousedown",nextClick)
	timerCnt = 0;
	self.fivea_mc.gotoAndStop(2);
	self.fivea_mc.boy_mc.gotoAndPlay("play");
  checkDevice();
    resizeWindow()
	timerStart();
	setTimeout(function(){
		clearInterval(timer);
		showScreen5C();
	},1000)
}

function showScreen5C(){
  console.log("showScreen5C");
  checkDevice();
    resizeWindow()
    timertxt.value = "01.0 s"

  setTimeout(function() {
    self.fivea_mc.gotoAndStop(3);



	if(!ifAudioPlayed){
		self.blocker.visible=true;
		self.audiomc.gotoAndPlay("5c_VO1");
		ifAudioPlayed = true;
    checkDevice();
    resizeWindow()
		txt1 = document.getElementById("waveinput");
	  txt1.value = "";
		txt1.setAttribute("disabled",true);
		self.fivea_mc.replay_mc.cursor = "pointer";
		self.fivea_mc.replay_mc.addEventListener("mousedown",doReplay);
		self.fivea_mc.hint_mc.cursor = "pointer";
		self.fivea_mc.hint_mc.addEventListener("mousedown",showHint);

		txt1.addEventListener("keyup",checkWaveAns);
		setInputFilter(document.getElementById("waveinput"), function(value) {
  		return /^-?\d*[.,]?\d*$/.test(value); });

	}else{
		console.log("else no narration")

        self.fivea_mc.hint_mc.visible=true;
		self.fivea_mc.hint_mc.cursor = "pointer";
		self.fivea_mc.hint_mc.addEventListener("mousedown",showHint);
	}
  },500)

}

function doReplay(){
	self.fivea_mc.replay_mc.removeEventListener("mousedown",doReplay);
	self.fivea_mc.replay_mc.gotoAndStop(1);
	setTimeout(function(){
		showScreen5B();
		self.fivea_mc.replay_mc.addEventListener("mousedown",doReplay);
	},1000);
}

function showHint(){
	// self.fivea_mc.gotoAndStop(6);
	self.fivea_mc.hint_mc.removeEventListener("mousedown",showHint);
	self.fivea_mc.hintmsg_mc.gotoAndStop(0);
	self.fivea_mc.hintmsg_mc.visible = true;
	self.fivea_mc.hint_mc.visible = false;
	self.fivea_mc.hide_mc.visible = true;
	self.fivea_mc.hide_mc.cursor = "pointer";
	self.fivea_mc.hide_mc.addEventListener("mousedown",hideHint);
}

function hideHint(){
	// showScreen5C()
	self.fivea_mc.hide_mc.removeEventListener("mousedown",hideHint);
	self.fivea_mc.hintmsg_mc.visible = false;
	self.fivea_mc.hint_mc.visible = true;
	self.fivea_mc.hide_mc.visible = false;
	self.fivea_mc.hint_mc.cursor = "pointer";
	self.fivea_mc.hint_mc.addEventListener("mousedown",showHint);
}

function showHint1(){
	// self.fivea_mc.gotoAndStop(6);
	self.fivea_mc.hint1_mc.removeEventListener("mousedown",showHint1);
	self.fivea_mc.hintmsg_mc.visible = true;
	self.fivea_mc.hint1_mc.visible = false;
	self.fivea_mc.hide1_mc.visible = true;
	self.fivea_mc.hide1_mc.cursor = "pointer";
	self.fivea_mc.hide1_mc.addEventListener("mousedown",hideHint);
}

function hideHint1(){
	// showScreen5C()
	self.fivea_mc.hide1_mc.removeEventListener("mousedown",hideHint);
	self.fivea_mc.hintmsg_mc.visible = false;
	self.fivea_mc.hint1_mc.visible = true;
	self.fivea_mc.hide1_mc.visible = false;
	self.fivea_mc.hint1_mc.cursor = "pointer";
	self.fivea_mc.hint1_mc.addEventListener("mousedown",showHint);
}
function checkWaveAns(){
  checkDevice();
    resizeWindow()
	if(txt1.value.length >=1){
		if(txt1.value == "2" || txt1.value.toLowerCase() == "two"){
			self.fivea_mc.gotoAndStop(4);
			self.audiomc.gotoAndPlay("5e_VO1")
			txt1.setAttribute("disabled",true);
			setTimeout(function(){
				self.fivea_mc.hintmsg_mc.visible = false;
				self.fivea_mc.gotoAndStop(6);
				self.blocker.visible=true;
				self.audiomc.gotoAndPlay("5f_VO1");
				self.fivea_mc.paused_mc.visible = false;
				timerStart();
				self.fivea_mc.hint1_mc.cursor="pointer";
				self.fivea_mc.hint1_mc.addEventListener("mousedown",showHint1);
				self.fivea_mc.hide1_mc.cursor="pointer";
				self.fivea_mc.hide1_mc.addEventListener("mousedown",hideHint1);
				self.fivea_mc.next1_btn.cursor="pointer";
				self.fivea_mc.next1_btn.addEventListener("mousedown",showScreen6);

			},3000)
		}else{
			if((isNaN(txt1.value) && txt1.value.length >= 3) || !isNaN(txt1.value)){
				self.fivea_mc.gotoAndStop(5);
				self.fivea_mc.replay_mc.visible=false;
				self.audiomc.gotoAndPlay("5d_VO1");
				txt1.setAttribute("disabled",true);
				setTimeout(function(){
                 	showScreen5B();
                 	//self.fivea_mc.replay_mc.visible=false;
 				},3000)
				setTimeout(function(){
					txt1.removeAttribute("disabled");
				},2000)
			}

		}
	}
}
function timerStart(){
  checkDevice();
    resizeWindow()
  	timer = setInterval(function(){
    	timerCnt++;
		// self.fivea_mc.timer_mc.text = parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
		timertxt.value = parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
    	if(timerCnt==999)timerCnt=0
  	},100)
}

function timerStart1(){
  checkDevice();
    resizeWindow()
  	timer = setInterval(function(){
    	timerCnt++;
		// self.fivea_mc.timer_mc.text = parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
		timertxt.value =  parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
    	if(timerCnt==999)timerCnt=0
  	},200)
}

function showScreen6(){
	console.log("clicked screen6")
	console.log("screen6");
  checkDevice();
    resizeWindow()
	self.fivea_mc.next1_btn.removeEventListener("mousedown",showScreen6);
	self.fivea_mc.next1_btn.gotoAndStop(1)
	setTimeout(function(){
		self.fivea_mc.gotoAndStop(7);
		clearInterval(timer);
		// self.fivea_mc.timer_mc.text = "0.0 s";
		timertxt.value = "0.0 s";
		self.audiomc.gotoAndPlay("6a_VO1");
		self.blocker.visible=true;
		self.fivea_mc.popup_mc.visible = true;

		self.fivea_mc.next2_btn.mouseEnabled = false;
		self.fivea_mc.next2_btn.cursor="pointer";
		self.fivea_mc.next2_btn.addEventListener("mousedown",showScreen6A);

	// 	// timerStart();
	// 	self.fivea_mc.replay_mc.visible = false;
	// 	self.fivea_mc.paused_mc.visible = false;
	// 	self.fivea_mc.gotoAndStop(8);
	// 	self.fivea_mc.next1_btn.gotoAndStop(0);
	},1000)
}

function showScreen6A(){
	console.log("clicked screen6A")
	self.fivea_mc.next2_btn.cursor="default";
	self.fivea_mc.next2_btn.removeEventListener("mousedown",showScreen6A);
	console.log("6A")
	self.fivea_mc.gotoAndStop(8);
	self.fivea_mc.paused1_mc.visible = false;
	self.fivea_mc.replay1_mc.visible = false;
	self.fivea_mc.boy1_mc.gotoAndPlay("stop1");
	//self.fivea_mc.boy1_mc.gotoAndPlay("stopmarker");

	self.fivea_mc.replay1_mc.cursor = "pointer";
	self.fivea_mc.replay1_mc.addEventListener("mousedown",replay6A);
	self.fivea_mc.popup1_mc.visible = true;
	self.fivea_mc.next3_btn.mouseEnabled = false;
	self.fivea_mc.next3_btn.visible = false;
	timerCnt=0;
	//timerStart1();
  runTime("00.0 s")
	setTimeout(function(){
		// self.fivea_mc.boy1_mc.gotoAndStop("play1");
		self.fivea_mc.popup1_mc.visible = true;
	},1000)
	setTimeout(function(){
	/*	self.fivea_mc.boy1_mc.gotoAndPlay("play2");
		self.fivea_mc.paused1_mc.visible = true;
		self.fivea_mc.replay1_mc.visible = true;*/
		clearInterval(timer);

	},2000)
	setTimeout(function(){
		self.fivea_mc.next3_btn.visible = true;
		self.fivea_mc.next3_btn.mouseEnabled = true;
		self.fivea_mc.next3_btn.gotoAndStop(0);
		self.fivea_mc.next3_btn.cursor = "pointer";
		self.fivea_mc.next3_btn.addEventListener("mousedown",showScreen7);

    self.fivea_mc.paused1_mc.visible = true;
		self.fivea_mc.replay1_mc.visible = true;
	},6000)
}

function continueTimer(val) {
  //timerCnt = 10;
  //timerStart1()
  //showScreen6A()
  self.fivea_mc.paused1_mc.visible = true;
  self.fivea_mc.boy1_mc.gotoAndStop("stopmarker");
}
function replay6A(){
	console.log("clicked");
	self.fivea_mc.replay1_mc.removeEventListener("mousedown",replay6A);
	self.fivea_mc.replay1_mc.gotoAndStop(1);
	//setTimeout(function(){
		showScreen6();
	//},1000)
}

function doReplay1(){
	self.fivea_mc.replay_mc.gotoAndStop(1);
	setTimeout(function(){showScreen6A()},1000)
}

function showScreen7(){
	console.log("clicked screen7")
	self.fivea_mc.next3_btn.cursor = "default";
	self.fivea_mc.next3_btn.removeEventListener("mousedown",showScreen7);
	self.fivea_mc.next3_btn.gotoAndStop(1);
	setTimeout(function(){
		self.blocker.visible=true;
		self.audiomc.gotoAndPlay("7_VO1");
		self.fivea_mc.visible=false;
    $("#timer_txt").hide();
		self.endscreen_mc.visible=true;
		self.endscreen_mc.next_mc.visible=false;
		self.endscreen_mc.next_mc.cursor="pointer";
		self.endscreen_mc.next_mc.addEventListener("mousedown",showScreen8)
	},1000)
}

function showScreen8(){
	console.log("clicked screen8")
	window.location.href= "frequency_8.html";
}
function endOfAudio() {

}
function endOfAudio1(val){
  	console.log("End of Audio: " + val)
  	self.blocker.visible = false;
 	if(val == "5a_VO1"){
		self.fivea_mc.gotoAndStop(1);
		self.fivea_mc.next_btn.cursor = "pointer";
		self.fivea_mc.next_btn.addEventListener("mousedown",nextClick)
 	}else if(val == "5c_VO1"){
		txt1.removeAttribute("disabled");
 	}else if(val == "5e_VO1"){
 		self.blocker.visible = true;
 	}else if(val == "6a_VO1"){
		self.fivea_mc.next2_btn.mouseEnabled = true;
		self.fivea_mc.popup_mc.visible = true;
		self.fivea_mc.next2_btn.gotoAndPlay("play");
 	}else if(val == "7_VO1"){
		self.endscreen_mc.next_mc.visible=true;
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
