import AddItemForm from "../AddItemForm/AddItemForm"
import ItemsList from "../ItemsList/ItemsList"
import { useGlobalStateContext } from "../../GlobalState/GlobalState"

import Typography from "@mui/material/Typography"

export default function Main() {
    const {
        awaitedProducts
    } = useGlobalStateContext();

    return <>
        <AddItemForm />

        <Typography variant="h2" fontSize="2rem">
            Items Waiting for Delivery
        </Typography>
        <ItemsList items={awaitedProducts} context="AwaitingList" />
    </>
}