function CreateLegend(targetElement, data) {
    var uniqueGases = FlattenDataStructureToGetGasNames(data);

    var legendRows = targetElement.selectAll("div")
                                  .data(uniqueGases)
                                  .enter()
                                  .append("div")
                                  .classed("legend-row", true)
				 
    //Add colour patches				 
    legendRows.append("div")
    //Add name label
    legendRows.append("span").text(function (gas) { return gas.Gas });
}

function FlattenDataStructureToGetGasNames(data) {
    var allGases = new Array();

    for (var index = 0; index < data.length; index++) {
        var gases = data[index].Atmosphere;

        for (var gasIndex = 0; gasIndex < gases.length; gasIndex++) {
            var gas = gases[gasIndex];
            if (!gasIsInCollection(allGases, gas)) {
                allGases.push(gas);
            }
        }
    }

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