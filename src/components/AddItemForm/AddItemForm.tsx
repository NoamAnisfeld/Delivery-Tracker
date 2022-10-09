import { useEffect, useState } from 'react'

import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import ItemCard from '../ItemCard/ItemCard'

import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddItemDialog from '../AddItemDialog/AddItemDialog'

export default function AddItemForm() {
    const
        {
            exampleProducts, 
            selectedProduct,
            setSelectedProduct,
            addItemToAwaitedProducts,
        } = useGlobalStateContext()!;

    const [isAddItemDialogOpened, setIsAddItemDialogOpened] = useState(false);

    return <Grid container
        direction="column"
        alignContent="center"
        spacing={5}
        p={2}
    >
        <Grid item>
            <Autocomplete
                sx={{ minWidth: "30ch" }}
                options={Object.values(exampleProducts).map(item => ({
                    label: `${item.title} (${item.price}$)`,
                    item
                })) || []}
                isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
                renderInput={params => <TextField {...params} label="Choose an item" />}
                onChange={(event, value) => value && setSelectedProduct(value.item.id)}
            />
            <Button variant="contained"
                onClick={() => setIsAddItemDialogOpened(true)}
            >
                New item
            </Button>
            <AddItemDialog
                open={isAddItemDialogOpened}
                onClose={() => setIsAddItemDialogOpened(false)}
                onSave={newProduct => addItemToAwaitedProducts(newProduct)}
            />
        </Grid>
        <Grid item>
            {/* {selectedProduct ?
                <ItemCard
                    itemId={selectedProduct}
                    context="SelectionForm"
                /> :
                undefined
            } */}
        </Grid>
    </Grid>
}