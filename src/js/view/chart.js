import ApexCharts from 'apexcharts';

function renderLineChart() {
    const options = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false,
            },
            toolbar: { show: false },
        },
        title: {
            text: 'Nasional',
            align: 'left',
            style: {
                fontFamily: 'WorkSans Bold',
                fontSize: '18px',
                color: '#526166',
            },
        },
        series: [
            {
                name: 'Sembuh',
                data: [2, 20, 50, 120, 600, 200, 700],
            },
            {
                name: 'Positif',
                data: [120, 400, 300, 500, 900, 700, 1000],
            },
            {
                name: 'Meniggal',
                data: [2, 10, 20, 40, 100, 200, 500],
            },
        ],
        labels: ['16 Nov', '17 Nov', '18 Nov', '19 Nov', '20 Nov', '21 Nov', '22 Nov'],
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
            labels: {
                style: {
                    colors: '#78909c',
                    fontFamily: 'WorkSans Regular',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#78909c',
                    fontFamily: 'WorkSans Regular',
                },
            },
        },
        legend: {
            fontFamily: 'WorkSans Regular',
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
                fontFamily: 'WorkSans Regular',
            },
        },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

export default renderLineChart;
