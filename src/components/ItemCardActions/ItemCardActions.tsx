import type PurcashedProduct from '../../data-structures/PurcashedProduct'
import {
    deleteItemFromAwaitedProducts,
    deleteItemFromArchivedProducts,
    archiveItem,
    dearchiveItem
} from '../../GlobalState/dispatchers'

import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import BackIcon from '@mui/icons-material/ArrowBack'

function CardButton({
    label,
    title,
    onClick,
}:  & {
    label: React.ReactNode,
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
            {context === "AwaitingList" ? <>
                <CardButton
                    label={<><DeleteIcon /> Delete</>}
                    onClick={() => deleteItemFromAwaitedProducts(item)}
                />
                <CardButton
                    label={<><CheckIcon /> Archive</>}
                    title="Confirm delivery and archive"
                    onClick={() => archiveItem(item)}
                />
            </> : <>
                <CardButton
                    label={<><DeleteIcon /> Delete</>}
                    onClick={() => deleteItemFromArchivedProducts(item)}
                />
                <CardButton
                    label={<><BackIcon /> Dearchive</>}
                    onClick={() => dearchiveItem(item)}
                />
            </>}
       </Grid>
    </CardActions>
}