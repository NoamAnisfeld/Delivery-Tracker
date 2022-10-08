// This should actually use server-side storage, but for the assignment
// I'll use the browser's local storage

import { Product } from "../interfaces/interfaces";

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
    awaitedProducts: Set<number>,
    archivedProducts: Set<number>,
} {
    const
        awaitedIds: number[] =
            safeJSONParse(localStorage.getItem('awaitedProducts') || '[]', []),
        archivedIds: number[] =
            safeJSONParse(localStorage.getItem('awaitedProducts') || '[]', []);
        
        return {
            awaitedProducts: new Set(awaitedIds),
            archivedProducts: new Set(archivedIds),
        }        
}

export function saveLists({
    awaitedProducts,
    archivedProducts,
}: {
    awaitedProducts: Set<number>,
    archivedProducts: Set<number>,
}) {
    localStorage.setItem(
        'awaitedProducts',
        JSON.stringify(Array.from(awaitedProducts))
    );
    localStorage.setItem(
        'archivedProducts',
        JSON.stringify(Array.from(archivedProducts))
    );
}