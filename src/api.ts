const myHeaders:HeadersInit = new Headers();
if(typeof process.env.API_KEY === "string" ){
    myHeaders.append("apikey",process.env.API_KEY);
}


export const fetchedData =fetch("https://api.apilayer.com/exchangerates_data/convert?to=AMD&from=EUR&amount=5", {
    headers:myHeaders
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));