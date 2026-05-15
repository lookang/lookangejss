import com.ddr.ui.Dissector;
import com.ddr.ui.MulDisp;
import com.ddr.ui.Disc;
import mx.transitions.Tween;
import mx.transitions.easing.*;
import com.mosesSupposes.fuse.*;
import mx.utils.Delegate;

class com.ddr.ui.ExtendedNote extends MovieClip
{
	private var __num1:Number;
	private var __num2:Number;
	
	var mulDisp:MulDisp;
	private var discs:Array;
	private var iDiscs:Array;
	private var margin:Number;
	private var xPos:Number;
	private var yPos:Number;
	private var glowCounter:Number;
	private var interval_id:Number;
	
	function ExtendedNote()
	{
		ZigoEngine.register(PennerEasing, Fuse, FuseFMP);
		discs = new Array();
		iDiscs = new Array();
	}
	
	function show(num1:Number, num2:Number):Void
	{
		this._visible = true;
		__num1 = num1;
		__num2 = num2;
		mulDisp.show(__num1, __num2);
		mulDisp.startGlowing();
		
		var disc:Disc = null;
		margin = 10;
		xPos = margin;
		yPos = 35;
		glowCounter = 0;
		var colCounter:Number = (Math.floor(__num2 / 10) != 0)? Math.floor(__num2 / 10) : __num2;
				
		var glowColors:Array = new Array(0xFF0000, 0xFF00FF, 0x00FFFF, 0x00FF00, 0xFF9900, 0xCCCC66, 0x99FF00, 0xCCCCCC, 0x66FF99);
		var indx:Number = 0;
		var glowColor:Number = glowColors[indx];
		var __counter:Number = 0;
		for(var row:Number = 0; row < __num1; row++)
		{
			for(var col:Number = 0; col < colCounter; col++)
			{
				if(Math.floor((/*__num1 * */__num2) / 10) != 0)	//__num2 is >= 10
					disc = Disc(this.attachMovie("Disc", "disc10-" + row + "_" + col, this.getNextHighestDepth(), {_x:xPos, _y:yPos, number:10, _width:20, _height:20}));
				else
					disc = Disc(this.attachMovie("Disc", "disc-" + row + "_" + col, this.getNextHighestDepth(), {_x:xPos, _y:yPos, number:1, _width:20, _height:20}));
				xPos += disc._width + 2;
				discs.push(disc);
				__counter++;
				//trace(__counter);
				if((__counter - 1) % 10 == 0) glowColor = glowColors[indx++];
				if(
					((Math.floor(__num2 / 10) == 0) && (__counter <= Math.floor((__num1 * __num2) / 10) * 10)) || 
					(((__num1 * __num2) % 10 == 0) && (__counter <= Math.floor((__num1 * __num2) / 100) * 10))				
				) {
				
					FuseFMP.setFilterProps(disc, {Glow_color:0xFFFFFF, Glow_alpha:0});
					ZigoEngine.doTween(disc, "Glow_color, Glow_alpha", [glowColor, 1], 2, Regular.easeOut, 1, Delegate.create(this, glowingFinished));					
				}
			}
			yPos += disc._height + 2;
			xPos = 10;
		}
	}
	
	private function glowingFinished():Void
	{
		glowCounter++;
		if(
			((Math.floor(__num2 / 10) == 0) && (glowCounter == Math.floor((__num1 * __num2) / 10) * 10)) || 
			(((__num1 * __num2) % 10 == 0) && (glowCounter == Math.floor((__num1 * __num2) / 100) * 10))		
		) {
			margin = 10;
			xPos = margin;
			yPos = 35;
			glowCounter = 0;
			startDisintegrating();
		}
	}
	
	private function startDisintegrating():Void
	{
		if(discs.length >= 10)
			interval_id = setInterval(this, "disintegrate", 500);
	}
	
	private function disintegrate():Void
	{
		clearInterval(interval_id);
		//trace("Interval cleared! " + glowCounter);
		var blackHoleDisc:Disc = discs[glowCounter];
		for(var i:Number = glowCounter + 1; i < (glowCounter + 10); i++)
		{
			//trace("discs[" + i + "] >> " + discs[i]);
			ZigoEngine.doTween(discs[i], "Glow_color, Glow_alpha, _x, _y, _alpha", [0xFFFFFF, 0, blackHoleDisc._x, blackHoleDisc._y, 0], 1, Regular.easeOut, 0, {scope:this, func:"disintegrateFinished", args:discs[i]});
		}
	}
	
	private function disintegrateFinished(disc:Disc):Void
	{
		glowCounter++;
		disc.removeMovieClip();
		if((glowCounter + 1) % 10 == 0)
		{
			glowCounter++;
			var iDisc:Disc;
			if(Math.floor(__num2 / 10) != 0)
				iDisc = Disc(this.attachMovie("Disc", "disc100-" + glowCounter / 10, this.getNextHighestDepth(), {_x:discs[glowCounter - 10]._x, _y:discs[glowCounter - 10]._y, number:100, _width:20, _height:20}));
			else
				iDisc = Disc(this.attachMovie("Disc", "disc10-" + glowCounter / 10, this.getNextHighestDepth(), {_x:discs[glowCounter - 10]._x, _y:discs[glowCounter - 10]._y, number:10, _width:20, _height:20}));
			discs[glowCounter - 10].removeMovieClip();
			ZigoEngine.doTween(iDisc, "_x, _y", [xPos, yPos], 0.5, Regular.easeOut, 0.2, null);
			
			iDiscs.push(iDisc);
			xPos += iDisc._width + 2;
			if(xPos > (this._width - margin * 2))
			{
				xPos = margin;
				yPos += iDisc._height + 2;
			}
			
			if(
				((Math.floor(__num2 / 10) == 0) && (glowCounter < Math.floor((__num1 * __num2) / 10) * 10)) || 
				(((__num1 * __num2) % 10 == 0) && (glowCounter < Math.floor((__num1 * __num2) / 100) * 10))		
			) {
				startDisintegrating();
			}
			else {
				xPos = margin;
				yPos += iDisc._height + 2;
				for(var i:Number = glowCounter; i < discs.length; i++)
				{
					ZigoEngine.doTween(discs[i], "_x, _y", [xPos, yPos], 0.5, Regular.easeOut, 0.2, null);
					//discs[i]._x = xPos;
					//discs[i]._y = yPos;
					xPos += discs[i]._width + 2;
					if(xPos > (this._width - margin * 2))
					{
						xPos = margin;
						yPos += discs[i]._height + 2;
					}
				}
			}
		}
	}
	
	function reset():Void
	{
		mulDisp.reset();
		for(var indx in discs) discs[indx].removeMovieClip();
		for(var indx in iDiscs) iDiscs[indx].removeMovieClip();
		discs = new Array();
		iDiscs = new Array();
	}
	
	function hide():Void
	{
		reset();
		this._visible = false;
	}
}