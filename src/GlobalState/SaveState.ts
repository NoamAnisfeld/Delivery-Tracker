// This should actually use server-side storage, but for the assignment
// I'll use the browser's local storage

import PurcashedProduct from "../data structures/PurcashedProduct";

function safeJSONParse<T>(
    jsonData: string,
    defaultResult: T,
    jsonReviver?: (key: string, value: any) => any
) {
    try {
        return JSON.parse(jsonData, jsonReviver);
    } catch (error) {
        if (error instanceof SyntaxError)
            return defaultResult;
        
        throw error;
    }
}

function dateValueReviver(key: string, value: any) {
    if (key === 'estimatedDeliveryDate')
        return new Date(Date.parse(value));
    
    return value;
}

export function fetchSavedLists(): {
    awaitedProducts: PurcashedProduct[],
    archivedProducts: PurcashedProduct[],
} {
    return {
        awaitedProducts: safeJSONParse(
            localStorage.getItem('awaitedProducts') || '[]',
            [],
            dateValueReviver
        ),

        archivedProducts: safeJSONParse(
            localStorage.getItem('awaitedProducts') || '[]',
            [],
            dateValueReviver
        ),
    }
}

export function saveLists({
    awaitedProducts,
    archivedProducts,
}: {
    awaitedProducts: PurcashedProduct[],
    archivedProducts: PurcashedProduct[],
}) {
    localStorage.setItem(
        'awaitedProducts',
        JSON.stringify(awaitedProducts)
    );
    localStorage.setItem(
        'archivedProducts',
        JSON.stringify(archivedProducts)
    );
}