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
    readonly price?: number
    readonly estimatedDeliveryDate?: Date
    readonly uniqueKey: number

    constructor({
        name,
        store,
        price,
        estimatedDeliveryDate,
    }: {
        name: string,
        store?: string,
        price?: number,
        estimatedDeliveryDate?: Date,
    }) {
        if (!name)
            throw ("A product must have a name");

        this.name = ''; // make TS happy
        Object.assign(this, {
            name,
            store,
            price,
            estimatedDeliveryDate,
        })

        this.uniqueKey = uniqueKeysFactory.next().value || 0;
    }
}