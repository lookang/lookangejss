import com.ddr.utils.Utils;
import mx.managers.FocusManager;

//Disc colors
_global.color1 = 0xcc99ff;
_global.color10 = 0xe5ccff;
_global.color100 = 0xcc00ff;

numBarA.type = "vertical";
numBarA.discLimit = 9;
numBarB.type = "horizontal";
numBarB.discLimit = 12;
__numA = "";
__numB = "";
dissector.hide();

var fm:FocusManager = new FocusManager();
fm.setFocus(numB);

numA.onChanged = function()
{
	if(Utils.messageDialogBoxShown) Utils.hideMessageDialogBox();
	if(__numA != "")
	{
		numBarA.number = __numA;
		if(!numBarA.arrangeDiscs()) {
			Utils.showMessageDialogBox("The number " + __numA + " requires the use of too many discs. Choose another number.");
			__numA = "";
			resultBar.clear();
			//mulDisp.reset();
		}
		else if(__numB != "") {
			resultBar.arrangeDiscs(numBarA.discs, numBarB.discs);
			//
			mulDisp.show(__numA, __numB);
			dissector.dissect(__numA, __numB);
			sideNote.hide();
		}		
	}
	else {
		numBarA.clear();
		resultBar.clear();
		dissector.hide();
	}	
}

numA.onKillFocus = function()
{
	if(__numA != "" && __numA <= 10)
	{
		Utils.showMessageDialogBox("Please key in a number greater than 10.");
		__numA = "";
		numBarA.clear();
		resultBar.clear();
	}
};

numA.onSetFocus = function()
{
	//trace("numA in focus.");
};

numB.onChanged = function()
{
	if(Utils.messageDialogBoxShown) Utils.hideMessageDialogBox();
	if(__numB != "")
	{
		numBarB.number = __numB;
		if(!numBarB.arrangeDiscs()) {
			Utils.showMessageDialogBox("The number " + __numB + " requires the use of too many discs. Choose another number.");
			__numB = "";
			resultBar.clear();
			//mulDisp.reset();
		}
		else if(__numA != "") {
			resultBar.arrangeDiscs(numBarA.discs, numBarB.discs);
			//
			mulDisp.show(__numA, __numB);
			dissector.dissect(__numA, __numB);
			sideNote.hide();
		}
	}
	else {
		numBarB.clear();
		resultBar.clear();
		dissector.hide();
	}
}

numB.onKillFocus = function()
{
	if(__numB != "" && __numB <= 10)
	{
		Utils.showMessageDialogBox("Please key in a number greater than 10.");
		__numB = "";
		numBarB.clear();
		resultBar.clear();
	}
};

/*nextBtn.onRelease = function()
{
	if(!isNaN(__numA) && __numA != 0) numBarA.number = __numA;
	if(!isNaN(__numB) && __numB != 0) numBarB.number = __numB;
	if(isNaN(__numA) || __numA == 0 || !numBarA.arrangeDiscs()) {
		//INVALID NUMBER IN A
		if(isNaN(__numA) || __numA == 0)
			Utils.showMessageDialogBox("Please enter a valid number.");
		else Utils.showMessageDialogBox("The number " + __numA + " requires the use of too many discs. Choose another number.");
	}
	else if(isNaN(__numB) || __numB == 0 || !numBarB.arrangeDiscs()) {
		//INVALID NUMBER IN B
		if(isNaN(__numB) || __numB == 0)
			Utils.showMessageDialogBox("Please enter a valid number.");
		else Utils.showMessageDialogBox("The number " + __numB + " requires the use of too many discs. Choose another number.");
	}
	else {
		resultBar.arrangeDiscs(numBarA.discs, numBarB.discs);
		mulDisp.show(__numA, __numB);
		dissector.dissect(__numA, __numB);
	}
};*/

resetBtn.onRelease = function()
{
	__numA = "";
	__numB = "";
	numBarA.clear();
	numBarB.clear();
	resultBar.clear();
	sideNote.hide();
	dissector.hide();
	dissector.reset();
	mulDisp.reset();
};

dissector.result1Btn.onRelease = function()
{
	/*numBarA.highlight();
	numBarB.highlight(0);*/
	resultBar.highlight(Math.floor(numBarB.number / 10));
	sideNote.show(__numA, __numB % 10,"R1");
};
dissector.result2Btn.onRelease = function()
{
	/*numBarA.highlight();
	numBarB.highlight(1);*/
	resultBar.highlight(0, Math.floor(numBarB.number / 10) - 1);
	sideNote.show(__numA, Math.floor(__numB / 10) * 10,"R2");
};
dissector.finalResultBtn.onRelease = function()
{
	/*numBarA.highlight();
	numBarB.highlight();*/
	resultBar.highlight(0);
	sideNote.showFinal(dissector.__result1, dissector.__result2);
};