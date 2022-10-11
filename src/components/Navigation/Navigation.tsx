import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { Link } from 'react-router-dom'

export default function Navigation() {
    const {
        cardsView,
        setCardsView
    } = useGlobalStateContext();

    return <Grid container p={2} spacing={5} bgcolor="#ccc" alignItems="center">
        <Grid item>
            <Link to="/">Delivery</Link>
        </Grid>
        <Grid item>
            <Link to="/archive">Archived items</Link>
        </Grid>
        <Grid item marginLeft="auto">
            <Select
                value={cardsView ? "cardsView" : "tableView"}
                onChange={e => setCardsView(e.target.value === "cardsView")}
            >
                <MenuItem value="tableView">Table view</MenuItem>
                <MenuItem value="cardsView">Cards view</MenuItem>
            </Select>
        </Grid>
    </Grid>
}