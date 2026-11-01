export function renderChart(labels, dataVals, canvasName, title, xlabel, ylabel) {
    const ctx = document.getElementById('AgingSocietyGraph').getContext('2d');
    new Chart(ctx, {
        type:'line',
        data: {
            labels: labels,
            datasets: [{
                data: dataVals,
                tension: 0.1,
                borderColor: '#84D7E0',
                borderWidth: 3,
                pointRadius: 2,
                pointBorderColor: '#00A5B8',
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#00A5B8',
                pointHoverBorderColor: '#00A5B8',
            }]
        },
        options: {
            plugins: {
                legend: {display: false},
                title: {
                    display: true,
                    text: 'Percentage of Population over 65 by Year',
                    color: '#ffffff',                 // Color of the main title text
                    position: 'top',                  // 'top', 'left', 'bottom', or 'right'
                    align: 'center',                  // 'start', 'center', or 'end'
                    font: {
                        family: 'Arial',                // Font family
                        size: 20,                       // Font size in pixels
                        weight: 'bold',                 // Font weight ('normal', 'bold', etc.)
                        style: 'normal'                 // Font style ('normal', 'italic')
                    },
                    padding: {
                        top: 10,
                        bottom: 30                      // Spacing between the title and the chart
                    }
                }
            },
            scales: {
                x: {
                    // Grid lines configuration
                    grid: {
                    color: '#00A5B8',  // Color of the grid lines
                    borderColor: '#00A5B8',            // Color of the main axis line (axis border)
                    tickColor: '#00A5B8',              // Color of the small ticks extending past the axis line
                    },
                    // Text/Labels configuration
                    ticks: {
                        color: '#00A5B8',                  // Color of the axis labels (e.g., 'January', 'February')
                    },
                    // Axis Title configuration
                    title: {
                        display: true,
                        text: 'Years',
                        color: '#FFFFFF',                  // Color of the overall axis title text
                    }
                },
                y: {
                    grid: {
                        color: '#00A5B8', // Different grid color for Y axis if desired
                        borderColor: '#00A5B8',
                        tickColor: '#00A5B8',
                    },
                    ticks: {
                        color: '#00A5B8',
                    },
                    title: {
                        display: true,
                        text: 'Percentage',
                        color: '#FFFFFF',
                    }
                }
            },
            responsive: true
        }
    });
}
