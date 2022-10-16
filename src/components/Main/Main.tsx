import AddItemForm from "../AddItemForm/AddItemForm"
import ItemsList from "../ItemsList/ItemsList"
import { useAppSelector } from "../../GlobalState/interface";

export default function Main() {
    const awaitedProducts = useAppSelector(state => state.awaitedProducts);

    return <>
        <AddItemForm />
        <ItemsList items={awaitedProducts} context="AwaitingList" />
    </>
}