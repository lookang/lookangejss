units = new Array("m", "V", "W", "A", "J");

prefixBoxes = new Array("picoBox", "nanoBox", "microBox", "milliBox", "kiloBox", "MegaBox", "GigaBox", "TeraBox");

numberBoxes = new Array("OneBox", "TwoBox", "ThreeBox");

/* called by onLoad */

function initialize(){

	/* Initial Conditions */
	
		
	theCanvas = document.getElementById("CanvasOne");
	ctx = theCanvas.getContext("2d");
	
}

/* Called by the Begin Button */

function LoadIt(){
	document.getElementById("LabSection").style.visibility = "visible";
	document.getElementById("OverviewSection").style.visibility = "hidden";
	document.getElementById("EndButton").style.visibility = "hidden";
	document.getElementById("RestartButton").style.visibility = "hidden";
	
	
	document.getElementById("GameOverMessage").style.visibility = "hidden";
	
	document.getElementById("PrefixArea").style.visibility = "visible";
	document.getElementById("NewNumberArea").style.visibility = "visible";
	document.getElementById("CheckBox").style.visibility = "visible";
	
	GameOver = "no";
	setTimeout("gameover();" , 60000);
	Score = 0;
	GenerateProblem();
	
}

function GenerateProblem(){
	
	TypeOfProblem = Math.floor(Math.random()*8);
	ThreeDigit = Math.floor(Math.random()*899 + 100);
	NumberPlaces = Math.floor(Math.random()*3);
	unitnumber = Math.floor(Math.random()*units.length);
	
	if (NumberPlaces == 0){
		ThreeDigitAnswer = ThreeDigit/100;
	}
	else if (NumberPlaces == 1){
		ThreeDigitAnswer = ThreeDigit/10;
	}
	else{
		ThreeDigitAnswer = ThreeDigit;
	}
	
	if (TypeOfProblem == 0){
		FrontNumber = ThreeDigit/100;
		BackNumber = 12 - NumberPlaces;
		displaytext = FrontNumber + "e-" + BackNumber + " " + units[unitnumber];
		answerbox = 0;
	}
	else if (TypeOfProblem == 1){
		FrontNumber = ThreeDigit/100;
		BackNumber = 9 - NumberPlaces;
		displaytext = FrontNumber + "e-" + BackNumber + " " + units[unitnumber];
		answerbox = 1; 
	}
	else if (TypeOfProblem == 2){
		FrontNumber = ThreeDigit/100;
		BackNumber = 6 - NumberPlaces;
		displaytext = FrontNumber + "e-" + BackNumber + " " + units[unitnumber];
		answerbox = 2;
	}
	else if (TypeOfProblem == 3){
		divisor = Math.pow(10, (5 - NumberPlaces));
		displaynumber = ThreeDigit/divisor;
		displaytext = displaynumber.toFixed(6) + " " + units[unitnumber];
		answerbox = 3;
	}
	else if (TypeOfProblem == 4){
		multiplier = Math.pow(10, (1 + NumberPlaces));
		displaynumber = ThreeDigit*multiplier;
		displaytext = displaynumber.toFixed(0) + " " + units[unitnumber];
		answerbox = 4;
	}
	else if (TypeOfProblem == 5){
		FrontNumber = ThreeDigit/100;
		BackNumber = 6 + NumberPlaces;
		displaytext = FrontNumber + "e" + BackNumber + " " + units[unitnumber];
		answerbox = 5;
	}
	else if (TypeOfProblem == 6){
		FrontNumber = ThreeDigit/100;
		BackNumber = 9 + NumberPlaces;
		displaytext = FrontNumber + "e" + BackNumber + " " + units[unitnumber];
		answerbox = 6; 
	}
	else{
		FrontNumber = ThreeDigit/100;
		BackNumber = 12 + NumberPlaces;
		displaytext = FrontNumber + "e" + BackNumber + " " + units[unitnumber];
		answerbox = 7;
	}
	one = ThreeDigit/100;
	document.getElementById("OneBox").innerHTML = one.toFixed(2);
	
	two = ThreeDigit/10;
	document.getElementById("TwoBox").innerHTML = two.toFixed(1);
	
	three = ThreeDigit/1;
	document.getElementById("ThreeBox").innerHTML = three.toFixed(0);

	for (i = 0; i < 8; i++){
		document.getElementById(prefixBoxes[i]).style.backgroundColor = "#FFFFFF";
		document.getElementById(prefixBoxes[i]).style.color = "#000000";
	}
	for (i = 0; i < 3; i++){
		document.getElementById(numberBoxes[i]).style.backgroundColor = "#FFFFFF";
		document.getElementById(numberBoxes[i]).style.color = "#000000";
	}
		
	drawingpart();

}




function EndSimulation(){
	
	
	document.getElementById("AnswerSection").style.visibility = "visible";
	document.getElementById("LabSection").style.visibility = "hidden";
	document.getElementById("EndButton").style.visibility = "hidden";
	document.getElementById("RestartButton").style.visibility = "hidden";
	document.getElementById("GameOverMessage").style.visibility = "hidden";
	document.getElementById("ScoreAtEnd").innerHTML = Score;
	
}

function drawingpart(){
			
	/* 	background drawing */

	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0,900,600);
	
	if (GameOver == "no"){
		ctx.font="42px Arial";
		ctx.fillStyle="#000000";
		temptext = "Convert this number to one with a metric prefix";
		metrics = ctx.measureText(temptext);
		textWidth = metrics.width;
		xposition = 450 - textWidth/2;
		ctx.fillText(temptext,xposition, 50);
	
		
		ctx.font="42px Arial";
		ctx.fillStyle="#990000";
		temptext = displaytext;
		metrics = ctx.measureText(temptext);
		textWidth = metrics.width;
		xposition = 450 - textWidth/2;
		ctx.fillText(temptext,xposition, 150);

	}
			
	DisplayScore();
}


function SubmitForm(){
	document.getElementById("ReturnMessage").style.visibility = "visible";
	document.getElementById("SpaceForAnswer").style.visibility = "hidden";
	document.getElementById("ReturnName").innerHTML = "Metric Challenge: " + document.getElementById("StudentName").value;
	Response1 = Score;
	
	document.getElementById("ReturnResultGood").style.visibility = "visible";
	
	document.getElementById("Return1").innerHTML = "Score:  " + Response1;
	
	
	d = new Date();
	nowtime = d.getTime();
	
	document.getElementById("FinishTime").innerHTML = nowtime;
	document.getElementById("FinishTime").style.visibility = "visible";
	
}

function DrawSign(){
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 900, 350);
}

function DrawLetter(LE, x, y){
	LE = eval(LE);
	for (i=0; i<7; i++){
		for (j=0; j<5; j++){
			count = j+5*i;
			if (LE[count] == 1){
				ctx.fillStyle = "#ff7315";
				ctx.beginPath();
				ctx.arc(x+j*10+5, y+i*10+5, 5, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
			else{
			}
			
		}
	}
}

function GuessNumber(x){
	for (i = 0; i < 3; i++){
		document.getElementById(numberBoxes[i]).style.backgroundColor = "#FFFFFF";
		document.getElementById(numberBoxes[i]).style.color = "#000000";
	}
	document.getElementById(numberBoxes[x]).style.backgroundColor = "#990000";
	document.getElementById(numberBoxes[x]).style.color = "#FFFFFF";
	number = x;
}


function GuessPrefix(x){
	for (i = 0; i < 8; i++){
		document.getElementById(prefixBoxes[i]).style.backgroundColor = "#FFFFFF";
		document.getElementById(prefixBoxes[i]).style.color = "#000000";
	}
	document.getElementById(prefixBoxes[x]).style.backgroundColor = "#990000";
	document.getElementById(prefixBoxes[x]).style.color = "#FFFFFF";
	prefixanswer = x;
}

function DisplayScore(){
	ctx.font="36px Arial";
	ctx.fillStyle="#990000";
	temptext = "Score: " + Score;
	metrics = ctx.measureText(temptext);
	textWidth = metrics.width;
	xposition = 225 - textWidth/2;
	ctx.fillText(temptext,xposition, 550);
}

function Check(){
	if (NumberPlaces == number && answerbox == prefixanswer){
		Score++;
		GenerateProblem();
	}
	else{
		Score = 0;
		document.getElementById(prefixBoxes[answerbox]).style.backgroundColor = "#009900";
		document.getElementById(prefixBoxes[answerbox]).style.color = "#FFFFFF";
		document.getElementById(numberBoxes[NumberPlaces]).style.backgroundColor = "#009900";
		document.getElementById(numberBoxes[NumberPlaces]).style.color = "#FFFFFF";
		drawingpart();
	}
	
}

function gameover(){
	GameOver = "yes";
	
	document.getElementById("PrefixArea").style.visibility = "hidden";
	document.getElementById("NewNumberArea").style.visibility = "hidden";
	document.getElementById("CheckBox").style.visibility = "hidden";
	
	document.getElementById("EndButton").style.visibility = "visible";
	document.getElementById("RestartButton").style.visibility = "visible";
	document.getElementById("GameOverMessage").style.visibility = "visible";
	
	
	
	
	drawingpart();
}