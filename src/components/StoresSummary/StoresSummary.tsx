import useStoresData from './useStoresData';
import Price from '../Price/Price';

import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { minHeight } from '@mui/system';

export default function StoresSummary() {
    const [storesArray, totalAllItems, totalAllPrice] = useStoresData();

    return <Grid container justifyContent="center">
        <TableContainer sx={{ width: "auto" }}>
            <Table sx={{ tableLayout: "fixed", width: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "min(20vw, 30ch)" }}>
                            Store
                        </TableCell>
                        <TableCell sx={{ width: "min(20vw, 10ch)" }}>
                            Quantity
                        </TableCell>
                        <TableCell sx={{ width: "min(20vw, 10ch)" }}>
                            Price
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {storesArray.map(item => <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.totalItems}</TableCell>
                        <TableCell>
                            <Price priceInUSDollars={item.totalPrice} />
                        </TableCell>
                    </TableRow>)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>All</TableCell>
                        <TableCell>{totalAllItems}</TableCell>
                        <TableCell>
                            <Price priceInUSDollars={totalAllPrice} />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </Grid>
}