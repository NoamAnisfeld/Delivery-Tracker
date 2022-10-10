import PurcashedProduct from "../../data structures/PurcashedProduct";
import { useGlobalStateContext } from "../../GlobalState/GlobalState";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

export default function ItemsList({
    items,
    context,
}: {
    items: PurcashedProduct[],
    context: "AwaitingList" | "ArchivedList"
}) {
    const {
        archiveItem,
        dearchiveItem,
    } = useGlobalStateContext();

    return <TableContainer><Table stickyHeader>
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
            {items.map(item => <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.store}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.estimatedDeliveryDate?.toLocaleDateString() || ''}</TableCell>
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