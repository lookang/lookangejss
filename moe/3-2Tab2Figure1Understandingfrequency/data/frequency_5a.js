(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"frequency_5a_atlas_", frames: [[0,0,899,42]]}
];


// symbols:



(lib.shadow = function() {
	this.initialize(ss["frequency_5a_atlas_"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.an_TextInput = function(options) {
	this._element = new $.an.TextInput(options);
	this._el = this._element.create();
	var $this = this;
	this.addEventListener('added', function() {
		$this._lastAddedFrame = $this.parent.currentFrame;
		$this._element.attach($('#dom_overlay_container'));
	});
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100,22);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;



(lib.Symbol29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{normal:0,"5a_VO1":9,"5c_VO1":268,"5d_VO1":427,"5e_VO1":460,"5f_VO1":501,"6a_VO1":811,"7_VO1":1039});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_9 = function() {
		playSound("_5a_VO1");
	}
	this.frame_258 = function() {
		endOfAudio("5a_VO1")
		this.stop();
	}
	this.frame_268 = function() {
		playSound("_5c_VO1");
	}
	this.frame_402 = function() {
		endOfAudio("5c_VO1")
		this.stop();
	}
	this.frame_427 = function() {
		playSound("_5d_VO1");
	}
	this.frame_454 = function() {
		endOfAudio("5d_VO1")
		this.stop();
	}
	this.frame_460 = function() {
		playSound("_5e_VO1");
	}
	this.frame_482 = function() {
		endOfAudio("5e_VO1")
		this.stop();
	}
	this.frame_501 = function() {
		playSound("_5f_VO1");
	}
	this.frame_795 = function() {
		endOfAudio("5f_VO1")
		this.stop();
	}
	this.frame_811 = function() {
		playSound("_6a_VO1");
	}
	this.frame_1034 = function() {
		endOfAudio("6a_VO1")
		this.stop();
	}
	this.frame_1039 = function() {
		playSound("_7_VO1");
	}
	this.frame_1405 = function() {
		endOfAudio("7_VO1")
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(249).call(this.frame_258).wait(10).call(this.frame_268).wait(134).call(this.frame_402).wait(25).call(this.frame_427).wait(27).call(this.frame_454).wait(6).call(this.frame_460).wait(22).call(this.frame_482).wait(19).call(this.frame_501).wait(294).call(this.frame_795).wait(16).call(this.frame_811).wait(223).call(this.frame_1034).wait(5).call(this.frame_1039).wait(366).call(this.frame_1405).wait(69));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0.698)").ss(1,1,1,3,true).p("AimidIFNAAIAAE7IlNAAg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AF753A").s().p("AimCeIAAk7IFNAAIAAE7g");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},1).wait(1473));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.7,-16.8,35.5,33.6);


(lib.Symbol3audio = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhMCKIgRgDIAHg0IAKADIAKABQAOAAAHgHQAHgGAEgNIAGgPIhPi5IBFAAIApB5IABAAIAmh5IBCAAIhVDYQgHAUgKAOQgKAOgPAHQgQAIgYAAIgRgCg");
	this.shape.setTransform(23.025,3.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgzBeQgQgGgLgNQgKgNgBgWQABgUALgNQAKgLASgHQASgHAVgCQAUgDAVABIAAgDQAAgOgJgHQgKgHgOAAQgNABgMAFQgNAFgIAJIgggiQARgQAWgIQAWgIAWAAQAgAAATALQATAKAIAWQAJAXAAAhIAABfIg5AAIAAgUIgBAAQgHALgPAHQgNAGgRAAIgDABQgOAAgOgGgAgBAOQgNACgJAGQgIAFgBALQABAIAEAEQAEAEAGACQAGACAGAAQASAAAKgLQAKgKAAgSIAAgGIgIAAQgOAAgMABg");
	this.shape_1.setTransform(1.0763,-1.0981);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgeCPIAAkdIA+AAIAAEdg");
	this.shape_2.setTransform(-14.8,-5.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhlCGIAAkLIBjAAQAcAAAYAIQAYAIANASQAOASABAeQgBAggPASQgOASgYAIQgYAIgcAAIggAAIAABlgAgkgRIAbAAQAMAAAKgDQALgEAGgHQAHgGAAgNQAAgMgHgIQgGgGgKgDQgLgCgLABIgcAAg");
	this.shape_3.setTransform(-31.725,-5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#015689").s().p("AhMCKIgRgDIAHg0IAKADIAKABQAOAAAHgHQAHgGAEgNIAGgPIhPi5IBFAAIApB5IABAAIAmh5IBCAAIhVDYQgHAUgKAOQgKAOgPAHQgQAIgYAAIgRgCg");
	this.shape_4.setTransform(25.475,4.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#015689").s().p("AgzBeQgQgGgLgNQgKgNgBgWQABgUALgNQAKgLASgHQASgHAVgCQAUgDAVABIAAgDQAAgOgJgHQgKgHgOAAQgNABgMAFQgNAFgIAJIgggiQARgQAWgIQAWgIAWAAQAgAAATALQATAKAIAWQAJAXAAAhIAABfIg5AAIAAgUIgBAAQgHALgPAHQgNAGgRAAIgDABQgOAAgOgGgAgBAOQgNACgJAGQgIAFgBALQABAIAEAEQAEAEAGACQAGACAGAAQASAAAKgLQAKgKAAgSIAAgGIgIAAQgOAAgMABg");
	this.shape_5.setTransform(3.5263,0.2019);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#015689").s().p("AgeCPIAAkdIA+AAIAAEdg");
	this.shape_6.setTransform(-12.35,-4.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#015689").s().p("AhlCGIAAkLIBjAAQAcAAAYAIQAYAIANASQAOASABAfQgBAegPATQgOARgYAJQgYAIgcAAIggAAIAABlgAgkgSIAbAAQAMAAAKgDQALgDAGgGQAHgIAAgMQAAgNgHgGQgGgHgKgCQgLgDgLAAIgcAAg");
	this.shape_7.setTransform(-29.275,-3.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFF7D4").s().p("AomE0Qh/AAhbhaQhahaAAiAQAAh+BahbQBbhaB/AAIRNAAQB/AABbBaQBaBbAAB+QAACAhaBaQhbBah/AAgArWivQhJBJAABmQAABnBJBJQBJBKBnAAIRNAAQBmAABKhKQBJhJAAhnQAAhmhJhJQhKhJhmAAIxNAAQhnAAhJBJg");
	this.shape_8.setTransform(-3.15,-2.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#006AB9").s().p("AorCBIgFAAIgGAAQgkgDgfgLQgggLgdgWQgygogRg1IgDgKQAUAdAlASQADAHARAKQAXALAHgKQAxANA8AAIKmgKIAAgBIF+gGQBmAABCgnQBNgtAAhUIAFADIACAJQABANAAANQAABahABBQhBBAhbAAg");
	this.shape_9.setTransform(-2.625,7.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E6F7FF").s().p("Aq0CJQgRgKgDgHIAAgDQAAgHAKAAQAKgBALAFQAcAMgJAMQgEAFgGAAQgIAAgMgGgAKphiQgmgbgLgCQgJgEgBgDIAAgBQgBgDAHgCQARgGAdAMIAJAGQAMAIAIAJQAJAKABAIIAAAEQgBAEgEAAQgIAAgTgNg");
	this.shape_10.setTransform(-2.125,-2.3814);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#005588").s().p("AomD5QhnAAhJhJQhJhJAAhnQAAhmBJhKQBJhIBngBIRNAAQBmABBKBIQBJBKAABmQAABnhJBJQhKBJhmAAgArBibQhBBBAABaIABANQABAkAMAeQARA2AzAoQAcAWAgALQAfALAkADIAGAAIAFAAIRNAAQBaAABBhAQBAhCAAhaQABgMgCgNQgEgmgQghQgJgRgNgRIgSgVIgNgOIgFgDIgIgHIgHgFIgCAAIgDgEQg0gihCgBIgCAAIxNAAQhaAAhBBAg");
	this.shape_11.setTransform(-3.15,-2.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#007ADF").s().p("AqLCVQAJgMgcgMQgLgFgKABQgKAAAAAGIAAAEQglgSgUgeIADAKQgMgegCgkQADAcALAcQgCgKAOgdQARgkAdgfQBUheCEAAIFtABID8gHIAAgBIHGgDQAWAAAVADQABAEAJADQALADAmAbQAdATADgKIAAgEQAWARARAXQgFgVgJgTQARAhAEAmIgCgJIgFgDQAABThNAuQhCAnhmAAIl+AGIAAABIqmAKQg8AAgxgNgAKuifIgCgCIAIAHIgGgFg");
	this.shape_12.setTransform(-3.225,-3.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#0098FF").s().p("Ar9BZIgBgOQAAhaBBhAQBBhABbAAIRMAAIACAAQBCAAA0AjIAEADIABAAIAHAGIADACIAGAEIAEAEIANANIATAWQAMAQAJASQAJATAFAUQgSgWgWgSQAAgHgKgLQgHgIgMgJIgKgGQgcgMgSAGQgHACABAEIAAAAQgUgEgXAAInGAEIAAABIj8AHIltgBQiEAAhUBcQgcAggRAlQgPAdACAKQgLgcgCgcg");
	this.shape_13.setTransform(-3.575,-9.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// Layer_4
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#007ADF").s().p("AolDcIgGAAIgFAAQgkgDgggLQgggLgcgWQgygogSg2QgLgegCgkIgBgNQAAhaBBhBQBBhABbAAIRMAAIACAAQBCABA0AiIAEAEIABAAIAHAFIADACIAGAFIAEADIANAOIATAVQAMARAJARQAQAhAEAmQACANAAAMQAABahBBCQhBBAhaAAgAqzBrQgKAAAAAGIAAAEQADAHARAKQAWALAHgKQAKgMgdgMQgKgFgJAAIgBABgAJ+iPQgHACABADIAAAAQABAEAKADQALADAmAbQAdATACgKIAAgEQAAgIgKgKQgHgJgMgJIgKgGQgTgHgOAAQgHAAgGACg");
	this.shape_14.setTransform(-3.175,-2.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89,-32.9,178.5,61.7);


(lib.shadow_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shadow();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.6061,0.6061);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.shadow_mc, new cjs.Rectangle(0,0,544.9,25.5), null);


(lib.sdrntm = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C59064").s().p("AC+BJQhAgNgMgLIgCgDIAAgBIAAgCQAAgVAXgVQAagXAeAAQAZAAAYAIQAZAIAHAJIARAaQAJAOAAAIQAAAQgDAEQgHAJgagBgAiUAuIgEAAIhCgBQgXgCgNgEIgegIQgIgEgEgFIgBgDIAAgBQABgMAOgWQAPgWANgKQAXgSAYgGQAWgGAeAAQAdAAARADQAaAGAfASQAOAIAFAJQADAFAFANQAIAWAAAPIgBAOQgBADgCACIgDACIgGAAIgoACIhKADQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAg");
	this.shape.setTransform(-0.425,-4.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C59064").s().p("ACNBQQgLgWgGgtIgCgBIgDgCIgCgDIAAgBIAAgCQAAgUAXgVQAagYAeAAQAZAAAYAIQAZAIAHAKIARAaQAJANAAAIQAAAQgDAEIAAABQgCAfgRAYQgYAhgqgBQg0AAgWgogAj9A+QgZgegJgXQgHgCgDgFQgFgFAAgNQAAgQAIgOQAZgqALgIQAggXBFAAQAmAAAMACQAdAGATAWQAXAcAEAMQAFALAAAdQAAAdgEALQgEAMgWAfQgKAOgiANQghANgWAAQg0AAgtg0g");
	this.shape_1.setTransform(-0.925,-0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},15).to({state:[{t:this.shape_1}]},3).to({state:[{t:this.shape}]},3).to({state:[]},3).wait(21));

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ACeBZIgMgOQgKgWAAgKQgEgJAJgeQAGgTAXgTQAWgUAOAAIANAAQAiAAAXAXQgPgHgRAAQgSAAgPAIQgJAFgJAIQgTASgCAbQgBAPAEALQAEASAOAOQASAQAWAEIALABQgMAGgYABIgCAAQgYAAgYgZgAjpBIQgrggABgtQACgvAlgfQAkgeAwAAQAwAAAVAQQANALALAMQgWgRgfAAQgjAAgaAaQgaAZAAAlQAAAkAaAZQAaAaAjACIARAAQgWAOgiACIgHABQgjAAgogfg");
	this.shape_2.setTransform(-1.0275,0.4019);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AC9B8QgXgBgSgRQgSgSgDgGIgDgGIAAAAQgJgIgBgWQgBgXABAAQABgNAEgIQAGgTAQgPQAbgaAmAAIABAAQAlAAAZAZIACABQAbAbAAAkQAAAmgbAaQgLALgKAFIgYAJQgMAEgQAAIgJAAgADDgxQgNAAgXATQgWAUgGASQgJAfAEAJQAAAKAKAVIAMAPQAYAZAagBQAYAAAMgGIgMgBQgVgEgSgRQgOgOgEgRQgEgLABgPQACgbATgTQAJgIAJgFQAPgIASAAQARAAAOAHQgXgXghAAIgOABgAkBBSQgogkAAgxQAAgxAogkQAngjA4AAQA5AAAnAjQAoAkAAAxIAAADQAAAUgIASQgKAYgWAUQgnAjg5AAQg4AAgngjgAj2hOQglAegCAvQgBAuArAgQArAhAngDQAigDAWgOIgRAAQgjgCgagZQgagaAAgkQAAgkAagaQAagaAjAAQAfAAAWARQgMgMgNgKQgUgRgxAAQgvAAgkAfg");
	this.shape_3.setTransform(0,-0.0089);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(45));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,-12.5,61,24.9);


(lib.right_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#0F5500","#106200"],[0,1],4.3,6.7,-4,-7.7).s().p("AAOA2Qgkhigug4QBDARBBCtQACAIADADg");
	this.shape.setTransform(11.4,49.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#25B600","#2BD500"],[0,1],-3.3,3,2.6,-2.9).s().p("AhGALQAbgeAigTQAPgHAQAHIAxAVQgQgFgTAOQgTAKgqAog");
	this.shape_1.setTransform(7.125,35.0125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#25B600","#2BD500"],[0,1],13.2,-21.5,-17.6,17.2).s().p("AjKCUQCbj9CZhpIBhgOQivB2i9FLQgTgugWgfg");
	this.shape_2.setTransform(38.9,22.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#1B8700","#209F00"],[0,1],-21.3,23.1,17.5,-33.8).s().p("AiKEpIgBgBIAAAAQgDgDgCgIQhCiuhDgRQArgoATgLQATgOAQAFQAJACAIAHQANANAOASQAWAfASAuQC+lKCvh2IAJAWQizC0icFIIhEA/QgFACgDAAQgDAAgCgBg");
	this.shape_3.setTransform(32.325,29.8317);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.right_mc, new cjs.Rectangle(0,0,60.2,59.7), null);


(lib.paused_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF1E1E").s().p("AgcBYQgLgFgIgIQgHgIgEgLQgEgLAAgNQAAgMADgLQAEgLAHgIQAHgJAKgFQAJgFANAAQAKAAAKADQAKAEAGAIIAAAAIAAhNIAkAAIAAC0IghAAIAAgPIAAAAIgGAGQgDAEgFACIgKAEQgGACgFAAQgNAAgKgEgAgTAKQgHAIAAANQAAANAHAIQAIAIAMAAQAOAAAIgIQAHgIAAgNQAAgNgHgIQgIgJgOAAQgMAAgIAJg");
	this.shape.setTransform(75.875,15.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF1E1E").s().p("AgTA5QgMgEgJgIQgJgJgFgLQgFgLAAgOQAAgNAFgLQAFgMAJgIQAJgIAMgEQAMgEAMAAQANAAAKAEQAKAEAHAIQAHAIAEAMQAEALAAANIAAALIhTAAQACALAIAGQAHAGAJAAQAJAAAGgEQAHgEAEgGIAZASQgIALgNAGQgOAGgOAAQgMAAgMgEgAgIghQgEACgEAEQgDACgCAEIgCAJIAvAAQAAgJgGgHQgGgGgKAAQgFAAgFABg");
	this.shape_1.setTransform(61.775,19.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF1E1E").s().p("AgbA6QgNgEgJgJIAWgYQAFAGAHAEQAFADAJAAQAFAAAFgCQAFgCAAgFQAAgEgEgCQgFgDgGgBIgOgEQgJgBgGgEQgHgEgFgFQgEgHAAgLQAAgKAEgIQAEgHAHgFQAHgFAJgCQAJgCAIAAQALAAANADQALADAJAJIgXAWQgHgKgOAAQgDAAgFACQgEACAAAGQAAAEAEACQAFACAGACIAOADQAJACAGAEQAHADAFAGQAEAHAAALQAAALgFAHQgFAIgIAEQgHAFgKABQgJACgJAAQgMAAgMgDg");
	this.shape_2.setTransform(49.35,19.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF1E1E").s().p("AgiA3QgJgEgFgHQgEgIgCgKQgBgKAAgMIAAg/IAkAAIAAA5IAAAKQAAAFADAFQABAEAEADQAEADAGAAQAHAAAEgDQAEgCACgEIAEgKIAAgKIAAg6IAkAAIAAB0IgiAAIAAgQIgBAAIgFAHIgHAGIgJAEQgGACgGAAQgNAAgJgFg");
	this.shape_3.setTransform(36.9,19.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF1E1E").s().p("AgeA7QgHgCgFgFQgHgFgCgGQgEgHAAgJQAAgKAEgHQADgHAHgDQAGgFAIgDIARgDIAQgCIARAAQAAgKgHgFQgHgGgJAAQgIAAgHAEQgHAEgHAGIgTgUQALgJANgFQAOgEANAAQAPAAALAEQAKAEAGAHQAGAIACALQADALAAAPIAAA6IghAAIAAgOIgBAAQgFAJgLAEQgJAEgKAAQgJAAgIgCgAAEAIQgFAAgGACQgFABgEAEQgFADAAAGQABAGAFAEQAGADAFAAQAFAAAFgCIAIgEQAEgDADgDQACgFAAgFIAAgIIgJAAIgKABg");
	this.shape_4.setTransform(23.4,19.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF1E1E").s().p("Ag/BVIAAipIA/AAQAMAAAMACQAMADAJAGQAIAFAGALQAFAJAAAPQAAAQgFAJQgFAKgIAGQgJAGgLACQgMADgNAAIgbAAIAABCgAgagMIAZAAIAJgBQAFgBADgCQAEgCADgEQACgFAAgGQAAgGgDgEQgDgEgFgCQgFgCgFgBIgKgBIgUAAg");
	this.shape_5.setTransform(10.125,16.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.paused_mc, new cjs.Rectangle(0,0,86,32.9), null);


(lib.osttext_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgJAKQgEgFAAgFQAAgFAEgFQAEgDAFAAQAGAAAFADQADAFAAAFQAAAFgDAFQgFAEgGAAQgFAAgEgEg");
	this.shape.setTransform(697.95,75.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_1.setTransform(688.775,71.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag2BUIAAilIAUAAIAAAPIAAAAQAGgIAKgFQAKgFAKABQAMgBAKAFQAJAEAHAHQAHAIAEAKQAEAKAAAMQAAALgEAKQgEAJgHAIQgHAHgJAEQgKAEgMAAQgKAAgKgFQgKgFgGgHIAAAAIAABMgAgOg+QgGADgFAFQgEAEgDAHQgCAGAAAJQAAAHACAHQADAHAEAFQAFADAGADQAGADAIAAQAHAAAHgDQAGgDAEgDQAFgFACgHQADgHAAgHQAAgJgDgGQgCgHgFgEQgEgFgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_2.setTransform(676.175,74.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgFgKQgDgKAAgMQAAgKADgKQAFgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKAAAKQAAAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgFAFgCAHQgCAGgBAHQABAIACAHQACAHAFAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_3.setTransform(662.7,71.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgdA1IAAhnIAUAAIAAARIAAAAQACgFADgDIAHgGIAIgEIAKgBQAFAAAEABIgBAVIgEgBIgGAAQgOAAgGAIQgJAIABAQIAAA0g");
	this.shape_4.setTransform(652.9,71.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgDgGQgDgGAAgHQABgKAEgHQAEgHAIgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQALAAAJADQAJADAEAFQAGAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgMAAQgHAAgGgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQACgFgBgFIAAgHIgKAAIgPABg");
	this.shape_5.setTransform(636.45,71.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgdBLQgMgDgLgLIANgQQAIAIAJAEQAJAEALABQAKgBAIgDQAHgDAEgFQAEgFACgHIACgMIAAgQIgBAAQgFAJgKAFQgKAEgKAAQgLAAgKgEQgKgEgHgHQgHgHgEgJQgEgJAAgMQAAgLAEgKQAEgKAHgIQAHgHAJgEQAKgFAMAAQAKAAAKAFQAKAEAGAIIAAgPIAUAAIAABnQAAAMgEAKQgEAJgIAIQgHAHgLAEQgLAEgLAAQgPAAgNgFgAgNg6QgGADgEAFQgFAEgCAIQgDAGAAAIQAAAPAKAJQAJAKAPAAQAPAAAKgKQAJgJAAgPQAAgIgDgGQgCgIgEgEQgFgFgGgDQgGgDgIAAQgHAAgHADg");
	this.shape_6.setTransform(617.825,73.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAaA1IAAg8QAAgHgCgGQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIAAAHACQAHACAFAFQAFAFADAHQADAIAAALIAABBg");
	this.shape_7.setTransform(605.225,71.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgJBOIAAhoIATAAIAABogAgJg1QgFgEAAgGQAAgFAFgFQAEgEAFAAQAGAAAEAEQAFAFgBAFQABAGgFAEQgEAFgGAAQgFAAgEgFg");
	this.shape_8.setTransform(596.45,68.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgXBRQgJgFgHgHQgHgIgEgJQgEgKAAgMQAAgMAEgKQAEgJAHgHQAHgHAJgEQAKgFAMAAQAKAAAKAFQAKAEAGAIIAAhNIAUAAIAACmIgUAAIAAgPQgGAIgKAFQgKAFgKgBQgMAAgKgDgAgNgDQgGADgEAEQgFAEgCAIQgDAGAAAIQAAAIADAHQACAGAFAFQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgFACgGQADgHAAgIQAAgIgDgGQgCgIgEgEQgFgEgGgDQgGgDgIAAQgHAAgHADg");
	this.shape_9.setTransform(586.825,68.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_10.setTransform(577.7,68.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgFgKQgDgKAAgMQAAgKADgKQAFgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgEAFgDAHQgDAGABAHQgBAIADAHQADAHAEAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_11.setTransform(568.55,71.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_12.setTransform(555.875,68.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_13.setTransform(538.625,71.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgJBOIAAhoIATAAIAABogAgKg1QgDgEAAgGQAAgFADgFQAFgEAFAAQAGAAAEAEQAEAFABAFQgBAGgEAEQgEAFgGAAQgFAAgFgFg");
	this.shape_14.setTransform(531.25,68.65);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_15.setTransform(516.375,71.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_16.setTransform(504.125,68.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAaA1IAAg8QAAgHgCgGQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIAAAHACQAHACAFAFQAFAFADAHQADAIAAALIAABBg");
	this.shape_17.setTransform(485.775,71.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_18.setTransform(473.525,71.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_19.setTransform(461.275,68.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAbA0IgbhNIAAAAIgZBNIgVAAIgihnIAWAAIAYBNIAAAAIAZhNIAUAAIAaBNIABAAIAWhNIAVAAIgiBng");
	this.shape_20.setTransform(446.8,71.225);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AguA1IAAggIA2gvIg1AAIAAgaIBbAAIAAAfIg5AwIA7AAIAAAag");
	this.shape_21.setTransform(426.85,71.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAhBOIAAhEIhBAAIAABEIgiAAIAAibIAiAAIAAA6IBBAAIAAg6IAjAAIAACbg");
	this.shape_22.setTransform(413,68.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag2BPIAAgjIA9g1IAJgKQAEgFAAgHQAAgIgFgEQgHgFgHAAQgIAAgFAGQgGAGAAAIIghgCQABgNAEgIQAEgJAHgGQAHgGAKgDQALgDAKAAQALAAAJADQAJADAGAGQAHAFAFAJQADAJAAAMQAAAHgBAGIgFALIgGAIIgIAJIguAoIBDAAIAAAdg");
	this.shape_23.setTransform(391.65,68.525);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgTBUIAAhQIgVAAIAAgZIAVAAIAAgUQAAgIACgIQABgIAFgGQAEgFAHgEQAJgEANABIAKAAIAJACIgBAbIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABQg");
	this.shape_24.setTransform(374.775,68);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgIgEgKQgGgKAAgNQAAgMAGgKQAEgKAIgIQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAIAFAKQAFAKgBAMQABANgFAKQgFAKgIAIQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgTQgIAIABALQgBAMAIAIQAGAHAMAAQAMAAAIgHQAGgIABgMQgBgLgGgIQgIgHgMAAQgMAAgGAHg");
	this.shape_25.setTransform(363.8,71.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ag5BMIAFgbQAHADAIAAIAJgBIAGgEIAEgFIADgIIACgGIgvhrIAlAAIAaBHIAYhHIAhAAIgwB8IgGAPQgDAGgEAFQgFAEgHADQgHACgMAAQgNAAgMgEg");
	this.shape_26.setTransform(344.45,73.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQAJAAAKADQALADAIAIIgWAXQgDgDgEgCQgEgDgFAAQgMAAgHAHQgHAIAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgCADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_27.setTransform(333.475,71.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AATA3IAAg1IAAgIIgDgJQgBgEgEgDQgDgDgGAAQgGAAgEADQgEACgCAEQgCAEAAAEIgBAKIAAA1IghAAIAAhqIAfAAIAAAOIABAAIAEgGIAHgFIAIgEQAFgCAGAAQANAAAHAEQAIAEAEAHQAEAHACAJQABAJAAALIAAA6g");
	this.shape_28.setTransform(321.4,70.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAIADAKQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEAAgEABQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_29.setTransform(308.775,71.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgfAzQgIgEgEgHQgEgGgCgKQgCgJABgLIAAg6IAgAAIAAA1IABAIIACAJQACAFADACQADADAHAAQAFAAAEgCQAEgDACgEQADgEAAgEIABgJIAAg2IAgAAIAABqIgfAAIAAgOIAAAAIgFAGIgHAFIgIAEQgFACgGAAQgMAAgIgEg");
	this.shape_30.setTransform(296.1,71.225);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAZBQIAAg+IAAAAQgGAIgJADQgJADgJAAQgMAAgJgEQgJgFgGgIQgGgIgEgJQgDgKAAgMQAAgMAEgKQAEgKAGgHQAHgIAKgEQAKgEAMAAIAJACIAKAEIAHAFIAFAGIABAAIAAgOIAeAAIAACcgAgRgqQgHAHAAAMQAAANAHAHQAHAGALAAQANAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgNAAQgLAAgHAIg");
	this.shape_31.setTransform(282.525,73.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAIADAKQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEAAgEABQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_32.setTransform(269.625,71.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_33.setTransform(259.275,70.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgTBUIAAhQIgVAAIAAgZIAVAAIAAgUQAAgIACgIQABgIAFgGQAEgFAHgEQAJgEANABIAKAAIAJACIgBAbIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABQg");
	this.shape_34.setTransform(250.475,68);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgCgGQgEgGAAgHQABgKAEgHQAFgHAHgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQALAAAJADQAJADAEAFQAGAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgIAEQgKAEgLAAQgHAAgGgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAGAEALAAQAHAAAFgDQAHgCACgFQAEgEACgGQACgFgBgFIAAgHIgKAAIgPABg");
	this.shape_35.setTransform(234.25,71.225);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABAEADABQADADAGAAIAHgBQAEgBADgCIAAASQgEACgFACIgJAAQgMAAgGgDg");
	this.shape_36.setTransform(218.025,69.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgCgGQgEgGAAgHQABgKAEgHQAFgHAHgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQALAAAJADQAJADAEAFQAGAFACAGQADAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgIAEQgKAEgLAAQgHAAgGgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAGAEALAAQAHAAAFgDQAHgCACgFQAEgEACgGQACgFgBgFIAAgHIgKAAIgPABg");
	this.shape_37.setTransform(208.6,71.225);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AAaA1IAAg8QAAgHgCgGQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIAAAHACQAHACAFAFQAFAFADAHQADAIAAALIAABBg");
	this.shape_38.setTransform(190.825,71.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQALAAALAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgLAEgLAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_39.setTransform(178.2,71.225);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgJBOIAAhoIATAAIAABogAgKg1QgDgEAAgGQAAgFADgFQAFgEAFAAQAGAAAEAEQAEAFABAFQgBAGgEAEQgEAFgGAAQgFAAgFgFg");
	this.shape_40.setTransform(169,68.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABAEADABQADADAGAAIAHgBQAEgBADgCIAAASQgEACgFACIgJAAQgMAAgGgDg");
	this.shape_41.setTransform(161.775,69.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgFgKQgDgKAAgMQAAgKADgKQAFgKAIgIQAHgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgFAFgCAHQgCAGgBAHQABAIACAHQACAHAFAEQAEAFAGADQAHACAHAAQAIAAAGgCQAHgDAEgFQAEgEADgHQACgHAAgIQAAgHgCgGQgDgHgEgFQgEgFgHgCQgGgDgIAAQgHAAgHADg");
	this.shape_42.setTransform(151.7,71.225);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AA7A1IAAg4IgBgMQgBgFgCgEQgCgFgFgCQgEgDgIAAQgOAAgGAJQgGAJAAANIAAA4IgTAAIAAg1IgBgNQAAgHgDgEQgCgFgEgCQgFgDgHAAQgFAAgFACQgFADgEAEQgEAEgCAGQgCAHAAAIIAAA1IgUAAIAAhnIATAAIAAARIAAAAIAEgGQACgEAFgCIAKgFQAGgCAGAAQAMAAAIAEQAHAGAFAJQAFgJAJgGQAKgEAJAAQAMAAAIAEQAIADAEAHQAEAGACAJQACAIAAAJIAAA7g");
	this.shape_43.setTransform(135.775,71.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AAaA1IAAg8QAAgHgCgGQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIAAAHACQAHACAFAFQAFAFADAHQADAIAAALIAABBg");
	this.shape_44.setTransform(114.175,71.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AAbA0IgbhNIAAAAIgZBNIgVAAIgihnIAWAAIAXBNIABAAIAZhNIAUAAIAaBNIABAAIAWhNIAVAAIghBng");
	this.shape_45.setTransform(99.7,71.225);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgDAGAAAHQAAAIADAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_46.setTransform(84.85,71.225);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgXBRQgJgFgHgHQgHgIgEgJQgEgKAAgMQAAgMAEgKQAEgJAHgHQAHgHAJgEQAKgFAMAAQAKAAAKAFQAKAEAGAIIAAhNIAUAAIAACmIgUAAIAAgPQgGAIgKAFQgKAFgKgBQgMAAgKgDgAgNgDQgGADgEAEQgFAEgCAIQgDAGAAAIQAAAIADAHQACAGAFAFQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgFACgGQADgHAAgIQAAgIgDgGQgCgIgEgEQgFgEgGgDQgGgDgIAAQgHAAgHADg");
	this.shape_47.setTransform(71.325,68.25);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgXBRQgJgFgHgHQgHgIgEgJQgEgKAAgMQAAgMAEgKQAEgJAHgHQAHgHAJgEQAKgFAMAAQAKAAAKAFQAKAEAGAIIAAhNIAUAAIAACmIgUAAIAAgPQgGAIgKAFQgKAFgKgBQgMAAgKgDgAgNgDQgGADgEAEQgFAEgCAIQgDAGAAAIQAAAIADAHQACAGAFAFQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgFACgGQADgHAAgIQAAgIgDgGQgCgIgEgEQgFgEgGgDQgGgDgIAAQgHAAgHADg");
	this.shape_48.setTransform(51.775,68.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AAaA1IAAg8QAAgHgCgGQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIAAAHACQAHACAFAFQAFAFADAHQADAIAAALIAABBg");
	this.shape_49.setTransform(39.175,71.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgDgGQgCgGAAgHQgBgKAFgHQAEgHAIgDQAIgFALgCQAJgBAMAAIAPAAIAAgFIgCgIIgFgHQgDgDgFgCQgEgCgGAAIgJABIgIADIgHAEIgFAEIgMgMQAIgIALgEQAMgEAJAAQALAAAJADQAIADAGAFQAFAFACAGQADAGAAAHIAAA0IAAAKIABAJIgSAAIAAgQIgBAAQgGALgJAEQgJAEgLAAQgIAAgHgCgAACADIgNADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAJAAQAIAAAGgDQAFgCAEgFQADgEACgGQACgFAAgFIAAgHIgLAAIgOABg");
	this.shape_50.setTransform(27.2,71.225);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("Ag2BUIAAilIAUAAIAAAPIAAAAQAGgIAKgFQAKgFAKAAQAMAAAKAFQAJAEAHAHQAHAIAEAKQAEAKAAAMQAAALgEAKQgEAJgHAIQgHAHgJAEQgKAEgMAAQgKAAgKgFQgKgFgGgHIAAAAIAABMgAgOg+QgGADgFAFQgEAEgDAHQgCAHAAAIQAAAHACAHQADAHAEAEQAFAEAGADQAGADAIAAQAHAAAHgDQAGgDAEgEQAFgEACgHQADgHAAgHQAAgIgDgHQgCgHgFgEQgEgFgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_51.setTransform(676.275,43.05);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgWA0QgHgDgFgFQgFgFgDgHQgDgIAAgKIAAhDIATAAIAAA9QAAAIACAFQACAFAEADQADADAEACIAJABQAFAAAGgBQAFgDAEgEQAEgFACgGQACgGAAgKIAAg1IAUAAIAABoIgUAAIAAgQIAAAAQgEAIgJAGQgJAEgMAAQgHAAgHgBg");
	this.shape_52.setTransform(663.175,40.2);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_53.setTransform(644.825,39.95);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgDgGQgDgGAAgHQABgKAEgHQAEgHAIgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQALAAAJADQAJADAEAFQAGAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgMAAQgHAAgGgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQACgFgBgFIAAgHIgKAAIgPABg");
	this.shape_54.setTransform(632.85,40.075);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_55.setTransform(615.075,39.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgJBOIAAhoIATAAIAABogAgJg1QgEgEAAgGQAAgFAEgFQAEgEAFAAQAGAAAEAEQAEAFABAFQgBAGgEAEQgEAFgGAAQgFAAgEgFg");
	this.shape_56.setTransform(606.3,37.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AA7A1IAAg4IgBgMQgBgFgCgEQgCgFgFgCQgEgDgIAAQgOAAgGAJQgGAJAAANIAAA4IgTAAIAAg1IgBgNQAAgHgDgEQgCgFgEgCQgFgDgHAAQgFAAgFACQgFACgEAEQgEAFgCAGQgCAHAAAIIAAA1IgUAAIAAhnIATAAIAAARIAAAAIAEgGQACgEAFgCIAKgFQAGgCAGgBQAMABAIAEQAHAFAFAKQAFgKAJgFQAKgEAJgBQAMABAIAEQAIADAEAHQAEAGACAJQACAIAAAJIAAA7g");
	this.shape_57.setTransform(588.175,39.95);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgdA1IAAhnIAUAAIAAARIAAAAQACgFAEgDIAGgGIAIgEIAKgCQAFAAAEACIgBAVIgEgBIgGAAQgOAAgGAIQgJAIABAQIAAA0g");
	this.shape_58.setTransform(575.15,39.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgDgGQgDgGABgHQAAgKAEgHQAFgHAHgDQAIgFALgCQAJgBAMAAIAPAAIAAgFIgCgIIgFgHQgDgDgFgCQgEgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQAMAAAIADQAJADAFAFQAFAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgMAAQgHAAgHgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQABgFABgFIAAgHIgLAAIgPABg");
	this.shape_59.setTransform(564.8,40.075);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAJIACAHQABADADACQADACAGABIAHgBQAEgBADgCIAAASQgEACgFACIgJAAQgMAAgGgDg");
	this.shape_60.setTransform(548.575,38.75);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgNBUIAAhVIgWAAIAAgSIAWAAIAAgXQAAgVAIgKQAHgKAUAAIAGAAIAJABIgCASIgGgCIgGgBQgFABgDACQgEABgCADQgCADAAAFIgBAJIAAAYIAXAAIAAASIgXAAIAABVg");
	this.shape_61.setTransform(541.3,36.85);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_62.setTransform(531.525,40.075);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_63.setTransform(522.75,36.975);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACQgHACgHAAQgNAAgKgEg");
	this.shape_64.setTransform(508.975,40.075);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgJBOIAAhoIATAAIAABogAgJg1QgFgEAAgGQAAgFAFgFQAEgEAFAAQAGAAAEAEQAFAFgBAFQABAGgFAEQgEAFgGAAQgFAAgEgFg");
	this.shape_65.setTransform(501.6,37.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_66.setTransform(492.825,36.975);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACQgHACgHAAQgNAAgKgEg");
	this.shape_67.setTransform(475.575,40.075);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_68.setTransform(464.725,40.075);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgJA0IgrhnIAYAAIAdBPIAehPIAWAAIgqBng");
	this.shape_69.setTransform(453.1,40.075);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgEgKgBgMQABgKAEgKQAEgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgEAFgDAHQgDAGABAHQgBAIADAHQADAHAEAEQAEAFAGADQAHACAHAAQAIAAAGgCQAHgDAEgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgEgFgHgCQgGgDgIAAQgHAAgHADg");
	this.shape_70.setTransform(441.1,40.075);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AA7A1IAAg4IgBgMQgBgFgCgEQgCgFgFgCQgEgDgIAAQgOAAgGAJQgGAJAAANIAAA4IgTAAIAAg1IgBgNQAAgHgDgEQgCgFgEgCQgFgDgHAAQgFAAgFACQgFACgEAEQgEAFgCAGQgCAHAAAIIAAA1IgUAAIAAhnIATAAIAAARIAAAAIAEgGQACgEAFgCIAKgFQAGgCAGgBQAMABAIAEQAHAFAFAKQAFgKAJgFQAKgEAJgBQAMABAIAEQAIADAEAHQAEAGACAJQACAIAAAJIAAA7g");
	this.shape_71.setTransform(425.175,39.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_72.setTransform(403.575,39.95);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgFAFgCAHQgCAGAAAHQAAAIACAHQACAHAFAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_73.setTransform(390.95,40.075);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgXBRQgJgFgHgHQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgJAHgHQAHgHAJgFQAKgEAMAAQAKAAAKAFQAKAEAGAJIAAhOIAUAAIAACmIgUAAIAAgPQgGAIgKAFQgKAEgKAAQgMAAgKgDgAgNgDQgGADgEAEQgFAFgCAGQgDAHAAAIQAAAIADAHQACAGAFAFQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgFACgGQADgHAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgDQgGgCgIAAQgHAAgHACg");
	this.shape_74.setTransform(377.425,37.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgdA1IAAhnIAUAAIAAARIAAAAQACgFAEgDIAGgGIAIgEIAKgCQAFAAAEACIgBAVIgEgBIgGAAQgOAAgGAIQgJAIABAQIAAA0g");
	this.shape_75.setTransform(367.7,39.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgFgKQgDgKAAgMQAAgKADgKQAFgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgFAFgCAHQgCAGAAAHQAAAIACAHQACAHAFAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_76.setTransform(356.7,40.075);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgWBLQgQgGgLgMQgKgLgGgPQgFgPAAgQQAAgRAGgOQAGgPAKgLQALgLAPgHQAPgGARAAQAWAAANAFQAOAGAJAJIgPAQQgKgJgLgEQgKgDgMAAQgMAAgMAFQgKAFgIAIQgIAIgDAMQgFALAAAMQABANAEALQAFAMAHAIQAJAJALAEQALAFAMAAQALAAAKgCQAKgCAHgEIAAgsIgjAAIAAgSIA4AAIAABLIgNAHIgPAEQgIACgIABIgPABQgSAAgQgHg");
	this.shape_77.setTransform(341.2,37.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_78.setTransform(320.825,39.95);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_79.setTransform(308.575,40.075);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_80.setTransform(296.325,36.975);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AAbA0IgbhNIAAAAIgZBNIgVAAIgihnIAWAAIAXBNIABAAIAZhNIAUAAIAaBNIABAAIAWhNIAVAAIgiBng");
	this.shape_81.setTransform(281.85,40.075);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACQgHACgHAAQgNAAgKgEg");
	this.shape_82.setTransform(262.375,40.075);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_83.setTransform(251.525,39.95);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_84.setTransform(239.275,40.075);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("Ag2BUIAAilIAUAAIAAAPIAAAAQAGgIAKgFQAKgFAKAAQAMAAAKAFQAJAEAHAHQAHAIAEAKQAEAKAAAMQAAALgEAKQgEAJgHAIQgHAHgJAEQgKAEgMAAQgKAAgKgFQgKgFgGgHIAAAAIAABMgAgOg+QgGADgFAFQgEAEgDAHQgCAHAAAIQAAAHACAHQADAHAEAEQAFAEAGADQAGADAIAAQAHAAAHgDQAGgDAEgEQAFgEACgHQADgHAAgHQAAgIgDgHQgCgHgFgEQgEgFgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_85.setTransform(226.675,43.05);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("Ag2BUIAAilIAUAAIAAAPIAAAAQAGgIAKgFQAKgFAKAAQAMAAAKAFQAJAEAHAHQAHAIAEAKQAEAKAAAMQAAALgEAKQgEAJgHAIQgHAHgJAEQgKAEgMAAQgKAAgKgFQgKgFgGgHIAAAAIAABMgAgOg+QgGADgFAFQgEAEgDAHQgCAHAAAIQAAAHACAHQADAHAEAEQAFAEAGADQAGADAIAAQAHAAAHgDQAGgDAEgEQAFgEACgHQADgHAAgHQAAgIgDgHQgCgHgFgEQgEgFgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_86.setTransform(213.225,43.05);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgDgGQgDgGAAgHQABgKAEgHQAEgHAIgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQALAAAJADQAJADAEAFQAGAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgMAAQgHAAgGgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQACgFgBgFIAAgHIgKAAIgPABg");
	this.shape_87.setTransform(200.4,40.075);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_88.setTransform(188.725,36.975);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAJIACAHQABADADACQADACAGABIAHgBQAEgBADgCIAAASQgEACgFACIgJAAQgMAAgGgDg");
	this.shape_89.setTransform(171.925,38.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgDgGQgDgGAAgHQABgKAEgHQAEgHAIgDQAIgFALgCQAJgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgFgCQgEgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQAMAAAIADQAJADAFAFQAFAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgLAAQgIAAgHgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQABgFAAgFIAAgHIgKAAIgPABg");
	this.shape_90.setTransform(162.5,40.075);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_91.setTransform(150.825,36.975);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AAcA0IgchNIAAAAIgYBNIgWAAIgihnIAWAAIAYBNIAAAAIAZhNIAUAAIAbBNIAAAAIAWhNIAVAAIghBng");
	this.shape_92.setTransform(136.35,40.075);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_93.setTransform(115.775,40.075);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_94.setTransform(103.525,40.075);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACQgHACgHAAQgNAAgKgEg");
	this.shape_95.setTransform(92.375,40.075);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACQgHACgHAAQgNAAgKgEg");
	this.shape_96.setTransform(76.525,40.075);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AgWA0QgHgDgFgFQgFgFgDgHQgDgIAAgKIAAhDIATAAIAAA9QAAAIACAFQACAFAEADQADADAEACIAJABQAFAAAGgBQAFgDAEgEQAEgFACgGQACgGAAgKIAAg1IAUAAIAABoIgUAAIAAgQIAAAAQgEAIgJAGQgJAEgMAAQgHAAgHgBg");
	this.shape_97.setTransform(65.675,40.2);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAJIACAHQABADADACQADACAGABIAHgBQAEgBADgCIAAASQgEACgFACIgJAAQgMAAgGgDg");
	this.shape_98.setTransform(48.875,38.75);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_99.setTransform(39.175,40.075);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AgtBOIAAibIAVAAIAACHIBGAAIAAAUg");
	this.shape_100.setTransform(28.275,37.5);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#74492A").ss(4,1,1).p("ABIpCIg2AAQgkAAgbAZQgaAaAAAlIAAPVQAAAlAaAZQAbAaAkAAIA2AA");
	this.shape_101.setTransform(7.2,57.9);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#74492A").ss(4,1,1).p("Eg4KAJCMBtlAAAQCwAAAAiQIAAtjQAAiQiwAAMhtlAAA");
	this.shape_102.setTransform(373.875,57.85);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFCC66").s().p("Eg34AJDQglAAgbgaQgagZAAglIAAvVQAAglAagaQAbgZAlAAIA2AAIAAABMBtlAAAQCwAAAACQIAANjQAACQiwAAMhtlAAAIAAABg");
	this.shape_103.setTransform(366.675,57.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.osttext_mc, new cjs.Rectangle(-2,-2,744.1,119.8), null);


(lib.onecompletewave_mccopy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{referencepoint:0});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3399CC").s().p("AibARIAAgCQAAgMAMgBIAbAAIATAAIAAgGIAAjIIDMAAIAADIIgBAGIAlAAQANAAAAANIAAAEIiYC6g");
	this.shape.setTransform(28.275,95.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B81AD").s().p("ABFDKIiei8IAAgCQAAgMAOAAIASAAQgNAAAAAMIAAACICgC8QgEAFgFAAQgGAAgGgFgAgeAAIgBgGIAAjIIATAAIAADIIABAGg");
	this.shape_1.setTransform(19.725,95.3689);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#020201").s().p("AAABBQgFgDgDgFQgDgFgBgGIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADABAGAAIAHAAQAEAAADgCIAAASQgEABgFABIgJABQgMAAgGgDg");
	this.shape_2.setTransform(168.825,59.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#020201").s().p("AAaA2IAAg9QAAgIgCgEQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAEQgEAEgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_3.setTransform(159.125,60.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#020201").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgEgFgBgFQABgHAEgEQAEgEAFAAQAGAAAEAEQAFAEAAAHQAAAFgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_4.setTransform(150.35,58.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#020201").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_5.setTransform(141.2,60.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#020201").s().p("Ag2BVIAAimIAUAAIAAAPIAAAAQAGgIAKgFQAKgEAKgBQAMABAKAEQAJAEAHAIQAHAHAEAKQAEAKAAALQAAAMgEAKQgEAJgHAHQgHAIgJAEQgKAEgMAAQgKAAgKgEQgKgGgGgIIAAAAIAABOgAgOg+QgGADgFAEQgEAFgDAHQgCAHAAAHQAAAJACAGQADAHAEAFQAFADAGADQAGADAIgBQAHABAHgDQAGgDAEgDQAFgFACgHQADgGAAgJQAAgHgDgHQgCgHgFgFQgEgEgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_6.setTransform(128.175,63.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_7.setTransform(108.975,60.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#020201").s().p("AgOAyQgKgDgHgIQgHgHgEgKQgEgJAAgMQAAgMAEgKQAEgKAHgIQAHgGAKgFQAKgDALAAQAMAAAKADQALAEAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLAAgKgFg");
	this.shape_8.setTransform(97.975,60.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#020201").s().p("AAaA2IAAg9QAAgIgCgEQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAEQgEAEgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_9.setTransform(86.125,60.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_10.setTransform(73.875,60.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#020201").s().p("AgdA2IAAhoIAUAAIAAAQIAAAAQACgEAEgEIAGgFIAIgEIALgCQAEABAEABIgBAWIgEgCIgGAAQgOAAgGAIQgJAIABAQIAAA1g");
	this.shape_11.setTransform(64.5,60.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_12.setTransform(53.875,60.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#020201").s().p("AgNBVIAAhXIgWAAIAAgRIAWAAIAAgXQAAgVAIgLQAHgKAUAAIAGAAIAJACIgCARIgGgBIgGgBQgFAAgDACQgEACgCADQgCADAAAFIgBAJIAAAYIAXAAIAAARIgXAAIAABXg");
	this.shape_13.setTransform(44.05,57.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_14.setTransform(34.275,60.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#020201").s().p("AAdBOIgnhEIgXAAIAABEIgVAAIAAibIA2AAQAOAAAKAFQAKADAFAHQAGAGACAHQACAJAAAHQAAAIgCAGQgDAHgFAGQgFAFgHADQgHAEgJABIAsBHgAghgIIAcAAIALgBQAGgBAFgDQAEgCADgGQADgEAAgIQAAgIgDgFQgDgFgEgCQgFgEgGgBIgLgBIgcAAg");
	this.shape_15.setTransform(22.225,58.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.onecompletewave_mccopy3, new cjs.Rectangle(10.8,42.1,164.7,74), null);


(lib.onecompletewave_mccopy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3399CC").s().p("AibARIAAgCQAAgMAMgBIAbAAIATAAIAAgGIAAjIIDMAAIAADIIgBAGIAlAAQANAAAAANIAAAEIiYC6g");
	this.shape.setTransform(28.275,95.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B81AD").s().p("ABFDKIiei8IAAgCQAAgMAOAAIASAAQgNAAAAAMIAAACICgC8QgEAFgFAAQgGAAgGgFgAgeAAIgBgGIAAjIIATAAIAADIIABAGg");
	this.shape_1.setTransform(19.725,95.3689);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#020201").s().p("AAABBQgFgDgDgFQgDgFgBgGIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADABAGAAIAHAAQAEAAADgCIAAASQgEABgFABIgJABQgMAAgGgDg");
	this.shape_2.setTransform(168.825,59.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#020201").s().p("AAaA2IAAg9QAAgIgCgEQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAEQgEAEgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_3.setTransform(159.125,60.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#020201").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgEgFgBgFQABgHAEgEQAEgEAFAAQAGAAAEAEQAFAEAAAHQAAAFgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_4.setTransform(150.35,58.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#020201").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_5.setTransform(141.2,60.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#020201").s().p("Ag2BVIAAimIAUAAIAAAPIAAAAQAGgIAKgFQAKgEAKgBQAMABAKAEQAJAEAHAIQAHAHAEAKQAEAKAAALQAAAMgEAKQgEAJgHAHQgHAIgJAEQgKAEgMAAQgKAAgKgEQgKgGgGgIIAAAAIAABOgAgOg+QgGADgFAEQgEAFgDAHQgCAHAAAHQAAAJACAGQADAHAEAFQAFADAGADQAGADAIgBQAHABAHgDQAGgDAEgDQAFgFACgHQADgGAAgJQAAgHgDgHQgCgHgFgFQgEgEgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_6.setTransform(128.175,63.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_7.setTransform(108.975,60.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#020201").s().p("AgOAyQgKgDgHgIQgHgHgEgKQgEgJAAgMQAAgMAEgKQAEgKAHgIQAHgGAKgFQAKgDALAAQAMAAAKADQALAEAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLAAgKgFg");
	this.shape_8.setTransform(97.975,60.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#020201").s().p("AAaA2IAAg9QAAgIgCgEQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAEQgEAEgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_9.setTransform(86.125,60.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_10.setTransform(73.875,60.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#020201").s().p("AgdA2IAAhoIAUAAIAAAQIAAAAQACgEAEgEIAGgFIAIgEIALgCQAEABAEABIgBAWIgEgCIgGAAQgOAAgGAIQgJAIABAQIAAA1g");
	this.shape_11.setTransform(64.5,60.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_12.setTransform(53.875,60.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#020201").s().p("AgNBVIAAhXIgWAAIAAgRIAWAAIAAgXQAAgVAIgLQAHgKAUAAIAGAAIAJACIgCARIgGgBIgGgBQgFAAgDACQgEACgCADQgCADAAAFIgBAJIAAAYIAXAAIAAARIgXAAIAABXg");
	this.shape_13.setTransform(44.05,57.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_14.setTransform(34.275,60.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#020201").s().p("AAdBOIgnhEIgXAAIAABEIgVAAIAAibIA2AAQAOAAAKAFQAKADAFAHQAGAGACAHQACAJAAAHQAAAIgCAGQgDAHgFAGQgFAFgHADQgHAEgJABIAsBHgAghgIIAcAAIALgBQAGgBAFgDQAEgCADgGQADgEAAgIQAAgIgDgFQgDgFgEgCQgFgEgGgBIgLgBIgcAAg");
	this.shape_15.setTransform(22.225,58.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.onecompletewave_mccopy2, new cjs.Rectangle(10.8,42.1,164.7,74), null);


(lib.onecompletewave_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{onecompletewave:0,"referencepoint":4,redline1:9,redline2:14});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		this.stop();
	}
	this.frame_9 = function() {
		this.stop();
	}
	this.frame_14 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(5).call(this.frame_9).wait(5).call(this.frame_14).wait(21));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgghAIBBBAIhBBBg");
	this.shape.setTransform(139,98);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgfAAIBAhAIAACBg");
	this.shape_1.setTransform(4.2,98);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgWA4QgLgEgIgIQgHgJgFgLQgEgMAAgMQAAgMAEgMQAGgLAHgJQAIgHALgFQALgFANAAQALAAAKAFQALAEAIAHQAHAJAEALQAEAMAAANIAAAGIheAAQABAIADAGQADAHAFAGQAFAEAHAEQAHADAGAAQANgBAJgEQAJgFAHgIIAOALQgKAOgMAFQgNAFgRAAQgMABgLgGgAgYgiQgKAKgCAOIBJAAQgBgOgJgKQgJgIgRgBQgPABgKAIg");
	this.shape_2.setTransform(238.75,51.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgJA7Igwh0IAXAAIAkBaIAAAAIAjhaIAVAAIguB0g");
	this.shape_3.setTransform(225.775,51.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgYA8QgIgDgGgFQgFgEgEgGQgDgHgBgIQABgPAHgIQAIgHALgFQALgDANgBIAWgBIAIAAIAAgEQAAgNgIgGQgHgHgOAAQgJAAgIAEQgJADgIAGIgMgNQAJgJAMgEQANgFAMAAQAaAAALANQALAMAAAZIAAAxIABALIABAKIgTAAIgBgJIAAgJQgGAJgKAGQgJAFgMAAQgJAAgJgBgAgSAHQgMAGAAAMQAAALAIAFQAHAEALAAQAIAAAHgDQAFgDAFgFQAFgEACgGQACgHAAgHIAAgIIgTAAQgTAAgKAFg");
	this.shape_4.setTransform(213.05,51.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAgA7IgghZIgBAAIgdBZIgUAAIgmh0IAVAAIAbBZIAfhZIATAAIAfBZIABAAIAahZIAVAAIgmB0g");
	this.shape_5.setTransform(197.475,51.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgWA4QgLgEgIgIQgHgJgFgLQgEgMAAgMQAAgMAEgMQAGgLAHgJQAIgHALgFQALgFAMAAQAMAAALAFQAKAEAIAHQAHAJAEALQAEAMAAANIAAAGIheAAQABAIADAGQADAHAFAGQAFAEAHAEQAHADAGAAQANgBAJgEQAIgFAIgIIAOALQgKAOgMAFQgNAFgRAAQgMABgLgGgAgYgiQgKAKgCAOIBJAAQgBgOgJgKQgJgIgRgBQgPABgKAIg");
	this.shape_6.setTransform(174.3,51.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAfBfIAAhHQAAgPgGgIQgGgIgPAAQgHAAgIAEQgGADgFAFQgEAGgDAIQgCAJAAAJIAAA6IgTAAIAAi8IATAAIAABYIABAAIAGgHIAIgHIALgEQAFgCAGAAQAMAAAJAEQAHADAGAHQAFAGADAIQADAJAAAKIAABJg");
	this.shape_7.setTransform(160.4,48.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AABBKQgGgDgDgFQgEgFgBgIIgBgQIAAg/IgZAAIAAgQIAZAAIAAghIATAAIAAAhIAiAAIAAAQIgiAAIAAA5IAAALIACAIQACAEADADQAEACAGAAIAJgBIAJgDIAAASIgLADIgMAAQgKAAgGgCg");
	this.shape_8.setTransform(148.975,50.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgPBgIAAhjIgZAAIAAgRIAZAAIAAgaQAAgLACgJQACgJAFgGQAFgHAHgDQAIgEAMAAIAIAAIAHADIgDASQgHgDgGAAQgHAAgFADQgEACgCAFQgDAEAAAHIAAAOIAAAWIAcAAIAAARIgcAAIAABjg");
	this.shape_9.setTransform(318.9,18.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgYA5QgMgFgIgHQgIgJgFgLQgFgLAAgOQAAgNAFgLQAFgLAIgIQAIgJAMgEQAMgEAMAAQAOAAALAEQAMAEAIAJQAIAIAFALQAFALAAANQAAAOgFALQgFALgIAJQgIAHgMAFQgLAFgOAAQgMAAgMgFgAgQgnQgIADgFAGQgGAGgDAIQgDAIAAAIQAAAKADAHQADAIAGAGQAFAGAIADQAIAEAIAAQAJAAAIgEQAIgDAFgGQAGgGADgIQADgHAAgKQAAgIgDgIQgDgIgGgGQgFgGgIgDQgIgDgJAAQgIAAgIADg");
	this.shape_10.setTransform(307.075,22.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgWA5QgLgFgIgIQgHgIgEgMQgFgMAAgMQAAgNAFgLQAFgLAHgIQAIgJALgEQALgEANAAQALAAAKADQALAFAHAIQAIAHAEAMQAEALAAAOIAAAGIheAAQABAHADAHQADAIAFAEQAFAGAHACQAGADAIABQAMAAAJgFQAIgFAIgIIAOAMQgKANgMAFQgNAGgQAAQgNgBgLgEgAgYghQgKAIgCAQIBJAAQAAgQgKgIQgJgKgQABQgQgBgKAKg");
	this.shape_11.setTransform(285.75,22.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgJBeIAAi8IATAAIAAC8g");
	this.shape_12.setTransform(275.825,19.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgQA5QgLgFgIgHQgIgJgEgLQgFgMAAgNQAAgMAFgMQAEgLAIgIQAIgIALgFQALgEANAAQANAAAMAEQALAFAJAJIgQANQgGgHgHgDQgHgDgJAAQgJAAgHADQgIADgFAGQgFAGgCAIQgDAIAAAIQAAAJADAIQADAIAFAGQAFAGAIADQAHAEAIAAQATAAALgPIAOAOQgIAJgMAFQgLAFgNAAQgNAAgLgFg");
	this.shape_13.setTransform(267.175,22.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AguBYQgEgBgEgBIACgRQADABAEAAIAHABQAKAAAEgGQAFgFADgIIAIgXIgxh1IAXAAIAjBbIABAAIAjhbIAVAAIg5CPIgFAOIgHALQgFAEgGACQgGACgJABIgJgBg");
	this.shape_14.setTransform(254.725,25.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgQA5QgLgFgIgHQgIgJgEgLQgFgMAAgNQAAgMAFgMQAEgLAIgIQAIgIALgFQALgEANAAQANAAAMAEQALAFAJAJIgQANQgGgHgHgDQgHgDgJAAQgJAAgHADQgIADgFAGQgFAGgCAIQgDAIAAAIQAAAJADAIQADAIAFAGQAFAGAIADQAHAEAIAAQATAAALgPIAOAOQgIAJgMAFQgLAFgNAAQgNAAgLgFg");
	this.shape_15.setTransform(243.075,22.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgWA5QgLgFgIgIQgHgIgEgMQgFgMAAgMQAAgNAFgLQAFgLAHgIQAIgJALgEQALgEANAAQALAAAKADQALAFAHAIQAIAHAEAMQAEALAAAOIAAAGIheAAQABAHADAHQADAIAFAEQAFAGAHACQAGADAIABQAMAAAJgFQAIgFAIgIIAOAMQgKANgMAFQgNAGgQAAQgNgBgLgEgAgYghQgKAIgCAQIBJAAQAAgQgKgIQgJgKgQABQgQgBgKAKg");
	this.shape_16.setTransform(222.75,22.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AABBJQgGgCgDgFQgEgFgBgIIgBgQIAAg/IgZAAIAAgRIAZAAIAAggIATAAIAAAgIAiAAIAAARIgiAAIAAA6IAAALIACAIQACADADACQAEACAGABIAJgCIAJgDIAAASIgLADIgMACQgKgBgGgDg");
	this.shape_17.setTransform(211.325,21.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgWA5QgLgFgIgIQgHgIgFgMQgEgMAAgMQAAgNAEgLQAGgLAHgIQAIgJALgEQALgEANAAQALAAAKADQALAFAIAIQAHAHAEAMQAEALAAAOIAAAGIheAAQABAHADAHQADAIAFAEQAFAGAHACQAHADAGABQANAAAJgFQAJgFAHgIIAOAMQgKANgMAFQgNAGgRAAQgMgBgLgEgAgYghQgKAIgCAQIBJAAQgBgQgJgIQgJgKgRABQgPgBgKAKg");
	this.shape_18.setTransform(200.05,22.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgJBeIAAi8IATAAIAAC8g");
	this.shape_19.setTransform(190.125,19.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("Ag9BZIAAiuIAUAAIAAARIAAAAQAIgJALgFQALgFALAAQAOAAALAEQAMAFAIAIQAIAIAEAMQAFALAAANQAAAOgFAKQgEALgIAIQgIAIgLAFQgLAFgMAAQgOgBgMgGQgMgHgGgKIAAAAIAABOgAgRhCQgIADgFAGQgGAGgCAIQgDAIAAAJQAAAKADAHQACAIAGAFQAFAGAIADQAIAEAJAAQAJAAAHgEQAIgDAGgGQAFgFADgIQADgHAAgKQAAgJgDgIQgDgIgFgGQgGgGgIgDQgHgDgJAAQgJAAgIADg");
	this.shape_20.setTransform(179.725,25.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("ABFA8IAAhFIgBgMQgCgGgCgEQgEgFgFgCQgGgDgJAAQgFAAgGADQgGACgEAEQgEAFgCAHQgCAGAAAHIAABDIgTAAIAAhCQAAgTgFgIQgFgIgNAAQgJAAgHADQgHADgEAHQgEAGgDAHQgCAJAAAJIAAA5IgTAAIAAhYIgBgPIAAgNIASAAIABAKIAAAJIAAAAIAFgIIAJgHIAMgFQAGgCAHAAQAJAAAHADQAHACADADQAEAEACADIAEAHQAGgKAJgGQAJgGANAAQANAAAIAEQAIADAGAGQAFAHACAJQACAIAAAMIAABGg");
	this.shape_21.setTransform(161.1,22.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgYA5QgMgFgIgHQgIgJgFgLQgFgLAAgOQAAgNAFgLQAFgLAIgIQAIgJAMgEQAMgEAMAAQAOAAALAEQAMAEAIAJQAIAIAFALQAFALAAANQAAAOgFALQgFALgIAJQgIAHgMAFQgLAFgOAAQgMAAgMgFgAgQgnQgIADgFAGQgGAGgDAIQgDAIAAAIQAAAKADAHQADAIAGAGQAFAGAIADQAIAEAIAAQAJAAAIgEQAIgDAFgGQAGgGADgIQADgHAAgKQAAgIgDgIQgDgIgGgGQgFgGgIgDQgIgDgJAAQgIAAgIADg");
	this.shape_22.setTransform(143.075,22.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgQA5QgLgFgIgHQgIgJgEgLQgFgMAAgNQAAgMAFgMQAEgLAIgIQAIgIALgFQALgEANAAQANAAAMAEQALAFAJAJIgQANQgGgHgHgDQgHgDgJAAQgJAAgHADQgIADgFAGQgFAGgCAIQgDAIAAAIQAAAJADAIQADAIAFAGQAFAGAIADQAHAEAIAAQATAAALgPIAOAOQgIAJgMAFQgLAFgNAAQgNAAgLgFg");
	this.shape_23.setTransform(130.025,22.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgWA5QgMgFgHgIQgHgIgFgMQgEgMAAgMQAAgNAEgLQAGgLAHgIQAIgJALgEQALgEANAAQALAAAKADQALAFAHAIQAIAHAEAMQAEALAAAOIAAAGIheAAQABAHADAHQADAIAFAEQAFAGAHACQAHADAHABQAMAAAJgFQAJgFAHgIIAOAMQgKANgMAFQgNAGgQAAQgNgBgLgEgAgYghQgKAIgCAQIBJAAQAAgQgKgIQgJgKgQABQgQgBgKAKg");
	this.shape_24.setTransform(109.7,22.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAgA8IAAhFQAAgPgHgJQgGgIgOAAQgIAAgHADQgHADgEAHQgEAGgDAHQgCAJAAAJIAAA5IgTAAIAAhYIgBgPIAAgNIASAAIABAKIAAAJIAAAAIAFgIIAJgHIAMgFQAFgCAHAAQAMAAAIAEQAIADAGAHQAFAFADAKQADAIgBALIAABHg");
	this.shape_25.setTransform(95.75,22.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgkBWQgRgHgMgMQgNgNgHgRQgHgRAAgUQAAgTAHgRQAHgRANgMQAMgNARgHQARgHATAAQAUAAARAHQARAHAMANQANAMAHARQAHARAAATQAAAUgHARQgHARgNANQgMAMgRAHQgRAHgUAAQgTAAgRgHgAgbhCQgNAFgKAKQgJAKgFANQgFAOAAAOQAAAQAFANQAFANAJAKQAKAKANAGQAMAFAPABQAQgBAMgFQANgGAKgKQAJgKAFgNQAFgNAAgQQAAgOgFgOQgFgNgJgKQgKgKgNgFQgMgHgQAAQgPAAgMAHg");
	this.shape_26.setTransform(78.425,19.7);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFEAD").s().p("AyzDeIjgAAQgogBAAgoIAApGQAAgoAogBMAsnAAAQAoABAAAoIAAJGQAAAogoABMglGAAAIkBDcg");
	this.shape_27.setTransform(194.8,44.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FF0000").s().p("AqLAKQgEAAgDgDQgDgDAAgEQAAgDADgDQADgDAEAAIUXAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAg");
	this.shape_28.setTransform(70.4,98.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("ALFIFQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArSIFQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgALFGNQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArSGNQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgALFEVQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArSEVQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgALFCdQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArSCdQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgALFAlQgDgDAAgEIAAg7QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA7QAAAEgDADQgDADgEAAQgEAAgDgDgArSAlQgDgDAAgEIAAg7QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA7QAAAEgDADQgDADgEAAQgEAAgDgDgALFhSQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArShSQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgALFjKQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArSjKQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgALFlCQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArSlCQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgALFm6QgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgArSm6QgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDg");
	this.shape_29.setTransform(71.6,146.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#3399CC").s().p("AibARIAAgCQAAgMAMgBIAbAAIATAAIAAgGIAAjIIDMAAIAADIIgBAGIAlAAQANAAAAANIAAAEIiYC6g");
	this.shape_30.setTransform(28.275,95.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2B81AD").s().p("ABFDKIiei8IAAgCQAAgMAOAAIASAAQgNAAAAAMIAAACICgC8QgEAFgFAAQgGAAgGgFgAgeAAIgBgGIAAjIIATAAIAADIIABAGg");
	this.shape_31.setTransform(19.725,95.3689);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#020201").s().p("AAABBQgFgDgDgFQgDgFgBgGIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADABAGAAIAHAAQAEAAADgCIAAASQgEABgFABIgJABQgMAAgGgDg");
	this.shape_32.setTransform(168.825,59.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#020201").s().p("AAaA2IAAg9QAAgIgCgEQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAEQgEAEgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_33.setTransform(159.125,60.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#020201").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgEgFgBgFQABgHAEgEQAEgEAFAAQAGAAAEAEQAFAEAAAHQAAAFgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_34.setTransform(150.35,58.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#020201").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_35.setTransform(141.2,60.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#020201").s().p("Ag2BVIAAimIAUAAIAAAPIAAAAQAGgIAKgFQAKgEAKgBQAMABAKAEQAJAEAHAIQAHAHAEAKQAEAKAAALQAAAMgEAKQgEAJgHAHQgHAIgJAEQgKAEgMAAQgKAAgKgEQgKgGgGgIIAAAAIAABOgAgOg+QgGADgFAEQgEAFgDAHQgCAHAAAHQAAAJACAGQADAHAEAFQAFADAGADQAGADAIgBQAHABAHgDQAGgDAEgDQAFgFACgHQADgGAAgJQAAgHgDgHQgCgHgFgFQgEgEgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_36.setTransform(128.175,63.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_37.setTransform(108.975,60.825);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#020201").s().p("AgOAyQgKgDgHgIQgHgHgEgKQgEgJAAgMQAAgMAEgKQAEgKAHgIQAHgGAKgFQAKgDALAAQAMAAAKADQALAEAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLAAgKgFg");
	this.shape_38.setTransform(97.975,60.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#020201").s().p("AAaA2IAAg9QAAgIgCgEQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAEQgEAEgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_39.setTransform(86.125,60.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_40.setTransform(73.875,60.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#020201").s().p("AgdA2IAAhoIAUAAIAAAQIAAAAQACgEAEgEIAGgFIAIgEIALgCQAEABAEABIgBAWIgEgCIgGAAQgOAAgGAIQgJAIABAQIAAA1g");
	this.shape_41.setTransform(64.5,60.7);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_42.setTransform(53.875,60.825);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#020201").s().p("AgNBVIAAhXIgWAAIAAgRIAWAAIAAgXQAAgVAIgLQAHgKAUAAIAGAAIAJACIgCARIgGgBIgGgBQgFAAgDACQgEACgCADQgCADAAAFIgBAJIAAAYIAXAAIAAARIgXAAIAABXg");
	this.shape_43.setTransform(44.05,57.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#020201").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_44.setTransform(34.275,60.825);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#020201").s().p("AAdBOIgnhEIgXAAIAABEIgVAAIAAibIA2AAQAOAAAKAFQAKADAFAHQAGAGACAHQACAJAAAHQAAAIgCAGQgDAHgFAGQgFAFgHADQgHAEgJABIAsBHgAghgIIAcAAIALgBQAGgBAFgDQAEgCADgGQADgEAAgIQAAgIgDgFQgDgFgEgCQgFgEgGgBIgLgBIgcAAg");
	this.shape_45.setTransform(22.225,58.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#3FBFFF").s().p("AgVAWQgJgJAAgNQAAgNAJgJQAJgIAMgBQAOABAJAIQAIAJABANQgBANgIAJQgJAJgOAAQgMAAgJgJg");
	this.shape_46.setTransform(28.05,76.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#4781B4").s().p("AgWAWQgIgJgBgNQABgNAIgJQAKgIAMgBQAOABAIAIQAJAJAAANQAAANgJAJQgIAJgOAAQgMAAgKgJg");
	this.shape_47.setTransform(170.05,76.35);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FF0000").s().p("ALHIZQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQIZQgCgCAAgDIAAgyQAAgDACgCQACgCADAAQADAAACACQACACAAADIAAAyQAAADgCACQgCACgDABQgDgBgCgCgArQGrQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHGhQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQEzQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHEpQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgArQC7QgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHCxQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQBDQgCgCAAgDIAAg8QAAgCACgCQACgCADgBQADABACACQACACAAACIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHA5QgCgCAAgDIAAg7QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA7QAAADgCACQgCACgDABQgDgBgCgCgArQg0QgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHg+QgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgArQisQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHi2QgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQkkQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHkuQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQmcQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHmmQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgAq4oKQgDgBgBgDQgBgDABgDQACgDADgBQAIgCAMgBIApAAQADABACACQACACAAADQAAADgCACQgCACgDABIgpAAQgJgBgHADIgCAAIgDgBgAKtoLIgJAAIgzAAQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIAzAAIAKABQADAAACADQACACAAADQAAADgDACQgCACgDAAIAAAAgAH5oLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABgAGBoLQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAEJoLQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABgACRoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABgAAZoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAheoLQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAjWoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABgAlOoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAnGoLQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAo+oLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABg");
	this.shape_48.setTransform(99.05,128.2999);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_49.setTransform(117.875,139.175);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgHAvIgmhdIASAAIAcBJIABAAIAbhJIARAAIglBdg");
	this.shape_50.setTransform(107.475,139.175);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgTAvQgGgBgFgEQgEgDgEgGQgCgFAAgHQAAgLAGgHQAGgFAJgEQAJgDAKgBIASAAIAGAAIAAgDQAAgKgGgGQgHgFgKAAQgHAAgHADQgHACgGAFIgKgKQAIgHAJgEQAKgDAKAAQAUAAAJAKQAKAJgBAUIAAAoIABAIIABAIIgPAAIgBgHIAAgHIgBAAQgEAHgIAFQgHAEgKAAQgIAAgGgCgAgOAGQgKAEABAKQgBAJAHADQAGAEAIAAQAGAAAFgCQAFgDADgDQAEgEACgFIACgLIAAgGIgPAAQgPAAgIAEg");
	this.shape_51.setTransform(97.3,139.175);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AAaAvIgahHIgYBHIgQAAIgehdIARAAIAVBHIABAAIAYhHIAPAAIAZBHIAAAAIAVhHIARAAIgeBdg");
	this.shape_52.setTransform(84.875,139.175);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_53.setTransform(146.625,115.825);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AAZBMIAAg4QAAgNgFgGQgFgGgLAAQgHAAgFACQgGADgDAEQgEAFgCAGQgBAHAAAIIAAAuIgQAAIAAiXIAQAAIAABHIAAAAIAFgGQACgCAEgCIAJgEQAEgBAFgBQAJAAAHAEQAHACAEAFQAEAFADAGQACAIAAAHIAAA7g");
	this.shape_54.setTransform(135.525,112.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAAA7QgEgCgCgEQgDgEgBgGIgBgNIAAgzIgUAAIAAgNIAUAAIAAgaIAPAAIAAAaIAbAAIAAANIgbAAIAAAuIAAAJIABAGQACADADACQACACAGAAIAHgBIAGgCIABAOQgEACgFAAIgJABQgJAAgFgCg");
	this.shape_55.setTransform(126.375,114.625);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgLBNIAAhQIgVAAIAAgNIAVAAIAAgVQAAgIABgIQACgHAEgFQAEgFAFgDQAGgDAKAAIAGABIAGACIgCANQgGgCgFAAQgGAAgDADQgEACgCADIgCAJIAAAMIAAARIAXAAIAAANIgXAAIAABQg");
	this.shape_56.setTransform(114.575,112.825);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgTAuQgKgEgGgGQgHgHgEgJQgDgJAAgLQAAgKADgJQAEgJAHgHQAGgGAKgEQAJgDAKAAQALAAAJADQAJAEAGAGQAIAHADAJQAEAJAAAKQAAALgEAJQgDAJgIAHQgGAGgJAEQgJADgLAAQgKAAgJgDgAgNgfQgGACgEAFQgEAFgDAGQgCAHAAAGQAAAHACAHQADAGAEAFQAEAEAGADQAHADAGAAQAHAAAHgDQAGgDAEgEQAFgFACgGQACgHAAgHQAAgGgCgHQgCgGgFgFQgEgFgGgCQgHgDgHAAQgGAAgHADg");
	this.shape_57.setTransform(105.1,115.825);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_58.setTransform(88.075,115.825);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgHBMIAAiXIAPAAIAACXg");
	this.shape_59.setTransform(80.1,112.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgNAuQgJgEgGgHQgGgGgEgJQgDgJAAgLQAAgKADgJQAEgJAGgGQAGgHAJgEQAJgDAKAAQAKAAAKADQAJAEAHAIIgMALQgFgHgGgCQgGgDgHAAQgHAAgGADQgGACgEAFQgEAFgCAGQgCAHAAAGQAAAHADAGQACAHAEAFQAEAEAGADQAGADAGAAQAPAAAJgMIALALQgGAIgKAEQgJADgKAAQgKAAgJgDg");
	this.shape_60.setTransform(73.225,115.825);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgkBGQgEAAgDgCIACgNIAFABIAGAAQAHAAAEgEQAEgEACgHIAHgSIgnhdIASAAIAcBJIAAAAIAchJIARAAIgtByIgEALIgGAIQgDAEgFACQgFACgHAAIgHgBg");
	this.shape_61.setTransform(63.225,118.225);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgNAuQgJgEgGgHQgGgGgEgJQgDgJAAgLQAAgKADgJQAEgJAGgGQAGgHAJgEQAJgDAKAAQAKAAAKADQAJAEAHAIIgMALQgFgHgGgCQgGgDgHAAQgHAAgGADQgGACgEAFQgEAFgCAGQgCAHAAAGQAAAHADAGQACAHAEAFQAEAEAGADQAGADAGAAQAPAAAJgMIALALQgGAIgKAEQgJADgKAAQgKAAgJgDg");
	this.shape_62.setTransform(53.925,115.825);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_63.setTransform(159.575,92.475);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AAAA7QgEgCgCgEQgDgEgBgGIgBgNIAAgzIgUAAIAAgNIAUAAIAAgaIAPAAIAAAaIAbAAIAAANIgbAAIAAAuIAAAJIABAGQACADADACQACACAGAAIAHgBIAGgCIABAOQgEACgFAAIgJABQgJAAgFgCg");
	this.shape_64.setTransform(150.425,91.275);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_65.setTransform(141.425,92.475);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgHBLIAAiVIAPAAIAACVg");
	this.shape_66.setTransform(133.45,89.6);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgxBHIAAiKIAQAAIAAANIABAAQAGgHAJgFQAIgEAJAAQALAAAJAEQAJAEAHAGQAGAHAEAJQADAJAAAKQAAALgDAJQgEAIgGAHQgGAGgJAEQgIAEgKAAQgMAAgKgGQgJgFgEgIIgBAAIAAA+gAgOg1QgFADgFAFQgFAEgCAHQgCAGAAAHQAAAIACAGQACAGAFAEQAFAFAFADQAGACAIAAQAHAAAGgCQAGgDAEgFQAFgEACgGQADgGgBgIQABgHgDgGQgCgHgFgEQgEgFgGgDQgGgCgHAAQgIAAgGACg");
	this.shape_67.setTransform(125.2,94.625);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AA3AwIAAg3IgBgJQgBgFgCgDQgDgEgEgDQgFgBgGAAQgFAAgFABQgEACgEAEQgDADgCAGQgCAFAAAGIAAA1IgOAAIAAg0QAAgQgFgGQgEgGgJAAQgIgBgFADQgGADgDAFQgEAEgCAGQgBAIAAAHIAAAtIgQAAIAAhGIAAgMIgBgKIAPAAIAAAHIABAIIAEgHIAHgFIAJgFQAFgBAGAAQAIAAAFACIAIAEQADADACAEIADAFQAFgJAHgEQAHgFAKAAQAKAAAHADQAHADAEAEQAEAGACAHQACAHAAAJIAAA4g");
	this.shape_68.setTransform(110.275,92.35);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgTAuQgKgEgGgGQgGgHgFgJQgDgJAAgLQAAgKADgJQAFgJAGgHQAGgGAKgEQAJgDAKAAQALAAAJADQAJAEAGAGQAIAHADAJQAEAJAAAKQAAALgEAJQgDAJgIAHQgGAGgJAEQgJADgLAAQgKAAgJgDgAgNgfQgGACgEAFQgFAFgCAGQgDAHABAGQgBAHADAHQACAGAFAFQAEAEAGADQAGADAHAAQAIAAAFgDQAHgDAEgEQAEgFADgGQACgHAAgHQAAgGgCgHQgDgGgEgFQgEgFgHgCQgFgDgIAAQgHAAgGADg");
	this.shape_69.setTransform(95.85,92.475);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgNAuQgJgEgGgHQgGgGgEgJQgDgJAAgLQAAgKADgJQAEgJAGgGQAGgHAJgEQAJgDAKAAQAKAAAKADQAJAEAHAIIgMALQgFgHgGgCQgGgDgHAAQgHAAgGADQgGACgEAFQgEAFgCAGQgCAHAAAGQAAAHADAGQACAHAEAFQAEAEAGADQAGADAGAAQAPAAAJgMIALALQgGAIgKAEQgJADgKAAQgKAAgJgDg");
	this.shape_70.setTransform(85.425,92.475);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_71.setTransform(69.175,92.475);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AAaAwIAAg3QAAgMgGgHQgFgGgLAAQgGgBgGADQgFADgEAFQgDAEgCAGQgCAIAAAHIAAAtIgPAAIAAhGIgBgMIAAgKIAPAAIAAAHIAAAIIAFgHIAHgFIAJgFQAEgBAGAAQAJAAAHADQAGACAFAFQAEAFACAIQACAHAAAIIAAA5g");
	this.shape_72.setTransform(58.025,92.35);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgdBFQgOgGgJgKQgKgKgGgNQgFgOAAgQQAAgPAFgOQAGgNAKgKQAJgKAOgGQANgFAQAAQAQAAANAFQAOAGAKAKQAKAKAGANQAFAOAAAPQAAAQgFAOQgGANgKAKQgKAKgOAGQgNAFgQAAQgQAAgNgFgAgWg1QgKAEgHAIQgIAIgEALQgEALAAALQAAAMAEALQAEALAIAIQAHAIAKAEQALAFALAAQAMAAALgFQAKgEAIgIQAHgIAEgLQAEgLAAgMQAAgLgEgLQgEgLgHgIQgIgIgKgEQgLgFgMAAQgLAAgLAFg");
	this.shape_73.setTransform(44.15,90.075);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgTAvQgGgBgFgEQgFgDgDgGQgCgFAAgHQAAgLAGgHQAGgFAJgEQAIgDALgBIASAAIAGAAIAAgDQAAgKgGgGQgHgFgLAAQgGAAgHADQgIACgFAFIgKgKQAHgHAKgEQAKgDAJAAQAVAAAKAKQAIAJABAUIAAAoIAAAIIABAIIgPAAIgBgHIAAgHIgBAAQgEAHgIAFQgIAEgJAAQgIAAgGgCgAgOAGQgJAEAAAKQAAAJAFADQAGAEAKAAQAFAAAFgCQAFgDADgDQAEgEACgFIACgLIAAgGIgQAAQgOAAgIAEg");
	this.shape_74.setTransform(233.9,136.625);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAZBMIAAg5QAAgMgFgHQgFgFgLAAQgHAAgFADQgGACgDAEQgEAEgCAHQgBAHAAAIIAAAuIgQAAIAAiWIAQAAIAABGIAAAAIAFgGQACgCAEgDIAJgDQAEgCAFABQAJAAAHACQAHADAEAFQAEAFADAGQACAIAAAHIAAA7g");
	this.shape_75.setTransform(272.125,110.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgTAuQgJgEgHgGQgHgHgDgJQgEgJAAgLQAAgKAEgJQADgJAHgHQAHgGAJgEQAJgDAKAAQAKAAAKADQAJAEAHAGQAGAHAEAJQAEAJAAAKQAAALgEAJQgEAJgGAHQgHAGgJAEQgKADgKAAQgKAAgJgDgAgNgfQgGACgFAFQgEAFgCAGQgDAHAAAGQAAAHADAHQACAGAEAFQAFAEAGADQAGADAHAAQAHAAAHgDQAGgDAEgEQAFgFACgGQACgHAAgHQAAgGgCgHQgCgGgFgFQgEgFgGgCQgHgDgHAAQgHAAgGADg");
	this.shape_76.setTransform(241.7,113.275);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgHBMIAAiWIAPAAIAACWg");
	this.shape_77.setTransform(216.7,110.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgHBLIAAiWIAPAAIAACWg");
	this.shape_78.setTransform(270.05,87.05);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgwBHIAAiKIAPAAIAAANIABAAQAGgHAIgFQAJgEAJAAQALAAAJAEQAKAEAFAGQAHAHADAJQAFAJAAAKQAAALgFAJQgDAIgGAHQgHAGgIAEQgJAEgJAAQgMAAgKgGQgJgFgEgIIgBAAIAAA+gAgNg1QgHADgEAFQgEAEgCAHQgDAGAAAHQAAAIADAGQACAGAEAEQAEAFAHADQAGACAHAAQAHAAAGgCQAGgDAEgFQAFgEACgGQACgGAAgIQAAgHgCgGQgCgHgFgEQgEgFgGgDQgGgCgHAAQgHAAgGACg");
	this.shape_79.setTransform(261.8,92.075);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AA3AwIAAg3IgBgKQgBgEgCgEQgDgDgEgCQgFgCgGAAQgFAAgFACQgEACgEADQgDADgCAFQgCAGAAAGIAAA1IgOAAIAAg0QAAgQgFgGQgEgHgJABQgIAAgFACQgGADgDAFQgEAEgCAHQgBAGAAAIIAAAtIgQAAIAAhGIAAgNIgBgKIAPAAIAAAIIABAIIAEgHIAHgFIAJgFQAFgBAGAAQAIAAAFACIAIAFQADACACADIADAGQAFgIAHgGQAHgEAKAAQAKAAAHACQAHADAEAFQAEAFACAIQACAHAAAJIAAA4g");
	this.shape_80.setTransform(246.875,89.8);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AAaAwIAAg3QAAgMgGgHQgFgHgLABQgGAAgGACQgFADgEAFQgDAEgCAHQgCAGAAAIIAAAtIgPAAIAAhGIgBgNIAAgKIAPAAIAAAIIAAAIIAFgHIAHgFIAJgFQAEgBAGAAQAJAAAHADQAGADAFAEQAEAFACAHQACAIAAAIIAAA5g");
	this.shape_81.setTransform(194.625,89.8);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgdBFQgOgGgJgKQgKgKgGgNQgFgOAAgQQAAgPAFgOQAGgNAKgKQAJgKAOgGQANgFAQAAQAQAAANAFQAOAGAKAKQAKAKAFANQAGAOAAAPQAAAQgGAOQgFANgKAKQgKAKgOAGQgNAFgQAAQgQAAgNgFgAgWg1QgKAEgIAIQgHAIgEALQgEALAAALQAAAMAEALQAEALAHAIQAIAIAKAEQALAFALAAQANAAAJgFQALgEAHgIQAIgIAEgLQAEgLAAgMQAAgLgEgLQgEgLgIgIQgHgIgLgEQgJgFgNAAQgLAAgLAFg");
	this.shape_82.setTransform(180.75,87.525);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#3FBFFF").s().p("AgWAWQgIgJgBgNQABgNAIgJQAKgIAMgBQAOABAIAIQAJAJAAANQAAANgJAJQgIAJgOAAQgMAAgKgJg");
	this.shape_83.setTransform(170.05,76.35);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#4781B4").s().p("AgWAWQgIgJgBgNQABgNAIgJQAKgIAMgBQAOABAIAIQAKAJgBANQABANgKAJQgIAJgOAAQgMAAgKgJg");
	this.shape_84.setTransform(312.05,76.35);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FF0000").s().p("ALHIZQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQIZQgCgCgBgDIAAgyQABgDACgCQACgCADAAQADAAACACQACACAAADIAAAyQAAADgCACQgCACgDABQgDgBgCgCgArQGrQgCgCgBgDIAAg8QABgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHGhQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQEzQgCgCgBgDIAAg8QABgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHEpQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgArQC7QgCgCgBgDIAAg8QABgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHCxQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQBDQgCgCgBgDIAAg8QABgCACgCQACgCADgBQADABACACQACACAAACIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHA5QgCgCAAgDIAAg7QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA7QAAADgCACQgCACgDABQgDgBgCgCgArQg0QgCgCgBgDIAAg8QABgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHg+QgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgArQisQgCgCgBgDIAAg8QABgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHi2QgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQkkQgCgCgBgDIAAg8QABgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHkuQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgArQmcQgCgCgBgDIAAg8QABgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHmmQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgAq4oKQgDgBgBgDQgBgDABgDQACgDADgBQAIgCAMgBIApAAQADABACACQACACAAADQAAADgCACQgCACgDABIgpAAQgJgBgHADIgCAAIgDgBgAKtoLIgJAAIgzAAQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIAzAAIAKABQADAAACADQACACAAADQAAADgDACQgCACgDAAIAAAAgAH5oLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAGBoLQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAEJoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABgACRoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAAZoLQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAheoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABgAjWoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAlOoLQgDgBgCgCQgCgCAAgDQAAgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABgAnGoLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACABADQgBADgCACQgCACgDABgAo+oLQgDgBgCgCQgCgCgBgDQABgDACgCQACgCADgBIA8AAQADABACACQACACAAADQAAADgCACQgCACgDABg");
	this.shape_85.setTransform(241.05,128.2999);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_86.setTransform(110.475,136.625);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgHAvIgmhdIASAAIAcBJIABAAIAbhJIARAAIglBdg");
	this.shape_87.setTransform(100.075,136.625);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AgTAvQgGgBgFgEQgFgDgDgGQgCgFAAgHQAAgLAGgHQAGgFAJgEQAIgDALgBIASAAIAGAAIAAgDQAAgKgGgGQgHgFgLAAQgGAAgHADQgIACgFAFIgKgKQAHgHAKgEQAKgDAJAAQAVAAAKAKQAIAJABAUIAAAoIAAAIIABAIIgPAAIgBgHIAAgHIgBAAQgEAHgIAFQgIAEgJAAQgIAAgGgCgAgOAGQgJAEAAAKQAAAJAFADQAGAEAJAAQAGAAAFgCQAFgDADgDQAEgEACgFIACgLIAAgGIgQAAQgOAAgIAEg");
	this.shape_88.setTransform(89.9,136.625);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AAaAvIgahHIgYBHIgQAAIgehdIARAAIAVBHIABAAIAYhHIAPAAIAZBHIAAAAIAVhHIARAAIgeBdg");
	this.shape_89.setTransform(77.475,136.625);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_90.setTransform(139.225,113.275);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AAZBMIAAg5QAAgMgFgHQgFgFgLAAQgHAAgFADQgGACgDAEQgEAEgCAHQgBAHAAAIIAAAuIgQAAIAAiWIAQAAIAABGIAAAAIAFgGQACgCAEgDIAJgDQAEgCAFABQAJAAAHACQAHADAEAFQAEAFADAGQACAIAAAHIAAA7g");
	this.shape_91.setTransform(128.125,110.4);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AAAA7QgEgCgCgEQgDgEgBgGIgBgNIAAgzIgUAAIAAgNIAUAAIAAgaIAPAAIAAAaIAbAAIAAANIgbAAIAAAuIAAAJIABAGQACADADACQACACAGAAIAHgBIAGgCIABAOQgEACgFAAIgJABQgJAAgFgCg");
	this.shape_92.setTransform(118.975,112.075);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgLBNIAAhQIgVAAIAAgNIAVAAIAAgVQAAgIABgIQACgHAEgFQAEgFAFgDQAGgDAKAAIAGABIAGACIgCANQgGgCgFAAQgGAAgDADQgEACgCADIgCAJIAAAMIAAARIAXAAIAAANIgXAAIAABQg");
	this.shape_93.setTransform(107.175,110.275);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgTAuQgJgEgHgGQgHgHgDgJQgEgJAAgLQAAgKAEgJQADgJAHgHQAHgGAJgEQAJgDAKAAQAKAAAKADQAJAEAGAGQAHAHAEAJQAEAJAAAKQAAALgEAJQgEAJgHAHQgGAGgJAEQgKADgKAAQgKAAgJgDgAgNgfQgGACgFAFQgEAFgCAGQgDAHAAAGQAAAHADAHQACAGAEAFQAFAEAGADQAGADAHAAQAHAAAHgDQAGgDAEgEQAFgFACgGQACgHAAgHQAAgGgCgHQgCgGgFgFQgEgFgGgCQgHgDgHAAQgHAAgGADg");
	this.shape_94.setTransform(97.7,113.275);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_95.setTransform(80.675,113.275);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgHBMIAAiWIAPAAIAACWg");
	this.shape_96.setTransform(72.7,110.4);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AgNAuQgJgEgGgHQgGgGgEgJQgDgJAAgLQAAgKADgJQAEgJAGgGQAGgHAJgEQAJgDAKAAQAKAAAKADQAJAEAHAIIgMALQgFgHgGgCQgGgDgHAAQgHAAgGADQgGACgEAFQgEAFgCAGQgCAHAAAGQAAAHADAGQACAHAEAFQAEAEAGADQAGADAGAAQAPAAAJgMIALALQgGAIgKAEQgJADgKAAQgKAAgJgDg");
	this.shape_97.setTransform(65.825,113.275);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AgkBGQgEAAgDgCIACgNIAFABIAGAAQAHAAAEgEQAEgEACgHIAHgSIgnhdIASAAIAcBJIAAAAIAchJIARAAIgtByIgEALIgGAIQgDAEgFACQgFACgHAAIgHgBg");
	this.shape_98.setTransform(55.825,115.675);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgNAuQgJgEgGgHQgGgGgEgJQgDgJAAgLQAAgKADgJQAEgJAGgGQAGgHAJgEQAJgDAKAAQAKAAAKADQAJAEAHAIIgMALQgFgHgGgCQgGgDgHAAQgHAAgGADQgGACgEAFQgEAFgCAGQgCAHAAAGQAAAHADAGQACAHAEAFQAEAEAGADQAGADAGAAQAPAAAJgMIALALQgGAIgKAEQgJADgKAAQgKAAgJgDg");
	this.shape_99.setTransform(46.525,113.275);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_100.setTransform(152.175,89.925);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AAAA7QgEgCgCgEQgDgEgBgGIgBgNIAAgzIgUAAIAAgNIAUAAIAAgaIAPAAIAAAaIAbAAIAAANIgbAAIAAAuIAAAJIABAGQACADADACQACACAGAAIAHgBIAGgCIABAOQgEACgFAAIgJABQgJAAgFgCg");
	this.shape_101.setTransform(143.025,88.725);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_102.setTransform(134.025,89.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AgHBLIAAiWIAPAAIAACWg");
	this.shape_103.setTransform(126.05,87.05);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgwBHIAAiKIAPAAIAAANIABAAQAGgHAIgFQAJgEAJAAQALAAAJAEQAKAEAFAGQAHAHADAJQAFAJAAAKQAAALgFAJQgDAIgGAHQgHAGgIAEQgJAEgJAAQgMAAgKgGQgJgFgEgIIgBAAIAAA+gAgNg1QgHADgEAFQgEAEgCAHQgDAGAAAHQAAAIADAGQACAGAEAEQAEAFAHADQAGACAHAAQAHAAAGgCQAGgDAFgFQAEgEACgGQACgGAAgIQAAgHgCgGQgCgHgEgEQgFgFgGgDQgGgCgHAAQgHAAgGACg");
	this.shape_104.setTransform(117.8,92.075);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AA3AwIAAg3IgBgKQgBgEgCgEQgDgDgEgCQgFgCgGAAQgFAAgFACQgEACgEADQgDADgCAFQgCAGAAAGIAAA1IgOAAIAAg0QAAgQgFgGQgEgHgJABQgIAAgFACQgGADgDAFQgEAEgCAHQgBAGAAAIIAAAtIgQAAIAAhGIAAgNIgBgKIAPAAIAAAIIABAIIAEgHIAHgFIAJgFQAFgBAGAAQAIAAAFACIAIAFQADACACADIADAGQAFgIAHgGQAHgEAKAAQAKAAAHACQAHADAEAFQAEAFACAIQACAHAAAJIAAA4g");
	this.shape_105.setTransform(102.875,89.8);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AgTAuQgKgEgGgGQgHgHgEgJQgDgJAAgLQAAgKADgJQAEgJAHgHQAGgGAKgEQAJgDAKAAQALAAAJADQAJAEAGAGQAIAHADAJQAEAJAAAKQAAALgEAJQgDAJgIAHQgGAGgJAEQgJADgLAAQgKAAgJgDgAgNgfQgGACgEAFQgEAFgDAGQgCAHAAAGQAAAHACAHQADAGAEAFQAEAEAGADQAHADAGAAQAHAAAHgDQAGgDAEgEQAFgFACgGQACgHAAgHQAAgGgCgHQgCgGgFgFQgEgFgGgCQgHgDgHAAQgGAAgHADg");
	this.shape_106.setTransform(88.45,89.925);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AgNAuQgJgEgGgHQgGgGgEgJQgDgJAAgLQAAgKADgJQAEgJAGgGQAGgHAJgEQAJgDAKAAQAKAAAKADQAJAEAHAIIgMALQgFgHgGgCQgGgDgHAAQgHAAgGADQgGACgEAFQgEAFgCAGQgCAHAAAGQAAAHADAGQACAHAEAFQAEAEAGADQAGADAGAAQAPAAAJgMIALALQgGAIgKAEQgJADgKAAQgKAAgJgDg");
	this.shape_107.setTransform(78.025,89.925);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AgSAtQgJgEgGgGQgGgHgDgJQgDgJAAgKQAAgKADgJQAEgJAGgHQAHgGAIgEQAJgDAKAAQAJAAAJADQAIADAGAHQAGAGADAJQADAJAAALIAAAFIhLAAQABAGACAFQADAGAEAEQAEAEAFACQAGADAFAAQAKAAAHgEQAHgDAGgHIAMAJQgJALgKAEQgKAEgNAAQgKAAgJgEgAgTgbQgIAIgCAMIA6AAQAAgMgIgIQgHgHgNAAQgMAAgIAHg");
	this.shape_108.setTransform(61.775,89.925);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AAaAwIAAg3QAAgMgGgHQgFgHgLABQgGAAgGACQgFADgEAFQgDAEgCAHQgCAGAAAIIAAAtIgPAAIAAhGIgBgNIAAgKIAPAAIAAAIIAAAIIAFgHIAHgFIAJgFQAEgBAGAAQAJAAAHADQAGADAFAEQAEAFACAHQACAIAAAIIAAA5g");
	this.shape_109.setTransform(50.625,89.8);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AgdBFQgOgGgJgKQgKgKgGgNQgFgOAAgQQAAgPAFgOQAGgNAKgKQAJgKAOgGQANgFAQAAQAQAAANAFQAOAGAKAKQAKAKAFANQAGAOAAAPQAAAQgGAOQgFANgKAKQgKAKgOAGQgNAFgQAAQgQAAgNgFgAgWg1QgKAEgIAIQgHAIgEALQgEALAAALQAAAMAEALQAEALAHAIQAIAIAKAEQALAFALAAQANAAAJgFQALgEAHgIQAIgIAEgLQAEgLAAgMQAAgLgEgLQgEgLgIgIQgHgIgLgEQgJgFgNAAQgLAAgLAFg");
	this.shape_110.setTransform(36.75,87.525);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FF0000").s().p("ArQIGQgCgCgBgEIAAg7QABgEACgCQACgCADAAQADAAACACQACACAAAEIAAA7QAAAEgCACQgCACgDAAQgDAAgCgCgArQGOQgCgCgBgEIAAg8QABgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAAEgCACQgCACgDAAQgDAAgCgCgArQEWQgCgCgBgDIAAg9QABgDACgCQACgCADAAQADAAACACQACACAAADIAAA9QAAADgCACQgCACgDAAQgDAAgCgCgArQCeQgCgCgBgEIAAg7QABgEACgCQACgCADAAQADAAACACQACACAAAEIAAA7QAAAEgCACQgCACgDAAQgDAAgCgCgArQAmQgCgCgBgEIAAg7QABgDACgCQACgCADAAQADAAACACQACACAAADIAAA7QAAAEgCACQgCACgDAAQgDAAgCgCgArQhRQgCgCgBgDIAAg9QABgDACgCQACgCADAAQADAAACACQACACAAADIAAA9QAAADgCACQgCACgDAAQgDAAgCgCgArQjJQgCgCgBgEIAAg7QABgEACgCQACgCADAAQADAAACACQACACAAAEIAAA7QAAAEgCACQgCACgDAAQgDAAgCgCgArQlBQgCgCgBgEIAAg8QABgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAAEgCACQgCACgDAAQgDAAgCgCgArQm5QgCgCgBgDIAAgZQAAgbAQgMQACgCADAAQADABACACQACADAAADQAAADgDACQgJAIgBATIAAAZQAAADgCACQgCACgDAAQgDAAgCgCgALHnYQgCgCgBgDQgDgbgdAAIgCAAQgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIACAAQAsAAADAoQABADgCADQgCACgDAAIgBABQgDAAgCgCgAIqn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAGyn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAE6n4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgADCn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgABKn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAgtn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA7AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAiln4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAkdn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAmVn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAoNn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAgAqFn4QgDAAgCgCQgCgCgBgEQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAAEgCACQgCACgDAAg");
	this.shape_111.setTransform(99.0515,126.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]},4).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{x:69.175,y:92.475}},{t:this.shape_70,p:{x:85.425,y:92.475}},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65,p:{x:141.425,y:92.475}},{t:this.shape_64,p:{x:150.425,y:91.275}},{t:this.shape_63,p:{x:159.575,y:92.475}},{t:this.shape_62,p:{x:53.925,y:115.825}},{t:this.shape_61,p:{x:63.225,y:118.225}},{t:this.shape_60,p:{x:73.225,y:115.825}},{t:this.shape_59},{t:this.shape_58,p:{x:88.075,y:115.825}},{t:this.shape_57,p:{x:105.1,y:115.825}},{t:this.shape_56,p:{x:114.575,y:112.825}},{t:this.shape_55,p:{x:126.375,y:114.625}},{t:this.shape_54},{t:this.shape_53,p:{x:146.625,y:115.825}},{t:this.shape_52,p:{x:84.875,y:139.175}},{t:this.shape_51},{t:this.shape_50,p:{x:107.475,y:139.175}},{t:this.shape_49,p:{x:117.875,y:139.175}},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46}]},5).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_111},{t:this.shape_46},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_71,p:{x:205.775,y:89.925}},{t:this.shape_70,p:{x:222.025,y:89.925}},{t:this.shape_57,p:{x:232.45,y:89.925}},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65,p:{x:278.025,y:89.925}},{t:this.shape_64,p:{x:287.025,y:88.725}},{t:this.shape_63,p:{x:296.175,y:89.925}},{t:this.shape_62,p:{x:190.525,y:113.275}},{t:this.shape_61,p:{x:199.825,y:115.675}},{t:this.shape_60,p:{x:209.825,y:113.275}},{t:this.shape_77},{t:this.shape_58,p:{x:224.675,y:113.275}},{t:this.shape_76},{t:this.shape_56,p:{x:251.175,y:110.275}},{t:this.shape_55,p:{x:262.975,y:112.075}},{t:this.shape_75},{t:this.shape_53,p:{x:283.225,y:113.275}},{t:this.shape_52,p:{x:221.475,y:136.625}},{t:this.shape_74},{t:this.shape_50,p:{x:244.075,y:136.625}},{t:this.shape_49,p:{x:254.475,y:136.625}}]},5).wait(21));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,0,345,198.6);


(lib.next_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRBQIAAiAIguAAIAAgfIB+AAIAAAfIguAAIAACAg");
	this.shape.setTransform(76.2,32.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAlBQIgmhBIgmBBIgqAAIA4hTIg1hMIAtAAIAhA4IAhg4IAqAAIgzBLIA6BUg");
	this.shape_1.setTransform(61.575,32.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag3BQIAAifIBsAAIAAAgIhJAAIAAAeIBFAAIAAAgIhFAAIAAAhIBMAAIAAAgg");
	this.shape_2.setTransform(46.5,32.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAeBQIhFhxIgBAAIAABxIgjAAIAAifIAwAAIBDBuIABAAIAAhuIAjAAIAACfg");
	this.shape_3.setTransform(29.875,32.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#619ACD").s().p("AAAAAIAAAAIAAAAg");
	this.shape_4.setTransform(131.775,34.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FBB040","#F15A29"],[0,1],0,29.7,0,-29.7).s().p("AE/EhIAAiEIuvAAQgUgFAAgNIAAkcQACgSAQgDIOxAAIAAgVIAAgQIAAgfIAAg2QABgMAJAFIEeD9IAWAWQAHAHABAEIgBAFIgBABIAAABIAAAAIgNAOIAAAAIgNANIADgDIkhESIgFABQgGAAgBgIg");
	this.shape_5.setTransform(67.5,34.4646);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F15A29").s().p("AEqFEIAAiHIurAAQgZgDgFgUIAAlOQAEgXAbABIOlAAIACiCQADgYAWALIFWExIgBAAQAUAVgQAYIgEADIABAAIlLE8IgMACQgRAAgEgOgAqGiJIAAEbQAAANAUAGIOvAAIAACEQACALALgFIEhkRIgEADIANgNIAAgBIANgPIAAABIAAgBIABgBIAAAAIACgEQgCgEgHgHIgWgWIkdj9QgKgFgBALIAAA3IAAAfIAAAPIAAAVIuxAAQgQAEgCASg");
	this.shape_6.setTransform(67.6856,33.7363);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["rgba(0,0,0,0.502)","rgba(0,0,0,0)"],[0,1],-66.7,-6.2,66.6,2.4).s().p("AEvCcIvJg+IAAlHIPJA+IAAijIFrFaIlrFDg");
	this.shape_7.setTransform(66.55,41.6,1,1,0,0,0,-0.1,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.next_mc, new cjs.Rectangle(0,0,134.9,77.1), null);


(lib.mc_wrong = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#CC0000","#FF3300"],[0,1],-18.6,32,27.3,-47.4).s().p("AleGqQBajuCWkeQCYkkCGi/IACABICtCTIAAAAIgoA+QhvCwiHELQiGEKhUDPQgIAbAMAKg");
	this.shape.setTransform(-52.4375,34.3875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(0,0,0,0.2)","rgba(0,0,0,0)"],[0,1],15.8,119.7,0,15.8,119.7,204.4).s().p("AAAAAIAAAAIAAAAIABABIgBgBg");
	this.shape_1.setTransform(-64.1,-56.1875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#CC0000","#FF3300"],[0,1],-10.9,9.5,9.4,-10.8).s().p("AjdAkQBVhbBuhCQAhgQAnAMICwBNIgOgEQgpgGgrAWQh1BIhWBfIgBAAg");
	this.shape_2.setTransform(-56.1375,-69.3284);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#CC0000","#FF3300"],[0,1],25.3,-34.5,-31.7,22.5).s().p("AmSCfQDkkEEWjXIErgiQmAEzksGJQg7hrg+hUg");
	this.shape_3.setTransform(28.425,-68.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#C40000","#EA0000"],[0,1],-52.5,61,60.5,-101.4).s().p("AqzPVIgCgCQgMgKAIgbQBUjPCHkKQCHkMBviwIAog9IABgCIgggxQg1hQg3hDQg8hJg/g7QhshlhggoIgCgCQBWheB2hJQArgXApAHIAOADQAdAJAcAXQBUBIBQBtQA+BUA7BrQEsmKF/kzIABAAIAhA7QlgF/kWGzQCrF0BHHKIhqBlQgaAUgOgLIgBAAIAAAAIgBgBIgCgCQgFgGgEgKQhal4iLkRIgsBNQhpC/jYH5IjWAyIgOABQgPAAgIgGg");
	this.shape_4.setTransform(1.973,-5.314);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#9D0000").s().p("AFHJWQhjk0hjjSIArhNQCMERBaF4QAEAKAFAGIAAAAgAh1lXIgBgCQiJi/ibiDQBgAoBsBlQA/A7A8BJQA3BDA0BPIAhAyIgCABg");
	this.shape_5.setTransform(-22.85,10.7125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// sh
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.rf(["rgba(0,0,0,0.2)","rgba(0,0,0,0)"],[0,1],0,0,0,0,0,52.6).s().p("AueGCQmAigAAjiQAAjhGAigQGAifIegBQIfABGACfQF/CgABDhQgBDil/CgQmACgofgBQoeABmAigg");
	this.shape_6.setTransform(-20.3,86.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_wrong, new cjs.Rectangle(-151.3,-103.9,262.1,244.70000000000002), null);


(lib.hint_mccopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSBYIAAiNIgzAAIAAgjICLAAIAAAjIgzAAIAACNg");
	this.shape.setTransform(79.15,24.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAhBYIhNh9IAAAAIAAB9IgnAAIAAiwIA1AAIBKB6IAAAAIAAh6IAoAAIAACwg");
	this.shape_1.setTransform(61.8,24.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSBYIAAiwIAmAAIAACwg");
	this.shape_2.setTransform(47.9,24.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAmBYIAAhMIhLAAIAABMIgnAAIAAiwIAnAAIAABDIBLAAIAAhDIAnAAIAACwg");
	this.shape_3.setTransform(34.7,24.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#353FA3").s().p("AoFEFQghAAAAggIAAnPQAAgTAMgHQH0FLJMCfQAAAfgfAAg");
	this.shape_4.setTransform(55.05,26.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3C47B6").s().p("AogjyQAIgFANgBIQMAAQAgAAAAAhIAAHOIAAABQpNifn0lLg");
	this.shape_5.setTransform(55.625,24.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1E245D").s().p("AgTBYIAAiNIgyAAIAAgjICLAAIAAAjIgzAAIAACNg");
	this.shape_6.setTransform(83.05,25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1E245D").s().p("AAhBYIhMh9IgBAAIAAB9IgnAAIAAiwIA1AAIBKB6IAAAAIAAh6IAoAAIAACwg");
	this.shape_7.setTransform(65.7,25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1E245D").s().p("AgSBYIAAiwIAlAAIAACwg");
	this.shape_8.setTransform(51.8,25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1E245D").s().p("AAmBYIAAhMIhLAAIAABMIgnAAIAAiwIAnAAIAABDIBLAAIAAhDIAnAAIAACwg");
	this.shape_9.setTransform(38.6,25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#353FA3").s().p("AoFEIQghAAAAggIAAnPQAAgTAMgIQAHgFAOAAIQMAAQAfAAAAAgIAAHPIAAABQAAAfgfAAg");
	this.shape_10.setTransform(55.05,26.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.hint_mccopy, new cjs.Rectangle(0,0,110.1,52.8), null);


(lib.highlight_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC00").ss(10,1,1).p("ApvgWIE3j/IAHAAQAVAAAAAWIAAA/QAFgCAHAAINzAAQAVAAABAWIAAFLQAAAWgWAAItzAAQgHAAgFgBIAABLQAAAXgVAAIgDAAIk6kLQgSgTARgOg");
	this.shape.setTransform(63.2496,27.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.highlight_mc, new cjs.Rectangle(-5,-5,136.5,65.6), null);


(lib.hide_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag9BYIAAiwIB3AAIAAAkIhQAAIAAAhIBMAAIAAAjIhMAAIAAAkIBUAAIAAAkg");
	this.shape.setTransform(78.775,24.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhRBYIAAiwIA7AAQAVABASAEQATAFAPALQAOAKAIARQAJARAAAXQAAAWgJARQgIAQgOALQgNALgSAGQgSAFgTAAgAgqA0IAVAAQANAAALgCQALgDAJgGQAIgHAFgKQAFgKAAgPQAAgMgFgKQgFgKgIgGQgIgGgLgDQgKgDgNgBIgXAAg");
	this.shape_1.setTransform(61.575,24.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSBYIAAiwIAmAAIAACwg");
	this.shape_2.setTransform(47.9,24.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAmBYIAAhMIhLAAIAABMIgnAAIAAiwIAnAAIAABDIBLAAIAAhDIAnAAIAACwg");
	this.shape_3.setTransform(34.7,24.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#353FA3").s().p("AoFEFQghAAAAggIAAnPQAAgTAMgHQH0FLJMCfQAAAfgfAAg");
	this.shape_4.setTransform(55.05,26.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3C47B6").s().p("AogjyQAIgFANgBIQMAAQAgAAAAAhIAAHOIAAABQpNifn0lLg");
	this.shape_5.setTransform(55.625,24.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1E245D").s().p("AgTBYIAAiNIgyAAIAAgjICLAAIAAAjIgzAAIAACNg");
	this.shape_6.setTransform(83.05,25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1E245D").s().p("AAhBYIhMh9IgBAAIAAB9IgnAAIAAiwIA1AAIBKB6IAAAAIAAh6IAoAAIAACwg");
	this.shape_7.setTransform(65.7,25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1E245D").s().p("AgSBYIAAiwIAlAAIAACwg");
	this.shape_8.setTransform(51.8,25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1E245D").s().p("AAmBYIAAhMIhLAAIAABMIgnAAIAAiwIAnAAIAABDIBLAAIAAhDIAnAAIAACwg");
	this.shape_9.setTransform(38.6,25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#353FA3").s().p("AoFEIQghAAAAggIAAnPQAAgTAMgIQAHgFAOAAIQMAAQAfAAAAAgIAAHPIAAABQAAAfgfAAg");
	this.shape_10.setTransform(55.05,26.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.hide_mc, new cjs.Rectangle(0,0,110.1,52.8), null);


(lib.er = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#666699").ss(6,1,1).p("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");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.er, new cjs.Rectangle(-733,-323.8,1466.1,647.7), null);


(lib.sdrntm_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C59064").s().p("AC+BJQhAgNgMgLIgCgDIAAgBIAAgCQAAgVAXgVQAagXAeAAQAZAAAYAIQAZAIAHAJIARAaQAJAOAAAIQAAAQgDAEQgHAJgagBgAiUAuIgEAAIhCgBQgXgCgNgEIgegIQgIgEgEgFIgBgDIAAgBQABgMAOgWQAPgWANgKQAXgSAYgGQAWgGAeAAQAdAAARADQAaAGAfASQAOAIAFAJQADAFAFANQAIAWAAAPIgBAOQgBADgCACIgDACIgGAAIgoACIhKADQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAg");
	this.shape_4.setTransform(-0.425,-4.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C59064").s().p("ACNBQQgLgWgGgtIgCgBIgDgCIgCgDIAAgBIAAgCQAAgUAXgVQAagYAeAAQAZAAAYAIQAZAIAHAKIARAaQAJANAAAIQAAAQgDAEIAAABQgCAfgRAYQgYAhgqgBQg0AAgWgogAj9A+QgZgegJgXQgHgCgDgFQgFgFAAgNQAAgQAIgOQAZgqALgIQAggXBFAAQAmAAAMACQAdAGATAWQAXAcAEAMQAFALAAAdQAAAdgEALQgEAMgWAfQgKAOgiANQghANgWAAQg0AAgtg0g");
	this.shape_5.setTransform(-0.925,-0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4}]},15).to({state:[{t:this.shape_5}]},3).to({state:[{t:this.shape_4}]},3).to({state:[]},3).wait(21));

	// Layer 1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ACeBZIgMgOQgKgWAAgKQgEgJAJgeQAGgTAXgTQAWgUAOAAIANAAQAiAAAXAXQgPgHgRAAQgSAAgPAIQgJAFgJAIQgTASgCAbQgBAPAEALQAEASAOAOQASAQAWAEIALABQgMAGgYABIgCAAQgYAAgYgZgAjpBIQgrggABgtQACgvAlgfQAkgeAwAAQAwAAAVAQQANALALAMQgWgRgfAAQgjAAgaAaQgaAZAAAlQAAAkAaAZQAaAaAjACIARAAQgWAOgiACIgHABQgjAAgogfg");
	this.shape_6.setTransform(-1.0275,0.4019);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AC8B8QgVgBgTgRQgSgSgDgGIgDgGIAAAAQgJgIgBgWQgBgXABAAQABgNAEgIQAGgTAQgPQAbgaAmAAIABAAQAlAAAZAZIACABQAbAbAAAkQAAAmgbAaQgLALgKAFIgYAJQgMAEgQAAIgKAAgADDgxQgNAAgXATQgWAUgGASQgJAfADAJQAAAKALAVIAMAPQAYAZAagBQAYAAALgGIgLgBQgVgEgSgRQgOgOgEgRQgEgLABgPQACgbATgTQAJgIAJgFQAPgIASAAQARAAAOAHQgWgXgiAAIgOABgAkBBSQgogkAAgxQAAgxAogkQAngjA4AAQA5AAAnAjQAoAkAAAxIAAADQAAAUgIASQgKAYgWAUQgnAjg5AAQg4AAgngjgAj2hOQglAegCAvQgBAuArAgQAsAhAlgDQAjgDAWgOIgRAAQgjgCgagZQgagaAAgkQAAgkAagaQAagaAjAAQAfAAAWARQgMgMgNgKQgVgRgwAAQgvAAgkAfg");
	this.shape_7.setTransform(0,-0.0089);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(45));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,-12.5,61,24.9);


(lib.rt7copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.rt7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.an_CSS = function(options) {
	this._element = new $.an.CSS(options);
	this._el = this._element.create();
	var $this = this;
	this.addEventListener('added', function() {
		$this._lastAddedFrame = $this.parent.currentFrame;
		$this._element.attach($('#dom_overlay_container'));
	});
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100,22);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;



(lib.blocker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhY3Az3MAAAhntMCxvAAAMAAABntg");
	this.shape.setTransform(568.775,331.875);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1137.6,663.8);


(lib.tryagain_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E51B0F").s().p("AgIBYIgIgFQgDgEgBgEQgCgEAAgFQAAgEACgEQABgFADgDIAIgFQAEgCAEAAQAFAAAEACQAEACADADQADADACAFQACAEAAAEQAAAFgCAEIgFAIQgDADgEACQgEACgFAAQgEAAgEgCgAgSAeIAAh2IAlAAIAAB2g");
	this.shape.setTransform(117.725,55.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E51B0F").s().p("AAVA/IAAg8IAAgKQgBgGgBgEQgCgFgFgDQgDgEgHABQgHAAgEACQgFADgCAFQgDAEgBAGIAAAKIAAA9IgmAAIAAh6IAkAAIAAARIABAAQACgEADgDQADgEAFgCIAJgFQAGgBAGgBQAPABAJAEQAIAEAFAIQAFAIACALQACAKgBAMIAABDg");
	this.shape_1.setTransform(104.95,58);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E51B0F").s().p("AgSBbIAAh5IAlAAIAAB5gAgPg1QgGgHAAgIQAAgJAGgHQAHgGAIAAQAJAAAGAGQAHAHAAAJQAAAIgHAHQgGAGgJAAQgIAAgHgGg");
	this.shape_2.setTransform(94.475,55.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E51B0F").s().p("AgfA9QgHgCgGgEQgHgGgDgHQgEgHAAgIQAAgLAEgHQAEgHAHgFQAHgEAIgDIASgEIARgBIARAAQAAgLgHgGQgHgFgKgBQgIAAgIAFQgIAEgGAGIgUgUQALgKAOgFQAOgFAOAAQARAAAKAEQALAFAGAHQAHAJACALQADAMAAAPIAAA9IgjAAIAAgPIAAAAQgHAJgKAFQgKAEgLAAQgJAAgIgDgAAEAIIgLACQgGACgEADQgEAEAAAGQAAAHAFADQAGADAGABQAFgBAFgBQAFgCAEgDQAEgCADgFQACgDAAgHIAAgIIgJAAIgLABg");
	this.shape_3.setTransform(84.275,58.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E51B0F").s().p("AgkBZQgPgEgOgKIAVgfQAJAHAKAEQAJAEAMAAQAQAAAIgIQAIgIAAgOIAAgLIAAAAQgHAIgJAEQgKAEgIAAQgNAAgLgFQgLgFgIgIQgIgIgEgLQgEgLAAgOQAAgMADgMQAEgLAIgJQAHgJAKgFQAKgGANAAQAIAAAGACQAHACAFADQAFACAEAEIAGAGIAAAAIAAgQIAjAAIAABvQAAAjgRASQgSASgiAAQgRAAgQgEgAgKg4QgFADgEAEQgEAEgDAFQgCAFAAAHQAAAGACAFQADAFAEAEQAEAFAFACQAGACAFAAQAHAAAFgCQAGgCAEgFQAEgEACgFQACgFAAgGQAAgHgCgFQgCgFgEgEQgEgEgGgDQgFgDgHAAQgFAAgGADg");
	this.shape_4.setTransform(69.425,61.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E51B0F").s().p("AgfA9QgHgCgGgEQgHgGgDgHQgEgHAAgIQAAgLAEgHQAEgHAHgFQAHgEAIgDIASgEIARgBIARAAQAAgLgHgGQgHgFgKgBQgIAAgIAFQgIAEgGAGIgUgUQALgKAOgFQAOgFAOAAQARAAAKAEQALAFAGAHQAHAJACALQADAMAAAPIAAA9IgjAAIAAgPIAAAAQgHAJgKAFQgKAEgLAAQgJAAgIgDgAAEAIIgLACQgGACgEADQgEAEAAAGQAAAHAFADQAGADAGABQAFgBAFgBQAFgCAEgDQAEgCADgFQACgDAAgHIAAgIIgJAAIgLABg");
	this.shape_5.setTransform(54.975,58.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E51B0F").s().p("AhBBXIAFgfQAJADAJAAIAKgBIAHgEIAEgGIAEgJIACgHIg1h6IApAAIAeBQIABAAIAahQIAnAAIg3CNIgHARQgEAHgEAGQgGAFgIACQgIADgOAAQgOAAgOgEg");
	this.shape_6.setTransform(34.125,61.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E51B0F").s().p("AgqA/IAAh6IAmAAIAAAUIAAAAQAFgLAJgGQAIgFAMgBIAHABIAGAAIAAAjIgIgBIgIgBQgLgBgGAEQgGADgEAFQgCAFgBAIIgBAPIAAA0g");
	this.shape_7.setTransform(22.575,58);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E51B0F").s().p("AgTBZIAAiOIgzAAIAAgjICMAAIAAAjIgzAAIAACOg");
	this.shape_8.setTransform(9.7,55.375);

	this.instance = new lib.mc_wrong();
	this.instance.parent = this;
	this.instance.setTransform(66.75,10.95,0.2494,0.2494);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tryagain_mc, new cjs.Rectangle(0,-15,126.2,88.1), null);


(lib.Symbol2audio = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.playbtn = new lib.Symbol3audio();
	this.playbtn.name = "playbtn";
	this.playbtn.parent = this;
	this.playbtn.setTransform(-0.5,-0.5);
	new cjs.ButtonHelper(this.playbtn, 0, 1, 1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EhXlAxkMAAAhjHMCvLAAAMAAABjHg");
	this.shape.setTransform(0.9,-4.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.playbtn}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2audio, new cjs.Rectangle(-559.7,-321.6,1121.3000000000002,634.4000000000001), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shadow_mc();
	this.instance.parent = this;
	this.instance.setTransform(173,3.1,0.5109,0.5109,0,0,0,272.6,12.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(33.8,-3.3,278.4,13), null);


(lib.first_screen1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Next_btn
	this.next_mc = new lib.next_mc();
	this.next_mc.name = "next_mc";
	this.next_mc.parent = this;
	this.next_mc.setTransform(455.8,241.7,1,1,0,0,0,67.4,38.6);

	this.timeline.addTween(cjs.Tween.get(this.next_mc).wait(1));

	// Heading
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAjBZIgvhQIgbAAIAABQIgVAAIAAixIAuAAQAMABAMABQAMACAKAEQAKAGAHAJQAGAKAAAQQAAAUgMAMQgLALgVADIAyBSgAgngJIATAAIASgBQAIAAAIgEQAIgCAFgGQAFgGAAgKQAAgKgDgGQgEgFgGgEQgGgDgIgBIgOgBIgeAAg");
	this.shape.setTransform(-2.325,-23.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgkBWQgRgHgMgNQgNgLgHgSQgHgRAAgUQAAgTAHgRQAHgRANgMQAMgNARgHQARgHATAAQAUAAARAHQARAHAMANQANAMAHARQAHARAAATQAAAUgHARQgHASgNALQgMANgRAHQgRAHgUAAQgTAAgRgHgAgbhCQgNAFgKAKQgJAKgFAOQgFAMAAAPQAAAPAFANQAFAOAJAKQAKAKANAGQAMAFAPAAQAQAAAMgFQANgGAKgKQAJgKAFgOQAFgNAAgPQAAgPgFgMQgFgOgJgKQgKgKgNgFQgMgHgQABQgPgBgMAHg");
	this.shape_1.setTransform(-21.025,-23.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgJAKQgFgEAAgGQAAgGAEgDQAFgFAFAAQAGAAAEAFQAFADAAAGQAAAGgFAEQgFAFgFAAQgFAAgEgFg");
	this.shape_2.setTransform(199.3,118.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgYBlQAQgWAIgaQAHgZAAgcQAAgOgCgNQgCgNgDgMQgDgMgGgMIgPgYIANgKQASAZAJAdQAJAdAAAbQAAAfgKAdQgJAbgRAYg");
	this.shape_3.setTransform(191.9,112.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgvA7IAAgQIBEhUIhBAAIAAgQIBaAAIAAAOIhDBVIBFAAIAAARg");
	this.shape_4.setTransform(183.3,113.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAvBZIAAhTIhdAAIAABTIgVAAIAAixIAVAAIAABLIBdAAIAAhLIAVAAIAACxg");
	this.shape_5.setTransform(168.725,110.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgPA6QgJgdAAgdQAAgeAKgcQAJgcARgYIANAKQgQAWgIAaQgHAaAAAaQAAAPACANQACANADAMQAEAMAGAMIAOAYIgNAKQgSgZgJgcg");
	this.shape_6.setTransform(156.625,112.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgvA7IAAgQIBEhUIhBAAIAAgQIBaAAIAAAOIhEBVIBGAAIAAARg");
	this.shape_7.setTransform(140.25,113.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AABBKQgGgDgDgFQgEgFgBgIIgBgQIAAg/IgZAAIAAgQIAZAAIAAghIATAAIAAAhIAiAAIAAAQIgiAAIAAA5IAAALIACAIQACAEADADQAEABAGABIAJgBIAJgDIAAASIgLADIgMAAQgKAAgGgCg");
	this.shape_8.setTransform(130.225,112.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgfA8IAAhYIgBgPIAAgNIASAAIABAJIAAAKIAAAAIAGgIIAIgHIALgFQAGgCAHAAIAEAAIAEABIgBAUQgFgBgFgBQgTAAgHAMQgIAMAAATIAAA5g");
	this.shape_9.setTransform(122.175,113.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgWA4QgMgEgHgIQgHgJgFgLQgEgMAAgMQAAgMAEgMQAGgLAHgJQAIgHALgFQALgFANAAQAMAAAJAFQALAEAHAHQAIAJAEALQAEAMAAANIAAAGIheAAQABAIADAGQADAHAFAGQAFAEAHAEQAHADAHAAQAMgBAJgEQAJgFAHgIIAOALQgKAOgMAFQgNAFgQAAQgNABgLgGgAgYgiQgKAKgCAOIBJAAQAAgOgKgKQgJgIgQgBQgQABgKAIg");
	this.shape_10.setTransform(110.15,113.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAfBfIAAhHQABgPgHgIQgHgIgOAAQgHAAgHAEQgHADgFAFQgEAGgCAIQgCAJgBAJIAAA6IgTAAIAAi8IATAAIAABYIABAAIAFgHIAJgHIALgEQAFgCAHAAQALAAAJAEQAHADAGAHQAFAGADAIQADAJAAAKIAABJg");
	this.shape_11.setTransform(96.25,109.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgaA5QgKgEgJgNIAPgMQAGAHAHAFQAHAEAKAAIAIgBIAJgDIAGgGQACgEAAgFQAAgEgCgDIgGgFIgIgEIgJgCIgOgEQgIgCgGgDQgGgDgDgGQgDgGAAgJQAAgJAEgGQAEgGAFgFQAHgEAIgCQAHgDAIAAQAMABALAFQALAEAFAMIgQALQgDgHgHgDQgGgFgIAAIgHABIgIAEIgGAEQgBAEgBADQABAEACADIAGAEIAKAEIAKADQAIABAHACQAGADAGADQAFAEADAGQADAGAAAJQAAAKgEAHQgEAGgGAFQgHAFgJACQgIABgIAAQgPAAgLgEg");
	this.shape_12.setTransform(76.85,113.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgIBZIAAh0IASAAIAAB0gAgJg/QgEgEAAgGQAAgGAEgEQAEgEAFgBQAGABAEAEQAEAEAAAGQAAAGgEAEQgDAEgHAAQgFAAgEgEg");
	this.shape_13.setTransform(68.675,110.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AguBYQgEAAgEgDIACgRQADACAEAAIAHAAQAKAAAEgEQAFgGADgJIAIgVIgxh1IAXAAIAjBbIABAAIAjhbIAVAAIg5CPIgFANIgHAKQgFAFgGACQgGACgJAAIgJAAg");
	this.shape_14.setTransform(52.725,116.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgQA5QgLgEgIgJQgIgIgEgLQgFgLAAgOQAAgMAFgMQAEgKAIgJQAIgIALgFQALgFANAAQANAAAMAFQALAFAJAJIgQAOQgGgIgHgDQgHgEgJAAQgJAAgHAEQgIADgFAHQgFAFgCAIQgDAIAAAIQAAAJADAIQADAIAFAGQAFAGAIADQAHADAIABQATAAALgPIAOAOQgIAKgMAEQgLAEgNAAQgNAAgLgEg");
	this.shape_15.setTransform(41.075,113.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAgA8IAAhGQAAgOgGgIQgHgJgOAAQgIAAgHADQgHAEgEAFQgFAHgCAIQgCAIAAAJIAAA5IgUAAIAAhYIAAgPIAAgNIASAAIAAAJIAAAKIABAAIAGgIIAJgHIALgFQAFgCAHAAQAMAAAIADQAIAEAFAGQAGAGADAJQACAJAAAKIAABIg");
	this.shape_16.setTransform(27.65,113.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgWA4QgMgEgHgIQgIgJgDgLQgFgMAAgMQAAgMAFgMQAEgLAIgJQAIgHALgFQALgFAMAAQANAAAKAFQAKAEAIAHQAHAJAEALQAEAMAAANIAAAGIheAAQAAAIAEAGQADAHAFAGQAFAEAHAEQAGADAHAAQANgBAJgEQAJgFAHgIIAPALQgLAOgNAFQgMAFgRAAQgMABgLgGgAgYgiQgKAKgCAOIBJAAQgBgOgJgKQgJgIgRgBQgPABgKAIg");
	this.shape_17.setTransform(13.8,113.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgaA4QgIgDgGgHQgFgFgDgKQgCgIgBgLIAAhHIAUAAIAABFQAAAPAGAJQAHAIAOAAQAIAAAHgDQAHgEAEgGQAEgFADgIQACgJAAgJIAAg5IAUAAIAABYIAAAQIABAMIgTAAIAAgKIAAgJIgBAAIgFAIQgEAEgFADQgFADgGACQgHACgGAAQgLAAgJgEg");
	this.shape_18.setTransform(-0.05,113.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAqBYIAAhJIgBAAQgHAJgLAFQgKAGgNgBQgNAAgMgEQgLgEgIgJQgHgIgGgKQgEgLAAgOQAAgNAEgMQAGgKAHgJQAIgIALgEQALgFALgBQAQABAMAGQALAIAFAJIABAAIAAgUIAUAAIAACsgAgQhCQgHADgFAGQgGAGgDAIQgDAIAAAJQAAAJADAIQADAIAGAFQAFAGAHADQAIADAJABQAJgBAIgDQAHgDAGgGQAFgFADgIQADgIAAgJQAAgJgDgIQgDgIgFgGQgGgGgHgDQgIgEgJAAQgJAAgIAEg");
	this.shape_19.setTransform(-15,116.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgWA4QgMgEgHgIQgIgJgEgLQgEgMAAgMQAAgMAEgMQAFgLAIgJQAIgHALgFQALgFAMAAQAMAAALAFQAKAEAIAHQAHAJAEALQAEAMAAANIAAAGIheAAQABAIADAGQADAHAFAGQAFAEAHAEQAHADAGAAQANgBAJgEQAJgFAHgIIAPALQgLAOgNAFQgMAFgRAAQgMABgLgGgAgYgiQgKAKgCAOIBJAAQAAgOgKgKQgJgIgRgBQgPABgKAIg");
	this.shape_20.setTransform(-29.3,113.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgfA8IAAhYIgBgPIAAgNIASAAIABAJIAAAKIAAAAIAGgIIAIgHIALgFQAGgCAHAAIAEAAIAEABIgBAUQgFgBgFgBQgTAAgHAMQgIAMAAATIAAA5g");
	this.shape_21.setTransform(-39.525,113.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgPBgIAAhkIgZAAIAAgQIAZAAIAAgaQAAgLADgJQACgJAEgGQAFgHAHgEQAIgDAMAAIAIABIAHACIgDARQgHgCgGAAQgHAAgEACQgFADgCAFQgCAFAAAGIgBAOIAAAWIAdAAIAAAQIgdAAIAABkg");
	this.shape_22.setTransform(-48.1,109.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgPBgIAAhkIgZAAIAAgQIAZAAIAAgaQAAgLADgJQACgJAEgGQAFgHAHgEQAIgDAMAAIAIABIAHACIgDARQgHgCgGAAQgHAAgEACQgFADgCAFQgCAFAAAGIgBAOIAAAWIAdAAIAAAQIgdAAIAABkg");
	this.shape_23.setTransform(-62.95,109.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgYA5QgMgEgIgJQgIgHgFgMQgFgLAAgOQAAgNAFgLQAFgLAIgJQAIgHAMgFQAMgFAMAAQAOAAALAFQAMAFAIAHQAIAJAFALQAFALAAANQAAAOgFALQgFAMgIAHQgIAJgMAEQgLAEgOAAQgMAAgMgEgAgQgnQgIADgFAGQgGAGgDAIQgDAIAAAIQAAAJADAIQADAIAGAGQAFAGAIADQAIADAIABQAJgBAIgDQAIgDAFgGQAGgGADgIQADgIAAgJQAAgIgDgIQgDgIgGgGQgFgGgIgDQgIgEgJAAQgIAAgIAEg");
	this.shape_24.setTransform(-74.775,113.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AABBKQgGgDgDgFQgEgFgBgIIgBgQIAAg/IgZAAIAAgQIAZAAIAAghIATAAIAAAhIAiAAIAAAQIgiAAIAAA5IAAALIACAIQACAEADADQAEABAGABIAJgBIAJgDIAAASIgLADIgMAAQgKAAgGgCg");
	this.shape_25.setTransform(-93.625,112.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgIBZIAAh0IASAAIAAB0gAgJg/QgEgEAAgGQAAgGAEgEQAEgEAFgBQAGABAEAEQAEAEAAAGQAAAGgEAEQgDAEgHAAQgFAAgEgEg");
	this.shape_26.setTransform(-100.975,110.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AAgA8IAAhGQAAgOgGgIQgHgJgOAAQgIAAgHADQgHAEgEAFQgFAHgCAIQgCAIAAAJIAAA5IgUAAIAAhYIAAgPIgBgNIATAAIAAAJIAAAKIABAAIAGgIIAJgHIAKgFQAGgCAHAAQAMAAAIADQAIAEAFAGQAGAGADAJQACAJAAAKIAABIg");
	this.shape_27.setTransform(-110.95,113.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgaA4QgIgDgFgHQgGgFgDgKQgCgIAAgLIAAhHIATAAIAABFQAAAPAHAJQAGAIAOAAQAIAAAHgDQAHgEAFgGQADgFADgIQACgJAAgJIAAg5IATAAIAABYIABAQIAAAMIgSAAIgBgKIAAgJIAAAAIgGAIQgDAEgFADQgFADgHACQgGACgGAAQgLAAgJgEg");
	this.shape_28.setTransform(-124.75,113.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgWA4QgLgEgIgIQgHgJgFgLQgEgMAAgMQAAgMAEgMQAGgLAHgJQAIgHALgFQALgFAMAAQAMAAALAFQAKAEAIAHQAHAJAEALQAEAMAAANIAAAGIheAAQABAIADAGQADAHAFAGQAFAEAHAEQAHADAGAAQANgBAJgEQAIgFAIgIIAOALQgKAOgMAFQgNAFgRAAQgMABgLgGgAgYgiQgKAKgCAOIBJAAQgBgOgJgKQgJgIgRgBQgPABgKAIg");
	this.shape_29.setTransform(-145.65,113.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAfBfIAAhHQAAgPgGgIQgGgIgPAAQgHAAgIAEQgGADgFAFQgEAGgDAIQgCAJAAAJIAAA6IgTAAIAAi8IATAAIAABYIABAAIAGgHIAIgHIALgEQAFgCAGAAQAMAAAJAEQAHADAGAHQAFAGADAIQADAJAAAKIAABJg");
	this.shape_30.setTransform(-159.55,109.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgJBZIAAidIg7AAIAAgUICJAAIAAAUIg6AAIAACdg");
	this.shape_31.setTransform(-173.675,110.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgIAWIgIgGIgFgHIgBgJIABgIQADgEACgDIAIgGIAIgBIAJABQAEADAEADQACADACAEIACAIIgCAJIgEAHQgEAEgEACIgJABIgIgBg");
	this.shape_32.setTransform(173.55,58.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgeBbQgLgEgIgIQgHgJgFgLQgEgMAAgNQAAgNAEgMQAEgKAHgJQAHgKAKgFQALgGANABQAKgBAKAEQALAEAGAIIABAAIAAhQIAlAAIAAC8IgjAAIAAgQIAAAAIgGAGIgIAGQgFADgGACQgGACgFAAQgOAAgLgFgAgUAKQgHAIAAAOQAAAOAHAIQAIAJAOAAQAOAAAIgJQAHgIAAgOQAAgOgHgIQgIgJgOAAQgOAAgIAJg");
	this.shape_33.setTransform(161.575,51.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAVA+IAAg7IAAgKQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEIAIgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAHQAFAIACALQABAKAAAMIAABCg");
	this.shape_34.setTransform(146.925,54.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_35.setTransform(132.125,54.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_36.setTransform(118.925,54.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_37.setTransform(105.275,54.675);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgdA8QgNgDgJgKIAXgZQAFAHAHADQAGADAJAAQAFAAAFgBQAGgCAAgFQAAgFgFgDIgLgEIgPgDQgIgCgHgEQgHgDgFgGQgFgHAAgMQAAgKAFgIQAEgIAHgFQAHgFAKgCQAJgDAIAAQAMAAAMAEQANADAIAJIgXAXQgIgKgNAAQgEAAgFACQgEACAAAGQAAAEAEACIALAEIAPAEQAJABAHAEQAHAEAEAGQAFAHAAAMQAAALgFAIQgFAIgIAEQgIAFgKACQgKACgJAAQgNAAgNgEg");
	this.shape_38.setTransform(92.275,54.675);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgqA+IAAh4IAmAAIAAATIAAAAQAFgLAIgGQAIgFANAAIAHAAIAGABIAAAiIgIgCIgIAAQgLAAgGADQgHADgDAFQgDAGAAAHIgBAQIAAAyg");
	this.shape_39.setTransform(74.525,54.525);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_40.setTransform(61.725,54.675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhBBbIAAiyIAjAAIAAAQIABAAIAFgGIAIgGQAFgDAHgCQAEgCAHAAQANAAALAFQALAFAIAIQAHAIAFAMQAEALAAAOQAAANgEALQgDALgHAJQgIAJgKAFQgLAGgNAAQgKAAgKgEQgLgDgGgJIgBAAIAABGgAgWgwQgIAIAAAOQAAAOAIAIQAHAIAPAAQANAAAIgIQAIgIgBgOQABgOgIgIQgIgJgNAAQgPAAgHAJg");
	this.shape_41.setTransform(47.05,57.375);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AADBOQgGgCgHgEQgGgEgDgHQgDgHAAgKIAAg5IgYAAIAAgeIAYAAIAAgkIAkAAIAAAkIAhAAIAAAeIghAAIAAAnIABAJQAAAFACADQACADADABQAEACAGAAIAIgBQAFAAACgDIAAAgIgNADIgNAAQgKAAgIgCg");
	this.shape_42.setTransform(26.075,53.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AAVA+IAAg7IAAgKQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEIAIgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAHQAFAIACALQABAKAAAMIAABCg");
	this.shape_43.setTransform(14.025,54.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgRBbIAAh5IAkAAIAAB5gAgOg1QgHgGAAgJQAAgJAHgGQAGgHAIAAQAJAAAHAHQAGAGAAAJQAAAJgGAGQgHAHgJAAQgIAAgGgHg");
	this.shape_44.setTransform(3.575,51.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_45.setTransform(-7.275,54.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhBBbIAAiyIAjAAIAAAQIAAAAIAGgGIAJgGQAFgDAFgCQAFgCAGAAQAOAAALAFQALAFAIAIQAHAIAFAMQAEALAAAOQAAANgDALQgFALgHAJQgHAJgKAFQgKAGgNAAQgLAAgKgEQgLgDgGgJIgBAAIAABGgAgXgwQgHAIAAAOQAAAOAHAIQAJAIAOAAQANAAAIgIQAIgIAAgOQAAgOgIgIQgIgJgNAAQgOAAgJAJg");
	this.shape_46.setTransform(-22.4,57.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgeA9QgJgCgFgFQgGgEgEgHQgDgIAAgJQAAgKADgHQAEgIAHgDQAHgFAIgDIASgEIARgBIARgBQAAgKgHgFQgIgGgJAAQgIAAgIAEQgIAEgFAGIgVgUQALgKAOgFQAOgFAOAAQAQAAALAEQAKAFAHAHQAGAJADALQADAMAAAPIAAA9IgjAAIAAgQIAAAAQgHAKgKAFQgJAEgMAAQgJAAgHgDgAgHAKQgGACgEADQgFAEABAGQAAAHAFADQAGADAHAAQAEAAAFgBQAGgCADgCQAEgDACgEQADgFAAgFIAAgIIgJAAIgLAAIgLACg");
	this.shape_47.setTransform(-44.95,54.675);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgjBZQgQgEgNgKIAVgfQAIAHAKAEQAJAEAMAAQAQAAAIgIQAJgIAAgOIAAgLIgBAAQgGAJgKADQgKAEgHAAQgOAAgLgFQgLgFgIgIQgHgIgFgLQgEgLAAgOQAAgMAEgLQAEgMAHgJQAHgJAKgFQALgFAMAAQAJAAAFACQAHABAFADQAFADAEADQAEADACAEIAAAAIAAgQIAjAAIAABuQAAAjgRARQgSASgiAAQgQAAgQgDgAgJg4QgGADgEAEQgEAEgCAFQgCAGAAAGQAAAGACAFQACAGAEAEQAEAEAGACQAFACAGAAQAGAAAFgCQAGgCAEgEQAEgEACgGQACgFAAgGQAAgGgCgGQgCgFgEgEQgEgEgGgDQgFgCgGAAQgGAAgFACg");
	this.shape_48.setTransform(-67.175,57.525);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AAVA+IAAg7IAAgKQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEIAIgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAHQAFAIACALQABAKAAAMIAABCg");
	this.shape_49.setTransform(-81.825,54.525);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgRBbIAAh5IAkAAIAAB5gAgOg1QgHgGAAgJQAAgJAHgGQAGgHAIAAQAJAAAHAHQAGAGAAAJQAAAJgGAGQgHAHgJAAQgIAAgGgHg");
	this.shape_50.setTransform(-92.275,51.675);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgdA8QgNgDgJgKIAXgZQAFAHAHADQAGADAJAAQAFAAAFgBQAGgCAAgFQAAgFgFgDIgLgEIgPgDQgIgCgHgEQgHgDgFgGQgFgHAAgMQAAgKAFgIQAEgIAHgFQAHgFAKgCQAJgDAIAAQAMAAAMAEQANADAIAJIgXAXQgIgKgNAAQgEAAgFACQgEACAAAGQAAAEAEACIALAEIAPAEQAJABAHAEQAHAEAEAGQAFAHAAAMQAAALgFAIQgFAIgIAEQgIAFgKACQgKACgJAAQgNAAgNgEg");
	this.shape_51.setTransform(-101.325,54.675);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgdA8QgNgDgJgKIAXgZQAFAHAHADQAGADAJAAQAFAAAFgBQAGgCAAgFQAAgFgFgDIgLgEIgPgDQgIgCgHgEQgHgDgFgGQgFgHAAgMQAAgKAFgIQAEgIAHgFQAHgFAKgCQAJgDAIAAQAMAAAMAEQANADAIAJIgXAXQgIgKgNAAQgEAAgFACQgEACAAAGQAAAEAEACIALAEIAPAEQAJABAHAEQAHAEAEAGQAFAHAAAMQAAALgFAIQgFAIgIAEQgIAFgKACQgKACgJAAQgNAAgNgEg");
	this.shape_52.setTransform(-112.925,54.675);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgfA9QgHgCgGgFQgGgEgEgHQgEgIAAgJQABgKAEgHQADgIAHgDQAHgFAIgDIASgEIARgBIARgBQAAgKgHgFQgHgGgKAAQgIAAgIAEQgIAEgFAGIgVgUQALgKAOgFQAOgFAOAAQAQAAALAEQALAFAGAHQAGAJADALQACAMAAAPIAAA9IgiAAIAAgQIAAAAQgHAKgKAFQgKAEgLAAQgJAAgIgDgAgHAKQgGACgEADQgFAEAAAGQABAHAFADQAGADAGAAQAFAAAFgBQAGgCADgCQAEgDACgEQADgFAAgFIAAgIIgJAAIgLAAIgLACg");
	this.shape_53.setTransform(-125.6,54.675);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhBBbIAAiyIAjAAIAAAQIAAAAIAGgGIAIgGQAFgDAGgCQAFgCAHAAQANAAALAFQALAFAIAIQAHAIAFAMQAEALAAAOQAAANgDALQgFALgGAJQgIAJgKAFQgLAGgNAAQgKAAgKgEQgKgDgHgJIAAAAIAABGgAgXgwQgHAIAAAOQAAAOAHAIQAJAIAOAAQANAAAIgIQAHgIAAgOQAAgOgHgIQgIgJgNAAQgOAAgJAJg");
	this.shape_54.setTransform(-139.65,57.375);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_55.setTransform(260.075,24.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgSA9Igyh5IAoAAIAfBSIAAAAIAchSIAmAAIgwB5g");
	this.shape_56.setTransform(245.95,24.575);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgeA9QgJgCgFgFQgHgEgDgHQgDgIAAgJQAAgKADgHQAFgIAGgDQAGgFAJgDIASgEIARgBIARgBQAAgKgHgFQgHgGgKAAQgIAAgIAEQgIAEgFAGIgUgUQAKgKAOgFQAOgFAOAAQAQAAALAEQALAFAGAHQAHAJACALQACAMABAPIAAA9IgjAAIAAgQIgBAAQgGAKgKAFQgKAEgLAAQgJAAgHgDgAgHAKQgGACgEADQgEAEAAAGQgBAHAHADQAFADAHAAQAEAAAFgBQAFgCAEgCQAEgDADgEQACgFAAgFIAAgIIgJAAIgLAAIgLACg");
	this.shape_57.setTransform(232.1,24.575);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AAZA9IgZhQIAAAAIgWBQIgmAAIgsh5IAnAAIAZBMIABAAIAUhMIAoAAIAXBMIABAAIAWhMIAmAAIgrB5g");
	this.shape_58.setTransform(215.125,24.575);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_59.setTransform(190.125,24.575);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AAVBfIAAg8IAAgLQgBgFgCgFQgBgFgEgDQgEgDgIAAQgGAAgEADQgFACgCAEQgDAFAAAGIgBALIAAA9IglAAIAAi8IAlAAIAABUIABAAQABgEADgEIAHgGIAJgEQAGgCAHAAQAOAAAJAEQAIAFAFAIQAFAHACAKQABAKAAAMIAABEg");
	this.shape_60.setTransform(175.775,21.2);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AADBOQgGgCgHgEQgGgEgDgHQgDgHAAgKIAAg5IgYAAIAAgeIAYAAIAAgkIAkAAIAAAkIAhAAIAAAeIghAAIAAAnIABAJQAAAFACADQACADADABQAEACAGAAIAIgBQAFAAACgDIAAAgIgNADIgNAAQgKAAgIgCg");
	this.shape_61.setTransform(163.275,22.925);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgVBgIAAhbIgZAAIAAgdIAZAAIAAgWQAAgKABgJQADgJAFgHQAFgGAHgEQAKgEAPAAIALABIALABIgCAgIgFgCIgHgBQgJAAgEAFQgFAEAAALIAAAUIAcAAIAAAdIgcAAIAABbg");
	this.shape_62.setTransform(146.6,21.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_63.setTransform(134.125,24.575);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgdA8QgNgDgJgKIAXgZQAFAHAHADQAGADAJAAQAFAAAFgBQAGgCAAgFQAAgFgFgDIgLgEIgPgDQgIgCgHgEQgHgDgFgGQgFgHAAgMQAAgKAFgIQAEgIAHgFQAHgFAKgCQAJgDAIAAQAMAAAMAEQANADAIAJIgXAXQgIgKgNAAQgEAAgFACQgEACAAAGQAAAEAEACIALAEIAPAEQAJABAHAEQAHAEAEAGQAFAHAAAMQAAALgFAIQgFAIgIAEQgIAFgKACQgKACgJAAQgNAAgNgEg");
	this.shape_64.setTransform(113.275,24.575);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_65.setTransform(100.325,24.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgSBfIAAi8IAlAAIAAC8g");
	this.shape_66.setTransform(89.925,21.2);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_67.setTransform(81.075,24.575);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AhABWIAEgeQAJADAIAAQAHAAAEgBQAEgBACgDQADgDACgDIAEgJIACgHIg1h6IApAAIAeBQIABAAIAahQIAnAAIg3CNIgHARQgEAHgEAFQgFAGgJACQgIADgOAAQgPAAgMgFg");
	this.shape_68.setTransform(67.65,27.575);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_69.setTransform(55.125,24.575);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_70.setTransform(34.075,24.575);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AADBOQgGgCgHgEQgGgEgDgHQgDgHAAgKIAAg5IgYAAIAAgeIAYAAIAAgkIAkAAIAAAkIAhAAIAAAeIghAAIAAAnIABAJQAAAFACADQACADADABQAEACAGAAIAIgBQAFAAACgDIAAAgIgNADIgNAAQgKAAgIgCg");
	this.shape_71.setTransform(21.575,22.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_72.setTransform(9.525,24.575);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgSBfIAAi8IAlAAIAAC8g");
	this.shape_73.setTransform(-0.875,21.2);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhBBbIAAiyIAjAAIAAAQIABAAIAFgGIAIgGQAGgDAFgCQAFgCAHAAQANAAALAFQALAFAIAIQAIAIAEAMQAEALAAAOQAAANgEALQgEALgGAJQgIAJgKAFQgKAGgOAAQgKAAgKgEQgKgDgHgJIAAAAIAABGgAgXgwQgHAIAAAOQAAAOAHAIQAIAIAPAAQANAAAIgIQAHgIAAgOQAAgOgHgIQgIgJgNAAQgPAAgIAJg");
	this.shape_74.setTransform(-11.65,27.275);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AA6A+IAAhFQAAgJgEgGQgDgGgJAAQgHAAgEACQgFACgCAEQgDAEgBAFIgBAKIAAA/IglAAIAAg/IAAgIQAAgFgCgEQgBgEgEgDQgDgDgHAAQgHAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEQADgDAFgDQAEgDAGgBQAGgCAHAAQAMAAAKAFQAJAFAFALQAHgLAJgFQAJgFAOAAQAMAAAIAEQAIAEAFAHQAFAHACAKQACAJAAALIAABHg");
	this.shape_75.setTransform(-30.775,24.425);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_76.setTransform(-49.275,24.575);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_77.setTransform(-62.475,24.575);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgVBgIAAhbIgZAAIAAgdIAZAAIAAgWQAAgKABgJQACgJAGgHQAFgGAHgEQAKgEAPAAIALABIALABIgCAgIgFgCIgHgBQgIAAgGAFQgEAEAAALIAAAUIAcAAIAAAdIgcAAIAABbg");
	this.shape_78.setTransform(-80.75,21.05);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_79.setTransform(-93.225,24.575);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgqA+IAAh4IAmAAIAAATIAAAAQAFgLAIgGQAIgFANAAIAHAAIAGABIAAAiIgIgCIgIAAQgLAAgGADQgHADgDAFQgDAGAAAHIgBAQIAAAyg");
	this.shape_80.setTransform(-112.825,24.425);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_81.setTransform(-125.625,24.575);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgFBeQgFgBgFgDIgJgHIgGgGIAAAAIAAAQIgjAAIAAi8IAlAAIAABQIABAAQAGgJALgDQAKgDALgBQANABAKAFQAKAFAHAJQAHAJAFALQADALAAANQAAAOgEALQgFAMgHAIQgIAJgLAFQgLAEgOAAQgGAAgFgCgAgXAKQgHAJAAANQAAAOAHAJQAJAIAOAAQANAAAIgIQAIgJAAgOQAAgNgIgJQgIgIgNAAQgOAAgJAIg");
	this.shape_82.setTransform(-140.3,21.35);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AA6A+IAAhFQAAgJgEgGQgDgGgJAAQgHAAgEACQgFACgCAEQgDAEgBAFIgBAKIAAA/IglAAIAAg/IAAgIQAAgFgCgEQgBgEgEgDQgDgDgHAAQgHAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEQADgDAFgDQAEgDAGgBQAGgCAHAAQAMAAAKAFQAJAFAFALQAHgLAJgFQAJgFAOAAQAMAAAIAEQAIAEAFAHQAFAHACAKQACAJAAALIAABHg");
	this.shape_83.setTransform(-159.425,24.425);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgkA6QgJgEgEgIQgFgIgCgKQgBgLAAgMIAAhCIAlAAIAAA7IAAAKQABAGACAEQACAFADADQAEADAIAAQAGAAAEgCQAFgDACgEQADgFAAgFIABgLIAAg8IAlAAIAAB4IgkAAIAAgQIgFAHIgIAGIgJAFQgGABgHAAQgOAAgJgEg");
	this.shape_84.setTransform(-177.475,24.725);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AAVA+IAAg7IAAgKQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEIAIgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAHQAFAIACALQABAKAAAMIAABCg");
	this.shape_85.setTransform(-191.825,24.425);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_86.setTransform(-213.575,24.575);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AAVBfIAAg8IAAgLQgBgFgCgFQgBgFgEgDQgEgDgIAAQgGAAgEADQgFACgCAEQgDAFAAAGIgBALIAAA9IglAAIAAi8IAlAAIAABUIABAAQABgEADgEIAHgGIAJgEQAGgCAHAAQAOAAAJAEQAIAFAFAIQAFAHACAKQABAKAAAMIAABEg");
	this.shape_87.setTransform(-227.925,21.2);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AADBOQgGgCgHgEQgGgEgDgHQgDgHAAgKIAAg5IgYAAIAAgeIAYAAIAAgkIAkAAIAAAkIAhAAIAAAeIghAAIAAAnIABAJQAAAFACADQACADADABQAEACAGAAIAIgBQAFAAACgDIAAAgIgNADIgNAAQgKAAgIgCg");
	this.shape_88.setTransform(-240.425,22.925);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AgIAVIgHgEIgGgIIgBgJIABgIQACgFAEgDIAHgFIAIgBIAJABQAEADADACQAEADACAFIABAIIgBAJIgGAIQgDACgEACIgJACIgIgCg");
	this.shape_89.setTransform(171.9,-60.9);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AgeBcQgLgFgIgJQgHgIgFgLQgEgMAAgOQAAgMAEgMQAEgKAHgKQAHgJAKgFQALgFANAAQAKAAAKADQALADAGAKIABAAIAAhRIAlAAIAAC8IgjAAIAAgQIAAAAIgGAHIgIAFQgFAEgGABQgGACgFAAQgOAAgLgEgAgUAKQgHAJAAANQAAAOAHAIQAIAJAOAAQAOAAAIgJQAHgIAAgOQAAgNgHgJQgIgJgOABQgOgBgIAJg");
	this.shape_90.setTransform(159.925,-68.05);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AAVA+IAAg7IAAgKQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEIAIgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAHQAFAIACALQABAKAAAMIAABCg");
	this.shape_91.setTransform(145.275,-64.975);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_92.setTransform(130.475,-64.825);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_93.setTransform(117.275,-64.825);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_94.setTransform(103.625,-64.825);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgdA8QgNgDgJgKIAXgZQAFAHAHADQAGADAJAAQAFAAAFgBQAGgCAAgFQAAgFgFgDIgLgEIgPgDQgIgCgHgEQgHgDgFgGQgFgHAAgMQAAgKAFgIQAEgIAHgFQAHgFAKgCQAJgDAIAAQAMAAAMAEQANADAIAJIgXAXQgIgKgNAAQgEAAgFACQgEACAAAGQAAAEAEACIALAEIAPAEQAJABAHAEQAHAEAEAGQAFAHAAAMQAAALgFAIQgFAIgIAEQgIAFgKACQgKACgJAAQgNAAgNgEg");
	this.shape_95.setTransform(90.625,-64.825);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgqA+IAAh4IAmAAIAAATIAAAAQAFgLAIgGQAIgFANAAIAHAAIAGABIAAAiIgIgCIgIAAQgLAAgGADQgHADgDAFQgDAGAAAHIgBAQIAAAyg");
	this.shape_96.setTransform(72.875,-64.975);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_97.setTransform(60.075,-64.825);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AhBBbIAAiyIAjAAIAAAQIABAAIAFgGIAIgGQAFgDAGgCQAFgCAHAAQANAAALAFQALAFAIAIQAIAIAEAMQAEALAAAOQAAANgDALQgEALgHAJQgIAJgKAFQgLAGgNAAQgKAAgKgEQgLgDgGgJIAAAAIAABGgAgXgwQgHAIAAAOQAAAOAHAIQAJAIAOAAQANAAAIgIQAHgIAAgOQAAgOgHgIQgIgJgNAAQgOAAgJAJg");
	this.shape_98.setTransform(45.4,-62.125);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgeBcQgLgFgIgJQgHgIgFgLQgEgMAAgOQAAgMAEgMQAEgKAHgKQAHgJAKgFQALgFANAAQAKAAAKADQALADAGAKIABAAIAAhRIAlAAIAAC8IgjAAIAAgQIAAAAIgGAHIgIAFQgFAEgGABQgGACgFAAQgOAAgLgEgAgUAKQgHAJAAANQAAAOAHAIQAIAJAOAAQAOAAAIgJQAHgIAAgOQAAgNgHgJQgIgJgOABQgOgBgIAJg");
	this.shape_99.setTransform(21.475,-68.05);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_100.setTransform(6.825,-64.825);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_101.setTransform(-5.925,-64.825);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AgkA6QgJgEgEgIQgFgIgCgKQgBgLAAgMIAAhCIAlAAIAAA7IAAAKQABAGACAEQACAFADADQAEADAIAAQAGAAAEgCQAFgDACgEQADgFAAgFIABgLIAAg8IAlAAIAAB4IgkAAIAAgQIgFAHIgIAGIgJAFQgGABgHAAQgOAAgJgEg");
	this.shape_102.setTransform(-19.575,-64.675);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AgeBcQgLgFgIgJQgHgIgFgLQgEgMAAgOQAAgMAEgMQAEgKAHgKQAHgJAKgFQALgFANAAQAKAAAKADQALADAGAKIABAAIAAhRIAlAAIAAC8IgjAAIAAgQIAAAAIgGAHIgIAFQgFAEgGABQgGACgFAAQgOAAgLgEgAgUAKQgHAJAAANQAAAOAHAIQAIAJAOAAQAOAAAIgJQAHgIAAgOQAAgNgHgJQgIgJgOABQgOgBgIAJg");
	this.shape_103.setTransform(-35.025,-68.05);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_104.setTransform(-50.125,-64.825);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AgqA+IAAh4IAmAAIAAATIAAAAQAFgLAIgGQAIgFANAAIAHAAIAGABIAAAiIgIgCIgIAAQgLAAgGADQgHADgDAFQgDAGAAAHIgBAQIAAAyg");
	this.shape_105.setTransform(-62.325,-64.975);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AhBBbIAAiyIAjAAIAAAQIABAAIAFgGIAIgGQAGgDAGgCQAEgCAHAAQANAAALAFQALAFAIAIQAHAIAFAMQAEALAAAOQAAANgEALQgEALgGAJQgIAJgKAFQgKAGgOAAQgKAAgKgEQgKgDgHgJIgBAAIAABGgAgWgwQgIAIAAAOQAAAOAIAIQAHAIAPAAQANAAAIgIQAIgIgBgOQABgOgIgIQgIgJgNAAQgPAAgHAJg");
	this.shape_106.setTransform(-75.45,-62.125);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_107.setTransform(-98.275,-64.825);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AgRA9Igzh5IAoAAIAfBSIAAAAIAchSIAmAAIgwB5g");
	this.shape_108.setTransform(-112.4,-64.825);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AgfA9QgHgCgGgFQgHgEgDgHQgDgIgBgJQAAgKAFgHQAEgIAGgDQAGgFAJgDIASgEIARgBIARgBQAAgKgHgFQgHgGgKAAQgIAAgIAEQgHAEgHAGIgUgUQALgKAOgFQAOgFAOAAQARAAAKAEQAKAFAHAHQAHAJACALQADAMgBAPIAAA9IgiAAIAAgQIgBAAQgFAKgLAFQgKAEgLAAQgIAAgJgDgAgHAKQgGACgEADQgEAEgBAGQAAAHAHADQAFADAGAAQAFAAAFgBQAFgCAEgCQAEgDACgEQADgFAAgFIAAgIIgKAAIgKAAIgLACg");
	this.shape_109.setTransform(-126.25,-64.825);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AAZA9IgZhQIAAAAIgWBQIgmAAIgsh5IAnAAIAZBMIABAAIAUhMIAoAAIAXBMIABAAIAWhMIAmAAIgrB5g");
	this.shape_110.setTransform(-143.225,-64.825);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_111.setTransform(225.075,-94.925);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#000000").s().p("AAVBfIAAg8IAAgLQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEADQgFACgCAFQgDAEAAAGIgBALIAAA9IglAAIAAi8IAlAAIAABTIABAAQABgDADgEIAHgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAIQAFAIACAJQABAKAAAMIAABEg");
	this.shape_112.setTransform(210.725,-98.3);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AADBOQgGgCgHgEQgGgEgDgHQgDgHAAgKIAAg5IgYAAIAAgeIAYAAIAAgkIAkAAIAAAkIAhAAIAAAeIghAAIAAAnIABAJQAAAFACADQACADADABQAEACAGAAIAIgBQAFAAACgDIAAAgIgNADIgNAAQgKAAgIgCg");
	this.shape_113.setTransform(198.225,-96.575);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AgWBgIAAhcIgYAAIAAgcIAYAAIAAgWQAAgKACgJQADgJAEgGQAGgHAIgEQAJgEAPAAIAMAAIAKACIgBAgIgHgCIgGgBQgJABgEAEQgFADAAANIAAATIAcAAIAAAcIgcAAIAABcg");
	this.shape_114.setTransform(181.55,-98.45);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_115.setTransform(169.075,-94.925);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AgdA8QgNgDgJgKIAXgZQAFAHAHADQAGADAJAAQAFAAAFgBQAGgCAAgFQAAgFgFgDIgLgEIgPgDQgIgCgHgEQgHgDgFgGQgFgHAAgMQAAgKAFgIQAEgIAHgFQAHgFAKgCQAJgDAIAAQAMAAAMAEQANADAIAJIgXAXQgIgKgNAAQgEAAgFACQgEACAAAGQAAAEAEACIALAEIAPAEQAJABAHAEQAHAEAEAGQAFAHAAAMQAAALgFAIQgFAIgIAEQgIAFgKACQgKACgJAAQgNAAgNgEg");
	this.shape_116.setTransform(148.225,-94.925);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_117.setTransform(135.275,-94.925);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("AgSBfIAAi8IAlAAIAAC8g");
	this.shape_118.setTransform(124.875,-98.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_119.setTransform(116.025,-94.925);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#000000").s().p("AhBBWIAGgeQAHADAKAAQAGAAAEgBQAEgBADgDQACgDACgDIAEgJIADgHIg2h6IApAAIAeBQIABAAIAahQIAnAAIg3CNIgIARQgDAHgFAFQgEAGgJACQgIADgOAAQgOAAgOgFg");
	this.shape_120.setTransform(102.6,-91.925);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_121.setTransform(90.075,-94.925);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_122.setTransform(69.025,-94.925);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("AADBOQgGgCgHgEQgGgEgDgHQgDgHAAgKIAAg5IgYAAIAAgeIAYAAIAAgkIAkAAIAAAkIAhAAIAAAeIghAAIAAAnIABAJQAAAFACADQACADADABQAEACAGAAIAIgBQAFAAACgDIAAAgIgNADIgNAAQgKAAgIgCg");
	this.shape_123.setTransform(56.525,-96.575);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_124.setTransform(44.475,-94.925);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AgSBfIAAi8IAlAAIAAC8g");
	this.shape_125.setTransform(34.075,-98.3);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("AhBBbIAAiyIAjAAIAAAQIABAAIAFgGIAJgGQAEgDAHgCQAEgCAGAAQAOAAALAFQALAFAIAIQAHAIAFAMQAEALAAAOQAAANgEALQgDALgIAJQgHAJgKAFQgKAGgNAAQgLAAgKgEQgLgDgGgJIgBAAIAABGgAgWgwQgIAIAAAOQAAAOAIAIQAHAIAPAAQANAAAIgIQAIgIAAgOQAAgOgIgIQgIgJgNAAQgPAAgHAJg");
	this.shape_126.setTransform(23.3,-92.225);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AA6A+IAAhFQAAgJgEgGQgDgGgJAAQgHAAgEACQgFACgCAEQgDAEgBAFIgBAKIAAA/IglAAIAAg/IAAgIQAAgFgCgEQgBgEgEgDQgDgDgHAAQgHAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEQADgDAFgDQAEgDAGgBQAGgCAHAAQAMAAAKAFQAJAFAFALQAHgLAJgFQAJgFAOAAQAMAAAIAEQAIAEAFAHQAFAHACAKQACAJAAALIAABHg");
	this.shape_127.setTransform(4.175,-95.075);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_128.setTransform(-14.325,-94.925);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_129.setTransform(-27.525,-94.925);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("AgWBgIAAhcIgYAAIAAgcIAYAAIAAgWQAAgKACgJQACgJAFgGQAFgHAJgEQAJgEAPAAIAMAAIAKACIgBAgIgHgCIgGgBQgJABgEAEQgFADAAANIAAATIAcAAIAAAcIgcAAIAABcg");
	this.shape_130.setTransform(-45.8,-98.45);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_131.setTransform(-58.275,-94.925);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#000000").s().p("AgqA+IAAh4IAmAAIAAATIAAAAQAFgLAIgGQAIgFANAAIAHAAIAGABIAAAiIgIgCIgIAAQgLAAgGADQgHADgDAFQgDAGAAAHIgBAQIAAAyg");
	this.shape_132.setTransform(-77.875,-95.075);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_133.setTransform(-90.675,-94.925);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#000000").s().p("AgFBeQgGgBgFgDIgIgHIgFgGIgBAAIAAAQIgjAAIAAi8IAmAAIAABQIAAAAQAGgIALgEQAKgEAKAAQANAAALAGQAKAFAIAKQAHAJAEAKQADAMAAANQAAANgEALQgEAMgIAJQgIAIgLAEQgLAFgNAAQgHAAgFgCgAgXAKQgHAIAAAOQAAAOAHAIQAJAJAOAAQANAAAIgJQAHgIAAgOQAAgOgHgIQgIgJgNAAQgOAAgJAJg");
	this.shape_134.setTransform(-105.35,-98.15);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#000000").s().p("AA6A+IAAhFQAAgJgEgGQgDgGgJAAQgHAAgEACQgFACgCAEQgDAEgBAFIgBAKIAAA/IglAAIAAg/IAAgIQAAgFgCgEQgBgEgEgDQgDgDgHAAQgHAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEQADgDAFgDQAEgDAGgBQAGgCAHAAQAMAAAKAFQAJAFAFALQAHgLAJgFQAJgFAOAAQAMAAAIAEQAIAEAFAHQAFAHACAKQACAJAAALIAABHg");
	this.shape_135.setTransform(-124.475,-95.075);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#000000").s().p("AgkA6QgJgEgEgIQgFgIgCgKQgBgLAAgMIAAhCIAlAAIAAA7IAAAKQABAGACAEQACAFADADQAEADAIAAQAGAAAEgCQAFgDACgEQADgFAAgFIABgLIAAg8IAlAAIAAB4IgkAAIAAgQIgFAHIgIAGIgJAFQgGABgHAAQgOAAgJgEg");
	this.shape_136.setTransform(-142.525,-94.775);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#000000").s().p("AAVA+IAAg7IAAgKQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEIAIgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAHQAFAIACALQABAKAAAMIAABCg");
	this.shape_137.setTransform(-156.875,-95.075);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_138.setTransform(-178.625,-94.925);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#000000").s().p("AAVBfIAAg8IAAgLQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEADQgFACgCAFQgDAEAAAGIgBALIAAA9IglAAIAAi8IAlAAIAABTIABAAQABgDADgEIAHgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAIQAFAIACAJQABAKAAAMIAABEg");
	this.shape_139.setTransform(-192.975,-98.3);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#000000").s().p("AADBOQgGgCgHgEQgGgEgDgHQgDgHAAgKIAAg5IgYAAIAAgeIAYAAIAAgkIAkAAIAAAkIAhAAIAAAeIghAAIAAAnIABAJQAAAFACADQACADADABQAEACAGAAIAIgBQAFAAACgDIAAAgIgNADIgNAAQgKAAgIgCg");
	this.shape_140.setTransform(-205.475,-96.575);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("AgIA9IgIgEIgEgIIgCgJIACgJQABgFADgDIAIgEQAEgCAEAAIAJACQAEACADACQAEADACAFIABAJIgBAJIgGAIQgDACgEACIgJACIgIgCgAgIgSIgIgEIgEgIIgCgJIACgJIAEgIIAIgEIAIgCIAJACQAEACADACIAGAIIABAJIgBAJIgGAIQgDACgEACIgJACQgEAAgEgCg");
	this.shape_141.setTransform(212.65,-125.1);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AgdA8QgNgDgJgKIAXgZQAFAHAHADQAGADAJAAQAFAAAFgBQAGgCAAgFQAAgFgFgDIgLgEIgPgDQgIgCgHgEQgHgDgFgGQgFgHAAgMQAAgKAFgIQAEgIAHgFQAHgFAKgCQAJgDAIAAQAMAAAMAEQANADAIAJIgXAXQgIgKgNAAQgEAAgFACQgEACAAAGQAAAEAEACIALAEIAPAEQAJABAHAEQAHAEAEAGQAFAHAAAMQAAALgFAIQgFAIgIAEQgIAFgKACQgKACgJAAQgNAAgNgEg");
	this.shape_142.setTransform(195.725,-125.025);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#000000").s().p("AgRBbIAAh5IAkAAIAAB5gAgOg1QgHgGAAgJQAAgJAHgGQAGgHAIAAQAJAAAHAHQAGAGAAAJQAAAJgGAGQgHAHgJAAQgIAAgGgHg");
	this.shape_143.setTransform(186.675,-128.025);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_144.setTransform(168.875,-125.025);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("AgRA9Igzh5IApAAIAdBSIABAAIAchSIAmAAIgwB5g");
	this.shape_145.setTransform(154.75,-125.025);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("AgeA9QgJgCgFgFQgGgEgEgHQgDgIAAgJQAAgKADgHQAEgIAHgDQAHgFAIgDIASgEIARgBIARgBQAAgKgHgFQgIgGgJAAQgIAAgIAEQgIAEgFAGIgVgUQALgKAOgFQAOgFAOAAQAQAAALAEQAKAFAHAHQAGAJADALQADAMAAAPIAAA9IgjAAIAAgQIAAAAQgHAKgKAFQgJAEgMAAQgJAAgHgDgAgHAKQgGACgEADQgFAEABAGQAAAHAFADQAGADAHAAQAEAAAFgBQAGgCADgCQAEgDACgEQADgFAAgFIAAgIIgJAAIgLAAIgLACg");
	this.shape_146.setTransform(140.9,-125.025);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AAZA9IgZhQIAAAAIgWBQIgmAAIgsh5IAnAAIAZBMIABAAIAUhMIAoAAIAXBMIABAAIAWhMIAmAAIgrB5g");
	this.shape_147.setTransform(123.925,-125.025);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AgfA9QgHgCgGgFQgHgEgDgHQgDgIgBgJQAAgKAFgHQAEgIAGgDQAGgFAJgDIASgEIARgBIARgBQAAgKgHgFQgHgGgKAAQgIAAgIAEQgHAEgHAGIgUgUQALgKAOgFQAOgFAOAAQARAAAKAEQAKAFAHAHQAHAJACALQADAMgBAPIAAA9IgiAAIAAgQIgBAAQgFAKgLAFQgKAEgLAAQgIAAgJgDgAgHAKQgGACgEADQgEAEgBAGQAAAHAHADQAFADAGAAQAFAAAFgBQAFgCAEgCQAEgDACgEQADgFAAgFIAAgIIgKAAIgKAAIgLACg");
	this.shape_148.setTransform(99.2,-125.025);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("AgWBgIAAhbIgYAAIAAgeIAYAAIAAgVQAAgKADgJQACgJAEgHQAGgGAIgEQAJgEAPAAIAMABIAKABIgBAgIgHgCIgGgBQgJAAgFAEQgEAFAAALIAAATIAcAAIAAAeIgcAAIAABbg");
	this.shape_149.setTransform(80.85,-128.55);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("AgZA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQAOAAAMAFQANAEAJAJQAJAIAFAMQAFAMAAANQAAAOgFAMQgFAMgJAIQgJAJgNAEQgMAFgOAAQgNAAgMgFgAgVgVQgIAIAAANQAAAOAIAIQAIAJANAAQAOAAAIgJQAIgIAAgOQAAgNgIgIQgIgJgOAAQgNAAgIAJg");
	this.shape_150.setTransform(68.375,-125.025);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#000000").s().p("AhABWIAEgeQAJADAIAAQAHAAAEgBQAEgBACgDQADgDACgDIAEgJIACgHIg1h6IApAAIAeBQIAAAAIAbhQIAnAAIg3CNIgHARQgEAHgEAFQgGAGgIACQgIADgOAAQgOAAgNgFg");
	this.shape_151.setTransform(46.4,-122.025);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#000000").s().p("AgNA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAJgJANgEQAMgFANAAQALAAAMAEQAMADAIAJIgYAaQgDgEgFgCQgFgDgGAAQgNAAgIAJQgIAIAAANQAAAOAIAIQAIAJANAAQAHAAAEgDIAIgGIAYAaQgIAJgMADQgMAEgLAAQgNAAgMgFg");
	this.shape_152.setTransform(33.875,-125.025);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("AAVA+IAAg7IAAgKQgBgGgCgEQgBgFgEgDQgEgDgIAAQgGAAgEACQgFADgCAEQgDAFAAAFIgBALIAAA8IglAAIAAh4IAkAAIAAAQIAAAAQACgDADgEIAIgGIAJgFQAGgBAHAAQAOAAAJAEQAIAFAFAHQAFAIACALQABAKAAAMIAABCg");
	this.shape_153.setTransform(20.225,-125.175);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_154.setTransform(5.875,-125.025);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#000000").s().p("AgkA6QgJgEgEgIQgFgIgCgKQgBgLAAgMIAAhCIAlAAIAAA7IAAAKQABAGACAEQACAFADADQAEADAIAAQAGAAAEgCQAFgDACgEQADgFAAgFIABgLIAAg8IAlAAIAAB4IgkAAIAAgQIgFAHIgIAGIgJAFQgGABgHAAQgOAAgJgEg");
	this.shape_155.setTransform(-8.475,-124.875);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#000000").s().p("AAdBbIAAhGIgBAAQgGAJgLADQgKAEgKAAQgNAAgLgGQgKgFgHgJQgHgJgEgLQgEgLAAgNQAAgOAEgLQAFgMAHgIQAIgIALgFQALgFAOAAQAFAAAGACQAGACAFADIAIAGIAGAGIAAAAIAAgQIAjAAIAACygAgUgwQgHAIAAAOQAAAOAHAIQAIAIAOAAQAOAAAIgIQAHgIAAgOQAAgOgHgIQgIgJgOAAQgOAAgIAJg");
	this.shape_156.setTransform(-23.925,-122.325);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("AgUA7QgNgEgJgJQgJgIgFgMQgFgMAAgOQAAgNAFgMQAFgMAJgIQAKgJAMgEQAMgFANAAQANAAALAFQALAEAHAJQAHAIAEAMQAEAMAAANIAAAMIhWAAQACALAIAGQAHAGAKAAQAKAAAGgEQAHgEAEgGIAbATQgJALgOAHQgOAGgPAAQgNAAgMgFgAgIgiQgFACgDADQgEADgCAFQgCAEAAAEIAxAAQAAgJgGgHQgHgHgKAAQgFAAgFACg");
	this.shape_157.setTransform(-38.575,-125.025);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("AgqA+IAAh4IAmAAIAAATIAAAAQAFgLAIgGQAIgFANAAIAHAAIAGABIAAAiIgIgCIgIAAQgLAAgGADQgHADgDAFQgDAGAAAHIgBAQIAAAyg");
	this.shape_158.setTransform(-50.325,-125.175);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#000000").s().p("AgWBgIAAhbIgYAAIAAgeIAYAAIAAgVQABgKACgJQACgJAEgHQAFgGAIgEQAKgEAPAAIALABIALABIgCAgIgGgCIgGgBQgJAAgFAEQgEAFAAALIAAATIAcAAIAAAeIgcAAIAABbg");
	this.shape_159.setTransform(-60.35,-128.55);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("AgWA4QgLgEgIgIQgHgJgEgLQgFgMAAgMQAAgNAFgLQAEgLAIgIQAIgJALgEQALgEANgBQAMAAAJAEQALAFAHAIQAIAIAEALQAEALAAAOIAAAGIheAAQAAAIAEAGQADAIAFAEQAFAGAHACQAGAEAIAAQAMAAAJgFQAIgFAIgIIAPALQgLAOgNAFQgMAGgQAAQgNgBgLgFgAgYgiQgKAKgCAPIBJAAQAAgPgKgKQgJgJgQAAQgQAAgKAJg");
	this.shape_160.setTransform(-79.1,-124.8);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("AAgBeIAAhGQAAgOgHgJQgGgHgOgBQgJAAgGADQgIAEgDAFQgFAGgCAIQgCAIAAAKIAAA5IgUAAIAAi8IAUAAIAABZIAAAAIAFgHIAJgGIALgFQAFgBAHgBQALABAIADQAJAEAFAGQAGAGADAIQACAIAAALIAABIg");
	this.shape_161.setTransform(-93,-128.4);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AABBJQgGgCgDgFQgEgFgBgIIgBgQIAAg/IgZAAIAAgRIAZAAIAAggIATAAIAAAgIAiAAIAAARIgiAAIAAA6IAAALIACAIQACADADACQAEADAGAAIAJgBIAJgEIAAASIgLAEIgMABQgKAAgGgEg");
	this.shape_162.setTransform(-104.425,-126.3);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#000000").s().p("AgTAeIARg7IAWAAIgUA7g");
	this.shape_163.setTransform(-119.375,-118.5);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#000000").s().p("AgWA4QgLgEgIgIQgHgJgEgLQgFgMAAgMQAAgNAFgLQAFgLAHgIQAIgJALgEQALgEANgBQALAAAKAEQALAFAHAIQAIAIAEALQAEALAAAOIAAAGIheAAQABAIADAGQADAIAFAEQAFAGAHACQAGAEAIAAQAMAAAJgFQAIgFAIgIIAOALQgKAOgMAFQgNAGgQAAQgNgBgLgFgAgYgiQgKAKgCAPIBJAAQAAgPgKgKQgJgJgQAAQgQAAgKAJg");
	this.shape_164.setTransform(-129.6,-124.8);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("AgQA5QgLgFgIgHQgIgJgEgLQgFgMAAgNQAAgNAFgLQAEgLAIgIQAIgIALgFQALgEANgBQANABAMAEQALAEAJAKIgQAOQgGgIgHgDQgHgDgJgBQgJABgHADQgIADgFAGQgFAGgCAIQgDAIAAAIQAAAJADAIQADAIAFAGQAFAGAIADQAHAEAIAAQATAAALgPIAOAOQgIAJgMAFQgLAFgNAAQgNAAgLgFg");
	this.shape_165.setTransform(-142.175,-124.8);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AAgA8IAAhGQAAgOgHgJQgGgIgOAAQgIAAgHADQgHAEgEAGQgFAFgCAIQgCAJAAAJIAAA5IgUAAIAAhYIAAgPIAAgNIASAAIAAAKIAAAJIABAAIAGgIIAJgHIALgFQAFgCAHAAQALAAAJAEQAIADAFAGQAGAGADAKQACAIAAALIAABHg");
	this.shape_166.setTransform(-155.6,-124.95);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#000000").s().p("AgWA4QgMgEgHgIQgIgJgDgLQgFgMAAgMQAAgNAFgLQAEgLAIgIQAIgJALgEQALgEAMgBQANAAAJAEQALAFAHAIQAIAIAEALQAEALAAAOIAAAGIheAAQAAAIAEAGQADAIAFAEQAFAGAHACQAGAEAIAAQAMAAAJgFQAIgFAIgIIAPALQgLAOgNAFQgMAGgQAAQgNgBgLgFgAgYgiQgKAKgCAPIBJAAQgBgPgJgKQgJgJgQAAQgQAAgKAJg");
	this.shape_167.setTransform(-169.45,-124.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("AAvBYIAAhSIhdAAIAABSIgVAAIAAivIAVAAIAABKIBdAAIAAhKIAVAAIAACvg");
	this.shape_168.setTransform(-185.425,-127.8);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FB9169").s().p("EhBBAaWQh9AAhYhcQhZhcAAiCMAAAgryQAAiCBZhcQARgSATgPQhABTgBBwMAAAAryQABCCBYBcQBYBbB9AAMCDEAAAQBkABBMg7QgKANgNAOQhZBch8AAg");
	this.shape_169.setTransform(-1.9,-15.2);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FBEBA3").s().p("EhBhAazQh9AAhYhbQhZhcAAiCMAAAgrzQAAhvBBhTQALgOANgNQBYhcB9AAMCDDAAAQB9AABYBcQBZBcAACBMAAAArzQAACChZBcQgRARgTAPQhMA7hlAAg");
	this.shape_170.setTransform(7.325,-24.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhUuAxYQiLABAAiNIAAAAMAAAgjeMCtzAAAMAAAAjeQAACNiMgBIAAAAgEhW5ALuMAAAg66QAAiLCLAAIAAAAMCpcAAAQCMAAAACLIAAAAMAAAA66g");
	mask.setTransform(0.5503,-0.1499);

	// bg1
	this.instance = new lib.er();
	this.instance.parent = this;
	this.instance.setTransform(15.95,-6.4);
	this.instance.filters = [new cjs.BlurFilter(32, 32, 1)];
	this.instance.cache(-735,-326,1470,652);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bg0
	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.lf(["#DBDED1","#A2D8DD"],[0,1],-0.7,-56.5,0.8,53).s().p("EhUuAS1QiLAAAAiMMAAAgjdMCt0AAAMAAAAjdQgBCMiMAAg");
	this.shape_171.setTransform(0.55,195.375);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#DBDED1").s().p("EhW5AejMAAAg65QAAiMCLAAMCpcAAAQCMAAABCMMAAAA65g");
	this.shape_172.setTransform(0.55,-120.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_172},{t:this.shape_171}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.first_screen1, new cjs.Rectangle(-555.7,-316.2,1112.5,632.0999999999999), null);


(lib.level_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_127 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(127).call(this.frame_127).wait(1));

	// Layer 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_127 = new cjs.Graphics().p("EhRGATpQi4AAAAjLMAAAgg6QAAjMC4AAMCiPAAAQC2AAAADMMAAAAg6QAADLi2AAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(127).to({graphics:mask_graphics_127,x:182.2,y:-159.975}).wait(1));

	// Layer 5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#583720").s().p("AhAAkIASgSQAGgKAPgJIAHgGIAUgRIABAAIAFgEIAWgRQAPgKATgHIAAgBIABAAIgBAJQgBABAEAEQgFABgBAEIgCALQABAHADACIgRAPIgGAEIhRBFQgfgFAIgXg");
	this.shape.setTransform(-156.6231,-184.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C59064").s().p("AjfCFQgXgEgOgJQgVgNgFgGIACgGIACgBQgYgUAOAJIAIAHQAHAAABgCQALgMANgKQADAAAEgCIAbgSQAJgCAzgWIAMgFIBAgZIBsgpQArgQAMgFQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAgBIAPgPIAUgSQAIgHAcgNQAbgMA1AHIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQARALAMgKQgHANgWAGQgDADgVADIgOADIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgXADgXgCQAVAEAUgCIgBABIAHgBIANgCQgGAJgIAHIgEACIgEADIgDACQgTAKgcAEQgBAAABABQAAAAAAAAQAAAAAAAAQABAAAAAAQAVgCAPgEIAAABQgTAGgPAKIgWARIgFAEIgBABIgVARIhEAoQg5Akg7AfQg9AfgjACIgQABQgIAAgHgBgADbgEQgOgEgPgHQgfgNAQgUIAGAFQAeAQAgALIgBAAIABABQgFAJgPACIgEAAgACZgKIARgPIAAAAQASASAYADQggAAgbgGgADzgRQgTgMgZgKQgJgDgIgFQgQgSAcgIQAEAFAHAEQAfAMAYAPQAHAOgUAGQgBAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAABgAEHgnIgCABQgYgXgngPQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAKgHAEgLIAOgDIAZAMQASAIAKALQARARgeAMgADmhlQAMgDAMgGIAFgCQAPAHANAKQAZASgdANQgRgZgkgMg");
	this.shape_1.setTransform(-167.3122,-184.8498);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AjuCMQgdgEgPgKQgPgKAEgPIABgBQAEAGAVAMQAPAJAXAEQALADATgCQAkgDA8gfQA8gfA4gjIBFgpIgIAGQgOAJgHAKQg5Ang0AdQhKArgnAJQgbAFgVAAIgVgBgAi1AXIA3gZQAqgUA2gTIBOgdQAagJABgBIAJgLQAGgHAggWQAigVApABQAjABAcAIIACAAIABAAIABACIgBABQAAAGgHAFQAtAMgIAgQgBAIgMACIgBABIABADQAEAHgGAFQgJAIgLgBQAMALgSAKQgGAEgGgBQAAANgXAAQghALgngNIgEgCIAFgEQAcAGAfAAQgYgEgRgSIAAABQgEgDgBgGIACgLQACgEAEgBQgEgEACgCIAAgIIAAAAQgQAFgUACQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAdgDATgLIACgBIAFgEIADgCQAJgHAGgJIgNACIgHABIAAAAQgTACgVgEQAXABAXgCQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABABIAAgBIAOgDQAWgDACgDQAWgGAIgNQgNAKgQgLQAAAAgBgBQAAAAAAAAQAAgBAAAAQABgBAAAAIABgBQg2gIgbAMQgbANgJAIIgTASIgQAPQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABgBAAQgLAGgrAPIhsApIhBAZIgLAFQg0AXgIABIArgVgAC4gQQAOAGAPAEIAEABQAPgCAEgKIAAAAIAAgBQgfgLgegPIgHgFQgPATAfAOgADwgTQAVgGgHgOQgZgPgegMQgHgEgFgFQgcAJARARQAHAGAKADQAZAJATAMIABgBIACABgAEBgoIAAAAQAdgLgRgRQgKgMgSgIIgZgMIgNADQgEAMgLAHQABAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAmAPAZAWIABAAIABAAgAD3hvQgMAGgMADQAkAMASAYQAcgMgZgTQgNgKgPgGIgFACgADpiAIASgBIgPgCIgCADIAAAAIgBAAgAigAGIABABIgBAAIAAgBg");
	this.shape_2.setTransform(-166.6902,-184.669);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},127).wait(1));

	// Layer 4
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C59064").s().p("AgcArIASgGIASgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBIgIACQgNACgRAJIgPAGIgEAAIAZhVIAQAJIATAMIAPAKQAIAFACAMQABAMgLAKQgJAIgTAJg");
	this.shape_3.setTransform(-193.591,-237.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgBArQASgJAKgIQALgKgCgMQgBgMgIgFIgPgKIgTgMIgQgJIgDgDIADAAQAQADAYAKIANAGQAUAKAGALIACAEIAAAKIgBADQgEAMgSAKIgKAEIgXAHIgPAFIAMgFgAg4AtIgBAAIAIgCIAFgCIAOgGQASgJANgCIAIgCQAAABABAAQAAABAAAAQAAABABAAQAAABAAAAQAAAEgDABIgHACIgSADIgSAGIgMADIgDAAIgEABIgCgBg");
	this.shape_4.setTransform(-192.9125,-237.625);

	this.instance = new lib.sdrntm();
	this.instance.parent = this;
	this.instance.setTransform(-201.6,-242.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#501C1E").s().p("AAAAAIABAAIAAAAIAAAAIgBAAg");
	this.shape_5.setTransform(-185.675,-223.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgzALQghgEgfgUQAUAFAeAEQAeAEAnAAQAmgBAZgCQAYgDAZgHQABACgTAKQgSAIgMADQgNACgiACIgTAAQgZAAgcgDg");
	this.shape_6.setTransform(-194.6195,-224.1295);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#874F2E").s().p("AiJE+QAchHhsgnQhvgogfgmIADgHQBfA/BjAlQBiAkCsAMQg6AQggAaQgrAagpAAQglAAgigVgAnXBNIgBgGQAHACALgDQAUgFASgDIAMAHIAAgBQgRgjg5AAQgBAAgBABQgBAAAAAAQAAAAAAAAQAAABABAAQALAFAPAFIAXAKIgLACIgCAAQgIADgJABQgJABgDAFIgCACQgKgDgMgKQgPgOAAgMQAAgNAPgEQAJgDASAAQAgAAAUAcQAQAUAAARQAAARgwAAQgPAAgGgPgAHGh7QARAEANAEQARATAMAWIgJANQgSgggggegAGeibIgVgOQgrgag0gTQgngOg5gIQhBgGgggFQhqgPg3gzQABgNgCgMQBcBbDGgUQA5AjBCAeQA3AZAmAeQgQgFgTgDg");
	this.shape_7.setTransform(-222.125,-236.4966);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C59064").s().p("AiQD1Qhjglhgg/IACgHQABgGgGADIgFAEQgPAHgUADQhaAOgqg7Qgrg+A8gzQAMgKARACQBmAMADBDQAAAFAEgCQAMgGAEgIQA4AagCgjQAHgBADgEQAPgKgRgKQAOgIAJgJQAFgGgEgEQgQgUgagPQAUgJgEgOQAJgCALgJQA0goAEg2QAKgCAOgLIAHgFQAOALAhgKQBHgWAPg0QAEgOABgOQA1A0BsAPQAgAEBBAHQA4AIAnANQA1AUArAaIAUAOIgCgBIgHgBIgBAAIgJAAQgDgFACgHQgFABgSAHQgUAIAMARIAvAFQAZADAUAFQAfAdASAgQgJAPgDAQQgJApAQApQAtB1iBA8QheAjhwADQg7ACgqADQirgMhigkgAEMCuQAtAOApgQIAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgrALgngIIAAABgAngAiQgPAFAAAMQAAAMAQAOQAMAKAKADIgBABIADABIABAHQAHAPAPAAQAvAAAAgRQAAgRgPgVQgUgbghAAQgRAAgKACgAFoBCQAQAPATABQAUABANgFQAOgEAIgEQAJgDAKgKQAYgXAAghQAAgggYgXIgCgCQgXgWggAAIgBAAQgiAAgYAYQgOANgGARQgZgKgQgEIgDAAIABADIABABQADAAANAJIAVAMIAPAJQAHAFACANQACAMgLAKQgHAGgMAGIgWAKIAZgIIANgFQAEAGAQAPgAgBhoQgjAfAAAsQAAArAjAfQAiAfAyAAQAzAAAjgfQATgRAJgVQAGgPABgRIAAgEQAAgsgjgfQgjgegzAAQgyAAgiAegAE2AiQgOACgRAJQgVAKgHAAIACAAQAAACAGgCIADAAIAegJIATgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBgBIgIACgABnibQAcACAqAGIAuAGQAVgNgPgMIgRgOQgDAIgFAEIgJgCIAAgBIgHAAIg9gEQgbgDgkABQglABgaAFQgZAEgVAHIA2gBQA6ACAoAEgAIUgxIABABIgBABIAAgCg");
	this.shape_8.setTransform(-223.8726,-238.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#372F2F").s().p("AmcEEQgEgHgHgHQgsgthJgHQgLACgJAEQgGgVgEgYQgCgNAMgJQAggVgSgPIgPAGIgCgMQgCgKALgIQAfgYgTgQQgKAFgJAHQgEgYAKgVQAphcCYgLQAxgEgqgKQgVABgWACIgPACQgSgKgagFIAcgKQCBg0CQAXIABAAIACACIABgBQAGAAgEgDQANgWAYgTQBhhICPANIhQA4IgFABQgIABAAAGIABAAIgBABIADABIAOgCQBBgDA4ALQgmAEgjAKIgBABQAtALA/gLQCCgWBXA6QAhAXAWAXQg0gRg+ACIgNACIgKgCIgFAAIAHADIgaAGQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABIA2AFQAjARAqAQQCkA+guBeQgRgVgigXQgNACAJAIQAhAbANAYIgCABIADABQAgA/hpAsQABgfgEgSIAHgGIABgBIgBgBQgKgLgJgIQgKgQgRgQQgTgRgYgKQhogthQg2IADAAIgBgCIgGAAQhHgxg0g7QgPAiAwAkQAcAUAgAUQjHAGhfhiQgIgSgPgPQgBAAAAABQgBAAgBAAQAAAAAAAAQAAABAAAAIAAABQgFABACAFIAIAOQALAwgSAyQgRAwhFAAIAXgVQAXgXgSgPQgRAFgHAMQgSAcggAUQgEgNgJgJQgWAcABAnQABAvg2AVQgHADADAEIABADIgRAWIgRgJQgBABgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAEAdA3ATIgKAHQgLAGgEAGQgRgRgVgPQgXgRgPgFQABAGARASQATATASAKIASAMIAAAFQgBAEgDAEQgEAEAAAFIgfgLg");
	this.shape_9.setTransform(-217.0588,-261.8425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("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");
	this.shape_10.setTransform(-218.8817,-247.7474);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQAqgDA7gCQBwgDBegjQCBg8gth1QgQgpAJgqQADgQAJgPIAKgMQgMgWgSgSQgNgFgQgDQgUgFgZgDIgvgFQgMgRAUgIQASgHAFgBQgCAHADAFIAJAAIABAAIAHABIACABQATACARAFQgmgeg3gZQhCgdg5gjQjHAThchbQADAMgBANQgBAOgEAOQgPA0hHAWQghAKgOgLIgHAFQgOALgKACQgEA2g0AnQgLAJgJACQAEAOgUAJQAaAPAQAUQAEAEgFAGQgJAKgOAIQARAKgPAKQgDAEgHABQACAjg4gaQgEAIgMAGQgEACAAgFQgDhEhmgMQgRgCgMAKQg8A0ArA+QAqA7BagOQAUgDAPgHIAFgEQAGgDgBAGIgCAHIgDAGQAgAnBuAoQBtAmgdBIgAHrAOIAFANIAHgGIABgBIgBgBQgKgLgJgIIAHAOg");
	this.shape_11.setTransform(-218.8817,-247.7474);

	this.instance_1 = new lib.rt7();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-201.55,-241.15,0.7934,0.5254);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAAAGIAAgKIABAKg");
	this.shape_12.setTransform(-200.9,-160.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AALBmIgdgJIghgKIg3gOIADgGQARghAWgZIAcgdIAXgUQAPgPApgbQApgaATgGIAEAAIgCAFQgBABAAAAIABAAIAAAAIgBAAIABABIAAABIgFACIgCACQgzAbgXATQgUASgTAOIAAAAIAAABIgCAAQgvAlgWA0IBaAXIAbAIIAGABIAVAGIAAgBIACgEIABAAQAEgHAag9QgBgDADgKIAAgCIACADIABgDIAAAAIABAEIAAACIABABIACAHIgZBMQADABAAAFQABAFgGAGIg+gRgABkhuIADAAIAAgBIgCAAIgBABgABnh0IABAAIgBgBIAAAAg");
	this.shape_13.setTransform(-255.3,-191.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#35BAD6").s().p("AAiA7IgGgBIgagIIhbgXQAXgzAugmIARADQBSAYAGAIIAFAFIAAACQgDAKABADQgaA8gEAHIAAAAIgCAEIgBABgAgSg/IAAAAIABAAIgBABg");
	this.shape_14.setTransform(-255.025,-188.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#261E1E").s().p("AAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIAAABg");
	this.shape_15.setTransform(-256.7386,-194.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#246662").s().p("AgsAbIgRgDIACAAIABgBIAAABIABgBQABAAAAAAQAAAAAAAAQAAAAgBAAQAAAAgBAAIgBAAQAVgOAUgRQAVgTA0gbIABgCIAGgCIgJAbIgIAxQgJALAJAeQgHgIhSgYg");
	this.shape_16.setTransform(-250.95,-196.775);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C59064").s().p("AAeDvIgXgHQgpgPgnhvQgXi1ANhIQAMhJAKgTIB0AjIABgDIAgAJIghBeIgJAWQggBOgHBLIgCAJQAAACAMAHQAfAWAVAZQAGAMgQAHQgGADgDgBQgCgBgFgBQgFgBgNgKIgFgCQgLgIgCgGIAAAEQAGAXAKASQALATAGAHIACADQAOAMgIAHQgxgbgRgyQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAKA2A6AZIACAGQAEAKgRAAIgHgBg");
	this.shape_17.setTransform(-257.388,-160.4346);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgID0QgZgMgUgsQgVgrgGgaQgfjpAnhsQAHgSASgRIAIAAQgIASgPANIAAAAIgCABIACAAIABABQgKATgMBJQgNBIAXC1QAnBvApAPIAXAHQAYACgEgLIgCgGQg6gZgKg2QAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQARAyAxAbQAIgHgOgMIgCgDQgGgHgLgTQgKgSgGgXIAAgEQACAGALAIIAFACQANAKAFABQAFABACABQADABAGgDQAQgHgGgMQgVgZgfgWQgMgHAAgCIACgJQAHhMAghNIAJgWIAhheIAHABQg9CqgWBpIA0AqQAXAVgQAPQgHAFgLAAQgHgBgIgEQgFgBgFgGIgIgFIAAABQAEAOANAUQANAUACABIADAFIAEAKQADAHgGADQAEANgMAEIgMABQgUgBgYgNg");
	this.shape_18.setTransform(-257.3816,-161.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#35BAD6").s().p("AhFAFIgBgCIgCAAIACgBIAAAAQAPgLAIgSIB4gMIgZBMIgBACg");
	this.shape_19.setTransform(-256.575,-184.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQirgMhigkQhjglhgg/IgDAGQAgAnBuAoQBtAmgdBIg");
	this.shape_20.setTransform(-218.8817,-247.7474);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("Ah3A7QAYg9hsgMQgNABgLAEQgsAOAKAcQgWAEgUAKIgGAEIAHgNQAXgaAEgTIAFgDIAAAAQgGgHgNABIAAgBQAEgYAigMQB9guBPBFQAjAegWAVQgXgVghgPIAAABQgGAAgFAEIAAABQALAUAUAKQgfAbABAYQgIgHgLgGgADRA5QgSgBgGgDQgMgFAAgNQAAgEAEgGIAGgIQgRgRABgEQAAgBAAAAQAAgBAAgBQAAAAABgBQAAAAAAgBQAxgOA0AIIABAEIABgBIABgDQATADATAFQgHALADANIgDgDIgCADQgbgFggACIgCAAIgEACIgLAFQgGADgBAEIAAABQAJADAKgCQAegHAhgCQgCADgBADIgDAAQggADgTAOQgMAJgBAJQgHgDgOgCg");
	this.shape_21.setTransform(-241.45,-92.429);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C59064").s().p("ABYhuIAHgCIAIgBIADAAIAPgEIgTACIABgYQACACAFABQBNAVBLgGQgGAhg0APIAAABQANgBAKgDQggBfAGBgQgYgEgdADQgvAEgpAPIgPAHQALiBAgh5gACGh3IAFgBIAAAAgAkFA+QASgtAOgwQAOgxARgqQBEASBLADQhCBegCBlQgtgkhdAEg");
	this.shape_22.setTransform(-234.6,-106.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#246662").s().p("AATBTQgugBhCgOQgpgJglgOIgTgIIAAAAIgEgMIgBgGIgCgLIABgDIABgYQAQgxBtgOIAAgBIADAAIACAAQARAnBegLQA3gIAKgTIAKACQgBgCAQAHQAMAFAjAUIgSAEQgOAJgJAbIgYgcIgDABIAZAfIAJAKIACADIAYAjIABABIANAUIABAEIAIAOQgDADgoAAIiIgBg");
	this.shape_23.setTransform(-229.8,-196.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#AA7F64").s().p("AnPBEQAGgWAKgWQANAWAwAJQAiAGA+AAQA2AABXgNQgHAWgJAWQAGADACgDQABAAAAAAQAAAAAAAAQAAAAAAABQAAABgBABQg+AThKABIgIAAQhoAAg6gvgAA6AyQgXgHABgUQABgPASgDIA0gJQAVAPBJAJQA+AIBBAAQBSAAAUgGQALgCAWgJQAAANgIAPQgHAPgWAFQhUAThTAAQhlAAhkgcgAAzgwIAEgBIgFgCIgBgBIAAAAIAAABQgggGgMgOIAfgRIADgCIAAADQABAAABAAQAAAAAAgBQABAAAAAAQAAAAAAgBIABgDQAbgPAdgHQgBAAAAABQAAAAAAABQgBAAAAABQAAABAAAAQAAAEAQATIgFAHQgFAHAAADQAAANAMAFQAGAEASABQAPABAGADQgBAHAGAHIAAABIgnADQgyADgYAQQAFgXgGgTg");
	this.shape_24.setTransform(-234.5,-81.8711);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F8E8D9").s().p("AmKBPQgwgKgNgVIANgZQAOgaAhgPQAAABAJgEQgIADABgBIAVgIQCCgnBEBIIAFAIIABAAIAAgBQAPATACAVIgFASQhYAOg1AAQg/AAgigGgADBArQhJgJgVgQQBxgVBqgiQAgAAAcAIQBRAUgDAsQgWAIgLADQgVAFhRAAQhCAAg+gIgAlAgyIgRACQAHgIAEgLQAIgPAXgBQBogEgHBBQgsgYhOgEg");
	this.shape_25.setTransform(-233.7196,-84.2116);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#B09B61").s().p("Al7BtQCGiYA3ilQAFACAHAAIBjACQgkAngbAqQgDgogEgnIgCAAQgMAvAPAoQgoBAgYBDQgLAlgSAjQgUAnAHAgQAghLAZhNQATg5Akg0IABABIAAgBIAAgBQALgRAOgQQAcgkAMggQC1ADC1gBQADBnAtBkQAQAlAIAmQAIAgAOAbQgYAMgcAMQiGA7iSgrQABgxAMgvQAHgbAKgaQANgfACgaQAWACAdgKIgBgBQgaAEgYgCIAAgHIgDAGQgYgDgUgKIgDAAQATARAYADQgdA+gPBEQgMA4AKAzIgHABIACgEIgCAEQgqADgoAAQjfAAhrhkg");
	this.shape_26.setTransform(-229.1,-138.5914);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#35BAD6").s().p("AjFCZIgOgBQAAgxAPhUQgBh3gGg6QAlAOApAJQBCAOAvABICHABQAoAAADgDQA4BgARBNQAJANAFBfIhhAAQi0AAitgGgAj4iIIAAgCIgEgIQACACADABIACABIgDALg");
	this.shape_27.setTransform(-226.575,-175.8039);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("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");
	this.shape_28.setTransform(-234.6705,-137.986);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#246662").s().p("Ag7AFIAAAAIgKgLIgIgKQABgHACgGQAKgLAOgIIASgFIAMAHQAsAaA2AoQgNADhWAfIgmgxg");
	this.shape_29.setTransform(-208.225,-195.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#C59064").s().p("AhDAVQgcgVAAgKQBRgcArgfIBDA3IgZALIgBADQgaAUgXAVQgDADgEABQgLAJgHANIgCADQghgYgcgZg");
	this.shape_30.setTransform(-193.5,-180.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#35BAD6").s().p("AhfgZQBXgeAMgDQAtAcAVAPQATAPAHADQgwAchIAdg");
	this.shape_31.setTransform(-200.825,-188);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAYCEQgbgTgYgcIgGgOIgXgaQgXgagdgtIADADIgEgFIABACIgDgEIgCgEQgGgJgGgIIgegqIgFgHIgDgFIAAgCIgFgHIAFAGIAIAKIAJAMIAAABIAmAwIBHBUQBIgcAxgcQgHgDgUgQQgUgPgtgcQg2gpgsgaIgMgHIAPgCIA+AqQBsBLAPAOIAoAfIAoAeIAAACIABAAIAGAGIgMgBIhDg2QgtAehPAcQAAAKAbAWQAcAZAhAYIgFAFIAAAHIgZgRg");
	this.shape_32.setTransform(-199.575,-186.75);

	var maskedShapeInstanceList = [this.shape_3,this.shape_4,this.instance,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.instance_1,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.instance_1},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.instance},{t:this.shape_4},{t:this.shape_3}]},127).wait(1));

	// Layer_5
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#74492A").ss(4,1,1).p("ARUhcI9hgBQi/CviHAM");
	this.shape_33.setTransform(794.725,-161.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_34.setTransform(476.075,-170.7686);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#74492A").ss(4,1,1).p("ACjhdQi+CviHAM");
	this.shape_35.setTransform(281.75,-161.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#74492A").ss(4,1,1).p("AKMD6QiaADjljeAriD6QBgAACAhbQBPg3BZhaQAjggAjgZQCWhvCUAgQABAAACAAQB2AhB6B1EAgFAD6QiYADjijbQAAAAAAAAIgCgCQgBAAAAgBQiCh3hjgeQjBg2jHC6QjvDtidgBA/Zi/QhogHCUghQCUgiB6AeQB7AfA5AfQA6AfESC8QETC8CmAQ");
	this.shape_36.setTransform(59.6086,-176.71);

	var maskedShapeInstanceList = [this.shape_33,this.shape_34,this.shape_35,this.shape_36];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33}]},127).wait(1));

	// Layer 4
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#66CC99").s().p("EBE6AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEBDCAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEBBKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA/SAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA9aAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA7iAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA5qAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA3yAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA16AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA0CAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAyKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAwSAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAuaAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAsiAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAqqAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAoyAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAm6AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAlCAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAjKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAhSAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAfaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAdiAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAbqAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAZyAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAX6AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAWCAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAUKAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgASSAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAQaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAOiAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAMqAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAKyAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAI6AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAHCAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAFKAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgADSAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgABaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAgdAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA7AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg7AAgAiVAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAkNAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAmFAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAn9AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAp1AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgArtAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAtlAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAvdAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAxVAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAzNAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA1FAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA29AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA41AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA6tAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA8lAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA+dAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEggVAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgiNAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgkFAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgl9AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgn1AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgptAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgrlAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgtdAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgvVAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgxNAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgzFAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg09AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg21AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg4tAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg6lAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg8dAAHQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEg+VAAGQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAAAAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEhANAAFQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABAAAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEhCFAAEQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBgEhD9AADQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAgBQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBgEhF1AACQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAABAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBg");
	this.shape_37.setTransform(245.575,-170.6);
	this.shape_37._off = true;

	var maskedShapeInstanceList = [this.shape_37];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_37).wait(111).to({_off:false},0).wait(17));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-281.7,-285.7,1001.4000000000001,216.2);


(lib.blink_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_34 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(34).call(this.frame_34).wait(2));

	// Layer_1
	this.instance = new lib.highlight_mc();
	this.instance.parent = this;
	this.instance.setTransform(63.2,27.8,1,1,0,0,180,63.3,27.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false},0).to({_off:true},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,136.5,65.6);


(lib.adse = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#74492A").ss(4,1,1).p("ARUhcI9hgBQi/CviHAM");
	this.shape.setTransform(1208.025,-161.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3AKgC/QiZACjmjcEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_1.setTransform(889.375,-170.7686);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#74492A").ss(4,1,1).p("ACjhdQi+CviHAM");
	this.shape_2.setTransform(695.05,-161.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#74492A").ss(4,1,1).p("A+rBGQA5g5BJg5QDHi7DBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgCAs7C/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB1AgB6B3AesC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAAIzC/QiaACjljc");
	this.shape_3.setTransform(481.825,-170.7686);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#74492A").ss(4,1,1).p("ACjhdQi+CviHAM");
	this.shape_4.setTransform(277,-161.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#74492A").ss(4,1,1).p("AGRC/QiaACjljcAcJC/QiXACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAAvdC/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB2AgB5B3A8IiqQBjgjBhAbQBkAeCCB5QAAAAAAABIACABIABABQDiDZCYgC");
	this.shape_5.setTransform(80,-170.7686);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_6.setTransform(906.075,-170.7686);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#74492A").ss(4,1,1).p("AesC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAA+rBGQA5g5BJg5QDHi7DBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgCAs7C/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB1AgB6B3AIzC/QiaACjljc");
	this.shape_7.setTransform(498.525,-170.7686);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#74492A").ss(4,1,1).p("AHJC/QiaACjljcAulC/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB2AgB5B3AdCC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAA9BhwQCdhsCZAqQBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgC");
	this.shape_8.setTransform(91.075,-170.7686);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#74492A").ss(4,1,1).p("ApfC7QBhAACAhbQBOg4BahYQAjghAjgZQCVhvCVAfQABAAACABQB1AgB7B3EgiIACHQBOBXCRgoQCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAiJAC7QiYACjijZQgBAAAAgBIgBgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAAMQC7QiaACjljc");
	this.shape_9.setTransform(108.5,-170.387);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_10.setTransform(1006.275,-170.7686);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_11.setTransform(169.725,-170.7686);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#74492A").ss(4,1,1).p("ACjhdQi+CviHAM");
	this.shape_12.setTransform(-24.6,-161.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#74492A").ss(4,1,1).p("AETCsQiXADjijaQAAAAAAAAIgCgCQAAAAgBgBQhchVhNgo");
	this.shape_13.setTransform(-68.95,-168.9236);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3AKgC/QiZACjmjc");
	this.shape_14.setTransform(1022.125,-170.7686);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#74492A").ss(4,1,1).p("AFcC/QiXACjhjZQgBAAAAgBIgCgBQAAgBgBAAQiCh5hjgeQgrgMgrAA");
	this.shape_15.setTransform(-60.4,-170.7736);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#74492A").ss(4,1,1).p("AesC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAAs7C/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB1AgB6B3AIzC/QiaACjljcA+rBGQA5g5BJg5QDHi7DBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgC");
	this.shape_16.setTransform(656.325,-170.7686);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCAKgC/QiZACjmjcArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_17.setTransform(227.325,-170.7686);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#74492A").ss(4,1,1).p("AJyC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jGC7QiLCIhvA5");
	this.shape_18.setTransform(-46.4,-170.7686);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_19.setTransform(262.425,-170.7686);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#74492A").ss(4,1,1).p("AMWC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjAg1jHC7QjvDridAAApiC/QhUABhfhM");
	this.shape_20.setTransform(-27.75,-170.7686);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#74492A").ss(4,1,1).p("EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAEggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3AKgC/QiZACjmjc");
	this.shape_21.setTransform(1132.375,-170.7686);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#74492A").ss(4,1,1).p("AIzC/QiaACjljcAs7C/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB1AgB6B3AesC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAA+rBGQA5g5BJg5QDHi7DBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgC");
	this.shape_22.setTransform(724.825,-170.7686);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#74492A").ss(4,1,1).p("AOoC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jGC7QjvDricAAAunhnQApAbArAuAnQC/QiZACjmjc");
	this.shape_23.setTransform(-8.975,-170.7686);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#74492A").ss(4,1,1).p("EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCAKgC/QiZACjmjc");
	this.shape_24.setTransform(1165.775,-170.7686);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#74492A").ss(4,1,1).p("As7C/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB1AgB6B3AesC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAAIzC/QiaACjljcA+rBGQA5g5BJg5QDHi7DBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgC");
	this.shape_25.setTransform(758.225,-170.7686);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#74492A").ss(4,1,1).p("ARhC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDricAAAkYC/QiZACjmjcAxgicQBqgwBpAWQABAAABABQB2AgB6B3");
	this.shape_26.setTransform(6,-170.7686);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#74492A").ss(4,1,1).p("As7C/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB1AgB6B3A+rBGQA5g5BJg5QDHi7DBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgCAesC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAAIzC/QiaACjljc");
	this.shape_27.setTransform(774.925,-170.7686);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#74492A").ss(4,1,1).p("ASkC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjuDridAAAyjhCQAXgUAXgQQCWhvCVAfQABAAACABQB2AgB6B3AjUC/QiaACjljc");
	this.shape_28.setTransform(15.95,-170.7686);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#74492A").ss(4,1,1).p("AYVC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAACcC/QiZACjljcAzSC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCVAfQABAAABABQB2AgB6B3A4UAdQC7CkCDgC");
	this.shape_29.setTransform(29.125,-170.7686);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#74492A").ss(4,1,1).p("EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjcEggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3");
	this.shape_30.setTransform(1274.325,-170.7686);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#74492A").ss(4,1,1).p("AZHC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAAygC/QBgAACAhbQBPg4BZhYQAjghAigZQCXhvCVAfQABAAACABQB2AgB6B3ADOC/QiaACjkjcA5FhBQAkAmAAABIACABIABABQDiDZCXgC");
	this.shape_31.setTransform(65.95,-170.7686);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#74492A").ss(4,1,1).p("EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjcArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgC");
	this.shape_32.setTransform(1307.725,-170.7686);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#74492A").ss(4,1,1).p("A+rBGQA5g5BJg5QDHi7DBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgCAs7C/QBgAACAhbQBPg4BZhYQAjghAjgZQCWhvCVAfQABAAACABQB1AgB6B3AIzC/QiaACjljcAesC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAA");
	this.shape_33.setTransform(900.175,-170.7686);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#74492A").ss(4,1,1).p("AGIC/QiZACjmjcAcBC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAvmC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCVAfQABAAABABQB2AgB5B3A8AiwQBbgbBZAZQBkAeCBB5QABAAAAABIACABIABABQDiDZCXgC");
	this.shape_34.setTransform(80.675,-170.7686);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#74492A").ss(4,1,1).p("AKgC/QiZACjmjcEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgC");
	this.shape_35.setTransform(1349.475,-170.7686);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#74492A").ss(4,1,1).p("ADmhLQjGDGiCg+Qhmg2geAJ");
	this.shape_36.setTransform(-106.35,-163.1108);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4,p:{x:277}},{t:this.shape_3,p:{x:481.825}},{t:this.shape_2,p:{x:695.05}},{t:this.shape_1,p:{x:889.375}},{t:this.shape,p:{x:1208.025}}]}).to({state:[{t:this.shape_8},{t:this.shape_4,p:{x:293.7}},{t:this.shape_7,p:{x:498.525}},{t:this.shape_2,p:{x:711.75}},{t:this.shape_6,p:{x:906.075}},{t:this.shape,p:{x:1224.725}}]},3).to({state:[{t:this.shape_9},{t:this.shape_4,p:{x:343.8}},{t:this.shape_7,p:{x:548.625}},{t:this.shape_2,p:{x:761.85}},{t:this.shape_6,p:{x:956.175}},{t:this.shape,p:{x:1274.825}}]},4).to({state:[{t:this.shape_13},{t:this.shape_12,p:{x:-24.6}},{t:this.shape_11},{t:this.shape_4,p:{x:393.9}},{t:this.shape_7,p:{x:598.725}},{t:this.shape_2,p:{x:811.95}},{t:this.shape_10,p:{x:1006.275}},{t:this.shape,p:{x:1324.925}}]},4).to({state:[{t:this.shape_15},{t:this.shape_12,p:{x:-8.75}},{t:this.shape_10,p:{x:185.575}},{t:this.shape_4,p:{x:409.75}},{t:this.shape_7,p:{x:614.575}},{t:this.shape_2,p:{x:827.8}},{t:this.shape_14},{t:this.shape,p:{x:1340.775}}]},4).to({state:[{t:this.shape_18},{t:this.shape_12,p:{x:33}},{t:this.shape_17,p:{x:227.325}},{t:this.shape_4,p:{x:451.5}},{t:this.shape_16,p:{x:656.325}},{t:this.shape_2,p:{x:869.55}},{t:this.shape_1,p:{x:1063.875}},{t:this.shape,p:{x:1382.525}}]},4).to({state:[{t:this.shape_20},{t:this.shape_12,p:{x:68.1}},{t:this.shape_19},{t:this.shape_4,p:{x:486.6}},{t:this.shape_16,p:{x:691.425}},{t:this.shape_2,p:{x:904.65}},{t:this.shape_6,p:{x:1098.975}},{t:this.shape,p:{x:1417.625}}]},4).to({state:[{t:this.shape_23},{t:this.shape_12,p:{x:101.5}},{t:this.shape_6,p:{x:295.825}},{t:this.shape_4,p:{x:520}},{t:this.shape_22,p:{x:724.825}},{t:this.shape_2,p:{x:938.05}},{t:this.shape_21,p:{x:1132.375}},{t:this.shape,p:{x:1451.025}}]},4).to({state:[{t:this.shape_26},{t:this.shape_12,p:{x:134.9}},{t:this.shape_6,p:{x:329.225}},{t:this.shape_4,p:{x:553.4}},{t:this.shape_25},{t:this.shape_2,p:{x:971.45}},{t:this.shape_24,p:{x:1165.775}},{t:this.shape,p:{x:1484.425}}]},4).to({state:[{t:this.shape_28},{t:this.shape_12,p:{x:151.6}},{t:this.shape_10,p:{x:345.925}},{t:this.shape_4,p:{x:570.1}},{t:this.shape_27,p:{x:774.925}},{t:this.shape_2,p:{x:988.15}},{t:this.shape_24,p:{x:1182.475}},{t:this.shape,p:{x:1501.125}}]},4).to({state:[{t:this.shape_29},{t:this.shape_12,p:{x:201.7}},{t:this.shape_17,p:{x:396.025}},{t:this.shape_4,p:{x:620.2}},{t:this.shape_27,p:{x:825.025}},{t:this.shape_2,p:{x:1038.25}},{t:this.shape_21,p:{x:1232.575}},{t:this.shape,p:{x:1551.225}}]},4).to({state:[{t:this.shape_31},{t:this.shape_12,p:{x:243.45}},{t:this.shape_6,p:{x:437.775}},{t:this.shape_4,p:{x:661.95}},{t:this.shape_27,p:{x:866.775}},{t:this.shape_2,p:{x:1080}},{t:this.shape_30},{t:this.shape,p:{x:1592.975}}]},4).to({state:[{t:this.shape_34},{t:this.shape_12,p:{x:276.85}},{t:this.shape_6,p:{x:471.175}},{t:this.shape_4,p:{x:695.35}},{t:this.shape_33},{t:this.shape_2,p:{x:1113.4}},{t:this.shape_32},{t:this.shape,p:{x:1626.375}}]},4).to({state:[{t:this.shape_36},{t:this.shape_22,p:{x:105.375}},{t:this.shape_12,p:{x:318.6}},{t:this.shape_24,p:{x:512.925}},{t:this.shape_4,p:{x:737.1}},{t:this.shape_3,p:{x:941.925}},{t:this.shape_2,p:{x:1155.15}},{t:this.shape_35},{t:this.shape,p:{x:1668.125}}]},4).to({state:[{t:this.shape_29},{t:this.shape_12,p:{x:201.7}},{t:this.shape_17,p:{x:396.025}},{t:this.shape_4,p:{x:620.2}},{t:this.shape_27,p:{x:825.025}},{t:this.shape_2,p:{x:1038.25}},{t:this.shape_21,p:{x:1232.575}},{t:this.shape,p:{x:1551.225}}]},4).to({state:[{t:this.shape_23},{t:this.shape_12,p:{x:101.5}},{t:this.shape_6,p:{x:295.825}},{t:this.shape_4,p:{x:520}},{t:this.shape_22,p:{x:724.825}},{t:this.shape_2,p:{x:938.05}},{t:this.shape_21,p:{x:1132.375}},{t:this.shape,p:{x:1451.025}}]},3).wait(4));

	// Layer 2
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#DFF4FF").s().p("AgugTIBdAYIglAPg");
	this.shape_37.setTransform(-138.2,-183.4625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#583720").s().p("AhGAWIAVgOIA6ghIgBgBIABgBIABgBIABAAIAhgPQAKgFAUgDIABgBIgCAJQgCABADADQgFACgBADIgEALQgBAGADADIgUALIgBAAIgCADIgCAAIgBAAIhcA1QgegKAMgVg");
	this.shape_38.setTransform(-109.5714,-178.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AkgBjIgFgMQAOAJAogDIAKAAIALgBIAAgBQA0gCAlgLQBAgUA+gZQAogPA7gaIACgCIgBABIABABIg7AhQhAAcg3ATQhSAeg0AEIgXABQgiAAgRgIgACFATIgEgCIABAAIACgBIADgCQAaAKAfAGQgXgIgOgUQgDgCABgFIAEgMQABgDAFgBQgDgEACgBIACgJIgBABIAAgBQgQADgVgCQAAAAgBgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAdACAVgHIACgBIAGgDQAAAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAQAKgFAIgIIgNAAIgHAAQgUgCgUgIQAXAGAXABQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAABIAAgBIAPAAQAVABADgCQAXgDAKgLQgOAHgOgNQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAIABgBQgzgSgdAIQgdAHgKAGIgWAOIgSAMIgEADIg5ALQg6AJg4ALIhXAUQgeAGglAJIgCAAIADAAIA1gQIg8gvIAMACIA6AoIAbgGQBNgTAzgJIBngTIACABIAOgLQAIgGAjgPQAlgQAoAJQAiAIAbAMIACAAIABABIAAACIgBABQgBAFgIAEQArAUgOAeQgDAHgMACIgBAAIABACQADAIgIAEQgKAGgKgDQAKAMgUAHQgHADgFgCQgDAMgWgDIgPABQgcAAgcgRgACtAPQANAJAOAHIADABQAQABAGgJIAAAAIAAgBIAAAAQgdgQgagTIgGgHQgTARAcARgADlAVIgBACQAWgCgEgPQgVgTgcgRIgKgKQgdADANAUQAGAHAJAFQAXAMARAPIACgBIABAAgAD5AFIAAABQAggGgPgTQgHgNgRgLQgMgJgJgJIgOACQgHAKgLAFIADACQAjAWAUAZIABAAIABAAgAD9hCQgNAEgMABQAgASAOAbQAegHgWgWQgKgNgOgJIgFABgADxhVQAKADAJgBIgPgEIgDACIAAAAIgBAAg");
	this.shape_39.setTransform(-118.4515,-180.1731);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#C59064").s().p("AkeBbQgbgNAtgsQAGgIAPgMIACgBIACAAQAlgJAdgGIBYgUQA3gKA7gKIA4gLIAEgCIASgNIAWgOQAKgGAegHQAdgIAzASIgCABQAAAAgBABQAAAAAAAAQAAABAAAAQABABAAAAQAOANAOgHQgJAMgXACQgDADgWgCIgOAAIAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQgYgBgWgGQAUAJATABIAHABIANgBQgHAIgKAFQgBAAAAABQgBAAAAABQgBAAAAAAQAAAAgBAAIgFADIgCABQgVAHgdgCQgBABAAAAQAAAAABAAQAAABAAAAQAAAAABAAQAVACAQgDIAAABQgVADgJAFIgiAPIAAAAIgBABIgDACQg7AagoAPQg+AZhAAUQgkALg0ACIgBABIgKACIgLAAIgSAAQgZAAgKgHgADSAkIgEgBQgNgGgNgKQgcgSATgQIAFAIQAbASAdAQIAAABIgBAAIABAAQgGAIgNAAIgDAAgACOASIATgLQAPAUAXAHQgfgFgagLgADsAaQgBgBAAAAQgBAAAAAAQgBAAAAABQAAAAAAAAQgRgOgXgMQgJgGgGgHQgOgUAegDIAJALQAcARAVASQAFAPgWACIABgBgACNASIABAAIgEACIADgCgACOASgAEAAKIgDAAQgTgagkgVIgCgDQALgEAHgLIANgCQAJAKANAIQAQALAHANQAPATgfAGgADqg5QAMgBANgDIAGgBQANAIALANQAVAWgeAHQgNgbghgSg");
	this.shape_40.setTransform(-119.104,-180.6);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgBArQASgJAJgIQAMgKgCgMQgBgMgJgFIgPgKIgTgMIgQgJIgDgDIADAAQARADAYAKIAMAGQAUAKAHALIACAEIAAAKIgBADQgEAMgSAKIgKAEIgXAHIgPAFIAMgFgAg4AtIgBAAIAIgCIAEgCIAPgGQASgJAMgCIAIgCQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAEgDABIgGACIgSADIgSAGIgMADIgDAAIgFABIgBgBg");
	this.shape_41.setTransform(-147.9,-237.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#C59064").s().p("AgcArIASgGIASgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBIgIACQgNACgRAJIgPAGIgEAAIAZhVIAQAJIATAMIAPAKQAIAFACAMQABAMgLAKQgJAIgTAJg");
	this.shape_42.setTransform(-148.591,-237.725);

	this.instance = new lib.sdrntm_1();
	this.instance.parent = this;
	this.instance.setTransform(-156.6,-242.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#501C1E").s().p("AAAAAIABAAIAAAAIAAAAIgBAAg");
	this.shape_43.setTransform(-140.675,-223.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgzALQghgEgfgUQAUAFAeAEQAeAEAnAAQAmgBAZgCQAYgDAZgHQABACgTAKQgSAIgMADQgNACgiACIgTAAQgZAAgcgDg");
	this.shape_44.setTransform(-149.6195,-224.1295);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#874F2E").s().p("AiJE+QAchHhsgnQhvgogfgmIADgHQBfA/BjAlQBiAkCsAMQg6AQggAaQgrAagpAAQglAAgigVgAnXBNIgBgGQAHACALgDQAUgFASgDIAMAHIAAgBQgRgjg5AAQgBAAgBABQgBAAAAAAQAAAAAAAAQAAABABAAQALAFAPAFIAXAKIgLACIgCAAQgIADgJABQgJABgDAFIgCACQgKgDgMgKQgPgOAAgMQAAgNAPgEQAJgDASAAQAgAAAUAcQAQAUAAARQAAARgwAAQgPAAgGgPgAHGh7QARAEANAEQARATAMAWIgJANQgSgggggegAGeibIgVgOQgrgag0gTQgngOg5gIQhBgGgggFQhqgPg3gzQABgNgCgMQBcBbDGgUQA5AjBCAeQA3AZAmAeQgQgFgTgDg");
	this.shape_45.setTransform(-177.125,-236.4966);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#C59064").s().p("AiQD1Qhjglhgg/IACgHQABgGgGADIgFAEQgPAHgUADQhaAOgqg7Qgrg+A8gzQAMgKARACQBmAMADBDQAAAFAEgCQAMgGAEgIQA4AagCgjQAHgBADgEQAPgKgRgKQAOgIAJgJQAFgGgEgEQgQgUgagPQAUgJgEgOQAJgCALgJQA0goAEg2QAKgCAOgLIAHgFQAOALAhgKQBHgWAPg0QAEgOABgOQA1A0BsAPQAgAEBBAHQA4AIAnANQA1AUArAaQgFABgSAHQgUAIAMARIAvAFQAZADAUAFQAfAdASAgQgJAPgDAQQgJApAQApQAtB1iBA8QheAjhwADQg7ACgqADQirgMhigkgAEMCuQAtAOApgQIAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgrALgngIIAAABgAngAiQgPAFAAAMQAAAMAQAOQAMAKAKADIgBABIADABIABAHQAHAPAPAAQAvAAAAgRQAAgRgPgVQgUgbghAAQgRAAgKACgAFoBCQAQAPATABQAUABANgFQAOgEAIgEQAJgDAKgKQAYgXAAghQAAgggYgXIgCgCQgXgWggAAIgBAAQgiAAgYAYQgOANgGARQgZgKgQgEIgDAAIABADIABABQADAAANAJIAVAMIAPAJQAHAFACANQACAMgLAKQgHAGgMAGIgWAKIAZgIIANgFQAEAGAQAPgAgBhoQgjAfAAAsQAAArAjAfQAiAfAyAAQAzAAAjgfQATgRAJgVQAGgPABgRIAAgEQAAgsgjgfQgjgegzAAQgyAAgiAegAE2AiQgOACgRAJQgVAKgHAAIACAAQAAACAGgCIADAAIAegJIATgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBgBIgIACgABnibQAcACAqAGIAuAGQAVgNgPgMIgRgOQgDAIgFAEIgJgCIAAgBIgHAAIg9gEQgbgDgkABQglABgaAFQgZAEgVAHIA2gBQA6ACAoAEgAIUgxIABABIgBABIAAgCgAGtiGIgHgBIgBAAIgJAAQgDgFACgHIAUAOIgCgBg");
	this.shape_46.setTransform(-178.8726,-238.625);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#372F2F").s().p("AmcEEQgEgHgHgHQgsgthJgHQgLACgJAEQgGgVgEgYQgCgNAMgJQAggVgSgPIgPAGIgCgMQgCgKALgIQAfgYgTgQQgKAFgJAHQgEgYAKgVQAphcCYgLQAxgEgqgKQgVABgWACIgPACQgSgKgagFIAcgKQCBg0CQAXIABAAIACACIABgBQAGAAgEgDQANgWAYgTQBhhICPANIhQA4IgFABQgIABAAAGIABAAIgBABIADABIAOgCQBBgDA4ALQgmAEgjAKIgBABQAtALA/gLQCCgWBXA6QAhAXAWAXQg0gRg+ACIgNACIgKgCIgFAAIAHADIgaAGQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABIA2AFQAjARAqAQQCkA+guBeQgRgVgigXQgNACAJAIQAhAbANAYIgCABIADABQAgA/hpAsQABgfgEgSIAHgGIABgBIgBgBQgKgLgJgIQgKgQgRgQQgTgRgYgKQhogthQg2IADAAIgBgCIgGAAQhHgxg0g7QgPAiAwAkQAcAUAgAUQjHAGhfhiQgIgSgPgPQgBAAAAABQgBAAgBAAQAAAAAAAAQAAABAAAAIAAABQgFABACAFIAIAOQALAwgSAyQgRAwhFAAIAXgVQAXgXgSgPQgRAFgHAMQgSAcggAUQgEgNgJgJQgWAcABAnQABAvg2AVQgHADADAEIABADIgRAWIgRgJQgBABgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAEAdA3ATIgKAHQgLAGgEAGQgRgRgVgPQgXgRgPgFQABAGARASQATATASAKIASAMIAAAFQgBAEgDAEQgEAEAAAFIgfgLg");
	this.shape_47.setTransform(-172.0588,-261.8425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("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");
	this.shape_48.setTransform(-173.8817,-247.7474);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgCgBgBgDQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQAqgDA7gCQBwgDBegjQCBg8gth1QgQgpAJgqQADgQAJgPIAKgMQgMgWgSgSQgNgFgQgDQgUgFgZgDIgvgFQgMgRAUgIQASgHAFgBQgCAHADAFIAJAAIABAAIAHABIACABQATACARAFQgmgeg3gZQhCgdg5gjQjHAThchbQADAMgBANQgBAOgEAOQgPA0hHAWQghAKgOgLIgHAFQgOALgKACQgEA2g0AnQgLAJgJACQAEAOgUAJQAaAPAQAUQAEAEgFAGQgJAKgOAIQARAKgPAKQgDAEgHABQACAjg4gaQgEAIgMAGQgEACAAgFQgDhEhmgMQgRgCgMAKQg8A0ArA+QAqA7BagOQAUgDAPgHIAFgEQAGgDgBAGIgCAHIgDAGQAgAnBuAoQBtAmgdBIgAHrAOIAFANIAHgGIABgBIgBgBQgKgLgJgIIAHAOg");
	this.shape_49.setTransform(-173.8817,-247.7474);

	this.instance_1 = new lib.rt7copy2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-156.55,-241.15,0.7934,0.5254);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AAAAFIAAgJIABAJg");
	this.shape_50.setTransform(-155.9,-160.2);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#261E1E").s().p("AAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIAAABg");
	this.shape_51.setTransform(-211.7386,-194.425);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#35BAD6").s().p("AAiA7IgGgBIgagIIhbgYQAXgyAugmIARADQBSAYAGAIIAFAGIAAACQgDAJABADQgaA8gEAHIAAABIgCACIgBABgAgSg/IAAAAIABAAIgBAAg");
	this.shape_52.setTransform(-210.025,-188.05);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#246662").s().p("AgsAbIgRgDIACAAIABgBIABABIABgBQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAgBAAIAAAAQATgOAVgRQAVgTAzgbIACgCIAFgCIgJAbIgIAxQgIALAIAeQgGgIhSgYg");
	this.shape_53.setTransform(-205.95,-196.775);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AAKBmIgcgJIghgKIg3gOIADgHQAQgfAXgZIAdgeIAVgUQAQgPApgbQAogaAUgGIAEAAIgCAGQgBAAAAAAIACAAIgBABIgBAAIABAAIAAABIgFACIgCABQg0AcgVATQgVASgTAOIAAAAIgBAAIgBABQguAlgYAzIBbAYIAbAIIAGABIAVAFIAAgBIADgCIAAgBQAEgHAag9QgCgDADgJIABgCIACACIABgDIAAABIABADIABABIAAACIACAGIgZBOQACAAACAFQAAAFgGAGIg/gRgABkhuIADAAIgBgBIgBAAIgBABgABnh1IABAAIgBgBIAAAAg");
	this.shape_54.setTransform(-210.3,-191.55);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#C59064").s().p("AAeDvIgXgHQgpgPgnhvQgXi1ANhIQAMhJAKgTIB0AjIABgDIAgAJIghBeIgJAWQggBOgHBLIgCAJQAAACAMAHQAfAWAVAZQAGAMgQAHQgGADgDgBQgCgBgFgBQgFgBgNgKIgFgCQgLgIgCgGIAAAEQAGAXAKASQALATAGAHIACADQAOAMgIAHQgxgbgRgyQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAKA2A6AZIACAGQAEAKgRAAIgHgBg");
	this.shape_55.setTransform(-212.388,-160.4346);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#35BAD6").s().p("AhFAFIgBgCIgCAAIACgBIAAAAQAPgLAIgSIB4gLIgZBLIgBACg");
	this.shape_56.setTransform(-211.575,-184.9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgID0QgZgMgUgsQgVgrgGgaQgfjpAnhsQAHgSASgRIAIAAQgIASgPANIAAAAIgCABIACAAIABABQgKATgMBJQgNBIAXC1QAnBvApAPIAXAHQAYACgEgLIgCgGQg6gZgKg2QAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQARAyAxAbQAIgHgOgMIgCgDQgGgHgLgTQgKgSgGgXIAAgEQACAGALAIIAFACQANAKAFABQAFABACABQADABAGgDQAQgHgGgMQgVgZgfgWQgMgHAAgCIACgJQAHhMAghNIAJgWIAhheIAHABQg9CqgWBpIA0AqQAXAVgQAPQgHAFgLAAQgHgBgIgEQgFgBgFgGIgIgFIAAABQAEAOANAUQANAUACABIADAFIAEAKQADAHgGADQAEANgMAEIgMABQgUgBgYgNg");
	this.shape_57.setTransform(-212.3816,-161.925);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgCgBgBgDQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQirgMhigkQhjglhgg/IgDAGQAgAnBuAoQBtAmgdBIg");
	this.shape_58.setTransform(-173.8817,-247.7474);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#AA7F64").s().p("AnPBEQAGgWAKgWQANAWAwAJQAiAGA/AAQA1AABXgNQgHAWgIAWQAFADACgDQABAAAAAAQAAAAAAAAQAAAAAAABQAAABgBABQg+AThKABIgIAAQhoAAg6gvgAA6AyQgXgHABgUQABgPARgDIA1gJQAUAPBKAJQA+AIBBAAQBRAAAWgGQALgCAVgJQAAANgHAPQgJAPgVAFQhUAThTAAQhlAAhkgcgAAzgwIADgBIgDgCIgCgBIAAAAIAAABQghgGgKgOIAegRIADgCIAAADQABAAABAAQAAAAABgBQAAAAAAAAQAAAAABgBIAAgDQAbgPAdgHQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAAAQAAAEAQATIgFAHQgFAHAAADQAAANAMAFQAHAEARABQAPABAGADQgCAHAHAHIgBABIgmADQgzADgXAQQAGgXgHgTg");
	this.shape_59.setTransform(-189.5,-81.8711);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#F8E8D9").s().p("AmKBPQgwgKgNgVIANgZQAOgaAhgPQAAABAJgEQgIADABgBIAVgIQCCgnBEBIIAFAIIABAAIAAgBQAPATACAVIgFASQhYAOg1AAQg/AAgigGgADBArQhJgJgVgQQBxgVBqgiQAgAAAcAIQBRAUgDAsQgWAIgLADQgVAFhRAAQhCAAg+gIgAlAgyIgRACQAHgIAEgLQAIgPAXgBQBogEgHBBQgsgYhOgEg");
	this.shape_60.setTransform(-188.7196,-84.2116);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("Ah3A7QAZg9htgMQgMABgMAEQgsAOALAcQgXAEgUAKIgGAEIAHgNQAXgaAEgTIAFgDIABAAQgHgHgNABIAAgBQAEgYAigMQB+guBOBFQAiAegVAVQgXgVgggPIAAABQgIAAgEAEIAAABQAMAUATAKQgfAbABAYQgJgHgKgGgADRA5QgSgBgHgDQgMgFABgNQAAgEAEgGIAFgIQgPgRgBgEQAAgBABAAQAAgBAAgBQAAAAABgBQAAAAAAgBQAxgOA1AIIAAAEIABgBIABgDQATADATAFQgIALAFANIgEgDIgCADQgbgFgfACIgDAAIgEACIgLAFQgFADgCAEIAAABQAJADAJgCQAfgHAggCQgBADAAADIgEAAQgfADgTAOQgNAJgCAJQgFgDgPgCg");
	this.shape_61.setTransform(-196.45,-92.429);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#C59064").s().p("ABYhvIAHgBIAIgBIADAAIAPgDIgTACIAAgZQADACAFABQBNAUBLgFQgGAggzAQIAAABQAMgCAKgDQggBfAFBhQgYgEgcADQgvAFgoAOIgQAHQAMiCAfh5gACHh3IAEgBIAAgBgAkEA+QARgtANgwQAOgxASgqQBDATBNACQhCBegDBlQgtgjhcADg");
	this.shape_62.setTransform(-189.6,-106.55);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#B09B61").s().p("Al7BtQCGiYA4ilQAEACAHAAIBiACQgjAngbAqQgDgogFgnIgBAAQgMAvAPAoQgpBAgXBDQgLAlgSAjQgUAnAIAgQAehLAahNQASg5Alg0IAAABIABgBIAAgBQALgRAOgQQAdgkALggQC1ADC1gBQACBnAuBkQAQAlAJAmQAHAgAOAbQgYAMgcAMQiGA7iTgrQACgxAMgvQAHgbALgaQANgfABgaQAXACAcgKIgBgBQgbAEgXgCIAAgHIgDAGQgXgDgWgKIgBAAQARARAaADQgeA+gOBEQgNA4AKAzIgGABIABgEIgCAEQgqADgoAAQjfAAhrhkg");
	this.shape_63.setTransform(-184.1,-138.5914);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#35BAD6").s().p("AjFCZIgOgBQAAgxAPhUQgBh3gGg6QAlAOApAJQBCAOAvABICHABQAoAAADgDQA4BgARBNQAJANAFBfIhhAAQi0AAitgGgAj4iIIAAgCIgEgIQACACADABIACABIgDALg");
	this.shape_64.setTransform(-181.575,-175.8039);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#246662").s().p("AATBTQgugBhBgOQgqgJglgOIgTgHIAAgBIgDgMIgCgFIgCgMIABgEIABgXQARgyBsgNIAAgBIADAAIACAAQARAoBdgMQA4gHAKgUIAKACQgBgCAPAGQANAGAjAUIgSAEQgNAJgKAaIgZgcIgCACIAaAgIAJAJIABACIAZAjIAAABIAMAWIACADIAIAOQgDADgoAAIiIgBg");
	this.shape_65.setTransform(-184.8,-196.2);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AlgKnQgugHgogQQgjgPAEgTIAFAEQgDhEBVgxQANgpATgTQgIAAgJgDQgFgbAagSQAggXAxgCIADAAQAChhA8hZQg5gQg1gcQghgRAJgTIgCgBQB5iiBDivIABgDIAPiDQgCiRgHglIATAIQAGA5ABB5QgPBTAAAyIAOABQDaAHDogCQgFhegJgOQgRhOg4hfIgIgOIgCgEIgMgVIgBgBIgYgjIgCgCIgJgLIgagfIADgCIAYAcIAIAJIATAZIAAABIgJgLIALARIAEAFIADADIA9BWQAQAagCgHQAXAxAGAgQANA9AGAoQACAQADAJIACAYIgJAAIABAEIAOBEQAPBHAfBUQAfBVAEAdQgOAMgYALQhCAehIAGQAHAfgsANQgOBegLBkQAWAEARALIAAAAIABABIADACIAAABIgBAAQAIALgLAPIABAAIAAABIgCAAIgBAAIgBABIABAFQAbABARAPIAAABQgZgJgVAAIgDADIgBABIgEgEQgiABgVAZQgGAHABAJIAAAAQA6gHA0gTQAWgIAWgGQCIAGAIBJQABAJgBALQgCAQgRALQgrAdhBADQirAIiGg2QgEgBAAgFQgDgYAQgPQgIgXALgYQgoACgIgXIgBABIgCgBIACgEIAAgCQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAABAAIAAABQAOgPAUgLQgKg8AThAQAUhDAVhAQhGALg/gBQABAHgKANQggAqgKAvQgIAtgRAqQAaAUAKAiQAIAcgogEIAGgDIgOgDQAAAIgCAJQAhBAglA8QgEASgRAPIgBABIAdgKQgQAJgRAHIAAABQg2AWhEAAQgjAAgmgGgAmxIwIgMAZQgKAWgGAWQA8AxBugCQBKgBA+gTQAAgBAAgBQABgBAAAAQAAAAAAAAQAAAAgBAAQgCADgGgDQAJgWAHgWIAFgTQgBgVgPgSIgBAAIgBABIgEgJQhEhJiDAnIgUAIQgBACAHgDQgJAEABgCQghAPgPAbgABtIsIg1AKQgRADgBAPQgBAUAXAHQC2A0C6grQAVgFAIgPQAIgPAAgNQADgshQgVQgdgHgfAAQhrAhhwAXgAiYIgQAJALAFANQAFgaAAgbQgHAOgMAPgAA0H9IAEACIgDABQAGATgFAXQAXgQAygDIAngDIADAAIgCgBQgHgHACgHQABgIANgJQATgPAfgCIAEAAQAAgEACgDQghACgeAHQgKADgJgDIAAgCQACgEAFgDIALgFIAEgBIADAAQAfgDAbAGIADgDIADACQgEgNAHgMQgTgFgTgDIgBAEIgBAAIAAgEQg1gHgwAOQgdAHgbAPIgBADQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAIAAgDIgDACIgfARQALAOAhAGIAAgBIAAAAIABABgAi6IDQAKAGAIAHQgBgZAfgbQgTgKgMgUIAAgCQAFgEAHAAIAAAAQAgAQAXAUQAWgVgjgeQhOhFh+AtQgiANgEAYIAAAAQANAAAHAGIgBABIgFACQgEAVgXAZIgHANIAGgDQAUgKAXgEQgLgcAtgQQALgEAMAAQBtALgYA/gAi8ICQAHhBhpAEQgXABgHAQQgFAKgGAJIARgCQBOADAsAYgABrDIIgDAAIgIABIgHACQggB6gLCBIAPgGQApgPAvgEQAcgEAYAFQgFhhAghgQgKADgNABIAAAAQA0gQAFghQhKAGhNgVQgFgBgDgCIAAAZIATgCIgPADgAh6GYQAChmBCheQhMgChDgTQgSAqgOAxQgNAygSAsIAQAAQBRAAApAggAlDBnQB+B2EegVIACgEIgCAEIAHgBQgKgzAMg4QAPhEAdg+QgZgDgSgRIACAAQAVAKAYADIADgGIAAAHQAXACAbgEIAAABQgcAKgWgCQgCAagNAfQgLAagGAbQgMAvgCAxQCTArCGg7QAcgMAYgMQgOgbgIggQgIgmgQgkQguhlgChnQi2ABi0gDQgMAggdAkQgNAQgLARIAAABIgBABIAAgBQglA0gTA5QgZBNgfBLQgHggAUgnQASgjALglQAXhDAphAQgPgoAMgvIABAAQAFAnADAoQAbgqAjgnIhigCQgHAAgFgCQg4CliFCYgADdojIABABIgBgCgACMDBIAAAAIgFACgAinn9IADgMIgCgBQABgQAGgFIABgCQAHgIADgUIACALIABAGQgDgEgDANQgMAqgDAAQAAAAAAAAQgBAAAAgBQAAgBAAAAQAAgBAAgBgAi0oUQgagaAZAWQAEADAGAJQgFgCgEgGgAiSpaQABgtA4gNQAwgLAWgCIgBgFIAEADIgEgJIANAAIACADIgCAAIAAALQBNApBNgsQgCgFABgGIARAAQAAAFAEAFIACAAQADABAOADQAKABAzAiIgPADQgjgUgNgGQgPgGABACIgKgCQgKATg4AIQheALgQgnIgCAAIgDAAIAAABQhtANgQAyIAAgBg");
	this.shape_66.setTransform(-189.6705,-137.986);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#DFF4FF").s().p("AgzgVIgEgDIBvAjIgXALIgRADg");
	this.shape_67.setTransform(-138.3625,-183.5875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#583720").s().p("AhIASIAWgOIA8geIAAAAIABgBIABgBIAAAAIAigOQAKgEAVgCIAAAAQgBAGgBACQgCABADAEQgFABgBADIgFALQgBAGACADIgUAKIgBAAIgDABIgBABIAAAAIgBAAIhgAwQgdgMANgTg");
	this.shape_68.setTransform(-109.1512,-176.425);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#C59064").s().p("AjuBYQgWAAghgOQgWgQAwgqQAHgHAPgJIACgBIACAAIBDgNIBYgOQA5gHA7gGIA5gIIAEgCIASgLIAXgNQAKgFAegFQAegGAyAUIgCABQAAABAAAAQgBAAAAABQAAAAABAAQAAABAAAAQANAPAPgHQgKALgYABQgDACgWgCIgOgBIAAABQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAAAAAABQgXgDgWgHQATAJATADIAAAAIAHABIANAAQgIAIgKAEIgEACIgFACIgCABQgWAGgcgDQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAABAAQAUAEAQgCIAAABQgUACgKAEIgiANIgBAAIgBABIgCAAQg9AYg0ARQg1ARg6AQQg4APgvgCIACAAIgIABIgKAAgADRAwIgDgBQgNgHgNgKQgagVATgOIAFAGQAaAWAcASIAAAAIgBABIAAAAQgFAHgLAAIgGgBgACOAaIAVgLQANAWAWAJQgegIgagMgADsAnQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAABQgQgQgWgPQgJgGgGgFQgMgVAegCIAIALQAbASAVAVQADAPgWABIABgCgACOAZIAAABIgEACIAEgDgACOAagAEBAYIgCAAQgTgbgigXIgCgCQALgFAIgKIANAAQAJAJAMAKQAQALAGANQAOAUggAFgADvgrQANAAANgDIAFgBQANAKAKANQAUAYgeAEQgMgbgggUg");
	this.shape_69.setTransform(-118.8222,-179.1662);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AknBUIgDgNQAhAOAWAAIASAAIgCgBQAvACA4gPQA6gQA1gRQA0gRA9gXIACgBIgBABIABABIg9AdQhBAYg5AQQhTAZg4ACIgNAAQgsAAgSgLgADNAwQgkAEgigYIgEgCIABAAIABgBIAAAAIAEgCQAaAMAeAIQgWgJgNgWQgDgCABgGIAFgKQABgDAGgBQgDgFABgBQACgCABgGIgBABIAAgBQgQACgUgEQgBAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAcADAWgGIACgBIAFgCIAEgCQAKgEAIgIIgNAAIgHgBIAAAAQgTgDgTgJQAWAHAXADQAAAAAAgBQABAAAAAAQAAAAABAAQAAABABAAIAAgBIAOABQAWACADgCQAYgBAKgLQgPAHgNgPQAAAAAAAAQgBgBAAAAQAAAAABgBQAAAAAAgBIACgBQgygUgeAGQgeAFgKAFIgXANIgSALIgEACIg5AIQg7AGg5AHIhYAOIhDANIgCAAIAygNQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABgBIg8gzIAGABIBEAvIASgDIAMgDQBNgOA0gGIBpgMIABAAIAPgJQAIgGAkgNQAmgNAnALQAiAKAaANIACABIABAAIAAACIgBABQgCAGgHADQApAXgQAdQgDAGgMAAIgBAAIABADQACAIgIAEQgLAFgJgDQAJANgVAGQgHACgFgCQgDAJgLAAIgLgCgACvAbQANAKANAHIADABQAQACAGgIIAAAAIABgBIAAAAQgcgSgagVIgFgHQgTAOAaAVgADnAkIgBACQAWgBgDgPQgVgVgbgSIgIgLQgeACAMAVQAGAFAJAGQAWAPAQAQIABgBIACAAgAD8AVIAAABQAggFgOgTQgGgOgQgLQgMgKgJgJIgNAAQgIAKgLAFIACACQAiAXATAbIABAAIABAAgAEEgxQgNADgNAAQAgAUAMAbQAegEgUgYQgKgNgNgKIgFABgAEMhCIgOgFIgDACIgBAAQAJADAJAAIAAAAg");
	this.shape_70.setTransform(-118.3124,-178.8969);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#DFF4FF").s().p("AAcA0IhRhjIgBAAQgOgPAfAPIAFgMIBUBRIgFACQAMAQAAAJQAAAGgIADIgIACIgPgIg");
	this.shape_71.setTransform(-142.6716,-184.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#583720").s().p("AAaAZIgEAAIgEgBIhqgWQgHgYAbgGIAcADQAmAGAQAEIAMADQATAEATAHQALADAPAJIgIAEQgCAAgDAFQgEgCgEABQgJACgEADQgHACgBADg");
	this.shape_72.setTransform(-124.1315,-159.775);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#C59064").s().p("ACWCeIABgBIgBAAQAOgegBgjIABgDQAMAEAOgDIAJAHQgDALAAANQgCARgJAOQgGAMgLAAQgIAAgKgGgAC5CfQAUgagBgfIAUALQAAABAAAAQAAABABAAQAAAAABABQABAAAAAAQgBAOgGAPQgGASgOAAQgGAAgJgEgAB4CdIADgBQgBgBAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAGgVAAgXQgBgIADgHQANgWAUAQQgDAFgCAHQAAAcgIAaQgGAHgHAAQgGAAgIgGgABhCTIgCgDQgCgNADgNQACgdAbABIgDAHQgEAdAAAdIgCAAIAAAAIgDABQgKAAgGgJgABLBdIAXAEIAAABQgLAWAFASQgMgWgFgXgADTBmQgEgBgLgOIgJgIIgBAAQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQgNgPgIgRQAEARAKANIAAAAIADAFIAHAHQgLABgLgDQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBIgGgBIgCgBQgTgIgQgTQAAAAAAAAQAAAAAAABQAAAAAAAAQABABAAAAQAJAOAMAIIgBAAQgPgJgLgEQgUgHgSgEIgMgDQgSgEgmgGQAUACATAEIhHgbQg9gVg5gaQg4gbgXgXQgMgIgKgOQAFgFgDgEIAGAEIAAgCIgBgDQgCgGAGgUIAFgKIAGgQIAJgDIAHACIAEAAQASACAPADQAAABAAAAQAAAAAAAAQAAAAABABQAAAAAAAAIAVgJIASAXIgDgBIgBgBIACACIABABIABAAIABABIAAAAIABABIAdASIAQAJIAJAFIA2AhIBWA4IArAbIAFAAIAWAEIAbAFQALABAaAOQAYAMAMArIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgFARAQADIgFAAQgPAAgNgKg");
	this.shape_73.setTransform(-129.1,-166.5875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("ACjDJQgMgDgDgHQgHANgSgHQgHgDAAgFQgOAIgKgRQgagRAAgjIAAgEIAEAAIAEABQAEAXANAWQgGgTALgVIAAgBQABgDAHgDQAEgCAJgCQAEgCAEADQADgGACAAIAIgDIABAAQgMgJgJgNQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAAAABgBQAPATATAJIACAAIAGACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABgBQALAEAMgBIgHgHIgEgGIAAAAQgKgMgDgRQAHAQANAQQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABIABAAIAJAIQALAOAEABQAPALATgCQgRgDAGgRQAAAAAAgBQABAAAAAAQAAAAABgBQAAAAABABIABAAQgMgrgYgMQgagOgKgCIgcgEIgWgEIgEAAIgsgdIhWg2Ig2giIgJgEIgQgJIgdgSIgBgBIAAgBIgBAAIgBAAIgBgBIgBgCIAAAAIADABIgSgWIgBgBIABABQgkgigUgjIANABIABAAIBRBkIAQAIIAaARIgEgDQBFAjAnAcQAnAYAnAaIABACIATACQAKAAAkAMQAlANAOAeQANAaAEAXIAAABIAAABIgBACIgCAAQgHADgIgCQAGAmgmALQgJADgIgHIgBAAIgDACQgEAFgHAAIgEAAgACiB8QAAAigOAeIABABIgBAAQAYAQALgVQAJgOACgRQABgNACgLIgIgHQgOADgMgEIgBADgAC3C/QAaANAJgcQAGgOACgOQgBAAgBgBQAAAAgBAAQAAgBgBAAQAAgBAAAAIgUgMQABAggUAagAB5C7IgCABQAPANAMgNQAHgaAAgcQACgHADgFQgUgQgNAWQgCAGAAAJQAAAXgFAUIAAAAIADABgABeCVQgCAOABANIACADQAIAJAMgBIAAgBIABAAQAAgcAEgdIADgHIgCAAQgYAAgDAbgADyCMIgDgMIgFAAIgBgBQADAGAGAHgAAHBKQhBgVgzgWQhNgfgjggQgkgiAMAAQAKAOANAIQAWAXA5AaQA4AaA+AVIBGAbQgTgDgTgCgAhEhUIABAAIAAABg");
	this.shape_74.setTransform(-128.9157,-169.75);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#DFF4FF").s().p("AhPBWQgSgJgBgOIABgIQABgDAGgEIABAAIAJAEIgJgEQAWALAMADIAEABIAKADQARADARACQgDAHgIAGQgMAJgPAAQgSAAgQgHgAgVhcIB3AkIgXAKIgeAGg");
	this.shape_75.setTransform(-142.6,-178.1625);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#C59064").s().p("AjiBVQgoAAgsgPQAEgKAxgqQAGgHAQgKIABgBIACAAIBDgMIBZgOQA4gHA7gGIA5gIIAEgCIATgLIAXgNQAKgFAegFQAdgGAyAUIgBABQgBABAAAAQAAABAAAAQAAAAAAABQAAAAABAAQANAPAOgHQgKALgXABQgDACgWgCIgOgBIgBABQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAABgBAAQgXgDgWgHQAUAJATADIgBAAIAIABIANAAQgIAIgKAEIgEACIgGACIgCABQgVAGgdgDQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAQAVAEAQgCIAAABQgVACgKAEIgiAMIAAAAIgBABIgDABQg8AYgqANQg/AVhBAQQglAJg0gBIAAAAIgLABIgKAAgADbAyIgEgBQgNgHgMgKQgbgVAUgOIAFAGQAZAWAcASIAAAAIAAABIAAAAQgFAHgLAAIgGgBgACYAcIAUgLQANAWAXAJQgfgIgZgMgAD1ApQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAgBAAQgQgQgWgPQgJgGgFgFQgMgVAdgCIAJALQAbASAUAVQAEAPgXABIABgCgACXAbIABABIgEACIADgDgACYAcgAELAaIgDAAQgSgbgigXIgDgCQAMgFAHgKIAOAAQAJAJAMAKQAPALAHANQANAUgfAFgAD5gpQAMAAANgDIAGgBQANAKAKANQAUAXgfAFQgLgbgggUgAj0gvIAtAnIggAIg");
	this.shape_76.setTransform(-119.779,-180.8429);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AjhBeIgEAAIgFgBQgQgCgRgDIgKgDIgFgBQgMgDgVgLIAJAEIgCgJQAsAQAogBIAKABIALgBIAAAAQA0AAAlgJQBBgQA/gUQAqgOA8gWIADgBIgBABIAAAAIg9AeQhBAYg5AQQhTAYg0ACIgDAAIgWgBgADdAxQgjADgigXIgEgDIABAAIAAAAIABgBIAEgCQAZANAfAHQgXgJgNgVQgCgDABgGIAFgKQABgDAFgBQgDgEACgBQABgCABgGIAAAAIAAAAQgQABgVgDQAAAAAAgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAdAEAVgGIACgBIAGgDIAEgBQAKgFAIgHIgNgBIgIgBIABAAQgTgCgUgJQAWAGAXADQAAAAABAAQAAgBABAAQAAAAAAABQABAAAAAAIABAAIAOAAQAWADADgDQAXgBAKgLQgOAHgNgOQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAIABgBQgygVgdAGQgeAGgKAFIgXANIgTALIgEACIg5AHQg7AGg4AIIhZAOIhDAMIgCAAIADAAIAggIIgtgoIgcgXIAIgCIAOAHIBEA0IAegGIANgCQBNgPA0gGIBogMIACABIAPgKQAHgFAlgOQAlgNAoAMQAiAJAaAOIABAAIABABIABACIgBABQgCAFgIAEQApAWgPAdQgEAGgLABIgBAAIAAACQADAIgJAFQgKAFgKgDQAJANgUAGQgHACgGgDQgCAJgMAAIgLgBgADAAbQAMAKANAIIAEABQAPACAHgIIAAgBIAAAAIAAgBQgcgSgZgUIgFgHQgUAOAbAUgAD3AlIgBABQAXAAgEgQQgUgVgbgRIgJgLQgdABAMAVQAFAGAJAGQAWAOAQAQIACAAIABAAgAENAWIAAAAQAfgEgNgUQgHgNgPgMQgMgJgJgKIgOABQgHAKgMAEIADACQAiAYASAbIACgBIABABgAEUgxQgNADgMAAQAgAUALAbQAfgEgUgYQgKgNgNgKIgGABgAEdhBIgPgGIgDADIgBAAQAKADAJAAIAAAAg");
	this.shape_77.setTransform(-119.9624,-180.3691);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("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");
	this.shape_78.setTransform(-189.6705,-137.986);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#C59064").s().p("AgcArIASgGIASgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBIgIACQgNACgRAJIgPAGIgEAAIAZhVIAQAJIATAMIAPAKQAIAFACAMQABAMgLAKQgJAIgTAJg");
	this.shape_79.setTransform(-148.591,-237.725);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgBArQASgJAJgIQAMgKgCgMQgBgMgJgFIgPgKIgTgMIgQgJIgDgDIADAAQARADAYAKIAMAGQAUAKAHALIACAEIAAAKIgBADQgEAMgSAKIgKAEIgXAHIgPAFIAMgFgAg4AtIgBAAIAIgCIAEgCIAPgGQASgJAMgCIAIgCQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAEgDABIgGACIgSADIgSAGIgMADIgDAAIgFABIgBgBg");
	this.shape_80.setTransform(-147.9,-237.625);

	this.instance_2 = new lib.sdrntm_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-156.6,-242.35);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#501C1E").s().p("AAAAAIABAAIAAAAIAAAAIgBAAg");
	this.shape_81.setTransform(-140.675,-223.85);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgzALQghgEgfgUQAUAFAeAEQAeAEAnAAQAmgBAZgCQAYgDAZgHQABACgTAKQgSAIgMADQgNACgiACIgTAAQgZAAgcgDg");
	this.shape_82.setTransform(-149.6195,-224.1295);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#874F2E").s().p("AiJE+QAchHhsgnQhvgogfgmIADgHQBfA/BjAlQBiAkCsAMQg6AQggAaQgrAagpAAQglAAgigVgAnXBNIgBgGQAHACALgDQAUgFASgDIAMAHIAAgBQgRgjg5AAQgBAAgBABQgBAAAAAAQAAAAAAAAQAAABABAAQALAFAPAFIAXAKIgLACIgCAAQgIADgJABQgJABgDAFIgCACQgKgDgMgKQgPgOAAgMQAAgNAPgEQAJgDASAAQAgAAAUAcQAQAUAAARQAAARgwAAQgPAAgGgPgAHGh7QARAEANAEQARATAMAWIgJANQgSgggggegAGeibIgVgOQgrgag0gTQgngOg5gIQhBgGgggFQhqgPg3gzQABgNgCgMQBcBbDGgUQA5AjBCAeQA3AZAmAeQgQgFgTgDg");
	this.shape_83.setTransform(-177.125,-236.4966);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#C59064").s().p("AiQD1Qhjglhgg/IACgHQABgGgGADIgFAEQgPAHgUADQhaAOgqg7Qgrg+A8gzQAMgKARACQBmAMADBDQAAAFAEgCQAMgGAEgIQA4AagCgjQAHgBADgEQAPgKgRgKQAOgIAJgJQAFgGgEgEQgQgUgagPQAUgJgEgOQAJgCALgJQA0goAEg2QAKgCAOgLIAHgFQAOALAhgKQBHgWAPg0QAEgOABgOQA1A0BsAPQAgAEBBAHQA4AIAnANQA1AUArAaQgFABgSAHQgUAIAMARIAvAFQAZADAUAFQAfAdASAgQgJAPgDAQQgJApAQApQAtB1iBA8QheAjhwADQg7ACgqADQirgMhigkgAEMCuQAtAOApgQIAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgrALgngIIAAABgAngAiQgPAFAAAMQAAAMAQAOQAMAKAKADIgBABIADABIABAHQAHAPAPAAQAvAAAAgRQAAgRgPgVQgUgbghAAQgRAAgKACgAFoBCQAQAPATABQAUABANgFQAOgEAIgEQAJgDAKgKQAYgXAAghQAAgggYgXIgCgCQgXgWggAAIgBAAQgiAAgYAYQgOANgGARQgZgKgQgEIgDAAIABADIABABQADAAANAJIAVAMIAPAJQAHAFACANQACAMgLAKQgHAGgMAGIgWAKIAZgIIANgFQAEAGAQAPgAgBhoQgjAfAAAsQAAArAjAfQAiAfAyAAQAzAAAjgfQATgRAJgVQAGgPABgRIAAgEQAAgsgjgfQgjgegzAAQgyAAgiAegAE2AiQgOACgRAJQgVAKgHAAIACAAQAAACAGgCIADAAIAegJIATgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBgBIgIACgABnibQAcACAqAGIAuAGQAVgNgPgMIgRgOQgDAIgFAEIgJgCIAAgBIgHAAIg9gEQgbgDgkABQglABgaAFQgZAEgVAHIA2gBQA6ACAoAEgAIUgxIABABIgBABIAAgCgAGtiGIgHgBIgBAAIgJAAQgDgFACgHIAUAOIgCgBg");
	this.shape_84.setTransform(-178.8726,-238.625);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("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");
	this.shape_85.setTransform(-173.8817,-247.7474);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#372F2F").s().p("AmcEEQgEgHgHgHQgsgthJgHQgLACgJAEQgGgVgEgYQgCgNAMgJQAggVgSgPIgPAGIgCgMQgCgKALgIQAfgYgTgQQgKAFgJAHQgEgYAKgVQAphcCYgLQAxgEgqgKQgVABgWACIgPACQgSgKgagFIAcgKQCBg0CQAXIABAAIACACIABgBQAGAAgEgDQANgWAYgTQBhhICPANIhQA4IgFABQgIABAAAGIABAAIgBABIADABIAOgCQBBgDA4ALQgmAEgjAKIgBABQAtALA/gLQCCgWBXA6QAhAXAWAXQg0gRg+ACIgNACIgKgCIgFAAIAHADIgaAGQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABIA2AFQAjARAqAQQCkA+guBeQgRgVgigXQgNACAJAIQAhAbANAYIgCABIADABQAgA/hpAsQABgfgEgSIAHgGIABgBIgBgBQgKgLgJgIQgKgQgRgQQgTgRgYgKQhogthQg2IADAAIgBgCIgGAAQhHgxg0g7QgPAiAwAkQAcAUAgAUQjHAGhfhiQgIgSgPgPQgBAAAAABQgBAAgBAAQAAAAAAAAQAAABAAAAIAAABQgFABACAFIAIAOQALAwgSAyQgRAwhFAAIAXgVQAXgXgSgPQgRAFgHAMQgSAcggAUQgEgNgJgJQgWAcABAnQABAvg2AVQgHADADAEIABADIgRAWIgRgJQgBABgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAEAdA3ATIgKAHQgLAGgEAGQgRgRgVgPQgXgRgPgFQABAGARASQATATASAKIASAMIAAAFQgBAEgDAEQgEAEAAAFIgfgLg");
	this.shape_86.setTransform(-172.0588,-261.8425);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgCgBgBgDQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQAqgDA7gCQBwgDBegjQCBg8gth1QgQgpAJgqQADgQAJgPIAKgMQgMgWgSgSQgNgFgQgDQgUgFgZgDIgvgFQgMgRAUgIQASgHAFgBQgCAHADAFIAJAAIABAAIAHABIACABQATACARAFQgmgeg3gZQhCgdg5gjQjHAThchbQADAMgBANQgBAOgEAOQgPA0hHAWQghAKgOgLIgHAFQgOALgKACQgEA2g0AnQgLAJgJACQAEAOgUAJQAaAPAQAUQAEAEgFAGQgJAKgOAIQARAKgPAKQgDAEgHABQACAjg4gaQgEAIgMAGQgEACAAgFQgDhEhmgMQgRgCgMAKQg8A0ArA+QAqA7BagOQAUgDAPgHIAFgEQAGgDgBAGIgCAHIgDAGQAgAnBuAoQBtAmgdBIgAHrAOIAFANIAHgGIABgBIgBgBQgKgLgJgIIAHAOg");
	this.shape_87.setTransform(-173.8817,-247.7474);

	this.instance_3 = new lib.rt7copy2();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-156.55,-241.15,0.7934,0.5254);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AAAAFIAAgJIABAJg");
	this.shape_88.setTransform(-155.9,-160.2);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#261E1E").s().p("AAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIAAABg");
	this.shape_89.setTransform(-211.7386,-194.425);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#35BAD6").s().p("AAiA7IgGgBIgagIIhbgYQAXgyAugmIARADQBSAYAGAIIAFAGIAAACQgDAJABADQgaA8gEAHIAAABIgCACIgBABgAgSg/IAAAAIABAAIgBAAg");
	this.shape_90.setTransform(-210.025,-188.05);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#246662").s().p("AgsAbIgRgDIACAAIABgBIABABIABgBQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAgBAAIAAAAQATgOAVgRQAVgTAzgbIACgCIAFgCIgJAbIgIAxQgIALAIAeQgGgIhSgYg");
	this.shape_91.setTransform(-205.95,-196.775);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AAKBmIgcgJIghgKIg3gOIADgHQAQgfAXgZIAdgeIAVgUQAQgPApgbQAogaAUgGIAEAAIgCAGQgBAAAAAAIACAAIgBABIgBAAIABAAIAAABIgFACIgCABQg0AcgVATQgVASgTAOIAAAAIgBAAIgBABQguAlgYAzIBbAYIAbAIIAGABIAVAFIAAgBIADgCIAAgBQAEgHAag9QgCgDADgJIABgCIACACIABgDIAAABIABADIABABIAAACIACAGIgZBOQACAAACAFQAAAFgGAGIg/gRgABkhuIADAAIgBgBIgBAAIgBABgABnh1IABAAIgBgBIAAAAg");
	this.shape_92.setTransform(-210.3,-191.55);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#C59064").s().p("AAeDvIgXgHQgpgPgnhvQgXi1ANhIQAMhJAKgTIB0AjIABgDIAgAJIghBeIgJAWQggBOgHBLIgCAJQAAACAMAHQAfAWAVAZQAGAMgQAHQgGADgDgBQgCgBgFgBQgFgBgNgKIgFgCQgLgIgCgGIAAAEQAGAXAKASQALATAGAHIACADQAOAMgIAHQgxgbgRgyQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAKA2A6AZIACAGQAEAKgRAAIgHgBg");
	this.shape_93.setTransform(-212.388,-160.4346);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#35BAD6").s().p("AhFAFIgBgCIgCAAIACgBIAAAAQAPgLAIgSIB4gLIgZBLIgBACg");
	this.shape_94.setTransform(-211.575,-184.9);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgID0QgZgMgUgsQgVgrgGgaQgfjpAnhsQAHgSASgRIAIAAQgIASgPANIAAAAIgCABIACAAIABABQgKATgMBJQgNBIAXC1QAnBvApAPIAXAHQAYACgEgLIgCgGQg6gZgKg2QAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQARAyAxAbQAIgHgOgMIgCgDQgGgHgLgTQgKgSgGgXIAAgEQACAGALAIIAFACQANAKAFABQAFABACABQADABAGgDQAQgHgGgMQgVgZgfgWQgMgHAAgCIACgJQAHhMAghNIAJgWIAhheIAHABQg9CqgWBpIA0AqQAXAVgQAPQgHAFgLAAQgHgBgIgEQgFgBgFgGIgIgFIAAABQAEAOANAUQANAUACABIADAFIAEAKQADAHgGADQAEANgMAEIgMABQgUgBgYgNg");
	this.shape_95.setTransform(-212.3816,-161.925);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgCgBgBgDQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQirgMhigkQhjglhgg/IgDAGQAgAnBuAoQBtAmgdBIg");
	this.shape_96.setTransform(-173.8817,-247.7474);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#AA7F64").s().p("AnPBEQAGgWAKgWQANAWAwAJQAiAGA/AAQA1AABXgNQgHAWgIAWQAFADACgDQABAAAAAAQAAAAAAAAQAAAAAAABQAAABgBABQg+AThKABIgIAAQhoAAg6gvgAA6AyQgXgHABgUQABgPARgDIA1gJQAUAPBKAJQA+AIBBAAQBRAAAWgGQALgCAVgJQAAANgHAPQgJAPgVAFQhUAThTAAQhlAAhkgcgAAzgwIADgBIgDgCIgCgBIAAAAIAAABQghgGgKgOIAegRIADgCIAAADQABAAABAAQAAAAABgBQAAAAAAAAQAAAAABgBIAAgDQAbgPAdgHQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAAAQAAAEAQATIgFAHQgFAHAAADQAAANAMAFQAHAEARABQAPABAGADQgCAHAHAHIgBABIgmADQgzADgXAQQAGgXgHgTg");
	this.shape_97.setTransform(-189.5,-81.8711);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#F8E8D9").s().p("AmKBPQgwgKgNgVIANgZQAOgaAhgPQAAABAJgEQgIADABgBIAVgIQCCgnBEBIIAFAIIABAAIAAgBQAPATACAVIgFASQhYAOg1AAQg/AAgigGgADBArQhJgJgVgQQBxgVBqgiQAgAAAcAIQBRAUgDAsQgWAIgLADQgVAFhRAAQhCAAg+gIgAlAgyIgRACQAHgIAEgLQAIgPAXgBQBogEgHBBQgsgYhOgEg");
	this.shape_98.setTransform(-188.7196,-84.2116);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("Ah3A7QAZg9htgMQgMABgMAEQgsAOALAcQgXAEgUAKIgGAEIAHgNQAXgaAEgTIAFgDIABAAQgHgHgNABIAAgBQAEgYAigMQB+guBOBFQAiAegVAVQgXgVgggPIAAABQgIAAgEAEIAAABQAMAUATAKQgfAbABAYQgJgHgKgGgADRA5QgSgBgHgDQgMgFABgNQAAgEAEgGIAFgIQgPgRgBgEQAAgBABAAQAAgBAAgBQAAAAABgBQAAAAAAgBQAxgOA1AIIAAAEIABgBIABgDQATADATAFQgIALAFANIgEgDIgCADQgbgFgfACIgDAAIgEACIgLAFQgFADgCAEIAAABQAJADAJgCQAfgHAggCQgBADAAADIgEAAQgfADgTAOQgNAJgCAJQgFgDgPgCg");
	this.shape_99.setTransform(-196.45,-92.429);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#C59064").s().p("ABYhvIAHgBIAIgBIADAAIAPgDIgTACIAAgZQADACAFABQBNAUBLgFQgGAggzAQIAAABQAMgCAKgDQggBfAFBhQgYgEgcADQgvAFgoAOIgQAHQAMiCAfh5gACHh3IAEgBIAAgBgAkEA+QARgtANgwQAOgxASgqQBDATBNACQhCBegDBlQgtgjhcADg");
	this.shape_100.setTransform(-189.6,-106.55);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#B09B61").s().p("Al7BtQCGiYA4ilQAEACAHAAIBiACQgjAngbAqQgDgogFgnIgBAAQgMAvAPAoQgpBAgXBDQgLAlgSAjQgUAnAIAgQAehLAahNQASg5Alg0IAAABIABgBIAAgBQALgRAOgQQAdgkALggQC1ADC1gBQACBnAuBkQAQAlAJAmQAHAgAOAbQgYAMgcAMQiGA7iTgrQACgxAMgvQAHgbALgaQANgfABgaQAXACAcgKIgBgBQgbAEgXgCIAAgHIgDAGQgXgDgWgKIgBAAQARARAaADQgeA+gOBEQgNA4AKAzIgGABIABgEIgCAEQgqADgoAAQjfAAhrhkg");
	this.shape_101.setTransform(-184.1,-138.5914);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#35BAD6").s().p("AjFCZIgOgBQAAgxAPhUQgBh3gGg6QAlAOApAJQBCAOAvABICHABQAoAAADgDQA4BgARBNQAJANAFBfIhhAAQi0AAitgGgAj4iIIAAgCIgEgIQACACADABIACABIgDALg");
	this.shape_102.setTransform(-181.575,-175.8039);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#246662").s().p("AATBTQgugBhBgOQgqgJglgOIgTgHIAAgBIgDgMIgCgFIgCgMIABgEIABgXQARgyBsgNIAAgBIADAAIACAAQARAoBdgMQA4gHAKgUIAKACQgBgCAPAGQANAGAjAUIgSAEQgNAJgKAaIgZgcIgCACIAaAgIAJAJIABACIAZAjIAAABIAMAWIACADIAIAOQgDADgoAAIiIgBg");
	this.shape_103.setTransform(-184.8,-196.2);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#DFF4FF").s().p("AhJBTQgPgGAAgKQAAgGADgBIAEgBQAmAOAlACIgJAGQgOAHgSAAQgOAAgMgFgAgbhXIB0AcIgWAMIgeAJg");
	this.shape_104.setTransform(-142.225,-178.425);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#583720").s().p("AhGAXIAVgQIA6ghIAAAAIABgBIAAgBIABAAIAhgQQAJgFAVgDIAAAAQAAAGgCACQgBABADAEQgFABgBAEIgFALQAAAFADADIgUAMIgBgBIgDADIgBAAIAAABIgBAAIhcA1QgegKAMgUg");
	this.shape_105.setTransform(-109.4843,-179.975);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AjnBrQgkgCgngNIgBgBIAGgDQAkAJAogDIAKAAIALgCIAAAAQA0gDAlgLQA/gUA+gZQApgQA7gaIACgBIgBABIABAAIg7AhQhAAdg4ATQhRAeg0AFIgPABIgQgBgACTASIgFgCIABAAIABgBIABAAIADgCQAbAKAfAGQgYgIgOgUQgDgCABgFIAEgLQABgEAGgBQgEgEACgBQABgCABgGIgBAAIAAAAQgQACgUgCQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAdABAVgHIACgBIAGgDQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAKgFAIgIIgNAAIgHAAQgUgCgUgHQAXAFAXABQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIAAgBIAOAAQAXABACgDQAYgCAJgMQgOAIgOgNQAAAAAAgBQAAAAgBgBQAAAAABAAQAAgBAAAAIABgCQgzgRgdAIQgeAIgJAFIgWAPIgSAMIgEACIg4ALQg7AKg4ALQgeAGg5AOIhCAQIgCAAIACgBIAsgNIgIACIhBg2IAMAAIABABIBBAxIAegIIAMgDQBMgUAzgJIBogTIABAAIAPgKQAHgGAjgQQAlgQAoAJQAjAIAaAMIACAAIABAAIABACIgBABQgCAGgHAEQAqAUgNAeQgDAHgMABIgBAAIABADQADAHgIAEQgLAGgJgCQAKAMgVAHQgGADgGgCQgCAMgXgDIgPABQgbAAgcgRgAC6AOQAOAJANAHIAEABQAPABAGgJIAAAAIABgBIAAAAQgdgQgbgTIgGgGQgSAQAbARgADzAUIgBACQAWgCgEgQQgWgSgcgRIgKgKQgdADANAVQAGAGAKAFQAXAMARAPIACgBIABAAgAEHAEIAAAAQAfgFgOgUQgIgNgQgKQgNgJgJgJIgOACQgHAKgLAFIADACQAjAVAVAaIABAAIABAAgAEKhDQgNAEgMABQAhASANAbQAegHgVgXQgLgMgOgJIgFABgAD/hWQAJADAJgBIgOgEIgDACIAAAAIgBAAg");
	this.shape_106.setTransform(-119.7373,-181.6894);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#C59064").s().p("AkuBcQgFgOAugsQAGgHAOgMIACgBIACAAIBCgQQA5gOAegGQA4gLA7gKIA4gLIAEgCIASgMIAWgPQAJgFAegIQAdgIAzARIgBACQgBAAAAABQAAAAAAAAQAAABAAAAQABABAAAAQAOANAOgIQgJAMgYACQgCADgXgBIgOAAIAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQgXgBgXgFQAUAHAUACIAHAAIANAAQgIAIgKAFQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAIgGADIgCABQgVAHgdgBQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAABAAQAUACAQgCIAAAAQgUADgKAFIghAQIAAAAIgBABIgCABQg7AagpAQQg+AZg/AUQglALg0ADIAAAAIgLACIgKAAIgUABQgdAAgbgHgADYAjIgEgBQgNgHgOgJQgbgSASgPIAGAGQAbATAdAQIAAAAIgBABIAAAAQgFAIgNAAIgDAAgACTARIAUgMQAOAUAYAIQgfgGgbgKgADyAYQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAQgRgPgXgMQgKgFgGgGQgNgVAdgDIAKAKQAcARAWASQAEAQgWACIABgCgACTAQIAAABIgDACIADgDgACTARgAjJABIAIgBIgsANgAEGAIIgCAAQgVgagjgVIgDgCQALgFAHgKIAOgCQAJAJANAJQAQAKAIANQAOATgfAGgADwg6QAMgBANgEIAFgBQAOAJALAMQAVAXgeAHQgNgbghgSg");
	this.shape_107.setTransform(-119.6056,-182.0905);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#DFF4FF").s().p("AAqA2Qgigwg7g5IgCgBQgmgUA4AVIAFgNIBRBOIAIAFQAKAJAAANQAAAQgLAIIgQgLg");
	this.shape_108.setTransform(-142.8582,-184.5375);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#C59064").s().p("ACbCeIABgBIgBAAQAOgegBgjIABgDQAMAEAOgDIAJAHQgDALAAANQgCARgJAOQgGAMgLAAQgIAAgKgGgAC+CfQAUgagBgfIAUALQAAABAAAAQAAABABAAQAAAAABABQABAAAAAAQgBAOgGAPQgGASgOAAQgGAAgJgEgAB9CdIADgBQgBgBAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAGgVAAgXQgBgIADgHQANgWAUAQQgDAFgCAHQAAAcgIAaQgGAHgHAAQgGAAgIgGgABmCTIgCgDQgCgNADgNQACgdAbABIgDAHQgEAdAAAdIgCAAIAAAAIgDABQgKAAgGgJgABQBdIAXAEIAAABQgLAWAFASQgMgWgFgXgADYBmQgEgBgLgOIgJgIIgBAAQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQgNgPgIgRQAEARAKANIAAAAIADAFIAHAHQgLABgLgDQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBIgGgBIgCgBQgTgIgQgTQAAAAAAAAQAAAAAAABQAAAAAAAAQABABAAAAQAJAOAMAIIgBAAQgPgJgLgEQgUgHgSgEIgMgDQgSgEgmgGQAUACATAEIhHgbQg9gVg5gaQg4gbgXgXQgMgIgUgRQAPgCgDgEIAGAEIAAgCIgBgDQgCgGAGgUIAFgKIAGgQIAJgDIAHACIAEAAQASACAPADQAAABAAAAQAAAAAAAAQAAAAABABQAAAAAAAAIAVgJIAXASQAKAIABAEIgBgBIAFADIgCgBIgRgHIgBgBIgDgBIAEADQAKAHAkAVIAJAFIA2AhIBWA4IArAbIAFAAIAWAEIAbAFQALABAaAOQAYAMAMArIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgFARAQADIgFAAQgPAAgNgKg");
	this.shape_109.setTransform(-129.6,-166.5875);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("ACnDJQgMgDgDgHQgHANgSgHQgHgDgBgFQgOAIgJgRQgagRAAgjIAAgEIADAAIAEABQAFAXAMAWQgGgTAMgVIAAgBQAAgDAIgDQAEgCAIgCQAFgCAEADQACgGADAAIAIgDIAAAAQgLgJgJgNQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAQATATAJIACAAIAGACQAAAAAAAAQABABAAAAQABAAAAAAQABAAABgBQALAEALgBIgHgHIgEgGIABAAQgKgMgEgRQAHAQANAQQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAABIABAAIAJAIQALAOAFABQAPALASgCQgQgDAFgRQABAAAAgBQAAAAABAAQAAAAAAgBQABAAAAABIACAAQgNgrgXgMQgagOgLgCIgbgEIgWgEIgFAAIgrgdIhXg2Ig2giIgJgEQgkgVgKgIIgDgDIACABIACABIARAIIACABIgFgDIABAAQgBgDgKgIIABgBQg9gzgTgjIAMAAIABABQA8A6AiAwIARALIAMAIIgDgDQBDAjApAcQAnAYAmAaIABACIAUACQAJAAAlAMQAkANAPAeQAMAaAEAXIABABIAAABIgCACIgCAAQgGADgJgCQAGAmgmALQgJADgIgHIgBAAIgCACQgFAFgGAAIgEAAgAClB8QAAAigOAeIACABIgBAAQAYAQALgVQAJgOABgRQABgNADgLIgJgHQgOADgMgEIgBADgAC7C/QAaANAJgcQAGgOABgOQAAAAgBgBQgBAAAAAAQgBgBAAAAQAAgBgBAAIgUgMQACAggUAagAB8C7IgCABQAPANAMgNQAHgaABgcQABgHAEgFQgVgQgMAWQgDAGAAAJQAAAXgFAUIABAAIACABgABhCVQgCAOABANIACADQAIAJAMgBIAAgBIACAAQgBgcAFgdIACgHIgBAAQgZAAgDAbgAD1CMIgDgMIgEAAIgBgBQADAGAFAHgAAKBKQhAgVg0gWQhNgfgjggQgjgiABgDQAVARAMAIQAWAXA5AaQA5AaA9AVIBHAbQgTgDgUgCgAhAhUIAAAAIAAABg");
	this.shape_110.setTransform(-129.278,-169.75);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("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");
	this.shape_111.setTransform(-189.6705,-137.986);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#C59064").s().p("AgcArIASgGIASgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBIgIACQgNACgRAJIgPAGIgEAAIAZhVIAQAJIATAMIAPAKQAIAFACAMQABAMgLAKQgJAIgTAJg");
	this.shape_112.setTransform(-148.591,-237.725);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AgBArQASgJAJgIQAMgKgCgMQgBgMgJgFIgPgKIgTgMIgQgJIgDgDIADAAQARADAYAKIAMAGQAUAKAHALIACAEIAAAKIgBADQgEAMgSAKIgKAEIgXAHIgPAFIAMgFgAg4AtIgBAAIAIgCIAEgCIAPgGQASgJAMgCIAIgCQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAEgDABIgGACIgSADIgSAGIgMADIgDAAIgFABIgBgBg");
	this.shape_113.setTransform(-147.9,-237.625);

	this.instance_4 = new lib.sdrntm_1();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-156.6,-242.35);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#501C1E").s().p("AAAAAIABAAIAAAAIAAAAIgBAAg");
	this.shape_114.setTransform(-140.675,-223.85);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AgzALQghgEgfgUQAUAFAeAEQAeAEAnAAQAmgBAZgCQAYgDAZgHQABACgTAKQgSAIgMADQgNACgiACIgTAAQgZAAgcgDg");
	this.shape_115.setTransform(-149.6195,-224.1295);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#874F2E").s().p("AiJE+QAchHhsgnQhvgogfgmIADgHQBfA/BjAlQBiAkCsAMQg6AQggAaQgrAagpAAQglAAgigVgAnXBNIgBgGQAHACALgDQAUgFASgDIAMAHIAAgBQgRgjg5AAQgBAAgBABQgBAAAAAAQAAAAAAAAQAAABABAAQALAFAPAFIAXAKIgLACIgCAAQgIADgJABQgJABgDAFIgCACQgKgDgMgKQgPgOAAgMQAAgNAPgEQAJgDASAAQAgAAAUAcQAQAUAAARQAAARgwAAQgPAAgGgPgAHGh7QARAEANAEQARATAMAWIgJANQgSgggggegAGeibIgVgOQgrgag0gTQgngOg5gIQhBgGgggFQhqgPg3gzQABgNgCgMQBcBbDGgUQA5AjBCAeQA3AZAmAeQgQgFgTgDg");
	this.shape_116.setTransform(-177.125,-236.4966);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#C59064").s().p("AiQD1Qhjglhgg/IACgHQABgGgGADIgFAEQgPAHgUADQhaAOgqg7Qgrg+A8gzQAMgKARACQBmAMADBDQAAAFAEgCQAMgGAEgIQA4AagCgjQAHgBADgEQAPgKgRgKQAOgIAJgJQAFgGgEgEQgQgUgagPQAUgJgEgOQAJgCALgJQA0goAEg2QAKgCAOgLIAHgFQAOALAhgKQBHgWAPg0QAEgOABgOQA1A0BsAPQAgAEBBAHQA4AIAnANQA1AUArAaQgFABgSAHQgUAIAMARIAvAFQAZADAUAFQAfAdASAgQgJAPgDAQQgJApAQApQAtB1iBA8QheAjhwADQg7ACgqADQirgMhigkgAEMCuQAtAOApgQIAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgrALgngIIAAABgAngAiQgPAFAAAMQAAAMAQAOQAMAKAKADIgBABIADABIABAHQAHAPAPAAQAvAAAAgRQAAgRgPgVQgUgbghAAQgRAAgKACgAFoBCQAQAPATABQAUABANgFQAOgEAIgEQAJgDAKgKQAYgXAAghQAAgggYgXIgCgCQgXgWggAAIgBAAQgiAAgYAYQgOANgGARQgZgKgQgEIgDAAIABADIABABQADAAANAJIAVAMIAPAJQAHAFACANQACAMgLAKQgHAGgMAGIgWAKIAZgIIANgFQAEAGAQAPgAgBhoQgjAfAAAsQAAArAjAfQAiAfAyAAQAzAAAjgfQATgRAJgVQAGgPABgRIAAgEQAAgsgjgfQgjgegzAAQgyAAgiAegAE2AiQgOACgRAJQgVAKgHAAIACAAQAAACAGgCIADAAIAegJIATgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBgBIgIACgABnibQAcACAqAGIAuAGQAVgNgPgMIgRgOQgDAIgFAEIgJgCIAAgBIgHAAIg9gEQgbgDgkABQglABgaAFQgZAEgVAHIA2gBQA6ACAoAEgAIUgxIABABIgBABIAAgCgAGtiGIgHgBIgBAAIgJAAQgDgFACgHIAUAOIgCgBg");
	this.shape_117.setTransform(-178.8726,-238.625);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("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");
	this.shape_118.setTransform(-173.8817,-247.7474);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#372F2F").s().p("AmcEEQgEgHgHgHQgsgthJgHQgLACgJAEQgGgVgEgYQgCgNAMgJQAggVgSgPIgPAGIgCgMQgCgKALgIQAfgYgTgQQgKAFgJAHQgEgYAKgVQAphcCYgLQAxgEgqgKQgVABgWACIgPACQgSgKgagFIAcgKQCBg0CQAXIABAAIACACIABgBQAGAAgEgDQANgWAYgTQBhhICPANIhQA4IgFABQgIABAAAGIABAAIgBABIADABIAOgCQBBgDA4ALQgmAEgjAKIgBABQAtALA/gLQCCgWBXA6QAhAXAWAXQg0gRg+ACIgNACIgKgCIgFAAIAHADIgaAGQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABIA2AFQAjARAqAQQCkA+guBeQgRgVgigXQgNACAJAIQAhAbANAYIgCABIADABQAgA/hpAsQABgfgEgSIAHgGIABgBIgBgBQgKgLgJgIQgKgQgRgQQgTgRgYgKQhogthQg2IADAAIgBgCIgGAAQhHgxg0g7QgPAiAwAkQAcAUAgAUQjHAGhfhiQgIgSgPgPQgBAAAAABQgBAAgBAAQAAAAAAAAQAAABAAAAIAAABQgFABACAFIAIAOQALAwgSAyQgRAwhFAAIAXgVQAXgXgSgPQgRAFgHAMQgSAcggAUQgEgNgJgJQgWAcABAnQABAvg2AVQgHADADAEIABADIgRAWIgRgJQgBABgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAEAdA3ATIgKAHQgLAGgEAGQgRgRgVgPQgXgRgPgFQABAGARASQATATASAKIASAMIAAAFQgBAEgDAEQgEAEAAAFIgfgLg");
	this.shape_119.setTransform(-172.0588,-261.8425);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgCgBgBgDQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQAqgDA7gCQBwgDBegjQCBg8gth1QgQgpAJgqQADgQAJgPIAKgMQgMgWgSgSQgNgFgQgDQgUgFgZgDIgvgFQgMgRAUgIQASgHAFgBQgCAHADAFIAJAAIABAAIAHABIACABQATACARAFQgmgeg3gZQhCgdg5gjQjHAThchbQADAMgBANQgBAOgEAOQgPA0hHAWQghAKgOgLIgHAFQgOALgKACQgEA2g0AnQgLAJgJACQAEAOgUAJQAaAPAQAUQAEAEgFAGQgJAKgOAIQARAKgPAKQgDAEgHABQACAjg4gaQgEAIgMAGQgEACAAgFQgDhEhmgMQgRgCgMAKQg8A0ArA+QAqA7BagOQAUgDAPgHIAFgEQAGgDgBAGIgCAHIgDAGQAgAnBuAoQBtAmgdBIgAHrAOIAFANIAHgGIABgBIgBgBQgKgLgJgIIAHAOg");
	this.shape_120.setTransform(-173.8817,-247.7474);

	this.instance_5 = new lib.rt7copy2();
	this.instance_5.parent = this;
	this.instance_5.setTransform(-156.55,-241.15,0.7934,0.5254);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("AAAAFIAAgJIABAJg");
	this.shape_121.setTransform(-155.9,-160.2);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#261E1E").s().p("AAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIAAABg");
	this.shape_122.setTransform(-211.7386,-194.425);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#35BAD6").s().p("AAiA7IgGgBIgagIIhbgYQAXgyAugmIARADQBSAYAGAIIAFAGIAAACQgDAJABADQgaA8gEAHIAAABIgCACIgBABgAgSg/IAAAAIABAAIgBAAg");
	this.shape_123.setTransform(-210.025,-188.05);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#246662").s().p("AgsAbIgRgDIACAAIABgBIABABIABgBQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAgBAAIAAAAQATgOAVgRQAVgTAzgbIACgCIAFgCIgJAbIgIAxQgIALAIAeQgGgIhSgYg");
	this.shape_124.setTransform(-205.95,-196.775);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AAKBmIgcgJIghgKIg3gOIADgHQAQgfAXgZIAdgeIAVgUQAQgPApgbQAogaAUgGIAEAAIgCAGQgBAAAAAAIACAAIgBABIgBAAIABAAIAAABIgFACIgCABQg0AcgVATQgVASgTAOIAAAAIgBAAIgBABQguAlgYAzIBbAYIAbAIIAGABIAVAFIAAgBIADgCIAAgBQAEgHAag9QgCgDADgJIABgCIACACIABgDIAAABIABADIABABIAAACIACAGIgZBOQACAAACAFQAAAFgGAGIg/gRgABkhuIADAAIgBgBIgBAAIgBABgABnh1IABAAIgBgBIAAAAg");
	this.shape_125.setTransform(-210.3,-191.55);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#35BAD6").s().p("AhFAFIgBgCIgCAAIACgBIAAAAQAPgLAIgSIB4gLIgZBLIgBACg");
	this.shape_126.setTransform(-211.575,-184.9);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AgID0QgZgMgUgsQgVgrgGgaQgfjpAnhsQAHgSASgRIAIAAQgIASgPANIAAAAIgCABIACAAIABABQgKATgMBJQgNBIAXC1QAnBvApAPIAXAHQAYACgEgLIgCgGQg6gZgKg2QAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQARAyAxAbQAIgHgOgMIgCgDQgGgHgLgTQgKgSgGgXIAAgEQACAGALAIIAFACQANAKAFABQAFABACABQADABAGgDQAQgHgGgMQgVgZgfgWQgMgHAAgCIACgJQAHhMAghNIAJgWIAhheIAHABQg9CqgWBpIA0AqQAXAVgQAPQgHAFgLAAQgHgBgIgEQgFgBgFgGIgIgFIAAABQAEAOANAUQANAUACABIADAFIAEAKQADAHgGADQAEANgMAEIgMABQgUgBgYgNg");
	this.shape_127.setTransform(-212.3816,-161.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#C59064").s().p("AAeDvIgXgHQgpgPgnhvQgXi1ANhIQAMhJAKgTIB0AjIABgDIAgAJIghBeIgJAWQggBOgHBLIgCAJQAAACAMAHQAfAWAVAZQAGAMgQAHQgGADgDgBQgCgBgFgBQgFgBgNgKIgFgCQgLgIgCgGIAAAEQAGAXAKASQALATAGAHIACADQAOAMgIAHQgxgbgRgyQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAKA2A6AZIACAGQAEAKgRAAIgHgBg");
	this.shape_128.setTransform(-212.388,-160.4346);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgCgBgBgDQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQirgMhigkQhjglhgg/IgDAGQAgAnBuAoQBtAmgdBIg");
	this.shape_129.setTransform(-173.8817,-247.7474);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#AA7F64").s().p("AnPBEQAGgWAKgWQANAWAwAJQAiAGA/AAQA1AABXgNQgHAWgIAWQAFADACgDQABAAAAAAQAAAAAAAAQAAAAAAABQAAABgBABQg+AThKABIgIAAQhoAAg6gvgAA6AyQgXgHABgUQABgPARgDIA1gJQAUAPBKAJQA+AIBBAAQBRAAAWgGQALgCAVgJQAAANgHAPQgJAPgVAFQhUAThTAAQhlAAhkgcgAAzgwIADgBIgDgCIgCgBIAAAAIAAABQghgGgKgOIAegRIADgCIAAADQABAAABAAQAAAAABgBQAAAAAAAAQAAAAABgBIAAgDQAbgPAdgHQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAAAQAAAEAQATIgFAHQgFAHAAADQAAANAMAFQAHAEARABQAPABAGADQgCAHAHAHIgBABIgmADQgzADgXAQQAGgXgHgTg");
	this.shape_130.setTransform(-189.5,-81.8711);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#F8E8D9").s().p("AmKBPQgwgKgNgVIANgZQAOgaAhgPQAAABAJgEQgIADABgBIAVgIQCCgnBEBIIAFAIIABAAIAAgBQAPATACAVIgFASQhYAOg1AAQg/AAgigGgADBArQhJgJgVgQQBxgVBqgiQAgAAAcAIQBRAUgDAsQgWAIgLADQgVAFhRAAQhCAAg+gIgAlAgyIgRACQAHgIAEgLQAIgPAXgBQBogEgHBBQgsgYhOgEg");
	this.shape_131.setTransform(-188.7196,-84.2116);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("Ah3A7QAZg9htgMQgMABgMAEQgsAOALAcQgXAEgUAKIgGAEIAHgNQAXgaAEgTIAFgDIABAAQgHgHgNABIAAgBQAEgYAigMQB+guBOBFQAiAegVAVQgXgVgggPIAAABQgIAAgEAEIAAABQAMAUATAKQgfAbABAYQgJgHgKgGgADRA5QgSgBgHgDQgMgFABgNQAAgEAEgGIAFgIQgPgRgBgEQAAgBABAAQAAgBAAgBQAAAAABgBQAAAAAAgBQAxgOA1AIIAAAEIABgBIABgDQATADATAFQgIALAFANIgEgDIgCADQgbgFgfACIgDAAIgEACIgLAFQgFADgCAEIAAABQAJADAJgCQAfgHAggCQgBADAAADIgEAAQgfADgTAOQgNAJgCAJQgFgDgPgCg");
	this.shape_132.setTransform(-196.45,-92.429);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#C59064").s().p("ABYhvIAHgBIAIgBIADAAIAPgDIgTACIAAgZQADACAFABQBNAUBLgFQgGAggzAQIAAABQAMgCAKgDQggBfAFBhQgYgEgcADQgvAFgoAOIgQAHQAMiCAfh5gACHh3IAEgBIAAgBgAkEA+QARgtANgwQAOgxASgqQBDATBNACQhCBegDBlQgtgjhcADg");
	this.shape_133.setTransform(-189.6,-106.55);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#B09B61").s().p("Al7BtQCGiYA4ilQAEACAHAAIBiACQgjAngbAqQgDgogFgnIgBAAQgMAvAPAoQgpBAgXBDQgLAlgSAjQgUAnAIAgQAehLAahNQASg5Alg0IAAABIABgBIAAgBQALgRAOgQQAdgkALggQC1ADC1gBQACBnAuBkQAQAlAJAmQAHAgAOAbQgYAMgcAMQiGA7iTgrQACgxAMgvQAHgbALgaQANgfABgaQAXACAcgKIgBgBQgbAEgXgCIAAgHIgDAGQgXgDgWgKIgBAAQARARAaADQgeA+gOBEQgNA4AKAzIgGABIABgEIgCAEQgqADgoAAQjfAAhrhkg");
	this.shape_134.setTransform(-184.1,-138.5914);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#35BAD6").s().p("AjFCZIgOgBQAAgxAPhUQgBh3gGg6QAlAOApAJQBCAOAvABICHABQAoAAADgDQA4BgARBNQAJANAFBfIhhAAQi0AAitgGgAj4iIIAAgCIgEgIQACACADABIACABIgDALg");
	this.shape_135.setTransform(-181.575,-175.8039);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#246662").s().p("AATBTQgugBhBgOQgqgJglgOIgTgHIAAgBIgDgMIgCgFIgCgMIABgEIABgXQARgyBsgNIAAgBIADAAIACAAQARAoBdgMQA4gHAKgUIAKACQgBgCAPAGQANAGAjAUIgSAEQgNAJgKAaIgZgcIgCACIAaAgIAJAJIABACIAZAjIAAABIAMAWIACADIAIAOQgDADgoAAIiIgBg");
	this.shape_136.setTransform(-184.8,-196.2);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgTA5QAGgCgIgGIARAIQgIADgIAAIAAAAQgMAAANgDgAAWg6IgBgBIADABIADABIgFgBg");
	this.shape_137.setTransform(-144.3547,-175.3125);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#DFF4FF").s().p("AARAsIAFACQgQgfhKhBIgCgDIAMADIAEgOIBaBLIgBAAQALADALAJQAOANAAAIQAAAHgHAHIgGAGIgFgCIAEADQgagPgOgGgAA4A5IAAgBIAAAAg");
	this.shape_138.setTransform(-141.525,-184.8625);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#583720").s().p("AAcAWIgEAAIgEAAIhsgOQgJgXAbgJIAcABQAmADARADIAMACQATADAUAFQALAEAQAHIgIAEQgDAAgCAFQgEgCgEACQgJACgEAEQgHADAAADg");
	this.shape_139.setTransform(-122.9391,-161.725);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#C59064").s().p("ACICRIACgBQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBABAAAAQAEgVgDgXQAAgJACgHQALgWAWAOQgDAFgCAHQACAcgFAbQgGAHgIAAQgGAAgHgFgAClCQIABAAIgBgBQAMgfgDgiQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQANACANgEIAJAHQgBALgBANQAAASgIAOQgGANgMAAQgHAAgKgFgADICPQASgcgDgfQAKAGALAEQAAABABAAQAAABABAAQAAAAABABQAAAAABAAQgBAOgEAPQgFAUgPAAQgHAAgIgDgABvCKIgCgDQgCgNABgOQABgcAagBIgCAGQgCAeADAdIgCAAIAAAAIgFABQgJAAgHgHgABXBVIAWADIAAAAQgJAXAHASQgOgVgGgXgADfBUQgFAAgMgOIgJgGIgBgBQAAAAgBgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgOgPgIgQQAFARALAMIgBAAIAEAEIAIAHQgLACgMgDQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIgGgBIgCAAQgUgHgRgSQAAAAAAABQAAAAAAAAQAAAAAAABQABAAAAAAQAKANANAHIgBABQgQgIgLgEQgUgFgTgDIgLgCQgSgDgngDQAUABATACIhIgVQg/gRg7gWQg7gXgXgUIgjgWQAPgEgDgEIAGAEIAAgCIgBgDQgCgGAEgUIAFgLIAEgQIAJgEIAHABIAEABQATAAAPACQAAABAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAoAMIABABQALAGAlASQAFACAEADIAEACIA1AaIBbAyIAtAYIAEAAIAWACIAcADQAKAAAbAMQAZALAPApIgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAQgEASAQABIgIABQgOAAgLgIg");
	this.shape_140.setTransform(-128.85,-168.0281);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("ACKC7QgHgCgBgFQgOAIgKgPQgbgQgDgjIAAgEIAEABIAEAAQAGAWANAWQgHgTAKgWIAAgBQAAgDAHgDQAEgDAJgDQAEgBAEABQACgEADAAIAIgEIAAgBQgMgHgKgNQgBgBAAAAQgBAAAAAAQAAgBAAAAQABAAAAAAQARARAUAIIACAAIAGAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAABAAQALACAMgCIgIgGIgEgFIAAAAQgLgMgEgRQAIARAOAOQAAAAAAAAQAAAAABAAQAAABAAAAQAAAAAAABIABAAIAKAHQAMANAEABQAQAKASgDQgQgCAEgRQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBABAAIABAAQgPgpgZgKQgbgMgKgBIgcgCIgWgDIgFABIgtgaIhbgwIg1gbIgDgCQgEgDgFgBQglgSgLgHIgCgBIgCgCIADABIABABIABAAIAFACIgDgBIgDgCIAMAFQgagjgggYQAEABgmgkIASADQBLBCAQAfIgFgCQAOAHAZAOIgDgDIAFACQBDAdApAYIBRAtIABABIATABQAKgBAlAJQAmALAQAcQAPAZAGAXIAAABIAAABIgBACIgCAAQgGAEgJgCQAJAmgmAOQgIADgJgGIgBgBIgCAEQgGAGgJgBQgMgCgEgHQgEAKgLAAQgEAAgFgCgACHCyIgCABQAQALALgOQAFgagCgcQABgHADgGQgVgNgLAVQgCAIAAAIQACAXgDAVIABAAIACABgACrBvQADAjgMAfIABAAIgBABQAZANAKgWQAIgOAAgRQAAgNACgMIgJgGQgOAEgMgDQgBABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAgADFCwQAbAMAHgcQAFgPABgOQgBAAgBgBQAAAAgBAAQAAgBgBAAQAAgBAAAAQgMgFgJgFQADAfgSAbgABpCOQgBANACANIACADQAJAJAMgCIAAgBIABAAQgCgcACgeIACgHQgaABgBAdgADzBtQADAGAGAGIgEgMIgEABIgBgBIAAAAgAANBJQhCgRg1gRQgggKgZgLIgQgIQgVgKgPgIQgEgFgEgEQglgeABgDIAjAWQAXAVA7AWQA6AWA/ARIBJAWQgUgDgTAAgAhJhOIAAAAIAAABg");
	this.shape_141.setTransform(-128.5029,-171.3872);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#DFF4FF").s().p("AgyBOQgLgPAAgJIAAgBQAJAEASACQAfAEAYABIAAAGQgBALgMAJQgLAJgNAAQgUAAgOgVgAAkg2IgGAAIgQgSQgkg0BQA0IAAAAQAEADAAAEQAAAHgLADIgPABg");
	this.shape_142.setTransform(-146.8,-179.3322);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#583720").s().p("AhJAGIAagLQAjgPAQgFIANgEIAmgKQALgCASAAIgFAHQgCACAAAFQgFABgDADQgGAGgCAFQgFAGABACIgVAHIgEACIgDACIhnAjQgSgRATgTg");
	this.shape_143.setTransform(-119.1003,-175.3542);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#C59064").s().p("ACkBLIgEgCQgHgKgGgNQgMgaAXgNIACAHQALAcAPAYIgCABIABAAQgHAFgHAAIgHgBgAC9BGIABgBQAAgBgBAAQAAAAgBAAQAAABgBAAQAAAAAAAAQgGgUgMgUQgEgHgCgHQAAgYAZADQAAAGACAGQAPAYAHAaQgDAPgPAAIgFgBgAB2AnIAVgIIABAAQABAZAOANQgVgMgQgSgADXA4IABgBIgCAAQgEgggRgdIgBgDQAMgDAKgKIAMABQADAMAGAKQAHAQAAAQQABAXgbAAIgBAAgAjgAuQgOgBgRgHQgfgdAdAUIAHAAIgBAAIgCgDQgFgFgFgTIgBgLIgDgRIAHgHIAGgCIAEgBQAQgJAPgEQAAAAAAAAQAAAAAAAAQAAAAAAABQABAAAAAAIANgSIAbAKIgDAAIAFABIABAAQAMACApgBQAFgBAFAAIBAABQAyABA1ACIA0ACIADgCIAVgIIAagKQAKgEAegCQAagCAgAeIgBABQgBAAAAABQAAAAAAAAQgBABAAAAQAAABABABQAEARAPgGQgPALgSgCQgFACgQgHIgMgCIgBAAQgBgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgTgGgPgLQAMANAPAGIAAAAIAGACIAKADQgKAHgLACQgBABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAIgGACIgBAAQgVADgXgJQgBAAAAABQAAAAAAAAQABABAAAAQAAAAABABQAPAGAOABIAAABQgSgBgLADIgmAJIgNADQgRAGgjAOQARgIATgGIhKANQhAANg+AGQgcADgWAAQgbAAgRgEgADogSIAXgBQACABADAAQAGANACAOQAHAcgeACQAEghgRgYg");
	this.shape_144.setTransform(-127.3023,-178.9117);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("ACaBSQgggCgSgeIgCgDIAEgCIADgCQAQASAWANQgPgNgBgZIAAgBQgCgCAGgGQABgFAHgGQADgDAEgBQAAgFACgCIAGgGIAAAAQgOgBgPgHQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAXAIAVgCIACgBIAGgCQAAAAAAAAQABAAAAAAQABAAAAgBQABAAAAAAQAMgDAJgHIgKgDIgGgBIABgBQgPgGgMgNQAPALATAHQAAgBAAAAQAAAAABAAQAAAAAAAAQAAABAAAAIABAAIAMADQARAGAEgBQATACAPgLQgQAGgEgSQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAIACgBQghgegaACQgeABgJAEIgaAKIgVAJIgEACIg0gCQgzgDg0AAIg/gBQgFgBgFABQgpABgNgBIAAAAIgFgBIADAAIACAAIAAgBIACgBIgDABIgSgTQgJgaAXAaIARARIACABIAEgBIAAAAIAPgBQAtgCADABQBCgEArADIBdAEIABABIATgIQAIgFAlgIQAmgIAcASQAXAQAQATIABAAIABAAIAAADIgCABQgEAGgJACQAZAdgbAdQgGAHgLgBIgBgBIAAAEQgCAIgJADQgMAFgGgFQABAPgTADQgIABgDgEQgFAIgIAAQgFAAgGgDgACLA2QAFANAIALIADABQAMAEAJgHIAAgBIABAAQgPgZgLgbIgBgHQgXAMAMAagAC2BJIgCACQAUADAEgSQgIgZgOgYQgCgHAAgGQgZgCAAAXQABAIAFAHQALAUAGAUIACgBIACAAgAC4gFIAAAEQASAcADAhIACAAIgBABQAdAAgCgXQABgQgHgQQgGgLgEgLIgLgCQgKAKgMADgADtAsQAdgCgGgcQgDgPgFgNQgDABgCgBIgXAAQARAZgEAhgAD3gkQAGAEAIADIgJgJIgEACIAAAAIgBAAgAi2BAQgYgBgfgDQgTgDgIgDIgGgDQAGgDAAgBQAAAAgBgBQAAgBAAAAQAAgBAAAAQABgBABAAQAQAHAPAAQAfAIA+gGQA/gGA/gNIBKgOQgSAGgSAJQhBAPg4AIQgsAHgjAAIgHAAgAh4g+IABAAIAAAAg");
	this.shape_145.setTransform(-126.4625,-179.3509);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#DFF4FF").s().p("AgkAFQgbgWADgGQACgGAKADQAJAEACgCQAFAFAhADQAaAEAigFIAAAGQAAALgHALQgLARgaAAQgbAAgagXg");
	this.shape_146.setTransform(-148.8862,-171.9455);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#583720").s().p("AhHAOIAYgOQAigSAPgIIAMgEQARgIAUgGQALgEASgBIgFAIQgCABABAGQgEABgDADQgGAHgBAFQgEAGABADIgUAJIgEACIgDACIhiAuQgVgPASgVg");
	this.shape_147.setTransform(-119.2477,-178.7);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#C59064").s().p("AjSBSQgPABgRgFQhEhEBBA7IAHAAIgBgBIgDgDQgFgEgHgTIgDgLIgEgRIAGgIIAGgCIAEgCQAPgJAPgGIAAABIAMgTIAcAHIgEAAQACABAEAAQANAAAogFIALgCIA/gFQAxgFA1gDIA0gEIAEgCIAUgLIAZgNQAJgEAdgFQAagFAkAbIgCABQAAAAAAABQgBAAAAAAQAAABAAAAQAAABAAAAQAGARAPgHQgOANgSgBQgFACgRgFIgMgBIgBABQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQgUgFgPgJQANAMAQAEIgBAAIAGACQAFACAGAAQgJAIgLADIgEACIgFADIgCAAQgVAFgXgGQAAABAAAAQAAAAAAAAQAAABABAAQAAAAABAAQAPAFAOAAIAAAAQgSACgLADQgUAGgRAHIgMAFQgQAHgiASIAigSIhJAWQg9ATg9ANQgsAJgdAAQgLAAgJgBgACyBGIgEgBQgIgKgHgMQgOgZAVgOIACAGQAOAbASAWIgCABIAAAAQgGAHgIAAIgGgBgACBAoIAUgLIAAAAQAEAZAQALQgXgKgRgPgADLA/IABgCQgBAAAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQgJgTgOgSQgFgHgCgHQgDgYAaAAQAAAGAEAHQAQAWAKAZQgCAQgRAAIgCAAgADkAtIgCABQgHghgUgaIgCgDQAMgFAKgLIAKABQAFALAHALQAJANABAQQAEAYgcACgADsgeIAXgCQABAAAAAAQABAAAAAAQABAAABAAQAAAAABAAQAHAMAEAPQAKAageAFQABgggUgYg");
	this.shape_148.setTransform(-128.4479,-182.6452);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("AjeBZQgigEgGgFQAAAAgBgBQAAAAAAgBQAAAAABgBQAAAAABgBQARAFAPgBQAfAFA9gNQA+gMA+gUIBIgVIgiASQhAAXg2ANQgnAKgeAEQgUADgRAAIgXgBgACdBHQgfACgVgcIgCgDIACgCIAEgCQARAQAYAKQgQgMgEgYIAAgBQgCgCAFgHQABgEAGgHQADgEAEAAQgBgFACgBIAEgIIAAgBQgOABgPgGQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAYAGAUgFIACgBIAGgCIAEgCQAKgEAJgIQgGAAgEgCIgGgBIAAgBQgPgEgOgLQAQAJAUAFQAAgBAAAAQAAAAAAAAQABAAAAAAQAAABAAAAIABAAIANABQAQAFAFgCQATAAANgNQgPAIgFgRQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBABAAIABgBQgjgagbAFQgdAEgJAFIgZANIgUAKIgEADIgzADQg0ADgzAFIg/AGIgKABQgpAFgMAAQgEABgCgBIADAAIACgBIASgEQAQgEAkgCIgGgBQBNgMAxgCIBcgGIABABIARgKQAIgGAkgMQAlgLAdAOQAaAOASAQIABABIAAAAIAAADIgCABQgDAGgIADQAcAcgYAeQgGAIgKAAIgBgBIAAAEQgCAJgIAEQgLAFgHgEQADAPgTAFQgHABgEgDQgEAKgKAAQgEAAgGgDgACMAtQAGANAJAJIADABQAMADAJgIIAAgBIABgBQgSgWgOgaIgCgHQgVAPAPAYgAC4A8IgBABQATABACgRQgKgZgQgWQgDgGAAgHQgaAAADAYQACAHAFAHQAOASAIAUIACgBIABAAgADPAtQAcgDgDgXQgBgQgJgOQgHgLgFgLIgLAAQgKALgLAEIABADQAVAbAGAgIACAAgADZgfQATAYAAAgQAdgFgJgbQgEgPgIgMQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBAAAAIgXADgAD8gyIgJgIQgBAAAAAAQgBAAAAABQgBAAAAABQgBAAAAABQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABIAOAFIAAAAgAiCgrQABAAAAAAIAAAAg");
	this.shape_149.setTransform(-126.4522,-182.4715);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#DFF4FF").s().p("AgPAXQgVgLgUgYQgTgZATAIQAUAIAEgBQAAAGAlALQAZAGAlABQgDAGgFAIQgNAQgTAAQgYAAgSgJg");
	this.shape_150.setTransform(-149.8547,-172.6656);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#583720").s().p("AhKAAIAagJQAlgMAQgEIAMgDQATgFAUgCQAMgCASACIgGAGQgCABAAAGQgEAAgEADQgHAGgCAEQgGAGABADIgWAGIgDABIgEABIhoAdQgSgTAVgSg");
	this.shape_151.setTransform(-119.2477,-173.2875);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#C59064").s().p("ACaBSQAAAAgBgBQAAAAAAAAQgBgBAAAAQgBAAAAAAQgHgLgEgNQgLgaAYgMIABAHQAJAcAOAaIgBAAIAAABQgHAEgGAAQgEAAgFgCgACzBQIACgCQAAgBgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgFgUgLgVQgDgHgBgIQABgYAZAEQAAAGACAHQAMAaAGAaQgFANgNAAIgHAAgABuAsIAXgHIAAAAQAAAZANAOQgVgOgPgSgADOBDIABgBIgBAAQgCghgQgfIAAgCQAMgCAMgJIALACQACAKAGANQAFAQgBAQQAAAVgYAAIgFAAgADkgGQALABAMAAQACABAEAAQAEAMABAPQAFAdgdAAQAGghgQgZgAihAkQgtAAgYgIQgPgCgQgIQADgHgFgCIAIABIgCgBIgCgDQgEgFgEgTIAAgLIgCgRIAHgHIAHgBIADgCQARgHAQgEQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAABAAIAOgSIAaAMIgDABIAFABQANACApACQAFgBAFABIA/AEIBmALIA1AFIADgCIAWgGIAagJQALgDAdAAQAaAAAeAgIgBABQAAAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABQADARAPgEQgPAKgTgDQgEABgQgIIgLgDIgCAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQAAAAgBAAQgSgHgOgNQALAPAOAGIAAABIAGACIAJAEQgJAGgLACQgBAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgFABIgCABQgVABgXgKQAAAAAAABQAAAAAAAAQAAAAABABQAAAAABAAQAOAIAOABIAAABQgSgCgLACQgVACgTAFIgMADQgRAEglAMQATgHASgFIhKAJQhBAIg+ADIgSAAIgGAAg");
	this.shape_152.setTransform(-126.85,-177.062);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("ACSBPQgfgEgQgfIgCgDIADgCIAEgBQAOATAVANQgNgNAAgZIAAgBQgBgCAFgGQACgFAHgGQAEgDAEABQAAgGADgBIAFgGIAAgBQgOgBgOgIQgBAAAAgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQAXAJAVgBIACAAIAGgBQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABgBQALgCAKgGIgKgDIgGgDIAAAAQgOgHgLgOQAOAMATAIQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABIACAAIALADQAQAHAFgBQASADAQgKQgQAFgDgSQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAIABgBQgfgggaAAQgdgBgLAEIgaAIIgVAHIgEACIg0gGIhngKIg/gEQgFgCgFABQgpgCgNgCIgFgBIADAAIACAAIATgBQARgBAiAEIgEgBQBNAAAwAGQAtAEAvAGIABABIATgGQAIgFAmgGQAngFAaATQAXASAOATIABAAIABABIgBADIgCABQgEAGgJABQAXAfgdAcQgGAGgKgDIgCAAIAAAEQgDAIgJACQgMAEgGgGQAAAQgTACQgIAAgCgEQgFAIgIAAQgFAAgHgFgACFAyQAEANAHAMQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAMAEAKgHIAAAAIABgBQgOgZgJgcIgBgHQgXALAKAagACuBIIgBACQATAEAFgRQgGgagMgZQgCgHAAgFQgZgFgBAYQABAHAEAIQAKAUAFAVIACgBIABAAgAC1gFIABADQAQAdABAiIABAAIAAABQAcACAAgYQACgQgGgQQgGgLgCgLIgLgCQgLAIgNADgADnAuQAdAAgEgcQgBgQgFgMQgEABgBgCQgMABgLgCQAPAagGAggAD3ggQAFAEAIADIgIgJQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAgBABIAAAAIgBAAgAipApQgkgBgagIQgmgLAAgGQAAAAAAAAQAAgBABAAQAAAAAAAAQAAgBABAAQAPAIAPABQAYAIAtABIAYgBQA/gCBAgJIBLgIQgTAFgSAHQhDALg3AEQgeADgZAAIgNAAgAh2hSQABAAAAgBIAAABg");
	this.shape_153.setTransform(-126.1877,-176.5449);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AAJALIgBgBIgRgVIASAVIABACIgBgBg");
	this.shape_154.setTransform(-142.8,-181.75);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#DFF4FF").s().p("AAVAxQgXgqg9g6IAPAAIAGgNIBSBPQAYAEAAAaQAAAGgFAEIgMAKQgQgKgKgGg");
	this.shape_155.setTransform(-141.65,-184.5125);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#C59064").s().p("ACZCeIABgBIgBAAQAOgeAAgjIABgDQAMAEAOgDIAJAHQgDALgBANQgBARgKAOQgGAMgLAAQgIAAgKgGgAC8CfQAVgagCgfIAUALQAAABABAAQAAABAAAAQABAAABABQAAAAABAAQgCAOgGAPQgGASgNAAQgHAAgJgEgAB8CdIACgBQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAFgVAAgXQAAgIADgHQAMgWAUAQQgDAFgBAHQgBAcgHAaQgGAHgHAAQgHAAgHgGgABkCTIgCgDQgBgNACgNQADgdAaABIgDAHQgEAdABAdIgCAAIAAAAIgDABQgKAAgHgJgABPBdIAWAEIAAABQgLAWAGASQgMgWgFgXgADWBmQgEgBgLgOIgJgIIgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQgBAAAAAAQgNgPgHgRQAEARAJANIAAAAIAEAFIAHAHQgLABgMgDQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBIgGgBIgCgBQgUgIgPgTQAAAAgBAAQAAAAAAABQAAAAABAAQAAABABAAQAJAOALAIIgBAAQgOgJgMgEQgTgHgTgEIgLgDQgSgEgmgGQATACAUAEIhHgbQg+gVg4gaQg5gbgWgXQgMgIgSgQQAMgDgCgEIAFAEIAAgCIgBgDQgBgGAGgUIAEgKIAHgQIAJgDIAHACIADAAQATACAPADQAAABAAAAQAAAAAAAAQAAAAAAABQAAAAABAAIAUgJIASAXIgDgCIAEAEQAKAHAkAVIAJAFIA2AhIBWA4IAsAbIAEAAIAXAEIAbAFQAKABAaAOQAYAMAMArIgBAAQgBAAAAAAQAAAAgBAAQAAAAAAABQgBAAAAABQgFARAQADIgFAAQgQAAgNgKg");
	this.shape_156.setTransform(-129.45,-166.5875);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("ACmDJQgMgDgDgHQgHANgTgHQgGgDgBgFQgOAIgJgRQgagRAAgjIAAgEIADAAIAEABQAFAXAMAWQgGgTALgVIAAgBQABgDAIgDQAEgCAIgCQAFgCAEADQACgGADAAIAIgDIAAAAQgLgJgJgNQgBAAAAgBQgBAAAAgBQAAAAAAAAQABAAAAgBQAPATAUAJIACAAIAGACQAAAAAAAAQABABAAAAQABAAAAAAQABAAABgBQALAEALgBIgHgHIgEgGIABAAQgKgMgEgRQAHAQANAQQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAAAABIABAAIAJAIQALAOAFABQAPALASgCQgQgDAFgRQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAABIACAAQgNgrgXgMQgagOgLgCIgbgEIgXgEIgEAAIgrgdIhXg2Ig2giIgJgEQgkgVgKgIIgEgDIADABIABABIACABIgCgCIgTgWIgBgBIACABQglgigTgjIAdABIgQAAQA9A8AYAqQAKAFAQAKIAMAIIgDgDQBEAjAoAcQAnAYAmAaIABACIAUACQAJAAAlAMQAkANAPAeQAMAaAEAXIAAABIAAABIgBACIgCAAQgGADgJgCQAGAmgmALQgJADgIgHIgBAAIgCACQgFAFgGAAIgEAAgACkB8QAAAigOAeIACABIgBAAQAYAQALgVQAJgOABgRQABgNADgLIgJgHQgOADgMgEIgBADgAC6C/QAaANAJgcQAFgOACgOQgBAAAAgBQgBAAAAAAQgBgBAAAAQgBgBAAAAIgUgMQACAggUAagAB7C7IgCABQAPANAMgNQAHgaABgcQABgHAEgFQgVgQgMAWQgDAGAAAJQAAAXgFAUIABAAIACABgABgCVQgCAOABANIACADQAIAJAMgBIAAgBIACAAQgBgcAFgdIACgHIgCAAQgYAAgDAbgAD0CMIgDgMIgEAAIgBgBQADAGAFAHgAAJBKQhAgVg0gWQhNgfgjggQgjgiAEgCQASAQAMAIQAWAXA5AaQA5AaA9AVIBHAbQgUgDgTgCgAhBhUIAAAAIAAABg");
	this.shape_157.setTransform(-129.1503,-169.75);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#DFF4FF").s().p("AhaBbQgOgLgBgMQABgJAGAAIABAAQAdAQA9AHQgBAFgFAFQgKAMgYAAQgbAAgQgNgAgihgIAAgFIACgCICJBGIgYAHIgBAAIgSAAg");
	this.shape_158.setTransform(-141.55,-178.825);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#583720").s().p("AhLADIAXgJIBBgTIgBgBIACgBIABAAIAAAAIAkgIQALgCAUACIABAAIgEAHQgCAAACAFQgFAAgCADIgHAKQgCAGACADIgWAGIAAgBIgDACIgCABIgBAAIhnAeQgagRARgRg");
	this.shape_159.setTransform(-108.6703,-171.925);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#C59064").s().p("ADQBEIgDgBQgMgJgKgNQgXgYAWgMIAEAIQAVAZAYAXIAAABIAAAAIAAABQgFADgGAAQgGAAgGgCgADqBCIACgBQgBgBAAAAQgBAAAAAAQAAAAgBAAQAAAAgBABQgMgTgUgSQgHgIgEgHQgJgWAeAEQACAFAEAGQAXAXARAYQAAANgOAAIgIAAgACSAjIAWgHQAJAYAUAMQgcgMgXgRgAEDA2IAAgBIgCAAQgNgfgegcIgCgCQAMgDAKgIIANACQAHALAKAKQANAOAFAPQAIAVgbAAIgEAAgAEgAmQgGgegcgYQAMACANgBIAGABQALAMAHANQAQAbgeAAIgBAAgACSAiIAAABIgEABIAEgCgAjaAhIgTgBQgRAAgUgFQgSgEgNgKIgDgBQgCgaA3ghQAIgFARgIIABAAIACAAIBFgBIBZADQA5ACA7AFIA6ADIAEgCIAUgHIAZgJQALgDAeAAQAegBAuAdIgBABQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAKAQAQgEQgMAJgXgDQgEACgVgGIgOgDIAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAABQgWgHgVgLQASANASAFIgBAAIAIACIAMADQgJAGgLADIgEABIgFABIgDABQgWACgcgJQAAAAAAABQAAAAAAAAQAAAAABABQAAAAAAAAQAUAHAQACIAAAAQgVgCgKACIgkAHIgBAAIgBAAIgDABQg/AMgsAGQhBAJhaAEIgnABQgYAAgGgCgAjYAbIABAAIgBAAgACSAjg");
	this.shape_160.setTransform(-118.933,-174.9167);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("ADXBpQgkgDgdgdIgEgDIABAAIACgBIAEgBQAXARAcANQgUgNgJgXQgCgDACgGIAHgKQABgDAGAAQgCgFABgBIAEgHIAAABIAAgBQgQgBgUgHQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAcAIAWgCIADAAIAFgCIAEgBQALgCAJgHIgMgCIgIgDIABAAQgSgFgSgLQAVAKAWAGQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAABABIAAgBIAOADQAVAGAEgBQAXADAMgJQgQAEgKgQQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBIABgBQgugcgeAAQgeABgLACIgZAJIgUAIIgEABIg6gDQg7gEg5gDIhZgCIhFABIgCgBIBDgEIgBAAIARgBIACAAIAMAAQBPgBAzADIBqAHQAAABAAAAQABAAAAAAQAAABAAAAQAAAAABgBIAQgHQAIgEAngGQAngHAkATQAgAPAYARIABABIABAAIAAACIgBABQgDAFgIADQAlAdgVAaQgFAGgLgCIgBAAIAAADQABAIgJADQgLADgJgFQAGAPgVACQgHABgFgEQgDAHgIAAQgGAAgJgEgAC+BPQAKAMAMAKIADABQAPAFAIgHIAAAAIAAgBIAAAAQgYgXgVgaIgEgHQgWALAXAZgADzBiIgCABQAWAEAAgQQgRgYgXgYQgEgFgCgHQgegDAJAWQAEAIAHAHQAUASAMATIACAAIACAAgADbAYIACADQAeAdANAeIACABIAAAAQAgACgJgXQgFgPgNgNQgKgMgHgLIgNgCQgKAJgMACgAEnBHQAfABgQgbQgHgPgLgMIgGAAQgNAAgMgCQAcAaAGAdgAEZgCQAIAEAJABIgOgHIgDACgAjiBNIAAAAQg9gHgdgQIgDgCQAIAAgBgBIALgGIACACQAOAKASAEQAUAFARAAIATABQAKAEA7gDQBagEBBgJQAsgGA/gNIADAAIgBABIAAAAIhBATQhEAMhKAIQgmAEgkAAQgiAAghgDgAjRA8IABAAIgBABgAj9hsIACAAIgCACg");
	this.shape_161.setTransform(-119.6198,-178.2944);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#DFF4FF").s().p("AhFBKQgYgTATACIAUACIADABIABAAIAAABQAWAIAogDIAAACQAAAJgFAGQgHAKgPAAIAAAAQgfAAgXgTgAgThcIBnAZIgWALIgUAEIAAAAQgFAAg4gog");
	this.shape_162.setTransform(-141.8008,-177.1875);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#583720").s().p("AhGAXIAVgQIA6ggIgBgBIABgBIABgBIAAgBIAigPQAJgFAVgDIAAAAQAAAGgCACQgBABADAEQgFABgBAEQgEAHAAAEQgBAGADADIgUALIgBgBIgCADIgCABIAAAAIgBAAIhcA1QgegJAMgVg");
	this.shape_163.setTransform(-109.5863,-179.55);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#C59064").s().p("AkbBeIgDgCQgcgOAugtQAGgHAPgMIABgBIACAAQAlgKAegFQA5gOAegFQA4gLA6gKIA5gLIADgCIASgNIAWgOQAKgGAegHQAdgIAzASIgBABQgBAAAAAAQAAABAAAAQAAABAAAAQAAAAABABQAOANAOgHQgJALgYADQgDACgWgBIgOABIAAAAQgBAAAAAAQAAgBgBAAQAAAAgBABQAAAAAAAAQgYgBgWgFQAUAHATACIAHAAIANAAQgHAIgKAFIgEACIgFADIgCAAQgVAIgdgCQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQAVACAQgCIAAAAQgVAEgJAEIgiAQIAAAAIgBABIgCABQg7AagpARQg9AYhAAUQgkALg0ADIgBAAIgJABIgBABIgLAAIgSAAQgVAAgLgEgADRAkIgDgBQgOgHgNgJQgcgTATgPIAFAHQAbATAdAQIAAAAIAAABIAAAAQgGAIgNAAIgDAAgACNARIAUgLQAOAUAXAIQgfgGgagLgADrAZQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABQgRgPgXgMQgJgGgGgGQgNgUAdgEQAEAGAFAFQAcARAWATQAFAPgXACIABgCgACMARIABAAIgDACIACgCgACNARgAjHgBIARgFIg9ATQANgIAfgGgAEAAJIgDAAQgUgagkgVIgCgCQALgFAHgKIANgCQAKAJANAJQAQAKAHANQAPATgfAGgADpg5QANgBANgEIAFgBQAOAJALAMQAVAXgeAHQgNgcgigRg");
	this.shape_164.setTransform(-119.07,-181.6626);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("AkQBlIAAAAIgBAAIgDgBQgIgCgUgLIgBgFIAVAHIAEAAIgBgCIAEACQAPAHAjgDIAKAAIACAAIAJgBIAAAAQA0gDAkgLQBAgVA+gYQApgQA6gaIADgBIgBABIAAAAIg6AhQhAAcg4AUQhRAeg0AEIgHABIgSAAQgcAAgRgGgACRATIgFgDIABAAIABAAIABgBIADgCQAaALAfAFQgXgHgOgVQgDgBABgGQABgEADgIQABgDAGgBQgEgEACgBQABgCABgHIgBABIAAgBQgQADgUgCQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAAAABgBQAcACAVgHIACgBIAGgDIAEgBQAJgGAIgIIgNABIgHgBQgTgBgUgIQAWAFAXACQAAAAABgBQAAAAABAAQAAAAAAAAQABABAAAAIABgBIAOAAQAWABADgDQAXgCAJgMQgOAIgOgOQAAAAAAAAQgBgBAAAAQAAAAABgBQAAAAAAgBIACgBQg0gRgdAIQgdAHgKAGIgWAOIgSAMIgDACIg5ALQg7AKg4ALQgdAFg6AOQgdAHglAJIgCAAIACgBIA+gSIgRAEQgwgogRgLQAPAEACABQA8ArACgCIAUgEIAMgEQBMgSAzgKIBogSIACAAIAOgKQAHgGAjgQQAlgPAoAJQAjAHAbAMIABABIABAAIABACIgBABQgCAGgHAEQAqAUgNAdQgDAHgMACIgBAAIABACQADAIgIAEQgLAGgJgDQAJANgUAHQgHACgFgCQgCANgXgEIgPACQgcAAgbgRgAC4APQAOAJANAGIAEABQAPABAGgIIAAgBIABAAIAAgBQgdgQgbgTIgGgHQgSARAbASgADxAVIgBABQAWgCgEgPQgWgTgcgRQgGgFgDgFQgeADANAVQAGAGAKAFQAXAMARAPIABAAIACAAgAEFAEIAAABQAfgGgOgTQgIgNgQgLQgNgIgJgJIgOABQgGALgMAFIADABQAjAWAVAZIABAAIABAAgAEIhCQgNAEgMAAQAhASANAbQAfgHgWgWQgLgMgNgKIgGACgAD9hVQAKACAJAAIgPgFIgDADIgBAAIAAAAg");
	this.shape_165.setTransform(-119.6123,-181.238);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#DFF4FF").s().p("AAtA9IgUgKIgCgCIhQhgIAEgBQgEgPAUAQIAFgNIBUBRQAMAogPAAIgEAAg");
	this.shape_166.setTransform(-142.6895,-184.8846);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#C59064").s().p("ACWCeIABgBIgBAAQAOgegBgjIABgDQAMAEAOgDIAJAHQgDALAAANQgCARgJAOQgGAMgLAAQgIAAgKgGgAC5CfQAUgagBgfIAUALQAAABAAAAQAAABABAAQAAAAABABQABAAAAAAQgBAOgGAPQgGASgOAAQgGAAgJgEgAB4CdIADgBQgBgBAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAGgVAAgXQgBgIADgHQANgWAUAQQgDAFgCAHQAAAcgIAaQgGAHgHAAQgGAAgIgGgABhCTIgCgDQgCgNADgNQACgdAbABIgDAHQgEAdAAAdIgCAAIAAAAIgDABQgKAAgGgJgABLBdIAXAEIAAABQgLAWAFASQgMgWgFgXgADTBmQgEgBgLgOIgJgIIgBAAQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQgNgPgIgRQAEARAKANIAAAAIADAFIAHAHQgLABgLgDQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBIgGgBIgCgBQgTgIgQgTQAAAAAAAAQAAAAAAABQAAAAAAAAQABABAAAAQAJAOAMAIIgBAAQgPgJgLgEQgUgHgSgEIgMgDQgSgEgmgGQAUACATAEIhHgbQg9gVg5gaQg4gbgXgXQgMgIgKgOQAFgFgDgEIAGAEIAAgCIgBgDQgCgGAGgUIAFgKIAGgQIAJgDIAHACIAEAAQASACAPADQAAABAAAAQAAAAAAAAQAAAAABABQAAAAAAAAIAVgJIASAXIgEgCIAFAEQAKAHAkAVIAJAFIA2AhIBWA4IArAbIAFAAIAWAEIAbAFQALABAaAOQAYAMAMArIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgFARAQADIgFAAQgPAAgNgKg");
	this.shape_167.setTransform(-129.1,-166.5875);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("ACjDJQgMgDgDgHQgHANgSgHQgHgDAAgFQgOAIgKgRQgagRAAgjIAAgEIAEAAIAEABQAEAXANAWQgGgTALgVIAAgBQABgDAHgDQAEgCAJgCQAEgCAEADQADgGACAAIAIgDIABAAQgMgJgJgNQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAAAABgBQAPATATAJIACAAIAGACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABgBQALAEAMgBIgHgHIgEgGIAAAAQgKgMgDgRQAHAQANAQQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABIABAAIAJAIQALAOAEABQAPALATgCQgRgDAGgRQAAAAAAgBQABAAAAAAQAAAAABgBQAAAAABABIABAAQgMgrgYgMQgagOgKgCIgcgEIgWgEIgEAAIgsgdIhWg2Ig2giIgJgEQgkgVgKgIIgEgDIADABIABABIAMAGIgEgDIgDgCIgFgCIgTgWIgBgBIABABQgkgigUgjIANABIgDABIBQBhIAAAAIABAAIABABIABAAIATAKIAZAQIgEgDQBFAjAnAcQAnAYAnAaIABACIATACQAKAAAkAMQAlANAOAeQANAaAEAXIAAABIAAABIgBACIgCAAQgHADgIgCQAGAmgmALQgJADgIgHIgBAAIgDACQgEAFgHAAIgEAAgACiB8QAAAigOAeIABABIgBAAQAYAQALgVQAJgOACgRQABgNACgLIgIgHQgOADgMgEIgBADgAC3C/QAaANAJgcQAGgOACgOQgBAAgBgBQAAAAgBAAQAAgBgBAAQAAgBAAAAIgUgMQABAggUAagAB5C7IgCABQAPANAMgNQAHgaAAgcQACgHADgFQgUgQgNAWQgCAGAAAJQAAAXgFAUIAAAAIADABgABeCVQgCAOABANIACADQAIAJAMgBIAAgBIABAAQAAgcAEgdIADgHIgCAAQgYAAgDAbgADyCMIgDgMIgFAAIgBgBQADAGAGAHgAAHBKQhBgVgzgWQhNgfgjggQgkgiAMAAQAKAOANAIQAWAXA5AaQA4AaA+AVIBGAbQgTgDgTgCgAhEhUIABAAIAAABg");
	this.shape_168.setTransform(-128.9157,-169.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37}]}).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_55},{t:this.shape_57},{t:this.shape_56},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_47},{t:this.shape_48},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68,p:{y:-176.425}},{t:this.shape_67}]},3).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_55},{t:this.shape_56},{t:this.shape_57},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance},{t:this.shape_42},{t:this.shape_41},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71}]},4).to({state:[{t:this.shape_66},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.instance_2},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_77},{t:this.shape_76},{t:this.shape_68,p:{y:-177.875}},{t:this.shape_75}]},4).to({state:[{t:this.shape_66},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_85},{t:this.shape_86},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.instance_2},{t:this.shape_79},{t:this.shape_80},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_47},{t:this.shape_48},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104}]},4).to({state:[{t:this.shape_66},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.instance_5},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.instance_4},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_97},{t:this.shape_98},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_85},{t:this.shape_86},{t:this.shape_84},{t:this.shape_83},{t:this.shape_81},{t:this.shape_82},{t:this.instance_2},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_110},{t:this.shape_109},{t:this.shape_72},{t:this.shape_108}]},4).to({state:[{t:this.shape_66},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_126},{t:this.shape_127},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.instance_5},{t:this.shape_120},{t:this.shape_118},{t:this.shape_119},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.instance_4},{t:this.shape_112},{t:this.shape_113},{t:this.shape_111},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_97},{t:this.shape_98},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.instance_2},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_47},{t:this.shape_48},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137}]},4).to({state:[{t:this.shape_66},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_127},{t:this.shape_126},{t:this.shape_128},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.instance_5},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.instance_4},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_97},{t:this.shape_98},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_85},{t:this.shape_86},{t:this.shape_84},{t:this.shape_83},{t:this.shape_81},{t:this.shape_82},{t:this.instance_2},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142}]},4).to({state:[{t:this.shape_66},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_127},{t:this.shape_126},{t:this.shape_128},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.instance_5},{t:this.shape_120},{t:this.shape_118},{t:this.shape_119},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.instance_4},{t:this.shape_112},{t:this.shape_113},{t:this.shape_111},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_97},{t:this.shape_98},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.instance_2},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_47},{t:this.shape_48},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146}]},4).to({state:[{t:this.shape_66},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.instance_5},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.instance_4},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_97},{t:this.shape_98},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_85},{t:this.shape_86},{t:this.shape_84},{t:this.shape_83},{t:this.shape_81},{t:this.shape_82},{t:this.instance_2},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150}]},4).to({state:[{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_157},{t:this.shape_156},{t:this.shape_72},{t:this.shape_155},{t:this.shape_154}]},4).to({state:[{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_47},{t:this.shape_48},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158}]},4).to({state:[{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162}]},4).to({state:[{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_168},{t:this.shape_167},{t:this.shape_72},{t:this.shape_166}]},4).to({state:[{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_157},{t:this.shape_156},{t:this.shape_72},{t:this.shape_155},{t:this.shape_154}]},4).to({state:[{t:this.shape_66},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_127},{t:this.shape_126},{t:this.shape_128},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.instance_5},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.instance_4},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_97},{t:this.shape_98},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_3},{t:this.shape_87},{t:this.shape_85},{t:this.shape_86},{t:this.shape_84},{t:this.shape_83},{t:this.shape_81},{t:this.shape_82},{t:this.instance_2},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_60},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_1},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_43},{t:this.shape_44},{t:this.instance},{t:this.shape_41},{t:this.shape_42},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142}]},3).wait(4));

	// Layer 4
	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#35BAD6").s().p("AhfgZQBXgeAMgEQAtAcAVAQQATAPAHADQgwAchIAcg");
	this.shape_169.setTransform(-156.575,-188.25);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#C59064").s().p("AhMALQgcgUAAgKQBRgdArgeIBRA/QAJAJgNAEQgNACgWAIQgWAJgKANQgMAPADACQABABAAAAQAAABAAAAQAAABgBAAQAAABgBABQgEACgKAZQhAgzgSgRg");
	this.shape_170.setTransform(-148.3899,-179.4);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#000000").s().p("ABTCaQgVgLgOgCIgCgBIgZgRQgbgTgYgcIgGgNIgXgbQgXgagdgtIADADIgEgEIABABIgDgEIgCgDQgGgKgGgIIgegqIgFgGIgDgFIAAgDIgFgHIAFAHIAIAKIAJALIAAABIAmAwIBHBUQBIgcAxgbQgHgDgUgQQgUgQgtgcQg2gpgsgaIgMgGIAPgDIA+AqQBsBMAPANIAoAfIAoAfIAAABIABAAIAGAGIAGAGIgFABIhQg+QgtAehPAcQAAAKAbAWQASAQBAAzIAUALIgJgDg");
	this.shape_171.setTransform(-155.025,-186.1098);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#246662").s().p("Ag7AFIAAAAIgKgLIgIgKQABgHACgGQAKgLAOgIIASgFIAMAHQAsAaA2AoQgNADhWAfIgmgxg");
	this.shape_172.setTransform(-163.975,-196.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]}).to({state:[{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},59).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-236.7,-290.8,2017.6000000000001,221.3);


(lib.replay_ptn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"normal":0,highlight:1});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag7BPIAEgcQAIAEAIgBQAGAAAEgBIAGgDIAEgHIADgIIADgGIgxhwIAlAAIAcBKIAAAAIAZhKIAjAAIgyCBIgHAQQgDAHgEAEQgFAGgIACQgHADgNAAQgNAAgMgFg");
	this.shape.setTransform(107.525,29.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgcA4QgHgCgGgEQgFgFgDgGQgEgGAAgJQAAgKAEgGQAEgHAGgDQAGgFAIgCQAHgDAJgBIAQgBIAPAAQAAgKgGgFQgHgFgJAAQgHAAgIADQgHAEgFAGIgSgTQAJgJANgEQANgFANAAQAPAAAKAEQAJAEAGAHQAGAIACAKQADALAAAOIAAA4IggAAIAAgOIAAAAQgGAJgKAEQgIAEgLAAQgIAAgHgDgAAEAHQgFAAgFACQgGACgEADQgDADAAAGQAAAGAFADQAFADAGAAQAEAAAFgBIAIgEQAEgDACgEQACgEAAgFIAAgHIgIAAIgKAAg");
	this.shape_1.setTransform(94.825,26.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQBXIAAitIAhAAIAACtg");
	this.shape_2.setTransform(85.775,23.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Ag8BTIAAijIAgAAIAAAPIAAAAIAGgGIAIgGQAEgDAFgBQAFgBAGAAQAMAAAKADQAKAFAHAHQAIAIAEALQAEALAAAMQAAAMgEALQgEAJgGAJQgHAIgJAFQgKAFgMAAQgJAAgKgEQgJgDgGgIIAAAAIAABAgAgVgsQgHAHAAANQAAANAHAHQAHAHAOAAQAMAAAHgHQAHgHAAgNQAAgNgHgHQgHgIgMAAQgOAAgHAIg");
	this.shape_3.setTransform(75.925,29.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgTA2QgLgEgIgHQgJgIgFgLQgEgLAAgNQAAgMAEgLQAFgLAJgIQAIgHALgFQAMgEAMAAQAMAAAJAEQAKAFAHAHQAHAIADALQAEALAAAMIAAALIhPAAQACAKAHAGQAHAFAJAAQAIAAAGgDQAGgEAFgGIAYASQgJAKgMAGQgNAGgNAAQgMAAgMgFgAAXgMQAAgJgGgGQgGgGgKAAQgEAAgFACQgEACgDADQgDACgCAEIgCAIIAtAAIAAAAg");
	this.shape_4.setTransform(61.725,26.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAWBSIghhBIgRAAIAABBIgkAAIAAiiIA/AAQALgBALADQAMADAIAFQAIAGAFAKQAFAJAAAOQAAASgJAMQgJAKgRAEIApBFgAgcgNIAVAAIAJgBQAGAAAEgBQAEgCADgEQADgEAAgGQAAgHgDgDQgCgEgEgBIgJgEIgJAAIgXAAg");
	this.shape_5.setTransform(48.375,24.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#222C58").s().p("Ag7BPIAEgcQAIAEAIgBQAGAAAEgBIAGgDIAEgHIADgIIADgGIgxhwIAlAAIAcBKIAAAAIAZhKIAjAAIgyCBIgHAQQgDAHgEAEQgFAGgIACQgHADgNAAQgNAAgMgFg");
	this.shape_6.setTransform(108.775,29.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#222C58").s().p("AgcA4QgHgCgGgEQgFgFgDgGQgEgGAAgJQAAgKAEgGQAEgHAGgDQAGgFAIgCQAHgDAJgBIAQgBIAPAAQAAgKgGgFQgHgFgJAAQgHAAgIADQgHAEgFAGIgSgTQAJgJANgEQANgFANAAQAPAAAKAEQAJAEAGAHQAGAIACAKQADALAAAOIAAA4IggAAIAAgOIAAAAQgGAJgKAEQgIAEgLAAQgIAAgHgDgAAEAHQgFAAgFACQgGACgEADQgDADAAAGQAAAGAFADQAFADAGAAQAEAAAFgBIAIgEQAEgDACgEQACgEAAgFIAAgHIgIAAIgKAAg");
	this.shape_7.setTransform(96.075,26.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#222C58").s().p("AgQBXIAAitIAhAAIAACtg");
	this.shape_8.setTransform(87.025,23.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#222C58").s().p("Ag8BTIAAijIAgAAIAAAPIAAAAIAGgGIAIgGQAEgDAFgBQAFgBAGAAQAMAAAKADQAKAFAHAHQAIAIAEALQAEALAAAMQAAAMgEALQgEAJgGAJQgHAIgJAFQgKAFgMAAQgJAAgKgEQgJgDgGgIIAAAAIAABAgAgVgsQgHAHAAANQAAANAHAHQAHAHAOAAQAMAAAHgHQAHgHAAgNQAAgNgHgHQgHgIgMAAQgOAAgHAIg");
	this.shape_9.setTransform(77.175,29.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#222C58").s().p("AgTA2QgLgEgIgHQgJgIgFgLQgEgLAAgNQAAgMAEgLQAFgLAJgIQAIgHALgFQAMgEAMAAQAMAAAJAEQAKAFAHAHQAHAIADALQAEALAAAMIAAALIhPAAQACAKAHAGQAHAFAJAAQAIAAAGgDQAGgEAFgGIAYASQgJAKgMAGQgNAGgNAAQgMAAgMgFgAAXgMQAAgJgGgGQgGgGgKAAQgEAAgFACQgEACgDADQgDACgCAEIgCAIIAtAAIAAAAg");
	this.shape_10.setTransform(62.975,26.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#222C58").s().p("AAWBSIghhBIgRAAIAABBIgkAAIAAiiIA/AAQALgBALADQAMADAIAFQAIAGAFAKQAFAJAAAOQAAASgJAMQgJAKgRAEIApBFgAgcgNIAVAAIAJgBQAGAAAEgBQAEgCADgEQADgEAAgGQAAgHgDgDQgCgEgEgBIgJgEIgJAAIgXAAg");
	this.shape_11.setTransform(49.625,24.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#5B66CC","#3366CC"],[0,1],0,-26.1,0,26.2).s().p("Ak4EFIk7kLIE2j/IAHAAQAWAAAAAWIAAA/QAEgCAIAAINyAAQAWABABAVIAAEsQgBAVgWgBItyAAIgMgBIAAAhIAAAsQAAAWgWgBg");
	this.shape_12.setTransform(63.65,26.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#375D98").s().p("Ak0CWIk6kJQgSgUARgOIE7ELIADAAQAVAAAAgWIAAAgQAAAWgVAAgAkQA1IgMgBIAAggIAMABINzAAQAVAAABgVIAAAfQAAAWgWAAg");
	this.shape_13.setTransform(63.2496,40.525);

	this.instance = new lib.Path();
	this.instance.parent = this;
	this.instance.setTransform(69.45,55.65,0.3976,1.1497,0,0,0,162.8,11.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,128.8,55.6);


(lib.next1_mc_ani = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"normal":0,play:1});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_34 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(34).call(this.frame_34).wait(6));

	// button
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AADBIQgGgCgGgEQgGgEgDgGQgCgHAAgJIAAg0IgXAAIAAgcIAXAAIAAghIAhAAIAAAhIAeAAIAAAcIgeAAIAAAkIABAIIACAHQABADADABQADACAGAAIAHgBQAFgBACgCIAAAdIgLADIgNABQgIAAgIgCg");
	this.shape.setTransform(87.45,25.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAZA4IgYgmIgZAmIgpAAIAtg7Igmg0IApAAIATAeIATgeIAmAAIgkA0IArA7g");
	this.shape_1.setTransform(76.575,26.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTA2QgLgEgIgHQgJgIgFgLQgEgLAAgNQAAgMAEgLQAFgLAJgIQAIgHALgFQAMgEAMAAQAMAAAJAEQAKAFAHAHQAHAIADALQAEALAAAMIAAALIhPAAQACAKAHAGQAHAFAJAAQAIAAAGgDQAGgEAFgGIAYASQgJAKgMAGQgNAGgNAAQgMAAgMgFgAAXgMQAAgJgGgGQgGgGgKAAQgEAAgFACQgEACgDADQgDACgCAEIgCAIIAtAAIAAAAg");
	this.shape_2.setTransform(63.625,26.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAeBSIhGh0IAAAAIAAB0IgkAAIAAiiIAxAAIBEBwIAAAAIAAhwIAkAAIAACig");
	this.shape_3.setTransform(47.625,24.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#380701").s().p("AADBIQgGgCgGgEQgFgEgDgHQgDgGAAgJIAAg0IgXAAIAAgbIAXAAIAAgiIAhAAIAAAiIAfAAIAAAbIgfAAIAAAkIAAAJIADAGQABADADACQADABAGAAIAHgBQAFAAADgCIAAAdIgNACIgMABQgJAAgHgCg");
	this.shape_4.setTransform(86.8,25.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#380701").s().p("AAZA4IgYgmIgZAmIgpAAIAtg7Igmg0IApAAIATAeIATgeIAmAAIgkA0IArA7g");
	this.shape_5.setTransform(75.925,27.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#380701").s().p("AgTA2QgLgEgIgHQgJgIgFgLQgEgLAAgNQAAgMAEgLQAFgLAJgIQAIgHALgFQAMgEAMAAQAMAAAJAEQAKAFAHAHQAHAIADALQAEALAAAMIAAALIhPAAQACAKAHAGQAHAFAJAAQAIAAAGgDQAGgEAFgGIAYASQgJAKgMAGQgNAGgNAAQgMAAgMgFgAAXgMQAAgJgGgGQgGgGgKAAQgEAAgFACQgEACgDADQgDACgCAEIgCAIIAtAAIAAAAg");
	this.shape_6.setTransform(62.975,27.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#380701").s().p("AAeBRIhGhyIAAAAIAAByIgkAAIAAiiIAxAAIBEBxIAAAAIAAhxIAkAAIAACig");
	this.shape_7.setTransform(46.975,24.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FF0000","#6B0000"],[0,1],0,-26.1,0,26.2).s().p("AE3EFQgWABAAgWIAAgsIAAghIgMABItzAAQgVABAAgVIAAksQAAgVAVgBINzAAQAIAAAEACIAAg/QAAgWAWAAIAHAAIE2D/Ik7ELg");
	this.shape_8.setTransform(80.1,26.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#6B0000").s().p("AEyCWQgVAAAAgWIAAggQAAAWAVAAIADAAIE7kLQARAOgSAUIk6EJgApiA1QgWAAAAgWIAAgfQABAVAVAAINzAAIAMgBIAAAgIgMABg");
	this.shape_9.setTransform(80.5004,40.525);

	this.instance = new lib.Path();
	this.instance.parent = this;
	this.instance.setTransform(67.05,54,0.4655,1.1497,0,0,0,162.6,11.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(40));

	// Layer_4
	this.instance_1 = new lib.blink_mc("synched",35);
	this.instance_1.parent = this;
	this.instance_1.setTransform(80.55,27.85,1,1,0,0,0,63.3,27.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(39));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7.1,-4.9,141.70000000000002,65.5);


(lib.next1_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"normal":0,"highlight":1});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// button
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AADBIQgGgCgGgEQgGgEgDgGQgCgHAAgJIAAg0IgXAAIAAgcIAXAAIAAghIAhAAIAAAhIAeAAIAAAcIgeAAIAAAkIABAIIACAHQABADADABQADACAGAAIAHgBQAFgBACgCIAAAdIgLADIgNABQgIAAgIgCg");
	this.shape.setTransform(87.45,25.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAZA4IgYgmIgZAmIgpAAIAtg7Igmg0IApAAIATAeIATgeIAmAAIgkA0IArA7g");
	this.shape_1.setTransform(76.575,26.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTA2QgLgEgIgHQgJgIgFgLQgEgLAAgNQAAgMAEgLQAFgLAJgIQAIgHALgFQAMgEAMAAQAMAAAJAEQAKAFAHAHQAHAIADALQAEALAAAMIAAALIhPAAQACAKAHAGQAHAFAJAAQAIAAAGgDQAGgEAFgGIAYASQgJAKgMAGQgNAGgNAAQgMAAgMgFgAAXgMQAAgJgGgGQgGgGgKAAQgEAAgFACQgEACgDADQgDACgCAEIgCAIIAtAAIAAAAg");
	this.shape_2.setTransform(63.625,26.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAeBSIhGh0IAAAAIAAB0IgkAAIAAiiIAxAAIBEBwIAAAAIAAhwIAkAAIAACig");
	this.shape_3.setTransform(47.625,24.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#380701").s().p("AADBIQgGgCgGgEQgFgEgDgHQgDgGAAgJIAAg0IgXAAIAAgbIAXAAIAAgiIAhAAIAAAiIAfAAIAAAbIgfAAIAAAkIAAAJIADAGQABADADACQADABAGAAIAHgBQAFAAADgCIAAAdIgNACIgMABQgJAAgHgCg");
	this.shape_4.setTransform(86.8,25.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#380701").s().p("AAZA4IgYgmIgZAmIgpAAIAtg7Igmg0IApAAIATAeIATgeIAmAAIgkA0IArA7g");
	this.shape_5.setTransform(75.925,27.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#380701").s().p("AgTA2QgLgEgIgHQgJgIgFgLQgEgLAAgNQAAgMAEgLQAFgLAJgIQAIgHALgFQAMgEAMAAQAMAAAJAEQAKAFAHAHQAHAIADALQAEALAAAMIAAALIhPAAQACAKAHAGQAHAFAJAAQAIAAAGgDQAGgEAFgGIAYASQgJAKgMAGQgNAGgNAAQgMAAgMgFgAAXgMQAAgJgGgGQgGgGgKAAQgEAAgFACQgEACgDADQgDACgCAEIgCAIIAtAAIAAAAg");
	this.shape_6.setTransform(62.975,27.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#380701").s().p("AAeBRIhGhyIAAAAIAAByIgkAAIAAiiIAxAAIBEBxIAAAAIAAhxIAkAAIAACig");
	this.shape_7.setTransform(46.975,24.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FF0000","#6B0000"],[0,1],0,-26.1,0,26.2).s().p("AE3EFQgWABAAgWIAAgsIAAghIgMABItzAAQgVABAAgVIAAksQAAgVAVgBINzAAQAIAAAEACIAAg/QAAgWAWAAIAHAAIE2D/Ik7ELg");
	this.shape_8.setTransform(80.1,26.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#6B0000").s().p("AEyCWQgVAAAAgWIAAggQAAAWAVAAIADAAIE7kLQARAOgSAUIk6EJgApiA1QgWAAAAgWIAAgfQABAVAVAAINzAAIAMgBIAAAgIgMABg");
	this.shape_9.setTransform(80.5004,40.525);

	this.instance = new lib.Path();
	this.instance.parent = this;
	this.instance.setTransform(67.05,54,0.4655,1.1497,0,0,0,162.6,11.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7.1,0,136.70000000000002,55.6);


(lib.level_01copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{stopmarker:63});

	// timeline functions:
	this.frame_28 = function() {
		runTime("00.0 s")
	}
	this.frame_32 = function() {
		runTime("00.1 s")
	}
	this.frame_35 = function() {
		runTime("00.2 s")
	}
	this.frame_38 = function() {
		runTime("00.3 s")
	}
	this.frame_41 = function() {
		runTime("00.4 s")
	}
	this.frame_44 = function() {
		runTime("00.5 s")
	}
	this.frame_49 = function() {
		runTime("00.6 s")
	}
	this.frame_53 = function() {
		runTime("00.7 s")
	}
	this.frame_57 = function() {
		runTime("00.8 s")
	}
	this.frame_61 = function() {
		runTime("00.9 s")
	}
	this.frame_63 = function() {
		runTime("01.0 s")
		continueTimer("01.0 s")
	}
	this.frame_120 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(28).call(this.frame_28).wait(4).call(this.frame_32).wait(3).call(this.frame_35).wait(3).call(this.frame_38).wait(3).call(this.frame_41).wait(3).call(this.frame_44).wait(5).call(this.frame_49).wait(4).call(this.frame_53).wait(4).call(this.frame_57).wait(4).call(this.frame_61).wait(2).call(this.frame_63).wait(57).call(this.frame_120).wait(5));

	// Layer 13
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgNAXQgHgCgEgDQgFgEgCgEQgDgFAAgFQAAgFADgEQADgEAEgDQAFgEAHgCQAGgBAHAAQAIgBAGACQAGACAEADQAFADACAEQADAGAAAEIAAADIg4AAIACAGIAFAEIAHADIAIACQAHAAAGgCQAFgCAEgDIAJAEQgGAFgIACQgHACgKAAQgHAAgHgBgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape.setTransform(137.625,-197.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgFAXIgdgtIAOAAIAVAjIAAAAIAVgjIANAAIgcAtg");
	this.shape_1.setTransform(129.825,-197.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgOAYIgIgDQgEgCgCgCQgCgDAAgDQAAgGAFgDQAEgCAHgCQAHgCAHAAIAOgBIAEAAIAAgBQAAgFgEgDQgFgCgIAAIgLABQgFABgEADIgIgFQAGgEAHgCQAIgBAGAAQAQAAAHAEQAHAFAAAKIAAATIAAAFIABADIgLAAIgBgDIAAgEQgEAEgGACQgGACgHAAIgKAAgAgLADQgGACAAAFQAAAFAEABQAFACAGAAIAIgBQAEgBADgCIAEgEIABgGIAAgDIgMAAQgKAAgHACg");
	this.shape_2.setTransform(122.175,-197.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAUAXIgUgjIAAAAIgSAjIgMAAIgXgtIAOAAIAQAiIAAAAIASgiIALAAIATAiIAQgiIAMAAIgWAtg");
	this.shape_3.setTransform(112.85,-197.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgNAXQgHgCgEgDQgFgEgCgEQgDgFAAgFQAAgFADgEQADgEAEgDQAFgEAHgCQAGgBAHAAQAIgBAGACQAGACAEADQAFADACAEQADAGAAAEIAAADIg4AAIACAGIAFAEIAHADIAIACQAHAAAGgCQAFgCAEgDIAJAEQgGAFgIACQgHACgKAAQgHAAgHgBgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_4.setTransform(98.975,-197.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AATAmIAAgcQAAgGgEgEQgEgCgIAAIgJABIgHADIgEAGIgBAHIAAAXIgMAAIAAhLIAMAAIAAAkIAEgDIAFgDIAGgBIAHgBQAHAAAFABQAFACADACIAFAFQACAEAAAEIAAAdg");
	this.shape_5.setTransform(90.625,-198.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAKAeIgKgBQgCgBgDgBIgDgGIAAgGIAAgYIgPAAIAAgHIAPAAIAAgNIALAAIAAANIAVAAIAAAHIgVAAIAAAWIAAAEIABADQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAIAGACIAEgBIAGgBIAAAHIgGABIgIAAg");
	this.shape_6.setTransform(83.75,-198.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgIAmIAAgnIgQAAIAAgGIAQAAIAAgLIABgIQABgDADgDQADgDADgBQAFgBAHAAIAFAAIAEABIgBAHIgIgBIgHABIgEADQAAAAgBABQAAAAAAABQAAAAAAABQAAABAAAAIAAAGIAAAJIARAAIAAAGIgRAAIAAAng");
	this.shape_7.setTransform(74.9,-198.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgOAXQgHgCgFgDQgFgDgCgFQgEgEAAgGQAAgFAEgEQACgEAFgDQAFgEAHgCQAHgBAHAAQAIAAAHABQAHACAFAEQAFADACAEQADAEABAFQgBAGgDAEQgCAFgFADQgFADgHACQgHABgIAAQgHAAgHgBgAgJgPQgFABgDADQgDACgCAEQgCADAAACQAAAEACADQACADADACQADADAFABQAEACAFAAQAFAAAGgCQAEgBADgDIAFgFQACgDAAgEQAAgCgCgDQgBgEgEgCIgHgEIgLgBIgJABg");
	this.shape_8.setTransform(67.85,-197.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgNAXQgHgCgEgDQgFgEgCgEQgDgFAAgFQAAgFADgEQADgEAEgDQAFgEAHgCQAGgBAHAAQAIgBAGACQAGACAEADQAFADACAEQADAGAAAEIAAADIg4AAIACAGIAFAEIAHADIAIACQAHAAAGgCQAFgCAEgDIAJAEQgGAFgIACQgHACgKAAQgHAAgHgBgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_9.setTransform(55.075,-197.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_10.setTransform(49.1,-198.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgDgDgFQgDgEAAgGQAAgEADgEQADgFAEgDQAFgEAHgCQAGgBAIAAQAHAAAHABQAHACAGAEIgKAFQgDgDgFgBIgJgBIgKABQgEABgDADIgFAGQgBADAAACQAAAEACADIAEAFQADADAFABQAEACAFAAQALAAAGgGIAJAGQgFADgHACQgHABgHAAQgIAAgGgBg");
	this.shape_11.setTransform(43.925,-197.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgbAjIgFgBIABgHIAEABIAEAAQAGAAADgCQADgCACgEIAEgIIgdguIAOAAIAVAjIAVgjIANAAIgiA4IgDAFIgFAFIgGACIgJABIgFAAg");
	this.shape_12.setTransform(36.425,-196.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgDgDgFQgDgEAAgGQAAgEADgEQADgFAEgDQAFgEAHgCQAGgBAIAAQAHAAAHABQAHACAGAEIgKAFQgDgDgFgBIgJgBIgKABQgEABgDADIgFAGQgBADAAACQAAAEACADIAEAFQADADAFABQAEACAFAAQALAAAGgGIAJAGQgFADgHACQgHABgHAAQgIAAgGgBg");
	this.shape_13.setTransform(29.425,-197.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgFADgEQADgFAEgDQAFgDAHgBQAGgCAHgBQAIAAAGACQAGACAEADQAFADACAEQADAFAAAFIAAACIg4AAIACAGIAFAFIAHADIAIABQAHABAGgCQAFgCAEgEIAJAFQgGAGgIACQgHACgKAAQgHgBgHgBgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_14.setTransform(125.925,-209.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAKAfIgKgBQgCgBgCgDIgEgEIAAgHIAAgZIgPAAIAAgGIAPAAIAAgOIALAAIAAAOIAVAAIAAAGIgVAAIAAAXIAAAEIABAEQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAIAHABIAEAAIAGgBIAAAHIgHACIgHAAg");
	this.shape_15.setTransform(119.05,-209.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgFADgEQADgFAEgDQAFgDAHgBQAGgCAHgBQAIAAAGACQAGACAEADQAFADACAEQADAFAAAFIAAACIg4AAIACAGIAFAFIAHADIAIABQAHABAGgCQAFgCAEgEIAJAFQgGAGgIACQgHACgKAAQgHgBgHgBgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_16.setTransform(112.275,-209.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_17.setTransform(106.3,-210.525);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgkAjIAAhEIAMAAIAAAGIAAAAIALgFQAHgCAGgBQAJABAGACQAHACAFACQAFAEADAEQACAFAAAFQAAAFgCAFQgDADgFADQgFAEgGACQgGABgIABQgIgBgIgCQgGgDgEgEIAAAAIAAAfgAgJgaQgGABgCADQgEACgCADQgBADAAAEQAAAEABADQACADAEACQACACAGABQAEACAFgBQAFABAFgCQAFgBADgCIAEgFQACgDAAgEQAAgEgCgDQgBgDgDgCIgIgEIgKgBIgJABg");
	this.shape_18.setTransform(100.1,-208);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAqAYIAAgbIgBgEIgDgFIgFgCIgJgBIgHAAIgFADIgFAFIgBAFIAAAaIgKAAIAAgaQAAgHgEgEQgDgCgHAAIgKABIgHADIgDAGIgBAGIAAAXIgNAAIAAgjIAAgFIAAgGIALAAIABAEIAAAEIAAAAIADgDIAGgDIAGgCIAIgBIAJABIAHACIADADIADADQADgEAGgDQAFgCAHAAQAIAAAFABQAFACAEADQACACACADIABAIIAAAcg");
	this.shape_19.setTransform(88.9,-209.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgOAXQgHgCgFgDQgFgEgDgEQgCgFAAgFQAAgFACgEQADgFAFgDQAFgDAHgBQAHgCAHgBQAIABAHACQAHABAFADQAFADADAFQACAEABAFQgBAFgCAFQgDAEgFAEQgFADgHACQgHABgIABQgHgBgHgBgAgJgPQgFABgDADQgDACgCADQgCADAAADQAAAEACADQACADADADQADACAFABQAFACAEgBQAGABAEgCQAFgBAEgCIAEgGQACgDAAgEQAAgDgCgDQgBgDgDgCIgJgEIgKgBIgJABg");
	this.shape_20.setTransform(78.15,-209.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgEgDgEQgDgFAAgFQAAgEADgFQADgEAEgEQAFgCAHgCQAGgCAIgBQAHABAHACQAHABAGAEIgKAGQgDgDgFgCIgJgBIgKABQgEABgDADIgFAFQgBADAAADQAAAEACADIAEAGQADACAFABQAEACAFgBQALAAAGgFIAJAFQgFAEgHACQgHABgHABQgIgBgGgBg");
	this.shape_21.setTransform(70.325,-209.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgFADgEQADgFAEgDQAFgDAHgBQAGgCAHgBQAIAAAGACQAGACAEADQAFADACAEQADAFAAAFIAAACIg4AAIACAGIAFAFIAHADIAIABQAHABAGgCQAFgCAEgEIAJAFQgGAGgIACQgHACgKAAQgHgBgHgBgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_22.setTransform(58.125,-209.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AATAYIAAgbQAAgGgEgEQgDgCgJAAIgJABIgGADIgFAGIgBAGIAAAXIgLAAIAAgjIAAgFIgBgGIALAAIAAAEIAAAEIABAAIADgDIAFgDIAHgCIAHgBQAHAAAFABQAFACAEADIAFAFQABAEAAAEIAAAcg");
	this.shape_23.setTransform(49.75,-209.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgVAiQgLgDgHgEQgHgFgEgHQgEgHAAgIQAAgHAEgHQAEgHAHgFQAHgFALgCQAKgDALAAQAMAAAKADQAKACAIAFQAHAFAEAHQAFAHAAAHQAAAIgFAHQgEAHgHAFQgIAEgKADQgKADgMAAQgLAAgKgDgAgQgaQgHACgHAEQgFAEgDAGQgDAFAAAFQAAAGADAFQADAGAFAEQAHAEAHACQAIACAIAAQAKAAAHgCQAIgCAFgEQAGgEADgGQADgFAAgGQAAgFgDgFQgDgGgGgEQgFgEgIgCQgHgCgKAAQgIAAgIACg");
	this.shape_24.setTransform(39.35,-210.275);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#3FBFFF").s().p("AgVAPQgKgGABgJQgBgIAKgGQAJgGAMAAQANAAAKAGQAIAGABAIQgBAJgIAGQgKAGgNAAQgMAAgJgGg");
	this.shape_25.setTransform(18.6,-219.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#4781B4").s().p("AgVAPQgJgGAAgJQAAgIAJgGQAJgGAMAAQAOAAAJAGQAIAGABAIQgBAJgIAGQgJAGgOAAQgMAAgJgGg");
	this.shape_26.setTransform(160.6,-219.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FF0000").s().p("ALHFnQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCACgDABQgDgBgCgCgArQFjQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHDvQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACABADIAAA8QgBADgCACQgCACgDABQgDgBgCgCgArQDrQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHB3QgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCACgDAAQgDAAgCgCgArQBzQgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHAAQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCABgDABQgDgBgCgBgArQgEQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDAAQgDAAgCgCgALHh4QgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACABADIAAA8QgBADgCACQgCACgDABQgDgBgCgCgArQh8QgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgALHjwQgCgCAAgDIAAg8QAAgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCACgDAAQgDAAgCgCgArQj0QgCgCAAgDIAAg8QAAgDACgCQACgCADgBQADABACACQACACAAADIAAA8QAAADgCACQgCACgDABQgDgBgCgCgAKxlYIgNgCIguAAQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIAuAAQAJAAAIABQADABABADQACACgBADQAAADgDACIgEABIgCAAgAq0laQgCgCgBgDQAAgDABgCQACgDADAAIAOgBIAuAAQADAAACACQACACABADQgBADgCACQgCACgDAAIguAAIgLABIgCABIgEgCgAH+laQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAGGlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAEOlaQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgACWlaQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAAelaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAhZlaQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAjRlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAlJlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAnBlaQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAo5laQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAg");
	this.shape_27.setTransform(89.6,-184.7502);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgBAHAAQAIgBAGACQAGACAEADQAFADACAEQADAGAAAEIAAADIg4AAIACAFIAFAFIAHADIAIABQAHAAAGgBQAFgCAEgDIAJAEQgGAFgIACQgHACgKAAQgHABgHgCgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_28.setTransform(147.025,-195.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgOAYIgIgDQgEgCgCgCQgCgDAAgDQAAgGAFgDQAEgCAHgCQAHgCAHAAIAOAAIAEAAIAAgCQAAgFgEgCQgFgDgIAAIgLABQgFABgEADIgIgFQAGgEAHgCQAIgBAGAAQAQAAAHAEQAHAGAAAJIAAATIAAAFIABADIgLAAIgBgDIAAgEQgEAEgGACQgGACgHAAIgKAAgAgLADQgGACAAAFQAAAEAEACQAFACAGAAIAIgBQAEgBADgCIAEgEIABgGIAAgDIgMAAQgKAAgHACg");
	this.shape_29.setTransform(131.575,-195.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AATAXIgTgjIAAAAIgRAjIgNAAIgWgtIAMAAIAQAiIABAAIASgiIAMAAIASAiIAQgiIANAAIgXAtg");
	this.shape_30.setTransform(122.25,-195.275);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgBAHAAQAIgBAGACQAGACAEADQAFADACAEQADAGAAAEIAAADIg4AAIACAFIAFAFIAHADIAIABQAHAAAGgBQAFgCAEgDIAJAEQgGAFgIACQgHACgKAAQgHABgHgCgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_31.setTransform(108.375,-195.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AALAeIgKgBQgEgBgBgBIgDgGIgBgGIAAgYIgPAAIAAgHIAPAAIAAgOIALAAIAAAOIAUAAIAAAHIgUAAIAAAWIAAAEIABADQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIAGABIAGAAIAEgBIABAHIgHABIgGAAg");
	this.shape_32.setTransform(93.15,-195.9);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgJAmIAAgnIgPAAIAAgGIAPAAIAAgLIABgIQACgDADgDQADgDAEgBQAEgBAIAAIAEAAIAFABIgCAHIgIgBIgHABIgEADQAAAAgBABQAAAAAAABQAAAAAAABQgBABAAAAIAAAGIAAAJIARAAIAAAGIgRAAIAAAng");
	this.shape_33.setTransform(84.3,-196.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgOAXQgHgCgFgDQgFgEgDgEQgCgFAAgFQAAgEACgFQADgEAFgDQAFgEAHgCQAHgBAHAAQAIAAAHABQAHACAFAEQAFADADAEQADAFAAAEQAAAFgDAFQgDAEgFAEQgFADgHACQgHACgIgBQgHABgHgCgAgJgPQgFABgDADQgDACgCAEQgCADAAACQAAAEACADQACADADADQADACAFABQAFABAEAAQAGAAAEgBQAFgBAEgCIAEgGQACgDAAgEQAAgCgCgDQgBgEgDgCIgJgEIgKgBIgJABg");
	this.shape_34.setTransform(77.25,-195.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgBAHAAQAIgBAGACQAGACAEADQAFADACAEQADAGAAAEIAAADIg4AAIACAFIAFAFIAHADIAIABQAHAAAGgBQAFgCAEgDIAJAEQgGAFgIACQgHACgKAAQgHABgHgCgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_35.setTransform(64.475,-195.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgEgDgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgBAIAAQAHAAAHABQAHACAGAEIgKAFQgDgDgFgBIgJgBIgKABQgEABgDADIgFAGQgBADAAACQAAAEACADIAEAGQADACAFABQAEABAFAAQALABAGgGIAJAFQgFAEgHACQgHACgHgBQgIABgGgCg");
	this.shape_36.setTransform(53.325,-195.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgEgDgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgBAIAAQAHAAAHABQAHACAGAEIgKAFQgDgDgFgBIgJgBIgKABQgEABgDADIgFAGQgBADAAACQAAAEACADIAEAGQADACAFABQAEABAFAAQALABAGgGIAJAFQgFAEgHACQgHACgHgBQgIABgGgCg");
	this.shape_37.setTransform(38.825,-195.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgEADgFQADgFAEgDQAFgDAHgBQAGgDAHAAQAIAAAGACQAGACAEADQAFADACAFQADAEAAAFIAAACIg4AAIACAGIAFAFIAHAEIAIAAQAHAAAGgBQAFgCAEgEIAJAFQgGAFgIADQgHACgKAAQgHgBgHgBgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_38.setTransform(135.325,-206.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AALAfIgKgBQgEgCgCgCIgCgEIgBgHIAAgZIgPAAIAAgGIAPAAIAAgOIALAAIAAAOIAUAAIAAAGIgUAAIAAAXIAAAEIABAEQAAAAABAAQAAABAAAAQABAAAAAAQABAAABABIAFAAIAGAAIAEgBIABAHIgGACIgHAAg");
	this.shape_39.setTransform(128.45,-207.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgEADgFQADgFAEgDQAFgDAHgBQAGgDAHAAQAIAAAGACQAGACAEADQAFADACAFQADAEAAAFIAAACIg4AAIACAGIAFAFIAHAEIAIAAQAHAAAGgBQAFgCAEgEIAJAFQgGAFgIADQgHACgKAAQgHgBgHgBgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_40.setTransform(121.675,-206.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgkAjIAAhEIALAAIAAAGIABAAIALgFQAHgDAGAAQAIAAAIADQAGACAFACQAFAEACAEQADAFAAAFQAAAFgDAFQgCAEgFACQgFAEgGACQgHABgHABQgJgBgGgCQgIgDgDgEIgBAAIAAAfgAgKgaQgEACgEACQgDACgBADQgDAEAAADQAAAEADADQABADADABQAEADAEABQAFABAFAAQAFAAAFgBQAEgBAEgDIAFgEQACgDAAgEQAAgDgCgEQgCgDgDgCIgIgEIgKgBIgKABg");
	this.shape_41.setTransform(109.5,-205.85);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AApAYIAAgbIAAgEIgDgFIgFgCIgJgBIgGAAIgHADIgDAFIgCAFIAAAaIgLAAIAAgaQAAgHgCgEQgDgCgIAAIgJABIgHADIgFAGIgBAGIAAAXIgLAAIAAgjIAAgFIgBgGIALAAIAAAEIAAAEIABAAIADgEIAFgCIAHgCIAIgBIAKABIAGACIADADIACADQAEgEAFgDQAGgCAIAAQAHAAAFABQAFACADACQADADACADIABAIIAAAcg");
	this.shape_42.setTransform(98.3,-207);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgOAXQgHgCgFgDQgFgEgDgEQgDgFAAgFQAAgEADgFQADgFAFgDQAFgDAHgBQAHgDAHAAQAIAAAHADQAHABAFADQAFADACAFQADAFAAAEQAAAFgDAFQgCAEgFAEQgFADgHACQgHABgIABQgHgBgHgBgAgJgPQgFACgDACQgDACgCADQgCAEAAACQAAAEACADQACADADACQADADAFABQAEABAFAAQAFAAAFgBQAFgBADgDIAFgFQACgDAAgEQAAgCgCgEQgBgDgEgCIgIgEIgKgBIgJABg");
	this.shape_43.setTransform(87.55,-206.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgEgDgEQgDgFAAgFQAAgEADgFQADgEAEgEQAFgCAHgCQAGgDAIAAQAHAAAHADQAHABAGAEIgKAGQgDgDgFgCIgJgBIgKABQgEACgDACIgFAFQgBAEAAACQAAAEACADIAEAFQADADAFABQAEABAFAAQALAAAGgFIAJAFQgFAEgHACQgHABgHABQgIgBgGgBg");
	this.shape_44.setTransform(79.725,-206.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgEADgFQADgFAEgDQAFgDAHgBQAGgDAHAAQAIAAAGACQAGACAEADQAFADACAFQADAEAAAFIAAACIg4AAIACAGIAFAFIAHAEIAIAAQAHAAAGgBQAFgCAEgEIAJAFQgGAFgIADQgHACgKAAQgHgBgHgBgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_45.setTransform(67.525,-206.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AATAYIAAgbQAAgGgEgEQgEgCgIAAIgJABIgHADIgDAGIgBAGIAAAXIgNAAIAAgjIAAgFIAAgGIALAAIABAEIAAAEIAAAAIADgEIAGgCIAGgCIAHgBQAHAAAFABQAFACADACIAFAGQACAEAAAEIAAAcg");
	this.shape_46.setTransform(59.15,-207);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgVAiQgLgDgHgEQgHgFgFgHQgEgHABgIQgBgHAEgHQAFgHAHgFQAHgFALgCQAKgDALAAQAMAAALADQAJACAIAFQAIAFAEAHQADAHAAAHQAAAIgDAHQgEAHgIAFQgIAEgJADQgLADgMAAQgLAAgKgDgAgQgaQgIACgFAEQgGAEgDAGQgDAFAAAFQAAAGADAFQADAGAGAEQAFAEAIACQAHACAJAAQAJAAAIgCQAIgCAGgEQAFgEADgGQADgFAAgGQAAgFgDgFQgDgGgFgEQgGgEgIgCQgIgCgJAAQgJAAgHACg");
	this.shape_47.setTransform(48.75,-208.125);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgNAXQgHgCgEgDQgFgEgCgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgCAHAAQAIABAGABQAGACAEADQAFADACAFQADAFAAAEIAAACIg4AAIACAHIAFAEIAHAEIAIABQAHgBAGgBQAFgCAEgEIAJAFQgGAFgIACQgHACgKABQgHAAgHgCgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_48.setTransform(285.175,-195);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgFAXIgdgtIAOAAIAVAjIAAAAIAVgjIANAAIgcAtg");
	this.shape_49.setTransform(277.375,-194.975);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgOAYIgIgDQgEgCgCgCQgCgDAAgDQAAgGAFgDQAEgDAHgBQAHgCAHAAIAOgBIAEAAIAAgBQAAgFgEgDQgFgCgIAAIgLABQgFABgEADIgIgFQAGgEAHgCQAIgCAGAAQAQAAAHAGQAHAFAAAJIAAAUIAAADIABAEIgLAAIgBgDIAAgDQgEADgGACQgGACgHABIgKgBgAgLADQgGACAAAFQAAAFAEACQAFABAGAAIAIgBQAEgBADgCIAEgEIABgGIAAgDIgMAAQgKAAgHACg");
	this.shape_50.setTransform(269.725,-195);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AAUAXIgUgjIAAAAIgRAjIgNAAIgWgtIAMAAIAQAiIABAAIASgiIAMAAIASAiIAQgiIANAAIgXAtg");
	this.shape_51.setTransform(260.4,-194.975);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgNAXQgHgCgEgDQgFgEgCgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgCAHAAQAIABAGABQAGACAEADQAFADACAFQADAFAAAEIAAACIg4AAIACAHIAFAEIAHAEIAIABQAHgBAGgBQAFgCAEgEIAJAFQgGAFgIACQgHACgKABQgHAAgHgCgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_52.setTransform(246.525,-195);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AATAmIAAgcQAAgGgEgEQgEgCgIAAIgJABIgHADIgEAGIgBAHIAAAXIgMAAIAAhLIAMAAIAAAkIAEgDIAFgDIAGgBIAHgBQAHAAAFABQAFACADACIAFAFQACAEAAAEIAAAdg");
	this.shape_53.setTransform(238.175,-196.425);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AALAfIgKgCQgEgBgBgCIgDgEIgBgHIAAgZIgPAAIAAgGIAPAAIAAgNIALAAIAAANIAUAAIAAAGIgUAAIAAAXIAAAEIABADQAAABABAAQAAABAAAAQABAAAAAAQABAAAAABIAGABIAGgBIAEgBIABAHIgHACIgGAAg");
	this.shape_54.setTransform(231.3,-195.6);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgJAmIAAgnIgPAAIAAgGIAPAAIAAgLIABgIQACgDADgDQADgDAEgBQAEgBAIAAIAEAAIAFABIgCAHIgIgBIgHABIgEADQAAAAgBABQAAAAAAABQAAAAAAABQgBABAAAAIAAAGIAAAJIARAAIAAAGIgRAAIAAAng");
	this.shape_55.setTransform(222.45,-196.475);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgOAXQgHgCgFgDQgFgDgDgFQgCgEAAgGQAAgEACgFQADgEAFgDQAFgEAHgCQAHgCAHAAQAIAAAHACQAHACAFAEQAFADADAEQACAFAAAEQAAAGgCAEQgDAFgFADQgFADgHACQgHACgIAAQgHAAgHgCgAgJgPQgFACgDACQgDACgCADQgCADAAADQAAAEACADQACADADACQADADAFABQAFABAEABQAGgBAEgBQAFgBAEgDIAEgFQACgDAAgEQAAgDgCgDQgBgDgDgCIgJgEIgKgBIgJABg");
	this.shape_56.setTransform(215.4,-195);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgNAXQgHgCgEgDQgFgEgCgEQgDgFAAgFQAAgEADgFQADgEAEgDQAFgEAHgCQAGgCAHAAQAIABAGABQAGACAEADQAFADACAFQADAFAAAEIAAACIg4AAIACAHIAFAEIAHAEIAIABQAHgBAGgBQAFgCAEgEIAJAFQgGAFgIACQgHACgKABQgHAAgHgCgAgOgNQgGAEgBAGIArAAQAAgGgGgEQgFgDgKAAQgJAAgGADg");
	this.shape_57.setTransform(202.625,-195);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_58.setTransform(196.65,-196.425);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgDgDgFQgDgEAAgGQAAgEADgEQADgFAEgDQAFgEAHgCQAGgCAIAAQAHAAAHACQAHACAGAEIgKAGQgDgEgFgBIgJgBIgKABQgEACgDACIgFAFQgBADAAADQAAAEACADIAEAFQADADAFABQAEABAFABQALgBAGgFIAJAGQgFADgHACQgHACgHAAQgIAAgGgCg");
	this.shape_59.setTransform(191.475,-195);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgbAjIgFgBIABgHIAEABIAEAAQAGAAADgCQADgCACgEIAEgIIgdguIAOAAIAVAjIAVgjIANAAIgiA4IgDAFIgFAFIgGACIgJABIgFAAg");
	this.shape_60.setTransform(183.975,-193.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgDgDgFQgDgEAAgGQAAgEADgEQADgFAEgDQAFgEAHgCQAGgCAIAAQAHAAAHACQAHACAGAEIgKAGQgDgEgFgBIgJgBIgKABQgEACgDACIgFAFQgBADAAADQAAAEACADIAEAFQADADAFABQAEABAFABQALgBAGgFIAJAGQgFADgHACQgHACgHAAQgIAAgGgCg");
	this.shape_61.setTransform(176.975,-195);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgFADgEQADgFAEgDQAFgDAHgBQAGgCAHAAQAIAAAGABQAGACAEADQAFADACAEQADAFAAAFIAAADIg4AAIACAFIAFAFIAHADIAIABQAHAAAGgBQAFgCAEgDIAJAEQgGAGgIACQgHABgKAAQgHABgHgCgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_62.setTransform(273.475,-206.65);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AALAeIgKgBQgEAAgCgCIgCgGIgBgGIAAgYIgPAAIAAgHIAPAAIAAgOIALAAIAAAOIAUAAIAAAHIgUAAIAAAWIAAAEIABADQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAIAFABIAGAAIAEgBIABAHIgGABIgHAAg");
	this.shape_63.setTransform(266.6,-207.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgFADgEQADgFAEgDQAFgDAHgBQAGgCAHAAQAIAAAGABQAGACAEADQAFADACAEQADAFAAAFIAAADIg4AAIACAFIAFAFIAHADIAIABQAHAAAGgBQAFgCAEgDIAJAEQgGAGgIACQgHABgKAAQgHABgHgCgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_64.setTransform(259.825,-206.65);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_65.setTransform(253.85,-208.075);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgkAkIAAhFIALAAIAAAHIABAAIALgGQAHgCAGAAQAIAAAIACQAGABAFADQAFAEADAEQACAFAAAFQAAAFgCAFQgDADgFADQgFAEgGACQgHACgHgBQgJABgGgDQgIgDgDgEIgBAAIAAAggAgKgaQgEABgEADQgDACgBAEQgDADAAADQAAAEADADQABADADACQAEACAEABQAFABAFAAQAFAAAFgBQAEgBAEgCIAFgFQACgDAAgEQAAgDgCgDQgCgEgDgCIgIgEIgKgBIgKABg");
	this.shape_66.setTransform(247.65,-205.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AApAYIAAgbIAAgEIgDgFIgFgDIgJgBIgGABIgHADIgDAFIgCAFIAAAaIgLAAIAAgZQAAgIgCgEQgDgDgIAAIgJABIgHAEIgFAGIgBAGIAAAXIgLAAIAAgiIAAgGIgBgGIALAAIAAAEIAAAEIABAAIADgDIAFgDIAHgCIAIgBIAKABIAGADIADACIACADQAEgEAFgDQAGgCAIAAQAHAAAFABQAFACADADQADACACADIABAIIAAAcg");
	this.shape_67.setTransform(236.45,-206.7);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgOAXQgHgCgFgDQgFgEgDgEQgDgFAAgFQAAgFADgEQADgFAFgDQAFgDAHgBQAHgCAHAAQAIAAAHACQAHABAFADQAFADACAFQADAEAAAFQAAAFgDAFQgCAEgFAEQgFADgHACQgHACgIgBQgHABgHgCgAgJgPQgFABgDADQgDACgCAEQgCADAAACQAAAEACADQACADADADQADACAFABQAEABAFAAQAFAAAFgBQAFgBADgCIAFgGQACgDAAgEQAAgCgCgDQgBgEgEgCIgIgEIgKgBIgJABg");
	this.shape_68.setTransform(225.7,-206.65);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgJAXQgHgCgFgDQgEgEgDgEQgDgFAAgFQAAgEADgFQADgEAEgEQAFgDAHgBQAGgCAIAAQAHAAAHACQAHABAGAEIgKAFQgDgDgFgBIgJgBIgKABQgEABgDADIgFAGQgBADAAACQAAAEACADIAEAGQADACAFABQAEABAFAAQALABAGgGIAJAFQgFAEgHACQgHACgHgBQgIABgGgCg");
	this.shape_69.setTransform(217.875,-206.65);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgNAXQgHgCgEgEQgFgDgCgEQgDgFAAgFQAAgFADgEQADgFAEgDQAFgDAHgBQAGgCAHAAQAIAAAGABQAGACAEADQAFADACAEQADAFAAAFIAAADIg4AAIACAFIAFAFIAHADIAIABQAHAAAGgBQAFgCAEgDIAJAEQgGAGgIACQgHABgKAAQgHABgHgCgAgOgMQgGADgBAGIArAAQAAgGgGgDQgFgEgKAAQgJAAgGAEg");
	this.shape_70.setTransform(205.675,-206.65);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AATAYIAAgbQAAgGgEgEQgDgDgJAAIgJABIgHAEIgDAGIgBAGIAAAXIgNAAIAAgiIAAgGIAAgGIALAAIABAEIAAAEIAAAAIADgDIAGgDIAGgCIAHgBQAHAAAFABQAFACADADIAFAFQACAEAAAEIAAAcg");
	this.shape_71.setTransform(197.3,-206.7);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgVAiQgLgDgHgEQgHgFgFgHQgEgHAAgIQAAgHAEgHQAFgHAHgFQAHgFALgCQAKgDALAAQAMAAALADQAJACAIAFQAIAFAEAHQADAHAAAHQAAAIgDAHQgEAHgIAFQgIAEgJADQgLADgMAAQgLAAgKgDgAgQgaQgIACgFAEQgGAEgDAGQgDAFAAAFQAAAGADAFQADAGAGAEQAFAEAIACQAHACAJAAQAJAAAIgCQAIgCAGgEQAFgEADgGQADgFAAgGQAAgFgDgFQgDgGgFgEQgGgEgIgCQgIgCgJAAQgJAAgHACg");
	this.shape_72.setTransform(186.9,-207.825);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#3FBFFF").s().p("AgWAPQgIgGgBgJQABgIAIgGQAKgGAMAAQAOAAAIAGQAJAGAAAIQAAAJgJAGQgIAGgOAAQgMAAgKgGg");
	this.shape_73.setTransform(162.5,-219.05);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#4781B4").s().p("AgWAPQgIgGgBgJQABgIAIgGQAKgGAMAAQAOAAAIAGQAKAGgBAIQABAJgKAGQgIAGgOAAQgMAAgKgGg");
	this.shape_74.setTransform(304.5,-219.05);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FF0000").s().p("ALHFnQgCgCgBgDIAAg8QABgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCACgDABQgDgBgCgCgArQFjQgCgCgBgDIAAg8QABgEACgCQACgCADAAQADAAACACQACACABAEIAAA8QgBADgCACQgCACgDAAQgDAAgCgCgALHDvQgCgCgBgDIAAg8QABgDACgCQACgCADgBQADABACACQACACABADIAAA8QgBADgCACQgCACgDABQgDgBgCgCgArQDrQgCgCgBgEIAAg7QABgEACgCQACgCADAAQADAAACACQACACABAEIAAA7QgBAEgCACQgCACgDAAQgDAAgCgCgALHB3QgCgCgBgDIAAg8QABgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCACgDAAQgDAAgCgCgArQBzQgCgCgBgDIAAg9QABgDACgCQACgCADAAQADAAACACQACACABADIAAA9QgBADgCACQgCACgDAAQgDAAgCgCgALHAAQgCgCgBgDIAAg8QABgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCABgDABQgDgBgCgBgArQgEQgCgCgBgDIAAg8QABgEACgCQACgCADAAQADAAACACQACACABAEIAAA8QgBADgCACQgCACgDAAQgDAAgCgCgALHh4QgCgCgBgDIAAg8QABgDACgCQACgCADgBQADABACACQACACABADIAAA8QgBADgCACQgCACgDABQgDgBgCgCgArQh8QgCgCgBgEIAAg7QABgEACgCQACgCADAAQADAAACACQACACABAEIAAA7QgBAEgCACQgCACgDAAQgDAAgCgCgALHjwQgCgCgBgDIAAg8QABgDACgCQACgCADAAQADAAACACQACACABADIAAA8QgBADgCACQgCACgDAAQgDAAgCgCgArQj0QgCgCgBgDIAAg9QABgDACgCQACgCADAAQADAAACACQACACABADIAAA9QgBADgCACQgCACgDAAQgDAAgCgCgAq0laQgCgCgBgDQAAgDABgCQACgDADAAIAOgBIAuAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIguAAIgLABIgCABIgEgCgAKylZIgOgBIguAAQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIAuAAIAQABQADAAACADQACACgBADQAAADgCACQgBAAgBABQAAAAgBAAQAAAAgBAAQgBABAAAAIgBgBgAH+laQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAGGlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAEOlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgACWlaQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAAelaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAhZlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAjRlaQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAlJlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACAAADQAAADgCACQgCACgDAAgAnBlaQgDAAgCgCQgCgCAAgDQAAgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAgAo5laQgDAAgCgCQgCgCgBgDQABgDACgCQACgCADAAIA8AAQADAAACACQACACABADQgBADgCACQgCACgDAAg");
	this.shape_75.setTransform(233.55,-184.5002);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17,p:{x:106.3,y:-210.525}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12,p:{x:36.425,y:-196.225}},{t:this.shape_11},{t:this.shape_10,p:{x:49.1,y:-198.875}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{x:90.625,y:-198.875}},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{x:129.825,y:-197.425}},{t:this.shape}]},28).to({state:[{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_17,p:{x:115.7,y:-208.375}},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_12,p:{x:45.825,y:-194.075}},{t:this.shape_36},{t:this.shape_10,p:{x:58.5,y:-196.725}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_5,p:{x:100.025,y:-196.725}},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_1,p:{x:139.225,y:-195.275}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]},16).to({state:[]},77).wait(4));

	// Layer 11
	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("Ag6ARIAAgLIB1AAIAAALgAg6gFIAAgLIB1AAIAAALg");
	this.shape_76.setTransform(202.175,-77.85);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AhzBuIAAgfICNhUIAOgKIANgKQAGgGADgFQADgHAAgGQAAgIgFgHQgFgGgIgEQgIgFgMgCQgLgDgMAAQgZAAgRAJQgRAJgFAPIg0gCQAEgPAKgKQALgKAPgHQAPgHAUgEQAUgDAVAAQAYAAATAEQAVADAPAIQAQAHAIALQAJAMAAAOQAAALgFAJQgGAKgIAIQgJAIgKAGIgYAOIhzBFICxAAIAAAZg");
	this.shape_77.setTransform(305.95,-86.025);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgJAHQgEgDgBgEQABgDAEgDQAEgDAFAAQAGAAAFADQADADAAADQAAAEgDADQgFADgGAAQgFAAgEgDg");
	this.shape_78.setTransform(353,18.525);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgVA8IAMgPQAFgHAEgHQACgHACgIQACgHAAgJQAAgPgGgPQgIgQgNgNIAMgFQAPANAIARQAJARAAARQgBARgHARQgJARgPAOg");
	this.shape_79.setTransform(346.65,15.225);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgqAjIAAgMIA6gtIg4AAIAAgMIBQAAIAAAMIg6AuIA9AAIAAALg");
	this.shape_80.setTransform(338.725,15.9);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AApA0IAAgvIhQAAIAAAvIgWAAIAAhnIAWAAIAAArIBQAAIAAgrIAUAAIAABng");
	this.shape_81.setTransform(325.5,14.175);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgNAjQgJgRAAgSQAAgQAIgRQAJgRAOgOIAOAFIgNAPQgFAHgDAHQgDAHgCAHQgCAIAAAIQAAAQAHAPQAHAPAOANIgOAGQgOgOgIgQg");
	this.shape_82.setTransform(314.575,15.225);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AgqAjIAAgMIA6gtIg4AAIAAgMIBQAAIAAAMIg6AuIA9AAIAAALg");
	this.shape_83.setTransform(300.025,15.9);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AAAArQgFgCgDgDQgDgEgBgEIAAgIIAAgkIgXAAIAAgLIAXAAIAAgUIATAAIAAAUIAcAAIAAALIgcAAIAAAfIAAAGIACAFIAEAEQADABAGAAIAHAAIAHgCIAAAMIgJACIgJABQgMAAgGgDg");
	this.shape_84.setTransform(290.375,15.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AgdAkIAAhFIATAAIAAALIABAAQACgDADgCQADgDAEgBIAJgDIAJgBIAJABIAAAOIgGAAIgEgBQgPAAgHAGQgHAFgBALIAAAjg");
	this.shape_85.setTransform(283.15,15.825);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_86.setTransform(272.525,15.925);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AAaA4IAAgpQAAgFgCgEQgCgDgDgCIgIgCIgIgBIgLABQgFABgEACQgEADgCAEQgDAFAAAGIAAAkIgTAAIAAhvIATAAIAAA1IABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAEAAAHIAAAtg");
	this.shape_87.setTransform(260.275,13.825);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AgXAiQgJgDgIgHIAPgIIALAGQAGACAIAAIAHAAIAHgCIAEgDQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgDgDgCIgGgDIgIgBIgHgBIgMgDIgKgCIgHgGQgDgDAAgFQAAgGAEgEQADgEAGgCQAFgDAHgBIAOgCQAKAAAKADQAKADAFAGIgPAHIgJgEQgFgCgHAAQgGAAgFACQgGACAAADQAAAEADABIAHADIAIACIAIABIAMADQAGABAEACQAEACACADQACAEAAAFQAAAGgDAEQgEAEgGADQgGACgIABIgOACQgNAAgKgDg");
	this.shape_88.setTransform(243.025,15.925);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AgJA0IAAhFIATAAIAABFgAgJgjQgFgDAAgEQAAgEAFgCQAEgDAFAAQAGAAAEADQAFACgBAEQABAEgFADQgEADgGAAQgFAAgEgDg");
	this.shape_89.setTransform(235.65,14.175);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AgoA0IgJgBIACgMIAMABIAIgBIAFgCIAEgEIAEgEIAGgLIgrhGIAWAAIAfA2IAAAAIAeg2IAUAAIgxBUIgFAJIgGAGQgEADgGABQgGACgHAAIgJgBg");
	this.shape_90.setTransform(221.4,17.675);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AgOAiQgKgDgHgFQgHgEgEgHQgEgHAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDALAAQAMAAAKADQALADAHAFIgPAKQgFgEgGgCQgGgCgJAAQgHAAgGACQgGACgEADQgEAEgCAEQgCAFAAADQAAAFACAFQADAEAEADQAEAEAHABQAFACAHAAQAJAAAGgCQAGgCAFgEIAOAKQgIAGgKACQgKADgMAAQgLAAgKgDg");
	this.shape_91.setTransform(211.025,15.925);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AAaAkIAAgoQAAgFgCgEQgCgDgDgCIgIgDIgIgBIgLABQgFABgEADQgEADgCAEQgDAFAAAFIAAAkIgTAAIAAhFIATAAIAAALIABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAFAAAHIAAAsg");
	this.shape_92.setTransform(199.175,15.825);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_93.setTransform(186.925,15.925);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgWAiQgHgCgFgCQgFgEgDgFQgDgFAAgHIAAgsIATAAIAAApQAAAEACAEIAGAFIAHAEIAJABQAFgBAGgBQAFgBAEgDQAEgDACgFQACgEAAgGIAAgjIAUAAIAABFIgUAAIAAgKIAAAAQgEAFgJAEQgJADgMAAQgHAAgHgCg");
	this.shape_94.setTransform(174.675,16);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AAjA1IAAgsQgGAGgKADQgKADgKAAQgMAAgKgDQgJgDgHgFQgHgFgEgFQgEgHAAgIQAAgIAEgGQAEgHAHgFQAHgFAJgDQAKgDAMAAQAKAAAKADQAKAEAGAFIAAgKIAUAAIAABngAgNglQgGACgEACQgFAEgCAEQgDAFAAAFQAAAFADAFQACAEAFACQAEAEAGACQAHACAHAAQAIAAAGgCQAGgCAFgEQAEgCACgEQADgFAAgFQAAgFgDgFQgCgEgEgEQgFgCgGgCQgGgCgIAAQgHAAgHACg");
	this.shape_95.setTransform(161.575,17.5);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_96.setTransform(148.975,15.925);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AgdAkIAAhFIATAAIAAALIABAAQACgDADgCQADgDAEgBIAJgDIAKgBIAIABIAAAOIgGAAIgEgBQgPAAgHAGQgHAFgBALIAAAjg");
	this.shape_97.setTransform(139.6,15.825);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AgNA5IAAg6IgXAAIAAgLIAXAAIAAgQQAAgOAIgHQAIgGATgBIAHAAIAIABIgDAMIgFgBIgGAAIgJABQgDABgCACQgCACgBADIAAAHIAAAQIAYAAIAAALIgYAAIAAA6g");
	this.shape_98.setTransform(131.4,13.75);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgNA5IAAg6IgXAAIAAgLIAXAAIAAgQQAAgOAIgHQAIgGATgBIAGAAIAIABIgBAMIgGgBIgGAAIgIABQgEABgCACQgCACAAADIgBAHIAAAQIAXAAIAAALIgXAAIAAA6g");
	this.shape_99.setTransform(117.95,13.75);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AgVAiQgKgDgHgFQgIgFgEgHQgFgGAAgIQAAgHAFgGQAEgHAIgFQAHgFAKgDQAKgDALAAQAMAAAKADQAKADAHAFQAIAFAEAHQAFAGgBAHQABAIgFAGQgEAHgIAFQgHAFgKADQgKADgMAAQgLAAgKgDgAgNgWQgHACgEADQgFAEgCAEQgDAFAAAEQAAAFADAFQACAEAFADQAEAEAHABQAGACAHAAQAIAAAGgCQAGgBAFgEQAFgDACgEQACgFAAgFQAAgEgCgFQgCgEgFgEQgFgDgGgCQgGgBgIAAQgHAAgGABg");
	this.shape_100.setTransform(107.8,15.925);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AAAArQgFgCgDgDQgDgEgBgEIAAgIIAAgkIgXAAIAAgLIAXAAIAAgUIATAAIAAAUIAcAAIAAALIgcAAIAAAfIAAAGIACAFIAEAEQADABAGAAIAHAAIAHgCIAAAMIgJACIgJABQgMAAgGgDg");
	this.shape_101.setTransform(90.575,15.025);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AgJA0IAAhFIATAAIAABFgAgJgjQgFgDAAgEQAAgEAFgCQAEgDAFAAQAGAAAEADQAFACgBAEQABAEgFADQgEADgGAAQgFAAgEgDg");
	this.shape_102.setTransform(84.35,14.175);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AAaAkIAAgoQAAgFgCgEQgCgDgDgCIgIgDIgIgBIgLABQgFABgEADQgEADgCAEQgDAFAAAFIAAAkIgTAAIAAhFIATAAIAAALIABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAFAAAHIAAAsg");
	this.shape_103.setTransform(75.575,15.825);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgWAiQgHgCgFgCQgFgEgDgFQgDgFAAgHIAAgsIATAAIAAApQAAAEACAEIAGAFQADADAEABIAJABQAFgBAGgBQAFgBAEgDQAEgDACgFQACgEAAgGIAAgjIAUAAIAABFIgUAAIAAgKIAAAAQgEAFgJAEQgJADgMAAQgHAAgHgCg");
	this.shape_104.setTransform(63.325,16);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_105.setTransform(44.975,15.925);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AAaA4IAAgpQAAgFgCgEQgCgDgDgCIgIgCIgIgBIgLABQgFABgEACQgEADgCAEQgDAFAAAGIAAAkIgTAAIAAhvIATAAIAAA1IABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAEAAAHIAAAtg");
	this.shape_106.setTransform(32.725,13.825);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AgKA0IAAhaIgyAAIAAgNIB5AAIAAANIgzAAIAABag");
	this.shape_107.setTransform(20.275,14.175);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AgHAMIgHgCIgEgFIgBgFQAAgCABgDIAEgEIAHgDIAHgBIAIABIAGADIAFAEQABADAAACIgBAFIgFAFQgCACgEAAIgIABIgHgBg");
	this.shape_108.setTransform(443.875,-2.6);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AgaA2QgKgDgHgFQgGgFgEgHQgEgGAAgIQAAgIADgHQAEgGAGgFQAGgFAJgDQAJgEAMAAQAJAAAJADQAJACAGAFIAAAAIAAgwIAhAAIAABvIgeAAIAAgKIgBAAIgFAEIgHAEIgKACIgJACQgMAAgKgDgAgRAGQgHAFAAAIQAAAIAHAFQAHAFALAAQANAAAHgFQAHgFAAgIQAAgIgHgFQgHgFgNAAQgLAAgHAFg");
	this.shape_109.setTransform(433.325,-6.825);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AATAlIAAgjIAAgGIgDgGQgBgDgEgBQgDgCgGAAQgGAAgEABQgEACgCADQgCACAAADIgBAGIAAAkIghAAIAAhHIAfAAIAAAKIABAAIAEgEIAHgEIAIgDIALgBQANAAAHADQAIADAEAEQAEAFACAGQABAGAAAHIAAAng");
	this.shape_110.setTransform(420.4,-5.025);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("AgWAjQgLgDgIgFQgIgFgFgHQgEgGAAgJQAAgIAEgHQAFgGAIgFQAIgFALgDQALgDALAAQAMAAALADQALADAIAFQAIAFAFAGQAEAHABAIQgBAJgEAGQgFAHgIAFQgIAFgLADQgLADgMAAQgLAAgLgDgAgTgMQgHAFAAAHQAAAIAHAFQAHAFAMAAQANAAAGgFQAIgFgBgIQABgHgIgFQgGgFgNAAQgMAAgHAFg");
	this.shape_111.setTransform(407.4,-4.925);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#000000").s().p("AgMAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQAJAAAKADQALACAIAFIgWAPQgDgCgEgCQgEgBgFAAQgMAAgHAFQgHAFAAAHQAAAIAHAFQAHAFAMAAQAFAAAEgCIAHgDIAWAPQgIAFgLACQgKADgJAAQgMAAgLgDg");
	this.shape_112.setTransform(395.825,-4.925);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_113.setTransform(383.775,-4.925);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AgZAjQgMgCgHgFIAUgPQAEAEAFACQAGACAHAAIAKgBQAEgBAAgDQAAgDgDgCIgKgCIgNgCIgNgDQgHgDgEgDQgEgEAAgGQAAgHAEgEQAEgFAGgDQAGgDAIgBQAJgCAHAAQAKAAALACQALADAHAFIgUANQgHgGgMAAIgHABQgEACAAADQAAADAEABIAJACIAOACQAHABAGADQAGACAEADQAFAEAAAHQgBAHgEAEQgFAFgHADQgHACgJABIgQACQgLAAgLgDg");
	this.shape_114.setTransform(372.35,-4.925);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AglAlIAAhHIAhAAIAAAMIABAAQAEgHAHgDQAIgEALAAIAFABIAGAAIAAAUIgHgBIgHAAQgKAAgFACQgGABgDAEQgCADgBAEIgBAJIAAAeg");
	this.shape_115.setTransform(356.725,-5.025);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_116.setTransform(345.475,-4.925);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#000000").s().p("Ag5A1IAAhnIAeAAIAAAJIABAAIAFgEIAHgDIAKgEIAKgBQALAAAKAEQAKACAHAFQAHAFADAHQAEAGAAAIQAAAIgDAHQgEAGgGAFQgGAFgJADQgJAEgMAAQgJAAgJgDQgJgCgGgEIAAAAIAAAogAgUgcQgHAFAAAJQAAAIAHAEQAHAEANABQALgBAHgEQAHgEAAgIQAAgJgHgFQgHgFgLAAQgNAAgHAFg");
	this.shape_117.setTransform(332.575,-3.35);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("AgaA2QgKgDgHgFQgGgFgEgHQgEgGAAgIQAAgIADgHQAEgGAGgFQAGgFAJgDQAJgEAMAAQAJAAAJADQAJACAGAFIAAAAIAAgwIAhAAIAABvIgeAAIAAgKIgBAAIgFAEIgHAEIgKACIgJACQgMAAgKgDgAgRAGQgHAFAAAIQAAAIAHAFQAHAFALAAQANAAAHgFQAHgFAAgIQAAgIgHgFQgHgFgNAAQgLAAgHAFg");
	this.shape_118.setTransform(311.525,-6.825);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_119.setTransform(298.625,-4.925);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#000000").s().p("AgMAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQAJAAAKADQALACAIAFIgWAPQgDgCgEgCQgEgBgFAAQgMAAgHAFQgHAFAAAHQAAAIAHAFQAHAFAMAAQAFAAAEgCIAHgDIAWAPQgIAFgLACQgKADgJAAQgMAAgLgDg");
	this.shape_120.setTransform(287.425,-4.925);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("AgfAiQgIgDgEgEQgFgFgBgGQgBgGgBgHIAAgnIAiAAIAAAjIAAAGIACAGQACADADABQADACAHAAQAFAAAEgBQAEgCACgDQACgCABgDIAAgGIAAgkIAiAAIAABHIggAAIAAgKIgBAAIgEAEIgGAEIgJADIgLABQgMAAgIgDg");
	this.shape_121.setTransform(275.35,-4.825);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("AgaA2QgKgDgHgFQgGgFgEgHQgEgGAAgIQAAgIADgHQAEgGAGgFQAGgFAJgDQAJgEAMAAQAJAAAJADQAJACAGAFIAAAAIAAgwIAhAAIAABvIgeAAIAAgKIgBAAIgFAEIgHAEIgKACIgJACQgMAAgKgDgAgRAGQgHAFAAAIQAAAIAHAFQAHAFALAAQANAAAHgFQAHgFAAgIQAAgIgHgFQgHgFgNAAQgLAAgHAFg");
	this.shape_122.setTransform(261.775,-6.825);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("AgWAjQgLgDgIgFQgIgFgEgHQgGgGABgJQgBgIAGgHQAEgGAIgFQAIgFALgDQALgDALAAQANAAAKADQALADAIAFQAIAFAFAGQAFAHgBAIQABAJgFAGQgFAHgIAFQgIAFgLADQgKADgNAAQgLAAgLgDgAgTgMQgGAFAAAHQAAAIAGAFQAIAFALAAQAMAAAIgFQAGgFABgIQgBgHgGgFQgIgFgMAAQgLAAgIAFg");
	this.shape_123.setTransform(248.5,-4.925);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("AglAlIAAhHIAhAAIAAAMIABAAQAEgHAHgDQAIgEALAAIAFABIAGAAIAAAUIgHgBIgHAAQgKAAgFACQgGABgDAEQgCADgBAEIgBAJIAAAeg");
	this.shape_124.setTransform(237.775,-5.025);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("Ag5A1IAAhnIAeAAIAAAJIABAAIAFgEIAHgDIAKgEIAKgBQALAAAKAEQAKACAHAFQAHAFADAHQAEAGAAAIQAAAIgDAHQgEAGgGAFQgGAFgJADQgJAEgMAAQgJAAgJgDQgJgCgGgEIAAAAIAAAogAgUgcQgHAFAAAJQAAAIAHAEQAHAEANABQALgBAHgEQAHgEAAgIQAAgJgHgFQgHgFgLAAQgNAAgHAFg");
	this.shape_125.setTransform(226.275,-3.35);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("AgZAjQgMgCgHgFIATgPQAFAEAFACQAGACAIAAIAJgBQAFgBgBgDQAAgDgDgCIgKgCIgNgCIgNgDQgHgDgEgDQgEgEAAgGQAAgHAEgEQADgFAHgDQAGgDAIgBQAJgCAHAAQAKAAALACQALADAIAFIgVANQgHgGgMAAIgHABQgEACAAADQAAADAEABIAJACIAOACQAHABAGADQAGACAFADQAEAEgBAHQAAAHgEAEQgEAFgIADQgGACgKABIgPACQgMAAgLgDg");
	this.shape_126.setTransform(207.4,-4.925);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_127.setTransform(195.975,-4.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("AgQAkIgshHIAkAAIAaAwIAAAAIAZgwIAiAAIgrBHg");
	this.shape_128.setTransform(183.525,-4.925);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AgbAkQgHgBgFgDQgFgDgDgEQgDgEAAgGQAAgGADgEQADgEAGgCIAOgEIAPgDIAPgBIAPAAQAAgGgGgDQgHgEgIAAQgHAAgHADQgHACgFAEIgSgMQAKgGAMgDQAMgDANAAQAOAAAJADQAKACAFAFQAGAFACAHQACAGAAAJIAAAkIgeAAIAAgJQgGAGgJACQgIADgKAAQgIAAgHgCgAADAFIgJABQgFABgEACQgEACAAAEQAAAEAFACQAFACAGAAIAIgBIAIgDIAGgEQACgCAAgEIAAgFIgIAAIgKABg");
	this.shape_129.setTransform(171.375,-4.925);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("AAWAkIgWgvIAAAAIgTAvIgiAAIgnhHIAjAAIAWAsIABAAIASgsIAjAAIAUAsIAAAAIAUgsIAiAAIgmBHg");
	this.shape_130.setTransform(156.425,-4.925);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_131.setTransform(134.425,-4.925);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#000000").s().p("AADAuQgGgBgGgCQgFgDgDgEQgCgEAAgGIAAgiIgVAAIAAgRIAVAAIAAgVIAgAAIAAAVIAdAAIAAARIgdAAIAAAYIAAAFIACAEQABACADABIAJAAIAHAAQAFAAACgBIAAASIgMACIgMAAQgIABgHgCg");
	this.shape_132.setTransform(123.45,-5.9);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_133.setTransform(112.825,-4.925);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#000000").s().p("AgQA4IAAhvIAgAAIAABvg");
	this.shape_134.setTransform(103.65,-6.925);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#000000").s().p("Ag5A1IAAhnIAeAAIAAAJIABAAIAFgEIAHgDIAKgEIAKgBQALAAAKAEQAKACAHAFQAHAFADAHQAEAGAAAIQAAAIgDAHQgEAGgGAFQgGAFgJADQgJAEgMAAQgJAAgJgDQgJgCgGgEIAAAAIAAAogAgUgcQgHAFAAAJQAAAIAHAEQAHAEANABQALgBAHgEQAHgEAAgIQAAgJgHgFQgHgFgLAAQgNAAgHAFg");
	this.shape_135.setTransform(94.225,-3.35);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#000000").s().p("AAzAlIAAgpQAAgFgDgEQgDgDgIAAQgGAAgEABQgEABgCADQgCACgBADIgBAGIAAAlIghAAIAAglIAAgFIgBgFQgBgDgEgBQgDgCgFAAQgGAAgFABQgDACgCADQgCACgBADIgBAGIAAAkIghAAIAAhHIAgAAIAAAKIAAAAIAFgEIAGgEIAJgDIAMgBQALAAAIAEQAIADAEAGQAGgHAJgDQAHgDAMAAQALAAAHADQAIACAEAEQAEAFACAFIACAMIAAAqg");
	this.shape_136.setTransform(77.35,-5.025);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#000000").s().p("AgWAjQgLgDgIgFQgIgFgFgHQgEgGAAgJQAAgIAEgHQAFgGAIgFQAIgFALgDQALgDALAAQANAAAKADQALADAIAFQAIAFAFAGQAEAHAAAIQAAAJgEAGQgFAHgIAFQgIAFgLADQgKADgNAAQgLAAgLgDgAgTgMQgGAFgBAHQABAIAGAFQAIAFALAAQAMAAAIgFQAGgFAAgIQAAgHgGgFQgIgFgMAAQgLAAgIAFg");
	this.shape_137.setTransform(61.1,-4.925);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("AgMAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQAJAAAKADQALACAIAFIgWAPQgDgCgEgCQgEgBgFAAQgMAAgHAFQgHAFAAAHQAAAIAHAFQAHAFAMAAQAFAAAEgCIAHgDIAWAPQgIAFgLACQgKADgJAAQgMAAgLgDg");
	this.shape_138.setTransform(49.525,-4.925);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#000000").s().p("AgTA4IAAg2IgVAAIAAgQIAVAAIAAgMQAAgHACgFQABgFAFgEQAEgEAHgCQAJgCANgBIAKAAIAJACIgBATIgFgBIgGgBQgIAAgEADQgEABAAAIIAAALIAZAAIAAAQIgZAAIAAA2g");
	this.shape_139.setTransform(33.425,-7);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#000000").s().p("AgWAjQgLgDgIgFQgIgFgEgHQgFgGgBgJQABgIAFgHQAEgGAIgFQAIgFALgDQALgDALAAQAMAAALADQALADAIAFQAIAFAFAGQAFAHAAAIQAAAJgFAGQgFAHgIAFQgIAFgLADQgLADgMAAQgLAAgLgDgAgSgMQgIAFAAAHQAAAIAIAFQAHAFALAAQANAAAGgFQAIgFAAgIQAAgHgIgFQgGgFgNAAQgLAAgHAFg");
	this.shape_140.setTransform(22.45,-4.925);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("AglAlIAAhHIAhAAIAAAMIABAAQAEgHAHgDQAIgEALAAIAFABIAGAAIAAAUIgHgBIgHAAQgKAAgFACQgGABgDAEQgCADgBAEIgBAJIAAAeg");
	this.shape_141.setTransform(5.225,-5.025);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_142.setTransform(-6.025,-4.925);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#000000").s().p("AgEA3IgKgCIgHgEIgFgEIgBAAIAAAKIgeAAIAAhvIAhAAIAAAwIAAAAQAGgFAJgCQAJgDAJAAQAMAAAJAEQAJADAGAFQAGAFAEAGQADAHAAAIQAAAIgEAGQgDAHgHAFQgHAFgKADQgKADgLAAQgGAAgEgCgAgUAGQgHAFAAAIQAAAIAHAFQAHAFANAAQALAAAHgFQAHgFAAgIQAAgIgHgFQgHgFgLAAQgNAAgHAFg");
	this.shape_143.setTransform(-18.925,-6.825);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#000000").s().p("AAzAlIAAgpQAAgFgDgEQgDgDgIAAQgGAAgEABQgDABgDADQgDACAAADIgBAGIAAAlIggAAIAAglIAAgFIgCgFQgCgDgDgBQgDgCgFAAQgHAAgEABQgDACgDADQgBACgBADIgBAGIAAAkIghAAIAAhHIAgAAIAAAKIAAAAIAEgEIAHgEIAJgDIALgBQAMAAAIAEQAIADAEAGQAHgHAIgDQAHgDANAAQAKAAAIADQAHACAEAEQAFAFACAFIABAMIAAAqg");
	this.shape_144.setTransform(-35.8,-5.025);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("AgfAiQgIgDgEgEQgFgFgBgGQgCgGAAgHIAAgnIAhAAIAAAjIABAGIACAGQACADADABQAEACAGAAQAFAAAEgBQAEgCACgDQACgCABgDIAAgGIAAgkIAiAAIAABHIggAAIAAgKIgBAAIgEAEIgHAEIgIADIgLABQgMAAgIgDg");
	this.shape_145.setTransform(-51.7,-4.825);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("AATAlIAAgjIAAgGIgDgGQgCgDgDgBQgDgCgGAAQgGAAgEABQgEACgCADQgCACAAADIgCAGIAAAkIggAAIAAhHIAfAAIAAAKIABAAIAEgEIAHgEIAIgDIALgBQANAAAHADQAIADAEAEQAEAFACAGQACAGgBAHIAAAng");
	this.shape_146.setTransform(-64.35,-5.025);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_147.setTransform(414.425,-25.725);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AASA4IAAgjIAAgHIgCgGQgCgDgDgBQgDgCgGAAQgGAAgEABQgEACgCADQgCACgBADIgBAHIAAAkIggAAIAAhvIAgAAIAAAyIABAAIAEgEIAGgEIAIgDIALgBQAMAAAJADQAHADAEAEQAEAFACAFQACAGgBAHIAAAog");
	this.shape_148.setTransform(401.75,-27.725);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("AADAuQgGgBgFgCQgGgDgCgEQgDgFgBgFIAAghIgVAAIAAgSIAVAAIAAgVIAgAAIAAAVIAdAAIAAASIgdAAIAAAXIABAFIACAEQACACADABIAIAAIAHAAQAEAAACgBIAAASIgLACIgLAAQgJABgHgCg");
	this.shape_149.setTransform(390.8,-26.7);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("AgaAjQgLgCgHgFIATgPQAFAEAFACQAGACAIAAIAJgBQAFgBgBgDQAAgDgDgCIgKgCIgNgCIgNgDQgHgDgEgDQgEgEAAgGQAAgHAEgEQADgFAHgDQAGgDAIgBQAIgCAIAAQALAAAKACQALADAIAFIgVANQgHgGgMAAIgHABQgEACAAADQAAADAEABIAKACIANACQAHABAGADQAGACAFADQADAEAAAHQAAAHgEAEQgEAFgIADQgHACgIABQgJACgHAAQgMAAgMgDg");
	this.shape_150.setTransform(374.9,-25.725);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#000000").s().p("AgPA2IAAhHIAgAAIAABHgAgNgfQgFgDAAgGQAAgFAFgEQAGgEAHAAQAIAAAFAEQAGAEAAAFQAAAGgGADQgFAEgIAAQgHAAgGgEg");
	this.shape_151.setTransform(366.95,-27.5);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_152.setTransform(351.275,-25.725);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("AgQAkIgshHIAkAAIAaAwIAAAAIAZgwIAiAAIgrBHg");
	this.shape_153.setTransform(338.825,-25.725);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#000000").s().p("AgbAkQgHgBgFgDQgFgDgDgEQgDgEAAgGQAAgGADgEQADgEAGgCIAOgEIAPgDIAPgBIAPAAQAAgGgGgDQgHgEgIAAQgHAAgHADQgHACgFAEIgSgMQAKgGAMgDQAMgDANAAQAOAAAJADQAKACAFAFQAGAFACAHQACAGAAAJIAAAkIgeAAIAAgJQgGAGgJACQgIADgKAAQgIAAgHgCgAADAFIgJABQgFABgEACQgEACAAAEQAAAEAFACQAFACAGAAIAIgBIAIgDIAGgEQACgCAAgEIAAgFIgIAAIgKABg");
	this.shape_154.setTransform(326.675,-25.725);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#000000").s().p("AAWAkIgWgvIAAAAIgTAvIgiAAIgnhHIAjAAIAWAsIABAAIASgsIAjAAIAUAsIAAAAIAUgsIAiAAIgmBHg");
	this.shape_155.setTransform(311.725,-25.725);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#000000").s().p("AgbAkQgHgBgFgDQgFgDgDgEQgDgEAAgGQAAgGADgEQADgEAGgCIAOgEIAPgDIAPgBIAPAAQAAgGgGgDQgHgEgIAAQgHAAgHADQgHACgFAEIgSgMQAKgGAMgDQAMgDANAAQAOAAAJADQAKACAFAFQAGAFACAHQACAGAAAJIAAAkIgeAAIAAgJQgGAGgJACQgIADgKAAQgIAAgHgCgAADAFIgJABQgFABgEACQgEACAAAEQAAAEAFACQAFACAGAAIAIgBIAIgDIAGgEQACgCAAgEIAAgFIgIAAIgKABg");
	this.shape_156.setTransform(290.025,-25.725);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("AgTA5IAAg2IgVAAIAAgRIAVAAIAAgMQAAgHACgFQABgFAFgEQAEgEAHgCQAJgDANAAIAKAAIAJABIgBAUIgFgCIgGAAQgIAAgEADQgEABAAAIIAAALIAZAAIAAARIgZAAIAAA2g");
	this.shape_157.setTransform(273.875,-27.8);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("AgWAjQgLgDgIgFQgIgFgEgHQgGgGAAgJQAAgIAGgHQAEgGAIgFQAIgFALgDQALgDALAAQAMAAALADQALADAIAFQAIAFAFAGQAFAHgBAIQABAJgFAGQgFAHgIAFQgIAFgLADQgLADgMAAQgLAAgLgDgAgTgMQgGAFAAAHQAAAIAGAFQAIAFALAAQAMAAAIgFQAGgFABgIQgBgHgGgFQgIgFgMAAQgLAAgIAFg");
	this.shape_158.setTransform(262.9,-25.725);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#000000").s().p("Ag5AyIAFgSQAHADAIAAIAJgBIAGgCIAEgEIADgFIACgFIguhHIAkAAIAaAwIAYgwIAhAAIgvBTIgHAKQgDAEgEAEQgEADgIABQgHABgMAAQgNAAgMgDg");
	this.shape_159.setTransform(243.55,-23.95);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("AgMAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQAJAAAKADQALACAIAFIgWAPQgDgCgEgCQgEgBgFAAQgMAAgHAFQgHAFAAAHQAAAIAHAFQAHAFAMAAQAFAAAEgCIAHgDIAWAPQgIAFgLACQgKADgJAAQgMAAgLgDg");
	this.shape_160.setTransform(232.575,-25.725);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("AATAlIAAgjIAAgGIgDgGQgCgDgDgBQgDgCgGAAQgGAAgEABQgEACgCADQgCACAAADIgCAGIAAAkIggAAIAAhHIAfAAIAAAKIABAAIAEgEIAHgEIAIgDIALgBQANAAAHADQAIADAEAEQAEAFACAGQACAGgBAHIAAAng");
	this.shape_161.setTransform(220.5,-25.825);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_162.setTransform(207.875,-25.725);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#000000").s().p("AgfAiQgIgDgEgEQgFgFgBgGQgBgGAAgHIAAgnIAgAAIAAAjIABAGIACAGQABADAEABQADACAHAAQAFAAAEgBQAEgCACgDQADgCAAgDIAAgGIAAgkIAhAAIAABHIgfAAIAAgKIAAAAIgFAEIgHAEIgIADIgLABQgMAAgIgDg");
	this.shape_163.setTransform(195.2,-25.625);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#000000").s().p("AAZA1IAAgoIAAAAQgGAEgJACQgJADgJAAQgMAAgJgEQgJgDgGgFQgGgFgEgGQgDgHAAgIQAAgHAEgHQAEgHAGgFQAHgFAKgCQAKgEAMAAIAJABIAKAEIAHADIAFAEIABAAIAAgKIAeAAIAABogAgRgcQgHAFAAAIQAAAJAHAFQAHADALAAQANAAAHgDQAHgFAAgJQAAgIgHgFQgHgFgNAAQgLAAgHAFg");
	this.shape_164.setTransform(181.625,-24.15);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("AgSAjQgLgDgIgFQgIgFgEgHQgFgGAAgJQAAgIAFgHQAEgGAIgFQAIgFALgDQALgDAMAAQALAAAJADQAKADAGAFQAHAFADAGQAEAHAAAIIAAAHIhMAAQACAGAHAEQAGAEAJAAQAIAAAGgDIAKgGIAXALQgIAHgMAEQgMAEgNAAQgMAAgLgDgAAWgHQAAgGgGgEQgGgEgJAAIgIABIgHAEIgFAEIgCAFIArAAIAAAAg");
	this.shape_165.setTransform(168.725,-25.725);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AglAlIAAhHIAhAAIAAAMIABAAQAEgHAHgDQAIgEALAAIAFABIAGAAIAAAUIgHgBIgHAAQgKAAgFACQgGABgDAEQgCADgBAEIgBAJIAAAeg");
	this.shape_166.setTransform(158.375,-25.825);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#000000").s().p("AgTA5IAAg2IgVAAIAAgRIAVAAIAAgMQAAgHACgFQABgFAFgEQAEgEAHgCQAJgDANAAIAKAAIAJABIgBAUIgFgCIgGAAQgIAAgEADQgEABAAAIIAAALIAZAAIAAARIgZAAIAAA2g");
	this.shape_167.setTransform(149.575,-27.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_168.setTransform(133.075,-25.675);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#000000").s().p("AAaA4IAAgpQAAgFgCgEQgCgDgDgCIgIgCIgIgBIgLABQgFABgEACQgEADgCAEQgDAFAAAGIAAAkIgTAAIAAhvIATAAIAAA1IABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAEAAAHIAAAtg");
	this.shape_169.setTransform(120.825,-27.775);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#000000").s().p("AAAArQgFgCgDgDQgDgEgBgEIAAgIIAAgkIgXAAIAAgLIAXAAIAAgUIATAAIAAAUIAcAAIAAALIgcAAIAAAfIAAAGIACAFIAEAEQADABAGAAIAHAAIAHgCIAAAMIgJACIgJABQgMAAgGgDg");
	this.shape_170.setTransform(110.125,-26.575);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#000000").s().p("AgRASIAPgjIAUAAIgSAjg");
	this.shape_171.setTransform(97.225,-22.075);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#000000").s().p("AgXAiQgJgDgIgHIAPgIIALAGQAGACAIAAIAHAAIAHgCIAEgDQABAAAAgBQABAAAAAAQAAgBAAgBQAAAAAAgBQAAgDgDgCIgGgDIgIgBIgHgBIgMgDIgKgCIgHgGQgDgDAAgFQAAgGAEgEQADgEAGgCQAFgDAHgBIAOgCQAKAAAKADQAKADAFAGIgPAHIgJgEQgFgCgHAAQgGAAgFACQgGACAAADQAAAEADABIAHADIAIACIAIABIAMADQAGABAEACQAEACACADQACAEAAAFQAAAGgDAEQgEAEgGADQgGACgIABIgOACQgNAAgKgDg");
	this.shape_172.setTransform(89.325,-25.675);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#000000").s().p("AgXA2QgJgDgHgFQgHgFgEgHQgEgGAAgIQAAgIAEgHQAEgFAHgFQAHgFAJgDQAKgDAMAAQAKAAAKADQAKAEAGAFIAAg0IAUAAIAABvIgUAAIAAgKQgGAFgKADQgKAEgKAAQgMAAgKgDgAgNgCQgGACgEACQgFAEgCAEQgDAFAAAFQAAAFADAFQACAEAFADQAEAEAGABQAHACAHAAQAIAAAGgCQAGgBAFgEQAEgDACgEQADgFAAgFQAAgFgDgFQgCgEgEgEQgFgCgGgCQgGgBgIAAQgHAAgHABg");
	this.shape_173.setTransform(77.625,-27.675);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#000000").s().p("AgdAkIAAhFIAUAAIAAALIAAAAQACgDADgCQADgDAEgBIAIgDIAKgBIAJABIgBAOIgEAAIgGgBQgOAAgGAGQgJAFABALIAAAjg");
	this.shape_174.setTransform(67.9,-25.775);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#000000").s().p("AgVAiQgKgDgIgFQgHgFgFgHQgDgGAAgIQAAgHADgGQAFgHAHgFQAIgFAKgDQAKgDALAAQALAAAKADQALADAHAFQAIAFAEAHQAEAGABAHQgBAIgEAGQgEAHgIAFQgHAFgLADQgKADgLAAQgLAAgKgDgAgOgWQgGACgEADQgEAEgDAEQgDAFABAEQgBAFADAFQADAEAEADQAEAEAGABQAHACAHAAQAIAAAGgCQAHgBAEgEQAEgDACgEQADgFAAgFQAAgEgDgFQgCgEgEgEQgEgDgHgCQgGgBgIAAQgHAAgHABg");
	this.shape_175.setTransform(56.9,-25.675);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#000000").s().p("AAbAjIgbgzIAAAAIgZAzIgVAAIgihFIAWAAIAXA0IABAAIAZg0IAUAAIAaA0IABAAIAWg0IAVAAIgiBFg");
	this.shape_176.setTransform(42,-25.7);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#000000").s().p("AgdAkIAAhFIAUAAIAAALIAAAAQACgDAEgCQADgDADgBIAIgDIAKgBIAJABIgBAOIgEAAIgGgBQgOAAgGAGQgJAFABALIAAAjg");
	this.shape_177.setTransform(23.9,-25.775);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_178.setTransform(13.275,-25.675);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#000000").s().p("AAaA4IAAgpQAAgFgCgEQgCgDgDgCIgIgCIgIgBIgLABQgFABgEACQgEADgCAEQgDAFAAAGIAAAkIgTAAIAAhvIATAAIAAA1IABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAEAAAHIAAAtg");
	this.shape_179.setTransform(1.025,-27.775);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#000000").s().p("AAAArQgFgCgDgDQgDgEgBgEIAAgIIAAgkIgXAAIAAgLIAXAAIAAgUIATAAIAAAUIAcAAIAAALIgcAAIAAAfIAAAGIACAFIAEAEQADABAGAAIAHAAIAHgCIAAAMIgJACIgJABQgMAAgGgDg");
	this.shape_180.setTransform(-9.675,-26.575);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#000000").s().p("AgVAiQgKgDgHgFQgIgFgFgHQgDgGAAgIQAAgHADgGQAFgHAIgFQAHgFAKgDQAKgDALAAQALAAAKADQALADAHAFQAIAFAEAHQAFAGgBAHQABAIgFAGQgEAHgIAFQgHAFgLADQgKADgLAAQgLAAgKgDgAgOgWQgGACgEADQgFAEgCAEQgCAFgBAEQABAFACAFQACAEAFADQAEAEAGABQAHACAHAAQAIAAAGgCQAHgBAEgEQAEgDADgEQACgFAAgFQAAgEgCgFQgDgEgEgEQgEgDgHgCQgGgBgIAAQgHAAgHABg");
	this.shape_181.setTransform(-19.75,-25.675);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("AAaAkIAAgoQAAgFgCgEQgCgDgDgCIgIgDIgIgBIgLABQgFABgEADQgEADgCAEQgDAFAAAFIAAAkIgTAAIAAhFIATAAIAAALIABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAFAAAHIAAAsg");
	this.shape_182.setTransform(-38.525,-25.775);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#000000").s().p("AgKA0IAAhnIAVAAIAABng");
	this.shape_183.setTransform(-47.7,-27.425);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().s("#FFEB8C").ss(2.9,1,1).p("EArNgFzMhWYAAAQgpAAAAAbIAAKyQAAAaApAAMBWYAAAQApAAAAgaIAAqyQAAgbgpAAg");
	this.shape_184.setTransform(186.55,-6.625);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFC85D").s().p("EgrLAF0QgpAAAAgaIAAqyQAAgbApAAMBWYAAAQAoAAAAAbIAAKyQAAAagoAAg");
	this.shape_185.setTransform(186.55,-6.625);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FF8610").s().p("AtCD4Qh4AAAAhRIAAlNQAAhRB4AAIaFAAQB4AAAABRIAAFNQAABRh4AAgAuIiQIAAEmQAABHByAAIYtAAQByAAAAhHIAAkmQAAhHhyAAI4tAAQhyAAAABHg");
	this.shape_186.setTransform(311.025,-85.475);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFEAD").s().p("AsWDbQhyAAAAhHIAAknQAAhHByAAIYtAAQByAAAABHIAAEnQAABHhyAAg");
	this.shape_187.setTransform(311.05,-85.225);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#000000").s().p("AgXA2QgJgDgHgFQgHgFgEgHQgEgGAAgIQAAgIAEgHQAEgFAHgFQAHgFAJgDQAKgDAMAAQAKAAAKADQAKAEAGAFIAAg0IAUAAIAABvIgUAAIAAgKQgGAFgKADQgKAEgKAAQgMAAgKgDgAgNgCQgGACgEACQgFAEgCAEQgDAFAAAFQAAAFADAFQACAEAFADQAEAEAGABQAHACAHAAQAIAAAGgCQAGgBAFgEQAEgDACgEQADgFAAgFQAAgFgDgFQgCgEgEgEQgFgCgGgCQgGgBgIAAQgHAAgHABg");
	this.shape_188.setTransform(138.025,-78.825);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#000000").s().p("AAaAkIAAgoQAAgFgCgEQgCgDgDgCQgDgDgFgBIgIAAIgLABQgFABgEADQgEADgCAEQgDAFAAAFIAAAkIgTAAIAAhFIATAAIAAALIABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAFAAAHIAAAsg");
	this.shape_189.setTransform(125.425,-76.925);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#000000").s().p("AgVAiQgKgDgIgFQgHgFgFgHQgDgGAAgIQAAgHADgGQAFgHAHgFQAIgFAKgDQAKgDALAAQALAAAKADQALADAHAFQAIAFAEAHQAEAGAAAHQAAAIgEAGQgEAHgIAFQgHAFgLADQgKADgLAAQgLAAgKgDgAgOgWQgGACgEADQgFAEgCAEQgCAFgBAEQABAFACAFQACAEAFADQAEAEAGABQAHACAHAAQAIAAAGgCQAGgBAFgEQAEgDACgEQADgFAAgFQAAgEgDgFQgCgEgEgEQgFgDgGgCQgGgBgIAAQgHAAgHABg");
	this.shape_190.setTransform(112.8,-76.825);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#000000").s().p("AgOAiQgKgDgHgFQgHgEgEgHQgEgHAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDALAAQAMAAAKADQALADAHAFIgPAKQgFgEgGgCQgGgCgJAAQgHAAgGACQgGACgEADQgEAEgCAEQgCAFAAADQAAAFACAFQADAEAEADQAEAEAHABQAFACAHAAQAJAAAGgCQAGgCAFgEIAOAKQgIAGgKACQgKADgMAAQgLAAgKgDg");
	this.shape_191.setTransform(101.375,-76.825);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_192.setTransform(89.525,-76.825);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#000000").s().p("AgXAiQgJgDgIgHIAPgIIALAGQAGACAIAAIAHAAIAHgCIAEgDQABAAAAgBQAAAAABAAQAAgBAAgBQAAAAAAgBQAAgDgDgCIgGgDIgIgBIgHgBIgMgDIgKgCIgHgGQgDgDAAgFQAAgGAEgEQADgEAGgCQAFgDAHgCIAOgBQAKAAAKADQAKADAFAGIgPAHIgJgEQgFgCgHAAQgGAAgFACQgGACAAADQAAADADACIAHADIAIACIAIABIAMADQAGABAEACQAEACACADQACAEAAAFQAAAGgDAEQgEAEgGADQgGACgIABIgOACQgNAAgKgDg");
	this.shape_193.setTransform(78.375,-76.825);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#000000").s().p("AAKA0IAAhXIgbASIgNgKIAqgYIATAAIAABng");
	this.shape_194.setTransform(60.25,-78.575);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#000000").s().p("AAaAkIAAgoQAAgFgCgEQgCgDgDgCQgDgDgFgBIgIAAIgLABQgFABgEADQgEADgCAEQgDAFAAAFIAAAkIgTAAIAAhFIATAAIAAALIABAAQAEgGAJgDQAJgEALAAQAIAAAHACQAHABAFAEQAFADADAFQADAFAAAHIAAAsg");
	this.shape_195.setTransform(43.075,-76.925);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#000000").s().p("AgJA0IAAhFIATAAIAABFgAgKgjQgEgDAAgEQAAgEAEgCQAFgDAFAAQAGAAAEADQAFACgBAEQABAEgFADQgEADgGAAQgFAAgFgDg");
	this.shape_196.setTransform(34.3,-78.575);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#000000").s().p("AgXAiQgJgDgIgHIAPgIIALAGQAGACAIAAIAHAAIAHgCIAEgDQABAAAAgBQAAAAABAAQAAgBAAgBQAAAAAAgBQAAgDgDgCIgGgDIgIgBIgHgBIgMgDIgKgCIgHgGQgDgDAAgFQAAgGAEgEQADgEAGgCQAFgDAHgCIAOgBQAKAAAKADQAKADAFAGIgPAHIgJgEQgFgCgHAAQgGAAgFACQgGACAAADQAAADADACIAHADIAIACIAIABIAMADQAGABAEACQAEACACADQACAEAAAFQAAAGgDAEQgEAEgGADQgGACgIABIgOACQgNAAgKgDg");
	this.shape_197.setTransform(20.525,-76.825);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_198.setTransform(9.675,-76.825);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#000000").s().p("AgOAiQgKgDgHgFQgHgEgEgHQgEgHAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDALAAQAMAAAKADQALADAHAFIgPAKQgFgEgGgCQgGgCgJAAQgHAAgGACQgGACgEADQgEAEgCAEQgCAFAAADQAAAFACAFQADAEAEADQAEAEAHABQAFACAHAAQAJAAAGgCQAGgCAFgEIAOAKQgIAGgKACQgKADgMAAQgLAAgKgDg");
	this.shape_199.setTransform(-1.325,-76.825);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#000000").s().p("AgWAiQgHgCgFgDQgFgDgDgFQgDgFAAgHIAAgsIATAAIAAAoQAAAGACADIAGAGIAHACIAJABQAFAAAGgBQAFgBAEgDQAEgDACgEQACgFAAgGIAAgjIAUAAIAABFIgUAAIAAgLIAAAAQgEAGgJADQgJAEgMAAQgHAAgHgCg");
	this.shape_200.setTransform(-13.175,-76.75);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#000000").s().p("AgXA2QgJgDgHgFQgHgFgEgHQgEgGAAgIQAAgIAEgHQAEgFAHgFQAHgFAJgDQAKgDAMAAQAKAAAKADQAKAEAGAFIAAg0IAUAAIAABvIgUAAIAAgKQgGAFgKADQgKAEgKAAQgMAAgKgDgAgNgCQgGACgEACQgFAEgCAEQgDAFAAAFQAAAFADAFQACAEAFADQAEAEAGABQAHACAHAAQAIAAAGgCQAGgBAFgEQAEgDACgEQADgFAAgFQAAgFgDgFQgCgEgEgEQgFgCgGgCQgGgBgIAAQgHAAgHABg");
	this.shape_201.setTransform(-26.275,-78.825);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#000000").s().p("AgVAiQgKgDgIgFQgHgFgEgHQgFgGAAgIQAAgHAFgGQAEgHAHgFQAIgFAKgDQAKgDALAAQAMAAAKADQAKADAHAFQAIAFAEAHQAFAGAAAHQAAAIgFAGQgEAHgIAFQgHAFgKADQgKADgMAAQgLAAgKgDgAgNgWQgHACgEADQgEAEgDAEQgCAFAAAEQAAAFACAFQADAEAEADQAEAEAHABQAGACAHAAQAIAAAGgCQAGgBAFgEQAFgDACgEQACgFAAgFQAAgEgCgFQgCgEgFgEQgFgDgGgCQgGgBgIAAQgHAAgGABg");
	this.shape_202.setTransform(-39.25,-76.825);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#000000").s().p("AgdAkIAAhFIATAAIAAALIABAAQACgDADgCQADgDAEgBIAJgDIAKgBIAIABIAAAOIgGAAIgEgBQgPAAgHAGQgHAFgBALIAAAjg");
	this.shape_203.setTransform(-49.05,-76.925);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("Ag2A4IAAhuIAUAAIAAAKIAAAAQAGgFAKgDQAKgDAKAAQAMAAAKACQAJADAHAFQAHAFAEAGQAEAIAAAHQAAAIgEAGQgEAGgHAGQgHAEgJADQgKADgMAAQgKAAgKgEQgKgDgGgFIAAAAIAAAzgAgOgqQgGACgFAEQgEADgDAFQgCAEAAAFQAAAGACAEQADAFAEADQAFACAGABQAGACAIAAQAHAAAHgCQAGgBAEgCQAFgDACgFQADgEAAgGQAAgFgDgEQgCgFgFgDQgEgEgGgCQgHgBgHAAQgIAAgGABg");
	this.shape_204.setTransform(-60.025,-74.85);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#000000").s().p("AgXAiQgJgDgIgHIAPgIIALAGQAGACAIAAIAHAAIAHgCIAEgDQABAAAAgBQAAAAABAAQAAgBAAgBQAAAAAAgBQAAgDgDgCIgGgDIgIgBIgHgBIgMgDIgKgCIgHgGQgDgDAAgFQAAgGAEgEQADgEAGgCQAFgDAHgCIAOgBQAKAAAKADQAKADAFAGIgPAHIgJgEQgFgCgHAAQgGAAgFACQgGACAAADQAAADADACIAHADIAIACIAIABIAMADQAGABAEACQAEACACADQACAEAAAFQAAAGgDAEQgEAEgGADQgGACgIABIgOACQgNAAgKgDg");
	this.shape_205.setTransform(203.925,-97.675);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_206.setTransform(193.075,-97.675);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#000000").s().p("AgJAjIgqhFIAWAAIAfA0IAdg0IAVAAIgoBFg");
	this.shape_207.setTransform(181.45,-97.7);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#000000").s().p("AgWAjIgMgEQgFgCgCgEQgDgEgBgFQAAgHAFgFQAFgEAHgCQAIgDAKgBQAKgCAMAAIAOAAIAAgCQAAgDgBgDIgFgFIgHgDIgLgBIgJAAIgIACIgHADIgFADIgMgJQAIgFALgCQAMgDAJAAQAMAAAIACQAJACAEADQAGADACAFQADAEAAAEIAAAjIAAAHIABAGIgSAAIAAgLIgBAAQgHAHgIADQgKADgLAAQgHAAgGgCgAACACIgNACQgGABgEADQgEACAAAFQAAAGAGACQAGADAKAAQAIAAAGgCQAFgCAEgDIAFgGIABgHIAAgFIgKAAIgOABg");
	this.shape_208.setTransform(170.1,-97.675);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#000000").s().p("AAbAjIgbgzIAAAAIgZAzIgVAAIgihFIAWAAIAXA0IABAAIAZg0IAUAAIAaA0IABAAIAWg0IAVAAIgiBFg");
	this.shape_209.setTransform(156.2,-97.7);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_210.setTransform(135.625,-97.675);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#000000").s().p("AAAArQgFgCgDgDQgDgEgBgEIAAgIIAAgkIgXAAIAAgLIAXAAIAAgUIATAAIAAAUIAcAAIAAALIgcAAIAAAfIAAAGIACAFIAEAEQADABAGAAIAHAAIAHgCIAAAMIgJACIgJABQgMAAgGgDg");
	this.shape_211.setTransform(124.925,-98.575);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_212.setTransform(115.225,-97.675);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#000000").s().p("AgJA4IAAhvIATAAIAABvg");
	this.shape_213.setTransform(106.45,-99.775);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#000000").s().p("Ag2A4IAAhuIAUAAIAAAKIAAAAQAGgGAKgDQAKgCAKAAQAMgBAKADQAJADAHAFQAHAFAEAGQAEAIAAAHQAAAIgEAHQgEAGgHAFQgHAEgJADQgKADgMAAQgKAAgKgDQgKgEgGgFIAAAAIAAAzgAgOgqQgGADgFACQgEAEgDAFQgCAEAAAFQAAAFACAFQADAFAEADQAFACAGABQAGADAIAAQAHAAAHgDQAGgBAEgCQAFgDACgFQADgFAAgFQAAgFgDgEQgCgFgFgEQgEgCgGgDQgHgBgHAAQgIAAgGABg");
	this.shape_214.setTransform(97.325,-95.7);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#000000").s().p("AA7AkIAAgmIgBgIQgBgDgCgDQgCgDgFgCQgEgBgIAAQgOAAgGAFQgGAGAAAKIAAAlIgTAAIAAgkIgBgJQAAgEgDgDQgCgDgEgCQgFgBgHAAIgKABQgFABgEADQgEADgCAEQgCAFAAAFIAAAkIgUAAIAAhFIATAAIAAALIAAAAIAEgEQACgCAFgCQAEgCAGgBQAGgCAGAAQAMAAAIADQAHAEAFAGQAFgGAJgEQAKgDAJAAQAMAAAIADQAIADAEAEQAEAEACAGQACAFAAAGIAAAog");
	this.shape_215.setTransform(80.975,-97.775);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#000000").s().p("AgVAiQgKgDgIgFQgHgFgFgHQgDgGAAgIQAAgHADgGQAFgHAHgFQAIgFAKgDQAKgDALAAQALAAAKADQALADAHAFQAIAFAEAHQAEAGABAHQgBAIgEAGQgEAHgIAFQgHAFgLADQgKADgLAAQgLAAgKgDgAgOgWQgGACgEADQgFAEgCAEQgCAFgBAEQABAFACAFQACAEAFADQAEAEAGABQAHACAHAAQAIAAAGgCQAGgBAFgEQAEgDACgEQADgFAAgFQAAgEgDgFQgCgEgEgEQgFgDgGgCQgGgBgIAAQgHAAgHABg");
	this.shape_216.setTransform(65.1,-97.675);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#000000").s().p("AgOAiQgKgDgHgFQgHgEgEgHQgEgHAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDALAAQAMAAAKADQALADAHAFIgPAKQgFgEgGgCQgGgCgJAAQgHAAgGACQgGACgEADQgEAEgCAEQgCAFAAADQAAAFACAFQADAEAEADQAEAEAHABQAFACAHAAQAJAAAGgCQAGgCAFgEIAOAKQgIAGgKACQgKADgMAAQgLAAgKgDg");
	this.shape_217.setTransform(53.675,-97.675);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#000000").s().p("AgNA4IAAg5IgXAAIAAgLIAXAAIAAgQQAAgOAIgHQAIgGATAAIAHAAIAHABIgCALIgFgBIgGAAIgJABQgDABgCACQgCACgBADIAAAHIAAAQIAYAAIAAALIgYAAIAAA5g");
	this.shape_218.setTransform(38.15,-99.85);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#000000").s().p("AgVAiQgKgDgIgFQgHgFgEgHQgEgGgBgIQABgHAEgGQAEgHAHgFQAIgFAKgDQAKgDALAAQALAAAKADQALADAHAFQAIAFAEAHQAEAGABAHQgBAIgEAGQgEAHgIAFQgHAFgLADQgKADgLAAQgLAAgKgDgAgOgWQgGACgEADQgEAEgDAEQgDAFABAEQgBAFADAFQADAEAEADQAEAEAGABQAHACAHAAQAIAAAGgCQAHgBAEgEQAEgDACgEQADgFAAgFQAAgEgDgFQgCgEgEgEQgEgDgHgCQgGgBgIAAQgHAAgHABg");
	this.shape_219.setTransform(28,-97.675);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#000000").s().p("AgdAkIAAhFIATAAIAAALIABAAQACgDAEgCQACgDAEgBIAJgDIAKgBIAIABIAAAOIgGAAIgEgBQgPAAgHAGQgHAFgBALIAAAjg");
	this.shape_220.setTransform(11.7,-97.775);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#000000").s().p("AgUAiQgKgDgHgFQgHgFgEgHQgDgGAAgIQAAgHAEgHQAEgGAHgFQAHgFAKgDQAKgDAKAAQAOAAAKADQAJAEAHAFQAGAFADAHQACAGAAAGIAAAFIhSAAQAAAEADAEQADAEAEACQAFADAHACIAMABQAJAAAHgDQAHgDAGgEIAOAHQgQAPgeAAQgLAAgKgDgAgLgXQgGABgEADQgFADgCAEQgCAEAAADIA9AAIgCgIQgCgEgEgCQgDgDgGgCQgGgBgHAAQgGAAgGACg");
	this.shape_221.setTransform(1.075,-97.675);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#000000").s().p("AgSA1QgKgDgGgFIAAAAIAAAKIgUAAIAAhvIAUAAIAAA0IAAAAQAGgFAKgEQAKgDAKAAQAMAAAKADQAJADAHAFQAHAFAEAFQAEAHAAAIQAAAIgEAGQgEAHgHAFQgHAFgJADQgKADgMAAQgKAAgKgEgAgOgCQgGACgFACQgEAEgDAEQgCAFAAAFQAAAFACAFQADAEAEADQAFAEAGABQAGACAIAAQAHAAAHgCQAGgBAEgEQAFgDACgEQADgFAAgFQAAgFgDgFQgCgEgFgEQgEgCgGgCQgHgBgHAAQgIAAgGABg");
	this.shape_222.setTransform(-11.525,-99.675);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#000000").s().p("AA7AkIAAgmIgBgIQgBgDgCgDQgCgDgFgCQgEgBgIAAQgOAAgGAFQgGAGAAAKIAAAlIgTAAIAAgkIgBgJQAAgEgDgDQgCgDgEgCQgFgBgHAAIgKABQgFABgEADQgEADgCAEQgCAFAAAFIAAAkIgUAAIAAhFIATAAIAAALIAAAAIAEgEQACgCAFgCQAEgCAGgBQAGgCAGAAQAMAAAIADQAHAEAFAGQAFgGAJgEQAKgDAJAAQAMAAAIADQAIADAEAEQAEAEACAGQACAFAAAGIAAAog");
	this.shape_223.setTransform(-27.875,-97.775);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#000000").s().p("AgWAiQgHgBgFgEQgFgDgDgFQgDgFAAgHIAAgsIATAAIAAApQAAAFACADIAGAFIAHAEIAJABQAFAAAGgCQAFgBAEgDQAEgDACgFQACgEAAgGIAAgjIAUAAIAABFIgUAAIAAgKIAAAAQgEAFgJAEQgJADgMAAQgHAAgHgCg");
	this.shape_224.setTransform(-43.375,-97.6);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#000000").s().p("AApA0IhWhUIgBAAIAABUIgUAAIAAhnIAbAAIBVBVIAAAAIAAhVIAWAAIAABng");
	this.shape_225.setTransform(-58.25,-99.425);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f().s("#74492A").ss(4,1,1).p("Egy7gIwMBl3AAAQB7AAAAB7IAANrQAAB7h7AAMhl3AAAQh7AAAAh7IAAtrQAAh7B7AAg");
	this.shape_226.setTransform(260.475,-88.7123,1,0.6693);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFCC66").s().p("Egy7AIxQh7AAAAh7IAAtrQAAh7B7AAMBl3AAAQB7AAAAB7IAANrQAAB7h7AAg");
	this.shape_227.setTransform(260.475,-88.7123,1,0.6693);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76}]},124).wait(1));

	// Layer 10
	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#BFE8FF").s().p("Eg0/AJQIAAyfMBp/AAAIAASfg");
	this.shape_228.setTransform(247.425,-61.2);
	this.shape_228._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_228).wait(124).to({_off:false},0).wait(1));

	// Layer 9
	this.instance = new lib.adse();
	this.instance.parent = this;
	this.instance.setTransform(555.05,-171.8,1,1,0,0,0,599.9,-171.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(124).to({_off:false},0).wait(1));

	// Layer 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EhRGATpQi4AAAAjLMAAAgg6QAAjMC4AAMCiPAAAQC2AAAADMMAAAAg6QAADLi2AAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:182.2,y:-159.975}).wait(124).to({graphics:null,x:0,y:0}).wait(1));

	// Layer 5
	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#583720").s().p("AhNgEIAZgHIBDgMIgBgBIAAAAIACAAIABgBIAAAAIAlgDQALgBATAEIABgBIgEAHQgCABABAFQgFgBgCADIgIAJQgDAFADADIgBAAIgWAEIgBAAIgFABIAAAAIgBAAIhpATQgZgUASgOg");
	this.shape_229.setTransform(-156.2312,-166.61);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#C59064").s().p("ADBBjIgDgBQgLgMgJgNQgTgbAXgJIADAIQASAdAWAZIgBAAIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAgBgBAAQAAAAAAABQgBAAAAAAQgLgUgRgVQgHgHgDgIQgGgYAdAHQABAGAEAHQAVAaANAaQAAALgMAAIgKgCgACHA7IgFABIAFgCIAAABIAXgFQAGAZATAOQgbgPgVgTgAD2BaIAAAAIgCgBQgKgggaggIgCgDQAMgBAKgIIANAEQAGALAJANQAMAQACAPQAGATgUAAIgKgBgAEUBOQgDgfgZgcQAMADANACIAGAAQAJAOAGAPQALAZgXAAIgGAAgAiHAcQgmgCgygPIAAAAIgLgCIgJgDQgngKgJgNQgWgXA7gaQAIgEASgHIABAAIACAAIBEAIIBZALIByAUIA5AKIAFgBIAUgGIAagGQALgCAfADQAdAEArAhIgCABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAAAAAQAIARARgCQgOAHgWgFQgEABgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBAAQgVgIgTgNQAQAPASAGIgBAAIAHAEIAMAEQgKAEgLACIgEAAIgGABIgCAAQgWAAgbgLQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQATAKAPADIAAAAQgUgEgLABIgkAEIgBAAIgBABIgDAAQhAAFgrABIgtABQgsgBgtgCgAjghNIAhgYIAfAcg");
	this.shape_230.setTransform(-165.5843,-171.5);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#DFF4FF").s().p("AAnAsIhnhXICBBTIgZAEg");
	this.shape_231.setTransform(-183.925,-183.275);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#000000").s().p("AC7CCQgigHgbggIgDgEIABAAIABAAIAFgBQAVATAbAQQgTgPgGgYIAAABQgCgEADgGIAHgJQADgCAFAAQgCgFACAAIAFgHIgBAAIAAAAQgPgEgTgJQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAbAMAWAAIACAAIAGgBIAEgBQALgBAKgEIgMgFIgHgDIABAAQgSgIgQgOQATANAVAJQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAJAEgCQAWAGAOgIQgRACgIgRQgBAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gKIhygTIhZgLIhEgIIgCAAIADAAIBAADIgfgcIg8g1IACgHIABAAIBoBZIACAAIAMABQBOAHA0AKIBnASIACABIARgFQAIgDAogDQAngBAjAUQAeAUAVAUIABABIABAAIAAACIgCABQgDAGgIAAQAhAhgXAYQgGAGgLgDIgBAAIAAADQAAAHgJACQgMADgIgGQAFAPgVgBQgIAAgEgDQgEAFgGAAQgHAAgKgFgAClBlQAJANALALIADACQAOAGAJgGIAAgBIAAAAIABAAQgWgZgSgdIgDgHQgXAJATAbgADYB9IgBACQAWAFAAgPQgNgagVgZQgEgHgBgHQgdgGAGAXQADAIAHAIQARAVALATIABAAIACAAgADJAyIACACQAaAhAKAfIACABIAAAAQAfAGgHgYQgCgPgMgQQgJgMgGgMIgNgDQgKAHgMACgAEPBpQAfAEgNgdQgGgPgJgOIgGAAQgNgBgMgDQAZAcADAegAEZAmIgMgKIgEACIgBAAQAIAEAJAEIAAAAgAhdBEQhWAAgygOQgygOgSgSIABgNQAJANAnALIAJADIALADIAAAAQAyAPAmACQBDADBDgBQArgBBAgGIADAAIgCAAIABAAIAAABIhDAMQg5AEgyAAIgWAAg");
	this.shape_232.setTransform(-165.0527,-174.25);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#583720").s().p("AAcAUIgEAAIgDAAIhsgJQgLgWAagJIAcgBQAnABARACIAMABQATACAUAFQALACAQAIIABgBIgIAEQgDAAgBAGQgFgCgEACQgIADgEADQgHAEAAADg");
	this.shape_233.setTransform(-163.426,-160.25);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#DFF4FF").s().p("AgvgiIgBAAIADgNIBeBGIgjAZg");
	this.shape_234.setTransform(-184.5,-183.8);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#000000").s().p("ACLCyQgHgCgBgFQgNAJgLgPQgcgOgFgjIAAgEIADAAIAEAAQAHAXAQAUQgJgSAJgXIAAAAQAAgDAHgEQAEgEAIgDQAEgBAFABQABgFADAAIAIgFIgBAAIABAAQgMgHgLgMQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQASAQAUAGIACABIAGAAQAAAAAAAAQABABAAAAQABAAABgBQAAAAABAAQALACAMgCQgFgDgDgEIgFgEIABAAQgMgLgGgRQAKAQAOAOQABgBAAAAQAAAAAAAAQABAAAAABQAAAAAAABIABAAIAKAHQAMANAFAAQAQAKASgEQgQgCADgRQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIABAAQgSgogZgJQgbgLgLAAIgcgBIgWgBIgEAAIgvgWQgvgXgugVIg6gaIgJgEQgmgQgMgGIgEgDIADABIACABIASAFQAQAFAgAQIgFgDQBJAaAqAXIBUAoIABABIAUAAQAJgBAmAHQAlAJATAbQAPAYAHAXIABABIAAABIgBACIgCABQgGADgJgBQALAlglAQQgIAEgJgGIgBAAIgCADQgFAHgJgBQgMgBgFgHQgEALgLAAIgJgBgACICoIgCABQAQALAKgOQAEgbgDgcQABgHACgGQgWgNgJAXQgCAIABAIQADAXgCAUIABAAIACABgACpBkQAEAigLAgIACAAIgBABQAaAMAIgXQAHgOAAgRQgBgNABgMIgJgGQgOAFgMgCIAAADgABoCGQAAAOADAMIACADQAJAIAMgDIAAAAIABAAQgEgcABgeIABgHQgaACABAdgADGCjQAbALAGgdQAEgPAAgOIgFgCQgLgEgKgGQAGAfgRAcgADwBeQAEAGAGAFQgCgGgDgFIgEAAIAAAAIgBAAgAAIBGQhCgNg2gPQhQgVgngcQgngcATgFIAWAUQAUAUA8AUQA7ATBAAOIBJASQgTgCgUABgAhWhMIABgBIAAABgAiQhdIgGgBIgOgRIgFgGIgsg3IAHgFIABgBIA+BTIACADIgDgBg");
	this.shape_235.setTransform(-168.725,-169.4125);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#C59064").s().p("ACKCOIABgCQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAQACgUgDgWQgBgJACgIQAJgWAWANQgDAFAAAHQADAdgEAaQgGAIgIAAQgFAAgHgEgACnCLIAAgBIgBAAQAKgggDgiIAAgDQAMACAOgFIAJAHQgBAMABANQAAAQgHAOQgFAPgNAAQgHAAgJgEgABxCHIgCgCQgDgNAAgNQgBgdAagDIgCAHQAAAeAEAcIgCAAIAAAAIgFABQgIAAgHgGgADKCIQAQgcgFggQAJAGAMAEIAFADQAAAOgEAPQgEAUgQAAQgGAAgHgCgABVBUIAXACIAAAAQgJAXAJASQgQgUgHgXgADcBMQgEAAgNgMIgKgIIgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgPgOgJgPQAGAQALALIAAABIAFADQADAFAEACQgLADgLgDQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBIgFAAIgCAAQgVgHgRgQQAAAAgBAAQAAABAAAAQAAAAABAAQAAABAAAAQALANAMAGIAAABQgQgIgLgCQgUgFgTgCIgNgBQgRgCgngBQATAAAUABIhKgRQg/gOg8gTQg7gUgVgVIgVgUIgHgHIAGAEIAAgCIgBgDQgCgGADgUIADgMIAFgQIAIgEIAGABIAFAAQASgBAQACIABABIAVgOIAFAGIANARIgDgBIAEADQAMAHAmAQIAJADIA5AaQAvAVAvAYIAvAXIAEgBIAWABIAcAAQALAAAbALQAZAJASApIgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgDASARABIgKABQgNAAgMgHg");
	this.shape_236.setTransform(-169.1,-166.65);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#C59064").s().p("ADBBjIgDgCQgLgLgJgMQgTgcAXgIIADAHQASAcAWAZIgBABIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgLgUgRgUQgHgIgDgJQgGgXAdAHQABAGAEAHQAVAZANAaQAAAMgMAAIgKgCgACHA7IgFABIAFgBIAAAAIAXgFQAGAZATAPQgbgQgVgTgAD2BaIAAgBIgCAAQgKgggaggIgCgCQAMgCAKgHIANADQAGAMAJAMQAMAQACAOQAGAUgUAAIgKgBgAEUBNQgDgdgZgdQAMADANABIAGABQAJAOAGAOQALAagXAAIgGgBgAiHAdQgmgDgygOIAAAAIgLgDIgJgDQgngKgJgOQgWgWA7gaQAIgFASgFIABgBIACABIBEAHIBZAMIByATIA5AJIAFgBIAUgFIAagFQALgCAfADQAdADArAhIgCAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQAIARARgDQgOAJgWgHQgEACgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBABQgVgJgTgNQAQAOASAIIgBAAIAHACIAMAFQgKAFgLABIgEAAIgGABIgCABQgWgBgbgMQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQATAKAPADIAAABQgUgFgLACIgkADIgBAAIgBAAIgDAAQhAAGgrABIgtAAQgtAAgsgBgAjghNIAhgZIAfAcg");
	this.shape_237.setTransform(-165.5343,-171.55);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#000000").s().p("AC7CBQgigFgbghIgDgDIABgBIABAAIAFgBQAVAUAbAPQgTgPgGgYIAAAAQgCgDADgGIAHgJQADgCAFABQgCgGACgBIAFgHIgBABIAAgBQgPgDgTgJQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAbAMAWAAIACgBIAGAAIAEAAQALgCAKgFIgMgEIgHgDIABAAQgSgIgQgOQATAMAVAKQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAIAEgBQAWAGAOgIQgRADgIgSQgBgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gJIhygUIhZgMIhEgHIgCgBIADAAIBAAEIgfgcIg8g1IACgHIABABIBoBYIACAAIAMABQBOAIA0AJIBnATIACABIARgGQAIgDAogCQAngCAjAVQAeASAVAVIABABIABAAIAAADIgCABQgDAEgIABQAhAhgXAYQgGAGgLgEIgBAAIAAADQAAAJgJABQgMACgIgGQAFAQgVAAQgIAAgEgFQgEAGgGAAQgHAAgKgGgAClBlQAJANALALIADACQAOAGAJgGIAAAAIAAAAIABgBQgWgZgSgcIgDgIQgXAIATAcgADYB+IgBABQAWAFAAgPQgNgagVgaQgEgGgBgGQgdgIAGAYQADAIAHAIQARAUALAVIABgBIACABgADJAyIACADQAaAfAKAhIACAAIAAABQAfAEgHgXQgCgPgMgQQgJgMgGgLIgNgEQgKAHgMACgAEPBpQAfADgNgcQgGgPgJgNIgGgBQgNgBgMgEQAZAdADAegAEZAlIgMgJIgEABIgBAAQAIAFAJADIAAAAgAhdBDQhWAAgygNQgygOgSgTIABgMQAJANAnAMIAJADIALACIAAAAQAyAPAmACQBDADBDgCQArgBBAgFIADAAIgCABIABAAIAAAAIhDAMQg5AEgyAAIgWgBg");
	this.shape_238.setTransform(-165.0027,-174.3);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#583720").s().p("AhAAkIASgSQAGgKAPgJIAHgGIAUgRIABAAIAFgFIAWgQQAPgLATgGIAAAAIABgBIgBAJQgBABAEAEQgFABgBAEIgCALQABAHADACIgRAPIgGAEIhRBFQgfgFAIgXg");
	this.shape_239.setTransform(-156.4231,-185.35);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#C59064").s().p("AjfCFQgXgEgOgJQgVgMgFgHIACgGIABgBQgXgTAOAIIAIAGQAHABABgCQALgMANgKQADAAAEgBIAbgTQAJgCAzgWIAMgFIBAgZIBsgpQArgPAMgGQAAAAABgBQABAAAAAAQAAgBAAAAQABAAAAgBIAPgOIAUgSQAIgIAcgNQAbgMA1AHIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQARALAMgLQgHAOgWAGQgDADgVADIgOADIgBABQAAgBgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgXADgXgCQAVAEAUgCIgBABIAHgBIANgCQgGAJgIAHIgEACIgEADIgDACQgTAKgcAEQAAAAAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQAVgCAPgEIAAAAQgTAHgPAKIgWARIgFAEIgBABIgVARIhEAoQg5Akg7AfQg9AfgjACIgQABQgIAAgHgBgADbgEQgOgEgPgHQgfgNAQgUIAGAGQAeAPAgALIgBABIABAAQgFAJgPACIgEAAgACZgKIARgPIAAABIAAgBQASASAYADQggABgbgHgADzgSQgTgLgZgKQgJgDgIgFQgQgSAcgIQAEAFAHAEQAfAMAYAPQAHANgVAHQAAAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAAAgAEHgnIgCABQgYgXgngPQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAKgHAEgLIAOgEIAZANQASAIAKALQARARgeAMgADmhlQAMgCAMgHIAFgCQAPAHANAKQAZATgdAMQgRgZgkgMg");
	this.shape_240.setTransform(-167.1141,-185.2998);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#000000").s().p("AjuCMQgdgEgPgKQgPgKAEgPIABgBQAEAGAVAMQAPAJAXAEQALADATgCQAkgDA8gfQA8gfA4gjIBFgpIgIAGQgOAJgHAKQg5Ang0AdQhKArgnAJQgaAFgWAAIgVgBgAi1AXIA3gZQAqgUA2gTIBOgdQAagJABgBIAJgLQAGgHAggWQAigVApABQAjABAcAIIACAAIABAAIABACIgBABQAAAGgHAFQAtAMgIAgQgBAIgMACIgBABIABADQAEAHgGAFQgJAIgLgBQAMALgSAKQgGAEgGgBQAAANgXAAQghALgngNIgEgCIAFgEQAcAGAfAAQgYgEgRgSIAAABIAAAAQgEgDgBgGIACgLQACgEAEgBQgEgEACgCIAAgIIAAAAQgQAFgUACQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQAdgDATgLIACgBIAFgEIADgCQAJgHAGgJIgNACIgHABIAAAAQgTACgVgEQAXABAXgCQAAgBAAAAQABAAAAAAQABgBAAAAQAAABABAAIAAgBIAOgDQAWgDACgDQAWgGAIgNQgNAKgQgLQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAIABgBQg2gIgbAMQgbANgJAIIgTASIgQAPQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAgBAAQgLAGgrAPIhsApIhBAZIgLAFQg0AXgIABIArgVgAC4gQQAOAGAPAEIAEABQAPgCAEgKIAAAAIAAgBQgfgLgegPIgHgFQgPATAfAOgADwgTQAVgGgHgOQgZgPgegMQgHgEgFgFQgcAJARARQAHAGAKADQAZAJATAMIABgBIACABgAEBgoIAAAAQAdgLgRgRQgKgMgSgIIgZgMIgNADQgEAMgLAHQABAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAmAPAZAWIABAAIABAAgAD3hvQgMAGgMADQAkAMASAYQAcgMgZgTQgNgKgPgGIgFACgADpiAIASgBIgPgCIgCADIAAAAIgBAAgAigAGIABABIgBAAIAAgBg");
	this.shape_241.setTransform(-166.4874,-185.1266);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#000000").s().p("AC7CCQgigHgbggIgDgEIABAAIABAAIAFgBQAVATAbAQQgTgPgGgYIAAABQgCgEADgGIAHgJQADgCAFAAQgCgFACAAIAFgHIgBAAIAAAAQgPgEgTgJQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAbAMAWAAIACAAIAGgBIAEgBQALgBAKgEIgMgFIgHgDIABAAQgSgIgQgOQATANAVAJQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAJAEgCQAWAGAOgIQgRACgIgRQgBAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gKIhygTIhZgLIhEgIIgCAAIADAAIBAADIgfgcIg8g1IACgHIABAAIBoBZIACAAIAMABQBOAHA0AKIBnASIACABIARgFQAIgDAogDQAngBAjAUQAeAUAVAUIABABIABAAIAAACIgCABQgDAGgIAAQAhAhgXAYQgGAGgLgDIgBAAIAAADQAAAHgJACQgMADgIgGQAFAPgVgBQgIAAgEgDQgEAFgGAAQgHAAgKgFgAClBlQAJANALALIADACQAOAGAJgGIAAgBIAAAAIABAAQgWgZgSgdIgDgHQgXAJATAbgADYB9IgBACQAWAFAAgPQgNgagVgZQgEgHgBgHQgdgGAGAXQADAIAHAIQARAVALATIABAAIACAAgADJAyIACACQAaAhAKAfIACABIAAAAQAfAGgHgYQgCgPgMgQQgJgMgGgMIgNgDQgKAHgMACgAEPBpQAfAEgNgdQgGgPgJgOIgGAAQgNgBgMgDQAZAcADAegAEIAeQAIAEAJAEIgMgKIgEACIAAgBIgBABgAhdBEQhWAAgygOQgygOgSgSIABgNQAJANAnALIAJADIALADIAAAAQAyAPAmACQBDADBDgBQArgBBAgGIADAAIgCAAIABAAIAAABIhDAMQg5AEgyAAIgWAAg");
	this.shape_242.setTransform(-165.0527,-174.25);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#000000").s().p("AC7CBQgigFgbghIgDgDIABgBIABAAIAFgBQAVAUAbAPQgTgPgGgYIAAAAQgCgDADgGIAHgJQADgCAFABQgCgGACgBIAFgHIgBABIAAgBQgPgDgTgJQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAbAMAWAAIACgBIAGAAIAEAAQALgCAKgFIgMgEIgHgDIABAAQgSgIgQgOQATAMAVAKQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAIAEgBQAWAGAOgIQgRADgIgSQgBgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gJIhygUIhZgMIhEgHIgCgBIADAAIBAAEIgfgcIg8g1IACgHIABABIBoBYIACAAIAMABQBOAIA0AJIBnATIACABIARgGQAIgDAogCQAngCAjAVQAeASAVAVIABABIABAAIAAADIgCABQgDAEgIABQAhAhgXAYQgGAGgLgEIgBAAIAAADQAAAJgJABQgMACgIgGQAFAQgVAAQgIAAgEgFQgEAGgGAAQgHAAgKgGgAClBlQAJANALALIADACQAOAGAJgGIAAAAIAAAAIABgBQgWgZgSgcIgDgIQgXAIATAcgADYB+IgBABQAWAFAAgPQgNgagVgaQgEgGgBgGQgdgIAGAYQADAIAHAIQARAUALAVIABgBIACABgADJAyIACADQAaAfAKAhIACAAIAAABQAfAEgHgXQgCgPgMgQQgJgMgGgLIgNgEQgKAHgMACgAEPBpQAfADgNgcQgGgPgJgNIgGgBQgNgBgMgEQAZAdADAegAEIAdQAIAFAJADIgMgJIgEABIAAAAIgBAAgAhdBDQhWAAgygNQgygOgSgTIABgMQAJANAnAMIAJADIALACIAAAAQAyAPAmACQBDADBDgCQArgBBAgFIADAAIgCABIABAAIAAAAIhDAMQg5AEgyAAIgWgBg");
	this.shape_243.setTransform(-165.0027,-174.3);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#583720").s().p("AhAAkIASgSQAGgKAPgJIAHgGIAUgRIABAAIAFgEIAWgRQAPgKATgHIAAgBIABAAIgBAJQgBABAEAEQgFABgBAEIgCALQABAHADACIgRAPIgGAEIhRBFQgfgFAIgXg");
	this.shape_244.setTransform(-156.4231,-185.35);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#C59064").s().p("AjfCFQgXgEgOgJQgVgNgFgGIACgGIACgBQgYgUAOAJIAIAHQAHAAABgCQALgMANgKQADAAAEgCIAbgSQAJgCAzgWIAMgFIBAgZIBsgpQArgQAMgFQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAgBIAPgPIAUgSQAIgHAcgNQAbgMA1AHIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQARALAMgKQgHANgWAGQgDADgVADIgOADIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgXADgXgCQAVAEAUgCIgBABIAHgBIANgCQgGAJgIAHIgEACIgEADIgDACQgTAKgcAEQgBAAABABQAAAAAAAAQAAAAAAAAQABAAAAAAQAVgCAPgEIAAABQgTAGgPAKIgWARIgFAEIgBABIgVARIhEAoQg5Akg7AfQg9AfgjACIgQABQgIAAgHgBgADbgEQgOgEgPgHQgfgNAQgUIAGAFQAeAQAgALIgBAAIABABQgFAJgPACIgEAAgACZgKIARgPIAAAAQASASAYADQggAAgbgGgADzgRQgTgMgZgKQgJgDgIgFQgQgSAcgIQAEAFAHAEQAfAMAYAPQAHAOgUAGQgBAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAABgAEHgnIgCABQgYgXgngPQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAKgHAEgLIAOgDIAZAMQASAIAKALQARARgeAMgADmhlQAMgDAMgGIAFgCQAPAHANAKQAZASgdANQgRgZgkgMg");
	this.shape_245.setTransform(-167.1122,-185.2998);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#000000").s().p("AjuCMQgdgEgPgKQgPgKAEgPIABgBQAEAGAVAMQAPAJAXAEQALADATgCQAkgDA8gfQA8gfA4gjIBFgpIgIAGQgOAJgHAKQg5Ang0AdQhKArgnAJQgbAFgVAAIgVgBgAi1AXIA3gZQAqgUA2gTIBOgdQAagJABgBIAJgLQAGgHAggWQAigVApABQAjABAcAIIACAAIABAAIABACIgBABQAAAGgHAFQAtAMgIAgQgBAIgMACIgBABIABADQAEAHgGAFQgJAIgLgBQAMALgSAKQgGAEgGgBQAAANgXAAQghALgngNIgEgCIAFgEQAcAGAfAAQgYgEgRgSIAAABQgEgDgBgGIACgLQACgEAEgBQgEgEACgCIAAgIIAAAAQgQAFgUACQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAdgDATgLIACgBIAFgEIADgCQAJgHAGgJIgNACIgHABIAAAAQgTACgVgEQAXABAXgCQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABABIAAgBIAOgDQAWgDACgDQAWgGAIgNQgNAKgQgLQAAAAgBgBQAAAAAAAAQAAgBAAAAQABgBAAAAIABgBQg2gIgbAMQgbANgJAIIgTASIgQAPQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABgBAAQgLAGgrAPIhsApIhBAZIgLAFQg0AXgIABIArgVgAC4gQQAOAGAPAEIAEABQAPgCAEgKIAAAAIAAgBQgfgLgegPIgHgFQgPATAfAOgADwgTQAVgGgHgOQgZgPgegMQgHgEgFgFQgcAJARARQAHAGAKADQAZAJATAMIABgBIACABgAEBgoIAAAAQAdgLgRgRQgKgMgSgIIgZgMIgNADQgEAMgLAHQABAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAmAPAZAWIABAAIABAAgAD3hvQgMAGgMADQAkAMASAYQAcgMgZgTQgNgKgPgGIgFACgADpiAIASgBIgPgCIgCADIAAAAIgBAAgAigAGIABABIgBAAIAAgBg");
	this.shape_246.setTransform(-166.4902,-185.119);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#583720").s().p("AhMgCIAYgIQAKgGASgCIAJgBIAZgGIACAAIAHgBIAbgEQASgCATADIABgBIABABIgFAHQgCAAACAGQgFgBgDACIgHAJQgCAGACADIgWAFIgIACIhoAWQgZgTASgPg");
	this.shape_247.setTransform(-159.1103,-168.04);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#C59064").s().p("ADOBdIgEgDQgLgKgJgNQgVgbAXgJIADAIQATAbAXAYIgBABIAAABQgEADgGAAQgGAAgGgCgADpBcQgBgBAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAQgLgTgSgUQgHgIgEgIQgGgXAdAGQABAGAEAHQAWAYAOAaQAAAMgOAAIgHgBgACTA2IAWgFIAAgBQAHAZAUAOQgcgPgVgSgAEBBRIAAAAIgBAAQgLgggbggQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQANgBAJgJIANAEQAHALAJAMQAMAPAEAPQAFAUgWAAIgIgBgAEfBEQgEgegagcQAMADAOABIAFAAQAKANAHAPQAMAagZAAIgFAAgAh9AhQhEgBghgPQgRgHgOgJQgOgHgLgQQgMgRgOgPIATgFIACAAQgLgcAIAOIAFAJQAFAEACgBQAQgGAPgCIAIACQAQgDARgCQAegFAGgNQABgDADgBQAQAEAMALIAGAFIgBABIACAAIgBgBQAyAMAnAHIBhAPQAtAHANABQABAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAIAVgGIAagGQALgDAeABQAeACArAgIgBABQgBAAAAAAQAAABgBAAQAAABAAAAQAAAAAAABQAJARAQgEQgMAIgXgEQgDABgVgIIgOgCIAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAABQgVgJgUgMQAQAOATAHIgBAAIAHACQAGADAGABQgKAFgKACIgEAAIgGABIgDABQgWAAgagLQgBAAAAABQAAAAAAAAQAAAAABABQAAAAAAAAQATAIAQADIgBABQgTgDgSACIgbAEIgHABIgCAAIgaAGIhQAEQgxADgyAAIgiAAg");
	this.shape_248.setTransform(-169.533,-172.624);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#000000").s().p("ADNBeQgjgFgbggIgEgDIAIgBQAVASAcAPQgUgPgHgYIAAAAQgCgDACgGIAHgJQADgDAFABQgCgFACgBIAFgHIgBAAQgQgDgTgIQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAAAABAAQAaAKAWAAIADAAIAGgBIAEgBQAKgBAKgFQgGgCgGgCIgHgCIABAAQgTgIgQgNQAUAMAVAIQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABABIAAAAIAOADQAVAHADgBQAXAFAMgJQgQAEgJgRQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABgBIABAAQgrgggegCQgegCgLADIgaAGIgVAHQAAAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQgNAAgtgHIhhgQQgngGgygNIgHgFQgLgKgQgFQAMgGAuAQQA5AUA3AJIBUANQAbAEABgBIANgFQAJgEAngEQAngCAkAUQAeASAVATIACABIABAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAIgBABQgDAFgJACQAjAfgXAZQgFAGgLgDIgBAAIgBADQAAAIgIABQgMADgIgFQAFAOgVABQgHABgFgFQgEAGgHAAQgGAAgJgEgAC2BCQAJAMALALIAEACQAOAGAIgHIAAAAIABgBQgXgYgTgcIgDgHQgXAJAVAbgADpBbQAVADAAgPQgOgZgWgYQgEgHgBgHQgdgGAGAYQAEAIAHAHQASAUALAUIAAgBQABAAAAABQAAAAAAAAQABAAAAABQAAAAABABgAEBBPIAAABQAfADgGgXQgEgOgMgQQgJgMgHgLIgNgDQgJAIgNACQAAAAAAAAQABABAAAAQAAAAABAAQAAABABAAQAbAfALAgIABAAIAAAAgAEfBCQAfADgNgcQgHgQgKgMIgFgBQgOAAgMgDQAaAcAEAdgAEXgIIAQAIIgNgKIgDACgAjKAhQgngMgXgQQgXgRgJgPQgJgRgIgEIAFgIQAOAQALAQQALARAPAHQAOAIARAHQAhAPBEABQBDACBCgFIBQgEIgJACQgSACgKAFQhEAIg8AAIgjABQg7AAgfgJgAiFhLIABgBIABABg");
	this.shape_249.setTransform(-169.5098,-172.4675);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#583720").s().p("AAcAVIgEAAIgDAAIhsgJQgLgXAagJIAcgBQAnABARACIAMABQATACAUAEQALADAQAHIABAAIgIAEQgDAAgBAFQgFgBgEABQgIADgEAEQgHAEAAADg");
	this.shape_250.setTransform(-163.626,-159.95);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#DFF4FF").s().p("AgvgiIgBABIADgOIBeBFIgjAag");
	this.shape_251.setTransform(-184.7,-183.5);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#000000").s().p("ACLCyQgHgCgBgFQgNAJgLgPQgcgOgFgjIAAgEIADAAIAEAAQAHAXAQAUQgJgSAJgXIAAAAQAAgDAHgEQAEgEAIgDQAEgBAFABQABgFADAAIAIgFIgBAAIABAAQgMgHgLgMQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQASAQAUAGIACABIAGAAQAAAAAAAAQABABAAAAQABAAABgBQAAAAABAAQALACAMgCQgFgDgDgEIgFgEIABAAQgMgLgGgRQAKAQAOAOQABgBAAAAQAAAAAAAAQABABAAAAQAAAAAAABIABAAIAKAHQAMANAFAAQAQAKASgEQgQgCADgRQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIABAAQgSgogZgJQgbgLgLAAIgcgBIgWgBIgEAAIgvgWQgvgXgugVIg6gaIgJgEQgmgQgMgGIgEgDIADABIACABIASAFQAQAFAgAQIgFgDQBJAaAqAXIBUAoIABABIAUAAQAJgBAmAHQAlAJATAbQAPAYAHAXIABABIAAABIgBACIgCABQgGADgJgBQALAlglAQQgIAEgJgGIgBAAIgCADQgFAHgJgBQgMgBgFgHQgEALgLAAIgJgBgACICoIgCABQAQALAKgOQAEgbgDgcQABgHACgGQgWgNgJAXQgCAIABAIQADAXgCAUIABAAIACABgACpBkQAEAigLAgIACAAIgBABQAaAMAIgXQAHgOAAgRQgBgNABgMIgJgGQgOAFgMgCIAAADgABoCGQAAAOADAMIACADQAJAIAMgDIAAAAIABAAQgEgcABgeIABgHQgaACABAdgADGCjQAbALAGgdQAEgPAAgOIgFgCQgLgEgKgGQAGAfgRAcgADwBeQAEAGAGAFQgCgGgDgFIgEAAIAAAAIgBAAgAAIBGQhCgNg2gPQhQgVgngcQgngcATgFIAWAUQAUAUA8AUQA7ATBAAOIBJASQgTgCgUABgAhWhMIABgBIAAABgAiQhdIgGgBIgOgRIgFgGIgsg3IAHgFIABgBIA+BTIACADIgDgBg");
	this.shape_252.setTransform(-168.925,-169.1125);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#C59064").s().p("ACKCOIACgBQgBgBAAAAQgBAAAAAAQAAgBgBAAQAAAAAAABQACgVgDgWQgBgJACgIQAJgXAWANQgDAGAAAHQADAdgEAaQgGAIgIAAQgFAAgHgEgACnCLIAAAAIgBgBQAKgggDgiIAAgDQAMACANgEIAKAFQgBAMAAANQABARgHAOQgFAPgNAAQgHAAgJgEgABxCHIgCgCQgDgNAAgOQgBgdAagCIgCAHQAAAeAEAcIgCAAIAAABIgFAAQgIAAgHgGgADKCHQARgcgGgeQAJAFAMAEIAFACQAAAOgEAPQgEAVgQAAQgGAAgHgDgABVBVIAXABIAAABQgJAWAIASQgPgUgHgWgADdBMQgFAAgNgNIgJgHIgBAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgPgOgJgQQAGARAMALIgBAAIAEAFQAEAEAEACQgLACgLgCQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBIgFAAIgDgBQgTgGgSgQQAAAAgBAAQAAAAAAABQAAAAABAAQAAABAAAAQAMAMAMAHIgBAAQgQgHgLgDQgUgEgUgCIgMgBQgRgCgngBQAUgBATACIhJgSQhAgOg8gSQg7gUgVgVIgVgUIgHgGIAGACIAAgBIgBgDQgDgGAEgUIADgMIAFgQIAIgEIAGABIAFAAQASAAAPABIACACIAVgPIAFAGIANASIgDgCIAEAEQALAFAnAQIAJAFIA5AZQAuAWAwAXIAvAWIAEAAIAWABIAcAAQALABAbAKQAZAJASApIgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgCASAQABIgKABQgNAAgLgHg");
	this.shape_253.setTransform(-169.3,-166.35);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#C59064").s().p("ACKCOIACgCQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAQACgUgDgWQgBgJACgIQAJgWAWANQgDAFAAAHQADAdgEAaQgGAIgIAAQgFAAgHgEgACnCLIAAgBIgBAAQAKgggDgiIAAgDQAMACANgFIAKAHQgBAMAAANQABAQgHAOQgFAPgNAAQgHAAgJgEgABxCHIgCgCQgDgNAAgNQgBgdAagDIgCAHQAAAeAEAcIgCAAIAAAAIgFABQgIAAgHgGgADKCIQARgcgGggQAJAGAMAEIAFADQAAAOgEAPQgEAUgQAAQgGAAgHgCgABVBUIAXACIAAAAQgJAXAIASQgPgUgHgXgADdBMQgFAAgNgMIgJgIIgBAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgPgOgJgPQAGAQAMALIgBABIAEADQAEAFAEACQgLADgLgDQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBIgFAAIgDAAQgTgHgSgQQAAAAgBAAQAAABAAAAQAAAAABAAQAAABAAAAQAMANAMAGIgBABQgQgIgLgCQgUgFgUgCIgMgBQgRgCgngBQAUAAATABIhJgRQhAgOg8gTQg7gUgVgVIgVgUIgHgHIAGAEIAAgCIgBgDQgDgGAEgUIADgMIAFgQIAIgEIAGABIAFAAQASgBAPACIACABIAVgOIAFAGIANARIgDgBIAEADQALAHAnAQIAJADIA5AaQAuAVAwAYIAvAXIAEgBIAWABIAcAAQALAAAbALQAZAJASApIgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgCASAQABIgKABQgNAAgLgHg");
	this.shape_254.setTransform(-169.3,-166.2);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#000000").s().p("ACLCyQgHgCgBgFQgNAJgLgPQgcgOgFgjIAAgEIADAAIAEAAQAHAXAQAUQgJgSAJgXIAAAAQAAgDAHgEQAEgEAIgDQAEgBAFABQABgFADAAIAIgFIgBAAIABAAQgMgHgLgMQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQASAQAUAGIACABIAGAAQAAAAAAAAQABABAAAAQABAAABgBQAAAAABAAQALACAMgCQgFgDgDgEIgFgEIABAAQgMgLgGgRQAKAQAOAOQABgBAAAAQAAAAAAAAQABAAAAABQAAAAAAABIABAAIAKAHQAMANAFAAQAQAKASgEQgQgCADgRQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIABAAQgSgogZgJQgbgLgLAAIgcgBIgWgBIgEAAIgvgWQgvgXgugVIg6gaIgJgEQgmgQgMgGIgEgDIADABIACABIASAFQAQAFAgAQIgFgDQBJAaAqAXIBUAoIABABIAUAAQAJgBAmAHQAlAJATAbQAPAYAHAXIABABIAAABIgBACIgCABQgGADgJgBQALAlglAQQgIAEgJgGIgBAAIgCADQgFAHgJgBQgMgBgFgHQgDALgMAAIgJgBgACICoIgCABQAQALAKgOQAEgbgDgcQABgHACgGQgWgNgJAXQgCAIABAIQADAXgCAUIAAAAIADABgACpBkQAEAigLAgIACAAIgBABQAaAMAIgXQAHgOAAgRQgBgNABgMIgJgGQgOAFgMgCIAAADgABoCGQAAAOADAMIACADQAJAIAMgDIAAAAIABAAQgEgcABgeIABgHQgaACABAdgADGCjQAbALAGgdQAEgPAAgOIgFgCQgLgEgKgGQAGAfgRAcgADwBeQAEAGAGAFQgCgGgDgFIgEAAIAAAAIgBAAgAAIBGQhCgNg2gPQhQgVgngcQgngcATgFIAWAUQAUAUA8AUQA7ATBAAOIBJASQgTgCgUABgAhWhMIABgBIAAABgAiQhdIgGgBIgOgRIgFgGIgsg3IAHgFIABgBIA+BTIACADIgDgBg");
	this.shape_255.setTransform(-169.125,-168.9625);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#C59064").s().p("ACJCOIADgCQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAgBAAQADgUgDgWQgBgJABgIQAKgWAWANQgDAFAAAHQADAdgEAaQgGAIgIAAQgFAAgIgEgACnCLIABgBIgCAAQALgggFgiIABgDQAMACANgFIAKAHQgBAMAAANQABAQgHAOQgFAPgNAAQgHAAgJgEgABxCHIgDgCQgCgNAAgNQgBgdAagDIgBAHQgBAeAEAcIgCAAIAAAAIgFABQgIAAgHgGgADKCIQARgcgGggQAKAGALAEIAFADQAAAOgEAPQgEAUgQAAQgGAAgHgCgABVBUIAXACIAAAAQgJAXAIASQgPgUgHgXgADdBMQgFAAgMgMIgKgIIgBAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgOgOgKgPQAGAQAMALIgBABIAEADQAEAFAEACQgLADgLgDQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBIgGAAIgCAAQgTgHgSgQQAAAAgBAAQAAABAAAAQAAAAABAAQAAABAAAAQAMANAMAGIgBABQgQgIgLgCQgUgFgUgCIgLgBQgTgCgmgBQATAAAUABIhJgRQhAgOg7gTQg8gUgVgVIgVgUIgHgHIAGAEIgBgCIgBgDQgCgGADgUIAEgMIAEgQIAJgEIAGABIAEAAQAUgBAOACIABABIAWgOIAFAGIANARIgDgBIAEADQAMAHAlAQIAKADIA6AaQAtAVAwAYIAuAXIAFgBIAWABIAcAAQALAAAbALQAZAJASApIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgCASAQABIgKABQgNAAgLgHg");
	this.shape_256.setTransform(-169.5,-166.2);

	var maskedShapeInstanceList = [this.shape_229,this.shape_230,this.shape_231,this.shape_232,this.shape_233,this.shape_234,this.shape_235,this.shape_236,this.shape_237,this.shape_238,this.shape_239,this.shape_240,this.shape_241,this.shape_242,this.shape_243,this.shape_244,this.shape_245,this.shape_246,this.shape_247,this.shape_248,this.shape_249,this.shape_250,this.shape_251,this.shape_252,this.shape_253,this.shape_254,this.shape_255,this.shape_256];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_232},{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]}).to({state:[{t:this.shape_236},{t:this.shape_235,p:{x:-168.725,y:-169.4125}},{t:this.shape_234,p:{x:-184.5,y:-183.8}},{t:this.shape_233,p:{x:-163.426,y:-160.25}}]},4).to({state:[{t:this.shape_238},{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_241},{t:this.shape_240},{t:this.shape_239}]},4).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_236},{t:this.shape_235,p:{x:-168.725,y:-169.4125}},{t:this.shape_234,p:{x:-184.5,y:-183.8}},{t:this.shape_233,p:{x:-163.426,y:-160.25}}]},4).to({state:[{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_243},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_246,p:{y:-185.119,x:-166.4902}},{t:this.shape_245,p:{y:-185.2998,x:-167.1122}},{t:this.shape_244,p:{y:-185.35,x:-156.4231}}]},4).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_236},{t:this.shape_235,p:{x:-168.725,y:-169.4125}},{t:this.shape_234,p:{x:-184.5,y:-183.8}},{t:this.shape_233,p:{x:-163.426,y:-160.25}}]},4).to({state:[{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_243},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_246,p:{y:-185.119,x:-166.4902}},{t:this.shape_245,p:{y:-185.2998,x:-167.1122}},{t:this.shape_244,p:{y:-185.35,x:-156.4231}}]},4).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_236},{t:this.shape_235,p:{x:-168.725,y:-169.4125}},{t:this.shape_234,p:{x:-184.5,y:-183.8}},{t:this.shape_233,p:{x:-163.426,y:-160.25}}]},4).to({state:[{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_243},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_249},{t:this.shape_248},{t:this.shape_247}]},5).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_243},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_246,p:{y:-184.669,x:-166.4902}},{t:this.shape_245,p:{y:-184.8498,x:-167.1122}},{t:this.shape_244,p:{y:-184.9,x:-156.4231}}]},4).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250}]},3).to({state:[{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_243},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_246,p:{y:-184.819,x:-166.6902}},{t:this.shape_245,p:{y:-184.9998,x:-167.3122}},{t:this.shape_244,p:{y:-185.05,x:-156.6231}}]},4).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_254},{t:this.shape_235,p:{x:-168.925,y:-168.9625}},{t:this.shape_234,p:{x:-184.7,y:-183.35}},{t:this.shape_233,p:{x:-163.626,y:-159.8}}]},4).to({state:[{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_243},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_246,p:{y:-184.819,x:-166.6902}},{t:this.shape_245,p:{y:-184.9998,x:-167.3122}},{t:this.shape_244,p:{y:-185.05,x:-156.6231}}]},4).to({state:[{t:this.shape_231,p:{x:-183.925,y:-183.275}},{t:this.shape_242},{t:this.shape_230},{t:this.shape_229,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_256},{t:this.shape_255},{t:this.shape_234,p:{x:-184.9,y:-183.35}},{t:this.shape_233,p:{x:-163.826,y:-159.8}}]},4).to({state:[{t:this.shape_231,p:{x:-183.875,y:-183.325}},{t:this.shape_243},{t:this.shape_237},{t:this.shape_229,p:{x:-156.1812,y:-166.66}}]},4).to({state:[]},4).wait(1));

	// Layer 4
	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#C59064").s().p("AgcArIASgGIASgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBIgIACQgNACgRAJIgPAGIgEAAIAZhVIAQAJIATAMIAPAKQAIAFACAMQABAMgLAKQgJAIgTAJg");
	this.shape_257.setTransform(-193.591,-237.725);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#000000").s().p("AgBArQASgJAKgIQALgKgCgMQgBgMgIgFIgPgKIgTgMIgQgJIgDgDIADAAQAQADAYAKIANAGQAUAKAGALIACAEIAAAKIgBADQgEAMgSAKIgKAEIgXAHIgPAFIAMgFgAg4AtIgBAAIAIgCIAFgCIAOgGQASgJANgCIAIgCQAAABABAAQAAABAAAAQAAABABAAQAAABAAAAQAAAEgDABIgHACIgSADIgSAGIgMADIgDAAIgEABIgCgBg");
	this.shape_258.setTransform(-192.9125,-237.625);

	this.instance_1 = new lib.sdrntm();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-201.6,-242.35);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#000000").s().p("AgzALQghgEgfgUQAUAFAeAEQAeAEAnAAQAmgBAZgCQAYgDAZgHQABACgTAKQgSAIgMADQgNACgiACIgTAAQgZAAgcgDg");
	this.shape_259.setTransform(-194.6195,-224.1295);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#501C1E").s().p("AAAAAIABAAIAAAAIAAAAIgBAAg");
	this.shape_260.setTransform(-185.675,-223.85);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#874F2E").s().p("AiJE+QAchHhsgnQhvgogfgmIADgHQBfA/BjAlQBiAkCsAMQg6AQggAaQgrAagpAAQglAAgigVgAnXBNIgBgGQAHACALgDQAUgFASgDIAMAHIAAgBQgRgjg5AAQgBAAgBABQgBAAAAAAQAAAAAAAAQAAABABAAQALAFAPAFIAXAKIgLACIgCAAQgIADgJABQgJABgDAFIgCACQgKgDgMgKQgPgOAAgMQAAgNAPgEQAJgDASAAQAgAAAUAcQAQAUAAARQAAARgwAAQgPAAgGgPgAHGh7QARAEANAEQARATAMAWIgJANQgSgggggegAGeibIgVgOQgrgag0gTQgngOg5gIQhBgGgggFQhqgPg3gzQABgNgCgMQBcBbDGgUQA5AjBCAeQA3AZAmAeQgQgFgTgDg");
	this.shape_261.setTransform(-222.125,-236.4966);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#C59064").s().p("AiQD1Qhjglhgg/IACgHQABgGgGADIgFAEQgPAHgUADQhaAOgqg7Qgrg+A8gzQAMgKARACQBmAMADBDQAAAFAEgCQAMgGAEgIQA4AagCgjQAHgBADgEQAPgKgRgKQAOgIAJgJQAFgGgEgEQgQgUgagPQAUgJgEgOQAJgCALgJQA0goAEg2QAKgCAOgLIAHgFQAOALAhgKQBHgWAPg0QAEgOABgOQA1A0BsAPQAgAEBBAHQA4AIAnANQA1AUArAaIAUAOIgCgBIgHgBIgBAAIgJAAQgDgFACgHQgFABgSAHQgUAIAMARIAvAFQAZADAUAFQAfAdASAgQgJAPgDAQQgJApAQApQAtB1iBA8QheAjhwADQg7ACgqADQirgMhigkgAEMCuQAtAOApgQIAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgrALgngIIAAABgAngAiQgPAFAAAMQAAAMAQAOQAMAKAKADIgBABIADABIABAHQAHAPAPAAQAvAAAAgRQAAgRgPgVQgUgbghAAQgRAAgKACgAFoBCQAQAPATABQAUABANgFQAOgEAIgEQAJgDAKgKQAYgXAAghQAAgggYgXIgCgCQgXgWggAAIgBAAQgiAAgYAYQgOANgGARQgZgKgQgEIgDAAIABADIABABQADAAANAJIAVAMIAPAJQAHAFACANQACAMgLAKQgHAGgMAGIgWAKIAZgIIANgFQAEAGAQAPgAgBhoQgjAfAAAsQAAArAjAfQAiAfAyAAQAzAAAjgfQATgRAJgVQAGgPABgRIAAgEQAAgsgjgfQgjgegzAAQgyAAgiAegAE2AiQgOACgRAJQgVAKgHAAIACAAQAAACAGgCIADAAIAegJIATgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBgBIgIACgABnibQAcACAqAGIAuAGQAVgNgPgMIgRgOQgDAIgFAEIgJgCIAAgBIgHAAIg9gEQgbgDgkABQglABgaAFQgZAEgVAHIA2gBQA6ACAoAEgAIUgxIABABIgBABIAAgCg");
	this.shape_262.setTransform(-223.8726,-238.625);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#372F2F").s().p("AmcEEQgEgHgHgHQgsgthJgHQgLACgJAEQgGgVgEgYQgCgNAMgJQAggVgSgPIgPAGIgCgMQgCgKALgIQAfgYgTgQQgKAFgJAHQgEgYAKgVQAphcCYgLQAxgEgqgKQgVABgWACIgPACQgSgKgagFIAcgKQCBg0CQAXIABAAIACACIABgBQAGAAgEgDQANgWAYgTQBhhICPANIhQA4IgFABQgIABAAAGIABAAIgBABIADABIAOgCQBBgDA4ALQgmAEgjAKIgBABQAtALA/gLQCCgWBXA6QAhAXAWAXQg0gRg+ACIgNACIgKgCIgFAAIAHADIgaAGQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABIA2AFQAjARAqAQQCkA+guBeQgRgVgigXQgNACAJAIQAhAbANAYIgCABIADABQAgA/hpAsQABgfgEgSIAHgGIABgBIgBgBQgKgLgJgIQgKgQgRgQQgTgRgYgKQhogthQg2IADAAIgBgCIgGAAQhHgxg0g7QgPAiAwAkQAcAUAgAUQjHAGhfhiQgIgSgPgPQgBAAAAABQgBAAgBAAQAAAAAAAAQAAABAAAAIAAABQgFABACAFIAIAOQALAwgSAyQgRAwhFAAIAXgVQAXgXgSgPQgRAFgHAMQgSAcggAUQgEgNgJgJQgWAcABAnQABAvg2AVQgHADADAEIABADIgRAWIgRgJQgBABgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAEAdA3ATIgKAHQgLAGgEAGQgRgRgVgPQgXgRgPgFQABAGARASQATATASAKIASAMIAAAFQgBAEgDAEQgEAEAAAFIgfgLg");
	this.shape_263.setTransform(-217.0588,-261.8425);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#000000").s().p("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");
	this.shape_264.setTransform(-218.8817,-247.7474);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQAqgDA7gCQBwgDBegjQCBg8gth1QgQgpAJgqQADgQAJgPIAKgMQgMgWgSgSQgNgFgQgDQgUgFgZgDIgvgFQgMgRAUgIQASgHAFgBQgCAHADAFIAJAAIABAAIAHABIACABQATACARAFQgmgeg3gZQhCgdg5gjQjHAThchbQADAMgBANQgBAOgEAOQgPA0hHAWQghAKgOgLIgHAFQgOALgKACQgEA2g0AnQgLAJgJACQAEAOgUAJQAaAPAQAUQAEAEgFAGQgJAKgOAIQARAKgPAKQgDAEgHABQACAjg4gaQgEAIgMAGQgEACAAgFQgDhEhmgMQgRgCgMAKQg8A0ArA+QAqA7BagOQAUgDAPgHIAFgEQAGgDgBAGIgCAHIgDAGQAgAnBuAoQBtAmgdBIgAHrAOIAFANIAHgGIABgBIgBgBQgKgLgJgIIAHAOg");
	this.shape_265.setTransform(-218.8817,-247.7474);

	this.instance_2 = new lib.rt7();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-201.55,-241.15,0.7934,0.5254);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#000000").s().p("AAAAGIAAgKIABAKg");
	this.shape_266.setTransform(-200.9,-160.2);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#261E1E").s().p("AAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIAAABg");
	this.shape_267.setTransform(-256.7386,-194.425);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#35BAD6").s().p("AAiA7IgGgBIgagIIhbgXQAXgzAugmIARADQBSAYAGAIIAFAFIAAACQgDAKABADQgaA8gEAHIAAAAIgCAEIgBABgAgSg/IAAAAIABAAIgBABg");
	this.shape_268.setTransform(-255.025,-188.05);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#000000").s().p("AALBmIgdgJIghgKIg3gOIADgGQARghAWgZIAcgdIAXgUQAPgPApgbQApgaATgGIAEAAIgCAFQgBABAAAAIABAAIAAAAIgBAAIABABIAAABIgFACIgCACQgzAbgXATQgUASgTAOIAAAAIAAABIgCAAQgvAlgWA0IBaAXIAbAIIAGABIAVAGIAAgBIACgEIABAAQAEgHAag9QgBgDADgKIAAgCIACADIABgDIAAAAIABAEIAAACIABABIACAHIgZBMQADABAAAFQABAFgGAGIg+gRgABkhuIADAAIAAgBIgCAAIgBABgABnh0IABAAIgBgBIAAAAg");
	this.shape_269.setTransform(-255.3,-191.55);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#246662").s().p("AgsAbIgRgDIACAAIABgBIgBAAQAVgOAUgRQAVgTA0gbIABgCIAGgCIgJAbIgIAxQgJALAJAeQgHgIhSgYgAg6AXIAAABIABgBIABAAIgCAAg");
	this.shape_270.setTransform(-250.95,-196.775);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#C59064").s().p("AAeDvIgXgHQgpgPgnhvQgXi1ANhIQAMhJAKgTIB0AjIABgDIAgAJIghBeIgJAWQggBOgHBLIgCAJQAAACAMAHQAfAWAVAZQAGAMgQAHQgGADgDgBQgCgBgFgBQgFgBgNgKIgFgCQgLgIgCgGIAAAEQAGAXAKASQALATAGAHIACADQAOAMgIAHQgxgbgRgyQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAKA2A6AZIACAGQAEAKgRAAIgHgBg");
	this.shape_271.setTransform(-257.388,-160.4346);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#35BAD6").s().p("AhFAFIgBgCIgCAAIACgBIAAAAQAPgLAIgSIB4gMIgZBMIgBACg");
	this.shape_272.setTransform(-256.575,-184.9);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#000000").s().p("AgID0QgZgMgUgsQgVgrgGgaQgfjpAnhsQAHgSASgRIAIAAQgIASgPANIAAAAIgCABIACAAIABABQgKATgMBJQgNBIAXC1QAnBvApAPIAXAHQAYACgEgLIgCgGQg6gZgKg2QAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQARAyAxAbQAIgHgOgMIgCgDQgGgHgLgTQgKgSgGgXIAAgEQACAGALAIIAFACQANAKAFABQAFABACABQADABAGgDQAQgHgGgMQgVgZgfgWQgMgHAAgCIACgJQAHhMAghNIAJgWIAhheIAHABQg9CqgWBpIA0AqQAXAVgQAPQgHAFgLAAQgHgBgIgEQgFgBgFgGIgIgFIAAABQAEAOANAUQANAUACABIADAFIAEAKQADAHgGADQAEANgMAEIgMABQgUgBgYgNg");
	this.shape_273.setTransform(-257.3816,-161.925);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQirgMhigkQhjglhgg/IgDAGQAgAnBuAoQBtAmgdBIg");
	this.shape_274.setTransform(-218.8817,-247.7474);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#AA7F64").s().p("AnPBEQAGgWAKgWQANAWAwAJQAiAGA/AAQA1AABXgNQgHAWgIAWQAFADACgDQABAAAAAAQAAAAAAAAQAAAAAAABQAAABgBABQg+AThKABIgIAAQhoAAg6gvgAA6AyQgXgHABgUQABgPARgDIA1gJQAUAPBKAJQA+AIBBAAQBRAAAWgGQALgCAVgJQAAANgHAPQgJAPgVAFQhUAThTAAQhlAAhkgcgAAzgwIADgBIgDgCIgCgBIAAAAIAAABQghgGgKgOIAegRIADgCIAAADQABAAABAAQAAAAABgBQAAAAAAAAQAAAAABgBIAAgDQAbgPAdgHQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAAAQAAAEAQATIgFAHQgFAHAAADQAAANAMAFQAHAEARABQAPABAGADQgCAHAHAHIgBABIgmADQgzADgXAQQAGgXgHgTg");
	this.shape_275.setTransform(-234.5,-81.8711);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#F8E8D9").s().p("AmKBPQgwgKgNgVIANgZQAOgaAhgPQAAABAJgEQgIADABgBIAVgIQCCgnBEBIIAFAIIABAAIAAgBQAPATACAVIgFASQhYAOg1AAQg/AAgigGgADBArQhJgJgVgQQBxgVBqgiQAgAAAcAIQBRAUgDAsQgWAIgLADQgVAFhRAAQhCAAg+gIgAlAgyIgRACQAHgIAEgLQAIgPAXgBQBogEgHBBQgsgYhOgEg");
	this.shape_276.setTransform(-233.7196,-84.2116);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("Ah3A7QAZg9htgMQgMABgMAEQgsAOALAcQgXAEgUAKIgGAEIAHgNQAXgaAEgTIAFgDIABAAQgHgHgNABIAAgBQAEgYAigMQB+guBOBFQAiAegVAVQgXgVgggPIAAABQgIAAgEAEIAAABQAMAUATAKQgfAbABAYQgJgHgKgGgADRA5QgSgBgHgDQgMgFABgNQAAgEAEgGIAFgIQgPgRgBgEQAAgBABAAQAAgBAAgBQAAAAABgBQAAAAAAgBQAxgOA1AIIAAAEIABgBIABgDQATADATAFQgIALAFANIgEgDIgCADQgbgFgfACIgDAAIgEACIgLAFQgFADgCAEIAAABQAJADAJgCQAfgHAggCQgBADAAADIgEAAQgfADgTAOQgNAJgCAJQgFgDgPgCg");
	this.shape_277.setTransform(-241.45,-92.429);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#C59064").s().p("ABYhvIAHgBIAIgBIADAAIAPgDIgTACIAAgZQADACAFABQBNAUBLgFQgGAggzAQIAAABQAMgCAKgDQggBfAFBhQgYgEgcADQgvAFgoAOIgQAHQAMiCAfh5gACHh3IAEgBIAAgBgAkEA+QARgtANgwQAOgxASgqQBDATBNACQhCBegDBlQgtgjhcADg");
	this.shape_278.setTransform(-234.6,-106.55);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#B09B61").s().p("Al7BtQCGiYA4ilQAEACAHAAIBiACQgjAngbAqQgDgogFgnIgBAAQgMAvAPAoQgpBAgXBDQgLAlgSAjQgUAnAIAgQAehLAahNQASg5Alg0IAAABIABgBIAAgBQALgRAOgQQAdgkALggQC1ADC1gBQACBnAuBkQAQAlAJAmQAHAgAOAbQgYAMgcAMQiGA7iTgrQACgxAMgvQAHgbALgaQANgfABgaQAXACAcgKIgBgBQgbAEgXgCIAAgHIgDAGQgXgDgWgKIgBAAQARARAaADQgeA+gOBEQgNA4AKAzIgGABIABgEIgCAEQgqADgoAAQjfAAhrhkg");
	this.shape_279.setTransform(-229.1,-138.5914);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#35BAD6").s().p("AjFCZIgOgBQAAgxAPhUQgBh3gGg6QAlAOApAJQBCAOAvABICHABQAoAAADgDQA4BgARBNQAJANAFBfIhhAAQi0AAitgGgAj4iIIAAgCIgEgIQACACADABIACABIgDALg");
	this.shape_280.setTransform(-226.575,-175.8039);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#246662").s().p("AATBTQgugBhBgOQgqgJglgOIgTgHIAAgBIgDgMIgCgFIgCgMIABgEIABgXQARgyBsgNIAAgBIADAAIACAAQARAoBdgMQA4gHAKgUIAKACQgBgCAPAGQANAGAjAUIgSAEQgNAJgKAaIgZgcIgCACIAaAgIAJAJIABACIAZAjIAAABIAMAWIACADIAIAOQgDADgoAAIiIgBg");
	this.shape_281.setTransform(-229.8,-196.2);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#000000").s().p("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");
	this.shape_282.setTransform(-234.6705,-137.986);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#246662").s().p("Ag7AFIAAAAIgKgLIgIgKQABgHACgGQAKgLAOgIIASgFIAMAHQAsAaA2AoQgNADhWAfIgmgxg");
	this.shape_283.setTransform(-208.225,-195.925);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#35BAD6").s().p("AhfgZQBXgeAMgDQAtAcAVAPQATAPAHADQgwAchIAdg");
	this.shape_284.setTransform(-200.825,-188);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#C59064").s().p("AhDAVQgcgVAAgKQBRgcArgfIBDA3IgZALIgBADQgaAUgXAVQgDADgEABQgLAJgHANIgCADQghgYgcgZg");
	this.shape_285.setTransform(-193.5,-180.05);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#000000").s().p("AAYCEQgbgTgYgcIgGgOIgXgaQgXgagdgtIADADIgEgFIABACIgDgEIgCgEQgGgJgGgIIgegqIgFgHIgDgFIAAgCIgFgHIAFAGIAIAKIAJAMIAAABIAmAwIBHBUQBIgcAxgcQgHgDgUgQQgUgPgtgcQg2gpgsgaIgMgHIAPgCIA+AqQBsBLAPAOIAoAfIAoAeIAAACIABAAIAGAGIgMgBIhDg2QgtAehPAcQAAAKAbAWQAcAZAhAYIgFAFIAAAHIgZgRg");
	this.shape_286.setTransform(-199.575,-186.75);

	var maskedShapeInstanceList = [this.shape_257,this.shape_258,this.instance_1,this.shape_259,this.shape_260,this.shape_261,this.shape_262,this.shape_263,this.shape_264,this.shape_265,this.instance_2,this.shape_266,this.shape_267,this.shape_268,this.shape_269,this.shape_270,this.shape_271,this.shape_272,this.shape_273,this.shape_274,this.shape_275,this.shape_276,this.shape_277,this.shape_278,this.shape_279,this.shape_280,this.shape_281,this.shape_282,this.shape_283,this.shape_284,this.shape_285,this.shape_286];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.instance_2},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.instance_1},{t:this.shape_258},{t:this.shape_257}]}).to({state:[]},124).wait(1));

	// Layer_5
	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f().s("#74492A").ss(4,1,1).p("EgzcAAXQBBgfBPgBMBkpgAN");
	this.shape_287.setTransform(190.625,-169.275);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f().s("#74492A").ss(4,1,1).p("EAu7AATMhd1gAl");
	this.shape_288.setTransform(218.625,-169.125);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f().s("#74492A").ss(4,1,1).p("Al5AEQCZgFBGA3QBGA5BQACQBPACBQgiQBRgiCOif");
	this.shape_289.setTransform(-119.6,-159.4189);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f().s("#74492A").ss(4,1,1).p("Eg1bgBXQCSgqBbB9QBcB9DVgaQCHgODAi0MBdSAAC");
	this.shape_290.setTransform(206.45,-171.15,1,1,0,0,0,8.2,-11.1);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f().s("#74492A").ss(4,1,1).p("EAunAABMhdNgAB");
	this.shape_291.setTransform(288.6,-171.625);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f().s("#74492A").ss(4,1,1).p("AASBlQCHABDEiiQAJgIAKgIAAPBlQiYADjmjN");
	this.shape_292.setTransform(-47.025,-163.8985);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f().s("#74492A").ss(4,1,1).p("Ak2hIQCRhkCoBWQCpBWCLB/");
	this.shape_293.setTransform(228.65,-153.15,1,1,0,0,0,344,33.9);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f().s("#74492A").ss(4,1,1).p("EAzygAOMhOYAADQhAA7g7ApQiABZhgAAEgzxgALQDABECKhhQCKhiA/gaQA/gZBLAWQBKAWA6AuQA3AqAYAWIACABQABABAAAAEgmBgAjQACABABABQDiDWCXgD");
	this.shape_294.setTransform(193.125,-168.732);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f().s("#74492A").ss(4,1,1).p("A58DAQBgAACAhbQA4gnA+g5MBI5gAEEg0SABvQBJAVB1AjQB1AkBcgrQBcgrAwgsQAxgsCRiAQCSiCDBA2QBjAeCCB4QAAABABAAIACABQAAABAAAAQDiDZCYgD");
	this.shape_295.setTransform(190.6,-149.75,1,1,0,0,0,5.4,20.9);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f().s("#74492A").ss(4,1,1).p("EAhvAAAMhDdAAA");
	this.shape_296.setTransform(303,-170.925);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f().s("#74492A").ss(4,1,1).p("AMOC4QBgAACAhZQA5gnA+g4AxkAJQCXgFBKAcQBLAbA8AzQA9AzAzAQQAzAPAzgGQAygGDujMQDujMDAA0QBjAdCCB2QAAABABAAIACABQAAABAAAAQDiDUCYgD");
	this.shape_297.setTransform(-25.825,-170.6389);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f().s("#74492A").ss(4,1,1).p("AkjhOQBjhQB8ALQB7AMBQBsQBQBrBNBF");
	this.shape_298.setTransform(-114.025,-187.8946);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f().s("#74492A").ss(4,1,1).p("AesACMg9XgAD");
	this.shape_299.setTransform(323.7,-171.475);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f().s("#74492A").ss(4,1,1).p("ALUC/QBgAACAhbQA4gnA8g4AqlC/QCdAADvjrQDHi7DAA1QBjAeCCB5QAAAAABABIACABQAAABAAAAQDiDZCYgCAqoC/QiZACjmjc");
	this.shape_300.setTransform(19.875,-171.7686);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f().s("#74492A").ss(4,1,1).p("Ao8DDQhHACh9hGQhog6h9hgQhCg0hXhEQhBgqhFgCQh4gEinCcQhZBYhPA4QiABbhgAAEAzsAAGMg3JAAAQjPC+iNAAEgj5AAZIAIAHIgEgEIgqglQASAQASAQIACACIAEADIAGAFQAYAVAWASQAKAIAKAIIgJgHIhXhMQALALANAMEgjBABIQAGAEAFAFQCYB1BvgDEgzKAAPQEcAjCCiWQA6hDA6gTQAmgNA2AGQAoAFA3AYQAvAVAjAXQAdATAuAkQAyAoAhAeIgSgOEgzaAANQAIABAIABEgzrAASIAhgD");
	this.shape_301.setTransform(189.925,-170.8833);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f().s("#74492A").ss(4,1,1).p("AYwABMgxfgAB");
	this.shape_302.setTransform(359.675,-170.075);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f().s("#74492A").ss(4,1,1).p("AgBC+QBfAACAhbQBPg3BZhYQAjghAjgZQCWhuCVAfQABAAACAAQB2AhB6B2AbRgDQjTDBiOAAAVtC9QiaADjljbA7QBrQCjArCJgQQB4gGBKgaQBKgaBVg+QBVg9ADgBQDFi2C/A1QBjAeCCB4QAAAAABABIACABIAAABQDiDYCYgD");
	this.shape_303.setTransform(26.4,-169.8879);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f().s("#74492A").ss(4,1,1).p("AXVAAMgupAAA");
	this.shape_304.setTransform(370.875,-170.525);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f().s("#74492A").ss(4,1,1).p("ABVC7QBgAACAhaQBPg4BZhYQAjghAjgaQCWhuCVAfQABAAACABQB2AhB6B1A8jAJQCugcAmAoQAmAqAZArQAZArAlAUQAkAUAjACQAjACAHABQAjABAqgGQDNg2Cvi2QDHi7DBA1QBjAeCCB5QAAAAABAAIACACQAAAAAAABQDiDZCXgDAckgCQjQC9iNAAAXEC7QiaADjljc");
	this.shape_305.setTransform(39.225,-170.254);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f().s("#74492A").ss(4,1,1).p("AYnAAMgxNAAB");
	this.shape_306.setTransform(420.325,-170.725);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f().s("#74492A").ss(4,1,1).p("AEiDpQBhAACAhfQBOg6BahdQAjgjAigaQCXh0CVAhQABAAABAAQB2AjB6B7AxXDpQCeABDuj3QDHjEDBA4QBkAgCBB9QABABAAAAIACACQABAAAAAAQDhDlCXgDAaRDpQiZADjmjoAfsAmQjMDEiLgBA/rjYQC1g4CxCNQCxCLAEAEQDgDgCWgD");
	this.shape_307.setTransform(59.6,-174.1035);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f().s("#74492A").ss(4,1,1).p("AUWhfMgjlAACQi/CwiHAN");
	this.shape_308.setTransform(400.35,-160.5);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f().s("#74492A").ss(4,1,1).p("AJ+C/QiaADjljeArwDAQBgAACAhcQBPg4BZhZQAjgiAjgZQCWhwCUAgQABABACAAQB2AhB6B3Af3C/QiYADjijbQAAAAAAgBIgCgBQgBAAhBg9QhBg9hxgjQhygkj7DPQj8DNidAAA/2ABQFBAQBhhrQBghtCeATQBjAfCCB5QAAABABAAIACABQAAABAAAAQDiDbCYgD");
	this.shape_309.setTransform(65.725,-169.9805);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f().s("#74492A").ss(4,1,1).p("Ae4hdMg3dAAAQhXBQh/A2QhrAuhRAH");
	this.shape_310.setTransform(496.425,-161.25);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f().s("#74492A").ss(4,1,1).p("AoGC/QBgAACAhbQBPg4BZhYQAjghAjgZQCVhvCVAfQABAAACABQB2AgB6B3ANoC/QiaACjljcEAjhAC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jLDIQjrDmidgIEgjgABrQCOACBEAgQBEAfCQgbQCQgbC+iuQC/ivDBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgC");
	this.shape_311.setTransform(71.025,-170.7865);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f().s("#74492A").ss(4,1,1).p("Ac/hdMg03AAAQi/CviHAM");
	this.shape_312.setTransform(502.075,-161.25);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjcEggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgC");
	this.shape_313.setTransform(108.675,-170.7686);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f().s("#74492A").ss(4,1,1).p("AjvhJQC2gzA4BdQA2BcArAPQArAQAfAAQAeABAogL");
	this.shape_314.setTransform(-118.5,-161.4991);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f().s("#74492A").ss(4,1,1).p("AXJhdMgpMAAAQi/CviHAM");
	this.shape_315.setTransform(519.35,-160.5);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f().s("#74492A").ss(4,1,1).p("ArgC/QBgAACAhbQBPg4BZhYQAjghAjgZQCAhfB/AJQAFAAAFgBQAqgBAsAMQBjAeCBB5QABAAABABIABABIABABQDiDZCYgCEggrAC6QCRgdDMjJQCViNCSgFQAxgBAwANQBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgCAKyC/QBhAACAhbQBPg4BZhYQAjghAigZQB1hWB0gBQAQgBAQABQAhACAgAJQBjAeCBB5QABAAABABIACABIAAABQDiDZCYgCAWZi1QgFgBgGgB");
	this.shape_316.setTransform(162.9,-170.0194);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f().s("#74492A").ss(4,1,1).p("AHADAQARAAASgDAnigjQAlglBBg6QAxgtBJgMQAKgCALgBQAOAAALgBQAWAAANABQAXADAtAUQAsAUCAB5QABAAAAABIACABIABABQDiDZCXgC");
	this.shape_317.setTransform(-95.175,-170.1304);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_318.setTransform(183.825,-170.7686);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f().s("#74492A").ss(4,1,1).p("ACjhdQi+CviHAM");
	this.shape_319.setTransform(-10.5,-161.25);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f().s("#74492A").ss(4,1,1).p("AJ8CvQiXADjijaQgBAAAAAAIgCgCQgBAAhshWQhqhUicBFQgDACgDABQkOCVj0AJ");
	this.shape_320.setTransform(-90.95,-169.2035);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f().s("#74492A").ss(4,1,1).p("AV9hdMgmzAAAQi/CviHAM");
	this.shape_321.setTransform(550.125,-161.25);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAgZAC/QgrACg1gbQgugYhCg3QgcgXhEg+Qg1gwgigYQg4gsgogZQhLguhBAAQhDgBhvBCQhNAuh8BeQhfBJh5AzQhzAxg8gCAKgC/QiZACjmjc");
	this.shape_322.setTransform(201.725,-170.7596);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f().s("#74492A").ss(4,1,1).p("AKLDAQiYACjhjZIgBgBIgBgBIgBgBQhihagyggQgzgghUgJQhVgJhVAiQhVAhiNBRQgzAghMATQhNATgmAC");
	this.shape_323.setTransform(-76.3,-170.3934);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f().s("#74492A").ss(4,1,1).p("AVAhdMgk5AAAQi/CviHAM");
	this.shape_324.setTransform(559.475,-161.25);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCAKgC/QiZACjmjcArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_325.setTransform(217.225,-170.7686);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f().s("#74492A").ss(4,1,1).p("AL/C/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjAg1jHC7QhnBrlOgrAr+AUQAwgLA6AJ");
	this.shape_326.setTransform(-70.65,-170.7686);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f().s("#74492A").ss(4,1,1).p("ATKhdMghNAAAQi/CviHAM");
	this.shape_327.setTransform(564.375,-161.25);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f().s("#74492A").ss(4,1,1).p("ANbDdQiYADjijbQAAAAAAAAIgDgCQAAAAgBgBQiBh3hkgeQi/g1jFC4QgBABgCABQgdAbgdAXQgNAIgOAGQhKAmg7AAQhgAAg1gxQglgggdhJQgjhVgPgVQgkgxhBAAQgWAAgrASQgXAKgrAR");
	this.shape_328.setTransform(-63.1,-173.8486);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f().s("#74492A").ss(4,1,1).p("ARUhcI9hgBQi/CviHAM");
	this.shape_329.setTransform(569.275,-161.25);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3AKgC/QiZACjmjcEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_330.setTransform(250.625,-170.7686);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f().s("#74492A").ss(4,1,1).p("AOcC+QiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQjBg2jGC7Qj4DshTAAQhUABgkgOQgkgNhig+Qhig+gjgRQgjgQgoAGQgoAHgNAC");
	this.shape_331.setTransform(-52.925,-170.7192);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_332.setTransform(267.325,-170.7686);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f().s("#74492A").ss(4,1,1).p("APoC+QiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jGC7QjvDsicgBAmQC+QiGAJh/heQh/hdjTBp");
	this.shape_333.setTransform(-43.875,-170.7364);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f().s("#74492A").ss(4,1,1).p("AQvC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjuDricAAAwuASQDZhCBSA9QBRA/BSAxQB+BECZgC");
	this.shape_334.setTransform(-34.2875,-170.7657);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f().s("#74492A").ss(4,1,1).p("ASUD2QiXADjijbQgBAAAAAAIgCgCQAAAAgBgBQiBh3hkgeQjBg2jHC6QjuDticgBAyTiyQC2h2BsBaQBsBaCjCQQDlDdCZgD");
	this.shape_335.setTransform(-27.6625,-176.3049);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f().s("#74492A").ss(4,1,1).p("AThDHQiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jHC7QjvDsibgBAiXDHQiZADjmjdAzgAkQBlgMAegcQAdgeAIgOQAJgOADgEQA9heBcgaQBigcBMAjQBNAiB+B7");
	this.shape_336.setTransform(-18.6625,-171.6338);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f().s("#74492A").ss(4,1,1).p("AVNDAQiYACjijZQAAAAAAgBIgCgBQgBgBgBAAQiBh5hjgeQjBg1jIC7QjvDribAAA1MBqQDCANBUhdQBVhdBVhJQBWhJCVAgQABAAABABQB2AgB6B3AgsDAQiZACjmjc");
	this.shape_337.setTransform(-12.7,-170.851);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f().s("#74492A").ss(4,1,1).p("AV1DLQiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAgDDLQiZACjmjcA10AZQDnAjBpgrQBqgrBUhVQBThVBDgFQBCgFBHAjQBHAiB6B3");
	this.shape_338.setTransform(-0.075,-171.9815);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f().s("#74492A").ss(4,1,1).p("AXXDnQiYACjijaQAAAAAAgBIgCgBQgBgBAAAAQiCh4hjgeQjBg1jHC7QjvDridAAAkkAJQh6h2g8gWQg8gWhKABQhKAChQA4Qg1AlgoAlIgCADQgQAPgOAPQgCABgBABQgMALgMAIQgeAVgxAUQgxATgCAAQjXA5gljQQgljTihAvABeDnQiZACjljd");
	this.shape_339.setTransform(6.9,-174.7693);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f().s("#74492A").ss(4,1,1).p("AY5C+QiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQjCg2jGC7QjwDsicgBAC/C+QiZADjljdAyvC+QBhAACAhbQBOg3BahZQAjghAigZQCXhvCVAgQABAAABAAQB2AhB6B2A44ANQC2DBDPgQ");
	this.shape_340.setTransform(22.15,-170.7069);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f().s("#74492A").ss(4,1,1).p("AboC7QiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jHC7QjvDsicgBAFvC7QiZADjljdAv/C7QBhAACAhbQBOg3BahZQAjghAigZQCXhvCVAgQABAAABAAQB2AhB6B2A7nBsQDGgCDBA0QDBA0CcgX");
	this.shape_341.setTransform(21.275,-170.4269);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f().s("#74492A").ss(4,1,1).p("AcIC/QiYACjijZQgBAAAAgBIgBgBQgBgBgBAAQiBh5hjgeQjCg1jHC7QjuDridAAAvgC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCVAfQABAAABABQB2AgB5B3AGOC/QiZACjmjcA8HAPQDhg1BnAVQBoAUBuBfQBuBfCXgC");
	this.shape_342.setTransform(34.85,-170.7671);

	var maskedShapeInstanceList = [this.shape_287,this.shape_288,this.shape_289,this.shape_290,this.shape_291,this.shape_292,this.shape_293,this.shape_294,this.shape_295,this.shape_296,this.shape_297,this.shape_298,this.shape_299,this.shape_300,this.shape_301,this.shape_302,this.shape_303,this.shape_304,this.shape_305,this.shape_306,this.shape_307,this.shape_308,this.shape_309,this.shape_310,this.shape_311,this.shape_312,this.shape_313,this.shape_314,this.shape_315,this.shape_316,this.shape_317,this.shape_318,this.shape_319,this.shape_320,this.shape_321,this.shape_322,this.shape_323,this.shape_324,this.shape_325,this.shape_326,this.shape_327,this.shape_328,this.shape_329,this.shape_330,this.shape_331,this.shape_332,this.shape_333,this.shape_334,this.shape_335,this.shape_336,this.shape_337,this.shape_338,this.shape_339,this.shape_340,this.shape_341,this.shape_342];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_287}]}).to({state:[{t:this.shape_289},{t:this.shape_288}]},4).to({state:[{t:this.shape_290}]},4).to({state:[{t:this.shape_293},{t:this.shape_292},{t:this.shape_291}]},4).to({state:[{t:this.shape_294}]},4).to({state:[{t:this.shape_295}]},4).to({state:[{t:this.shape_297},{t:this.shape_296}]},4).to({state:[{t:this.shape_300},{t:this.shape_299},{t:this.shape_298}]},4).to({state:[{t:this.shape_301}]},4).to({state:[{t:this.shape_303},{t:this.shape_302}]},4).to({state:[{t:this.shape_305},{t:this.shape_304}]},4).to({state:[{t:this.shape_307},{t:this.shape_306}]},4).to({state:[{t:this.shape_309},{t:this.shape_308}]},4).to({state:[{t:this.shape_311},{t:this.shape_310}]},4).to({state:[{t:this.shape_314},{t:this.shape_313},{t:this.shape_312}]},4).to({state:[{t:this.shape_317},{t:this.shape_316},{t:this.shape_315,p:{x:519.35,y:-160.5}}]},5).to({state:[{t:this.shape_320},{t:this.shape_319,p:{x:-10.5}},{t:this.shape_318,p:{x:183.825}},{t:this.shape_315,p:{x:539.85,y:-161.25}}]},4).to({state:[{t:this.shape_323},{t:this.shape_319,p:{x:7.4}},{t:this.shape_322},{t:this.shape_321}]},4).to({state:[{t:this.shape_326},{t:this.shape_319,p:{x:22.9}},{t:this.shape_325,p:{x:217.225}},{t:this.shape_324}]},4).to({state:[{t:this.shape_328},{t:this.shape_319,p:{x:39.6}},{t:this.shape_325,p:{x:233.925}},{t:this.shape_327}]},4).to({state:[{t:this.shape_331},{t:this.shape_319,p:{x:56.3}},{t:this.shape_330,p:{x:250.625}},{t:this.shape_329,p:{x:569.275}}]},4).to({state:[{t:this.shape_333},{t:this.shape_319,p:{x:73}},{t:this.shape_332,p:{x:267.325}},{t:this.shape_329,p:{x:585.975}}]},3).to({state:[{t:this.shape_334},{t:this.shape_319,p:{x:89.7}},{t:this.shape_332,p:{x:284.025}},{t:this.shape_329,p:{x:602.675}}]},4).to({state:[{t:this.shape_335},{t:this.shape_319,p:{x:106.4}},{t:this.shape_332,p:{x:300.725}},{t:this.shape_329,p:{x:619.375}}]},4).to({state:[{t:this.shape_336},{t:this.shape_319,p:{x:123.1}},{t:this.shape_332,p:{x:317.425}},{t:this.shape_329,p:{x:636.075}}]},4).to({state:[{t:this.shape_337},{t:this.shape_319,p:{x:139.8}},{t:this.shape_332,p:{x:334.125}},{t:this.shape_329,p:{x:652.775}}]},4).to({state:[{t:this.shape_338},{t:this.shape_319,p:{x:156.5}},{t:this.shape_318,p:{x:350.825}},{t:this.shape_329,p:{x:669.475}}]},4).to({state:[{t:this.shape_339},{t:this.shape_319,p:{x:173.2}},{t:this.shape_318,p:{x:367.525}},{t:this.shape_329,p:{x:686.175}}]},4).to({state:[{t:this.shape_340},{t:this.shape_319,p:{x:198.25}},{t:this.shape_325,p:{x:392.575}},{t:this.shape_329,p:{x:711.225}}]},4).to({state:[{t:this.shape_341},{t:this.shape_319,p:{x:214.95}},{t:this.shape_330,p:{x:409.275}},{t:this.shape_329,p:{x:727.925}}]},4).to({state:[{t:this.shape_342},{t:this.shape_319,p:{x:231.65}},{t:this.shape_332,p:{x:425.975}},{t:this.shape_329,p:{x:744.625}}]},4).to({state:[]},4).wait(1));

	// Layer_6
	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f().s("#74492A").ss(4,1,1).p("AN7AAI71AB");
	this.shape_343.setTransform(608,-171.575);

	var maskedShapeInstanceList = [this.shape_343];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_343).wait(4).to({y:-167.375},0).wait(4).to({y:-169.975},0).wait(4).to({y:-171.375},0).wait(4).to({y:-170.075},0).wait(4).to({y:-170.475},0).wait(4).to({y:-170.625},0).wait(4).to({y:-171.275},0).wait(4).to({y:-170.375},0).wait(4).to({y:-170.075},0).wait(4).to({y:-170.675},0).wait(8).to({y:-170.075},0).to({_off:true},4).wait(73));

	// Layer 4
	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#66CC99").s().p("AI5AIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIAgAAIAAAAIAdAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIgcAAIAAAAIghAAgAHBAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgAFJAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgADRAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgABZAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgAgeAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA7AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg7AAgAiWAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgAkOAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgAmGAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgAnmAIIgYAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIANAAIAvAAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIgkAAgAp2AIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgAruAIQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIg8AAgAtCAIIAAgJIAYAAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAIgYAAgEBE6AAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEBDCAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEBBKAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEA/SAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEA9aAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEA7iAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEA5qAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEA3yAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEA16AAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEA0CAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAyKAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAwSAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAuaAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAsiAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAqqAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAoyAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAm6AAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAlCAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAjKAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEAhSAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAfaAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAdiAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAbqAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAZyAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAX6AIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAWCAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAUKAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgASSAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAQaAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIAJAAIAzAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAOiAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAMqAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAKyAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAtlAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIAcAAIAAAJIgcAAgAvdAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAxVAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgAzNAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgA1FAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgA29AIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgA41AIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgA6tAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgA8lAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgA+dAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEggVAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgiNAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgjhAAIIgkAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIAkAAIAYAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIgYAAgEgl9AAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgn1AAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgptAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIABgCQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAIACACIAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgrlAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgsuAAIIgvAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIAvAAIANAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIgNAAgEgvVAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgxNAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEgzFAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEg09AAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEg21AAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEg4tAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEg6lAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8AAgEg8dAAHQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8gBgEg+VAAGQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8gBgEhANAAFQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIg8gBgEhCFAAEQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAIg8gBgEhD9AADQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAIg8gBgEhF1AACQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAIg8gBg");
	this.shape_344.setTransform(245.575,-170.575);

	var maskedShapeInstanceList = [this.shape_344];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_344).to({_off:true},124).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-281.7,-290.8,1557.7,322.90000000000003);


(lib.level_01copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_127 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(127).call(this.frame_127).wait(1));

	// Layer 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhRGATpQi4AAAAjLMAAAgg6QAAjMC4AAMCiPAAAQC2AAAADMMAAAAg6QAADLi2AAg");
	mask.setTransform(182.2,-159.975);

	// Layer_8
	this.instance = new lib.adse();
	this.instance.parent = this;
	this.instance.setTransform(555.05,-171.8,1,1,0,0,0,599.9,-171.8);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(127).to({_off:false},0).wait(1));

	// Layer 5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#583720").s().p("AhNgEIAZgHIBDgMIgBgBIAAAAIACAAIABgBIAAAAIAlgDQALgBATAEIABgBIgEAHQgCABABAFQgFgBgCADIgIAJQgDAFADADIgBAAIgWAEIgBAAIgFABIAAAAIgBAAIhpATQgZgUASgOg");
	this.shape.setTransform(-156.2312,-166.61);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C59064").s().p("ADBBjIgDgBQgLgMgJgNQgTgbAXgJIADAIQASAdAWAZIgBAAIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAgBgBAAQAAAAAAABQgBAAAAAAQgLgUgRgVQgHgHgDgIQgGgYAdAHQABAGAEAHQAVAaANAaQAAALgMAAIgKgCgACHA7IAXgFQAGAZATAOQgbgPgVgTgAD2BaIAAAAIgCgBQgKgggaggIgCgDQAMgBAKgIIANAEQAGALAJANQAMAQACAPQAGATgUAAIgKgBgAEUBOQgDgfgZgcQAMADANACIAGAAQAJAOAGAPQALAZgXAAIgGAAgACHA6IAAABIgFABIAFgCgACHA7gAiHAcQgmgCgygPIAAAAIgLgCIgJgDQgngKgJgNQgWgXA7gaQAIgEASgHIABAAIACAAIBEAIIBZALIByAUIA5AKIAFgBIAUgGIAagGQALgCAfADQAdAEArAhIgCABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAAAAAQAIARARgCQgOAHgWgFQgEABgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBAAQgVgIgTgNQAQAPASAGIgBAAIAHAEIAMAEQgKAEgLACIgEAAIgGABIgCAAQgWAAgbgLQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQATAKAPADIAAAAQgUgEgLABIgkAEIgBAAIgBABIgDAAQhAAFgrABIgtABQgsgBgtgCgAjghNIAhgYIAfAcg");
	this.shape_1.setTransform(-165.5843,-171.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DFF4FF").s().p("AAnAsIhnhXICBBTIgZAEg");
	this.shape_2.setTransform(-183.925,-183.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AC7CCQgigHgbggIgDgEIABAAIABAAIAFgBQAVATAbAQQgTgPgGgYIAAABQgCgEADgGIAHgJQADgCAFAAQgCgFACAAIAFgHIgBAAIAAAAQgPgEgTgJQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAbAMAWAAIACAAIAGgBIAEgBQALgBAKgEIgMgFIgHgDIABAAQgSgIgQgOQATANAVAJQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAJAEgCQAWAGAOgIQgRACgIgRQgBAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gKIhygTIhZgLIhEgIIgCAAIADAAIBAADIgfgcIg8g1IACgHIABAAIBoBZIACAAIAMABQBOAHA0AKIBnASIACABIARgFQAIgDAogDQAngBAjAUQAeAUAVAUIABABIABAAIAAACIgCABQgDAGgIAAQAhAhgXAYQgGAGgLgDIgBAAIAAADQAAAHgJACQgMADgIgGQAFAPgVgBQgIAAgEgDQgEAFgGAAQgHAAgKgFgAClBlQAJANALALIADACQAOAGAJgGIAAgBIAAAAIABAAQgWgZgSgdIgDgHQgXAJATAbgADYB9IgBACQAWAFAAgPQgNgagVgZQgEgHgBgHQgdgGAGAXQADAIAHAIQARAVALATIABAAIACAAgADJAyIACACQAaAhAKAfIACABIAAAAQAfAGgHgYQgCgPgMgQQgJgMgGgMIgNgDQgKAHgMACgAEPBpQAfAEgNgdQgGgPgJgOIgGAAQgNgBgMgDQAZAcADAegAEZAmIgMgKIgEACIgBAAQAIAEAJAEIAAAAgAhdBEQhWAAgygOQgygOgSgSIABgNQAJANAnALIAJADIALADIAAAAQAyAPAmACQBDADBDgBQArgBBAgGIADAAIgCAAIABAAIAAABIhDAMQg5AEgyAAIgWAAg");
	this.shape_3.setTransform(-165.0527,-174.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#583720").s().p("AAcAUIgHAAIhsgJQgLgWAagJIAcgBQAnABARACIAMABQATACAUAFQALACAQAIIABgBIgIAEQgDAAgBAGQgFgCgEACQgIADgEADQgHAEAAADg");
	this.shape_4.setTransform(-163.426,-160.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DFF4FF").s().p("AgvgiIgBAAIADgNIBeBGIgjAZg");
	this.shape_5.setTransform(-184.5,-183.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C59064").s().p("ACKCOIABgCQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAQACgUgDgWQgBgJACgIQAJgWAWANQgDAFAAAHQADAdgEAaQgGAIgIAAQgFAAgHgEgACnCLIAAgBIgBAAQAKgggDgiIAAgDQAMACAOgFIAJAHQgBAMABANQAAAQgHAOQgFAPgNAAQgHAAgJgEgABxCHIgCgCQgDgNAAgNQgBgdAagDIgCAHQAAAeAEAcIgCAAIAAAAIgFABQgIAAgHgGgADKCIQAQgcgFggQAJAGAMAEIAFADQAAAOgEAPQgEAUgQAAQgGAAgHgCgABVBUIAXACIAAAAQgJAXAJASQgQgUgHgXgADcBMQgEAAgNgMIgKgIIgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgPgOgJgPQAGAQALALIAAABIAFADQADAFAEACQgLADgLgDQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBIgFAAIgCAAQgVgHgRgQQAAAAgBAAQAAABAAAAQAAAAABAAQAAABAAAAQALANAMAGIAAABQgQgIgLgCQgUgFgTgCIgNgBQgRgCgngBQATAAAUABIhKgRQg/gOg8gTQg7gUgVgVIgVgUIgHgHIAGAEIAAgCIgBgDQgCgGADgUIADgMIAFgQIAIgEIAGABIAFAAQASgBAQACIABABIAVgOIAFAGIANARIgDgBIAEADQAMAHAmAQIAJADIA5AaQAvAVAvAYIAvAXIAEgBIAWABIAcAAQALAAAbALQAZAJASApIgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgDASARABIgKABQgNAAgMgHg");
	this.shape_6.setTransform(-169.1,-166.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("ACLCyQgHgCgBgFQgNAJgLgPQgcgOgFgjIAAgEIAHAAQAHAXAQAUQgJgSAJgXIAAAAQAAgDAHgEQAEgEAIgDQAEgBAFABQABgFADAAIAIgFIgBAAIABAAQgMgHgLgMQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQASAQAUAGIACABIAGAAQAAAAAAAAQABABAAAAQABAAABgBQAAAAABAAQALACAMgCQgFgDgDgEIgFgEIABAAQgMgLgGgRQAKAQAOAOQABgBAAAAQAAAAAAAAQABAAAAABQAAAAAAABIABAAIAKAHQAMANAFAAQAQAKASgEQgQgCADgRQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIABAAQgSgogZgJQgbgLgLAAIgcgBIgWgBIgEAAIgvgWQgvgXgugVIg6gaIgJgEQgmgQgMgGIgEgDIADABIACABIASAFQAQAFAgAQIgFgDQBJAaAqAXIBUAoIABABIAUAAQAJgBAmAHQAlAJATAbQAPAYAHAXIABABIAAABIgBACIgCABQgGADgJgBQALAlglAQQgIAEgJgGIgBAAIgCADQgFAHgJgBQgMgBgFgHQgEALgLAAIgJgBgACICoIgCABQAQALAKgOQAEgbgDgcQABgHACgGQgWgNgJAXQgCAIABAIQADAXgCAUIABAAIACABgACpBkQAEAigLAgIACAAIgBABQAaAMAIgXQAHgOAAgRQgBgNABgMIgJgGQgOAFgMgCIAAADgABoCGQAAAOADAMIACADQAJAIAMgDIAAAAIABAAQgEgcABgeIABgHQgaACABAdgADGCjQAbALAGgdQAEgPAAgOIgFgCQgLgEgKgGQAGAfgRAcgADwBeQAEAGAGAFQgCgGgDgFIgEAAIAAAAIgBAAgAAIBGQhCgNg2gPQhQgVgngcQgngcATgFIAWAUQAUAUA8AUQA7ATBAAOIBJASQgTgCgUABgAhWhMIABgBIAAABgAiQhdIgGgBIgOgRIgFgGIgsg3IAHgFIABgBIA+BTIACADIgDgBg");
	this.shape_7.setTransform(-168.725,-169.4125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C59064").s().p("ADBBjIgDgCQgLgLgJgMQgTgcAXgIIADAHQASAcAWAZIgBABIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgLgUgRgUQgHgIgDgJQgGgXAdAHQABAGAEAHQAVAZANAaQAAAMgMAAIgKgCgACHA7IAXgFQAGAZATAPQgbgQgVgTgAD2BaIAAgBIgCAAQgKgggaggIgCgCQAMgCAKgHIANADQAGAMAJAMQAMAQACAOQAGAUgUAAIgKgBgAEUBNQgDgdgZgdQAMADANABIAGABQAJAOAGAOQALAagXAAIgGgBgACHA7IAAAAIgFABIAFgBgACHA7gAiHAdQgmgDgygOIAAAAIgLgDIgJgDQgngKgJgOQgWgWA7gaQAIgFASgFIABgBIACABIBEAHIBZAMIByATIA5AJIAFgBIAUgFIAagFQALgCAfADQAdADArAhIgCAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQAIARARgDQgOAJgWgHQgEACgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBABQgVgJgTgNQAQAOASAIIgBAAIAHACIAMAFQgKAFgLABIgEAAIgGABIgCABQgWgBgbgMQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQATAKAPADIAAABQgUgFgLACIgkADIgBAAIgBAAIgDAAQhAAGgrABIgtAAQgtAAgsgBgAjghNIAhgZIAfAcg");
	this.shape_8.setTransform(-165.5343,-171.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AC7CBQgigFgbghIgDgDIABgBIABAAIAFgBQAVAUAbAPQgTgPgGgYIAAAAQgCgDADgGIAHgJQADgCAFABQgCgGACgBIAFgHIgBABIAAgBQgPgDgTgJQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAbAMAWAAIACgBIAGAAIAEAAQALgCAKgFIgMgEIgHgDIABAAQgSgIgQgOQATAMAVAKQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAIAEgBQAWAGAOgIQgRADgIgSQgBgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gJIhygUIhZgMIhEgHIgCgBIADAAIBAAEIgfgcIg8g1IACgHIABABIBoBYIACAAIAMABQBOAIA0AJIBnATIACABIARgGQAIgDAogCQAngCAjAVQAeASAVAVIABABIABAAIAAADIgCABQgDAEgIABQAhAhgXAYQgGAGgLgEIgBAAIAAADQAAAJgJABQgMACgIgGQAFAQgVAAQgIAAgEgFQgEAGgGAAQgHAAgKgGgAClBlQAJANALALIADACQAOAGAJgGIAAAAIAAAAIABgBQgWgZgSgcIgDgIQgXAIATAcgADYB+IgBABQAWAFAAgPQgNgagVgaQgEgGgBgGQgdgIAGAYQADAIAHAIQARAUALAVIABgBIACABgADJAyIACADQAaAfAKAhIACAAIAAABQAfAEgHgXQgCgPgMgQQgJgMgGgLIgNgEQgKAHgMACgAEPBpQAfADgNgcQgGgPgJgNIgGgBQgNgBgMgEQAZAdADAegAEZAlIgMgJIgEABIgBAAQAIAFAJADIAAAAgAhdBDQhWAAgygNQgygOgSgTIABgMQAJANAnAMIAJADIALACIAAAAQAyAPAmACQBDADBDgCQArgBBAgFIADAAIgCABIABAAIAAAAIhDAMQg5AEgyAAIgWgBg");
	this.shape_9.setTransform(-165.0027,-174.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#583720").s().p("AhAAkIASgSQAGgKAPgJIAHgGIAUgRIABAAIAFgFIAWgQQAPgLATgGIAAAAIABgBIgBAJQgBABAEAEQgFABgBAEIgCALQABAHADACIgRAPIgGAEIhRBFQgfgFAIgXg");
	this.shape_10.setTransform(-156.4231,-185.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C59064").s().p("AjfCFQgXgEgOgJQgVgMgFgHIACgGIABgBQgXgTAOAIIAIAGQAHABABgCQALgMANgKQADAAAEgBIAbgTQAJgCAzgWIAMgFIBAgZIBsgpQArgPAMgGQAAAAABgBQABAAAAAAQAAgBAAAAQABAAAAgBIAPgOIAUgSQAIgIAcgNQAbgMA1AHIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQARALAMgLQgHAOgWAGQgDADgVADIgOADIgBABQAAgBgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgXADgXgCQAVAEAUgCIgBABIAHgBIANgCQgGAJgIAHIgEACIgEADIgDACQgTAKgcAEQAAAAAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQAVgCAPgEIAAAAQgTAHgPAKIgWARIgFAEIgBABIgVARIhEAoQg5Akg7AfQg9AfgjACIgQABQgIAAgHgBgADbgEQgOgEgPgHQgfgNAQgUIAGAGQAeAPAgALIgBABIABAAQgFAJgPACIgEAAgACZgKIARgPIAAABIAAgBQASASAYADQggABgbgHgADzgSQgTgLgZgKQgJgDgIgFQgQgSAcgIQAEAFAHAEQAfAMAYAPQAHANgVAHQAAAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAAAgAEHgnIgCABQgYgXgngPQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAKgHAEgLIAOgEIAZANQASAIAKALQARARgeAMgADmhlQAMgCAMgHIAFgCQAPAHANAKQAZATgdAMQgRgZgkgMg");
	this.shape_11.setTransform(-167.1141,-185.2998);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AjuCMQgdgEgPgKQgPgKAEgPIABgBQAEAGAVAMQAPAJAXAEQALADATgCQAkgDA8gfQA8gfA4gjIBFgpIgIAGQgOAJgHAKQg5Ang0AdQhKArgnAJQgaAFgWAAIgVgBgAi1AXIA3gZQAqgUA2gTIBOgdQAagJABgBIAJgLQAGgHAggWQAigVApABQAjABAcAIIACAAIABAAIABACIgBABQAAAGgHAFQAtAMgIAgQgBAIgMACIgBABIABADQAEAHgGAFQgJAIgLgBQAMALgSAKQgGAEgGgBQAAANgXAAQghALgngNIgEgCIAFgEQAcAGAfAAQgYgEgRgSIAAABIAAAAQgEgDgBgGIACgLQACgEAEgBQgEgEACgCIAAgIIAAAAQgQAFgUACQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQAdgDATgLIACgBIAFgEIADgCQAJgHAGgJIgNACIgHABIAAAAQgTACgVgEQAXABAXgCQAAgBAAAAQABAAAAAAQABgBAAAAQAAABABAAIAAgBIAOgDQAWgDACgDQAWgGAIgNQgNAKgQgLQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAIABgBQg2gIgbAMQgbANgJAIIgTASIgQAPQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAgBAAQgLAGgrAPIhsApIhBAZIgLAFQg0AXgIABIArgVgAC4gQQAOAGAPAEIAEABQAPgCAEgKIAAAAIAAgBQgfgLgegPIgHgFQgPATAfAOgADwgTQAVgGgHgOQgZgPgegMQgHgEgFgFQgcAJARARQAHAGAKADQAZAJATAMIABgBIACABgAEBgoIAAAAQAdgLgRgRQgKgMgSgIIgZgMIgNADQgEAMgLAHQABAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAmAPAZAWIABAAIABAAgAD3hvQgMAGgMADQAkAMASAYQAcgMgZgTQgNgKgPgGIgFACgADpiAIASgBIgPgCIgCADIAAAAIgBAAgAigAGIABABIgBAAIAAgBg");
	this.shape_12.setTransform(-166.4874,-185.1266);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C59064").s().p("ADBBjIgDgBQgLgMgJgNQgTgbAXgJIADAIQASAdAWAZIgBAAIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAgBgBAAQAAAAAAABQgBAAAAAAQgLgUgRgVQgHgHgDgIQgGgYAdAHQABAGAEAHQAVAaANAaQAAALgMAAIgKgCgACHA7IgFABIAFgCIAAABIAXgFQAGAZATAOQgbgPgVgTgAD2BaIAAAAIgCgBQgKgggaggIgCgDQAMgBAKgIIANAEQAGALAJANQAMAQACAPQAGATgUAAIgKgBgAEUBOQgDgfgZgcQAMADANACIAGAAQAJAOAGAPQALAZgXAAIgGAAgAiHAcQgmgCgygPIAAAAIgLgCIgJgDQgngKgJgNQgWgXA7gaQAIgEASgHIABAAIACAAIBEAIIBZALIByAUIA5AKIAFgBIAUgGIAagGQALgCAfADQAdAEArAhIgCABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAAAAAQAIARARgCQgOAHgWgFQgEABgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBAAQgVgIgTgNQAQAPASAGIgBAAIAHAEIAMAEQgKAEgLACIgEAAIgGABIgCAAQgWAAgbgLQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQATAKAPADIAAAAQgUgEgLABIgkAEIgBAAIgBABIgDAAQhAAFgrABIgtABQgsgBgtgCgAjghNIAhgYIAfAcg");
	this.shape_13.setTransform(-165.5843,-171.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AC7CCQgigHgbggIgDgEIABAAIABAAIAFgBQAVATAbAQQgTgPgGgYIAAABQgCgEADgGIAHgJQADgCAFAAQgCgFACAAIAFgHIgBAAIAAAAQgPgEgTgJQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAbAMAWAAIACAAIAGgBIAEgBQALgBAKgEIgMgFIgHgDIABAAQgSgIgQgOQATANAVAJQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAJAEgCQAWAGAOgIQgRACgIgRQgBAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gKIhygTIhZgLIhEgIIgCAAIADAAIBAADIgfgcIg8g1IACgHIABAAIBoBZIACAAIAMABQBOAHA0AKIBnASIACABIARgFQAIgDAogDQAngBAjAUQAeAUAVAUIABABIABAAIAAACIgCABQgDAGgIAAQAhAhgXAYQgGAGgLgDIgBAAIAAADQAAAHgJACQgMADgIgGQAFAPgVgBQgIAAgEgDQgEAFgGAAQgHAAgKgFgAClBlQAJANALALIADACQAOAGAJgGIAAgBIAAAAIABAAQgWgZgSgdIgDgHQgXAJATAbgADYB9IgBACQAWAFAAgPQgNgagVgZQgEgHgBgHQgdgGAGAXQADAIAHAIQARAVALATIABAAIACAAgADJAyIACACQAaAhAKAfIACABIAAAAQAfAGgHgYQgCgPgMgQQgJgMgGgMIgNgDQgKAHgMACgAEPBpQAfAEgNgdQgGgPgJgOIgGAAQgNgBgMgDQAZAcADAegAEIAeQAIAEAJAEIgMgKIgEACIAAgBIgBABgAhdBEQhWAAgygOQgygOgSgSIABgNQAJANAnALIAJADIALADIAAAAQAyAPAmACQBDADBDgBQArgBBAgGIADAAIgCAAIABAAIAAABIhDAMQg5AEgyAAIgWAAg");
	this.shape_14.setTransform(-165.0527,-174.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#583720").s().p("AAcAUIgEAAIgDAAIhsgJQgLgWAagJIAcgBQAnABARACIAMABQATACAUAFQALACAQAIIABgBIgIAEQgDAAgBAGQgFgCgEACQgIADgEADQgHAEAAADg");
	this.shape_15.setTransform(-163.426,-160.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("ACLCyQgHgCgBgFQgNAJgLgPQgcgOgFgjIAAgEIADAAIAEAAQAHAXAQAUQgJgSAJgXIAAAAQAAgDAHgEQAEgEAIgDQAEgBAFABQABgFADAAIAIgFIgBAAIABAAQgMgHgLgMQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQASAQAUAGIACABIAGAAQAAAAAAAAQABABAAAAQABAAABgBQAAAAABAAQALACAMgCQgFgDgDgEIgFgEIABAAQgMgLgGgRQAKAQAOAOQABgBAAAAQAAAAAAAAQABAAAAABQAAAAAAABIABAAIAKAHQAMANAFAAQAQAKASgEQgQgCADgRQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIABAAQgSgogZgJQgbgLgLAAIgcgBIgWgBIgEAAIgvgWQgvgXgugVIg6gaIgJgEQgmgQgMgGIgEgDIADABIACABIASAFQAQAFAgAQIgFgDQBJAaAqAXIBUAoIABABIAUAAQAJgBAmAHQAlAJATAbQAPAYAHAXIABABIAAABIgBACIgCABQgGADgJgBQALAlglAQQgIAEgJgGIgBAAIgCADQgFAHgJgBQgMgBgFgHQgEALgLAAIgJgBgACICoIgCABQAQALAKgOQAEgbgDgcQABgHACgGQgWgNgJAXQgCAIABAIQADAXgCAUIABAAIACABgACpBkQAEAigLAgIACAAIgBABQAaAMAIgXQAHgOAAgRQgBgNABgMIgJgGQgOAFgMgCIAAADgABoCGQAAAOADAMIACADQAJAIAMgDIAAAAIABAAQgEgcABgeIABgHQgaACABAdgADGCjQAbALAGgdQAEgPAAgOIgFgCQgLgEgKgGQAGAfgRAcgADwBeQAEAGAGAFQgCgGgDgFIgEAAIAAAAIgBAAgAAIBGQhCgNg2gPQhQgVgngcQgngcATgFIAWAUQAUAUA8AUQA7ATBAAOIBJASQgTgCgUABgAhWhMIABgBIAAABgAiQhdIgGgBIgOgRIgFgGIgsg3IAHgFIABgBIA+BTIACADIgDgBg");
	this.shape_16.setTransform(-168.725,-169.4125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C59064").s().p("ADBBjIgDgCQgLgLgJgMQgTgcAXgIIADAHQASAcAWAZIgBABIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgLgUgRgUQgHgIgDgJQgGgXAdAHQABAGAEAHQAVAZANAaQAAAMgMAAIgKgCgACHA7IgFABIAFgBIAAAAIAXgFQAGAZATAPQgbgQgVgTgAD2BaIAAgBIgCAAQgKgggaggIgCgCQAMgCAKgHIANADQAGAMAJAMQAMAQACAOQAGAUgUAAIgKgBgAEUBNQgDgdgZgdQAMADANABIAGABQAJAOAGAOQALAagXAAIgGgBgAiHAdQgmgDgygOIAAAAIgLgDIgJgDQgngKgJgOQgWgWA7gaQAIgFASgFIABgBIACABIBEAHIBZAMIByATIA5AJIAFgBIAUgFIAagFQALgCAfADQAdADArAhIgCAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQAIARARgDQgOAJgWgHQgEACgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBABQgVgJgTgNQAQAOASAIIgBAAIAHACIAMAFQgKAFgLABIgEAAIgGABIgCABQgWgBgbgMQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQATAKAPADIAAABQgUgFgLACIgkADIgBAAIgBAAIgDAAQhAAGgrABIgtAAQgtAAgsgBgAjghNIAhgZIAfAcg");
	this.shape_17.setTransform(-165.5343,-171.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AC7CBQgigFgbghIgDgDIABgBIABAAIAFgBQAVAUAbAPQgTgPgGgYIAAAAQgCgDADgGIAHgJQADgCAFABQgCgGACgBIAFgHIgBABIAAgBQgPgDgTgJQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAbAMAWAAIACgBIAGAAIAEAAQALgCAKgFIgMgEIgHgDIABAAQgSgIgQgOQATAMAVAKQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAIAEgBQAWAGAOgIQgRADgIgSQgBgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gJIhygUIhZgMIhEgHIgCgBIADAAIBAAEIgfgcIg8g1IACgHIABABIBoBYIACAAIAMABQBOAIA0AJIBnATIACABIARgGQAIgDAogCQAngCAjAVQAeASAVAVIABABIABAAIAAADIgCABQgDAEgIABQAhAhgXAYQgGAGgLgEIgBAAIAAADQAAAJgJABQgMACgIgGQAFAQgVAAQgIAAgEgFQgEAGgGAAQgHAAgKgGgAClBlQAJANALALIADACQAOAGAJgGIAAAAIAAAAIABgBQgWgZgSgcIgDgIQgXAIATAcgADYB+IgBABQAWAFAAgPQgNgagVgaQgEgGgBgGQgdgIAGAYQADAIAHAIQARAUALAVIABgBIACABgADJAyIACADQAaAfAKAhIACAAIAAABQAfAEgHgXQgCgPgMgQQgJgMgGgLIgNgEQgKAHgMACgAEPBpQAfADgNgcQgGgPgJgNIgGgBQgNgBgMgEQAZAdADAegAEIAdQAIAFAJADIgMgJIgEABIAAAAIgBAAgAhdBDQhWAAgygNQgygOgSgTIABgMQAJANAnAMIAJADIALACIAAAAQAyAPAmACQBDADBDgCQArgBBAgFIADAAIgCABIABAAIAAAAIhDAMQg5AEgyAAIgWgBg");
	this.shape_18.setTransform(-165.0027,-174.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#583720").s().p("AhAAkIASgSQAGgKAPgJIAHgGIAUgRIABAAIAFgEIAWgRQAPgKATgHIAAgBIABAAIgBAJQgBABAEAEQgFABgBAEIgCALQABAHADACIgRAPIgGAEIhRBFQgfgFAIgXg");
	this.shape_19.setTransform(-156.4231,-185.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C59064").s().p("AjfCFQgXgEgOgJQgVgNgFgGIACgGIACgBQgYgUAOAJIAIAHQAHAAABgCQALgMANgKQADAAAEgCIAbgSQAJgCAzgWIAMgFIBAgZIBsgpQArgQAMgFQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAgBIAPgPIAUgSQAIgHAcgNQAbgMA1AHIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQARALAMgKQgHANgWAGQgDADgVADIgOADIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgXADgXgCQAVAEAUgCIgBABIAHgBIANgCQgGAJgIAHIgEACIgEADIgDACQgTAKgcAEQgBAAABABQAAAAAAAAQAAAAAAAAQABAAAAAAQAVgCAPgEIAAABQgTAGgPAKIgWARIgFAEIgBABIgVARIhEAoQg5Akg7AfQg9AfgjACIgQABQgIAAgHgBgADbgEQgOgEgPgHQgfgNAQgUIAGAFQAeAQAgALIgBAAIABABQgFAJgPACIgEAAgACZgKIARgPIAAAAQASASAYADQggAAgbgGgADzgRQgTgMgZgKQgJgDgIgFQgQgSAcgIQAEAFAHAEQAfAMAYAPQAHAOgUAGQgBAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAABgAEHgnIgCABQgYgXgngPQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAKgHAEgLIAOgDIAZAMQASAIAKALQARARgeAMgADmhlQAMgDAMgGIAFgCQAPAHANAKQAZASgdANQgRgZgkgMg");
	this.shape_20.setTransform(-167.1122,-185.2998);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AjuCMQgdgEgPgKQgPgKAEgPIABgBQAEAGAVAMQAPAJAXAEQALADATgCQAkgDA8gfQA8gfA4gjIBFgpIgIAGQgOAJgHAKQg5Ang0AdQhKArgnAJQgbAFgVAAIgVgBgAi1AXIA3gZQAqgUA2gTIBOgdQAagJABgBIAJgLQAGgHAggWQAigVApABQAjABAcAIIACAAIABAAIABACIgBABQAAAGgHAFQAtAMgIAgQgBAIgMACIgBABIABADQAEAHgGAFQgJAIgLgBQAMALgSAKQgGAEgGgBQAAANgXAAQghALgngNIgEgCIAFgEQAcAGAfAAQgYgEgRgSIAAABQgEgDgBgGIACgLQACgEAEgBQgEgEACgCIAAgIIAAAAQgQAFgUACQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAdgDATgLIACgBIAFgEIADgCQAJgHAGgJIgNACIgHABIAAAAQgTACgVgEQAXABAXgCQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABABIAAgBIAOgDQAWgDACgDQAWgGAIgNQgNAKgQgLQAAAAgBgBQAAAAAAAAQAAgBAAAAQABgBAAAAIABgBQg2gIgbAMQgbANgJAIIgTASIgQAPQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABgBAAQgLAGgrAPIhsApIhBAZIgLAFQg0AXgIABIArgVgAC4gQQAOAGAPAEIAEABQAPgCAEgKIAAAAIAAgBQgfgLgegPIgHgFQgPATAfAOgADwgTQAVgGgHgOQgZgPgegMQgHgEgFgFQgcAJARARQAHAGAKADQAZAJATAMIABgBIACABgAEBgoIAAAAQAdgLgRgRQgKgMgSgIIgZgMIgNADQgEAMgLAHQABAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAmAPAZAWIABAAIABAAgAD3hvQgMAGgMADQAkAMASAYQAcgMgZgTQgNgKgPgGIgFACgADpiAIASgBIgPgCIgCADIAAAAIgBAAgAigAGIABABIgBAAIAAgBg");
	this.shape_21.setTransform(-166.4902,-185.119);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_9},{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_14},{t:this.shape_13},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_16},{t:this.shape_6},{t:this.shape_5},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_18},{t:this.shape_17},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_14},{t:this.shape_13},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_16},{t:this.shape_6},{t:this.shape_5},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_18},{t:this.shape_17},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_14},{t:this.shape_13},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_16},{t:this.shape_6},{t:this.shape_5},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_18},{t:this.shape_17},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},5).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_14},{t:this.shape_13},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_16},{t:this.shape_6},{t:this.shape_5},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_18},{t:this.shape_17},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_14},{t:this.shape_13},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_16},{t:this.shape_6},{t:this.shape_5},{t:this.shape_15}]},3).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_18},{t:this.shape_17},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_14},{t:this.shape_13},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_16},{t:this.shape_6},{t:this.shape_5},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_18},{t:this.shape_17},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_14},{t:this.shape_13},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_16},{t:this.shape_6},{t:this.shape_5},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_18},{t:this.shape_17},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},4).to({state:[]},3).wait(1));

	// Layer 4
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C59064").s().p("AgcArIASgGIASgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBIgIACQgNACgRAJIgPAGIgEAAIAZhVIAQAJIATAMIAPAKQAIAFACAMQABAMgLAKQgJAIgTAJg");
	this.shape_22.setTransform(-193.591,-237.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgBArQASgJAKgIQALgKgCgMQgBgMgIgFIgPgKIgTgMIgQgJIgDgDIADAAQAQADAYAKIANAGQAUAKAGALIACAEIAAAKIgBADQgEAMgSAKIgKAEIgXAHIgPAFIAMgFgAg4AtIgBAAIAIgCIAFgCIAOgGQASgJANgCIAIgCQAAABABAAQAAABAAAAQAAABABAAQAAABAAAAQAAAEgDABIgHACIgSADIgSAGIgMADIgDAAIgEABIgCgBg");
	this.shape_23.setTransform(-192.9125,-237.625);

	this.instance_1 = new lib.sdrntm();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-201.6,-242.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#501C1E").s().p("AAAAAIABAAIAAAAIAAAAIgBAAg");
	this.shape_24.setTransform(-185.675,-223.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgzALQghgEgfgUQAUAFAeAEQAeAEAnAAQAmgBAZgCQAYgDAZgHQABACgTAKQgSAIgMADQgNACgiACIgTAAQgZAAgcgDg");
	this.shape_25.setTransform(-194.6195,-224.1295);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#874F2E").s().p("AiJE+QAchHhsgnQhvgogfgmIADgHQBfA/BjAlQBiAkCsAMQg6AQggAaQgrAagpAAQglAAgigVgAnXBNIgBgGQAHACALgDQAUgFASgDIAMAHIAAgBQgRgjg5AAQgBAAgBABQgBAAAAAAQAAAAAAAAQAAABABAAQALAFAPAFIAXAKIgLACIgCAAQgIADgJABQgJABgDAFIgCACQgKgDgMgKQgPgOAAgMQAAgNAPgEQAJgDASAAQAgAAAUAcQAQAUAAARQAAARgwAAQgPAAgGgPgAHGh7QARAEANAEQARATAMAWIgJANQgSgggggegAGeibIgVgOQgrgag0gTQgngOg5gIQhBgGgggFQhqgPg3gzQABgNgCgMQBcBbDGgUQA5AjBCAeQA3AZAmAeQgQgFgTgDg");
	this.shape_26.setTransform(-222.125,-236.4966);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#C59064").s().p("AiQD1Qhjglhgg/IACgHQABgGgGADIgFAEQgPAHgUADQhaAOgqg7Qgrg+A8gzQAMgKARACQBmAMADBDQAAAFAEgCQAMgGAEgIQA4AagCgjQAHgBADgEQAPgKgRgKQAOgIAJgJQAFgGgEgEQgQgUgagPQAUgJgEgOQAJgCALgJQA0goAEg2QAKgCAOgLIAHgFQAOALAhgKQBHgWAPg0QAEgOABgOQA1A0BsAPQAgAEBBAHQA4AIAnANQA1AUArAaIAUAOIgCgBIgHgBIgBAAIgJAAQgDgFACgHQgFABgSAHQgUAIAMARIAvAFQAZADAUAFQAfAdASAgQgJAPgDAQQgJApAQApQAtB1iBA8QheAjhwADQg7ACgqADQirgMhigkgAEMCuQAtAOApgQIAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgrALgngIIAAABgAngAiQgPAFAAAMQAAAMAQAOQAMAKAKADIgBABIADABIABAHQAHAPAPAAQAvAAAAgRQAAgRgPgVQgUgbghAAQgRAAgKACgAFoBCQAQAPATABQAUABANgFQAOgEAIgEQAJgDAKgKQAYgXAAghQAAgggYgXIgCgCQgXgWggAAIgBAAQgiAAgYAYQgOANgGARQgZgKgQgEIgDAAIABADIABABQADAAANAJIAVAMIAPAJQAHAFACANQACAMgLAKQgHAGgMAGIgWAKIAZgIIANgFQAEAGAQAPgAgBhoQgjAfAAAsQAAArAjAfQAiAfAyAAQAzAAAjgfQATgRAJgVQAGgPABgRIAAgEQAAgsgjgfQgjgegzAAQgyAAgiAegAE2AiQgOACgRAJQgVAKgHAAIACAAQAAACAGgCIADAAIAegJIATgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBgBIgIACgABnibQAcACAqAGIAuAGQAVgNgPgMIgRgOQgDAIgFAEIgJgCIAAgBIgHAAIg9gEQgbgDgkABQglABgaAFQgZAEgVAHIA2gBQA6ACAoAEgAIUgxIABABIgBABIAAgCg");
	this.shape_27.setTransform(-223.8726,-238.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#372F2F").s().p("AmcEEQgEgHgHgHQgsgthJgHQgLACgJAEQgGgVgEgYQgCgNAMgJQAggVgSgPIgPAGIgCgMQgCgKALgIQAfgYgTgQQgKAFgJAHQgEgYAKgVQAphcCYgLQAxgEgqgKQgVABgWACIgPACQgSgKgagFIAcgKQCBg0CQAXIABAAIACACIABgBQAGAAgEgDQANgWAYgTQBhhICPANIhQA4IgFABQgIABAAAGIABAAIgBABIADABIAOgCQBBgDA4ALQgmAEgjAKIgBABQAtALA/gLQCCgWBXA6QAhAXAWAXQg0gRg+ACIgNACIgKgCIgFAAIAHADIgaAGQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABIA2AFQAjARAqAQQCkA+guBeQgRgVgigXQgNACAJAIQAhAbANAYIgCABIADABQAgA/hpAsQABgfgEgSIAHgGIABgBIgBgBQgKgLgJgIQgKgQgRgQQgTgRgYgKQhogthQg2IADAAIgBgCIgGAAQhHgxg0g7QgPAiAwAkQAcAUAgAUQjHAGhfhiQgIgSgPgPQgBAAAAABQgBAAgBAAQAAAAAAAAQAAABAAAAIAAABQgFABACAFIAIAOQALAwgSAyQgRAwhFAAIAXgVQAXgXgSgPQgRAFgHAMQgSAcggAUQgEgNgJgJQgWAcABAnQABAvg2AVQgHADADAEIABADIgRAWIgRgJQgBABgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAEAdA3ATIgKAHQgLAGgEAGQgRgRgVgPQgXgRgPgFQABAGARASQATATASAKIASAMIAAAFQgBAEgDAEQgEAEAAAFIgfgLg");
	this.shape_28.setTransform(-217.0588,-261.8425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("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");
	this.shape_29.setTransform(-218.8817,-247.7474);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQAqgDA7gCQBwgDBegjQCBg8gth1QgQgpAJgqQADgQAJgPIAKgMQgMgWgSgSQgNgFgQgDQgUgFgZgDIgvgFQgMgRAUgIQASgHAFgBQgCAHADAFIAJAAIABAAIAHABIACABQATACARAFQgmgeg3gZQhCgdg5gjQjHAThchbQADAMgBANQgBAOgEAOQgPA0hHAWQghAKgOgLIgHAFQgOALgKACQgEA2g0AnQgLAJgJACQAEAOgUAJQAaAPAQAUQAEAEgFAGQgJAKgOAIQARAKgPAKQgDAEgHABQACAjg4gaQgEAIgMAGQgEACAAgFQgDhEhmgMQgRgCgMAKQg8A0ArA+QAqA7BagOQAUgDAPgHIAFgEQAGgDgBAGIgCAHIgDAGQAgAnBuAoQBtAmgdBIgAHrAOIAFANIAHgGIABgBIgBgBQgKgLgJgIIAHAOg");
	this.shape_30.setTransform(-218.8817,-247.7474);

	this.instance_2 = new lib.rt7();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-201.55,-241.15,0.7934,0.5254);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAAAGIAAgKIABAKg");
	this.shape_31.setTransform(-200.9,-160.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#261E1E").s().p("AAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIAAABg");
	this.shape_32.setTransform(-256.7386,-194.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#35BAD6").s().p("AAiA7IgGgBIgagIIhbgXQAXgzAugmIARADQBSAYAGAIIAFAFIAAACQgDAKABADQgaA8gEAHIAAAAIgCAEIgBABgAgSg/IAAAAIABAAIgBABg");
	this.shape_33.setTransform(-255.025,-188.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AALBmIgdgJIghgKIg3gOIADgGQARghAWgZIAcgdIAXgUQAPgPApgbQApgaATgGIAEAAIgCAFQgBABAAAAIABAAIAAAAIgBAAIABABIAAABIgFACIgCACQgzAbgXATQgUASgTAOIAAAAIAAABIgCAAQgvAlgWA0IBaAXIAbAIIAGABIAVAGIAAgBIACgEIABAAQAEgHAag9QgBgDADgKIAAgCIACADIABgDIAAAAIABAEIAAACIABABIACAHIgZBMQADABAAAFQABAFgGAGIg+gRgABkhuIADAAIAAgBIgCAAIgBABgABnh0IABAAIgBgBIAAAAg");
	this.shape_34.setTransform(-255.3,-191.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#246662").s().p("AgsAbIgRgDIACAAIABgBIgBAAQAVgOAUgRQAVgTA0gbIABgCIAGgCIgJAbIgIAxQgJALAJAeQgHgIhSgYgAg6AXIAAABIABgBIABAAIgCAAg");
	this.shape_35.setTransform(-250.95,-196.775);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C59064").s().p("AAeDvIgXgHQgpgPgnhvQgXi1ANhIQAMhJAKgTIB0AjIABgDIAgAJIghBeIgJAWQggBOgHBLIgCAJQAAACAMAHQAfAWAVAZQAGAMgQAHQgGADgDgBQgCgBgFgBQgFgBgNgKIgFgCQgLgIgCgGIAAAEQAGAXAKASQALATAGAHIACADQAOAMgIAHQgxgbgRgyQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAKA2A6AZIACAGQAEAKgRAAIgHgBg");
	this.shape_36.setTransform(-257.388,-160.4346);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#35BAD6").s().p("AhFAFIgBgCIgCAAIACgBIAAAAQAPgLAIgSIB4gMIgZBMIgBACg");
	this.shape_37.setTransform(-256.575,-184.9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgID0QgZgMgUgsQgVgrgGgaQgfjpAnhsQAHgSASgRIAIAAQgIASgPANIAAAAIgCABIACAAIABABQgKATgMBJQgNBIAXC1QAnBvApAPIAXAHQAYACgEgLIgCgGQg6gZgKg2QAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQARAyAxAbQAIgHgOgMIgCgDQgGgHgLgTQgKgSgGgXIAAgEQACAGALAIIAFACQANAKAFABQAFABACABQADABAGgDQAQgHgGgMQgVgZgfgWQgMgHAAgCIACgJQAHhMAghNIAJgWIAhheIAHABQg9CqgWBpIA0AqQAXAVgQAPQgHAFgLAAQgHgBgIgEQgFgBgFgGIgIgFIAAABQAEAOANAUQANAUACABIADAFIAEAKQADAHgGADQAEANgMAEIgMABQgUgBgYgNg");
	this.shape_38.setTransform(-257.3816,-161.925);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQirgMhigkQhjglhgg/IgDAGQAgAnBuAoQBtAmgdBIg");
	this.shape_39.setTransform(-218.8817,-247.7474);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#AA7F64").s().p("AnPBEQAGgWAKgWQANAWAwAJQAiAGA+AAQA2AABXgNQgHAWgJAWQAGADACgDQABAAAAAAQAAAAAAAAQAAAAAAABQAAABgBABQg+AThKABIgIAAQhoAAg6gvgAA6AyQgXgHABgUQABgPASgDIA0gJQAVAPBJAJQA+AIBBAAQBSAAAUgGQALgCAWgJQAAANgIAPQgHAPgWAFQhUAThTAAQhlAAhkgcgAAzgwIAEgBIgFgCIgBgBIAAAAIAAABQgggGgMgOIAfgRIADgCIAAADQABAAABAAQAAAAAAgBQABAAAAAAQAAAAAAgBIABgDQAbgPAdgHQgBAAAAABQAAAAAAABQgBAAAAABQAAABAAAAQAAAEAQATIgFAHQgFAHAAADQAAANAMAFQAGAEASABQAPABAGADQgBAHAGAHIAAABIgnADQgyADgYAQQAFgXgGgTg");
	this.shape_40.setTransform(-234.5,-81.8711);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F8E8D9").s().p("AmKBPQgwgKgNgVIANgZQAOgaAhgPQAAABAJgEQgIADABgBIAVgIQCCgnBEBIIAFAIIABAAIAAgBQAPATACAVIgFASQhYAOg1AAQg/AAgigGgADBArQhJgJgVgQQBxgVBqgiQAgAAAcAIQBRAUgDAsQgWAIgLADQgVAFhRAAQhCAAg+gIgAlAgyIgRACQAHgIAEgLQAIgPAXgBQBogEgHBBQgsgYhOgEg");
	this.shape_41.setTransform(-233.7196,-84.2116);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("Ah3A7QAYg9hsgMQgNABgLAEQgsAOAKAcQgWAEgUAKIgGAEIAHgNQAXgaAEgTIAFgDIAAAAQgGgHgNABIAAgBQAEgYAigMQB9guBPBFQAjAegWAVQgXgVghgPIAAABQgGAAgFAEIAAABQALAUAUAKQgfAbABAYQgIgHgLgGgADRA5QgSgBgGgDQgMgFAAgNQAAgEAEgGIAGgIQgRgRABgEQAAgBAAAAQAAgBAAgBQAAAAABgBQAAAAAAgBQAxgOA0AIIABAEIABgBIABgDQATADATAFQgHALADANIgDgDIgCADQgbgFggACIgCAAIgEACIgLAFQgGADgBAEIAAABQAJADAKgCQAegHAhgCQgCADgBADIgDAAQggADgTAOQgMAJgBAJQgHgDgOgCg");
	this.shape_42.setTransform(-241.45,-92.429);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#C59064").s().p("ABYhuIAHgCIAIgBIADAAIAPgEIgTACIABgYQACACAFABQBNAVBLgGQgGAhg0APIAAABQANgBAKgDQggBfAGBgQgYgEgdADQgvAEgpAPIgPAHQALiBAgh5gACGh3IAFgBIAAAAgAkFA+QASgtAOgwQAOgxARgqQBEASBLADQhCBegCBlQgtgkhdAEg");
	this.shape_43.setTransform(-234.6,-106.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#B09B61").s().p("Al7BtQCGiYA3ilQAFACAHAAIBjACQgkAngbAqQgDgogEgnIgCAAQgMAvAPAoQgoBAgYBDQgLAlgSAjQgUAnAHAgQAghLAZhNQATg5Akg0IABABIAAgBIAAgBQALgRAOgQQAcgkAMggQC1ADC1gBQADBnAtBkQAQAlAIAmQAIAgAOAbQgYAMgcAMQiGA7iSgrQABgxAMgvQAHgbAKgaQANgfACgaQAWACAdgKIgBgBQgaAEgYgCIAAgHIgDAGQgYgDgUgKIgDAAQATARAYADQgdA+gPBEQgMA4AKAzIgHABIACgEIgCAEQgqADgoAAQjfAAhrhkg");
	this.shape_44.setTransform(-229.1,-138.5914);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#35BAD6").s().p("AjFCZIgOgBQAAgxAPhUQgBh3gGg6QAlAOApAJQBCAOAvABICHABQAoAAADgDQA4BgARBNQAJANAFBfIhhAAQi0AAitgGgAj4iIIAAgCIgEgIQACACADABIACABIgDALg");
	this.shape_45.setTransform(-226.575,-175.8039);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#246662").s().p("AATBTQgugBhCgOQgpgJglgOIgTgIIAAAAIgEgMIgBgGIgCgLIABgDIABgYQAQgxBtgOIAAgBIADAAIACAAQARAnBegLQA3gIAKgTIAKACQgBgCAQAHQAMAFAjAUIgSAEQgOAJgJAbIgYgcIgDABIAZAfIAJAKIACADIAYAjIABABIANAUIABAEIAIAOQgDADgoAAIiIgBg");
	this.shape_46.setTransform(-229.8,-196.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("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");
	this.shape_47.setTransform(-234.6705,-137.986);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#246662").s().p("Ag7AFIAAAAIgKgLIgIgKQABgHACgGQAKgLAOgIIASgFIAMAHQAsAaA2AoQgNADhWAfIgmgxg");
	this.shape_48.setTransform(-208.225,-195.925);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#35BAD6").s().p("AhfgZQBXgeAMgDQAtAcAVAPQATAPAHADQgwAchIAdg");
	this.shape_49.setTransform(-200.825,-188);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#C59064").s().p("AhDAVQgcgVAAgKQBRgcArgfIBDA3IgZALIgBADQgaAUgXAVQgDADgEABQgLAJgHANIgCADQghgYgcgZg");
	this.shape_50.setTransform(-193.5,-180.05);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AAYCEQgbgTgYgcIgGgOIgXgaQgXgagdgtIADADIgEgFIABACIgDgEIgCgEQgGgJgGgIIgegqIgFgHIgDgFIAAgCIgFgHIAFAGIAIAKIAJAMIAAABIAmAwIBHBUQBIgcAxgcQgHgDgUgQQgUgPgtgcQg2gpgsgaIgMgHIAPgCIA+AqQBsBLAPAOIAoAfIAoAeIAAACIABAAIAGAGIgMgBIhDg2QgtAehPAcQAAAKAbAWQAcAZAhAYIgFAFIAAAHIgZgRg");
	this.shape_51.setTransform(-199.575,-186.75);

	var maskedShapeInstanceList = [this.shape_22,this.shape_23,this.instance_1,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.instance_2,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49,this.shape_50,this.shape_51];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.instance_2},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.instance_1},{t:this.shape_23},{t:this.shape_22}]}).to({state:[]},127).wait(1));

	// Layer_5
	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#74492A").ss(4,1,1).p("EgzcAAXQBBgfBPgBMBkpgAN");
	this.shape_52.setTransform(190.625,-169.275);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#74492A").ss(4,1,1).p("EAu7AATMhd1gAl");
	this.shape_53.setTransform(218.625,-169.125);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#74492A").ss(4,1,1).p("Al5AEQCZgFBGA3QBGA5BQACQBPACBQgiQBRgiCOif");
	this.shape_54.setTransform(-119.6,-159.4189);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#74492A").ss(4,1,1).p("Eg1bgBXQCSgqBbB9QBcB9DVgaQCHgODAi0MBdSAAC");
	this.shape_55.setTransform(206.45,-171.15,1,1,0,0,0,8.2,-11.1);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#74492A").ss(4,1,1).p("EAunAABMhdNgAB");
	this.shape_56.setTransform(288.6,-171.625);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#74492A").ss(4,1,1).p("AASBlQCHABDEiiQAJgIAKgIAAPBlQiYADjmjN");
	this.shape_57.setTransform(-47.025,-163.8985);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#74492A").ss(4,1,1).p("Ak2hIQCRhkCoBWQCpBWCLB/");
	this.shape_58.setTransform(228.65,-153.15,1,1,0,0,0,344,33.9);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#74492A").ss(4,1,1).p("EAzygAOMhOYAADQhAA7g7ApQiABZhgAAEgzxgALQDABECKhhQCKhiA/gaQA/gZBLAWQBKAWA6AuQA3AqAYAWIACABQABABAAAAEgmBgAjQACABABABQDiDWCXgD");
	this.shape_59.setTransform(193.125,-168.732);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#74492A").ss(4,1,1).p("A58DAQBgAACAhbQA4gnA+g5MBI5gAEEg0SABvQBJAVB1AjQB1AkBcgrQBcgrAwgsQAxgsCRiAQCSiCDBA2QBjAeCCB4QAAABABAAIACABQAAABAAAAQDiDZCYgD");
	this.shape_60.setTransform(190.6,-149.75,1,1,0,0,0,5.4,20.9);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#74492A").ss(4,1,1).p("EAhvAAAMhDdAAA");
	this.shape_61.setTransform(303,-170.925);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#74492A").ss(4,1,1).p("AMOC4QBgAACAhZQA5gnA+g4AxkAJQCXgFBKAcQBLAbA8AzQA9AzAzAQQAzAPAzgGQAygGDujMQDujMDAA0QBjAdCCB2QAAABABAAIACABQAAABAAAAQDiDUCYgD");
	this.shape_62.setTransform(-25.825,-170.6389);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#74492A").ss(4,1,1).p("AkjhOQBjhQB8ALQB7AMBQBsQBQBrBNBF");
	this.shape_63.setTransform(-114.025,-187.8946);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#74492A").ss(4,1,1).p("AesACMg9XgAD");
	this.shape_64.setTransform(323.7,-171.475);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#74492A").ss(4,1,1).p("ALUC/QBgAACAhbQA4gnA8g4AqlC/QCdAADvjrQDHi7DAA1QBjAeCCB5QAAAAABABIACABQAAABAAAAQDiDZCYgCAqoC/QiZACjmjc");
	this.shape_65.setTransform(19.875,-171.7686);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#74492A").ss(4,1,1).p("Ao8DAQiaADjljcA+rDAQBgAACAhbQBPg3BZhYQAjghAjgZQCWhvCVAgQABAAACAAQB2AhB6B1EAzsAACMg3JAABQjPC+iNgBEgzKAALQEcAjBwiIQB0iNC5A4QBjAeCCB4QAAAAABAAIACADQDiDZCYgDEgzaAAJQAIABAIABEgzrAAOIAhgD");
	this.shape_66.setTransform(189.925,-170.5101);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#74492A").ss(4,1,1).p("AYwABMgxfgAB");
	this.shape_67.setTransform(359.675,-170.075);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#74492A").ss(4,1,1).p("AgBC+QBfAACAhbQBPg3BZhYQAjghAjgZQCWhuCVAfQABAAACAAQB2AhB6B2AbRgDQjTDBiOAAAVtC9QiaADjljbA7QBrQCjArCJgQQB4gGBKgaQBKgaBVg+QBVg9ADgBQDFi2C/A1QBjAeCCB4QAAAAABABIACABIAAABQDiDYCYgD");
	this.shape_68.setTransform(26.4,-169.8879);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#74492A").ss(4,1,1).p("AXVAAMgupAAA");
	this.shape_69.setTransform(370.875,-170.525);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#74492A").ss(4,1,1).p("ABVC7QBgAACAhaQBPg4BZhYQAjghAjgaQCWhuCVAfQABAAACABQB2AhB6B1A8jAJQCugcAmAoQAmAqAZArQAZArAlAUQAkAUAjACQAjACAHABQAjABAqgGQDNg2Cvi2QDHi7DBA1QBjAeCCB5QAAAAABAAIACACQAAAAAAABQDiDZCXgDAckgCQjQC9iNAAAXEC7QiaADjljc");
	this.shape_70.setTransform(39.225,-170.254);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#74492A").ss(4,1,1).p("AYnAAMgxNAAB");
	this.shape_71.setTransform(420.325,-170.725);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#74492A").ss(4,1,1).p("AEiDpQBhAACAhfQBOg6BahdQAjgjAigaQCXh0CVAhQABAAABAAQB2AjB6B7AxXDpQCeABDuj3QDHjEDBA4QBkAgCBB9QABABAAAAIACACQABAAAAAAQDhDlCXgDAaRDpQiZADjmjoAfsAmQjMDEiLgBA/rjYQC1g4CxCNQCxCLAEAEQDgDgCWgD");
	this.shape_72.setTransform(59.6,-174.1035);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#74492A").ss(4,1,1).p("AUWhfMgjlAACQi/CwiHAN");
	this.shape_73.setTransform(392.75,-160.5);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#74492A").ss(4,1,1).p("AfTDAQiYADjhjbQgBgBAAAAIgCgBQAAgBgBgBQiBh5hkgeQjBg2jHC8QjvDuicgBAJaDAQiaADjljfAsUDAQBgAACAhbQBPg4BZhaQAjghAjgZQCWhwCVAgQABAAACAAQB1AhB6B3A/SACQD5AQBhhsQBghsCeATQBjAeCCB5QAAABABABIACABQAAAAAAABQDiDbCYgD");
	this.shape_74.setTransform(61.7,-170.0262);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#74492A").ss(4,1,1).p("Ae4hdMg4pAAAQi/CviHAM");
	this.shape_75.setTransform(496.425,-161.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#74492A").ss(4,1,1).p("AoGC/QBgAACAhbQBPg4BZhYQAjghAjgZQCVhvCVAfQABAAACABQB2AgB6B3ANoC/QiaACjljcEAjhAC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAEgjgABrQCOACBEAgQBEAfCQgbQCQgbC+iuQC/ivDBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgC");
	this.shape_76.setTransform(71.025,-170.7998);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#74492A").ss(4,1,1).p("Ac/hdMg03AAAQi/CviHAM");
	this.shape_77.setTransform(502.075,-161.25);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjcEggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgC");
	this.shape_78.setTransform(108.675,-170.7686);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#74492A").ss(4,1,1).p("AjvhJQC2gzA4BdQA2BcArAPQArAQAfAAQAeABAogL");
	this.shape_79.setTransform(-118.5,-161.4991);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#74492A").ss(4,1,1).p("AaEhdMgvBAAAQi/CviHAM");
	this.shape_80.setTransform(525.125,-161.25);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_81.setTransform(150.425,-170.7686);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#74492A").ss(4,1,1).p("ACjhdQi+CviHAM");
	this.shape_82.setTransform(-43.9,-161.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#74492A").ss(4,1,1).p("AmiiGQgLgaBLg2QBMg1BoASQBpATAwBwQAuBwAVAvQAUAwAuBaQAuBaEHgS");
	this.shape_83.setTransform(-102.8143,-176.8337);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#74492A").ss(4,1,1).p("AXJhdMgpMAAAQi/CviHAM");
	this.shape_84.setTransform(539.85,-161.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#74492A").ss(4,1,1).p("AJ8CvQiXADjijaQgBAAAAAAIgCgCQgBAAhshWQhqhUicBFQgDACgDABQkOCVj0AJ");
	this.shape_85.setTransform(-90.95,-169.2035);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#74492A").ss(4,1,1).p("AV9hdMgmzAAAQi/CviHAM");
	this.shape_86.setTransform(548.925,-161.25);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#74492A").ss(4,1,1).p("ALKDHQiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQkahOixCBQjxDph1gL");
	this.shape_87.setTransform(-82.025,-171.632);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#74492A").ss(4,1,1).p("AVAhdMgk5AAAQi/CviHAM");
	this.shape_88.setTransform(559.475,-161.25);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCAKgC/QiZACjmjcArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_89.setTransform(217.225,-170.7686);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#74492A").ss(4,1,1).p("AL/C/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjAg1jHC7QhnBrlOgrAr+AUQAwgLA6AJ");
	this.shape_90.setTransform(-70.65,-170.7686);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#74492A").ss(4,1,1).p("ATKhdMghNAAAQi/CviHAM");
	this.shape_91.setTransform(564.375,-161.25);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#74492A").ss(4,1,1).p("ANbDdQiYADjijbQAAAAAAAAIgDgCQAAAAgBgBQiBh3hkgeQi/g1jFC4QgBABgCABQgdAbgdAXQgNAIgOAGQhKAmg7AAQhgAAg1gxQglgggdhJQgjhVgPgVQgkgxhBAAQgWAAgrASQgXAKgrAR");
	this.shape_92.setTransform(-63.1,-173.8486);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#74492A").ss(4,1,1).p("ARUhcI9hgBQi/CviHAM");
	this.shape_93.setTransform(569.275,-161.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3AKgC/QiZACjmjcEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_94.setTransform(250.625,-170.7686);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#74492A").ss(4,1,1).p("AOcC+QiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQjBg2jGC7Qj4DshTAAQhUABgkgOQgkgNhig+Qhig+gjgRQgjgQgoAGQgoAHgNAC");
	this.shape_95.setTransform(-52.925,-170.7192);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_96.setTransform(267.325,-170.7686);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#74492A").ss(4,1,1).p("APoC+QiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jGC7QjvDsicgBAmQC+QiGAJh/heQh/hdjTBp");
	this.shape_97.setTransform(-43.875,-170.7364);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#74492A").ss(4,1,1).p("AQvC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjuDricAAAwuASQDZhCBSA9QBRA/BSAxQB+BECZgC");
	this.shape_98.setTransform(-34.2875,-170.7657);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#74492A").ss(4,1,1).p("ASUD2QiXADjijbQgBAAAAAAIgCgCQAAAAgBgBQiBh3hkgeQjBg2jHC6QjuDticgBAyTiyQC2h2BsBaQBsBaCjCQQDlDdCZgD");
	this.shape_99.setTransform(-27.6625,-176.3049);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#74492A").ss(4,1,1).p("AThDHQiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jHC7QjvDsibgBAiXDHQiZADjmjdAzgAkQBlgMAegcQAdgeAIgOQAJgOADgEQA9heBcgaQBigcBMAjQBNAiB+B7");
	this.shape_100.setTransform(-18.6625,-171.6338);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#74492A").ss(4,1,1).p("AVNDAQiYACjijZQAAAAAAgBIgCgBQgBgBgBAAQiBh5hjgeQjBg1jIC7QjvDribAAA1MBqQDCANBUhdQBVhdBVhJQBWhJCVAgQABAAABABQB2AgB6B3AgsDAQiZACjmjc");
	this.shape_101.setTransform(-12.7,-170.851);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#74492A").ss(4,1,1).p("AV1DLQiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAgDDLQiZACjmjcA10AZQDnAjBpgrQBqgrBUhVQBThVBDgFQBCgFBHAjQBHAiB6B3");
	this.shape_102.setTransform(-0.075,-171.9815);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#74492A").ss(4,1,1).p("AXXDnQiYACjijaQAAAAAAgBIgCgBQgBgBAAAAQiCh4hjgeQjBg1jHC7QjvDridAAAkkAJQh6h2g8gWQg8gWhKABQhKAChQA4Qg1AlgoAlIgCADQgQAPgOAPQgCABgBABQgMALgMAIQgeAVgxAUQgxATgCAAQjXA5gljQQgljTihAvABeDnQiZACjljd");
	this.shape_103.setTransform(6.9,-174.7693);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#74492A").ss(4,1,1).p("AY5C+QiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQjCg2jGC7QjwDsicgBAC/C+QiZADjljdAyvC+QBhAACAhbQBOg3BahZQAjghAigZQCXhvCVAgQABAAABAAQB2AhB6B2A44ANQC2DBDPgQ");
	this.shape_104.setTransform(22.15,-170.7069);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#74492A").ss(4,1,1).p("AboC7QiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jHC7QjvDsicgBAFvC7QiZADjljdAv/C7QBhAACAhbQBOg3BahZQAjghAigZQCXhvCVAgQABAAABAAQB2AhB6B2A7nBsQDGgCDBA0QDBA0CcgX");
	this.shape_105.setTransform(21.275,-170.4269);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#74492A").ss(4,1,1).p("AcIC/QiYACjijZQgBAAAAgBIgBgBQgBgBgBAAQiBh5hjgeQjCg1jHC7QjuDridAAAvgC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCVAfQABAAABABQB2AgB5B3AGOC/QiZACjmjcA8HAPQDhg1BnAVQBoAUBuBfQBuBfCXgC");
	this.shape_106.setTransform(34.85,-170.7671);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#74492A").ss(4,1,1).p("AJ3DxQiaACjljdAr3DxQBgAACAhbQBPg4BZhZQAjggAjgZQCWhvCUAfQABAAACABQB2AgB6B2AfvDxQiXACjijaQAAAAAAgBIgCgBQgBgBAAAAQiCh4hjgeQjBg1jHC6QjvDsidAAA/ujJQEPhUDdBiQDdBiBKA6QBGA2AdAUQACABACACQDiDFCXgC");
	this.shape_107.setTransform(61.75,-175.7906);

	var maskedShapeInstanceList = [this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84,this.shape_85,this.shape_86,this.shape_87,this.shape_88,this.shape_89,this.shape_90,this.shape_91,this.shape_92,this.shape_93,this.shape_94,this.shape_95,this.shape_96,this.shape_97,this.shape_98,this.shape_99,this.shape_100,this.shape_101,this.shape_102,this.shape_103,this.shape_104,this.shape_105,this.shape_106,this.shape_107];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_52}]}).to({state:[{t:this.shape_54},{t:this.shape_53}]},4).to({state:[{t:this.shape_55}]},4).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56}]},4).to({state:[{t:this.shape_59}]},4).to({state:[{t:this.shape_60}]},4).to({state:[{t:this.shape_62},{t:this.shape_61}]},4).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63}]},4).to({state:[{t:this.shape_66}]},4).to({state:[{t:this.shape_68},{t:this.shape_67}]},4).to({state:[{t:this.shape_70},{t:this.shape_69}]},4).to({state:[{t:this.shape_72},{t:this.shape_71}]},4).to({state:[{t:this.shape_74},{t:this.shape_73}]},4).to({state:[{t:this.shape_76},{t:this.shape_75}]},4).to({state:[{t:this.shape_79},{t:this.shape_78},{t:this.shape_77}]},4).to({state:[{t:this.shape_83},{t:this.shape_82,p:{x:-43.9}},{t:this.shape_81,p:{x:150.425}},{t:this.shape_80}]},5).to({state:[{t:this.shape_85},{t:this.shape_82,p:{x:-10.5}},{t:this.shape_81,p:{x:183.825}},{t:this.shape_84}]},4).to({state:[{t:this.shape_87},{t:this.shape_82,p:{x:6.2}},{t:this.shape_81,p:{x:200.525}},{t:this.shape_86}]},4).to({state:[{t:this.shape_90},{t:this.shape_82,p:{x:22.9}},{t:this.shape_89,p:{x:217.225}},{t:this.shape_88}]},4).to({state:[{t:this.shape_92},{t:this.shape_82,p:{x:39.6}},{t:this.shape_89,p:{x:233.925}},{t:this.shape_91}]},4).to({state:[{t:this.shape_95},{t:this.shape_82,p:{x:56.3}},{t:this.shape_94,p:{x:250.625}},{t:this.shape_93,p:{x:569.275}}]},4).to({state:[{t:this.shape_97},{t:this.shape_82,p:{x:73}},{t:this.shape_96,p:{x:267.325}},{t:this.shape_93,p:{x:585.975}}]},3).to({state:[{t:this.shape_98},{t:this.shape_82,p:{x:89.7}},{t:this.shape_96,p:{x:284.025}},{t:this.shape_93,p:{x:602.675}}]},4).to({state:[{t:this.shape_99},{t:this.shape_82,p:{x:106.4}},{t:this.shape_96,p:{x:300.725}},{t:this.shape_93,p:{x:619.375}}]},4).to({state:[{t:this.shape_100},{t:this.shape_82,p:{x:123.1}},{t:this.shape_96,p:{x:317.425}},{t:this.shape_93,p:{x:636.075}}]},4).to({state:[{t:this.shape_101},{t:this.shape_82,p:{x:139.8}},{t:this.shape_96,p:{x:334.125}},{t:this.shape_93,p:{x:652.775}}]},4).to({state:[{t:this.shape_102},{t:this.shape_82,p:{x:156.5}},{t:this.shape_81,p:{x:350.825}},{t:this.shape_93,p:{x:669.475}}]},4).to({state:[{t:this.shape_103},{t:this.shape_82,p:{x:173.2}},{t:this.shape_81,p:{x:367.525}},{t:this.shape_93,p:{x:686.175}}]},4).to({state:[{t:this.shape_104},{t:this.shape_82,p:{x:198.25}},{t:this.shape_89,p:{x:392.575}},{t:this.shape_93,p:{x:711.225}}]},4).to({state:[{t:this.shape_105},{t:this.shape_82,p:{x:214.95}},{t:this.shape_94,p:{x:409.275}},{t:this.shape_93,p:{x:727.925}}]},4).to({state:[{t:this.shape_106},{t:this.shape_82,p:{x:231.65}},{t:this.shape_96,p:{x:425.975}},{t:this.shape_93,p:{x:744.625}}]},4).to({state:[{t:this.shape_107},{t:this.shape_82,p:{x:281.75}},{t:this.shape_96,p:{x:476.075}},{t:this.shape_93,p:{x:794.725}}]},4).to({state:[]},3).wait(1));

	// Layer_6
	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#74492A").ss(4,1,1).p("AN7AAI71AB");
	this.shape_108.setTransform(608,-171.575);

	var maskedShapeInstanceList = [this.shape_108];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_108).wait(4).to({y:-167.375},0).wait(4).to({y:-169.975},0).wait(4).to({y:-171.375},0).wait(4).to({y:-170.075},0).wait(4).to({y:-170.475},0).wait(4).to({y:-170.625},0).wait(4).to({y:-171.275},0).wait(4).to({y:-170.375},0).wait(4).to({y:-170.075},0).wait(4).to({y:-170.675},0).wait(8).to({y:-170.075},0).to({_off:true},4).wait(76));

	// Layer 4
	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#66CC99").s().p("EBE6AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEBDCAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEBBKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA/SAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA9aAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA7iAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA5qAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA3yAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA16AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA0CAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAyKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAwSAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAuaAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAsiAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAqqAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAoyAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAm6AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAlCAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAjKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAhSAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAfaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAdiAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAbqAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAZyAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAX6AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAWCAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAUKAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgASSAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAQaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAOiAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAMqAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAKyAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAI6AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAHCAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAFKAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgADSAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgABaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAgdAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA7AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg7AAgAiVAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAkNAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAmFAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAn9AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAp1AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgArtAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAtlAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAvdAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAxVAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAzNAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA1FAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA29AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA41AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA6tAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA8lAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA+dAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEggVAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgiNAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgkFAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgl9AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgn1AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgptAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgrlAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgtdAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgvVAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgxNAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgzFAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg09AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg21AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg4tAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg6lAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg8dAAHQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEg+VAAGQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAAAAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEhANAAFQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABAAAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEhCFAAEQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBgEhD9AADQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAgBQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBgEhF1AACQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAABAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBg");
	this.shape_109.setTransform(245.575,-170.6);

	var maskedShapeInstanceList = [this.shape_109];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_109).wait(128));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-281.7,-285.7,1001.4000000000001,216.2);


(lib.level_01copy_replace = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"play":1,play1:35});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_34 = function() {
		this.stop();
	}
	this.frame_127 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(34).call(this.frame_34).wait(93).call(this.frame_127).wait(1));

	// Layer 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhRGATpQi4AAAAjLMAAAgg6QAAjMC4AAMCiPAAAQC2AAAADMMAAAAg6QAADLi2AAg");
	mask.setTransform(182.2,-159.975);

	// Layer_8
	this.instance = new lib.adse();
	this.instance.parent = this;
	this.instance.setTransform(555.05,-171.8,1,1,0,0,0,599.9,-171.8);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(127).to({_off:false},0).wait(1));

	// Layer 5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#583720").s().p("AhNgEIAZgHIBDgMIgBgBIAAAAIACAAIABgBIAAAAIAlgDQALgBATAEIABgBIgEAHQgCABABAFQgFgBgCADIgIAJQgDAFADADIgBAAIgWAEIgBAAIgFABIAAAAIgBAAIhpATQgZgUASgOg");
	this.shape.setTransform(-156.2312,-166.61);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C59064").s().p("ADBBjIgDgBQgLgMgJgNQgTgbAXgJIADAIQASAdAWAZIgBAAIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAgBgBAAQAAAAAAABQgBAAAAAAQgLgUgRgVQgHgHgDgIQgGgYAdAHQABAGAEAHQAVAaANAaQAAALgMAAIgKgCgACHA7IgFABIAFgCIAAABIAXgFQAGAZATAOQgbgPgVgTgAD2BaIAAAAIgCgBQgKgggaggIgCgDQAMgBAKgIIANAEQAGALAJANQAMAQACAPQAGATgUAAIgKgBgAEUBOQgDgfgZgcQAMADANACIAGAAQAJAOAGAPQALAZgXAAIgGAAgAiHAcQgmgCgygPIAAAAIgLgCIgJgDQgngKgJgNQgWgXA7gaQAIgEASgHIABAAIACAAIBEAIIBZALIByAUIA5AKIAFgBIAUgGIAagGQALgCAfADQAdAEArAhIgCABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAAAAAQAIARARgCQgOAHgWgFQgEABgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBAAQgVgIgTgNQAQAPASAGIgBAAIAHAEIAMAEQgKAEgLACIgEAAIgGABIgCAAQgWAAgbgLQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQATAKAPADIAAAAQgUgEgLABIgkAEIgBAAIgBABIgDAAQhAAFgrABIgtABQgsgBgtgCgAjghNIAhgYIAfAcg");
	this.shape_1.setTransform(-165.5843,-171.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DFF4FF").s().p("AAnAsIhnhXICBBTIgZAEg");
	this.shape_2.setTransform(-183.925,-183.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AC7CCQgigHgbggIgDgEIABAAIABAAIAFgBQAVATAbAQQgTgPgGgYIAAABQgCgEADgGIAHgJQADgCAFAAQgCgFACAAIAFgHIgBAAIAAAAQgPgEgTgJQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAbAMAWAAIACAAIAGgBIAEgBQALgBAKgEIgMgFIgHgDIABAAQgSgIgQgOQATANAVAJQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAJAEgCQAWAGAOgIQgRACgIgRQgBAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gKIhygTIhZgLIhEgIIgCAAIADAAIBAADIgfgcIg8g1IACgHIABAAIBoBZIACAAIAMABQBOAHA0AKIBnASIACABIARgFQAIgDAogDQAngBAjAUQAeAUAVAUIABABIABAAIAAACIgCABQgDAGgIAAQAhAhgXAYQgGAGgLgDIgBAAIAAADQAAAHgJACQgMADgIgGQAFAPgVgBQgIAAgEgDQgEAFgGAAQgHAAgKgFgAClBlQAJANALALIADACQAOAGAJgGIAAgBIAAAAIABAAQgWgZgSgdIgDgHQgXAJATAbgADYB9IgBACQAWAFAAgPQgNgagVgZQgEgHgBgHQgdgGAGAXQADAIAHAIQARAVALATIABAAIACAAgADJAyIACACQAaAhAKAfIACABIAAAAQAfAGgHgYQgCgPgMgQQgJgMgGgMIgNgDQgKAHgMACgAEPBpQAfAEgNgdQgGgPgJgOIgGAAQgNgBgMgDQAZAcADAegAEZAmIgMgKIgEACIgBAAQAIAEAJAEIAAAAgAhdBEQhWAAgygOQgygOgSgSIABgNQAJANAnALIAJADIALADIAAAAQAyAPAmACQBDADBDgBQArgBBAgGIADAAIgCAAIABAAIAAABIhDAMQg5AEgyAAIgWAAg");
	this.shape_3.setTransform(-165.0527,-174.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#583720").s().p("AAcAUIgEAAIgDAAIhsgJQgLgWAagJIAcgBQAnABARACIAMABQATACAUAFQALACAQAIIABgBIgIAEQgDAAgBAGQgFgCgEACQgIADgEADQgHAEAAADg");
	this.shape_4.setTransform(-163.426,-160.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DFF4FF").s().p("AgvgiIgBAAIADgNIBeBGIgjAZg");
	this.shape_5.setTransform(-184.5,-183.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C59064").s().p("ACKCOIABgCQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAQACgUgDgWQgBgJACgIQAJgWAWANQgDAFAAAHQADAdgEAaQgGAIgIAAQgFAAgHgEgACnCLIAAgBIgBAAQAKgggDgiIAAgDQAMACAOgFIAJAHQgBAMABANQAAAQgHAOQgFAPgNAAQgHAAgJgEgABxCHIgCgCQgDgNAAgNQgBgdAagDIgCAHQAAAeAEAcIgCAAIAAAAIgFABQgIAAgHgGgADKCIQAQgcgFggQAJAGAMAEIAFADQAAAOgEAPQgEAUgQAAQgGAAgHgCgABVBUIAXACIAAAAQgJAXAJASQgQgUgHgXgADcBMQgEAAgNgMIgKgIIgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgPgOgJgPQAGAQALALIAAABIAFADQADAFAEACQgLADgLgDQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBIgFAAIgCAAQgVgHgRgQQAAAAgBAAQAAABAAAAQAAAAABAAQAAABAAAAQALANAMAGIAAABQgQgIgLgCQgUgFgTgCIgNgBQgRgCgngBQATAAAUABIhKgRQg/gOg8gTQg7gUgVgVIgVgUIgHgHIAGAEIAAgCIgBgDQgCgGADgUIADgMIAFgQIAIgEIAGABIAFAAQASgBAQACIABABIAVgOIAFAGIANARIgDgBIAEADQAMAHAmAQIAJADIA5AaQAvAVAvAYIAvAXIAEgBIAWABIAcAAQALAAAbALQAZAJASApIgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABQgDASARABIgKABQgNAAgMgHg");
	this.shape_6.setTransform(-169.1,-166.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("ACLCyQgHgCgBgFQgNAJgLgPQgcgOgFgjIAAgEIADAAIAEAAQAHAXAQAUQgJgSAJgXIAAAAQAAgDAHgEQAEgEAIgDQAEgBAFABQABgFADAAIAIgFIgBAAIABAAQgMgHgLgMQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQASAQAUAGIACABIAGAAQAAAAAAAAQABABAAAAQABAAABgBQAAAAABAAQALACAMgCQgFgDgDgEIgFgEIABAAQgMgLgGgRQAKAQAOAOQABgBAAAAQAAAAAAAAQABAAAAABQAAAAAAABIABAAIAKAHQAMANAFAAQAQAKASgEQgQgCADgRQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIABAAQgSgogZgJQgbgLgLAAIgcgBIgWgBIgEAAIgvgWQgvgXgugVIg6gaIgJgEQgmgQgMgGIgEgDIADABIACABIASAFQAQAFAgAQIgFgDQBJAaAqAXIBUAoIABABIAUAAQAJgBAmAHQAlAJATAbQAPAYAHAXIABABIAAABIgBACIgCABQgGADgJgBQALAlglAQQgIAEgJgGIgBAAIgCADQgFAHgJgBQgMgBgFgHQgEALgLAAIgJgBgACICoIgCABQAQALAKgOQAEgbgDgcQABgHACgGQgWgNgJAXQgCAIABAIQADAXgCAUIABAAIACABgACpBkQAEAigLAgIACAAIgBABQAaAMAIgXQAHgOAAgRQgBgNABgMIgJgGQgOAFgMgCIAAADgABoCGQAAAOADAMIACADQAJAIAMgDIAAAAIABAAQgEgcABgeIABgHQgaACABAdgADGCjQAbALAGgdQAEgPAAgOIgFgCQgLgEgKgGQAGAfgRAcgADwBeQAEAGAGAFQgCgGgDgFIgEAAIAAAAIgBAAgAAIBGQhCgNg2gPQhQgVgngcQgngcATgFIAWAUQAUAUA8AUQA7ATBAAOIBJASQgTgCgUABgAhWhMIABgBIAAABgAiQhdIgGgBIgOgRIgFgGIgsg3IAHgFIABgBIA+BTIACADIgDgBg");
	this.shape_7.setTransform(-168.725,-169.4125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C59064").s().p("ADBBjIgDgCQgLgLgJgMQgTgcAXgIIADAHQASAcAWAZIgBABIAAAAIAAAAQgEADgGAAQgGAAgHgDgADcBjIABgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgLgUgRgUQgHgIgDgJQgGgXAdAHQABAGAEAHQAVAZANAaQAAAMgMAAIgKgCgACHA7IgFABIAFgBIAAAAIAXgFQAGAZATAPQgbgQgVgTgAD2BaIAAgBIgCAAQgKgggaggIgCgCQAMgCAKgHIANADQAGAMAJAMQAMAQACAOQAGAUgUAAIgKgBgAEUBNQgDgdgZgdQAMADANABIAGABQAJAOAGAOQALAagXAAIgGgBgAiHAdQgmgDgygOIAAAAIgLgDIgJgDQgngKgJgOQgWgWA7gaQAIgFASgFIABgBIACABIBEAHIBZAMIByATIA5AJIAFgBIAUgFIAagFQALgCAfADQAdADArAhIgCAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQAIARARgDQgOAJgWgHQgEACgUgJIgNgEIgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBABQgVgJgTgNQAQAOASAIIgBAAIAHACIAMAFQgKAFgLABIgEAAIgGABIgCABQgWgBgbgMQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQATAKAPADIAAABQgUgFgLACIgkADIgBAAIgBAAIgDAAQhAAGgrABIgtAAQgtAAgsgBgAjghNIAhgZIAfAcg");
	this.shape_8.setTransform(-165.5343,-171.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AC7CBQgigFgbghIgDgDIABgBIABAAIAFgBQAVAUAbAPQgTgPgGgYIAAAAQgCgDADgGIAHgJQADgCAFABQgCgGACgBIAFgHIgBABIAAgBQgPgDgTgJQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAbAMAWAAIACgBIAGAAIAEAAQALgCAKgFIgMgEIgHgDIABAAQgSgIgQgOQATAMAVAKQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAIAEgBQAWAGAOgIQgRADgIgSQgBgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gJIhygUIhZgMIhEgHIgCgBIADAAIBAAEIgfgcIg8g1IACgHIABABIBoBYIACAAIAMABQBOAIA0AJIBnATIACABIARgGQAIgDAogCQAngCAjAVQAeASAVAVIABABIABAAIAAADIgCABQgDAEgIABQAhAhgXAYQgGAGgLgEIgBAAIAAADQAAAJgJABQgMACgIgGQAFAQgVAAQgIAAgEgFQgEAGgGAAQgHAAgKgGgAClBlQAJANALALIADACQAOAGAJgGIAAAAIAAAAIABgBQgWgZgSgcIgDgIQgXAIATAcgADYB+IgBABQAWAFAAgPQgNgagVgaQgEgGgBgGQgdgIAGAYQADAIAHAIQARAUALAVIABgBIACABgADJAyIACADQAaAfAKAhIACAAIAAABQAfAEgHgXQgCgPgMgQQgJgMgGgLIgNgEQgKAHgMACgAEPBpQAfADgNgcQgGgPgJgNIgGgBQgNgBgMgEQAZAdADAegAEZAlIgMgJIgEABIgBAAQAIAFAJADIAAAAgAhdBDQhWAAgygNQgygOgSgTIABgMQAJANAnAMIAJADIALACIAAAAQAyAPAmACQBDADBDgCQArgBBAgFIADAAIgCABIABAAIAAAAIhDAMQg5AEgyAAIgWgBg");
	this.shape_9.setTransform(-165.0027,-174.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#583720").s().p("AhAAkIASgSQAGgKAPgJIAHgGIAUgRIABAAIAFgFIAWgQQAPgLATgGIAAAAIABgBIgBAJQgBABAEAEQgFABgBAEIgCALQABAHADACIgRAPIgGAEIhRBFQgfgFAIgXg");
	this.shape_10.setTransform(-156.4231,-185.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C59064").s().p("AjfCFQgXgEgOgJQgVgMgFgHIACgGIABgBQgXgTAOAIIAIAGQAHABABgCQALgMANgKQADAAAEgBIAbgTQAJgCAzgWIAMgFIBAgZIBsgpQArgPAMgGQAAAAABgBQABAAAAAAQAAgBAAAAQABAAAAgBIAPgOIAUgSQAIgIAcgNQAbgMA1AHIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQARALAMgLQgHAOgWAGQgDADgVADIgOADIgBABQAAgBgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgXADgXgCQAVAEAUgCIgBABIAHgBIANgCQgGAJgIAHIgEACIgEADIgDACQgTAKgcAEQAAAAAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQAVgCAPgEIAAAAQgTAHgPAKIgWARIgFAEIgBABIgVARIhEAoQg5Akg7AfQg9AfgjACIgQABQgIAAgHgBgADbgEQgOgEgPgHQgfgNAQgUIAGAGQAeAPAgALIgBABIABAAQgFAJgPACIgEAAgACZgKIARgPIAAABIAAgBQASASAYADQggABgbgHgADzgSQgTgLgZgKQgJgDgIgFQgQgSAcgIQAEAFAHAEQAfAMAYAPQAHANgVAHQAAAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAAAgAEHgnIgCABQgYgXgngPQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAKgHAEgLIAOgEIAZANQASAIAKALQARARgeAMgADmhlQAMgCAMgHIAFgCQAPAHANAKQAZATgdAMQgRgZgkgMg");
	this.shape_11.setTransform(-167.1141,-185.2998);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AjuCMQgdgEgPgKQgPgKAEgPIABgBQAEAGAVAMQAPAJAXAEQALADATgCQAkgDA8gfQA8gfA4gjIBFgpIgIAGQgOAJgHAKQg5Ang0AdQhKArgnAJQgaAFgWAAIgVgBgAi1AXIA3gZQAqgUA2gTIBOgdQAagJABgBIAJgLQAGgHAggWQAigVApABQAjABAcAIIACAAIABAAIABACIgBABQAAAGgHAFQAtAMgIAgQgBAIgMACIgBABIABADQAEAHgGAFQgJAIgLgBQAMALgSAKQgGAEgGgBQAAANgXAAQghALgngNIgEgCIAFgEQAcAGAfAAQgYgEgRgSIAAABIAAAAQgEgDgBgGIACgLQACgEAEgBQgEgEACgCIAAgIIAAAAQgQAFgUACQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQAdgDATgLIACgBIAFgEIADgCQAJgHAGgJIgNACIgHABIAAAAQgTACgVgEQAXABAXgCQAAgBAAAAQABAAAAAAQABgBAAAAQAAABABAAIAAgBIAOgDQAWgDACgDQAWgGAIgNQgNAKgQgLQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAIABgBQg2gIgbAMQgbANgJAIIgTASIgQAPQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAgBAAQgLAGgrAPIhsApIhBAZIgLAFQg0AXgIABIArgVgAC4gQQAOAGAPAEIAEABQAPgCAEgKIAAAAIAAgBQgfgLgegPIgHgFQgPATAfAOgADwgTQAVgGgHgOQgZgPgegMQgHgEgFgFQgcAJARARQAHAGAKADQAZAJATAMIABgBIACABgAEBgoIAAAAQAdgLgRgRQgKgMgSgIIgZgMIgNADQgEAMgLAHQABAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAmAPAZAWIABAAIABAAgAD3hvQgMAGgMADQAkAMASAYQAcgMgZgTQgNgKgPgGIgFACgADpiAIASgBIgPgCIgCADIAAAAIgBAAgAigAGIABABIgBAAIAAgBg");
	this.shape_12.setTransform(-166.4874,-185.1266);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AC7CCQgigHgbggIgDgEIABAAIABAAIAFgBQAVATAbAQQgTgPgGgYIAAABQgCgEADgGIAHgJQADgCAFAAQgCgFACAAIAFgHIgBAAIAAAAQgPgEgTgJQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAbAMAWAAIACAAIAGgBIAEgBQALgBAKgEIgMgFIgHgDIABAAQgSgIgQgOQATANAVAJQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAJAEgCQAWAGAOgIQgRACgIgRQgBAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gKIhygTIhZgLIhEgIIgCAAIADAAIBAADIgfgcIg8g1IACgHIABAAIBoBZIACAAIAMABQBOAHA0AKIBnASIACABIARgFQAIgDAogDQAngBAjAUQAeAUAVAUIABABIABAAIAAACIgCABQgDAGgIAAQAhAhgXAYQgGAGgLgDIgBAAIAAADQAAAHgJACQgMADgIgGQAFAPgVgBQgIAAgEgDQgEAFgGAAQgHAAgKgFgAClBlQAJANALALIADACQAOAGAJgGIAAgBIAAAAIABAAQgWgZgSgdIgDgHQgXAJATAbgADYB9IgBACQAWAFAAgPQgNgagVgZQgEgHgBgHQgdgGAGAXQADAIAHAIQARAVALATIABAAIACAAgADJAyIACACQAaAhAKAfIACABIAAAAQAfAGgHgYQgCgPgMgQQgJgMgGgMIgNgDQgKAHgMACgAEPBpQAfAEgNgdQgGgPgJgOIgGAAQgNgBgMgDQAZAcADAegAEIAeQAIAEAJAEIgMgKIgEACIAAgBIgBABgAhdBEQhWAAgygOQgygOgSgSIABgNQAJANAnALIAJADIALADIAAAAQAyAPAmACQBDADBDgBQArgBBAgGIADAAIgCAAIABAAIAAABIhDAMQg5AEgyAAIgWAAg");
	this.shape_13.setTransform(-165.0527,-174.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AC7CBQgigFgbghIgDgDIABgBIABAAIAFgBQAVAUAbAPQgTgPgGgYIAAAAQgCgDADgGIAHgJQADgCAFABQgCgGACgBIAFgHIgBABIAAgBQgPgDgTgJQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAbAMAWAAIACgBIAGAAIAEAAQALgCAKgFIgMgEIgHgDIABAAQgSgIgQgOQATAMAVAKQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABAAIANAFQAUAIAEgBQAWAGAOgIQgRADgIgSQgBgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAIACgBQgrgggdgDQgfgDgLACIgaAGIgUAFIgFABIg5gJIhygUIhZgMIhEgHIgCgBIADAAIBAAEIgfgcIg8g1IACgHIABABIBoBYIACAAIAMABQBOAIA0AJIBnATIACABIARgGQAIgDAogCQAngCAjAVQAeASAVAVIABABIABAAIAAADIgCABQgDAEgIABQAhAhgXAYQgGAGgLgEIgBAAIAAADQAAAJgJABQgMACgIgGQAFAQgVAAQgIAAgEgFQgEAGgGAAQgHAAgKgGgAClBlQAJANALALIADACQAOAGAJgGIAAAAIAAAAIABgBQgWgZgSgcIgDgIQgXAIATAcgADYB+IgBABQAWAFAAgPQgNgagVgaQgEgGgBgGQgdgIAGAYQADAIAHAIQARAUALAVIABgBIACABgADJAyIACADQAaAfAKAhIACAAIAAABQAfAEgHgXQgCgPgMgQQgJgMgGgLIgNgEQgKAHgMACgAEPBpQAfADgNgcQgGgPgJgNIgGgBQgNgBgMgEQAZAdADAegAEIAdQAIAFAJADIgMgJIgEABIAAAAIgBAAgAhdBDQhWAAgygNQgygOgSgTIABgMQAJANAnAMIAJADIALACIAAAAQAyAPAmACQBDADBDgCQArgBBAgFIADAAIgCABIABAAIAAAAIhDAMQg5AEgyAAIgWgBg");
	this.shape_14.setTransform(-165.0027,-174.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#583720").s().p("AhAAkIASgSQAGgKAPgJIAHgGIAUgRIABAAIAFgEIAWgRQAPgKATgHIAAgBIABAAIgBAJQgBABAEAEQgFABgBAEIgCALQABAHADACIgRAPIgGAEIhRBFQgfgFAIgXg");
	this.shape_15.setTransform(-156.4231,-185.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C59064").s().p("AjfCFQgXgEgOgJQgVgNgFgGIACgGIACgBQgYgUAOAJIAIAHQAHAAABgCQALgMANgKQADAAAEgCIAbgSQAJgCAzgWIAMgFIBAgZIBsgpQArgQAMgFQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAgBIAPgPIAUgSQAIgHAcgNQAbgMA1AHIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQARALAMgKQgHANgWAGQgDADgVADIgOADIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgXADgXgCQAVAEAUgCIgBABIAHgBIANgCQgGAJgIAHIgEACIgEADIgDACQgTAKgcAEQgBAAABABQAAAAAAAAQAAAAAAAAQABAAAAAAQAVgCAPgEIAAABQgTAGgPAKIgWARIgFAEIgBABIgVARIhEAoQg5Akg7AfQg9AfgjACIgQABQgIAAgHgBgADbgEQgOgEgPgHQgfgNAQgUIAGAFQAeAQAgALIgBAAIABABQgFAJgPACIgEAAgACZgKIARgPIAAAAQASASAYADQggAAgbgGgADzgRQgTgMgZgKQgJgDgIgFQgQgSAcgIQAEAFAHAEQAfAMAYAPQAHAOgUAGQgBAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAABgAEHgnIgCABQgYgXgngPQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAKgHAEgLIAOgDIAZAMQASAIAKALQARARgeAMgADmhlQAMgDAMgGIAFgCQAPAHANAKQAZASgdANQgRgZgkgMg");
	this.shape_16.setTransform(-167.1122,-185.2998);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AjuCMQgdgEgPgKQgPgKAEgPIABgBQAEAGAVAMQAPAJAXAEQALADATgCQAkgDA8gfQA8gfA4gjIBFgpIgIAGQgOAJgHAKQg5Ang0AdQhKArgnAJQgbAFgVAAIgVgBgAi1AXIA3gZQAqgUA2gTIBOgdQAagJABgBIAJgLQAGgHAggWQAigVApABQAjABAcAIIACAAIABAAIABACIgBABQAAAGgHAFQAtAMgIAgQgBAIgMACIgBABIABADQAEAHgGAFQgJAIgLgBQAMALgSAKQgGAEgGgBQAAANgXAAQghALgngNIgEgCIAFgEQAcAGAfAAQgYgEgRgSIAAABQgEgDgBgGIACgLQACgEAEgBQgEgEACgCIAAgIIAAAAQgQAFgUACQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAdgDATgLIACgBIAFgEIADgCQAJgHAGgJIgNACIgHABIAAAAQgTACgVgEQAXABAXgCQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABABIAAgBIAOgDQAWgDACgDQAWgGAIgNQgNAKgQgLQAAAAgBgBQAAAAAAAAQAAgBAAAAQABgBAAAAIABgBQg2gIgbAMQgbANgJAIIgTASIgQAPQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABgBAAQgLAGgrAPIhsApIhBAZIgLAFQg0AXgIABIArgVgAC4gQQAOAGAPAEIAEABQAPgCAEgKIAAAAIAAgBQgfgLgegPIgHgFQgPATAfAOgADwgTQAVgGgHgOQgZgPgegMQgHgEgFgFQgcAJARARQAHAGAKADQAZAJATAMIABgBIACABgAEBgoIAAAAQAdgLgRgRQgKgMgSgIIgZgMIgNADQgEAMgLAHQABAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAmAPAZAWIABAAIABAAgAD3hvQgMAGgMADQAkAMASAYQAcgMgZgTQgNgKgPgGIgFACgADpiAIASgBIgPgCIgCADIAAAAIgBAAgAigAGIABABIgBAAIAAgBg");
	this.shape_17.setTransform(-166.4902,-185.119);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_9},{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_13},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_14},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_13},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_14},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_13},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_14},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},5).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_13},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_14},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_13},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_5},{t:this.shape_4}]},3).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_14},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_13},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_14},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},4).to({state:[{t:this.shape_2,p:{x:-183.925,y:-183.275}},{t:this.shape_13},{t:this.shape_1},{t:this.shape,p:{x:-156.2312,y:-166.61}}]},4).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_2,p:{x:-183.875,y:-183.325}},{t:this.shape_14},{t:this.shape_8},{t:this.shape,p:{x:-156.1812,y:-166.66}}]},4).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},4).to({state:[]},3).wait(1));

	// Layer 4
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C59064").s().p("AgcArIASgGIASgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBIgIACQgNACgRAJIgPAGIgEAAIAZhVIAQAJIATAMIAPAKQAIAFACAMQABAMgLAKQgJAIgTAJg");
	this.shape_18.setTransform(-193.591,-237.725);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgBArQASgJAKgIQALgKgCgMQgBgMgIgFIgPgKIgTgMIgQgJIgDgDIADAAQAQADAYAKIANAGQAUAKAGALIACAEIAAAKIgBADQgEAMgSAKIgKAEIgXAHIgPAFIAMgFgAg4AtIgBAAIAIgCIAFgCIAOgGQASgJANgCIAIgCQAAABABAAQAAABAAAAQAAABABAAQAAABAAAAQAAAEgDABIgHACIgSADIgSAGIgMADIgDAAIgEABIgCgBg");
	this.shape_19.setTransform(-192.9125,-237.625);

	this.instance_1 = new lib.sdrntm();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-201.6,-242.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#501C1E").s().p("AAAAAIABAAIAAAAIAAAAIgBAAg");
	this.shape_20.setTransform(-185.675,-223.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgzALQghgEgfgUQAUAFAeAEQAeAEAnAAQAmgBAZgCQAYgDAZgHQABACgTAKQgSAIgMADQgNACgiACIgTAAQgZAAgcgDg");
	this.shape_21.setTransform(-194.6195,-224.1295);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#874F2E").s().p("AiJE+QAchHhsgnQhvgogfgmIADgHQBfA/BjAlQBiAkCsAMQg6AQggAaQgrAagpAAQglAAgigVgAnXBNIgBgGQAHACALgDQAUgFASgDIAMAHIAAgBQgRgjg5AAQgBAAgBABQgBAAAAAAQAAAAAAAAQAAABABAAQALAFAPAFIAXAKIgLACIgCAAQgIADgJABQgJABgDAFIgCACQgKgDgMgKQgPgOAAgMQAAgNAPgEQAJgDASAAQAgAAAUAcQAQAUAAARQAAARgwAAQgPAAgGgPgAHGh7QARAEANAEQARATAMAWIgJANQgSgggggegAGeibIgVgOQgrgag0gTQgngOg5gIQhBgGgggFQhqgPg3gzQABgNgCgMQBcBbDGgUQA5AjBCAeQA3AZAmAeQgQgFgTgDg");
	this.shape_22.setTransform(-222.125,-236.4966);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#C59064").s().p("AiQD1Qhjglhgg/IACgHQABgGgGADIgFAEQgPAHgUADQhaAOgqg7Qgrg+A8gzQAMgKARACQBmAMADBDQAAAFAEgCQAMgGAEgIQA4AagCgjQAHgBADgEQAPgKgRgKQAOgIAJgJQAFgGgEgEQgQgUgagPQAUgJgEgOQAJgCALgJQA0goAEg2QAKgCAOgLIAHgFQAOALAhgKQBHgWAPg0QAEgOABgOQA1A0BsAPQAgAEBBAHQA4AIAnANQA1AUArAaIAUAOIgCgBIgHgBIgBAAIgJAAQgDgFACgHQgFABgSAHQgUAIAMARIAvAFQAZADAUAFQAfAdASAgQgJAPgDAQQgJApAQApQAtB1iBA8QheAjhwADQg7ACgqADQirgMhigkgAEMCuQAtAOApgQIAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgrALgngIIAAABgAngAiQgPAFAAAMQAAAMAQAOQAMAKAKADIgBABIADABIABAHQAHAPAPAAQAvAAAAgRQAAgRgPgVQgUgbghAAQgRAAgKACgAFoBCQAQAPATABQAUABANgFQAOgEAIgEQAJgDAKgKQAYgXAAghQAAgggYgXIgCgCQgXgWggAAIgBAAQgiAAgYAYQgOANgGARQgZgKgQgEIgDAAIABADIABABQADAAANAJIAVAMIAPAJQAHAFACANQACAMgLAKQgHAGgMAGIgWAKIAZgIIANgFQAEAGAQAPgAgBhoQgjAfAAAsQAAArAjAfQAiAfAyAAQAzAAAjgfQATgRAJgVQAGgPABgRIAAgEQAAgsgjgfQgjgegzAAQgyAAgiAegAE2AiQgOACgRAJQgVAKgHAAIACAAQAAACAGgCIADAAIAegJIATgDIAGgCQADgBAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBgBIgIACgABnibQAcACAqAGIAuAGQAVgNgPgMIgRgOQgDAIgFAEIgJgCIAAgBIgHAAIg9gEQgbgDgkABQglABgaAFQgZAEgVAHIA2gBQA6ACAoAEgAIUgxIABABIgBABIAAgCg");
	this.shape_23.setTransform(-223.8726,-238.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#372F2F").s().p("AmcEEQgEgHgHgHQgsgthJgHQgLACgJAEQgGgVgEgYQgCgNAMgJQAggVgSgPIgPAGIgCgMQgCgKALgIQAfgYgTgQQgKAFgJAHQgEgYAKgVQAphcCYgLQAxgEgqgKQgVABgWACIgPACQgSgKgagFIAcgKQCBg0CQAXIABAAIACACIABgBQAGAAgEgDQANgWAYgTQBhhICPANIhQA4IgFABQgIABAAAGIABAAIgBABIADABIAOgCQBBgDA4ALQgmAEgjAKIgBABQAtALA/gLQCCgWBXA6QAhAXAWAXQg0gRg+ACIgNACIgKgCIgFAAIAHADIgaAGQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABIA2AFQAjARAqAQQCkA+guBeQgRgVgigXQgNACAJAIQAhAbANAYIgCABIADABQAgA/hpAsQABgfgEgSIAHgGIABgBIgBgBQgKgLgJgIQgKgQgRgQQgTgRgYgKQhogthQg2IADAAIgBgCIgGAAQhHgxg0g7QgPAiAwAkQAcAUAgAUQjHAGhfhiQgIgSgPgPQgBAAAAABQgBAAgBAAQAAAAAAAAQAAABAAAAIAAABQgFABACAFIAIAOQALAwgSAyQgRAwhFAAIAXgVQAXgXgSgPQgRAFgHAMQgSAcggAUQgEgNgJgJQgWAcABAnQABAvg2AVQgHADADAEIABADIgRAWIgRgJQgBABgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAEAdA3ATIgKAHQgLAGgEAGQgRgRgVgPQgXgRgPgFQABAGARASQATATASAKIASAMIAAAFQgBAEgDAEQgEAEAAAFIgfgLg");
	this.shape_24.setTransform(-217.0588,-261.8425);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("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");
	this.shape_25.setTransform(-218.8817,-247.7474);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQAqgDA7gCQBwgDBegjQCBg8gth1QgQgpAJgqQADgQAJgPIAKgMQgMgWgSgSQgNgFgQgDQgUgFgZgDIgvgFQgMgRAUgIQASgHAFgBQgCAHADAFIAJAAIABAAIAHABIACABQATACARAFQgmgeg3gZQhCgdg5gjQjHAThchbQADAMgBANQgBAOgEAOQgPA0hHAWQghAKgOgLIgHAFQgOALgKACQgEA2g0AnQgLAJgJACQAEAOgUAJQAaAPAQAUQAEAEgFAGQgJAKgOAIQARAKgPAKQgDAEgHABQACAjg4gaQgEAIgMAGQgEACAAgFQgDhEhmgMQgRgCgMAKQg8A0ArA+QAqA7BagOQAUgDAPgHIAFgEQAGgDgBAGIgCAHIgDAGQAgAnBuAoQBtAmgdBIgAHrAOIAFANIAHgGIABgBIgBgBQgKgLgJgIIAHAOg");
	this.shape_26.setTransform(-218.8817,-247.7474);

	this.instance_2 = new lib.rt7();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-201.55,-241.15,0.7934,0.5254);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AAAAGIAAgKIABAKg");
	this.shape_27.setTransform(-200.9,-160.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#261E1E").s().p("AAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIAAABg");
	this.shape_28.setTransform(-256.7386,-194.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#35BAD6").s().p("AAiA7IgGgBIgagIIhbgXQAXgzAugmIARADQBSAYAGAIIAFAFIAAACQgDAKABADQgaA8gEAHIAAAAIgCAEIgBABgAgSg/IAAAAIABAAIgBABg");
	this.shape_29.setTransform(-255.025,-188.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AALBmIgdgJIghgKIg3gOIADgGQARghAWgZIAcgdIAXgUQAPgPApgbQApgaATgGIAEAAIgCAFQgBABAAAAIABAAIAAAAIgBAAIABABIAAABIgFACIgCACQgzAbgXATQgUASgTAOIAAAAIAAABIgCAAQgvAlgWA0IBaAXIAbAIIAGABIAVAGIAAgBIACgEIABAAQAEgHAag9QgBgDADgKIAAgCIACADIABgDIAAAAIABAEIAAACIABABIACAHIgZBMQADABAAAFQABAFgGAGIg+gRgABkhuIADAAIAAgBIgCAAIgBABgABnh0IABAAIgBgBIAAAAg");
	this.shape_30.setTransform(-255.3,-191.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#246662").s().p("AgsAbIgRgDIACAAIABgBIgBAAQAVgOAUgRQAVgTA0gbIABgCIAGgCIgJAbIgIAxQgJALAJAeQgHgIhSgYgAg6AXIAAABIABgBIABAAIgCAAg");
	this.shape_31.setTransform(-250.95,-196.775);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#C59064").s().p("AAeDvIgXgHQgpgPgnhvQgXi1ANhIQAMhJAKgTIB0AjIABgDIAgAJIghBeIgJAWQggBOgHBLIgCAJQAAACAMAHQAfAWAVAZQAGAMgQAHQgGADgDgBQgCgBgFgBQgFgBgNgKIgFgCQgLgIgCgGIAAAEQAGAXAKASQALATAGAHIACADQAOAMgIAHQgxgbgRgyQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAKA2A6AZIACAGQAEAKgRAAIgHgBg");
	this.shape_32.setTransform(-257.388,-160.4346);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#35BAD6").s().p("AhFAFIgBgCIgCAAIACgBIAAAAQAPgLAIgSIB4gMIgZBMIgBACg");
	this.shape_33.setTransform(-256.575,-184.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgID0QgZgMgUgsQgVgrgGgaQgfjpAnhsQAHgSASgRIAIAAQgIASgPANIAAAAIgCABIACAAIABABQgKATgMBJQgNBIAXC1QAnBvApAPIAXAHQAYACgEgLIgCgGQg6gZgKg2QAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQARAyAxAbQAIgHgOgMIgCgDQgGgHgLgTQgKgSgGgXIAAgEQACAGALAIIAFACQANAKAFABQAFABACABQADABAGgDQAQgHgGgMQgVgZgfgWQgMgHAAgCIACgJQAHhMAghNIAJgWIAhheIAHABQg9CqgWBpIA0AqQAXAVgQAPQgHAFgLAAQgHgBgIgEQgFgBgFgGIgIgFIAAABQAEAOANAUQANAUACABIADAFIAEAKQADAHgGADQAEANgMAEIgMABQgUgBgYgNg");
	this.shape_34.setTransform(-257.3816,-161.925);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#372F2F").s().p("AixGjQACgNgGgXQgIgfhTgZQhUgZgsgzQgPAKggABQhVADgqgzQhAhKBJhDQAGgGAJgFQghgUADggQABgMAIgLQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQgKgoAegdIgDgEQgMgOACgSQAOheCBgeQgXgGgRgJIgGACQgIACAFgFIACgDIgCgBQgDgCAGgBIAFgBQAcgaAwgMQA+gQBDgGQBAgKAuAVQgLgUAjgdQAwgnBGgOIAIAAQAbgFAegBQA5gJAlAQIAAAAIAGADIACgBIABADIANAIIAAABIgNgBQAAAbghARQA0AAAiAYIAPgBQDsgWAtB/IAOAGIABABIgNgBIABAGIgBACIgGgIIg5gFQCeA0gBB/QAAASgPAFQAZA1hMAzQgUANgUgBIAAABIgBgBIgMgDIAKgEQgHgYgGgLIgBgBIAAACIgFARQgGAUgBAWQgCAdALAcQAmBehaBHQgUAPgXAKQgKAFgOAFIgGABQhBAYhFADIg0AEIgxAEQgfABgaAEQgaAEgUASIABAFIgfgBQAfgbA6gPQirgMhigkQhjglhgg/IgDAGQAgAnBuAoQBtAmgdBIg");
	this.shape_35.setTransform(-218.8817,-247.7474);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#AA7F64").s().p("AnPBEQAGgWAKgWQANAWAwAJQAiAGA+AAQA2AABXgNQgHAWgJAWQAGADACgDQABAAAAAAQAAAAAAAAQAAAAAAABQAAABgBABQg+AThKABIgIAAQhoAAg6gvgAA6AyQgXgHABgUQABgPASgDIA0gJQAVAPBJAJQA+AIBBAAQBSAAAUgGQALgCAWgJQAAANgIAPQgHAPgWAFQhUAThTAAQhlAAhkgcgAAzgwIAEgBIgFgCIgBgBIAAAAIAAABQgggGgMgOIAfgRIADgCIAAADQABAAABAAQAAAAAAgBQABAAAAAAQAAAAAAgBIABgDQAbgPAdgHQgBAAAAABQAAAAAAABQgBAAAAABQAAABAAAAQAAAEAQATIgFAHQgFAHAAADQAAANAMAFQAGAEASABQAPABAGADQgBAHAGAHIAAABIgnADQgyADgYAQQAFgXgGgTg");
	this.shape_36.setTransform(-234.5,-81.8711);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#F8E8D9").s().p("AmKBPQgwgKgNgVIANgZQAOgaAhgPQAAABAJgEQgIADABgBIAVgIQCCgnBEBIIAFAIIABAAIAAgBQAPATACAVIgFASQhYAOg1AAQg/AAgigGgADBArQhJgJgVgQQBxgVBqgiQAgAAAcAIQBRAUgDAsQgWAIgLADQgVAFhRAAQhCAAg+gIgAlAgyIgRACQAHgIAEgLQAIgPAXgBQBogEgHBBQgsgYhOgEg");
	this.shape_37.setTransform(-233.7196,-84.2116);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("Ah3A7QAYg9hsgMQgNABgLAEQgsAOAKAcQgWAEgUAKIgGAEIAHgNQAXgaAEgTIAFgDIAAAAQgGgHgNABIAAgBQAEgYAigMQB9guBPBFQAjAegWAVQgXgVghgPIAAABQgGAAgFAEIAAABQALAUAUAKQgfAbABAYQgIgHgLgGgADRA5QgSgBgGgDQgMgFAAgNQAAgEAEgGIAGgIQgRgRABgEQAAgBAAAAQAAgBAAgBQAAAAABgBQAAAAAAgBQAxgOA0AIIABAEIABgBIABgDQATADATAFQgHALADANIgDgDIgCADQgbgFggACIgCAAIgEACIgLAFQgGADgBAEIAAABQAJADAKgCQAegHAhgCQgCADgBADIgDAAQggADgTAOQgMAJgBAJQgHgDgOgCg");
	this.shape_38.setTransform(-241.45,-92.429);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#C59064").s().p("ABYhuIAHgCIAIgBIADAAIAPgEIgTACIABgYQACACAFABQBNAVBLgGQgGAhg0APIAAABQANgBAKgDQggBfAGBgQgYgEgdADQgvAEgpAPIgPAHQALiBAgh5gACGh3IAFgBIAAAAgAkFA+QASgtAOgwQAOgxARgqQBEASBLADQhCBegCBlQgtgkhdAEg");
	this.shape_39.setTransform(-234.6,-106.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#B09B61").s().p("Al7BtQCGiYA3ilQAFACAHAAIBjACQgkAngbAqQgDgogEgnIgCAAQgMAvAPAoQgoBAgYBDQgLAlgSAjQgUAnAHAgQAghLAZhNQATg5Akg0IABABIAAgBIAAgBQALgRAOgQQAcgkAMggQC1ADC1gBQADBnAtBkQAQAlAIAmQAIAgAOAbQgYAMgcAMQiGA7iSgrQABgxAMgvQAHgbAKgaQANgfACgaQAWACAdgKIgBgBQgaAEgYgCIAAgHIgDAGQgYgDgUgKIgDAAQATARAYADQgdA+gPBEQgMA4AKAzIgHABIACgEIgCAEQgqADgoAAQjfAAhrhkg");
	this.shape_40.setTransform(-229.1,-138.5914);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#35BAD6").s().p("AjFCZIgOgBQAAgxAPhUQgBh3gGg6QAlAOApAJQBCAOAvABICHABQAoAAADgDQA4BgARBNQAJANAFBfIhhAAQi0AAitgGgAj4iIIAAgCIgEgIQACACADABIACABIgDALg");
	this.shape_41.setTransform(-226.575,-175.8039);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#246662").s().p("AATBTQgugBhCgOQgpgJglgOIgTgIIAAAAIgEgMIgBgGIgCgLIABgDIABgYQAQgxBtgOIAAgBIADAAIACAAQARAnBegLQA3gIAKgTIAKACQgBgCAQAHQAMAFAjAUIgSAEQgOAJgJAbIgYgcIgDABIAZAfIAJAKIACADIAYAjIABABIANAUIABAEIAIAOQgDADgoAAIiIgBg");
	this.shape_42.setTransform(-229.8,-196.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("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");
	this.shape_43.setTransform(-234.6705,-137.986);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#246662").s().p("Ag7AFIAAAAIgKgLIgIgKQABgHACgGQAKgLAOgIIASgFIAMAHQAsAaA2AoQgNADhWAfIgmgxg");
	this.shape_44.setTransform(-208.225,-195.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#C59064").s().p("AhDAVQgcgVAAgKQBRgcArgfIBDA3IgZALIgBADQgaAUgXAVQgDADgEABQgLAJgHANIgCADQghgYgcgZg");
	this.shape_45.setTransform(-193.5,-180.05);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#35BAD6").s().p("AhfgZQBXgeAMgDQAtAcAVAPQATAPAHADQgwAchIAdg");
	this.shape_46.setTransform(-200.825,-188);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AAYCEQgbgTgYgcIgGgOIgXgaQgXgagdgtIADADIgEgFIABACIgDgEIgCgEQgGgJgGgIIgegqIgFgHIgDgFIAAgCIgFgHIAFAGIAIAKIAJAMIAAABIAmAwIBHBUQBIgcAxgcQgHgDgUgQQgUgPgtgcQg2gpgsgaIgMgHIAPgCIA+AqQBsBLAPAOIAoAfIAoAeIAAACIABAAIAGAGIgMgBIhDg2QgtAehPAcQAAAKAbAWQAcAZAhAYIgFAFIAAAHIgZgRg");
	this.shape_47.setTransform(-199.575,-186.75);

	var maskedShapeInstanceList = [this.shape_18,this.shape_19,this.instance_1,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.instance_2,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.instance_2},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.instance_1},{t:this.shape_19},{t:this.shape_18}]}).to({state:[]},127).wait(1));

	// Layer_5
	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#74492A").ss(4,1,1).p("EgzcAAXQBBgfBPgBMBkpgAN");
	this.shape_48.setTransform(190.625,-169.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#74492A").ss(4,1,1).p("EAu7AATMhd1gAl");
	this.shape_49.setTransform(218.625,-169.125);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#74492A").ss(4,1,1).p("Al5AEQCZgFBGA3QBGA5BQACQBPACBQgiQBRgiCOif");
	this.shape_50.setTransform(-119.6,-159.4189);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#74492A").ss(4,1,1).p("Eg1bgBXQCSgqBbB9QBcB9DVgaQCHgODAi0MBdSAAC");
	this.shape_51.setTransform(206.45,-171.15,1,1,0,0,0,8.2,-11.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#74492A").ss(4,1,1).p("EAunAABMhdNgAB");
	this.shape_52.setTransform(288.6,-171.625);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#74492A").ss(4,1,1).p("AASBlQCHABDEiiQAJgIAKgIAAPBlQiYADjmjN");
	this.shape_53.setTransform(-47.025,-163.8985);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#74492A").ss(4,1,1).p("Ak2hIQCRhkCoBWQCpBWCLB/");
	this.shape_54.setTransform(228.65,-153.15,1,1,0,0,0,344,33.9);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#74492A").ss(4,1,1).p("EAzygAOMhOYAADQhAA7g7ApQiABZhgAAEgzxgALQDABECKhhQCKhiA/gaQA/gZBLAWQBKAWA6AuQA3AqAYAWIACABQABABAAAAEgmBgAjQACABABABQDiDWCXgD");
	this.shape_55.setTransform(193.125,-168.732);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#74492A").ss(4,1,1).p("A58DAQBgAACAhbQA4gnA+g5MBI5gAEEg0SABvQBJAVB1AjQB1AkBcgrQBcgrAwgsQAxgsCRiAQCSiCDBA2QBjAeCCB4QAAABABAAIACABQAAABAAAAQDiDZCYgD");
	this.shape_56.setTransform(190.6,-149.75,1,1,0,0,0,5.4,20.9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#74492A").ss(4,1,1).p("EAhvAAAMhDdAAA");
	this.shape_57.setTransform(303,-170.925);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#74492A").ss(4,1,1).p("AMOC4QBgAACAhZQA5gnA+g4AxkAJQCXgFBKAcQBLAbA8AzQA9AzAzAQQAzAPAzgGQAygGDujMQDujMDAA0QBjAdCCB2QAAABABAAIACABQAAABAAAAQDiDUCYgD");
	this.shape_58.setTransform(-25.825,-170.6389);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#74492A").ss(4,1,1).p("AkjhOQBjhQB8ALQB7AMBQBsQBQBrBNBF");
	this.shape_59.setTransform(-114.025,-187.8946);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#74492A").ss(4,1,1).p("AesACMg9XgAD");
	this.shape_60.setTransform(323.7,-171.475);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#74492A").ss(4,1,1).p("ALUC/QBgAACAhbQA4gnA8g4AqlC/QCdAADvjrQDHi7DAA1QBjAeCCB5QAAAAABABIACABQAAABAAAAQDiDZCYgCAqoC/QiZACjmjc");
	this.shape_61.setTransform(19.875,-171.7686);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#74492A").ss(4,1,1).p("ApKC+QiZADjmjcA+5C/QBhAACAhbQBOg4BahYQAjghAigZQCXhuCVAfQABAAABABQB2AgB6B2EAzfAABMg3KAAAQjPC+iMAAEgzeAASQAwACA7gSQA8gSBuhBQBthBA0gUQBFgaBFADQBeAECKBXIB4BXQBNBHB0BBQB0BCBMgB");
	this.shape_62.setTransform(191.275,-170.3652);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#74492A").ss(4,1,1).p("AYwABMgxfgAB");
	this.shape_63.setTransform(359.675,-170.075);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#74492A").ss(4,1,1).p("AgBC+QBfAACAhbQBPg3BZhYQAjghAjgZQCWhuCVAfQABAAACAAQB2AhB6B2AbRgDQjTDBiOAAAVtC9QiaADjljbA7QBrQCjArCJgQQB4gGBKgaQBKgaBVg+QBVg9ADgBQDFi2C/A1QBjAeCCB4QAAAAABABIACABIAAABQDiDYCYgD");
	this.shape_64.setTransform(26.4,-169.8879);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#74492A").ss(4,1,1).p("AXVAAMgupAAA");
	this.shape_65.setTransform(370.875,-170.525);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#74492A").ss(4,1,1).p("ABVC7QBgAACAhaQBPg4BZhYQAjghAjgaQCWhuCVAfQABAAACABQB2AhB6B1A8jAJQCugcAmAoQAmAqAZArQAZArAlAUQAkAUAjACQAjACAHABQAjABAqgGQDNg2Cvi2QDHi7DBA1QBjAeCCB5QAAAAABAAIACACQAAAAAAABQDiDZCXgDAckgCQjQC9iNAAAXEC7QiaADjljc");
	this.shape_66.setTransform(39.225,-170.254);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#74492A").ss(4,1,1).p("AYnAAMgxNAAB");
	this.shape_67.setTransform(420.325,-170.725);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#74492A").ss(4,1,1).p("AEiDpQBhAACAhfQBOg6BahdQAjgjAigaQCXh0CVAhQABAAABAAQB2AjB6B7AxXDpQCeABDuj3QDHjEDBA4QBkAgCBB9QABABAAAAIACACQABAAAAAAQDhDlCXgDAaRDpQiZADjmjoAfsAmQjMDEiLgBA/rjYQC1g4CxCNQCxCLAEAEQDgDgCWgD");
	this.shape_68.setTransform(59.6,-174.1035);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#74492A").ss(4,1,1).p("AUWhfMgjlAACQi/CwiHAN");
	this.shape_69.setTransform(392.75,-160.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#74492A").ss(4,1,1).p("AfTDAQiYADjhjbQgBgBAAAAIgCgBQAAgBgBgBQiBh5hkgeQjBg2jHC8QjvDuicgBAJaDAQiaADjljfAsUDAQBgAACAhbQBPg4BZhaQAjghAjgZQCWhwCVAgQABAAACAAQB1AhB6B3A/SACQD5AQBhhsQBghsCeATQBjAeCCB5QAAABABABIACABQAAAAAAABQDiDbCYgD");
	this.shape_70.setTransform(61.7,-170.0262);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#74492A").ss(4,1,1).p("Ae4hdMg4pAAAQi/CviHAM");
	this.shape_71.setTransform(496.425,-161.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#74492A").ss(4,1,1).p("AoGC/QBgAACAhbQBPg4BZhYQAjghAjgZQCVhvCVAfQABAAACABQB2AgB6B3ANoC/QiaACjljcEAjhAC/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjBg1jHC7QjvDridAAEgjgABrQCOACBEAgQBEAfCQgbQCQgbC+iuQC/ivDBA1QBjAeCCB5QAAAAABABIACABIAAABQDiDZCYgC");
	this.shape_72.setTransform(71.025,-170.7998);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#74492A").ss(4,1,1).p("Ac/hdMg03AAAQi/CviHAM");
	this.shape_73.setTransform(502.075,-161.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjcEggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgC");
	this.shape_74.setTransform(108.675,-170.7686);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#74492A").ss(4,1,1).p("AjvhJQC2gzA4BdQA2BcArAPQArAQAfAAQAeABAogL");
	this.shape_75.setTransform(-118.5,-161.4991);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#74492A").ss(4,1,1).p("AaEhdMgvBAAAQi/CviHAM");
	this.shape_76.setTransform(525.125,-161.25);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#74492A").ss(4,1,1).p("ArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_77.setTransform(150.425,-170.7686);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#74492A").ss(4,1,1).p("ACjhdQi+CviHAM");
	this.shape_78.setTransform(-43.9,-161.25);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#74492A").ss(4,1,1).p("AmiiGQgLgaBLg2QBMg1BoASQBpATAwBwQAuBwAVAvQAUAwAuBaQAuBaEHgS");
	this.shape_79.setTransform(-102.8143,-176.8337);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#74492A").ss(4,1,1).p("AXJhdMgpMAAAQi/CviHAM");
	this.shape_80.setTransform(539.85,-161.25);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#74492A").ss(4,1,1).p("AJ8CvQiXADjijaQgBAAAAAAIgCgCQgBAAhshWQhqhUicBFQgDACgDABQkOCVj0AJ");
	this.shape_81.setTransform(-90.95,-169.2035);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#74492A").ss(4,1,1).p("AV9hdMgmzAAAQi/CviHAM");
	this.shape_82.setTransform(548.925,-161.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#74492A").ss(4,1,1).p("ALKDHQiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQkahOixCBQjxDph1gL");
	this.shape_83.setTransform(-82.025,-171.632);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#74492A").ss(4,1,1).p("AVAhdMgk5AAAQi/CviHAM");
	this.shape_84.setTransform(559.475,-161.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCAKgC/QiZACjmjcArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_85.setTransform(217.225,-170.7686);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#74492A").ss(4,1,1).p("AL/C/QiYACjijZQAAAAAAgBIgCgBQgBgBAAAAQiCh5hjgeQjAg1jHC7QhnBrlOgrAr+AUQAwgLA6AJ");
	this.shape_86.setTransform(-70.65,-170.7686);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#74492A").ss(4,1,1).p("ATKhdMghNAAAQi/CviHAM");
	this.shape_87.setTransform(564.375,-161.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#74492A").ss(4,1,1).p("ANbDdQiYADjijbQAAAAAAAAIgDgCQAAAAgBgBQiBh3hkgeQi/g1jFC4QgBABgCABQgdAbgdAXQgNAIgOAGQhKAmg7AAQhgAAg1gxQglgggdhJQgjhVgPgVQgkgxhBAAQgWAAgrASQgXAKgrAR");
	this.shape_88.setTransform(-63.1,-173.8486);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#74492A").ss(4,1,1).p("ARUhcI9hgBQi/CviHAM");
	this.shape_89.setTransform(569.275,-161.25);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3AKgC/QiZACjmjcEAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAA");
	this.shape_90.setTransform(250.625,-170.7686);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#74492A").ss(4,1,1).p("AOcC+QiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQjBg2jGC7Qj4DshTAAQhUABgkgOQgkgNhig+Qhig+gjgRQgjgQgoAGQgoAHgNAC");
	this.shape_91.setTransform(-52.925,-170.7192);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#74492A").ss(4,1,1).p("EggYAC6QCQgdDMjJQDHi7DBA1QBkAeCBB5QABAAAAABIACABIABABQDiDZCXgCArOC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCUAfQABAAABABQB2AgB6B3EAgZAC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAKgC/QiZACjmjc");
	this.shape_92.setTransform(267.325,-170.7686);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#74492A").ss(4,1,1).p("APoC+QiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jGC7QjvDsicgBAmQC+QiGAJh/heQh/hdjTBp");
	this.shape_93.setTransform(-43.875,-170.7364);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#74492A").ss(4,1,1).p("AQvC/QiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjuDricAAAwuASQDZhCBSA9QBRA/BSAxQB+BECZgC");
	this.shape_94.setTransform(-34.2875,-170.7657);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#74492A").ss(4,1,1).p("ASUD2QiXADjijbQgBAAAAAAIgCgCQAAAAgBgBQiBh3hkgeQjBg2jHC6QjuDticgBAyTiyQC2h2BsBaQBsBaCjCQQDlDdCZgD");
	this.shape_95.setTransform(-27.6625,-176.3049);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#74492A").ss(4,1,1).p("AThDHQiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jHC7QjvDsibgBAiXDHQiZADjmjdAzgAkQBlgMAegcQAdgeAIgOQAJgOADgEQA9heBcgaQBigcBMAjQBNAiB+B7");
	this.shape_96.setTransform(-18.6625,-171.6338);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#74492A").ss(4,1,1).p("AVNDAQiYACjijZQAAAAAAgBIgCgBQgBgBgBAAQiBh5hjgeQjBg1jIC7QjvDribAAA1MBqQDCANBUhdQBVhdBVhJQBWhJCVAgQABAAABABQB2AgB6B3AgsDAQiZACjmjc");
	this.shape_97.setTransform(-12.7,-170.851);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#74492A").ss(4,1,1).p("AV1DLQiXACjijZQgBAAAAgBIgCgBQAAgBgBAAQiBh5hkgeQjBg1jHC7QjvDricAAAgDDLQiZACjmjcA10AZQDnAjBpgrQBqgrBUhVQBThVBDgFQBCgFBHAjQBHAiB6B3");
	this.shape_98.setTransform(-0.075,-171.9815);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#74492A").ss(4,1,1).p("AXXDnQiYACjijaQAAAAAAgBIgCgBQgBgBAAAAQiCh4hjgeQjBg1jHC7QjvDridAAAkkAJQh6h2g8gWQg8gWhKABQhKAChQA4Qg1AlgoAlIgCADQgQAPgOAPQgCABgBABQgMALgMAIQgeAVgxAUQgxATgCAAQjXA5gljQQgljTihAvABeDnQiZACjljd");
	this.shape_99.setTransform(6.9,-174.7693);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#74492A").ss(4,1,1).p("AY5C+QiYADjijaQAAAAAAAAIgCgCQgBAAAAgBQiCh4hjgeQjCg2jGC7QjwDsicgBAC/C+QiZADjljdAyvC+QBhAACAhbQBOg3BahZQAjghAigZQCXhvCVAgQABAAABAAQB2AhB6B2A44ANQC2DBDPgQ");
	this.shape_100.setTransform(22.15,-170.7069);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#74492A").ss(4,1,1).p("AboC7QiXADjijaQgBAAAAAAIgCgCQAAAAgBgBQiBh4hkgeQjBg2jHC7QjvDsicgBAFvC7QiZADjljdAv/C7QBhAACAhbQBOg3BahZQAjghAigZQCXhvCVAgQABAAABAAQB2AhB6B2A7nBsQDGgCDBA0QDBA0CcgX");
	this.shape_101.setTransform(21.275,-170.4269);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#74492A").ss(4,1,1).p("AcIC/QiYACjijZQgBAAAAgBIgBgBQgBgBgBAAQiBh5hjgeQjCg1jHC7QjuDridAAAvgC/QBhAACAhbQBOg4BahYQAjghAigZQCXhvCVAfQABAAABABQB2AgB5B3AGOC/QiZACjmjcA8HAPQDhg1BnAVQBoAUBuBfQBuBfCXgC");
	this.shape_102.setTransform(34.85,-170.7671);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#74492A").ss(4,1,1).p("AJ3DxQiaACjljdAr3DxQBgAACAhbQBPg4BZhZQAjggAjgZQCWhvCUAfQABAAACABQB2AgB6B2AfvDxQiXACjijaQAAAAAAgBIgCgBQgBgBAAAAQiCh4hjgeQjBg1jHC6QjvDsidAAA/ujJQEPhUDdBiQDdBiBKA6QBGA2AdAUQACABACACQDiDFCXgC");
	this.shape_103.setTransform(61.75,-175.7906);

	var maskedShapeInstanceList = [this.shape_48,this.shape_49,this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84,this.shape_85,this.shape_86,this.shape_87,this.shape_88,this.shape_89,this.shape_90,this.shape_91,this.shape_92,this.shape_93,this.shape_94,this.shape_95,this.shape_96,this.shape_97,this.shape_98,this.shape_99,this.shape_100,this.shape_101,this.shape_102,this.shape_103];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_48}]}).to({state:[{t:this.shape_50},{t:this.shape_49}]},4).to({state:[{t:this.shape_51}]},4).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52}]},4).to({state:[{t:this.shape_55}]},4).to({state:[{t:this.shape_56}]},4).to({state:[{t:this.shape_58},{t:this.shape_57}]},4).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59}]},4).to({state:[{t:this.shape_62}]},4).to({state:[{t:this.shape_64},{t:this.shape_63}]},4).to({state:[{t:this.shape_66},{t:this.shape_65}]},4).to({state:[{t:this.shape_68},{t:this.shape_67}]},4).to({state:[{t:this.shape_70},{t:this.shape_69}]},4).to({state:[{t:this.shape_72},{t:this.shape_71}]},4).to({state:[{t:this.shape_75},{t:this.shape_74},{t:this.shape_73}]},4).to({state:[{t:this.shape_79},{t:this.shape_78,p:{x:-43.9}},{t:this.shape_77,p:{x:150.425}},{t:this.shape_76}]},5).to({state:[{t:this.shape_81},{t:this.shape_78,p:{x:-10.5}},{t:this.shape_77,p:{x:183.825}},{t:this.shape_80}]},4).to({state:[{t:this.shape_83},{t:this.shape_78,p:{x:6.2}},{t:this.shape_77,p:{x:200.525}},{t:this.shape_82}]},4).to({state:[{t:this.shape_86},{t:this.shape_78,p:{x:22.9}},{t:this.shape_85,p:{x:217.225}},{t:this.shape_84}]},4).to({state:[{t:this.shape_88},{t:this.shape_78,p:{x:39.6}},{t:this.shape_85,p:{x:233.925}},{t:this.shape_87}]},4).to({state:[{t:this.shape_91},{t:this.shape_78,p:{x:56.3}},{t:this.shape_90,p:{x:250.625}},{t:this.shape_89,p:{x:569.275}}]},4).to({state:[{t:this.shape_93},{t:this.shape_78,p:{x:73}},{t:this.shape_92,p:{x:267.325}},{t:this.shape_89,p:{x:585.975}}]},3).to({state:[{t:this.shape_94},{t:this.shape_78,p:{x:89.7}},{t:this.shape_92,p:{x:284.025}},{t:this.shape_89,p:{x:602.675}}]},4).to({state:[{t:this.shape_95},{t:this.shape_78,p:{x:106.4}},{t:this.shape_92,p:{x:300.725}},{t:this.shape_89,p:{x:619.375}}]},4).to({state:[{t:this.shape_96},{t:this.shape_78,p:{x:123.1}},{t:this.shape_92,p:{x:317.425}},{t:this.shape_89,p:{x:636.075}}]},4).to({state:[{t:this.shape_97},{t:this.shape_78,p:{x:139.8}},{t:this.shape_92,p:{x:334.125}},{t:this.shape_89,p:{x:652.775}}]},4).to({state:[{t:this.shape_98},{t:this.shape_78,p:{x:156.5}},{t:this.shape_77,p:{x:350.825}},{t:this.shape_89,p:{x:669.475}}]},4).to({state:[{t:this.shape_99},{t:this.shape_78,p:{x:173.2}},{t:this.shape_77,p:{x:367.525}},{t:this.shape_89,p:{x:686.175}}]},4).to({state:[{t:this.shape_100},{t:this.shape_78,p:{x:198.25}},{t:this.shape_85,p:{x:392.575}},{t:this.shape_89,p:{x:711.225}}]},4).to({state:[{t:this.shape_101},{t:this.shape_78,p:{x:214.95}},{t:this.shape_90,p:{x:409.275}},{t:this.shape_89,p:{x:727.925}}]},4).to({state:[{t:this.shape_102},{t:this.shape_78,p:{x:231.65}},{t:this.shape_92,p:{x:425.975}},{t:this.shape_89,p:{x:744.625}}]},4).to({state:[{t:this.shape_103},{t:this.shape_78,p:{x:281.75}},{t:this.shape_92,p:{x:476.075}},{t:this.shape_89,p:{x:794.725}}]},4).to({state:[]},3).wait(1));

	// Layer_6
	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#74492A").ss(4,1,1).p("AN7AAI71AB");
	this.shape_104.setTransform(608,-171.575);

	var maskedShapeInstanceList = [this.shape_104];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_104).wait(4).to({y:-167.375},0).wait(4).to({y:-169.975},0).wait(4).to({y:-171.375},0).wait(4).to({y:-170.075},0).wait(4).to({y:-170.475},0).wait(4).to({y:-170.625},0).wait(4).to({y:-171.275},0).wait(4).to({y:-170.375},0).wait(4).to({y:-170.075},0).wait(4).to({y:-170.675},0).wait(8).to({y:-170.075},0).to({_off:true},4).wait(76));

	// Layer 4
	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#66CC99").s().p("EBE6AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEBDCAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEBBKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA/SAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA9aAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA7iAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA5qAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA3yAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA16AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEA0CAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAyKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAwSAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAuaAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAsiAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAqqAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAoyAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAm6AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAlCAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAjKAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEAhSAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAfaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAdiAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAbqAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAZyAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAX6AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAWCAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAUKAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgASSAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAQaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAOiAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAMqAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAKyAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAI6AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAHCAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAFKAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgADSAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgABaAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAgdAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA7AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg7AAgAiVAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAkNAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAmFAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAn9AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAp1AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgArtAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAtlAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAvdAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAxVAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgAzNAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA1FAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA29AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA41AIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA6tAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA8lAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgA+dAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEggVAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgiNAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgkFAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgl9AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgn1AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgptAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgrlAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgtdAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgvVAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgxNAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEgzFAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg09AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg21AAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg4tAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg6lAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8AAgEg8dAAHQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEg+VAAGQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAAAAAAAQABABAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEhANAAFQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAIA8ABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABAAAAAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAIg8gBgEhCFAAEQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBgEhD9AADQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAgBQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBgEhF1AACQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAIA8ABQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAABAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIg8gBg");
	this.shape_105.setTransform(245.575,-170.6);

	var maskedShapeInstanceList = [this.shape_105];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_105).wait(128));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-281.7,-285.7,1001.4000000000001,216.2);


(lib._5a = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"normal":0,next:1,seconds:2,replay:3,right:4,wrong:5,righthint:6,refpoint:7});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// ost text2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgwA7IAAgUIBChOIhAAAIAAgTIBbAAIAAAUIhCBOIBGAAIAAATg");
	this.shape.setTransform(-180.55,-144.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAuBYIAAhRIhaAAIAABRIgZAAIAAivIAZAAIAABJIBaAAIAAhJIAYAAIAACvg");
	this.shape_1.setTransform(-195.65,-147.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag5BbIAAgaIBGhFIAHgIIAGgJIAFgJQABgFAAgGQAAgGgCgFQgDgGgEgDQgDgEgGgCQgGgCgGAAQgMAAgJAHQgIAIgDAMIgagCQADgMAFgIQAFgJAHgGQAIgFAKgDQAJgDALAAQAMAAAKADQAKADAHAHQAIAGAEAJQAFAJAAAMQAAAJgCAIIgHAOIgKAMIgMALIg5A5IBYAAIAAAVg");
	this.shape_2.setTransform(-218.8,-147.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgOBgIAAhiIgaAAIAAgTIAaAAIAAgbQAAgYAJgLQAHgMAXAAIAIAAIAJACIgDATIgGgBIgHAAQgGAAgEABQgDACgDAEQgCAEgBAEIAAALIAAAcIAaAAIAAATIgbAAIAABig");
	this.shape_3.setTransform(-236.9,-148.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgYA5QgLgEgJgJQgIgIgFgMQgFgLAAgNQAAgMAFgLQAFgLAIgJQAJgIALgFQAMgFAMAAQANAAAMAFQALAFAJAIQAIAJAFALQAFALAAAMQAAANgFALQgFAMgIAIQgJAJgLAEQgMAFgNAAQgMAAgMgFgAgPglQgHADgFAFQgFAGgDAHQgDAIAAAIQAAAJADAIQADAHAFAGQAFAFAHADQAHADAIAAQAJAAAHgDQAIgDAFgFQAFgGACgHQADgIAAgJQAAgIgDgIQgCgHgFgGQgFgFgIgDQgHgDgJAAQgIAAgHADg");
	this.shape_4.setTransform(-248.475,-144.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AguBZIgKgDIADgUQAGACAHAAQAFAAAEgBQAEgBACgDIAFgGIADgIIAHgTIgxh2IAaAAIAiBbIABAAIAhhbIAZAAIg5CPIgFAOQgDAGgFAFQgEAEgHADQgGACgJAAIgKAAg");
	this.shape_5.setTransform(-143.525,-174.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgQA5QgLgEgJgIQgHgIgFgLQgFgMAAgOQAAgMAFgMQAFgMAHgIQAJgIALgEQALgFANAAQAOAAALAFQAMAEAJAJIgRAQQgGgGgIgEQgGgDgKAAQgIAAgHADQgHAEgFAGQgEAFgDAIQgCAHAAAIQABAIACAIQADAHAFAFQAFAGAHADQAGADAIAAQAKAAAHgEQAGgDAHgGIAPAQQgJAKgLAEQgLAEgOAAQgMAAgMgFg");
	this.shape_6.setTransform(-155.35,-177.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAeA9IAAhFQAAgIgCgGQgDgGgEgEQgDgDgFgCQgEgCgGAAQgGAAgGACQgGADgEAFQgFAFgCAHQgDAIAAAJIAAA9IgXAAIAAh2IAXAAIAAATIABAAQADgKALgGQALgGAMAAQAJAAAIADQAIADAFAFQAHAGADAIQADAJABAMIAABLg");
	this.shape_7.setTransform(-168.8,-177.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgXA6QgLgFgIgJQgIgIgEgLQgEgMAAgNQAAgMAEgMQAFgLAIgIQAIgJALgEQAMgFAMAAQAPAAAMAFQAKAGAHAJQAIAJADALQACALAAAKIAAAIIhdAAQAAAIADAGQAEAHAFAEQAGAFAGACQAIADAGAAQALAAAIgFQAIgFAGgIIARANQgTAYghAAQgNAAgMgEgAgNgoQgGADgFAFQgFAFgDAGQgCAGAAAGIBFAAQAAgHgCgGQgCgHgFgEQgEgFgGgDQgHgCgHAAQgIAAgHADg");
	this.shape_8.setTransform(-182.7,-177.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgZA6QgIgCgFgGQgHgFgDgJQgDgJgBgLIAAhMIAXAAIAABFQAAAJACAFQADAGADAEQAEAEAFABQAEACAGAAQAGAAAGgCQAGgDAEgFQAFgEACgIQADgHAAgLIAAg8IAXAAIAAB2IgXAAIAAgSIgBAAQgEAJgKAGQgLAGgNAAQgIAAgIgDg");
	this.shape_9.setTransform(-196.6,-177.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAoBZIAAhKIAAAAQgGAKgMAFQgLAFgMAAQgOAAgLgEQgLgFgIgJQgHgIgFgKQgEgMAAgNQAAgNAEgLQAFgMAHgIQAIgJALgEQALgFAOAAQALAAAMAFQALAFAHAKIAAAAIAAgRIAWAAIAACugAgOhAQgHADgFAFQgFAGgDAHQgDAIAAAJQAAAJADAIQADAHAFAFQAFAFAHADQAHADAIAAQAJAAAHgDQAIgDAFgFQAFgFACgHQADgIAAgJQAAgJgDgIQgCgHgFgGQgFgFgIgDQgHgDgJAAQgIAAgHADg");
	this.shape_10.setTransform(-211.525,-175.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgXA6QgLgFgIgJQgIgIgEgLQgEgMgBgNQABgMAEgMQAFgLAIgIQAIgJALgEQALgFANAAQAPAAAMAFQALAGAGAJQAIAJADALQACALAAAKIAAAIIhdAAQgBAIAEAGQADAHAGAEQAGAFAGACQAIADAGAAQALAAAIgFQAHgFAHgIIARANQgTAYghAAQgNAAgMgEgAgNgoQgHADgEAFQgFAFgDAGQgCAGAAAGIBGAAQgBgHgCgGQgCgHgEgEQgFgFgGgDQgHgCgHAAQgIAAgHADg");
	this.shape_11.setTransform(-225.8,-177.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AghA9IAAh2IAWAAIAAATIABAAQACgFAEgEIAHgHIAKgEIALgCQAGAAAEACIgBAYIgFgBIgGgBQgQAAgIAKQgJAJAAASIAAA8g");
	this.shape_12.setTransform(-236.425,-177.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("Ag3BYIAAiwIBvAAIAAAXIhWAAIAAA3IBQAAIAAAWIhQAAIAABMg");
	this.shape_13.setTransform(-248.075,-180.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFEAD").s().p("AprFyQh4AAAAh4IAAnzQAAh4B4AAITXAAQB4AAAAB4IAAHzQAAB4h4AAg");
	this.shape_14.setTransform(-193.625,-163.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(9));

	// input
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFEAD").s().p("AsWFHQhyAAAAhqIAAm5QAAhqByAAIYtAAQByAAAABqIAAG5QAABqhyAAg");
	this.shape_15.setTransform(-348.5,198.825);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8610").s().p("AtCFyQh4AAAAh4IAAnzQAAh4B4AAIaFAAQB4AAAAB4IAAHzQAAB4h4AAgAuIjYIAAG4QAABqByAAIYtAAQByAAAAhqIAAm4QAAhqhyAAI4tAAQhyAAAABqg");
	this.shape_16.setTransform(-348.525,198.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15}]}).wait(9));

	// header
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgaBMQgQgGgLgLQgMgKgHgPQgHgPAAgTQAAgRAHgQQAHgPAMgKQALgLAQgGQAQgGARAAQARAAANAGQAOAGAJALQAKAKAFAPQAFAQAAARIAAAPIhvAAQADAOAKAIQAJAIAOAAQALAAAJgFQAIgFAGgJIAhAZQgLAPgSAIQgRAIgTAAQgRAAgQgGgAgLgsQgGADgEAEQgEAEgDAFQgCAGgBAFIA/AAQAAgMgIgIQgJgJgNAAQgHAAgGACg");
	this.shape_17.setTransform(-180.775,-286.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgXBOIhBibIA0AAIAnBpIAAAAIAlhpIAxAAIg+Cbg");
	this.shape_18.setTransform(-198.85,-286.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgnBPQgLgDgHgHQgIgGgEgJQgFgJAAgLQAAgOAFgJQAFgJAIgFQAJgHALgDQALgDAMgCQAMgCAKAAIAWAAQgBgNgIgHQgKgIgMAAQgLAAgKAFQgJAFgIAJIgagbQANgMATgGQARgHATAAQAVAAAOAGQANAFAIAKQAIAKADAPQAEAPAAAUIAABOIgsAAIAAgUIgBAAQgIANgOAFQgMAGgPAAQgKAAgKgDgAAFAKQgHABgIACQgHACgFAFQgGAEAAAIQAAAJAHAEQAIAEAIAAQAGAAAGgCQAHgCAGgDQAEgEADgFQAEgGAAgHIAAgKIgNAAIgNAAg");
	this.shape_19.setTransform(-216.55,-286.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAyBxIgyicIAAAAIgxCcIgrAAIhEjhIA3AAIAkCQIABAAIAviQIAtAAIAvCUIABAAIAmiUIAyAAIhBDhg");
	this.shape_20.setTransform(-240.95,-290.175);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgoBPQgJgDgIgHQgIgGgEgJQgFgJAAgLQAAgOAFgJQAFgJAIgFQAJgHALgDQALgDALgCQAMgCALAAIAVAAQABgNgKgHQgJgIgMAAQgLAAgKAFQgKAFgHAJIgagbQAOgMARgGQASgHASAAQAWAAANAGQAOAFAIAKQAIAKAEAPQADAPAAAUIAABOIgtAAIAAgUIAAAAQgIANgNAFQgMAGgPAAQgLAAgLgDgAAFAKQgHABgHACQgIACgGAFQgEAEAAAIQAAAJAGAEQAIAEAIAAQAGAAAHgCQAHgCAFgDQAFgEADgFQACgGAAgHIAAgKIgLAAIgOAAg");
	this.shape_21.setTransform(-275.2,-286.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgcB7IAAh1IgfAAIAAglIAfAAIAAgcQAAgNADgLQACgLAGgJQAHgJALgFQAMgFATAAIAPABIANACIgCApIgIgDIgIgBQgLABgGAFQgGAFAAAPIAAAZIAkAAIAAAlIgkAAIAAB1g");
	this.shape_22.setTransform(-298.675,-291.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AghBMQgQgGgLgLQgMgKgHgPQgGgPAAgTQAAgRAGgQQAHgPAMgKQALgLAQgGQAQgGARAAQASAAAQAGQAPAGAMALQAMAKAGAPQAHAQAAARQAAATgHAPQgGAPgMAKQgMALgPAGQgQAGgSAAQgRAAgQgGgAgcgbQgKAKAAARQAAASAKALQALAKARAAQASAAAKgKQAKgLAAgSQAAgRgKgKQgKgLgSAAQgRAAgLALg");
	this.shape_23.setTransform(-314.625,-286.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AhTBuIAHgnQAKAFALAAQAJAAAEgCQAGgCADgDQADgDADgFIAFgLIADgJIhEicIA0AAIAnBmIABAAIAhhmIAyAAIhHC0IgJAWQgEAJgGAHQgHAGgKAEQgLADgRAAQgTAAgRgGg");
	this.shape_24.setTransform(-342.75,-282.775);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgRBMQgQgGgMgLQgMgKgGgPQgHgPAAgTQAAgRAHgQQAGgPAMgKQAMgLAQgGQAQgGAQAAQAOAAAPAFQAPAFAMALIggAhQgDgFgGgDQgHgDgIAAQgQAAgLALQgKAKAAARQAAASAKALQALAKAQAAQAIAAAHgDQAFgEAEgEIAgAhQgMALgPAFQgPAFgOAAQgQAAgQgGg");
	this.shape_25.setTransform(-358.75,-286.625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAbBQIAAhMIAAgNQgBgHgCgHQgDgGgFgDQgFgEgJAAQgIAAgGADQgGADgDAGQgDAGgBAHIgBANIAABOIgwAAIAAibIAuAAIAAAVIABAAQACgEAEgFQAEgEAGgEQAGgDAGgCQAIgDAIAAQATAAALAGQALAGAGAJQAGAKADAOQACANAAAQIAABVg");
	this.shape_26.setTransform(-376.225,-286.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgaBMQgQgGgLgLQgMgKgHgPQgHgPAAgTQAAgRAHgQQAHgPAMgKQALgLAQgGQAQgGARAAQARAAANAGQAOAGAJALQAKAKAFAPQAFAQAAARIAAAPIhvAAQADAOAKAIQAJAIAOAAQALAAAJgFQAIgFAGgJIAhAZQgLAPgSAIQgRAIgTAAQgRAAgQgGgAgLgsQgGADgEAEQgEAEgDAFQgCAGgBAFIA/AAQAAgMgIgIQgJgJgNAAQgHAAgGACg");
	this.shape_27.setTransform(-394.575,-286.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AguBKQgLgGgGgJQgGgKgDgOQgCgNAAgQIAAhVIAwAAIAABMIABANQAAAHADAHQACAGAFADQAFAEAJAAQAIAAAGgDQAGgDADgGQADgGABgHIABgNIAAhOIAwAAIAACbIguAAIAAgVIgBAAIgGAJQgEAEgGAEQgGADgGACQgHADgJAAQgSAAgMgGg");
	this.shape_28.setTransform(-412.925,-286.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAkB0IAAhZIAAAAQgIALgNAEQgNAFgOAAQgRAAgNgHQgNgHgJgLQgKgMgEgOQgFgOAAgRQAAgRAFgPQAFgPAKgLQAKgKAPgGQAOgGARAAQAHAAAHACQAIACAGAEQAGADAFAFIAIAIIAAAAIAAgUIAsAAIAADjgAgag+QgKALAAASQAAARAKALQALAKARAAQASAAAKgKQAKgLAAgRQAAgSgKgLQgKgLgSAAQgRAAgLALg");
	this.shape_29.setTransform(-432.675,-283.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgaBMQgQgGgLgLQgMgKgHgPQgHgPAAgTQAAgRAHgQQAHgPAMgKQALgLAQgGQAQgGARAAQARAAANAGQAOAGAJALQAKAKAFAPQAFAQAAARIAAAPIhvAAQADAOAKAIQAJAIAOAAQALAAAJgFQAIgFAGgJIAhAZQgLAPgSAIQgRAIgTAAQgRAAgQgGgAgLgsQgGADgEAEQgEAEgDAFQgCAGgBAFIA/AAQAAgMgIgIQgJgJgNAAQgHAAgGACg");
	this.shape_30.setTransform(-451.425,-286.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("Ag2BQIAAibIAwAAIAAAZIABAAQAHgOAKgHQALgIAQAAIAIABIAIABIAAAsIgKgCIgLgBQgOAAgIAEQgHADgFAHQgDAHgBAKQgCAIAAAMIAABBg");
	this.shape_31.setTransform(-466.425,-286.825);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AhLBxIAAjhICXAAIAAAuIhlAAIAAAuIBdAAIAAAtIhdAAIAABYg");
	this.shape_32.setTransform(-482.5,-290.175);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.lf(["#2BC4F3","#00AEEE","#0095DA"],[0,0.498,1],462.3,53.3,462.3,-27.1).s().p("Egg6AF8QiCAAABh2IAAoMQgBh1CCAAMBB0AAAQCDAAAAB1IAAIMQAAB2iDAAg");
	this.shape_33.setTransform(-269.25,-284.6,1,1,0,0,0,60.7,0);

	this.instance = new lib.shadow_mc();
	this.instance.parent = this;
	this.instance.setTransform(-332.55,-246.6,0.923,1,0,0,0,272.4,12.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]}).wait(9));

	// boy
	this.boy_mc = new lib.level_01copy_replace();
	this.boy_mc.name = "boy_mc";
	this.boy_mc.parent = this;
	this.boy_mc.setTransform(-263.95,-50.85,1.0171,1.5602,0,0,0,-143.8,-169.6);

	this.timeline.addTween(cjs.Tween.get(this.boy_mc).to({_off:true},6).wait(3));

	// boy
	this.boy_mc_1 = new lib.level_01copy3();
	this.boy_mc_1.name = "boy_mc_1";
	this.boy_mc_1.parent = this;
	this.boy_mc_1.setTransform(-263.95,-50.85,1.0171,1.5602,0,0,0,-143.8,-169.6);

	this.instance_1 = new lib.level_01("single",127);
	this.instance_1.parent = this;
	this.instance_1.setTransform(-264.15,-50.05,1.0171,1.5602,0,0,0,-143.8,-169.6);

	this.boy1_mc = new lib.level_01copy4();
	this.boy1_mc.name = "boy1_mc";
	this.boy1_mc.parent = this;
	this.boy1_mc.setTransform(-264.15,-49.35,1.0171,1.5602,0,0,0,-143.8,-169.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.boy_mc_1}]},6).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.boy1_mc}]},1).wait(1));

	// next btn
	this.next_btn = new lib.next1_mc();
	this.next_btn.name = "next_btn";
	this.next_btn.parent = this;
	this.next_btn.setTransform(451,263.95,1,1,0,0,0,71.9,27.8);
	this.next_btn._off = true;

	this.timeline.addTween(cjs.Tween.get(this.next_btn).wait(1).to({_off:false},0).to({_off:true},1).wait(7));

	// infomsg1
	this.infomsg1_mc = new lib.osttext_mc();
	this.infomsg1_mc.name = "infomsg1_mc";
	this.infomsg1_mc.parent = this;
	this.infomsg1_mc.setTransform(153.9,156.85,1,1,0,0,0,370.1,56);

	this.timeline.addTween(cjs.Tween.get(this.infomsg1_mc).to({_off:true},3).wait(6));

	// Layer_2
	this.waveinput = new lib.an_TextInput({'id': 'waveinput', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.waveinput.setTransform(174.05,169.55,1.62,1.9892,0,0,0,50.1,11.2);
	this.waveinput._off = true;

	this.timeline.addTween(cjs.Tween.get(this.waveinput).wait(3).to({_off:false},0).wait(3).to({regY:11.1,scaleY:2.4545,y:95.45},0).to({_off:true},1).wait(2));

	// Layer_3
	this.hint_mc = new lib.hint_mccopy();
	this.hint_mc.name = "hint_mc";
	this.hint_mc.parent = this;
	this.hint_mc.setTransform(385.6,171,1,1,0,0,0,55.1,26.4);

	this.hide_mc = new lib.hide_mc();
	this.hide_mc.name = "hide_mc";
	this.hide_mc.parent = this;
	this.hide_mc.setTransform(385.6,171,1,1,0,0,0,55.1,26.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.hide_mc},{t:this.hint_mc}]},3).to({state:[]},3).wait(3));

	// infomsg2
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFEAD").s().p("AsWD8QhyAAAAhqIAAkoQAAgTAFgPQAShDBbAAIYtAAQBaAAATBDQAEAPABATIAAEoQAABqhyAAg");
	this.shape_34.setTransform(173.05,168.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FF8610").s().p("AtCEnQh4AAAAh4IAAljQAEhyB0AAIaFAAQB0AAAEByIAAFjQAAB4h4AAgAuDi0QgEAPgBATIAAEnQAABqByAAIYtAAQByAAAAhqIAAknQAAgTgFgPQgShDhbAAI4tAAQhaAAgTBDg");
	this.shape_35.setTransform(173.025,168.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgXBRQgJgFgHgHQgHgIgEgKQgEgJAAgMQAAgMAEgKQAEgJAHgHQAHgHAJgFQAKgEAMAAQAKAAAKAFQAKAEAGAJIAAhOIAUAAIAACmIgUAAIAAgPQgGAIgKAFQgKAEgKAAQgMAAgKgDgAgNgDQgGADgEAEQgFAFgCAGQgDAHAAAIQAAAIADAHQACAGAFAFQAEAEAGAEQAHACAHAAQAIAAAGgCQAGgEAFgEQAEgFACgGQADgHAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgDQgGgCgIAAQgHAAgHACg");
	this.shape_36.setTransform(-94.225,201.7);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAAQIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_37.setTransform(-106.825,204.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgFAFgCAHQgDAGAAAHQAAAIADAHQACAHAFAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_38.setTransform(-119.45,204.675);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgOAzQgKgFgHgHQgHgGgEgLQgEgJAAgMQAAgMAEgKQAEgKAHgHQAHgHAKgFQAKgDALAAQAMAAAKADQALAFAHAIIgPANQgFgFgGgDQgGgDgJAAQgHAAgGADQgGACgEAGQgEAFgCAHQgCAGAAAHQAAAHACAHQADAGAEAFQAEAEAHAEQAFACAHAAQAJAAAGgDQAGgDAFgFIAOANQgIAJgKAEQgKADgMAAQgLAAgKgDg");
	this.shape_39.setTransform(-130.875,204.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_40.setTransform(-142.725,204.675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_41.setTransform(-153.875,204.675);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AAKBOIAAiDIgcAbIgMgPIArgkIASAAIAACbg");
	this.shape_42.setTransform(-172,202.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAAQIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_43.setTransform(-189.175,204.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgJBOIAAhoIATAAIAABogAgJg1QgEgEgBgGQABgFAEgFQAEgEAFAAQAGAAAEAEQAFAFAAAFQAAAGgFAEQgEAFgGAAQgFAAgEgFg");
	this.shape_44.setTransform(-197.95,202.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgXBQQgJgEgHgHQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgJAHgHQAHgHAJgFQAKgEAMAAQAKAAAKAFQAKAEAGAJIAAhOIAUAAIAACmIgUAAIAAgPQgGAJgKAEQgKAEgKABQgMAAgKgFgAgNgDQgGADgEAEQgFAFgCAGQgDAHAAAIQAAAIADAGQACAIAFAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgIQADgGAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgDQgGgCgIAAQgHAAgHACg");
	this.shape_45.setTransform(11.375,170.55);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_46.setTransform(-1.225,173.525);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgOAyQgKgDgHgIQgHgGgEgLQgEgJAAgMQAAgMAEgKQAEgKAHgIQAHgGAKgFQAKgDALAAQAMAAAKADQALAFAHAIIgPANQgFgFgGgDQgGgDgJAAQgHAAgGADQgGACgEAGQgEAFgCAHQgCAGAAAHQAAAHACAGQADAHAEAFQAEAFAHADQAFACAHAAQAJAAAGgDQAGgDAFgFIAOANQgIAJgKAEQgKADgMABQgLAAgKgFg");
	this.shape_47.setTransform(-12.225,173.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgWA0QgHgDgFgFQgFgEgDgIQgDgIAAgKIAAhCIATAAIAAA9QAAAGACAGQACAFAEADQADADAEACIAJABQAFAAAGgBQAFgDAEgEQAEgEACgHQACgGAAgKIAAg0IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAEQgJAGgMAAQgHAAgHgCg");
	this.shape_48.setTransform(-24.075,173.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgXBQQgJgEgHgHQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgJAHgHQAHgHAJgFQAKgEAMAAQAKAAAKAFQAKAEAGAJIAAhOIAUAAIAACmIgUAAIAAgPQgGAJgKAEQgKAEgKABQgMAAgKgFgAgNgDQgGADgEAEQgFAFgCAGQgDAHAAAIQAAAIADAGQACAIAFAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgIQADgGAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgDQgGgCgIAAQgHAAgHACg");
	this.shape_49.setTransform(-37.175,170.55);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgFAFgCAHQgDAGAAAHQAAAIADAHQACAHAFAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_50.setTransform(-50.15,173.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgdA1IAAhnIATAAIAAAQIABAAQACgEAEgEIAGgFIAJgEIAKgCQAEABAEABIAAAWIgGgCIgEAAQgPAAgHAIQgHAIgBAQIAAA0g");
	this.shape_51.setTransform(-59.95,173.4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("Ag2BUIAAilIAUAAIAAAPIAAAAQAGgIAKgFQAKgEAKgBQAMABAKAEQAJAEAHAHQAHAIAEAKQAEAKAAALQAAAMgEAKQgEAJgHAIQgHAHgJAEQgKAEgMAAQgKAAgKgEQgKgFgGgJIAAAAIAABNgAgOg+QgGACgFAFQgEAFgDAHQgCAHAAAHQAAAJACAGQADAHAEAEQAFAEAGADQAGACAIAAQAHAAAHgCQAGgDAEgEQAFgEACgHQADgGAAgJQAAgHgDgHQgCgHgFgFQgEgFgGgCQgHgDgHAAQgIAAgGADg");
	this.shape_52.setTransform(-70.925,176.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_53.setTransform(-90.125,173.525);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgJA0IgrhnIAYAAIAdBPIAehPIAWAAIgqBng");
	this.shape_54.setTransform(-101.75,173.525);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgDgGQgCgGAAgHQgBgKAFgHQAFgHAHgDQAIgFALgCQAJgBAMAAIAPAAIAAgFIgCgIIgFgHQgDgDgFgCQgEgCgHAAIgIABIgJADIgGAEIgFAEIgMgMQAIgIALgEQAMgEAJAAQALAAAJADQAIADAGAFQAFAFADAGQACAGAAAHIAAA0IAAAKIABAJIgSAAIAAgQIgBAAQgGALgKAEQgJAEgKAAQgIAAgHgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAJAAQAIAAAFgDQAGgCADgFQAEgEACgGQABgFABgFIAAgHIgLAAIgPABg");
	this.shape_55.setTransform(-113.1,173.525);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AAbA0IgbhNIAAAAIgYBNIgWAAIgihnIAWAAIAXBNIABAAIAZhNIAUAAIAbBNIAAAAIAWhNIAVAAIghBng");
	this.shape_56.setTransform(-127,173.525);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_57.setTransform(-147.575,173.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_58.setTransform(-159.825,170.425);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgFgBgFIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAJIACAHQABADADACQADACAGAAIAHAAQAEAAADgDIAAASQgEACgFABIgJABQgMAAgGgDg");
	this.shape_59.setTransform(-170.525,172.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgNBUIAAhWIgXAAIAAgRIAXAAIAAgXQAAgVAIgLQAIgJATgBIAGAAIAIACIgCARIgFgBIgGgBQgFAAgDACQgEACgCADQgCADAAAFIgBAJIAAAYIAXAAIAAARIgXAAIAABWg");
	this.shape_60.setTransform(-183.9,170.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_61.setTransform(-194.05,173.525);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_62.setTransform(68.725,142.375);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_63.setTransform(57.875,142.375);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_64.setTransform(49.1,139.275);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgOAyQgKgDgHgIQgHgGgEgLQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgHAKgEQAKgDALAAQAMAAAKADQALAEAHAJIgPANQgFgFgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKADgMABQgLAAgKgFg");
	this.shape_65.setTransform(41.575,142.4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgpBOQgEAAgEgCIACgSQAHACAFAAQAFAAADgBQADgBACgDIAFgFIACgHIAHgRIgrhoIAWAAIAfBRIAAAAIAdhRIAWAAIgyB+IgFANIgGAJQgEAEgGACQgFADgJAAIgJgBg");
	this.shape_66.setTransform(30.35,145.025);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgOAyQgKgDgHgIQgHgGgEgLQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgHAKgEQAKgDALAAQAMAAAKADQALAEAHAJIgPANQgFgFgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKADgMABQgLAAgKgFg");
	this.shape_67.setTransform(19.975,142.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_68.setTransform(2.025,142.375);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgGIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAJIACAHQABADADADQADABAGAAIAHAAQAEAAADgCIAAASQgEABgFABIgJABQgMAAgGgDg");
	this.shape_69.setTransform(-8.675,141.05);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_70.setTransform(-18.375,142.375);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_71.setTransform(-27.15,139.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("Ag2BVIAAimIAUAAIAAAPIAAAAQAGgIAKgFQAKgEAKgBQAMABAKAEQAJAEAHAIQAHAHAEAKQAEAKAAALQAAAMgEAKQgEAJgHAIQgHAHgJAEQgKAEgMAAQgKAAgKgEQgKgGgGgIIAAAAIAABOgAgOg+QgGACgFAFQgEAFgDAHQgCAHAAAHQAAAJACAGQADAHAEAEQAFAEAGADQAGADAIgBQAHABAHgDQAGgDAEgEQAFgEACgHQADgGAAgJQAAgHgDgHQgCgHgFgFQgEgFgGgCQgHgDgHAAQgIAAgGADg");
	this.shape_72.setTransform(-36.275,145.35);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AA7A1IAAg4IgBgMQgBgFgCgFQgCgEgFgDQgEgCgIAAQgOAAgGAJQgGAIAAAPIAAA3IgTAAIAAg1IgBgOQAAgGgDgFQgCgEgEgDQgFgCgHAAQgFAAgFACQgFADgEADQgEAEgCAHQgCAGAAAJIAAA1IgUAAIAAhnIATAAIAAAQIAAAAIAEgFQACgDAFgDIAKgGQAGgCAGAAQAMAAAIAGQAHAEAFAKQAFgKAJgEQAKgGAJAAQAMAAAIAFQAIAEAEAGQAEAHACAHQACAJAAAJIAAA7g");
	this.shape_73.setTransform(-52.625,142.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_74.setTransform(-68.5,142.375);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgOAyQgKgDgHgIQgHgGgEgLQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgHAKgEQAKgDALAAQAMAAAKADQALAEAHAJIgPANQgFgFgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKADgMABQgLAAgKgFg");
	this.shape_75.setTransform(-79.925,142.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgNBUIAAhWIgWAAIAAgRIAWAAIAAgXQAAgVAIgLQAHgJAUgBIAGAAIAIACIgBARIgGgBIgGgBQgFAAgDACQgEACgCADQgCADAAAFIgBAJIAAAYIAXAAIAAARIgXAAIAABWg");
	this.shape_76.setTransform(-95.45,139.15);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgFgKQgEgKAAgMQAAgKAEgKQAFgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgDAGAAAHQAAAIADAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAHgDAEgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgEgFgHgCQgGgDgIAAQgHAAgGADg");
	this.shape_77.setTransform(-105.6,142.375);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgdA1IAAhnIAUAAIAAAQIAAAAQACgEAEgEIAGgFIAIgEIAKgCQAFABAEABIgBAWIgEgCIgGAAQgOAAgGAIQgJAIABAQIAAA0g");
	this.shape_78.setTransform(-121.9,142.25);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_79.setTransform(-132.525,142.375);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgSBQQgKgFgGgIIAAAAIAAAPIgUAAIAAimIAUAAIAABOIAAAAQAGgJAKgEQAKgFAKAAQAMAAAKAEQAJAEAHAIQAHAHAEAJQAEAKAAAMQAAALgEAKQgEALgHAHQgHAHgJAEQgKAFgMAAQgKgBgKgEgAgOgCQgGACgFAEQgEAFgDAGQgCAHAAAIQAAAIACAGQADAIAEAEQAFAEAGADQAGADAIAAQAHAAAHgDQAGgDAEgEQAFgEACgIQADgGAAgIQAAgIgDgHQgCgGgFgFQgEgEgGgCQgHgDgHAAQgIAAgGADg");
	this.shape_80.setTransform(-145.125,139.4);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AA7A1IAAg4IgBgMQgBgFgCgFQgCgEgFgDQgEgCgIAAQgOAAgGAJQgGAIAAAPIAAA3IgTAAIAAg1IgBgOQAAgGgDgFQgCgEgEgDQgFgCgHAAQgFAAgFACQgFADgEADQgEAEgCAHQgCAGAAAJIAAA1IgUAAIAAhnIATAAIAAAQIAAAAIAEgFQACgDAFgDIAKgGQAGgCAGAAQAMAAAIAGQAHAEAFAKQAFgKAJgEQAKgGAJAAQAMAAAIAFQAIAEAEAGQAEAHACAHQACAJAAAJIAAA7g");
	this.shape_81.setTransform(-161.475,142.25);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgWA0QgHgDgFgFQgFgFgDgHQgDgIAAgKIAAhCIATAAIAAA9QAAAGACAGQACAFAEADQADAEAEABIAJABQAFAAAGgBQAFgDAEgEQAEgEACgHQACgGAAgJIAAg1IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAEQgJAGgMAAQgHAAgHgCg");
	this.shape_82.setTransform(-176.975,142.5);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AApBOIhWh/IAAAAIAAB/IgWAAIAAibIAcAAIBVB/IAAAAIAAh/IAVAAIAACbg");
	this.shape_83.setTransform(-191.85,139.8);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgJBMQgFgEAAgGQAAgGAFgEQAEgFAFAAQAGAAAEAFQAEAEAAAGQAAAGgEAEQgEAFgGgBQgFABgEgFgAgKAjIAAgNIABgKIADgHIAFgFIAGgIIAHgGIAHgHIAEgIQACgEAAgFQAAgFgCgEIgFgIQgDgCgEgCQgEgCgFgBQgKABgHAGQgGAHgCALIgWgCQADgTANgLQANgLASAAQAJAAAJADQAIACAFAGQAHAFADAHQADAJAAAJQAAAIgCAHQgDAGgEAGIgNAMIgCACIgGAFIgDAGQgCACAAADIAAAIIAAAJg");
	this.shape_84.setTransform(86.225,84.5);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgGQgCgFgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIgBAHADQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_85.setTransform(74.425,87.05);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgFgKQgEgKABgMQgBgKAEgKQAFgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgDAGAAAHQAAAIADAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAHgDAEgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgEgFgHgCQgGgDgIAAQgHAAgGADg");
	this.shape_86.setTransform(61.8,87.175);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgFgFAAgGQAAgGAFgEQAEgEAFAAQAGAAAEAEQAFAEAAAGQAAAGgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_87.setTransform(52.6,84.6);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgGIAAgNIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADACAGAAIAHgBQAEgBADgBIAAASQgEACgFABIgJAAQgMAAgGgDg");
	this.shape_88.setTransform(45.375,85.85);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgFgKQgDgKAAgMQAAgKADgKQAFgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgEAFgDAHQgDAGABAHQgBAIADAHQADAHAEAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_89.setTransform(35.3,87.175);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AA7A2IAAg6IgBgLQgBgGgCgDQgCgFgFgDQgEgCgIAAQgOAAgGAJQgGAIAAAOIAAA5IgTAAIAAg2IgBgOQAAgGgDgEQgCgFgEgDQgFgCgHAAQgFAAgFACQgFACgEAFQgEAEgCAGQgCAHAAAIIAAA2IgUAAIAAhoIATAAIAAARIAAAAIAEgGQACgDAFgDIAKgFQAGgCAGAAQAMAAAIAEQAHAGAFAJQAFgJAJgGQAKgEAJAAQAMAAAIADQAIAFAEAGQAEAGACAIQACAJAAAJIAAA8g");
	this.shape_90.setTransform(19.375,87.05);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_91.setTransform(-1.125,87.175);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AgRAbIAPg1IAUAAIgSA1g");
	this.shape_92.setTransform(-7.225,79.525);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgGQgCgFgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIgBAHADQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_93.setTransform(-16.425,87.05);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgFgKQgDgKAAgMQAAgKADgKQAFgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgEAFgDAHQgDAGABAHQgBAIADAHQADAHAEAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_94.setTransform(-29.05,87.175);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgXBQQgJgDgHgIQgHgHgEgKQgEgKAAgMQAAgMAEgKQAEgJAHgHQAHgIAJgDQAKgFAMAAQAKAAAKAFQAKAFAGAHIAAhMIAUAAIAAClIgUAAIAAgPQgGAJgKAEQgKAFgKgBQgMAAgKgEgAgNgCQgGACgEAEQgFAEgCAIQgDAGAAAIQAAAIADAHQACAGAFAFQAEAEAGADQAHADAHAAQAIAAAGgDQAGgDAFgEQAEgFACgGQADgHAAgIQAAgIgDgGQgCgIgEgEQgFgEgGgCQgGgEgIAAQgHAAgHAEg");
	this.shape_95.setTransform(-42.575,84.2);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAARIABAAQACgFAEgEIAGgFIAJgEIAKgBQAEgBAEACIAAAVIgGgBIgEAAQgPAAgHAIQgHAIgBAQIAAA1g");
	this.shape_96.setTransform(-52.3,87.05);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgFgKQgEgKAAgMQAAgKAEgKQAFgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgDAGAAAHQAAAIADAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAHgDAEgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgEgFgHgCQgGgDgIAAQgHAAgGADg");
	this.shape_97.setTransform(-63.3,87.175);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AgWBLQgPgGgMgMQgKgLgFgPQgGgPAAgQQAAgRAGgOQAGgPALgLQAKgLAPgHQAPgGARAAQAVAAAOAFQAOAGAJAJIgPAQQgKgJgKgEQgLgDgMAAQgMAAgMAFQgKAFgIAIQgHAIgFAMQgDALAAAMQgBANAFALQAFAMAHAIQAIAJAMAEQAKAFAMAAQAMAAAKgCQAKgCAHgEIAAgsIgiAAIAAgSIA3AAIAABLIgNAHIgPAEQgHACgJABIgPABQgTAAgPgHg");
	this.shape_98.setTransform(-78.8,84.625);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgoBOQgFAAgEgCIACgSQAHACAFAAQAFAAADgBQADgBACgDIAEgFIAEgHIAGgRIgrhoIAWAAIAfBRIAAAAIAdhRIAVAAIgxB+IgFANIgGAJQgEAEgGACQgGADgHAAIgJgBg");
	this.shape_99.setTransform(-98.55,89.825);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AgSBQQgKgEgGgJIAAAAIAAAPIgUAAIAAilIAUAAIAABMIAAAAQAGgHAKgFQAKgFAKAAQAMAAAKAFQAJADAHAIQAHAHAEAJQAEAKAAAMQAAAMgEAKQgEAKgHAHQgHAIgJADQgKAEgMAAQgKABgKgFgAgOgCQgGACgFAEQgEAEgDAIQgCAGAAAIQAAAIACAHQADAGAEAFQAFAEAGADQAGADAIAAQAHAAAHgDQAGgDAEgEQAFgFACgGQADgHAAgIQAAgIgDgGQgCgIgFgEQgEgEgGgCQgHgEgHAAQgIAAgGAEg");
	this.shape_100.setTransform(-110.525,84.2);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AgXBQQgJgDgHgIQgHgHgEgKQgEgKAAgMQAAgMAEgKQAEgJAHgHQAHgIAJgDQAKgFAMAAQAKAAAKAFQAKAFAGAHIAAhMIAUAAIAAClIgUAAIAAgPQgGAJgKAEQgKAFgKgBQgMAAgKgEgAgNgCQgGACgEAEQgFAEgCAIQgDAGAAAIQAAAIADAHQACAGAFAFQAEAEAGADQAHADAHAAQAIAAAGgDQAGgDAFgEQAEgFACgGQADgHAAgIQAAgIgDgGQgCgIgEgEQgFgEgGgCQgGgEgIAAQgHAAgHAEg");
	this.shape_101.setTransform(-130.575,84.2);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgGQgCgFgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIgBAHADQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_102.setTransform(-143.175,87.05);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_103.setTransform(-155.8,87.175);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgOAyQgKgEgHgGQgHgIgEgJQgEgLAAgMQAAgLAEgKQAEgKAHgIQAHgHAKgDQAKgFALAAQAMAAAKAFQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGACgEAGQgEAFgCAHQgCAGAAAHQAAAHACAHQADAGAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKADgMAAQgLAAgKgEg");
	this.shape_104.setTransform(-167.225,87.2);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_105.setTransform(-179.075,87.175);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_106.setTransform(-190.225,87.175);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AAKBOIAAiDIgbAbIgNgPIAqgkIATAAIAACbg");
	this.shape_107.setTransform(390.9,53.45);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgGQgCgFgDgDQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIAAAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_108.setTransform(373.725,55.9);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AgJBOIAAhoIATAAIAABogAgKg1QgDgEAAgGQAAgFADgFQAFgEAFAAQAGAAAEAEQAEAFAAAFQAAAGgEAEQgEAFgGAAQgFAAgFgFg");
	this.shape_109.setTransform(364.95,53.45);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AgXBRQgJgEgHgIQgHgIgEgJQgEgKAAgMQAAgMAEgKQAEgJAHgHQAHgHAJgEQAKgFAMAAQAKAAAKAFQAKAFAGAHIAAhMIAUAAIAAClIgUAAIAAgPQgGAJgKAEQgKAFgKgBQgMAAgKgDgAgNgCQgGACgEAEQgFAEgCAIQgDAGAAAIQAAAIADAHQACAGAFAFQAEAFAGACQAHADAHAAQAIAAAGgDQAGgCAFgFQAEgFACgGQADgHAAgIQAAgIgDgGQgCgIgEgEQgFgEgGgCQgGgEgIAAQgHAAgHAEg");
	this.shape_110.setTransform(349.225,53.05);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_111.setTransform(336.625,56.025);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#000000").s().p("AgOAzQgKgEgHgHQgHgHgEgKQgEgLAAgMQAAgLAEgKQAEgKAHgHQAHgIAKgDQAKgFALAAQAMAAAKAFQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAGAAAHQAAAHACAHQADAGAEAFQAEAFAHACQAFADAHAAQAJAAAGgDQAGgDAFgFIAOAOQgIAIgKAEQgKAEgMgBQgLAAgKgDg");
	this.shape_112.setTransform(325.625,56.05);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AgWAzQgHgCgFgFQgFgFgDgHQgDgIAAgKIAAhDIATAAIAAA9QAAAIACAFQACAFAEADQADAEAEABIAJABQAFAAAGgCQAFgCAEgEQAEgEACgHQACgHAAgJIAAg1IAUAAIAABoIgUAAIAAgQIAAAAQgEAIgJAGQgJAEgMAAQgHAAgHgCg");
	this.shape_113.setTransform(313.775,56.15);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AgXBRQgJgEgHgIQgHgIgEgJQgEgKAAgMQAAgMAEgKQAEgJAHgHQAHgHAJgEQAKgFAMAAQAKAAAKAFQAKAFAGAHIAAhMIAUAAIAAClIgUAAIAAgPQgGAJgKAEQgKAFgKgBQgMAAgKgDgAgNgCQgGACgEAEQgFAEgCAIQgDAGAAAIQAAAIADAHQACAGAFAFQAEAFAGACQAHADAHAAQAIAAAGgDQAGgCAFgFQAEgFACgGQADgHAAgIQAAgIgDgGQgCgIgEgEQgFgEgGgCQgGgEgIAAQgHAAgHAEg");
	this.shape_114.setTransform(300.675,53.05);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgFgKQgDgKgBgMQABgKADgKQAFgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgDAGAAAHQAAAIADAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAHgDAEgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgEgFgHgCQgGgDgIAAQgHAAgGADg");
	this.shape_115.setTransform(287.7,56.025);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAARIABAAQACgFAEgDIAGgGIAJgEIAKgBQAEAAAEABIAAAVIgFgBIgGAAQgOAAgHAIQgIAIAAAQIAAA1g");
	this.shape_116.setTransform(277.9,55.9);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#000000").s().p("Ag2BUIAAilIAUAAIAAAPIAAAAQAGgIAKgFQAKgFAKABQAMgBAKAFQAJAEAHAHQAHAIAEAKQAEAKAAAMQAAALgEAKQgEAJgHAHQgHAIgJAEQgKAEgMAAQgKAAgKgFQgKgFgGgHIAAAAIAABMgAgOg+QgGADgFAFQgEAEgDAHQgCAGAAAJQAAAHACAHQADAHAEAFQAFADAGADQAGACAIABQAHgBAHgCQAGgDAEgDQAFgFACgHQADgHAAgHQAAgJgDgGQgCgHgFgEQgEgFgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_117.setTransform(266.925,59);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_118.setTransform(247.725,56.025);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#000000").s().p("AgdA2IAAhoIAUAAIAAARIAAAAQACgFADgDIAHgGIAIgEIAKgBQAFAAAEABIgBAVIgEgBIgFAAQgPAAgGAIQgIAIAAAQIAAA1g");
	this.shape_119.setTransform(238.35,55.9);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_120.setTransform(227.725,56.025);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("AAcA0IgchNIAAAAIgZBNIgVAAIgihnIAWAAIAXBNIABAAIAZhNIAUAAIAaBNIABAAIAWhNIAVAAIgiBng");
	this.shape_121.setTransform(213.25,56.025);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_122.setTransform(192.675,56.025);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("AgJA0IgrhnIAYAAIAdBPIAfhPIAVAAIgqBng");
	this.shape_123.setTransform(181.05,56.025);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgDgGQgDgGAAgHQABgKAEgHQAFgHAHgDQAIgFALgCQAJgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgFgCQgEgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQAMAAAIADQAJADAFAFQAFAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgLAAQgIAAgHgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQABgFAAgFIAAgHIgKAAIgPABg");
	this.shape_124.setTransform(169.7,56.025);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AAcA0IgchNIAAAAIgYBNIgWAAIgihnIAWAAIAYBNIAAAAIAZhNIAUAAIAbBNIAAAAIAWhNIAVAAIghBng");
	this.shape_125.setTransform(155.8,56.025);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_126.setTransform(135.225,56.025);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_127.setTransform(122.975,52.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgGIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABADADADQADACAGAAIAHgBQAEAAADgDIAAASQgEADgFABIgJAAQgMAAgGgDg");
	this.shape_128.setTransform(112.275,54.7);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AgNBVIAAhWIgXAAIAAgSIAXAAIAAgXQAAgVAIgKQAIgLATABIAHAAIAHABIgCASIgFgCIgGAAQgGAAgDACQgDABgCADQgCADgBAEIAAAKIAAAYIAYAAIAAASIgYAAIAABWg");
	this.shape_129.setTransform(98.9,52.8);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgEgKgBgMQABgKAEgKQAEgKAHgIQAIgHAKgEQAKgFALAAQALAAALAFQAKAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgKAFQgLAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgEAFgDAHQgDAGABAHQgBAIADAHQADAHAEAEQAEAFAGADQAHACAHAAQAIAAAGgCQAHgDAEgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgEgFgHgCQgGgDgIAAQgHAAgHADg");
	this.shape_130.setTransform(88.75,56.025);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_131.setTransform(71.075,56.025);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_132.setTransform(60.225,56.025);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_133.setTransform(51.45,52.925);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#000000").s().p("AgOAzQgKgEgHgHQgHgHgEgKQgEgLAAgMQAAgLAEgKQAEgKAHgHQAHgIAKgDQAKgFALAAQAMAAAKAFQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAGAAAHQAAAHACAHQADAGAEAFQAEAFAHACQAFADAHAAQAJAAAGgDQAGgDAFgFIAOAOQgIAIgKAEQgKAEgMgBQgLAAgKgDg");
	this.shape_134.setTransform(43.925,56.05);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#000000").s().p("AgpBOQgEAAgEgCIADgSQAGACAFAAQAFAAADgBQADgBACgDIAFgFIACgHIAHgRIgshoIAYAAIAdBRIABAAIAdhRIAWAAIgyB+IgEANIgHAJQgEAEgGACQgFADgJAAIgJgBg");
	this.shape_135.setTransform(32.7,58.675);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#000000").s().p("AgOAzQgKgEgHgHQgHgHgEgKQgEgLAAgMQAAgLAEgKQAEgKAHgHQAHgIAKgDQAKgFALAAQAMAAAKAFQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAGAAAHQAAAHACAHQADAGAEAFQAEAFAHACQAFADAHAAQAJAAAGgDQAGgDAFgFIAOAOQgIAIgKAEQgKAEgMgBQgLAAgKgDg");
	this.shape_136.setTransform(22.325,56.05);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_137.setTransform(4.375,56.025);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgGIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABADADADQADACAGAAIAHgBQAEAAADgDIAAASQgEADgFABIgJAAQgMAAgGgDg");
	this.shape_138.setTransform(-6.325,54.7);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_139.setTransform(-16.025,56.025);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_140.setTransform(-24.8,52.925);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("Ag2BUIAAilIAUAAIAAAPIAAAAQAGgIAKgFQAKgFAKABQAMgBAKAFQAJAEAHAHQAHAIAEAKQAEAKAAAMQAAALgEAKQgEAJgHAHQgHAIgJAEQgKAEgMAAQgKAAgKgFQgKgFgGgHIAAAAIAABMgAgOg+QgGADgFAFQgEAEgDAHQgCAGAAAJQAAAHACAHQADAHAEAFQAFADAGADQAGACAIABQAHgBAHgCQAGgDAEgDQAFgFACgHQADgHAAgHQAAgJgDgGQgCgHgFgEQgEgFgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_141.setTransform(-33.925,59);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AA7A2IAAg6IgBgLQgBgFgCgEQgCgFgFgDQgEgCgIAAQgOAAgGAJQgGAJAAANIAAA5IgTAAIAAg2IgBgNQAAgHgDgEQgCgFgEgDQgFgCgHAAQgFAAgFACQgFADgEAEQgEAEgCAGQgCAHAAAIIAAA2IgUAAIAAhoIATAAIAAARIAAAAIAEgGQACgEAFgCIAKgFQAGgCAGAAQAMAAAIAEQAHAGAFAJQAFgJAJgGQAKgEAJAAQAMAAAIADQAIAEAEAHQAEAGACAJQACAIAAAJIAAA8g");
	this.shape_142.setTransform(-50.275,55.9);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQALAAALAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgLAEgLAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_143.setTransform(-66.15,56.025);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#000000").s().p("AgOAzQgKgEgHgHQgHgHgEgKQgEgLAAgMQAAgLAEgKQAEgKAHgHQAHgIAKgDQAKgFALAAQAMAAAKAFQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAGAAAHQAAAHACAHQADAGAEAFQAEAFAHACQAFADAHAAQAJAAAGgDQAGgDAFgFIAOAOQgIAIgKAEQgKAEgMgBQgLAAgKgDg");
	this.shape_144.setTransform(-77.575,56.05);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("AgpBOQgEAAgEgCIADgSQAFACAGAAQAFAAADgBQADgBADgDIADgFIADgHIAHgRIgshoIAYAAIAdBRIABAAIAehRIAVAAIgyB+IgEANIgHAJQgEAEgGACQgFADgJAAIgJgBg");
	this.shape_145.setTransform(-94.9,58.675);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgGQgCgFgDgDQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIAAAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_146.setTransform(-106.525,55.9);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgDgGQgCgGAAgHQgBgKAFgHQAFgHAHgDQAIgFALgCQAJgBAMAAIAPAAIAAgFIgCgIIgFgHQgDgDgFgCQgEgCgHAAIgIABIgJADIgGAEIgFAEIgMgMQAIgIALgEQAMgEAJAAQALAAAJADQAIADAGAFQAFAFADAGQACAGAAAHIAAA0IAAAKIABAJIgSAAIAAgQIgBAAQgGALgKAEQgJAEgKAAQgIAAgHgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAJAAQAIAAAFgDQAGgCADgFQAEgEACgGQABgFABgFIAAgHIgLAAIgPABg");
	this.shape_147.setTransform(-118.5,56.025);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AA7A2IAAg6IgBgLQgBgFgCgEQgCgFgFgDQgEgCgIAAQgOAAgGAJQgGAJAAANIAAA5IgTAAIAAg2IgBgNQAAgHgDgEQgCgFgEgDQgFgCgHAAQgFAAgFACQgFADgEAEQgEAEgCAGQgCAHAAAIIAAA2IgUAAIAAhoIATAAIAAARIAAAAIAEgGQACgEAFgCIAKgFQAGgCAGAAQAMAAAIAEQAHAGAFAJQAFgJAJgGQAKgEAJAAQAMAAAIADQAIAEAEAHQAEAGACAJQACAIAAAJIAAA8g");
	this.shape_148.setTransform(-133.425,55.9);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("AAbA0IgbhNIAAAAIgZBNIgVAAIgihnIAWAAIAXBNIABAAIAZhNIAUAAIAaBNIABAAIAWhNIAVAAIghBng");
	this.shape_149.setTransform(-157.25,56.025);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgFAFgCAHQgDAGAAAHQAAAIADAHQACAHAFAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_150.setTransform(-172.1,56.025);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#000000").s().p("AAoBOIAAhIIhQAAIAABIIgVAAIAAibIAVAAIAABBIBQAAIAAhBIAWAAIAACbg");
	this.shape_151.setTransform(-186.8,53.45);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#000000").s().p("AhaAoIAAgbIC1AAIAAAbgAhagNIAAgaIC1AAIAAAag");
	this.shape_152.setTransform(59.325,171.4);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#74492A").ss(4,1,1).p("EgxmgRDMBjNAAAQCrAAAACrIAAcwQAACrirAAMhjNAAAQirAAAAirIAA8wQAAirCrAAg");
	this.shape_153.setTransform(118.5809,131.95,1.0059,1);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFCC66").s().p("EgxmARDQirAAAAirIAA8vQAAisCrABMBjNAAAQCrgBAACsIAAcvQAACrirAAg");
	this.shape_154.setTransform(118.5809,131.95,1.0059,1);

	this.right_mc = new lib.right_mc();
	this.right_mc.name = "right_mc";
	this.right_mc.parent = this;
	this.right_mc.setTransform(299.1,171.9,0.6862,0.6862,0,0,0,30,29.8);

	this.instance_2 = new lib.tryagain_mc();
	this.instance_2.parent = this;
	this.instance_2.setTransform(298.8,203.45,1,1,0,0,0,63.1,44);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#000000").s().p("AgJAKQgEgEAAgGQAAgFAEgEQAEgFAFAAQAGAAAFAFQADAEAAAFQAAAGgDAEQgFAFgGgBQgFABgEgFg");
	this.shape_155.setTransform(279.55,189.75);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#000000").s().p("AgVBaIAMgWQAFgLAEgKQACgLABgLQADgMAAgNQgBgXgFgXQgIgXgNgTIANgIQANAUAJAZQAJAZAAAaQgBAagHAYQgJAagOAWg");
	this.shape_156.setTransform(273.2,184.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("AgqA0IAAgSIA6hEIg4AAIAAgRIBQAAIAAASIg6BEIA9AAIAAARg");
	this.shape_157.setTransform(265.275,185.825);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("AApBOIAAhIIhQAAIAABIIgWAAIAAibIAWAAIAABBIBQAAIAAhBIAVAAIAACbg");
	this.shape_158.setTransform(252.05,183.25);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#000000").s().p("AgNA0QgJgZAAgbQAAgZAIgZQAJgZAOgVIAOAIIgNAVQgFALgDALQgDAKgCALQgCAMAAAMQAAAYAHAXQAHAWAOAUIgOAJQgOgVgIgZg");
	this.shape_159.setTransform(241.125,184.8);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("AgqA0IAAgSIA6hEIg4AAIAAgRIBQAAIAAASIg6BEIA9AAIAAARg");
	this.shape_160.setTransform(226.575,185.825);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgFIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADABAGAAIAHAAQAEgBADgBIAAASQgEACgFABIgJAAQgMAAgGgDg");
	this.shape_161.setTransform(216.925,184.5);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAARIABAAQACgFAEgEIAGgFIAJgEQAFgCAFABQAEgBAEACIAAAVIgGgBIgEAAQgPAAgHAIQgHAIgBAQIAAA1g");
	this.shape_162.setTransform(209.7,185.7);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#000000").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgFgFAAgFQAAgHAFgEQAEgEAFAAQAGAAAEAEQAFAEgBAHQABAFgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_163.setTransform(162.2,183.25);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#000000").s().p("AgoBOQgFAAgEgCIACgSQAGACAGAAQAFAAADgBQADgBADgDIADgFIAEgHIAGgRIgrhoIAWAAIAfBRIAAAAIAehRIAUAAIgxB+IgFANIgGAJQgEAEgGACQgGADgHAAIgJgBg");
	this.shape_164.setTransform(147.95,188.475);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("AgOAyQgKgEgHgGQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgGAKgEQAKgEALgBQAMABAKAEQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLgBgKgEg");
	this.shape_165.setTransform(137.575,185.85);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgFQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAFQgEADgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgFALAAQAIgBAHADQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_166.setTransform(125.725,185.7);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#000000").s().p("AgWAzQgHgCgFgFQgFgFgDgHQgDgIAAgKIAAhCIATAAIAAA9QAAAGACAGQACAFAEADQADAEAEABIAJABQAFAAAGgCQAFgCAEgEQAEgFACgGQACgHAAgIIAAg1IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAFQgJAEgMABQgHgBgHgCg");
	this.shape_167.setTransform(101.225,185.95);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("AAjBOIAAhBQgGAIgKAGQgKAEgKAAQgMAAgKgEQgJgEgHgIQgHgHgEgJQgEgKAAgMQAAgLAEgKQAEgKAHgHQAHgIAJgEQAKgEAMAAQAKAAAKAEQAKAFAGAIIAAgPIAUAAIAACZgAgNg4QgGADgEAEQgFAFgCAHQgDAGAAAIQAAAJADAGQACAHAFAEQAEAEAGADQAHACAHAAQAIAAAGgCQAGgDAFgEQAEgEACgHQADgGAAgJQAAgIgDgGQgCgHgEgFQgFgEgGgDQgGgDgIAAQgHAAgHADg");
	this.shape_168.setTransform(88.125,188.2);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAARIABAAQACgFADgEIAHgFIAJgEQAFgCAFABQAEgBAEACIAAAVIgGgBIgEAAQgPAAgHAIQgHAIgBAQIAAA1g");
	this.shape_169.setTransform(66.15,185.7);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#000000").s().p("AgNBVIAAhXIgXAAIAAgRIAXAAIAAgXQAAgVAIgLQAIgKATAAIAHAAIAHACIgCARIgFgBIgGAAQgGAAgDABQgDACgCADQgCADgBAEIAAAKIAAAYIAYAAIAAARIgYAAIAABXg");
	this.shape_170.setTransform(57.95,182.6);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#000000").s().p("AgNBVIAAhXIgWAAIAAgRIAWAAIAAgXQAAgVAIgLQAHgKAUAAIAGAAIAIACIgBARIgGgBIgGAAQgFAAgDABQgEACgCADQgCADAAAEIgBAKIAAAYIAXAAIAAARIgXAAIAABXg");
	this.shape_171.setTransform(44.5,182.6);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgFIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADABAGAAIAHAAQAEgBADgBIAAASQgEACgFABIgJAAQgMAAgGgDg");
	this.shape_172.setTransform(17.125,184.5);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#000000").s().p("AgJBOIAAhnIATAAIAABngAgKg0QgEgFAAgFQAAgHAEgEQAFgEAFAAQAGAAAEAEQAFAEgBAHQABAFgFAFQgEAEgGAAQgFAAgFgEg");
	this.shape_173.setTransform(10.9,183.25);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgFQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAFQgEADgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgFALAAQAIgBAHADQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_174.setTransform(2.125,185.7);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#000000").s().p("AgWAzQgHgCgFgFQgFgFgDgHQgDgIAAgKIAAhCIATAAIAAA9QAAAGACAGQACAFAEADQADAEAEABIAJABQAFAAAGgCQAFgCAEgEQAEgFACgGQACgHAAgIIAAg1IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAFQgJAEgMABQgHgBgHgCg");
	this.shape_175.setTransform(-10.125,185.95);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#000000").s().p("AgKBOIAAiHIgyAAIAAgUIB5AAIAAAUIgzAAIAACHg");
	this.shape_176.setTransform(-53.175,183.25);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#000000").s().p("AgHATIgHgFIgEgGIgBgIIABgHIAEgHIAHgEIAHgBIAIABQAEACACACIAFAHIABAHIgBAIIgFAGIgGAFIgIABIgHgBg");
	this.shape_177.setTransform(416.425,158.025);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#000000").s().p("AgaBRQgKgEgHgIQgGgHgEgKQgEgLAAgMQAAgLADgKQAEgJAGgIQAGgIAJgFQAJgEAMgBQAJAAAJADQAJAEAGAIIAAAAIAAhHIAhAAIAAClIgeAAIAAgOIgBAAIgFAFIgHAGIgKAEIgJABQgMAAgKgDgAgRAJQgHAHAAAMQAAAMAHAIQAHAHALAAQANAAAHgHQAHgIAAgMQAAgMgHgHQgHgIgNAAQgLAAgHAIg");
	this.shape_178.setTransform(405.875,151.7);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#000000").s().p("AATA3IAAg1IAAgIIgDgJQgBgEgEgDQgDgDgGAAQgGAAgEADQgEACgCAEQgCAEAAAEIgBAKIAAA1IghAAIAAhqIAfAAIAAAOIABAAIAEgGIAHgFIAIgEQAFgCAGAAQANAAAHAEQAIAEAEAHQAEAHACAJQABAJAAALIAAA6g");
	this.shape_179.setTransform(392.95,154.425);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgHgFgLQgEgKAAgNQAAgMAEgKQAFgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAEAKABAMQgBANgEAKQgFALgIAHQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgSQgIAHAAALQAAAMAIAIQAHAHALAAQANAAAGgHQAIgIgBgMQABgLgIgHQgGgIgNAAQgLAAgHAIg");
	this.shape_180.setTransform(379.95,154.55);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgDgEgDQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgBADgEIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_181.setTransform(368.375,154.55);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_182.setTransform(356.325,154.55);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#000000").s().p("AgZA1QgMgDgHgJIAUgVQAEAFAGADQAFADAHAAQAGAAAEgCQAEgBAAgFQAAgEgDgCIgKgEIgNgCQgIgCgFgEQgHgDgEgFQgEgGAAgKQAAgJAEgHQAEgHAGgFQAGgEAIgCQAJgCAHAAQAKAAALADQALADAHAIIgUAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAAEAEACIAJADIAOADQAHABAGAEQAGAEAEAEQAFAHAAAKQgBAKgEAHQgFAGgGAFQgIAEgJACIgQABQgLAAgLgDg");
	this.shape_183.setTransform(344.9,154.55);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_184.setTransform(329.275,154.425);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_185.setTransform(318.025,154.55);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#000000").s().p("Ag5BQIAAicIAeAAIAAAOIABAAIAFgGIAHgFIAKgEQAEgCAGAAQALAAAKAEQAKAEAHAIQAHAHADAKQAEAKAAAMQAAAMgDAKQgEAJgGAIQgGAIgJAFQgJAEgMAAQgJAAgJgDQgJgDgGgIIAAAAIAAA+gAgUgqQgHAHAAAMQAAANAHAHQAHAGANAAQALAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_186.setTransform(305.125,156.925);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#000000").s().p("AADBFQgGgCgGgDQgEgFgEgFQgCgHAAgIIAAgzIgWAAIAAgaIAWAAIAAgfIAfAAIAAAfIAeAAIAAAaIgeAAIAAAjIABAIIACAHQABACADABQADACAGAAIAHgBQAFAAACgCIAAAbQgGACgGABIgMAAQgIAAgHgBg");
	this.shape_187.setTransform(286.7,153.1);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#000000").s().p("AATA3IAAg1IAAgIIgCgJQgDgEgDgDQgDgDgGAAQgGAAgEADQgEACgCAEQgCAEAAAEIgBAKIAAA1IgiAAIAAhqIAhAAIAAAOIAAAAIAEgGIAHgFIAIgEQAFgCAGAAQAMAAAIAEQAIAEAEAHQAEAHACAJQABAJAAALIAAA6g");
	this.shape_188.setTransform(276.05,154.425);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#000000").s().p("AgQBQIAAhqIAhAAIAABqgAgMguQgGgGAAgIQAAgIAGgFQAFgGAHAAQAIAAAGAGQAFAFAAAIQAAAIgFAGQgGAFgIAAQgHAAgFgFg");
	this.shape_189.setTransform(266.9,151.925);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgHgEgLQgFgKgBgNQABgMAFgKQAEgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAFAKAAAMQAAANgFAKQgFALgIAHQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgSQgIAHAAALQAAAMAIAIQAHAHALAAQANAAAGgHQAIgIAAgMQAAgLgIgHQgGgIgNAAQgLAAgHAIg");
	this.shape_190.setTransform(257.35,154.55);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#000000").s().p("Ag5BQIAAicIAeAAIAAAOIABAAIAFgGIAHgFIAKgEQAEgCAGAAQALAAAKAEQAKAEAHAIQAHAHADAKQAEAKAAAMQAAAMgDAKQgEAJgGAIQgGAIgJAFQgJAEgMAAQgJAAgJgDQgJgDgGgIIAAAAIAAA+gAgUgqQgHAHAAAMQAAANAHAHQAHAGANAAQALAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_191.setTransform(244.075,156.925);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgFgDgFQgDgHAAgIQAAgJADgGQADgHAGgDQAGgEAIgCQAHgDAIgBIAPgCIAPAAQAAgJgGgEQgHgGgIAAQgHABgHADQgHADgFAGIgSgSQAKgIAMgFQAMgEANAAQAOAAAJAEQAKADAFAHQAGAHACAKQACALAAANIAAA2IgeAAIAAgOQgGAIgJAFQgIADgKAAQgIAAgHgCgAADAHIgJACQgFABgEADQgEADAAAGQAAAGAFADQAFACAGAAIAIgBIAIgDQAEgDACgEQACgDAAgFIAAgIIgIAAIgKABg");
	this.shape_192.setTransform(224.275,154.55);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#000000").s().p("AgfBOQgOgDgLgJIASgcQAIAHAIADQAIAEALAAQAOAAAHgHQAHgIAAgLIAAgLIAAAAQgGAIgIADQgJAEgGAAQgMAAgKgFQgKgEgHgHQgGgHgEgJQgEgLAAgMQAAgKADgKQAEgLAGgHQAGgIAJgFQAJgEAMAAQAHAAAFABIAKAEIAIAGIAFAFIABAAIAAgOIAeAAIAABhQAAAfgPAPQgQAQgeAAQgOAAgOgDgAgIgxIgIAGQgEADgCAFQgCAFAAAFQAAAFACAFQACAFAEADQADAEAFACQAFACAEAAQAGAAAFgCQAFgCADgEQAEgDACgFQACgFAAgFQAAgFgCgFQgCgFgEgDQgDgEgFgCQgFgCgGAAQgEAAgFACg");
	this.shape_193.setTransform(204.725,157.075);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#000000").s().p("AATA3IAAg1IAAgIIgDgJQgBgEgEgDQgDgDgGAAQgGAAgEADQgEACgCAEQgCAEAAAEIgBAKIAAA1IghAAIAAhqIAfAAIAAAOIABAAIAEgGIAHgFIAIgEQAFgCAGAAQANAAAHAEQAIAEAEAHQAEAHACAJQABAJAAALIAAA6g");
	this.shape_194.setTransform(191.8,154.425);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#000000").s().p("AgQBQIAAhqIAhAAIAABqgAgNguQgFgGAAgIQAAgIAFgFQAGgGAHAAQAIAAAFAGQAGAFAAAIQAAAIgGAGQgFAFgIAAQgHAAgGgFg");
	this.shape_195.setTransform(182.65,151.925);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#000000").s().p("AgZA1QgMgDgHgJIAUgVQAEAFAGADQAFADAHAAQAGAAAEgCQAEgBAAgFQABgEgEgCIgKgEIgNgCQgHgCgHgEQgGgDgEgFQgEgGAAgKQAAgJAEgHQADgHAHgFQAGgEAJgCQAIgCAHAAQAKAAALADQALADAHAIIgUAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAAEAEACIAJADIAOADQAHABAGAEQAGAEAEAEQAFAHAAAKQAAAKgFAHQgFAGgGAFQgIAEgJACIgQABQgLAAgLgDg");
	this.shape_196.setTransform(174.7,154.55);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#000000").s().p("AgaA1QgLgDgIgJIAUgVQAFAFAGADQAFADAHAAQAFAAAFgCQAFgBAAgFQAAgEgFgCIgJgEIgNgCQgHgCgHgEQgGgDgEgFQgEgGAAgKQAAgJAEgHQAEgHAGgFQAGgEAJgCQAHgCAIAAQALAAAKADQALADAIAIIgVAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAAEAEACIAKADIANADQAHABAGAEQAHAEAEAEQADAHAAAKQABAKgFAHQgFAGgGAFQgIAEgIACIgQABQgMAAgMgDg");
	this.shape_197.setTransform(164.5,154.55);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgFgDgFQgDgHAAgIQAAgJADgGQADgHAGgDQAGgEAIgCQAHgDAIgBIAPgCIAPAAQAAgJgGgEQgHgGgIAAQgHABgHADQgHADgFAGIgSgSQAKgIAMgFQAMgEANAAQAOAAAJAEQAKADAFAHQAGAHACAKQACALAAANIAAA2IgeAAIAAgOQgGAIgJAFQgIADgKAAQgIAAgHgCgAADAHIgJACQgFABgEADQgEADAAAGQAAAGAFADQAFACAGAAIAIgBIAIgDQAEgDACgEQACgDAAgFIAAgIIgIAAIgKABg");
	this.shape_198.setTransform(153.375,154.55);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#000000").s().p("Ag5BQIAAicIAeAAIAAAOIABAAIAFgGIAHgFIAKgEQAEgCAGAAQALAAAKAEQAKAEAHAIQAHAHADAKQAEAKAAAMQAAAMgDAKQgEAJgGAIQgGAIgJAFQgJAEgMAAQgJAAgJgDQgJgDgGgIIAAAAIAAA+gAgUgqQgHAHAAAMQAAANAHAHQAHAGANAAQALAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_199.setTransform(141.025,156.925);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_200.setTransform(120.925,154.55);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#000000").s().p("AgQA2IgshqIAkAAIAaBHIAAAAIAZhHIAiAAIgrBqg");
	this.shape_201.setTransform(108.475,154.55);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgFgDgFQgDgHAAgIQAAgJADgGQADgHAGgDQAGgEAIgCQAHgDAIgBIAPgCIAPAAQAAgJgGgEQgHgGgIAAQgHABgHADQgHADgFAGIgSgSQAKgIAMgFQAMgEANAAQAOAAAJAEQAKADAFAHQAGAHACAKQACALAAANIAAA2IgeAAIAAgOQgGAIgJAFQgIADgKAAQgIAAgHgCgAADAHIgJACQgFABgEADQgEADAAAGQAAAGAFADQAFACAGAAIAIgBIAIgDQAEgDACgEQACgDAAgFIAAgIIgIAAIgKABg");
	this.shape_202.setTransform(96.325,154.55);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#000000").s().p("AAWA2IgWhGIAAAAIgTBGIgiAAIgnhqIAjAAIAWBCIABAAIAShCIAjAAIAUBCIAAAAIAUhCIAiAAIgmBqg");
	this.shape_203.setTransform(81.375,154.55);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_204.setTransform(59.375,154.55);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#000000").s().p("AASBTIAAg0IAAgKIgCgJQgCgEgDgDQgDgCgGAAQgGAAgEACQgEACgCAEQgCAEgBAFIgBAKIAAA1IggAAIAAilIAgAAIAABKIABAAQABgDADgDIAGgGIAIgEQAFgBAGAAQAMAAAJAEQAHADAEAHQAEAHACAIQACAKgBAKIAAA7g");
	this.shape_205.setTransform(46.7,151.575);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#000000").s().p("AADBFQgGgCgFgDQgGgFgCgFQgDgHgBgIIAAgzIgVAAIAAgaIAVAAIAAgfIAgAAIAAAfIAdAAIAAAaIgdAAIAAAjIABAIIACAHQACACADABQADACAFAAIAHgBQAEAAACgCIAAAbQgFACgGABIgLAAQgJAAgHgBg");
	this.shape_206.setTransform(35.75,153.1);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#000000").s().p("AgTBVIAAhRIgVAAIAAgZIAVAAIAAgTQAAgJACgIQABgIAFgGQAEgFAHgEQAJgDANAAIAKAAIAJABIgBAcIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABRg");
	this.shape_207.setTransform(21.075,151.45);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgHgEgLQgGgKAAgNQAAgMAGgKQAEgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAFAKgBAMQABANgFAKQgFALgIAHQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgSQgIAHABALQgBAMAIAIQAGAHAMAAQAMAAAIgHQAGgIABgMQgBgLgGgHQgIgIgMAAQgMAAgGAIg");
	this.shape_208.setTransform(10.1,154.55);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#000000").s().p("AgaA1QgLgDgIgJIAVgVQAEAFAGADQAFADAHAAQAFAAAFgCQAEgBABgFQAAgEgFgCIgJgEIgNgCQgHgCgHgEQgGgDgEgFQgEgGAAgKQAAgJAEgHQADgHAHgFQAGgEAJgCQAHgCAIAAQALAAAKADQALADAHAIIgUAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAAEAEACIAKADIANADQAHABAGAEQAHAEADAEQAEAHAAAKQABAKgFAHQgFAGgGAFQgHAEgJACIgRABQgLAAgMgDg");
	this.shape_209.setTransform(-8.2,154.55);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_210.setTransform(-19.625,154.55);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#000000").s().p("AgPBTIAAilIAfAAIAAClg");
	this.shape_211.setTransform(-28.8,151.575);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgDgEgDQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgBADgEIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_212.setTransform(-36.525,154.55);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#000000").s().p("Ag5BMIAFgbQAHADAIAAIAJgBIAGgEIAEgFIADgIIACgGIgvhrIAkAAIAbBGIAYhGIAhAAIgwB7IgGAQQgDAGgEAFQgFAEgHADQgHACgMAAQgNAAgMgEg");
	this.shape_213.setTransform(-48.4,157.2);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgDgEgDQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgBADgEIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_214.setTransform(-59.375,154.55);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_215.setTransform(-77.925,154.55);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#000000").s().p("AADBFQgGgCgFgDQgGgFgCgFQgDgHgBgIIAAgzIgVAAIAAgaIAVAAIAAgfIAgAAIAAAfIAdAAIAAAaIgdAAIAAAjIABAIIACAHQACACADABQADACAFAAIAHgBQAEAAACgCIAAAbQgFACgGABIgLAAQgJAAgHgBg");
	this.shape_216.setTransform(-88.9,153.1);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_217.setTransform(-99.525,154.55);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#000000").s().p("AgPBTIAAilIAgAAIAAClg");
	this.shape_218.setTransform(-108.7,151.575);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#000000").s().p("Ag5BQIAAicIAeAAIAAAOIABAAIAFgGIAHgFIAKgEQAEgCAGAAQALAAAKAEQAKAEAHAIQAHAHADAKQAEAKAAAMQAAAMgDAKQgEAJgGAIQgGAIgJAFQgJAEgMAAQgJAAgJgDQgJgDgGgIIAAAAIAAA+gAgUgqQgHAHAAAMQAAANAHAHQAHAGANAAQALAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_219.setTransform(-118.125,156.925);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#000000").s().p("AAzA3IAAg9QAAgIgDgFQgDgGgIAAQgGAAgEACIgGAFQgCAEgCAEIgBAJIAAA4IgfAAIAAg4IAAgHIgCgIQgCgDgDgDQgCgDgGAAQgHAAgDADQgEACgDAEQgCAEAAAEIgBAKIAAA1IghAAIAAhqIAgAAIAAAOIABAAIADgGIAHgFIAJgEQAFgCAGAAQAMAAAIAFQAIAEAFAKQAFgKAIgEQAJgFAMAAQAKAAAIAEQAHADAEAHQAFAGACAIQABAJAAAKIAAA+g");
	this.shape_220.setTransform(-135,154.425);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgHgEgLQgFgKgBgNQABgMAFgKQAEgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAFAKAAAMQAAANgFAKQgFALgIAHQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgSQgIAHAAALQAAAMAIAIQAHAHALAAQANAAAGgHQAIgIAAgMQAAgLgIgHQgGgIgNAAQgLAAgHAIg");
	this.shape_221.setTransform(-151.25,154.55);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgDgEgDQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgBADgEIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_222.setTransform(-162.825,154.55);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#000000").s().p("AgTBVIAAhRIgVAAIAAgZIAVAAIAAgTQAAgJACgIQABgIAFgGQAEgFAHgEQAJgDANAAIAKAAIAJABIgBAcIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABRg");
	this.shape_223.setTransform(-178.925,151.45);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgHgFgLQgEgKAAgNQAAgMAEgKQAFgLAIgHQAIgHALgEQALgEALAAQANAAAKAEQALAEAIAHQAIAHAFALQAEAKAAAMQAAANgEAKQgFALgIAHQgIAHgLAEQgKAEgNAAQgLAAgLgEgAgTgSQgGAHAAALQAAAMAGAIQAIAHALAAQAMAAAIgHQAGgIAAgMQAAgLgGgHQgIgIgMAAQgLAAgIAIg");
	this.shape_224.setTransform(-189.9,154.55);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_225.setTransform(412.175,123.275);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEgBgEACQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_226.setTransform(400.925,123.4);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#000000").s().p("AgEBTIgKgEIgHgGIgFgFIgBAAIAAAOIgeAAIAAilIAhAAIAABGIAAAAQAGgHAJgEQAJgCAJAAQAMAAAJAEQAJAFAGAIQAGAIAEAJQADAKAAALQAAAMgEALQgDAKgHAHQgHAIgKAEQgKADgLAAQgGAAgEgBgAgUAJQgHAHAAAMQAAAMAHAIQAHAHANAAQALAAAHgHQAHgIAAgMQAAgMgHgHQgHgHgLgBQgNABgHAHg");
	this.shape_227.setTransform(388.025,120.55);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#000000").s().p("AAzA3IAAg9QAAgIgDgFQgDgGgJAAQgFAAgEACIgGAFQgDAEgBAEIgBAJIAAA4IgfAAIAAg4IAAgHIgCgIQgBgDgDgDQgDgDgGAAQgGAAgEADQgFACgCAEQgCAEAAAEIgBAKIAAA1IghAAIAAhqIAgAAIAAAOIABAAIADgGIAIgFIAJgEQAFgCAFAAQAMAAAIAFQAIAEAFAKQAGgKAHgEQAJgFAMAAQAKAAAIAEQAHADAEAHQAEAGADAIQABAJAAAKIAAA+g");
	this.shape_228.setTransform(371.15,123.275);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#000000").s().p("AgfAzQgIgEgEgHQgEgGgCgKQgBgJAAgLIAAg6IAhAAIAAA1IAAAIIACAJQACAFADACQAEADAGAAQAFAAAEgCQAEgDACgEQACgEABgEIABgJIAAg2IAgAAIAABqIgfAAIAAgOIAAAAIgFAGIgGAFIgJAEQgFACgGAAQgMAAgIgEg");
	this.shape_229.setTransform(355.25,123.525);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#000000").s().p("AASA3IAAg1IAAgIIgCgJQgCgEgDgDQgDgDgHAAQgFAAgEADQgEACgCAEQgCAEgBAEIgBAKIAAA1IghAAIAAhqIAgAAIAAAOIABAAIAEgGIAHgFIAIgEQAFgCAGAAQAMAAAJAEQAHAEAEAHQAEAHACAJQABAJABALIAAA6g");
	this.shape_230.setTransform(342.6,123.275);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEgBgEACQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_231.setTransform(323.475,123.4);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#000000").s().p("AATBTIAAg0IAAgKIgCgJQgCgEgEgDQgDgCgHAAQgFAAgEACQgEACgCAEQgCAEAAAFIgBAKIAAA1IgiAAIAAilIAiAAIAABKIAAAAQABgDADgDIAGgGIAIgEQAFgBAGAAQANAAAHAEQAIADAEAHQAFAHABAIQACAKAAAKIAAA7g");
	this.shape_232.setTransform(310.8,120.425);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#000000").s().p("AADBFQgGgCgGgDQgFgFgDgGQgCgGAAgIIAAgzIgVAAIAAgaIAVAAIAAgfIAgAAIAAAfIAdAAIAAAaIgdAAIAAAjIAAAIIACAHQABACADABQAEACAFAAIAHgBQAFAAACgCIAAAbQgGADgGAAIgMAAQgIAAgHgBg");
	this.shape_233.setTransform(299.85,121.95);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#000000").s().p("AgZA1QgMgDgIgJIAVgVQAEAFAGADQAFADAHAAQAGAAAEgBQAEgCABgFQAAgEgFgCIgJgEIgNgCQgHgCgHgEQgGgDgEgFQgEgGAAgKQAAgJAEgHQADgHAHgFQAGgEAJgCQAHgCAIAAQALAAAKADQALADAHAIIgUAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAAEAEACIAJADIAOADQAHABAGAEQAHAEADAEQAEAHABAKQAAALgFAGQgFAGgGAFQgHAEgKACIgQABQgLAAgLgDg");
	this.shape_234.setTransform(283.95,123.4);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#000000").s().p("AgQBQIAAhqIAgAAIAABqgAgMguQgGgGAAgIQAAgIAGgFQAFgGAHAAQAIAAAGAGQAFAFAAAIQAAAIgFAGQgGAFgIAAQgHAAgFgFg");
	this.shape_235.setTransform(276,120.775);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEgBgEACQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_236.setTransform(260.325,123.4);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#000000").s().p("AgQA2IgshqIAkAAIAaBHIAAAAIAZhHIAiAAIgrBqg");
	this.shape_237.setTransform(247.875,123.4);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgFgDgFQgDgHAAgIQAAgJADgHQADgGAGgDQAGgEAIgCQAHgDAIgBIAPgCIAPAAQAAgIgGgGQgHgEgIAAQgHAAgHADQgHADgFAGIgSgSQAKgIAMgFQAMgEANAAQAOAAAJAEQAKADAFAHQAGAHACALQACAKAAANIAAA2IgeAAIAAgOQgGAIgJAEQgIAEgKAAQgIAAgHgCgAADAHIgJACQgFABgEADQgEADAAAGQAAAGAFADQAFACAGAAIAIgBIAIgDQAEgDACgEQACgDAAgFIAAgIIgIAAIgKABg");
	this.shape_238.setTransform(235.725,123.4);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#000000").s().p("AAWA2IgWhGIAAAAIgTBGIgiAAIgnhqIAjAAIAWBCIABAAIAShCIAjAAIAUBCIAAAAIAUhCIAiAAIgmBqg");
	this.shape_239.setTransform(220.775,123.4);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgFgDgFQgDgHAAgIQAAgJADgHQADgGAGgDQAGgEAIgCQAHgDAIgBIAPgCIAPAAQAAgIgGgGQgHgEgIAAQgHAAgHADQgHADgFAGIgSgSQAKgIAMgFQAMgEANAAQAOAAAJAEQAKADAFAHQAGAHACALQACAKAAANIAAA2IgeAAIAAgOQgGAIgJAEQgIAEgKAAQgIAAgHgCgAADAHIgJACQgFABgEADQgEADAAAGQAAAGAFADQAFACAGAAIAIgBIAIgDQAEgDACgEQACgDAAgFIAAgIIgIAAIgKABg");
	this.shape_240.setTransform(199.075,123.4);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#000000").s().p("AgTBVIAAhRIgVAAIAAgZIAVAAIAAgTQAAgJACgIQABgIAFgGQAEgFAHgEQAJgEANABIAKAAIAJABIgBAcIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABRg");
	this.shape_241.setTransform(182.925,120.3);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgIgEgKQgFgKgBgNQABgMAFgKQAEgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAFAKAAAMQAAANgFAKQgFAKgIAIQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgTQgIAIAAALQAAAMAIAIQAGAHAMAAQAMAAAHgHQAIgIgBgMQABgLgIgIQgHgHgMAAQgMAAgGAHg");
	this.shape_242.setTransform(171.95,123.4);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#000000").s().p("Ag4BMIADgbQAIADAIAAIAJgBIAGgEIAEgFIADgIIADgGIgwhrIAkAAIAbBGIAYhGIAiAAIgxB7IgGAQQgDAGgEAFQgEAEgIADQgHACgMAAQgNAAgLgEg");
	this.shape_243.setTransform(152.6,126.05);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALADAIAIIgWAXQgDgDgEgCQgEgDgFAAQgMAAgHAHQgHAIAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgCADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_244.setTransform(141.625,123.4);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#000000").s().p("AASA3IAAg1IAAgIIgBgJQgCgEgEgDQgDgDgHAAQgFAAgEADQgEACgCAEQgCAEAAAEIgBAKIAAA1IgiAAIAAhqIAhAAIAAAOIAAAAIAEgGIAHgFIAIgEQAFgCAGAAQANAAAIAEQAHAEAEAHQAFAHABAJQACAJAAALIAAA6g");
	this.shape_245.setTransform(129.55,123.275);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEgBgEACQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_246.setTransform(116.925,123.4);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#000000").s().p("AgfAzQgIgEgEgHQgEgGgCgKQgBgJgBgLIAAg6IAiAAIAAA1IAAAIIACAJQACAFADACQADADAHAAQAFAAAEgCQAEgDACgEQACgEABgEIABgJIAAg2IAhAAIAABqIggAAIAAgOIgBAAIgEAGIgGAFIgJAEQgFACgGAAQgMAAgIgEg");
	this.shape_247.setTransform(104.25,123.525);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#000000").s().p("AAZBQIAAg+IAAAAQgGAIgJADQgJADgJAAQgMAAgJgEQgJgFgGgIQgGgIgEgJQgDgKAAgMQAAgMAEgKQAEgKAGgHQAHgIAKgEQAKgEAMAAIAJACIAKAEIAHAFIAFAGIABAAIAAgOIAeAAIAACcgAgRgqQgHAHAAAMQAAANAHAHQAHAGALAAQANAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgNAAQgLAAgHAIg");
	this.shape_248.setTransform(90.675,125.775);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEgBgEACQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_249.setTransform(77.775,123.4);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_250.setTransform(67.425,123.275);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#000000").s().p("AgTBVIAAhRIgVAAIAAgZIAVAAIAAgTQAAgJACgIQABgIAFgGQAEgFAHgEQAJgEANABIAKAAIAJABIgBAcIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABRg");
	this.shape_251.setTransform(58.625,120.3);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_252.setTransform(29.875,120.425);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgFgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABADADADQADACAGAAIAHgBQAEAAADgDIAAASQgEADgFABIgJAAQgMAAgGgDg");
	this.shape_253.setTransform(19.175,122.2);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgFgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABADADADQADACAGAAIAHgBQAEAAADgDIAAASQgEADgFABIgJAAQgMAAgGgDg");
	this.shape_254.setTransform(4.925,122.2);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgCgGQgDgGgBgHQAAgKAFgHQAFgHAHgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgGAAIgJABIgIADIgHAEIgFAEIgMgMQAIgIALgEQAMgEAJAAQAMAAAIADQAJADAEAFQAGAFACAGQADAGAAAHIAAA0IAAAKIABAJIgSAAIAAgQIgBAAQgHALgIAEQgKAEgLAAQgHAAgGgCgAACADIgNADQgGACgEAEQgEAEAAAGQAAAJAGAEQAGAEAKAAQAIAAAGgDQAFgCAEgFQADgEACgGQABgFAAgFIAAgHIgKAAIgOABg");
	this.shape_255.setTransform(-4.5,123.525);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_256.setTransform(-16.175,120.425);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgFgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABADADADQADACAGAAIAHgBQAEAAADgDIAAASQgEADgFABIgJAAQgMAAgGgDg");
	this.shape_257.setTransform(-26.875,122.2);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#000000").s().p("AgoBOQgFAAgEgCIACgSQAGACAGAAQAFAAADgBQADgBADgDIADgFIAEgHIAGgRIgshoIAXAAIAeBRIABAAIAehRIAUAAIgxB+IgFANIgGAJQgEAEgGACQgGADgHAAIgJgBg");
	this.shape_258.setTransform(-42.05,126.175);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgDgGQgDgGAAgHQABgKAEgHQAEgHAIgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQALAAAJADQAJADAEAFQAGAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgMAAQgHAAgGgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQACgFgBgFIAAgHIgKAAIgPABg");
	this.shape_259.setTransform(-53.4,123.525);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#000000").s().p("AgWA1QgHgCgFgEQgFgEgDgGQgDgGAAgHQABgKAEgHQAEgHAIgDQAIgFAKgCQAKgBAMAAIAOAAIAAgFIgBgIIgFgHQgDgDgEgCQgFgCgHAAIgJABIgIADIgFAEIgGAEIgMgMQAIgIALgEQALgEAKAAQALAAAJADQAJADAEAFQAGAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgHALgJAEQgIAEgMAAQgHAAgGgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQACgFgBgFIAAgHIgKAAIgPABg");
	this.shape_260.setTransform(-108.75,123.525);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgCgGQgDgGAAgHQgBgKAFgHQAEgHAIgDQAIgFAKgCQAKgBAMAAIAPAAIAAgFIgCgIIgFgHQgDgDgFgCQgEgCgGAAIgJABIgIADIgHAEIgFAEIgMgMQAIgIALgEQALgEAKAAQAMAAAIADQAJADAEAFQAGAFACAGQADAGAAAHIAAA0IAAAKIABAJIgSAAIAAgQIgBAAQgGALgJAEQgKAEgKAAQgIAAgHgCgAACADIgNADQgGACgEAEQgEAEAAAGQAAAJAGAEQAGAEAKAAQAIAAAGgDQAGgCADgFQADgEACgGQACgFAAgFIAAgHIgLAAIgOABg");
	this.shape_261.setTransform(-138.5,123.525);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#000000").s().p("AgOAzQgKgEgHgHQgHgHgEgKQgEgLAAgMQAAgLAEgKQAEgKAHgHQAHgIAKgDQAKgFALAAQAMAAAKAFQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAGAAAHQAAAHACAHQADAGAEAFQAEAFAHADQAFACAHAAQAJAAAGgDQAGgDAFgFIAOAOQgIAIgKAEQgKAEgMgBQgLAAgKgDg");
	this.shape_262.setTransform(-148.925,123.55);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#000000").s().p("AAmBOIgmh+IAAAAIglB+IgWAAIguibIAWAAIAiB8IABAAIAlh8IAXAAIAkB8IABAAIAih8IAWAAIgtCbg");
	this.shape_263.setTransform(-182.5,120.95);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f().s("#FFEB8C").ss(2.9,1,1).p("EAxAgIrMhh/AAAQgoAAAAAoIAAQHQAAAoAoAAMBh/AAAQAoAAAAgoIAAwHQAAgogoAAg");
	this.shape_264.setTransform(112.05,150.55);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFC85D").s().p("Egw/AIsQgoAAAAgoIAAwHQAAgoAoAAMBh/AAAQAoAAAAAoIAAQHQAAAogoAAg");
	this.shape_265.setTransform(112.05,150.55);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#BFE8FF").s().p("Eg1XAOgIAA8/MBqvAAAIAAc/g");
	this.shape_266.setTransform(119.2,92.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127,p:{x:122.975,y:52.925}},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108,p:{x:373.725,y:55.9}},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97,p:{x:-63.3,y:87.175}},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91,p:{x:-1.125,y:87.175}},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77,p:{x:-105.6,y:142.375}},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68,p:{x:2.025,y:142.375}},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64,p:{x:49.1,y:139.275}},{t:this.shape_63,p:{x:57.875,y:142.375}},{t:this.shape_62,p:{x:68.725,y:142.375}},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58,p:{x:-159.825,y:170.425}},{t:this.shape_57,p:{x:-147.575,y:173.525}},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53,p:{x:-90.125,y:173.525}},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46,p:{x:-1.225,y:173.525}},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41,p:{x:-153.875,y:204.675}},{t:this.shape_40,p:{x:-142.725,y:204.675}},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34}]},3).to({state:[{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.right_mc},{t:this.shape_35},{t:this.shape_34},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127,p:{x:122.975,y:52.925}},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108,p:{x:373.725,y:55.9}},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97,p:{x:-63.3,y:87.175}},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91,p:{x:-1.125,y:87.175}},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77,p:{x:-105.6,y:142.375}},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68,p:{x:2.025,y:142.375}},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64,p:{x:49.1,y:139.275}},{t:this.shape_63,p:{x:57.875,y:142.375}},{t:this.shape_62,p:{x:68.725,y:142.375}},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58,p:{x:-159.825,y:170.425}},{t:this.shape_57,p:{x:-147.575,y:173.525}},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53,p:{x:-90.125,y:173.525}},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46,p:{x:-1.225,y:173.525}},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41,p:{x:-153.875,y:204.675}},{t:this.shape_40,p:{x:-142.725,y:204.675}},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]},1).to({state:[{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_35},{t:this.shape_34},{t:this.instance_2},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127,p:{x:122.975,y:52.925}},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108,p:{x:373.725,y:55.9}},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97,p:{x:-63.3,y:87.175}},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91,p:{x:-1.125,y:87.175}},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77,p:{x:-105.6,y:142.375}},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68,p:{x:2.025,y:142.375}},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64,p:{x:49.1,y:139.275}},{t:this.shape_63,p:{x:57.875,y:142.375}},{t:this.shape_62,p:{x:68.725,y:142.375}},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58,p:{x:-159.825,y:170.425}},{t:this.shape_57,p:{x:-147.575,y:173.525}},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53,p:{x:-90.125,y:173.525}},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46,p:{x:-1.225,y:173.525}},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41,p:{x:-153.875,y:204.675}},{t:this.shape_40,p:{x:-142.725,y:204.675}},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]},1).to({state:[]},1).to({state:[{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_68,p:{x:-166.875,y:123.525}},{t:this.shape_262},{t:this.shape_261},{t:this.shape_108,p:{x:-126.525,y:123.4}},{t:this.shape_260},{t:this.shape_64,p:{x:-100.25,y:120.425}},{t:this.shape_91,p:{x:-92.875,y:123.525}},{t:this.shape_97,p:{x:-81.3,y:123.525}},{t:this.shape_62,p:{x:-63.975,y:123.525}},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_63,p:{x:42.125,y:123.525}},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_127,p:{x:-40.725,y:182.725}},{t:this.shape_57,p:{x:-28.475,y:185.825}},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_77,p:{x:34.35,y:185.825}},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_53,p:{x:75.525,y:185.825}},{t:this.shape_168},{t:this.shape_167},{t:this.shape_46,p:{x:113.475,y:185.825}},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_41,p:{x:169.575,y:185.825}},{t:this.shape_58,p:{x:186.825,y:182.725}},{t:this.shape_40,p:{x:199.075,y:185.825}},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155}]},1).wait(2));

	// Layer_4
	this.next1_btn = new lib.next1_mc();
	this.next1_btn.name = "next1_btn";
	this.next1_btn.parent = this;
	this.next1_btn.setTransform(451,263.95,1,1,0,0,0,71.9,27.8);

	this.next2_btn = new lib.next1_mc_ani();
	this.next2_btn.name = "next2_btn";
	this.next2_btn.parent = this;
	this.next2_btn.setTransform(451,263.95,1,1,0,0,0,71.9,27.8);

	this.next3_btn = new lib.next1_mc();
	this.next3_btn.name = "next3_btn";
	this.next3_btn.parent = this;
	this.next3_btn.setTransform(451,263.95,1,1,0,0,0,71.9,27.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.next1_btn}]},6).to({state:[{t:this.next2_btn}]},1).to({state:[{t:this.next3_btn}]},1).wait(1));

	// Layer_7
	this.paused_mc = new lib.paused_mc();
	this.paused_mc.name = "paused_mc";
	this.paused_mc.parent = this;
	this.paused_mc.setTransform(-346.05,253.2,1,1,0,0,0,44.7,17.1);
	this.paused_mc._off = true;

	this.timeline.addTween(cjs.Tween.get(this.paused_mc).wait(3).to({_off:false},0).to({_off:true},3).wait(3));

	// replay and pahse
	this.replay_mc = new lib.replay_ptn();
	this.replay_mc.name = "replay_mc";
	this.replay_mc.parent = this;
	this.replay_mc.setTransform(-457.5,282.95,1,1,0,0,0,66.2,27.8);
	this.replay_mc._off = true;

	this.timeline.addTween(cjs.Tween.get(this.replay_mc).wait(3).to({_off:false},0).to({_off:true},3).wait(3));

	// Layer_5
	this.hintmsg_mc = new lib.onecompletewave_mc();
	this.hintmsg_mc.name = "hintmsg_mc";
	this.hintmsg_mc.parent = this;
	this.hintmsg_mc.setTransform(81.6,-100.1,1,1,0,0,0,171.5,104.4);
	this.hintmsg_mc._off = true;

	this.timeline.addTween(cjs.Tween.get(this.hintmsg_mc).wait(3).to({_off:false},0).to({_off:true},4).wait(2));

	// infomsg3
	this.hint1_mc = new lib.hint_mccopy();
	this.hint1_mc.name = "hint1_mc";
	this.hint1_mc.parent = this;
	this.hint1_mc.setTransform(385.15,94.85,1,1,0,0,0,55.1,26.4);

	this.hide1_mc = new lib.hide_mc();
	this.hide1_mc.name = "hide1_mc";
	this.hide1_mc.parent = this;
	this.hide1_mc.setTransform(385.15,94.85,1,1,0,0,0,55.1,26.4);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#000000").s().p("AgJAKQgEgEgBgGQABgFAEgEQAEgFAFAAQAGAAAFAFQADAEAAAFQAAAGgDAEQgFAFgGgBQgFABgEgFg");
	this.shape_267.setTransform(230.6,290);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#000000").s().p("AgVBaIALgWQAGgLADgKQADgLACgMQACgLAAgNQAAgXgHgXQgHgXgNgTIAMgIQAPAUAIAZQAJAZAAAaQgBAZgHAZQgJAagPAWg");
	this.shape_268.setTransform(224.25,285.05);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#000000").s().p("AgqA0IAAgSIA6hEIg4AAIAAgRIBQAAIAAASIg6BEIA9AAIAAARg");
	this.shape_269.setTransform(216.325,286.075);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#000000").s().p("AApBOIAAhIIhQAAIAABIIgWAAIAAibIAWAAIAABBIBQAAIAAhBIAVAAIAACbg");
	this.shape_270.setTransform(203.1,283.5);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#000000").s().p("AgNA0QgJgZAAgbQAAgZAIgZQAJgZAOgVIAOAIIgNAVQgFALgDALQgDAKgCAMQgCALAAAMQAAAZAHAWQAHAXAOATIgOAJQgOgVgIgZg");
	this.shape_271.setTransform(192.175,285.05);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#000000").s().p("AgqA0IAAgSIA6hEIg4AAIAAgRIBQAAIAAASIg6BEIA9AAIAAARg");
	this.shape_272.setTransform(177.625,286.075);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgGIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABAEADACQADACAGAAIAHgBQAEgBADgBIAAASQgEACgFABIgJAAQgMAAgGgDg");
	this.shape_273.setTransform(167.975,284.75);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAARIABAAQACgFADgEIAHgFIAJgEIAJgBQAFgBAEACIAAAVIgGgBIgEAAQgPAAgHAIQgHAIgBAQIAAA1g");
	this.shape_274.setTransform(160.75,285.95);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_275.setTransform(150.125,286.075);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_276.setTransform(137.875,282.975);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_277.setTransform(120.625,286.075);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#000000").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgFgFAAgGQAAgGAFgEQAEgEAFAAQAGAAAEAEQAFAEgBAGQABAGgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_278.setTransform(113.25,283.5);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#000000").s().p("AgoBOQgFAAgEgCIACgSQAHACAFAAQAFAAADgBQADgBACgDIAEgFIAEgHIAGgRIgrhoIAWAAIAfBRIAAAAIAehRIAUAAIgxB+IgFANIgGAJQgEAEgGACQgGADgHAAIgJgBg");
	this.shape_279.setTransform(99,288.725);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#000000").s().p("AgOAyQgKgEgHgGQgHgIgEgJQgEgLAAgMQAAgLAEgKQAEgKAHgIQAHgHAKgDQAKgFALAAQAMAAAKAFQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGACgEAGQgEAFgCAHQgCAGAAAHQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKADgMAAQgLAAgKgEg");
	this.shape_280.setTransform(88.625,286.1);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgGQgCgFgDgDQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIgBAHADQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_281.setTransform(76.775,285.95);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_282.setTransform(64.525,286.075);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#000000").s().p("AgWAzQgHgCgFgFQgFgEgDgIQgDgIAAgKIAAhCIATAAIAAA8QAAAIACAFQACAFAEADQADADAEACIAJABQAFAAAGgCQAFgCAEgEQAEgFACgGQACgHAAgIIAAg1IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAFQgJAEgMAAQgHAAgHgCg");
	this.shape_283.setTransform(52.275,286.2);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#000000").s().p("AAjBOIAAhBQgGAJgKAEQgKAFgKAAQgMAAgKgEQgJgEgHgIQgHgHgEgJQgEgKAAgLQAAgMAEgKQAEgKAHgHQAHgIAJgEQAKgFAMABQAKgBAKAFQAKAFAGAIIAAgPIAUAAIAACZgAgNg4QgGADgEAEQgFAFgCAHQgDAGAAAJQAAAHADAHQACAHAFAEQAEAEAGADQAHACAHABQAIgBAGgCQAGgDAFgEQAEgEACgHQADgHAAgHQAAgJgDgGQgCgHgEgFQgFgEgGgDQgGgDgIAAQgHAAgHADg");
	this.shape_284.setTransform(39.175,288.45);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_285.setTransform(26.575,286.075);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAARIABAAQACgFADgEIAHgFIAJgEIAKgBQAEgBAEACIAAAVIgGgBIgEAAQgPAAgHAIQgHAIgBAQIAAA1g");
	this.shape_286.setTransform(17.2,285.95);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#000000").s().p("AgNBVIAAhWIgXAAIAAgSIAXAAIAAgXQAAgVAIgLQAIgKATABIAHAAIAIABIgDARIgFgBIgGAAQgGAAgDABQgDACgCADQgCADgBAEIAAAKIAAAYIAYAAIAAASIgYAAIAABWg");
	this.shape_287.setTransform(9,282.85);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#000000").s().p("AgNBVIAAhWIgXAAIAAgSIAXAAIAAgXQAAgVAIgLQAIgKATABIAGAAIAIABIgBARIgGgBIgGAAQgFAAgDABQgEACgCADQgCADAAAEIgBAKIAAAYIAXAAIAAASIgXAAIAABWg");
	this.shape_288.setTransform(-4.45,282.85);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgFAFgCAHQgDAGAAAHQAAAIADAHQACAHAFAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_289.setTransform(-14.6,286.075);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgGIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAIIACAIQABAEADACQADACAGAAIAHgBQAEgBADgBIAAASQgEACgFABIgJAAQgMAAgGgDg");
	this.shape_290.setTransform(-31.825,284.75);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#000000").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgFgFAAgGQAAgGAFgEQAEgEAFAAQAGAAAEAEQAFAEgBAGQABAGgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_291.setTransform(-38.05,283.5);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#000000").s().p("AAaA2IAAg9QAAgHgCgGQgCgFgDgDQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAFQgEAEgCAGQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAARIABAAQAEgJAJgFQAJgGALABQAIgBAHADQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_292.setTransform(-46.825,285.95);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#000000").s().p("AgWAzQgHgCgFgFQgFgEgDgIQgDgIAAgKIAAhCIATAAIAAA8QAAAIACAFQACAFAEADQADADAEACIAJABQAFAAAGgCQAFgCAEgEQAEgFACgGQACgHAAgIIAAg1IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAFQgJAEgMAAQgHAAgHgCg");
	this.shape_293.setTransform(-59.075,286.2);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_294.setTransform(-77.425,286.075);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_295.setTransform(-89.675,282.975);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#000000").s().p("AgKBOIAAiHIgyAAIAAgUIB5AAIAAAUIgzAAIAACHg");
	this.shape_296.setTransform(-102.125,283.5);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#000000").s().p("AgHATIgHgFIgEgGIgBgIIABgHIAEgHIAHgEIAHgBIAIABQAEACACACIAFAHIABAHIgBAIIgFAGIgGAFIgIABIgHgBg");
	this.shape_297.setTransform(120.275,258.275);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#000000").s().p("AgaBRQgKgEgHgIQgGgHgEgKQgEgLAAgMQAAgLADgKQAEgJAGgIQAGgIAJgFQAJgEAMAAQAJAAAJACQAJAEAGAHIAAAAIAAhGIAhAAIAAClIgeAAIAAgOIgBAAIgFAFIgHAGIgKAEIgJABQgMAAgKgDgAgRAJQgHAHAAAMQAAAMAHAIQAHAHALAAQANAAAHgHQAHgIAAgMQAAgMgHgHQgHgHgNgBQgLABgHAHg");
	this.shape_298.setTransform(109.725,251.95);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#000000").s().p("AASA3IAAg1IAAgIIgBgJQgCgEgEgDQgDgDgHAAQgFAAgEADQgEACgCAEQgCAEgBAEIgBAKIAAA1IghAAIAAhqIAhAAIAAAOIAAAAIAEgGIAHgFIAIgEQAFgCAGAAQAMAAAJAEQAHAEAEAHQAFAHABAJQABAJABALIAAA6g");
	this.shape_299.setTransform(96.8,254.675);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgIgEgKQgGgKAAgNQAAgMAGgKQAEgLAIgHQAIgHALgEQALgEALAAQANAAAKAEQALAEAIAHQAIAHAFALQAFAKgBAMQABANgFAKQgFAKgIAIQgIAHgLAEQgKAEgNAAQgLAAgLgEgAgTgTQgGAIAAALQAAAMAGAIQAIAHALAAQAMAAAIgHQAGgIABgMQgBgLgGgIQgIgHgMAAQgLAAgIAHg");
	this.shape_300.setTransform(83.8,254.8);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALADAIAIIgWAXQgDgDgEgCQgEgDgFAAQgMAAgHAHQgHAIAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgCADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_301.setTransform(72.225,254.8);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEgBgEACQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_302.setTransform(60.175,254.8);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#000000").s().p("AgaA1QgLgDgIgJIAUgVQAFAFAFADQAGADAIAAQAEAAAFgBQAFgCAAgFQgBgEgEgCIgJgEIgNgCQgIgCgGgEQgGgDgEgFQgEgGAAgKQAAgJAEgHQAEgHAGgFQAGgEAJgCQAHgCAIAAQAKAAALADQALADAIAIIgVAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAAEAEACIAKADIANADQAHABAGAEQAGAEAFAEQADAHAAAKQABALgFAGQgEAGgIAFQgHAEgIACIgQABQgMAAgMgDg");
	this.shape_303.setTransform(48.75,254.8);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_304.setTransform(33.125,254.675);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgMAFgKQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJABQgEgBgEACQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_305.setTransform(21.875,254.8);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#000000").s().p("Ag5BQIAAicIAeAAIAAAOIABAAIAFgGIAHgFIAKgEQAEgCAGAAQALAAAKAEQAKAEAHAIQAHAHADAKQAEAKAAAMQAAAMgDAKQgEAJgGAIQgGAIgJAFQgJAEgMAAQgJAAgJgDQgJgDgGgIIAAAAIAAA+gAgUgqQgHAHAAAMQAAANAHAHQAHAGANAAQALAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_306.setTransform(8.975,257.175);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#000000").s().p("AgaBQQgKgDgHgIQgGgHgEgKQgEgLAAgMQAAgLADgKQAEgJAGgIQAGgIAJgFQAJgEAMgBQAJAAAJADQAJAEAGAIIAAAAIAAhHIAhAAIAAClIgeAAIAAgOIgBAAIgFAFIgHAGIgKAEIgJACQgMgBgKgEgAgRAJQgHAHAAAMQAAAMAHAIQAHAIALgBQANABAHgIQAHgIAAgMQAAgMgHgHQgHgIgNAAQgLAAgHAIg");
	this.shape_307.setTransform(316.825,222.45);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEALAAALIAAAKIhMAAQACAKAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_308.setTransform(303.925,225.3);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgEgEgCQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAHQAHAIAMAAQAFAAAEgCQAEgDADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_309.setTransform(292.725,225.3);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#000000").s().p("AgfAzQgIgEgEgHQgEgGgCgKQgBgJgBgLIAAg6IAiAAIAAA1IAAAIIACAJQACAFADACQADADAHAAQAFAAAEgCQAEgDACgEQACgEABgEIABgJIAAg2IAhAAIAABqIggAAIAAgOIAAAAIgFAGIgGAFIgJAEQgFACgGAAQgMAAgIgEg");
	this.shape_310.setTransform(280.65,225.425);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#000000").s().p("AgaBQQgKgDgHgIQgGgHgEgKQgEgLAAgMQAAgLADgKQAEgJAGgIQAGgIAJgFQAJgEAMgBQAJAAAJADQAJAEAGAIIAAAAIAAhHIAhAAIAAClIgeAAIAAgOIgBAAIgFAFIgHAGIgKAEIgJACQgMgBgKgEgAgRAJQgHAHAAAMQAAAMAHAIQAHAIALgBQANABAHgIQAHgIAAgMQAAgMgHgHQgHgIgNAAQgLAAgHAIg");
	this.shape_311.setTransform(267.075,222.45);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgIgFgKQgEgKAAgNQAAgLAEgLQAFgLAIgHQAIgHALgEQALgEALAAQANAAAKAEQALAEAIAHQAIAHAFALQAEALAAALQAAANgEAKQgFAKgIAIQgIAHgLAEQgKAEgNAAQgLAAgLgEgAgTgSQgGAHAAALQAAAMAGAHQAIAIALAAQAMAAAIgIQAGgHAAgMQAAgLgGgHQgIgIgMAAQgLAAgIAIg");
	this.shape_312.setTransform(253.8,225.3);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_313.setTransform(243.075,225.175);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#000000").s().p("Ag5BQIAAicIAeAAIAAAOIABAAIAFgGIAHgFIAKgEQAEgCAGAAQALAAAKAEQAKAEAHAIQAHAHADAKQAEAKAAAMQAAAMgDAKQgEAJgGAIQgGAIgJAFQgJAEgMAAQgJAAgJgDQgJgDgGgIIAAAAIAAA+gAgUgqQgHAHAAAMQAAANAHAHQAHAGANAAQALAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_314.setTransform(231.575,227.675);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEALAAALIAAAKIhMAAQACAKAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_315.setTransform(211.475,225.3);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#000000").s().p("AgQA2IgshqIAkAAIAaBHIAAAAIAZhHIAiAAIgrBqg");
	this.shape_316.setTransform(199.025,225.3);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgFgDgFQgDgGAAgJQAAgJADgGQADgHAGgDQAGgEAIgCQAHgDAIgBIAPgCIAPAAQAAgIgGgFQgHgGgIAAQgHABgHADQgHAEgFAFIgSgSQAKgJAMgEQAMgEANAAQAOAAAJAEQAKADAFAHQAGAHACAKQACALAAANIAAA2IgeAAIAAgOQgGAIgJAFQgIADgKAAQgIAAgHgCgAADAHIgJACQgFABgEADQgEAEAAAFQAAAGAFADQAFADAGAAIAIgCIAIgEQAEgCACgEQACgDAAgFIAAgHIgIAAIgKAAg");
	this.shape_317.setTransform(186.875,225.3);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#000000").s().p("AAWA2IgWhGIAAAAIgTBGIgiAAIgnhqIAjAAIAWBCIABAAIAShCIAjAAIAUBCIAAAAIAUhCIAiAAIgmBqg");
	this.shape_318.setTransform(171.925,225.3);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEALAAALIAAAKIhMAAQACAKAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_319.setTransform(149.925,225.3);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#000000").s().p("AATBTIAAg0IAAgKIgDgJQgCgEgDgDQgDgCgGAAQgGAAgEACQgEACgCAEQgCAEAAAFIgCAKIAAA1IggAAIAAilIAgAAIAABKIABAAQABgDADgDIAGgGIAIgEQAFgBAGAAQANAAAHAEQAIADAEAHQAEAHACAIQACAKgBAKIAAA7g");
	this.shape_320.setTransform(137.25,222.325);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#000000").s().p("AADBFQgGgCgFgDQgGgFgCgFQgDgHAAgJIAAgyIgWAAIAAgaIAWAAIAAgfIAfAAIAAAfIAdAAIAAAaIgdAAIAAAjIABAIIACAHQACACADABQACACAGAAIAHgBQAFAAABgCIAAAbQgFACgGABIgLABQgJAAgHgCg");
	this.shape_321.setTransform(126.3,223.85);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#000000").s().p("AgTBVIAAhRIgVAAIAAgZIAVAAIAAgTQAAgJACgIQABgIAFgGQAEgGAHgDQAJgDANAAIAKAAIAJABIgBAcIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABRg");
	this.shape_322.setTransform(111.625,222.2);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgIgEgKQgGgKAAgNQAAgLAGgLQAEgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAFALgBALQABANgFAKQgFAKgIAIQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgSQgIAHABALQgBAMAIAHQAGAIAMAAQAMAAAHgIQAIgHAAgMQAAgLgIgHQgHgIgMAAQgMAAgGAIg");
	this.shape_323.setTransform(100.65,225.3);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#000000").s().p("AgZA1QgMgDgIgJIAVgWQAEAGAGADQAFADAHAAQAGAAAEgCQAEgBABgFQAAgEgFgCIgJgEIgNgDQgHgBgHgEQgGgDgEgFQgEgGAAgKQAAgKAEgGQADgHAHgEQAGgFAJgCQAHgCAIAAQALAAAKADQALADAHAIIgUAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAADAEACIAJAEIAOADQAHACAGADQAHAEADAEQAEAHABAKQAAAKgFAHQgFAGgGAFQgHAEgKACIgQABQgLAAgLgDg");
	this.shape_324.setTransform(82.35,225.3);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEALAAALIAAAKIhMAAQACAKAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_325.setTransform(70.925,225.3);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#000000").s().p("AgPBTIAAilIAfAAIAAClg");
	this.shape_326.setTransform(61.75,222.325);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgEgEgCQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAHQAHAIAMAAQAFAAAEgCQAEgDADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_327.setTransform(54.025,225.3);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#000000").s().p("Ag5BMIAFgbQAHADAIAAIAJgBIAGgDIAEgGIADgIIACgGIgvhrIAkAAIAbBGIAYhGIAiAAIgxB7IgGAQQgDAGgEAEQgFAFgHADQgHACgMAAQgNAAgMgEg");
	this.shape_328.setTransform(42.15,227.95);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgEgEgCQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAHQAHAIAMAAQAFAAAEgCQAEgDADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_329.setTransform(31.175,225.3);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEALAAALIAAAKIhMAAQACAKAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_330.setTransform(12.625,225.3);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#000000").s().p("AADBFQgGgCgFgDQgGgFgCgFQgDgHAAgJIAAgyIgWAAIAAgaIAWAAIAAgfIAfAAIAAAfIAdAAIAAAaIgdAAIAAAjIABAIIACAHQACACACABQADACAGAAIAHgBQAFAAABgCIAAAbQgFACgGABIgLABQgJAAgHgCg");
	this.shape_331.setTransform(1.65,223.85);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEALAAALIAAAKIhMAAQACAKAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_332.setTransform(-8.975,225.3);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#000000").s().p("AgQBTIAAilIAhAAIAAClg");
	this.shape_333.setTransform(-18.15,222.325);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#000000").s().p("Ag5BQIAAicIAeAAIAAAOIABAAIAFgGIAHgFIAKgEQAEgCAGAAQALAAAKAEQAKAEAHAIQAHAHADAKQAEAKAAAMQAAAMgDAKQgEAJgGAIQgGAIgJAFQgJAEgMAAQgJAAgJgDQgJgDgGgIIAAAAIAAA+gAgUgqQgHAHAAAMQAAANAHAHQAHAGANAAQALAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_334.setTransform(-27.575,227.675);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#000000").s().p("AAzA3IAAg9QAAgIgDgFQgDgGgIAAQgGAAgEACIgGAFQgCAEgBAEIgCAJIAAA4IgfAAIAAg4IAAgHIgCgIQgCgDgDgDQgDgDgFAAQgHAAgEADQgEACgCAEQgBAEgBAEIgBAKIAAA1IghAAIAAhqIAgAAIAAAOIABAAIADgGIAHgFIAJgEQAFgCAGAAQAMAAAIAFQAIAEAEAKQAGgKAJgEQAHgFANAAQAKAAAIAEQAHADAEAHQAFAGACAIQABAJAAAKIAAA+g");
	this.shape_335.setTransform(-44.45,225.175);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgIgFgKQgEgKgBgNQABgLAEgLQAFgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAFALAAALQAAANgFAKQgFAKgIAIQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgSgSQgIAHAAALQAAAMAIAHQAGAIAMAAQAMAAAHgIQAIgHgBgMQABgLgIgHQgHgIgMAAQgMAAgGAIg");
	this.shape_336.setTransform(-60.7,225.3);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgEgEgCQgEgCgFAAQgMAAgHAIQgHAHAAALQAAAMAHAHQAHAIAMAAQAFAAAEgCQAEgDADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_337.setTransform(-72.275,225.3);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#000000").s().p("AgTBVIAAhRIgVAAIAAgZIAVAAIAAgTQAAgJACgIQABgIAFgGQAEgGAHgDQAJgDANAAIAKAAIAJABIgBAcIgFgBIgGgBQgIAAgEADQgEAEAAALIAAARIAZAAIAAAZIgZAAIAABRg");
	this.shape_338.setTransform(-88.375,222.2);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgIgEgKQgGgKAAgNQAAgLAGgLQAEgLAIgHQAIgHALgEQALgEALAAQAMAAALAEQALAEAIAHQAIAHAFALQAFALgBALQABANgFAKQgFAKgIAIQgIAHgLAEQgLAEgMAAQgLAAgLgEgAgTgSQgGAHAAALQAAAMAGAHQAIAIALAAQAMAAAIgIQAGgHABgMQgBgLgGgHQgIgIgMAAQgLAAgIAIg");
	this.shape_339.setTransform(-99.35,225.3);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_340.setTransform(-116.575,225.175);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgIgEgKQgFgKAAgNQAAgLAFgLQAEgLAIgHQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAHADALQAEALAAALIAAAKIhMAAQACAKAHAGQAGAFAJAAQAIAAAGgDQAFgEAFgGIAXARQgIAKgMAFQgMAGgNAAQgMAAgLgEgAAWgLQAAgJgGgFQgGgHgJAAQgEAAgEACQgEACgDADQgDADgCAEQgCADAAAEIArAAIAAAAg");
	this.shape_341.setTransform(-127.825,225.3);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#000000").s().p("AgEBTIgKgEIgHgGIgFgFIgBAAIAAAOIgeAAIAAilIAhAAIAABHIAAAAQAGgIAJgEQAJgDAJAAQAMABAJAEQAJAFAGAIQAGAIAEAJQADAKAAALQAAAMgEALQgDAKgHAHQgHAIgKADQgKAEgLABQgGAAgEgCgAgUAJQgHAHAAAMQAAAMAHAIQAHAIANgBQALABAHgIQAHgIAAgMQAAgMgHgHQgHgIgLAAQgNAAgHAIg");
	this.shape_342.setTransform(-140.725,222.45);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#000000").s().p("AAzA3IAAg9QAAgIgDgFQgDgGgJAAQgFAAgEACIgGAFQgDAEgBAEIgBAJIAAA4IgfAAIAAg4IAAgHIgCgIQgBgDgDgDQgDgDgGAAQgGAAgEADQgFACgCAEQgCAEAAAEIgBAKIAAA1IghAAIAAhqIAgAAIAAAOIABAAIADgGIAIgFIAJgEQAFgCAFAAQAMAAAIAFQAIAEAFAKQAGgKAHgEQAJgFAMAAQAKAAAIAEQAHADAEAHQAEAGADAIQABAJAAAKIAAA+g");
	this.shape_343.setTransform(-157.6,225.175);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#000000").s().p("AgfAzQgIgEgEgHQgEgGgCgKQgBgJgBgLIAAg6IAiAAIAAA1IAAAIIACAJQACAFADACQAEADAGAAQAFAAAEgCQAEgDACgEQACgEABgEIABgJIAAg2IAgAAIAABqIgfAAIAAgOIAAAAIgFAGIgGAFIgJAEQgFACgGAAQgMAAgIgEg");
	this.shape_344.setTransform(-173.5,225.425);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#000000").s().p("AASA3IAAg1IAAgIIgCgJQgCgEgDgDQgDgDgHAAQgFAAgEADQgEACgCAEQgCAEgBAEIgBAKIAAA1IghAAIAAhqIAgAAIAAAOIABAAIAEgGIAHgFIAIgEQAFgCAGAAQAMAAAJAEQAHAEAEAHQAEAHACAJQABAJABALIAAA6g");
	this.shape_345.setTransform(-186.15,225.175);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAIADAKQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgEQAFgDAFgGIAXARQgIAKgMAGQgMAFgNAAQgMAAgLgEgAAWgLQAAgIgGgHQgGgFgJAAQgEAAgEABQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_346.setTransform(292.025,195.2);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#000000").s().p("AASBTIAAg0IAAgKIgCgJQgCgEgDgDQgDgCgGAAQgGAAgEACQgEACgCAEQgCAEgBAFIgBAKIAAA1IggAAIAAilIAgAAIAABKIABAAQABgDADgDIAGgGIAIgEQAFgBAGAAQAMAAAJAEQAHADAEAHQAEAHACAIQACAKgBAKIAAA7g");
	this.shape_347.setTransform(279.35,192.225);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#000000").s().p("AADBFQgGgCgFgEQgGgDgCgHQgDgGgBgIIAAgyIgVAAIAAgbIAVAAIAAggIAgAAIAAAgIAdAAIAAAbIgdAAIAAAiIABAIIACAGQACADADACQADABAFAAIAHAAQAEgBACgCIAAAcQgFACgGAAIgLAAQgJABgHgCg");
	this.shape_348.setTransform(268.4,193.75);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#000000").s().p("AgaA1QgLgDgIgJIAUgVQAFAFAFADQAGADAIAAQAEAAAFgBQAFgCgBgEQAAgFgDgCIgKgDIgNgDQgIgCgFgDQgHgDgEgGQgEgGAAgKQAAgKAEgGQADgHAHgFQAGgEAIgCQAIgCAIAAQALAAAKADQALADAIAIIgVAUQgHgJgMAAQgDAAgEACQgEACAAAFQAAADAEADIAKADIANADQAHACAGADQAGAEAFAFQADAGAAAKQAAALgEAGQgEAHgIAEQgHAEgIABQgJACgHAAQgMAAgMgDg");
	this.shape_349.setTransform(252.5,195.2);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#000000").s().p("AgPBQIAAhqIAgAAIAABqgAgNguQgFgGAAgIQAAgIAFgFQAGgGAHAAQAIAAAFAGQAGAFAAAIQAAAIgGAGQgFAFgIAAQgHAAgGgFg");
	this.shape_350.setTransform(244.55,192.575);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAIADAKQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgEQAFgDAFgGIAXARQgIAKgMAGQgMAFgNAAQgMAAgLgEgAAWgLQAAgIgGgHQgGgFgJAAQgEAAgEABQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_351.setTransform(228.875,195.2);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#000000").s().p("AgQA1IgshqIAkAAIAaBIIAAAAIAZhIIAiAAIgrBqg");
	this.shape_352.setTransform(216.425,195.2);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgEgDgGQgDgHAAgIQAAgJADgHQADgGAGgDQAGgEAIgDQAHgCAIgBIAPgBIAPAAQAAgJgGgGQgHgEgIAAQgHgBgHAEQgHADgFAGIgSgSQAKgJAMgEQAMgEANAAQAOAAAJAEQAKADAFAHQAGAIACAKQACAJAAAOIAAA1IgeAAIAAgNQgGAJgJADQgIAEgKAAQgIAAgHgCgAADAHIgJACQgFACgEADQgEADAAAFQAAAGAFADQAFADAGgBIAIgBIAIgDQAEgDACgDQACgEAAgFIAAgIIgIAAIgKABg");
	this.shape_353.setTransform(204.275,195.2);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#000000").s().p("AAWA1IgWhGIAAAAIgTBGIgiAAIgnhqIAjAAIAWBDIABAAIAShDIAjAAIAUBDIAAAAIAUhDIAiAAIgmBqg");
	this.shape_354.setTransform(189.325,195.2);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#000000").s().p("AgbA2QgHgCgFgEQgFgEgDgGQgDgHAAgIQAAgJADgHQADgGAGgDQAGgEAIgDQAHgCAIgBIAPgBIAPAAQAAgJgGgGQgHgEgIAAQgHgBgHAEQgHADgFAGIgSgSQAKgJAMgEQAMgEANAAQAOAAAJAEQAKADAFAHQAGAIACAKQACAJAAAOIAAA1IgeAAIAAgNQgGAJgJADQgIAEgKAAQgIAAgHgCgAADAHIgJACQgFACgEADQgEADAAAFQAAAGAFADQAFADAGgBIAIgBIAIgDQAEgDACgDQACgEAAgFIAAgIIgIAAIgKABg");
	this.shape_355.setTransform(167.625,195.2);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#000000").s().p("AgTBUIAAhQIgVAAIAAgaIAVAAIAAgTQAAgIACgIQABgIAFgGQAEgFAHgEQAJgDANAAIAKAAIAJACIgBAcIgFgCIgGgBQgIAAgEADQgEAEAAALIAAAQIAZAAIAAAaIgZAAIAABQg");
	this.shape_356.setTransform(151.475,192.1);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#000000").s().p("AgWA0QgLgEgIgHQgIgHgEgLQgGgKABgNQgBgMAGgKQAEgKAIgIQAIgHALgEQALgEALAAQANAAAKAEQALAEAIAHQAIAIAFAKQAFAKgBAMQABANgFAKQgFALgIAHQgIAHgLAEQgKAEgNAAQgLAAgLgEgAgTgTQgGAIAAALQAAAMAGAIQAIAHALAAQAMAAAIgHQAGgIABgMQgBgLgGgIQgIgHgMAAQgLAAgIAHg");
	this.shape_357.setTransform(140.5,195.2);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#000000").s().p("Ag5BMIAFgbQAHADAIAAIAJgBIAGgEIAEgFIADgIIACgGIguhrIAkAAIAaBHIAYhHIAhAAIgvB8IgHAOQgDAHgEAFQgEAEgIACQgHADgMAAQgNAAgMgEg");
	this.shape_358.setTransform(121.15,197.85);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#000000").s().p("AgMA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQAJAAAKADQALAEAIAHIgWAXQgDgDgEgCQgEgDgFAAQgMAAgHAHQgHAIAAALQAAAMAHAIQAHAHAMAAQAFAAAEgDQAEgCADgDIAWAXQgIAIgLADQgKADgJAAQgMAAgLgEg");
	this.shape_359.setTransform(110.175,195.2);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#000000").s().p("AATA3IAAg1IAAgIIgDgJQgCgEgDgDQgDgDgGAAQgGAAgEADQgEACgCAEQgCAEAAAEIgCAKIAAA1IggAAIAAhqIAfAAIAAAOIABAAIAEgGIAHgFIAIgEQAFgCAGAAQANAAAHAEQAIAEAEAHQAEAHACAJQACAJgBALIAAA6g");
	this.shape_360.setTransform(98.1,195.075);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAIADAKQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgEQAFgDAFgGIAXARQgIAKgMAGQgMAFgNAAQgMAAgLgEgAAWgLQAAgIgGgHQgGgFgJAAQgEAAgEABQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_361.setTransform(85.475,195.2);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#000000").s().p("AgfAzQgIgEgEgHQgFgGgBgKQgBgJAAgLIAAg6IAgAAIAAA1IABAIIACAJQABAFAEACQADADAHAAQAFAAAEgCQAEgDACgEQADgEAAgEIAAgJIAAg2IAhAAIAABqIgfAAIAAgOIAAAAIgFAGIgHAFIgIAEQgFACgGAAQgMAAgIgEg");
	this.shape_362.setTransform(72.8,195.325);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#000000").s().p("AAZBQIAAg+IAAAAQgGAIgJADQgJADgJAAQgMAAgJgEQgJgFgGgIQgGgIgEgJQgDgKAAgMQAAgMAEgKQAEgKAGgHQAHgIAKgEQAKgEAMAAIAJACIAKAEIAHAFIAFAGIABAAIAAgOIAeAAIAACcgAgRgqQgHAHAAAMQAAANAHAHQAHAGALAAQANAAAHgGQAHgHAAgNQAAgMgHgHQgHgIgNAAQgLAAgHAIg");
	this.shape_363.setTransform(59.225,197.575);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#000000").s().p("AgSA0QgLgEgIgHQgIgHgEgLQgFgKAAgNQAAgMAFgKQAEgKAIgIQAIgHALgEQALgEAMAAQALAAAJAEQAKAEAGAHQAHAIADAKQAEAKAAAMIAAALIhMAAQACAJAHAFQAGAGAJAAQAIAAAGgEQAFgDAFgGIAXARQgIAKgMAGQgMAFgNAAQgMAAgLgEgAAWgLQAAgIgGgHQgGgFgJAAQgEAAgEABQgEACgDADQgDACgCAEQgCAEAAAEIArAAIAAAAg");
	this.shape_364.setTransform(46.325,195.2);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#000000").s().p("AglA3IAAhqIAhAAIAAARIABAAQAEgKAHgFQAIgFALAAIAFAAIAGABIAAAeIgHgBIgHgBQgKAAgFADQgGADgDAEQgCAFgBAHIgBANIAAAtg");
	this.shape_365.setTransform(35.975,195.075);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#000000").s().p("AgTBUIAAhQIgVAAIAAgaIAVAAIAAgTQAAgIACgIQABgIAFgGQAEgFAHgEQAJgDANAAIAKAAIAJACIgBAcIgFgCIgGgBQgIAAgEADQgEAEAAALIAAAQIAZAAIAAAaIgZAAIAABQg");
	this.shape_366.setTransform(27.175,192.1);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_367.setTransform(10.675,195.325);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_368.setTransform(-1.575,192.225);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAJIACAHQABADADACQADACAGABIAHgBQAEgBADgCIAAASQgEACgFACIgJAAQgMAAgGgDg");
	this.shape_369.setTransform(-12.275,194);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#000000").s().p("AgRAbIAPg1IAUAAIgSA1g");
	this.shape_370.setTransform(-25.175,200.75);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACQgHACgHAAQgNAAgKgEg");
	this.shape_371.setTransform(-33.075,195.325);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#000000").s().p("AgXBRQgJgFgHgHQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgJAHgHQAHgHAJgFQAKgEAMAAQAKAAAKAFQAKAEAGAJIAAhOIAUAAIAACmIgUAAIAAgPQgGAIgKAFQgKAEgKAAQgMAAgKgDgAgNgDQgGADgEAEQgFAFgCAGQgDAHAAAIQAAAIADAHQACAGAFAFQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgFACgGQADgHAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgDQgGgDgIAAQgHAAgHADg");
	this.shape_372.setTransform(-44.775,192.35);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#000000").s().p("AgdA1IAAhnIAUAAIAAARIAAAAQACgFADgDIAHgGIAIgEIAKgCQAFAAAEACIgBAVIgEgBIgGAAQgOAAgGAIQgJAIABAQIAAA0g");
	this.shape_373.setTransform(-54.5,195.2);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgFgKQgDgKAAgMQAAgKADgKQAFgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgEAFgDAHQgDAGABAHQgBAIADAHQADAHAEAEQAEAFAGADQAHACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_374.setTransform(-65.5,195.325);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#000000").s().p("AAbA0IgbhNIAAAAIgZBNIgVAAIgihnIAWAAIAXBNIABAAIAZhNIAUAAIAaBNIABAAIAWhNIAVAAIgiBng");
	this.shape_375.setTransform(-80.4,195.325);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#000000").s().p("AgdA1IAAhnIAUAAIAAARIAAAAQACgFAEgDIAGgGIAIgEIAKgCQAFAAAEACIgBAVIgEgBIgGAAQgOAAgGAIQgJAIABAQIAAA0g");
	this.shape_376.setTransform(-98.5,195.2);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_377.setTransform(-109.125,195.325);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_378.setTransform(-121.375,192.225);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#000000").s().p("AAABBQgFgDgDgGQgDgEgBgHIAAgMIAAg1IgXAAIAAgSIAXAAIAAgdIATAAIAAAdIAcAAIAAASIgcAAIAAAuIAAAJIACAHQABADADACQADACAGABIAHgBQAEgBADgCIAAASQgEACgFACIgJAAQgMAAgGgDg");
	this.shape_379.setTransform(-132.075,194);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgFgKQgDgKAAgMQAAgKADgKQAFgKAIgIQAHgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgFAFgCAHQgCAGgBAHQABAIACAHQACAHAFAEQAEAFAGADQAHACAHAAQAIAAAGgCQAHgDAEgFQAEgEADgHQACgHAAgIQAAgHgCgGQgDgHgEgFQgEgFgHgCQgGgDgIAAQgHAAgHADg");
	this.shape_380.setTransform(-142.15,195.325);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#000000").s().p("AAaA1IAAg8QAAgIgCgFQgCgEgDgEQgDgDgFgBQgEgCgEAAQgGAAgFACQgFACgEAEQgEAFgCAGQgDAHAAAIIAAA1IgTAAIAAhnIATAAIAAARIABAAQAEgJAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAIQADAHAAALIAABBg");
	this.shape_381.setTransform(-160.925,195.2);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#000000").s().p("AgKBOIAAibIAVAAIAACbg");
	this.shape_382.setTransform(-170.1,192.75);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f().s("#FFEB8C").ss(2.9,1,1).p("EAr2gHpIAAgGQAAgogpAAMhWYAAAQgqAAAAAoIAAAGIAAQB");
	this.shape_383.setTransform(64.15,229.85);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FFC85D").s().p("EgrLAKQQgpAAAAgvIAAjCIAAwBQABgtAoAAMBWXAAAQAoAAABAtIAATDQAAAvgpAAg");
	this.shape_384.setTransform(64.15,241.925);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FF8610").s().p("AtCFyQh4AAAAh4IAAnzQAAh4B4AAIaFAAQB4AAAAB4IAAHzQAAB4h4AAgAuIjYIAAG4QAABqByAAIYtAAQByAAAAhqIAAm4QAAhqhyAAI4tAAQhyAAAABqg");
	this.shape_385.setTransform(172.575,94.5);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FFFEAD").s().p("AsWFHQhyAAAAhqIAAm5QAAhqByAAIYtAAQByAAAABqIAAG5QAABqhyAAg");
	this.shape_386.setTransform(172.6,94.875);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#000000").s().p("AgXBQQgJgEgHgHQgHgHgEgLQgEgKAAgLQAAgMAEgKQAEgJAHgHQAHgIAJgEQAKgEAMAAQAKAAAKAFQAKAEAGAJIAAhNIAUAAIAAClIgUAAIAAgPQgGAIgKAFQgKAEgKABQgMAAgKgFgAgNgDQgGADgEAEQgFAFgCAGQgDAHAAAIQAAAIADAGQACAIAFAEQAEAEAGADQAHADAHAAQAIAAAGgDQAGgDAFgEQAEgEACgIQADgGAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgDQgGgCgIAAQgHAAgHACg");
	this.shape_387.setTransform(-122.725,119.6);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#000000").s().p("AAaA2IAAg9QAAgIgCgEQgCgFgDgEQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAEQgEAEgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAIQADAHAAALIAABCg");
	this.shape_388.setTransform(-135.325,122.45);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgEgKgBgMQABgKAEgKQAEgKAHgIQAIgHAKgEQAKgFALAAQALAAAKAFQALAEAHAHQAIAIAEAKQAEAKABAKQgBAMgEAKQgEAKgIAHQgHAHgLAFQgKAEgLAAQgLAAgKgEgAgOggQgGACgEAFQgEAFgDAHQgDAGABAHQgBAIADAHQADAHAEAEQAEAFAGADQAHACAHAAQAIAAAGgCQAHgDAEgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgEgFgHgCQgGgDgIAAQgHAAgHADg");
	this.shape_389.setTransform(-147.95,122.575);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#000000").s().p("AgOAyQgKgDgHgIQgHgGgEgLQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgHAKgEQAKgDALAAQAMAAAKADQALAEAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAOQgIAJgKAEQgKADgMABQgLAAgKgFg");
	this.shape_390.setTransform(-159.375,122.6);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_391.setTransform(-171.225,122.575);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_392.setTransform(-182.375,122.575);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#000000").s().p("AAKBOIAAiCIgbAaIgNgPIAqgkIATAAIAACbg");
	this.shape_393.setTransform(-200.5,120);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#000000").s().p("AAaA2IAAg9QAAgIgCgEQgCgGgDgDQgDgDgFgCQgEgBgEAAQgGAAgFACQgFACgEAFQgEADgCAHQgDAHAAAIIAAA2IgTAAIAAhoIATAAIAAAQIABAAQAEgIAJgFQAJgFALgBQAIABAHACQAHACAFAFQAFAFADAHQADAIAAAKIAABDg");
	this.shape_394.setTransform(31.025,91.3);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#000000").s().p("AgJBOIAAhnIATAAIAABngAgJg0QgFgFAAgFQAAgHAFgEQAEgEAFAAQAGAAAEAEQAFAEgBAHQABAFgFAFQgEAEgGAAQgFAAgEgEg");
	this.shape_395.setTransform(22.25,88.85);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#000000").s().p("AgXBQQgJgDgHgIQgHgHgEgLQgEgKAAgLQAAgMAEgKQAEgJAHgHQAHgIAJgDQAKgFAMAAQAKAAAKAFQAKAFAGAHIAAhMIAUAAIAAClIgUAAIAAgPQgGAIgKAFQgKAFgKAAQgMAAgKgFgAgNgCQgGACgEAEQgFAFgCAGQgDAHAAAIQAAAIADAGQACAIAFAEQAEAEAGADQAHADAHAAQAIAAAGgDQAGgDAFgEQAEgEACgIQADgGAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_396.setTransform(6.525,88.45);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_397.setTransform(-6.075,91.425);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#000000").s().p("AgOAyQgKgDgHgHQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgGAKgEQAKgEALAAQAMAAAKAEQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLAAgKgFg");
	this.shape_398.setTransform(-17.075,91.45);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#000000").s().p("AgWAzQgHgCgFgFQgFgFgDgHQgDgIAAgKIAAhCIATAAIAAA9QAAAGACAGQACAFAEADQADAEAEABIAJABQAFAAAGgCQAFgCAEgEQAEgFACgGQACgHAAgIIAAg1IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAEQgJAFgMABQgHAAgHgDg");
	this.shape_399.setTransform(-28.925,91.55);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#000000").s().p("AgXBQQgJgDgHgIQgHgHgEgLQgEgKAAgLQAAgMAEgKQAEgJAHgHQAHgIAJgDQAKgFAMAAQAKAAAKAFQAKAFAGAHIAAhMIAUAAIAAClIgUAAIAAgPQgGAIgKAFQgKAFgKAAQgMAAgKgFgAgNgCQgGACgEAEQgFAFgCAGQgDAHAAAIQAAAIADAGQACAIAFAEQAEAEAGADQAHADAHAAQAIAAAGgDQAGgDAFgEQAEgEACgIQADgGAAgIQAAgIgDgHQgCgGgEgFQgFgEgGgCQgGgDgIAAQgHAAgHADg");
	this.shape_400.setTransform(-42.025,88.45);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_401.setTransform(-55,91.425);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAAQIABAAQACgEADgEIAHgFIAJgEIAKgCQAEABAEABIAAAWIgGgCIgEAAQgPAAgHAIQgHAIgBAQIAAA1g");
	this.shape_402.setTransform(-64.8,91.3);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#000000").s().p("Ag2BVIAAimIAUAAIAAAPIAAAAQAGgIAKgFQAKgEAKgBQAMABAKAEQAJAEAHAIQAHAHAEAKQAEAKAAALQAAAMgEAKQgEAJgHAHQgHAIgJAEQgKAEgMAAQgKAAgKgEQgKgGgGgIIAAAAIAABOgAgOg+QgGADgFAEQgEAFgDAHQgCAHAAAHQAAAJACAGQADAHAEAEQAFAEAGADQAGADAIgBQAHABAHgDQAGgDAEgEQAFgEACgHQADgGAAgJQAAgHgDgHQgCgHgFgFQgEgEgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_403.setTransform(-75.775,94.4);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_404.setTransform(-94.975,91.425);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#000000").s().p("AgJA0IgrhnIAYAAIAdBPIAfhPIAVAAIgqBng");
	this.shape_405.setTransform(-106.6,91.425);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#000000").s().p("AgXA1QgGgCgFgEQgFgEgDgGQgCgGAAgHQAAgKAEgHQAFgHAHgDQAIgFALgCQAJgBAMAAIAPAAIAAgFIgCgIIgFgHQgDgDgFgCQgEgCgHAAIgJABIgIADIgGAEIgFAEIgMgMQAIgIALgEQAMgEAJAAQALAAAJADQAIADAGAFQAFAFADAGQACAGAAAHIAAA0IAAAKIAAAJIgRAAIgBgQIAAAAQgGALgKAEQgIAEgLAAQgIAAgHgCgAABADIgMADQgGACgEAEQgEAEAAAGQAAAJAGAEQAHAEAKAAQAHAAAFgDQAHgCACgFQAEgEACgGQABgFABgFIAAgHIgLAAIgPABg");
	this.shape_406.setTransform(-117.95,91.425);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#000000").s().p("AAcA0IgchNIAAAAIgYBNIgWAAIgihnIAWAAIAYBNIAAAAIAZhNIAUAAIAbBNIAAAAIAWhNIAVAAIghBng");
	this.shape_407.setTransform(-131.85,91.425);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_408.setTransform(-152.425,91.425);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#000000").s().p("AAaBTIAAg9QAAgIgCgFQgCgFgDgDQgDgCgFgCQgEgBgEAAQgGAAgFACQgFACgEADQgEAEgCAHQgDAHAAAJIAAA1IgTAAIAAilIATAAIAABOIABAAQAEgIAJgFQAJgGALAAQAIAAAHADQAHACAFAFQAFAFADAHQADAHAAAKIAABDg");
	this.shape_409.setTransform(-164.675,88.325);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgFgBgGIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADABAGAAIAHAAQAEAAADgCIAAASQgEABgFABIgJABQgMAAgGgDg");
	this.shape_410.setTransform(-175.375,90.1);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#000000").s().p("AgNBVIAAhXIgXAAIAAgRIAXAAIAAgXQAAgVAIgLQAIgKATAAIAGAAIAIACIgCARIgFgBIgGgBQgFABgDABQgEACgCADQgCADgBAFIAAAJIAAAYIAYAAIAAARIgYAAIAABXg");
	this.shape_411.setTransform(-188.75,88.2);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQALAAALAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgLAEgLAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_412.setTransform(-198.9,91.425);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#000000").s().p("AgXAzQgJgEgIgLIAPgMIALAJQAGADAIAAIAHAAIAHgDIAEgEQACgCAAgEQAAgEgDgDIgGgFIgIgCIgHgCIgMgDQgGgCgEgDQgEgDgDgFQgDgFAAgIQAAgIAEgGQADgGAGgEQAFgEAHgCQAIgCAGAAQAKAAAKAEQAKAEAFAKIgPALQgDgEgGgDQgFgDgHAAQgGAAgFADQgGADAAAGQAAAEADADIAHAFIAIACIAIACIAMAEQAGACAEACQAEAEACAFQACAFAAAHQAAAJgDAGQgEAGgGAEQgGAEgIACIgOACQgNAAgKgEg");
	this.shape_413.setTransform(63.875,60.275);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_414.setTransform(53.025,60.275);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_415.setTransform(44.25,57.175);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#000000").s().p("AgOAyQgKgEgHgGQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgGAKgEQAKgEALgBQAMABAKAEQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLgBgKgEg");
	this.shape_416.setTransform(36.725,60.3);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#000000").s().p("AgpBOQgEAAgEgCIADgSQAGACAFAAQAFAAADgBQADgBACgDIAFgFIACgHIAHgRIgshoIAYAAIAdBRIABAAIAdhRIAWAAIgyB+IgEANIgHAJQgEAEgGACQgFADgJAAIgJgBg");
	this.shape_417.setTransform(25.5,62.925);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#000000").s().p("AgOAyQgKgEgHgGQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgGAKgEQAKgEALgBQAMABAKAEQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLgBgKgEg");
	this.shape_418.setTransform(15.125,60.3);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_419.setTransform(-2.825,60.275);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#000000").s().p("AAABBQgFgDgDgFQgDgGgBgFIAAgOIAAg1IgXAAIAAgRIAXAAIAAgdIATAAIAAAdIAcAAIAAARIgcAAIAAAvIAAAIIACAIQABAEADACQADACAGAAIAHgBQAEgBADgBIAAASQgEACgFAAIgJABQgMAAgGgDg");
	this.shape_420.setTransform(-13.525,58.95);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_421.setTransform(-23.225,60.275);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#000000").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_422.setTransform(-32,57.175);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#000000").s().p("Ag2BVIAAimIAUAAIAAAPIAAAAQAGgIAKgFQAKgEAKAAQAMAAAKAEQAJAEAHAIQAHAHAEAKQAEAKAAALQAAAMgEAKQgEAJgHAHQgHAIgJAEQgKAEgMAAQgKAAgKgEQgKgGgGgIIAAAAIAABOgAgOg+QgGADgFAEQgEAFgDAHQgCAGAAAIQAAAJACAGQADAHAEAFQAFADAGADQAGACAIABQAHgBAHgCQAGgDAEgDQAFgFACgHQADgGAAgJQAAgIgDgGQgCgHgFgFQgEgEgGgDQgHgDgHAAQgIAAgGADg");
	this.shape_423.setTransform(-41.125,63.25);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#000000").s().p("AA7A2IAAg6IgBgLQgBgGgCgEQgCgEgFgDQgEgCgIAAQgOAAgGAJQgGAIAAAOIAAA5IgTAAIAAg2IgBgOQAAgGgDgFQgCgEgEgDQgFgCgHAAQgFAAgFACQgFADgEAEQgEADgCAHQgCAGAAAJIAAA2IgUAAIAAhoIATAAIAAARIAAAAIAEgGQACgDAFgDIAKgGQAGgBAGAAQAMAAAIAEQAHAGAFAJQAFgJAJgGQAKgEAJAAQAMAAAIADQAIAFAEAGQAEAHACAHQACAJAAAJIAAA8g");
	this.shape_424.setTransform(-57.475,60.15);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#000000").s().p("AgVAzQgKgFgIgHQgHgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAHgIQAIgHAKgEQAKgFALAAQALAAALAFQAKAEAHAHQAIAIAEAKQAFAKAAAKQAAAMgFAKQgEAKgIAHQgHAHgKAFQgLAEgLAAQgLAAgKgEgAgNggQgHACgEAFQgEAFgDAHQgCAGAAAHQAAAIACAHQADAHAEAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAEgEACgHQADgHAAgIQAAgHgDgGQgCgHgEgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_425.setTransform(-73.35,60.275);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#000000").s().p("AgOAyQgKgEgHgGQgHgIgEgKQgEgKAAgLQAAgMAEgKQAEgKAHgIQAHgGAKgEQAKgEALgBQAMABAKAEQALADAHAJIgPAOQgFgGgGgDQgGgDgJAAQgHAAgGADQgGADgEAFQgEAFgCAHQgCAHAAAGQAAAHACAGQADAHAEAFQAEAEAHADQAFADAHAAQAJAAAGgDQAGgDAFgGIAOAPQgIAIgKAEQgKAEgMAAQgLgBgKgEg");
	this.shape_426.setTransform(-84.775,60.3);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#000000").s().p("AgNBVIAAhXIgXAAIAAgRIAXAAIAAgXQAAgVAIgLQAIgKATAAIAGAAIAIACIgBARIgGgBIgGAAQgFAAgDABQgEACgCADQgCADAAAEIgBAKIAAAYIAXAAIAAARIgXAAIAABXg");
	this.shape_427.setTransform(-100.3,57.05);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#000000").s().p("AgVAzQgKgFgHgHQgIgHgEgKQgFgKAAgMQAAgKAFgKQAEgKAIgIQAHgHAKgEQAKgFALAAQAMAAAKAFQAKAEAHAHQAIAIAEAKQAFAKgBAKQABAMgFAKQgEAKgIAHQgHAHgKAFQgKAEgMAAQgLAAgKgEgAgNggQgHACgEAFQgFAFgCAHQgDAGAAAHQAAAIADAHQACAHAFAEQAEAFAHADQAGACAHAAQAIAAAGgCQAGgDAFgFQAFgEACgHQACgHAAgIQAAgHgCgGQgCgHgFgFQgFgFgGgCQgGgDgIAAQgHAAgGADg");
	this.shape_428.setTransform(-110.45,60.275);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#000000").s().p("AgdA2IAAhoIATAAIAAARIABAAQACgFAEgEIAGgFIAIgEQAFgCAGABQAEgBAEACIgBAVIgEgBIgGAAQgOAAgGAIQgJAIAAAQIAAA1g");
	this.shape_429.setTransform(-126.75,60.15);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#000000").s().p("AgUAzQgKgEgHgIQgHgHgEgKQgDgKAAgMQAAgLAEgKQAEgKAHgHQAHgHAKgEQAKgFAKAAQAOAAAKAFQAJAFAHAIQAGAIADAJQACAKAAAJIAAAHIhSAAQAAAHADAGQADAGAEADQAFAEAHADQAGACAGAAQAJAAAHgFQAHgEAGgHIAOAMQgQAVgeAAQgLAAgKgEgAgLgjQgGADgEAEQgFAFgCAFQgCAFAAAGIA9AAIgCgMQgCgGgEgEQgDgEgGgCQgGgDgHAAQgGAAgGADg");
	this.shape_430.setTransform(-137.375,60.275);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#000000").s().p("AgSBQQgKgFgGgIIAAAAIAAAPIgUAAIAAilIAUAAIAABMIAAAAQAGgHAKgFQAKgFAKAAQAMAAAKAFQAJADAHAIQAHAHAEAJQAEAKAAAMQAAALgEALQgEAKgHAHQgHAIgJADQgKAEgMABQgKAAgKgFgAgOgCQgGACgFAEQgEAEgDAIQgCAGAAAIQAAAIACAGQADAIAEAEQAFAEAGADQAGADAIAAQAHAAAHgDQAGgDAEgEQAFgEACgIQADgGAAgIQAAgIgDgGQgCgIgFgEQgEgEgGgCQgHgDgHgBQgIABgGADg");
	this.shape_431.setTransform(-149.975,57.3);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#000000").s().p("AA7A2IAAg6IgBgLQgBgGgCgEQgCgEgFgDQgEgCgIAAQgOAAgGAJQgGAIAAAOIAAA5IgTAAIAAg2IgBgOQAAgGgDgFQgCgEgEgDQgFgCgHAAQgFAAgFACQgFADgEAEQgEADgCAHQgCAGAAAJIAAA2IgUAAIAAhoIATAAIAAARIAAAAIAEgGQACgDAFgDIAKgGQAGgBAGAAQAMAAAIAEQAHAGAFAJQAFgJAJgGQAKgEAJAAQAMAAAIADQAIAFAEAGQAEAHACAHQACAJAAAJIAAA8g");
	this.shape_432.setTransform(-166.325,60.15);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#000000").s().p("AgWAzQgHgCgFgFQgFgFgDgHQgDgIAAgKIAAhCIATAAIAAA9QAAAGACAGQACAFAEADQADAEAEABIAJABQAFAAAGgCQAFgCAEgEQAEgFACgGQACgHAAgIIAAg1IAUAAIAABnIgUAAIAAgQIAAAAQgEAJgJAFQgJAEgMABQgHgBgHgCg");
	this.shape_433.setTransform(-181.825,60.4);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#000000").s().p("AApBOIhWh/IAAAAIAAB/IgWAAIAAibIAcAAIBVB/IAAAAIAAh/IAVAAIAACbg");
	this.shape_434.setTransform(-196.7,57.7);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f().s("#74492A").ss(4,1,1).p("Egy7gIwMBl3AAAQB7AAAAB7IAANrQAAB7h7AAMhl3AAAQh7AAAAh7IAAtrQAAh7B7AAg");
	this.shape_435.setTransform(122.025,89.05);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#FFCC66").s().p("Egy7AIxQh7AAAAh7IAAtrQAAh7B7AAMBl3AAAQB7AAAAB7IAANrQAAB7h7AAg");
	this.shape_436.setTransform(122.025,89.05);

	this.popup_mc = new lib.onecompletewave_mccopy3();
	this.popup_mc.name = "popup_mc";
	this.popup_mc.parent = this;
	this.popup_mc.setTransform(83.05,-100.1,1,1,0,0,0,171.5,104.4);

	this.paused1_mc = new lib.paused_mc();
	this.paused1_mc.name = "paused1_mc";
	this.paused1_mc.parent = this;
	this.paused1_mc.setTransform(-346.05,253.2,1,1,0,0,0,44.7,17.1);

	this.replay1_mc = new lib.replay_ptn();
	this.replay1_mc.name = "replay1_mc";
	this.replay1_mc.parent = this;
	this.replay1_mc.setTransform(-457.5,282.95,1,1,0,0,0,66.2,27.8);

	this.popup1_mc = new lib.onecompletewave_mccopy2();
	this.popup1_mc.name = "popup1_mc";
	this.popup1_mc.parent = this;
	this.popup1_mc.setTransform(43.9,-100.1,1,1,0,0,0,171.5,104.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.hide1_mc},{t:this.hint1_mc}]},6).to({state:[{t:this.popup_mc}]},1).to({state:[{t:this.popup1_mc},{t:this.replay1_mc},{t:this.paused1_mc}]},1).wait(1));

	// bg
	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#8DACBD").s().p("Ao8CKQjtg5gBhRQABhQDtg5QDtg5FPAAQFPAADuA5QDtA5ABBQQgBBRjtA5QjuA5lPAAQlPAAjtg5g");
	this.shape_437.setTransform(-355.95,99.1);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#BFE8FF").s().p("EhXlAywMAAAgj8IAIAAMAAAgpPQAAgxARghIAA0zQAAiPCMAAMCsgAAAMAAABBjIAGAAMAAAAj8gEhAgAMvQjtA4AABRQAABRDtA5QDuA6FPAAQFQAADtg6QDug5AAhRQAAhRjug4Qjtg5lQgBQlPABjuA5g");
	this.shape_438.setTransform(-0.375,3.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_438},{t:this.shape_437}]}).wait(9));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-584,-322.6,1198.4,651.3);


// stage content:
(lib.frequency_5a = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		var self = this;
		var scope = this;
		scope.audiocont.cursor="default";
		
		Modernizr.on('videoautoplay', function (result) {
			console.log("Modernizr")
			if (result) {
				setTimeout(function () {
					scope.audiocont.visible = false;
					setScope(scope);
				}, 100);
		
		
				console.log('video autoplay is supported');
		
			} else {
				console.log('video autoplay is NOT supported');
				scope.audiocont.visible = true;
				scope.audiocont.playbtn.addEventListener("click", function (event) {
					setScope(scope);
					scope.audiocont.visible = false;
				});
			}
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// sound
	this.audiomc = new lib.Symbol29();
	this.audiomc.name = "audiomc";
	this.audiomc.parent = this;
	this.audiomc.setTransform(1278.2,312.35);

	this.timeline.addTween(cjs.Tween.get(this.audiomc).wait(1));

	// play
	this.audiocont = new lib.Symbol2audio();
	this.audiocont.name = "audiocont";
	this.audiocont.parent = this;
	this.audiocont.setTransform(554.95,314.5);

	this.timeline.addTween(cjs.Tween.get(this.audiocont).wait(1));

	// blocker
	this.blocker = new lib.blocker();
	this.blocker.name = "blocker";
	this.blocker.parent = this;
	this.blocker.setTransform(-15.3,-18.8);
	new cjs.ButtonHelper(this.blocker, 0, 1, 2, false, new lib.blocker(), 3);

	this.timeline.addTween(cjs.Tween.get(this.blocker).wait(1));

	// css
	this.instance = new lib.an_CSS({'id': '', 'href':'assets/style.css'});

	this.instance.setTransform(1266.35,156.05,1,1,0,0,0,50,11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 5a
	this.timer_txt = new lib.an_TextInput({'id': 'timer_txt', 'value':'', 'disabled':true, 'visible':true, 'class':'ui-textinput'});

	this.timer_txt.setTransform(205.1,513.6,1.68,2.4091,0,0,0,49.8,10.9);

	this.fivea_mc = new lib._5a();
	this.fivea_mc.name = "fivea_mc";
	this.fivea_mc.parent = this;
	this.fivea_mc.setTransform(543.65,318.85,1,1,0,0,0,-10.8,3.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.fivea_mc},{t:this.timer_txt}]}).wait(1));

	// 7
	this.endscreen_mc = new lib.first_screen1();
	this.endscreen_mc.name = "endscreen_mc";
	this.endscreen_mc.parent = this;
	this.endscreen_mc.setTransform(570,315.5,1,1,0,0,0,16,1);

	this.timeline.addTween(cjs.Tween.get(this.endscreen_mc).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(375,282.8,948,367.49999999999994);
// library properties:
lib.properties = {
	id: '23720D2AD4EE3E41B289E954EE41913C',
	width: 1108,
	height: 629,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/frequency_5a_atlas_.png?1598719843399", id:"frequency_5a_atlas_"},
		{src:"sounds/_5a_VO1.mp3?1598719843908", id:"_5a_VO1"},
		{src:"sounds/_5c_VO1.mp3?1598719843908", id:"_5c_VO1"},
		{src:"sounds/_5d_VO1.mp3?1598719843908", id:"_5d_VO1"},
		{src:"sounds/_5e_VO1.mp3?1598719843908", id:"_5e_VO1"},
		{src:"sounds/_5f_VO1.mp3?1598719843908", id:"_5f_VO1"},
		{src:"sounds/_6a_VO1.mp3?1598719843908", id:"_6a_VO1"},
		{src:"sounds/_7_VO1.mp3?1598719843908", id:"_7_VO1"},
		{src:"js/jquery-2.2.4.min.js?1598719843908", id:"lib/jquery-2.2.4.min.js"},
		{src:"components/sdk/anwidget.js?1598719843908", id:"sdk/anwidget.js"},
		{src:"components/ui/src/textinput.js?1598719843909", id:"an.TextInput"},
		{src:"components/ui/src/css.js?1598719843909", id:"an.CSS"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['23720D2AD4EE3E41B289E954EE41913C'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
function _updateVisibility(evt) {
	if((this.getStage() == null || this._off || this._lastAddedFrame != this.parent.currentFrame) && this._element) {
		this._element.detach();
		stage.removeEventListener('drawstart', this._updateVisibilityCbk);
		this._updateVisibilityCbk = false;
	}
}
function _handleDrawEnd(evt) {
	var props = this.getConcatenatedDisplayProps(this._props), mat = props.matrix;
	var tx1 = mat.decompose(); var sx = tx1.scaleX; var sy = tx1.scaleY;
	var dp = window.devicePixelRatio || 1; var w = this.nominalBounds.width * sx; var h = this.nominalBounds.height * sy;
	mat.tx/=dp;mat.ty/=dp; mat.a/=(dp*sx);mat.b/=(dp*sx);mat.c/=(dp*sy);mat.d/=(dp*sy);
	this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
	var x = (mat.tx + this.regX*mat.a + this.regY*mat.c - this.regX);
	var y = (mat.ty + this.regX*mat.b + this.regY*mat.d - this.regY);
	var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
	this._element.setProperty('transform', tx);
	this._element.setProperty('width', w);
	this._element.setProperty('height', h);
	this._element.update();
}

function _tick(evt) {
	var stage = this.getStage();
	stage&&stage.on('drawend', this._handleDrawEnd, this, true);
	if(!this._updateVisibilityCbk) {
		this._updateVisibilityCbk = stage.on('drawstart', this._updateVisibility, this, false);
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;