import { Link, useMatch } from 'react-router-dom'

import { useAppSelector } from '../../GlobalState/interface'
import {
    setCardsView,
} from '../../GlobalState/dispatchers'

import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import VisualLink from '@mui/material/Link'

export default function SecondaryNavigation() {
    const cardsView = useAppSelector(state => state.cardsView);

    return <Grid container px={2} bgcolor="#ccc" alignItems="center" justifyContent="space-between">
        <Grid item container xs="auto" columnSpacing={2} alignItems="center">
            <Grid item p={2}
                sx={
                    useMatch("") ? { background: "#ddd" } : {}
                }
            >
                <VisualLink component={Link} to="/" color="inherit" underline="none">
                    Delivery
                </VisualLink>
            </Grid>
            <Grid item p={2}
                sx={
                    useMatch("archive") ? { background: "#ddd" } : {}
                }
            >
                <VisualLink component={Link} to="archive" color="inherit" underline="none">
                    Archived items
                </VisualLink>
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