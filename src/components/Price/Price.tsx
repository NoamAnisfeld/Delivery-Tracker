import { useAppSelector } from "../../GlobalState/interface";

export default function Price({
    priceInUSDollars
}: {
    priceInUSDollars: number,
}) {
    const availableCurrencies = useAppSelector(state => state.availableCurrencies);
    const selectedCurrency = useAppSelector(state => state.selectedCurrency);

    const
        currency = availableCurrencies[selectedCurrency],
        exchangeRate = selectedCurrency === 'USD' ? 1 :
            availableCurrencies.USD.exchangeRates[selectedCurrency];

    return <span>
        {currency.sign || ''}{(priceInUSDollars * exchangeRate).toFixed(2)}
    </span>
}