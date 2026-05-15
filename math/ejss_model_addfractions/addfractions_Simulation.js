function Matrix(){var e=Array.prototype.concat.apply([],arguments);e.length||(e=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.m=hasFloat32Array?new Float32Array(e):e}function Vector(e,t,r){"object"==typeof e?(this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0):(this.x=e||0,this.y=t||0,this.z=r||0)}function _smartDevice(e,t){return this.websocket=e,this.loadMetadata(t),this}function wrapper(e,t){e.hasOwnProperty("ip")?(wsUri="ws://"+e.ip+":"+e.port+"/",this.websocket=new WebSocket(wsUri)):this.websocket=e,this.smartdevice=new _smartDevice(this.websocket,t),this.smartdevice.loadApis(),this.smartdevice.loadModels(),this.smartdevice.generateMethodCall(),this.smartdevice.generateModelFilling()}var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.AnalyticCurve={},EJSS_DRAWING2D.analyticCurve=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Arrow={},EJSS_DRAWING2D.arrow=function(e){},EJSS_DRAWING2D.ArrowSet={},EJSS_DRAWING2D.arrowSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Axis={AXIS_VERTICAL:0,AXIS_HORIZONTAL:1,TICKS_UP:2,TICKS_DOWN:3,SCALE_NUM:0,SCALE_LOG:1,registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("Step",e.setStep,e.getStep),t.registerProperty("TickStep",e.setTickStep,e.getTickStep),t.registerProperty("Ticks",e.setTicks,e.getTicks),t.registerProperty("AutoTicks",e.setAutoTicks,e.getAutoTicks),t.registerProperty("FixedTick",e.setFixedTick,e.getFixedTick),t.registerProperty("Orient",e.setOrient,e.getOrient),t.registerProperty("Scale",e.setScale,e.getScale),t.registerProperty("TicksMode",e.setTicksMode,e.getTicksMode),t.registerProperty("TicksSize",e.setTicksSize,e.getTicksSize),t.registerProperty("AutoStepMin",e.setAutoStepMin,e.getAutoStepMin),t.registerProperty("AutoTicksRange",e.setAutoTicksRange,e.getAutoTicksRange),t.registerProperty("TextPosition",e.setTextPosition,e.getTextPosition),t.registerProperty("ScalePrecision",e.setScalePrecision,e.getScalePrecision),t.registerProperty("Font",e.getFont().setFont),t.registerProperty("FontFamily",e.getFont().setFontFamily),t.registerProperty("FontSize",e.getFont().setFontSize),t.registerProperty("LetterSpacing",e.getFont().setLetterSpacing),t.registerProperty("FontOutlineColor",e.getFont().setOutlineColor),t.registerProperty("FontWeight",e.getFont().setFontWeight),t.registerProperty("FontFillColor",e.getFont().setFillColor),t.registerProperty("Show",e.setShow,e.getShow)}},EJSS_DRAWING2D.axis=function(e){var t=EJSS_DRAWING2D.segment(e),r=!0,n=0,i=20,o=0,a=Number.NaN,s=EJSS_DRAWING2D.Axis.AXIS_VERTICAL,l=[-1,1],u=!1,g=EJSS_DRAWING2D.Axis.SCALE_NUM,c=EJSS_DRAWING2D.Axis.TICKS_UP,S=10,d=1,E=EJSS_DRAWING2D.font(e),f=40,p=[5,10,20],h=!0;return t._23=function(){return"ElementAxis"},t.setShow=function(e){h!=e&&(h=e,t.setChanged(!0))},t.getShow=function(){return h},t.getFont=function(){return E},t.setAutoTicksRange=function(e){p!=e&&(p=e,t.setChanged(!0))},t.getAutoTicksRange=function(){return p},t.setAutoStepMin=function(e){f!=e&&(f=e,t.setChanged(!0))},t.getAutoStepMin=function(){return f},t.setFixedTick=function(e){a!=e&&(a=e,t.setChanged(!0))},t.getFixedTick=function(){return a},t.setAutoTicks=function(e){r!=e&&(r=e,t.setChanged(!0))},t.getAutoTicks=function(){return r},t.setStep=function(e){i!=e&&(i=e,t.setChanged(!0))},t.getStep=function(){return i},t.setTickStep=function(e){o!=e&&(o=e,t.setChanged(!0))},t.getTickStep=function(){return o},t.setTicks=function(e){n!=e&&(n=e,t.setChanged(!0))},t.getTicks=function(){return n},t.setTicksMode=function(e){"string"==typeof e&&(e=EJSS_DRAWING2D.Grid[e.toUpperCase()]),g!=e&&(g=e,t.setChanged(!0))},t.getTicksMode=function(){return g},t.setTextPosition=function(e){"string"==typeof e&&(e=EJSS_DRAWING2D.Axis[e.toUpperCase()]),c!=e&&(c=e,t.setChanged(!0))},t.getTextPosition=function(){return c},t.setOrient=function(e){"string"==typeof e&&(e=EJSS_DRAWING2D.Axis[e.toUpperCase()]),s!=e&&(s=e,t.setChanged(!0))},t.getOrient=function(){return s},t.setScale=function(e){l!=e&&(l=e,t.setChanged(!0))},t.getScale=function(){return l},t.setScalePrecision=function(e){d!=e&&(d=e,t.setChanged(!0))},t.getScalePrecision=function(){return d},t.setTicksSize=function(e){S!=e&&(S=e,t.setChanged(!0))},t.getTicksSize=function(){return S},t.setInvertedScaleY=function(e){u!=e&&(u=e,t.setChanged(!0))},t.getInvertedScaleY=function(){return u},t.registerProperties=function(e){EJSS_DRAWING2D.Axis.registerProperties(t,e)},E.setChangeListener(function(e){t.setChanged(!0)}),t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.ByteRaster={},EJSS_DRAWING2D.byteRaster=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Canvas={copyTo:function(e,t){EJSS_DRAWING2D.Element.copyTo(e,t),t.setDimensions(e.getDimensions())},registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("Dimensions",e.setDimensions,e.getDimensions)}},EJSS_DRAWING2D.canvas=function(e){var t=EJSS_DRAWING2D.element(e),r=[];return t._23=function(){return"ElementCanvas"},t.setDimensions=function(e){xMin=e[0],xMax=e[1],yMin=e[2],yMax=e[3],t.setChanged(!0)},t.getDimensions=function(){return[xMin,xMax,yMin,yMax]},t.addDrawable=function(e){r.push(e),t.setChanged(!0)},t.addImageField=function(e,r,n,i,o,a,s,l,u,g){var c=function(){function c(e,t,r){for(var n=[],i=(t-e)/(r-1),o=e,a=0;a<r;a++)n.push(o),o+=i;return n}var S={};return S.imageField=!0,S.data=e||void 0,S.xMin=void 0===r?-5:r,S.xMax=void 0===n?5:n,S.nx=i||128,S.yMin=void 0===o?-5:o,S.yMax=void 0===a?5:a,S.ny=s||128,S.autoscale=l||!0,S.lower=void 0===u?-1:u,S.upper=void 0===g?1:g,S.center=(S.lower+S.upper)/2,S.maskRadius=0,S.xPos=c(S.xMin,S.xMax,S.nx),S.yPos=c(S.yMin,S.yMax,S.ny),S.updateData=function(e){S.data=e||S.data,S.xPos=c(S.xMin,S.xMax,S.nx),S.yPos=c(S.yMin,S.yMax,S.ny),t.setChanged(!0)},S.setThreshold=function(e,r){S.lower=void 0===e?S.lower:e,S.upper=void 0===r?S.upper:r,t.setChanged(!0)},S.setCircularMask=function(e){S.maskRadius=e,t.setChanged(!0)},S}();return t.addDrawable(c),c},t.getDrawables=function(){return r},this.clearObjects=function(){r=[],t.setChanged(!0)},t.registerProperties=function(e){EJSS_DRAWING2D.Canvas.registerProperties(t,e)},t.copyTo=function(e){EJSS_DRAWING2D.Canvas.copyTo(t,e)},t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.CellLattice={},EJSS_DRAWING2D.cellLattice=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Cursor={},EJSS_DRAWING2D.cursor=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Custom={},EJSS_DRAWING2D.custom=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.DrawingPanel={MOUSE_ENTERED:0,MOUSE_EXITED:1,MOUSE_PRESSED:2,MOUSE_DRAGGED:3,MOUSE_RELEASED:4,GRAPHICS2D_SVG:0,GRAPHICS2D_CANVAS:1,SCALE_NUM:0,SCALE_LOG:1,ENABLED_NONE:0,ENABLED_ANY:1,ENABLED_X:2,ENABLED_Y:3,ENABLED_NO_MOVE:4,registerProperties:function(e,t){e.setController(t),t.registerProperty("AutoScale",e.setAutoScale,e.getAutoScale),t.registerProperty("AutoScaleX",e.setAutoScaleX,e.getAutoScaleX),t.registerProperty("AutoScaleY",e.setAutoScaleY,e.getAutoScaleY),t.registerProperty("InvertedScaleY",e.setInvertedScaleY,e.getInvertedScaleY),t.registerProperty("MinimumX",e.setWorldXMin,e.getWorldXMin),t.registerProperty("MaximumX",e.setWorldXMax,e.getWorldXMax),t.registerProperty("MinimumY",e.setWorldYMin,e.getWorldYMin),t.registerProperty("MaximumY",e.setWorldYMax,e.getWorldYMax),t.registerProperty("Bounds",e.setWorldCoordinates,e.getWorldCoordinates),t.registerProperty("ScaleXType",function(t){e.setTypeScaleX(t),e.scale()},e.getTypeScaleX),t.registerProperty("ScaleYType",function(t){e.setTypeScaleY(t),e.scale()},e.getTypeScaleY),t.registerProperty("MarginX",e.setMarginX,e.getMarginX),t.registerProperty("MarginY",e.setMarginY,e.getMarginY),t.registerProperty("Parent",e.getGraphics().setParent,e.getGraphics().getParent),t.registerProperty("ClassName",e.getGraphics().setClassName),t.registerProperty("Width",function(t){e.getGraphics().setWidth(t)&&e.scale()},e.getGraphics().getBox().width),t.registerProperty("Height",function(t){e.getGraphics().setHeight(t)&&e.scale()},e.getGraphics().getBox().height),t.registerProperty("SquareAspect",e.setSquareAspect),t.registerProperty("GraphicsMode",e.setGraphicsMode),t.registerProperty("Enabled",e.getPanelInteraction().setEnabled),t.registerProperty("StopMoveEvents",e.getPanelInteraction().setStopMoveEvents),t.registerProperty("StopGestures",e.getPanelInteraction().setStopGestures),t.registerProperty("Gutters",e._25),t.registerProperty("GuttersLineColor",e.getGuttersStyle().setLineColor),t.registerProperty("GuttersLineWidth",e.getGuttersStyle().setLineWidth),t.registerProperty("GuttersDrawLines",e.getGuttersStyle().setDrawLines),t.registerProperty("GuttersColor",e.getGuttersStyle().setFillColor),t.registerProperty("GuttersFill",e.getGuttersStyle().setDrawFill),t.registerProperty("GuttersRendering",e.getStyle().setShapeRendering),t.registerProperty("Background",e.getStyle().setFillColor),t.registerProperty("Foreground",e.getStyle().setLineColor),t.registerProperty("LineColor",e.getStyle().setLineColor),t.registerProperty("LineWidth",e.getStyle().setLineWidth),t.registerProperty("DrawLines",e.getStyle().setDrawLines),t.registerProperty("FillColor",e.getStyle().setFillColor),t.registerProperty("DrawFill",e.getStyle().setDrawFill),t.registerProperty("ShapeRendering",e.getStyle().setShapeRendering),t.registerProperty("Visibility",e.getGraphics().getStyle().setVisibility),t.registerProperty("Display",e.getGraphics().getStyle().setDisplay),t.registerProperty("CSS",e.getGraphics().getStyle().setCSS),t.registerProperty("TRMessage",e.getMessageDecoration("TR").setText),t.registerProperty("TLMessage",e.getMessageDecoration("TL").setText),t.registerProperty("BRMessage",e.getMessageDecoration("BR").setText),t.registerProperty("BLMessage",e.getMessageDecoration("BL").setText),t.registerProperty("CoordinatesFormat",e.getCoordinates().setFormat),t.registerProperty("ShowCoordinates",e.setShowCoordinates),t.registerProperty("ShowAreaRectangle",e.setShowAreaRectangle),t.registerProperty("EnabledZooming",e.setEnabledZooming),t.registerProperty("EnabledDragging",e.setEnabledDragging),t.registerProperty("CursorTypeForMove",e.getInteraction().setCursorTypeForMove),t.registerAction("OnDoubleClick",e.getInteraction().getInteractionPoint),t.registerAction("OnMove",e.getInteraction().getInteractionPoint,e.getOnMoveHandler),t.registerAction("OnPress",e.getInteraction().getInteractionPoint,e.getOnPressHandler),t.registerAction("OnDrag",e.getInteraction().getInteractionPoint,e.getOnDragHandler),t.registerAction("OnRelease",e.getInteraction().getInteractionBounds,e.getOnReleaseHandler),t.registerAction("OnResize",e.getInteraction().getInteractionBounds,e.scale),t.registerAction("OnOrientationChange",e.getInteraction().getOrientation,e.scale),t.registerAction("OnZoom",e.getInteraction().getPinchDistance,e.getOnZoomHandler)}},EJSS_DRAWING2D.drawingPanel=function(e,t){var r,n={},i=EJSS_DRAWING2D.style(e),o=[],a=[],s=!1,l=!1,u=!1,g=!1,c=0,S=0,d=[],E=!0,f=!0,p=!1,h=!1,m=1.1,A=[.1,1e3],_=[],I=-1,D=1,P=-1,T=1,C={xminPreferred:NaN,xmaxPreferred:NaN,yminPreferred:NaN,ymaxPreferred:NaN,xminMeasured:NaN,xmaxMeasured:NaN,yminMeasured:NaN,ymaxMeasured:NaN,xmargin:0,ymargin:0,xmin:-1,xmax:1,ymin:-1,ymax:1,squareAspect:!1,xorigin:0,yorigin:0,xscale:1,yscale:1},N={left:0,right:0,top:0,bottom:0,visible:!1},y=EJSS_DRAWING2D.style(e+" gutters"),v=!0,R=!0,O=!0,M={propertiesChanged:function(){},invokeAction:function(){}};n.getName=function(){return e},n.getGraphics=function(){return r},n.importGraphics=function(e){return r.importSVG?r.importSVG(e):null},n.getStyle=function(){return i},n.getGraphicsMode=function(){return t},n.getGraphicsModeName=function(){switch(t){case EJSS_DRAWING2D.DrawingPanel.GRAPHICS2D_CANVAS:return"CANVAS";default:case EJSS_DRAWING2D.DrawingPanel.GRAPHICS2D_SVG:return"SVG"}},n.setGraphicsMode=function(n){if("string"==typeof n?(0!=n.indexOf("GRAPHICS2D_")&&(n="GRAPHICS2D_"+n),n=EJSS_DRAWING2D.DrawingPanel[n.toUpperCase()]|EJSS_DRAWING2D.DrawingPanel.GRAPHICS2D_SVG):void 0===n&&(n=EJSS_DRAWING2D.DrawingPanel.GRAPHICS2D_SVG),n!=t){t=n;var i=void 0!==r;if(i){var o=r.getParent(),a=r.getWidth(),l=r.getHeight(),u=r.getEventContext().getAttribute("style"),g=document.getElementById(e);g.parentNode.removeChild(g)}n==EJSS_DRAWING2D.DrawingPanel.GRAPHICS2D_SVG?r=EJSS_GRAPHICS.svgGraphics(e):n==EJSS_DRAWING2D.DrawingPanel.GRAPHICS2D_CANVAS?r=EJSS_GRAPHICS.canvasGraphics(e):console.log("WARNING: setGraphics() - Graphics not supported"),i&&(r.setParent(o),r.setWidth(a),r.setHeight(l),r.getEventContext().setAttribute("style",u),s=!0,k.reload())}},n.getAutoScale=function(){return l||u},n.setAutoScale=function(e){n.setAutoScaleX(e),n.setAutoScaleY(e)},n.setAutoScaleX=function(e){l=e},n.getAutoScaleX=function(){return l},n.setAutoScaleY=function(e){u=e},n.getAutoScaleY=function(){return u},n.setInvertedScaleY=function(e){if(g!=e){g=e,g&&(S=EJSS_DRAWING2D.DrawingPanel.SCALE_NUM);n.reportDecorations("bounds")&&(v=!0)}},n.getInvertedScaleY=function(){return g},n.setTypeScaleX=function(e){"string"==typeof e&&(e=EJSS_DRAWING2D.DrawingPanel[e.toUpperCase()]),c=e},n.getTypeScaleX=function(){return c},n.setTypeScaleY=function(e){"string"==typeof e&&(e=EJSS_DRAWING2D.DrawingPanel[e.toUpperCase()]),(S=e)==EJSS_DRAWING2D.DrawingPanel.SCALE_LOG&&(g=!1)},n.getTypeScaleY=function(){return S},n.setWorldXMin=function(e){e!==C.xminPreferred&&(C.xminPreferred=e)},n.getWorldXMin=function(){return C.xminPreferred},n.setWorldXMax=function(e){e!==C.xmaxPreferred&&(C.xmaxPreferred=e)},n.getWorldXMax=function(){return C.xmaxPreferred},n.setWorldYMin=function(e){e!==C.yminPreferred&&(C.yminPreferred=e)},n.getWorldYMin=function(){return C.yminPreferred},n.setWorldYMax=function(e){e!==C.ymaxPreferred&&(C.ymaxPreferred=e)},n.getWorldYMax=function(){return C.ymaxPreferred},n.setWorldCoordinates=function(e){n.setWorldXMin(e[0]),n.setWorldXMax(e[1]),n.setWorldYMin(e[2]),n.setWorldYMax(e[3])},n.getWorldCoordinates=function(){return[n.getWorldXMin(),n.getWorldXMax(),n.getWorldYMin(),n.getWorldYMax()]},n.getMeasuredCoordinates=function(){return[C.xminMeasured,C.xmaxMeasured,C.yminMeasured,C.ymaxMeasured]},n.getRealWorldCoordinates=function(){return[C.xmin,C.xmax,C.ymin,C.ymax]},n.getRealWorldXMin=function(){return C.xmin},n.getRealWorldXMax=function(){return C.xmax},n.getRealWorldYMin=function(){return C.ymin},n.getRealWorldYMax=function(){return C.ymax},n.setSquareAspect=function(e){e!==C.squareAspect&&(C.squareAspect=e,R=!0)},n.setMarginX=function(e){C.xmargin!=e&&(C.xmargin=e,R=!0)},n.getMarginX=function(){return C.xmargin},n.setMarginY=function(e){C.ymargin!=e&&(C.ymargin=e,R=!0)},n.getMarginY=function(){return C.ymargin},n.setEnabledDragging=function(e){"string"==typeof e?(value=EJSS_DRAWING2D.DrawingPanel[e.toUpperCase()],p="undefined"==typeof value?EJSS_DRAWING2D.DrawingPanel.ENABLED_NONE:value):p=e},n.getEnabledDragging=function(){return p},n.setEnabledZooming=function(e){h=e},n.getEnabledZooming=function(){return h},n.setZoomRate=function(e){m=e},n.getZoomRate=function(){return m},n.setZoomLimits=function(e){A=e},n.getZoomLimits=function(){return A},n.setShowCoordinates=function(e){E=e},n.getShowCoordinates=function(){return E},n.setShowAreaRectangle=function(e){f=e},n.getShowAreaRectangle=function(){return f},n.addDecoration=function(e,t,r){return r?EJSS_TOOLS.addToArray(d,e,t):EJSS_TOOLS.addToArray(o,e,t),e.setPanel&&e.setPanel(n),n},n.removeDecoration=function(e){return EJSS_TOOLS.removeFromArray(o,e),EJSS_TOOLS.removeFromArray(d,e),e.setPanel&&e.setPanel(null),n},n.addElement=function(e,t){if(void 0===t)EJSS_TOOLS.addToArray(a,e);else if("object"==typeof t){var r=EJSS_TOOLS.arrayObjectIndexOf(a,t);EJSS_TOOLS.addToArray(a,e,r)
}else EJSS_TOOLS.addToArray(a,e,t);e.setPanel(n),e.dataCollected&&_.push(e),s=!0},n.removeElement=function(e){EJSS_TOOLS.removeFromArray(a,e),k.clearInteractionElement(e),e.setPanel(null),e.dataCollected&&EJSS_TOOLS.removeFromArray(_,e),s=!0},n.getElements=function(){return a},n.indexOfElement=function(e){return a.indexOf(e)},n._25=function(e){var t=e[0],r=e[1],n=e[2],i=e[3],o=!1;t!==N.left&&(N.left=t,o=!0),r!==N.top&&(N.top=r,o=!0),n!==N.right&&(N.right=n,o=!0),i!==N.bottom&&(N.bottom=i,o=!0),o&&(N.visible=N.left>0||N.top>0||N.right>0||N.bottom>0,v=!0,R=!0)},n.getGutters=function(){return N},n.getGuttersStyle=function(){return y},n.toPixelAxisY=function(e){return C.yorigin-e-C.yscale*C.ymin},n.toPixelAxisX=function(e){return C.xorigin+e-C.xscale*C.xmin},n._26=function(e,t){var r=void 0!==t?t:c,i=void 0!==t?t:S,o=[];return r==EJSS_DRAWING2D.DrawingPanel.SCALE_LOG?o[0]=n.toPixelLogScale(e[0],C.xorigin,C.xmin,C.xmax,C.xscale):o[0]=C.xorigin+C.xscale*(e[0]-C.xmin),i==EJSS_DRAWING2D.DrawingPanel.SCALE_LOG?o[1]=n.toPixelLogScale(e[1],C.yorigin,C.ymin,C.ymax,C.yscale):o[1]=g?N.top+C.yscale*(C.ymin-e[1]):C.yorigin+C.yscale*(e[1]-C.ymin),o},n.toPixelMod=function(e){var t=[];return t[0]=e[0]*C.xscale,t[1]=e[1]*C.yscale,t},n.toPanelPosition=function(e,t){var r=void 0!==t?t:c,i=void 0!==t?t:S,o=[];return r==EJSS_DRAWING2D.DrawingPanel.SCALE_LOG?o[0]=n.toPanelLogScale(e[0],C.xorigin,C.xmin,C.xmax,C.xscale):o[0]=C.xmin+(e[0]-C.xorigin)/C.xscale,i==EJSS_DRAWING2D.DrawingPanel.SCALE_LOG?o[1]=n.toPanelLogScale(e[1],C.yorigin,C.ymin,C.ymax,C.yscale):o[1]=g?C.ymin-(e[1]-N.top)/C.yscale:C.ymin+(e[1]-C.yorigin)/C.yscale,o},n.toPanelMod=function(e){var t=[];return t[0]=0==C.xscale?0:e[0]/C.xscale,t[1]=0==C.yscale?0:e[1]/C.yscale,t},n.toPixelLogScale=function(e,t,r,n,i){var o=r<=0?1:Math.log(r)/Math.log(10);return t+(n-r)*i/((n<=0?1:Math.log(n)/Math.log(10))-o)*((e<=0?0:Math.log(e)/Math.log(10))-o)},n.toPanelLogScale=function(e,t,r,n,i){var o=r<0?0:Math.log(r)/Math.log(10),a=n<0?0:Math.log(n)/Math.log(10),s=(n-r)*i,l=a-o,u=s/l;return Math.pow(10,o+(e-t)/u)},n.getPixelPositionWorldOrigin=function(){return[C.xorigin,C.yorigin]},n.getInnerRect=function(){var e=n.getRealWorldCoordinates();if(n.getInvertedScaleY())var t=n._26([e[0],e[2]]);else var t=n._26([e[0],e[3]]);var r=n.toPixelMod([e[1]-e[0],e[3]-e[2]]);return{x:t[0],width:Math.abs(r[0]),y:t[1],height:Math.abs(r[1])}},n.scale=function(){R=!0,s=!0},n.touch=function(){R=!0,s=!0;for(var e=0,t=a.length;e<t;e++)a[e].setChanged(!0)},n._27=function(){var e,t,i=!1,o=(C.xmaxMeasured-C.xminMeasured)/2,s=(C.ymaxMeasured-C.yminMeasured)/2,l=C.xminMeasured-Math.abs(o*C.xmargin/100),u=C.xmaxMeasured+Math.abs(o*C.xmargin/100),g=C.yminMeasured-Math.abs(s*C.ymargin/100),c=C.ymaxMeasured+Math.abs(s*C.ymargin/100),S=r.getBox(),d=S.width-(N.left+N.right),E=S.height-(N.bottom+N.top),f=d/(u-l),p=E/(c-g);if(C.squareAspect&&(e=Math.abs(f/p),e>=1?(e=Math.min(e,d),t=(u-l)*(e-1)/2,l-=t,u+=t,f=d/(u-l)):(e=Math.max(e,1/E),t=(c-g)*(1/e-1)/2,g-=t,c+=t,p=E/(c-g))),i=C.xscale!=f||C.yscale!=-p,C.xscale=f,C.yscale=-p,C.xorigin=N.left+.5,C.yorigin=E+N.top+.5,R=!1,C.xmin!==l||C.xmax!==u||C.ymin!==g||C.ymax!==c){C.xmin=l,C.xmax=u,C.ymin=g,C.ymax=c;n.reportDecorations("bounds")&&(v=!0),i=!0}if(i)for(var h=0,m=a.length;h<m;h++)a[h].setMustProject(!0)},n.reportDecorations=function(e){var t,r,n=!1;for(t=0,r=o.length;t<r;t++)n|=o[t].panelChangeListener&&o[t].panelChangeListener("bounds");for(t=0,r=d.length;t<r;t++)d[t].panelChangeListener&&d[t].panelChangeListener("bounds");return n},n._28=function(){var e=Number.MAX_VALUE,t=-Number.MAX_VALUE,r=Number.MAX_VALUE,i=-Number.MAX_VALUE;if(n.getAutoScaleY()||n.getAutoScaleX())for(var o=0,s=a.length;o<s;o++)if(a[o].isMeasured()&&!a[o].isGroup()&&(null==a[o].getGroup()||a[o].getGroup().isMeasured()))if(a[o].isPixelSize()){var l=a[o].getPosition();e=Math.min(e,l[0]),t=Math.max(t,l[0]),r=Math.min(r,l[1]),i=Math.max(i,l[1])}else{var u=a[o].getAbsoluteBounds();e=Math.min(e,u.left),t=Math.max(t,u.right),r=Math.min(r,u.bottom),i=Math.max(i,u.top)}var g=!1;n.getAutoScaleX()?(isNaN(C.xminPreferred)||(e=Math.min(e,C.xminPreferred)),isNaN(C.xmaxPreferred)||(t=Math.max(t,C.xmaxPreferred)),t<=e?(g=C.xminMeasured!=I||C.xmaxMeasured!=D,C.xminMeasured=I,C.xmaxMeasured=D):(g=C.xminMeasured!=e||C.xmaxMeasured!=t,C.xminMeasured=e,C.xmaxMeasured=t)):isNaN(C.xminPreferred)||isNaN(C.xmaxPreferred)?(g=C.xminMeasured!=I||C.xmaxMeasured!=D,C.xminMeasured=I,C.xmaxMeasured=D):(g=C.xminMeasured!=C.xminPreferred||C.xmaxMeasured!=C.xmaxPreferred,C.xminMeasured=C.xminPreferred,C.xmaxMeasured=C.xmaxPreferred);var c=!1;return n.getAutoScaleY()?(isNaN(C.yminPreferred)||(r=Math.min(r,C.yminPreferred)),isNaN(C.ymaxPreferred)||(i=Math.max(i,C.ymaxPreferred)),i<=r?(c=C.yminMeasured!=P||C.ymaxMeasured!=T,C.yminMeasured=P,C.ymaxMeasured=T):(c=C.yminMeasured!=r||C.ymaxMeasured!=i,C.yminMeasured=r,C.ymaxMeasured=i)):isNaN(C.yminPreferred)||isNaN(C.ymaxPreferred)?(c=C.yminMeasured!=P||C.ymaxMeasured!=T,C.yminMeasured=P,C.ymaxMeasured=T):(c=C.yminMeasured!=C.yminPreferred||C.ymaxMeasured!=C.ymaxPreferred,C.yminMeasured=C.yminPreferred,C.ymaxMeasured=C.ymaxPreferred),g||c},n.reset=function(){r.reset()},n.disable=function(){O=!1},n.enable=function(){O=!0},n.render=function(){if(O){var e=!1;(r.setImageData||s)&&(r.reset(),e=!0,s=!1);for(var t=0,i=_.length;t<i;t++)_[t].dataCollected();var l=n._28();(R||l)&&n._27(),(v||e)&&r.drawPanel(n),r.draw(o),r.draw(a,e),(v||e)&&r._24(n),r.draw(d),v=!1;for(var t=0,i=a.length;t<i;t++)a[t].setChanged(!1)}},n.getPanelInteraction=function(){return k},n.getController=function(){return M},n.setController=function(e){M=e},n.getOnMoveHandler=null,n.getOnZoomHandler=function(){if(h){var e=k.getInteractionZoomDelta(),t=n.getWorldCoordinates();(isNaN(t[0])||isNaN(t[1])||isNaN(t[2])||isNaN(t[3]))&&(t=n.getMeasuredCoordinates());var r=+(1-m)*(t[1]-t[0])*e/2,i=+(1-m)*(t[3]-t[2])*e/2,o=Math.abs(t[0]-t[1])-2*r;o>A[0]&&o<A[1]&&n.setWorldCoordinates([t[0]+r,t[1]-r,t[2]+i,t[3]-i])}},n.getOnPressHandler=function(){if(E){var e=k.getInteractionPoint(),t=n.getRealWorldCoordinates();t[0]<e[0]&&t[1]>e[0]&&t[3]>e[1]&&t[2]<e[1]&&(w.setText(e),w.setVisible(!0),w.getController().propertiesChanged("Visible","Text"))}},n.getOnDragHandler=function(){if(E){var e=k.getInteractionPoint(),t=n.getRealWorldCoordinates();t[0]<e[0]&&t[1]>e[0]&&t[3]>e[1]&&t[2]<e[1]&&(w.setText(e),w.setVisible(!0),w.getController().propertiesChanged("Visible","Text"))}if(f){var r=k.getInteractionBounds();r.length>0&&c==EJSS_DRAWING2D.DrawingPanel.SCALE_NUM&&S==EJSS_DRAWING2D.DrawingPanel.SCALE_NUM?(b.setBounds(r),b.setVisible(!0),b.getController().propertiesChanged("Position","X","Y","Size","SizeX","SizeY","Visible")):(b.setVisible(!1),b.getController().propertiesChanged("Visible"))}if(0!=p&&4!=p){var i=k.getInteractionDistance();if(i.length>0&&c==EJSS_DRAWING2D.DrawingPanel.SCALE_NUM&&S==EJSS_DRAWING2D.DrawingPanel.SCALE_NUM){var t=n.getWorldCoordinates();(isNaN(t[0])||isNaN(t[1])||isNaN(t[2])||isNaN(t[3]))&&(t=n.getMeasuredCoordinates()),1==p?n.setWorldCoordinates([t[0]+i[0],t[1]+i[0],t[2]+i[1],t[3]+i[1]]):2==p?n.setWorldCoordinates([t[0]+i[0],t[1]+i[0],t[2],t[3]]):n.setWorldCoordinates([t[0],t[1],t[2]+i[1],t[3]+i[1]])}}},n.getOnReleaseHandler=function(){E&&(w.setVisible(!1),w.getController().propertiesChanged("Visible")),f&&(b.setVisible(!1),b.getController().propertiesChanged("Visible"))},n.getMessageDecoration=function(e){switch(e){case"TL":return G;case"BR":return x;case"BL":return L}return J},n.getCoordinates=function(){return w},n.getInteraction=function(){return k},n.registerProperties=function(e){EJSS_DRAWING2D.DrawingPanel.registerProperties(n,e)},n.serialize=function(){return{mStyle:i.serialize(),mTopDecorations:d,mBottomDecorations:o,mElements:a,mCollectersList:_,mAutoScaleX:l,mAutoScaleY:u,mInvertedScaleY:g,mTypeScaleX:c,mTypeScaleY:S,mShowCoordinates:E,xmindef:I,xmaxdef:D,ymindef:P,ymaxdef:T,mWorld:C,mGutters:N,mGuttersStyle:y.serialize()}},n.unserialize=function(e){i.unserialize(e.mStyle),l=e.mAutoScaleX,u=e.mAutoScaleY,g=e.mInvertedScaleY,c=e.mTypeScaleX,S=e.mTypeScaleY,E=e.mShowCoordinates,I=e.xmindef,D=e.xmaxdef,P=e.ymindef,T=e.ymaxdef,C=e.mWorld,N=e.mGutters,y.unserialize(e.mGuttersStyle),v=!0},n.setGraphicsMode(t),i.setLineColor("black"),i.setFillColor("rgb(239,239,255)"),i.setChangeListener(function(e){v=!0}),y.setChangeListener(function(e){v=!0});var b=EJSS_DRAWING2D.shape(e+"__cursorBox__");b.setShapeType(EJSS_DRAWING2D.Shape.RECTANGLE),b.getStyle().setDrawFill(!1),b.getStyle().setLineColor("black"),b.setRelativePosition("CENTER"),b.setVisible(!1),n.addDecoration(b,0,!0);var G=EJSS_DRAWING2D.text(e+"__tlmessage__");G.setRelativePosition("NORTH_WEST"),G.getStyle().setDrawLines(!0),G.getStyle().setDrawFill(!0),G.getStyle().setFillColor("yellow"),G.getStyle().setLineColor("black"),G.getFont().setFontSize(12),G.setPosition([C.xmin,C.ymax]),G.setFramed(!0),G.panelChangeListener=function(e){"bounds"==e&&(n.getInvertedScaleY()?G.setPosition([C.xmin,C.ymin]):G.setPosition([C.xmin,C.ymax]))},n.addDecoration(G,0,!0);var L=EJSS_DRAWING2D.text(e+"__blmessage__");L.setRelativePosition("SOUTH_WEST"),L.getStyle().setDrawLines(!0),L.getStyle().setDrawFill(!0),L.getStyle().setFillColor("yellow"),L.getStyle().setLineColor("black"),L.getFont().setFontSize(12),L.setPosition([C.xmin,C.ymin]),L.setFramed(!0),L.panelChangeListener=function(e){"bounds"==e&&(n.getInvertedScaleY()?L.setPosition([C.xmin,C.ymax]):L.setPosition([C.xmin,C.ymin]))},n.addDecoration(L,0,!0);var x=EJSS_DRAWING2D.text(e+"__brmessage__");x.setRelativePosition("SOUTH_EAST"),x.getStyle().setDrawLines(!0),x.getStyle().setDrawFill(!0),x.getStyle().setFillColor("yellow"),x.getStyle().setLineColor("black"),x.getFont().setFontSize(12),x.setPosition([C.xmax,C.ymin]),x.setFramed(!0),x.panelChangeListener=function(e){"bounds"==e&&(n.getInvertedScaleY()?x.setPosition([C.xmax,C.ymax]):x.setPosition([C.xmax,C.ymin]))},n.addDecoration(x,0,!0);var J=EJSS_DRAWING2D.text(e+"__trmessage__");J.setRelativePosition("NORTH_EAST"),J.getStyle().setDrawLines(!0),J.getStyle().setDrawFill(!0),J.getStyle().setFillColor("yellow"),J.getStyle().setLineColor("black"),J.getFont().setFontSize(12),J.setPosition([C.xmax,C.ymax]),J.setFramed(!0),J.panelChangeListener=function(e){"bounds"==e&&(n.getInvertedScaleY()?J.setPosition([C.xmax,C.ymin]):J.setPosition([C.xmax,C.ymax]))},n.addDecoration(J,0,!0);var w=EJSS_DRAWING2D.infoText(e+"__coor__");w.setRelativePosition("SOUTH_WEST"),w.getFont().setFontSize(12),w.getStyle().setFillColor("yellow"),w.setPosition([C.xmin,C.ymin]),w.setFormat("x:0.##,y:0.##"),w.setFramed(!0),w.setVisible(!1),w.panelChangeListener=function(e){"bounds"==e&&(n.getInvertedScaleY()?w.setPosition([C.xmin,C.ymax]):w.setPosition([C.xmin,C.ymin]))},n.addDecoration(w,0,!0),n.getGuttersStyle().setLineColor("black"),n.getGuttersStyle().setFillColor("rgb(239,239,255)"),n.getGuttersStyle().setShapeRendering("RENDER_CRISPEDGES");var k=EJSS_DRAWING2D.panelInteraction(n);return r.getEventContext().addEventListener("dblclick",function(e){return e.preventDefault(),e.stopPropagation(),!1},!0),n};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Element={CENTER:0,NORTH:1,SOUTH:2,EAST:3,WEST:4,NORTH_EAST:5,NORTH_WEST:6,SOUTH_EAST:7,SOUTH_WEST:8,registerProperties:function(e,t){var r=EJSS_DRAWING2D.PanelInteraction.TARGET_POSITION,n=EJSS_DRAWING2D.PanelInteraction.TARGET_SIZE,i=e.getStyle();e.setController(t),t.registerProperty("Parent",e.setParent,e.getParent),t.registerProperty("X",e.setX,e.getX),t.registerProperty("Y",e.setY,e.getY),t.registerProperty("Position",e.setPosition,e.getPosition),t.registerProperty("PixelPosition",e.setPixelPosition,e.getPixelPosition),t.registerProperty("Diameter",function(t){e.setSize([t,t])}),t.registerProperty("Radius",function(t){e.setSize([2*t,2*t])}),t.registerProperty("SizeX",e.setSizeX,e.getSizeX),t.registerProperty("SizeY",e.setSizeY,e.getSizeY),t.registerProperty("Size",e.setSize,e.getSize),t.registerProperty("PixelSize",e.setPixelSize,e.getPixelSize),t.registerProperty("Bounds",e.setBounds,e.getBounds),t.registerProperty("RelativePosition",e.setRelativePosition,e.getRelativePosition),t.registerProperty("Visibility",e.setVisible,e.isVisible),t.registerProperty("Measured",e.setMeasured,e.isMeasured),t.registerProperty("Transformation",e.setTransformation),t.registerProperty("LineColor",i.setLineColor,i.getLineColor),t.registerProperty("LineWidth",i.setLineWidth,i.getLineWidth),t.registerProperty("DrawLines",i.setDrawLines,i.getDrawLines),t.registerProperty("FillColor",i.setFillColor,i.getFillColor),t.registerProperty("DrawFill",i.setDrawFill,i.getDrawFill),t.registerProperty("ShapeRendering",i.setShapeRendering,i.getShapeRendering),t.registerProperty("Attributes",i.setAttributes,i.getAttributes),t.registerProperty("EnabledPosition",function(t){e.getInteractionTarget(r).setMotionEnabled(t)}),t.registerProperty("MovesGroup",function(t){e.getInteractionTarget(r).setAffectsGroup(t)}),t.registerProperty("EnabledSize",function(t){e.getInteractionTarget(n).setMotionEnabled(t)}),t.registerProperty("ResizesGroup",function(t){e.getInteractionTarget(n).setAffectsGroup(t)}),t.registerProperty("Sensitivity",function(t){e.getInteractionTarget(r).setSensitivity(t),e.getInteractionTarget(n).setSensitivity(t)}),t.registerAction("OnDoubleClick",e.getOnDoubleClickInformation),t.registerAction("OnEnter",e.getOnEnterInformation),t.registerAction("OnExit",e.getOnExitInformation),t.registerAction("OnPress",e.getOnPressInformation),t.registerAction("OnDrag",e.getOnDragInformation),t.registerAction("OnRelease",e.getOnReleaseInformation)},copyTo:function(e,t){var r=EJSS_DRAWING2D.InteractionTarget,n=EJSS_DRAWING2D.PanelInteraction.TARGET_POSITION,i=EJSS_DRAWING2D.PanelInteraction.TARGET_SIZE;EJSS_DRAWING2D.Style.copyTo(e.getStyle(),t.getStyle()),t.setVisible(e.isVisible()),t.setMeasured(e.isMeasured()),t.setPosition(e.getPosition()),t.setPixelPosition(e.isPixelPosition()),t.setSize(e.getSize()),t.setPixelSize(e.isPixelSize()),t.setTransformation(e.getTransformation()),t.setRelativePosition(e.getRelativePosition()),r.copyTo(e.getInteractionTarget(n),t.getInteractionTarget(n)),r.copyTo(e.getInteractionTarget(i),t.getInteractionTarget(i)),t.setParent(e.getParent(),e)},getRelativePositionOffset:function(e,t,r,n){var i=0,o=0;switch(e){default:case EJSS_DRAWING2D.Element.CENTER:i=0,o=0;break;case EJSS_DRAWING2D.Element.NORTH:i=0,o=-r/2;break;case EJSS_DRAWING2D.Element.SOUTH:i=0,o=r/2;break;case EJSS_DRAWING2D.Element.EAST:i=-t/2,o=0;break;case EJSS_DRAWING2D.Element.WEST:i=t/2,o=0;break;case EJSS_DRAWING2D.Element.NORTH_EAST:i=-t/2,o=-r/2;break;case EJSS_DRAWING2D.Element.NORTH_WEST:i=t/2,o=-r/2;break;case EJSS_DRAWING2D.Element.SOUTH_EAST:i=-t/2,o=r/2;break;case EJSS_DRAWING2D.Element.SOUTH_WEST:i=t/2,o=r/2}return void 0!==n&&n&&(o=-o),[i,o]},getSWRelativePositionOffset:function(e,t,r,n){var i=0,o=0;switch(e){default:case EJSS_DRAWING2D.Element.CENTER:i=-t/2,o=r/2;break;case EJSS_DRAWING2D.Element.NORTH:i=-t/2,o=r;break;case EJSS_DRAWING2D.Element.SOUTH:i=-t/2,o=0;break;case EJSS_DRAWING2D.Element.EAST:i=-t,o=r/2;break;case EJSS_DRAWING2D.Element.WEST:i=0,o=r/2;break;case EJSS_DRAWING2D.Element.NORTH_EAST:i=-t,o=r;break;case EJSS_DRAWING2D.Element.NORTH_WEST:i=0,o=r;break;case EJSS_DRAWING2D.Element.SOUTH_EAST:i=-t,o=0;break;case EJSS_DRAWING2D.Element.SOUTH_WEST:i=0,o=0}return void 0!==n&&n&&(o=-o),[i,o]}},EJSS_DRAWING2D.element=function(e){var t={},r=EJSS_DRAWING2D.Element,n=EJSS_DRAWING2D.PanelInteraction,i=EJSS_DRAWING2D.style(e),o=!0,a=!0,s=r.CENTER,l=0,u=0,g=!1,c=1,S=1,d=!1,E=0,f={positionTarget:EJSS_DRAWING2D.interactionTarget(t,n.TARGET_POSITION,r.CENTER),sizeTarget:EJSS_DRAWING2D.interactionTarget(t,n.TARGET_SIZE,r.NORTH_EAST)},p=null,h=null,m=null,A=-1,_=[],I=[],D=!0,P=!0,T={propertiesChanged:function(){},invokeAction:function(){}},C=null;return t.getName=function(){return e},t.setParent=function(e,r){e.render?(t.setGroup(null),e.addElement(t),t.setPanel(e)):"ElementGroup"==e._23()?(t.setGroup(e),t.getGroupPanel().addElement(t,r),t.setPanel(t.getGroupPanel())):console.log("WARNING: setParent() - Parent not valid : "+e.getName())},t.getParent=function(){return null!==h?t.getGroup():t.getPanel()},t.isGroup=function(){return!1},t.getStyle=function(){return i},t.setCustomObject=function(e){C=e},t.getCustomObject=function(){return C},t.setX=function(e,t){l!=e&&(l=e,P=!0)},t.getX=function(){return l},t.setY=function(e){u!=e&&(u=e,P=!0)},t.getY=function(){return u},t.setPosition=function(e){t.setX(e[0]),t.setY(e[1])},t.getPosition=function(){return[l,u]},t.setPixelPosition=function(e){g!=e&&(g=e,P=!0)},t.isPixelPosition=function(){return g},t.setSizeX=function(e){c!=e&&(c=e,P=!0)},t.getSizeX=function(){return c},t.setSizeY=function(e){S!=e&&(S=e,P=!0)},t.getSizeY=function(){return S},t.setSize=function(e){t.setSizeX(e[0]),t.setSizeY(e[1])},t.getSize=function(){return[t.getSizeX(),t.getSizeY()]},t.setPixelSize=function(e){d!=e&&(d=e,P=!0)},t.isPixelSize=function(){return d},t.setBounds=function(e){var r,n,i,o;e.left?(r=e.left,n=e.right,i=e.top,o=e.bottom):(r=e[0],n=e[1],i=e[2],o=e[3]);var a=n-r,s=o-i,l=t.getRelativePositionOffset(a,s),u=a/2,g=s/2,c=r+u-l[0],S=i+g-l[1];t.setX(c),t.setY(S),t.setSizeX(a),t.setSizeY(s)},t.getBounds=function(){var e=d?p.toPanelMod([c,-S]):[c,S],r=e[0]/2,n=e[1]/2,i=t.getRelativePositionOffset(e[0],e[1]);return{left:l+i[0]-r,right:l+i[0]+r,top:u+i[1]+n,bottom:u+i[1]-n}},t.getAbsoluteBounds=function(e){var r=t.getBounds(),n=t.toGroupSpace([r.left,r.top],e),i=t.toGroupSpace([r.right,r.bottom],e);return{left:n[0],top:n[1],right:i[0],bottom:i[1]}},t.setRelativePosition=function(e){"string"==typeof e&&(e=r[e.toUpperCase()]),s!=e&&(s=e,P=!0)},t.getRelativePosition=function(){return s},t.getRelativePositionOffset=function(e,t){var n,i;Array.isArray(e)?(n=e[0],i=e[1]):(n=e,i=t);var o=!!p.getInvertedScaleY&&p.getInvertedScaleY();return r.getRelativePositionOffset(s,n,i,o)},t.setVisible=function(e){e!=o&&(o=e,P=!0)},t.isVisible=function(){return o},t.isGroupVisible=function(){for(var e=h;void 0!==e&&null!==e;){if(!e.isVisible())return!1;e=e.getGroup()}return o},t.setMeasured=function(e){a=e},t.isMeasured=function(){return a},t.setTransformation=function(e){void 0===e||null===e?E=0:Array.isArray(e)&&e.length>5?EJSS_TOOLS.compareArrays(E,e)||(E=e,P=!0):E!=e&&(E=e,P=!0)},t.getTransformation=function(){return E},t.getInfo=function(){return"x="+l.toFixed(2)+" y="+u.toFixed(2)},t.setPanel=function(e){p=e,D=!0},t.getPanel=function(){return p},t.getGroupPanel=function(){for(var e=t;e.getGroup();)e=e.getGroup();return e.getPanel()},t.setGroup=function(e){h=e,P=!0},t.getGroup=function(){return h},t.setSet=function(e,t){m=e,A=t},t.getSet=function(){return m},t.getSetIndex=function(){return A},t.isChanged=function(){return P},t.setChanged=function(e){P=e},t.isGroupChanged=function(){for(var e=t.getGroup();void 0!==e&&null!==e;){if(e.isChanged())return!0;e=e.getGroup()}return!1},t.setMustProject=function(e){D=e},t.isMustProject=function(){return D},t.getPixelPosition=function(e){return(t.isChanged()||t.isGroupChanged()||t.isMustProject()||e)&&(_=t.getPixelPositionOf(l,u,e),I=t.getPixelSizeOf(c,S),t.setMustProject(e)),_},t.getPixelSizes=function(e){return(t.isChanged()||t.isGroupChanged()||t.isMustProject())&&(_=t.getPixelPositionOf(l,u,e),I=t.getPixelSizeOf(c,S),t.setMustProject(e)),I},t.getAbsoluteSize=function(){var e=d?p.toPanelMod([c,-S]):[c,S];return t.toGroupSpaceMod(e)},t.getAbsolutePosition=function(e){var r;return r=g?null===h?p.toPanelPosition([l,u]):p.toPanelPosition([l,u],EJSS_DRAWING2D.DrawingPanel.SCALE_NUM):[l,u],t.toGroupSpace(r,e)},t.setAbsolutePosition=function(e){g?console.log("setAbsolutePosition not supported!"):t.setPosition(t.toElementSpace(e))},t.setAbsoluteX=function(e){g?console.log("setAbsoluteX not supported!"):t.setX(t.toElementSpace([e,0])[0])},t.setAbsoluteY=function(e){g?console.log("setAbsoluteY not supported!"):t.setY(t.toElementSpace([0,e])[1])},t.getPixelSizeOf=function(e,r){return d?[e,-r]:t.getGroupPanel().toPixelMod(t.toGroupSpaceMod([e,r]))},t.getPixelPositionOf=function(e,r,n){if(g){if(h){var i=h.getPixelPosition();return[i[0]+e,i[1]-r]}return[t.getGroupPanel().toPixelAxisX(e),t.getGroupPanel().toPixelAxisY(r)]}return null===h?t.getGroupPanel()._26(t.toGroupSpace([e,r])):t.getGroupPanel()._26(t.toGroupSpace([e,r],n),EJSS_DRAWING2D.DrawingPanel.SCALE_NUM)},t.toGroupSpaceMod=function(e){for(var t=h;void 0!==t&&null!==t;)e[0]*=t.getSizeX(),e[1]*=t.getSizeY(),t=t.getGroup();return e},t.toGroupSpace=function(e,t){for(var r=h;void 0!==r&&null!==r;)e[0]*=r.getSizeX(),e[1]*=r.getSizeY(),e[0]+=r.getX(),e[1]+=r.getY(),r=r.getGroup();if(t)for(r=h;void 0!==r&&null!==r;){var n=r.getTransformation();if(Array.isArray(n))e[0]=matrix.a*e[0]+matrix.c*e[1]+matrix.e,e[1]=matrix.b*e[0]+matrix.d*e[1]+matrix.f;else if("number"==typeof n){var i=r.getAbsolutePosition();e=EJSS_TOOLS.Mathematics.rotate(i,e,-n)}r=r.getGroup()}return e},t.toElementSpace=function(e){for(var t=[],r=h;void 0!==r&&null!==r;)t.push(r),r=r.getGroup();t=t.reverse();for(var n=t.length,i=0;i<n;i++){var r=t[i];e[0]-=r.getX(),e[1]-=r.getY(),0==r.getSizeX()?e[0]=0:e[0]/=r.getSizeX(),0==r.getSizeY()?e[1]=0:e[1]/=r.getSizeY()}return e},t.getController=function(){return T},t.setController=function(e){T=e},t.getInteractionTarget=function(e){switch(e){case n.TARGET_POSITION:return f.positionTarget;case n.TARGET_SIZE:return f.sizeTarget}return null},t.getInteractionTargets=function(){return[f.positionTarget,f.sizeTarget]},t.getInteractionInformation=function(){return{info:t.getPosition(),element:t,point:t.getGroupPanel().getPanelInteraction().getInteractionPoint()}},t.getOnDoubleClickInformation=function(){var e=t.getInteractionInformation();return e.action="OnDoubleClick",e},t.getOnEnterInformation=function(){var e=t.getInteractionInformation();return e.action="OnEnter",e},t.getOnExitInformation=function(){var e=t.getInteractionInformation();return e.action="OnExit",e},t.getOnPressInformation=function(){var e=t.getInteractionInformation();return e.action="OnPress",e},t.getOnDragInformation=function(){var e=t.getInteractionInformation();return e.action="OnDrag",e},t.getOnReleaseInformation=function(){var e=t.getInteractionInformation();return e.action="OnRelease",e},t.registerProperties=function(e){EJSS_DRAWING2D.Element.registerProperties(t,e)},t.copyTo=function(e){EJSS_DRAWING2D.Element.copyTo(t,e)},t.serialize=function(){return{mStyle:i.serialize(),mVisible:o,mMeasured:a,mRelativePosition:s,mX:l,mY:u,mPixelPosition:g,mSizeX:c,mSizeY:S,mPixelSize:d,mTransformation:E,mInteraction:{},mPanel:p?p.getName():p,mGroup:h?h.getName():h,mSet:m?m.getName():m,mIndexInSet:A,mProjectedPosition:_,mProjectedSize:I}},t.unserialize=function(e){i.unserialize(e.mStyle),o=e.mVisible,a=e.mMeasured,s=e.mRelativePosition,l=e.mX,u=e.mY,g=e.mPixelPosition,c=e.mSizeX,S=e.mSizeY,d=e.mPixelSize,E=e.mTransformation,A=e.mIndexInSet,_=e.mProjectedPosition,I=e.mProjectedSize,P=!0},i.setChangeListener(function(e){P=!0}),t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.ElementSet={registerProperties:function(e,t){var r=EJSS_DRAWING2D.PanelInteraction.TARGET_POSITION,n=EJSS_DRAWING2D.PanelInteraction.TARGET_SIZE;e.setController(t),e.setToEach(function(e,t){e.setController(t)},t),t.registerProperty("Parent",function(t){e.setParent(t),e.setToEach(function(e,t){e.setParent(t)},e)}),t.registerProperty("NumberOfElements",e.setNumberOfElements),t.registerProperty("ElementInteracted",e.setElementInteracted,e.getElementInteracted),t.registerProperty("X",function(t){e.setToEach(function(e,t){e.setX(t)},t)},function(){return e.getFromEach(function(e){return e.getX()})}),t.registerProperty("Y",function(t){e.setToEach(function(e,t){e.setY(t)},t)},function(){return e.getFromEach(function(e){return e.getY()})}),t.registerProperty("Position",function(t){e.setToEach(function(e,t){e.setPosition(t)},t)},function(){return e.getFromEach(function(e){return e.getPosition()})}),t.registerProperty("PixelPosition",function(t){e.setToEach(function(e,t){e.setPixelPosition(t)},t)}),t.registerProperty("Diameter",function(t){e.setToEach(function(e,t){e.setSize([t,t])},t)}),t.registerProperty("Radius",function(t){e.setToEach(function(e,t){e.setSize([2*t,2*t])},t)}),t.registerProperty("SizeX",function(t){e.setToEach(function(e,t){e.setSizeX(t)},t)},function(){return e.getFromEach(function(e){return e.getSizeX()})}),t.registerProperty("SizeY",function(t){e.setToEach(function(e,t){e.setSizeY(t)},t)},function(){return e.getFromEach(function(e){return e.getSizeY()})}),t.registerProperty("Size",function(t){e.setToEach(function(e,t){e.setSize(t)},t)},function(){return e.getFromEach(function(e){return e.getSize()})}),t.registerProperty("PixelSize",function(t){e.setToEach(function(e,t){e.setPixelSize(t)},t)}),t.registerProperty("Bounds",function(t){var r=function(e,t){e.setX(t[0]),e.setY(t[2]),e.setSizeX(t[1]-t[0]),e.setSizeY(t[3]-t[2])};e.setToEach(r,t)},function(){var t=function(e){return[e.getX(),e.getX()+e.getSizeX(),e.getY(),e.getY()+e.getSizeY()]};return e.getFromEach(t)}),t.registerProperty("Visibility",function(t){e.setToEach(function(e,t){e.setVisible(t)},t)}),t.registerProperty("Measured",function(t){e.setToEach(function(e,t){e.setMeasured(t)},t)}),t.registerProperty("Transformation",function(t){e.setToEach(function(e,t){e.setTransformation(t)},t)}),t.registerProperty("RelativePosition",function(t){e.setToEach(function(e,t){e.setRelativePosition(t)},t)}),t.registerProperty("LineColor",function(t){e.setToEach(function(e,t){e.getStyle().setLineColor(t)},t)}),t.registerProperty("LineWidth",function(t){e.setToEach(function(e,t){e.getStyle().setLineWidth(t)},t)}),t.registerProperty("DrawLines",function(t){e.setToEach(function(e,t){e.getStyle().setDrawLines(t)},t)}),t.registerProperty("FillColor",function(t){e.setToEach(function(e,t){e.getStyle().setFillColor(t)},t)}),t.registerProperty("DrawFill",function(t){e.setToEach(function(e,t){e.getStyle().setDrawFill(t)},t)}),t.registerProperty("Attributes",function(t){e.setToEach(function(e,t){e.getStyle().setAttributes(t)},t)}),t.registerProperty("ShapeRendering",function(t){e.setToEach(function(e,t){e.getStyle().setShapeRendering(t)},t)}),t.registerProperty("EnabledPosition",function(t){e.setToEach(function(e,t){e.getInteractionTarget(r).setMotionEnabled(t)},t)}),t.registerProperty("MovesGroup",function(t){e.setToEach(function(e,t){e.getInteractionTarget(r).setAffectsGroup(t)},t)}),t.registerProperty("EnabledSize",function(t){e.setToEach(function(e,t){e.getInteractionTarget(n).setMotionEnabled(t)},t)}),t.registerProperty("ResizesGroup",function(t){e.setToEach(function(e,t){e.getInteractionTarget(n).setAffectsGroup(t)},t)}),t.registerProperty("Sensitivity",function(t){e.setToEach(function(e,t){e.getInteractionTarget(r).setSensitivity(t),e.getInteractionTarget(n).setSensitivity(t)},t)});var i=function(){var r=e.getGroupPanel(),n=r.getPanelInteraction().getIndexElement(),i=r.getElements()[n],o=i.getSetIndex();return e.setElementInteracted(o),t.propertiesChanged("ElementInteracted"),{index:o,position:i.getPosition()}};t.registerAction("OnDoubleClick",i),t.registerAction("OnEnter",i),t.registerAction("OnExit",i),t.registerAction("OnPress",i),t.registerAction("OnDrag",i),t.registerAction("OnRelease",i)}},EJSS_DRAWING2D.elementSet=function(e,t){function r(t){var r=n.getName?n.getName():"unnamed";t=Math.max(1,t);var i=o.length-t;if(i>0){l=o.splice(t,i);for(var a=0;a<l.length;a++){var s=l[a].getPanel();s&&s.removeElement(l[a])}}else if(i<0){l=[];for(var u=n.getController(),g=o[o.length-1],c=o.length;c<t;c++){var S=e(r+"["+c+"]");S.setSet(n,c),g.copyTo(S),S.setController(u),o.push(S)}}}var n=EJSS_DRAWING2D.group(t),i=EJSS_DRAWING2D.ElementSet,o=[],a=!1,s=-1,l=[];n.setNumberOfElements=function(e){a=!0,r(e)},n.getElements=function(){return o},n.getElement=function(e){return o[e]},n.getLastElements=function(){var e=l.slice();return l=[],e},n.setElementInteracted=function(e){s=e},n.getElementInteracted=function(){return s};var u=n.setPanel;n.setPanel=function(e){u(e);for(var t=0,r=o.length;t<r;t++)o[t].setPanel(e)},n.setToEach=function(e,t){if(Array.isArray(t)){a||o.length<t.length&&r(t.length);for(var n=0,i=Math.min(o.length,t.length);n<i;n++)e(o[n],t[n])}else for(var n=0,i=o.length;n<i;n++)e(o[n],t)},n.getFromEach=function(e){for(var t=[],r=0,n=o.length;r<n;r++)t[r]=e(o[r]);return t},n.registerProperties=function(e){i.registerProperties(n,e)};var g=e(t+"[0]");return g.setController(n.getController()),g.setSet(n,0),o.push(g),n};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Grid={SCALE_NUM:0,SCALE_LOG:1,registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("StepX",e.setStepX,e.getStepX),t.registerProperty("StepY",e.setStepY,e.getStepY),t.registerProperty("TicksX",e.setTicksX,e.getTicksX),t.registerProperty("TicksY",e.setTicksY,e.getTicksY),t.registerProperty("TickStepX",e.setTickStepX,e.getTickStepX),t.registerProperty("TickStepY",e.setTickStepY,e.getTickStepY),t.registerProperty("TicksXMode",e.setTicksXMode,e.getTicksXMode),t.registerProperty("TicksYMode",e.setTicksYMode,e.getTicksYMode),t.registerProperty("ShowX",e.setShowX,e.getShowX),t.registerProperty("ShowY",e.setShowY,e.getShowY),t.registerProperty("FixedTickX",e.setFixedTickX,e.getFixedTickX),t.registerProperty("FixedTickY",e.setFixedTickY,e.getFixedTickY),t.registerProperty("ScaleX",e.setScaleX,e.getScaleX),t.registerProperty("ScaleY",e.setScaleY,e.getScaleY),t.registerProperty("ScalePrecisionX",e.setScalePrecisionX,e.getScalePrecisionX),t.registerProperty("ScalePrecisionY",e.setScalePrecisionY,e.getScalePrecisionY),t.registerProperty("AutoTicksX",e.setAutoTicksX,e.getAutoTicksX),t.registerProperty("AutoTicksY",e.setAutoTicksY,e.getAutoTicksY),t.registerProperty("AutoStepXMin",e.setAutoStepXMin,e.getAutoStepXMin),t.registerProperty("AutoStepYMin",e.setAutoStepYMin,e.getAutoStepYMin),t.registerProperty("AutoTicksXRange",e.setAutoTicksXRange,e.getAutoTicksXRange),t.registerProperty("AutoTicksYRange",e.setAutoTicksYRange,e.getAutoTicksYRange),t.registerProperty("LineColorX",e.setLineColorX,e.getLineColorX),t.registerProperty("LineWidthX",e.setLineWidthX,e.getLineWidthX),t.registerProperty("ShapeRenderingX",e.setShapeRenderingX,e.getShapeRenderingX),t.registerProperty("LineColorY",e.setLineColorY,e.getLineColorY),t.registerProperty("LineWidthY",e.setLineWidthY,e.getLineWidthY),t.registerProperty("ShapeRenderingY",e.setShapeRenderingY,e.getShapeRenderingY)}},EJSS_DRAWING2D.grid=function(e){var t=EJSS_DRAWING2D.element(e),r=!0,n=!0,i=0,o=0,a=0,s=0,l=0,u=0,g=!0,c=!0,S=Number.NaN,d=Number.NaN,E=[-1,1],f=[-1,1],p=1,h=1,m=EJSS_DRAWING2D.Grid.SCALE_NUM,A=EJSS_DRAWING2D.Grid.SCALE_NUM,_=40,I=40,D=[5,10,20],P=[5,10,20],T="black",C=.5,N=EJSS_DRAWING2D.Style.RENDER_AUTO,y="black",v=.5,R=EJSS_DRAWING2D.Style.RENDER_AUTO;return t._23=function(){return"ElementGrid"},t.setAutoTicksRangeY=function(e){P!=e&&(P=e,t.setChanged(!0))},t.getAutoTicksRangeY=function(){return P},t.setAutoTicksRangeX=function(e){D!=e&&(D=e,t.setChanged(!0))},t.getAutoTicksRangeX=function(){return D},t.setAutoStepYMin=function(e){I!=e&&(I=e,t.setChanged(!0))},t.getAutoStepYMin=function(){return I},t.setAutoStepXMin=function(e){_!=e&&(_=e,t.setChanged(!0))},t.getAutoStepXMin=function(){return _},t.setScaleY=function(e){f!=e&&(f=e,t.setChanged(!0))},t.getScaleY=function(){return f},t.setScaleX=function(e){E!=e&&(E=e,t.setChanged(!0))},t.getScaleX=function(){return E},t.setScalePrecisionX=function(e){p!=e&&(p=e,t.setChanged(!0))},t.getScalePrecisionX=function(){return p},t.setScalePrecisionY=function(e){h!=e&&(h=e,t.setChanged(!0))},t.getScalePrecisionY=function(){return h},t.setFixedTickX=function(e){S!=e&&(S=e,t.setChanged(!0))},t.getFixedTickX=function(){return S},t.setFixedTickY=function(e){d!=e&&(d=e,t.setChanged(!0))},
t.getFixedTickY=function(){return d},t.setAutoTicksX=function(e){r!=e&&(r=e,t.setChanged(!0))},t.getAutoTicksX=function(){return r},t.setAutoTicksY=function(e){n!=e&&(n=e,t.setChanged(!0))},t.getAutoTicksY=function(){return n},t.setStepX=function(e){a!=e&&(a=e,t.setChanged(!0))},t.getStepX=function(){return a},t.setStepY=function(e){s!=e&&(s=e,t.setChanged(!0))},t.getStepY=function(){return s},t.setTickStepX=function(e){l!=e&&(l=e,t.setChanged(!0))},t.getTickStepX=function(){return l},t.setTickStepY=function(e){u!=e&&(u=e,t.setChanged(!0))},t.getTickStepY=function(){return u},t.setTicksX=function(e){i!=e&&(i=e,t.setChanged(!0))},t.getTicksX=function(){return i},t.setTicksY=function(e){o!=e&&(o=e,t.setChanged(!0))},t.getTicksY=function(){return o},t.setTicksXMode=function(e){"string"==typeof e&&(e=EJSS_DRAWING2D.Grid[e.toUpperCase()]),m!=e&&(m=e,t.setChanged(!0))},t.getTicksXMode=function(){return m},t.setTicksYMode=function(e){"string"==typeof e&&(ticksXMode=EJSS_DRAWING2D.Grid[e.toUpperCase()]),A!=e&&(A=e,t.setChanged(!0))},t.setShowX=function(e){g!=e&&(g=e,t.setChanged(!0))},t.getShowX=function(){return g},t.setShowY=function(e){c!=e&&(c=e,t.setChanged(!0))},t.getShowY=function(){return c},t.getTicksYMode=function(){return A},t.setLineColorX=function(e){return"string"!=typeof e&&(e=EJSS_TOOLS.DisplayColors.getLineColor(e)),e!=T&&(T=e,t.setChanged(!0)),t},t.getLineColorX=function(){return T},t.setLineWidthX=function(e){e!=C&&(C=e,t.setChanged(!0))},t.getLineWidthX=function(){return C},t.setShapeRenderingX=function(e){"RENDER"==e.substring(0,6)&&(e=EJSS_DRAWING2D.Style[e.toUpperCase()]),N!=e&&(N=e,t.setChanged(!0))},t.getShapeRenderingX=function(){return N},t.setLineColorY=function(e){return"string"!=typeof e&&(e=EJSS_TOOLS.DisplayColors.getLineColor(e)),e!=y&&(y=e,t.setChanged(!0)),t},t.getLineColorY=function(){return y},t.setLineWidthY=function(e){e!=v&&(v=e,t.setChanged(!0))},t.getLineWidthY=function(){return v},t.setShapeRenderingY=function(e){"RENDER"==e.substring(0,6)&&(e=EJSS_DRAWING2D.Style[e.toUpperCase()]),R!=e&&(R=e,t.setChanged(!0))},t.getShapeRenderingY=function(){return R},t.registerProperties=function(e){EJSS_DRAWING2D.Grid.registerProperties(t,e)},t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Group={},EJSS_DRAWING2D.group=function(e){var t=EJSS_DRAWING2D.element(e);return t._23=function(){return"ElementGroup"},t.isGroup=function(){return!0},t},EJSS_DRAWING2D.GroupSet={},EJSS_DRAWING2D.groupSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Histogram={},EJSS_DRAWING2D.histogram=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Image={},EJSS_DRAWING2D.image=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.ImageSet={},EJSS_DRAWING2D.imageSet=function(e){};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.analyticCurve=function(e,t){var r,n,i=t.getPixelPosition(),o=t.getPixelSizes(),a=t.getRelativePositionOffset(o),s=i[0]+a[0],l=i[1]+a[1],u=o[0]/2,g=o[1]/2,c=t.getNumPoints(),S=t.getMinimun(),d=t.getMaximun(),E=void 0===S||null===S?t.getPanel().getRealWorldXMin():S,f=void 0===d||null===d?t.getPanel().getRealWorldXMax():d,p=t.getVariable(),h=t.getFunctionX(),m=t.getFunctionY(),A=EJSS_DRAWING2D.functionsParser(),_=!1;try{r=A.parse(h)}catch(e){console.log("Analytic curve error parsing FunctionX: "+h),_=!0}if(!_)try{n=A.parse(m)}catch(e){console.log("Analytic curve error parsing FunctionY: "+m),_=!0}if(_)return void t.getController().invokeAction("OnError");var I=(f-E)/(c-1),D=[],P={},T=t.getParameters();for(var C in T)P[C]=T[C];try{for(var N=0,y=E;y<=f;y+=I){P[p]=y;var v=r.evaluate(P),R=n.evaluate(P);isNaN(v)||isNaN(R)||(D[N]=[],D[N][0]=v,D[N++][1]=R)}}catch(e){t.getController().invokeAction("OnError")}!function(t,r,n,i,o){e.beginPath();for(var a=0;a<t.length;a++){var s=t[a],l=r+s[0]*i,u=n+s[1]*o,g=s[2];0==a||0==g?e.moveTo(l,u):e.lineTo(l,u)}}(D,s-u,l-g,o[0],o[1]);var O=t.getStyle();O.getDrawFill()&&"none"!=O.getFillColor()&&(e.fillStyle=O.getFillColor(),e.fill()),O.getDrawLines()&&(e.lineWidth=O.getLineWidth(),e.strokeStyle=O.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.arrow=function(e,t){function r(t,r,i,o,a,s,l,u,g){e.save(),o/=2,a/=2;var c=0==u?Math.PI/2:Math.atan(g/u);switch(c+=u<0?-Math.PI/2:Math.PI/2,i){case n.TRIANGLE:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(0,a/2),e.lineTo(o,a/2),e.lineTo(0,-a/2),e.lineTo(-o,a/2),e.closePath();break;case n.ANGLE:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(o,a),e.lineTo(0,0),e.lineTo(-o,a);break;case n.LINE:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(o,0),e.lineTo(-o,0);break;case n.RECTANGLE:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(0,-a),e.lineTo(o,-a),e.lineTo(o,a),e.lineTo(-o,a),e.lineTo(-o,-a),e.closePath();break;case n.POINTED:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(0,a/4),e.lineTo(o,a),e.lineTo(0,-a/4),e.lineTo(-o,a),e.closePath();break;case n.CIRCLE:var S=o<a?o:a;e.beginPath(),e.translate(t,r),e.arc(0,0,S,0,2*Math.PI,!1);break;case n.DIAMOND:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(0,-a),e.lineTo(o,0),e.lineTo(0,a),e.lineTo(-o,0),e.closePath();break;case n.INVTRIANGLE:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(0,-a/2),e.lineTo(-o,-a/2),e.lineTo(0,a/2),e.lineTo(o,-a/2),e.closePath();break;case n.INVANGLE:e.beginPath(),e.translate(t,r),e.rotate(c),e.moveTo(-o,-a),e.lineTo(0,0),e.lineTo(o,-a);break;case n.WEDGE:case n.CURVE:console.log("Type of Arrow: not supported")}"none"!=l&&(i!=n.ANGLE&&i!=n.INVANGLE&&(e.fillStyle=l,e.fill()),i!=n.POINTED&&(e.lineWidth=s,e.strokeStyle=l,e.stroke())),e.restore()}var n=EJSS_DRAWING2D.Arrow,i=t.getPixelPosition(),o=t.getPixelSizes(),a=t.getRelativePositionOffset(o),s=i[0]+a[0],l=i[1]+a[1],u=o[0]/2,g=o[1]/2;if(0!=o[0]||0!=o[1]){e.beginPath(),e.moveTo(s-u,l-g),e.lineTo(s+u,l+g);var c=t.getStyle();if(c.getDrawFill()&&"none"!=c.getFillColor()&&(e.fillStyle=c.getFillColor(),e.fill()),c.getDrawLines()&&(e.lineWidth=c.getLineWidth(),e.strokeStyle=c.getLineColor(),e.stroke()),t.getMarkEnd()!=n.NONE){var S=t.getMarkProportion()*EJSS_TOOLS.Mathematics.norm([o[0],o[1]]),d=0!=S&&S<t.getMarkEndWidth()?S:t.getMarkEndWidth(),E=0!=S&&S<t.getMarkEndHeight()?S:t.getMarkEndHeight(),f="none"==t.getMarkEndColor()?t.getStyle().getLineColor():t.getMarkEndColor(),p=t.getMarkEndStroke()<0?t.getStyle().getLineWidth():t.getMarkEndStroke();r(s+u,l+g,t.getMarkEnd(),d,E,p,f,u,g)}if(t.getMarkMiddle()!=n.NONE){var h=t.getMarkProportion()*EJSS_TOOLS.Mathematics.norm([o[0],o[1]]),m=0!=h&&h<t.getMarkMiddleWidth()?h:t.getMarkMiddleWidth(),A=0!=h&&h<t.getMarkMiddleHeight()?h:t.getMarkMiddleHeight(),f="none"==t.getMarkMiddleColor()?t.getStyle().getLineColor():t.getMarkMiddleColor(),p=t.getMarkMiddleStroke()<0?t.getStyle().getLineWidth():t.getMarkMiddleStroke();r(s,l,t.getMarkMiddle(),m,A,p,f,u,g)}if(t.getMarkStart()!=n.NONE){var _=t.getMarkProportion()*EJSS_TOOLS.Mathematics.norm([o[0],o[1]]),I=0!=_&&_<t.getMarkStartWidth()?_:t.getMarkStartWidth(),D=0!=_&&_<t.getMarkStartHeight()?_:t.getMarkStartHeight(),f="none"==t.getMarkStartColor()?t.getStyle().getLineColor():t.getMarkStartColor(),p=t.getMarkStartStroke()<0?t.getStyle().getLineWidth():t.getMarkStartStroke();r(s-u,l-g,t.getMarkStart(),I,D,p,f,u,g)}}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.axis=function(e,t){function r(t,r,n,i){i==EJSS_DRAWING2D.Axis.AXIS_VERTICAL?(e.moveTo(t-n/2,r),e.lineTo(t+n/2,r)):(e.moveTo(t,r-n/2),e.lineTo(t,r+n/2))}function n(r,n,i,o,a){e.save();var o=t.getFont(),s="";s+="none"!=o.getFontStyle()?o.getFontStyle()+" ":"",s+="none"!=o.getFontWeight()?o.getFontWeight()+" ":"",s+=o.getFontSizeString()+"px ",s+=o.getFontFamily(),e.font=s,e.fillStyle=o.getFillColor(),a?r-=e.measureText(i).width/2+.5:n+=o.getFontSize()/2,e.fillText(i,r,n),e.restore()}if(t.getShow()){var i=t.getPixelPosition(),o=t.getPixelSizes(),a=t.getRelativePositionOffset(o),s=i[0]+a[0],l=i[1]+a[1],u=o[0]/2,g=o[1]/2,c=t.getStyle(),S=t.getOrient(),d=t.getInvertedScaleY();e.beginPath(),function(t,r,n,i,o,a){o==EJSS_DRAWING2D.Axis.AXIS_VERTICAL?(a&&(i=-i,r=-r),e.moveTo(t,r-i),e.lineTo(t,r+i)):(e.moveTo(t-n,r),e.lineTo(t+n,r))}(s,l,u,g,S,d);var E=S==EJSS_DRAWING2D.Axis.AXIS_VERTICAL?Math.abs(o[1]):Math.abs(o[0]),f=t.getTicksMode();if(f==EJSS_DRAWING2D.Axis.SCALE_LOG){var p=t.getScale();if(p[0]>0&&p[1]>0){var h=t.getTicks(),m=t.getScalePrecision(),A=t.getTicksSize();EJSS_GRAPHICS.GraphicsUtils.drawLogTicks(s,l,u,g,E,A,p,h,S,r);var _=t.getFont(),I=t.getTextPosition();EJSS_GRAPHICS.GraphicsUtils.drawLogTicksText(s,l,u,g,h,A,p,m,_,I,S,n)}}else if(f==EJSS_DRAWING2D.Axis.SCALE_NUM){var D=0,P=0;if(t.getAutoTicks())for(var T=t.getAutoStepMin(),C=t.getAutoTicksRange(),N=C.length-1;N>=0&&!(1.001*(D=Math.abs(E/C[N]))>=T);N--);else{var h=t.getTicks();0!=h?D=E/h:(D=t.getStep(),P=t.getTickStep())}var m=t.getScalePrecision(),p=t.getScale();if(0==P)var y=Math.abs((p[1]-p[0])*D/E);else{var y=P;D=Math.abs(y*E/(p[1]-p[0]))}var v=Math.pow(10,m),R=Math.round(y*v)/v;R>0&&(y=R,D=Math.abs(R*E/(p[1]-p[0])));var O=t.getFixedTick(),M=p[1];isNaN(O)||(M=O<p[0]?O+(Math.floor((p[0]-O)/y)+1)*y:O>p[1]?O-(Math.floor((O-p[1])/y)+1)*y:O);var b=Math.abs((p[0]-M)%y),G=Math.abs(b-y);(b<.001||G<.001)&&(b=0);var L=E*b/Math.abs(p[1]-p[0]),A=t.getTicksSize();EJSS_GRAPHICS.GraphicsUtils.drawDecTicks(s,l,u,g,A,D,L,S,d,r);var _=t.getFont(),I=t.getTextPosition();EJSS_GRAPHICS.GraphicsUtils.drawDecTicksText(s,l,u,g,A,D,L,p,m,y,b,_,I,S,d,n)}var c=t.getStyle();c.getDrawFill()&&"none"!=c.getFillColor()&&(e.fillStyle=c.getFillColor(),e.fill()),c.getDrawLines()&&(e.lineWidth=c.getLineWidth(),e.strokeStyle=c.getLineColor(),e.stroke())}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.byteRaster=function(e,t){if(t.getDataChanged()){var r=t.getData(),n=t.getColorMapper().getColors(),i=r.length,o=r[0].length,a=t.getColorMapper().getNumberOfColors(),s=t.getPixelPosition(),l=t.getPixelSizes(),u=t.getRelativePositionOffset(l),g=s[0]+u[0],c=s[1]+u[1],S=Math.abs(l[0]/2),d=Math.abs(l[1]/2),E=e.canvas.id;EJSS_SVGGRAPHICS.Utils.ImageDataCanvas(i,o,a,r,n,function(t){var r=document.getElementById(E);e=r.getContext("2d"),e.putImageData(t,g-S,c-d)}),t.setDataChanged(!1)}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.canvas=function(e,t){for(var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=t.getDimensions(),l=s[1]-s[0],u=s[3]-s[2],g=Math.abs(n[0]),c=Math.abs(n[1]),S=g/l,d=c/u,E=o-g/2,f=a+c/2,p=t.getDrawables(),h=0;h<p.length;h++)void 0!==p[h].imageField?EJSS_GRAPHICS.GraphicsUtils.drawImageField(e,E,f,xMin,yMin,g,c,S,d,p[h]):void 0!==p[h].run&&p[h].draw(e,E,f,xMin,yMin,g,c,S,d)};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.cellLattice=function(e,t){function r(t,r,n,i,o,a){e.beginPath(),0==o&&(o=Math.abs(n-t));for(var s=t;s<=n;s+=o)e.moveTo(s,r),e.lineTo(s,i);0==a&&(a=Math.abs(r-i));for(var s=i;s>=r;s-=a)e.moveTo(t,s),e.lineTo(n,s)}for(var n=t.getPixelPosition(),i=t.getPixelSizes(),o=t.getRelativePositionOffset(i),a=n[0]+o[0],s=n[1]+o[1],l=i[0]/2,u=i[1]/2,g=t.getStyle(),c=t.getData(),S=t.getColorMapper().getColors(),d=c.length,E=c[0].length,f=Math.abs(i[0]/d),p=Math.abs(i[1]/E),h=a-l+f/2,m=s-u-p/2,A=0;A<E;A++)for(var _=0;_<d;_++)!function(t,r,n,i,o){e.beginPath();var a=n/2,s=i/2;e.moveTo(t-a,r+s),e.lineTo(t+a,r+s),e.lineTo(t+a,r-s),e.lineTo(t-a,r-s),e.lineTo(t-a,r+s),e.fillStyle=o,e.fill(),e.lineWidth=1,e.strokeStyle=o,e.stroke()}(h+f*_,m-p*A,f,p,S[c[_][A]]);t.getShowGrid()&&function(t,n,i,o,a,s,l){var u=i/2,g=o/2;r(t-u,n+g,t+u,n-g,a,s),l.getDrawFill()&&"none"!=l.getFillColor()&&(e.fillStyle=l.getFillColor(),e.fill()),l.getDrawLines()&&(e.lineWidth=l.getLineWidth(),e.strokeStyle=l.getLineColor(),e.stroke())}(a,s,i[0],i[1],f,p,g)};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.cursor=function(e,t){var r=t.getPixelPosition(),n=t.getCursorType(),i=t.getGroupPanel(),o=i.getRealWorldCoordinates(),a=i._26([o[0],o[2]]),s=i._26([o[1],o[3]]);if(e.beginPath(),n!=EJSS_DRAWING2D.Cursor.VERTICAL){var l=a[0],u=s[0],g=r[1];g>a[1]?g=a[1]:g<s[1]&&(g=s[1]),e.moveTo(l,g),e.lineTo(u,g)}if(n!=EJSS_DRAWING2D.Cursor.HORIZONTAL){var c=r[0],S=a[1],d=s[1];c<a[0]?c=a[0]:c>s[0]&&(c=s[0]),e.moveTo(c,S),e.lineTo(c,d)}var E=t.getStyle();E.getDrawFill()&&"none"!=E.getFillColor()&&(e.fillStyle=E.getFillColor(),e.fill()),E.getDrawLines()&&(e.lineWidth=E.getLineWidth(),e.strokeStyle=E.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.ellipse=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=Math.abs(n[0]),l=Math.abs(n[1]),u=o-s/2,g=a-l/2;ox=s/2*.5522848,oy=l/2*.5522848,xe=u+s,ye=g+l,e.beginPath(),e.moveTo(u,a),e.bezierCurveTo(u,a-oy,o-ox,g,o,g),e.bezierCurveTo(o+ox,g,xe,a-oy,xe,a),e.bezierCurveTo(xe,a+oy,o+ox,ye,o,ye),e.bezierCurveTo(o-ox,ye,u,a+oy,u,a);var c=t.getStyle();c.getDrawFill()&&"none"!=c.getFillColor()&&(e.fillStyle=c.getFillColor(),e.fill()),c.getDrawLines()&&(e.lineWidth=c.getLineWidth(),e.strokeStyle=c.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.grid=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=n[0]/2,l=n[1]/2,u=t.getShowX(),g=t.getShowY();if(u){e.beginPath();var c=t.getTicksXMode();if(c==EJSS_DRAWING2D.Grid.SCALE_LOG){var S=t.getScaleX();if(S[0]>0&&S[1]>0){var d=t.getTicksX(),E=o-s,f=o+s,p=a+l,h=a-l;EJSS_GRAPHICS.GraphicsUtils.drawLogGrid(E,p,f,h,d,S,1,function(t,r){e.moveTo(t,r)},function(t,r){e.lineTo(t,r)})}}else if(c==EJSS_DRAWING2D.Grid.SCALE_NUM){var m=0,A=0;if(t.getAutoTicksX())for(var _=t.getAutoStepXMin(),I=t.getAutoTicksRangeX(),D=I.length-1;D>=0&&!((m=Math.abs(n[0]/I[D]))>=_);D--);else{var d=t.getTicksX();0!=d?m=Math.abs(n[0]/d):(m=t.getStepX(),A=t.getTickStepX())}var P=t.getScalePrecisionX(),S=t.getScaleX();if(0==A)var T=Math.abs((S[1]-S[0])*m/n[0]);else{var T=A;m=Math.abs(T*n[0]/(S[1]-S[0]))}var C=Math.pow(10,P),N=Math.round(T*C)/C;N>0&&(T=N,m=Math.abs(N*n[0]/(S[1]-S[0])));var y=t.getFixedTickX(),v=S[1];isNaN(y)||(v=y<S[0]?y+(Math.floor((S[0]-y)/T)+1)*T:y>S[1]?y-(Math.floor((y-S[1])/T)+1)*T:y);var R=Math.abs((S[0]-v)%T),O=Math.abs(R-T);(R<.001||O<.001)&&(R=0);var M=Math.abs(n[0]*R/(S[1]-S[0])),E=o-s,f=o+s,p=a+l,h=a-l;EJSS_GRAPHICS.GraphicsUtils.drawDecGrid(E,p,f,h,M,m,1,function(t,r){e.moveTo(t,r)},function(t,r){e.lineTo(t,r)})}e.lineWidth=t.getLineWidthX(),e.strokeStyle=t.getLineColorX(),e.stroke()}if(g){e.beginPath();var b=t.getTicksYMode();if(b==EJSS_DRAWING2D.Grid.SCALE_LOG){var G=t.getScaleY();if(G[0]>0&&G[1]>0){var L=t.getTicksY(),E=o-s,f=o+s,p=a+l,h=a-l;EJSS_GRAPHICS.GraphicsUtils.drawLogGrid(E,p,f,h,L,G,-1,function(t,r){e.moveTo(t,r)},function(t,r){e.lineTo(t,r)})}}else if(b==EJSS_DRAWING2D.Grid.SCALE_NUM){var x=0,J=0;if(t.getAutoTicksY())for(var w=t.getAutoStepYMin(),k=t.getAutoTicksRangeY(),D=k.length-1;D>=0&&!((x=Math.abs(n[1]/k[D]))>=w);D--);else{var L=t.getTicksY();0!=L?x=Math.abs(n[1]/L):(x=t.getStepY(),J=t.getTickStepY())}var W=t.getScalePrecisionY(),G=t.getScaleY();if(0==J)var F=Math.abs((G[1]-G[0])*x/n[1]);else{var F=J;x=Math.abs(F*n[1]/(G[1]-G[0]))}var V=Math.pow(10,W),U=Math.round(F*V)/V;U>0&&(F=U,x=Math.abs(U*n[1]/(G[1]-G[0])));var y=t.getFixedTickY(),v=G[1];isNaN(y)||(v=y<G[0]?y+(Math.floor((G[0]-y)/F)+1)*F:y>G[1]?y-(Math.floor((y-G[1])/F)+1)*F:y);var R=Math.abs((G[0]-v)%F),O=Math.abs(R-F);(R<.001||O<.001)&&(R=0);var Y=Math.abs(n[1]*R/(G[1]-G[0])),E=o-s,f=o+s,p=a+l,h=a-l;EJSS_GRAPHICS.GraphicsUtils.drawDecGrid(E,p,f,h,Y,x,-1,function(t,r){e.moveTo(t,r)},function(t,r){e.lineTo(t,r)})}e.lineWidth=t.getLineWidthY(),e.strokeStyle=t.getLineColorY(),e.stroke()}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.histogram=function(e,t){for(var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=n[0]/2,l=n[1]/2,u=t.getStyle(),g=t.getDiscrete(),c=t.getBinWidth()/2,S=t.getBars(),d=t.getGroupPanel().getPixelPositionWorldOrigin()[1],E=0;E<S.length;E++){var f,p,h=S[E][0];g?f=p=o-s+h*n[0]:(f=o-s+(h-c)*n[0],p=o-s+(h+c)*n[0]);var m=a-l+S[E][1]*n[1];!function(t,r,n,i,o){e.beginPath(),e.moveTo(t,i),e.lineTo(t,n),e.lineTo(r,n),e.lineTo(r,i),o.getDrawFill()&&"none"!=o.getFillColor()&&(e.fillStyle=o.getFillColor(),e.fill()),o.getDrawLines()&&(e.lineWidth=o.getLineWidth(),e.strokeStyle=o.getLineColor(),e.stroke())}(f,p,m,d,u)}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.image=function(e,t,r){var n,i=t.getPixelPosition(),o=t.getPixelSizes(),a=t.getRelativePositionOffset(o),s=i[0]+a[0],l=i[1]+a[1],u=Math.abs(o[0]/2),g=Math.abs(o[1]/2);if(t.getChangedImage()||(n=t.getCustomObject()),n)e.save(),r(t),e.drawImage(n,s-u,l-g,Math.abs(o[0]),Math.abs(o[1])),e.restore();else{n=new Image,t.setCustomObject(n),n.onload=function(){e.save(),r(t),e.drawImage(n,s-u,l-g,Math.abs(o[0]),Math.abs(o[1])),e.restore()};var c=t.getEncode();c.length>0?n.src="data:png;base64,"+c:n.src=t.getImageUrl()}t.setChangedImage(!1)};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.mesh=function(e,t){function r(t,r,n,i,o){e.beginPath();for(var a=0;a<n;a++)0==a?e.moveTo(t[0],r[0]):e.lineTo(t[a],r[a]);e.lineTo(t[0],r[0]);var s=i.indexToColor(o);e.fillStyle=s,e.fill(),e.lineWidth=1.25,e.strokeStyle=s,e.stroke()}function n(t,r,n,i){e.beginPath();for(var o=t.length,a=0;a<o;a++)0==a?e.moveTo(t[0],r[0]):e.lineTo(t[a],r[a]);e.lineTo(t[0],r[0]),n&&i.getDrawFill()&&"none"!=i.getFillColor()&&(e.fillStyle=i.getFillColor(),e.fill()),i.getDrawLines()&&(e.lineWidth=i.getLineWidth(),e.strokeStyle=i.getLineColor(),e.stroke())}function i(t,r,n,i){e.beginPath();for(var o=t.length,a=0;a<o;a++)0==a?e.moveTo(t[0],r[0]):e.lineTo(t[a],r[a]);e.lineTo(t[0],r[0]),e.lineWidth=i+.5,e.strokeStyle=n,e.stroke()}var o,a,s,l,u=t.getPixelPosition(),g=t.getPixelSizes(),c=t.getRelativePositionOffset(g),S=u[0]+c[0],d=u[1]+c[1],E=g[0]/2,f=g[1]/2,p=t.getPoints();if(null!=p){var h=p.length;o=new Array(h),a=new Array(h);for(var m=0;m<h;m++)o[m]=S-E+p[m][0]*g[0],a[m]=d-f+p[m][1]*g[1];var A=t.getCells(),_=t.getFieldAtPoints();if(_?s=EJSS_GRAPHICS.GraphicsUtils.buildCells(o,a,A,_,!1):(_=t.getFieldAtCells(),s=EJSS_GRAPHICS.GraphicsUtils.buildCells(o,a,A,_,!0)),null!=A){var I=t.getStyle();if(null!=_){var D=t.getColorCoded();EJSS_GRAPHICS.GraphicsUtils.drawPolygons(s,D,function(e,t){n(e,t,!1,I)},function(e,t,n,i,o){r(e,t,n,i,o)})}else EJSS_GRAPHICS.GraphicsUtils.drawPolygons(s,D,function(e,t){n(e,t,!0,I)},function(e,t,r,n,i){})}var P=t.getBoundary();if(t.getDrawBoundary()&&null!=P){var T=t.getBoundaryLabels(),C=t.getBoundaryColors(),N=t.getBoundaryLineWidth();l=EJSS_GRAPHICS.GraphicsUtils.buildBoundary(o,a,P),EJSS_GRAPHICS.GraphicsUtils.drawBoundary(l,T,C,function(e,t,r){i(e,t,r,N)})}if(t.getDataType()>=4&&null!=_)for(var y=t.getVectorLength()*g[0],m=0,v=A.length;m<v;m++)!function(t,r,n,i){for(var o=0;o<t.length;o++){var a=t[o],s=r[o],l=n[o][0],u=n[o][1],g=EJSS_TOOLS.Mathematics.norm([l,u]),c=l*i/g,S=u*i/g;if(0!=c||0!=S){var E=.3*EJSS_TOOLS.Mathematics.norm([c,S]),p=0!=E&&E<12?E:12,h=Math.atan2(c,S);e.beginPath(),e.moveTo(a,s),e.lineTo(a+c-p*Math.cos(h),s+S-p*Math.sin(h)),e.lineTo(a+c-p*Math.cos(h-Math.PI/6),s+S-p*Math.sin(h-Math.PI/6)),e.lineTo(a+c,d+f),e.lineTo(a+c-p*Math.cos(h+Math.PI/6),s+S-p*Math.sin(h+Math.PI/6)),e.lineTo(a+c-p*Math.cos(h),s+S-p*Math.sin(h)),e.lineWidth=1,e.strokeStyle="black",e.stroke()}}}(mCellA[m],mCellB[m],_[m],y)}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.pipe=function(e,t){var r=t.getPoints();if(r&&!(r.length<=0)){var n=t.getPixelPosition(),i=t.getPixelSizes(),o=t.getRelativePositionOffset(i),a=n[0]+o[0],s=n[1]+o[1],l=Math.abs(i[0]),u=Math.abs(i[1]),g=a-l/2,c=s+u/2,S=t.getStyle();e.beginPath(),e.moveTo(g,c);for(var a=g,s=c,d=0,E=r.length;d<E;d++){var f=r[d];a+=Math.round(f[0]*l),s+=Math.round(-f[1]*u),e.lineTo(a,s)}S.getDrawLines()&&(e.lineWidth=2*S.getLineWidth()+t.getPipeWidth(),e.strokeStyle=S.getLineColor(),e.stroke()),e.beginPath(),e.moveTo(g,c);for(var a=g,s=c,d=0,E=r.length;d<E;d++){var f=r[d];a+=Math.round(f[0]*l),s+=Math.round(-f[1]*u),e.lineTo(a,s)}S.getDrawLines()&&(e.lineWidth=t.getPipeWidth(),e.strokeStyle=S.getFillColor(),e.stroke())}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.point=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1];e.beginPath(),e.arc(o,a,2,0,2*Math.PI);var s=t.getStyle();e.fillStyle=s.getFillColor(),e.fill()};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.polygon=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=n[0]/2,l=n[1]/2;e.beginPath();for(var u=t.getPoints(),g=0;g<u.length;g++){var c=u[g],S=o-s+c[0]*n[0],d=a-l+c[1]*n[1],E=c[2];0==g||0==E?e.moveTo(S,d):e.lineTo(S,d)}var f=t.getStyle();f.getDrawFill()&&"none"!=f.getFillColor()&&(e.fillStyle=f.getFillColor(),e.fill()),f.getDrawLines()&&(e.lineWidth=f.getLineWidth(),e.strokeStyle=f.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.rectangle=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=n[0]/2,l=n[1]/2;e.beginPath(),e.moveTo(o-s,a+l),e.lineTo(o+s,a+l),e.lineTo(o+s,a-l),e.lineTo(o-s,a-l),e.lineTo(o-s,a+l);var u=t.getStyle();u.getDrawFill()&&"none"!=u.getFillColor()&&(e.fillStyle=u.getFillColor(),e.fill()),u.getDrawLines()&&(e.lineWidth=u.getLineWidth(),e.strokeStyle=u.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.roundRectangle=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=Math.abs(n[0]),l=Math.abs(n[1]),u=o-s/2,g=a-l/2,c=Math.abs(t.getCornerRadius());e.beginPath(),e.moveTo(u+c,g),e.lineTo(u+s-c,g),e.quadraticCurveTo(u+s,g,u+s,g+c),e.lineTo(u+s,g+l-c),e.quadraticCurveTo(u+s,g+l,u+s-c,g+l),e.lineTo(u+c,g+l),e.quadraticCurveTo(u,g+l,u,g+l-c),e.lineTo(u,g+c),e.quadraticCurveTo(u,g,u+c,g),e.closePath();var S=t.getStyle();S.getDrawFill()&&"none"!=S.getFillColor()&&(e.fillStyle=S.getFillColor(),e.fill()),S.getDrawLines()&&(e.lineWidth=S.getLineWidth(),e.strokeStyle=S.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.canvas=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=t.getMaximumX()-t.getMinimumX(),l=t.getMaximumY()-t.getMinimumY(),u=Math.abs(n[0]),g=Math.abs(n[1]),c=u/s,S=g/l,d=o-u/2,E=a+g/2;EJSS_GRAPHICS.GraphicsUtils.drawImageField(context,d,E,t.getMinimumX(),t.getMinimumY(),u,g,c,S,{data:t.getData()})};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.segment=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=n[0]/2,l=n[1]/2;e.beginPath(),e.moveTo(o-s,a-l),e.lineTo(o+s,a+l);var u=t.getStyle();u.getDrawFill()&&"none"!=u.getFillColor()&&(e.fillStyle=u.getFillColor(),e.fill()),u.getDrawLines()&&(e.lineWidth=u.getLineWidth(),e.strokeStyle=u.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.spring=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=n[0]/2,l=n[1]/2,u=t.getGroupPanel().toPixelMod([t.getRadius(),0])[0];e.beginPath(),EJSS_GRAPHICS.GraphicsUtils.drawSpring(t.getLoops(),t.getPointsPerLoop(),u,t.getSolenoid(),t.getThinExtremes(),o-s,a-l,n[0],n[1],function(t,r){e.moveTo(t,r)},function(t,r){e.lineTo(t,r)});var g=t.getStyle();g.getDrawFill()&&"none"!=g.getFillColor()&&(e.fillStyle=g.getFillColor(),e.fill()),g.getDrawLines()&&(e.lineWidth=g.getLineWidth(),e.strokeStyle=g.getLineColor(),e.stroke())};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.tank=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=Math.abs(n[0]/2),l=Math.abs(n[1]/2),u=t.getPixelSizeOf(0,t.getLevel()),g=o-s,c=o+s,S=a+l,d=a-l,E=S+u[1],f=t.getStyle();e.beginPath(),e.moveTo(g+u[0],E),e.lineTo(g,S),e.lineTo(c,S),e.lineTo(c+u[0],E),e.fillStyle=t.getLevelColor(),e.fill(),e.beginPath(),e.moveTo(g,d),e.lineTo(g,S),e.lineTo(c,S),e.lineTo(c,d),f.getDrawFill()&&"none"!=f.getFillColor()&&(e.fillStyle=f.getFillColor(),e.fill()),e.lineWidth=f.getLineWidth(),e.strokeStyle=f.getLineColor(),e.stroke()};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.text=function(e,t){var r=t.getFont(),n="";n+="none"!=r.getFontStyle()?r.getFontStyle()+" ":"",n+="none"!=r.getFontWeight()?r.getFontWeight()+" ":"",n+=r.getFontSizeString()+(r.getFontSizeString().toString().indexOf("px")>-1?" ":"px "),n+=r.getFontFamily(),e.font=n;var i=t.getText(),o=t.getPixelPosition(),a=t.getFramed()?4:0,s=[e.measureText(i).width+2*a,r.getFontSize()+2*a],l=EJSS_DRAWING2D.Element.getSWRelativePositionOffset(t.getRelativePosition(),s[0],s[1]),u=t.getMarginX(),g=t.getMarginY(),c=o[0]+l[0]+u+a,S=o[1]+l[1]+g-a;if(t.getFramed()){var d=a,E=a,f=s[0]-2*a,p=s[1]-2*a;if(f>0){var h=S+d,m=S-p-d,A=c-E,_=c+f+d;e.save(),e.beginPath(),e.moveTo(A,h),e.lineTo(_,h),e.lineTo(_,m),e.lineTo(A,m),e.lineTo(A,h);var I=t.getStyle();I.getDrawFill()&&"none"!=I.getFillColor()&&(e.fillStyle=I.getFillColor(),e.fill()),I.getDrawLines()&&(e.lineWidth=I.getLineWidth(),e.strokeStyle=I.getLineColor(),e.stroke()),e.restore()}}var D=0;switch(t.getWritingMode()){case EJSS_DRAWING2D.Text.MODE_TOPDOWN:D=Math.PI/2;break;case EJSS_DRAWING2D.Text.MODE_RIGTHLEFT:D=Math.PI;break;case EJSS_DRAWING2D.Text.MODE_DOWNTOP:D=3*Math.PI/2;break;case EJSS_DRAWING2D.Text.MODE_LEFTRIGHT:D=0}e.translate(o[0]+u,o[1]+g),e.rotate(D),e.translate(-(o[0]+u),-(o[1]+g)),e.fillStyle=r.getFillColor(),e.fillText(t.getText(),c,S)};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.trace=function(e,t){function r(t,r,n,i){var o=t,a=r,s=Math.abs(n[0]),l=Math.abs(n[1]);e.beginPath(),e.rect(o-s/2,a-l/2,s,l),i.getDrawFill()&&"none"!=i.getFillColor()&&(e.fillStyle=i.getFillColor(),e.fill()),i.getDrawLines()&&(e.lineWidth=i.getLineWidth(),e.strokeStyle=i.getLineColor(),e.stroke())}var n=t.getPixelPosition(),i=t.getPixelSizes(),o=t.getRelativePositionOffset(i),a=n[0]+o[0],s=n[1]+o[1],l=i[0]/2,u=i[1]/2;!function(t,r,n,i,o){e.beginPath();for(var a=0;a<t.length;a++){var s=t[a],l=r+s[0]*i,u=n+s[1]*o,g=s[2];0==a||0==g?e.moveTo(l,u):e.lineTo(l,u)}}(t.getPoints(),a-l,s-u,i[0],i[1]);var g=t.getStyle();g.getDrawFill()&&"none"!=g.getFillColor()&&(e.fillStyle=g.getFillColor(),e.fill()),g.getDrawLines()&&(e.lineWidth=g.getLineWidth(),e.strokeStyle=g.getLineColor(),e.stroke());for(var c,S,d=t.getPoints(),E=0;E<d.length;E++){var f=d[E],p=a-l+f[0]*i[0],h=s-u+f[1]*i[1],m=f[3],A=f[4],_=[f[5],f[6]];if(m==EJSS_DRAWING2D.Trace.ELLIPSE)!function(t,r,n,i){var o=t,a=r,s=Math.abs(n[0]),l=Math.abs(n[1]),u=o-s/2,g=a-l/2;ox=s/2*.5522848,oy=l/2*.5522848,xe=u+s,ye=g+l,e.beginPath(),e.moveTo(u,a),e.bezierCurveTo(u,a-oy,o-ox,g,o,g),e.bezierCurveTo(o+ox,g,xe,a-oy,xe,a),
e.bezierCurveTo(xe,a+oy,o+ox,ye,o,ye),e.bezierCurveTo(o-ox,ye,u,a+oy,u,a),i.getDrawFill()&&"none"!=i.getFillColor()&&(e.fillStyle=i.getFillColor(),e.fill()),i.getDrawLines()&&(e.lineWidth=i.getLineWidth(),e.strokeStyle=i.getLineColor(),e.stroke())}(p,h,_,A);else if(m==EJSS_DRAWING2D.Trace.RECTANGLE)r(p,h,_,A);else if(m==EJSS_DRAWING2D.Trace.BAR){var I=t.getGroupPanel()._26([0,0])[1];_[1]=I-h,h+=_[1]/2,r(p,h,_,A)}else if(m==EJSS_DRAWING2D.Trace.AREA){if(0!=E){var I=t.getGroupPanel()._26([0,0])[1],D=a-l+c*i[0],P=s-u+S*i[1];!function(t,r,n,i,o,a){e.beginPath(),e.moveTo(t,o),e.lineTo(t,r),e.lineTo(n,i),e.lineTo(n,o),a.getDrawFill()&&"none"!=a.getFillColor()&&(e.fillStyle=a.getFillColor(),e.fill()),a.getDrawLines()&&(e.lineWidth=a.getLineWidth(),e.strokeStyle=a.getLineColor(),e.stroke())}(mMark,D,P,p,h,I)}c=f[0],S=f[1]}}};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.trail=function(e,t){function r(t,r,n,i,o,a,s){if(!(r<=0)){e.beginPath();for(var l=0;l<r;l++){var u=t[l],g=i+u[0]*a,c=o+u[1]*s,S=u[2];0==l||0==S?e.moveTo(g,c):e.lineTo(g,c)}n.getDrawLines()&&(e.lineWidth=n.getLineWidth(),e.strokeStyle=n.getLineColor(),e.stroke())}}var n=t.getPixelPosition(),i=t.getPixelSizes(),o=t.getRelativePositionOffset(i),a=n[0]+o[0],s=n[1]+o[1],l=i[0]/2,u=i[1]/2,g=a-l,c=s-u,S=i[0],d=i[1],E=t.getSegmentsCount();if(E>0)for(var f=0;f<E;f++){var p=t.getSegmentPoints(f).length;r(t.getSegmentPoints(f),p,t.getSegmentStyle(f),g,c,S,d)}var p=t.getCurrentPoints().length;r(t.getCurrentPoints(),p,t.getStyle(),g,c,S,d)};var EJSS_CANVASGRAPHICS=EJSS_CANVASGRAPHICS||{};EJSS_CANVASGRAPHICS.wheel=function(e,t){var r=t.getPixelPosition(),n=t.getPixelSizes(),i=t.getRelativePositionOffset(n),o=r[0]+i[0],a=r[1]+i[1],s=Math.abs(n[0]),l=Math.abs(n[1]),u=n[0]/2,g=n[1]/2,c=o-s/2,S=a-l/2;ox=s/2*.5522848,oy=l/2*.5522848,xe=c+s,ye=S+l,e.beginPath(),e.moveTo(c,a),e.bezierCurveTo(c,a-oy,o-ox,S,o,S),e.bezierCurveTo(o+ox,S,xe,a-oy,xe,a),e.bezierCurveTo(xe,a+oy,o+ox,ye,o,ye),e.bezierCurveTo(o-ox,ye,c,a+oy,c,a),e.moveTo(o-u,a),e.lineTo(o+u,a),e.moveTo(o,a-g),e.lineTo(o,a+g);var d=t.getStyle();d.getDrawFill()&&"none"!=d.getFillColor()&&(e.fillStyle=d.getFillColor(),e.fill()),d.getDrawLines()&&(e.lineWidth=d.getLineWidth(),e.strokeStyle=d.getLineColor(),e.stroke())};var EJSS_GRAPHICS=EJSS_GRAPHICS||{};EJSS_GRAPHICS.CanvasGraphics={getOffsetRect:function(e){return EJSS_GRAPHICS.GraphicsUtils.getOffsetRect(e)}},EJSS_GRAPHICS.canvasGraphics=function(e){var t=EJSS_INTERFACE.canvas(e),r=t.getDOMElement(),n=t.getContext();return t.getEventContext=function(){return r},t.getBox=function(){var e=EJSS_GRAPHICS.CanvasGraphics.getOffsetRect(t);return e.width-=1,e.height-=1,e},t.reset=function(){var e=EJSS_GRAPHICS.CanvasGraphics.getOffsetRect(t);n.clearRect(0,0,e.width,e.height)},t.draw=function(e,r){for(var n=0,i=e.length;n<i;n++){var o=e[n];o.isGroupVisible()&&t.drawElement(o,t.transformElement)}},t.drawElement=function(e,t){var r=EJSS_DRAWING2D.Shape,i=e._23();if("ElementImage"===i)EJSS_CANVASGRAPHICS.image(n,e,t);else{switch(n.save(),t(e),i){case"ElementCustom":var o=e.getFunction();o&&o(n,e);break;case"ElementShape":switch(e.getShapeType()){default:case r.ELLIPSE:EJSS_CANVASGRAPHICS.ellipse(n,e);break;case r.RECTANGLE:EJSS_CANVASGRAPHICS.rectangle(n,e);break;case r.ROUND_RECTANGLE:EJSS_CANVASGRAPHICS.roundRectangle(n,e);break;case r.WHEEL:EJSS_CANVASGRAPHICS.wheel(n,e);break;case r.NONE:case r.POINT:EJSS_CANVASGRAPHICS.point(n,e)}break;case"ElementSegment":EJSS_CANVASGRAPHICS.segment(n,e);break;case"ElementArrow":EJSS_CANVASGRAPHICS.arrow(n,e);break;case"ElementText":EJSS_CANVASGRAPHICS.text(n,e);break;case"ElementSpring":EJSS_CANVASGRAPHICS.spring(n,e);break;case"ElementTrail":EJSS_CANVASGRAPHICS.trail(n,e);break;case"ElementTrace":EJSS_CANVASGRAPHICS.trace(n,e);break;case"ElementGrid":EJSS_CANVASGRAPHICS.grid(n,e);break;case"ElementAxis":EJSS_CANVASGRAPHICS.axis(n,e);break;case"ElementCursor":EJSS_CANVASGRAPHICS.cursor(n,e);break;case"ElementPolygon":EJSS_CANVASGRAPHICS.polygon(n,e);break;case"ElementAnalyticCurve":EJSS_CANVASGRAPHICS.analyticCurve(n,e);break;case"ElementCellLattice":EJSS_CANVASGRAPHICS.cellLattice(n,e);break;case"ElementByteRaster":EJSS_CANVASGRAPHICS.byteRaster(n,e);break;case"ElementMesh":EJSS_CANVASGRAPHICS.mesh(n,e);break;case"ElementTank":EJSS_CANVASGRAPHICS.tank(n,e);break;case"ElementPipe":EJSS_CANVASGRAPHICS.pipe(n,e);break;case"ElementHistogram":EJSS_CANVASGRAPHICS.histogram(n,e);break;case"ElementScalarField":EJSS_CANVASGRAPHICS.scalarField(n,e);break;case"ElementCanvas":EJSS_CANVASGRAPHICS.canvas(n,e);break;case"ElementVideo":Console.log("Not supported ElementVideo in Canvas!")}n.restore()}},t.transformElement=function(e){null!=e.getGroup()&&t.transformElement(e.getGroup());var r=e.getTransformation();if(Array.isArray(r))console.log("Array transformations are not supported in Canvas!");else if("string"==typeof r)console.log("SVG-based transformations are not supported in Canvas!");else if("number"==typeof r){var i=e.getPixelPosition();n.translate(i[0],i[1]),n.rotate(-r),n.translate(-i[0],-i[1])}},t._24=function(e){if(e.getGutters().visible){var r=e.getInnerRect(),i=.5,o=.5,a=t.getBox(),s=a.width,l=a.height,u=e.getGuttersStyle(),g=e.getStyle();u.getDrawFill()&&(n.beginPath(),n.moveTo(i,o),n.lineTo(i,o+l),n.lineTo(i+s,o+l),n.lineTo(i+s,o),n.lineTo(i,o),n.moveTo(r.x,r.y),n.lineTo(r.x+r.width,r.y),n.lineTo(r.x+r.width,r.y+r.height),n.lineTo(r.x,r.y+r.height),n.lineTo(r.x,r.y),n.moveTo(i,o),n.closePath(),n.fillStyle=u.getFillColor(),n.fill()),u.getDrawLines()&&(n.beginPath(),n.moveTo(i,o),n.lineTo(i,o+l),n.lineTo(i+s,o+l),n.lineTo(i+s,o),n.lineTo(i,o),n.closePath(),n.lineWidth=u.getLineWidth(),n.strokeStyle=u.getLineColor(),n.stroke()),u.getDrawLines()&&(n.beginPath(),n.moveTo(r.x,r.y),n.lineTo(r.x+r.width,r.y),n.lineTo(r.x+r.width,r.y+r.height),n.lineTo(r.x,r.y+r.height),n.lineTo(r.x,r.y),n.closePath(),n.lineWidth=g.getLineWidth(),n.strokeStyle=g.getLineColor(),n.stroke())}},t.drawPanel=function(e){var r=t.getBox();n.beginPath(),n.rect(.5,.5,r.width,r.height);var i=e.getStyle();n.fillStyle=i.getFillColor(),n.fill(),i.getDrawLines()&&(n.lineWidth=i.getLineWidth(),n.strokeStyle=i.getLineColor(),n.stroke())},t};var EJSS_GRAPHICS=EJSS_GRAPHICS||{};EJSS_GRAPHICS.GraphicsUtils={getOffsetRect:function(e){var t,r,n,i,o=e.getDOMElement(),a=e.getWidth(),s=e.getHeight();t=parseFloat(a);var l=!isNaN(t)&&isFinite(a);r=parseFloat(s);var u=!isNaN(r)&&isFinite(s);if(o.getBoundingClientRect){var g=o.getElementById?o.getElementById(".myPanel"):null;if(g&&g.childElementCount>0)var c=g.getBoundingClientRect();else var c=o.getBoundingClientRect();n=c.top,i=c.left,l||(t=c.width),u||(r=c.height)}else if(void 0!==o.offsetTop)n=o.offsetTop,i=o.offsetLeft,l||(t=o.offsetWidth),u||(r=o.offsetHeight);else{for(var S=o.parentNode||document.getElementById(o.id).parentNode;S&&!S.offsetTop&&S&&!S.previousElementSibling&&!S.nextElementSibling;)S=S.parentNode;n=S.offsetTop,i=S.offsetLeft,l||(t=S.offsetWidth),u||(r=S.offsetHeight)}var d=document.body,E=document.documentElement,f=E.clientTop||d.clientTop||0,p=E.clientLeft||d.clientLeft||0;return n-=f,i-=p,{top:n,left:i,width:t,height:r,bottom:n+r,right:i+t}},drawSpring:function(e,t,r,n,i,o,a,s,l,u,g){var c=e*t,S=2*Math.PI/t;r<0&&(S*=-1);for(var d=t/2,E=[s,l,0],f=EJSS_TOOLS.Mathematics.normalTo(E),p=EJSS_TOOLS.Mathematics.normalize(EJSS_TOOLS.Mathematics.crossProduct(E,f)),h=0;h<=c;h++){var m;m=i?h<d?0:h<t?h-d:h>c-d?0:h>c-t?c-h-d:d:d;var A=Math.PI/2+h*S,_=Math.cos(A),I=Math.sin(A),D=o+h*s/c+m*r*(_*f[0]+I*p[0])/d,P=a+h*l/c+m*r*(_*f[1]+I*p[1])/d;if(0!=n){var T=m*Math.cos(2*h*Math.PI/t)/d;D+=n*T*s,P+=n*T*l}0==h?u(D,P):g(D,P)}},drawDecTicks:function(e,t,r,n,i,o,a,s,l,u){var g=EJSS_SVGGRAPHICS.Utils,c=e-r,S=e+r,d=t+n,E=t-n,f=g.crispValue(S),p=g.crispValue(E);if(s==EJSS_DRAWING2D.Axis.AXIS_VERTICAL)for(var h=p-a;h>=d-.5;h-=o)u(e,h,i,s);else for(var h=c+a;h<=f+.5;h+=o)u(h,t,i,s)},drawDecTicksText:function(e,t,r,n,i,o,a,s,l,u,g,c,S,d,E,f){var p=EJSS_SVGGRAPHICS.Utils,h=e-r,m=e+r,A=t+n,_=t-n,I=p.crispValue(m),D=p.crispValue(_);if(d==EJSS_DRAWING2D.Axis.AXIS_VERTICAL)for(var P=0,T=D-a;T>=A-.5;T-=o,P++){if(E)var C=s[1]-g-u*P;else var C=s[0]+g+u*P;var N=parseFloat(C.toFixed(l)).toFixed(l);if(S==EJSS_DRAWING2D.Axis.TICKS_DOWN){var y=i/2;f(mGroup,e+y,T,N,c,!1)}else{var y=N.length*Math.floor(c.getFontSize()/2);y+=N.length*c.getNumberLetterSpacing(),y+=Math.floor(i/2),f(e-y,T,N,c,!1)}}else for(var P=0,T=h+a;T<=I+.5;T+=o,P++){var C=s[0]+g+u*P,N=parseFloat(C.toFixed(l)).toFixed(l);if(S==EJSS_DRAWING2D.Axis.TICKS_DOWN){var v=Math.floor(i/2)+2;f(T,t-i,N,c,!0)}else{var v=c.getFontSize()+Math.floor(i/2);f(T,t+v,N,c,!0)}}},drawLogTicks:function(e,t,r,n,i,o,a,s,l,u){var g=EJSS_SVGGRAPHICS.Utils,c=e-r,S=t-n,d=g.crispValue(S);if(l==EJSS_DRAWING2D.Axis.AXIS_VERTICAL)for(var E=Math.log(a[0])/Math.log(10),f=Math.log(a[1])/Math.log(10),p=f-E,h=Math.ceil(p),m=i/p,A=0;A<=h;A++)for(var _=Math.pow(10,A+E),I=Math.pow(10,A+E+1),D=I/s,P=0;P<s-1;P++){var T=_+P*D;if(0!=T&&T>=a[0]&&T<=a[1]){var C=Math.log(T)/Math.log(10),N=d-(C-E)*m;u(e,N,o,l)}}else for(var E=Math.log(a[0])/Math.log(10),f=Math.log(a[1])/Math.log(10),p=f-E,h=Math.ceil(p),m=i/p,A=0;A<=h;A++)for(var _=Math.pow(10,A+E),I=Math.pow(10,A+E+1),D=I/s,P=0;P<s-1;P++){var T=_+P*D;if(0!=T&&T>=a[0]&&T<=a[1]){var C=Math.log(T)/Math.log(10),N=c+(C-E)*m;u(N,t,o,l)}}},drawLogTicksText:function(e,t,r,n,i,o,a,s,l,u,g,c){var S=EJSS_SVGGRAPHICS.Utils,d=e-r,E=t-n,f=S.crispValue(E);if(g==EJSS_DRAWING2D.Axis.AXIS_VERTICAL)for(var p=Math.log(a[0])/Math.log(10),h=Math.log(a[1])/Math.log(10),m=h-p,A=Math.ceil(m),_=segsize/m,I=0;I<=A;I++)for(var D=Math.pow(10,I+p),P=Math.pow(10,I+p+1),T=P/i,C=0;C<i-1;C++){var N=D+C*T;if(0!=N&&N>=a[0]&&N<=a[1]){var y=Math.log(N)/Math.log(10),v=f-(y-p)*_;if(0==C)var R=N.toExponential(s);else var R=parseFloat((N/D).toFixed(s)).toFixed(s);if(u==EJSS_DRAWING2D.Axis.TICKS_DOWN){var O=o/2;c(e+O,v,R,l,!1)}else{var O=R.length*Math.floor(l.getFontSize()/2);O+=R.length*l.getNumberLetterSpacing(),O+=Math.floor(o/2),c(e-O,v,R,l,!1)}}}else for(var p=Math.log(a[0])/Math.log(10),h=Math.log(a[1])/Math.log(10),m=h-p,A=Math.ceil(m),_=segsize/m,I=0;I<=A;I++)for(var D=Math.pow(10,I+p),P=Math.pow(10,I+p+1),T=P/i,C=0;C<i-1;C++){var N=D+C*T;if(0!=N&&N>=a[0]&&N<=a[1]){var y=Math.log(N)/Math.log(10),v=d+(y-p)*_;if(0==C)var R=N.toExponential(s);else var R=parseFloat((N/D).toFixed(s)).toFixed(s);if(u==EJSS_DRAWING2D.Axis.TICKS_DOWN){var M=Math.floor(o/2)+2;c(v,t-o,R,l,!0)}else{var M=l.getFontSize()+Math.floor(o/2);c(v,t+M,R,l,!0)}}}},drawDecGrid:function(e,t,r,n,i,o,a,s,l){var u=EJSS_SVGGRAPHICS.Utils,g=u.crispValue(e),c=u.crispValue(r),S=u.crispValue(t),d=u.crispValue(n);if(-1==a){0==o&&(o=Math.abs(S-d));for(var E=d-i;E>=t-.5;E-=o)s(e,E),l(r,E)}else{0==o&&(o=Math.abs(c-g));for(var E=e+i;E<=c+.5;E+=o)s(E,t),l(E,n)}},drawLogGrid:function(e,t,r,n,i,o,a,s,l){var u=EJSS_SVGGRAPHICS.Utils,g=u.crispValue(e),c=u.crispValue(r),S=u.crispValue(t),d=u.crispValue(n),E=Math.log(o[0])/Math.log(10),f=Math.log(o[1])/Math.log(10),p=f-E,h=Math.ceil(p);if(-1==a)var m=(d-S)/p;else var m=(c-g)/p;for(var A=0;A<=h;A++)for(var _=Math.pow(10,A+E),I=Math.pow(10,A+E+1),D=I/i,P=0;P<i-1;P++){var T=_+P*D;if(0!=T&&T>=o[0]&&T<=o[1]){var C=Math.log(T)/Math.log(10);if(-1==a){var N=d-(C-E)*m;s(g,N),l(c,N)}else{var N=g+(C-E)*m;s(N,S),l(N,d)}}}return""},buildCells:function(e,t,r,n,i){var o,a,s,l;if(null!=r&&r.length>0){var u=r.length;o=new Array(u),a=new Array(u),s=new Array(u),l=new Array(u);var g=1;null!=n&&(g=i?n[0][0].length:n[0].length);for(var c=0;c<u;c++){var S=r[c],d=S.length;o[c]=new Array(d),a[c]=new Array(d);for(var E=0;E<d;E++){var f=S[E];o[c][E]=e[f],a[c][E]=t[f]}if(null!=n)if(s[c]=new Array(d),l[c]=new Array(d),i)for(var p=n[c],E=0;E<d;E++){s[c][E]=g<=1?p[E][0]:EJSS_TOOLS.Mathematics.norm(p[E]),l[c][E]=new Array(g);for(var h=0;h<g;h++)l[c][E][h]=p[E][h]}else for(var E=0;E<d;E++){var f=S[E];s[c][E]=g<=1?n[f][0]:EJSS_TOOLS.Mathematics.norm(n[f]),l[c][E]=new Array(g);for(var h=0;h<g;h++)l[c][E][h]=n[f][h]}}}return{cellA:o,cellB:a,cellZ:s,cellVector:l}},drawPolygons:function(e,t,r,n){for(var i=e.cellA,o=e.cellB,a=e.cellZ,s=0,l=i.length;s<l;s++){var u=i[s],g=o[s],c=a[s];if(void 0!==c){for(var S=u.length,d=new Array(S),E=Number.MAX_VALUE,f=Number.MIN_VALUE,p=0;p<S;p++){var h=t.doubleToIndex(c[p]);E=Math.min(h,E),f=Math.max(h,f),d[p]=h}for(var m=t.getColorThresholds(),A=new Array(2*S),_=new Array(2*S),I=E;I<=f;I++){for(var D=0,P=0;P<S;P++){var T=(P+1)%S;if(d[P]<=I&&d[T]>=I){if(d[P]==I)A[D]=u[P],_[D]=g[P],D++;else{var C=(m[I]-c[P])/(c[T]-c[P]);A[D]=Math.round(u[P]+C*(u[T]-u[P])),_[D]=Math.round(g[P]+C*(g[T]-g[P])),D++}if(d[T]>I){var C=(m[I+1]-c[P])/(c[T]-c[P]);A[D]=Math.round(u[P]+C*(u[T]-u[P])),_[D]=Math.round(g[P]+C*(g[T]-g[P])),D++}}else if(d[P]>=I&&d[T]<=I){if(d[P]==I)A[D]=u[P],_[D]=g[P],D++;else{var C=(m[I+1]-c[P])/(c[T]-c[P]);A[D]=Math.round(u[P]+C*(u[T]-u[P])),_[D]=Math.round(g[P]+C*(g[T]-g[P])),D++}if(d[T]<I){var C=(m[I]-c[P])/(c[T]-c[P]);A[D]=Math.round(u[P]+C*(u[T]-u[P])),_[D]=Math.round(g[P]+C*(g[T]-g[P])),D++}}}D>0&&n(A,_,D,t,I)}}r(u,g)}},buildBoundary:function(e,t,r){var n,i;if(null!=r&&r.length>0){var o=r.length;n=new Array(o),i=new Array(o);for(var a=0;a<o;a++){var s=r[a],l=s.length;n[a]=new Array(l),i[a]=new Array(l);for(var u=0;u<l;u++){var g=s[u];n[a][u]=e[g],i[a][u]=t[g]}}}return{boundaryA:n,boundaryB:i}},drawBoundary:function(e,t,r,n){for(var i=e.boundaryA,o=e.boundaryB,a="black",s=0,l=i.length;s<l;s++){if(null!=t){var u=t[s];null!=r&&u<r.length&&(a=r[u])}n(i[s],o[s],a)}},drawImageField:function(e,t,r,n,i,o,a,s,l,u){for(var g=Math.round(function(e){return t+(e-n)*s}(u.xMin)),c=Math.round(function(e){return r-(e-i)*l}(u.yMax)),S=Math.round(o),d=Math.round(a),E=e.getImageData(g,c,S,d),f=this.maskRadius*s,p=0,h=0,m=0,A=0;A<S;A++)for(var _=Math.floor(A*u.nx/S),I=0;I<d;I++){var D=Math.floor(I*u.ny/d);h=0,u.data[_][D]<u.lower?(m=255,p=0):u.data[_][D]<u.center?(m=255*(u.center-u.data[_][D])/(u.center-u.lower),p=0):u.data[_][D]<u.upper?(m=0,p=255*(u.data[_][D]-u.center)/(u.upper-u.center)):(m=0,p=255),u.maskRadius>0&&Math.sqrt((A-S/2)*(A-S/2)+(I-d/2)*(I-d/2))>f&&(p=h=224,m=255);var P=4*A+4*S*I;E.data[P+0]=p,E.data[P+1]=h,E.data[P+2]=m}e.putImageData(E,g,c)}};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.analyticCurve=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.arrow=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.axis=function(e,t){function r(e,t,r,n,i,a){if(a==EJSS_DRAWING2D.Axis.AXIS_VERTICAL){var s=document.createElementNS("http://www.w3.org/2000/svg","path");e.appendChild(s),"crispEdges"==i.getShapeRendering()?s.setAttribute("d","M "+o.crispValue(t-n/2)+" "+o.crispValue(r)+" L "+o.crispValue(t+n/2)+" "+o.crispValue(r)):s.setAttribute("d","M "+(t-n/2)+" "+r+" L "+(t+n/2)+" "+r)}else{var s=document.createElementNS("http://www.w3.org/2000/svg","path");e.appendChild(s),"crispEdges"==i.getShapeRendering()?s.setAttribute("d","M "+o.crispValue(t)+" "+o.crispValue(r-n/2)+" L "+o.crispValue(t)+" "+o.crispValue(r+n/2)):s.setAttribute("d","M "+t+" "+(r-n/2)+" L "+t+" "+(r+n/2))}}function n(e,t,r,n,i,o){var a=document.createElementNS("http://www.w3.org/2000/svg","g");e.appendChild(a);var s=document.createElementNS("http://www.w3.org/2000/svg","text");a.appendChild(s),s.setAttribute("font-family",i.getFontFamily()),s.setAttribute("font-size",i.getFontSizeString()),s.setAttribute("fill",i.getFillColor()),s.setAttribute("stroke",i.getOutlineColor()),s.setAttribute("stroke-width",i.getFontWeight()),s.setAttribute("letterSpacing",i.getLetterSpacing()),s.textContent=n,o?t-=s.getComputedTextLength()/2+.5:r+=i.getFontSize()/2,s.setAttribute("x",t),s.setAttribute("y",r)}var i,o=EJSS_SVGGRAPHICS.Utils,a=t.getGroup();i=null!==a?e.getElementById(a.getName()):e;var s=e.getElementById(t.getName());if(null!==s&&i.removeChild(s),t.getShow()){s=document.createElementNS("http://www.w3.org/2000/svg","g"),s.setAttribute("id",t.getName()),i.appendChild(s);var l=t.getPixelPosition(),u=t.getPixelSizes(),g=t.getRelativePositionOffset(u),c=l[0]+g[0],S=l[1]+g[1],d=u[0]/2,E=u[1]/2,f=t.getStyle(),p=t.getOrient(),h=t.getInvertedScaleY();!function(e,t,r,n,i,a,s,l){var u=document.createElementNS("http://www.w3.org/2000/svg","path");e.appendChild(u),s==EJSS_DRAWING2D.Axis.AXIS_VERTICAL?(l&&(i=-i,r=-r),"crispEdges"==a.getShapeRendering()?u.setAttribute("d","M "+o.crispValue(t)+" "+o.crispValue(r-.5-i)+" L "+o.crispValue(t)+" "+o.crispValue(r-.5+i)):u.setAttribute("d","M "+t+" "+(r-i)+" L "+t+" "+(r+i))):"crispEdges"==a.getShapeRendering()?u.setAttribute("d","M "+o.crispValue(t+.5-n)+" "+o.crispValue(r)+" L "+o.crispValue(t+.5+n)+" "+o.crispValue(r)):u.setAttribute("d","M "+(t-n)+" "+r+" L "+(t+n)+" "+r)}(s,c,S,d,E,f,p,h);var m=p==EJSS_DRAWING2D.Axis.AXIS_VERTICAL?Math.abs(u[1]):Math.abs(u[0]),A=t.getTicksMode();if(A==EJSS_DRAWING2D.Axis.SCALE_LOG){var _=t.getScale();if(_[0]>0&&_[1]>0){var I=t.getTicks(),D=t.getScalePrecision(),P=t.getTicksSize();EJSS_GRAPHICS.GraphicsUtils.drawLogTicks(c,S,d,E,m,P,_,I,p,function(e,t,n,i){r(s,e,t,n,f,i)});var T=t.getFont(),C=t.getTextPosition();EJSS_GRAPHICS.GraphicsUtils.drawLogTicksText(c,S,d,E,I,P,_,D,T,C,p,function(e,t,r,i,o){n(s,e,t,r,i,o)})}}else if(A==EJSS_DRAWING2D.Axis.SCALE_NUM){var N=0,y=0;if(t.getAutoTicks())for(var v=t.getAutoStepMin(),R=t.getAutoTicksRange(),O=R.length-1;O>=0&&!(1.001*(N=Math.abs(m/R[O]))>=v);O--);else{var I=t.getTicks();0!=I?N=m/I:(N=t.getStep(),y=t.getTickStep())}var D=t.getScalePrecision(),_=t.getScale();if(0==y)var M=Math.abs((_[1]-_[0])*N/m);else{var M=y;N=Math.abs(M*m/(_[1]-_[0]))}var b=Math.pow(10,D),G=Math.round(M*b)/b;G>0&&(M=G,N=Math.abs(G*m/(_[1]-_[0])));var L=t.getFixedTick(),x=_[1];isNaN(L)||(x=L<_[0]?L+(Math.floor((_[0]-L)/M)+1)*M:L>_[1]?L-(Math.floor((L-_[1])/M)+1)*M:L);var J=Math.abs((_[0]-x)%M),w=Math.abs(J-M);(J<.001||w<.001)&&(J=0);var k=m*J/Math.abs(_[1]-_[0]),P=t.getTicksSize();EJSS_GRAPHICS.GraphicsUtils.drawDecTicks(c,S,d,E,P,N,k,p,h,function(e,t,n,i){r(s,e,t,n,f,i)});var T=t.getFont(),C=t.getTextPosition();EJSS_GRAPHICS.GraphicsUtils.drawDecTicksText(c,S,d,E,P,N,k,_,D,M,J,T,C,p,h,function(e,t,r,i,o){n(s,e,t,r,i,o)})}f.getDrawFill()?s.setAttribute("fill",f.getFillColor()):s.setAttribute("fill","none"),f.getDrawLines()?(s.setAttribute("stroke",f.getLineColor()),s.setAttribute("stroke-width",f.getLineWidth())):(s.setAttribute("stroke","none"),s.setAttribute("stroke-width",0)),s.setAttribute("shapeRendering",f.getShapeRendering());var W=f.getAttributes();for(var F in W)s.setAttribute(F,W[F])}return s};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.byteRaster=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.canvas=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i,o=e.getElementById(t.getName());null===o?(o=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),o.setAttribute("id",t.getName()),r.appendChild(o),i=document.createElement("canvas"),i.setAttribute("id",t.getName()+".canvas"),o.appendChild(i)):i=document.getElementById(t.getName()+".canvas");var a=t.getPixelPosition(),s=t.getPixelSizes(),l=t.getRelativePositionOffset(s),u=a[0]+l[0],g=a[1]+l[1];i.width=Math.abs(s[0]),i.height=Math.abs(s[1]),o.width=Math.abs(s[0]),o.height=Math.abs(s[1]);var c=Math.abs(s[0]/2),S=Math.abs(s[1]/2);o.setAttribute("x",u-c),o.setAttribute("y",g-S);var d=t.getDimensions(),E=d[1]-d[0],f=d[3]-d[2],p=Math.abs(s[0]),h=Math.abs(s[1]),m=p/E,A=h/f,_=u-p/2,I=g+h/2,D=t.getDrawables(),P=i.getContext("2d");P.fillRect(0,0,i.width-.5,i.height-.5);for(var T=0;T<D.length;T++)void 0!==D[T].imageField?EJSS_GRAPHICS.GraphicsUtils.drawImageField(P,_,I,xMin,yMin,p,h,m,A,D[T]):void 0!==D[T].run&&D[T].draw(P,_,I,xMin,yMin,p,h,m,A);var C=t.getStyle().getAttributes();for(var N in C)o.setAttribute(N,C[N]);return o};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.cellLattice=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.cursor=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.ellipse=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i=e.getElementById(t.getName());null===i&&(i=document.createElementNS("http://www.w3.org/2000/svg","ellipse"),i.setAttribute("id",t.getName()),r.appendChild(i));var o=t.getPixelPosition(),a=t.getPixelSizes(),s=t.getRelativePositionOffset(a),l=o[0]+s[0],u=o[1]+s[1],g=Math.abs(a[0]/2),c=Math.abs(a[1]/2);i.setAttribute("cx",l),i.setAttribute("cy",u),i.setAttribute("rx",g),i.setAttribute("ry",c);var S=t.getStyle();S.getDrawFill()?i.setAttribute("fill",S.getFillColor()):i.setAttribute("fill","none"),S.getDrawLines()?(i.setAttribute("stroke",S.getLineColor()),i.setAttribute("stroke-width",S.getLineWidth())):(i.setAttribute("stroke","none"),i.setAttribute("stroke-width",0)),i.setAttribute("shapeRendering",S.getShapeRendering());var d=S.getAttributes();for(var E in d)i.setAttribute(E,d[E]);return i};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.grid=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i=e.getElementById(t.getName());null!==i&&r.removeChild(i),i=document.createElementNS("http://www.w3.org/2000/svg","g"),i.setAttribute("id",t.getName()),r.appendChild(i);var o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("id",t.getName()+"X"),i.appendChild(o);var a=document.createElementNS("http://www.w3.org/2000/svg","path");a.setAttribute("id",t.getName()+"Y"),i.appendChild(a);var s=t.getPixelPosition(),l=t.getPixelSizes(),u=t.getRelativePositionOffset(l),g=s[0]+u[0],c=s[1]+u[1],S=l[0]/2,d=l[1]/2,E=t.getShowX(),f=t.getShowY(),p="",h="";if(E){var m=t.getTicksXMode();if(m==EJSS_DRAWING2D.Grid.SCALE_LOG){var A=t.getScaleX();if(A[0]>0&&A[1]>0){var _=t.getTicksX(),I=g-S,D=g+S,P=c+d,T=c-d;EJSS_GRAPHICS.GraphicsUtils.drawLogGrid(I,P,D,T,_,A,1,function(e,t){p+=" M "+e+" "+t},function(e,t){p+=" L "+e+" "+t})}}else if(m==EJSS_DRAWING2D.Grid.SCALE_NUM){var C=0,N=0;if(t.getAutoTicksX())for(var y=t.getAutoStepXMin(),v=t.getAutoTicksRangeX(),R=v.length-1;R>=0&&!((C=Math.abs(l[0]/v[R]))>=y);R--);else{var _=t.getTicksX();0!=_?C=Math.abs(l[0]/_):(C=t.getStepX(),N=t.getTickStepX())}var O=t.getScalePrecisionX(),A=t.getScaleX();if(0==N)var M=Math.abs((A[1]-A[0])*C/l[0]);else{var M=N;C=Math.abs(M*l[0]/(A[1]-A[0]))}var b=Math.pow(10,O),G=Math.round(M*b)/b;G>0&&(M=G,C=Math.abs(G*l[0]/(A[1]-A[0])));var L=t.getFixedTickX(),x=A[1];isNaN(L)||(x=L<A[0]?L+(Math.floor((A[0]-L)/M)+1)*M:L>A[1]?L-(Math.floor((L-A[1])/M)+1)*M:L);var J=Math.abs((A[0]-x)%M),w=Math.abs(J-M);(J<.001||w<.001)&&(J=0);var k=Math.abs(l[0]*J/(A[1]-A[0])),I=g-S,D=g+S,P=c+d,T=c-d;EJSS_GRAPHICS.GraphicsUtils.drawDecGrid(I,P,D,T,k,C,1,function(e,t){p+=" M "+e+" "+t},function(e,t){p+=" L "+e+" "+t})}}if(f){var W=t.getTicksYMode();if(W==EJSS_DRAWING2D.Grid.SCALE_LOG){var F=t.getScaleY();if(F[0]>0&&F[1]>0){var V=t.getTicksY(),I=g-S,D=g+S,P=c+d,T=c-d;EJSS_GRAPHICS.GraphicsUtils.drawLogGrid(I,P,D,T,V,F,-1,function(e,t){h+=" M "+e+" "+t},function(e,t){h+=" L "+e+" "+t})}}else if(W==EJSS_DRAWING2D.Grid.SCALE_NUM){var U=0,Y=0;if(t.getAutoTicksY())for(var B=t.getAutoStepYMin(),z=t.getAutoTicksRangeY(),R=z.length-1;R>=0&&!((U=Math.abs(l[1]/z[R]))>=B);R--);else{var V=t.getTicksY();0!=V?U=Math.abs(l[1]/V):(U=t.getStepY(),Y=t.getTickStepY())}var H=t.getScalePrecisionY(),F=t.getScaleY();if(0==Y)var X=Math.abs((F[1]-F[0])*U/l[1]);else{var X=Y;U=Math.abs(X*l[1]/(F[1]-F[0]))}var Z=Math.pow(10,H),j=Math.round(X*Z)/Z;j>0&&(X=j,U=Math.abs(j*l[1]/(F[1]-F[0])));var L=t.getFixedTickY(),x=F[1];isNaN(L)||(x=L<F[0]?L+(Math.floor((F[0]-L)/X)+1)*X:L>F[1]?L-(Math.floor((L-F[1])/X)+1)*X:L);var J=Math.abs((F[0]-x)%X),w=Math.abs(J-X);(J<.001||w<.001)&&(J=0);var K=Math.abs(l[1]*J/(F[1]-F[0])),I=g-S,D=g+S,P=c+d,T=c-d;EJSS_GRAPHICS.GraphicsUtils.drawDecGrid(I,P,D,T,K,U,-1,function(e,t){h+=" M "+e+" "+t},function(e,t){h+=" L "+e+" "+t})}}p.length>0&&(o.setAttribute("d",p),o.setAttribute("shapeRendering",t.getShapeRenderingX()),o.setAttribute("stroke",t.getLineColorX()),o.setAttribute("stroke-width",t.getLineWidthX())),h.length>0&&(a.setAttribute("d",h),a.setAttribute("shapeRendering",t.getShapeRenderingY()),a.setAttribute("stroke",t.getLineColorY()),a.setAttribute("stroke-width",t.getLineWidthY()));var q=t.getStyle().getAttributes();for(var Q in q)o.setAttribute(Q,q[Q]),a.setAttribute(Q,q[Q]);return i};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.group=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i=e.getElementById(t.getName());return null===i&&(i=document.createElementNS("http://www.w3.org/2000/svg","g"),i.setAttribute("id",t.getName()),r.appendChild(i)),i};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.histogram=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.image=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.mesh=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.pipe=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.point=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i=e.getElementById(t.getName());null===i&&(i=document.createElementNS("http://www.w3.org/2000/svg","ellipse"),i.setAttribute("id",t.getName()),r.appendChild(i));var o=t.getPixelPosition(),a=t.getPixelSizes(),s=t.getRelativePositionOffset(a),l=o[0]+s[0],u=o[1]+s[1];i.setAttribute("cx",l),i.setAttribute("cy",u),i.setAttribute("rx",2),i.setAttribute("ry",2);var g=t.getStyle();i.setAttribute("fill",g.getFillColor());var c=g.getAttributes();for(var S in c)i.setAttribute(S,c[S]);return i};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.polygon=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i=e.getElementById(t.getName());null===i&&(i=document.createElementNS("http://www.w3.org/2000/svg","path"),i.setAttribute("id",t.getName()),r.appendChild(i));for(var o=t.getPixelPosition(),a=t.getPixelSizes(),s=t.getRelativePositionOffset(a),l=o[0]+s[0],u=o[1]+s[1],g=a[0]/2,c=a[1]/2,S=t.getPoints(),d="",E=0;E<S.length;E++){var f=S[E],p=l-g+f[0]*a[0],h=u-c+f[1]*a[1],m=f[2];d+=0==E||0==m?" M "+p+" "+h:" L "+p+" "+h}if(""!==d){i.setAttribute("d",d);var A=t.getStyle();A.getDrawFill()?i.setAttribute("fill",A.getFillColor()):i.setAttribute("fill","none"),A.getDrawLines()?(i.setAttribute("stroke",A.getLineColor()),i.setAttribute("stroke-width",A.getLineWidth())):(i.setAttribute("stroke","none"),i.setAttribute("stroke-width",0)),i.setAttribute("shapeRendering",A.getShapeRendering());var _=A.getAttributes();for(var I in _)i.setAttribute(I,_[I])}return i};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.rectangle=function(e,t){var r,n=EJSS_SVGGRAPHICS.Utils,i=t.getGroup();r=null!==i?e.getElementById(i.getName()):e;var o=e.getElementById(t.getName());null===o&&(o=document.createElementNS("http://www.w3.org/2000/svg","path"),o.setAttribute("id",t.getName()),r.appendChild(o));var a=t.getPixelPosition(),s=t.getPixelSizes(),l=t.getRelativePositionOffset(s),u=a[0]+l[0],g=a[1]+l[1],c=s[0]/2,S=s[1]/2,d=t.getStyle();"crispEdges"==d.getShapeRendering()?o.setAttribute("d","M "+n.crispValue(u-c)+" "+n.crispValue(g+S)+" L "+n.crispValue(u+c)+" "+n.crispValue(g+S)+" L "+n.crispValue(u+c)+" "+n.crispValue(g-S)+" L "+n.crispValue(u-c)+" "+n.crispValue(g-S)+" z"):o.setAttribute("d","M "+(u-c)+" "+(g+S)+" L "+(u+c)+" "+(g+S)+" L "+(u+c)+" "+(g-S)+" L "+(u-c)+" "+(g-S)+" z"),d.getDrawFill()?o.setAttribute("fill",d.getFillColor()):o.setAttribute("fill","none"),d.getDrawLines()?(o.setAttribute("stroke",d.getLineColor()),o.setAttribute("stroke-width",d.getLineWidth())):(o.setAttribute("stroke","none"),o.setAttribute("stroke-width",0)),o.setAttribute("shapeRendering",d.getShapeRendering());var E=d.getAttributes();for(var f in E)o.setAttribute(f,E[f]);return o};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.roundRectangle=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i=e.getElementById(t.getName());null===i&&(i=document.createElementNS("http://www.w3.org/2000/svg","rect"),i.setAttribute("id",t.getName()),r.appendChild(i));var o=t.getPixelPosition(),a=t.getPixelSizes(),s=t.getRelativePositionOffset(a),l=o[0]+s[0],u=o[1]+s[1],g=Math.abs(a[0]/2),c=Math.abs(a[1]/2),S=Math.abs(t.getCornerRadius());i.setAttribute("x",l-g),i.setAttribute("y",u-c),i.setAttribute("width",Math.abs(a[0])),i.setAttribute("height",Math.abs(a[1])),i.setAttribute("rx",S),i.setAttribute("ry",S);var d=t.getStyle();d.getDrawFill()?i.setAttribute("fill",d.getFillColor()):i.setAttribute("fill","none"),d.getDrawLines()?(i.setAttribute("stroke",d.getLineColor()),i.setAttribute("stroke-width",d.getLineWidth())):(i.setAttribute("stroke","none"),i.setAttribute("stroke-width",0)),i.setAttribute("shapeRendering",d.getShapeRendering());var E=d.getAttributes();for(var f in E)i.setAttribute(f,E[f]);return i};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.scalarField=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i,o=e.getElementById(t.getName());null===o?(o=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),o.setAttribute("id",t.getName()),r.appendChild(o),i=document.createElement("scalarField"),i.setAttribute("id",t.getName()+".scalarField"),o.appendChild(i)):i=document.getElementById(t.getName()+".scalarField");var a=t.getPixelPosition(),s=t.getPixelSizes(),l=t.getRelativePositionOffset(s),u=a[0]+l[0],g=a[1]+l[1];i.width=Math.abs(s[0]),i.height=Math.abs(s[1]),o.width=Math.abs(s[0]),o.height=Math.abs(s[1]);var c=Math.abs(s[0]/2),S=Math.abs(s[1]/2);o.setAttribute("x",u-c),o.setAttribute("y",g-S);var d=t.getMaximumX()-t.getMinimumX(),E=t.getMaximumY()-t.getMinimumY(),f=Math.abs(s[0]),p=Math.abs(s[1]),h=f/d,m=p/E,A=u-f/2,_=g+p/2,I=i.getContext("2d");I.fillRect(0,0,i.width-.5,i.height-.5),EJSS_GRAPHICS.GraphicsUtils.drawImageField(I,A,_,t.getMinimumX(),t.getMinimumY(),f,p,h,m,{data:t.getData()});var D=t.getStyle().getAttributes();for(var P in D)o.setAttribute(P,D[P]);return o};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.segment=function(e,t){var r,n=EJSS_SVGGRAPHICS.Utils,i=t.getGroup();r=null!==i?e.getElementById(i.getName()):e;var o=e.getElementById(t.getName());null===o&&(o=document.createElementNS("http://www.w3.org/2000/svg","path"),o.setAttribute("id",t.getName()),r.appendChild(o));var a=t.getPixelPosition(),s=t.getPixelSizes(),l=t.getRelativePositionOffset(s),u=a[0]+l[0],g=a[1]+l[1],c=s[0]/2,S=s[1]/2,d=t.getStyle();"crispEdges"==d.getShapeRendering()?o.setAttribute("d","M "+n.crispValue(u-c)+" "+n.crispValue(g-S)+" L "+n.crispValue(u+c)+" "+n.crispValue(g+S)):o.setAttribute("d","M "+(u-c)+" "+(g-S)+" L "+(u+c)+" "+(g+S)),d.getDrawFill()?o.setAttribute("fill",d.getFillColor()):o.setAttribute("fill","none"),d.getDrawLines()?(o.setAttribute("stroke",d.getLineColor()),o.setAttribute("stroke-width",d.getLineWidth())):(o.setAttribute("stroke","none"),o.setAttribute("stroke-width",0)),o.setAttribute("shapeRendering",d.getShapeRendering());var E=d.getAttributes();for(var f in E)o.setAttribute(f,E[f]);return o};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.spring=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.tank=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.text=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var o,a,s,l=e.getElementById(t.getName());for(null===l?(l=document.createElementNS("http://www.w3.org/2000/svg","g"),l.setAttribute("id",t.getName()),r.appendChild(l),o=document.createElementNS("http://www.w3.org/2000/svg","g"),o.setAttribute("id",t.getName()+".inner"),l.appendChild(o),s=document.createElementNS("http://www.w3.org/2000/svg","path"),s.setAttribute("id",t.getName()+".box"),o.appendChild(s),a=document.createElementNS("http://www.w3.org/2000/svg","text"),a.setAttribute("id",t.getName()+".text"),o.appendChild(a)):(o=e.getElementById(t.getName()+".inner"),a=e.getElementById(t.getName()+".text"),s=e.getElementById(t.getName()+".box"));a.firstChild;)a.removeChild(a.firstChild);var u=t.getFont();a.setAttribute("font-style",u.getFontStyle()),a.setAttribute("font-weight",u.getFontWeight()),a.setAttribute("font-size",u.getFontSizeString()),a.setAttribute("font-family",u.getFontFamily()),a.setAttribute("fill",u.getFillColor()),a.setAttribute("stroke",u.getOutlineColor()),a.setAttribute("stroke-width",u.getOutlineWidth()),a.setAttribute("letterSpacing",u.getLetterSpacing());var g,c,S=t.getText(),d=S.split("\n"),E=t.getDrawingSize();if(-1==E[0]){for(void 0!==S&&null!=S||(S=""),g=0,c=u.getFontSize(),a.textContent="",a.setAttribute("visibility","hidden"),i=0;i<d.length;i++){a.textContent=d[i];var f=a.getComputedTextLength();f>g&&(g=f),i>0&&(c+=1.8*u.getFontSize())}a.setAttribute("visibility","inherit"),a.textContent="",t.setDrawingSize([g,c])}else g=E[0],c=E[1];var p=t.getPixelPosition(),h=t.getFramed()?4:0,m=[g+2*h,c/1.5+2*h],A=EJSS_DRAWING2D.Element.getSWRelativePositionOffset(t.getRelativePosition(),m[0],m[1]),_=t.getMarginX(),I=t.getMarginY(),D=p[0]+A[0]+_+h,P=p[1]+A[1]+I-h;for(a.setAttribute("x",D),a.setAttribute("y",P),i=d.length-1;i>=0;i--){var T=document.createElementNS("http://www.w3.org/2000/svg","tspan");i==d.length-1?T.setAttribute("y",P):T.setAttribute("dy","-1.2em"),T.setAttribute("x",D),T.textContent=d[i],a.appendChild(T)}if(t.getFramed()){var C=h,N=h,y=m[0]-2*h,v=m[1]-2*h;if(y>0){var R=P+C,O=P-v-C,M=D-N,b=D+y+C;s.setAttribute("d","M "+M+" "+R+" L "+b+" "+R+" L "+b+" "+O+" L "+M+" "+O+" z");var G=t.getStyle();G.getDrawFill()?s.setAttribute("fill",G.getFillColor()):s.setAttribute("fill","none"),G.getDrawLines()?(s.setAttribute("stroke",G.getLineColor()),s.setAttribute("stroke-width",G.getLineWidth())):(s.setAttribute("stroke","none"),s.setAttribute("stroke-width",0));var L=G.getAttributes();for(var x in L)mShape.setAttribute(x,L[x])}else s.setAttribute("stroke","none"),s.setAttribute("fill","none")}var J=0;switch(t.getWritingMode()){case EJSS_DRAWING2D.Text.MODE_TOPDOWN:J=90;break;case EJSS_DRAWING2D.Text.MODE_RIGTHLEFT:J=180;break;case EJSS_DRAWING2D.Text.MODE_DOWNTOP:J=270;break;case EJSS_DRAWING2D.Text.MODE_LEFTRIGHT:J=0}return o.setAttribute("transform","rotate("+J+" "+(p[0]+_)+" "+(p[1]+I)+")"),l};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.trace=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.trail=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.Utils={},EJSS_SVGGRAPHICS.Utils.crispValue=function(e){return Math.round(+e.toFixed(4)+.5)-.5},EJSS_SVGGRAPHICS.Utils.crispTop=function(e){return Math.round(+e.toFixed(4)+.5)-.5},EJSS_SVGGRAPHICS.Utils.round=function(e){return+e.toFixed(4)},EJSS_SVGGRAPHICS.Utils.hsl2rgb=function(e){var t,r,n,i=e[0],o=e[1],a=e[2],s=(1-Math.abs(2*a-1))*o,l=i/60,u=s*(1-Math.abs(l%2-1));void 0===i||isNaN(i)||null===i?t=r=n=0:l>=0&&l<1?(t=s,r=u,n=0):l>=1&&l<2?(t=u,r=s,n=0):l>=2&&l<3?(t=0,r=s,n=u):l>=3&&l<4?(t=0,r=u,n=s):l>=4&&l<5?(t=u,r=0,n=s):l>=5&&l<6&&(t=s,r=0,n=u);var g,c,S,d=a-s/2;return g=255*(t+d),c=255*(r+d),S=255*(n+d),g=Math.round(g),c=Math.round(c),S=Math.round(S),{r:g,g:c,b:S}},EJSS_SVGGRAPHICS.Utils.PNGCanvasWorker=function(e){for(var t=e.data.params.imageData,r=e.data.params.width,n=e.data.params.height,i=(e.data.params.depth,e.data.params.data),o=e.data.params.colors,a=e.data.id,s=o[0],l=o[o.length-1],u=0;u<r;u++)for(var g=0;g<n;g++){var a=i[u][n-g-1],c=a<0?s:a<o.length?o[a]:l;void 0===c&&(c=s),"rgb"==c.substring(0,3)?rgb=function(e){var e=e.substring(4,e.length-1).replace(/ /g,"").split(",");return{r:e[0],g:e[1],b:e[2]}}(c):"hsl"==c.substring(0,3)&&(rgb=EJSS_SVGGRAPHICS.Utils.hsl2rgb(function(e){var e=e.substring(4,e.length-1).replace(/ /g,"").replace(/%/g,"").split(",");return{h:e[0],s:e[1]/100,l:e[2]/100}}(c))),function(e,t,r,n,i,o,s){a=4*(t+r*e.width),e.data[a+0]=n,e.data[a+1]=i,e.data[a+2]=o,e.data[a+3]=s}(t,u,g,rgb.r,rgb.g,rgb.b,255)}self.postMessage({result:t,id:a})},EJSS_SVGGRAPHICS.Utils.PNGCanvasNoWorker=function(e,t,r,n,i,o){for(var a=o[0],s=o[o.length-1],l=0;l<t;l++)for(var u=0;u<r;u++){var g=i[l][r-u-1],c=g<0?a:g<o.length?o[g]:s;void 0===c&&(c=a),"rgb"==c.substring(0,3)?rgb=function(e){var e=e.substring(4,e.length-1).replace(/ /g,"").split(",");return{r:e[0],g:e[1],b:e[2]}}(c):"hsl"==c.substring(0,3)&&(rgb=EJSS_SVGGRAPHICS.Utils.hsl2rgb(function(e){var e=e.substring(4,e.length-1).replace(/ /g,"").replace(/%/g,"").split(",");return{h:e[0],s:e[1]/100,l:e[2]/100}}(c))),function(e,t,r,n,i,o,a){g=4*(t+r*e.width),e.data[g+0]=n,e.data[g+1]=i,e.data[g+2]=o,e.data[g+3]=a}(e,l,u,rgb.r,rgb.g,rgb.b,255)}},EJSS_SVGGRAPHICS.Utils.PNGCanvas=function(e,t,r,n,i,o){var a=document.createElement("canvas");a.setAttribute("width",e),a.setAttribute("height",t);var s=a.getContext("2d"),l=s.createImageData(e,t);EJSS_TOOLS.Worker.runFunction?EJSS_TOOLS.Worker.runFunction("PNGCanvasWorker",EJSS_SVGGRAPHICS.Utils.PNGCanvasWorker,{imageData:l,width:e,height:t,depth:r,data:n,colors:i},function(e){s.putImageData(e.result,0,0),o(a.toDataURL())}):(EJSS_SVGGRAPHICS.Utils.PNGCanvasNoWorker(l,e,t,r,n,i),s.putImageData(l,0,0),o(a.toDataURL()))},EJSS_SVGGRAPHICS.Utils.ImageDataCanvas=function(e,t,r,n,i,o){var a=document.createElement("canvas");a.setAttribute("width",e),a.setAttribute("height",t);var s=a.getContext("2d"),l=s.createImageData(e,t);EJSS_TOOLS.Worker.runFunction("PNGCanvasWorker",EJSS_SVGGRAPHICS.Utils.PNGCanvasWorker,{imageData:l,width:e,height:t,depth:r,data:n,colors:i},function(e){o(e)})};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.video=function(e,t){};var EJSS_SVGGRAPHICS=EJSS_SVGGRAPHICS||{};EJSS_SVGGRAPHICS.wheel=function(e,t){var r,n=t.getGroup();r=null!==n?e.getElementById(n.getName()):e;var i,o,a=e.getElementById(t.getName());null===a?(a=document.createElementNS("http://www.w3.org/2000/svg","g"),a.setAttribute("id",t.getName()),r.appendChild(a),i=document.createElementNS("http://www.w3.org/2000/svg","ellipse"),i.setAttribute("id",t.getName()+".circle"),a.appendChild(i),o=document.createElementNS("http://www.w3.org/2000/svg","path"),o.setAttribute("id",t.getName()+".cross"),a.appendChild(o)):(i=e.getElementById(t.getName()+".circle"),o=e.getElementById(t.getName()+".cross"));var s=t.getPixelPosition(),l=t.getPixelSizes(),u=t.getRelativePositionOffset(l),g=s[0]+u[0],c=s[1]+u[1],S=l[0]/2,d=l[1]/2;i.setAttribute("cx",g),i.setAttribute("cy",c),i.setAttribute("rx",Math.abs(S)),i.setAttribute("ry",Math.abs(d)),o.setAttribute("d","M "+(g-S)+" "+c+" L "+(g+S)+" "+c+" M "+g+" "+(c-d)+" L "+g+" "+(c+d));var E=t.getStyle();E.getDrawFill()?a.setAttribute("fill",E.getFillColor()):a.setAttribute("fill","none"),E.getDrawLines()?(a.setAttribute("stroke",E.getLineColor()),a.setAttribute("stroke-width",E.getLineWidth())):(a.setAttribute("stroke","none"),a.setAttribute("stroke-width",0)),a.setAttribute("shapeRendering",E.getShapeRendering());var f=E.getAttributes();for(var p in f)a.setAttribute(p,f[p]);return a};var EJSS_GRAPHICS=EJSS_GRAPHICS||{};EJSS_GRAPHICS.SvgGraphics={getOffsetRect:function(e){return EJSS_GRAPHICS.GraphicsUtils.getOffsetRect(e)}},EJSS_GRAPHICS.svgGraphics=function(e){var t=EJSS_INTERFACE.svgGraphics(e),r=t.getDOMElement(),n=document.createElementNS("http://www.w3.org/2000/svg","defs");return r.appendChild(n),t.getEventContext=function(){return r},t.getBox=function(){var e=EJSS_GRAPHICS.CanvasGraphics.getOffsetRect(t);return e.width-=1,e.height-=1,e},t.remove=function(e){var t=r.getElementById(e);return null!==t&&(r.removeChild(t),!0)},t.reset=function(){for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(n)},t.getDefs=function(){return n},t.draw=function(e,n){for(var i=0,o=e.length;i<o;i++){var a=e[i];if(a.getElements)for(var s=a.getLastElements(),l=0,u=s.length;l<u;l++){var g=r.getElementById(s[l].getName());g&&g.parentNode.removeChild(g)}if(n||a.isChanged()||a.isGroupChanged()||a.isMustProject()){var c=t.drawElement(a);void 0!==c&&null!=c&&t.transformElement(a,c)}}},t.drawElement=function(e){var t=EJSS_DRAWING2D.Shape,n=null;switch(e._23()){case"ElementCustom":var i=e.getFunction();i&&(n=i(r,e));break;case"ElementGroup":n=EJSS_SVGGRAPHICS.group(r,e);break;case"ElementShape":switch(e.getShapeType()){default:case t.ELLIPSE:n=EJSS_SVGGRAPHICS.ellipse(r,e);break;case t.RECTANGLE:n=EJSS_SVGGRAPHICS.rectangle(r,e);break;case t.ROUND_RECTANGLE:n=EJSS_SVGGRAPHICS.roundRectangle(r,e);break;case t.WHEEL:n=EJSS_SVGGRAPHICS.wheel(r,e);break;case t.NONE:case t.POINT:n=EJSS_SVGGRAPHICS.point(r,e)}break;case"ElementSegment":n=EJSS_SVGGRAPHICS.segment(r,e);break;case"ElementImage":n=EJSS_SVGGRAPHICS.image(r,e);break;case"ElementVideo":n=EJSS_SVGGRAPHICS.video(r,e);break;case"ElementArrow":n=EJSS_SVGGRAPHICS.arrow(r,e);break;case"ElementText":n=EJSS_SVGGRAPHICS.text(r,e);break;case"ElementSpring":n=EJSS_SVGGRAPHICS.spring(r,e);break;case"ElementTrail":n=EJSS_SVGGRAPHICS.trail(r,e);break;case"ElementTrace":n=EJSS_SVGGRAPHICS.trace(r,e);break;case"ElementGrid":n=EJSS_SVGGRAPHICS.grid(r,e);break;case"ElementAxis":n=EJSS_SVGGRAPHICS.axis(r,e);break;case"ElementCursor":n=EJSS_SVGGRAPHICS.cursor(r,e);break;case"ElementPolygon":n=EJSS_SVGGRAPHICS.polygon(r,e);break;case"ElementAnalyticCurve":n=EJSS_SVGGRAPHICS.analyticCurve(r,e);break;case"ElementCellLattice":n=EJSS_SVGGRAPHICS.cellLattice(r,e);break;case"ElementByteRaster":n=EJSS_SVGGRAPHICS.byteRaster(r,e);break;case"ElementMesh":n=EJSS_SVGGRAPHICS.mesh(r,e);break;case"ElementTank":n=EJSS_SVGGRAPHICS.tank(r,e);break;case"ElementPipe":n=EJSS_SVGGRAPHICS.pipe(r,e);break;case"ElementHistogram":n=EJSS_SVGGRAPHICS.histogram(r,e);break;case"ElementScalarField":n=EJSS_SVGGRAPHICS.scalarField(r,e);break;case"ElementCanvas":n=EJSS_SVGGRAPHICS.canvas(r,e)}return n&&(e.isGroupVisible()?n.setAttribute("visibility","visible"):n.setAttribute("visibility","hidden")),n},t.transformElement=function(e,t){var r,n=e.getTransformation();if(Array.isArray(n))r="matrix("+n[0]+" "+n[1]+" "+n[2]+" "+n[3]+" "+n[4]+" "+n[5]+")";else if("string"==typeof n)r=n;else if("number"==typeof n){var i=e.getPixelPosition(),o=EJSS_TOOLS.Mathematics.degrees(-n);r="rotate("+o+" "+i[0]+" "+i[1]+")"}r&&t.setAttribute("transform",r)},t._24=function(e){if(e.getGutters().visible){var n=EJSS_SVGGRAPHICS.Utils,i=r.getElementById(".myGutters"),o=r.getElementById(".myOuterBorder"),a=r.getElementById(".myInnerBorder");null===i&&(i=document.createElementNS("http://www.w3.org/2000/svg","path"),i.setAttribute("id",".myGutters"),i.setAttribute("stroke","none"),i.setAttribute("stroke-width",0),r.appendChild(i),o=document.createElementNS("http://www.w3.org/2000/svg","path"),o.setAttribute("id",".myOuterBorder"),o.setAttribute("fill","none"),r.appendChild(o),a=document.createElementNS("http://www.w3.org/2000/svg","path"),a.setAttribute("id",".myInnerBorder"),a.setAttribute("fill","none"),r.appendChild(a));var s=e.getInnerRect(),l=.5,u=.5,g=t.getBox(),c=g.width,S=g.height,d=e.getGuttersStyle(),E=e.getStyle();"crispEdges"==E.getShapeRendering()?(i.setAttribute("d","M "+n.crispValue(l)+" "+n.crispValue(u)+" L "+n.crispValue(l)+" "+n.crispValue(u+S)+" L "+n.crispValue(l+c)+" "+n.crispValue(u+S)+" L "+n.crispValue(l+c)+" "+n.crispValue(u)+" L "+n.crispValue(l)+" "+n.crispValue(u)+" M "+n.crispValue(s.x)+" "+n.crispValue(s.y)+" L "+n.crispValue(s.x+s.width)+" "+n.crispValue(s.y)+" L "+n.crispValue(s.x+s.width)+" "+n.crispValue(s.y+s.height)+" L "+n.crispValue(s.x)+" "+n.crispValue(s.y+s.height)+" L "+n.crispValue(s.x)+" "+n.crispValue(s.y)+" z"),o.setAttribute("d","M "+n.crispValue(l)+" "+n.crispValue(u)+" L "+n.crispValue(l)+" "+n.crispValue(u+S)+" L "+n.crispValue(l+c)+" "+n.crispValue(u+S)+" L "+n.crispValue(l+c)+" "+n.crispValue(u)+" L "+n.crispValue(l)+" "+n.crispValue(u)+" z"),a.setAttribute("d","M "+n.crispValue(s.x)+" "+n.crispValue(s.y)+" L "+n.crispValue(s.x+s.width)+" "+n.crispValue(s.y)+" L "+n.crispValue(s.x+s.width)+" "+n.crispValue(s.y+s.height)+" L "+n.crispValue(s.x)+" "+n.crispValue(s.y+s.height)+" L "+n.crispValue(s.x)+" "+n.crispValue(s.y)+" z")):(i.setAttribute("d","M 0.5 0.5 L 0.5 "+(u+S)+" L "+(l+c)+" "+(u+S)+" L "+(l+c)+" "+u+" L "+l+" "+u+" M "+s.x+" "+s.y+" L "+(s.x+s.width)+" "+s.y+" L "+(s.x+s.width)+" "+(s.y+s.height)+" L "+s.x+" "+(s.y+s.height)+" L "+s.x+" "+s.y+" z"),o.setAttribute("d","M 0.5 0.5 L 0.5 "+(u+S)+" L "+(l+c)+" "+(u+S)+" L "+(l+c)+" "+u+" L "+l+" "+u+" z"),a.setAttribute("d","M "+s.x+" "+s.y+" L "+(s.x+s.width)+" "+s.y+" L "+(s.x+s.width)+" "+(s.y+s.height)+" L "+s.x+" "+(s.y+s.height)+" L "+s.x+" "+s.y+" z")),d.getDrawFill()?i.setAttribute("fill",d.getFillColor()):i.setAttribute("fill","none"),d.getDrawLines()?(o.setAttribute("stroke",d.getLineColor()),o.setAttribute("stroke-width",d.getLineWidth())):(o.setAttribute("stroke","none"),o.setAttribute("stroke-width",0)),E.getDrawLines()?(a.setAttribute("stroke",E.getLineColor()),a.setAttribute("stroke-width",E.getLineWidth())):(a.setAttribute("stroke","none"),a.setAttribute("stroke-width",0)),i.setAttribute("shapeRendering",E.getShapeRendering()),o.setAttribute("shapeRendering",d.getShapeRendering()),a.setAttribute("shapeRendering",E.getShapeRendering())}},t.drawPanel=function(e){var n=EJSS_SVGGRAPHICS.Utils,i=r.getElementById(".myPanel");null===i&&(i=document.createElementNS("http://www.w3.org/2000/svg","path"),i.setAttribute("id",".myPanel"),r.appendChild(i));var o=.5,a=.5,s=t.getBox(),l=s.width,u=s.height,g=e.getStyle();"crispEdges"==g.getShapeRendering()?i.setAttribute("d","M "+n.crispValue(o)+" "+n.crispValue(a)+" L "+n.crispValue(o)+" "+n.crispValue(a+u)+" L "+n.crispValue(o+l)+" "+n.crispValue(a+u)+" L "+n.crispValue(o+l)+" "+n.crispValue(a)+" z"):i.setAttribute("d","M 0.5 0.5 L 0.5 "+(a+u)+" L "+(o+l)+" "+(a+u)+" L "+(o+l)+" "+a+" z"),g.getDrawFill()?i.setAttribute("fill",g.getFillColor()):i.setAttribute("fill","none"),g.getDrawLines()?(i.setAttribute("stroke",g.getLineColor()),i.setAttribute("stroke-width",g.getLineWidth())):(i.setAttribute("stroke","none"),i.setAttribute("stroke-width",0)),i.setAttribute("shapeRendering",g.getShapeRendering())},t.importSVG=function(e){var r=t.getBox(),n=document.createElement("canvas");n.width=r.width+1,n.height=r.height+1;var i=n.getContext("2d"),o=t.getDOMElement();o.setAttribute("width",n.width),o.setAttribute("height",n.height);var a=(new XMLSerializer).serializeToString(o),s=new Image;return s.src="data:image/svg+xml;utf8,"+a,s.onload=function(){console.log("tam "+n.width+" "+n.height),i.drawImage(s,0,0),e&&e(n.toDataURL("image/png"))},s.src},t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.InfoText={registerProperties:function(e,t){EJSS_DRAWING2D.Text.registerProperties(e,t),t.registerProperty("Info",e.setInfo),t.registerProperty("Format",e.setFormat)}},EJSS_DRAWING2D.infoText=function(e){function t(e,t){if(!Array.isArray(t)||void 0===n)return t;for(var r="",i=e,o=e.match(/[0-9]*\.(\^|#)+/g),a=0;a<o.length;a++){var s=o[a].split("#").length-1;r=isNaN(t[a])?t[a]:t[a].toFixed(s),i=i.replace(o[a],r)}return i}var r,n,i=EJSS_DRAWING2D.text(e),o=i.getText;return i.setInfo=function(e){r=e},i.getText=function(){if(void 0===r){var e=o();return t(n,e)}return r.getInfo?r.getInfo():"function"==typeof r?r():void 0},i.setFormat=function(e){n=e},i.isChanged=function(){return!0},i.registerProperties=function(e){EJSS_DRAWING2D.InfoText.registerProperties(i,e)},i};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Knob={},EJSS_DRAWING2D.knob=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.KnobOld={registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("Value",e.setValue,e.getValue),t.registerProperty("Minimum",e.setMinimum,e.getMinimum),t.registerProperty("Maximum",e.setMaximum,e.getMaximum),t.registerAction("OnPress",e.getValue),t.registerAction("OnRelease",e.getValue),t.registerAction("OnChange",e.getValue),t.registerProperty("Size",e.setSize)}},EJSS_DRAWING2D.knobOld=function(e){function t(){u=document.createElement("div"),document.body.appendChild(u),u.innerHTML=h,a=EJSS_DRAWING2D.shape(e+".exterior_shape"),a.setSize([1,1]),a.getStyle().setDrawLines(!1),a.getStyle().setAttributes({fill:"url(#KnobExteriorGradient)",filter:"url(#KnobFilter)"}),s=EJSS_DRAWING2D.shape(e+".middle_shape"),s.setSize([.9,.9]),s.getStyle().setDrawLines(!1),s.getStyle().setAttributes({fill:"url(#KnobMiddleGradient)"}),l=EJSS_CORE.promoteToControlElement(EJSS_DRAWING2D.shape(e+".inner_shape"),g.getView(),e+".inner_shape"),l.setY(.3),l.setSize([.2,.2]),l.getStyle().setDrawLines(!1),l.getStyle().setAttributes({fill:"url(#KnobInteriorGradient)"}),l.setProperty("EnabledPosition","ENABLED_NO_MOVE"),l.setProperty("Sensitivity",10),l.setProperty("OnDrag",o),l.setProperty("OnPress",n),l.setProperty("OnRelease",i)}function r(){c=Math.max(Math.min(S,c),d);var e=f-(c-d)/(S-d)*(f-E)+Math.PI/2;l.setPosition([.3*Math.cos(e),.3*Math.sin(e)])}function n(e,t){var r=g.getController();r&&r.invokeImmediateAction("OnPress")}function i(e,t){var r=g.getController();r&&r.invokeImmediateAction("OnRelease")}function o(e,t){var e=t.point,r=t.element,n=g.getAbsolutePosition(!0);e[0]-=n[0],e[1]-=n[1];var i=f-(c-d)/(S-d)*(f-E),o=Math.atan2(-e[0],e[1]);if(!(Math.abs(o-i)>p)){o=Math.min(Math.max(o,E),f),c=S-(o-E)/(f-E)*(S-d);var i=o+Math.PI/2;r.setPosition([.3*Math.cos(i),.3*Math.sin(i)]);var a=g.getController();a&&(a.immediatePropertyChanged("Value"),a.invokeImmediateAction("OnChange"))}}var a,s,l,u,g=EJSS_DRAWING2D.group(e),c=0,S=1,d=-1,E=(Math.PI,Math.PI,Math.PI,Math.PI,.7*-Math.PI),f=.7*Math.PI,p=Math.PI/5,h="<svg xmlns='http://www.w3.org/2000/svg' version='1.1'>  <defs>    <linearGradient id='KnobExteriorGradient' x1='0%' y1='0%' x2='100%' y2='100%'>      <stop offset='0%'   stop-color='rgb(250,250,250)' />      <stop offset='100%' stop-color='rgb(100,100,100)' />    </linearGradient>    <linearGradient id='KnobMiddleGradient' x1='0%' y1='0%' x2='100%' y2='100%'>      <stop offset='0%'   stop-color='rgb(200,200,200)' />      <stop offset='100%' stop-color='rgb(150,150,150)' />    </linearGradient>    <linearGradient id='KnobInteriorGradient' x1='0%' y1='0%' x2='100%' y2='100%'>      <stop offset='0%'   stop-color='rgb(127,127,127)' />      <stop offset='100%' stop-color='rgb(250,250,250)' />    </linearGradient>    <filter id='KnobFilter' x='0' y='0' width='200%' height='200%'>      <feOffset result='offOut' in='SourceGraphic' dx='1' dy='1' />      <feGaussianBlur result='blurOut' in='offOut' stdDeviation='2' />      <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />    </filter>  </defs></svg>";return g.setValue=function(e){c!=e&&(c=e,r())},g.getValue=function(){return c},g.setMinimum=function(e){d!=e&&(d=e,r())},g.getMinimum=function(){return d},g.setMaximum=function(e){S!=e&&(S=e,r())},g.getMaximum=function(){return S},g.setSize=function(e){g.setSizeX(e),g.setSizeY(e)},g.registerProperties=function(e){t(),EJSS_DRAWING2D.Knob.registerProperties(g,e)},g.superSetParent=g.setParent,g.setParent=function(e,t){g.superSetParent(e,t),a.setParent(g),s.setParent(g),l.setParent(g)},g};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Mesh={},EJSS_DRAWING2D.mesh=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Meter={},EJSS_DRAWING2D.meter=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Pipe={},EJSS_DRAWING2D.pipe=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.PlottingPanel={registerProperties:function(e,t){EJSS_DRAWING2D.DrawingPanel.registerProperties(e,t),t.registerProperty("Title",e.getTitle().setText),t.registerProperty("TitleFont",e.getTitle().getFont().setFont),t.registerProperty("TitleColor",e.getTitle().getFont().setFillColor),t.registerProperty("TitleMargin",e.getTitle().setMarginY),t.registerProperty("TitleX",e.getTitleX().setText),t.registerProperty("TitleXFont",e.getTitleX().getFont().setFont),t.registerProperty("TitleXColor",e.getTitleX().getFont().setFillColor),t.registerProperty("TitleXMargin",e.getTitleX().setMarginY),t.registerProperty("TitleY",e.getTitleY().setText),t.registerProperty("TitleYFont",e.getTitleY().getFont().setFont),t.registerProperty("TitleYColor",e.getTitleY().getFont().setFillColor),t.registerProperty("TitleYMargin",e.getTitleY().setMarginX),t.registerProperty("GridXShow",e.getGrid().setShowX,e.getGrid().getShowX),t.registerProperty("GridXTicks",e.getGrid().setTicksX,e.getGrid().getTicksX),t.registerProperty("GridXStep",e.getGrid().setStepX,e.getGrid().getStepX),t.registerProperty("GridXAutoStepMin",e.getGrid().setAutoStepXMin,e.getGrid().getAutoStepXMin),t.registerProperty("GridXAutoTicksRange",e.getGrid().setAutoTicksXRange,e.getGrid().getAutoTicksXRange),t.registerProperty("GridXScale",e.getGrid().setScaleX,e.getGrid().getScaleX),t.registerProperty("GridXScalePrecision",e.getGrid().setScalePrecisionX,e.getGrid().getScalePrecisionX),t.registerProperty("GridXFixedTick",e.getGrid().setFixedTickX,e.getGrid().getFixedTickX),t.registerProperty("GridXAutoTicks",e.getGrid().setAutoTicksX,e.getGrid().getAutoTicksX),t.registerProperty("GridXLineColor",e.getGrid().setLineColorX),t.registerProperty("GridXLineWidth",e.getGrid().setLineWidthX),t.registerProperty("GridXShapeRendering",e.getGrid().setShapeRenderingX),t.registerProperty("GridYShow",e.getGrid().setShowY,e.getGrid().getShowY),t.registerProperty("GridYTicks",e.getGrid().setTicksY,e.getGrid().getTicksY),t.registerProperty("GridYStep",e.getGrid().setStepY,e.getGrid().getStepY),t.registerProperty("GridYAutoStepMin",e.getGrid().setAutoStepYMin,e.getGrid().getAutoStepYMin),t.registerProperty("GridYAutoTicksRange",e.getGrid().setAutoTicksYRange,e.getGrid().getAutoTicksYRange),t.registerProperty("GridYScale",e.getGrid().setScaleY,e.getGrid().getScaleY),t.registerProperty("GridYScalePrecision",e.getGrid().setScalePrecisionY,e.getGrid().getScalePrecisionY),t.registerProperty("GridYFixedTick",e.getGrid().setFixedTickY,e.getGrid().getFixedTickY),t.registerProperty("GridYAutoTicks",e.getGrid().setAutoTicksY,e.getGrid().getAutoTicksY),t.registerProperty("GridYLineColor",e.getGrid().setLineColorY),t.registerProperty("GridYLineWidth",e.getGrid().setLineWidthY),t.registerProperty("GridYShapeRendering",e.getGrid().setShapeRenderingY),t.registerProperty("AxisXShow",e.getAxisX().setShow),t.registerProperty("AxisXLineColor",e.getAxisX().getStyle().setLineColor),t.registerProperty("AxisXLineWidth",e.getAxisX().getStyle().setLineWidth),t.registerProperty("AxisXShapeRendering",e.getAxisX().getStyle().setShapeRendering),t.registerProperty("AxisXFixedTick",e.getAxisX().setFixedTick,e.getAxisX().getFixedTick),t.registerProperty("AxisXAutoTicks",e.getAxisX().setAutoTicks,e.getAxisX().getAutoTicks),t.registerProperty("AxisXTicks",e.getAxisX().setTicks,e.getAxisX().getTicks),t.registerProperty("AxisXStep",e.getAxisX().setStep,e.getAxisX().getStep),t.registerProperty("AxisXTickStep",e.getAxisX().setTickStep,e.getAxisX().getTickStep),t.registerProperty("AxisXAutoStepMin",e.getAxisX().setAutoStepMin,e.getAxisX().getAutoStepMin),t.registerProperty("AxisXAutoTicksRange",e.getAxisX().setAutoTicksRange,e.getAxisX().getAutoTicksRange),t.registerProperty("AxisXScale",e.getAxisX().setScale,e.getAxisX().getScale),t.registerProperty("AxisXScalePrecision",e.getAxisX().setScalePrecision,e.getAxisX().getScalePrecision),t.registerProperty("AxisXFont",e.getAxisX().getFont().setFont),t.registerProperty("AxisXFontColor",e.getAxisX().getFont().setFillColor),t.registerProperty("AxisYShow",e.getAxisY().setShow),t.registerProperty("AxisYLineColor",e.getAxisY().getStyle().setLineColor),t.registerProperty("AxisYLineWidth",e.getAxisY().getStyle().setLineWidth),t.registerProperty("AxisYShapeRendering",e.getAxisY().getStyle().setShapeRendering),t.registerProperty("AxisYFixedTick",e.getAxisY().setFixedTick,e.getAxisY().getFixedTick),t.registerProperty("AxisYAutoTicks",e.getAxisY().setAutoTicks,e.getAxisY().getAutoTicks),t.registerProperty("AxisYTicks",e.getAxisY().setTicks,e.getAxisY().getTicks),t.registerProperty("AxisYStep",e.getAxisY().setStep,e.getAxisY().getStep),t.registerProperty("AxisYTickStep",e.getAxisY().setTickStep,e.getAxisY().getTickStep),t.registerProperty("AxisYAutoStepMin",e.getAxisY().setAutoStepMin,e.getAxisY().getAutoStepMin),t.registerProperty("AxisYAutoTicksRange",e.getAxisY().setAutoTicksRange,e.getAxisY().getAutoTicksRange),t.registerProperty("AxisYScale",e.getAxisY().setScale,e.getAxisY().getScale),t.registerProperty("AxisYScalePrecision",e.getAxisY().setScalePrecision,e.getAxisY().getScalePrecision),t.registerProperty("AxisYFont",e.getAxisY().getFont().setFont),t.registerProperty("AxisYFontColor",e.getAxisY().getFont().setFillColor),t.registerProperty("XFixedTick",function(t){e.getAxisX().setFixedTick(t),e.getGrid().setFixedTickX(t)}),t.registerProperty("YFixedTick",function(t){e.getAxisY().setFixedTick(t),e.getGrid().setFixedTickY(t)}),t.registerProperty("XTicks",function(t){e.getAxisX().setTicks(t),e.getGrid().setTicksX(t)}),t.registerProperty("YTicks",function(t){e.getAxisY().setTicks(t),e.getGrid().setTicksY(t)}),t.registerProperty("XStep",function(t){e.getAxisX().setStep(t),e.getGrid().setStepX(t)}),t.registerProperty("YStep",function(t){e.getAxisY().setStep(t),e.getGrid().setStepY(t)}),t.registerProperty("XTickStep",function(t){e.getAxisX().setTickStep(t),e.getGrid().setTickStepX(t)}),t.registerProperty("YTickStep",function(t){e.getAxisY().setTickStep(t),e.getGrid().setTickStepY(t)}),t.registerProperty("XAutoStepMin",function(t){e.getAxisX().setAutoStepMin(t),e.getGrid().setAutoStepXMin(t)}),t.registerProperty("YAutoStepMin",function(t){e.getAxisY().setAutoStepMin(t),e.getGrid().setAutoStepYMin(t)}),t.registerProperty("XAutoTicksRange",function(t){e.getAxisX().setAutoTicksRange(t),e.getGrid().setAutoTicksXRange(t)}),t.registerProperty("YAutoTicksRange",function(t){e.getAxisY().setAutoTicksRange(t),e.getGrid().setAutoTicksyRange(t)}),t.registerProperty("XScale",function(t){e.getAxisX().setScale(t),e.getGrid().setScaleX(t)}),t.registerProperty("YScale",function(t){e.getAxisY().setScale(t),e.getGrid().setScaleY(t)}),t.registerProperty("XScalePrecision",function(t){e.getAxisX().setScalePrecision(t),e.getGrid().setScalePrecisionX(t)}),t.registerProperty("YScalePrecision",function(t){e.getAxisY().setScalePrecision(t),e.getGrid().setScalePrecisionY(t)}),t.registerProperty("XAutoTicks",function(t){e.getAxisX().setAutoTicks(t),e.getGrid().setAutoTicksX(t)}),t.registerProperty("YAutoTicks",function(t){e.getAxisY().setAutoTicks(t),e.getGrid().setAutoTicksY(t)})}},EJSS_DRAWING2D.plottingPanel=function(e,t){var r=EJSS_DRAWING2D.drawingPanel(e,t);r.getGrid=function(){return i},r.getAxisX=function(){return a},r.getAxisY=function(){return s},r.getTitleX=function(){return l},r.getTitleY=function(){return u},r.getTitle=function(){return g},r.getFixedTickX=function(){return getGrid().getFixedTickX()},r.getFixedTickY=function(){return getGrid().getFixedTickY()},r.registerProperties=function(e){EJSS_DRAWING2D.PlottingPanel.registerProperties(r,e)};var n=EJSS_DRAWING2D.group(e+".bottomgroup");n.setRelativePosition("SOUTH_WEST"),n.panelChangeListener=function(e){if("bounds"==e){var t=r.getRealWorldXMin(),i=r.getRealWorldXMax(),o=r.getRealWorldYMin(),a=r.getRealWorldYMax(),s=Math.abs(i-t),l=Math.abs(a-o);return n.setSize([s,l]),n.setPosition([t,o]),!0}},n.panelChangeListener("bounds");var i=EJSS_DRAWING2D.grid(e+".grid");i.setGroup(n),i.setRelativePosition("SOUTH_WEST"),i.setLineColorX("lightgray"),i.setShapeRenderingX("RENDER_CRISPEDGES"),i.setLineColorY("lightgray"),i.setShapeRenderingY("RENDER_CRISPEDGES"),i.setSize([1,1]),i.setPosition([0,0]),i.panelChangeListener=function(e){if("bounds"==e){var t=r.getRealWorldXMin(),n=r.getRealWorldXMax();i.setScaleX([t,n]),i.setTicksXMode(r.getTypeScaleX());var o=r.getRealWorldYMin(),a=r.getRealWorldYMax();return i.setScaleY([o,a]),i.setTicksYMode(r.getTypeScaleY()),!0}};var o=EJSS_DRAWING2D.group(e+".topgroup");o.setRelativePosition("SOUTH_WEST"),o.panelChangeListener=function(e){if("bounds"==e){var t=r.getRealWorldXMin(),n=r.getRealWorldXMax(),i=r.getRealWorldYMin(),a=r.getRealWorldYMax(),s=Math.abs(n-t),l=Math.abs(a-i);return o.setSize([s,l]),o.setPosition([t,i]),!0}},o.panelChangeListener("bounds");var a=EJSS_DRAWING2D.axis(e+".axisX");a.setGroup(o),a.setRelativePosition("WEST"),a.getStyle().setLineColor("black"),a.getStyle().setShapeRendering("RENDER_CRISPEDGES"),a.getFont().setFontSize(10),a.setSize([1,1]),a.setPosition([0,0]),a.setOrient("AXIS_HORIZONTAL"),a.panelChangeListener=function(e){if("bounds"==e){var t=r.getRealWorldXMin(),n=r.getRealWorldXMax();return a.setScale([t,n]),a.setTicksMode(r.getTypeScaleX()),r.getInvertedScaleY()?(a.setTextPosition("TICKS_DOWN"),l.setMarginY(-30),g.setMarginY(20)):(a.setTextPosition("TICKS_UP"),l.setMarginY(30),g.setMarginY(-20)),!0}},a.setTicksMode(r.getTypeScaleX());var s=EJSS_DRAWING2D.axis(e+".axisY");s.setGroup(o),s.setRelativePosition("SOUTH"),s.getStyle().setLineColor("black"),s.getStyle().setShapeRendering("RENDER_CRISPEDGES"),s.getFont().setFontSize(10),s.setSize([1,1]),s.setPosition([0,0]),s.setOrient("AXIS_VERTICAL"),s.panelChangeListener=function(e){if("bounds"==e){var t=r.getRealWorldYMin(),n=r.getRealWorldYMax();return s.setScale([t,n]),s.setTicksMode(r.getTypeScaleY()),s.setInvertedScaleY(r.getInvertedScaleY()),!0}},s.setTicksMode(r.getTypeScaleY());var l=EJSS_DRAWING2D.text(e+".titleX");l.setGroup(o),l.setRelativePosition("CENTER"),l.getFont().setFontSize(12),l.setPosition([.5,0]),l.setMarginY(30),l.setText("x");var u=EJSS_DRAWING2D.text(e+".titleY");u.setGroup(o),u.setRelativePosition("CENTER"),u.getFont().setFontSize(12),u.setWritingMode("MODE_DOWNTOP"),u.setPosition([0,.5]),u.setMarginX(-40),u.setText("y");var g=EJSS_DRAWING2D.text(e+".title");return g.setGroup(o),g.setRelativePosition("CENTER"),g.getFont().setFontSize(12),g.setPosition([.5,1]),g.setMarginY(-20),g.setText("Plot"),r.getStyle().setLineColor("black"),r.getStyle().setFillColor("white"),r.getStyle().setShapeRendering("RENDER_CRISPEDGES"),r._25([50,50,50,50]),r.getGuttersStyle().setLineColor("black"),r.getGuttersStyle().setFillColor("rgb(211,216,255)"),r.getGuttersStyle().setShapeRendering("RENDER_CRISPEDGES"),r.addDecoration(n),r.addDecoration(i),r.addDecoration(o,-1,!0),r.addDecoration(a,-1,!0),r.addDecoration(s,-1,!0),r.addDecoration(l,-1,!0),r.addDecoration(u,-1,!0),r.addDecoration(g,-1,!0),r};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Polygon={NO_CONNECTION:0,LINE_CONNECTION:1,copyTo:function(e,t){EJSS_DRAWING2D.Element.copyTo(e,t),t.setPoints(e.getPoints())},registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("Points",e.setPoints,e.getPoints),t.registerProperty("PointsX",e.setPointsX),t.registerProperty("PointsY",e.setPointsY),t.registerProperty("LastPoint",e.addPoint,e.getLastPoint)}},EJSS_DRAWING2D.polygon=function(e){function t(e,t,r){isNaN(e)||isNaN(t)||(n[n.length]=[e,t,r])}var r=EJSS_DRAWING2D.element(e),n=[],i=null,o=null;return r._23=function(){return"ElementPolygon"},r.addPoint=function(e,n,i){e instanceof Array?t(e[0],e[1],e[2]):t(e,n,i),r.setChanged(!0)},r.addPoints=function(e,n){if(void 0!=e&&null!=e&&void 0!=e[0]){if(e[0]instanceof Array)for(var i=0,o=e.length;i<o;i++)t(e[i][0],e[i][1],e[i][2]);else for(var o=Math.min(e.length,n.length),i=0;i<o;i++)t(e[i],n[i]);r.setChanged(!0)}},r.setPoints=function(e,t){r.clear(),r.addPoints(e,t),r.setChanged(!0)},r.setPointsX=function(e){null==o?i=e:(r.setPoints(e,o),o=null)},r.setPointsY=function(e){null==i?o=e:(r.setPoints(i,e),i=null)},r.getPoints=function(){return n},r.getLastPoint=function(){return n.length>0?n[n.length-1]:[]},r.clear=function(){n=[],r.setChanged(!0)},r.getBounds=function(e){var t,n,i,o,a=r.getPoints(),s=a.length;if(0==s)t=n=i=o=0;else{n=t=a[0][0],o=i=a[0][1];for(var l=1;l<s;l++){var u=a[l][0],g=a[l][1];u>n&&(n=u),g>o&&(o=g),u<t&&(t=u),g<i&&(i=g)}}var u=r.getX(),g=r.getY(),c=r.getSizeX(),S=r.getSizeY(),d=S/2,E=S/2,f=r.getRelativePositionOffset(c,S);return{left:u+f[0]-d+t*c,right:u+f[0]-d+n*c,top:g+f[1]-E+o*S,bottom:g+f[1]-E+i*S}},r.registerProperties=function(e){EJSS_DRAWING2D.Polygon.registerProperties(r,e)},r.copyTo=function(e){EJSS_DRAWING2D.Polygon.copyTo(r,e)},r.setSize([1,1]),r.setRelativePosition("SOUTH_WEST"),r},EJSS_DRAWING2D.PolygonSet={},EJSS_DRAWING2D.polygonSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Ruler={},EJSS_DRAWING2D.ruler=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.ScalarField={registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("Data",e.setData,e.getData),t.registerProperty("MinimumX",e.setMinimumX,e.getMinimumX),t.registerProperty("MaximumX",e.setMaximumX,e.getMaximumX),t.registerProperty("MinimumY",e.setMinimumY,e.getMinimumY),t.registerProperty("MaximumY",e.setMaximumY,e.getMaximumY),t.registerProperty("MinimumZ",e.setMinimumZ,e.getMinimumZ),t.registerProperty("MaximumZ",e.setMaximumZ,e.getMaximumZ),t.registerProperty("Radius",e.setRadius,e.getRadius)}},EJSS_DRAWING2D.scalarField=function(e){var t=EJSS_DRAWING2D.element(e),r=[],n=-1,i=1,o=-1,a=1,s=-1,l=1,u=0;return t._23=function(){return"ElementScalarField"},t.getMinimumX=function(){return n},t.setMinimumX=function(e){n!=e&&(n=e,t.setChanged(!0))},t.getMaximumX=function(){return i},t.setMaximumX=function(e){i!=e&&(i=e,t.setChanged(!0))},t.getMinimumY=function(){return o},t.setMinimumY=function(e){o!=e&&(o=e,t.setChanged(!0))},t.getMaximumY=function(){return a},t.setMaximumY=function(e){a!=e&&(a=e,t.setChanged(!0))},t.getMinimumZ=function(){return s},t.setMinimumZ=function(e){s!=e&&(s=e,t.setChanged(!0))},t.getMaximumZ=function(){return l},t.setMaximumZ=function(e){l!=e&&(l=e,t.setChanged(!0))},t.getRadius=function(){return u},t.setRadius=function(e){u!=e&&(u=e,t.setChanged(!0))},t.getData=function(){return r},t.setData=function(e){r=e||r,t.setChanged(!0)},t.registerProperties=function(e){EJSS_DRAWING2D.ScalarField.registerProperties(t,e)},t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Segment={registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("Offset",e.setRelativePosition,e.getRelativePosition)}},EJSS_DRAWING2D.segment=function(e){var t=EJSS_DRAWING2D.element(e);return t._23=function(){return"ElementSegment"},t.registerProperties=function(e){EJSS_DRAWING2D.Segment.registerProperties(t,e)},t.setSize([.1,.1]),t.setRelativePosition("SOUTH_WEST"),t},EJSS_DRAWING2D.SegmentSet={},EJSS_DRAWING2D.segmentSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.SetSquare={},EJSS_DRAWING2D.setSquare=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Shape={NONE:0,ELLIPSE:1,RECTANGLE:2,ROUND_RECTANGLE:3,WHEEL:4,POINT:5,registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("ShapeType",e.setShapeType),t.registerProperty("CornerRadius",e.setCornerRadius)},copyTo:function(e,t){EJSS_DRAWING2D.Element.copyTo(e,t),t.setShapeType(e.getShapeType()),t.setCornerRadius(e.getCornerRadius())}},EJSS_DRAWING2D.shape=function(e){var t=EJSS_DRAWING2D.element(e),r=10,n=EJSS_DRAWING2D.Shape.ELLIPSE;return t.setShapeType=function(e){n="string"==typeof e?EJSS_DRAWING2D.Shape[e.toUpperCase()]:e},t.getShapeType=function(){return n},t.setCornerRadius=function(e){r!=e&&(r=e,t.setChanged(!0))},t.getCornerRadius=function(){return r},t._23=function(){return"ElementShape"},t.registerProperties=function(e){EJSS_DRAWING2D.Shape.registerProperties(t,e)},t.copyTo=function(e){EJSS_DRAWING2D.Shape.copyTo(t,e)},t.setSize([.1,.1]),t.setRelativePosition("CENTER"),t.getStyle().setFillColor("Blue"),t.getStyle().setLineColor("Black"),t},EJSS_DRAWING2D.ShapeSet={registerProperties:function(e,t){EJSS_DRAWING2D.ElementSet.registerProperties(e,t),t.registerProperty("ShapeType",function(t){e.setToEach(function(e,t){e.setShapeType(t)},t)}),t.registerProperty("CornerRadius",function(t){e.setToEach(function(e,t){e.setCornerRadius(t)},t)})}},EJSS_DRAWING2D.shapeSet=function(e){var t=EJSS_DRAWING2D.elementSet(EJSS_DRAWING2D.shape,e),r=EJSS_DRAWING2D.ShapeSet;return t.registerProperties=function(e){r.registerProperties(t,e)},t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.SimplePanel={GRAPHICS2D_SVG:"SVG",GRAPHICS2D_CANVAS:"Canvas",registerProperties:function(e,t){t.registerProperty("MinimumX",e.setWorldXMin,e.getWorldXMin),t.registerProperty("MaximumX",e.setWorldXMax,e.getWorldXMax),t.registerProperty("MinimumY",e.setWorldYMin,e.getWorldYMin),t.registerProperty("MaximumY",e.setWorldYMax,e.getWorldYMax),t.registerProperty("Bounds",e.setWorldCoordinates,e.getWorldCoordinates),t.registerProperty("MarginX",e.setMarginX,e.getMarginX),t.registerProperty("MarginY",e.setMarginY,e.getMarginY),t.registerProperty("Parent",e.getGraphics().setParent,e.getGraphics().getParent),t.registerProperty("Width",e.getGraphics().setWidth,e.getGraphics().getWidth),t.registerProperty("Height",e.getGraphics().setHeight,e.getGraphics().getHeight),t.registerProperty("Graphics",e.setGraphics),t.registerProperty("Background",e.getStyle().setFillColor),t.registerProperty("Foreground",e.getStyle().setLineColor),t.registerProperty("LineColor",e.getStyle().setLineColor),t.registerProperty("LineWidth",e.getStyle().setLineWidth),t.registerProperty("DrawLines",e.getStyle().setDrawLines),t.registerProperty("FillColor",e.getStyle().setFillColor),t.registerProperty("DrawFill",e.getStyle().setDrawFill),t.registerProperty("ShapeRendering",e.getStyle().setShapeRendering),t.registerProperty("Visibility",e.getGraphics().getStyle().setVisibility),t.registerProperty("Display",e.getGraphics().getStyle().setDisplay),t.registerProperty("CSS",e.getGraphics().getStyle().setCSS)}},EJSS_DRAWING2D.simplePanel=function(e){var t={},r=EJSS_GRAPHICS.svgGraphics(e),n=EJSS_DRAWING2D.style(e),i=[],o=!1,a=[],s={xminPreferred:-1,xmaxPreferred:1,yminPreferred:-1,ymaxPreferred:1,xorigin:0,yorigin:0,xscale:1,yscale:1},l=!0,u=!0;return t.getName=function(){return e},t.getGraphics=function(){return r},t.importGraphics=function(e){return r.importSVG(e)},t.getStyle=function(){return n},t.setGraphics=function(t){t==EJSS_DRAWING2D.SimplePanel.GRAPHICS2D_SVG?r=EJSS_GRAPHICS.svgGraphics(e):t==EJSS_DRAWING2D.SimplePanel.GRAPHICS2D_CANVAS?console.log("WARNING: setGraphics() - Canvas not supported"):console.log("WARNING: setGraphics() - Graphics not supported")},t.setWorldXMin=function(e){e!==s.xminPreferred&&(s.xminPreferred=e,u=!0)},t.getWorldXMin=function(){return s.xminPreferred},t.setWorldXMax=function(e){e!==s.xmaxPreferred&&(s.xmaxPreferred=e,u=!0)},t.getWorldXMax=function(){return s.xmaxPreferred},t.setWorldYMin=function(e){e!==s.yminPreferred&&(s.yminPreferred=e,u=!0)},t.getWorldYMin=function(){return s.yminPreferred},t.setWorldYMax=function(e){e!==s.ymaxPreferred&&(s.ymaxPreferred=e,u=!0)},t.getWorldYMax=function(){return s.ymaxPreferred},t.setWorldCoordinates=function(e){t.setWorldXMin(e[0]),t.setWorldXMax(e[1]),t.setWorldYMin(e[2]),t.setWorldYMax(e[3])},t.getWorldCoordinates=function(){return[t.getWorldXMin(),t.getWorldXMax(),t.getWorldYMin(),t.getWorldYMax()]},t.addElement=function(e,r){EJSS_TOOLS.addToArray(i,e,r),e.setPanel(t),e.dataCollected&&a.push(e),o=!0},t.removeElement=function(e){EJSS_TOOLS.removeFromArray(i,e),e.setPanel(null),e.dataCollected&&EJSS_TOOLS.removeFromArray(a,e),o=!0},t.getElements=function(){return i},t.indexOfElement=function(e){return i.indexOf(e)},t.toPixelAxisY=function(e){return s.yorigin-e-s.yscale*s.yminPreferred},t.toPixelAxisX=function(e){return s.xorigin+e-s.xscale*s.xminPreferred},t._26=function(e){var t=[];return t[0]=s.xorigin+s.xscale*(e[0]-s.xminPreferred),t[1]=s.yorigin+s.yscale*(e[1]-s.yminPreferred),t},t.toPixelMod=function(e){var t=[];return t[0]=e[0]*s.xscale,t[1]=e[1]*s.yscale,t},t.toPanelPosition=function(e){var t=[];return t[0]=s.xminPreferred+(e[0]-s.xorigin)/s.xscale,t[1]=s.yminPreferred+(e[1]-s.yorigin)/s.yscale,t},t.toPanelMod=function(e){var t=[];return t[0]=0==s.xscale?0:e[0]/s.xscale,t[1]=0==s.yscale?0:e[1]/s.yscale,t},t.getPixelPositionWorldOrigin=function(){return[s.xorigin,s.yorigin]},t._27=function(){var e=r.getWidth(),t=r.getHeight(),n=e/(s.xmaxPreferred-s.xminPreferred),i=t/(s.ymaxPreferred-s.yminPreferred);s.xscale=n,s.yscale=-i,s.xorigin=.5,s.yorigin=t+.5,u=!1},t.reset=function(){r.reset()},t.render=function(){var e=!1;o&&(r.reset(),e=!0,o=!1);for(var n=0,s=a.length;n<s;n++)a[n].dataCollected();u&&t._27(),(l||e)&&r.drawPanel(t),r.draw(i,e),l=!1;for(var n=0,s=i.length;n<s;n++)i[n].setChanged(!1)},t.registerProperties=function(e){EJSS_DRAWING2D.SimplePanel.registerProperties(t,e)},n.setLineColor("black"),n.setFillColor("rgb(239,239,255)"),n.setChangeListener(function(e){l=!0}),t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Spring={},EJSS_DRAWING2D.spring=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.SpringSet={},EJSS_DRAWING2D.springSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Tank={},EJSS_DRAWING2D.tank=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Text={MODE_TOPDOWN:0,MODE_RIGTHLEFT:1,MODE_DOWNTOP:2,MODE_LEFTRIGHT:3,copyTo:function(e,t){EJSS_DRAWING2D.Element.copyTo(e,t),EJSS_DRAWING2D.Font.copyTo(e.getFont(),t.getFont()),t.setText(e.getText()),t.setWritingMode(e.getWritingMode())},registerProperties:function(e,t){EJSS_DRAWING2D.Element.registerProperties(e,t),t.registerProperty("Text",e.setText),t.registerProperty("Framed",e.setFramed),t.registerProperty("WritingMode",e.setWritingMode),t.registerProperty("Font",e.getFont().setFont),t.registerProperty("FontFamily",e.getFont().setFontFamily),t.registerProperty("FontSize",e.getFont().setFontSize),t.registerProperty("LetterSpacing",e.getFont().setLetterSpacing),t.registerProperty("OutlineColor",e.getFont().setOutlineColor),t.registerProperty("FontWeight",e.getFont().setFontWeight),t.registerProperty("FillColor",e.getFont().setFillColor),t.registerProperty("FontStyle",e.getFont().setFontStyle),t.registerProperty("MarginX",e.getMarginX().setMarginX),t.registerProperty("MarginY",e.getMarginY().setMarginY)}},EJSS_DRAWING2D.text=function(e){var t=EJSS_DRAWING2D.element(e),r="",n=EJSS_DRAWING2D.Text.MODE_LEFTRIGHT,i=EJSS_DRAWING2D.font(e),o=!1,a=0,s=0,l=[-1,-1];return t._23=function(){return"ElementText"},t.setText=function(e){e+="",r!=e&&(r=e,t.setChanged(!0),l=[-1,-1])},t.getText=function(){return r},t.setDrawingSize=function(e){l=e},t.getDrawingSize=function(){return l},t.getSizeX=function(){return l[0]},t.getSizeY=function(){return l[1]},t.setMarginX=function(e){a!=e&&(a=e,t.setChanged(!0))},t.getMarginX=function(){return a},t.setMarginY=function(e){s!=e&&(s=e,t.setChanged(!0))},t.getMarginY=function(){return s},t.getFont=function(){return i},t.setFramed=function(e){o!=e&&(o=e,t.setChanged(!0))},t.getFramed=function(){return o},t.setWritingMode=function(e){"string"==typeof e&&(e=EJSS_DRAWING2D.Text[e.toUpperCase()]),n!=e&&(n=e,t.setChanged(!0))},t.getWritingMode=function(){return n},t.registerProperties=function(e){EJSS_DRAWING2D.Text.registerProperties(t,e)},t.copyTo=function(e){EJSS_DRAWING2D.Text.copyTo(t,e)},i.setChangeListener(function(e){t.setChanged(!0)}),t.setPixelSize(!0),t},EJSS_DRAWING2D.TextSet={},EJSS_DRAWING2D.textSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Trace={},EJSS_DRAWING2D.trace=function(e){},EJSS_DRAWING2D.TraceSet={},EJSS_DRAWING2D.traceSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Trail={},EJSS_DRAWING2D.trail=function(e){},EJSS_DRAWING2D.TrailSet={},EJSS_DRAWING2D.trailSet=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.colorCoded=function(e,t){var r=EJSS_DRAWING2D.colorMapper(e,t),n=!1;return r.setSymmetricZ=function(e){n=e},r.isSymmetricZ=function(){return n},r.setAutoscale=function(e){for(var t=Number.MAX_VALUE,i=Number.MIN_VALUE,o=0,a=e.length;o<a;o++){var s=e[o];i=Math.max(i,s),t=Math.min(t,s)}var l=i,u=t;n&&(l=Math.max(Math.abs(t),Math.abs(i)),u=-l),r.setScale(u,l)},r.setAutoscaleArray2=function(e){for(var t=Number.MAX_VALUE,i=Number.MIN_VALUE,o=0,a=e.length;o<a;o++)for(var s=0,l=e[o].length;s<l;s++){var u=e[o][s];i=Math.max(i,u),t=Math.min(t,u)}var g=i,c=t;n&&(g=Math.max(Math.abs(t),Math.abs(i)),c=-g),r.setScale(c,g)},r.setAutoscaleArray3=function(e){for(var t=Number.MAX_VALUE,i=Number.MIN_VALUE,o=0,a=e.length;o<a;o++)for(var s=0,l=e[o].length;s<l;s++)for(var u=0,g=e[o][s].length;u<g;u++){var c=e[o][s][u];i=Math.max(i,c),t=Math.min(t,c)}var S=i,d=t;n&&(S=Math.max(Math.abs(t),Math.abs(i)),d=-S),r.setScale(d,S)},r};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.ColorMapper={CUSTOM:-1,SPECTRUM:0,GRAYSCALE:1,DUALSHADE:2,RED:3,GREEN:4,BLUE:5,BLACK:6,WIREFRAME:7,NORENDER:8,REDBLUE_SHADE:9,getColorPalette:function(e,t){function r(e,t,r){var n={h:Math.round(360*e),s:t,b:r},i={r:0,g:0,b:0};if(0===n.s)return i.r=i.g=i.b=n.h,i;var o=Math.floor(n.h/60),a=n.h/60-o,s=n.b*(1-n.s),l=n.b*(1-a*n.s),u=n.b*(1-(1-a)*n.s);switch(o){case 0:i.r=n.b,i.g=u,i.b=s;break;case 1:i.r=l,i.g=n.b,i.b=s;break;case 2:i.r=s,i.g=n.b,i.b=u;break;case 3:i.r=s,i.g=l,i.b=n.b;break;case 4:i.r=u,i.g=s,i.b=n.b;break;case 5:i.r=n.b,i.g=s,i.b=l}return i.r=Math.round(255*i.r),i.g=Math.round(255*i.g),i.b=Math.round(255*i.b),i}var n=EJSS_DRAWING2D.ColorMapper,i=[];e<2&&(e=2);for(var o=0;o<e;o++){
var a=o/(e-1)*.8,s=1,l=0,u=0,g=0;switch(t){case n.REDBLUE_SHADE:l=Math.floor(255*Math.max(0,-e-1+2*o)/(e-1)),g=Math.floor(255*Math.max(0,e-1-2*o)/(e-1)),i[o]="rgb("+l+","+u+","+g+")";break;case n.SPECTRUM:a=.8-a;var c=r(a,1,s);i[o]="rgb("+c.r+","+c.g+","+c.b+")";break;case n.GRAYSCALE:case n.BLACK:l=u=g=Math.floor(255*o/(e-1)),i[o]="rgb("+l+","+u+","+g+")";break;case n.RED:l=Math.floor(255*o/(e-1)),i[o]="rgb("+l+","+u+","+g+")";break;case n.GREEN:u=Math.floor(255*o/(e-1)),i[o]="rgb("+l+","+u+","+g+")";break;case n.BLUE:g=Math.floor(255*o/(e-1)),i[o]="rgb("+l+","+u+","+g+")";break;case n.DUALSHADE:default:var S=o/(e-1);a=.8*(1-S),s=.2+1.6*Math.abs(.5-S);var c=r(a,1,s);i[o]="rgb("+c.r+","+c.g+","+c.b+")"}}return i}},EJSS_DRAWING2D.colorMapper=function(e,t){var r,n,i,o=EJSS_DRAWING2D.ColorMapper,a={},s=[],l="darkgray",u="lightgray",g=-1,c=1;return a.setChangeListener=function(e){r=e},a.setPaletteType=function(t){"string"==typeof t&&(t=EJSS_DRAWING2D.ColorMapper[t.toUpperCase()]),n=t,l="darkgray",u="lightgray",n!=EJSS_DRAWING2D.ColorMapper.GRAYSCALE&&n!=EJSS_DRAWING2D.ColorMapper.BLACK||(l="rgb(64,64,128)",u="rgb(255,191,191)"),e=Math.max(2,e),s=o.getColorPalette(e,n),r&&r("palette")},a.getColors=function(){return s},a.getFloorColor=function(){return l},a.getCeilColor=function(){return u},a.getNumColors=function(){return e},a.setFloorCeilColor=function(e,t){l=e,u=t},a.setScale=function(e,t){g=e,c=t,i=new Array(s.length+1);for(var r=(c-g)/s.length,n=0,o=s.length;n<o;n++)i[n]=g+n*r;i[s.length]=c},a.getPaletteType=function(){return n},a.setColorPalette=function(t){l="darkgray",u="lightgray",s=t,e=t.length,n=EJSS_DRAWING2D.ColorMapper.CUSTOM,r&&r("colors")},a.setNumberOfColors=function(t){if(t!=e){if(e=t,n==EJSS_DRAWING2D.ColorMapper.CUSTOM){for(var i=[],o=0,s=Math.min(colors.length,e);o<s;o++)i[o]=colors[o];for(var o=colors.length;o<numColors;o++)i[o]=colors[colors.length-1];colors=i}else a.setPaletteType(n);r&&r("numColors")}},a.getNumberOfColors=function(){return e},a.doubleToIndex=function(e){if(g-e>Number.MIN_VALUE)return-1;if(e-c>Number.MIN_VALUE)return s.length;var t=0;return c!=g&&(t=Math.floor(s.length*(e-g)/(c-g))),t=Math.max(0,t),Math.min(t,s.length-1)},a.indexToColor=function(e){return e<0?l:e>=s.length?u:s[e]},a.doubleToColor=function(e){return a.indexToColor(a.doubleToIndex())},a.getColorThresholds=function(){return i},a.setPaletteType(t),a.setScale(-1,1),a};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Font={FONTSTYLES:["normal","italic","oblique","initial"],FONTWEIGHTS:["normal","lighter","bold","bolder","initial","100","200","300","400","500","600","700","800","900"],copyTo:function(e,t){t.setFontFamily(e.getFontFamily()),t.setFontSize(e.getFontSizeString()),t.setLetterSpacing(e.getLetterSpacing()),t.setOutlineColor(e.getOutlineColor()),t.setOutlineWidth(e.getOutlineWidth()),t.setFontWeight(e.getFontWeight()),t.setFillColor(e.getFillColor())}},EJSS_DRAWING2D.font=function(e){var t,r={},n="Arial",i="20",o="normal",a="none",s="1",l="normal",u="black",g="none";return r.setChangeListener=function(e){t=e},r.setFontFamily=function(e){n!=e&&(n=e,t&&t("fontFamily"))},r.getFontFamily=function(){return n},r.setFontSize=function(e){i!=e&&(i=e,t&&t("fontSize"))},r.getFontSize=function(){return isNaN(i)?-1!=i.indexOf("em")?10*+i.substr(0,i.indexOf("em")):-1!=i.indexOf("px")?+i.substr(0,i.indexOf("px")):0:+i},r.getFontSizeString=function(){return i},r.setLetterSpacing=function(e){o!=e&&(o=e,t&&t("letterSpacing"))},r.getLetterSpacing=function(){return o},r.getNumberLetterSpacing=function(){return isNaN(o)?-1!=o.indexOf("px")?+o.substr(0,o.indexOf("px")):1:+o},r.setOutlineColor=function(e){a!=e&&(a=e,t&&t("lineColor"))},r.getOutlineColor=function(){return a},r.setOutlineWidth=function(e){s!=e&&(s=e,t&&t("lineWidth"))},r.getOutlineWidth=function(){return s},r.setFontWeight=function(e){l!=e&&EJSS_DRAWING2D.Font.FONTWEIGHTS.indexOf(e)>-1&&(l=e,t&&t("fontWeight"))},r.getFontWeight=function(){return l},r.setFillColor=function(e){u!=e&&(u=e,t&&t("fillColor"))},r.getFillColor=function(){return u},r.setFontStyle=function(e){g!=e&&EJSS_DRAWING2D.Font.FONTSTYLES.indexOf(e)>-1&&(g=e,t&&t("fontstyle"))},r.getFontStyle=function(){return g},r.getFont=function(){return g+" "+s+" "+i+" "+n},r.setFont=function(e){if(!("string"!=typeof e||e.length<=0)){var t=e.split(" ");g=t[0],l=t[1];var r=t[2].split("/");i=r[0],t[3]&&(n=e.substring(e.indexOf(t[3])))}},r};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.functionsParser=function(){function e(e){function t(){}return t.prototype=e,new t}function t(e,t,r,n){this.type_=e,this.index_=t||0,this.prio_=r||0,this.number_=void 0!==n&&null!==n?n:0,this.toString=function(){switch(this.type_){case P:return this.number_;case T:case C:case N:return this.index_;case y:return"CALL";default:return"Invalid Token"}}}function r(e,t,r,n){this.tokens=e,this.ops1=t,this.ops2=r,this.functions=n}function n(e){return"string"==typeof e?(v.lastIndex=0,v.test(e)?"'"+e.replace(v,function(e){var t=R[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+"'":"'"+e+"'"):e}function i(e,t){return Number(e)+Number(t)}function o(e,t){return e-t}function a(e,t){return e*t}function s(e,t){return e/t}function l(e,t){return e%t}function u(e,t){return""+e+t}function g(e){return-e}function c(e){return Math.random()*(e||1)}function S(e){e=Math.floor(e);for(var t=e;e>1;)t*=--e;return t}function d(e,t){return Math.sqrt(e*e+t*t)}function E(e,t,r){return e?t:r}function f(e){return e<0?0:1}function p(e,t){return"[object Array]"!=Object.prototype.toString.call(e)?[e,t]:(e=e.slice(),e.push(t),e)}function h(e,t){return e>t?1:0}function m(e,t){return e<t?1:0}function A(e,t){return e==t?1:0}function _(e,t){return e!=t?1:0}function I(){this.success=!1,this.errormsg="",this.expression="",this.pos=0,this.tokennumber=0,this.tokenprio=0,this.tokenindex=0,this.tmpprio=0,this.ops1={sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,sqrt:Math.sqrt,log:Math.log,abs:Math.abs,ceil:Math.ceil,floor:Math.floor,round:Math.round,"-":g,neg:g,exp:Math.exp},this.ops2={"+":i,"-":o,"*":a,"/":s,"%":l,"^":Math.pow,",":p,"||":u,">":h,"<":m,"==":A,"!=":_},this.functions={random:c,fac:S,min:Math.min,max:Math.max,pyt:d,step:f,pow:Math.pow,atan2:Math.atan2,if:E},this.consts={E:Math.E,pi:Math.PI,PI:Math.PI}}var D={},P=0,T=1,C=2,N=3,y=4,v=/[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,R={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","'":"\\'","\\":"\\\\"};r.prototype={simplify:function(n){n=n||{};var i,o,a,s,l=[],u=[],g=this.tokens.length,c=0;for(c=0;c<g;c++){s=this.tokens[c];var S=s.type_;if(S===P)l.push(s);else if(S===N&&s.index_ in n)s=new t(P,0,0,n[s.index_]),l.push(s);else if(S===C&&l.length>1)o=l.pop(),i=l.pop(),a=this.ops2[s.index_],s=new t(P,0,0,a(i.number_,o.number_)),l.push(s);else if(S===T&&l.length>0)i=l.pop(),a=this.ops1[s.index_],s=new t(P,0,0,a(i.number_)),l.push(s);else{for(;l.length>0;)u.push(l.shift());u.push(s)}}for(;l.length>0;)u.push(l.shift());return new r(u,e(this.ops1),e(this.ops2),e(this.functions))},substitute:function(n,i){i instanceof r||(i=(new I).parse(String(i)));var o,a=[],s=this.tokens.length,l=0;for(l=0;l<s;l++){o=this.tokens[l];if(o.type_===N&&o.index_===n)for(var u=0;u<i.tokens.length;u++){var g=i.tokens[u],c=new t(g.type_,g.index_,g.prio_,g.number_);a.push(c)}else a.push(o)}return new r(a,e(this.ops1),e(this.ops2),e(this.functions))},evaluate:function(e){e=e||{};var t,r,n,i,o=[],a=this.tokens.length,s=0;for(s=0;s<a;s++){i=this.tokens[s];var l=i.type_;if(l===P)o.push(i.number_);else if(l===C)r=o.pop(),t=o.pop(),n=this.ops2[i.index_],o.push(n(t,r));else if(l===N)if(i.index_ in e)o.push(e[i.index_]);else{if(!(i.index_ in this.functions))throw new Error("undefined variable: "+i.index_);o.push(this.functions[i.index_])}else if(l===T)t=o.pop(),n=this.ops1[i.index_],o.push(n(t));else{if(l!==y)throw new Error("invalid Expression");if(t=o.pop(),n=o.pop(),!n.apply||!n.call)throw new Error(n+" is not a function");"[object Array]"==Object.prototype.toString.call(t)?o.push(n.apply(void 0,t)):o.push(n.call(void 0,t))}}if(o.length>1)throw new Error("invalid Expression (parity)");return o[0]},toString:function(e){var t,r,i,o,a=[],s=this.tokens.length,l=0;for(l=0;l<s;l++){o=this.tokens[l];var u=o.type_;if(u===P)a.push(n(o.number_));else if(u===C)r=a.pop(),t=a.pop(),i=o.index_,e&&"^"==i?a.push("Math.pow("+t+","+r+")"):a.push("("+t+i+r+")");else if(u===N)a.push(o.index_);else if(u===T)t=a.pop(),i=o.index_,"-"===i?a.push("("+i+t+")"):a.push(i+"("+t+")");else{if(u!==y)throw new Error("invalid Expression");t=a.pop(),i=a.pop(),a.push(i+"("+t+")")}}if(a.length>1)throw new Error("invalid Expression (parity)");return a[0]},variables:function(){for(var e=this.tokens.length,t=[],r=0;r<e;r++){var n=this.tokens[r];n.type_===N&&-1==t.indexOf(n.index_)&&t.push(n.index_)}return t},toJSFunction:function(e,t){return new Function(e,"with(Parser.values) { return "+this.simplify(t).toString(!0)+"; }")}},D.parse=function(e){return(new I).parse(e)},D.evaluate=function(e,t){return I.parse(e).evaluate(t)},I.Expression=r,I.values={sign:Math.sign,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,sqrt:Math.sqrt,log:Math.log,abs:Math.abs,ceil:Math.ceil,floor:Math.floor,round:Math.round,random:c,fac:S,exp:Math.exp,min:Math.min,max:Math.max,pyt:d,ifelse:E,step:f,pow:Math.pow,atan2:Math.atan2,E:Math.E,pi:Math.PI,PI:Math.PI};return I.prototype={parse:function(n){this.errormsg="",this.success=!0;var i=[],o=[];this.tmpprio=0;var a=77,s=0;for(this.expression=n,this.pos=0;this.pos<this.expression.length;)if(this.isOperator())this.isSign()&&64&a?(this.isNegativeSign()&&(this.tokenprio=2,this.tokenindex="-",s++,this.addfunc(o,i,T)),a=77):this.isComment()||(0==(2&a)&&this.error_parsing(this.pos,"unexpected operator"),s+=2,this.addfunc(o,i,C),a=77);else if(this.isNumber()){0==(1&a)&&this.error_parsing(this.pos,"unexpected number");var l=new t(P,0,0,this.tokennumber);o.push(l),a=50}else if(this.isString()){0==(1&a)&&this.error_parsing(this.pos,"unexpected string");var l=new t(P,0,0,this.tokennumber);o.push(l),a=50}else if(this.isLeftParenth())0==(8&a)&&this.error_parsing(this.pos,'unexpected "("'),128&a&&(s+=2,this.tokenprio=-2,this.tokenindex=-1,this.addfunc(o,i,y)),a=333;else if(this.isRightParenth()){if(256&a){var l=new t(P,0,0,[]);o.push(l)}else 0==(16&a)&&this.error_parsing(this.pos,'unexpected ")"');a=186}else if(this.isComma())0==(32&a)&&this.error_parsing(this.pos,'unexpected ","'),this.addfunc(o,i,C),s+=2,a=77;else if(this.isConst()){0==(1&a)&&this.error_parsing(this.pos,"unexpected constant");var u=new t(P,0,0,this.tokennumber);o.push(u),a=50}else if(this.isOp2())0==(4&a)&&this.error_parsing(this.pos,"unexpected function"),this.addfunc(o,i,C),s+=2,a=8;else if(this.isOp1())0==(4&a)&&this.error_parsing(this.pos,"unexpected function"),this.addfunc(o,i,T),s++,a=8;else if(this.isVar()){0==(1&a)&&this.error_parsing(this.pos,"unexpected variable");var g=new t(N,this.tokenindex,0,0);o.push(g),a=186}else this.isWhite()||(""===this.errormsg?this.error_parsing(this.pos,"unknown character"):this.error_parsing(this.pos,this.errormsg));for((this.tmpprio<0||this.tmpprio>=10)&&this.error_parsing(this.pos,'unmatched "()"');i.length>0;){var c=i.pop();o.push(c)}return s+1!==o.length&&this.error_parsing(this.pos,"parity"),new r(o,e(this.ops1),e(this.ops2),e(this.functions))},evaluate:function(e,t){return this.parse(e).evaluate(t)},error_parsing:function(e,t){throw this.success=!1,this.errormsg="parse error [column "+e+"]: "+t,new Error(this.errormsg)},addfunc:function(e,r,n){for(var i=new t(n,this.tokenindex,this.tokenprio+this.tmpprio,0);r.length>0&&i.prio_<=r[r.length-1].prio_;)e.push(r.pop());r.push(i)},isNumber:function(){for(var e=!1,t="";this.pos<this.expression.length;){var r=this.expression.charCodeAt(this.pos);if(!(r>=48&&r<=57||46===r))break;t+=this.expression.charAt(this.pos),this.pos++,this.tokennumber=parseFloat(t),e=!0}return e},unescape:function(e,t){for(var r=[],n=!1,i=0;i<e.length;i++){var o=e.charAt(i);if(n){switch(o){case"'":r.push("'");break;case"\\":r.push("\\");break;case"/":r.push("/");break;case"b":r.push("\b");break;case"f":r.push("\f");break;case"n":r.push("\n");break;case"r":r.push("\r");break;case"t":r.push("\t");break;case"u":var a=parseInt(e.substring(i+1,i+5),16);r.push(String.fromCharCode(a)),i+=4;break;default:throw this.error_parsing(t+i,"Illegal escape sequence: '\\"+o+"'")}n=!1}else"\\"==o?n=!0:r.push(o)}return r.join("")},isString:function(){var e=!1,t="",r=this.pos;if(this.pos<this.expression.length&&"'"==this.expression.charAt(this.pos))for(this.pos++;this.pos<this.expression.length;){var n=this.expression.charAt(this.pos);if("'"==n&&"\\"!=t.slice(-1)){this.pos++,this.tokennumber=this.unescape(t,r),e=!0;break}t+=this.expression.charAt(this.pos),this.pos++}return e},isConst:function(){var e;for(var t in this.consts){var r=t.length;if(e=this.expression.substr(this.pos,r),t===e)return this.tokennumber=this.consts[t],this.pos+=r,!0}return!1},isOperator:function(){var e=this.expression.charCodeAt(this.pos);if(43===e)this.tokenprio=0,this.tokenindex="+";else if(45===e)this.tokenprio=0,this.tokenindex="-";else if(124===e){if(124!==this.expression.charCodeAt(this.pos+1))return!1;this.pos++,this.tokenprio=0,this.tokenindex="||"}else if(61===e){if(61!==this.expression.charCodeAt(this.pos+1))return!1;this.pos++,this.tokenprio=0,this.tokenindex="=="}else if(33===e){if(61!==this.expression.charCodeAt(this.pos+1))return!1;this.pos++,this.tokenprio=0,this.tokenindex="!="}else if(42===e)this.tokenprio=1,this.tokenindex="*";else if(47===e)this.tokenprio=2,this.tokenindex="/";else if(37===e)this.tokenprio=2,this.tokenindex="%";else if(94===e)this.tokenprio=3,this.tokenindex="^";else if(60===e)this.tokenprio=2,this.tokenindex="<";else{if(62!==e)return!1;this.tokenprio=2,this.tokenindex=">"}return this.pos++,!0},isSign:function(){var e=this.expression.charCodeAt(this.pos-1);return 45===e||43===e},isPositiveSign:function(){return 43===this.expression.charCodeAt(this.pos-1)},isNegativeSign:function(){return 45===this.expression.charCodeAt(this.pos-1)},isLeftParenth:function(){return 40===this.expression.charCodeAt(this.pos)&&(this.pos++,this.tmpprio+=10,!0)},isRightParenth:function(){return 41===this.expression.charCodeAt(this.pos)&&(this.pos++,this.tmpprio-=10,!0)},isComma:function(){return 44===this.expression.charCodeAt(this.pos)&&(this.pos++,this.tokenprio=-1,this.tokenindex=",",!0)},isWhite:function(){var e=this.expression.charCodeAt(this.pos);return(32===e||9===e||10===e||13===e)&&(this.pos++,!0)},isOp1:function(){for(var e="",t=this.pos;t<this.expression.length;t++){var r=this.expression.charAt(t);if(r.toUpperCase()===r.toLowerCase()&&(t===this.pos||"_"!=r&&(r<"0"||r>"9")))break;e+=r}return e.length>0&&e in this.ops1&&(this.tokenindex=e,this.tokenprio=5,this.pos+=e.length,!0)},isOp2:function(){for(var e="",t=this.pos;t<this.expression.length;t++){var r=this.expression.charAt(t);if(r.toUpperCase()===r.toLowerCase()&&(t===this.pos||"_"!=r&&(r<"0"||r>"9")))break;e+=r}return e.length>0&&e in this.ops2&&(this.tokenindex=e,this.tokenprio=5,this.pos+=e.length,!0)},isVar:function(){for(var e="",t=this.pos;t<this.expression.length;t++){var r=this.expression.charAt(t);if(r.toUpperCase()===r.toLowerCase()&&(t===this.pos||"_"!=r&&(r<"0"||r>"9")))break;e+=r}return e.length>0&&(this.tokenindex=e,this.tokenprio=4,this.pos+=e.length,!0)},isComment:function(){return 47===this.expression.charCodeAt(this.pos-1)&&42===this.expression.charCodeAt(this.pos)&&(this.pos=this.expression.indexOf("*/",this.pos)+2,1===this.pos&&(this.pos=this.expression.length),!0)}},D};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.InteractionTarget={ENABLED_FIXED:0,ENABLED_NONE:0,ENABLED_ANY:1,ENABLED_X:2,ENABLED_Y:3,ENABLED_NO_MOVE:4,SENSITIVITY_BOTH:0,SENSITIVITY_HORIZONTAL:1,SENSITIVITY_VERTICAL:2,SENSITIVITY_ANY:3,copyTo:function(e,t){t.setMotionEnabled(e.getMotionEnabled()),t.setAffectsGroup(e.getAffectsGroup()),t.setActionCommand(e.getActionCommand()),t.setDataObject(e.getDataObject()),t.setSensitivity(e.getSensitivity())}},EJSS_DRAWING2D.interactionTarget=function(e,t,r){var n=EJSS_DRAWING2D.InteractionTarget,i={},o=EJSS_DRAWING2D.Element,a=n.ENABLED_NONE,s=!1,l=null,u=null,g=20,c=n.SENSITIVITY_BOTH;return i.getElement=function(){return e},i.getType=function(){return t},i.setMotionEnabled=function(e){"string"==typeof e?(value=n[e.toUpperCase()],a="undefined"==typeof value?n.ENABLED_NONE:value):a=e},i.getMotionEnabled=function(){return a},i.setSensitivityType=function(e){c="string"==typeof e?n[e.toUpperCase()]:e},i.getSensitivityType=function(){return c},i.isEnabled=function(){return a!=n.ENABLED_NONE},i.setPositionOffset=function(e){r=e},i.getPixelPosition=function(){var t=e.getPixelPosition(!0),n=e.getPixelSizes(!0),i=e.getRelativePositionOffset(n),a=t[0]+i[0],s=t[1]+i[1],l=e.getPanel().getInvertedScaleY(),u=o.getRelativePositionOffset(r,n[0],n[1],l);return[a-u[0],s-u[1]]},i.getPosition=function(){var t=e.getAbsolutePosition(!0),n=e.getAbsoluteSize(),i=e.getPanel().getInvertedScaleY(),a=o.getRelativePositionOffset(r,n[0],n[1],i),s=e.getRelativePositionOffset(n);return[t[0]+s[0]-a[0],t[1]+s[1]-a[1]]},i.setAffectsGroup=function(e){s=e},i.getAffectsGroup=function(){return s},i.setSensitivity=function(e){g=e},i.getSensitivity=function(){return g},i.setActionCommand=function(e){l=e},i.getActionCommand=function(){return l},i.setDataObject=function(e){u=e},i.getDataObject=function(){return u},i};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.PanelInteraction={TARGET_POSITION:0,TARGET_SIZE:1},EJSS_DRAWING2D.panelInteraction=function(e){function t(t,r,n,i){var o=EJSS_DRAWING2D.InteractionTarget,a=EJSS_DRAWING2D.PanelInteraction;if(r.getType()===a.TARGET_POSITION){var s=n[0]-i[0],l=n[1]-i[1];switch(r.getMotionEnabled()){case o.ENABLED_ANY:t.setX(t.getX()+s),t.setY(t.getY()+l),t.getController().propertiesChanged("Position","X","Y"),r.getElement().setChanged(!0),t.setChanged(!0);break;case o.ENABLED_X:t.setX(t.getX()+s),t.getController().propertiesChanged("Position","X"),r.getElement().setChanged(!0),t.setChanged(!0);break;case o.ENABLED_Y:t.setY(t.getY()+l),t.getController().propertiesChanged("Position","Y"),r.getElement().setChanged(!0),t.setChanged(!0)}}else if(r.getType()===a.TARGET_SIZE){if(2==f)var u=e.toPanelMod(h),s=u[0],l=-u[1];else var s=n[0]-i[0],l=n[1]-i[1];var g=r.getElement(),c=g.getAbsoluteSize();0===c[0]&&(c[0]=1e-5),0===c[1]&&(c[1]=1e-5);var S=[s/c[0],l/c[1]],d=t.getSize();switch(0===d[0]&&0!==S[0]&&(d[0]=1e-5),0===d[1]&&0!==S[0]&&(d[1]=1e-5),r.getMotionEnabled()){case o.ENABLED_ANY:t.setSizeX(d[0]+d[0]*S[0]),t.setSizeY(d[1]+d[1]*S[1]),t.getController().propertiesChanged("Size","SizeX","SizeY"),r.getElement().setChanged(!0),t.setChanged(!0);break;case o.ENABLED_X:t.setSizeX(d[0]+d[0]*S[0]),t.getController().propertiesChanged("Size","SizeX"),r.getElement().setChanged(!0),t.setChanged(!0);break;case o.ENABLED_Y:t.setSizeY(d[1]+d[1]*S[1]),t.getController().propertiesChanged("Size","SizeY"),r.getElement().setChanged(!0),t.setChanged(!0)}}}function r(t){var r=e.getGraphics().getBox(),n=r.left,i=r.top,o=[];if(void 0!==t.changedTouches)for(var a=0;a<t.changedTouches.length;a++)o[a]=[],o[a][0]=t.changedTouches[a].pageX-n,o[a][1]=t.changedTouches[a].pageY-i;else o[0]=[],o[0][0]=(t.clientX||t.x)-n,o[0][1]=(t.clientY||t.y)-i;return o}var n={},i=EJSS_DRAWING2D.PanelInteraction,o=!1,a=!1,s=!1,l=[],u=[],g=[],c=null,S=!1,d=!1,E=0,f=0,p=[0,0],h=[0,0],m=0,A="move",_=0;n.reload=function(){l=[],u=[],g=[],c=null,d=!1,E=0,f=0,p=[0,0],h=[0,0],m=0,_=0,o=!o,n.setEnabled(!o),a=!a,n.setStopGestures(!a)},n.getPanel=function(){return e},n.getEnabled=function(){return o},n.setStopMoveEvents=function(e){s!=e&&(s=e,s?n.setHandler("move",function(){return!0}):n.setHandler("move",n.handleMouseMoveEvent))},n.setStopGestures=function(e){a!=e&&(a=e,a?(n.setHandler("gesturestart",function(e){return e.preventDefault(),e.stopPropagation(),!1}),n.setHandler("gesturechange",function(e){return e.preventDefault(),e.stopPropagation(),!1}),n.setHandler("gestureend",function(e){return e.preventDefault(),e.stopPropagation(),!1})):(n.setHandler("gesturestart",function(){return!0}),n.setHandler("gesturechange",function(){return!0}),n.setHandler("gestureend",function(){return!0})))},n.setEnabled=function(e){o!=e&&(o=e,o?(s||n.setHandler("move",n.handleMouseMoveEvent),n.setHandler("down",n.handleMouseDownEvent),n.setHandler("up",n.handleMouseUpEvent),n.setHandler("mousewheel",n.handleMouseWheelEvent)):(n.setHandler("move",function(){return!0}),n.setHandler("down",function(){return!0}),n.setHandler("up",function(){return!0}),n.setHandler("mousewheel",function(){return!0})))},n.setCursorTypeForMove=function(e){A=e},n.getInteractionPoint=function(){return e.toPanelPosition(l)},n.getInteractionDistance=function(){if(0==g.length||0==l.length)return[];var t=e.toPanelPosition(g),r=e.toPanelPosition(l);return[t[0]-r[0],t[1]-r[1]]},n.getInteractionBounds=function(){if(0==u.length||0==l.length)return[];var t=e.toPanelPosition(u),r=e.toPanelPosition(l);return[t[0],r[0],t[1],r[1]]},n.getInteractionZoomDelta=function(){return 0==m&&0==h[0]?0:m>0||h[0]>0?1:-1},n.getInteractionElement=function(){return c},n.clearInteractionElement=function(e){c&&e===c.getElement()&&(c=null)},n.getOrientation=function(){return window.orientation},n.handleMouseMoveEvent=function(i){if(a&&(i.preventDefault(),i.stopPropagation()),2==(void 0!==i.touches?i.touches.length:1)){var s=i.touches[0],u=i.touches[1],E=s.clientX||s.x,m=s.clientY||s.y,_=u.clientX||u.x,I=u.clientY||u.y;if(0!=f){var D=[Math.abs(E-_),Math.abs(m-I)],P=[D[0]-p[0],D[1]-p[1]];P[0]<8&&P[0]>-8&&P[1]<8&&P[1]>-8?h=[0,0]:(h=P,p=D)}else f=1,p=[Math.abs(E-_),Math.abs(m-I)],h=[0,0]}else f=0,p=[0,0];var T=r(i);if(g=l,l=T[T.length-1],d)if(null!=c){var C=c.getAffectsGroup()?c.getElement().getGroup():c.getElement(),N=e.toPanelPosition(l),y=e.toPanelPosition(g);t(C,c,N,y),C.getController().invokeAction("OnDrag"),o&&e.getController().invokeAction("OnMove")}else if(S)o&&e.getController().invokeAction("OnDrag");else{for(var v=[],R=0;R<T.length;R++){var O=n.findInteractionTarget(e.getElements(),T[R]);if(null!=O){v.push(O);var C=O.getAffectsGroup()?O.getElement().getGroup():O.getElement(),N=e.toPanelPosition(T[R]);t(C,O,N,O.getPosition()),C.getController().invokeAction("OnDrag"),o&&e.getController().invokeAction("OnMove")}}o&&(0==f?e.getController().invokeAction("OnDrag"):1==f&&0==v.length&&e.getController().invokeAction("OnZoom"))}else{var O=n.findInteractionTarget(e.getElements(),T[0]);null===O?(null!=c&&c.getElement().getController().invokeAction("OnExit"),o&&e.getController().invokeAction("OnMove"),i.target.style.cursor="default"):(c!=O&&(null!=c&&c.getElement().getController().invokeAction("OnExit"),O.getElement().getController().invokeAction("OnEnter")),O.isEnabled()?i.target.style.cursor=A:i.target.style.cursor="default"),c=O}return e.getController().reportInteractions(),!1},n.handleMouseDownEvent=function(t){d=!0,s&&n.setHandler("move",n.handleMouseMoveEvent),a&&(t.preventDefault(),t.stopPropagation());var i=void 0!==t.touches?t.touches.length:1;2!=i&&(f=0);var E=r(t);u=E[0],g=u,l=E[E.length-1];for(var p=!1,h=null,m=0;m<E.length;m++)h=n.findInteractionTarget(e.getElements(),E[m]),null!==h?(h.getElement().getController().invokeAction("OnPress"),t.target.style.cursor=A):o&&(e.getController().invokeAction("OnPress"),p=!0);return 1==E.length&&1==i?(c=h,S=p):(c=null,S=!1),e.getController().reportInteractions(),!1},n.handleMouseUpEvent=function(t){d=!1,s&&n.setHandler("move",function(){return!0}),a&&(t.preventDefault(),t.stopPropagation()),0!=f&&(f=0,h=[0,0],p=[0,0]);var i=r(t);g=l,l=i[i.length-1];var u=t.timeStamp-E<500;if(null!=c)c.getElement().getController().invokeAction("OnRelease"),u&&c.getElement().getController().invokeAction("OnDoubleClick");else for(var S=0;S<i.length;S++){var m=n.findInteractionTarget(e.getElements(),i[S]);null!==m?(m.getElement().getController().invokeAction("OnRelease"),u&&m.getElement().getController().invokeAction("OnDoubleClick")):o&&(e.getController().invokeAction("OnRelease"),u&&e.getController().invokeAction("OnDoubleClick"))}return E=t.timeStamp,t.target.style.cursor="default",e.getController().reportInteractions(),!1},n.handleMouseWheelEvent=function(t){0==(void 0!==t.touches?t.touches.length:0)&&(a&&(t.preventDefault(),t.stopPropagation()),m=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail)),e.getController().invokeAction("OnZoom"),e.getController().reportInteractions())},n.findInteractionTarget=function(t,r){for(var o=EJSS_DRAWING2D.InteractionTarget,a=null,s=t.length-1;s>=0;s--){var l=t[s];if(l.isGroupVisible())if(l.getElements){if(null!==(a=n.findInteractionTarget(l.getElements(),r)))return a}else{for(var u=l.getInteractionTargets(),g=0;g<u.length;g++)if(u[g].isEnabled()){var c=u[g].getSensitivity();if(c>0){var S=u[g].getPixelPosition(),d=!1;switch(u[g].getSensitivityType()){case o.SENSITIVITY_HORIZONTAL:d=Math.abs(S[1]-r[1])<c;break;case o.SENSITIVITY_VERTICAL:d=Math.abs(S[0]-r[0])<c;break;case o.SENSITIVITY_ANY:d=Math.abs(S[0]-r[0])<c||Math.abs(S[1]-r[1])<c;break;default:d=Math.abs(S[0]-r[0])<c&&Math.abs(S[1]-r[1])<c}if(d)return _=s,u[g]}}if(0!=f&&(a=l.getInteractionTarget(i.TARGET_SIZE),a.isEnabled()&&!a.getSensitivity())){var E=l.getAbsoluteBounds(),p=e.toPanelPosition(r);if(E.left<p[0]&&E.right>p[0]&&E.bottom<p[1]&&E.top>p[1])return _=s,f=2,a}if(a=l.getInteractionTarget(i.TARGET_POSITION),a.isEnabled()&&!a.getSensitivity()){var E=l.getAbsoluteBounds(),p=e.toPanelPosition(r);if(E.left<p[0]&&E.right>p[0]&&E.bottom<p[1]&&E.top>p[1])return _=s,a}}}return null},n.getIndexElement=function(){return _},n.setHandler=function(t,r){var n=e.getGraphics(),i=n.getEventContext();switch(t){case"move":i.addEventListener("mousemove",r,!1),i.addEventListener("touchmove",r,!1);break;case"down":i.addEventListener("mousedown",r,!1),i.addEventListener("touchstart",r,!1);break;case"up":i.addEventListener("mouseup",r,!1),i.addEventListener("touchend",r,!1);break;case"mousewheel":i.addEventListener("mousewheel",r,!1);break;case"gesturestart":i.addEventListener("gesturestart",r,!1);break;case"gesturechange":i.addEventListener("gesturechange",r,!1);break;case"gestureend":i.addEventListener("gestureend",r,!1)}return!1};var I=window.onorientationchange;window.onorientationchange=function(){I&&I(),e.getController().invokeAction("OnOrientationChange"),e.getController().reportInteractions()};var D=window.onresize;return window.onresize=function(){D&&D(),e.getController().invokeAction("OnResize"),e.getController().reportInteractions()},n.setStopGestures(!0),n};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Style={RENDER_AUTO:"auto",RENDER_OPTSPEED:"optimizeSpeed",RENDER_CRISPEDGES:"crispEdges",RENDER_GEOPRECISION:"geometricPrecision",copyTo:function(e,t){t.setDrawLines(e.getDrawLines()),t.setLineColor(e.getLineColor()),t.setLineWidth(e.getLineWidth()),t.setDrawFill(e.getDrawFill()),t.setFillColor(e.getFillColor()),t.setAttributes(e.getAttributes()),t.setShapeRendering(e.getShapeRendering())}},EJSS_DRAWING2D.style=function(e){var t,r=EJSS_DRAWING2D.Style,n={},i=!0,o="black",a=.5,s=!0,l="none",u=r.RENDER_AUTO,g={};return n.setChangeListener=function(e){t=e},n.setDrawLines=function(e){e!=i&&(i=e,t&&t("drawlines"))},n.getDrawLines=function(){return i},n.setLineColor=function(e){return"string"!=typeof e&&(e=EJSS_TOOLS.DisplayColors.getLineColor(e)),e!=o&&(o=e,t&&t("linecolor")),n},n.getLineColor=function(){return o},n.setLineWidth=function(e){e!=a&&(a=e,t&&t("linewidth"))},n.getLineWidth=function(){return a},n.setDrawFill=function(e){e!=s&&(s=e,t&&t("drawfill"))},n.getDrawFill=function(){return s},n.setFillColor=function(e){"string"!=typeof e&&(e=EJSS_TOOLS.DisplayColors.getLineColor(e)),e!=l&&(l=e,t&&t("fillcolor"))},n.getFillColor=function(){return l},n.setShapeRendering=function(e){"RENDER"==e.substring(0,6)&&(e=r[e.toUpperCase()]),u!=e&&(u=e,t&&t("shaperendering"))},n.getShapeRendering=function(){return u},n.setAttributes=function(e){e!=g&&(g=e,t&&t("attributes"))},n.getAttributes=function(){return g},n.serialize=function(){return{mDrawLines:i,mLineColor:o,mLineWidth:a,mDrawFill:s,mFillColor:l,mShapeRendering:u,mAttributes:g}},n.unserialize=function(e){i=e.mDrawLines,o=e.mLineColor,a=e.mLineWidth,s=e.mDrawFill,l=e.mFillColor,u=e.mShapeRendering,g=e.mAttributes},n};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Transformation={compare:function(e,t){return e.radians==t.radians&&e.a==t.a&&e.b==t.b&&e.c==t.c&&e.d==t.d&&e.e==t.e&&e.f==t.f}},EJSS_DRAWING2D.transformation=function(e){e=e||{a:1,b:0,c:0,d:1,e:0,f:0};var t={a:e.a,c:e.c,e:e.e,b:e.b,d:e.d,f:e.f,radians:0};return t.toString=function(){return"a="+t.a+", c="+t.c+", e="+t.e+"\nb="+t.b+", d="+t.d+", f="+t.f},t.setToIdentity=function(){t.a=1,t.c=0,t.e=0,t.b=0,t.d=1,t.f=0,radians=0},t.setTransform=function(e){Array.isArray(e)&&e.length>5?(t.a=e[0],t.c=e[2],t.e=e[4],t.b=e[1],t.d=e[3],t.f=e[5]):(t.a=e.a,t.c=e.c,t.e=e.e,t.b=e.b,t.d=e.d,t.f=e.f,t.radians=e.radians)},t.setToTranslation=function(e,r){t.a=1,t.c=0,t.e=e,t.b=0,t.d=1,t.f=r},t.setToRotation=function(e){var r=Math.cos(e),n=Math.sin(e);t.a=r,t.c=-n,t.e=0,t.b=n,t.d=r,t.f=0,t.radians=e},t.getRotation=function(){return t.radians},t.translate=function(e,r){t.e+=e,t.f+=r},t.scale=function(e,r){t.a*=e,t.b*=e,t.c*=r,t.d*=r},t.concatenate=function(e){var r=t.a,n=t.b,i=t.c,o=t.d,a=t.e,s=t.f;t.a=r*e.a+i*e.b,t.b=n*e.a+o*e.b,t.c=r*e.c+i*e.d,t.d=n*e.c+o*e.d,t.e=r*e.e+i*e.f+a,t.f=n*e.e+o*e.f+s,t.radians+=e.radians},t.transform=function(e){var r=e[0],n=e[1];return e[0]=t.a*r+t.c*n+t.e,e[1]=t.b*r+t.d*n+t.f,e},t.transformVector=function(e){var r=e[0],n=e[1];return e[0]=t.a*r+t.c*n,e[1]=t.b*r+t.d*n,e},t.inverseTransform=function(e){var r=t.a,n=t.b,i=t.c,o=t.d,a=t.e,s=t.f,l=r*o-n*i;if(0===l)return null;var u=e[0],g=e[1];return e[0]=(o*u-i*g+(i*s-o*a))/l,e[1]=(-n*u+r*g+(n*a-r*s))/l,e},t};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.Video={},EJSS_DRAWING2D.video=function(e){};var EJSS_DRAWING2D=EJSS_DRAWING2D||{};EJSS_DRAWING2D.WebCamImage={},EJSS_DRAWING2D.webCamImage=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.AnalyticCurve={},EJSS_DRAWING3D.analyticCurve=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.AnalyticSurface={},EJSS_DRAWING3D.analyticSurface=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Arrow={},EJSS_DRAWING3D.arrow=function(e){},EJSS_DRAWING3D.ArrowSet={},EJSS_DRAWING3D.arrowSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Basic={},EJSS_DRAWING3D.basic=function(e){},EJSS_DRAWING3D.BasicSet={},EJSS_DRAWING3D.basicSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Box={},EJSS_DRAWING3D.box=function(e){},EJSS_DRAWING3D.BoxSet={},EJSS_DRAWING3D.boxSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Cone={},EJSS_DRAWING3D.cone=function(e){},EJSS_DRAWING3D.ConeSet={},EJSS_DRAWING3D.coneSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Cylinder={},EJSS_DRAWING3D.cylinder=function(e){},EJSS_DRAWING3D.CylinderSet={},EJSS_DRAWING3D.cylinderSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Disk={},EJSS_DRAWING3D.disk=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.DrawingPanel={},EJSS_DRAWING3D.drawingPanel=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Element={},EJSS_DRAWING3D.element=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.ElementSet={},EJSS_DRAWING3D.elementSet=function(e,t){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Ellipsoid={},EJSS_DRAWING3D.ellipsoid=function(e){},EJSS_DRAWING3D.EllipsoidSet={},EJSS_DRAWING3D.ellipsoidSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Group={},EJSS_DRAWING3D.group=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.panelInteraction=function(e){function t(t){var r,n,i=e.getGraphics().getBox(),o=i.left,a=i.top;return void 0!==t.changedTouches&&1===t.changedTouches.length?(r=t.changedTouches[0].pageX,n=t.changedTouches[0].pageY):(r=t.x||t.clientX,n=t.y||t.clientY),[r-o,n-a]}var r={},n=!1,i=[0,0],o=0,a=0,s=!1,l=0,u=0,g=0,c=0,S=!1,d=[0,0];return r.getPanel=function(){return e},r.getEnabled=function(){return n},r.setEnabled=function(e){n!=e&&(n=e,n?(r.setHandler("move",r.handleMouseMoveEvent),r.setHandler("down",r.handleMouseDownEvent),r.setHandler("up",r.handleMouseUpEvent),r.setHandler("mousewheel",r.handleMouseWheelEvent)):(r.setHandler("move",function(){}),r.setHandler("down",function(){}),r.setHandler("up",function(){}),r.setHandler("mousewheel",function(){})))},r.getInteractionPoint=function(){return i},r.getInteractionDeltas=function(){return[o,a]},r.getInteractionZoomDelta=function(){return g},r.handleMouseWheelEvent=function(t){0==(void 0!==t.touches?t.touches.length:0)&&(t.preventDefault(),g=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail)),e.getController().invokeAction("OnZoom"),e.getController().reportInteractions())},r.handlePinchGesture=function(t){t.timeStamp-u>100&&(t.preventDefault(),t.scale<c?g=1:t.scale>=c&&(g=-1),c=t.scale,e.getController().invokeAction("OnZoom"),e.getController().reportInteractions(),u=t.timeStamp)},r.handleMouseMoveEvent=function(r){var n=void 0!==r.touches?r.touches.length:1;if(1==n){var l=i[0],c=i[1];i=t(r),o=i[0]-l,a=i[1]-c,s?(e.getController().invokeAction("OnDrag"),r.target.style.cursor="move"):r.target.style.cursor="default"}if(2==n){if(r.timeStamp-u>25){r.preventDefault();var E=r.touches[0],f=r.touches[1],p=E.clientX||E.x,h=E.clientY||E.y,m=f.clientX||f.x,A=f.clientY||f.y;if(S){var _=[Math.abs(p-m),Math.abs(h-A)],I=_[0]-d[0];I<3&&I>-3?g=0:(g=I,d=_),e.getController().invokeAction("OnZoom")}else S=!0,d=[Math.abs(p-m),Math.abs(h-A)],g=0;u=r.timeStamp}}else S=!1,d=[0,0];e.getController().reportInteractions()},r.handleMouseDownEvent=function(n){1==(void 0!==n.touches?n.touches.length:1)&&(s=!0,i=t(n),e.getController().invokeAction("OnPress"),r.pick(i[0],i[1]),n.preventDefault(),e.getController().reportInteractions()),S=!1},r.handleMouseUpEvent=function(r){1==(void 0!==r.touches?r.touches.length:1)&&(s=!1,i=t(r),e.getController().invokeAction("OnRelease"),r.target.style.cursor="default",r.timeStamp-l<500&&e.getController().invokeAction("OnDoubleClick"),l=r.timeStamp,e.getController().reportInteractions()),S=!1},r.setHandler=function(t,r){var n=e.getGraphics(),i=n.getEventContext();switch(t){case"move":i.addEventListener("mousemove",r,!1),i.addEventListener("touchmove",r,!1);break;default:case"down":i.addEventListener("mousedown",r,!1),i.addEventListener("touchstart",r,!1);break;case"up":i.addEventListener("mouseup",r,!1),i.addEventListener("touchend",r,!1);break;case"mousewheel":i.addEventListener("mousewheel",r,!1);break;case"pinch":i.addEventListener("gesturestart",function(e){c=1},!1),i.addEventListener("gesturechange",r,!1)}return!1},r.pick=function(t,r){var n=t-1,i=r-1,o=e.getGraphics().getContext();if(o){var a=new Uint8Array(4);o.readPixels(n,i,1,1,o.RGBA,o.UNSIGNED_BYTE,a),a.data&&(a=a.data)}},r};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Style={copyTo:function(e,t){t.setClosedTop(e.getClosedTop()),t.setClosedBottom(e.getClosedBottom()),t.setClosedLeft(e.getClosedLeft()),t.setClosedRight(e.getClosedRight()),t.setDrawLines(e.getDrawLines()),t.setLineColor(e.getLineColor()),t.setLineWidth(e.getLineWidth()),t.setDrawFill(e.getDrawFill()),t.setTransparency(e.getTransparency()),t.setAmbientColor(e.getAmbientColor()),t.setFillColor(e.getFillColor()),t.setSpecularColor(e.getSpecularColor()),t.setAmbientReflection(e.getAmbientReflection()),t.setColorReflection(e.getColorReflection()),t.setSpecularReflection(e.getSpecularReflection()),t.setShininessVal(e.getShininessVal()),t.setPaletteFloor(e.getPaletteFloor()),t.setPaletteCeil(e.getPaletteCeil()),t.setPaletteFloorColor(e.getPaletteFloorColor()),t.setPaletteCeilColor(e.getPaletteCeilColor())}},EJSS_DRAWING3D.style=function(e){var t,r,n,i,o={},a=!0,s=!0,l=!0,u=!0,g=[0,0,0],c=.5,S=[0,0,0],d=[0,0,0],E=[1,1,1],f=1,p=1,h=1,m=10,A=[1,0,-1],_=[-1,0,1],I=!1,D=!0,P=0;return o.setProjChangeListener=function(e){n=e},o.setMeshChangeListener=function(e){i=e},o.setClosedTop=function(e){e!=a&&(a=e,i&&i("closedtop"))},o.getClosedTop=function(){return a},o.setClosedBottom=function(e){e!=s&&(s=e,i&&i("closedbottom"))},o.getClosedBottom=function(){return s},o.setClosedLeft=function(e){e!=l&&(l=e,i&&i("closedleft"))},o.getClosedLeft=function(){return l},o.setClosedRight=function(e){e!=u&&(u=e,i&&i("closedright"))},o.getClosedRight=function(){return u},o.setDrawLines=function(e){e!=I&&(I=e,n&&n("drawlines"))},o.getDrawLines=function(){return I},o.setLineColor=function(e){return"string"==typeof e&&(e=EJSS_TOOLS.DisplayColors.getArrayColor(e)),EJSS_TOOLS.compareArrays(e,g)||(g=e.slice(),n&&n("linecolor")),o},o.getLineColor=function(){return g},o.setLineWidth=function(e){e!=c&&(c=e,n&&n("linewidth"))},o.getLineWidth=function(){return c},o.setDrawFill=function(e){e!=D&&(D=e,n&&n("drawfill"))},o.getDrawFill=function(){return D},o.setFillColor=function(e){"string"==typeof e&&(e=EJSS_TOOLS.DisplayColors.getArrayColor(e)),EJSS_TOOLS.compareArrays(e,d)||(d=e.slice(),n&&n("fillcolor"))},o.getFillColor=function(){return d},o.setAmbientColor=function(e){"string"==typeof e&&(e=EJSS_TOOLS.DisplayColors.getArrayColor(e)),EJSS_TOOLS.compareArrays(e,S)||(S=e.slice(),n&&n("ambientcolor"))},o.getAmbientColor=function(){return S},o.setSpecularColor=function(e){"string"==typeof e&&(e=EJSS_TOOLS.DisplayColors.getArrayColor(e)),EJSS_TOOLS.compareArrays(e,E)||(E=e.slice(),n&&n("specularcolor"))},o.getSpecularColor=function(){return E},o.setAmbientReflection=function(e){f!=e&&(f=e,n&&n("ambientreflection"))},o.getAmbientReflection=function(){return f},o.setColorReflection=function(e){p!=e&&(p=e,n&&n("colorreflection"))},o.getColorReflection=function(){return p},o.setSpecularReflection=function(e){h!=e&&(h=e,n&&n("specularreflection"))},o.getSpecularReflection=function(){return h},o.setShininessVal=function(e){m!=e&&(m=e,n&&n("shininess"))},o.getShininessVal=function(){return m},o.setTransparency=function(e){e!=P&&(P=e,n&&n("transparency"))},o.getTransparency=function(){return P},o.setPaletteFloor=function(e){e&&!EJSS_TOOLS.compareArrays(e,t)&&(t=e.slice(),n&&n("palettefloor"))},o.getPaletteFloor=function(){return t},o.setPaletteCeil=function(e){e&&!EJSS_TOOLS.compareArrays(e,r)&&(r=e.slice(),n&&n("paletteceil"))},o.getPaletteCeil=function(){return r},o.setPaletteFloorColor=function(e){EJSS_TOOLS.compareArrays(e,A)||(A=e.slice(),n&&n("palettefloorcolor"))},o.getPaletteFloorColor=function(){return A},o.setPaletteCeilColor=function(e){EJSS_TOOLS.compareArrays(e,_)||(_=e.slice(),n&&n("paletteceilcolor"))},o.getPaletteCeilColor=function(){return _},o};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Transformation={registerProperties:function(e,t){e.setController(t),t.registerProperty("Parent",e.setParent,e.getParent),t.registerProperty("Axis",e.setAxis,e.getAxis),t.registerProperty("Angle",e.setAngle,e.getAngle),t.registerProperty("Origin",e.setOrigin,e.getOrigin)}},EJSS_DRAWING3D.rotationX=function(e){var t=EJSS_DRAWING3D.transformation();return t.setAxis([1,0,0]),t},EJSS_DRAWING3D.rotationY=function(e){var t=EJSS_DRAWING3D.transformation();return t.setAxis([0,1,0]),t},EJSS_DRAWING3D.rotationZ=function(e){var t=EJSS_DRAWING3D.transformation();return t.setAxis([0,0,1]),t},EJSS_DRAWING3D.transformation=function(e){var t={},r=null,n=[0,0,0,1,0,0,0],i={propertiesChanged:function(){},invokeAction:function(){}};return t.getArray=function(){return n},t.setChanged=function(e){e&&r.setProjChanged(!0)},t.setParent=function(e){r&&r.removeExtraTransformation(t),(r=e)&&r.addExtraTransformation(t)},t.getParent=function(){return r},t.setAngle=function(e){n[0]=e},t.getAngle=function(){return n[0]},t.setAxis=function(e){n[1]=e[0],n[2]=e[1],n[3]=e[2]},t.getAxis=function(){return n.slice(1,4)},t.setOrigin=function(e){n[4]=e[0],n[5]=e[1],n[6]=e[2]},t.getOrigin=function(){return n.slice(5)},t.getController=function(){return i},t.setController=function(e){i=e},t.registerProperties=function(e){EJSS_DRAWING3D.Transformation.registerProperties(t,e)},t};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.analyticCurve=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.analyticSurface=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.arrow=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.basic=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.box=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.cylinder=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.ellipsoid=function(e,t){};var hasFloat32Array="undefined"!=typeof Float32Array;Matrix.prototype={inverse:function(){return Matrix.inverse(this,new Matrix)},transpose:function(){return Matrix.transpose(this,new Matrix)},multiply:function(e){return Matrix.multiply(this,e,new Matrix)},transformPoint:function(e){var t=this.m;return new Vector(t[0]*e.x+t[1]*e.y+t[2]*e.z+t[3],t[4]*e.x+t[5]*e.y+t[6]*e.z+t[7],t[8]*e.x+t[9]*e.y+t[10]*e.z+t[11]).divide(t[12]*e.x+t[13]*e.y+t[14]*e.z+t[15])},transformVector:function(e){var t=this.m;return new Vector(t[0]*e.x+t[1]*e.y+t[2]*e.z,t[4]*e.x+t[5]*e.y+t[6]*e.z,t[8]*e.x+t[9]*e.y+t[10]*e.z)}},Matrix.inverse=function(e,t){t=t||new Matrix;var r=e.m,n=t.m;n[0]=r[5]*r[10]*r[15]-r[5]*r[14]*r[11]-r[6]*r[9]*r[15]+r[6]*r[13]*r[11]+r[7]*r[9]*r[14]-r[7]*r[13]*r[10],n[1]=-r[1]*r[10]*r[15]+r[1]*r[14]*r[11]+r[2]*r[9]*r[15]-r[2]*r[13]*r[11]-r[3]*r[9]*r[14]+r[3]*r[13]*r[10],n[2]=r[1]*r[6]*r[15]-r[1]*r[14]*r[7]-r[2]*r[5]*r[15]+r[2]*r[13]*r[7]+r[3]*r[5]*r[14]-r[3]*r[13]*r[6],n[3]=-r[1]*r[6]*r[11]+r[1]*r[10]*r[7]+r[2]*r[5]*r[11]-r[2]*r[9]*r[7]-r[3]*r[5]*r[10]+r[3]*r[9]*r[6],n[4]=-r[4]*r[10]*r[15]+r[4]*r[14]*r[11]+r[6]*r[8]*r[15]-r[6]*r[12]*r[11]-r[7]*r[8]*r[14]+r[7]*r[12]*r[10],
n[5]=r[0]*r[10]*r[15]-r[0]*r[14]*r[11]-r[2]*r[8]*r[15]+r[2]*r[12]*r[11]+r[3]*r[8]*r[14]-r[3]*r[12]*r[10],n[6]=-r[0]*r[6]*r[15]+r[0]*r[14]*r[7]+r[2]*r[4]*r[15]-r[2]*r[12]*r[7]-r[3]*r[4]*r[14]+r[3]*r[12]*r[6],n[7]=r[0]*r[6]*r[11]-r[0]*r[10]*r[7]-r[2]*r[4]*r[11]+r[2]*r[8]*r[7]+r[3]*r[4]*r[10]-r[3]*r[8]*r[6],n[8]=r[4]*r[9]*r[15]-r[4]*r[13]*r[11]-r[5]*r[8]*r[15]+r[5]*r[12]*r[11]+r[7]*r[8]*r[13]-r[7]*r[12]*r[9],n[9]=-r[0]*r[9]*r[15]+r[0]*r[13]*r[11]+r[1]*r[8]*r[15]-r[1]*r[12]*r[11]-r[3]*r[8]*r[13]+r[3]*r[12]*r[9],n[10]=r[0]*r[5]*r[15]-r[0]*r[13]*r[7]-r[1]*r[4]*r[15]+r[1]*r[12]*r[7]+r[3]*r[4]*r[13]-r[3]*r[12]*r[5],n[11]=-r[0]*r[5]*r[11]+r[0]*r[9]*r[7]+r[1]*r[4]*r[11]-r[1]*r[8]*r[7]-r[3]*r[4]*r[9]+r[3]*r[8]*r[5],n[12]=-r[4]*r[9]*r[14]+r[4]*r[13]*r[10]+r[5]*r[8]*r[14]-r[5]*r[12]*r[10]-r[6]*r[8]*r[13]+r[6]*r[12]*r[9],n[13]=r[0]*r[9]*r[14]-r[0]*r[13]*r[10]-r[1]*r[8]*r[14]+r[1]*r[12]*r[10]+r[2]*r[8]*r[13]-r[2]*r[12]*r[9],n[14]=-r[0]*r[5]*r[14]+r[0]*r[13]*r[6]+r[1]*r[4]*r[14]-r[1]*r[12]*r[6]-r[2]*r[4]*r[13]+r[2]*r[12]*r[5],n[15]=r[0]*r[5]*r[10]-r[0]*r[9]*r[6]-r[1]*r[4]*r[10]+r[1]*r[8]*r[6]+r[2]*r[4]*r[9]-r[2]*r[8]*r[5];for(var i=r[0]*n[0]+r[1]*n[4]+r[2]*n[8]+r[3]*n[12],o=0;o<16;o++)n[o]/=i;return t},Matrix.transpose=function(e,t){t=t||new Matrix;var r=e.m,n=t.m;return n[0]=r[0],n[1]=r[4],n[2]=r[8],n[3]=r[12],n[4]=r[1],n[5]=r[5],n[6]=r[9],n[7]=r[13],n[8]=r[2],n[9]=r[6],n[10]=r[10],n[11]=r[14],n[12]=r[3],n[13]=r[7],n[14]=r[11],n[15]=r[15],t},Matrix.multiply=function(e,t,r){r=r||new Matrix;var n=e.m,i=t.m,o=r.m;return o[0]=n[0]*i[0]+n[1]*i[4]+n[2]*i[8]+n[3]*i[12],o[1]=n[0]*i[1]+n[1]*i[5]+n[2]*i[9]+n[3]*i[13],o[2]=n[0]*i[2]+n[1]*i[6]+n[2]*i[10]+n[3]*i[14],o[3]=n[0]*i[3]+n[1]*i[7]+n[2]*i[11]+n[3]*i[15],o[4]=n[4]*i[0]+n[5]*i[4]+n[6]*i[8]+n[7]*i[12],o[5]=n[4]*i[1]+n[5]*i[5]+n[6]*i[9]+n[7]*i[13],o[6]=n[4]*i[2]+n[5]*i[6]+n[6]*i[10]+n[7]*i[14],o[7]=n[4]*i[3]+n[5]*i[7]+n[6]*i[11]+n[7]*i[15],o[8]=n[8]*i[0]+n[9]*i[4]+n[10]*i[8]+n[11]*i[12],o[9]=n[8]*i[1]+n[9]*i[5]+n[10]*i[9]+n[11]*i[13],o[10]=n[8]*i[2]+n[9]*i[6]+n[10]*i[10]+n[11]*i[14],o[11]=n[8]*i[3]+n[9]*i[7]+n[10]*i[11]+n[11]*i[15],o[12]=n[12]*i[0]+n[13]*i[4]+n[14]*i[8]+n[15]*i[12],o[13]=n[12]*i[1]+n[13]*i[5]+n[14]*i[9]+n[15]*i[13],o[14]=n[12]*i[2]+n[13]*i[6]+n[14]*i[10]+n[15]*i[14],o[15]=n[12]*i[3]+n[13]*i[7]+n[14]*i[11]+n[15]*i[15],r},Matrix.identity=function(e){e=e||new Matrix;var t=e.m;return t[0]=t[5]=t[10]=t[15]=1,t[1]=t[2]=t[3]=t[4]=t[6]=t[7]=t[8]=t[9]=t[11]=t[12]=t[13]=t[14]=0,e},Matrix.perspective=function(e,t,r,n,i){var o=Math.tan(e*Math.PI/360)*r,a=o*t;return Matrix.frustum(-a,a,-o,o,r,n,i)},Matrix.frustum=function(e,t,r,n,i,o,a){a=a||new Matrix;var s=a.m;return s[0]=2*i/(t-e),s[1]=0,s[2]=(t+e)/(t-e),s[3]=0,s[4]=0,s[5]=2*i/(n-r),s[6]=(n+r)/(n-r),s[7]=0,s[8]=0,s[9]=0,s[10]=-(o+i)/(o-i),s[11]=-2*o*i/(o-i),s[12]=0,s[13]=0,s[14]=-1,s[15]=0,a},Matrix.ortho=function(e,t,r,n,i,o,a){a=a||new Matrix;var s=a.m;return s[0]=2/(t-e),s[1]=0,s[2]=0,s[3]=-(t+e)/(t-e),s[4]=0,s[5]=2/(n-r),s[6]=0,s[7]=-(n+r)/(n-r),s[8]=0,s[9]=0,s[10]=-2/(o-i),s[11]=-(o+i)/(o-i),s[12]=0,s[13]=0,s[14]=0,s[15]=1,a},Matrix.scale=function(e,t,r,n){n=n||new Matrix;var i=n.m;return i[0]=e,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=t,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=r,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,n},Matrix.translate=function(e,t,r,n){n=n||new Matrix;var i=n.m;return i[0]=1,i[1]=0,i[2]=0,i[3]=e,i[4]=0,i[5]=1,i[6]=0,i[7]=t,i[8]=0,i[9]=0,i[10]=1,i[11]=r,i[12]=0,i[13]=0,i[14]=0,i[15]=1,n},Matrix.rotate=function(e,t,r,n,i,o,a,s){if(!e||!t&&!r&&!n)return Matrix.identity(s);s=s||new Matrix;var l=s.m,u=Math.sqrt(t*t+r*r+n*n);t/=u,r/=u,n/=u;var g=Math.cos(e),c=Math.sin(e),S=1-g;return l[0]=t*t*S+g,l[1]=t*r*S-n*c,l[2]=t*n*S+r*c,l[3]=i-l[0]*i-l[1]*o-l[2]*a,l[4]=r*t*S+n*c,l[5]=r*r*S+g,l[6]=r*n*S-t*c,l[7]=o-l[4]*i-l[5]*o-l[6]*a,l[8]=n*t*S-r*c,l[9]=n*r*S+t*c,l[10]=n*n*S+g,l[11]=a-l[8]*i-l[9]*o-l[10]*a,l[12]=0,l[13]=0,l[14]=0,l[15]=1,s},Matrix.lookAt=function(e,t,r,n,i,o,a,s,l,u){u=u||new Matrix;var g=u.m,c=new Vector(e,t,r),S=new Vector(n,i,o),d=new Vector(a,s,l),E=c.subtract(S).unit(),f=d.cross(E).unit(),p=E.cross(f).unit();return g[0]=f.x,g[1]=f.y,g[2]=f.z,g[3]=-f.dot(c),g[4]=p.x,g[5]=p.y,g[6]=p.z,g[7]=-p.dot(c),g[8]=E.x,g[9]=E.y,g[10]=E.z,g[11]=-E.dot(c),g[12]=0,g[13]=0,g[14]=0,g[15]=1,u};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.mesh=function(e,t,r){},EJSS_WEBGLGRAPHICS.indexer=function(){var e={},t=[],r={};return e.getUnique=function(){return t},e.add=function(e){var n=JSON.stringify(e);return n in r||(r[n]=t.length,t.push(e)),r[n]},e},EJSS_WEBGLGRAPHICS.buffer=function(e,t,r){var n={},i=null,t=t,r=r,o="",a=[];return n.setData=function(e){a=e},n._0=function(e){o=e},n.getBuffer=function(){return i},n.getName=function(){return o},n.compile=function(n){for(var o=[],s=0;s<a.length;s+=1e4)o=Array.prototype.concat.apply(o,a.slice(s,s+1e4));var l=a.length?o.length/a.length:0;if(l!=Math.round(l))throw"buffer elements not of consistent size, average size is "+l;i=i||e.createBuffer(),i.length=o.length,i.spacing=l,e.bindBuffer(t,i),e.bufferData(t,new r(o),n||e.STATIC_DRAW)},n};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.plane=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.segment=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.Shader={},EJSS_WEBGLGRAPHICS.shader=function(e,t,r,n){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.spring=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.surface=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.text=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.Texture={},EJSS_WEBGLGRAPHICS.texture=function(e,t,r,n){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.trail=function(e,t){};var EJSS_WEBGLGRAPHICS=EJSS_WEBGLGRAPHICS||{};EJSS_WEBGLGRAPHICS.Utils={},EJSS_WEBGLGRAPHICS.Utils.regexMap=function(e,t,r){for(;null!=(result=e.exec(t));)r(result)},EJSS_WEBGLGRAPHICS.Utils.isArray=function(e){var t=Object.prototype.toString.call(e);return"[object Array]"==t||"[object Float32Array]"==t},EJSS_WEBGLGRAPHICS.Utils.isNumber=function(e){var t=Object.prototype.toString.call(e);return"[object Number]"==t||"[object Boolean]"==t},Vector.prototype={setx:function(e){this.x=e},sety:function(e){this.y=e},setz:function(e){this.z=e},getx:function(){return this.x},gety:function(){return this.y},getz:function(){return this.z},negative:function(){return new Vector(-this.x,-this.y,-this.z)},add:function(e){return e instanceof Vector?new Vector(this.x+e.x,this.y+e.y,this.z+e.z):new Vector(this.x+e,this.y+e,this.z+e)},subtract:function(e){return e instanceof Vector?new Vector(this.x-e.x,this.y-e.y,this.z-e.z):new Vector(this.x-e,this.y-e,this.z-e)},multiply:function(e){return e instanceof Vector?new Vector(this.x*e.x,this.y*e.y,this.z*e.z):new Vector(this.x*e,this.y*e,this.z*e)},divide:function(e){return e instanceof Vector?new Vector(this.x/e.x,this.y/e.y,this.z/e.z):new Vector(this.x/e,this.y/e,this.z/e)},equals:function(e){return this.x==e.x&&this.y==e.y&&this.z==e.z},dot:function(e){return this.x*e.x+this.y*e.y+this.z*e.z},cross:function(e){return new Vector(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},angle:function(e){return Math.acos(this.dot(e)/(this.length()*e.length()))},toAngles:function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}},toArray:function(e){return[this.x,this.y,this.z].slice(0,e||3)},clone:function(){return new Vector(this.x,this.y,this.z)},init:function(e,t,r){return this.x=e,this.y=t,this.z=r,this}},Vector.negative=function(e,t){return t.x=-e.x,t.y=-e.y,t.z=-e.z,t},Vector.add=function(e,t,r){return t instanceof Vector?(r.x=e.x+t.x,r.y=e.y+t.y,r.z=e.z+t.z):(r.x=e.x+t,r.y=e.y+t,r.z=e.z+t),r},Vector.subtract=function(e,t,r){return t instanceof Vector?(r.x=e.x-t.x,r.y=e.y-t.y,r.z=e.z-t.z):(r.x=e.x-t,r.y=e.y-t,r.z=e.z-t),r},Vector.multiply=function(e,t,r){return t instanceof Vector?(r.x=e.x*t.x,r.y=e.y*t.y,r.z=e.z*t.z):(r.x=e.x*t,r.y=e.y*t,r.z=e.z*t),r},Vector.divide=function(e,t,r){return t instanceof Vector?(r.x=e.x/t.x,r.y=e.y/t.y,r.z=e.z/t.z):(r.x=e.x/t,r.y=e.y/t,r.z=e.z/t),r},Vector.cross=function(e,t,r){return r.x=e.y*t.z-e.z*t.y,r.y=e.z*t.x-e.x*t.z,r.z=e.x*t.y-e.y*t.x,r},Vector.unit=function(e,t){var r=e.length();return t.x=e.x/r,t.y=e.y/r,t.z=e.z/r,t},Vector.fromAngles=function(e,t){return new Vector(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t))},Vector.randomDirection=function(){return Vector.fromAngles(Math.random()*Math.PI*2,Math.asin(2*Math.random()-1))},Vector.min=function(e,t){return new Vector(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))},Vector.max=function(e,t){return new Vector(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))},Vector.lerp=function(e,t,r){return t.subtract(e).multiply(r).add(e)},Vector.fromArray=function(e){return new Vector(e[0],e[1],e[2])};var EJSS_GRAPHICS=EJSS_GRAPHICS||{};EJSS_GRAPHICS.WebGLGraphics={},EJSS_GRAPHICS.webGLGraphics=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Plane={},EJSS_DRAWING3D.plane=function(e){},EJSS_DRAWING3D.PlaneSet={},EJSS_DRAWING3D.planeSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Segment={},EJSS_DRAWING3D.segment=function(e){},EJSS_DRAWING3D.SegmentSet={},EJSS_DRAWING3D.segmentSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Sphere={},EJSS_DRAWING3D.sphere=function(e){},EJSS_DRAWING3D.SphereSet={},EJSS_DRAWING3D.sphereSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Spring={},EJSS_DRAWING3D.spring=function(e){},EJSS_DRAWING3D.SpringSet={},EJSS_DRAWING3D.springSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Surface={},EJSS_DRAWING3D.surface=function(e){},EJSS_DRAWING3D.SurfaceSet={},EJSS_DRAWING3D.surfaceSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Tetrahedron={},EJSS_DRAWING3D.tetrahedron=function(e){},EJSS_DRAWING3D.TetrahedronSet={},EJSS_DRAWING3D.tetrahedronSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Text={},EJSS_DRAWING3D.text=function(e){},EJSS_DRAWING3D.TextSet={},EJSS_DRAWING3D.textSet=function(e){};var EJSS_DRAWING3D=EJSS_DRAWING3D||{};EJSS_DRAWING3D.Trail={},EJSS_DRAWING3D.trail=function(e){},EJSS_DRAWING3D.TrailSet={},EJSS_DRAWING3D.trailSet=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.ArrayPanel={},EJSS_INTERFACE.arrayPanel=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Audio={},EJSS_INTERFACE.audio=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.BoxPanel={registerProperties:function(e,t){EJSS_INTERFACE.Panel.registerProperties(e,t)},showOkDialog:function(e,t,r){var n=document.getElementById(".myBoxPanelOk")||EJSS_INTERFACE.boxPanel(".myBoxPanelOk").getDOMElement(),i=document.getElementById(".myBoxPanelOk.back"),o=document.getElementById(".myBoxPanelOk.msg");o.style.visibility="visible",o.innerHTML=e+"<br/>";var a=document.getElementById(".myBoxPanelOk.okbt");a.onclick=t,a.style.display="inline",n.style.width=r||"200px",n.style.marginLeft=parseFloat(n.style.width)/-2+"px",n.style.visibility="visible",i.style.visibility="visible"},showOkCancelDialog:function(e,t,r,n){var i=document.getElementById(".myBoxPanelCancelOk")||EJSS_INTERFACE.boxPanel(".myBoxPanelCancelOk").getDOMElement(),o=document.getElementById(".myBoxPanelCancelOk.back"),a=document.getElementById(".myBoxPanelCancelOk.msg");a.style.visibility="visible",a.innerHTML=e+"<br/>";var s=document.getElementById(".myBoxPanelCancelOk.okbt");s.onclick=t,s.style.display="inline";var l=document.getElementById(".myBoxPanelCancelOk.cancelbt");l.onclick=r,l.style.display="inline",i.style.width=n||"200px",i.style.marginLeft=parseFloat(i.style.width)/-2+"px",i.style.visibility="visible",o.style.visibility="visible"},showInputDialog:function(e,t,r,n){var i=document.getElementById(".BoxPanelInput")||EJSS_INTERFACE.boxPanel(".BoxPanelInput").getDOMElement(),o=document.getElementById(".BoxPanelInput.back"),a=document.getElementById(".BoxPanelInput.msg");a.style.visibility="visible",a.innerHTML=e;var s=document.getElementById(".BoxPanelInput.input");s.style.display="inline";var l=document.getElementById(".BoxPanelInput.okbt");l.onclick=function(){t(s.value)},l.style.display="inline";var u=document.getElementById(".BoxPanelInput.cancelbt");u.onclick=r,u.style.display="inline",i.style.width=n||"200px",i.style.marginLeft=parseFloat(i.style.width)/-2+"px",i.style.visibility="visible",o.style.visibility="visible"},showSelectDialog:function(e,t,r,n,i,o){var a=document.getElementById(".BoxPanelSelect")||EJSS_INTERFACE.boxPanel(".BoxPanelSelect").getDOMElement(),s=document.getElementById(".BoxPanelSelect.back"),l=document.getElementById(".BoxPanelSelect.msg");l.style.visibility="visible",l.innerHTML=e;var u=document.getElementById(".BoxPanelSelect.select");u.innerHTML="";for(var g=0;g<t.text.length;g++){var c=document.createElement("option");c.value&&c.value[g]&&c.setAttribute("value",t.value[g]),c.innerHTML=t.text[g],u.appendChild(c)}i&&(u.size=i),u.style.display="block",u.style.margin="0 auto";var S=document.getElementById(".BoxPanelSelect.okbt");S.onclick=function(){r(t.value[u.selectedIndex])},S.style.display="inline";var d=document.getElementById(".BoxPanelSelect.cancelbt");d.onclick=n,d.style.display="inline",a.style.width=o||"200px",a.style.marginLeft=parseFloat(a.style.width)/-2+"px",a.style.visibility="visible",s.style.visibility="visible"}},EJSS_INTERFACE.boxPanel=function(e){var t=EJSS_INTERFACE.panel(e);t.setVisibility=function(e){mElement.style.visibility=e,t.getStyle().setVisibility(e)},t.registerProperties=function(e){EJSS_INTERFACE.BoxPanel.registerProperties(t,e)};var r=document.createElement("div");document.body.appendChild(r),r.className="myBoxPanelBackground",r.id=e+".back",r.style.backgroundColor="rgba(255, 255, 255, 0.3)",r.style.position="fixed",r.style.top="1%",r.style.left="1%",r.style.width="98%",r.style.height="98%",r.style.zIndex="99998",r.style.visibility="hidden";var n=document.createElement("span");n.id=e+".msg",n.style.visibility="hidden",t.getDOMElement().appendChild(n);var i=document.createElement("input");i.id=e+".input",i.type="text",i.style.display="none",i.size="20",t.getDOMElement().appendChild(i);var o=document.createElement("select");o.id=e+".select",o.style.display="none",o.size="4",t.getDOMElement().appendChild(o);var a=document.createElement("button");a.id=e+".okbt",a.innerHTML="Ok",a.style.verticalAlign="middle",a.style.display="none",a.addEventListener("click",function(){document.getElementById(e).style.visibility="hidden",document.getElementById(e+".back").style.visibility="hidden",document.getElementById(e+".msg").style.visibility="hidden",document.getElementById(e+".input").style.display="none",document.getElementById(e+".okbt").style.display="none",document.getElementById(e+".cancelbt").style.display="none"}),t.getDOMElement().appendChild(a);var s=document.createElement("button");return s.id=e+".cancelbt",s.innerHTML="Cancel",s.style.verticalAlign="middle",s.style.display="none",s.addEventListener("click",function(){document.getElementById(e).style.visibility="hidden",document.getElementById(e+".back").style.visibility="hidden",document.getElementById(e+".msg").style.visibility="hidden",document.getElementById(e+".input").style.display="none",document.getElementById(e+".okbt").style.display="none",document.getElementById(e+".cancelbt").style.display="none"}),t.getDOMElement().appendChild(s),
t.getDOMElement().className="BoxPanel",t.getStyle().setCSS({position:"fixed",top:"25%",left:"50%"}),t.getStyle().setCSS({zIndex:"99999",visibility:"hidden"}),t.getStyle().setCSS({marginLeft:"-250px",width:"500px"}),t.getStyle().setCSS({background:"lightgray"}),t.getStyle().setCSS({borderWidth:"1px"}),t.getStyle().setCSS({borderStyle:"solid"}),t.getStyle().setCSS({borderColor:"red"}),t.getStyle().setCSS({overflow:"hidden",wordWrap:"break-word"}),t};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Button={registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Text",e.setText),t.registerProperty("Disabled",e.setDisabled),t.registerProperty("ImageUrl",e.setImageUrl),t.registerAction("OnClick"),t.registerAction("OnPress"),t.registerAction("OnRelease")}},EJSS_INTERFACE.button=function(e){function t(){r.getDOMElement().innerHTML="",n.length>0&&(r.getDOMElement().innerHTML='<img style="vertical-align:inherit;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;" src="'+n+'"/>'),i.length>0&&(r.getDOMElement().innerHTML+='<span style="white-space:pre;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:inherit;">'+i.toString()+"</span>")}var r=EJSS_INTERFACE.element(e),n="",i="";r.setDisabled=function(e){r.getDOMElement().disabled=e},r.getDisabled=function(){return r.getDOMElement().disabled},r.setText=function(e){i!=e&&(i=e,t())},r.getText=function(){return i},r.setImageUrl=function(e){var i=r.getResourcePath(e);i!=n&&(n=i,t())},r.getImageUrl=function(){return n},r.registerProperties=function(e){EJSS_INTERFACE.Button.registerProperties(r,e)};var o=document.createElement("button");return o.id=e,o.style.verticalAlign="middle",o.style.webkitTouchCallout="none",document.body.appendChild(o),r.setDOMElement(o),r.getDOMElement().oncontextmenu=function(e){return e.preventDefault(),e.stopPropagation(),!1},r.getDOMElement().onmousedown=function(e){var t=r.getController();return t&&t.invokeAction("OnPress").reportInteractions(),e.preventDefault(),e.stopPropagation(),!1},r.getDOMElement().addEventListener("touchstart",function(e){var t=r.getController();return t&&t.invokeAction("OnPress").reportInteractions(),e.preventDefault(),e.stopPropagation(),!1}),r.getDOMElement().onmouseup=function(e){var t=r.getController();return t&&(t.invokeAction("OnRelease"),t.invokeAction("OnClick").reportInteractions()),e.preventDefault(),e.stopPropagation(),!1},r.getDOMElement().addEventListener("touchend",function(e){var t=r.getController();return t&&(t.invokeAction("OnRelease"),t.invokeAction("OnClick").reportInteractions()),e.preventDefault(),e.stopPropagation(),!1}),r};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Canvas={registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Height",e.setHeight),t.registerProperty("Width",e.setWidth),t.registerProperty("ImageData",e.setImageData),t.registerProperty("Enabled",e.setEnabled,e.isEnabled),t.registerAction("OnPress",e.getInteractionPoint),t.registerAction("OnDrag",e.getInteractionPoint),t.registerAction("OnRelease",e.getInteractionPoint),t.registerAction("OnEnter",e.getInteractionPoint),t.registerAction("OnExit",e.getInteractionPoint),t.registerAction("OnMove",e.getInteractionPoint)}},EJSS_INTERFACE.canvas=function(e){function t(e){var t=EJSS_GRAPHICS.CanvasGraphics.getOffsetRect(u),r=[];if(void 0!==e.changedTouches)for(var n=0;n<e.changedTouches.length;n++)r[n]=[],r[n][0]=e.changedTouches[n].pageX-window.pageXOffset-t.left,r[n][1]=e.changedTouches[n].pageY-window.pageYOffset-t.top;else r[0]=[],r[0][0]=(e.clientX||e.x)-t.left,r[0][1]=(e.clientY||e.y)-t.top;return r[0]}function r(e){e.preventDefault();var r=u.getController();return r&&(S=t(e),r.invokeAction("OnPress").reportInteractions()),d=!0,!1}function n(e){e.preventDefault();var r=u.getController();return d&&r&&(S=t(e),r.invokeAction("OnRelease").reportInteractions()),d=!1,!1}function i(e){e.preventDefault();var r=u.getController();return d=!1,r&&(S=t(e),r.invokeAction("OnEnter").reportInteractions()),!1}function o(e){e.preventDefault();var r=u.getController();return d=!1,r&&(S=t(e),r.invokeAction("OnExit").reportInteractions()),!1}function a(e){e.preventDefault();var r=u.getController();return r&&(S=t(e),d?r.invokeAction("OnDrag").reportInteractions():r.invokeAction("OnMove").reportInteractions()),!1}var s,l,u=EJSS_INTERFACE.element(e),g=0,c=0,S=[0,0],d=!1;u.render=function(){s&&f.putImageData(s,0,0)},u.setImageData=function(e){s||(s=f.createImageData(c,g)),e.data&&(e=e.data);for(var t=0;t<e.length;t++)s.data[t]=e[t]},u.clear=function(){f.clearRect(0,0,c,g)},u.setWidth=function(e){var t=u.getDOMElement();return c!=e&&(c=e,"string"==typeof e&&-1!=e.indexOf("%")&&t.parentNode&&t.parentNode.offsetWidth?e=t.parentNode.offsetWidth*parseFloat(e)/100:"string"==typeof e&&(e=parseFloat(e)),"number"==typeof e&&t.setAttribute("width",e),!0)},u.getWidth=function(){var e=u.getDOMElement();if("string"==typeof c&&-1!=c.indexOf("%")&&e.parentNode&&e.parentNode.offsetWidth){var t=e.parentNode.offsetWidth*parseFloat(c)/100;if("number"==typeof t){t!=e.getAttribute("width")&&e.setAttribute("width",t)}}return c},u.setHeight=function(e){var t=u.getDOMElement();return g!=e&&(g=e,"string"==typeof e&&-1!=e.indexOf("%")&&t.parentNode&&t.parentNode.offsetHeight?e=t.parentNode.offsetHeight*parseFloat(e)/100:"string"==typeof e&&(e=parseFloat(e)),"number"==typeof e&&t.setAttribute("height",e),!0)},u.getHeight=function(){var e=u.getDOMElement();if("string"==typeof g&&-1!=g.indexOf("%")&&e.parentNode&&e.parentNode.offsetHeight&&(value=e.parentNode.offsetHeight*parseFloat(g)/100,"number"==typeof value)){var t=e.getAttribute("height");value!=t&&e.setAttribute("height",value)}return g},u.getContext=function(){return f},u.registerProperties=function(e){EJSS_INTERFACE.Canvas.registerProperties(u,e)},u.setEnabled=function(e){l=e;var t=u.getDOMElement();l?(t.onmousedown=r,t.onmouseup=n,t.onmouseover=i,t.onmouseout=o,t.onmousemove=a,t.addEventListener("touchstart",r,!1),t.addEventListener("touchend",n,!1),t.addEventListener("touchmove",a,!1)):(t.onmousedown=void 0,t.onmouseup=void 0,t.onmouseover=void 0,t.onmouseout=void 0,t.onmousemove=void 0,t.removeEventListener("touchstart",r),t.removeEventListener("touchend",n),t.removeEventListener("touchmove",a))},u.isEnabled=function(){return l},u.getInteractionPoint=u.getMousePosition=function(){return S};var E=document.createElement("canvas");E.setAttribute("id",e),E.style.overflow="hidden";var f=E.getContext("2d");return document.body.appendChild(E),u.setDOMElement(E),u.setEnabled(!0),u.setWidth(500),u.setHeight(500),u};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.CheckBox={},EJSS_INTERFACE.checkBox=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.ComboBox={registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Options",e.setOptions,e.getOptions),t.registerProperty("SelectedOptions",e.setSelectedOptions,e.getSelectedOptions),t.registerProperty("Multiple",e.setMultiple),t.registerProperty("Size",e.setSize),t.registerAction("OnChange"),t.registerAction("OnFocus")}},EJSS_INTERFACE.comboBox=function(e){var t=EJSS_INTERFACE.element(e),r=[];t.registerProperties=function(e){EJSS_INTERFACE.ComboBox.registerProperties(t,e)},t.setSize=function(e){t.getDOMElement().size=e},t.getSize=function(){return t.getDOMElement().size},t.setMultiple=function(e){t.getDOMElement().multiple=e},t.getMultiple=function(){return t.getDOMElement().multiple},t.setSelectedOptions=function(e){for(var r=t.getDOMElement(),n=0;n<r.options.length;n++){r.options[n].selected=!1;for(var i=0;i<e.length;i++)if(r.options[n].value==e[i]){r.options[n].selected=!0;break}}},t.getSelectedOptions=function(){for(var e=[],r=t.getDOMElement(),n=0,i=0;i<r.options.length;i++)r.options[i].selected&&(e[n++]=r.options[i].value);return e},t.getSelectedOptionsIndexes=function(){for(var e=[],r=t.getDOMElement(),n=0,i=0;i<r.options.length;i++)r.options[i].selected&&(e[n++]=i);return e},t.setOptions=function(e){if(!EJSS_TOOLS.compareArrays(r,e)){r=[];var n=t.getSelectedOptions(),i=t.getDOMElement();i.innerHTML="";for(var o=0;o<e.length;o++){var a=document.createElement("option");a.setAttribute("value",e[o]),a.innerHTML=e[o],i.appendChild(a),r[o]=e[o]}t.setSelectedOptions(n)}},t.getOptions=function(){for(var e=[],r=t.getDOMElement(),n=0;n<r.options.length;n++)e[n]=r.options[n].value;return e},t.setEditable=function(e){t.getDOMElement().readOnly=!e},t.getEditable=function(){return!t.getDOMElement().readOnly};var n=document.createElement("select");return n.id=e,document.body.appendChild(n),t.setDOMElement(n),t.getDOMElement().onfocus=function(){var e=t.getController();t.getStyle().setBackgroundColor("white"),e&&(e.propertiesChanged("Options"),e.invokeAction("OnFocus"),e.reportInteractions())},t.getDOMElement().onchange=function(){var e=t.getController();t.getStyle().setBackgroundColor("white"),e&&(e.propertiesChanged("SelectedOptions"),e.invokeAction("OnChange"),e.reportInteractions())},t.getDOMElement().onkeydown=function(){t.getStyle().setBackgroundColor("yellow")},t};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.DataTable={},EJSS_INTERFACE.dataTable=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Element={registerProperties:function(e,t){e.setController(t),t.registerProperty("Tooltip",e.setTitle),t.registerProperty("Foreground",e.getStyle().setColor),t.registerProperty("Background",e.getStyle().setBackgroundColor),t.registerProperty("BackgroundImage",e.getStyle().setBackgroundImage),t.registerProperty("BorderWidth",e.getStyle().setBorderWidth),t.registerProperty("BorderColor",e.getStyle().setBorderColor),t.registerProperty("BorderStyle",e.getStyle().setBorderStyle),t.registerProperty("Padding",e.getStyle().setPadding),t.registerProperty("Width",e.getStyle().setWidth,e.getStyle().getWidth),t.registerProperty("Height",e.getStyle().setHeight,e.getStyle().getHeight),t.registerProperty("LineHeight",e.getStyle().setLineHeight,e.getStyle().getLineHeight),t.registerProperty("TextAlign",e.getStyle().setTextAlign),t.registerProperty("VerticalAlign",e.getStyle().setVerticalAlign),t.registerProperty("Visibility",e.getStyle().setVisibility),t.registerProperty("Display",e.getStyle().setDisplay),t.registerProperty("Disabled",e.setDisabled),t.registerProperty("Float",e.getStyle().setFloat),t.registerProperty("Position",e.getStyle().setPosition),t.registerProperty("Left",e.getStyle().setLeft),t.registerProperty("Top",e.getStyle().setTop),t.registerProperty("Bottom",e.getStyle().setBottom),t.registerProperty("Overflow",e.getStyle().setOverflow),t.registerProperty("BoxShadow",e.getStyle().setShadow),t.registerProperty("Margin",e.getStyle().setMargin),t.registerProperty("Parent",e.setParent),t.registerProperty("ClassName",e.setClassName),t.registerProperty("CSS",e.getStyle().setCSS),t.registerProperty("Font",e.getStyle().setFont),t.registerProperty("FontFamily",e.getStyle().setFontFamily),t.registerProperty("FontSize",e.getStyle().setFontSize),t.registerProperty("LetterSpacing",e.getStyle().setLetterSpacing),t.registerProperty("OutlineColor",e.getStyle().setOutlineColor),t.registerProperty("FontWeight",e.getStyle().setFontWeight),t.registerProperty("FillColor",e.getStyle().setFillColor),t.registerProperty("FontStyle",e.getStyle().setFontStyle),t.registerProperty("Transform",e.getStyle().setTransform),t.registerProperty("WhiteSpace",e.getStyle().setWhiteSpace)}},EJSS_INTERFACE.element=function(e){var t,r,n={},i=EJSS_INTERFACE.style(e),o=null;return n.getDOMElement=function(){return t},n.setDOMElement=function(e){t=e},n.setParent=function(e){if(r=e,"string"==typeof e){document.getElementById(e).appendChild(n.getDOMElement())}else e.getDOMElement?e.appendChild(n):e.appendChild(n.getDOMElement())},n.getParent=function(){return r},n.getName=function(){return e},n.getResourcePath=function(e){return e},n.setClassName=function(e){n.getDOMElement().className=e},n._23Name=function(){return n.getDOMElement().className},n.setDisabled=function(e){n.getDOMElement().disabled=e},n.getDisabled=function(){return n.getDOMElement().disabled},n.setTitle=function(e){n.getDOMElement().title=e},n.getTitle=function(){return n.getDOMElement().title},n.getStyle=function(){return i},n.getController=function(){return o},n.setController=function(e){o=e},n.registerProperties=function(e){EJSS_INTERFACE.Element.registerProperties(n,e)},n};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.FunctionField={},EJSS_INTERFACE.functionField=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Html={},EJSS_INTERFACE.html=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Image={},EJSS_INTERFACE.image=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.ImageAndTextButton={registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Text",e.setText),t.registerProperty("ImageUrl",e.setImageUrl),t.registerAction("OnClick")}},EJSS_INTERFACE.imageAndTextButton=function(e){var t=EJSS_INTERFACE.element(e),r="",n="";t.setText=function(e){r=e.toString(),t.getDOMElement().innerHTML=n+r},t.getText=function(){return r},t.setImageUrl=function(e){n='<img src="'+t.getResourcePath(e)+'"/>',t.getDOMElement().innerHTML=n+r},t.getImageUrl=function(){return n},t.registerProperties=function(e){EJSS_INTERFACE.ImageAndTextButton.registerProperties(t,e)};var i=document.createElement("button");return i.id=e,i.style.borderStyle="none",i.style.background="inherit",i.style.cursor="inherit",i.style.webkitBoxShadow="inset 0 0px 0 rgba(255,255,255,0),0 0px 0px rgba(0,0,0,0)",document.body.appendChild(i),t.setDOMElement(i),t.getDOMElement().onclick=function(e){var r=t.getController();return r&&r.invokeAction("OnClick").reportInteractions(),e.preventDefault(),e.stopPropagation(),!1},t};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Label={},EJSS_INTERFACE.label=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.MathML={},EJSS_INTERFACE.mathML=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Media={},EJSS_INTERFACE.media=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.MotionJPEG={},EJSS_INTERFACE.motionJPEG=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.NumberField={},EJSS_INTERFACE.numberField=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Panel={registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Html",e.setHtml,e.getHtml),t.registerAction("OnClick"),t.registerAction("OnPress"),t.registerAction("OnRelease"),t.registerAction("OnMove")}},EJSS_INTERFACE.panel=function(e){var t=EJSS_INTERFACE.element(e);t.appendChild=function(e){var r=e.getDOMElement();t.getDOMElement().appendChild(r)},t.removeChild=function(e){var r=e.getDOMElement();t.getDOMElement().removeChild(r)},t.insertBefore=function(e,r){var n=e.getDOMElement(),i=r.getDOMElement();t.getDOMElement().insertBefore(n,i)},t.setHtml=function(e){t.getDOMElement().innerHTML=e},t.getHtml=function(){
return t.getDOMElement().innerHTML},t.registerProperties=function(e){EJSS_INTERFACE.Panel.registerProperties(t,e)};var r=document.createElement("div");return r.id=e,r.contenteditable=!0,document.body.appendChild(r),t.setDOMElement(r),t.getStyle().setPadding("0px"),t.getStyle().setMargin("0px"),t.getStyle().setTextAlign("TEXTA_CENTER"),t.getStyle().setCSS({display:"block","margin-left":"auto","margin-right":"auto"}),t.getDOMElement().addEventListener("touchstart",function(e){for(var t=document.getElementsByTagName("input"),r=0;t.length>r;r++)t[r].disabled=!1}),t.getDOMElement().addEventListener("mousedown",function(e){var r=t.getController();r&&r.invokeAction("OnPress").reportInteractions()}),t.getDOMElement().addEventListener("touchstart",function(e){var r=t.getController();r&&r.invokeAction("OnPress").reportInteractions()}),t.getDOMElement().addEventListener("mouseup",function(e){var r=t.getController();r&&(r.invokeAction("OnRelease"),r.invokeAction("OnClick").reportInteractions())}),t.getDOMElement().addEventListener("touchend",function(e){var r=t.getController();r&&(r.invokeAction("OnRelease"),r.invokeAction("OnClick").reportInteractions())}),t.getDOMElement().addEventListener("mousemove",function(e){var r=t.getController();r&&r.invokeAction("OnMove").reportInteractions()}),t.getDOMElement().addEventListener("touchmove",function(e){var r=t.getController();r&&r.invokeAction("OnMove").reportInteractions()}),t};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.PasswordField={},EJSS_INTERFACE.passwordField=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.RadioButton={},EJSS_INTERFACE.radioButton=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Separator={HORIZONTAL:0,VERTICAL:1,registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Orientation",e.setOrientation),t.registerProperty("Width",e.setWidth)}},EJSS_INTERFACE.separator=function(e){var t=EJSS_INTERFACE.element(e),r=EJSS_INTERFACE.Separator.HORIZONTAL,n="100%";t.setOrientation=function(e){"string"==typeof e&&(e=EJSS_INTERFACE.Separator[e.toUpperCase()]),r!=e&&(r=e,r==EJSS_INTERFACE.Separator.VERTICAL?(t.getDOMElement().style.display="inline",t.getDOMElement().style.height=t.getDOMElement().style.width,t.getDOMElement().style.width="2px"):(t.getDOMElement().style.display="none",t.getDOMElement().style.width=t.getDOMElement().style.height,t.getDOMElement().style.height="2px"))},t.getOrientation=function(){return r},t.setWidth=function(e){n!=e&&(n=e,r==EJSS_INTERFACE.Separator.VERTICAL?t.getDOMElement().style.height=n:t.getDOMElement().style.width=n)},t.getWidth=function(){return n},t.registerProperties=function(e){EJSS_INTERFACE.Separator.registerProperties(t,e)};var i=document.createElement("hr");return i.id=e,i.style.height="2px",i.style.width=n,document.body.appendChild(i),t.setDOMElement(i),t};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Slider={},EJSS_INTERFACE.slider=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Style={BORDER_SOLID:"solid",BORDER_DOTTED:"dotted",BORDER_DASHED:"dashed",TEXTA_LEFT:"left",TEXTA_RIGHT:"right",TEXTA_CENTER:"center",TEXTA_JUSTIFY:"justify",VISIB_VISIBLE:"visible",VISIB_HIDDEN:"hidden",FLOAT_LEFT:"left",FLOAT_RIGHT:"right",FLOAT_NONE:"none",FLOAT_CENTER:"none",POSITION_STATIC:"static",POSITION_ABSOLUTE:"absolute",POSITION_FIXED:"fixed",POSITION_RELATIVE:"relative",POSITION_INHERIT:"inherit",OVERFLOW_VISIBLE:"visible",OVERFLOW_HIDDEN:"hidden",OVERFLOW_SCROLL:"scroll",OVERFLOW_AUTO:"auto",setCSS:function(e,t){var r=function(e,t){return(t+"").toUpperCase()},n=e.style;if("object"!=typeof t){var i=t.trim().split("{");if(i[0]&&i[0].length>0){var o,a=i[0].trim(),s=document.styleSheets[0].rules||document.styleSheets[0].cssRules;for(o=0;o<s.length&&s[o].selectorText!=a;o++);var l=s[o].cssText?s[o].cssText:s[o].style.cssText;l=l.match(/{.*}/g)[0];var u=l.slice(1,l.length-2).split(";");for(elem in u){var g=u[elem].split(":");if(2==g.length){var c=g[0].trim(),S=g[1].trim(),d=c.replace(/-([\da-z])/gi,r);n[d]=S}}}if(i[1]){var E=i[1].trim(),u=E.slice(0,E.length-2).split(";");for(elem in u){var g=u[elem].split(":");if(2==g.length){var c=g[0].trim(),S=g[1].trim(),d=c.replace(/-([\da-z])/gi,r);n[d]=S}}}}else for(var f in t){var d=f.replace(/-([\da-z])/gi,r);n[d]=t[f]}}},EJSS_INTERFACE.style=function(e){var t=EJSS_INTERFACE.Style,r={},n="white",i=0,o=t.BORDER_SOLID;return r.setCSS=function(r){t.setCSS(document.getElementById(e),r)},r.setVisibility=function(t){document.getElementById(e).style.visibility=t?"visible":"hidden"},r.getVisibility=function(){return"visible"==document.getElementById(e).style.visibility},r.setVerticalAlign=function(t){document.getElementById(e).style.verticalAlign=t},r.getVerticalAlign=function(){return document.getElementById(e).style.verticalAlign},r.setTextAlign=function(r){"TEXTA_"==r.substring(0,6)&&(r=t[r.toUpperCase()]),document.getElementById(e).style.textAlign=r},r.getTextAlign=function(){return document.getElementById(e).style.textAlign},r.setLineHeight=function(t){"string"!=typeof t&&(t+="px"),document.getElementById(e).style.lineHeight=t},r.getLineHeight=function(){return document.getElementById(e).style.lineHeight},r.setHeight=function(t){"string"!=typeof t&&(t+="px"),document.getElementById(e).style.height=t},r.getHeight=function(){return document.getElementById(e).style.height},r.setWidth=function(t){"string"!=typeof t&&(t+="px"),document.getElementById(e).style.width=t},r.getWidth=function(){return document.getElementById(e).style.width},r.setOverflow=function(r){"OVERFL"==r.substring(0,6)&&(r=t[r.toUpperCase()]),document.getElementById(e).style.overflow=r},r.getOverflow=function(){return document.getElementById(e).style.overflow},r.setPosition=function(r){"POSITI"==r.substring(0,6)&&(r=t[r.toUpperCase()]),document.getElementById(e).style.position=r},r.getPosition=function(){return document.getElementById(e).style.position},r.setFloat=function(r){"FLOAT_"==r.substring(0,6)&&(r=t[r.toUpperCase()]),document.getElementById(e).style.float=r},r.getFloat=function(){return document.getElementById(e).style.float},r.setDisplay=function(t){document.getElementById(e).style.display=t},r.getDisplay=function(){return document.getElementById(e).style.display},r.setTop=function(t){document.getElementById(e).style.top=t},r.getTop=function(){return document.getElementById(e).style.top},r.setBottom=function(t){document.getElementById(e).style.bottom=t},r.getBottom=function(){return document.getElementById(e).style.bottom},r.setLeft=function(t){document.getElementById(e).style.left=t},r.getLeft=function(){return document.getElementById(e).style.left},r.setBorderStyle=function(r){"BORDER"==r.substring(0,6)&&(r=t[r.toUpperCase()]),o=r,document.getElementById(e).style.border=i+"px "+o+" "+n},r.getBorderStyle=function(){return o},r.setBorderWidth=function(t){i=t,document.getElementById(e).style.border=i+"px "+o+" "+n},r.getBorderWidth=function(){return i},r.setBorderColor=function(t){"string"!=typeof t&&(t=EJSS_TOOLS.DisplayColors.getLineColor(t)),n=t,document.getElementById(e).style.border=i+"px "+o+" "+n},r.getBorderColor=function(){return n},r.setPadding=function(t){document.getElementById(e).style.padding=t},r.getPadding=function(){return document.getElementById(e).style.padding},r.setShadow=function(t){document.getElementById(e).style.boxShadow=t||""},r.getShadow=function(){return""!=document.getElementById(e).style.boxShadow},r.setMargin=function(t){document.getElementById(e).style.margin=t},r.getMargin=function(){return document.getElementById(e).style.margin},r.setBackgroundImage=function(t){document.getElementById(e).style.backgroundImage="url("+t+")",document.getElementById(e).style.backgroundSize="100% 100%"},r.getBackgroundImage=function(){return document.getElementById(e).style.backgroundImage},r.setBackgroundColor=function(t){"string"!=typeof t&&(t=EJSS_TOOLS.DisplayColors.getLineColor(t)),document.getElementById(e).style.backgroundColor=t},r.getBackgroundColor=function(){return document.getElementById(e).style.backgroundColor},r.setColor=function(t){"string"!=typeof t&&(t=EJSS_TOOLS.DisplayColors.getLineColor(t)),document.getElementById(e).style.color=t},r.getColor=function(){return document.getElementById(e).style.color},r.getFont=function(){return document.getElementById(e).style.font},r.setFont=function(t){var r=document.getElementById(e).style,n=t.split(" ");r.fontStyle=n[0],r.fontWeight=n[1];var i=n[2].split("/");r.fontSize=i[0],i[1]&&(r.lineHeight=i[1]),n[3]&&(r.fontFamily=t.substring(t.indexOf(n[3])))},r.setFontStyle=function(t){document.getElementById(e).style.fontStyle=t},r.getFontStyle=function(){return document.getElementById(e).style.fontStyle},r.setFontFamily=function(t){document.getElementById(e).style.fontFamily=t},r.getFontFamily=function(){return document.getElementById(e).style.fontFamily},r.setFontSize=function(t){document.getElementById(e).style.fontSize=t},r.getFontSize=function(){return document.getElementById(e).style.fontSize},r.setLetterSpacing=function(t){document.getElementById(e).style.letterSpacing=t},r.getLetterSpacing=function(){return document.getElementById(e).style.letterSpacing},r.setOutlineColor=function(t){document.getElementById(e).style.stroke=t},r.getOutlineColor=function(){return document.getElementById(e).style.stroke},r.setFontWeight=function(t){document.getElementById(e).style.fontWeight=t},r.getFontWeight=function(){return document.getElementById(e).style.fontWeight},r.setFillColor=function(t){document.getElementById(e).style.fill=t},r.getFillColor=function(){return document.getElementById(e).style.fill},r.setTransform=function(t){document.getElementById(e).style.transform=t,document.getElementById(e).style["-ms-transform"]=t,document.getElementById(e).style["-webkit-transform"]=t},r.getTransform=function(){return document.getElementById(e).style.transform},r.setWhiteSpace=function(t){document.getElementById(e).style.whiteSpace=t},r.getWhiteSpace=function(){return document.getElementById(e).style.whiteSpace},r};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.SvgGraphics={registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Height",e.setHeight),t.registerProperty("Width",e.setWidth)}},EJSS_INTERFACE.svgGraphics=function(e){var t=EJSS_INTERFACE.element(e),r=0,n=0;t.setWidth=function(e){if(n!=e){n=e;var r="string"==typeof n&&-1!=n.indexOf("%")?n:parseFloat(n);return t.getDOMElement().setAttribute("width",r),!0}return!1},t.getWidth=function(){return n},t.setHeight=function(e){if(r!=e){r=e;var n="string"==typeof r&&-1!=r.indexOf("%")?r:parseFloat(r);return t.getDOMElement().setAttribute("height",n),!0}return!1},t.getHeight=function(){return r},t.registerProperties=function(e){EJSS_INTERFACE.SvgGraphics.registerProperties(t,e)};var i=document.createElementNS("http://www.w3.org/2000/svg","svg");return i.setAttribute("id",e),i.style.overflow="hidden",i.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),document.body.appendChild(i),t.setDOMElement(i),t.setWidth(500),t.setHeight(500),t};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.TabbedPanel={registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("Titles",e.setTitles,e.getTitles),t.registerProperty("Selected",e.setSelected,e.getSelected),t.registerProperty("Font",e.setFont),t.registerProperty("Foreground",e.setColor),t.registerProperty("Background",e.setBackgroundColor),t.registerProperty("FillColor",e.setFillColor)}},EJSS_INTERFACE.tabbedPanel=function(e){function t(){l.innerHTML="";for(var t=0;t<i.length;t++){var s=i[t],u=document.createElement("li");u.className="_TabbedPanel.li",u.id=e+".item",l.appendChild(u),u.style.background=a||n.getStyle().getBackgroundColor(),u.onmouseover=function(){this.style.cursor="pointer"},u.onmouseout=function(){this.style.cursor="auto"};var g=document.createElement("a");g.className="_TabbedPanel.a",g.id=e+".item.a."+t,g.innerHTML=s,u.appendChild(g),g.style.color=n.getStyle().getColor(),g.style.fontStyle=n.getStyle().getFontStyle(),g.style.fontWeight=n.getStyle().getFontWeight(),g.style.fontSize=n.getStyle().getFontSize(),g.style.fontFamily=n.getStyle().getFontFamily(),g.style.lineHeight=n.getStyle().getLineHeight(),g.onclick=function(){var e=this.id.split(".");o=parseInt(e[e.length-1]),r()},r()}}function r(){for(var e=0;e<u.childNodes.length;e++)u.childNodes[e].style.display="none";u.childNodes.length>o&&(u.childNodes[o].style.display="block");for(var e=0;e<l.childNodes.length;e++)l.childNodes[e].firstChild.style.backgroundColor="transparent";l.childNodes.length>o&&(l.childNodes[o].firstChild.style.backgroundColor=n.getStyle().getFillColor())}var n=EJSS_INTERFACE.element(e),i=[],o=0,a=null;n.appendChild=function(e){var t=e.getDOMElement();u.appendChild(t),r()},n.removeChild=function(e){var t=e.getDOMElement();u.removeChild(t),r()},n.insertBefore=function(e,t){var n=e.getDOMElement(),i=t.getDOMElement();u.insertBefore(n,i),r()},n.getTitles=function(){return i},n.setTitles=function(e){EJSS_TOOLS.compareArrays(i,e)||(i=e,t())},n.getSelected=function(){return o},n.setSelected=function(e){o!=e&&(o=e,r())},n.registerProperties=function(e){EJSS_INTERFACE.TabbedPanel.registerProperties(n,e)},n.setFont=function(e){n.getStyle().setFont(e),t()},n.setFillColor=function(e){n.getStyle().setFillColor(e),r()},n.setBackgroundColor=function(e){a=e,t()},n.setColor=function(e){n.getStyle().setColor(e),t()};var s=document.createElement("span");s.className="_TabbedPanel.span",s.id=e,document.body.appendChild(s),n.setDOMElement(s);var l=document.createElement("ul");l.className="_TabbedPanel.ul",l.id=e+".ul",s.appendChild(l);var u=document.createElement("span");return u.id=e+".divs",s.appendChild(u),t(),n.getStyle().setFillColor("#ccc"),n};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.TextArea={},EJSS_INTERFACE.textArea=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.TextField={},EJSS_INTERFACE.textField=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.TwoStateButton={OFF:!1,ON:!0,registerProperties:function(e,t){EJSS_INTERFACE.Element.registerProperties(e,t),t.registerProperty("TextOn",e.setTextOn),t.registerProperty("ImageOnUrl",e.setImageUrlOn),t.registerProperty("TextOff",e.setTextOff),t.registerProperty("ImageOffUrl",e.setImageUrlOff),t.registerProperty("State",e.setState,e.getState),t.registerAction("OnClick"),t.registerAction("OffClick")}},EJSS_INTERFACE.twoStateButton=function(e){function t(){i.getDOMElement().innerHTML="",u?(o.length>0&&(i.getDOMElement().innerHTML='<img style="vertical-align:inherit;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;" src="'+o+'"/>'),s.length>0&&(i.getDOMElement().innerHTML+='<span style="white-space:pre;vertical-align:inherit;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;">'+s.toString()+"</span>")):(a.length>0&&(i.getDOMElement().innerHTML='<img style="vertical-align:inherit;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;" src="'+a+'"/>'),l.length>0&&(i.getDOMElement().innerHTML+='<span style="white-space:pre;vertical-align:inherit;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;">'+l.toString()+"</span>"))}function r(e){var t=i.getState();i.setState(!t);var r=i.getController();return r&&(r.propertiesChanged("State"),t?r.invokeAction("OnClick"):r.invokeAction("OffClick"),r.reportInteractions()),e.preventDefault(),e.stopPropagation(),!1}var n=EJSS_INTERFACE.TwoStateButton,i=EJSS_INTERFACE.element(e),o="",a="",s="",l="",u=-1;i.setTextOff=function(e){l=e,t()},i.getTextOff=function(){return l},i.setImageUrlOff=function(e){var r=i.getResourcePath(e);r!=a&&(a=r,t())},i.getImageUrlOff=function(){return a},i.setTextOn=function(e){s=e,t()},i.getTextOn=function(){return s},i.setImageUrlOn=function(e){var r=i.getResourcePath(e);r!=o&&(o=r,t())},i.getImageUrlOn=function(){return o},i.setState=function(e){"string"==typeof e&&(e=n[e.toUpperCase()]),e!=u&&(u=e,t())},i.getState=function(){return u},i.registerProperties=function(e){EJSS_INTERFACE.TwoStateButton.registerProperties(i,e)};var g=document.createElement("button");return g.id=e,g.style.verticalAlign="middle",g.style.webkitTouchCallout="none",document.body.appendChild(g),i.setDOMElement(g),i.getDOMElement().oncontextmenu=function(e){return e.preventDefault(),e.stopPropagation(),!1},i.getDOMElement().addEventListener("mouseup",r),i.getDOMElement().addEventListener("touchend",r),i};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.Video={},EJSS_INTERFACE.video=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.WebGLCanvas={},EJSS_INTERFACE.webGLCanvas=function(e){};var EJSS_INTERFACE=EJSS_INTERFACE||{};EJSS_INTERFACE.WrappedPanel={},EJSS_INTERFACE.wrappedPanel=function(e){};var EJSS_CORE=EJSS_CORE||{};EJSS_CORE.Model={MODE_JAVA_STYLE:1,MODE_RESPECT_TIME:2,MODE_RESPECT_DELAY:3},EJSS_CORE.createAnimation=function(){function e(e){for(var t=0,r=e.length;t<r;t++)if(c=!1,e[t](),c)return}var t,r,n,i={},o="Choose a name for the file",a=1,s=1,l=!1,u=!0,g=!1,c=!1,S=+new Date,d=!1,E=null,f=NaN,p=a,h=0,m=10,A=!0,_=!1,I=EJSS_CORE.Model.MODE_JAVA_STYLE;i.setView=function(e){E=e,E._12(function(){d||E._16(O,r,d)&&(i.automaticResetSolvers(),i.update())})},i.getView=function(){return E},i.serialize=function(){var e={};i._userSerialize&&(e=i._userSerialize());var t=E.serialize(),r={model:e,view:t};return JSON.stringify(r,function(e,t){return"number"==typeof t&&(isNaN(t)?t="__NaN":isFinite(t)||(t="__Infinity")),t})},i.unserialize=function(e){var t=JSON.parse(e,function(e,t){return"__NaN"==t?t=NaN:"__Infinity"==t&&(t=1/0),t});if(t.model){var r=t.model;i._userUnserialize&&i._userUnserialize(r)}if(t.view){var n=t.view;E.unserialize(n)}};var D,P,T,C,N;i.sendCallback=function(){},i.setStatusParams=function(e,t,r,n,o,a){D=e,P=t,T=r,C=n,N=o,a&&(i.sendCallback=a)},i.sendSnapshot=function(e,t,r,n){C&&e.importGraphics(function(e){var i=new XMLHttpRequest,o="user_file="+t+"&file="+encodeURIComponent(e)+"&type=png&context_id="+D+"&user_id="+P+"&ejsapp_id="+T;i.open("POST",C,!0),i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.onreadystatechange=function(){4==i.readyState&&200==i.status?r&&r():n&&n()},i.send(o)})},i.sendState=function(e,t,r){if(C){var n=i.serialize(),o=new XMLHttpRequest,a="user_file="+e+"&file="+encodeURIComponent(n)+"&type=json&context_id="+D+"&user_id="+P+"&ejsapp_id="+T;o.open("POST",C,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4==o.readyState&&200==o.status?t&&t():r&&r()},o.send(a)}},i.sendText=function(e,t,r,n,i){if(C){var o=new XMLHttpRequest,a="user_file="+e+"&file="+encodeURIComponent(t)+"&type="+r+"&context_id="+D+"&user_id="+P+"&ejsapp_id="+T;o.open("POST",C,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4==o.readyState&&200==o.status?n&&n():i&&i()},o.send(a)}},i.getState=function(e,t,r){var n=new XMLHttpRequest;n.open("GET",e,!0),n.setRequestHeader("Cache-Control","no-cache"),n.onreadystatechange=function(){4==n.readyState&&200==n.status?(i.unserialize(n.responseText),t&&t()):r&&r()},n.send()},i.getText=function(e,t,r){var n=new XMLHttpRequest;n.open("GET",e,!0),n.setRequestHeader("Cache-Control","no-cache"),n.onreadystatechange=function(){4==n.readyState&&200==n.status?t&&t(n.responseText):r&&r()},n.send()},i.getStateFiles=function(e,t,r){if(T){var n=new XMLHttpRequest,i=N+"?ejsapp_id="+T+"&type="+e;n.open("GET",i,!0),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var e={};e.name=[],e.url=[];for(var i=JSON.parse(n.responseText),o=0;o<i.file_names.length;o++)e.name.push(i.file_names[o].file_name),e.url.push(i.file_paths[o].file_path);t&&t(e)}else r&&r()},n.send()}},i.saveText=function(e,t,r){if(!r){var r=t;t=null}D?EJSS_INTERFACE.BoxPanel.showInputDialog(o,function(e){i.sendText(e,r,t,function(){i.sendCallback()})}):i.sendText(e,r,t,function(){i.sendCallback()})},i.saveState=function(e){D?EJSS_INTERFACE.BoxPanel.showInputDialog(o,function(e){i.sendState(e,function(){i.sendCallback()})}):i.sendState(e,function(){i.sendCallback()})},i.saveImage=function(e,t){D?EJSS_INTERFACE.BoxPanel.showInputDialog(o,function(e){i.sendSnapshot(E[t],e,function(){i.sendCallback()})}):i.sendSnapshot(E[t],e,function(){i.sendCallback()})},i.readState=function(e,t){if(e)i.getState(e);else{var r=void 0!==t?t:".json";i.getStateFiles(r,function(e){var t={text:e.name,value:e.url};EJSS_INTERFACE.BoxPanel.showSelectDialog("Select a file to read",t,function(e){i.getState(e)})})}},i.readText=function(e,t,r){e?i.getText(e,function(e){if("function"==typeof r)r(e);else{var t={};t[r]=e,i._userUnserialize(t)}}):i.getStateFiles(t,function(e){var t={text:e.name,value:e.url};EJSS_INTERFACE.BoxPanel.showSelectDialog("Select a file to read",t,function(e){i.getText(e,function(e){if("function"==typeof r)r(e);else{var t={};t[r]=e,i._userUnserialize(t)}})})})};var y,v,R=[],O=0,M={},b=!1;i.getEventInteractionsStream=function(e){var t=e.target||e.srcElement,n={pageX:e.pageX,pageY:e.pageY,offsetLeft:t.offsetLeft,offsetTop:t.offsetTop,target:t.id,timeStamp:+new Date};n.runCount=O,n.runTime=r,n.event="mouse",y.send(JSON.stringify(n))},i.startCaptureStream=function(e,t,n,o,a){var s=window.location,l="https:"===s.protocol?"wss:":"ws:";l+="//"+s.host+":"+e;try{y=new WebSocket(l),void 0!==t&&t(),y.onopen=function(){O=0,r=+new Date,E.registerInteractions(y),document.addEventListener("mousemove",i.getEventInteractionsStream),document.addEventListener("touchmove",i.getEventInteractionsStream),document.addEventListener("mousedown",i.getEventInteractionsStream),document.addEventListener("touchstart",i.getEventInteractionsStream)},y.onclose=function(e){i.stopCaptureStream(),a(e)},y.onmessage=function(e){console.log("Message is received: "+e.data)}}catch(e){return void(void 0!==n&&n(e))}},i.stopCaptureStream=function(){try{y.close()}catch(e){}E.unregisterInteractions(),document.removeEventListener("mousemove",i.getEventInteractionsStream),document.removeEventListener("touchmove",i.getEventInteractionsStream),document.removeEventListener("mousedown",i.getEventInteractionsStream),document.removeEventListener("touchstart",i.getEventInteractionsStream)},i.playCaptureStream=function(e,t,n,i,o){if(!b){b=!0;var a=[];try{v=new EventSource(e),void 0!==t&&t(),v.onopen=i,v.onclose=function(e){var t=document.getElementById("_my_mouse");t&&document.body.removeChild(t),o(e)},v.onmessage=function(e){var t=JSON.parse(e.data);console.log("Now: "+Date.now()+"-"+t.timeStamp),a=a.concat(t.interactions)}}catch(e){return void(void 0!==n&&n(e))}setTimeout(function(){O=0,r=+new Date,w=[];var e=0,t=O,n=0,i=0,o=0,s=0,l=setInterval(function(){for(var r=e;r<a.length;){var u=a[r++];if(void 0!==u.isPlaying&&u.isPlaying)w.push(u),e++;else if(u.runCount==t&&n>=u.timeStamp-u.runTime&&i<=u.timeStamp-u.runTime){e++,i=u.timeStamp-u.runTime;for(var g in M){var c=E[g];c.getDOMElement().style.border=M[g]}if(M={},void 0!==u.event){var S=u.pageX,d=u.pageY,f=u.target;if(void 0!==f&&f.length>0){var c=document.getElementById(f);null!=c&&(o=u.offsetLeft-c.offsetLeft,s=u.offsetTop-c.offsetTop)}S-=o,d+=s;var p=document.getElementById("_my_mouse");if(!p){var p=document.createElement("div");p.id="_my_mouse",p.style.position="absolute",p.style.margin="0",p.style.border="3px solid red",document.body.appendChild(p)}p.style.left=S+"px",p.style.top=d+"px"}else if(void 0!==u.property){var c=E[u.element];c.propertyChanged(u.property,u.data).reportInteractions()}else if(void 0!==u.action){var c=E[u.element];c.invokeAction(u.action).reportInteractions(),void 0===M[c.getName()]&&(M[c.getName()]=c.getDOMElement().style.border),c.getDOMElement().style.border="1px solid red"}}}t!=O?(t=O,n=0,i=0):n+=10,b||clearInterval(l)},10)},1e3)}},i.pauseCaptureStream=function(){try{v.close()}catch(e){}b=!1},i.getEventInteractions=function(e){var t=e.target||e.srcElement,n={pageX:e.pageX,pageY:e.pageY,offsetLeft:t.offsetLeft,offsetTop:t.offsetTop,target:t.id,timeStamp:e.timeStamp};n.runCount=O,n.runTime=r,n.event="mouse",R.push(n)},i.startCapture=function(){O=0,r=+new Date,E.registerInteractions(),R=[],document.addEventListener("mousemove",i.getEventInteractions),document.addEventListener("touchmove",i.getEventInteractions),document.addEventListener("mousedown",i.getEventInteractions),document.addEventListener("touchstart",i.getEventInteractions)},i.stopCapture=function(){return E.unregisterInteractions(),document.removeEventListener("mousemove",i.getEventInteractions),document.removeEventListener("touchmove",i.getEventInteractions),document.removeEventListener("mousedown",i.getEventInteractions),document.removeEventListener("touchstart",i.getEventInteractions),{interactions:E.getRegInteractions(),events:R}},i._readCapturedInteractions=function(){for(var e=w.length,t=0;t<e;t++){var r=w[t];if(r.runCount==O&&r.isPlaying){if("undefined"!==r.property){var n=E[r.element];n.propertyChanged(r.property,r.data).reportInteractions()}if("undefined"!==r.action){var n=E[r.element];n.invokeAction(r.action).reportInteractions(),void 0===M[n.getName()]&&(M[n.getName()]=n.getDOMElement().style.border),n.getDOMElement().style.border="1px solid red"}r.runCount=-1}}};var G=!1,L=!1,x=1,J=!1,w=[];i.playCapture=function(e,t,n){var o=e.interactions,s=o.length,l=0,u=e.events,g=u.length,c=0;if(!G){G=!0,L=!1,i.reset(),void 0!==n&&(x=n),a/=x,O=0,r=+new Date,w=o;var S=O,d=0,f=0,p=0,h=setInterval(function(){for(var e in M){var r=E[e];r.getDOMElement().style.border=M[e]}if(M={},G){for(;l<s&&o[l].runCount<=S&&d>=o[l].timeStamp-o[l].runTime;){if(!o[l].isPlaying){if("undefined"!==o[l].property){var r=E[o[l].element];r.propertyChanged(o[l].property,o[l].data).reportInteractions()}if("undefined"!==o[l].action){var r=E[o[l].element];r.invokeAction(o[l].action).reportInteractions(),void 0===M[r.getName()]&&(M[r.getName()]=r.getDOMElement().style.border),r.getDOMElement().style.border="1px solid red"}}l++}for(;c<g&&u[c].runCount<=S&&d>=u[c].timeStamp-u[c].runTime;){var n=u[c].pageX,i=u[c].pageY,m=u[c].target;if(void 0!==m&&m.length>0){var r=document.getElementById(m);null!=r&&(f=u[c].offsetLeft-r.offsetLeft,p=u[c].offsetTop-r.offsetTop)}n-=f,i+=p;var A=document.getElementById("_my_mouse");if(!A){var A=document.createElement("div");A.id="_my_mouse",A.style.position="absolute",A.style.margin="0",A.style.border="3px solid red",document.body.appendChild(A)}A.style.left=n+"px",A.style.top=i+"px",c++}if(S!=O?(S=O,d=0):d+=10*x,c>=g&&l>=s){var A=document.getElementById("_my_mouse");A&&document.body.removeChild(A),clearInterval(h),G=!1,a*=x,w=[],t()}}L&&(clearInterval(h),G=!1,a*=x,w=[],t())},10)}},i.pauseCapture=function(){J=d,i.pause(),G=!1},i.resumeCapture=function(){J&&i.play(),G=!0},i.resetCapture=function(){L=!0},i.changeCaptureStep=function(e){a*=x,x=e,a/=x},i.setMode=function(e){i.setRunningMode(e)},i.setRunningMode=function(e){I="string"==typeof e?EJSS_CORE.Model[e.toUpperCase()]:e},i.getMode=function(){return I},i.setRunAlways=function(e){_=e},i.setPauseOnPageExit=function(e){_=!e},i.setFPS=function(e){a=Math.max(1e3/e,1)},i.getFPS=function(){return Math.floor(1e3/a)},i.setDelay=function(e){a=Math.max(e,0)},i.getDelay=function(e){return a},i.setMinimumDelay=function(e){m=Math.max(e,0)},i.setStepsPerDisplay=function(e){e>=1&&(s=e)},i.setUpdateView=function(e){u=e},i.setAutoplay=function(e){g=e},i.isPlaying=function(){return d},i.isPaused=function(){return!d},i.resetRealTime=function(){var e=+Date();f=1e3*i.getRealTime()-e},i.play=function(){d||(S=+new Date,p=a,d=!0,t=window.setTimeout(i.run,m))},i.pause=function(){d=!1,l=!0,0!=t&&(window.clearTimeout(t),t=0)},i.run=function(){O++,r=+new Date;var e,n=1;if(d){if(A||_){switch(I){default:case EJSS_CORE.Model.MODE_JAVA_STYLE:i.step(),S=+new Date,e=S-r,n=Math.max(m,a-e);break;case EJSS_CORE.Model.MODE_RESPECT_DELAY:i.step(),n=a,S=+new Date;break;case EJSS_CORE.Model.MODE_RESPECT_TIME:if((e=r-S)>=p-h){var o=0;p&&(o=Math.floor((e+h)/p),h=e+h-o*p);var s=i.step(o);p&&s>e&&o>100&&(alert("Imposible running with delay "+p+" ms."),d=!1,h=0),p=a,S=r}}var l=t;if(i._readCapturedInteractions(),E._16(O,r,d)&&(i.automaticResetSolvers(),i.update()),l!=t)return}else S=+new Date;t=window.setTimeout(i.run,n)}},i.onExit=function(){i.pause(),E._16(O,r,d),i.freeMemory()},i.reset=function(e){e||(i.pause(),i.resetModel()),E._14(!1),E._reset(),e||(E._15(),E._initialize(),i.initializeModel()),i.updateModel(),u?(E._update(),E._render()):E._collectData(),E._14(!0),g&&i.play(),E._resized(window.innerWidth,window.innerHeight)},i.initialize=function(){E._initialize(),i.initializeModel(),i.updateModel(),u?(E._update(),E._render()):E._collectData()},i.update=function(){(A||_)&&(i.updateModel(),u?(E._update(),E._render()):E._collectData())},i.step=function(e){var t=+new Date;e||(e=1);var r=Math.max(e,s);if(r>1){l=!1;for(var n=1;n<r;n++){if(l)return void i.update();i.stepModel(),i.updateModel(),E._collectData()}}i.stepModel();var o=+new Date-t;return i.update(),o},i.setShouldBreak=function(e){c=e},i.getShouldBreak=function(){return c},i._autoSelectView=function(e){for(var t=screen.height,r=screen.width,n=[],i=Number.MAX_VALUE,o=0;o<e.length;o++){var a=r-e[o].width;a>=0&&(a<i?(i=a,n=[o]):a==i&&n.push(o))}var s=-1;i=Number.MAX_VALUE;for(var o=0;o<n.length;o++){var a=Math.abs(t-e[n[o]].height);a<i&&(i=a,s=n[o])}return s},i.addToOnload=function(e){n=e},i.onload=function(){"function"==typeof n&&n()},i.parseInputParameters=function(e){if("string"==typeof e||e instanceof String)try{e=EJSS_TOOLS.Decode.hex_to_ascii(e),e=EJSS_TOOLS.Decode.decode(e),"'"==e[0]&&"'"==e[e.length-1]?e=e.substring(1,e.length-1):'"'==e[0]&&'"'==e[e.length-1]&&(e=e.substring(1,e.length-1)),e=JSON.parse(e)}catch(t){return console.log("Error trying to parse input parameters: "+e),null}return e};var k=[],W=[],F=[],V=[];return i.getRealTime=function(){return NaN},i.automaticResetSolvers=function(){},i.freeMemory=function(){},i.addToReset=function(e){k.push(e)},i.addToInitialization=function(e){W.push(e)},i.addToEvolution=function(e){F.push(e)},i.addToFixedRelations=function(e){V.push(e)},i.resetModel=function(){e(k)},i.initializeModel=function(){e(W)},i.stepModel=function(){e(F)},i.updateModel=function(){e(V)},window.onblur=function(){A=!1,E&&E._onBlur()},window.onfocus=function(){A=!0,E&&E._onFocus()},i};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.Bootstrap2IntervalData={},EJSS_ODE_INTERPOLATION.bootstrap2IntervalData=function(e,t,r,n,i){var o,a,s,l,u=EJSS_ODE_INTERPOLATION.bootstrapIntervalData(e,t,r,n,i);u.interpolate=function(e,t){var r=u.getDeltaTime(),n=u.getLeftState(),i=u.getLeftRate(),g=(e-u.getLeft())/r;return n[t]+g*(r*i[t]+g*(o[t]+g*(a[t]+g*(s[t]+g*l[t]))))},u.interpolateState=function(e,t,r,n){return u.bootstrap2((e-u.getLeft())/u.getDeltaTime(),t,r,n),t},u.bootstrap2=function(e,t,r,n){for(var i=u.getDeltaTime(),g=u.getLeftState(),c=u.getLeftRate(),S=r,d=0;d<n;d++)t[d]=g[S]+e*(i*c[S]+e*(o[S]+e*(a[S]+e*(s[S]+e*l[S])))),S++};var g=e.length,c=g-1,S=u.getDeltaTime(),d=new Array(g),E=new Array(g),f=new Array(g);o=new Array(g),a=new Array(g),s=new Array(g),l=new Array(g),u.bootstrap1(.7,d,0,c),d[c]=u.getLeft()+.7*S,i.getRate(d,E),u.bootstrap1(.85,d,0,c),d[c]=u.getLeft()+.85*S,i.getRate(d,f);for(var p=0;p<g;p++){var h=r[p]-e[p],m=S*t[p],A=S*n[p],_=S*E[p]+.7*(.7*-3+2)*A+(1.33-1)*m+-1.26*h,I=S*f[p]+.85*(2-2.55)*A+(.85*(4-2.55)-1)*m+-.765*h,D=(.85*(4-4.579375)*_- -.4095*I)/.009639000000000005,P=(.7*(2+.7*-3.2)*I-.85*(2-2.21)*_)/.009639000000000005,T=A+m-2*h-2*D-3*P;l[p]=P,s[p]=D,a[p]=T,o[p]=h-m-T-D-P}return u};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.BootstrapIntervalData={},EJSS_ODE_INTERPOLATION.bootstrapIntervalData=function(e,t,r,n,i){var o,a,s,l=EJSS_ODE_INTERPOLATION.hermiteIntervalData(e,t,r,n);l.interpolate=function(e,t){var r=l.getDeltaTime(),n=l.getLeftState(),i=l.getLeftRate(),u=(e-l.getLeft())/r;return n[t]+u*(r*i[t]+u*(o[t]+u*(a[t]+u*s[t])))},l.interpolateState=function(e,t,r,n){return l.bootstrap1((e-l.getLeft())/l.getDeltaTime(),t,r,n),t},l.bootstrap1=function(e,t,r,n){for(var i=l.getDeltaTime(),u=l.getLeftState(),g=l.getLeftRate(),c=r,S=0;S<n;S++)t[S]=u[c]+e*(i*g[c]+e*(o[c]+e*(a[c]+e*s[c]))),c++};var u=e.length,g=l.getDeltaTime(),c=new Array(u),S=new Array(u);o=new Array(u),a=new Array(u),s=new Array(u),l.hermite(.25,c,0,u-1),c[u-1]=l.getLeft()+.25*g,i.getRate(c,S);for(var d=0;d<u;d++){var E=r[d]-e[d],f=g*t[d],p=g*n[d],h=(g*S[d]+.3125*p+-.1875*f+-1.125*E)/.1875,m=p+f-2*E-2*h;s[d]=h,a[d]=m,o[d]=E-f-m-h}return l};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.ConstantConditionData={},EJSS_ODE_INTERPOLATION.constantConditionData=function(e){var t,r=EJSS_ODE_INTERPOLATION.intervalData(Number.NaN,Number.NaN);r.interpolate=function(e,r){return t[r]},r.interpolateState=function(e,r,n,i){for(var o=n,a=0;a<i;a++)r[a]=t[o],o++;return r};var n=e.length;t=new Array(n);for(var i=0;i<n;i++)t[i]=e[i];return r};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.Dopri5IntervalData={},EJSS_ODE_INTERPOLATION.dopri5IntervalData=function(e,t,r){var n=EJSS_ODE_INTERPOLATION.extraStepsIntervalData(e,t,r);return n.interpolate=function(e,t){var r=(e-n.getLeft())/n.getDeltaTime(),i=1-r,o=n.getCoeffs();return o[0][t]+r*(o[1][t]+i*(o[2][t]+r*(o[3][t]+i*o[4][t])))},n.interpolateState=function(e,t,r,i){for(var o=(e-n.getLeft())/n.getDeltaTime(),a=1-o,s=n.getCoeffs(),l=r,u=0;u<i;u++)t[u]=s[0][l]+o*(s[1][l]+a*(s[2][l]+o*(s[3][l]+a*s[4][l]))),l++;return t},n};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.Dopri853IntervalData={},EJSS_ODE_INTERPOLATION.dopri853IntervalData=function(e,t,r){var n=EJSS_ODE_INTERPOLATION.extraStepsIntervalData(e,t,r);return n.interpolate=function(e,t){var r=(e-n.getLeft())/n.getDeltaTime(),i=1-r,o=n.getCoeffs();return o[0][t]+r*(o[1][t]+i*(o[2][t]+r*(o[3][t]+i*(o[4][t]+r*(o[5][t]+i*(o[6][t]+r*o[7][t]))))))},n.interpolateState=function(e,t,r,i){for(var o=(e-n.getLeft())/n.getDeltaTime(),a=1-o,s=n.getCoeffs(),l=r,u=0;u<i;u++)t[u]=s[0][l]+o*(s[1][l]+a*(s[2][l]+o*(s[3][l]+a*(s[4][l]+o*(s[5][l]+a*(s[6][l]+o*s[7][l])))))),l++;return t},n};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.EulerIntervalData={},EJSS_ODE_INTERPOLATION.eulerIntervalData=function(e,t,r){var n,i,o=EJSS_ODE_INTERPOLATION.intervalData(e[e.length-1],r);o.interpolate=function(e,t){var r=e-o.getLeft();return n[t]+r*i[t]},o.interpolateState=function(e,t,r,a){for(var s=e-o.getLeft(),l=r,u=0;u<a;u++)t[u]=n[l]+s*i[l],l++;return t};var a=e.length;n=new Array(a),i=new Array(a);for(var s=0;s<a;s++)n[s]=e[s],i[s]=t[s];return o};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.EulerRichardsonIntervalData={},EJSS_ODE_INTERPOLATION.eulerRichardsonIntervalData=function(e,t,r,n){var i,o,a,s,l,u=EJSS_ODE_INTERPOLATION.intervalData(e[e.length-1],r);u.interpolate=function(e,t){var r=(e-u.getLeft())/o,n=r*r*o,i=o*r-n;return a[t]+i*s[t]+n*l[t]},u.interpolateState=function(e,t,r,n){for(var i=(e-u.getLeft())/o,g=i*i*o,c=o*i-g,S=r,d=0;d<n;d++)t[d]=a[S]+c*s[S]+g*l[S],S++;return t};var g=e.length;a=new Array(g),s=new Array(g),l=new Array(g);for(var c=0;c<g;c++)a[c]=e[c],s[c]=t[c],l[c]=n[c];return i=g-1,o=r-e[i],u};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.ExtraStepsIntervalData={},EJSS_ODE_INTERPOLATION.extraStepsIntervalData=function(e,t,r){var n,i,o,a=EJSS_ODE_INTERPOLATION.intervalData(e[e.length-1],t[t.length-1]);a.getTimeIndex=function(){return n},a.getDeltaTime=function(){return i},a.getCoeffs=function(){return o};var s=e.length;n=s-1,i=t[n]-e[n];var l=r.length;o=new Array(l);for(var u=0;u<l;u++){o[u]=new Array(s);for(var g=0;g<s;g++)o[u][g]=r[u][g]}return a};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.HermiteIntervalData={},EJSS_ODE_INTERPOLATION.hermiteIntervalData=function(e,t,r,n){var i,o,a,s,l,u,g=EJSS_ODE_INTERPOLATION.intervalData(e[e.length-1],r[r.length-1]);g.getTimeIndex=function(){return i},g.getDeltaTime=function(){return o},g.getLeftState=function(){return a},g.getLeftRate=function(){return s},g.interpolate=function(e,t){var r=(e-g.getLeft())/o,n=r-1,i=r*n,c=i*(1-2*r),S=-n-c,d=r+c,E=i*n*o,f=i*r*o;return S*a[t]+d*l[t]+E*s[t]+f*u[t]},g.interpolateState=function(e,t,r,n){return g.hermite((e-g.getLeft())/o,t,r,n),t},g.hermite=function(e,t,r,n){for(var i=e-1,g=e*i,c=g*(1-2*e),S=-i-c,d=e+c,E=g*i*o,f=g*e*o,p=r,h=0;h<n;h++)t[h]=S*a[p]+d*l[p]+E*s[p]+f*u[p],p++};var c=e.length;a=new Array(c),s=new Array(c),l=new Array(c),u=new Array(c);for(var S=0;S<c;S++)a[S]=e[S],s[S]=t[S],l[S]=r[S],u[S]=n[S];return i=c-1,o=r[i]-e[i],g};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.InitialConditionData={},EJSS_ODE_INTERPOLATION.initialConditionData=function(e){var t,r=EJSS_ODE_INTERPOLATION.intervalData(Number.NaN,Number.NaN);r.interpolate=function(r,n){return e.getInitialCondition(r,t),t[n]},r.interpolateState=function(r,n,i,o){e.getInitialCondition(r,t);for(var a=i,s=0;s<o;s++)n[s]=t[a],a++;return n};var n=e.getState(),i=n.length;return t=new Array(i),r};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.IntervalData={},EJSS_ODE_INTERPOLATION.intervalData=function(e,t){var r={};return r.getLeft=function(){return e},r.getRight=function(){return t},r.setRight=function(e){t=e},r.interpolate=function(e,t){return Number.NaN},r.interpolateState=function(e,t,r,n){return t},r};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.Radau5IntervalData={},EJSS_ODE_INTERPOLATION.radau5IntervalData=function(e,t,r){var n=EJSS_ODE_INTERPOLATION.extraStepsIntervalData(e,bState,r),i=bState[bState.length-1];return n.interpolate=function(e,t){var r=(e-i)/n.getDeltaTime(),o=n.getCoeffs(),a=EJSS_ODE_SOLVERS.Radau5.c1m1,s=EJSS_ODE_SOLVERS.Radau5.c2m1;return o[0][t]+r*(o[1][t]+(r-s)*(o[2][t]+(r-a)*o[3][t]))},n.interpolateState=function(e,t,r,o){for(var a=(e-i)/mDeltaTime,s=n.getCoeffs(),l=EJSS_ODE_SOLVERS.Radau5.c1m1,u=EJSS_ODE_SOLVERS.Radau5.c2m1,g=r,c=0;c<o;c++)t[c]=s[0][g]+a*(s[1][g]+(a-u)*(s[2][g]+(a-l)*s[3][g])),g++;return t},n};var EJSS_ODE_INTERPOLATION=EJSS_ODE_INTERPOLATION||{};EJSS_ODE_INTERPOLATION.StateHistory={},EJSS_ODE_INTERPOLATION.stateHistory=function(e){var t,r={},n=[],i=!0,o=0,a=0,s=0;return r.setLength=function(e){a=Math.abs(e),s=Math.max(o,a)},r.setMinimumLength=function(e){o=Math.abs(e),s=Math.max(o,a)},r.addIntervalData=function(e){i=e.getLeft()<=e.getRight();n.length;if(n.length>0){var t=n.length-1,r=n[t],o=0;if(i){for(;null!=r&&r.getLeft()>=e.getLeft();)o++,t--,r=t<0?null:n[t];null!=r&&e.getLeft()<r.getRight()&&r.setRight(e.getLeft())}else{for(;null!=r&&r.getLeft()<=e.getLeft();)o++,t--,r=t<0?null:n[t];null!=r&&e.getLeft()>r.getRight()&&r.setRight(e.getLeft())}o>0&&n.splice(t,o)}n.push(e)},r.toString=function(){for(var e="History has now "+n.length+" intervals: ",t=0,r=n.length;t<r;t++){var i=n[t];t>0&&(e+=", "),e+=" ["+i.getLeft()+","+i.getRight()+")"}return e},r.clearAll=function(){n=[]},r.clean=function(e){if(isFinite(s)){if(0==s)return void clearAll();var t=0,r=n.length;if(i){e-=s;for(var o=0;o<r;o++){var a=n[o];if(a.getRight()>e)break;t++}}else{e+=s;for(var o=0;o<r;o++){var a=n[o];if(a.getRight()<e)break;t++}}t>0&&n.splice(0,t)}},r.findInterval=function(e){var r=n.length;if(i)for(var o=r-1;o>=0;o--){var a=n[o];if(a.getLeft()<=e)return a}else for(var o=r-1;o>=0;o--){var a=n[o];if(a.getLeft()>=e)return a}return t},r.interpolate=function(e,t){return r.findInterval(e).interpolate(e,t)},r.interpolateState=function(e,t,n,i){var o=r.findInterval(e);return i||(i=t.length),n||(n=0),o.interpolateState(e,t,n,i)},e.getInitialCondition?(t=EJSS_ODE_INTERPOLATION.initialConditionData(e),e.setStateHistory(r)):t=EJSS_ODE_INTERPOLATION.constantConditionData(e.getState()),r};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.EVENT_TYPE={STATE_EVENT:0,POSITIVE_EVENT:1,CROSSING_EVENT:2},EJSS_ODE_SOLVERS.EVENT_METHOD={BISECTION:0,SECANT:1},EJSS_ODE_SOLVERS.ERROR={NO_ERROR:0,INTERNAL_SOLVER_ERROR:1,EVENT_NOT_FOUND:2,ILLEGAL_EVENT_STATE:3,ZENO_EFFECT:4,TOO_MANY_STEPS_ERROR:5,DISCONTINUITY_PRODUCED_ERROR:6,DID_NOT_CONVERGE:7},EJSS_ODE_SOLVERS.DISCONTINUITY_CODE={DISCONTINUITY_PRODUCED_ERROR:0,NO_DISCONTINUITY_ALONG_STEP:1,DISCONTINUITY_ALONG_STEP:2,DISCONTINUITY_JUST_PASSED:3,DISCONTINUITY_EXACTLY_ON_STEP:4},EJSS_ODE_SOLVERS.InterpolatorEventSolver={},EJSS_ODE_SOLVERS.interpolatorEventSolver=function(e,t){function r(t,r){h?e.bestInterpolate(t,r):e.interpolate(t,r)}function n(){var n=t.getState(),i=e.getCurrentRate(),o=n[S];if(o+i[S]==o)return 0;var a=e.getMaximumTime(!1);return isNaN(a)?f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver at "+n[S]):o==a&&(a=e.internalStep(!1),isNaN(a))?f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver at max step at "+n[S]):(r(a,n),a-o)}function i(){var n=t.getState(),i=e.getCurrentRate(),o=n[S];if(o+i[S]==o)return 0;var a=n[S]+m,s=e.getMaximumTime(!1);if(isNaN(s))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver at "+n[S]);var l=0;if(N)for(;s<a;){if(s=e.internalStep(!1),isNaN(s))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver forwards at "+n[S]);if(++l>C){var u=n[S],g=e.bestInterpolate(a,new Array(c))[S];return f.error(EJSS_ODE_SOLVERS.ERROR.TOO_MANY_STEPS_ERROR,"The solver exceeded the maximum of "+C+" internal steps\nat "+g+", starting from "+u+" for an step of "+m)}}else for(;s>a;){if(s=e.internalStep(!1),isNaN(s))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver backwards at "+n[S]);if(++l>C)return f.error(EJSS_ODE_SOLVERS.ERROR.TOO_MANY_STEPS_ERROR,"The solver exceeded the number of internal steps at "+n[S])}return r(a,n),m}function o(){var n=t.getState();if(D>0&&x>D&&l(n))return 0;var i=n[S];if(i+e.getCurrentRate()[S]==i)return 0;var o=e.getMaximumTime(W);if(isNaN(o))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver at "+n[S]);if(i==o&&(o=e.internalStep(W),isNaN(o)))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver forwards at "+n[S]);null!=L&&(isNaN(L.getMaxAdvance())||(o=N?Math.min(o,L.getMaxAdvance()):Math.max(o,L.getMaxAdvance())));for(var a=N?Math.min(i+I,o):Math.max(i-I,o);;){var u=null;if(w=null,r(a,d),u=f.findFirstEvent(n,a,d),null==u&&null!=F&&F.getTime()<=a&&(u=F),null!=u){if(w=u,h)e.bestInterpolate(u.getTime(),n);else for(var g=0;g<c;g++)n[g]=d[g];var E=n[S];return u.action(),(f.reinitialize(),n=t.getState(),E!=n[S])?(x=0,L=null,w=null,u.reset(n),u.getTime()-i):(null!=L&&(Math.abs(G-u.getTime())<P?x++:x=0),L=u,G=u.getTime(),u.getTime()-i)}if(a==o){for(var g=0;g<c;g++)n[g]=d[g];return s(n[S]),o-i}a=N?Math.min(a+I,o):Math.max(a-I,o)}}function a(){var n=t.getState();if(D>0&&x>D&&l(n))return 0;var i=n[S];if(i+e.getCurrentRate()[S]==i)return 0;var o=i+m,a=e.getMaximumTime(W);if(isNaN(a))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver at "+n[S]);for(var u=N?Math.min(i+I,o):Math.max(i-I,o),g=0;;){var E=null;w=null;if(N?a<u:a>u){if(e.bestInterpolate(a,d),E=f.findFirstEvent(n,a,d),null==E&&(E=F),null==E){for(var p=0;p<c;p++)n[p]=d[p];if(s(n[S]),a=e.internalStep(W),isNaN(a))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver looking for an event at "+n[S]);if(++g>C)return f.error(EJSS_ODE_SOLVERS.ERROR.TOO_MANY_STEPS_ERROR,"The solver exceeded the number of internal steps at "+n[S]);continue}}else if(r(u,d),E=f.findFirstEvent(n,u,d),null==E&&null!=F&&F.time<=u&&(E=F),null==E){if(u==o){for(var p=0;p<c;p++)n[p]=d[p];return s(n[S]),o-i}u=N?Math.min(u+I,o):Math.max(u-I,o);continue}if(w=E,h)e.bestInterpolate(E.getTime(),n);else for(var p=0;p<c;p++)n[p]=d[p];var A=n[S],_=E.action();if(f.reinitialize(),g=0,n=t.getState(),A!=n[S])return x=0,L=null,w=null,E.reset(n),E.getTime()-i;if(null!=L&&(Math.abs(G-E.getTime())<P?(x++,T&&(_=!1)):x=0),L=E,G=E.getTime(),_)return E.getTime()-i;if(D>0&&x>D&&l(n))return E.getTime()-i;if(F=null,a=e.getMaximumTime(W),isNaN(E.getMaxAdvance())||(a=N?Math.min(a,E.getMaxAdvance()):Math.max(a,E.getMaxAdvance())),isNaN(a))return f.error(EJSS_ODE_SOLVERS.ERROR.INTERNAL_SOLVER_ERROR,"Error when stepping the solver after an event at "+n[S])}}function s(e){var t,r;for(r=O.length,t=0;t<r;t++){var n=O[t];n.findPosition(e,n.getH())}for(r=V.length,t=0;t<r;t++){var n=V[t];n.findPosition(e,n.getH())}}function l(e){if(J.length<=0)return f.error(EJSS_ODE_SOLVERS.ERROR.ZENO_EFFECT,"A Zeno-like effect has been detected.\nLast event was "+L.getProblem()+" which took place at "+G),!0;var t,r=!1,n=J.length;for(t=0;t<n;t++){J[t].zenoEffectAction(L.getProblem(),e)&&(r=!0)}return x=0,r}function u(e,t,r,n){r.splice(0,r.length);for(var i=O.length,o=0;o<i;o++){var a=O[o];switch(a.setH(a.getEvent().evaluate(t)),a.getCurrentPosition()){default:case EJSS_ODE_SOLVERS.ProblemData.POSITIVE:a.getH()<=0&&r.push(a);break;case EJSS_ODE_SOLVERS.ProblemData.SMALL_POSITIVE:if(a.getH()<=0&&(a.hasPositiveFlag()||a.getEventType()==EJSS_ODE_SOLVERS.EVENT_TYPE.STATE_EVENT))return a;break;case EJSS_ODE_SOLVERS.ProblemData.ZERO:if(a.getH()<0){if(a.hasPositiveFlag()||a.getEventType()==EJSS_ODE_SOLVERS.EVENT_TYPE.STATE_EVENT)return a}else if(a.getH()>0&&a.hasNegativeFlag()&&a.getEventType()==EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT)return a;break;case EJSS_ODE_SOLVERS.ProblemData.SMALL_NEGATIVE:if(a.getEventType()==EJSS_ODE_SOLVERS.EVENT_TYPE.STATE_EVENT){if(a.getH()<=-a.getEvent().getTolerance())return a}else if(a.getEventType()==EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT&&a.hasNegativeFlag()&&a.getH()>=0)return a;break;case EJSS_ODE_SOLVERS.ProblemData.NEGATIVE:if(a.getEventType()==EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT)a.getH()>=0&&r.push(a);else if(a.getEventType()==EJSS_ODE_SOLVERS.EVENT_TYPE.STATE_EVENT)return f.error(EJSS_ODE_SOLVERS.ERROR.ILLEGAL_EVENT_STATE,"The system started from an illegal state at "+e+" for the state event "+a.getEvent()),a}}return null}function g(e,t,r){var n,i,o=e.length,a=r,s=r-t,l=(t+r)/2;if(N)for(n=0;n<o;n++){var u=e[n];switch(u.getEvent().getRootFindingMethod()){default:case EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION:a=Math.min(a,l);break;case EJSS_ODE_SOLVERS.EVENT_METHOD.SECANT:i=u.getHBefore(),a=Math.min(a,t-i*s/(u.getHAfter()-i))}}else for(n=0;n<o;n++){var u=e[n];switch(u.getEvent().getRootFindingMethod()){default:case EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION:a=Math.max(a,l);break;case EJSS_ODE_SOLVERS.EVENT_METHOD.SECANT:i=u.getHBefore(),a=Math.max(a,t-i*s/(u.getHAfter()-i))}}return a}var c,S,d,E,f={},p=!0,h=!1,m=.1,A=Number.NaN,_=Number.NaN,I=Number.POSITIVE_INFINITY,D=500,P=2*Number.MIN_VALUE,T=!0,C=1e4,N=m>0,y=EJSS_ODE_SOLVERS.ERROR.NO_ERROR,v="No error",R=0,O=[],M=[],b=[],G=Number.NaN,L=null,x=0,J=[],w=null,k=!1,W=!1,F=null,V=[],U=null,Y=100,B=1e-8,z=Number.NaN;return f.getEPSILON=function(){if(isNaN(z)){for(z=1;z+1!=1;)z/=2;z*=2}return z},f.setEnableExceptions=function(e){p=e},f.setBestInterpolation=function(e){h=e},f.setHistoryLength=function(t){e.getStateHistory().setLength(t)},f.setStepSize=function(t){m!=t&&(m=t,N=m>0,f.setInternalStepSize(e.getStepSize()))},f.getStepSize=function(){return m},f.setEstimateFirstStep=function(t){e.setEstimateFirstStep(t)},f.setInternalStepSize=function(t){e.setStepSize(N?Math.abs(t):-Math.abs(t))},f.setMaximumInternalStepSize=function(t){e.setMaximumStepSize(t)},f.setMaximumInternalSteps=function(e){C=e},f.setTolerances=function(t,r){e.setTolerances(A=Math.abs(t),_=Math.abs(r))},f.setTolerance=function(e){setTolerances(e,0)},f.getTolerance=function(){return Math.max(A,_)},f.setDDETolerance=function(e){B=e},f.getDDETolerance=function(){return B},f.setDDEIterations=function(e){Y=e},f.getDDEIterations=function(){return Y},f.addEvent=function(e){O.push(EJSS_ODE_SOLVERS.eventData(f,e,t.getState())),k=!0},f.removeEvent=function(e){for(var t=-1,r=O.length,n=0;n<r;n++){if(O[n].getEvent()==e){t=n;break}}if(t>=0){var i=O[t];L==i&&(L=null,x=0),w==i&&(w=null),O.splice(t,1)}k=W||O.length>0},f.addDiscontinuity=function(e){
V.push(EJSS_ODE_SOLVERS.discontinuityData(f,e,t.getState())),W=!0,k=!0},f.removeDiscontinuity=function(e){for(var t=-1,r=V.length,n=0;n<r;n++){if(V[n].getDiscontinuity()==e){t=n;break}}t>=0&&V.splice(t,1),W=V.length>0,k=W||O.length>0},f.removeAllEvents=function(){O=[],V=[],W=!1,k=!1,null!=U&&f.addDiscontinuity(U)},f.setMaximumEventStep=function(e){I=Math.abs(e)},f.getMaximumEventStep=function(){return I},f.setCoalesceCloseEvents=function(e){T=e},f.isCoalesceCloseEvents=function(){return T},f.setEventProximityThreshold=function(e){P=e},f.getEventProximityThreshold=function(){return P},f.setZenoEffectDetection=function(e){D=e},f.getZenoEffectDetection=function(){return D},f.addZenoEffectListener=function(e){J.push(e)},f.removeZenoEffectListener=function(e){for(var t=J.length,r=0;r<t;r++)if(J[r]==e)return void J.splice(r,1)},f.setZeroZenoCounter=function(){x=0},f.getSolverEngine=function(){return e},f.getODE=function(){return t},f.getStateHistory=function(){return e.getStateHistory()},f.getErrorCode=function(){return y},f.getErrorMessage=function(){return v},f.getCounter=function(){return e.getCounter()},f.getNumberOfAttempts=function(){return R},f.getInternalStepSize=function(){return e.getInternalStepSize()},f.getIndependentVariableValue=function(){return t.getState()[S]},f.getCurrentTime=function(){return t.getState()[S]},f.getRunsForwards=function(){return N},f.getCurrentEventData=function(){return w},f.getLastEventData=function(){return L},f.getLastEventDataTime=function(){return G},f.initialize=function(r){var n,i,o;for(m=r,N=m>0,e.initialize(m),o=t.getState(),c=o.length,S=c-1,d=new Array(c),E=new Array(c),y=EJSS_ODE_SOLVERS.ERROR.NO_ERROR,v="No error",x=0,L=null,w=null,null!==U&&(U.initialize(o),f.removeDiscontinuity(U),f.addDiscontinuity(U)),i=O.length,n=0;n<i;n++)O[n].reset(o);for(i=V.length,n=0;n<i;n++)V[n].reset(o)},f.step=function(){return k?a():i()},f.maxStep=function(){return k?o():n()},f.userReinitialize=function(){w=null,f.reinitialize()},f.reinitialize=function(){var r,n,i=t.getState();for(e.reinitialize(i),y=EJSS_ODE_SOLVERS.ERROR.NO_ERROR,v="No error",null!=U&&U.reset(i),n=O.length,r=0;r<n;r++)O[r].reset(i);for(n=V.length,r=0;r<n;r++)V[r].reset(i);F=null},f.resetDiscontinuities=function(e){if(null!==U){U.reset(e);for(var t=V.length,r=0;r<t;r++)V[r].reset(e)}},f.checkDiscontinuity=function(e,t){for(var r=V.length,n=null,i=0;i<r;i++){var o=V[i],a=o.getDiscontinuity().evaluate(e);switch(o.setH(a),o.getCurrentPosition()){default:case EJSS_ODE_SOLVERS.ProblemData.POSITIVE:if(a<=0)return EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_ALONG_STEP;a<o.getDiscontinuity().getTolerance()&&(n=o);break;case EJSS_ODE_SOLVERS.ProblemData.SMALL_POSITIVE:if(a<=0&&o.hasPositiveFlag())return f.error(EJSS_ODE_SOLVERS.ERROR.ILLEGAL_EVENT_STATE,"The system started from an illegal state at "+e[S]+" for the discontinuity "+o.getDiscontinuity()),EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR;break;case EJSS_ODE_SOLVERS.ProblemData.ZERO:if(a<0&&o.hasPositiveFlag())return f.error(EJSS_ODE_SOLVERS.ERROR.ILLEGAL_EVENT_STATE,"The system started from an illegal state at "+e[S]+" for the discontinuity "+o.getDiscontinuity()),EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR;if(a>0&&o.hasNegativeFlag())return f.error(EJSS_ODE_SOLVERS.ERROR.ILLEGAL_EVENT_STATE,"The system started from an illegal state at "+e[S]+" for the discontinuity "+o.getDiscontinuity()),EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR;break;case EJSS_ODE_SOLVERS.ProblemData.SMALL_NEGATIVE:if(o.hasNegativeFlag()&&a>=0)return f.error(EJSS_ODE_SOLVERS.ERROR.ILLEGAL_EVENT_STATE,"The system started from an illegal state at "+e[S]+" for the discontinuity "+o.getDiscontinuity()),EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR;break;case EJSS_ODE_SOLVERS.ProblemData.NEGATIVE:if(a>0)return EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_ALONG_STEP;a>-o.getDiscontinuity().getTolerance()&&(n=o)}}return null!=n?(t&&(F=n,F.setTime(e[S])),EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_EXACTLY_ON_STEP):EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.NO_DISCONTINUITY_ALONG_STEP},f.error=function(t,r){if(y=t,v=r,p)throw{name:"ODE Solver exception",solver:e,message:r};return Number.NaN},f.findFirstEvent=function(t,n,i){var o,a;R=0;var s=u(t[S],i,M,"at t1");if(null!=s){for(s.time=t[S],s.maxAdvance=n,o=0;o<c;o++)i[o]=t[o];return s}if(M.length<=0)return null;var l=!0;for(a=O.length,o=0;o<a;o++){var d=O[o];d.setHAfter(d.getH())}for(;l;){R++;var p=g(M,t[S],n);r(p,E);var h=u(t[S],E,b,"short");if(null!=h){for(h.time=t[S],h.maxAdvance=p,o=0;o<c;o++)i[o]=t[o];return h}if(b.length<=0){var m=null;for(a=M.length,o=0;o<a;o++){var d=M[o];if(d.getCurrentPosition()==EJSS_ODE_SOLVERS.ProblemData.POSITIVE){if(d.getH()<d.getEvent().getTolerance()){m=d;break}}else if(d.getH()>-d.getEvent().getTolerance()){m=d;break}}if(null!=m){for(m.time=p,m.maxAdvance=n,o=0;o<c;o++)i[o]=E[o];return m}for(o=0;o<c;o++)t[o]=E[o];for(a=O.length,o=0;o<a;o++){var d=O[o];d.findPosition(t[S],d.getH())}var A=u(t[S],i,M,"at tTest");if(null!=A){for(A.time=t[S],A.maxAdvance=n,o=0;o<c;o++)i[o]=t[o];return A}}else{var _=!0,m=null;for(a=b.length,o=0;o<a;o++){var I=b[o];if(I.getCurrentPosition()==EJSS_ODE_SOLVERS.ProblemData.POSITIVE){if(I.getH()<=-I.getEvent().getTolerance()){_=!1;break}m=I}else{if(I.getH()>=I.getEvent().getTolerance()){_=!1;break}m=I}}if(_&&null!=m){for(m.time=p,m.maxAdvance=n,o=0;o<c;o++)i[o]=E[o];return m}for(n=p,o=0;o<c;o++)i[o]=E[o];for(a=O.length,o=0;o<a;o++){var d=O[o];d.setHAfter(d.getH())}for(M=[],a=b.length,o=0;o<a;o++)M.push(b[o])}for(a=M.length,o=0;o<a;o++){var I=M[o];if(R>I.getEvent().getMaxIterations()){l=!1;break}}}var D=M[0];return f.error(EJSS_ODE_SOLVERS.ERROR.EVENT_NOT_FOUND,"Warning : Event not found after "+R+" attempts at t="+t[S]+" h="+D.getH()+".\nPlease check the code of your event, decrease the initial step size, the tolerance of the solver,\nor the event maximum step, or increase the maximum number of attempts.\nFirst event remaining in the queue: "+D.getEvent()),D.setTime((t[S]+n)/2),D.setMaxAdvance(Number.NaN),e.bestInterpolate(D.time,i),D},t.getDelays&&(U=EJSS_ODE_SOLVERS.ddeDiscontinuity(f,t)),e.setODE(f,t),f};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.BogackiShampine23={B3_1:2/9,B3_2:1/3,B3_3:4/9,B2_1:7/24,B2_2:.25,B2_3:1/3,B2_4:1/8},EJSS_ODE_SOLVERS.bogackiShampine23=function(){var e,t,r,n=EJSS_ODE_SOLVERS.solverEngineDiscreteTimeAdaptive(3),i=n.allocateOtherArrays;return n.getNumberOfEvaluations=function(){return 3},n.allocateOtherArrays=function(){i(),e=new Array(n.getDimension()),t=new Array(n.getDimension()),r=new Array(n.getDimension())},n.computeIntermediateStep=function(r,i){var o,a=r/2,s=n.getODE(),l=n.getInitialState(),u=n.getInitialRate(),g=n.getDimension(),c=g-1,S=EJSS_ODE_SOLVERS.BogackiShampine23;for(o=0;o<g;o++)i[o]=l[o]+a*u[o];s.getRate(i,e);var d=.75*r;for(o=0;o<g;o++)i[o]=l[o]+d*e[o];for(s.getRate(i,t),o=0;o<c;o++)i[o]=l[o]+r*(S.B3_1*u[o]+S.B3_2*e[o]+S.B3_3*t[o]);i[c]=n.getInitialTime()+r*u[c]},n.computeCarefulIntermediateStep=function(r,i,o){var a,s=i/2,l=n.getODE(),u=n.getInitialState(),g=n.getInitialRate(),c=n.getDimension(),S=c-1,d=EJSS_ODE_SOLVERS.BogackiShampine23,E=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(a=0;a<c;a++)o[a]=u[a]+s*g[a];switch(r.checkDiscontinuity(o,!1)){case E.DISCONTINUITY_PRODUCED_ERROR:return E.DISCONTINUITY_PRODUCED_ERROR;case E.DISCONTINUITY_JUST_PASSED:return E.DISCONTINUITY_JUST_PASSED;case E.DISCONTINUITY_ALONG_STEP:return E.DISCONTINUITY_ALONG_STEP;case E.DISCONTINUITY_EXACTLY_ON_STEP:case E.NO_DISCONTINUITY_ALONG_STEP:}l.getRate(o,e);var f=.75*i;for(a=0;a<c;a++)o[a]=u[a]+f*e[a];switch(r.checkDiscontinuity(o,!1)){case E.DISCONTINUITY_PRODUCED_ERROR:return E.DISCONTINUITY_PRODUCED_ERROR;case E.DISCONTINUITY_JUST_PASSED:return E.DISCONTINUITY_CODE.DISCONTINUITY_JUST_PASSED;case E.DISCONTINUITY_ALONG_STEP:return E.DISCONTINUITY_ALONG_STEP;case E.DISCONTINUITY_EXACTLY_ON_STEP:case E.NO_DISCONTINUITY_ALONG_STEP:}for(l.getRate(o,t),a=0;a<S;a++)o[a]=u[a]+i*(d.B3_1*g[a]+d.B3_2*e[a]+d.B3_3*t[a]);return o[S]=n.getInitialTime()+i*g[S],r.checkDiscontinuity(o,!0)},n.computeFinalRateAndCreateIntervalData=function(){var e=(n.getODE(),n.getInitialState()),t=n.getInitialRate(),r=n.getFinalState(),i=n.getFinalRate();return EJSS_ODE_INTERPOLATION.hermiteIntervalData(e,t,r,i)},n.computeApproximation=function(i){var o=n.getODE(),a=n.getTimeIndex(),s=n.getInitialState(),l=n.getInitialRate(),u=n.getFinalState(),g=n.getFinalRate();o.getRate(u,g);for(var c=EJSS_ODE_SOLVERS.BogackiShampine23,S=0;S<a;S++)r[S]=s[S]+i*(c.B2_1*l[S]+c.B2_2*e[S]+c.B2_3*t[S]+c.B2_4*g[S]);return r[a]=n.getInitialTime()+i*l[a],n.computeError(r)},n};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.CashKarp45={A_11:.2,A_21:.075,A_22:.225,A_31:.3,A_32:-.9,A_33:1.2,A_41:-11/54,A_42:2.5,A_43:-70/27,A_44:35/27,A_51:1631/55296,A_52:175/512,A_53:575/13824,A_54:44275/110592,A_55:253/4096,B4_1:2825/27648,B4_2:0,B4_3:18575/48384,B4_4:13525/55296,B4_5:277/14336,B4_6:.25,B5_1:37/378,B5_2:0,B5_3:250/621,B5_4:125/594,B5_5:0,B5_6:512/1771},EJSS_ODE_SOLVERS.cashKarp45=function(){var e,t,r,n,i,o,a=EJSS_ODE_SOLVERS.solverEngineDiscreteTimeAdaptive(5),s=a.allocateOtherArrays;return a.getNumberOfEvaluations=function(){return 6},a.allocateOtherArrays=function(){s(),e=new Array(a.getDimension()),t=new Array(a.getDimension()),r=new Array(a.getDimension()),n=new Array(a.getDimension()),i=new Array(a.getDimension()),o=new Array(a.getDimension())},a.computeIntermediateStep=function(o,s){var l,u=a.getODE(),g=a.getInitialState(),c=a.getInitialRate(),S=a.getDimension(),d=S-1,E=EJSS_ODE_SOLVERS.CashKarp45;for(l=0;l<S;l++)s[l]=g[l]+o*E.A_11*c[l];for(u.getRate(s,e),l=0;l<S;l++)s[l]=g[l]+o*(E.A_21*c[l]+E.A_22*e[l]);for(u.getRate(s,t),l=0;l<S;l++)s[l]=g[l]+o*(E.A_31*c[l]+E.A_32*e[l]+E.A_33*t[l]);for(u.getRate(s,r),l=0;l<S;l++)s[l]=g[l]+o*(E.A_41*c[l]+E.A_42*e[l]+E.A_43*t[l]+E.A_44*r[l]);for(u.getRate(s,n),l=0;l<S;l++)s[l]=g[l]+o*(E.A_51*c[l]+E.A_52*e[l]+E.A_53*t[l]+E.A_54*r[l]+E.A_55*n[l]);for(u.getRate(s,i),l=0;l<d;l++)s[l]=g[l]+o*(E.B5_1*c[l]+E.B5_2*e[l]+E.B5_3*t[l]+E.B5_4*r[l]+E.B5_5*n[l]+E.B5_6*i[l]);s[d]=a.getInitialTime()+o*c[d]},a.computeCarefulIntermediateStep=function(o,s,l){var u,g=a.getODE(),c=a.getInitialState(),S=a.getInitialRate(),d=a.getDimension(),E=d-1,f=EJSS_ODE_SOLVERS.CashKarp45,p=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(u=0;u<d;u++)l[u]=c[u]+s*f.A_11*S[u];switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,e),u=0;u<d;u++)l[u]=c[u]+s*(f.A_21*S[u]+f.A_22*e[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_CODE.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,t),u=0;u<d;u++)l[u]=c[u]+s*(f.A_31*S[u]+f.A_32*e[u]+f.A_33*t[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,r),u=0;u<d;u++)l[u]=c[u]+s*(f.A_41*S[u]+f.A_42*e[u]+f.A_43*t[u]+f.A_44*r[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,n),u=0;u<d;u++)l[u]=c[u]+s*(f.A_51*S[u]+f.A_52*e[u]+f.A_53*t[u]+f.A_54*r[u]+f.A_55*n[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,i),u=0;u<E;u++)l[u]=c[u]+s*(f.B5_1*S[u]+f.B5_2*e[u]+f.B5_3*t[u]+f.B5_4*r[u]+f.B5_5*n[u]+f.B5_6*i[u]);return l[E]=a.getInitialTime()+s*S[E],o.checkDiscontinuity(l,!0)},a.computeFinalRateAndCreateIntervalData=function(){var e=a.getODE(),t=a.getInitialState(),r=a.getInitialRate(),n=a.getFinalState(),i=a.getFinalRate();return e.getRate(n,i),EJSS_ODE_INTERPOLATION.bootstrap2IntervalData(t,r,n,i,e)},a.computeApproximation=function(s){for(var l=a.getTimeIndex(),u=a.getInitialState(),g=a.getInitialRate(),c=EJSS_ODE_SOLVERS.CashKarp45,S=0;S<l;S++)o[S]=u[S]+s*(c.B4_1*g[S]+c.B4_2*e[S]+c.B4_3*t[S]+c.B4_4*r[S]+c.B4_5*n[S]+c.B4_6*i[S]);return o[l]=a.getInitialTime()+s*g[l],a.computeError(o)},a};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.DoPri5={A_11:.2,A_21:.075,A_22:.225,A_31:44/45,A_32:-56/15,A_33:32/9,A_41:19372/6561,A_42:-25360/2187,A_43:64448/6561,A_44:-212/729,A_51:9017/3168,A_52:-355/33,A_53:46732/5247,A_54:49/176,A_55:-5103/18656,B5_1:35/384,B5_2:0,B5_3:500/1113,B5_4:125/192,B5_5:-2187/6784,B5_6:11/84,D_1:-1.1270175653862835,D_2:0,D_3:2.675424484351598,D_4:-5.685526961588504,D_5:3.5219323679207912,D_6:-1.7672812570757455,D_7:2.382468931778144,E_1:71/57600,E_2:0,E_3:-71/16695,E_4:71/1920,E_5:-17253/339200,E_6:22/525,E_7:-.025},EJSS_ODE_SOLVERS.doPri5=function(){var e,t,r,n,i,o,a=EJSS_ODE_SOLVERS.solverEngineDiscreteTimeAdaptive(5),s=a.allocateOtherArrays;return a.getNumberOfEvaluations=function(){return 6},a.allocateOtherArrays=function(){s();var l=a.getDimension();e=new Array(l),t=new Array(l),r=new Array(l),n=new Array(l),i=new Array(l),o=new Array(5);for(var u=0;u<5;u++)o[u]=new Array(l)},a.computeIntermediateStep=function(o,s){var l,u=a.getODE(),g=a.getInitialState(),c=a.getInitialRate(),S=a.getDimension(),d=S-1,E=EJSS_ODE_SOLVERS.DoPri5;for(l=0;l<S;l++)s[l]=g[l]+o*E.A_11*c[l];for(u.getRate(s,e),l=0;l<S;l++)s[l]=g[l]+o*(E.A_21*c[l]+E.A_22*e[l]);for(u.getRate(s,t),l=0;l<S;l++)s[l]=g[l]+o*(E.A_31*c[l]+E.A_32*e[l]+E.A_33*t[l]);for(u.getRate(s,r),l=0;l<S;l++)s[l]=g[l]+o*(E.A_41*c[l]+E.A_42*e[l]+E.A_43*t[l]+E.A_44*r[l]);for(u.getRate(s,n),l=0;l<S;l++)s[l]=g[l]+o*(E.A_51*c[l]+E.A_52*e[l]+E.A_53*t[l]+E.A_54*r[l]+E.A_55*n[l]);for(u.getRate(s,i),l=0;l<d;l++)s[l]=g[l]+o*(E.B5_1*c[l]+E.B5_2*e[l]+E.B5_3*t[l]+E.B5_4*r[l]+E.B5_5*n[l]+E.B5_6*i[l]);s[d]=a.getInitialTime()+o*c[d]},a.computeCarefulIntermediateStep=function(o,s,l){var u,g=a.getODE(),c=a.getInitialState(),S=a.getInitialRate(),d=a.getDimension(),E=d-1,f=EJSS_ODE_SOLVERS.DoPri5,p=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(u=0;u<d;u++)l[u]=c[u]+s*f.A_11*S[u];switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,e),u=0;u<d;u++)l[u]=c[u]+s*(f.A_21*S[u]+f.A_22*e[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_CODE.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,t),u=0;u<d;u++)l[u]=c[u]+s*(f.A_31*S[u]+f.A_32*e[u]+f.A_33*t[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,r),u=0;u<d;u++)l[u]=c[u]+s*(f.A_41*S[u]+f.A_42*e[u]+f.A_43*t[u]+f.A_44*r[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,n),u=0;u<d;u++)l[u]=c[u]+s*(f.A_51*S[u]+f.A_52*e[u]+f.A_53*t[u]+f.A_54*r[u]+f.A_55*n[u]);switch(o.checkDiscontinuity(l,!1)){case p.DISCONTINUITY_PRODUCED_ERROR:return p.DISCONTINUITY_PRODUCED_ERROR;case p.DISCONTINUITY_JUST_PASSED:return p.DISCONTINUITY_JUST_PASSED;case p.DISCONTINUITY_ALONG_STEP:return p.DISCONTINUITY_ALONG_STEP;case p.DISCONTINUITY_EXACTLY_ON_STEP:case p.NO_DISCONTINUITY_ALONG_STEP:}for(g.getRate(l,i),u=0;u<E;u++)l[u]=c[u]+s*(f.B5_1*S[u]+f.B5_2*e[u]+f.B5_3*t[u]+f.B5_4*r[u]+f.B5_5*n[u]+f.B5_6*i[u]);return l[E]=a.getInitialTime()+s*S[E],o.checkDiscontinuity(l,!0)},a.computeFinalRateAndCreateIntervalData=function(){for(var s=(a.getODE(),a.getInitialState()),l=a.getInitialRate(),u=a.getFinalState(),g=a.getFinalRate(),c=EJSS_ODE_SOLVERS.DoPri5,S=a.getDimension(),d=S-1,E=u[d]-s[d],f=0;f<S;f++){var p=s[f],h=l[f],m=g[f];o[0][f]=p;var A=u[f]-p,_=E*h-A;o[3][f]=A-E*m-_,o[4][f]=E*(c.D_1*h+c.D_2*e[f]+c.D_3*t[f]+c.D_4*r[f]+c.D_5*n[f]+c.D_6*i[f]+c.D_7*m),o[1][f]=A,o[2][f]=_}return EJSS_ODE_INTERPOLATION.dopri5IntervalData(s,u,o)},a.computeApproximation=function(o){var s=a.getODE(),l=a.getInitialState(),u=a.getInitialRate(),g=a.getFinalState(),c=a.getFinalRate(),S=a.getAbsTol(),d=a.getRelTol(),E=EJSS_ODE_SOLVERS.DoPri5,f=a.getDimension();s.getRate(g,c);for(var p=0,h=0;h<f;h++){var m=S[h]+d[h]*Math.max(Math.abs(g[h]),Math.abs(l[h])),A=(E.E_1*u[h]+E.E_2*e[h]+E.E_3*t[h]+E.E_4*r[h]+E.E_5*n[h]+E.E_6*i[h]+E.E_7*c[h])/m;p+=A*A}return Math.sqrt(p/f)},a};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.DoPri853={A_11:.05260015195876773,A_21:.0197250569845379,A_22:.0591751709536137,A_31:.02958758547680685,A_32:0,A_33:.08876275643042054,A_41:.2413651341592667,A_42:0,A_43:-.8845494793282861,A_44:.924834003261792,A_51:.037037037037037035,A_52:0,A_53:0,A_54:.17082860872947386,A_55:.12546768756682242,A_61:.037109375,A_62:0,A_63:0,A_64:.17025221101954405,A_65:.06021653898045596,A_66:-.017578125,A_71:.03709200011850479,A_72:0,A_73:0,A_74:.17038392571223998,A_75:.10726203044637328,A_76:-.015319437748624402,A_77:.008273789163814023,A_81:.6241109587160757,A_82:0,A_83:0,A_84:-3.3608926294469414,A_85:-.868219346841726,A_86:27.59209969944671,A_87:20.154067550477894,A_88:-43.48988418106996,A_91:.47766253643826434,A_92:0,A_93:0,A_94:-2.4881146199716677,A_95:-.590290826836843,A_96:21.230051448181193,A_97:15.279233632882423,A_98:-33.28821096898486,A_99:-.020331201708508627,A_101:-.9371424300859873,A_102:0,A_103:0,A_104:5.186372428844064,A_105:1.0914373489967295,A_106:-8.149787010746927,A_107:-18.52006565999696,A_108:22.739487099350505,A_109:2.4936055526796523,A_1010:-3.0467644718982196,A_111:2.273310147516538,A_112:0,A_113:0,A_114:-10.53449546673725,A_115:-2.0008720582248625,A_116:-17.9589318631188,A_117:27.94888452941996,A_118:-2.8589982771350235,A_119:-8.87285693353063,A_1110:12.360567175794303,A_1111:.6433927460157636,B8_1:.054293734116568765,B8_2:0,B8_3:0,B8_4:0,B8_5:0,B8_6:4.450312892752409,B8_7:1.8915178993145003,B8_8:-5.801203960010585,B8_9:.3111643669578199,B8_10:-.1521609496625161,B8_11:.20136540080403034,B8_12:.04471061572777259,AD13_1:.056167502283047954,AD13_2:0,AD13_3:0,AD13_4:0,AD13_5:0,AD13_6:0,AD13_7:.25350021021662483,AD13_8:-.2462390374708025,AD13_9:-.12419142326381637,AD13_10:.15329179827876568,AD13_11:.00820105229563469,AD13_12:.007567897660545699,AD13_13:-.008298,AD14_1:.03183464816350214,AD14_2:0,AD14_3:0,AD14_4:0,AD14_5:0,AD14_6:.028300909672366776,AD14_7:.053541988307438566,AD14_8:-.05492374857139099,AD14_9:0,AD14_10:0,AD14_11:-.00010834732869724932,AD14_12:.0003825710908356584,AD14_13:-.00034046500868740456,AD14_14:.1413124436746325,AD15_1:-.42889630158379194,AD15_2:0,AD15_3:0,AD15_4:0,AD15_5:0,AD15_6:-4.697621415361164,AD15_7:7.683421196062599,AD15_8:4.06898981839711,AD15_9:.3567271874552811,AD15_10:0,AD15_11:0,AD15_12:0,AD15_13:-.0013990241651590145,AD15_14:2.9475147891527724,AD15_15:-9.15095847217987,D4_1:-8.428938276109013,D4_2:0,D4_3:0,D4_4:0,D4_5:0,D4_6:.5667149535193777,D4_7:-3.0689499459498917,D4_8:2.38466765651207,D4_9:2.117034582445028,D4_10:-.871391583777973,D4_11:2.2404374302607883,D4_12:.6315787787694688,D4_13:-.08899033645133331,D4_14:18.148505520854727,D4_15:-9.194632392478356,D4_16:-4.436036387594894,D5_1:10.427508642579134,D5_2:0,D5_3:0,D5_4:0,D5_5:0,D5_6:242.28349177525817,D5_7:165.20045171727028,D5_8:-374.5467547226902,D5_9:-22.113666853125306,D5_10:7.733432668472264,D5_11:-30.674084731089398,D5_12:-9.332130526430229,D5_13:15.697238121770845,D5_14:-31.139403219565178,D5_15:-9.35292435884448,D5_16:35.81684148639408,D6_1:19.985053242002433,D6_2:0,D6_3:0,D6_4:0,D6_5:0,D6_6:-387.0373087493518,D6_7:-189.17813819516758,D6_8:527.8081592054236,D6_9:-11.57390253995963,D6_10:6.8812326946963,D6_11:-1.0006050966910838,D6_12:.7777137798053443,D6_13:-2.778205752353508,D6_14:-60.19669523126412,D6_15:84.32040550667716,D6_16:11.99229113618279,D7_1:-25.69393346270375,D7_2:0,D7_3:0,D7_4:0,D7_5:0,D7_6:-154.18974869023643,D7_7:-231.5293791760455,D7_8:357.6391179106141,D7_9:93.40532418362432,D7_10:-37.45832313645163,D7_11:104.0996495089623,D7_12:29.8402934266605,D7_13:-43.53345659001114,D7_14:96.32455395918828,D7_15:-39.17726167561544,D7_16:-149.72683625798564,E3_1:-.18980075407240762,E3_2:0,E3_3:0,E3_4:0,E3_5:0,E3_6:4.450312892752409,E3_7:1.8915178993145003,E3_8:-5.801203960010585,E3_9:-.42268232132379197,E3_10:-.1521609496625161,E3_11:.20136540080403034,E3_12:.022651792198360825,E5_1:.01312004499419488,E5_2:0,E5_3:0,E5_4:0,E5_5:0,E5_6:-1.2251564463762044,E5_7:-.4957589496572502,E5_8:1.6643771824549864,E5_9:-.35032884874997366,E5_10:.3341791187130175,E5_11:.08192320648511571,E5_12:-.022355307863886294},EJSS_ODE_SOLVERS.doPri853=function(){var e,t,r,n,i,o,a,s,l,u,g,c,S,d,E,f,p=EJSS_ODE_SOLVERS.solverEngineDiscreteTimeAdaptive(8),h=p.allocateOtherArrays;return p.getNumberOfEvaluations=function(){return 16},p.allocateOtherArrays=function(){h();var m=p.getDimension();e=new Array(m),t=new Array(m),r=new Array(m),n=new Array(m),i=new Array(m),o=new Array(m),a=new Array(m),s=new Array(m),l=new Array(m),u=new Array(m),g=new Array(m),mRate13=new Array(m),c=new Array(m),S=new Array(m),d=new Array(m),E=new Array(m),f=new Array(8);for(var A=0;A<8;A++)f[A]=new Array(m)},p.computeIntermediateStep=function(c,S){var d,E=p.getODE(),f=p.getInitialState(),h=p.getInitialRate(),m=p.getDimension(),A=m-1,_=EJSS_ODE_SOLVERS.DoPri853;for(d=0;d<m;d++)S[d]=f[d]+c*_.A_11*h[d];for(E.getRate(S,e),d=0;d<m;d++)S[d]=f[d]+c*(_.A_21*h[d]+_.A_22*e[d]);for(E.getRate(S,t),d=0;d<m;d++)S[d]=f[d]+c*(_.A_31*h[d]+_.A_32*e[d]+_.A_33*t[d]);for(E.getRate(S,r),d=0;d<m;d++)S[d]=f[d]+c*(_.A_41*h[d]+_.A_42*e[d]+_.A_43*t[d]+_.A_44*r[d]);for(E.getRate(S,n),d=0;d<m;d++)S[d]=f[d]+c*(_.A_51*h[d]+_.A_52*e[d]+_.A_53*t[d]+_.A_54*r[d]+_.A_55*n[d]);for(E.getRate(S,i),d=0;d<m;d++)S[d]=f[d]+c*(_.A_61*h[d]+_.A_62*e[d]+_.A_63*t[d]+_.A_64*r[d]+_.A_65*n[d]+_.A_66*i[d]);for(E.getRate(S,o),d=0;d<m;d++)S[d]=f[d]+c*(_.A_71*h[d]+_.A_72*e[d]+_.A_73*t[d]+_.A_74*r[d]+_.A_75*n[d]+_.A_76*i[d]+_.A_77*o[d]);for(E.getRate(S,a),d=0;d<m;d++)S[d]=f[d]+c*(_.A_81*h[d]+_.A_82*e[d]+_.A_83*t[d]+_.A_84*r[d]+_.A_85*n[d]+_.A_86*i[d]+_.A_87*o[d]+_.A_88*a[d]);for(E.getRate(S,s),d=0;d<m;d++)S[d]=f[d]+c*(_.A_91*h[d]+_.A_92*e[d]+_.A_93*t[d]+_.A_94*r[d]+_.A_95*n[d]+_.A_96*i[d]+_.A_97*o[d]+_.A_98*a[d]+_.A_99*s[d]);for(E.getRate(S,l),d=0;d<m;d++)S[d]=f[d]+c*(_.A_101*h[d]+_.A_102*e[d]+_.A_103*t[d]+_.A_104*r[d]+_.A_105*n[d]+_.A_106*i[d]+_.A_107*o[d]+_.A_108*a[d]+_.A_109*s[d]+_.A_1010*l[d]);for(E.getRate(S,u),d=0;d<m;d++)S[d]=f[d]+c*(_.A_111*h[d]+_.A_112*e[d]+_.A_113*t[d]+_.A_114*r[d]+_.A_115*n[d]+_.A_116*i[d]+_.A_117*o[d]+_.A_118*a[d]+_.A_119*s[d]+_.A_1110*l[d]+_.A_1111*u[d]);for(E.getRate(S,g),d=0;d<A;d++)S[d]=f[d]+c*(_.B8_1*h[d]+_.B8_2*e[d]+_.B8_3*t[d]+_.B8_4*r[d]+_.B8_5*n[d]+_.B8_6*i[d]+_.B8_7*o[d]+_.B8_8*a[d]+_.B8_9*s[d]+_.B8_10*l[d]+_.B8_11*u[d]+_.B8_12*g[d]);S[A]=p.getInitialTime()+c*h[A]},p.computeCarefulIntermediateStep=function(c,S,d){var E,f=p.getODE(),h=p.getInitialState(),m=p.getInitialRate(),A=p.getDimension(),_=A-1,I=EJSS_ODE_SOLVERS.DoPri853,D=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(E=0;E<A;E++)d[E]=h[E]+S*I.A_11*m[E];switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,e),E=0;E<A;E++)d[E]=h[E]+S*(I.A_21*m[E]+I.A_22*e[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,t),E=0;E<A;E++)d[E]=h[E]+S*(I.A_31*m[E]+I.A_32*e[E]+I.A_33*t[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,r),E=0;E<A;E++)d[E]=h[E]+S*(I.A_41*m[E]+I.A_42*e[E]+I.A_43*t[E]+I.A_44*r[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,n),E=0;E<A;E++)d[E]=h[E]+S*(I.A_51*m[E]+I.A_52*e[E]+I.A_53*t[E]+I.A_54*r[E]+I.A_55*n[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,i),E=0;E<A;E++)d[E]=h[E]+S*(I.A_61*m[E]+I.A_62*e[E]+I.A_63*t[E]+I.A_64*r[E]+I.A_65*n[E]+I.A_66*i[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,o),E=0;E<A;E++)d[E]=h[E]+S*(I.A_71*m[E]+I.A_72*e[E]+I.A_73*t[E]+I.A_74*r[E]+I.A_75*n[E]+I.A_76*i[E]+I.A_77*o[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,a),E=0;E<A;E++)d[E]=h[E]+S*(I.A_81*m[E]+I.A_82*e[E]+I.A_83*t[E]+I.A_84*r[E]+I.A_85*n[E]+I.A_86*i[E]+I.A_87*o[E]+I.A_88*a[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,s),E=0;E<A;E++)d[E]=h[E]+S*(I.A_91*m[E]+I.A_92*e[E]+I.A_93*t[E]+I.A_94*r[E]+I.A_95*n[E]+I.A_96*i[E]+I.A_97*o[E]+I.A_98*a[E]+I.A_99*s[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,l),E=0;E<A;E++)d[E]=h[E]+S*(I.A_101*m[E]+I.A_102*e[E]+I.A_103*t[E]+I.A_104*r[E]+I.A_105*n[E]+I.A_106*i[E]+I.A_107*o[E]+I.A_108*a[E]+I.A_109*s[E]+I.A_1010*l[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,u),E=0;E<A;E++)d[E]=h[E]+S*(I.A_111*m[E]+I.A_112*e[E]+I.A_113*t[E]+I.A_114*r[E]+I.A_115*n[E]+I.A_116*i[E]+I.A_117*o[E]+I.A_118*a[E]+I.A_119*s[E]+I.A_1110*l[E]+I.A_1111*u[E]);switch(c.checkDiscontinuity(d,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(f.getRate(d,g),E=0;E<_;E++)d[E]=h[E]+S*(I.B8_1*m[E]+I.B8_2*e[E]+I.B8_3*t[E]+I.B8_4*r[E]+I.B8_5*n[E]+I.B8_6*i[E]+I.B8_7*o[E]+I.B8_8*a[E]+I.B8_9*s[E]+I.B8_10*l[E]+I.B8_11*u[E]+I.B8_12*g[E]);return d[_]=p.getInitialTime()+S*m[_],c.checkDiscontinuity(d,!0)},p.computeFinalRateAndCreateIntervalData=function(){var h,m=p.getODE(),A=p.getInitialState(),_=p.getInitialRate(),I=p.getFinalState(),D=p.getFinalRate(),P=EJSS_ODE_SOLVERS.DoPri853,T=p.getDimension(),C=T-1;m.getRate(I,D);var N=I[C]-A[C];for(h=0;h<T;h++)E[h]=A[h]+N*(P.AD13_1*_[h]+P.AD13_2*e[h]+P.AD13_3*t[h]+P.AD13_4*r[h]+P.AD13_5*n[h]+P.AD13_6*i[h]+P.AD13_7*o[h]+P.AD13_8*a[h]+P.AD13_9*s[h]+P.AD13_10*l[h]+P.AD13_11*u[h]+P.AD13_12*g[h]+P.AD13_13*D[h]);for(m.getRate(E,c),h=0;h<T;h++)E[h]=A[h]+N*(P.AD14_1*_[h]+P.AD14_2*e[h]+P.AD14_3*t[h]+P.AD14_4*r[h]+P.AD14_5*n[h]+P.AD14_6*i[h]+P.AD14_7*o[h]+P.AD14_8*a[h]+P.AD14_9*s[h]+P.AD14_10*l[h]+P.AD14_11*u[h]+P.AD14_12*g[h]+P.AD14_13*D[h]+P.AD14_14*c[h]);for(m.getRate(E,S),h=0;h<T;h++)E[h]=A[h]+N*(P.AD15_1*_[h]+P.AD15_2*e[h]+P.AD15_3*t[h]+P.AD15_4*r[h]+P.AD15_5*n[h]+P.AD15_6*i[h]+P.AD15_7*o[h]+P.AD15_8*a[h]+P.AD15_9*s[h]+P.AD15_10*l[h]+P.AD15_11*u[h]+P.AD15_12*g[h]+P.AD15_13*D[h]+P.AD15_14*c[h]+P.AD15_15*S[h]);for(m.getRate(E,d),h=0;h<T;h++)f[0][h]=A[h],f[1][h]=I[h]-A[h],f[2][h]=N*_[h]-f[1][h],f[3][h]=f[1][h]-N*D[h]-f[2][h],f[4][h]=N*(P.D4_1*_[h]+P.D4_2*e[h]+P.D4_3*t[h]+P.D4_4*r[h]+P.D4_5*n[h]+P.D4_6*i[h]+P.D4_7*o[h]+P.D4_8*a[h]+P.D4_9*s[h]+P.D4_10*l[h]+P.D4_11*u[h]+P.D4_12*g[h]+P.D4_13*D[h]+P.D4_14*c[h]+P.D4_15*S[h]+P.D4_16*d[h]),f[5][h]=N*(P.D5_1*_[h]+P.D5_2*e[h]+P.D5_3*t[h]+P.D5_4*r[h]+P.D5_5*n[h]+P.D5_6*i[h]+P.D5_7*o[h]+P.D5_8*a[h]+P.D5_9*s[h]+P.D5_10*l[h]+P.D5_11*u[h]+P.D5_12*g[h]+P.D5_13*D[h]+P.D5_14*c[h]+P.D5_15*S[h]+P.D5_16*d[h]),f[6][h]=N*(P.D6_1*_[h]+P.D6_2*e[h]+P.D6_3*t[h]+P.D6_4*r[h]+P.D6_5*n[h]+P.D6_6*i[h]+P.D6_7*o[h]+P.D6_8*a[h]+P.D6_9*s[h]+P.D6_10*l[h]+P.D6_11*u[h]+P.D6_12*g[h]+P.D6_13*D[h]+P.D6_14*c[h]+P.D6_15*S[h]+P.D6_16*d[h]),f[7][h]=N*(P.D7_1*_[h]+P.D7_2*e[h]+P.D7_3*t[h]+P.D7_4*r[h]+P.D7_5*n[h]+P.D7_6*i[h]+P.D7_7*o[h]+P.D7_8*a[h]+P.D7_9*s[h]+P.D7_10*l[h]+P.D7_11*u[h]+P.D7_12*g[h]+P.D7_13*D[h]+P.D7_14*c[h]+P.D7_15*S[h]+P.D7_16*d[h]);return EJSS_ODE_INTERPOLATION.dopri853IntervalData(A,I,f)},p.computeApproximation=function(c){for(var S=(p.getODE(),p.getInitialState()),d=p.getInitialRate(),E=p.getFinalState(),f=(p.getFinalRate(),p.getAbsTol()),h=p.getRelTol(),m=EJSS_ODE_SOLVERS.DoPri853,A=p.getDimension(),_=0,I=0,D=0;D<A;D++){
var P=f[D]+h[D]*Math.max(Math.abs(E[D]),Math.abs(S[D])),T=(m.E3_1*d[D]+m.E3_2*e[D]+m.E3_3*t[D]+m.E3_4*r[D]+m.E3_5*n[D]+m.E3_6*i[D]+m.E3_7*o[D]+m.E3_8*a[D]+m.E3_9*s[D]+m.E3_10*l[D]+m.E3_11*u[D]+m.E3_12*g[D])/P;_+=T*T;var C=(m.E5_1*d[D]+m.E5_2*e[D]+m.E5_3*n[D]+m.E5_4*r[D]+m.E5_5*n[D]+m.E5_6*i[D]+m.E5_7*o[D]+m.E5_8*a[D]+m.E5_9*s[D]+m.E5_10*l[D]+m.E5_11*u[D]+m.E5_12*g[D])/P;I+=C*C}var N=I+.01*_;return N<=0&&(N=1),Math.abs(c)*I*Math.sqrt(1/(A*N))},p};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.Euler={},EJSS_ODE_SOLVERS.euler=function(){var e=EJSS_ODE_SOLVERS.solverEngineDiscreteTime();return e.getNumberOfEvaluations=function(){return 1},e.computeIntermediateStep=function(t,r){for(var n=e.getDimension(),i=e.getInitialState(),o=e.getInitialRate(),a=0;a<n;a++)r[a]=i[a]+t*o[a]},e.computeCarefulIntermediateStep=function(t,r,n){return e.computeIntermediateStep(r,n),t.checkDiscontinuity(n,!0)},e.computeFinalRateAndCreateIntervalData=function(){var t=e.getODE(),r=e.getInitialState(),n=e.getInitialRate(),i=e.getFinalState(),o=e.getFinalRate();return t.getRate(i,o),EJSS_ODE_INTERPOLATION.eulerIntervalData(r,n,i[e.getTimeIndex()])},e};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.EulerRichardson={},EJSS_ODE_SOLVERS.eulerRichardson=function(){var e,t=EJSS_ODE_SOLVERS.solverEngineDiscreteTime();return t.getNumberOfEvaluations=function(){return 2},t.allocateOtherArrays=function(){e=new Array(t.getDimension())},t.computeIntermediateStep=function(r,n){var i,o=r/2,a=t.getODE(),s=t.getInitialState(),l=t.getInitialRate(),u=t.getDimension(),g=u-1;for(i=0;i<u;i++)n[i]=s[i]+o*l[i];for(a.getRate(n,e),i=0;i<g;i++)n[i]=s[i]+r*e[i];n[g]=t.getInitialTime()+r*l[g]},t.computeCarefulIntermediateStep=function(r,n,i){var o,a=n/2,s=t.getODE(),l=t.getInitialState(),u=t.getInitialRate(),g=t.getDimension(),c=g-1,S=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(o=0;o<g;o++)i[o]=l[o]+a*u[o];switch(r.checkDiscontinuity(i,!1)){case S.DISCONTINUITY_PRODUCED_ERROR:return S.DISCONTINUITY_PRODUCED_ERROR;case S.DISCONTINUITY_JUST_PASSED:return S.DISCONTINUITY_JUST_PASSED;case S.DISCONTINUITY_ALONG_STEP:return S.DISCONTINUITY_ALONG_STEP;case S.DISCONTINUITY_EXACTLY_ON_STEP:case S.NO_DISCONTINUITY_ALONG_STEP:}for(s.getRate(i,e),o=0;o<c;o++)i[o]=l[o]+n*e[o];return i[c]=t.getInitialTime()+n*u[c],r.checkDiscontinuity(i,!0)},t.computeFinalRateAndCreateIntervalData=function(){var r=t.getODE(),n=t.getInitialState(),i=t.getInitialRate(),o=t.getFinalState(),a=t.getFinalRate(),s=t.getDimension()-1;return r.getRate(o,a),EJSS_ODE_INTERPOLATION.eulerRichardsonIntervalData(n,i,o[s],e)},t};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.Fehlberg8={},EJSS_ODE_SOLVERS.fehlberg8=function(){var e,t,r,n,i,o,a,s,l,u,g=EJSS_ODE_SOLVERS.solverEngineDiscreteTime();return g.getNumberOfEvaluations=function(){return 13},g.allocateOtherArrays=function(){e=new Array(g.getDimension()),t=new Array(g.getDimension()),r=new Array(g.getDimension()),n=new Array(g.getDimension()),i=new Array(g.getDimension()),o=new Array(g.getDimension()),a=new Array(g.getDimension()),s=new Array(g.getDimension()),l=new Array(g.getDimension()),u=new Array(g.getDimension())},g.computeIntermediateStep=function(c,S){var d,E=g.getODE(),f=g.getInitialState(),p=g.getInitialRate(),h=g.getDimension(),m=h-1,A=EJSS_ODE_SOLVERS.Fehlberg78;for(d=0;d<h;d++)S[d]=f[d]+c*A.A_11*p[d];for(E.getRate(S,e),d=0;d<h;d++)S[d]=f[d]+c*(A.A_21*p[d]+A.A_22*e[d]);for(E.getRate(S,t),d=0;d<h;d++)S[d]=f[d]+c*(A.A_31*p[d]+A.A_33*t[d]);for(E.getRate(S,r),d=0;d<h;d++)S[d]=f[d]+c*(A.A_41*p[d]+A.A_43*t[d]+A.A_44*r[d]);for(E.getRate(S,n),d=0;d<h;d++)S[d]=f[d]+c*(A.A_51*p[d]+A.A_54*r[d]+A.A_55*n[d]);for(E.getRate(S,i),d=0;d<h;d++)S[d]=f[d]+c*(A.A_61*p[d]+A.A_64*r[d]+A.A_65*n[d]+A.A_66*i[d]);for(E.getRate(S,o),d=0;d<h;d++)S[d]=f[d]+c*(A.A_71*p[d]+A.A_75*n[d]+A.A_76*i[d]+A.A_77*o[d]);for(E.getRate(S,a),d=0;d<h;d++)S[d]=f[d]+c*(A.A_81*p[d]+A.A_84*r[d]+A.A_85*n[d]+A.A_86*i[d]+A.A_87*o[d]+A.A_88*a[d]);for(E.getRate(S,s),d=0;d<h;d++)S[d]=f[d]+c*(A.A_91*p[d]+A.A_94*r[d]+A.A_95*n[d]+A.A_96*i[d]+A.A_97*o[d]+A.A_98*a[d]+A.A_99*s[d]);for(E.getRate(S,l),d=0;d<h;d++)S[d]=f[d]+c*(A.A_101*p[d]+A.A_104*r[d]+A.A_105*n[d]+A.A_106*i[d]+A.A_107*o[d]+A.A_108*a[d]+A.A_109*s[d]+A.A_1010*l[d]);for(E.getRate(S,u),d=0;d<m;d++)S[d]=f[d]+c*(A.B7_1*p[d]+A.B7_6*i[d]+A.B7_7*o[d]+A.B7_8*a[d]+A.B7_9*s[d]+A.B7_10*l[d]+A.B7_11*u[d]);S[m]=g.getInitialTime()+c*p[m]},g.computeCarefulIntermediateStep=function(c,S,d){var E,f=(g.getODE(),g.getInitialState()),p=g.getInitialRate(),h=g.getDimension(),m=h-1,A=(p[m],EJSS_ODE_SOLVERS.Fehlberg78),_=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(E=0;E<h;E++)d[E]=f[E]+S*A.A_11*p[E];switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,e),E=0;E<h;E++)d[E]=f[E]+S*(A.A_21*p[E]+A.A_22*e[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,t),E=0;E<h;E++)d[E]=f[E]+S*(A.A_31*p[E]+A.A_33*t[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,r),E=0;E<h;E++)d[E]=f[E]+S*(A.A_41*p[E]+A.A_43*t[E]+A.A_44*r[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,n),E=0;E<h;E++)d[E]=f[E]+S*(A.A_51*p[E]+A.A_54*r[E]+A.A_55*n[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,i),E=0;E<h;E++)d[E]=f[E]+S*(A.A_61*p[E]+A.A_64*r[E]+A.A_65*n[E]+A.A_66*i[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,o),E=0;E<h;E++)d[E]=f[E]+S*(A.A_71*p[E]+A.A_75*n[E]+A.A_76*i[E]+A.A_77*o[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,a),E=0;E<h;E++)d[E]=f[E]+S*(A.A_81*p[E]+A.A_84*r[E]+A.A_85*n[E]+A.A_86*i[E]+A.A_87*o[E]+A.A_88*a[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,s),E=0;E<h;E++)d[E]=f[E]+S*(A.A_91*p[E]+A.A_94*r[E]+A.A_95*n[E]+A.A_96*i[E]+A.A_97*o[E]+A.A_98*a[E]+A.A_99*s[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,l),E=0;E<h;E++)d[E]=f[E]+S*(A.A_101*p[E]+A.A_104*r[E]+A.A_105*n[E]+A.A_106*i[E]+A.A_107*o[E]+A.A_108*a[E]+A.A_109*s[E]+A.A_1010*l[E]);switch(c.checkDiscontinuity(d,!1)){case _.DISCONTINUITY_PRODUCED_ERROR:return _.DISCONTINUITY_PRODUCED_ERROR;case _.DISCONTINUITY_JUST_PASSED:return _.DISCONTINUITY_JUST_PASSED;case _.DISCONTINUITY_ALONG_STEP:return _.DISCONTINUITY_ALONG_STEP;case _.DISCONTINUITY_EXACTLY_ON_STEP:case _.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(d,u),E=0;E<m;E++)d[E]=f[E]+S*(A.B7_1*p[E]+A.B7_6*i[E]+A.B7_7*o[E]+A.B7_8*a[E]+A.B7_9*s[E]+A.B7_10*l[E]+A.B7_11*u[E]);return d[m]=g.getInitialTime()+S*p[m],c.checkDiscontinuity(d,!0)},g.computeFinalRateAndCreateIntervalData=function(){var e=g.getODE(),t=g.getInitialState(),r=g.getInitialRate(),n=g.getFinalState(),i=g.getFinalRate();return e.getRate(n,i),EJSS_ODE_INTERPOLATION.bootstrap2IntervalData(t,r,n,i,e)},g};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.Fehlberg78={A_11:2/27,A_21:1/36,A_22:1/12,A_31:1/24,A_33:1/8,A_41:5/12,A_43:-25/16,A_44:25/16,A_51:.05,A_54:.25,A_55:.2,A_61:-25/108,A_64:125/108,A_65:-65/27,A_66:125/54,A_71:31/300,A_75:61/225,A_76:-2/9,A_77:13/900,A_81:2,A_84:-53/6,A_85:704/45,A_86:-107/9,A_87:67/90,A_88:3,A_91:-91/108,A_94:23/108,A_95:-976/135,A_96:311/54,A_97:-19/60,A_98:17/6,A_99:-1/12,A_101:2383/4100,A_104:-341/164,A_105:4496/1025,A_106:-301/82,A_107:2133/4100,A_108:45/82,A_109:45/164,A_1010:18/41,A_111:3/205,A_116:-6/41,A_117:-3/205,A_118:-3/41,A_119:3/41,A_1110:6/41,A_121:-1777/4100,A_124:-341/164,A_125:4496/1025,A_126:-289/82,A_127:2193/4100,A_128:51/82,A_129:33/164,A_1210:12/41,A_1212:1,B7_1:41/840,B7_6:34/105,B7_7:9/35,B7_8:9/35,B7_9:9/280,B7_10:9/280,B7_11:41/840,B8_6:34/105,B8_7:9/35,B8_8:9/35,B8_9:9/280,B8_10:9/280,B8_12:41/840,B8_13:41/840},EJSS_ODE_SOLVERS.fehlberg78=function(){var e,t,r,n,i,o,a,s,l,u,g,c,S=EJSS_ODE_SOLVERS.solverEngineDiscreteTimeAdaptive(7),d=S.allocateOtherArrays;return S.getNumberOfEvaluations=function(){return 6},S.allocateOtherArrays=function(){d(),e=new Array(S.getDimension()),t=new Array(S.getDimension()),r=new Array(S.getDimension()),n=new Array(S.getDimension()),i=new Array(S.getDimension()),o=new Array(S.getDimension()),a=new Array(S.getDimension()),s=new Array(S.getDimension()),l=new Array(S.getDimension()),u=new Array(S.getDimension()),g=new Array(S.getDimension()),c=new Array(S.getDimension()),mOrder8=new Array(S.getDimension())},S.computeIntermediateStep=function(d,E){var f,p=S.getODE(),h=S.getInitialState(),m=S.getInitialRate(),A=S.getDimension(),_=A-1,I=EJSS_ODE_SOLVERS.Fehlberg78;for(f=0;f<A;f++)E[f]=h[f]+d*I.A_11*m[f];for(p.getRate(E,e),f=0;f<A;f++)E[f]=h[f]+d*(I.A_21*m[f]+I.A_22*e[f]);for(p.getRate(E,t),f=0;f<A;f++)E[f]=h[f]+d*(I.A_31*m[f]+I.A_33*t[f]);for(p.getRate(E,r),f=0;f<A;f++)E[f]=h[f]+d*(I.A_41*m[f]+I.A_43*t[f]+I.A_44*r[f]);for(p.getRate(E,n),f=0;f<A;f++)E[f]=h[f]+d*(I.A_51*m[f]+I.A_54*r[f]+I.A_55*n[f]);for(p.getRate(E,i),f=0;f<A;f++)E[f]=h[f]+d*(I.A_61*m[f]+I.A_64*r[f]+I.A_65*n[f]+I.A_66*i[f]);for(p.getRate(E,o),f=0;f<A;f++)E[f]=h[f]+d*(I.A_71*m[f]+I.A_75*n[f]+I.A_76*i[f]+I.A_77*o[f]);for(p.getRate(E,a),f=0;f<A;f++)E[f]=h[f]+d*(I.A_81*m[f]+I.A_84*r[f]+I.A_85*n[f]+I.A_86*i[f]+I.A_87*o[f]+I.A_88*a[f]);for(p.getRate(E,s),f=0;f<A;f++)E[f]=h[f]+d*(I.A_91*m[f]+I.A_94*r[f]+I.A_95*n[f]+I.A_96*i[f]+I.A_97*o[f]+I.A_98*a[f]+I.A_99*s[f]);for(p.getRate(E,l),f=0;f<A;f++)E[f]=h[f]+d*(I.A_101*m[f]+I.A_104*r[f]+I.A_105*n[f]+I.A_106*i[f]+I.A_107*o[f]+I.A_108*a[f]+I.A_109*s[f]+I.A_1010*l[f]);for(p.getRate(E,u),f=0;f<A;f++)E[f]=h[f]+d*(I.A_111*m[f]+I.A_116*i[f]+I.A_117*o[f]+I.A_118*a[f]+I.A_119*s[f]+I.A_1110*l[f]);for(p.getRate(E,g),f=0;f<A;f++)E[f]=h[f]+d*(I.A_121*m[f]+I.A_124*r[f]+I.A_125*n[f]+I.A_126*i[f]+I.A_127*o[f]+I.A_128*a[f]+I.A_129*s[f]+I.A_1210*l[f]+I.A_1212*g[f]);for(p.getRate(E,c),f=0;f<_;f++)E[f]=h[f]+d*(I.B7_1*m[f]+I.B7_6*i[f]+I.B7_7*o[f]+I.B7_8*a[f]+I.B7_9*s[f]+I.B7_10*l[f]+I.B7_11*u[f]);E[_]=S.getInitialTime()+d*m[_]},S.computeCarefulIntermediateStep=function(d,E,f){var p,h=(S.getODE(),S.getInitialState()),m=S.getInitialRate(),A=S.getDimension(),_=A-1,I=EJSS_ODE_SOLVERS.Fehlberg78,D=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(p=0;p<A;p++)f[p]=h[p]+E*I.A_11*m[p];switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,e),p=0;p<A;p++)f[p]=h[p]+E*(I.A_21*m[p]+I.A_22*e[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,t),p=0;p<A;p++)f[p]=h[p]+E*(I.A_31*m[p]+I.A_33*t[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,r),p=0;p<A;p++)f[p]=h[p]+E*(I.A_41*m[p]+I.A_43*t[p]+I.A_44*r[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,n),p=0;p<A;p++)f[p]=h[p]+E*(I.A_51*m[p]+I.A_54*r[p]+I.A_55*n[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,i),p=0;p<A;p++)f[p]=h[p]+E*(I.A_61*m[p]+I.A_64*r[p]+I.A_65*n[p]+I.A_66*i[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,o),p=0;p<A;p++)f[p]=h[p]+E*(I.A_71*m[p]+I.A_75*n[p]+I.A_76*i[p]+I.A_77*o[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,a),p=0;p<A;p++)f[p]=h[p]+E*(I.A_81*m[p]+I.A_84*r[p]+I.A_85*n[p]+I.A_86*i[p]+I.A_87*o[p]+I.A_88*a[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,s),p=0;p<A;p++)f[p]=h[p]+E*(I.A_91*m[p]+I.A_94*r[p]+I.A_95*n[p]+I.A_96*i[p]+I.A_97*o[p]+I.A_98*a[p]+I.A_99*s[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,l),p=0;p<A;p++)f[p]=h[p]+E*(I.A_101*m[p]+I.A_104*r[p]+I.A_105*n[p]+I.A_106*i[p]+I.A_107*o[p]+I.A_108*a[p]+I.A_109*s[p]+I.A_1010*l[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,u),p=0;p<A;p++)f[p]=h[p]+E*(I.A_111*m[p]+I.A_116*i[p]+I.A_117*o[p]+I.A_118*a[p]+I.A_119*s[p]+I.A_1110*l[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,g),p=0;p<A;p++)f[p]=h[p]+E*(I.A_121*m[p]+I.A_124*r[p]+I.A_125*n[p]+I.A_126*i[p]+I.A_127*o[p]+I.A_128*a[p]+I.A_129*s[p]+I.A_1210*l[p]+I.A_1212*g[p]);switch(d.checkDiscontinuity(f,!1)){case D.DISCONTINUITY_PRODUCED_ERROR:return D.DISCONTINUITY_PRODUCED_ERROR;case D.DISCONTINUITY_JUST_PASSED:return D.DISCONTINUITY_JUST_PASSED;case D.DISCONTINUITY_ALONG_STEP:return D.DISCONTINUITY_ALONG_STEP;case D.DISCONTINUITY_EXACTLY_ON_STEP:case D.NO_DISCONTINUITY_ALONG_STEP:}for(mODE.getRate(f,c),p=0;p<_;p++)f[p]=h[p]+E*(I.B7_1*m[p]+I.B7_6*i[p]+I.B7_7*o[p]+I.B7_8*a[p]+I.B7_9*s[p]+I.B7_10*l[p]+I.B7_11*u[p]);return f[_]=S.getInitialTime()+E*m[_],d.checkDiscontinuity(f,!0)},S.computeFinalRateAndCreateIntervalData=function(){var e=S.getODE(),t=S.getInitialState(),r=S.getInitialRate(),n=S.getFinalState(),i=S.getFinalRate();return e.getRate(n,i),EJSS_ODE_INTERPOLATION.bootstrap2IntervalData(t,r,n,i,e)},S.computeApproximation=function(e){for(var t=S.getTimeIndex(),r=S.getInitialState(),n=S.getInitialRate(),u=EJSS_ODE_SOLVERS.Fehlberg78,d=0;d<t;d++)mOrder8[d]=r[d]+e*(u.B8_6*i[d]+u.B8_7*o[d]+u.B8_8*a[d]+u.B8_9*s[d]+u.B8_10*l[d]+u.B8_12*g[d]+u.B8_13*c[d]);return mOrder8[t]=S.getInitialTime()+e*n[t],S.computeError(mOrder8)},S};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.RungeKutta4={},EJSS_ODE_SOLVERS.rungeKutta4=function(){var e,t,r,n=EJSS_ODE_SOLVERS.solverEngineDiscreteTime();return n.getNumberOfEvaluations=function(){return 4},n.allocateOtherArrays=function(){e=new Array(n.getDimension()),t=new Array(n.getDimension()),r=new Array(n.getDimension())},n.computeIntermediateStep=function(i,o){var a,s=i/2,l=n.getODE(),u=n.getInitialState(),g=n.getInitialRate(),c=n.getDimension(),S=c-1;for(a=0;a<c;a++)o[a]=u[a]+s*g[a];for(l.getRate(o,e),a=0;a<c;a++)o[a]=u[a]+s*e[a];for(l.getRate(o,t),a=0;a<c;a++)o[a]=u[a]+i*t[a];for(l.getRate(o,r),a=0;a<S;a++)o[a]=u[a]+i*(g[a]+2*e[a]+2*t[a]+r[a])/6;o[S]=n.getInitialTime()+i*g[S]},n.computeCarefulIntermediateStep=function(i,o,a){var s,l=o/2,u=n.getODE(),g=n.getInitialState(),c=n.getInitialRate(),S=n.getDimension(),d=S-1,E=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE;for(s=0;s<S;s++)a[s]=g[s]+l*c[s];switch(i.checkDiscontinuity(a,!1)){case E.DISCONTINUITY_PRODUCED_ERROR:return E.DISCONTINUITY_PRODUCED_ERROR;case E.DISCONTINUITY_JUST_PASSED:return E.DISCONTINUITY_JUST_PASSED;case E.DISCONTINUITY_ALONG_STEP:return E.DISCONTINUITY_ALONG_STEP;case E.DISCONTINUITY_EXACTLY_ON_STEP:case E.NO_DISCONTINUITY_ALONG_STEP:}for(u.getRate(a,e),s=0;s<S;s++)a[s]=g[s]+l*e[s];switch(i.checkDiscontinuity(a,!1)){case E.DISCONTINUITY_PRODUCED_ERROR:return E.DISCONTINUITY_PRODUCED_ERROR;case E.DISCONTINUITY_JUST_PASSED:return E.DISCONTINUITY_JUST_PASSED;case E.DISCONTINUITY_ALONG_STEP:return E.DISCONTINUITY_ALONG_STEP;case E.DISCONTINUITY_EXACTLY_ON_STEP:case E.NO_DISCONTINUITY_ALONG_STEP:}for(u.getRate(a,t),s=0;s<S;s++)a[s]=g[s]+o*t[s];switch(i.checkDiscontinuity(a,!1)){case E.DISCONTINUITY_PRODUCED_ERROR:return E.DISCONTINUITY_PRODUCED_ERROR;case E.DISCONTINUITY_JUST_PASSED:return E.DISCONTINUITY_JUST_PASSED;case E.DISCONTINUITY_ALONG_STEP:return E.DISCONTINUITY_ALONG_STEP;case E.DISCONTINUITY_EXACTLY_ON_STEP:case E.NO_DISCONTINUITY_ALONG_STEP:}for(u.getRate(a,r),s=0;s<d;s++)a[s]=g[s]+o*(c[s]+2*e[s]+2*t[s]+r[s])/6;return a[d]=n.getInitialTime()+o*c[d],i.checkDiscontinuity(a,!0)},n.computeFinalRateAndCreateIntervalData=function(){var e=n.getODE(),t=n.getInitialState(),r=n.getInitialRate(),i=n.getFinalState(),o=n.getFinalRate();return e.getRate(i,o),EJSS_ODE_INTERPOLATION.bootstrapIntervalData(t,r,i,o,e)},n};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.SolverEngineDiscreteTime={},EJSS_ODE_SOLVERS.solverEngineDiscreteTime=function(){var e,t,r,n,i,o,a,s,l,u={},g=EJSS_ODE_SOLVERS.ERROR.NO_ERROR,c=0,S=.1,d=Number.POSITIVE_INFINITY,E=0,f=0;return u.getNumberOfEvaluations=function(){return 0},u.allocateOtherArrays=function(){},u.computeIntermediateStep=function(e,t){return null},u.computeCarefulIntermediateStep=function(e,t,r){return EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.NO_DISCONTINUITY_ALONG_STEP},u.computeFinalRateAndCreateIntervalData=function(){return null},u.getODE=function(){return a},u.getEventSolver=function(){return s},u.getDimension=function(){return e},u.getTimeIndex=function(){return t},u.getInitialTime=function(){return E},u.getInitialState=function(){return r},u.getInitialRate=function(){return n},u.getFinalState=function(){return i},u.getFinalRate=function(){return o},u.setFinalTime=function(e){f=e},u.getFinalTime=function(){return f},u.setErrorCode=function(e){g=e},u.addToEvaluations=function(e){c+=e},u.setODE=function(r,n){s=r,a=n;var i=a.getState();e=i.length,t=e-1,l=EJSS_ODE_INTERPOLATION.stateHistory(n),a.getMaximumDelay&&l.setMinimumLength(a.getMaximumDelay())},u.initialize=function(s){S=s;var g=a.getState();null!=r&&r.length==g.length||(e=g.length,t=e-1,r=new Array(e),n=new Array(e),i=new Array(e),o=new Array(e),u.allocateOtherArrays()),c=0,l.clearAll(),a.getMaximumDelay?l.setMinimumLength(Math.max(Math.abs(a.getMaximumDelay()),Math.abs(s))):l.setMinimumLength(s),u.reinitialize(g)},u.reinitialize=function(i){E=i[t];for(var o=0;o<e;o++)r[o]=i[o];a.getRate(r,n),f=Number.NaN,g=EJSS_ODE_SOLVERS.ERROR.NO_ERROR},u.getCurrentRate=function(){return n},u.setStepSize=function(e){S=e,a.getMaximumDelay?l.setMinimumLength(Math.max(Math.abs(a.getMaximumDelay()),Math.abs(e))):l.setMinimumLength(e)},u.setMaximumStepSize=function(e){d=Math.abs(e)},u.getMaximumStepSize=function(){return d},u.getStepSize=function(){return S},u.getInternalStepSize=function(){return f-E},u.setEstimateFirstStep=function(e){},u.setTolerances=function(e,t){},u.getMaximumTime=function(e){return g!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR?Number.NaN:(isNaN(f)&&u.computeOneStep(e),f)},u.internalStep=function(t){var a;for(E=f,g=EJSS_ODE_SOLVERS.ERROR.NO_ERROR,a=0;a<e;a++)r[a]=i[a];for(a=0;a<e;a++)n[a]=o[a];return u.computeOneStep(t),f},u.getCounter=function(){return c},u.getStateHistory=function(){return l},u.interpolate=function(e,t){return l.interpolateState(e,t)},u.bestInterpolate=function(t,n){var o;if(isNaN(f))return null;if(t==f){for(o=0;o<e;o++)n[o]=i[o];return n}if(t==E){for(o=0;o<e;o++)n[o]=r[o];return n}return u.computeIntermediateStep(t-E,n),n},u.getActualStepSize=function(){return S},u.findTheDiscontinuity=function(e){for(var r=0,n=0,o=e,a=0,l=s.getDDEIterations(),g=s.getEPSILON();r<l&&!(Math.abs(n-o)<g);){var c=(n+o)/2;switch(u.computeCarefulIntermediateStep(s,c,i)){default:case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR:return Number.NaN;case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.NO_DISCONTINUITY_ALONG_STEP:a=i[t],n=c;break;case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_EXACTLY_ON_STEP:return i[t];case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_JUST_PASSED:o-=(o-n)/4;break;case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_ALONG_STEP:o=c}r++}return u.computeCarefulIntermediateStep(s,a,i),a},u.computeOneStep=function(e){var r=S;if(e){switch(u.computeCarefulIntermediateStep(s,r,i)){case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR:return void(f=Number.NaN);case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.NO_DISCONTINUITY_ALONG_STEP:case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_EXACTLY_ON_STEP:f=i[t];break;case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_JUST_PASSED:case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_ALONG_STEP:f=u.findTheDiscontinuity(r)}if(isNaN(f))return void(g=EJSS_ODE_SOLVERS.ERROR.DISCONTINUITY_PRODUCED_ERROR)}else u.computeIntermediateStep(r,i),f=i[t];c+=u.getNumberOfEvaluations(),l.clean(E),l.addIntervalData(u.computeFinalRateAndCreateIntervalData())},u};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive={FAC1:.33,FAC2:6,BETA:0,SAFE:.9},EJSS_ODE_SOLVERS.solverEngineDiscreteTimeAdaptive=function(e){function t(e){var t=0;return 0!=e?(t=Math.pow(e,l),g=t/Math.exp(EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.BETA*Math.log(u)),g=Math.max(1/EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.FAC2,Math.min(1/EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.FAC1,g/EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.SAFE))):(t=1/EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.FAC1,g=1/EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.FAC2),e<=1?(u=Math.max(e,1e-4),i/g):i/Math.min(1/EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.FAC1,t/EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.SAFE)}function r(e){var t,r,n,i=s.getODE();if(e>=0){if(i.getDelays)for(t=i.getDelays(s.getInitialState()),n=t.length,r=0;r<n;r++)e=Math.min(e,t[r]/2);return Math.min(e,s.getMaximumStepSize())}if(i.getDelays)for(t=i.getDelays(s.getInitialState()),n=t.length,r=0;r<n;r++)e=Math.max(e,t[r]/2);return Math.max(e,-s.getMaximumStepSize())}function n(t){var r,n=s.getDimension(),i=s.getInitialState(),l=s.getInitialRate(),u=s.getODE(),g=t<0?-1:1;t=Math.abs(t);var c=0,S=0;for(r=0;r<n;r++){var d=o[r]+a[r]*Math.abs(i[r]),E=l[r]/d;c+=E*E,E=i[r]/d,S+=E*E}var f;if(f=c<=1e-10||S<=1e-10?1e-6:.01*Math.sqrt(S/c),f=g*Math.min(f,t),u.getDelays){var p=s.getEventSolver();p.resetDiscontinuities(i);for(var h=0,m=!1;!m;){for(r=0;r<n;r++)finalState[r]=i[r]+f*l[r];switch(p.checkDiscontinuity(finalState,!1)){case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR:return Number.NaN;case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_JUST_PASSED:case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_ALONG_STEP:f/=2;break;case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_EXACTLY_ON_STEP:case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.NO_DISCONTINUITY_ALONG_STEP:m=!0}if(++h>100)return Number.NaN}}else for(r=0;r<n;r++)finalState[r]=i[r]+f*l[r];u.getRate(finalState,finalRate);var A=0;for(r=0;r<n;r++){var d=o[r]+a[r]*Math.abs(i[r]),E=(finalRate[r]-l[r])/d;A+=E*E}A=Math.sqrt(A)/f;var _,I=Math.max(Math.abs(A),Math.sqrt(c));return _=I<=1e-15?Math.max(1e-6,.001*Math.abs(f)):Math.exp(1/e*Math.log(.01/I)),f=g*Math.min(100*f,_),0!=t&&(f=g*Math.min(Math.abs(f),t)),f}var i,o,a,s=EJSS_ODE_SOLVERS.solverEngineDiscreteTime(),l=1/e-.75*EJSS_ODE_SOLVERS.SolverEngineDiscreteTimeAdaptive.BETA,u=1e-4,g=0,c=!1,S=Number.NaN,d=Number.NaN,E=s.reinitialize,f=s.setMaximumStepSize;return s.computeApproximation=function(e){},s.getAbsTol=function(){return o},s.getRelTol=function(){return a},s.allocateOtherArrays=function(){var e=s.getDimension();o=new Array(e),a=new Array(e),s.setTolerances(1e-6,1e-6)},s.reinitialize=function(e){E(e),i=r(c?n(s.getStepSize()):s.getStepSize())},s.setEstimateFirstStep=function(e){c=e},s.setMaximumStepSize=function(e){f(e),i=r(i)},s.setTolerances=function(e,t){var l,u=s.getDimension();if(e instanceof Array)for(S=d=Number.NaN,l=0;l<u;l++)o[l]=e[l],a[l]=t[l];else{if(S==e&&d==t)return;for(S=e,d=t,l=0;l<u;l++)o[l]=e,a[l]=t}mFinalTime=Number.NaN,mErrorCode=EJSS_ODE_SOLVERS.ERROR.NO_ERROR,i=r(c?n(s.getStepSize()):s.getStepSize())},s.computeOneStep=function(e){var n=s.getEventSolver(),o=s.getFinalState();mErrorCode=EJSS_ODE_SOLVERS.ERROR.NO_ERROR;for(var a=0;a<500;a++){if(e){switch(s.computeCarefulIntermediateStep(n,i,o)){case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_PRODUCED_ERROR:return void s.setFinalTime(Number.NaN);case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.NO_DISCONTINUITY_ALONG_STEP:case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_EXACTLY_ON_STEP:s.setFinalTime(o[s.getTimeIndex()]);break;case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_JUST_PASSED:case EJSS_ODE_SOLVERS.DISCONTINUITY_CODE.DISCONTINUITY_ALONG_STEP:var l=s.findTheDiscontinuity(i);s.setFinalTime(l),i=l-s.getInitialTime()}if(isNaN(s.getFinalTime()))return void s.setErrorCode(EJSS_ODE_SOLVERS.ERROR.DISCONTINUITY_PRODUCED_ERROR)}else s.computeIntermediateStep(i,o),s.setFinalTime(o[s.getTimeIndex()]);var u=s.computeApproximation(i);if(s.addToEvaluations(s.getNumberOfEvaluations()),u<=1)return s.getStateHistory().clean(s.getInitialTime()),s.getStateHistory().addIntervalData(s.computeFinalRateAndCreateIntervalData()),void(i=r(a>0?i>0?Math.min(i,t(u)):Math.max(i,t(u)):t(u)));i=r(i>0?Math.min(i,t(u)):Math.max(i,t(u)))}s.setFinalTime(Number.NaN),s.setErrorCode(EJSS_ODE_SOLVERS.ERROR.DID_NOT_CONVERGE)},s.getActualStepSize=function(){return i},s.computeError=function(e){for(var t=0,r=s.getDimension(),n=s.getInitialState(),i=s.getFinalState(),l=0;l<r;l++){var u=o[l]+a[l]*Math.max(Math.abs(i[l]),Math.abs(n[l])),g=(i[l]-e[l])/u;t+=g*g}return Math.sqrt(t/r)},s};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.VelocityVerlet={},EJSS_ODE_SOLVERS.velocityVerlet=function(){var e,t,r=EJSS_ODE_SOLVERS.solverEngineDiscreteTime();return superSetODE=r.setODE,r.setODE=function(t,r){superSetODE(t,r),e=!!r.isAccelerationIndependentOfVelocity&&r.isAccelerationIndependentOfVelocity()},r.getNumberOfEvaluations=function(){return 2},r.allocateOtherArrays=function(){t=new Array(r.getDimension())},r.computeIntermediateStep=function(e,n){var i,o=r.getODE(),a=r.getInitialState(),s=r.getInitialRate(),l=r.getDimension(),u=l-1,g=e*e/2;for(i=0;i<u;i+=2)n[i]=a[i]+e*s[i]+g*s[i+1];o.getRate(n,t);var c=e/2;for(i=1;i<u;i+=2)n[i]=a[i]+c*(s[i]+t[i]);n[u]=r.getInitialTime()+e*s[u]},r.computeCarefulIntermediateStep=function(e,n,i){var o,a=r.getODE(),s=r.getInitialState(),l=r.getInitialRate(),u=r.getDimension(),g=u-1,c=EJSS_ODE_SOLVERS.DISCONTINUITY_CODE,S=n*n/2;for(o=0;o<g;o+=2)i[o]=s[o]+n*l[o]+S*l[o+1];switch(e.checkDiscontinuity(i,!1)){case c.DISCONTINUITY_PRODUCED_ERROR:return c.DISCONTINUITY_PRODUCED_ERROR;case c.DISCONTINUITY_JUST_PASSED:return c.DISCONTINUITY_JUST_PASSED;case c.DISCONTINUITY_ALONG_STEP:return c.DISCONTINUITY_ALONG_STEP;case c.DISCONTINUITY_EXACTLY_ON_STEP:case c.NO_DISCONTINUITY_ALONG_STEP:}a.getRate(i,t);var d=n/2;for(o=1;o<g;o+=2)i[o]=s[o]+d*(l[o]+t[o]);return i[g]=r.getInitialTime()+n*timeRate,e.checkDiscontinuity(i,!0)},r.computeFinalRateAndCreateIntervalData=function(){var n=r.getODE(),i=r.getInitialState(),o=r.getInitialRate(),a=r.getFinalState(),s=r.getFinalRate(),l=r.getDimension()-1;if(e){for(var u=0,g=1;u<l;u+=2,g+=2)s[u]=a[g],s[g]=t[g];s[l]=t[l]}else n.getRate(a,s),r.addToEvaluations(r.getNumberOfEvaluations());return new EJSS_ODE_INTERPOLATION.hermiteIntervalData(i,o,a,s)},r};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.DDEDiscontinuity={},EJSS_ODE_SOLVERS.ddeDiscontinuity=function(e,t){function r(r){var n,s=t.getDelays(r),l=s.length,u=o.length,g=r.length-1;if(e.getRunsForwards())for(n=0;n<l;n++)for(var c=r[g]-s[n]+i.getTolerance(),S=a[n];S<u;S++){var d=o[S];if(d>c){a[n]=S;break}}else for(n=0;n<l;n++)for(var c=r[g]-s[n]-i.getTolerance(),S=a[n];S<u;S++){var d=o[S];if(d<c){a[n]=S;break}}}function n(r){var n,o=r.length,a=o-1,l=i.getTolerance()/20,u=e.getDDEIterations(),g=e.getStateHistory(),c=0;if(e.getRunsForwards())for(;++c<u;){for(t.getRate(r,s),g.addIntervalData(EJSS_ODE_INTERPOLATION.eulerIntervalData(r,s,r[a]+l)),n=0;n<o;n++)r[n]+=l*s[n];var S=i.evaluate(r);if(S<0)return r[a]}else for(;++c<u;){for(t.getRate(r,s),
g.addIntervalData(EJSS_ODE_INTERPOLATION.eulerIntervalData(r,s,r[a]-l)),n=0;n<o;n++)r[n]-=l*s[n];var S=evaluate(r);if(S>0)return r[a]}return Number.NaN}var i={},o=[],a=[],s=[];return i.initialize=function(r){e.getRunsForwards()?o.push(Number.NEGATIVE_INFINITY):o.push(Number.POSITIVE_INFINITY);var n=t.getInitialConditionDiscontinuities();if(null!=n)for(var l=n.length,u=0;u<l;u++)o.push(n[u]);o.push(r[r.length-1]);var g=t.getDelays(r);a=new Array(g.length),i.reset(r),s=new Array(r.length)},i.reset=function(e){for(var t=a.length,n=0;n<t;n++)a[n]=0;r(e)},i.evaluate=function(r){var n,i=r[r.length-1],s=t.getDelays(r),l=s.length;if(e.getRunsForwards()){var u=Number.POSITIVE_INFINITY;for(n=0;n<l;n++){var g=o[a[n]];u=Math.min(u,s[n]+g-i)}return u}var c=Number.NEGATIVE_INFINITY;for(n=0;n<l;n++){var g=o[a[n]];c=Math.max(c,s[n]+g-i)}return c},i.action=function(){var r=t.getState(),i=n(r);o.push(i);var a=e.findFirstEvent(r,i,r);return null!=a&&(mCurrentEventData=a,a.action()),!0},i.getTolerance=function(){return e.getDDETolerance()},i};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.ProblemData={POSITIVE:2,SMALL_POSITIVE:1,ZERO:0,SMALL_NEGATIVE:-1,NEGATIVE:-2},EJSS_ODE_SOLVERS.eventData=function(e,t,r){var n,i,o,a,s,l,u,g,c={},S=t.getTypeOfEvent(),d=r.length-1;return c.getEvent=function(){return t},c.getEventType=function(){return S},c.setH=function(e){l=e},c.getH=function(){return l},c.getTime=function(){return u},c.setTime=function(e){u=e},c.hasPositiveFlag=function(){return n},c.hasNegativeFlag=function(){return i},c.getHBefore=function(){return a},c.setHAfter=function(e){s=e},c.getHAfter=function(){return s},c.getCurrentPosition=function(){return o},c.getMaxAdvance=function(){return g},c.setMaxAdvance=function(e){g=e},c.action=function(){return t.action()},c.getProblem=function(){return t},c.reset=function(r){n=!1,i=!1;var o=t.evaluate(r);c.findPosition(r[d],o),e.getCurrentEventData()!=c&&(S==EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT?o>0?n=!0:o<0&&(i=!0):S==EJSS_ODE_SOLVERS.EVENT_TYPE.POSITIVE_EVENT&&o>0&&(n=!0))},c.findPosition=function(r,s){if(a=s,a>=t.getTolerance()?(o=EJSS_ODE_SOLVERS.ProblemData.POSITIVE,n=!0):a>0?o=EJSS_ODE_SOLVERS.ProblemData.SMALL_POSITIVE:0==a?o=EJSS_ODE_SOLVERS.ProblemData.ZERO:a>-t.getTolerance()?o=EJSS_ODE_SOLVERS.ProblemData.SMALL_NEGATIVE:(o=EJSS_ODE_SOLVERS.ProblemData.NEGATIVE,i=!0),S==EJSS_ODE_SOLVERS.EVENT_TYPE.STATE_EVENT&&o==EJSS_ODE_SOLVERS.ProblemData.NEGATIVE){var l="The state event "+t+" is in an illegal state: "+a+" at "+r;null==e.getLastEventData()?l+="\nThere was no previous event":l+="\nLast previous event was "+e.getLastEventData().getProblem()+", which took place at "+e.getLastEventDataTime(),e.error(EJSS_ODE_SOLVERS.ERROR.ILLEGAL_EVENT_STATE,l)}},c.reset(r),c},EJSS_ODE_SOLVERS.discontinuityData=function(e,t,r){var n,i,o,a,s,l,u={},g=r.length-1;return u.getDiscontinuity=function(){return t},u.setH=function(e){s=e},u.getH=function(){return s},u.setTime=function(e){l=e},u.getTime=function(){return l},u.hasPositiveFlag=function(){return n},u.hasNegativeFlag=function(){return i},u.getHBefore=function(){return a},u.setHAfter=function(e){mHAfter=e},u.getHAfter=function(){return mHAfter},u.getCurrentPosition=function(){return o},u.getMaxAdvance=function(){return Number.NaN},u.action=function(){return t.action()},u.getProblem=function(){return t},u.reset=function(r){n=!1,i=!1;var o=t.evaluate(r);u.findPosition(r[g],o),e.getCurrentEventData()!=u&&(o>0?n=!0:o<0&&(i=!0))},u.findPosition=function(e,r){a=r,a>=t.getTolerance()?(o=EJSS_ODE_SOLVERS.ProblemData.POSITIVE,n=!0):a>0?o=EJSS_ODE_SOLVERS.ProblemData.SMALL_POSITIVE:0==a?o=EJSS_ODE_SOLVERS.ProblemData.ZERO:a>-t.getTolerance()?o=EJSS_ODE_SOLVERS.ProblemData.SMALL_NEGATIVE:(o=EJSS_ODE_SOLVERS.ProblemData.NEGATIVE,i=!0)},u.reset(r),u};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.ODEMultistepSolver={NO_ERROR:0,DID_NOT_CONVERGE:1},EJSS_ODE_SOLVERS.createODEMultistepSolver=function(e){function t(){var e=g.getTolerance(),t=l;(g.getStepSize()<=0||g.getStepSize()>l||l-g.getStepSize()==l)&&g.setStepSize(l);for(var r=0;t>e*l;){r++;var n=t;if(t<g.getStepSize()){var u=g.getStepSize();g.setStepSize(t);t-=g.step(),g.setStepSize(u)}else t-=g.step();if(g.getErrorCode()!=EJSS_ODE_SOLVERS.ODEMultistepSolver.NO_ERROR||Math.abs(n-t)<=Number.MIN_VALUE||e*l/10>g.getStepSize()||r>o){if(s="ODEMultiStep did not converge. Remainder="+t,i=EJSS_ODE_SOLVERS.ODEMultistepSolver.DID_NOT_CONVERGE,a)throw s;mMaxMessages>0&&(mMaxMessages--,console.log(s));break}}return t}function r(){var e=g.getTolerance(),t=l;(g.getStepSize()>=0||g.getStepSize()<l||l-g.getStepSize()==l)&&g.setStepSize(l);for(var r=0;t<e*l;){r++;var n=t;if(t>g.getStepSize()){var a=g.getStepSize();g.setStepSize(t);t-=g.step(),g.setStepSize(a)}else t-=g.step();if(g.getErrorCode()!=EJSS_ODE_SOLVERS.ODEMultistepSolver.NO_ERROR||Math.abs(n-t)<=Number.MIN_VALUE||e*l/10<g.getStepSize()||r>o){if(s="ODEMultiStep did not converge. Remainder="+t,i=EJSS_ODE_SOLVERS.ODEMultistepSolver.DID_NOT_CONVERGE,enableExceptions)throw s;mMaxMessages>0&&(mMaxMessages--,console.log(s))}}return t}var n={},i=EJSS_ODE_SOLVERS.ODEMultistepSolver.NO_ERROR,o=200,a=!1,s="",l=.1,u=EJSS_ODE_SOLVERS.createODEMultistepSolverInternalODE(e),g=EJSS_ODE_SOLVERS.createCashKarp45(u);return n.enableRuntimeExceptions=function(e){a=e},n.setMaxIterations=function(e){o=Math.max(1,e)},n.setTolerance=function(e){e=Math.abs(e),g.setTolerance(e)},n.getTolerance=function(){return g.getTolerance()},n.getErrorCode=function(){return i},n.initialize=function(e){mMaxMessages=4,s="",i=EJSS_ODE_SOLVERS.ODEMultistepSolver.NO_ERROR,l=e,u.setInitialConditions(),g.initialize(e)},n.setStepSize=function(e){mMaxMessages=4,l=e,e<0?g.setStepSize(Math.max(-Math.abs(g.getStepSize()),e)):g.setStepSize(Math.min(g.getStepSize(),e))},n.setMaximumNumberOfErrorMessages=function(e){mMaxMessages=e},n.getStepSize=function(){return l},n.step=function(){i=EJSS_ODE_SOLVERS.ODEMultistepSolver.NO_ERROR,u.setInitialConditions();var e=0;return e=l>0?t():r(),u.update(),l-e},n},EJSS_ODE_SOLVERS.createODEMultistepSolverInternalODE=function(e){var t={},r=[];return t.getRate=function(t,r){e.getRate(t,r)},t.getState=function(){return r},t.setInitialConditions=function(){var t=e.getState();if(null!=t){null!=r&&r.length==t.length||(r=new Array(t.length));for(var n=0,i=t.length;n<i;n++)r[n]=t[n]}},t.update=function(){for(var t=e.getState(),n=0,i=t.length;n<i;n++)t[n]=r[n]},t.setInitialConditions(),t},EJSS_ODE_SOLVERS.createCashKarp45=function(e){var t,r={},n=[[.2],[.075,.225],[.3,-.9,1.2],[-11/54,2.5,-70/27,35/27],[1631/55296,175/512,575/13824,44275/110592,253/4096]],i=[37/378,0,250/621,125/594,0,512/1771],o=[277/64512,0,-6925/370944,6925/202752,277/14336,-277/7084],a=EJSS_ODE_SOLVERS.ODEMultistepSolver.NO_ERROR,s=.01,l=0,u=[],g=[],c=1e-6,S=!1;return r.enableRuntimeExpecptions=function(e){S=e},r.setStepSize=function(e){s=e},r.getStepSize=function(){return s},r.setTolerance=function(e){if((c=Math.abs(e))<1e-12){var t="Error: Cash-Karp ODE solver tolerance cannot be smaller than 1.0e-12.";if(S)throw t;console.log(t),c=1e-12}},r.getTolerance=function(){return c},r.getErrorCode=function(){return a},r.initialize=function(t){s=t;var r=e.getState();if(null!=r&&l!=r.length){l=r.length,u=new Array(l),g=new Array(6);for(var n=0;n<6;n++)g[n]=new Array(l)}},r.step=function(){var r,d,E,f=10,p=s,h=0,m=e.getState();a=EJSS_ODE_SOLVERS.ODEMultistepSolver.NO_ERROR,e.getRate(m,g[0]);do{for(f--,p=s,E=1;E<6;E++){for(r=0;r<l;r++)for(u[r]=m[r],d=0;d<E;d++)u[r]=u[r]+s*n[E-1][d]*g[d][r];e.getRate(u,g[E])}for(h=0,r=0;r<l;r++){for(t=0,E=0;E<6;E++)t+=s*o[E]*g[E][r];h=Math.max(h,Math.abs(t))}if(h<=Number.MIN_VALUE&&(h=c/1e5),h>c){var A=.9*Math.pow(h/c,-.25);s*=Math.max(A,.1)}else if(h<c/10){var A=.9*Math.pow(h/c,-.2);A>1&&(s*=Math.min(A,10))}}while(h>c&&f>0);for(r=0;r<l;r++)for(E=0;E<6;E++)m[r]+=p*i[E]*g[E][r];if(0==f&&(a=EJSS_ODE_SOLVERS.ODEMultistepSolver.DID_NOT_CONVERGE,S))throw"DormanPrince45 ODE solver did not converge.";return p},r.initialize(s),r};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.createEulerODESolver=function(e){var t,r=EJSS_ODE_SOLVERS.createSolverInterpolatorDiscreteTime(e),n=r.initialize;return r.initialize=function(e){n(e),t=new Array(r.getDimension())},r.computeIntermediateStep=function(r,n){e.getRate(n,t);for(var i=0,o=n.length;i<o;i++)n[i]=n[i]+r*t[i];return n},r};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.createRungeKutta4ODESolver=function(e){var t,r,n,i,o,a=EJSS_ODE_SOLVERS.createSolverInterpolatorDiscreteTime(e),s=a.initialize;return a.initialize=function(e){s(e),t=new Array(a.getDimension()),r=new Array(a.getDimension()),n=new Array(a.getDimension()),i=new Array(a.getDimension()),o=new Array(a.getDimension())},a.computeIntermediateStep=function(a,s){e.getRate(s,r);for(var l=0,u=s.length;l<u;l++)t[l]=s[l],s[l]=t[l]+a*r[l]/2;e.getRate(s,n);for(var l=0,u=s.length;l<u;l++)s[l]=t[l]+a*n[l]/2;e.getRate(s,i);for(var l=0,u=s.length;l<u;l++)s[l]=t[l]+a*i[l];e.getRate(s,o);for(var l=0,u=s.length;l<u;l++)s[l]=t[l]+a*(r[l]+2*n[l]+2*i[l]+o[l])/6;return s},a};var EJSS_ODE_SOLVERS=EJSS_ODE_SOLVERS||{};EJSS_ODE_SOLVERS.SolverInterpolatorDiscreteTime={},EJSS_ODE_SOLVERS.createSolverInterpolatorDiscreteTime=function(e){var t,r={},n=.1,i=(Number.POSITIVE_INFINITY,0);return r.getNumberOfEvaluations=function(){return 0},r.allocateOtherArrays=function(){},r.computeIntermediateStep=function(e,t){return null},r.computeCarefulIntermediateStep=function(e,t,r){return 0},r.setTolerance=function(e){i=Math.abs(e)},r.getDimension=function(){return t},r.initialize=function(r){n=r;var i=e.getState();t=i.length},r.step=function(){var t=e.getState();return r.computeIntermediateStep(n,t),0},r.setStepSize=function(e){n=e},r.getStepSize=function(){return n},r};var EJSS_CORE=EJSS_CORE||{};EJSS_CORE.createRemoteView=function(e,t,r,n){function i(e,t){if(c){void 0!==t?l.send(e+JSON.stringify(t)):l.send(e);var r=l.onmessage;l.onmessage=null,l.onmessage=r}}function o(e){console.log(" --\x3e Processing input: "+e);var t,r={};if("{"==e.charAt(0)){t=JSON.parse(e);var n="";if(t.hasOwnProperty("method")&&(n=t.method,"reset"==n?g._reset():"initialize"==n?g._initialize():void 0!=u&&(r=u.extract(e),d=r,s(g._update))),t.hasOwnProperty("apiVersion")){console.log("Metadata Obtained"),u=new wrapper(l,e);for(var i in E)u.get(E[i],!0)}}else a(e)}function a(e){var t;switch(e.charAt(0)){case"R":g._reset();break;case"I":g._initialize();break;case"U":d=JSON.parse(e.substring(1)),s(g._update);break;case"C":d=JSON.parse(e.substring(1)),s(g._collectData);break;case"M":t=JSON.parse(e.substring(1)),g[t.method]?g[t.method](t.data):console.log("View function: <"+t.method+"> with data: <"+t.data+"> ignored. View function does not exist.");break;case"P":t=JSON.parse(e.substring(1)),g[t.element]?g[t.element].setProperty(t.property,t.value):console.log("setProperty<"+t.property+"> with value: <"+t.value+"> to element <"+t.element+"> ignored. Element does not exist!");break;case"E":t=JSON.parse(e.substring(1)),g[t.element]?g[t.element][t.method](t.data):console.log("Message <"+t.method+"> to element <"+t.element+"> ignored. Element does not exist!");break;case"F":t=JSON.parse(e.substring(1)),g[t.element]?g[t.element][t.method](t.data):console.log("Message with object <"+t.method+"> to element <"+t.element+"> ignored. Element does not exist!");break;case"D":t=JSON.parse(e.substring(1)),m=t.variables,A=t.methods;break;default:console.log("Not known message: Ignoring")}}function s(e){e(),g._render()}var l,u,g=EJSS_CORE.createView(e),c=!1,S=0,d={},E=[],f=[],p=[],h=[],m=[],A=[],_="",I=!0,D=0,P="";if(g._23=function(){return"ConnectionWS"},g._connectToServer=function(){try{l=new WebSocket(P),console.log("Connecting... (readyState "+l.readyState+")"),l.onopen=function(e){c=!0,S=0,console.log("Openhd Event: "+e.type+" - Message: "+e.data),i("",{method:"getMetadata"})},l.onclose=function(e){S<10&&(window.setTimeout(function(){g._connectToServer()},500),S++),c=!1,console.log("Closehd Event: "+e.type+" - Message: "+e.data+" - Reopen: "+S)},l.onerror=function(e){c=!1,console.log("Errorhd Event: "+e.type+" - Message: "+e.data)},l.onmessage=function(e){o(e.data)}}catch(e){console.log(e)}g._update(),g._render()},g._getValue=function(e){return c?d[e]:g._10(e)},super_registerVariable=g._5,super_registerAction=g._7,super_startUp=g._11,g._11=function(){super_startUp(),g._connectToServer()},g._5=function(e,t,r){super_registerVariable(e,t),r?g._13(e,function(){return g._getValue(e)},null,t):(E.push(e),g._13(e,function(){return g._getValue(e)},function(t){p.push({name:e,value:t})},t))},g._7=function(e){super_registerAction(e),f.push(e),g._setAction(e,function(t){h.push({name:e,argument:t})})},g._18=function(){g._16();var e={},t={};if(p.length>0){for(var r in p)p[r].hasOwnProperty("name")&&(e[r]=p[r].name),t[r]=p[r].value;u.set(e,t,"")}if(h.length>0)for(var n in h)u.callAction(h[n].name,[h[n].argument]);p=[],h=[]},g._17=function(){return h.length},g.getLinkingURL=function(){return _},g.createLinkingButtons=function(){g._9(EJSS_INTERFACE.button,"_linkingButton_").setAction("OnClick",function(){var e=g.getLinkingURL();window.alert(e.toString())}).setProperties({Text:"@",FontSize:"8px"}),g._9(EJSS_INTERFACE.button,"_qrButton_").setAction("OnClick",function(){var e=encodeURIComponent(g.getLinkingURL()),t="https://chart.googleapis.com/chart?cht=qr&chl="+e+"&chs=400";window.open(t,"_blank")}).setProperties({Text:"QR",FontSize:"8px"})},g.hiddenLinkingButtons=function(){_view._linkingButton_.setVisibility("hidden"),_view._qrButton_.setVisibility("hidden")},g.showLinkingButtons=function(){_view._linkingButton_.setVisibility("visible"),_view._qrButton_.setVisibility("visible")},-1!=window.location.protocol.indexOf("file"))void 0!==t&&null!==t&&0!=t||(t=8800),P="ws://localhost:"+t,I=!1;else{if(history.state&&(D=history.state.mServerModelPort,I=!1),void 0===r||null===r||""==r){var T=window.location.host,C=window.location.protocol;r=C+"//"+T+"/ejsS_library/models"}if(void 0===n||null===n||""==n){var N=window.location.href.lastIndexOf("/_view");n=window.location.href.slice(r.length,N)}var y=new XMLHttpRequest;D>0?y.open("GET",r+"/broker.php?model="+n+"&port="+D,!0):y.open("GET",r+"/broker.php?model="+n,!0),y.onreadystatechange=function(){if(4==y.readyState&&200==y.status){var e=JSON.parse(y.responseText);P=e.webserver,_=r+"/linking.php?model="+n+"&port="+e.port,I&&g.createLinkingButtons(),g._11()}else console.log("WARNING: server no response!")},y.send()}return g};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.addToArray=function(e,t,r){EJSS_TOOLS.removeFromArray(e,t),r>=0?e.splice(r,0,t):e.push(t)},EJSS_TOOLS.arrayObjectIndexOf=function(e,t){return e.indexOf(t)},EJSS_TOOLS.removeFromArray=function(e,t){var r=e.indexOf(t);r>=0&&e.splice(r,1)},EJSS_TOOLS.compareArrays=function(e,t){if(!e||!t)return!1;if(!e instanceof Array||!t instanceof Array)return e==t;if(e.length!=t.length)return!1;for(var r=0;r<e.length;r++)if(e[r]instanceof Array&&t[r]instanceof Array){if(!EJSS_TOOLS.compareArrays(e[r],t[r]))return!1}else if(e[r]!=t[r])return!1;return!0};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.ConnectionWS={},EJSS_TOOLS.connectionWS=function(e){function t(e,t){switch(e){case"onopen":a.onopen=function(e){t(e)};break;case"onmessage":a.onmessage=function(e){t(e)};break;case"onclose":a.onclose=function(e){t(e)};break;case"onerror":a.onerror=function(e){t(e)}}}function r(e){var t=e.data.split(" ");u[t[0]]=e.data.substring(t[0].length+1)}function n(e){s=!0,console.log("Openhd Event: "+e.type+" - Message: "+e.data)}function i(e){s=!1,console.log("Closehd Event: "+e.type+" - Message: "+e.data)}function o(e){s=!1,console.log("Errorhd Event: "+e.type+" - Message: "+e.data)}var a,s,l={},u={};return l._23=function(){return"ConnectionWS"},l.get=function(e){var t=u[e];if(void 0!==t||null==t)return t},l.set=function(e,t){if(console.log("set:"+e+":"+t.toString()),console.log("set:is open="+s),s){var r=e+" "+t.toString();a.send(r),l.reset()}},l.reset=function(){var e=a.onmessage;a.onmessage=null,a.onmessage=e},function(){try{a=new WebSocket(e),console.log("Connecting... (readyState "+a.readyState+")")}catch(e){console.log(e)}}(),t("onopen",n),t("onclose",i),t("onerror",o),t("onmessage",r),l};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.Decode={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",hex_to_ascii:function(e){for(var t=e.toString(),r="",n=0;n<t.length;n+=2)r+=String.fromCharCode(parseInt(t.substr(n,2),16));return r},decode:function(e){e=""+e;var t,r,n,i,o,a,s,l="",u=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");u<e.length;)i=this._keyStr.indexOf(e.charAt(u++)),o=this._keyStr.indexOf(e.charAt(u++)),a=this._keyStr.indexOf(e.charAt(u++)),s=this._keyStr.indexOf(e.charAt(u++)),t=i<<2|o>>4,r=(15&o)<<4|a>>2,n=(3&a)<<6|s,l+=String.fromCharCode(t),64!=a&&(l+=String.fromCharCode(r)),64!=s&&(l+=String.fromCharCode(n));return l=EJSS_TOOLS.Decode._utf8_decode(l)},_utf8_decode:function(e){for(var t="",r=0,n=c1=c2=0;r<e.length;)n=e.charCodeAt(r),n<128?(t+=String.fromCharCode(n),r++):n>191&&n<224?(c2=e.charCodeAt(r+1),t+=String.fromCharCode((31&n)<<6|63&c2),r+=2):(c2=e.charCodeAt(r+1),c3=e.charCodeAt(r+2),t+=String.fromCharCode((15&n)<<12|(63&c2)<<6|63&c3),r+=3);return t}};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.DisplayColors={phaseColors:{},lineColors:["rgb(255,0,0)","rgb(0,240,0)","rgb(0,0,255)","rgb(240,240,0)","rgb(0,240,240)","rgb(255,0,255)"],markerColors:["rgb(255,0,0)","rgb(0,240,0)","rgb(0,0,255)","rgb(240,240,0)","rgb(0,240,240)","rgb(255,0,255)"],arrayColors:{black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,160],darkcyan:[0,240,240],darkgray:[64,64,64],darkgreen:[0,240,0],darkgrey:[64,64,64],darkyellow:[240,240,0],gray:[125,125,125],green:[0,255,0],grey:[125,125,125],lightblue:[173,216,230],lightgray:[192,192,192],lightgrey:[192,192,192],magenta:[255,0,255],maroon:[128,0,0],olive:[128,128,0],orange:[255,165,0],pink:[255,175,175],purple:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]},getLineColor:function(e){var t=EJSS_TOOLS.DisplayColors.lineColors[e];if(void 0===t){t="hsl("+360*e/12%360+",100%,50%)",EJSS_TOOLS.DisplayColors.lineColors[e]=t}return t},getMarkerColor:function(e){var t=EJSS_TOOLS.DisplayColors.markerColors[e];if(void 0===t){t="hsl("+360*e/12%360+",100%,100%)",EJSS_TOOLS.DisplayColors.markerColors[e]=t}return t},getArrayColor:function(e){if(e=e.toLowerCase(),0==e.indexOf("rgb"))var t=e.substring(4,e.length-1).replace(/ /g,"").split(",");else if(0==e.indexOf("#")){e=e.slice(1),e=e.toUpperCase();for(var r,n,i="0123456789ABCDEF",t=new Array(3),o=0,a=0;a<6;a+=2)r=i.indexOf(e.charAt(a)),n=i.indexOf(e.charAt(a+1)),t[o]=16*r+n,o++}else{var t=EJSS_TOOLS.DisplayColors.arrayColors[e];void 0===t&&(t=EJSS_TOOLS.DisplayColors.arrayColors.black)}return[t[0]/255,t[1]/255,t[2]/255]}};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.enumeration=function(e){var t=function(){throw"Can't Instantiate Enumerations"},r=t.prototype={constructor:t,toString:function(){return this.name},valueOf:function(){return this.value},toJSON:function(){return this.name}};t.values=[];for(var n in e){var i=inherit(r);i.name=n,i.value=e[n],t[n]=i,t.values.push(i)}return t.foreach=function(e,t){for(var r=0;r<this.values.length;r++)e.call(t,this.values[r])},t};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.File={JSLoaded:"",loadJSfile:function(e,t){if(-1!=EJSS_TOOLS.File.JSLoaded.indexOf("["+e+"]"))return console.log("File already loaded "+e),void t();EJSS_TOOLS.File.JSLoaded+="["+e+"]";var r=document.createElement("script");r.setAttribute("type","text/javascript"),r.setAttribute("src",e),void 0!==t&&(r.onload=t),document.getElementsByTagName("head")[0].appendChild(r)},plainName:function(e){var t=e.lastIndexOf("/");return t>=0&&(e=e.substring(t+1)),t=e.indexOf("."),t>0&&(e=e.substring(0,t)),e},download:function(e,t){var r=document.createElement("a");r.setAttribute("href","data:application/ejss;charset=utf-8,"+encodeURIComponent(t)),r.setAttribute("download",e),r.click()},loadScript:function(e){var t=document.createElement("script");t.type="text/javascript",t.src=e,document.getElementsByTagName("head")[0].appendChild(t)},loadJSONFile:function(e,t){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status){var e=JSON.parse(r.responseText);t(e)}},r.open("GET",e,!0),r.send()},requestShortUrl:function(e,t){var r=escape("http://urlecho.appspot.com/echo?status=200&Content-Type=text/plain&body="+e);if(EJSS_TOOLS.File.CALLBACK=t,EJSS_TOOLS.File.callFunction=function(e){EJSS_TOOLS.File.CALLBACK(e.shortUrl)},null==document.getElementById("__rtShortUrl")){var n=document.createElement("script");n.type="text/javascript",n.id="__rtShortUrl",n.innerHTML="function rtShortUrl(data) { EJSS_TOOLS.File.callFunction(data); }",document.getElementsByTagName("head")[0].appendChild(n)}var i=document.getElementById("_requestShortUrl");null!=i&&document.getElementsByTagName("head")[0].removeChild(i),i=document.createElement("script"),i.id="_requestShortUrl",i.type="text/javascript",i.src="http://b1t.co/Site/api/External/MakeUrlWithGet?callback=rtShortUrl&url="+r,document.getElementsByTagName("head")[0].appendChild(i)}};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.JsonrpcBuilder={template:{METHOD:"${METHOD}",PARAMS:"${PARAMS}",ID:"${ID}",REQUEST:'{jsonrpc: "2.0", method: ${METHOD}, params: ${PARAMS}, id: ${ID}}',RESPONSE_OK:'{jsonrpc: "2.0", result: ${RESULT}, params: ${PARAMS}, id: ${ID}}',RESPONSE_ERROR:'{jsonrpc: "2.0", method: ${METHOD}, params: ${PARAMS}, id: ${ID}}',ERROR:'{code: "2.0", message: ${MESSAGE}, data: ${DATA}}'},request:function(e,t,r){if(t&&!(t instanceof Array))throw new InvalidParamsException;var n={jsonrpc:"2.0",method:e};return t&&(n.params=t),r&&(n.id=r),n},response:function(e,t){return{jsonrpc:"2.0",result:e,id:t}},responseWithError:function(e,t){return{jsonrpc:"2.0",error:e,id:t}},error:function(e,t,r){return{code:e,message:t,data:r}},parseResponse:function(e){var t=null;try{t=JSON.parse(e)}catch(e){console.log(e)}return null!=t?t.result:null}};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.JsonrpcClient={methods:{connect:"connect",open:"open",getMetadata:"getMetadata",getValue:"getValue",setValue:"setValue",close:"close",disconnect:"disconnect"}},EJSS_TOOLS.jsonrpcClient=function(e,t){function r(e){for(var t="",r="abcdefghijklmnopqrstuvwxyz",n=0;n<e;n++)t+=r.charAt(Math.floor(Math.random()*r.length));return t}function n(e,t,n,i){var a=i||r(12);n&&(d[a]=n);var s=S.request(e,t,a);o.send(JSON.stringify(s))}function i(){o.onopen=function(e){a&&a(e),console.log("Openhd Event: "+e.type+" - Message: "+e.data)},o.onmessage=function(e){var t=JSON.parse(e.data);u&&u(d),t.id&&d[t.id]&&d[t.id](t.result)},o.onclose=function(e){s&&s(message),console.log("Closehd Event: "+message.type+" - Message: "+message.data)},o.onerror=function(e){l&&l(e),console.log("Errorhd Event: "+e.type+" - Message: "+e.data)}}var o,a,s,l,u,g={},c=EJSS_TOOLS.JsonrpcClient,S=EJSS_TOOLS.JsonrpcBuilder,d={};return g.connect=function(e){return n(c.methods.connect,null,e)},g.open=function(e){return n(c.methods.open,null,e)},g.getValue=function(e,t){return n(c.methods.getValue,[e],t)},g.setValue=function(e,t){return n(c.methods.setValue,e,t)},g.getMetadata=function(e){return n(c.methods.getMetadata,null,e)},g.disconnect=function(e){return n(c.methods.disconnect,null,e)},g.close=function(e){return n(c.methods.close,null,e)},g.init=function(r,n,g,c){try{a=r,l=g,s=c,u=n;var S="ws://"+e;t&&(S+=":"+t),o=new WebSocket(S),i(),console.log("Connecting... (readyState "+o.readyState+")")}catch(e){console.log(e)}},g.finish=function(){try{o.close()}catch(e){console.log(e)}},g};var EJSS_TOOLS=EJSS_TOOLS||{};EJSS_TOOLS.Mathematics={TWO_PI:6.2831852,TO_RADIANS:Math.PI/180,LOG10SCALE:1/Math.log(10),cosineAndSine:[],cosineAndSineForDegrees:function(e){(e%=360)<0&&(e+=360);var t=this.cosineAndSine[e];if(void 0===t){var r=e*this.TO_RADIANS;t=[Math.cos(r),Math.sin(r)]}return t},radians:function(e){return e*Math.PI/180},degrees:function(e){var t=180*e/Math.PI,r=t%360;return t=360*r<0?r+360:r},norm:function(e){for(var t=0,r=0;r<e.length;r++)t+=e[r]*e[r];return Math.sqrt(t)},crossProduct:function(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]},normalize:function(e){var t=EJSS_TOOLS.Mathematics.norm(e);return 0==t?e:[e[0]/t,e[1]/t,e[2]/t]},normalTo:function(e){if(0==e[0])return[1,0,0];if(0==e[1])return[0,1,0];if(0==e[2])return[0,0,1];var t=EJSS_TOOLS.Mathematics.norm(e);return[-e[1]/t,e[0]/t,0]},rotate:function(e,t,r){var n=Math.cos(r),i=Math.sin(r);return[n*(t[0]-e[0])+i*(t[1]-e[1])+e[0],n*(t[1]-e[1])-i*(t[0]-e[0])+e[1]]}},sensors={iOS_accelerometer:{x:0,y:0,z:0},iOS_gyroscope:{x:0,y:0,z:0},setAccelerometer:function(accvalue){var value=JSON.parse(accvalue),accelerometer=eval(value.result);window.innerWidth>window.innerHeight?sensors.iOS_accelerometer={x:accelerometer.y,y:-accelerometer.x,z:accelerometer.z}:sensors.iOS_accelerometer=accelerometer},setGyroscope:function(gyrvalue){var value=JSON.parse(gyrvalue),gyroscope=eval(value.result);window.innerWidth>window.innerHeight?sensors.iOS_gyroscope={x:gyroscope.y,y:-gyroscope.x,z:gyroscope.z}:sensors.iOS_gyroscope=gyroscope},iOS_staccelerometer:{x:0,y:0,z:0},iOS_stgyroscope:{x:0,y:0,z:0},iOS_stmagnetometer:{x:0,y:0,z:0},iOS_sthumidity:0,iOS_sttempamb:0,iOS_sttempir:0,iOS_stpressure:0,setSensorTag:function(stvalue){var value=JSON.parse(stvalue),results=eval(value.result);sensors.iOS_staccelerometer={x:results.accx,y:results.accy,z:results.accz},sensors.iOS_stgyroscope={x:results.gyrox,y:results.gyroy,z:results.gyroz},sensors.iOS_stmagnetometer={x:results.magx,y:results.magy,z:results.magz},sensors.iOS_sthumidity=results.hum,sensors.iOS_sttempamb=results.tamb,sensors.iOS_sttempir=results.tir,sensors.iOS_stpressure=results.press},calliOSFunction:function(e,t,r,n){var i="ejss://",o={};o.functionname=e,r&&(o.success=r),n&&(o.error=n),t&&(o.args=t),i+=JSON.stringify(o),window.location=i},isSupportedSensorTag:function(){return/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)},runSensorTag:function(e,t){if(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)){var r=[];r[0]=e,r[1]=t,sensors.calliOSFunction("runSensorTag",r,"sensors.setSensorTag")}},stopSensorTag:function(){/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)&&sensors.calliOSFunction("stopSensorTag")},getSensorTagAccelerometer:function(){return sensors.iOS_staccelerometer},getSensorTagGyroscope:function(){return sensors.iOS_stgyroscope},getSensorTagMagnetometer:function(){return sensors.iOS_stmagnetometer},getSensorTagTempAmb:function(){return sensors.iOS_sttempamb},getSensorTagTempIR:function(){return sensors.iOS_sttempir},getSensorTagPressure:function(){return sensors.iOS_stpressure},getSensorTagHumidity:function(){return sensors.iOS_sthumidity},isAccelerometer:function(){var e=window.android&&window.android.isAccelerometer(),t=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);return e||t},runAccelerometer:function(){var e=window.android&&window.android.isAccelerometer(),t=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);e?window.android.runAccelerometer():t&&sensors.calliOSFunction("runAccelerometer","","sensors.setAccelerometer")},stopAccelerometer:function(){var e=window.android&&window.android.isAccelerometer(),t=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);e?window.android.stopAccelerometer():t&&sensors.calliOSFunction("stopAccelerometer")},getAccelerometer:function(){var is_Androidwebview=window.android&&window.android.isAccelerometer(),is_iOSwebview=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);if(is_Androidwebview){var value=eval(window.android.getAccelerometer());return window.innerWidth>window.innerHeight?value:{x:value.y,y:-value.x,z:value.z}}return is_iOSwebview?sensors.iOS_accelerometer:{x:0,y:0,z:0}},isGyroscope:function(){var e=window.android&&window.android.isGyroscope(),t=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);return e||t},runGyroscope:function(){var e=window.android&&window.android.isGyroscope(),t=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);e?window.android.runGyroscope():t&&sensors.calliOSFunction("runGyroscope","","sensors.setGyroscope")},stopGyroscope:function(){var e=window.android&&window.android.isGyroscope(),t=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);e?window.android.stopGyroscope():t&&sensors.calliOSFunction("stopGyroscope")},getGyroscope:function(){var is_Androidwebview=window.android&&window.android.isGyroscope(),is_iOSwebview=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);if(is_Androidwebview){var value=eval(window.android.getGyroscope());return window.innerWidth>window.innerHeight?value:{x:value.y,y:-value.x,z:value.z}}return is_iOSwebview?sensors.iOS_gyroscope:{x:0,y:0,z:0}},isGravity:function(){return window.android&&window.android.isGravity()},runGravity:function(){window.android&&window.android.isGravity()&&window.android.runGravity()},stopGravity:function(){window.android&&window.android.isGravity()&&window.android.stopGravity()},getGravity:function(){return window.android&&window.android.isGravity()?window.android.getGravity():{x:0,y:0,z:0}},isLinearAcceleration:function(){return window.android&&window.android.isLinearAcceleration()},runLinearAcceleration:function(){window.android&&window.android.isLinearAcceleration()&&window.android.runLinearAcceleration()},stopLinearAcceleration:function(){window.android&&window.android.isLinearAcceleration()&&window.android.stopLinearAcceleration()},getLinearAcceleration:function(){return window.android&&window.android.isLinearAcceleration()?window.android.getLinearAcceleration():{x:0,y:0,z:0}},isRotationVector:function(){return window.android&&window.android.isRotationVector()},runRotationVector:function(){window.android&&window.android.isRotationVector()&&window.android.runRotationVector()},stopRotationVector:function(){window.android&&window.android.isRotationVector()&&window.android.stopRotationVector()},getRotationVector:function(){return window.android&&window.android.isRotationVector()?window.android.getRotationVector():{x:0,y:0,z:0}},isMagneticField:function(){return window.android&&window.android.isMagneticField()},runMagneticField:function(){window.android&&window.android.isMagneticField()&&window.android.runMagneticField()},stopMagneticField:function(){window.android&&window.android.isMagneticField()&&window.android.stopMagneticField()},getMagneticField:function(){return window.android&&window.android.isMagneticField()?window.android.getMagneticField():{x:0,y:0,z:0}},isAmbientTemperature:function(){return window.android&&window.android.isAmbientTemperature()},runAmbientTemperature:function(){window.android&&window.android.isAmbientTemperature()&&window.android.runAmbientTemperature()},stopAmbientTemperature:function(){window.android&&window.android.isAmbientTemperature()&&window.android.stopAmbientTemperature()},getAmbientTemperature:function(){return window.android&&window.android.isAmbientTemperature()?window.android.getAmbientTemperature():0},isLight:function(){return window.android&&window.android.isLight()},runLight:function(){window.android&&window.android.isLight()&&window.android.runLight()},stopLight:function(){window.android&&window.android.isLight()&&window.android.stopLight()},getLight:function(){return window.android&&window.android.isLight()?window.android.getLight():0},isPressure:function(){return window.android&&window.android.isPressure()},runPressure:function(){window.android&&window.android.isPressure()&&window.android.runPressure()},stopPressure:function(){
window.android&&window.android.isPressure()&&window.android.stopPressure()},getPressure:function(){return window.android&&window.android.isPressure()?window.android.getPressure():0},isHumidity:function(){return window.android&&window.android.isHumidity()},runHumidity:function(){window.android&&window.android.isHumidity()&&window.android.runHumidity()},stopHumidity:function(){window.android&&window.android.isHumidity()&&window.android.stopHumidity()},getHumidity:function(){return window.android&&window.android.isHumidity()?window.android.getHumidity():0}},_smartDevice.prototype={metadata:"",apis:[],models:"",modelsTemplate:[],apisFn:[],loadMetadata:function(e){this.metadata=JSON.parse(e)},loadModels:function(){this.models=this.metadata.models},loadApis:function(){this.apis=this.metadata.apis},getModelTemplate:function(e){if(this.models.hasOwnProperty(e)){var t=JSON.parse(JSON.stringify(this.models[e])),e=t.id;t.properties;return t}return writeToScreen('<span style="color: red;">ERROR:</span> '+e+" is not a key -> Model Not found"),null},generateMethodCall:function(e){for(var t=0;t<this.apis.length;t++)for(var r=this.apis[t],n=r.operations,i=0;i<n.length;i++){var o=n[i];if(o.nickname==e||void 0==e){var a,s=o.parameters[0],l=this.getModelTemplate(s.type),u=l.properties;l.hasOwnProperty("required")&&(a=l.required);var g="{",c=[],S=!1;for(var d in u)S?g+=",":S=!0,g+="'"+d+"' : "+d,c.push(d);g+="}";var E="{";if(void 0!=a)for(var f in a)E+="if( "+a[f]+"== undefined)  { \nconsole.log('Required parameter, "+a[f]+" : must be an input'); \nreturn null;} \n";E+="this.websocket.send(JSON.stringify("+g+"))",E+="}",this[o.nickname]=new Function(c,E)}}return!0},generateModelFilling:function(e){for(var t in this.models)if(t==e||void 0==e){var r,n=this.models[t],i=n.properties;n.hasOwnProperty("required")&&(r=n.required);var o=[],a="";a+="{\n",a+="\t var json2send=this.getModelTemplate('"+t+"').properties;\n";for(var s in i)o.push(s),a+="\t if( "+s+" != undefined)  { \n",a+="\t\t json2send['"+s+"']="+s+";  \n",a+="\t }else{\n",a+="\t\t delete json2send."+s+";\n",a+="\t }\n";if(void 0!=r)for(var l in r)a+="\t if( "+l+"== undefined)  { \n\t\t console.log('Required parameter, "+l+" : must be an input'); \n\t\t return null; \n",a+="\t }\n";a+="\t return json2send;",a+="}",this["fill"+t]=new Function(o,a)}return!0},bindFunctions:function(){},searchMethod:function(e){for(var t=0;t<this.apis.length;t++)for(var r=this.apis[t],n=r.operations,i=0;i<n.length;i++){var o=n[i];if(o.nickname==e)return o}},isValidMessage:function(e,t){var r=e;if(r.hasOwnProperty("method"))var n=this.searchMethod(r.method);else{if(void 0==t)return!1;var n=this.searchMethod(t)}for(var i=this.getModelTemplate(n.type),o=!1,a="",s=0;s<i.required.length;s++){if(a=i.required[s],!r.hasOwnProperty(a))return o=!1,console.log("Error processinMessage : "+e+" -> Property : "+a+" is a required field"),o;o=!0}return o},extract:function(e,t){if(this.isValidMessage(t)){for(var r={},n=0;n<e.length;n++)name=e[n],r[name]=t[name];return r}}},wrapper.prototype={methods:{connect:"connect",disconnect:"disconnect",get:"get",set:"set",callAction:"callAction",extract:"extract",eval:"eval",open:"open",step:"step"},post:function(e,t){(void 0!=e||t.hasOwnProperty("method"))&&(void 0==e||t.hasOwnProperty("method")||(t.method=e),websocket.send(t))},sync:function(e){void 0!=e&&e(response)},connect:function(e){this.smartdevice=new _smartDevice(fullData),this.smartdevice.loadApis(),this.smartdevice.loadModels(),this.smartdevice.generateMethodCall()},disconnect:function(e){},get:function(e,t,r){void 0===t||0==t?this.smartdevice.getSensorData("getSensorData",e):this.smartdevice.getSensorData("getSensorData",e,[this.smartdevice.fillConfigurationItem("updateFrequency",2)])},set:function(e,t,r,n){1==e.length?this.smartdevice.sendActuatorData(r,"sendActuatorData","modelVars",[e],[t]):this.smartdevice.sendActuatorData(r,"sendActuatorData","modelVars",e,t)},callAction:function(e,t,r){this.smartdevice.callAction("","callAction","modelMethods",e,t)},extract:function(e,t){var r=JSON.parse(e),n={};if(r.hasOwnProperty("method")){var i=r.method,o={};if("getSensorData"==i)n=["sensorId","responseData"];else if("sendActuatorData"==i)n=["lastMeasured","accessrole","payload","observerMode"];else if("getSensorMetadata"==i)n=["sensors"];else if("getActuatorMetadata"==i)n=["actuators"];else if("getActionsMetadata"==i)n=["sensors"];else if("callAction"==i)n=["method","callerName","nickName","params"];else{if("actionDataResponse"!=i)return void console.log("The method : "+r.method+" is not handled in this wrapper. \nWill be ignored.");n=["method","nickName"]}}return o=this.smartdevice.extract(n,r),this.toEjssReadable(i,o)},eval:function(e,t){},open:function(e,t){},step:function(e,t){},toEjssReadable:function(e,t){if("getSensorData"==e){for(var r={},n=t.responseData.valueNames,i=t.responseData.data,o=0;o<n.length;o++)r[n[o]]=i[o];return r}return"sendActuatorData"==e||("getSensorMetadata"==e?t:"getActuatorMetadata"==e?t:"getActionsMetadata"==e?t:"callAction"==e?t:"actionDataResponse"==e?t:void console.log("The method : "+e+" is nor handled in this wrapper. \nWill be ignored."))}};var EJSS_CORE=EJSS_CORE||{};EJSS_CORE.createView=function(e){function t(e,t){return e.match("^"+t)==t}var r,n,i,o,a,s={},l={},u={},g=[],c=[],S=[],d=[],E=[],f=[],p=[],h=[],m=[],A=[],_=[],I=[],D=!1,P=!0,T=[],C=[],N=!1,y=[],v=[],R=[];return s._1=function(){s[e].innerHTML="",l={},u={},g=[],c=[],T=[],S=[],d=[],E=[],f=[],p=[],m=[],A=[],_=[],I=[],h=[],D=!1,P=!0},s._2=function(e){n=e},s._3=function(e,r){if(null==e||e.length<=0)return e;if(t(e,"local:"))return e;if(t(e,"data:"))return e;if(t(e,"http:")||t(e,"https:")||t(e,"ws:"))return e;if("undefined"!=typeof __base64Images){var o=__base64Images[e];if(o)return o}if(i&&!t(e,i)&&"/"==e.charAt(0)?e=i+"images"+e:n&&!t(e,n)&&"/"!=e.charAt(0)&&(e=n+e),r&&t(window.location.protocol,"ibooks")){var a=window.location.pathname;a=a.substring(0,a.lastIndexOf("/")),t(e,"./")&&(e=e.substring(2)),e=window.location.protocol+"://"+window.location.host+"/"+a+"/"+e}return e},s._4=function(e){i=e},s._showDocument=function(e){window.open(s._3(e))},s._addDescriptionPage=function(e,t){y[e]=t},s._openDescriptionPage=function(e){var t=y[e];t?window.open(s._3(t)):console.log("Desription page not found: "+e)},s._5=function(e,t){l[e]={getter:null,setter:null,listeners:[],collectors:[],value:t}},s._5s=function(e){for(var t=0;t<e.length;t++)s._5(e[t])},s._7=function(e){u[e]={action:null}},s._7s=function(e){for(var t=0;t<e.length;t++)s._7(e[t])},s._9=function(e,t,r,n){var i=EJSS_CORE.promoteToControlElement(e(t,n),s,t);return i.render&&E.push(i),i.touch&&f.push(i),i.dataCollected&&p.push(i),i.reset&&S.push(i),i.initialize&&d.push(i),i.enableEPub&&m.push(i),i.adjustPosition&&A.push(i),t&&(s[t]=i),r&&i.setProperty("Parent",r),i},s._10=function(e){var t=l[e];if(void 0!==t)return t.value},s._11=function(){s._reset(),s._15(),s._initialize(),s._update(),s._render()},s._setRootProperty=function(e,t,r){switch(t){case"RunAlways":e.setRunAlways(r);break;case"OnBlur":s._addOnBlurAction(r);break;case"OnFocus":s._addOnFocusAction(r);break;case"InnerHTML":s._setInnerHTML(r);break;default:console.log("WARNING: View property not registered : "+t)}},s._12=function(e){r=e},s._13=function(e,t,r,n){var i=l[e];if(i){i.getter=t,i.setter=r,i.value=n;var o=c.indexOf(i);i.getter?i.listeners.length>0&&o<0&&c.push(i):o>=0&&c.splice(o,1),o=T.indexOf(i),i.value?i.listeners.length>0&&o<0&&T.push(i):o>=0&&T.splice(o,1)}else console.log("WARNING: view._setAccessors() - Variable not found : "+e);return i},s._setAction=function(e,t){var r=u[e];return r?r.action=t:console.log("WARNING: view._setAction() - Action not found : "+e),r},s._14=function(e){P=e},s._reset=function(){for(var e=0,t=S.length;e<t;e++)S[e].reset()},s._15=function(){for(var e=0,t=T.length;e<t;e++){var r=T[e],n=r.value;if(n)for(var i=r.listeners,o=0,a=i.length;o<a;o++)i[o](n)}},s._initialize=function(){for(var e=0,t=d.length;e<t;e++)d[e].initialize()},s._update=function(){var e,t;for(e=0,t=c.length;e<t;e++)for(var r=c[e],n=r.listeners,i=r.getter(),o=0,a=n.length;o<a;o++)n[o](i);for(e=0,t=g.length;e<t;e++){var s=g[e];s.propertySetter(s.getter())}},s._collectData=function(){var e,t;for(e=0,t=c.length;e<t;e++)for(var r=c[e],n=r.collectors,i=r.getter(),o=0,a=n.length;o<a;o++)n[o](i);for(e=0,t=g.length;e<t;e++){var s=g[e];s.isCollector&&s.propertySetter(s.getter())}for(e=0,t=p.length;e<t;e++)p[e].dataCollected()},s._render=function(){for(var e=0,t=E.length;e<t;e++)E[e].render()},s._touch=function(){for(var e=0,t=f.length;e<t;e++)f[e].touch()},s._enableEPub=function(){if("undefined"!=typeof _isEPub&&_isEPub)for(var e=0,t=m.length;e<t;e++)m[e].enableEPub()},s._addFontResizeListener=function(e){_.push(e)},s._fontResized=function(e,t,r){for(var n=0,i=A.length;n<i;n++)A[n].adjustPosition();if(e)for(var o=0,a=_.length;o<a;o++)_[o](e,t,r)},s._addResizeListener=function(e){I.push(e)},s._resized=function(e,t){for(var r=0,n=A.length;r<n;r++)A[r].adjustPosition();for(var i=0,o=I.length;i<o;i++)I[i](e,t)},s._16=function(e,t,r){var n=h.length;if(n<=0)return!1;D=!0;for(var i=0;i<n;i++){var o=h[i];if(s.isRegInteractions()){var a=o.interaction;a.data=o.data,a.runCount=e,a.runTime=t,a.isPlaying=r,a.timeStamp=Date.now(),s.pushRegInteractions(a)}o.data&&o.data.info?o.what(o.data.info,o.data):o.what(o.data)}return h=[],D=!1,!0},s._17=function(){return h.length},s._addOnBlurAction=function(e){v.push(e)},s._onBlur=function(){for(var e=0,t=v.length;e<t;e++)v[e]()},s._addOnFocusAction=function(e){R.push(e)},s._onFocus=function(){for(var e=0,t=R.length;e<t;e++)R[e]()},s._setInnerHTML=function(e){void 0===a&&(a=document.createElement("div"),document.body.appendChild(a)),a.innerHTML=e},s._18=function(){r&&P&&r()},s._19=function(e,t,r){var n=l[e];return n?(n.listeners.indexOf(t)<0&&(n.listeners.push(t),r&&n.collectors.push(t)),n.getter&&c.indexOf(n)<0&&c.push(n),n.value&&T.indexOf(n)<0&&T.push(n)):console.log("WARNING: view._19() - Variable not found : "+e),n},s._20=function(e,t,r){for(var n=!1,i=0,o=g.length;i<o;i++){var a=g[i];if(a.propertySetter===t){a.getter=e,n=!0;break}}return n||g.push({getter:e,propertySetter:t,isCollector:r}),n},s._21=function(e){var t=u[e];return t||console.log("WARNING: view._21() - Action not found : "+e),t},s._22=function(e,t,n){if(!r)return void e(t);!D&&P&&h.push({what:e,data:t,interaction:n})},s._format=function(e,t){var r=t.indexOf("."),n=0;return r>=0&&(n=Number(t.length-r-1)),parseFloat(e).toFixed(n)},s.print=function(e){var t=document.getElementsByTagName("textarea");t.length?t[0].innerHTML=e:console.log(e)},s._setVisible=function(t){document.getElementById(e).style.display=t?"inherit":"none"},s._switchVisibility=function(){s._setVisible("none"==document.getElementById(e).style.display)},s.serialize=function(){var e={};for(key in s)s[key].serialize&&(e[key]=s[key].serialize());return e},s.unserialize=function(e){for(key in e)s[key]&&s[key].unserialize?s[key].unserialize(e[key]):console.log("Impossible unserialize: "+key)},s.registerInteractions=function(e){C=[],o=e,N=!0},s.unregisterInteractions=function(){N=!1},s.getRegInteractions=function(){return C},s.isRegInteractions=function(){return N},s.pushRegInteractions=function(e){void 0!==o?o.send(JSON.stringify(e)):C.push(e)},s[e]=document.getElementById(e),s},EJSS_CORE.promoteToControlElement=function(e,t,r){r=r||"unnamed";var n=null,i={},o={};return e.getView=function(){return t},e._0=function(e){r=e},e.getName=function(){return r},e.getResourcePath=function(e){return t._3(e)},e.setDataObject=function(e){n=e},e.getDataObject=function(e){return n},e.registerProperty=function(t,r,n){return i[t]={setter:r,getter:n,variable:null,variableSetter:null},e},e.registerAction=function(t,r,n,i){return o[t]={action:null,helper:r,process:n},i&&e.setAction(t,i),e},e.setProperty=function(t,r){if(o[t])return e.setAction(t,r);var n=i[t];return n?n.setter(r):console.log("WARNING: ControlElement setProperty() - Property not registered : "+t+" for element : "+e.getName()),e},e.setProperties=function(t){for(var r in t)e.setProperty(r,t[r]);return e},e.linkProperty=function(r,n,o){var a=i[r];if(!a)return console.log("WARNING: ControlElement linkProperty() - Element property not registered : "+r+" for element : "+e.getName()),e;if("string"==typeof n){var s=t._19(n,a.setter,e.dataCollected);if(!s)return console.log("WARNING: ControlElement linkProperty() - element : "+e.getName()+" - property :"+r+" - View variable not registered : "+n),e;"InputOnly"===o||(a.variable=s),a.variableSetter=null}else t._20(n,a.setter,e.dataCollected),a.variableSetter=o,a.variable=null;return e},e.linkProperties=function(t){for(var r in t)e.linkProperty(r,t[r]);return e},e.setAction=function(r,n){var i=o[r];if(!i)return console.log("WARNING: ControlElement setAction() - action not registered : "+r+" for element : "+e.getName),e;if("string"==typeof n){var a=t._21(n);if(!a)return console.log("WARNING: ControlElement setAction() - element : "+e.getName()+" - View action not registered : "+n),e;i.action=a}else i.action={action:n};return e},e.setActions=function(t){for(var r in t)e.setAction(r,t[r]);return e},e.invokeAction=function(r){var n={};t.isRegInteractions()&&(n={action:r,element:e.getName(),timeStamp:Date.now()});var i=o[r];if(i&&(i.process&&t._22(i.process,null,n),i.action)){var a=i.helper?i.helper():null;t._22(i.action.action,a,n)}return e},e.invokeImmediateAction=function(t){var r=o[t];if(r&&(r.process&&r.process(null),r.action)){var n=r.helper?r.helper():null;r.action.action(n)}return e},e.propertiesChanged=function(){for(var t=0,r=arguments.length;t<r;t++)e.propertyChanged(arguments[t]);return e},e.propertyChanged=function(r,n){var o={};t.isRegInteractions()&&(o={property:r,element:e.getName(),timeStamp:Date.now()});var a=i[r];if(a){var s=a.variableSetter;if(s||a.variable&&(s=a.variable.setter),s||a.setter&&(s=a.setter),s){var l=void 0!==n?n:a.getter();t._22(s,l,o)}}return e},e.immediatePropertyChanged=function(t,r){var n=i[t];if(n){var o=n.variableSetter;if(o||n.variable&&(o=n.variable.setter),o||n.setter&&(o=n.setter),o){o(void 0!==r?r:n.getter())}}return e},e.reportInteractions=function(r,n){var i,o;if(r)for(i=0,o=r.length;i<o;i++)e.invokeAction(r[i]);if(n)for(i=0,o=n.length;i<o;i++)e.propertiesChanged(n[i]);return t._17()>0&&t._18(),e},e.getProperty=function(e,t){var r=i[e];if(r&&r.getter)return r.getter()},e.getProperties=function(){return i},e.registerProperty("name",e._0,e.getName),e.registerProperties&&e.registerProperties(e),e};

/* _inputParameters: an object with different values for the model parameters */
function addfractions(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
  var _model = EJSS_CORE.createAnimation();
  var _view;
  var _isPlaying = false;
  var _isPaused = true;
  var _isMobile = (navigator===undefined) ? false : navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);

var _stringProperties = {};
  var _tools = {
    showInputDialog : EJSS_INTERFACE.BoxPanel.showInputDialog,
    showOkDialog : EJSS_INTERFACE.BoxPanel.showOkDialog,
    showOkCancelDialog : EJSS_INTERFACE.BoxPanel.showOkCancelDialog
  };

  function _play()  { _isPaused = false; _isPlaying = true;  _model.play();  }
  function _pause() { _isPaused = true;  _isPlaying = false; _model.pause(); }
  function _step()  { _pause();  _model.step(); }
  function _reset() { _model.reset();  _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); }
  _model._play  = _play;
  _model._pause = _pause;
  _model._step  = _step;
  _model._reset = _reset;
  function _update() { _model.update(); }
  function _initialize() { _model.initialize(); }
  function _setFPS(_fps) { _model.setFPS(_fps); }
  function _setDelay(_delay) { _model.setDelay(_delay); }
  function _setStepsPerDisplay(_spd) { _model.setStepsPerDisplay(_spd); }
  function _setUpdateView(_updateView) { _model.setUpdateView(_updateView); }
  function _setAutoplay(_auto) { _model.setAutoplay(_auto); }
  function _println(_message) { console.log(_message); }

  function _breakAfterThisPage() { _model.setShouldBreak(true); }

  function _resetSolvers() { if (_model.resetSolvers) _model.resetSolvers(); }

  function _saveText(name,type,content) { if (_model.saveText) _model.saveText(name,type,content); }

  function _saveState(name) { if (_model.saveState) _model.saveState(name); }

  function _saveImage(name,panelname) { if (_model.saveImage) _model.saveImage(name,panelname); }

  function _readState(url,type) { if (_model.readState) _model.readState(url,type); }

  function _readText(url,type,varname) { if (_model.readText) _model.readText(url,type,varname); }

  function _getStringProperty(propertyName) {
    var _value = _stringProperties[propertyName];
    if (_value===undefined) return propertyName;
    else return _value;
  }
  var __pagesEnabled = [];
  function _setPageEnabled(pageName,enabled) { __pagesEnabled[pageName] = enabled; }

  var font; // EjsS Model.Variables.Var Table.font
  var showanswer; // EjsS Model.Variables.Var Table.showanswer
  var k; // EjsS Model.Variables.Var Table.k
  var keepequivalent; // EjsS Model.Variables.Var Table.keepequivalent
  var moveaway; // EjsS Model.Variables.Var Table.moveaway
  var xmin; // EjsS Model.Variables.Var Table.xmin
  var xmax; // EjsS Model.Variables.Var Table.xmax
  var ymin; // EjsS Model.Variables.Var Table.ymin
  var ymax; // EjsS Model.Variables.Var Table.ymax
  var rangex; // EjsS Model.Variables.Var Table.rangex
  var rangey; // EjsS Model.Variables.Var Table.rangey
  var sizex; // EjsS Model.Variables.Var Table.sizex
  var sizey; // EjsS Model.Variables.Var Table.sizey
  var selected; // EjsS Model.Variables.Var Table.selected
  var text; // EjsS Model.Variables.Var Table.text
  var questionanswer; // EjsS Model.Variables.Var Table.questionanswer
  var questionmorelessnumber; // EjsS Model.Variables.Var Table.questionmorelessnumber
  var questionthannumber; // EjsS Model.Variables.Var Table.questionthannumber
  var moreless; // EjsS Model.Variables.Var Table.moreless
  var textquestion; // EjsS Model.Variables.Var Table.textquestion
  var pi; // EjsS Model.Variables.Var Table.pi
  var y1; // EjsS Model.Variables.Var Table.y1
  var ysize; // EjsS Model.Variables.Var Table.ysize

  var top1; // EjsS Model.Variables.subtractionrandom.top1
  var bottom1; // EjsS Model.Variables.subtractionrandom.bottom1
  var top2; // EjsS Model.Variables.subtractionrandom.top2
  var bottom2; // EjsS Model.Variables.subtractionrandom.bottom2

  var iOS; // EjsS Model.Variables.layout.iOS
  var Android; // EjsS Model.Variables.layout.Android
  var iPad; // EjsS Model.Variables.layout.iPad
  var iPhone; // EjsS Model.Variables.layout.iPhone
  var Width; // EjsS Model.Variables.layout.Width
  var Height; // EjsS Model.Variables.layout.Height
  var Width1; // EjsS Model.Variables.layout.Width1
  var Width2; // EjsS Model.Variables.layout.Width2
  var world; // EjsS Model.Variables.layout.world
  var graph; // EjsS Model.Variables.layout.graph
  var disabledworld; // EjsS Model.Variables.layout.disabledworld
  var disabled; // EjsS Model.Variables.layout.disabled

  var x1; // EjsS Model.Variables.Var Table 2.x1
  var x2; // EjsS Model.Variables.Var Table 2.x2
  var vx1; // EjsS Model.Variables.Var Table 2.vx1
  var vx2; // EjsS Model.Variables.Var Table 2.vx2
  var t; // EjsS Model.Variables.Var Table 2.t
  var dt; // EjsS Model.Variables.Var Table 2.dt

  var selectedmodel; // EjsS Model.Variables.functionY.selectedmodel
  var functionY; // EjsS Model.Variables.functionY.functionY
  var xmodel; // EjsS Model.Variables.functionY.xmodel
  var showmodel; // EjsS Model.Variables.functionY.showmodel

  var angle; // EjsS Model.Variables.angle.angle
  var angledeg; // EjsS Model.Variables.angle.angledeg
  var dcangle; // EjsS Model.Variables.angle.dcangle
  var nangle; // EjsS Model.Variables.angle.nangle
  var px; // EjsS Model.Variables.angle.px
  var py; // EjsS Model.Variables.angle.py
  var option1d; // EjsS Model.Variables.angle.option1d
  var option; // EjsS Model.Variables.angle.option
  var denominator; // EjsS Model.Variables.angle.denominator
  var fillcolor; // EjsS Model.Variables.angle.fillcolor
  var fillcolor1; // EjsS Model.Variables.angle.fillcolor1
  var fillcolor2; // EjsS Model.Variables.angle.fillcolor2
  var fillcolor3; // EjsS Model.Variables.angle.fillcolor3
  var fillcolor4; // EjsS Model.Variables.angle.fillcolor4
  var fillcolor5; // EjsS Model.Variables.angle.fillcolor5
  var fillcolor6; // EjsS Model.Variables.angle.fillcolor6
  var fillcolor7; // EjsS Model.Variables.angle.fillcolor7
  var fillcolor8; // EjsS Model.Variables.angle.fillcolor8
  var fillcolor9; // EjsS Model.Variables.angle.fillcolor9
  var fillcolor10; // EjsS Model.Variables.angle.fillcolor10
  var fillcolor11; // EjsS Model.Variables.angle.fillcolor11
  var fillcolor12; // EjsS Model.Variables.angle.fillcolor12
  var fillcolor13; // EjsS Model.Variables.angle.fillcolor13
  var fillcolor14; // EjsS Model.Variables.angle.fillcolor14
  var fillcolor15; // EjsS Model.Variables.angle.fillcolor15
  var fillcolor16; // EjsS Model.Variables.angle.fillcolor16
  var fillcolor17; // EjsS Model.Variables.angle.fillcolor17
  var fillcolor18; // EjsS Model.Variables.angle.fillcolor18
  var fillcolor19; // EjsS Model.Variables.angle.fillcolor19
  var fillcolor20; // EjsS Model.Variables.angle.fillcolor20
  var transparency; // EjsS Model.Variables.angle.transparency
  var attributes; // EjsS Model.Variables.angle.attributes
  var test; // EjsS Model.Variables.angle.test
  var sign; // EjsS Model.Variables.angle.sign
  var signshow; // EjsS Model.Variables.angle.signshow

  var angle2; // EjsS Model.Variables.angle 2.angle2
  var angledeg2; // EjsS Model.Variables.angle 2.angledeg2
  var dcangle2; // EjsS Model.Variables.angle 2.dcangle2
  var nangle2; // EjsS Model.Variables.angle 2.nangle2
  var px2; // EjsS Model.Variables.angle 2.px2
  var py2; // EjsS Model.Variables.angle 2.py2
  var option2d; // EjsS Model.Variables.angle 2.option2d
  var option2; // EjsS Model.Variables.angle 2.option2
  var fillcolor2a; // EjsS Model.Variables.angle 2.fillcolor2a
  var fillcolor12a; // EjsS Model.Variables.angle 2.fillcolor12a
  var fillcolor22; // EjsS Model.Variables.angle 2.fillcolor22
  var fillcolor32; // EjsS Model.Variables.angle 2.fillcolor32
  var fillcolor42; // EjsS Model.Variables.angle 2.fillcolor42
  var fillcolor52; // EjsS Model.Variables.angle 2.fillcolor52
  var fillcolor62; // EjsS Model.Variables.angle 2.fillcolor62
  var fillcolor72; // EjsS Model.Variables.angle 2.fillcolor72
  var fillcolor82; // EjsS Model.Variables.angle 2.fillcolor82
  var fillcolor92; // EjsS Model.Variables.angle 2.fillcolor92
  var fillcolor102; // EjsS Model.Variables.angle 2.fillcolor102
  var fillcolor112; // EjsS Model.Variables.angle 2.fillcolor112
  var fillcolor122; // EjsS Model.Variables.angle 2.fillcolor122
  var fillcolor132; // EjsS Model.Variables.angle 2.fillcolor132
  var fillcolor142; // EjsS Model.Variables.angle 2.fillcolor142
  var fillcolor152; // EjsS Model.Variables.angle 2.fillcolor152
  var fillcolor162; // EjsS Model.Variables.angle 2.fillcolor162
  var fillcolor172; // EjsS Model.Variables.angle 2.fillcolor172
  var fillcolor182; // EjsS Model.Variables.angle 2.fillcolor182
  var fillcolor192; // EjsS Model.Variables.angle 2.fillcolor192
  var fillcolor202; // EjsS Model.Variables.angle 2.fillcolor202
  var transparency2; // EjsS Model.Variables.angle 2.transparency2
  var attributes2; // EjsS Model.Variables.angle 2.attributes2

  var transformation; // EjsS Model.Variables.circle.transformation
  var circleshow; // EjsS Model.Variables.circle.circleshow
  var rectangleshow; // EjsS Model.Variables.circle.rectangleshow

  var keyframes; // EjsS Model.Variables.animation.keyframes
  var counter; // EjsS Model.Variables.animation.counter
  var p0; // EjsS Model.Variables.animation.p0
  var p1; // EjsS Model.Variables.animation.p1
  var p2; // EjsS Model.Variables.animation.p2
  var p3; // EjsS Model.Variables.animation.p3
  var p4; // EjsS Model.Variables.animation.p4
  var p5; // EjsS Model.Variables.animation.p5
  var p6; // EjsS Model.Variables.animation.p6
  var p7; // EjsS Model.Variables.animation.p7
  var p8; // EjsS Model.Variables.animation.p8
  var p9; // EjsS Model.Variables.animation.p9
  var p10; // EjsS Model.Variables.animation.p10
  var p11; // EjsS Model.Variables.animation.p11
  var p12; // EjsS Model.Variables.animation.p12
  var p13; // EjsS Model.Variables.animation.p13
  var p14; // EjsS Model.Variables.animation.p14
  var p15; // EjsS Model.Variables.animation.p15
  var p16; // EjsS Model.Variables.animation.p16
  var p17; // EjsS Model.Variables.animation.p17
  var p18; // EjsS Model.Variables.animation.p18
  var p19; // EjsS Model.Variables.animation.p19
  var p20; // EjsS Model.Variables.animation.p20
  var p21; // EjsS Model.Variables.animation.p21
  var p22; // EjsS Model.Variables.animation.p22
  var p23; // EjsS Model.Variables.animation.p23
  var p24; // EjsS Model.Variables.animation.p24
  var p25; // EjsS Model.Variables.animation.p25
  var p26; // EjsS Model.Variables.animation.p26
  var p27; // EjsS Model.Variables.animation.p27
  var p28; // EjsS Model.Variables.animation.p28
  var p29; // EjsS Model.Variables.animation.p29
  var p30; // EjsS Model.Variables.animation.p30
  var p31; // EjsS Model.Variables.animation.p31
  var p32; // EjsS Model.Variables.animation.p32
  var p33; // EjsS Model.Variables.animation.p33
  var p34; // EjsS Model.Variables.animation.p34
  var p35; // EjsS Model.Variables.animation.p35
  var p36; // EjsS Model.Variables.animation.p36
  var p37; // EjsS Model.Variables.animation.p37
  var p38; // EjsS Model.Variables.animation.p38
  var p39; // EjsS Model.Variables.animation.p39
  var p40; // EjsS Model.Variables.animation.p40
  var p41; // EjsS Model.Variables.animation.p41
  var p42; // EjsS Model.Variables.animation.p42
  var p43; // EjsS Model.Variables.animation.p43
  var p44; // EjsS Model.Variables.animation.p44
  var p45; // EjsS Model.Variables.animation.p45
  var p46; // EjsS Model.Variables.animation.p46
  var p47; // EjsS Model.Variables.animation.p47
  var p48; // EjsS Model.Variables.animation.p48
  var p49; // EjsS Model.Variables.animation.p49

  var xrect; // EjsS Model.Variables.rectangle.xrect
  var yrect; // EjsS Model.Variables.rectangle.yrect
  var sizexrect; // EjsS Model.Variables.rectangle.sizexrect
  var sizeyrect; // EjsS Model.Variables.rectangle.sizeyrect
  var numberrect; // EjsS Model.Variables.rectangle.numberrect
  var fillcolorrect; // EjsS Model.Variables.rectangle.fillcolorrect
  var transparencyrect; // EjsS Model.Variables.rectangle.transparencyrect
  var attributesrect; // EjsS Model.Variables.rectangle.attributesrect

  var xrect2; // EjsS Model.Variables.rectanglesR.xrect2
  var yrect2; // EjsS Model.Variables.rectanglesR.yrect2
  var sizexrect2; // EjsS Model.Variables.rectanglesR.sizexrect2
  var sizeyrect2; // EjsS Model.Variables.rectanglesR.sizeyrect2
  var numberrect2; // EjsS Model.Variables.rectanglesR.numberrect2
  var fillcolorrect2; // EjsS Model.Variables.rectanglesR.fillcolorrect2
  var transparencyrect2; // EjsS Model.Variables.rectanglesR.transparencyrect2
  var attributesrect2; // EjsS Model.Variables.rectanglesR.attributesrect2

  var rectangleshowh; // EjsS Model.Variables.HrectanglesLeft.rectangleshowh
  var xrecth; // EjsS Model.Variables.HrectanglesLeft.xrecth
  var yrecth; // EjsS Model.Variables.HrectanglesLeft.yrecth
  var sizexrecth; // EjsS Model.Variables.HrectanglesLeft.sizexrecth
  var sizeyrecth; // EjsS Model.Variables.HrectanglesLeft.sizeyrecth

  var xrect2h; // EjsS Model.Variables.HrectangelsRight.xrect2h
  var yrect2h; // EjsS Model.Variables.HrectangelsRight.yrect2h
  var sizexrect2h; // EjsS Model.Variables.HrectangelsRight.sizexrect2h
  var sizeyrect2h; // EjsS Model.Variables.HrectangelsRight.sizeyrect2h

  var _privateOdesList;
  var _ODEi_evolution1;
  var userEvents1=[];

  _model.getOdes = function() { return[_ODEi_evolution1]};

  _model.removeEvents = function(){
    userEvents1=[];
  };

  _model.addFixedRel = function(code){_model.addToFixedRelations(function() { eval(code);});};

    function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      font : font,
      showanswer : showanswer,
      k : k,
      keepequivalent : keepequivalent,
      moveaway : moveaway,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      rangex : rangex,
      rangey : rangey,
      sizex : sizex,
      sizey : sizey,
      selected : selected,
      text : text,
      questionanswer : questionanswer,
      questionmorelessnumber : questionmorelessnumber,
      questionthannumber : questionthannumber,
      moreless : moreless,
      textquestion : textquestion,
      pi : pi,
      y1 : y1,
      ysize : ysize,
      top1 : top1,
      bottom1 : bottom1,
      top2 : top2,
      bottom2 : bottom2,
      iOS : iOS,
      Android : Android,
      iPad : iPad,
      iPhone : iPhone,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled,
      x1 : x1,
      x2 : x2,
      vx1 : vx1,
      vx2 : vx2,
      t : t,
      dt : dt,
      selectedmodel : selectedmodel,
      functionY : functionY,
      xmodel : xmodel,
      showmodel : showmodel,
      angle : angle,
      angledeg : angledeg,
      dcangle : dcangle,
      nangle : nangle,
      px : px,
      py : py,
      option1d : option1d,
      option : option,
      denominator : denominator,
      fillcolor : fillcolor,
      fillcolor1 : fillcolor1,
      fillcolor2 : fillcolor2,
      fillcolor3 : fillcolor3,
      fillcolor4 : fillcolor4,
      fillcolor5 : fillcolor5,
      fillcolor6 : fillcolor6,
      fillcolor7 : fillcolor7,
      fillcolor8 : fillcolor8,
      fillcolor9 : fillcolor9,
      fillcolor10 : fillcolor10,
      fillcolor11 : fillcolor11,
      fillcolor12 : fillcolor12,
      fillcolor13 : fillcolor13,
      fillcolor14 : fillcolor14,
      fillcolor15 : fillcolor15,
      fillcolor16 : fillcolor16,
      fillcolor17 : fillcolor17,
      fillcolor18 : fillcolor18,
      fillcolor19 : fillcolor19,
      fillcolor20 : fillcolor20,
      transparency : transparency,
      attributes : attributes,
      test : test,
      sign : sign,
      signshow : signshow,
      angle2 : angle2,
      angledeg2 : angledeg2,
      dcangle2 : dcangle2,
      nangle2 : nangle2,
      px2 : px2,
      py2 : py2,
      option2d : option2d,
      option2 : option2,
      fillcolor2a : fillcolor2a,
      fillcolor12a : fillcolor12a,
      fillcolor22 : fillcolor22,
      fillcolor32 : fillcolor32,
      fillcolor42 : fillcolor42,
      fillcolor52 : fillcolor52,
      fillcolor62 : fillcolor62,
      fillcolor72 : fillcolor72,
      fillcolor82 : fillcolor82,
      fillcolor92 : fillcolor92,
      fillcolor102 : fillcolor102,
      fillcolor112 : fillcolor112,
      fillcolor122 : fillcolor122,
      fillcolor132 : fillcolor132,
      fillcolor142 : fillcolor142,
      fillcolor152 : fillcolor152,
      fillcolor162 : fillcolor162,
      fillcolor172 : fillcolor172,
      fillcolor182 : fillcolor182,
      fillcolor192 : fillcolor192,
      fillcolor202 : fillcolor202,
      transparency2 : transparency2,
      attributes2 : attributes2,
      transformation : transformation,
      circleshow : circleshow,
      rectangleshow : rectangleshow,
      keyframes : keyframes,
      counter : counter,
      p0 : p0,
      p1 : p1,
      p2 : p2,
      p3 : p3,
      p4 : p4,
      p5 : p5,
      p6 : p6,
      p7 : p7,
      p8 : p8,
      p9 : p9,
      p10 : p10,
      p11 : p11,
      p12 : p12,
      p13 : p13,
      p14 : p14,
      p15 : p15,
      p16 : p16,
      p17 : p17,
      p18 : p18,
      p19 : p19,
      p20 : p20,
      p21 : p21,
      p22 : p22,
      p23 : p23,
      p24 : p24,
      p25 : p25,
      p26 : p26,
      p27 : p27,
      p28 : p28,
      p29 : p29,
      p30 : p30,
      p31 : p31,
      p32 : p32,
      p33 : p33,
      p34 : p34,
      p35 : p35,
      p36 : p36,
      p37 : p37,
      p38 : p38,
      p39 : p39,
      p40 : p40,
      p41 : p41,
      p42 : p42,
      p43 : p43,
      p44 : p44,
      p45 : p45,
      p46 : p46,
      p47 : p47,
      p48 : p48,
      p49 : p49,
      xrect : xrect,
      yrect : yrect,
      sizexrect : sizexrect,
      sizeyrect : sizeyrect,
      numberrect : numberrect,
      fillcolorrect : fillcolorrect,
      transparencyrect : transparencyrect,
      attributesrect : attributesrect,
      xrect2 : xrect2,
      yrect2 : yrect2,
      sizexrect2 : sizexrect2,
      sizeyrect2 : sizeyrect2,
      numberrect2 : numberrect2,
      fillcolorrect2 : fillcolorrect2,
      transparencyrect2 : transparencyrect2,
      attributesrect2 : attributesrect2,
      rectangleshowh : rectangleshowh,
      xrecth : xrecth,
      yrecth : yrecth,
      sizexrecth : sizexrecth,
      sizeyrecth : sizeyrecth,
      xrect2h : xrect2h,
      yrect2h : yrect2h,
      sizexrect2h : sizexrect2h,
      sizeyrect2h : sizeyrect2h
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      font : font,
      showanswer : showanswer,
      k : k,
      keepequivalent : keepequivalent,
      moveaway : moveaway,
      xmin : xmin,
      xmax : xmax,
      ymin : ymin,
      ymax : ymax,
      rangex : rangex,
      rangey : rangey,
      sizex : sizex,
      sizey : sizey,
      selected : selected,
      text : text,
      questionanswer : questionanswer,
      questionmorelessnumber : questionmorelessnumber,
      questionthannumber : questionthannumber,
      moreless : moreless,
      textquestion : textquestion,
      pi : pi,
      y1 : y1,
      ysize : ysize,
      top1 : top1,
      bottom1 : bottom1,
      top2 : top2,
      bottom2 : bottom2,
      iOS : iOS,
      Android : Android,
      iPad : iPad,
      iPhone : iPhone,
      Width : Width,
      Height : Height,
      Width1 : Width1,
      Width2 : Width2,
      world : world,
      graph : graph,
      disabledworld : disabledworld,
      disabled : disabled,
      x1 : x1,
      x2 : x2,
      vx1 : vx1,
      vx2 : vx2,
      t : t,
      dt : dt,
      selectedmodel : selectedmodel,
      functionY : functionY,
      xmodel : xmodel,
      showmodel : showmodel,
      angle : angle,
      angledeg : angledeg,
      dcangle : dcangle,
      nangle : nangle,
      px : px,
      py : py,
      option1d : option1d,
      option : option,
      denominator : denominator,
      fillcolor : fillcolor,
      fillcolor1 : fillcolor1,
      fillcolor2 : fillcolor2,
      fillcolor3 : fillcolor3,
      fillcolor4 : fillcolor4,
      fillcolor5 : fillcolor5,
      fillcolor6 : fillcolor6,
      fillcolor7 : fillcolor7,
      fillcolor8 : fillcolor8,
      fillcolor9 : fillcolor9,
      fillcolor10 : fillcolor10,
      fillcolor11 : fillcolor11,
      fillcolor12 : fillcolor12,
      fillcolor13 : fillcolor13,
      fillcolor14 : fillcolor14,
      fillcolor15 : fillcolor15,
      fillcolor16 : fillcolor16,
      fillcolor17 : fillcolor17,
      fillcolor18 : fillcolor18,
      fillcolor19 : fillcolor19,
      fillcolor20 : fillcolor20,
      transparency : transparency,
      attributes : attributes,
      test : test,
      sign : sign,
      signshow : signshow,
      angle2 : angle2,
      angledeg2 : angledeg2,
      dcangle2 : dcangle2,
      nangle2 : nangle2,
      px2 : px2,
      py2 : py2,
      option2d : option2d,
      option2 : option2,
      fillcolor2a : fillcolor2a,
      fillcolor12a : fillcolor12a,
      fillcolor22 : fillcolor22,
      fillcolor32 : fillcolor32,
      fillcolor42 : fillcolor42,
      fillcolor52 : fillcolor52,
      fillcolor62 : fillcolor62,
      fillcolor72 : fillcolor72,
      fillcolor82 : fillcolor82,
      fillcolor92 : fillcolor92,
      fillcolor102 : fillcolor102,
      fillcolor112 : fillcolor112,
      fillcolor122 : fillcolor122,
      fillcolor132 : fillcolor132,
      fillcolor142 : fillcolor142,
      fillcolor152 : fillcolor152,
      fillcolor162 : fillcolor162,
      fillcolor172 : fillcolor172,
      fillcolor182 : fillcolor182,
      fillcolor192 : fillcolor192,
      fillcolor202 : fillcolor202,
      transparency2 : transparency2,
      attributes2 : attributes2,
      transformation : transformation,
      circleshow : circleshow,
      rectangleshow : rectangleshow,
      keyframes : keyframes,
      counter : counter,
      p0 : p0,
      p1 : p1,
      p2 : p2,
      p3 : p3,
      p4 : p4,
      p5 : p5,
      p6 : p6,
      p7 : p7,
      p8 : p8,
      p9 : p9,
      p10 : p10,
      p11 : p11,
      p12 : p12,
      p13 : p13,
      p14 : p14,
      p15 : p15,
      p16 : p16,
      p17 : p17,
      p18 : p18,
      p19 : p19,
      p20 : p20,
      p21 : p21,
      p22 : p22,
      p23 : p23,
      p24 : p24,
      p25 : p25,
      p26 : p26,
      p27 : p27,
      p28 : p28,
      p29 : p29,
      p30 : p30,
      p31 : p31,
      p32 : p32,
      p33 : p33,
      p34 : p34,
      p35 : p35,
      p36 : p36,
      p37 : p37,
      p38 : p38,
      p39 : p39,
      p40 : p40,
      p41 : p41,
      p42 : p42,
      p43 : p43,
      p44 : p44,
      p45 : p45,
      p46 : p46,
      p47 : p47,
      p48 : p48,
      p49 : p49,
      xrect : xrect,
      yrect : yrect,
      sizexrect : sizexrect,
      sizeyrect : sizeyrect,
      numberrect : numberrect,
      fillcolorrect : fillcolorrect,
      transparencyrect : transparencyrect,
      attributesrect : attributesrect,
      xrect2 : xrect2,
      yrect2 : yrect2,
      sizexrect2 : sizexrect2,
      sizeyrect2 : sizeyrect2,
      numberrect2 : numberrect2,
      fillcolorrect2 : fillcolorrect2,
      transparencyrect2 : transparencyrect2,
      attributesrect2 : attributesrect2,
      rectangleshowh : rectangleshowh,
      xrecth : xrecth,
      yrecth : yrecth,
      sizexrecth : sizexrecth,
      sizeyrecth : sizeyrecth,
      xrect2h : xrect2h,
      yrect2h : yrect2h,
      sizexrect2h : sizexrect2h,
      sizeyrect2h : sizeyrect2h
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.showanswer != "undefined") showanswer = json.showanswer;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.keepequivalent != "undefined") keepequivalent = json.keepequivalent;
    if(typeof json.moveaway != "undefined") moveaway = json.moveaway;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.rangex != "undefined") rangex = json.rangex;
    if(typeof json.rangey != "undefined") rangey = json.rangey;
    if(typeof json.sizex != "undefined") sizex = json.sizex;
    if(typeof json.sizey != "undefined") sizey = json.sizey;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.questionanswer != "undefined") questionanswer = json.questionanswer;
    if(typeof json.questionmorelessnumber != "undefined") questionmorelessnumber = json.questionmorelessnumber;
    if(typeof json.questionthannumber != "undefined") questionthannumber = json.questionthannumber;
    if(typeof json.moreless != "undefined") moreless = json.moreless;
    if(typeof json.textquestion != "undefined") textquestion = json.textquestion;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.y1 != "undefined") y1 = json.y1;
    if(typeof json.ysize != "undefined") ysize = json.ysize;
    if(typeof json.top1 != "undefined") top1 = json.top1;
    if(typeof json.bottom1 != "undefined") bottom1 = json.bottom1;
    if(typeof json.top2 != "undefined") top2 = json.top2;
    if(typeof json.bottom2 != "undefined") bottom2 = json.bottom2;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.Android != "undefined") Android = json.Android;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.x1 != "undefined") x1 = json.x1;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.vx1 != "undefined") vx1 = json.vx1;
    if(typeof json.vx2 != "undefined") vx2 = json.vx2;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.selectedmodel != "undefined") selectedmodel = json.selectedmodel;
    if(typeof json.functionY != "undefined") functionY = json.functionY;
    if(typeof json.xmodel != "undefined") xmodel = json.xmodel;
    if(typeof json.showmodel != "undefined") showmodel = json.showmodel;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.angledeg != "undefined") angledeg = json.angledeg;
    if(typeof json.dcangle != "undefined") dcangle = json.dcangle;
    if(typeof json.nangle != "undefined") nangle = json.nangle;
    if(typeof json.px != "undefined") px = json.px;
    if(typeof json.py != "undefined") py = json.py;
    if(typeof json.option1d != "undefined") option1d = json.option1d;
    if(typeof json.option != "undefined") option = json.option;
    if(typeof json.denominator != "undefined") denominator = json.denominator;
    if(typeof json.fillcolor != "undefined") fillcolor = json.fillcolor;
    if(typeof json.fillcolor1 != "undefined") fillcolor1 = json.fillcolor1;
    if(typeof json.fillcolor2 != "undefined") fillcolor2 = json.fillcolor2;
    if(typeof json.fillcolor3 != "undefined") fillcolor3 = json.fillcolor3;
    if(typeof json.fillcolor4 != "undefined") fillcolor4 = json.fillcolor4;
    if(typeof json.fillcolor5 != "undefined") fillcolor5 = json.fillcolor5;
    if(typeof json.fillcolor6 != "undefined") fillcolor6 = json.fillcolor6;
    if(typeof json.fillcolor7 != "undefined") fillcolor7 = json.fillcolor7;
    if(typeof json.fillcolor8 != "undefined") fillcolor8 = json.fillcolor8;
    if(typeof json.fillcolor9 != "undefined") fillcolor9 = json.fillcolor9;
    if(typeof json.fillcolor10 != "undefined") fillcolor10 = json.fillcolor10;
    if(typeof json.fillcolor11 != "undefined") fillcolor11 = json.fillcolor11;
    if(typeof json.fillcolor12 != "undefined") fillcolor12 = json.fillcolor12;
    if(typeof json.fillcolor13 != "undefined") fillcolor13 = json.fillcolor13;
    if(typeof json.fillcolor14 != "undefined") fillcolor14 = json.fillcolor14;
    if(typeof json.fillcolor15 != "undefined") fillcolor15 = json.fillcolor15;
    if(typeof json.fillcolor16 != "undefined") fillcolor16 = json.fillcolor16;
    if(typeof json.fillcolor17 != "undefined") fillcolor17 = json.fillcolor17;
    if(typeof json.fillcolor18 != "undefined") fillcolor18 = json.fillcolor18;
    if(typeof json.fillcolor19 != "undefined") fillcolor19 = json.fillcolor19;
    if(typeof json.fillcolor20 != "undefined") fillcolor20 = json.fillcolor20;
    if(typeof json.transparency != "undefined") transparency = json.transparency;
    if(typeof json.attributes != "undefined") attributes = json.attributes;
    if(typeof json.test != "undefined") test = json.test;
    if(typeof json.sign != "undefined") sign = json.sign;
    if(typeof json.signshow != "undefined") signshow = json.signshow;
    if(typeof json.angle2 != "undefined") angle2 = json.angle2;
    if(typeof json.angledeg2 != "undefined") angledeg2 = json.angledeg2;
    if(typeof json.dcangle2 != "undefined") dcangle2 = json.dcangle2;
    if(typeof json.nangle2 != "undefined") nangle2 = json.nangle2;
    if(typeof json.px2 != "undefined") px2 = json.px2;
    if(typeof json.py2 != "undefined") py2 = json.py2;
    if(typeof json.option2d != "undefined") option2d = json.option2d;
    if(typeof json.option2 != "undefined") option2 = json.option2;
    if(typeof json.fillcolor2a != "undefined") fillcolor2a = json.fillcolor2a;
    if(typeof json.fillcolor12a != "undefined") fillcolor12a = json.fillcolor12a;
    if(typeof json.fillcolor22 != "undefined") fillcolor22 = json.fillcolor22;
    if(typeof json.fillcolor32 != "undefined") fillcolor32 = json.fillcolor32;
    if(typeof json.fillcolor42 != "undefined") fillcolor42 = json.fillcolor42;
    if(typeof json.fillcolor52 != "undefined") fillcolor52 = json.fillcolor52;
    if(typeof json.fillcolor62 != "undefined") fillcolor62 = json.fillcolor62;
    if(typeof json.fillcolor72 != "undefined") fillcolor72 = json.fillcolor72;
    if(typeof json.fillcolor82 != "undefined") fillcolor82 = json.fillcolor82;
    if(typeof json.fillcolor92 != "undefined") fillcolor92 = json.fillcolor92;
    if(typeof json.fillcolor102 != "undefined") fillcolor102 = json.fillcolor102;
    if(typeof json.fillcolor112 != "undefined") fillcolor112 = json.fillcolor112;
    if(typeof json.fillcolor122 != "undefined") fillcolor122 = json.fillcolor122;
    if(typeof json.fillcolor132 != "undefined") fillcolor132 = json.fillcolor132;
    if(typeof json.fillcolor142 != "undefined") fillcolor142 = json.fillcolor142;
    if(typeof json.fillcolor152 != "undefined") fillcolor152 = json.fillcolor152;
    if(typeof json.fillcolor162 != "undefined") fillcolor162 = json.fillcolor162;
    if(typeof json.fillcolor172 != "undefined") fillcolor172 = json.fillcolor172;
    if(typeof json.fillcolor182 != "undefined") fillcolor182 = json.fillcolor182;
    if(typeof json.fillcolor192 != "undefined") fillcolor192 = json.fillcolor192;
    if(typeof json.fillcolor202 != "undefined") fillcolor202 = json.fillcolor202;
    if(typeof json.transparency2 != "undefined") transparency2 = json.transparency2;
    if(typeof json.attributes2 != "undefined") attributes2 = json.attributes2;
    if(typeof json.transformation != "undefined") transformation = json.transformation;
    if(typeof json.circleshow != "undefined") circleshow = json.circleshow;
    if(typeof json.rectangleshow != "undefined") rectangleshow = json.rectangleshow;
    if(typeof json.keyframes != "undefined") keyframes = json.keyframes;
    if(typeof json.counter != "undefined") counter = json.counter;
    if(typeof json.p0 != "undefined") p0 = json.p0;
    if(typeof json.p1 != "undefined") p1 = json.p1;
    if(typeof json.p2 != "undefined") p2 = json.p2;
    if(typeof json.p3 != "undefined") p3 = json.p3;
    if(typeof json.p4 != "undefined") p4 = json.p4;
    if(typeof json.p5 != "undefined") p5 = json.p5;
    if(typeof json.p6 != "undefined") p6 = json.p6;
    if(typeof json.p7 != "undefined") p7 = json.p7;
    if(typeof json.p8 != "undefined") p8 = json.p8;
    if(typeof json.p9 != "undefined") p9 = json.p9;
    if(typeof json.p10 != "undefined") p10 = json.p10;
    if(typeof json.p11 != "undefined") p11 = json.p11;
    if(typeof json.p12 != "undefined") p12 = json.p12;
    if(typeof json.p13 != "undefined") p13 = json.p13;
    if(typeof json.p14 != "undefined") p14 = json.p14;
    if(typeof json.p15 != "undefined") p15 = json.p15;
    if(typeof json.p16 != "undefined") p16 = json.p16;
    if(typeof json.p17 != "undefined") p17 = json.p17;
    if(typeof json.p18 != "undefined") p18 = json.p18;
    if(typeof json.p19 != "undefined") p19 = json.p19;
    if(typeof json.p20 != "undefined") p20 = json.p20;
    if(typeof json.p21 != "undefined") p21 = json.p21;
    if(typeof json.p22 != "undefined") p22 = json.p22;
    if(typeof json.p23 != "undefined") p23 = json.p23;
    if(typeof json.p24 != "undefined") p24 = json.p24;
    if(typeof json.p25 != "undefined") p25 = json.p25;
    if(typeof json.p26 != "undefined") p26 = json.p26;
    if(typeof json.p27 != "undefined") p27 = json.p27;
    if(typeof json.p28 != "undefined") p28 = json.p28;
    if(typeof json.p29 != "undefined") p29 = json.p29;
    if(typeof json.p30 != "undefined") p30 = json.p30;
    if(typeof json.p31 != "undefined") p31 = json.p31;
    if(typeof json.p32 != "undefined") p32 = json.p32;
    if(typeof json.p33 != "undefined") p33 = json.p33;
    if(typeof json.p34 != "undefined") p34 = json.p34;
    if(typeof json.p35 != "undefined") p35 = json.p35;
    if(typeof json.p36 != "undefined") p36 = json.p36;
    if(typeof json.p37 != "undefined") p37 = json.p37;
    if(typeof json.p38 != "undefined") p38 = json.p38;
    if(typeof json.p39 != "undefined") p39 = json.p39;
    if(typeof json.p40 != "undefined") p40 = json.p40;
    if(typeof json.p41 != "undefined") p41 = json.p41;
    if(typeof json.p42 != "undefined") p42 = json.p42;
    if(typeof json.p43 != "undefined") p43 = json.p43;
    if(typeof json.p44 != "undefined") p44 = json.p44;
    if(typeof json.p45 != "undefined") p45 = json.p45;
    if(typeof json.p46 != "undefined") p46 = json.p46;
    if(typeof json.p47 != "undefined") p47 = json.p47;
    if(typeof json.p48 != "undefined") p48 = json.p48;
    if(typeof json.p49 != "undefined") p49 = json.p49;
    if(typeof json.xrect != "undefined") xrect = json.xrect;
    if(typeof json.yrect != "undefined") yrect = json.yrect;
    if(typeof json.sizexrect != "undefined") sizexrect = json.sizexrect;
    if(typeof json.sizeyrect != "undefined") sizeyrect = json.sizeyrect;
    if(typeof json.numberrect != "undefined") numberrect = json.numberrect;
    if(typeof json.fillcolorrect != "undefined") fillcolorrect = json.fillcolorrect;
    if(typeof json.transparencyrect != "undefined") transparencyrect = json.transparencyrect;
    if(typeof json.attributesrect != "undefined") attributesrect = json.attributesrect;
    if(typeof json.xrect2 != "undefined") xrect2 = json.xrect2;
    if(typeof json.yrect2 != "undefined") yrect2 = json.yrect2;
    if(typeof json.sizexrect2 != "undefined") sizexrect2 = json.sizexrect2;
    if(typeof json.sizeyrect2 != "undefined") sizeyrect2 = json.sizeyrect2;
    if(typeof json.numberrect2 != "undefined") numberrect2 = json.numberrect2;
    if(typeof json.fillcolorrect2 != "undefined") fillcolorrect2 = json.fillcolorrect2;
    if(typeof json.transparencyrect2 != "undefined") transparencyrect2 = json.transparencyrect2;
    if(typeof json.attributesrect2 != "undefined") attributesrect2 = json.attributesrect2;
    if(typeof json.rectangleshowh != "undefined") rectangleshowh = json.rectangleshowh;
    if(typeof json.xrecth != "undefined") xrecth = json.xrecth;
    if(typeof json.yrecth != "undefined") yrecth = json.yrecth;
    if(typeof json.sizexrecth != "undefined") sizexrecth = json.sizexrecth;
    if(typeof json.sizeyrecth != "undefined") sizeyrecth = json.sizeyrecth;
    if(typeof json.xrect2h != "undefined") xrect2h = json.xrect2h;
    if(typeof json.yrect2h != "undefined") yrect2h = json.yrect2h;
    if(typeof json.sizexrect2h != "undefined") sizexrect2h = json.sizexrect2h;
    if(typeof json.sizeyrect2h != "undefined") sizeyrect2h = json.sizeyrect2h;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.showanswer != "undefined") showanswer = json.showanswer;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.keepequivalent != "undefined") keepequivalent = json.keepequivalent;
    if(typeof json.moveaway != "undefined") moveaway = json.moveaway;
    if(typeof json.xmin != "undefined") xmin = json.xmin;
    if(typeof json.xmax != "undefined") xmax = json.xmax;
    if(typeof json.ymin != "undefined") ymin = json.ymin;
    if(typeof json.ymax != "undefined") ymax = json.ymax;
    if(typeof json.rangex != "undefined") rangex = json.rangex;
    if(typeof json.rangey != "undefined") rangey = json.rangey;
    if(typeof json.sizex != "undefined") sizex = json.sizex;
    if(typeof json.sizey != "undefined") sizey = json.sizey;
    if(typeof json.selected != "undefined") selected = json.selected;
    if(typeof json.text != "undefined") text = json.text;
    if(typeof json.questionanswer != "undefined") questionanswer = json.questionanswer;
    if(typeof json.questionmorelessnumber != "undefined") questionmorelessnumber = json.questionmorelessnumber;
    if(typeof json.questionthannumber != "undefined") questionthannumber = json.questionthannumber;
    if(typeof json.moreless != "undefined") moreless = json.moreless;
    if(typeof json.textquestion != "undefined") textquestion = json.textquestion;
    if(typeof json.pi != "undefined") pi = json.pi;
    if(typeof json.y1 != "undefined") y1 = json.y1;
    if(typeof json.ysize != "undefined") ysize = json.ysize;
    if(typeof json.top1 != "undefined") top1 = json.top1;
    if(typeof json.bottom1 != "undefined") bottom1 = json.bottom1;
    if(typeof json.top2 != "undefined") top2 = json.top2;
    if(typeof json.bottom2 != "undefined") bottom2 = json.bottom2;
    if(typeof json.iOS != "undefined") iOS = json.iOS;
    if(typeof json.Android != "undefined") Android = json.Android;
    if(typeof json.iPad != "undefined") iPad = json.iPad;
    if(typeof json.iPhone != "undefined") iPhone = json.iPhone;
    if(typeof json.Width != "undefined") Width = json.Width;
    if(typeof json.Height != "undefined") Height = json.Height;
    if(typeof json.Width1 != "undefined") Width1 = json.Width1;
    if(typeof json.Width2 != "undefined") Width2 = json.Width2;
    if(typeof json.world != "undefined") world = json.world;
    if(typeof json.graph != "undefined") graph = json.graph;
    if(typeof json.disabledworld != "undefined") disabledworld = json.disabledworld;
    if(typeof json.disabled != "undefined") disabled = json.disabled;
    if(typeof json.x1 != "undefined") x1 = json.x1;
    if(typeof json.x2 != "undefined") x2 = json.x2;
    if(typeof json.vx1 != "undefined") vx1 = json.vx1;
    if(typeof json.vx2 != "undefined") vx2 = json.vx2;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.selectedmodel != "undefined") selectedmodel = json.selectedmodel;
    if(typeof json.functionY != "undefined") functionY = json.functionY;
    if(typeof json.xmodel != "undefined") xmodel = json.xmodel;
    if(typeof json.showmodel != "undefined") showmodel = json.showmodel;
    if(typeof json.angle != "undefined") angle = json.angle;
    if(typeof json.angledeg != "undefined") angledeg = json.angledeg;
    if(typeof json.dcangle != "undefined") dcangle = json.dcangle;
    if(typeof json.nangle != "undefined") nangle = json.nangle;
    if(typeof json.px != "undefined") px = json.px;
    if(typeof json.py != "undefined") py = json.py;
    if(typeof json.option1d != "undefined") option1d = json.option1d;
    if(typeof json.option != "undefined") option = json.option;
    if(typeof json.denominator != "undefined") denominator = json.denominator;
    if(typeof json.fillcolor != "undefined") fillcolor = json.fillcolor;
    if(typeof json.fillcolor1 != "undefined") fillcolor1 = json.fillcolor1;
    if(typeof json.fillcolor2 != "undefined") fillcolor2 = json.fillcolor2;
    if(typeof json.fillcolor3 != "undefined") fillcolor3 = json.fillcolor3;
    if(typeof json.fillcolor4 != "undefined") fillcolor4 = json.fillcolor4;
    if(typeof json.fillcolor5 != "undefined") fillcolor5 = json.fillcolor5;
    if(typeof json.fillcolor6 != "undefined") fillcolor6 = json.fillcolor6;
    if(typeof json.fillcolor7 != "undefined") fillcolor7 = json.fillcolor7;
    if(typeof json.fillcolor8 != "undefined") fillcolor8 = json.fillcolor8;
    if(typeof json.fillcolor9 != "undefined") fillcolor9 = json.fillcolor9;
    if(typeof json.fillcolor10 != "undefined") fillcolor10 = json.fillcolor10;
    if(typeof json.fillcolor11 != "undefined") fillcolor11 = json.fillcolor11;
    if(typeof json.fillcolor12 != "undefined") fillcolor12 = json.fillcolor12;
    if(typeof json.fillcolor13 != "undefined") fillcolor13 = json.fillcolor13;
    if(typeof json.fillcolor14 != "undefined") fillcolor14 = json.fillcolor14;
    if(typeof json.fillcolor15 != "undefined") fillcolor15 = json.fillcolor15;
    if(typeof json.fillcolor16 != "undefined") fillcolor16 = json.fillcolor16;
    if(typeof json.fillcolor17 != "undefined") fillcolor17 = json.fillcolor17;
    if(typeof json.fillcolor18 != "undefined") fillcolor18 = json.fillcolor18;
    if(typeof json.fillcolor19 != "undefined") fillcolor19 = json.fillcolor19;
    if(typeof json.fillcolor20 != "undefined") fillcolor20 = json.fillcolor20;
    if(typeof json.transparency != "undefined") transparency = json.transparency;
    if(typeof json.attributes != "undefined") attributes = json.attributes;
    if(typeof json.test != "undefined") test = json.test;
    if(typeof json.sign != "undefined") sign = json.sign;
    if(typeof json.signshow != "undefined") signshow = json.signshow;
    if(typeof json.angle2 != "undefined") angle2 = json.angle2;
    if(typeof json.angledeg2 != "undefined") angledeg2 = json.angledeg2;
    if(typeof json.dcangle2 != "undefined") dcangle2 = json.dcangle2;
    if(typeof json.nangle2 != "undefined") nangle2 = json.nangle2;
    if(typeof json.px2 != "undefined") px2 = json.px2;
    if(typeof json.py2 != "undefined") py2 = json.py2;
    if(typeof json.option2d != "undefined") option2d = json.option2d;
    if(typeof json.option2 != "undefined") option2 = json.option2;
    if(typeof json.fillcolor2a != "undefined") fillcolor2a = json.fillcolor2a;
    if(typeof json.fillcolor12a != "undefined") fillcolor12a = json.fillcolor12a;
    if(typeof json.fillcolor22 != "undefined") fillcolor22 = json.fillcolor22;
    if(typeof json.fillcolor32 != "undefined") fillcolor32 = json.fillcolor32;
    if(typeof json.fillcolor42 != "undefined") fillcolor42 = json.fillcolor42;
    if(typeof json.fillcolor52 != "undefined") fillcolor52 = json.fillcolor52;
    if(typeof json.fillcolor62 != "undefined") fillcolor62 = json.fillcolor62;
    if(typeof json.fillcolor72 != "undefined") fillcolor72 = json.fillcolor72;
    if(typeof json.fillcolor82 != "undefined") fillcolor82 = json.fillcolor82;
    if(typeof json.fillcolor92 != "undefined") fillcolor92 = json.fillcolor92;
    if(typeof json.fillcolor102 != "undefined") fillcolor102 = json.fillcolor102;
    if(typeof json.fillcolor112 != "undefined") fillcolor112 = json.fillcolor112;
    if(typeof json.fillcolor122 != "undefined") fillcolor122 = json.fillcolor122;
    if(typeof json.fillcolor132 != "undefined") fillcolor132 = json.fillcolor132;
    if(typeof json.fillcolor142 != "undefined") fillcolor142 = json.fillcolor142;
    if(typeof json.fillcolor152 != "undefined") fillcolor152 = json.fillcolor152;
    if(typeof json.fillcolor162 != "undefined") fillcolor162 = json.fillcolor162;
    if(typeof json.fillcolor172 != "undefined") fillcolor172 = json.fillcolor172;
    if(typeof json.fillcolor182 != "undefined") fillcolor182 = json.fillcolor182;
    if(typeof json.fillcolor192 != "undefined") fillcolor192 = json.fillcolor192;
    if(typeof json.fillcolor202 != "undefined") fillcolor202 = json.fillcolor202;
    if(typeof json.transparency2 != "undefined") transparency2 = json.transparency2;
    if(typeof json.attributes2 != "undefined") attributes2 = json.attributes2;
    if(typeof json.transformation != "undefined") transformation = json.transformation;
    if(typeof json.circleshow != "undefined") circleshow = json.circleshow;
    if(typeof json.rectangleshow != "undefined") rectangleshow = json.rectangleshow;
    if(typeof json.keyframes != "undefined") keyframes = json.keyframes;
    if(typeof json.counter != "undefined") counter = json.counter;
    if(typeof json.p0 != "undefined") p0 = json.p0;
    if(typeof json.p1 != "undefined") p1 = json.p1;
    if(typeof json.p2 != "undefined") p2 = json.p2;
    if(typeof json.p3 != "undefined") p3 = json.p3;
    if(typeof json.p4 != "undefined") p4 = json.p4;
    if(typeof json.p5 != "undefined") p5 = json.p5;
    if(typeof json.p6 != "undefined") p6 = json.p6;
    if(typeof json.p7 != "undefined") p7 = json.p7;
    if(typeof json.p8 != "undefined") p8 = json.p8;
    if(typeof json.p9 != "undefined") p9 = json.p9;
    if(typeof json.p10 != "undefined") p10 = json.p10;
    if(typeof json.p11 != "undefined") p11 = json.p11;
    if(typeof json.p12 != "undefined") p12 = json.p12;
    if(typeof json.p13 != "undefined") p13 = json.p13;
    if(typeof json.p14 != "undefined") p14 = json.p14;
    if(typeof json.p15 != "undefined") p15 = json.p15;
    if(typeof json.p16 != "undefined") p16 = json.p16;
    if(typeof json.p17 != "undefined") p17 = json.p17;
    if(typeof json.p18 != "undefined") p18 = json.p18;
    if(typeof json.p19 != "undefined") p19 = json.p19;
    if(typeof json.p20 != "undefined") p20 = json.p20;
    if(typeof json.p21 != "undefined") p21 = json.p21;
    if(typeof json.p22 != "undefined") p22 = json.p22;
    if(typeof json.p23 != "undefined") p23 = json.p23;
    if(typeof json.p24 != "undefined") p24 = json.p24;
    if(typeof json.p25 != "undefined") p25 = json.p25;
    if(typeof json.p26 != "undefined") p26 = json.p26;
    if(typeof json.p27 != "undefined") p27 = json.p27;
    if(typeof json.p28 != "undefined") p28 = json.p28;
    if(typeof json.p29 != "undefined") p29 = json.p29;
    if(typeof json.p30 != "undefined") p30 = json.p30;
    if(typeof json.p31 != "undefined") p31 = json.p31;
    if(typeof json.p32 != "undefined") p32 = json.p32;
    if(typeof json.p33 != "undefined") p33 = json.p33;
    if(typeof json.p34 != "undefined") p34 = json.p34;
    if(typeof json.p35 != "undefined") p35 = json.p35;
    if(typeof json.p36 != "undefined") p36 = json.p36;
    if(typeof json.p37 != "undefined") p37 = json.p37;
    if(typeof json.p38 != "undefined") p38 = json.p38;
    if(typeof json.p39 != "undefined") p39 = json.p39;
    if(typeof json.p40 != "undefined") p40 = json.p40;
    if(typeof json.p41 != "undefined") p41 = json.p41;
    if(typeof json.p42 != "undefined") p42 = json.p42;
    if(typeof json.p43 != "undefined") p43 = json.p43;
    if(typeof json.p44 != "undefined") p44 = json.p44;
    if(typeof json.p45 != "undefined") p45 = json.p45;
    if(typeof json.p46 != "undefined") p46 = json.p46;
    if(typeof json.p47 != "undefined") p47 = json.p47;
    if(typeof json.p48 != "undefined") p48 = json.p48;
    if(typeof json.p49 != "undefined") p49 = json.p49;
    if(typeof json.xrect != "undefined") xrect = json.xrect;
    if(typeof json.yrect != "undefined") yrect = json.yrect;
    if(typeof json.sizexrect != "undefined") sizexrect = json.sizexrect;
    if(typeof json.sizeyrect != "undefined") sizeyrect = json.sizeyrect;
    if(typeof json.numberrect != "undefined") numberrect = json.numberrect;
    if(typeof json.fillcolorrect != "undefined") fillcolorrect = json.fillcolorrect;
    if(typeof json.transparencyrect != "undefined") transparencyrect = json.transparencyrect;
    if(typeof json.attributesrect != "undefined") attributesrect = json.attributesrect;
    if(typeof json.xrect2 != "undefined") xrect2 = json.xrect2;
    if(typeof json.yrect2 != "undefined") yrect2 = json.yrect2;
    if(typeof json.sizexrect2 != "undefined") sizexrect2 = json.sizexrect2;
    if(typeof json.sizeyrect2 != "undefined") sizeyrect2 = json.sizeyrect2;
    if(typeof json.numberrect2 != "undefined") numberrect2 = json.numberrect2;
    if(typeof json.fillcolorrect2 != "undefined") fillcolorrect2 = json.fillcolorrect2;
    if(typeof json.transparencyrect2 != "undefined") transparencyrect2 = json.transparencyrect2;
    if(typeof json.attributesrect2 != "undefined") attributesrect2 = json.attributesrect2;
    if(typeof json.rectangleshowh != "undefined") rectangleshowh = json.rectangleshowh;
    if(typeof json.xrecth != "undefined") xrecth = json.xrecth;
    if(typeof json.yrecth != "undefined") yrecth = json.yrecth;
    if(typeof json.sizexrecth != "undefined") sizexrecth = json.sizexrecth;
    if(typeof json.sizeyrecth != "undefined") sizeyrecth = json.sizeyrecth;
    if(typeof json.xrect2h != "undefined") xrect2h = json.xrect2h;
    if(typeof json.yrect2h != "undefined") yrect2h = json.yrect2h;
    if(typeof json.sizexrect2h != "undefined") sizexrect2h = json.sizexrect2h;
    if(typeof json.sizeyrect2h != "undefined") sizeyrect2h = json.sizeyrect2h;
  };

  function _unserializePublic(json) { return _model.unserializePublic(json); }

  _model._userUnserializePublic = function(json) {
    _model._readParametersPublic(json);
   _resetSolvers();
   _model.update();
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model._userUnserialize = function(json) {
    _model._readParameters(json);
   _resetSolvers();
   _model.update();
  };

  _model.addToReset(function() {
    __pagesEnabled["svg"] = true;
    __pagesEnabled["undefined"] = true;
    __pagesEnabled["angle"] = true;
    __pagesEnabled["angle 2"] = true;
    __pagesEnabled["axes"] = true;
    __pagesEnabled["rectangles"] = true;
    __pagesEnabled["Hrectangles"] = true;
    __pagesEnabled["animation"] = true;
    __pagesEnabled["Evol Page"] = true;
    __pagesEnabled["movetowardsaddition"] = true;
    __pagesEnabled["moveaway"] = true;
    __pagesEnabled["movetowardssubtraction"] = true;
    __pagesEnabled["moveaway 2"] = true;
    __pagesEnabled["Evol Page 2"] = true;
    __pagesEnabled["motion"] = true;
    __pagesEnabled["math.js"] = false;
    __pagesEnabled["angle"] = true;
    __pagesEnabled["color"] = true;
    __pagesEnabled["angle 2"] = true;
    __pagesEnabled["color 2"] = true;
    __pagesEnabled["signcheck"] = false;
    __pagesEnabled["lessthan1"] = true;
    __pagesEnabled["rectangles"] = true;
    __pagesEnabled["rectangleLeftH"] = true;
    __pagesEnabled["rectangle2"] = true;
    __pagesEnabled["rectangleLeftHorizontal"] = true;
  });

  _model.addToReset(function() {
    font = _isMobile?"normal normal 30px ":"normal normal 49px "; // EjsS Model.Variables.Var Table.font
    showanswer = false; // EjsS Model.Variables.Var Table.showanswer
    k = "= ?"; // EjsS Model.Variables.Var Table.k
    keepequivalent = false; // EjsS Model.Variables.Var Table.keepequivalent
    moveaway = false; // EjsS Model.Variables.Var Table.moveaway
    xmin = 0; // EjsS Model.Variables.Var Table.xmin
    xmax = 40; // EjsS Model.Variables.Var Table.xmax
    ymin = -2; // EjsS Model.Variables.Var Table.ymin
    ymax = 2; // EjsS Model.Variables.Var Table.ymax
    rangex = xmax-xmin; // EjsS Model.Variables.Var Table.rangex
    rangey = ymax-ymin; // EjsS Model.Variables.Var Table.rangey
    sizex = rangex/20; // EjsS Model.Variables.Var Table.sizex
    sizey = rangey/20; // EjsS Model.Variables.Var Table.sizey
    selected = new Array(1); // EjsS Model.Variables.Var Table.selected
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.Var Table.selected
        selected[_i0] = "shm_with_xo=0,vo=2";  // EjsS Model.Variables.Var Table.selected
      }
    }());
    text = "select dropdown menu and click play"; // EjsS Model.Variables.Var Table.text
    questionanswer = 21; // EjsS Model.Variables.Var Table.questionanswer
    questionmorelessnumber = 4; // EjsS Model.Variables.Var Table.questionmorelessnumber
    questionthannumber = 17; // EjsS Model.Variables.Var Table.questionthannumber
    moreless = ""; // EjsS Model.Variables.Var Table.moreless
    textquestion = "_______ more than 17 is 21"; // EjsS Model.Variables.Var Table.textquestion
    pi = Math.PI; // EjsS Model.Variables.Var Table.pi
    y1 = sizey*5/2; // EjsS Model.Variables.Var Table.y1
    ysize = 0.2; // EjsS Model.Variables.Var Table.ysize
  });

  _model.addToReset(function() {
    top1 = Math.floor(Math.random()*20); // EjsS Model.Variables.subtractionrandom.top1
    bottom1 = Math.max(Math.ceil(Math.random()*20),top1); // EjsS Model.Variables.subtractionrandom.bottom1
    top2 = Math.max(Math.min(Math.floor(Math.random()*20),top1-1),1); // EjsS Model.Variables.subtractionrandom.top2
    bottom2 = bottom1; // EjsS Model.Variables.subtractionrandom.bottom2
  });

  _model.addToReset(function() {
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iOS
    Android = /Android|android/i.test(navigator.userAgent); // EjsS Model.Variables.layout.Android
    iPad = /iPad/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPad
    iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // EjsS Model.Variables.layout.iPhone
    Width = (_isEPub)?"400":"100%"; // EjsS Model.Variables.layout.Width
    Height = (_isEPub)?"500":"100%"; // EjsS Model.Variables.layout.Height
    Width1 = "100%"; // EjsS Model.Variables.layout.Width1
    Width2 = "50%"; // EjsS Model.Variables.layout.Width2
    world = true; // EjsS Model.Variables.layout.world
    graph = true; // EjsS Model.Variables.layout.graph
    disabledworld = false; // EjsS Model.Variables.layout.disabledworld
    disabled = false; // EjsS Model.Variables.layout.disabled
  });

  _model.addToReset(function() {
    x1 = -1.5; // EjsS Model.Variables.Var Table 2.x1
    x2 = 1.5; // EjsS Model.Variables.Var Table 2.x2
    vx1 = 1; // EjsS Model.Variables.Var Table 2.vx1
    vx2 = 0; // EjsS Model.Variables.Var Table 2.vx2
    t = 0; // EjsS Model.Variables.Var Table 2.t
    dt = 0.05; // EjsS Model.Variables.Var Table 2.dt
  });

  _model.addToReset(function() {
    selectedmodel = new Array(1); // EjsS Model.Variables.functionY.selectedmodel
    (function () {
      var _i0;
      for (_i0=0; _i0<1; _i0+=1) {  // EjsS Model.Variables.functionY.selectedmodel
        selectedmodel[_i0] = "2*sin(t)";  // EjsS Model.Variables.functionY.selectedmodel
      }
    }());
    functionY = selectedmodel+""; // EjsS Model.Variables.functionY.functionY
    showmodel = false; // EjsS Model.Variables.functionY.showmodel
  });

  _model.addToReset(function() {
    angle = 2*pi; // EjsS Model.Variables.angle.angle
    nangle = 100; // EjsS Model.Variables.angle.nangle
    px = new Array(nangle); // EjsS Model.Variables.angle.px
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.angle.px
        px[_i0] = 0;  // EjsS Model.Variables.angle.px
      }
    }());
    py = new Array(nangle); // EjsS Model.Variables.angle.py
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.angle.py
        py[_i0] = 0;  // EjsS Model.Variables.angle.py
      }
    }());
    option1d = 1; // EjsS Model.Variables.angle.option1d
    option = 1; // EjsS Model.Variables.angle.option
    denominator = 20+1; // EjsS Model.Variables.angle.denominator
    fillcolor = new Array(denominator); // EjsS Model.Variables.angle.fillcolor
    (function () {
      var _i0;
      for (_i0=0; _i0<denominator; _i0+=1) {  // EjsS Model.Variables.angle.fillcolor
        fillcolor[_i0] = "";  // EjsS Model.Variables.angle.fillcolor
      }
    }());
    fillcolor1 = "rgba(255,0,0,1.0)"; // EjsS Model.Variables.angle.fillcolor1
    fillcolor2 = "rgba(0,255,0,1.0)"; // EjsS Model.Variables.angle.fillcolor2
    fillcolor3 = "rgba(0,0,255,1.0)"; // EjsS Model.Variables.angle.fillcolor3
    fillcolor4 = "rgba(255,255,0,1.0)"; // EjsS Model.Variables.angle.fillcolor4
    fillcolor5 = "rgba(255,0,255,1.0)"; // EjsS Model.Variables.angle.fillcolor5
    fillcolor6 = "rgba(0,255,255,1.0)"; // EjsS Model.Variables.angle.fillcolor6
    fillcolor7 = "rgba(128,128,128,1.0)"; // EjsS Model.Variables.angle.fillcolor7
    fillcolor8 = "rgba(0,255,128,1.0)"; // EjsS Model.Variables.angle.fillcolor8
    fillcolor9 = "rgba(0,128,255,1.0)"; // EjsS Model.Variables.angle.fillcolor9
    fillcolor10 = "rgba(128,0,128,1.0)"; // EjsS Model.Variables.angle.fillcolor10
    fillcolor11 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle.fillcolor11
    fillcolor12 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle.fillcolor12
    fillcolor13 = "rgba(128,0,128,1.0)"; // EjsS Model.Variables.angle.fillcolor13
    fillcolor14 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle.fillcolor14
    fillcolor15 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle.fillcolor15
    fillcolor16 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle.fillcolor16
    fillcolor17 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle.fillcolor17
    fillcolor18 = "rgba(128,0,128,1.0)"; // EjsS Model.Variables.angle.fillcolor18
    fillcolor19 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle.fillcolor19
    fillcolor20 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle.fillcolor20
    transparency = new Array(denominator); // EjsS Model.Variables.angle.transparency
    (function () {
      var _i0;
      for (_i0=0; _i0<denominator; _i0+=1) {  // EjsS Model.Variables.angle.transparency
        transparency[_i0] = 0;  // EjsS Model.Variables.angle.transparency
      }
    }());
    attributes = new Array(denominator); // EjsS Model.Variables.angle.attributes
    (function () {
      var _i0;
      for (_i0=0; _i0<denominator; _i0+=1) {  // EjsS Model.Variables.angle.attributes
        attributes[_i0] = {"stroke-dasharray":"2 8 2 8"};  // EjsS Model.Variables.angle.attributes
      }
    }());
    test = true; // EjsS Model.Variables.angle.test
    sign = 1; // EjsS Model.Variables.angle.sign
    signshow = true; // EjsS Model.Variables.angle.signshow
  });

  _model.addToReset(function() {
    angle2 = 2*pi; // EjsS Model.Variables.angle 2.angle2
    nangle2 = 100; // EjsS Model.Variables.angle 2.nangle2
    px2 = new Array(nangle2); // EjsS Model.Variables.angle 2.px2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle2; _i0+=1) {  // EjsS Model.Variables.angle 2.px2
        px2[_i0] = 0;  // EjsS Model.Variables.angle 2.px2
      }
    }());
    py2 = new Array(nangle2); // EjsS Model.Variables.angle 2.py2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle2; _i0+=1) {  // EjsS Model.Variables.angle 2.py2
        py2[_i0] = 0;  // EjsS Model.Variables.angle 2.py2
      }
    }());
    option2d = 1; // EjsS Model.Variables.angle 2.option2d
    option2 = 1; // EjsS Model.Variables.angle 2.option2
    fillcolor2a = new Array(denominator); // EjsS Model.Variables.angle 2.fillcolor2a
    (function () {
      var _i0;
      for (_i0=0; _i0<denominator; _i0+=1) {  // EjsS Model.Variables.angle 2.fillcolor2a
        fillcolor2a[_i0] = "";  // EjsS Model.Variables.angle 2.fillcolor2a
      }
    }());
    fillcolor12a = "rgba(255,0,0,1.0)"; // EjsS Model.Variables.angle 2.fillcolor12a
    fillcolor22 = "rgba(0,255,0,1.0)"; // EjsS Model.Variables.angle 2.fillcolor22
    fillcolor32 = "rgba(0,0,255,1.0)"; // EjsS Model.Variables.angle 2.fillcolor32
    fillcolor42 = "rgba(255,255,0,1.0)"; // EjsS Model.Variables.angle 2.fillcolor42
    fillcolor52 = "rgba(255,0,255,1.0)"; // EjsS Model.Variables.angle 2.fillcolor52
    fillcolor62 = "rgba(0,255,255,1.0)"; // EjsS Model.Variables.angle 2.fillcolor62
    fillcolor72 = "rgba(128,128,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor72
    fillcolor82 = "rgba(0,255,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor82
    fillcolor92 = "rgba(0,128,255,1.0)"; // EjsS Model.Variables.angle 2.fillcolor92
    fillcolor102 = "rgba(128,0,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor102
    fillcolor112 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor112
    fillcolor122 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor122
    fillcolor132 = "rgba(128,0,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor132
    fillcolor142 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor142
    fillcolor152 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor152
    fillcolor162 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor162
    fillcolor172 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor172
    fillcolor182 = "rgba(128,0,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor182
    fillcolor192 = "rgba(255,128,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor192
    fillcolor202 = "rgba(0,0,128,1.0)"; // EjsS Model.Variables.angle 2.fillcolor202
    transparency2 = new Array(denominator); // EjsS Model.Variables.angle 2.transparency2
    (function () {
      var _i0;
      for (_i0=0; _i0<denominator; _i0+=1) {  // EjsS Model.Variables.angle 2.transparency2
        transparency2[_i0] = 0;  // EjsS Model.Variables.angle 2.transparency2
      }
    }());
    attributes2 = new Array(denominator); // EjsS Model.Variables.angle 2.attributes2
    (function () {
      var _i0;
      for (_i0=0; _i0<denominator; _i0+=1) {  // EjsS Model.Variables.angle 2.attributes2
        attributes2[_i0] = {"stroke-dasharray":"2 8 2 8"};  // EjsS Model.Variables.angle 2.attributes2
      }
    }());
  });

  _model.addToReset(function() {
    transformation = angle2*option2; // EjsS Model.Variables.circle.transformation
  });

  _model.addToReset(function() {
    keyframes = []; // EjsS Model.Variables.animation.keyframes
    counter = 0; // EjsS Model.Variables.animation.counter
    p0 = []; // EjsS Model.Variables.animation.p0
    p1 = []; // EjsS Model.Variables.animation.p1
    p2 = []; // EjsS Model.Variables.animation.p2
    p3 = []; // EjsS Model.Variables.animation.p3
    p4 = []; // EjsS Model.Variables.animation.p4
    p5 = []; // EjsS Model.Variables.animation.p5
    p6 = []; // EjsS Model.Variables.animation.p6
    p7 = []; // EjsS Model.Variables.animation.p7
    p8 = []; // EjsS Model.Variables.animation.p8
    p9 = []; // EjsS Model.Variables.animation.p9
    p10 = []; // EjsS Model.Variables.animation.p10
    p11 = []; // EjsS Model.Variables.animation.p11
    p12 = []; // EjsS Model.Variables.animation.p12
    p13 = []; // EjsS Model.Variables.animation.p13
    p14 = []; // EjsS Model.Variables.animation.p14
    p15 = []; // EjsS Model.Variables.animation.p15
    p16 = []; // EjsS Model.Variables.animation.p16
    p17 = []; // EjsS Model.Variables.animation.p17
    p18 = []; // EjsS Model.Variables.animation.p18
    p19 = []; // EjsS Model.Variables.animation.p19
    p20 = []; // EjsS Model.Variables.animation.p20
    p21 = []; // EjsS Model.Variables.animation.p21
    p22 = []; // EjsS Model.Variables.animation.p22
    p23 = []; // EjsS Model.Variables.animation.p23
    p24 = []; // EjsS Model.Variables.animation.p24
    p25 = []; // EjsS Model.Variables.animation.p25
    p26 = []; // EjsS Model.Variables.animation.p26
    p27 = []; // EjsS Model.Variables.animation.p27
    p28 = []; // EjsS Model.Variables.animation.p28
    p29 = []; // EjsS Model.Variables.animation.p29
    p30 = []; // EjsS Model.Variables.animation.p30
    p31 = []; // EjsS Model.Variables.animation.p31
    p32 = []; // EjsS Model.Variables.animation.p32
    p33 = []; // EjsS Model.Variables.animation.p33
    p34 = []; // EjsS Model.Variables.animation.p34
    p35 = []; // EjsS Model.Variables.animation.p35
    p36 = []; // EjsS Model.Variables.animation.p36
    p37 = []; // EjsS Model.Variables.animation.p37
    p38 = []; // EjsS Model.Variables.animation.p38
    p39 = []; // EjsS Model.Variables.animation.p39
    p40 = []; // EjsS Model.Variables.animation.p40
    p41 = []; // EjsS Model.Variables.animation.p41
    p42 = []; // EjsS Model.Variables.animation.p42
    p43 = []; // EjsS Model.Variables.animation.p43
    p44 = []; // EjsS Model.Variables.animation.p44
    p45 = []; // EjsS Model.Variables.animation.p45
    p46 = []; // EjsS Model.Variables.animation.p46
    p47 = []; // EjsS Model.Variables.animation.p47
    p48 = []; // EjsS Model.Variables.animation.p48
    p49 = []; // EjsS Model.Variables.animation.p49
  });

  _model.addToReset(function() {
    xrect = new Array(nangle); // EjsS Model.Variables.rectangle.xrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.xrect
        xrect[_i0] = 0;  // EjsS Model.Variables.rectangle.xrect
      }
    }());
    yrect = new Array(nangle); // EjsS Model.Variables.rectangle.yrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.yrect
        yrect[_i0] = 0;  // EjsS Model.Variables.rectangle.yrect
      }
    }());
    sizexrect = new Array(nangle); // EjsS Model.Variables.rectangle.sizexrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.sizexrect
        sizexrect[_i0] = 12/nangle*2;  // EjsS Model.Variables.rectangle.sizexrect
      }
    }());
    sizeyrect = new Array(nangle); // EjsS Model.Variables.rectangle.sizeyrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.sizeyrect
        sizeyrect[_i0] = 2;  // EjsS Model.Variables.rectangle.sizeyrect
      }
    }());
    numberrect = new Array(nangle); // EjsS Model.Variables.rectangle.numberrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.numberrect
        numberrect[_i0] = 0;  // EjsS Model.Variables.rectangle.numberrect
      }
    }());
    fillcolorrect = new Array(nangle); // EjsS Model.Variables.rectangle.fillcolorrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.fillcolorrect
        fillcolorrect[_i0] = "rgba(255,0,0,0.5)";  // EjsS Model.Variables.rectangle.fillcolorrect
      }
    }());
    transparencyrect = new Array(nangle); // EjsS Model.Variables.rectangle.transparencyrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.transparencyrect
        transparencyrect[_i0] = 0.5;  // EjsS Model.Variables.rectangle.transparencyrect
      }
    }());
    attributesrect = new Array(nangle); // EjsS Model.Variables.rectangle.attributesrect
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectangle.attributesrect
        attributesrect[_i0] = {"stroke-dasharray":"16 0 16 0"};  // EjsS Model.Variables.rectangle.attributesrect
      }
    }());
  });

  _model.addToReset(function() {
    xrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.xrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.xrect2
        xrect2[_i0] = 0;  // EjsS Model.Variables.rectanglesR.xrect2
      }
    }());
    yrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.yrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.yrect2
        yrect2[_i0] = 0;  // EjsS Model.Variables.rectanglesR.yrect2
      }
    }());
    sizexrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.sizexrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.sizexrect2
        sizexrect2[_i0] = 12/nangle2*2;  // EjsS Model.Variables.rectanglesR.sizexrect2
      }
    }());
    sizeyrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.sizeyrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.sizeyrect2
        sizeyrect2[_i0] = 2;  // EjsS Model.Variables.rectanglesR.sizeyrect2
      }
    }());
    numberrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.numberrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.numberrect2
        numberrect2[_i0] = 0;  // EjsS Model.Variables.rectanglesR.numberrect2
      }
    }());
    fillcolorrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.fillcolorrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.fillcolorrect2
        fillcolorrect2[_i0] = "rgba(0,255,0,0.5)";  // EjsS Model.Variables.rectanglesR.fillcolorrect2
      }
    }());
    transparencyrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.transparencyrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.transparencyrect2
        transparencyrect2[_i0] = 0.5;  // EjsS Model.Variables.rectanglesR.transparencyrect2
      }
    }());
    attributesrect2 = new Array(nangle); // EjsS Model.Variables.rectanglesR.attributesrect2
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.rectanglesR.attributesrect2
        attributesrect2[_i0] = {"stroke-dasharray":"16 0 16 0"};  // EjsS Model.Variables.rectanglesR.attributesrect2
      }
    }());
  });

  _model.addToReset(function() {
    xrecth = new Array(nangle); // EjsS Model.Variables.HrectanglesLeft.xrecth
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectanglesLeft.xrecth
        xrecth[_i0] = 0;  // EjsS Model.Variables.HrectanglesLeft.xrecth
      }
    }());
    yrecth = new Array(nangle); // EjsS Model.Variables.HrectanglesLeft.yrecth
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectanglesLeft.yrecth
        yrecth[_i0] = 0;  // EjsS Model.Variables.HrectanglesLeft.yrecth
      }
    }());
    sizexrecth = new Array(nangle); // EjsS Model.Variables.HrectanglesLeft.sizexrecth
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectanglesLeft.sizexrecth
        sizexrecth[_i0] = 2;  // EjsS Model.Variables.HrectanglesLeft.sizexrecth
      }
    }());
    sizeyrecth = new Array(nangle); // EjsS Model.Variables.HrectanglesLeft.sizeyrecth
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectanglesLeft.sizeyrecth
        sizeyrecth[_i0] = 12/nangle*2;  // EjsS Model.Variables.HrectanglesLeft.sizeyrecth
      }
    }());
  });

  _model.addToReset(function() {
    xrect2h = new Array(nangle); // EjsS Model.Variables.HrectangelsRight.xrect2h
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectangelsRight.xrect2h
        xrect2h[_i0] = 0;  // EjsS Model.Variables.HrectangelsRight.xrect2h
      }
    }());
    yrect2h = new Array(nangle); // EjsS Model.Variables.HrectangelsRight.yrect2h
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectangelsRight.yrect2h
        yrect2h[_i0] = 0;  // EjsS Model.Variables.HrectangelsRight.yrect2h
      }
    }());
    sizexrect2h = new Array(nangle); // EjsS Model.Variables.HrectangelsRight.sizexrect2h
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectangelsRight.sizexrect2h
        sizexrect2h[_i0] = 2;  // EjsS Model.Variables.HrectangelsRight.sizexrect2h
      }
    }());
    sizeyrect2h = new Array(nangle); // EjsS Model.Variables.HrectangelsRight.sizeyrect2h
    (function () {
      var _i0;
      for (_i0=0; _i0<nangle; _i0+=1) {  // EjsS Model.Variables.HrectangelsRight.sizeyrect2h
        sizeyrect2h[_i0] = 12/nangle2*2;  // EjsS Model.Variables.HrectangelsRight.sizeyrect2h
      }
    }());
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _privateOdesList=[];
    _ODEi_evolution1 = _ODE_evolution1();
    _privateOdesList.push(_ODEi_evolution1);
  });

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  //https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode  // > CustomCode.fullscreen:1
  // does not work for iOS   // > CustomCode.fullscreen:2
  /*jslint browser:true */  // > CustomCode.fullscreen:3
  function toggleFullScreen() {  // > CustomCode.fullscreen:4
    if (!document.fullscreenElement &&    // alternative standard method  // > CustomCode.fullscreen:5
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods  // > CustomCode.fullscreen:6
      if (document.documentElement.requestFullscreen) {  // > CustomCode.fullscreen:7
        document.documentElement.requestFullscreen();  // > CustomCode.fullscreen:8
      } else if (document.documentElement.msRequestFullscreen) {  // > CustomCode.fullscreen:9
        document.documentElement.msRequestFullscreen();  // > CustomCode.fullscreen:10
      } else if (document.documentElement.mozRequestFullScreen) {  // > CustomCode.fullscreen:11
        document.documentElement.mozRequestFullScreen();  // > CustomCode.fullscreen:12
      } else if (document.documentElement.webkitRequestFullscreen) {  // > CustomCode.fullscreen:13
        document.documentElement.webkitRequestFullscreen();  // > CustomCode.fullscreen:14
      }  // > CustomCode.fullscreen:15
    } else {  // > CustomCode.fullscreen:16
      if (document.exitFullscreen) {  // > CustomCode.fullscreen:17
        document.exitFullscreen();  // > CustomCode.fullscreen:18
      } else if (document.msExitFullscreen) {  // > CustomCode.fullscreen:19
        document.msExitFullscreen();  // > CustomCode.fullscreen:20
      } else if (document.mozCancelFullScreen) {  // > CustomCode.fullscreen:21
        document.mozCancelFullScreen();  // > CustomCode.fullscreen:22
      } else if (document.webkitExitFullscreen) {  // > CustomCode.fullscreen:23
        document.webkitExitFullscreen();  // > CustomCode.fullscreen:24
      }  // > CustomCode.fullscreen:25
    }  // > CustomCode.fullscreen:26
  }  // > CustomCode.fullscreen:27

  function initialization (keyframes) {  // > CustomCode.animation:1
    for (var prop in keyframes[0].values) {  // > CustomCode.animation:2
      var v0 = keyframes[0].values[prop];  // > CustomCode.animation:3
      if(Array.isArray(v0))   // > CustomCode.animation:4
        eval(prop + "=" + "[" + v0 + "]");  // > CustomCode.animation:5
      else  // > CustomCode.animation:6
        eval(prop + "=" + v0);  // > CustomCode.animation:7
    }  // > CustomCode.animation:8
  }  // > CustomCode.animation:9
  function interpolate (keyframes, pos) {  // > CustomCode.animation:10
    // select current keyframes (could be optimized)  // > CustomCode.animation:11
    var k0, k1;  // > CustomCode.animation:12
    for (var i = 0; i < keyframes.length; i++) {     // > CustomCode.animation:13
      var kf = keyframes[i];  // > CustomCode.animation:14
      if(kf.pos >= pos) {  // > CustomCode.animation:15
        k1 = kf;  // > CustomCode.animation:16
        break;  // > CustomCode.animation:17
      }  // > CustomCode.animation:18
      k0 = kf;  // > CustomCode.animation:19
    }  // > CustomCode.animation:20
    // frame > maximum keyframe  // > CustomCode.animation:21
    if(typeof k1 == 'undefined') return;  // > CustomCode.animation:22
    // interpolation  // > CustomCode.animation:23
    var times = (pos - k0.pos)/(k1.pos - k0.pos);  // > CustomCode.animation:24
    for (var prop in k0.values) {  // > CustomCode.animation:25
      var v0 = k0.values[prop];  // > CustomCode.animation:26
      var command = "";  // > CustomCode.animation:27
      if (k1.values.hasOwnProperty(prop)) { // variable to interpolate  // > CustomCode.animation:28
          var v1 = k1.values[prop];  // > CustomCode.animation:29
          if(Array.isArray(v0)) { // array  // > CustomCode.animation:30
            var dv = [];  // > CustomCode.animation:31
            for(var j = 0; j < v0.length; j++) {  // > CustomCode.animation:32
              dv[j] = v0[j] + (v1[j] - v0[j]) * times;  // > CustomCode.animation:33
            }  // > CustomCode.animation:34
            command = prop + "=" + "[" + dv + "]";  // > CustomCode.animation:35
          } else { // number  // > CustomCode.animation:36
            var dv = v0 + (v1 - v0) * times;  // > CustomCode.animation:37
            command = prop + "=" + dv;  // > CustomCode.animation:38
          }  // > CustomCode.animation:39
      } else { // variable not defined in the following keyframe  // > CustomCode.animation:40
          if(Array.isArray(v0))   // > CustomCode.animation:41
            command = prop + "=" + "[" + v0 + "]";  // > CustomCode.animation:42
          else  // > CustomCode.animation:43
            command = prop + "=" + v0;  // > CustomCode.animation:44
      }  // > CustomCode.animation:45
      eval(command);  // > CustomCode.animation:46
    }  // > CustomCode.animation:47
  }  // > CustomCode.animation:48

  function initializeAnimation () {  // > CustomCode.initializeAnimation:1
  // initialize values  // > CustomCode.initializeAnimation:2
  calculateAngles ();  // > CustomCode.initializeAnimation:3
  var p = calculatePoints1();  // > CustomCode.initializeAnimation:4
  var p2 = calculatePoints2();  // > CustomCode.initializeAnimation:5
  // initialize animation  // > CustomCode.initializeAnimation:6
  counter = 0;  // > CustomCode.initializeAnimation:7
  keyframes = [   // > CustomCode.initializeAnimation:8
    { pos: 0, values: { px: px, py: py, px2: px2, py2: py2 }  }, //px py are coordinates of Left circle, px2 py2 are right circle  // > CustomCode.initializeAnimation:9
    { pos: 1, values: { px: p[0], py: p[1], px2: p2[0], py2: p2[1] }  } //p[0] p[1] are x n y of left circles  // > CustomCode.initializeAnimation:10
  ];  // > CustomCode.initializeAnimation:11
  initialization(keyframes);  // > CustomCode.initializeAnimation:12
  }  // > CustomCode.initializeAnimation:13

  function changeOrientation() {  // > CustomCode.changeOrientation:1
  //if(typeof parent.device != 'undefined')  // > CustomCode.changeOrientation:2
  //  _view.mytext.setText(parent.device.platform)  // > CustomCode.changeOrientation:3
  //else  // > CustomCode.changeOrientation:4
   // _view.mytext.setText("nada:");  // > CustomCode.changeOrientation:5
  // check platform for Apps  // > CustomCode.changeOrientation:6
  var iOSapp =  (typeof parent.device != 'undefined' && parent.device.platform == "iOS");  // > CustomCode.changeOrientation:7
  var Androidapp = (typeof parent.device != 'undefined' && parent.device.platform == "Android");  // > CustomCode.changeOrientation:8
  // check platform for web browsers  // > CustomCode.changeOrientation:9
  var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:10
  var iPad =/iPad/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:11
  var iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:12
  var Android= /Android|android/i.test(navigator.userAgent);  // > CustomCode.changeOrientation:13
  //_view.mytext.setText(_view.mytext.getText() + "-orient:" + window.orientation + "-" + iOSapp + "-" + Androidapp);  // > CustomCode.changeOrientation:14
  switch (window.orientation) {  // > CustomCode.changeOrientation:15
    case 0:  // > CustomCode.changeOrientation:16
    case 180:  // > CustomCode.changeOrientation:17
      this.screenOrientation = 'portrait';  // > CustomCode.changeOrientation:18
      if (iOSapp){ // does not seems to work  // > CustomCode.changeOrientation:19
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:20
        return window.screen.height*0.7;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:21
        // return window.screen.height;  // > CustomCode.changeOrientation:22
        //  return window.innerHeight;  // > CustomCode.changeOrientation:23
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:24
      }  // > CustomCode.changeOrientation:25
        // > CustomCode.changeOrientation:26
      else {  // > CustomCode.changeOrientation:27
        // return Math.max(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrientation:28
        return window.innerHeight*0.7;  // > CustomCode.changeOrientation:29
      }  // > CustomCode.changeOrientation:30
      break;  // > CustomCode.changeOrientation:31
    case 90:  // > CustomCode.changeOrientation:32
    case -90:  // > CustomCode.changeOrientation:33
      this.screenOrientation = 'landscape';  // > CustomCode.changeOrientation:34
      if (iOSapp){ // App  // > CustomCode.changeOrientation:35
        return window.screen.width*0.7;    // > CustomCode.changeOrientation:36
        // return window.screen.height;  // > CustomCode.changeOrientation:37
        //  return window.innerHeight;  // > CustomCode.changeOrientation:38
        //  return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:39
      }  // > CustomCode.changeOrientation:40
        // > CustomCode.changeOrientation:41
      else { // browser Android and PC  // > CustomCode.changeOrientation:42
        // return Math.min(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrientation:43
        // alert("browser Android and PC");  // > CustomCode.changeOrientation:44
        return window.innerHeight*0.7;  // > CustomCode.changeOrientation:45
      }  // > CustomCode.changeOrientation:46
      break;  // > CustomCode.changeOrientation:47
    default:  // > CustomCode.changeOrientation:48
      this.screenOrientation = 'unknown';  // > CustomCode.changeOrientation:49
      //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.changeOrientation:50
      return window.innerHeight*0.7;  // > CustomCode.changeOrientation:51
  }  // > CustomCode.changeOrientation:52
  }  // > CustomCode.changeOrientation:53

  function calculateAngles () {  // > CustomCode.angles:1
    option = _view.comboBox.getProperty("SelectedOptions");  // array of options  // > CustomCode.angles:2
   option1d = _view.comboBox1d.getProperty("SelectedOptions");  // array of options  // > CustomCode.angles:3
  option2 = _view.comboBox2.getProperty("SelectedOptions");  // array of options  // > CustomCode.angles:4
   option2d = _view.comboBox2d.getProperty("SelectedOptions");  // array of options  // > CustomCode.angles:5
  // angle = option*2*pi/option1d; //full circle  // > CustomCode.angles:6
   if (option==1&&option1d==1){  // > CustomCode.angles:7
     angle = option*2*pi/option1d; //single piece  // > CustomCode.angles:8
  }  // > CustomCode.angles:9
  else {  // > CustomCode.angles:10
    angle = 2*pi/option1d; //single piece  // > CustomCode.angles:11
    }  // > CustomCode.angles:12
      // > CustomCode.angles:13
    // angle = option*2*pi/option1d; //full circle  // > CustomCode.angles:14
   if (option2==1&&option2d==1){  // > CustomCode.angles:15
     angle2 = option2*2*pi/option2d; //single piece  // > CustomCode.angles:16
  }  // > CustomCode.angles:17
  else {  // > CustomCode.angles:18
    angle2 = 2*pi/option2d; //single piece  // > CustomCode.angles:19
    }  // > CustomCode.angles:20
  }  // > CustomCode.angles:21
  function calculatePoints1() {  // > CustomCode.angles:22
    var tx = px.slice();  // > CustomCode.angles:23
    var ty = py.slice();  // > CustomCode.angles:24
    for (var i=0; i<nangle+1 /* Iterations */ ; i++) {  // > CustomCode.angles:25
  if (circleshow){  // > CustomCode.angles:26
  tx[i]=Math.cos(angle*i/nangle);  // > CustomCode.angles:27
  ty[i]=Math.sin(angle*i/nangle)  // > CustomCode.angles:28
  }  // > CustomCode.angles:29
  if (rectangleshow){ // cannot work unless convert to polygons  // > CustomCode.angles:30
   // tx[i]=2/option1d;  // > CustomCode.angles:31
      // > CustomCode.angles:32
    }  // > CustomCode.angles:33
  }  // > CustomCode.angles:34
  return [tx,ty];  // > CustomCode.angles:35
  }  // > CustomCode.angles:36
  function calculatePoints2() {  // > CustomCode.angles:37
    var tx = px2.slice();  // > CustomCode.angles:38
    var ty = py2.slice();  // > CustomCode.angles:39
  for (var i=0; i<nangle2+1 /* Iterations */ ; i++) {  // > CustomCode.angles:40
  if (circleshow){  // > CustomCode.angles:41
  tx[i]=Math.cos(angle2*i/nangle2);  // > CustomCode.angles:42
  ty[i]=Math.sin(angle2*i/nangle2)  // > CustomCode.angles:43
  }  // > CustomCode.angles:44
  }  // > CustomCode.angles:45
  return [tx,ty];  // > CustomCode.angles:46
  }  // > CustomCode.angles:47

  function changeOrientationfullscreen() {  // > CustomCode.changeOrientation 2:1
  //if(typeof parent.device != 'undefined')  // > CustomCode.changeOrientation 2:2
  //  _view.mytext.setText(parent.device.platform)  // > CustomCode.changeOrientation 2:3
  //else  // > CustomCode.changeOrientation 2:4
   // _view.mytext.setText("nada:");  // > CustomCode.changeOrientation 2:5
  // check platform for Apps  // > CustomCode.changeOrientation 2:6
  var iOSapp =  (typeof parent.device != 'undefined' && parent.device.platform == "iOS");  // > CustomCode.changeOrientation 2:7
  var Androidapp = (typeof parent.device != 'undefined' && parent.device.platform == "Android");  // > CustomCode.changeOrientation 2:8
  // check platform for web browsers  // > CustomCode.changeOrientation 2:9
  var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation 2:10
  var iPad =/iPad/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation 2:11
  var iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation 2:12
  var Android= /Android|android/i.test(navigator.userAgent);  // > CustomCode.changeOrientation 2:13
  //_view.mytext.setText(_view.mytext.getText() + "-orient:" + window.orientation + "-" + iOSapp + "-" + Androidapp);  // > CustomCode.changeOrientation 2:14
  switch (window.orientation) {  // > CustomCode.changeOrientation 2:15
    case 0:  // > CustomCode.changeOrientation 2:16
    case 180:  // > CustomCode.changeOrientation 2:17
      this.screenOrientation = 'portrait';  // > CustomCode.changeOrientation 2:18
      if (iOSapp){ // does not seems to work  // > CustomCode.changeOrientation 2:19
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation 2:20
        return window.screen.height*0.7;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation 2:21
        // return window.screen.height;  // > CustomCode.changeOrientation 2:22
        //  return window.innerHeight;  // > CustomCode.changeOrientation 2:23
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation 2:24
      }  // > CustomCode.changeOrientation 2:25
        // > CustomCode.changeOrientation 2:26
      else {  // > CustomCode.changeOrientation 2:27
        // return Math.max(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrientation 2:28
        return window.innerHeight*0.9;  // > CustomCode.changeOrientation 2:29
      }  // > CustomCode.changeOrientation 2:30
      break;  // > CustomCode.changeOrientation 2:31
    case 90:  // > CustomCode.changeOrientation 2:32
    case -90:  // > CustomCode.changeOrientation 2:33
      this.screenOrientation = 'landscape';  // > CustomCode.changeOrientation 2:34
      if (iOSapp){ // App  // > CustomCode.changeOrientation 2:35
        return window.screen.width*0.7;    // > CustomCode.changeOrientation 2:36
        // return window.screen.height;  // > CustomCode.changeOrientation 2:37
        //  return window.innerHeight;  // > CustomCode.changeOrientation 2:38
        //  return document.documentElement.clientHeight;  // > CustomCode.changeOrientation 2:39
      }  // > CustomCode.changeOrientation 2:40
        // > CustomCode.changeOrientation 2:41
      else { // browser Android and PC  // > CustomCode.changeOrientation 2:42
        // return Math.min(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrientation 2:43
        // alert("browser Android and PC");  // > CustomCode.changeOrientation 2:44
        return window.innerHeight*0.9;  // > CustomCode.changeOrientation 2:45
      }  // > CustomCode.changeOrientation 2:46
      break;  // > CustomCode.changeOrientation 2:47
    default:  // > CustomCode.changeOrientation 2:48
      this.screenOrientation = 'unknown';  // > CustomCode.changeOrientation 2:49
      //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.changeOrientation 2:50
      return window.innerHeight*0.9;  // > CustomCode.changeOrientation 2:51
  }  // > CustomCode.changeOrientation 2:52
  }  // > CustomCode.changeOrientation 2:53

  /**  // > CustomCode.Math.js:1
   * @license Fraction.js v4.0.3 09/09/2015  // > CustomCode.Math.js:2
   * http://www.xarg.org/2014/03/rational-numbers-in-javascript/  // > CustomCode.Math.js:3
   *  // > CustomCode.Math.js:4
   * Copyright (c) 2015, Robert Eisele (robert@xarg.org)  // > CustomCode.Math.js:5
   * Dual licensed under the MIT or GPL Version 2 licenses.  // > CustomCode.Math.js:6
   **/  // > CustomCode.Math.js:7
  /**  // > CustomCode.Math.js:8
   *  // > CustomCode.Math.js:9
   * This class offers the possibility to calculate fractions.  // > CustomCode.Math.js:10
   * You can pass a fraction in different formats. Either as array, as double, as string or as an integer.  // > CustomCode.Math.js:11
   *  // > CustomCode.Math.js:12
   * Array/Object form  // > CustomCode.Math.js:13
   * [ 0 => <nominator>, 1 => <denominator> ]  // > CustomCode.Math.js:14
   * [ n => <nominator>, d => <denominator> ]  // > CustomCode.Math.js:15
   *  // > CustomCode.Math.js:16
   * Integer form  // > CustomCode.Math.js:17
   * - Single integer value  // > CustomCode.Math.js:18
   *  // > CustomCode.Math.js:19
   * Double form  // > CustomCode.Math.js:20
   * - Single double value  // > CustomCode.Math.js:21
   *  // > CustomCode.Math.js:22
   * String form  // > CustomCode.Math.js:23
   * 123.456 - a simple double  // > CustomCode.Math.js:24
   * 123/456 - a string fraction  // > CustomCode.Math.js:25
   * 123.'456' - a double with repeating decimal places  // > CustomCode.Math.js:26
   * 123.(456) - synonym  // > CustomCode.Math.js:27
   * 123.45'6' - a double with repeating last place  // > CustomCode.Math.js:28
   * 123.45(6) - synonym  // > CustomCode.Math.js:29
   *  // > CustomCode.Math.js:30
   * Example:  // > CustomCode.Math.js:31
   *  // > CustomCode.Math.js:32
   * var f = new Fraction("9.4'31'");  // > CustomCode.Math.js:33
   * f.mul([-4, 3]).div(4.9);  // > CustomCode.Math.js:34
   *  // > CustomCode.Math.js:35
   */  // > CustomCode.Math.js:36
  (function (root) {  // > CustomCode.Math.js:37
    "use strict";  // > CustomCode.Math.js:38
    // Maximum search depth for cyclic rational numbers. 2000 should be more than enough.  // > CustomCode.Math.js:39
    // Example: 1/7 = 0.(142857) has 6 repeating decimal places.  // > CustomCode.Math.js:40
    // If MAX_CYCLE_LEN gets reduced, long cycles will not be detected and toString() only gets the first 10 digits  // > CustomCode.Math.js:41
    var MAX_CYCLE_LEN = 2000;  // > CustomCode.Math.js:42
    // Parsed data to avoid calling "new" all the time  // > CustomCode.Math.js:43
    var P = {  // > CustomCode.Math.js:44
      "s": 1,  // > CustomCode.Math.js:45
      "n": 0,  // > CustomCode.Math.js:46
      "d": 1  // > CustomCode.Math.js:47
    };  // > CustomCode.Math.js:48
    function createError(name) {  // > CustomCode.Math.js:49
      var errorConstructor = function () {  // > CustomCode.Math.js:50
        var temp = Error.apply(this, arguments);  // > CustomCode.Math.js:51
        temp.name = this.name = name;  // > CustomCode.Math.js:52
        this.stack = temp.stack;  // > CustomCode.Math.js:53
        this.message = temp.message;  // > CustomCode.Math.js:54
      };  // > CustomCode.Math.js:55
      var IntermediateInheritor = function () {};  // > CustomCode.Math.js:56
      IntermediateInheritor.prototype = Error.prototype;  // > CustomCode.Math.js:57
      errorConstructor.prototype = new IntermediateInheritor();  // > CustomCode.Math.js:58
      return errorConstructor;  // > CustomCode.Math.js:59
    }  // > CustomCode.Math.js:60
    var DivisionByZero = Fraction['DivisionByZero'] = createError('DivisionByZero');  // > CustomCode.Math.js:61
    var InvalidParameter = Fraction['InvalidParameter'] = createError('InvalidParameter');  // > CustomCode.Math.js:62
    function assign(n, s) {  // > CustomCode.Math.js:63
      if (isNaN(n = parseInt(n, 10))) {  // > CustomCode.Math.js:64
        throwInvalidParam();  // > CustomCode.Math.js:65
      }  // > CustomCode.Math.js:66
      return n * s;  // > CustomCode.Math.js:67
    }  // > CustomCode.Math.js:68
    function throwInvalidParam() {  // > CustomCode.Math.js:69
      throw new InvalidParameter();  // > CustomCode.Math.js:70
    }  // > CustomCode.Math.js:71
    var parse = function (p1, p2) {  // > CustomCode.Math.js:72
      var n = 0, d = 1, s = 1;  // > CustomCode.Math.js:73
      var v = 0, w = 0, x = 0, y = 1, z = 1;  // > CustomCode.Math.js:74
      var A = 0, B = 1;  // > CustomCode.Math.js:75
      var C = 1, D = 1;  // > CustomCode.Math.js:76
      var N = 10000000;  // > CustomCode.Math.js:77
      var M;  // > CustomCode.Math.js:78
      if (p1 === undefined || p1 === null) {  // > CustomCode.Math.js:79
        /* void */  // > CustomCode.Math.js:80
      } else if (p2 !== undefined) {  // > CustomCode.Math.js:81
        n = p1;  // > CustomCode.Math.js:82
        d = p2;  // > CustomCode.Math.js:83
        s = n * d;  // > CustomCode.Math.js:84
      } else  // > CustomCode.Math.js:85
        switch (typeof p1) {  // > CustomCode.Math.js:86
          case "object":  // > CustomCode.Math.js:87
          {  // > CustomCode.Math.js:88
            if ("d" in p1 && "n" in p1) {  // > CustomCode.Math.js:89
              n = p1["n"];  // > CustomCode.Math.js:90
              d = p1["d"];  // > CustomCode.Math.js:91
              if ("s" in p1)  // > CustomCode.Math.js:92
                n*= p1["s"];  // > CustomCode.Math.js:93
            } else if (0 in p1) {  // > CustomCode.Math.js:94
              n = p1[0];  // > CustomCode.Math.js:95
              if (1 in p1)  // > CustomCode.Math.js:96
                d = p1[1];  // > CustomCode.Math.js:97
            } else {  // > CustomCode.Math.js:98
              throwInvalidParam();  // > CustomCode.Math.js:99
            }  // > CustomCode.Math.js:100
            s = n * d;  // > CustomCode.Math.js:101
            break;  // > CustomCode.Math.js:102
          }  // > CustomCode.Math.js:103
          case "number":  // > CustomCode.Math.js:104
          {  // > CustomCode.Math.js:105
            if (p1 < 0) {  // > CustomCode.Math.js:106
              s = p1;  // > CustomCode.Math.js:107
              p1 = -p1;  // > CustomCode.Math.js:108
            }  // > CustomCode.Math.js:109
            if (p1 % 1 === 0) {  // > CustomCode.Math.js:110
              n = p1;  // > CustomCode.Math.js:111
            } else if (p1 > 0) { // check for != 0, scale would become NaN (log(0)), which converges really slow  // > CustomCode.Math.js:112
              if (p1 >= 1) {  // > CustomCode.Math.js:113
                z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));  // > CustomCode.Math.js:114
                p1/= z;  // > CustomCode.Math.js:115
              }  // > CustomCode.Math.js:116
              // Using Farey Sequences  // > CustomCode.Math.js:117
              // http://www.johndcook.com/blog/2010/10/20/best-rational-approximation/  // > CustomCode.Math.js:118
              while (B <= N && D <= N) {  // > CustomCode.Math.js:119
                M = (A + C) / (B + D);  // > CustomCode.Math.js:120
                if (p1 === M) {  // > CustomCode.Math.js:121
                  if (B + D <= N) {  // > CustomCode.Math.js:122
                    n = A + C;  // > CustomCode.Math.js:123
                    d = B + D;  // > CustomCode.Math.js:124
                  } else if (D > B) {  // > CustomCode.Math.js:125
                    n = C;  // > CustomCode.Math.js:126
                    d = D;  // > CustomCode.Math.js:127
                  } else {  // > CustomCode.Math.js:128
                    n = A;  // > CustomCode.Math.js:129
                    d = B;  // > CustomCode.Math.js:130
                  }  // > CustomCode.Math.js:131
                  break;  // > CustomCode.Math.js:132
                } else {  // > CustomCode.Math.js:133
                  if (p1 > M) {  // > CustomCode.Math.js:134
                    A+= C;  // > CustomCode.Math.js:135
                    B+= D;  // > CustomCode.Math.js:136
                  } else {  // > CustomCode.Math.js:137
                    C+= A;  // > CustomCode.Math.js:138
                    D+= B;  // > CustomCode.Math.js:139
                  }  // > CustomCode.Math.js:140
                  if (B > N) {  // > CustomCode.Math.js:141
                    n = C;  // > CustomCode.Math.js:142
                    d = D;  // > CustomCode.Math.js:143
                  } else {  // > CustomCode.Math.js:144
                    n = A;  // > CustomCode.Math.js:145
                    d = B;  // > CustomCode.Math.js:146
                  }  // > CustomCode.Math.js:147
                }  // > CustomCode.Math.js:148
              }  // > CustomCode.Math.js:149
              n*= z;  // > CustomCode.Math.js:150
            } else if (isNaN(p1) || isNaN(p2)) {  // > CustomCode.Math.js:151
              d = n = NaN;  // > CustomCode.Math.js:152
            }  // > CustomCode.Math.js:153
            break;  // > CustomCode.Math.js:154
          }  // > CustomCode.Math.js:155
          case "string":  // > CustomCode.Math.js:156
          {  // > CustomCode.Math.js:157
            B = p1.match(/\d+|./g);  // > CustomCode.Math.js:158
              // > CustomCode.Math.js:159
            if (B === null)  // > CustomCode.Math.js:160
              throwInvalidParam();  // > CustomCode.Math.js:161
            if (B[A] === '-') {// Check for minus sign at the beginning  // > CustomCode.Math.js:162
              s = -1;  // > CustomCode.Math.js:163
              A++;  // > CustomCode.Math.js:164
            } else if (B[A] === '+') {// Check for plus sign at the beginning  // > CustomCode.Math.js:165
              A++;  // > CustomCode.Math.js:166
            }  // > CustomCode.Math.js:167
            if (B.length === A + 1) { // Check if it's just a simple number "1234"  // > CustomCode.Math.js:168
              w = assign(B[A++], s);  // > CustomCode.Math.js:169
            } else if (B[A + 1] === '.' || B[A] === '.') { // Check if it's a decimal number  // > CustomCode.Math.js:170
              if (B[A] !== '.') { // Handle 0.5 and .5  // > CustomCode.Math.js:171
                v = assign(B[A++], s);  // > CustomCode.Math.js:172
              }  // > CustomCode.Math.js:173
              A++;  // > CustomCode.Math.js:174
              // Check for decimal places  // > CustomCode.Math.js:175
              if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === "'" && B[A + 3] === "'") {  // > CustomCode.Math.js:176
                w = assign(B[A], s);  // > CustomCode.Math.js:177
                y = Math.pow(10, B[A].length);  // > CustomCode.Math.js:178
                A++;  // > CustomCode.Math.js:179
              }  // > CustomCode.Math.js:180
              // Check for repeating places  // > CustomCode.Math.js:181
              if (B[A] === '(' && B[A + 2] === ')' || B[A] === "'" && B[A + 2] === "'") {  // > CustomCode.Math.js:182
                x = assign(B[A + 1], s);  // > CustomCode.Math.js:183
                z = Math.pow(10, B[A + 1].length) - 1;  // > CustomCode.Math.js:184
                A+= 3;  // > CustomCode.Math.js:185
              }  // > CustomCode.Math.js:186
            } else if (B[A + 1] === '/' || B[A + 1] === ':') { // Check for a simple fraction "123/456" or "123:456"  // > CustomCode.Math.js:187
              w = assign(B[A], s);  // > CustomCode.Math.js:188
              y = assign(B[A + 2], 1);  // > CustomCode.Math.js:189
              A+= 3;  // > CustomCode.Math.js:190
            } else if (B[A + 3] === '/' && B[A + 1] === ' ') { // Check for a complex fraction "123 1/2"  // > CustomCode.Math.js:191
              v = assign(B[A], s);  // > CustomCode.Math.js:192
              w = assign(B[A + 2], s);  // > CustomCode.Math.js:193
              y = assign(B[A + 4], 1);  // > CustomCode.Math.js:194
              A+= 5;  // > CustomCode.Math.js:195
            }  // > CustomCode.Math.js:196
            if (B.length <= A) { // Check for more tokens on the stack  // > CustomCode.Math.js:197
              d = y * z;  // > CustomCode.Math.js:198
              s = /* void */  // > CustomCode.Math.js:199
                      n = x + d * v + z * w;  // > CustomCode.Math.js:200
              break;  // > CustomCode.Math.js:201
            }  // > CustomCode.Math.js:202
            /* Fall through on error */  // > CustomCode.Math.js:203
          }  // > CustomCode.Math.js:204
          default:  // > CustomCode.Math.js:205
            throwInvalidParam();  // > CustomCode.Math.js:206
        }  // > CustomCode.Math.js:207
      if (d === 0) {  // > CustomCode.Math.js:208
        throw new DivisionByZero();  // > CustomCode.Math.js:209
      }  // > CustomCode.Math.js:210
      P["s"] = s < 0 ? -1 : 1;  // > CustomCode.Math.js:211
      P["n"] = Math.abs(n);  // > CustomCode.Math.js:212
      P["d"] = Math.abs(d);  // > CustomCode.Math.js:213
    };  // > CustomCode.Math.js:214
    var modpow = function (b, e, m) {  // > CustomCode.Math.js:215
      for (var r = 1; e > 0; b = (b * b) % m, e >>= 1) {  // > CustomCode.Math.js:216
        if (e & 1) {  // > CustomCode.Math.js:217
          r = (r * b) % m;  // > CustomCode.Math.js:218
        }  // > CustomCode.Math.js:219
      }  // > CustomCode.Math.js:220
      return r;  // > CustomCode.Math.js:221
    };  // > CustomCode.Math.js:222
    var cycleLen = function (n, d) {  // > CustomCode.Math.js:223
      for (; d % 2 === 0;  // > CustomCode.Math.js:224
              d/= 2) {}  // > CustomCode.Math.js:225
      for (; d % 5 === 0;  // > CustomCode.Math.js:226
              d/= 5) {}  // > CustomCode.Math.js:227
      if (d === 1) // Catch non-cyclic numbers  // > CustomCode.Math.js:228
        return 0;  // > CustomCode.Math.js:229
      // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:  // > CustomCode.Math.js:230
      // 10^(d-1) % d == 1  // > CustomCode.Math.js:231
      // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone,  // > CustomCode.Math.js:232
      // as we want to translate the numbers to strings.  // > CustomCode.Math.js:233
      var rem = 10 % d;  // > CustomCode.Math.js:234
      for (var t = 1; rem !== 1; t++) {  // > CustomCode.Math.js:235
        rem = rem * 10 % d;  // > CustomCode.Math.js:236
        if (t > MAX_CYCLE_LEN)  // > CustomCode.Math.js:237
          return 0; // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`  // > CustomCode.Math.js:238
      }  // > CustomCode.Math.js:239
      return t;  // > CustomCode.Math.js:240
    };  // > CustomCode.Math.js:241
    var cycleStart = function (n, d, len) {  // > CustomCode.Math.js:242
      var rem1 = 1;  // > CustomCode.Math.js:243
      var rem2 = modpow(10, len, d);  // > CustomCode.Math.js:244
      for (var t = 0; t < 300; t++) { // s < ~log10(Number.MAX_VALUE)  // > CustomCode.Math.js:245
        // Solve 10^s == 10^(s+t) (mod d)  // > CustomCode.Math.js:246
        if (rem1 === rem2)  // > CustomCode.Math.js:247
          return t;  // > CustomCode.Math.js:248
        rem1 = rem1 * 10 % d;  // > CustomCode.Math.js:249
        rem2 = rem2 * 10 % d;  // > CustomCode.Math.js:250
      }  // > CustomCode.Math.js:251
      return 0;  // > CustomCode.Math.js:252
    };  // > CustomCode.Math.js:253
    var gcd = function (a, b) {  // > CustomCode.Math.js:254
      if (!a) return b;  // > CustomCode.Math.js:255
      if (!b) return a;  // > CustomCode.Math.js:256
      while (1) {  // > CustomCode.Math.js:257
        a%= b;  // > CustomCode.Math.js:258
        if (!a) return b;  // > CustomCode.Math.js:259
        b%= a;  // > CustomCode.Math.js:260
        if (!b) return a;  // > CustomCode.Math.js:261
      }  // > CustomCode.Math.js:262
    };  // > CustomCode.Math.js:263
    /**  // > CustomCode.Math.js:264
     * Module constructor  // > CustomCode.Math.js:265
     *  // > CustomCode.Math.js:266
     * @constructor  // > CustomCode.Math.js:267
     * @param {number|Fraction} a  // > CustomCode.Math.js:268
     * @param {number=} b  // > CustomCode.Math.js:269
     */  // > CustomCode.Math.js:270
    function Fraction(a, b) {  // > CustomCode.Math.js:271
      if (!(this instanceof Fraction)) {  // > CustomCode.Math.js:272
        return new Fraction(a, b);  // > CustomCode.Math.js:273
      }  // > CustomCode.Math.js:274
      parse(a, b);  // > CustomCode.Math.js:275
      if (Fraction['REDUCE']) {  // > CustomCode.Math.js:276
        a = gcd(P["d"], P["n"]); // Abuse a  // > CustomCode.Math.js:277
      } else {  // > CustomCode.Math.js:278
        a = 1;  // > CustomCode.Math.js:279
      }  // > CustomCode.Math.js:280
      this["s"] = P["s"];  // > CustomCode.Math.js:281
      this["n"] = P["n"] / a;  // > CustomCode.Math.js:282
      this["d"] = P["d"] / a;  // > CustomCode.Math.js:283
    }  // > CustomCode.Math.js:284
    /**  // > CustomCode.Math.js:285
     * Boolean global variable to be able to disable automatic reduction of the fraction  // > CustomCode.Math.js:286
     *  // > CustomCode.Math.js:287
     */  // > CustomCode.Math.js:288
    Fraction['REDUCE'] = 1;  // > CustomCode.Math.js:289
    Fraction.prototype = {  // > CustomCode.Math.js:290
      "s": 1,  // > CustomCode.Math.js:291
      "n": 0,  // > CustomCode.Math.js:292
      "d": 1,  // > CustomCode.Math.js:293
      /**  // > CustomCode.Math.js:294
       * Calculates the absolute value  // > CustomCode.Math.js:295
       *  // > CustomCode.Math.js:296
       * Ex: new Fraction(-4).abs() => 4  // > CustomCode.Math.js:297
       **/  // > CustomCode.Math.js:298
      "abs": function () {  // > CustomCode.Math.js:299
        return new Fraction(this["n"], this["d"]);  // > CustomCode.Math.js:300
      },  // > CustomCode.Math.js:301
      /**  // > CustomCode.Math.js:302
       * Inverts the sign of the current fraction  // > CustomCode.Math.js:303
       *  // > CustomCode.Math.js:304
       * Ex: new Fraction(-4).neg() => 4  // > CustomCode.Math.js:305
       **/  // > CustomCode.Math.js:306
      "neg": function () {  // > CustomCode.Math.js:307
        return new Fraction(-this["s"] * this["n"], this["d"]);  // > CustomCode.Math.js:308
      },  // > CustomCode.Math.js:309
      /**  // > CustomCode.Math.js:310
       * Adds two rational numbers  // > CustomCode.Math.js:311
       *  // > CustomCode.Math.js:312
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30  // > CustomCode.Math.js:313
       **/  // > CustomCode.Math.js:314
      "add": function (a, b) {  // > CustomCode.Math.js:315
        parse(a, b);  // > CustomCode.Math.js:316
        return new Fraction(  // > CustomCode.Math.js:317
                this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"],  // > CustomCode.Math.js:318
                this["d"] * P["d"]  // > CustomCode.Math.js:319
                );  // > CustomCode.Math.js:320
      },  // > CustomCode.Math.js:321
      /**  // > CustomCode.Math.js:322
       * Subtracts two rational numbers  // > CustomCode.Math.js:323
       *  // > CustomCode.Math.js:324
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30  // > CustomCode.Math.js:325
       **/  // > CustomCode.Math.js:326
      "sub": function (a, b) {  // > CustomCode.Math.js:327
        parse(a, b);  // > CustomCode.Math.js:328
        return new Fraction(  // > CustomCode.Math.js:329
                this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"],  // > CustomCode.Math.js:330
                this["d"] * P["d"]  // > CustomCode.Math.js:331
                );  // > CustomCode.Math.js:332
      },  // > CustomCode.Math.js:333
      /**  // > CustomCode.Math.js:334
       * Multiplies two rational numbers  // > CustomCode.Math.js:335
       *  // > CustomCode.Math.js:336
       * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111  // > CustomCode.Math.js:337
       **/  // > CustomCode.Math.js:338
      "mul": function (a, b) {  // > CustomCode.Math.js:339
        parse(a, b);  // > CustomCode.Math.js:340
        return new Fraction(  // > CustomCode.Math.js:341
                this["s"] * P["s"] * this["n"] * P["n"],  // > CustomCode.Math.js:342
                this["d"] * P["d"]  // > CustomCode.Math.js:343
                );  // > CustomCode.Math.js:344
      },  // > CustomCode.Math.js:345
      /**  // > CustomCode.Math.js:346
       * Divides two rational numbers  // > CustomCode.Math.js:347
       *  // > CustomCode.Math.js:348
       * Ex: new Fraction("-17.(345)").inverse().div(3)  // > CustomCode.Math.js:349
       **/  // > CustomCode.Math.js:350
      "div": function (a, b) {  // > CustomCode.Math.js:351
        parse(a, b);  // > CustomCode.Math.js:352
        return new Fraction(  // > CustomCode.Math.js:353
                this["s"] * P["s"] * this["n"] * P["d"],  // > CustomCode.Math.js:354
                this["d"] * P["n"]  // > CustomCode.Math.js:355
                );  // > CustomCode.Math.js:356
      },  // > CustomCode.Math.js:357
      /**  // > CustomCode.Math.js:358
       * Clones the actual object  // > CustomCode.Math.js:359
       *  // > CustomCode.Math.js:360
       * Ex: new Fraction("-17.(345)").clone()  // > CustomCode.Math.js:361
       **/  // > CustomCode.Math.js:362
      "clone": function () {  // > CustomCode.Math.js:363
        return new Fraction(this);  // > CustomCode.Math.js:364
      },  // > CustomCode.Math.js:365
      /**  // > CustomCode.Math.js:366
       * Calculates the modulo of two rational numbers - a more precise fmod  // > CustomCode.Math.js:367
       *  // > CustomCode.Math.js:368
       * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)  // > CustomCode.Math.js:369
       **/  // > CustomCode.Math.js:370
      "mod": function (a, b) {  // > CustomCode.Math.js:371
        if (isNaN(this['n']) || isNaN(this['d'])) {  // > CustomCode.Math.js:372
          return new Fraction(NaN);  // > CustomCode.Math.js:373
        }  // > CustomCode.Math.js:374
        if (a === undefined) {  // > CustomCode.Math.js:375
          return new Fraction(this["s"] * this["n"] % this["d"], 1);  // > CustomCode.Math.js:376
        }  // > CustomCode.Math.js:377
        parse(a, b);  // > CustomCode.Math.js:378
        if (0 === P["n"] && 0 === this["d"]) {  // > CustomCode.Math.js:379
          Fraction(0, 0); // Throw DivisionByZero  // > CustomCode.Math.js:380
        }  // > CustomCode.Math.js:381
        /*  // > CustomCode.Math.js:382
         * First silly attempt, kinda slow  // > CustomCode.Math.js:383
         *  // > CustomCode.Math.js:384
         return that["sub"]({  // > CustomCode.Math.js:385
         "n": num["n"] * Math.floor((this.n / this.d) / (num.n / num.d)),  // > CustomCode.Math.js:386
         "d": num["d"],  // > CustomCode.Math.js:387
         "s": this["s"]  // > CustomCode.Math.js:388
         });*/  // > CustomCode.Math.js:389
        /*  // > CustomCode.Math.js:390
         * New attempt: a1 / b1 = a2 / b2 * q + r  // > CustomCode.Math.js:391
         * => b2 * a1 = a2 * b1 * q + b1 * b2 * r  // > CustomCode.Math.js:392
         * => (b2 * a1 % a2 * b1) / (b1 * b2)  // > CustomCode.Math.js:393
         */  // > CustomCode.Math.js:394
        return new Fraction(  // > CustomCode.Math.js:395
                (this["s"] * P["d"] * this["n"]) % (P["n"] * this["d"]),  // > CustomCode.Math.js:396
                P["d"] * this["d"]  // > CustomCode.Math.js:397
                );  // > CustomCode.Math.js:398
      },  // > CustomCode.Math.js:399
      /**  // > CustomCode.Math.js:400
       * Calculates the fractional gcd of two rational numbers  // > CustomCode.Math.js:401
       *  // > CustomCode.Math.js:402
       * Ex: new Fraction(5,8).gcd(3,7) => 1/56  // > CustomCode.Math.js:403
       */  // > CustomCode.Math.js:404
      "gcd": function (a, b) {  // > CustomCode.Math.js:405
        parse(a, b);  // > CustomCode.Math.js:406
        // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)  // > CustomCode.Math.js:407
        return new Fraction(gcd(P["n"], this["n"]), P["d"] * this["d"] / gcd(P["d"], this["d"]));  // > CustomCode.Math.js:408
      },  // > CustomCode.Math.js:409
      /**  // > CustomCode.Math.js:410
       * Calculates the fractional lcm of two rational numbers  // > CustomCode.Math.js:411
       *  // > CustomCode.Math.js:412
       * Ex: new Fraction(5,8).lcm(3,7) => 15  // > CustomCode.Math.js:413
       */  // > CustomCode.Math.js:414
      "lcm": function (a, b) {  // > CustomCode.Math.js:415
        parse(a, b);  // > CustomCode.Math.js:416
        // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)  // > CustomCode.Math.js:417
        if (P["n"] === 0 && this["n"] === 0) {  // > CustomCode.Math.js:418
          return new Fraction;  // > CustomCode.Math.js:419
        }  // > CustomCode.Math.js:420
        return new Fraction(P["n"] * this["n"] / gcd(P["n"], this["n"]), gcd(P["d"], this["d"]));  // > CustomCode.Math.js:421
      },  // > CustomCode.Math.js:422
      /**  // > CustomCode.Math.js:423
       * Calculates the ceil of a rational number  // > CustomCode.Math.js:424
       *  // > CustomCode.Math.js:425
       * Ex: new Fraction('4.(3)').ceil() => (5 / 1)  // > CustomCode.Math.js:426
       **/  // > CustomCode.Math.js:427
      "ceil": function (places) {  // > CustomCode.Math.js:428
        places = Math.pow(10, places || 0);  // > CustomCode.Math.js:429
        if (isNaN(this["n"]) || isNaN(this["d"])) {  // > CustomCode.Math.js:430
          return new Fraction(NaN);  // > CustomCode.Math.js:431
        }  // > CustomCode.Math.js:432
        return new Fraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);  // > CustomCode.Math.js:433
      },  // > CustomCode.Math.js:434
      /**  // > CustomCode.Math.js:435
       * Calculates the floor of a rational number  // > CustomCode.Math.js:436
       *  // > CustomCode.Math.js:437
       * Ex: new Fraction('4.(3)').floor() => (4 / 1)  // > CustomCode.Math.js:438
       **/  // > CustomCode.Math.js:439
      "floor": function (places) {  // > CustomCode.Math.js:440
        places = Math.pow(10, places || 0);  // > CustomCode.Math.js:441
        if (isNaN(this["n"]) || isNaN(this["d"])) {  // > CustomCode.Math.js:442
          return new Fraction(NaN);  // > CustomCode.Math.js:443
        }  // > CustomCode.Math.js:444
        return new Fraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);  // > CustomCode.Math.js:445
      },  // > CustomCode.Math.js:446
      /**  // > CustomCode.Math.js:447
       * Rounds a rational numbers  // > CustomCode.Math.js:448
       *  // > CustomCode.Math.js:449
       * Ex: new Fraction('4.(3)').round() => (4 / 1)  // > CustomCode.Math.js:450
       **/  // > CustomCode.Math.js:451
      "round": function (places) {  // > CustomCode.Math.js:452
        places = Math.pow(10, places || 0);  // > CustomCode.Math.js:453
        if (isNaN(this["n"]) || isNaN(this["d"])) {  // > CustomCode.Math.js:454
          return new Fraction(NaN);  // > CustomCode.Math.js:455
        }  // > CustomCode.Math.js:456
        return new Fraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);  // > CustomCode.Math.js:457
      },  // > CustomCode.Math.js:458
      /**  // > CustomCode.Math.js:459
       * Gets the inverse of the fraction, means numerator and denumerator are exchanged  // > CustomCode.Math.js:460
       *  // > CustomCode.Math.js:461
       * Ex: new Fraction([-3, 4]).inverse() => -4 / 3  // > CustomCode.Math.js:462
       **/  // > CustomCode.Math.js:463
      "inverse": function () {  // > CustomCode.Math.js:464
        return new Fraction(this["s"] * this["d"], this["n"]);  // > CustomCode.Math.js:465
      },  // > CustomCode.Math.js:466
      /**  // > CustomCode.Math.js:467
       * Calculates the fraction to some integer exponent  // > CustomCode.Math.js:468
       *  // > CustomCode.Math.js:469
       * Ex: new Fraction(-1,2).pow(-3) => -8  // > CustomCode.Math.js:470
       */  // > CustomCode.Math.js:471
      "pow": function (m) {  // > CustomCode.Math.js:472
        if (m < 0) {  // > CustomCode.Math.js:473
          return new Fraction(Math.pow(this['s'] * this["d"], -m), Math.pow(this["n"], -m));  // > CustomCode.Math.js:474
        } else {  // > CustomCode.Math.js:475
          return new Fraction(Math.pow(this['s'] * this["n"], m), Math.pow(this["d"], m));  // > CustomCode.Math.js:476
        }  // > CustomCode.Math.js:477
      },  // > CustomCode.Math.js:478
      /**  // > CustomCode.Math.js:479
       * Check if two rational numbers are the same  // > CustomCode.Math.js:480
       *  // > CustomCode.Math.js:481
       * Ex: new Fraction(19.6).equals([98, 5]);  // > CustomCode.Math.js:482
       **/  // > CustomCode.Math.js:483
      "equals": function (a, b) {  // > CustomCode.Math.js:484
        parse(a, b);  // > CustomCode.Math.js:485
        return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"]; // Same as compare() === 0  // > CustomCode.Math.js:486
      },  // > CustomCode.Math.js:487
      /**  // > CustomCode.Math.js:488
       * Check if two rational numbers are the same  // > CustomCode.Math.js:489
       *  // > CustomCode.Math.js:490
       * Ex: new Fraction(19.6).equals([98, 5]);  // > CustomCode.Math.js:491
       **/  // > CustomCode.Math.js:492
      "compare": function (a, b) {  // > CustomCode.Math.js:493
        parse(a, b);  // > CustomCode.Math.js:494
        var t = (this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"]);  // > CustomCode.Math.js:495
        return (0 < t) - (t < 0);  // > CustomCode.Math.js:496
      },  // > CustomCode.Math.js:497
      /**  // > CustomCode.Math.js:498
       * Check if two rational numbers are divisible  // > CustomCode.Math.js:499
       *  // > CustomCode.Math.js:500
       * Ex: new Fraction(19.6).divisible(1.5);  // > CustomCode.Math.js:501
       */  // > CustomCode.Math.js:502
      "divisible": function (a, b) {  // > CustomCode.Math.js:503
        parse(a, b);  // > CustomCode.Math.js:504
        return !(!(P["n"] * this["d"]) || ((this["n"] * P["d"]) % (P["n"] * this["d"])));  // > CustomCode.Math.js:505
      },  // > CustomCode.Math.js:506
      /**  // > CustomCode.Math.js:507
       * Returns a decimal representation of the fraction  // > CustomCode.Math.js:508
       *  // > CustomCode.Math.js:509
       * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183  // > CustomCode.Math.js:510
       **/  // > CustomCode.Math.js:511
      'valueOf': function () {  // > CustomCode.Math.js:512
        return this["s"] * this["n"] / this["d"];  // > CustomCode.Math.js:513
      },  // > CustomCode.Math.js:514
      /**  // > CustomCode.Math.js:515
       * Returns a string-fraction representation of a Fraction object  // > CustomCode.Math.js:516
       *  // > CustomCode.Math.js:517
       * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"  // > CustomCode.Math.js:518
       **/  // > CustomCode.Math.js:519
      'toFraction': function (excludeWhole) {  // > CustomCode.Math.js:520
        var whole, str = "";  // > CustomCode.Math.js:521
        var n = this["n"];  // > CustomCode.Math.js:522
        var d = this["d"];  // > CustomCode.Math.js:523
        if (this["s"] < 0) {  // > CustomCode.Math.js:524
          str+= '-';  // > CustomCode.Math.js:525
        }  // > CustomCode.Math.js:526
        if (d === 1) {  // > CustomCode.Math.js:527
          str+= n;  // > CustomCode.Math.js:528
        } else {  // > CustomCode.Math.js:529
          if (excludeWhole && (whole = Math.floor(n / d)) > 0) {  // > CustomCode.Math.js:530
            str+= whole;  // > CustomCode.Math.js:531
            str+= " ";  // > CustomCode.Math.js:532
            n%= d;  // > CustomCode.Math.js:533
          }  // > CustomCode.Math.js:534
          str+= n;  // > CustomCode.Math.js:535
          str+= '/';  // > CustomCode.Math.js:536
          str+= d;  // > CustomCode.Math.js:537
        }  // > CustomCode.Math.js:538
        return str;  // > CustomCode.Math.js:539
      },  // > CustomCode.Math.js:540
      /**  // > CustomCode.Math.js:541
       * Returns a latex representation of a Fraction object  // > CustomCode.Math.js:542
       *  // > CustomCode.Math.js:543
       * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"  // > CustomCode.Math.js:544
       **/  // > CustomCode.Math.js:545
      'toLatex': function (excludeWhole) {  // > CustomCode.Math.js:546
        var whole, str = "";  // > CustomCode.Math.js:547
        var n = this["n"];  // > CustomCode.Math.js:548
        var d = this["d"];  // > CustomCode.Math.js:549
        if (this["s"] < 0) {  // > CustomCode.Math.js:550
          str+= '-';  // > CustomCode.Math.js:551
        }  // > CustomCode.Math.js:552
        if (d === 1) {  // > CustomCode.Math.js:553
          str+= n;  // > CustomCode.Math.js:554
        } else {  // > CustomCode.Math.js:555
          if (excludeWhole && (whole = Math.floor(n / d)) > 0) {  // > CustomCode.Math.js:556
            str+= whole;  // > CustomCode.Math.js:557
            n%= d;  // > CustomCode.Math.js:558
          }  // > CustomCode.Math.js:559
          str+= "\\frac{";  // > CustomCode.Math.js:560
          str+= n;  // > CustomCode.Math.js:561
          str+= '}{';  // > CustomCode.Math.js:562
          str+= d;  // > CustomCode.Math.js:563
          str+= '}';  // > CustomCode.Math.js:564
        }  // > CustomCode.Math.js:565
        return str;  // > CustomCode.Math.js:566
      },  // > CustomCode.Math.js:567
      /**  // > CustomCode.Math.js:568
       * Returns an array of continued fraction elements  // > CustomCode.Math.js:569
       *  // > CustomCode.Math.js:570
       * Ex: new Fraction("7/8").toContinued() => [0,1,7]  // > CustomCode.Math.js:571
       */  // > CustomCode.Math.js:572
      'toContinued': function () {  // > CustomCode.Math.js:573
        var t;  // > CustomCode.Math.js:574
        var a = this['n'];  // > CustomCode.Math.js:575
        var b = this['d'];  // > CustomCode.Math.js:576
        var res = [];  // > CustomCode.Math.js:577
        do {  // > CustomCode.Math.js:578
          res.push(Math.floor(a / b));  // > CustomCode.Math.js:579
          t = a % b;  // > CustomCode.Math.js:580
          a = b;  // > CustomCode.Math.js:581
          b = t;  // > CustomCode.Math.js:582
        } while (a !== 1);  // > CustomCode.Math.js:583
        return res;  // > CustomCode.Math.js:584
      },  // > CustomCode.Math.js:585
      /**  // > CustomCode.Math.js:586
       * Creates a string representation of a fraction with all digits  // > CustomCode.Math.js:587
       *  // > CustomCode.Math.js:588
       * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"  // > CustomCode.Math.js:589
       **/  // > CustomCode.Math.js:590
      'toString': function () {  // > CustomCode.Math.js:591
        var g;  // > CustomCode.Math.js:592
        var N = this["n"];  // > CustomCode.Math.js:593
        var D = this["d"];  // > CustomCode.Math.js:594
        if (isNaN(N) || isNaN(D)) {  // > CustomCode.Math.js:595
          return "NaN";  // > CustomCode.Math.js:596
        }  // > CustomCode.Math.js:597
        if (!Fraction['REDUCE']) {  // > CustomCode.Math.js:598
          g = gcd(N, D);  // > CustomCode.Math.js:599
          N/= g;  // > CustomCode.Math.js:600
          D/= g;  // > CustomCode.Math.js:601
        }  // > CustomCode.Math.js:602
        var dec = 15; // 15 = decimal places when no repitation  // > CustomCode.Math.js:603
        var cycLen = cycleLen(N, D); // Cycle length  // > CustomCode.Math.js:604
        var cycOff = cycleStart(N, D, cycLen); // Cycle start  // > CustomCode.Math.js:605
        var str = this['s'] === -1 ? "-" : "";  // > CustomCode.Math.js:606
        str+= N / D | 0;  // > CustomCode.Math.js:607
        N%= D;  // > CustomCode.Math.js:608
        N*= 10;  // > CustomCode.Math.js:609
        if (N)  // > CustomCode.Math.js:610
          str+= ".";  // > CustomCode.Math.js:611
        if (cycLen) {  // > CustomCode.Math.js:612
          for (var i = cycOff; i--; ) {  // > CustomCode.Math.js:613
            str+= N / D | 0;  // > CustomCode.Math.js:614
            N%= D;  // > CustomCode.Math.js:615
            N*= 10;  // > CustomCode.Math.js:616
          }  // > CustomCode.Math.js:617
          str+= "(";  // > CustomCode.Math.js:618
          for (var i = cycLen; i--; ) {  // > CustomCode.Math.js:619
            str+= N / D | 0;  // > CustomCode.Math.js:620
            N%= D;  // > CustomCode.Math.js:621
            N*= 10;  // > CustomCode.Math.js:622
          }  // > CustomCode.Math.js:623
          str+= ")";  // > CustomCode.Math.js:624
        } else {  // > CustomCode.Math.js:625
          for (var i = dec; N && i--; ) {  // > CustomCode.Math.js:626
            str+= N / D | 0;  // > CustomCode.Math.js:627
            N%= D;  // > CustomCode.Math.js:628
            N*= 10;  // > CustomCode.Math.js:629
          }  // > CustomCode.Math.js:630
        }  // > CustomCode.Math.js:631
        return str;  // > CustomCode.Math.js:632
      }  // > CustomCode.Math.js:633
    };  // > CustomCode.Math.js:634
    if (typeof define === "function" && define["amd"]) {  // > CustomCode.Math.js:635
      define([], function () {  // > CustomCode.Math.js:636
        return Fraction;  // > CustomCode.Math.js:637
      });  // > CustomCode.Math.js:638
    } else if (typeof exports === "object") {  // > CustomCode.Math.js:639
      module["exports"] = Fraction;  // > CustomCode.Math.js:640
    } else {  // > CustomCode.Math.js:641
      root['Fraction'] = Fraction;  // > CustomCode.Math.js:642
    }  // > CustomCode.Math.js:643
  })(this);  // > CustomCode.Math.js:644

  _model.addToInitialization(function() {
    if (!__pagesEnabled["svg"]) return;
    var container = document.createElement('div');  // > Initialization.svg:1
    var svggradient = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>'+  // > Initialization.svg:2
      '  <radialGradient id="mygrandient" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">'+  // > Initialization.svg:3
      '    <stop offset="0%" style="stop-color:rgb(0,0,255); stop-opacity:0" />'+  // > Initialization.svg:4
      '    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />'+  // > Initialization.svg:5
      '  </radialGradient>'+  // > Initialization.svg:6
      '</defs></svg>';  // > Initialization.svg:7
    container.innerHTML = svggradient;  // > Initialization.svg:8
    document.body.appendChild(container);  // > Initialization.svg:9
    //"url(#mygrandient)"  // > Initialization.svg:10
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["undefined"]) return;
    if (angle===Math.NAN){  // > Initialization.undefined:1
      angle = 0;  // > Initialization.undefined:2
      angledeg = angle*180/pi;  // > Initialization.undefined:3
      }  // > Initialization.undefined:4
        // > Initialization.undefined:5
       //signshow  // > Initialization.undefined:6
      if (signshow==undefined){  // > Initialization.undefined:7
        signshow=true;  // > Initialization.undefined:8
        }  // > Initialization.undefined:9
        //rectangleshowh  // > Initialization.undefined:10
          if (circleshow==undefined){  // > Initialization.undefined:11
        circleshow=true;  // > Initialization.undefined:12
        }  // > Initialization.undefined:13
         if (rectangleshow==undefined){  // > Initialization.undefined:14
        rectangleshow=false;  // > Initialization.undefined:15
        }  // > Initialization.undefined:16
         if (rectangleshowh==undefined){  // > Initialization.undefined:17
        rectangleshowh=false;  // > Initialization.undefined:18
        }  // > Initialization.undefined:19
    //_view.comboBox.setSelectedOptions([option]);  // > Initialization.undefined:20
    //_view.comboBox1d.setSelectedOptions([option1d]);  // > Initialization.undefined:21
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["angle"]) return;
    for (var i=0; i<nangle+1 /* Iterations */ ; i++) {  // > Initialization.angle:1
    px[i]=Math.cos(angle*i/nangle);  // > Initialization.angle:2
    py[i]=Math.sin(angle*i/nangle)  // > Initialization.angle:3
    }  // > Initialization.angle:4
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["angle 2"]) return;
    for (var i=0; i<nangle2+1 /* Iterations */ ; i++) {  // > Initialization.angle 2:1
    px2[i]=Math.cos(angle2*i/nangle2);  // > Initialization.angle 2:2
    py2[i]=Math.sin(angle2*i/nangle2)  // > Initialization.angle 2:3
    }  // > Initialization.angle 2:4
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["axes"]) return;
    //_view.plottingPanel.getAxisX().setPosition([0,0.5]);  // > Initialization.axes:1
    //_view.plottingPanel.getTitleX().setPosition([0.95,0.5]);  // > Initialization.axes:2
    //_view.plottingPanel.getAxisY().setPosition([0.5,0]);  // > Initialization.axes:3
    //_view.plottingPanel.getTitleY().setPosition([0.5,0.9]);  // > Initialization.axes:4
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["rectangles"]) return;
    for (var i=0; i<nangle+1 /* Iterations */ ; i++) {  // > Initialization.rectangles:1
    xrect[i]=-1;  // > Initialization.rectangles:2
    yrect[i]=0;  // > Initialization.rectangles:3
    }  // > Initialization.rectangles:4
    for (var i=0; i<nangle+1 /* Iterations */ ; i++) {  // > Initialization.rectangles:5
    xrecth[i]=-1;  // > Initialization.rectangles:6
    yrecth[i]=0;  // > Initialization.rectangles:7
    }  // > Initialization.rectangles:8
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Hrectangles"]) return;
    for (var i=0; i<nangle2+1 /* Iterations */ ; i++) {  // > Initialization.Hrectangles:1
    xrect2[i]=0;  // > Initialization.Hrectangles:2
    yrect2[i]=-1;  // > Initialization.Hrectangles:3
    }  // > Initialization.Hrectangles:4
    for (var i=0; i<nangle2+1 /* Iterations */ ; i++) {  // > Initialization.Hrectangles:5
    xrect2h[i]=0;  // > Initialization.Hrectangles:6
    yrect2h[i]=-1;  // > Initialization.Hrectangles:7
    }  // > Initialization.Hrectangles:8
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["animation"]) return;
    // move to custom page InitializeAnimation  // > Initialization.animation:1
  });

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Evol Page 2"]) return;
    counter += 1;  // > Evolution.Evol Page 2:1
    interpolate(keyframes, counter);  // > Evolution.Evol Page 2:2
    console.log("frame " + counter);  // > Evolution.Evol Page 2:3
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["motion"]) return;
    if ((x2-x1)>0&&moveaway==false&&sign==1){  // > FixedRelations.motion:1
      vx1=1;  // > FixedRelations.motion:2
      vx2=0;  // > FixedRelations.motion:3
      }  // > FixedRelations.motion:4
      if ((x2-x1)<0&&moveaway==true&&sign==1){  // > FixedRelations.motion:5
      vx1=-1;  // > FixedRelations.motion:6
      vx2=0;  // > FixedRelations.motion:7
      }  // > FixedRelations.motion:8
      if ((x2-x1)>0&&moveaway==false&&sign==-1){  // > FixedRelations.motion:9
      vx1=0;  // > FixedRelations.motion:10
      vx2=-1;  // > FixedRelations.motion:11
      }  // > FixedRelations.motion:12
      if ((x2-x1)<0&&moveaway==true&&sign==-1){  // > FixedRelations.motion:13
      vx1=0;  // > FixedRelations.motion:14
      vx2=+1;  // > FixedRelations.motion:15
      }  // > FixedRelations.motion:16
        // > FixedRelations.motion:17
    //angle to show add or minus  // > FixedRelations.motion:18
    if (sign==1){  // > FixedRelations.motion:19
    transformation= angle2*option2;  // > FixedRelations.motion:20
    }  // > FixedRelations.motion:21
    else if (sign==-1){  // > FixedRelations.motion:22
    transformation= 0;  // > FixedRelations.motion:23
    }  // > FixedRelations.motion:24
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["math.js"]) return;
    // move to custom page Angles  // > FixedRelations.math.js:1
    //k = option/option1d-option2/option2d;  // > FixedRelations.math.js:2
    var first =math.fraction(""+option,""+option1d);  // > FixedRelations.math.js:3
    var second = math.fraction(""+option2,""+option2d);  // > FixedRelations.math.js:4
    if ( sign<0){ //substract  // > FixedRelations.math.js:5
    k= "= "+math.format(math.add(first,-second));  // > FixedRelations.math.js:6
    }  // > FixedRelations.math.js:7
    else if( sign>0){  // > FixedRelations.math.js:8
     k= "= "+math.format(math.add(first,second));   // > FixedRelations.math.js:9
      }  // > FixedRelations.math.js:10
    //else {  // > FixedRelations.math.js:11
    //  k="= ?"; //show nothing  // > FixedRelations.math.js:12
    //  }  // > FixedRelations.math.js:13
    //console.log(k);  // > FixedRelations.math.js:14
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["angle"]) return;
    // move to custom page Angles  // > FixedRelations.angle:1
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["color"]) return;
    for (var i=1; i<denominator+1 /* Iterations */ ; i++) {  // > FixedRelations.color:1
      /* Write the code here */  // > FixedRelations.color:2
    if (i<=option&&i<=option1d){ // solid fill  // > FixedRelations.color:3
      transparency[i]=0.5;  // > FixedRelations.color:4
      attributes[i] ={"stroke-dasharray":"16 0 16 0"};  // > FixedRelations.color:5
    // test=true;  // > FixedRelations.color:6
      }  // > FixedRelations.color:7
      else if(option==option1d){ // cases 1/1,2/2,3/3 etc  // > FixedRelations.color:8
        transparency[i]=0.5;  // > FixedRelations.color:9
      attributes[i] ={"stroke-dasharray":"16 0 16 0"};  // > FixedRelations.color:10
        }  // > FixedRelations.color:11
      else{  // > FixedRelations.color:12
    //else if (i>=option&&i<=option1d) { // no fill  // > FixedRelations.color:13
        transparency[i]=0;  // > FixedRelations.color:14
        attributes[i] ={"stroke-dasharray":"2 8 2 8"};  // > FixedRelations.color:15
     // test=false;  // > FixedRelations.color:16
        }  // > FixedRelations.color:17
        // > FixedRelations.color:18
    fillcolor1="rgba(255,0,0,"+transparency[1]+")";  // > FixedRelations.color:19
    fillcolor2="rgba(255,0,0,"+transparency[2]+")";  // > FixedRelations.color:20
    fillcolor3="rgba(255,0,0,"+transparency[3]+")";  // > FixedRelations.color:21
    fillcolor4="rgba(255,0,0,"+transparency[4]+")";  // > FixedRelations.color:22
    fillcolor5="rgba(255,0,0,"+transparency[5]+")";  // > FixedRelations.color:23
    fillcolor6="rgba(255,0,0,"+transparency[6]+")";  // > FixedRelations.color:24
    fillcolor7="rgba(255,0,0,"+transparency[7]+")";  // > FixedRelations.color:25
    fillcolor8="rgba(255,0,0,"+transparency[8]+")";  // > FixedRelations.color:26
    fillcolor9="rgba(255,0,0,"+transparency[9]+")";  // > FixedRelations.color:27
    fillcolor10="rgba(255,0,0,"+transparency[10]+")";  // > FixedRelations.color:28
    fillcolor11="rgba(255,0,0,"+transparency[11]+")";  // > FixedRelations.color:29
    fillcolor12="rgba(255,0,0,"+transparency[12]+")";  // > FixedRelations.color:30
    fillcolor13="rgba(255,0,0,"+transparency[13]+")";  // > FixedRelations.color:31
    fillcolor14="rgba(255,0,0,"+transparency[14]+")";  // > FixedRelations.color:32
    fillcolor15="rgba(255,0,0,"+transparency[15]+")";  // > FixedRelations.color:33
    fillcolor16="rgba(255,0,0,"+transparency[16]+")";  // > FixedRelations.color:34
    fillcolor17="rgba(255,0,0,"+transparency[17]+")";  // > FixedRelations.color:35
    fillcolor18="rgba(255,0,0,"+transparency[18]+")";  // > FixedRelations.color:36
    fillcolor19="rgba(255,0,0,"+transparency[19]+")";  // > FixedRelations.color:37
    fillcolor20="rgba(255,0,0,"+transparency[20]+")";  // > FixedRelations.color:38
    }  // > FixedRelations.color:39
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["angle 2"]) return;
    // move to custom page Angles  // > FixedRelations.angle 2:1
    //k = math.sqrt(-4);;  // > FixedRelations.angle 2:2
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["color 2"]) return;
    for (var i=1; i<denominator+1/* Iterations */ ; i++) {  // > FixedRelations.color 2:1
      /* Write the code here */  // > FixedRelations.color 2:2
    if (i<=option2&&i<=option2d){  // > FixedRelations.color 2:3
      transparency2[i]=0.5;  // > FixedRelations.color 2:4
      attributes2[i] = { "stroke-dasharray":"16 0 16 0" } ;  // > FixedRelations.color 2:5
      }  // > FixedRelations.color 2:6
      else{  // > FixedRelations.color 2:7
    //  else if (i>=option2&&i<=option2d) {  // > FixedRelations.color 2:8
        transparency2[i]=0;  // > FixedRelations.color 2:9
        attributes2[i] = { "stroke-dasharray":"4 16 4 16" } ;  // > FixedRelations.color 2:10
        }  // > FixedRelations.color 2:11
        // > FixedRelations.color 2:12
    fillcolor2a="rgba(0,255,0,"+transparency2[1]+")";  // > FixedRelations.color 2:13
    fillcolor12a="rgba(0,255,0,"+transparency2[2]+")";  // > FixedRelations.color 2:14
    fillcolor32="rgba(0,255,0,"+transparency2[3]+")";  // > FixedRelations.color 2:15
    fillcolor42="rgba(0,255,0,"+transparency2[4]+")";  // > FixedRelations.color 2:16
    fillcolor52="rgba(0,255,0,"+transparency2[5]+")";  // > FixedRelations.color 2:17
    fillcolor62="rgba(0,255,0,"+transparency2[6]+")";  // > FixedRelations.color 2:18
    fillcolor72="rgba(0,255,0,"+transparency2[7]+")";  // > FixedRelations.color 2:19
    fillcolor82="rgba(0,255,0,"+transparency2[8]+")";  // > FixedRelations.color 2:20
    fillcolor92="rgba(0,255,0,"+transparency2[9]+")";  // > FixedRelations.color 2:21
    fillcolor102="rgba(0,255,0,"+transparency2[10]+")";  // > FixedRelations.color 2:22
    fillcolor112="rgba(0,255,0,"+transparency2[11]+")";  // > FixedRelations.color 2:23
    fillcolor122="rgba(0,255,0,"+transparency2[12]+")";  // > FixedRelations.color 2:24
    fillcolor132="rgba(0,255,0,"+transparency2[13]+")";  // > FixedRelations.color 2:25
    fillcolor142="rgba(0,255,0,"+transparency2[14]+")";  // > FixedRelations.color 2:26
    fillcolor152="rgba(0,255,0,"+transparency2[15]+")";  // > FixedRelations.color 2:27
    fillcolor162="rgba(0,255,0,"+transparency2[16]+")";  // > FixedRelations.color 2:28
    fillcolor172="rgba(0,255,0,"+transparency2[17]+")";  // > FixedRelations.color 2:29
    fillcolor182="rgba(0,255,0,"+transparency2[18]+")";  // > FixedRelations.color 2:30
    fillcolor192="rgba(0,255,0,"+transparency2[19]+")";  // > FixedRelations.color 2:31
    fillcolor202="rgba(0,255,0,"+transparency2[20]+")";  // > FixedRelations.color 2:32
    }  // > FixedRelations.color 2:33
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["signcheck"]) return;
    if ((option/option1d-option2/option2d)==0) {  // > FixedRelations.signcheck:1
      sign=0;  // > FixedRelations.signcheck:2
      }  // > FixedRelations.signcheck:3
      else if ((option/option1d-option2/option2d)>0) {  // > FixedRelations.signcheck:4
      sign=1; //greater  // > FixedRelations.signcheck:5
      }  // > FixedRelations.signcheck:6
      else if ((option/option1d-option2/option2d)<0) {  // > FixedRelations.signcheck:7
      sign=-1; //lesser  // > FixedRelations.signcheck:8
      }  // > FixedRelations.signcheck:9
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["lessthan1"]) return;
    if (option/option1d>1){  // > FixedRelations.lessthan1:1
      EJSS_INTERFACE.BoxPanel.showOkDialog("exceeded the number 1, please try a fraction lesser than the value of 1");  // > FixedRelations.lessthan1:2
      _view.comboBox.setSelectedOptions([1]); // set dropdown menu  // > FixedRelations.lessthan1:3
    option=1; //set in variable  // > FixedRelations.lessthan1:4
      }  // > FixedRelations.lessthan1:5
        // > FixedRelations.lessthan1:6
      if (option2/option2d>1){  // > FixedRelations.lessthan1:7
      EJSS_INTERFACE.BoxPanel.showOkDialog("exceeded the number 1, please try a fraction lesser than the value of 1");  // > FixedRelations.lessthan1:8
      _view.comboBox2.setSelectedOptions([1]); // set dropdown menu  // > FixedRelations.lessthan1:9
    option2=1; //set in variable  // > FixedRelations.lessthan1:10
      }  // > FixedRelations.lessthan1:11
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["rectangles"]) return;
    //for (var i=1; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangles:1
        // > FixedRelations.rectangles:2
      for ( var i=0; i<=denominator+1 /* Iterations */ ; i++) {  // > FixedRelations.rectangles:3
    sizexrect[i]=2/option1d;  // > FixedRelations.rectangles:4
    xrect[i]=-1+(i)*sizexrect[i];  // > FixedRelations.rectangles:5
    yrect[i]=0;  // > FixedRelations.rectangles:6
    numberrect[i]=""+i;  // > FixedRelations.rectangles:7
    }  // > FixedRelations.rectangles:8
    for ( var i=1; i<=denominator+1 /* Iterations */ ; i++) {  // > FixedRelations.rectangles:9
    if (i<=option&&i<option1d){  // > FixedRelations.rectangles:10
      transparencyrect[i]=0.5;  // > FixedRelations.rectangles:11
    fillcolorrect[i]="rgba(255,0,0,"+transparencyrect[i]+")"  // > FixedRelations.rectangles:12
      attributesrect[i] ={"stroke-dasharray":"16 0 16 0"};  // > FixedRelations.rectangles:13
    }  // > FixedRelations.rectangles:14
     if (i>=option&&i<=option1d) { //correct effect line  // > FixedRelations.rectangles:15
       transparencyrect[i]=0;  // > FixedRelations.rectangles:16
    fillcolorrect[i]="rgba(255,0,0,"+transparencyrect[i]+")"  // > FixedRelations.rectangles:17
      attributesrect[i] ={"stroke-dasharray":"2 8 2 8"};  // > FixedRelations.rectangles:18
        // > FixedRelations.rectangles:19
      }  // > FixedRelations.rectangles:20
    }  // > FixedRelations.rectangles:21
    //}  // > FixedRelations.rectangles:22
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["rectangleLeftH"]) return;
    //for (var i=1; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangleLeftH:1
        // > FixedRelations.rectangleLeftH:2
      for ( var i=0; i<=denominator+1 /* Iterations */ ; i++) {  // > FixedRelations.rectangleLeftH:3
    sizeyrecth[i]=2/option1d;  // > FixedRelations.rectangleLeftH:4
    xrecth[i]=0;  // > FixedRelations.rectangleLeftH:5
    yrecth[i]=-1+(i)*sizexrect[i];  // > FixedRelations.rectangleLeftH:6
    numberrect[i]=""+i;  // > FixedRelations.rectangleLeftH:7
    }  // > FixedRelations.rectangleLeftH:8
    for ( var i=1; i<=denominator+1 /* Iterations */ ; i++) {  // > FixedRelations.rectangleLeftH:9
    if (i<=option&&i<option1d){  // > FixedRelations.rectangleLeftH:10
      transparencyrect[i]=0.5;  // > FixedRelations.rectangleLeftH:11
    fillcolorrect[i]="rgba(255,0,0,"+transparencyrect[i]+")"  // > FixedRelations.rectangleLeftH:12
      attributesrect[i] ={"stroke-dasharray":"16 0 16 0"};  // > FixedRelations.rectangleLeftH:13
    }  // > FixedRelations.rectangleLeftH:14
     if (i>=option&&i<=option1d) { //correct effect line  // > FixedRelations.rectangleLeftH:15
       transparencyrect[i]=0;  // > FixedRelations.rectangleLeftH:16
    fillcolorrect[i]="rgba(255,0,0,"+transparencyrect[i]+")"  // > FixedRelations.rectangleLeftH:17
      attributesrect[i] ={"stroke-dasharray":"2 8 2 8"};  // > FixedRelations.rectangleLeftH:18
        // > FixedRelations.rectangleLeftH:19
      }  // > FixedRelations.rectangleLeftH:20
    }  // > FixedRelations.rectangleLeftH:21
    //}  // > FixedRelations.rectangleLeftH:22
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["rectangle2"]) return;
    //for (var i=1; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangle2:1
        // > FixedRelations.rectangle2:2
      for ( var i=0; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangle2:3
    sizexrect2[i]=2/option2d;  // > FixedRelations.rectangle2:4
    xrect2[i]=-1+(i)*sizexrect2[i];  // > FixedRelations.rectangle2:5
    yrect2[i]=0;  // > FixedRelations.rectangle2:6
    numberrect2[i]=""+i;  // > FixedRelations.rectangle2:7
    }  // > FixedRelations.rectangle2:8
    for ( var i=1; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangle2:9
    if (i<=option2&&i<option2d){  // > FixedRelations.rectangle2:10
      transparencyrect2[i]=0.5;  // > FixedRelations.rectangle2:11
    fillcolorrect2[i]="rgba(0,255,0,"+transparencyrect2[i]+")"  // > FixedRelations.rectangle2:12
      attributesrect2[i] ={"stroke-dasharray":"16 0 16 0"};  // > FixedRelations.rectangle2:13
    }  // > FixedRelations.rectangle2:14
     if (i>=option2&&i<=option2d) { //correct effect line  // > FixedRelations.rectangle2:15
       transparencyrect2[i]=0;  // > FixedRelations.rectangle2:16
    fillcolorrect2[i]="rgba(0,255,0,"+transparencyrect2[i]+")"  // > FixedRelations.rectangle2:17
      attributesrect2[i] ={"stroke-dasharray":"2 8 2 8"};  // > FixedRelations.rectangle2:18
        // > FixedRelations.rectangle2:19
      }  // > FixedRelations.rectangle2:20
    }  // > FixedRelations.rectangle2:21
    //}  // > FixedRelations.rectangle2:22
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["rectangleLeftHorizontal"]) return;
    //for (var i=1; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangleLeftHorizontal:1
        // > FixedRelations.rectangleLeftHorizontal:2
      for ( var i=0; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangleLeftHorizontal:3
    sizeyrect2h[i]=2/option2d;  // > FixedRelations.rectangleLeftHorizontal:4
    xrect2h[i]=0;  // > FixedRelations.rectangleLeftHorizontal:5
    yrect2h[i]=-1+(i)*sizeyrect2h[i];  // > FixedRelations.rectangleLeftHorizontal:6
    numberrect2[i]=""+i;  // > FixedRelations.rectangleLeftHorizontal:7
    }  // > FixedRelations.rectangleLeftHorizontal:8
    for ( var i=1; i<=12 /* Iterations */ ; i++) {  // > FixedRelations.rectangleLeftHorizontal:9
    if (i<=option2&&i<option2d){  // > FixedRelations.rectangleLeftHorizontal:10
      transparencyrect2[i]=0.5;  // > FixedRelations.rectangleLeftHorizontal:11
    fillcolorrect2[i]="rgba(0,255,0,"+transparencyrect2[i]+")"  // > FixedRelations.rectangleLeftHorizontal:12
      attributesrect2[i] ={"stroke-dasharray":"16 0 16 0"};  // > FixedRelations.rectangleLeftHorizontal:13
    }  // > FixedRelations.rectangleLeftHorizontal:14
     if (i>=option2&&i<=option2d) { //correct effect line  // > FixedRelations.rectangleLeftHorizontal:15
       transparencyrect2[i]=0;  // > FixedRelations.rectangleLeftHorizontal:16
    fillcolorrect2[i]="rgba(0,255,0,"+transparencyrect2[i]+")"  // > FixedRelations.rectangleLeftHorizontal:17
      attributesrect2[i] ={"stroke-dasharray":"2 8 2 8"};  // > FixedRelations.rectangleLeftHorizontal:18
        // > FixedRelations.rectangleLeftHorizontal:19
      }  // > FixedRelations.rectangleLeftHorizontal:20
    }  // > FixedRelations.rectangleLeftHorizontal:21
    //}  // > FixedRelations.rectangleLeftHorizontal:22
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  function _initializeSolvers() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].initializeSolver();
  }

  function _automaticResetSolvers() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].automaticResetSolver();
  }

  _model.resetSolvers = function() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].resetSolver();
  };

  _getODE = function (_odeName) {
    if (_odeName=="Evol Page") return _ODEi_evolution1;
    return null;
  }

  function _getEventSolver(_odeName) {
    var ode = _getODE(_odeName);
    if (ode===null) return null;
    return ode.getEventSolver();
  }

  function _setSolverClass(_odeName, _engine) {
    var ode = _getODE(_odeName);
    if (ode===null) return;
    if (!_engine.setODE) {
      var classname = _engine.toLowerCase();
      if      (classname.indexOf("boga")>=0)   _engine = EJSS_ODE_SOLVERS.bogackiShampine23;
      else if (classname.indexOf("cash")>=0)   _engine = EJSS_ODE_SOLVERS.cashKarp45;
      else if (classname.indexOf("dopri5")>=0) _engine = EJSS_ODE_SOLVERS.dopri5;
      else if (classname.indexOf("dopri8")>=0) _engine = EJSS_ODE_SOLVERS.dopri853;
      else if (classname.indexOf("richa")>=0)  _engine = EJSS_ODE_SOLVERS.eulerRichardson;
      else if (classname.indexOf("euler")>=0)  _engine = EJSS_ODE_SOLVERS.euler;
      else if (classname.indexOf("fehlberg87")>=0) _engine = EJSS_ODE_SOLVERS.fehlberg87;
      else if (classname.indexOf("fehlberg8")>=0)  _engine = EJSS_ODE_SOLVERS.fehlberg8;
      else if (classname.indexOf("radau")>=0)   _engine = EJSS_ODE_SOLVERS.radau5;
      else if (classname.indexOf("runge")>=0)  _engine = EJSS_ODE_SOLVERS.rungeKutta4;
      else if (classname.indexOf("rk4")>=0)    _engine = EJSS_ODE_SOLVERS.rungeKutta4;
      else if (classname.indexOf("verlet")>=0) _engine = EJSS_ODE_SOLVERS.velocityVerlet;
    }
    if (_engine) ode.setSolverClass(_engine);
  }

  function _ODE_evolution1() {
    var __odeSelf = {};
    var __eventSolver;
    var __solverClass = EJSS_ODE_SOLVERS.rungeKutta4;
    var __state=[];
    var _ODE_evolution1_Event1;
    var _ODE_evolution1_Event2;
    var _ODE_evolution1_Event3;
    var _ODE_evolution1_Event4;
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["x1","x2","t"]};

    __odeSelf.setSolverClass = function(__aSolverClass) {
      __solverClass = __aSolverClass;
      __instantiateSolver();
    };

    function __instantiateSolver() {
      __state=[];
      __pushState();
      __eventSolver = EJSS_ODE_SOLVERS.interpolatorEventSolver(__solverClass(),__odeSelf);
      __mustInitialize = true;
    }

    __odeSelf.setEnabled = function(_enabled) { __isEnabled = _enabled; };

    __odeSelf.getIndependentVariableValue = function() { return __eventSolver.getIndependentVariableValue(); };

    __odeSelf.getInternalStepSize = function() { return __eventSolver.getInternalStepSize(); };

    __odeSelf.isAccelerationIndependentOfVelocity = function() { return false; };

    __odeSelf.initializeSolver = function() {
      if (__arraysChanged()) { __instantiateSolver(); __odeSelf.initializeSolver(); return; }
      __pushState();
      __eventSolver.initialize(dt);
      __eventSolver.setBestInterpolation(false);
      __eventSolver.setMaximumInternalSteps(10000);
      __eventSolver.removeAllEvents();
      if (__pagesEnabled["movetowardsaddition"]) __eventSolver.addEvent(_ODE_evolution1_Event1());
      if (__pagesEnabled["moveaway"]) __eventSolver.addEvent(_ODE_evolution1_Event2());
      if (__pagesEnabled["movetowardssubtraction"]) __eventSolver.addEvent(_ODE_evolution1_Event3());
      if (__pagesEnabled["moveaway 2"]) __eventSolver.addEvent(_ODE_evolution1_Event4());
      for(k in userEvents1){__eventSolver.addEvent(userEvents1[k]);}
      __eventSolver.setEstimateFirstStep(false);
      __eventSolver.setEnableExceptions(false);
      __eventSolver.setTolerances(0.00001,0.00001);
      __mustReinitialize = true;
      __mustInitialize = false;
    };

    function __pushState() {
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        if (__state[__cIn]!=x1) __mustReinitialize = true;
        __state[__cIn++] = x1;
        if (__state[__cIn]!=x2) __mustReinitialize = true;
        __state[__cIn++] = x2;
        if (__state[__cIn]!=t) __mustReinitialize = true;
        __state[__cIn++] = t;
    }

    function __arraysChanged () {
      return false;
    }

    __odeSelf.getEventSolver = function() {
      return __eventSolver;
    };

    __odeSelf.resetSolver = function() {
      __mustUserReinitialize = true;
    };

    __odeSelf.automaticResetSolver = function() {
      __mustReinitialize = true;
    };

    function __errorAction () {
      if (__ignoreErrors) return;
      console.log (__eventSolver.getErrorMessage());
      _pause();
      // Make sure the solver is reinitialized;
      __mustReinitialize = true;
    }

    __odeSelf.step = function() { return __privateStep(false); };

    __odeSelf.solverStep = function() { return __privateStep(true); };

    function __privateStep(__takeMaximumStep) {
      if (!__isEnabled) return 0;
      if (dt===0) return 0;
      if (__mustInitialize) __odeSelf.initializeSolver();
      if (__arraysChanged()) { __instantiateSolver(); __odeSelf.initializeSolver(); }
      __eventSolver.setStepSize(dt);
      __eventSolver.setInternalStepSize(dt);
      __eventSolver.setMaximumInternalSteps(10000);
      __eventSolver.setTolerances(0.00001,0.00001);
      __pushState();
      if (__mustUserReinitialize) { 
        __eventSolver.userReinitialize();
        __mustUserReinitialize = false;
        __mustReinitialize = false;
        if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      }
      else if (__mustReinitialize) { 
        __eventSolver.reinitialize();
        __mustReinitialize = false;
        if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      }
      var __stepTaken = __takeMaximumStep ? __eventSolver.maxStep() : __eventSolver.step();
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        t = __state[__cOut++];
      // Check for error
      if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      return __stepTaken;
    }

    __odeSelf.getState = function() { return __state; };

    __odeSelf.getRate = function(_aState,_aRate) {
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = vx1; // Rate for ODE: Evol Page:x1
        _aRate[__cRate++] = vx2; // Rate for ODE: Evol Page:x2
        _aRate[__cRate++] = 1; // independent variable
        return _aRate;
    }; //end of getRate

    __odeSelf._addEvent = function(userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent){
    var User_Event = function (userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent) {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return eventType; };

      _eventSelf.getRootFindingMethod = function() { return eventMethod; };

      _eventSelf.getMaxIterations = function() { return maxIter; };

      _eventSelf.getTolerance = function() { return eventTolerance; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        if (undefined != functions) eval(functions.toString());
        eval(userAction);
        return endAtEvent;
      }

      return _eventSelf;
    }; // End of event

   userEvents1.push(User_Event(userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent));
   }

    _ODE_evolution1_Event1 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        if (sign==1&&circleshow){ // addition  // > Event zero-condition for page Evol Page:1
        return x1-(x2);  // > Event zero-condition for page Evol Page:2
        }  // > Event zero-condition for page Evol Page:3
        if (sign==1&&rectangleshow){ // addition  // > Event zero-condition for page Evol Page:4
        return x1-(x2+sizexrect2[1]*option2) //take one sample size assume all size same  // > Event zero-condition for page Evol Page:5
        }  // > Event zero-condition for page Evol Page:6
        if (sign==1&&rectangleshowh){ // addition  // > Event zero-condition for page Evol Page:7
        return x1-(x2-2) //take one sample size assume all size same  // > Event zero-condition for page Evol Page:8
        }  // > Event zero-condition for page Evol Page:9
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        moveaway=true;  // > Event action for page Evol Page:2
        vx1=-1;  // > Event action for page Evol Page:3
        //make same denominator keep equivalent dont not work for now  // > Event action for page Evol Page:4
        keepequivalent=true;  // > Event action for page Evol Page:5
        showanswer=true;  // > Event action for page Evol Page:6
        //_view.comboBox.setOptions([option]);  // > Event action for page Evol Page:7
        //var k=2;  // > Event action for page Evol Page:8
        //_view.comboBox1d.setOptions([option1d,option1d*2,option1d*3]);  // > Event action for page Evol Page:9
        // move to custom page Angles  // > Event action for page Evol Page:10
        //k = option/option1d-option2/option2d;  // > Event action for page Evol Page:11
        var first =math.fraction(""+option,""+option1d);  // > Event action for page Evol Page:12
        var second = math.fraction(""+option2,""+option2d);  // > Event action for page Evol Page:13
        if ( sign<0){ //substract  // > Event action for page Evol Page:14
        k= "= "+math.format(math.add(first,-second));  // > Event action for page Evol Page:15
        if (Number.isInteger(first-second)){  // > Event action for page Evol Page:16
           k = "= "+math.add(first,-second);  // > Event action for page Evol Page:17
           }  // > Event action for page Evol Page:18
        }  // > Event action for page Evol Page:19
        else if( sign>0){ //add  // > Event action for page Evol Page:20
         k= "= "+math.format(math.add(first,second));   // > Event action for page Evol Page:21
         if (Number.isInteger(first+second)){  // > Event action for page Evol Page:22
           k = "= "+math.add(first,second);  // > Event action for page Evol Page:23
         //  k = $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$;  // > Event action for page Evol Page:24
           }  // > Event action for page Evol Page:25
         }  // > Event action for page Evol Page:26
        var opts = _view.question.getProperty("SelectedOptions");  // array of options  // > Event action for page Evol Page:27
        if (opts=="Q1"){  // > Event action for page Evol Page:28
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 2 pieces of 1/4");    // > Event action for page Evol Page:29
          }  // > Event action for page Evol Page:30
            // > Event action for page Evol Page:31
          else if (opts=="Q2"){  // > Event action for page Evol Page:32
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 6 pieces of 1/9");    // > Event action for page Evol Page:33
          }  // > Event action for page Evol Page:34
          else if (opts=="Q3"){  // > Event action for page Evol Page:35
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 3 pieces of 1/5");    // > Event action for page Evol Page:36
          }  // > Event action for page Evol Page:37
          else if (opts=="Q4"){  // > Event action for page Evol Page:38
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 5 pieces of 1/6");    // > Event action for page Evol Page:39
          }  // > Event action for page Evol Page:40
          else if (opts=="Q5"){  // > Event action for page Evol Page:41
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 2 pieces of 1/2");    // > Event action for page Evol Page:42
          }  // > Event action for page Evol Page:43
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event2 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        if (sign==1){ // addition  // > Event zero-condition for page Evol Page:1
        return x1-(-1.5);  // > Event zero-condition for page Evol Page:2
        }  // > Event zero-condition for page Evol Page:3
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        moveaway=false;  // > Event action for page Evol Page:2
        vx1=-vx1;  // > Event action for page Evol Page:3
        showanswer=false;  // > Event action for page Evol Page:4
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event3 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        if (sign==-1){ // addition  // > Event zero-condition for page Evol Page:1
        return x2-x1;  // > Event zero-condition for page Evol Page:2
        }  // > Event zero-condition for page Evol Page:3
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        moveaway=true;  // > Event action for page Evol Page:2
        vx2=1;  // > Event action for page Evol Page:3
        //make same denominator keep equivalent dont not work for now  // > Event action for page Evol Page:4
        keepequivalent=true;  // > Event action for page Evol Page:5
        showanswer=true;  // > Event action for page Evol Page:6
        //_view.comboBox.setOptions([option]);  // > Event action for page Evol Page:7
        //var k=2;  // > Event action for page Evol Page:8
        //_view.comboBox1d.setOptions([option1d,option1d*2,option1d*3]);  // > Event action for page Evol Page:9
        // move to custom page Angles  // > Event action for page Evol Page:10
        //k = option/option1d-option2/option2d;  // > Event action for page Evol Page:11
        var first =math.fraction(""+option,""+option1d);  // > Event action for page Evol Page:12
        var second = math.fraction(""+option2,""+option2d);  // > Event action for page Evol Page:13
        if ( sign<0){ //substract  // > Event action for page Evol Page:14
        k= "= "+math.format(math.add(first,-second));  // > Event action for page Evol Page:15
        if (Number.isInteger(first-second)){  // > Event action for page Evol Page:16
           k = "= "+math.add(first,-second);  // > Event action for page Evol Page:17
           }  // > Event action for page Evol Page:18
        }  // > Event action for page Evol Page:19
        else if( sign>0){ //add  // > Event action for page Evol Page:20
         k= "= "+math.format(math.add(first,second));   // > Event action for page Evol Page:21
         if (Number.isInteger(first+second)){  // > Event action for page Evol Page:22
           k = "= "+math.add(first,second);  // > Event action for page Evol Page:23
           }  // > Event action for page Evol Page:24
         }  // > Event action for page Evol Page:25
        var opts = _view.question.getProperty("SelectedOptions");  // array of options  // > Event action for page Evol Page:26
        if (opts=="Q1"){  // > Event action for page Evol Page:27
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 2 pieces of 1/4");    // > Event action for page Evol Page:28
          }  // > Event action for page Evol Page:29
            // > Event action for page Evol Page:30
          else if (opts=="Q2"){  // > Event action for page Evol Page:31
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 6 pieces of 1/9");    // > Event action for page Evol Page:32
          }  // > Event action for page Evol Page:33
          else if (opts=="Q3"){  // > Event action for page Evol Page:34
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 3 pieces of 1/5");    // > Event action for page Evol Page:35
          }  // > Event action for page Evol Page:36
          else if (opts=="Q4"){  // > Event action for page Evol Page:37
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 5 pieces of 1/6");    // > Event action for page Evol Page:38
          }  // > Event action for page Evol Page:39
          else if (opts=="Q5"){  // > Event action for page Evol Page:40
        EJSS_INTERFACE.BoxPanel.showOkDialog("There are 2 pieces of 1/2");    // > Event action for page Evol Page:41
          }  // > Event action for page Evol Page:42
           else if (opts=="random"){  // > Event action for page Evol Page:43
        EJSS_INTERFACE.BoxPanel.showOkDialog("The parts in both fractions are equal in size. So the denominator stays at "+option1d+" and we subtract the parts to get the numerator.");    // > Event action for page Evol Page:44
          }  // > Event action for page Evol Page:45
        return true;
      }

      return _eventSelf;
    }; // End of event

    _ODE_evolution1_Event4 = function() {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return EJSS_ODE_SOLVERS.EVENT_TYPE.CROSSING_EVENT; };

      _eventSelf.getRootFindingMethod = function() { return EJSS_ODE_SOLVERS.EVENT_METHOD.BISECTION; };

      _eventSelf.getMaxIterations = function() { return 100; };

      _eventSelf.getTolerance = function() { return 1.0e-5; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x1 = _aState[__cOut++];
        var x2 = _aState[__cOut++];
        var t = _aState[__cOut++];
        if (sign==-1){ // addition  // > Event zero-condition for page Evol Page:1
        return x2-(1.5);  // > Event zero-condition for page Evol Page:2
        }  // > Event zero-condition for page Evol Page:3
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x1 = __state[__cOut++];
        x2 = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x1;
        __state[__cIn++] = x2;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        _pause();  // > Event action for page Evol Page:1
        moveaway=false;  // > Event action for page Evol Page:2
        vx2=-vx2;  // > Event action for page Evol Page:3
        showanswer=false;  // > Event action for page Evol Page:4
        return true;
      }

      return _eventSelf;
    }; // End of event

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_x1(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_x2(__time) {
    var __index = 0 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

    _model._resized = function(_width,_height) {
      _view._resized(_width,_height);
  }; // end of _resized
    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "HtmlView Page", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new addfractions_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.fullscreen.linkProperty("Height",  function() { return changeOrientationfullscreen(); }, function(_v) { changeOrientationfullscreen() = _v; } ); // HtmlView Page linking property 'Height' for element 'fullscreen'
          _view.fullscreen.linkProperty("Width",  function() { return Width; }, function(_v) { Width = _v; } ); // HtmlView Page linking property 'Width' for element 'fullscreen'
          _view.question.linkProperty("Options",  function() { return ["fractions","video1","V1:","V2:","V3:","same denominator","Q1","Q2","Q3","Q4","Q5","q1","q2","q3","q4","q5","","subtract","v1:","v2:","v3:","random","","circle","rectangle","h rectangle","","words","signs"]; } ); // HtmlView Page linking property 'Options' for element 'question'
          _view.question.setAction("OnChange", function(_data,_info) {
  var opts = _view.question.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
    
  if (  option=="V1:"){
     EJSS_INTERFACE.BoxPanel.showOkDialog("what is the addition?");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["4"]);
    option1d=4; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option2=2;
    _view.comboBox2d.setSelectedOptions(["4"]);
    option2d=4; 
   sign =1; //sum
    }
  else if (  option=="V2:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("what is the addition?");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option2=3;
    _view.comboBox2d.setSelectedOptions(["5"]);
    option2d=5; 
    }
    
    else if (  option=="V3:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("what is the addition?");
    _view.comboBox.setSelectedOptions(["2"]);
   option=2;
    _view.comboBox1d.setSelectedOptions(["7"]);
    option1d=7; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["7"]);
    option2d=7; 
    }
    
    
    else if (  option=="Q1"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("how many fraction pieces are there altogether?");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["4"]);
    option1d=4; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["4"]);
    option2d=4; 
    }
     else if (  option=="Q2"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("how many fraction pieces are there altogether?");
    _view.comboBox.setSelectedOptions(["5"]);
   option=5;
    _view.comboBox1d.setSelectedOptions(["9"]);
    option1d=9; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["9"]);
    option2d=9; 
    }
    
    
     else if (  option=="Q3"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("how many fraction pieces are there altogether?");
    _view.comboBox.setSelectedOptions(["2"]);
   option=2;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["5"]);
    option2d=5; 
    }
     else if (  option=="Q4"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("how many fraction pieces are there altogether?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["6"]);
    option1d=6; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option2=2;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option2d=6; 
    }
     else if (  option=="Q5"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("how many fraction pieces are there altogether?");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["2"]);
    option1d=2; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["2"]);
    option2d=2; 
    }
     else if (  option=="v1:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which is the substraction?");
    _view.comboBox.setSelectedOptions(["5"]);
   option=5;
    _view.comboBox1d.setSelectedOptions(["6"]);
    option1d=6; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option2d=6; 
    sign=-1; // minus
    }
    else if (  option=="v2:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which is the substraction?");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option2=3;
    _view.comboBox2d.setSelectedOptions(["5"]);
    option2d=5; 
    sign=-1; // minus
    }
    
    else if (  option=="v3:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which is the substraction?");
    _view.comboBox.setSelectedOptions(["7"]);
   option=7;
    _view.comboBox1d.setSelectedOptions(["9"]);
    option1d=9; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option2=5;
    _view.comboBox2d.setSelectedOptions(["9"]);
    option2d=9; 
    sign=-1; // minus
    }
    else if (  option=="v4:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is smaller?");
    _view.comboBox.setSelectedOptions(["2"]);
   option=2;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["4"]);
    option2d=4; 
    sign=-1; // minus
    }
    
    
    else if (  option=="random"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("what is the subtraction?");
  // var top1 = Math.floor(Math.random()*20);
  // var bottom1 = Math.ceil(Math.random()*20);
  // var top2 = Math.min(Math.floor(Math.random()*20),top1-1);
  // var bottom2=bottom1;
   _view.comboBox.setSelectedOptions([top1]);
   option=top1;
    _view.comboBox1d.setSelectedOptions([bottom1]);
    option1d=bottom1; 
   _view.comboBox2.setSelectedOptions([top2]);
    option2=top2;
    _view.comboBox2d.setSelectedOptions([bottom2]);
    option2d=bottom2; 
    sign=-1;
    }
     else if (  option=="q2"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("what is the addition?");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["9"]);
    option1d=9; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option2=2;
    _view.comboBox2d.setSelectedOptions(["9"]);
    option2d=9; 
    }
    
    
     else if (  option=="q3"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("what is the addition?");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["11"]);
    option1d=11; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option2=5;
    _view.comboBox2d.setSelectedOptions(["11"]);
    option12d=11; 
    }
     else if (  option=="q4"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("what is the addition?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["7"]);
    option1d=7; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option2=1;
    _view.comboBox2d.setSelectedOptions(["7"]);
    option2d=7; 
    }
     else if (  option=="q5"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("what is the addition?");
    _view.comboBox.setSelectedOptions(["7"]);
   option=7;
    _view.comboBox1d.setSelectedOptions(["10"]);
    option1d=10; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option2=2;
    _view.comboBox2d.setSelectedOptions(["10"]);
    option2d=10; 
    }
  else if (  option=="circle"){
  circleshow=true;
  rectangleshow=false;
  rectangleshowh=false;
  }
  else if (  option=="rectangle"){
  circleshow=false;
  rectangleshow=true;
  rectangleshowh=false;
  }
  else if (  option=="words"){
  signshow=false;
  }
  else if (  option=="signs"){
  signshow=true;
  }
  //"v rectangle"
  else if (  option=="h rectangle"){
  circleshow=false;
  rectangleshow=false;
  rectangleshowh=true;
  }
  // play auto
  if (circleshow){
    dt=0; //set move to false
  initializeAnimation();
  _play();
  }
  else {
    dt=0.05;
  initializeAnimation();
    }
  k = "= ?"; //set to unknown when new question;

}); // HtmlView Page setting action 'OnChange' for element 'question'
          _view.comboBox.setAction("OnChange", function(_data,_info) {
  if (circleshow){
    dt=0; //set move to false
  initializeAnimation();
  _play();
  }
  else {
    dt=0.05;
  initializeAnimation();
    }
  if (keepequivalent){
   
   //option = _view.comboBox.getProperty("SelectedOptions");
  // option1d = option1d*option; //multiple by option 
  // _view.comboBox.setSelectedOptions([_view.comboBox1d.getProperty("SelectedOptions")/option1d*option]);
    }
    
    else{
      
      }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox'
          _view.comboBox.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox'
          _view.comboBox1d.setAction("OnChange", function(_data,_info) {
  if (circleshow){
    dt=0; //set move to false
  initializeAnimation();
  _play();
  }
  else {
    dt=0.05;
  initializeAnimation();
    }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox1d'
          _view.comboBox1d.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox1d'
          _view.sign.linkProperty("Visibility",  function() { return signshow; }, function(_v) { signshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'sign'
          _view.sign.linkProperty("Display",  function() { return signshow?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'sign'
          _view.blank.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'blank'
          _view.minus.linkProperty("Visibility",  function() { return sign<0; } ); // HtmlView Page linking property 'Visibility' for element 'minus'
          _view.minus.setAction("OnClick", function(_data,_info) {
  sign=1;
  transformation= angle2*option2;
  //transformation= 0;

}); // HtmlView Page setting action 'OnClick' for element 'minus'
          _view.minus.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'minus'
          _view.minus.linkProperty("Display",  function() { return sign<0?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'minus'
          _view.add.linkProperty("Visibility",  function() { return sign>0; } ); // HtmlView Page linking property 'Visibility' for element 'add'
          _view.add.setAction("OnClick", function(_data,_info) {
  sign=-1;
  transformation= 0;
  //transformation= angle2*option2;

}); // HtmlView Page setting action 'OnClick' for element 'add'
          _view.add.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'add'
          _view.add.linkProperty("Display",  function() { return sign>0?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'add'
          _view.blank2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'blank2'
          _view.words.linkProperty("Visibility",  function() { return !signshow; } ); // HtmlView Page linking property 'Visibility' for element 'words'
          _view.words.linkProperty("Display",  function() { return !signshow?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'words'
          _view.blank3.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'blank3'
          _view.less2.linkProperty("Visibility",  function() { return sign<0; } ); // HtmlView Page linking property 'Visibility' for element 'less2'
          _view.less2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'less2'
          _view.less2.linkProperty("Display",  function() { return sign<0?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'less2'
          _view.greater2.linkProperty("Visibility",  function() { return sign>0; } ); // HtmlView Page linking property 'Visibility' for element 'greater2'
          _view.greater2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'greater2'
          _view.greater2.linkProperty("Display",  function() { return sign>0?"inline-block":"none"; } ); // HtmlView Page linking property 'Display' for element 'greater2'
          _view.blank22.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'blank22'
          _view.comboBox2.setAction("OnChange", function(_data,_info) {
  if (circleshow){
    dt=0; //set move to false
  initializeAnimation();
  //_play();
  }
  else {
    dt=0.05;
  initializeAnimation();
    }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox2'
          _view.comboBox2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox2'
          _view.comboBox2d.setAction("OnChange", function(_data,_info) {
  if (circleshow){
    dt=0; //set move to false
  initializeAnimation();
  _play();
  }
  else {
    dt=0.05;
  initializeAnimation();
    }

}); // HtmlView Page setting action 'OnChange' for element 'comboBox2d'
          _view.comboBox2d.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'comboBox2d'
          _view.blank32.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'blank32'
          _view.answer3222.linkProperty("Text",  function() { return k; }, function(_v) { k = _v; } ); // HtmlView Page linking property 'Text' for element 'answer3222'
          _view.answer3222.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'answer3222'
          _view.blank222.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'blank222'
          _view.equivalent.setAction("OffClick", function(_data,_info) {
  var opts = _view.question.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if (  option=="V1:"){
     EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["2"]);
    option1d=2; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option1d=6; 
   
    }
  else if (  option=="V2:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option=3;
    _view.comboBox2d.setSelectedOptions(["5"]);
    option1d=5; 
    }
    
    else if (  option=="V3:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["2"]);
    option1d=2; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option1d=6; 
    }
    else if (  option=="V4:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["7"]);
   option=7;
    _view.comboBox1d.setSelectedOptions(["12"]);
    option1d=12; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option=2;
    _view.comboBox2d.setSelectedOptions(["3"]);
    option1d=3; 
    }
    
    else if (  option=="Q1"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["2"]);
   option=2;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option=3;
    _view.comboBox2d.setSelectedOptions(["10"]);
    option1d=10; 
    }
     else if (  option=="Q2"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["4"]);
    option1d=4; 
   _view.comboBox2.setSelectedOptions(["7"]);
    option=7;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
    
    
     else if (  option=="Q3"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["9"]);
    option1d=9; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option=2;
    _view.comboBox2d.setSelectedOptions(["3"]);
    option1d=3; 
    }
     else if (  option=="Q4"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["5"]);
   option=5;
    _view.comboBox1d.setSelectedOptions(["6"]);
    option1d=6; 
   _view.comboBox2.setSelectedOptions(["11"]);
    option=11;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
     else if (  option=="Q5"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["4"]);
    option1d=4; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["8"]);
    option1d=8; 
    }
     
    else if (  option=="v2:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is lesser?");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["2"]);
    option1d=2; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option=2;
    _view.comboBox2d.setSelectedOptions(["3"]);
    option1d=3; 
    }
    
    else if (  option=="v3:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["4"]);
    option1d=4; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option=1;
    _view.comboBox2d.setSelectedOptions(["3"]);
    option1d=3; 
    }
    else if (  option=="v4:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is smaller?");
    _view.comboBox.setSelectedOptions(["2"]);
   option=2;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["1"]);
    option=1;
    _view.comboBox2d.setSelectedOptions(["4"]);
    option1d=4; 
    }
    
    else if (  option=="q1"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["2"]);
   option=2;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option=3;
    _view.comboBox2d.setSelectedOptions(["4"]);
    option1d=4; 
    }
     else if (  option=="q2"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["4"]);
    option1d=4; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option=2;
    _view.comboBox2d.setSelectedOptions(["3"]);
    option1d=3; 
    }
    
    
     else if (  option=="q3"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option=2;
    _view.comboBox2d.setSelectedOptions(["3"]);
    option1d=3; 
    }
     else if (  option=="q4"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["4"]);
    option1d=4; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option1d=6; 
    }
     else if (  option=="q5"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater?");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["7"]);
    option1d=7; 
   _view.comboBox2.setSelectedOptions(["2"]);
    option=2;
    _view.comboBox2d.setSelectedOptions(["3"]);
    option1d=3; 
    }
  else if (  option=="circle"){
  circleshow=true;
  rectangleshow=false;
  rectangleshowh=false;
  }
  else if (  option=="rectangle"){
  circleshow=false;
  rectangleshow=true;
  rectangleshowh=false;
  }
  else if (  option=="words"){
  signshow=false;
  }
  else if (  option=="signs"){
  signshow=true;
  }
  //"v rectangle"
  else if (  option=="h rectangle"){
  circleshow=false;
  rectangleshow=false;
  rectangleshowh=true;
  }
  initializeAnimation();

}); // HtmlView Page setting action 'OffClick' for element 'equivalent'
          _view.equivalent.setAction("OnClick", function(_data,_info) {
  var opts = _view.question.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if (  option=="V1:"){
     EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice 1/2 is equivalent to 3/6");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["6"]);
    option1d=6; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option1d=6; 
   
    }
  else if (  option=="V2:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice they have the same denominator already");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["5"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option=3;
    _view.comboBox2d.setSelectedOptions(["5"]);
    option1d=5; 
    }
    
    else if (  option=="V3:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice 1/2 is equivalent to 3/6");
    _view.comboBox.setSelectedOptions(["1"]);
   option=1;
    _view.comboBox1d.setSelectedOptions(["2"]);
    option1d=2; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option1d=6; 
    }
    else if (  option=="V4:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice 2/3 is equivalent to 8/12");
    _view.comboBox.setSelectedOptions(["7"]);
   option=7;
    _view.comboBox1d.setSelectedOptions(["12"]);
    option1d=12; 
   _view.comboBox2.setSelectedOptions(["8"]);
    option=8;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
    
    else if (  option=="Q1"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? nNotice 2/5 is equivalent to 4/10");
    _view.comboBox.setSelectedOptions(["4"]);
   option=2;
    _view.comboBox1d.setSelectedOptions(["10"]);
    option1d=5; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option=3;
    _view.comboBox2d.setSelectedOptions(["10"]);
    option1d=10; 
    }
     else if (  option=="Q2"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice 3/4 is equivalent to 9/12");
    _view.comboBox.setSelectedOptions(["9"]);
   option=9;
    _view.comboBox1d.setSelectedOptions(["12"]);
    option1d=12; 
   _view.comboBox2.setSelectedOptions(["7"]);
    option=7;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
    
    
     else if (  option=="Q3"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice 2/3 is equivalent to 6/9");
    _view.comboBox.setSelectedOptions(["4"]);
   option=4;
    _view.comboBox1d.setSelectedOptions(["9"]);
    option1d=9; 
   _view.comboBox2.setSelectedOptions(["6"]);
    option=6;
    _view.comboBox2d.setSelectedOptions(["9"]);
    option1d=9; 
    }
     else if (  option=="Q4"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice 5/6 is equivalent to 10/12");
    _view.comboBox.setSelectedOptions(["10"]);
   option=10;
    _view.comboBox1d.setSelectedOptions(["12"]);
    option1d=12; 
   _view.comboBox2.setSelectedOptions(["11"]);
    option=11;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
     else if (  option=="Q5"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice 3/4 is equivalent to 6/8");
    _view.comboBox.setSelectedOptions(["6"]);
   option=6;
    _view.comboBox1d.setSelectedOptions(["8"]);
    option1d=8; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["8"]);
    option1d=8; 
    }
    
    
    else if (  option=="v2:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is lesser? Notice the common demominator is 6, so 1/2=3/6 and 2/3=4/6");
    _view.comboBox.setSelectedOptions(["3"]);
   option=3;
    _view.comboBox1d.setSelectedOptions(["6"]);
    option1d=6; 
   _view.comboBox2.setSelectedOptions(["4"]);
    option=4;
    _view.comboBox2d.setSelectedOptions(["6"]);
    option1d=6; 
    }
    
    else if (  option=="v3:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice the common demominator is 12, so 3/4=9/12 and 1/3=3/12");
    _view.comboBox.setSelectedOptions(["9"]);
   option=9;
    _view.comboBox1d.setSelectedOptions(["12"]);
    option1d=12; 
   _view.comboBox2.setSelectedOptions(["3"]);
    option=3;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
    else if (  option=="v4:"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is smaller? Notice the common demominator is 20, so 2/5=8/20 and 1/4=5/20");
    _view.comboBox.setSelectedOptions(["8"]);
   option=8;
    _view.comboBox1d.setSelectedOptions(["20"]);
    option1d=20; 
   _view.comboBox2.setSelectedOptions(["5"]);
    option=5;
    _view.comboBox2d.setSelectedOptions(["20"]);
    option1d=20; 
    }
    
    else if (  option=="q1"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice the common demominator is 20, so 2/5=8/20 and 3/4=15/20");
    _view.comboBox.setSelectedOptions(["8"]);
   option=8;
    _view.comboBox1d.setSelectedOptions(["20"]);
    option1d=20; 
   _view.comboBox2.setSelectedOptions(["15"]);
    option=15;
    _view.comboBox2d.setSelectedOptions(["20"]);
    option1d=20; 
    }
     else if (  option=="q2"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is lesser? Notice the common demominator is 12, so 3/4=9/12 and 2/3=8/12");
    _view.comboBox.setSelectedOptions(["9"]);
   option=9;
    _view.comboBox1d.setSelectedOptions(["12"]);
    option1d=12; 
   _view.comboBox2.setSelectedOptions(["8"]);
    option=8;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
    
    
     else if (  option=="q3"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice the common demominator is 15, so 3/5=9/15 and 2/3=10/15");
    _view.comboBox.setSelectedOptions(["9"]);
   option=9;
    _view.comboBox1d.setSelectedOptions(["15"]);
    option1d=15; 
   _view.comboBox2.setSelectedOptions(["10"]);
    option=10;
    _view.comboBox2d.setSelectedOptions(["15"]);
    option1d=15; 
    }
     else if (  option=="q4"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is lesser? Notice the common demominator is 12, so 3/4=9/12 and 5/6=10/12");
    _view.comboBox.setSelectedOptions(["9"]);
   option=9;
    _view.comboBox1d.setSelectedOptions(["12"]);
    option1d=12; 
   _view.comboBox2.setSelectedOptions(["10"]);
    option=10;
    _view.comboBox2d.setSelectedOptions(["12"]);
    option1d=12; 
    }
     else if (  option=="q5"){
    EJSS_INTERFACE.BoxPanel.showOkDialog("which fraction is greater? Notice the common demominator is 21, so 4/7=12/21 and 2/3=14/21");
    _view.comboBox.setSelectedOptions(["12"]);
   option=12;
    _view.comboBox1d.setSelectedOptions(["21"]);
    option1d=21; 
   _view.comboBox2.setSelectedOptions(["14"]);
    option=14;
    _view.comboBox2d.setSelectedOptions(["21"]);
    option1d=21; 
    }
    
  else if (  option=="circle"){
  circleshow=true;
  rectangleshow=false;
  rectangleshowh=false;
  }
  else if (  option=="rectangle"){
  circleshow=false;
  rectangleshow=true;
  rectangleshowh=false;
  }
  else if (  option=="words"){
  signshow=false;
  }
  else if (  option=="signs"){
  signshow=true;
  }
  //"v rectangle"
  else if (  option=="h rectangle"){
  circleshow=false;
  rectangleshow=false;
  rectangleshowh=true;
  }
  initializeAnimation();

}); // HtmlView Page setting action 'OnClick' for element 'equivalent'
          _view.playPauseButton2.setAction("OffClick", function(_data,_info) {
  text="paused";
  _pause();

}); // HtmlView Page setting action 'OffClick' for element 'playPauseButton2'
          _view.playPauseButton2.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton2'
          _view.playPauseButton2.setAction("OnClick", function(_data,_info) {
  dt=0.05;
  _play();
  text="playing";

}); // HtmlView Page setting action 'OnClick' for element 'playPauseButton2'
          _view.resetButton2.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'resetButton2'
          _view.FullScreen2Button.setAction("OffClick", function(_data,_info) {
  _pause();
  toggleFullScreen();

}); // HtmlView Page setting action 'OffClick' for element 'FullScreen2Button'
          _view.FullScreen2Button.linkProperty("Visibility",  function() { return (!parent.cordova&&!iOS); } ); // HtmlView Page linking property 'Visibility' for element 'FullScreen2Button'
          _view.FullScreen2Button.linkProperty("Disabled",  function() { return _isPlaying; } ); // HtmlView Page linking property 'Disabled' for element 'FullScreen2Button'
          _view.FullScreen2Button.setAction("OnClick", function(_data,_info) {
  _pause();
  toggleFullScreen();

}); // HtmlView Page setting action 'OnClick' for element 'FullScreen2Button'
          _view.plottingPanel.linkProperty("Height",  function() { return changeOrientation(); }, function(_v) { changeOrientation() = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return Width1; }, function(_v) { Width1 = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Visibility",  function() { return world===true; } ); // HtmlView Page linking property 'Visibility' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TLMessage",  function() { return text; }, function(_v) { text = _v; } ); // HtmlView Page linking property 'TLMessage' for element 'plottingPanel'
          _view.group2right.linkProperty("X",  function() { return x2; }, function(_v) { x2 = _v; } ); // HtmlView Page linking property 'X' for element 'group2right'
          _view.circle.linkProperty("Visibility",  function() { return circleshow; }, function(_v) { circleshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'circle'
          _view.visbleforrestasfullhasline.linkProperty("Visibility",  function() { return option2/option2d<1||(option2!=1&&option2d!=1); } ); // HtmlView Page linking property 'Visibility' for element 'visbleforrestasfullhasline'
          _view.correctcirclearraynotfull2.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'correctcirclearraynotfull2'
          _view.correctcirclearraynotfull2.linkProperty("FillColor",  function() { return fillcolor2a; }, function(_v) { fillcolor2a = _v; } ); // HtmlView Page linking property 'FillColor' for element 'correctcirclearraynotfull2'
          _view.correctcirclearraynotfull2.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'correctcirclearraynotfull2'
          _view.correctcirclearraynotfull2.linkProperty("Attributes",  function() { return attributes2[1]; } ); // HtmlView Page linking property 'Attributes' for element 'correctcirclearraynotfull2'
          _view.appearswhen2nominator2.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen2nominator2'
          _view.appearswhen2nominator2.linkProperty("FillColor",  function() { return fillcolor12a; }, function(_v) { fillcolor12a = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen2nominator2'
          _view.appearswhen2nominator2.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen2nominator2'
          _view.appearswhen2nominator2.linkProperty("Transformation",  function() { return angle2; }, function(_v) { angle2 = _v; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen2nominator2'
          _view.appearswhen2nominator2.linkProperty("Attributes",  function() { return attributes2[2]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen2nominator2'
          _view.appearswhen2nominator2.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen2nominator2'
          _view.appearswhen3nominator2.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen3nominator2'
          _view.appearswhen3nominator2.linkProperty("FillColor",  function() { return fillcolor32; }, function(_v) { fillcolor32 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen3nominator2'
          _view.appearswhen3nominator2.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen3nominator2'
          _view.appearswhen3nominator2.linkProperty("Transformation",  function() { return angle2*2; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen3nominator2'
          _view.appearswhen3nominator2.linkProperty("Attributes",  function() { return attributes2[3]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen3nominator2'
          _view.appearswhen3nominator2.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen3nominator2'
          _view.appearswhen4nominator2.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen4nominator2'
          _view.appearswhen4nominator2.linkProperty("FillColor",  function() { return fillcolor42; }, function(_v) { fillcolor42 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen4nominator2'
          _view.appearswhen4nominator2.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen4nominator2'
          _view.appearswhen4nominator2.linkProperty("Transformation",  function() { return angle2*3; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen4nominator2'
          _view.appearswhen4nominator2.linkProperty("Attributes",  function() { return attributes2[4]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen4nominator2'
          _view.appearswhen4nominator2.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen4nominator2'
          _view.appearswhen5nominator2.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen5nominator2'
          _view.appearswhen5nominator2.linkProperty("FillColor",  function() { return fillcolor52; }, function(_v) { fillcolor52 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen5nominator2'
          _view.appearswhen5nominator2.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen5nominator2'
          _view.appearswhen5nominator2.linkProperty("Transformation",  function() { return angle2*4; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen5nominator2'
          _view.appearswhen5nominator2.linkProperty("Attributes",  function() { return attributes2[5]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen5nominator2'
          _view.appearswhen5nominator2.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen5nominator2'
          _view.appearswhen6nominator22.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen6nominator22'
          _view.appearswhen6nominator22.linkProperty("FillColor",  function() { return fillcolor62; }, function(_v) { fillcolor62 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen6nominator22'
          _view.appearswhen6nominator22.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen6nominator22'
          _view.appearswhen6nominator22.linkProperty("Transformation",  function() { return angle2*5; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen6nominator22'
          _view.appearswhen6nominator22.linkProperty("Attributes",  function() { return attributes2[6]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen6nominator22'
          _view.appearswhen6nominator22.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen6nominator22'
          _view.appearswhen7nominator222.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen7nominator222'
          _view.appearswhen7nominator222.linkProperty("FillColor",  function() { return fillcolor72; }, function(_v) { fillcolor72 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen7nominator222'
          _view.appearswhen7nominator222.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen7nominator222'
          _view.appearswhen7nominator222.linkProperty("Transformation",  function() { return angle2*6; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen7nominator222'
          _view.appearswhen7nominator222.linkProperty("Attributes",  function() { return attributes2[7]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen7nominator222'
          _view.appearswhen7nominator222.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen7nominator222'
          _view.appearswhen8nominator2226.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator2226'
          _view.appearswhen8nominator2226.linkProperty("FillColor",  function() { return fillcolor82; }, function(_v) { fillcolor82 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator2226'
          _view.appearswhen8nominator2226.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator2226'
          _view.appearswhen8nominator2226.linkProperty("Transformation",  function() { return angle2*7; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator2226'
          _view.appearswhen8nominator2226.linkProperty("Attributes",  function() { return attributes2[8]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator2226'
          _view.appearswhen8nominator2226.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator2226'
          _view.appearswhen8nominator22222.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator22222'
          _view.appearswhen8nominator22222.linkProperty("FillColor",  function() { return fillcolor92; }, function(_v) { fillcolor92 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator22222'
          _view.appearswhen8nominator22222.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator22222'
          _view.appearswhen8nominator22222.linkProperty("Transformation",  function() { return angle2*8; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator22222'
          _view.appearswhen8nominator22222.linkProperty("Attributes",  function() { return attributes2[9]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator22222'
          _view.appearswhen8nominator22222.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator22222'
          _view.appearswhen8nominator22232.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator22232'
          _view.appearswhen8nominator22232.linkProperty("FillColor",  function() { return fillcolor102; }, function(_v) { fillcolor102 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator22232'
          _view.appearswhen8nominator22232.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator22232'
          _view.appearswhen8nominator22232.linkProperty("Transformation",  function() { return angle2*9; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator22232'
          _view.appearswhen8nominator22232.linkProperty("Attributes",  function() { return attributes2[10]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator22232'
          _view.appearswhen8nominator22232.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator22232'
          _view.appearswhen8nominator22242.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator22242'
          _view.appearswhen8nominator22242.linkProperty("FillColor",  function() { return fillcolor112; }, function(_v) { fillcolor112 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator22242'
          _view.appearswhen8nominator22242.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator22242'
          _view.appearswhen8nominator22242.linkProperty("Transformation",  function() { return angle2*10; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator22242'
          _view.appearswhen8nominator22242.linkProperty("Attributes",  function() { return attributes2[11]; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator22242'
          _view.appearswhen8nominator22242.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator22242'
          _view.appearswhen8nominator22252.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator22252'
          _view.appearswhen8nominator22252.linkProperty("FillColor",  function() { return fillcolor122; }, function(_v) { fillcolor122 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator22252'
          _view.appearswhen8nominator22252.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator22252'
          _view.appearswhen8nominator22252.linkProperty("Transformation",  function() { return angle2*11; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator22252'
          _view.appearswhen8nominator22252.linkProperty("Attributes",  function() { return attributes2[12]; }, function(_v) { attributes2[12] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator22252'
          _view.appearswhen8nominator22252.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator22252'
          _view.one3piece2.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece2'
          _view.one3piece2.linkProperty("FillColor",  function() { return fillcolor132; }, function(_v) { fillcolor132 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece2'
          _view.one3piece2.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece2'
          _view.one3piece2.linkProperty("Transformation",  function() { return angle2*12; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece2'
          _view.one3piece2.linkProperty("Attributes",  function() { return attributes2[13]; }, function(_v) { attributes2[13] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece2'
          _view.one3piece2.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece2'
          _view.one3piece3.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece3'
          _view.one3piece3.linkProperty("FillColor",  function() { return fillcolor142; }, function(_v) { fillcolor142 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece3'
          _view.one3piece3.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece3'
          _view.one3piece3.linkProperty("Transformation",  function() { return angle2*13; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece3'
          _view.one3piece3.linkProperty("Attributes",  function() { return attributes2[14]; }, function(_v) { attributes2[14] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece3'
          _view.one3piece3.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece3'
          _view.one3piece4.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece4'
          _view.one3piece4.linkProperty("FillColor",  function() { return fillcolor152; }, function(_v) { fillcolor152 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece4'
          _view.one3piece4.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece4'
          _view.one3piece4.linkProperty("Transformation",  function() { return angle2*14; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece4'
          _view.one3piece4.linkProperty("Attributes",  function() { return attributes2[15]; }, function(_v) { attributes2[15] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece4'
          _view.one3piece4.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece4'
          _view.one3piece5.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece5'
          _view.one3piece5.linkProperty("FillColor",  function() { return fillcolor162; }, function(_v) { fillcolor162 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece5'
          _view.one3piece5.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece5'
          _view.one3piece5.linkProperty("Transformation",  function() { return angle2*15; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece5'
          _view.one3piece5.linkProperty("Attributes",  function() { return attributes2[16]; }, function(_v) { attributes2[16] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece5'
          _view.one3piece5.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece5'
          _view.one3piece6.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece6'
          _view.one3piece6.linkProperty("FillColor",  function() { return fillcolor172; }, function(_v) { fillcolor172 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece6'
          _view.one3piece6.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece6'
          _view.one3piece6.linkProperty("Transformation",  function() { return angle2*16; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece6'
          _view.one3piece6.linkProperty("Attributes",  function() { return attributes2[17]; }, function(_v) { attributes2[17] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece6'
          _view.one3piece6.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece6'
          _view.one3piece7.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece7'
          _view.one3piece7.linkProperty("FillColor",  function() { return fillcolor182; }, function(_v) { fillcolor182 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece7'
          _view.one3piece7.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece7'
          _view.one3piece7.linkProperty("Transformation",  function() { return angle2*17; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece7'
          _view.one3piece7.linkProperty("Attributes",  function() { return attributes2[18]; }, function(_v) { attributes2[18] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece7'
          _view.one3piece7.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece7'
          _view.one3piece8.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece8'
          _view.one3piece8.linkProperty("FillColor",  function() { return fillcolor192; }, function(_v) { fillcolor192 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece8'
          _view.one3piece8.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece8'
          _view.one3piece8.linkProperty("Transformation",  function() { return angle2*18; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece8'
          _view.one3piece8.linkProperty("Attributes",  function() { return attributes2[19]; }, function(_v) { attributes2[19] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece8'
          _view.one3piece8.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece8'
          _view.one3piece.linkProperty("PointsY",  function() { return [0,py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'one3piece'
          _view.one3piece.linkProperty("FillColor",  function() { return fillcolor202; }, function(_v) { fillcolor202 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'one3piece'
          _view.one3piece.linkProperty("PointsX",  function() { return [0,px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'one3piece'
          _view.one3piece.linkProperty("Transformation",  function() { return angle2*19; } ); // HtmlView Page linking property 'Transformation' for element 'one3piece'
          _view.one3piece.linkProperty("Attributes",  function() { return attributes2[20]; }, function(_v) { attributes2[20] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'one3piece'
          _view.one3piece.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'one3piece'
          _view.visiblewhen1.linkProperty("Visibility",  function() { return option2==1&&option2d==1; } ); // HtmlView Page linking property 'Visibility' for element 'visiblewhen1'
          _view.correctcirclearrayfullcircle2.linkProperty("PointsY",  function() { return [py2[0],py2[1],py2[2],py2[3],py2[4],py2[5],py2[6],py2[7],py2[8],py2[9],py2[10],py2[11],py2[12],py2[13],py2[14],py2[15],py2[16],py2[17],py2[18],py2[19],py2[20],py2[21],py2[22],py2[23],py2[24],py2[25],py2[26],py2[27],py2[28],py2[29],py2[30],py2[31],py2[32],py2[33],py2[34],py2[35],py2[36],py2[37],py2[38],py2[39],py2[40],py2[41],py2[42],py2[43],py2[44],py2[45],py2[46],py2[47],py2[48],py2[49],py2[50],py2[51],py2[52],py2[53],py2[54],py2[55],py2[56],py2[57],py2[58],py2[59],py2[60],py2[61],py2[62],py2[63],py2[64],py2[65],py2[66],py2[67],py2[68],py2[69],py2[70],py2[71],py2[72],py2[73],py2[74],py2[75],py2[76],py2[77],py2[78],py2[79],py2[80],py2[81],py2[82],py2[83],py2[84],py2[85],py2[86],py2[87],py2[88],py2[89],py2[90],py2[91],py2[92],py2[93],py2[94],py2[95],py2[96],py2[97],py2[98],py2[99],py2[100]]; } ); // HtmlView Page linking property 'PointsY' for element 'correctcirclearrayfullcircle2'
          _view.correctcirclearrayfullcircle2.linkProperty("PointsX",  function() { return [px2[0],px2[1],px2[2],px2[3],px2[4],px2[5],px2[6],px2[7],px2[8],px2[9],px2[10],px2[11],px2[12],px2[13],px2[14],px2[15],px2[16],px2[17],px2[18],px2[19],px2[20],px2[21],px2[22],px2[23],px2[24],px2[25],px2[26],px2[27],px2[28],px2[29],px2[30],px2[31],px2[32],px2[33],px2[34],px2[35],px2[36],px2[37],px2[38],px2[39],px2[40],px2[41],px2[42],px2[43],px2[44],px2[45],px2[46],px2[47],px2[48],px2[49],px2[50],px2[51],px2[52],px2[53],px2[54],px2[55],px2[56],px2[57],px2[58],px2[59],px2[60],px2[61],px2[62],px2[63],px2[64],px2[65],px2[66],px2[67],px2[68],px2[69],px2[70],px2[71],px2[72],px2[73],px2[74],px2[75],px2[76],px2[77],px2[78],px2[79],px2[80],px2[81],px2[82],px2[83],px2[84],px2[85],px2[86],px2[87],px2[88],px2[89],px2[90],px2[91],px2[92],px2[93],px2[94],px2[95],px2[96],px2[97],px2[98],px2[99],px2[100]]; } ); // HtmlView Page linking property 'PointsX' for element 'correctcirclearrayfullcircle2'
          _view.correctcirclearrayfullcircle2.linkProperty("Visibility",  function() { return option2/option2d==1; } ); // HtmlView Page linking property 'Visibility' for element 'correctcirclearrayfullcircle2'
          _view.rectblock2right.linkProperty("Visibility",  function() { return rectangleshow; }, function(_v) { rectangleshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'rectblock2right'
          _view.shapeSet2.linkProperty("NumberOfElements",  function() { return option2d; }, function(_v) { option2d = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("FillColor",  function() { return fillcolorrect2; }, function(_v) { fillcolorrect2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("Attributes",  function() { return attributesrect2; }, function(_v) { attributesrect2 = _v; } ); // HtmlView Page linking property 'Attributes' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("SizeX",  function() { return sizexrect2; }, function(_v) { sizexrect2 = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("X",  function() { return xrect2; }, function(_v) { xrect2 = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("Y",  function() { return yrect2; }, function(_v) { yrect2 = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'shapeSet2'
          _view.shapeSet2.linkProperty("SizeY",  function() { return sizeyrect2; }, function(_v) { sizeyrect2 = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet2'
          _view.bigrect2.linkProperty("FillColor",  function() { return fillcolor1; }, function(_v) { fillcolor1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'bigrect2'
          _view.bigrect2.linkProperty("X",  function() { return xrect[0]; } ); // HtmlView Page linking property 'X' for element 'bigrect2'
          _view.bigrect2.linkProperty("Y",  function() { return yrect[0]; } ); // HtmlView Page linking property 'Y' for element 'bigrect2'
          _view.rectblock2rightH.linkProperty("Visibility",  function() { return rectangleshowh; }, function(_v) { rectangleshowh = _v; } ); // HtmlView Page linking property 'Visibility' for element 'rectblock2rightH'
          _view.shapeSet22.linkProperty("NumberOfElements",  function() { return option2d; }, function(_v) { option2d = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("FillColor",  function() { return fillcolorrect2; }, function(_v) { fillcolorrect2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("Attributes",  function() { return attributesrect2; }, function(_v) { attributesrect2 = _v; } ); // HtmlView Page linking property 'Attributes' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("SizeX",  function() { return sizexrect2h; }, function(_v) { sizexrect2h = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("X",  function() { return xrect2h; }, function(_v) { xrect2h = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("Y",  function() { return yrect2h; }, function(_v) { yrect2h = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("Visibility",  function() { return option2/option2d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'shapeSet22'
          _view.shapeSet22.linkProperty("SizeY",  function() { return sizeyrect2h; }, function(_v) { sizeyrect2h = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet22'
          _view.bigrect22.linkProperty("FillColor",  function() { return fillcolor1; }, function(_v) { fillcolor1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'bigrect22'
          _view.bigrect22.linkProperty("X",  function() { return xrect[0]; } ); // HtmlView Page linking property 'X' for element 'bigrect22'
          _view.bigrect22.linkProperty("Y",  function() { return yrect[0]; } ); // HtmlView Page linking property 'Y' for element 'bigrect22'
          _view.group1left.linkProperty("X",  function() { return x1; }, function(_v) { x1 = _v; } ); // HtmlView Page linking property 'X' for element 'group1left'
          _view.circle2.linkProperty("Transformation",  function() { return transformation; }, function(_v) { transformation = _v; } ); // HtmlView Page linking property 'Transformation' for element 'circle2'
          _view.circle2.linkProperty("Visibility",  function() { return circleshow; }, function(_v) { circleshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'circle2'
          _view.visiblefornon1.linkProperty("Visibility",  function() { return option/option1d<1||(option!=1&&option1d!=1); } ); // HtmlView Page linking property 'Visibility' for element 'visiblefornon1'
          _view.correctcirclearraynotfull.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'correctcirclearraynotfull'
          _view.correctcirclearraynotfull.linkProperty("FillColor",  function() { return fillcolor1; }, function(_v) { fillcolor1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'correctcirclearraynotfull'
          _view.correctcirclearraynotfull.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'correctcirclearraynotfull'
          _view.correctcirclearraynotfull.linkProperty("Attributes",  function() { return attributes[1]; } ); // HtmlView Page linking property 'Attributes' for element 'correctcirclearraynotfull'
          _view.appearswhen2nominator.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen2nominator'
          _view.appearswhen2nominator.linkProperty("FillColor",  function() { return fillcolor2; }, function(_v) { fillcolor2 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen2nominator'
          _view.appearswhen2nominator.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen2nominator'
          _view.appearswhen2nominator.linkProperty("Transformation",  function() { return angle; }, function(_v) { angle = _v; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen2nominator'
          _view.appearswhen2nominator.linkProperty("Attributes",  function() { return attributes[2]; }, function(_v) { attributes[2] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen2nominator'
          _view.appearswhen2nominator.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen2nominator'
          _view.appearswhen3nominator.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen3nominator'
          _view.appearswhen3nominator.linkProperty("FillColor",  function() { return fillcolor3; }, function(_v) { fillcolor3 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen3nominator'
          _view.appearswhen3nominator.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen3nominator'
          _view.appearswhen3nominator.linkProperty("Transformation",  function() { return angle*2; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen3nominator'
          _view.appearswhen3nominator.linkProperty("Attributes",  function() { return attributes[3]; }, function(_v) { attributes[3] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen3nominator'
          _view.appearswhen3nominator.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen3nominator'
          _view.appearswhen4nominator.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen4nominator'
          _view.appearswhen4nominator.linkProperty("FillColor",  function() { return fillcolor4; }, function(_v) { fillcolor4 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen4nominator'
          _view.appearswhen4nominator.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen4nominator'
          _view.appearswhen4nominator.linkProperty("Transformation",  function() { return angle*3; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen4nominator'
          _view.appearswhen4nominator.linkProperty("Attributes",  function() { return attributes[4]; }, function(_v) { attributes[4] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen4nominator'
          _view.appearswhen4nominator.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen4nominator'
          _view.appearswhen5nominator.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen5nominator'
          _view.appearswhen5nominator.linkProperty("FillColor",  function() { return fillcolor5; }, function(_v) { fillcolor5 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen5nominator'
          _view.appearswhen5nominator.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen5nominator'
          _view.appearswhen5nominator.linkProperty("Transformation",  function() { return angle*4; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen5nominator'
          _view.appearswhen5nominator.linkProperty("Attributes",  function() { return attributes[5]; }, function(_v) { attributes[5] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen5nominator'
          _view.appearswhen5nominator.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen5nominator'
          _view.appearswhen6nominator2.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen6nominator2'
          _view.appearswhen6nominator2.linkProperty("FillColor",  function() { return fillcolor6; }, function(_v) { fillcolor6 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen6nominator2'
          _view.appearswhen6nominator2.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen6nominator2'
          _view.appearswhen6nominator2.linkProperty("Transformation",  function() { return angle*5; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen6nominator2'
          _view.appearswhen6nominator2.linkProperty("Attributes",  function() { return attributes[6]; }, function(_v) { attributes[6] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen6nominator2'
          _view.appearswhen6nominator2.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen6nominator2'
          _view.appearswhen7nominator22.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen7nominator22'
          _view.appearswhen7nominator22.linkProperty("FillColor",  function() { return fillcolor7; }, function(_v) { fillcolor7 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen7nominator22'
          _view.appearswhen7nominator22.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen7nominator22'
          _view.appearswhen7nominator22.linkProperty("Transformation",  function() { return angle*6; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen7nominator22'
          _view.appearswhen7nominator22.linkProperty("Attributes",  function() { return attributes[7]; }, function(_v) { attributes[7] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen7nominator22'
          _view.appearswhen7nominator22.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen7nominator22'
          _view.appearswhen8nominator222.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator222'
          _view.appearswhen8nominator222.linkProperty("FillColor",  function() { return fillcolor8; }, function(_v) { fillcolor8 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator222'
          _view.appearswhen8nominator222.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator222'
          _view.appearswhen8nominator222.linkProperty("Transformation",  function() { return angle*7; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator222'
          _view.appearswhen8nominator222.linkProperty("Attributes",  function() { return attributes[8]; }, function(_v) { attributes[8] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator222'
          _view.appearswhen8nominator222.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator222'
          _view.appearswhen8nominator2225.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator2225'
          _view.appearswhen8nominator2225.linkProperty("FillColor",  function() { return fillcolor12; }, function(_v) { fillcolor12 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator2225'
          _view.appearswhen8nominator2225.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator2225'
          _view.appearswhen8nominator2225.linkProperty("Transformation",  function() { return angle*11; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator2225'
          _view.appearswhen8nominator2225.linkProperty("Attributes",  function() { return attributes[12]; }, function(_v) { attributes[12] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator2225'
          _view.appearswhen8nominator2225.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator2225'
          _view.appearswhen8nominator2222.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator2222'
          _view.appearswhen8nominator2222.linkProperty("FillColor",  function() { return fillcolor9; }, function(_v) { fillcolor9 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator2222'
          _view.appearswhen8nominator2222.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator2222'
          _view.appearswhen8nominator2222.linkProperty("Transformation",  function() { return angle*8; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator2222'
          _view.appearswhen8nominator2222.linkProperty("Attributes",  function() { return attributes[9]; }, function(_v) { attributes[9] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator2222'
          _view.appearswhen8nominator2222.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator2222'
          _view.appearswhen8nominator2223.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator2223'
          _view.appearswhen8nominator2223.linkProperty("FillColor",  function() { return fillcolor10; }, function(_v) { fillcolor10 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator2223'
          _view.appearswhen8nominator2223.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator2223'
          _view.appearswhen8nominator2223.linkProperty("Transformation",  function() { return angle*9; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator2223'
          _view.appearswhen8nominator2223.linkProperty("Attributes",  function() { return attributes[10]; }, function(_v) { attributes[10] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator2223'
          _view.appearswhen8nominator2223.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator2223'
          _view.appearswhen8nominator22243.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'appearswhen8nominator22243'
          _view.appearswhen8nominator22243.linkProperty("FillColor",  function() { return fillcolor11; }, function(_v) { fillcolor11 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'appearswhen8nominator22243'
          _view.appearswhen8nominator22243.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'appearswhen8nominator22243'
          _view.appearswhen8nominator22243.linkProperty("Transformation",  function() { return angle*10; } ); // HtmlView Page linking property 'Transformation' for element 'appearswhen8nominator22243'
          _view.appearswhen8nominator22243.linkProperty("Attributes",  function() { return attributes[11]; }, function(_v) { attributes[11] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'appearswhen8nominator22243'
          _view.appearswhen8nominator22243.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'appearswhen8nominator22243'
          _view.notrequiredwerid.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'notrequiredwerid'
          _view.notrequiredwerid.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'notrequiredwerid'
          _view.notrequiredwerid.linkProperty("Transformation",  function() { return angle*11; } ); // HtmlView Page linking property 'Transformation' for element 'notrequiredwerid'
          _view.notrequiredwerid.linkProperty("Attributes",  function() { return attributes[12]; }, function(_v) { attributes[12] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'notrequiredwerid'
          _view.ONE133.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE133'
          _view.ONE133.linkProperty("FillColor",  function() { return fillcolor13; }, function(_v) { fillcolor13 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE133'
          _view.ONE133.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE133'
          _view.ONE133.linkProperty("Transformation",  function() { return angle*12; } ); // HtmlView Page linking property 'Transformation' for element 'ONE133'
          _view.ONE133.linkProperty("Attributes",  function() { return attributes[13]; }, function(_v) { attributes[13] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE133'
          _view.ONE133.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE133'
          _view.ONE134.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE134'
          _view.ONE134.linkProperty("FillColor",  function() { return fillcolor14; }, function(_v) { fillcolor14 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE134'
          _view.ONE134.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE134'
          _view.ONE134.linkProperty("Transformation",  function() { return angle*13; } ); // HtmlView Page linking property 'Transformation' for element 'ONE134'
          _view.ONE134.linkProperty("Attributes",  function() { return attributes[14]; }, function(_v) { attributes[14] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE134'
          _view.ONE134.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE134'
          _view.ONE135.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE135'
          _view.ONE135.linkProperty("FillColor",  function() { return fillcolor15; }, function(_v) { fillcolor15 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE135'
          _view.ONE135.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE135'
          _view.ONE135.linkProperty("Transformation",  function() { return angle*14; } ); // HtmlView Page linking property 'Transformation' for element 'ONE135'
          _view.ONE135.linkProperty("Attributes",  function() { return attributes[15]; }, function(_v) { attributes[15] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE135'
          _view.ONE135.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE135'
          _view.ONE136.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE136'
          _view.ONE136.linkProperty("FillColor",  function() { return fillcolor16; }, function(_v) { fillcolor16 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE136'
          _view.ONE136.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE136'
          _view.ONE136.linkProperty("Transformation",  function() { return angle*15; } ); // HtmlView Page linking property 'Transformation' for element 'ONE136'
          _view.ONE136.linkProperty("Attributes",  function() { return attributes[16]; }, function(_v) { attributes[16] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE136'
          _view.ONE136.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE136'
          _view.ONE137.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE137'
          _view.ONE137.linkProperty("FillColor",  function() { return fillcolor17; }, function(_v) { fillcolor17 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE137'
          _view.ONE137.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE137'
          _view.ONE137.linkProperty("Transformation",  function() { return angle*16; } ); // HtmlView Page linking property 'Transformation' for element 'ONE137'
          _view.ONE137.linkProperty("Attributes",  function() { return attributes[17]; }, function(_v) { attributes[17] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE137'
          _view.ONE137.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE137'
          _view.ONE138.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE138'
          _view.ONE138.linkProperty("FillColor",  function() { return fillcolor18; }, function(_v) { fillcolor18 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE138'
          _view.ONE138.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE138'
          _view.ONE138.linkProperty("Transformation",  function() { return angle*17; } ); // HtmlView Page linking property 'Transformation' for element 'ONE138'
          _view.ONE138.linkProperty("Attributes",  function() { return attributes[18]; }, function(_v) { attributes[18] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE138'
          _view.ONE138.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE138'
          _view.ONE139.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE139'
          _view.ONE139.linkProperty("FillColor",  function() { return fillcolor19; }, function(_v) { fillcolor19 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE139'
          _view.ONE139.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE139'
          _view.ONE139.linkProperty("Transformation",  function() { return angle*18; } ); // HtmlView Page linking property 'Transformation' for element 'ONE139'
          _view.ONE139.linkProperty("Attributes",  function() { return attributes[19]; }, function(_v) { attributes[19] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE139'
          _view.ONE139.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE139'
          _view.ONE13.linkProperty("PointsY",  function() { return [0,py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100],0]; } ); // HtmlView Page linking property 'PointsY' for element 'ONE13'
          _view.ONE13.linkProperty("FillColor",  function() { return fillcolor20; }, function(_v) { fillcolor20 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'ONE13'
          _view.ONE13.linkProperty("PointsX",  function() { return [0,px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100],0]; } ); // HtmlView Page linking property 'PointsX' for element 'ONE13'
          _view.ONE13.linkProperty("Transformation",  function() { return angle*19; } ); // HtmlView Page linking property 'Transformation' for element 'ONE13'
          _view.ONE13.linkProperty("Attributes",  function() { return attributes[20]; }, function(_v) { attributes[20] = _v; } ); // HtmlView Page linking property 'Attributes' for element 'ONE13'
          _view.ONE13.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'ONE13'
          _view.false.linkProperty("Visibility",  function() { return option==1&&option1d==1; } ); // HtmlView Page linking property 'Visibility' for element 'false'
          _view.correctcirclearrayfullcircle.linkProperty("PointsY",  function() { return [py[0],py[1],py[2],py[3],py[4],py[5],py[6],py[7],py[8],py[9],py[10],py[11],py[12],py[13],py[14],py[15],py[16],py[17],py[18],py[19],py[20],py[21],py[22],py[23],py[24],py[25],py[26],py[27],py[28],py[29],py[30],py[31],py[32],py[33],py[34],py[35],py[36],py[37],py[38],py[39],py[40],py[41],py[42],py[43],py[44],py[45],py[46],py[47],py[48],py[49],py[50],py[51],py[52],py[53],py[54],py[55],py[56],py[57],py[58],py[59],py[60],py[61],py[62],py[63],py[64],py[65],py[66],py[67],py[68],py[69],py[70],py[71],py[72],py[73],py[74],py[75],py[76],py[77],py[78],py[79],py[80],py[81],py[82],py[83],py[84],py[85],py[86],py[87],py[88],py[89],py[90],py[91],py[92],py[93],py[94],py[95],py[96],py[97],py[98],py[99],py[100]]; } ); // HtmlView Page linking property 'PointsY' for element 'correctcirclearrayfullcircle'
          _view.correctcirclearrayfullcircle.linkProperty("PointsX",  function() { return [px[0],px[1],px[2],px[3],px[4],px[5],px[6],px[7],px[8],px[9],px[10],px[11],px[12],px[13],px[14],px[15],px[16],px[17],px[18],px[19],px[20],px[21],px[22],px[23],px[24],px[25],px[26],px[27],px[28],px[29],px[30],px[31],px[32],px[33],px[34],px[35],px[36],px[37],px[38],px[39],px[40],px[41],px[42],px[43],px[44],px[45],px[46],px[47],px[48],px[49],px[50],px[51],px[52],px[53],px[54],px[55],px[56],px[57],px[58],px[59],px[60],px[61],px[62],px[63],px[64],px[65],px[66],px[67],px[68],px[69],px[70],px[71],px[72],px[73],px[74],px[75],px[76],px[77],px[78],px[79],px[80],px[81],px[82],px[83],px[84],px[85],px[86],px[87],px[88],px[89],px[90],px[91],px[92],px[93],px[94],px[95],px[96],px[97],px[98],px[99],px[100]]; } ); // HtmlView Page linking property 'PointsX' for element 'correctcirclearrayfullcircle'
          _view.rectblock2left.linkProperty("Visibility",  function() { return rectangleshow; }, function(_v) { rectangleshow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'rectblock2left'
          _view.shapeSet.linkProperty("NumberOfElements",  function() { return option1d; }, function(_v) { option1d = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet'
          _view.shapeSet.linkProperty("FillColor",  function() { return fillcolorrect; }, function(_v) { fillcolorrect = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shapeSet'
          _view.shapeSet.linkProperty("Attributes",  function() { return attributesrect; }, function(_v) { attributesrect = _v; } ); // HtmlView Page linking property 'Attributes' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeX",  function() { return sizexrect; }, function(_v) { sizexrect = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet'
          _view.shapeSet.linkProperty("X",  function() { return xrect; }, function(_v) { xrect = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet'
          _view.shapeSet.linkProperty("Y",  function() { return yrect; }, function(_v) { yrect = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet'
          _view.shapeSet.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'shapeSet'
          _view.shapeSet.linkProperty("SizeY",  function() { return sizeyrect; }, function(_v) { sizeyrect = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet'
          _view.bigrect.linkProperty("FillColor",  function() { return fillcolor1; }, function(_v) { fillcolor1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'bigrect'
          _view.bigrect.linkProperty("X",  function() { return xrect[0]; } ); // HtmlView Page linking property 'X' for element 'bigrect'
          _view.bigrect.linkProperty("Y",  function() { return yrect[0]; } ); // HtmlView Page linking property 'Y' for element 'bigrect'
          _view.rectblock2leftHorizontal.linkProperty("Visibility",  function() { return rectangleshowh; }, function(_v) { rectangleshowh = _v; } ); // HtmlView Page linking property 'Visibility' for element 'rectblock2leftHorizontal'
          _view.shapeSet3.linkProperty("NumberOfElements",  function() { return option1d; }, function(_v) { option1d = _v; } ); // HtmlView Page linking property 'NumberOfElements' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("FillColor",  function() { return fillcolorrect; }, function(_v) { fillcolorrect = _v; } ); // HtmlView Page linking property 'FillColor' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("Attributes",  function() { return attributesrect; }, function(_v) { attributesrect = _v; } ); // HtmlView Page linking property 'Attributes' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("SizeX",  function() { return sizexrecth; }, function(_v) { sizexrecth = _v; } ); // HtmlView Page linking property 'SizeX' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("X",  function() { return xrecth; }, function(_v) { xrecth = _v; } ); // HtmlView Page linking property 'X' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("Y",  function() { return yrecth; }, function(_v) { yrecth = _v; } ); // HtmlView Page linking property 'Y' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("Visibility",  function() { return option/option1d<=1; } ); // HtmlView Page linking property 'Visibility' for element 'shapeSet3'
          _view.shapeSet3.linkProperty("SizeY",  function() { return sizeyrecth; }, function(_v) { sizeyrecth = _v; } ); // HtmlView Page linking property 'SizeY' for element 'shapeSet3'
          _view.bigrect3.linkProperty("FillColor",  function() { return fillcolor1; }, function(_v) { fillcolor1 = _v; } ); // HtmlView Page linking property 'FillColor' for element 'bigrect3'
          _view.bigrect3.linkProperty("X",  function() { return xrect[0]; } ); // HtmlView Page linking property 'X' for element 'bigrect3'
          _view.bigrect3.linkProperty("Y",  function() { return yrect[0]; } ); // HtmlView Page linking property 'Y' for element 'bigrect3'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(20);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function addfractions_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = addfractions_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._2(_codebasePath);

  if (_libraryPath) _view._4(_libraryPath);


  return _view;
} // end of main function

function addfractions_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._1();
    _view._9(EJSS_INTERFACE.panel,"fullscreen", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'fullscreen'
      ;

    _view._9(EJSS_INTERFACE.panel,"control", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'control'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'control'
      ;

    _view._9(EJSS_INTERFACE.panel,"controlPanel", _view.control) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("CSS",{"display":"inline"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'controlPanel'
      ;

    _view._9(EJSS_INTERFACE.panel,"panel2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'panel2'
      .setProperty("CSS",{ "position": "absolute", "left":"0px" }) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'panel2'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel2'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"question", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'question'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'question'
      ;

    _view._9(EJSS_INTERFACE.panel,"panel3", _view.panel2) // EJsS HtmlView.HtmlView Page: declaration of element 'panel3'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel3'
      ;

    _view._9(EJSS_INTERFACE.panel,"fractions", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fractions'
      .setProperty("Font","normal normal 49px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'fractions'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'fractions'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"comboBox", _view.fractions) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox'
      .setProperty("Options",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBox'
      .setProperty("Tooltip","Numerator of fraction A") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'comboBox'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox'
      ;

    _view._9(EJSS_INTERFACE.separator,"separator", _view.fractions) // EJsS HtmlView.HtmlView Page: declaration of element 'separator'
      .setProperty("Width",3) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'separator'
      .setProperty("Background","Black") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'separator'
      .setProperty("Orientation","HORIZONTAL") // EJsS HtmlView.HtmlView Page: setting property 'Orientation' for element 'separator'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"comboBox1d", _view.fractions) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox1d'
      .setProperty("Options",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBox1d'
      .setProperty("Tooltip","Denominator of fraction A") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'comboBox1d'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox1d'
      ;

    _view._9(EJSS_INTERFACE.panel,"sign", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'sign'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"blank", _view.sign) // EJsS HtmlView.HtmlView Page: declaration of element 'blank'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'blank'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'blank'
      ;

    _view._9(EJSS_INTERFACE.imageAndTextButton,"minus", _view.sign) // EJsS HtmlView.HtmlView Page: declaration of element 'minus'
      .setProperty("Text","-") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'minus'
      ;

    _view._9(EJSS_INTERFACE.imageAndTextButton,"add", _view.sign) // EJsS HtmlView.HtmlView Page: declaration of element 'add'
      .setProperty("Text","+") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'add'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"blank2", _view.sign) // EJsS HtmlView.HtmlView Page: declaration of element 'blank2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'blank2'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'blank2'
      ;

    _view._9(EJSS_INTERFACE.panel,"words", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'words'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"blank3", _view.words) // EJsS HtmlView.HtmlView Page: declaration of element 'blank3'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'blank3'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'blank3'
      ;

    _view._9(EJSS_INTERFACE.imageAndTextButton,"less2", _view.words) // EJsS HtmlView.HtmlView Page: declaration of element 'less2'
      .setProperty("Text","substract") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'less2'
      ;

    _view._9(EJSS_INTERFACE.imageAndTextButton,"greater2", _view.words) // EJsS HtmlView.HtmlView Page: declaration of element 'greater2'
      .setProperty("Text","add") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'greater2'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"blank22", _view.words) // EJsS HtmlView.HtmlView Page: declaration of element 'blank22'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'blank22'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'blank22'
      ;

    _view._9(EJSS_INTERFACE.panel,"fractions2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fractions2'
      .setProperty("Font","normal normal 49px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'fractions2'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'fractions2'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"comboBox2", _view.fractions2) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox2'
      .setProperty("Options",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBox2'
      .setProperty("Tooltip","Numerator of fraction B") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'comboBox2'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox2'
      ;

    _view._9(EJSS_INTERFACE.separator,"separator2", _view.fractions2) // EJsS HtmlView.HtmlView Page: declaration of element 'separator2'
      .setProperty("Width",3) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'separator2'
      .setProperty("Background","Black") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'separator2'
      .setProperty("Orientation","HORIZONTAL") // EJsS HtmlView.HtmlView Page: setting property 'Orientation' for element 'separator2'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"comboBox2d", _view.fractions2) // EJsS HtmlView.HtmlView Page: declaration of element 'comboBox2d'
      .setProperty("Options",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'comboBox2d'
      .setProperty("Tooltip","Denominator of fraction B") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'comboBox2d'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'comboBox2d'
      ;

    _view._9(EJSS_INTERFACE.panel,"answer2", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'answer2'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'answer2'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"blank32", _view.answer2) // EJsS HtmlView.HtmlView Page: declaration of element 'blank32'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'blank32'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'blank32'
      ;

    _view._9(EJSS_INTERFACE.imageAndTextButton,"answer3222", _view.answer2) // EJsS HtmlView.HtmlView Page: declaration of element 'answer3222'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'answer3222'
      ;

    _view._9(EJSS_INTERFACE.comboBox,"blank222", _view.answer2) // EJsS HtmlView.HtmlView Page: declaration of element 'blank222'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'blank222'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'blank222'
      ;

    _view._9(EJSS_INTERFACE.panel,"panel4", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'panel4'
      .setProperty("CSS",{ "position": "absolute", "right":"0px" }) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'panel4'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'panel4'
      ;

    _view._9(EJSS_INTERFACE.twoStateButton,"equivalent", _view.panel4) // EJsS HtmlView.HtmlView Page: declaration of element 'equivalent'
      .setProperty("TextOn","equivalent") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'equivalent'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'equivalent'
      .setProperty("TextOff","back") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'equivalent'
      .setProperty("ImageOnUrl","/org/opensourcephysics/resources/controls/images/cycle.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOnUrl' for element 'equivalent'
      .setProperty("ImageOffUrl","/org/opensourcephysics/resources/controls/images/erase.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOffUrl' for element 'equivalent'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'equivalent'
      ;

    _view._9(EJSS_INTERFACE.twoStateButton,"playPauseButton2", _view.panel4) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton2'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton2'
      .setProperty("ImageOnUrl","/org/opensourcephysics/resources/controls/images/play.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOnUrl' for element 'playPauseButton2'
      .setProperty("ImageOffUrl","/org/opensourcephysics/resources/controls/images/pause.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOffUrl' for element 'playPauseButton2'
      ;

    _view._9(EJSS_INTERFACE.button,"resetButton2", _view.panel4) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton2'
      .setProperty("ImageUrl","/org/opensourcephysics/resources/controls/images/reset.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'resetButton2'
      ;

    _view._9(EJSS_INTERFACE.twoStateButton,"FullScreen2Button", _view.panel4) // EJsS HtmlView.HtmlView Page: declaration of element 'FullScreen2Button'
      .setProperty("Tooltip","Fullscreen ") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'FullScreen2Button'
      .setProperty("ImageOnUrl","/org/opensourcephysics/resources/controls/images/window.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOnUrl' for element 'FullScreen2Button'
      .setProperty("ImageOffUrl","/org/opensourcephysics/resources/controls/images/close.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOffUrl' for element 'FullScreen2Button'
      ;

    _view._9(EJSS_INTERFACE.panel,"panel", _view.fullscreen) // EJsS HtmlView.HtmlView Page: declaration of element 'panel'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'panel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'panel'
      ;

    _view._9(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.panel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'plottingPanel'
      .setProperty("MaximumY",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'plottingPanel'
      .setProperty("MaximumX",3) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("MinimumX",-3) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'plottingPanel'
      .setProperty("XTickStep",5) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'plottingPanel'
      .setProperty("MinimumY",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'plottingPanel'
      .setProperty("YTickStep",5) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._9(EJSS_DRAWING2D.group,"group2right", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'group2right'
      ;

    _view._9(EJSS_DRAWING2D.group,"circle", _view.group2right) // EJsS HtmlView.HtmlView Page: declaration of element 'circle'
      ;

    _view._9(EJSS_DRAWING2D.group,"visbleforrestasfullhasline", _view.circle) // EJsS HtmlView.HtmlView Page: declaration of element 'visbleforrestasfullhasline'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"correctcirclearraynotfull2", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'correctcirclearraynotfull2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'correctcirclearraynotfull2'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'correctcirclearraynotfull2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'correctcirclearraynotfull2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'correctcirclearraynotfull2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'correctcirclearraynotfull2'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'correctcirclearraynotfull2'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen2nominator2", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen2nominator2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen2nominator2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen2nominator2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen2nominator2'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen3nominator2", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen3nominator2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen3nominator2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen3nominator2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen3nominator2'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen4nominator2", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen4nominator2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen4nominator2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen4nominator2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen4nominator2'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen5nominator2", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen5nominator2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen5nominator2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen5nominator2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen5nominator2'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen6nominator22", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen6nominator22'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen6nominator22'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen6nominator22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen6nominator22'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen7nominator222", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen7nominator222'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen7nominator222'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen7nominator222'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen7nominator222'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator2226", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator2226'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator2226'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator2226'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator2226'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator22222", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator22222'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator22222'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator22222'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator22222'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator22232", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator22232'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator22232'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator22232'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator22232'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator22242", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator22242'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator22242'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator22242'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator22242'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator22252", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator22252'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator22252'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator22252'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator22252'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece2", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece2'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece3", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece3'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece3'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece3'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece3'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece4", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece4'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece4'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece4'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece4'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece5", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece5'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece5'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece5'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece5'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece6", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece6'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece6'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece6'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece6'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece7", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece7'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece7'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece7'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece7'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece8", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece8'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece8'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece8'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece8'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"one3piece", _view.visbleforrestasfullhasline) // EJsS HtmlView.HtmlView Page: declaration of element 'one3piece'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'one3piece'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'one3piece'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'one3piece'
      ;

    _view._9(EJSS_DRAWING2D.group,"visiblewhen1", _view.circle) // EJsS HtmlView.HtmlView Page: declaration of element 'visiblewhen1'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"correctcirclearrayfullcircle2", _view.visiblewhen1) // EJsS HtmlView.HtmlView Page: declaration of element 'correctcirclearrayfullcircle2'
      .setProperty("FillColor","rgba(0,255,0,0.5)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'correctcirclearrayfullcircle2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'correctcirclearrayfullcircle2'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'correctcirclearrayfullcircle2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'correctcirclearrayfullcircle2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'correctcirclearrayfullcircle2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'correctcirclearrayfullcircle2'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'correctcirclearrayfullcircle2'
      ;

    _view._9(EJSS_DRAWING2D.group,"rectblock2right", _view.group2right) // EJsS HtmlView.HtmlView Page: declaration of element 'rectblock2right'
      ;

    _view._9(EJSS_DRAWING2D.shapeSet,"shapeSet2", _view.rectblock2right) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet2'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'shapeSet2'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'shapeSet2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSet2'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shapeSet2'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet2'
      ;

    _view._9(EJSS_DRAWING2D.shape,"bigrect2", _view.rectblock2right) // EJsS HtmlView.HtmlView Page: declaration of element 'bigrect2'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'bigrect2'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'bigrect2'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'bigrect2'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'bigrect2'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'bigrect2'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'bigrect2'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bigrect2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'bigrect2'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'bigrect2'
      ;

    _view._9(EJSS_DRAWING2D.group,"rectblock2rightH", _view.group2right) // EJsS HtmlView.HtmlView Page: declaration of element 'rectblock2rightH'
      ;

    _view._9(EJSS_DRAWING2D.shapeSet,"shapeSet22", _view.rectblock2rightH) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet22'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'shapeSet22'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'shapeSet22'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet22'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSet22'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shapeSet22'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet22'
      ;

    _view._9(EJSS_DRAWING2D.shape,"bigrect22", _view.rectblock2rightH) // EJsS HtmlView.HtmlView Page: declaration of element 'bigrect22'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'bigrect22'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'bigrect22'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'bigrect22'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'bigrect22'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'bigrect22'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'bigrect22'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bigrect22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'bigrect22'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'bigrect22'
      ;

    _view._9(EJSS_DRAWING2D.group,"group1left", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'group1left'
      ;

    _view._9(EJSS_DRAWING2D.group,"circle2", _view.group1left) // EJsS HtmlView.HtmlView Page: declaration of element 'circle2'
      ;

    _view._9(EJSS_DRAWING2D.group,"visiblefornon1", _view.circle2) // EJsS HtmlView.HtmlView Page: declaration of element 'visiblefornon1'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"correctcirclearraynotfull", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'correctcirclearraynotfull'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'correctcirclearraynotfull'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'correctcirclearraynotfull'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'correctcirclearraynotfull'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'correctcirclearraynotfull'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'correctcirclearraynotfull'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'correctcirclearraynotfull'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen2nominator", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen2nominator'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen2nominator'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen2nominator'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen2nominator'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen3nominator", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen3nominator'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen3nominator'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen3nominator'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen3nominator'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen4nominator", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen4nominator'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen4nominator'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen4nominator'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen4nominator'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen5nominator", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen5nominator'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen5nominator'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen5nominator'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen5nominator'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen6nominator2", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen6nominator2'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen6nominator2'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen6nominator2'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen6nominator2'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen7nominator22", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen7nominator22'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen7nominator22'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen7nominator22'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen7nominator22'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator222", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator222'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator222'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator222'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator222'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator2225", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator2225'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator2225'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator2225'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator2225'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator2222", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator2222'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator2222'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator2222'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator2222'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator2223", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator2223'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator2223'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator2223'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator2223'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"appearswhen8nominator22243", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'appearswhen8nominator22243'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'appearswhen8nominator22243'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'appearswhen8nominator22243'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'appearswhen8nominator22243'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"notrequiredwerid", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'notrequiredwerid'
      .setProperty("FillColor","rgba(0,0,0,0.0)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'notrequiredwerid'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'notrequiredwerid'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'notrequiredwerid'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'notrequiredwerid'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE133", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE133'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE133'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE133'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE133'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE134", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE134'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE134'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE134'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE134'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE135", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE135'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE135'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE135'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE135'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE136", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE136'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE136'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE136'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE136'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE137", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE137'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE137'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE137'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE137'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE138", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE138'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE138'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE138'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE138'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE139", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE139'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE139'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE139'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE139'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"ONE13", _view.visiblefornon1) // EJsS HtmlView.HtmlView Page: declaration of element 'ONE13'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'ONE13'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'ONE13'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'ONE13'
      ;

    _view._9(EJSS_DRAWING2D.group,"false", _view.circle2) // EJsS HtmlView.HtmlView Page: declaration of element 'false'
      ;

    _view._9(EJSS_DRAWING2D.polygon,"correctcirclearrayfullcircle", _view.false) // EJsS HtmlView.HtmlView Page: declaration of element 'correctcirclearrayfullcircle'
      .setProperty("FillColor","rgba(255,0,0,0.5)") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'correctcirclearrayfullcircle'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'correctcirclearrayfullcircle'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'correctcirclearrayfullcircle'
      .setProperty("SizeX",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'correctcirclearrayfullcircle'
      .setProperty("SizeY",1) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'correctcirclearrayfullcircle'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'correctcirclearrayfullcircle'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'correctcirclearrayfullcircle'
      ;

    _view._9(EJSS_DRAWING2D.group,"rectblock2left", _view.group1left) // EJsS HtmlView.HtmlView Page: declaration of element 'rectblock2left'
      ;

    _view._9(EJSS_DRAWING2D.shapeSet,"shapeSet", _view.rectblock2left) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'shapeSet'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'shapeSet'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSet'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shapeSet'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet'
      ;

    _view._9(EJSS_DRAWING2D.shape,"bigrect", _view.rectblock2left) // EJsS HtmlView.HtmlView Page: declaration of element 'bigrect'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'bigrect'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'bigrect'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'bigrect'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'bigrect'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'bigrect'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'bigrect'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bigrect'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'bigrect'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'bigrect'
      ;

    _view._9(EJSS_DRAWING2D.group,"rectblock2leftHorizontal", _view.group1left) // EJsS HtmlView.HtmlView Page: declaration of element 'rectblock2leftHorizontal'
      ;

    _view._9(EJSS_DRAWING2D.shapeSet,"shapeSet3", _view.rectblock2leftHorizontal) // EJsS HtmlView.HtmlView Page: declaration of element 'shapeSet3'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'shapeSet3'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'shapeSet3'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'shapeSet3'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'shapeSet3'
      .setProperty("LineWidth",3) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'shapeSet3'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'shapeSet3'
      ;

    _view._9(EJSS_DRAWING2D.shape,"bigrect3", _view.rectblock2leftHorizontal) // EJsS HtmlView.HtmlView Page: declaration of element 'bigrect3'
      .setProperty("Sensitivity",0) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'bigrect3'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'bigrect3'
      .setProperty("SizeX",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'bigrect3'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'bigrect3'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'bigrect3'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'bigrect3'
      .setProperty("SizeY",2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'bigrect3'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'bigrect3'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'bigrect3'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new addfractions("_topFrame","_ejs_library/",null);
          if (typeof _isApp !== "undefined" && _isApp) _model.setRunAlways(true);
          TextResizeDetector.TARGET_ELEMENT_ID = '_topFrame';
          TextResizeDetector.USER_INIT_FUNC = function () {
            var iBase = TextResizeDetector.addEventListener(function(e,args) {
              _model._fontResized(args[0].iBase,args[0].iSize,args[0].iDelta);
              },null);
            _model._fontResized(iBase);
          };
          _model.onload();
        }, false);
      var interval = setInterval(function() {
         if(document.readyState === 'complete') {
           window.addEventListener('resize', function () { if (_model._resized) _model._resized(window.innerWidth,window.innerHeight); }, false);
           window.addEventListener('scroll', function () { if (_model._resized) _model._resized(window.innerWidth,window.innerHeight); }, false);
           var startCaptureBut = document.getElementById('startCaptureBut'); 
           var stopCaptureBut = document.getElementById('stopCaptureBut'); 
           var resetCaptureBut = document.getElementById('resetCaptureBut'); 
           var playCaptureBut = document.getElementById('playCaptureBut'); 
           var stepCaptureBut = document.getElementById('stepCaptureBut'); 
           if (startCaptureBut) {
             startCaptureBut.onclick = function() {
               _model.startCapture();
             };
             stopCaptureBut.onclick = function() {
               _model.saveText('recording','rec',JSON.stringify(_model.stopCapture()));
             };
             resetCaptureBut.onclick = function() {
               _model.resetCapture();
             };
             playCaptureBut.onclick = function() {
               _model.readText(null,'.rec',function(content){
               _model.playCapture(JSON.parse(content),function(){startCaptureBut.disabled=false; playCaptureBut.disabled=false; stepCaptureBut.disabled=false; window.alert(end_reproduction_message);});               });
             };
             stepCaptureBut.onchange= function() {
               var stepCapt;
               if (stepCaptureBut.value >= 0) stepCapt =  stepCaptureBut.value + 1;
               else stepCapt = 1 + 1.8*stepCaptureBut.value/8;
               _model.changeCaptureStep(stepCapt);
             };
           }
           clearInterval(interval);
         };
      }, 200)
