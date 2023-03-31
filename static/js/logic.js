d3.json('http://localhost:5000/data').then(function(data){
	// console.log(data[0]);
	var myMap=L.map("map", {
	    center: [34.0522, -118.2437],
	    zoom: 5,
	})
	var streetMap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
	streetMap.addTo(myMap);
	
	for (let i=0; i<data.length; i++){
		let each_district=data[i][0];
		let flipped_coord=[];
		for (let j=0; j<each_district.length; j++){
			let each_coord=each_district[j];
			flipped_coord.push([each_coord[1], each_coord[0]]);
		};
		L.polygon(flipped_coord, {color: 'red'}).addTo(myMap);
	};
});