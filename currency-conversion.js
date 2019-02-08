'use strict';

function conversionResults(responseJson, country) {
    $('.currency').empty();

    const exchangeRate = Object.values(responseJson.rates)[0];
    console.log(responseJson);
    $('.currency').append(
    `
    <p>U.S. dollar Exchange Rate:</p>
    <p class="rate-comparison">1 USD = <span class="rate-color">${exchangeRate}</span> ${country}</p>
    `
    );
    if (exchangeRate < 1 ) {
        $('.rate-color').css("color", 'rgb(255, 41, 41)');
    } else {
        $('.rate-color').css("color", 'rgb(40, 240, 40)');
    }
}

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
        $('.currency').text(`Unable to find the currency exchange rate to USD.`);
    })
}