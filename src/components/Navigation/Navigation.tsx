import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return <Grid container textAlign="center">
        <Grid item p={2} bgcolor="primary.main" flexBasis="50%">
            <Link to="/">
                <Typography color="primary.contrastText">
                    Products you are awaiting for
                </Typography>
            </Link>
        </Grid>
        <Grid item p={2} bgcolor="secondary.main" flexBasis="50%">
            <Link to="/archive">
                <Typography color="secondary.contrastText">
                    Archive of items you already got
                </Typography>
            </Link>
        </Grid>
    </Grid>
}