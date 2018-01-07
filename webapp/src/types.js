const normalizeTypes = (type) => ({
  [type]: {
    request: `[Request] ${type}`,
    success: `[Success] ${type}`,
    failed: `[Failed] ${type}`,
  }
})
export default {
  ...normalizeTypes('connectWeb3'),
  ...normalizeTypes('fetchSubject'),
  ...normalizeTypes('castVote'),
  ...normalizeTypes('fetchSubjectVotes'),
  ...normalizeTypes('fetchLatestVote'),
}


