import com.ddr.ui.ExtendedNote;
import mx.utils.Delegate;
import mx.transitions.Tween;
import mx.transitions.easing.*;
import com.mosesSupposes.fuse.*;
import com.ddr.ui.NumBAR;
import com.ddr.ui.ResultBAR;

class com.ddr.ui.SideNote extends MovieClip
{
	var separator1:MovieClip;
	var separator2:MovieClip;
	var mulSign:MovieClip;
	var addSign:MovieClip;
	var result1:TextField;
	var result2:TextField;
	var result:TextField;
	var __num1:Number;
	var __num2:Number;
	var __result1:Number;
	var __result2:Number;
	var __result:Number;
	var __carryOver:Number;
	var __note:String;
	var carryOverBtn:MovieClip;
	private var carryOver:TextField;
	private var closeBtn:MovieClip;
	var xNote:ExtendedNote;
	var reAbout:String;
	
	private var resultBar:ResultBAR;
	private var numBarA:NumBAR;
	private var numBarB:NumBAR;
	//
	private var cogi:Number;	//carryOver glow interval
	private var glowStrength:Number;	//carryOver glow strength
	
	function SideNote()
	{
		resultBar = _parent.resultBar;
		numBarA = _parent.numBarA;
		numBarB = _parent.numBarB;
		
		ZigoEngine.register(PennerEasing, Fuse, FuseFMP);
		ZigoEngine.simpleSetup(Shortcuts, PennerEasing, FuseFMP);
		glowStrength = 2;
		
		xNote.hide();
		carryOverBtn.onRollOver = Delegate.create(this, carryOverBtn_onRollOver);
		carryOverBtn.onRollOut = Delegate.create(this, carryOverBtn_onRollOut);
		closeBtn.onRelease = Delegate.create(this, hide);
		hide();
	}
	
	function show(num1:Number, num2:Number,reAboutTmp:String):Void
	{
		//trace("ABOUT of show function : "+reAboutTmp);
		reAbout = reAboutTmp;
		reset();
		this._visible = true;
		__note = "Multiply " + num1 + " by " + num2 + ":";
		__num1 = num1;
		__num2 = num2;
		__result1 = __num1 * (__num2 % 10);
		__result2 = __num1 * (Math.floor(__num2 / 10) * 10);
		__result = __num1 * __num2;
		
		if(__num2 % 10 == 0) __carryOver = Math.floor(((__num1 % 10) * (__num2 / 10)) / 10);
		else __carryOver = Math.floor(((__num1 % 10) * __num2) / 10);
		if(__carryOver > 0)
		{
			carryOver._visible = true;
			carryOverBtn.useHandCursor = true;
			carryOverBtn.onRollOver = Delegate.create(this, carryOverBtn_onRollOver);
			carryOverBtn.onRollOut = Delegate.create(this, carryOverBtn_onRollOut);
		}
		/*carryOver.Glow_color = 0xFF9900;
		carryOver.Glow_strength = 2;
		carryOver.Glow_blur = 10;
		startGlowingCarryOver();*/
	}
	
	function showFinal(num1:Number, num2:Number):Void
	{
		reset();
		this._visible = true;
		__note = "Add the products:";
		__num1 = num1;
		__num2 = num2;
		__result1 = __num1 + __num2;
		result2._visible = false;
		result._visible = false;
		result2._visible = false;
		separator2._visible = false;
		mulSign._visible = false;
		addSign._visible = true;
		//__result1 = __num1 * (__num2 % 10);
		//__result2 = __num1 * (Math.floor(__num2 / 10) * 10);
		//__result = __num1 * __num2;
	}
	
	function carryOverBtn_onRollOver()
	{
		//trace("About SideHote function : "+reAbout);
		resultBar.showSubHighlight(reAbout);
		xNote.show(/*(__num2 >=10)? __num1 : */__num1 % 10, __num2);
		//stopGlowingCarryOver();
	}
	
	function carryOverBtn_onRollOut()
	{
		xNote.hide();	
		resultBar.removeSubHighlight(reAbout);
	}
	
	function reset():Void
	{
		xNote.reset();
		xNote.hide();
		stopGlowingCarryOver();
		__num1 = 0;
		__num2 = 0;
		__result1 = 0;
		__result2 = 0;
		__result = 0;
		__carryOver = 0;
		carryOver._visible = false;
		carryOverBtn.onRollOver = null;
		carryOverBtn.onRollOut = null;
		carryOverBtn.useHandCursor = false;
		__note = "";
		result2._visible = true;
		result._visible = true;
		separator1._visible = true;
		separator2._visible = true;
		mulSign._visible = true;
		addSign._visible = false;
	}
	
	function hide():Void
	{
		reset();
		this._visible = false;
	}
	
	function startGlowingCarryOver():Void
	{
		cogi = setInterval(Delegate.create(this, function()
		{
			glowStrength = (glowStrength == 5)? 2 : 5;
			ZigoEngine.doTween(carryOver, "Glow_strength", [glowStrength, 1], 0.5, Regular.easeOut, 0, null);
		}), 1000);
	}
	
	function stopGlowingCarryOver():Void
	{
		clearInterval(cogi);
		ZigoEngine.removeTween(carryOver, "Glow_strength");
		carryOver.Glow_color = null;
		carryOver.Glow_strength = null;		
	}
}