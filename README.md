# belly_button_challenge

## Background
The goal of this project is to build an interactive dashboard to explore the [Belly Button Biodiversity dataset](https://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Project Steps

1. Use the D3 library in Javascript to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    * Use sample_values as the values for the bar chart.
    * Use otu_ids as the labels for the bar chart.
    * Use otu_labels as the hovertext for the chart.

3. Create a bubble chart that displays each sample.

    * Use otu_ids for the x values.
    * Use sample_values for the y values.
    * Use sample_values for the marker size.
    * Use otu_ids for the marker colors.
    * Use otu_labels for the text values.

4. Display an individual sample's demographic information in a dahsboard display panel.

    * Loop through each key-value pair from the metadata JSON object and create a text string.
    * Append an html tag with that text to the #sample-metadata panel.

5. Update all the plots when a new sample is selected using the dropdown menu created in step 2. 

6. Deploy your app to GitHub Pages. [Click here for completed dahsboard](https://nicholasjwiid.github.io/belly_button_challenge/).

## Tools and languages used

   * Javascript with D3 and Plotly
   * HTML and CSS

### References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/
