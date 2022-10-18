import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function StoresSummary() {
    return <Grid container justifyContent="center">
        <TableContainer sx={{ width: "auto" }}>
            <Table sx={{ tableLayout: "fixed", width: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Store</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    </Grid>
}