// This should actually use server-side storage, but for the assignment
// I'll use the browser's local storage

import PurcashedProduct from "../data structures/PurcashedProduct";

function safeJSONParse<T>(jsonData: string, defaultResult: T) {
    try {
        return JSON.parse(jsonData);
    } catch (error) {
        if (error instanceof SyntaxError)
            return defaultResult;
        
        throw error;
    }
}

export function fetchSavedLists(): {
    awaitedProducts: PurcashedProduct[],
    archivedProducts: PurcashedProduct[],
} {
    return {
        awaitedProducts:
            safeJSONParse(localStorage.getItem('awaitedProducts') || '[]', []),
        archivedProducts:
            safeJSONParse(localStorage.getItem('awaitedProducts') || '[]', []),
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