const web3Eth = require('decentraland-commons').eth

const MANAToken = require('../contracts/MANAToken')
const pgdb = require('../database/pgdb')

/* Blockchain Watcher */
module.exports = {
  run: async () => {
    await web3Eth.connect(null, [MANAToken])
    web3Eth.web3.eth.filter('latest', (error, blockHash) => {
      try {
        if (error) {
          return
        }
        const transactions = web3Eth.web3.eth.getBlock(blockHash).transactions || []
        Object.keys(transactions.reduce((address, transactionHash) => {
          const {from, to} = web3Eth.web3.eth.getTransaction(transactionHash)
          address[from] = ''
          address[to] = ''
          return address
        }, {})).forEach(async address => {
          // const weight = await web3Eth.contracts['MANAToken'].getBalanceWei(address).then(response => response)
          const balance = web3Eth.web3.eth.getBalance(address)
          pgdb.updateUserWeightByAddress(address, balance.toNumber() / 10^18)
        })
      } catch (e) {
        console.log('Error at blockchain Watcher: ',e)
      }
    })
  } // 525721582,
}
