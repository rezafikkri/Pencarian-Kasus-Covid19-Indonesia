import ApexCharts from 'apexcharts';
const id = require("apexcharts/dist/locales/id.json");

function renderLineChart(nationalDailyData) {
    const options = {
        chart: {
            locales: [id],
            defaultLocale: 'id',
            type: 'area',
            height: 350,
            toolbar: {
                offsetY: -5,
                tools: {
                    download: false,
                },
            },
        },
        series: [
            {
                name: 'Sembuh',
                data: nationalDailyData.heal,
            },
            {
                name: 'Positif',
                data: nationalDailyData.positive,
            },
            {
                name: 'Meninggal',
                data: nationalDailyData.dead,
            },
        ],
        labels: nationalDailyData.date,
        colors: ['#2A9D8F', '#E9C46A', '#E76F51'],
        fill: {
            gradient: {
                opacityFrom: .7,
                opacityTo: 0,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                rotate: 0,
                style: {
                    colors: '#78909c',
                    fontFamily: 'WorkSans Regular',
                },
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM',
                    day: 'dd MMM',
                },
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#78909c',
                    fontFamily: 'WorkSans Regular',
                },
                formatter: (val, index) => {
                    return new Intl.NumberFormat('id').format(val);
                },
            },
        },
        legend: {
            fontSize: '14.4px',
            fontFamily: 'WorkSans Regular',
            offsetY: 7,
            markers: {
                radius: 4,
            },
        },
        grid: {
            borderColor: '#e8e8e8',
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        tooltip: {
            style: {
                fontSize: '14.4px',
                fontFamily: 'WorkSans Regular',
            },
            x: {
                format: 'dd MMMM yyyy',
            },
        },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

export default renderLineChart;
