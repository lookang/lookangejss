/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/
function saveVariable(name,value,days,title) {
  var titleMgr = getTitleMgrHandle();
  var expires = ""
  
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000))
    expires = "; expires="+date.toGMTString()
  }
  
  var encValue = encodeChars( value )
  
  // Find the cookie
  var myCookie = (days ? 'LectoraPermCookie' : 'LectoraTempCookie' )
  if( title )
    myCookie += '_' + title
    
  var nameEQ = '|' + name + "="
  var ca = document.cookie.split(';')
  var i,j
  var last = 0
  var lastVal = null
  var saveId = -1

  for(i=0;i<ca.length;i++) 
  {
    var c = ca[i];
    for( j = 0;j<c.length;j++)
    {
      if( c.charAt(j) != ' ' )
        break
    }
    c = c.substring(j);
    if( c.indexOf(myCookie) == 0 )
    {
      var ce=c.indexOf('=')
      last = parseInt( c.substring( myCookie.length, ce ))
      var vo = c.indexOf(nameEQ) 
      if( vo >= 0 )
      {
        var start=c.substring(ce+1,vo)
        var mid=c.substring(vo+nameEQ.length)
        var end=mid.indexOf( '|' )
        mid = mid.substring( end )
        lastVal = start + mid
        saveId = last
        break
      }
      else
      {
        lastVal = c.substring( ce + 1 )
      }
    }
  }
  
  if( titleMgr )
  {
    titleMgr.setVariable(name,value,days)
    if( !days && !document.TitleMgr )
      return
  }
  
  var newVal = nameEQ+encValue+"|"
  if( lastVal != null && (lastVal.length + newVal.length < 4000) )
  {
      if( lastVal )
        lastVal = lastVal.substring( 0, lastVal.length - 1 )
      if( days < 0 )
        newVal = null
      var cookieName = myCookie + last
      document.cookie = cookieName+"="+lastVal+newVal+expires+"; path=/"
  }
  else
  {
      if( lastVal != null && saveId != -1 ) {
        var oldCookie = myCookie + saveId
        document.cookie = oldCookie+"="+lastVal+expires+"; path=/"
      }
      var cookieName = myCookie + (last+1)
      document.cookie = cookieName+"="+newVal+expires+"; path=/"
  }
}

function readVariable(name,defval,days,title) {
  var titleMgr = getTitleMgrHandle();
  if( titleMgr == null || titleMgr.findVariable( name ) < 0 )
  {
    var myCookie = (days ? 'LectoraPermCookie' : 'LectoraTempCookie' )
    if( title )
      myCookie += '_' + title
    var nameEQ = '|' + name + "="
    var ca = document.cookie.split(';')
    var i,j
  
    for(i=0;i<ca.length;i++) 
    {
      var c = ca[i];
      for( j = 0;j<c.length;j++)
      {
        if( c.charAt(j) != ' ' )
          break
      }
      c = c.substring(j);
      if( c.indexOf(myCookie) == 0 )
      {
        var vo = c.indexOf(nameEQ) 
        if( vo >= 0 )
        {
          var val=c.substring(vo+nameEQ.length)
          var ve =val.indexOf( '|' )
  
          val = decodeChars( val.substring(0,ve) )
        
          if( titleMgr )
            titleMgr.setVariable(name,val,days)
          return val
        }
      }
    }
  }
  
  if( titleMgr ) {
    var res = new String( titleMgr.getVariable(name,defval,days) )
    return decodeChars( res )
  }
  return defval
}

function cleanupTitle( title ) {
  if( window.name.indexOf( 'Trivantis_' ) == -1 ) {
    var date = new Date();
    date.setTime(date.getTime()+(-1*24*60*60*1000))
    var expires = "; expires="+date.toGMTString()

    var myCookie = 'LectoraTempCookie'
    if( title )
      myCookie += '_' + title
    for( var i = 1; i < 21; i++ )
    {
      var name = myCookie + i
      if( readCookie( name, '' ) != '' )
        document.cookie = name + "=" + expires + "; path=/"
      else
        break
    }
    return 1;
  }
  else
    return 0;
}

// Variable Object
function Variable(name,defval,f,cm,frame,days,title) {
  this.origAICC = false
  this.of=f
  this.f=f
  this.eTS=null
  this.tV=null
  this.aiccframe=frame
  this.aiccgroup=null
  this.aicccore=false
  this.exp=days
  this.defVal=defval
  this.cm=0
  this.title=title
  if( cm ) {
    this.cm = -1 * cm
    if(name=='CM_Course_ID')this.name='TrivantisCourse'
    else if(name=='CM_Course_Name')this.name='TrivantisCourseName'
    else if(name=='CM_Student_ID')this.name='TrivantisLogin'
    else if(name=='CM_Student_Name')this.name='TrivantisLoginName'
    else {
      this.name=name
      this.cm = cm
    }
  }
  else if( frame ) {
    var underPos = name.indexOf('AICC_')
    if( underPos == 0 ) {
      this.origAICC = true
      this.name=name.substring(5)
      if( frame == 'scorm' ) {
        this.aiccgroup = 'cmi'
        this.name = this.name.toLowerCase()
        var core_check = this.name.substring(0,5)
        if( core_check == 'core_' ) this.name = this.name.substring(5)
        if(this.name=='lesson') this.name='cmi.suspend_data'
        else if(this.name=='vendor') this.name='cmi.launch_data'
        else if(this.name=='time') this.name='cmi.core.total_time'
        else if(this.name=='score') this.name='cmi.core.score.raw'
        else this.name = 'cmi.core.' + this.name
      }
      else if(this.name=='Core_Lesson') {
        this.aiccgroup='[CORE_LESSON]'
      }
      else if(this.name=='Core_Vendor') {
        this.aiccgroup='[CORE_VENDOR]'
      }
      else if(this.name=='Course_ID') {
        this.aiccgroup='[EVALUATION]'
      }
      else {
        this.aiccgroup='[CORE]'
        this.aicccore=true
      }
      if( frame != 'scorm' ) this.update()
    }
    else {
      if( name.indexOf('CMI_Core') == 0 ) {
        this.origAICC = true
        this.aiccgroup='cmi'
        if( name == 'CMI_Core_Entry' ) {
          this.name='cmi.core.entry'
          this.update()
        }
        else {
          this.name='cmi.core.exit'
          this.value=this.defVal
        }
      }
      else this.name = name
    }
  }
  else {
    this.name=name;
  }
  if( this.f == 4 ) this.uDT()
}

function VarUpdateValue() {
  if( this.cm ) {
    if( this.cm < 0 ) {
      this.defVal=readCookie(this.name,this.defVal)
      this.cm *= -1
    }
    var titleMgr = getTitleMgrHandle();
    if( titleMgr ) this.value=titleMgr.getVariable(this.name,this.defVal,this.exp);
    else this.value=this.defVal
  }
  else if( this.aiccframe ) {
    var titleMgr = getTitleMgrHandle();
    if( this.origAICC ) {
      if( this.aiccframe == 'scorm' ) {
        if( this.name=='cmi.core.course_id' ) this.value=this.defVal
        else if( this.name=='cmi.core.lesson_id' ) this.value=this.defVal
        else if( this.name!='cmi.core.exit' ) this.value=LMSGetValue( this.name )
        if( titleMgr ) titleMgr.setVariable(this.name,this.value,this.exp)
      }
      else if(this.name=='Core_Lesson') {
        this.value=getParam(this.aiccgroup)
      }
      else if(this.name=='Core_Vendor') {
        this.value=getParam(this.aiccgroup)
      }
      else if(this.name=='Course_ID') {
        this.value=getParam(this.name)
      }
      else {
        this.value=getParam(this.name)
      }
    }
    else {
      if( this.aiccframe == 'scorm' ) {
        this.value=this.defVal
        if( titleMgr && titleMgr.findVariable( this.name ) != -1 ){
            this.value=titleMgr.getVariable(this.name,this.defVal,this.exp)
        } else {
          var data=LMSGetValue( 'cmi.suspend_data' )
          if( data == '' ) {
            if( titleMgr ) titleMgr.setVariable(this.name,this.value,this.exp)
          }
          else {
            var ca = data.split(';')
            for(var i=0;i<ca.length;i++) {
              var c = ca[i];
              if( c.indexOf('=') >= 0 ) {
                ce = c.split('=')
                if( this.name == ce[0] ) this.value = ce[1]
                if( titleMgr ) titleMgr.setVariable(ce[0],ce[1],this.exp)
              }
            }
          }
        }
      }
      else {
        if( titleMgr ) this.value=titleMgr.getVariable(this.name,this.defVal,this.exp)
        else this.value = this.defVal
      }
    }
  }
  else if( this.f > 0 ) {
    this.uDT()
  }
  else {
    var val = readVariable(this.name,this.defVal,this.exp,this.title)
    var subval = val ? val.substr( 0, 7 ) : null
    if( subval == "~~f=1~~" ) {
      this.tV = parseInt( val.substr( 7, val.length-7 ))
      this.f = 1
      this.uDTV()
    }
    else if( subval == "~~f=2~~" ) {
      this.tV = parseInt( val.substr( 7, val.length-7 ))
      this.f = 2
      this.uDTV()
    }
    else if( subval == "~~f=4~~" ) {
      var now = new Date()
      this.tV = parseInt( val.substr( 7, val.length-7 ))
      this.eTS = now.getTime() - this.tV
      this.f = 4
      this.uDTV()
    }
    else this.value=val
  }
  if( this.value == null || this.value == '' ) this.value = "~~~null~~~"
}

function VarSave() {
  if(this.cm) {
    var titleMgr = getTitleMgrHandle();
    if( titleMgr ) titleMgr.setVariable(this.name,this.value,this.exp)
  }
  else if(this.aiccframe){
    var titleMgr = getTitleMgrHandle();
    if( this.aiccframe == 'scorm' ) {
      if( this.name == 'cmi.core.total_time' ) {
        LMSSetValue( 'cmi.core.session_time', this.value )
        if( titleMgr ) titleMgr.setVariable('cmi.core.session_time',this.value,this.exp)
      }
      else {
        if( titleMgr ) titleMgr.setVariable(this.name,this.value,this.exp)
        if( this.aiccgroup ) {
          LMSSetValue( this.name, this.value )
        }
        else {
          var nameEQ = this.name + "="
          var newData=''
          var data=LMSGetValue( 'cmi.suspend_data' )
          if( data.length ) {
            var ca = data.split(';')
            for(var i=0;i<ca.length;i++) {
              var c = ca[i];
              if (c.length > 0 && c.indexOf(nameEQ) != 0) {
                newData = newData + c + ';'
              }
            }
          }
          newData = newData + nameEQ + this.value + ';'
          LMSSetValue( 'cmi.suspend_data', newData )
        }
      }
    }
    else {
      if(this.aicccore) putParam(this.aiccgroup,this.name+'='+this.value,this.aiccframe)
      else if( this.aiccgroup ) putParam(this.aiccgroup,this.value,this.aiccframe)
      else {
        if( titleMgr ) titleMgr.setVariable(this.name,this.value,this.exp)
        saveVariable(this.name,this.value,this.exp,this.title)
      }
    }
  }
  else{
    if( this.f != 0 && this.tV >= 0 ) {
      if( this.f == 4 ) saveVariable( this.name, "~~f=4~~" + this.tV + '#' + this.value, this.exp, this.title )
      else if ( this.f == 2 ) saveVariable( this.name, "~~f=2~~" + this.tV + '#' + this.value, this.exp, this.title )
      else if ( this.f == 1 ) saveVariable( this.name, "~~f=1~~" + this.tV + '#' + this.value, this.exp, this.title )
    } 
    else if( this.value == null || this.value == "" ) saveVariable( this.name, "~~~null~~~", this.exp, this.title )
    else saveVariable(this.name,this.value,this.exp,this.title)
  }
}

function VarSet(setVal) {
  if( setVal == null || setVal == "" ) this.value = "~~~null~~~"
  else this.value=setVal 
  this.save() 
}

function VarSetVar(setVar) {
  if( setVar.f > 0 ) setVar.uDT()
  else setVar.update()
  this.value = setVar.value
  this.f = setVar.f
  this.eTS = setVar.eTS
  this.tV = setVar.tV
  this.save() 
}

function VarAdd(addVal) {
  this.update()
  if ( this.f > 0 && !isNaN( addVal )) {
    this.tV += CalcTD( this.f, addVal )
    this.uDTV()            
  }
  else if( this.value == "~~~null~~~" ) {
    this.f = 0
    if( addVal != null && addVal != "" ) this.value = addVal
  }
  else {
    this.f = 0
    if( addVal != null && addVal != "" ) {
      if(!isNaN(this.value)&&!isNaN(addVal)&&!isNaN( parseFloat(addVal))&&!isNaN( parseFloat(this.value)) ) {
        var val=parseFloat(this.value)+parseFloat(addVal)
        this.value=val.toString()
      }
      else this.value+=addVal;
    }
  }
  this.save()
}

function VarAddVar(addVar) {
  if( addVar.f > 0 ) {
    addVar.uDT()
    if( this.f > 0 ) {
      this.tV += addVar.tV
      if( addVar.f == 1 ) this.f = 1
        this.uDTV()
    }
    else this.add( addVar.value )
  }
  else {
    addVar.update()
    this.add( addVar.value )
  }
}

function VarSub(subVal) {
  this.update()
  if ( this.f > 0 && !isNaN( subVal )) {
    this.tV -= CalcTD( this.f, subVal )
    this.uDTV()            
  }
  else if( this.value == "~~~null~~~" ) {
    this.f = 0
    if( !isNaN(subVal)&&!isNaN(parseFloat(subVal) ) ) {
      var val=this.value=parseFloat("-"+subVal)
      this.value=val.toString()
    }
  }
  else {
    this.f = 0
    if( subVal != null && subVal != "" ) {
      if(!isNaN(this.value)&&!isNaN(subVal)&&!isNaN( parseFloat(subVal))&&!isNaN( parseFloat(this.value)) ) {
        var val=parseFloat(this.value)-parseFloat(subVal)
        this.value=val.toString()
      }    
      else if( this.value.length >= subVal.length && this.value.substr( this.value.length - subVal.length) == subVal ) {
        this.value=this.value.substr( 0, this.value.length - subVal.length )
      }
    }
  }
  this.save()
}

function VarSubVar(subVar) {
  if( subVar.f > 0 ) {
    subVar.uDT()
    if( this.f > 0 ) {
      this.tV -= subVar.tV
      if( subVar.f == 1 ) this.f = 1
      this.uDTV()
    }
    else this.sub( subVar.value )
  }
  else {
    subVar.update()
    this.sub( subVar.value )
  }
}

function VarMult(multVal) {
  this.update()
  if( this.value != "~~~null~~~" ) {
    if(!isNaN(this.value)&&!isNaN(multVal)&&!isNaN( parseFloat(multVal))&&!isNaN( parseFloat(this.value)) ) {
      var val=parseFloat(this.value)*parseFloat(multVal)
      this.value=val.toString()
    }
    this.save()
  }
}

function VarDiv(divVal) {
  this.update()
  if( this.value != "~~~null~~~" ) {
    if(!isNaN(this.value)&&!isNaN(divVal)&&!isNaN( parseFloat(divVal))&&!isNaN( parseFloat(this.value)) ) {
      if( parseFloat(divVal) != 0 ) {
        var val=parseFloat(this.value)/parseFloat(divVal)
        val = parseInt( val*100 )
        val = parseFloat( val/100 )
        this.value=val.toString()
      }
    }
    this.save()
  }
}

function VarCont(strCont) {
  this.update()
  if( this.value == "~~~null~~~" || this.value == "" ) return 0
  var src=this.value.toUpperCase()
  var test=strCont.toUpperCase().replace( '\'', '\\\''  )
  var result=src.indexOf( test )
  return (result >= 0)
}

function VarEQ(strEquals) {
  this.update()
  var src=this.value.toUpperCase()
  var test=strEquals.toUpperCase().replace( '\'', '\\\''  )
  return (src == test)
}

function VarLT(strTest) {
  this.update()
  if( this.value == "~~~null~~~" || this.value == "" ) {
    if( strTest == "~~~null~~~" || strTest == "" ) return 0
    else return 1
  }
  if(isNaN(this.value)||isNaN(strTest))return this.value<strTest
  else return parseFloat(this.value)<parseFloat(strTest)
}

function VarGT(strTest) {
  this.update()
  if( this.value == "~~~null~~~" || this.value == "" ) {
    if( strTest == "~~~null~~~" || strTest == "" ) return 1
    else return 0
  }
  if(isNaN(this.value)||isNaN(strTest))return this.value>strTest
  else return parseFloat(this.value)>parseFloat(strTest)
}

function VarUDT() {
  var now = new Date()
  if( this.f == 1 ) {
    this.tV = now.getTime()
    this.value = FormatDS( now )
  }
  else if( this.f == 2 ) {
    this.tV = now.getTime()
    this.value = FormatTS( now )
  }
  else if( this.of == 4 ) {
    // Only the original Elapsed Time variable gets updated
    var dT = 0
    if( this.eTS == null ) {
      var val = readVariable( this.name, "~~f=4~~0", this.exp, this.title ) 
      dT = val ? val.substr( 7, val.length - 7 ) : 0
      this.eTS = now.getTime() - parseInt( dT )
    }
    this.tV = now.getTime() - this.eTS
    this.value = FormatETS( this.tV )
  }
  this.save()
 }

function VarUDTV() {
  if( this.f == 1 ) this.value = FormatDS( new Date( this.tV ))
  else if( this.f == 2 ) this.value = FormatTS( new Date( this.tV ))
  else if( this.f == 4 ) this.value = FormatETS( this.tV )
  this.save()
}

function VarGetValue() {
  this.update()
  return this.value
}

function VarMail() {
  this.update()
  ObjLayerActionGoTo( 'mailto:' + this.value )
}

{ // Setup protpotypes
var p=Variable.prototype
p.save=VarSave
p.set=VarSet
p.add=VarAdd
p.sub=VarSub
p.mult=VarMult
p.div=VarDiv
p.setByVar=VarSetVar
p.addByVar=VarAddVar
p.subByVar=VarSubVar
p.contains=VarCont
p.equals=VarEQ
p.lessThan=VarLT
p.greaterThan=VarGT
p.uDT=VarUDT
p.uDTV=VarUDTV
p.update=VarUpdateValue
p.getValue=VarGetValue
p.mailTo=VarMail
}

function saveTestScore( varTestName, score, title ) 
{
  saveVariable( varTestName, score, null, title )
}


var titleMgrHandle = null

function getTitleMgrHandle()
{
   if( is.ieMac || (is.ns4 && is.nsMac))
       return titleMgrHandle
       
   if (titleMgrHandle == null)
   {
      titleMgrHandle = getTitleMgr( window, 0 );
   }

   return titleMgrHandle;
}

function getTitleMgr( testWnd, level )
{
   if( !testWnd )
     return null
     
   if( testWnd.document.TitleMgr )
     return testWnd.document.TitleMgr;
   else
   {
     var target = eval( "testWnd.parent.titlemgrframe" )
     if( target )
        return target.document.TitleMgr;
     else {
        if( testWnd.name.indexOf( 'Trivantis_' ) == 0 )
          return getTitleMgr( testWnd.opener, level+1 )
        else if( level < 2 )
          return getTitleMgr( testWnd.parent, level+1 )
     }
   }
       
   return null
}

function encodeChars( str ) {
  var value = str
  if( value && value.indexOf )
  {
    var crlf  = value.indexOf( '\r\n' )
  
    while( crlf >= 0 )
    {
      var start = value.substring( 0, crlf )
      var end   = value.substring( crlf + 2 )
      value = start + '%13%10' + end
      crlf = value.indexOf( '\r\n' )
    }

    var semi = value.indexOf( ';' )
  
    while( semi >= 0 )
    {
      var start = value.substring( 0, semi )
      var end   = value.substring( semi + 1 )
      value = start + '%59' + end
      semi = value.indexOf( ';' )
    }
  }
  return value
}

function decodeChars( str ) {
  var val  = str
  if( val && val.indexOf )
  {
    var crlf = val.indexOf( '%13%10' )

    while( crlf >= 0 )
    {
      var start = val.substring( 0, crlf )
      var end   = val.substring( crlf + 6 )
      val = start + '\r\n' + end
      crlf = val.indexOf( '%13%10' )
    }

    var semi = val.indexOf( '%59' )

    while( semi >= 0 )
    {
      var start = val.substring( 0, semi )
      var end   = val.substring( semi + 3 )
      val = start + ';' + end
      semi = val.indexOf( '%59' )
    }
  }
  return val
}

function readCookie(name,defval) {
  var nameEQ = name + "="
  var ca = document.cookie.split(';')
  for(var i=0;i<ca.length;i++) {
    var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1)
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length)
  }
  return defval
}

function afterProcessTest( score, name ) {
}
