import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

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
      subjectId: this.props.subject.id,
      vote: value
    })
  }

  render () {
    const { subject, user } = this.props
    const isWeb3Connected = this.props.web3.status

    return <div className='container'>
      <h1>{'Decentraland Community Feedback'}</h1>
      <VoteSummary subject={subject}/>
      <a onClick={this.toggleSeeVote}>{this.state.seeVote ? 'Back' : 'See votes'}</a>
      { this.state.seeVote && <VoteList votes={subject.votes} /> }
      { (isWeb3Connected && !this.state.seeVote) &&
      <div>
        <p className={'your-vote'}>{'Your Vote:'}</p>
        { subject.receipt && <div>
          <div>
            <p className='small-title'>{'Address:'}</p>
            <p className='small-value'>{user.address}</p>
            <p className='small-title'>{'Vote weight:'}</p>
            <p className='small-value'>{`${user.weight} MANA`}</p>
            <p className='small-title'>{'Your vote:'}</p>
            <p className='small-value'>{`${subject.receipt.vote}`}</p>
            <p className='small-title'>{'Submission:'}</p>
            <Link to={`/receipt/${subject.receipt.id}`} className='small-value link'>{subject.receipt.id}</Link>
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
