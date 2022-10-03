import { fetchProductsList, getCachedProductsList } from "./products-list";

test('Products list fetching and caching', async () => {
    const
        cachedListBeginning = getCachedProductsList(),
        productsList = await fetchProductsList(),
        cachedListFinal = getCachedProductsList();
    
    expect(Array.isArray(cachedListBeginning)).toBeTruthy;
    expect(cachedListBeginning.length).toBe(0);

    expect(Array.isArray(productsList)).toBeTruthy;
    expect(productsList.length).toBeGreaterThan(0);

    expect(cachedListFinal).not.toBe(productsList);
    expect(cachedListFinal).toEqual(productsList);
});