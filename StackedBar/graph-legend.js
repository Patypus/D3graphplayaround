function CreateLegend(targetElement, data) {
    var gasNames = FlattenDataStructureToGetGasNames(data);

    targetElement.selectAll("div")
                 .data(gasNames)
                 .enter()
                 .append("div")
                 .append("span").text(function (name) { return name });
}

function FlattenDataStructureToGetGasNames(data) {
    var allGases = new Array();

    for (var index = 0; index < data.length; index++) {
        var gases = data[index].Atmosphere;

        for (var gasIndex = 0; gasIndex < gases.length; gasIndex++) {
            var name = gases[gasIndex].Gas;
            //Add name if it has not appeared before
            if (allGases.indexOf(name) < 0) {
                allGases.push(name);
            }
        }
    }

    return allGases;
}