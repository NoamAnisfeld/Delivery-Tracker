import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Product } from "../../interfaces/interfaces"

import CollapsibleText from "../CollapsibleText/CollapsibleText";
import { useGlobalStateContext } from "../../GlobalState/GlobalState";

export default function ItemCard({
    itemId,
    context,
}: {
    itemId: number
    context: "SelectionForm" | "AwaitingList" | "ArchivedList"
}) {
    const {
        availableProducts,
        awaitedProducts,
        addItemToAwaitedProducts,
        deleteItemFromAwaitedProducts,
    } = useGlobalStateContext()!;

    const item = availableProducts[itemId];

    return item ? <Card sx={{ maxWidth: 500, bgcolor: "secondary.dark", m: 2 }}>
        <Typography p={2} variant="h4" component="h3" align="center">
            {item.title}
        </Typography>
        <Grid container>
            <Grid item xs={true}>
                <CardContent>
                    <CollapsibleText>
                        <Typography variant="body2" color="text.secondary">
                            {item.description}
                        </Typography>
                    </CollapsibleText>
                </CardContent>
            </Grid>
            <Grid item sm={3} m={2}>
                <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "auto" }}
                    image={item.image}
                    alt={item.title}
                />
            </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Grid item xs={true}>
                <CardActions>
                    {context === "SelectionForm" &&
                    <Button variant="contained" color="secondary" size="small"
                        title="Add to delivery waiting list"
                        onClick={() => addItemToAwaitedProducts(itemId)}
                    >
                        +
                    </Button>}
                    {context === "AwaitingList" &&
                    <Button variant="contained" color="secondary" size="small"
                        title="Remove from delivery waiting list"
                        onClick={() => deleteItemFromAwaitedProducts(itemId)}
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
    </Card> : null
}