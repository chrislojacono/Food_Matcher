import axios from 'axios';
import { baseUrl } from '../config.json';

const SessionDataUrl = `${baseUrl}/SessionLikes`;

const AddASessionLike = (SessionObject) => new Promise((resolve, reject) => {
  axios.post(SessionDataUrl, SessionObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const GetLikesOfAUserPerSession = (userId, sessionId) => new Promise((resolve, reject) => {
  axios.get(`${SessionDataUrl}/${userId}/${sessionId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const GetMatches = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`${SessionDataUrl}/matches/${sessionId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});
// eslint-disable-next-line
export default {
  AddASessionLike,
  GetLikesOfAUserPerSession,
  GetMatches,
};
