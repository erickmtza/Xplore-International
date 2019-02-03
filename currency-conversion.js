'use strict';

function conversionResults(responseJson, country) {
    $('.currency').empty();

    const exchangeRate = Object.values(responseJson.quotes)[0];
    console.log(responseJson);
  
    $('.currency').append(
    `
        <p>1 USD = ${exchangeRate} ${country}</p>
    `
    );
  };

function currencyConversion(country) {
    console.log(country);

    // Requires Paid Subscription to use HTTPS.. :(
    const url = `http://apilayer.net/api/live?access_key=ba33f3bfea3aadfdc80aaa5aabf5bc43&currencies=${country}`;

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