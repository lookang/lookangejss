import flash.geom.ColorTransform;
import mx.utils.Delegate;

class com.ddr.ui.Disc extends MovieClip
{
	private var __number:Number;
	private var discBG1:MovieClip;
	private var discBG10:MovieClip;
	private var discBG100:MovieClip;
	static var WIDTH:Number;
	static var HEIGHT:Number;
	var discBG:MovieClip;
	
	function Disc()
	{
		WIDTH = _width;
		HEIGHT = _height;
	}
	
	function get number():Number
	{
		return __number;
	}
	
	function set number(value:Number):Void
	{
		__number = value;
		
		var ct:ColorTransform = new ColorTransform();
		switch(__number)
		{
			case 1:
				//ct.rgb = _global.color1;
				discBG10._visible = false;
				discBG100._visible = false;
				break;
			case 10:
				//ct.rgb = _global.color10;
				discBG1._visible = false;
				discBG100._visible = false;
				break;
			case 100:
				//ct.rgb = _global.color100;
				discBG1._visible = false;
				discBG10._visible = false;
				break;
		}
		
		//discBG.transform.colorTransform = ct;
	}
}