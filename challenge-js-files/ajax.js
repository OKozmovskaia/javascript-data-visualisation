// create event listener
document.getElementById('button').addEventListener('click', loadData);
// create canvas element



function loadData() {
  // create XHR Object
  let xhr = new XMLHttpRequest();
  // open
  xhr.open('GET', "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", true);

  xhr.onload = function() {
    if(this.status == 200) {
      // get data from server
      let stringData = JSON.parse(this.responseText);
      let dataPoints = [];
      let labelsPoints = [];

      stringData.forEach(element => {
        labelsPoints.push(element[0]);
        dataPoints.push(element[1]);
      });
      
      // create chart element
      let ctx3 = document.getElementById('myChart3').getContext('2d');

      let myChart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: labelsPoints,
            datasets: [{
              data: dataPoints,
              borderColor: '#80c3ff',
              borderWidth: 5,
              fill: false
            }]
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
                display: false,
              },
              title: {
                display: true,
                text: 'Live chart with actual chart statistics',
                fontSize: 40
              }
          }
      });

      // Update chart
      function updateChart() {
        // get new label and new point
        fetch("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json")
        .then(response => response.json())
        .then(result => {
          // update chart
          let newLabel = result[0][0];
          let newDataPoint = result[0][1];

          myChart3.data.labels.push(newLabel);
          myChart3.data.datasets[0].data.push(newDataPoint);
          myChart3.update();

          updateChart()
        })
      }

      setTimeout(function(){updateChart()}, 1000);

    } else if(this.status == 404) {
      console.log('Not found');
    }
  };

  // send request
  xhr.send();
}


