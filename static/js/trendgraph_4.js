// Load the CSV data using D3.js
console.log('test')
//d3.csv("static/data/trendchart.csv").then(data => {
d3.json("/trendchart").then(data=>{
    let years = new Set();
    let dataByYear = {};
    let aggregatedDataByYear = [];

    //test
    console.log("data");
    console.log(data);

    // Prepare the data for plotting
    //for individual year view
    data.forEach(d => {
        // Parse 'year-month' format strings into Date objects
        let [yearStr, monthStr] = d.month_year.split('-');
        let year = parseInt(yearStr, 10);
        let month = parseInt(monthStr, 10) - 1; // Subtract 1 because JavaScript months are zero-based
        d.month_year = new Date(year, month);
        //add 
        d.total_assets= +d.total_assets;
        d.count = +d.count;

        if (!years.has(year)) {
            years.add(year);
            dataByYear[year] = [];
        }

        dataByYear[year].push(d);
    });
    //test
    console.log("dataByYear");
    console.log(dataByYear);

    // //for all years view (use for loop)
    for (year in dataByYear) {
        let yearData = dataByYear[year];
        
        // Calculate the sum of total_assets and count for the year
        let totalAssetsSum = yearData.reduce((acc, d) => acc + d.total_assets, 0);
        let countSum = yearData.reduce((acc, d) => acc + d.count, 0);
        
        // Store the aggregated values in the new object
        aggregatedDataByYear[year] = {
            total_assets: totalAssetsSum,
            count: countSum
        };
    };

    //test
    console.log("aggregatedDataByYear");
    console.log(aggregatedDataByYear);

    // prepare x and y values
    var agg_years = Object.keys(aggregatedDataByYear);
    var totalAssetsByYear = agg_years.map(year => Math.round(aggregatedDataByYear[year].total_assets/1000));
    var totalCountsByYear = agg_years.map(year => aggregatedDataByYear[year].count);

    //test
    console.log("agg_years");
    console.log(agg_years);
    console.log("totalAssetsByYear");
    console.log(totalAssetsByYear);
    console.log("totalCountsByYear");
    console.log(totalCountsByYear);

    //DROPDOWN
    // Create the dropdown for filtering by year
    var yearDropdown = d3.select("#yearDropdown"); //store html dropdown using d3
    //add option for "all years"
    yearDropdown.append("option").attr("value", "all" ).text("All Years");
    //add option for each year
    years.forEach(year => {
        yearDropdown.append("option") //add an option for each year
            .attr("value", year)
            .text(year);
    });

    //PREPARE INITIAL PLOTLY CHART
    // Set up the Plotly chart layout and traces
    var layout = {
        title: 'Assets and Counts by Year',
        xaxis: { 
            title: 'Year',
            type: 'date',
            tickformat: '%Y',
            //dtick: 'M1'
        },
        yaxis: { 
            title: 'Total Assets (Millions)',
            range: [0, Math.max(...totalAssetsByYear)]
        },
        yaxis2: {
            title: 'Number of Bank Failures',
            overlaying: 'y',
            side: 'right',
            tickmode: 'linear',
            range: [0,25],
            dtick: 25,
            range: [0, Math.max(...totalCountsByYear)],
            anchor: 'free',
            position: 1,
        }
    };

    var trace1 = {
        x: agg_years,
        y: totalAssetsByYear,
        mode: 'lines+markers',
        name: 'Total Assets',
        yaxis: 'y1', //use y-axis to the left
        marker: {
            symbol: 'circle',
            size: 6,
            color: 'blue'
        }
    };
    var trace2 = {
        x: agg_years,
        y: totalCountsByYear,
        mode: 'lines+markers',
        name: 'Bank Failures',
        yaxis: 'y2', //use y-axis to the right
        marker: {
            symbol: 'square',
            size: 6,
            color: 'red'
        }
    };
    var traces = [trace1, trace2];

    // Render the initial chart
    Plotly.newPlot('chart', traces, layout);

    // Create a function to update the chart based on the selected year
    function updateChart(year) {
        //grab the chosen year's data
        var yearData = dataByYear[year]; 
        //grab max values
        var maxValue = Math.max(...yearData.map(d => d.total_assets)) /1000; //get max value of assets

        //delete layout elements to be updated:
        delete layout.yaxis.range;
        delete layout.yaxis.dtick;
        delete layout.yaxis2.range;
        delete layout.yaxis2.dtick;
        // layout.yaxis2.range = [0,25];
        // layout.yaxis2.range = 5;

        //create conditional if max value is over 50k to adjust range of y-axises
        if (maxValue > 50000) {
            var layout_update = {
                title: 'Assets and Counts by Month' + ' (' + year + ')',
                xaxis: { //set x-axis to increment by months
                    title: 'Month',
                    type: 'date',
                    tickformat: '%b',
                    dtick: 'M1' // display tick for every month
                },
                yaxis: { //set y-axis to increment by 5000
                    title: 'Total Assets (Millions)',
                    range: [0, Math.max(...totalAssetsByYear)]
                    //dtick: 5000,
                },
                yaxis2: { //set y-axis to increment by 5000
                    title: 'Number of Bank Failures',
                    overlaying: 'y',
                    side: 'right',
                    tickmode: 'linear',
                    range: [0,175],
                    dtick: 25,
                },
    
            };
        } else {
            var layout_update = {
                title: 'Assets and Counts by Month' + ' (' + year + ')',
                xaxis: { //set x-axis to increment by months
                    title: 'Month',
                    type: 'date',
                    tickformat: '%b',
                    dtick: 'M1' // display tick for every month
                },
                yaxis: { //set y-axis to increment by 5000
                    title: 'Total Assets (Millions)',
                    range: [0,50000],
                    dtick: 5000,
                },
                yaxis2: { //set y-axis to increment by 5000
                    title: 'Number of Bank Failures',
                    overlaying: 'y',
                    side: 'right',
                    tickmode: 'linear',
                    range: [0,25],
                    dtick: 5,
                },
    
            };
        };
        //update layout
        // var layout_update = {
        //     title: 'Assets and Counts by Month' + ' (' + year + ')',
        //     xaxis: { //set x-axis to increment by months
        //         title: 'Month',
        //         type: 'date',
        //         tickformat: '%b',
        //         dtick: 'M1' // display tick for every month
        //     },
        //     yaxis: { //set y-axis to increment by 5000
        //         title: 'Total Assets (Millions)',
        //         range: [0,50000],
        //         dtick: 5000,
        //     },
        //     yaxis2: { //set y-axis to increment by 5000
        //         title: 'Number of Bank Failures',
        //         overlaying: 'y',
        //         side: 'right',
        //         tickmode: 'linear',
        //         range: [0,25],
        //         dtick: 5,
        //     },

        // };
        //update plotlines
        trace1.x = yearData.map(d => d.month_year);
        trace1.y = yearData.map(d => Math.round(d.total_assets / 1000));
        trace2.x = yearData.map(d => d.month_year);
        trace2.y = yearData.map(d => d.count);
        
        var data_update = {
            x: [trace1.x, trace2.x], 
            y: [trace1.y, trace2.y]
        };
            // //use if/else to change yaxis range based on max value of assets for year  
            // if (maxValue > 50000000) {
            //     layout.yaxis.range = [0, 2000000];
            // } else {
            //     layout.yaxis.range = [0, 50000]; // Set the range for other years
            //     layout.yaxis.dtick = 5000;
            // };
        // }
        // Render the chart with the updated traces
        //Plotly.update('chart', { x: [trace1.x, trace2.x], y: [trace1.y, trace2.y] }, layout_update);
        Plotly.update('chart', data_update, layout_update);
    }

    function updateOriginal() {
        delete layout.yaxis.range;
        delete layout.yaxis.dtick;

        layout.yaxis.range = [0, Math.max(...totalAssetsByYear)];
        layout.yaxis2.range = [0,Math.max(...totalCountsByYear)];
        layout.yaxis2.dtick = 25;
        layout.yaxis2.anchor = 'free';
        layout.yaxis2.position = 1;
        
        var layout_update = {
            title: 'Assets and Counts by Year',
            xaxis: { 
                title: 'Year',
                type: 'date',
                tickformat: '%Y',
                //dtick: 'M1'
            },
        };
        //update plotlines
        trace1.x = agg_years;
        trace1.y = totalAssetsByYear;
        trace2.x = agg_years;
        trace2.y = totalCountsByYear;
        
        var data_update = {
            x: [trace1.x, trace2.x], 
            y: [trace1.y, trace2.y]
        };
        // Render the chart with the updated traces
        Plotly.update('chart', data_update, layout_update);
    }


    // Attach an event listener to the dropdown
    yearDropdown.on("change", function () {
        const selectedYear = this.value;
        console.log(selectedYear);
        if (selectedYear === 'all') { 
            //Update chart with original data
            updateOriginal();
        } else {
            // Update chart with data in selected year. 
            updateChart(selectedYear);
        }
    });

// }).catch(error => {
//     console.error("Error loading CSV data:", error);
});