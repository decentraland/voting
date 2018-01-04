import React, {Component} from 'react'
import {connect} from 'react-redux'

import VoteSummary from '../components/VoteSummary'
import VoteList from '../components/VoteList'
import '../components/styles.css'

import { connectWeb3, fetchSubject, castVote } from '../actions'

class VoteContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      seeVote: false,
    }
    this.toggleSeeVote = this.toggleSeeVote.bind(this)
    this.castVote = this.castVote.bind(this)
  }

  componentWillMount () {
    this.props.connectWeb3()
    this.props.fetchSubject(1) //TODO: no harcode it
  }

  toggleSeeVote () {
    this.setState({
      seeVote: !this.state.seeVote
    })
  }

  castVote (value) {
    this.props.castVote({
      vote: value,
      address: this.props.user.address,
      weight: this.props.user.weight,
    })
  }

  render () {
    const { subject, participantsNumber, participantsPercentage, positive, negative, abstentions,
      vote, votes, submission} = this.props.subject
    const isWeb3Connected = this.props.web3.status
    const user = this.props.user

    return <div className='container'>
      <h1>{'Decentraland Community Feedback'}</h1>
      <VoteSummary subject={subject}
                   participantsNumber={participantsNumber}
                   participantsPercentage={participantsPercentage}
                   positive={positive}
                   negative={negative}
                   abstentions={abstentions} />
      <a onClick={this.toggleSeeVote}>{this.state.seeVote ? 'Back' : 'See votes'}</a>
      { this.state.seeVote && <VoteList votes={votes} /> }
      { (isWeb3Connected && !this.state.seeVote) &&
      <div>
        <p className={'your-vote'}>{'Your Vote:'}</p>
        { submission && <div>
          <div>
            <p className='small-title'>{'Address:'}</p>
            <p className='small-value'>{user.address}</p>
            <p className='small-title'>{'Vote weight:'}</p>
            <p className='small-value'>{`${user.weight} MANA`}</p>
            <p className='small-title'>{'Your vote:'}</p>
            <p className='small-value'>{`${vote}`}</p>
            <p className='small-title'>{'Submission:'}</p>
            <p className='small-value link'>{`${submission}`}</p>
          </div>
          <p className="small-title">{'Update Vote'}</p>
        </div> }
        <div className='vote-actions'>
          <button onClick={() => this.castVote('yes')} className={'yes'}>{'Yes'}</button>
          <button onClick={() => this.castVote('abstain')}>{'Abstain'}</button>
          <button onClick={() => this.castVote('no')} className={'no'}>{'No'}</button>
        </div>
        <p className='small-title'>{'Address:'}</p>
        <p className='small-value'>{user.address}</p>
        <p className='small-title'>{'Vote weight:'}</p>
        <p className='small-value'>{`${user.weight} MANA`}</p>
      </div> }
    </div>
  }
}

function mapStateToProps ({subject, user, web3}) {
  return {
    subject,
    user,
    web3,
  }
}

const mapDispatchToProps = {
  connectWeb3,
  fetchSubject,
  castVote,
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer)
