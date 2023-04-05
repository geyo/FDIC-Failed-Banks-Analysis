//--------- Bank DropDown and Demographics ---------//

// Load the CSV file using d3.csv
d3.json('banklist_for_dropdowndemo').then(function (data) {
// d3.csv('source_data/banklist_for_dropdowndemo.csv').then(function (data) {
    // Parse the CSV data into an array of objects
    var parsedData = data.map(function (row) {
        return {
            bank_name: row.bank_name,
            city: row.city,
            state: row.state,
            cert: row.cert,
            acquiring_institution: row.acquiring_institution,
            closing_date: row.closing_date,
            fund: row.fund,
            total_assets: row.total_assets,
            total_liabilities: row.total_liabilities,
            net_worth_deficit: row.net_worth_deficit
        };
    });
    console.log('parsedData')
    console.log(parsedData)

    // Get a reference to the dropdown menu element
    var bankDropdown = d3.select('#selDataset');

    parsedData.forEach(function(data){
        bankDropdown.append('option').text(data['bank_name']).property('value', data['bank_name']);
    });

    // Attach an event listener to the dropdown menu
    bankDropdown.on('change', function () {
        loadBankdata()
    });

    loadBankdata()
    function loadBankdata() {
        d3.select('#sample-metadata').html('')
            // Get the selected option
            var selectedOption = bankDropdown.property('value');
    
            // Filter the data to only include rows that match the selected option
            var filteredData = parsedData.filter(function (row) {
                return row['bank_name'] === selectedOption;
            })[0];
    
            // Use D3 to create an HTML table element and populate it with the filtered data
            var table = d3.select('#sample-metadata')
                .append('table').classed('bank-data', true);
    
            var headers = ['bank_name', 'city', 'state', 'cert', 'acquiring_institution', 'closing_date', 'fund', 'total_assets', 'total_liabilities', 'net_worth_deficit'];
            var headers_nice = {'bank_name': 'Bank Name',
                                'city': 'City', 
                                'state': 'State', 
                                'cert': 'Cert', 
                                'acquiring_institution': 'Acquiring Institution', 
                                'closing_date': 'Closing Date', 
                                'fund': 'Fund', 
                                'total_assets': 'Total Assets', 
                                'total_liabilities': 'Total Liabilities', 
                                'net_worth_deficit': 'Net Worth Deficit'};
    
            // console.log(filteredData);
            headers.forEach(function (header) {
                let headerRow = table.append('tr');
                //headerRow.append('th')
                    //.text(header);
                headerRow.append('td').text(headers_nice[header])
                headerRow.append('td').text(filteredData[header])
            });
    }
});
