import PurcashedProduct from "../../data-structures/PurcashedProduct";
import { useAppSelector } from "../../GlobalState/interface";
import {
    archiveItem,
    dearchiveItem,
    deleteItemFromAwaitedProducts,
    deleteItemFromArchivedProducts,
} from "../../GlobalState/dispatchers";


import Price from "../Price/Price";
import ColoredDate from "../ColoredDate/ColoredDate";
import ItemCard from "../ItemCard/ItemCard";

import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import BackIcon from '@mui/icons-material/ArrowBack'

function ActionButton({
    label,
    icon,
    onClick = () => { },
}: {
    label: string,
    icon?: React.ReactNode,
    onClick?: () => void
}) {
    return <Tooltip title={label}>
        <Button variant="outlined"
            sx={{
                m: 1,
                '& span': {
                    display: {
                        xs: "none",
                        sm: "revert",
                    }
                }
            }}
            {...{ onClick }}
        >
            {icon}
            <Typography component="span">
                {label}
            </Typography>
        </Button>
    </Tooltip>
}

export default function ItemsList({
    items,
    context,
}: {
    items: PurcashedProduct[],
    context: "AwaitingList" | "ArchivedList"
}) {
    const cardsView = useAppSelector(state => state.cardsView);

    const sortedItems = [...items].sort((a, b) =>
        !a.estimatedDeliveryDate ?
            !b.estimatedDeliveryDate ?
                0 :
                1 :
            !b.estimatedDeliveryDate ?
                -1 :
                a.estimatedDeliveryDate < b.estimatedDeliveryDate ?
                    -1 :
                    a.estimatedDeliveryDate > b.estimatedDeliveryDate ?
                        1 :
                        0
    );

    return cardsView ?
        <Grid container justifyContent="center">
            {sortedItems.map(item => <ItemCard
                key={item.uniqueKey}
                {...{ item, context }}
            />)}
        </Grid> :
        <TableContainer><Table stickyHeader sx={{ tableLayout: "fixed" }}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ width: "min(30vw, 30ch)" }}>Item name</TableCell>
                    <TableCell sx={{ width: "min(15vw, 15ch)" }}>Store</TableCell>
                    <TableCell sx={{ width: "min(10vw, 10ch)" }}>Price</TableCell>
                    <TableCell sx={{ width: "min(15vw, 15ch)" }}>Delivery estimate</TableCell>
                    <TableCell sx={{ width: "min(30vw, 30ch)" }}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedItems.map(item => <TableRow
                    key={item.uniqueKey}
                    sx={{
                        '& .MuiTableCell-root': {
                            py: 0,
                        }
                    }}
                >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.store}</TableCell>
                    <TableCell><Price priceInUSDollars={item.price} /></TableCell>
                    <TableCell>
                        {context === 'AwaitingList' ?
                            <ColoredDate date={item.estimatedDeliveryDate} /> :
                            item.estimatedDeliveryDate?.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        {context === "AwaitingList" ? <>
                            <ActionButton
                                label="Archive"
                                icon={<CheckIcon />}
                                onClick={() => archiveItem(item)}
                            />
                            <ActionButton
                                label="Delete"
                                icon={<DeleteIcon />}
                                onClick={() => deleteItemFromAwaitedProducts(item)}
                            />
                        </> : <>
                            <ActionButton
                                label="Dearchive"
                                icon={<BackIcon />}
                                onClick={() => dearchiveItem(item)}
                            />
                            <ActionButton
                                label="Delete"
                                icon={<DeleteIcon />}
                                onClick={() => deleteItemFromArchivedProducts(item)}
                            />
                        </>}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table></TableContainer>
}