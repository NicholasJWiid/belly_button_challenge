// Build the metadata panel
function buildMetadata(sample) {
  let metadata = d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // get the metadata field
    let metadata = data.metadata
    // Filter the metadata for the object with the desired sample number
    let sample_data = metadata.filter(item => item.id == sample)
    // Use d3 to select the panel with id of `#sample-metadata`
    let meta_panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    meta_panel.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    function processMetadata (sample_data) {
      Object.keys(sample_data[0]).forEach(key => {
        meta_panel.append("p").text(`${key.toUpperCase()}: ${sample_data[0][key]}`)
      })
    }
    processMetadata(sample_data)
      
    
  })};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples
    
    // Filter the samples for the object with the desired sample number
    let live_sample = samples.filter(item => item.id == sample)
    let live_sample_sorted = live_sample.sort((a, b) => b.sample_values - a.sample_values)
   
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = live_sample_sorted.map(item => item.otu_ids)
    let top10_otu_ids = otu_ids[0].slice(0, 10).reverse()
    let otu_labels = live_sample_sorted.map(item => item.otu_labels)
    let top10_otu_labels = otu_labels[0].slice(0, 10).reverse()

    let sample_values = live_sample_sorted.map(item => item.sample_values)
    let top10_sample_values = sample_values[0].slice(0, 10).reverse()

    let yticks = top10_otu_ids.map(id => `OTU ${id} `)

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids[0],
      y: sample_values[0],
      text: otu_labels[0],
      mode: 'markers',
      marker: {
        color: otu_ids[0],
        size: sample_values[0],
        colorscale: 'Earth'
      }
    }
    let bubble_data = [trace1]
    let bubble_layout = {
      title: "Bacteria Cultures Per Sample",
      height: 600,
      width: 1250,
      xaxis: {
        title: {
          text: 'OTU ID'
          }
        },
      yaxis: {
        title: {
          text: 'Number of Bacteria',
          }
        }
      }
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubble_data, bubble_layout)

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let trace2 = {
      x: top10_sample_values,
      y: yticks,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    }

    let bar_data = [trace2]
    let bar_layout = {
      title: "Top 10 Bacteria Cultures Found"
    }
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    Plotly.newPlot("bar", bar_data, bar_layout)

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      dropdownMenu.append("option").text(`${name}`)
    })
    
    // Get the first sample from the list
    let first_sample = dropdownMenu.property("value")
    // Build charts and metadata panel with the first sample
    buildCharts(first_sample)
    buildMetadata(first_sample)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the dashboard
init();

