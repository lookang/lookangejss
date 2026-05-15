
var self;
var frameAni;
function setScope(scope) {
  self = scope;

  setTimeout(function () {
    initActivity();
    self.blocker.cursor = "default";
  }, 10);

}
function initActivity(){
	console.log("activity called");
  self.blocker.cursor = "default";
  self.blocker.visible = true;
  //self.startscreen_mc.playbtn.visible=true;
  // self.startscreen_mc.playbtn.visible=true;
    self.startscreen_mc.next_btn.cursor = "pointer"
  self.startscreen_mc.next_btn.addEventListener("mousedown",hideStartScreen);
  self.audiomc.gotoAndPlay("1_VO1");

}

function hideStartScreen(){
  self.startscreen_mc.next_btn.removeEventListener("mousedown",hideStartScreen);
  self.startscreen_mc.next_btn.gotoAndStop(1);
  setTimeout(function(){
    self.startscreen_mc.visible=false;
    self.twoa_mc.visible=true;
    self.twoa_mc.wrong_mc.visible=false;
    self.twoa_mc.correct_mc.visible=false;
    self.twoa_mc.tryagain_mc.visible=false;
    self.twoa_mc.rightarm_btn.visible = false;
    self.twoa_mc.leftarm_btn.visible = false;
    self.blocker.visible = true;
    self.audiomc.gotoAndPlay("2a_VO1");
    animateGordonHand();
  },1000)
}
function endOfAudio(val){}

function endOfAudio1(val){
  self.blocker.visible = false;
  if(val=="1_VO1"){
    self.startscreen_mc.next_btn.cursor="pointer";
  }else if(val=="2a_VO1"){
    self.startscreen_mc.next_btn.cursor="pointer";
    self.twoa_mc.rightarm_btn.visible = true;
    self.twoa_mc.rightarm_btn.cursor="pointer";
    self.twoa_mc.leftarm_btn.visible = true;
    self.twoa_mc.leftarm_btn.cursor="pointer";
    self.twoa_mc.rightarm_btn.addEventListener('mousedown',armRightClicked)
    self.twoa_mc.leftarm_btn.addEventListener('mousedown',armLeftClicked)
  }else if(val =="3a_VO1"){
    self.blocker.visible=true;
  }
}

function animateGordonHand(){
  //self.twoa_mc.boy_mc.framerate *= 0.5; // lookang
  self.twoa_mc.boy_mc.gotoAndStop("play");
}

function armRightClicked(){
  self.twoa_mc.rightarm_btn.removeEventListener('mousedown',armRightClicked)
  self.twoa_mc.leftarm_btn.gotoAndStop(0);
  self.twoa_mc.rightarm_btn.gotoAndStop(1);
  self.blocker.visible=true;
  self.twoa_mc.boy_mc.gotoAndStop("wrong");
  self.twoa_mc.wrong_mc.visible=true;
  self.twoa_mc.correct_mc.visible=false;
  self.twoa_mc.tryagain_mc.visible=true;
  self.audiomc.gotoAndPlay("2b_VO1");
  setTimeout(function(){
    self.twoa_mc.rightarm_btn.gotoAndStop(0);
    self.blocker.visible=false;
    animateGordonHand();
    self.twoa_mc.wrong_mc.visible=false;
    self.twoa_mc.tryagain_mc.visible=false;
    self.twoa_mc.rightarm_btn.addEventListener('mousedown',armRightClicked)
  },3000)

}
function armLeftClicked(){
  self.twoa_mc.rightarm_btn.removeEventListener('mousedown',armRightClicked)
  self.twoa_mc.leftarm_btn.removeEventListener('mousedown',armLeftClicked)
  self.twoa_mc.leftarm_btn.gotoAndStop(1);
  self.twoa_mc.rightarm_btn.gotoAndStop(0);
  self.blocker.visible=true;
  self.twoa_mc.boy_mc.gotoAndStop("correct");
  self.twoa_mc.correct_mc.visible=true;
  self.audiomc.gotoAndPlay("3a_VO1");
  setTimeout(function(){
    window.location.href= "frequency_4a.html";
  },3000)
}
