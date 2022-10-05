import { createContext, useContext, useReducer } from "react";
import type { Product } from '../API/products-list';

interface GlobalStateInterface {
    selectedProduct: Product | null,
    awaitedProducts: Product[],
    archivedProducts: Product[],
}

interface GlobalStateContextInterface {
    state: GlobalStateInterface,
    updateState?: React.Dispatch<Partial<GlobalStateInterface>>
}

const initialGlobalState: GlobalStateInterface = {
        selectedProduct: null,
        awaitedProducts: [],
        archivedProducts: [],
    },
    GlobalStateContext = createContext<GlobalStateContextInterface>({
        state: initialGlobalState
    });

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: React.PropsWithChildren) {
    const [state, updateState] = useReducer(
        (prevState: GlobalStateInterface, updates: Partial<GlobalStateInterface>) => {
            return {...prevState, ...updates}
        },
    initialGlobalState);

    return <GlobalStateContext.Provider value={{ state, updateState }}>
        {children}
    </GlobalStateContext.Provider>
}