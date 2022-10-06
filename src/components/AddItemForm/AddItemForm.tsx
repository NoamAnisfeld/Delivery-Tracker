import { useEffect, useState } from 'react'

import type { Product } from '../../interfaces/interfaces'

import { useGlobalStateContext } from '../../GlobalState/GlobalState'
import { fetchProductsList } from '../../API/products-list'

import ItemCard from '../ItemCard/ItemCard'

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

    return <Grid container
        direction="column"
        alignContent="center"
        spacing={5}
        p={2}
    >
        <Grid item>
            <Autocomplete
                sx={{ minWidth: "30ch" }}
                options={itemsList?.map(item => ({
                    label: `${item.title} (${item.price}$)`,
                    item
                })) || []}
                renderInput={params => <TextField {...params} label="Choose an item" />}
                onChange={(event, value) => value && setSelectedProduct(value.item)}
            />
        </Grid>
        <Grid item>
            {selectedProduct && <ItemCard item={selectedProduct} />}
        </Grid>
    </Grid>
}