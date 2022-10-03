import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { fetchProductsList, Product } from '../../API/products-list'

export default function AddItemForm() {
    const
        [itemsList, setItemsList] = useState<Product[]>(),
        [choosenItem, setChoosenItem] = useState<Product>();

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
                onChange={(event, value) => setChoosenItem(value?.item)}
            />
        </Grid>
        <Grid item xs={8}>
            {choosenItem && <p>{JSON.stringify(choosenItem)}</p>}
        </Grid>
    </Grid>
}