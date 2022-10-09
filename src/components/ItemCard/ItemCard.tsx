import PurcashedProduct from "../../data structures/PurcashedProduct";
import { useGlobalStateContext } from "../../GlobalState/GlobalState";

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
        availableProducts,
        awaitedProducts,
        addItemToAwaitedProducts,
        deleteItemFromAwaitedProducts,
    } = useGlobalStateContext()!;

    return <Card sx={{ maxWidth: 500, bgcolor: "secondary.dark", m: 2 }}>
        <Typography p={2} variant="h4" component="h3" align="center">
            {item.name}
        </Typography>
        <Grid container>
            {// @ts-ignore until I add it
            item.description ? <Grid item xs={true}>
                <CardContent>
                    <CollapsibleText>
                        <Typography variant="body2" color="text.secondary">
                            {// @ts-ignore until I add it
                            item.description}
                        </Typography>
                    </CollapsibleText>
                </CardContent>
            </Grid> : undefined}
            {// @ts-ignore until I add it
            item.image ? <Grid item sm={3} m={2}>
                <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "auto" }}
                    // @ts-ignore until I add it
                    image={item.image}
                    alt={item.name}
                />
            </Grid> : undefined}
        </Grid>
        <Grid container sx={{ justifyContent: "space-between", alignItems: "center" }}>
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
            <Grid item sm={4}>
                <Typography variant="h5" m={2} textAlign="center">
                    {item.price}$
                </Typography>
            </Grid>
        </Grid>
    </Card>
}