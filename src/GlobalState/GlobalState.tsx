import { createContext, useContext, useState, useEffect } from "react";
import { fetchProductsList } from "../API/products-list";
import PurcashedProduct from "../data structures/PurcashedProduct";
import type { Product, ProductList } from '../interfaces/interfaces';
import { fetchSavedLists, saveLists } from "./SaveState";

interface GlobalStateInterface {
    selectedProduct: number,
    setSelectedProduct: (itemId: number) => void,

    exampleProducts: ProductList,

    awaitedProducts: PurcashedProduct[],
    addItemToAwaitedProducts: (product: PurcashedProduct) => void,
    deleteItemFromAwaitedProducts: (product: PurcashedProduct) => void,

    archivedProducts: PurcashedProduct[],
    archiveItem: (product: PurcashedProduct) => void,
    dearchiveItem: (product: PurcashedProduct) => void,
    deleteItemFromArchivedProducts: (product: PurcashedProduct) => void,
}

const placeholderGlobalState: GlobalStateInterface = {
    selectedProduct: 0,
    setSelectedProduct: (itemId: number) => {},

    exampleProducts: {},

    awaitedProducts: [],
    addItemToAwaitedProducts: (product: PurcashedProduct) => {},
    deleteItemFromAwaitedProducts: (product: PurcashedProduct) => {},

    archivedProducts: [],
    archiveItem: (product: PurcashedProduct) => {},
    dearchiveItem: (product: PurcashedProduct) => {},
    deleteItemFromArchivedProducts: (product: PurcashedProduct) => {},
}

const GlobalStateContext = createContext(placeholderGlobalState);

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: React.PropsWithChildren) {
    const
        [selectedProduct, setSelectedProduct] = useState(0),
        [exampleProducts, setExampleProducts] = useState<ProductList>({}),
        [awaitedProducts, setAwaitedProducts] = useState<PurcashedProduct[]>([]),
        [archivedProducts, setArchivedProducts] = useState<PurcashedProduct[]>([]);
 
    useEffect(() => {
        fetchProductsList().then(data => {
            const mappedData: ProductList = {};
            data.forEach(item => mappedData[item.id] = item);
            setExampleProducts(mappedData);
        });

        const {
            awaitedProducts,
            archivedProducts,
         } = fetchSavedLists();
         setAwaitedProducts(awaitedProducts);
         setArchivedProducts(archivedProducts);
    }, []);

    if (awaitedProducts.length || archivedProducts.length)
        saveLists({ awaitedProducts, archivedProducts });

    function addItemToAwaitedProducts(item: PurcashedProduct) {        
        setAwaitedProducts(prev => [...prev, item]);
    }

    function deleteItemFromAwaitedProducts(item: PurcashedProduct) {
        setAwaitedProducts(prev => [...prev].filter(x => x !== item));
    }

    function deleteItemFromArchivedProducts(item: PurcashedProduct) {
        setArchivedProducts(prev => [...prev].filter(x => x !== item));
    }

    function archiveItem (item: PurcashedProduct) {
        if (!(awaitedProducts.includes(item)))
            return;
        
        deleteItemFromAwaitedProducts(item);
        setArchivedProducts(prev => [...prev, item]);
    }

    function dearchiveItem(item: PurcashedProduct) {
        if (!(archivedProducts.includes(item)))
            return;
        
        deleteItemFromArchivedProducts(item);
        addItemToAwaitedProducts(item);
    }

    return <GlobalStateContext.Provider value={{
        exampleProducts,
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