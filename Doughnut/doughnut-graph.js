function CreateDoughnutGraph(data, graphElement) {
    var firstItem = data[0];

    var graphSide = 300;
    var doughnutWidth = 60;

    var radius = Math.min(graphSide, graphSide) / 2;
    var innerRadius = radius - doughnutWidth;

    var chart = graphElement.append("svg:svg").data([firstItem.Atmosphere])
                            .attr("width", graphSide)
                            .attr("height", graphSide)
                            .append("svg:g")
                            .attr("transform", "translate(" + radius + "," + radius + ")");
    var pie = d3.layout.pie().value(function (atmosphere) { return atmosphere.Percent });
    var arc = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(innerRadius);
    var arcs = chart.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
    .attr("fill", function (sector, index) {
        return sector.data.DataColour;
    })
    .attr("d", function (sector) {
        return arc(sector);
    });
}