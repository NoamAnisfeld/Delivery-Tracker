import store, { mainSlice } from "./store";
import type { ExampleProduct } from "../interfaces/interfaces";
import type PurcashedProduct from "../data-structures/PurcashedProduct";

export const
    setSelectedExampleProduct = (product: ExampleProduct | null) =>
        store.dispatch(mainSlice.actions.setSelectedExampleProduct(product)),

    addItemToAwaitedProducts = (item: PurcashedProduct) =>
        store.dispatch(mainSlice.actions.addItemToAwaitedProducts(item)),

    deleteItemFromAwaitedProducts = (item: PurcashedProduct) =>
        store.dispatch(mainSlice.actions.deleteItemFromAwaitedProducts(item)),
    
    archiveItem = (item: PurcashedProduct) =>
        store.dispatch(mainSlice.actions.archiveItem(item)),

    dearchiveItem = (item: PurcashedProduct) =>
        store.dispatch(mainSlice.actions.dearchiveItem(item)),
    
    deleteItemFromArchivedProducts = (item: PurcashedProduct) =>
        store.dispatch(mainSlice.actions.deleteItemFromArchivedProducts(item)),
    
    setCardsView = (useCardsView: boolean) =>
        store.dispatch(mainSlice.actions.setCardsView(useCardsView)),
    
    setSelectedCurrency = (currencyCode: string) =>
        store.dispatch(mainSlice.actions.setSelectedCurrency(currencyCode));