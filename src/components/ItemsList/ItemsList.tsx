import PurcashedProduct from "../../data structures/PurcashedProduct";
import { useAppSelector } from "../../GlobalState/interface";
import {
    archiveItem,
    dearchiveItem,
} from "../../GlobalState/dispatchers";


import Price from "../Price/Price";
import ColoredDate from "../ColoredDate/ColoredDate";

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ItemCard from "../ItemCard/ItemCard";

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
        <TableContainer><Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>Item name</TableCell>
                    <TableCell>Store</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Delivery estimate</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedItems.map(item => <TableRow key={item.uniqueKey}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.store}</TableCell>
                    <TableCell><Price priceInUSDollars={item.price} /></TableCell>
                    <TableCell>
                        {context === 'AwaitingList' ?
                            <ColoredDate date={item.estimatedDeliveryDate} /> :
                            item.estimatedDeliveryDate?.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{context === "AwaitingList" ?
                        <Button variant="outlined"
                            onClick={() => archiveItem(item)}
                        >
                            Archive
                        </Button> :
                        <Button variant="outlined"
                            onClick={() => dearchiveItem(item)}
                        >
                            Dearchive
                        </Button>
                    }</TableCell>
                </TableRow>)}
            </TableBody>
        </Table></TableContainer>
}