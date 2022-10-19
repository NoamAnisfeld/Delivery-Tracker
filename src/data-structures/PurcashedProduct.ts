function *uniqueKeysGenerator() {
    let key = 0;

    while (true) {
        key++;
        yield key;
    }
}

const uniqueKeysFactory = uniqueKeysGenerator();

export default class PurcashedProduct {
    readonly name: string
    readonly store?: string
    readonly price: number
    readonly estimatedDeliveryDate?: Date
    readonly uniqueKey: number

    constructor({
        name = '',
        store,
        price = 0,
        estimatedDeliveryDate,
    }: {
        name: string,
        store?: string,
        price: number,
        estimatedDeliveryDate?: Date,
    }) {
        this.name = name;
        this.price = price;
        if (store)
            this.store = store;
        if (estimatedDeliveryDate)
            this.estimatedDeliveryDate = estimatedDeliveryDate;

        this.uniqueKey = uniqueKeysFactory.next().value || 0;
    }
}