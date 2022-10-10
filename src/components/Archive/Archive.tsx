import ItemsList from '../ItemsList/ItemsList'
import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import Typography from '@mui/material/Typography'

export default function Archive() {
    const {
        archivedProducts
    } = useGlobalStateContext();

    return <>
        <Typography variant="h2" fontSize="2rem">
            Archive of delivered items
        </Typography>
        <ItemsList items={archivedProducts} context="ArchivedList" />
    </>
}