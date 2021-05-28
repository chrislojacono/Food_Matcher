import axios from 'axios';
import { baseUrl } from '../config.json';

const SessionDataUrl = `${baseUrl}/SessionLikes`;

const AddASessionLike = (SessionObject) => new Promise((resolve, reject) => {
  axios.post(SessionDataUrl, SessionObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { AddASessionLike };
