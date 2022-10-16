import { useState } from 'react'

import PurcashedProduct from '../../data structures/PurcashedProduct'

import { useAppSelector } from '../../GlobalState/interface'
import {
    addItemToAwaitedProducts,
} from '../../GlobalState/dispatchers'

import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function formatDateToValueString(date: Date) { // yyyy-mm-dd
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function AddItemForm() {
    const WEEK = 7 * 24 * 60 * 60 * 1000;

    const
        [isAddItemDialogOpened, setIsAddItemDialogOpened] = useState(false),
        [name, setName] = useState(''),
        [store, setStore] = useState(''),
        [price, setPrice] = useState(0),
        [estimatedDeliveryDate, setEstimatedDeliveryDate] =
            useState<Date>(new Date(Date.now() + WEEK));

    const exampleProducts = useAppSelector(state => state.exampleProducts);

    return <Grid container
        alignItems="center"
        justifyContent="end"
        p={2}
    >
        <Button variant="contained" sx={{ m: 2 }}
            onClick={() => setIsAddItemDialogOpened(true)}
        >
            + Add item
        </Button>

        <Dialog
            open={isAddItemDialogOpened}
            onClose={() => setIsAddItemDialogOpened(false)}
        >
            <Grid container p={3} spacing={3}>
                <Grid item flexBasis="50%">
                    <Autocomplete
                        freeSolo={true}
                        options={Object.values(exampleProducts).map(item => ({
                            label: item.title,
                            item
                        })) || []}
                        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
                        renderInput={params =>
                            <TextField
                                {...params}
                                label="Name"
                            />}
                        onChange={(event, value) => {
                            if (typeof value === 'string') {
                                setName(value)
                            } else {
                                setName(value?.item.title || '');
                                setPrice(price =>
                                    (typeof value?.item.price === 'number') ?
                                        value.item.price : price
                                );
                            }
                        }}
                    />
                </Grid>
                <Grid item flexBasis="50%">
                    <TextField
                        label="Store"
                        sx={{ width: "100%" }}
                        value={store}
                        placeholder="e.g. Amazon"
                        onChange={e => setStore(e.target.value)}
                    />
                </Grid>
                <Grid item container flexBasis="50%" alignItems="center">
                    <span style={{ marginLeft: "-1ch" }}>$</span>
                    <TextField
                        label="Price"
                        type="number"
                        sx={{ width: "100%" }}
                        value={String(price)}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                </Grid>
                <Grid item flexBasis="50%">
                    <TextField type="date"
                        label="Recieve date estimation"
                        sx={{ width: "100%" }}
                        value={formatDateToValueString(estimatedDeliveryDate)}
                        onChange={e => setEstimatedDeliveryDate(new Date(e.target.value))}
                    />
                </Grid>
            </Grid>
            <Grid container p={2} justifyContent="end" gap={2}>
                <Button onClick={() => setIsAddItemDialogOpened(false)}>
                    Cancel
                </Button>
                <Button variant="contained"
                    onClick={() => {
                        setIsAddItemDialogOpened(false);
                        addItemToAwaitedProducts(new PurcashedProduct({
                            name,
                            store,
                            price,
                            estimatedDeliveryDate
                        }));
                    }}
                >
                    Add
                </Button>
            </Grid>
        </Dialog >
    </Grid >
}