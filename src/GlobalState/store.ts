import type { GlobalStateInterface } from "./interface";
import type { ExampleProduct } from "../interfaces/interfaces";
import type PurcashedProduct from "../data structures/PurcashedProduct";
import Currency from "../data structures/Currency";
import { saveLists } from "./SaveState";

import type { PayloadAction } from "@reduxjs/toolkit";
import {
    createSlice,
    configureStore,
} from "@reduxjs/toolkit";

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
        setSelectedExampleProduct(draftState, { payload }: PayloadAction<ExampleProduct | null>) {
            draftState.selectedExampleProduct = payload;
        },

        addItemToAwaitedProducts(draftState, { payload }: PayloadAction<PurcashedProduct>) {
            draftState.awaitedProducts.push(payload)
            saveLists(draftState);
        },

        deleteItemFromAwaitedProducts(draftState, { payload }: PayloadAction<PurcashedProduct>) {
            draftState.awaitedProducts = draftState.awaitedProducts.filter(
                item => item.uniqueKey !== payload.uniqueKey);
            saveLists(draftState);
        },
    
        archiveItem(draftState, { payload }: PayloadAction<PurcashedProduct>) {
            draftState.awaitedProducts = draftState.awaitedProducts.filter(
                item => item.uniqueKey !== payload.uniqueKey);
            draftState.archivedProducts.push(payload);
            
            saveLists(draftState);
        },
        
        dearchiveItem(draftState, { payload }: PayloadAction<PurcashedProduct>) {            
            draftState.archivedProducts = draftState.archivedProducts.filter(
                item => item.uniqueKey !== payload.uniqueKey);
            draftState.awaitedProducts.push(payload);
                
            saveLists(draftState);
        },
            
        deleteItemFromArchivedProducts(draftState, { payload }: PayloadAction<PurcashedProduct>) {
            draftState.archivedProducts = draftState.archivedProducts.filter(
                item => item.uniqueKey !== payload.uniqueKey);
                    
            saveLists(draftState);
        },
                
        setCardsView(draftState, { payload }: PayloadAction<boolean>) {
            draftState.cardsView = payload;
        },
                
        setSelectedCurrency(draftState, { payload }: PayloadAction<string>) {
            draftState.selectedCurrency = payload;
        },
                
        setAwaitedProducts(draftState, { payload }: PayloadAction<PurcashedProduct[]>) {
            draftState.awaitedProducts = payload;
        },
                
        setArchivedProducts(draftState, { payload }: PayloadAction<PurcashedProduct[]>) {
            draftState.archivedProducts = payload;
        },

        setExchangeRates(draftState, { payload }: PayloadAction<{
            [currencyCode: string]: number;
        }>) {
            draftState.availableCurrencies.USD.exchangeRates = payload;
        },
                
        setExampleProducts(draftState, { payload }: PayloadAction<ExampleProduct[]>) {
            draftState.exampleProducts = payload;
        },
    }
});
        
const store = configureStore({
    reducer: mainSlice.reducer
});
export default store;