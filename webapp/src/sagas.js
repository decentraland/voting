import { delay } from 'redux-saga'
import { put, fork, take, takeLatest, call } from 'redux-saga/effects'

import types from './types'
import * as gateway from './gateway'


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
        weight: '10002301',
      },
    })
  } catch(e) {
    yield put({ type: types.connectWeb3.failed, message: e.message })
  }
}

function* fetchSubject ({ subjectId }) {
  try {
    const subject = yield call(gateway.getSubjectById, subjectId)
    console.log(subject)
    yield put({
      type: types.fetchSubject.success,
      payload: {subject}
    })
    yield put({
      type: types.fetchSubjectVotes.request
    })
  } catch(e) {
    yield put({ type: types.fetchSubject.failed, message: e.message })
  }
}

function* fetchSubjectVotes () {
  try{
    while (true) {
      const { offset, limit } = yield take(types.fetchSubjectVotes.request)
      yield delay(3000)
      yield put({
        type: types.fetchSubjectVotes.success,
        payload: {
          offset,
          limit,
          votes: [
            { vote: 'no', date: '12 hours ago', address: '0x22312309120390asd12930129312312' },
            { vote: 'yes', date: '12 hours ago', address: '0x22312309120390asd12930129312312' },
            { vote: 'no', date: '13 hours ago', address: '0x22312309120390asd12930129312312' },
            { vote: 'yes', date: '18 hours ago', address: '0x22312309120390asd12930129312312' },
            { vote: 'yes', date: '20 hours ago', address: '0x22312309120390asd12930129312312' },
            { vote: 'abstain', date: '20 hours ago', address: '0x22312309120390asd12930129312312' }
          ]
        }
      })
    }
  } catch(e) {
    yield put({ type: types.fetchSubjectVotes.failed, message: e.message })
  }
}

function* castVote ({ vote }) {
  try {
    yield delay(1000)
    yield put({
      type: types.castVote.success,
      payload: {
        subjectId: 1,
        vote: vote.vote,
        submission: 'asd1231231239012391zx1349023420303493943'
      },
    })
  } catch (e) {
    yield put({type: types.castVote.failed, message: e.message})
  }
}
