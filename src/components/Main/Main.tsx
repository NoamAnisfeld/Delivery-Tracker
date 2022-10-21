import AddItemForm from "../AddItemForm/AddItemForm"
import ItemsList from "../ItemsList/ItemsList"
import Archive from '../Archive/Archive'

import { Routes, Route } from 'react-router-dom'
import { useAppSelector } from "../../GlobalState/interface"

import Container from '@mui/material/Container'

export default function Main() {
    const awaitedProducts = useAppSelector(state => state.awaitedProducts);

    return <Container sx={{ marginTop: 16 }}>
        <Routes>
            <Route index element={<>
                <AddItemForm />
                <ItemsList items={awaitedProducts} context="AwaitingList" />
            </>} />
            <Route path="archive" element={<Archive />} />
        </Routes>
    </Container>
}