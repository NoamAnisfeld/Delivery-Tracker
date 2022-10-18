import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid'

export default function SecondaryNavigation() {
    return <Grid container p={2} bgcolor="#ccc" alignItems="center" justifyContent="space-between">
        <Grid item container xs="auto" columnSpacing={2} alignItems="center">
            <Grid item>
                <Link to="/">Delivery</Link>
            </Grid>
            <Grid item>
                <Link to="/archive">Archived items</Link>
            </Grid>
        </Grid>
    </Grid>
}