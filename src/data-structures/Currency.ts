export default class Currency {
    name: string
    sign: string = ''
    exchangeRates: {
        [currencyCode: string]: number        
    } = {}

    constructor({
        name,
        sign = '',
        exchangeRates,
    }: {
        name: string,
        sign?: string
        exchangeRates: {
            [currency: string]: number
        },
    }) {
        this.name = name;
        this.sign = sign;
        this.exchangeRates = exchangeRates;
    }
}

export interface Currencies {
    [currencyCode: string]: Currency
}