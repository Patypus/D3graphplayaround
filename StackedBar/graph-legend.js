function CreateLegend(targetElement, data) {
    var uniqueGases = flattenDataStructureToGetGasNames(data);

    var legendRows = targetElement.selectAll("div")
                                  .data(uniqueGases)
                                  .enter()
                                  .append("div")
                                  .classed("legend-row", true)
				 
    //Add colour patches				 
    legendRows.append("div")
              .attr("class", function (d) { return GetDataClassName(d.DataClass) })
              .classed("colour-marker", true);
    //Add name label
    legendRows.append("span").text(function (gas) { return gas.Gas });
}

function flattenDataStructureToGetGasNames(data) {
    var allGases = new Array();
    var allAtmospheres = data.map(function (planet) { return planet.Atmosphere });
    var combinedAtmospheres = allAtmospheres.reduce(function (previousCollection, thisCollection) { return previousCollection.concat(thisCollection) }, []);
    
    $.each(combinedAtmospheres, function (i, gasDetails) {
    	var matchesInCollection = $.grep(allGases, function (item) { return gasDetails.Gas === item.Gas });
    	
    	if (matchesInCollection.length === 0) {
			allGases.push(gasDetails);
    	}
    });
    
    return allGases;
}

function GetDisplayClassName(dataClass) {
    return "bar-segment " + dataClass;
}
