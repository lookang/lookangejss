class com.ddr.utils.Utils
{
	private static var disableScreen:MovieClip;
	private static var msgBox:MovieClip;
	static var messageDialogBoxShown:Boolean = false;
	
	function Utils()
	{
	
	}
	
	static function disableAll():Void
	{
		if(disableScreen == undefined || disableScreen == null)
		{
			disableScreen = _root.createEmptyMovieClip("disableScreen", _root.getNextHighestDepth());
			
			with(disableScreen)
			{
				clear();
				moveTo(0, 0);
				beginFill(0xFFFFFF, 50);
				lineTo(Stage.width, 0);
				lineTo(Stage.width, Stage.height);
				lineTo(0, Stage.height);
				lineTo(0, 0);
			}
			
			disableScreen.onRelease = function(){};
			disableScreen.useHandCursor = false;
		}
		
		disableScreen._visible = true;
		disableScreen.swapDepths(_root.getNextHighestDepth());
	}
	
	static function enableAll():Void
	{
		disableScreen._visible = false;
	}
	
	static function showMessageDialogBox(messageText:String):Void
	{
		disableAll();
		if(msgBox == undefined || msgBox == null) {
			msgBox = _root.attachMovie("MessageDialogBox", "smdb", _root.getNextHighestDepth(), {_x:(Stage.width / 2), _y:(Stage.height / 2)});
			//Filters.applySystemShadow(msgBox);
			msgBox.useHandCursor = disableScreen.useHandCursor = false;
			msgBox.onRelease = disableScreen.onRelease = hideMessageDialogBox;
		}
		
		msgBox.message.autoSize = true;
		msgBox._visible = true;
		msgBox.swapDepths(_root.getNextHighestDepth());
		
		msgBox.message.text = messageText;
		
		msgBox.message._y = 0;
		msgBox.message._y -= msgBox.message._height / 2;
		
		messageDialogBoxShown = true;
	}
	
	static function hideMessageDialogBox():Void
	{
		_root.smdb._visible = false;
		enableAll();
		
		messageDialogBoxShown = false;
	}
}