let chartInstance = null;
let externalTimelineData = null;
let currentYear = 2025;
let globalGeomFeatures = null;

Promise.all([
    fetch('../Data/countries-50m.json').then(r => r.json()),
    fetch('../Data/AllCountryAgingData.json').then(r => r.json())
])
.then(([topoData, agingData]) => {
    globalGeomFeatures = topojson.feature(topoData, topoData.objects.countries).features;
    externalTimelineData = agingData

    const availableYears = Object.keys(externalTimelineData).map(Number).sort((a, b) => a - b);
    if (availableYears.length > 0) {
        const slider = document.getElementById('yearSlider');
        slider.min = availableYears[0];
        slider.max = availableYears[availableYears.length - 1];
        slider.value = availableYears.includes(2025) ? 2025 : availableYears[0]
        currentYear = parseInt(slider.value, 10)
        slider.disabled = false
        document.getElementById('yearDisplay').innerText = currentYear;
    }
    document.getElementById('status').style.display = 'none';
    initMapChart();
})
.catch(err => {
    document.getElementById('status').innerText = `Error loading dataset: ${err.message}.`;
    console.error(err);
});

function initMapChart() {
    const ctx = document.getElementById('AgingSocietyGraph').getContext('2d');
    const mapData = globalGeomFeatures.map(country => {
        const name = country.properties.name;
        const yearSlice = externalTimelineData[currentYear] || {};
        return {
            feature: country,
            value: yearSlice[name] !== undefined ? yearSlice[name] : null // Null retains baseline context colors cleanly
        };
    });

    chartInstance = new Chart(ctx, {
        type:'choropleth',
        data: {
            labels: globalGeomFeatures.map(c=> c.properties.name),
            datasets: [{
                label: 'Aging Metrics Index',
                data: mapData
            }]
        },
        options: {
            responsive: true,
            plugins : {
                legend: {display: false},
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const name = context.element.feature.properties.name;
                            const val = context.raw.value;
                            return `${name}: ${val !== null ? val : 'No Data Available'}`;
                        }
                    }
                }
            },
            scales: {
                projection: {
                    axis: 'x',
                    projection: 'equalEarth'
                },
                color: {
                    axis: 'x',
                    interpolate: 'blues',
                    quantize: 0,
                    legend: {
                        position: 'bottom',
                        align: 'center'
                    }
                }
            }
        }
    });

    document.getElementById('yearSlider').addEventListener('input', (e) => {
        const selectedYear = parseInt(e.target.value, 10);
        updateTimelineYear(selectedYear);
    });
}

function updateTimelineYear(year) {
    currentYear = year;
    document.getElementById('yearDisplay').innerText = year;

    if (chartInstance && externalTimelineData) {
        const yearSlice = externalTimelineData[currentYear] || {};

        chartInstance.data.datasets[0].data -= chartInstance.data.datasets[0].data.map(item => {
            const countryName = item.feature.properties.name;
            return {
                feature: item.feature,
                value: yearSlice[countryName] !== undefined ? yearSlice[countryName] : null
            };
        });

        chartInstance.update('none');
    }
}
