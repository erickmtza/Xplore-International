'use strict';

const apiKey = 'AIzaSyCGbHOkrUKhwCsZhbEMPwUPBo19t3oebjs'; 
const searchURL = 'https://www.googleapis.com/youtube/v3/search';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  $('.video-data').empty();

  for (let i = 0; i < responseJson.items.length; i++){

    $('.video-data').append(
      `<li>
        <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
        <a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">${responseJson.items[i].snippet.title}</a>
        <p>${responseJson.items[i].snippet.description}</p>
      </li>`
    )};
};

function getYouTubeVideos(query, maxResults = 4) {
  const params = {
    key: apiKey,
    q: `${query} places to visit`,
    part: 'snippet',
    maxResults,
    type: 'video'
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}