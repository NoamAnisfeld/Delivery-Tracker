import PurcashedProduct from "../../data structures/PurcashedProduct";
import { useGlobalStateContext } from "../../GlobalState/GlobalState";

import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card"
import CardActions from '@mui/material/CardActions';

export default function ItemCard({
    item,
    context,
}: {
    item: PurcashedProduct,
    context: "AwaitingList" | "ArchivedList"
}) {
    const {
        deleteItemFromAwaitedProducts,
        deleteItemFromArchivedProducts,
        archiveItem,
    } = useGlobalStateContext();

    return <Card sx={{ width: 300, height: 400, bgcolor: "secondary.dark", m: 2 }}>
        <Grid container
            direction="column"
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
                <CardActions>
                    <Grid container p={1}>
                        <Button variant="contained" color="secondary" size="small"
                            sx={{ m: 1 }}
                            title="Edit details"
                        >
                            ...
                        </Button>
                        <Button variant="contained" color="secondary" size="small"
                            sx={{ m: 1 }}
                            title="Delete"
                            onClick={() =>
                                context === "AwaitingList" ?
                                    deleteItemFromAwaitedProducts(item) :
                                context === "ArchivedList" ?
                                    deleteItemFromArchivedProducts(item) :
                                undefined
                            }
                        >
                            -
                        </Button>
                        <Button variant="contained" color="secondary" size="small"
                            sx={{ m: 1 }}
                            title="Confirm delivery and archive"
                            onClick={() => archiveItem(item)}
                        >
                            V
                        </Button>
                    </Grid>
                </CardActions>
            </Grid>
        </Grid>
    </Card>
}