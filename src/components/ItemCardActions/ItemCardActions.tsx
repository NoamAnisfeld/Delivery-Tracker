import type PurcashedProduct from '../../data structures/PurcashedProduct'
import {
    deleteItemFromAwaitedProducts,
    deleteItemFromArchivedProducts,
    archiveItem,
    dearchiveItem
} from '../../GlobalState/dispatchers'

import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function CardButton({
    label,
    title,
    onClick,
}:  & {
    label: string,
    title?: string,
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

    return <CardActions>
        <Grid container p={1}>
            {/* <CardButton
                label="..."
                title="Edit details"
            /> */}
            {context === "AwaitingList" ? <>
                <CardButton
                    label="Delete"
                    onClick={() => deleteItemFromAwaitedProducts(item)}
                />
                <CardButton
                    label="Archive"
                    title="Confirm delivery and archive"
                    onClick={() => archiveItem(item)}
                />
            </> : <>
                <CardButton
                    label="Delete"
                    onClick={() => deleteItemFromArchivedProducts(item)}
                />
                <CardButton
                    label="Dearchive"
                    onClick={() => dearchiveItem(item)}
                />
            </>}
       </Grid>
    </CardActions>
}