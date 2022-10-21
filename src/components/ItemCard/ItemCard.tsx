import PurcashedProduct from "../../data-structures/PurcashedProduct";
import Price from "../Price/Price";

import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card"
import ItemCardActions from "./ItemCardActions";

export default function ItemCard({
    item,
    context,
}: {
    item: PurcashedProduct,
    context: "AwaitingList" | "ArchivedList"
}) {
    return <Card sx={{ width: 300, height: 400, bgcolor: "secondary.light", m: 2 }}>
        <Grid container
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
            wrap="nowrap"
        >
            <Grid item maxHeight="40%">
                <Typography p={2} variant="h3" fontSize="2rem" align="center">
                    {item.name}
                </Typography>

                <Typography p={2}>
                    {item.store}
                </Typography>
            </Grid>
            <Grid item>
                <Grid container justifyContent="end" marginTop="auto">
                    <Typography m={2} fontSize="2rem" textAlign="center">
                        <Price priceInUSDollars={item.price} />
                    </Typography>
                </Grid>

                <Grid container justifyContent="center">
                    <Typography variant="h6">
                        Estimated delivery date
                    </Typography>
                    <Typography variant="h4" component="p">
                        {item.estimatedDeliveryDate?.toDateString?.() || "not specified"}
                    </Typography>
                    <ItemCardActions {...{ item, context }} />
                </Grid>
            </Grid>
        </Grid>
    </Card>
}