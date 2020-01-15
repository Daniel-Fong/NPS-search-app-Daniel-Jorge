'use strict';

// fetch park info from 1 or more states
const apiKey = 'aOMUjXVBw7kOMNf0HiMrvWG0z9YO6HfAipVf1PPf';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

const findParks = function(query, maxResults) {
    let queryString = `limit=${maxResults}&api_key=${apiKey}`;
    query.forEach(state => {
        queryString = `stateCode=${state}&`+ queryString;
        console.log(queryString);
    });
    const url = searchURL + '?' + queryString;
    fetch(url)
    .then(response => 
        response.json())
    .then(jsonData => {
        extractData(jsonData);
    });
};

const watchForm = function() {
    $('form').submit(event => {
        event.preventDefault();
        $('.parks').empty();
        const states = $('#states').val().split(', ');
        const maxResults = $('#max').val();
        findParks(states, maxResults);
    });
}

// Extract data from API response to be used on page
// Data: parkName, url, description, address

const extractData = function(object) {
    object.data.forEach(park => {
        let {
            fullName,
            url,
            description,
            directionsUrl,
        } = park;
        $('.parks').append(createTemplate(fullName, url, description, directionsUrl))
    });
};

const createTemplate = function(fullName, url, description, directionsUrl) {
    let template =`
    <section>
        <h2><a href="${url}">${fullName}</a></h2>
            <ul>
                <li>Description: ${description}</li>
                <li>Directions: ${directionsUrl}</li>
            </ul>
    </section>
    `;
    return template;
};

$(watchForm());