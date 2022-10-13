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
        exchangeRate = currency.exchangeRates['US Dollar'] || 1;

    return <span>
        {currency.sign || ''}{(priceInUSDollars * exchangeRate).toFixed(2)}
    </span>
}