import ItemsList from '../ItemsList/ItemsList'
import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import Typography from '@mui/material/Typography'

export default function Archive() {
    const {
        archivedProducts
    } = useGlobalStateContext();

    return <>
        <ItemsList items={archivedProducts} context="ArchivedList" />
    </>
}