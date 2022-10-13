import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { Link } from 'react-router-dom'

export default function Navigation() {
    const {
        cardsView,
        setCardsView,
        availableCurrencies,
        selectedCurrency,
        setSelectedCurrency,
    } = useGlobalStateContext();

    return <Grid container p={2} bgcolor="#ccc" alignItems="center" justifyContent="space-between">
        <Grid item container xs="auto" columnSpacing={2} alignItems="center">
            <Grid item>
                <Link to="/">Delivery</Link>
            </Grid>
            <Grid item>
                <Link to="/archive">Archived items</Link>
            </Grid>
        </Grid>
        <Grid item container xs="auto" columnSpacing={2} alignItems="center">
            <Grid item>
                Currency:
            </Grid>
            <Grid item>
                <Select
                    value={selectedCurrency}
                    onChange={e => setSelectedCurrency(e.target.value)}
                >
                    {Object.entries(availableCurrencies).map(([currencyName, currency]) =>
                        <MenuItem value={currencyName} key={currencyName}>
                            {currencyName} {currency.sign}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item>
                <Select
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