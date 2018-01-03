import React, {Component} from 'react'

import VoteSummary from './VoteSummary'
import VoteList from './VoteList'
import './styles.scss'

export default class Vote extends Component {

  constructor (props) {
    super(props)
    this.isDapp = false
    this.voted = false
    this.toggleSeeVote = this.toggleSeeVote.bind(this)
  }

  reload () {
    setTimeout(() => {
      this.isDapp = true
      this.forceUpdate()
    }, 3000)

    setTimeout(() => {
      this.voted = true
      this.forceUpdate()
    }, 10000)
  }

  toggleSeeVote () {
    this.seeVote = !this.seeVote
    this.forceUpdate()
  }

  render () {
    const {subject, participantsNumber, participantsPercentage, positive, negative, abstentions,
      isDapp, voted, user, seeVote} = {
      subject: 'Should new land be sold at 1000 MANA per unit, on a first-come first-serve basis?',
      participantsNumber: 4387,
      participantsPercentage: 45,
      positive: 1,
      negative: 1,
      abstentions: 1,
      isDapp: this.isDapp,
      voted: this.voted,
      seeVote: this.seeVote,
      user: {
        address: '2sasd8979sd87g8s7df88csux8aas8x8as8d8as7d8asd',
        weight: '112342',
        vote: 'Yes',
        submission: '0xssklgi02420fasx0019324xfasd',
      }
    } //this.props

    this.reload()
    return <div className='container'>
      <h1>Decentraland Community Feedback</h1>
      <VoteSummary subject
                   participantsNumber
                   participantsPercentage
                   positive
                   negative
                   abstentions />
      <a onClick={this.toggleSeeVote}>{seeVote ? 'Back' : 'See votes'}</a>
      { seeVote && <VoteList /> }
      { isDapp &&
      <div>
        <p className={'your-vote'}>{'Your Vote:'}</p>
        { voted &&
          <div>
            <p className='small-title'>{'Address:'}</p>
            <p className='small-value'>{user.address}</p>
            <p className='small-title'>{'Vote weight:'}</p>
            <p className='small-value'>{`${user.weight}`}</p>
            <p className='small-title'>{'Your vote:'}</p>
            <p className='small-value'>{`${user.vote}`}</p>
            <p className='small-title'>{'Submission:'}</p>
            <p className='small-value link'>{`${user.weight} MANA`}</p>
          </div>
        }
        <div className='vote-actions'>
          <button className={'yes'}>{'Yes'}</button>
          <button>{'Abstain'}</button>
          <button className={'no'}>{'No'}</button>
        </div>
        <p className='small-title'>{'Address:'}</p>
        <p className='small-value'>{user.address}</p>
        <p className='small-title'>{'Vote weight:'}</p>
        <p className='small-value'>{`${user.weight} MANA`}</p>
      </div> }
    </div>
  }
}