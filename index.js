function countryData(country) {

    const url = `https://restcountries.eu/rest/v2/name/${country}`;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(error => {
        $('#results-list').empty();
        console.log(error);
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    })
}

$(function searchFetch() {
    $('form').submit( event => {
        event.preventDefault();

        const country = $('#country-destination').val();

        countryData(country);
    })
})
