class ProvinceCumulative {
    async getCovid19Case(province) {
        try {
            const response = await fetch(`https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more?name=${province}`);
            const responseJson = await response.json();

            // if provinsi not found
            if (responseJson.length === 0) {
                return { errorMessage: `Kasus Covid-19 di provinsi <b>${province}</b> tidak ditemukan.`, errorName: 'CumulativeError' };
            }

            return responseJson;
        } catch (error) {
            return { errorMessage: error.message, errorName: 'CumulativeError' };
        }
    }
}

export default ProvinceCumulative;
