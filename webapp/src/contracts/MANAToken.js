import { Contract, env, eth } from 'decentraland-commons'

import { abi } from './abi/MANAToken.json'

let instance = null

/** MANAToken contract class */
class MANAToken extends Contract {
  static getInstance() {
    if (!instance) {
      instance = new MANAToken(
        'MANAToken',
        env.universalGet('MANA_CONTRACT_ADDRESS'),
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

export default MANAToken