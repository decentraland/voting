import React, {Component} from 'react'

export default class VoteSummary extends Component {

  render () {
    const {subject, participantsNumber, participantsPercentage, positive, negative, abstentions} = this.props

    return <div>
      <p className='subject'>{subject}</p>
      <div className='vote-summary'>
        <div>
          <p className='vote-summary-title'>{'# of participants'}</p>
          <p className='vote-summary-value'>{participantsNumber}</p>
        </div>
        <div>
          <p className='vote-summary-title'>{'participation %'}</p>
          <p className='vote-summary-value'>{participantsPercentage}</p>
        </div>
        <div>
          <p className='vote-summary-title'>{'positive'}</p>
          <p className='vote-summary-value'>{positive}</p>
        </div>
        <div>
          <p className='vote-summary-title'>{'negative'}</p>
          <p className='vote-summary-value'>{negative}</p>
        </div>
        <div>
          <p className='vote-summary-title'>{'abstentions'}</p>
          <p className='vote-summary-value'>{abstentions}</p>
        </div>
      </div>
    </div>
  }
}