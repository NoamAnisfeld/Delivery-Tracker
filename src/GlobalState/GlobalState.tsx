import { createContext, useContext, useState, useEffect, useRef } from "react";
import { fetchProductsList } from "../external data/products-list";
import type { ExampleProduct } from '../interfaces/interfaces';
import PurcashedProduct from "../data structures/PurcashedProduct";

import Currency from '../data structures/Currency'
import type { Currencies } from "../data structures/Currency";

import { fetchSavedLists, saveLists } from "./SaveState";
import { pollExchangeRates } from "../external data/exchange-rates";

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

    availableCurrencies: Currencies,
    selectedCurrency: string,
    setSelectedCurrency: (currencyCode: string) => void,
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
        USD: new Currency({
            name: 'US Dollar',
            sign: '$',
            exchangeRates: {}
        }),
        ILS: new Currency({
            name: 'Israeli Shekel',
            sign: '₪',
            exchangeRates: {}
        }),
    },
    selectedCurrency: 'USD',
    setSelectedCurrency: (currencyCode: string) => {},
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
        [availableCurrencies, setAvailableCurrencies] = useState(placeholderGlobalState.availableCurrencies),
        [selectedCurrency, setSelectedCurrency] = useState('USD');
    
    useEffect(() => {
        const aborter = pollExchangeRates({
            baseCurrency: 'USD',
            targetCurrencies: ['ILS'],
            onRatesAvailable: newRates => setAvailableCurrencies(prev =>
                ({
                    ...prev,
                    USD: {
                        ...prev.USD,
                        exchangeRates: {
                            ...prev.USD.exchangeRates,
                            ...newRates
                        }
                    }
                })
            )
        });

        return aborter;
    }, []);
 
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