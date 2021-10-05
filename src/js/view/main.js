// view
import renderLineChart from './chart.js';

// component
import '../component/pkci_card.js';

// data
import NationalDaily from '../data/NationalDaily.js';

async function main() {
    const nationalDailyObj = new NationalDaily();
    const nationalDailyData = await nationalDailyObj.getCovid19CaseData();

    console.log(nationalDailyData);

    renderLineChart(nationalDailyData);
}

function mainSearch() {

}

export { main, mainSearch };
