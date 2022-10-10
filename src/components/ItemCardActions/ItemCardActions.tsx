import type PurcashedProduct from '../../data structures/PurcashedProduct'
import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

export default function ItemCardActions({
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
        dearchiveItem
    } = useGlobalStateContext();

    return <CardActions>
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
            {
                context === "AwaitingList" ?
                    <Button variant="contained" color="secondary" size="small"
                        sx={{ m: 1 }}
                        title="Confirm delivery and archive"
                        onClick={() => archiveItem(item)}
                    >
                        V
                    </Button> :
                    context === "ArchivedList" ?
                        <Button variant="contained" color="secondary" size="small"
                            sx={{ m: 1 }}
                            title="Return to awaiting list"
                            onClick={() => dearchiveItem(item)}
                        >
                            {"<-"}
                        </Button> :
                        undefined
            }
        </Grid>
    </CardActions>
}