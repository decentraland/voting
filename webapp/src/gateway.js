import axios from 'axios'

const api = process.env.API_BASE || '//localhost:3001/'

export function getSubjectById(subjectId) {
  return axios.get(`${api}${subjectId}`)
  .then(response => response.data)
}

export function castVote(vote) {
  return axios.post(`${api}${vote.subjectId}/votes`, vote)
  .then(response => response.data)
}
