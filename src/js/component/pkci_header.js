class PKCIHeader extends HTMLElement {
    constructor() {
        super();

       this._shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                h2 {
                    font-family: 'WorkSans Medium';
                    color: var(--pkci-dark);
                    font-size: calc(1.325rem + .9vw);
                    margin-top: 0;
                    margin-bottom: .5rem;
                    font-weight: 500;
                    line-height: 1.2;
                }

                @media (min-width: 1200px) {
                    h2 {
                        font-size: 2rem;
                    }
                }

                p {
                    color: #67757B;
                    margin-top: 0;
                    margin-bottom: 1rem;
                }
            </style>

            <h2>Pencarian Kasus Covid-19 Indonesia</h2>
            <p>Untuk mengetahui kasus covid-19 di suatu Provinsi, silahkan masukkan Provinsi dan klik tombol pencarian!</p>
        `;
    }
}

customElements.define('pkci-header', PKCIHeader);
