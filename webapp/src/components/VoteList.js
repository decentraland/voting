import React from 'react'

import moment from 'moment'

function VoteList (props) {
  const {votes, loading} = props.votes
  const getDate = ms => {
    let d = 0, h = 0, m= 0, s = 0
    s = Math.floor(ms / 1000)
    m = Math.floor(s / 60)
    s = s % 60;
    h = Math.floor(m / 60)
    m = m % 60;
    d = Math.floor(h / 24)
    h = h % 24;
    return { d: d, h: h, m: m, s: s }
  }

  const formatDate = obj =>
    obj.d > 0
      ? `${obj.d} days`
      : obj.h > 0
        ? `${obj.h} hours`
        : obj.m > 0
          ? `${obj.m} minutes`
          : `${obj.s} seconds`


  return (<table>
    <tbody>
      <tr>
        <th className=''>{'Vote'}</th>
        <th className=''>{'Time Cast'}</th>
        <th className=''>{'Address'}</th>
      </tr>
      { !loading && votes.map((vote, index) => <tr key={index}>
        <td className={`vote ${vote.vote}`}>
          {vote.vote}
        </td>
        <td>
          {formatDate(getDate(moment().diff(moment(vote['created_at']))))}
        </td>
        <td>
          {`${vote.user.address.substr(0,7)}...${vote.user.address.substr(-5)}`}
        </td>
      </tr>) }
    </tbody>
  </table>)
}

export default VoteList
