import type { Product } from "../../interfaces/interfaces";
import ItemCard from "../ItemCard/ItemCard";

export default function ItemsList({
    items,
}: {
    items: Product[],
}) {
    return <>{items.map(item =>
        <ItemCard key={item.id} {...{ item }} />
    )}</>
}