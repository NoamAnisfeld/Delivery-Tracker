export default class Currency {
    name: string = ''
    sign: string = ''
    exchangeRates: {
        [currency: string]: number        
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
        Object.assign(this, { name, sign, exchangeRates });
    }
}