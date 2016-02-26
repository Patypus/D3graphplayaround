function CreateLegend(targetElement, data) {
    var uniqueGases = FlattenDataStructureToGetGasNames(data);

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

function FlattenDataStructureToGetGasNames(data) {
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

function gasIsInCollection(collection, gas) {
    for (var index = 0; index < collection.length; index++) {
        if (collection[index].Gas === gas.Gas) {
            return true;
        }
    }
    return false;
}

function GetDisplayClassName(dataClass) {
    return "bar-segment " + dataClass;
}
