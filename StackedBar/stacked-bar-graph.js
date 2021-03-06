function CreateBarGraph(data, graph, nameOffset) {
    for (var i = 0; i < data.length; i++) {
        var container = graph.append("div")
                             .classed("bar-container", true);

        container.append("div")
                 .classed("planet-name", true)
                 .append("span")
                 .text(data[i].Planet);

        var bar = container.append("div").style("display", "inline-block");

        var widthExcludingName = $(container[0]).width() - nameOffset;

        var scale = d3.scale.linear();
        scale.domain([0, 100]) //0 to 100 %
        scale.range([0, widthExcludingName]); //available width for bar to scale by percent

        CreateSingleStackedBar(bar, data[i].Atmosphere, scale);
    }
}

function CreateSingleStackedBar(element, atmospheres, scale) {
    var containerWidth = $(element[0]).width();

    element.selectAll("div")
           .data(atmospheres)
           .enter()
           .append("div")
           .attr("class", function (d) { return GetDataClassName(d.DataClass) })
           .style("width", function (d) { return scale(d.Percent) + "px"; })
           .on("mouseover", mouseIn)
           .on("mouseout", mouseOut)
}

function mouseIn(data) {
    showTooltipForSection(data);
    addHighlightForSection();
}

function mouseOut(data) {
    removeToolTipForSelection(data);
    removeHighlightForSection();
}

function showTooltipForSection(data) {
    var tooltipDiv = d3.select(".tooltip");
    //colour tooltip for section
    tooltipDiv.classed(GetDataClassName(data.DataClass), true);
    //set tooltip text
    tooltipDiv.select("span").text(data.Gas + ": " + data.Percent + "%");
    //move tooltip to event location
    tooltipDiv.style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY) + "px")
              .style("opacity", 1);
    //show the tooltip
    tooltipDiv.transition()
              .duration(200)
              .style("opacity", 1);
}

function removeToolTipForSelection(data) {
    var tooltipDiv = d3.select(".tooltip");
    //hide the tooltip
    tooltipDiv.transition()
              .duration(200)
              .style("opacity", 0);
    //remove gas specific colour class from tooltip
    tooltipDiv.classed(GetDataClassName(data.DataClass), false);
}

function addHighlightForSection() {
    d3.select(d3.event.currentTarget).style("opacity", 0.6);
}

function removeHighlightForSection() {
    d3.select(d3.event.currentTarget).style("opacity", 1);
}


function GetDataClassName(dataClass) {
    return "bar-segment " + dataClass;
}