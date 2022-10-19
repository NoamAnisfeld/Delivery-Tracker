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
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import BackIcon from '@mui/icons-material/ArrowBack'
import Typography from "@mui/material/Typography";

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
                    <TableCell sx={{ width:"min(30vw, 30ch)" }}>Item name</TableCell>
                    <TableCell sx={{ width:"min(15vw, 15ch)" }}>Store</TableCell>
                    <TableCell sx={{ width:"min(10vw, 10ch)" }}>Price</TableCell>
                    <TableCell sx={{ width:"min(15vw, 15ch)" }}>Delivery estimate</TableCell>
                    <TableCell sx={{ width:"min(30vw, 30ch)" }}>Actions</TableCell>
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
                    <TableCell>{context === "AwaitingList" ? <>
                        <Button variant="outlined" sx={{ m: 1 }}
                            onClick={() => archiveItem(item)}
                        >
                            <CheckIcon />
                            <Typography
                                component="span"
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "inline",
                                    }
                                }}
                            >
                                Archive
                            </Typography>
                        </Button>

                        <Button variant="outlined" sx={{ m: 1 }}
                            onClick={() => deleteItemFromAwaitedProducts(item)}
                        >
                            <DeleteIcon />
                            <Typography
                                component="span"
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "inline",
                                    }
                                }}
                            >
                                Delete
                            </Typography>
                        </Button>
                    </> : <>
                        <Button variant="outlined" sx={{ mx: 1 }}
                            onClick={() => dearchiveItem(item)}
                        >
                            <BackIcon /> Dearchive
                        </Button>

                        <Button variant="outlined" sx={{ mx: 1 }}
                            onClick={() => deleteItemFromArchivedProducts(item)}
                        >
                            <DeleteIcon />Delete
                        </Button>
                    </>}</TableCell>
                </TableRow>)}
            </TableBody>
        </Table></TableContainer>
}