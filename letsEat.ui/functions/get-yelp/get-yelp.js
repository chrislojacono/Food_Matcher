/* eslint-disable func-names */
const yelp = require('yelp-fusion');

exports.handler = function (event, context, callback) {
  const { REACT_APP_YELP_API_KEY } = process.env;
  const client = yelp.client(REACT_APP_YELP_API_KEY);

  const { term, location, limit } = event.queryStringParameters;

  const searchRequest = {
    term,
    location,
    limit
  };
  console.warn(event.queryStringParameters);
  const fetchFromYelp = async function () {
    try {
      const res = await client.search(searchRequest);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          results: res,
        }),
      });
    } catch (err) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          err,
        }),
      });
    }
  };

  fetchFromYelp();
};
