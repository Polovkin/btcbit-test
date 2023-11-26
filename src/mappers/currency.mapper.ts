export type KeyType = keyof typeof MOCK_CURRENCY
export type CurrencyMap = Map<KeyType, ValueType>;
type ValueType = typeof MOCK_CURRENCY[KeyType];

const MOCK_CURRENCY = {
    "1": "AUD",
    "2": "RSD",
    "3": "CHF",
    "4": "JPY",
    "5": "EUR",
    "6": "USD",
    "7": "DZD",
    "8": "ARS",
    "9": "AZN",
    "10": "BRL",
    "11": "CNY",
    "12": "GEL",
    "13": "INR",
    "14": "LVL",
    "15": "OMR",
    "16": "CUP",
    "17": "ZAR",
    "18": "ZWD",
    "19": "QAR",
    "20": "PLN",
    "21": "GBP",
    "22": "CAD",
    "23": "SEK",
    "24": "PHP",
    "25": "IDR"
}


const createCurrencyMap = (): CurrencyMap => {
    const currencyMap = new Map<KeyType, ValueType>();

    Object.keys(MOCK_CURRENCY).forEach((key) => {
        currencyMap.set(key as KeyType, MOCK_CURRENCY[key as KeyType]);
    });

    return currencyMap;
};


export default createCurrencyMap();
