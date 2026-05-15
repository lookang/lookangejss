(function(){var P$=Clazz.newPackage("sun.util.resources"),p$1={},I$=[[0,'sun.util.ResourceBundleEnumeration','java.util.HashMap']],$I$=function(i,n){return(i=(I$[i]||(I$[i]=Clazz.load(I$[0][i])))),!n&&i.$load$&&Clazz.load(i,2),i};
/*c*/var C$=Clazz.newClass(P$, "OpenListResourceBundle", null, 'java.util.ResourceBundle');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
this.lookup=null;
},1);

C$.$fields$=[['O',['lookup','java.util.Map']]]

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this);
}, 1);

Clazz.newMeth(C$, 'handleGetObject$S', function (key) {
if (key == null ) {
throw Clazz.new_(Clazz.load('NullPointerException'));
}this.loadLookupTablesIfNecessary$();
return this.lookup.get$O(key);
});

Clazz.newMeth(C$, 'getKeys$', function () {
var parent=this.parent;
return Clazz.new_($I$(1,1).c$$java_util_Set$java_util_Enumeration,[this.handleGetKeys$(), (parent != null ) ? parent.getKeys$() : null]);
});

Clazz.newMeth(C$, 'handleGetKeys$', function () {
this.loadLookupTablesIfNecessary$();
return this.lookup.keySet$();
});

Clazz.newMeth(C$, 'getParent$', function () {
return this.parent;
});

Clazz.newMeth(C$, 'loadLookupTablesIfNecessary$', function () {
if (this.lookup == null ) {
p$1.loadLookup.apply(this, []);
}});

Clazz.newMeth(C$, 'loadLookup', function () {
if (this.lookup != null ) return;
var contents=this.getContents$();
var temp=this.createMap$I(contents.length);
for (var i=0; i < contents.length; ++i) {
var key=contents[i][0];
var value=contents[i][1];
if (key == null  || value == null  ) {
throw Clazz.new_(Clazz.load('NullPointerException'));
}temp.put$O$O(key, value);
}
this.lookup=temp;
}, p$1);

Clazz.newMeth(C$, 'createMap$I', function (size) {
return Clazz.new_($I$(2,1).c$$I,[size]);
});
})();
;Clazz.setTVer('3.2.8-v1');//Created 2020-02-05 08:11:14 Java2ScriptVisitor version 3.2.8-v1 net.sf.j2s.core.jar version 3.2.8-v1
