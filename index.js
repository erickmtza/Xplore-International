'use strict';

function matchedCountries() {
    $('.country-opt-dis').on('click', 'input', function() {
        const chosenCountry = $(this).val();
        $('.country-options').addClass('hidden');
        
        countryData(chosenCountry);
    })
}

function displayCountryData(responseJson) {

    $('#result-data').empty();
    $('#results').removeClass('hidden');
    $('#js-error-message').empty();
    

    if ( responseJson.length > 1 ) {
        console.log(responseJson);
        $('.country-options').removeClass('hidden');
        
        for (let i = 0; i < responseJson.length; i++) {
            $('.country-opt-dis').append(
                `<label for="country_${i}">${responseJson[i].name}</label>

                <input type="radio" name="option" id="country_${i}" value="${responseJson[i].name}" required>`
            )
        }
    } else {
        $('#result-data').append(
        `
        <img class="country-flag" src="${responseJson[0].flag}" alt="${responseJson[0].name}">
        <h2>${responseJson[0].name}, ${responseJson[0].subregion}</h2>
        `
    )}
}

function countryData(country) {

    const url = `https://restcountries.eu/rest/v2/name/${country}`;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayCountryData(responseJson))
    .catch(error => {
        $('#result-data').empty();
        console.log(error);
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    })
}

$(function searchFetch() {
    $('form').submit( event => {
        event.preventDefault();

        const country = $('#country-destination').val();

        countryData(country);
        matchedCountries();
    })
})
