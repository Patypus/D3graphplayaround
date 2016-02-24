function CreateChart(data, graphElement) {
    var testItem = data[0];
    var singleWidth = 300;
    var singleHeight = 300;
    var radius = singleHeight / 2;

    var title = graphElement.append("div").text(testItem.Planet);

    var chart = graphElement.append("svg:svg").data([testItem.Atmosphere])
                            .attr("width", singleWidth)
                            .attr("height", singleHeight)
                            .append("svg:g")
                            .attr("transform", "translate(" + radius + "," + radius + ")");
    var pie = d3.layout.pie().value(function (atmosphere) { return atmosphere.Percent });
    var arc = d3.svg.arc().outerRadius(radius);
        
    var arcs = chart.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
    .attr("fill", function (sector, index) {
        return sector.data.DataColour;
    })
    .attr("d", function (sector) {
        return arc(sector);
    });

    //TODO:
    // - allow for each entry in the data collection 
    // - legend on the left
}