/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

// Button Object
function ObjButton(n,a,x,y,w,h,v,z) {
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
  this.objLyr.actionShow();
}

function ObjButtonActionHide( ) {
  this.objLyr.actionHide();
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
  this.objLyr.actionToggleShow();
}

{// Setup prototypes
var p=ObjButton.prototype
p.checkbox = false
p.preload = ObjButtonPreload
p.setImages = ObjButtonSetImages
p.build = ObjButtonBuild
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
p.slideTo = ObjButtonSlideTo
p.moveTo = ObjButtonMoveTo
}

function ObjButtonSetImages(imgOff,imgOn,imgRoll,dir) {
  if (!dir) dir = ''
  this.preload(this.obj+".imgOff",imgOff?dir+imgOff:'')
  this.preload(this.obj+".imgOn",imgOn?dir+imgOn:'')
  this.preload(this.obj+".imgRoll",imgRoll?dir+imgRoll:'')
}

function ObjButtonPreload(imgObj,imgSrc) {
  if (imgSrc) {
    eval(imgObj+' = new Image()')
    eval(imgObj+'.src = "'+imgSrc+'"')
    eval(imgObj+'s = true')
  }
  else eval(imgObj+'s = false')
}

function ObjButtonBuild() {
  this.css = buildCSS(this.name,this.x,this.y,this.w,this.h,this.v,this.z)
  this.div = '<div id="'+this.name+'"><a name="'+this.name+'anc">'
  if( is.ns4 ) this.div += '<a href="' +this.hrefPrompt+'">'
  this.div += '<img name="'+this.name+'Img" src="'+this.imgOff.src
  if( this.altName ) this.div += '" alt="['+this.altName+']'
  if( is.ns4 ) this.div += '" width='+this.w+' height='+this.h+' border=0></a>'
  else this.div += '" width='+this.w+' height='+this.h+' border=0 style="cursor:hand">'
  this.div += '</a></div>\n'
}

function ObjButtonActivate() {
  this.objLyr = new ObjLayer(this.name)
  if( this.objLyr && this.objLyr.styObj ) this.objLyr.styObj.visibility = this.v
  if (is.ns4) this.objLyr.ele.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
  this.objLyr.ele.onmousedown = new Function(this.obj+".down(); return false;")
  this.objLyr.ele.onmouseup = new Function(this.obj+".up(); return false;")
  this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
  this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
}

function ObjButtonDown() {
  if( is.ie && event.button != 1 ) return
  if (this.selected) {
    this.selected = false
    if (this.imgOns) this.change(this.imgOn)
    this.onDeselect()
  }
  else {
    if (this.checkbox) this.selected = true
    if (this.imgOns) this.change(this.imgOn)
    this.onSelect()
  }
  this.onDown()
}

function ObjButtonUp() {
  if (is.ie && event.button!=1) return true
  if (!this.selected) {
    if (this.imgRolls) this.change(this.imgRoll)
    else if (this.imgOns) this.change(this.imgOff)
  }
  this.onUp()
}

function ObjButtonOver() {
  if (this.imgRolls && !this.selected) this.change(this.imgRoll)
  this.onOver()
}

function ObjButtonOut() {
  if (this.imgRolls && !this.selected) this.change(this.imgOff)
  this.onOut()
}

function ObjButtonChange(img) {
  this.objLyr.doc.images[this.name+"Img"].src = img.src
}

function ObjButtonWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjButtonSlideTo(ex,ey,amt,spd,fn) {
  if (this.objLyr) this.objLyr.slideTo(ex,ey,amt,spd,fn);
}

function ObjButtonMoveTo(x,y) {
  if (this.objLyr) this.objLyr.moveTo(x,y);
}

