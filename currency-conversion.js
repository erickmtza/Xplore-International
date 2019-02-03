'use strict';

function conversionResults(responseJson, country) {
    $('.currency').empty();

    const exchangeRate = Object.values(responseJson.rates)[0];
    console.log(responseJson);
  
    $('.currency').append(
    `
        <p>1 USD = ${exchangeRate} ${country}</p>
    `
    );
  };

function currencyConversion(country) {
    console.log(country);

    const url = `https://api.exchangeratesapi.io/latest?base=USD&symbols=${country}`;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => conversionResults(responseJson, country))
    .catch(error => {
        $('.currency').empty();
        console.log(error);
        $('.currency').text(`Unable to find currency exchange to USD.`);
    })
}