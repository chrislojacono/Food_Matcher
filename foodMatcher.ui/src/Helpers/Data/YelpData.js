import axios from 'axios';

const yelpQuery = (location, term) => new Promise((resolve, reject) => {
  axios
    .get('/.netlify/functions/get-yelp', {
      params: {
        location: `${location}`,
        term: `${term}`,
      },
    }).then((response) => {
      resolve(Object.values(response.data.results.jsonBody.businesses));
    })
    .catch((error) => reject(error));
});

export default yelpQuery;
