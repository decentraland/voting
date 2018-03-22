const env = require('decentraland-commons')

export const getMessage = (address, vote) =>
  `This is the vote for the user with address: ${address}. The vote to cast is: ${vote}. Date: ${new Date()}`

export const getServerKey = () => {
  const key = env['SERVER_PRIVATE_KEY'] || `6f24693cb404597bb9adfa6fb3507fc8de93d5ff037bc11de4a12c90080916c2`
  return key
}
