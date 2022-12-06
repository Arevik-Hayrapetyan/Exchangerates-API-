export type Arguments = {
    to: string;
    from: string;
    amount: number;
};

export type Base = {
    base: string;
};

const myHeaders: HeadersInit = new Headers();
if (process.env.REACT_APP_API_KEY) {
    myHeaders.append("apikey", process.env.REACT_APP_API_KEY);
}

export async function fetchData({ to, from, amount }: Arguments) {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    });
    const data = await response.json();
    return data;
}

export async function getAllCurrencies({ base }: Base) {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=&base=${base}`, {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    });
    const data = await response.json();
    return data;
}
