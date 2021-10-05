class NationalDaily {
    async getCovid19CaseData() {
        try {
            const response = await fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian');
            const responseJson = await response.json();

            // grouping data
            const covid19CaseData = { heal: [], positive: [], dead: [], date: [] };
            for (const value of responseJson) {
                covid19CaseData.heal.push(value.sembuh);
                covid19CaseData.positive.push(value.positif);
                covid19CaseData.dead.push(value.meninggal);
                covid19CaseData.date.push(value.lastUpdate);
            }

            return covid19CaseData;
        } catch (error) {
            return { error };
        }
    }
}

export default NationalDaily;
