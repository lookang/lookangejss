/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/
var ocmOrig = document.oncontextmenu
var ocmNone = new Function( "return false" )

// Button Object
function ObjButton(n,a,x,y,w,h,v,z,d,cl,act) {
  this.name = n
  this.altName = a
  this.x = x
  this.y = y
  this.w = w
  this.ow = w;
  this.h = h
  this.oh = h;
  this.v = v
  this.z = z
  this.obj = this.name+"Object"
  this.alreadyActioned = false;
  eval(this.obj+"=this")
  if ( d != 'undefined' && d!=null )
    this.divTag = d;
  else  
    this.divTag = "div";
  this.addClasses = cl;
  this.hasAct = act;
  
  this.hasOuterShadow = false;
  this.outerShadowDirection = 0;
  this.outerShadowDepth = 0;
  this.outerShadowOpacity = 0;
  this.shadowRed = 0;
  this.shadowGreen = 0;
  this.shadowBlue = 0;
  this.shadowRedHex = null;
  this.shadowGreenHex = null; 
  this.shadowBlueHex = null;
  this.outerShadowBlurRadius = 0;
  this.shadowType = null; 
  
  this.hasReflection = false;
  this.reflectedImageX = 0;
  this.reflectedImageY = 0;
  this.reflectedImageWidth = 0;
  this.reflectedImageHeight = 0;
  this.reflectedImageOffset = 0;
  this.reflectedImageFadeRate = 0;
  this.reflectionSeparation = 0;
  this.reflectionPosDiffY	= 0;
  this.reflectionPosDiffX	= 0;
}

function ObjButtonActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjButtonActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjButtonActionPlay( ) {
  this.objLyr.actionPlay();
}

function ObjButtonActionStop( ) {
  this.objLyr.actionStop();
}

function ObjButtonActionShow( ) {
  if( !this.isVisible() )
    this.onShow();
}

function ObjButtonActionHide( ) {
  if( this.isVisible() )
    this.onHide();
}

function ObjButtonActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjButtonActionExit( ) {
  this.objLyr.actionExit();
}

function ObjButtonActionChangeContents( ) {
  this.objLyr.actionChangeContents();
}

function ObjButtonActionTogglePlay( ) {
  this.objLyr.actionTogglePlay();
}

function ObjButtonActionToggleShow( ) {
  if(this.objLyr.isVisible()) this.actionHide();
  else this.actionShow();
}

function ObjButtonSizeTo( w, h ) {
  this.w = w
  var yShift = this.h-h;
  this.h = h
  if(this.hasReflection)
  {
	this.reflectedImageHeight = this.h;
	this.reflectedImageWidth = this.w;
	this.reflectionPosDiffY -= yShift;
	this.reflectedImageY = this.objLyr.y + this.reflectionPosDiffY;
	this.reflectedImageX = this.objLyr.x;
  }
  
  this.build()
  this.activate()
  this.objLyr.clipTo( 0, w, h, 0  )
}

{// Setup prototypes
var p=ObjButton.prototype
p.checkbox = false
p.setImages = ObjButtonSetImages
p.setDisabledImage = ObjButtonSetDisabledImage
p.setDisabled = ObjButtonSetDisable
p.setStateOpacity = ObjButtonSetStateOpacity
p.build = ObjButtonBuild
p.init = ObjButtonInit
p.activate = ObjButtonActivate
p.down = ObjButtonDown
p.up = ObjButtonUp
p.over = ObjButtonOver
p.out = ObjButtonOut
p.change = ObjButtonChange
p.capture = 0

p.onDown = new Function()
p.onUp = new Function()
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDeselect = new Function()
p.actionGoTo = ObjButtonActionGoTo
p.actionGoToNewWindow = ObjButtonActionGoToNewWindow
p.actionPlay = ObjButtonActionPlay
p.actionStop = ObjButtonActionStop
p.actionShow = ObjButtonActionShow
p.actionHide = ObjButtonActionHide
p.actionLaunch = ObjButtonActionLaunch
p.actionExit = ObjButtonActionExit
p.actionChangeContents = ObjButtonActionChangeContents
p.actionTogglePlay = ObjButtonActionTogglePlay
p.actionToggleShow = ObjButtonActionToggleShow
p.writeLayer = ObjButtonWriteLayer
p.onShow = ObjButtonOnShow
p.onHide = ObjButtonOnHide
p.isVisible = ObjButtonIsVisible
p.sizeTo    = ObjButtonSizeTo
p.onSelChg = new Function()
p.initRotateAngle = ObjInitRotateAngle
p.addIe8Attr = ObjInitIe8Attr
p.initHasShadow = ObjInitHasShadow
p.initHasReflection = ObjInitHasReflection
p.initReflection = ObjInitReflection
p.addOpacity = ObjInitOpacity
p.addShadow = ObjInitShadow
p.initImageMap = ObjInitImageMap
p.addClickMap = ObjAddClickMap
p.setDegradations = ObjDegradeEffects
}

function ObjButtonSetStateOpacity( imgOff, imgOn, imgRoll, imgDisabled )
{
  if(imgOff >=0) this.imgOffOpacity = imgOff;
  if(imgOn >=0) this.imgOnOpacity = imgOn;
  if(imgRoll >=0) this.imgRollOpacity = imgRoll;
  if(imgDisabled >=0) this.imgDisabledOpacity = imgDisabled;
}

function ObjButtonSetImages(imgOff,imgOn,imgRoll,imgDis, dir) {
  if (!dir) dir = ''
  this.imgOffSrc = imgOff?dir+imgOff:''
  this.imgSrc = imgOff?dir+imgOff:'' //For Transitions
  this.imgOnSrc = imgOn?dir+imgOn:''
  this.imgRollSrc = imgRoll?dir+imgRoll:''
  this.imgDisabledSrc = imgDis?dir+imgDis:''
}
function ObjButtonSetDisabledImage( imgDis, dir )
{
  if (!dir) dir = ''
  this.imgDisabledSrc = imgDis?dir+imgDis:''
}

function ObjButtonSetDisable( bSet )
{
	this.bDisabled = bSet;
	this.hasOnUp = !bSet;
    if (this.imgDisabledSrc && bSet) 
		this.change(this.imgDisabledSrc)
	else if (!this.imgDisabledSrc && bSet) 
	{
		this.change(this.imgOffSrc);
	}
	else if(this.imgOffSrc && !bSet)
		this.change(this.imgOffSrc);
	
}

function ObjButtonBuild() {
  this.setDegradations();	//echo LD-768 : Check if we need to gracefully degrade effects
	
  var adjustedXPos = this.x;
  var adjustedYPos = this.y;
  var adjustedWidth = this.w + (is.firefox?2:0);
  var adjustedHeight = this.h + (is.firefox?2:0);
 
  
  var radians = (this.outerShadowDirection + this.r) * (Math.PI / 180.0);
  var xOffset = this.outerShadowDepth * Math.cos(radians);
  //Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
  var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
  
  if(document.head)
	this.bIsWCAG = (document.head.innerHTML.indexOf("trivantis-focus.css")> -1)?true:false;
  else
	this.bIsWCAG = (document.getElementsByTagName("head")[0].innerHTML.indexOf("trivantis-focus.css")> -1)?true:false;
  
  
  if(is.vml && this.bCanRotate)
  {
	adjustedXPos = this.ie8DivX;
	adjustedYPos = this.ie8DivY;	
	adjustedWidth = this.ie8DivWidth;
	adjustedHeight = this.ie8DivHeight;
  }
  
  if(this.hasOuterShadow && is.svg)
  {
	adjustedWidth = this.w + (1 * Math.abs(xOffset)) + this.outerShadowBlurRadius;
	adjustedHeight = this.h + (1 * Math.abs(yOffset)) + this.outerShadowBlurRadius;
	
	if(xOffset < 0 && is.svg)
	{	
		adjustedXPos = this.x  + (1 * (xOffset - this.outerShadowBlurRadius)) + ((xOffset<0 && yOffset<0)?1:0); //There is a 1 pixel rounding error for offset in both directions
	}
	if(yOffset < 0 && is.svg)
	{	
		adjustedYPos = this.y + (1 * (yOffset - this.outerShadowBlurRadius));
	}
  }
  
  if(!this.name.indexOf("button")>-1)
	adjustedWidth +=3;

  if (this.str_SvgMapPath && !is.iOS && is.bSupportsClickMap && !this.bIsWCAG)
	this.bHasClickMap = true;
  else
	this.bHasClickMap = false;
	
  this.bSVGMap = this.bHasClickMap;
  	
  AdjustClickPointsForAct(this);
  
  var clipRect ='';
  if(is.svg)
  {
    if( this.hasOuterShadow && this.outerShadowDepth == 0 )
	  clipRect = 'clip: rect(0px ' + (adjustedWidth  + (2*this.outerShadowBlurRadius) + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight  + (2*this.outerShadowBlurRadius) + (1 * Math.abs(yOffset))) + 'px 0px);';
    else if( this.hasOuterShadow )
	  clipRect = 'clip: rect(0px ' + (adjustedWidth  + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight  + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px 0px);';
    else
	  clipRect = 'clip: rect(0px ' + (adjustedWidth + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + (1 * Math.abs(yOffset))) + 'px 0px);';
  }
  if(is.vml)
  {
	if(this.hasOuterShadow)
	{
		if(xOffset <= 0 && yOffset >= 0)
			clipRect = 'clip: rect(' + (-1 * this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
		else if(xOffset >= 0 && yOffset <= 0)
			clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (-1 * this.outerShadowBlurRadius) + 'px);';
		else if(xOffset <= 0 && yOffset <= 0)
			clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
		else 
			clipRect = 'clip: rect(' + (-1 * this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (-1 * this.outerShadowBlurRadius) + 'px);';
	}
  }
  
  this.css = buildCSS(this.name,adjustedXPos,adjustedYPos,adjustedWidth,adjustedHeight,this.v,this.z, null, clipRect);
   
   if(is.ie9 && this.r >0)
   {
		adjustedWidth = this.w + ((!this.name.indexOf("button")>-1)?3:0);
		adjustedHeight = this.h;
   }
   
  var IERotation = '';
  
  if(is.svg)
  {
	  if(this.r > 0)
	  {
		var tempStr = this.css.substring(0, this.css.length-2);
		
		//echo : Pass in zeros for horizontal and vertical flip because images for buttons are published out with the flips already included.
		tempStr += addRotateCSS(this.r, this.hasOuterShadow, this.w, this.h, this.x, this.y, (this.outerShadowDirection + this.r), this.outerShadowDepth, this.outerShadowBlurRadius, 0, 0, this.boundsRectX, this.boundsRectY, this.adornerWidth, this.adornerHeight);
		tempStr += '}\n';
		this.css = tempStr;
	  }
  }
  else if(is.vml && !this.hasOuterShadow)
  {
	if(this.r > 0)
	{
		if( this.r%360 > 0 && is.ie8 && this.bCanRotate)
		{
			 var radians = this.r * (Math.PI / 180.0);
			 var cosTheta = Math.cos(radians);
			 var sinTheta = Math.sin(radians);

			IERotation = 'filter: ';
			
			IERotation += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\',M11='+cosTheta+', M12='+((-1)*sinTheta)+', M21='+sinTheta+', M22='+cosTheta+');'
		}
		if(this.r > 0 && is.ie9)
		{
			IERotation += '-ms-transform:rotate('+ this.r +'deg);'
		}
	}
  
  }
  
  var ie9PosCorrect = '';
  if(is.ie9)
  {
	ie9PosCorrect = 'left:'+(this.x - this.ie8DivX)+'px; top:'+(this.y - this.ie8DivY)+'px;';
  }

  //Add opacity CSS
  if(this.opacity >= 0 && this.opacity < 100)
  {
	var tempStr = this.css.substring(0, this.css.length-2);
	tempStr += addOpacityCSS(this.opacity);
	tempStr += '}\n';
	this.css = tempStr;
  }
  
  this.div = '';
  if(this.hasReflection)
  {	
	var strIndex = this.css.indexOf("z-index:");
	var zIndex = "auto";
	if(strIndex >=0)
	{
		zIndex = this.z;
	}
    this.divReflect = addReflection(this.name, this.imgOffSrc, this.reflectedImageX, this.reflectedImageY, this.reflectedImageWidth, 
									this.reflectedImageHeight, this.r, this.reflectedImageOffset, this.reflectedImageFadeRate, this.v, this.vf, this.hf, 
									this.boundsRectX, this.boundsRectY, this.adornerWidth, this.adornerHeight, zIndex, 
									this.ie8ReflectionDivX, this.ie8ReflectionDivY, this.ie8ReflectionDivWidth, this.ie8ReflectionDivHeight, 
									this.ie8ReflectionImgX, this.ie8ReflectionImgY);
	this.div += this.divReflect;
  }
  
  if(this.hasOuterShadow && is.svg)
  {
	this.div += addSvgShadowFilter(this.name, this.w, this.h, (this.outerShadowDirection + this.r), this.outerShadowDepth, this.outerShadowOpacity, this.shadowRed, this.shadowGreen, this.shadowBlue, this.outerShadowBlurRadius, this.shadowType); 
  }

  this.div += '<' + this.divTag + ' id="'+this.name+'" ';
  	
  if( this.altName ) 
	this.div += 'title="'+this.altName+'" alt="'+this.altName+'" ';
  else 
	this.div += 'title="" alt="" ';
  
  //Applies SVG shadow to images on non ie8 and ie9 browsers
  if(this.hasOuterShadow && is.svg)
  {	
	this.divShadow = ObjSVGShadow(adjustedWidth, adjustedHeight, xOffset, yOffset, this);
  } 
  else if(this.hasOuterShadow && is.vml)
  {
	//In IE8 and IE9, two images are needed to produce a shadow with opacity, blur, and color. The image on top is being rotated by a VML attribute. 
	//The image on the bottom is producing the shadow and shadow blur.  
    var radians = this.outerShadowDirection * (Math.PI / 180.0);
	var xOffset = this.outerShadowDepth * Math.cos(radians);
	//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
	var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
	var blurRadius = (1.0*this.outerShadowBlurRadius);
	
	xOffset = xOffset.toFixed(5);
	yOffset = yOffset.toFixed(5);
	
	this.divShadow = ObjVMLShadow(xOffset, yOffset, blurRadius, this);
  }
  
  if( this.addClasses ) this.div += ' class="'+this.addClasses+'"'
  
  this.div += '></' + this.divTag + '>\n'
  this.divInt = '<button type="button" name="'+this.name+'btn" id="'+this.name+'btn"'
  if(this.altName) this.divInt +=' aria-label="'+this.altName+'"'
  else this.divInt +=' aria-label=""'
  
  if(this.hasAct && !this.bHasClickMap)
	this.divInt+=' onclick="if( ' + this.name + '.hasOnUp ) ' + this.name + '.onUp()"'
		
  this.divInt += ' style="z-index:1; '+ie9PosCorrect+''+IERotation 
  
  if(!is.ie8) this.divInt += ' position:absolute; width:'+adjustedWidth+'px; height:'+adjustedHeight+'px;padding:0;border:none;background:none;'
  else		  this.divInt += ' padding:0;border:none;background:none;'
	
  if(!this.bHasClickMap)
	this.divInt += 'cursor:pointer;'
	
  this.divInt +='"'
  this.divInt += '>'
  if(!this.hasOuterShadow)
  {
	this.divInt += '<img name="'+this.name+'Img" src="'+this.imgOffSrc+'"'
	this.divInt += document.documentMode < 8 ? 'style="position:absolute;"' : ''
	this.divInt += ' width='+this.w+' height='+this.h
	this.divInt += '></img>'
		
	this.divInt += '</button>'
  }
  else
	this.divInt += this.divShadow;	//echo bug 21347 : The closing button tag is added in the ObjVMLShadow function because we need to move the shadow image outside of the button. 

	
  //Button Click Mapping -- See rev 50983
  if(is.svg && this.bHasClickMap)
  {
	this.divInt += this.addClickMap(adjustedWidth, adjustedHeight, xOffset, yOffset, this);
  }
}

function ObjButtonInit() {
  this.objLyr = new ObjLayer(this.name)
}

function ObjButtonActivate() {
  if( is.ns5 )
  {
	if(this.objLyr.ele.id != (this.name+"MapArea"))
		this.objLyr.ele.innerHTML = this.divInt;
	else
	{
		this.objLyr.ele = document.getElementById(this.name);
		this.objLyr.ele.innerHTML = this.divInt;
	}
	if(this.hasReflection)
		if(this.objLyr.reflectDiv)
			this.objLyr.reflectDiv.outerHTML = this.divReflect;
  } 
  else this.objLyr.write( this.divInt );
  
  if(this.objLyr.ele != null && is.svg && this.bHasClickMap)
	this.objLyr.ele = this.objLyr.event = document.getElementById(this.name+"MapArea");
  
  if( !is.iOS )//bug11459 bug21967
  {
	if( !(is.ie8 || is.ie9) ) //21165 double firing actions
		this.objLyr.ele.onUp = new Function(this.obj+".onUp(); return false;")
	this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
	this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
	this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
	
	//echo bug 22100 : If WCAG is enabled, then the button tag's onClick attribute handles the call to the up function. 
	if( !(is.ie8 || is.ie9) && this.bHasClickMap) //21165 double firing actions
		this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")
	
	//echo bug 21644
	var THIS = this;
	
	//echo bug 22100: Changed the condition from is.bSupportsClickMap to this.bHasClickMap because the event listener should not be added if WCAG is enabled.
	if (this.bHasClickMap)
	{
		document.getElementById(this.name+"btn").addEventListener("keypress", function(e){
																			if(THIS.hasAct && THIS.hasOnUp && (e.keyCode == 13 || e.keyCode == 32)) 
																				THIS.onUp();
																			 return false;}, true);
	}
  }
  
  if(this.hasOuterShadow)
  {
	 this.objLyr.shadowObj = document.getElementById(this.name+"Img");
	 this.objLyr.shadowProp = document.getElementById(this.name+"Shadow");
  }
	 
  if(this.hasReflection)
  {
	 this.objLyr.reflectDiv = document.getElementById(this.name+"ReflectionDiv");
	 this.objLyr.reflectObj = document.getElementById(this.name+"Reflection");
  }
  
  this.objLyr.theObjTag = document.getElementById(this.name+"btn");
  this.objLyr.theObj = this;
  this.objLyr.objDiv = document.getElementById(this.name);
  
  
  if( this.objLyr && this.objLyr.styObj && !this.alreadyActioned )
  {
	if( this.v ) this.actionShow()

	if(this.v ==0 && (is.awesomium || is.vml))
	{
		if(this.objLyr.reflectDiv)
		{
			this.objLyr.reflectDiv.style.left = this.reflectedImageX + 'px';
			this.objLyr.reflectDiv.style.top = this.reflectedImageY + 'px';
			this.objLyr.reflectDiv.style.visibility = "hidden";
		}
	}
  }
}

function ObjButtonDown(e) {
  if( this.bDisabled ) return;
  if( is.ie ) e = event
  if( is.ie && !is.ieMac && e && e.button!=1 && e.button!=2 ) return
  if( is.ns && !is.nsMac && e && e.button!=0 && e.button!=2 )  return
  if (this.selected) {
    this.selected = false
    if (this.imgOnSrc) this.change(this.imgOnSrc)
    this.onDeselect()
  }
  else {
    if (this.checkbox) this.selected = true
    if (this.imgOnSrc) this.change(this.imgOnSrc)
    this.onSelect()
  }
  this.onDown()
}

function ObjButtonUp(e) {
  if( this.bDisabled ) return;
  if( is.ie ) e = event
  if( (is.ie || is.nsMac) && !e ) return
  if( is.ie && !is.ieMac && e && e.button!=1 && e.button!=2 ) return
  if( is.ns && !is.nsMac && e && e.button!=0 && e.button!=2 ) return
  if (!this.selected) {
    if (this.imgRollSrc) this.change(this.imgRollSrc)
    else if (this.imgOnSrc) this.change(this.imgOffSrc)
  }
  if( !is.ieMac && !is.nsMac && e && e.button==2 )
  {
    if( this.hasOnRUp )
    {
      document.oncontextmenu = ocmNone
      this.onRUp()
      setTimeout( "document.oncontextmenu = ocmOrig", 100)
    }
  }
  
  //echo LD-958 : onUp is for left mouse button events only. 
  if(this.hasAct && this.hasOnUp && (e.button == 0 || e.button == 1))
	this.onUp();
}

function ObjButtonOver() {
  if( this.bDisabled ) return;
  if (this.imgRollSrc && !this.selected) this.change(this.imgRollSrc)
  
  this.objLyr.ele.style.cursor = 'pointer';
  
  this.onOver()
}

function ObjButtonOut() {
  if( this.bDisabled ) return;
  if (this.imgRollSrc && !this.selected) this.change(this.imgOffSrc)
  
  this.objLyr.ele.style.cursor = 'default';
  
  this.onOut()
}

function ObjButtonChange(img) {
  var opacity = null;
  if( img == this.imgOnSrc ) opacity = this.imgOnOpacity;
  else if( img == this.imgOffSrc ) opacity = this.imgOffOpacity;
  else if( img == this.imgRollSrc ) opacity = this.imgRollOpacity;
  else if( img == this.imgDisabledSrc )
	opacity = this.imgDisabledOpacity;
  
  if (this.objLyr) 
  {
	if(is.svg)
		this.objLyr.objDiv.style.opacity = opacity;
	else if(is.vml && opacity < 1)
		this.objLyr.objDiv.style.setAttribute("filter", 'alpha(opacity='+opacity*100+')');
	else if(is.vml && opacity == 1 && this.objLyr.objDiv.style.filter)
	{
		var strFilter = this.objLyr.objDiv.style.filter;
		var startIndex = strFilter.indexOf("alpha(opacity=");
		
		if(strFilter.length > 0 && startIndex != -1)
		{
			var endIndex = strFilter.indexOf(')', startIndex);

			if(endIndex != -1)
				this.objLyr.objDiv.style.filter = strFilter.substr(0, startIndex) + strFilter.substr(endIndex + 1, strFilter.length - endIndex);
		}
	}
  
	if(this.hasReflection)
		this.objLyr.reflectDiv.style.opacity = opacity;
  
	if(!this.hasOuterShadow)
	{
		this.objLyr.doc.images[this.name+"Img"].src = img;
	}
	else if (this.hasOuterShadow && is.svg)
	{
		this.objLyr.shadowObj.setAttribute('xlink:href', img);
	}
	else if(this.hasOuterShadow && is.vml)
	{
		this.objLyr.shadowObj.src = img;
		this.objLyr.shadowProp.src = img;
	}
  
	if(this.hasReflection && is.svg)
	{
		this.objLyr.reflectObj.setAttribute('xlink:href', img);
	}
	else if(this.hasReflection && is.vml)
	{
		this.objLyr.reflectObj.src = img;
	}

	if (this.bDisabled)
	{
		this.objLyr.theObjTag.style.cursor = "default";
		this.objLyr.theObjTag.disabled = this.bDisabled;
	}
	else
	{
		this.objLyr.theObjTag.disabled = this.bDisabled;
	}
  }
}

function ObjButtonWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjButtonOnShow() {
  this.alreadyActioned = true;
  this.objLyr.actionShow();
}

function ObjButtonOnHide() {
  this.alreadyActioned = true;
  this.objLyr.actionHide();
}

function ObjButtonIsVisible() {
  if( this.objLyr.isVisible() )
    return true;
  else
    return false;
}

function ObjInitRotateAngle(angle, vertFlip, horzFlip, boundsRectX, boundsRectY, adornerWidth, adornerHeight){
	this.r = angle;
	this.vf = vertFlip;
	this.hf = horzFlip;
	
	if(this.vf || this.hf)
		if(is.awesomium && angle ==0)
			this.r=360;
	
	if(adornerWidth == 0 || adornerHeight == 0)
	{
		this.boundsRectX = 0;
		this.boundsRectY = 0;
		this.adornerWidth = 0;
		this.adornerHeight = 0;
	}
	else
	{
		this.boundsRectX = boundsRectX;
		this.boundsRectY = boundsRectY;
		this.adornerWidth = adornerWidth;
		this.adornerHeight = adornerHeight;
	}
}

function ObjInitIe8Attr(divPosX, divPosY, divWidth, divHeight, additionalOffsetX, additionalOffsetY){
	this.ie8DivX = divPosX;
	this.ie8DivY = divPosY;
	this.ie8DivWidth = divWidth;
	this.ie8DivHeight = divHeight;
	this.ie8AddedOffsetX = additionalOffsetX;
	this.ie8AddedOffsetY = additionalOffsetY;
}

function ObjInitShadow(direction, depth, opacity, redHex, greenHex, blueHex, red, green, blue, blurRadius, shadowType){
		
	//For some reason, Chrome will not display the shadow on a flipped image with a rotate angle of zero unless we add 360 degrees to it. No idea why. 
	if(this.vf == 1 || this.hf == 1)
	{
		this.outerShadowDirection = (direction + this.r);
		this.r = this.r + 360;
	}
	if(this.hf != 1 && this.vf != 1)
	{	
		this.outerShadowDirection = direction + this.r;
	}
	
	//echo bug 21328: ie8 and ie9 shadows doesn't need any of these calculations
	this.originalShadowDirection = direction;
	
	this.outerShadowDepth = depth;
	this.outerShadowOpacity = opacity;
	this.shadowRed = red;
	this.shadowGreen = green;
	this.shadowBlue = blue;
	
	if(redHex.length == 1)
		this.shadowRedHex = '0' + redHex;
	else
		this.shadowRedHex = redHex;
		
	if(greenHex.length == 1)
		this.shadowGreenHex = '0' + greenHex;
	else
		this.shadowGreenHex = greenHex;
	
	if(blueHex.length == 1)
		this.shadowBlueHex = '0' + blueHex;
	else
		this.shadowBlueHex = blueHex;
 	
	this.outerShadowBlurRadius = blurRadius;
	this.shadowType = shadowType; 
}

function ObjInitOpacity(opacity){
	this.opacity = this.opacityNorm = opacity;
}

function ObjInitHasShadow(boolVal){
	this.hasOuterShadow = boolVal;
	
	if(boolVal == 0)
	{
		this.outerShadowDirection = 0;
		this.outerShadowDepth = 0;
		this.outerShadowOpacity = 0;
		this.shadowRed = 0;
		this.shadowGreen = 0;
		this.shadowBlue = 0;
		this.shadowRedHex = null;
		this.shadowGreenHex = null;
		this.shadowBlueHex = null;
		this.outerShadowBlurRadius = 0;
		this.shadowType = null; 
	}
}

function ObjInitReflection(x, y, width, height, offset, fadeRate, separation, ie8DivX, ie8DivY, ie8DivWidth, ie8DivHeight, ie8ImgX, ie8ImgY){
	this.reflectedImageX = x;
	this.reflectedImageY = y;
	this.reflectedImageWidth = width;
	this.reflectedImageHeight = height;
	this.reflectedImageOffset = offset;
	this.reflectedImageFadeRate = fadeRate;
	this.reflectionSeparation = separation;
	this.reflectionPosDiffY	= y-this.y;
	this.reflectionPosDiffX	= x-this.x;
	
	//Values used for ie8 and ie9
	this.ie8ReflectionDivX = ie8DivX;
	this.ie8ReflectionDivY = ie8DivY;
	this.ie8ReflectionDivWidth = ie8DivWidth;
	this.ie8ReflectionDivHeight = ie8DivHeight;
	this.ie8ReflectionImgX = ie8ImgX;
	this.ie8ReflectionImgY = ie8ImgY;
}

function ObjInitHasReflection(boolVal){
	
	if(boolVal == 0)
		this.hasReflection = false;
	else
		this.hasReflection = true;
	
	if(boolVal == 0)
	{
		this.reflectedImageX = 0;
		this.reflectedImageY = 0;
		this.reflectedImageWidth = 0;
		this.reflectedImageHeight = 0;
		this.reflectedImageOffset = 0;
		this.reflectedImageFadeRate = 0;
		this.reflectionSeparation = 0;
		this.reflectionPosDiffY	= 0;
		this.reflectionPosDiffX	= 0;
	}
}

function ObjSVGShadow(objWidth, objHeight, xOffset, yOffset, thisObj)
{
	var svgImageTag = '';
	
	svgImageTag = '<svg role="img" focusable="false" aria-label="" width="' + objWidth + 'px" height="' + objHeight + 'px"'
	
	if(xOffset < 0 || yOffset < 0)
	{
		if(xOffset < 0)
			svgImageTag += 'x = "' + (xOffset - thisObj.outerShadowBlurRadius) + '" '
		if(yOffset < 0)
			svgImageTag += 'y = "' + (yOffset - thisObj.outerShadowBlurRadius) + '" '
	}
	
	svgImageTag += '>\n'
	
	var mapOffsetX = 0;
	var mapOffsetY = 0;
	
	if(xOffset < 0 || yOffset < 0)
	{	
		svgImageTag += '<image name="'+thisObj.name+'Img" id="'+thisObj.name+'Img" xlink:href = "' + thisObj.imgOffSrc + '" preserveAspectRatio="none" ';
		
		svgImageTag += 'x = "';
		
		if(xOffset < 0)
		{
			xOffset = Math.abs(xOffset);
			mapOffsetX = xOffset + thisObj.outerShadowBlurRadius;
			svgImageTag += mapOffsetX + '" width = "' + thisObj.w + 'px"'
		}
		else svgImageTag += '0" width = "' + thisObj.w + 'px"'
		if(yOffset < 0)
		{
			yOffset = Math.abs(yOffset);
			mapOffsetY = yOffset + thisObj.outerShadowBlurRadius;
			svgImageTag += 'y = "' + mapOffsetY + '" height = "' + thisObj.h + 'px"'
		}
		else svgImageTag += 'y = "0" height = "' + thisObj.h + 'px"'		
		
		svgImageTag += 'filter="url(#' + thisObj.name + 'Shadow)" />\n'
	}
	else
	{
		svgImageTag += '<image name="'+thisObj.name+'Img" id="'+thisObj.name+'Img" xlink:href = "' + thisObj.imgOffSrc + '" preserveAspectRatio="none" ';		
		svgImageTag += 'x = "0" y = "0" height = "' + thisObj.h + 'px" width = "' + thisObj.w + 'px" filter="url(#' + thisObj.name + 'Shadow)"/>\n';
	}
	
	svgImageTag += '</svg>\n'
	
	//echo bug 21347 : Closing button tag to pair up with the button tag from the build function
	svgImageTag += '</button>\n'	
	
	return svgImageTag;
}

function ObjVMLShadow(xOffset, yOffset, blurRadius, thisObj)
{
	var vmlShadowTag = '';
	
	vmlShadowTag = '<v:image id="'+thisObj.name+'Img" src="' + thisObj.imgOffSrc + '" style="z-index:1; position:absolute;width:' + thisObj.w + 'px;height:' + thisObj.h + 'px;';
	
	var IERotation = '';
	
	if(thisObj.r > 0 || thisObj.vf == 1 || thisObj.hf == 1)
	{
		if(thisObj.vf == 1 || thisObj.hf == 1)
		{
			vmlShadowTag += 'filter:';
			if(thisObj.vf == 1)
			{
				IERotation += ' flipv';
			}
			
			if(thisObj.hf == 1)
			{
				IERotation += ' fliph';
			}
				
			IERotation += ';';
		}
			
		if(thisObj.r > 0 && is.ie8)
		{
			 var radians = thisObj.r * (Math.PI / 180.0);
			 var cosTheta = Math.cos(radians);
			 var sinTheta = Math.sin(radians);
			 if(IERotation.length > 1)
				IERotation = IERotation.substring(0, IERotation.length-1);
			IERotation += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\',M11='+cosTheta+', M12='+((-1)*sinTheta)+', M21='+sinTheta+', M22='+cosTheta+');'
		}
		if(thisObj.r > 0 && is.ie9)
		{
			IERotation += '-ms-transform:rotate('+ thisObj.r +'deg);'
		}
	}
	
	vmlShadowTag+= IERotation;
	
	vmlShadowTag += 'left: ' + ((thisObj.x - thisObj.ie8AddedOffsetX) - thisObj.ie8DivX) + 'px;'
	vmlShadowTag += 'top:' + ((thisObj.y - thisObj.ie8AddedOffsetY) - thisObj.ie8DivY) + 'px;">\n'	
	vmlShadowTag += '</v:image>\n'
	
	//echo bug 21347 : Closing button tag to pair up with the button tag from the build function
	vmlShadowTag += '</button>\n'	
	
	vmlShadowTag += '<v:image id="'+thisObj.name+'Shadow" src="' + thisObj.imgOffSrc + '" style="z-index:0; position:absolute;width:' + thisObj.w + 'px;height:' + thisObj.h + 'px;';
	
	//Correcting any offsets caused by the blurRadius and shadow offsets. 
	if(xOffset < 0)
		vmlShadowTag += 'left: ' + ((1*thisObj.x) - (1*thisObj.ie8DivX) + (1*xOffset) - blurRadius) + 'px;'
	else
		vmlShadowTag += 'left: ' + ((1*thisObj.x) - (1*thisObj.ie8DivX) - blurRadius) + 'px;'
	if(yOffset < 0)
		vmlShadowTag += 'top:' + ((1*thisObj.y) - (1*thisObj.ie8DivY) + (1*yOffset) - blurRadius) + 'px;'
	else
		vmlShadowTag += 'top:' + ((1*thisObj.y) - (1*thisObj.ie8DivY) - blurRadius) + 'px;'
	vmlShadowTag += 'filter:progid:DXImageTransform.Microsoft.Blur(makeShadow=True pixelRadius=' + blurRadius + ' shadowOpacity=' + thisObj.outerShadowOpacity + ')\n'
	vmlShadowTag += 'progid:DXImageTransform.Microsoft.DropShadow(OffX=' + xOffset + ' OffY=' + yOffset + ' color=#' + thisObj.shadowRedHex + thisObj.shadowGreenHex + thisObj.shadowBlueHex + ')'
	if(IERotation.length < 2)
		vmlShadowTag +=';"/>\n'
	else
	{
		vmlShadowTag += IERotation+'/>\n';
	}
	vmlShadowTag += '</v:image>\n'
	
	return vmlShadowTag;
}

function ObjInitImageMap(str, str2)
{
	this.str_ImageMapCoords = str;
	this.str_SvgMapPath = str2;
}

function ObjAddClickMap(objWidth, objHeight, xOffset, yOffset, thisObj)
{
	var svgImageTag = '';
	var mapOffsetX = 0;
	var mapOffsetY = 0;
	
	
	if(xOffset < 0 || yOffset < 0)
	{		
		if(xOffset < 0)
		{
			xOffset = Math.abs(xOffset);
			mapOffsetX = xOffset + thisObj.outerShadowBlurRadius;
		}
		if(yOffset < 0)
		{
			yOffset = Math.abs(yOffset);
			mapOffsetY = yOffset + thisObj.outerShadowBlurRadius;
		}	
	}

	mapOffsetX += is.firefox?3:0;
	mapOffsetY += is.firefox?1:0;
	
	var str = ''
	
	str += '<div style="left:'+mapOffsetX+'px; top:'+mapOffsetY+'px; position:relative; z-index:1;">\n'
	str += '<svg focusable="false" role="img" aria-label=" " width="'+objWidth+'px" height="'+objHeight+'px"'
	str += '>\n'
	str += '<g opacity="0">\n'
	str += '<a id="'+this.name+'MapArea" name="'+this.name+'MapArea">\n'
	str += '<path shape="poly" d="'+this.str_SvgMapPath+'"/>\n'
	str += '</a>\n'
	str += '</g>\n'
	str += '</svg>\n'
	str += '</div>\n'
	
	return str;
}

//echo LD-768 : Putting all degradation rules for IE into this function
//echo bug 21691 : Graceful Degradation
function ObjDegradeEffects()
{
	//echo LD-838 : We use a css rotation for IE9 and a direct-x filter for rotation in IE8. 
	//              So the check for is.DXFilterSupported will not tell us if an IE browser in compatibility mode supports the way we do rotation.
	if(this.name.indexOf("audio") > -1)
		this.bCanRotate = false;
	else if(is.vml && is.ie8 && !is.DXFilterSupported)
		this.bCanRotate = false;
	else
		this.bCanRotate = true;

	if(is.vml)
	{
		if(!is.DXFilterSupported){
			this.hasOuterShadow = false;
			this.hasReflection = false;		
		}
		if(this.opacity < 100){
			this.hasOuterShadow = false;
			this.hasReflection = false;
		}
		if(this.r > 0){
			this.hasOuterShadow = false;
			this.hasReflection = false;
		}
		if(this.vf == 1 || this.hf == 1){
			this.hasOuterShadow = false;
			this.hasReflection = false;
		}
		if(is.ie8)
		{
			this.hasOuterShadow = false;
		}
	}
	
	return;
}