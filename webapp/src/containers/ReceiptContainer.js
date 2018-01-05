import React, {Component} from 'react'
import {connect} from 'react-redux'

import { fetchLatestVote } from '../actions'

class ReceiptContainer extends Component {
  componentWillMount () {
    this.props.fetchLatestVote()
  }

  render () {
    const { receipt } = this.props

    return <div className='container'>
      {
        receipt
          ? Object.keys(receipt).map(key =>
          <p key={key}>{`${key}: ${receipt[key]}`}</p>)
          : 'Checkin connection'

      }
    </div>
  }
}

export default connect(
  ({ subject }, ownProps) => ({
    receipt: subject.receipt
  }),
  { fetchLatestVote })(ReceiptContainer)
