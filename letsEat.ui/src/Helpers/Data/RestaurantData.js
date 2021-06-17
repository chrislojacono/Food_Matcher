import axios from 'axios';
import { baseUrl } from '../config.json';

const RestaurantDataUrl = `${baseUrl}/Restaurants`;

const AddARestaurant = (RestaurantObject) => new Promise((resolve, reject) => {
  axios.post(RestaurantDataUrl, RestaurantObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const GetRandomRestaurant = (sessionId, restaurantId) => new Promise((resolve, reject) => {
  axios.get(`${RestaurantDataUrl}/random/${sessionId}/${restaurantId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});
// eslint-disable-next-line
export default { AddARestaurant, GetRandomRestaurant };
