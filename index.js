'use strict';

function matchedCountries(responseJson) {
    $('.country-opt-dis').on('click', 'input', function() {
        const chosenCountry = $(this).val();
        $('.country-options').addClass('hidden');
        $('#result-data').empty();

        const countryIndex = $(this).attr('id');

        $('#result-data').append(
            `
            <h3>${responseJson[countryIndex].name}, ${responseJson[countryIndex].subregion}</h3>
            <img class="country-flag" src="${responseJson[countryIndex].flag}" alt="${responseJson[countryIndex].name}">
            
            `
        );
        getYouTubeVideos(chosenCountry);

        const currencyCode = responseJson[countryIndex].currencies[0].code;
        currencyConversion(currencyCode);
    })
}

function displayCountryData(responseJson) {
    $('.main-front-search').remove();
    $('#intro-search h2').empty().css('padding-bottom', '0');
    $('.touch-search').removeClass('hidden');
    $('.country-opt-dis').empty();
    $('#result-data').empty();
    $('.currency').empty();
    $('#results').removeClass('hidden');
    $('.country-options').addClass('hidden');
    $('#js-error-message').empty();
    $('.video-data').empty();
    console.log(responseJson);

    if ( responseJson.length > 1 ) {
        $('.country-options').find('li').remove();
        $('.country-options').removeClass('hidden');
        
        for (let i = 0; i < responseJson.length; i++) {
            $('.country-opt-dis').append(
                `<li>
                <label for="${i}">${responseJson[i].name}</label>
                <input type="radio" name="option" id="${i}" value="${responseJson[i].name}" required>
                </li>`
            )
        }
        matchedCountries(responseJson);

    } else {
        console.log(responseJson);
        $('#result-data').append(
        `
        <h3>${responseJson[0].name}, ${responseJson[0].subregion}</h3>
        <img class="country-flag" src="${responseJson[0].flag}" alt="${responseJson[0].name}">
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
    .then(responseJson => {
        if (responseJson.length == 1 ) {
            getYouTubeVideos(responseJson[0].name);
            currencyConversion(responseJson[0].currencies[0].code);
        }
        displayCountryData(responseJson)})
    .catch(error => {
        $('#result-data').empty();
        $('.currency').empty();
        $('.video-data').empty();
        $('.country-options').addClass('hidden');
        $('#results').removeClass('hidden');
        console.log(error);
        $('#js-error-message').text(`No result(s) for '${country}'`);
    })
}

function openModal() {
    $('.touch-search').on('click', () => {
        $('#myModal').removeClass('hidden');
    })
}

function closeModal() {
    $('.modal-search').on('click', () => {
        $('#myModal').addClass('hidden');
    })
}

$(function searchFetch() {
    $('form').submit( event => {
        event.preventDefault();

        const country = $('#country-destination').val();

        countryData(country);
        openModal();
        closeModal();
    })
})
