import { renderChart } from './chartRenderer.js';

fetch('../Data/WorldAgingData.json')
.then(response => {
    if (!response.ok) {
        throw new Error("Network response was not alright " + response.statusText);
    }
    return response.json();
})
.then(data => {
    const years = data.years;
    const values = data.values;

    renderChart(years, values, 'AgingSocietyGraph', 'Percentage of Population over 65 by Year', 'Year', 'Percentage')
})
.catch(error => console.error("Error loading JSON data:", error));
