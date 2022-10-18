// This should actually use server-side storage, but for the assignment
// I'll use the browser's local storage
import PurcashedProduct from "../data structures/PurcashedProduct";

const STORAGE_KEY = 'DeliveryTracker';

interface OriginalData {
    awaitedProducts: PurcashedProduct[],
    archivedProducts: PurcashedProduct[],
}

type SerializablePurcashedProduct = Pick<PurcashedProduct,
    "name" | "store" | "price"
> & {
    estimatedDeliveryDate: number | null
}

interface SerializableData {
    awaitedProducts: SerializablePurcashedProduct[],
    archivedProducts: SerializablePurcashedProduct[],
}

export function fetchSavedLists(): OriginalData {
    const emptyData: OriginalData = {
        awaitedProducts: [],
        archivedProducts: [],
    }

    const storageData = localStorage.getItem(STORAGE_KEY);
    if (!storageData)
        return emptyData;

    try {
        const parsedData: SerializableData = JSON.parse(storageData);

        return {
            awaitedProducts: parsedData.awaitedProducts.map(item =>
            (new PurcashedProduct({
                name: item.name,
                store: item.store,
                price: item.price,
                estimatedDeliveryDate: item.estimatedDeliveryDate ?
                    new Date(item.estimatedDeliveryDate) : undefined
            }))
            ),

            archivedProducts: parsedData.archivedProducts.map(item =>
            (new PurcashedProduct({
                name: item.name,
                store: item.store,
                price: item.price,
                estimatedDeliveryDate: item.estimatedDeliveryDate ?
                    new Date(item.estimatedDeliveryDate) : undefined
            }))
            ),
        }
    } catch (e) {
        return emptyData;
    }
}

export function saveLists({
    awaitedProducts,
    archivedProducts,
}: {
    awaitedProducts: PurcashedProduct[],
    archivedProducts: PurcashedProduct[],
}) {
    const awaitedToSave = awaitedProducts.map(item => ({
        name: item.name,
        store: item.store,
        price: item.price,
        estimatedDeliveryDate: item.estimatedDeliveryDate?.valueOf() || null,
    }));

    const archivedToSave = archivedProducts.map(item => ({
        name: item.name,
        store: item.store,
        price: item.price,
        estimatedDeliveryDate: item.estimatedDeliveryDate?.valueOf() || null,
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        awaitedProducts: awaitedToSave,
        archivedProducts: archivedToSave,
    }));
}