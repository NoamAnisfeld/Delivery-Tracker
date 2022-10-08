import { createContext, useContext, useState, useEffect } from "react";
import { fetchProductsList } from "../API/products-list";
import type { Product, ProductList } from '../interfaces/interfaces';

interface GlobalStateInterface {
    selectedProduct: number,
    setSelectedProduct: (itemId: number) => void,

    availableProducts: ProductList,

    awaitedProducts: Set<number>,
    addItemToAwaitedProducts: (itemId: number) => void,
    deleteItemFromAwaitedProducts: (itemId: number) => void,

    archivedProducts: Set<number>,
    archiveItem: (itemId: number) => void,
    dearchiveItem: (itemId: number) => void,
    deleteItemFromArchivedProducts: (itemId: number) => void,
}

const placeholderGlobalState: GlobalStateInterface = {
    selectedProduct: 0,
    setSelectedProduct: (itemId: number) => {},

    availableProducts: {},

    awaitedProducts: new Set([]),
    addItemToAwaitedProducts: (itemId: number) => {},
    deleteItemFromAwaitedProducts: (itemId: number) => {},

    archivedProducts: new Set([]),
    archiveItem: (itemId: number) => {},
    dearchiveItem: (itemId: number) => {},
    deleteItemFromArchivedProducts: (itemId: number) => {},
}

const GlobalStateContext = createContext(placeholderGlobalState);

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: React.PropsWithChildren) {
    const
        [selectedProduct, setSelectedProduct] = useState(0),
        [availableProducts, setAvailableProducts] = useState<ProductList>({}),
        [awaitedProducts, setAwaitedProducts] = useState<Set<number>>(new Set([])),
        [archivedProducts, setArchivedProducts] = useState<Set<number>>(new Set([]));
 
    useEffect(() => {
        fetchProductsList().then(data => {
            const mappedData: ProductList = {};
            data.forEach(item => mappedData[item.id] = item);
            setAvailableProducts(mappedData);
        });
    }, []);
       
    // ToDo: Allow adding multiple instances of the same item

    function addItemToAwaitedProducts(itemId: number) {
        if (!(availableProducts[itemId]) || awaitedProducts.has(itemId) )
            return;
        
        setAwaitedProducts( new Set(awaitedProducts).add(itemId) );
    }

    function deleteItemFromAwaitedProducts(itemId: number) {
        if (!(awaitedProducts.has(itemId)))
            return;

        setAwaitedProducts(prevSet => {
            const newSet = new Set(prevSet);
            newSet.delete(itemId);
            return newSet;
        });
    }

    function deleteItemFromArchivedProducts(itemId: number) {
        if (!(archivedProducts.has(itemId)))
            return;

        setArchivedProducts(prevSet => {
            const newSet = new Set(prevSet);
            newSet.delete(itemId);
            return newSet;
        });
    }

    function archiveItem (itemId: number) {
        if (!(awaitedProducts.has(itemId)))
            return;
        
        deleteItemFromAwaitedProducts(itemId);
        
        setArchivedProducts(prevSet => new Set(prevSet).add(itemId));
    }

    function dearchiveItem(itemId: number) {
        if (!(archivedProducts.has(itemId)))
            return;
        
        deleteItemFromArchivedProducts(itemId);
        
        setAwaitedProducts(prevSet => new Set(prevSet).add(itemId));
    }

    return <GlobalStateContext.Provider value={{
        availableProducts,
        selectedProduct,
        awaitedProducts,
        archivedProducts,

        setSelectedProduct,
        addItemToAwaitedProducts,
        deleteItemFromAwaitedProducts,
        deleteItemFromArchivedProducts,

        archiveItem,
        dearchiveItem,
    }}>
        {children}
    </GlobalStateContext.Provider>
}