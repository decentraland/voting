const web3Eth = require('decentraland-commons').eth
const utils = require('decentraland-commons').utils

const MANAToken = require('../contracts/MANAToken')
const pgdb = require('../database/pgdb')
const { getMessage, getServerKey } = require('./constants')

class EthUtils {
  async init () {
    await web3Eth.connect(null, [MANAToken])
  }

  async watchBlocks () { /* Blockchain Watcher */
    await this.init()
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
  }

  async getBalance (address) {
    let retries = 0
    let connected = false
    while (!connected && retries <= 3) {
      await utils.sleep(1500)
      connected = await web3Eth.connect( // move to env vars
        ['0x627306090abaB3A6e1400e9345bC60c78a8BEf57'],
        [MANAToken],
        { httpProviderUrl: 'https://ropsten.infura.io/frFYdDoYxhh4Gla0YlCb' }
      )

      retries += 1
    }
    return await web3Eth
      .contracts['MANAToken']
      .getBalanceWei(address)
      .then(response => response.toNumber())
  }

  verifyMessage (message, signature) {
    const ethUtils = web3Eth.utils.ethereumJsUtils

    const decodedMessage = new Buffer(message.substr(2), 'hex')
    const decodedSignature = ethUtils.fromRpcSig(
      new Buffer(signature.substr(2), 'hex')
    )

    const pubkey = ethUtils.ecrecover(
      ethUtils.hashPersonalMessage(decodedMessage),
      decodedSignature.v,
      decodedSignature.r,
      decodedSignature.s
    )

    const address = '0x' + ethUtils.pubToAddress(pubkey).toString('hex')

    return { address, message: decodedMessage }
  }

  sign(address, vote) {
    const serverMessage = web3Eth.utils.toHex(getMessage(address, vote))
    const serverSignature = web3Eth.utils.localSign(
      serverMessage,
      getServerKey()
    )
    return { serverMessage, serverSignature }
  }
}

const ethUtils = new EthUtils()

module.exports = ethUtils
