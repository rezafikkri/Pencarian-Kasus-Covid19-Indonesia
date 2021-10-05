class PKCICard extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.title = this.getAttribute('title') || null;
        this.type = this.getAttribute('type') || null;
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <style>
                h3, h5 {
                    font-weight: 500;
                    line-height: 1.2;
                }

                svg {
                    vertical-align: middle;
                }

                .card {
                    display: flex;
                    flex-direction: row;
                    background-color: #fff;
                    border-radius: 4px;
                    padding: 1.5em;
                    box-shadow: 2px 2px 2px rgba(179, 186, 189, .2);
                    border: none;
                }

                .card-icon-container {
                    flex-basis: 65px;
                    display: flex;
                    align-items: center;
                }

                .card-icon {
                    padding: 1.2em;
                    border-radius: 50%;
                }

                .card-green .card-icon {
                    background-color: #EFFBF9;
                    color: var(--pkci-green);
                }

                .card-orange .card-icon {
                    background-color: #FCF8ED;
                    color: var(--pkci-orange);
                }

                .card-red .card-icon {
                    background-color: #FDF0ED;
                    color: var(--pkci-red);
                }

                .card-icon svg {
                    width: 25px;
                    height: 25px;
                }

                .card-body {
                    flex-basis: 70%;
                    padding: 0;
                    padding-left: 1.5em;
                }

                .card-body h3 {
                    font-family: 'WorkSans Medium';
                    margin: 0;
                    font-size: calc(1.3rem + .6vw);
                }

                .card-body p {
                    margin-top: 0;
                    margin-bottom: 1rem;
                }

                .card-green .card-body p {
                    color: var(--pkci-green);
                }

                .card-orange .card-body p {
                    color: var(--pkci-orange);
                }

                .card-red .card-body p {
                    color: var(--pkci-red);
                }

                .card-body h5 {
                    margin: 0;
                    color: var(--pkci-light-dark);
                    font-size: 15px;
                }

                @media (min-width: 1200px) {
                    .card-body h3 {
                        font-size: 1.75rem;
                    }
                }
            </style>

            <div class="card ${this.type}">
                <div class="card-icon-container">
                    <div class="card-icon">
                        ${this.generateCardIcon()}
                    </div>
                </div>

                <div class="card-body">
                    <h3>4.039.835</h3>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg>
                        <span>2.811</span>
                    </p>
                    <h5>${this.title}</h5>
                </div>
            </div>
        `;
    }

    generateCardIcon() {
        switch (this.type) {
            case 'card-green':
                return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/></svg>';

            case 'card-orange':
                return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-expressionless-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm5 0h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm-5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/></svg>';

            case 'card-red':
                return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/></svg>';
        }
    }

    set covid19Case(caseUpdate) {
        // set case total
        this._total = caseUpdate.total;
        // set case increase
        this._increase = caseUpdate.increase;
        this.render();
    }
}

customElements.define('pkci-card', PKCICard);
