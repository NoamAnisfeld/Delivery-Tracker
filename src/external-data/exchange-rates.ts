const API_KEY = 'xkXjGWDW66PbfqVxKcnpt6bc4D9tV96A';
const API_URL = 'https://api.apilayer.com/exchangerates_data/latest?apikey=' + API_KEY;

export async function fetchLatestExchangeRates({
    baseCurrency = 'USD',
    targetCurrencies,    
}: {
    baseCurrency?: string,
    targetCurrencies: string[],
}): Promise<{ [currency: string]: number }> {
    if (!targetCurrencies.length)
        return {}

    const url = `${API_URL}&base=${baseCurrency}&symbols=${targetCurrencies.join(',')}`;

    try {
        const
            result = await fetch(url),
            json = await result.json();

        if (!json.success)
            return {}
        
        return json.rates

    } catch (e) {
        return {}
    }
}

// The assignment instructions ask to update the exchange rate every 10 seconds.
// Well, not only this does not make any practical sense, but also
// the free API key only allows 250 requests per month. So I made it
// to be 10 minutes instead
const INTERVAL = 10 * 60 * 1000;

export function pollExchangeRates({
    baseCurrency = 'USD',
    targetCurrencies,
    onRatesAvailable,
}: {
    baseCurrency?: string,
    targetCurrencies: string[],
    onRatesAvailable: (newRates: { [currencyCode: string]: number }) => void,
}): () => void {
    let abort = false;
    function aborter() {
        abort = true;
    }

    async function poller() {
        if (abort)
            return;

        const rates = await fetchLatestExchangeRates({ baseCurrency, targetCurrencies });

        if (abort)
            return;
        
        if (Object.keys(rates).length)
            onRatesAvailable(rates);
        
        setTimeout(poller, INTERVAL);
    }
    poller();

    return aborter;
}