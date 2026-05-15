// Window properties
var width = window.innerWidth; var height = window.innerHeight;
var marginL = 60; var marginR = 60; var marginT = 200; var marginB = 60;

// Graphical properties
const radius = 7;
var xCor;

// Numerical display properties
const formatNo = d3.format(".1f");
var colSchemeChose = "none";

// Selected elements, initialise all to true. The update will come when IDs are grabbed.
var dataX = [true, true, true, true, true, true, true, true, true]
//p1, p2, p3, p4, p5, p6, p7, TE, lac/ac
var target = "atomicWeight";


// Graph setup, svg and axis
var dx = height - marginB;

var svg = d3.select("#svg")
    svg.attr("width",width).attr("height",height);
    svg.append("text").attr("class", "chart-title")
        .attr("x", width/4).attr("y", height/9)
        .attr("padding", 0).attr("margin", 0)
        .text("Graph of " + target + " against Atomic Number");
    svg.append("text").attr("class", "ylabel")
        .attr("x", width/20).attr("y", height/6)
        .text(target);
    svg.append("text").attr("class", "units")
        .attr("x", width/20).attr("y", height/5)
        .text("("+unit[target]+")");
    svg.append("text").attr("class", "xlabel")
        .attr("x", width/2.5).attr("y", height - marginB/4)
        .text("Element (arranged by Atomic Number)");

var xAxisGroup = svg.append("g").attr("class","x-axis")
        .attr("transform", "translate( 0 , "+ dx +" )");

var yAxisGroup = svg.append("g").attr("class","y-axis")
        .attr("transform", "translate(" + marginL + ", 0)");

// Update information from graphical displays for calculation
dataX = [p1.checked, p2.checked, p3.checked, 
            p4.checked, p5.checked, p6.checked, 
            p7.checked, p8.checked, p9.checked]

// Make a copy of dataTemp for recalculating
var dataTemp = data;

// update data based on selected Periods/Groups
for (var i = 0; i < dataX.length; i++){
    if ( !dataX[i] ) { dataTemp = dataTemp.filter( d => d["period"] != i + 1 ); };
};
if ( !dataX[7] ) { dataTemp = dataTemp.filter( d => d["group"] != "TE" ); };
if ( !dataX[8] ) { dataTemp = dataTemp.filter( d => d["group"] != "LA" ); };

// Calculate axis
var xIn = dataTemp.map(function(d){ return d["symbol"]});  //Selected elements
var yIn = [0, d3.max(dataTemp.map(function(d){return d[target];}))] //Selected property
var x = d3.scaleBand().range([marginL,width-marginR]);
var y = d3.scaleLinear().range([height-marginB, marginT]);

// Tooltip
var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text(" ");

        tooltip.append("div")
        .attr("class", "tooltip line1")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text(" ");

        tooltip.append("div")
        .attr("class", "tooltip line2")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text(" ");






// Draw chart components based on information HUD
function updateChart(){

    // Update graphical parameters
    var width = window.innerWidth; var height = window.innerHeight;
    dx = height - marginB;
    svg.attr("width", width).attr("height", height);
    svg.select(".chart-title").attr("x", width/4).attr("y", height/9);
    svg.select(".ylabel").attr("x", width/20).attr("y", height/6);
    svg.select(".units").attr("x", width/20).attr("y", height/5);
    svg.select(".xlabel").attr("x", width/2.5).attr("y", height - marginB/4);

    // Check for elements selection
    dataX = [p1.checked, p2.checked, p3.checked, p4.checked, p5.checked, p6.checked, p7.checked, p8.checked, p9.checked]

    // Grab new elements selected
    dataTemp = data;
    for (var i = 0; i < dataX.length; i++){
        if ( !dataX[i] ) { dataTemp = dataTemp.filter( d => d["period"] != i + 1 ); };
    };
    if ( !dataX[7] ) { dataTemp = dataTemp.filter( d => d["group"] != "TE" ); };
    if ( !dataX[8] ) { dataTemp = dataTemp.filter( d => d["group"] != "LA" ); };

    // Calculate x-axis using new elements selection
    xIn = dataTemp.map(function(d){ return d["symbol"]});
    x.domain(xIn);
    xCor = (x(dataTemp.map(function(d){ return d["symbol"] })[1])-x(dataTemp.map(function(d){ return d["symbol"] })[0]))/2;
    
    // Calculate y-axis using new elements selection
    yIn = [0, d3.max(dataTemp.map(function(d){ return d[target];}))]
    y.domain(yIn);

    // Call the calculated axis using new domains
    var xAxisCall = d3.axisBottom(x).tickSizeOuter(0);
    var yAxisCall = d3.axisLeft(y).tickSizeOuter(0).ticks(7,".1f");
    xAxisGroup.call(xAxisCall);
    yAxisGroup.call(yAxisCall);

    // Update axis labels and chart titles
    d3.select(".ylabel").text(target);
    d3.select(".units").text("("+unit[target]+")");
    d3.select(".chart-title").text("Graph of " + target + " against Atomic Number");

    var circs = svg.selectAll("circle").data(dataTemp);
    circs.exit().remove();

    // Update pattern: removed
    circs.transition().duration(1250)
        .attr("cx", function(d){
            return x(d.symbol) + xCor;
        })
        .attr("cy", function(d){
            return y(d[target]);
        })
        .attr("fill", function(d){
            switch (colSchemeChose){
                case "period":
                    return colorPeriod[d["period"]];
                case "group":
                    return colorGroup[d["group"]];
                case "subshell":
                    return colorSubshell[d["subshell"]];
                default:
                    return "gray";
            };
        })
        .attr("r", radius);

    // Update  pattern: appended
    circs.enter().append("circle")
        .attr("cx", function(d){
            return x(d.symbol) + xCor;
        })
        .attr("cy", function(d){
            return y(d[target]);
        })
        .attr("fill", function(d){
            switch (colSchemeChose){
                case "period":
                    return colorPeriod[d["period"]];
                case "group":
                    return colorGroup[d["group"]];
                case "subshell":
                    return colorSubshell[d["subshell"]];
                default:
                    return "gray";
            };
        })
        .attr("opacity", 0.5)
        .attr("r", radius)
        .on("mouseover", function(d){
            tooltip.style("visibility", "visible");
            tooltip.text(d["element"] + " :  " + formatNo(d[target]) + " "  + unit[target]);
            d3.select(this).attr("opacity", "1").style("stroke", "black").style("stroke-width",3).attr("r",2*radius);
        })
        .on("mousemove", function(){
            return tooltip.style("top",
            (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(d){
            tooltip.style("visibility", "hidden");
            tooltip.text("");
            d3.select(this).attr("opacity", "0.5").style("stroke", "none").style("stroke-width",3).attr("r",radius);
        });
        
        
        
        
        
        
        
        
}

updateChart();
console.log(width)
function responsiveD(){
    updateChart();
};

window.addEventListener('resize', responsiveD, false)
