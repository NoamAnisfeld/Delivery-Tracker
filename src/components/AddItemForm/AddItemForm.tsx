import { useState } from 'react'

import {
    useAppSelector,
    setSelectedExampleProduct,
    addItemToAwaitedProducts,
} from '../../GlobalState/ReduxGlobalState'

import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddItemDialog from '../AddItemDialog/AddItemDialog'

export default function AddItemForm() {
    const {
        exampleProducts,
    } = useAppSelector(state => state);

    const [isAddItemDialogOpened, setIsAddItemDialogOpened] = useState(false);

    return <Grid container
        alignItems="center"
        justifyContent="end"
        p={2}
    >
        <Grid item>
            <Button variant="contained" sx={{ m: 2 }}
                onClick={() => setIsAddItemDialogOpened(true)}
            >
                + Add item
            </Button>
        </Grid>
        <Grid item>
            <Autocomplete
                sx={{ minWidth: "30ch" }}
                options={Object.values(exampleProducts).map(item => ({
                    label: `${item.title} (${item.price}$)`,
                    item
                })) || []}
                isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
                renderInput={params => <TextField {...params} label="or choose from list" />}
                onChange={(event, value) => {
                    setSelectedExampleProduct(value?.item || null);

                    if (value?.item)
                        setIsAddItemDialogOpened(true);
                }}
            />
            <AddItemDialog
                open={isAddItemDialogOpened}
                onClose={() => setIsAddItemDialogOpened(false)}
                onSave={newProduct => addItemToAwaitedProducts(newProduct)}
            />
        </Grid>
    </Grid>
}