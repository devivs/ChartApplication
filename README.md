#Introduction

A line chart application that plots market price of a bitcoin in USD. Daily basis data taken from blockchain.info is used for plotting the chart. The data is stored in the database. A charting library called d3.js is used for plotting. A filter function is also provided to plot chart for a specific period.

X-axis is the date and Y-axis is the USD value. Initially the chart is ploted using the complete data collected from blockcahin.info. When ever the select option changes the chart replotes the data based on the period chosen.


In the source code a user defined function called 'buildLine' is used, which performs the following three operations.

1. Create a scale to map the domain (min and max values) to the svg canvas range.
2. Create the axis for the graph with the above scale.
3. Plot the line with the data in the given scale.

A listner listens for the change in the in the filter when ever change occurse it captures and call update line functions. The function does same as the buildline function, the only difference is that the data were given.

## Quick Start

### Install dependencies:
```
$ npm install
$ bower install
```
### Start the server:
```
$ npm start
```
