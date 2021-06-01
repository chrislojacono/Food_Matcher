import axios from 'axios';
import { baseUrl } from '../config.json';

const FinalDecisionDataUrl = `${baseUrl}/FinalDecision`;

const AddAFinalDecision = (FinalDecisionObject) => new Promise((resolve, reject) => {
  axios.post(FinalDecisionDataUrl, FinalDecisionObject).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const GetAFinalDecision = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`${FinalDecisionDataUrl}/${sessionId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});
// eslint-disable-next-line
export default { AddAFinalDecision, GetAFinalDecision };