import axios from 'axios'

const api = process.env.API_BASE || '//localhost:3001/'

export function getSubjectById(subjectId) {
  return axios.get(`${api}${subjectId}`)
  .then(response => response.data)
}

export function getVotesBySubjectId(subjectId, limit, offset) {
  return axios.get(`${api}${subjectId}/votes?limit=${limit}&offset=${offset}`)
  .then(response => response.data)
}

export function castVote(vote) {
  return axios.post(`${api}${vote.subjectId}/votes`, vote)
  .then(response => response.data)
}

export function getLatestVote(subjectId, address) {
  return axios.get(`${api}${subjectId}/votes/${address}`)
  .then(response => response.data)
}
