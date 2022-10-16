import type { GlobalStateInterface } from "./interface";
import type { ExampleProduct } from "../interfaces/interfaces";
import type PurcashedProduct from "../data structures/PurcashedProduct";
import Currency from "../data structures/Currency";
import { saveLists } from "./SaveState";

import type { PayloadAction } from "@reduxjs/toolkit";
import {
    createSlice,
    configureStore,
    original,
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
                item => item !== payload);
            state.archivedProducts.push(payload);
            
            saveLists(state);
        },
        
        dearchiveItem(state, { payload }: PayloadAction<PurcashedProduct>) {            
            state.archivedProducts = original(state.archivedProducts)!.filter(
                item => item !== payload);
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
export default store;