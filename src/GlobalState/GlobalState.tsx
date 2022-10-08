import { createContext, useContext, useState } from "react";
import type { Product, ProductList } from '../interfaces/interfaces';

interface GlobalStateInterface {
    selectedProduct: Product | null,
    setSelectedProduct: (item: Product) => void,

    awaitedProducts: ProductList,
    addItemToAwaitedProducts: (newItem: Product) => void,
    deleteItemFromAwaitedProducts: (itemId: number) => void,

    archivedProducts: ProductList,
    archiveItem: (itemId: number) => void,
    dearchiveItem: (itemId: number) => void,
    deleteItemFromArchivedProducts: (itemId: number) => void,
}

const placeholderGlobalState: GlobalStateInterface = {
    selectedProduct: null,
    setSelectedProduct: (item: Product) => {},

    awaitedProducts: {},
    addItemToAwaitedProducts: (newItem: Product) => {},
    deleteItemFromAwaitedProducts: (itemId: number) => {},

    archivedProducts: {},
    archiveItem: (itemId: number) => {},
    dearchiveItem: (itemId: number) => {},
    deleteItemFromArchivedProducts: (itemId: number) => {},
}

const GlobalStateContext = createContext(placeholderGlobalState);

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: React.PropsWithChildren) {
    const
        [selectedProduct, setSelectedProduct] = useState<Product | null>(null),
        [awaitedProducts, setAwaitedProducts] = useState<ProductList>({}),
        [archivedProducts, setArchivedProducts] = useState<ProductList>({});
    
    
    // ToDo: Allow adding multiple instances of the same item

    function addItemToAwaitedProducts(newItem: Product) {
        if (awaitedProducts[newItem.id])
            return;
        
        setAwaitedProducts(prevList => ({...prevList, [newItem.id]: newItem}) );
    }

    function deleteItemFromAwaitedProducts(itemId: number) {
        if (!(awaitedProducts[itemId]))
            return;

        setAwaitedProducts(prevList => {
            const newList = {...prevList};
            delete newList[itemId];
            return newList;
        });
    }

    function deleteItemFromArchivedProducts(itemId: number) {
        if (!(archivedProducts[itemId]))
            return;

        setArchivedProducts(prevList => {
            const newList = {...prevList};
            delete newList[itemId];
            return newList;
        });
    }

    function archiveItem (itemId: number) {
        if (!(awaitedProducts[itemId]))
            return;

        if (!(archivedProducts[itemId]))
            setArchivedProducts(prevList => ({...prevList, itemId: awaitedProducts[itemId]}));
        
        deleteItemFromAwaitedProducts(itemId);
    }

    function dearchiveItem(itemId: number) {
        if (!(archivedProducts[itemId]))
            return;

        if (!(awaitedProducts[itemId]))
            setAwaitedProducts(prevList => ({...prevList, itemId: archivedProducts[itemId]}));
        
        deleteItemFromArchivedProducts(itemId);
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