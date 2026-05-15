import mx.utils.Delegate;
import mx.transitions.Tween;
import mx.transitions.easing.*;
import com.mosesSupposes.fuse.*;

class com.ddr.ui.MulDisp extends MovieClip
{
	var numDispA:TextField;
	var numDispB:TextField;
	var resultDisp:TextField;
	var __numDispA:Number;
	var __numDispB:Number;
	var __resultDisp:Number;
	
	private var gi:Number;	//carryOver glow interval
	private var glowStrength:Number;	//carryOver glow strength
	
	function MulDisp()
	{
		ZigoEngine.register(PennerEasing, Fuse, FuseFMP);
		ZigoEngine.simpleSetup(Shortcuts, PennerEasing, FuseFMP);
		glowStrength = 2;
	}
	
	function reset():Void
	{
		__numDispA = 0;
		__numDispB = 0;
		__resultDisp = __numDispA * __numDispB;
		stopGlowing();
	}
	
	function show(a:Number, b:Number):Void
	{
		reset();
		__numDispA = (a)? a : 0;
		__numDispB = (b)? b : 0;
		__resultDisp = __numDispA * __numDispB;
	}
	
	function startGlowing():Void
	{
		numDispA.Glow_color = numDispB.Glow_color = 0xFF9900;
		numDispA.Glow_strength = numDispB.Glow_strength = 2;
		numDispA.Glow_blur = numDispB.Glow_blur = 10;
		gi = setInterval(Delegate.create(this, function()
		{
			glowStrength = (glowStrength == 5)? 2 : 5;
			ZigoEngine.doTween([numDispA, numDispB], "Glow_strength", [glowStrength, 1], 0.5, Regular.easeOut, 0, null);
		}), 1000);
	}
	
	function stopGlowing():Void
	{
		clearInterval(gi);
		ZigoEngine.removeTween([numDispA, numDispB], "Glow_strength");
		numDispA.Glow_color = numDispB.Glow_color = null;
		numDispA.Glow_strength = numDispB.Glow_strength = null;		
	}
}