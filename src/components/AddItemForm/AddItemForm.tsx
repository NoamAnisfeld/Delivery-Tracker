import { useEffect, useState } from 'react'

import type { Product } from '../../interfaces/interfaces'

import { useGlobalStateContext } from '../../GlobalState/GlobalState'
import { fetchProductsList } from '../../API/products-list'

import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'




export default function AddItemForm() {
    const
        [itemsList, setItemsList] = useState<Product[]>(),
        { globalState: { selectedProduct }, updateGlobalState } = useGlobalStateContext(),
        setSelectedProduct = (product: Product) =>
            updateGlobalState && updateGlobalState({ selectedProduct: product });

    useEffect(() => {
        fetchProductsList().then(setItemsList);
    }, []);

    return <Grid container spacing={5}>
        <Grid item xs={4}>
            <Autocomplete
                options={itemsList?.map(item => ({
                    label: `${item.title} (${item.price}$)`,
                    item
                })) || []}
                renderInput={params => <TextField {...params} label="label" />}
                onChange={(event, value) => value && setSelectedProduct(value.item)}
            />
        </Grid>
        <Grid item xs={8}>
            {selectedProduct && <p>{JSON.stringify(selectedProduct)}</p>}
        </Grid>
    </Grid>
}