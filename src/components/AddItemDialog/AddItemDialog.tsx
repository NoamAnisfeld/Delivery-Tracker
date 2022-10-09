import { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function formatDateToValueString(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function AddItemDialog({
    open,
    onClose,
    onSave,
}: {
    open: boolean,
    onClose?: () => void
    onSave: (data: any) => void
}) {
    const
        [name, setName] = useState(''),
        [store, setStore] = useState(''),
        [price, setPrice] = useState(0),
        [estimatedDate, setEstimatedDate] = useState<Date>(new Date());

    return <Dialog
        {...{ open, onClose }}
    >
        <Grid container direction="column" p={2} spacing={2}>
            <Grid item>
                <TextField required
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Store"
                    value={store}
                    placeholder="e.g. Amazon"
                    onChange={e => setStore(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Price"
                    type="number"
                    value={String(price)}
                    helperText="in US Dollars $"
                    onChange={e => setPrice(Number(e.target.value))}
                />
            </Grid>
            <Grid item>
                <TextField type="date" variant="standard"
                    label="Estimated delivery date"
                    value={formatDateToValueString(estimatedDate)}
                    onChange={e => setEstimatedDate(new Date(e.target.value))}
                />
            </Grid>
            <Grid item>
                <Button variant="contained"
                    onClick={() => {
                        onClose && onClose();

                        onSave({
                            name,
                            store,
                            price,
                            estimatedDate
                        })
                    }}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    </Dialog>
}