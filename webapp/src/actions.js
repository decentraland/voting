import types from './types'

export function connectWeb3(address) {
  return {
    type: types.connectWeb3.request,
    address
  }
}

export function fetchSubject(subjectId) {
  return {
    type: types.fetchSubject.request,
    subjectId
  }
}

export function fetchSubjectVotes(subjectId) {
  return {
    type: types.fetchSubjectVotes.request,
    subjectId
  }
}

export function castVote(vote) {
  return {
    type: types.castVote.request,
    vote
  }
}

export function fetchLatestVote(address) {
  return {
    type: types.fetchLatestVote.request,
    address
  }
}
