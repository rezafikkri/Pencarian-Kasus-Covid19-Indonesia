function renderAlert(errorMessage, errorName) {
    const chartElement = document.querySelector('.chart');
    const covid19CaseCardElement = document.querySelector('#covid19CaseCard');
    const mainElement = document.querySelector('main');

    const alertElement = document.createElement('div');
    alertElement.setAttribute('class', 'alert alert-warning d-flex align-items-center alert-dismissible fade show');
    alertElement.setAttribute('role', 'alert');
    alertElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
        <div>${errorMessage}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    if (errorName === 'DailyError') {
        mainElement.insertBefore(alertElement, chartElement);
    } else if (errorName === 'CumulativeError') {
        mainElement.insertBefore(alertElement, covid19CaseCardElement);
    }
}

export default renderAlert;
