// view
import renderLineChart from './chart.js';
import renderAlert from './alert.js';

// component
import '../component/pkci_card.js';

// data
import NationalDaily from '../data/NationalDaily.js';
import NationalCumulative from '../data/NationalCumulative.js';
import ProvinceCumulative from '../data/ProvinceCumulative.js';
import provinceNames from '../data/provinceNames.js';

function showCovid19CaseToCard(
    totalHeal,
    increaseHeal,
    totalPositive,
    increasePositive,
    totalDead,
    increaseDead,
) {
    const numberFormat = new Intl.NumberFormat('id');
    const pkciCardHealElement = document.querySelector('pkci-card[id="heal"]');
    const pkciCardPositiveElement = document.querySelector('pkci-card[id="positive"]');
    const pkciCardDeadElement = document.querySelector('pkci-card[id="dead"]');

    pkciCardHealElement.covid19Case = {
        total: numberFormat.format(totalHeal),
        increase: numberFormat.format(increaseHeal),
    };
    pkciCardPositiveElement.covid19Case = {
        total: numberFormat.format(totalPositive),
        increase: numberFormat.format(increasePositive),
    };
    pkciCardDeadElement.covid19Case = {
        total: numberFormat.format(totalDead),
        increase: numberFormat.format(increaseDead),
    };
}

function showLastUpdate(lastUpdate) {
    const date = new Date(lastUpdate);
    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];
    document.querySelector('#lastUpdate').innerText = `
        Terakhir diperbaharui: ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}
    `;
}

async function main() {
    /* show province names to datalist */
    const datalistProvinceElement = document.querySelector('datalist#datalistProvince');
    let optionProvince;
    for (const pn of provinceNames) {
        optionProvince += `<option value="${pn}"></option>`;
    }
    datalistProvinceElement.innerHTML = optionProvince;

    /* show national daily covid19 case data to chart */
    const nationalDailyObj = new NationalDaily();
    const nationalDailyData = await nationalDailyObj.getCovid19Case();

    if (nationalDailyData.errorMessage) {
        renderAlert(nationalDailyData.errorMessage, nationalDailyData.errorName);
    } else {
        renderLineChart(nationalDailyData);
    }

    // show daily Covid19 case chart
    document.querySelector('#dailyCovid19CaseChart').classList.remove('d-none');

    /* show national cumulative covid19 case data to card */
    const nationalCumulativeObj = new NationalCumulative();
    const nationalCumulativeData = await nationalCumulativeObj.getCovid19Case();

    if (nationalCumulativeData.errorMessage) {
        renderAlert(nationalCumulativeData.errorMessage, nationalCumulativeData.errorName);

        // hide loading
        document.querySelector('#loading').classList.add('d-none');

    } else {
        showCovid19CaseToCard(
            nationalCumulativeData.total.sembuh,
            nationalCumulativeData.penambahan.sembuh,
            nationalCumulativeData.total.positif,
            nationalCumulativeData.penambahan.positif,
            nationalCumulativeData.total.meninggal,
            nationalCumulativeData.penambahan.meninggal,
        );
    }

    // show Covid19 case card
    document.querySelector('#covid19CaseCard').classList.remove('d-none');

    // show last update
    showLastUpdate(nationalCumulativeData.total.lastUpdate);

    // hide loading
    document.querySelector('#loading').classList.add('d-none');
}

async function mainSearch() {
    // element
    const dailyCovid19CaseChartElement = document.querySelector('#dailyCovid19CaseChart');
    const covid19CaseCardElement = document.querySelector('#covid19CaseCard');
    const loadingElement = document.querySelector('#loading');
    const searchButtonElement = document.querySelector('#searchCovid19Case button');
    const searchInputElement = document.querySelector('#searchCovid19Case input');
    const covid19CaseDetailElement = document.querySelector('#covid19CaseDetail');

    // remove alert if exist
    const alertElement = document.querySelector('.alert');
    if (alertElement) {
        alertElement.remove();
    }

    // hide chart, card, accordion, show loading, disable search and reset last update
    dailyCovid19CaseChartElement.classList.add('d-none');
    covid19CaseCardElement.classList.add('d-none');
    covid19CaseDetailElement.classList.add('d-none');
    loadingElement.classList.remove('d-none');
    searchButtonElement.setAttribute('disabled', '');
    searchInputElement.setAttribute('disabled', '');
    document.querySelector('#lastUpdate').innerText = 'Terakhir diperbaharui: -';

    /* show province covid19 case data to card and accordion */
    const province = searchInputElement.value;
    // if empty province
    if (!province) {
        renderAlert('Nama provinsi tidak boleh kosong!', 'CumulativeError');

        // hide loading
        document.querySelector('#loading').classList.add('d-none');
        // enabled search
        searchButtonElement.removeAttribute('disabled', '');
        searchInputElement.removeAttribute('disabled', '');

        return false;
    }

    const provinceCumulativeObj = new ProvinceCumulative();
    const provinceCumulativeData = await provinceCumulativeObj.getCovid19Case(province);

    if (provinceCumulativeData.errorMessage) {
        renderAlert(provinceCumulativeData.errorMessage, provinceCumulativeData.errorName);

        // hide loading
        document.querySelector('#loading').classList.add('d-none');
        // enabled search
        searchButtonElement.removeAttribute('disabled', '');
        searchInputElement.removeAttribute('disabled', '');

        return false;
    }

    showCovid19CaseToCard(
        provinceCumulativeData[0].sembuh,
        provinceCumulativeData[0].penambahan.sembuh,
        provinceCumulativeData[0].kasus,
        provinceCumulativeData[0].penambahan.positif,
        provinceCumulativeData[0].meninggal,
        provinceCumulativeData[0].penambahan.meninggal,
    );

    // show Covid19 case card
    covid19CaseCardElement.classList.remove('d-none');

    // show covid19 case detail to accordion
    const numberFormat = new Intl.NumberFormat('id');
    covid19CaseDetailElement.querySelector('#gender').innerHTML = `
        <p>Laki-laki : ${numberFormat.format(provinceCumulativeData[0].jenis_kelamin['laki-laki'])}</p>
        <p class="m-0">Perempuan : ${numberFormat.format(provinceCumulativeData[0].jenis_kelamin.perempuan)}</p>
    `;
    covid19CaseDetailElement.querySelector('#ageGroup').innerHTML = `
        <p>0-5 tahun : ${numberFormat.format(provinceCumulativeData[0].kelompok_umur['0-5'])}</p>
        <p>6-18 tahun : ${numberFormat.format(provinceCumulativeData[0].kelompok_umur['6-18'])}</p>
        <p>19-30 tahun : ${numberFormat.format(provinceCumulativeData[0].kelompok_umur['19-30'])}</p>
        <p>31-45 tahun : ${numberFormat.format(provinceCumulativeData[0].kelompok_umur['31-45'])}</p>
        <p>46-59 tahun : ${numberFormat.format(provinceCumulativeData[0].kelompok_umur['46-59'])}</p>
        <p class="m-0">≥ 60 tahun : ${numberFormat.format(provinceCumulativeData[0].kelompok_umur['≥ 60'])}</p>
    `;
    covid19CaseDetailElement.classList.remove('d-none');

    // show last update
    showLastUpdate(provinceCumulativeData[0].last_date);

    // hide loading
    document.querySelector('#loading').classList.add('d-none');
    // enabled search
    searchButtonElement.removeAttribute('disabled', '');
    searchInputElement.removeAttribute('disabled', '');
}

export { main, mainSearch };
