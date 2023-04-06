// ------------Bank Failure Map-------------

// create color array for legend 
colorArray = ['darkred', 'orangered', 'orange', 'green', 'blue', 'darkmagenta']

// import csv file
//d3.csv('../source_data/updated_banks_with_coordinates_qbfasset.csv').then(function(data){
d3.json('updated_banks_with_coordinates_qbfasset').then(function(data){
	// console.log(data)

	// create map
	var myMap = L.map('map', {
				center: [37.5522, -100.2437],
				zoom: 4
	}); 
	
	// create tile layer for street map & add to map 
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);

	// for loop cycling through rows in bank data table 
	for (let i=0; i<data.length; i++){
		let currentBank = data[i];

		//set variable names
		latLng = [currentBank['latitude'], currentBank['longitude']]
		assets = currentBank['qbfasset']
		bankNames = currentBank['bank_name']
		failDates = currentBank['faildate']
		cities = currentBank['city']
		states = currentBank['state']
		
		//adjust assets value for marker radius input
		assetRadius = (assets/1000000)+ 2

		// set asset limits for color ranges 
		if (assets > 100000000){var assetColor = 'darkred'}
		else if (assets > 1000000){var assetColor = 'orangered'}
		else if (assets > 100000){var assetColor = 'orange'}
		else if (assets > 50000){var assetColor = 'green'}
		else if (assets > 10000){var assetColor = 'blue'}
		else {var assetColor = 'darkmagenta'}
		// console.log(assets)

		//create markers 
		var layer = L.circleMarker(latLng, 
					{'radius':assetRadius, 'color': assetColor,
					'attribution': 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}
		).addTo(myMap);

		// convert asset values to USD (inserts commas to make number readable)
		var USD_assets = new Intl.NumberFormat('en-US', 
						{ style: 'currency', currency: 'USD'}
		).format(assets);
		// console.log(USD_assets)

		// create marker popup (include Bank Name, Asset Value, Failure Date, Location)
		layer.bindPopup(`<h2>${bankNames}</h2><hr>
						<h4>Adjusted QBF Asset Value: ${USD_assets}<br>
						Bank Failure Date: ${failDates}<br>
						Location: ${cities}, ${states}</h4>`
		).addTo(myMap);//need to update csv file headers to get rid of spacing
	}; //end of for loop 

	// create legend 
	var legend = L.control({position: 'bottomright'});

	// create function to define legend  
	legend.onAdd = function(map) {
		var div = L.DomUtil.create('div', 'legend_info'); 
		colorRanges = ['>$1bn', '$1MM-$1bn', '$100k-$1MM', '$50k-$100k', '$10k-$50k', '<$10k'];
		var labels =[];

		//legend title
		var legend_info = "<p>Adjusted QBF Asset Value: </p>";
		div.innerHTML = legend_info;

		//legend info 
		colorRanges.forEach(function(limit, index) {
			labels.push(`<li><span style= background-color:${colorArray[index]};></span>
			<span class =\"label\">${colorRanges[index]}</span></li>`);
		});
		div.innerHTML += labels.join("");
		// console.log(labels)

		// return statement
		return div;
	};

	//add legend to map	
	legend.addTo(myMap);

});