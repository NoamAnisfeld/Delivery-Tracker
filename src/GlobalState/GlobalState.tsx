import { createContext, useContext, useReducer } from "react";
import type { Product } from '../interfaces/interfaces';

interface GlobalStateInterface {
    selectedProduct: Product | null,
    setSelectedProduct: (item: Product) => void,

    awaitedProducts: Product[],
    addItemToAwaitedProducts: (newItem: Product) => void,
    deleteItemFromAwaitedProducts: (itemId: number) => void,

    archivedProducts: Product[],
    archiveItem: (itemId: number) => void,
    dearchiveItem: (itemId: number) => void,
    deleteItemFromArchivedProducts: (itemId: number) => void,
}

const GlobalStateContext = createContext<GlobalStateInterface | null>(null);

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: React.PropsWithChildren) {
    const [globalState, updateGlobalState] = useReducer(
        (
            prevState: GlobalStateInterface,
            updates: Partial<GlobalStateInterface> | ( (prevState: GlobalStateInterface) => GlobalStateInterface )
        ): GlobalStateInterface => {
            if (typeof updates === 'function') {
                return updates(prevState);
            }
            return {...prevState, ...updates}
        }, {
            selectedProduct: null,
            setSelectedProduct: (item: Product) => {},

            awaitedProducts: [],
            addItemToAwaitedProducts: (newItem: Product) => {},
            deleteItemFromAwaitedProducts: (itemId: number) => {},

            archivedProducts: [],
            archiveItem: (itemId: number) => {},
            dearchiveItem: (itemId: number) => {},
            deleteItemFromArchivedProducts: (itemId: number) => {},
        });

    updateGlobalState({
        setSelectedProduct: (item: Product) =>
            updateGlobalState({ selectedProduct: item }),

        addItemToAwaitedProducts: (newItem: Product) =>
            updateGlobalState(prevState =>
                prevState.awaitedProducts.find(item => item.id === newItem.id) ?
                prevState :
                {
                    ...prevState,
                    awaitedProdcuts: [...prevState.awaitedProducts, newItem]
                }
            ),

        deleteItemFromAwaitedProducts: (itemId: number) =>
            updateGlobalState(prevState =>
                ({
                    ...prevState,
                    awaitedProducts: [...prevState.awaitedProducts].splice(
                        prevState.awaitedProducts.findIndex(item => item.id === itemId),
                        1
                    )
                })
            ),

        archiveItem: (itemId: number) =>
            updateGlobalState(prevState => {
                const
                    { awaitedProducts, archivedProducts } = prevState,
                    index = awaitedProducts.findIndex(item => item.id === itemId);
                if (index === -1) {
                    return prevState;
                } else {
                    return {
                        ...prevState,
                        awaitedProducts: [...awaitedProducts].splice(index, 1),
                        archivedProducts: [...archivedProducts, { ...awaitedProducts[index] } ]
                    }
                }
            }),

        dearchiveItem: (itemId: number) =>
            updateGlobalState(prevState => {
                const
                    { awaitedProducts, archivedProducts } = prevState,
                    index = archivedProducts.findIndex(item => item.id === itemId);
                if (index === -1) {
                    return prevState;
                } else {
                    return {
                        ...prevState,
                        awaitedProducts: [...awaitedProducts, { ...archivedProducts[index] } ],
                        archivedProducts: [...archivedProducts].splice(index, 1)
                    }
                }
            }),
        
        deleteItemFromArchivedProducts: (itemId: number) =>
            updateGlobalState(prevState =>
                ({
                    ...prevState,
                    archivedProducts: [...prevState.archivedProducts].splice(
                        prevState.archivedProducts.findIndex(item => item.id === itemId),
                        1
                    )
                })
            ),        
    });

    return <GlobalStateContext.Provider value={globalState}>
        {children}
    </GlobalStateContext.Provider>
}