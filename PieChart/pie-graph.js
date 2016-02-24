var singleWidth = 300;
var singleHeight = 300;
var radius = singleHeight / 2;

function CreateChart(dataCollection, graphElement) {
    for (var index = 0; index < dataCollection.length; index++) {
        var planet = dataCollection[index];
        addTitle(planet, graphElement);
        createSinglePie(planet, graphElement);
    }
}

function addTitle(data, graphElement) {
    graphElement.append("div").text(data.Planet);
}

function createSinglePie(planet, graphElement) {
    var chart = graphElement.append("svg:svg").data([planet.Atmosphere])
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
}