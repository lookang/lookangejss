/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

// Image Object
function ObjImage(n,i,a,x,y,w,h,v,z) {
  this.name = n
  this.altName = a
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  if( v ) this.v = "inherit"
  else this.v = (is.ns4)? "hide" : "hidden"
  this.z = z
  this.obj = this.name+"Object"
  this.hrefPrompt = 'javascript:void(null);'
  eval(this.obj+"=this")
  this.preload(this.obj+".img",i)
}

function ObjImageActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjImageActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjImageActionPlay( ) {
  this.objLyr.actionPlay();
}

function ObjImageActionStop( ) {
  this.objLyr.actionStop();
}

function ObjImageActionShow( ) {
  this.objLyr.actionShow();
}

function ObjImageActionHide( ) {
  this.objLyr.actionHide();
}

function ObjImageActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjImageActionExit( ) {
  this.objLyr.actionExit();
}

function ObjImageActionChangeContents( newImage ) {
  this.objLyr.doc.images[this.name+"Img"].src = newImage
}

function ObjImageActionTogglePlay( ) {
  this.objLyr.actionTogglePlay();
}

function ObjImageActionToggleShow( ) {
  this.objLyr.actionToggleShow();
}

{ // Setup prototypes
var p=ObjImage.prototype
p.preload = ObjImagePreload
p.build = ObjImageBuild
p.activate = ObjImageActivate
p.change = ObjImageChange
p.up = ObjImageUp
p.down = ObjImageDown
p.over = ObjImageOver
p.out = ObjImageOut
p.capture = 0
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDown = new Function()
p.onUp = new Function()
p.actionGoTo = ObjImageActionGoTo
p.actionGoToNewWindow = ObjImageActionGoToNewWindow
p.actionPlay = ObjImageActionPlay
p.actionStop = ObjImageActionStop
p.actionShow = ObjImageActionShow
p.actionHide = ObjImageActionHide
p.actionLaunch = ObjImageActionLaunch
p.actionExit = ObjImageActionExit
p.actionChangeContents = ObjImageActionChangeContents
p.actionTogglePlay = ObjImageActionTogglePlay
p.actionToggleShow = ObjImageActionToggleShow
p.writeLayer = ObjImageWriteLayer
p.slideTo = ObjImageSlideTo
p.moveTo = ObjImageMoveTo
}

function ObjImagePreload(imgObj,imgSrc) {
  if (imgSrc) {
    eval(imgObj+' = new Image()')
    eval(imgObj+'.src = "'+imgSrc+'"')
    eval(imgObj+'s = true')
  }
  else eval(imgObj+'s = false')
}

function ObjImageBuild() {
  this.css = buildCSS(this.name,this.x,this.y,this.w,this.h,this.v,this.z)
  var divStart
  var divEnd
  divStart = '<div id="'+this.name+'"><a name="'+this.name+'anc">'
  divEnd   = '</a></div>'
  
  if( this.capture & 4 && is.ns ){
    divStart = divStart + '<A HREF="' +this.hrefPrompt+'">'
    divEnd   = '</A>' + divEnd 
  }
  this.div = divStart + '<img name="'+this.name+'Img" src="'+this.img.src
  if( this.altName ) this.div += '" alt="['+this.altName+']'
  this.div += '" width='+this.w+' height='+this.h
  if( this.capture & 4 && !is.ns4 ) this.div += ' style="cursor:hand"'
  this.div += ' border=0>'+divEnd+'\n'
}

function ObjImageActivate() {
  this.objLyr = new ObjLayer(this.name)
  if( this.objLyr && this.objLyr.styObj ) this.objLyr.styObj.visibility = this.v
  if( this.capture & 4 ) {
    if (is.ns4) this.objLyr.ele.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
    this.objLyr.ele.onmousedown = new Function(this.obj+".down(); return false;")
    this.objLyr.ele.onmouseup = new Function(this.obj+".up(); return false;")
  }
  if( this.capture & 1 ) this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
  if( this.capture & 2 ) this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
}

function ObjImageChange(img) {
  this.objLyr.doc.images[this.name+"Img"].src = img.src
}

function ObjImageDown() {
  if( is.ie && event.button != 1 ) return
  this.onSelect()
  this.onDown()
}

function ObjImageUp() {
  if (is.ie && event.button!=1) return true
  this.onUp()
}

function ObjImageOver() {
  this.onOver()
}

function ObjImageOut() {
  this.onOut()
}

function ObjImageWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjImageSlideTo(ex,ey,amt,spd,fn) {
  if (this.objLyr) this.objLyr.slideTo(ex,ey,amt,spd,fn);
}

function ObjImageMoveTo(x,y) {
  if (this.objLyr) this.objLyr.moveTo(x,y);
}

