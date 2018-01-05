import types from './types'

const INITIAL_STATE = {
  subject: {
    loading: true,
    votes: {
      votes: [],
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
    case types.fetchSubject.success:
      return Object.assign({} , state, action.payload.subject)
    case types.fetchSubjectVotes.success:
      return Object.assign({} , state, {
        votes: {
          votes: [...state.votes, ...action.payload.votes],
          loading: false,
        }
      })
    case types.castVote.success:
        return Object.assign({}, state, {
          receipt: action.payload.receipt
        })
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
    default:
      return state
  }
}

export default {
  subject,
  user,
  web3,
}

