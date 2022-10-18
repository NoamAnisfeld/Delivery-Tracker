import { useAppSelector } from '../../GlobalState/interface'
import {
    setCardsView,
    setSelectedCurrency,
} from '../../GlobalState/dispatchers'

import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { Link } from 'react-router-dom'

export default function PrimaryNavigation() {
    const cardsView = useAppSelector(state => state.cardsView);
    const availableCurrencies = useAppSelector(state => state.availableCurrencies);
    const selectedCurrency = useAppSelector(state => state.selectedCurrency);

    return <Grid container p={2} bgcolor="#aaa" alignItems="center" justifyContent="space-between">
        <Grid item container xs="auto" columnSpacing={2} alignItems="center">
            <Grid item>
                <Link to="/">Purcash by item</Link>
            </Grid>
            <Grid item>
                <Link to="/stores">Purcash by stores</Link>
            </Grid>
        </Grid>
        <Grid item container xs="auto" columnSpacing={2} alignItems="center">
            <Grid item>
                Currency:
            </Grid>
            <Grid item>
                <Select variant="standard"
                    value={selectedCurrency}
                    onChange={e => setSelectedCurrency(e.target.value)}
                >
                    {Object.entries(availableCurrencies)
                        .filter(([currencyCode]) =>
                            currencyCode === 'USD' ||
                            availableCurrencies.USD.exchangeRates[currencyCode]
                        ).map(([currencyCode, currency]) =>
                            <MenuItem value={currencyCode} key={currencyCode}>
                                {currency.name} {currency.sign}
                            </MenuItem>
                        )}
                </Select>
            </Grid>
            <Grid item>
                <Select variant="standard"
                    value={cardsView ? "cardsView" : "tableView"}
                    onChange={e => setCardsView(e.target.value === "cardsView")}
                >
                    <MenuItem value="tableView">Table view</MenuItem>
                    <MenuItem value="cardsView">Cards view</MenuItem>
                </Select>
            </Grid>
        </Grid>
    </Grid>
}