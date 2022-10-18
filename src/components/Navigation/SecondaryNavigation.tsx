import { Link } from 'react-router-dom'

import { useAppSelector } from '../../GlobalState/interface'
import {
    setCardsView,
} from '../../GlobalState/dispatchers'

import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function SecondaryNavigation() {
    const cardsView = useAppSelector(state => state.cardsView);

    return <Grid container p={2} bgcolor="#ccc" alignItems="center" justifyContent="space-between">
        <Grid item container xs="auto" columnSpacing={2} alignItems="center">
            <Grid item>
                <Link to="/">Delivery</Link>
            </Grid>
            <Grid item>
                <Link to="/archive">Archived items</Link>
            </Grid>
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
}