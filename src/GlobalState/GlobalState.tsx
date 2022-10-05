import { createContext, useContext, useReducer } from "react";

interface GlobalStateInterface {
    [key: string]: any,
}

const initialGlobalState: GlobalStateInterface = {},
    GlobalStateContext = createContext({});

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