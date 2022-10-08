import type { Product, ProductList } from "../../interfaces/interfaces";
import ItemCard from "../ItemCard/ItemCard";

export default function ItemsList({
    items,
}: {
    items: ProductList,
}) {
    return <>{Object.entries(items).map(([id, item]) =>
        <ItemCard key={id} {...{ item }} />
    )}</>
}