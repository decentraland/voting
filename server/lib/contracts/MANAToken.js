const commons = require('decentraland-commons')
const eth = commons.eth
const Contract = commons.Contract
const env = commons.env

const abi = require('./abi/MANAToken.json').abi

let instance = null

/** MANAToken contract class */
class MANAToken extends Contract {
  static getInstance() {
    if (!instance) {
      instance = new MANAToken(
        'MANAToken',
        '0xe5969D6592879B8ed89e77852595d434C44220ae',
        abi
      )
    }
    return instance
  }

  async getBalance(sender) {
    const manaBalance = await this.getBalanceWei(sender)
    return eth.utils.fromWei(manaBalance)
  }

  getBalanceWei(sender) {
    return this.call('balanceOf', sender)
  }
}

module.exports = MANAToken