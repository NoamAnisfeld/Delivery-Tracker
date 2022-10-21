import { Link, useMatch } from 'react-router-dom'

import { useAppSelector } from '../../GlobalState/interface'
import {
    setCardsView,
} from '../../GlobalState/dispatchers'

import XSHiddenText from '../XSHiddenText/XSHiddenText'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import VisualLink from '@mui/material/Link'
import TableViewIcon from '@mui/icons-material/TableView'
import GridViewIcon from '@mui/icons-material/GridView'

export default function SecondaryNavigation() {
    const cardsView = useAppSelector(state => state.cardsView);

    return <AppBar position="relative" color="secondary"><Toolbar>
        <Grid container
            alignItems="center"
            justifyContent="space-between"
            flexWrap="nowrap"
        >
            <Grid item container columnSpacing={2}
                xs="auto"
                marginLeft={{ sm: 2 }}
                alignItems="center"
            >
                <Grid item
                    padding={{ sm: 2 }}
                    sx={
                        useMatch("") ? { fontWeight: "bold" } : {}
                    }
                >
                    <VisualLink component={Link} to="/" color="inherit" underline="none">
                        Delivery
                    </VisualLink>
                </Grid>
                <Grid item
                    padding={{ sm: 2 }}
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
                        color: "secondary.contrastText",
                    }}
                    value={cardsView ? "cardsView" : "tableView"}
                    onChange={e => setCardsView(e.target.value === "cardsView")}
                >
                    <MenuItem value="tableView">
                        <TableViewIcon sx={{
                            verticalAlign: "bottom",
                            marginInlineEnd: "0.5ch",
                        }} />
                        <XSHiddenText
                            sx={{
                                '.MuiMenu-root &' : {
                                    display: "revert"
                                }        
                            }}
                        >
                            Table view
                        </XSHiddenText>
                    </MenuItem>
                    <MenuItem value="cardsView">
                        <GridViewIcon sx={{
                            verticalAlign: "bottom",
                            marginInlineEnd: "0.5ch",
                        }} />
                        <XSHiddenText
                            sx={{
                                '.MuiMenu-root &' : {
                                    display: "revert"
                                }        
                            }}
                        >
                            Cards view
                        </XSHiddenText>
                    </MenuItem>
                </Select>
            </Grid>
        </Grid>
    </Toolbar></AppBar>
}