// Load CSV data using D3.js

//d3.csv('source_data/balance_sheets_for_database.csv').then(data_csv => {
d3.json('/balance_sheets_for_database').then(data_csv => {
    console.log(data_csv);

    // Define variables and assign values
    let labels = Object.keys(data_csv[0]).slice(5, 10);
    console.log(labels);
    let total_liabilities = d3.sum(data_csv, function(x) {return +x.total_liabilities; });
    console.log('total_liabilities: ', total_liabilities);
    let total_admin_liabilities = d3.sum(data_csv, function(x) {return +x.administrative_liabilities; });
    console.log('total_admin_liabilities: ', total_admin_liabilities);
    let total_fdic_sub_deposit_claim = d3.sum(data_csv, function(x) {return +x.fdic_subrogated_deposit_claim; });
    console.log('total_fdic_sub_deposit_claim: ', total_fdic_sub_deposit_claim);
    let total_uninsured_deposit_claim = d3.sum(data_csv, function(x) {return +x.uninsured_deposit_claims; });
    console.log('total_uninsured_deposit_claim: ', total_uninsured_deposit_claim);
    let total_other_liabilities = d3.sum(data_csv, function(x) {return +x.other_claimant_liabilities; });
    console.log('total_other_liabilities: ', total_other_liabilities);
    let total_unproven = d3.sum(data_csv, function(x) {return +x.unproven_claims; });
    console.log('total_unproven: ', total_unproven);

    // Create trace
var trace_pie = {
  values: [total_admin_liabilities, total_fdic_sub_deposit_claim, total_uninsured_deposit_claim, total_other_liabilities, total_unproven],
  labels: labels,
  type: 'pie',
  textinfo: 'label+percent'
};
// The data array consists of trace
var data_pie = [trace_pie]

// Define chart layout
var layout_pie = {
  height: 500,
  width: 800
};

// Generate chart and assign to DOM element with ID 'piechart'
try {
  Plotly.newPlot('piechart', data_pie, layout_pie);
} catch (error) {
  console.log('Chart failed to generate: ', error);}

}).catch(error => {
  console.error('Error with code: ', error);
}); 
