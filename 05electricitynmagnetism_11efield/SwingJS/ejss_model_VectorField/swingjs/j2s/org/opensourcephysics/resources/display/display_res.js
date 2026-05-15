(function(){var P$=Clazz.newPackage("org.opensourcephysics.resources.display"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "display_res", null, 'java.util.PropertyResourceBundle');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[[]
,['S',['res']]]

Clazz.newMeth(C$, 'c$', function () {
C$.c$$java_io_InputStream.apply(this, [Clazz.getClass(C$).getResourceAsStream$S(C$.res)]);
}, 1);

Clazz.newMeth(C$, 'c$$java_io_InputStream', function (stream) {
;C$.superclazz.c$$java_io_InputStream.apply(this,[stream]);C$.$init$.apply(this);
}, 1);

C$.$static$=function(){C$.$static$=0;
C$.res="display_res.properties";
};
})();
;Clazz.setTVer('3.2.8-v1');//Created 2020-02-11 14:46:58 Java2ScriptVisitor version 3.2.8-v1 net.sf.j2s.core.jar version 3.2.8-v1
