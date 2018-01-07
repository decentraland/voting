const SUBJECT = 'subject'
const VOTES = 'votes'
const USER = 'user'
// const ETHEREUM = 'ethereum'

export const getVotesLimit = state => state[SUBJECT][VOTES].limit
export const getVotesOffset = state => state[SUBJECT][VOTES].offset
export const getAdress = state => state[USER].address
export const getLedger = state => state[USER].ledger
// export const getEthereum = state => state[ETHEREUM].getEthereum
