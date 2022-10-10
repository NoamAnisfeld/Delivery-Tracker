import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return <Grid container p={2} spacing={5} bgcolor="lightgray">
        <Grid item>
            <Link to="/">Delivery</Link>
        </Grid>
        <Grid item>
            <Link to="/archive">Archived items</Link>
        </Grid>
    </Grid>
}