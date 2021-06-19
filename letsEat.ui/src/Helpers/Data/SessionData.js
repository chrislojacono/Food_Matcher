import axios from 'axios';
import { baseUrl } from '../config.json';

const SessionDataUrl = `${baseUrl}/Sessions`;

const AddASession = (SessionObject) => new Promise((resolve, reject) => {
  axios.post(SessionDataUrl, SessionObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const GetASession = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`${SessionDataUrl}/${sessionId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const GetASessionByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${SessionDataUrl}/byUserId/${userId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const SetJoiner = (sessionId, userId) => new Promise((resolve, reject) => {
  axios.put(`${SessionDataUrl}/setJoiner/${sessionId}/${userId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const DeleteSession = (sessionId) => new Promise((resolve, reject) => {
  axios.delete(`${SessionDataUrl}/${sessionId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

// eslint-disable-next-line
export default {
  AddASession,
  GetASession,
  GetASessionByUserId,
  SetJoiner,
  DeleteSession,
};
