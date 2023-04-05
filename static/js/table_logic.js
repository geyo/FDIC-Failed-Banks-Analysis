//Read in CSV Data File and print
// d3.csv("../../source_data/Project_3_Data_definitions.csv").then(function(datasetText) {
d3.json('Project_3_Data_definitions').then(function(datasetText){
  
  console.log(datasetText);
  //Create the table object
  var table = d3.select('#definitions').append('table')
                .style("border-collapse", "collapse")
                .style("border", "1px black solid");

  // Create Header row and apply style elements
var new_row= table.append('tr').text("Term").style("border", "1px solid #ddd")
.style("padding", "5px")
.style("background-color", "darkblue")
.style("color", "white")
.style("font-weight", "bold")
.style("text-transform", "capitalize").append('td').text("Definition")
new_row.append('td')

  // Create body of table and apply style elements
  for (let i=0; i<datasetText.length; i++){
    var new_row=table.append('tr');
    new_row.style("border", "1px solid #ddd")
    .style("padding", "5px")
    .style("background-color", "white")
    .style("font-weight", "normal")
    .style("font-size", "12px")
    .style("text-transform", "capitalize");
    new_row.append('td').text(datasetText[i]['Term']);
    new_row.append('td').text(datasetText[i]['Definition']);
  }

});