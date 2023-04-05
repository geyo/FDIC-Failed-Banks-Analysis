// Load CSV data using D3.js
//d3.csv('source_data/balance_sheets_for_database.csv').then(data_csv => {
d3.json('/balance_sheets_for_database').then(data_json => {
    console.log(data_json);

    // Define variables and assign values
    let total_assets = d3.sum(data_json, function(x) {return +x.total_assets; }); 
    console.log('total_assets: ', total_assets);   
    let total_liabilities = d3.sum(data_json, function(x) {return +x.total_liabilities; }); 
    console.log('total_liabilities: ', total_liabilities);   
    let total_admin_liabilities = d3.sum(data_json, function(x) {return +x.administrative_liabilities; });
    let total_fdic_sub_deposit_claim = d3.sum(data_json, function(x) {return +x.fdic_subrogated_deposit_claim; });
    let total_uninsured_deposit_claim = d3.sum(data_json, function(x) {return +x.uninsured_deposit_claims; });
    let total_other_liabilities = d3.sum(data_json, function(x) {return +x.other_claimant_liabilities; });
    let total_unproven = d3.sum(data_json, function(x) {return +x.unproven_claims; });
    let values = [total_admin_liabilities, total_fdic_sub_deposit_claim, total_uninsured_deposit_claim, total_other_liabilities, total_unproven];
    let total_liabilities_tracked = values.reduce((currentTotal, currentValue) => currentTotal + currentValue);
    console.log('total_liabilities_tracked: ', total_liabilities_tracked);

    let labels = Object.keys(data_json[0]).filter((key, index) => [0, 2, 9, 5, 10].includes(index));
    const labels_clean = labels.map(word => word.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ').replace('Fdic','FDIC'));
    console.log(labels_clean);
    console.log(values);

    // Create trace
var trace_pie = {
  type: 'pie',
  values: values,
  labels: labels_clean,
  rotation: 233.281,
  pull: [0.133,0,0.133,0,0.133],
  textinfo: 'label+value+percent',
  texttemplate: '%{label}: %{value:$,}<i>K</i> (%{percent:.1%})',
  hoverinfo: 'label+value+percent',
  hovertemplate: '%{label}<br>%{value:$,},000<br>%{percent:.1%}<extra></extra>',
  textfont: {size: 14},
  insidetextorientation: 'horizontal',
  automargin: true
};
// The data array consists of trace
var data_pie = [trace_pie]

// Define chart layout
var layout_pie = {
  height: 750,
  width: 1000,
};

// Generate chart and assign to DOM element with ID 'piechart'
try {
  Plotly.newPlot('piechart', data_pie, layout_pie);
} catch (error) {
  console.log('Chart failed to generate: ', error);}

}).catch(error => {
  console.error('Error with code: ', error);
}); 
