const SUBJECT = 'subject'
const VOTES = 'votes'
const USER = 'user'

export const getCurrentSubjectId = state => state[SUBJECT].id
export const getVotesLimit = state => state[SUBJECT][VOTES].limit
export const getVotesOffset = state => state[SUBJECT][VOTES].offset
export const getAddress = state => state[USER].address
export const getLedger = state => state[USER].ledger
