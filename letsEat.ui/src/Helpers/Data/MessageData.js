import axios from 'axios';
import { baseUrl } from '../config.json';

const userDataUrl = `${baseUrl}/Messages`;

const GetSessionMessages = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`${userDataUrl}/${sessionId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});
// eslint-disable-next-line
export default { GetSessionMessages };