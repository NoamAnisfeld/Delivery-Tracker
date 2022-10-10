import type PurcashedProduct from '../../data structures/PurcashedProduct'
import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function CardButton({
    label,
    title,
    onClick,
}:  & {
    label: string,
    title: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}) {
    return <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ m: 1 }}
        {...{ title, onClick }}
    >
        {label}
    </Button >
}

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
            {/* <CardButton
                label="..."
                title="Edit details"
            /> */}
            {context === "AwaitingList" ? <>
                <CardButton
                    label="-"
                    title="Delete"
                    onClick={() => deleteItemFromAwaitedProducts(item)}
                />
                <CardButton
                    label="V"
                    title="Confirm delivery and archive"
                    onClick={() => archiveItem(item)}
                />
            </> : <>
                <CardButton
                    label="-"
                    title="Delete"
                    onClick={() => deleteItemFromArchivedProducts(item)}
                />
                <CardButton
                    label="V"
                    title="Return to awaiting list"
                    onClick={() => dearchiveItem(item)}
                />
            </>}
       </Grid>
    </CardActions>
}