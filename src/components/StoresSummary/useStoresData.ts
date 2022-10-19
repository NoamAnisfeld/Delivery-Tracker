import PurcashedProduct from "../../data-structures/PurcashedProduct";
import { useAppSelector } from "../../GlobalState/interface";

interface StoreData {
    totalItems: number,
    totalPrice: number,
}

interface StoreDataWithName extends StoreData {
    name: string,
}

export default function useStoresData(): [
    StoreDataWithName[],
    number,
    number,
] {
    const
        awaitedProducts = useAppSelector(state => state.awaitedProducts),
        archivedProducts = useAppSelector(state => state.archivedProducts);
    
    const storesMap: {
        [key: string | symbol]: StoreData
    } = {};
    const keyForUnknownStore = Symbol();

    let totalAllItems = 0,
        totalAllPrice = 0;

    ([] as PurcashedProduct[])
    .concat(awaitedProducts, archivedProducts)
    .forEach(item => {
        const key = item.store || keyForUnknownStore;

        if (key in storesMap) {
            storesMap[key].totalItems++;
            storesMap[key].totalPrice += item.price;
        } else {
            storesMap[key] = {
                totalItems: 1,
                totalPrice: item.price
            }
        }

        totalAllItems++;
        totalAllPrice += item.price;
    })

    const storesArray: StoreDataWithName[] =
        Object.entries(storesMap).map(([key, value]) => ({
            name: key,
            totalItems: value.totalItems,
            totalPrice: value.totalPrice,
        }));

    // Object.entries only enumrate string properties
    if (keyForUnknownStore in storesMap)
        storesArray.push({
            name: 'Unknown store',
            totalItems: storesMap[keyForUnknownStore].totalItems,
            totalPrice: storesMap[keyForUnknownStore].totalPrice,
        })

    return [
        storesArray,
        totalAllItems,
        totalAllPrice,
    ]
}