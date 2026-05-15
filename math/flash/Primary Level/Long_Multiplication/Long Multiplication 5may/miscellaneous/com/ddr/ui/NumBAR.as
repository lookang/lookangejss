import mx.utils.Delegate;
import com.ddr.ui.Disc;

class com.ddr.ui.NumBAR extends MovieClip
{
	private var previewDisc:MovieClip;
	private var __type:String;
	var discLimit:Number;
	var number:Number;
	private var __gap:Number;
	private var highlightMov:MovieClip;
		
	var discs:Array;
		
	function NumBAR()
	{
		previewDisc._visible = false;
		type = "horizontal";
		__gap = 7;
		//trace("From constructor of NumBAR");
	}
	
	function arrangeDiscs():Boolean
	{
		//trace("Total discs >> " + (Math.floor(number / 10) + (number % 10)));
		var totalDiscs:Number = Math.floor(number / 10) + (number % 10);
		if(totalDiscs > discLimit) {
			clear();
			return false;
		}
		
		var xPos:Number = 0;
		var yPos:Number = 0;
		
		clear();
		discs = new Array();
		for(var i:Number = 1; i <= totalDiscs; i++)
		{
			var disc:Disc = Disc(this.attachMovie("Disc", "disc-" + i, this.getNextHighestDepth(), {_x:xPos, _y:yPos}));
			if(type == "horizontal") xPos += disc._width + __gap;
			else yPos += disc._height + __gap;
			if(i <= Math.floor(number / 10)) disc.number = 10;
			else disc.number = 1;
			discs.push(disc);
		}
		
		return true;
	}
	
	function clear():Void
	{
		discs = null;
		highlightMov.removeMovieClip();
		for(var i:Number = (this.getNextHighestDepth() - 1); i >= 0; i--)
		{
			Disc(this.getInstanceAtDepth(i)).removeMovieClip();
		}
	}
	
	function get type():String
	{
		return __type;
	}
	
	function set type(value:String):Void
	{
		__type = value.toLowerCase();
	}
	
	/**
	 * @param mode If 0, 1's are highlighted. If 1, 10's are highlighted. Otherwise, all the discs are
	 * highlighted.
	 */
	function highlight(mode:Number):Void
	{
		if(highlightMov) highlightMov.removeMovieClip();
		highlightMov = createEmptyMovieClip("hm", this.getNextHighestDepth());
		highlightMov.lineStyle(3, 0xFF0000);
		
		var xPos:Number = 0;
		var width:Number = this.getBounds().xMax;
		
		if(mode == undefined)
			;
		else if(mode == 0)
			xPos = discs[Math.floor(number / 10)]._x;
		else if(mode == 1)
			width = discs[Math.floor(number / 10) - 1]._x + discs[Math.floor(number / 10) - 1]._width;			
		
		with(highlightMov)
		{
			moveTo(xPos, 0);
			lineTo(width, 0);
			lineTo(width, _parent.getBounds().yMax);
			lineTo(xPos, _parent.getBounds().yMax);
			lineTo(xPos, 0);
		}
		
		for(var indx in discs) discs[indx]._alpha = 100;
		if(mode == 0)
			for(var i:Number = 0; i < Math.floor(number / 10); i++ )
				discs[i]._alpha = 30;
		else if(mode == 1)
			for(var i:Number = Math.floor(number / 10); i < discs.length; i++ )
				discs[i]._alpha = 30;
	}
}