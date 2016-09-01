(function () {
    /*Set the height and weight of the canvas*/

    var h = 600; /*Height of the canvas*/
    var w = 1200; /*Width of the canvas*/
    var padding = 20; /*Padding*/


    // The time format
    var timeFormat = d3.time.format(" %b %Y");

    // Date Conversion
    // Convert unix timestamp to needed date format
    function getDate(d) {
        var strDate = new Date(d * 1000);  // unix timestamp
        return strDate; // Return our date format
    }

    // Domain range for the Scale
    function MinMax(data) {

        // The minimum and maximum date for x-axis
        this.minDate = getDate(data[0].x);
        this.maxDate = getDate(data[data.length - 1].x);

        // The minimum and maximum price for y-axis
        this.minPrice = 0;
        this.maxPrice = d3.max(data, function (d) { return d.y; });

        // Other javascript function to map the lowest value
        // Math.max.apply(Math,data.map(function(d){return d.y;}));

        console.log(this.maxPrice);
    }

    //scales
    // Map the values to our svg canvas range
    function Scales(data) {
        var minmax = new MinMax(data);
        this.xScale = d3.time.scale()
            .domain([minmax.minDate, minmax.maxDate])
            .range([padding + 35, w - padding]).nice();
        this.yScale = d3.scale.linear()
            .domain([minmax.minPrice, minmax.maxPrice])
            .range([h - (padding + 35), 10]).nice();
    }


    // Axis Generator
    function Generator(scales) {
        this.xAxisGen = d3.svg.axis().scale(scales.xScale).orient('bottom').tickFormat(timeFormat);
        this.yAxisGen = d3.svg.axis().scale(scales.yScale).orient('left').ticks(8);
    }


    // Plot the line
    function buildLine(data) {

        var scales = new Scales(data);
        var generator = new Generator(scales);

        // Create the line
        var line = d3.svg.line()
            .x(function (d) { return scales.xScale(getDate(d.x)); })
            .y(function (d) { return scales.yScale(d.y); })
            .interpolate('linear');

        // Create the svg element
        var svg = d3.select("body").append("svg")
            .attr({
                width: w, height: h, "id": "svg-first"
            });

        // Create the Axis
        var xAxis = svg.append('g').call(generator.xAxisGen)
            .attr('class', 'x-axis')
            .attr('transform', 'translate( 0,' + (h - (padding + 35)) + ')')
            .selectAll("text")
            .style("text-anchor", "end")
            .style('font-size', '1em')
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        var yAxis = svg.append('g').call(generator.yAxisGen)
            .attr('class', 'y-axis')
            .attr('transform', 'translate(' + (padding + 35) + ', 0)');

        // Draw the LineChart
        var viz = svg.append('path')
            .attr({
                d: line(data),
                "stroke": "purple",
                "stroke-width": 2,
                "fill": "none",
                "class": "path-first"
            });

        //Add Heading
        svg.append("text")
            .attr("x", (w / 2))
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Market Price (USD)");

        //Add Subheading 
        svg.append("text")
            .attr("x", (w / 2))
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Source: blockchain.info");

        // Add the text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + (w / 2) + " ," + (h) + ")")
            .style("text-anchor", "middle")
            .text("Date");

        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", padding - 15)
            .attr("x", 0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("USD");
    }

    function updateLine(data) {


        var scales = new Scales(data);
        var generator = new Generator(scales);

        // Create the line
        var lineFunction = d3.svg.line()
            .x(function (d) { return scales.xScale(getDate(d.x)); })
            .y(function (d) { return scales.yScale(d.y); })
            .interpolate('linear');

        // Create the svg element
        var svg = d3.select('body').select('#svg-first');

        // Create the Axis
        var xAxis = svg.selectAll('g.x-axis').call(generator.xAxisGen).selectAll("text")
            .style("text-anchor", "end")
            .style('font-size', '1em')
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        var yAxis = svg.selectAll('g.y-axis').call(generator.yAxisGen);


        // Draw the LineChart
        var viz = svg.selectAll('.path-first')
            .attr({
                d: lineFunction(data)
            });

    }

    /*function createLabel(data) {
        // Add Labels
        var labels = svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function (d) {
                return d.y;
            })
            .attr({
                x: function (d) { return d.x * 3 - 25; },
                y: function (d) { return h - d.y; },
                "font-size": "12px",
                "font-family": "sans-serif",
                "fill": "#666666",
                "text-anchor": "start",
                "dy": ".35em",
                "font-weight": function (d, i) {
                    if (i === 0 || i === (data.length - 1)) {
                        return "bold";
                    }
                    else {
                        return "normal";
                    }
                }
            });
    }
*/

    // https://api2.blockchain.info/charts/market-price?cors=true&timespan=all&format=json&lang=en

    //  Get data for ploting the chart
    d3.json("http://localhost:3000/api/linechart", function (error, data) {

        // Error
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
        }

        var dataValue = data.values; // Data for x and y axis
        console.log(dataValue);

        // Draw the chart
        buildLine(dataValue);
    });


    // Filtering the data (On changing the filter)
    d3.select("select")
        .on('change', function (d, i) {
            d3.json("http://localhost:3000/api/linechart", function (error, data) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(data);
                }

                var dataValue = data.values; // Data for x and y axis

                //get selected option
                var sel = d3.select('#date-option').node().value; // Value for the filter
                dataValue.splice(0, dataValue.length - sel); // filtered data

                // Redraw the chart
                updateLine(dataValue);
            });
        });
} ());