import PurcashedProduct from "../../data-structures/PurcashedProduct";
import { useAppSelector } from "../../GlobalState/interface";

import ItemCard from "../ItemCard/ItemCard";
import ItemRow from "./ItemRow";

import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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
                {sortedItems.map(item => <ItemRow
                    key={item.uniqueKey}
                    {...{ item, context }}
                />)}
            </TableBody>
        </Table></TableContainer>
}