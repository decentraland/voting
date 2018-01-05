import { delay } from 'redux-saga'
import { put, fork, take, takeLatest, call, select } from 'redux-saga/effects'

import types from './types'
import * as actions from './actions'
import * as gateway from './gateway'
import * as selectors from './selectors'


export default function* rootSaga() {
  yield takeLatest(types.connectWeb3.request, connectWeb3)
  yield takeLatest(types.fetchSubject.request, fetchSubject)
  yield takeLatest(types.castVote.request, castVote)
  yield fork(fetchSubjectVotes)
}

function* connectWeb3 () {
  try {
    yield delay(3000)
    yield put({
      type: types.connectWeb3.success,
      payload:{
        address: '123xm123123019302190sad0asd0as01e20312031',
        weight: 10002301,
      },
    })
  } catch(e) {
    yield put({ type: types.connectWeb3.failed, message: e.message })
  }
}

function* fetchSubject ({ subjectId }) {
  try {
    const subject = yield call(gateway.getSubjectById, subjectId)
    yield put({
      type: types.fetchSubject.success,
      payload: { subject }
    })
    yield put({
      type: types.fetchSubjectVotes.request,
      subjectId
    })
  } catch(e) {
    yield put({ type: types.fetchSubject.failed, message: e.message })
  }
}

function* fetchSubjectVotes () {
  try{
    while (true) {
      const { subjectId } = yield take(types.fetchSubjectVotes.request)
      const limit = yield select(selectors.getVotesLimit)
      const offset = yield select(selectors.getVotesOffset)

      const votes = yield call(gateway.getVotesBySubjectId, subjectId, limit, offset)

      yield put({
        type: types.fetchSubjectVotes.success,
        payload: {
          offset,
          limit,
          votes: votes
        }
      })
    }
  } catch(e) {
    yield put({ type: types.fetchSubjectVotes.failed, message: e.message })
  }
}

function* castVote ({ vote }) {
  try {
    const receipt = yield call(gateway.castVote, vote)
    yield put(actions.fetchSubject(vote.subjectId))
    yield put({
      type: types.castVote.success,
      payload: {
        receipt: {
          ...receipt,
          vote: vote.vote,
        },
      },
    })
  } catch (e) {
    yield put({type: types.castVote.failed, message: e.message})
  }
}
