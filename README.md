#Introduction

A line chart application that plots the market price of a bitcoin in USD. Daily basis data taken from blockchain.info is used for plotting the chart. The data is stored in the database. A charting library called d3.js is used for plotting. A filter function is also provided to plot chart for a specific period.

X-axis is the date and Y-axis are the USD value. Initially, the chart is plotted using the complete data collected from blockcahin.info. Whenever the select option changes the chart replots the data based on the period chosen.


In the source code, a user defined function called 'buildLine' is used, which performs the following three operations.

1. Create a scale to map the domain (min and max values) to the SVG canvas range.
2. Create the axis for the graph with the above scale.
3. Plot the line with the data in the given scale.

A listener listens for the change in the filter. Whenever a change occurs it captures and call update line functions. The function does same as the building function, the only difference is that the data were given.

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
