import React from 'react';
import ReactEcharts from "echarts-for-react"; 
import wineData from './data/Wine-Data.json';
import './App.css';

function App() {

  // To extract specific key value from given Array of Object
  const getDataFor = (data:any, key: string) => {
    return data.map( (data: any) => data[key] );
  }

  // Reduce data for bar chart
  // aggregate the wineData array for unique "Alcohol" values 
  //      with calculation of averaging Malic Acid values
  const dictionary = wineData.reduce((dict: any, ele: any)=> {
    if(!dict[ele['Alcohol']]) { // generate new key for each unique alcohol values
        dict[ele['Alcohol']] = {
          'Alcohol' : ele['Alcohol'],
          'Malic Acid' : ele['Malic Acid'],
          'count' : 1
        }; 
    } else { // calculate sum for 'Malic Acid' values & count the total occurences to calc avg
        let existingObject =  dict[ele['Alcohol']];
        existingObject['Malic Acid'] += ele['Malic Acid'];
        existingObject['count'] += 1;
   }      
   return dict;
  } ,{});

  const reducedWineData = Object.values(dictionary);

  const averagedMalicAcidData = reducedWineData.map( (ele: any) => ele['Malic Acid'] / ele['count'] );

  const optionScatterPlot = {
    title: {
      text: 'Scatter Plot for Color Intensity vs Hue'
    },
    xAxis: {
      type: 'category',
      name: 'Color intensity',
      data: getDataFor(wineData, 'Color Intensity'),
    },
    yAxis: {
      type: 'value',
      name: 'Hue',
    },
    series: [
      {
        data: getDataFor(wineData, 'Hue'),
        type: 'scatter'
      }
    ]
  };

  const optionBarChart = {
    title: {
      text: 'Bar Chart for Alcohol vs Avg. Malic Acid'
    },
    xAxis: {
      type: 'category',
      name: 'Alcohol',
      data: getDataFor(reducedWineData, 'Alcohol'),
    },
    yAxis: {
      type: 'value',
      name: 'Malic Acid',
    },
    series: [
      {
        data: averagedMalicAcidData,
        type: 'bar'
      }
    ]
  };

  return (
    <div className="App">
      <ReactEcharts option={optionScatterPlot} />
      <ReactEcharts option={optionBarChart} />
    </div>
  );
}

export default App;
