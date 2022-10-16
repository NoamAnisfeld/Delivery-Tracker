import ItemsList from '../ItemsList/ItemsList'

import { useAppSelector } from '../../GlobalState/interface';

export default function Archive() {
    const archivedProducts = useAppSelector(state => state.archivedProducts);

    return <>
        <ItemsList items={archivedProducts} context="ArchivedList" />
    </>
}