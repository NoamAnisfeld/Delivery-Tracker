import { Link, useMatch } from 'react-router-dom'

import { useAppSelector } from '../../GlobalState/interface'
import {
    setCardsView,
} from '../../GlobalState/dispatchers'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import VisualLink from '@mui/material/Link'

export default function SecondaryNavigation() {
    const cardsView = useAppSelector(state => state.cardsView);

    return <AppBar position="static" color="secondary"><Toolbar>
        <Grid container px={{ sm: 4 }} alignItems="center" justifyContent="space-between">
            <Grid item container
                xs="auto"
                marginRight="10ch"
                columnSpacing={2}
                alignItems="center"
            >
                <Grid item p={2}
                    sx={
                        useMatch("") ? { fontWeight: "bold" } : {}
                    }
                >
                    <VisualLink component={Link} to="/" color="inherit" underline="none">
                        Delivery
                    </VisualLink>
                </Grid>
                <Grid item p={2}
                    sx={
                        useMatch("archive") ? { fontWeight: "bold" } : {}
                    }
                >
                    <VisualLink component={Link} to="archive" color="inherit" underline="none">
                        Archived items
                    </VisualLink>
                </Grid>
            </Grid>
            <Grid item sx={{ marginLeft: "auto" }}>
                <Select variant="standard"
                    sx={{
                        color: "secondary.contrastText"
                    }}
                    value={cardsView ? "cardsView" : "tableView"}
                    onChange={e => setCardsView(e.target.value === "cardsView")}
                >
                    <MenuItem value="tableView">Table view</MenuItem>
                    <MenuItem value="cardsView">Cards view</MenuItem>
                </Select>
            </Grid>
        </Grid>
    </Toolbar></AppBar>
}