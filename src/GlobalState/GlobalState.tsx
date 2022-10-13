import { createContext, useContext, useState, useEffect, useRef } from "react";
import { fetchProductsList } from "../external data/products-list";
import PurcashedProduct from "../data structures/PurcashedProduct";
import type { ExampleProduct } from '../interfaces/interfaces';
import Currency from '../data structures/Currency'
import { fetchSavedLists, saveLists } from "./SaveState";

interface GlobalStateInterface {
    selectedExampleProduct: ExampleProduct | null,
    setSelectedExampleProduct: (product: ExampleProduct | null) => void,

    exampleProducts: ExampleProduct[],

    awaitedProducts: PurcashedProduct[],
    addItemToAwaitedProducts: (product: PurcashedProduct) => void,
    deleteItemFromAwaitedProducts: (product: PurcashedProduct) => void,

    archivedProducts: PurcashedProduct[],
    archiveItem: (product: PurcashedProduct) => void,
    dearchiveItem: (product: PurcashedProduct) => void,
    deleteItemFromArchivedProducts: (product: PurcashedProduct) => void,

    cardsView: boolean,
    setCardsView: (value: boolean) => void,

    availableCurrencies: {
        [currencyName: string]: Currency
    },
    selectedCurrency: string,
    setSelectedCurrency: (currencyName: string) => void,
}

const placeholderGlobalState: GlobalStateInterface = {
    selectedExampleProduct: null,
    setSelectedExampleProduct: (product: ExampleProduct | null) => {},

    exampleProducts: [],

    awaitedProducts: [],
    addItemToAwaitedProducts: (product: PurcashedProduct) => {},
    deleteItemFromAwaitedProducts: (product: PurcashedProduct) => {},

    archivedProducts: [],
    archiveItem: (product: PurcashedProduct) => {},
    dearchiveItem: (product: PurcashedProduct) => {},
    deleteItemFromArchivedProducts: (product: PurcashedProduct) => {},

    cardsView: false,
    setCardsView: (value: boolean) => {},

    availableCurrencies: {
        'US Dollar': new Currency({ name: 'US Dollar', sign: '$', exchangeRates: {} })
    },
    selectedCurrency: 'US Dollar',
    setSelectedCurrency: (currencyName: string) => {},
}

const GlobalStateContext = createContext(placeholderGlobalState);

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: React.PropsWithChildren) {
    const
        [exampleProducts, setExampleProducts] = useState<ExampleProduct[]>([]),
        [selectedExampleProduct, setSelectedExampleProduct] = useState<ExampleProduct | null>(null),
        [awaitedProducts, setAwaitedProducts] = useState<PurcashedProduct[]>([]),
        [archivedProducts, setArchivedProducts] = useState<PurcashedProduct[]>([]),
        [cardsView, setCardsView] = useState(false),
        [availableCurrencies, setAvailableCurrencies] = useState<{
            [currencyName: string]: Currency
        }>({
            'US Dollar': new Currency({ name: 'US Dollar', sign: '$', exchangeRates: {
                'Israeli Shekel': 3
            }}),
            'Israeli Shekel': new Currency({ name: 'Israeli Shekel', sign: '₪', exchangeRates: {
                'US Dollar': 1 / 3
            }})
        }),
        [selectedCurrency, setSelectedCurrency] = useState('US Dollar');
 
    useEffect(() => {
        fetchProductsList().then(setExampleProducts);

        const {
            awaitedProducts,
            archivedProducts,
         } = fetchSavedLists();
         setAwaitedProducts(awaitedProducts);
         setArchivedProducts(archivedProducts);
    }, []);

    // prevents saving the initial empty lists
    const doSaveListsRef = useRef(false);
    if (awaitedProducts.length || archivedProducts.length)
        doSaveListsRef.current = true;
    if (doSaveListsRef.current)
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
        selectedExampleProduct,
        awaitedProducts,
        archivedProducts,

        setSelectedExampleProduct,
        addItemToAwaitedProducts,
        deleteItemFromAwaitedProducts,
        deleteItemFromArchivedProducts,

        archiveItem,
        dearchiveItem,

        cardsView,
        setCardsView,

        availableCurrencies,
        selectedCurrency,
        setSelectedCurrency,
    }}>
        {children}
    </GlobalStateContext.Provider>
}