const API_URL = "https://fakestoreapi.com/products";

let cachedProductsList: any[] = [];

function jsonClone(jsonObject: any) {
    return JSON.parse(JSON.stringify(jsonObject))
}

export async function fetchProductsList() {
    const
        response = await fetch(API_URL),
        json = await response.json();

    if (!Array.isArray(json)) {
        console.warn("Products list API returned an unexpected data format");
        return [];
    }

    cachedProductsList = jsonClone(json);
    return json;
}

export function getCachedProductsList() {
    return jsonClone(cachedProductsList);
}