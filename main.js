var graphs = [];

async function loadData(g) {
    for (var i = 0; i < graphs.length; i++) {
        graphs[i].destroy();
    }
    
    document.getElementById('list').style.visibility = "visible";

    if (g === 'gold') {
        document.getElementById('list').selectedIndex = 0;
    }
    else if (g === 'xp') {
        document.getElementById('list').selectedIndex = 1;
    }
    
    var id = document.getElementById('inputID').value;

    var graphList = document.getElementById("list");
    var listChoice = graphList.options[graphList.selectedIndex].value;

    
    if (listChoice === 'team_gold') {
        const response = await axios.get('https://api.opendota.com/api/matches/' + id);
        var goldAdvArr = response.data.radiant_gold_adv;
        var time = [];
        var colors = [];
        var i = 0;

        goldAdvArr.forEach((minute) => {
            if (minute > 0) {
                colors.push('#326B32');
            } else {
                colors.push('#A30002');
            }
            time.push(i);
            i++;
        });    

        goldGraph(goldAdvArr, time, colors);
    } else if (listChoice === 'team_xp') {
        const response = await axios.get('https://api.opendota.com/api/matches/' + id);
        var xpAdvArr = response.data.radiant_xp_adv;
        var time = [];
        var colors = [];
        var i = 0;

        xpAdvArr.forEach((minute) => {
            if (minute > 0) {
                colors.push('#326B32');
            } else {
                colors.push('#A30002');
            }
            time.push(i);
            i++;
        });

        xpGraph(xpAdvArr, time, colors);
    }
}

function goldGraph(goldAdv, time, color) {
    for (var i = 0; i < graphs.length; i++) {
        graphs[i].destroy();
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                data: goldAdv,
                pointBackgroundColor: color,
                pointBorderColor: color,
                pointRadius: 2,
                borderWidth: 2
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        var team = (Number(tooltipItem.yLabel > 0) ? 'radiant' : 'dire');
                        return team + ' had a ' + Math.abs(Number(tooltipItem.yLabel)) + ' gold lead';
                    },
                    beforeLabel: function(tooltipItem) {
                        return 'At ' + Number(tooltipItem.xLabel) + ' minutes';
                    },
                    title: function(tooltipItem) {
                        return '';
                    }
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontSize: 16,
                        fontStyle: 'bold',
                        labelString: 'Gold'
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return Math.abs(value);
                        }
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontSize: 16,
                        fontStyle: 'bold',
                        labelString: 'Time (minutes)'
                    }
                }]
            },
            animation: {
                easing: "easeInOutBack"
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                fontSize: 18,
                text: 'Team Gold Advantage'
            }
        },
        plugins: [{
            beforeRender: function (x) {
                var c = x.chart
                var dataset = x.data.datasets[0];
                var yScale = x.scales['y-axis-0'];
                var yPos = yScale.getPixelForValue(0);
    
                var gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
                gradientFill.addColorStop(0, 'rgba(50, 107, 50, 0.5)');
                gradientFill.addColorStop(yPos / c.height, 'rgba(50, 107, 50, 0.5)');
                gradientFill.addColorStop(yPos / c.height, 'rgba(163, 0, 2, 0.5)');
                gradientFill.addColorStop(1, 'rgba(163, 0, 2, 0.5)');
    
                var model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
                model.backgroundColor = gradientFill;
                model.borderColor = gradientFill;
            }
        }]
    });
    graphs.push(myChart);
}

function xpGraph(xpAdv, time, color) {
    for (var i = 0; i < graphs.length; i++) {
        graphs[i].destroy();
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                data: xpAdv,
                pointBackgroundColor: color,
                pointBorderColor: color,
                pointRadius: 2,
                borderWidth: 2
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        var team = (Number(tooltipItem.yLabel > 0) ? 'radiant' : 'dire');
                        return team + ' had a ' + Math.abs(Number(tooltipItem.yLabel)) + ' xp lead';
                    },
                    beforeLabel: function(tooltipItem) {
                        return 'At ' + Number(tooltipItem.xLabel) + ' minutes';
                    },
                    title: function(tooltipItem) {
                        return '';
                    }
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontSize: 16,
                        fontStyle: 'bold',
                        labelString: 'XP'
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return Math.abs(value);
                        }
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontSize: 16,
                        fontStyle: 'bold',
                        labelString: 'Time (minutes)'
                    }
                }]
            },
            animation: {
                easing: "easeInOutBack"
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                fontSize: 18,
                text: 'Team XP Advantage'
            }
        },
        plugins: [{
            beforeRender: function (x) {
                var c = x.chart
                var dataset = x.data.datasets[0];
                var yScale = x.scales['y-axis-0'];
                var yPos = yScale.getPixelForValue(0);
    
                var gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
                gradientFill.addColorStop(0, 'rgba(50, 107, 50, 0.5)');
                gradientFill.addColorStop(yPos / c.height, 'rgba(50, 107, 50, 0.5)');
                gradientFill.addColorStop(yPos / c.height, 'rgba(163, 0, 2, 0.5)');
                gradientFill.addColorStop(1, 'rgba(163, 0, 2, 0.5)');
    
                var model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
                model.backgroundColor = gradientFill;
                model.borderColor = gradientFill;
            }
        }]
    });
    graphs.push(myChart);
}

function dropdownChoice() {
    var graphList = document.getElementById("list");
    var listChoice = graphList.options[graphList.selectedIndex].value;
    loadData(listChoice);
}