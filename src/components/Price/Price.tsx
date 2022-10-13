import { useGlobalStateContext } from "../../GlobalState/GlobalState"

export default function Price({
    priceInUSDollars
}: {
    priceInUSDollars: number,
}) {
    const {
        availableCurrencies,
        selectedCurrency,
    } = useGlobalStateContext();

    const
        currency = availableCurrencies[selectedCurrency],
        exchangeRate = selectedCurrency === 'USD' ? 1 :
            availableCurrencies.USD.exchangeRates[selectedCurrency];

    return <span>
        {currency.sign || ''}{(priceInUSDollars * exchangeRate).toFixed(2)}
    </span>
}