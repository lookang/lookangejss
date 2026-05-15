import flash.geom.ColorTransform;
import mx.utils.Delegate;
import com.ddr.ui.Disc;
import flash.utils.setTimeout;
import com.ddr.ui.NumBAR;

class com.ddr.ui.ResultBAR extends NumBAR
{
	private var noOfRows:Number;
	private var noOfColumns:Number;
	private var cellGroupContainer:MovieClip;
	private var gi:Number;
	private var discs:Array;
	
	function ResultBAR()
	{
		type = "table";
		//trace("From constructor of ResultBAR >> type : " + type);
	}
	
	function arrangeDiscs(numbersA:Array, numbersB:Array):Void
	{

		noOfRows = numbersA.length;
		noOfColumns = numbersB.length;
		
		var xPos:Number = 0;
		var yPos:Number = 0;
		
		clear();
		discs = new Array();
		for(var a:Number = 0; a < numbersA.length; a++)
		{
			var discRow:Array = new Array();
			for(var b:Number = 0; b < numbersB.length; b++)
			{
				var disc:Disc = Disc(this.attachMovie("Disc", "disc-" + a + "_" + b, this.getNextHighestDepth(), {_x:xPos, _y:yPos}));
				xPos += disc._width + __gap;
				
				disc.number = numbersA[a].number * numbersB[b].number;
				discRow.push(disc);
				//trace("numbersA[a].number * numbersB[b].number >> " + numbersA[a].number * numbersB[b].number);
			}
			xPos = 0;
			yPos += discRow[0]._height + __gap;
			discs.push(discRow);
		}
	}
	function showSubHighlight(reAbout:String)
	{
		var finder:Number;// wheather it 10 or 1 for a given block
		var sumRes:Number;// wheather a block Result become 10 or 100
		if(reAbout == "R1")
		{
			finder = 1;
			sumRes = 10;
		}
		else
		{
			finder = 10;
			sumRes = 100;
		}
		var flg:Boolean = false;
		var tmpX = new Array;
		var tmpY = new Array;
		var pointer:Number=0;
		var countOne:Number = 0;
		highlightMov.createEmptyMovieClip("mcMe", this.getNextHighestDepth());
		var mcDep:Number= 0;
		for(var a:Number = 0; a < discs.length; a++)
		{
			for(var b:Number = 0; b < discs[a].length; b++)
			{
				if(discs[a][b].number == finder and highlightMov.hitTest(discs[a][b]))
				{
				tmpX[pointer] = discs[a][b]._x;
				tmpY[pointer] = discs[a][b]._y;
				//discs[a][b]._alpha = 30;
				pointer++;
					if(countOne ==9)
					{
					var posX:Number = discs[a][b]._x;
					var posY:Number = discs[a][b]._y;
				
					var disc1:Disc  = highlightMov.mcMe.attachMovie("Disc", "disc_" + a + "_" + b,mcDep,{_x:posX, _y:posY});
					mcDep++;
					disc1.number = sumRes;
					countOne = -1;
					}
					countOne++;			
					}				
			}
			
		}
		//finding the weidth of array
		var NumOfCol:Number = 1;
		for(var c:Number =0; c < pointer; c++)
		{
			if(tmpY[c]!=tmpY[c+1])
			{
				break
			}else
			{
				NumOfCol++;
			}
		}
		var NumReqBox:Number; 
		var ColorArray:Array = ["0xFF0000","0xFF9900","0x6C0202","0xFF0099","0xFF0000","0xFF9900","0xFF0099"];
		with(highlightMov.mcMe)
		{
			var StBox:Number = 0;
			var BlockNum:Number = Math.floor(pointer/10);
		for(var k:Number=0;k<BlockNum;k++)
		{
			lineStyle(2, ColorArray[k]);
			moveTo(tmpX[StBox],tmpY[StBox]);
			lineTo(tmpX[StBox+NumOfCol-(StBox % NumOfCol)-1] + 35, tmpY[StBox+NumOfCol-(StBox % NumOfCol)-1]);
			NumReqBox = Math.floor((10-(NumOfCol-(StBox % NumOfCol)))/NumOfCol)+1;
			var cBox:Number = StBox+NumReqBox*NumOfCol-(StBox % NumOfCol)-1;
			lineTo(tmpX[cBox] + 35, tmpY[cBox]+35);
			var havMin = (10-((NumReqBox-1)*NumOfCol+(NumOfCol-(StBox % NumOfCol))));
			
			if(havMin!=0)
			{
				lineTo(tmpX[cBox-(NumOfCol-havMin)]+35 , tmpY[cBox-(NumOfCol-havMin)]+35);
				lineTo(tmpX[cBox+havMin]+ 35 , tmpY[cBox+havMin]+35);
				lineTo(tmpX[cBox+1] , tmpY[cBox+1]+35);
			}
			else
			{
				lineTo(tmpX[cBox-NumOfCol+1] , tmpY[cBox-NumOfCol+1]+35);
			}
			if((NumOfCol-(StBox % NumOfCol))==NumOfCol)
			{
				lineTo(tmpX[StBox] , tmpY[StBox]);
			}
			else
			{
				var NowCur:Number = cBox-NumOfCol+1-((NumReqBox-2)*NumOfCol);
				lineTo(tmpX[NowCur] , tmpY[NowCur]);
				lineTo(tmpX[NowCur+(StBox % NumOfCol)] , tmpY[NowCur+(StBox % NumOfCol)]);
				lineTo(tmpX[StBox] , tmpY[StBox]);
			}
			StBox = StBox+10;
		
		}//end of for
		}
		//setTimeout(subHighlightAnim,200);
		var curAlpha = 100;
		var count:Number = 0;
		var flg:Boolean = true;
		gi = setInterval(Delegate.create(this, function()
		{//start
		if(curAlpha>30)
		{
			trace("UP TEST "+BlockNum);
			count=0;
			for(var a:Number = 0; a < discs.length; a++)
			{
				for(var b:Number = 0; b < discs[a].length; b++)
				{
					if(count<(BlockNum*10))
					{
						if(discs[a][b].number == finder and highlightMov.hitTest(discs[a][b]))
						{
							discs[a][b]._alpha = curAlpha;
							count++;
						}
					}
					
				}
			}
		curAlpha -= 2;
		}
		else if(flg)
		{
			trace("Doun TEST : "+BlockNum);
			count = 0;
			var curColor:Number = 0;
			for(var a:Number = 0; a < discs.length; a++)
			{
				for(var b:Number = 0; b < discs[a].length; b++)
				{
				if(count<(BlockNum*10))
				{
					if(discs[a][b].number == finder and highlightMov.hitTest(discs[a][b]))
					{
						if(count>=0 and count <= 9)
						{
							curColor = 0;
						}else if(count>=10 and count <= 19)
						{
							curColor = 1;
						}else if(count>=20 and count <= 29)
						{
							curColor = 2;
						}else if(count>=30 and count <= 39)
						{
							curColor = 3;
						}else if(count>=40 and count <= 49)
						{
							curColor = 4;
						}else if(count>=50 and count <= 49)
						{
							curColor = 5;
						}else if(count>=60and count <= 69)
						{
							curColor = 6;
						}
					discs[a][b].Glow_color = ColorArray[curColor];
					discs[a][b].Glow_strength = 8;
					//discs[a][b].sGlow_blur = 10;
						count++;
					}
				}
					
				}
			}
			flg = false;			
		}
		
		//end
		}),5);
}

	function removeSubHighlight(reAbout:String)
	{
		clearInterval(gi);
		highlightMov.mcMe.removeMovieClip();
		var finder:Number;// wheather it 10 or 1 for a given block
		var sumRes:Number;// wheather a block Result become 10 or 100
		if(reAbout == "R1")
		{
			finder = 1;
			sumRes = 10;
		}
		else
		{
			finder = 10;
			sumRes = 100;
		}
		for(var a:Number = 0; a < discs.length; a++)
		{
			for(var b:Number = 0; b < discs[a].length; b++)
			{
				if(discs[a][b].number == finder and highlightMov.hitTest(discs[a][b]))
				{
				discs[a][b]._alpha = 100;
				discs[a][b].Glow_strength = 0;
				}
			}
		}
	}
	
	function highlight(startX:Number, endX:Number):Void
	{

		if(highlightMov) highlightMov.removeMovieClip();
		highlightMov = createEmptyMovieClip("hm", this.getNextHighestDepth());
		highlightMov.lineStyle(3, 0xFF9900);
		
		var xPos:Number = discs[0][startX]._x;
		var width:Number = this.getBounds().xMax;
		if(endX != undefined) width = discs[0][endX]._x + discs[0][endX]._width;
		
		with(highlightMov)
		{
			moveTo(xPos, 0);
			lineTo(width, 0);
			lineTo(width, _parent.getBounds().yMax);
			lineTo(xPos, _parent.getBounds().yMax);
			lineTo(xPos, 0);
		}
		
		for(var indx in discs) {
			for(var indx2 in discs[indx]) {
				discs[indx][indx2]._alpha = 100;
			}			
		}
		if(endX == undefined)
			for(var indx in discs) {
				for(var i:Number = 0; i < startX; i++ )
					discs[indx][i]._alpha = 30;
			}
		else
			for(var indx in discs) {
				for(var i:Number = (endX + 1); i < discs[indx].length; i++ )
					discs[indx][i]._alpha = 30;
			}
	}
}