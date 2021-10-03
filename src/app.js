import { Collapse } from 'bootstrap';
import './img/favicon.ico';
import './img/logo.png';
import './font/Work_Sans/OFL.txt';
import './css/main.css';
import renderLineChart from './js/view/chart.js';
import './js/component/pkci_header.js';
import './js/component/pkci_card.js';

document.addEventListener('DOMContentLoaded', (e) => {
    renderLineChart();
});
