class NationalCumulative {
    async getCovid19Case() {
        try {
            const response = await fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/more');
            return await response.json();
        } catch (error) {
            return { errorMessage: error.message, errorName: 'CumulativeError' };
        }
    }
}

export default NationalCumulative;
