export type Product = Readonly<{
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Readonly<{
        rate: number,
        count: number
    }>
}>

export interface ProductList {
    [id: number]: Product
}