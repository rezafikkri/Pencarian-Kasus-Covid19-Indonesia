// view
import renderLineChart from './chart.js';
import renderAlert from './alert.js';

// component
import '../component/pkci_card.js';

// data
import NationalDaily from '../data/NationalDaily.js';
import NationalCumulative from '../data/NationalCumulative.js';

async function main() {
    /* show national daily covid19 data to chart */
    const nationalDailyObj = new NationalDaily();
    const nationalDailyData = await nationalDailyObj.getCovid19Case();

    if (nationalDailyData.errorMessage) {
        renderAlert(nationalDailyData.errorMessage, nationalDailyData.errorName);
    } else {
        renderLineChart(nationalDailyData);
    }

    /* show national cumulative covid19 data to card */
    const nationalCumulativeObj = new NationalCumulative();
    const nationalCumulativeData = await nationalCumulativeObj.getCovid19Case();

    if (nationalCumulativeData.errorMessage) {
        renderAlert(nationalCumulativeData.errorMessage, nationalCumulativeData.errorName);
        return false;
    }

    const numberFormat = new Intl.NumberFormat('id');
    const pkciCardHealElement = document.querySelector('pkci-card[id="heal"]');
    const pkciCardPositiveElement = document.querySelector('pkci-card[id="positive"]');
    const pkciCardDeadElement = document.querySelector('pkci-card[id="dead"]');

    pkciCardHealElement.covid19Case = {
        total: numberFormat.format(nationalCumulativeData.total.sembuh),
        increase: numberFormat.format(nationalCumulativeData.penambahan.sembuh),
    };
    pkciCardPositiveElement.covid19Case = {
        total: numberFormat.format(nationalCumulativeData.total.positif),
        increase: numberFormat.format(nationalCumulativeData.penambahan.positif),
    };
    pkciCardDeadElement.covid19Case = {
        total: numberFormat.format(nationalCumulativeData.total.meninggal),
        increase: numberFormat.format(nationalCumulativeData.penambahan.meninggal),
    };

    /* show last update */
    const date = new Date(nationalCumulativeData.total.lastUpdate);
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const lastUpdateElement = document.querySelector('#lastUpdate');
    lastUpdateElement.innerText = `Terakhir diperbaharui: ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function mainSearch() {

}

export { main, mainSearch };
