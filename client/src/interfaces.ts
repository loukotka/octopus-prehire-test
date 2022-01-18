export interface Currency {
    code: string,
    country: string
}
export interface CurrencyComplete extends Currency {
    rates: number[]
}