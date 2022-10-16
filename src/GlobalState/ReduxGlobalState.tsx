import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { original } from 'immer';

import { fetchProductsList } from "../external data/products-list";
import type { ExampleProduct } from '../interfaces/interfaces';
import PurcashedProduct from "../data structures/PurcashedProduct";
import Currency from '../data structures/Currency'
import { fetchSavedLists, saveLists } from "./SaveState";
import { pollExchangeRates } from "../external data/exchange-rates";

import { GlobalStateInterface } from "./interface";

const placeholderGlobalState: GlobalStateInterface = {
    selectedExampleProduct: null,

    exampleProducts: [],
    awaitedProducts: [],

    archivedProducts: [],

    cardsView: false,

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
}

export const mainSlice = createSlice({
    name: 'main',
    initialState: placeholderGlobalState,
    reducers: {
        setSelectedExampleProduct(state, { payload }: PayloadAction<ExampleProduct | null>) {
            state.selectedExampleProduct = payload;
        },

        addItemToAwaitedProducts(state, { payload }: PayloadAction<PurcashedProduct>) {
            state.awaitedProducts.push(payload)
            saveLists(state);
        },

        deleteItemFromAwaitedProducts(state, { payload }: PayloadAction<PurcashedProduct>) {
            state.awaitedProducts = original(state.awaitedProducts)!.filter(
                item => item === payload);
            saveLists(state);
        },
    
        archiveItem(state, { payload }: PayloadAction<PurcashedProduct>) {
            state.awaitedProducts = original(state.awaitedProducts)!.filter(
                item => item === payload);
            state.archivedProducts.push(payload);
            
            saveLists(state);
        },
        
        dearchiveItem(state, { payload }: PayloadAction<PurcashedProduct>) {            
            state.archivedProducts = original(state.archivedProducts)!.filter(
                item => item === payload);
            state.awaitedProducts.push(payload);
                
            saveLists(state);
        },
            
        deleteItemFromArchivedProducts(state, { payload }: PayloadAction<PurcashedProduct>) {
            state.archivedProducts = original(state.archivedProducts)!.filter(
                item => item === payload);
                    
            saveLists(state);
        },
                
        setCardsView(state, { payload }: PayloadAction<boolean>) {
            state.cardsView = payload;
        },
                
        setSelectedCurrency(state, { payload }: PayloadAction<string>) {
            state.selectedCurrency = payload;
        },
                
        setAwaitedProducts(state, { payload }: PayloadAction<PurcashedProduct[]>) {
            state.awaitedProducts = payload;
        },
                
        setArchivedProducts(state, { payload }: PayloadAction<PurcashedProduct[]>) {
            state.archivedProducts = payload;
        },

        setExchangeRates(state, { payload }: PayloadAction<{
            [currencyCode: string]: number;
        }>) {
            state.availableCurrencies.USD.exchangeRates = payload;
        },
                
        setExampleProducts(state, { payload }: PayloadAction<ExampleProduct[]>) {
            state.exampleProducts = payload;
        },
    }
});
        
const store = configureStore({
    reducer: mainSlice.reducer
});

pollExchangeRates({
    baseCurrency: 'USD',
    targetCurrencies: ['ILS'],
    onRatesAvailable: newRates =>
        store.dispatch(mainSlice.actions.setExchangeRates(newRates))
});
 
fetchProductsList().then(list =>
    store.dispatch(mainSlice.actions.setExampleProducts(list))
);

const {
    awaitedProducts,
    archivedProducts,
} = fetchSavedLists();
store.dispatch(mainSlice.actions.setAwaitedProducts(awaitedProducts));
store.dispatch(mainSlice.actions.setArchivedProducts(archivedProducts));

if (awaitedProducts.length || archivedProducts.length)
    saveLists({ awaitedProducts, archivedProducts });


export default store;
// export const
//     setSelectedExampleProduct = (product: ExampleProduct | null) =>
//         store.dispatch(mainSlice.actions.setSelectedExampleProduct(product)),
//     addItemToAwaitedProducts = (item: PurcashedProduct) =>
//         store.dispatch(mainSlice.actions.addItemToAwaitedProducts(item)),
//     deleteItemFromAwaitedProducts = (item: PurcashedProduct) =>
//         store.dispatch(mainSlice.actions.deleteItemFromAwaitedProducts(item)),
//     archiveItem = (item: PurcashedProduct) =>
//         store.dispatch(mainSlice.actions.archiveItem(item)),
//     dearchiveItem = (item: PurcashedProduct) =>
//         store.dispatch(mainSlice.actions.dearchiveItem(item)),
//     deleteItemFromArchivedProducts = (item: PurcashedProduct) =>
//         store.dispatch(mainSlice.actions.deleteItemFromArchivedProducts(item)),
//     setCardsView = (useCardsView: boolean) =>
//         store.dispatch(mainSlice.actions.setCardsView(useCardsView)),
//     setSelectedCurrency = (currencyCode: string) =>
//         store.dispatch(mainSlice.actions.setSelectedCurrency(currencyCode));