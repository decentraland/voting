import React from 'react'

function VoteSummary({ subject }) {
  return (<div>
    <p className='subject'>{ subject['title'] }</p>
    <div className='vote-summary'>
      <div>
        <p className='vote-summary-title'>{'# of participants'}</p>
        <p className='vote-summary-value'>{ subject['address_count'] }</p>
      </div>
      <div>
        <p className='vote-summary-title'>{'participation %'}</p>
        <p className='vote-summary-value'>{ subject['votes_weight'] }</p>
      </div>
      <div>
        <p className='vote-summary-title'>{'positive'}</p>
        <p className='vote-summary-value'>{ subject['yes_count'] }</p>
      </div>
      <div>
        <p className='vote-summary-title'>{'negative'}</p>
        <p className='vote-summary-value'>{ subject['no_count'] }</p>
      </div>
      <div>
        <p className='vote-summary-title'>{'abstentions'}</p>
        <p className='vote-summary-value'>{ subject['abstentions_count'] }</p>
      </div>
    </div>
  </div>)
}

export default VoteSummary