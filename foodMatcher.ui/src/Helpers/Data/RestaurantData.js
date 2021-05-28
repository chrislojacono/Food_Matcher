import axios from 'axios';
import { baseUrl } from '../config.json';

const RestaurantDataUrl = `${baseUrl}/Restaurants`;

const AddARestaurant = (RestaurantObject) => new Promise((resolve, reject) => {
  axios.post(RestaurantDataUrl, RestaurantObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { AddARestaurant };
