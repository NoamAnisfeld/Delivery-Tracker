import type { Product, ProductList } from "../../interfaces/interfaces";
import ItemCard from "../ItemCard/ItemCard";

export default function ItemsList({
    itemIds,
}: {
    itemIds: number[],
}) {
    return <>{itemIds.map(itemId =>
        <ItemCard key={itemId} {...{ itemId }} />
    )}</>
}