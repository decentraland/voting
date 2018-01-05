const SUBJECT = 'subject'
const VOTES = 'votes'

export const getVotesLimit = state => state[SUBJECT][VOTES].limit
export const getVotesOffset = state => state[SUBJECT][VOTES].offset
