// FIRST GRAPHIC - TYPE "LINE"

let tbody = document.getElementById('table1').childNodes[5];

// declare variable years for { myChart.data.lables }
let years = [];
let arrayYears = Array.from(tbody.childNodes[1].children);
arrayYears.forEach(i => {
    years.push(parseInt(i.textContent));
})

years.splice(0, 2);

// declare variable cities and data for { myChart.data.datasets }
let datasets = [];


let arrayDatasets = Array.from(tbody.childNodes);
let arrSets = [];
// delete blocks <text>
for (i = 3; i < arrayDatasets.length; i++) {
  if(arrayDatasets[i].nodeName === 'TR') {
    arrSets.push(arrayDatasets[i]);
  }
};

// random color for line
function randomColor() {
  return color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}


for (i = 0; i < 35; i++) {
  // get data for each cities
  let dataFromTable = [];
  // create set for dataset
  let set = {};
  let addColor = randomColor();
  for (j = 2; j < 13; j++) {
    dataFromTable.push(parseInt(arrSets[i].children[j].textContent));

      set = {
        label: arrSets[i].children[1].textContent,
        data: dataFromTable,
        fill: false,
        borderColor: addColor,
        borderWidth: 3,
        hoverBorderWidth: 10,
      };
  };
  // get datasets
  datasets.push(set); 
};

// console.log(datasets);

// Global options for charts
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

// // Add Chart object with style of graphics
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: years,
      datasets: datasets
  },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        legend: {
          position: 'right',
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        title: {
          display: true,
          text: 'Offences recorded by the police, 2002-12',
          fontSize: 40
        }
    }
});


// SECOND GRAPHIC - TYPE "BAR"

let tbody2 = document.getElementById('table2').childNodes[5];
console.log(tbody2);

// declare variable countries for { myChart.data.lables }
let countries = [];
for(i = 0; i < 30; i++) {
  let country = tbody2.children[i].children[1].textContent;
  countries.push(country);
}

console.log(countries);

// declare variable data for { myChart.data.datasets }
let dataFor0709 = [];
for(i = 0; i < 30; i++) {
  let data1 = parseInt(tbody2.children[i].children[2].textContent);
  dataFor0709.push(data1);
}

console.log(dataFor0709);

let dataFor1012 = [];
for(i = 0; i < 30; i++) {
  let data2 = parseInt(tbody2.children[i].children[3].textContent);
  dataFor1012.push(data2);
}

console.log(dataFor1012);

// Global options for charts
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

// Add Chart object with style of graphics
let ctx2 = document.getElementById('myChart2').getContext('2d');
let myChart2 = new Chart(ctx2, {
  type: 'horizontalBar',
  data: {
      labels: countries,
      datasets: [
        {
          label: 'in 2007-2009',
          data: dataFor0709,
          backgroundColor: '#80c3ff',
          borderWidth: 1,
          borderColor: '#e0e0eb',
          hoverBorderWidth: 2,
          hoverBorderColor: '#005fb3'
        },
        {
          label: 'in 2010-2012',
          data: dataFor1012,
          backgroundColor: '#eb99ff',
          borderWidth: 1,
          borderColor: '#e0e0eb',
          hoverBorderWidth: 2,
          hoverBorderColor: '#8f00b3'
        }
      ]
  },
    options: {
        scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
            }]
        },
        legend: {
          display: true,
        },
        tooltips: {
          mode: 'single',
          callbacks: {
                   label: function (tooltipItems) {
                      return  tooltipItems.xLabel + " person ";
                   }
          }
        },
        title: {
          display: true,
          text: 'Prison population, average per year, 2007-09 and 2010-12 (per 100,000 inhabitants)',
          fontSize: 25
        }
  }
});
