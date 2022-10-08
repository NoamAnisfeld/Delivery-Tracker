import { createContext, useContext, useState } from "react";
import type { Product } from '../interfaces/interfaces';

interface GlobalStateInterface {
    selectedProduct: Product | null,
    setSelectedProduct: (item: Product) => void,

    awaitedProducts: Product[],
    addItemToAwaitedProducts: (newItem: Product) => void,
    deleteItemFromAwaitedProducts: (itemId: number) => void,

    archivedProducts: Product[],
    archiveItem: (itemId: number) => void,
    dearchiveItem: (itemId: number) => void,
    deleteItemFromArchivedProducts: (itemId: number) => void,
}

const placeholderGlobalState: GlobalStateInterface = {
    selectedProduct: null,
    setSelectedProduct: (item: Product) => {},

    awaitedProducts: [],
    addItemToAwaitedProducts: (newItem: Product) => {},
    deleteItemFromAwaitedProducts: (itemId: number) => {},

    archivedProducts: [],
    archiveItem: (itemId: number) => {},
    dearchiveItem: (itemId: number) => {},
    deleteItemFromArchivedProducts: (itemId: number) => {},
}

const GlobalStateContext = createContext(placeholderGlobalState);

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: React.PropsWithChildren) {
    const
        [selectedProduct, setSelectedProduct] = useState<Product | null>(null),
        [awaitedProducts, setAwaitedProducts] = useState<Product[]>([]),
        [archivedProducts, setArchivedProducts] = useState<Product[]>([]);
    
    
    // ToDo: Allow adding multiple instances of the same item

    function addItemToAwaitedProducts(newItem: Product) {
        if (awaitedProducts.find(item => item.id === newItem.id))
            return;
        
        setAwaitedProducts(prev => [...prev, newItem]);
    }

    function deleteItemFromAwaitedProducts(itemId: number) {
        const index = awaitedProducts.findIndex(item => item.id === itemId);
        if (index === -1)
            return;

        setAwaitedProducts(prev => [...prev].splice(index, 1));
    }

    function deleteItemFromArchivedProducts(itemId: number) {
        const index = archivedProducts.findIndex(item => item.id === itemId);
        if (index === -1)
            return;

        setArchivedProducts(prev => [...prev].splice(index, 1));
    }

    function archiveItem (itemId: number) {
        const awaitedIndex = awaitedProducts.findIndex(item => item.id === itemId);
        if (awaitedIndex === -1)
            return;

        const archivedIndex = archivedProducts.findIndex(item => item.id === itemId);
        if (archivedIndex === -1)
            setArchivedProducts(prev => [...prev, awaitedProducts[awaitedIndex]]);
        
        setAwaitedProducts(prev => [...prev].splice(awaitedIndex, 1));
    }

    function dearchiveItem(itemId: number) {
        const archivedIndex = archivedProducts.findIndex(item => item.id === itemId);
        if (archivedIndex === -1)
            return;

        const awaitedIndex = awaitedProducts.findIndex(item => item.id === itemId);
        if (awaitedIndex === -1)
            setAwaitedProducts(prev => [...prev, archivedProducts[archivedIndex]]);

        setArchivedProducts(prev => [...prev].splice(archivedIndex, 1));
    }

    return <GlobalStateContext.Provider value={{
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