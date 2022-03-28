//initialize the webpage
function init() {
    //selects the dropdown menu
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        //reads the samples
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
    })
}

//calls the init() function
init();

//add the optionChanged function as referenced in the HTML file
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

//declare the buildmetaData function
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        //filters result based on ID chosen from dropdown
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        //the first result is chosen
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        //clears panel variable for new selection
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}