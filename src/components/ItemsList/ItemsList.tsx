import { fetchProductsList } from "../../API/products-list"
import type { Product } from "../../API/products-list"
import { useEffect, useState } from "react"

export default function ItemsList() {
    const [itemsList, setItemsList] = useState<Product[]>([]);

    useEffect(() => {
        fetchProductsList().then(list => setItemsList(list));
    }, [])

    return <ol>{
        itemsList.map(item => <li>
            {item.title}
        </li>)
    }</ol>
}