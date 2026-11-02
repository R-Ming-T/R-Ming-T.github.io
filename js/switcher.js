function switchChart(chartID, hiddenChartID) {
    const hiddenChart = document.getElementById(hiddenChartID);
    if (hiddenChart) {
        hiddenChart.classList.add('hidden');
    }
    const shownChart = document.getElementById(chartID);
    if (shownChart) {
        shownChart.classList.remove('hidden');
    }
}
