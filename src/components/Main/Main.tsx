import SecondaryNavigation from "../Navigation/SecondaryNavigation";
import AddItemForm from "../AddItemForm/AddItemForm"
import ItemsList from "../ItemsList/ItemsList"
import Archive from '../Archive/Archive';

import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from "../../GlobalState/interface";

export default function Main() {
    const awaitedProducts = useAppSelector(state => state.awaitedProducts);

    return <>
        <SecondaryNavigation />
        <Routes>
            <Route index element={<>
                <AddItemForm />
                <ItemsList items={awaitedProducts} context="AwaitingList" />
            </>} />
            <Route path="archive" element={<Archive />} />
        </Routes>
    </>
}