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
var dFrate = 48;
var selIntId;
var quesOptSelected;
var curQuesMC;
var quesCntr = -1;
var ques;
var opts;
var wrongAud;
var corrAud;
var quesAud;
var wave1AnimVisited = false;
var wave2AnimVisited = false;
var wave3AnimVisited = false;
var stopPos = 0;
var stopCounter = 0;

var curWaveAniEle;
var waveTimer;
var frameToStop;
var lastWaveFreq = 0;
var totalFrames;
var intToStop;
var lastfrequency;
var freqWave = "";
/*var startinAry = [0,12,24,36,48,60,72,84,96,108,120,132,144]//for start frame
var stopinAry1 = [11,23,35,47,59,71,83,95,107,119,11]// for 1 sec stop frame
var stopinAry5 = [119,0,11,23,35,47,59,71,83,95,107]// for 5 sec stop frame*/

var startinAry = [0,12,24,36,48,60,72,84,96,108,120,132,144]//for start frame
var stopinAry1 = [24,36,48,60,72,84,96,108,120,132,144,14,24]// for 1 sec stop frame
var stopinAry5 = [120,132,144,12,24,36,48,60,72,84,96,108,120,132]// for 5 sec stop frame


/*var startinAry = [0,24,48,72,96,120,144]//for start frame
var stopinAry1 = [24,48,72,96,120,144,24]// for 1 sec stop frame
var stopinAry5 = [120,144,24,48,72,96,120]// for 5 sec stop frame*/


function setScope(scope) {
  self = scope;
  self.explore_mc.next_btn.visible = false;
  setTimeout(function () {
    initActivity();
    	// self.audiomc.gotoAndPlay("8_VO1");
  }, 10);
}

function updateStopPos(){
  for (var i = 0; i < startinAry.length; i++) {
    if(frameToStop == startinAry[i]){
      stopPos = i;
      return;
    }
  }
}

function setStopFrame(ele){
  //var ele = eval("self.wave_mc.waveani"+currentWave+"_mc");
  console.log(ele.currentFrame+"  setstop frame");




  if(ele.currentFrame >= 144){
    //ele.gotoAndStop(0);
    //stopPos = 0;
  }


  if(timerSelected == 1){
    frameToStop = stopinAry1[stopPos];
      self.wave_mc.timecntmc.gotoAndStop("one")

  }else if(timerSelected == 5){
    self.wave_mc.timecntmc.gotoAndStop("five")
    frameToStop = stopinAry5[stopPos];
  }
  console.log("stopPos    "+stopPos+"    frameToStop   "+frameToStop +"   timerSelected  "+timerSelected );
  updateStopPos()


//stopPos = stopPos + (selIntId * timerSelected);
//console.log(cFrame+" ::::    "+stopPos);

//frameToStop = (cFrame + (selIntId * timerSelected * 12)-1)
/*if(stopPos >= 11){
  stopPos = (stopPos - 11)
  if(timerSelected == 5 && cFrame > 70){
    stopPos++;
  }

}*/
console.log(selIntId * timerSelected+'  stopPos    '+stopPos);
//frameToStop = startinAry[stopPos]
}

function initActivity(){
	self.blocker.cursor = "default";
  	self.blocker.visible = true;
  	//setTimeout(function(){
    self.audiomc.gotoAndPlay("8_VO1");
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
  self.wave_mc.timecntmc.gotoAndStop("one")
	self.wave_mc.start_mc.cursor = "default";
	self.wave_mc.start_mc.removeEventListener("mousedown",startWaveAnimation);
	if(wave1AnimVisited && wave2AnimVisited && wave3AnimVisited){
		self.explore_mc.next_btn.visible = true;
		self.explore_mc.next_btn.cursor = "pointer";
		//self.explore_mc.next_btn.addEventListener("mousedown",showScreen8D)
		self.explore_mc.next_btn.addEventListener("mousedown",showScreenQuiz)
	}
}

function waveClicked(btnId){
  lastWaveFreq = 0;
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
    stopPos = 0
		showWaveScreen(btnId);
	},1000)
}

function showWaveScreen(waveId){
	window["wave"+waveId+"AnimVisited"] = true;

	timerSelected=undefined;
	frequencySelected=undefined;

  freqWave = "";
  if(frequencySelected > 0){
    freqWave = frequencySelected;
  }
  currentWave = waveId+freqWave

	self.blocker.visible = true;
	self.wave_mc.waveheading_mc.gotoAndStop(waveId-1);
	self.wave_mc.gotoAndStop(0);
	self.wave_mc.option1_btn.gotoAndStop(0);
	self.wave_mc.option2_btn.gotoAndStop(0);
	self.wave_mc.option3_btn.gotoAndStop(0);
	self.wave_mc.second1_mc.gotoAndStop(0);
	self.wave_mc.second5_mc.gotoAndStop(0);
  self.wave_mc.waveani1_mc.visible = false;
	var ele = eval("self.wave_mc.waveani"+waveId+freqWave+"_mc");
	self.audiomc.gotoAndPlay("8a_VO1");
  /*setTimeout(function functionName() {
    endOfAudio("8a_VO1")
  },2500)*/
	self.explore_mc.visible = false;
	self.wave_mc.visible = true;
	self.wave_mc.timer_txt.text = "00.0 s";
	self.wave_mc.waveani1_mc.visible = false;
  self.wave_mc.waveani11_mc.visible = false;
  self.wave_mc.waveani12_mc.visible = false;

	self.wave_mc.waveani2_mc.visible = false;
	self.wave_mc.waveani3_mc.visible = false;
	self.wave_mc.back_btn.cursor = "pointer";
	self.wave_mc.back_btn.addEventListener("mousedown",showExploreScreen)
	self.wave_mc.start_mc.gotoAndStop(0);
	ele.gotoAndStop(0);
	// ele.stop();
  hideAllWaves()
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


  console.log(lastWaveFreq+" *****************   "+btnId+" ********   "+stopPos);
  /*if(btnId != lastWaveFreq){
    if(stopPos >0 && (stopPos % 2 == 0)){
      frameToStop += 12;
      stopPos++;
      lastWaveFreq = btnId
    }
  }*/
	selIntId = btnId;
	self.blocker.visible = false;
	if(btnId==1){
    frequencySelected=0.5;
    freqWave = "";
  }
	if(btnId==2){
    frequencySelected=1.0;
    freqWave = 1;
  }
	if(btnId==3){
    frequencySelected=2.0;
    freqWave = 2;
  }


  hideAllWaves()

  var elem = eval("self.wave_mc.waveani"+currentWave+freqWave+"_mc");
  elem.gotoAndStop(0);


console.log(selIntId+"    %%%%%%     "+freqWave+"      "+frequencySelected+"   "+currentWave);
  self.wave_mc["waveani"+currentWave+freqWave+"_mc"].visible = true;

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
function hideAllWaves() {
  console.log("hideall");
  self.wave_mc.waveani1_mc.visible = false;
  self.wave_mc.waveani11_mc.visible = false;
  self.wave_mc.waveani12_mc.visible = false;

  self.wave_mc.waveani1_mc.gotoAndStop(0)
  self.wave_mc.waveani11_mc.gotoAndStop(0)
  self.wave_mc.waveani12_mc.gotoAndStop(0)

  self.wave_mc.waveani2_mc.visible = false;
  self.wave_mc.waveani21_mc.visible = false;
  self.wave_mc.waveani22_mc.visible = false;

  self.wave_mc.waveani2_mc.gotoAndStop(0)
  self.wave_mc.waveani21_mc.gotoAndStop(0)
  self.wave_mc.waveani22_mc.gotoAndStop(0)

  self.wave_mc.waveani3_mc.visible = false;
  self.wave_mc.waveani31_mc.visible = false;
  self.wave_mc.waveani32_mc.visible = false;

  self.wave_mc.waveani3_mc.gotoAndStop(0)
  self.wave_mc.waveani31_mc.gotoAndStop(0)
  self.wave_mc.waveani32_mc.gotoAndStop(0)

}
function timerSelect(selTime,baseMC){
  console.log(timerSelect+"  baseMC   "+baseMC);
	timerSelected = selTime;
	eval(baseMC+".second1"+"_mc").gotoAndStop(0);
	eval(baseMC+".second5"+"_mc").gotoAndStop(0);





	// self.wave_mc.second1_mc.gotoAndStop(0);
	// self.wave_mc.second5_mc.gotoAndStop(0);

	eval(baseMC+".start_mc").cursor = "pointer";
	var ele = eval(baseMC+".second"+selTime+"_mc");
	ele.gotoAndStop(9);
  	self.wave_mc.start_mc.addEventListener("mousedown",startWaveAnimation);
  	if(frequencySelected!=undefined && quesCntr < 0){
      if(timerSelected == 1){
          self.wave_mc.timecntmc.gotoAndStop("one")
      }else if(timerSelected == 5){
        self.wave_mc.timecntmc.gotoAndStop("five")
      }
  		self.wave_mc.start_mc.cursor="pointer";
  		self.wave_mc.start_mc.gotoAndStop(1);
	 }else if(frequencySelected!=undefined && quesCntr >= 0){
     if(timerSelected == 1){
       curQuesMC.timecntmc.gotoAndStop("one")
       curQuesMC.waveani1_mc.gotoAndStop("one")
       curQuesMC.waveani2_mc.gotoAndStop("one")
     }else if(timerSelected == 5){
       curQuesMC.timecntmc.gotoAndStop("five")
       curQuesMC.waveani1_mc.gotoAndStop("five")
       curQuesMC.waveani2_mc.gotoAndStop("five")
     }
     eval(baseMC+".start_mc").cursor="pointer";
     eval(baseMC+".start_mc").gotoAndStop(1);
   }
}


function startWaveAnimation(){


if(frequencySelected !=undefined && timerSelect !=undefined){
  lastWaveFreq = selIntId

  console.log("start wave animation");
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

  var ele = eval("self.wave_mc.waveani"+currentWave+freqWave+"_mc");
  totalFrames = ele.totalFrames;
  console.log("totalFrames: " + totalFrames)

  var tmpInt;
  var cntr = 0;
  ele.gotoAndStop(frameToStop)

  setStopFrame(ele)
  ele.framerate = dFrate
  self.wave_mc.timecntmc.framerate = dFrate
  ele.play();
  self.wave_mc.timecntmc.play()
  //timerStart(ele);



/*  createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  createjs.Ticker.framerate = 60;
  createjs.Ticker.on("tick", tick);*/

  //ele.stop();
}

}
function timerRun() {
  if(currentWave > 0 && quesCntr < 0){

      var ele = eval("self.wave_mc.waveani"+currentWave+freqWave+"_mc");
    console.log(timerCnt+" cframe   :::::  "+ele.currentFrame+"  frameToStop  "+frameToStop)
    if( ele.currentFrame == (frameToStop-1)){
      console.log("clear interval  ");
      ele.gotoAndStop(frameToStop-1)
      ele.stop();

      activeWaveButtons();
    }
  }else if(quesCntr >=0){
    if( curQuesMC.waveani1_mc.currentFrame == (frameToStop-1) && timerSelected == 1){
      console.log("clear interval  ");
      curQuesMC.waveani1_mc.gotoAndStop(frameToStop-1)
      curQuesMC.waveani2_mc.gotoAndStop(frameToStop-1)
      curQuesMC.waveani1_mc.stop();
      curQuesMC.waveani2_mc.stop();
      curQuesMC.start_mc.addEventListener("mousedown",quest1to3WaveAnim);
    }

  }

}
function timerFiveStop() {
  console.log("timer Five Stop");
  if(currentWave >0 && quesCntr < 0){
  var ele = eval("self.wave_mc.waveani"+currentWave+freqWave+"_mc");
  ele.gotoAndStop(frameToStop-1)
    ele.stop();
    activeWaveButtons();
  }else if(quesCntr >=0){
    curQuesMC.waveani1_mc.gotoAndStop(frameToStop-1)
    curQuesMC.waveani2_mc.gotoAndStop(frameToStop-1)
    curQuesMC.waveani1_mc.stop();
    curQuesMC.waveani2_mc.stop();
    curQuesMC.start_mc.addEventListener("mousedown",quest1to3WaveAnim);
  }

}
function timerOneStop() {
    console.log("timer ONe Stop");
    if(currentWave >0 && quesCntr < 0){

  var ele = eval("self.wave_mc.waveani"+currentWave+freqWave+"_mc");
  ele.gotoAndStop(frameToStop-1)
    ele.stop();
    activeWaveButtons();
  }else if(quesCntr >=0){
    curQuesMC.waveani1_mc.gotoAndStop(frameToStop-1)
    curQuesMC.waveani2_mc.gotoAndStop(frameToStop-1)
    curQuesMC.waveani1_mc.stop();
    curQuesMC.waveani2_mc.stop();
    curQuesMC.start_mc.addEventListener("mousedown",quest1to3WaveAnim);
  }

}

/*function tick(event) {
    console.log("total time: "+createjs.Ticker.getTime(true));
}*/

function activeWaveButtons() {

  self.wave_mc.timer_txt.text = timerSelected==1?"01.0 s":"05.0 s"
  self.blocker.visible = false;
  self.wave_mc.back_btn.mouseEnabled = true;
  self.wave_mc.start_mc.mouseEnabled = true;
  self.wave_mc.start_mc.cursor = "pointer";
  self.wave_mc.start_mc.removeEventListener("mousedown",startWaveAnimation)
  self.wave_mc.start_mc.addEventListener("mousedown",startWaveAnimation)
  console.log("activate buttons");
}



function startWaveAnimation1(){
  console.log("startWaveAnimation..."+ window.isEvenRound+"  currentWave   "+currentWave  +"  frequwave  "+freqWave+"   timerSelected  "+ timerSelected +"  selIntId  "+selIntId+"   frequencySelected "+ frequencySelected);
	if(frequencySelected !=undefined && timerSelect !=undefined){
  /*  freqWave = "";
    if(frequencySelected > 0){
      freqWave = frequencySelected;
    }*/


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

		var ele = eval("self.wave_mc.waveani"+currentWave+freqWave+"_mc");
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
		//	ele.framerate = totalFrames;
			frameToStop = totalFrames-1;
		}else if(selIntId == 3){
    //  ele.framerate = totalFrames;
		//	ele.framerate = totalFrames*2;
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
    setStopFrame(ele)
		ele.play();
		//ele.stop();
		clearInterval(tmpInt);
    console.log(" current frame   "+ ele.currentFrame+"   frequencySelected  "+ frequencySelected+"    frameToStop   : "+ frameToStop+"  cntr  "+cntr +"   timerSelected  "+ timerSelected );
		if(frequencySelected == 0.5){
			tmpInt = setInterval(function(){
			//	console.log("logele.currentFrame);
    var cf =   ele.currentFrame
    //  ele.gotoAndStop(cf+1)
       if(ele.currentFrame == 22 && frequencySelected == 0.5 && timerSelected == 1){
         console.log(" 22 frame");

          ele.gotoAndStop(23);


        }
        if(ele.currentFrame == 10  && frequencySelected == 0.5 && timerSelected == 1){
          console.log(" 22 frame");

          ele.gotoAndStop(11);

        }
				if(ele.currentFrame == frameToStop){
					cntr++;
					console.log("cntr :::::   >>>> ", cntr)
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
			},10)
		/*	},1/10000)*/
		}

		window.setTimeout(function(){
			// if(frequencySelected == "2.0"){
			// 	ele.gotoAndStop(0);
			// }else{
			// 	ele.stop();
			// }
			// if(timerSelected == 5)
			// 	window.isEvenRound = false;
			// console.log(ele.currentFrame)
			/*if(frequencySelected == 1.0||frequencySelected == 2.0){
				ele.gotoAndStop(23);
			}*/
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
function showScreenQuiz() {
    quesCntr = 0;
    showScreen8D()
}

function showScreen8D(){


  curQuesMC = ques[quesCntr];
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
    if(timerSelected == 1){
      frameToStop = stopinAry1[stopPos];
      curQuesMC.timecntmc.gotoAndStop("one")
    }else if(timerSelected == 5){
      frameToStop = stopinAry5[stopPos];
      curQuesMC.timecntmc.gotoAndStop("five")
    }
    updateStopPos()
		curQuesMC.start_mc.removeEventListener("mousedown",quest1to3WaveAnim);
		selIntId = 3;
		// createjs.Ticker.interval = eval("interval" + selIntId )
		curQuesMC.waveani1_mc.gotoAndStop(0)
		curQuesMC.waveani2_mc.gotoAndStop(0)
	/*	var anim1FrameRate = (curQuesMC.waveani1_mc.totalFrames)*2;
		var anim2FrameRate = (curQuesMC.waveani1_mc.totalFrames)*2;
		if(quesCntr == 2){
			anim2FrameRate = (curQuesMC.waveani1_mc.totalFrames);
		}
		curQuesMC.waveani1_mc.framerate = anim1FrameRate;
		curQuesMC.waveani2_mc.framerate = anim2FrameRate;
		if(quesCntr ==2){
			selIntId = 2;
			curQuesMC.waveani2_mc.framerate = eval("interval" + selIntId )/timerSelected;
		}*/
		curQuesMC.waveani1_mc.framerate = dFrate
		curQuesMC.waveani2_mc.framerate = dFrate
    curQuesMC.timecntmc.framerate = dFrate
    curQuesMC.waveani1_mc.play();
		curQuesMC.waveani2_mc.play();
    //timerStart1()
		curQuesMC.timecntmc.play()


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

		/*setTimeout(function(){
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
		},timerSelected*1000)*/
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
  console.log("next button ........");
	curQuesMC.next_btn.removeEventListener("mousedown",nextQues);
	curQuesMC.next_btn.gotoAndStop(1);
	setTimeout(function(){
		quesCntr++;
		curQuesMC = ques[quesCntr];
    console.log("   quesCntr   "+quesCntr);
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
function timerStart(ele){

//var fRate = createjs.Ticker.framerate
  clearInterval(timer);

  	timer = setInterval(function(){


      		console.log(timerCnt+" cframe   :::::  "+ele.currentFrame+"  frameToStop  "+frameToStop)

    if(ele.currentFrame == (frameToStop-1)){
      console.log("clear interval  ");
      clearInterval(timer);
      ele.stop();
      activeWaveButtons();
    }

		timerCnt++;
    //self.wave_mc.timecntmc
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


  },1)
}
