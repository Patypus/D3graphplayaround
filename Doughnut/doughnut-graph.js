function CreateDoughnutGraph(data, graphElement) {
    var firstItem = data[0].Atmosphere;

    var graphSide = 300;
    var doughnutWidth = 60;

    var radius = Math.min(graphSide, graphSide) / 2;


    var graphSvg = graphElement
                   .append("svg")
                   .attr("height", graphSide)
                   .attr("width", graphSide)
                   .append("g");

    var arc = d3.svg.arc()
              .innerRadius(radius - doughnutWidth)
              .outerRadius(radius)

    var pie = d3.layout.pie()
                .value(function (d) { d.Percent })
                .sort(null);

    var path = graphSvg.selectAll('path')
          .data(pie(firstItem))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function (d, i) {
              return "#fefefe";
          });

}
