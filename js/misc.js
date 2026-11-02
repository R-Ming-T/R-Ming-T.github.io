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

let topButton = document.getElementById("TopButton");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topButton.classList.remove('hidden');
    } else {
        topButton.classList.add('hidden');
    }
}

function returnToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
