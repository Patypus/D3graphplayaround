var graphSide = 300;
var doughnutWidth = 60;

var radius = Math.min(graphSide, graphSide) / 2;
var innerRadius = radius - doughnutWidth;

function CreateDoughnutGraph(data, graphElement) {
    var firstItem = data[0];

    for (var index = 0; index < data.length; index++) {
        var planet = data[index];

        var graphContainer = graphElement.append("div").classed("graph-container", true);
        addTitle(graphContainer, planet);
        appendSingleDoughnut(graphContainer, planet);
        createLegend(graphContainer, planet.Atmosphere);
    }
}

function addTitle(graphElement, data) {
    graphElement.append("div")
                .classed("title", true)
                .text(data.Planet);
}

function appendSingleDoughnut(graphElement, planet) {
    var chart = graphElement.append("svg:svg").data([planet.Atmosphere])
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

function createLegend(element, atmospheres) {
    var legend = element.append("div").classed("legend", true);

    for (var index = 0; index < atmospheres.length; index++) {
        var gas = atmospheres[index];
        var row = legend.append("div").classed("legend-row", true);

        row.append("div")
           .classed("colour-marker", true)
           .attr("style", "background-color: " + gas.DataColour);

        row.append("span").text(gas.Gas);
    }
}