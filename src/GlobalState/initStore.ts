import { fetchProductsList } from "../external data/products-list";
import { fetchSavedLists, saveLists } from "./SaveState";
import { pollExchangeRates } from "../external data/exchange-rates";

import store, { mainSlice } from './store';

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