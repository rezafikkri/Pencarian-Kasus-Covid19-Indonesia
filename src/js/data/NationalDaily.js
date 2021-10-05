class NationalDaily {
    async getCovid19Case() {
        try {
            const response = await fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian');
            const responseJson = await response.json();

            // grouping data
            const covid19Case = { heal: [], positive: [], dead: [], date: [] };
            for (const value of responseJson) {
                covid19Case.heal.push(value.sembuh);
                covid19Case.positive.push(value.positif);
                covid19Case.dead.push(value.meninggal);
                covid19Case.date.push(value.lastUpdate);
            }

            return covid19Case;
        } catch (error) {
            return { errorMessage: error.message, errorName: 'DailyError' };
        }
    }
}

export default NationalDaily;
