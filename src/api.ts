export type Arguments = {
  to: string;
  from: string;
  amount: number;
};

const myHeaders: HeadersInit = new Headers();
if (typeof process.env.API_KEY === "string") {
  myHeaders.append("apikey", "S8h4OnhqRX4LFNoBed7DaXbUViHIQfw3");
}

export async function fetchData({ to, from, amount }: Arguments) {
  const response = await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  return data;
}
