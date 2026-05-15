// Barely functional re-implementation of Google Charts API for titration simulator.

var elgo = {
  
  charts: {
    
    load: function() {
      // Do nothing.
    },
    
    setOnLoadCallback: function(onload) {
      onload();
    }
    
  },
  
  visualization: {
    
    events: {
      
      addListener: function(chart, event, listener) {
        var key = '_on' + event;
        if (chart[key] === undefined) {
          chart[key] = [];
        }
        chart[key].push(listener);
      }
      
    },
    
    DataTable: function() {
      
      this.cols = [];
      
      this.rows = [];
      
      this.addColumn = function(type, opt_label) {
        if (arguments.length === 1) {
          this.cols.push(type);
        } else if (arguments.length === 2) {
          this.cols.push({
            type: type,
            label: opt_label,
            id: ''
          });
        } else {
          throw new Error("Unimplemented elgo.visualization.DataTable.addColumn() call");
        }
      }
      
      this.addRows = function(numOrArray) {
        if (typeof numOrArray === 'object') {
          Array.prototype.push.apply(this.rows, numOrArray);
        } else {
          throw new Error("Unimplemented elgo.visualization.DataTable.addRows() call");
        }
      },
      
      this.addRow = function(opt_cellArray) {
        if (arguments.length == 1) {
          this.rows.push(opt_cellArray);
        } else {
          throw new Error("Unimplemented elgo.visualization.DataTable.addRow() call");  
        }
      },
      
      this.getValue = function(rowIndex, columnIndex) {
        return this.rows[rowIndex][columnIndex];
      }
      
      // Not in Google Charts API.
      this._getColumn = function(index) {
        var result = [];
        for (var i = 0; i < this.rows.length; ++i) {
          result.push(this.rows[i][index]);
        }
        return result;
      }
      
    },
    
    LineChart: function(container) {
      
      this.container = container;
      
      this.draw = function(data, options) {
        // Hard-coded values taken from previous Google Charts output.
        var CHART_X = 134;
        var CHART_Y = 20;
        var CHART_WIDTH = 433;
        var CHART_HEIGHT = 278;
        
        var x = d3.scaleLinear()
        .domain([options.hAxis.viewWindow.min, options.hAxis.viewWindow.max])
        .range([CHART_X, CHART_X + CHART_WIDTH]);
        
        var y = d3.scaleLinear()
        .domain([options.vAxis.viewWindow.min, options.vAxis.viewWindow.max])
        .range([CHART_Y + CHART_HEIGHT, CHART_Y]);
        
        var container = d3.select(this.container);
        
        // For simplicity, remove existing chart (if any) completely.
        container.select('svg').remove();
        
        var svg = container.append('svg')
        .attr('width', options.width ? options.width : 400)
        .attr('height', options.height ? options.height : 200);
        
        // Indicator requires first rect to display the gradient.
        svg.append('rect')
        .attr('x', CHART_X)
        .attr('y', CHART_Y)
        .attr('width', CHART_WIDTH)
        .attr('height', CHART_HEIGHT)
        .attr('fill', 'url(#fx)');
        
        var defs = svg.append('defs')
        .append('clipPath')
        .attr('id', 'clipPath')
        .append('rect')
        .attr('x', CHART_X)
        .attr('y', CHART_Y)
        .attr('width', CHART_WIDTH)
        .attr('height', CHART_HEIGHT);
        
        var gridlines = svg.append('g');
        
        var vertical = gridlines.append('g')
        .selectAll('g')
        .data(options.hAxis.ticks)
        .enter()
        .append('g');
        vertical.append('rect')
        .attr('fill', '#cccccc')
        .attr('width', 1)
        .attr('height', CHART_HEIGHT)
        .attr('x', function(d) { return x(d); })
        .attr('y', CHART_Y);
        vertical.append('text')
        .attr('fill', '#444444')
        .attr('font-family', 'Arial')
        .attr('font-size', 13)
        .attr('text-anchor', 'middle')
        .attr('x', function(d) { return x(d) + 0.5; })
        .attr('y', CHART_Y + CHART_HEIGHT + 19.05)
        .text(function(d) { return d });
        
        var horizontal = gridlines.append('g')
        .selectAll('g')
        .data(options.vAxis.ticks)
        .enter()
        .append('g');
        horizontal.append('rect')
        .attr('fill', '#cccccc')
        .attr('width', CHART_WIDTH)
        .attr('height', 1)
        .attr('x', CHART_X)
        .attr('y', function(d) { return y(d); });
        horizontal.append('text')
        .attr('fill', '#444444')
        .attr('font-family', 'Arial')
        .attr('font-size', 13)
        .attr('text-anchor', 'end')
        .attr('x', CHART_X - 13)
        .attr('y', function(d) { return y(d) + 5.5; })
        .text(function(d) { return d });
        
        var primary = gridlines.append('g');
        primary.append('rect')
        .attr('fill', '#333333')
        .attr('width', 1)
        .attr('height', CHART_HEIGHT)
        .attr('x', CHART_X)
        .attr('y', CHART_Y);
        primary.append('rect')
        .attr('fill', '#333333')
        .attr('width', CHART_WIDTH)
        .attr('height', 1)
        .attr('x', CHART_X)
        .attr('y', CHART_Y + CHART_HEIGHT);
        
        var labels = svg.append('g');
        
        labels.append('text')
        .attr('fill', options.hAxis.titleTextStyle.color)
        .attr('font-family', options.hAxis.titleTextStyle.fontName)
        .attr('font-size', options.hAxis.titleTextStyle.fontSize)
        .attr('font-weight', options.hAxis.titleTextStyle.bold ? 'bold' : 'normal')
        .attr('font-style', options.hAxis.titleTextStyle.italic ? 'italic' : 'normal')
        .attr('stroke', 'none')
        .attr('stroke-width', 0)
        .attr('text-anchor', 'middle')
        .attr('x', CHART_X + CHART_WIDTH / 2)
        .attr('y', CHART_Y + CHART_HEIGHT + 93.5)
        .text(options.hAxis.title);
        
        labels.append('text')
        .attr('fill', options.vAxis.titleTextStyle.color)
        .attr('font-family', options.vAxis.titleTextStyle.fontName)
        .attr('font-size', options.vAxis.titleTextStyle.fontSize)
        .attr('font-weight', options.vAxis.titleTextStyle.bold ? 'bold' : 'normal')
        .attr('font-style', options.vAxis.titleTextStyle.italic ? 'italic' : 'normal')
        .attr('stroke', 'none')
        .attr('stroke-width', 0)
        .attr('text-anchor', 'middle')
        .attr('x', CHART_X - 73.5)
        .attr('y', CHART_Y + CHART_HEIGHT / 2)
        .attr('transform', 'rotate(-90 ' + (CHART_X - 73.5) + ' ' + (CHART_Y + CHART_HEIGHT / 2) + ')')
        .text(options.vAxis.title);
        
        var line = d3.line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); });
        
        var chart = svg.append('g')
        .attr('clip-path', 'url(#clipPath)');
        
        chart.datum(data.rows)
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', options.colors[0])
        .attr('stroke-width', options.lineWidth)
        .attr('d', line);
        
        var chartThis = this;
        chart.selectAll('circle')
        .data(data.rows)
        .enter()
        .append('circle')
        .attr('title', function(d) {
          if (options.tooltip) {
            return d[2];
          }
          return '<b>' + d[0] + '</b><br>' + data.cols[1].label + ': <b>' + d[1] + '</b>';
        })
        .attr('class', 'tooltip')
        .attr('r', 5)
        .attr('fill', 'transparent')
        .attr('stroke', 'none')
        .attr('stroke-width', 0)
        .attr('cx', function(d) { return x(d[0]); })
        .attr('cy', function(d) { return y(d[1]); })
        .on('mouseover', function() {
          d3.select(this).attr('fill', 'black');
        })
        .on('mouseout', function() {
          d3.select(this).attr('fill', 'transparent');
        })
        .on('click', function(d, i) {
          $(this).tooltip('close');
          chartThis._selected = i;
          chartThis.draw(data, options);
          if (chartThis._onselect) {
            for (var i = 0; i < chartThis._onselect.length; ++i) {
              chartThis._onselect[i]();
            }
          }
        });
        $('.tooltip').tooltip({
          content: function(e) {
            return $(this).attr('title');
          }
        });
        
        if (this._selected) {
          var selected = svg.append('g')
          .on('click', function() {
            delete chartThis._selected;
            chartThis.draw(data, options);
          });
          selected.append('circle')
          .attr('r', 5)
          .attr('fill', 'white')
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('cx', x(data.rows[this._selected][0]))
          .attr('cy', y(data.rows[this._selected][1]));
          selected.append('circle')
          .attr('r', 3)
          .attr('fill', 'black')
          .attr('stroke', 'none')
          .attr('stroke-width', 0)
          .attr('cx', x(data.rows[this._selected][0]))
          .attr('cy', y(data.rows[this._selected][1]));
        }
        
        if (this._onready) {
          for (var i = 0; i < this._onready.length; ++i) {
            this._onready[i]();
          }
        }
      };
      
      this.getSelection = function() {
        if (this._selected) {
          return [{ row: this._selected }];
        }
        return [undefined];
      }
      
    },
    
    ColumnChart: function(container) {
      
      this.container = container;
      
      this.draw = function(data, options) {
        // Hard-coded values taken from previous Google Charts output.
        var CHART_X = 67;
        var CHART_Y = 38;
        var CHART_WIDTH = 267;
        var CHART_HEIGHT = 124;
        
        var x = d3.scaleBand()
        .domain(data._getColumn(0))
        .rangeRound([CHART_X, CHART_X + CHART_WIDTH])
        .padding(0.2);
        
        var y = d3.scaleLinear()
        .domain([options.vAxis.viewWindow.min, options.vAxis.viewWindow.max])
        .range([CHART_Y + CHART_HEIGHT, CHART_Y]);
        
        var container = d3.select(this.container);
        
        // For simplicity, remove existing chart (if any) completely.
        container.select('svg').remove();
        
        var svg = container.append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', options.width ? options.width : 400)
        .attr('height', options.height ? options.height : 200);
        
        var gridlines = svg.append('g');
        
        var vertical = gridlines.append('g')
        .selectAll('g')
        .data(x.domain())
        .enter()
        .append('g');
        vertical.append('text')
        .attr('fill', '#444444')
        .attr('font-family', 'Arial')
        .attr('font-size', 11)
        .attr('text-anchor', 'middle')
        .attr('x', function(d) { return x(d) + x.bandwidth() / 2; })
        .attr('y', CHART_Y + CHART_HEIGHT + 19.05)
        .text(function(d) { return d });
        
        var horizontal = gridlines.append('g')
        .selectAll('g')
        .data(y.ticks(4))
        .enter()
        .append('g');
        horizontal.append('rect')
        .attr('fill', '#cccccc')
        .attr('width', CHART_WIDTH)
        .attr('height', 1)
        .attr('x', CHART_X)
        .attr('y', function(d) { return y(d); });
        horizontal.append('text')
        .attr('fill', '#444444')
        .attr('font-family', 'Arial')
        .attr('font-size', 11)
        .attr('text-anchor', 'end')
        .attr('x', CHART_X - 13)
        .attr('y', function(d) { return y(d) + 5.5; })
        .text(function(d) { return d });
        
        var primary = gridlines.append('g');
        primary.append('rect')
        .attr('fill', '#333333')
        .attr('width', CHART_WIDTH)
        .attr('height', 1)
        .attr('x', CHART_X)
        .attr('y', CHART_Y + CHART_HEIGHT);
        
        var labels = svg.append('g');
        
        labels.append('text')
        .attr('fill', 'black')
        .attr('font-family', 'Arial')
        .attr('font-size', 11)
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .attr('x', CHART_X)
        .attr('y', CHART_Y - 15.15)
        .text(options.title);
        
        labels.append('text')
        .attr('fill', options.vAxis.titleTextStyle.color)
        .attr('font-family', options.vAxis.titleTextStyle.fontName)
        .attr('font-size', options.vAxis.titleTextStyle.fontSize)
        .attr('font-weight', options.vAxis.titleTextStyle.bold ? 'bold' : 'normal')
        .attr('font-style', options.vAxis.titleTextStyle.italic ? 'italic' : 'normal')
        .attr('stroke', 'none')
        .attr('stroke-width', 0)
        .attr('text-anchor', 'middle')
        .attr('x', CHART_X - 50)
        .attr('y', CHART_Y + CHART_HEIGHT / 2)
        .attr('transform', 'rotate(-90 ' + (CHART_X - 50) + ' ' + (CHART_Y + CHART_HEIGHT / 2) + ')')
        .text(options.vAxis.title);
        
        var chart = svg.append('g')
        .selectAll('rect')
        .data(data.rows)
        .enter()
        .append('rect')
        .attr('fill', '#3366cc')
        .attr('stroke', 'none')
        .attr('stroke-width', 0)
        .attr('x', function(d) { return x(d[0]); })
        .attr('y', function(d) { return y(d[1]); })
        .attr('width', x.bandwidth())
        .attr('height', function(d) { return CHART_Y + CHART_HEIGHT - y(d[1]); });
        
        if (this._onready) {
          for (var i = 0; i < this._onready.length; ++i) {
            this._onready[i]();
          }
        }
      },
      
      this.getImageURI = function() {
        return 'data:image/svg+xml;base64,' + btoa(this.container.innerHTML);
      }
      
    }
    
  }
  
};

// Polyfill for Math.log10().

Math.log10 = Math.log10 || function(x) {
  return Math.log(x) * Math.LOG10E;
};
