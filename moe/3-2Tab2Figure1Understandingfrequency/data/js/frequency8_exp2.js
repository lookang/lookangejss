var self;
var frameAni;
var timer;
var timerCnt=0;
var frequencySelected;
var timerSelected;
var currentWave = 0;
var origInterval;
var interval1 = 12;
var interval2 = 25;
var interval3 = 50;
var selIntId;
var quesOptSelected;
var curQuesMC;
var quesCntr=0;
var ques;
var opts;
var wrongAud;
var corrAud;
var quesAud;
var wave1AnimVisited = false;
var wave2AnimVisited = false;
var wave3AnimVisited = false;
function setScope(scope) {
  self = scope;
  self.explore_mc.next_btn.visible = false;
  setTimeout(function () {
    initActivity();
    	// self.audiomc.gotoAndPlay("8_VO1");
  }, 10);
}

function initActivity(){
	self.blocker.cursor = "default";
  	self.blocker.visible = false;
  	//setTimeout(function(){
	  	self.explore_mc.wave1_btn.cursor="pointer";
	  	self.explore_mc.wave2_btn.cursor="pointer";
	  	self.explore_mc.wave3_btn.cursor="pointer";
	  	self.explore_mc.wave1_btn.addEventListener("mousedown",function(){waveClicked(1)})
	  	self.explore_mc.wave2_btn.addEventListener("mousedown",function(){waveClicked(2)})
	  	self.explore_mc.wave3_btn.addEventListener("mousedown",function(){waveClicked(3)})
	//},8500)


  	// origInterval = createjs.Ticker.interval;
  	// interval1 = origInterval * 4;
  	// interval2 = origInterval;
  	// interval3 = origInterval / 4;
	// self.explore_mc.next_btn.visible = false;
	ques=[self.question1_mc,self.question2_mc,self.question3_mc,self.question4_mc,self.question5_mc]
	opts=[false,true,false,false,false];
	wrongAud=["8d3_VO1","8d6_VO1","8d9_VO1","10c_VO1","9c_VO1"]
	quesAud=["8d1_VO1","8d4_VO1","8d7_VO1","10a_VO1","9a_VO1"]
	corrAud=["8d2_VO1","8d5_VO1","8d8_VO1","10b_VO1","9b_VO1"]
	curQuesMC = ques[quesCntr];
	//   showScreen8D();
  	// self.fivea_mc.timer_mc.text = "";
}

function showExploreScreen(){
  window.isEvenRound = false;
	self.wave_mc.visible = true;
	self.explore_mc.visible = true;
	self.wave_mc.start_mc.cursor = "default";
	self.wave_mc.start_mc.removeEventListener("mousedown",startWaveAnimation);
	if(wave1AnimVisited && wave2AnimVisited && wave3AnimVisited){
		self.explore_mc.next_btn.visible = true;
		self.explore_mc.next_btn.cursor = "pointer";
		self.explore_mc.next_btn.addEventListener("mousedown",showScreen8D)
	}
}

function waveClicked(btnId){
	var ele =  eval("self.explore_mc.wave"+btnId+"_btn");
	self.explore_mc.wave1_btn.gotoAndStop(0);
	self.explore_mc.wave2_btn.gotoAndStop(0);
	self.explore_mc.wave3_btn.gotoAndStop(0);
	ele.gotoAndPlay(1);
	self.blocker.visible = true;
	// if(btnId == 2){
	// 	interval1 = 16;
	// 	interval2 = 28;
	// 	interval3 = 45;
	// }else if(btnId == 3){
	// 	interval1 = 13;
	// 	interval2 = 19;
	// 	interval3 = 44;
	// }
	setTimeout(function(){
		showWaveScreen(btnId);
	},1000)
}

function showWaveScreen(waveId){
	window["wave"+waveId+"AnimVisited"] = true;

	timerSelected=undefined;
	frequencySelected=undefined;
	currentWave = waveId
	self.blocker.visible = true;
	self.wave_mc.waveheading_mc.gotoAndStop(waveId-1);
	self.wave_mc.gotoAndStop(0);
	self.wave_mc.option1_btn.gotoAndStop(0);
	self.wave_mc.option2_btn.gotoAndStop(0);
	self.wave_mc.option3_btn.gotoAndStop(0);
	self.wave_mc.second1_mc.gotoAndStop(0);
	self.wave_mc.second5_mc.gotoAndStop(0);
	var ele = eval("self.wave_mc.waveani"+waveId+"_mc");
	self.audiomc.gotoAndPlay("8a_VO1");
  /*setTimeout(function functionName() {
    endOfAudio("8a_VO1")
  },2500)*/
	self.explore_mc.visible = false;
	self.wave_mc.visible = true;
	self.wave_mc.timer_txt.text = "00.0 s";
	self.wave_mc.waveani1_mc.visible = false;
	self.wave_mc.waveani2_mc.visible = false;
	self.wave_mc.waveani3_mc.visible = false;
	self.wave_mc.back_btn.cursor = "pointer";
	self.wave_mc.back_btn.addEventListener("mousedown",showExploreScreen)
	self.wave_mc.start_mc.gotoAndStop(0);
	ele.gotoAndStop(0);
	// ele.stop();
	ele.visible = true;
	ele.gotoAndStop("0");
	handleFrequency();
}

function handleFrequency(){
	self.wave_mc.option1_btn.cursor="pointer";
	self.wave_mc.option2_btn.cursor="pointer";
	self.wave_mc.option3_btn.cursor="pointer";
	self.wave_mc.option1_btn.addEventListener("mousedown",function(){optionClicked(1)})
  	self.wave_mc.option2_btn.addEventListener("mousedown",function(){optionClicked(2)})
  	self.wave_mc.option3_btn.addEventListener("mousedown",function(){optionClicked(3)})
  	self.wave_mc.second1_mc.cursor="pointer";
  	self.wave_mc.second5_mc.cursor="pointer";
  	self.wave_mc.second1_mc.addEventListener("mousedown",function(){timerSelect(1,"self.wave_mc")});
  	self.wave_mc.second5_mc.addEventListener("mousedown",function(){timerSelect(5,"self.wave_mc")});
}

function optionClicked(btnId){
	selIntId = btnId;
	self.blocker.visible = false;
	if(btnId==1)frequencySelected=0.5;
	if(btnId==2)frequencySelected=1.0;
	if(btnId==3)frequencySelected=2.0;
	var ele =  eval("self.wave_mc.option"+btnId+"_btn");
	self.wave_mc.option1_btn.gotoAndStop(0);
	self.wave_mc.option2_btn.gotoAndStop(0);
	self.wave_mc.option3_btn.gotoAndStop(0);
	ele.gotoAndPlay(1);
	if(timerSelected!=undefined){
		self.wave_mc.start_mc.cursor="pointer";
		self.wave_mc.start_mc.gotoAndStop(1);
	}
	// self.blocker.visible = true;
}

function timerSelect(selTime,baseMC){
	timerSelected = selTime;
	eval(baseMC+".second1"+"_mc").gotoAndStop(0);
	eval(baseMC+".second5"+"_mc").gotoAndStop(0);
	// self.wave_mc.second1_mc.gotoAndStop(0);
	// self.wave_mc.second5_mc.gotoAndStop(0);
	curQuesMC.start_mc.cursor = "pointer";
	var ele = eval(baseMC+".second"+selTime+"_mc");
	ele.gotoAndStop(9);
  	self.wave_mc.start_mc.addEventListener("mousedown",startWaveAnimation);
  	if(frequencySelected!=undefined){
		self.wave_mc.start_mc.cursor="pointer";
		self.wave_mc.start_mc.gotoAndStop(1);
	}
}

var curWaveAniEle;
var waveTimer;
var frameToStop;
var totalFrames;
var intToStop;
var lastfrequency;
var oneFreqTimer;
var fiveFreqTimer;
var intervalTime = 12;
var startFrame = 0
var stopFrame = 0;
var tickCnt = 0;
function getStopFrm(mc) {
  console.log(mc.currentFrame+"   cf ::  ");
  if(mc.currentFrame < 11 || mc.currentFrame >= 23){
    stopFrame = 12;
    startFrame = 0
  }else if(mc.currentFrame <23 && mc.currentFrame >= 11){
    stopFrame = 24;
    startFrame = 13;
  }
}

function oneFreqTimerFun(evt) {
  var ele = eval("self.wave_mc.waveani"+currentWave+"_mc");
  if(tickCnt < stopFrame){
  ele.gotoAndStop(tickCnt)
  tickCnt++
}else{
  createjs.Ticker.removeEventListener("tick", oneFreqTimerFun);
  console.log("stop playing");
}
}

function forOneSec() {
  clearInterval(oneFreqTimer)

  var ele = eval("self.wave_mc.waveani"+currentWave+"_mc");
  getStopFrm(ele)
  console.log(startFrame,stopFrame);
  //ele.stop();
  tickCnt = startFrame;
  ele.gotoAndStop(startFrame)


  if(frequencySelected == 0.5){
    console.log("0.5 ");
    createjs.Ticker.setFPS(60);
    stage.update()
    createjs.Ticker.removeEventListener("tick", oneFreqTimerFun);
createjs.Ticker.addEventListener("tick", oneFreqTimerFun);

    /*  oneFreqTimer = setInterval(function() {
        console.log(frm+"    playing");
        if(frm < stopFrame){
        ele.gotoAndStop(frm)
        frm++
      }else{
        clearInterval(oneFreqTimer)
        console.log("stop playing");
      }
      },intervalTime)*/


  } else if(frequencySelected == 1){
  console.log("1  ");
  } else if(frequencySelected == 2){
      console.log("2  ");
  }


}
function forFiveSec() {
  var cnt = 0;
  if(frequencySelected == 0.5){
    fiveFreqTimer = setInterval(function() {
      if(cnt < 5){
        forOneSec()
        console.log("repeat countr >>>>>>>>>>  "+cnt);
        cnt++
      }else{
        clearInterval(fiveFreqTimer)
      }
    },2000)
  }

}

function startWaveAnimation() {

    console.log("startWaveAnimation..."+ window.isEvenRound  +"   timerSelected  "+ timerSelected +"  selIntId  "+selIntId+"  frequencySelected "+frequencySelected);
if(timerSelected == 1){
  forOneSec();
}else if(timerSelected == 5){
  forFiveSec()
}



}

function startWaveAnimation1(){
  console.log("startWaveAnimation..."+ window.isEvenRound  +"   timerSelected  "+ timerSelected +"  selIntId  "+selIntId);
	if(frequencySelected !=undefined && timerSelect !=undefined){
		self.wave_mc.back_btn.mouseEnabled = false;
		self.wave_mc.start_mc.cursor = "default";
		self.wave_mc.start_mc.mouseEnabled = false;
		self.blocker.visible = true;
		self.wave_mc.start_mc.removeEventListener("mousedown",startWaveAnimation);
		self.wave_mc.second1_mc.removeEventListener("mousedown",function(){timerSelect(1,"self.wave_mc")});
  		self.wave_mc.second5_mc.removeEventListener("mousedown",function(){timerSelect(5,"self.wave_mc")});
		timerCnt = 0;
		self.wave_mc.timer_txt.text = "00.0 s";
		// createjs.Ticker.interval = eval("interval" + selIntId )
		var ele = eval("self.wave_mc.waveani"+currentWave+"_mc");
		totalFrames = ele.totalFrames;
		console.log("totalFrames: " + totalFrames)
		// totalFrames=currentWave==2?99:totalFrames
		if(lastfrequency != frequencySelected)
			ele.gotoAndStop(0);
		// ele.framerate = eval("interval" + selIntId);

		if(selIntId == 1){
			if(window.isEvenRound){
				//ele.framerate = 12;
				window.isEvenRound = false;
				frameToStop = 23;
			}else {
				// console.log("else")
				//ele.gotoAndStop(0);
			//	ele.framerate = 11;
				window.isEvenRound = true;
				frameToStop = 11;
			}
			// ele.framerate = totalFrames/2;
			// frameToStop = (totalFrames/2)-1;

		console.log(window.isEvenRound+"  :   "+ ele.framerate+"  :   "+selIntId)
		}else if(selIntId == 2){
			ele.framerate = totalFrames;
			frameToStop = totalFrames-1;
		}else if(selIntId == 3){
			ele.framerate = totalFrames*2;
			frameToStop = (totalFrames*2)-1;
		}
		// console.log(frameToStop);
		curWaveAniEle = ele;
		// ele.gotoAndStop(9);
		// ele.gotoAndPlay(0);

		intToStop = timerSelected;//(((timerSelected - 1)*ele.framerate) + frameToStop)/frameToStop;

		//(((1-1)*12)+11)/11
		// console.log(intToStop);
		// console.log("intToStop: " + intToStop)
		timerStart();
		var tmpInt;
		var cntr = 0;
		//ele.play();
		clearInterval(tmpInt);
    var cFrm = ele.currentFrame;
    console.log(" current frame   "+ ele.currentFrame+"   frequencySelected  "+ frequencySelected+"    frameToStop   : "+ frameToStop);
	//	if(frequencySelected == 0.5){
			tmpInt = setInterval(function(){
        cFrm++
        ele.gotoAndStop(cFrm);

				console.log(ele.currentFrame+" :::::  ");
        /*if(ele.currentFrame == 22){
          setTimeout(function() {
          ele.gotoAndStop(23);
        },30)

        }*/
				if(ele.currentFrame == frameToStop){
					cntr++;
					console.log("cntr", cntr)
					if(frequencySelected == 0.5){
            console.log("frameToStop  "+frameToStop);
						frameToStop = frameToStop==11?23:11
					}
					if(timerSelected==cntr)
					{
						ele.stop();
						clearInterval(tmpInt);
					}
					//if(timerSelected == 5)
				}
		},ele.framerate)
		/*	},1/10000)*/
	//	}

		window.setTimeout(function(){
			// if(frequencySelected == "2.0"){
			// 	ele.gotoAndStop(0);
			// }else{
			// 	ele.stop();
			// }
			// if(timerSelected == 5)
			// 	window.isEvenRound = false;
			// console.log(ele.currentFrame)
			if(frequencySelected == 1.0||frequencySelected == 2.0){
				ele.gotoAndStop(23);
			}
			clearInterval(timer);
			self.wave_mc.timer_txt.text = timerSelected==1?"01.0 s":"05.0 s"
			self.wave_mc.back_btn.mouseEnabled = true;
			self.wave_mc.start_mc.cursor = "pointer";
			self.wave_mc.start_mc.addEventListener("mousedown",startWaveAnimation);
			self.wave_mc.second1_mc.addEventListener("mousedown",function(){timerSelect(1,"self.wave_mc")});
  			self.wave_mc.second5_mc.addEventListener("mousedown",function(){timerSelect(5,"self.wave_mc")});
			setTimeout(function(){
				self.blocker.visible = false;
				self.wave_mc.start_mc.mouseEnabled = true;
			},10);
		},intToStop * 1000);

	}
	lastfrequency = frequencySelected;
}

function showScreen8D(){
	timerSelected = undefined;
	self.explore_mc.next_btn.gotoAndStop(1);
	self.explore_mc.next_btn.removeEventListener("mousedown",showScreen8D)
	setTimeout(function(){
		self.question1_mc.visible = false;
		self.question2_mc.visible = false;
		self.question3_mc.visible = false;
		curQuesMC.visible = true;
		curQuesMC.timer_txt.text = "00.0 s";
		self.explore_mc.visible = false;
		self.wave_mc.visible = false;
		curQuesMC.visible = true;
		self.blocker.visible = true;
		self.audiomc.gotoAndPlay(quesAud[quesCntr]);
		curQuesMC.start_mc.cursor = "default";
		curQuesMC.true_btn.cursor = "pointer";
		curQuesMC.false_btn.cursor = "pointer";
		curQuesMC.next_btn.visible = false;
		curQuesMC.true_btn.addEventListener("mousedown",function(){quesOptionClicked("true")})
		curQuesMC.false_btn.addEventListener("mousedown",function(){quesOptionClicked("false")})
	},1000)
}

function quesOptionClicked(btnId){
	if(btnId=="true")quesOptSelected=true;
	if(btnId=="false")quesOptSelected=false;
	var tmp = 	"self."+curQuesMC.name+"."+btnId+"_btn";
	console.log(tmp)
	var ele =  eval("self."+curQuesMC.name+"."+btnId+"_btn");
	console.log(ele)
	curQuesMC.true_btn.gotoAndStop(0);
	curQuesMC.false_btn.gotoAndStop(0);
	ele.gotoAndStop(1);

	curQuesMC.submit_btn.cursor="pointer";
	curQuesMC.submit_btn.addEventListener("mousedown",ansSubmit)
	console.log("optionclicked" + quesOptSelected);
}

function ansSubmit(){
	curQuesMC.submit_btn.gotoAndStop(1);
	curQuesMC.true_btn.removeEventListener("mousedown",function(){quesOptionClicked("true")});
	curQuesMC.false_btn.removeEventListener("mousedown",function(){quesOptionClicked("false")});
	curQuesMC.true_btn.mouseEnabled = false;
	curQuesMC.false_btn.mouseEnabled = false;
	curQuesMC.true_btn.cursor="default";
	curQuesMC.false_btn.cursor="default";

	setTimeout(function(){
		if(quesOptSelected == opts[quesCntr]){
			self.blocker.visible = true;
			self.audiomc.gotoAndPlay(corrAud[quesCntr]);
				curQuesMC.gotoAndStop(2);
			setTimeout(function(){
				curQuesMC.waveani1_mc.stop();
				curQuesMC.waveani2_mc.stop();
			},10)
		}else{
			self.blocker.visible = true;
			self.audiomc.gotoAndPlay(wrongAud[quesCntr]);
				curQuesMC.gotoAndStop(1);
			setTimeout(function(){
				curQuesMC.waveani1_mc.stop();
				curQuesMC.waveani2_mc.stop();
			},10)
		}

		// curQuesMC.start_mc.cursor = "pointer";
		curQuesMC.start_mc.addEventListener("mousedown",quest1to3WaveAnim);

		curQuesMC.second1_mc.cursor = "pointer";
		curQuesMC.second5_mc.cursor = "pointer";
		curQuesMC.second1_mc.addEventListener("mousedown",function(){timerSelect(1,"curQuesMC")})
  		curQuesMC.second5_mc.addEventListener("mousedown",function(){timerSelect(5,"curQuesMC")})
  		curQuesMC.next_btn.visible = true;
  		curQuesMC.next_btn.cursor = "pointer";
		curQuesMC.next_btn.addEventListener("mousedown",nextQues);
	},1000)
}

function quest1to3WaveAnim(){
	console.log("called quest1to3WaveAnim")
	if(timerSelected!=undefined){
		curQuesMC.start_mc.removeEventListener("mousedown",quest1to3WaveAnim);
		selIntId = 3;
		// createjs.Ticker.interval = eval("interval" + selIntId )
		curQuesMC.waveani1_mc.gotoAndStop(0)
		curQuesMC.waveani2_mc.gotoAndStop(0)
		var anim1FrameRate = (curQuesMC.waveani1_mc.totalFrames)*2;
		var anim2FrameRate = (curQuesMC.waveani1_mc.totalFrames)*2;
		if(quesCntr == 2){
			anim2FrameRate = (curQuesMC.waveani1_mc.totalFrames);
		}
		curQuesMC.waveani1_mc.framerate = anim1FrameRate;
		curQuesMC.waveani2_mc.framerate = anim2FrameRate;
		if(quesCntr ==2){
			selIntId = 2;
			curQuesMC.waveani2_mc.framerate = eval("interval" + selIntId )/timerSelected;
		}
		curQuesMC.waveani1_mc.play();
		curQuesMC.waveani2_mc.play();
		timerStart1();

		// var tmpInt;
		// var cntr = 0;
		// clearInterval(tmpInt);
		// tmpInt = setInterval(function(){
		// 	console.log(curQuesMC.waveani1_mc.currentFrame);
		// 	if(curQuesMC.waveani1_mc.currentFrame == 23){
		// 		cntr++;
		// 		console.log("cntr", cntr)
		// 		if(timerSelected==cntr)
		// 		{
		// 			curQuesMC.waveani1_mc.stop();
		// 			curQuesMC.waveani2_mc.stop();
		// 			clearInterval(tmpInt);
		// 		}
		// 		//if(timerSelected == 5)
		// 	}
		// },1)

		setTimeout(function(){
			// curQuesMC.waveani1_mc.gotoAndStop(0);
			// curQuesMC.waveani1_mc.stop();
			// curQuesMC.waveani2_mc.stop();
			curQuesMC.waveani1_mc.gotoAndStop(23);
			curQuesMC.waveani2_mc.gotoAndStop(23);
			// curQuesMC.waveani1_mc.gotoAndStop(47)
			// curQuesMC.waveani2_mc.gotoAndStop(47)
			// createjs.Ticker.interval = origInterval;
			clearInterval(timer);
			// curQuesMC.next_btn.cursor = "pointer";
			// curQuesMC.next_btn.addEventListener("mousedown",nextQues);
			curQuesMC.start_mc.addEventListener("mousedown",quest1to3WaveAnim);
		},timerSelected*1000)
	}
}

function timerStart1(){
	console.log("timer called")
	timerCnt=0;
	var ele = curQuesMC.timer_txt;
	ele.text = "00.0 s"
  	timer = setInterval(function(){
    	timerCnt++;
    	ele.text = parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
  	},100)
}

function showScreen9A(){
	console.log(curQuesMC);
	curQuesMC.gotoAndStop(0);
	self.question3_mc.visible = false;
	self.question4_mc.visible = false;
	self.question5_mc.visible = false;

	curQuesMC.visible = true;
	self.wave_mc.visible = false;
	self.blocker.visible = true;
	self.audiomc.gotoAndPlay(quesAud[quesCntr]);
	if(quesCntr == 3){
		curQuesMC.waveani1_mc.framerate = 48
		curQuesMC.waveani2_mc.framerate = 24
	}
	if(quesCntr == 4){
		curQuesMC.waveani1_mc.framerate = 12
		curQuesMC.waveani2_mc.framerate = 48
	}
	curQuesMC.next_btn.visible = false;
	curQuesMC.next_btn.addEventListener("mousedown",nextQues);
	// curQuesMC.check_mc.visible = false;
	curQuesMC.option1_btn.cursor = "pointer";
	curQuesMC.option1_btn.addEventListener("mousedown",function(){optionRadioClicked(1)})
	curQuesMC.option2_btn.cursor = "pointer";
	curQuesMC.option2_btn.addEventListener("mousedown",function(){optionRadioClicked(2)})
}

function optionRadioClicked(frameId){
	curQuesMC.gotoAndStop(frameId);
	curQuesMC.check_mc.visible = true;
	curQuesMC.check_mc.cursor = "pointer";
	curQuesMC.check_mc.addEventListener("mousedown",checkBtnClicked)
	if(frameId==1){
		quesOptSelected = false;
	}else{
		quesOptSelected = true;
	}
}

function checkBtnClicked(){
	console.log(quesOptSelected,opts[quesCntr]);
	if(quesOptSelected == opts[quesCntr]){
		// curQuesMC.next_btn.visible = true;
		curQuesMC.gotoAndStop(4);
		self.audiomc.gotoAndPlay(wrongAud[quesCntr]);
		self.blocker.visible = true;
		curQuesMC.tryagain_mc.visible = false;
	}else{
		curQuesMC.gotoAndStop(3);
		self.blocker.visible = true;
		self.audiomc.gotoAndPlay(corrAud[quesCntr]);
		setTimeout(function(){

		},1000)
	}
}
function tryagin(){
	showScreen9A();
}
function nextQues(){
	curQuesMC.next_btn.removeEventListener("mousedown",nextQues);
	curQuesMC.next_btn.gotoAndStop(1);
	setTimeout(function(){
		quesCntr++;
		curQuesMC = ques[quesCntr];
		if(quesCntr == 5){
			self.question5_mc.visible = false;
			self.endscreen_mc.visible = true;
			self.audiomc.gotoAndPlay("11_VO1");
		}else if(quesCntr<3){
			showScreen8D();
		}else{
			showScreen9A();
		}
	},1000)
}
function endOfAudio() {

}

function endOfAudio1(val){
  	console.log("End of Audio: " + val)
  	self.blocker.visible = false;
  	if(val =="10b_VO1" || val =="9b_VO1"){
  		curQuesMC.next_btn.cursor = "pointer";
  		curQuesMC.next_btn.visible = true;
  	}else if(val == "10c_VO1" || val == "9c_VO1"){
  		curQuesMC.tryagain_mc.visible = true;
  		curQuesMC.tryagain_mc.cursor = "pointer";
		curQuesMC.tryagain_mc.addEventListener("mousedown",tryagin)
  	}

}

function timerStart(){
	clearInterval(timer);
  	timer = setInterval(function(){
		timerCnt++;
		// console.log(timerCnt)
    	self.wave_mc.timer_txt.text = parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0) + " s";
		// console.log(timerCnt,parseFloat(timerCnt/10).toFixed(1).toString().padStart(4,0));
		// console.log(curWaveAniEle.currentFrame);
    	// if(self.wave_mc.timer_txt.text == "04.9 s")self.wave_mc.timer_txt.text = "05.0 s"
		if(timerCnt==999)timerCnt=0
		// if(timerSelected == 1 && timerCnt==10){
		// 	clearInterval(timer);
		// }else if(timerSelected == 5 && timerCnt==50){
		// 	clearInterval(timer);
		// }
  	},(intToStop*100)/timerSelected)
}
