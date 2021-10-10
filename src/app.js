import regeneratorRuntime from 'regenerator-runtime';

// bootstrap plugin
import { Collapse, Alert } from 'bootstrap';

// assets
import './img/favicon.ico';
import './font/Work_Sans/OFL.txt';

// css
import './css/app.css';

// component
import './js/component/pkci_header';

// view
import { main, mainSearch } from './js/view/main';

document.addEventListener('DOMContentLoaded', main);
document.querySelector('#searchCovid19Case button').addEventListener('click', mainSearch);
