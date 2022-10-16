import type { ExampleProduct } from "../interfaces/interfaces";
import type PurcashedProduct from "../data structures/PurcashedProduct";
import type { Currencies } from "../data structures/Currency";

import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux'

export interface GlobalStateInterface {
    selectedExampleProduct: ExampleProduct | null,
    exampleProducts: ExampleProduct[],

    awaitedProducts: PurcashedProduct[],
    archivedProducts: PurcashedProduct[],

    cardsView: boolean,

    availableCurrencies: Currencies,
    selectedCurrency: string,
}

export const useAppSelector: TypedUseSelectorHook<GlobalStateInterface> = useSelector;