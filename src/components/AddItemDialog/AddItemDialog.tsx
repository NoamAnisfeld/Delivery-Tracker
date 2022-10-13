import { useState, useEffect } from 'react'

import PurcashedProduct from '../../data structures/PurcashedProduct'
import { useGlobalStateContext } from '../../GlobalState/GlobalState'

import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function formatDateToValueString(date: Date) { // yyyy-mm-dd
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function AddItemDialog({
    open,
    onClose,
    onSave,
}: {
    open: boolean,
    onClose?: () => void
    onSave: (newProduct: PurcashedProduct) => void
}) {
    const WEEK = 7 * 24 * 60 * 60 * 1000;

    const
        [name, setName] = useState(''),
        [store, setStore] = useState(''),
        [price, setPrice] = useState(0),
        [estimatedDeliveryDate, setEstimatedDeliveryDate] =
            useState<Date>(new Date(Date.now() + WEEK));

    const {
        selectedExampleProduct
    } = useGlobalStateContext();

    useEffect(() => {
        setName(selectedExampleProduct?.title || '');
        setPrice(selectedExampleProduct?.price || 0);
    }, [selectedExampleProduct])

    return <Dialog
        {...{ open, onClose }}
    >
        <Grid container p={2} spacing={2}>
            <Grid item flexBasis="50%">
                <TextField required
                    label="Item name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Grid>
            <Grid item flexBasis="50%">
                <TextField
                    label="Store"
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
                    value={String(price)}
                    onChange={e => setPrice(Number(e.target.value))}
                />
            </Grid>
            <Grid item flexBasis="50%">
                <TextField type="date" variant="standard"
                    label="Recieve date estimation"
                    value={formatDateToValueString(estimatedDeliveryDate)}
                    onChange={e => setEstimatedDeliveryDate(new Date(e.target.value))}
                />
            </Grid>
        </Grid>
        <Grid container p={2} justifyContent="end" gap={2}>
            <Button onClick={onClose}>
                Cancel
            </Button>
            <Button variant="contained"
                onClick={() => {
                    onClose && onClose();

                    onSave(new PurcashedProduct({
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
    </Dialog>
}