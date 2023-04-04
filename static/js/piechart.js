// Load CSV data using D3.js
d3.csv('../../source_data/balance_sheets_for_database.csv').then(data_csv => {
    console.log(data_csv);

    // Define variables and assign values
    let labels = Object.keys(data_csv[0]).slice(5, 10);
    console.log(labels);
    let total_liabilities = d3.sum(data_csv, function(d) {return +d["Total_Liabilities"]; });
    console.log('total_liabilities: ', total_liabilities);
}).catch(error => {
  console.error('Error getting total_liabilities: ', error);
//     let total_admin_liabilities = d3.sum(data_csv, function(d) {return +d["Administrative Liabilities"]; });
//     console.log(total_admin_liabilities);
//     let total_FDIC_sub_deposit_claim = d3.sum(data_csv, function(d) {return +d["FDIC Subrogated Deposit Claim"]; });
//     console.log(total_FDIC_sub_deposit_claim);
//     let total_uninsured_deposit_claim = d3.sum(csvddata_csvata, function(d) {return +d["Uninsured Deposit Claims"]; });
//     console.log(total_uninsured_deposit_claim);
//     let total_other_liabilities = d3.sum(data_csv, function(d) {return +d["Other Claimant Liabilities"]; });
//     console.log(total_other_liabilities);
//     let total_unproven = d3.sum(data_csv, function(d) {return +d["Unproven Claims"]; });
//     console.log(total_unproven);

  // Create trace
  let trace_pie = {
    values: [20, 20, 20, 20, 20],
    labels: ['a', 'b', 'c', 'd', 'e'],
    type: 'pie'
  };

  // The data array consists of trace
  let data_pie = [trace_pie];

  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot('piechart', data_pie);

}).catch(error => {
  console.error('Uncaught: ', error);
}); 
