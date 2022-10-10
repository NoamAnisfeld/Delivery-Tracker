import PurcashedProduct from "../../data structures/PurcashedProduct";
import ItemCard from "../ItemCard/ItemCard";

import Grid from '@mui/material/Grid'

export default function ItemsList({
    items,
    context,
}: {
    items: PurcashedProduct[],
    context: "AwaitingList" | "ArchivedList"
}) {
    return <Grid container justifyContent="center">
        {items.map(item =>
            <Grid item key={item.uniqueKey}>
                <ItemCard
                    {...{ item, context }}
                />
            </Grid>
        )}
    </Grid>
}