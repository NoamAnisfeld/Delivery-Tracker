import PurcashedProduct from "../../data structures/PurcashedProduct";
import ItemCard from "../ItemCard/ItemCard";

export default function ItemsList({
    items,
}: {
    items: PurcashedProduct[],
}) {
    return <>{items.map(item =>
        <ItemCard
            key={item.uniqueKey}
            {...{ item }}
            context="AwaitingList"
        />
    )}</>
}