import types from './types'

const INITIAL_STATE = {
  subject: {
    loading: true,
    votes: {
      votes: [],
      limit: 10,
      offset: 0,
      loading: true,
    },
    receipt: null,
  },
  user: {
    loading: true
  },
  web3: {
    loading: true,
    status: false,
  }
}

function subject (state = INITIAL_STATE.subject, action) {
  switch (action.type) {
    case types.fetchSubject.request:
      return Object.assign({} , state, {
        votes: INITIAL_STATE.subject.votes
      })
    case types.fetchSubject.success:
      return Object.assign({} , state, action.payload.subject)
    case types.fetchSubjectVotes.success:
      return Object.assign({} , state, {
        votes: {
          limit: state.votes.limit,
          offset: state.votes.offset + state.votes.limit,
          votes: [...state.votes, ...action.payload.votes],
          loading: false,
        }
      })
    case types.fetchLatestVote.success:
      return { ...state, receipt: action.payload.receipt }
    case types.castVote.success:
        return { ...state, receipt: action.payload.receipt }
    default:
      return state
  }
}

function user (state = INITIAL_STATE.web3, action) {
  switch (action.type) {
    case types.connectWeb3.success:
      return {
        ...action.payload,
        loading: false,
      }
    default:
      return state
  }
}

function web3 (state = INITIAL_STATE.user, action) {
  switch (action.type) {
    case types.connectWeb3.success:
      return {
        status: true,
        loading: false,
      }
    case types.connectWeb3.failed:
      return {
        status: false,
        loading: false,
      }
    default:
      return state
  }
}

export default {
  subject,
  user,
  web3,
}

