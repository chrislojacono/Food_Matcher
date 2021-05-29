import axios from 'axios';
import { baseUrl } from '../config.json';

const userDataUrl = `${baseUrl}/Users`;

const AddAUser = (userObject) => new Promise((resolve, reject) => {
  axios.post(userDataUrl, userObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const GetSingleUser = (UserId) => new Promise((resolve, reject) => {
  axios.get(`${userDataUrl}/${UserId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { AddAUser, GetSingleUser };
