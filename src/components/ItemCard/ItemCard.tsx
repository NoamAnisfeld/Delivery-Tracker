import PurcashedProduct from "../../data structures/PurcashedProduct";
import { useGlobalStateContext } from "../../GlobalState/GlobalState";

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CollapsibleText from "../CollapsibleText/CollapsibleText";

export default function ItemCard({
    item,
    context,
}: {
    item: PurcashedProduct,
    context: "SelectionForm" | "AwaitingList" | "ArchivedList"
}) {
    const {
        addItemToAwaitedProducts,
        deleteItemFromAwaitedProducts,
    } = useGlobalStateContext();

    return <Card sx={{ width: 300, height: 400, bgcolor: "secondary.dark", m: 2 }}>
        <Grid container direction="column" height="100%" justifyContent="space-between">
            <Grid item>
                <Typography p={2} variant="h4" component="h3" align="center">
                    {item.name}
                </Typography>

                <Typography p={2}>
                    {item.store}
                </Typography>
            </Grid>
            <Grid item>
                <Grid container justifyContent="end" marginTop="auto">
                    <Typography m={2} fontSize="2rem" textAlign="center">
                        {item.price}$
                    </Typography>
                </Grid>

                <Grid container justifyContent="center">
                    <Typography variant="h6">
                        Estimated delivery date
                    </Typography>
                    <Typography variant="h4" component="p">
                        {item.estimatedDeliveryDate?.toDateString?.() || "not specified"}
                    </Typography>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" >
                    <Grid item xs={true}>
                        <CardActions>
                            {context === "SelectionForm" &&
                                <Button variant="contained" color="secondary" size="small"
                                    title="Add to delivery waiting list"
                                    onClick={() => addItemToAwaitedProducts(item)}
                                >
                                    +
                                </Button>}
                            {context === "AwaitingList" &&
                                <Button variant="contained" color="secondary" size="small"
                                    title="Remove from delivery waiting list"
                                    onClick={() => deleteItemFromAwaitedProducts(item)}
                                >
                                    -
                                </Button>}
                        </CardActions>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    </Card>
}