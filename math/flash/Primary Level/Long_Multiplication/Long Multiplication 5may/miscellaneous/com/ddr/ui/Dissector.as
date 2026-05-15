import mx.events.EventDispatcher;
import mx.utils.Delegate;
import mx.transitions.Tween;
import mx.transitions.easing.*;
import com.mosesSupposes.fuse.*;

class com.ddr.ui.Dissector extends MovieClip
{
	var __numA:Number;
	var __numB:Number;
	var __result1:Number;
	var __result2:Number;
	var __finalResult:Number;
	var result1Btn:MovieClip;
	var result2Btn:MovieClip;
	var finalResultBtn:MovieClip;
	
	private var result1:TextField;
	private var result2:TextField;
	private var finalResult:TextField;
	
	private var cogi:Number;	//glow interval
	private var glowStrength:Number;	//glow strength
	
	function Dissector()
	{
		glowStrength = 2;
		ZigoEngine.register(PennerEasing, Fuse, FuseFMP);
		FuseFMP.setFilterProps([result1, result2, finalResult], 'Glow', { Glow_color:0xFF9900, Glow_strength:2, Glow_blur:10 });
		startGlowing();
	}
	
	function hide():Void
	{
		_visible = false;
		//stopGlowing();
	}
	
	function show():Void
	{
		_visible = true;		
	}
	
	function dissect(a:Number, b:Number):Void
	{
		__numA = (a)? a : 0;
		__numB = (b)? b : 0;
		
		__result1 = __numA * (__numB % 10);
		__result2 = __numA * 10 * (Math.floor(__numB / 10));
		__finalResult = __result1 + __result2;
		show();
	}
	
	function reset():Void
	{
		__numA = 0;
		__numB = 0;
		__result1 = 0;
		__result2 = 0;
		__finalResult = 0;
	}
	
	function startGlowing():Void
	{
		//stopGlowing();
		cogi = setInterval(Delegate.create(this, function()
		{
			glowStrength = (glowStrength == 5)? 2 : 5;
			ZigoEngine.doTween([result1, result2, finalResult], "Glow_strength", [glowStrength], 0.5, Regular.easeOut, 0, null);
		}), 500);
	}
	
	function stopGlowing():Void
	{
		clearInterval(cogi);
		ZigoEngine.removeTween([result1, result2, finalResult]);		
	}
}