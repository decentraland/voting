import axios from 'axios'

const api = process.env.API_BASE || '//localhost:4000/'

export function getSubjectById(subjectId) {
  return axios.get(`${api}${subjectId}`)
  .then(reponse => response.data.subject)
}
