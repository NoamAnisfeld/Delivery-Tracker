import { useState, useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'

import { useAppSelector } from '../../GlobalState/interface'
import {
    setSelectedCurrency,
} from '../../GlobalState/dispatchers'

import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import VisualLink from '@mui/material/Link'

export default function PrimaryNavigation() {
    const
        selectedCurrency = useAppSelector(state => state.selectedCurrency),
        availableCurrencies = useAppSelector(state => state.availableCurrencies),
        filteredCurrencyEntries = Object.entries(availableCurrencies).filter(
            ([currencyCode]) =>
                currencyCode === 'USD' ||
                availableCurrencies.USD.exchangeRates[currencyCode]
        );

    // for some unclear reason, the update to store.availableCurrencies does
    // not cause a rerender automatically, despite the component subscribing
    // above via useSelector
    const [toggleRerenderHack, setToggleRerenderHack] = useState(false);
    useEffect(() => {
        if (!toggleRerenderHack)
            setTimeout(() => {
                setToggleRerenderHack(true);
            }, 5000);
    });

    return <Grid container bgcolor="#aaa" alignItems="center" justifyContent="space-between">
        <Grid item container px={4} xs="auto" columnSpacing={2} alignItems="center">
            <Grid item p={2}
                sx={
                    [useMatch(""), useMatch("archive")].some(value => value) ?
                    { background: "#ddd" } : {}
                }
            >
                <VisualLink component={Link} to="/" color="inherit" underline="none">
                    Purcash by item
                </VisualLink>
            </Grid>
            <Grid item p={2}
                sx={ useMatch("stores") ? { background: "#ddd" } : {} }
            >
                <VisualLink component={Link} to="stores" color="inherit" underline="none">
                    Purcash by stores
                </VisualLink>
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
                    {filteredCurrencyEntries.map(([currencyCode, currency]) =>
                        <MenuItem value={currencyCode} key={currencyCode}>
                            {currency.name} {currency.sign}
                        </MenuItem>
                    ).concat(
                        filteredCurrencyEntries.length < 2 ?
                        [<MenuItem value="" key="error" disabled>
                            Failed to fetch exchange rates for additional currencies
                        </MenuItem>] :
                        []
                    )}
                </Select>
            </Grid>
        </Grid>
    </Grid>
}