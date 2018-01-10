import { put, fork, take, takeLatest, call, select, all } from 'redux-saga/effects'
import { eth as web3Eth, utils } from 'decentraland-commons'

import types from './types'
import * as actions from './actions'
import * as gateway from './gateway'
import * as selectors from './selectors'
import { isChrome, generateMessage } from './lib/utils'
import MANAToken from './contracts/MANAToken'

export default function* rootSaga() {
  yield takeLatest(types.connectWeb3.request, connectWeb3)
  yield takeLatest(types.connectWeb3.success, fetchLatestVote)
  yield takeLatest(types.fetchSubject.request, fetchSubject)
  yield takeLatest(types.castVote.request, castVote)
  yield fork(fetchSubjectVotes)
}

async function sign(message, address, ethereum, ledger) {
  if (ledger) {
    try {
      const result = await ethereum.signPersonalMessage_async(
        "44'/60'/0'/0",
        message.substring(2)
      )

      let v = result['v'] - 27
      v = v.toString(16)
      if (v.length < 2) {
        v = '0' + v
      }
      return '0x' + result['r'] + result['s'] + v
    } catch (error) {
      console.log(error, error.stack)
    }
  } else {
    return await ethereum.remoteSign(message, address)
  }
}

async function connectLedger(retries = 0) {
  try {
    if (!isChrome()) {
      // Ledger only works on chrome apparently
      return false
    }

    const ledger = window.ledger
    const comm = await ledger.comm_u2f.create_async(2)
    const ledgerEth = new ledger.eth(comm)
    const address = await ledgerEth.getAddress_async(`44'/60'/0'/0`)

    return {
      ethereum: ledgerEth,
      ledger: true,
      address: address.address.toLowerCase()
    }
  } catch (error) {
    let result = false

    if (retries < 3) {
      await utils.sleep(1000)
      result = connectLedger(retries + 1)
    }

    return result
  }
}

async function connectBrowser() {
  try {
    let retries = 0

    let connected = await web3Eth.reconnect(
      null,
      [MANAToken]
    )

    while (!connected && retries <= 3) {
      await utils.sleep(1500)
      connected = await web3Eth.connect(
        null,
        [MANAToken]
      )
      retries += 1
    }

    if (!connected) return false
    const address = await web3Eth.getAddress()
    const weight = await web3Eth.contracts['MANAToken'].getBalanceWei(address).then(response => response)

    return {
      ethereum: web3Eth,
      weight,
      address: address.toLowerCase()
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

function* connectWeb3 () {
  try {
    const { ledger, browser } = yield all({
      ledger: call(connectLedger),
      browser: call(connectBrowser)
    })

    if (!ledger && !browser) throw new Error('Could not connect to web3')

    const address = ledger ? ledger.address : browser.address
    window.web3Eth = ledger ? ledger.ethereum : browser.ethereum // Do not save web3 at redux store (crash)
    yield put({
      type: types.connectWeb3.success,
      payload:{
        weight: browser.weight,
        ledger: !!ledger,
        address: address
      },
    })
  } catch(e) {
   // yield put(replace(locations.walletError))
    yield put({ type: types.connectWeb3.failed, message: e.message })
  }
}

function* fetchLatestVote () {
  try {
    const address = yield select(selectors.getAddress)
    const subjectId = yield select(selectors.getCurrentSubjectId)

    const receipt = yield call(gateway.getLatestVote, subjectId, address)

    yield put({ type: types.fetchLatestVote.success, payload: { receipt } })
  } catch(e) {
    yield put({ type: types.fetchLatestVote.failed, message: e.message })
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
    const address = yield select(selectors.getAddress)
    const ledger = yield select(selectors.getLedger)
    const message = window.web3Eth.utils.toHex(generateMessage(0, address, vote.vote))
    const signature = yield call(() => sign(message, address, window.web3Eth, ledger))
    const receipt = yield call(gateway.castVote, { ...vote, signature, message })
    yield put(actions.fetchSubject(vote.subjectId))
    yield put({
      type: types.castVote.success,
      payload: { receipt },
    })
  } catch (e) {
    yield put({type: types.castVote.failed, message: e.message})
  }
}
