/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

/* 
** If you want to enable a Debug Window that will show you status
** and debugging information for your HTML published content, 
** copy the file "trivantisdebug.html" from your Support Files directory
** (typically C:\Program Files\Trivantis\(Product Name)\Support Files
** and place in the root folder of your published content (next to this file)
** and then change the value of the trivDebug variable from 0 to 1
** (don't forget to save the modified file).
**
*/

var trivDebug      = 0;
var bDisplayErr    = true;
var trivAddMsgFunc = null;
var trivDebugWnd   = '';
var trivSaveMsg    = '';
var trivProtected  = false;
var trivWeb20Popups  = false;
var trivDynXMLfilePath = '';
var fOpacity = 100.0;

function trivLogMsg( msg, level ) {
  if( level != null )
  {
    if( !(trivDebug & level )) return;
  }
  else if( !trivDebug ) return;
  var topWnd = findTrivLogMsg( window, true );
  if( topWnd.trivDebug ) {
    if( topWnd.trivDebugWnd && !topWnd.trivDebugWnd.closed && topWnd.trivDebugWnd.location ) {
      if( msg ) {
        if( topWnd.trivSaveMsg.length ) topWnd.trivSaveMsg += '<br />';
        topWnd.trivSaveMsg += msg;
      }
      if( topWnd.trivAddMsgFunc ) {
        msg = topWnd.trivSaveMsg;
        topWnd.trivSaveMsg = '';
        topWnd.trivAddMsgFunc( msg );
      }
    }
    else {
      topWnd.trivSaveMsg    = msg;
      topWnd.trivDebugWnd   = topWnd.open( 'trivantisdebug.html', 'TrivantisDebug', 'width=400,height=400,scrollbars=0,resizable=1,menubar=0,toolbar=0,location=0,status=0' )
      if( topWnd.trivDebugWnd ) {
        topWnd.trivDebugWnd.focus()
        setTimeout( "trivLogMsg()", 1000 );
      }
    }
  }
}

function findTrivLogMsg( win, bCheckOpener ) {

   if( bCheckOpener && win.opener && win.opener.trivLogMsg ) {
     return findTrivLogMsg( win.opener, false )
   }
   
   while( win ) {
     if( win.parent && win.parent != win && win.parent.trivLogMsg ) win = win.parent;
     else break;
   }
   return win;
}

function ObjLayer(id,pref,frame) {
  if (!ObjLayer.bInit && !frame) InitObjLayers()
  this.frame = frame || self
  if (is.ns) {
    if (is.ns5) {
      this.ele = this.event = document.getElementById(id)
	  this.reflectDiv = null;
	  this.relfectObj = null;
	  this.shadowObj =  null;
	  this.shadowProp = null;
      this.styObj = this.ele.style
      this.doc = document
      this.x = this.ele.offsetLeft
      this.y = this.ele.offsetTop
      this.w = this.ele.offsetWidth
      this.h = this.ele.offsetHeight
    }
  }
  else if (is.ie) {
    this.ele = this.event = this.frame.document.all[id]
    this.styObj = this.frame.document.all[id].style
    this.doc = document
	this.reflectDiv = null;
	this.relfectObj = null;
	this.shadowObj =  null;
	this.shadowProp = null;
    this.x = this.ele.offsetLeft
    this.y = this.ele.offsetTop
    this.w = this.ele.offsetWidth
    this.h = this.ele.offsetHeight
  }
  if( this.styObj ) this.styObj.visibility = "hidden"
  this.id = id
  this.unique = 1;
  this.pref = pref
  this.obj = id + "ObjLayer"
  eval(this.obj + "=this")
  this.hasMoved = false;
  this.newX = null;
  this.newY = null;
  this.theObj = null;
  this.theObjTag = null;
  this.objDiv = null;
  this.eTran = -1;
}

function ObjLayerMoveTo(x,y) {
  if (x!=null) {
	var origX = this.x;
    this.x = x
    if( this.styObj ) this.styObj.left = this.x + 'px';
	if(this.reflectDiv) 
	{
		if(this.theObj)
		{
			var xDiff = this.x-origX;
			this.theObj.reflectedImageX = this.theObj.reflectedImageX + xDiff;
			this.reflectDiv.style.left = this.theObj.reflectedImageX + 'px';
		}			
	}
  }
  if (y!=null) {
	var origY = this.y;
    this.y = y
	if(this.reflectDiv)
	{
		if(this.theObj)
		{
			var yDiff = this.y-origY;
			this.theObj.reflectedImageY = this.theObj.reflectedImageY + yDiff;
			this.reflectDiv.style.top = this.theObj.reflectedImageY + 'px';
		}
	}
    if( this.styObj ) this.styObj.top = this.y + 'px';
  }
  
  // Fly transitions or other moves off-page can produce a scrollbar.
  // currently objects moved off the page still maintain their view, this
  // causes a scrollbar to be shown on the page, if a user wants the object
  // to be hidden as soon as it leaves the page dimensions they can set the
  // following line in an external HTML object, header scripting:
  // window.trivHideOffPageObjects=true;
  //
  if (window.trivHideOffPageObjects)
  {
	  // hide it when it's outside the page div
	  var pageDiv = document.getElementById('pageDIV');
	  var pageWidth = Math.max(pageDiv["clientWidth"],pageDiv["offsetWidth"]);
	  var pageHeight = Math.max(pageDiv["clientHeight"],pageDiv["offsetHeight"]);
	  this.styObj.display= ( 0 > (this.x+this.w) || pageWidth < this.x || 0 > (this.y+this.h) || pageHeight < this.y ) ? 'none' : '';  
  }
}

function ObjLayerMoveBy(x,y) {
  this.moveTo(Number(this.x)+Number(x),Number(this.y)+Number(y))
}

function ObjLayerClipInit(t,r,b,l) {
  if (arguments.length==4) 
	this.clipTo(t,r,b,l)
  else if(this.ele.offsetWidth <=0 ||  this.ele.offsetHeight<=0 || this.theObj)
  {
	if(this.theObj)
	{
		var effectAdjX = 0;
		var effectAdjY = 0;
		var effectAdjW = (typeof(this.ele.offsetWidth) == 'undefined' || this.ele.offsetWidth <=0)?this.theObj.w:this.ele.offsetWidth;
		var effectAdjH = (typeof(this.ele.offsetHeight) == 'undefined' || this.ele.offsetHeight<=0)?this.theObj.h:this.ele.offsetHeight;;
		
		if(this.theObj.name.indexOf("text") > -1) //TXT Obj Adj
		{
			var xOffset = 0;
			var yOffset = 0;
			var hOffset = 0;
			var wOffset = 0;
			if(this.theObj.hasOuterShadow > 0)
			{
				var outerRadians = (this.theObj.outerShadowDirection + this.theObj.r) * (Math.PI / 180.0);
				var xOuterOffset = this.theObj.outerShadowDepth * Math.cos(outerRadians);
				//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
				var yOuterOffset = -1 * this.theObj.outerShadowDepth * Math.sin(outerRadians);

				xOffset = parseFloat(xOuterOffset.toFixed(5));
				yOffset = parseFloat(yOuterOffset.toFixed(5));
				xOffset += (((xOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				yOffset += (((yOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				hOffset = Math.abs(yOffset);
				wOffset = Math.abs(xOffset);
			}
			if(this.theObj.hasTextShadow > 0)
			{
				var textRadians = (this.theObj.textShadowDirection + this.theObj.r) * (Math.PI / 180.0);
				var xTextOffset = this.theObj.textShadowDepth * Math.cos(textRadians);
				//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
				var yTextOffset = -1 * this.theObj.textShadowDepth * Math.sin(textRadians);
				
				if(xOffset !=0) //Has other effect
				{
					if(xOffset>0)
					{
						xOffset = parseFloat(xTextOffset.toFixed(5));
						xOffset += (((xOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
						if(xOffset <0 || wOffset < xOffset)
							wOffset +=(Math.abs(Math.abs(xOffset)-wOffset));//Add difference
					}
					else
					{
						if(xOffset > parseFloat(xTextOffset.toFixed(5)))
						{
							xOffset = parseFloat(xTextOffset.toFixed(5));
							xOffset += (((xOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
							wOffset = Math.abs(xOffset);
						}
					}
				}
				else
				{
					xOffset = parseFloat(xTextOffset.toFixed(5));
					xOffset += (((xOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
					wOffset = Math.abs(xOffset);
				}
				if(yOffset !=0)
				{
					if(yOffset>0)
					{
						yOffset = parseFloat(yTextOffset.toFixed(5));
						yOffset += (((yOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
						if(yOffset <0 || hOffset < yOffset)
							hOffset +=(Math.abs(Math.abs(yOffset)-hOffset));//Add difference
					}
					else
					{
						if(yOffset > parseFloat(yTextOffset.toFixed(5)))
						{
							yOffset = parseFloat(yTextOffset.toFixed(5));
							yOffset += (((yOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
							hOffset = Math.abs(yOffset);
						}
					}
				}
				else
				{
					yOffset = parseFloat(yTextOffset.toFixed(5));
					yOffset += (((yOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
					hOffset = Math.abs(yOffset);
				}
			}
			effectAdjX = ((xOffset<0)?xOffset:0);
			effectAdjY = ((yOffset<0)?yOffset:0);
			effectAdjW += wOffset;
			effectAdjH += hOffset;	
		}
		else //OtherObjAdjust
		{
			var xOffset = 0;
			var yOffset = 0;
			var hOffset = 0;
			var wOffset = 0;
			if(this.theObj.hasOuterShadow > 0)
			{
				var outerRadians = (this.theObj.outerShadowDirection + this.theObj.r) * (Math.PI / 180.0);
				var xOuterOffset = this.theObj.outerShadowDepth * Math.cos(outerRadians);
				//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
				var yOuterOffset = -1 * this.theObj.outerShadowDepth * Math.sin(outerRadians);

				xOffset = parseFloat(xOuterOffset.toFixed(5));
				yOffset = parseFloat(yOuterOffset.toFixed(5));
				xOffset += (((xOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				yOffset += (((yOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				hOffset = Math.abs(yOffset);
				wOffset = Math.abs(xOffset);
			}
			else if(this.theObj.name.indexOf("button") >-1)
			{
				//BTN Adjustments
				effectAdjW += 5;
				effectAdjH += 2;	
			}
			effectAdjX = ((xOffset<0)?xOffset:0);
			effectAdjY = ((yOffset<0)?yOffset:0);
			effectAdjW += wOffset;
			effectAdjH += hOffset;	
		}
		this.clipTo(effectAdjY,effectAdjW,effectAdjH,effectAdjX)
	}
  }
  else
	this.clipTo(0,this.ele.offsetWidth,this.ele.offsetHeight,0)
}

function ObjLayerClipTo(t,r,b,l) {
  if( !this.styObj ) return;
  try{ this.styObj.clip = "rect("+t+"px "+r+"px "+b+"px "+l+"px)" } catch(e){}
}

function ObjLayerShowAudio(xPos){
	if(xPos && this.styObj){
		this.styObj.left = xPos.toString() + "px";
		this.styObj.visibility = "visible";  //echo LD-975: Move the audio object WAY off of the page if it's initially hidden. Always keep the flash window visible. 
											 //JB the audio can't be played in IE if it is not visible, and customers do this all the time.
	}
}

function ObjLayerHideAudio(){
  if( this.styObj ){ 
	this.styObj.left = "10000px";
	this.styObj.visibility = "visible";  //echo LD-975: Move the audio object WAY off of the page if it's initially hidden. Always keep the flash window visible. 
										 //JB the audio can't be played in IE if it is not visible, and customers do this all the time.
  }
}

function ObjLayerShow() {
  if( this.styObj ) 
  {
	this.styObj.visibility = "inherit";
	if(this.theObj && parseFloat(this.styObj.opacity) != parseFloat(this.theObj.opacity/100.0))
	{
		if(!(is.ie8 || is.ie9))
			this.styObj.opacity = this.theObj.opacity/100.0;
	}
  }
  if(this.reflectDiv) 
  {
	this.reflectDiv.style.visibility = "inherit";  
	
	if(this.eTran ==-1)
	{
		//echo bug 21701
		if(!(is.ie8 || is.ie9))
			this.reflectDiv.style.opacity = this.theObj.opacity/100.0;
	}
  }
}

function ObjLayerHide() {
  if( this.styObj ) this.styObj.visibility = "hidden";
  if(this.reflectDiv && this.eTran == -1) this.reflectDiv.style.visibility = "hidden";
}
var __Triv_GoToNextPage__ = "";//FPFP: BUG20811
function ObjLayerActionGoTo( destURL, destFrame, subFrame, bFeed ) {
  var targWind = null
  var bFeedback = bFeed != null ? bFeed : true
  if( destFrame ) {
    if( destFrame == "opener" ) targWind = parent.opener;
    else if( destFrame == "_top" ) targWind = eval( "parent" ) 
    else if(destFrame == "NewWindow" ) targWind = open( destURL, 'NewWindow' )
    else {
      var parWind = eval( "parent" )
      var index=0
      while( index < parWind.length ) {
        if( parWind.frames[index].name == destFrame ) {
          targWind = parWind.frames[index]
          break;
        }
        index++;
      }
      if( subFrame ) {
        index=0
        parWind = targWind
        while( index < parWind.length ) {
          if( parWind.frames[index].name == subFrame ) {
            targWind = parWind.frames[index]
            break;
          }
          index++;
        }
      }
      try
      {
        if( !targWind.closed && targWind.trivExitPage ) {
          targWind.trivExitPage( destURL, bFeedback )
          return
        }
      }catch(e){}      
    }
  }
  if( !targWind ) targWind = window
  try
  {
    if( !targWind.closed && __Triv_GoToNextPage__ != destURL) 
	{
		targWind.location.href = destURL;
		if( is.awesomium ) __Triv_GoToNextPage__ = destURL;
		//if(console && console.log) console.log("ObjLayerActionGoTo: " + destURL + "\n");
	}
  }catch(e){
	__Triv_GoToNextPage__ = "";
  }      
}

function ObjLayerActionGoToNewWindow( destURL, name, props ) {
  var targWind
  if ((props.indexOf('left=') == -1) && (props.indexOf('top=') == -1)) props += GetNewWindXAndYPos( props );
  targWind = window.open( destURL, name, props, false )
  if( targWind ) targWind.focus()
  return targWind
}

function GetNewWindXAndYPos( props ) {
  var countOfW = 'width='.length
  var idxW = props.indexOf('width=');
  var wndW = GetMiddleString( props, countOfW + idxW, ',' )
  var countOfH = 'height='.length
  var idxH = props.indexOf('height=');
  var wndH = GetMiddleString( props, countOfH + idxH, ',' )  
  var wndX = (screen.width - wndW) / 2;
  var wndY = (screen.height - wndH) / 2;	
  return ',left=' + wndX + ',top=' + wndY;
}

function GetMiddleString( str, startIndex, endChar ) {
  var midStr = '';
  for (strIndex = startIndex; str.charAt(strIndex) != endChar; strIndex++) {
    midStr += str.charAt(strIndex);
  }  
  return midStr;
}

function ObjLayerActionPlay( ) {
}

function ObjLayerActionStop( ) {
}

function ObjLayerActionShow( ) {
    this.show();
}

function ObjLayerActionHide( ) {
    this.hide();
}

function ObjLayerActionShowAudio(xPos){
	this.showAudio(xPos);
}

function ObjLayerActionHideAudio() {
	this.hideAudio();
}

function ObjLayerActionLaunch( ) {
}

function ObjLayerActionExit( ) {
  if( this.frameElement && this.frameElement.id && this.frameElement.id.indexOf('DLG_content') == 0 )
    closeDialog();
  else
    window.top.close()
}

function ObjLayerActionChangeContents( ) {
}

function ObjLayerActionTogglePlay( ) {
}

function ObjLayerIsVisible() {
  if( !this.styObj || this.styObj.visibility == "hide" || this.styObj.visibility == "hidden" ) return false;
  else return true;
}

{ // Setup prototypes
var p=ObjLayer.prototype
p.moveTo = ObjLayerMoveTo
p.moveBy = ObjLayerMoveBy
p.clipInit = ObjLayerClipInit
p.clipTo = ObjLayerClipTo
p.show = ObjLayerShow
p.hide = ObjLayerHide
p.showAudio = ObjLayerShowAudio
p.hideAudio = ObjLayerHideAudio
p.actionGoTo = ObjLayerActionGoTo
p.actionGoToNewWindow = ObjLayerActionGoToNewWindow
p.actionPlay = ObjLayerActionPlay
p.actionStop = ObjLayerActionStop
p.actionShow = ObjLayerActionShow
p.actionHide = ObjLayerActionHide
p.actionShowAudio = ObjLayerActionShowAudio
p.actionHideAudio = ObjLayerActionHideAudio
p.actionLaunch = ObjLayerActionLaunch
p.actionExit = ObjLayerActionExit
p.actionChangeContents = ObjLayerActionChangeContents
p.actionTogglePlay = ObjLayerActionTogglePlay
p.isVisible = ObjLayerIsVisible
p.write = ObjLayerWrite
p.hackForNS4 = ObjLayerHackForNS4
p.getEle = ObjLayerGetElement
}

// InitObjLayers Function
function InitObjLayers(pref) {
  if (!ObjLayer.bInit) ObjLayer.bInit = true
  if (is.ns) {
    if (pref) ref = eval('document.'+pref+'.document')
    else {
      pref = ''
      if( is.ns5 ) {
        document.layers = document.getElementsByTagName("*")
        ref = document
      }
      else ref = document
    }
    for (var i=0; i<ref.layers.length; i++) {
      var divname
      if( is.ns5 ) {
        if( ref.layers[i] ) divname = ref.layers[i].tagName
        else divname = null
      }
      else divname = ref.layers[i].name
      if( divname ) {
        ObjLayer.arrPref[divname] = pref
        if (!is.ns5 && ref.layers[i].document.layers.length > 0) {
          ObjLayer.arrRef[ObjLayer.arrRef.length] = (pref=='')? ref.layers[i].name : pref+'.document.'+ref.layers[i].name
        }
      }
    }
    if (ObjLayer.arrRef.i < ObjLayer.arrRef.length) {
      InitObjLayers(ObjLayer.arrRef[ObjLayer.arrRef.i++])
    }
  }
  return true
}

ObjLayer.arrPref = new Array()
ObjLayer.arrRef = new Array()
ObjLayer.arrRef.i = 0
ObjLayer.bInit = false

function ObjLayerSlideEnd() {
  this.tTrans = -1;
  if (this.orgPos)
  {
	this.x = this.orgPos[0];
	this.ele.style.left = this.x+"px";
	this.y = this.orgPos[1];
	this.ele.style.top = this.y+"px";
	this.orgPos=0;
  }
}

function ObjLayerHackForNS4() {
  if( this.isVisible() )
  {
    this.hide()
    setTimeout( this.obj+".show()", 10 )
  }
}

function ObjLayerGetElement(tag){
	if(tag.indexOf("div") >-1)
	{
		if(this.isSVG)
		{
			return this.objDiv;
		}
		else
		{
			return this.ele;
		}
	}
	if(tag.indexOf("reflection") >-1)
	{
		return this.reflectDiv;
	}
}

function ObjLayerWrite(html) {
  this.event.innerHTML = html
}

function BrowserProps() {
  var name = navigator.appName
  var ua = navigator.userAgent.toLowerCase();
  
  if (name=="Netscape") name = "ns"
  else if (name=="Microsoft Internet Explorer") name = "ie"
  
  this.v = parseInt(navigator.appVersion,10)
  this.op = ua.indexOf("opera")!=-1
  this.ns = ((name=="ns" && this.v>=4)||this.op)
  this.ns4 = (this.ns && this.v==4)
  this.ns5 = ((this.ns && this.v==5)||this.op)
  this.nsMac = (this.ns && navigator.platform.indexOf("Mac") >= 0 )
  this.ie = (name=="ie" && this.v>=4)
  this.ie6 = (this.ie && navigator.appVersion.indexOf('MSIE 6')>0)
  if( this.ie ) this.v = parseInt( navigator.appVersion.substr( navigator.appVersion.indexOf('MSIE') + 5),10);
  this.quirksMode = (this.ie && document.documentMode == 5);
  this.ie8 = (this.ie && (document.documentMode == 8 || document.documentMode == 7 || document.documentMode == 6 || document.documentMode == 5));	//echo LD-774 : This is a bit of a hack but any document modes less than 8 will run through the same logic as IE8. 
  this.ie9 = (this.ie && document.documentMode == 9);
  this.ie9Native = (this.ie && navigator.userAgent.indexOf("MSIE 9.0") != -1 && navigator.userAgent.indexOf("Trident/5.0") != -1);
  this.ie10 = (this.ie && document.documentMode == 10);
  this.gecko = (ua.indexOf("gecko") != -1);
  this.firefox = (ua.indexOf("firefox") != -1);
  this.ieMac = (this.ie && navigator.platform.indexOf("Mac") >= 0 )
  this.min = (this.ns||this.ie)
  this.Mac = (navigator.platform.indexOf("Mac") >= 0)
  this.activeX = ( this.ie ) ? true : false; 
  this.wmpVersion = 6; // default version number we only support 7 and up
  if( ua.indexOf("iphone")!=-1 || ua.indexOf("ipod")!=-1 || ua.indexOf("ipad")!=-1 ) this.iOS = 1;
  else this.iOS = 0;
  this.chrome = ua.indexOf("chrome") != -1;
  this.webkit = ua.indexOf(" applewebkit/") != -1;
  this.safari = ( navigator.vendor && navigator.vendor.indexOf('Apple') >= 0 ? true : false );
  this.iOSSafari = (this.safari && this.iOS);
  this.android = ua.indexOf("android") != -1;
  this.awesomium = ua.indexOf("awesomium") != -1;
  this.bSupportsClickMap = (!this.ie || // All non-IE browsers support click map
                             (!this.ie9 &&
                                document.createElementNS != undefined &&
                                document.createElementNS("http://www.w3.org/2000/svg", "path") &&
                                document.createElement("BUTTON").addEventListener != undefined)); // and most recent IE browsers do to 

  if ( (this.ie8 || this.ie9) && document.namespaces && !document.namespaces['v'] )
    document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', "#default#VML");
  
  this.vml = document.namespaces && document.namespaces['v']?true:false;
  this.svg = document.namespaces && document.namespaces['v']?false:true;
  
  //echo LD-768 : Direct-X filters are disabled by default in IE10 and IE11 so they will not render legacy filters if we're running in a document mode of 8 or 9.
  this.DXFilterSupported = !(this.ie &&
							 (document.documentMode == 5 || document.documentMode == 6 || document.documentMode == 7 || document.documentMode == 8 || document.documentMode == 9) &&
							 (navigator.userAgent.indexOf("Trident/6.0") != -1 || navigator.userAgent.indexOf("Trident/7.0") != -1));
							 
  this.bUseVML = IEScriptEnabled();
  
  var player = null;
  try 
  {
    if(window.ActiveXObject)
      player = new ActiveXObject("WMPlayer.OCX.7");
    else if (window.GeckoActiveXObject)
      player = new GeckoActiveXObject("WMPlayer.OCX.7");
    else
      player = navigator.mimeTypes["application/x-mplayer2"].enabledPlugin;		
  }
  catch(e)
  {
    // Handle error only if title has wmp-- no WMP control
 
  }
  
  if( player && player.versionInfo ) {
    this.wmpVersion = player.versionInfo.slice(0,player.versionInfo.indexOf('.'));
  }
  
	/*
	 * Use HTML5 if Flash is not present and browser is capable.
	 */
	this.useHTML5Video = function()
	{
		return ( !this.flashVersion(9,0,0) && supports_h264_baseline_video() ); 
	}
	this.useHTML5Audio = function()
	{
		return ( !this.flashVersion(9,0,0) && !!document.createElement('audio').canPlayType ); 
	}

	/*
	 * Flash detection
	 */
	var flashVer = -1;
	// When called with reqMajorVer, reqMinorVer, reqRevision returns t if that version or greater is available
	this.flashVersion = function (reqMajorVer, reqMinorVer, reqRevision)
	{
		if (flashVer == -1 ) 
		{
			var nav = navigator;

			// NS/Opera version >= 3 check for Flash plugin in plugin array

			if (nav.plugins != null && nav.plugins.length > 0) {
				if (nav.plugins["Shockwave Flash 2.0"] || nav.plugins["Shockwave Flash"]) {
					var swVer2 = nav.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
					var flashDescription = nav.plugins["Shockwave Flash" + swVer2].description;
					var descArray = flashDescription.split(" ");
					var tempArrayMajor = descArray[2].split(".");
					var versionMajor = tempArrayMajor[0];
					var versionMinor = tempArrayMajor[1];
					var versionRevision = descArray[3];
					if (versionRevision == "") {
						versionRevision = descArray[4];
					}
					if (versionRevision[0] == "d") {
						versionRevision = versionRevision.substring(1);
					} else if (versionRevision[0] == "r") {
						versionRevision = versionRevision.substring(1);
						if (versionRevision.indexOf("d") > 0) {
							versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
						}
					}
					flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
					//alert("flashVer="+flashVer);
				}
			}
			else if ( this.ie && !this.Mac && !this.op ) {

				var axo;
				// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
				try {
					// version will be set for 7.X or greater players
					axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
					flashVer = axo.GetVariable("$version");
				} catch (e) {
				}

				if (!flashVer)
				{
					try {
						// version will be set for 6.X players only
						axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

						// installed player is some revision of 6.0
						// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
						// so we have to be careful.

						// default to the first public version
						flashVer = "WIN 6,0,21,0";

						// throws if AllowScripAccess does not exist (introduced in 6.0r47)
						axo.AllowScriptAccess = "always";

						// safe to call for 6.0r47 or greater
						flashVer = axo.GetVariable("$version");

					} catch (e) {
					}
				}
			}
		}
		
		if (flashVer == -1 ) {
			return false;
		} else if (flashVer != 0) {
			var versionArray;
			if(this.ie && !this.Mac && !this.op) {
				// Given "WIN 2,0,0,11"
				var tempArray     = flashVer.split(" "); 	// ["WIN", "2,0,0,11"]
				var tempString        = tempArray[1];			// "2,0,0,11"
				versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
			} else {
				versionArray      = flashVer.split(".");
			}
			var versionMajor      = versionArray[0];
			var versionMinor      = versionArray[1];
			var versionRevision   = versionArray[2];

			// is the major.revision >= requested major.revision AND the minor version >= requested minor
			if (versionMajor > parseFloat(reqMajorVer)) {
				return true;
			} else if (versionMajor == parseFloat(reqMajorVer)) {
				if (versionMinor > parseFloat(reqMinorVer))
					return true;
				else if (versionMinor == parseFloat(reqMinorVer)) {
					if (versionRevision >= parseFloat(reqRevision))
						return true;
				}
			}
			return false;
		}
	};
}

is = new BrowserProps()

// CSS Function
function buildCSS(id,left,top,width,height,visible,zorder,color,other) {
  var str = (left!=null && top!=null)? '#'+id+' {position:absolute; left:'+left+'px; top:'+top+'px;' : ((width!=null && height!=null) ? '#'+id+' {position:relative;' : '#'+id+' {position:fixed; width:100%; height:100%;' )
  if (arguments.length>=4 && width!=null) str += ' width:'+width+'px;'
  if (arguments.length>=5 && height!=null) {
    str += ' height:'+height+'px;'
    if (arguments.length<9 || other.indexOf('clip')==-1) str += ' clip:rect(0px '+width+'px '+height+'px 0px);'
  }
  if (arguments.length>=6 && visible!=null) str += ' visibility:'+ ( (visible)? 'inherit' : 'hidden' ) +';'
  if (arguments.length>=7 && zorder!=null) str += ' z-index:'+zorder+';'
  if (arguments.length>=8 && color!=null) str += ' background:'+color+';'
  if (arguments.length==9 && other!=null) str += ' '+other
  str += '}\n'
  return str
}

function addRotateCSS(angle, hasShadow, width, height, xPos, yPos, shadowDirection, shadowDepth, shadowBlurRadius, verticalFlip, horizontalFlip, boundsRectX, boundsRectY, adornerWidth, adornerHeight){
	var radians = angle * (Math.PI / 180.0);
	
	//if the image has a shadow, the point of rotation needs to be adjusted
	var shadowRadians = 0.0;
	var yOffset = 0;
	var xOffset = 0;
	if(hasShadow > 0)
	{
		shadowRadians = shadowDirection * (Math.PI / 180.0);
		//A negative yOffset means the shadow is going up the screen
		xOffset = shadowDepth * parseFloat(Math.cos(shadowRadians).toFixed(5));
		yOffset = -1 * shadowDepth * parseFloat(Math.sin(shadowRadians).toFixed(5));
	}
	else
	{
		shadowDirection = 0;
		shadowDepth = 0;
		shadowBlurRadius = 0;
	}
	
	var deltaCenterX = 0;
	var deltaCenterY = 0;
	
	if(adornerWidth == 0 || adornerHeight == 0)
	{
		deltaCenterX = width / 2.0;
		deltaCenterY = height / 2.0;
	}
	else
	{
		deltaCenterX = (adornerWidth / 2) - boundsRectX;
		deltaCenterY = (adornerHeight / 2) - boundsRectY;
	}
	
	var m11 = Math.cos(radians);
	var m12 = -1 * Math.sin(radians);
	var m21 = Math.sin(radians);
	var m22 = Math.cos(radians);
	
	
	var rotateAttribute = '';
	
	if( is.chrome || is.safari)
	{
		if(xOffset < 0) deltaCenterX = deltaCenterX - (xOffset - shadowBlurRadius);
		if(yOffset < 0) deltaCenterY = deltaCenterY - (yOffset - shadowBlurRadius);
		rotateAttribute += '-webkit-transform-origin: ' + deltaCenterX + 'px ' + deltaCenterY + 'px;';
		
		rotateAttribute += '-webkit-transform:rotate(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			rotateAttribute += 'scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			rotateAttribute += 'scaleX(-1)';
		}
		
		rotateAttribute += ';';
	}
	else if( is.firefox )
	{
		if(xOffset < 0) deltaCenterX = deltaCenterX - (xOffset - shadowBlurRadius);
		if(yOffset < 0) deltaCenterY = deltaCenterY - (yOffset - shadowBlurRadius);
		rotateAttribute += '-moz-transform-origin: ' + deltaCenterX + 'px ' + deltaCenterY + 'px;';
		
		rotateAttribute += '-moz-transform:rotate(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			rotateAttribute += 'scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			rotateAttribute += 'scaleX(-1)';
		}
		
		rotateAttribute += ';';
	}
	else if( is.ie8 || is.ie9)
	{		
		//Image rotation for IE8 and 9 is done inside of ObjImageBuild because of VML notation
	}
	else 
	{
		if(xOffset < 0) deltaCenterX = deltaCenterX - (xOffset - shadowBlurRadius);
		if(yOffset < 0) deltaCenterY = deltaCenterY - (yOffset - shadowBlurRadius);
		rotateAttribute += 'transform-origin: ' + deltaCenterX + 'px ' + deltaCenterY + 'px;';
		
		rotateAttribute += 'transform:rotate(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			rotateAttribute += 'scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			rotateAttribute += 'scaleX(-1)';
		}
		
		rotateAttribute += ';';
	}
	
	return rotateAttribute;
}

//Opacity is passed in as a number between 0-100
function addOpacityCSS(opacityVal){
	var opacityAttribute = '';
	if(!(is.ie8 || is.ie9))
		opacityAttribute += 'opacity: ' + (opacityVal/100.0) + ';';
	else
		opacityAttribute += 'filter: alpha(opacity=' + opacityVal + ');'
	fOpacity = opacityVal;
	return opacityAttribute;
}

function addSvgShadowFilter(name,width, height, direction, depth, opacity, red, green, blue, blurRadius, type)
{
	var radians = direction * (Math.PI / 180.0);
	var xOffset = depth * Math.cos(radians);
	var yOffset = -1 * depth * Math.sin(radians);

	xOffset = xOffset.toFixed(5);
	yOffset = yOffset.toFixed(5);
	
	var svgFilter = '<svg width="' + (Math.abs(1*width) + Math.abs(1*xOffset)) + 'px" height="' + (Math.abs(1*height) + Math.abs(1*yOffset)) + 'px">\n';
	svgFilter += '<defs>\n';
	var stdBlurRadius = blurRadius/1.8;
	if(xOffset <= 0 || yOffset <= 0)
	{
		svgFilter += '<filter id = "' + name +'Shadow" '
		if(xOffset <= 0)
		{
			var xDisplacementPercentage = (((xOffset - blurRadius) / width) * 100).toFixed(5);
			svgFilter += 'x = "' + xDisplacementPercentage + '%" '
		}
		else svgFilter += 'x = "0" '
		if(yOffset <= 0)
		{
			var yDisplacementPercentage = (((yOffset - blurRadius) / height) * 100).toFixed(5);
			svgFilter += 'y = "' + yDisplacementPercentage + '%" '
		}
		else svgFilter += 'y = "0" '
		
		svgFilter += 'width="200%" height="200%">\n';
	}
	else
		svgFilter += '<filter id = "' + name +'Shadow" x = "0" y = "0" width="200%" height="200%">\n';
	
		svgFilter += '<feColorMatrix result = "colorResult" in = "SourceAlpha" type = "matrix" values = "0 0 0 ' + (red / 255.0).toFixed(6) + ' 0 0 0 0 ' + (green / 255.0).toFixed(6) + ' 0 0 0 0 ' + (blue / 255.0).toFixed(6) + ' 0 0 0 0 '+opacity+' 0"/>\n';
	svgFilter += '<feOffset result = "offsetResult" in = "colorResult" dx = "' + xOffset + '" dy = "' + yOffset + '" />\n';
	svgFilter += '<feGaussianBlur result = "blurResult" in = "offsetResult" stdDeviation = "'+stdBlurRadius+'" />\n';							//stdDeviation is the blurRadius
	svgFilter += '<feBlend in = "SourceGraphic" />'
	svgFilter += '</filter>\n';
	svgFilter += '</defs>\n';
	svgFilter += '</svg>';
	
	return svgFilter;
}

function addReflection(name, src, topLeftX, topLeftY, width, height, angle, offset, fadeRate, visible, 
					   verticalFlip, horizontalFlip, boundsRectX, boundsRectY, adornerWidth, adornerHeight, 
					   zOrd, ie8DivX, ie8DivY, ie8DivWidth, ie8DivHeight, ie8ReflectionImgX, ie8ReflectionImgY){
	var reflection = '';
	
	var bIsButton = name.indexOf("button") != -1 ? true : false;
	var bIsImage = name.indexOf("image") != -1 ? true : false;
	
	if(is.awesomium || is.ie8 || is.ie9)
	{
		if(visible ==0)
		{
			visible =1;
			topLeftX = -width;
			topLeftY = -height;
		}
	}
	
	reflection += '<div id="'+name+'ReflectionDiv" style="visibility:'+((visible)?'inherit':'hidden')+';z-index:'+zOrd+';';
	
	var deltaCenterX = 0;
	var deltaCenterY = 0;
	
	if(adornerWidth == 0 || adornerHeight == 0)
	{
		deltaCenterX = width / 2.0;
		deltaCenterY = height / 2.0;
	}
	else
	{
		deltaCenterX = (adornerWidth / 2.0) - boundsRectX;
		deltaCenterY = (adornerHeight / 2.0) - boundsRectY;
	}
	
	if(is.awesomium)
		if(angle == 0)
			angle = 360;
	
	if(is.chrome || is.safari)
	{
	
		reflection += '-webkit-transform-origin:'+ deltaCenterX+'px '+deltaCenterY+'px; -webkit-transform:rotateX(180deg)';
		
		if(angle > 0)
			reflection += ' rotateZ(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleY(1)';
			if(bIsImage) reflection += ' scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleX(1)';
			if(bIsImage) reflection += ' scaleX(-1)';
		}
	}
	else if(is.ie8 || is.ie9)
	{
		//echo bug 21657 : ie8 and ie9 rotations are flipped using a vml style attribute
	}
	else if(is.firefox)
	{
		reflection += '-moz-transform-origin:'+deltaCenterX+'px '+deltaCenterY+'px; -moz-transform:rotateX(180deg)';
		
		if(angle > 0)
			reflection += ' rotateZ(' + angle + 'deg)';
			
		if(verticalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleY(1)';
			if(bIsImage) reflection += ' scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleX(1)';
			if(bIsImage) reflection += ' scaleX(-1)';
		}
	}
	else
	{
		reflection += 'transform-origin:'+deltaCenterX+'px '+deltaCenterY+'px; transform:rotateX(180deg)';
		
		if(angle > 0)
			reflection += ' rotateZ(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleY(1)';
			if(bIsImage) reflection += ' scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleX(1)';
			if(bIsImage) reflection += ' scaleX(-1)';
		}
	}
	
	if(!(is.ie8 || is.ie9))
		reflection += '; opacity: ' + (fOpacity/100.0);
		
	if(is.ie8 || is.ie9)
		reflection += '; position:absolute; top:' + ie8DivY + 'px; left:' + ie8DivX + 'px; width:' + ie8DivWidth + 'px; height:' + ie8DivHeight + 'px;">\n';
	else
		reflection += '; position:absolute; top:' + topLeftY + 'px; left:' + topLeftX + 'px; width:' + width + 'px; height:' + height + 'px;">\n';
	
	if(!is.ie8 && !is.ie9)
	{
		reflection += '<svg focusable="false" style="overflow:visible;" >\n';
		reflection += '<defs>\n';
		
		if(is.awesomium)
		{
			var radians = (Math.PI / 180.0);
			var cosAngle = Math.cos(radians);
			var sinAngle = Math.sin(radians);

			var startVectX = (0.5 + (0.5 * sinAngle)).toFixed(2);
			var startVectY = (0.5 - (0.5 * cosAngle)).toFixed(2);
			var endVectX = (0.5 - (0.5 * sinAngle)).toFixed(2); 
			var endVectY = (0.5 + (0.5 * cosAngle)).toFixed(2);
			
			reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + startVectX + '" y1="' + startVectY + '" x2="' + endVectX + '" y2="' + endVectY + '">\n';	
		}
		else
		{
			var radians = 0;
			if( (verticalFlip == 1 && horizontalFlip !=1) || (verticalFlip != 1 && horizontalFlip == 1) || (horizontalFlip == 1 && verticalFlip == 1))
				radians = (1 * angle) * (Math.PI / 180.0);
			else
				radians = (-1 * angle) * (Math.PI / 180.0);
				
			var cosAngle = Math.cos(radians);
			var sinAngle = Math.sin(radians);
			
			var startVectX = (0.5 + (0.5 * sinAngle)).toFixed(2);
			var startVectY = (0.5 - (0.5 * cosAngle)).toFixed(2);
			var endVectX = (0.5 - (0.5 * sinAngle)).toFixed(2); 
			var endVectY = (0.5 + (0.5 * cosAngle)).toFixed(2);
			
			//echo bug 21516 : Buttons are published out flipped so they don't need the javascript to do it for them.
			if(verticalFlip == 1 && horizontalFlip == 0 && bIsImage) 
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + startVectX + '" y1="' + startVectY + '" x2="' + endVectX  + '" y2="' + endVectY + '">\n';
			}
			else if(verticalFlip == 0 && horizontalFlip == 1 && bIsImage)
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + endVectX + '" y1="' + endVectY + '" x2="' + startVectX  + '" y2="' + startVectY + '">\n';
			}
			else if(verticalFlip == 1 && horizontalFlip == 1 && bIsImage)
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + endVectX + '" y1="' + startVectY + '" x2="' + startVectX  + '" y2="' + endVectY + '">\n';
			}
			else
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + endVectX + '" y1="' + endVectY + '" x2="' + startVectX + '" y2="' + startVectY + '">\n';
			}
		}
			
		reflection += '<stop offset="10%" stop-color="white" stop-opacity="0.5"/>\n';
		reflection += '<stop offset="' + (offset * 100) + '%" stop-color="white" stop-opacity="0"/>\n';
		reflection += '</linearGradient>\n';
		reflection += '<mask id="' + name + 'Mask" maskUnits="objectBoundingBox">\n';
		reflection += '<rect x="0" y="0" width="' + width + '" height="' + height +'" style="fill:url(#' + name + 'AlphaGradient);"/>\n';
		reflection += '</mask>\n';
		reflection += '</defs>\n';
		reflection += '<image id="'+name+'Reflection" xlink:href="' + src + '" preserveAspectRatio="none" width = "' + width + 'px" height = "' + height + 'px" mask="url(#' + name + 'Mask)"/>\n';
		reflection += '</svg>\n';
	}
	else
	{
		if(verticalFlip == 0 && horizontalFlip == 0) 
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:y; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+angle+';" alt=""/>\n';
		}
	
		if(horizontalFlip == 1 && verticalFlip == 0)
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:x; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+(180-angle)+';" alt=""/>\n';
		}
		
		if(horizontalFlip == 0 && verticalFlip == 1)
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:y; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+ (360-angle)+';" alt=""/>\n';
		}
		
		if(horizontalFlip == 1 && verticalFlip == 1)
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:y; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+(360-angle)+';" alt=""/>\n';
		}
	}
	
	reflection += '</div>\n';
	
	return reflection;
}

function writeStyleSheets(str) {
  cssStr = '<style type="text/css">\n'
  cssStr += str
  cssStr += '</style>'
  document.write(cssStr)
}

function preload() {
  if (!document.images) return;
  var ar = new Array();
  for (var i = 0; i < arguments.length; i++) {
    ar[i] = new Image();
    ar[i].src = arguments[i];
  }
}

function getHTTP(dest, method, parms, errOk)
{
    var httpReq;
    if( method == 'GET' ) { 
        if( parms ) {
          if( dest.indexOf('?' ) > 0 )
            dest += '&';
          else
            dest += '?';
          dest += parms;
          parms = null;
        }
    }
    
    var msg = 'Issuing ' + method + ' to ' + dest;
    if( parms ) msg += ' for [' + parms + ']';
    trivLogMsg( msg, 8 );
    
    var requestSent = 0;
    try { 
        // branch for native XMLHttpRequest object
        if (window.XMLHttpRequest) {
            httpReq = new XMLHttpRequest();
            httpReq.open(method, dest, false);
            httpReq.onreadystatechange = null;
            if( method == 'POST' ) {
              httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            }
            httpReq.send(parms); 
            requestSent = 1;
        } 
    }
    catch(e){
      if( typeof(errOk) != "undefined" && errOk != null && e.code == errOk )
        requestSent = 1;
    }
    
    // branch for IE/Windows ActiveX version
    if (!requestSent && window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");
        if (httpReq) {
            httpReq.open(method, dest, false);
            if( method == 'POST' ) {
              httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            }
            httpReq.send(parms);
        }
    }
    trivLogMsg( 'ReturnCode = ' + httpReq.status + ' Received Data [' + httpReq.responseText + ']', 8 );
    return httpReq;
}

function GenRand( min, max )
{
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function Encode( s )
{
  if( s == null ) return '';
  return encodeURIComponent( String(s) );
}

function Decode( s )
{
  if( s == null ) return '';
  return decodeURIComponent( String(s) );
}

function UniUnescape( s )
{
  if( s == null ) return '';
  return( unescape( String(s).replace(/%5Cu/g, '%u') ) );
}

function unJUN( s )
{
  var val = "";
  if( s != null )
  {
    for( i=0; i<s.length; i++ )
    {
      if( s.charAt(i) == '\\' && s.length > (i + 5) && s.charAt(i+1) == 'u' )
      {
        cEsc = '%';
        cEsc += s.substring(i+1,i+6);
        c = unescape(cEsc);
        if( c.length == 1 )
        {
          val += c;
          i += 5;
        }
        else
        {
          val += s.charAt(i);
        }
      }
      else
      {
        val += s.charAt(i);
      }
    }
  }
  return val;
}

function convJS( s )
{
  if( s == null ) return '';
  s = s.replace(/\n/g, '<br/>');
  s = s.replace(/\\r/g, '<br/>');
  s = s.replace(/"/g, '&quot;');
  return s;
}

function addDelimeter( arrCh, strAns, del ) {
  var retVar = "";
  if( strAns != null && strAns != "" )
  {
    var strTmpChoice = "";
    var loc;
    var str = "," + strAns + ",";
    for( var i=0; i<arrCh.length; i++ ) {
      strTmpChoice = "," + arrCh[i] + ",";
      loc = str.indexOf(strTmpChoice);
      if( loc != -1 )
      {
        if( retVar.length == 0 )
          retVar = del;
        retVar += arrCh[i] + del;
      }
    }
  }
  return retVar;
}

function getContentWindow()
{
  var win = window;
  if( window.frameElement && ( window.frameElement.name == 'titlemgrframe' ) )
  {
    if( window.frameElement.parentNode )
    {
      for( i=0; i<window.frameElement.parentNode.childNodes.length; i++ )
      {
        if( window.frameElement.parentNode.childNodes[i].name == 'contentframe' )
        {
          win = window.frameElement.parentNode.childNodes[i].contentWindow;
          break;
        }
      }
    }
  }
  return win;
}


function trivAlert( pWinId, title, msg, cb )
{
	if( trivWeb20Popups )
	{
		var alertMsg = msg.replace(/\n/g, "<br>"); // 15923 - handle line breaks
		var mb = new jsDlgMsgBox( pWinId, title, alertMsg, null, cb);
		mb.create();
	}
	else
		alert( msg );
}

function closeDialog()
{
	var close;
	var rc = false;
	if( this.frameElement && this.frameElement.parentNode )
	{
		for( i=0; i<this.frameElement.parentNode.childNodes.length; i++ )
		{
			if( this.frameElement.parentNode.childNodes[i].id == 'DLG_hiddenClose' )
			{
				close = this.frameElement.parentNode.childNodes[i];
				break;
			}
		}
		if( close && close.onclick )
		{
			close.onclick();
			rc = true;
		}
	}
	return rc;
}

function CloseWnd() {
  if( this.frameElement && this.frameElement.id && this.frameElement.id.indexOf('DLG_content') == 0 )
    closeDialog();
  else
    window.close();
}

function createXMLHTTPObject(filename){
	var httpReq;
	try{
		if ( window.ActiveXObject ){
			httpReq = new ActiveXObject("Microsoft.XMLHTTP");

			if (httpReq){
				httpReq.open('GET', filename, false);
				httpReq.send();
			}
		}
		else if ( window.XMLHttpRequest ){
			httpReq = new XMLHttpRequest();
			httpReq.open('GET', filename, false);
			httpReq.onreadystatechange = null;
			httpReq.send("noCache=" + (new Date().getTime()) );
		}

		var respXML = httpReq.responseXML;
		if ( window.ActiveXObject ){
			respXML = new ActiveXObject("Microsoft.XMLDOM");
			respXML.async = "false";
			respXML.loadXML(httpReq.responseText);
		}

	}
	catch(e) {}
	return respXML;
}

function getNVStr(nl,tag){
	var ar = nl.getElementsByTagName(tag);
	for( var i=0; i<ar.length; i++ )
		if( ar[i] && ar[i].firstChild && ar[i].parentNode == nl ) return ar[i].firstChild.data;
	return "";
}

function getTextData(filename, textblockname){
	if( trivDynXMLfilePath.length > 4 ) 
		filename = trivDynXMLfilePath;
	var nl = createXMLHTTPObject(filename);
	var arTB = nl.getElementsByTagName('textblock');
	for( var i = 0; arTB && i < arTB.length; i++ ){
		if(arTB[i].getAttribute('name') == textblockname)
			return getNVStr( arTB[i], 'text' );
	}
	return '';
}

function getAllChildrenSpanElem(targetDocument, currentElement, arr) {
    if (currentElement) {
        var j;
        var tagName = currentElement.tagName;

        if (tagName == 'SPAN')
            arr.push(currentElement);

        var i = 0;
        var currentElementChild = currentElement.childNodes[i];
        while (currentElementChild) {
            getAllChildrenSpanElem(targetDocument, currentElementChild, arr);
            i++;
            currentElementChild = currentElement.childNodes[i];
        }
    }
}

function supports_video() {
    return !!document.createElement('video').canPlayType;
}

function supports_h264_baseline_video() {
    if (!supports_video()) { return false; }
    var v = document.createElement("video");
    return /^(probably|maybe)$/i.test(v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
}

function trivTimerLoop( timerVar, durInSec, onDone, updatefunc, propsStr, bRecur ){
	var timerVarVal = timerVar.getValue();
	var startTime = parseInt( timerVarVal );
	var paused = false;
	var now = parseInt((new Date().getTime()+500)/1000)*1000;
	if( timerVarVal!=null && typeof(timerVarVal)!="undefined")
	{
		timerVarVal = timerVarVal.toString();
		var bPause = timerVarVal.indexOf( "pause:" ) != -1;
		var bDone  = timerVarVal.indexOf( "done:" ) != -1;
		if( bPause || bDone )
		{
			var remainingTime = parseInt( timerVarVal.split(':')[1]) ;
			startTime = ( now - remainingTime );
			if( bPause )
				paused = true;
			else
			{
				if( bRecur )
					paused = true;
				else
					timerVar.set( startTime );
			}
		}
	}
	
	if( ( startTime == 0 || startTime > now  )&& !paused)
	{
		//this is a fresh timer: 
		startTime = now;
		timerVar.set( startTime );
	}	
	
	var props = eval(propsStr);
	var strRemain = getRemainingTime(now, startTime, durInSec*1000, props.bShowHours, props.bShowMin, props.bShowSec, props.countdown );
	
	if( strRemain == null && !paused)
	{
		timerVar.set( "pause:-999999999999999" ); //negative remaining time, this will signify timer completed.
		eval( onDone ); 
	}
	else 
	{
		if( strRemain == null )
			strRemain = buildTimeString( (props.countdown)?0:(durInSec*1000), props.bShowHours, props.bShowMin, props.bShowSec );
		var updFunc = eval(updatefunc);
		updFunc( strRemain );
	}
	
	var strExec = "trivTimerLoop(" + timerVar.name + "," + durInSec + ",'" + onDone +"','" + updatefunc + "', '" + propsStr + "', true )";
	setTimeout( strExec, 500 );
}

function buildTimeString(lRemain, showHours, showMins, showSecs )
{
	var strRemain = '';
	
    lRemain = lRemain/1000;
	
    var temp = parseInt(lRemain/3600);
    lRemain -= temp * 3600;
    if ( showHours )
	{
		strRemain += temp + ':';
	}
    else
		strRemain += '  ';
		
    temp = parseInt(lRemain/60);
    lRemain -= temp * 60;
    if ( showMins )
    {
        if( temp <= 9 )
			strRemain += '0';
	    strRemain += temp;
    }
    if ( showSecs )
    {
        if ( showMins )
            strRemain += ':';
        if( lRemain <= 9 )
            strRemain += '0';
        strRemain += parseInt( lRemain );
    }
	return strRemain;
}

function getRemainingTime( now, lStartTime, lDuration, showHours, showMins, showSecs, countDown ) 
{ 
  lStartTime = parseInt(lStartTime/1000)*1000
  var lRemain = 0;
  var timeSoFar = 0;
  var lCurr = 0;
  var now = parseInt((new Date().getTime()+500)/1000)*1000;
  
  if( lStartTime > now )
	return null;

  lCurr = now - lStartTime;

  lRemain = lDuration - lCurr;

  if ( !countDown )
  {
	timeSoFar = lDuration - lRemain;

	if ( timeSoFar > lDuration )
		return null;
	lRemain = timeSoFar;
  }
  
  if( countDown && lRemain > 0 || !countDown && timeSoFar < lDuration)
    return buildTimeString( lRemain, showHours, showMins, showSecs, countDown );
  else
    return null;
}

function validateNum(evt) {
  var theEvent = evt || window.event;
  if( is.ns && !is.chrome && theEvent.keyCode != 0 ) return;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\.|\,|\-/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function addImageMapCoords(obj)
{
	var strMap = '';
	strMap += '<map id="'+obj.name+'Map" name="' + obj.name + 'Map">\n';
	strMap += '<area name="' + obj.name + 'MapArea" id="' + obj.name + 'MapArea"shape="poly" coords="' + obj.str_ImageMapCoords + '"';
    if( obj.hasOnUp && !is.iOS ) strMap += ' href="javascript:void(null)"'
    if( obj.hasOnUp && is.iOS ) strMap += ' href="javascript:' + this.name + '.up()"'
	strMap += '>';
	strMap += '</map>\n';
	
	return strMap;
}

function IsPointInPolygon(p, arrPoints)
{
	var num = arrPoints.length;
    var i = 1;
    var j = 0;
    var c = false;
	
	for( ; i<num; i++ )
	{
		var pi = arrPoints[i];
		var pj = arrPoints[j];
		
        if(  (( pi.Y > p.Y) != (pj.Y > p.Y)) && (p.X < (pj.X - pi.X) * (p.Y - pi.Y) / (pj.Y - pi.Y) + pi.X) )
            c = !c;
        j = i;
	}
	
    return c;
}

function AdjustClickPointsForAct(thisObj)
{
	var pIh = (thisObj.h/thisObj.oh);
	var pIw = (thisObj.w/thisObj.ow);

	if(thisObj.bHasClickMap && thisObj.objLyr && thisObj.objLyr.growActive == false)
	{
		var svgStr = "";
		var mapStr = "";
		if(thisObj.bSVGMap)
		{
			var map = thisObj.str_SvgMapPath.split(" ");
			for (index = 0; index < map.length; index++)
			{
				var x = 0;
				var y = 0;
				if(index%3 == 0)
				{
					svgStr += map[index];
				}
				else if(index%3 == 1)
				{
					x = parseFloat(map[index]);
					if(x)
					{
						x = x * pIw;
						svgStr+= x.toFixed(2).toString();
					}
					else
					{
						svgStr+=map[index];
					}
				}
				else if(index%3 == 2)
				{
					y = parseFloat(map[index]);
					if(y)
					{
						y = y * pIh;
						svgStr+= y.toFixed(2).toString();
					}
					else
					{
						svgStr+=map[index];
					}
				}
				if(index+1 != map.length)
					svgStr+= " ";
			}
			thisObj.str_SvgMapPath = svgStr;
		}
		else
		{
			var map = thisObj.str_ImageMapCoords.split(",");
			for (index = 0; index < map.length; index++)
			{
				var x = 0;
				var y = 0;
				if(index%2 == 0)
				{
					x = (parseFloat(map[index]) * pIw);
					mapStr+= x.toFixed(2).toString();
				}
				else
				{
					y = (parseFloat(map[index]) * pIh);
					mapStr+= y.toFixed(2).toString();
				}
				if(index+1 != map.length)
					mapStr+= ",";
			}
			thisObj.str_ImageMapCoords = mapStr;
		}
		
		thisObj.oh = thisObj.h;
		thisObj.ow = thisObj.w;
		return true;
	}
	return false;
}

/*
 * pads number n with z or '0' so resulting string is length width
 *
 * pad(10, 4);      // 0010
 * pad(9, 4);       // 0009
 * pad(123, 4);     // 0123
 *
 * pad(10, 4, '-'); // --10
 */
function  padDigits(n, width, z)
{
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/*
 * returns null if url is in the new format
 *
 */
function parseKeyFromGDocURL(url)
{
	// parse the user supplied key (key or formKey parameters) out of the Google Docs URL:
	// the old url --> https://docs.google.com/spreadsheet/ccc?key=0AkS0S-1Hb65odEhzVVQ4UXVwa1Q1WkhiY1VULVdJLUE&usp=drive_web#gid=0
	//                                              ^-^ ^------------------------------------------^
	//
	// the new and current url --> https://docs.google.com/forms/d/11kxHt5Cu5kNN1vDJjVMxkqAQcsp1cW94A9xZzq3IqQ4/formResponse
	//

	var parts = url.match(/.*(formKey)=([^#&]+).*/i);

	if ( !parts )
		parts = url.match(/.*(key)=([^#&]+).*/i);

	if ( parts && parts.length > 2 )
		return [ parts[1], parts[2] ];

	return null;
}

//LHD --- LD-1407 Special security check
function IEScriptEnabled()
{
	var bIsEnabled = true;
	try{
		var vmlCheck = document.createElement("v:oval");
		if(typeof(vmlCheck.filters) != "object")
			bIsEnabled = false;
	}
	catch(e){
		bIsEnabled = false;
	}
	return bIsEnabled;
}
