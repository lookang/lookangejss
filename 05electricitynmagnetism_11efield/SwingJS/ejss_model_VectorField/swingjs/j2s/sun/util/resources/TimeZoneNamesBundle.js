(function(){var P$=Clazz.newPackage("sun.util.resources"),I$=[[0,'java.util.LinkedHashMap']],$I$=function(i,n){return(i=(I$[i]||(I$[i]=Clazz.load(I$[0][i])))),!n&&i.$load$&&Clazz.load(i,2),i};
/*c*/var C$=Clazz.newClass(P$, "TimeZoneNamesBundle", null, 'sun.util.resources.OpenListResourceBundle');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'handleGetObject$S', function (key) {
var contents=C$.superclazz.prototype.handleGetObject$S.apply(this, [key]);
if (contents == null ) {
return null;
}var clen=contents.length;
var tmpobj=Clazz.array(String, [clen + 1]);
tmpobj[0]=key;
for (var i=0; i < clen; i++) {
tmpobj[i + 1]=contents[i];
}
return tmpobj;
});

Clazz.newMeth(C$, 'createMap$I', function (size) {
return Clazz.new_($I$(1,1).c$$I,[size]);
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('3.2.8-v1');//Created 2020-02-05 08:11:14 Java2ScriptVisitor version 3.2.8-v1 net.sf.j2s.core.jar version 3.2.8-v1
